import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldAutosaveProject } from '../lib/project-autosave.mjs';

test('autosave pauses for manual review, session failure and in-flight writes', () => {
  const state = { ready: true, draft: { website: 'restaurant.example', organization: 'New' }, base: { website: 'restaurant.example' } };
  assert.equal(shouldAutosaveProject(state), true);
  for (const flag of ['manual', 'busy', 'paused', 'conflict', 'sessionRequired']) {
    assert.equal(shouldAutosaveProject({ ...state, [flag]: true }), false);
  }
  assert.equal(shouldAutosaveProject({ ...state, ready: false }), false);
});

test('normalized saved data does not loop on trailing slashes, whitespace or missing URL', () => {
  assert.equal(shouldAutosaveProject({ ready: true, draft: { website: 'restaurant.example', organization: ' Demo ' }, base: { website: 'https://restaurant.example/', organization: 'Demo' } }), false);
  assert.equal(shouldAutosaveProject({ ready: true, draft: { organization: 'Demo' }, base: {} }), false);
});
