import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  BLOCK5D_CAPABILITY_REF,
  BLOCK5D_REPOSITORY,
  GITHUB_DRAFT_PR_CANARY_CONTRACT,
  GITHUB_DRAFT_PR_RECEIPT_CONTRACT,
  executeGitHubDraftPrCanary,
  prepareGitHubDraftPrCanary,
  validateGitHubDraftPrCanary,
} from '../lib/github-draft-pr-canary.mjs';

const content = '# Synthetic origin\n\nPublic agent-readable context.\n';
const contentSha256 = createHash('sha256').update(content).digest('hex');
const manifestSha256 = 'a'.repeat(64);

function fixture(overrides = {}) {
  const capsule = {
    contract: 'agentfriendly.publication-capsule.v1', capsuleId: 'capsule-synthetic-123',
    status: 'approved_for_manual_handoff', expiresAt: '2026-09-02T00:00:00.000Z',
    target: { origin: 'https://synthetic-origin.example', hostname: 'synthetic-origin.example' },
    approvals: { requiredRoles: ['owner'], owner: 'approved', maintainer: 'not_required' },
    integrity: { manifestSha256 },
    files: [{ packagePath: 'files/llms.txt', destinationPath: '/llms.txt', operation: 'create_or_replace', mediaType: 'text/plain; charset=utf-8', sha256: contentSha256, content }],
  };
  const comparison = {
    contract: 'agentfriendly.origin-comparison.v1', comparisonId: 'comparison-synthetic-123',
    capsuleId: capsule.capsuleId, manifestSha256, status: 'complete',
  };
  const plan = {
    contract: 'agentfriendly.draft-pr-plan.v1', planId: 'plan-synthetic-123', capsuleId: capsule.capsuleId,
    comparisonId: comparison.comparisonId, manifestSha256, repository: BLOCK5D_REPOSITORY,
    baseBranch: 'main', branch: 'agentfriendly/capsule-synthetic-v1', title: 'Agent Friendly Web synthetic canary',
    body: 'Prepared for a separately approved synthetic Draft PR.', status: 'prepared_not_submitted',
    remoteSubmission: false, mergeAllowed: false,
    files: [{ sourcePath: '/llms.txt', repositoryPath: 'llms.txt', mode: 'create_or_update', sha256: contentSha256, content }],
  };
  return {
    capsule, comparison, plan, canaryPath: '/llms.txt', capabilityRef: BLOCK5D_CAPABILITY_REF,
    idempotencyKey: 'block5d-synthetic-canary-0001', preparedAt: '2026-08-31T18:00:00.000Z',
    expiresAt: '2026-08-31T18:20:00.000Z', ...overrides,
  };
}

function approval(run, overrides = {}) {
  return {
    contract: 'agentfriendly.remote-mutation-approval.v1', approvalId: 'approval-block5d-0001',
    runId: run.runId, repository: BLOCK5D_REPOSITORY, operation: 'create_synthetic_draft_pr',
    status: 'approved', approvedBy: 'gabriel-mucchiut', approvedAt: '2026-08-31T18:01:00.000Z',
    expiresAt: '2026-08-31T18:10:00.000Z', maxFiles: 1, ...overrides,
  };
}

test('Block 5D prepares one honest remote-mutation canary for the exact synthetic repository', async () => {
  const run = await prepareGitHubDraftPrCanary(fixture());

  assert.equal(run.contract, GITHUB_DRAFT_PR_CANARY_CONTRACT);
  assert.equal(run.repository, BLOCK5D_REPOSITORY);
  assert.equal(run.provider, 'github');
  assert.equal(run.environment, 'synthetic_repository');
  assert.equal(run.remoteMutation, true);
  assert.equal(run.draft, true);
  assert.equal(run.mergeAllowed, false);
  assert.equal(run.maxFiles, 1);
  assert.equal(run.approvalRequired, true);
  assert.equal(run.request.files.length, 1);
  assert.equal(run.request.files[0].path, 'llms.txt');
  assert.equal(run.request.files[0].sha256, contentSha256);
  assert.match(run.runId, /^ghrun-[a-f0-9]{24}$/);
  assert.deepEqual(validateGitHubDraftPrCanary(run), run);
  assert.doesNotMatch(JSON.stringify(run), /authorization|bearer|cookie|github_pat|ghp_/i);
});

