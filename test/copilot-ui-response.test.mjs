import assert from 'node:assert/strict';
import test from 'node:test';
import * as responseContract from '../lib/copilot-ui-response.mjs';
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

test('consent and revision changes explain the next step without asking for another login', async () => {
  assert.equal(typeof responseContract.readCopilotResponseKind, 'function');
  for (const [status, code, expected] of [[403,'project_consent_required','consent'],[409,'project_changed','project_changed'],[403,'unknown','session']]) {
    const result = await responseContract.readCopilotResponseKind(Response.json({ code }, { status }));
    assert.equal(result, expected);
  }
  assert.equal(await responseContract.readCopilotResponseKind(new Response('invalid', { status:403, headers:{'content-type':'application/json'} })), 'session');
  assert.equal(await responseContract.readCopilotResponseKind(new Response('<html>login</html>', { status:403, headers:{'content-type':'text/html'} })), 'session');
});
