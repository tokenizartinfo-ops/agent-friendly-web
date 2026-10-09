import {validateQaClosureRegistration,validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
const KEY='afw-private-qa-preregistration/v1:current',WITHDRAWN=KEY+':withdrawn';
const fail=()=>{throw Error('Private preregistration unavailable');};
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
function copy(v,depth=0){
 if(depth>8)fail();
 if(typeof v==='string'&&v.length<=8192||typeof v==='number'&&Number.isSafeInteger(v))return v;
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length>64)fail();
 const out={};for(const key of Reflect.ownKeys(v)){const d=Object.getOwnPropertyDescriptor(v,key);if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,key,{value:copy(d.value,depth+1),enumerable:true});}return Object.freeze(out);
}
async function pins(value){
 if(!exact(value,['registration','approval']))fail();
 const raw=copy(value),registration=validateQaClosureRegistration(raw.registration),approval=validateOccurrenceApproval(raw.approval);await validateQaClosureApproval(registration,approval);return {registration,approval};
}
/** Private administrative preregistration only. Not provisioning, admission or
 * resource reservation. All methods are internal, with no Worker/RPC mount.
 * Closure history cannot be used as an install source. Never clear/reuse keys.
 */
export function createPrivateQaPreregistration({storage,readPreregistration,now=Date.now}={}){
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
 return Object.freeze({
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
