import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  CONTROLLED_CONNECTOR_RUN_CONTRACT,
  CONNECTOR_RECEIPT_CONTRACT,
  createEphemeralConnector,
  prepareControlledConnectorRun,
  validateControlledConnectorRun,
} from '../lib/controlled-connector.mjs';

const content = '# Example\n\nAgent-readable context.\n';
const contentSha256 = createHash('sha256').update(content).digest('hex');
const manifestSha256 = 'a'.repeat(64);

function fixture(overrides = {}) {
  const capsule = {
    contract: 'agentfriendly.publication-capsule.v1',
    capsuleId: 'capsule-123',
    status: 'approved_for_manual_handoff',
    target: { origin: 'https://example.com', hostname: 'example.com' },
    approvals: { requiredRoles: ['owner'], owner: 'approved', maintainer: 'not_required' },
    integrity: { manifestSha256 },
    files: [{
      packagePath: 'files/llms.txt', destinationPath: '/llms.txt', operation: 'create_or_replace',
      mediaType: 'text/plain; charset=utf-8', sha256: contentSha256, content,
    }],
  };
  const comparison = {
    contract: 'agentfriendly.origin-comparison.v1', comparisonId: 'comparison-123',
    capsuleId: capsule.capsuleId, manifestSha256, status: 'complete',
    resources: [{ destinationPath: '/llms.txt', status: 'changed' }],
  };
  const plan = {
    contract: 'agentfriendly.draft-pr-plan.v1', planId: 'plan-123', capsuleId: capsule.capsuleId,
    comparisonId: comparison.comparisonId, manifestSha256, status: 'prepared_not_submitted',
    remoteSubmission: false, mergeAllowed: false,
    files: [{ sourcePath: '/llms.txt', repositoryPath: 'public/llms.txt', mode: 'create_or_update', sha256: contentSha256, content }],
  };
  return { capsule, comparison, plan, canaryPath: '/llms.txt', preparedAt: '2026-08-31T15:00:00.000Z', ...overrides };
}

test('controlled run binds approved evidence to one allowlisted canary without remote mutation', async () => {
  const run = await prepareControlledConnectorRun(fixture());

  assert.equal(run.contract, CONTROLLED_CONNECTOR_RUN_CONTRACT);
  assert.equal(run.provider, 'ephemeral_memory');
  assert.equal(run.environment, 'local_sandbox');
  assert.equal(run.remoteMutation, false);
  assert.equal(run.maxWrites, 1);
  assert.equal(run.rollbackRequired, true);
  assert.equal(run.canary.destinationPath, '/llms.txt');
  assert.equal(run.canary.sha256, contentSha256);
  assert.match(run.runId, /^run-[a-f0-9]{24}$/);
  assert.deepEqual(validateControlledConnectorRun(run), run);
});

test('controlled run fails closed on approvals, stale evidence, unsafe paths or secrets', async () => {
  const cases = [
    [() => { const x = fixture(); x.capsule.status = 'owner_approval_pending'; return x; }, /approved/i],
    [() => { const x = fixture(); x.capsule.approvals.owner = 'pending'; return x; }, /approval/i],
    [() => { const x = fixture(); x.comparison.status = 'incomplete'; return x; }, /complete/i],
    [() => { const x = fixture(); x.plan.manifestSha256 = 'b'.repeat(64); return x; }, /manifest/i],
    [() => ({ ...fixture(), canaryPath: '/robots.txt' }), /allowlist|canary/i],
    [() => { const x = fixture(); x.capsule.files[0].content = 'api_key=super-secret-value'; return x; }, /secret|hash/i],
    [() => { const x = fixture(); x.plan.remoteSubmission = true; return x; }, /remote|submission/i],
    [() => { const x = fixture(); x.capsule.target.origin = 'https://localhost'; return x; }, /public|origin/i],
  ];

  for (const [build, pattern] of cases) {
    await assert.rejects(() => prepareControlledConnectorRun(build()), pattern);
  }
});

test('ephemeral connector dry-runs, applies one verified canary and rolls it back', async () => {
  const run = await prepareControlledConnectorRun(fixture());
  const connector = createEphemeralConnector({ '/llms.txt': '# Previous\n' });

  const dryRun = await connector.dryRun(run, { at: '2026-08-31T15:01:00.000Z' });
  assert.equal(dryRun.contract, CONNECTOR_RECEIPT_CONTRACT);
  assert.equal(dryRun.status, 'dry_run_ready');
  assert.equal(dryRun.remoteMutation, false);
  assert.equal(await connector.inspect('/llms.txt'), '# Previous\n');

  await assert.rejects(() => connector.applyCanary(run), /confirm/i);
  const applied = await connector.applyCanary(run, { confirmCanary: true, at: '2026-08-31T15:02:00.000Z' });
  assert.equal(applied.status, 'applied_to_ephemeral_sandbox');
  assert.equal(applied.verification, 'passed');
  assert.equal(applied.rollbackAvailable, true);
  assert.equal(await connector.inspect('/llms.txt'), content);
  assert.doesNotMatch(JSON.stringify(applied), /Agent-readable context|Previous/);

  const replay = await connector.applyCanary(run, { confirmCanary: true, at: '2026-08-31T15:03:00.000Z' });
  assert.equal(replay.replayed, true);
  assert.equal(replay.receiptId, applied.receiptId);

  const rolledBack = await connector.rollback(run.runId, { confirmRollback: true, at: '2026-08-31T15:04:00.000Z' });
  assert.equal(rolledBack.status, 'rolled_back');
  assert.equal(rolledBack.verification, 'passed');
  assert.equal(await connector.inspect('/llms.txt'), '# Previous\n');
});

test('ephemeral connector refuses rollback after out-of-band divergence', async () => {
  const run = await prepareControlledConnectorRun(fixture());
  const store = new Map();
  const connector = createEphemeralConnector(store);
  await connector.applyCanary(run, { confirmCanary: true });
  store.set('/llms.txt', '# Diverged\n');

  await assert.rejects(
    () => connector.rollback(run.runId, { confirmRollback: true }),
    /diverg|changed outside/i,
  );
});
