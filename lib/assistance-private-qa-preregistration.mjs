import {createPrivateExecutionCorrelation} from './assistance-private-execution-correlation.mjs';
import {createPrivateCustodyChallenge} from './assistance-private-custody-challenge.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
import {validateQaClosureRegistration,validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
const KEY='afw-private-qa-preregistration/v1:current',WITHDRAWN=KEY+':withdrawn';
const ORIGINALS='afw-private-qa-originals/v1:current';
const hash=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
function originalCopy(v,depth=0,budget={left:1024}){if(depth>12||--budget.left<0)fail();if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;if(typeof v==='string'&&v.length<=8192)return v;if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length>32)fail();const out={};for(const k of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,k,{value:originalCopy(d.value,depth+1,budget),enumerable:true});}return Object.freeze(out);}
const fail=()=>{throw Error('Private preregistration unavailable');};
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
function copy(v,depth=0){
 if(depth>8)fail();
 if(typeof v==='string'&&v.length<=8192||typeof v==='number'&&Number.isSafeInteger(v))return v;
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length>64)fail();
 const out={};for(const key of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,key,{value:copy(d.value,depth+1),enumerable:true});}return Object.freeze(out);
}
export function snapshotOperatorOriginals(value){const v=originalCopy(value);if(!exact(v,['context','execution']))fail();return v;}
async function pins(value){
 if(!exact(value,['registration','approval']))fail();
 const raw=copy(value),registration=validateQaClosureRegistration(raw.registration),approval=validateOccurrenceApproval(raw.approval);await validateQaClosureApproval(registration,approval);return {registration,approval};
}
/** Private administrative preregistration only. Not provisioning, admission or
 * resource reservation. All methods are internal, with no Worker/RPC mount.
 * Closure history cannot be used as an install source. Never clear/reuse keys.
 */
