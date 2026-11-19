import {sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from '../lib/mcp-qa-finite-initial-cleanup-records.mjs';
import {finiteCleanupPolicyHash} from '../lib/mcp-finite-cleanup-policy.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-finite-trial-control.mjs';
import {FINITE_ALARM_HANDOFF,protectPrivateQaFiniteBusinessAlarm} from '../lib/mcp-qa-finite-alarm-handoff.mjs';
import {finiteFixture,HEAD} from './fixtures/qa-finite-trial.mjs';
import {stageAlarmFixture,useNativeAlarmIntent} from './fixtures/finite-alarm-handoff.mjs';

import {readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';
import {stagePrivateQaFiniteOriginalAlarmHandoff} from '../lib/mcp-qa-finite-alarm-handoff.mjs';

async function prepared(f=finiteFixture()){
 useNativeAlarmIntent(f);
 const options=f.options(api),handoff=await stageAlarmFixture(f,options),control=api.createPrivateQaFiniteTrialControl({...options,alarmHandoff:handoff.token});
 return {f,handoff,control};
}
test('atomic control prepare preserves original obligation and mutually links both alarms',async()=>{
 const {f,handoff,control}=await prepared();
 const result=await control.prepare();
 assert.equal(result.status,'armed');assert.equal(f.alarm,f.plan.C0);
 assert.equal(f.rows.get(HEAD).controlHash,handoff.control.controlHash);
 assert.equal(f.rows.get(FINITE_ALARM_HANDOFF).initialC0,handoff.initialC0);
 assert.equal(f.rows.get(FINITE_ALARM_HANDOFF).controlHash,f.rows.get(HEAD).controlHash);
 assert.equal((await control.prepare()).status,'blocked');
});
test('changed original alarm evidence and original issued restore deny before any business write',async()=>{
 for(const change of [
  f=>f.rows.set('afw.finite-initial-cleanup.v1:state','{}'),
  f=>f.rows.set('afw.finite-initial-cleanup.v1:restore-send','{}'),
 ]){const {f,handoff,control}=await prepared();change(f);
  assert.equal((await control.prepare()).status,'blocked');assert.equal(f.alarm,handoff.initialC0);
  assert.equal(f.rows.has(HEAD),false);assert.equal(f.rows.has(FINITE_ALARM_HANDOFF),false);
 }
});
test('native dispatch restores the original alarm before entering business and never rewrites a due original wakeup',async()=>{
 const {f,handoff,control}=await prepared();assert.equal((await control.prepare()).status,'armed');
 f.setNow(f.plan.C0+2);await f.storage.transaction(tx=>tx.setAlarm(null));
 const before=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now});
 assert.equal(before.kind,'business');assert.equal(f.alarm,handoff.initialC0);
 f.setNow(f.plan.C1+1);
 assert.equal((await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now})).kind,'waiting');
 f.setNow(handoff.initialC0);
 assert.equal((await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now})).kind,'original_due');
 assert.equal(f.alarm,handoff.initialC0);
});
test('missing alarm acknowledgement stops the dispatcher before business code can run',async()=>{
 const {f,control}=await prepared();assert.equal((await control.prepare()).status,'armed');
 f.setNow(f.plan.C0+2);f.storage.getAlarm=async()=>null;
 await assert.rejects(protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now}));
});

test('an alarm carried by a different actor cannot take over original recovery',async()=>{
 const {f,control}=await prepared();assert.equal((await control.prepare()).status,'armed');
 f.setNow(f.plan.C0+4);
 await assert.rejects(protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:'9'.repeat(64),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now}));
 assert.equal(f.alarm,f.plan.C0);
});

