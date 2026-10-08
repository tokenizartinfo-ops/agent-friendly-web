import {computeQaClosureBaselineRef,validateQaClosureRegistration} from './assistance-qa-closure-catalog.mjs';
import {createServiceIdentityTransport} from './assistance-service-identity-transport.mjs';
import {createServiceIdentityDisableAction} from './assistance-service-identity-disable.mjs';
import {createAdministrativeGetTransport} from './assistance-administrative-get-transport.mjs';
import {createAdministrativeClosureReadbackV2} from './assistance-administrative-closure-v2.mjs';
const KEYS=['occurrenceId','baselineRef','closeAt'];
const unknown=()=>Object.freeze({verified:false,state:'unknown'});
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)return null;
 const result={};
 for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))return null;result[key]=d.value;}
 return Object.freeze(result);
}
/** Server-only administrative step. Caller must use the coordinator's persistent
 * issued fence before restoreAdministration. Reconstructing these callbacks is
 * not replay authority. No D1 approval attestation or hosted wiring is implied.
 */
export async function createQaAdministrativeClosureActions({catalog,plan,readIdentityCredential,readAdministrativeCredential,fetchImpl=globalThis.fetch,now=Date.now,authorizationTimeoutMs=5000}={}){
 const pin=fields(plan,KEYS);
 if(!pin||typeof catalog?.read!=='function'||[readIdentityCredential,readAdministrativeCredential,fetchImpl,now].some(fn=>typeof fn!=='function')||!Number.isSafeInteger(authorizationTimeoutMs)||authorizationTimeoutMs<1||authorizationTimeoutMs>10000)return null;
 let lastTime=-1,current=null,tail=Promise.resolve();
 function clock(){const t=now();if(!Number.isSafeInteger(t)||t<0||t<lastTime)return false;lastTime=t;return true;}
 const guardedNow=()=>{if(!clock())throw Error('QA closure clock unavailable');return lastTime;};
 const same=(input,step=false)=>{const v=fields(input,step?[...KEYS,'step']:KEYS);return v&&KEYS.every(k=>v[k]===pin[k])&&(!step||v.step==='restoreAdministration');};
 async function readScope(){
  try{
   if(!clock())return null;
   const raw=await catalog.read();if(!clock()||!raw)return null;
   const r=validateQaClosureRegistration(raw);
   if(!KEYS.every(k=>r.plan[k]===pin[k]))return null;
   const digest=await computeQaClosureBaselineRef(r);
   return clock()&&digest===pin.baselineRef?r:null;
  }catch{return null;}
 }
 async function scope(){
  let timer;
  try{return await Promise.race([readScope(),new Promise(resolve=>{timer=setTimeout(()=>resolve(null),authorizationTimeoutMs);})]);}
  finally{clearTimeout(timer);}
 }
 const approved=await scope();if(!approved)return null;
 const serial=(input,step,fn)=>{
  const operation=tail.then(async()=>{current={input,step};try{return await fn();}finally{current=null;}});
  tail=operation.catch(()=>{});return operation;
 };
 try{
  const guardedFetch=async(url,init)=>{
   const call=current;
   if(!call||!same(call.input,call.step)||!await scope()||current!==call||!same(call.input,call.step)||!clock()||lastTime<pin.closeAt||init?.signal?.aborted)throw Error('QA closure request unavailable');
   // Last synchronous gate after custody/catalog awaits and before dispatch.
   return fetchImpl(url,init);
  };
  const identityRequest=createServiceIdentityTransport({identity:{accountId:approved.resources.accountId,tokenId:approved.resources.tokenId,name:approved.identity.name,exclusiveQa:true},closeAt:pin.closeAt,readCredential:readIdentityCredential,fetchImpl:guardedFetch,now:guardedNow});
  const identity=createServiceIdentityDisableAction({plan:pin,identity:{accountId:approved.resources.accountId,tokenId:approved.resources.tokenId,metadataDigest:approved.identity.metadataDigest,exclusiveQa:true},request:identityRequest,now:guardedNow});
  const request=createAdministrativeGetTransport({resources:approved.resources,readCredential:readAdministrativeCredential,fetchImpl:guardedFetch});
  const readback=createAdministrativeClosureReadbackV2({plan:pin,baseline:{contract:'afw-administrative-closure/v2',...approved.resources,digests:approved.digests},request,now:guardedNow});
  return Object.freeze({
   restoreAdministration(input){return serial(input,false,async()=>{try{
    if(!same(input)||!await scope()||!same(input))return unknown();
    const result=await identity.disableServiceIdentity(input);
    if(result.verified!==true||result.state!=='disabled'||!same(input)||!await scope()||!same(input))return unknown();
    return await readback.restoreAdministration(input);
   }catch{return unknown();}});},
   readIssuedReceipt(input){return serial(input,true,async()=>{try{
    if(!same(input,true)||!await scope()||!same(input,true))return unknown();
    return await readback.readIssuedReceipt(input);
   }catch{return unknown();}});}
  });
 }catch{return null;}
}
