import assert from 'node:assert/strict';
import test from 'node:test';
import { createProjectSaveAttempt } from '../lib/project-save-attempt.mjs';
import { createIntakeRehearsal } from '../lib/intake-workspace-rehearsal.mjs';

test('form retry after response loss returns the same revision', async () => {
  const transport = createIntakeRehearsal({ versioned: true });
  const project = (await (await transport.request('/api/projects')).json()).project;
  const attempt = createProjectSaveAttempt().prepare({ ...project, organization: 'Revised restaurant' });
  transport.loseNextResponse();
  await assert.rejects(transport.request('/api/projects', attempt), /response_lost/);
  const response = await transport.request('/api/projects', attempt);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.project.revision, 2);
  assert.equal(payload.replayed, true);
});

test('retry keeps the same key and exact body until the reviewed payload changes', () => {
  const attempts = createProjectSaveAttempt();
  const payload = { website: 'https://restaurant.example', revision: 1 };
  const first = attempts.prepare(payload);
  assert.deepEqual(attempts.prepare({ ...payload }), first);
  const changed = attempts.prepare({ ...payload, revision: 2 });
  assert.notEqual(changed.headers['idempotency-key'], first.headers['idempotency-key']);
  assert.equal(changed.method, 'PUT');
  assert.equal(JSON.parse(first.body).revision, 1);
});
