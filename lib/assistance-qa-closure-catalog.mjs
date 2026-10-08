import {computeAdministrativeResultDigest,administrativeClosurePaths} from './assistance-administrative-closure-readback.mjs';
const SHA=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const exact=(v,keys)=>v&&typeof v==='object'&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const fail=()=>{throw Error('Invalid QA closure registration');};
function copy(value,depth=0){
 if(depth>5)fail();
 if(typeof value==='string'){if(value.length>8192)fail();return value;}
 if(typeof value==='number'&&Number.isSafeInteger(value))return value;
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const result={};
 for(const key of Reflect.ownKeys(value)){
  const d=Object.getOwnPropertyDescriptor(value,key);
  if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))fail();
  Object.defineProperty(result,key,{value:copy(d.value,depth+1),enumerable:true});
 }
 return Object.freeze(result);
}
function registration(value){
 const r=copy(value),p=r.plan,q=r.provisioning;
 if(!exact(r,['contract','plan','planRevision','resources','digests','identity','provisioning'])||r.contract!=='afw-qa-closure-approval/v1'||!exact(p,['occurrenceId','baselineRef','closeAt'])||typeof p.occurrenceId!=='string'||!UUID.test(p.occurrenceId)||typeof p.baselineRef!=='string'||!SHA.test(p.baselineRef)||!Number.isSafeInteger(p.closeAt)||p.closeAt<1||!Number.isSafeInteger(r.planRevision)||r.planRevision<1||!exact(r.digests,['token','settings','schedules','policy'])||!Object.values(r.digests).every(v=>typeof v==='string'&&SHA.test(v))||!exact(r.identity,['name','metadataDigest'])||typeof r.identity.name!=='string'||r.identity.name.length<1||r.identity.name.length>4096||typeof r.identity.metadataDigest!=='string'||!SHA.test(r.identity.metadataDigest)||!exact(q,['creationRef','custodyRef','inventoryRef','createdAt','expiresAt'])||!['creationRef','custodyRef','inventoryRef'].every(k=>typeof q[k]==='string'&&SHA.test(q[k]))||![q.createdAt,q.expiresAt].every(v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000)||q.createdAt>=p.closeAt||p.closeAt+10000>q.expiresAt)fail();
 administrativeClosurePaths(r.resources);
 return r;
}
export async function computeQaClosureBaselineRef(value){
 const r=registration(value),{baselineRef:ignored,...plan}=r.plan;
 void ignored;
 return computeAdministrativeResultDigest({...r,plan});
}
/** Internal shared primary server catalog storage and provisioning reader only.
 * The reader must attest real own provisioning/custody/inventory. A callback or
 * synthetic receipt alone does not prove provider ownership or hosted custody.
 * No routes, credentials, provider writes, implicit enrollment or runtime mount.
 */
export function createQaClosureCatalog({storage,registration:value,readProvisioning,now=Date.now}={}){
 const pin=registration(value);
 if(typeof storage?.transaction!=='function'||typeof readProvisioning!=='function'||typeof now!=='function')fail();
 const key='afw-qa-closure-approval/v1:'+pin.plan.occurrenceId,revoked=key+':revoked';
 const tokenKey='afw-qa-closure-token/v1:'+pin.resources.accountId+':'+pin.resources.tokenId;
 let lastTime=-1,fullDigest;
 function clock(approval=false){const t=now();if(!Number.isSafeInteger(t)||t<lastTime||t<pin.provisioning.createdAt||(approval&&t>=pin.plan.closeAt))return false;lastTime=t;return true;}
 const digest=()=>fullDigest??=computeAdministrativeResultDigest(pin);
 async function matches(raw){try{return (await computeAdministrativeResultDigest(registration(raw)))===(await digest());}catch{return false;}}
 async function proof(){
  if(!clock()||(await computeQaClosureBaselineRef(pin))!==pin.plan.baselineRef)return false;
  const r=await readProvisioning(pin.provisioning.creationRef);
  if(!clock()||!r||Object.getPrototypeOf(r)!==Object.prototype)return false;
  const keys=Reflect.ownKeys(r);
  if(keys.length!==3||!['contract','recordRef','state'].every(k=>keys.includes(k)&&Object.getOwnPropertyDescriptor(r,k)?.enumerable&&Object.hasOwn(Object.getOwnPropertyDescriptor(r,k),'value')))return false;
  return r.contract==='afw-qa-provisioning/v1'&&r.recordRef===pin.plan.baselineRef&&r.state==='exclusive';
 }
 async function stored(tx){
  const raw=await tx.get(key);
  if(!clock()||!raw||!await matches(raw)||!clock()||await tx.get(revoked)!==undefined||!clock()||await tx.get(tokenKey)!==pin.plan.baselineRef||!clock())return null;
  return pin;
 }
 return Object.freeze({
  async approve(){try{
   if(!clock(true)||!await proof()||!clock(true))return false;
   return await storage.transaction(async tx=>{
    const old=await tx.get(key),withdrawal=await tx.get(revoked),owner=await tx.get(tokenKey);
    if(!clock(true)||withdrawal!==undefined)return false;
    if(old!==undefined)return owner===pin.plan.baselineRef&&await matches(old)&&clock(true);
    if(owner!==undefined)return false;
    if(!clock(true))return false;
    await tx.put(tokenKey,pin.plan.baselineRef);
    if(!clock(true))throw Error('QA approval window closed');
    await tx.put(key,pin);
    // Throw inside the transaction: both entries roll back on a late write.
    if(!clock(true))throw Error('QA approval window closed');
    return true;
   });
  }catch{return false;}},
  async read(){try{
   if(!clock()||!await storage.transaction(stored)||!await proof()||!clock())return null;
   // Recheck revocation after awaited primary receipt; never cache authority.
   return await storage.transaction(stored);
  }catch{return null;}},
  async revoke(){try{return await storage.transaction(async tx=>{
   const old=await tx.get(key);if(!await matches(old)||!clock())return false;
   const existing=await tx.get(revoked);if(existing!==undefined)return exact(existing,['recordRef'])&&existing.recordRef===pin.plan.baselineRef;
   if(!clock())return false;await tx.put(revoked,{recordRef:pin.plan.baselineRef});return true;
  });}catch{return false;}}
 });
}
