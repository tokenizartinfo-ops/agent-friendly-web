import {readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from './mcp-qa-finite-trial-control.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteData as data,finiteHex as hex,
 finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const ROOT='afw.qa-finite-trial.v1',GUARD='afw.qa-finite-guard.v1:',QA_SLOT='afw-own-successor-closure-v1',
 CANARY_SLOT='afw-own-event-first-successor-v1',WINDOW=4800;
const fail=()=>{throw Error('Finite native reduction control unavailable');};
const supported=operation=>['withdraw','close','observe','seal','observeSeal'].includes(operation);

/** The candidate canary can only read control for an already committed QA
 * reduction. This method does not claim, write, renew or grant nominal work. */
export async function readPrivateQaFiniteReductionControl({ctx,env,compiledRevision,refs,now=Date.now}={}){
 const proofKey=refs?.operation==='seal'?'planHash':'controlHash';
 const request=fields(refs,['intentId',proofKey,'operation']);
 if(!supported(request.operation)||!hex(request[proofKey])||!hex(compiledRevision,40))fail();
 const storage=ctx.storage,namespace=env.AFW_INDEPENDENT_CLOSURE,metadata=env.AFW_QA_VERSION,id=ctx.id;
 const actorId=id.toString(),version=metadata?.id;
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:compiledRevision});
 const began=now(),mono=performance.now();let last=began,finished=false,timer;
 const current=()=>{
  const at=now();
  if(finished||!time(at)||at<last||at-began>=WINDOW||performance.now()-mono>=WINDOW||
     ctx.storage!==storage||ctx.id!==id||env.AFW_INDEPENDENT_CLOSURE!==namespace||env.AFW_QA_VERSION!==metadata||
     metadata.id!==version||namespace.idFromName(QA_SLOT).toString()!==actorId)fail();
  last=at;return at;
 };
 const work=()=>storage.transaction(async tx=>{
  const get=async key=>{current();const v=await tx.get(key);current();return v;};
  let controlHash=request.controlHash;
  if(request.operation==='seal'){
   const head=fields(await get(ROOT+':head'),['purpose','intentId','controlHash','planHash']);
   if(head.purpose!==ROOT+':head'||head.intentId!==request.intentId||head.planHash!==request.planHash||!hex(head.controlHash))fail();
   controlHash=head.controlHash;
  }
  const control=await readFiniteCleanupControl({storage:{get},intentId:request.intentId,controlHash});
  const p=control.plan,at=current(),prefix=ROOT+':'+p.intentId+':';
  const identity=readPrivateQaFiniteControlIdentity({nativePin,raw:JSON.stringify(p)});
  if(p.source.revision!==compiledRevision||p.resources.actorId!==actorId||p.deployments.qaLive.versionId!==version||
     identity.controlHash!==control.controlHash||identity.planHash!==control.planHash||at<p.C0||at>=p.C1)fail();
  const state=fields(await get(prefix+'control'),['purpose','controlHash','phase','pendingAt','armedAt','withdrawnAt']);
  if(state.purpose!==ROOT+':control'||state.controlHash!==control.controlHash||state.phase!=='armed'||
     !time(state.pendingAt)||state.pendingAt<p.T0||!time(state.armedAt)||state.armedAt<state.pendingAt||
     !time(state.withdrawnAt)||state.withdrawnAt<state.armedAt||state.withdrawnAt>at)fail();
  const checkClaim=async kind=>{
   const claim=await get(prefix+'effect:'+kind),entry=await get(GUARD+p.intentId+':effect:'+kind);
   if(claim===undefined||entry===undefined)return false;
   const c=fields(claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
   const g=fields(entry,['purpose','controlHash','kind','claimHash','phase','receipt','completedAt']);
   if(c.purpose!==ROOT+':effect'||c.intentId!==p.intentId||c.controlHash!==control.controlHash||c.kind!==kind||
      c.phase!=='issued'||c.deadline!==p.C1||c.proofHash!==null||!time(c.issuedAt)||c.issuedAt<p.C0||
      c.issuedAt<state.withdrawnAt||c.issuedAt>current()||g.purpose!=='afw.finite-guard-effect.v1'||
      g.controlHash!==control.controlHash||g.kind!==kind||g.claimHash!==hash(c))fail();
   if(g.phase==='issued')return g.receipt===null&&g.completedAt===null;
   return ['observe','observeSeal'].includes(request.operation)&&g.phase==='complete'&&g.receipt!==null&&time(g.completedAt)&&
    g.completedAt>=c.issuedAt&&g.completedAt<=current()&&g.completedAt<p.C1;
  };
  const operation=request.operation==='observeSeal'?'seal':request.operation;
  const qualified=operation==='observe'?await checkClaim('withdraw')||await checkClaim('close'):await checkClaim(operation);
  if(!qualified)fail();
  const again=await readFiniteCleanupControl({storage:{get},intentId:request.intentId,controlHash}),observedAt=current();
  if(!same(again,control)||observedAt>=p.C1)fail();
  return {purpose:'afw.qa-finite-reduction-control.v1',operation:request.operation,control,observedAt,expiresAt:p.C1};
 });
 try{
  const result=await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;reject(Error('Finite native reduction control timed out'));},WINDOW);})]);
  if(current()>=result.expiresAt)fail();return result;
 }finally{finished=true;clearTimeout(timer);}
}

