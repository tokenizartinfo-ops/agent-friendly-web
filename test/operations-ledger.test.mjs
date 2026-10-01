import test from 'node:test';
import assert from 'node:assert/strict';
import { operationsDb } from './fixtures/operations-db.mjs';
import { validateSignal, recordSignal, claimIncident, finishInvestigation } from '../lib/operations-ledger.mjs';

const now = Date.parse('2026-10-01T15:00:00Z');
const signal = (extra = {}) => ({ eventId: 'event-1', check: 'public_discovery', resource: 'afw_public_web', version: 'd09bcf52-6fae-4c34-bfec-40b715384205', observedAt: new Date(now).toISOString(), result: 'failed', ...extra });

test('signal contract rejects foreign resources, unknown fields, invalid dates and versions', () => {
  assert.equal(validateSignal(signal(), now).result, 'failed');
  for (const extra of [{ resource: 'atelier' }, { body: 'private' }, { check: 'email' }, { observedAt: 'garbage' }, { observedAt: new Date(now + 300001).toISOString() }, { version: 'latest' }, { eventId: 'https://evil.test' }]) assert.throws(() => validateSignal(signal(extra), now));
});

test('atomic durable receipt deduplicates delivery and rejects ID collision', async () => {
  const { db } = operationsDb();
  const first = await recordSignal(db, signal(), now);
  assert.equal(first.accepted, true);
  assert.equal((await recordSignal(db, signal(), now)).duplicate, true);
  await assert.rejects(recordSignal(db, signal({ result: 'recovered' }), now), /collision/);
  assert.equal((await db.prepare('SELECT failures FROM operations_incidents').first()).failures, 1);
});

test('database crash rolls back receipt and incident, retry can finish', async () => {
  const f = operationsDb(); f.failBatchAt(1);
  await assert.rejects(recordSignal(f.db, signal(), now));
  assert.equal((await f.db.prepare('SELECT COUNT(*) AS n FROM operations_events').first()).n, 0);
  f.failBatchAt(-1);
  assert.equal((await recordSignal(f.db, signal(), now)).accepted, true);
});

test('one concurrent lease, stale finish denied, bounded retries and restart recovery', async () => {
  const { db } = operationsDb(); const { fingerprint } = await recordSignal(db, signal(), now);
  const claims = await Promise.all([claimIncident(db, fingerprint, now), claimIncident(db, fingerprint, now)]);
  assert.equal(claims.filter(Boolean).length, 1);
  const lease = claims.find(Boolean);
  assert.equal(await finishInvestigation(db, fingerprint, lease.lease_token, now + 1), true);
  assert.equal(await finishInvestigation(db, fingerprint, lease.lease_token, now + 2), false);
  assert.equal(await claimIncident(db, fingerprint, now + 3), null);
  await recordSignal(db, signal({ eventId: 'event-2', observedAt: new Date(now + 1000).toISOString() }), now + 1000);
  const second = await claimIncident(db, fingerprint, now + 1000);
  const third = await claimIncident(db, fingerprint, now + 1000 + 300001);
  assert.ok(third); assert.notEqual(second.lease_token, third.lease_token);
  assert.equal(await finishInvestigation(db, fingerprint, second.lease_token, now + 301002), false);
  assert.equal(await claimIncident(db, fingerprint, now + 602000), null);
});

test('recovery cancels lease, delayed failure cannot reopen, healthy baseline creates no incident', async () => {
  const { db } = operationsDb();
  await recordSignal(db, signal({ eventId: 'healthy', result: 'recovered' }), now);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_incidents').first()).n, 0);
  const { fingerprint } = await recordSignal(db, signal(), now);
  const lease = await claimIncident(db, fingerprint, now);
  await recordSignal(db, signal({ eventId: 'healthy-2', result: 'recovered', observedAt: new Date(now + 1000).toISOString() }), now + 1000);
  assert.equal(await finishInvestigation(db, fingerprint, lease.lease_token, now + 1001), false);
  await recordSignal(db, signal({ eventId: 'late', observedAt: new Date(now + 500).toISOString() }), now + 1001);
  assert.equal(await claimIncident(db, fingerprint, now + 1001), null);
});

test('late recovery and equal timestamp recovery cannot erase newer failure', async () => {
  const { db } = operationsDb(); const { fingerprint } = await recordSignal(db, signal(), now);
  for (const offset of [-1, 0]) await recordSignal(db, signal({ eventId: 'late-' + Math.abs(offset), result: 'recovered', observedAt: new Date(now + offset).toISOString() }), now);
  assert.ok(await claimIncident(db, fingerprint, now));
});

test('new failure during diagnosis cannot be marked reviewed by an older investigation', async () => {
  const { db } = operationsDb(); const { fingerprint } = await recordSignal(db, signal(), now);
  const lease = await claimIncident(db, fingerprint, now);
  await recordSignal(db, signal({ eventId: 'newer-failure', observedAt: new Date(now + 1000).toISOString() }), now + 1000);
  assert.equal(await finishInvestigation(db, fingerprint, lease.lease_token, now + 1001), false);
  assert.ok(await claimIncident(db, fingerprint, now + 1002));
});

test('newer recovery received before historical failure prevents opening an incident', async () => {
  const { db } = operationsDb();
  await recordSignal(db, signal({ eventId: 'newest-healthy', observedAt: new Date(now + 1000).toISOString(), result: 'recovered' }), now + 1000);
  await recordSignal(db, signal(), now + 1000);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_incidents').first()).n, 0);
});
