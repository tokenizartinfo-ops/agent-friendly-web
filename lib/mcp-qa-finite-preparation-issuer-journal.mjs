import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {FINITE_PREPARATION_ISSUER_PREFIX as P,FINITE_PREPARATION_ISSUER_OPERATIONS as OPS,encodeFinitePreparationIssuerRecord as encode,decodeFinitePreparationIssuerRecord as decode} from './mcp-qa-finite-preparation-issuer-records.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
const fail=()=>{throw Error('Finite preparation issuer unavailable');};
// Internal holder/lifetime bookkeeping, not authentication or business authority.
export function captureFinitePreparationIssuerContext({ctx,env}){
 const storage=ctx?.storage,actor=ctx?.id,toString=actor?.toString,ns=env?.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,db=env?.RELEASE_DB,session=db?.withSession;
 const get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync;
 if([get,list,transaction,sync,toString,idFromName,session].some(f=>typeof f!=='function'))fail();
 const actorId=Reflect.apply(toString,actor,[]),pending=new Set();
 function holders(){
  if(ctx.storage!==storage||ctx.id!==actor||actor.toString!==toString||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||Reflect.apply(idFromName,ns,['afw-own-successor-closure-v1']).toString()!==actorId||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.RELEASE_DB!==db||db.withSession!==session)fail();
 }
 function leaseGuard(lease){
  fields(lease,['signal','assertCurrent']);const signal=lease.signal,assertCurrent=lease.assertCurrent;
  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail();
  return ()=>{holders();if(lease.signal!==signal||lease.assertCurrent!==assertCurrent||signal.aborted)fail();assertCurrent();};
 }
 async function wait(p,guard){
  pending.add(p);const settled=()=>pending.delete(p);p.then(settled,settled);
  const r=await retain(p);guard();return r;
 }
 holders();return Object.freeze({storage,actorId,qa,db,session,get,list,transaction,sync,holders,leaseGuard,wait});
}
export function createFinitePreparationIssuerJournal(options){
 fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
 const prepare=(kind,v)=>decode(kind,encode(kind,v));
 const key=id=>{if(!hex(id))fail();return P+id+':';};
 async function readAll(id,g,tx=c.storage){
  const prefix=key(id),listing=tx.list;if(typeof listing!=='function')fail();
  g();const rows=await c.wait(Reflect.apply(listing,tx,[{prefix,limit:16}]),g);
  if(rows.size>14)fail();
  const out={reservation:null,freeze:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,ack:null}]))};
  for(const [k,raw]of rows){
   const name=k.slice(prefix.length);let kind,target,field;
   if(name==='reservation'||name==='freeze'){kind=name==='reservation'?'Reservation':'Freeze';target=out;field=name;}
   else{const parts=name.split(':');if(parts.length!==2||!OPS.includes(parts[0])||!['send','ack'].includes(parts[1]))fail();kind=parts[1]==='send'?'Send':'Ack';target=out.operations[parts[0]];field=parts[1];}
   target[field]=decode(kind,raw);
  }
  const r=out.reservation;
  if(!r){if(rows.size)fail();return Object.freeze({...out,operations:Object.freeze(Object.fromEntries(OPS.map(op=>[op,Object.freeze(out.operations[op])])))});}
  if(r.identity.preconnectionId!==id||r.identity.actorId!==c.actorId||r.identity.qaVersionId!==c.qa)fail();
  if(out.freeze&&(out.freeze.identityHash!==r.identity.identityHash||out.freeze.reservationHash!==r.recordHash||out.freeze.frozenAt<r.issuedAt||out.freeze.frozenAt>=r.identity.C1))fail();
  for(const op of OPS){const {send,ack}=out.operations[op];if(send&&(send.operation!==op||send.identityHash!==r.identity.identityHash||send.reservationHash!==r.recordHash||send.issuedAt<r.issuedAt||send.deadline>(['close_fence','revoke_grant'].includes(op)?r.identity.C1:r.identity.C0)))fail();if(ack&&(!send||ack.sendHash!==send.recordHash||ack.observedAt<send.issuedAt||ack.observedAt>=send.deadline))fail();Object.freeze(out.operations[op]);}
  Object.freeze(out.operations);return Object.freeze(out);
 }
 async function append(id,suffix,kind,record,lease){
  const v=prepare(kind,record),g=c.leaseGuard(lease),prefix=key(id),raw=encode(kind,v);g();
  let status='uncertain';
  try{
   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
    const tg=tx.get,tp=tx.put,tl=tx.list;if([tg,tp,tl].some(f=>typeof f!=='function'))fail();
    const guard=()=>{g();if(tx.get!==tg||tx.put!==tp||tx.list!==tl)fail();};
    const before=await readAll(id,guard,tx),r=before.reservation;
    if(kind==='Reservation'){if(v.identity.preconnectionId!==id||v.identity.actorId!==c.actorId||v.identity.qaVersionId!==c.qa)fail();}
    else{
     if(!r)fail();
     if(kind==='Send'&&(v.identityHash!==r.identity.identityHash||v.reservationHash!==r.recordHash||v.operation+':send'!==suffix||before.freeze&&!['close_fence','revoke_grant'].includes(v.operation)||v.issuedAt<r.issuedAt||v.deadline>(['close_fence','revoke_grant'].includes(v.operation)?r.identity.C1:r.identity.C0)))fail();
     if(kind==='Ack'){const op=suffix.split(':')[0],s=before.operations[op]?.send;if(!s||v.sendHash!==s.recordHash||v.observedAt<s.issuedAt||v.observedAt>=s.deadline)fail();}
     if(kind==='Freeze'&&(v.identityHash!==r.identity.identityHash||v.reservationHash!==r.recordHash||v.frozenAt<r.issuedAt||v.frozenAt>=r.identity.C1))fail();
    }
    guard();const old=await c.wait(Reflect.apply(tg,tx,[prefix+suffix]),guard);
    if(old!==undefined){if(old!==raw)fail();return 'existing';}
    guard();await c.wait(Reflect.apply(tp,tx,[prefix+suffix,raw]),guard);guard();return 'recorded';
   }]),g);
   g();await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
   const observed=await c.wait(Reflect.apply(c.get,c.storage,[prefix+suffix]),g);if(observed!==raw)fail();decode(kind,observed);status=result;
  }catch{status='uncertain';}
  return Object.freeze({status,recordHash:v.recordHash});
 }
 return Object.freeze({
  appendReservation(record,lease){const v=prepare('Reservation',record);return append(v.identity.preconnectionId,'reservation','Reservation',v,lease);},
  appendSend(options,lease){const v=own(options);fields(v,['preconnectionId','record']);const r=prepare('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
  appendAck(options,lease){const v=own(options);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':ack','Ack',v.record,lease);},
  read(options,lease){const v=own(options);fields(v,['preconnectionId']);const g=c.leaseGuard(lease);return readAll(v.preconnectionId,g);},
  freeze(options,lease){const v=own(options);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'freeze','Freeze',v.record,lease);}
 });
}
