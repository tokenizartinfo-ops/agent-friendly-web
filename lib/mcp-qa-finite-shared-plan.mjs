import {finiteFields as fields,finiteSame as same} from './mcp-finite-evidence.mjs';
import {finiteCleanupPolicyHash} from './mcp-finite-cleanup-policy.mjs';
import {finiteLauncherInstanceId} from './mcp-qa-finite-launch-records.mjs';
import {finiteObserverInstanceId} from './mcp-qa-finite-observer.mjs';
import {assertPrivateQaFiniteInstalledPlan} from './mcp-qa-finite-installed-policy.mjs';
import {readPrivateQaFinitePlan,validatePrivateQaFiniteLegacy} from './mcp-qa-finite-trial-control.mjs';

const fail=()=>{throw Error('Finite shared control plan unavailable');};

/** Data-only assembly from already qualified primary evidence. The canonical
 * control validator owns serialization, identity, and effect authorization. */
export function buildPrivateQaFiniteSharedPlan({material,installed,roles,trialId}){
 const {seed,primaryEvidence:primary,seedHash}=material,{receipt,record,original}=installed;
 const {intentId,sourceRevision,repository,commandId,finalizer,manifest,qaPublication}=seed;
 const {deployments,resources}=roles,{T0,N1,R1}=primary,{C0,C1}=original;
 const refs={intentId,sourceRevision};
 const qaStatic=manifest.modules.qaLive.publicStatic,canaryStatic=manifest.modules.canaryLive.publicStatic;
 const qa=deployments.qaLive,live=deployments.canaryLive,rollback=deployments.canaryClosed;
 if(T0!==original.T0||seedHash!==receipt.seedHash||seed.sourceRevision!==manifest.sourceRevision||
    primary.sourceTree!==manifest.sourceTree||record.artifact.sourceTree!==manifest.sourceTree||
    record.artifact.sourceRevision!==sourceRevision||record.artifact.workerHash!==live.module.sha256||
    finalizer.attempt!==1||finalizer.runId!==primary.runId||finalizer.jobId!==primary.jobId||
    qa.versionId!==qaPublication.qaLive.versionId||qa.deploymentId!==qaPublication.qaLive.deploymentId||
    qa.configurationHash!==qaPublication.qaLive.configurationHash||
    deployments.qaClosed.versionId!==qaPublication.qaClosed.versionId||
    deployments.qaClosed.configurationHash!==qaPublication.qaClosed.configurationHash||
    rollback.versionId!==original.rollback.versionId||rollback.deploymentId!==original.rollback.deploymentId||
    !same(rollback.module,original.rollback.module)||trialId!==record.policy.plan.trialId)fail();
 const plan={
  purpose:'afw.qa-finite-trial-plan.v1',intentId,
  command:{kind:'finite_native_confirmation',id:commandId,createdAt:T0,repository,sourceRevision},
  source:{revision:sourceRevision,tree:manifest.sourceTree,moduleHash:qa.module.sha256,profileHash:qaStatic.profileHash,bindingsHash:qaStatic.bindingsHash},
  trialId,grantHash:original.grantHash,monitorHash:original.monitorHash,eventPlanHash:original.eventPlanHash,bundleHash:record.bundleHash,
  T0,N1,C0,C1,R1,
  resources:fields(resources,['actorId','containerId','applicationId','namespaceId','qaD1Id','releaseD1Id','canaryActorId']),
  deployments:fields(deployments,['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed']),
  canaryContainment:{sourceRevision,runtimeVersionId:live.versionId,moduleHash:live.module.sha256,profileHash:canaryStatic.profileHash,bindingsHash:canaryStatic.bindingsHash},
  selectors:original.selectors,withdrawalPolicyHash:original.withdrawalPolicyHash,closePolicyHash:null,
  launchPolicy:{armAckBy:T0+90000,launchAt:T0+150000,lastCreateAt:T0+160000},
  workflows:{confirmation:'afw-release-'+record.bundleHash,bootstrap:finiteObserverInstanceId(refs),launcher:finiteLauncherInstanceId(refs)},
  finalizer:{repository,runId:primary.runId,attempt:1,jobId:primary.jobId,workflow:'afw-finite-finalizer',sourceRevision,readyStep:'admit-and-ready'},
  legacy:validatePrivateQaFiniteLegacy({legacy:original.legacy,T0}),
 };
 plan.closePolicyHash=finiteCleanupPolicyHash(plan);
 const planRaw=JSON.stringify(plan),verified=readPrivateQaFinitePlan(planRaw);
 assertPrivateQaFiniteInstalledPlan(installed,verified.plan);
 return Object.freeze({planRaw,planHash:verified.planHash});
}
