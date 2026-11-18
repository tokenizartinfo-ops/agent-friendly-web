import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {assertPrivateQaFiniteInstalledPlan,readPrivateQaFiniteInstalledPolicy} from './mcp-qa-finite-installed-policy.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {readPrivateQaFinitePlan} from './mcp-qa-finite-trial-control.mjs';
import {finiteData as data,finiteSame as same} from './mcp-finite-evidence.mjs';
import {validateFiniteMaterialPreview} from './mcp-qa-finite-observer.mjs';
import {resolvePrivateQaFiniteObserverControl} from './mcp-qa-finite-observer-native.mjs';

const fail=()=>{throw Error('Finite observer installation unavailable');};

/** QA-only read of one witnessed installation and its existing control plan. */
export async function readPrivateQaFiniteObserverInstallation({ctx,env}){
 const started=Date.now(),monotonic=performance.now(),deadline=started+4800,controller=new AbortController();
 let last=started,timer;
 function check(){
  const now=Date.now();
  if(controller.signal.aborted||now<last||now>=deadline||performance.now()-monotonic>=4800)fail();
  last=now;return now;
 }
 const parent=Object.freeze({signal:controller.signal,deadline,check}),lease=Object.freeze({signal:parent.signal,assertCurrent:check});
 try{
  const read=async()=>{
   const {capsule}=await readPrivateQaFiniteInitialAnchors({ctx,env},lease);check();
   const {sourceRevision,preconnectionId}=capsule;
   const selected=await createFiniteOwnerPreparationStore({storage:ctx.storage,now:check}).readSelected({sourceRevision},lease);check();
   if(!selected?.binding||selected.preparation.prepId!==preconnectionId)fail();
   const refs={intentId:selected.binding.intentId,sourceRevision};
   const installation=()=>readPrivateQaFiniteInstalledPolicy({ctx,env,refs,parent});
   const installed=await installation();check();
   const {options,control}=await resolvePrivateQaFiniteObserverControl(ctx,env,refs);check();
   const {plan,planHash}=readPrivateQaFinitePlan(options.plan);
   const preview=validateFiniteMaterialPreview(await control.preview());check();
   assertPrivateQaFiniteInstalledPlan(installed,plan);
   const {receipt}=installed;
   if(preview.planHash!==planHash||preview.intentId!==refs.intentId||preview.sourceRevision!==refs.sourceRevision||
      preview.runtimeVersionId!==receipt.qaVersionId||!same(installed,await installation()))fail();
   check();
   return data({material:preview,setupReceiptHash:receipt.receiptHash});
  };
  return await Promise.race([read(),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Finite observer installation unavailable'));},Math.max(1,deadline-Date.now()));})]);
 }finally{clearTimeout(timer);controller.abort();}
}
