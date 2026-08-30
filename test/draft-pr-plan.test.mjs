import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import { buildDraftPrPlan, DRAFT_PR_PLAN_CONTRACT, validateDraftPrPlan } from '../lib/draft-pr-plan.mjs';

const directContent = '# Example\n';
const manualContent = 'User-agent: GPTBot\nAllow: /\n';
const capsule = {
  contract: 'agentfriendly.publication-capsule.v1',
  capsuleId: 'capsule-12345678',
  version: 3,
  target: { origin: 'https://example.com', hostname: 'example.com' },
  integrity: { manifestSha256: 'a'.repeat(64) },
  files: [
    { packagePath: 'files/llms.txt', destinationPath: '/llms.txt', operation: 'create_or_replace', sha256: createHash('sha256').update(directContent).digest('hex'), content: directContent },
    { packagePath: 'proposals/robots.agent-friendly-snippet.txt', destinationPath: '/robots.txt', operation: 'manual_merge', sha256: createHash('sha256').update(manualContent).digest('hex'), content: manualContent },
  ],
};
const comparison = {
  contract: 'agentfriendly.origin-comparison.v1',
  comparisonId: 'comparison-123',
  capsuleId: capsule.capsuleId,
  manifestSha256: capsule.integrity.manifestSha256,
  status: 'complete',
  resources: [
    { destinationPath: '/llms.txt', status: 'changed' },
    { destinationPath: '/robots.txt', status: 'manual_review_required' },
  ],
};

test('draft PR plan is deterministic, allowlisted and explicitly not submitted', () => {
  const plan = buildDraftPrPlan({
    planId: 'plan-123',
    capsule,
    comparison,
    repository: 'owner/site',
    baseBranch: 'main',
    pathMappings: { '/llms.txt': 'public/llms.txt' },
    reviewer: 'Website maintainer',
    generatedAt: '2026-08-30T22:30:00.000Z',
    externalVerifierTests: [{ provider: 'Cloudflare isitagentready.com', url: 'https://isitagentready.com/' }],
  });

  assert.equal(plan.contract, DRAFT_PR_PLAN_CONTRACT);
  assert.equal(plan.status, 'prepared_not_submitted');
  assert.equal(plan.remoteSubmission, false);
  assert.equal(plan.mergeAllowed, false);
  assert.equal(plan.branch, 'agentfriendly/capsule-capsule-1234-v3');
  assert.equal(plan.files[0].repositoryPath, 'public/llms.txt');
  assert.equal(plan.files[1].repositoryPath, '.agentfriendly/proposals/robots.agent-friendly-snippet.txt');
  assert.equal(plan.files[1].mode, 'proposal_only');
  assert.match(plan.body, /No enviado|not submitted/i);
  assert.ok(plan.localContractTests.length > 0);
  assert.equal(plan.externalVerifierTests.length, 1);
  assert.ok(plan.rollback.every((item) => item.mode === 'revert_draft_branch_commit_or_close_unmerged_pr'));
  assert.deepEqual(validateDraftPrPlan(plan), plan);
});

test('draft PR plan rejects incomplete comparisons, stale manifests and unsafe paths', () => {
  assert.throws(() => buildDraftPrPlan({ capsule, comparison: { ...comparison, status: 'incomplete' }, repository: 'owner/site', baseBranch: 'main', pathMappings: { '/llms.txt': 'public/llms.txt' } }), /complete/i);
  assert.throws(() => buildDraftPrPlan({ capsule, comparison: { ...comparison, manifestSha256: 'b'.repeat(64) }, repository: 'owner/site', baseBranch: 'main', pathMappings: { '/llms.txt': 'public/llms.txt' } }), /manifest/i);
  for (const unsafe of ['../llms.txt', '/etc/passwd', '.github/workflows/deploy.yml', 'public\\llms.txt']) {
    assert.throws(() => buildDraftPrPlan({ capsule, comparison, repository: 'owner/site', baseBranch: 'main', pathMappings: { '/llms.txt': unsafe } }), /path|allowlist/i);
  }
  assert.throws(() => buildDraftPrPlan({ capsule, comparison, repository: 'owner/site', baseBranch: 'main', pathMappings: { '/llms.txt': 'public/llms.txt' }, reviewer: 'api_key=super-secret-value' }), /credential|secret/i);
});

