import assert from 'node:assert/strict';
import test from 'node:test';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {buildPrivateQaFiniteSharedPlan} from '../lib/mcp-qa-finite-shared-plan.mjs';
import {readFiniteDeploymentPair} from '../lib/mcp-qa-finite-plan-roles.mjs';
import {readPrivateQaFinitePlan} from '../lib/mcp-qa-finite-trial-control.mjs';

function fixture(){
 const {plan:p}=finiteFixture();
 const source={revision:p.source.revision,tree:p.source.tree,profileHash:p.source.profileHash,bindingsHash:p.source.bindingsHash};
 const {qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed}=p.deployments,receipt={
  intentId:p.intentId,sourceRevision:source.revision,qaVersionId:qaLive.versionId,seedHash:'1'.repeat(64),
  versionId:canaryLive.versionId,deploymentId:canaryLive.deploymentId,moduleHash:canaryLive.module.sha256,
  restorationHash:canaryLive.configurationHash,
 };
 const original={T0:p.T0,C0:p.C0,C1:p.C1,permissionExpiresAt:p.R1+30001,selectors:p.selectors,
  grantHash:p.grantHash,monitorHash:p.monitorHash,eventPlanHash:p.eventPlanHash,withdrawalPolicyHash:p.withdrawalPolicyHash,
  legacy:p.legacy,rollback:{versionId:canaryClosed.versionId,deploymentId:canaryClosed.deploymentId,
   configurationHash:canaryClosed.configurationHash,module:canaryClosed.module}};
 const record={bundleHash:p.bundleHash,artifact:{sourceRevision:source.revision,sourceTree:source.tree,programHash:p.selectors.programHash,
  workerHash:receipt.moduleHash},policy:{plan:{trialId:p.trialId}}};
 const material={
  seedHash:receipt.seedHash,primaryEvidence:{T0:p.T0,N1:p.N1,R1:p.R1,sourceTree:source.tree,runId:p.finalizer.runId,jobId:p.finalizer.jobId,seedStepCompletedAt:p.T0+10},
  seed:{repository:p.command.repository,commandId:p.command.id,intentId:p.intentId,sourceRevision:source.revision,
   finalizer:{runId:p.finalizer.runId,jobId:p.finalizer.jobId,attempt:1},manifest:{sourceRevision:source.revision,sourceTree:source.tree,
    modules:{qaLive:{module:qaLive.module,publicStatic:{profileHash:source.profileHash,bindingsHash:source.bindingsHash}},canaryLive:{module:canaryLive.module,publicStatic:{profileHash:p.canaryContainment.profileHash,bindingsHash:p.canaryContainment.bindingsHash}}}},
   qaPublication:{qaLive,qaClosed}},
 };
 const roles={deployments:{qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed},resources:p.resources};
 return {p,input:{material,roles,installed:{receipt,record,original},trialId:p.trialId}};
}
test('observer and launcher can reconstruct byte-identical plan from the same installed notice',()=>{
 const {p,input}=fixture();
 const a=buildPrivateQaFiniteSharedPlan(input),b=buildPrivateQaFiniteSharedPlan(structuredClone(input)),decoded=readPrivateQaFinitePlan(a.planRaw);
 assert.deepEqual(a,b);assert.equal(a.planHash,decoded.planHash);assert.equal(decoded.plan.command.id,p.command.id);
 assert.equal(decoded.plan.workflows.confirmation,'afw-release-'+p.bundleHash);
 assert.equal(decoded.plan.workflows.launcher,p.workflows.launcher);
 assert.equal(decoded.plan.finalizer.jobId,p.finalizer.jobId);
 assert.deepEqual(decoded.plan.deployments.canaryClosed,p.deployments.canaryClosed);
});
test('shared plan denies drift in seed, role pins, original time, and trial identity',()=>{
 for(const mutate of [
  x=>x.material.seedHash='a'.repeat(64),
  x=>x.material.primaryEvidence.T0++,
  x=>x.roles.deployments.canaryLive.configurationHash='b'.repeat(64),
  x=>x.roles.deployments.qaLive.deploymentId='00000000-0000-4000-8000-000000000001',
  x=>x.trialId='c'.repeat(64),
 ]){const x=structuredClone(fixture().input);mutate(x);assert.throws(()=>buildPrivateQaFiniteSharedPlan(x));}
});
const id=n=>'00000000-0000-4000-8000-'+String(n).padStart(12,'0');
const version=at=>({id:id(at),created_on:new Date(at*1000).toISOString(),strategy:'percentage',
 versions:[{version_id:id(at+10),percentage:100}]});
test('QA rollback uses the immediate sole-version predecessor of the original deployment',()=>{
 const current=version(3),previous=version(2),older=version(1),result={deployments:[current,previous,older]};
 assert.deepEqual(readFiniteDeploymentPair(result,{deploymentId:current.id,versionId:id(13),previousVersionId:id(12),now:5000}),
  {current:{deploymentId:current.id,versionId:id(13),createdAt:3000},previous:{deploymentId:previous.id,versionId:id(12),createdAt:2000}});
 for(const entries of [[current,older,previous],[current,{...previous,created_on:current.created_on},older],
  [current,{...previous,versions:[{version_id:id(12),percentage:90},{version_id:id(11),percentage:10}]},older],
  [current,previous,{...older,created_on:previous.created_on}],[current,older],[version(4),current,previous]]){
  assert.throws(()=>readFiniteDeploymentPair({deployments:entries},{deploymentId:current.id,versionId:id(13),previousVersionId:id(12),now:5000}));
 }
});
