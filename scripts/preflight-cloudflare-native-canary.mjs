import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const CANARY_PREFLIGHT_CONTRACT = 'agentfriendly.cloudflare-native-canary.v1';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const AUDIENCE = /^[0-9a-f]{64}$/i;
const CUSTOM_DOMAIN_ID = /^[0-9a-f]{40}$/i;
const PLACEHOLDER_IDS = new Set([
  '00000000-0000-4000-8000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
]);

function requireValue(errors, condition, message) {
  if (!condition) errors.push(message);
}

export function validateCanaryPreflight(metadata = {}) {
  const errors = [];
  const worker = metadata.worker || {};
  const database = metadata.database || {};
  const access = metadata.access || {};
  const traffic = metadata.traffic || {};
  const rollback = metadata.rollback || {};

  requireValue(errors, metadata.contract_version === CANARY_PREFLIGHT_CONTRACT, 'contract_version is invalid');
  requireValue(errors, metadata.project === 'agent-friendly-web', 'project must be agent-friendly-web');
  requireValue(errors, metadata.repository === 'tokenizartinfo-ops/agent-friendly-web', 'repository must be tokenizartinfo-ops/agent-friendly-web');
  requireValue(errors, metadata.environment === 'afw_canary', 'environment must be afw_canary');
  requireValue(errors, metadata.origin === 'https://canary.agentfriendlyweb.dev', 'origin must be the Agent Friendly Web canary');

  requireValue(errors, worker.name === 'agent-friendly-web-web-canary', 'worker.name is invalid');
  requireValue(errors, worker.workers_dev === false, 'worker.workers_dev must be false');
  requireValue(errors, worker.preview_urls === false, 'worker.preview_urls must be false');
  requireValue(errors, worker.deployed === true, 'worker deployment must be confirmed');
  requireValue(errors, UUID.test(worker.deployment_id || '') && !PLACEHOLDER_IDS.has(worker.deployment_id), 'worker.deployment_id is missing or placeholder');
  requireValue(errors, UUID.test(worker.version_id || '') && !PLACEHOLDER_IDS.has(worker.version_id), 'worker.version_id is missing or placeholder');
  requireValue(errors, worker.custom_domain_attached === true, 'worker custom domain must be attached');
  requireValue(errors, CUSTOM_DOMAIN_ID.test(worker.custom_domain_id || ''), 'worker.custom_domain_id is missing or invalid');

  requireValue(errors, database.name === 'agent-friendly-web-web-canary', 'database.name is invalid');
  requireValue(errors, UUID.test(database.id || '') && !PLACEHOLDER_IDS.has(database.id), 'database.id is missing or placeholder');
  requireValue(errors, database.isolation === 'canary_only', 'database.isolation must be canary_only');
  requireValue(errors, database.schema_state === 'migrations_applied_empty', 'database.schema_state must confirm empty migrated schema');
  requireValue(errors, database.row_count === 0, 'database.row_count must be zero');
  requireValue(errors, database.backup_state === 'new_empty_database_no_backup_required', 'database.backup_state is invalid');

  requireValue(errors, UUID.test(access.application_id || '') && !PLACEHOLDER_IDS.has(access.application_id), 'access.application_id is missing or placeholder');
  requireValue(errors, AUDIENCE.test(access.audience || ''), 'access.audience is missing or invalid');
  requireValue(errors, access.team_domain === 'tokenizart.cloudflareaccess.com', 'access.team_domain is invalid');
  requireValue(errors, access.policy_decision === 'allow', 'access.policy_decision must be allow');
  requireValue(errors, Array.isArray(access.allowed_emails) && access.allowed_emails.length === 1 && access.allowed_emails[0] === 'tokenizart.info@gmail.com', 'access.allowed_emails must contain only the canary owner');
  requireValue(errors, access.protected_before_domain_attach === true, 'Access must be protected before domain attach');

  requireValue(errors, traffic.public_percent === 0, 'traffic.public_percent must be zero');
  requireValue(errors, traffic.canonical_origin_unchanged === true, 'traffic.canonical_origin_unchanged must be true');
  requireValue(errors, traffic.canonical_origin === 'https://agentfriendlyweb.dev', 'traffic.canonical_origin is invalid');
  requireValue(errors, traffic.canary_linked_from_public_site === false, 'canary must not be linked from the public site');

  requireValue(errors, rollback.action === 'detach_canary_custom_domain', 'rollback.action is invalid');
  requireValue(errors, rollback.production_change_required === false, 'rollback must not require a production change');
  requireValue(errors, rollback.canonical_origin === 'https://agentfriendlyweb.dev', 'rollback canonical origin is invalid');
  requireValue(errors, rollback.legacy_runtime_observed === 'OpenAI Sites', 'rollback must record the observed legacy runtime');

  return {
    ok: errors.length === 0,
    contract_version: CANARY_PREFLIGHT_CONTRACT,
    project: metadata.project || '',
    environment: metadata.environment || '',
    origin: metadata.origin || '',
    errors,
  };
}

async function main() {
  const inputIndex = process.argv.indexOf('--input');
  const inputPath = inputIndex === -1 ? '' : process.argv[inputIndex + 1];
  if (!inputPath) throw new Error('Usage: node scripts/preflight-cloudflare-native-canary.mjs --input <metadata.json>');
  const metadata = JSON.parse(await readFile(inputPath, 'utf8'));
  const report = validateCanaryPreflight(metadata);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
