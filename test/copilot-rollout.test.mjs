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
