import test from 'node:test';
import assert from 'node:assert/strict';
import { previewIntakeDraft, applyIntakeDraft } from '../lib/intake-draft-review.mjs';

test('manual source and responsibility answers are reviewable and preserve unrelated data', () => {
  const draft = { contentSources: [], control: 'unknown', organization: 'Example' };
  const changes = previewIntakeDraft(draft, { suggestions: [{ field: 'contentSources', value: ['services'] }, { field: 'control', value: 'origin' }] }, ['contentSources', 'control']);
  assert.equal(draft.control, 'unknown');
  const after = applyIntakeDraft(draft, changes);
  assert.deepEqual(after.contentSources, ['services']);
  assert.equal(after.control, 'origin');
  assert.equal(after.organization, 'Example');
  assert.throws(() => previewIntakeDraft(draft, { suggestions: [{ field: 'control', value: 'root' }] }, ['control']), /invalid_proposal/);
});
