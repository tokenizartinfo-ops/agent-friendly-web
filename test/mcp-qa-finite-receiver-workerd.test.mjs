import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteDossierChannelTag} from '../lib/mcp-qa-finite-dossier-channel.mjs';
import {signDossierMcpEvent,signMcpVerification} from '../lib/mcp-signed-envelope.mjs';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('the mounted QA receiver ingests the signed notice and returns its exact review over the private binding',async()=>{
 const startAt=Date.now()-2000,observedAt=startAt+100;
 const callbackKey='whsec_'+Buffer.alloc(32,7).toString('base64');
 const policy={purpose:'afw.finite-dossier-review-policy.v1',projectRef:'1'.repeat(64),eventId:'2'.repeat(64),
  controlHash:'3'.repeat(64),actorHash:'4'.repeat(64),executionHash:'5'.repeat(64),revision:2,startAt,
  reviewBefore:startAt+90000,readBefore:startAt+120000};
 const runId='0d0d0d0d-8888-4777-8999-cacacacacaca',resultHash='6'.repeat(64);
 const buildOptions={bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*']};
 const [qa,receiver]=await Promise.all([
  build({...buildOptions,stdin:{resolveDir:process.cwd(),contents:`
   import {observePrivateQaFiniteDossierReview} from './lib/mcp-qa-finite-dossier-review.mjs';
   export default {async fetch(request,env){
    const path=new URL(request.url).pathname;
    if(path==='/channel'){
     const result=await env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER.verifyChannel(await request.json());
     return Response.json(result);
    }
    const matched=path==='/match';
    const eventId=matched?${JSON.stringify(policy.eventId)}:'e'.repeat(64);
    const control={controlHash:${JSON.stringify(policy.controlHash)},plan:{T0:${startAt},C0:${policy.reviewBefore},selectors:{expectedProjectRevision:1}}};
    const completion={notice:{eventId,withdrawn:true,httpReceipt:{httpReceivedAt:Date.now()}}};
    return Response.json({receipt:await observePrivateQaFiniteDossierReview({env,control,completion,check:Date.now})});
   }};`}}),
  build({...buildOptions,mainFields:['module','main'],entryPoints:['worker/operations-manager/index.mjs']}),
 ]);
 const opts={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']};
 const runtime=new Miniflare(convertV4MiniflareOptions({workers:[
  {...opts,name:'qa',script:qa.outputFiles[0].text,serviceBindings:{AFW_FINITE_DOSSIER_REVIEW_RECEIVER:{name:'receiver',entrypoint:'FiniteDossierReviews'}}},
  {...opts,name:'receiver',script:receiver.outputFiles[0].text,d1Databases:{OPERATIONS_DB:'finite-review-ledger'},
   bindings:{AFW_DOSSIER_FINITE_REVIEW_ENABLED:'true',AFW_DOSSIER_FINITE_REVIEW_ISOLATED:'true',AFW_DOSSIER_SUPERVISION_ENABLED:'true',
    AFW_DOSSIER_FINITE_CALLBACK_ENABLED:'true',AFW_DOSSIER_FINITE_CALLBACK_SECRET:callbackKey,
    AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(policy.reviewBefore).toISOString(),AFW_DOSSIER_PROJECT_REFS:JSON.stringify([policy.projectRef]),
    AFW_DOSSIER_FINITE_REVIEW_POLICY:JSON.stringify(policy)}},
 ]}));
 try{
  const db=await runtime.getD1Database('OPERATIONS_DB','receiver');
  const schema=readFileSync('worker/operations/dossier-supervision.sql','utf8').replace(/--[^\n]*/g,'');
  for(const sql of schema.split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const receiptSchema=readFileSync('worker/operations/dossier-supervision-finite-reviews.sql','utf8').replace(/--[^\n]*/g,'').split('CREATE TRIGGER')[0].trim();
  await db.prepare(receiptSchema.slice(0,-1)).run();
  const handler=await runtime.getWorker('receiver'),endpoint='https://finite-review-qa.agentfriendlyweb.dev/mcp/finite-dossier-callback';

  const nonce=Buffer.alloc(32,9).toString('base64url');
  const channel=async (key,eventId=policy.eventId,wrongTag=false)=>{
   const refs={challenge:nonce,projectRef:policy.projectRef,eventId,controlHash:policy.controlHash,revision:policy.revision};
   const tag=wrongTag?'7'.repeat(64):finiteDossierChannelTag(refs);
   const envelope=signMcpVerification(nonce,'verify_'+tag,'sub_'+tag,key,Date.now());
   const response=await runtime.dispatchFetch('https://qa-receiver.invalid/channel',{method:'POST',
    body:JSON.stringify({...refs,envelope})});
   assert.equal(response.status,200);return response.json();
  };
  assert.deepEqual(await channel(callbackKey),{verified:true,challenge:nonce});
  assert.deepEqual(await channel('whsec_'+Buffer.alloc(32,8).toString('base64')),{verified:false});
  assert.deepEqual(await channel(callbackKey,'f'.repeat(64)),{verified:false});
  assert.deepEqual(await channel(callbackKey,policy.eventId,true),{verified:false});
  const before=await db.prepare('SELECT count(*) AS n FROM dossier_supervision_events').first();
  assert.equal(before.n,0);
  const message=signDossierMcpEvent({version:'afw-dossier-event-v1',eventId:policy.eventId,projectRef:policy.projectRef,
   revision:policy.revision,kind:'project_updated',observedAt:new Date(observedAt).toISOString()},policy.projectRef,'sub_'+'8'.repeat(64),callbackKey,Date.now());
  const first=await handler.fetch(endpoint,{method:'POST',headers:message.headers,body:message.body});
  assert.equal(first.status,202);assert.deepEqual(await first.json(),{eventId:policy.eventId,duplicate:false});
  const row=await db.prepare('SELECT received_at FROM dossier_supervision_events WHERE event_id=?').bind(policy.eventId).first();
  const receivedAt=row.received_at,reviewedAt=Date.now();
  await db.prepare('INSERT INTO dossier_supervision_runs VALUES(?,?,?,?,?,?,?)')
   .bind(runId,'synthetic-receiver-request',policy.eventId,receivedAt,policy.reviewBefore,'reviewed',reviewedAt).run();
  await db.prepare('INSERT INTO dossier_supervision_finite_reviews VALUES(?,?,?,?,?,?,?,?,?)')
   .bind(policy.eventId,policy.controlHash,runId,policy.actorHash,policy.executionHash,resultHash,policy.revision,receivedAt,reviewedAt).run();
  const read=async route=>{
   const response=await runtime.dispatchFetch('https://qa-receiver.invalid/'+route);
   assert.equal(response.status,200);return (await response.json()).receipt;
  };
  assert.equal(await read('other'),null);
  assert.deepEqual(await read('match'),{purpose:'afw.finite-dossier-review.v1',eventId:policy.eventId,controlHash:policy.controlHash,
   actorHash:policy.actorHash,executionHash:policy.executionHash,resultHash,runId,revision:policy.revision,receivedAt,reviewedAt});
 }finally{await runtime.dispose();}
});
