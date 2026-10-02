import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { prepareMail, approveMail, claimMail, finishMail, cancelMail } from '../lib/mail-outbox.mjs';

const hash = 'a'.repeat(64);
const input = () => ({ key: 'reply-1', sourceRef: 'source-1', contentHash: hash });
function setup() {
  const store = operationsDb();
  store.sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql', import.meta.url), 'utf8'));
  return store.db;
}

test('duplicate preparation preserves approved response and conflicting content is rejected', async () => {
  const db = setup();
  await prepareMail(db, input(), 100);
  assert.equal(await approveMail(db, 'reply-1', hash, 'decision-1', 101), true);
  assert.equal((await prepareMail(db, input(), 102)).state, 'approved');
  await assert.rejects(prepareMail(db, { ...input(), contentHash: 'b'.repeat(64) }, 103), /collision/);
  await assert.rejects(prepareMail(db, { ...input(), sourceRef: 'source-2' }, 103), /collision/);
});
test('exact content approval is required and concurrent consumers obtain only one attempt', async () => {
  const db = setup(); await prepareMail(db, input(), 100);
  assert.equal(await claimMail(db, 'reply-1', 101), null);
  assert.equal(await approveMail(db, 'reply-1', 'b'.repeat(64), 'decision-1', 101), false);
  await approveMail(db, 'reply-1', hash, 'decision-1', 102);
  const claims = await Promise.all([claimMail(db, 'reply-1', 103), claimMail(db, 'reply-1', 103)]);
  assert.equal(claims.filter(Boolean).length, 1);
  assert.equal(await claimMail(db, 'reply-1', 100000000), null);
});
test('uncertain attempt is terminal and a stale worker cannot overwrite its result', async () => {
  const db = setup(); await prepareMail(db, input(), 100);
  await approveMail(db, 'reply-1', hash, 'decision-1', 101);
  const claim = await claimMail(db, 'reply-1', 102);
  assert.equal(await finishMail(db, 'reply-1', 'wrong-attempt', 'accepted', 'provider-1', 103), false);
  assert.equal(await finishMail(db, 'reply-1', claim.attempt_id, 'uncertain', null, 104), true);
  assert.equal(await claimMail(db, 'reply-1', 105), null);
  assert.equal(await finishMail(db, 'reply-1', claim.attempt_id, 'accepted', 'provider-1', 106), false);
});
test('provider acceptance retains receipt without claiming delivery', async () => {
  const db = setup(); await prepareMail(db, input(), 100);
  await approveMail(db, 'reply-1', hash, 'decision-1', 101);
  const claim = await claimMail(db, 'reply-1', 102);
  await assert.rejects(finishMail(db, 'reply-1', claim.attempt_id, 'accepted', null, 103), /invalid/);
  assert.equal(await finishMail(db, 'reply-1', claim.attempt_id, 'accepted', 'provider-1', 104), true);
  const row = await prepareMail(db, input(), 105);
  assert.equal(row.state, 'accepted'); assert.equal(row.provider_ref, 'provider-1');
  assert.equal(Object.hasOwn(row, 'delivered'), false);
});
test('cancellation blocks approved sends but cannot pretend to withdraw an attempted send', async () => {
  const db = setup(); await prepareMail(db, input(), 100);
  await approveMail(db, 'reply-1', hash, 'decision-1', 101);
  assert.equal(await cancelMail(db, 'reply-1', 102), true);
  assert.equal(await claimMail(db, 'reply-1', 103), null);
  assert.equal(await approveMail(db, 'reply-1', hash, 'decision-2', 104), false);
  await prepareMail(db, { ...input(), key: 'reply-2' }, 105);
  await approveMail(db, 'reply-2', hash, 'decision-2', 106);
  await claimMail(db, 'reply-2', 107);
  assert.equal(await cancelMail(db, 'reply-2', 108), false);
});
test('ledger refuses body, recipient, malformed reference and invalid clocks', async () => {
  const db = setup();
  for (const value of [{ ...input(), body: 'private' }, { ...input(), to: 'a@example.com' }, { ...input(), sourceRef: 'a@example.com' }, { ...input(), contentHash: 'wrong' }]) {
    await assert.rejects(prepareMail(db, value, 100), /invalid/);
  }
  await assert.rejects(prepareMail(db, input(), NaN), /invalid/);
});
test('older approval and completion cannot regress the persisted chronology', async () => {
  const db = setup(); await prepareMail(db, input(), 100);
  assert.equal(await approveMail(db, 'reply-1', hash, 'decision-1', 99), false);
  await approveMail(db, 'reply-1', hash, 'decision-1', 101);
  assert.equal(await claimMail(db, 'reply-1', 100), null);
  const claim = await claimMail(db, 'reply-1', 102);
  assert.equal(await finishMail(db, 'reply-1', claim.attempt_id, 'accepted', 'provider-1', 101), false);
});
