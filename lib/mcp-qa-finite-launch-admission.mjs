import {randomBytes} from 'node:crypto';
import {finiteControlIdentity,finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteLaunchPredecessor,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {readPrivateQaFiniteAdmissionPrimary} from './mcp-qa-finite-admission-primary.mjs';
import {readPrivateQaFinitePrelaunch} from './mcp-qa-finite-prelaunch-check.mjs';

const slot='afw-own-event-first-successor-v1',originalSlot='afw-own-event-one-occurrence-v1';
const fail=()=>{throw Error('Finite QA launch admission unavailable');};

/** Consumes only server-owned observations. Each source is correlated again
 * before presenting the closed legacy/current candidate split to control. */
export function projectFiniteLaunchAdmission({control,selectorsHash,inventory,preflight,admission,isolation,channel,now=Date.now}){
 const c=finiteControlIdentity(control),p=c.plan,at=now();
 const current=x=>time(x)&&x>=p.T0&&x<=at&&at-x<5000;
 if(!time(at)||at>=p.launchPolicy.lastCreateAt||!hex(selectorsHash)||inventory.kind!=='never_issued'||
    !['arm','prelaunch'].includes(inventory.phase)||inventory.finitePlanHash!==c.planHash||inventory.intentId!==p.intentId||
    inventory.controlHash!==c.controlHash||inventory.sourceRevision!==p.source.revision||
    inventory.qaVersionId!==p.deployments.qaLive.versionId||inventory.actorId!==p.resources.actorId||
    inventory.launcherId!==p.workflows.launcher||inventory.nominalId!==p.workflows.confirmation||
    !['inventoryHash','controlSnapshotHash','journalSnapshotHash'].every(k=>hex(inventory[k]))||
    inventory.authorizesEffects!==false||inventory.operationalReadiness!==false||!current(inventory.observedAt))fail();
 for(const observed of [preflight,admission]){
  if(observed.status!=='verified'||observed.intentId!==p.intentId||observed.controlHash!==c.controlHash||
     !hex(observed.evidenceHash)||!current(observed.observedAt)||!time(observed.expiresAt)||observed.expiresAt<=at||
     observed.authorizesEffects!==false||observed.operationalReadiness!==false)fail();
 }
 const permit=fields(admission.permission,['valid','grantHash','monitorHash','expiresAt']);
 if(permit.valid!==true||permit.grantHash!==p.grantHash||permit.monitorHash!==p.monitorHash||
    !time(permit.expiresAt)||at>=permit.expiresAt||permit.expiresAt>p.selectors.expiresAt)fail();
 const r=fields(isolation,['observedAt','containerId','sourceRevision','runtimeVersionId','eventPlanHash','pristine']);
 if(r.pristine!==true||!current(r.observedAt)||r.containerId!==p.resources.containerId||
    r.sourceRevision!==p.canaryContainment.sourceRevision||r.runtimeVersionId!==p.deployments.canaryLive.versionId||
    r.eventPlanHash!==p.eventPlanHash)fail();
 const v=fields(channel,['verified','challenge']);
 if(v.verified!==true||typeof v.challenge!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(v.challenge))fail();
 const receiptsHash=hash({preflight:preflight.evidenceHash,admission:admission.evidenceHash,isolation:r,channel:v});
 return data({purpose:'afw.qa-finite-primary.v1',intentId:p.intentId,sourceRevision:p.source.revision,
  runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,planHash:c.planHash,observedAt:at,
  command:p.command,source:p.source,resources:p.resources,deployments:p.deployments,
  legacyControlHash:p.legacy.controlHash,legacyPreparedHash:p.legacy.preparedDispatchHash,
  legacyReductionHash:p.legacy.reductionDispatchHash,legacySourceHash:p.legacy.sourceHash,retainedUncertainty:true,
  containment:{entrypoint:'legacy_saved_event',finiteEntrypoint:'finite_trial_event',sourceRevision:r.sourceRevision,
   runtimeVersionId:r.runtimeVersionId,sourceHash:p.canaryContainment.moduleHash,profileHash:p.canaryContainment.profileHash,
   bindingsHash:p.canaryContainment.bindingsHash,denyBeforeAccess:true,enteredWritersIsolated:true,signedPacketsFenced:true,
   separateLegacyWritersTerminal:true,legacyGrantRevoked:true,legacyMonitorExpired:true,evidenceHash:receiptsHash},
  quiescence:{currentWriters:0,newScopeWriters:0,unresolvedWrites:0,completeInventory:true,inventoryHash:inventory.inventoryHash,
   receiptsHash,snapshotHash:hash([inventory.controlSnapshotHash,inventory.journalSnapshotHash])},
  consent:{...permit,selectorsHash}});
}

/** All three reads are scoped by the existing launcher parent. Receiver check
 * uses a challenge envelope from the original named canary; no keys cross RPC. */
export async function readFiniteQaLaunchEvidence({ctx,env,control,predecessor,parent,readPermission}){
 const c=finiteControlIdentity(control),p=c.plan,prior=finiteLaunchPredecessor(predecessor,p.resources);
 const node=env.AFW_RELEASE_EVENTS_NODE,receiver=env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER;
 const storage=ctx.storage,challenge=randomBytes(32).toString('base64url');
 const check=()=>{
  const t=parent.check();
  if(!time(t)||t>=p.launchPolicy.lastCreateAt||ctx.storage!==storage||env.AFW_RELEASE_EVENTS_NODE!==node||
     env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER!==receiver||parent.signal.aborted)fail();
  return t;
 };
 const call=async(work)=>{
  check();const value=await work();
  try{check();return data(structuredClone(value));}finally{value?.[Symbol.dispose]?.();}
 };
 const id=node.idFromName(slot);
 if(id.toString()!==p.resources.containerId||node.idFromName(originalSlot).toString()!==prior.containerId)fail();
 const readChannel=async()=>{
  const remote=await call(()=>node.get(id).readFiniteTrialPrelaunch({control:c,challenge}));
  const {isolation,signed}=fields(remote,['isolation','signed']);
  if(signed?.challenge!==challenge||signed.controlHash!==c.controlHash||
     signed.revision!==p.selectors.expectedProjectRevision+1||!hex(signed.eventId)||!hex(signed.projectRef))fail();
  const channel=fields(await call(()=>receiver.verifyChannel(signed)),['verified','challenge']);
  if(channel.verified!==true||channel.challenge!==challenge)fail();
  return {isolation,channel};
 };
 const [preflight,admission,channelEvidence]=await Promise.all([
  readPrivateQaFinitePrelaunch({ctx,env,control:c,predecessor:prior,parent}),
  readPrivateQaFiniteAdmissionPrimary({ctx,env,control:c,predecessor:prior,parent,readPermission}),
  readChannel(),
 ]);
 check();
 return Object.freeze({preflight,admission,...channelEvidence});
}
