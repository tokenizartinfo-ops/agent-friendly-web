import {finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteChildConfirmationBindingHash,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot,readPrivateQaFinitePlan} from './mcp-qa-finite-trial-control.mjs';

const root='afw.qa-finite-trial.v1';
const fail=()=>{throw Error('Finite confirmation execution unavailable');};

/** Read only the retained HEAD for the original native child. The canonical
 * snapshot verifies its storage, current guard, PREPARED, SEND and ACK records. */
export async function readPrivateQaFiniteNominalExecution({ctx,env,refs,parent}){
 const {bundleHash,instanceId,createdAt}=fields(refs,['bundleHash','instanceId','createdAt']);
 const storage=ctx.storage;
 const check=()=>{if(ctx.storage!==storage)fail();return parent.check();};
 if(!hex(bundleHash)||instanceId!=='afw-release-'+bundleHash||!time(createdAt)||createdAt>check()||parent.deadline>createdAt+70000)fail();
 const head=fields(await storage.get(root+':head'),['purpose','intentId','controlHash','planHash']);check();
 if(head.purpose!==root+':head'||typeof head.intentId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(head.intentId))fail();
 const info=fields(await storage.get(root+':'+head.intentId+':info'),['purpose','intentId','planHash','plan','native']);check();
 const {plan:p,planHash}=readPrivateQaFinitePlan(info.plan);
 if(head.intentId!==p.intentId||head.planHash!==planHash||p.bundleHash!==bundleHash||p.workflows.confirmation!==instanceId)fail();
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
 const s=await readPrivateQaFiniteControlSnapshot({storage,nativePin,plan:info.plan,parent});
 const at=check();
 if(s.control.controlHash!==head.controlHash||s.state?.phase!=='armed'||s.state.withdrawnAt!==null||s.cleanupStarted||s.sealed||
    s.guard?.state!=='armed'||s.guard.deliveries!==0||s.guard.nextAt!==p.C0||s.alarm!==p.C0||at>=Math.min(p.C0,p.selectors.expiresAt)||
    !s.prepared||!s.send||!s.ack||createdAt<s.send.issuedAt||createdAt>s.ack.acknowledgedAt||createdAt>=s.send.deadline||
    s.send.bindingHash!==finiteChildConfirmationBindingHash(p))fail();
 return Object.freeze({plan:info.plan,execution:Object.freeze({
  intentId:p.intentId,finitePlanHash:planHash,controlHash:head.controlHash,sourceRevision:p.source.revision,
  qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:instanceId,bundleHash,
  preparedHash:hashFiniteLaunchRecord(s.prepared),sendHash:hashFiniteLaunchRecord(s.send),bindingHash:s.send.bindingHash,createdAt,
 })});
}
