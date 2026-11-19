import {sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode} from '../../lib/mcp-qa-finite-initial-cleanup-records.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
import {finiteLauncherInstanceId} from '../../lib/mcp-qa-finite-launch-records.mjs';
import {finiteCleanupPolicyHash} from '../../lib/mcp-finite-cleanup-policy.mjs';
import {finitePrivateQaSetupInstanceId} from '../../lib/mcp-qa-finite-adoption.mjs';
import {hashFinitePolicyEffectIdentity} from '../../lib/mcp-qa-finite-preparation-records.mjs';
import {readPrivateQaFiniteControlIdentity} from '../../lib/mcp-qa-finite-trial-control.mjs';
import {stagePrivateQaFiniteOriginalAlarmHandoff} from '../../lib/mcp-qa-finite-alarm-handoff.mjs';

export async function stageAlarmFixture(f,options){
 const initialC0=f.plan.R1+60000,initialC1=initialC0+180000,sha=n=>String(n).repeat(64);
 const source={prepId:sha(1),capsuleHash:sha(2),initialPlanHash:sha(3),initialStateHash:sha(4),enrollmentHash:sha(5),
  setupReceiptHash:sha(6),selectionHash:sha(7),cleanupScopeHash:sha(8),initialC0,initialC1};
 const originalState=seal('State',{planHash:source.initialPlanHash,deliveries:0,status:'pending',nextAt:initialC0,previousHash:null});
 source.initialStateHash=originalState.recordHash;
 const control=readPrivateQaFiniteControlIdentity({nativePin:options.nativePin,raw:options.plan});
 const c={capsuleHash:source.capsuleHash,preconnectionId:source.prepId,qaVersionId:f.plan.deployments.qaLive.versionId,sourceRevision:f.plan.source.revision};
 const prefix='afw.finite-initial-cleanup.v1:',enroll='afw.finite-preparation-cleanup.v1:',select='source-selection:'+f.plan.source.revision+':';
 const stable={
  'afw.finite-initial-preparation.v1:capsule':c,
  [prefix+'plan']:{recordHash:source.initialPlanHash,C0:initialC0,C1:initialC1,
   baselineVersionId:QA_CLOUD_CLOSED_PINS.canary.id,baselineDeploymentId:QA_CLOUD_CLOSED_PINS.canary.deploymentId},
  [prefix+'state']:originalState,
  [enroll+'enrollment']:{recordHash:source.enrollmentHash,capsuleHash:source.capsuleHash,planHash:source.initialPlanHash,preconnectionId:source.prepId},
  [enroll+'ack']:{enrollmentHash:source.enrollmentHash,stateHash:source.initialStateHash,alarmAt:initialC0},
  ['afw.finite-preparation-cleanup-scope.v1:'+source.prepId]:{scopeHash:source.cleanupScopeHash,prepId:source.prepId,sourceRevision:f.plan.source.revision},
  [select+'publication:'+source.selectionHash]:{selectionHash:source.selectionHash},
  ['afw.qa-finite-policy-setup.v1:'+f.plan.intentId+':context']:{selectionHash:source.selectionHash,intentId:f.plan.intentId,sourceRevision:f.plan.source.revision,C0:f.plan.C0,C1:f.plan.C1},
 };
 const refs={intentId:f.plan.intentId,sourceRevision:f.plan.source.revision};
 const identity={kind:'policy',...refs,setupInstanceId:finitePrivateQaSetupInstanceId(refs),effect:'activation'};
 stable['afw.finite-policy-effect.v1:'+hashFinitePolicyEffectIdentity(identity)+':receipt']={
  receiptHash:source.setupReceiptHash,...refs,qaVersionId:f.plan.deployments.qaLive.versionId,
 };
 for(const [key,data] of Object.entries(stable))f.rows.set(key,JSON.stringify(data));
 f.rows.set(prefix+'state',encode('State',originalState));
 f.rows.set(select+'head',source.selectionHash);
 await f.storage.transaction(tx=>tx.setAlarm(initialC0));
 const token=await stagePrivateQaFiniteOriginalAlarmHandoff({storage:f.storage,control,source,check:f.now});
 return {initialC0,initialC1,token,control,source};
}

export function useNativeAlarmIntent(f){
 const {canary}=QA_CLOUD_CLOSED_PINS;
 f.plan.deployments.canaryClosed={versionId:canary.id,deploymentId:canary.deploymentId,
  configurationHash:canary.configurationHash,module:canary.module};
 f.plan.intentId='e'.repeat(64);
 f.plan.workflows.launcher=finiteLauncherInstanceId({intentId:f.plan.intentId,sourceRevision:f.plan.source.revision});
 f.plan.closePolicyHash=finiteCleanupPolicyHash(f.plan);
 return f;
}
