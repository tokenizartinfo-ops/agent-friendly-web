import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
test('native workerd D1 recovers a lost help receipt and retains two same-revision events',async()=>{
 const base=Date.now();
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createAssistanceIngress,createAssistanceProducer} from './lib/assistance-supervision-delivery.mjs';
 import {projectAssistanceSignal} from './lib/assistance-supervision-contract.mjs';
 const secret='synthetic-assistance-native-secret-minimum-32',time=${base};let lose=true,closed=false;
 export default {async fetch(request,b){
 const path=new URL(request.url).pathname;
 const packet=await projectAssistanceSignal({id:'help-'+'a'.repeat(64),projectId:'qa-project',type:'assistance_requested',createdAt:new Date(time).toISOString(),payload:{contract:'afw.assistance-request.v1',requestId:'71821ff8-cf57-41b6-8a4f-58c034e36a2f',expectedRevision:3,topic:'orientation'}},secret);
 const env={AFW_ASSISTANCE_SUPERVISION_ENABLED:closed?'false':'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+60000).toISOString(),AFW_ASSISTANCE_SIGNING_SECRET:secret,AFW_ASSISTANCE_PROJECT_REFS:JSON.stringify([packet.projectRef]),AFW_ASSISTANCE_ENROLLMENTS:JSON.stringify([{projectId:'qa-project',ownerId:'qa-owner',since:new Date(time-1).toISOString()}]),OPERATIONS_DB:b.DB,ASSISTANCE_SOURCE_DB:b.SOURCE};
 env.ASSISTANCE_RECEIVER={fetch:async r=>{const response=await createAssistanceIngress({now:()=>time}).fetch(r,env);if(lose){lose=false;throw Error('lost response');}return response;}};
 if(path==='/close'){closed=true;return Response.json({closed});}
 if(path==='/produce')return Response.json(await createAssistanceProducer({now:()=>time}).run(env));
 return new Response(null,{status:404});
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'help-operational-native',SOURCE:'help-private-native'}}));
 try{
  const db=await runtime.getD1Database('DB'),source=await runtime.getD1Database('SOURCE');
  for(const [target,file] of [[db,'assistance-supervision'],[source,'assistance-delivery-receipts']])for(const sql of readFileSync('worker/operations/'+file+'.sql','utf8').replace(/--[^\n]*/g,'').split(';').map(x=>x.trim()).filter(Boolean))await target.prepare(sql).run();
  await source.prepare('CREATE TABLE site_projects(id TEXT,user_id TEXT)').run();await source.prepare('CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT)').run();
  await source.prepare('INSERT INTO site_projects VALUES(?,?)').bind('qa-project','qa-owner').run();
  const insert=async(letter,owner='qa-owner')=>source.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').bind('help-'+letter.repeat(64),'qa-project',owner,'assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId:letter==='a'?'71821ff8-cf57-41b6-8a4f-58c034e36a2f':'81821ff8-cf57-41b6-8a4f-58c034e36a2f',expectedRevision:3,topic:'orientation'}),new Date(base).toISOString()).run();
  await insert('a');await insert('b');await insert('c','foreign');
  const call=async(path)=>{const response=await runtime.dispatchFetch('https://help-native.invalid'+path);assert.equal(response.status,200);return response.json();};
  assert.equal((await call('/produce')).delivered,0);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_supervision_events').first()).n,1);
  assert.equal((await source.prepare('SELECT count(*) n FROM assistance_delivery_receipts').first()).n,0);
  assert.equal((await call('/produce')).delivered,2);
  assert.equal((await call('/produce')).delivered,0);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_supervision_events').first()).n,2);
  assert.equal((await source.prepare('SELECT count(*) n FROM assistance_delivery_receipts').first()).n,2);
  assert.doesNotMatch(JSON.stringify((await db.prepare('SELECT * FROM assistance_supervision_events').all()).results),/qa-project|qa-owner|help-|71821ff8/);
  await call('/close');await insert('d');assert.equal((await call('/produce')).paused,true);
  assert.equal((await source.prepare('SELECT count(*) n FROM project_events').first()).n,4);
 }finally{await runtime.dispose();}
});
