import {finiteControlIdentity,finiteFields as fields,finiteData as data,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const DOMAIN='afw.qa-finite-recovery-context.v1';
const fail=()=>{throw Error('Finite retained recovery unavailable');};
export const finiteRecoveryKey=intentId=>DOMAIN+':'+intentId;

export function validateFiniteRecoveryExecution(value,control){
 const c=finiteControlIdentity(control),p=c.plan;
 const x=fields(value,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash','launcherId']);
 if(x.intentId!==p.intentId||x.controlHash!==c.controlHash||x.sourceRevision!==p.source.revision||
    x.moduleHash!==p.source.moduleHash||x.confirmationId!==p.workflows.confirmation||
    x.observerId!==p.workflows.bootstrap||x.launcherId!==p.workflows.launcher||!hex(x.admissionHash))fail();
 return x;
}
export function createFiniteRecoveryRecord({control,execution,original,readyHash,armedAt}){
 const c=finiteControlIdentity(control),p=c.plan,x=validateFiniteRecoveryExecution(execution,c);
 if(original?.purpose!=='afw.qa-finite-primary.v1'||original.intentId!==p.intentId||original.planHash!==c.planHash||
    original.sourceRevision!==p.source.revision||original.runtimeVersionId!==p.deployments.qaLive.versionId||
    original.actorId!==p.resources.actorId||!time(original.observedAt)||!time(armedAt)||
    original.observedAt<p.T0||original.observedAt>armedAt||armedAt-original.observedAt>5000||
    armedAt>=p.launchPolicy.armAckBy||!hex(readyHash))fail();
 const body=data({purpose:DOMAIN,intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,execution:x,
  original,readyHash,armedAt});
 return data({...body,recordHash:hash(body)});
}
export function validateFiniteRecoveryRecord(value,control){
 const x=fields(data(value),['purpose','intentId','controlHash','planHash','execution','original','readyHash','armedAt','recordHash']);
 const r=createFiniteRecoveryRecord({control,execution:x.execution,original:x.original,readyHash:x.readyHash,armedAt:x.armedAt});
 if(x.purpose!==r.purpose||x.intentId!==r.intentId||x.controlHash!==r.controlHash||x.planHash!==r.planHash||x.recordHash!==r.recordHash)fail();
 return r;
}

export function validateFiniteRecoverySnapshot(value,control,at){
 const p=control.plan,r=fields(value,['purpose','intentId','controlHash','observedAt','reservationHash','admissionHash','launchHash','closureHash','processGeneration']);
 if(r.purpose!=='afw.finite-primary-snapshot.v1'||r.intentId!==p.intentId||r.controlHash!==control.controlHash||
    !time(r.observedAt)||r.observedAt<p.C0||r.observedAt>at||at-r.observedAt>5000||
    ['reservationHash','admissionHash','launchHash','closureHash','processGeneration'].some(k=>r[k]!==null&&!hex(r[k]))||
    (r.admissionHash===null)!==(r.processGeneration===null)||r.launchHash!==null&&r.admissionHash===null)fail();
 return r;
}
