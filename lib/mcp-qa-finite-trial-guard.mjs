import {createPrivateQaFiniteTrialNativePin} from './mcp-qa-finite-trial-control.mjs';
import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteData as data,finiteSame as same,finiteControlIdentity} from './mcp-finite-evidence.mjs';
import {createPrivateQaFiniteCleanupStore} from './mcp-qa-finite-cleanup-store.mjs';
const PREFIX='afw.qa-finite-guard.v1:',SLOT='afw-own-successor-closure-v1';
const EFFECTS=['withdraw','close','seal','canary_restore'];
const fail=()=>{throw Error('Finite cleanup guard unavailable');};
const out=(status,extra={})=>Object.freeze({status,...extra,mayRetry:false,authorizesEffects:false,operationalReadiness:false});
let nativeFactory;
/** Source composition only, never an RPC or env-selected callback. Task4's
 * compiled native constructor supplies actual binding/source-qualified caps. */
export function installPrivateQaFiniteNativeGuardFactory(factory){if(nativeFactory||typeof factory!=='function')fail();nativeFactory=factory;}
function primary(value,c,at,arming){
 const v=data(value),p=c.plan;
 if(v.purpose!=='afw.qa-finite-primary.v1'||v.intentId!==p.intentId||v.planHash!==c.planHash||v.sourceRevision!==p.source.revision||v.runtimeVersionId!==p.deployments.qaLive.versionId||v.actorId!==p.resources.actorId||!time(v.observedAt)||v.observedAt>at||at-v.observedAt>5000||v.legacyControlHash!==p.legacy.controlHash||v.legacyPreparedHash!==p.legacy.preparedDispatchHash||v.legacyReductionHash!==p.legacy.reductionDispatchHash||v.legacySourceHash!==p.legacy.sourceHash||v.retainedUncertainty!==true)fail();
 const x=fields(v.containment,['entrypoint','finiteEntrypoint','sourceRevision','runtimeVersionId','sourceHash','profileHash','bindingsHash','denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired','evidenceHash']);
 if(x.entrypoint!=='legacy_saved_event'||x.finiteEntrypoint!=='finite_trial_event'||x.sourceRevision!==p.canaryContainment.sourceRevision||x.runtimeVersionId!==p.canaryContainment.runtimeVersionId||x.sourceHash!==p.canaryContainment.moduleHash||x.profileHash!==p.canaryContainment.profileHash||x.bindingsHash!==p.canaryContainment.bindingsHash||!hex(x.evidenceHash)||['denyBeforeAccess','enteredWritersIsolated','signedPacketsFenced','separateLegacyWritersTerminal','legacyGrantRevoked','legacyMonitorExpired'].some(k=>x[k]!==true))fail();
 const q=fields(v.quiescence,['currentWriters','newScopeWriters','unresolvedWrites','completeInventory','inventoryHash','receiptsHash','snapshotHash']);
 if(q.completeInventory!==true||['inventoryHash','receiptsHash','snapshotHash'].some(k=>!hex(q[k]))||['currentWriters','newScopeWriters','unresolvedWrites'].some(k=>!Number.isSafeInteger(q[k])||q[k]<0||arming&&q[k]!==0))fail();return v;
}
function effectReceipt(kind,value,c,proofHash){
 const r=data(value),p=c.plan;
 if(kind==='withdraw'){
  fields(r,['purpose','monitoringWithdrawn','readWithdrawn','permissionsWithdrawn','runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness']);
  if(r.purpose!=='afw.own-permissions-only-reduction.v1'||r.monitoringWithdrawn!==true||r.readWithdrawn!==true||r.permissionsWithdrawn!==true||['runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness'].some(k=>r[k]!==false))fail();
 }else if(kind==='close'){fields(r,['closed','runtimeStopRequested']);if(r.closed!==true||r.runtimeStopRequested!==true)fail();}
 else if(kind==='seal'){fields(r,['sealHash','sealedAt']);if(!hex(r.sealHash)||!time(r.sealedAt)||r.sealedAt<p.T0||r.sealedAt>=p.C1)fail();}
 else{
  fields(r,['purpose','intentId','controlHash','proofHash','versionId','deploymentId','readbackHash','observedAt']);
  if(r.purpose!=='afw.finite-canary-restored.v1'||r.intentId!==p.intentId||r.controlHash!==c.controlHash||r.proofHash!==proofHash||r.versionId!==p.deployments.canaryClosed.versionId||typeof r.deploymentId!=='string'||!(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/).test(r.deploymentId)||!hex(r.readbackHash)||!time(r.observedAt)||r.observedAt<p.C0||r.observedAt>=p.C1)fail();
 }return r;
}
/** Fixed versioned adapter of alarm-before-action / issued-before-effect
 * lifecycle. Legacy singleton keys and APIs are untouched. Third delivery
 * durably exhausts recovery before effects, matching the existing lifecycle. */
