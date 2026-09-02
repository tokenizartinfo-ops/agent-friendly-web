import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { EMAIL_INBOUND_CANARY_CONTRACT } from '../lib/email-inbound-canary.mjs';

const root = new URL('../', import.meta.url);
const scriptPath = new URL('../scripts/preflight-email-inbound-canary.mjs', import.meta.url);
const rootPath = fileURLToPath(root);
const scriptFile = fileURLToPath(scriptPath);
const baseline = {
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_inbound_canary',
  origin: 'agentfriendlyweb.dev',
  zoneId: '4b1a3fe4b6dcb81e9d6a633174c5939f',
  zoneStatus: 'active',
  routingStatus: 'unconfigured',
  routingEnabled: false,
  destinationPresent: false,
  destinationVerified: false,
  existingMailDns: [],
  existingRules: [],
};

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('package registers a bounded local-only inbound email preflight', async () => {
  const pkg = JSON.parse(await read('package.json'));

  assert.equal(
    pkg.scripts['email:inbound:preflight'],
    'node scripts/preflight-email-inbound-canary.mjs --input',
  );
  assert.equal(pkg.scripts['email:inbound:apply'], undefined);
  assert.equal(pkg.scripts['email:send'], undefined);
});

test('public inbound contract declares the local readiness state truthfully', async () => {
  const contract = JSON.parse(await read('public/.well-known/email-inbound-canary-contract.json'));

  assert.equal(contract.contract, EMAIL_INBOUND_CANARY_CONTRACT);
  assert.equal(contract.status, 'local_preflight_ready_remote_unconfigured');
  assert.deepEqual(contract.active_aliases, [
    'hello@agentfriendlyweb.dev',
    'hola@agentfriendlyweb.dev',
    'ola@agentfriendlyweb.dev',
  ]);
  assert.deepEqual(contract.reserved_aliases, [
    'auditoria@agentfriendlyweb.dev',
    'seguridad@agentfriendlyweb.dev',
    'bajas@agentfriendlyweb.dev',
  ]);
  assert.deepEqual(contract.blocked_inbound_aliases, ['no-reply@agentfriendlyweb.dev']);
  assert.equal(contract.capabilities.local_preflight, true);
  assert.equal(contract.capabilities.inbound_routing, false);
  assert.equal(contract.capabilities.outbound_sending, false);
  assert.equal(contract.capabilities.automatic_replies, false);
  assert.equal(contract.capabilities.message_body_processing, false);
  assert.equal(contract.capabilities.attachment_processing, false);
  assert.equal(contract.private_destination_published, false);
});

test('CLI emits one sanitized JSON plan and performs no network operation', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'afw-email-preflight-'));
  const input = join(folder, 'input.json');
  try {
    await writeFile(input, JSON.stringify(baseline), 'utf8');
    const output = execFileSync(process.execPath, [scriptFile, '--input', input], {
      cwd: rootPath,
      encoding: 'utf8',
    });
    const result = JSON.parse(output);
    assert.equal(result.ok, true);
    assert.equal(result.plan.state, 'destination_verification_required');
    assert.ok(result.plan.steps.every((step) => step.networkMutation === false));
    assert.doesNotMatch(output, /gmail\.com|privateDestination|fetch\(/i);
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test('CLI exits closed with sanitized JSON for an invalid boundary', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'afw-email-preflight-invalid-'));
  const input = join(folder, 'input.json');
  try {
    await writeFile(input, JSON.stringify({ ...baseline, origin: 'tokenizart.com' }), 'utf8');
    const result = spawnSync(process.execPath, [scriptFile, '--input', input], {
      cwd: rootPath,
      encoding: 'utf8',
    });
    assert.equal(result.status, 1);
    assert.deepEqual(JSON.parse(result.stdout), { ok: false, code: 'invalid_origin' });
    assert.equal(result.stderr, '');
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test('sanitized baseline and runbook preserve the exact remote boundary and rollback order', async () => {
  const baselineEvidence = JSON.parse(
    await read('docs/evidence/email-inbound-canary-baseline-2026-09-02.json'),
  );
  const runbook = await read('docs/BLOCK-6C1-EMAIL-INBOUND-CANARY-RUNBOOK-2026-09-02.md');
  const design = await read('docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md');

  assert.equal(baselineEvidence.project, 'agent-friendly-web');
  assert.equal(baselineEvidence.repository, 'tokenizartinfo-ops/agent-friendly-web');
  assert.equal(baselineEvidence.environment, 'afw_email_inbound_canary');
  assert.equal(baselineEvidence.origin, 'agentfriendlyweb.dev');
  assert.equal(baselineEvidence.zoneStatus, 'active');
  assert.equal(baselineEvidence.routingStatus, 'unconfigured');
  assert.equal(baselineEvidence.routingEnabled, false);
  assert.equal(baselineEvidence.destinationPresent, false);
  assert.equal(baselineEvidence.destinationVerified, false);
  assert.equal(baselineEvidence.existingMailDns.length, 0);
  assert.equal(baselineEvidence.existingRules.filter((rule) => rule.enabled).length, 0);
  assert.doesNotMatch(JSON.stringify(baselineEvidence), /gmail\.com/i);

  for (const field of [
    'PROJECT',
    'REPOSITORY',
    'ENVIRONMENT',
    'ORIGIN',
    'RESOURCE_TYPE',
    'RESOURCE_ID',
    'ALLOWED_ACTION',
    'ROLLBACK',
  ]) assert.match(runbook, new RegExp(field));

  assert.match(runbook, /verificar.*destino/i);
  assert.match(runbook, /tres reglas.*forward/i);
  assert.match(runbook, /una regla.*drop/i);
  assert.match(runbook, /prueba sintetica/i);
  assert.match(runbook, /orden de rollback/i);
  assert.match(design, /local_preflight_ready_remote_unconfigured/);
});
