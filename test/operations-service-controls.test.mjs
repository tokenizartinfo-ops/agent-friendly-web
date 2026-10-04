import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateKeyPair, SignJWT } from 'jose';
import { operationsDb } from './fixtures/operations-db.mjs';
import { recordSignal } from '../lib/operations-ledger.mjs';
import { createOperationsServiceControls } from '../lib/operations-service-controls.mjs';

const { privateKey, publicKey } = await generateKeyPair('RS256');
const config = { enabled: true, origin: 'https://operations-manager.agentfriendlyweb.dev', teamDomain: 'test.cloudflareaccess.com', audience: 'operations-only', clientId: 'synthetic-operations.access' };
const now = Date.parse('2026-10-04T17:00:00Z');
async function token(claims = {}, audience = config.audience, subject = '', signingKey = privateKey) {
  return new SignJWT({ type: 'app', common_name: config.clientId, ...claims }).setProtectedHeader({ alg: 'RS256' })
    .setIssuer('https://' + config.teamDomain).setAudience(audience).setSubject(subject).setExpirationTime(claims.exp ?? '5m').sign(signingKey);
}
async function setup() {
  const f = operationsDb(); f.sqlite.exec(readFileSync(new URL('../worker/operations/consumer-state.sql', import.meta.url), 'utf8'));
  const { fingerprint } = await recordSignal(f.db, { eventId: 'service-test', resource: 'afw_public_web', check: 'public_home', version: 'd09bcf52-6fae-4c34-bfec-40b715384205', observedAt: new Date(now).toISOString(), result: 'failed' }, now);
  let limitCalls = 0;
  const options = { db: f.db, config, keySet: publicKey, now: () => now + 1, limiter: { limit: async () => { limitCalls++; return { success: true }; } } };
  return { ...f, fingerprint, options, limitCalls: () => limitCalls };
}
function request(path, jwt, body, extra = {}) {
  return new Request(config.origin + path, { method: body === undefined ? 'GET' : 'POST', ...extra,
    headers: { 'Cf-Access-Jwt-Assertion': jwt, ...(body === undefined ? {} : { 'content-type': 'application/json' }), ...extra.headers },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}

test('signed service lists, reserves, correlates and completes one bounded investigation', async () => {
  const f = await setup(), handle = createOperationsServiceControls(f.options), jwt = await token();
  const pending = await handle(request('/incidents', jwt));
  assert.equal(pending.status, 200); assert.equal(pending.headers.get('cache-control'), 'no-store');
  assert.equal((await pending.json()).incidents[0].fingerprint, f.fingerprint);
  const body = { fingerprint: f.fingerprint, requestId: crypto.randomUUID() };
  const claim = await handle(request('/claim', jwt, body)); assert.equal(claim.status, 200);
  const { reservation } = await claim.json(); assert.ok(reservation.runId);
  assert.equal(JSON.stringify(reservation).includes('lease_token'), false);
  const again = await (await handle(request('/claim', jwt, body))).json(); assert.equal(again.reservation.runId, reservation.runId);
  const finish = await handle(request('/finish', jwt, { runId: reservation.runId, outcome: 'diagnosed' }));
  assert.deepEqual(await finish.json(), { outcome: 'diagnosed' });
});

test('human, other service, foreign audience, multiple audiences, expired and forged tokens fail before storage', async () => {
  const f = await setup(), handle = createOperationsServiceControls(f.options);
  const foreign = await generateKeyPair('RS256');
  for (const jwt of [await token({}, config.audience, 'human-subject'), await token({ common_name: 'mail.access' }),
    await token({}, 'mail-only'), await token({}, [config.audience, 'other']), await token({ exp: 1 }), await token({}, config.audience, '', foreign.privateKey), 'garbage']) {
    assert.equal((await handle(request('/incidents', jwt))).status, 401);
  }
  assert.equal(f.limitCalls(), 0);
  assert.equal((await f.db.prepare('SELECT COUNT(*) AS n FROM operations_investigations').first()).n, 0);
});

test('paused, unknown origin/routes and browser requests cannot use the service', async () => {
  const f = await setup(), jwt = await token();
  const paused = createOperationsServiceControls({ ...f.options, config: { ...config, enabled: false } });
  assert.equal((await paused(request('/incidents', jwt))).status, 404);
  const handle = createOperationsServiceControls(f.options);
  for (const path of ['/incidents?extra=1', '/deploy', '/claim/arbitrary']) assert.equal((await handle(request(path, jwt))).status, 404);
  assert.equal((await handle(new Request('https://mail-consumer.agentfriendlyweb.dev/incidents', { headers: { 'Cf-Access-Jwt-Assertion': jwt } }))).status, 404);
  assert.equal((await handle(request('/incidents', jwt, undefined, { headers: { Origin: config.origin } }))).status, 403);
  assert.equal((await handle(request('/incidents', jwt, undefined, { headers: { 'Sec-Fetch-Site': 'same-origin' } }))).status, 403);
  assert.equal(f.limitCalls(), 0);
});

test('strict bounded payload rejects configuration, commands, oversized and unfinished bodies', async () => {
  const f = await setup(), handle = createOperationsServiceControls({ ...f.options, bodyTimeoutMs: 15 }), jwt = await token();
  for (const body of [{ fingerprint: f.fingerprint, requestId: crypto.randomUUID(), version: 'override' },
    { fingerprint: f.fingerprint, requestId: 'bad' }, { runId: crypto.randomUUID(), outcome: 'recovered' }, { text: 'x'.repeat(2000) }]) {
    const response = await handle(request(Object.hasOwn(body, 'runId') ? '/finish' : '/claim', jwt, body));
    assert.ok([400, 413].includes(response.status));
  }
  let cancelled = false;
  const body = new ReadableStream({ cancel() { cancelled = true; } });
  const response = await handle(new Request(config.origin + '/claim', { method: 'POST', headers: { 'Cf-Access-Jwt-Assertion': jwt, 'content-type': 'application/json' }, body, duplex: 'half' }));
  assert.equal(response.status, 408); assert.equal(cancelled, true);
  assert.equal((await f.db.prepare('SELECT COUNT(*) AS n FROM operations_investigations').first()).n, 0);
});

test('limiter and storage errors fail closed without exposing provider details', async () => {
  const f = await setup(), jwt = await token();
  for (const options of [{ limiter: null }, { db: { prepare() { throw new Error('private-provider-detail'); } } }, { limiter: { limit() { throw new Error('private-provider-detail'); } } }]) {
    const response = await createOperationsServiceControls({ ...f.options, ...options })(request('/incidents', jwt));
    assert.equal(response.status, 503); assert.equal((await response.text()).includes('private-provider-detail'), false);
  }
  const blocked = createOperationsServiceControls({ ...f.options, limiter: { limit: async () => ({ success: false }) } });
  assert.equal((await blocked(request('/incidents', jwt))).status, 429);
});
