import {readPrivateQaFiniteCoupledFinalization} from './mcp-qa-finite-coupled-finalization.mjs';
import {FINITE_ALARM_HANDOFF,readFiniteOriginalAlarmHandoff} from './mcp-qa-finite-alarm-handoff.mjs';
import {finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {FINITE_OBSERVER_SLOT} from './mcp-qa-finite-observer.mjs';

export const FINITE_COUPLED_QA_OPERATION='finite_coupled_qa_restore_preparation';
const fail=()=>{throw Error('Finite original QA preparation unavailable');};
export function finiteCoupledQaPreparationInstanceId({intentId,controlHash,sourceRevision}){
 if(!hex(intentId)||!hex(controlHash)||!hex(sourceRevision,40))fail();
 return 'afw-coupled-qa-'+hash({purpose:'afw.finite-coupled-qa-preparation-observer.v1',intentId,controlHash,sourceRevision});
}
/** One private Workflow step reaches only the fixed durable actor. The
 * independent writer can use the retained step even after QA is replaced. */
export async function observePrivateQaCoupledRestorePreparation({env,event,step,sourceRevision}){
 const x=fields(data(event.payload),['operation','intentId','controlHash','sourceRevision']);
 if(x.operation!==FINITE_COUPLED_QA_OPERATION||x.sourceRevision!==sourceRevision||event.instanceId!==finiteCoupledQaPreparationInstanceId(x)||
    event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!=='afw-own-qa-private-bootstrap')fail();
 const runtimeVersionId=env.AFW_QA_VERSION?.id,ns=env.AFW_INDEPENDENT_CLOSURE,slot=ns.idFromName(FINITE_OBSERVER_SLOT);
 if(!runtimeVersionId)fail();
 const result=await step.do('observe-original-qa-restore-preparation',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{
  const actor=ns.get(slot);
  const raw=await actor.readFiniteCoupledQaFinalization({intentId:x.intentId,controlHash:x.controlHash});
  try{
   const prepared=data(structuredClone(raw));
   if(prepared.status!=='prepared'||prepared.intentId!==x.intentId||prepared.controlHash!==x.controlHash||
      prepared.sourceRevision!==sourceRevision||prepared.liveQa?.versionId!==runtimeVersionId||env.AFW_QA_VERSION?.id!==runtimeVersionId||
      prepared.authorizesEffects!==false||prepared.operationalReadiness!==false)fail();
   const {preparationHash,...body}=prepared;if(hash(body)!==preparationHash)fail();
   return prepared;
  }finally{raw?.[Symbol.dispose]?.();}
 });
 return Object.freeze({purpose:'afw.finite-coupled-qa-preparation-observed.v1',instanceId:event.instanceId,runtimeVersionId,sourceRevision,preparation:data(result)});
}

/** Only the original alarm calls this. Retain the fixed invocation before
 * entering Cloudflare's Workflow API, even if acknowledgment later vanishes. */
export async function publishPrivateQaCoupledRestorePreparation({ctx,env,receiptHash,now=Date.now}={}){
 const storage=ctx.storage,binding=env.AFW_QA_BOOTSTRAP,create=binding?.create,sync=storage?.sync;
 if(!hex(receiptHash)||typeof create!=='function'||typeof sync!=='function')fail();
 const entered=now(),mono=performance.now();let last=entered,ended=false,timer;
 const check=()=>{
  const at=now();if(ended||!time(at)||at<last||at-entered>=5000||performance.now()-mono>=5000||
    ctx.storage!==storage||storage.sync!==sync||env.AFW_QA_BOOTSTRAP!==binding||binding.create!==create)fail();
  last=at;return at;
 };
 const work=async()=>{
  check();const handoff=readFiniteOriginalAlarmHandoff(await storage.get(FINITE_ALARM_HANDOFF));check();
  const refs={intentId:handoff.intentId,controlHash:handoff.controlHash,sourceRevision:handoff.sourceRevision};
  const read=()=>readPrivateQaFiniteCoupledFinalization({ctx,env,refs:{intentId:refs.intentId,controlHash:refs.controlHash},now:check});
  const prepared=await read();check();
  if(prepared.status!=='prepared'||prepared.ownerReceiptHash!==receiptHash||check()>=prepared.restoreBefore)fail();
  const id=finiteCoupledQaPreparationInstanceId(refs),params={operation:FINITE_COUPLED_QA_OPERATION,...refs};
  const key='afw.finite-coupled-qa-observer-issued.v1:'+id;
  const entry=data({purpose:'afw.finite-coupled-qa-observer-issued.v1',instanceId:id,preparationHash:prepared.preparationHash,
   ownerReceiptHash:receiptHash,restoreBefore:prepared.restoreBefore});
  const first=await storage.transaction(async tx=>{
   check();const existing=await tx.get(key);check();
   if(existing!==undefined){if(!same(existing,entry))fail();return false;}
   await tx.put(key,entry);check();return true;
  });check();
  if(!first)return {status:'recorded',instanceId:id,operationalReadiness:false};
  await sync.call(storage);check();
  if(!same(await storage.get(key),entry)||!same(await read(),prepared)||check()>=prepared.restoreBefore)fail();
  try{
   const instance=await create.call(binding,{id,params});
   try{check();if(instance?.id!==id)fail();}
   finally{instance?.[Symbol.dispose]?.();}
   return {status:'acknowledged',instanceId:id,operationalReadiness:false};
  }catch{return {status:'uncertain',operationalReadiness:false};}
 };
 try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{ended=true;reject(Error('Finite original QA publication stopped'));},5000);})]);}
 finally{ended=true;clearTimeout(timer);}
}
