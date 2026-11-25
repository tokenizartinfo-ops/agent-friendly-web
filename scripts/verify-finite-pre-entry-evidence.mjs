import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time} from '../lib/mcp-finite-evidence.mjs';
import {QA_CLOUD_CLOSED_PINS as pins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {inspectQaPreEntryCustodyCommand} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {createQaPreEntryCustodyContext,validateQaPreEntryCustodyReceipt} from '../lib/mcp-qa-finite-pre-entry-context.mjs';
import historical from './mcp-finite-r2-historical-inputs.json' with {type:'json'};

const repository='tokenizartinfo-ops/agent-friendly-web',repoId=1347578006;
const fail=()=>{throw Error('Pre-entry evidence unavailable');};
const requireState=(actual,expected)=>{
 if(!actual||Object.entries(expected).some(([key,value])=>{
  const descriptor=Object.getOwnPropertyDescriptor(actual,key);
  return !descriptor?.enumerable||!Object.hasOwn(descriptor,'value')||descriptor.value!==value;
 }))fail();
};
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value);
function timestamp(value){
 if(typeof value!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(value))fail();
 const at=Date.parse(value);
 const canonical=value.length===20?value.slice(0,-1)+'.000Z':value;
 if(!time(at)||new Date(at).toISOString()!==canonical)fail();
 return at;
}

function verifyRun(run,event,workflow,sourceRevision){
 requireState(run,{event,path:'.github/workflows/'+workflow,head_branch:'main',head_sha:sourceRevision,
  run_attempt:1,status:'completed',conclusion:'success'});
 for(const repo of [run.repository,run.head_repository])requireState(repo,{id:repoId,full_name:repository});
 for(const actor of [run.actor,run.triggering_actor])requireState(actor,{id:290715446,login:'tokenizartinfo-ops',type:'User'});
 const start=timestamp(run.created_at),end=timestamp(run.updated_at);
 if(!Number.isSafeInteger(run.id)||run.id<1||start>end)fail();
 return {start,end};
}

function verifyDraft(draft,source){
 const sourceRevision=source?.sha,sourceTree=source?.tree?.sha;
 if(!hex(sourceRevision,40)||!hex(sourceTree,40))fail();
 requireState(draft,{purpose:'afw.finite-native-private-draft.v1',sourceRevision,sourceTree,completePackage:false,
  operationalReadiness:false,historicalArchiveSha256:historical.archiveSha256});
 const {status,authorizesDeployment,qualificationHash,...pre}=fields(draft.preEntry,[
  'status','authorizesDeployment','qualificationHash','purpose','sourceRevision','sourceTree','releaseZipSha256',
  'qaCandidateModuleSha256','qaCustodyProbeTemplateSha256','coldCustodyAssemblySha256','rollbackArchiveSha256','rollbackReceiptSha256',
  'qaRollbackVersionId','qaRollbackModuleSha256'
 ]);
 const qa=pins.qaClosed;
 requireState(pre,{purpose:'afw.finite-package-pre-entry.v1',sourceRevision,sourceTree,rollbackArchiveSha256:historical.archiveSha256,
  rollbackReceiptSha256:historical.receiptSha256,qaRollbackVersionId:qa.id,qaRollbackModuleSha256:qa.module.sha256});
 if(status!=='pending_native_qualification'||authorizesDeployment!==false||qualificationHash!==hash(pre)||
    ![pre.releaseZipSha256,pre.qaCandidateModuleSha256,pre.qaCustodyProbeTemplateSha256,pre.coldCustodyAssemblySha256].every(value=>hex(value)))fail();
 requireState(draft.releaseLayout,{archiveSha256:pre.releaseZipSha256,moduleCount:5,completePackage:false,operationalReadiness:false});
 requireState(draft.rollbackProfiles?.qaClosed,{versionId:qa.id,moduleHash:qa.module.sha256,configurationHash:qa.configurationHash});
 return pre;
}

