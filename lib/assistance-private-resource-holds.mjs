import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {administrativeClosurePaths,computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const SHA=/^[0-9a-f]{64}$/,CONTRACT='afw-private-qa-resource-reservation/v1',PREFIX=CONTRACT+':';
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const fail=()=>{throw Error('Resource hold unavailable');};
const keys=r=>['token:'+r.tokenId,'application:'+r.applicationId,'policy:'+r.applicationId+':'+r.policyId,'worker:'+r.workerName].map(k=>PREFIX+'owner:'+r.accountId+':'+k);
function record(value,ref){
 const withdrawn=value?.state==='withdrawn';
 if(!exact(value,['contract','recordRef','resources','state','sequence','reservedAt','deadline',...(withdrawn?['withdrawnAt']:[])])||value.contract!==CONTRACT||value.recordRef!==ref||!['held','withdrawn'].includes(value.state)||value.sequence!==(withdrawn?2:1)||!Number.isSafeInteger(value.reservedAt)||value.reservedAt<0||!Number.isSafeInteger(value.deadline)||value.reservedAt>=value.deadline||value.deadline>8640000000000000||(withdrawn&&(!Number.isSafeInteger(value.withdrawnAt)||value.withdrawnAt<value.reservedAt||value.withdrawnAt>8640000000000000)))fail();
 administrativeClosurePaths(value.resources);return structuredClone(value);
}
/** Internal CAS primitive only. All owners must use ONE primary namespace.
 * Holding resources is NOT provisioning authority, evidence verification,
 * installation or permission. No HTTP mount or automatic release/reassignment.
 */
export function createPrivateResourceHolds({storage,readPins,now=Date.now}={}){
 let last=-1;
 const clock=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t>8640000000000000||t<last)fail();last=t;return t;};
 const validRef=ref=>typeof ref==='string'&&SHA.test(ref);
 const source=async ref=>{clock();const p=await readPins();clock();if(!exact(p,['registration','approval']))fail();const r=await validateQaClosureApproval(p.registration,p.approval);const t=clock();if(r.plan.baselineRef!==ref||t<r.provisioning.createdAt||t>=r.plan.closeAt)fail();return {r,digest:await computeAdministrativeResultDigest(p)};};
 const owners=async(tx,r,ref)=>{for(const key of keys(r)){const owner=await tx.get(key);clock();if(!exact(owner,['recordRef'])||owner.recordRef!==ref)fail();}};
 const history=async(tx,ref)=>{clock();const raw=await tx.get(PREFIX+'record:'+ref);clock();if(raw===undefined)return null;const r=record(raw,ref);const observedAt=clock();if(r.reservedAt>observedAt||(r.state==='withdrawn'&&r.withdrawnAt>observedAt))fail();await owners(tx,r.resources,ref);return r;};
 return Object.freeze({
  async reserve(ref){try{
   if(!validRef(ref)||typeof storage?.transaction!=='function'||typeof readPins!=='function')return null;
   const initial=await source(ref);
   const current=async()=>{if((await source(ref)).digest!==initial.digest)fail();};
   return await storage.transaction(async tx=>{
    await current();const old=await history(tx,ref);if(old){if(old.state!=='held'||old.deadline!==initial.r.plan.closeAt||JSON.stringify(old.resources)!==JSON.stringify(initial.r.resources))fail();await current();return old;}
    for(const key of keys(initial.r.resources)){if(await tx.get(key)!==undefined)fail();clock();}
    await current();const reservedAt=clock();const held={contract:CONTRACT,recordRef:ref,resources:structuredClone(initial.r.resources),state:'held',sequence:1,reservedAt,deadline:initial.r.plan.closeAt};
    for(const key of keys(held.resources)){await tx.put(key,{recordRef:ref});clock();}
    await tx.put(PREFIX+'record:'+ref,held);await current();return structuredClone(held);
   });
  }catch{return null;}},
  async read(ref){try{if(!validRef(ref))return null;const p=await source(ref);return await storage.transaction(async tx=>{const r=await history(tx,ref);if(!r||r.state!=='held'||r.deadline!==p.r.plan.closeAt||JSON.stringify(r.resources)!==JSON.stringify(p.r.resources))return null;const fresh=await source(ref);if(fresh.digest!==p.digest)fail();return r;});}catch{return null;}},
  async history(ref){try{if(!validRef(ref))return null;return await storage.transaction(tx=>history(tx,ref));}catch{return null;}},
  async withdraw(ref,expectedSequence){try{if(!validRef(ref)||expectedSequence!==1)return false;return await storage.transaction(async tx=>{const r=await history(tx,ref);if(!r||r.state!=='held'||r.sequence!==expectedSequence)return false;const withdrawnAt=clock();if(withdrawnAt<r.reservedAt)fail();await tx.put(PREFIX+'record:'+ref,{...r,state:'withdrawn',sequence:2,withdrawnAt});clock();return true;});}catch{return false;}},
 });
}
