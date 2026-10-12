import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
import {snapshotMcpSubscriptionRequest} from './mcp-subscription-lifecycle.mjs';
const fail=()=>{throw Error('Dossier event RPC unavailable');};
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
export const OWN_EVENT_NODE_NAME='afw-own-event-one-occurrence-v1';
const names=['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_EVENTS_NODE_NAME','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','DB','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_EVENTS_NODE'];
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const ds=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(ds);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(ds[k],'value')||!ds[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,ds[k].value]));}
/** INTERNAL shared server policy, not an endpoint or grant initializer. */
export function readDossierEventHostPolicy({enabled,env,now=Date.now,historical=false}={}){
 if(enabled!==true)fail();if(typeof historical!=='boolean'||typeof now!=='function'||(historical?!['true','false'].includes(env?.AFW_DOSSIER_EVENTS_ENABLED):env?.AFW_DOSSIER_EVENTS_ENABLED!=='true'))fail();
 const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]]))),raw=pins.AFW_DOSSIER_EVENTS_POLICY;
 const named=pins.AFW_DOSSIER_EVENTS_NODE_NAME!==undefined;if(named&&pins.AFW_DOSSIER_EVENTS_NODE_NAME!==OWN_EVENT_NODE_NAME)fail();
 if(typeof raw!=='string'||raw.length>4096)fail();const parsed=exact(JSON.parse(raw),['grantId','subject','projectId','clientId','resource',...(!named?['containerId']:[]),'startAt','expiresAt']);
 if(named){const binding=pins.AFW_DOSSIER_EVENTS_NODE;if(typeof binding?.idFromName!=='function')fail();parsed.containerId=binding.idFromName(OWN_EVENT_NODE_NAME).toString();}
 const p=Object.freeze(parsed);
 if(!['grantId','subject','projectId','clientId','resource'].every(k=>id(p[k]))||typeof p.containerId!=='string'||!/^[0-9a-f]{64}$/.test(p.containerId)||!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||p.clientId!==pins.AFW_OAUTH_PILOT_CLIENT_ID||p.projectId!==pins.AFW_OAUTH_PILOT_PROJECT_ID||p.resource!==pins.AFW_OAUTH_RESOURCE||p.resource!==pins.AFW_OAUTH_ISSUER+'/mcp'||new URL(pins.AFW_OAUTH_ISSUER).origin!==pins.AFW_OAUTH_ISSUER||typeof pins.DB?.prepare!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.idFromString!=='function'||typeof pins.AFW_DOSSIER_EVENTS_NODE?.get!=='function')fail();
 const prepare=pins.DB.prepare,session=pins.DB.withSession,binding=pins.AFW_DOSSIER_EVENTS_NODE,idFromString=binding.idFromString,idFromName=binding.idFromName,get=binding.get;let last=-1;
 const current=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t<last||!historical&&(t<p.startAt||t>=p.expiresAt)||!names.every(k=>env[k]===pins[k])||pins.DB.prepare!==prepare||pins.DB.withSession!==session||binding.idFromString!==idFromString||binding.idFromName!==idFromName||binding.get!==get)fail();last=t;};current();
 return Object.freeze({policy:p,pins,current});
}

/** INTERNAL OAuth-validated caller only. No project/namespace from MCP args. */
export function createDossierEventRpcAuthority({enabled,env,context,projectId,resource,now=Date.now}={}){
 if(enabled!==true)fail();const c=exact(context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(c.scopes)||c.scopes.some(s=>typeof s!=='string')||!c.scopes.includes('afw:project:read'))fail();c.scopes=Object.freeze([...c.scopes]);Object.freeze(c);
 const {policy:p,pins,current}=readDossierEventHostPolicy({enabled,env,now});if(['grantId','subject','clientId','resource'].some(k=>c[k]!==p[k])||projectId!==p.projectId||resource!==p.resource)fail();
 const readAuthorization=createDossierMonitoringAuthorization({db:pins.DB,context:c,projectId,projectionSecret:pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,now});
 const authorize=async monitor=>{current();const a=await readAuthorization();current();if(monitor&&!a.enabled)fail();return a;};
 const stub=()=>{current();const namespace=pins.AFW_DOSSIER_EVENTS_NODE,nodeId=namespace.idFromString(p.containerId);if(nodeId.toString()!==p.containerId)fail();return namespace.get(nodeId);};
 const call=async(method,args,monitor=false)=>{const a=await authorize(monitor),s=stub();if(typeof s?.[method]!=='function')fail();current();const result=await s[method](...args),b=await authorize(monitor);if(['principalRef','resourceRef','projectRef','permissionRef'].some(k=>a[k]!==b[k]))fail();return{result,authorization:b};};
 const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
 return Object.freeze({
  list:safe(async()=>{const a=await authorize(false);if(!a.enabled)return null;const {result,authorization}=await call('list',[],false);if(result!==null&&(result!==authorization.projectRef||!authorization.enabled))fail();return result;}),
  subscribe:safe(async value=>{const p=snapshotMcpSubscriptionRequest(value),a=await authorize(true);if(p.arguments.projectRef!==a.projectRef)fail();return(await call('subscribe',[p],true)).result;}),
  unsubscribe:safe(async value=>{const p=snapshotMcpSubscriptionRequest(value,false),a=await authorize(false);if(p.arguments.projectRef!==a.projectRef)fail();return(await call('unsubscribe',[p],false)).result;}),
 });
}
