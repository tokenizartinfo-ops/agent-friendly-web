import test from 'node:test';
import assert from 'node:assert/strict';
const now=Date.now(),notice={resource:'afw_delegated_canary',revision:1,kind:'attention',condition:'["delivery_pending"]',observedAt:now},reservation={resource:notice.resource,revision:1,requestId:crypto.randomUUID(),runId:crypto.randomUUID(),expiresAt:now+300000};
async function run(client){const {runNoticeCycle}=await import('../lib/operations-notice-cycle.mjs');return runNoticeCycle(client,{now:()=>now});}
test('cycle reads server receipts before claiming and recovers lost claim and ACK without another reservation',async()=>{
 let receipt=null,claims=0,acks=0,dropClaim=true,dropAck=true;
 const client={listNoticeReceipts:async()=>receipt?[structuredClone(receipt)]:[],listNotices:async()=>receipt?.outcome==='accepted'?[]:[notice],claimNotice:async(resource,revision,requestId)=>{
  claims++;receipt={notice,reservation:{...reservation,requestId},outcome:null};if(dropClaim){dropClaim=false;throw Error('lost');}return receipt.reservation;
 },ackNotice:async()=>{acks++;receipt.outcome='accepted';if(dropAck){dropAck=false;throw Error('lost');}return 'accepted';}};
 await assert.rejects(run(client));assert.equal(claims,1);assert.equal(acks,0);
 await assert.rejects(run(client));assert.equal(claims,1);assert.equal(acks,1);
 assert.deepEqual(await run(client),{status:'reconciled',runId:reservation.runId,outcome:'accepted'});assert.equal(claims,1);assert.equal(acks,1);
});
test('expired receipt requires review; fresh cycle acknowledges exactly one notice and superseded is explicit',async()=>{
 let writes=0;const expired={listNoticeReceipts:async()=>[{notice,reservation:{...reservation,expiresAt:now},outcome:null}],claimNotice:async()=>{writes++;},ackNotice:async()=>{writes++;},listNotices:async()=>{throw Error('should not list');}};
 assert.deepEqual(await run(expired),{status:'review_required',reason:'lease_expired',runId:reservation.runId});assert.equal(writes,0);
 const fresh={listNoticeReceipts:async()=>[],listNotices:async()=>[notice],claimNotice:async()=>reservation,ackNotice:async()=>{writes++;return 'superseded';}};
 assert.deepEqual(await run(fresh),{status:'review_required',reason:'superseded',runId:reservation.runId});assert.equal(writes,1);
});
test('lost superseded ACK blocks another identity on restart whether another notice exists or not',async()=>{
 for(const available of [[],[notice]]){
  let receipt=null,claims=0,reads=0;
  const client={listNoticeReceipts:async()=>receipt?[receipt]:[],listNotices:async()=>{reads++;return receipt?available:[notice];},claimNotice:async()=>{claims++;return reservation;},ackNotice:async()=>{receipt={notice,reservation,outcome:'superseded'};throw Error('response lost');}};
  await assert.rejects(run(client));assert.equal(claims,1);
  assert.deepEqual(await run(client),{status:'review_required',reason:'superseded',runId:reservation.runId});assert.equal(claims,1);assert.equal(reads,1);
 }
});
