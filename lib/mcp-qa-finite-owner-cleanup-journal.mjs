import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
import {FINITE_OWNER_CLEANUP_PREFIX as P,FINITE_OWNER_CLEANUP_OPERATIONS as OPS,encodeFiniteOwnerCleanupRecord as encode,decodeFiniteOwnerCleanupRecord as decode} from './mcp-qa-finite-owner-cleanup-records.mjs';
const fail=()=>{throw Error('Finite owner cleanup journal unavailable');};
export function createFiniteOwnerCleanupJournal(options){
 fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
 const prefix=id=>{if(!hex(id))fail();return P+id+':';},record=(kind,v)=>decode(kind,encode(kind,v));
 async function inventory(id,g,storage=c.storage){
  const list=storage.list;if(typeof list!=='function')fail();g();const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:17}]),g);
  if(!(rows instanceof Map)||rows.size>9)fail();
  const out={identity:null,receipt:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}])),reconciled:{},entries:[]};
  for(const [key,raw]of rows){
   const suffix=key.slice(prefix(id).length);let kind,target,field;
   if(suffix==='identity'||suffix==='receipt'){kind=suffix==='identity'?'Identity':'Receipt';target=out;field=suffix;}
   else{const [a,b,...rest]=suffix.split(':');if(rest.length)fail();if(a==='reconciled'&&['1','2','3'].includes(b)){kind='Reconciled';target=out.reconciled;field=b;}else if(OPS.includes(a)&&['send','observed'].includes(b)){kind=b==='send'?'Send':'Observed';target=out.operations[a];field=b;}else fail();}
   target[field]=decode(kind,raw);out.entries.push(Object.freeze([key,raw]));
  }
  const i=out.identity;
  if(!i){if(rows.size)fail();return out;}
  if(i.preconnectionId!==id||i.actorId!==c.actorId||i.qaVersionId!==c.qa)fail();
  for(const op of OPS){
   const {send:s,observed:o}=out.operations[op];
   if(s&&(s.identityHash!==i.recordHash||s.operation!==op||s.issuedAt<i.C0||s.deadline>i.C1))fail();
   if(o&&(!s||o.sendHash!==s.recordHash||o.observedAt<s.issuedAt||o.observedAt>=s.deadline||op==='sdk_revoke'&&o.outcome!=='returned'||op==='monitoring_revoke'&&o.outcome==='returned'))fail();
  }
  for(const [delivery,r]of Object.entries(out.reconciled))if(r.delivery!==Number(delivery)||r.identityHash!==i.recordHash||r.observedAt<i.C0||r.observedAt>=i.C1)fail();
  if(out.receipt)checkReceipt(out.receipt,out);
  return out;
 }
 function checkReceipt(r,before){
  const i=before.identity,s=before.operations.sdk_revoke,m=before.operations.monitoring_revoke;
  if(!i||r.identityHash!==i.recordHash||r.planHash!==i.planHash||r.observedAt<i.C0||r.observedAt>=i.C1||s.send&&!s.observed||m.send&&!m.observed)fail();
  if(s.send?(r.sdkSendHash!==s.send.recordHash||r.sdkObservedHash!==s.observed.recordHash||!r.sdkReductionReturned||r.observedAt<s.observed.observedAt):(r.sdkSendHash!==null||r.sdkObservedHash!==null||r.sdkReductionReturned))fail();
 }
 async function append(id,suffix,kind,value,lease){
  const v=record(kind,value),raw=encode(kind,v),g=c.leaseGuard(lease);g();
  try{
   const result=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
    const get=tx.get,put=tx.put,list=tx.list;if([get,put,list].some(f=>typeof f!=='function'))fail();
    const guard=()=>{g();if(tx.get!==get||tx.put!==put||tx.list!==list)fail();};
    const before=await inventory(id,guard,tx),i=before.identity;
    if(kind==='Identity'){if(v.preconnectionId!==id||v.actorId!==c.actorId||v.qaVersionId!==c.qa)fail();}
    else{
     if(!i)fail();
     if(kind==='Send'&&(v.identityHash!==i.recordHash||v.operation+':send'!==suffix||v.issuedAt<i.C0||v.deadline>i.C1||before.receipt))fail();
     if(kind==='Observed'){const op=suffix.split(':')[0],s=before.operations[op].send;if(!s||v.sendHash!==s.recordHash||v.observedAt<s.issuedAt||v.observedAt>=s.deadline||op==='sdk_revoke'&&v.outcome!=='returned'||op==='monitoring_revoke'&&v.outcome==='returned'||before.receipt)fail();}
     if(kind==='Reconciled'&&(v.identityHash!==i.recordHash||suffix!=='reconciled:'+v.delivery||v.observedAt<i.C0||v.observedAt>=i.C1||before.receipt))fail();
     if(kind==='Receipt')checkReceipt(v,before);
    }
    const old=await c.wait(Reflect.apply(get,tx,[prefix(id)+suffix]),guard);
    if(old!==undefined){if(old!==raw)fail();return 'existing';}
    if(before.entries.length>=9)fail();await c.wait(Reflect.apply(put,tx,[prefix(id)+suffix,raw]),guard);return 'recorded';
   }]),g);
   await c.wait(Reflect.apply(c.sync,c.storage,[]),g);
   if(await c.wait(Reflect.apply(c.get,c.storage,[prefix(id)+suffix]),g)!==raw)fail();
   decode(kind,raw);return Object.freeze({status:result,recordHash:v.recordHash});
  }catch{return Object.freeze({status:'uncertain',recordHash:v.recordHash});}
 }
 return Object.freeze({
  read(input,lease){const v=own(input);fields(v,['preconnectionId']);return inventory(v.preconnectionId,c.leaseGuard(lease));},
  appendIdentity(input,lease){const v=record('Identity',input);return append(v.preconnectionId,'identity','Identity',v,lease);},
  appendSend(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('Send',v.record);return append(v.preconnectionId,r.operation+':send','Send',r,lease);},
  appendObserved(input,lease){const v=own(input);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':observed','Observed',v.record,lease);},
  appendReconciled(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('Reconciled',v.record);return append(v.preconnectionId,'reconciled:'+r.delivery,'Reconciled',r,lease);},
  finish(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'receipt','Receipt',v.record,lease);}
 });
}
