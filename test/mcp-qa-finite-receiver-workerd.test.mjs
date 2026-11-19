import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('QA reads the exact finite receipt over the named native receiver binding',async()=>{
 const startAt=Date.now()-2000,receivedAt=startAt+100,reviewedAt=startAt+200;
 const policy={purpose:'afw.finite-dossier-review-policy.v1',projectRef:'1'.repeat(64),eventId:'2'.repeat(64),
  controlHash:'3'.repeat(64),actorHash:'4'.repeat(64),executionHash:'5'.repeat(64),revision:2,startAt,
  reviewBefore:startAt+90000,readBefore:startAt+120000};
 const runId='0d0d0d0d-8888-4777-8999-cacacacacaca',resultHash='6'.repeat(64);
 const buildOptions={bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*']};
 const [qa,receiver]=await Promise.all([
  build({...buildOptions,stdin:{resolveDir:process.cwd(),contents:`
   import {observePrivateQaFiniteDossierReview} from './lib/mcp-qa-finite-dossier-review.mjs';
   export default {async fetch(request,env){
    const matched=new URL(request.url).pathname==='/match';
    const eventId=matched?${JSON.stringify(policy.eventId)}:'e'.repeat(64);
    const control={controlHash:${JSON.stringify(policy.controlHash)},plan:{T0:${startAt},C0:${policy.reviewBefore},selectors:{expectedProjectRevision:1}}};
    const completion={notice:{eventId,withdrawn:true,httpReceipt:{httpReceivedAt:${receivedAt}}}};
    return Response.json({receipt:await observePrivateQaFiniteDossierReview({env,control,completion,check:Date.now})});
   }};`}}),
  build({...buildOptions,mainFields:['module','main'],entryPoints:['worker/operations-manager/index.mjs']}),
 ]);
 const opts={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']};
 const runtime=new Miniflare(convertV4MiniflareOptions({workers:[
  {...opts,name:'qa',script:qa.outputFiles[0].text,serviceBindings:{AFW_FINITE_DOSSIER_REVIEW_RECEIVER:{name:'receiver',entrypoint:'FiniteDossierReviews'}}},
  {...opts,name:'receiver',script:receiver.outputFiles[0].text,d1Databases:{OPERATIONS_DB:'finite-review-ledger'},
   bindings:{AFW_DOSSIER_FINITE_REVIEW_ENABLED:'true',AFW_DOSSIER_FINITE_REVIEW_POLICY:JSON.stringify(policy)}},
 ]}));
 try{
  const db=await runtime.getD1Database('OPERATIONS_DB','receiver');
  const schema=readFileSync('worker/operations/dossier-supervision.sql','utf8').replace(/--[^\n]*/g,'');
  for(const sql of schema.split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const receiptSchema=readFileSync('worker/operations/dossier-supervision-finite-reviews.sql','utf8').replace(/--[^\n]*/g,'').split('CREATE TRIGGER')[0].trim();
  await db.prepare(receiptSchema.slice(0,-1)).run();
  await db.prepare('INSERT INTO dossier_supervision_events VALUES(?,?,?,?,?,?)')
   .bind(policy.eventId,policy.projectRef,policy.revision,'project_updated',new Date(receivedAt).toISOString(),receivedAt).run();
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