export function createPrivateQaPreregistration({storage,readPreregistration,readOriginalControl,now=Date.now}={}){
 let last=-1;
 const clock=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t>8640000000000000||t<last)fail();last=t;return t;};
 const window=p=>{const t=clock();if(t<p.registration.provisioning.createdAt||t>=p.registration.plan.closeAt)fail();return t;};
 const currentSource=()=>{
  if(typeof readPreregistration!=='function')fail();const raw=readPreregistration();
  if(!exact(raw,['registration','approval'])){if(raw instanceof Promise)void Promise.prototype.catch.call(raw,()=>{});fail();}const v=copy(raw);
  return {registration:validateQaClosureRegistration(v.registration),approval:validateOccurrenceApproval(v.approval)};
 };
 const current=p=>{if(JSON.stringify(currentSource())!==JSON.stringify(p))fail();window(p);};
 const source=async()=>{clock();const p=await pins(currentSource());current(p);return p;};
 const check=async p=>{if(JSON.stringify(await source())!==JSON.stringify(p))fail();current(p);};
 const stored=async tx=>{
  const raw=await tx.get(KEY);clock();if(!exact(raw,['contract','pins','registeredAt'])||raw.contract!=='afw-private-qa-preregistration/v1'||!Number.isSafeInteger(raw.registeredAt))fail();
  const p=await pins(raw.pins);clock();if(raw.registeredAt<p.registration.provisioning.createdAt||raw.registeredAt>=p.registration.plan.closeAt)fail();return p;
 };
 const fence=async p=>{await storage.transaction(async tx=>{if(await tx.get(WITHDRAWN)!==undefined)fail();const raw=await tx.get(KEY);window(p);if(!exact(raw,['contract','pins','registeredAt'])||raw.contract!=='afw-private-qa-preregistration/v1'||JSON.stringify(raw.pins)!==JSON.stringify(p))fail();});window(p);};
 // Cloudflare API Workflow + internal binding is the administrative channel.
 // operatorRef is configured documentary attribution, never caller authentication.
 const originalControl=()=>{if(typeof readOriginalControl!=='function')fail();const c=originalCopy(readOriginalControl());if(!exact(c,['enabled','operatorRef','cloud'])||c.enabled!==true||!hash(c.operatorRef)||!exact(c.cloud,['threadId','environmentId','cwd','commandDigest']))fail();return c;};
 const originalContext=async()=>{const p=await source(),c=originalControl(),fingerprint=JSON.stringify(c),ref=p.registration.plan.baselineRef,pinsDigest=await computeAdministrativeResultDigest({...p,cloud:c.cloud});current(p);if(JSON.stringify(originalControl())!==fingerprint)fail();return {p,c,ref,pinsDigest,checked:()=>{current(p);if(JSON.stringify(originalControl())!==fingerprint)fail();}};};
 const originalRecord=async tx=>{const raw=await tx.get(ORIGINALS);clock();if(raw===undefined)return null;const r=originalCopy(raw);if(!exact(r,['contract','recordRef','operatorRef','pinsDigest','originalsDigest','receivedAt','sequence','originals','recordDigest'])||r.contract!=='afw-private-qa-originals/v1'||![r.recordRef,r.operatorRef,r.pinsDigest,r.originalsDigest,r.recordDigest].every(hash)||r.sequence!==1||!Number.isSafeInteger(r.receivedAt)||r.receivedAt<0||r.receivedAt>clock()||!exact(r.originals,['context','execution']))fail();const {recordDigest,...body}=r;if(recordDigest!==await computeAdministrativeResultDigest(body)||r.originalsDigest!==await computeAdministrativeResultDigest(r.originals))fail();clock();return r;};
 const originalProof=async(tx,c,originals)=>{
  c.checked();if(await tx.get(WITHDRAWN)!==undefined)fail();if(JSON.stringify(await stored(tx))!==JSON.stringify(c.p))fail();c.checked();
  // Reuse the actual challenge journal IN this transaction, not a nested DO
  // transaction or caller receipt. Metadata never returns the nonce/digest.
  const challenge=createPrivateCustodyChallenge({storage:{get:key=>tx.get(key),transaction:fn=>fn(tx)},readInstallation:()=>c.p,now:clock});
  const correlation=await createPrivateExecutionCorrelation({readPins:async()=>{c.checked();return {...c.p,cloud:c.c.cloud};},readOfficialContext:async()=>originals.context,readExecution:async()=>originals.execution,readChallengeObservation:async()=>({contract:'afw-private-qa-observation/v1',state:'observed',recordRef:c.ref,challenge:await challenge.status()}),now:clock}).read(c.ref);
  if(!correlation)fail();c.checked();if(await tx.get(WITHDRAWN)!==undefined)fail();c.checked();return correlation;
 };
 const activeOriginal=async c=>storage.transaction(async tx=>{const r=await originalRecord(tx);if(!r||r.recordRef!==c.ref||r.operatorRef!==c.c.operatorRef||r.pinsDigest!==c.pinsDigest||r.receivedAt<c.p.registration.provisioning.createdAt||r.receivedAt>=c.p.registration.plan.closeAt)fail();const correlation=await originalProof(tx,c,r.originals);return {record:r,correlation};});
 const finalOriginalFence=async(c,final)=>{
  // Independent atomic primary snapshot AFTER transaction acknowledgement.
  const challengeKey='afw-private-custody-challenge/v1:current';
  const keys=[KEY,WITHDRAWN,ORIGINALS,challengeKey,challengeKey+':withdrawn'];
  if(typeof storage.get!=='function')fail();const rows=await storage.get(keys);c.checked();
  if(!(rows instanceof Map)||rows.has(WITHDRAWN)||rows.has(challengeKey+':withdrawn'))fail();
  const p=rows.get(KEY),r=rows.get(ORIGINALS),challenge=rows.get(challengeKey);
  if(!exact(p,['contract','pins','registeredAt'])||p.contract!=='afw-private-qa-preregistration/v1'||JSON.stringify(p.pins)!==JSON.stringify(c.p)||r?.recordDigest!==final.record.recordDigest||challenge?.state!=='confirmed'||challenge.recordRef!==c.ref||challenge.receiptRef!==final.correlation.receiptRef)fail();
  const o=final.record.originals,t=clock();if(t>Math.min(o.context.observedAt,o.execution.observedAt,o.execution.turnStartedAt,o.execution.turnCompletedAt,challenge.issuedAt,challenge.consumedAt)+30000)fail();c.checked();
 };
 return Object.freeze({
  async appendOperatorObservation(recordRef,expectedSequence,originals){try{
   originals=originalCopy(originals);if(!exact(originals,['context','execution'])||expectedSequence!==0||!hash(recordRef))fail();const c=await originalContext();if(recordRef!==c.ref)fail();const originalsDigest=await computeAdministrativeResultDigest(originals);c.checked();
   await storage.transaction(async tx=>{await originalProof(tx,c,originals);const old=await originalRecord(tx);if(old){if(old.recordRef!==c.ref||old.operatorRef!==c.c.operatorRef||old.pinsDigest!==c.pinsDigest||old.originalsDigest!==originalsDigest)fail();return;}const body={contract:'afw-private-qa-originals/v1',recordRef:c.ref,operatorRef:c.c.operatorRef,pinsDigest:c.pinsDigest,originalsDigest,receivedAt:window(c.p),sequence:1,originals},recordDigest=await computeAdministrativeResultDigest(body);c.checked();await tx.put(ORIGINALS,{...body,recordDigest});c.checked();if(await tx.get(WITHDRAWN)!==undefined)fail();c.checked();});
   const final=await activeOriginal(c);await finalOriginalFence(c,final);c.checked();return final.record.originalsDigest===originalsDigest;
  }catch{return false;}},
  async readOperatorObservation(){try{const c=await originalContext(),first=await activeOriginal(c),final=await activeOriginal(c);c.checked();if(first.record.recordDigest!==final.record.recordDigest)fail();await finalOriginalFence(c,final);c.checked();return structuredClone({originals:final.record.originals,correlation:final.correlation,operatorRef:final.record.operatorRef,receivedAt:final.record.receivedAt});}catch{return null;}},
  async readOperatorHistory(){try{return structuredClone(await storage.transaction(originalRecord));}catch{return null;}},
  async register(){try{
   const p=await source(),registeredAt=window(p);
   await storage.transaction(async tx=>{
    if(await tx.get(WITHDRAWN)!==undefined||await tx.get(KEY)!==undefined)fail();await check(p);
    await tx.put(KEY,{contract:'afw-private-qa-preregistration/v1',pins:p,registeredAt});await check(p);
   });await check(p);await fence(p);current(p);return true;
  }catch{return false;}},
  async read(){try{
   const p=await storage.transaction(async tx=>{if(await tx.get(WITHDRAWN)!==undefined)fail();const p=await stored(tx);await check(p);if(await tx.get(WITHDRAWN)!==undefined)fail();window(p);return p;});
   await check(p);await fence(p);current(p);return structuredClone(p);
  }catch{return null;}},
  async readForClosure(){try{return structuredClone(await storage.transaction(stored));}catch{return null;}},
  async withdraw(){try{
   await storage.transaction(async tx=>{const p=await stored(tx),old=await tx.get(WITHDRAWN);clock();if(old===undefined){await tx.put(WITHDRAWN,{recordRef:p.registration.plan.baselineRef,at:clock()});clock();}else if(!exact(old,['recordRef','at'])||old.recordRef!==p.registration.plan.baselineRef||!Number.isSafeInteger(old.at))fail();});clock();return true;
  }catch{return false;}},
 });
}
