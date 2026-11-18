import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const bundles=new Map();
export async function policyFixture(t,mode='normal'){
 const actualFacts=mode==='actual_facts_unavailable';
 if(!bundles.has(actualFacts))bundles.set(actualFacts,(await build({entryPoints:['test/fixtures/finite-policy-setup-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC-fixed-qualification',setup(b){
  if(!actualFacts)b.onLoad({filter:/mcp-qa-finite-owner-preparation\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readFiniteOwnerSetupFacts','async function unusedActualSetupFacts')+"\nexport {syntheticFacts as readFiniteOwnerSetupFacts} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';",resolveDir:process.cwd()+'/lib',loader:'js'}));
  b.onLoad({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readPrivateQaFinitePolicyEntry','async function unusedActualEntry')+"\nexport {syntheticEntry as readPrivateQaFinitePolicyEntry} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-worker.mjs';",resolveDir:process.cwd()+'/lib',loader:'js'}));
 }}]})).outputFiles[0].text);
 let state,pointer,versionId,deploymentId,permissionDb,posts=0;const requests=[],versions=new Map(),reads=[];
 const envelope=result=>Response.json({success:true,errors:[],messages:[],result});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundles.get(actualFacts),compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-setup'},AFW_RELEASE_EVENTS_NODE:{className:'SetupFixture',useSQLite:true,uniqueKey:'finite-policy-events'}},d1Databases:{RELEASE_DB:'SYNTHETIC_RELEASE'},bindings:{AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'},AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:async request=>{
  const url=new URL(request.url),root='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/';assert.equal(url.origin,'https://api.cloudflare.com');
  assert(request.headers.get('Authorization').startsWith('Bearer SYNTHETIC_'));
  if(request.method==='POST'){
   posts++;const body=await request.json();requests.push({method:request.method,url:request.url,body});
   if(url.pathname===root+'workers/agent-friendly-web-delegated-canary/versions'){
    assert.equal(url.search,'?deploy=false');versionId=randomUUID();versions.set(versionId,body);
    for(const binding of body.bindings.filter(b=>b.type==='inherit'))assert.deepEqual(binding,{name:binding.name,type:'inherit',version_id:state.baseline.versionId});
    if(mode==='lost_ack')throw Error('SYNTHETIC upload ACK lost');
    if(mode==='late_upload')await new Promise(r=>setTimeout(r,5200));
    if(mode==='provider404')return Response.json({success:false,errors:[{}],result:null},{status:404});
    if(mode==='notice-withdrawn-after-upload')await withdrawNotice();
    return envelope({id:versionId});
   }
   assert.equal(url.pathname,root+'scripts/agent-friendly-web-delegated-canary/deployments');
   assert.deepEqual(body,{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]});
   deploymentId=randomUUID();pointer={id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]};
   if(mode==='lost_activation')throw Error('SYNTHETIC activation ACK lost');
   return envelope(pointer);
  }
  reads.push(request.url);
  if(url.pathname===root+'scripts/agent-friendly-web-delegated-canary/deployments'){
   const observed=(mode==='foreign_pointer'||mode==='foreign_after_upload'&&posts>0)?{...pointer,id:randomUUID()}:pointer;
   return envelope({deployments:[observed]});
  }
  const id=url.pathname.split('/').at(-1),uploaded=versions.get(id),pin=id===state.rollback.versionId?state.rollback:state.baseline;
  const config=uploaded?{...uploaded,bindings:uploaded.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b),containers:uploaded.containers.map(b=>({...b,name:'agent-friendly-web-delegated-canary-afwowneventnode'}))}:pin.configuration;
  const modules=uploaded?uploaded.modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(state.script).toString('base64')}];
  if(uploaded&&mode==='wrong_bytes')modules[0].content_base64=Buffer.from('SYNTHETIC WRONG BYTES').toString('base64');
  if(uploaded&&mode==='wrong_full')config.bindings=config.bindings.map(b=>b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?{...b,text:'FOREIGN_SYNTHETIC_CLIENT'}:b);
  return envelope({...config,id,urls:[],modules});
 }}));
 t.after(()=>mf.dispose());
 const json=async(path,value={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify(value)});assert.equal(r.status,200,await r.clone().text());return r.json();};
 async function withdrawNotice(){
  const n=state.notice,at=Date.now();
  await permissionDb.prepare("INSERT INTO dossier_monitoring_consent_events VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").bind(2,n.grantId,n.projectId,n.subject,n.clientId,n.resource,n.revision,'revoke',n.purpose,randomUUID(),at,at).run();
 }
 state=await json('/init',{mode});
 permissionDb=await mf.getD1Database('RELEASE_DB');
 const n=state.notice,a=state.authorization;
 const schemas=[
  "CREATE TABLE site_projects (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,revision INTEGER NOT NULL)",
  "CREATE TABLE delegated_access_grants (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,client_id TEXT NOT NULL,project_id TEXT NOT NULL,resource TEXT NOT NULL,scopes_json TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT NOT NULL,revoked_at TEXT NOT NULL)",
  "CREATE TABLE delegated_consent_sessions (handle_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,kind TEXT NOT NULL,project_id TEXT NOT NULL,client_id TEXT NOT NULL,resource TEXT NOT NULL,scopes_json TEXT NOT NULL,expires_at TEXT NOT NULL,consumed_at TEXT NOT NULL)",
  "CREATE TABLE dossier_monitoring_consent_events (sequence INTEGER PRIMARY KEY,grant_id TEXT NOT NULL,project_id TEXT NOT NULL,user_id TEXT NOT NULL,client_id TEXT NOT NULL,resource TEXT NOT NULL,revision INTEGER NOT NULL,action TEXT NOT NULL,purpose TEXT NOT NULL,request_id TEXT NOT NULL,issued_at INTEGER NOT NULL,expires_at INTEGER NOT NULL)",
 ];
 await permissionDb.batch(schemas.map(sql=>permissionDb.prepare(sql)));
 await permissionDb.batch([
  permissionDb.prepare("INSERT INTO site_projects VALUES (?,?,?)").bind(n.projectId,n.subject,mode==='permission-project-revised'?n.revision+1:n.revision),
  permissionDb.prepare("INSERT INTO delegated_access_grants VALUES (?,?,?,?,?,?,?,?,?)").bind(n.grantId,n.subject,n.clientId,n.projectId,n.resource,JSON.stringify(a.scopes),new Date(state.T0-300).toISOString(),a.expires_at,mode==='permission-grant-revoked'?new Date(state.T0).toISOString():''),
  permissionDb.prepare("INSERT INTO delegated_consent_sessions VALUES (?,?,?,?,?,?,?,?,?)").bind(a.handle_hash,a.user_id,a.kind,a.project_id,a.client_id,a.resource,JSON.stringify(a.scopes),a.expires_at,mode==='permission-consent-replaced'?new Date(state.T0-390).toISOString():a.consumed_at),
  permissionDb.prepare("INSERT INTO dossier_monitoring_consent_events VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").bind(n.sequence,n.grantId,n.projectId,n.subject,n.clientId,n.resource,n.revision,n.action,n.purpose,mode==='permission-notice-replaced'?randomUUID():n.requestId,n.issuedAt,n.expiresAt),
 ]);
 if(mode==='permission-notice-withdrawn')await withdrawNotice();
 pointer={id:state.baseline.deploymentId,strategy:'percentage',versions:[{version_id:state.baseline.versionId,percentage:100}]};
 return {run:(direct=false)=>json('/run',{T0:state.T0,direct}),rows:()=>json('/rows'),hydration:()=>json('/hydration'),posts:()=>posts,requests,reads,state,actual:()=>({versionId,deploymentId})};
}
