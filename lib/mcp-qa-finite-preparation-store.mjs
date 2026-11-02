import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash} from './mcp-qa-finite-preparation-records.mjs';
const fail=()=>{throw new InvalidPreparation();};
class InvalidPreparation extends Error{constructor(){super('Finite preparation storage unavailable');}}
const immutable=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))immutable(x);Object.freeze(v);}return v;};
const fields=(v,names)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==names.length||names.some(k=>!Object.getOwnPropertyDescriptor(v,k)?.enumerable||!Object.hasOwn(Object.getOwnPropertyDescriptor(v,k),'value')))fail();return v;};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
const observation=(status,recordHash)=>Object.freeze({status,recordHash});
export function createFiniteOwnerPreparationStore({storage,now}){
 if(!storage||typeof storage.transaction!=='function'||typeof storage.get!=='function'||typeof now!=='function')fail();
 const current=lease=>{
  fields(lease,['signal','assertCurrent']);
  if(!(lease.signal instanceof AbortSignal)||lease.signal.aborted||typeof lease.assertCurrent!=='function')fail();
  try{lease.assertCurrent();}catch{fail();}
  const at=now();if(!Number.isSafeInteger(at)||at<0||at>8640000000000000)fail();return at;
 };
 const prepare=(kind,value)=>{try{return decode(kind,encode(kind,value));}catch{fail();}};
 async function transaction(lease,fn){
  current(lease);let recordHash=null;
  try{
   const result=await storage.transaction(async tx=>{
    current(lease);
    const io={
     async get(key,kind){current(lease);const raw=await tx.get(key);current(lease);return raw===undefined?null:prepareText(kind,raw);},
     async put(key,kind,v){current(lease);await tx.put(key,encode(kind,v));current(lease);},
     async head(key){current(lease);const h=await tx.get(key);current(lease);if(h!==undefined&&!hex(h))fail();return h??null;},
     async setHead(key,h){current(lease);await tx.put(key,h);current(lease);}
    };
    const result=await fn(io,at=>{recordHash=at;});current(lease);return result;
   });
   try{current(lease);}catch{return observation('uncertain',recordHash);}
   return result;
  }catch(e){if(e instanceof InvalidPreparation)throw e;return observation('uncertain',recordHash);}
 }
 function prepareText(kind,raw){try{return decode(kind,raw);}catch{fail();}}
 async function append(io,key,kind,record,setHash){
  const h=hash(kind,record);setHash(h);
  const old=await io.get(key,kind);
  if(old){if(encode(kind,old)!==encode(kind,record))fail();return observation('existing',h);}
  await io.put(key,kind,record);return observation('recorded',h);
 }
 const prepKey=id=>'preparation:'+id+':record';
 const boundKey=id=>'preparation:'+id+':bound';
 const selectionKey=h=>'afw.finite-owner-selection.v1:'+h;
 const headKey=source=>'source-selection:'+source+':head';
 async function selected(io,source){
  const head=await io.head(headKey(source));if(head===null)return null;
  const selection=await io.get(selectionKey(head),'Selection');if(!selection||selection.selectionHash!==head||selection.sourceRevision!==source)fail();
  const preparation=await io.get(prepKey(selection.prepId),'OwnerPreparation');
  if(!preparation||preparation.preparationHash!==selection.preparationHash||preparation.sourceRevision!==source)fail();
  const binding=await io.get(boundKey(selection.prepId),'Binding');
  return immutable({preparation,selection,binding});
 }
 return Object.freeze({
  async putPreconnection(value,lease){const v=prepare('Preconnection',value);return transaction(lease,(io,h)=>append(io,'connection-preparation:'+v.preconnectionId+':record','Preconnection',v,h));},
  async putTicket(value,lease){const v=prepare('Ticket',value);return transaction(lease,(io,h)=>append(io,'owner-ticket:'+v.ticketHash,'Ticket',v,h));},
  async consumeTicket(value,lease){
   fields(value,['ticketHash','recordHash']);if(!hex(value.ticketHash)||!hex(value.recordHash))fail();
   return transaction(lease,async(io,h)=>{
    const key='owner-ticket:'+value.ticketHash+':use',old=await io.get(key,'TicketUse');
    if(old){if(old.recordHash!==value.recordHash)fail();h(hash('TicketUse',old));return observation('existing',hash('TicketUse',old));}
    const ticket=await io.get('owner-ticket:'+value.ticketHash,'Ticket'),at=current(lease);if(!ticket||at<ticket.createdAt||at>=ticket.expiresAt)fail();
    return append(io,key,'TicketUse',prepare('TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',...value,consumedAt:at}),h);
   });
  },
  async putLink(value,lease){
   fields(value,['kind','record']);if(!['grant','notice'].includes(value.kind))fail();
   const kind=value.kind==='grant'?'GrantLink':'NoticeLink',v=prepare(kind,value.record);
   return transaction(lease,async(io,h)=>{
    const pre=await io.get('connection-preparation:'+v.preconnectionId+':record','Preconnection'),at=current(lease);
    if(!pre||v.acceptedAt<pre.startedAt||v.acceptedAt>at||at>=pre.expiresAt)fail();
    if(value.kind==='notice'){const grant=await io.get('connection-preparation:'+v.preconnectionId+':grant','GrantLink');if(!grant||grant.grantHash!==v.grantHash||v.acceptedAt<grant.acceptedAt)fail();}
    return append(io,'connection-preparation:'+v.preconnectionId+':'+value.kind,kind,v,h);
   });
  },
  async publishSelection(value,lease){
   fields(value,['preparation','selection','expectedHeadHash']);if(value.expectedHeadHash!==null&&!hex(value.expectedHeadHash))fail();
   const p=prepare('OwnerPreparation',value.preparation),s=prepare('Selection',value.selection);
   if(s.prepId!==p.prepId||s.preparationHash!==p.preparationHash||s.sourceRevision!==p.sourceRevision||s.selectedAt<p.selectedAt)fail();
   return transaction(lease,async(io,h)=>{
    const head=await io.head(headKey(s.sourceRevision));
    if(head===s.selectionHash){const old=await selected(io,s.sourceRevision);if(encode('OwnerPreparation',old.preparation)!==encode('OwnerPreparation',p))fail();h(s.selectionHash);return observation('existing',s.selectionHash);}
    if(head!==value.expectedHeadHash||s.previousSelectionHash!==head||s.selectedAt>current(lease)||s.selectedAt>=p.commandBy)fail();
    const previous=head===null?null:await io.get(selectionKey(head),'Selection');
    if(s.sequence!==(previous?previous.sequence+1:1)||previous&&s.selectedAt<previous.selectedAt)fail();
    await append(io,prepKey(p.prepId),'OwnerPreparation',p,h);
    await append(io,selectionKey(s.selectionHash),'Selection',s,h);
    await io.setHead(headKey(s.sourceRevision),s.selectionHash);h(s.selectionHash);return observation('recorded',s.selectionHash);
   });
  },
  async bindSelection(value,lease){
   const b=prepare('Binding',value);
   return transaction(lease,async(io,h)=>{
    const old=await io.get(boundKey(b.prepId),'Binding');
    if(old){if(encode('Binding',old)!==encode('Binding',b))fail();h(hash('Binding',old));return observation('existing',hash('Binding',old));}
    const s=await selected(io,b.sourceRevision),at=current(lease);
    if(!s||s.selection.selectionHash!==b.selectionHash||s.preparation.preparationHash!==b.preparationHash||s.preparation.prepId!==b.prepId||s.selection.selectedAt>b.T0||b.T0>=s.preparation.commandBy||b.boundAt>at||at>=s.preparation.commandBy)fail();
    return append(io,boundKey(b.prepId),'Binding',b,h);
   });
  },
  async putContext(value,lease){
   const c=prepare('SetupContext',value);
   return transaction(lease,async(io,h)=>{
    const b=await io.get(boundKey(c.ownerPreparation.prepId),'Binding');
    if(!b||b.intentId!==c.intentId||b.sourceRevision!==c.sourceRevision||b.T0!==c.T0||hash('Binding',b)!==c.bindingHash||b.selectionHash!==c.selectionHash||b.preparationHash!==c.preparationHash)fail();
    return append(io,'afw.qa-finite-policy-setup.v1:'+c.intentId+':context','SetupContext',c,h);
   });
  },
  async readSelected(value,lease){
   fields(value,['sourceRevision']);if(!hex(value.sourceRevision,40))fail();current(lease);
   const result=await storage.transaction(async tx=>{
    current(lease);
    const io={async head(k){current(lease);const v=await tx.get(k);current(lease);if(v!==undefined&&!hex(v))fail();return v??null;},async get(k,kind){current(lease);const v=await tx.get(k);current(lease);return v===undefined?null:prepareText(kind,v);}};
    const result=await selected(io,value.sourceRevision);current(lease);return result;
   });current(lease);return result;
  },
  async readContext(value,lease){
   fields(value,['intentId','sourceRevision']);if(!id(value.intentId)||!hex(value.sourceRevision,40))fail();current(lease);
   const raw=await storage.get('afw.qa-finite-policy-setup.v1:'+value.intentId+':context');current(lease);
   if(raw===undefined)return null;const c=prepareText('SetupContext',raw);if(c.intentId!==value.intentId||c.sourceRevision!==value.sourceRevision)fail();return c;
  }
 });
}
