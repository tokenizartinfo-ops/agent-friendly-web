import {
  CLOUD_NATIVE_SMOKE_ROUTES,
  runCloudflareNativeSmoke,
} from '../scripts/smoke-cloudflare-native-local.mjs';

const ORIGIN = 'https://agentfriendlyweb.dev';
const STATUS_URL = `${ORIGIN}/.well-known/infrastructure-status.json`;
const MAX_STATUS_BYTES = 64 * 1024;
const STATUS_TIMEOUT_MS = 10_000;
const MAX_CONTROL_PLANE_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const CLOUDFLARE_ACCOUNT_ID = '85d0d5dadac3341a564f22ce885e9eec';
const CLOUDFLARE_DOMAIN_ID = '57a78f718d4dabc302bbcd2c17dbdc8e8882b8d3';
const PRODUCTION_WORKER = 'agent-friendly-web-web-production';
const PRODUCTION_D1_ID = 'd26fc9d2-df5a-4957-8e58-cc4c945faad8';
const LEGACY_SITES_PROJECT_ID = 'appgprj_6a8f19e35d688191a53e93432543e39c';
const LEGACY_SITES_DOMAIN_ID = 'appgdom_6a8f665d5bc881919ac5fbdd05f69cbd';

export const FUNCTIONAL_TABLES = Object.freeze([
  'site_projects',
  'project_events',
  'registry_sites',
  'domain_claims',
  'owner_attestations',
  'public_profiles',
  'scan_observations',
  'publication_capsules',
  'capsule_approvals',
  'capsule_origin_comparisons',
  'draft_pr_plans',
  'contact_leads',
  'consent_receipts',
]);

const functionalRowExpression = FUNCTIONAL_TABLES
  .map((table) => `(SELECT COUNT(*) FROM ${table})`)
  .join(' + ');

export const PRODUCTION_D1_READ_SQL = [
  'SELECT',
  '  (SELECT COUNT(*) FROM d1_migrations) AS migrations,',
  "  (SELECT COUNT(*) FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('_cf_KV', 'd1_migrations')) AS functional_tables,",
  `  ${functionalRowExpression} AS functional_rows;`,
].join('\n');

