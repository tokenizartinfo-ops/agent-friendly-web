import locator from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {readCommittedPrivateQaFiniteOriginalAlarmHandoff,readCommittedPrivateQaFiniteOriginalRecoveryHandoff,readFiniteOriginalAlarmHandoff,FINITE_ALARM_HANDOFF} from './mcp-qa-finite-alarm-handoff.mjs';
import {readFiniteCoupledTerminalReceipt} from './mcp-qa-finite-coupled-terminal.mjs';
import {hashFinitePrimarySnapshot} from './mcp-qa-finite-business-primary.mjs';
import {validateFiniteCoupledNoticeEvidence} from './mcp-finite-notice-closure.mjs';
import {createPrivateQaFiniteCleanupStore,readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {FINITE_OBSERVER_SLOT} from './mcp-qa-finite-observer.mjs';

const purpose='afw.finite-coupled-qa-finalization.v1';
const fail=()=>{throw Error('Finite coupled QA finalization unavailable');};
const pending=()=>Object.freeze({purpose,status:'pending',authorizesEffects:false,operationalReadiness:false});

function pinnedTarget(target){
 const {id,configurationHash,module}=QA_CLOUD_CLOSED_PINS.qaClosed;
 const {qaClosed}=locator.inputs;
 if(locator.purpose!=='afw.finite-r2-historical-inputs.v1'||locator.bucket!=='afw-release-backups'||
    !hex(locator.archiveSha256)||locator.objectKey!=='historical-v1/sha256-'+locator.archiveSha256+'.zip'||
    !Number.isSafeInteger(locator.archiveBytes)||locator.archiveBytes<1||!hex(locator.receiptSha256)||
    target.versionId!==id||target.configurationHash!==configurationHash||!same(target.module,module)||
    qaClosed.versionId!==id||qaClosed.configurationSha256!==configurationHash||qaClosed.moduleName!==module.name||
    qaClosed.moduleBytes!==module.bytes||qaClosed.moduleSha256!==module.sha256)fail();
 return {archiveSha256:locator.archiveSha256,archiveBytes:locator.archiveBytes,receiptSha256:locator.receiptSha256,qaClosed};
}

async function readBoundQaActor(ctx,env,now,read){
 if(typeof now!=='function')fail();
 const {storage,id}=ctx,namespace=env.AFW_INDEPENDENT_CLOSURE,metadata=env.AFW_QA_VERSION;
 const actorId=id.toString(),qaVersionId=metadata?.id,started=now(),mono=performance.now();
 let last=started,done=false,timer;
 const check=()=>{
  const at=now();
  if(done||!time(at)||at<last||at>=started+5000||performance.now()-mono>=5000||
     ctx.storage!==storage||ctx.id!==id||id.toString()!==actorId||
     env.AFW_INDEPENDENT_CLOSURE!==namespace||env.AFW_QA_VERSION!==metadata||metadata?.id!==qaVersionId||
     namespace.idFromName(FINITE_OBSERVER_SLOT).toString()!==actorId)fail();
  last=at;return at;
 };
 const transaction=()=>storage.transaction(async tx=>{
  const get=async key=>{check();const v=await tx.get(key);check();return v;};
  return read({tx,get,check,actorId,qaVersionId});
 });
 try {
  check();
  const result=await Promise.race([transaction(),new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;reject(Error('Finite QA finalization deadline'));},5000);})]);
  check();return result;
 }finally{done=true;clearTimeout(timer);}
}

/** Expose only the committed original recovery window. The independent
 * executor still needs the separate terminal observation before any write. */
export async function readPrivateQaFiniteIndependentRestoreScope({ctx,env,refs,now=Date.now}={}){
 const x=fields(data(refs),['intentId','controlHash','sourceRevision']);
 if(!hex(x.intentId)||!hex(x.controlHash)||!hex(x.sourceRevision,40))fail();
 return readBoundQaActor(ctx,env,now,async({tx,get,check,actorId,qaVersionId})=>{
  if(await get(FINITE_ALARM_HANDOFF)===undefined)return {status:'pending',authorizesEffects:false,operationalReadiness:false};
  const control=await readFiniteCleanupControl({storage:{get},intentId:x.intentId,controlHash:x.controlHash});check();
  const handoff=await readCommittedPrivateQaFiniteOriginalAlarmHandoff({tx,control,check});check();
  if(!handoff||handoff.actorId!==actorId||handoff.qaVersionId!==qaVersionId||
     handoff.sourceRevision!==x.sourceRevision||check()>=handoff.C0)fail();
  pinnedTarget(control.plan.deployments.qaClosed);
  return Object.freeze({purpose:'afw.finite-independent-qa-restore-scope.v1',status:'reserved',...x,
   planHash:handoff.planHash,runtimeVersionId:qaVersionId,handoffHash:handoff.handoffHash,
   restoreFrom:handoff.initialC0,restoreBefore:handoff.initialC1,authorizesEffects:false,operationalReadiness:false});
 });
}

