import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteHash as hash,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
import {validateFiniteMaterialPreview,validateFiniteQaClaim,finiteObserverInstanceId} from './mcp-qa-finite-observer.mjs';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
const fail=()=>{throw Error('Finite finalizer evidence unavailable');};
export const FINITE_REPOSITORY='tokenizartinfo-ops/agent-friendly-web';
export const FINITE_QA='agent-friendly-web-independent-closure-qa';
export const FINITE_ACCOUNT='85d0d5dadac3341a564f22ce885e9eec';
export const finiteUuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
export function validateFiniteExternalPlan(value){
 const p=fields(data(value),['purpose','preview','commandId','source','resources','deployments','canaryContainment','proofIdentity','workflows','finalizer','custody']);
 const v=validateFiniteMaterialPreview(p.preview);
 if(p.purpose!=='afw.finite-finalizer-plan.v1'||!(/^[1-9][0-9]{0,19}$/).test(p.commandId))fail();
 fields(p.source,['revision','tree','moduleHash','profileHash','bindingsHash']);
 if(p.source.revision!==v.sourceRevision||!hex(p.source.tree,40)||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(p.source[k])))fail();
 fields(p.resources,['actorId','containerId','applicationId','namespaceId','qaD1Id','releaseD1Id','canaryActorId']);
 if(p.resources.actorId!==v.actorId||['containerId','canaryActorId'].some(k=>!hex(p.resources[k]))||p.resources.applicationId!=='d6fc71552de7494a863aca20365a572d'||!hex(p.resources.namespaceId,32)||!finiteUuid(p.resources.qaD1Id)||!finiteUuid(p.resources.releaseD1Id)||p.resources.qaD1Id===p.resources.releaseD1Id)fail();
 // The reference originates in the SAME native canonical control computation.
 const resourceHash=hashResource(p.resources);if(resourceHash!==v.resourceHash)fail();
 fields(p.deployments,['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed']);
 for(const pin of Object.values(p.deployments)){fields(pin,['versionId','deploymentId','configurationHash','module']);validateFiniteModule(pin.module);if(!finiteUuid(pin.versionId)||!finiteUuid(pin.deploymentId)||!hex(pin.configurationHash))fail();}
 if(p.deployments.qaLive.versionId!==v.runtimeVersionId||p.deployments.qaLive.module.sha256!==p.source.moduleHash||p.deployments.qaLive.versionId===p.deployments.qaClosed.versionId||p.deployments.canaryLive.versionId===p.deployments.canaryClosed.versionId)fail();
 fields(p.canaryContainment,['sourceRevision','runtimeVersionId','moduleHash','profileHash','bindingsHash']);
 if(!hex(p.canaryContainment.sourceRevision,40)||p.canaryContainment.runtimeVersionId!==p.deployments.canaryLive.versionId||p.canaryContainment.moduleHash!==p.deployments.canaryLive.module.sha256||['moduleHash','profileHash','bindingsHash'].some(k=>!hex(p.canaryContainment[k])))fail();
 fields(p.proofIdentity,['trialId','grantHash','programHash','programSourceRevision']);if(['trialId','grantHash','programHash'].some(k=>!hex(p.proofIdentity[k]))||!hex(p.proofIdentity.programSourceRevision,40))fail();
 fields(p.workflows,['confirmation','bootstrap']);
 if(!/^afw-release-[a-f0-9]{64}$/.test(p.workflows.confirmation)||p.workflows.bootstrap!==finiteObserverInstanceId({intentId:v.intentId,sourceRevision:v.sourceRevision}))fail();
 fields(p.finalizer,['repository','runId','attempt','jobId','workflow','sourceRevision','readyStep']);
 if(p.finalizer.repository!==FINITE_REPOSITORY||p.finalizer.workflow!=='afw-finite-finalizer'||p.finalizer.sourceRevision!==v.sourceRevision||p.finalizer.attempt!==1||p.finalizer.readyStep!=='admit-and-ready'||!Number.isSafeInteger(p.finalizer.runId)||p.finalizer.runId<1||!Number.isSafeInteger(p.finalizer.jobId)||p.finalizer.jobId<1)fail();
 fields(p.custody,['id','expiresAt','policyHash','permissionGroupIds']);
 if(!hex(p.custody.id,32)||!time(p.custody.expiresAt)||p.custody.expiresAt<v.R1||!hex(p.custody.policyHash)||!Array.isArray(p.custody.permissionGroupIds)||p.custody.permissionGroupIds.length<1||p.custody.permissionGroupIds.length>16||p.custody.permissionGroupIds.some(x=>!hex(x,32))||new Set(p.custody.permissionGroupIds).size!==p.custody.permissionGroupIds.length)fail();
 return p;
}
import {createHash} from 'node:crypto';
function hashResource(value){return createHash('sha256').update('afw.qa-finite-resources.v1\n'+JSON.stringify(value)).digest('hex');}
/** Native-only extraction: no raw selectors, consent, callback or legacy payload.
 * Hashes are supplied by the control preview, never recomputed from a GHA plan. */
