import assert from 'node:assert/strict';
import { generateKeyPairSync, sign as signBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  FUNCTIONAL_TABLES,
  PRODUCTION_D1_READ_SQL,
  STABILITY_SMOKE_CONTRACT,
  buildCloudflareNativeStabilityReport,
  parseProductionWorkerConfig,
  parseWranglerDeployments,
  parseWranglerD1Read,
  parseWranglerVersion,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';
import {
  executeProductionD1Read,
  fetchCloudflareAccessEvidence,
  fetchCloudflareCustomDomain,
  readProductionInfrastructure,
} from '../scripts/audit-cloudflare-native-stability.mjs';

const ACCESS_AUD = 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac';
const ACCESS_SIGNING_KID = 'f79e658c14036da6043c384d7f88fb1a5c61a417592e54bda346c8be73f50593';
const ACCESS_TEST_KEY_PAIR = generateKeyPairSync('rsa', { modulusLength: 2048 });

function encodeJwtPart(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function signedAccessMeta({ observedAt = '2026-09-02T12:00:00.000Z', route = '/api/projects', overrides = {} } = {}) {
  const { privateKey, publicKey } = ACCESS_TEST_KEY_PAIR;
  const observedSeconds = Math.floor(Date.parse(observedAt) / 1000);
  const header = { typ: 'JWT', alg: 'RS256', kid: ACCESS_SIGNING_KID };
  const claims = {
    type: 'meta',
    aud: ACCESS_AUD,
    hostname: 'agentfriendlyweb.dev',
    redirect_url: route,
    auth_status: 'NONE',
    service_token_status: false,
    iat: observedSeconds - 30,
    nbf: observedSeconds - 30,
    exp: observedSeconds + 270,
    real_country: 'must-not-be-retained',
    app_session_hash: 'must-not-be-retained',
    ...overrides,
  };
  const signingInput = `${encodeJwtPart(header)}.${encodeJwtPart(claims)}`;
  const signature = signBytes('RSA-SHA256', Buffer.from(signingInput), privateKey).toString('base64url');
  const jwk = publicKey.export({ format: 'jwk' });
  return {
    token: `${signingInput}.${signature}`,
    jwks: { keys: [{ ...jwk, kid: ACCESS_SIGNING_KID, alg: 'RS256', use: 'sig' }] },
  };
}

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
  account_id: '85d0d5dadac3341a564f22ce885e9eec',
  env: {
    production: {
      name: 'agent-friendly-web-web-production',
      vars: {
        ACCESS_TEAM_DOMAIN: 'tokenizart.cloudflareaccess.com',
        ACCESS_AUD: 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
      },
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
    local_config: {
      account_id: '85d0d5dadac3341a564f22ce885e9eec',
      worker: 'agent-friendly-web-web-production',
      d1_binding: 'DB',
      d1_database_name: 'agent-friendly-web-web-production',
      d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
      access_team_domain: 'tokenizart.cloudflareaccess.com',
      access_aud: 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
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
    cloudflare_access_edge: {
      origin: 'https://agentfriendlyweb.dev',
      team_domain: 'tokenizart.cloudflareaccess.com',
      audience: 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
      shared_identity_container: true,
      protected_routes: ['/expediente', '/api/projects', '/api/projects/probe'].map((path) => ({
        path,
        status: 302,
        login_path: '/cdn-cgi/access/login/agentfriendlyweb.dev',
        redirect_url: path,
        resource_metadata_url: `https://agentfriendlyweb.dev/.well-known/cloudflare-access-protected-resource${path}`,
        resource_metadata_protected: true,
        signing_key_id: ACCESS_SIGNING_KID,
        meta_signature_verified: true,
        meta_valid_from: '2026-09-02T11:59:30.000Z',
        meta_expires_at: '2026-09-02T12:04:30.000Z',
      })),
    },
    ...overrides,
  };
}

test('stability smoke contract independently pins eleven critical route boundaries', () => {
  assert.deepEqual(STABILITY_SMOKE_CONTRACT, [
    { path: '/', boundary: 'public' },
    { path: '/robots.txt', boundary: 'public' },
    { path: '/llms.txt', boundary: 'public' },
    { path: '/index.md', boundary: 'public' },
    { path: '/.well-known/agent-readiness.json', boundary: 'public' },
    { path: '/.well-known/infrastructure-status.json', boundary: 'public' },
    { path: '/okf/v0.2/manifest.json', boundary: 'public' },
    { path: '/api-catalog', boundary: 'public' },
    { path: '/expediente', boundary: 'cloudflare_access' },
    { path: '/api/projects', boundary: 'cloudflare_access' },
    { path: '/api/projects/probe', boundary: 'cloudflare_access' },
  ]);
});

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
    account_id: '85d0d5dadac3341a564f22ce885e9eec',
    worker: 'agent-friendly-web-web-production',
    d1_binding: 'DB',
    d1_database_name: 'agent-friendly-web-web-production',
    d1_database_id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    access_team_domain: 'tokenizart.cloudflareaccess.com',
    access_aud: 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
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
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture({ observed_at: '2026-08-01', stale_after: '2026-09-09' }), smoke: smokeFixture, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture({ stale_after: '2099-12-31' }), smoke: smokeFixture, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, ok: false }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, checks: smokeFixture.checks.slice(0, 1) }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: { ...smokeFixture, checks: [...smokeFixture.checks].reverse() }, rows: 0 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 1 },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ remote_worker: { ...infrastructureFixture().remote_worker, d1_database_id: 'wrong-database' } }) },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ cloudflare_custom_domain: { ...infrastructureFixture().cloudflare_custom_domain, service: 'wrong-worker' } }) },
    { observedAt: '2026-09-02T12:00:00.000Z', status: statusFixture(), smoke: smokeFixture, rows: 0, infrastructure: infrastructureFixture({ cloudflare_access_edge: { ...infrastructureFixture().cloudflare_access_edge, protected_routes: infrastructureFixture().cloudflare_access_edge.protected_routes.slice(1) } }) },
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

