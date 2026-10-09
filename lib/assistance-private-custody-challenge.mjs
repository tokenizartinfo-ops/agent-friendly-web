import {validateQaClosureRegistration,validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
const KEY='afw-private-custody-challenge/v1:current',WITHDRAWN=KEY+':withdrawn';
const HASH=/^[0-9a-f]{64}$/,CONTRACT='afw-private-custody-challenge/v1';
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>Object.getOwnPropertyDescriptor(v,k)?.enumerable&&Object.hasOwn(Object.getOwnPropertyDescriptor(v,k),'value'));
const fail=()=>{throw Error('Private challenge unavailable');};
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
const digest=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v))),x=>x.toString(16).padStart(2,'0')).join('');
function record(v){
 const fields=['contract','state','recordRef','principalRef','nonceDigest','receiptRef','issuedAt','deadline',...(v?.state==='confirmed'?['consumedAt']:[])];
 if(!exact(v,fields)||v.contract!==CONTRACT||!['issued','confirmed'].includes(v.state)||!['recordRef','principalRef','nonceDigest','receiptRef'].every(k=>typeof v[k]==='string'&&HASH.test(v[k]))||![v.issuedAt,v.deadline].every(time)||v.issuedAt>=v.deadline||v.state==='confirmed'&&(!time(v.consumedAt)||v.consumedAt<v.issuedAt||v.consumedAt>=v.deadline))fail();
 return structuredClone(v);
}
function metadata(r,withdrawn=false){return {contract:CONTRACT,state:withdrawn?'withdrawn':r.state,recordRef:r.recordRef,receiptRef:r.receiptRef,issuedAt:r.issuedAt,deadline:r.deadline,...(r.state==='confirmed'?{consumedAt:r.consumedAt}:{})};}
/** INTERNAL only. The host supplies synchronous trusted operator state and an
 * independently authenticated request context. Synthetic callbacks prove only
 * this lifecycle; confirmation is NOT cloud attestation/provisioning authority.
 * No Worker, HTTP/RPC, catalog installation or credential values are involved.
 */
export function createPrivateCustodyChallenge({storage,readInstallation,readServiceIdentity,now=Date.now}={}){
 let last=-1;
 const clock=()=>{const t=now();if(!time(t)||t<last)fail();last=t;return t;};
 function source(){
  const s=readInstallation();if(s&&typeof s.then==='function'){if(typeof s.catch==='function')void s.catch(()=>{});fail();}
  if(!exact(s,['registration','approval']))fail();
  return {registration:validateQaClosureRegistration(s.registration),approval:validateOccurrenceApproval(s.approval)};
 }
 async function context(){
  if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof readInstallation!=='function'||typeof now!=='function')fail();
  const s=source(),fingerprint=JSON.stringify(s);await validateQaClosureApproval(s.registration,s.approval);
  const check=(authenticated=false)=>{
   if(JSON.stringify(source())!==fingerprint)fail();const t=clock(),r=s.registration;
   if(t<r.provisioning.createdAt||t>=r.plan.closeAt)fail();
   if(authenticated){const i=readServiceIdentity?.();if(i&&typeof i.then==='function'){if(typeof i.catch==='function')void i.catch(()=>{});fail();}if(!exact(i,['principalRef','expiresAt'])||i.principalRef!==s.approval.identityRef||!time(i.expiresAt)||t>=i.expiresAt)fail();}
   return t;
  };
  check();return {...s,check};
 }
 return Object.freeze({
  async issue(){try{
   const c=await context(),issuedAt=c.check(),nonce=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join(''),nonceDigest=await digest(nonce);c.check();
   const recordRef=c.registration.plan.baselineRef,deadline=c.registration.plan.closeAt,receiptRef=await digest(JSON.stringify([recordRef,nonceDigest,issuedAt,deadline]));c.check();
   await storage.transaction(async tx=>{if(await tx.get(WITHDRAWN)!==undefined||await tx.get(KEY)!==undefined)fail();c.check();await tx.put(KEY,{contract:CONTRACT,state:'issued',recordRef,principalRef:c.approval.identityRef,nonceDigest,receiptRef,issuedAt,deadline});c.check();});
   c.check();return {nonce,recordRef};
  }catch{return null;}},
  async consume(input){try{
   if(!exact(input,['nonce'])||typeof input.nonce!=='string'||!HASH.test(input.nonce))fail();
   const nonce=input.nonce,c=await context(),nonceDigest=await digest(nonce);c.check(true);
   const result=await storage.transaction(async tx=>{
    if(await tx.get(WITHDRAWN)!==undefined)fail();const r=record(await tx.get(KEY)),t=c.check(true);
    if(r.state!=='issued'||r.recordRef!==c.registration.plan.baselineRef||r.principalRef!==c.approval.identityRef||r.deadline!==c.registration.plan.closeAt||r.issuedAt>t||r.nonceDigest!==nonceDigest)fail();
    const updated={...r,state:'confirmed',consumedAt:t};await tx.put(KEY,updated);c.check(true);return metadata(updated);
   });
   c.check(true);return result;
  }catch{return null;}},
  async status(){try{clock();return await storage.transaction(async tx=>{const r=record(await tx.get(KEY));clock();const withdrawn=await tx.get(WITHDRAWN);clock();return metadata(r,withdrawn!==undefined);});}catch{return null;}},
  async withdraw(){try{if(typeof storage?.transaction!=='function')fail();clock();await storage.transaction(async tx=>{const old=await tx.get(WITHDRAWN);clock();if(old===undefined){await tx.put(WITHDRAWN,{at:clock()});clock();}});return true;}catch{return false;}},
 });
}
