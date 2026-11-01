import {createHash} from 'node:crypto';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
import {createPrivateQaGenerationDraftReader} from './mcp-qa-generation-draft-reader.mjs';
import {validatePrivateQaLegacyHistoricalContext} from './mcp-qa-legacy-predecessor.mjs';
import {createPrivateQaOriginalPinsReader} from './mcp-qa-original-pins.mjs';
import {createPrivateQaHistoricalIdentityReader} from './mcp-qa-historical-identity.mjs';
import {assemblePrivateQaGenerationDraftMaterial} from './mcp-qa-generation-material.mjs';
import {createPrivateQaArmEligibility} from './mcp-qa-arm-eligibility.mjs';
import {createPrivateQaArmHttpAdapters} from './mcp-qa-cloud-closed-http.mjs';
import {createPrivateQaGenerationLedger} from './mcp-qa-generation-ledger.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
const PURPOSE='afw.qa-generation-arm.v1',SLOT='afw-own-successor-closure-v1',LEGACY='afw.canary-restoration-control.v1';
const journalKeys=['afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1'];
const policyKeys=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const enabled=['AFW_MCP_CLOSURE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
const optionKeys=['env','ctx','sourceRevision','artifactContext','historicalContext','externalPins','nativeInvocation','fetchImpl','now','timeoutMs'];
const invocationKeys=['instanceId','qaVersionId','sourceRevision'];
const fail=()=>{throw Error('Private QA generation ARM unavailable');};
const nativeAborted=Object.getOwnPropertyDescriptor(AbortSignal.prototype,'aborted').get;
const nativeListen=EventTarget.prototype.addEventListener,nativeUnlisten=EventTarget.prototype.removeEventListener;
const hash=s=>createHash('sha256').update(s).digest('hex');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const result=(status,metadata)=>Object.freeze({purpose:PURPOSE,status,...metadata,writeMayHaveOccurred:status!=='blocked',authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
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
function fixedContext(value){
 const c=fields(value,['artifact','receipt']),a=fields(c.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']),r=fields(c.receipt,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck']);
 if(typeof a.script!=='string'||Buffer.byteLength(a.script)>2097152)fail();
 const order=Object.keys(c.artifact).join('|'),artifact=Object.freeze(Object.fromEntries(Object.keys(c.artifact).map(k=>[k,a[k]]))),receipt=Object.freeze({...r});
 return{artifact,receipt,current(){const v=fields(value,['artifact','receipt']);if(v.artifact!==c.artifact||v.receipt!==c.receipt||Object.keys(v.artifact).join('|')!==order)fail();const aa=fields(v.artifact,Object.keys(a)),rr=fields(v.receipt,Object.keys(r));if(Object.keys(a).some(k=>aa[k]!==a[k])||Object.keys(r).some(k=>rr[k]!==r[k]))fail();}};
}

// Pin caller-owned data recursively by identity, descriptors and value; never freeze it.
function pinDataTree(value){
 const nodes=[];let bytes=0;
 const visit=(v,depth=0)=>{
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>2200000)fail();}
  if(v===null||typeof v!=='object')return;
  if(depth>16||nodes.length>=4096||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
  const keys=Reflect.ownKeys(v),descriptors=keys.map(k=>{if(typeof k!=='string')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!Object.hasOwn(d,'value'))fail();return d;});
  nodes.push({v,keys,descriptors});for(const d of descriptors)visit(d.value,depth+1);
 };visit(value);
 return()=>{for(const {v,keys,descriptors}of nodes){const current=Reflect.ownKeys(v);if(current.length!==keys.length||current.some((k,i)=>k!==keys[i]))fail();for(let i=0;i<keys.length;i++){const d=Object.getOwnPropertyDescriptor(v,keys[i]),p=descriptors[i];if(!d||!Object.hasOwn(d,'value')||d.value!==p.value||d.enumerable!==p.enumerable||d.configurable!==p.configurable||d.writable!==p.writable)fail();}}};
}
function profile(env){
 for(const k of Object.keys(env))if(/^AFW_(QA|MCP)_.*_ENABLED$/.test(k)&&!PRIVATE_QA_CLOSED_FLAGS.includes(k))fail();
 if(PRIVATE_QA_CLOSED_FLAGS.some(k=>data(env,k)!==(enabled.includes(k)?'true':'false'))||policyKeys.some(k=>data(env,k)!==''))fail();
}
function ledgerReceipt(value,material,pin,at){
 const common=['purpose','status','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'];
 const status=data(value,'status'),keys=['armed'].includes(status)?[...common,'planHash','infoHash','sequence','pendingAt','armedAt','withdrawnAt']:common,r=fields(value,keys);
 if(r.purpose!=='afw.qa-generation-observation.v2'||!['blocked','uncertain','armed'].includes(status)||common.slice(2).some(k=>r[k]!==false))fail();
 if(status==='armed'){
  const capsule=JSON.parse(material.capsuleJson),info={purpose:'afw.qa-generation-info.v2',sequence:1,planHash:material.generationPlanHash,capsule:material.capsuleJson,execution:pin.snapshot(),preparedAt:r.pendingAt};
  if(r.planHash!==material.generationPlanHash||r.sequence!==1||!time(r.pendingAt)||!time(r.armedAt)||r.pendingAt<capsule.startAt-600000||r.armedAt<r.pendingAt||r.armedAt>=capsule.expiresAt||r.armedAt>at||r.withdrawnAt!==null||r.infoHash!==hash('afw.qa-generation-info.v2\n'+JSON.stringify(info)))fail();
 }
 return status;
}
/** UNMOUNTED same-request component. nativeInvocation is a trusted declaration,
 * NOT Workflow-origin proof. now/signal/timeout belong to the original caller
 * lease; this component cannot establish queue-inclusive cross-RPC cancellation.
 * The ledger alone owns metadata writes. Armed metadata grants no effects. */
