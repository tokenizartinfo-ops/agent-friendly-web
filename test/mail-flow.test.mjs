import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { prepareMail, approveMail } from '../lib/mail-outbox.mjs';
import { consumeApprovedMail } from '../lib/mail-consumer.mjs';
import { storeMailContent, loadMailContent, storeMailDecision, authorizeMailDecision, revokeMailDecision, storeMailReceipt } from '../lib/mail-custody.mjs';

async function fixture() {
  const {db,sqlite}=operationsDb(); sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql',import.meta.url),'utf8'));
  const hash=await storeMailContent(db,'reply-1',{to:'owner@example.com',subject:'Synthetic',text:'Test'});
  await prepareMail(db,{key:'reply-1',sourceRef:'source-1',contentHash:hash},100);
  await storeMailDecision(db,{key:'reply-1',decisionRef:'decision-1',contentHash:hash,actorRef:'actor-1',expiresAt:200},100);
  await approveMail(db,'reply-1',hash,'decision-1',100);
  return db;
}
test('real custody and outbox compose into a single accepted synthetic delivery',async()=>{
  const db=await fixture(); let sends=0;
  const options={db,key:'reply-1',now:()=>101,
    loadMessage:key=>loadMailContent(db,key),authorize:context=>authorizeMailDecision(db,context,101),
    saveReceipt:receipt=>storeMailReceipt(db,receipt),email:{send:async()=>{sends++;return {messageId:'<synthetic@example.com>'};}}};
  const result=await consumeApprovedMail(options);
  assert.equal(result.state,'accepted');
  assert.equal((await db.prepare('SELECT receipt_ref FROM mail_receipts').first()).receipt_ref,result.receiptRef);
  await consumeApprovedMail(options); assert.equal(sends,1);
});
test('revocation after initial authorization is rechecked before provider invocation',async()=>{
  const db=await fixture(); let checks=0,sends=0;
  const result=await consumeApprovedMail({db,key:'reply-1',now:()=>101,
    loadMessage:key=>loadMailContent(db,key),
    authorize:async context=>{
      const allowed=await authorizeMailDecision(db,context,101);
      if (++checks===1) await revokeMailDecision(db,'decision-1',101);
      return allowed;
    },saveReceipt:receipt=>storeMailReceipt(db,receipt),
    email:{send:async()=>{sends++;return {messageId:'<synthetic@example.com>'};}}});
  assert.equal(sends,0); assert.equal(result.state,'blocked');
  assert.equal((await db.prepare('SELECT state FROM mail_outbox').first()).state,'cancelled');
});
