import test from 'node:test';
import assert from 'node:assert/strict';
import { createOperationsClient } from '../lib/operations-client.mjs';
const env = { AFW_OPERATIONS_ACCESS_CLIENT_ID: 'synthetic-proxy-id', AFW_OPERATIONS_ACCESS_CLIENT_SECRET: 'synthetic-proxy-secret' };
const fingerprint = 'a'.repeat(64), requestId = crypto.randomUUID(), runId = crypto.randomUUID();
const incident = { fingerprint, resource: 'afw_delegated_canary', check: 'delegated_edge', version: 'aa121311-2d88-4a2f-ad54-b52193cd1c20', observedAt: '2026-10-04T17:00:00.000Z' };

test('cloud client pins its destination and validates correlated metadata without returning credentials', async () => {
  const requests = [];
  const client = createOperationsClient({ env, fetchImpl: async request => {
    requests.push(request);
    if (request.method === 'GET') return Response.json({ incidents: [incident] });
    const body = await request.json();
    return Response.json(Object.hasOwn(body, 'fingerprint') ? { reservation: { ...incident, runId, expiresAt: '2026-10-04T17:05:00.000Z' } } : { outcome: 'superseded' });
  } });
  assert.deepEqual(await client.list(), [incident]);
  assert.equal((await client.claim(fingerprint, requestId)).runId, runId);
  assert.equal(await client.finish(runId, 'diagnosed'), 'superseded');
  for (const request of requests) {
    assert.equal(new URL(request.url).origin, 'https://operations-manager.agentfriendlyweb.dev');
    assert.equal(request.redirect, 'manual');
    assert.equal(request.headers.get('CF-Access-Client-Secret'), env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET);
  }
});

test('cloud client refuses redirects, login HTML, arbitrary metadata, wrong correlation and failed receipts', async () => {
  const responses = [new Response(null, { status: 302, headers: { location: 'https://foreign.invalid' } }),
    new Response('<html>Login</html>', { headers: { 'content-type': 'text/html' } }),
    Response.json({ incidents: [{ ...incident, resource: 'atelier' }] }),
    Response.json({ incidents: [{ ...incident, lease_token: 'hidden' }] }),
    Response.json({ incidents: Array(11).fill(incident) }),
    Response.json({ incidents: [{ ...incident, observedAt: 'bad' }] }),
    Response.json({ error: env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET }, { status: 503 }),
    Response.json({ incidents: [], arbitrary: 'field' }),
    new Response('x'.repeat(9000), { headers: { 'content-type': 'application/json' } })];
  for (const response of responses) {
    await assert.rejects(createOperationsClient({ env, fetchImpl: async () => response }).list(), error => error.message === 'Operational request unavailable');
  }
  const wrong = createOperationsClient({ env, fetchImpl: async () => Response.json({ reservation: { ...incident, fingerprint: 'b'.repeat(64), runId, expiresAt: '2026-10-04T17:05:00.000Z' } }) });
  await assert.rejects(wrong.claim(fingerprint, requestId));
  let calls = 0;
  const unavailable = createOperationsClient({ env: {}, fetchImpl: async () => { calls++; } });
  await assert.rejects(unavailable.list()); assert.equal(calls, 0);
  await assert.rejects(wrong.finish(runId, 'recovered'));
});

test('cloud client bounds a stuck fetch or unfinished response and cancels transport', async () => {
  let aborted = false;
  const stuck = createOperationsClient({ env, timeoutMs: 15, fetchImpl: async request => {
    request.signal.addEventListener('abort', () => { aborted = true; });
    return new Promise(() => {});
  } });
  await assert.rejects(stuck.list(), /Operational request unavailable/); assert.equal(aborted, true);
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  const response = new Response(stream, { headers: { 'content-type': 'application/json' } });
  await assert.rejects(createOperationsClient({ env, timeoutMs: 15, fetchImpl: async () => response }).list(), /Operational request unavailable/);
  assert.equal(cancelled, true);
});
