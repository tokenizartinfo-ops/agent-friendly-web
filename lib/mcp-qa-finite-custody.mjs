import receipt from '../scripts/mcp-qa-finite-custody-receipt.json' with {type:'json'};
import {finiteHash,finiteSame} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite custody unavailable');};
const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec';
const approved=Object.freeze({id:receipt.tokenId,expiresAt:Date.parse(receipt.expiresAt),policyHash:receipt.policyHash,permissionGroupIds:Object.freeze([...receipt.permissionGroupIds])});
/** Dated SOURCE commitment, NOT fresh policy equivalence. No key/raw policy. */
export function finiteGhaCustody(){return approved;}
export function assertFiniteGhaCustody(value){
 if(!value||Object.keys(value).length!==4||value.id!==approved.id||value.expiresAt!==approved.expiresAt||value.policyHash!==approved.policyHash||!Array.isArray(value.permissionGroupIds)||!finiteSame([...value.permissionGroupIds].sort(),[...approved.permissionGroupIds].sort()))fail();
 return approved;
}
/** Safe actual CF envelope, including informational code10000/type:null. */
export function finiteCfEnvelope(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['success','errors','messages','result','result_info'].includes(k))||value.success!==true||!Array.isArray(value.errors)||value.errors.length||!Array.isArray(value.messages)||!Object.hasOwn(value,'result'))fail();
 for(const m of value.messages){
  if(!m||typeof m!=='object'||Array.isArray(m)||Object.keys(m).some(k=>!['code','message','type'].includes(k))||!Number.isSafeInteger(m.code)||typeof m.message!=='string'||m.message.length>4096||m.type!==undefined&&m.type!==null&&typeof m.type!=='string')fail();
 }
 return value.result;
}
export async function verifyFiniteGhaCustody({custody,request,check,now,R1}){
 const expected=assertFiniteGhaCustody(custody);check();
 const r=await request('/accounts/'+ACCOUNT+'/tokens/verify');check();
 const v=finiteCfEnvelope(r.value),expiry=Date.parse(v?.expires_on),notBefore=v?.not_before;
 if(!v||Object.keys(v).some(k=>!['id','status','expires_on','not_before'].includes(k))||v.id!==expected.id||v.status!=='active'||expiry!==expected.expiresAt||expiry<R1||now()>=expiry||notBefore!==undefined&&notBefore!==null&&(!Number.isSafeInteger(Date.parse(notBefore))||Date.parse(notBefore)>now())||receipt.notBefore!==null&&Date.parse(notBefore)!==Date.parse(receipt.notBefore))fail();
 check();
 return Object.freeze({custodyHash:finiteHash({id:expected.id,expiresAt:expected.expiresAt,policyHash:expected.policyHash}),expiresAt:expected.expiresAt,scopeVerified:false,sourceQualification:receipt.sourceQualification});
}
