// INTERNAL pure preparation only. Inputs are not proof of origin or consent.
// The host must independently obtain the accepted pin and primary API/D1 data,
// check current pointers and rollback, and submit only descriptor.payload.
const target=Object.freeze({accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-delegated-canary',namespaceId:'d6fc71552de7494a863aca20365a572d',databaseId:'6a728254-1494-4039-802e-b39288a55fcc',kvId:'6b94ff702e504e14a7730cee73a0f6ff',projectId:'oauth-canary-owner',clientId:'afw-chatgpt-pilot-20261003',issuer:'https://delegated-canary.agentfriendlyweb.dev',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'});
const bases=new WeakMap(),windows=new WeakMap(),grants=new WeakMap();
const fail=()=>{throw Error('Catalog trial preparation unavailable');};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const ds=Object.getOwnPropertyDescriptors(v);if(Reflect.ownKeys(ds).length!==keys.length||keys.some(k=>!ds[k]?.enumerable||!Object.hasOwn(ds[k],'value')))fail();return Object.fromEntries(keys.map(k=>[k,ds[k].value]));};
const freeze=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v);}return v;};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
const digest=async x=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',typeof x==='string'?new TextEncoder().encode(x):x))).map(x=>x.toString(16).padStart(2,'0')).join('');
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const configKeys=['compatibility_date','compatibility_flags','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
function clock(window,now){const s=windows.get(window);if(!s||s.terminal||!time(now)||now<s.last||now<window.startAt||now>=window.expiresAt){if(s)s.terminal=true;fail();}s.last=now;return s;}
export function prepareCatalogDiscoveryWindow(value,{now}={}){
 const p=exact(value,['startAt','expiresAt','trialId']);if(!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!hex(p.trialId,64)||!time(now)||now<p.startAt||now>=p.expiresAt)fail();
 const out=freeze({...p,purpose:'afw.catalog-discovery-preparation.v1',invoked:false,maySubscribe:false,operationalReadiness:false});windows.set(out,{last:now,terminal:false});return out;
}
export function createCatalogDiscoveryClient(window,{now}={}){
 clock(window,now);if(window.expiresAt-now<90000)fail();
 return freeze({key:'client:'+target.clientId,expiration:Math.floor(window.expiresAt/1000),value:{clientId:target.clientId,redirectUris:['https://chatgpt.com/connector_platform_oauth_redirect'],clientName:'AFW · piloto de lectura',tokenEndpointAuthMethod:'none',authMethodExplicit:true,grantTypes:['authorization_code'],responseTypes:['code'],registrationDate:Math.floor(window.startAt/1000)},mayInvoke:false});
}
export async function inspectCatalogDiscoveryArtifact(value){
 try{
 const input=exact(value,['v','pin','configurationHash']);
 const pin=freeze(structuredClone(exact(input.pin,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck']))),v=freeze(structuredClone(input.v)),configurationHash=input.configurationHash;
 if(!uuid(pin.baseVersionId)||!['artifactKey','programHash','workerHash'].every(k=>hex(pin[k],64))||!hex(configurationHash,64)||!['sourceRevision','sourceTree'].every(k=>hex(pin[k],40))||pin.sourceCheck!=='git-inputs-before-after-v1'||!Number.isSafeInteger(pin.workerBytes)||pin.workerBytes<1||pin.workerBytes>2097152||v?.id!==pin.baseVersionId||v.main_module!=='index.mjs'||v.modules?.length!==1||v.modules[0].name!=='index.mjs'||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||!Array.isArray(v.urls)||v.urls.length||!Array.isArray(v.bindings)||v.bindings.length!==29||new Set(v.bindings.map(x=>x.name)).size!==29)fail();
 const raw=Uint8Array.from(atob(v.modules[0].content_base64),x=>x.charCodeAt(0));if(raw.length!==pin.workerBytes||await digest(raw)!==pin.workerHash||await digest(JSON.stringify([target.accountId,target.workerName,pin.workerHash]))!==pin.artifactKey)fail();
 for(const b of v.bindings){if(!id(b.name)||!id(b.type))fail();if(b.type==='secret_text')exact(b,['name','type']);}
 const allFlags=v.bindings.filter(x=>/^AFW_.*_ENABLED$/.test(x.name));if(allFlags.length!==8||allFlags.some(b=>!flags.includes(b.name)||b.type!=='plain_text'||b.text!=='false'))fail();
 const byName=Object.fromEntries(v.bindings.map(b=>[b.name,b]));
 for(const [name,text] of Object.entries({AFW_OAUTH_ISSUER:target.issuer,AFW_OAUTH_RESOURCE:target.resource,AFW_OAUTH_PILOT_CLIENT_ID:target.clientId,AFW_OAUTH_PILOT_PROJECT_ID:target.projectId,AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1'}))if(byName[name]?.type!=='plain_text'||byName[name].text!==text)fail();
 if(byName.DB?.type!=='d1'||byName.DB.id!==target.databaseId||byName.OAUTH_KV?.type!=='kv_namespace'||byName.OAUTH_KV.namespace_id!==target.kvId||byName.AFW_DOSSIER_EVENTS_NODE?.type!=='durable_object_namespace'||byName.AFW_DOSSIER_EVENTS_NODE.namespace_id!==target.namespaceId)fail();
 const cfg={};for(const k of configKeys)if(Object.hasOwn(v,k))cfg[k]=v[k];cfg.bindings=v.bindings.map(x=>x.type==='secret_text'?{name:x.name,type:x.type}:x).sort((a,b)=>a.name.localeCompare(b.name));
 if(await digest(canonical(cfg))!==configurationHash)fail();
 const out=freeze({versionId:pin.baseVersionId,workerHash:pin.workerHash,workerBytes:pin.workerBytes,sourceRevision:pin.sourceRevision,configurationHash,mayInvoke:false});bases.set(out,{v:freeze(structuredClone(v)),pin:freeze({...pin})});return out;
 }catch{fail();}
}
function iso(x){const t=Date.parse(x);if(typeof x!=='string'||!time(t)||new Date(t).toISOString()!==x)fail();return t;}
export function inspectCatalogDiscoveryGrant(value){
 const {rows,window,now}=exact(value,['rows','window','now']);clock(window,now);if(!Array.isArray(rows)||rows.length!==1)fail();
 const g=exact(rows[0],['id','user_id','project_owner','client_id','project_id','resource','scopes_json','created_at','expires_at','exchanged_at','revoked_at','closure_count']);
 let scopes;try{scopes=JSON.parse(g.scopes_json);}catch{fail();}
 const created=iso(g.created_at),exchanged=iso(g.exchanged_at),expires=iso(g.expires_at);
 if(!id(g.id)||!id(g.user_id)||g.user_id!==g.project_owner||g.client_id!==target.clientId||g.project_id!==target.projectId||g.resource!==target.resource||g.revoked_at!==''||g.closure_count!==0||!Array.isArray(scopes)||scopes.length!==1||scopes[0]!=='afw:project:read'||created<window.startAt||created>now||exchanged<created||exchanged>now||expires!==window.expiresAt)fail();
 const out=freeze({grantId:g.id,subject:g.user_id,projectId:g.project_id,clientId:g.client_id,resource:g.resource,createdAt:created,expiresAt:expires});grants.set(out,{window});return out;
}
function successor(base,window){
 const text=base.v.bindings.find(x=>x.name==='AFW_DOSSIER_SUCCESSOR_POLICY');if(text?.type!=='plain_text'||typeof text.text!=='string'||text.text.length>8192)fail();
 let parsed;try{parsed=JSON.parse(text.text);}catch{fail();}const p=exact(parsed,['scope','original','candidate','publication']);
 const s=exact(p.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']),o=exact(p.original,['containerId','applicationId','programHash','sourceRevision']);
 if(s.accountId!==target.accountId||s.workerName!==target.workerName||s.namespaceId!==target.namespaceId||s.applicationId!==target.namespaceId||s.resource!==target.resource||!hex(s.ownerRef,64)||!hex(s.projectRef,64)||o.applicationId!==s.applicationId||!hex(o.containerId,64)||!hex(o.programHash,64)||!hex(o.sourceRevision,40))fail();
 // An intended reference, not an activation receipt. This metadata-only plan
 // MUST NEVER be passed to confirmation, reservation or subscribe.
 return {scope:s,original:o,candidate:{trialId:window.trialId,programHash:base.pin.programHash,sourceRevision:base.pin.sourceRevision,startAt:window.startAt,expiresAt:window.expiresAt,budget:1},publication:{artifactKey:base.pin.artifactKey,workerHash:base.pin.workerHash,activationKey:window.trialId}};
}
export function createCatalogDiscoveryVersion(value){
 const keys=Object.hasOwn(value??{},'grant')?['stage','base','window','grant','now']:['stage','base','window','now'];
 const p=exact(value,keys),base=bases.get(p.base);if(!base||!['oauth','catalog'].includes(p.stage))fail();clock(p.window,p.now);
 const replacements={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(p.window.expiresAt).toISOString()};
 if(p.stage==='catalog'){
  if(grants.get(p.grant)?.window!==p.window)fail();
  replacements.AFW_DOSSIER_EVENTS_ENABLED='true';replacements.AFW_DOSSIER_MONITORING_OWNER_ENABLED='true';replacements.AFW_DOSSIER_SUCCESSOR_ENABLED='true';
  replacements.AFW_DOSSIER_EVENTS_POLICY=JSON.stringify({grantId:p.grant.grantId,subject:p.grant.subject,projectId:p.grant.projectId,clientId:p.grant.clientId,resource:p.grant.resource,startAt:p.window.startAt,expiresAt:p.window.expiresAt});
  replacements.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify({grantId:p.grant.grantId,projectId:p.grant.projectId,clientId:p.grant.clientId,startAt:p.window.startAt,expiresAt:p.window.expiresAt});
  replacements.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify(successor(base,p.window));
 }
 const body={main_module:base.v.main_module,modules:structuredClone(base.v.modules),bindings:base.v.bindings.map(b=>Object.hasOwn(replacements,b.name)?{name:b.name,type:'plain_text',text:replacements[b.name]}:{name:b.name,type:'inherit',version_id:base.pin.baseVersionId}),annotations:{'workers/tag':'afw-catalog-discovery-'+p.window.trialId.slice(0,16)+'-'+p.stage,'workers/message':'AFW finite metadata-only preparation; rollback '+base.pin.baseVersionId}};
 body.bindings.push({name:'AFW_DELEGATED_CONTINUITY_ENABLED',type:'plain_text',text:'true'});for(const k of configKeys)if(Object.hasOwn(base.v,k))body[k]=structuredClone(base.v[k]);
 return freeze({payload:body,maySubscribe:false,operationalReadiness:false,invoked:false});
}
