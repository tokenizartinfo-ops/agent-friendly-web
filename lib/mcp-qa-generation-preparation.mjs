import {createHash} from 'node:crypto';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
import {createPrivateQaGenerationDraftReader,decodePrivateQaGenerationDraft} from './mcp-qa-generation-draft-reader.mjs';
import {materializePrivateQaLegacyPredecessor,validatePrivateQaLegacyHistoricalContext} from './mcp-qa-legacy-predecessor.mjs';
import {createPrivateQaOriginalPinsReader} from './mcp-qa-original-pins.mjs';
import {createPrivateQaHistoricalIdentityReader} from './mcp-qa-historical-identity.mjs';
import {assemblePrivateQaNamedPacket} from './mcp-qa-named-packet-assembly.mjs';
import {validateReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
import {compiledQaSourceRevision,compiledQaArtifactContext,compiledQaHistoricalContext} from './mcp-qa-private-context.mjs';
const PURPOSE='afw.qa-generation-preparation-observation.v1',SLOT='afw-own-successor-closure-v1';
const LEGACY='afw.canary-restoration-control.v1',HEAD='afw.qa-generation-head.v2';
const journalKeys=['afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1'];
const policyKeys=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const optionKeys=['env','ctx','sourceRevision','artifactContext','historicalContext','now','timeoutMs'];
const fail=()=>{throw Error('Private QA generation preparation unavailable');};
const hash=s=>createHash('sha256').update(s).digest('hex');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const blocked=()=>({purpose:PURPOSE,status:'blocked',authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));}
// Copy only literal data without getters/toJSON; undefined represents absent KV.
function literal(v,depth=0,budget={n:0,bytes:0}){
 if(++budget.n>4096||depth>16)fail();
 if(v===undefined||v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(typeof v==='string'){budget.bytes+=Buffer.byteLength(v);if(budget.bytes>49152)fail();return v;}
 if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
 const out=Array.isArray(v)?[]:{};for(const k of Reflect.ownKeys(v)){if(Array.isArray(v)&&k==='length')continue;if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();out[k]=literal(data(v,k),depth+1,budget);}return Object.freeze(out);
}
function closed(env){
 for(const k of Object.keys(env))if(/^AFW_(QA|MCP)_.*_ENABLED$/.test(k)&&!PRIVATE_QA_CLOSED_FLAGS.includes(k))fail();
 if(PRIVATE_QA_CLOSED_FLAGS.some(k=>data(env,k)!=='false')||policyKeys.some(k=>data(env,k)!==''))fail();
}
function lease(env,sourceRevision,context,now,timeoutMs,parent){
 const entered=now(),origin=performance.now();if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000||!Number.isFinite(origin)||origin<0)fail();
 const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id'),pin=createPrivateQaExecutionPin({env,expectedVersionId:version,sourceRevision,context});let lastWall=entered,lastMono=origin,finished=false;closed(env);
 const current=()=>{const at=now(),mono=performance.now();if(finished||parent?.aborted||!time(at)||at<lastWall||at>=entered+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs||data(env,'AFW_QA_VERSION')!==metadata)fail();closed(env);pin.assertCurrent();lastWall=at;lastMono=mono;return at;};
 current();return{current,remaining(){current();return Math.floor(Math.min(entered+timeoutMs-lastWall,origin+timeoutMs-lastMono));},finish(){finished=true;},version,end:entered+timeoutMs};
}
async function bounded(l,parent,controller,work,settle=()=>l.current()){
 let timer,onAbort;
 try{
  const stop=new Promise((_,reject)=>{onAbort=()=>{l.finish();controller.abort();reject(Error('Private QA generation preparation unavailable'));};parent.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,Math.max(1,l.remaining()));});
  const result=await Promise.race([stop,work()]);settle();return result;
 }catch{fail();}finally{clearTimeout(timer);if(onAbort)parent.removeEventListener('abort',onAbort);controller.abort();l.finish();}
}
function fixedContext(value){
 const c=fields(value,['artifact','receipt']),a=fields(c.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']),r=fields(c.receipt,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck']);
 if(typeof a.script!=='string'||Buffer.byteLength(a.script)>2097152)fail();
 const order=Object.keys(c.artifact).join('|'),artifact=Object.freeze(Object.fromEntries(Object.keys(c.artifact).map(k=>[k,a[k]]))),receipt=Object.freeze({...r});
 return{artifact,receipt,current(){const v=fields(value,['artifact','receipt']);if(v.artifact!==c.artifact||v.receipt!==c.receipt||Object.keys(v.artifact).join('|')!==order)fail();const aa=fields(v.artifact,Object.keys(a)),rr=fields(v.receipt,Object.keys(r));if(Object.keys(a).some(k=>aa[k]!==a[k])||Object.keys(r).some(k=>rr[k]!==r[k]))fail();}};
}
/** PRIVATE internal data only. No public RPC may return this result.
 * This first-legacy observer is read-only and strictly denies every V2 record.
 * Actual current consent, complete history/budget, ARM and effects are separate.
 * Explicit QA and dossier bindings, compiled contexts and native execution pins
 * must be independently verified at publication; metadata alone is not proof. */
