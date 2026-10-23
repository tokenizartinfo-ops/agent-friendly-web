import test from 'node:test';
import assert from 'node:assert/strict';
import {runOperationsClient} from '../scripts/afw-operations-client.mjs';
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};
const eventId='a'.repeat(64),projectRef='b'.repeat(64),requestId='11111111-1111-4111-8111-111111111111',runId='22222222-2222-4222-8222-222222222222';
const signal={version:'afw-dossier-event-v1',eventId,projectRef,revision:2,kind:'project_updated',observedAt:'2026-10-06T15:00:00.000Z'};
const reservation=()=>({eventId,requestId,runId,expiresAt:Date.now()+60000});
function fixture(reply){const calls=[];return{calls,fetchImpl:async r=>{calls.push({url:r.url,method:r.method,body:r.method==='POST'?await r.json():null});return reply(r,calls.length);}};}
test('dossier-list returns only strict metadata from the existing fixed GET route',async()=>{
 const f=fixture(()=>Response.json({signals:[signal]}));assert.notEqual(eventId,projectRef);
 assert.deepEqual(await runOperationsClient(['dossier-list'],env,f),{signals:[signal]});
 assert.deepEqual(f.calls,[{url:'https://operations-manager.agentfriendlyweb.dev/dossiers',method:'GET',body:null}]);
 const invalid=fixture(()=>Response.json({signals:[{...signal,notes:'synthetic forbidden content'}]}));
 await assert.rejects(runOperationsClient(['dossier-list'],env,invalid),/Operational request unavailable/);assert.equal(invalid.calls.length,1);
});
test('dossier-claim sends the event ID and explicit request UUID with exact nesting',async()=>{
 const value=reservation(),f=fixture(()=>Response.json({reservation:value}));
 assert.deepEqual(await runOperationsClient(['dossier-claim',eventId,requestId],env,f),{reservation:value});
 assert.deepEqual(f.calls,[{url:'https://operations-manager.agentfriendlyweb.dev/dossiers/claim',method:'POST',body:{eventId,requestId}}]);
});
test('dossier-finish preserves reviewed, intervention_required and superseded without resolution',async()=>{
 for(const [input,output] of [['reviewed','reviewed'],['intervention_required','intervention_required'],['reviewed','superseded']]){
  const f=fixture(()=>Response.json({outcome:output}));assert.deepEqual(await runOperationsClient(['dossier-finish',runId,input],env,f),{outcome:output});
  assert.deepEqual(f.calls,[{url:'https://operations-manager.agentfriendlyweb.dev/dossiers/finish',method:'POST',body:{runId,outcome:input}}]);
 }
});
test('malformed IDs, forbidden outcomes and wrong arities never reach HTTP',async()=>{
 const f=fixture(()=>assert.fail('invalid command must not send'));
 for(const args of [['dossier-list','extra'],['dossier-claim'],['dossier-claim',eventId],['dossier-claim',eventId,requestId,'extra'],['dossier-finish'],['dossier-finish',runId],['dossier-finish',runId,'reviewed','extra'],['dossier-claim','bad',requestId],['dossier-claim',eventId,'bad'],['dossier-finish','bad','reviewed'],['dossier-finish',runId,'resolved'],['dossier-finish',runId,'superseded']])await assert.rejects(runOperationsClient(args,env,f));
 assert.deepEqual(f.calls,[]);
});
test('lost claim ACK never retries; only an explicit same-requestId invocation recovers',async()=>{
 const value=reservation(),f=fixture((r,n)=>{if(n===1)throw Error('synthetic lost ACK');return Response.json({reservation:value});});
 await assert.rejects(runOperationsClient(['dossier-claim',eventId,requestId],env,f),/Operational request unavailable/);assert.equal(f.calls.length,1);
 assert.deepEqual(await runOperationsClient(['dossier-claim',eventId,requestId],env,f),{reservation:value});assert.equal(f.calls.length,2);
 assert.deepEqual(f.calls.map(c=>c.body),[{eventId,requestId},{eventId,requestId}]);
});
