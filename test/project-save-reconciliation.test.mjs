import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileSavedDraft } from '../lib/project-save-reconciliation.mjs';

test('late save response preserves a resource selected after submission', () => {
  const submitted = { website: 'https://example.com', authorizedResources: [] };
  const saved = { ...submitted, website: 'https://example.com/' };
  const current = { ...submitted, authorizedResources: ['llms.txt'] };
  assert.deepEqual(reconcileSavedDraft(submitted, saved, current), {
    website: 'https://example.com/', authorizedResources: ['llms.txt'],
  });
});

test('unchanged fields accept server normalization while later edits remain local', () => {
  const submitted = { organization: ' Original ', notes: 'before', languages: ['es'] };
  const saved = { ...submitted, organization: 'Original' };
  const current = { ...submitted, notes: 'after', languages: [] };
  assert.deepEqual(reconcileSavedDraft(submitted, saved, current), {
    organization: 'Original', notes: 'after', languages: [],
  });
  assert.equal(saved.notes, 'before');
  assert.equal(submitted.organization, ' Original ');
});
