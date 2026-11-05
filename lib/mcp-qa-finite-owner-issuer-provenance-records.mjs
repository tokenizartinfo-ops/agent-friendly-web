import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {issuerTime,issuerUuid,issuerScopes,issuerIso} from './mcp-qa-finite-preparation-issuer-records.mjs';
// Canonical DATA commitments only. No record asserts caller identity or ownership.
export const FINITE_OWNER_ISSUER_PROVENANCE_PREFIX='afw.finite-owner-issuer-provenance.v1:';
export const FINITE_OWNER_SDK_OPERATIONS=Object.freeze(['sdk_begin','sdk_approve','sdk_complete']);
const defs={
 Root:['preconnectionId','capsuleHash','enrollmentHash','sourceRevision','actorId','qaVersionId','mVersionId','originalConnectionReceiptHash','I0','C0','C1','createdAt'],
 SdkSend:['rootHash','operation','originalRequestId','originalRequestHash','issuedAt','deadline','bindingHash'],
 SdkObserved:['sendHash','resultHash','observedAt','outcome'],
 ExpectedGrant:['rootHash','identityHash','reservationHash','authorizationHash','grantId','approvedRequestHash','scopes','createdAt','expiresAt']
};
const purposes={Root:'afw.finite-owner-issuer-root.v1',SdkSend:'afw.finite-owner-sdk-send.v1',SdkObserved:'afw.finite-owner-sdk-observed.v1',ExpectedGrant:'afw.finite-owner-expected-grant.v1'};
const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
const check=v=>{if(!v)fail();};
function validate(kind,input,sealing=false){
 check(Object.hasOwn(defs,kind));
 const v=own(input);fields(v,['purpose',...defs[kind],...(!sealing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
 check(v.purpose===purposes[kind]&&Buffer.byteLength(canonical(v))<=16384);
 for(const [key,value]of Object.entries(v))if(key.endsWith('Hash'))check(hex(value));
 if(kind==='Root'){
  check(hex(v.preconnectionId)&&hex(v.actorId)&&hex(v.sourceRevision,40)&&issuerUuid(v.qaVersionId)&&issuerUuid(v.mVersionId));
  check(['I0','C0','C1','createdAt'].every(k=>issuerTime(v[k]))&&v.C0===v.I0+900000&&v.C1===v.C0+180000&&v.createdAt>=v.I0&&v.createdAt<v.C0);
 }
 if(kind==='SdkSend')check(FINITE_OWNER_SDK_OPERATIONS.includes(v.operation)&&issuerUuid(v.originalRequestId)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline)&&v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=30000);
 if(kind==='SdkObserved')check(v.outcome==='resolved'&&issuerTime(v.observedAt));
 if(kind==='ExpectedGrant')check(issuerUuid(v.grantId)&&issuerScopes(v.scopes)&&issuerIso(v.createdAt)&&issuerIso(v.expiresAt)&&Date.parse(v.createdAt)<Date.parse(v.expiresAt));
 const body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
 if(!sealing)check(v.recordHash===hash(v.purpose,body));
 return v;
}
export function sealFiniteOwnerIssuerProvenanceRecord(kind,input){
 const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
 return validate(kind,{...body,recordHash:hash(v.purpose,body)});
}
export function encodeFiniteOwnerIssuerProvenanceRecord(kind,input){
 const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;
}
export function decodeFiniteOwnerIssuerProvenanceRecord(kind,raw){
 check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;
}