export function createPrivateQaGenerationArm(options){
 let pinned;try{pinned=fields(options,optionKeys);}catch{fail();}
 const {env,ctx,sourceRevision,artifactContext,historicalContext,externalPins,nativeInvocation,fetchImpl,now,timeoutMs}=pinned;
 if(!env||!ctx||!hex(sourceRevision,40)||typeof fetchImpl!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 let used=false;
 async function arm(args){
  if(used)return result('blocked');used=true;
  let handoff=false,finished=false,invalid=false,timer,onAbort,parent;const controller=new AbortController();
  try{
   if(args.length!==2||!hex(args[0])||!(args[1] instanceof AbortSignal)||Reflect.apply(nativeAborted,args[1],[]))fail();
   const [namedBundleHash,signal]=args;parent=signal;
   const mono=performance.now(),entered=now(),end=entered+timeoutMs,monoEnd=mono+timeoutMs;
   if(!time(entered)||!time(end)||!Number.isFinite(mono)||mono<0)fail();let lastWall=entered,lastMono=mono;
   const fixed=fixedContext(artifactContext),historical=literal(validatePrivateQaLegacyHistoricalContext(historicalContext)),historicalJson=JSON.stringify(historical);
   const optionFence=pinDataTree(Object.fromEntries(optionKeys.filter(k=>!['env','ctx','fetchImpl','now'].includes(k)).map(k=>[k,pinned[k]]))),invocation=fields(nativeInvocation,invocationKeys);
   const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id'),credential=data(env,'AFW_MCP_CLOSURE_READ_TOKEN'),metadataFence=pinDataTree(metadata);
   if(invocation.instanceId!=='afw-qa-arm-'+namedBundleHash||invocation.qaVersionId!==version||invocation.sourceRevision!==sourceRevision)fail();
   const pin=createPrivateQaExecutionPin({env,expectedVersionId:version,sourceRevision,context:'durable_object'});
   const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id,idString=id?.toString,self=data(env,'AFW_INDEPENDENT_CLOSURE'),select=self?.idFromName,node=data(env,'AFW_MCP_CLOSURE_NODE'),nodeName=node?.idFromName,nodeString=node?.idFromString,qa=data(env,'AFW_QA_DB'),dossier=data(env,'AFW_QA_DOSSIER_DB'),qaPrepare=qa?.prepare,qaSession=qa?.withSession,dossierPrepare=dossier?.prepare,dossierSession=dossier?.withSession;
   if([transaction,idString,select,nodeName,nodeString,qaPrepare,qaSession,dossierPrepare,dossierSession].some(v=>typeof v!=='function')||qa===dossier)fail();
   const actor=Reflect.apply(idString,id,[]);if(!hex(actor))fail();
   const current=()=>{
    try{
     const at=now(),m=performance.now();if(invalid||finished||Reflect.apply(nativeAborted,parent,[])||controller.signal.aborted||!time(at)||at<lastWall||at>=end||!Number.isFinite(m)||m<lastMono||m>=monoEnd)fail();
     const p=fields(options,optionKeys);if(optionKeys.some(k=>p[k]!==pinned[k]))fail();optionFence();metadataFence();fixed.current();profile(env);pin.assertCurrent();
     if(data(env,'AFW_QA_VERSION')!==metadata||data(env,'AFW_MCP_CLOSURE_READ_TOKEN')!==credential||JSON.stringify(literal(validatePrivateQaLegacyHistoricalContext(historicalContext)))!==historicalJson||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString!==idString||Reflect.apply(idString,id,[])!==actor||data(env,'AFW_INDEPENDENT_CLOSURE')!==self||self.idFromName!==select||Reflect.apply(select,self,[SLOT]).toString()!==actor||data(env,'AFW_MCP_CLOSURE_NODE')!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||data(env,'AFW_QA_DB')!==qa||data(env,'AFW_QA_DOSSIER_DB')!==dossier||qa.prepare!==qaPrepare||qa.withSession!==qaSession||dossier.prepare!==dossierPrepare||dossier.withSession!==dossierSession)fail();
     lastWall=at;lastMono=m;return at;
    }catch{invalid=true;fail();}
   };
   const remaining=()=>{current();const n=Math.floor(Math.min(end-lastWall,monoEnd-lastMono));if(n<1)fail();return n;};
   const snapshot=async()=>{
    current();const value=await Reflect.apply(transaction,storage,[async t=>{
     const get=t?.get;if(typeof get!=='function')fail();
     const read=async k=>{current();if(t.get!==get)fail();const v=await Reflect.apply(get,t,[k]);current();if(t.get!==get)fail();return literal(v);};
     const control=await read(LEGACY),rows=[];for(const k of journalKeys)rows.push(await read(k));
     return Object.freeze({control,journals:Object.freeze({restoration:rows[0],retirement:rows[1],preparedDispatch:rows[2],reductionDispatch:rows[3]})});
    }]);current();return value;
   };
   const readDraft=async()=>{current();const raw=await createPrivateQaGenerationDraftReader({db:qa,now:current,timeoutMs:remaining()}).read(namedBundleHash,controller.signal);current();if(raw===null)fail();return raw;};
   const assemble=(draftJson,legacySnapshot)=>{current();const m=assemblePrivateQaGenerationDraftMaterial({namedBundleHash,draftJson,legacySnapshot,artifact:fixed.artifact,receipt:fixed.receipt,historicalContext:historical,namespace:node,at:current()});current();if(JSON.parse(m.capsuleJson).predecessor.kind!=='legacy')fail();return m;};
   const correlate=async material=>{
    const authorize=async()=>{current();return true;},window=material.window;
    const original=await createPrivateQaOriginalPinsReader({db:dossier,original:material.original,window,authorize,now:current,timeoutMs:remaining()}).read();current();
    if(await createPrivateQaHistoricalIdentityReader({db:dossier,scope:material.historicalScope,candidate:material.historicalCandidate,original,window,authorize,now:current,timeoutMs:remaining()}).check(controller.signal)!==true)fail();current();return original;
   };
   current();
   const stop=new Promise((_,reject)=>{onAbort=()=>{invalid=true;controller.abort();reject(Error('Private QA generation ARM unavailable'));};Reflect.apply(nativeListen,parent,['abort',onAbort,{once:true}]);timer=setTimeout(onAbort,remaining());});
   const work=async()=>{
    const draftJson=await readDraft(),first=await snapshot(),firstJson=JSON.stringify(first),material=assemble(draftJson,first),materialJson=JSON.stringify(material);
    const reread=async()=>{const draft=await readDraft(),records=await snapshot();current();if(draft!==draftJson||JSON.stringify(records)!==firstJson||JSON.stringify(assemble(draft,records))!==materialJson)fail();current();};
    const original=await correlate(material),originalJson=JSON.stringify(original);await reread();current();
    const capsule=JSON.parse(material.capsuleJson),packet=JSON.parse(material.packetJson),plan={purpose:'afw.qa-arm-quiescence.v1',sessionId:namedBundleHash,startAt:current(),expiresAt:Math.min(end,material.window.expiresAt)};
    const http=createPrivateQaArmHttpAdapters({plan,pins:externalPins,credential,sourceRevision,qaVersionId:version,currentBootstrapId:invocation.instanceId,fetchImpl,now:current});current();
    let passes=0;
    const checkEligibility=async()=>{
     current();if(++passes>2)fail();await reread();current();const observed=await correlate(material);current();if(JSON.stringify(observed)!==originalJson)fail();await reread();current();
     const window={grantId:capsule.grantId,startAt:capsule.startAt,expiresAt:capsule.expiresAt},authorize=async()=>{current();return true;};
     if(await createPrivateQaArmEligibility({db:dossier,original:observed,window,cancellationHistory:packet.cancellationHistory,authorize,now:current,timeoutMs:remaining()}).check()!==true)fail();current();
     await http.readSnapshot(controller.signal);current();await reread();current();return true;
    };
    const ledger=createPrivateQaGenerationLedger({storage,capsule:material.capsuleJson,executionPin:pin,checkEligibility,now:current,timeoutMs:remaining()});current();
    // Unknown or late handoff is conservatively uncertain, even before an ACK.
    handoff=true;const receipt=await ledger.arm();current();const status=ledgerReceipt(receipt,material,pin,current());
    if(status==='blocked'){await reread();current();handoff=false;return result('blocked');}
    if(status==='uncertain')return result('uncertain');
    if(passes!==2)fail();await reread();current();
    return result('armed',{namedBundleHash,generationPlanHash:material.generationPlanHash,packetHash:material.packetHash,runtimeVersionId:version,sourceRevision,context:'durable_object',preparedIdle:true,d1IdentityCorrelationVerified:true,retainedUncertainty:true});
   };
   const output=await Promise.race([stop,work()]);current();
   if(Buffer.byteLength(JSON.stringify(output))>2048)fail();current();return output;
  }catch{return result(handoff?'uncertain':'blocked');}
  finally{finished=true;clearTimeout(timer);try{if(onAbort)Reflect.apply(nativeUnlisten,parent,['abort',onAbort]);}catch{/* Cleanup cannot replace the owned metadata outcome. */}finally{controller.abort();}}
 }
 return Object.freeze({arm(...args){return arm(args);}});
}
