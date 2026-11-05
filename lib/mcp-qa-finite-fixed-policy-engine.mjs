import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {activationConfigurationHash,finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/',W='agent-friendly-web-delegated-canary',MAX=4718592;
const fail=()=>{throw Error('Finite policy transport unavailable');};
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
function configurationProjection(v){
 return Object.fromEntries(['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'].map(k=>[k,v[k]]));
}
function configuration(v){
 const c=configurationProjection(v);finiteActivationConfigurationHash(c);return data(c);
}
function historicalConfiguration(v){
 const c=configurationProjection(v);activationConfigurationHash(c);return data(c);
}

/** Internal fixed provider operations. Admission and source remain with callers. */
export function createFiniteFixedPolicyEngine({ctx,env},guard){
 const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
 let failed=false;
 const check=c=>{
  if(failed)fail();
  try{
   guard();if(c)current(c);
   if(ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishToken)fail();
  }catch(error){failed=true;throw error;}
 };
 const invoke=async(c,operation)=>{try{check(c);const value=await operation();check(c);return value;}catch(error){failed=true;throw error;}};
 async function http(method,path,body,c){
  check(c);const token=method==='GET'?readToken:publishToken;
  if(typeof token!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(token)||typeof fetcher!=='function'){failed=true;fail();}
  let rejectKnown;
  const knownFailure=new Promise((_,reject)=>{rejectKnown=reject;});
  // work, fetch, read and cancel are their actual native Promises, retained
  // separately from the logical first failure. Cancellation is never drain.
  const work=retain((async()=>{
   let response,reader;
   try{
    response=await retain(fetcher(path,{method,redirect:'manual',cache:'no-store',signal:c.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body?{body:JSON.stringify(body)}:{})}));
    check(c);
    if(!(response instanceof Response)||response.redirected||!(method==='GET'?response.status===200:[200,201].includes(response.status))||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type')??''))fail();
    const age=response.headers.get('Age'),cache=response.headers.get('CF-Cache-Status'),length=response.headers.get('Content-Length');
    if(age!==null&&age!=='0'||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX))fail();
    reader=response.body.getReader();const chunks=[];let size=0;
    for(;;){const part=await retain(reader.read());check(c);if(part.done)break;size+=part.value.byteLength;if(size>MAX)fail();chunks.push(part.value);}
    const raw=Buffer.concat(chunks,size);check(c);
    return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)));
   }catch(error){failed=true;rejectKnown(error);throw error;}
   finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
  })());
  return Promise.race([work,knownFailure]);
 }
 function pointer(value,versionId,deploymentId){
  const deployment=value?.deployments?.[0];
  if(!Array.isArray(value?.deployments)||value.deployments.length!==1||deployment?.id!==deploymentId||deployment.strategy!=='percentage'||!Array.isArray(deployment.versions)||deployment.versions.length!==1||deployment.versions[0].version_id!==versionId||deployment.versions[0].percentage!==100)fail();
 }
 function wire(config,baselineId,bytes){
  if(!uuid(baselineId)||!(bytes instanceof Uint8Array)||bytes.byteLength<1||bytes.byteLength>3145728)fail();
  const value=configuration(config),out={...value,containers:value.containers.map(({class_name})=>({class_name})),bindings:value.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:'inherit',version_id:baselineId}:b),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}]};
  for(const binding of out.bindings)if(binding.type==='inherit')fields(binding,['name','type','version_id']);
  return out;
 }
 function describeUpload({configuration,baselineVersionId,bytes}){
  check();
  try{return Object.freeze({method:'POST',path:ROOT+'workers/'+W+'/versions?deploy=false',body:wire(configuration,baselineVersionId,bytes)});}
  catch(error){failed=true;throw error;}
 }
 function describeActivation({versionId}){
  check();if(!uuid(versionId)){failed=true;fail();}
  return Object.freeze({method:'POST',path:ROOT+'scripts/'+W+'/deployments',body:{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}});
 }
 function result(value){
  if(!uuid(value?.id))fail();
  const reconciliation=value.exports_reconciliation;
  if(reconciliation!==undefined&&(!reconciliation||Object.keys(reconciliation).some(k=>!['created','deleted','renamed','transfer_pending','transferred','updated','removable_entries','info','warnings'].includes(k))||Object.entries(reconciliation).some(([key,items])=>!Array.isArray(items)||(key==='updated'?items.some(x=>x!=='AfwOwnEventNode'):items.length>0))))fail();
  return value;
 }
 return Object.freeze({
  describeUpload,
  upload(input,c){return invoke(c,async()=>{const request=describeUpload(input);return result(await http(request.method,request.path,request.body,c));});},
  describeActivation,
  activate(input,c){return invoke(c,async()=>{const request=describeActivation(input);return result(await http(request.method,request.path,request.body,c));});},
  readPointer(pin,c){return invoke(c,async()=>{if(!uuid(pin.versionId)||!uuid(pin.deploymentId))fail();pointer(await http('GET',ROOT+'scripts/'+W+'/deployments?per_page=1',null,c),pin.versionId,pin.deploymentId);});},
  readVersion(pin,c,closed=false){return invoke(c,async()=>{
   if(!uuid(pin.versionId))fail();
   const value=await http('GET',ROOT+'workers/'+W+'/versions/'+pin.versionId+'?include=modules',null,c);check(c);
   qualifyFiniteWorkerVersion({metadata:value,pin:{versionId:pin.versionId,module:pin.module,configurationHash:restorationConfigurationHash(pin.configuration)},role:'canary',closed});
   if(closed){if(activationConfigurationHash(historicalConfiguration(value))!==activationConfigurationHash(historicalConfiguration(pin.configuration)))fail();}
   else if(finiteActivationConfigurationHash(configuration(value))!==finiteActivationConfigurationHash(configuration(pin.configuration)))fail();
   return value;
  });}
 });
}
