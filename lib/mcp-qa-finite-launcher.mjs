import {finiteLauncherInstanceId,validateFiniteLaunchPrepared,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
import {finiteFields as fields,finiteData as data,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite launcher unavailable');};
export const FINITE_LAUNCHER_OPERATION='finite_nominal_launcher';
const slot='afw-own-successor-closure-v1',name='afw-own-qa-private-bootstrap';
const stepOptions=Object.freeze({retries:Object.freeze({limit:0,delay:'1 second',backoff:'constant'}),timeout:'5 seconds'});
const pending=()=>({status:'admin_pending',mayRetry:false,authorizesEffects:false,operationalReadiness:false});
async function metadata(promise){const value=await promise;try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}}
/** Only the finite source class mounts this operation. C2 inside the fixed DO
 * independently qualifies actual launcher/source/seed/READY and step completion.
 * Stored metadata and a replayed step result are never a new send capability. */
export async function runPrivateQaFiniteLauncher({env,event,step}){
 try{
  const payload=event.payload,x=fields(payload,['operation','intentId','sourceRevision']),refs={intentId:x.intentId,sourceRevision:x.sourceRevision};
  const id=finiteLauncherInstanceId(refs),ns=env.AFW_INDEPENDENT_CLOSURE,version=env.AFW_QA_VERSION?.id;
  if(x.operation!==FINITE_LAUNCHER_OPERATION||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!==name||!version||typeof step?.do!=='function'||typeof step?.sleepUntil!=='function')fail();
  const actorId=ns.idFromName(slot),actor=ns.get(actorId),own=()=>{
   if(env.AFW_INDEPENDENT_CLOSURE!==ns||env.AFW_QA_VERSION?.id!==version||event.payload!==payload||!same(fields(payload,['operation','intentId','sourceRevision']),x)||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!==name||ns.idFromName(slot).toString()!==actorId.toString())fail();
  };
  const validate=record=>{const p=validateFiniteLaunchPrepared(record);if(p.intentId!==x.intentId||p.sourceRevision!==x.sourceRevision||p.launcherId!==id||p.actorId!==actorId.toString()||p.qaVersionId!==version)fail();return p;};
  let firstExecuted=false;
  const envelope=fields(await metadata(step.do('finite-launch-prepare',stepOptions,async()=>{
   firstExecuted=true;own();const began=Date.now(),mono=performance.now();let timer,active=true;
   const check=()=>{own();const at=Date.now();if(!active||!time(at)||at<began||at-began>=5000||performance.now()-mono>=5000)fail();return at;};
   try{return await Promise.race([(async()=>{
    check();const r=fields(await metadata(actor.prepareFiniteNominalLaunch(refs)),['status','prepared','mayRetry','authorizesEffects','operationalReadiness']);check();
    if(r.status!=='prepared'||r.mayRetry!==false||r.authorizesEffects!==false||r.operationalReadiness!==false)fail();
    const prepared=validate(r.prepared);if(check()>prepared.armAckBy||began<prepared.armAckBy-90000)fail();
    const read=await metadata(actor.readFiniteNominalLaunch({intentId:x.intentId,controlHash:prepared.controlHash}));check();
    if(read.status!=='observed'||read.mayRetry!==false||read.authorizesEffects!==false||read.operationalReadiness!==false||!same(validate(read.prepared),prepared)||read.send!==null||read.ack!==null||read.nativeCreateAcknowledged!==false)fail();
    const acknowledgedAt=check();if(acknowledgedAt>prepared.armAckBy)fail();
    return {purpose:'afw.finite-launcher-prepared.v1',prepared,preparedHash:hashFiniteLaunchRecord(prepared),acknowledgedAt};
   })(),new Promise((_,reject)=>{timer=setTimeout(()=>{active=false;reject(Error('Finite launcher unavailable'));},5000);})]);}
   finally{active=false;clearTimeout(timer);}
  })),['purpose','prepared','preparedHash','acknowledgedAt']);
  own();const prepared=validate(envelope.prepared),T0=prepared.armAckBy-90000;
  if(envelope.purpose!=='afw.finite-launcher-prepared.v1'||envelope.preparedHash!==hashFiniteLaunchRecord(prepared)||!time(envelope.acknowledgedAt)||envelope.acknowledgedAt<prepared.preparedAt||envelope.acknowledgedAt>prepared.armAckBy||firstExecuted&&Date.now()>prepared.armAckBy)fail();
  let last=T0;const check=()=>{own();const at=Date.now();if(!time(at)||at<last||at<T0||at>=prepared.lastCreateAt)fail();last=at;return at;};
  check();await step.sleepUntil('finite-launch-wait',new Date(prepared.launchAt));check();
  return await metadata(step.do('finite-launch-create',stepOptions,async()=>{
   if(check()<prepared.launchAt)fail();
   // Actual successful provider prepare-step completion <=armAckBy is C2's
   // mandatory source qualification inside this one-shot server method.
   const r=await metadata(actor.createFiniteNominalChild({intentId:x.intentId,controlHash:prepared.controlHash}));own();
   if(!['acknowledged','issued','admin_pending'].includes(r?.status)||r.mayRetry!==false||r.authorizesEffects!==false||r.operationalReadiness!==false)fail();
   return data(r);
  }));
 }catch{return pending();}
}
