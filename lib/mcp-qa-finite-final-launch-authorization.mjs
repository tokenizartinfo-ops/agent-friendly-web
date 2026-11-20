import {finiteControlIdentity,finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {validateFiniteLaunchPrepared,validateFiniteChildCreateSend,hashFiniteLaunchRecord,finiteChildConfirmationBindingHash} from './mcp-qa-finite-launch-records.mjs';

const fail=()=>{throw Error('Finite final launch authorization unavailable');};
const keys=['intentId','finitePlanHash','controlHash','sourceRevision','qaVersionId','actorId','launcherId','nominalId','bundleHash'];

/** Fixed native source only. The caller still owns durable SEND and ACK.
 * The returned closure is private to one operation and can be spent once. */
export function createPrivateQaFiniteFinalLaunchAuthorization({control,parent,readPermission,readFinalizer}={}){
 const c=finiteControlIdentity(control),p=c.plan;
 const {check:parentCheck,deadline,signal}=fields(parent,['check','deadline','signal']);
 if(typeof parentCheck!=='function'||typeof readPermission!=='function'||typeof readFinalizer!=='function'||
    !(signal instanceof AbortSignal)||!time(deadline))fail();
 const identity={intentId:p.intentId,finitePlanHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.source.revision,
  qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,
  nominalId:p.workflows.confirmation,bundleHash:p.bundleHash};
 let reserved=false,last=-1;
 return async function authorize(value,assertCurrent){
  if(reserved||typeof assertCurrent!=='function')fail();
  reserved=true;
  const input=fields(value,['prepared','send']);
  const prepared=validateFiniteLaunchPrepared(input.prepared),send=validateFiniteChildCreateSend(input.send);
  const sendHash=hashFiniteLaunchRecord(send);
  if(keys.some(k=>prepared[k]!==identity[k]||send[k]!==identity[k])||
     prepared.nominalClaimHash!==send.nominalClaimHash||send.preparedHash!==hashFiniteLaunchRecord(prepared)||
     send.bindingHash!==finiteChildConfirmationBindingHash(p)||send.deadline!==p.launchPolicy.lastCreateAt||
     ['armAckBy','launchAt','lastCreateAt'].some(k=>prepared[k]!==p.launchPolicy[k]))fail();
  let until=Math.min(deadline,p.launchPolicy.lastCreateAt,p.selectors.expiresAt,p.N1);
  const current=()=>{
   assertCurrent();
   const at=parentCheck();
   if(signal.aborted||parent.signal!==signal||parent.check!==parentCheck||parent.deadline!==deadline||
      !time(at)||at<last||at<send.issuedAt||at>=until)fail();
   last=at;return at;
  };
  current();
  const [permission,ready]=await Promise.all([readPermission(),readFinalizer()]),at=current();
  const consent=fields(permission,['grantHash','monitorHash','valid','expiresAt']);
  if(consent.valid!==true||consent.grantHash!==p.grantHash||consent.monitorHash!==p.monitorHash||
     !time(consent.expiresAt)||consent.expiresAt>p.selectors.expiresAt||at>=consent.expiresAt)fail();
  const f=p.finalizer;
  if(ready?.purpose!=='afw.qa-finite-finalizer-ready.v1'||ready.intentId!==p.intentId||ready.planHash!==c.planHash||
     ready.runtimeVersionId!==p.deployments.qaLive.versionId||ready.actorId!==p.resources.actorId||
     ['repository','runId','attempt','workflow','sourceRevision'].some(k=>ready[k]!==f[k])||
     ready.status!=='in_progress'||ready.job?.status!=='in_progress'||ready.job?.id!==f.jobId||
     ready.admission?.commandId!==p.command.id||ready.admission?.controlPlanHash!==c.planHash||ready.admission?.R1!==p.R1||
     !hex(ready.evidenceHash)||!time(ready.observedAt)||ready.observedAt<p.T0||ready.observedAt>at||
     at-ready.observedAt>=5000)fail();
  until=Math.min(until,consent.expiresAt,ready.observedAt+5000);
  current();
  let used=false;
  return candidate=>{
   if(used)fail();
   used=true;
   current();
   if(hashFiniteLaunchRecord(candidate)!==sendHash)fail();
   return true;
  };
 };
}
