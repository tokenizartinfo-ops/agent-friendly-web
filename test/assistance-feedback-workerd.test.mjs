import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
test('native D1 feedback recovers a lost response, remains owner scoped and withdraws service reads',async()=>{
 const time=Date.now(),deliverySecret='synthetic-native-delivery-secret-minimum-32',runId=crypto.randomUUID();
 const {eventId,projectRef}=await projectAssistanceSignal({id:'help-'+'c'.repeat(64),projectId:'p',type:'assistance_requested',createdAt:new Date(time-1000).toISOString(),payload:{contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'}},deliverySecret);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createAssistanceFeedbackIngress,createAssistanceFeedbackProducer,signedAssistanceReviewRequest} from './lib/assistance-feedback.mjs';
 import {readAssistanceRequest} from './lib/dossier-assistance.mjs';
 const time=${time},eventId='${eventId}',projectRef='${projectRef}',secret='synthetic-native-feedback-secret-minimum-32';let lost=true,closed=false;
 export default {async fetch(request,b){
  const path=new URL(request.url).pathname;
  const env={AFW_ASSISTANCE_FEEDBACK_ENABLED:closed?'false':'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+60000).toISOString(),AFW_ASSISTANCE_SIGNING_SECRET:'${deliverySecret}',AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET:secret,AFW_ASSISTANCE_PROJECT_REFS:JSON.stringify([projectRef]),AFW_ASSISTANCE_ENROLLMENTS:JSON.stringify([{projectId:'p',ownerId:'alice',since:new Date(time-2000).toISOString()}]),OPERATIONS_DB:b.DB,ASSISTANCE_SOURCE_DB:b.SOURCE};
  const ingress=createAssistanceFeedbackIngress({now:()=>time});
  env.ASSISTANCE_RECEIVER={fetch:async r=>{const response=await ingress.fetch(r,env);if(lost){lost=false;throw Error('lost response');}return response;}};
  if(path==='/produce')return Response.json(await createAssistanceFeedbackProducer({now:()=>time}).run(env));
  if(path==='/read'||path==='/foreign')return Response.json(await readAssistanceRequest(b.SOURCE,path==='/foreign'?'bob':'alice','p',{feedbackEnabled:!closed}));
  if(path==='/close'){closed=true;return Response.json({closed});}
  if(path==='/service')return ingress.fetch(await signedAssistanceReviewRequest({eventId,projectRef},secret,time),env);
  return new Response(null,{status:404});
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'feedback-operational-native',SOURCE:'feedback-private-native'}}));
 try{
  const db=await runtime.getD1Database('DB'),source=await runtime.getD1Database('SOURCE');
  for(const [target,file] of [[db,'assistance-supervision'],[db,'assistance-supervision-runs'],[source,'assistance-delivery-receipts'],[source,'assistance-feedback-receipts']])for(const sql of readFileSync('worker/operations/'+file+'.sql','utf8').replace(/--[^\n]*/g,'').split(';').map(x=>x.trim()).filter(Boolean))await target.prepare(sql).run();
  await source.prepare('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,notes TEXT)').run();
  await source.prepare('CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT)').run();
  await source.prepare('INSERT INTO site_projects VALUES(?,?,?,?)').bind('p','alice',3,'PRIVATE ANSWER').run();
  const sourceId='help-'+'c'.repeat(64),observed=new Date(time-1000).toISOString();
  await source.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').bind(sourceId,'p','alice','assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'}),observed).run();
  await source.prepare('INSERT INTO assistance_delivery_receipts VALUES(?,?,?,?)').bind(projectRef,sourceId,eventId,time-500).run();
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(eventId,projectRef,3,'assistance_requested','orientation',observed,time-500).run();
  await db.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').bind(runId,crypto.randomUUID(),eventId,time-100,time+60000,'reviewed',time).run();
  const call=async path=>(await runtime.dispatchFetch('https://feedback-native.invalid'+path)).json();
  assert.equal((await call('/produce')).failed,1);assert.equal((await call('/produce')).confirmed,1);assert.equal((await call('/produce')).confirmed,0);
  const read=await call('/read');assert.deepEqual(read.receipt.review,{outcome:'reviewed',reviewedAt:time});assert.doesNotMatch(JSON.stringify(read),/PRIVATE ANSWER|alice|runId|projectRef/);
  assert.equal((await call('/foreign')).status,404);
  await source.prepare('UPDATE site_projects SET revision=4').run();assert.equal((await call('/read')).receipt.stale,true);
  await call('/close');assert.equal((await runtime.dispatchFetch('https://feedback-native.invalid/service')).status,404);
  assert.equal((await call('/produce')).paused,true);assert.equal((await call('/read')).receipt.review,undefined);
  assert.equal((await source.prepare('SELECT count(*) n FROM assistance_feedback_receipts').first()).n,1);
  assert.equal((await source.prepare('SELECT notes FROM site_projects').first()).notes,'PRIVATE ANSWER');
 }finally{await runtime.dispose();}
});
