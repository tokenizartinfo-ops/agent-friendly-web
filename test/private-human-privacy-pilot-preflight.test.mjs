import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  PRIVATE_HUMAN_PRIVACY_PILOT_PREFLIGHT_CONTRACT,
  validatePrivateHumanPrivacyPilotPreflight,
} from '../scripts/preflight-private-human-privacy-pilot-canary.mjs';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);
const scriptFile = fileURLToPath(
  new URL('../scripts/preflight-private-human-privacy-pilot-canary.mjs', import.meta.url),
);

const disabledFlags = {
  AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED: 'false',
  AFW_REAL_CONTACT_ENABLED: 'false',
  AFW_PRIVACY_REQUESTS_ENABLED: 'false',
  AFW_RETENTION_JOBS_ENABLED: 'false',
  AFW_PRODUCT_UPDATES_ENABLED: 'false',
};

function validMetadata() {
  return {
    contract: PRIVATE_HUMAN_PRIVACY_PILOT_PREFLIGHT_CONTRACT,
    project: 'agent-friendly-web',
    repository: 'tokenizartinfo-ops/agent-friendly-web',
    environment: 'afw_canary',
    origin: 'https://canary.agentfriendlyweb.dev',
    route: {
      path: '/api/canary/private-human-privacy-pilot',
      visibility: 'private',
      access_required: true,
    },
    resources: {
      canary_worker: { name: 'agent-friendly-web-web-canary' },
      canary_database: {
        name: 'agent-friendly-web-web-canary',
        id: '2b518988-eacb-4c31-b760-4e58c3c0285b',
      },
      production_worker: { name: 'agent-friendly-web-web-production' },
      production_database: {
        name: 'agent-friendly-web-web-production',
        id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
      },
    },
    access: {
      verified: true,
      audience_configured: true,
      allowed_subject_hashes: ['a'.repeat(64)],
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
      database_action: 'use_recorded_d1_time_travel_bookmark_and_reapply_erasure_tombstone',
      time_travel_bookmark_recorded: true,
      production_change_required: false,
    },
  };
}

function expectedReady() {
  return {
    ready: true,
    code: 'private_human_privacy_pilot_ready',
    environment: 'afw_canary',
    realContactPublic: false,
    productUpdates: false,
  };
}

function cli(args) {
  return spawnSync(process.execPath, [scriptFile, ...args], {
    cwd: rootPath,
    encoding: 'utf8',
  });
}

test('preflight accepts only the exact disabled private human pilot boundary', () => {
  assert.deepEqual(validatePrivateHumanPrivacyPilotPreflight(validMetadata()), expectedReady());
});

test('preflight rejects non-canary resources, absent Access and unsafe flags', () => {
  const cases = [
    ['invalid_environment', (value) => { value.environment = 'production'; }],
    ['invalid_origin', (value) => { value.origin = 'https://agentfriendlyweb.dev'; }],
    ['invalid_canary_worker', (value) => { value.resources.canary_worker.name = 'agent-friendly-web-web-production'; }],
    ['invalid_canary_database', (value) => { value.resources.canary_database.id = value.resources.production_database.id; }],
    ['access_required', (value) => { value.access.verified = false; }],
    ['invalid_access_allowlist', (value) => { value.access.allowed_subject_hashes.push('b'.repeat(64)); }],
    ['unsafe_public_flags', (value) => { value.expected_flags.canary.AFW_REAL_CONTACT_ENABLED = 'true'; }],
    ['unsafe_public_flags', (value) => { value.expected_flags.base.AFW_PRODUCT_UPDATES_ENABLED = 'true'; }],
    ['pilot_not_disabled', (value) => { value.expected_flags.canary.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED = 'true'; }],
    ['migration_not_declared', (value) => { value.migrations = []; }],
    ['rollback_not_declared', (value) => { value.rollback.time_travel_bookmark_recorded = false; }],
  ];

  for (const [code, mutate] of cases) {
    const metadata = validMetadata();
    mutate(metadata);
    const result = validatePrivateHumanPrivacyPilotPreflight(metadata);
    assert.equal(result.ready, false);
    assert.equal(result.code, code);
    assert.doesNotMatch(JSON.stringify(result), /@|bearer|tokenizart-cloudflare-ai/i);
  }
});

test('preflight rejects unknown metadata and PII-like keys or values without reflection', () => {
  const unknown = validMetadata();
  unknown.note = 'ordinary';
  assert.deepEqual(validatePrivateHumanPrivacyPilotPreflight(unknown), {
    ready: false,
    code: 'unexpected_metadata',
  });

  for (const mutate of [
    (value) => { value.email = 'owner@example.com'; },
    (value) => { value.rollback.worker_action = 'Bearer private-credential'; },
  ]) {
    const metadata = validMetadata();
    mutate(metadata);
    const result = validatePrivateHumanPrivacyPilotPreflight(metadata);
    assert.deepEqual(result, { ready: false, code: 'pii_metadata_forbidden' });
    assert.doesNotMatch(JSON.stringify(result), /@|bearer|credential|owner/i);
  }
});

test('wrangler keeps the pilot disabled everywhere and binds its limiter only to canary', async () => {
  const raw = await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
  const config = JSON.parse(raw.replace(/^\s*\/\/.*$/gm, ''));

  assert.equal(config.vars.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED, 'false');
  assert.equal(config.env.canary.vars.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED, 'false');
  assert.equal(config.env.production.vars.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED, 'false');
  assert.equal(config.ratelimits, undefined);
  assert.equal(config.env.production.ratelimits, undefined);
  assert.deepEqual(
    config.env.canary.ratelimits.find((item) => item.name === 'AFW_PRIVATE_HUMAN_PRIVACY_RATE_LIMITER'),
    {
      name: 'AFW_PRIVATE_HUMAN_PRIVACY_RATE_LIMITER',
      namespace_id: '1895760675',
      simple: { limit: 5, period: 60 },
    },
  );
});

test('package exposes a preflight command but no apply command', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(
    pkg.scripts['privacy:human-pilot:preflight'],
    'node scripts/preflight-private-human-privacy-pilot-canary.mjs',
  );
  assert.equal(pkg.scripts['privacy:human-pilot:apply'], undefined);
});

test('CLI reads sanitized metadata and emits only the fixed decision', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'afw-private-human-pilot-'));
  const input = join(folder, 'metadata.json');
  try {
    await writeFile(input, JSON.stringify(validMetadata()), 'utf8');
    const accepted = cli(['--input', input]);
    assert.equal(accepted.status, 0);
    assert.deepEqual(JSON.parse(accepted.stdout), expectedReady());
    assert.equal(accepted.stderr, '');

    const missing = cli([]);
    assert.equal(missing.status, 1);
    assert.deepEqual(JSON.parse(missing.stdout), {
      ready: false,
      code: 'invalid_arguments',
    });
    assert.equal(missing.stderr, '');
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});
