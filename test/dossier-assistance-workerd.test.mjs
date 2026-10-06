import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native workerd/D1 assistance survives receipt loss and fences another owner',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createAssistanceHandler} from './lib/dossier-assistance.mjs';
 export default{async fetch(request,env){return createAssistanceHandler({enabled:true,allowedProjectId:'p',db:env.DB,limiter:{limit:async()=>({success:true})},getIdentity:async()=>({userId:request.headers.get('x-synthetic-user')||'alice'})})(request,'p');}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-01',script:bundle.outputFiles[0].text,d1Databases:{DB:'assistance-qa'},d1Persist:false}));
 try{
  const db=await runtime.getD1Database('DB');await db.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE project_events(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);INSERT INTO site_projects VALUES('p','alice',3);");
  const body={contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'save'};
  const post=()=>runtime.dispatchFetch('https://afw.example/api/projects/p/assistance',{method:'POST',headers:{origin:'https://afw.example','content-type':'application/json'},body:JSON.stringify(body)});
  assert.equal((await post()).status,200); // Receipt deliberately not read, simulating a lost response.
  const retry=await(await post()).json();assert.equal(retry.receipt.state,'received');
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM project_events').first()).n,1);
  assert.equal((await runtime.dispatchFetch('https://afw.example/api/projects/p/assistance',{headers:{'x-synthetic-user':'bob'}})).status,404);
  await db.prepare('UPDATE site_projects SET revision=4').run();
  assert.equal((await(await post()).json()).receipt.stale,true);
 }finally{await runtime.dispose();}
});
