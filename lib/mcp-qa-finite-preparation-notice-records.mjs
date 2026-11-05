import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {validateFinitePreparationIssuerIdentity as identity,issuerTime as time,issuerUuid as uuid,issuerIso as iso,issuerScopes as scopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
// DATA checksums only. No caller, SQL, human decision or Access authentication.
export const FINITE_PREPARATION_NOTICE_PREFIX='afw.finite-preparation-notice.v1:';
export const FINITE_PREPARATION_NOTICE_OPERATIONS=Object.freeze(['ticket','consent']);
const fail=()=>{throw Error('Finite preparation notice unavailable');};
const check=x=>{if(!x)fail();};
const definitions={Reservation:'identity issuerReservationHash originalGrantAckHash grantLinkHash connectionHash expectedGrant consumedAt accessExpiresAt preconnectionExpiresAt ticket issuedAt',Send:'identityHash reservationHash operation requestHash accessExpiresAt window issuedAt decisionHash',Ack:'sendHash outcome rowHash sequence observedAt',Freeze:'identityHash reservationHash frozenAt'};
function validate(kind,input,hashing=false){
 check(Object.hasOwn(definitions,kind));const v=own(input),purpose='afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1';
 fields(v,['purpose',...definitions[kind].split(' '),...(!hashing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
 check(v.purpose===purpose&&Buffer.byteLength(canonical(v))<=16384);
 if(kind==='Reservation'){
  const i=identity(v.identity),g=v.expectedGrant,t=v.ticket;
  check(['issuerReservationHash','originalGrantAckHash','grantLinkHash','connectionHash'].every(k=>hex(v[k])));
  fields(g,['scopes','createdAt','expiresAt']);check(scopes(g.scopes)&&g.scopes.every((s,k)=>i.requestedScopes[k]===s)&&iso(g.createdAt)&&iso(g.expiresAt)&&iso(v.consumedAt));
  const created=Date.parse(g.createdAt),expires=Date.parse(g.expiresAt),consumed=Date.parse(v.consumedAt);
  check(time(v.issuedAt)&&time(v.accessExpiresAt)&&time(v.preconnectionExpiresAt)&&v.accessExpiresAt>v.issuedAt&&v.preconnectionExpiresAt>v.issuedAt);
  check(consumed>=i.reservedAt&&created>=consumed&&expires>created&&expires<=Math.min(i.C0,Date.parse(i.consentExpiresAt),v.preconnectionExpiresAt));
  fields(t,['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt']);
  check(hex(t.handleHash)&&uuid(t.requestId)&&t.expectedSequence===0&&['issuedAt','expiresAt','permissionExpiresAt'].every(k=>time(t[k])));
  check(t.issuedAt>=Math.max(i.reservedAt,created,consumed)&&t.issuedAt<t.permissionExpiresAt&&t.permissionExpiresAt<=t.expiresAt&&t.expiresAt-t.issuedAt<=600000);
  check(t.expiresAt<=Math.min(i.C0,Date.parse(i.consentExpiresAt),expires,v.accessExpiresAt,v.preconnectionExpiresAt)&&v.issuedAt>=t.issuedAt&&v.issuedAt<t.permissionExpiresAt);
 }else if(kind==='Send'){
  check(['identityHash','reservationHash','requestHash'].every(k=>hex(v[k]))&&FINITE_PREPARATION_NOTICE_OPERATIONS.includes(v.operation)&&time(v.accessExpiresAt)&&time(v.issuedAt));
  fields(v.window,['startedAt','deadline']);const w=v.window;
  check(time(w.startedAt)&&time(w.deadline)&&w.deadline>w.startedAt&&w.deadline-w.startedAt<=5000&&v.issuedAt>=w.startedAt&&v.issuedAt<w.deadline);
  check(v.operation==='ticket'?v.decisionHash===null:hex(v.decisionHash));
 }else if(kind==='Ack'){
  check(hex(v.sendHash)&&time(v.observedAt)&&['applied','no_mutation'].includes(v.outcome));
  check(v.outcome==='no_mutation'?v.rowHash===null&&v.sequence===null:hex(v.rowHash)&&(v.sequence===null||Number.isSafeInteger(v.sequence)&&v.sequence>0));
 }else check(hex(v.identityHash)&&hex(v.reservationHash)&&time(v.frozenAt));
 if(!hashing)check(v.recordHash===hash(purpose,Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'))));
 return v;
}
const safe=fn=>{try{return fn();}catch{fail();}};
export function sealFinitePreparationNoticeRecord(kind,input){return safe(()=>{
 const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
 return validate(kind,{...body,recordHash:hash(v.purpose,body)});
});}
export function encodeFinitePreparationNoticeRecord(kind,input){return safe(()=>{const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;});}
export function decodeFinitePreparationNoticeRecord(kind,raw){return safe(()=>{
 check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(raw===canonical(v));return v;
});}