test('handoff refuses a different closed target before the original alarm can move',async()=>{
 const {f,handoff}=await prepared();
 const target=f.plan.deployments.canaryClosed;
 f.plan.deployments.canaryClosed={...target,configurationHash:'8'.repeat(64)};
 f.plan.closePolicyHash=finiteCleanupPolicyHash(f.plan);
 const options=f.options(api),foreign=readPrivateQaFiniteControlIdentity({nativePin:options.nativePin,raw:options.plan});
 await assert.rejects(stagePrivateQaFiniteOriginalAlarmHandoff({storage:f.storage,control:foreign,source:handoff.source,check:f.now}));
 assert.equal(f.alarm,handoff.initialC0);
 assert.equal(f.rows.has(HEAD),false);
});

test('handoff refuses an original plan pinned to a different closed deployment',async()=>{
 const {f,handoff}=await prepared();
 const key='afw.finite-initial-cleanup.v1:plan';
 const original=JSON.parse(f.rows.get(key));
 f.rows.set(key,JSON.stringify({...original,baselineDeploymentId:f.plan.deployments.canaryLive.deploymentId}));
 await assert.rejects(stagePrivateQaFiniteOriginalAlarmHandoff({storage:f.storage,control:handoff.control,source:handoff.source,check:f.now}));
 assert.equal(f.alarm,handoff.initialC0);
 assert.equal(f.rows.has(HEAD),false);
});

test('an expired original alarm keeps the obligation for administration without scheduling another delivery',async()=>{
 const {f,handoff,control}=await prepared();
 assert.equal((await control.prepare()).status,'armed');
 f.setNow(handoff.initialC1);
 await f.storage.transaction(tx=>tx.setAlarm(null));
 const keys=[...f.rows.keys()];
 const result=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now});
 assert.equal(result.kind,'original_expired');
 assert.equal(f.alarm,null);
 assert.deepEqual([...f.rows.keys()],keys);
});

test('the original recovery accepts only a due reservation descended from the sealed initial state',async()=>{
 const {f,handoff,control}=await prepared();
 assert.equal((await control.prepare()).status,'armed');
 const key='afw.finite-initial-cleanup.v1:state',zero=decode('State',f.rows.get(key));
 const one=seal('State',{planHash:zero.planHash,deliveries:1,status:'processing',nextAt:handoff.initialC0+60000,previousHash:zero.recordHash});
 f.rows.set(key,encode('State',one));
 await f.storage.transaction(tx=>tx.setAlarm(null));
 const observe=()=>protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now});
 f.setNow(handoff.initialC0-1);
 await assert.rejects(observe);
 f.setNow(handoff.initialC0+10);
 assert.equal((await observe()).kind,'waiting');
 assert.equal(f.alarm,handoff.initialC0+60000);
 f.setNow(handoff.initialC0+60001);
 await f.storage.transaction(tx=>tx.setAlarm(null));
 assert.equal((await observe()).kind,'original_due');
 const {recordHash,...state}=one;
 const foreign=seal('State',{...state,previousHash:'0'.repeat(64)});
 f.rows.set(key,encode('State',foreign));
 await assert.rejects(observe);
 assert.equal(f.alarm,null);
});

