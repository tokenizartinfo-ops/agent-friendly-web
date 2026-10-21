import {readRecord,instant,clock,closed} from './agent-consumption-input.mjs';
const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec';
const WORKFLOW='afw-preparation-client-maintenance',SERVICE='agent-friendly-web-preparation-maintenance';
const CONTRACT='afw.preparation.client-caller.v1';
const KEYS=['method','operationId','issuer','resource','redirectUri','startedAt','expiresAt'];
const STATES=['unstarted','unknown_ack','queued','running','complete','unconfirmed'];
const result=(status,fields={})=>Object.freeze(closed(status,{code:'preparation_client_api_plan',automaticRetry:false,
 authorizationGranted:false,operationalReadiness:false,...fields}));
const blocked=()=>result('blocked',{create:null,inspect:null});
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(value)))),n=>n.toString(16).padStart(2,'0')).join('');

/** Pure trusted-operator request planning, NOT a dispatcher or authorization.
 * The caller still verifies account, resource, active version/policy and custody.
 * State comes from the operator's original attempt record, never a client claim.
 * now is a trusted program/test hook, not an HTTP/event/policy field.
 * REST params must remain an object (official Wrangler/live PB14 behavior).
 */
export async function buildPreparationMaintenanceApiPlan(options){
 try{
  const cfg=readRecord(options,['policy','state','now']),p=readRecord(cfg?.policy,KEYS);
  if(!cfg||!p||KEYS.some(k=>!Object.hasOwn(p,k)||typeof p[k]!=='string')||!STATES.includes(cfg.state))return blocked();
  if(new TextEncoder().encode(JSON.stringify(p)).length>2048||!['register','reconcile'].includes(p.method)
   ||!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(p.operationId))return blocked();
  const issuer=new URL(p.issuer),redirect=new URL(p.redirectUri),start=instant(p.startedAt),end=instant(p.expiresAt);
  if(issuer.protocol!=='https:'||issuer.origin!==p.issuer||p.resource!==p.issuer+'/mcp'
   ||redirect.protocol!=='https:'||redirect.hostname!=='chatgpt.com'||redirect.port||redirect.username||redirect.password||redirect.search||redirect.hash||redirect.href!==p.redirectUri
   ||!(redirect.pathname==='/connector_platform_oauth_redirect'||/^\/connector\/oauth\/[A-Za-z0-9_-]{1,128}$/.test(redirect.pathname))
   ||!clock(start)||!clock(end)||end<=start||end-start>600000)return blocked();
  const now=cfg.now??(()=>Date.now());if(typeof now!=='function')return blocked();
  const before=now();if(!clock(before))return blocked();
  const planHash=await hash([CONTRACT,SERVICE,p.method,p.operationId,p.issuer,p.resource,p.redirectUri,p.startedAt,p.expiresAt]);
  const after=now();if(!clock(after))return blocked();
  const instanceId='afw-prep-'+planHash,path='/accounts/'+ACCOUNT+'/workflows/'+WORKFLOW+'/instances';
  const inspect=Object.freeze({method:'GET',path:path+'/'+instanceId});
  // Never refresh dates or mint an alternative ID after uncertainty/expiry.
  if(cfg.state!=='unstarted'||before<start||before>=end||after<before||after>=end)
   return result('inspect_only',{instanceId,planHash,expiresAt:p.expiresAt,create:null,inspect});
  const body=Object.freeze({instance_id:instanceId,params:Object.freeze({planHash}),
   instance_retention:Object.freeze({success_retention:'1 day',error_retention:'1 day'})});
  return result('planned',{instanceId,planHash,expiresAt:p.expiresAt,create:Object.freeze({method:'POST',path,body}),inspect});
 }catch{return blocked();}
}
