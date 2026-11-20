import {initialOwn as own,initialFields as fields,initialHex as hex,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
import {FINITE_PREPARATION_NOTICE_PREFIX as P,FINITE_PREPARATION_NOTICE_OPERATIONS as OPS,encodeFinitePreparationNoticeRecord as encode,decodeFinitePreparationNoticeRecord as decode} from './mcp-qa-finite-preparation-notice-records.mjs';
import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
const fail=()=>{throw Error('Finite preparation notice unavailable');};
const check=x=>{if(!x)fail();};
const safe=fn=>{try{return fn();}catch{fail();}};
const prepare=(kind,v)=>decode(kind,encode(kind,v));
const key=id=>{check(hex(id));return P+id+':';};
function validateHistory(out,id,c){
 const r=out.reservation,{ticket,consent}=out.operations;
 if(!r){check(!out.freeze&&!ticket.send&&!ticket.ack&&!consent.send&&!consent.ack);return out;}
 check(r.identity.preconnectionId===id&&r.identity.actorId===c.actorId&&r.identity.qaVersionId===c.qa);
 if(out.freeze)check(out.freeze.identityHash===r.identity.identityHash&&out.freeze.reservationHash===r.recordHash&&out.freeze.frozenAt>=r.issuedAt&&out.freeze.frozenAt<r.identity.C1);
 for(const op of OPS){
  const {send:s,ack:a}=out.operations[op];
  if(s){
   check(s.operation===op&&s.identityHash===r.identity.identityHash&&s.reservationHash===r.recordHash&&s.window.startedAt>=r.issuedAt);
   check(s.accessExpiresAt<=r.accessExpiresAt&&s.accessExpiresAt>=r.ticket.expiresAt&&(op!=='ticket'||s.accessExpiresAt===r.accessExpiresAt));
   check(s.window.deadline<=Math.min(r.identity.C0,Date.parse(r.identity.consentExpiresAt),Date.parse(r.expectedGrant.expiresAt),s.accessExpiresAt,r.preconnectionExpiresAt,r.ticket.expiresAt,r.ticket.permissionExpiresAt));
   const decision=op==='ticket'?null:hash('afw.finite-preparation-notice-decision.v1',{identityHash:r.identity.identityHash,ticketRequestId:r.ticket.requestId,handleHash:r.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt:s.issuedAt});
   check(s.decisionHash===decision);
   const common={identity:r.identity,expectedGrant:r.expectedGrant,consumedAt:r.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:r.preconnectionExpiresAt,window:s.window};
   check(s.requestHash===hash('afw.finite-preparation-notice-request.v1',{operation:op,common,ticket:r.ticket,decisionHash:decision}));
   if(op==='consent')check(ticket.ack?.outcome==='applied'&&s.issuedAt>=ticket.ack.observedAt);
  }
  if(a)check(s&&a.sendHash===s.recordHash&&a.observedAt>=s.issuedAt&&a.observedAt<s.window.deadline&&(a.outcome!=='applied'||(op==='ticket'?a.sequence===null:Number.isSafeInteger(a.sequence)&&a.sequence>0)));
 }
 return out;
}
const frozen=out=>{for(const op of OPS)Object.freeze(out.operations[op]);Object.freeze(out.operations);return Object.freeze(out);};
// Exhaustive six-row journal. DATA/order/durability only; ACK is not SQL authority.
export function createFinitePreparationNoticeJournal(options){return safe(()=>{
 fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
 async function readAll(id,g,tx=c.storage){
  const prefix=key(id),listing=tx.list;check(typeof listing==='function');g();
  const rows=await c.wait(Reflect.apply(listing,tx,[{prefix,limit:7}]),g);check(rows instanceof Map&&rows.size<=6);
  const out={reservation:null,freeze:null,operations:{ticket:{send:null,ack:null},consent:{send:null,ack:null}}};
  for(const [k,raw]of rows){
   check(typeof k==='string'&&k.startsWith(prefix));const name=k.slice(prefix.length);
   if(name==='reservation'||name==='freeze')out[name]=decode(name==='reservation'?'Reservation':'Freeze',raw);
   else{const parts=name.split(':');check(parts.length===2&&OPS.includes(parts[0])&&['send','ack'].includes(parts[1]));out.operations[parts[0]][parts[1]]=decode(parts[1]==='send'?'Send':'Ack',raw);}
  }
  return frozen(validateHistory(out,id,c));
 }
 async function append(id,suffix,kind,record,lease){
  const v=prepare(kind,record),g=safe(()=>c.leaseGuard(lease)),prefix=key(id),raw=encode(kind,v);safe(g);
  let status='uncertain';
  try{
   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
    const tg=tx.get,tp=tx.put,tl=tx.list;check([tg,tp,tl].every(f=>typeof f==='function'));
    const guard=()=>{g();check(tx.get===tg&&tx.put===tp&&tx.list===tl);};
    const before=await readAll(id,guard,tx);
    guard();const old=await c.wait(Reflect.apply(tg,tx,[prefix+suffix]),guard);
    // Exact replay remains observable after freeze; it never authorizes SQL.
    if(old!==undefined){check(old===raw);return 'existing';}
    if(kind!=='Reservation')check(before.reservation);
    if(kind==='Send'||kind==='Ack')check(!before.freeze);
    const after={...before,operations:Object.fromEntries(OPS.map(op=>[op,{...before.operations[op]}]))};
    if(kind==='Reservation')after.reservation=v;
    else if(kind==='Freeze')after.freeze=v;
    else{const [op,field]=suffix.split(':');after.operations[op][field]=v;}
    validateHistory(after,id,c);
    guard();await c.wait(Reflect.apply(tp,tx,[prefix+suffix,raw]),guard);guard();return 'recorded';
   }]),g);
   g();await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
   const observed=await c.wait(Reflect.apply(c.get,c.storage,[prefix+suffix]),g);check(observed===raw);decode(kind,observed);check(['recorded','existing'].includes(result));status=result;
  }catch{status='uncertain';}
  return Object.freeze({status,recordHash:v.recordHash});
 }
 const input=(v,keys)=>safe(()=>{const d=own(v);fields(d,keys);return d;});
 return Object.freeze({
  appendReservation(record,lease){const v=prepare('Reservation',record);return append(v.identity.preconnectionId,'reservation','Reservation',v,lease);},
  appendSend(options,lease){const v=input(options,['preconnectionId','record']),r=prepare('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
  appendAck(options,lease){const v=input(options,['preconnectionId','operation','record']);safe(()=>check(OPS.includes(v.operation)));return append(v.preconnectionId,v.operation+':ack','Ack',v.record,lease);},
  freeze(options,lease){const v=input(options,['preconnectionId','record']);return append(v.preconnectionId,'freeze','Freeze',v.record,lease);},
  async read(options,lease){try{const v=input(options,['preconnectionId']),g=c.leaseGuard(lease);return await readAll(v.preconnectionId,g);}catch{fail();}}
 });
});}