export function createPrivateQaFiniteTrialGuard({ctx,env,control,capabilities,now=Date.now}={}){
 const caps=fields(capabilities,['identity','readPrimary','withdraw','close','seal','proof','canary_restore']),c=finiteControlIdentity(caps.identity),p=c.plan;
 const storage=ctx?.storage,prefix=PREFIX+p.intentId+':',key=prefix+'state';
 if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof storage?.getAlarm!=='function'||typeof now!=='function'||typeof control?.read!=='function'||typeof control?.claimEffect!=='function'||typeof control?.withdrawNominal!=='function'||typeof caps.readPrimary!=='function'||typeof caps.proof?.read!=='function')fail();
 for(const k of EFFECTS){fields(caps[k],['execute','reconcile']);if(typeof caps[k].execute!=='function'||typeof caps[k].reconcile!=='function')fail();}
 const store=createPrivateQaFiniteCleanupStore({storage,control:c,now}),transaction=storage.transaction,get=storage.get;let last=-1,tail=Promise.resolve();
 const coherent=()=>{
  const n=now();if(!time(n)||n<p.T0||n<last||ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||Object.keys(caps).some(k=>capabilities[k]!==caps[k]))fail();last=n;
  // Captures actual native ctx/env; never normalize release flags or fake version.
  createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
  if(ctx.id.toString()!==p.resources.actorId||env.AFW_QA_VERSION.id!==p.deployments.qaLive.versionId)fail();return n;
 };
 function state(raw){
  if(raw===undefined)return null;const s=fields(raw,['purpose','controlHash','deliveries','state','nextAt']);
  if(s.purpose!=='afw.finite-guard-state.v1'||s.controlHash!==c.controlHash||!Number.isSafeInteger(s.deliveries)||s.deliveries<0||s.deliveries>3||!['armed','processing','admin_pending','complete'].includes(s.state)||s.nextAt!==null&&(!time(s.nextAt)||s.nextAt<p.C0||s.nextAt>=p.C1))fail();return s;
 }
 const serial=fn=>{const next=tail.then(fn);tail=next.catch(()=>{});return next.catch(()=>out('admin_pending'));};
 async function exactControl(){const r=await control.read();coherent();if(r.status!=='observed'||r.controlHash!==c.controlHash||r.planHash!==c.planHash||r.intentId!==p.intentId)fail();return r;}
 async function transact(fn){coherent();const result=await transaction.call(storage,async tx=>{coherent();const s=state(await tx.get(key));coherent();return fn(tx,s);});coherent();return result;}
 async function status(){const s=state(await get.call(storage,key));return out(s?.state??'unarmed',{deliveries:s?.deliveries??0,nextAt:s?.nextAt??null});}
 async function runEffect(kind,proofHash,check){
  check();let claim=await control.claimEffect(kind);check();
  if(!['issued','reconcile_only'].includes(claim.status)||claim.controlHash!==c.controlHash||claim.claim?.kind!==kind||claim.claim.controlHash!==c.controlHash||kind==='canary_restore'&&claim.claim.proofHash!==proofHash)return false;
  const claimHash=hash(claim.claim),effectKey=prefix+'effect:'+kind;let existing=await storage.get(effectKey);check();
  if(existing!==undefined){
   fields(existing,['purpose','controlHash','kind','claimHash','phase','receipt','completedAt']);
   if(existing.purpose!=='afw.finite-guard-effect.v1'||existing.controlHash!==c.controlHash||existing.kind!==kind||existing.claimHash!==claimHash||!['issued','complete'].includes(existing.phase))fail();
   if(existing.phase==='complete'){effectReceipt(kind,existing.receipt,c,proofHash);return true;}
  }
  if(claim.status==='issued'){
   if(existing!==undefined)fail();
   existing={purpose:'afw.finite-guard-effect.v1',controlHash:c.controlHash,kind,claimHash,phase:'issued',receipt:null,completedAt:null};
   await storage.transaction(async tx=>{check();if(await tx.get(effectKey)!==undefined)fail();check();await tx.put(effectKey,existing);check();});check();
   // Claim and guard journal both acknowledged before the one business send.
   try{await caps[kind].execute({claim:claim.claim,proofHash},check);}catch{/* Unknown send is reconciled only. */}
   check();
  }
  // Execution return is NOT a completion receipt. Independent read-only
  // reconciliation must establish exact settled primary effects/readback.
  const value=await caps[kind].reconcile({claim:claim.claim,proofHash},check);check();if(value===null)return false;
  const receipt=effectReceipt(kind,value,c,proofHash),completedAt=check();
  await storage.transaction(async tx=>{check();const before=await tx.get(effectKey);check();if(existing!==undefined&&!same(before,existing)||existing===undefined&&before!==undefined)fail();await tx.put(effectKey,{purpose:'afw.finite-guard-effect.v1',controlHash:c.controlHash,kind,claimHash,phase:'complete',receipt,completedAt});check();});check();return true;
 }
 return Object.freeze({
  arm:()=>serial(async()=>{
   coherent();if(coherent()>=p.C0)fail();const r=await exactControl();if(r.phase!=='armed')fail();
   primary(await caps.readPrimary(),c,coherent(),true);
   const s=await transact(async(tx,old)=>{if(old)return old;const initial={purpose:'afw.finite-guard-state.v1',controlHash:c.controlHash,deliveries:0,state:'armed',nextAt:p.C0};await tx.put(key,initial);coherent();await tx.setAlarm(p.C0);coherent();return initial;});
   if(await storage.getAlarm()!==s.nextAt)fail();coherent();return out(s.state,{deliveries:s.deliveries,nextAt:s.nextAt});
  }),
  status:()=>serial(status),
  alarm:()=>serial(async()=>{
   const entered=coherent(),mono=performance.now();if(entered>=p.C1)return out('admin_pending');
   let finished=false,timer;const check=()=>{const n=coherent();if(finished||n>=p.C1||n-entered>=30000||performance.now()-mono>=30000)fail();return n;};
   const work=async()=>{
    await exactControl();check();
    const reserved=await transact(async(tx,old)=>{
     check();const s=old??{purpose:'afw.finite-guard-state.v1',controlHash:c.controlHash,deliveries:0,state:'armed',nextAt:p.C0};
     if(s.state==='complete'||s.deliveries===3)return {done:s};
     if(check()<p.C0){await tx.setAlarm(p.C0);return {done:s};}
     const deliveries=s.deliveries+1,nextAt=deliveries<3?Math.min(p.C1-1,Math.max(check()+1000,p.C0+deliveries*60000)):null;
     const next={...s,deliveries,state:deliveries===3?'admin_pending':'processing',nextAt};
     await tx.put(key,next);check();if(nextAt!==null)await tx.setAlarm(nextAt);else {if(typeof tx.deleteAlarm!=='function')fail();await tx.deleteAlarm();}check();return {deliveries};
    });check();if(reserved.done)return out(reserved.done.state,{deliveries:reserved.done.deliveries});
    primary(await caps.readPrimary(),c,check(),false);
    const withdrawn=await control.withdrawNominal();check();if(withdrawn.status!=='withdrawn')fail();
    let settled=true;
    for(const kind of ['withdraw','close','seal'])try{if(!await runEffect(kind,null,check))settled=false;}catch{settled=false;}
    check();if(!settled)return out('admin_pending');
    const proof=await caps.proof.read(check);check();if(proof.status!=='observed')return out('admin_pending');
    // Re-read the actual retained record independently; never trust a callback's
    // successful status or fabricate evidence after the native version closes.
    const retained=await store.read();check();if(retained.status!=='observed'||!same(retained.record,proof.record))fail();
    if(!await runEffect('canary_restore',retained.record.proofHash,check))return out('admin_pending');
    const completion=await store.retainCompletion(check);check();if(completion.status!=='complete')return out('admin_pending');
    await transact(async(tx,s)=>{check();if(!s||s.deliveries!==reserved.deliveries)fail();await tx.put(key,{...s,state:'complete',nextAt:null});check();if(typeof tx.deleteAlarm!=='function')fail();await tx.deleteAlarm();check();});
    return out('complete',{receipt:completion.receipt,deliveries:reserved.deliveries});
   };
   try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(out('admin_pending'));},Math.min(30000,p.C1-entered));})]);}finally{finished=true;clearTimeout(timer);}
  })
 });
}
/** Fixed native actor dispatch. Missing source constructor is closed; Task4
 * installs it in the compiled module, never in caller payload/env normalization. */
