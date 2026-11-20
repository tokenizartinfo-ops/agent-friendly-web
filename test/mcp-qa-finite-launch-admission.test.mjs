import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
const admissionApi=await import('../lib/mcp-qa-finite-launch-admission.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-launch-admission.mjs'))throw error;return {};
});
function setup(){
 const f=finiteFixture(),p=f.plan;
 const native=controls.createPrivateQaFiniteTrialNativePin({ctx:f.ctx,env:f.env,sourceRevision:p.source.revision});
 const {plan,planHash,controlHash,selectorsHash}=controls.readPrivateQaFiniteControlIdentity({nativePin:native,raw:JSON.stringify(p)});
 const control={plan,planHash,controlHash},observedAt=f.now(),checkEvidence='a'.repeat(64);
 const state={observedAt,controlHash,intentId:p.intentId,status:'verified',evidenceHash:checkEvidence,expiresAt:p.C0,
  authorizesEffects:false,operationalReadiness:false};
 const isolation={observedAt,containerId:p.resources.containerId,sourceRevision:p.canaryContainment.sourceRevision,
  runtimeVersionId:p.deployments.canaryLive.versionId,eventPlanHash:p.eventPlanHash,pristine:true};
 const inventory={kind:'never_issued',intentId:p.intentId,controlHash,finitePlanHash:planHash,sourceRevision:p.source.revision,
  qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,
  phase:'arm',inventoryHash:'1'.repeat(64),controlSnapshotHash:'2'.repeat(64),journalSnapshotHash:'3'.repeat(64),observedAt,
  authorizesEffects:false,operationalReadiness:false};
 const permission={valid:true,grantHash:p.grantHash,monitorHash:p.monitorHash,expiresAt:p.selectors.expiresAt};
 return {control,selectorsHash,inventory,preflight:state,admission:{...state,permission},
  isolation,channel:{verified:true,challenge:Buffer.alloc(32,4).toString('base64url')},now:f.now};
}
test('QA arm projects only matching fresh native launch facts and proven receiver scope',()=>{
 assert.equal(typeof admissionApi.projectFiniteLaunchAdmission,'function');
 const evidence=setup(),out=admissionApi.projectFiniteLaunchAdmission(evidence);
 assert.equal(out.purpose,'afw.qa-finite-primary.v1');assert.equal(out.containment.enteredWritersIsolated,true);
 assert.equal(out.quiescence.currentWriters,0);assert.equal(out.quiescence.completeInventory,true);
 assert.equal(out.consent.valid,true);assert.equal(out.controlHash,undefined);
});
test('QA arm rejects incomplete native facts, an old inventory or an unverified signature',()=>{
 assert.equal(typeof admissionApi.projectFiniteLaunchAdmission,'function');
 const x=setup();
 for(const patch of [
  {inventory:{...x.inventory,kind:'issued'}},
  {inventory:{...x.inventory,observedAt:x.now()-5001}},
  {admission:{...x.admission,permission:{...x.admission.permission,valid:false}}},
  {isolation:{...x.isolation,pristine:false}},
  {channel:{verified:false}},
 ])assert.throws(()=>admissionApi.projectFiniteLaunchAdmission({...x,...patch}));
});

test('launch evidence rejects a predecessor that is not the original named actor before accessing provider or owner state',async()=>{
 const {control}=setup(),p=control.plan;
 const predecessor={containerId:'4'.repeat(64),applicationId:p.resources.applicationId,programHash:'5'.repeat(64),sourceRevision:'6'.repeat(40)};
 const names=[];
 const node={get(){assert.fail('actor accessed before verifying the original name');},idFromName(name){
  names.push(name);
  return {toString:()=>name==='afw-own-event-first-successor-v1'?p.resources.containerId:'3'.repeat(64)};
 }};
 const env={AFW_RELEASE_EVENTS_NODE:node};
 Object.defineProperty(env,'RELEASE_DB',{get(){assert.fail('D1 read started before verifying the original actor');}});
 await assert.rejects(admissionApi.readFiniteQaLaunchEvidence({
  ctx:{},env,control,predecessor,readPermission:()=>assert.fail('owner read started before verifying the original actor'),
 }),{message:'Finite QA launch admission unavailable'});
 assert.deepEqual(names,['afw-own-event-first-successor-v1','afw-own-event-one-occurrence-v1']);
});
