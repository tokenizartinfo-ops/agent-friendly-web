import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  FUNCTIONAL_TABLES,
  PRODUCTION_D1_READ_SQL,
  buildCloudflareNativeStabilityReport,
  parseProductionWorkerConfig,
  parseWranglerDeployments,
  parseWranglerD1Read,
  parseWranglerVersion,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';
import {
  executeProductionD1Read,
  readProductionInfrastructure,
} from '../scripts/audit-cloudflare-native-stability.mjs';

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
  checks: [
    { path: '/', boundary: 'public', status: 200, ok: true },
    { path: '/robots.txt', boundary: 'public', status: 200, ok: true },
    { path: '/llms.txt', boundary: 'public', status: 200, ok: true },
    { path: '/index.md', boundary: 'public', status: 200, ok: true },
    { path: '/.well-known/agent-readiness.json', boundary: 'public', status: 200, ok: true },
    { path: '/.well-known/infrastructure-status.json', boundary: 'public', status: 200, ok: true },
    { path: '/okf/v0.2/manifest.json', boundary: 'public', status: 200, ok: true },
    { path: '/api-catalog', boundary: 'public', status: 200, ok: true },
    { path: '/expediente', boundary: 'cloudflare_access', status: 302, ok: true },
    { path: '/api/projects', boundary: 'cloudflare_access', status: 302, ok: true },
    { path: '/api/projects/probe', boundary: 'cloudflare_access', status: 302, ok: true },
  ],
};

const productionConfigFixture = JSON.stringify({
  env: {
    production: {
      name: 'agent-friendly-web-web-production',
      d1_databases: [{
        binding: 'DB',
        database_name: 'agent-friendly-web-web-production',
        database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
      }],
    },
  },
});

function infrastructureFixture(overrides = {}) {
  return {
    observed_at: '2026-09-02T12:00:00.000Z',
    control_plane_observed_at: '2026-09-02T11:55:00.000Z',
    local_config: {
      worker: 'agent-friendly-web-web-production',
      d1_binding: 'DB',
      d1_database_name: 'agent-friendly-web-web-production',
      d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    },
    remote_worker: {
      worker: 'agent-friendly-web-web-production',
      deployment_id: '6ebb4aeb-e556-4a85-bfbc-2d0725eab614',
      version_id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44',
      percentage: 100,
      d1_binding: 'DB',
      d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    },
    cloudflare_custom_domain: {
      account_id: '85d0d5dadac3341a564f22ce885e9eec',
      domain_id: '57a78f718d4dabc302bbcd2c17dbdc8e8882b8d3',
      hostname: 'agentfriendlyweb.dev',
      service: 'agent-friendly-web-web-production',
      environment: 'production',
      enabled: true,
      previews_enabled: false,
    },
    legacy_sites: {
      project_id: 'appgprj_6a8f19e35d688191a53e93432543e39c',
      project_status: 'active',
      domain_binding_id: 'appgdom_6a8f665d5bc881919ac5fbdd05f69cbd',
      hostname: 'agentfriendlyweb.dev',
      status: 'active',
      provider_status: 'active',
      ssl_status: 'active',
    },
    ...overrides,
  };
}

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

test('D1 parser rejects numeric strings, nulls and booleans instead of coercing them', () => {
  for (const invalid of ['6', null, false, true]) {
    assert.throws(() => parseWranglerD1Read(JSON.stringify([{
      success: true,
      results: [{ migrations: invalid, functional_tables: 13, functional_rows: 0 }],
      meta: { rows_written: 0, changed_db: false },
    }])), /D1 migrations must be a non-negative integer/i);
  }
});

