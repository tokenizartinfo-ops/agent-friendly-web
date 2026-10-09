import {createApprovedQaClosureActor} from './assistance-approved-qa-closure-actor.mjs';
import {deferUnavailableClosureAlarm} from './assistance-closure-alarm-lifecycle.mjs';
const unavailable=()=>Object.freeze({state:'unavailable'});

/** Private server composition. Each DO event reconstructs authority, never accepts
 * a consumer plan or caches an actor. The actor retains primary D1/V2 checks and
 * persistent recovery fences. A private reader is not provisioning evidence.
 */
export function createApprovedQaClosureHost(options={}){
 const {readApproval,authorizationTimeoutMs=5000,...dependencies}=options;
 let tail=Promise.resolve();
 async function invoke(method){
  if(typeof readApproval!=='function'||!Number.isSafeInteger(authorizationTimeoutMs)||authorizationTimeoutMs<1||authorizationTimeoutMs>10000)return unavailable();
  let timer;
  try{
   const approval=await Promise.race([Promise.resolve().then(()=>readApproval()),new Promise(resolve=>{timer=setTimeout(()=>resolve(null),authorizationTimeoutMs);})]);
   clearTimeout(timer);if(!approval)return unavailable();
   const actor=await createApprovedQaClosureActor({...dependencies,approval,authorizationTimeoutMs});
   return await actor[method]();
  }catch{return unavailable();}finally{clearTimeout(timer);}
 }
 const call=method=>{const result=tail.then(async()=>{
  const outcome=await invoke(method);
  return method==='alarm'&&outcome.state==='unavailable'?deferUnavailableClosureAlarm({context:options.context,now:options.now??Date.now}):outcome;
 });tail=result.catch(()=>{});return result;};
 return Object.freeze({arm:()=>call('arm'),status:()=>call('status'),alarm:()=>call('alarm')});
}
