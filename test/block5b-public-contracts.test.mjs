import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('origin comparison schema is closed and enumerates every safe resource state', async () => {
  const schema = JSON.parse(await readFile('public/schemas/origin-comparison.v1.json', 'utf8'));
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.contract.const, 'agentfriendly.origin-comparison.v1');
  assert.deepEqual(schema.properties.status.enum, ['complete', 'incomplete']);
  const states = schema.properties.resources.items.properties.status.enum;
  for (const state of ['missing', 'unchanged', 'changed', 'manual_review_required', 'unavailable', 'blocked']) assert.ok(states.includes(state));
  assert.equal(schema.properties.resources.items.additionalProperties, false);
  assert.doesNotMatch(JSON.stringify(schema), /token|cookie|password|authorization/i);
});

test('draft PR plan schema forbids remote submission and merge', async () => {
  const schema = JSON.parse(await readFile('public/schemas/draft-pr-plan.v1.json', 'utf8'));
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.contract.const, 'agentfriendly.draft-pr-plan.v1');
  assert.equal(schema.properties.remoteSubmission.const, false);
  assert.equal(schema.properties.mergeAllowed.const, false);
  assert.deepEqual(schema.properties.status.enum, ['prepared_not_submitted', 'stale', 'blocked', 'cancelled']);
  assert.equal(schema.properties.files.items.additionalProperties, false);
  assert.doesNotMatch(JSON.stringify(schema), /credential|cookie|password|authorization/i);
});