function requireInteger(value, label) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
  return value;
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string`);
  return value;
}

function parseJson(serialized, label) {
  try {
    return JSON.parse(serialized);
  } catch {
    throw new Error(`${label} must be valid JSON`);
  }
}

export function parseProductionWorkerConfig(serialized) {
  const payload = parseJson(serialized, 'Wrangler production config');
  const production = payload?.env?.production;
  const databases = production?.d1_databases;
  if (!production || !Array.isArray(databases) || databases.length !== 1) {
    throw new Error('Wrangler production config must define exactly one D1 binding');
  }
  const database = databases[0];
  return {
    worker: requireString(production.name, 'production Worker name'),
    d1_binding: requireString(database?.binding, 'production D1 binding'),
    d1_database_name: requireString(database?.database_name, 'production D1 database name'),
    d1_database_id: requireString(database?.database_id, 'production D1 database ID'),
  };
}

export function parseWranglerDeployments(serialized) {
  const payload = parseJson(serialized, 'Wrangler deployments');
  if (!Array.isArray(payload) || payload.length === 0) throw new Error('Wrangler deployments must contain a deployment');
  const ordered = [...payload].sort((left, right) => Date.parse(right?.created_on || '') - Date.parse(left?.created_on || ''));
  const deployment = ordered[0];
  if (!Number.isFinite(Date.parse(deployment?.created_on || '')) || !Array.isArray(deployment?.versions) || deployment.versions.length !== 1) {
    throw new Error('active production deployment must contain one version');
  }
  const version = deployment.versions[0];
  return {
    deployment_id: requireString(deployment.id, 'production deployment ID'),
    version_id: requireString(version?.version_id, 'production version ID'),
    percentage: requireInteger(version?.percentage, 'production deployment percentage'),
  };
}

export function parseWranglerVersion(serialized) {
  const payload = parseJson(serialized, 'Wrangler version');
  const d1Bindings = Array.isArray(payload?.resources?.bindings)
    ? payload.resources.bindings.filter((binding) => binding?.type === 'd1')
    : [];
  if (d1Bindings.length !== 1) throw new Error('production Worker version must contain one D1 binding');
  const database = d1Bindings[0];
  return {
    version_id: requireString(payload.id, 'production version ID'),
    d1_binding: requireString(database.name, 'remote D1 binding'),
    d1_database_id: requireString(database.database_id || database.id, 'remote D1 database ID'),
  };
}

export function parseWranglerD1Read(serialized) {
  let payload;
  try {
    payload = JSON.parse(serialized);
  } catch {
    throw new Error('wrangler must return JSON for a single successful D1 read');
  }
  if (!Array.isArray(payload) || payload.length !== 1 || payload[0]?.success !== true) {
    throw new Error('wrangler must return a single successful D1 read');
  }
  const execution = payload[0];
  if (!Array.isArray(execution.results) || execution.results.length !== 1) {
    throw new Error('D1 read must return one scalar result');
  }
  const rowsWritten = requireInteger(execution.meta?.rows_written ?? execution.meta?.changes, 'D1 rows_written');
  const changedDb = execution.meta?.changed_db;
  if (rowsWritten !== 0 || changedDb !== false) throw new Error('D1 stability verification must not write');
  const row = execution.results[0];
  return {
    migrations: requireInteger(row.migrations, 'D1 migrations'),
    functional_tables: requireInteger(row.functional_tables, 'D1 functional_tables'),
    functional_rows: requireInteger(row.functional_rows, 'D1 functional_rows'),
    rows_written: rowsWritten,
    changed_db: changedDb,
  };
}

function validUntil(staleAfter) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(staleAfter || '')) return Number.NaN;
  return Date.parse(`${staleAfter}T23:59:59.999Z`);
}

function check(id, ok, evidence) {
  return { id, ok: Boolean(ok), evidence };
}

function isFreshObservation(observedMs, evidenceAt, maxAgeMs) {
  const evidenceMs = Date.parse(evidenceAt || '');
  return Number.isFinite(observedMs)
    && Number.isFinite(evidenceMs)
    && evidenceMs <= observedMs + MAX_CLOCK_SKEW_MS
    && observedMs - evidenceMs <= maxAgeMs;
}

function smokeResult(smoke) {
  const expected = new Map(CLOUD_NATIVE_SMOKE_ROUTES.map((route) => [route.path, route]));
  if (smoke?.contract_version !== 'agentfriendly.cloudflare-native-smoke.v1'
    || smoke?.mode !== 'public-edge'
    || smoke?.origin !== ORIGIN
    || smoke?.ok !== true
    || !Array.isArray(smoke?.checks)
    || smoke.checks.length !== expected.size) return false;

  const seen = new Set();
  for (const result of smoke.checks) {
    const route = expected.get(result?.path);
    if (!route || seen.has(result.path) || result.ok !== true) return false;
    seen.add(result.path);
    if (route.boundary === 'public') {
      if (result.boundary !== 'public' || result.status !== 200) return false;
    } else if (result.boundary !== 'cloudflare_access' || ![301, 302, 303, 307, 308].includes(result.status)) {
      return false;
    }
  }
  return seen.size === expected.size;
}

function sanitizedSmokeChecks(smoke) {
  if (!Array.isArray(smoke?.checks)) return [];
  return smoke.checks.map(({ path, boundary, status, ok }) => ({ path, boundary, status, ok: ok === true }));
}

export function buildCloudflareNativeStabilityReport({ observedAt, status, smoke, infrastructure, database }) {
  const observedMs = Date.parse(observedAt || '');
  const staleMs = validUntil(status?.stale_after);
  const local = infrastructure?.local_config;
  const remote = infrastructure?.remote_worker;
  const domain = infrastructure?.cloudflare_custom_domain;
  const legacy = infrastructure?.legacy_sites;
  const sameDatabase = local?.d1_database_id === PRODUCTION_D1_ID
    && remote?.d1_database_id === local?.d1_database_id
    && database?.database_id === local?.d1_database_id;
  const checks = [
    check('public_smoke', smokeResult(smoke), Array.isArray(smoke?.checks) ? smoke.checks.length : 0),
    check('infrastructure_observation_fresh', isFreshObservation(observedMs, infrastructure?.observed_at, MAX_CLOCK_SKEW_MS), infrastructure?.observed_at),
    check('control_plane_observation_fresh', isFreshObservation(observedMs, infrastructure?.control_plane_observed_at, MAX_CONTROL_PLANE_AGE_MS), infrastructure?.control_plane_observed_at),
    check('local_production_config', local?.worker === PRODUCTION_WORKER && local?.d1_binding === 'DB' && local?.d1_database_name === PRODUCTION_WORKER && local?.d1_database_id === PRODUCTION_D1_ID, local?.worker),
    check('remote_worker_deployment', remote?.worker === PRODUCTION_WORKER && remote?.percentage === 100 && typeof remote?.deployment_id === 'string' && typeof remote?.version_id === 'string', remote?.deployment_id),
    check('remote_worker_version', remote?.d1_binding === 'DB' && sameDatabase, remote?.version_id),
    check('cloudflare_custom_domain', domain?.account_id === CLOUDFLARE_ACCOUNT_ID && domain?.domain_id === CLOUDFLARE_DOMAIN_ID && domain?.hostname === 'agentfriendlyweb.dev' && domain?.service === PRODUCTION_WORKER && domain?.environment === 'production' && domain?.enabled === true && domain?.previews_enabled === false, domain?.service),
    check('sites_rollback_observed', legacy?.project_id === LEGACY_SITES_PROJECT_ID && legacy?.project_status === 'active' && legacy?.domain_binding_id === LEGACY_SITES_DOMAIN_ID && legacy?.hostname === 'agentfriendlyweb.dev' && legacy?.status === 'active' && legacy?.provider_status === 'active' && legacy?.ssl_status === 'active', legacy?.domain_binding_id),
    check('ledger_origin', status?.canonical_origin === ORIGIN, status?.canonical_origin),
    check('ledger_fresh', Number.isFinite(observedMs) && Number.isFinite(staleMs) && observedMs <= staleMs, status?.stale_after),
    check('runtime_state_declaration', status?.public_runtime?.state === 'cloudflare_native_production', status?.public_runtime?.state),
    check('public_traffic_declaration', status?.public_runtime?.public_traffic_percent === 100, status?.public_runtime?.public_traffic_percent),
    check('production_worker_declaration', status?.production?.state === 'deployed' && status?.production?.worker === PRODUCTION_WORKER, status?.production?.worker),
    check('private_access_declaration', status?.production?.private_access_enforced === true, status?.production?.private_access_enforced),
    check('ledger_database_declaration', status?.production?.migrations_applied === 6 && status?.production?.functional_table_count === FUNCTIONAL_TABLES.length && status?.production?.functional_row_count === 0, status?.production?.functional_row_count),
    check('live_database', database?.migrations === 6 && database?.functional_tables === FUNCTIONAL_TABLES.length && database?.functional_rows === 0, database?.functional_rows),
    check('database_read_only', database?.rows_written === 0 && database?.changed_db === false, database?.rows_written),
    check('database_identity', sameDatabase, database?.database_id),
    check('legacy_no_traffic_declaration', status?.legacy_sites?.receives_apex_traffic === false, status?.legacy_sites?.receives_apex_traffic),
    check('rollback_retained_declaration', status?.legacy_sites?.state === 'rollback_retained_without_apex' && status?.legacy_sites?.custom_domain_binding_retained === true, status?.legacy_sites?.state),
    check('next_gate', status?.next_gate?.name === 'afw_cloudflare_native_stability_and_legacy_retirement', status?.next_gate?.name),
  ];

  return {
    contract_version: 'agentfriendly.cloudflare-native-stability-report.v2',
    project: 'agent-friendly-web',
    environment: 'afw_public',
    origin: ORIGIN,
    observed_at: observedAt,
    ok: checks.every((entry) => entry.ok),
    checks,
    smoke_checks: sanitizedSmokeChecks(smoke),
    infrastructure,
    database,
    rollback: {
      legacy_sites_retained: status?.legacy_sites?.custom_domain_binding_retained === true,
      retirement_authorized: false,
    },
  };
}

async function readBoundedJson(response) {
  if (response.status !== 200 || !(response.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) {
    throw new Error('infrastructure ledger must return JSON 200');
  }
  const declared = Number(response.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_STATUS_BYTES) throw new Error('infrastructure ledger exceeds byte limit');
  if (!response.body) throw new Error('infrastructure ledger body is required');
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_STATUS_BYTES) {
        await reader.cancel();
        throw new Error('infrastructure ledger exceeds byte limit');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

export async function runCloudflareNativeStabilityAudit({
  observedAt = new Date().toISOString(),
  fetchImpl = fetch,
  smokeRunner = runCloudflareNativeSmoke,
  infrastructureRead,
  d1Read,
} = {}) {
  if (typeof infrastructureRead !== 'function') throw new Error('infrastructureRead is required');
  if (typeof d1Read !== 'function') throw new Error('d1Read is required');
  const smoke = await smokeRunner({ baseUrl: ORIGIN, mode: 'public-edge', fetchImpl });
  const response = await fetchImpl(STATUS_URL, {
    method: 'GET',
    redirect: 'error',
    signal: AbortSignal.timeout(STATUS_TIMEOUT_MS),
    headers: { accept: 'application/json' },
  });
  const status = await readBoundedJson(response);
  const infrastructure = await infrastructureRead();
  const database = await d1Read(PRODUCTION_D1_READ_SQL);
  return buildCloudflareNativeStabilityReport({ observedAt, status, smoke, infrastructure, database });
}
