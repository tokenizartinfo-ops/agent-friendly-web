import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const PRIVATE_HUMAN_PRIVACY_PILOT_PREFLIGHT_CONTRACT =
  'agent-friendly-web.private-human-privacy-pilot-canary-preflight.v1';

const CANARY_DATABASE_ID = '2b518988-eacb-4c31-b760-4e58c3c0285b';
const PRODUCTION_DATABASE_ID = 'd26fc9d2-df5a-4957-8e58-cc4c945faad8';
const REQUIRED_MIGRATION = '0008_contact_privacy_lifecycle.sql';
const HASH = /^[0-9a-f]{64}$/;
const PUBLIC_FLAGS = [
  'AFW_REAL_CONTACT_ENABLED',
  'AFW_PRIVACY_REQUESTS_ENABLED',
  'AFW_RETENTION_JOBS_ENABLED',
  'AFW_PRODUCT_UPDATES_ENABLED',
];
const REQUIRED_FLAGS = [
  'AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED',
  ...PUBLIC_FLAGS,
];

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasExactKeys(value, expectedKeys) {
  if (!isRecord(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  return actual.length === expected.length
    && actual.every((key, index) => key === expected[index]);
}

function hasPiiLikeMetadata(value, key = '') {
  if (/(?:^|_)(?:email|full_name|first_name|last_name|contact_name|jwt|cookie|token|secret|password|credential|pii)(?:_|$)/i.test(key)) {
    return true;
  }
  if (typeof value === 'string') {
    return /@|\bbearer\s+|private[-_ ]?(?:key|credential)|password/i.test(value);
  }
  if (Array.isArray(value)) return value.some((item) => hasPiiLikeMetadata(item));
  if (!isRecord(value)) return false;
  return Object.entries(value).some(([childKey, child]) => hasPiiLikeMetadata(child, childKey));
}

function hasExpectedShape(metadata) {
  if (!hasExactKeys(metadata, [
    'contract', 'project', 'repository', 'environment', 'origin', 'route',
    'resources', 'access', 'migrations', 'expected_flags', 'mutation_policy', 'rollback',
  ])) return false;
  if (!hasExactKeys(metadata.route, ['path', 'visibility', 'access_required'])) return false;
  if (!hasExactKeys(metadata.resources, [
    'canary_worker', 'canary_database', 'production_worker', 'production_database',
  ])) return false;
  if (!hasExactKeys(metadata.resources.canary_worker, ['name'])) return false;
  if (!hasExactKeys(metadata.resources.production_worker, ['name'])) return false;
  if (!hasExactKeys(metadata.resources.canary_database, ['name', 'id'])) return false;
  if (!hasExactKeys(metadata.resources.production_database, ['name', 'id'])) return false;
  if (!hasExactKeys(metadata.access, [
    'verified', 'audience_configured', 'allowed_subject_hashes',
  ])) return false;
  if (!Array.isArray(metadata.migrations)) return false;
  if (!hasExactKeys(metadata.expected_flags, ['base', 'canary', 'production'])) return false;
  if (!['base', 'canary', 'production'].every(
    (environment) => hasExactKeys(metadata.expected_flags[environment], REQUIRED_FLAGS),
  )) return false;
  if (!hasExactKeys(metadata.mutation_policy, [
    'local_preflight_only', 'canary_remote_mutation',
    'production_mutation', 'cross_project_mutation',
  ])) return false;
  return hasExactKeys(metadata.rollback, [
    'worker_action', 'database_action', 'time_travel_bookmark_recorded',
    'production_change_required',
  ]);
}

function rejected(code) {
  return { ready: false, code };
}

function allPublicFlagsAreOff(expectedFlags) {
  return ['base', 'canary', 'production'].every(
    (environment) => PUBLIC_FLAGS.every(
      (flag) => expectedFlags[environment][flag] === 'false',
    ),
  );
}

function pilotIsOff(expectedFlags) {
  return ['base', 'canary', 'production'].every(
    (environment) => expectedFlags[environment].AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED === 'false',
  );
}

export function validatePrivateHumanPrivacyPilotPreflight(metadata = {}) {
  if (hasPiiLikeMetadata(metadata)) return rejected('pii_metadata_forbidden');
  if (!hasExpectedShape(metadata)) return rejected('unexpected_metadata');
  if (metadata.contract !== PRIVATE_HUMAN_PRIVACY_PILOT_PREFLIGHT_CONTRACT) {
    return rejected('invalid_contract');
  }
  if (metadata.project !== 'agent-friendly-web') return rejected('invalid_project');
  if (metadata.repository !== 'tokenizartinfo-ops/agent-friendly-web') {
    return rejected('invalid_repository');
  }
  if (metadata.environment !== 'afw_canary') return rejected('invalid_environment');
  if (metadata.origin !== 'https://canary.agentfriendlyweb.dev') return rejected('invalid_origin');
  if (metadata.route.path !== '/api/canary/private-human-privacy-pilot') {
    return rejected('invalid_route');
  }
  if (metadata.route.visibility !== 'private') return rejected('route_not_private');
  if (metadata.route.access_required !== true) return rejected('access_required');

  const resources = metadata.resources;
  if (resources.canary_worker.name !== 'agent-friendly-web-web-canary') {
    return rejected('invalid_canary_worker');
  }
  if (
    resources.canary_database.name !== 'agent-friendly-web-web-canary'
    || resources.canary_database.id !== CANARY_DATABASE_ID
    || resources.canary_database.id === resources.production_database.id
  ) return rejected('invalid_canary_database');
  if (resources.production_worker.name !== 'agent-friendly-web-web-production') {
    return rejected('invalid_production_worker');
  }
  if (
    resources.production_database.name !== 'agent-friendly-web-web-production'
    || resources.production_database.id !== PRODUCTION_DATABASE_ID
  ) return rejected('invalid_production_database');

  if (metadata.access.verified !== true || metadata.access.audience_configured !== true) {
    return rejected('access_required');
  }
  if (
    !Array.isArray(metadata.access.allowed_subject_hashes)
    || metadata.access.allowed_subject_hashes.length !== 1
    || !HASH.test(metadata.access.allowed_subject_hashes[0])
  ) return rejected('invalid_access_allowlist');
  if (
    metadata.migrations.length !== 1
    || metadata.migrations[0] !== REQUIRED_MIGRATION
  ) return rejected('migration_not_declared');
  if (!allPublicFlagsAreOff(metadata.expected_flags)) return rejected('unsafe_public_flags');
  if (!pilotIsOff(metadata.expected_flags)) return rejected('pilot_not_disabled');

  const mutation = metadata.mutation_policy;
  if (
    mutation.local_preflight_only !== true
    || mutation.canary_remote_mutation !== false
  ) return rejected('remote_mutation_forbidden');
  if (mutation.production_mutation !== false) return rejected('production_mutation_forbidden');
  if (mutation.cross_project_mutation !== false) return rejected('cross_project_mutation_forbidden');

  const rollback = metadata.rollback;
  if (
    rollback.worker_action !== 'restore_previous_canary_worker_version_with_every_switch_off'
    || rollback.database_action
      !== 'use_recorded_d1_time_travel_bookmark_and_reapply_erasure_tombstone'
    || rollback.time_travel_bookmark_recorded !== true
    || rollback.production_change_required !== false
  ) return rejected('rollback_not_declared');

  return {
    ready: true,
    code: 'private_human_privacy_pilot_ready',
    environment: 'afw_canary',
    realContactPublic: false,
    productUpdates: false,
  };
}

function parseInputPath(args) {
  if (args.length !== 2 || args[0] !== '--input' || !args[1]) return '';
  return args[1];
}

export async function runPrivateHumanPrivacyPilotPreflight(inputPath) {
  if (!inputPath) return rejected('invalid_arguments');
  try {
    const metadata = JSON.parse(await readFile(inputPath, 'utf8'));
    return validatePrivateHumanPrivacyPilotPreflight(metadata);
  } catch {
    return rejected('invalid_input_file');
  }
}

async function main() {
  const result = await runPrivateHumanPrivacyPilotPreflight(
    parseInputPath(process.argv.slice(2)),
  );
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.ready) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
