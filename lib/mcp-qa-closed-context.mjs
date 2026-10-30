import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
const compiledRevision=typeof globalThis.__AFW_QA_SOURCE_REVISION__==='string'?globalThis.__AFW_QA_SOURCE_REVISION__:'';
export const PRIVATE_QA_CLOSED_FLAGS=Object.freeze(['AFW_QA_HTTP_ENABLED','AFW_QA_BOOTSTRAP_ENABLED','AFW_QA_CHALLENGE_ENABLED','AFW_MCP_CLOSURE_ENABLED','AFW_MCP_READER_PROBE_ENABLED','AFW_MCP_PUBLISHER_PROBE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_QA_ORIGINALS_ENABLED','AFW_QA_PROVIDER_OBSERVATION_ENABLED','AFW_QA_PRIMARY_RESERVATION_ENABLED','AFW_QA_INSTALLATION_ENABLED','AFW_QA_PRIMARY_CATALOG_ENABLED','AFW_QA_PRIMARY_ADMISSION_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED']);
const SLOT='afw-own-successor-closure-v1',purpose='afw.qa-closed-context.v1';
const blocked=()=>({purpose,status:'blocked',authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
const fail=()=>{throw Error('Closed QA context unavailable');};
function data(value,key){if(!value||typeof value!=='object')fail();const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function exact(value,keys){if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,data(value,k)]));}
function request(raw){
 const p=exact(raw,['operation','expectedVersionId','expectedSourceRevision']);
 if(p.operation!=='observe_closed_context'||!/^[a-f0-9]{40}$/.test(compiledRevision)||p.expectedSourceRevision!==compiledRevision)fail();
 return p;
}
function clock(env,payload,context){
 const wall=Date.now(),mono=performance.now();let lastWall=wall,lastMono=mono,finished=false;
 if(!Number.isSafeInteger(wall)||!Number.isFinite(mono)||mono<0)fail();
 const pin=createPrivateQaExecutionPin({env,expectedVersionId:payload.expectedVersionId,sourceRevision:compiledRevision,context});
 const check=()=>{
  if(finished)fail();const w=Date.now(),m=performance.now();
  if(!Number.isSafeInteger(w)||!Number.isFinite(m)||w<lastWall||m<lastMono||w-wall>=5000||m-mono>=5000)fail();
  lastWall=w;lastMono=m;pin.assertCurrent();
  for(const key of PRIVATE_QA_CLOSED_FLAGS)if(data(env,key)!=='false')fail();
 };
 check();return {check,finish(){finished=true;},snapshot:pin.snapshot};
}
function receipt(pin,context){const p=pin.snapshot();return {purpose,status:'observed',runtimeVersionId:p.runtimeVersionId,sourceRevision:p.sourceRevision,context,allClosed:true,authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false};}
function namespace(env){const ns=data(env,'AFW_INDEPENDENT_CLOSURE');if(typeof ns?.idFromName!=='function'||typeof ns?.get!=='function')fail();return ns;}
/** Metadata-only fixed actor observation. No storage access, authority or liveness. */
export function observePrivateQaClosedActor({env,ctx,payload}){
 let lease;
 try{
  const p=request(payload);lease=clock(env,p,'durable_object');
  const ns=namespace(env),expected=ns.idFromName(SLOT).toString(),actual=ctx?.id?.toString();
  if(!/^[a-f0-9]{64}$/.test(expected)||actual!==expected)fail();
  lease.check();return receipt(lease,'durable_object');
 }catch{return blocked();}finally{lease?.finish();}
}
function actorReceipt(raw,payload){
 if(typeof raw!=='string'||new TextEncoder().encode(raw).length>1024)fail();
 const r=exact(JSON.parse(raw),['purpose','status','runtimeVersionId','sourceRevision','context','allClosed','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry']);
 if(r.purpose!==purpose||r.status!=='observed'||r.runtimeVersionId!==payload.expectedVersionId||r.sourceRevision!==compiledRevision||r.context!=='durable_object'||r.allClosed!==true||r.authorizesEffects!==false||r.guardLivenessVerified!==false||r.operationalReadiness!==false||r.mayRetry!==false)fail();
 return r;
}
/** Deliberately rejects nominal {planHash}. Only closed diagnostic is mounted. */
export async function runPrivateQaClosedContext({env,event,step}){
 let lease,timer;
 try{
  const p=request(event?.payload);lease=clock(env,p,'workflow');
  if(event.instanceId!=='afw-qa-context-'+p.expectedVersionId+'-'+compiledRevision.slice(0,16)||typeof step?.do!=='function')fail();
  const ns=namespace(env);let executedHere=false;
  const work=async()=>{
   lease.check();
   const r=await step.do('observe-closed-qa-context',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{
    executedHere=true;lease.check();
    const actor=ns.get(ns.idFromName(SLOT));lease.check();
    const raw=await actor.observeOwnQaClosedContext(p);lease.check();
    return actorReceipt(raw,p);
   });
   lease.check();if(!executedHere)fail();
   // Recheck the cached/transport result too, never trust a step DTO as authority.
   const actor=actorReceipt(JSON.stringify(r),p),result={...receipt(lease,'workflow'),actor};
   if(new TextEncoder().encode(JSON.stringify(result)).length>1024)fail();
   lease.check();return result;
  };
  return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{lease.finish();reject(Error('Closed QA context expired'));},5000);})]);
 }catch{return blocked();}finally{clearTimeout(timer);lease?.finish();}
}
