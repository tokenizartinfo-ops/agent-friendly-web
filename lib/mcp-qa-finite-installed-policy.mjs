import {describeFiniteCanaryPolicyActivation,hashFiniteCanaryPolicyRequest} from './mcp-qa-finite-fixed-policy-engine.mjs';
import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {hashFinitePreparationRecord as hash} from './mcp-qa-finite-preparation-records.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';

const actorSlot='afw-own-successor-closure-v1';
const sha=value=>createHash('sha256').update(value).digest('hex');
const fail=()=>{throw Error('Finite installed policy unavailable');};

/** Private observations only. Caller retains the existing deadline and must
 * independently compare this installation with current provider/consent evidence. */
async function readInstalledPolicy({ctx,env,refs,parent},withLineage){
 const {intentId,sourceRevision}=fields(refs,['intentId','sourceRevision']);
 const {signal,deadline,check}=fields(parent,['signal','deadline','check']);
 const storage=ctx.storage,actor=ctx.id,self=env.AFW_INDEPENDENT_CLOSURE,metadata=env.AFW_QA_VERSION;
 const actorId=actor?.toString(),versionId=metadata?.id,resolveActor=self?.idFromName;
 const setupInstanceId=finitePrivateQaSetupInstanceId({intentId,sourceRevision});
 if(!hex(actorId)||!(signal instanceof AbortSignal)||!time(deadline)||typeof check!=='function'||typeof resolveActor!=='function')fail();

 function current(){
  if(signal.aborted||parent.signal!==signal||parent.check!==check||parent.deadline!==deadline||
     ctx.storage!==storage||ctx.id!==actor||actor.toString()!==actorId||
     env.AFW_QA_VERSION!==metadata||metadata.id!==versionId||env.AFW_INDEPENDENT_CLOSURE!==self||
     self.idFromName!==resolveActor||Reflect.apply(resolveActor,self,[actorSlot]).toString()!==actorId)fail();
  const now=check();if(!time(now)||now>=deadline)fail();
  return now;
 }
 const lease=Object.freeze({signal,assertCurrent:current});
 const store=createFiniteOwnerPreparationStore({storage,now:current});
 const journal=createFinitePolicyEffectJournal({storage,identity:{kind:'policy',intentId,sourceRevision,setupInstanceId,effect:'activation'},now:current});

 current();
 const [installed,context,selected]=await Promise.all([
  withLineage?journal.readInstallationLineage(lease):journal.readInstallation(lease),store.readContext({intentId,sourceRevision},lease),store.readSelected({sourceRevision},lease),
 ]);
 const now=current(),{receipt,record}=installed;
 if(!context||!selected?.binding)fail();
 const {binding,selection,preparation}=selected;
 if(receipt.sourceRevision!==sourceRevision||receipt.qaVersionId!==versionId||receipt.intentId!==intentId||
    receipt.setupInstanceId!==setupInstanceId||receipt.seedHash!==context.seedHash||
    receipt.contextHash!==hash('SetupContext',context)||receipt.baselineVersionId!==context.baseline.versionId||
    receipt.baselineDeploymentId!==context.baseline.deploymentId||receipt.moduleHash!==context.baseline.module.sha256||
    receipt.moduleHash!==record.artifact.workerHash||receipt.installedAt<binding.boundAt||
    receipt.installedAt>=context.T0+50000||receipt.installedAt>now||
    Object.keys(context.expectedFull).some(key=>receipt[key]!==context.expectedFull[key])||
    binding.intentId!==intentId||binding.sourceRevision!==sourceRevision||binding.T0!==context.T0||
    hash('Binding',binding)!==context.bindingHash||selection.selectionHash!==context.selectionHash||
    preparation.preparationHash!==context.preparationHash||preparation.actorId!==actorId)fail();
 const witness=await store.readSelectionPublication({sourceRevision,selectionHash:selection.selectionHash},lease);current();
 if(!witness||witness.selectionHash!==selection.selectionHash||
    witness.publishedAt<selection.selectedAt||witness.publishedAt>=preparation.commandBy||
    witness.publishedAt>binding.boundAt)fail();

 const bindings=record.policy.observation.configuration.bindings;
 for(const [name,text] of Object.entries(context.policies)){
  const matching=bindings.filter(binding=>binding.name===name);
  if(matching.length!==1||matching[0].type!=='plain_text'||matching[0].text!==text)fail();
 }

 const connection=preparation.connection;
 const selectors=Object.freeze({
  grantId:connection.grantId,subject:preparation.owner.subject,projectId:preparation.project.projectId,
  clientId:connection.clientId,resource:connection.resource,consentHash:connection.consentHash,
  programHash:record.artifact.programHash,sourceRevision:record.artifact.sourceRevision,
  startAt:context.T0,expiresAt:context.T0+300000,saveIdempotencyKey:context.saveIdempotencyKey,
  expectedProjectRevision:context.baselineProjectRevision,goal:context.goal,
 });

 const old=context.rollback,rollbackModule=old.module;
 const rollback=Object.freeze({versionId:old.versionId,deploymentId:old.deploymentId,
  rawConfigurationHash:restorationConfigurationHash(old.configuration),
  module:Object.freeze({name:rollbackModule.name,sha256:rollbackModule.sha256,bytes:rollbackModule.bytes})});
 const original={selectors,rollback,legacy:context.legacy,T0:context.T0,C0:context.C0,C1:context.C1,grantHash:preparation.connection.grantHash,
  monitorHash:preparation.connection.noticesHash,permissionExpiresAt:preparation.connection.permissionExpiresAt,
  eventPlanHash:sha(context.policies.AFW_DOSSIER_EVENTS_POLICY),
  withdrawalPolicyHash:sha(context.policies.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY),
  selectionHash:selection.selectionHash,bindingHash:context.bindingHash};
 const result={receipt,record,original:Object.freeze(original)};
 if(withLineage){
  const request=describeFiniteCanaryPolicyActivation(receipt.versionId);
  const activationHash=hashFiniteCanaryPolicyRequest(request,context.baseline.versionId,context.baseline.deploymentId);
  if(installed.lineage.activationRequestHash!==activationHash)fail();
  result.lineage=Object.freeze({...installed.lineage,prepId:preparation.prepId,T0:context.T0});
 }
 return Object.freeze(result);
}

