import { runCloudflareNativeSmoke } from '../scripts/smoke-cloudflare-native-local.mjs';

const ORIGIN = 'https://agentfriendlyweb.dev';
const STATUS_URL = `${ORIGIN}/.well-known/infrastructure-status.json`;
const MAX_STATUS_BYTES = 64 * 1024;
const STATUS_TIMEOUT_MS = 10_000;

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
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) throw new Error(`${label} must be a non-negative integer`);
  return number;
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

export function buildCloudflareNativeStabilityReport({ observedAt, status, smoke, database }) {
  const observedMs = Date.parse(observedAt || '');
  const staleMs = validUntil(status?.stale_after);
  const checks = [
    check('public_smoke', smoke?.ok === true && smoke?.mode === 'public-edge' && smoke?.origin === ORIGIN, smoke?.ok),
    check('ledger_origin', status?.canonical_origin === ORIGIN, status?.canonical_origin),
    check('ledger_fresh', Number.isFinite(observedMs) && Number.isFinite(staleMs) && observedMs <= staleMs, status?.stale_after),
    check('runtime_state', status?.public_runtime?.state === 'cloudflare_native_production', status?.public_runtime?.state),
    check('public_traffic', status?.public_runtime?.public_traffic_percent === 100, status?.public_runtime?.public_traffic_percent),
    check('production_worker', status?.production?.state === 'deployed' && status?.production?.worker === 'agent-friendly-web-web-production', status?.production?.worker),
    check('private_access', status?.production?.private_access_enforced === true, status?.production?.private_access_enforced),
    check('ledger_database', status?.production?.migrations_applied === 6 && status?.production?.functional_table_count === FUNCTIONAL_TABLES.length && status?.production?.functional_row_count === 0, status?.production?.functional_row_count),
    check('live_database', database?.migrations === 6 && database?.functional_tables === FUNCTIONAL_TABLES.length && database?.functional_rows === 0, database?.functional_rows),
    check('database_read_only', database?.rows_written === 0 && database?.changed_db === false, database?.rows_written),
    check('legacy_no_traffic', status?.legacy_sites?.receives_apex_traffic === false, status?.legacy_sites?.receives_apex_traffic),
    check('rollback_retained', status?.legacy_sites?.state === 'rollback_retained_without_apex' && status?.legacy_sites?.custom_domain_binding_retained === true, status?.legacy_sites?.state),
    check('next_gate', status?.next_gate?.name === 'afw_cloudflare_native_stability_and_legacy_retirement', status?.next_gate?.name),
  ];

  return {
    contract_version: 'agentfriendly.cloudflare-native-stability-report.v1',
    project: 'agent-friendly-web',
    environment: 'afw_public',
    origin: ORIGIN,
    observed_at: observedAt,
    ok: checks.every((entry) => entry.ok),
    checks,
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
  const text = await response.text();
  if (new TextEncoder().encode(text).byteLength > MAX_STATUS_BYTES) throw new Error('infrastructure ledger exceeds byte limit');
  return JSON.parse(text);
}

export async function runCloudflareNativeStabilityAudit({
  observedAt = new Date().toISOString(),
  fetchImpl = fetch,
  smokeRunner = runCloudflareNativeSmoke,
  d1Read,
} = {}) {
  if (typeof d1Read !== 'function') throw new Error('d1Read is required');
  const smoke = await smokeRunner({ baseUrl: ORIGIN, mode: 'public-edge', fetchImpl });
  const response = await fetchImpl(STATUS_URL, {
    method: 'GET',
    redirect: 'error',
    signal: AbortSignal.timeout(STATUS_TIMEOUT_MS),
    headers: { accept: 'application/json' },
  });
  const status = await readBoundedJson(response);
  const database = await d1Read(PRODUCTION_D1_READ_SQL);
  return buildCloudflareNativeStabilityReport({ observedAt, status, smoke, database });
}