export function projectFiniteExternalPlan({control,preview,custody}){
 const p=control.plan,v=validateFiniteMaterialPreview(preview);
 if(control.planHash!==v.planHash||control.controlHash!==v.controlHash||p.intentId!==v.intentId)fail();
 return validateFiniteExternalPlan({purpose:'afw.finite-finalizer-plan.v1',preview:v,commandId:p.command.id,source:p.source,resources:p.resources,deployments:p.deployments,canaryContainment:p.canaryContainment,proofIdentity:{trialId:p.trialId,grantHash:p.grantHash,programHash:p.selectors.programHash,programSourceRevision:p.selectors.sourceRevision},workflows:p.workflows,finalizer:p.finalizer,custody});
}
export function validateFiniteObserverOutput(value,plan){
 const p=validateFiniteExternalPlan(plan),v=p.preview,r=fields(data(value),['purpose','instanceId','provenance','preview','retained','completion','qaClaim','plan','primaryReceipt']);
 if(!same(r.plan,p)||r.purpose!=='afw.finite-observer-output.v1'||r.instanceId!==p.workflows.bootstrap||!same(r.preview,v))fail();
 const native=fields(r.provenance,['purpose','instanceId','sourceRevision','runtimeVersionId']);
 if(native.purpose!=='afw.finite-observer-provenance.v1'||native.instanceId!==p.workflows.bootstrap||native.sourceRevision!==v.sourceRevision||native.runtimeVersionId!==v.runtimeVersionId)fail();
 const retained=fields(r.retained,['purpose','intentId','controlHash','planHash','proofHash','capturedAt','proof','support']);
 const {proofHash,...body}=retained;
 if(retained.purpose!=='afw.qa-finite-retained-proof.v1'||retained.intentId!==v.intentId||retained.controlHash!==v.controlHash||retained.planHash!==v.planHash||proofHash!==hash(body)||!time(retained.capturedAt)||retained.capturedAt<retained.proof.observedAt||retained.capturedAt-retained.proof.observedAt>5000||retained.capturedAt>=v.C1)fail();
 const completion=fields(r.completion,['purpose','intentId','controlHash','proofHash','completedAt','canaryVersionId','canaryDeploymentId','readbackHash','effectReceipts','receiptHash']),{receiptHash,...completionBody}=completion;
 if(completion.purpose!=='afw.finite-cleanup-completion.v1'||completion.intentId!==v.intentId||completion.controlHash!==v.controlHash||completion.proofHash!==proofHash||completion.canaryVersionId!==p.deployments.canaryClosed.versionId||!finiteUuid(completion.canaryDeploymentId)||receiptHash!==hash(completionBody)||!hex(completion.readbackHash)||!time(completion.completedAt)||completion.completedAt<retained.capturedAt||completion.completedAt>=v.C1)fail();
 fields(completion.effectReceipts,['withdraw','close','seal','canary_restore']);if(Object.values(completion.effectReceipts).some(x=>!hex(x)))fail();
 validateFiniteQaClaim(r.qaClaim,v,proofHash);
 if(r.qaClaim.claim.issuedAt<completion.completedAt)fail();
 validateFinitePrimaryReceipt(r.primaryReceipt,p,retained,completion,r.qaClaim);
 validateProjectedFiniteCleanupProof({proof:retained.proof,support:retained.support,plan:p,expectedChallenge:retained.proof.proofChallenge,now:()=>retained.capturedAt});
 return r;
}
import {validateProjectedFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
export function validateFinitePrimaryReceipt(value,plan,retained,completion,qaClaim){
 const p=validateFiniteExternalPlan(plan),v=p.preview,r=fields(data(value),['purpose','intentId','controlHash','planHash','proofHash','completionHash','nativeClaimHash','sealHash','sourceRevision','runtimeVersionId','actorId','closedCanaryVersionId','closedCanaryModuleHash','primary','writers','observedAt','receiptHash']),{receiptHash,...body}=r;
 if(r.purpose!=='afw.finite-final-primary.v1'||r.intentId!==v.intentId||r.controlHash!==v.controlHash||r.planHash!==v.planHash||r.proofHash!==retained.proofHash||r.completionHash!==completion.receiptHash||r.nativeClaimHash!==qaClaim.claimHash||r.sealHash!==retained.proof.sealHash||r.sourceRevision!==v.sourceRevision||r.runtimeVersionId!==v.runtimeVersionId||r.actorId!==v.actorId||r.closedCanaryVersionId!==p.deployments.canaryClosed.versionId||r.closedCanaryModuleHash!==p.deployments.canaryClosed.module.sha256||!time(r.observedAt)||r.observedAt<qaClaim.claim.issuedAt||r.observedAt>=v.R1||receiptHash!==hash(body))fail();
 const strip=x=>Object.fromEntries(Object.entries(x).filter(([k])=>k!=='observedAt'));
 if(!same(strip(r.primary),strip(retained.support.primary))||!time(r.primary.observedAt)||r.primary.observedAt<qaClaim.claim.issuedAt||r.primary.observedAt>r.observedAt||r.observedAt-r.primary.observedAt>5000)fail();
 const w=fields(r.writers,['purpose','controlHash','sealHash','settledWriterHash','sourceRevision','closedModuleHash','inventoryHash','knownActive','knownPending','unresolvedRemoteWrites','legacyContained','closedSourceQualified','observedAt']);
 if(w.purpose!=='afw.finite-writer-exclusion.v1'||w.controlHash!==v.controlHash||w.sealHash!==r.sealHash||w.settledWriterHash!==hash(retained.support.gate.writers)||w.sourceRevision!==p.canaryContainment.sourceRevision||w.closedModuleHash!==p.deployments.canaryClosed.module.sha256||!hex(w.inventoryHash)||['knownActive','knownPending','unresolvedRemoteWrites'].some(k=>w[k]!==0)||w.legacyContained!==true||w.closedSourceQualified!==true||!time(w.observedAt)||w.observedAt<qaClaim.claim.issuedAt||w.observedAt>r.observedAt||r.observedAt-w.observedAt>5000)fail();
 return r;
}
export const finiteSendKey=plan=>{const p=validateFiniteExternalPlan(plan);return hash({purpose:'afw.finite-qa-send-key.v1',intentId:p.preview.intentId,controlHash:p.preview.controlHash,kind:'qa_restore'});};
export function finiteSendRecord({plan,output,restoreJobId,issuedAt}){
 const p=validateFiniteExternalPlan(plan),r=validateFiniteObserverOutput(output,p);
 if(!Number.isSafeInteger(restoreJobId)||restoreJobId<1||restoreJobId===p.finalizer.jobId||!time(issuedAt)||issuedAt<r.qaClaim.claim.issuedAt||issuedAt>=p.preview.R1)fail();
 return data({purpose:'afw.finite-qa-send.v1',key:finiteSendKey(p),intentId:p.preview.intentId,controlHash:p.preview.controlHash,kind:'qa_restore',nativeClaimHash:r.qaClaim.claimHash,proofHash:r.retained.proofHash,runId:p.finalizer.runId,attempt:p.finalizer.attempt,jobId:restoreJobId,sourceRevision:p.preview.sourceRevision,candidate:p.deployments.qaLive,target:p.deployments.qaClosed,issuedAt,R1:p.preview.R1});
}
