import {createPrivateQaArmHttpAdapters} from './mcp-qa-cloud-closed-http.mjs';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
const PURPOSE='afw.qa-closed-quiescence-observation.v2',CONTEXT='afw.qa-closed-quiescence-context.v2';
const keys=['env','event','step','context','pins','fetchImpl','now'];
const contextKeys=['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt'];
const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const stages=['idle','active_deployments','version_profiles','schedules','tails','qa_exposure','containers','namespaces','workflow_registry','terminal_workflows','final_deployments','complete'];
const reasons=['none','invalid_response','http_status','response_date','response_cache','response_media','response_budget','response_body','response_json','response_envelope','request_failed','proof_rejected'];
const fail=()=>{throw Error('Closed ARM HTTP observation unavailable');};
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
function data(v,k){const d=v&&typeof v==='object'&&Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,ks){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==ks.length)fail();return Object.freeze(Object.fromEntries(ks.map(k=>[k,data(v,k)])));}
function literal(v,depth=0,budget={n:0}){
 if(++budget.n>256||depth>8)fail();
 if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(typeof v==='string'){if(Buffer.byteLength(v)>8192)fail();return v;}
 if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();
 return Object.fromEntries(Reflect.ownKeys(v).map(k=>{if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();return[k,literal(data(v,k),depth+1,budget)];}));
}
const serial=v=>JSON.stringify(literal(v));
function closed(env){if(Object.keys(env).some(k=>/^AFW_(QA|MCP)_.*_ENABLED$/.test(k)&&!PRIVATE_QA_CLOSED_FLAGS.includes(k))||PRIVATE_QA_CLOSED_FLAGS.some(k=>data(env,k)!=='false')||policies.some(k=>data(env,k)!==''))fail();}
function payload(v){if(typeof v==='string'){if(Buffer.byteLength(v)>256)fail();v=JSON.parse(v);}const p=fields(v,['operation','observationId']);if(p.operation!=='inspect_closed_quiescence'||!hex(p.observationId,64))fail();return p;}
function diagnostic(adapter){
 const base={purpose:'afw.qa-cloud-closed-http-diagnostic.v1',stage:'idle',reason:'none',httpStatus:null,reads:0,authorizesEffects:false,operationalReadiness:false};
 if(!adapter)return base;
 try{const r=fields(adapter.readDiagnostic(),Object.keys(base));if(r.purpose!==base.purpose||!stages.includes(r.stage)||!reasons.includes(r.reason)||r.httpStatus!==null&&(!Number.isSafeInteger(r.httpStatus)||r.httpStatus<100||r.httpStatus>599)||!Number.isSafeInteger(r.reads)||r.reads<0||r.reads>128||r.authorizesEffects!==false||r.operationalReadiness!==false)fail();return {...r};}catch{return base;}
}
const flags={armEligibilityVerified:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
const blocked=adapter=>({purpose:PURPOSE,status:'blocked',diagnostic:diagnostic(adapter),...flags});
/** DISTINCT v2 closed diagnostic only; never an ARM witness. Enqueue age <5s,
 * one active budget <=5s captured before Step.do, total original age <10s.
 * capturedTotalAgeMs is measured at observedAt inside the callback; delivery
 * and both final consumer settlements remain fenced by the same fixed end.
 * V1 and actual ARM clocks are unchanged.
 * INTERNAL technical observation only. Trusted wrapper supplies compiled context,
 * exact external pins, native metadata and fetch. No ARM or write capability.
 * Code/source coherence is not module provenance; publication verifies that separately. */
export async function runPrivateQaClosedObservation(options){
 let adapter,timer,finished=false;const controller=new AbortController();
 try{
  const origin=performance.now(),o=fields(options,keys),{env,event,step,context,pins,fetchImpl,now}=o;
  if(typeof now!=='function'||typeof fetchImpl!=='function'||!Number.isFinite(origin)||origin<0)fail();
  const entered=now(),c=fields(context,contextKeys),contextJson=serial(context),pinsJson=serial(pins);
  if(!time(entered)||c.purpose!==CONTEXT||!hex(c.id,64)||!hex(c.sourceRevision,40)||c.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||c.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000)fail();
  const raw=event?.payload,p=payload(raw),stampObject=event?.timestamp,stamp=stampObject instanceof Date?Date.prototype.getTime.call(stampObject):NaN,instanceId=event?.instanceId,doStep=step?.do;
  if(p.observationId!==c.id||instanceId!=='afw-qa-arm-'+c.id||typeof doStep!=='function'||!time(stamp)||stamp<c.startAt||stamp>entered||entered-stamp>=5000)fail();
  const end=Math.min(entered+5000,stamp+10000,c.expiresAt),monoEnd=origin+(end-entered);
  if(end<=entered)fail();
  const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id'),credential=data(env,'AFW_MCP_CLOSURE_READ_TOKEN');
  if(typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential))fail();
  const pin=createPrivateQaExecutionPin({env,expectedVersionId:version,sourceRevision:c.sourceRevision,context:'workflow'});let lastWall=entered,lastMono=origin,executedHere=false,issuedJson;
  const current=()=>{
   const wall=now(),mono=performance.now(),n=fields(options,keys);
   if(finished||controller.signal.aborted||keys.some(k=>n[k]!==o[k])||serial(context)!==contextJson||serial(pins)!==pinsJson||!time(wall)||wall<lastWall||wall<c.startAt||wall>=end||!Number.isFinite(mono)||mono<lastMono||mono>=monoEnd||data(env,'AFW_QA_VERSION')!==metadata||data(env,'AFW_MCP_CLOSURE_READ_TOKEN')!==credential||event.payload!==raw||event.timestamp!==stampObject||Date.prototype.getTime.call(stampObject)!==stamp||event.instanceId!==instanceId)fail();
   const q=payload(raw);if(q.operation!==p.operation||q.observationId!==p.observationId)fail();closed(env);pin.assertCurrent();lastWall=wall;lastMono=mono;return wall;
  };
  current();
  const plan={purpose:'afw.qa-arm-quiescence.v1',sessionId:c.id,startAt:entered,expiresAt:end};
  adapter=createPrivateQaArmHttpAdapters({plan,pins,credential,sourceRevision:c.sourceRevision,qaVersionId:version,currentBootstrapId:instanceId,fetchImpl,now:current});
  const stopped=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;controller.abort();reject(Error('Closed observation deadline'));},Math.max(1,Math.floor(Math.min(end-lastWall,monoEnd-lastMono))));});
  const work=async()=>{
   current();
   const value=await Reflect.apply(doStep,step,['observe-closed-quiescence-v2',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{
    if(executedHere)fail();executedHere=true;current();
    const first=await adapter.readSnapshot(controller.signal);current();
    const second=await adapter.readSnapshot(controller.signal);const at=current();
    if(first.qaVersionId!==version||second.qaVersionId!==version||first.qaDeploymentId!==second.qaDeploymentId||first.qaCodeProvenanceVerified!==false||second.qaCodeProvenanceVerified!==false)fail();
    const d=diagnostic(adapter);if(d.stage!=='complete'||d.reason!=='none')fail();
    const result={purpose:PURPOSE,status:'observed',context:'workflow',runtimeVersionId:version,sourceRevision:c.sourceRevision,qaCodeProvenanceVerified:false,snapshotsVerified:2,reads:d.reads,elapsedMs:Math.max(0,Math.floor(performance.now()-origin)),observedAt:at,enqueueAgeMs:entered-stamp,executionBudgetMs:end-entered,capturedTotalAgeMs:at-stamp,diagnostic:d,...flags};
    current();issuedJson=serial(result);if(Buffer.byteLength(issuedJson)>2048)fail();return issuedJson;
   }]);
   current();if(!executedHere||typeof value!=='string'||Buffer.byteLength(value)>2048||value!==issuedJson)fail();return JSON.parse(value);
  };
  const result=await Promise.race([stopped,work()]);current();if(serial(result)!==issuedJson)fail();return result;
 }catch{return blocked(adapter);}finally{clearTimeout(timer);finished=true;controller.abort();}
}