const originalRecovery=await import('../lib/mcp-qa-finite-alarm-handoff.mjs');
async function recoveryOptions(fixture){
 const {f,handoff,control}=await prepared(fixture);
 assert.equal((await control.prepare()).status,'armed');
 const base=f.storage.transaction;
 f.storage.transaction=fn=>base.call(f.storage,tx=>fn({...tx,deleteAlarm:()=>tx.setAlarm(null)}));
 f.storage.sync=async()=>{};
 await f.storage.transaction(tx=>tx.setAlarm(null));
 f.setNow(handoff.initialC0+5);
 const scope=new AbortController(),lease={signal:scope.signal,assertCurrent(){if(scope.signal.aborted)throw Error('SYN expired lease');}};
 const options=()=>({ctx:f.ctx,env:f.env,originalLease:lease,now:f.now,expectedPlanHash:handoff.source.initialPlanHash,
  expectedStateHash:decode('State',f.rows.get('afw.finite-initial-cleanup.v1:state')).recordHash});
 return {f,handoff,lease,scope,options};
}
test('original recovery reservation is exclusive, preserves the next slot and lends one scoped reduction',async()=>{
 const reserve=originalRecovery.reservePrivateQaFiniteOriginalRecovery,take=originalRecovery.takePrivateQaFiniteOriginalRecovery;
 assert.equal(typeof reserve,'function');assert.equal(typeof take,'function');
 const {f,handoff,options}=await recoveryOptions(),expected=options();
 const outcomes=await Promise.allSettled([reserve(expected),reserve(expected)]);
 assert.equal(outcomes.filter(r=>r.status==='fulfilled').length,1);
 const token=outcomes.find(r=>r.status==='fulfilled').value,slot=handoff.initialC0+60000;
 assert.equal(f.alarm,slot);
 const authority=await take(token,expected);
 assert.equal(authority.delivery,1);assert.equal(authority.stateHash,options().expectedStateHash);
 await assert.rejects(()=>take(token,expected));
 await authority.read();
 f.setNow(slot);
 assert.throws(authority.check);
});
test('original recovery reservation lost acknowledgement spends the attempt without lending a reduction',async()=>{
 const reserve=originalRecovery.reservePrivateQaFiniteOriginalRecovery;
 assert.equal(typeof reserve,'function');
 const {f,handoff,options}=await recoveryOptions();
 f.lost.add(f.transactions+1);
 await assert.rejects(()=>reserve(options()));
 const state=decode('State',f.rows.get('afw.finite-initial-cleanup.v1:state'));
 assert.equal(state.deliveries,1);
 assert.equal(f.alarm,handoff.initialC0+60000);
 await assert.rejects(()=>reserve(options()));
 assert.equal(decode('State',f.rows.get('afw.finite-initial-cleanup.v1:state')).deliveries,1);
});
test('original recovery reservation rejects a wrong physical alarm and a lost independent readback',async()=>{
 const reserve=originalRecovery.reservePrivateQaFiniteOriginalRecovery;
 assert.equal(typeof reserve,'function');
 const wrong=await recoveryOptions();
 await wrong.f.storage.transaction(tx=>tx.setAlarm(wrong.handoff.initialC0+100));
 await assert.rejects(()=>reserve(wrong.options()));
 assert.equal(decode('State',wrong.f.rows.get('afw.finite-initial-cleanup.v1:state')).deliveries,0);
 const lost=await recoveryOptions();lost.f.storage.sync=async()=>{throw Error('SYN sync lost');};
 await assert.rejects(()=>reserve(lost.options()));
 assert.equal(decode('State',lost.f.rows.get('afw.finite-initial-cleanup.v1:state')).deliveries,1);
 assert.equal(lost.f.alarm,lost.handoff.initialC0+60000);
});

test('an exhausted original recovery reservation never reopens the delivery',async()=>{
 const {f,handoff,options}=await recoveryOptions();
 f.setNow(handoff.initialC0+120001);
 const token=await originalRecovery.reservePrivateQaFiniteOriginalRecovery(options());
 const held=await originalRecovery.takePrivateQaFiniteOriginalRecovery(token,options());
 assert.equal(held.delivery,3);
 assert.equal(f.alarm,null);
 await assert.rejects(()=>originalRecovery.reservePrivateQaFiniteOriginalRecovery(options()));
 const result=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now});
 assert.equal(result.kind,'original_budget_spent');
 assert.equal(f.alarm,null);
});

