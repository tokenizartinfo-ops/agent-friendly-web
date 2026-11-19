import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {readPrivateQaFiniteInstalledPolicy} from './mcp-qa-finite-installed-policy.mjs';
import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
import {readPrivateQaFiniteSetupCompletion} from './mcp-qa-finite-adoption-source.mjs';
import {readPrivateQaFinitePlanRoles} from './mcp-qa-finite-plan-roles.mjs';
import {buildPrivateQaFiniteSharedPlan} from './mcp-qa-finite-shared-plan.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteCfEnvelope,finiteGhaCustody} from './mcp-qa-finite-custody.mjs';
import {FINITE_ACCOUNT,projectFiniteExternalPlan} from './mcp-qa-finite-external-contract.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity,projectPrivateQaFiniteReferences} from './mcp-qa-finite-trial-control.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {reconstructPrivateQaFiniteConfirmationBundle} from './mcp-qa-finite-confirmation-bundle.mjs';
import {resolveFiniteNamedActivationPlan} from './mcp-release-operator-policy.mjs';
import {finiteFields as fields,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Private finite plan origin unavailable');};
const ACCOUNT='/accounts/'+FINITE_ACCOUNT;
const SLOT='afw-own-successor-closure-v1',NODE='afw-own-event-first-successor-v1';

/** Fixed, forward-only GET evidence. Does not prepare the actor or synthesize
 * READY, permission or authorization. The original caller supplies its lease. */
export async function readPrivateQaFiniteSharedOrigin({ctx,env,refs,parent}){
 const keys=fields(refs,['intentId','sourceRevision']);
 const {signal,deadline,check}=fields(parent,['signal','deadline','check']);
 const storage=ctx.storage,actor=ctx.id,node=env.AFW_RELEASE_EVENTS_NODE,qa=env.AFW_INDEPENDENT_CLOSURE;
 const metadata=env.AFW_QA_VERSION,versionId=metadata?.id,db=env.RELEASE_DB;
 const reader=env.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
 if(!(signal instanceof AbortSignal)||typeof check!=='function'||!time(deadline)||
    typeof reader!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(reader))fail();
 const actorId=actor.toString(),candidateId=node.idFromName(NODE).toString(),resolveNode=node.idFromName;
 let last=check();
 function current(){
  if(signal.aborted||parent.signal!==signal||parent.deadline!==deadline||parent.check!==check||ctx.storage!==storage||ctx.id!==actor||
     env.AFW_INDEPENDENT_CLOSURE!==qa||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==resolveNode||
     env.AFW_QA_VERSION!==metadata||metadata.id!==versionId||env.RELEASE_DB!==db||
     env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||globalThis.fetch!==fetcher||qa.idFromName(SLOT).toString()!==actorId||
     node.idFromName(NODE).toString()!==candidateId)fail();
  const at=check();if(!time(at)||at<last||at>=deadline)fail();last=at;return at;
 }
 const scoped=Object.freeze({signal,deadline,check:current}),lease=Object.freeze({signal,assertCurrent:current});
 const cloud=finiteSeedWire({fetchImpl:fetcher,now:current,signal,origin:'https://api.cloudflare.com/client/v4',
  credential:reader,requests:17,limit:22020096});
 const get=async path=>{current();const result=(await cloud.request(ACCOUNT+path)).value;current();return result;};
 try{
  const readInstallation=()=>readPrivateQaFiniteInstalledPolicy({ctx,env,refs:keys,parent:scoped});
  const [anchors,installed,material]=await Promise.all([
   readPrivateQaFiniteInitialAnchors({ctx,env},lease),
   readInstallation(),
   readFiniteMaterialSeed({...keys,fetchImpl:fetcher,now:current,signal}),
  ]);current();
  const {capsule,material:initial}=anchors,{receipt}=installed,{T0,seedStepCompletedAt}=material.primaryEvidence;
  const original=initial.originalContext,canary=material.seed.manifest.modules.canaryLive,qaLive=material.seed.qaPublication.qaLive;
  if(capsule.qaVersionId!==versionId||capsule.sourceRevision!==keys.sourceRevision||receipt.qaVersionId!==versionId||
     receipt.seedHash!==material.seedHash||capsule.sourceTree!==material.primaryEvidence.sourceTree||
     capsule.moduleHash!==canary.module.sha256||T0!==installed.original.T0||current()>=T0+160000||
     original.artifact.workerHash!==receipt.moduleHash||
     !same(installed.original.legacy,original.legacy))fail();

  const [completion,observed]=await Promise.all([
   readPrivateQaFiniteSetupCompletion({...keys,parent:scoped,expected:{qa:{versionId:qaLive.versionId,deploymentId:qaLive.deploymentId},
    seedHash:material.seedHash,T0,seedCompletedAt:seedStepCompletedAt,canaryModuleHash:canary.module.sha256,
    canaryPublicStaticHash:canary.publicStatic.configurationHash},read:async path=>finiteCfEnvelope(await get(path))}),
   readPrivateQaFinitePlanRoles({material,installed,read:get,check:current}),
  ]);current();
  if(!same(completion.receipt,receipt)&&completion.receipt.receiptHash!==receipt.receiptHash)fail();
  const candidate=readPrivateQaFiniteCandidate();
  if(candidate.module.sha256!==canary.module.sha256||candidate.module.bytes!==canary.module.bytes||candidate.programHash!==original.artifact.programHash)fail();
  const bundle=reconstructPrivateQaFiniteConfirmationBundle(installed.record,candidate);
  const named=resolveFiniteNamedActivationPlan(bundle,node);named.current();
  if(named.plan.trialId!==original.trialId||!same(installed,await readInstallation()))fail();
  current();
  const roles={deployments:observed.deployments,resources:{actorId,containerId:candidateId,...observed.resources,canaryActorId:candidateId}};
  const {planRaw,planHash}=buildPrivateQaFiniteSharedPlan({material,installed,roles,trialId:original.trialId});
  const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:keys.sourceRevision});
  const control=readPrivateQaFiniteControlIdentity({nativePin,raw:planRaw});
  if(control.planHash!==planHash)fail();
  const preview=projectPrivateQaFiniteReferences(control),external=projectFiniteExternalPlan({control,preview,custody:finiteGhaCustody()});
  current();return Object.freeze({planRaw,control,preview,external,setupReceiptHash:receipt.receiptHash,initialAnchors:anchors,selectionHash:installed.original.selectionHash});
 }finally{cloud.close();}
}