export async function runPrivateQaFiniteTrialAlarm({ctx,env}={}){
 try{
  const ns=env.AFW_INDEPENDENT_CLOSURE;if(ctx.id.toString()!==ns.idFromName(SLOT).toString())return null;
  const head=await ctx.storage.get('afw.qa-finite-trial.v1:head');if(head===undefined)return null;
  if(!nativeFactory)return out('admin_pending');
  const options=await nativeFactory({ctx,env,head});if(options.ctx!==ctx||options.env!==env)fail();
  return createPrivateQaFiniteTrialGuard(options).alarm();
 }catch{return out('admin_pending');}
}

/** Exact GET-only nominal view for candidate children. Native factory resolves
 * actual primary consent and the existing control; RPC carries no claim bytes. */
export async function readPrivateQaFiniteNominalControl({ctx,env,refs}={}){
 const x=fields(refs,['intentId','controlHash']);
 if(ctx.id.toString()!==env.AFW_INDEPENDENT_CLOSURE.idFromName(SLOT).toString()||!nativeFactory)fail();
 const head=await ctx.storage.get('afw.qa-finite-trial.v1:head');
 if(head?.intentId!==x.intentId||head.controlHash!==x.controlHash)fail();
 const options=await nativeFactory({ctx,env,head});
 if(options.ctx!==ctx||options.env!==env||typeof options.control?.readNominalControl!=='function')fail();
 const c=finiteControlIdentity(options.capabilities.identity);
 if(c.controlHash!==x.controlHash||c.plan.intentId!==x.intentId)fail();
 createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:c.plan.source.revision});
 return options.control.readNominalControl();
}
