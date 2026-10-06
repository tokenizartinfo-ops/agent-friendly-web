import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationsClient} from '../lib/operations-client.mjs';
const signal={version:'afw-dossier-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:2,kind:'project_updated',observedAt:'2026-10-06T15:00:00.000Z'};
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};
test('cloud client lists strict metadata and claims an exact event without client content',async()=>{
 const requests=[];const runId=crypto.randomUUID(),requestId=crypto.randomUUID();
 const client=createOperationsClient({env,fetchImpl:async r=>{requests.push({url:r.url,body:r.method==='POST'?await r.json():undefined});return Response.json(r.url.endsWith('/claim')?{reservation:{eventId:signal.eventId,requestId,runId,expiresAt:Date.now()+60000}}:r.url.endsWith('/finish')?{outcome:'reviewed'}:{signals:[signal]});}});
 assert.equal(typeof client.listDossiers,'function');assert.deepEqual(await client.listDossiers(),[signal]);
 const run=await client.claimDossier(signal.eventId,requestId);assert.equal(run.runId,runId);assert.equal(await client.finishDossier(runId,'reviewed'),'reviewed');
 assert.deepEqual(requests.map(x=>new URL(x.url).pathname),['/dossiers','/dossiers/claim','/dossiers/finish']);
 assert.deepEqual(requests[1].body,{eventId:signal.eventId,requestId});
});
test('cloud client rejects unknown content, duplicate project signals and arbitrary completion',async()=>{
 for(const signals of [[{...signal,notes:'private'}],[signal,signal],[{...signal,revision:0}]]){
  const client=createOperationsClient({env,fetchImpl:async()=>Response.json({signals})});assert.equal(typeof client.listDossiers,'function');await assert.rejects(client.listDossiers());
 }
 const client=createOperationsClient({env,fetchImpl:async()=>{throw Error('must not send');}});assert.equal(typeof client.finishDossier,'function');await assert.rejects(client.finishDossier(crypto.randomUUID(),'resolved'));
});
