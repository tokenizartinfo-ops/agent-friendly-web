import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,basename} from 'node:path';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native workerd D1/DO permission reduction enables only historical retirement observation',async()=>{
 const statements=file=>[...readFileSync(file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]);
 const schemas=[...statements('db/dossier-monitoring-consent.sql'),...statements('db/dossier-node-process.sql')];
 const startAt=Date.now()-1000,expiresAt=startAt+180000;
 const contents=`
import {createNodeProcessCustody} from './lib/mcp-node-process-custody.mjs';
import {createOwnPermissionWithdrawal} from './lib/mcp-own-permission-withdrawal.mjs';
const context={grantId:'g',subject:'owner',clientId:'client',resource:'https://private.invalid/mcp',scopes:['afw:project:read']};
export class Own {
 constructor(ctx,env){this.ctx=ctx;this.env=env;}
 async fetch(request){
 const db=this.env.DB,path=new URL(request.url).pathname;
 const runtime={launch:async boot=>{const {key,...manifest}=boot;if(key.length!==32)throw Error('key unavailable');await db.prepare('UPDATE fixture_process SET launches=launches+1,running=1,manifest=?').bind(JSON.stringify(manifest)).run();},observe:async()=>{const p=await db.prepare('SELECT * FROM fixture_process').first();return{...JSON.parse(p.manifest),running:p.running===1};},close:async()=>{await db.prepare('UPDATE fixture_process SET running=0').run();}};
 const a=createNodeProcessCustody({enabled:true,db,context,projectId:'p',projectionSecret:'z'.repeat(32),storage:this.ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:this.ctx.id.toString(),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),image:'cloudflare/debian-trixie',window:{startAt:${startAt},expiresAt:${expiresAt}},runtime,now:Date.now});
 try{
 if(path==='/start')return Response.json(await a.start());
 if(path==='/retired')return Response.json(await a.observeRetired());
 if(path==='/withdraw'){
 const c=await db.prepare("SELECT * FROM dossier_monitoring_consent_events WHERE grant_id='g' AND action='grant'").first();
 const x=createOwnPermissionWithdrawal({enabled:true,db,context:{grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:context.resource},originalConsent:{sequence:c.sequence,revision:c.revision,issuedAt:c.issued_at,expiresAt:c.expires_at},window:{startAt:${startAt},expiresAt:${expiresAt}},requestId:'22222222-2222-4222-8222-222222222222',close:()=>a.close(),now:Date.now});
 return Response.json(await x.withdraw());
 }
 const p=await db.prepare('SELECT launches,running FROM fixture_process').first();
 const g=await db.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='g'").first();
 const c=await db.prepare("SELECT COUNT(*) AS total FROM dossier_monitoring_consent_events WHERE grant_id='g'").first();
 return Response.json({...p,...g,...c});
 }catch{return Response.json({code:'unavailable'},{status:409});}
 }}
export default{async fetch(request,env){
 if(new URL(request.url).pathname==='/seed'){
 await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE fixture_process(launches INTEGER,running INTEGER,manifest TEXT);');
 for(const sql of ${JSON.stringify(schemas)})await env.DB.prepare(sql).run();
 await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind('p','owner',1).run();
 await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(${expiresAt}).toISOString(),'').run();
 await env.DB.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('g','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',${startAt},${expiresAt}).run();
 await env.DB.prepare('INSERT INTO fixture_process VALUES(0,0,?)').bind('{}').run();return Response.json({});
 }
 return env.QA.get(env.QA.idFromName('fixed-original')).fetch(request);
}};
`;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
 const persist=mkdtempSync(join(tmpdir(),'afw-withdrawal-native-'));
 const options=convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'private-withdrawal-native'},durableObjects:{QA:{className:'Own',useSQLite:true}},resourcePersistencePath:persist});let mf=new Miniflare(options);
 const call=async(path,status=200)=>{const r=await mf.dispatchFetch('https://synthetic.invalid'+path,{method:'POST'});assert.equal(r.status,status);return r.json();};
 try{
 await call('/seed');const ready=await call('/start');assert.equal(ready.ready,true);await call('/retired',409);
 const r=await call('/withdraw');assert.equal(r.permissionsWithdrawn,true);assert.equal(r.runtimeStopRequested,true);assert.equal(r.physicalStopVerified,false);assert.equal(r.nativeWithdrawalVerified,false);
 const retired=await call('/retired');assert.equal(retired.processGeneration,ready.processGeneration);assert.equal(retired.mayStartSuccessor,false);assert.equal(retired.physicalStopVerified,false);
 await call('/start',409);const first=await call('/state');assert.equal(first.launches,1);assert.equal(first.running,0);assert.equal(first.total,2);assert.ok(first.revoked_at);
 await mf.dispose();mf=new Miniflare(options);assert.deepEqual(await call('/state'),first);
 await call('/start',409);assert.equal((await call('/retired')).processGeneration,ready.processGeneration);
 await call('/withdraw');assert.deepEqual(await call('/state'),first);
 }finally{await mf.dispose();const target=realpathSync(persist);assert.equal(dirname(target),realpathSync(tmpdir()));assert.ok(basename(target).startsWith('afw-withdrawal-native-'));rmSync(target,{recursive:true});}
});
