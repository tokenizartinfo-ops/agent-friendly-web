import assert from 'node:assert/strict';
import test from 'node:test';
import { createProjectRequest } from '../lib/project-create-client.mjs';

test('creation retry freezes the original payload and coalesces double clicks', async () => {
  const bodies = [];
  let attempts = 0;
  const submit = createProjectRequest({ website: 'example.org', organization: 'Example' }, 'stable-test-key', async (_url, options) => {
    bodies.push(options.body);
    attempts++;
    if (attempts === 1) throw new Error('connection lost');
    return Response.json({ project: { id: 'new-project' } }, { status: 200 });
  });
  await assert.rejects(submit());
  const results = await Promise.all([submit(), submit()]);
  assert.equal(results[0].id, 'new-project');
  assert.equal(bodies.length, 2);
  assert.equal(bodies[0], bodies[1]);
  assert.equal(JSON.parse(bodies[0]).confirmCreate, true);
});

test('unsuccessful responses never produce a success link', async () => {
  for (const response of [Response.json({ error: 'no' }, { status: 503 }), Response.json({ project: {} })]) {
    const submit = createProjectRequest({ website: 'example.org' }, 'stable-test-key', async () => response);
    await assert.rejects(submit());
  }
});

test('definitive validation is distinguishable from an uncertain delivery', async () => {
  const submit = createProjectRequest({ website: 'data:text/plain,test' }, 'stable-test-key', async () => Response.json({}, { status: 400 }));
  await assert.rejects(submit(), (error) => error.status === 400);
});
