import {createHash} from 'node:crypto';
import {resolvePrivateQaFiniteLaunchContext,readPrivateQaFiniteLaunchMaterial,readPrivateQaFiniteLaunchOperations} from './mcp-qa-finite-launch-source.mjs';
import {createPrivateQaFiniteLaunchInventory,withPrivateQaFiniteLaunchCoordinator} from './mcp-qa-finite-launch-inventory.mjs';
import {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshotUnderCoordinator} from './mcp-qa-finite-trial-control.mjs';
import {createPrivateQaFiniteTrialGuard} from './mcp-qa-finite-trial-guard.mjs';
import {validateFiniteLaunchPolicy,validateFiniteLaunchPrepared,validateFiniteChildCreateSend,validateFiniteChildCreateAck,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
import {finiteFields as fields,finiteData as data,finiteSame as same,finiteHash as hash,finiteHex as hex} from './mcp-finite-evidence.mjs';
const ROOT='afw.qa-finite-trial.v1',JOURNAL='afw.qa-finite-child-create.v1:',GUARD='afw.qa-finite-guard.v1:';
const fail=()=>{throw Error('Finite launch unavailable');};
const result=(status,extra={})=>data({status,...extra,mayRetry:false,authorizesEffects:false,operationalReadiness:false});
const digest=(domain,value)=>createHash('sha256').update(domain+'\n'+JSON.stringify(value)).digest('hex');
const sorted=rows=>[...rows].sort(([a],[b])=>a<b?-1:a>b?1:0);
function method(object,key){
 for(let p=object,n=0;p&&n<32;p=Object.getPrototypeOf(p),n++){
  const d=Object.getOwnPropertyDescriptor(p,key);if(d){if(!Object.hasOwn(d,'value')||typeof d.value!=='function')fail();return d.value;}
 }fail();
}
function own(object,key){const d=Object.getOwnPropertyDescriptor(object??{},key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
/** Fixed native entry only. The ONE parent is created before hydration by the DO.
 * All phase narrowing retains that exact parent/context/start. No caller-supplied
 * source, binding, prepared receipt or successful DTO is accepted. */
export async function runPrivateQaFiniteLaunchOperation(options){
 let active=true,timer,abort,stop,phaseEnd=Infinity;
 try{
  const {ctx,env,operation,refs,parent}=fields(options,['ctx','env','operation','refs','parent']);
  if(!['prepare','create','read'].includes(operation))fail();
  const keys=operation==='prepare'?['intentId','sourceRevision']:['intentId','controlHash'],r=fields(refs,keys);
  if(typeof r.intentId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(r.intentId)||!hex(r[keys[1]],operation==='prepare'?40:64))fail();
  const b=fields(parent,['check','signal','deadline']);
  if(typeof b.check!=='function'||!(b.signal instanceof AbortSignal))fail();
  const storage=ctx?.storage,transaction=method(storage,'transaction'),get=method(storage,'get');
  const binding=own(env,'AFW_QA_NAMED_CONFIRMATION'),create=method(binding,'create');
  const check=()=>{
   if(!active||b.signal.aborted||ctx.storage!==storage||method(storage,'transaction')!==transaction||method(storage,'get')!==get||own(env,'AFW_QA_NAMED_CONFIRMATION')!==binding||method(binding,'create')!==create||['check','signal','deadline'].some(k=>parent[k]!==b[k]))fail();
   const at=b.check();if(at>=Math.min(b.deadline,phaseEnd))fail();return at;
  };
  const timeout=new Promise((_,reject)=>{stop=()=>{active=false;reject(Error('Finite launch unavailable'));};});
  const narrow=end=>{phaseEnd=Math.min(phaseEnd,end);clearTimeout(timer);timer=setTimeout(stop,Math.min(b.deadline,phaseEnd)-check());};
  abort=stop;b.signal.addEventListener('abort',abort,{once:true});narrow(b.deadline);
  const work=async()=>{
   check();const context=await resolvePrivateQaFiniteLaunchContext({ctx,env,refs:r,parent});check();
   const material=await readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent});check();
   const m=fields(material,['ctx','env','plan','request','execution']);
   if(m.ctx!==ctx||m.env!==env||typeof m.plan!=='string'||typeof m.request!=='function')fail();
   const rawPlan=JSON.parse(m.plan);validateFiniteLaunchPolicy({T0:rawPlan.T0,launchPolicy:rawPlan.launchPolicy});
   narrow(operation==='prepare'?rawPlan.launchPolicy.armAckBy:operation==='create'?rawPlan.launchPolicy.lastCreateAt:rawPlan.R1);
   const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:rawPlan.source.revision});
   const snapshot=async()=>{check();const s=await readPrivateQaFiniteControlSnapshotUnderCoordinator({storage,nativePin,plan:m.plan,parent});check();return s;};
   const initial=await snapshot(),c=initial.control,p=c.plan,execution=fields(m.execution,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash','launcherId']);
   if(p.intentId!==r.intentId||(operation==='prepare'?p.source.revision!==r.sourceRevision:c.controlHash!==r.controlHash)||execution.intentId!==p.intentId||execution.controlHash!==c.controlHash||execution.sourceRevision!==p.source.revision||execution.moduleHash!==p.source.moduleHash||execution.confirmationId!==p.workflows.confirmation||execution.observerId!==p.workflows.bootstrap||execution.launcherId!==p.workflows.launcher||!hex(execution.admissionHash))fail();
   const prefix=JOURNAL+p.intentId+':',coordinator={ctx,env,context,parent};
   const facts=s=>({prepared:s.prepared,send:s.send,ack:s.ack,nativeCreateAcknowledged:s.ack!==null});
   if(operation==='read')return result('observed',facts(initial));
   if(operation==='create'&&initial.send)return result(initial.ack?'acknowledged':'issued',facts(initial));
   const supplied=await readPrivateQaFiniteLaunchOperations({ctx,env,context,parent});check();
   const {controlPrimary,guardActions}=fields(supplied,['controlPrimary','guardActions']);
   const primary=fields(controlPrimary,['admission','finalizer','subscription','process','savedEvent','effect','nominal']);
   if(Object.values(primary).some(v=>typeof v!=='function'))fail();
   const actions=fields(guardActions,['readPrimary','withdraw','close','seal','proof','canary_restore']);
   // The source producer owns real setup/launcher/primary/custody qualification.
   // Actual fixed enumeration and absence qualification remain part of prepare.
   const inventory=await createPrivateQaFiniteLaunchInventory(coordinator);check();
   const readPrimary={...primary,admission:async()=>{
    check();const observation=await inventory.observeBeforeCreation();check();
    if(observation.kind!=='never_issued')fail();
    const value=await primary.admission();check();return value;
   }};
   const control=createPrivateQaFiniteTrialControl({storage,nativePin,plan:m.plan,readPrimary,now:check,timeoutMs:Math.max(1,Math.min(b.deadline,phaseEnd)-check())});
   const eligible=s=>{
    if(!s.state||s.state.phase!=='armed'||s.state.withdrawnAt!==null||s.cleanupStarted||s.sealed||s.guard?.state!=='armed'||s.guard.deliveries!==0||s.guard.nextAt!==p.C0||s.alarm!==p.C0)fail();
   };
   // Compare complete validated commitments INSIDE the append transaction.
   // Await actual transaction settlement: outer coordinator alone bounds caller.
   const append=async(kind,record,expected,critical)=>{
    critical();const status=await transaction.call(storage,async tx=>{
     critical();
     const list=async prefix=>{const rows=await tx.list({prefix,limit:65});critical();if(!(rows instanceof Map)||rows.size>64)fail();return rows;};
     const controlRows=await list(ROOT+':'),guardRows=await list(GUARD),journalRows=await list(JOURNAL);
     const alarm=await tx.getAlarm();critical();
     if(digest('afw.qa-finite-control-snapshot.v1',{controlRows:sorted(controlRows),guardRows:sorted(guardRows),alarm})!==expected.controlSnapshotHash||digest('afw.qa-finite-launch-journal-snapshot.v1',sorted(journalRows))!==expected.journalSnapshotHash)fail();
     if(journalRows.has(prefix+kind))return false;
     critical();await tx.put(prefix+kind,record);critical();return true;
    });critical();return status;
   };
   if(operation==='prepare'){
    if(initial.state||initial.prepared||initial.send)fail();
    // Never hold the SEND coordinator while this control awaits its inventory.
    const armed=await control.prepare();check();if(armed.status!=='armed')fail();
    const state=await snapshot();if(state.control.controlHash!==c.controlHash)fail();
    const guard=createPrivateQaFiniteTrialGuard({ctx,env,control,capabilities:{identity:state.control,...actions},now:check});
    const guarded=await guard.arm();check();if(guarded.status!=='armed'||guarded.nextAt!==p.C0)fail();
    const guardedState=await snapshot();eligible(guardedState);
    const claim=await control.claimEffect('nominal');check();if(claim.status!=='issued'||claim.controlHash!==c.controlHash)fail();
    return await withPrivateQaFiniteLaunchCoordinator(coordinator,async current=>{
     const critical=()=>{current();return check();};critical();
     const state=await snapshot();critical();eligible(state);
     if(state.prepared||state.send||!same(state.nominalClaim,claim.claim))fail();
     const prepared=validateFiniteLaunchPrepared({purpose:'afw.qa-finite-launch-prepared.v1',intentId:p.intentId,finitePlanHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash:p.bundleHash,nominalClaimHash:digest(ROOT+':effect',claim.claim),guardStateHash:hash(state.guard),preparedAt:critical(),...p.launchPolicy});
     if(!await append('prepared',prepared,state,critical))fail();critical();
     const readback=await snapshot();critical();eligible(readback);
     if(!same(readback.prepared,prepared)||!same(readback.nominalClaim,claim.claim))fail();
     return result('prepared',{prepared:readback.prepared});
    });
   }
   if(check()<p.launchPolicy.launchAt||!initial.prepared)fail();
   // Full protected source observation before acquiring the SEND slot. All native
   // create writers share that slot; a competing sender is caught by fresh state.
   const observation=await inventory.observeBeforeCreation();check();
   if(observation.kind!=='never_issued'||observation.phase!=='prelaunch')fail();
   const bindingIdentity={accountId:'85d0d5dadac3341a564f22ce885e9eec',bindingName:'AFW_QA_NAMED_CONFIRMATION',className:'PrivateQaNamedConfirmation',definitionName:'afw-own-qa-private-confirmation',qaVersionId:p.deployments.qaLive.versionId,scriptName:'agent-friendly-web-independent-closure-qa',sourceModuleHash:p.source.moduleHash,sourceProfileHash:p.source.profileHash,sourceRevision:p.source.revision};
   const bindingHash=digest('afw.finite-native-child-binding.v1',Object.fromEntries(Object.keys(bindingIdentity).sort().map(k=>[k,bindingIdentity[k]])));
   return await withPrivateQaFiniteLaunchCoordinator(coordinator,async current=>{
    const critical=()=>{current();const at=check();if(at<p.launchPolicy.launchAt)fail();return at;};
    const fresh=async()=>{
     critical();const value=await control.readLaunchControl();critical();
     if(value.status!=='observed'||value.value.controlHash!==c.controlHash||value.value.claimHash!==initial.prepared.nominalClaimHash)fail();
     // Retain current consent through every later await, including this storage
     // snapshot. narrow() only reduces the SAME invocation bound; later primary
     // evidence cannot widen it or renew the original parent/context.
     narrow(value.value.consent.expiresAt);
     const state=await snapshot();critical();eligible(state);
     if(!same(state.prepared,initial.prepared)||!same(state.nominalClaim,value.value.claim))fail();return state;
    };
    let state=await fresh();critical();
    if(state.send)return result(state.ack?'acknowledged':'issued',facts(state));
    if(state.controlSnapshotHash!==observation.controlSnapshotHash||state.journalSnapshotHash!==observation.journalSnapshotHash)fail();
    const prepared=state.prepared;
    const send=validateFiniteChildCreateSend({purpose:'afw.qa-finite-child-create-send.v1',...Object.fromEntries(['intentId','finitePlanHash','controlHash','sourceRevision','qaVersionId','actorId','launcherId','nominalId','bundleHash','nominalClaimHash'].map(k=>[k,prepared[k]])),preparedHash:hashFiniteLaunchRecord(prepared),bindingHash,issuedAt:critical(),deadline:p.launchPolicy.lastCreateAt});
    // This local capability exists only after a NEW acknowledged transaction.
    let once=await append('send',send,state,critical);critical();if(!once)fail();
    state=await snapshot();critical();if(!same(state.send,send)||state.ack)fail();
    state=await fresh();critical();if(!same(state.send,send)||state.ack)fail();
    if(!once)fail();once=false;
    const response=await Reflect.apply(create,binding,[{id:p.workflows.confirmation,params:{planHash:p.bundleHash}}]);critical();
    // Native WorkflowInstance has additional methods; only exact original ID
    // acknowledgement is relevant. It does not prove execution or termination.
    if(response?.id!==p.workflows.confirmation)fail();
    const ack=validateFiniteChildCreateAck({purpose:'afw.qa-finite-child-create-ack.v1',intentId:p.intentId,controlHash:c.controlHash,sendHash:hashFiniteLaunchRecord(send),nominalId:p.workflows.confirmation,acknowledgedAt:critical()});
    state=await snapshot();critical();eligible(state);if(!same(state.send,send)||state.ack)fail();
    if(!await append('ack',ack,state,critical))fail();critical();
    const readback=await snapshot();critical();if(!same(readback.send,send)||!same(readback.ack,ack))fail();
    return result('acknowledged',facts(readback));
   });
  };
  return await Promise.race([work(),timeout]);
 }catch{return result('admin_pending');}
 finally{active=false;clearTimeout(timer);if(abort)options?.parent?.signal?.removeEventListener('abort',abort);}
}
