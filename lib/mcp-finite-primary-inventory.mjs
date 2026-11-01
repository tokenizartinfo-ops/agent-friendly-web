import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {restorationConfigurationHash,qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHex as hex,finiteHash as hash,finiteTime as time} from './mcp-finite-evidence.mjs';
const ROOT='/accounts/'+RELEASE_TARGET.accountId;
const fail=()=>{throw Error('Finite primary inventory unavailable');};
const digest=v=>createHash('sha256').update(v).digest('hex');
const date=v=>{if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v))fail();const n=Date.parse(v);if(!time(n)||new Date(n).toISOString()!==v)fail();return n;};
/** Exact approved artifact bytes and configuration; not Workflow.versionId.
 * Static profile compatibility is checked in addition to the pinned digest. */
export function qualifyFiniteWorkerVersion({metadata:v,pin,role,closed}={}){
 const m=validateFiniteModule(pin?.module);
 if(!['qa','canary','operator'].includes(role)||typeof closed!=='boolean'||!v||Object.getPrototypeOf(v)!==Object.prototype||v.id!==pin.versionId||v.main_module!==m.name||!Array.isArray(v.modules)||v.modules.length!==1||v.modules[0].name!==m.name||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||v.modules[0].content_base64.length>Math.ceil(m.bytes/3)*4||!Array.isArray(v.bindings)||v.bindings.length>100||!Array.isArray(v.urls)||v.urls.length)fail();
 const bytes=Buffer.from(v.modules[0].content_base64,'base64');if(bytes.toString('base64')!==v.modules[0].content_base64||bytes.length!==m.bytes||digest(bytes)!==m.sha256)fail();
 const names=new Set();for(const b of v.bindings){
  if(!b||typeof b.name!=='string'||names.has(b.name)||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name))fail();names.add(b.name);
  if(b.type==='secret_text'&&Reflect.ownKeys(b).length!==2)fail();
  if(closed&&b.name.endsWith('_ENABLED')&&(b.type!=='plain_text'||b.text!=='false'))fail();
 }
 if((role==='qa'?qaClosedConfigurationHash(v):restorationConfigurationHash(v))!==pin.configurationHash)fail();
 if(v.compatibility_date!=='2026-09-07'||!Array.isArray(v.compatibility_flags)||!v.compatibility_flags.includes('nodejs_compat'))fail();
 const binding=name=>v.bindings.find(x=>x.name===name);
 if(role==='canary')snapshotOwnWorkerExecution({exports:v.exports,containers:v.containers});
 if(role==='canary'||role==='operator'){
  const db=binding(role==='canary'?'DB':'RELEASE_DB'),node=binding(role==='canary'?'AFW_DOSSIER_EVENTS_NODE':'AFW_RELEASE_EVENTS_NODE');
  if(db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||node.class_name!=='AfwOwnEventNode')fail();
 }else{
  const node=binding('AFW_INDEPENDENT_CLOSURE');if(node?.type!=='durable_object_namespace'||node.class_name!=='IndependentClosure')fail();
 }
 return Object.freeze({versionId:pin.versionId,moduleHash:m.sha256,moduleBytes:m.bytes,configurationHash:pin.configurationHash,closed});
}
/** Complete bounded all-state inventory, not the active count or a 404.
 * API cursor exhaustion is checked; >64 instances/4pages fails closed. */
export function createFiniteProviderInventoryReader({control,request,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan;
 if(p.resources.applicationId!==RELEASE_TARGET.namespaceId||typeof request!=='function'||typeof now!=='function')fail();
 return async({signal,assertCurrent=()=>{}}={})=>{
  if(!(signal instanceof AbortSignal)||signal.aborted||typeof assertCurrent!=='function')fail();
  const entered=now(),mono=performance.now();let last=entered;
  const check=()=>{assertCurrent();const n=now();if(signal.aborted||!time(n)||n<last||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
  const instances=[],seen=new Set(),tokens=new Set();let token;
  for(let page=0;page<4;page++){
   check();const response=await request({method:'GET',path:ROOT+'/containers/applications/'+p.resources.applicationId+'/instances-v2',query:{per_page:100,...(token?{page_token:token}:{})},signal},check);check();
   if(response?.success!==true||response.status!==200||!Array.isArray(response.errors)||response.errors.length||!Array.isArray(response.result)||response.result.length>100)fail();
   const info=fields(response.result_info,['per_page',...['page_token','next_page_token'].filter(k=>Object.hasOwn(response.result_info??{},k))]);
   if(info.per_page!==100||(info.page_token??'')!==(token??''))fail();
   for(const row of response.result){
    if(!row||!hex(row.id)||seen.has(row.id)||row.application_id!==p.resources.applicationId||row.image!=='cloudflare/debian-trixie'||row.status?.state!=='stopped'||row.status.exit_code!==0)fail();
    const startedAt=date(row.started_at),stoppedAt=date(row.status.updated_at);if(stoppedAt<startedAt||stoppedAt>check())fail();seen.add(row.id);
    instances.push({containerId:row.id,applicationId:row.application_id,image:row.image,startedAt,stoppedAt,state:'stopped',exitCode:0});
   }
   if(instances.length>64)fail();
   const next=info.next_page_token;if(next===undefined||next===''){
    instances.sort((a,b)=>a.containerId.localeCompare(b.containerId));
    return Object.freeze({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:check(),instances:Object.freeze(instances),totalCount:instances.length});
   }
   if(page===3||typeof next!=='string'||next.length<1||next.length>1024||/[\x00-\x20\x7f]/.test(next)||tokens.has(next))fail();tokens.add(next);token=next;
  }fail();
 };
}
export const finiteInventoryHash=hash;
