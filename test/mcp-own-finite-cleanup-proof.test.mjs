import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {finiteFixture,digest} from './fixtures/qa-finite-trial.mjs';
const api=await import('../lib/mcp-own-finite-cleanup-proof.mjs').catch(()=>({}));
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
function fixture(){
 const f=finiteFixture(),p=f.plan,c={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
 const identity={intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,T0:p.T0,N1:p.N1,C1:p.C1};
 const identityHash=hash({purpose:'afw.own-finite-admission.v1',identity}),seal={purpose:'afw.own-finite-admission.v1:seal',identityHash,sealedAt:p.C0};
 const gate={status:'observed',identity,identityHash,sealed:true,seal,sealHash:hash(seal),writers:{reservation:null,admission:null,launch:null},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
 const primary={purpose:'afw.finite-primary-snapshot.v1',intentId:p.intentId,controlHash:c.controlHash,observedAt:p.C0+1,reservationHash:null,admissionHash:null,launchHash:null,closureHash:null,processGeneration:null};
 const provider=at=>({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:at,instances:[],totalCount:0});
 const support={gate,primary,providerBefore:provider(p.C0),providerAfter:provider(p.C0+2)};
 const proof={purpose:'afw.finite-trial-cleanup-proof.v1',kind:'sealed_without_admission',intentId:p.intentId,planHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sealHash:gate.sealHash,proofChallenge:'2'.repeat(64),observedAt:p.C0+3,evidenceHash:hash(support),sealedAt:p.C0,admissionClosed:true,launchNeverIssued:true,primaryWriterSetHash:hash(gate.writers),primaryWriterTerminal:true,primarySnapshotHash:hash(primary),providerAbsenceHash:hash([support.providerBefore,support.providerAfter])};
 return {control:c,proof,support,expectedChallenge:proof.proofChallenge,now:()=>p.C0+3};
}
test('strict finite proof validator is available',()=>assert.equal(typeof api.validatePrivateQaFiniteCleanupProof,'function'));
test('sealed no-admission proof is distinct and contains no physical-stop assertion',()=>{
 const f=fixture(),v=api.validatePrivateQaFiniteCleanupProof(f);assert.equal(v.kind,'sealed_without_admission');assert.equal(Object.hasOwn(v,'physicalStopVerified'),false);
});
for(const mode of ['unresolved','launch','provider','source','challenge','tamper','extra']){
 test('finite proof blocks '+mode,()=>{
  const f=fixture();
  if(mode==='unresolved')f.support.gate.unresolvedWriters=1;
  if(mode==='launch')f.support.gate.launchNeverIssued=false;
  if(mode==='provider')f.support.providerAfter.totalCount=1;
  if(mode==='source')f.proof.runtimeVersionId=f.control.plan.deployments.qaLive.versionId;
  if(mode==='challenge')f.expectedChallenge='9'.repeat(64);
  if(mode==='tamper')f.proof.evidenceHash='8'.repeat(64);
  if(mode==='extra')f.proof.physicalStopVerified=true;
  assert.throws(()=>api.validatePrivateQaFiniteCleanupProof(f));
 });
}
