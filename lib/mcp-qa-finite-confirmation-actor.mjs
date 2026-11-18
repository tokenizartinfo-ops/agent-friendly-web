import {finiteFields as fields,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {readPrivateQaFiniteNominalExecution} from './mcp-qa-finite-confirmation-provenance.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {reconstructPrivateQaFiniteConfirmationBundle} from './mcp-qa-finite-confirmation-bundle.mjs';
import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
import {createPrivateQaFiniteLaunchParent} from './mcp-qa-finite-launch-inventory.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {readPrivateQaFinitePlan} from './mcp-qa-finite-trial-control.mjs';

const fail=()=>{throw Error('Finite confirmation material unavailable');};

/** Fixed finite actor entry. The request selects the native event and its
 * original absolute deadline. Durable and provider state supply the evidence. */
export async function readPrivateQaFiniteConfirmationFromActor({ctx,env,refs}){
 const {bundleHash,instanceId,createdAt,deadline}=fields(refs,['bundleHash','instanceId','createdAt','deadline']);
 if(!time(createdAt)||!time(deadline)||deadline>createdAt+70000)fail();
 const original=createPrivateQaFiniteLaunchParent({deadline});
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),original.deadline-original.check());
 const check=()=>{if(controller.signal.aborted)fail();return original.check();};
 const parent={deadline:original.deadline,signal:controller.signal,check};
 const lease={signal:controller.signal,assertCurrent:check};
 try{
  const keys={bundleHash,instanceId,createdAt};
  const actual=await readPrivateQaFiniteNominalExecution({ctx,env,refs:keys,parent});check();
  const {plan,execution}=actual,{plan:p}=readPrivateQaFinitePlan(plan);
  const {intentId,sourceRevision}=execution,setupInstanceId=finitePrivateQaSetupInstanceId({intentId,sourceRevision});
  const journal=createFinitePolicyEffectJournal({
   storage:ctx.storage,identity:{kind:'policy',intentId,sourceRevision,setupInstanceId,effect:'activation'},now:check,
  });
  const record=await journal.readConfirmation(lease);check();
  if(record.bundleHash!==bundleHash)fail();
  const resident=readPrivateQaFiniteCandidate();
  const {policy}=reconstructPrivateQaFiniteConfirmationBundle(record,resident),pin=p.deployments.canaryLive;
  const o=policy.observation;
  if(o.versionId!==pin.versionId||o.deploymentId!==pin.deploymentId||o.namespaceId!==p.resources.namespaceId||
     o.applicationId!==p.resources.applicationId||resident.module.sha256!==pin.module.sha256||resident.module.bytes!==pin.module.bytes||
     restorationConfigurationHash(o.configuration)!==pin.configurationHash||policy.plan.trialId!==p.trialId||
     policy.startAt!==p.T0||policy.expiresAt!==p.N1||resident.programHash!==p.selectors.programHash)fail();
  const provider=createFiniteFixedPolicyEngine({ctx,env},check);
  await Promise.all([
   provider.readNominalInstance(execution,p.deployments.qaLive,lease),
   provider.readPointer(pin,lease),
   provider.readVersion({...pin,configuration:o.configuration},lease),
  ]);check();
  const [after,retained]=await Promise.all([
   readPrivateQaFiniteNominalExecution({ctx,env,refs:keys,parent}),journal.readConfirmation(lease),
  ]);check();
  if(!same(actual,after)||!same(record,retained))fail();
  return {record,plan,execution};
 }finally{clearTimeout(timer);controller.abort();}
}

