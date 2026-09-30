import assert from 'node:assert/strict';
import test from 'node:test';
import { isCopilotProjectAllowed } from '../lib/copilot-rollout.mjs';

test('copilot stays closed without both the flag and one exact project', () => {
  assert.equal(isCopilotProjectAllowed({ enabled: false, allowedProjectId: 'synthetic', projectId: 'synthetic' }), false);
  assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: '', projectId: 'synthetic' }), false);
  assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: '*', projectId: 'synthetic' }), false);
  assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: 'synthetic', projectId: 'other' }), false);
  assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: 'synthetic', projectId: 'synthetic' }), true);
});

test('a bounded explicit JSON project list permits only its exact members', () => {
  for (const projectId of ['first', 'second']) {
    assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: '["first","second"]', projectId }), true);
  }
  assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId: '["first","second"]', projectId: 'third' }), false);
  assert.equal(isCopilotProjectAllowed({ enabled: false, allowedProjectId: '["first"]', projectId: 'first' }), false);
});

test('invalid, wildcard, duplicate and oversized rollout lists fail closed', () => {
  for (const allowedProjectId of ['[]', '["first","*"]', '["first",null]', '["first","first"]', '["first", "bad id"]', '["first"', JSON.stringify(Array.from({ length: 11 }, (_, i) => `project-${i}`))]) {
    assert.equal(isCopilotProjectAllowed({ enabled: true, allowedProjectId, projectId: 'first' }), false);
  }
});
