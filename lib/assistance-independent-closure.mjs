// Internal preparation only. No routes, alarms, credentials or provider writes.
const KEY='afw-independent-closure-v1';
const STEPS=Object.freeze(['revokePlan','closeLedger','restoreAdministration']);
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SHA=/^[0-9a-f]{64}$/;
const exact=(value,keys)=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(k=>Object.hasOwn(value,k));
const result=(state,step=null)=>Object.freeze({state,step});

export function createIndependentClosureCoordinator({storage,plan,now,revokePlan,closeLedger,restoreAdministration}={}) {
 if(!exact(plan,['occurrenceId','baselineRef','closeAt'])||typeof plan.occurrenceId!=='string'||typeof plan.baselineRef!=='string'||!UUID.test(plan.occurrenceId)||!SHA.test(plan.baselineRef)||!Number.isSafeInteger(plan.closeAt)||plan.closeAt<1||typeof storage?.transaction!=='function'||[now,revokePlan,closeLedger,restoreAdministration].some(fn=>typeof fn!=='function'))throw Error('Invalid closure configuration');
 const pin=Object.freeze({...plan});
 const actions=[revokePlan,closeLedger,restoreAdministration];
 const samePlan=p=>exact(p,['occurrenceId','baselineRef','closeAt'])&&Object.keys(pin).every(k=>p[k]===pin[k]);
 function validate(s){
  if(!exact(s,['plan','index','phase'])||!samePlan(s.plan)||!Number.isInteger(s.index)||s.index<0||s.index>3||!['ready','issued'].includes(s.phase)||(s.index===3&&s.phase!=='ready'))throw Error('Invalid closure state');
  return s;
 }
 async function transact(fn){
  try{return await storage.transaction(async tx=>{
   if(typeof tx?.get!=='function'||typeof tx?.put!=='function')throw Error('Invalid closure state');
   const raw=await tx.get(KEY);const s=raw===undefined?{plan:{...pin},index:0,phase:'ready'}:validate(raw);
   // Persist even a waiting plan to prevent reconfiguration across restarts.
   if(raw===undefined)await tx.put(KEY,s);
   return fn(tx,s);
  });}catch(e){if(e?.message==='Invalid closure state')throw Error('Invalid closure state');throw Error('Closure storage unavailable');}
 }
 function verified(receipt,index){
  return exact(receipt,['verified','state'])&&receipt.verified===true&&(
   index===0?receipt.state==='revoked':index===1?['completed','stopped'].includes(receipt.state):receipt.state==='restored');
 }
 return Object.freeze({async tick(){
  for(let attempt=0;attempt<3;attempt++){
   const reservation=await transact(async(tx,s)=>{
    if(s.index===3)return {done:true};
    if(s.phase==='issued')return {blocked:true,index:s.index};
    const t=now();if(!Number.isSafeInteger(t)||t<0)throw Error('Invalid closure state');
    if(t<pin.closeAt)return {waiting:true};
    await tx.put(KEY,{...s,phase:'issued'});return {index:s.index};
   });
   if(reservation.done)return result('complete');
   if(reservation.waiting)return result('waiting');
   if(reservation.blocked)return result('intervention_required',STEPS[reservation.index]);
   const index=reservation.index;
   let accepted=false;
   try{accepted=verified(await actions[index](pin),index);}catch{/* Keep issued; never persist a raw capability error. */}
   if(!accepted)return result('intervention_required',STEPS[index]);
   const saved=await transact(async(tx,s)=>{
    if(s.index!==index||s.phase!=='issued')return false;
    await tx.put(KEY,{...s,index:index+1,phase:'ready'});return true;
   });
   if(!saved)return result('intervention_required',STEPS[index]);
  }
  return transact((_tx,s)=>s.index===3?result('complete'):result('intervention_required',STEPS[s.index]));
 }});
}
