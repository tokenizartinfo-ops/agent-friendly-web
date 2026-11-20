import {initialOwn as own,initialFields as fields,initialHex as hex,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
import {FINITE_OWNER_ISSUER_PROVENANCE_PREFIX as P,FINITE_OWNER_SDK_OPERATIONS as OPS,encodeFiniteOwnerIssuerProvenanceRecord as encode,decodeFiniteOwnerIssuerProvenanceRecord as decode} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
export function createFiniteOwnerIssuerProvenanceJournal(options){
 fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
 const prefix=id=>{if(!hex(id))fail();return P+id+':';};
 const record=(kind,value)=>decode(kind,encode(kind,value));
 async function inventory(id,guard,storage=c.storage){
  const list=storage.list;if(typeof list!=='function')fail();guard();
  const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:10}]),guard);
  if(!(rows instanceof Map)||rows.size>9)fail();
  const out={root:null,grant:null,reference:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}]))},entries=[];
  for(const [key,raw]of rows){
   const suffix=key.slice(prefix(id).length);let kind,target,field;
   if(['root','grant','reference'].includes(suffix)){kind=({root:'Root',grant:'ExpectedGrant',reference:'SdkGrantReference'})[suffix];target=out;field=suffix;}
   else{const parts=suffix.split(':');if(parts.length!==2||!OPS.includes(parts[0])||!['send','observed'].includes(parts[1]))fail();kind=parts[1]==='send'?'SdkSend':'SdkObserved';target=out.operations[parts[0]];field=parts[1];}
   target[field]=decode(kind,raw);entries.push(Object.freeze([key,raw]));
  }
  const root=out.root;
  if(!root){if(rows.size)fail();}
  else{
   if(root.preconnectionId!==id||root.actorId!==c.actorId||root.qaVersionId!==c.qa)fail();
   for(const op of OPS){
    const {send,observed}=out.operations[op];
    if(send&&(send.rootHash!==root.recordHash||send.operation!==op||send.issuedAt<root.createdAt||send.deadline>root.C0))fail();
    if(observed&&(!send||observed.sendHash!==send.recordHash||observed.observedAt<send.issuedAt||observed.observedAt>=send.deadline))fail();
   }
   const begin=out.operations.sdk_begin,approve=out.operations.sdk_approve,complete=out.operations.sdk_complete;
   if(approve.send&&!begin.observed||out.grant&&(!approve.observed||out.grant.rootHash!==root.recordHash||Date.parse(out.grant.createdAt)<approve.observed.observedAt||Date.parse(out.grant.expiresAt)>root.C0)||complete.send&&(!out.grant||complete.send.bindingHash!==out.grant.recordHash))fail();
  }
  if(out.reference)qualifyReference(out.reference,out);
  for(const op of OPS)Object.freeze(out.operations[op]);Object.freeze(out.operations);
  return Object.freeze({...out,entries:Object.freeze(entries.sort(([a],[b])=>a.localeCompare(b)))});
 }
 function qualifyReference(value,before){
  const root=before.root,g=before.grant,complete=before.operations.sdk_complete,s=complete.send,o=complete.observed;
  if(!root||!g||!s||!o||value.rootHash!==root.recordHash||value.expectedGrantHash!==g.recordHash||value.completeSendHash!==s.recordHash||value.completeObservedHash!==o.recordHash||value.correlationHash!==hash('afw.finite-sdk-cleanup-correlation.v1',{rootHash:root.recordHash,expectedGrantHash:g.recordHash,completeSendHash:s.recordHash,identityHash:g.identityHash})||value.createdAt<Math.floor(s.issuedAt/1000)||value.createdAt*1000>=s.deadline||value.observedAt<o.observedAt||value.observedAt>=Math.min(s.deadline,root.C0))fail();
 }
 async function append(id,suffix,kind,input,lease){
  const value=record(kind,input),raw=encode(kind,value),guard=c.leaseGuard(lease);guard();
  try{
   const status=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
    const get=tx.get,put=tx.put,list=tx.list;if([get,put,list].some(x=>typeof x!=='function'))fail();
    const check=()=>{guard();if(tx.get!==get||tx.put!==put||tx.list!==list)fail();};
    const before=await inventory(id,check,tx),root=before.root;
    const old=await c.wait(Reflect.apply(get,tx,[prefix(id)+suffix]),check);
    if(old!==undefined){if(old!==raw)fail();return 'existing';}
    if(before.entries.length>=9)fail();
    if(kind==='Root'){if(root||value.preconnectionId!==id||value.actorId!==c.actorId||value.qaVersionId!==c.qa)fail();}
    else{
     if(!root)fail();
     if(kind==='SdkGrantReference')qualifyReference(value,before);
     if(kind==='SdkSend'){
      if(value.rootHash!==root.recordHash||value.operation+':send'!==suffix||value.issuedAt<root.createdAt||value.deadline>root.C0)fail();
      if(value.operation==='sdk_approve'&&!before.operations.sdk_begin.observed||value.operation==='sdk_complete'&&(!before.grant||value.bindingHash!==before.grant.recordHash))fail();
     }
     if(kind==='SdkObserved'){
      const send=before.operations[suffix.split(':')[0]]?.send;
      if(!send||value.sendHash!==send.recordHash||value.observedAt<send.issuedAt||value.observedAt>=send.deadline)fail();
     }
     if(kind==='ExpectedGrant'&&(!before.operations.sdk_approve.observed||value.rootHash!==root.recordHash||Date.parse(value.createdAt)<before.operations.sdk_approve.observed.observedAt||Date.parse(value.expiresAt)>root.C0))fail();
    }
    check();await c.wait(Reflect.apply(put,tx,[prefix(id)+suffix,raw]),check);return 'recorded';
   }]),guard);
   await c.wait(Reflect.apply(c.sync,c.storage,[]),guard);
   if(await c.wait(Reflect.apply(c.get,c.storage,[prefix(id)+suffix]),guard)!==raw)fail();
   return Object.freeze({status,recordHash:value.recordHash});
  }catch{return Object.freeze({status:'uncertain',recordHash:value.recordHash});}
 }
 return Object.freeze({
  read(input,lease){const v=own(input);fields(v,['preconnectionId']);return inventory(v.preconnectionId,c.leaseGuard(lease));},
  appendRoot(input,lease){const r=record('Root',input);return append(r.preconnectionId,'root','Root',r,lease);},
  appendSend(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('SdkSend',v.record);return append(v.preconnectionId,r.operation+':send','SdkSend',r,lease);},
  appendObserved(input,lease){const v=own(input);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':observed','SdkObserved',v.record,lease);},
  appendSdkReference(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'reference','SdkGrantReference',v.record,lease);},
  appendExpectedGrant(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'grant','ExpectedGrant',v.record,lease);}
 });
}
