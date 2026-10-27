import assert from 'node:assert/strict';
const hash=async s=>Buffer.from(await crypto.subtle.digest('SHA-256',typeof s==='string'?new TextEncoder().encode(s):s)).toString('hex');
const canonical=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
const issuer='https://delegated-canary.agentfriendlyweb.dev',id='11111111-1111-4111-8111-111111111111';
const names=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
export async function fixture(){
 const scope={accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',ownerRef:'b'.repeat(64),projectRef:'c'.repeat(64),resource:issuer+'/mcp'};
 const original={containerId:'d'.repeat(64),applicationId:scope.applicationId,programHash:'e'.repeat(64),sourceRevision:'f'.repeat(40)};
 const text={AFW_OAUTH_ISSUER:issuer,AFW_OAUTH_RESOURCE:issuer+'/mcp',AFW_OAUTH_PILOT_CLIENT_ID:'afw-chatgpt-pilot-20261003',AFW_OAUTH_PILOT_PROJECT_ID:'oauth-canary-owner',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:'2026-10-15T23:10:16.250Z',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate:{},publication:{}}),AFW_DOSSIER_EVENTS_POLICY:'{}',AFW_DOSSIER_MONITORING_OWNER_POLICY:'{}',AFW_DOSSIER_RETIREMENT_POLICY:'{}',AFW_DOSSIER_EVENTS_SCHEDULE_MODE:'exact',ACCESS_AUD:'synthetic-audience',ACCESS_TEAM_DOMAIN:'tokenizart.cloudflareaccess.com'};
 const bindings=[...names.map(name=>({name,type:'plain_text',text:'false'})),...Object.entries(text).map(([name,text])=>({name,type:'plain_text',text})),...['AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_PROVIDER_READ_TOKEN'].map(name=>({name,type:'secret_text'})),{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:scope.namespaceId},{name:'DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'},{name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'1001',simple:{limit:10,period:60}}];
 assert.equal(bindings.length,29);const bytes=new TextEncoder().encode('export default {fetch(){return new Response("synthetic")}}');
 const v={id,compatibility_date:'2026-10-01',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}],urls:[],bindings,usage_model:'standard',containers:[],exports:[]};
 const config={compatibility_date:v.compatibility_date,compatibility_flags:v.compatibility_flags,containers:[],exports:[],usage_model:'standard',bindings:[...bindings].sort((a,b)=>a.name.localeCompare(b.name))};
 const pin={baseVersionId:id,artifactKey:await hash(JSON.stringify([scope.accountId,scope.workerName,await hash(bytes)])),sourceRevision:'2'.repeat(40),sourceTree:'3'.repeat(40),programHash:'4'.repeat(64),workerHash:await hash(bytes),workerBytes:bytes.length,sourceCheck:'git-inputs-before-after-v1'};
 return{v,pin,configurationHash:await hash(canonical(config))};
}
const A='85d0d5dadac3341a564f22ce885e9eec',R='/accounts/'+A,W='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator',FLOW='afw-release-administrative',FID='0ee9231b-8952-46bd-8124-a0c5dbb06dd0',KEY='client:afw-chatgpt-pilot-20261003';
export const start=Date.parse('2026-10-27T19:10:00Z'),end=start+600000;
const uid=n=>n.toString(16).padStart(8,'0')+'-1111-4111-8111-111111111111';
export async function environment(){
 const f=await fixture(),op=structuredClone(f.v);op.id=uid(2);op.bindings=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED'].map(name=>({name,type:'plain_text',text:'false'}));op.bindings.push(...Array.from({length:4},(_,i)=>({name:'FIXTURE_BINDING_'+i,type:'plain_text',text:'unchanged'})));op.modules[0].content_base64=Buffer.from('synthetic closed operator').toString('base64');
 const cfg=v=>({compatibility_date:v.compatibility_date,compatibility_flags:v.compatibility_flags,containers:v.containers,exports:v.exports,usage_model:v.usage_model,bindings:[...v.bindings].sort((a,b)=>a.name.localeCompare(b.name))});
 const baseline={pin:f.pin,configurationHash:f.configurationHash,canaryDeployment:uid(10),operatorVersion:op.id,operatorDeployment:uid(11),operatorHash:await hash(Buffer.from(op.modules[0].content_base64,'base64')),operatorBytes:Buffer.from(op.modules[0].content_base64,'base64').length,operatorConfigurationHash:await hash(canonical(cfg(op))),workflowVersion:uid(12)};
 const s={wall:start,mono:0,baseline,versions:new Map([[f.v.id,f.v],[op.id,op]]),canary:{id:baseline.canaryDeployment,strategy:'percentage',versions:[{version_id:f.v.id,percentage:100}]},operator:{id:baseline.operatorDeployment,strategy:'percentage',versions:[{version_id:op.id,percentage:100}]},client:null,rows:[],reserved:0,activeGrants:0,calls:[],serial:20,interceptor:null};
 const ok=(result,result_info)=>({success:true,status:200,errors:[],result,...result_info?{result_info}:{}});
 const page=rows=>ok(rows,{count:rows.length,total_count:rows.length,page:1,total_pages:1,per_page:100});
 async function route(o){
  const path=o.path;
  if(o.method==='GET'&&path===R+'/workers/scripts/'+W+'/deployments')return ok(s.canary);
  if(o.method==='GET'&&path===R+'/workers/scripts/'+OP+'/deployments')return ok(s.operator);
  const v=path.match(new RegExp('^'+R+'/workers/workers/('+W+'|'+OP+')/versions/([a-f0-9-]+)$'));
  if(o.method==='GET'&&v){const value=s.versions.get(v[2]);assert.ok(value);return ok(value);}
  if(o.method==='GET'&&path===R+'/workers/workers/'+W+'/versions')return page([...s.versions.values()].filter(v=>v.id!==op.id).map(v=>({id:v.id,annotations:v.annotations??{}})));
  if(o.method==='POST'&&path===R+'/workers/workers/'+W+'/versions'){
   const body=structuredClone(o.body),n=uid(++s.serial),bindings=body.bindings.map(b=>b.type==='inherit'?structuredClone(s.versions.get(b.version_id).bindings.find(x=>x.name===b.name)):b);
   s.versions.set(n,{...body,bindings,id:n,urls:[]});return ok({id:n,exports_reconciliation:{}});}
  if(o.method==='POST'&&path===R+'/workers/scripts/'+W+'/deployments'){assert.equal(o.body.strategy,'percentage');assert.equal(o.body.versions.length,1);assert.equal(o.body.versions[0].percentage,100);assert.ok(s.versions.has(o.body.versions[0].version_id));s.canary={id:uid(++s.serial),strategy:'percentage',versions:structuredClone(o.body.versions)};return ok({id:s.canary.id});}
  if(o.method==='GET'&&path===R+'/workflows/'+FLOW)return ok({id:FID,name:FLOW,script_name:OP,class_name:'AfwReleaseWorkflow',schedules:[]});
  if(o.method==='GET'&&path===R+'/workflows/'+FLOW+'/versions')return page([{id:baseline.workflowVersion,workflow_id:FID,class_name:'AfwReleaseWorkflow',limits:{steps:1},concurrency:{limit:1},default_retention:{success_retention:259200000,error_retention:259200000}}]);
  if(o.method==='GET'&&path===R+'/workflows/'+FLOW+'/instances')return page([]);
  if(o.method==='GET'&&path===R+'/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2')return page([]);
  if(o.method==='GET'&&path.match(new RegExp('^'+R+'/workers/scripts/('+W+'|'+OP+')/(schedules|tails)$')))return path.endsWith('/schedules')?ok({schedules:[]}):ok([]);
  if(o.method==='POST'&&path===R+'/d1/database/6a728254-1494-4039-802e-b39288a55fcc/query'){assert.match(o.body.sql,/^SELECT /);return ok([{success:true,results:o.body.sql.includes('AS project_owner')?s.rows:[{reserved:s.reserved,active_grants:s.activeGrants}]}]);}
  const kv=R+'/storage/kv/namespaces/6b94ff702e504e14a7730cee73a0f6ff';
  if(o.method==='POST'&&path===kv+'/bulk/get'){assert.deepEqual(o.body,{keys:[KEY],type:'json',withMetadata:true});return ok({values:{[KEY]:s.client}});}
  if(o.method==='PUT'&&path===kv+'/bulk'){assert.equal(o.body.length,1);const c=o.body[0];assert.equal(c.key,KEY);s.client={value:JSON.parse(c.value),metadata:c.metadata,expiration:c.expiration};return ok({successful_key_count:1,unsuccessful_keys:[]});}
  if(o.method==='DELETE'&&path===kv+'/values/'+encodeURIComponent(KEY)){s.client=null;return ok(null);}
  throw Error('Unexpected synthetic API route '+o.method+' '+path);
 }
 s.request=async o=>{s.calls.push(structuredClone(o));const result=s.interceptor?await s.interceptor(o,()=>route(o)):await route(o);return structuredClone(result);};
 s.ctx={accountId:A,request:s.request,now:()=>s.wall,monotonic:()=>s.mono,timeoutMs:110000};
 s.params={mode:'live',phase:'open',window:{startAt:start,expiresAt:end,trialId:'a'.repeat(64)},baseline,live:null};
 s.grant=()=>({id:'own-grant',user_id:'synthetic-owner',project_owner:'synthetic-owner',client_id:'afw-chatgpt-pilot-20261003',project_id:'oauth-canary-owner',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',scopes_json:'["afw:project:read"]',created_at:new Date(start+1000).toISOString(),expires_at:new Date(end).toISOString(),exchanged_at:new Date(start+2000).toISOString(),revoked_at:'',closure_count:0});
 return s;
}