/** Read-only bridge for the independent QA restorer. Do not use the expired
 * business R1 claim or let the retiring Worker confirm its own replacement. */
export async function readPrivateQaFiniteCoupledFinalization({ctx,env,refs,now=Date.now}={}){
 const x=fields(data(refs),['intentId','controlHash']);
 if(!hex(x.intentId)||!hex(x.controlHash))fail();
 return readBoundQaActor(ctx,env,now,async({tx,get,check,actorId,qaVersionId})=>{
  const handoff=readFiniteOriginalAlarmHandoff(await get(FINITE_ALARM_HANDOFF));
  if(handoff.intentId!==x.intentId||handoff.controlHash!==x.controlHash||handoff.actorId!==actorId||
     handoff.qaVersionId!==qaVersionId||check()>=handoff.initialC1)fail();
  if(check()<handoff.initialC0)return pending();
  const control=await readFiniteCleanupControl({storage:{get},...x});check();
  const qualified=await readCommittedPrivateQaFiniteOriginalRecoveryHandoff({tx,control,check});
  if(!qualified||!same(qualified.record,handoff))fail();
  const receipt=await readFiniteCoupledTerminalReceipt({...qualified,tx,check});
  const alarm=await tx.getAlarm();check();
  if(!receipt||alarm!==null)return pending();
  const prefix='afw.qa-finite-trial.v1:'+x.intentId+':effect:qa_restore';
  if(await get(prefix)!==undefined||check()>=handoff.initialC1)fail();
  const {qaLive,qaClosed}=control.plan.deployments,backup=pinnedTarget(qaClosed);
  let noticeEvidence;
  if(receipt.restoration.kind==='prior'&&receipt.businessPrimary){
   const raw=await get('afw.qa-finite-cleanup.v1:'+x.intentId+':completion');
   if(raw?.review&&raw?.notice){
    try{
     // This is the already qualified completion behind the original close
     // receipt. Revalidate its independent custody and all four effect rows.
     const store=createPrivateQaFiniteCleanupStore({storage:{get,transaction:()=>fail()},control,now:check});
     const settled=await store.completion(),proof=await store.read();check();
     const primary=receipt.businessPrimary;
     if(settled.status==='complete'&&same(settled.receipt,raw)&&raw.canaryDeploymentId===receipt.restoration.deploymentId&&
        proof.status==='observed'&&proof.record.proof.kind==='retired_process'&&
        proof.record.proofHash===primary.proofHash&&hashFinitePrimarySnapshot(proof.record.support.primary)===primary.primaryHash){
      noticeEvidence=validateFiniteCoupledNoticeEvidence({
       purpose:'afw.finite-coupled-notice-evidence.v1',completionHash:raw.receiptHash,startAt:control.plan.T0,
       closeAt:control.plan.C0,notice:raw.notice,review:raw.review,
      },{controlHash:x.controlHash,originalRestoreFrom:handoff.initialC0});
     }
    }catch{/* A review receipt is independent of the protective rollback. */}
    check();
   }
  }
  const body=data({purpose,status:'prepared',intentId:x.intentId,controlHash:x.controlHash,
   sourceRevision:handoff.sourceRevision,handoffHash:handoff.handoffHash,ownerReceiptHash:receipt.receiptHash,
   ownerClosedAt:receipt.observedAt,restoreBefore:handoff.initialC1,
   liveQa:{versionId:qaLive.versionId,deploymentId:qaLive.deploymentId},
   closedQa:{versionId:qaClosed.versionId,configurationHash:qaClosed.configurationHash,module:qaClosed.module},
   restoredCanary:{versionId:receipt.restoration.versionId,deploymentId:receipt.restoration.deploymentId},
   backup,...(noticeEvidence?{noticeEvidence}:{}),authorizesEffects:false,operationalReadiness:false});
  return Object.freeze({...body,preparationHash:hash(body)});
 });
}
