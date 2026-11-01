import {finiteRestorationFixture} from './finite-restoration.mjs';
import {finiteHash as hash} from '../../lib/mcp-finite-evidence.mjs';
import {projectPrivateQaFiniteReferences} from '../../lib/mcp-qa-finite-trial-control.mjs';
import {projectFiniteExternalPlan,validateFiniteObserverOutput} from '../../lib/mcp-qa-finite-external-contract.mjs';
import {finiteObserverInstanceId} from '../../lib/mcp-qa-finite-observer.mjs';
export async function finiteFinalizerFixture({configure=()=>{},at}={}){
 const base=await finiteRestorationFixture({at,configure:(p,f)=>{p.intentId='a'.repeat(64);p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});configure(p,f);}});
 const {f,identity,store,ctl}=base,p=f.plan,v=projectPrivateQaFiniteReferences(identity),retained=base.retained.record;
 const policy=[{effect:'allow',resources:{'com.cloudflare.api.account.85d0d5dadac3341a564f22ce885e9eec':'*'},permission_groups:[{id:'1'.repeat(32)},{id:'2'.repeat(32)}]}];
 const custody={id:'a'.repeat(32),expiresAt:p.R1,policyHash:hash(policy),permissionGroupIds:['1'.repeat(32),'2'.repeat(32)]};
 for(const kind of ['withdraw','close','seal','canary_restore']){
  const claim=kind==='canary_restore'?base.input.claim:(await ctl.claimEffect(kind)).claim;
  const receipt=kind==='canary_restore'?{purpose:'afw.finite-canary-restored.v1',intentId:p.intentId,controlHash:v.controlHash,proofHash:retained.proofHash,versionId:p.deployments.canaryClosed.versionId,deploymentId:p.deployments.canaryClosed.deploymentId,readbackHash:'b'.repeat(64),observedAt:f.now()}:{synthetic:true};
  f.rows.set('afw.qa-finite-guard.v1:'+p.intentId+':effect:'+kind,{purpose:'afw.finite-guard-effect.v1',controlHash:v.controlHash,kind,claimHash:hash(claim),phase:'complete',receipt,completedAt:f.now()});
 }
 const completed=await store.retainCompletion();if(completed.status!=='complete')throw Error('fixture completion '+completed.status);
 const native=await ctl.claimEffect('qa_restore');if(native.status!=='issued')throw Error('fixture claim '+native.status);
 const qaClaim={purpose:'afw.finite-qa-claim-handoff.v1',claim:native.claim,claimHash:hash(native.claim)};
 const plan=projectFiniteExternalPlan({control:identity,preview:v,custody});
 const primary={...retained.support.primary,observedAt:f.now()},writers={purpose:'afw.finite-writer-exclusion.v1',controlHash:v.controlHash,sealHash:retained.proof.sealHash,settledWriterHash:hash(retained.support.gate.writers),sourceRevision:p.canaryContainment.sourceRevision,closedModuleHash:p.deployments.canaryClosed.module.sha256,inventoryHash:'c'.repeat(64),knownActive:0,knownPending:0,unresolvedRemoteWrites:0,legacyContained:true,closedSourceQualified:true,observedAt:f.now()};
 const body={purpose:'afw.finite-final-primary.v1',intentId:p.intentId,controlHash:v.controlHash,planHash:v.planHash,proofHash:retained.proofHash,completionHash:completed.receipt.receiptHash,nativeClaimHash:qaClaim.claimHash,sealHash:retained.proof.sealHash,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId,actorId:v.actorId,closedCanaryVersionId:p.deployments.canaryClosed.versionId,closedCanaryModuleHash:p.deployments.canaryClosed.module.sha256,primary,writers,observedAt:f.now()};
 const primaryReceipt={...body,receiptHash:hash(body)};
 const output={purpose:'afw.finite-observer-output.v1',instanceId:p.workflows.bootstrap,provenance:{purpose:'afw.finite-observer-provenance.v1',instanceId:p.workflows.bootstrap,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId},preview:v,retained,completion:completed.receipt,qaClaim,plan,primaryReceipt};
 validateFiniteObserverOutput(output,plan);
 let posts=0,claims=0,version=p.deployments.qaLive.versionId,deployment=p.deployments.qaLive.deploymentId,send;
 const state={output:structuredClone(output),jobId:99,claimMode:'issued',lostPost:false,late:false,blocked:false};
 const snapshot=()=>({purpose:'afw.finite-qa-snapshot.v1',observedAt:f.now(),qaVersionId:version,qaDeploymentId:deployment,output:state.output,restoreJobId:state.jobId,custodyExpiresAt:p.R1,profilesVerified:true,namespacesPreserved:true,exposureDisabled:true,providerSettled:true,workflowsTerminal:true,primarySealedChainVerified:!state.blocked,githubVerified:true,evidenceHash:'a'.repeat(64)});
 const deps={plan,now:f.now,signal:new AbortController().signal,readSnapshot:async()=>snapshot(),claim:async r=>{claims++;if(send)return 'existing';if(state.claimMode!=='issued')return state.claimMode;send=r;return 'issued';},deployClosed:async()=>{posts++;version=p.deployments.qaClosed.versionId;deployment='99999999-9999-4999-8999-999999999999';if(state.late)f.setNow(p.R1);if(state.lostPost)throw Error('lost');return{deploymentId:deployment};}};
 return {...base,restorationState:base.state,plan,preview:v,custody,policy,output,state,deps,snapshot,get posts(){return posts;},get claims(){return claims;},get send(){return send;},setPointer:(a,b)=>{version=a;deployment=b;}};
}
