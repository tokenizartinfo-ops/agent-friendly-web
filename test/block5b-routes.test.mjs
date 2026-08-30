import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('comparison route is private, manifest-bound, idempotent and uses the bounded public fetcher indirectly', async () => {
  const source = await readFile('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/comparison/route.ts', 'utf8');
  assert.match(source, /getChatGPTUser/);
  assert.match(source, /deriveCapsuleRole/);
  assert.match(source, /compareCapsuleOrigin/);
  assert.match(source, /agentfriendly\.origin-comparison-request\.v1/);
  assert.match(source, /confirmRead !== true/);
  assert.match(source, /body\.manifestSha256[^\n]*capsuleRow\.manifestSha256/);
  assert.match(source, /capsuleOriginComparisons\.idempotencyKey/);
  assert.match(source, /capsule_origin_comparison_created/);
  assert.match(source, /cache-control.*no-store/i);
  assert.doesNotMatch(source, /authorization|cookie|password|privateKey|GitHub/i);
});

test('draft plan route prepares and downloads only an unsubmitted plan', async () => {
  const source = await readFile('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/draft-pr-plan/route.ts', 'utf8');
  assert.match(source, /getChatGPTUser/);
  assert.match(source, /deriveCapsuleRole/);
  assert.match(source, /role !== 'owner'/);
  assert.match(source, /buildDraftPrPlan/);
  assert.match(source, /agentfriendly\.draft-pr-plan-request\.v1/);
  assert.match(source, /confirmPrepare !== true/);
  assert.match(source, /comparison\.status !== 'complete'/);
  assert.match(source, /draftPrPlans\.idempotencyKey/);
  assert.match(source, /draftPrPlans\.capsuleId/);
  assert.match(source, /draftPrPlans\.comparisonId/);
  assert.match(source, /existingPlan/);
  assert.match(source, /prepared_not_submitted/);
  assert.match(source, /remoteSubmission.*false/);
  assert.match(source, /cache-control.*no-store/i);
  assert.doesNotMatch(source, /GitHubDraftPrProvider|createDraftPullRequest|fetch\s*\(|Authorization|merge\s*\(/i);
});

test('both Block 5B routes hide foreign projects and persist only metadata-only events', async () => {
  const sources = await Promise.all([
    readFile('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/comparison/route.ts', 'utf8'),
    readFile('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/draft-pr-plan/route.ts', 'utf8'),
  ]);
  for (const source of sources) {
    assert.match(source, /status:\s*404/);
    assert.match(source, /projectEvents/);
    assert.doesNotMatch(source, /payloadJson:\s*JSON\.stringify\([^)]*(?:content|email|diff|planJson)/i);
  }
});
