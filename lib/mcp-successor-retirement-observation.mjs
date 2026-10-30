import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {createRetirementEvidenceReader} from './mcp-retirement-evidence.mjs';
import {createRetirementProviderReader} from './mcp-retirement-provider-reader.mjs';
import {readRetiredRpcReceipt} from './mcp-retired-rpc-receipt.mjs';
const NAME='afw-own-event-first-successor-v1';
const enabled='AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED',policyKey='AFW_RELEASE_RETIREMENT_OBSERVATION_POLICY';
const flags=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED'];
const fail=()=>{throw Error('Successor retirement observation unavailable');};
const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype||Reflect.ownKeys(x).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(x,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const outcome=status=>Object.freeze({status,mayRetry:false,mayRestoreAdministration:false,operationalReadiness:false});

/** Private native Workflow only. Readback is not withdrawal, close, restoration
 * or permission to restart. No selector is accepted from a client event. */
export async function runSuccessorRetirementObservation({env,event,step,fetchImpl=globalThis.fetch,now=Date.now,monotonicNow=()=>performance.now()}={}){
 let observationHash,p,namespace,methods,credential,wall,lastWall,lastMono,endMono,timer,finished=false,entered=false;
 const abort=new AbortController();
 try{
  // Deny before any credential/RPC/network access when the mode is closed.
  if(env?.[enabled]!=='true'||flags.some(k=>env[k]!=='false')||![undefined,'false'].includes(env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED)||
   typeof now!=='function'||typeof monotonicNow!=='function'||typeof fetchImpl!=='function'||typeof step?.do!=='function')return outcome('blocked');
  const raw=env[policyKey];if(typeof raw!=='string'||raw.length>2048)return outcome('blocked');
  p=exact(JSON.parse(raw),['startAt','expiresAt','candidate']);
  const candidate=exact(p.candidate,['containerId','applicationId','programHash','sourceRevision']);
  if(JSON.stringify(p)!==raw||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||
   !hex(candidate.containerId,64)||candidate.applicationId!==RELEASE_TARGET.namespaceId||!hex(candidate.programHash,64)||!hex(candidate.sourceRevision,40))return outcome('blocked');
  observationHash=createHash('sha256').update(raw).digest('hex');
  const payload=typeof event?.payload==='string'&&event.payload===JSON.stringify({observationHash})?{observationHash}:event?.payload;
  const data=exact(payload,['observationHash']);
  if(event?.schedule!==undefined||event?.instanceId!=='afw-successor-retired-'+observationHash||data.observationHash!==observationHash)return outcome('blocked');
  namespace=env.AFW_RELEASE_EVENTS_NODE;methods={idFromName:namespace?.idFromName,idFromString:namespace?.idFromString,get:namespace?.get};
  if(Object.values(methods).some(x=>typeof x!=='function')||namespace.idFromName(NAME).toString()!==candidate.containerId||namespace.idFromString(candidate.containerId).toString()!==candidate.containerId)return outcome('blocked');
  const nativeStamp=event?.timestamp;
  if(!(nativeStamp instanceof Date))return outcome('blocked');
  const triggerAt=Reflect.apply(Date.prototype.getTime,nativeStamp,[]);
  wall=now();const mono=monotonicNow(),absoluteEnd=Math.min(p.expiresAt,triggerAt+5000);
  if(!time(triggerAt)||triggerAt<p.startAt||triggerAt>=p.expiresAt||!time(wall)||wall<triggerAt||wall>=absoluteEnd||!Number.isFinite(mono)||mono<0)return outcome('blocked');
  // The native creation timestamp survives run-body replay; no re-entry gets a new lease.
  lastWall=wall;lastMono=mono;endMono=mono+(absoluteEnd-wall);
  const reservationFlag=env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED,doStep=step.do;
  credential=env.AFW_RELEASE_READ_TOKEN;
  if(typeof credential!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(credential))return outcome('blocked');
  const current=()=>{
   const n=now(),m=monotonicNow();
   if(finished||abort.signal.aborted||!time(n)||n<lastWall||n<p.startAt||n>=absoluteEnd||event.timestamp!==nativeStamp||Reflect.apply(Date.prototype.getTime,nativeStamp,[])!==triggerAt||!Number.isFinite(m)||m<lastMono||m>=endMono||
    env[enabled]!=='true'||env[policyKey]!==raw||flags.some(k=>env[k]!=='false')||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!==reservationFlag||
    env.AFW_RELEASE_READ_TOKEN!==credential||env.AFW_RELEASE_EVENTS_NODE!==namespace||
    Object.keys(methods).some(k=>namespace[k]!==methods[k])||namespace.idFromName(NAME).toString()!==candidate.containerId||namespace.idFromString(candidate.containerId).toString()!==candidate.containerId)fail();
   lastWall=n;lastMono=m;return n;
  };
  const remaining=()=>{current();return Math.max(1,Math.floor(Math.min(endMono-lastMono,p.expiresAt-lastWall)));};
  current();const limit=remaining();
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Successor retirement observation unavailable'));},limit);});
  // Native Workflow step.do may be a fresh bound method on each access.
  // Capture once and use the intrinsic call: native RPC .call is itself a remote method.
  // Target/policy/namespace fences remain live.
  const run=async()=>Reflect.apply(doStep,step,['observe-retired-successor',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:limit},async()=>{
   if(entered)fail();entered=true;current();
   const provider=createRetirementProviderReader({resources:{accountId:RELEASE_TARGET.accountId,applicationId:candidate.applicationId,containerId:candidate.containerId},
    readCredential:async()=>{current();return credential;},fetchImpl:async(...args)=>{current();const r=await fetchImpl(args[0],{...args[1],signal:AbortSignal.any([args[1].signal,abort.signal])});current();return r;},timeoutMs:remaining()});
   const reader=createRetirementEvidenceReader({original:candidate,now:current,timeoutMs:remaining(),readInstance:async input=>{current();const r=await provider(input);current();return r;},
    readCustodyReceipt:async({signal},assertReader)=>{
     current();assertReader();const target=namespace.get(namespace.idFromName(NAME));current();
     return readRetiredRpcReceipt({now:current,timeoutMs:remaining(),signal:AbortSignal.any([signal,abort.signal]),assertCurrent:()=>{current();assertReader();},
      invoke:async challenge=>{current();assertReader();return {value:await target.observeSuccessorRetiredReceipt(challenge)};}});
    }});
   const evidence=await reader.observe({signal:abort.signal,assertCurrent:current});current();
   return JSON.stringify({...outcome('retired_verified'),observationHash,evidence});
  }]);
  // One original lease includes time queued inside the native step.
  const result=await Promise.race([run(),deadline]);const acceptedAt=current();
  if(typeof result!=='string'||Buffer.byteLength(result)>8192)fail();
  const parsed=JSON.parse(result);if(JSON.stringify(parsed)!==result)fail();
  const record=exact(parsed,['status','mayRetry','mayRestoreAdministration','operationalReadiness','observationHash','evidence']);
  const evidence=exact(record.evidence,['purpose','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor']);
  if(record.status!=='retired_verified'||record.mayRetry!==false||record.mayRestoreAdministration!==false||record.operationalReadiness!==false||record.observationHash!==observationHash||
   evidence.purpose!=='afw.retirement-evidence.v1'||Object.keys(candidate).some(k=>evidence[k]!==candidate[k])||!hex(evidence.processGeneration,64)||
   !['closedAt','stoppedAt','observedAt'].every(k=>time(evidence[k]))||evidence.closedAt>evidence.observedAt||evidence.stoppedAt>evidence.observedAt||
   evidence.observedAt<triggerAt||evidence.observedAt>=absoluteEnd||evidence.observedAt>acceptedAt||evidence.physicalStopVerified!==true||evidence.mayStartSuccessor!==false)fail();
  current();return Object.freeze({...record,evidence});
 }catch{return outcome(entered?'uncertain':wall===undefined?'blocked':'uncertain');}
 finally{finished=true;clearTimeout(timer);abort.abort();credential=undefined;}
}
