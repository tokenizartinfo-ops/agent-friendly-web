import {assertPrivateQaFiniteLaunchDispatchWired} from './mcp-qa-finite-launch-source.mjs';
import {assertPrivateQaFiniteNativeGuardMounted} from './mcp-qa-finite-trial-guard.mjs';
import {FINITE_LAUNCHER_OPERATION} from './mcp-qa-finite-launcher.mjs';
import {finiteLauncherInstanceId} from './mcp-qa-finite-launch-records.mjs';
import {readFiniteOwnerCleanupScope} from './mcp-qa-finite-owner-cleanup-scope.mjs';
import {stagePrivateQaFiniteOriginalAlarmHandoff} from './mcp-qa-finite-alarm-handoff.mjs';
import {FINITE_PREPARATION_CLEANUP_PREFIX as ENROLLMENT,decodeFinitePreparationCleanupRecord as decodeEnrollment} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {createPrivateQaFiniteLaunchPermission} from './mcp-qa-finite-launch-permission.mjs';
import {createPrivateQaFiniteBusinessPrimary} from './mcp-qa-finite-business-primary.mjs';
import {readPrivateQaFiniteLaunchReady} from './mcp-qa-finite-launch-ready.mjs';
import {readPrivateQaFiniteSharedOrigin} from './mcp-qa-finite-shared-origin.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {FINITE_ACCOUNT,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteData as data,finiteFields as fields,finiteHex as hex,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';

const compiledRevision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const definition=AFW_FIXED_WORKFLOWS.find(workflow=>workflow.className==='PrivateQaBootstrap');
const roots=AFW_FIXED_WORKFLOWS.map(workflow=>'/workflows/'+workflow.name);
const launcherRoot='/workflows/'+definition.name;
const contexts=new WeakMap();
const fail=()=>{throw Error('Finite native launch material unavailable');};

async function stageOriginalAlarm({storage,native,signal,check}){
 const {initialAnchors:a,control,setupReceiptHash,selectionHash}=native;
 const {capsule,plan,state,zero}=a,p=control.plan,prepId=capsule.preconnectionId;
 const lease=Object.freeze({signal,assertCurrent:check});
 check();
 const [enrollmentRaw,ackRaw,scope]=await Promise.all([
  storage.get(ENROLLMENT+'enrollment'),storage.get(ENROLLMENT+'ack'),readFiniteOwnerCleanupScope({storage,preconnectionId:prepId},lease)
 ]);check();
 const enrollment=decodeEnrollment('Enrollment',enrollmentRaw),ack=decodeEnrollment('Ack',ackRaw);
 if(!scope||scope.prepId!==prepId||scope.sourceRevision!==p.source.revision||scope.approvedAt>p.T0||
    p.C0!==p.T0+scope.startAfterMs||p.C1!==p.T0+scope.endAfterMs||state.recordHash!==zero.recordHash||a.alarm!==plan.C0||
    enrollment.capsuleHash!==capsule.capsuleHash||enrollment.planHash!==plan.recordHash||
    enrollment.armAckHash!==a.records['arm-ack'].recordHash||enrollment.activationCompletionHash!==a.records['activation-completion'].recordHash||
    enrollment.entryHash!==a.entry.entryHash||enrollment.materialHash!==capsule.materialHash||
    enrollment.actorId!==p.resources.actorId||enrollment.preconnectionId!==prepId||enrollment.sourceRevision!==p.source.revision||
    enrollment.sourceTree!==p.source.tree||enrollment.qaVersionId!==p.deployments.qaLive.versionId||
    enrollment.C0!==plan.C0||enrollment.C1!==plan.C1||enrollment.baselineVersionId!==plan.baselineVersionId||
    enrollment.baselineDeploymentId!==plan.baselineDeploymentId||
    ack.enrollmentHash!==enrollment.recordHash||ack.stateHash!==zero.recordHash||ack.alarmAt!==plan.C0||
    ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline)fail();
 return stagePrivateQaFiniteOriginalAlarmHandoff({storage,control,check,source:{
  prepId,capsuleHash:capsule.capsuleHash,initialPlanHash:plan.recordHash,initialStateHash:zero.recordHash,
  enrollmentHash:enrollment.recordHash,setupReceiptHash,selectionHash,cleanupScopeHash:scope.scopeHash,initialC0:plan.C0,initialC1:plan.C1
 }});
}

