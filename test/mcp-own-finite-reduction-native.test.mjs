import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Actual DO storage/D1 and custody close + permissions-only primitives.
// Runtime stop callback and source/config are synthetic; no physical-stop claim.
test('native first cleanup after N1 uses original C1; unknown close ACK never resends',async()=>{
 const schemas=['dossier-monitoring-consent.sql','dossier-node-process.sql'].flatMap(file=>[...readFileSync('db/'+file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
 const contents=`
 import {createHash} from 'node:crypto';
 import {createFiniteOwnReductionActions} from './lib/mcp-own-finite-reduction.mjs';
 import {createNodeProcessCustody} from './lib/mcp-node-process-custody.mjs';
 import {finiteFixture,digest} from './test/fixtures/qa-finite-trial.mjs';
 import {finiteCleanupPolicyHash} from './lib/mcp-finite-cleanup-policy.mjs';
 const program='synthetic source-only finite custody';
 export class Own {
  constructor(ctx,env){this.ctx=ctx;this.env=env;}
  async fetch(request){
   const f=finiteFixture({at:Number(this.env.T0)}),p=f.plan,s=p.selectors,db=this.env.DB;
   p.resources.containerId=this.ctx.id.toString();s.programHash=createHash('sha256').update(program).digest('hex');
   const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
   const a=createNodeProcessCustody({enabled:true,db,context,projectId:s.projectId,projectionSecret:'z'.repeat(32),storage:this.ctx.storage,custodyKey:Buffer.alloc(32,7),containerId:p.resources.containerId,programHash:s.programHash,sourceRevision:s.sourceRevision,image:'cloudflare/debian-trixie',window:{startAt:s.startAt,expiresAt:s.expiresAt},runtime:{launch:async()=>{throw Error('forbidden');},observe:async()=>{throw Error('no admission');},close:async()=>{await db.prepare('UPDATE fixture_stop SET calls=calls+1').run();}},now:Date.now});
   const policy={purpose:'afw.private-permission-withdrawal.v1',requestId:'22222222-2222-4222-8222-222222222222',startAt:p.C0,expiresAt:p.C1,originalConsent:{sequence:1,revision:1,issuedAt:s.startAt,expiresAt:s.expiresAt},containerId:p.resources.containerId,programHash:s.programHash,sourceRevision:s.sourceRevision};
   const raw=JSON.stringify(policy);p.withdrawalPolicyHash=createHash('sha256').update(raw).digest('hex');p.closePolicyHash=finiteCleanupPolicyHash(p);
   const env={DB:db,AFW_DOSSIER_EVENTS_NODE:this.env.QA,AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:s.grantId,subject:s.subject,projectId:s.projectId,clientId:s.clientId,resource:s.resource,startAt:s.startAt,expiresAt:s.expiresAt}),AFW_OAUTH_ISSUER:'https://fixed.invalid',AFW_OAUTH_RESOURCE:s.resource,AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED:'true',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:raw};
   const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)},refs={intentId:p.intentId,controlHash:control.controlHash};
   const actions=createFiniteOwnReductionActions({ctx:this.ctx,env,control,program,programSourceRevision:s.sourceRevision,close:async boundary=>{const r=await a.close(boundary);if(this.env.LOST==='true')throw Error('synthetic lost close ACK');return r;},now:Date.now});
   const path=new URL(request.url).pathname;
   try{
    if(path==='/withdraw')return Response.json(await actions.withdraw(refs));
    if(path==='/close')return Response.json(await actions.close(refs));
    if(path==='/read')return Response.json(await actions.read(refs));
    return Response.json({stop:(await db.prepare('SELECT calls FROM fixture_stop').first()).calls,monitor:(await db.prepare('SELECT COUNT(*) AS n FROM dossier_monitoring_consent_events').first()).n,now:Date.now(),N1:p.N1,C1:p.C1});
   }catch{return Response.json({status:'unavailable'},{status:409});}
  }
 }
 export default {async fetch(r,e){
  if(new URL(r.url).pathname==='/seed'){
   await e.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE fixture_stop(calls INTEGER);INSERT INTO fixture_stop VALUES(0);');
   for(const sql of ${JSON.stringify(schemas)})await e.DB.prepare(sql).run();
   const f=finiteFixture({at:Number(e.T0)}),s=f.plan.selectors;
   await e.DB.prepare('INSERT INTO site_projects VALUES(?,?,?)').bind(s.projectId,s.subject,1).run();
   await e.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind(s.grantId,s.subject,s.clientId,s.projectId,s.resource,'["afw:project:read"]',new Date(s.expiresAt).toISOString(),'').run();
   await e.DB.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',s.startAt,s.expiresAt).run();return Response.json({});
  }
  return e.QA.get(e.QA.idFromName('afw-own-event-first-successor-v1')).fetch(r);
 }};
 `;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 for(const mode of ['normal','lost','expired']){
  const T0=Date.now()-(mode==='expired'?420001:301000),opts=revision=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),REV:revision,LOST:mode==='lost'?'true':'false'},durableObjects:{QA:{className:'Own',useSQLite:true,uniqueKey:'finite-reduce-'+mode}},d1Databases:{DB:'finite-reduce-'+mode}});
  const mf=new Miniflare(opts('first'));const call=async(path,status=200)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path);assert.equal(r.status,status);return r.json();};
  try{
   await call('/seed');const first=await call('/state');assert.ok(first.now>first.N1);
   if(mode==='expired'){await call('/withdraw',409);await call('/close',409);assert.equal((await call('/state')).stop,0);continue;}
   assert.ok(first.now<first.C1);assert.equal((await call('/withdraw')).permissionsWithdrawn,true);
   const close=await call('/close',mode==='lost'?409:200);if(mode==='normal')assert.equal(close.runtimeStopRequested,true);
   await mf.setOptions(opts('recreated'));await call('/withdraw',409);await call('/close',409);
   const read=await call('/read');assert.equal(read.withdraw.permissionsWithdrawn,true);assert.equal(read.close?.runtimeStopRequested??null,mode==='normal'?true:null);
   const state=await call('/state');assert.equal(state.stop,1);assert.equal(state.monitor,2);
  }finally{await mf.dispose();}
 }
});
