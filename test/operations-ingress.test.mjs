import test from 'node:test';
import assert from 'node:assert/strict';
import { operationsDb } from './fixtures/operations-db.mjs';
import { createOperationsIngress } from '../lib/operations-ingress.mjs';

const now = Date.parse('2026-10-01T15:00:00Z'), secret = 'synthetic-test-only-signing-secret-32-characters';
const payload = { eventId: 'ingress-1', check: 'public_home', resource: 'afw_public_web', version: 'd09bcf52-6fae-4c34-bfec-40b715384205', observedAt: new Date(now).toISOString(), result: 'failed' };
async function request(body = JSON.stringify(payload), extra = {}, timestamp = String(now)) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(timestamp + '.' + body));
  const signature = Array.from(new Uint8Array(bytes), x => x.toString(16).padStart(2, '0')).join('');
  return new Request('https://operations.agentfriendlyweb.dev/signals', { method: 'POST', body, headers: { 'content-type': 'application/json', 'x-afw-timestamp': timestamp, 'x-afw-signature': signature, ...extra } });
}
function fixture() {
  const { db } = operationsDb();
  return { db, env: { OPERATIONS_DB: db, AFW_OPERATIONS_ENABLED: 'true', AFW_OPERATIONS_SIGNING_SECRET: secret }, worker: createOperationsIngress({ now: () => now, bodyTimeoutMs: 20 }) };
}

test('signed signal is persisted, duplicate acknowledged without another failure', async () => {
  const f = fixture();
  assert.equal((await f.worker.fetch(await request(), f.env)).status, 202);
  const response = await f.worker.fetch(await request(), f.env);
  assert.equal(response.status, 202); assert.equal((await response.json()).duplicate, true);
  assert.equal((await f.db.prepare('SELECT failures FROM operations_incidents').first()).failures, 1);
});

test('signature binds original bytes, rejects forged/stale requests before storage', async () => {
  const f = fixture();
  for (const req of [await request(undefined, { 'x-afw-signature': '0'.repeat(64) }), await request(undefined, {}, String(now - 300001)), new Request(await request(), { body: JSON.stringify({ ...payload, result: 'recovered' }) })]) assert.equal((await f.worker.fetch(req, f.env)).status, 401);
  assert.equal((await f.db.prepare('SELECT COUNT(*) AS n FROM operations_events').first()).n, 0);
});

test('disabled, unconfigured and unavailable storage fail closed without exposing input', async () => {
  const f = fixture();
  for (const env of [{ ...f.env, AFW_OPERATIONS_ENABLED: 'false' }, { ...f.env, AFW_OPERATIONS_SIGNING_SECRET: '' }, { ...f.env, OPERATIONS_DB: { batch: async () => { throw new Error('private secret'); }, prepare: f.db.prepare } }]) {
    const response = await f.worker.fetch(await request(), env);
    assert.equal(response.status, 503); assert.doesNotMatch(await response.text(), /private secret/);
  }
});

test('rejects oversized, stalled, unknown fields, foreign origin and incorrect paths', async () => {
  const f = fixture();
  assert.equal((await f.worker.fetch(await request('x'.repeat(8193)), f.env)).status, 413);
  assert.equal((await f.worker.fetch(await request(JSON.stringify({ ...payload, mailBody: 'sensitive' })), f.env)).status, 400);
  assert.equal((await f.worker.fetch(new Request('https://atelier.tokenizart.com/signals', await request()), f.env)).status, 404);
  assert.equal((await f.worker.fetch(new Request('https://operations.agentfriendlyweb.dev/other'), f.env)).status, 404);
  assert.equal((await f.worker.fetch(new Request('https://operations.agentfriendlyweb.dev/signals'), f.env)).status, 405);
  const req = await request();
  const stream = new ReadableStream({ start() {}, cancel() {} });
  const stalled = new Request(req.url, { method: 'POST', headers: req.headers, body: stream, duplex: 'half' });
  assert.equal((await f.worker.fetch(stalled, f.env)).status, 408);
});

test('collision is 409 and content type is required', async () => {
  const f = fixture(); await f.worker.fetch(await request(), f.env);
  assert.equal((await f.worker.fetch(await request(JSON.stringify({ ...payload, result: 'recovered' })), f.env)).status, 409);
  assert.equal((await f.worker.fetch(await request(undefined, { 'content-type': 'text/plain' }), f.env)).status, 415);
});
