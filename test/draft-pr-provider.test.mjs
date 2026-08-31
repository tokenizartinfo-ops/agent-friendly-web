import assert from 'node:assert/strict';
import test from 'node:test';

import { DryRunDraftPrProvider, GitHubDraftPrProvider } from '../lib/draft-pr-provider.mjs';

const plan = {
  contract: 'agentfriendly.draft-pr-plan.v1',
  planId: 'plan-123',
  capsuleId: 'capsule-123',
  comparisonId: 'comparison-123',
  manifestSha256: 'a'.repeat(64),
  repository: 'owner/site',
  baseBranch: 'main',
  branch: 'agentfriendly/capsule-capsule-123-v1',
  title: 'Agent Friendly Web: capsule v1',
  body: 'Prepared, not submitted.',
  status: 'prepared_not_submitted',
  remoteSubmission: false,
  mergeAllowed: false,
  files: [{ repositoryPath: 'public/llms.txt', mode: 'create_or_update', sha256: 'b'.repeat(64), content: '# Site\n' }],
  localContractTests: [{ type: 'http_get', path: '/llms.txt' }],
  externalVerifierTests: [],
  rollback: [{ repositoryPath: 'public/llms.txt', mode: 'revert_draft_branch_commit_or_close_unmerged_pr' }],
  generatedAt: '2026-08-30T22:30:00.000Z',
};

test('dry-run provider returns a sanitized request without network or mutation', async () => {
  let calls = 0;
  const provider = new DryRunDraftPrProvider({ client: async () => { calls += 1; } });
  const result = await provider.prepare(plan);
  assert.equal(result.status, 'prepared_not_submitted');
  assert.equal(result.remoteSubmission, false);
  assert.equal(result.mergeAllowed, false);
  assert.equal(calls, 0);
  assert.doesNotMatch(JSON.stringify(result), /authorization|token|cookie/i);
});

test('GitHub provider fails closed by default and only uses an injected client when explicitly enabled', async () => {
  const disabled = new GitHubDraftPrProvider({ enabled: false, client: { createDraftPullRequest: async () => ({}) } });
  await assert.rejects(() => disabled.submit(plan), /disabled/i);

  let request;
  const enabled = new GitHubDraftPrProvider({
    enabled: true,
    client: { createDraftPullRequest: async (value) => { request = value; return { id: 42, url: 'https://github.com/owner/site/pull/42', draft: true }; } },
  });
  const result = await enabled.submit(plan);
  assert.equal(request.draft, true);
  assert.equal(request.mergeAllowed, false);
  assert.equal(result.status, 'submitted_as_draft');
  assert.equal(result.draft, true);
  assert.doesNotMatch(JSON.stringify(result), /token|secret|authorization/i);
});

test('GitHub provider rejects non-draft or overbroad client results', async () => {
  const provider = new GitHubDraftPrProvider({
    enabled: true,
    client: { createDraftPullRequest: async () => ({ id: 1, url: 'https://github.com/owner/site/pull/1', draft: false }) },
  });
  await assert.rejects(() => provider.submit(plan), /draft/i);
});