const ownRestore=await import('../lib/mcp-qa-finite-coupled-restore.mjs').catch(()=>({}));
async function restorationOptions(fixture){
 const x=await recoveryOptions(fixture),options=x.options();
 const cap=await originalRecovery.reservePrivateQaFiniteOriginalRecovery(options);
 const authority=await originalRecovery.takePrivateQaFiniteOriginalRecovery(cap,options);
 const plan={recordHash:options.expectedPlanHash,C0:x.handoff.initialC0,C1:x.handoff.initialC1,
  baselineVersionId:'11111111-1111-4111-8111-111111111111',baselineDeploymentId:'22222222-2222-4222-8222-222222222222'};
 const from={versionId:'33333333-3333-4333-8333-333333333333',deploymentId:'44444444-4444-4444-8444-444444444444'};
 const deployment='55555555-5555-4555-8555-555555555555',originalDeploymentId='66666666-6666-4666-8666-666666666666';
 const current=[{id:from.deploymentId,strategy:'percentage',versions:[{version_id:from.versionId,percentage:100}]}];
 const request={authority,storage:x.f.storage,plan,from,activationCompletionHash:'3'.repeat(64),originalDeploymentId,deadline:x.f.now()+4000,check:x.f.now};
 return {...x,request,current,deployment};
}
test('coupled restore claims one SEND before the original provider write and retains the exact ACK',async()=>{
 assert.equal(typeof ownRestore.executeFiniteCoupledOriginalRestore,'function');
 const {f,request,current,deployment}=await restorationOptions(),calls=[];
 const restored=await ownRestore.executeFiniteCoupledOriginalRestore({...request,readDeployment:async()=>current,restoreDeployment:async body=>{
  assert.ok(f.rows.has('afw.finite-initial-cleanup.v1:restore-send'));
  assert.equal(f.rows.has('afw.finite-initial-cleanup.v1:restore-ack'),false);
  calls.push(body);
  const desired=JSON.parse(body);
  return {id:deployment,...desired};
 }});
 assert.equal(restored.deploymentId,deployment);
 assert.equal(f.rows.has('afw.finite-initial-cleanup.v1:restore-ack'),true);
 await assert.rejects(()=>ownRestore.executeFiniteCoupledOriginalRestore({...request,readDeployment:async()=>current,restoreDeployment:async()=>{throw Error('duplicate');}}));
 assert.equal(calls.length,1);
});
test('coupled restore with lost acknowledgement cannot replay even if the provider later appears closed',async()=>{
 assert.equal(typeof ownRestore.executeFiniteCoupledOriginalRestore,'function');
 const {f,request,current,options,handoff}=await restorationOptions();
 let effects=0;
 const attempt=()=>ownRestore.executeFiniteCoupledOriginalRestore({...request,readDeployment:async()=>current,restoreDeployment:async()=>{effects++;throw Error('SYN lost ACK');}});
 await assert.rejects(attempt);
 f.setNow(handoff.initialC0+60001);
 await f.storage.transaction(tx=>tx.setAlarm(null));
 const recoveryScope=new AbortController(),next={...options(),originalLease:{signal:recoveryScope.signal,assertCurrent(){}}};
 const token=await originalRecovery.reservePrivateQaFiniteOriginalRecovery(next);
 const later=await originalRecovery.takePrivateQaFiniteOriginalRecovery(token,next);
 let primaryReads=0;
 await assert.rejects(()=>ownRestore.executeFiniteCoupledOriginalRestore({...request,authority:later,deadline:f.now()+4000,
  readDeployment:async()=>{primaryReads++;return [{...current[0],versions:[{version_id:request.plan.baselineVersionId,percentage:100}]}];},
  restoreDeployment:async()=>{effects++;},
 }));
 assert.equal(primaryReads,0);
 assert.equal(effects,1);
 const send=decode('RestoreSend',f.rows.get('afw.finite-initial-cleanup.v1:restore-send'));
 assert.equal(f.rows.has('afw.finite-initial-cleanup.v1:restore-ack'),false);
 assert.throws(()=>ownRestore.readFiniteCoupledOriginalRestore({...request,send,ack:null,at:f.now()}));
});
test('coupled restore rejects foreign or drifting publication before the provider write',async()=>{
 assert.equal(typeof ownRestore.executeFiniteCoupledOriginalRestore,'function');
 const {f,request,current}=await restorationOptions();
 let reads=0,effects=0;
 const changed=[{...current[0],id:'99999999-9999-4999-8999-999999999999'}];
 await assert.rejects(()=>ownRestore.executeFiniteCoupledOriginalRestore({...request,readDeployment:async()=>reads++===0?current:changed,restoreDeployment:async()=>{effects++;}}));
 assert.equal(effects,0);
 assert.ok(f.rows.has('afw.finite-initial-cleanup.v1:restore-send'));
 assert.equal(f.rows.has('afw.finite-initial-cleanup.v1:restore-ack'),false);
});