/** Resolve the exact QA slot from the existing private native binding. */
export async function readFiniteCanaryReductionControl({ctx,env,sourceRevision,refs,operation,now=Date.now}={}){
 const proofKey=operation==='seal'?'planHash':'controlHash',r=fields(refs,['intentId',proofKey]);
 if(!supported(operation)||!hex(r[proofKey])||!hex(sourceRevision,40))fail();
 const qa=env.AFW_FINITE_TRIAL_CONTROL,canary=env.AFW_DOSSIER_EVENTS_NODE,version=env.AFW_FINITE_TRIAL_VERSION;
 const storage=ctx.storage,id=ctx.id,actorId=id.toString();
 if(typeof qa?.get!=='function'||typeof qa?.idFromName!=='function'||typeof canary?.idFromName!=='function')fail();
 const qaId=qa.idFromName(QA_SLOT),qaActorId=qaId.toString();
 const stub=qa.get(qaId),began=now(),mono=performance.now();
 let finished=false,timer,last=began;
 const current=()=>{
  const at=now();
  if(finished||!time(at)||at<last||at-began>=WINDOW||performance.now()-mono>=WINDOW||
     ctx.storage!==storage||ctx.id!==id||env.AFW_FINITE_TRIAL_CONTROL!==qa||env.AFW_DOSSIER_EVENTS_NODE!==canary||
     env.AFW_FINITE_TRIAL_VERSION!==version||!version?.id||qa.idFromName(QA_SLOT).toString()!==qaActorId||
     canary.idFromName(CANARY_SLOT).toString()!==actorId)fail();
  last=at;return at;
 };
 const work=async()=>{
  current();const value=await stub.readFiniteCanaryReductionControl({...r,operation});
  try{
   const x=fields(data(structuredClone(value)),['purpose','operation','control','observedAt','expiresAt']);
   const control=finiteControlIdentity(x.control),p=control.plan,at=current();
   if(x.purpose!=='afw.qa-finite-reduction-control.v1'||x.operation!==operation||control[proofKey]!==r[proofKey]||
      p.intentId!==r.intentId||p.resources.actorId!==qaActorId||p.resources.containerId!==actorId||
      p.selectors.sourceRevision!==sourceRevision||p.canaryContainment.sourceRevision!==sourceRevision||
      p.canaryContainment.runtimeVersionId!==version.id||p.deployments.canaryLive.versionId!==version.id||
      x.expiresAt!==p.C1||!time(x.observedAt)||x.observedAt<p.C0||x.observedAt>at||at-x.observedAt>=WINDOW||at>=p.C1)fail();
   return control;
  }finally{value?.[Symbol.dispose]?.();}
 };
 try{
  const result=await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;reject(Error('Finite native reduction control timed out'));},WINDOW);})]);
  current();return result;
 }finally{finished=true;clearTimeout(timer);}
}
