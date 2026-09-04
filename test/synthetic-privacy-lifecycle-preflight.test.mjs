import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  SYNTHETIC_PRIVACY_LIFECYCLE_PREFLIGHT_CONTRACT,
  validateSyntheticPrivacyLifecyclePreflight,
} from '../scripts/preflight-synthetic-privacy-lifecycle-canary.mjs';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);
const scriptFile = fileURLToPath(
  new URL('../scripts/preflight-synthetic-privacy-lifecycle-canary.mjs', import.meta.url),
);

const disabledFlags = {
  AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED: 'false',
  AFW_REAL_CONTACT_ENABLED: 'false',
  AFW_PRIVACY_REQUESTS_ENABLED: 'false',
  AFW_RETENTION_JOBS_ENABLED: 'false',
  AFW_PRODUCT_UPDATES_ENABLED: 'false',
};

function validMetadata() {
  return {
    contract: SYNTHETIC_PRIVACY_LIFECYCLE_PREFLIGHT_CONTRACT,
    project: 'agent-friendly-web',
    repository: 'tokenizartinfo-ops/agent-friendly-web',
    environment: 'afw_canary',
    origin: 'https://canary.agentfriendlyweb.dev',
    route: {
      path: '/api/canary/synthetic-privacy-lifecycle',
      visibility: 'private',
      access_required: true,
    },
    resources: {
      canary_worker: {
        name: 'agent-friendly-web-web-canary',
      },
      canary_database: {
        name: 'agent-friendly-web-web-canary',
        id: '2b518988-eacb-4c31-b760-4e58c3c0285b',
      },
      production_worker: {
        name: 'agent-friendly-web-web-production',
      },
      production_database: {
        name: 'agent-friendly-web-web-production',
        id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
      },
    },
    migrations: ['0008_contact_privacy_lifecycle.sql'],
    expected_flags: {
      base: { ...disabledFlags },
      canary: { ...disabledFlags },
      production: { ...disabledFlags },
    },
    mutation_policy: {
      local_preflight_only: true,
      canary_remote_mutation: false,
      production_mutation: false,
      cross_project_mutation: false,
    },
    rollback: {
      worker_action: 'restore_previous_canary_worker_version_with_every_switch_off',
      database_action: 'use_recorded_pre_migration_d1_time_travel_bookmark_only_on_failure',
      production_change_required: false,
    },
  };
}

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

function cli(args) {
  return spawnSync(process.execPath, [scriptFile, ...args], {
    cwd: rootPath,
    encoding: 'utf8',
  });
}

test('preflight accepts only the exact private AFW synthetic lifecycle boundary', () => {
  assert.deepEqual(validateSyntheticPrivacyLifecyclePreflight(validMetadata()), {
    ready: true,
    code: 'ready',
  });
});

test('preflight returns stable sanitized codes for every unsafe boundary', () => {
  const cases = [
    ['invalid_contract', (value) => { value.contract = 'wrong'; }],
    ['invalid_project', (value) => { value.project = 'tokenizart'; }],
    ['invalid_repository', (value) => { value.repository = 'tokenizartinfo-ops/tokenizart-cloudflare-ai'; }],
    ['invalid_environment', (value) => { value.environment = 'production'; }],
    ['invalid_origin', (value) => { value.origin = 'https://companion-staging.tokenizart.info'; }],
    ['invalid_route', (value) => { value.route.path = '/api/public/privacy'; }],
    ['route_not_private', (value) => { value.route.visibility = 'public'; }],
    ['access_required', (value) => { value.route.access_required = false; }],
    ['invalid_canary_worker', (value) => { value.resources.canary_worker.name = 'tokenizart-worker'; }],
    ['invalid_canary_database', (value) => { value.resources.canary_database.id = '00000000-0000-4000-8000-000000000000'; }],
    ['invalid_production_worker', (value) => { value.resources.production_worker.name = 'agent-friendly-web-web-canary'; }],
    ['invalid_production_database', (value) => { value.resources.production_database.id = '00000000-0000-4000-8000-000000000000'; }],
    ['database_ids_not_distinct', (value) => { value.resources.production_database.id = value.resources.canary_database.id; }],
    ['migration_not_declared', (value) => { value.migrations = []; }],
    ['unsafe_expected_flags', (value) => { value.expected_flags.canary.AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED = 'true'; }],
    ['unsafe_expected_flags', (value) => { value.expected_flags.production.AFW_REAL_CONTACT_ENABLED = 'true'; }],
    ['remote_mutation_forbidden', (value) => { value.mutation_policy.canary_remote_mutation = true; }],
    ['production_mutation_forbidden', (value) => { value.mutation_policy.production_mutation = true; }],
    ['cross_project_mutation_forbidden', (value) => { value.mutation_policy.cross_project_mutation = true; }],
    ['rollback_not_declared', (value) => { value.rollback.worker_action = ''; }],
  ];

  for (const [code, mutate] of cases) {
    const metadata = validMetadata();
    mutate(metadata);
    assert.deepEqual(validateSyntheticPrivacyLifecyclePreflight(metadata), {
      ready: false,
      code,
    });
  }
});

