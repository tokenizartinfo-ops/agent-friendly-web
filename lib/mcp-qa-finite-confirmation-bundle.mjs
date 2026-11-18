import {finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex} from './mcp-finite-evidence.mjs';
import {validateFiniteReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';

const purpose='afw.finite-confirmation-bundle.v1';
const artifactKeys=['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'];
const fail=()=>{throw Error('Finite confirmation bundle unavailable');};

export function projectPrivateQaFiniteConfirmationBundle(bundle,receipt){
 const {artifact,policy}=fields(bundle,['artifact','policy']);
 const {script,...identity}=fields(artifact,['script',...artifactKeys]);
 // Commit the same ordered projection that QA reconstructs from its bytes.
 const canonicalBundle={artifact:{script,...identity},policy};
 validateFiniteReleaseOperatorBundle(canonicalBundle);
 return readPrivateQaFiniteConfirmationBundleRecord({
  purpose,receiptHash:receipt.receiptHash,artifact:identity,policy,bundleHash:hash(canonicalBundle),
 },receipt);
}

export function readPrivateQaFiniteConfirmationBundleRecord(value,receipt){
 const r=fields(data(value),['purpose','receiptHash','artifact','policy','bundleHash']);
 const artifact=fields(r.artifact,artifactKeys),p=fields(r.policy,['operation','startAt','expiresAt','plan','observation']);
 if(!receipt||r.purpose!==purpose||!hex(r.bundleHash)||!hex(r.receiptHash)||r.receiptHash!==receipt.receiptHash||
    !hex(artifact.sourceRevision,40)||!hex(artifact.sourceTree,40)||!hex(artifact.programHash)||artifact.sourceCheck!=='git-inputs-before-after-v1'||
    artifact.sourceRevision!==receipt.sourceRevision||artifact.workerHash!==receipt.moduleHash||
    p.operation!=='confirm_named'||p.observation?.versionId!==receipt.versionId||p.observation?.deploymentId!==receipt.deploymentId||
    p.plan?.configurationHash!==receipt.activationHash)fail();
 return r;
}

export function reconstructPrivateQaFiniteConfirmationBundle(record,resident){
 const {artifact,policy}=record;
 if(artifact.sourceRevision!==resident.sourceRevision||artifact.sourceTree!==resident.sourceTree||
    artifact.programHash!==resident.programHash||artifact.workerHash!==resident.module.sha256||artifact.sourceCheck!==resident.sourceCheck)fail();
 const script=new TextDecoder('utf-8',{fatal:true}).decode(resident.bytes);
 const bundle={artifact:{script,...fields(artifact,artifactKeys)},policy};
 validateFiniteReleaseOperatorBundle(bundle);
 if(hash(bundle)!==record.bundleHash)fail();
 return bundle;
}
