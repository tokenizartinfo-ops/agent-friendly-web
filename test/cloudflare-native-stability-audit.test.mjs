import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  FUNCTIONAL_TABLES,
  PRODUCTION_D1_READ_SQL,
  buildCloudflareNativeStabilityReport,
  parseWranglerD1Read,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';
import { executeProductionD1Read } from '../scripts/audit-cloudflare-native-stability.mjs';

function statusFixture(overrides = {}) {
  return {
    canonical_origin: 'https://agentfriendlyweb.dev',
    observed_at: '2026-09-02',
    stale_after: '2026-09-09',
    public_runtime: {
      state: 'cloudflare_native_production',
      provider: 'Cloudflare Workers',
      public_traffic_percent: 100,
    },
    production: {
      state: 'deployed',
      worker: 'agent-friendly-web-web-production',
      private_access_enforced: true,
      migrations_applied: 6,
      functional_table_count: 13,
      functional_row_count: 0,
      public_smoke: 'passed',
    },
    legacy_sites: {
      state: 'rollback_retained_without_apex',
      receives_apex_traffic: false,
      custom_domain_binding_retained: true,
    },
    next_gate: { name: 'afw_cloudflare_native_stability_and_legacy_retirement' },
    ...overrides,
  };
}

const smokeFixture = {
  contract_version: 'agentfriendly.cloudflare-native-smoke.v1',
  mode: 'public-edge',
  origin: 'https://agentfriendlyweb.dev',
  ok: true,
  checks: [{ path: '/', ok: true }],
};

test('production D1 stability query is a fixed SELECT over the thirteen functional tables', () => {
  assert.equal(FUNCTIONAL_TABLES.length, 13);
  assert.match(PRODUCTION_D1_READ_SQL, /^SELECT\b/i);
  assert.doesNotMatch(PRODUCTION_D1_READ_SQL, /\b(?:INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|PRAGMA)\b/i);
  for (const table of FUNCTIONAL_TABLES) {
    assert.match(PRODUCTION_D1_READ_SQL, new RegExp(`FROM ${table}\\b`));
  }
  assert.match(PRODUCTION_D1_READ_SQL, /FROM d1_migrations\b/);
  assert.match(PRODUCTION_D1_READ_SQL, /FROM sqlite_schema\b/);
  assert.doesNotMatch(PRODUCTION_D1_READ_SQL, /13 AS functional_tables/);
});

test('wrangler D1 parser accepts one successful scalar read and rejects ambiguous output', () => {
  const parsed = parseWranglerD1Read(JSON.stringify([{
    success: true,
    results: [{ migrations: 6, functional_tables: 13, functional_rows: 0 }],
    meta: { rows_read: 14, rows_written: 0, changed_db: false },
  }]));
  assert.deepEqual(parsed, {
    migrations: 6,
    functional_tables: 13,
    functional_rows: 0,
    rows_written: 0,
    changed_db: false,
  });

  assert.throws(() => parseWranglerD1Read('{}'), /single successful D1 read/i);
  assert.throws(() => parseWranglerD1Read(JSON.stringify([{ success: true, results: [] }])), /one scalar result/i);
  assert.throws(() => parseWranglerD1Read(JSON.stringify([{
    success: true,
    results: [{ migrations: 6, functional_tables: 13, functional_rows: 0 }],
    meta: { rows_written: 1, changed_db: true },
  }])), /must not write/i);
});

test('stability report passes only with fresh production truth, strict smoke and an empty D1', () => {
  const report = buildCloudflareNativeStabilityReport({
    observedAt: '2026-09-02T12:00:00.000Z',
    status: statusFixture(),
    smoke: smokeFixture,
    database: {
      migrations: 6,
      functional_tables: 13,
      functional_rows: 0,
      rows_written: 0,
      changed_db: false,
    },
  });

  assert.equal(report.ok, true);
  assert.equal(report.project, 'agent-friendly-web');
  assert.equal(report.origin, 'https://agentfriendlyweb.dev');
  assert.ok(report.checks.every((check) => check.ok));
});

