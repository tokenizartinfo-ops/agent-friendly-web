import {createHash} from 'node:crypto';
import {decodeFiniteInitialUploadRecord as decode} from './mcp-qa-finite-initial-upload-records.mjs';
import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
import {initialCanonical as canonical} from './mcp-qa-finite-initial-material-records.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const fail=()=>{throw Error('Finite private setup expediente material unavailable');};

/** Deterministic data-only projection from the verified owner snapshot. */
export function projectFiniteSetupPrearmMaterial({ownerSource,snapshot},native,candidate){
 const {anchors,backupRaw}=snapshot.anchor;
 const {capsule,material,plan,state,zero}=anchors;
 const {originalContext}=material,artifact=originalContext.artifact;
 const published=ownerSource.currentPublication,selected=snapshot.selected;
 const pin=snapshot.installed.receipt,pointer=snapshot.physical.pointer,configuration=snapshot.physical.currentConfiguration;
 const project=ownerSource.project,preparation=selected?.preparation;
 if(ownerSource.phase!=='finite_prearm'||ownerSource.sourceRevision!==native.sourceRevision||ownerSource.qaVersionId!==native.qaVersionId||
    capsule.capsuleHash!==snapshot.capsuleHash||capsule.qaVersionId!==native.qaVersionId||capsule.sourceRevision!==native.sourceRevision||
    capsule.preconnectionId!==snapshot.preconnectionId||capsule.C0!==anchors.alarm||canonical(state)!==canonical(zero)||
    snapshot.installed.receipts.length!==3||!snapshot.cleanupScope||!preparation||selected.binding!==null||snapshot.pendingUsed||
    preparation.prepId!==snapshot.preconnectionId||preparation.sourceRevision!==native.sourceRevision||preparation.actorId!==ownerSource.actorId||
    canonical(preparation.project)!==canonical(project)||preparation.selectedAt>native.T0||native.T0>=preparation.commandBy||
    native.T0>=capsule.C0||native.T0<capsule.I0||
    snapshot.preparation.noticeLink?.eventHash!==preparation.connection.noticesHash||
    snapshot.noticeRows.events.length!==1||snapshot.noticeRows.events[0].sequence!==snapshot.preparation.noticeLink.sequence||
    published.stage!=='finite'||pin.stage!=='finite'||pin.receiptHash!==published.receiptHash||
    pin.versionId!==published.versionId||pin.deploymentId!==published.deploymentId||
    pointer.versionId!==pin.versionId||pointer.deploymentId!==pin.deploymentId||
    finiteActivationConfigurationHash(configuration)!==pin.configurationHash)fail();
 if(candidate.sourceRevision!==native.sourceRevision||candidate.sourceTree!==capsule.sourceTree||candidate.programHash!==artifact.programHash||
    candidate.sourceRevision!==artifact.sourceRevision||candidate.sourceTree!==artifact.sourceTree||candidate.sourceCheck!==artifact.sourceCheck||
    candidate.module.sha256!==artifact.workerHash||candidate.module.sha256!==capsule.moduleHash||candidate.module.sha256!==pin.moduleHash||
    !(candidate.bytes instanceof Uint8Array)||candidate.bytes.byteLength!==candidate.module.bytes||sha(candidate.bytes)!==candidate.module.sha256)fail();

 const prefix='afw.finite-initial-upload.v1:'+plan.entryHash+':',rows=new Map(backupRaw);
 const backup=decode('Backup',rows.get(prefix+'backup')),receipt=decode('Receipt',rows.get(prefix+'receipt'));
 if(rows.size!==backupRaw.length||rows.size!==2+backup.chunks.length||
    backup.recordHash!==plan.manifestHash||receipt.manifestHash!==backup.recordHash||
    backup.baselineVersionId!==plan.baselineVersionId||backup.baselineDeploymentId!==plan.baselineDeploymentId||
    backup.retainedIds.preconnectionId!==snapshot.preconnectionId||backup.retainedIds.trialId!==originalContext.trialId||
    receipt.uploadedVersionId!==capsule.activatedVersionId)fail();
 const chunks=backup.chunks.map(expected=>{
  const value=decode('Chunk',rows.get(prefix+'chunk:'+String(expected.index).padStart(3,'0')));
  if(value.manifestHash!==backup.recordHash||value.index!==expected.index||value.bytes!==expected.bytes||value.sha256!==expected.sha256)fail();
  return Buffer.from(value.content,'base64');
 });
 const rollbackBytes=Buffer.concat(chunks);
 if(rollbackBytes.byteLength!==backup.moduleBytes||sha(rollbackBytes)!==backup.moduleHash)fail();
 const script=new TextDecoder('utf-8',{fatal:true}).decode(candidate.bytes);
 if(!Buffer.from(script).equals(Buffer.from(candidate.bytes)))fail();
 const baseline={versionId:pin.versionId,deploymentId:pin.deploymentId,module:candidate.module,configuration};
 const rollback={versionId:backup.baselineVersionId,deploymentId:backup.baselineDeploymentId,
  module:{name:'index.mjs',sha256:backup.moduleHash,bytes:backup.moduleBytes},configuration:backup.rawConfiguration};
 return Object.freeze({
  originalContext:{...originalContext,artifact:{script,...artifact}},baseline,rollback,
  bytes:{baseline:Uint8Array.from(candidate.bytes),candidate:Uint8Array.from(candidate.bytes),rollback:Uint8Array.from(rollbackBytes)},
 });
}
