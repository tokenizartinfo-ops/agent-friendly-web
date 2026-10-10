import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const SHA=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ORIGIN='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const fail=()=>{throw Error('Private execution correlation unavailable');};
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const hash=v=>typeof v==='string'&&SHA.test(v),uuid=v=>typeof v==='string'&&UUID.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const locator=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,512}$/.test(v);
function copy(v,depth=0,budget={remaining:512}){
 if(depth>12||--budget.remaining<0)fail();if(v===null||typeof v==='boolean'||(typeof v==='number'&&Number.isFinite(v)))return v;
 if(typeof v==='string'){if(v.length>8192)fail();return v;}
 if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const out={};
 const keys=Reflect.ownKeys(v);if(keys.length>32)fail();for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,key,{value:copy(d.value,depth+1,budget),enumerable:true});}
 return Object.freeze(out);
}
const contextKeys=['source','sourceRef','observedAt','threadId','turnId','callId','commandItemId','turnStartedAt','turnCompletedAt','callPrecedesCommand','environmentId','configId','publicationId','configurationRevision','observationRevision','observationsCurrent','connectivity','phase','networkMode','networkState'];
const executionKeys=['source','sourceRef','observedAt','threadId','turnId','commandItemId','commandDigest','cwd','turnStartedAt','turnCompletedAt','exitCode','sourceRevision','origin','checkoutClean','recordRef','receiptRef'];
const challengeKeys=['contract','state','recordRef','receiptRef','issuedAt','deadline','consumedAt'];
/** Unmounted, read-only administrative correlation. Host resolves independently
 * observed originals; labels/hashes are not authentication or provisioning.
 * No consumer fields, callback constants, stdout or fixtures establish origin.
 */
