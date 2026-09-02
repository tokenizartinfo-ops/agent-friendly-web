import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const PRODUCTION_CUTOVER_CONTRACT = 'agentfriendly.cloudflare-native-production-cutover.v1';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const AUDIENCE = /^[0-9a-f]{64}$/i;
const HEX32 = /^[0-9a-f]{32}$/i;
const HEX40 = /^[0-9a-f]{40}$/i;
const SITE_PROJECT = /^appgprj_[0-9a-f]{32}$/i;
const SITE_DOMAIN = /^appgdom_[0-9a-f]{32}$/i;
const PLACEHOLDER_IDS = new Set([
  '00000000-0000-4000-8000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
]);
const REQUIRED_PRIVATE_DESTINATIONS = Object.freeze([
  'agentfriendlyweb.dev/expediente*',
  'agentfriendlyweb.dev/capsula/*',
  'agentfriendlyweb.dev/api/projects',
  'agentfriendlyweb.dev/api/projects/*',
]);
const REQUIRED_APEX_ADDRESSES = new Set(['162.159.143.30', '172.66.3.26']);

function requireValue(errors, condition, message) {
  if (!condition) errors.push(message);
}

function realUuid(value) {
  return UUID.test(String(value || '')) && !PLACEHOLDER_IDS.has(String(value));
}

function exactStringSet(value, expected) {
  return Array.isArray(value)
    && value.length === expected.length
    && expected.every((item) => value.includes(item));
}

function validDnsSnapshot(value) {
  if (!Array.isArray(value) || value.length !== 2) return false;
  const addresses = new Set();
  for (const record of value) {
    if (!HEX32.test(String(record?.id || ''))) return false;
    if (record.type !== 'A' || record.name !== 'agentfriendlyweb.dev') return false;
    if (record.proxied !== false || record.ttl !== 1) return false;
    addresses.add(record.content);
  }
  return addresses.size === 2 && [...REQUIRED_APEX_ADDRESSES].every((address) => addresses.has(address));
}

