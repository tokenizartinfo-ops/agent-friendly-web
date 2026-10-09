import {validateOccurrenceApproval,approvalValues,createOccurrenceApprovalCatalog} from './assistance-occurrence-approvals.mjs';
import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {createClosureD1Actions} from './assistance-closure-d1-actions.mjs';
import {createQaAdministrativeClosureActions} from './assistance-qa-administrative-composition.mjs';
import {createClosureAlarmActor} from './assistance-closure-alarm-actor.mjs';
const unknown=()=>Object.freeze({verified:false,state:'unknown'});

/** Internal trusted server composition only. Shared primary catalog, own primary
 * D1 and separate custody readers are mandatory; no route or implicit enrollment.
 * Authorization is fresh before dispatch, not a distributed atomic transaction.
 */
export async function createApprovedQaClosureActor({context,db,catalog,approval,readIdentityCredential,readAdministrativeCredential,fetchImpl=globalThis.fetch,now=Date.now,authorizationTimeoutMs=5000}={}){
 const unavailable=createClosureAlarmActor({context});
 try{
  if(typeof catalog?.read!=='function'||[readIdentityCredential,readAdministrativeCredential,fetchImpl,now].some(f=>typeof f!=='function')||!Number.isSafeInteger(authorizationTimeoutMs)||authorizationTimeoutMs<1||authorizationTimeoutMs>10000)return unavailable;
  const a=validateOccurrenceApproval(approval),expected=approvalValues(a);
  const primaryDb=typeof db?.withSession==='function'?db.withSession('first-primary'):db;
  const primary=createOccurrenceApprovalCatalog({db:primaryDb});
  let pin=null,lastTime=-1;
  function clock(){const t=now();if(!Number.isSafeInteger(t)||t<0||t>8640000000000000||t<lastTime)return false;lastTime=t;return true;}
  const guardedNow=()=>{if(!clock())throw Error('QA actor clock unavailable');return lastTime;};
  async function readScope(){try{
   if(!clock())return null;
   const raw=await catalog.read();if(!clock()||!raw)return null;
   const record=await validateQaClosureApproval(raw,a);
   if(!clock()||lastTime<record.provisioning.createdAt||(pin&&record.plan.baselineRef!==pin.plan.baselineRef))return null;
   const current=await primary.read(a.manifest.occurrenceId);
   if(!clock()||!current||!approvalValues(current.approval).every((v,i)=>v===expected[i]))return null;
   // The plan's own revocation is expected during closure; QA withdrawal is not.
   const final=await catalog.read();if(!clock()||!final)return null;
   const checked=await validateQaClosureApproval(final,a);
   return clock()&&checked.plan.baselineRef===record.plan.baselineRef?checked:null;
  }catch{return null;}}
  async function scope(){let timer;try{return await Promise.race([readScope(),new Promise(resolve=>{timer=setTimeout(()=>resolve(null),authorizationTimeoutMs);})]);}finally{clearTimeout(timer);}}
  pin=await scope();if(!pin)return unavailable;
  const d1=createClosureD1Actions({db:primaryDb,approval:a,plan:pin.plan,now:guardedNow,authorizeWrite:async()=>Boolean(await scope())});
  const administration=await createQaAdministrativeClosureActions({catalog:{read:scope},plan:pin.plan,readIdentityCredential,readAdministrativeCredential,fetchImpl,now:guardedNow,authorizationTimeoutMs});
  if(!administration)return unavailable;
  const action=fn=>async input=>{if(!await scope())return unknown();return fn(input);};
  const actor=createClosureAlarmActor({context,options:{storage:context.storage,plan:pin.plan,now:guardedNow,
   revokePlan:action(d1.revokePlan),closeLedger:action(d1.closeLedger),restoreAdministration:action(administration.restoreAdministration),
   readIssuedReceipt:async input=>{
    if(!await scope())return unknown();
    const result=await(input?.step==='restoreAdministration'?administration.readIssuedReceipt(input):d1.readIssuedReceipt(input));
    return await scope()?result:unknown();
   }
  }});
  return Object.freeze({arm:async()=>await scope()?actor.arm():Object.freeze({state:'unavailable'}),status:actor.status,alarm:actor.alarm});
 }catch{return unavailable;}
}
