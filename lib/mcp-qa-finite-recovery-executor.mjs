import {createHash} from 'node:crypto';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {createPrivateQaFiniteCleanupStore,readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from './mcp-qa-finite-trial-control.mjs';
import {finiteRecoveryKey,validateFiniteRecoveryRecord,validateFiniteRecoverySnapshot} from './mcp-qa-finite-recovery-record.mjs';
import {finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const ROOT='afw.qa-finite-trial.v1',fail=()=>{throw Error('Finite QA recovery executor unavailable');};
const reductions=['withdraw','close','seal','canary_restore'];
const custody=value=>typeof value==='string'&&/^[-A-Za-z0-9_]{16,4096}$/.test(value);

/** Runtime closure only. A new QA isolate recovers the original write
 * authority from the committed READY transaction and re-reads the same D1. */
export async function createPrivateQaFiniteRecoveryExecutor({ctx,env,head,compiledRevision,now=Date.now}={}){
 const h=fields(head,['purpose','intentId','controlHash','planHash']);
 if(h.purpose!==ROOT+':head')fail();
 const storage=ctx.storage,db=env.RELEASE_DB,metadata=env.AFW_QA_VERSION;
 const readCredential=env.AFW_MCP_CLOSURE_READ_TOKEN,publishCredential=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
 if(!custody(readCredential)||!custody(publishCredential))fail();
 const c=await readFiniteCleanupControl({storage,intentId:h.intentId,controlHash:h.controlHash}),p=c.plan;
 if(c.planHash!==h.planHash||p.source.revision!==compiledRevision)fail();
 const raw=JSON.stringify(p),nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:compiledRevision});
 let last=-1;
 const current=()=>{
  const at=now();
  if(!time(at)||at<last||at<p.C0||at>=p.C1||ctx.storage!==storage||env.RELEASE_DB!==db||
     env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==readCredential||
     env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishCredential||
     readPrivateQaFiniteControlIdentity({nativePin,raw}).controlHash!==c.controlHash)fail();
  last=at;return at;
 };
 const readRecord=()=>storage.transaction(async tx=>{
  const get=async key=>{current();const value=await tx.get(key);current();return value;};
  const sameControl=await readFiniteCleanupControl({storage:{get},intentId:h.intentId,controlHash:h.controlHash});
  if(!same(c,sameControl))fail();
  const prefix=ROOT+':'+h.intentId+':';
  const record=validateFiniteRecoveryRecord(await get(finiteRecoveryKey(h.intentId)),c);
  const arm=fields(await get(prefix+'control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
  const ready=fields(await get(prefix+'ready'),['controlHash','hash','value']);
  const computed=createHash('sha256').update(ROOT+':ready\n'+JSON.stringify(ready.value)).digest('hex');
  if(arm.phase!=='armed'||arm.armedAt!==record.armedAt||!time(arm.pendingAt)||arm.pendingAt>arm.armedAt||
     arm.pendingAt<p.T0||ready.controlHash!==c.controlHash||ready.hash!==record.readyHash||computed!==record.readyHash)fail();
  return record;
 });
 current();const record=await readRecord();current();
 const reader=createFiniteNativePrimaryReader({db,control:c,now:current});
 const readPrimary=async(assertCurrent=()=>{})=>{
  assertCurrent();current();
  const snapshot=await reader.read();assertCurrent();
  return validateFiniteRecoverySnapshot(snapshot,c,current());
 };
 const readRecovery=async()=>{
  const before=await readRecord();
  if(!same(record,before))fail();
  const snapshot=await readPrimary();
  if(!same(record,await readRecord()))fail();current();
  return {original:record.original,current:snapshot};
 };
 const store=createPrivateQaFiniteCleanupStore({storage,control:c,now:current});
 const effect=async kind=>{
  current();if(kind!=='canary_restore')fail();
  const retained=await store.read();current();
  if(retained.status!=='observed')fail();
  const {proofHash}=retained.record;
  return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:h.intentId,controlHash:c.controlHash,
   kind,proofHash,observedAt:current(),eligible:true,evidenceHash:hash(retained.record)};
 };
 const control=createPrivateQaFiniteTrialControl({storage,nativePin,plan:raw,now:current,timeoutMs:4800,
  readPrimary:{admission:fail,finalizer:fail,subscription:fail,process:fail,savedEvent:fail,effect}});
 const {launcherId,...qualifiedExecution}=record.execution;
 return {ctx,env,now:current,capabilities:{identity:c,readRecovery},
  control:Object.freeze({read:control.read,withdrawNominal:control.withdrawNominal,
   async claimEffect(kind){if(!reductions.includes(kind))fail();return control.claimEffect(kind);}}),
  closureSource:{readPrimary,qualifiedExecution,readReadCredential:()=>{current();return readCredential;},
   readPublishCredential:()=>{current();return publishCredential;}}};
}
