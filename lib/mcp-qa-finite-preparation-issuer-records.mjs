import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
// Strict component DATA. Neither hashes nor these factories authorize business callers.
export const FINITE_PREPARATION_ISSUER_PREFIX='afw.finite-preparation-issuer.v1:';
export const FINITE_PREPARATION_ISSUER_OPERATIONS=Object.freeze(['open_fence','authorization','consume','grant','close_fence','revoke_grant']);
const fail=()=>{throw Error('Finite preparation issuer record unavailable');};
const check=x=>{if(!x)fail();};
export const issuerTime=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
export const issuerUuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
export const issuerIso=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(x)&&Number.isSafeInteger(Date.parse(x))&&new Date(x).toISOString()===x;
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&!/[\u0000-\u001f\u007f]/.test(x);
export const issuerScopes=x=>Array.isArray(x)&&x.length>=1&&x.length<=2&&x[0]==='afw:project:read'&&new Set(x).size===x.length&&x.every(s=>['afw:project:read','afw:evidence:read'].includes(s));
const identityKeys='preconnectionId enrollmentHash capsuleHash sourceRevision qaVersionId actorId subject accessRealmHash projectId projectRevision clientId resource authorizationHash grantId requestedScopes consentExpiresAt I0 C0 C1 reservedAt identityHash'.split(' ');
function identity(input,hashing=false){
 const v=own(input);fields(v,identityKeys.filter(k=>!hashing||k!=='identityHash'||Object.hasOwn(v,k)));
 check(['preconnectionId','enrollmentHash','capsuleHash','actorId','accessRealmHash','authorizationHash'].every(k=>hex(v[k]))&&hex(v.sourceRevision,40)&&issuerUuid(v.qaVersionId)&&issuerUuid(v.grantId));
 check(['subject','projectId','clientId'].every(k=>id(v[k]))&&Number.isSafeInteger(v.projectRevision)&&v.projectRevision>0&&v.resource==='https://delegated-canary.agentfriendlyweb.dev/mcp'&&issuerScopes(v.requestedScopes));
 check(['I0','C0','C1','reservedAt'].every(k=>issuerTime(v[k]))&&v.C0===v.I0+900000&&v.C1===v.C0+180000&&v.reservedAt>=v.I0&&v.reservedAt<v.C0&&issuerIso(v.consentExpiresAt)&&Date.parse(v.consentExpiresAt)>v.reservedAt&&Date.parse(v.consentExpiresAt)<=v.C0);
 if(!hashing)check(v.identityHash===hash('afw.finite-preparation-issuer-identity.v1',Object.fromEntries(Object.entries(v).filter(([k])=>k!=='identityHash'))));
 return v;
}
export function validateFinitePreparationIssuerIdentity(v){return identity(v);}
const defs={Reservation:['identity','requestHash','issuedAt','deadline'],Send:['identityHash','reservationHash','operation','requestId','requestHash','issuedAt','deadline'],Ack:['sendHash','rowHash','outcome','observedAt'],Freeze:['identityHash','reservationHash','frozenAt']};
function validate(kind,input,hashing=false){
 if(kind==='Identity')return identity(input,hashing);
 check(Object.hasOwn(defs,kind));const v=own(input),purpose='afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1';
 fields(v,['purpose',...defs[kind],...(!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
 check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
 for(const [k,x]of Object.entries(v))if(k.endsWith('Hash')&&k!=='rowHash')check(hex(x));
 if(kind==='Reservation'){identity(v.identity);check(hex(v.requestHash)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline)&&v.issuedAt>=v.identity.reservedAt&&v.deadline<=v.identity.C0);}
 if(kind==='Send')check(FINITE_PREPARATION_ISSUER_OPERATIONS.includes(v.operation)&&(['close_fence','revoke_grant'].includes(v.operation)?issuerUuid(v.requestId):v.requestId===null)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline));
 if(kind==='Reservation'||kind==='Send')check(v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=5000);
 if(kind==='Ack')check(['applied','no_mutation'].includes(v.outcome)&&(v.rowHash===null?v.outcome==='no_mutation':hex(v.rowHash))&&issuerTime(v.observedAt));
 if(kind==='Freeze')check(issuerTime(v.frozenAt));
 if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));
 return v;
}
export function sealFinitePreparationIssuerRecord(kind,input){
 const v=validate(kind,input,true),self=kind==='Identity'?'identityHash':'recordHash',domain=kind==='Identity'?'afw.finite-preparation-issuer-identity.v1':v.purpose;
 const body=Object.fromEntries(Object.entries(v).filter(([k])=>k!==self));
 return validate(kind,{...body,[self]:hash(domain,body)});
}
export function encodeFinitePreparationIssuerRecord(kind,input){const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;}
export function decodeFinitePreparationIssuerRecord(kind,raw){check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;}
