import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture, manifest, time} from './fixtures/occurrence-operations.mjs';
import {httpFixture} from './fixtures/occurrence-http.mjs';

test('native scenario can prepare a finite manifest at its own start instead of module import', () => {
  const now = time + 600000;
  const m = manifest(now);
  assert.equal(m.startAt, now-1);
  assert.equal(m.deadline, now+120000);
  assert.equal(m.tokenExpiresAt, now+120000);
  assert.equal(m.serverDeadline, now+120000);
  assert.equal(m.signal.observedAt, new Date(now-1000).toISOString());
});

test('own fixture clock carries original event time and approval pins into HTTP', async () => {
  const now = Date.now()+600000;
  const f = fixture(now);
  try {
    const row = f.a.prepare('SELECT observed_at,received_at FROM assistance_supervision_events').get();
    assert.equal(f.m.startAt, now-1);
    assert.equal(row.observed_at, new Date(now-1000).toISOString());
    assert.equal(row.received_at, now);
  } finally {f.cleanup();}
  const http = await httpFixture(now);
  try {
    assert.equal(http.policy.serverDeadline, now+120000);
    assert.equal(http.approval.manifest.startAt, now-1);
  } finally {http.cleanup();}
});
