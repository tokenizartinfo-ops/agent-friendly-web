import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationsClient} from '../lib/operations-client.mjs';
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};
const notice={resource:'afw_delegated_canary',revision:1,kind:'attention',condition:'["delivery_pending"]',observedAt:Date.now()};
const requestId=crypto.randomUUID(),reservation={resource:notice.resource,revision:1,requestId,runId:crypto.randomUUID(),expiresAt:notice.observedAt+300000};
test('receipt transport validates nested notice/reservation and rejects forged correlation',async()=>{
 const receipt={notice,reservation,outcome:null};
 assert.deepEqual(await createOperationsClient({env,fetchImpl:async()=>Response.json({receipts:[receipt]})}).listNoticeReceipts(),[receipt]);
 for(const value of [{...receipt,outcome:'repaired'},{...receipt,reservation:{...reservation,revision:2}},{...receipt,reservation:{...reservation,runId:[reservation.runId]}},{...receipt,private:'data'}])await assert.rejects(createOperationsClient({env,fetchImpl:async()=>Response.json({receipts:[value]})}).listNoticeReceipts(),{message:'Operational request unavailable'});
});
test('notice transport pins origin and preserves explicit correlation across retries',async()=>{
 const paths=[],client=createOperationsClient({env,fetchImpl:async request=>{
  assert.equal(new URL(request.url).origin,'https://operations-manager.agentfriendlyweb.dev');assert.equal(request.redirect,'manual');
  paths.push(new URL(request.url).pathname);
  if(request.method==='GET')return Response.json({notices:[notice]});
  const body=await request.json();
  if(paths.at(-1)==='/notices/claim'){assert.deepEqual(body,{resource:notice.resource,revision:1,requestId});return Response.json({reservation});}
  assert.deepEqual(body,{runId:reservation.runId});return Response.json({outcome:'accepted'});
 }});
 assert.deepEqual(await client.listNotices(),[notice]);
 assert.deepEqual(await client.claimNotice(notice.resource,1,requestId),reservation);
 assert.deepEqual(await client.claimNotice(notice.resource,1,requestId),reservation);
 assert.equal(await client.ackNotice(reservation.runId),'accepted');
 assert.deepEqual(paths,['/notices','/notices/claim','/notices/claim','/notices/ack']);
});
test('notice transport rejects extra data, foreign resources and mismatched correlation',async()=>{
 for(const value of [{...notice,resource:'atelier'},{...notice,condition:'["private-detail"]'},{...notice,secret:'hidden'},{...notice,revision:[1]}]){
  await assert.rejects(createOperationsClient({env,fetchImpl:async()=>Response.json({notices:[value]})}).listNotices());
 }
 for(const value of [{...reservation,requestId:crypto.randomUUID()},{...reservation,revision:2},{...reservation,expiresAt:'bad'}]){
  await assert.rejects(createOperationsClient({env,fetchImpl:async()=>Response.json({reservation:value})}).claimNotice(notice.resource,1,requestId));
 }
 let calls=0;const client=createOperationsClient({env,fetchImpl:async()=>{calls++;throw Error('private');}});
 let malformedCalls=0;
 await assert.rejects(createOperationsClient({env,fetchImpl:async()=>{malformedCalls++;return Response.json(null);}}).claimNotice(notice.resource,1,requestId),{message:'Operational request unavailable'});assert.equal(malformedCalls,1);
 await assert.rejects(client.claimNotice('atelier',1,requestId));await assert.rejects(client.ackNotice([reservation.runId]));assert.equal(calls,0);
 await assert.rejects(client.listNotices(),{message:'Operational request unavailable'});assert.equal(calls,1);
});
test('notice CLI validates commands before attempting the operational transport',async()=>{
 const {runOperationsClient}=await import('../scripts/afw-operations-client.mjs');
 for(const args of [['notice-list'],['notice-claim',notice.resource,'1',requestId],['notice-ack',reservation.runId]])await assert.rejects(runOperationsClient(args,{}),{message:'Operational request unavailable'});
 for(const args of [['notice-claim','atelier','1',requestId],['notice-claim',notice.resource,'1x',requestId],['notice-ack','bad']])await assert.rejects(runOperationsClient(args,env),{message:'Invalid operational command'});
});
test('a fresh client can reconcile dropped claim and ACK responses with the original identifiers',async()=>{
 let claims=0,acks=0;const seen=[];
 const fetchImpl=async request=>{
  const body=await request.json();seen.push(body);
  if(new URL(request.url).pathname==='/notices/claim'){
   if(++claims===1)throw Error('response lost after synthetic reservation');
   return Response.json({reservation});
  }
  if(++acks===1)throw Error('response lost after synthetic receipt');
  return Response.json({outcome:'accepted'});
 };
 await assert.rejects(createOperationsClient({env,fetchImpl}).claimNotice(notice.resource,1,requestId));assert.equal(claims,1);
 const resumed=await createOperationsClient({env,fetchImpl}).claimNotice(notice.resource,1,requestId);assert.equal(resumed.runId,reservation.runId);
 await assert.rejects(createOperationsClient({env,fetchImpl}).ackNotice(resumed.runId));assert.equal(acks,1);
 assert.equal(await createOperationsClient({env,fetchImpl}).ackNotice(resumed.runId),'accepted');
 assert.deepEqual(seen[0],seen[1]);assert.deepEqual(seen[2],seen[3]);
});