test('stability report fails closed on stale truth, public regressions or unexpected D1 state', () => {
  const cases = [
    { observedAt: '2026-09-10T00:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, ok: false }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 1 },
  ];

  for (const fixture of cases) {
    const report = buildCloudflareNativeStabilityReport({
      observedAt: fixture.observedAt,
      status: fixture.status,
      smoke: fixture.smoke,
      database: {
        migrations: 6,
        functional_tables: 13,
        functional_rows: fixture.rows,
        rows_written: 0,
        changed_db: false,
      },
    });
    assert.equal(report.ok, false);
  }
});

test('remote stability audit fetches only the canonical ledger and delegates the fixed D1 SELECT', async () => {
  const requested = [];
  let observedSql = '';
  const report = await runCloudflareNativeStabilityAudit({
    observedAt: '2026-09-02T12:00:00.000Z',
    fetchImpl: async (url) => {
      requested.push(String(url));
      return new Response(JSON.stringify(statusFixture()), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    },
    smokeRunner: async () => smokeFixture,
    d1Read: async (sql) => {
      observedSql = sql;
      return {
        migrations: 6,
        functional_tables: 13,
        functional_rows: 0,
        rows_written: 0,
        changed_db: false,
      };
    },
  });

  assert.equal(report.ok, true);
  assert.deepEqual(requested, ['https://agentfriendlyweb.dev/.well-known/infrastructure-status.json']);
  assert.equal(observedSql, PRODUCTION_D1_READ_SQL);
});

test('production D1 executor invokes the local Wrangler binary without a shell or mutable command', () => {
  let invocation;
  const result = executeProductionD1Read({
    cwd: 'C:\\afw',
    nodePath: 'C:\\node.exe',
    spawnImpl(command, args, options) {
      invocation = { command, args, options };
      return {
        status: 0,
        stdout: JSON.stringify([{
          success: true,
          results: [{ migrations: 6, functional_tables: 13, functional_rows: 0 }],
          meta: { rows_written: 0, changed_db: false },
        }]),
        stderr: '',
      };
    },
  });

  assert.equal(invocation.command, 'C:\\node.exe');
  assert.match(invocation.args[0], /node_modules[\\/]wrangler[\\/]bin[\\/]wrangler\.js$/);
  assert.deepEqual(invocation.args.slice(1, 5), [
    'd1', 'execute', 'd26fc9d2-df5a-4957-8e58-cc4c945faad8', '--remote',
  ]);
  assert.deepEqual(invocation.args.slice(5, 7), ['--json', '--command']);
  assert.equal(invocation.args[7], PRODUCTION_D1_READ_SQL);
  assert.equal(invocation.options.shell, false);
  assert.equal(result.functional_rows, 0);

  assert.throws(() => executeProductionD1Read({
    sql: 'SELECT * FROM site_projects',
    spawnImpl() {
      throw new Error('must not execute');
    },
  }), /exact fixed SELECT/i);
});

test('stability baseline evidence is versioned and keeps legacy retirement unauthorized', () => {
  const evidence = JSON.parse(readFileSync('docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json', 'utf8'));
  const roadmap = readFileSync('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md', 'utf8');

  assert.equal(evidence.contract_version, 'agentfriendly.cloudflare-native-stability-report.v1');
  assert.equal(evidence.ok, true);
  assert.deepEqual(evidence.database, {
    migrations: 6,
    functional_tables: 13,
    functional_rows: 0,
    rows_written: 0,
    changed_db: false,
  });
  assert.equal(evidence.rollback.legacy_sites_retained, true);
  assert.equal(evidence.rollback.retirement_authorized, false);
  assert.match(roadmap, /npm run web:audit:stability/);
  assert.match(roadmap, /2026-09-09/);
});
