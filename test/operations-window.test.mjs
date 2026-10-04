import test from 'node:test';
import assert from 'node:assert/strict';
import { operationsWindowOpen } from '../lib/operations-window.mjs';
import receiver from '../worker/operations/index.mjs';
import manager from '../worker/operations-manager/index.mjs';

const now = Date.parse('2026-10-04T20:00:00.000Z');
test('operational window rejects missing, malformed and noncanonical deadlines and closes exactly at expiry', () => {
  for (const value of [undefined, '', 'garbage', '2026-10-05', '2026-10-04T21:00:00', '2026-02-30T21:00:00.000Z']) {
    assert.equal(operationsWindowOpen({ AFW_OPERATIONS_WINDOW_EXPIRES_AT: value }, now), false);
  }
  const env = { AFW_OPERATIONS_WINDOW_EXPIRES_AT: new Date(now + 1000).toISOString() };
  assert.equal(operationsWindowOpen(env, now), true);
  assert.equal(operationsWindowOpen(env, now + 999), true);
  assert.equal(operationsWindowOpen(env, now + 1000), false);
  assert.equal(operationsWindowOpen(env, NaN), false);
});

test('expired operational requests fail closed before touching storage or identity', async () => {
  const db = new Proxy({}, { get() { throw Error('storage must not be read'); } });
  for (const deadline of [undefined, 'invalid', '2026-10-04T00:00:00.000Z']) {
    const env = { OPERATIONS_DB: db, AFW_OPERATIONS_ENABLED: 'true', AFW_OPERATIONS_CONSUMER_ENABLED: 'true',
      AFW_OPERATIONS_SIGNING_SECRET: 'synthetic-test-only-secret', AFW_OPERATIONS_WINDOW_EXPIRES_AT: deadline };
    assert.equal((await receiver.fetch(new Request('https://operations.agentfriendlyweb.dev/signals', { method: 'POST' }), env)).status, 503);
    assert.equal((await manager.fetch(new Request('https://operations-manager.agentfriendlyweb.dev/incidents'), env)).status, 404);
  }
});

test('valid window still requires existing receiver and manager protections', async () => {
  const env = { AFW_OPERATIONS_WINDOW_EXPIRES_AT: new Date(Date.now() + 60000).toISOString() };
  assert.equal((await receiver.fetch(new Request('https://operations.agentfriendlyweb.dev/signals', { method: 'POST' }), env)).status, 503);
  assert.equal((await manager.fetch(new Request('https://operations-manager.agentfriendlyweb.dev/incidents'), env)).status, 404);
});

test('future deadline reaches existing content and identity checks without bypassing them', async () => {
  const env = { AFW_OPERATIONS_WINDOW_EXPIRES_AT: new Date(Date.now() + 60000).toISOString(),
    AFW_OPERATIONS_ENABLED: 'true', AFW_OPERATIONS_CONSUMER_ENABLED: 'true', OPERATIONS_DB: {},
    AFW_OPERATIONS_SIGNING_SECRET: 'synthetic-test-only-secret-at-least-32' };
  assert.equal((await receiver.fetch(new Request('https://operations.agentfriendlyweb.dev/signals', { method: 'POST' }), env)).status, 415);
  assert.equal((await manager.fetch(new Request('https://operations-manager.agentfriendlyweb.dev/incidents'), env)).status, 401);
});
