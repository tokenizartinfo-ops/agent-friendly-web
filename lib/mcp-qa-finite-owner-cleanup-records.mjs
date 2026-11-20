import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {issuerTime as time,issuerUuid as uuid} from './mcp-qa-finite-preparation-issuer-records.mjs';
export const FINITE_OWNER_CLEANUP_PREFIX='afw.finite-owner-cleanup.v1:';
export const FINITE_OWNER_CLEANUP_OPERATIONS=Object.freeze(['monitoring_revoke','sdk_revoke']);
const defs={Identity:'planHash capsuleHash enrollmentHash preconnectionId sourceRevision qaVersionId actorId I0 C0 C1',Send:'identityHash operation requestId requestHash issuedAt deadline',Observed:'sendHash resultHash outcome observedAt',Reconciled:'identityHash sendHash delivery factsHash observedAt',Receipt:'identityHash planHash fenceHash grantFactHash noticeFactHash sdkSendHash sdkObservedHash restoreSendHash restoreAckHash baselineVersionId baselineDeploymentId finalFactsHash observedAt businessAccessClosed sdkReductionReturned globalNativeDrainVerified sdkNamespaceEmptyVerified'};
const fail=()=>{throw Error('Finite owner cleanup record unavailable');},check=v=>{if(!v)fail();};
function validate(kind,input,hashing=false){
 check(Object.hasOwn(defs,kind));const v=own(input),purpose='afw.finite-owner-cleanup-'+kind.toLowerCase()+'.v1';
 fields(v,['purpose',...defs[kind].split(' '),...!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[]]);
 check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
 for(const [k,value]of Object.entries(v))if(k.endsWith('Hash'))check(value===null&&['sdkSendHash','sdkObservedHash','restoreSendHash','restoreAckHash'].includes(k)||hex(value));
 if(kind==='Identity')check(hex(v.preconnectionId)&&hex(v.sourceRevision,40)&&hex(v.actorId)&&uuid(v.qaVersionId)&&[v.I0,v.C0,v.C1].every(time)&&v.C0===v.I0+900000&&v.C1===v.C0+180000);
 if(kind==='Send')check(FINITE_OWNER_CLEANUP_OPERATIONS.includes(v.operation)&&uuid(v.requestId)&&time(v.issuedAt)&&time(v.deadline)&&v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=5000);
 if(kind==='Observed')check(['applied','already_withdrawn','returned'].includes(v.outcome)&&time(v.observedAt));
 if(kind==='Reconciled')check([1,2,3].includes(v.delivery)&&time(v.observedAt));
 if(kind==='Receipt'){
  check(time(v.observedAt)&&uuid(v.baselineVersionId)&&uuid(v.baselineDeploymentId)&&v.businessAccessClosed===true&&v.globalNativeDrainVerified===false&&v.sdkNamespaceEmptyVerified===false&&typeof v.sdkReductionReturned==='boolean');
  check(v.sdkReductionReturned?v.sdkSendHash!==null&&v.sdkObservedHash!==null:v.sdkSendHash===null&&v.sdkObservedHash===null);
  check((v.restoreSendHash===null)===(v.restoreAckHash===null));
 }
 if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));return v;
}
export function sealFiniteOwnerCleanupRecord(kind,input){const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));return validate(kind,{...body,recordHash:hash(v.purpose,body)});}
export function encodeFiniteOwnerCleanupRecord(kind,input){const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;}
export function decodeFiniteOwnerCleanupRecord(kind,raw){check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;}
