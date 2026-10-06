import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
test('real workerd and isolated D1 deliver, recover receipt and fence a newer revision',async()=>{
 const base=Date.now();
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createDossierIngress,createDossierProducer} from './lib/dossier-supervision-bridge.mjs';
 import {projectDossierEvent,listDossierSignals,claimDossierSignal,finishDossierSignal} from './lib/dossier-supervision.mjs';
 const secret='synthetic-workerd-dossier-secret-minimum-32',time=${base};let lose=true;
 export default {async fetch(request,b){
 const path=new URL(request.url).pathname;
 const signal=await projectDossierEvent({id:'save-1',projectId:'qa-project',type:'project_updated',revision:2,createdAt:new Date(time).toISOString()},secret);
 const env={AFW_DOSSIER_SUPERVISION_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+60000).toISOString(),AFW_DOSSIER_SIGNING_SECRET:secret,AFW_DOSSIER_PROJECT_REFS:JSON.stringify([signal.projectRef]),AFW_DOSSIER_ENROLLMENTS:JSON.stringify([{projectId:'qa-project',ownerId:'qa-owner',since:new Date(time-1).toISOString()}]),OPERATIONS_DB:b.DB,DOSSIER_SOURCE_DB:b.SOURCE,DOSSIER_BRIDGE_STATE_DB:b.STATE};
 env.DOSSIER_RECEIVER={fetch:async r=>{const response=await createDossierIngress({now:()=>time}).fetch(r,env);if(lose){lose=false;throw Error('synthetic lost receipt');}return response;}};
 if(path==='/produce')return Response.json(await createDossierProducer({now:()=>time}).run(env));
 if(path==='/list')return Response.json(await listDossierSignals(b.DB));
 if(path==='/claim'){const body=await request.json();return Response.json(await claimDossierSignal(b.DB,body.eventId,body.requestId,time));}
 if(path==='/finish'){const body=await request.json();return Response.json(await finishDossierSignal(b.DB,body.runId,'reviewed',time+1));}
 return new Response(null,{status:404});
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'dossier-ledger-contract',SOURCE:'dossier-source-contract',STATE:'dossier-cursor-contract'}}));
 try{
  const db=await runtime.getD1Database('DB'),source=await runtime.getD1Database('SOURCE'),state=await runtime.getD1Database('STATE');
  for(const [target,file] of [[db,'dossier-supervision'],[state,'dossier-supervision-cursors']])for(const sql of readFileSync('worker/operations/'+file+'.sql','utf8').replace(/--[^\n]*/g,'').split(';').map(x=>x.trim()).filter(Boolean))await target.prepare(sql).run();
  await source.prepare('CREATE TABLE site_projects(id TEXT,user_id TEXT)').run();await source.prepare('CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT)').run();
  await source.prepare('INSERT INTO site_projects VALUES(?,?)').bind('qa-project','qa-owner').run();
  const insert=async(id,revision)=>source.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').bind(id,'qa-project','qa-owner','project_updated',JSON.stringify({revision,notes:'PRIVATE ANSWER'}),new Date(base).toISOString()).run();
  await insert('save-1',2);
  const call=async(path,body)=>{const r=await runtime.dispatchFetch('https://dossier-contract.invalid'+path,body?{method:'POST',body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
  assert.equal((await call('/produce')).delivered,0);assert.equal((await call('/list')).length,1);
  assert.equal((await state.prepare('SELECT COUNT(*) n FROM dossier_supervision_cursors').first()).n,0);
  assert.equal((await call('/produce')).delivered,1);assert.equal((await call('/produce')).delivered,0);
  const [signal]=await call('/list');assert.doesNotMatch(JSON.stringify(signal),/PRIVATE|qa-owner|qa-project/);
  const run=await call('/claim',{eventId:signal.eventId,requestId:crypto.randomUUID()});assert.ok(run.runId);
  await insert('save-2',3);assert.equal((await call('/produce')).delivered,1);
  assert.equal(await call('/finish',{runId:run.runId}),'superseded');assert.equal((await call('/list'))[0].revision,3);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_supervision_events').first()).n,2);
 }finally{await runtime.dispose();}
});