function verifyRestoration(readback,deploymentId){
 requireState(readback,{purpose:'afw.own-closed-readback.v1',status:'closed',readOnly:true,allOwnWorkflowsTerminal:true,
  ownNamespacesPreserved:true,ownContainerEmpty:true,qaExposureDisabled:true,cronAndTailsEmpty:true,authorizesEffects:false,
  guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
 for(const [role,pin] of Object.entries({qa:pins.qaClosed,canary:pins.canary,operator:pins.operator})){
  requireState(readback.deployments?.[role],{versionId:pin.id,deploymentId:role==='qa'?deploymentId:pin.deploymentId});
  requireState(readback.profiles?.[role],{versionId:pin.id,moduleHash:pin.module.sha256,configurationHash:pin.configurationHash,
   bindingCount:pin.bindingCount,closedFlagCount:pin.flagCount});
 }
 return timestamp(readback.observedAt);
}

/** Compare archived evidence from GitHub and Cloudflare. Caller is responsible
 * for retrieving the records from their primary APIs. No authorization. */
export function verifyFinitePreEntryEvidence(input){
 try{
  const {source,draftRun,custodyRun,comment,draft,custody,primary}=fields(input,
   ['source','draftRun','custodyRun','comment','draft','custody','primary']);
  const pre=verifyDraft(draft,source),{sourceRevision,sourceTree,releaseZipSha256}=pre;
  const draftTiming=verifyRun(draftRun,'workflow_dispatch','afw-private-backup-package-input.yml',sourceRevision);
  const runTiming=verifyRun(custodyRun,'issue_comment','afw-qa-closed-custody-observation.yml',sourceRevision);
  requireState(comment,{issue_url:'https://api.github.com/repos/'+repository+'/issues/497',updated_at:comment.created_at});
  const command=inspectQaPreEntryCustodyCommand({event:{action:'created',repository:custodyRun.repository,issue:{number:497},
   comment,sender:custodyRun.actor},context:{repository,repositoryId:String(repoId),ref:'refs/heads/main',eventName:'issue_comment',
   runId:String(custodyRun.id),runAttempt:'1',sourceRevision},now:()=>runTiming.start});
  if(draftRun.id===custodyRun.id||draftTiming.end>command.createdAt||command.releaseZipSha256!==releaseZipSha256||
     command.wrapperSha256!==pre.qaCustodyProbeTemplateSha256)fail();
  const context=createQaPreEntryCustodyContext({sourceRevision,releaseZipSha256,startAt:command.createdAt,expiresAt:command.expiresAt});
  const instanceId='afw-qa-custody-'+context.id;
  requireState(primary,{instanceId,status:'complete',success:true,step_count:1});
  const params=fields(JSON.parse(primary.params),['operation','observationId']);
  requireState(params,{operation:'inspect_pre_entry_custody',observationId:context.id});
  if(!Array.isArray(primary.steps)||primary.steps.length!==1)fail();
  requireState(primary.steps[0],{name:'inspect-pre-entry-custody-1',success:true});
  const queued=timestamp(primary.queued),started=timestamp(primary.start),ended=timestamp(primary.end);
  if(queued<runTiming.start||started<queued||ended<started||ended>=command.expiresAt)fail();
  requireState(custody,{purpose:'afw.qa-cloud-closed-custody-observation.v1',status:'verified',stage:'complete',cleanupFailureStage:null,
   sourceRevision,releaseZipSha256,intentId:command.intentId,commentId:command.commentId,runId:command.runId,
   artifactBaseVersionId:pre.qaRollbackVersionId,artifactModuleHash:pre.qaRollbackModuleSha256,workflowInstanceId:instanceId,
   workflowStatus:'complete',candidateObserved:true,restorationAcknowledged:true,finalClosedVerified:true,nativeCustodyObservationVerified:true,
   providerChecked:true,claimAcknowledged:true,externalStartReady:true,externalInstanceObserved:true,forcedCredentialRestoration:true,
   uncertain:false,conflict:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false,workflowCleanupFailure:false});
  requireState(custody.posts,{upload:1,activate:1,restore:1,createWorkflow:0,terminateWorkflow:0});
  requireState(custody.outcomes,{upload:'acknowledged',activate:'acknowledged',restore:'acknowledged',createWorkflow:'not_sent',terminateWorkflow:'not_sent'});
  for(const role of ['reader','publisher'])requireState(custody.credentialPreflight?.[role],{httpStatus:200,verified:true});
  const {candidateVersionId,activationDeploymentId,restorationDeploymentId}=custody;
  if(![candidateVersionId,activationDeploymentId,restorationDeploymentId].every(uuid)||
     candidateVersionId===pre.qaRollbackVersionId||activationDeploymentId===restorationDeploymentId)fail();
  const validate=output=>validateQaPreEntryCustodyReceipt({output,context,qaVersionId:candidateVersionId,observedFrom:started,readAt:ended});
  const receipt=validate(primary.output);
  if(hash(receipt)!==hash(validate(custody.nativeResult)))fail();
  const restoredAt=verifyRestoration(custody.finalReadback,restorationDeploymentId),observedAt=timestamp(custody.observedAt);
  // GitHub run timestamps have second resolution. The original recovery clock does not.
  if(restoredAt<ended||observedAt<restoredAt||observedAt>=command.cleanupExpiresAt||observedAt>=runTiming.end+1000)fail();
  return Object.freeze({purpose:'afw.finite-pre-entry-evidence.v1',status:'matched',sourceRevision,sourceTree,releaseZipSha256,
   rollbackArchiveSha256:pre.rollbackArchiveSha256,rollbackReceiptSha256:pre.rollbackReceiptSha256,
   draftRunId:draftRun.id,custodyRunId:custodyRun.id,commandId:comment.id,observationId:context.id,candidateVersionId,
   qaRestorationDeploymentId:restorationDeploymentId,observedAt:new Date(receipt.observedAt).toISOString(),
   restoredAt:new Date(restoredAt).toISOString(),completePackage:false,authorizesDeployment:false,operationalReadiness:false});
 }catch{fail();}
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==2)fail();
  const chunks=[];
  let size=0;
  for await(const chunk of process.stdin){
   if((size+=chunk.length)>262144)fail();
   chunks.push(chunk);
  }
  const input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));
  process.stdout.write(JSON.stringify(verifyFinitePreEntryEvidence(input))+'\n');
 }catch{
  process.stderr.write('Pre-entry evidence unavailable\n');
  process.exitCode=1;
 }
}