export function readPrivateQaFiniteInstalledPolicy(options){
 return readInstalledPolicy(options,false);
}
export function readPrivateQaFiniteInstalledPolicyLineage(options){
 return readInstalledPolicy(options,true);
}

/** Cross-check the canonical plan against the same installed private facts. */
export function assertPrivateQaFiniteInstalledPlan({receipt,record,original},plan){
 const pin=plan.deployments.canaryLive,qa=plan.deployments.qaLive;
 const expected=original.selectors,observed=fields(plan.selectors,Object.keys(expected));
 if(plan.intentId!==receipt.intentId||plan.source.revision!==receipt.sourceRevision||
    qa.versionId!==receipt.qaVersionId||pin.versionId!==receipt.versionId||pin.deploymentId!==receipt.deploymentId||
    pin.configurationHash!==receipt.restorationHash||pin.module.sha256!==receipt.moduleHash||
    plan.bundleHash!==record.bundleHash||plan.T0!==original.T0||plan.C0!==original.C0||plan.C1!==original.C1||
    plan.grantHash!==original.grantHash||plan.monitorHash!==original.monitorHash||
    plan.eventPlanHash!==original.eventPlanHash||plan.withdrawalPolicyHash!==original.withdrawalPolicyHash||
    original.permissionExpiresAt<=plan.R1+30000||Object.keys(expected).some(key=>observed[key]!==expected[key]))fail();
}