test('Block 5D preparation fails closed outside the one-file synthetic boundary', async () => {
  const cases = [
    [() => { const x = fixture(); x.plan.repository = 'owner/real-site'; return x; }, /repository|allowlist/i],
    [() => { const x = fixture(); x.plan.baseBranch = 'production'; return x; }, /base|main/i],
    [() => { const x = fixture(); x.plan.files[0].repositoryPath = 'public/llms.txt'; return x; }, /path|llms/i],
    [() => { const x = fixture(); x.plan.files.push({ ...x.plan.files[0], repositoryPath: 'llms-full.txt' }); return x; }, /one|file/i],
    [() => { const x = fixture(); x.plan.files[0].content = 'api_key=super-secret-value'; return x; }, /secret|hash/i],
    [() => { const x = fixture(); x.plan.body = 'access_token=super-secret-value'; return x; }, /secret|metadata/i],
    [() => ({ ...fixture(), capabilityRef: 'secretbroker://github/other' }), /capability/i],
    [() => ({ ...fixture(), expiresAt: '2026-08-31T17:59:00.000Z' }), /expir/i],
  ];
  for (const [build, pattern] of cases) await assert.rejects(() => prepareGitHubDraftPrCanary(build()), pattern);
});

test('Block 5D execution requires the enabled server gate and a matching short-lived approval', async () => {
  const run = await prepareGitHubDraftPrCanary(fixture());
  const client = { createDraftPullRequest: async () => ({}) };

  await assert.rejects(() => executeGitHubDraftPrCanary(run, { client, enabled: false }), /disabled/i);
  await assert.rejects(() => executeGitHubDraftPrCanary(run, { client, enabled: true }), /approval/i);
  await assert.rejects(() => executeGitHubDraftPrCanary(run, { client, enabled: true, approval: approval(run, { repository: 'owner/real-site' }) }), /repository|approval/i);
  await assert.rejects(() => executeGitHubDraftPrCanary(run, { client, enabled: true, approval: approval(run, { expiresAt: '2026-08-31T18:01:30.000Z' }), at: '2026-08-31T18:02:00.000Z' }), /expir/i);
});

test('Block 5D uses only the injected client and returns a metadata-only Draft PR receipt', async () => {
  const run = await prepareGitHubDraftPrCanary(fixture());
  const receipts = new Map();
  let calls = 0;
  let request;
  const client = {
    createDraftPullRequest: async (value) => {
      calls += 1;
      request = value;
      return { id: 42, url: `https://github.com/${BLOCK5D_REPOSITORY}/pull/42`, draft: true, merged: false };
    },
  };
  const controls = { client, enabled: true, approval: approval(run), receipts, at: '2026-08-31T18:02:00.000Z' };
  const receipt = await executeGitHubDraftPrCanary(run, controls);

  assert.equal(request.files.length, 1);
  assert.equal(request.draft, true);
  assert.equal(request.mergeAllowed, false);
  assert.equal(receipt.contract, GITHUB_DRAFT_PR_RECEIPT_CONTRACT);
  assert.equal(receipt.status, 'submitted_as_draft');
  assert.equal(receipt.remoteMutation, true);
  assert.equal(receipt.mergeAllowed, false);
  assert.equal(receipt.pullRequestId, 42);
  assert.equal(receipt.contentSha256, contentSha256);
  assert.doesNotMatch(JSON.stringify(receipt), /Public agent-readable context|authorization|bearer|access[_-]?token|github_pat|ghp_|secret|cookie/i);

  const replay = await executeGitHubDraftPrCanary(run, controls);
  assert.equal(replay.replayed, true);
  assert.equal(replay.receiptId, receipt.receiptId);
  assert.equal(calls, 1);
});

test('Block 5D rejects unverifiable, non-draft or cross-repository provider results', async () => {
  const run = await prepareGitHubDraftPrCanary(fixture());
  for (const result of [
    { id: 1, url: `https://github.com/${BLOCK5D_REPOSITORY}/pull/1`, draft: false, merged: false },
    { id: 2, url: 'https://github.com/owner/real-site/pull/2', draft: true, merged: false },
    { id: 3, url: `https://github.com/${BLOCK5D_REPOSITORY}/pull/3`, draft: true, merged: true },
  ]) {
    const client = { createDraftPullRequest: async () => result };
    await assert.rejects(
      () => executeGitHubDraftPrCanary(run, { client, enabled: true, approval: approval(run), at: '2026-08-31T18:02:00.000Z' }),
      /draft|repository|merged|verifiable/i,
    );
  }
});