const terminalClose=await import('../lib/mcp-qa-finite-coupled-terminal.mjs').catch(()=>({}));
async function terminalFixture(kind='original',fixture){
 const x=await restorationOptions(fixture),{f,handoff,request}=x,closure=(await f.storage.get('afw.finite-original-alarm-handoff.v1'));
 const {sealFiniteOwnerCleanupRecord:ownerSeal,encodeFiniteOwnerCleanupRecord:ownerEncode}=await import('../lib/mcp-qa-finite-owner-cleanup-records.mjs');
 const {sealFiniteOwnerIssuerProvenanceRecord:sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord:sdkEncode}=await import('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs');
 const {finiteHash}=await import('../lib/mcp-finite-evidence.mjs');
 const {QA_CLOUD_CLOSED_PINS}=await import('../lib/mcp-qa-cloud-closed-pins.mjs');
 const {id:versionId,deploymentId:originalDep}=QA_CLOUD_CLOSED_PINS.canary;
 const now=f.now(),prefix='afw.finite-owner-cleanup.v1:'+closure.prepId+':',sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+closure.prepId+':';
 const id=ownerSeal('Identity',{purpose:'afw.finite-owner-cleanup-identity.v1',planHash:closure.initialPlanHash,capsuleHash:closure.capsuleHash,
  enrollmentHash:closure.enrollmentHash,preconnectionId:closure.prepId,sourceRevision:closure.sourceRevision,
  qaVersionId:closure.qaVersionId,actorId:closure.actorId,I0:closure.initialC0-900000,C0:closure.initialC0,C1:closure.initialC1});
 const sdk=sdkSeal('SdkGrantReference',{purpose:'afw.finite-owner-sdk-reference.v1',rootHash:'1'.repeat(64),expectedGrantHash:'2'.repeat(64),
  completeSendHash:'3'.repeat(64),completeObservedHash:'4'.repeat(64),correlationHash:'5'.repeat(64),sdkGrantId:'SyntheticGrant01',
  createdAt:Math.floor((closure.initialC0-5000)/1000),expiresAt:null,observedAt:closure.initialC0-2000});
 const addEffect=(operation,outcome,key)=>{
  const send=ownerSeal('Send',{purpose:'afw.finite-owner-cleanup-send.v1',identityHash:id.recordHash,operation,
   requestId:'11111111-1111-4111-8111-111111111111',requestHash:key.repeat(64),issuedAt:operation==='sdk_revoke'?now+20:now-3,deadline:now+2000});
  const observed=ownerSeal('Observed',{purpose:'afw.finite-owner-cleanup-observed.v1',sendHash:send.recordHash,resultHash:key.repeat(64),
   outcome,observedAt:operation==='sdk_revoke'?now+21:now-1});
  f.rows.set(prefix+operation+':send',ownerEncode('Send',send));
  f.rows.set(prefix+operation+':observed',ownerEncode('Observed',observed));
  return {send,observed};
 };
 f.rows.set(prefix+'identity',ownerEncode('Identity',id));
 f.rows.set(sdkPrefix+'reference',sdkEncode('SdkGrantReference',sdk));
 const sdkOp=addEffect('sdk_revoke','returned','6'),monitor=addEffect('monitoring_revoke','applied','7');
 let proof;
 if(kind==='original'){
  const plan={...request.plan,baselineVersionId:versionId,baselineDeploymentId:originalDep};
  const result=await ownRestore.executeFiniteCoupledOriginalRestore({...request,plan,readDeployment:async()=>x.current,restoreDeployment:async body=>({id:x.deployment,...JSON.parse(body)})});
  const anchored='afw.finite-initial-cleanup.v1:',send=decode('RestoreSend',f.rows.get(anchored+'restore-send')),ack=decode('RestoreAck',f.rows.get(anchored+'restore-ack'));
  proof={kind,versionId,deploymentId:result.deploymentId,proofHash:finiteHash({send,ack})};
 }else{
  const prior={purpose:'afw.finite-original-alarm-handoff.v1:prior-restoration',handoffHash:closure.handoffHash,versionId,deploymentId:x.deployment,
   completionHash:'a'.repeat(64),sendHash:'b'.repeat(64),operationalReadiness:false,observedAt:now};
  f.rows.set(prior.purpose,prior);
  f.rows.set('afw.qa-finite-cleanup.v1:'+closure.intentId+':completion',{receiptHash:prior.completionHash,canaryVersionId:versionId,canaryDeploymentId:x.deployment});
  proof={kind,versionId,deploymentId:x.deployment,proofHash:finiteHash(prior)};
 }
 const input={handoffHash:closure.handoffHash,planHash:closure.initialPlanHash,processingStateHash:request.authority.stateHash,
  ownerIdentityHash:id.recordHash,preconnectionId:closure.prepId,sdkReferenceHash:sdk.recordHash,sdkSendHash:sdkOp.send.recordHash,
  sdkObservedHash:sdkOp.observed.recordHash,monitoringObservedHash:monitor.observed.recordHash,
  restoration:proof,closedFactsHash:'c'.repeat(64),observedAt:now+30,operationalReadiness:false};
 f.setNow(now+30);
 return {...x,closure,request,input,prefix,now};
}
for(const kind of ['original','prior'])test('coupled terminal receipt binds OAuth, monitoring and exact '+kind+' restoration',async()=>{
 assert.equal(typeof terminalClose.sealFiniteCoupledTerminalReceipt,'function');
 const x=await terminalFixture(kind),receipt=terminalClose.sealFiniteCoupledTerminalReceipt(x.input),{f,request}=x;
 const key=terminalClose.FINITE_COUPLED_OWNER_CLOSURE;
 await terminalClose.retainFiniteCoupledTerminalReceipt({storage:f.storage,authority:request.authority,receipt});
 assert.deepEqual(f.rows.get(key),receipt);
 const closed=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:f.now});
 assert.equal(closed.kind,'original_closed');assert.equal(closed.receiptHash,receipt.receiptHash);assert.equal(f.alarm,null);
 const replay=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:f.ctx.id.toString(),qaVersionId:f.env.AFW_QA_VERSION.id,now:()=>x.handoff.initialC1+1});
 assert.equal(replay.kind,'original_closed');assert.equal(replay.receiptHash,receipt.receiptHash);assert.equal(f.alarm,null);
});
test('coupled terminal receipt cannot clear the alarm without the exact SDK acknowledgement',async()=>{
 assert.equal(typeof terminalClose.sealFiniteCoupledTerminalReceipt,'function');
 const x=await terminalFixture(),receipt=terminalClose.sealFiniteCoupledTerminalReceipt(x.input),{f,request,prefix}=x;
 f.rows.delete(prefix+'sdk_revoke:observed');
 await assert.rejects(()=>terminalClose.retainFiniteCoupledTerminalReceipt({storage:f.storage,authority:request.authority,receipt}));
 assert.equal(f.rows.has(terminalClose.FINITE_COUPLED_OWNER_CLOSURE),false);
 assert.equal(f.alarm,x.handoff.initialC0+60000);
});

