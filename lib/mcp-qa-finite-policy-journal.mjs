import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,validateFinitePolicyEffectIdentity as identityRecord,hashFinitePolicyEffectIdentity as identityHash} from './mcp-qa-finite-preparation-records.mjs';
class InvalidJournal extends Error{constructor(){super('Finite policy journal unavailable');}}
const fail=()=>{throw new InvalidJournal();};
const observation=(status,recordHash)=>Object.freeze({status,recordHash});
export function createFinitePolicyEffectJournal({storage,identity,now}){
 if(!storage||typeof storage.transaction!=='function'||typeof now!=='function')fail();
 const own=identityRecord(identity),ih=identityHash(own),prefix='afw.finite-policy-effect.v1:'+ih+':';
 const uploadPrefix='afw.finite-policy-effect.v1:'+identityHash({...own,effect:'upload'})+':';
 const kind=own.kind==='connection'?'Connection':'Policy';
 const current=lease=>{
  if(!lease||Object.getPrototypeOf(lease)!==Object.prototype||Reflect.ownKeys(lease).length!==2||['signal','assertCurrent'].some(k=>{const d=Object.getOwnPropertyDescriptor(lease,k);return !d?.enumerable||!Object.hasOwn(d,'value');})||!(lease.signal instanceof AbortSignal)||lease.signal.aborted||typeof lease.assertCurrent!=='function')fail();
  try{lease.assertCurrent();}catch{fail();}
  const at=now();if(!Number.isSafeInteger(at)||at<0||at>8640000000000000)fail();return at;
 };
 const checked=(type,v)=>{try{return decode(type,encode(type,v));}catch{fail();}};
 function matches(send,expected=own){
  if(send.sourceRevision!==expected.sourceRevision||send.effect!==expected.effect)fail();
  if(expected.kind==='connection'){if(send.preconnectionId!==expected.preconnectionId||send.stage!==expected.stage)fail();}
  else if(send.intentId!==expected.intentId||send.setupInstanceId!==expected.setupInstanceId)fail();
 }
 async function transact(lease,fn,mutation=true){
  current(lease);let rh=null;
  try{
   const result=await storage.transaction(async tx=>{
    current(lease);
    const io={
     async get(key,type){current(lease);const v=await tx.get(key);current(lease);if(v===undefined)return null;try{return decode(type,v);}catch{fail();}},
     async put(key,type,value){current(lease);await tx.put(key,encode(type,value));current(lease);}
    };
    const result=await fn(io,h=>{rh=h;});current(lease);return result;
   });
   try{current(lease);}catch(e){if(!mutation)throw e;return observation('uncertain',rh);}
   return result;
  }catch(e){if(e instanceof InvalidJournal||!mutation)throw e;return observation('uncertain',rh);}
 }
 async function state(io,base=prefix){
  const send=await io.get(base+'send',kind+'Send'),ack=await io.get(base+'ack',kind+'Ack'),receipt=await io.get(base+'receipt',kind+'Receipt'),failure=await io.get(base+'failure','Failure');
  const expected=base===prefix?own:{...own,effect:'upload'};
  if(send)matches(send,expected);
  if((ack&&!send)||(receipt&&(!send||!ack))||failure&&failure.identityHash!==identityHash(expected))fail();
  if(ack&&(ack.sendHash!==hash(kind+'Send',send)||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline))fail();
  if(receipt&&(expected.effect!=='activation'||receipt.deploymentId!==ack.resourceId||receipt.sourceRevision!==expected.sourceRevision))fail();
  return Object.freeze({state:failure?'admin_pending':receipt?'installed':ack?'acknowledged':send?'issued':'absent',send,ack,receipt});
 }
 async function append(io,key,type,value,h){
  const rh=hash(type,value);h(rh);const old=await io.get(key,type);
  if(old){if(encode(type,old)!==encode(type,value))fail();return observation('existing',rh);}
  await io.put(key,type,value);return observation('recorded',rh);
 }
 return Object.freeze({
  async issue(value,lease){
   const send=checked(kind+'Send',value);matches(send);
   return transact(lease,async(io,h)=>{
    const old=await state(io);
    if(old.send){if(encode(kind+'Send',old.send)!==encode(kind+'Send',send))fail();h(hash(kind+'Send',old.send));return observation('existing',hash(kind+'Send',old.send));}
    const at=current(lease);if(old.state!=='absent'||send.issuedAt>at||at>=send.deadline)fail();
    if(own.effect==='activation'){
     const upload=await state(io,uploadPrefix);
     if(upload.state!=='acknowledged'||upload.send.contextHash!==send.contextHash||send.issuedAt<upload.ack.acknowledgedAt)fail();
     if(own.kind==='connection'&&(upload.send.baselineVersionId!==send.baselineVersionId||upload.send.baselineDeploymentId!==send.baselineDeploymentId))fail();
    }
    return append(io,prefix+'send',kind+'Send',send,h);
   });
  },
  async acknowledge(value,lease){
   const ack=checked(kind+'Ack',value);
   return transact(lease,async(io,h)=>{
    const s=await state(io),at=current(lease);
    if(s.ack){if(encode(kind+'Ack',s.ack)!==encode(kind+'Ack',ack))fail();h(hash(kind+'Ack',s.ack));return observation('existing',hash(kind+'Ack',s.ack));}
    if(s.state!=='issued'||ack.sendHash!==hash(kind+'Send',s.send)||ack.acknowledgedAt<s.send.issuedAt||ack.acknowledgedAt>at||ack.acknowledgedAt>=s.send.deadline||at>=s.send.deadline)fail();
    return append(io,prefix+'ack',kind+'Ack',ack,h);
   });
  },
  async finish(value,lease){
   const r=checked(kind+'Receipt',value);if(own.effect!=='activation')fail();
   return transact(lease,async(io,h)=>{
    const s=await state(io),u=await state(io,uploadPrefix),at=current(lease),completed=r.installedAt??r.completedAt;
    if(s.receipt){if(encode(kind+'Receipt',s.receipt)!==encode(kind+'Receipt',r))fail();h(hash(kind+'Receipt',r));return observation('existing',hash(kind+'Receipt',r));}
    if(s.state!=='acknowledged'||u.state!=='acknowledged'||r.sourceRevision!==own.sourceRevision||r.versionId!==u.ack.resourceId||r.deploymentId!==s.ack.resourceId||completed<s.ack.acknowledgedAt||completed<u.ack.acknowledgedAt||completed>at||at>=s.send.deadline||u.send.contextHash!==s.send.contextHash)fail();
    if(own.kind==='connection'){if(r.preconnectionId!==own.preconnectionId||r.stage!==own.stage||r.baselineVersionId!==s.send.baselineVersionId||r.baselineDeploymentId!==s.send.baselineDeploymentId)fail();}
    else if(r.intentId!==own.intentId||r.setupInstanceId!==own.setupInstanceId||r.contextHash!==s.send.contextHash)fail();
    return append(io,prefix+'receipt',kind+'Receipt',r,h);
   });
  },
  async markAdminPending(value,lease){
   if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==2||!Object.hasOwn(value,'reasonCode')||!Object.hasOwn(value,'observedAt'))fail();
   const record=checked('Failure',{purpose:'afw.finite-policy-failure.v1',identityHash:ih,reasonCode:value.reasonCode,observedAt:value.observedAt});
   return transact(lease,async(io,h)=>{
    const s=await state(io);if(record.observedAt>current(lease)||s.state==='installed')fail();
    return append(io,prefix+'failure','Failure',record,h);
   });
  },
  async read(lease){return transact(lease,io=>state(io),false);}
 });
}
