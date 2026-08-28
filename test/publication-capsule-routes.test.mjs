import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('capsule collection route fails closed and creates only manual handoff packages', async () => {
  const source = await readFile('app/api/projects/[projectId]/deployment-capsules/route.ts', 'utf8');

  assert.match(source, /getChatGPTUser/);
  assert.match(source, /deriveCapsuleRole/);
  assert.match(source, /role !== 'owner'/);
  assert.match(source, /agentfriendly\.publication-capsule-build\.v1/);
  assert.match(source, /confirmBuild !== true/);
  assert.match(source, /domainClaimStatusAt\(claim\) !== 'verified'/);
  assert.match(source, /buildPublicationCapsule/);
  assert.match(source, /publicationCapsules\.idempotencyKey/);
  assert.match(source, /cache-control.*no-store/i);
  assert.doesNotMatch(source, /fetch\s*\(/);
  assert.doesNotMatch(source, /wrangler|wordpress|github|authorization/i);
});

test('capsule decision route derives roles and binds every decision to one manifest', async () => {
  const source = await readFile('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/decisions/route.ts', 'utf8');

  assert.match(source, /getChatGPTUser/);
  assert.match(source, /deriveCapsuleRole/);
  assert.match(source, /validateCapsuleDecision/);
  assert.match(source, /decision\.manifestSha256 !== capsule\.manifestSha256/);
  assert.match(source, /capsuleApprovals\.idempotencyKey/);
  assert.match(source, /capsuleState/);
  assert.match(source, /approved_for_manual_handoff/);
  assert.match(source, /currentStatus === 'rejected'/);
  assert.match(source, /currentStatus === 'approved_for_manual_handoff'/);
  assert.doesNotMatch(source, /body\.role|requestedRole/);
  assert.doesNotMatch(source, /fetch\s*\(|deploy|merge|applyAdapter/i);
});
