import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time,finiteHash as hash} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite observer unavailable');};
export const FINITE_OBSERVER_OPERATION='finite_cleanup_observer';
export const FINITE_PREVIEW_STEP='finite-material-preview';
export const FINITE_CLAIM_STEP='finite-qa-restore-claim';
export const FINITE_OBSERVER_SLOT='afw-own-successor-closure-v1';
let compiledSource=null;
export function installPrivateQaFiniteObserverSource(revision){if(compiledSource!==null||!hex(revision,40))fail();compiledSource=revision;}
// Native RPC adds a disposable transport handle to plain result metadata.
// Clone only the serializable DTO, release the handle, then validate strictly.
async function metadata(promise){const value=await promise;try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}}
const stepOptions=Object.freeze({retries:Object.freeze({limit:0,delay:'1 second',backoff:'constant'}),timeout:'5 seconds'});
export function finiteObserverInstanceId(refs){
 const x=fields(refs,['intentId','sourceRevision']);if(!hex(x.intentId)||!hex(x.sourceRevision,40))fail();
 return 'afw-finite-observer-'+createHash('sha256').update('afw.finite-observer.v1\n'+x.intentId+'\n'+x.sourceRevision).digest('hex');
}
export function validateFiniteMaterialPreview(value){
 const p=fields(data(value),['purpose','intentId','sourceRevision','runtimeVersionId','actorId','planHash','controlHash','resourceHash','T0','N1','C0','C1','R1']);
 if(p.purpose!=='afw.qa-finite-material-preview.v1'||!hex(p.intentId)||!hex(p.sourceRevision,40)||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(p.runtimeVersionId)||['actorId','planHash','controlHash','resourceHash'].some(k=>!hex(p[k]))||!time(p.T0)||p.N1!==p.T0+300000||p.C0!==p.N1-60000||p.C1!==p.N1+120000||p.R1!==p.N1+180000)fail();return p;
}
export function validateFiniteQaClaim(value,preview,proofHash){
 const p=validateFiniteMaterialPreview(preview),r=fields(data(value),['purpose','claim','claimHash']),c=fields(r.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
 if(r.purpose!=='afw.finite-qa-claim-handoff.v1'||c.purpose!=='afw.qa-finite-trial.v1:effect'||c.intentId!==p.intentId||c.controlHash!==p.controlHash||c.kind!=='qa_restore'||c.phase!=='issued'||c.proofHash!==proofHash||!hex(proofHash)||!time(c.issuedAt)||c.issuedAt<p.C0||c.issuedAt>=p.R1||c.deadline!==p.R1||r.claimHash!==hash(c))fail();return r;
}
/** One native Workflow. No public HTTP or caller-selected actor. Its FIRST step
 * is read-only preview; exactly one separately named journal claim follows
 * settled cleanup. Distinct observation step IDs avoid caching absent forever. */
export async function runPrivateQaFiniteObserver({env,event,step,now=Date.now}={}){
 try{
  const x=fields(data(event.payload),['operation','intentId','sourceRevision']),refs={intentId:x.intentId,sourceRevision:x.sourceRevision};
  if(x.operation!==FINITE_OBSERVER_OPERATION||event.instanceId!==finiteObserverInstanceId(refs)||typeof step?.do!=='function'||typeof step?.sleepUntil!=='function'||typeof now!=='function')fail();
  if(compiledSource!==x.sourceRevision||!env.AFW_QA_VERSION?.id)fail();
  const ownVersion=env.AFW_QA_VERSION.id,provenance={purpose:'afw.finite-observer-provenance.v1',instanceId:event.instanceId,sourceRevision:compiledSource,runtimeVersionId:ownVersion};
  const own=()=>{if(compiledSource!==x.sourceRevision||env.AFW_QA_VERSION?.id!==ownVersion)fail();};
  const ns=env.AFW_INDEPENDENT_CLOSURE,actor=ns.get(ns.idFromName(FINITE_OBSERVER_SLOT));
  const envelope=await step.do(FINITE_PREVIEW_STEP,stepOptions,async()=>{own();const material=validateFiniteMaterialPreview(await metadata(actor.previewFiniteTrialMaterial(refs)));own();return data({purpose:'afw.finite-observer-preview.v1',provenance,material});});
  if(envelope.purpose!=='afw.finite-observer-preview.v1'||JSON.stringify(envelope.provenance)!==JSON.stringify(provenance))fail();
  const preview=validateFiniteMaterialPreview(envelope.material);
  if(preview.intentId!==x.intentId||preview.sourceRevision!==x.sourceRevision||preview.actorId!==ns.idFromName(FINITE_OBSERVER_SLOT).toString()||env.AFW_QA_VERSION?.id!==preview.runtimeVersionId)fail();
  let last=preview.T0;const check=()=>{own();const at=now();if(!time(at)||at<last||at<preview.T0||at>=preview.R1)fail();last=at;return at;};
  for(let i=0;i<31;i++){
   check();const target=preview.C0+Math.floor(i*(preview.R1-preview.C0-5000)/30);
   if(check()<target)await step.sleepUntil('finite-observe-wait-'+i,new Date(target));check();
   const result=await step.do('finite-cleanup-observation-'+i,stepOptions,async()=>{
    check();const head=await metadata(actor.readFiniteTrialCleanupProofHead({intentId:x.intentId,controlHash:preview.controlHash}));check();
    if(head.status==='not_yet_observed')return {status:'not_yet_observed'};
    if(head.status!=='observed'||head.intentId!==x.intentId||head.controlHash!==preview.controlHash||!hex(head.proofHash))fail();
    const retained=await metadata(actor.readRetainedFiniteCleanupProof({intentId:x.intentId,proofHash:head.proofHash}));check();
    const completion=await metadata(actor.readFiniteTrialCleanupCompletion({intentId:x.intentId,controlHash:preview.controlHash,proofHash:head.proofHash}));check();
    if(completion.status==='not_yet_observed')return {status:'not_yet_observed'};
    if(retained.status!=='observed'||completion.status!=='complete'||retained.record?.proofHash!==head.proofHash||completion.receipt?.proofHash!==head.proofHash||completion.receipt?.controlHash!==preview.controlHash)fail();
    return data({status:'observed',retained:retained.record,completion:completion.receipt});
   });check();
   if(result.status==='not_yet_observed')continue;
   const qaClaim=validateFiniteQaClaim(await step.do(FINITE_CLAIM_STEP,stepOptions,()=>metadata(actor.claimFiniteTrialQaRestore({intentId:x.intentId,controlHash:preview.controlHash,proofHash:result.retained.proofHash}))),preview,result.retained.proofHash);check();
   if(qaClaim.claim.issuedAt<result.completion.completedAt)fail();
   const finalPrimary=await step.do('finite-final-primary',stepOptions,()=>metadata(actor.readFiniteTrialFinalPrimary({intentId:x.intentId,controlHash:preview.controlHash,proofHash:result.retained.proofHash,claimHash:qaClaim.claimHash})));check();
   return data({purpose:'afw.finite-observer-output.v1',instanceId:event.instanceId,provenance,preview,retained:result.retained,completion:result.completion,qaClaim,plan:finalPrimary.plan,primaryReceipt:finalPrimary.receipt});
  }
 }catch{/* Sanitized: unavailable provenance/custody/ACK never fabricates output. */}
 return Object.freeze({status:'admin_pending',authorizesEffects:false,operationalReadiness:false,mayRetry:false});
}
