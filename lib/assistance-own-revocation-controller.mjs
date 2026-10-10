import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {matchPrivateInstallationD1} from './assistance-private-installation-finalization.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const hash=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Own recovery unavailable');};
function snapshot(v,depth=0,budget={left:2048}){
 if(depth>14||--budget.left<0)fail();if(v===null||typeof v==='boolean'||(typeof v==='number'&&Number.isFinite(v)))return v;
 if(typeof v==='string'){if(v.length>8192)fail();return v;}if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();
 const out={},keys=Reflect.ownKeys(v);if(keys.length>32)fail();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,k,{value:snapshot(d.value,depth+1,budget),enumerable:true});}return Object.freeze(out);
}
const exact=(v,keys)=>v&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
/** INTERNAL, UNMOUNTED. Fixed host adapters only. dispatchRevocation MUST enforce
 * current administrative authorization and exact conditional own D1 mutation.
 * A locator, callback label or historical context is not that authorization. */
export function createOwnRevocationController({creationRef,provisioning,dispatchRevocation,now=Date.now,timeoutMs=5000,maxAgeMs=30000}={}){
 const names=['readOwnRecovery','withdraw','startOwnRevocation','observeOwnRevocation'];
 if(!hash(creationRef)||names.some(k=>typeof provisioning?.[k]!=='function')||typeof dispatchRevocation!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000||!Number.isSafeInteger(maxAgeMs)||maxAgeMs<1||maxAgeMs>600000)fail();
 const p=Object.fromEntries(names.map(k=>[k,provisioning[k].bind(provisioning)]));let last=-1;
 const invoke=async mutate=>{
  const abort=new AbortController(),wall=performance.now()+timeoutMs;let active=true,timer,attempted=false,freshUntil=8640000000000000;
  const clock=()=>{const t=now();if(!active||abort.signal.aborted||performance.now()>=wall||!time(t)||t<last||t>freshUntil)fail();last=t;return t;};
  const read=async()=>{
   clock();const c=snapshot(await p.readOwnRecovery(creationRef));clock();if(!c)return null;
   if(!exact(c,['contract','purpose','recordRef','creationRef','cause','state','primaryObservedAt','d1ObservedAt','observedAt','registration','approval','primary','d1'])||c.contract!=='afw-qa-own-recovery/v1'||c.purpose!=='administrative-reconciliation-only'||c.creationRef!==creationRef||![c.primaryObservedAt,c.d1ObservedAt,c.observedAt].every(time)||c.primaryObservedAt>c.d1ObservedAt||c.d1ObservedAt>c.observedAt||c.observedAt>clock()||clock()-c.d1ObservedAt>maxAgeMs)fail();
   freshUntil=Math.min(freshUntil,c.d1ObservedAt+maxAgeMs);clock();
   const registration=await validateQaClosureApproval(c.registration,c.approval);clock();const r=c.primary?.reservation,i=c.primary?.intent;
   if(!r||r.contract!=='afw-private-qa-provisioning-record/v1'||r.recordRef!==c.recordRef||r.creationRef!==creationRef||registration.provisioning.creationRef!==creationRef||r.recordRef!==registration.plan.baselineRef||r.deadline!==registration.plan.closeAt||!hash(r.pinsDigest)||!((c.cause==='withdrawn'&&r.state==='withdrawn')||(c.cause==='expired'&&r.state==='reserved'&&clock()>=r.deadline)))fail();
   if(c.d1!==null&&!await matchPrivateInstallationD1(r,i,c.approval,c.d1,clock,{allowRevoked:true}))fail();
   if(c.state!==(c.d1===null?'pending':c.d1.revoked?'own_revocation_observed':'own_row_observed'))fail();
   const anchor=await computeAdministrativeResultDigest({registration:c.registration,approval:c.approval,pinsDigest:r.pinsDigest,intentId:i?.intentId??null});clock();return {context:c,anchor};
  };
  const finish=async anchor=>{
   const current=await read();if(!current||current.anchor!==anchor)fail();
   if(!current.context.d1?.revoked)return {state:'pending',recordRef:current.context.recordRef};
   // This persisted observation may be unavailable after uncertain ACK. It
   // never substitutes for the following independent current D1 observation.
   try{await p.observeOwnRevocation(creationRef);}catch{}clock();
   const final=await read();if(!final||final.anchor!==anchor)fail();
   return final.context.d1?.revoked?{state:'d1_revocation_observed',recordRef:final.context.recordRef,observedAt:final.context.d1ObservedAt,causality:'not-attributed'}:{state:'pending',recordRef:final.context.recordRef};
  };
  const work=async()=>{
   let current=await read();if(!current)return {state:'unavailable'};const anchor=current.anchor;
   if(!mutate)return finish(anchor);
   if(current.context.cause==='expired'){attempted=true;try{await p.withdraw(creationRef,1);}catch{}clock();current=await read();if(!current||current.anchor!==anchor||current.context.cause!=='withdrawn')fail();}
   if(current.context.d1===null||current.context.d1.revoked)return finish(anchor);
   attempted=true;let locator;try{locator=snapshot(await p.startOwnRevocation(creationRef));}catch{}clock();
   if(!locator)return finish(anchor);
   current=await read();if(!current||current.anchor!==anchor||current.context.cause!=='withdrawn')fail();
   if(!exact(locator,['contract','recordRef','intentId','occurrenceId','attemptId'])||locator.contract!=='afw-private-revocation-dispatch/v1'||locator.recordRef!==current.context.recordRef||locator.intentId!==current.context.primary.intent?.intentId||locator.occurrenceId!==current.context.registration.plan.occurrenceId||typeof locator.attemptId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(locator.attemptId))fail();
   if(!current.context.d1||current.context.d1.revoked)return finish(anchor);
   clock();try{await dispatchRevocation(Object.freeze({creationRef,recordRef:locator.recordRef,attemptId:locator.attemptId,provenance:current.context.d1.provenance,signal:abort.signal}));}catch{}clock();
   return finish(anchor);
  };
  try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{active=false;abort.abort();resolve({state:'pending'});},timeoutMs);})]);}catch{return {state:attempted?'pending':'unavailable'};}finally{active=false;abort.abort();clearTimeout(timer);}
 };
 return Object.freeze({run:()=>invoke(true),observe:()=>invoke(false)});
}
