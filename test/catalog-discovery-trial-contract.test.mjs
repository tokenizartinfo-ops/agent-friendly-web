import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareCatalogDiscoveryWindow,createCatalogDiscoveryClient,inspectCatalogDiscoveryArtifact,inspectCatalogDiscoveryGrant,createCatalogDiscoveryVersion} from '../scripts/catalog-discovery-trial-contract.mjs';
const start=Date.parse('2026-10-27T19:10:00Z'),end=start+600000,trial='a'.repeat(64);
const plan=()=>prepareCatalogDiscoveryWindow({startAt:start,expiresAt:end,trialId:trial},{now:start});
const hash=async s=>Buffer.from(await crypto.subtle.digest('SHA-256',typeof s==='string'?new TextEncoder().encode(s):s)).toString('hex');
const canonical=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
const issuer='https://delegated-canary.agentfriendlyweb.dev',id='11111111-1111-4111-8111-111111111111';
const names=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
async function fixture(){
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
const row=()=>({id:'own-grant',user_id:'owner-one',project_owner:'owner-one',client_id:'afw-chatgpt-pilot-20261003',project_id:'oauth-canary-owner',resource:issuer+'/mcp',scopes_json:'["afw:project:read"]',created_at:new Date(start+1000).toISOString(),expires_at:new Date(end).toISOString(),exchanged_at:new Date(start+2000).toISOString(),revoked_at:'',closure_count:0});
test('finite original window has no invocation or subscription authority',()=>{
 const p=plan();assert.equal(p.operationalReadiness,false);assert.equal(p.invoked,false);assert.equal(p.maySubscribe,false);assert.equal(p.expiresAt,end);assert.ok(Object.isFrozen(p));
 for(const input of [{startAt:start,expiresAt:end+1,trialId:trial},{startAt:start,expiresAt:end,trialId:trial,extra:true},{startAt:start,expiresAt:start,trialId:trial},{startAt:-1,expiresAt:1,trialId:trial}])assert.throws(()=>prepareCatalogDiscoveryWindow(input,{now:start}));
 for(const now of [start-1,end,NaN])assert.throws(()=>prepareCatalogDiscoveryWindow({startAt:start,expiresAt:end,trialId:trial},{now}));
});
test('public client has only the fixed ChatGPT callback and a deadline-bounded KV expiration',()=>{
 const c=createCatalogDiscoveryClient(plan(),{now:start+1000});assert.equal(c.key,'client:afw-chatgpt-pilot-20261003');assert.equal(c.expiration,Math.floor(end/1000));assert.deepEqual(c.value.redirectUris,['https://chatgpt.com/connector_platform_oauth_redirect']);assert.equal(c.value.tokenEndpointAuthMethod,'none');assert.equal('clientSecret' in c.value,false);assert.deepEqual(c.value.grantTypes,['authorization_code']);assert.equal(c.mayInvoke,false);
 assert.throws(()=>createCatalogDiscoveryClient({...plan()},{now:start}));assert.throws(()=>createCatalogDiscoveryClient(plan(),{now:end}));
});
test('artifact proof rejects mismatched bytes, malformed secrets, nonclosed flags and duplicate bindings',async()=>{
 const f=await fixture();const proof=await inspectCatalogDiscoveryArtifact(f);assert.equal(proof.versionId,id);assert.equal(proof.workerHash,f.pin.workerHash);
 for(const mutate of [x=>x.v.modules[0].content_base64=Buffer.from('wrong').toString('base64'),x=>x.v.bindings[0].text='true',x=>x.v.bindings.push(x.v.bindings[0]),x=>x.v.bindings.find(b=>b.type==='secret_text').text='private-value',x=>x.v.urls=['https://unexpected.example'],x=>x.pin.workerBytes++]){const x=structuredClone(f);mutate(x);await assert.rejects(inspectCatalogDiscoveryArtifact(x));}
});
test('new grant proof requires an unambiguous current owner, exchange, exact scope and original deadline',()=>{
 const p=plan(),g=inspectCatalogDiscoveryGrant({rows:[row()],window:p,now:start+3000});assert.equal(g.projectId,'oauth-canary-owner');assert.equal(g.expiresAt,end);
 for(const rows of [[],[row(),row()]])assert.throws(()=>inspectCatalogDiscoveryGrant({rows,window:p,now:start+3000}));
 for(const mutate of [x=>x.user_id='someone-else',x=>x.project_id='other-project',x=>x.client_id='another-client',x=>x.resource='https://other.example/mcp',x=>x.revoked_at=new Date(start+2000).toISOString(),x=>x.exchanged_at='',x=>x.created_at=new Date(start-1).toISOString(),x=>x.expires_at=new Date(end+1).toISOString(),x=>x.scopes_json='["afw:project:read","afw:evidence:read"]',x=>x.closure_count=1]){const x=row();mutate(x);assert.throws(()=>inspectCatalogDiscoveryGrant({rows:[x],window:p,now:start+3000}));}
});
test('OAuth-only payload inherits every untouched binding and adds no callback or credential',async()=>{
 const f=await fixture(),b=await inspectCatalogDiscoveryArtifact(f),p=plan(),v=createCatalogDiscoveryVersion({stage:'oauth',base:b,window:p,now:start+3000});assert.equal(v.payload.bindings.length,30);assert.equal(v.payload.bindings.filter(x=>x.type==='inherit').length,27);assert.equal(v.payload.bindings.find(x=>x.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'true');assert.equal(v.payload.bindings.find(x=>x.name==='AFW_DELEGATED_CONTINUITY_ENABLED').text,'true');assert.ok(v.payload.bindings.filter(x=>x.type==='inherit').every(x=>x.version_id===id));assert.equal(v.payload.modules[0].content_base64,f.v.modules[0].content_base64);assert.equal(JSON.stringify(v).includes('clientSecret'),false);
 assert.throws(()=>createCatalogDiscoveryVersion({stage:'oauth',base:{...b},window:p,now:start+3000}));
});
test('catalog payload binds the exact grant, preserves retirement and grants no delivery capability',async()=>{
 const f=await fixture(),base=await inspectCatalogDiscoveryArtifact(f),window=plan(),grant=inspectCatalogDiscoveryGrant({rows:[row()],window,now:start+3000});const v=createCatalogDiscoveryVersion({stage:'catalog',base,window,grant,now:start+3000});assert.equal(v.payload.bindings.length,30);const values=Object.fromEntries(v.payload.bindings.filter(x=>x.type==='plain_text').map(x=>[x.name,x.text]));assert.equal(values.AFW_DOSSIER_EVENTS_ENABLED,'true');assert.equal(values.AFW_DOSSIER_MONITORING_OWNER_ENABLED,'true');assert.equal(values.AFW_DOSSIER_SUCCESSOR_ENABLED,'true');const policy=JSON.parse(values.AFW_DOSSIER_EVENTS_POLICY);assert.equal(policy.grantId,'own-grant');assert.equal(policy.expiresAt,end);assert.equal(policy.subject,'owner-one');const successor=JSON.parse(values.AFW_DOSSIER_SUCCESSOR_POLICY);assert.equal(successor.candidate.sourceRevision,f.pin.sourceRevision);assert.equal(successor.candidate.budget,1);assert.equal(successor.publication.artifactKey,f.pin.artifactKey);assert.equal(successor.original.containerId,'d'.repeat(64));assert.ok(v.payload.bindings.find(x=>x.name==='AFW_DOSSIER_RETIREMENT_POLICY').type==='inherit');for(const n of ['AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_OAUTH_REFRESH_ENABLED'])assert.equal(v.payload.bindings.find(x=>x.name===n).type,'inherit');assert.equal(v.maySubscribe,false);assert.equal(v.operationalReadiness,false);
 assert.throws(()=>createCatalogDiscoveryVersion({stage:'catalog',base,window,grant:{...grant},now:start+3000}));assert.throws(()=>createCatalogDiscoveryVersion({stage:'subscribe',base,window,grant,now:start+3000}));assert.throws(()=>createCatalogDiscoveryVersion({stage:'catalog',base,window,grant,now:end}));
});

test('caller mutation during asynchronous hashing cannot replace the verified module',async()=>{
 const f=await fixture(),original=f.v.modules[0].content_base64,expected=f.pin.workerHash;
 const pending=inspectCatalogDiscoveryArtifact(f);f.v.modules[0].content_base64=Buffer.from('unverified replacement').toString('base64');f.pin.sourceRevision='9'.repeat(40);
 const proof=await pending,window=plan(),v=createCatalogDiscoveryVersion({stage:'oauth',base:proof,window,now:start});assert.equal(proof.workerHash,expected);assert.equal(proof.sourceRevision,'2'.repeat(40));assert.equal(v.payload.modules[0].content_base64,original);
});
test('observed clock rewind terminally fences the same preparation window',()=>{
 const window=plan();createCatalogDiscoveryClient(window,{now:start+1});assert.throws(()=>createCatalogDiscoveryClient(window,{now:start}));assert.throws(()=>createCatalogDiscoveryClient(window,{now:start+2}));
});
