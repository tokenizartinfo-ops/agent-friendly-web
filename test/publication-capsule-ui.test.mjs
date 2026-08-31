import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';

test('owner expediente exposes explicit capsule preparation without remote publication', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  assert.match(source, /CapsuleReview/);
  assert.match(source, /projectId=\{projectId\}/);
  assert.match(source, /expectedDomain=\{hostname\}/);
});

test('capsule review shows exact files, hashes, download and separate human decisions', async () => {
  const source = await readFile('app/components/capsule-review.tsx', 'utf8');

  for (const locale of ['es', 'en', 'pt']) {
    const copy = PRIVATE_UI_COPY[locale].capsule;
    for (const label of ['title', 'prepare', 'downloadJson', 'ownerApproval', 'maintainerApproval', 'approve', 'reject', 'noWrite']) {
      assert.ok(copy[label]);
    }
  }
  assert.match(source, /privateUiCopy\(locale\)\.capsule/);
  assert.match(source, /file\.sha256\.slice/);
  assert.match(source, /file\.operation/);
  assert.match(source, /deployment-capsules/);
  assert.match(source, /agentfriendly\.publication-capsule-build\.v1/);
  assert.match(source, /agentfriendly\.capsule-decision\.v1/);
  assert.match(source, /localizedPath\('capsule'/);
  assert.doesNotMatch(source, /password|apiKey|Authorization/);
});

test('private capsule page requires identity and reveals only the capsule review surface', async () => {
  const source = await readFile('app/capsula/[projectId]/page.tsx', 'utf8');

  assert.match(source, /requireChatGPTUser/);
  assert.match(source, /CapsuleReview/);
  assert.doesNotMatch(source, /IntakeWorkspace/);
});