test('preflight rejects unexpected metadata without reflecting sensitive input', () => {
  const metadata = validMetadata();
  metadata.credential = 'sensitive-marker-that-must-not-be-echoed';

  const result = validateSyntheticPrivacyLifecyclePreflight(metadata);
  assert.deepEqual(result, { ready: false, code: 'unexpected_metadata' });
  assert.doesNotMatch(JSON.stringify(result), /sensitive-marker|credential/i);
});

test('preflight rejects undeclared migration metadata without reflecting it', () => {
  const metadata = validMetadata();
  metadata.migrations.push('sensitive-marker-that-must-not-be-echoed');

  const result = validateSyntheticPrivacyLifecyclePreflight(metadata);
  assert.deepEqual(result, { ready: false, code: 'unexpected_metadata' });
  assert.doesNotMatch(JSON.stringify(result), /sensitive-marker/i);
});

test('package exposes the bounded preflight CLI and no apply command', async () => {
  const pkg = JSON.parse(await read('package.json'));

  assert.equal(
    pkg.scripts['privacy:lifecycle:preflight'],
    'node scripts/preflight-synthetic-privacy-lifecycle-canary.mjs',
  );
  assert.equal(pkg.scripts['privacy:lifecycle:apply'], undefined);
});

test('checked-in metadata is sanitized and ready for local preflight', async () => {
  const raw = await read('docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json');
  const metadata = JSON.parse(raw);

  assert.deepEqual(validateSyntheticPrivacyLifecyclePreflight(metadata), {
    ready: true,
    code: 'ready',
  });
  assert.equal(metadata.resources.canary_database.id, '2b518988-eacb-4c31-b760-4e58c3c0285b');
  assert.equal(metadata.resources.production_database.id, 'd26fc9d2-df5a-4957-8e58-cc4c945faad8');
  assert.notEqual(metadata.resources.canary_database.id, metadata.resources.production_database.id);
  assert.deepEqual(metadata.expected_flags, validMetadata().expected_flags);
  assert.doesNotMatch(raw, /@|"(?:access_?jwt|credential|email|hmac|pii|secret|subject|token)"\s*:/i);
});

test('CLI emits one sanitized ready decision for the checked-in metadata', () => {
  const result = cli([
    '--input',
    'docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json',
  ]);

  assert.equal(result.status, 0);
  assert.deepEqual(JSON.parse(result.stdout), { ready: true, code: 'ready' });
  assert.equal(result.stderr, '');
});

test('CLI rejects top-level and nested duplicate metadata keys before normalization', async (t) => {
  const folder = await mkdtemp(join(tmpdir(), 'afw-privacy-lifecycle-duplicates-'));
  const fixtures = [
    {
      file: 'top-level.json',
      raw: JSON.stringify(validMetadata()).replace(
        '"project":"agent-friendly-web"',
        '"project":"tokenizart","project":"agent-friendly-web"',
      ),
      unsafe: /tokenizart/i,
    },
    {
      file: 'nested.json',
      raw: JSON.stringify(validMetadata()).replace(
        '"visibility":"private"',
        '"visibility":"public","\\u0076isibility":"private"',
      ),
      unsafe: /public/i,
    },
  ];

  try {
    for (const fixture of fixtures) {
      await t.test(fixture.file, async () => {
        const input = join(folder, fixture.file);
        await writeFile(input, fixture.raw, 'utf8');
        const result = cli(['--input', input]);

        assert.equal(result.status, 1);
        assert.deepEqual(JSON.parse(result.stdout), {
          ready: false,
          code: 'duplicate_metadata_key',
        });
        assert.doesNotMatch(result.stdout, fixture.unsafe);
        assert.equal(result.stdout.includes(input), false);
        assert.equal(result.stderr, '');
      });
    }
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test('CLI fails closed with stable JSON for arguments, files and unsafe metadata', async () => {
  const missingArguments = cli([]);
  assert.equal(missingArguments.status, 1);
  assert.deepEqual(JSON.parse(missingArguments.stdout), {
    ready: false,
    code: 'invalid_arguments',
  });
  assert.equal(missingArguments.stderr, '');

  const missingFile = cli(['--input', 'does-not-exist.json']);
  assert.equal(missingFile.status, 1);
  assert.deepEqual(JSON.parse(missingFile.stdout), {
    ready: false,
    code: 'invalid_input_file',
  });
  assert.equal(missingFile.stderr, '');

  const folder = await mkdtemp(join(tmpdir(), 'afw-privacy-lifecycle-preflight-'));
  const input = join(folder, 'input.json');
  try {
    const metadata = validMetadata();
    metadata.origin = 'https://private.example.invalid/sensitive-marker';
    await writeFile(input, JSON.stringify(metadata), 'utf8');
    const unsafe = cli(['--input', input]);
    assert.equal(unsafe.status, 1);
    assert.deepEqual(JSON.parse(unsafe.stdout), {
      ready: false,
      code: 'invalid_origin',
    });
    assert.doesNotMatch(unsafe.stdout, /example\.invalid|sensitive-marker/i);
    assert.equal(unsafe.stderr, '');
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});