test('production config and Wrangler evidence identify the active worker version and D1 binding', () => {
  assert.deepEqual(parseProductionWorkerConfig(productionConfigFixture), {
    worker: 'agent-friendly-web-web-production',
    d1_binding: 'DB',
    d1_database_name: 'agent-friendly-web-web-production',
    d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
  });

  assert.deepEqual(parseWranglerDeployments(JSON.stringify([
    {
      id: 'older',
      created_on: '2026-09-02T04:08:23.462857Z',
      versions: [{ version_id: 'older-version', percentage: 100 }],
    },
    {
      id: '6ebb4aeb-e556-4a85-bfbc-2d0725eab614',
      created_on: '2026-09-02T04:54:33.263627Z',
      versions: [{ version_id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44', percentage: 100 }],
    },
  ])), {
    deployment_id: '6ebb4aeb-e556-4a85-bfbc-2d0725eab614',
    version_id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44',
    percentage: 100,
  });

  assert.deepEqual(parseWranglerVersion(JSON.stringify({
    id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44',
    resources: {
      bindings: [
        { name: 'ACCESS_AUD', text: 'must-not-leak', type: 'plain_text' },
        {
          name: 'DB',
          type: 'd1',
          database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
        },
      ],
    },
  })), {
    version_id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44',
    d1_binding: 'DB',
    d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
  });
});

test('stability report passes only with fresh production truth, strict smoke and an empty D1', () => {
  const report = buildCloudflareNativeStabilityReport({
    observedAt: '2026-09-02T12:00:00.000Z',
    status: statusFixture(),
    smoke: smokeFixture,
    infrastructure: infrastructureFixture(),
    database: {
      migrations: 6,
      functional_tables: 13,
      functional_rows: 0,
      rows_written: 0,
      changed_db: false,
      database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    },
  });

  assert.equal(report.ok, true);
  assert.equal(report.project, 'agent-friendly-web');
  assert.equal(report.origin, 'https://agentfriendlyweb.dev');
  assert.ok(report.checks.every((check) => check.ok));
  assert.deepEqual(report.smoke_checks.map(({ path, boundary, status, ok }) => ({ path, boundary, status, ok })), smokeFixture.checks);
});

test('stability report fails closed on stale truth, public regressions or unexpected D1 state', () => {
  const cases = [
    { observedAt: '2026-09-10T00:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, ok: false }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, checks: smokeFixture.checks.slice(0, 1) }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 1 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ control_plane_observed_at: '2026-08-31T00:00:00.000Z' }) },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ remote_worker: { ...infrastructureFixture().remote_worker, d1_database_id: 'wrong-database' } }) },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ cloudflare_custom_domain: { ...infrastructureFixture().cloudflare_custom_domain, service: 'wrong-worker' } }) },
  ];

  for (const fixture of cases) {
    const report = buildCloudflareNativeStabilityReport({
      observedAt: fixture.observedAt,
      status: fixture.status,
      smoke: fixture.smoke,
      infrastructure: fixture.infrastructure || infrastructureFixture(),
      database: {
        migrations: 6,
        functional_tables: 13,
        functional_rows: fixture.rows,
        rows_written: 0,
        changed_db: false,
        database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
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
    infrastructureRead: async () => infrastructureFixture(),
    d1Read: async (sql) => {
      observedSql = sql;
      return {
        migrations: 6,
        functional_tables: 13,
        functional_rows: 0,
        rows_written: 0,
        changed_db: false,
        database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
      };
    },
  });

  assert.equal(report.ok, true);
  assert.deepEqual(requested, ['https://agentfriendlyweb.dev/.well-known/infrastructure-status.json']);
  assert.equal(observedSql, PRODUCTION_D1_READ_SQL);
});

test('remote stability audit cancels a streamed infrastructure ledger once it exceeds 64 KiB', async () => {
  let cancelled = false;
  const oversized = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"padding":"'));
      controller.enqueue(new Uint8Array(64 * 1024));
    },
    cancel() {
      cancelled = true;
    },
  });

  await assert.rejects(() => runCloudflareNativeStabilityAudit({
    observedAt: '2026-09-02T12:00:00.000Z',
    fetchImpl: async () => new Response(oversized, {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
    smokeRunner: async () => smokeFixture,
    infrastructureRead: async () => infrastructureFixture(),
    d1Read: async () => ({
      migrations: 6,
      functional_tables: 13,
      functional_rows: 0,
      rows_written: 0,
      changed_db: false,
      database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    }),
  }), /exceeds byte limit/i);
  assert.equal(cancelled, true);
});

test('production D1 executor invokes the local Wrangler binary without a shell or mutable command', () => {
  let invocation;
  const result = executeProductionD1Read({
    cwd: 'C:\\afw',
    nodePath: 'C:\\node.exe',
    readFileImpl: () => productionConfigFixture,
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
  assert.equal(result.database_id, 'd26fc9d2-df5a-4957-8e58-cc4c945faad8');

  assert.throws(() => executeProductionD1Read({
    sql: 'SELECT * FROM site_projects',
    spawnImpl() {
      throw new Error('must not execute');
    },
  }), /exact fixed SELECT/i);
});

test('production infrastructure reader combines fresh Wrangler evidence with a sanitized control-plane observation', () => {
  const invocations = [];
  const controlPlaneFixture = JSON.stringify({
    contract_version: 'agentfriendly.control-plane-observation.v1',
    observed_at: '2026-09-02T11:55:00.000Z',
    cloudflare_custom_domain: infrastructureFixture().cloudflare_custom_domain,
    legacy_sites: infrastructureFixture().legacy_sites,
  });
  const infrastructure = readProductionInfrastructure({
    cwd: 'C:\\afw',
    nodePath: 'C:\\node.exe',
    observedAt: '2026-09-02T12:00:00.000Z',
    readFileImpl: (path) => String(path).replaceAll('\\', '/').endsWith('/wrangler.jsonc')
      ? productionConfigFixture
      : controlPlaneFixture,
    spawnImpl(command, args) {
      invocations.push({ command, args });
      if (args.includes('deployments')) {
        return {
          status: 0,
          stdout: JSON.stringify([{
            id: '6ebb4aeb-e556-4a85-bfbc-2d0725eab614',
            created_on: '2026-09-02T04:54:33.263627Z',
            versions: [{ version_id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44', percentage: 100 }],
          }]),
        };
      }
      return {
        status: 0,
        stdout: JSON.stringify({
          id: 'dc7531c7-5f1e-4e7c-9774-2a6acf131f44',
          resources: {
            bindings: [{
              name: 'DB',
              type: 'd1',
              database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
            }],
          },
        }),
      };
    },
  });

  assert.deepEqual(infrastructure, infrastructureFixture());
  assert.equal(invocations.length, 2);
  assert.ok(invocations.every(({ args }) => args.includes('agent-friendly-web-web-production')));
});

test('stability baseline evidence is versioned and keeps legacy retirement unauthorized', () => {
  const evidence = JSON.parse(readFileSync('docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json', 'utf8'));
  const controlPlane = JSON.parse(readFileSync('docs/evidence/cloudflare-native-control-plane-observation.json', 'utf8'));
  const roadmap = readFileSync('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md', 'utf8');

  assert.equal(evidence.contract_version, 'agentfriendly.cloudflare-native-stability-report.v2');
  assert.equal(evidence.ok, true);
  assert.deepEqual(evidence.database, {
    migrations: 6,
    functional_tables: 13,
    functional_rows: 0,
    rows_written: 0,
    changed_db: false,
    database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
  });
  assert.equal(evidence.smoke_checks.length, 11);
  assert.equal(evidence.infrastructure.remote_worker.percentage, 100);
  assert.equal(evidence.infrastructure.cloudflare_custom_domain.service, 'agent-friendly-web-web-production');
  assert.equal(evidence.infrastructure.legacy_sites.domain_binding_id, 'appgdom_6a8f665d5bc881919ac5fbdd05f69cbd');
  assert.equal(evidence.rollback.legacy_sites_retained, true);
  assert.equal(evidence.rollback.retirement_authorized, false);
  assert.equal(controlPlane.contract_version, 'agentfriendly.control-plane-observation.v1');
  assert.equal(controlPlane.project, 'agent-friendly-web');
  assert.equal(controlPlane.environment, 'afw_public');
  assert.match(roadmap, /npm run web:audit:stability/);
  assert.match(roadmap, /2026-09-09/);
});
