import {finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {hashFinitePreparationRecord as hash} from './mcp-qa-finite-preparation-records.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';

const actorSlot='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite installed policy unavailable');};

/** Private observations only. Caller retains the existing deadline and must
 * independently compare this installation with current provider/consent evidence. */
export async function readPrivateQaFiniteInstalledPolicy({ctx,env,refs,parent}){
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
  journal.readInstallation(lease),store.readContext({intentId,sourceRevision},lease),store.readSelected({sourceRevision},lease),
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

 const original={T0:context.T0,C0:context.C0,C1:context.C1,grantHash:preparation.connection.grantHash,
  monitorHash:preparation.connection.noticesHash,permissionExpiresAt:preparation.connection.permissionExpiresAt,
  selectionHash:selection.selectionHash,bindingHash:context.bindingHash};
 return Object.freeze({receipt,record,original:Object.freeze(original)});
}
