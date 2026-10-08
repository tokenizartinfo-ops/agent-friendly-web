import {computeAdministrativeResultDigest,createAdministrativeClosureReadback,administrativeClosurePaths} from './assistance-administrative-closure-readback.mjs';
import {computeServiceIdentityDigest} from './assistance-service-identity-disable.mjs';
const CONTRACT='afw-administrative-closure/v2';
const BASELINE=['contract','accountId','tokenId','workerName','applicationId','policyId','digests'];
// Only parsed primitive token metadata is admitted. No getters, hidden fields or
// symbols can disappear during projection or execute while capturing a snapshot.
function snapshot(value){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)throw Error('Invalid V2 metadata');
 const copy={};
 for(const key of Reflect.ownKeys(value)){
  const d=Object.getOwnPropertyDescriptor(value,key);
  if(typeof key!=='string'||!d?.enumerable||!Object.hasOwn(d,'value'))throw Error('Invalid V2 metadata');
  Object.defineProperty(copy,key,{value:d.value,enumerable:true,writable:false,configurable:false});
 }
 return Object.freeze(copy);
}
async function closedTokenProjection(value){
 const token=snapshot(value);
 if(token.enabled!==false)throw Error('V2 requires disabled identity');
 for(const key of ['updated_at','last_seen_at'])if(Object.hasOwn(token,key)&&token[key]!==null&&(typeof token[key]!=='string'||!Number.isFinite(Date.parse(token[key]))))throw Error('Invalid V2 timestamp');
 // Validates the entire metadata allowlist before omitting observational fields.
 // Its digest is not the V2 digest: V2 also retains the closed enabled state.
 await computeServiceIdentityDigest(token);
 return Object.freeze(Object.fromEntries(Object.entries(token).filter(([k])=>!['updated_at','last_seen_at'].includes(k))));
}
export async function computeAdministrativeTokenDigestV2(token){
 return computeAdministrativeResultDigest(await closedTokenProjection(token));
}
/** Internal read-only contract. V1 baselines are never migrated implicitly.
 * Transport/custody and QA ownership remain separate trusted server concerns.
 */
export function createAdministrativeClosureReadbackV2({plan,baseline,request,now=Date.now}={}){
 const b=snapshot(baseline);
 if(Reflect.ownKeys(b).length!==BASELINE.length||!BASELINE.every(k=>Object.hasOwn(b,k))||b.contract!==CONTRACT||typeof request!=='function')throw Error('Invalid V2 baseline');
 const resources=Object.fromEntries(['accountId','tokenId','workerName','applicationId','policyId'].map(k=>[k,b[k]]));
 const tokenPath=administrativeClosurePaths(resources)[0];
 const digests=snapshot(b.digests);
 return createAdministrativeClosureReadback({plan,baseline:{...resources,digests},now,request:async input=>{
  const response=await request(input);
  if(input.path!==tokenPath)return response;
  if(response?.success!==true||!Object.hasOwn(response,'result')||(response.errors!==undefined&&(!Array.isArray(response.errors)||response.errors.length)))return {success:false};
  const result=await closedTokenProjection(response.result);
  return Object.freeze({success:true,result});
 }});
}
