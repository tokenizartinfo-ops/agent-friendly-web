import {finiteCanaryRestorationBody} from './mcp-qa-finite-canary-restorer.mjs';
import {createPrivateQaFiniteCleanupStore,readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {readCommittedPrivateQaFiniteOriginalAlarmHandoff,readFiniteOriginalAlarmHandoff} from './mcp-qa-finite-alarm-handoff.mjs';
import {finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const SLOT='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite original restoration evidence unavailable');};

/** Read historic evidence under the due original window. No primary provider
 * claim, original cleanup completion, or authority to send another request. */
export async function readPrivateQaFiniteBusinessRestoreEvidence({ctx,env,check}){
 const storage=ctx?.storage,get=storage?.get,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id;
 const actor=ctx?.id,actorId=actor?.toString(),namespace=env?.AFW_INDEPENDENT_CLOSURE,idFromName=namespace?.idFromName;
 if(typeof check!=='function'||typeof get!=='function'||typeof idFromName!=='function')fail();
 let previous=-1,handoff;
 const current=()=>{
  const at=check();
  if(!time(at)||at<previous||ctx.storage!==storage||storage.get!==get||ctx.id!==actor||actor.toString()!==actorId||
     env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.AFW_INDEPENDENT_CLOSURE!==namespace||
     namespace.idFromName!==idFromName||idFromName.call(namespace,SLOT).toString()!==actorId||
     handoff&&(at<handoff.initialC0||at>=handoff.initialC1))fail();
  previous=at;
  return at;
 };
 const read=async key=>{current();const value=await get.call(storage,key);current();return value;};
 current();
 handoff=await readCommittedPrivateQaFiniteOriginalAlarmHandoff({tx:{get:read},check:current});
 if(!handoff||handoff.actorId!==actorId||handoff.qaVersionId!==qaVersionId)fail();
 current();
 const {intentId,controlHash,handoffHash}=handoff;
 const view={get:read,transaction:()=>fail()};
 const prefix='afw.qa-finite-cleanup.v1:'+intentId+':';
 const claimKey='afw.qa-finite-trial.v1:'+intentId+':effect:canary_restore';
 const guardKey='afw.qa-finite-guard.v1:'+intentId+':effect:canary_restore';
 const sendKey='afw.qa-finite-canary.v1:'+intentId+':send';
 const inspect=async()=>{
  const control=await readFiniteCleanupControl({storage:view,intentId,controlHash});
  readFiniteOriginalAlarmHandoff(handoff,control);
  const [send,claim,guard,completion]=await Promise.all([read(sendKey),read(claimKey),read(guardKey),read(prefix+'completion')]);
  if([send,claim,guard,completion].every(v=>v===undefined))return {kind:'no_restore',handoffHash};
  if([send,claim,guard,completion].some(v=>v===undefined))return {kind:'ambiguous',handoffHash};
  const stored=await createPrivateQaFiniteCleanupStore({storage:view,control}).completion();
  if(stored.status!=='complete'||!same(stored.receipt,completion))fail();
  const body=finiteCanaryRestorationBody(control.plan);
  fields(send,['purpose','controlHash','proofHash','claimHash','bodyHash','issuedAt']);
  if(send.purpose!=='afw.finite-canary-send.v1'||send.controlHash!==controlHash||send.proofHash!==completion.proofHash||
     send.claimHash!==hash(claim)||send.bodyHash!==hash(body)||!time(send.issuedAt)||
     send.issuedAt<handoff.C0||send.issuedAt<claim.issuedAt||send.issuedAt>guard.receipt.observedAt||
     send.issuedAt>=handoff.C1)fail();
  return {kind:'retained',handoffHash,versionId:completion.canaryVersionId,deploymentId:completion.canaryDeploymentId,
   annotation:body.annotations['workers/message'],completionHash:completion.receiptHash,sendHash:hash(send)};
 };
 const first=await inspect(),second=await inspect();
 const again=await readCommittedPrivateQaFiniteOriginalAlarmHandoff({tx:view,check:current});
 if(!same(first,second)||!same(handoff,again))fail();
 return Object.freeze(second);
}
