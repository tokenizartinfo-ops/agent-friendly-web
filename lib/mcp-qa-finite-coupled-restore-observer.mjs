import {finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex} from './mcp-finite-evidence.mjs';
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
