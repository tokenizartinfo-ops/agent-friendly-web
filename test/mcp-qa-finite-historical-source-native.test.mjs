import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {QA_CLOUD_CLOSED_PINS as REAL_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec',APP='d6fc71552de7494a863aca20365a572d',VERSION='2607abae-cec3-4e35-89eb-8b8572262b54',QA='11111111-1111-4111-8111-111111111111';
const PRODUCTION_CEILING=Date.parse('2026-11-03T02:59:00Z');
const CEILING_DECLARATION="CEILING=Date.parse('2026-11-03T02:59:00Z')";
const keys=['afw.canary-restoration-control.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
function fixture(ids){
 const at=Date.now()-600000,start=at+20000,end=start+60000,script='//'+('"'.repeat(1830100))+'\nexport default{};',hash=sha(script),original={containerId:ids.original,applicationId:APP,programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40)},candidate={trialId:'3'.repeat(64),programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40),startAt:start,expiresAt:end,budget:1};
 const events={grantId:'cancelled-old',subject:'owner',projectId:'synthetic-project',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',startAt:start,expiresAt:end};
 const scope={accountId:ACCOUNT,workerName:'agent-friendly-web-delegated-canary',namespaceId:APP,applicationId:APP,ownerRef:'6'.repeat(64),projectRef:'7'.repeat(64),resource:events.resource};
 const successor={scope,original,candidate,publication:{artifactKey:'8'.repeat(64),workerHash:hash,activationKey:'9'.repeat(64)}};
 const retirement={...events,grantId:'original',containerId:ids.original,startAt:at,expiresAt:at+10000,programHash:original.programHash,sourceRevision:original.sourceRevision};
 const bindings=[...Object.entries({AFW_DOSSIER_SUCCESSOR_POLICY:J(successor),AFW_DOSSIER_EVENTS_POLICY:J(events),AFW_DOSSIER_RETIREMENT_POLICY:J(retirement),AFW_OAUTH_PILOT_CLIENT_ID:events.clientId,AFW_OAUTH_PILOT_PROJECT_ID:events.projectId,AFW_OAUTH_RESOURCE:events.resource,AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1'}).map(([name,text])=>({name,type:'plain_text',text})),{name:'DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',class_name:'AfwOwnEventNode',namespace_id:APP},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'},{name:'AFW_DOSSIER_EVENTS_CUSTODY_KEY',type:'secret_text'}];
 for(const name of ['AFW_DELEGATED_OAUTH_ENABLED','AFW_OAUTH_REFRESH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED'])bindings.push({name,type:'plain_text',text:'false'});
 while(bindings.length<29)bindings.push({name:'HISTORICAL_EXTRA_'+bindings.length,type:'plain_text',text:''});
 const container='agent-friendly-web-delegated-canary-afwowneventnode';
 const cfg={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',containers:[{class_name:'AfwOwnEventNode',name:container}],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite',container}},bindings};
 const receipt={baseVersionId:VERSION,artifactKey:sha(J([ACCOUNT,scope.workerName,hash])),sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:candidate.programHash,workerHash:hash,workerBytes:Buffer.byteLength(script),sourceCheck:'git-inputs-before-after-v1'};
 const closure={operation:'restore_canary',startAt:start+1000,expiresAt:end,candidate:{containerId:ids.candidate,applicationId:APP,programHash:candidate.programHash,sourceRevision:candidate.sourceRevision},live:{versionId:QA,deploymentId:QA,configurationHash:'c'.repeat(64)},closed:{versionId:VERSION,moduleHash:hash,moduleBytes:receipt.workerBytes,configurationHash:restorationConfigurationHash(cfg)},operator:{versionId:'22222222-2222-4222-8222-222222222222',deploymentId:'33333333-3333-4333-8333-333333333333',moduleHash:'d'.repeat(64),moduleBytes:100,configurationHash:'e'.repeat(64)}};
 const control={purpose:keys[0],planHash:sha(J(closure)),policy:J(closure),armedAt:start-1000,withdrawnAt:end+1000},prepared={purpose:keys[1],planHash:control.planHash,withdrawalHash:'f'.repeat(64),phase:'issued',issuedAt:start,completedAt:null,dispatchPolicyHash:'0'.repeat(64)},reduced={purpose:keys[2],planHash:control.planHash,withdrawalHash:prepared.withdrawalHash,phase:'complete',issuedAt:start+2000,completedAt:start+3000};
 const historical={purpose:'afw.qa-legacy-historical-context.v1',controlHash:sha(J(control)),closurePolicyHash:control.planHash,namedPolicyHash:'a'.repeat(64),namedBundleHash:'b'.repeat(64),dispatchPolicyHash:prepared.dispatchPolicyHash,withdrawalPolicyHash:prepared.withdrawalHash,trialIdHash:sha(candidate.trialId),grantIdHash:sha(events.grantId),eventIdHash:'c'.repeat(64),journalHashes:{restoration:null,retirement:null,preparedDispatch:sha(J(prepared)),reductionDispatch:sha(J(reduced))},artifactSourceRevision:receipt.sourceRevision,artifactSourceTree:receipt.sourceTree,artifactProgramHash:receipt.programHash,artifactWorkerHash:receipt.workerHash,evidence:{qaVersionId:QA,operatorVersionId:closure.operator.versionId,operatorModuleHash:closure.operator.moduleHash,operatorModuleBytes:100}};
 return {at,start,end,script,receipt,historical,cfg,events,original,candidate,rows:[[keys[0],control],[keys[1],prepared],[keys[2],reduced]],pin:{name:scope.workerName,id:VERSION,configurationHash:restorationConfigurationHash(cfg),bindingCount:29,flagCount:8,module:{name:'index.mjs',bytes:receipt.workerBytes,sha256:hash},deploymentId:QA},metadata:{id:VERSION,...cfg,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}],urls:[]}};
}
async function seed(db,x){
 await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL); CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT);');
 for(const file of ['db/dossier-node-process.sql','db/dossier-monitoring-consent.sql'])for(const m of (await readFile(file,'utf8')).matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();
 await db.prepare('INSERT INTO site_projects VALUES(?,?)').bind('synthetic-project','owner').run();
 for(const id of ['original','cancelled-old'])await db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,'owner','client','synthetic-project',x.events.resource,'["afw:project:read"]',new Date(x.at-1000).toISOString(),new Date(x.end).toISOString(),new Date(x.start+4000).toISOString(),new Date(x.at).toISOString()).run();
 await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('original','synthetic-project','owner','client',x.events.resource,1,x.at,x.at+10000,x.original.containerId,'e'.repeat(64),x.original.programHash,x.original.sourceRevision,'cloudflare/debian-trixie',x.at,x.at+10000).run();
 for(const [id,generation,container,program,source,closed]of [['original','e'.repeat(64),x.original.containerId,x.original.programHash,x.original.sourceRevision,x.at+15000],['cancelled-old',null,x.ids.candidate,x.candidate.programHash,x.candidate.sourceRevision,x.start+5000]])await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind(id,generation,container,program,source,'cloudflare/debian-trixie',closed).run();
 for(const [sequence,id,action,issued,expires]of [[1,'original','grant',x.at,x.at+10000],[2,'cancelled-old','grant',x.start,x.end],[3,'cancelled-old','revoke',x.start+4000,x.start+4000]])await db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(sequence,id,'synthetic-project','owner','client',x.events.resource,1,action,'afw.dossier-monitoring.v1','request-'+sequence,issued,expires).run();
}
async function harness(actualPins=false,productionExpiry=null,commitmentFault=null){
 const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:QA},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader'},d1Databases:{RELEASE_DB:'history'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'History',useSQLite:true,uniqueKey:'history-b2'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'history-node-b2'}}};
 const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class History extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
 const first=await mf.getBindings(),ns=first.AFW_RELEASE_EVENTS_NODE,ids={original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},x=fixture(ids);x.ids=ids;
 if(commitmentFault==='receipt-version')x.receipt.baseVersionId='22222222-2222-4222-8222-222222222222';
 if(commitmentFault==='source-link')x.historical.artifactSourceRevision='f'.repeat(40);
 let source;try{source=await readFile('lib/mcp-qa-finite-historical-source.mjs','utf8');}catch{source='export async function readPrivateQaFiniteHistoricalSource(){throw Error("Finite historical source unavailable:input");}';}
 // Explicit test-only build boundary: no product API or caller-clock override.
 assert.equal(source.split(CEILING_DECLARATION).length,2,'exact production approval datum occurs once');
 const fixtureApproval=Math.max(Date.now()+86400000,Date.parse('2026-11-04T00:00:00Z'));
 if(productionExpiry!==null){
  assert.ok(['before','at'].includes(productionExpiry));
  // Only this focused boundary case freezes the reader clock. The parent lease,
  // performance clock, native storage and D1 keep their actual clocks.
  assert.equal(source.match(/Date\.now\(\)/g)?.length,7,'known reader-only clock call sites');
  source=source.replaceAll('Date.now()',String(PRODUCTION_CEILING-(productionExpiry==='before'?1:0)));
  assert.equal(source.includes('Date.now()'),false);
  assert.equal(source.split(CEILING_DECLARATION).length,2,'production ceiling remains unchanged');
 }else{
  // Synthetic approval is renewed for the test bundle, never for production.
  // This also applies when historical pins remain real in the metadata negative.
  source=source.replace(CEILING_DECLARATION,'CEILING='+fixtureApproval);
  assert.equal(source.includes(CEILING_DECLARATION),false);
  assert.equal(source.split('CEILING='+fixtureApproval).length,2);
 }
 const entry=String.raw`import{DurableObject}from'cloudflare:workers';import{readPrivateQaFiniteHistoricalSource as read,qualifyFiniteInitialHistoricalBaseline as baseline}from'./lib/mcp-qa-finite-historical-source.mjs';import{createHash}from'node:crypto';import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
 export class Node extends DurableObject{}
 export class History extends DurableObject{
 async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);return true;}
 async snapshot(){return[...await this.ctx.storage.list()];}
 async qualifyBaseline(metadata){
 try{const value=baseline(metadata);return{ok:true,keys:Object.keys(value).sort(),moduleHash:createHash('sha256').update(value.bytes).digest('hex'),moduleBytes:value.bytes.length,sourceRevision:value.sourceRevision,sourceTree:value.sourceTree,metadataProof:value.metadataProof};}
 catch(e){return{ok:false,message:e.message};}
 }
 async removeFixture(key){await this.ctx.storage.delete(key);}
 async read(mode='normal'){
 const controller=new AbortController(),parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/',{signal:controller.signal}));let signalTimer;
 if(mode==='abort')signalTimer=setTimeout(()=>controller.abort(),5);
 const lease=mode==='expired'?{signal:controller.signal,assertCurrent(){throw Error('expired');}}:parent.lease;
 try{const result=await read({ctx:this.ctx,env:this.env},lease);return{ok:true,keys:Object.keys(result).sort(),artifactBytes:new TextEncoder().encode(result.artifact.script).length,artifactHash:createHash('sha256').update(result.artifact.script).digest('hex'),escapedBytes:JSON.stringify(result.artifact).length,history:result.history,metadataProof:result.metadataProof,legacy:result.legacy,claims:[result.sourceIdentityVerified,result.scopeVerified,result.authorizesEffects,result.operationalReadiness]};}catch(e){return{ok:false,message:e.message};}finally{clearTimeout(signalTimer);parent.finish();}
 }
 async retention(){
 // Test-only held continuation AFTER the REAL native transaction settles. This ctx
 // adapter is not a native source-identity fixture or permission witness.
 const actual=this.ctx.storage,ctx={id:this.ctx.id,storage:{transaction:async fn=>{const value=await actual.transaction(fn);await new Promise(resolve=>setTimeout(resolve,5500));return value;}}};
 const parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/')),a={lease:parent.lease};
 try{await observeFiniteOwnerStageWork({ctx,env:this.env,admission:a,originalLease:parent.lease},()=>read({ctx,env:this.env},parent.lease));}catch{}finally{parent.finish();}
 async function tryEntry(env){const next=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/'));let entered=false;try{await observeFiniteOwnerStageWork({ctx,env,admission:{lease:next.lease},originalLease:next.lease},async()=>{entered=true;});}catch{}finally{next.finish();}return entered;}
 const blocked=!(await tryEntry(this.env));await new Promise(resolve=>setTimeout(resolve,700));const released=await tryEntry(this.env);return JSON.stringify({blocked,released});
 }
 }export default{fetch(){return new Response(null,{status:404})}};`;
 const plugin={name:'explicit-synthetic-external-source-commitments',setup(b){b.onResolve({filter:/mcp-qa-finite-historical-source\.mjs$/},()=>({path:'historical-reader',namespace:'b2-source'}));b.onLoad({filter:/.*/,namespace:'b2-source'},()=>({contents:source,loader:'js',resolveDir:process.cwd()+'/lib'}));if(actualPins)return;b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...REAL_PINS,canary:x.pin})+';',loader:'js'}));}};
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin]});
 const f={x,mf,requests:[],mode:'normal',delay:0,versionReads:0,fixtureApproval};
 await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
 const u=new URL(req.url);f.requests.push(u.pathname);assert.equal(req.method,'GET');assert.equal(req.headers.get('Authorization'),'Bearer synthetic-native-reader');
 if(f.delay)await new Promise(r=>setTimeout(r,f.delay));
 let result;
 if(u.pathname.endsWith('/tokens/verify'))result={id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:f.mode==='expired-token'?'2020-01-01T00:00:00Z':new Date(fixtureApproval+60000).toISOString(),not_before:null};
 else{assert.equal(u.pathname,'/client/v4/accounts/'+ACCOUNT+'/workers/workers/'+x.pin.name+'/versions/'+VERSION);assert.equal(u.search,'?include=modules');result=structuredClone(x.metadata);f.versionReads++;
 if(f.mode==='defaults'||f.mode==='drift'&&f.versionReads%2===0){for(const e of Object.values(result.exports))e.state='created';result.exports.default.cache={enabled:false};result.cache_options={enabled:false,cross_version_cache:false};}
 if(f.mode==='transfer')result.exports.AfwOwnEventNode={...result.exports.AfwOwnEventNode,state:'expecting-transfer',transfer_from:'foreign'};
 if(f.mode==='cache-on')result.exports.default.cache={enabled:true};
 if(f.mode==='secret-value')result.bindings.find(b=>b.type==='secret_text').text='NEVER-HASH-SECRET';
 if(f.mode==='unknown')result.env={private:'no'};
 if(f.mode==='corrupt-code')result.modules[0].content_base64=Buffer.from('wrong').toString('base64');
 if(f.mode==='missing-slot')result.bindings.find(b=>b.name==='AFW_DOSSIER_RETIREMENT_POLICY').text='';
 }
 return new Response(J({success:true,errors:[],messages:[],result}),{status:f.mode==='redirect'?302:200,headers:{date:new Date().toUTCString(),'content-type':'application/json'}});
 }}));
 const b=await mf.getBindings();f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB');await seed(f.db,x);await f.stub.seed(x.rows);return f;
}
test('B2-AB actual native historical reader, private CF boundary is synthetic',async t=>{
 const f=await harness();try{
 assert.ok(f.fixtureApproval>PRODUCTION_CEILING);assert.ok(f.fixtureApproval>Date.now());
 const before=await f.stub.snapshot(),dbBefore=(await f.db.prepare('SELECT * FROM dossier_node_process_closures ORDER BY grant_id').all()).results;
 await t.test('real positive path preserves Q distinct from historical artifact and returns actual cancellation rows',async()=>{const r=await f.stub.read();assert.equal(r.ok,true,J(r));assert.equal(r.artifactBytes,Buffer.byteLength(f.x.script));assert.ok(r.escapedBytes>2097152,'escaped private script is not a wire cap');assert.equal(r.history.originalAdmission.sourceRevision,'2'.repeat(40));assert.equal(r.history.cancellations[0].sourceRevision,'5'.repeat(40));assert.equal(r.history.cancellations[0].grantId,'cancelled-old');assert.deepEqual(r.claims,[false,false,false,false]);assert.deepEqual(r.metadataProof.normalizations,[]);assert.equal(r.legacy.preparedDispatch,JSON.stringify(f.x.rows[1][1]));});
 await t.test('documented defaults normalize with independent raw fingerprint',async()=>{f.mode='defaults';const r=await f.stub.read();assert.equal(r.ok,true,J(r));assert.notEqual(r.metadataProof.rawConfigurationHash,r.metadataProof.normalizedConfigurationHash);assert.deepEqual(r.metadataProof.normalizations,['cache_options','exports.AfwNodeControl.state','exports.AfwOwnEventNode.state','exports.default.cache','exports.default.state']);f.mode='normal';});
 for(const mode of ['wrong-token','expired-token','transfer','cache-on','secret-value','unknown','corrupt-code','missing-slot','redirect','drift'])await t.test('deny '+mode,async()=>{f.mode=mode;f.versionReads=0;const r=await f.stub.read();assert.equal(r.ok,false);assert.match(r.message,/^Finite historical source unavailable:/);assert.equal(r.message.includes('NEVER-HASH'),false);f.mode='normal';});
 await t.test('extra foreign closure is not filtered away',async()=>{await f.db.prepare('INSERT INTO delegated_access_grants SELECT ?,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?').bind('foreign','cancelled-old').run();await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('foreign',null,'a'.repeat(64),'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',Date.now()-1000).run();assert.equal((await f.stub.read()).ok,false);await f.db.exec('DROP TRIGGER dossier_node_process_close_no_delete');await f.db.prepare('DELETE FROM dossier_node_process_closures WHERE grant_id=?').bind('foreign').run();});

 await t.test('actual D1 rejects foreign scope, malformed chronology and nonlatest monitor',async()=>{
  for(const [column,bad]of [['user_id','foreign'],['scopes_json','["afw:evidence:read"]'],['revoked_at',''],['expires_at','2099-01-01T00:00:00.000Z']]){
   const old=(await f.db.prepare('SELECT '+column+' AS v FROM delegated_access_grants WHERE id=?').bind('cancelled-old').first()).v;
   await f.db.prepare('UPDATE delegated_access_grants SET '+column+'=? WHERE id=?').bind(bad,'cancelled-old').run();
   assert.equal((await f.stub.read()).ok,false,column);
   await f.db.prepare('UPDATE delegated_access_grants SET '+column+'=? WHERE id=?').bind(old,'cancelled-old').run();
  }
  await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(4,'cancelled-old','synthetic-project','owner','client',f.x.events.resource,2,'grant','afw.dossier-monitoring.v1','late-grant',f.x.start+6000,f.x.end).run();
  assert.equal((await f.stub.read()).ok,false,'a later grant supersedes the prior revoke');
  await f.db.exec('DROP TRIGGER dossier_monitoring_no_delete');await f.db.prepare('DELETE FROM dossier_monitoring_consent_events WHERE sequence=4').run();
 });
 await t.test('exactly eight actual cancellations qualify; ninth is rejected without filtering',async()=>{
  const added=[];
  for(let n=0;n<8;n++){
   const grant='historical-'+n;added.push(grant);
   await f.db.prepare('INSERT INTO delegated_access_grants SELECT ?,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?').bind(grant,'cancelled-old').run();
   await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind(grant,null,String(n+1).repeat(64),'a'.repeat(64),'b'.repeat(40),'cloudflare/debian-trixie',f.x.start+5000).run();
   for(const [offset,action,issued,expires]of [[0,'grant',f.x.start,f.x.end],[1,'revoke',f.x.start+4000,f.x.start+4000]])await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(10+n*2+offset,grant,'synthetic-project','owner','client',f.x.events.resource,1,action,'afw.dossier-monitoring.v1','history-'+n+'-'+offset,issued,expires).run();
   if(n===6){const r=await f.stub.read();assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.history.cancellations.length,8);assert.equal(r.history.cancellations.find(z=>z.grantId==='historical-0').programHash,'a'.repeat(64),'each cancellation keeps its own actual program');}
  }
  assert.equal((await f.stub.read()).ok,false);
  for(const grant of added){await f.db.prepare('DELETE FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(grant).run();await f.db.prepare('DELETE FROM dossier_node_process_closures WHERE grant_id=?').bind(grant).run();await f.db.prepare('DELETE FROM delegated_access_grants WHERE id=?').bind(grant).run();}
 });
 await t.test('stored null and corrupted actual legacy journal never become absent history',async()=>{
  await f.stub.seed([[keys[3],null]]);assert.equal((await f.stub.read()).ok,false);
  await f.stub.removeFixture(keys[3]);
  await f.stub.seed([[keys[1],{...f.x.rows[1][1],phase:'complete',completedAt:f.x.start+1}]]);assert.equal((await f.stub.read()).ok,false);
  await f.stub.seed([f.x.rows[1]]);assert.equal((await f.stub.read()).ok,true);
 });

 await t.test('later active new grant and Save do not gate historical reads',async()=>{await f.db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind('new-active','owner','client','synthetic-project',f.x.events.resource,'["afw:project:read"]',new Date().toISOString(),new Date(Date.now()+100000).toISOString(),'',new Date().toISOString()).run();assert.equal((await f.stub.read()).ok,true);await f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').bind(new Date().toISOString(),'new-active').run();assert.equal((await f.stub.read()).ok,true);});
 await t.test('original aborted or expired parent denies without a renewed lease',async()=>{const n=f.requests.length;assert.equal((await f.stub.read('expired')).ok,false);assert.equal(f.requests.length,n);f.delay=30;assert.equal((await f.stub.read('abort')).ok,false);f.delay=0;});
 await t.test('original termination retains the held native continuation until settlement',async()=>{const r=JSON.parse(await f.stub.retention());assert.deepEqual(r,{blocked:true,released:true});});
 assert.deepEqual(await f.stub.snapshot(),before);assert.deepEqual((await f.db.prepare('SELECT * FROM dossier_node_process_closures ORDER BY grant_id').all()).results,dbBefore);assert.equal((await f.mf.dispatchFetch('https://fixture.invalid')).status,404);
 }finally{await f.mf.dispose();}
});

test('production fixed commitments reject synthetic historical bytes; no external pin override',async()=>{
 const f=await harness(true);try{const r=await f.stub.read();assert.equal(r.ok,false);assert.equal(r.message,'Finite historical source unavailable:metadata');assert.ok(f.requests.some(p=>p.endsWith('/versions/'+VERSION)),'historical metadata was actually read');}finally{await f.mf.dispose();}
});

test('unchanged production custody ceiling denies exactly at expiry before provider reads',async()=>{
 // At ceiling-1 the same unchanged guard admits the first provider read. At
 // ceiling it denies before any read: this distinguishes expiry from parent,
 // wall drift, monotonic or native-input rejection.
 for(const boundary of ['before','at']){
  const f=await harness(false,boundary);try{
   const r=await f.stub.read();
   if(boundary==='before')assert.ok(f.requests.length>0,'one millisecond before expiry passes initial custody ceiling');
   else{assert.equal(r.ok,false);assert.equal(r.message,'Finite historical source unavailable:deadline');assert.equal(f.requests.length,0);}
  }finally{await f.mf.dispose();}
 }
});

test('shared historical byte boundary agrees for backup and native reader without conflating their policies',async t=>{
 const f=await harness();try{
  const original=structuredClone(f.x.metadata),originalRows=await f.stub.snapshot();
  await t.test('both consumers qualify exact source bytes and keep distinct output responsibilities',async()=>{
   const backup=await f.stub.qualifyBaseline(original),reader=await f.stub.read();
   assert.equal(backup.ok,true,JSON.stringify(backup));assert.equal(reader.ok,true,JSON.stringify(reader));
   assert.equal(backup.moduleHash,sha(f.x.script));assert.equal(reader.artifactHash,sha(f.x.script));
   assert.equal(backup.moduleBytes,Buffer.byteLength(f.x.script));assert.equal(reader.artifactBytes,Buffer.byteLength(f.x.script));
   assert.equal(backup.sourceRevision,f.x.receipt.sourceRevision);assert.equal(backup.sourceTree,f.x.receipt.sourceTree);
   assert.deepEqual(backup.metadataProof,reader.metadataProof);
   assert.deepEqual(backup.keys,['bytes','configuration','metadataProof','rawConfiguration','sourceRevision','sourceTree']);
   assert.equal(reader.keys.includes('rawConfiguration'),false);assert.equal(reader.keys.includes('bytes'),false);assert.equal(reader.keys.includes('history'),true);
  });
  const cases=[
   ['missing module',v=>v.modules=[]],
   ['extra module',v=>v.modules.push({...v.modules[0]})],
   ['wrong module type',v=>v.modules[0].content_type='text/plain'],
   ['wrong module name',v=>v.modules[0].name='other.mjs'],
   ['noncanonical base64',v=>v.modules[0].content_base64+='\n'],
   ['wrong byte hash',v=>v.modules[0].content_base64=Buffer.from('foreign module').toString('base64')],
   ['unknown metadata field',v=>v.assets={}],
   ['secret value',v=>v.bindings.find(b=>b.type==='secret_text').text='SYN-MUST-NOT-ESCAPE'],
   ['namespace drift',v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE').namespace_id='f'.repeat(32)],
  ];
  for(const [name,change]of cases)await t.test(name+' is rejected by both consumers',async()=>{
   const metadata=structuredClone(original);change(metadata);f.x.metadata=metadata;
   for(const response of [await f.stub.qualifyBaseline(metadata),await f.stub.read()]){
    assert.equal(response.ok,false,name);assert.equal(response.message,'Finite historical source unavailable:metadata');assert.equal(JSON.stringify(response).includes('SYN-MUST-NOT-ESCAPE'),false);
   }
   f.x.metadata=original;
  });
  await t.test('native legacy evidence remains required only by historical reader',async()=>{
   await f.stub.seed([[keys[1],{...f.x.rows[1][1],phase:'complete',completedAt:f.x.start+1}]]);
   assert.equal((await f.stub.qualifyBaseline(original)).ok,true);
   const reader=await f.stub.read();assert.equal(reader.ok,false);assert.equal(reader.message,'Finite historical source unavailable:legacy');
   await f.stub.seed([f.x.rows[1]]);assert.equal((await f.stub.read()).ok,true);
  });
  assert.deepEqual(await f.stub.snapshot(),originalRows);
 }finally{await f.mf.dispose();}
});
for(const fault of ['receipt-version','source-link'])test('both historical consumers reject loaded '+fault+' commitment mismatch',async()=>{
 const f=await harness(false,null,fault);try{
  for(const response of [await f.stub.qualifyBaseline(f.x.metadata),await f.stub.read()]){
   assert.equal(response.ok,false);assert.equal(response.message,'Finite historical source unavailable:metadata');
  }
 }finally{await f.mf.dispose();}
});
