// Internal lifecycle; no routes, credentials or remote deployment.
import {createIndependentClosureCoordinator} from './assistance-independent-closure.mjs';
const KEY='afw-closure-alarm-lifecycle-v1';
const STEPS=['revokePlan','closeLedger','restoreAdministration'];
const STATES=['armed','processing','intervention_required','complete'];
const exact=(v,keys)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));

export function createClosureAlarmLifecycle(options={}){
 const {storage,now}=options;
 const coordinator=createIndependentClosureCoordinator(options);
 if(typeof storage?.setAlarm!=='function'||typeof storage?.deleteAlarm!=='function'||typeof options.readIssuedReceipt!=='function')throw Error('Invalid closure lifecycle configuration');
 const plan=Object.freeze({...options.plan});
 const same=p=>exact(p,['occurrenceId','baselineRef','closeAt'])&&Object.keys(plan).every(k=>p[k]===plan[k]);
 const view=s=>Object.freeze({state:s.state,step:s.step,attempts:s.attempts});
 const validate=s=>{
  if(!exact(s,['plan','state','step','attempts'])||!same(s.plan)||!STATES.includes(s.state)||!(s.step===null||STEPS.includes(s.step))||!Number.isInteger(s.attempts)||s.attempts<0||s.attempts>3||(s.state==='complete'&&s.step!==null))throw Error('Invalid lifecycle state');
  return s;
 };
 const clock=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t>Number.MAX_SAFE_INTEGER-1000)throw Error('Invalid lifecycle clock');return t;};
 async function transaction(fn){return storage.transaction(async tx=>{
  const raw=await tx.get(KEY);return fn(tx,raw===undefined?null:validate(raw));
 });}
 // The DO adapter additionally serializes events through blockConcurrencyWhile.
 let tail=Promise.resolve();
 const serial=fn=>{const run=tail.then(fn);tail=run.catch(()=>{});return run.catch(()=>{throw Error('Closure lifecycle unavailable');});};
 return Object.freeze({arm(){return serial(async()=>transaction(async(tx,s)=>{
  if(s)return view(s);
  clock();const initial={plan:{...plan},state:'armed',step:null,attempts:0};
  await tx.put(KEY,initial);await tx.setAlarm(plan.closeAt);return view(initial);
 }));},status(){return serial(async()=>transaction((_tx,s)=>s?view(s):Object.freeze({state:'unarmed',step:null,attempts:0})));},alarm(){return serial(async()=>{
  const reservation=await transaction(async(tx,s)=>{
   if(!s)return {done:{state:'unarmed',step:null,attempts:0}};
   if(s.state==='complete'||s.attempts===3){
    const terminal=s.state==='processing'?{...s,state:'intervention_required'}:s;
    if(terminal!==s)await tx.put(KEY,terminal);
    await tx.deleteAlarm();return {done:view(terminal)};
   }
   const t=clock();if(t<plan.closeAt){await tx.setAlarm(plan.closeAt);return {done:view(s)};}
   const next={...s,attempts:s.attempts+1,state:s.attempts===2?'intervention_required':'processing'};
   await tx.put(KEY,next);
   // Persist bounded recovery before external actions: survives a lost response.
   if(next.attempts<3)await tx.setAlarm(t+1000);else await tx.deleteAlarm();
   return {attempts:next.attempts};
  });
  if(reservation.done)return Object.freeze(reservation.done);
  let outcome;
  try{
   outcome=reservation.attempts>1?await coordinator.reconcile():{state:'waiting',step:null};
   if(outcome.state==='waiting')outcome=await coordinator.tick();
  }catch{outcome={state:'intervention_required',step:null};}
  return transaction(async(tx,s)=>{
   if(!s||s.attempts!==reservation.attempts||!(s.state==='processing'||(s.attempts===3&&s.state==='intervention_required')))throw Error('Invalid lifecycle state');
   const next={...s,state:outcome.state==='complete'?'complete':'intervention_required',step:STEPS.includes(outcome.step)?outcome.step:null};
   await tx.put(KEY,next);if(next.state==='complete'||next.attempts===3)await tx.deleteAlarm();return view(next);
  });
 });}});
}