test('production infrastructure reader combines fresh Wrangler evidence with a live Cloudflare domain read', async () => {
  const invocations = [];
  const infrastructure = await readProductionInfrastructure({
    cwd: 'C:\\afw',
    nodePath: 'C:\\node.exe',
    observedAt: '2026-09-02T12:00:00.000Z',
    readFileImpl: () => productionConfigFixture,
    cloudflareDomainRead: async ({ accountId }) => {
      assert.equal(accountId, '85d0d5dadac3341a564f22ce885e9eec');
      return infrastructureFixture().cloudflare_custom_domain;
    },
    now: () => new Date('2026-09-02T12:00:00.000Z'),
    cloudflareAccessRead: async ({ teamDomain, audience, now }) => {
      assert.equal(teamDomain, 'tokenizart.cloudflareaccess.com');
      assert.equal(audience, 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac');
      assert.equal(now().toISOString(), '2026-09-02T12:00:00.000Z');
      return infrastructureFixture().cloudflare_access_edge;
    },
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

test('Cloudflare custom-domain reader queries the live API and returns only sanitized routing evidence', async () => {
  let requested;
  const evidence = await fetchCloudflareCustomDomain({
    accountId: '85d0d5dadac3341a564f22ce885e9eec',
    apiToken: 'test-only-token',
    fetchImpl: async (url, init) => {
      requested = { url: String(url), init };
      return new Response(JSON.stringify({
        success: true,
        result: [{
          id: '57a78f718d4dabc302bbcd2c17dbdc8e8882b8d3',
          hostname: 'agentfriendlyweb.dev',
          service: 'agent-friendly-web-web-production',
          environment: 'production',
          enabled: true,
          previews_enabled: false,
          cert_id: 'must-not-be-retained',
        }],
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    },
  });

  assert.equal(requested.url, 'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/domains');
  assert.equal(requested.init.method, 'GET');
  assert.equal(requested.init.redirect, 'error');
  assert.equal(requested.init.headers.authorization, 'Bearer test-only-token');
  assert.deepEqual(evidence, infrastructureFixture().cloudflare_custom_domain);
  assert.doesNotMatch(JSON.stringify(evidence), /token|cert_id/i);
});

test('Cloudflare Access reader verifies signed AFW edge evidence without retaining session claims', async () => {
  const observedAt = '2026-09-02T12:00:00.000Z';
  const routes = ['/expediente', '/api/projects', '/api/projects/probe'];
  const signed = new Map(routes.map((route) => [route, signedAccessMeta({ observedAt, route })]));
  const requested = [];
  let metadataAttempts = 0;
  const evidence = await fetchCloudflareAccessEvidence({
    teamDomain: 'tokenizart.cloudflareaccess.com',
    audience: ACCESS_AUD,
    now: () => new Date(observedAt),
    fetchImpl: async (url, init) => {
      requested.push({ url: String(url), init });
      if (String(url) === 'https://tokenizart.cloudflareaccess.com/cdn-cgi/access/certs') {
        return new Response(JSON.stringify(signed.get('/api/projects').jwks), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      const target = new URL(url);
      if (target.origin === 'https://agentfriendlyweb.dev' && routes.includes(target.pathname)) {
        const location = `https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/agentfriendlyweb.dev?kid=${ACCESS_AUD}&meta=${signed.get(target.pathname).token}&redirect_url=${encodeURIComponent(target.pathname)}`;
        return new Response(null, { status: 302, headers: { location } });
      }
      const metadataPrefix = '/.well-known/cloudflare-access-protected-resource';
      if (target.origin === 'https://agentfriendlyweb.dev' && target.pathname.startsWith(metadataPrefix)) {
        const route = target.pathname.slice(metadataPrefix.length);
        if (route === '/api/projects') {
          metadataAttempts += 1;
          if (metadataAttempts === 1) throw new TypeError('simulated transient network reset');
        }
        return new Response(JSON.stringify({
          resource: `https://agentfriendlyweb.dev${route}`,
          protected: true,
          team_domain: 'tokenizart.cloudflareaccess.com',
          authorization_servers: ['https://tokenizart.cloudflareaccess.com'],
          authentication_methods: [{ name: 'cloudflared', description: 'must-not-be-retained' }],
        }), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      throw new Error(`unexpected URL ${url}`);
    },
  });

  assert.deepEqual(requested.map(({ url }) => url), [
    'https://tokenizart.cloudflareaccess.com/cdn-cgi/access/certs',
    'https://agentfriendlyweb.dev/expediente',
    'https://agentfriendlyweb.dev/.well-known/cloudflare-access-protected-resource/expediente',
    'https://agentfriendlyweb.dev/api/projects',
    'https://agentfriendlyweb.dev/.well-known/cloudflare-access-protected-resource/api/projects',
    'https://agentfriendlyweb.dev/.well-known/cloudflare-access-protected-resource/api/projects',
    'https://agentfriendlyweb.dev/api/projects/probe',
    'https://agentfriendlyweb.dev/.well-known/cloudflare-access-protected-resource/api/projects/probe',
  ]);
  assert.ok(requested.every(({ init }) => init.method === 'GET' && init.redirect !== 'follow'));
  const metadataSignals = requested
    .filter(({ url }) => url.includes('cloudflare-access-protected-resource'))
    .map(({ init }) => init.signal);
  assert.notEqual(metadataSignals[0], metadataSignals[1]);
  assert.deepEqual(evidence, infrastructureFixture().cloudflare_access_edge);
  assert.doesNotMatch(JSON.stringify(evidence), /must-not-be-retained|real_country|app_session_hash/i);
});

test('Cloudflare Access reader rejects a signed challenge whose audience is not AFW', async () => {
  const observedAt = '2026-09-02T12:00:00.000Z';
  const signed = signedAccessMeta({ observedAt, route: '/expediente', overrides: { aud: 'wrong-audience' } });
  await assert.rejects(() => fetchCloudflareAccessEvidence({
    teamDomain: 'tokenizart.cloudflareaccess.com',
    audience: ACCESS_AUD,
    now: () => new Date(observedAt),
    fetchImpl: async (url) => {
      if (String(url).endsWith('/cdn-cgi/access/certs')) {
        return new Response(JSON.stringify(signed.jwks), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      if (String(url) === 'https://agentfriendlyweb.dev/expediente') {
        return new Response(null, {
          status: 302,
          headers: { location: `https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/agentfriendlyweb.dev?kid=${ACCESS_AUD}&meta=${signed.token}&redirect_url=%2Fexpediente` },
        });
      }
      return new Response(JSON.stringify({
        resource: 'https://agentfriendlyweb.dev/expediente',
        protected: true,
        team_domain: 'tokenizart.cloudflareaccess.com',
        authorization_servers: ['https://tokenizart.cloudflareaccess.com'],
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    },
  }), /audience/i);
});

test('Cloudflare Access meta rejects authenticated or service-token challenge state', async () => {
  const observedAt = '2026-09-02T12:00:00.000Z';
  for (const overrides of [{ auth_status: 'SUCCESS' }, { service_token_status: true }]) {
    const signed = signedAccessMeta({ observedAt, route: '/expediente', overrides });
    await assert.rejects(() => fetchCloudflareAccessEvidence({
      teamDomain: 'tokenizart.cloudflareaccess.com',
      audience: ACCESS_AUD,
      now: () => new Date(observedAt),
      fetchImpl: async (url) => {
        if (String(url).endsWith('/cdn-cgi/access/certs')) {
          return new Response(JSON.stringify(signed.jwks), { status: 200, headers: { 'content-type': 'application/json' } });
        }
        if (String(url) === 'https://agentfriendlyweb.dev/expediente') {
          return new Response(null, {
            status: 302,
            headers: { location: `https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/agentfriendlyweb.dev?kid=${ACCESS_AUD}&meta=${signed.token}&redirect_url=%2Fexpediente` },
          });
        }
        return new Response(JSON.stringify({
          resource: 'https://agentfriendlyweb.dev/expediente',
          protected: true,
          team_domain: 'tokenizart.cloudflareaccess.com',
          authorization_servers: ['https://tokenizart.cloudflareaccess.com'],
        }), { status: 200, headers: { 'content-type': 'application/json' } });
      },
    }), /anonymous challenge/i);
  }
});

test('stability baseline evidence is versioned and keeps legacy retirement unauthorized', () => {
  const evidence = JSON.parse(readFileSync('docs/evidence/cloudflare-native-stability-baseline-2026-09-02.json', 'utf8'));
  const sitesObservation = JSON.parse(readFileSync('docs/evidence/sites-rollback-operator-observation.json', 'utf8'));
  const roadmap = readFileSync('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md', 'utf8');

  assert.equal(evidence.contract_version, 'agentfriendly.cloudflare-native-stability-report.v3');
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
  assert.equal(evidence.infrastructure.cloudflare_access_edge.protected_routes.length, 3);
  assert.ok(evidence.infrastructure.cloudflare_access_edge.protected_routes.every((route) => route.meta_signature_verified));
  assert.equal(evidence.infrastructure.cloudflare_access_edge.audience, ACCESS_AUD);
  assert.equal(evidence.rollback.legacy_sites_retained, null);
  assert.equal(evidence.rollback.sites_observation_required, true);
  assert.equal(evidence.rollback.retirement_authorized, false);
  assert.equal(sitesObservation.contract_version, 'agentfriendly.sites-rollback-operator-observation.v1');
  assert.equal(sitesObservation.decisive_for_automated_audit, false);
  assert.equal(sitesObservation.project, 'agent-friendly-web');
  assert.equal(sitesObservation.environment, 'afw_public');
  assert.doesNotMatch(JSON.stringify(sitesObservation), /openai-site-verification=/i);
  assert.match(roadmap, /npm run web:audit:stability/);
  assert.match(roadmap, /2026-09-09/);
});
