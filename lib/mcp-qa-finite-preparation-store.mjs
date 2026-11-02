import {createHash} from 'node:crypto';
import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
const fail=()=>{throw new InvalidPreparation();};
class InvalidPreparation extends Error{constructor(){super('Finite preparation storage unavailable');}}
const immutable=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))immutable(x);Object.freeze(v);}return v;};
const fields=(v,names)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==names.length||names.some(k=>!Object.getOwnPropertyDescriptor(v,k)?.enumerable||!Object.hasOwn(Object.getOwnPropertyDescriptor(v,k),'value')))fail();return v;};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const id=v=>typeof v==='string'&&v.length>0&&v.length<=200&&!/[\u0000-\u001f\u007f]/.test(v);
const observation=(status,recordHash)=>Object.freeze({status,recordHash});
function witness(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>256)fail();let v;try{v=JSON.parse(raw);}catch{fail();}
 fields(v,['selectionHash','publishedAt']);if(!hex(v.selectionHash)||!Number.isSafeInteger(v.publishedAt)||v.publishedAt<0||v.publishedAt>8640000000000000||JSON.stringify({publishedAt:v.publishedAt,selectionHash:v.selectionHash})!==raw)fail();
 return Object.freeze(v);
}
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
     async setHead(key,h){current(lease);await tx.put(key,h);current(lease);},
     async witness(key){current(lease);const raw=await tx.get(key);current(lease);return raw===undefined?null:witness(raw);},
     async putWitness(key,v){current(lease);await tx.put(key,JSON.stringify({publishedAt:v.publishedAt,selectionHash:v.selectionHash}));current(lease);}
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
 const witnessKey=(source,selection)=>'source-selection:'+source+':publication:'+selection;
 async function readWitness(source,selection,lease){current(lease);const raw=await storage.get(witnessKey(source,selection));current(lease);if(raw===undefined)return null;const v=witness(raw);if(v.selectionHash!==selection)fail();return v;}
 async function selected(io,source){
  const head=await io.head(headKey(source));if(head===null)return null;
  const selection=await io.get(selectionKey(head),'Selection');if(!selection||selection.selectionHash!==head||selection.sourceRevision!==source)fail();
  const preparation=await io.get(prepKey(selection.prepId),'OwnerPreparation');
  if(!preparation||preparation.preparationHash!==selection.preparationHash||preparation.sourceRevision!==source)fail();
  const binding=await io.get(boundKey(selection.prepId),'Binding');
  return immutable({preparation,selection,binding});
 }
 async function readRecord(key,kind,lease){current(lease);const raw=await storage.get(key);current(lease);return immutable({status:raw===undefined?'absent':'observed',record:raw===undefined?null:prepareText(kind,raw)});}
 return Object.freeze({
  async putStageApproval(value,lease){
   const v=prepare('StageApproval',value);
   return transaction(lease,async(io,h)=>{
    const prefix='connection-preparation:'+v.preconnectionId;
    const pre=await io.get(prefix+':record','Preconnection'),snapshot=await io.get(prefix+':source','OwnerSourceSnapshot');
    const ticket=await io.get('owner-ticket:'+v.ticketHash,'Ticket'),use=await io.get('owner-ticket:'+v.ticketHash+':use','TicketUse'),approval=await io.get('connection-approval:'+v.approvalHash,'ConfigurationApproval');
    if(!pre||!snapshot||!ticket||!use||!approval)fail();
    const source=snapshot.source,at=current(lease),map=await io.get('owner-project-ref:'+ticket.projectRef,'ProjectRef');
    const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
    if(!map||pre.preconnectionId!==v.preconnectionId||snapshot.preconnectionId!==v.preconnectionId||ticket.preconnectionId!==v.preconnectionId||map.preconnectionId!==v.preconnectionId||
     [pre.sourceRevision,source.sourceRevision,ticket.sourceRevision,map.sourceRevision,approval.sourceRevision].some(x=>x!==v.sourceRevision)||pre.actorId!==source.actorId||
     pre.owner.accessRealmHash!==realm||[ticket.subjectHash,map.subjectHash,approval.subjectHash].some(x=>x!==subject)||ticket.action!==v.stage||
     pre.clientId!==source.clientId||approval.clientId!==pre.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||approval.projectHash!==projectHash(pre.project)||map.projectId!==pre.project.projectId||map.revision!==pre.project.revision||
     pre.baselineHash!==evidence('baseline',source.initialBaseline)||hash('ConfigurationApproval',approval)!==v.approvalHash||
     use.ticketHash!==v.ticketHash||use.recordHash!==approval.csrfReceiptHash||approval.csrfReceiptHash!==evidence('decision',{ticket,decision:'approve',projectHash:projectHash(pre.project),goal:source.goal,clientId:pre.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt})||
     approval.approvedAt<pre.startedAt||approval.approvedAt>at||use.consumedAt<approval.approvedAt||use.consumedAt>at||
     ticket.createdAt<source.window.startedAt||ticket.expiresAt>map.expiresAt||approval.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt,ticket.expiresAt)||at>=approval.expiresAt)fail();
    if(v.stage==='connection'){
     if(v.approvalHash!==pre.approvalHash||v.ticketHash!==snapshot.initialTicketHash||ticket.connectionRef!==null)fail();
    }else{
     const relation=await io.get(prefix+':connection','PreconnectionConnection'),grant=await io.get(prefix+':grant','GrantLink');
     if(!relation||!grant||ticket.connectionRef!==relation.connectionRef||relation.grantHash!==grant.grantHash)fail();
     const connection=await io.get('owner-connection-ref:'+relation.connectionRef,'ConnectionRef');
     if(!connection||connection.connectionRef!==relation.connectionRef||connection.grantId!==grant.grantId||connection.subject!==pre.owner.subject||connection.clientId!==pre.clientId||connection.projectId!==pre.project.projectId||connection.resource!==pre.resource||connection.issuedAt!==relation.linkedAt||at>=connection.expiresAt||approval.expiresAt>connection.expiresAt)fail();
    }
    return append(io,prefix+':'+v.stage+':approval','StageApproval',v,h);
   });
  },
  async readStageApproval(value,lease){
   value=Object.freeze({...fields(value,['preconnectionId','stage'])});
   if(!hex(value.preconnectionId)||!['connection','notices','finite'].includes(value.stage))fail();
   return readRecord('connection-preparation:'+value.preconnectionId+':'+value.stage+':approval','StageApproval',lease);
  },

  async putPreconnectionConnection(value,lease){
   value=Object.freeze({...fields(value,['relation','connection'])});
   const relation=prepare('PreconnectionConnection',value.relation),connection=prepare('ConnectionRef',value.connection),relationHash=hash('PreconnectionConnection',relation);
   if(relation.connectionRef!==connection.connectionRef||connection.issuedAt!==relation.linkedAt||relation.grantHash!==createHash('sha256').update(connection.grantId).digest('hex'))fail();
   return transaction(lease,async(io,h)=>{
    h(relationHash);
    const prefix='connection-preparation:'+relation.preconnectionId,pre=await io.get(prefix+':record','Preconnection'),grant=await io.get(prefix+':grant','GrantLink'),at=current(lease);
    if(!pre||!grant||pre.preconnectionId!==relation.preconnectionId||grant.preconnectionId!==relation.preconnectionId||grant.grantId!==connection.grantId||grant.grantHash!==relation.grantHash||connection.subject!==pre.owner.subject||connection.clientId!==pre.clientId||connection.projectId!==pre.project.projectId||connection.resource!==pre.resource||relation.linkedAt<grant.acceptedAt||relation.linkedAt>at||connection.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt)||at>=connection.expiresAt)fail();
    const key=prefix+':connection',mapKey='owner-connection-ref:'+connection.connectionRef,old=await io.get(key,'PreconnectionConnection'),map=await io.get(mapKey,'ConnectionRef');
    if(old||map){
     if(!old||!map||encode('PreconnectionConnection',old)!==encode('PreconnectionConnection',relation)||encode('ConnectionRef',map)!==encode('ConnectionRef',connection))fail();
     return observation('existing',relationHash);
    }
    await append(io,mapKey,'ConnectionRef',connection,()=>{});
    await append(io,key,'PreconnectionConnection',relation,()=>{});
    return observation('recorded',relationHash);
   });
  },
  async readPreconnectionConnection(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':connection','PreconnectionConnection',lease);},
  async putProjectRef(value,lease){const v=prepare('ProjectRef',value),key=v.projectRef;return transaction(lease,(io,h)=>append(io,'owner-project-ref:'+key+'','ProjectRef',v,h));},
  async readProjectRef(value,lease){value=Object.freeze({...fields(value,['projectRef'])});if(!hex(value.projectRef))fail();return readRecord('owner-project-ref:'+value.projectRef+'','ProjectRef',lease);},
  async putAuthorizationLink(value,lease){const v=prepare('AuthorizationLink',value),key=v.authorizationHash;return transaction(lease,(io,h)=>append(io,'connection-authorization:'+key+'','AuthorizationLink',v,h));},
  async readAuthorizationLink(value,lease){value=Object.freeze({...fields(value,['authorizationHash'])});if(!hex(value.authorizationHash))fail();return readRecord('connection-authorization:'+value.authorizationHash+'','AuthorizationLink',lease);},
  async putConfigurationApproval(value,lease){const v=prepare('ConfigurationApproval',value),key=hash('ConfigurationApproval',v);return transaction(lease,(io,h)=>append(io,'connection-approval:'+key+'','ConfigurationApproval',v,h));},
  async readConfigurationApproval(value,lease){value=Object.freeze({...fields(value,['approvalHash'])});if(!hex(value.approvalHash))fail();return readRecord('connection-approval:'+value.approvalHash+'','ConfigurationApproval',lease);},
  async putConnectionRef(value,lease){const v=prepare('ConnectionRef',value),key=v.connectionRef;return transaction(lease,(io,h)=>append(io,'owner-connection-ref:'+key+'','ConnectionRef',v,h));},
  async readConnectionRef(value,lease){value=Object.freeze({...fields(value,['connectionRef'])});if(!hex(value.connectionRef))fail();return readRecord('owner-connection-ref:'+value.connectionRef+'','ConnectionRef',lease);},
  async putOwnerSourceSnapshot(value,lease){const v=prepare('OwnerSourceSnapshot',value),key=v.preconnectionId;return transaction(lease,(io,h)=>append(io,'connection-preparation:'+key+':source','OwnerSourceSnapshot',v,h));},
  async readOwnerSourceSnapshot(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':source','OwnerSourceSnapshot',lease);},
  async readPreconnection(value,lease){value=Object.freeze({...fields(value,['preconnectionId'])});if(!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':record','Preconnection',lease);},
  async readTicket(value,lease){value=Object.freeze({...fields(value,['ticketHash'])});if(!hex(value.ticketHash))fail();return readRecord('owner-ticket:'+value.ticketHash,'Ticket',lease);},
  async readTicketUse(value,lease){value=Object.freeze({...fields(value,['ticketHash'])});if(!hex(value.ticketHash))fail();return readRecord('owner-ticket:'+value.ticketHash+':use','TicketUse',lease);},
  async readLink(value,lease){value=Object.freeze({...fields(value,['kind','preconnectionId'])});if(!['grant','notice'].includes(value.kind)||!hex(value.preconnectionId))fail();return readRecord('connection-preparation:'+value.preconnectionId+':'+value.kind,value.kind==='grant'?'GrantLink':'NoticeLink',lease);},
  async putPreconnection(value,lease){const v=prepare('Preconnection',value);return transaction(lease,(io,h)=>append(io,'connection-preparation:'+v.preconnectionId+':record','Preconnection',v,h));},
  async putTicket(value,lease){const v=prepare('Ticket',value);return transaction(lease,(io,h)=>append(io,'owner-ticket:'+v.ticketHash,'Ticket',v,h));},
  async consumeTicket(value,lease){
   value=Object.freeze({...fields(value,['ticketHash','recordHash'])});if(!hex(value.ticketHash)||!hex(value.recordHash))fail();
   return transaction(lease,async(io,h)=>{
    const key='owner-ticket:'+value.ticketHash+':use',old=await io.get(key,'TicketUse');
    if(old){if(old.recordHash!==value.recordHash)fail();h(hash('TicketUse',old));return observation('existing',hash('TicketUse',old));}
    const ticket=await io.get('owner-ticket:'+value.ticketHash,'Ticket'),at=current(lease);if(!ticket||at<ticket.createdAt||at>=ticket.expiresAt)fail();
    return append(io,key,'TicketUse',prepare('TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',...value,consumedAt:at}),h);
   });
  },
  async putLink(value,lease){
   value=Object.freeze({...fields(value,['kind','record'])});if(!['grant','notice'].includes(value.kind))fail();
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
   const result=await transaction(lease,async(io,h)=>{
    const head=await io.head(headKey(s.sourceRevision));
    if(head===s.selectionHash){const old=await selected(io,s.sourceRevision);if(encode('OwnerPreparation',old.preparation)!==encode('OwnerPreparation',p))fail();h(s.selectionHash);return observation('existing',s.selectionHash);}
    if(head!==value.expectedHeadHash||s.previousSelectionHash!==head||s.selectedAt>current(lease)||s.selectedAt>=p.commandBy)fail();
    const previous=head===null?null:await io.get(selectionKey(head),'Selection');
    if(s.sequence!==(previous?previous.sequence+1:1)||previous&&s.selectedAt<previous.selectedAt)fail();
    await append(io,prepKey(p.prepId),'OwnerPreparation',p,h);
    await append(io,selectionKey(s.selectionHash),'Selection',s,h);
    await io.setHead(headKey(s.sourceRevision),s.selectionHash);h(s.selectionHash);return observation('recorded',s.selectionHash);
   });
   // This timestamp is sampled only AFTER the actual head transaction ACK.
   // Reconstructed/existing heads can never create or renew this witness.
   if(result.status==='uncertain')return result;
   try{
    const publishedAt=current(lease);
    if(result.status==='recorded'){
     const w=await transaction(lease,async(io,h)=>{
      h(s.selectionHash);const key=witnessKey(s.sourceRevision,s.selectionHash);
      const old=await io.witness(key);
      if(old)fail();
      await io.putWitness(key,{selectionHash:s.selectionHash,publishedAt});return observation('recorded',s.selectionHash);
     });
     current(lease);if(w.status==='uncertain')return w;
    }
    const durable=await readWitness(s.sourceRevision,s.selectionHash,lease);current(lease);
    if(!durable||durable.publishedAt<s.selectedAt)return observation('uncertain',s.selectionHash);
    return result;
   }catch{return observation('uncertain',s.selectionHash);}
  },
  async bindSelection(value,lease){
   const b=prepare('Binding',value);
   return transaction(lease,async(io,h)=>{
    const old=await io.get(boundKey(b.prepId),'Binding');
    if(old){if(encode('Binding',old)!==encode('Binding',b))fail();h(hash('Binding',old));return observation('existing',hash('Binding',old));}
    const s=await selected(io,b.sourceRevision),w=await io.witness(witnessKey(b.sourceRevision,b.selectionHash)),at=current(lease);
    if(!w||w.selectionHash!==b.selectionHash||w.publishedAt>b.T0||w.publishedAt<s?.selection.selectedAt)fail();
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
  async readSelectionPublication(value,lease){
   fields(value,['sourceRevision','selectionHash']);if(!hex(value.sourceRevision,40)||!hex(value.selectionHash))fail();
   const record=await readWitness(value.sourceRevision,value.selectionHash,lease);current(lease);return record;
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
