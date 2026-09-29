import test from 'node:test';
import assert from 'node:assert/strict';
import { readProjectSaveResponse } from '../lib/project-save-response.mjs';
import { createProjectSaveAttempt } from '../lib/project-save-attempt.mjs';
import { createIntakeRehearsal } from '../lib/intake-workspace-rehearsal.mjs';

test('session recovery preserves the attempted draft and saves it exactly once on retry', async () => {
  const transport = createIntakeRehearsal({ versioned: true });
  const original = (await (await transport.request('/api/projects')).json()).project;
  const draft = { ...original, organization: 'Prueba de recuperacion' };
  const attempt = createProjectSaveAttempt();
  const request = attempt.prepare(draft);
  transport.expireSession();
  assert.deepEqual(await readProjectSaveResponse(await transport.request('/api/projects', request)), { sessionRequired: true });
  transport.restoreSession();
  assert.equal((await (await transport.request('/api/projects')).json()).project.revision, original.revision);
  const retry = attempt.prepare(draft);
  assert.equal(retry.headers['idempotency-key'], request.headers['idempotency-key']);
  const saved = await readProjectSaveResponse(await transport.request('/api/projects', retry));
  assert.equal(saved.payload.project.organization, draft.organization);
  assert.equal(saved.payload.project.revision, original.revision + 1);
  const replay = await readProjectSaveResponse(await transport.request('/api/projects', retry));
  assert.equal(replay.payload.replayed, true);
  assert.equal(replay.payload.project.revision, original.revision + 1);
});

test('save requests do not follow authentication redirects', () => {
  assert.equal(createProjectSaveAttempt().prepare({ organization: 'Demo' }).redirect, 'manual');
});
test('401 and opaque redirects request login without parsing response bodies', async () => {
  for (const response of [{ status: 401 }, { status: 0, type: 'opaqueredirect' }]) {
    assert.deepEqual(await readProjectSaveResponse(response), { sessionRequired: true });
  }
});
test('HTML, invalid JSON and permissions errors never masquerade as successful saves', async () => {
  await assert.rejects(readProjectSaveResponse(new Response('<html>login</html>', { headers: { 'content-type': 'text/html' } })), /invalid_save_response/);
  await assert.rejects(readProjectSaveResponse(new Response('{', { headers: { 'content-type': 'application/json' } })), /invalid_save_response/);
  const payload = { error: 'forbidden' };
  assert.deepEqual(await readProjectSaveResponse(Response.json(payload, { status: 403 })), { sessionRequired: false, payload });
});
