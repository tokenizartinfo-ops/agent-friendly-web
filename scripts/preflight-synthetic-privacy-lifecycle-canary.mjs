import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const SYNTHETIC_PRIVACY_LIFECYCLE_PREFLIGHT_CONTRACT =
  'agent-friendly-web.synthetic-privacy-lifecycle-canary-preflight.v1';

const CANARY_DATABASE_ID = '2b518988-eacb-4c31-b760-4e58c3c0285b';
const PRODUCTION_DATABASE_ID = 'd26fc9d2-df5a-4957-8e58-cc4c945faad8';
const REQUIRED_MIGRATION = '0008_contact_privacy_lifecycle.sql';
const REQUIRED_FLAGS = [
  'AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED',
  'AFW_REAL_CONTACT_ENABLED',
  'AFW_PRIVACY_REQUESTS_ENABLED',
  'AFW_RETENTION_JOBS_ENABLED',
  'AFW_PRODUCT_UPDATES_ENABLED',
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

function hasExpectedShape(metadata) {
  if (!hasExactKeys(metadata, [
    'contract',
    'project',
    'repository',
    'environment',
    'origin',
    'route',
    'resources',
    'migrations',
    'expected_flags',
    'mutation_policy',
    'rollback',
  ])) return false;

  if (!hasExactKeys(metadata.route, ['path', 'visibility', 'access_required'])) return false;
  if (!hasExactKeys(metadata.resources, [
    'canary_worker',
    'canary_database',
    'production_worker',
    'production_database',
  ])) return false;
  if (!hasExactKeys(metadata.resources.canary_worker, ['name'])) return false;
  if (!hasExactKeys(metadata.resources.canary_database, ['name', 'id'])) return false;
  if (!hasExactKeys(metadata.resources.production_worker, ['name'])) return false;
  if (!hasExactKeys(metadata.resources.production_database, ['name', 'id'])) return false;
  if (
    !Array.isArray(metadata.migrations)
    || metadata.migrations.some((migration) => migration !== REQUIRED_MIGRATION)
    || new Set(metadata.migrations).size !== metadata.migrations.length
  ) return false;
  if (!hasExactKeys(metadata.expected_flags, ['base', 'canary', 'production'])) return false;
  if (!['base', 'canary', 'production'].every(
    (environment) => hasExactKeys(metadata.expected_flags[environment], REQUIRED_FLAGS),
  )) return false;
  if (!hasExactKeys(metadata.mutation_policy, [
    'local_preflight_only',
    'canary_remote_mutation',
    'production_mutation',
    'cross_project_mutation',
  ])) return false;
  return hasExactKeys(metadata.rollback, [
    'worker_action',
    'database_action',
    'production_change_required',
  ]);
}

function decision(ready, code) {
  return { ready, code };
}

function allFlagsAreOff(expectedFlags) {
  return ['base', 'canary', 'production'].every(
    (environment) => REQUIRED_FLAGS.every(
      (flag) => expectedFlags[environment][flag] === 'false',
    ),
  );
}

export function validateSyntheticPrivacyLifecyclePreflight(metadata = {}) {
  if (!hasExpectedShape(metadata)) return decision(false, 'unexpected_metadata');
  if (metadata.contract !== SYNTHETIC_PRIVACY_LIFECYCLE_PREFLIGHT_CONTRACT) {
    return decision(false, 'invalid_contract');
  }
  if (metadata.project !== 'agent-friendly-web') return decision(false, 'invalid_project');
  if (metadata.repository !== 'tokenizartinfo-ops/agent-friendly-web') {
    return decision(false, 'invalid_repository');
  }
  if (metadata.environment !== 'afw_canary') return decision(false, 'invalid_environment');
  if (metadata.origin !== 'https://canary.agentfriendlyweb.dev') {
    return decision(false, 'invalid_origin');
  }
  if (metadata.route.path !== '/api/canary/synthetic-privacy-lifecycle') {
    return decision(false, 'invalid_route');
  }
  if (metadata.route.visibility !== 'private') return decision(false, 'route_not_private');
  if (metadata.route.access_required !== true) return decision(false, 'access_required');

  const resources = metadata.resources;
  if (resources.canary_worker.name !== 'agent-friendly-web-web-canary') {
    return decision(false, 'invalid_canary_worker');
  }
  if (
    resources.canary_database.name !== 'agent-friendly-web-web-canary'
    || resources.canary_database.id !== CANARY_DATABASE_ID
  ) return decision(false, 'invalid_canary_database');
  if (resources.production_worker.name !== 'agent-friendly-web-web-production') {
    return decision(false, 'invalid_production_worker');
  }
  if (resources.canary_database.id === resources.production_database.id) {
    return decision(false, 'database_ids_not_distinct');
  }
  if (
    resources.production_database.name !== 'agent-friendly-web-web-production'
    || resources.production_database.id !== PRODUCTION_DATABASE_ID
  ) return decision(false, 'invalid_production_database');

  if (!Array.isArray(metadata.migrations) || !metadata.migrations.includes(REQUIRED_MIGRATION)) {
    return decision(false, 'migration_not_declared');
  }
  if (!allFlagsAreOff(metadata.expected_flags)) {
    return decision(false, 'unsafe_expected_flags');
  }

  const mutationPolicy = metadata.mutation_policy;
  if (mutationPolicy.local_preflight_only !== true) {
    return decision(false, 'remote_mutation_forbidden');
  }
  if (mutationPolicy.canary_remote_mutation !== false) {
    return decision(false, 'remote_mutation_forbidden');
  }
  if (mutationPolicy.production_mutation !== false) {
    return decision(false, 'production_mutation_forbidden');
  }
  if (mutationPolicy.cross_project_mutation !== false) {
    return decision(false, 'cross_project_mutation_forbidden');
  }

  const rollback = metadata.rollback;
  if (
    rollback.worker_action !== 'restore_previous_canary_worker_version_with_every_switch_off'
    || rollback.database_action
      !== 'use_recorded_pre_migration_d1_time_travel_bookmark_only_on_failure'
    || rollback.production_change_required !== false
  ) return decision(false, 'rollback_not_declared');

  return decision(true, 'ready');
}

function parseInputPath(args) {
  if (args.length !== 2 || args[0] !== '--input' || !args[1]) return '';
  return args[1];
}

export async function runSyntheticPrivacyLifecyclePreflight(inputPath) {
  if (!inputPath) return decision(false, 'invalid_arguments');
  try {
    const metadata = JSON.parse(await readFile(inputPath, 'utf8'));
    return validateSyntheticPrivacyLifecyclePreflight(metadata);
  } catch {
    return decision(false, 'invalid_input_file');
  }
}

async function main() {
  const result = await runSyntheticPrivacyLifecyclePreflight(
    parseInputPath(process.argv.slice(2)),
  );
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.ready) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
