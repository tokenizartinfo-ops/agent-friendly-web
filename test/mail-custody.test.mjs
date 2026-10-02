import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { storeMailContent, loadMailContent, storeMailDecision, authorizeMailDecision, revokeMailDecision, storeMailReceipt } from '../lib/mail-custody.mjs';
const message = { to: 'owner@example.com', subject: 'Test', text: 'Synthetic' };
function setup() { const { db, sqlite } = operationsDb(); sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql', import.meta.url),'utf8')); return db; }
test('custodied content is immutable and reloads the exact approved message', async () => {
  const db = setup(); const hash = await storeMailContent(db,'reply-1',message);
  assert.deepEqual(await loadMailContent(db,'reply-1'),message);
  assert.equal(await storeMailContent(db,'reply-1',message),hash);
  await assert.rejects(storeMailContent(db,'reply-1',{...message,text:'changed'}),/collision/);
});
test('provider receipt is idempotent per attempt and conflicting receipts are rejected',async()=>{
  const db=setup(); const receipt={key:'reply-1',attemptId:'attempt-1',messageId:'<synthetic@example.com>'};
  const ref=await storeMailReceipt(db,receipt);
  assert.match(ref,/^[A-Za-z0-9_-]{1,128}$/);
  assert.equal(await storeMailReceipt(db,receipt),ref);
  await assert.rejects(storeMailReceipt(db,{...receipt,messageId:'<other@example.com>'}),/collision/);
});
test('decision must match response, hash, recipient, expiry and revocation', async () => {
  const db = setup(); const hash = await storeMailContent(db,'reply-1',message);
  await storeMailDecision(db,{decisionRef:'decision-1',key:'reply-1',contentHash:hash,actorRef:'actor-1',expiresAt:200},100);
  const context = {key:'reply-1',decisionRef:'decision-1',contentHash:hash,recipient:message.to};
  assert.equal(await authorizeMailDecision(db,context,101),true);
  assert.equal(await authorizeMailDecision(db,{...context,recipient:'other@example.com'},101),false);
  assert.equal(await authorizeMailDecision(db,context,200),false);
  await revokeMailDecision(db,'decision-1',102);
  assert.equal(await authorizeMailDecision(db,context,103),false);
  await assert.rejects(storeMailDecision(db,{decisionRef:'decision-1',key:'reply-1',contentHash:hash,actorRef:'actor-1',expiresAt:300},103),/collision/);
});
