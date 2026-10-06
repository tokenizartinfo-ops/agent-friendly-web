import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
const assistance=await import('../lib/dossier-assistance.mjs').catch(()=>({}));
function fixture(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,notes TEXT);CREATE TABLE project_events(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);INSERT INTO site_projects VALUES('p','alice',3,'PRIVATE ANSWER');");
 const statement=(sql,args=[])=>({bind:(...a)=>statement(sql,a),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 return{sqlite,db:{prepare:s=>statement(s)}};
}
const input=(changes={})=>({contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation',...changes});
test('durable assistance is owner isolated, idempotent and never edits answers',async()=>{
 assert.equal(typeof assistance.saveAssistanceRequest,'function');
 const f=fixture(),body=input(),save=(x=body,user='alice')=>assistance.saveAssistanceRequest(f.db,user,'p',x);
 assert.equal((await save(body,'bob')).status,404);
 for(const x of [{notes:'secret'},{expectedRevision:0},{topic:'arbitrary'},{requestId:'bad'}])assert.equal((await save({...body,...x})).status,400);
 assert.equal((await save({...body,expectedRevision:2})).status,409);
 const results=await Promise.all([save(),save()]);assert.deepEqual(results.map(x=>x.status),[200,200]);
 assert.deepEqual(results[0].receipt,results[1].receipt);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM project_events').get().n,1);
 assert.equal((await save({...body,topic:'delivery'})).code,'idempotency_conflict');
 f.sqlite.prepare('UPDATE site_projects SET revision=4').run();
 assert.equal((await save()).receipt.stale,true);
 assert.equal((await save(input())).status,409);
 assert.equal((await assistance.readAssistanceRequest(f.db,'bob','p')).status,404);
 const read=await assistance.readAssistanceRequest(f.db,'alice','p');assert.equal(read.receipt.state,'received');assert.equal(read.receipt.stale,true);
 assert.doesNotMatch(JSON.stringify(read),/PRIVATE ANSWER|alice|reviewed|resolved/);
 assert.equal(f.sqlite.prepare('SELECT notes FROM site_projects').get().notes,'PRIVATE ANSWER');
});
test('HTTP assistance gates ownership, origin, body and limiter before writes',async()=>{
 assert.equal(typeof assistance.createAssistanceHandler,'function');
 const f=fixture(),config={enabled:true,allowedProjectId:'p',db:f.db,limiter:{limit:async()=>({success:true})}};
 const post=(body=input(),origin='https://afw.example')=>new Request('https://afw.example/api/projects/p/assistance',{method:'POST',headers:{'content-type':'application/json',...(origin?{origin}:{})},body:JSON.stringify(body)});
 const handler=(extra={},user='alice')=>assistance.createAssistanceHandler({...config,...extra,getIdentity:async()=>user?{userId:user}:null});
 assert.equal((await handler({enabled:false})(post(),'p')).status,404);
 assert.equal((await handler({},null)(post(),'p')).status,401);
 assert.equal((await handler({},'bob')(post(),'p')).status,404);
 assert.equal((await handler()(post(input(),'https://foreign.example'),'p')).status,403);
 assert.equal((await handler()(post(input(),null),'p')).status,403);
 assert.equal((await handler()(post({notes:'x'.repeat(600)}),'p')).status,413);
 assert.equal((await handler({limiter:{limit:async()=>({success:false})}})(post(),'p')).status,429);
 assert.equal((await handler()(post(),'p')).status,200);
 const read=await handler()(new Request('https://afw.example/api/projects/p/assistance'),'p');assert.equal(read.status,200);assert.equal(read.headers.get('cache-control'),'no-store');
});