export const privateQaFiniteLaunchSource=Object.freeze({
 async resolve({ctx,env,refs,parent}){
  const hasRevision=Object.hasOwn(refs,'sourceRevision');
  const x=fields(refs,['intentId',hasRevision?'sourceRevision':'controlHash']);
  if(!hex(compiledRevision,40)||hasRevision&&x.sourceRevision!==compiledRevision||!hasRevision&&!hex(x.controlHash))fail();
  const storage=ctx.storage,fetcher=globalThis.fetch,credential=env.AFW_MCP_CLOSURE_READ_TOKEN;
  const signal=parent.signal,clock=parent.check,deadline=parent.deadline;
  const check=()=>{
   const now=clock();
   if(signal.aborted||parent.signal!==signal||parent.check!==clock||parent.deadline!==deadline||now>=deadline||
      ctx.storage!==storage||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential)fail();
   return now;
  };
  check();
  const native=await readPrivateQaFiniteSharedOrigin({ctx,env,refs:{intentId:x.intentId,sourceRevision:compiledRevision},parent});check();
  const {control,external,planRaw}=native,plan=control.plan;
  if(!hasRevision&&x.controlHash!==control.controlHash)fail();
  const permit=createPrivateQaFiniteLaunchPermission({ctx,env,control,parent});
  const [ready]=await Promise.all([readPrivateQaFiniteLaunchReady({external,parent}),permit()]);check();
  if(ready.planHash!==control.planHash)fail();
  const alarmHandoff=hasRevision?await stageOriginalAlarm({storage,native,signal,check}):null;check();
  const execution=Object.freeze({intentId:plan.intentId,controlHash:control.controlHash,sourceRevision:compiledRevision,
   moduleHash:plan.source.moduleHash,confirmationId:plan.workflows.confirmation,observerId:plan.workflows.bootstrap,
   admissionHash:hash(external),launcherId:plan.workflows.launcher});

  const request=async(input,callerCheck)=>{
   const {method,path,query:rawQuery,signal:callerSignal}=fields(input,['method','path','query','signal']);
   const query=rawQuery??{};
   const current=()=>{check();callerCheck();};
   if(method!=='GET'||callerSignal!==signal||typeof callerCheck!=='function'||!query||Object.getPrototypeOf(query)!==Object.prototype)fail();
   const enumerate=roots.some(root=>path===root+'/instances');
   const version=path.startsWith(launcherRoot+'/versions/')&&finiteUuid(path.slice((launcherRoot+'/versions/').length));
   const entry=path===launcherRoot+'/instances/'+execution.launcherId;
   if(!(path==='/workflows'||roots.includes(path)||enumerate||version||entry))fail();
   const keys=Object.keys(query);
   if(keys.some(k=>!['per_page','page','direction','cursor'].includes(k))||query.per_page!==undefined&&query.per_page!==100||
      query.page!==undefined&&(!Number.isSafeInteger(query.page)||query.page<1||query.page>4||path!=='/workflows')||query.direction!==undefined&&query.direction!=='desc'||query.cursor!==undefined&&
      (typeof query.cursor!=='string'||!query.cursor||Buffer.byteLength(query.cursor)>1024||/[\x00-\x20\x7f]/.test(query.cursor))||
      keys.length&&!(path==='/workflows'||enumerate))fail();
   current();const queryString=new URLSearchParams(query).toString();
   const wire=finiteSeedWire({fetchImpl:fetcher,now:check,signal,credential,origin:'https://api.cloudflare.com/client/v4',check:current,requests:1,limit:262144});
   try{
    const {value,status}=await wire.request('/accounts/'+FINITE_ACCOUNT+path+(queryString?'?'+queryString:''));
    finiteCfEnvelope(value);current();return {...value,status};
   }finally{wire.close();}
  };
  const businessPrimary=Object.freeze({
   ...createPrivateQaFiniteBusinessPrimary({ctx,env,control:{plan,planHash:control.planHash,controlHash:control.controlHash},now:check}),
   // Reuse only the provider observation verified by this invocation and
   // enforce its original age and deadline at every consumer.
   async finalizer(){
    const at=check();
    if(ready.planHash!==control.planHash||!time(ready.observedAt)||ready.observedAt>at||at-ready.observedAt>5000)fail();
    return ready;
   },
  });
  const token=Object.freeze({});
  contexts.set(token,{parent,check,permit,value:Object.freeze({ctx,env,plan:planRaw,request,execution,businessPrimary,...(alarmHandoff?{alarmHandoff}:{})})});
  return token;
 },
 async read({ctx,env,context,parent}){
  const entry=contexts.get(context);
  if(!entry||entry.parent!==parent||entry.value.ctx!==ctx||entry.value.env!==env)fail();
  entry.check();await entry.permit();entry.check();return entry.value;
 },
});

/** The finite QA actor is the sole native sender after GitHub READY.
 * The journal is durable before create. An ambiguous create is never replayed. */
