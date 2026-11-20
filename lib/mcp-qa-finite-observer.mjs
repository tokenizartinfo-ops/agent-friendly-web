import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time,finiteHash as hash,finiteSame as same} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite observer unavailable');};
export const FINITE_OBSERVER_OPERATION='finite_cleanup_observer';
export const FINITE_PREVIEW_STEP='finite-material-preview';
export const FINITE_OBSERVER_INSTALLATION_URL='https://afw-private.invalid/_finite-native/observer-preview';
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
export function validateFiniteObserverPreviewEnvelope(value,{setupReceiptHash,requireSetupReceipt=false}={}){
 const bound=value?.purpose==='afw.finite-observer-preview.v2';
 const envelope=fields(data(value),bound?['purpose','provenance','material','setupReceiptHash','plan']:['purpose','provenance','material']);
 if(!bound&&(requireSetupReceipt||setupReceiptHash!==undefined||envelope.purpose!=='afw.finite-observer-preview.v1')||
    bound&&(!hex(envelope.setupReceiptHash)||setupReceiptHash!==undefined&&envelope.setupReceiptHash!==setupReceiptHash))fail();
 validateFiniteMaterialPreview(envelope.material);
 if(bound&&!same(envelope.plan?.preview,envelope.material))fail();
 return envelope;
}
export function validateFiniteQaClaim(value,preview,proofHash){
 const p=validateFiniteMaterialPreview(preview),r=fields(data(value),['purpose','claim','claimHash']),c=fields(r.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
 if(r.purpose!=='afw.finite-qa-claim-handoff.v1'||c.purpose!=='afw.qa-finite-trial.v1:effect'||c.intentId!==p.intentId||c.controlHash!==p.controlHash||c.kind!=='qa_restore'||c.phase!=='issued'||c.proofHash!==proofHash||!hex(proofHash)||!time(c.issuedAt)||c.issuedAt<p.C0||c.issuedAt>=p.R1||c.deadline!==p.R1||r.claimHash!==hash(c))fail();return r;
}
export function validateFiniteNativeObserverHandoff(value,preview){
 const v=validateFiniteMaterialPreview(preview);
 const out=fields(data(value),['purpose','instanceId','provenance','scope']);
 const instanceId=finiteObserverInstanceId({intentId:v.intentId,sourceRevision:v.sourceRevision});
 const provenance=fields(out.provenance,['purpose','instanceId','sourceRevision','runtimeVersionId']);
 const scope=fields(out.scope,['purpose','status','intentId','sourceRevision','controlHash','planHash',
  'runtimeVersionId','handoffHash','restoreFrom','restoreBefore','authorizesEffects','operationalReadiness']);
 if(out.purpose!=='afw.finite-native-observer-handoff.v1'||out.instanceId!==instanceId||
    provenance.purpose!=='afw.finite-observer-provenance.v1'||provenance.instanceId!==instanceId||
    provenance.sourceRevision!==v.sourceRevision||provenance.runtimeVersionId!==v.runtimeVersionId||
    scope.purpose!=='afw.finite-independent-qa-restore-scope.v1'||scope.status!=='reserved'||
    scope.intentId!==v.intentId||scope.sourceRevision!==v.sourceRevision||scope.controlHash!==v.controlHash||
    scope.planHash!==v.planHash||scope.runtimeVersionId!==v.runtimeVersionId||!hex(scope.handoffHash)||
    !time(scope.restoreFrom)||!time(scope.restoreBefore)||scope.restoreFrom<=v.R1+30000||
    scope.restoreBefore!==scope.restoreFrom+180000||scope.authorizesEffects!==false||scope.operationalReadiness!==false)fail();
 return out;
}
/** The native-launch observer hands off the original recovery scope. Standalone
 * observers use the original preview and business-window restore contract. */
export async function runPrivateQaFiniteObserver({env,event,step,now=Date.now,requireSetupReceipt=false,useNativeLauncher=false}={}){
 try{
  const x=fields(data(event.payload),['operation','intentId','sourceRevision']),refs={intentId:x.intentId,sourceRevision:x.sourceRevision};
  if(x.operation!==FINITE_OBSERVER_OPERATION||event.instanceId!==finiteObserverInstanceId(refs)||typeof step?.do!=='function'||typeof step?.sleepUntil!=='function'||typeof now!=='function')fail();
  if(compiledSource!==x.sourceRevision||!env.AFW_QA_VERSION?.id)fail();
  const ownVersion=env.AFW_QA_VERSION.id,provenance={purpose:'afw.finite-observer-provenance.v1',instanceId:event.instanceId,sourceRevision:compiledSource,runtimeVersionId:ownVersion};
  const own=()=>{if(compiledSource!==x.sourceRevision||env.AFW_QA_VERSION?.id!==ownVersion)fail();};
  const ns=env.AFW_INDEPENDENT_CLOSURE,actor=ns.get(ns.idFromName(FINITE_OBSERVER_SLOT));
  const firstStep=async()=>{
   own();
   if(!requireSetupReceipt){
    const material=validateFiniteMaterialPreview(await metadata(actor.previewFiniteTrialMaterial(refs)));own();
    return data({purpose:'afw.finite-observer-preview.v1',provenance,material});
   }
   const response=await actor.fetch(new Request(FINITE_OBSERVER_INSTALLATION_URL));own();
   if(response.status!==200||response.headers.get('Content-Type')?.split(';')[0]!=='application/json')fail();
   const body=await response.text();own();
   if(Buffer.byteLength(body)>8192)fail();
   const result=fields(data(JSON.parse(body)),['material','setupReceiptHash','plan']);
   return validateFiniteObserverPreviewEnvelope({purpose:'afw.finite-observer-preview.v2',provenance,...result},{requireSetupReceipt:true});
  };
  const envelope=validateFiniteObserverPreviewEnvelope(await metadata(step.do(FINITE_PREVIEW_STEP,stepOptions,firstStep)),{requireSetupReceipt});
  if(JSON.stringify(envelope.provenance)!==JSON.stringify(provenance))fail();
  const preview=validateFiniteMaterialPreview(envelope.material);
  if(preview.intentId!==x.intentId||preview.sourceRevision!==x.sourceRevision||preview.actorId!==ns.idFromName(FINITE_OBSERVER_SLOT).toString()||env.AFW_QA_VERSION?.id!==preview.runtimeVersionId)fail();
  let last=preview.T0;const check=()=>{own();const at=now();if(!time(at)||at<last||at<preview.T0||at>=preview.R1)fail();last=at;return at;};
  if(useNativeLauncher){
   if(!requireSetupReceipt)fail();
   const request={intentId:x.intentId,sourceRevision:x.sourceRevision,controlHash:preview.controlHash};
   // The original observer is already running after setup. Poll only its
   // pre-launch slots, and stop as soon as a durable send may exist.
   for(let i=0;i<7;i++){
    const target=preview.T0+54000+5000*i,at=check();
    if(at>target+1000)continue;
    if(at<target)await step.sleepUntil('finite-launch-ready-wait-'+i,new Date(target));
    if(check()>=preview.T0+85000)break;
    const result=await metadata(step.do('finite-native-launch-dispatch-'+i,stepOptions,async()=>{
     const at=check();if(at<target||at>=target+1000)return {status:'pending',operationalReadiness:false};
     try{return await metadata(actor.scheduleFiniteNominalLauncher(request));}
     catch{return {status:'uncertain',operationalReadiness:false};}
    }));check();
    const r=fields(data(result),['status','operationalReadiness']);
    if(r.operationalReadiness!==false||!['pending','acknowledged','recorded','uncertain'].includes(r.status))fail();
    if(r.status!=='pending')break;
   }
   // Nominal preparation commits the original alarm by T0 + 90s. Observe
   // that record even when launcher acknowledgement was lost. The actor's
   // original alarm owns the later terminal proof and restoration publication.
   for(let i=0;i<6;i++){
    const target=preview.T0+85000+10000*i;
    if(check()<target)await step.sleepUntil('finite-independent-qa-wait-'+i,new Date(target));
    if(check()>=preview.C0)fail();
    const value=data(await metadata(step.do('finite-independent-qa-scope-'+i,stepOptions,async()=>{
     if(check()>=preview.C0)fail();
     const observed=await metadata(actor.readFiniteIndependentQaRestoreScope(request));
     if(check()>=preview.C0)fail();
     return observed;
    })));
    if(check()>=preview.C0)fail();
    if(value?.status==='pending'){
     fields(value,['status','authorizesEffects','operationalReadiness']);
     if(value.authorizesEffects!==false||value.operationalReadiness!==false)fail();
     continue;
    }
    return validateFiniteNativeObserverHandoff({purpose:'afw.finite-native-observer-handoff.v1',
     instanceId:event.instanceId,provenance,scope:value},preview);
   }
   fail();
  }
  // At most 30 distinct observation slots. The legacy cleanup check stays read-only before the claim.
  for(let i=0;i<30;i++){
   check();const target=preview.C0+Math.floor(i*(preview.R1-preview.C0-5000)/29);
   if(check()<target)await step.sleepUntil('finite-observe-wait-'+i,new Date(target));check();
   const result=await metadata(step.do('finite-cleanup-observation-'+i,stepOptions,async()=>{
    check();const head=await metadata(actor.readFiniteTrialCleanupProofHead({intentId:x.intentId,controlHash:preview.controlHash}));check();
    if(head.status==='not_yet_observed')return {status:'not_yet_observed'};
    if(head.status!=='observed'||head.intentId!==x.intentId||head.controlHash!==preview.controlHash||!hex(head.proofHash))fail();
    const retained=await metadata(actor.readRetainedFiniteCleanupProof({intentId:x.intentId,proofHash:head.proofHash}));check();
    const completion=await metadata(actor.readFiniteTrialCleanupCompletion({intentId:x.intentId,controlHash:preview.controlHash,proofHash:head.proofHash}));check();
    if(completion.status==='not_yet_observed')return {status:'not_yet_observed'};
    if(retained.status!=='observed'||completion.status!=='complete'||retained.record?.proofHash!==head.proofHash||completion.receipt?.proofHash!==head.proofHash||completion.receipt?.controlHash!==preview.controlHash)fail();
    return data({status:'observed',retained:retained.record,completion:completion.receipt});
   }));check();
   if(result.status==='not_yet_observed')continue;
   const qaClaim=validateFiniteQaClaim(await metadata(step.do(FINITE_CLAIM_STEP,stepOptions,()=>metadata(actor.claimFiniteTrialQaRestore({intentId:x.intentId,controlHash:preview.controlHash,proofHash:result.retained.proofHash})))),preview,result.retained.proofHash);check();
   if(qaClaim.claim.issuedAt<result.completion.completedAt)fail();
   const finalPrimary=await metadata(step.do('finite-final-primary',stepOptions,()=>metadata(actor.readFiniteTrialFinalPrimary({intentId:x.intentId,controlHash:preview.controlHash,proofHash:result.retained.proofHash,claimHash:qaClaim.claimHash}))));check();
   if(requireSetupReceipt&&!same(finalPrimary.plan,envelope.plan))fail();
   return data({purpose:'afw.finite-observer-output.v1',instanceId:event.instanceId,provenance,preview,retained:result.retained,completion:result.completion,qaClaim,plan:finalPrimary.plan,primaryReceipt:finalPrimary.receipt});
  }
 }catch{/* Sanitized: unavailable provenance/custody/ACK never fabricates output. */}
 return Object.freeze({status:'admin_pending',authorizesEffects:false,operationalReadiness:false,mayRetry:false});
}
