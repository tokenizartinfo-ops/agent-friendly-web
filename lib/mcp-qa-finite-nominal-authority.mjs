import {createPrivateQaFiniteBusinessPrimary} from './mcp-qa-finite-business-primary.mjs';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {validateFiniteNominalWriterJournal} from './mcp-finite-child-primary.mjs';
import {readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {createPrivateQaFiniteLaunchParent} from './mcp-qa-finite-launch-inventory.mjs';
import {createPrivateQaFiniteLaunchPermission} from './mcp-qa-finite-launch-permission.mjs';
import {finiteChildConfirmationBindingHash,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from './mcp-qa-finite-trial-control.mjs';
import {finiteData as data,finiteFields as fields,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {createHash} from 'node:crypto';

const ROOT='afw.qa-finite-trial.v1',SLOT='afw-own-event-first-successor-v1';
const kinds=['reservation','admission','launch'];
const fail=()=>{throw Error('Finite native nominal authority unavailable');};
const claimHash=value=>createHash('sha256').update(ROOT+':effect\n'+JSON.stringify(value)).digest('hex');

async function observe({ctx,env,compiledRevision,refs,parent}){
 const x=fields(refs,['intentId','controlHash','operation']);
 if(!['journal','reserve','settle'].includes(x.operation)||!hex(compiledRevision,40))fail();
 const storage=ctx.storage;
 const check=()=>{if(ctx.storage!==storage)fail();return parent.check();};
 check();const c=await readFiniteCleanupControl({storage,intentId:x.intentId,controlHash:x.controlHash});check();
 const p=c.plan,nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:compiledRevision});
 if(p.source.revision!==compiledRevision)fail();
 const deadline=x.operation==='settle'?p.C1:Math.min(p.C0,p.N1,p.selectors.expiresAt);
 const s=await readPrivateQaFiniteControlSnapshot({storage,nativePin,plan:JSON.stringify(p),parent}),at=check();
 if(!same(s.control,c)||s.state?.phase!=='armed'||!s.nominalClaim||!s.prepared||!s.send||!s.ack||
    s.send.bindingHash!==finiteChildConfirmationBindingHash(p)||at>=deadline)fail();
 if(x.operation!=='settle'&&(s.state.withdrawnAt!==null||s.cleanupStarted||s.sealed||
    s.guard?.state!=='armed'||s.guard.deliveries!==0||s.guard.nextAt!==p.C0||s.alarm!==p.C0||at>=s.nominalClaim.deadline))fail();
 return Object.freeze({purpose:'afw.qa-finite-canary-nominal-context.v1',operation:x.operation,
  control:c,ackHash:hashFiniteLaunchRecord(s.ack),nominalClaim:s.nominalClaim,observedAt:at,expiresAt:deadline});
}

/** Only the exact retained named child may use the private candidate journal.
 * A lone SEND, recovered timeout or another attempt confers no authority. */
export function readPrivateQaFiniteCanaryNominalContext({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const parent=createPrivateQaFiniteLaunchParent({now,deadline:now()+4800});
 return observe({ctx,env,compiledRevision,refs,parent});
}

/** Pre-save authority for the fixed owner-selected goal in the original trial.
 * Observe the named child's ACK, the retained approval, and the current
 * subscription and original revision before allowing the canary to commit. */
export async function readPrivateQaFiniteCanarySaveContext({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash']);
 const parent=createPrivateQaFiniteLaunchParent({now,deadline:now()+4800});
 const read=()=>observe({ctx,env,compiledRevision,refs:{...x,operation:'journal'},parent});
 const initial=await read(),{control}=initial,p=control.plan;
 if(p.selectors.projectId!=='oauth-canary-owner')fail();
 const primary=createPrivateQaFiniteBusinessPrimary({ctx,env,control,now:parent.check});
 const [first,permission]=await Promise.all([primary.saveTarget(),createPrivateQaFiniteLaunchPermission({ctx,env,control,parent})()]);
 if(!first||permission.valid!==true||permission.grantHash!==p.grantHash||permission.monitorHash!==p.monitorHash||
    !time(permission.expiresAt))fail();
 const latest=await read(),again=await primary.saveTarget(),observedAt=parent.check();
 const expiresAt=Math.min(initial.expiresAt,initial.nominalClaim.deadline,first.expiresAt,permission.expiresAt);
 if(!same(control,latest.control)||initial.ackHash!==latest.ackHash||
    !same(initial.nominalClaim,latest.nominalClaim)||!same(first,again)||observedAt>=expiresAt)fail();
 return Object.freeze({purpose:'afw.qa-finite-canary-save.v1',control,ackHash:initial.ackHash,
  target:first.target,observedAt,expiresAt});
}

export async function savePrivateQaFiniteCanaryDossier({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash']),node=env.AFW_RELEASE_EVENTS_NODE;
 const proof=await readPrivateQaFiniteCanarySaveContext({ctx,env,compiledRevision,refs:x,now});
 const selected=node.idFromName(SLOT);
 const check=()=>{
  const at=now();
  if(!time(at)||at<proof.observedAt||at>=proof.expiresAt||env.AFW_RELEASE_EVENTS_NODE!==node||
     selected.toString()!==proof.control.plan.resources.containerId)fail();
  return at;
 };
 check();
 const raw=await node.get(selected).saveAndDeliverFiniteTrialNotice(x);
 try{
  const value=fields(data(structuredClone(raw)),['saved','revision','delivery']),at=check();
  if(value.saved!==true||value.revision!==proof.target.revision)fail();
  if(value.delivery!==null){
   const d=fields(value.delivery,['eventId','status','httpReceivedAt','cloudReviewConfirmed']);
   if(!hex(d.eventId)||!Number.isInteger(d.status)||d.status<200||d.status>299||!time(d.httpReceivedAt)||
      d.httpReceivedAt<proof.observedAt||d.httpReceivedAt>at||d.cloudReviewConfirmed!==false)fail();
  }
  return value;
 }finally{raw?.[Symbol.dispose]?.();}
}

/** A post-save read of the original event and subscription in one primary
 * snapshot. The pre-save permission reader remains bound to the old revision. */
export async function readPrivateQaFiniteCanaryNoticeContext({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash']);
 const parent=createPrivateQaFiniteLaunchParent({now,deadline:now()+4800});
 const read=()=>observe({ctx,env,compiledRevision,refs:{...x,operation:'journal'},parent});
 const initial=await read();
 const primary=createPrivateQaFiniteBusinessPrimary({ctx,env,control:initial.control,now:parent.check});
 const first=await primary.notice();
 if(!first)fail();
 const latest=await read(),again=await primary.notice(),observedAt=parent.check();
 const expiresAt=Math.min(initial.expiresAt,initial.nominalClaim.deadline,first.expiresAt);
 if(!same(initial.control,latest.control)||initial.ackHash!==latest.ackHash||
    !same(initial.nominalClaim,latest.nominalClaim)||!same(first,again)||observedAt>=expiresAt)fail();
 return Object.freeze({purpose:'afw.qa-finite-canary-notice.v1',control:initial.control,ackHash:initial.ackHash,
  notice:first.notice,observedAt,expiresAt});
}

/** Fixed internal QA invocation. No caller-provided URL, saved-event ID or SID. */
export async function deliverPrivateQaFiniteCanaryNotice({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash']),node=env.AFW_RELEASE_EVENTS_NODE;
 const started=now();
 const first=await readPrivateQaFiniteCanaryNoticeContext({ctx,env,compiledRevision,refs:x,now});
 const deadline=Math.min(started+4800,first.expiresAt);
 const check=()=>{
  const at=now();if(!time(at)||at<first.observedAt||at>=deadline||env.AFW_RELEASE_EVENTS_NODE!==node)fail();return at;
 };
 const id=node.idFromName(SLOT);if(id.toString()!==first.control.plan.resources.containerId)fail();
 check();const raw=await node.get(id).deliverFiniteTrialNotice(x);
 try{
  const value=fields(data(structuredClone(raw)),['eventId','status','httpReceivedAt','cloudReviewConfirmed']);
  if(!hex(value.eventId)||!Number.isInteger(value.status)||value.status<200||value.status>299||
     !time(value.httpReceivedAt)||value.httpReceivedAt<first.observedAt||value.httpReceivedAt>check()||
     value.cloudReviewConfirmed!==false)fail();
  return value;
 }finally{raw?.[Symbol.dispose]?.();}
}

/** Native control read for the candidate gate. Owner consent, the candidate's
 * own durable journal, and first-primary D1 must still agree. */
export async function createPrivateQaFiniteNominalAuthority({ctx,env,head,compiledRevision,now=Date.now}={}){
 const h=fields(head,['purpose','intentId','controlHash','planHash']);
 if(h.purpose!==ROOT+':head')fail();
 const storage=ctx.storage,identity=await readFiniteCleanupControl({storage,intentId:h.intentId,controlHash:h.controlHash});
 const p=identity.plan,refs={intentId:h.intentId,controlHash:h.controlHash};
 if(ctx.storage!==storage||identity.planHash!==h.planHash||p.source.revision!==compiledRevision)fail();
 async function readNominalControl(){
  const parent=createPrivateQaFiniteLaunchParent({now,deadline:Math.min(now()+4800,p.C0)});
  const read=()=>observe({ctx,env,compiledRevision,refs:{...refs,operation:'reserve'},parent});
  const initial=await read(),check=()=>{
   if(ctx.storage!==storage)fail();
   const at=parent.check();if(at>=initial.expiresAt)fail();return at;
  };
  if(!same(initial.control,identity))fail();
  const node=env.AFW_RELEASE_EVENTS_NODE,db=env.RELEASE_DB,id=node.idFromName(SLOT);
  if(id.toString()!==p.resources.containerId)fail();
  const stub=node.get(id),permit=createPrivateQaFiniteLaunchPermission({ctx,env,control:identity,parent});
  const primary=createFiniteNativePrimaryReader({db,control:identity,now:check});
  async function readJournal(){
   check();const raw=await stub.readFiniteTrialAdmissionJournal(refs);
   try{check();return data(structuredClone(raw));}finally{raw?.[Symbol.dispose]?.();}
  }
  const [g,permission]=await Promise.all([readJournal(),permit()]);
  const snapshot=await primary.read();
  const [again,latest,permissionAgain]=await Promise.all([readJournal(),read(),permit()]),at=check();
  if(env.AFW_RELEASE_EVENTS_NODE!==node||env.RELEASE_DB!==db||!same(g,again)||
     !same(initial.control,latest.control)||initial.ackHash!==latest.ackHash||
     !same(initial.nominalClaim,latest.nominalClaim)||!same(permission,permissionAgain)||
     permission.valid!==true||permission.grantHash!==p.grantHash||permission.monitorHash!==p.monitorHash||
     !time(permission.expiresAt)||at>=permission.expiresAt||snapshot.closureHash!==null)fail();
  const ownedWriters=validateFiniteNominalWriterJournal({control:identity,journal:g,now:check});
  for(const kind of kinds){
   const w=g.writers[kind],row=snapshot[kind+'Hash'];
   if(w===null&&row!==null||w?.settlement&&w.settlement.primaryRowHash!==row)fail();
  }
  const claim=latest.nominalClaim,expiresAt=Math.min(permission.expiresAt,p.selectors.expiresAt,latest.expiresAt);
  if(check()>=Math.min(expiresAt,claim.deadline))fail();
  return {status:'observed',value:{purpose:'afw.qa-finite-nominal-control.v1',intentId:p.intentId,controlHash:identity.controlHash,
   planHash:identity.planHash,sourceRevision:compiledRevision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,
   observedAt:check(),phase:'armed',withdrawnAt:null,claim,claimHash:claimHash(claim),ownedWriters,
   consent:{grantHash:p.grantHash,monitorHash:p.monitorHash,expiresAt,valid:true}}};
 }
 return {ctx,env,capabilities:{identity},control:{readNominalControl}};
}