export async function schedulePrivateQaFiniteNominalLauncher({ctx,env,refs,now=Date.now}={}){
 const defaultResult=status=>Object.freeze({status,operationalReadiness:false});
 const entered=now(),mono=performance.now(),deadline=entered+4800,controller=new AbortController();
 const {signal}=controller;
 let claimed=false,timer,last=entered,finished=false;
 try{
  const x=fields(refs,['intentId','sourceRevision','controlHash']);
  if(!hex(x.intentId)||!hex(x.controlHash)||!hex(compiledRevision,40)||x.sourceRevision!==compiledRevision)fail();
  const ns=env.AFW_INDEPENDENT_CLOSURE,actor=ctx.id,storage=ctx.storage,workflow=env.AFW_QA_BOOTSTRAP,version=env.AFW_QA_VERSION;
  const fetcher=globalThis.fetch,credential=env.AFW_MCP_CLOSURE_READ_TOKEN;
  if(typeof workflow?.create!=='function'||typeof storage?.transaction!=='function'||typeof storage?.sync!=='function'||
     !finiteUuid(version?.id)||typeof credential!=='string')fail();
  const check=()=>{
   const at=now();
   if(finished||signal.aborted||!time(at)||at<last||at>=deadline||performance.now()-mono>=deadline-entered||
      ctx.storage!==storage||ctx.id!==actor||env.AFW_INDEPENDENT_CLOSURE!==ns||env.AFW_QA_BOOTSTRAP!==workflow||
      env.AFW_QA_VERSION!==version||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher||
      ns.idFromName('afw-own-successor-closure-v1').toString()!==actor.toString())fail();
   last=at;return at;
  };
  const parent=Object.freeze({signal,deadline,check});
  const work=async()=>{
   check();
   assertPrivateQaFiniteLaunchDispatchWired();
   assertPrivateQaFiniteNativeGuardMounted();
   const {external,control,setupReceiptHash,initialAnchors}=await readPrivateQaFiniteSharedOrigin({ctx,env,refs:{intentId:x.intentId,sourceRevision:x.sourceRevision},parent});
   const p=control.plan,until=p.launchPolicy.armAckBy;
   const current=()=>{const at=check();if(at<p.T0||at>=until||p.deployments.qaLive.versionId!==version.id)fail();return at;};
   if(p.intentId!==x.intentId||p.source.revision!==x.sourceRevision||control.controlHash!==x.controlHash||
      !hex(setupReceiptHash)||!hex(initialAnchors?.plan?.recordHash)||initialAnchors?.alarm!==initialAnchors?.plan?.C0)fail();
   current();
   const permit=createPrivateQaFiniteLaunchPermission({ctx,env,control,parent});
   const wire=finiteSeedWire({fetchImpl:fetcher,now:current,signal,credential,origin:'https://api.cloudflare.com/client/v4',check:current,requests:1,limit:32768});
   let ready,definitionRead,permission;
   try{
    [ready,definitionRead,permission]=await Promise.all([readPrivateQaFiniteLaunchReady({external,parent}),
     wire.request('/accounts/'+FINITE_ACCOUNT+launcherRoot),permit()]);
   }finally{wire.close();}
   current();
   const d=finiteCfEnvelope(definitionRead.value);
   if(ready.planHash!==control.planHash||!hex(ready.evidenceHash)||permission.valid!==true||permission.expiresAt<=current()||
      d?.id!==definition.id||d.name!==definition.name||d.script_name!==definition.script||d.class_name!==definition.className||
      d.script_deleted===true||d.schedules!==undefined&&(!Array.isArray(d.schedules)||d.schedules.length))fail();
   const id=p.workflows.launcher,params={operation:FINITE_LAUNCHER_OPERATION,intentId:x.intentId,sourceRevision:x.sourceRevision};
   if(id!==finiteLauncherInstanceId({intentId:x.intentId,sourceRevision:x.sourceRevision}))fail();
   const key='afw.qa-finite-native-launcher-dispatch.v1:'+id;
   const body=data({purpose:'afw.qa-finite-native-launcher-dispatch.v1',...x,id,qaVersionId:version.id,
    readyHash:ready.evidenceHash,setupReceiptHash,originalPlanHash:initialAnchors.plan.recordHash,armAckBy:until});
   if(await storage.getAlarm()!==initialAnchors.plan.C0)fail();
   current();claimed=true;
   const written=await storage.transaction(async tx=>{
    current();const old=await tx.get(key);current();
    if(old!==undefined){if(!same(old,body))fail();return false;}
    if(await tx.getAlarm()!==initialAnchors.plan.C0)fail();current();
    await tx.put(key,body);current();return true;
   });current();
   if(!written)return defaultResult('recorded');
   await storage.sync();current();
   if(!same(await permit(),permission))fail();
   current();
   const [retained,armedAt]=await Promise.all([storage.get(key),storage.getAlarm()]);current();
   if(!same(retained,body)||armedAt!==initialAnchors.plan.C0)fail();
   const instance=await workflow.create({id,params});
   try{current();if(instance?.id!==id)fail();}finally{instance?.[Symbol.dispose]?.();}
   return defaultResult('acknowledged');
  };
  return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Finite QA launch dispatch stopped'));},4800);})]);
 }catch{return defaultResult(claimed?'uncertain':'pending');}
 finally{finished=true;clearTimeout(timer);controller.abort();}
}
