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
