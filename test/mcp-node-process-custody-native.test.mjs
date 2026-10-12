import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,basename} from 'node:path';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native primary D1 admission survives DO loss and restart without granting another Node start',async()=>{
 const statements=file=>[...readFileSync(file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]);
 const monitor=statements('db/dossier-monitoring-consent.sql'),processSchema=statements('db/dossier-node-process.sql');assert.equal(monitor.length,4);assert.equal(processSchema.length,7);
 const startAt=Date.now()-1000,expiresAt=startAt+180000,contents=`
import {createNodeProcessCustody} from './lib/mcp-node-process-custody.mjs';
const context={grantId:'g',subject:'owner',clientId:'client',resource:'https://private.invalid/mcp',scopes:['afw:project:read']};
export class Own {
 constructor(ctx,env){this.ctx=ctx;this.env=env;}
 async fetch(request){
 const path=new URL(request.url).pathname;
 const runtime={launch:async boot=>{const {key,...manifest}=boot;if(key.length!==32)throw Error('key unavailable');await this.env.DB.prepare('UPDATE fixture_process SET launches=launches+1,running=1,manifest=?').bind(JSON.stringify(manifest)).run();},observe:async()=>{const p=await this.env.DB.prepare('SELECT * FROM fixture_process').first();return{...JSON.parse(p.manifest),running:p.running===1};},close:async()=>{await this.env.DB.prepare('UPDATE fixture_process SET running=0').run();}};
 const a=createNodeProcessCustody({enabled:true,db:this.env.DB,context,projectId:'p',projectionSecret:'z'.repeat(32),storage:this.ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:this.ctx.id.toString(),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),image:'cloudflare/debian-trixie',window:{startAt:${startAt},expiresAt:${expiresAt}},runtime,now:Date.now});
 try{
 if(path==='/start')return Response.json(await a.start());
 if(path==='/ready')return Response.json(await a.readReadiness());
 if(path==='/bridge'){const b=await a.createBridge();return Response.json({bridge:typeof b.verify==='function'});}
 if(path==='/close')return Response.json(await a.close());
 if(path==='/erase'){await this.ctx.storage.deleteAll();return Response.json({});}
 return Response.json(await this.env.DB.prepare('SELECT launches,running FROM fixture_process').first());
 }catch{return Response.json({code:'unavailable'},{status:409});}
 }
}
export default{async fetch(request,env){
 if(new URL(request.url).pathname==='/seed'){
 await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE fixture_process(launches INTEGER,running INTEGER,manifest TEXT);');
 for(const sql of ${JSON.stringify([...monitor,...processSchema])})await env.DB.prepare(sql).run();
 await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind('p','owner',1).run();
 await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(Date.now()+600000).toISOString(),'').run();
 await env.DB.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('g','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',${startAt},${expiresAt}).run();
 await env.DB.prepare('INSERT INTO fixture_process VALUES(0,0,?)').bind('{}').run();return Response.json({});
 }
 return env.QA.get(env.QA.idFromName('same-original')).fetch(request);
}};
`;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']}),persist=mkdtempSync(join(tmpdir(),'afw-node-custody-'));
 const options=convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'native-node-own'},durableObjects:{QA:{className:'Own',useSQLite:true}},resourcePersistencePath:persist});let runtime=new Miniflare(options);
 const call=async(path,status=200)=>{const r=await runtime.dispatchFetch('https://synthetic.invalid'+path,{method:'POST'});assert.equal(r.status,status);return r.json();};
 try{await call('/seed');const first=await call('/start');assert.equal(first.ready,true);assert.equal((await call('/state')).launches,1);await runtime.dispose();runtime=new Miniflare(options);assert.deepEqual(await call('/start'),first);assert.equal((await call('/state')).launches,1);assert.equal((await call('/bridge')).bridge,true);await call('/erase');await call('/start',409);assert.equal((await call('/state')).launches,1);await call('/close');await runtime.dispose();runtime=new Miniflare(options);await call('/start',409);assert.equal((await call('/state')).launches,1);assert.equal((await call('/state')).running,0);}
 finally{await runtime.dispose();const target=realpathSync(persist);assert.equal(dirname(target),realpathSync(tmpdir()));assert.ok(basename(target).startsWith('afw-node-custody-'));rmSync(target,{recursive:true});}
});
