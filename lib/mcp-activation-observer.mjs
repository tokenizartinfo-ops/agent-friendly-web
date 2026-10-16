import {createHash} from 'node:crypto';
import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
import {createPublicationArtifactReader} from './mcp-publication-artifact-reader.mjs';
import {createSuccessorDeploymentReader} from './mcp-successor-deployment-reader.mjs';
const fail=()=>{throw Error('Activation observation unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
const fields=['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'];
function plain(value,depth=0){
 if(depth>20)fail();if(value===null||typeof value==='string'||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
 if(!value||typeof value!=='object'||!Array.isArray(value)&&Object.getPrototypeOf(value)!==Object.prototype)fail();
 const out=Array.isArray(value)?[]:{};for(const k of Reflect.ownKeys(value)){if(Array.isArray(value)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(value,k);if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||k==='__proto__'||k==='toJSON')fail();out[k]=plain(d.value,depth+1);}return out;
}
function snapshot(value){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Object.keys(value).length!==fields.length||fields.some(k=>!Object.hasOwn(value,k)))fail();
 const copy=plain(value);if(canonical(copy).length>262144)fail();if(!Array.isArray(copy.bindings)||copy.bindings.length>100||copy.bindings.length<1||new Set(copy.bindings.map(b=>b?.name)).size!==copy.bindings.length||copy.main_module!=='index.mjs'||copy.compatibility_date!=='2026-09-07'||canonical(copy.compatibility_flags)!==canonical(['nodejs_compat','global_fetch_strictly_public'])||copy.usage_model!=='standard')fail();
 try{Object.assign(copy,snapshotOwnWorkerExecution(copy));}catch{fail();}
 for(const b of copy.bindings){if(typeof b?.name!=='string'||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name)||!['plain_text','secret_text','d1','kv_namespace','durable_object_namespace','ratelimit'].includes(b.type))fail();if(b.type==='secret_text'&&(Object.keys(b).length!==2||!Object.hasOwn(b,'name')||!Object.hasOwn(b,'type')))fail();}
 copy.bindings.sort((a,b)=>a.name.localeCompare(b.name));return copy;
}
export const activationConfigurationHash=value=>createHash('sha256').update(canonical(snapshot(value))).digest('hex');
/** Operator-only GET observer. Configuration is approved before activation;
 * generated version/deployment IDs are supplied afterwards, never embedded in
 * Worker policy. Secret values are neither required nor returned. */
export function createActivationObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={}){
 if(!uuid(versionId)||!uuid(deploymentId)||typeof readCredential!=='function'||typeof fetchImpl!=='function')fail();
 const approved=snapshot(configuration),configurationHash=activationConfigurationHash(approved);
 return async(input,signal)=>{
  if(!(signal instanceof AbortSignal)||signal.aborted||input.configurationHash!==configurationHash)fail();
  const {accountId,workerName,workerHash,scopeHash,sourceRevision,programHash}=input;
  // Construct validated fixed-target readers before any provider request.
  const bytes=createPublicationArtifactReader({accountId,workerName,moduleName:'index.mjs',workerHash,readCredential,fetchImpl});
  const observed=await bytes({accountId,workerName,versionId},signal);if(signal.aborted)fail();
  const deployment=createSuccessorDeploymentReader({pins:{accountId,workerName,namespaceId,applicationId,deploymentId,versionId,etag:observed.etag,scopeHash,sourceRevision,programHash},readCredential,fetchImpl});
  const controller=new AbortController();let timer,rejectCancel,stream;
  const cancel=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Activation observation unavailable'));};signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Activation observation unavailable'));},5000);});
  const read=async()=>{
   const credential=await readCredential();if(controller.signal.aborted||signal.aborted||typeof credential!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(credential))fail();
   const r=await fetchImpl('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/workers/workers/'+workerName+'/versions/'+versionId,{method:'GET',redirect:'manual',cache:'no-store',signal:controller.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'}});
   if(controller.signal.aborted||r.status!==200||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??'')||r.headers.has('Age')&&r.headers.get('Age')!=='0'||r.headers.has('CF-Cache-Status')&&!['DYNAMIC','BYPASS','MISS'].includes(r.headers.get('CF-Cache-Status').toUpperCase()))fail();
   stream=r.body.getReader();const chunks=[];let size=0;for(;;){const part=await stream.read();if(controller.signal.aborted)fail();if(part.done)break;size+=part.value.length;if(size>262144)fail();chunks.push(part.value);}stream.releaseLock();stream=null;
   const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),v=envelope.result;if(envelope.success!==true||!Array.isArray(envelope.errors)||envelope.errors.length||v?.id!==versionId)fail();
   const allowed=['id','number','startup_time_ms',...fields,'annotations','urls','source','created_on','env','author_id','author_email','modules'];if(Object.keys(v).some(k=>!allowed.includes(k)))fail();
   if(v.env!==undefined&&(!v.env||typeof v.env!=='object'||Array.isArray(v.env)||Object.keys(v.env).length!==v.bindings?.length||Object.keys(v.env).some(n=>!v.bindings.some(b=>b.name===n))))fail();
   const actual=Object.fromEntries(fields.map(k=>[k,v[k]??(k==='containers'?[]:k==='usage_model'?'standard':undefined)]));if(activationConfigurationHash(actual)!==configurationHash)fail();
  };
  try{await Promise.race([read(),deadline,cancel]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();if(stream)Promise.resolve(stream.cancel()).catch(()=>{});}
  if(signal.aborted)fail();await deployment({signal});if(signal.aborted)fail();return Object.freeze({versionId,deploymentId,etag:observed.etag,configurationHash});
 };
}