export function createPrivateQaGenerationPreparation(options){
 const pinned=fields(options,optionKeys),{env,ctx,sourceRevision,artifactContext,historicalContext,now,timeoutMs}=pinned;
 if(!env||!ctx||!hex(sourceRevision,40)||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 async function prepare(args){
  if(args.length!==2||!hex(args[0])||!(args[1] instanceof AbortSignal)||args[1].aborted)fail();
  const [namedBundleHash,parent]=args,controller=new AbortController();let l;
  try{
   l=lease(env,sourceRevision,'durable_object',now,timeoutMs,parent);
   const fixed=fixedContext(artifactContext),historical=literal(validatePrivateQaLegacyHistoricalContext(historicalContext)),historicalJson=JSON.stringify(historical);
   const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id,idString=id?.toString,self=data(env,'AFW_INDEPENDENT_CLOSURE'),select=self?.idFromName,node=data(env,'AFW_MCP_CLOSURE_NODE'),nodeName=node?.idFromName,nodeString=node?.idFromString,qa=data(env,'AFW_QA_DB'),dossier=data(env,'AFW_QA_DOSSIER_DB');
   if(typeof transaction!=='function'||typeof idString!=='function'||typeof select!=='function'||typeof nodeName!=='function'||typeof nodeString!=='function'||qa===dossier)fail();
   const actor=Reflect.apply(idString,id,[]);if(!hex(actor))fail();
   const current=()=>{l.current();const p=fields(options,optionKeys);if(optionKeys.some(k=>p[k]!==pinned[k]))fail();fixed.current();if(JSON.stringify(literal(validatePrivateQaLegacyHistoricalContext(historicalContext)))!==historicalJson||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString!==idString||Reflect.apply(idString,id,[])!==actor||data(env,'AFW_INDEPENDENT_CLOSURE')!==self||self.idFromName!==select||Reflect.apply(select,self,[SLOT]).toString()!==actor||data(env,'AFW_MCP_CLOSURE_NODE')!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||data(env,'AFW_QA_DB')!==qa||data(env,'AFW_QA_DOSSIER_DB')!==dossier)fail();return l.current();};
   const remaining=()=>{current();const value=l.remaining();if(value<1)fail();return value;};
   const snapshot=async()=>{current();const result=await Reflect.apply(transaction,storage,[async t=>{
    const get=t?.get,list=t?.list;if(typeof get!=='function'||typeof list!=='function')fail();
    const checked=()=>{current();if(t.get!==get||t.list!==list)fail();},read=async k=>{checked();const v=await Reflect.apply(get,t,[k]);checked();return literal(v);};
    const control=await read(LEGACY),rows=[];for(const k of journalKeys)rows.push(await read(k));if(await read(HEAD)!==undefined)fail();
    for(const prefix of ['afw.qa-generation-info.v2:','afw.qa-generation-control.v2:']){checked();const v=await Reflect.apply(list,t,[{prefix,limit:33}]);checked();if(!(v instanceof Map)||v.size!==0)fail();}
    return Object.freeze({control,journals:Object.freeze({restoration:rows[0],retirement:rows[1],preparedDispatch:rows[2],reductionDispatch:rows[3]})});
   }]);current();return result;};
   const readDraft=async()=>{const raw=await createPrivateQaGenerationDraftReader({db:qa,now:current,timeoutMs:remaining()}).read(namedBundleHash,controller.signal);current();if(raw===null)fail();return raw;};
   return await bounded(l,parent,controller,async()=>{
    current();const draftJson=await readDraft(),draft=decodePrivateQaGenerationDraft(draftJson),first=await snapshot(),firstJson=JSON.stringify(first);
    const material=materializePrivateQaLegacyPredecessor({artifact:fixed.artifact,historicalContext:historical,control:first.control,journals:first.journals,namedPolicyJson:draft.historicalNamedPolicy,dispatchPolicyJson:draft.historicalDispatchPolicy,at:current()});
    const policy=JSON.parse(draft.namedPolicy);validateReleaseOperatorBundle({artifact:fixed.artifact,policy});if(policy.operation!=='confirm_named'||JSON.stringify(policy)!==draft.namedPolicy)fail();
    const event=JSON.parse(policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY')?.text);
    const capsuleJson=JSON.stringify({purpose:'afw.qa-generation-capsule.v2',predecessor:material.predecessor,trialId:policy.plan.trialId,grantId:event.grantId,eventId:draft.eventId,closurePolicyHash:hash(draft.closurePolicy),bundleHash:namedBundleHash,cancellationHistoryHash:hash(draft.cancellationHistory),startAt:policy.startAt,expiresAt:policy.expiresAt});
    const packetJson=JSON.stringify({purpose:'afw.qa-named-data-packet.v1',generationCapsule:capsuleJson,namedPolicy:draft.namedPolicy,closurePolicy:draft.closurePolicy,cancellationHistory:draft.cancellationHistory});
    const assembled=assemblePrivateQaNamedPacket({packetJson,expectedCapsule:capsuleJson,artifact:fixed.artifact,receipt:fixed.receipt,namespace:node});current();
    const manifest=JSON.parse(policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text),oldPolicy=JSON.parse(draft.historicalNamedPolicy),oldManifest=JSON.parse(oldPolicy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text);
    if(['containerId','applicationId','programHash','sourceRevision'].some(k=>manifest.original[k]!==oldManifest.original[k]))fail();
    const window={startAt:policy.startAt,expiresAt:policy.expiresAt},authorize=async()=>{current();return true;};
    const originalPins=await createPrivateQaOriginalPinsReader({db:dossier,original:manifest.original,window,authorize,now:current,timeoutMs:remaining()}).read();current();
    if(await createPrivateQaHistoricalIdentityReader({db:dossier,scope:material.historicalScope,candidate:JSON.parse(first.control.policy).candidate,original:originalPins,window,authorize,now:current,timeoutMs:remaining()}).check(controller.signal)!==true)fail();current();
    if(await readDraft()!==draftJson||JSON.stringify(await snapshot())!==firstJson)fail();current();
    const result=Object.freeze({purpose:'afw.qa-private-generation-prepared.v1',packetJson,capsuleJson,namedBundleHash:assembled.namedBundleHash,generationPlanHash:assembled.generationPlanHash,packetHash:assembled.packetHash,originalPins,runtimeVersionId:l.version,sourceRevision,artifactSourceRevision:fixed.artifact.sourceRevision,artifactWorkerHash:fixed.artifact.workerHash,historicalContextHash:hash(historicalJson),d1IdentityCorrelationVerified:true,retainedUncertainty:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});current();return result;
   },current);
  }catch{fail();}finally{controller.abort();l?.finish();}
 }
 return Object.freeze({prepare(...args){return prepare(args);}});
}
const receiptKeys=['purpose','status','namedBundleHash','generationPlanHash','packetHash','runtimeVersionId','sourceRevision','artifactSourceRevision','artifactWorkerHash','historicalContextHash','d1IdentityCorrelationVerified','retainedUncertainty','allClosed','context','authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'];
function receipt(raw,expected,source,version,artifact,historical){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>2048)fail();const r=fields(JSON.parse(raw),receiptKeys);
 if(r.purpose!==PURPOSE||r.status!=='observed'||r.namedBundleHash!==expected||!hex(r.generationPlanHash)||!hex(r.packetHash)||r.runtimeVersionId!==version||r.sourceRevision!==source||r.artifactSourceRevision!==data(artifact,'sourceRevision')||r.artifactWorkerHash!==data(artifact,'workerHash')||r.historicalContextHash!==hash(JSON.stringify(historical))||r.d1IdentityCorrelationVerified!==true||r.retainedUncertainty!==true||r.allClosed!==true||r.context!=='durable_object'||['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'].some(k=>r[k]!==false))fail();return r;
}
/** RPC-facing metadata only, never return the private prepared object. */
export async function observePrivateQaGenerationPreparation(options){
 let l;const controller=new AbortController(),parent=new AbortController();
 try{
  const p=fields(options,[...optionKeys,'args']),args=p.args;if(!Array.isArray(args)||![1,2].includes(args.length)||!hex(args[0]))fail();
  const base=Object.fromEntries(optionKeys.map(k=>[k,p[k]])),at=p.now();let timeout=p.timeoutMs;
  if(args.length===2){if(!time(args[1])||args[1]<=at||args[1]>at+5000)fail();timeout=Math.min(timeout,args[1]-at);}
  l=lease(p.env,p.sourceRevision,'durable_object',p.now,timeout,parent.signal);
  return await bounded(l,parent.signal,controller,async()=>{const prepared=await createPrivateQaGenerationPreparation({...base,timeoutMs:l.remaining()}).prepare(args[0],controller.signal);l.current();
   const result={purpose:PURPOSE,status:'observed',...Object.fromEntries(['namedBundleHash','generationPlanHash','packetHash','runtimeVersionId','sourceRevision','artifactSourceRevision','artifactWorkerHash','historicalContextHash','d1IdentityCorrelationVerified','retainedUncertainty'].map(k=>[k,prepared[k]])),allClosed:true,context:'durable_object',authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
   const raw=JSON.stringify(result);receipt(raw,args[0],p.sourceRevision,l.version,p.artifactContext.artifact,p.historicalContext);l.current();return raw;
  });
 }catch{return JSON.stringify(blocked());}finally{controller.abort();parent.abort();l?.finish();}
}
export async function readPrivateQaGenerationPreparation({env,ctx,args}){
 return observePrivateQaGenerationPreparation({env,ctx,args,sourceRevision:compiledQaSourceRevision,artifactContext:compiledQaArtifactContext,historicalContext:compiledQaHistoricalContext,now:Date.now,timeoutMs:5000});
}
/** Native event timestamp fixes the entire request deadline; no cached step
 * callback, retry, actor selection or raw private data crosses this wrapper. */
export async function runPrivateQaGenerationPreparation({env,event,step}){
 let l;const parent=new AbortController(),controller=new AbortController();
 try{
  const raw=event?.payload;if(typeof raw==='string'&&Buffer.byteLength(raw)>256)fail();
  const p=fields(typeof raw==='string'?JSON.parse(raw):raw,['operation','namedBundleHash']),stepDo=step?.do;
  if(p.operation!=='observe_generation_preparation'||!hex(p.namedBundleHash)||event.instanceId!=='afw-qa-generation-prepare-'+p.namedBundleHash||typeof stepDo!=='function'||!compiledQaArtifactContext||!compiledQaHistoricalContext)fail();
  const at=Date.now(),stamp=event.timestamp instanceof Date?Date.prototype.getTime.call(event.timestamp):NaN;
  if(!time(stamp)||stamp>at||at-stamp>=5000)fail();
  l=lease(env,compiledQaSourceRevision,'workflow',Date.now,Math.min(5000,stamp+5000-at),parent.signal);
  const ns=data(env,'AFW_INDEPENDENT_CLOSURE'),select=ns?.idFromName,get=ns?.get;if(typeof select!=='function'||typeof get!=='function')fail();let executedHere=false;
  const current=()=>{l.current();if(data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||ns.idFromName!==select||ns.get!==get||step.do!==stepDo)fail();};
  return await bounded(l,parent.signal,controller,async()=>{current();
   const rawResult=await Reflect.apply(stepDo,step,['observe-private-generation-preparation',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{if(executedHere)fail();executedHere=true;current();const stub=Reflect.apply(get,ns,[Reflect.apply(select,ns,[SLOT])]),value=await stub.readOwnQaGenerationPreparation(p.namedBundleHash,l.end);current();receipt(value,p.namedBundleHash,compiledQaSourceRevision,l.version,data(compiledQaArtifactContext,'artifact'),compiledQaHistoricalContext);return value;}]);current();
   if(!executedHere)fail();const r=receipt(rawResult,p.namedBundleHash,compiledQaSourceRevision,l.version,data(compiledQaArtifactContext,'artifact'),compiledQaHistoricalContext),result={...r,context:'workflow',actorContext:'durable_object'};if(Buffer.byteLength(JSON.stringify(result))>2048)fail();current();return result;
  });
 }catch{return blocked();}finally{controller.abort();parent.abort();l?.finish();}
}
