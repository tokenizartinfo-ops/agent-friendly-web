import test from 'node:test';
import assert from 'node:assert/strict';
import { previewIntakeDraft } from '../lib/intake-draft-review.mjs';

test('recovering another conversation invalidates a preview even when dossier values did not change', async () => {
  const implementation = await import('../lib/copilot-review-epoch.mjs').catch(() => ({}));
  assert.equal(typeof implementation.applyCopilotReview, 'function');
  const draft = { cms: '' };
  const changes = previewIntakeDraft(draft, { suggestions: [{ field: 'cms', value: 'Drupal' }] }, ['cms']);
  assert.throws(() => implementation.applyCopilotReview(draft, changes, 3, 4), /stale_preview/);
  assert.equal(implementation.applyCopilotReview(draft, changes, 3, 3).cms, 'Drupal');
  assert.equal(draft.cms, '');
});
