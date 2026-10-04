import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { recordSignal } from '../lib/operations-ledger.mjs';
import { reserveInvestigation, completeInvestigation, listPendingIncidents } from '../lib/operations-consumer.mjs';

const now = Date.parse('2026-10-04T17:00:00Z');
function fixture() {
  const f = operationsDb();
  f.sqlite.exec(readFileSync(new URL('../worker/operations/consumer-state.sql', import.meta.url), 'utf8'));
  return f;
}
async function failure(db, id = 'one', time = now, check = 'public_home') {
  return recordSignal(db, { eventId: id, check, resource: 'afw_public_web', version: 'd09bcf52-6fae-4c34-bfec-40b715384205', observedAt: new Date(time).toISOString(), result: 'failed' }, time);
}

test('consumer has one global reservation and exposes only fixed incident metadata', async () => {
  const { db } = fixture();
  const a = await failure(db), b = await failure(db, 'two', now, 'public_discovery');
  const pending = await listPendingIncidents(db, now);
  assert.equal(pending.length, 2);
  assert.equal(JSON.stringify(pending).includes('lease_token'), false);
  const results = await Promise.all([reserveInvestigation(db, a.fingerprint, now), reserveInvestigation(db, b.fingerprint, now)]);
  assert.equal(results.filter(Boolean).length, 1);
  const run = results.find(Boolean);
  assert.deepEqual(Object.keys(run).sort(), ['check', 'expiresAt', 'fingerprint', 'observedAt', 'resource', 'runId', 'version'].sort());
  assert.equal(await reserveInvestigation(db, run.fingerprint, now + 1), null);
});

test('a completed diagnosis is durable, idempotent and never claims recovery', async () => {
  const { db } = fixture(); const { fingerprint } = await failure(db);
  const run = await reserveInvestigation(db, fingerprint, now);
  assert.equal(await completeInvestigation(db, run.runId, 'diagnosed', now + 1), 'diagnosed');
  assert.equal(await completeInvestigation(db, run.runId, 'diagnosed', now + 2), 'diagnosed');
  assert.equal(await completeInvestigation(db, run.runId, 'blocked', now + 2), null);
  assert.deepEqual({ ...(await db.prepare('SELECT state,phase,attempts FROM operations_incidents').first()) }, { state: 'failed', phase: 'review', attempts: 1 });
});

test('claim retries recover their original correlation without another attempt', async () => {
  const { db } = fixture(); const { fingerprint } = await failure(db);
  const requestId = crypto.randomUUID();
  const first = await reserveInvestigation(db, fingerprint, now, requestId);
  const second = await reserveInvestigation(db, fingerprint, now + 1, requestId);
  assert.equal(second.runId, first.runId);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_investigations').first()).n, 1);
  const other = await failure(db, 'other', now, 'public_discovery');
  assert.equal(await reserveInvestigation(db, other.fingerprint, now + 1, requestId), null);
  await completeInvestigation(db, first.runId, 'blocked', now + 2);
  assert.equal(await reserveInvestigation(db, fingerprint, now + 3, requestId), null);
});

test('completion failure rolls back its receipt and leaves the lease recoverable', async () => {
  const f = fixture(); const { fingerprint } = await failure(f.db);
  const run = await reserveInvestigation(f.db, fingerprint, now);
  f.failBatchAt(1);
  await assert.rejects(completeInvestigation(f.db, run.runId, 'diagnosed', now + 1));
  assert.equal((await f.db.prepare('SELECT finished_at FROM operations_investigations').first()).finished_at, null);
  assert.equal((await f.db.prepare('SELECT phase FROM operations_incidents').first()).phase, 'investigating');
  f.failBatchAt(-1);
  assert.equal(await completeInvestigation(f.db, run.runId, 'diagnosed', now + 2), 'diagnosed');
});

test('rolling daily budget covers different incidents, restarts and expired attempts', async () => {
  const { db } = fixture();
  for (let i = 0; i < 3; i++) {
    const { fingerprint } = await failure(db, 'e' + i, now + i * 300001, ['public_home', 'public_discovery', 'private_boundary'][i]);
    assert.ok(await reserveInvestigation(db, fingerprint, now + i * 300001));
  }
  const { fingerprint } = await failure(db, 'again', now + 900003);
  assert.equal(await reserveInvestigation(db, fingerprint, now + 900003), null);
  assert.ok(await reserveInvestigation(db, fingerprint, now + 86400001));
});

test('lost responses, newer failures and recovery cannot be overwritten by stale completion', async () => {
  const { db } = fixture(); const { fingerprint } = await failure(db);
  const first = await reserveInvestigation(db, fingerprint, now);
  assert.equal(await completeInvestigation(db, first.runId, 'diagnosed', now + 300000), null);
  const next = await reserveInvestigation(db, fingerprint, now + 300001);
  await failure(db, 'new', now + 300002);
  assert.equal(await completeInvestigation(db, next.runId, 'diagnosed', now + 300003), 'superseded');
  assert.equal((await db.prepare('SELECT phase FROM operations_incidents').first()).phase, 'pending');
  const third = await reserveInvestigation(db, fingerprint, now + 300004);
  await recordSignal(db, { eventId: 'recovery', check: 'public_home', resource: 'afw_public_web', version: 'd09bcf52-6fae-4c34-bfec-40b715384205', observedAt: new Date(now + 300005).toISOString(), result: 'recovered' }, now + 300005);
  assert.equal(await completeInvestigation(db, third.runId, 'diagnosed', now + 300006), 'superseded');
  assert.equal((await db.prepare('SELECT phase FROM operations_incidents').first()).phase, 'closed');
});

test('reservation and receipt roll back together on storage failure; invalid input has no writes', async () => {
  const f = fixture(); const { fingerprint } = await failure(f.db);
  f.failBatchAt(1);
  await assert.rejects(reserveInvestigation(f.db, fingerprint, now));
  assert.equal((await f.db.prepare('SELECT attempts FROM operations_incidents').first()).attempts, 0);
  f.failBatchAt(-1);
  const before = f.sqlite.prepare('SELECT total_changes() AS n').get().n;
  await assert.rejects(reserveInvestigation(f.db, 'invalid', now));
  await assert.rejects(reserveInvestigation(f.db, fingerprint, -1));
  await assert.rejects(completeInvestigation(f.db, crypto.randomUUID(), 'recovered', now));
  assert.equal(f.sqlite.prepare('SELECT total_changes() AS n').get().n, before);
});
