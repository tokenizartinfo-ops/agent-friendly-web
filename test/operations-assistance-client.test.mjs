import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationsClient} from '../lib/operations-client.mjs';
import {runOperationsClient} from '../scripts/afw-operations-client.mjs';
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};
const eventId='a'.repeat(64), requestId=crypto.randomUUID(), runId=crypto.randomUUID();
const signal={version:'afw-assistance-event-v1',eventId,projectRef:'b'.repeat(64),revision:3,kind:'assistance_requested',topic:'orientation',observedAt:'2026-10-06T17:25:20.817Z'};
test('cloud command delegates assistance operations to the canonical client',async()=>{
 const reservation={eventId,requestId,runId,expiresAt:Date.now()+60000};
 const transport={fetchImpl:async request=>Response.json(request.url.endsWith('/claim')?{reservation}:request.url.endsWith('/finish')?{outcome:'intervention_required'}:{signals:[signal]})};
 assert.deepEqual(await runOperationsClient(['assistance-list'],env,transport),{signals:[signal]});
 assert.deepEqual(await runOperationsClient(['assistance-claim',eventId,requestId],env,transport),{reservation});
 assert.deepEqual(await runOperationsClient(['assistance-finish',runId,'intervention_required'],env,transport),{outcome:'intervention_required'});
 await assert.rejects(runOperationsClient(['assistance-finish',runId,'resolved'],env,transport));
});
test('assistance client follows the nested reservation contract and explicit same-request recovery',async()=>{
 const calls=[],reservation={eventId,requestId,runId,expiresAt:Date.now()+60000};
 const client=createOperationsClient({env,fetchImpl:async request=>{
  calls.push({url:request.url,body:request.method==='POST'?await request.json():null});
  return Response.json(request.url.endsWith('/claim')?{reservation}:request.url.endsWith('/finish')?{outcome:'reviewed'}:{signals:[signal]});
 }});
 assert.deepEqual(await client.listAssistance(),[signal]);
 assert.deepEqual(await client.claimAssistance(eventId,requestId),reservation);
 assert.deepEqual(await client.claimAssistance(eventId,requestId),reservation);
 assert.equal(await client.finishAssistance(runId,'reviewed'),'reviewed');
 assert.deepEqual(calls[1].body,calls[2].body);
 assert.deepEqual(calls.map(x=>new URL(x.url).pathname),['/assistance','/assistance/claim','/assistance/claim','/assistance/finish']);
});
test('assistance client rejects uncorrelated, expired or extra private metadata without retry',async()=>{
 for(const reservation of [
  {eventId:'c'.repeat(64),requestId,runId,expiresAt:Date.now()+60000},
  {eventId,requestId:crypto.randomUUID(),runId,expiresAt:Date.now()+60000},
  {eventId,requestId,runId,expiresAt:Date.now()-1},
  {eventId,requestId,runId,expiresAt:new Date(Date.now()+60000).toISOString()},
  {eventId,requestId,runId,expiresAt:Date.now()+60000,privateText:'forbidden'},
 ]){
  let calls=0; const client=createOperationsClient({env,fetchImpl:async()=>{calls++;return Response.json({reservation});}});
  await assert.rejects(client.claimAssistance(eventId,requestId),/Operational request unavailable/);assert.equal(calls,1);
 }
 for(const signals of [[{...signal,privateText:'forbidden'}],[signal,signal],Array(4).fill(signal)]){
  await assert.rejects(createOperationsClient({env,fetchImpl:async()=>Response.json({signals})}).listAssistance(),/Operational request unavailable/);
 }
 const client=createOperationsClient({env,fetchImpl:async()=>Response.json({outcome:'resolved'})});
 await assert.rejects(client.finishAssistance(runId,'reviewed'),/Operational request unavailable/);
 await assert.rejects(client.finishAssistance(runId,'resolved'),/Operational request unavailable/);
});