export function createPrivateExecutionCorrelation({readPins,readOfficialContext,readExecution,readChallengeObservation,now=Date.now,timeoutMs=5000,maxAgeMs=30000}={}){
 if(![readPins,readOfficialContext,readExecution,readChallengeObservation,now].every(f=>typeof f==='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000||!Number.isSafeInteger(maxAgeMs)||maxAgeMs<1||maxAgeMs>600000)fail();
 let last=-1;
 return Object.freeze({async read(recordRef){let timer,active=true;const controller=new AbortController(),wallDeadline=performance.now()+timeoutMs;try{
  if(!hash(recordRef))fail();let start=0,deadline=8640000000000000;
  const clock=()=>{const t=now();if(!active||controller.signal.aborted||performance.now()>=wallDeadline||!time(t)||t<last||t<start||t>=deadline)fail();last=t;return t;};
  const read=async fn=>{clock();const value=copy(await fn(Object.freeze({recordRef,signal:controller.signal})));clock();return value;};
  const snapshot=async()=>{
   const pins=await read(readPins);if(!exact(pins,['registration','approval','cloud'])||!exact(pins.cloud,['threadId','environmentId','cwd','commandDigest'])||!uuid(pins.cloud.threadId)||!locator(pins.cloud.environmentId)||typeof pins.cloud.cwd!=='string'||!/^\/[A-Za-z0-9_./-]{1,512}$/.test(pins.cloud.cwd)||pins.cloud.cwd.split('/').includes('..')||!hash(pins.cloud.commandDigest))fail();
   const approval=validateOccurrenceApproval(pins.approval),registration=await validateQaClosureApproval(pins.registration,approval);clock();
   start=Math.max(registration.provisioning.createdAt,approval.manifest.startAt);deadline=registration.plan.closeAt;if(registration.plan.baselineRef!==recordRef)fail();clock();
   const context=await read(readOfficialContext),execution=await read(readExecution),observation=await read(readChallengeObservation),at=clock();
   const dated=t=>time(t)&&t>=start&&t<=at&&at-t<=maxAgeMs;
   if(!exact(context,contextKeys)||context.source!=='official-platform-activity'||!hash(context.sourceRef)||!dated(context.observedAt)||context.threadId!==pins.cloud.threadId||!uuid(context.turnId)||!locator(context.callId)||context.environmentId!==pins.cloud.environmentId||context.configId!==approval.manifest.configId||context.publicationId!==approval.manifest.publicationId||!Number.isSafeInteger(context.configurationRevision)||context.configurationRevision<1||context.configurationRevision!==context.observationRevision||context.observationsCurrent!==true||context.connectivity!=='connected'||context.phase!=='running'||context.networkMode!=='restricted'||context.networkState!=='enforced')fail();
   if(!exact(execution,executionKeys)||execution.source!=='official-thread-command'||!hash(execution.sourceRef)||!dated(execution.observedAt)||execution.threadId!==pins.cloud.threadId||!uuid(execution.turnId)||!locator(execution.commandItemId)||execution.commandDigest!==pins.cloud.commandDigest||execution.cwd!==pins.cloud.cwd||!dated(execution.turnStartedAt)||!dated(execution.turnCompletedAt)||execution.turnStartedAt>execution.turnCompletedAt||execution.turnCompletedAt>execution.observedAt||execution.exitCode!==0||execution.sourceRevision!==approval.manifest.sourceRevision||execution.origin!==ORIGIN||execution.checkoutClean!==true||execution.recordRef!==recordRef||!hash(execution.receiptRef))fail();
   if(!exact(observation,['contract','state','recordRef','challenge'])||observation.contract!=='afw-private-qa-observation/v1'||observation.state!=='observed'||observation.recordRef!==recordRef)fail();const c=observation.challenge;
   if(!exact(c,challengeKeys)||c.contract!=='afw-private-custody-challenge/v1'||c.state!=='confirmed'||c.recordRef!==recordRef||c.receiptRef!==execution.receiptRef||c.deadline!==deadline||!dated(c.issuedAt)||!dated(c.consumedAt)||c.issuedAt>c.consumedAt||c.consumedAt>=deadline||context.turnId!==execution.turnId||context.commandItemId!==execution.commandItemId||context.callPrecedesCommand!==true||context.turnStartedAt!==execution.turnStartedAt||context.turnCompletedAt!==execution.turnCompletedAt||context.observedAt<execution.turnCompletedAt||execution.turnStartedAt>c.issuedAt||execution.turnCompletedAt<c.consumedAt)fail();
   const pinsDigest=await computeAdministrativeResultDigest(pins);clock();const finalPins=await read(readPins);if(await computeAdministrativeResultDigest(finalPins)!==pinsDigest)fail();clock();
   // Retrieval time may advance between independent reads of the same original.
   // Both timestamps still pass dated() above; compare all original facts.
   const stableExecution=Object.fromEntries(Object.entries(execution).filter(([key])=>key!=='observedAt'));
   const stableContext=Object.fromEntries(Object.entries(context).filter(([key])=>key!=='observedAt'));
   const digest=await computeAdministrativeResultDigest({pins,context:stableContext,execution:stableExecution,observation});clock();
   return {digest,pinsDigest,freshUntil:Math.min(context.observedAt,execution.observedAt,execution.turnStartedAt,execution.turnCompletedAt,c.issuedAt,c.consumedAt)+maxAgeMs,receiptRef:c.receiptRef,sourceRefs:{context:context.sourceRef,execution:execution.sourceRef}};
  };
  const work=async()=>{const before=await snapshot();clock();const after=await snapshot();const observedAt=clock();if(before.digest!==after.digest||observedAt>after.freshUntil)fail();return {contract:'afw-private-execution-correlation/v1',state:'observed',recordRef,receiptRef:after.receiptRef,pinsDigest:after.pinsDigest,sourceRefs:after.sourceRefs,observedAt};};
  return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;controller.abort();resolve(null);},timeoutMs);})]);
 }catch{return null;}finally{active=false;controller.abort();clearTimeout(timer);}}});
}
