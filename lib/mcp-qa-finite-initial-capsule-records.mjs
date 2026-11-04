import {createHash} from 'node:crypto';
import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex,encodeFiniteInitialMaterialRecord as encodeMaterial,decodeFiniteInitialMaterialRecord as decodeMaterial,hashFiniteInitialMaterialRecord as materialHash} from './mcp-qa-finite-initial-material-records.mjs';
import {encodeFiniteInitialEntry,decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {encodeFiniteInitialCleanupRecord as encodeCleanup,decodeFiniteInitialCleanupRecord as decodeCleanup} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {prepareFiniteInitialActivationWire} from './mcp-qa-finite-initial-activation-wire.mjs';
const PURPOSE='afw.finite-initial-capsule.v1',CEILING=Date.parse('2026-11-03T02:59:00Z'),CAP=4096;
export const FINITE_INITIAL_CAPSULE_KEY='afw.finite-initial-preparation.v1:capsule';
const KEYS=['purpose','entryHash','materialHash','selectorHash','materialAckHash','cleanupPlanHash','cleanupArmAckHash','activationCompletionHash','sourceRevision','sourceTree','qaVersionId','qaDeploymentId','initialInstanceId','preconnectionId','I0','initialDeadline','C0','C1','activatedVersionId','activatedDeploymentId','moduleHash','configurationHash','bindingsHash','recordedAt'];
const fail=()=>{throw Error('Finite initial capsule unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
function validate(input){
 const v=own(fields(input,[...KEYS,'capsuleHash']));
 if(v.purpose!==PURPOSE||Buffer.byteLength(canonical(v))>CAP)fail();
 for(const k of KEYS.filter(k=>k.endsWith('Hash')))if(!hex(v[k]))fail();
 if(!hex(v.capsuleHash)||!hex(v.sourceRevision,40)||!hex(v.sourceTree,40)||!hex(v.preconnectionId)||typeof v.initialInstanceId!=='string'||!/^afw-finite-initial-[a-f0-9]{64}$/.test(v.initialInstanceId))fail();
 if(!['qaVersionId','qaDeploymentId','activatedVersionId','activatedDeploymentId'].every(k=>uuid(v[k]))||v.activatedVersionId===v.qaVersionId)fail();
 if(!['I0','initialDeadline','C0','C1','recordedAt'].every(k=>time(v[k]))||v.initialDeadline!==v.I0+300000||v.C0!==v.I0+900000||v.C1!==v.C0+180000||v.C1>CEILING||v.recordedAt<v.I0||v.recordedAt>=v.initialDeadline)fail();
 if(v.capsuleHash!==hash(PURPOSE,Object.fromEntries(KEYS.map(k=>[k,v[k]]))))fail();
 return v;
}
/** Complete M bindings commitment (expectedFull convention), not public projection. */
export function finiteInitialCapsuleBindingsHash(input){
 const bindings=own(input);
 if(!Array.isArray(bindings)||bindings.length===0)fail();
 const names=new Set();
 for(const b of bindings){if(!b||typeof b.name!=='string'||!b.name||names.has(b.name))fail();names.add(b.name);}
 return createHash('sha256').update(canonical([...bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex');
}
/** Pure factual linkage only. No continuation, capability, persistence or effects. */
export function sealFiniteInitialCapsule(input){
 const f=fields(input,['entry','claim','selector','materialAck','material','plan','state','arm','send','activationAck','completion','recordedAt']);
 const entry=decodeFiniteInitialEntry(encodeFiniteInitialEntry(f.entry));
 const m=(kind,v)=>decodeMaterial(kind,encodeMaterial(kind,v)),c=(kind,v)=>decodeCleanup(kind,encodeCleanup(kind,v));
 const claim=m('InitialClaim',f.claim),selector=m('InitialSelector',f.selector),ack=m('InitialAck',f.materialAck),material=m('InitialMaterial',f.material);
 const plan=c('Plan',f.plan),state=c('State',f.state),arm=c('ArmAck',f.arm),send=c('ActivationSend',f.send),activationAck=c('ActivationAck',f.activationAck),completion=c('ActivationCompletion',f.completion);
 const intent=material.intent,intentHash=hash('afw.finite-initial-intent.v1',intent),selectorHash=materialHash('InitialSelector',selector);
 if(canonical(intent)!==canonical(claim.intent)||claim.commandHash!==entry.commandHash||claim.claimHash!==material.claimHash||claim.ids.preconnectionId!==material.preconnectionId)fail();
 for(const k of ['commandId','sourceRevision','sourceTree','qaVersionId','initialInstanceId','I0','initialDeadline'])if(intent[k]!==entry[k]||plan[k]!==entry[k])fail();
 const o=material.originalContext;
 if(o.trialId!==claim.ids.trialId||o.publication.activationKey!==claim.ids.activationKey||o.withdrawalRequestId!==claim.ids.withdrawalRequestId||o.saveIdempotencyKey!==claim.ids.saveIdempotencyKey||o.artifact.workerHash!==plan.moduleHash)fail();
 if(selector.intentHash!==intentHash||selector.claimHash!==claim.claimHash||selector.materialHash!==material.materialHash||selector.sourceRevision!==entry.sourceRevision||selector.qaVersionId!==entry.qaVersionId||selector.preconnectionId!==material.preconnectionId||ack.intentHash!==intentHash||ack.claimHash!==claim.claimHash||ack.materialHash!==material.materialHash||ack.selectorHash!==selectorHash)fail();
 if(claim.claimedAt<entry.createdAt||material.observedAt<claim.claimedAt||material.observedAt>=claim.deadline||ack.acknowledgedAt<material.observedAt||ack.acknowledgedAt>=claim.deadline)fail();
 if(plan.entryHash!==entry.entryHash||plan.materialHash!==material.materialHash||plan.forwardDeadline!==entry.operationDeadline||state.planHash!==plan.recordHash||state.deliveries!==0||state.status!=='pending'||state.nextAt!==plan.C0||state.previousHash!==null||arm.planHash!==plan.recordHash||arm.stateHash!==state.recordHash||arm.alarmAt!==plan.C0||arm.acknowledgedAt<ack.acknowledgedAt)fail();
 const wire=prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt:send.issuedAt,deadline:send.deadline});
 if(canonical(wire.send)!==canonical(send)||activationAck.planHash!==plan.recordHash||activationAck.sendHash!==send.recordHash||activationAck.deploymentId===plan.baselineDeploymentId||activationAck.acknowledgedAt<send.issuedAt||activationAck.acknowledgedAt>=send.deadline)fail();
 if(completion.planHash!==plan.recordHash||completion.sendHash!==send.recordHash||completion.ackHash!==activationAck.recordHash||completion.candidateVersionId!==plan.candidateVersionId||completion.deploymentId!==activationAck.deploymentId||completion.settledAt<activationAck.acknowledgedAt||completion.observedAt<completion.settledAt||completion.observedAt>=send.deadline||!time(f.recordedAt)||f.recordedAt<completion.observedAt||f.recordedAt>=send.deadline)fail();
 const qa=material.qaBootstrap.currentPointer;
 if(qa.versionId!==entry.qaVersionId)fail();
 const body={purpose:PURPOSE,entryHash:entry.entryHash,materialHash:material.materialHash,selectorHash,materialAckHash:materialHash('InitialAck',ack),cleanupPlanHash:plan.recordHash,cleanupArmAckHash:arm.recordHash,activationCompletionHash:completion.recordHash,sourceRevision:entry.sourceRevision,sourceTree:entry.sourceTree,qaVersionId:qa.versionId,qaDeploymentId:qa.deploymentId,initialInstanceId:entry.initialInstanceId,preconnectionId:material.preconnectionId,I0:entry.I0,initialDeadline:entry.initialDeadline,C0:plan.C0,C1:plan.C1,activatedVersionId:completion.candidateVersionId,activatedDeploymentId:completion.deploymentId,moduleHash:plan.moduleHash,configurationHash:plan.configurationHash,bindingsHash:finiteInitialCapsuleBindingsHash(plan.configuration.bindings),recordedAt:f.recordedAt};
 return validate({...body,capsuleHash:hash(PURPOSE,body)});
}
export function encodeFiniteInitialCapsule(value){return canonical(validate(value));}
export function decodeFiniteInitialCapsule(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>CAP)fail();
 const v=validate(JSON.parse(raw));if(canonical(v)!==raw)fail();return v;
}