export function validateProductionCutoverPreflight(metadata = {}, { now = new Date() } = {}) {
  const errors = [];
  const authorization = metadata.authorization || {};
  const worker = metadata.worker || {};
  const database = metadata.database || {};
  const access = metadata.access || {};
  const release = metadata.release || {};
  const comparison = metadata.comparison || {};
  const legacy = metadata.legacy || {};
  const dnsSnapshot = metadata.dns_snapshot || {};
  const traffic = metadata.traffic || {};
  const capabilities = metadata.capabilities || {};
  const verification = metadata.verification || {};

  requireValue(errors, metadata.contract_version === PRODUCTION_CUTOVER_CONTRACT, 'contract_version is invalid');
  requireValue(errors, metadata.phase === 'apex_cutover_ready', 'phase must be apex_cutover_ready');
  requireValue(errors, metadata.project === 'agent-friendly-web', 'project must be agent-friendly-web');
  requireValue(errors, metadata.repository === 'tokenizartinfo-ops/agent-friendly-web', 'repository must be tokenizartinfo-ops/agent-friendly-web');
  requireValue(errors, metadata.environment === 'afw_public', 'environment must be afw_public');
  requireValue(errors, metadata.origin === 'https://agentfriendlyweb.dev', 'origin must be the Agent Friendly Web apex');
  requireValue(errors, metadata.allowed_action === 'bounded_cloudflare_native_apex_cutover', 'allowed_action is invalid');

  const preparedAt = new Date(metadata.prepared_at || '');
  const expiresAt = new Date(metadata.expires_at || '');
  const currentTime = now instanceof Date ? now : new Date(now);
  requireValue(errors, Number.isFinite(preparedAt.getTime()), 'prepared_at must be a valid timestamp');
  requireValue(errors, Number.isFinite(expiresAt.getTime()), 'expires_at must be a valid timestamp');
  requireValue(errors, Number.isFinite(currentTime.getTime()), 'preflight current time is invalid');
  if (Number.isFinite(preparedAt.getTime()) && Number.isFinite(expiresAt.getTime())) {
    const windowMs = expiresAt.getTime() - preparedAt.getTime();
    requireValue(errors, windowMs >= 15 * 60_000 && windowMs <= 120 * 60_000, 'cutover window must be between 15 and 120 minutes');
    requireValue(errors, currentTime.getTime() >= preparedAt.getTime(), 'cutover window is not active yet');
    requireValue(errors, currentTime.getTime() <= expiresAt.getTime(), 'cutover preflight has expired');
  }

  requireValue(errors, authorization.approved === true, 'production cutover authorization must be explicit');
  requireValue(errors, authorization.owner === 'Gabriel Mucchiut', 'authorization owner is invalid');
  requireValue(errors, authorization.scope === 'agent-friendly-web-production-cutover-v1', 'authorization scope is invalid');

  requireValue(errors, worker.name === 'agent-friendly-web-web-production', 'worker.name is invalid');
  requireValue(errors, worker.workers_dev === false, 'worker.workers_dev must be false');
  requireValue(errors, worker.preview_urls === false, 'worker.preview_urls must be false');
  requireValue(errors, worker.deployed === true, 'worker deployment must be confirmed');
  requireValue(errors, realUuid(worker.deployment_id), 'worker.deployment_id is missing or placeholder');
  requireValue(errors, realUuid(worker.version_id), 'worker.version_id is missing or placeholder');
  requireValue(errors, worker.apex_custom_domain_attached === false, 'apex custom domain must remain detached before cutover');

  requireValue(errors, database.name === 'agent-friendly-web-web-production', 'database.name is invalid');
  requireValue(errors, realUuid(database.id), 'database.id is missing or placeholder');
  requireValue(errors, database.isolation === 'production_only', 'database.isolation must be production_only');
  requireValue(errors, database.schema_state === 'migrations_applied_empty', 'database schema must be migrated and empty');
  requireValue(errors, database.migration_count === 6, 'database must contain six migration receipts');
  requireValue(errors, database.functional_table_count === 13, 'database must contain thirteen functional tables');
  requireValue(errors, database.functional_row_count === 0, 'database functional row count must be zero');
  requireValue(errors, database.rows_written_during_verification === 0, 'database verification must write zero rows');
  requireValue(errors, database.time_travel_bookmark_recorded === true, 'database time travel bookmark must be recorded');

  requireValue(errors, realUuid(access.application_id), 'Access application_id is missing or placeholder');
  requireValue(errors, AUDIENCE.test(String(access.audience || '')), 'Access audience is invalid');
  requireValue(errors, access.team_domain === 'tokenizart.cloudflareaccess.com', 'Access team_domain is invalid');
  requireValue(errors, access.policy_decision === 'allow', 'Access policy must be allow');
  requireValue(errors, exactStringSet(access.allowed_emails, ['tokenizart.info@gmail.com']), 'Access allowlist must contain only the owner');
  requireValue(errors, access.release_origin_protected === true, 'Access must protect the release origin');
  requireValue(errors, access.apex_private_destinations_prepared === true, 'Access apex destinations must be prepared');
  requireValue(errors, exactStringSet(access.apex_private_destinations, REQUIRED_PRIVATE_DESTINATIONS), 'Access apex private destinations are incomplete');

  requireValue(errors, release.origin === 'https://release.agentfriendlyweb.dev', 'release origin is invalid');
  requireValue(errors, HEX40.test(String(release.custom_domain_id || '')), 'release custom domain ID is invalid');
  requireValue(errors, release.anonymous_access_smoke === 'passed', 'release anonymous Access smoke must pass');
  requireValue(errors, release.authenticated_html === 'passed', 'release authenticated HTML must pass');
  requireValue(errors, exactStringSet(release.responsive_qa, ['1440x900', '390x844']), 'release responsive QA is incomplete');
  requireValue(errors, release.detach_reattach_rollback === 'passed', 'release detach and reattach rollback must pass');

  requireValue(errors, comparison.baseline_origin_before_cutover === 'https://agentfriendlyweb.dev', 'comparison baseline origin is invalid');
  requireValue(errors, comparison.local_candidate_origin === 'http://127.0.0.1:8788', 'comparison local candidate origin is invalid');
  requireValue(errors, comparison.remote_release_origin === 'https://release.agentfriendlyweb.dev', 'comparison remote release origin is invalid');
  requireValue(errors, comparison.local_semantic_status === 'passed', 'comparison local semantic status must pass');
  requireValue(errors, comparison.local_semantic_critical_failures === 0, 'comparison local semantic failures must be zero');
  requireValue(errors, comparison.remote_release_anonymous_access_smoke === 'passed', 'release remote anonymous Access smoke must pass');
  requireValue(errors, comparison.remote_release_authenticated_html === 'passed', 'release remote authenticated HTML must pass');

  requireValue(errors, legacy.provider === 'OpenAI Sites', 'legacy provider must be OpenAI Sites');
  requireValue(errors, SITE_PROJECT.test(String(legacy.project_id || '')), 'legacy Sites project ID is invalid');
  requireValue(errors, SITE_DOMAIN.test(String(legacy.custom_domain_id || '')), 'legacy Sites custom domain ID is invalid');
  requireValue(errors, legacy.binding_state === 'active_retained_for_rollback', 'legacy Sites binding must remain active for rollback');
  requireValue(errors, legacy.validation_txt_retained === true, 'legacy Sites validation TXT must be retained');

  requireValue(errors, dnsSnapshot.zone_id === '4b1a3fe4b6dcb81e9d6a633174c5939f', 'DNS zone ID is invalid');
  requireValue(errors, validDnsSnapshot(dnsSnapshot.apex_records), 'DNS apex snapshot is incomplete or invalid');
  requireValue(errors, dnsSnapshot.rollback_restore_ready === true, 'DNS rollback restore must be ready');

  requireValue(errors, traffic.public_percent_before_cutover === 0, 'public traffic must remain zero before cutover');
  requireValue(errors, traffic.canonical_origin_unchanged === true, 'canonical origin must remain unchanged before cutover');
  requireValue(errors, traffic.release_linked_publicly === false, 'release origin must not be linked publicly');

  requireValue(errors, capabilities.contact_writes === false, 'contact writes must remain disabled');
  requireValue(errors, capabilities.email_sending === false, 'email sending must remain disabled');
  requireValue(errors, capabilities.crm_remote === false, 'remote CRM must remain disabled');
  requireValue(errors, capabilities.payments === false, 'payments must remain disabled');
  requireValue(errors, capabilities.tokenizart_runtime_dependency === false, 'Tokenizart runtime dependency is forbidden');

  requireValue(errors, verification.full_suite === 'passed', 'full suite must pass');
  requireValue(errors, verification.build === 'passed', 'build must pass');
  requireValue(errors, verification.lint_errors === 0, 'lint errors must be zero');
  requireValue(errors, verification.production_dry_run === 'passed', 'production dry-run must pass');
  requireValue(errors, Number.isInteger(verification.rollback_window_minutes) && verification.rollback_window_minutes >= 15 && verification.rollback_window_minutes <= 120, 'rollback window must be between 15 and 120 minutes');

  return {
    ok: errors.length === 0,
    contract_version: PRODUCTION_CUTOVER_CONTRACT,
    phase: metadata.phase || '',
    project: metadata.project || '',
    environment: metadata.environment || '',
    origin: metadata.origin || '',
    errors,
  };
}

async function main() {
  const inputIndex = process.argv.indexOf('--input');
  const inputPath = inputIndex === -1 ? '' : process.argv[inputIndex + 1];
  if (!inputPath) throw new Error('Usage: node scripts/preflight-cloudflare-native-production.mjs --input <metadata.json>');
  const metadata = JSON.parse(await readFile(inputPath, 'utf8'));
  const report = validateProductionCutoverPreflight(metadata);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
