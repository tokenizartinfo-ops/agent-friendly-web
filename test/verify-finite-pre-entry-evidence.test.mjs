import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import historical from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS as pins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {createQaPreEntryCustodyContext} from '../lib/mcp-qa-finite-pre-entry-context.mjs';
import {verifyFinitePreEntryEvidence} from '../scripts/verify-finite-pre-entry-evidence.mjs';

const repo={id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'};
const owner={id:290715446,login:'tokenizartinfo-ops',type:'User'};
const sourceRevision='a'.repeat(40),sourceTree='b'.repeat(40),zip='c'.repeat(64),wrapper='d'.repeat(64);
const candidate='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',restored='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const staged='cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const start=Date.parse('2026-11-25T15:30:40Z'),stamp=offset=>new Date(start+offset).toISOString();
const digest=text=>createHash('sha256').update(text).digest('hex');
const role={status:'active',expiresAt:stamp(3600000),notBefore:null};
const context=createQaPreEntryCustodyContext({sourceRevision,releaseZipSha256:zip,startAt:start,expiresAt:start+300000});

function fixture(){
 const pre={purpose:'afw.finite-package-pre-entry.v1',sourceRevision,sourceTree,releaseZipSha256:zip,
  qaCandidateModuleSha256:'e'.repeat(64),qaCustodyProbeTemplateSha256:wrapper,coldCustodyAssemblySha256:'f'.repeat(64),
  rollbackArchiveSha256:historical.archiveSha256,rollbackReceiptSha256:historical.receiptSha256,
  qaRollbackVersionId:pins.qaClosed.id,qaRollbackModuleSha256:pins.qaClosed.module.sha256};
 const comment={id:303,author_association:'OWNER',user:owner,issue_url:'https://api.github.com/repos/'+repo.full_name+'/issues/497',
  created_at:stamp(0),updated_at:stamp(0),body:'/afw-qa-pre-entry-custody v1 '+sourceRevision+' '+zip+' '+wrapper};
 const intentId=digest(['afw.qa-pre-entry-custody-command.v1',repo.id,comment.id,sourceRevision,start,zip,wrapper].join('\n'));
 const run=(id,event,path,created,updated)=>({id,event,path:'.github/workflows/'+path,created_at:stamp(created),updated_at:stamp(updated),
  repository:repo,head_repository:repo,head_branch:'main',head_sha:sourceRevision,run_attempt:1,status:'completed',conclusion:'success',actor:owner,triggering_actor:owner});
 const receipt={purpose:'afw.qa-pre-entry-custody.v3',status:'observed',observationId:context.id,sourceRevision,
  releaseZipSha256:zip,qaVersionId:candidate,observedAt:start+101000,reader:{...role},publisher:{...role},
  guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false};
 const deployments=Object.fromEntries(Object.entries({qa:pins.qaClosed,canary:pins.canary,operator:pins.operator}).map(([name,pin])=>
  [name,{versionId:pin.id,deploymentId:name==='qa'?restored:pin.deploymentId}]));
 const profiles=Object.fromEntries(Object.entries({qa:pins.qaClosed,canary:pins.canary,operator:pins.operator}).map(([name,pin])=>
  [name,{versionId:pin.id,moduleHash:pin.module.sha256,configurationHash:pin.configurationHash,bindingCount:pin.bindingCount,closedFlagCount:pin.flagCount}]));
 return {
  source:{sha:sourceRevision,tree:{sha:sourceTree}},
  draftRun:run(301,'workflow_dispatch','afw-private-backup-package-input.yml',-100000,-1000),
  custodyRun:run(302,'issue_comment','afw-qa-closed-custody-observation.yml',3000,118000),
  comment,
  draft:{purpose:'afw.finite-native-private-draft.v1',sourceRevision,sourceTree,completePackage:false,operationalReadiness:false,
   historicalArchiveSha256:historical.archiveSha256,releaseLayout:{archiveSha256:zip,moduleCount:5,completePackage:false,operationalReadiness:false},
   rollbackProfiles:{qaClosed:profiles.qa},preEntry:{...pre,qualificationHash:digest(JSON.stringify(pre)),status:'pending_native_qualification',authorizesDeployment:false}},
  custody:{purpose:'afw.qa-cloud-closed-custody-observation.v1',status:'verified',stage:'complete',cleanupFailureStage:null,
   observedAt:stamp(117000),intentId,
   sourceRevision,releaseZipSha256:zip,artifactBaseVersionId:pins.qaClosed.id,artifactModuleHash:pins.qaClosed.module.sha256,
   commentId:'303',runId:'302',candidateVersionId:candidate,activationDeploymentId:staged,restorationDeploymentId:restored,
   candidateObserved:true,restorationAcknowledged:true,finalClosedVerified:true,nativeCustodyObservationVerified:true,
   providerChecked:true,claimAcknowledged:true,externalStartReady:true,externalInstanceObserved:true,forcedCredentialRestoration:true,
   uncertain:false,conflict:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false,workflowCleanupFailure:false,
   posts:{upload:1,activate:1,restore:1,createWorkflow:0,terminateWorkflow:0},
   outcomes:{upload:'acknowledged',activate:'acknowledged',restore:'acknowledged',createWorkflow:'not_sent',terminateWorkflow:'not_sent'},
   credentialPreflight:{reader:{httpStatus:200,verified:true},publisher:{httpStatus:200,verified:true}},
   workflowInstanceId:'afw-qa-custody-'+context.id,workflowStatus:'complete',nativeResult:structuredClone(receipt),
   finalReadback:{purpose:'afw.own-closed-readback.v1',status:'closed',observedAt:stamp(116000),profiles,deployments,
    allOwnWorkflowsTerminal:true,ownNamespacesPreserved:true,ownContainerEmpty:true,qaExposureDisabled:true,cronAndTailsEmpty:true,
    readOnly:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false}},
  primary:{instanceId:'afw-qa-custody-'+context.id,params:JSON.stringify({operation:'inspect_pre_entry_custody',observationId:context.id}),
   queued:stamp(98000),start:stamp(100000),end:stamp(102000),success:true,status:'complete',step_count:1,
   steps:[{name:'inspect-pre-entry-custody-1',success:true}],output:receipt},
  restoration:{id:restored,created_on:stamp(110000).replace('.000Z','.000123Z'),strategy:'percentage',
   annotations:{'workers/message':'AFW closed QA restoration '+intentId},versions:[{version_id:pins.qaClosed.id,percentage:100}]},
 };
}

test('links an exact R2 draft to the primary receipt and the restored QA deployment',()=>{
 const result=verifyFinitePreEntryEvidence(fixture());
 assert.equal(result.status,'matched');
 assert.equal(result.releaseZipSha256,zip);
 assert.equal(result.qaRestorationDeploymentId,restored);
 assert.equal(result.observationId,context.id);
 assert.equal(result.completePackage,false);
 assert.equal(result.authorizesDeployment,false);
 assert.equal(result.operationalReadiness,false);
});

for(const [label,change] of [
 ['an unrelated ZIP receipt',x=>{x.primary.output.releaseZipSha256='1'.repeat(64);}],
 ['a changed wrapper commitment',x=>{x.draft.preEntry.qaCustodyProbeTemplateSha256='1'.repeat(64);}],
 ['a different R2 rollback archive',x=>{x.draft.historicalArchiveSha256='1'.repeat(64);}],
 ['a different observation embedded in the CI artifact',x=>{x.custody.nativeResult.reader.expiresAt=stamp(7200000);}],
 ['a changed source tree',x=>{x.source.tree.sha='1'.repeat(40);}],
 ['a failed or retried run',x=>{x.custodyRun.run_attempt=2;}],
 ['an unrelated command',x=>{x.comment.id++;}],
 ['an older Workflow response',x=>{x.primary.step_count=0;}],
 ['a mismatched candidate',x=>{x.custody.candidateVersionId=pins.qaClosed.id;}],
 ['a rollback to an alternate deployment',x=>{x.custody.finalReadback.deployments.qa.deploymentId=staged;}],
 ['a primary rollback that contains the candidate',x=>{x.restoration.versions[0].version_id=candidate;}],
 ['a primary rollback that postdates closed verification',x=>{x.restoration.created_on=stamp(116001);}],
 ['an inaccurate rollback module hash',x=>{x.custody.finalReadback.profiles.qa.moduleHash='a'.repeat(64);}],
 ['an unfinished Workflow',x=>{x.custody.finalReadback.allOwnWorkflowsTerminal=false;}],
 ['a rollback beyond the original deadline',x=>{x.custody.finalReadback.observedAt=stamp(480000);}],
 ['a launched state disguised as a draft',x=>{x.draft.completePackage=true;}],
])test('rejects '+label,()=>{
 const input=fixture();
 change(input);
 assert.throws(()=>verifyFinitePreEntryEvidence(input),/Pre-entry evidence unavailable/);
});
