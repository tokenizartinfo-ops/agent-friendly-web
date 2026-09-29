import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyCopilotResponse } from '../lib/copilot-ui-response.mjs';

const response = (status, contentType = 'application/json', redirected = false) => ({
  status, ok: status >= 200 && status < 300, redirected,
  headers: new Headers({ 'content-type': contentType }),
});

test('copilot gives a recoverable session message for auth failures or Access login HTML', () => {
  assert.equal(classifyCopilotResponse(response(401)), 'session');
  assert.equal(classifyCopilotResponse(response(403)), 'session');
  assert.equal(classifyCopilotResponse(response(200, 'text/html', true)), 'session');
});

test('copilot distinguishes missing dossier, rate limit and unexpected provider responses', () => {
  assert.equal(classifyCopilotResponse(response(404)), 'project_unavailable');
  assert.equal(classifyCopilotResponse(response(429)), 'rate_limited');
  assert.equal(classifyCopilotResponse(response(503)), 'unavailable');
  assert.equal(classifyCopilotResponse(response(200, 'text/html')), 'unavailable');
  assert.equal(classifyCopilotResponse(response(200, 'application/json; charset=utf-8')), 'ok');
});