const qaFinalization=await import('../lib/mcp-qa-finite-coupled-finalization.mjs').catch(()=>({}));
test('the earlier business window cannot claim QA restore for the later original owner closure',async()=>{
 const fixture=finiteFixture();
 let eligibleReads=0;
 fixture.primary.effect=async kind=>{
  eligibleReads++;
  const head=fixture.rows.get(HEAD);
  return {purpose:'afw.qa-finite-effect-eligibility.v1',kind,intentId:fixture.plan.intentId,controlHash:head.controlHash,
   proofHash:'a'.repeat(64),observedAt:fixture.now(),eligible:true,evidenceHash:'b'.repeat(64)};
 };
 const {f,control}=await prepared(fixture);
 assert.equal((await control.prepare()).status,'armed');
 f.setNow(f.plan.C0+10);
 const claim=await control.claimEffect('qa_restore');
 assert.equal(claim.status,'blocked');
 assert.equal(eligibleReads,0);
 assert.equal(f.rows.has('afw.qa-finite-trial.v1:'+f.plan.intentId+':effect:qa_restore'),false);
});
async function qaClosureFixture({foreignTarget=false}={}){
 const {QA_CLOUD_CLOSED_PINS}=await import('../lib/mcp-qa-cloud-closed-pins.mjs'),fixture=finiteFixture();
 const {id,configurationHash,module}=QA_CLOUD_CLOSED_PINS.qaClosed;
 fixture.plan.deployments.qaClosed={...fixture.plan.deployments.qaClosed,versionId:id,configurationHash:foreignTarget?'8'.repeat(64):configurationHash,module};
 const x=await terminalFixture('original',fixture),{f,request,closure}=x;
 const receipt=terminalClose.sealFiniteCoupledTerminalReceipt(x.input);
 const refs={intentId:closure.intentId,controlHash:closure.controlHash};
 const options={ctx:f.ctx,env:f.env,refs,now:f.now};
 const closeAlarm=()=>protectPrivateQaFiniteBusinessAlarm({storage:f.storage,actorId:closure.actorId,qaVersionId:closure.qaVersionId,now:f.now});
 const save=()=>terminalClose.retainFiniteCoupledTerminalReceipt({storage:f.storage,authority:request.authority,receipt});
 return {f,closure,options,receipt,closeAlarm,save};
}
test('QA restoration preparation waits for the original receipt and alarm close, then binds the pinned R2 restore target',async()=>{
 const read=qaFinalization.readPrivateQaFiniteCoupledFinalization;
 assert.equal(typeof read,'function');
 const {closure,options,receipt,closeAlarm,save}=await qaClosureFixture();
 assert.equal((await read(options)).status,'pending');
 await save();
 assert.equal((await read(options)).status,'pending');
 await closeAlarm();
 const result=await read(options);
 assert.equal(result.status,'prepared');
 assert.equal(result.ownerReceiptHash,receipt.receiptHash);
 assert.equal(result.intentId,closure.intentId);
 assert.equal(result.restoreBefore,closure.initialC1);
 assert.equal(result.closedQa.versionId,result.backup.qaClosed.versionId);
 assert.equal(result.closedQa.module.sha256,result.backup.qaClosed.moduleSha256);
 assert.equal(result.authorizesEffects,false);
 assert.equal(result.operationalReadiness,false);
 assert.deepEqual(await read(options),result);
});
test('foreign identity, changed provider target and expired original deadline cannot prepare QA restore',async()=>{
 const read=qaFinalization.readPrivateQaFiniteCoupledFinalization;
 assert.equal(typeof read,'function');
 const original=await qaClosureFixture();await original.save();await original.closeAlarm();
 await assert.rejects(()=>read({...original.options,refs:{...original.options.refs,controlHash:'7'.repeat(64)}}));
 await assert.rejects(()=>read({...original.options,now:()=>original.closure.initialC1}));
 const foreign=await qaClosureFixture({foreignTarget:true});await foreign.save();await foreign.closeAlarm();
 await assert.rejects(()=>read(foreign.options));
});
