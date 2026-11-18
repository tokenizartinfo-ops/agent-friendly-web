import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-finite-trial-control.mjs';
import {FINITE_ALARM_HANDOFF,protectPrivateQaFiniteBusinessAlarm} from '../lib/mcp-qa-finite-alarm-handoff.mjs';
import {finiteFixture,HEAD} from './fixtures/qa-finite-trial.mjs';
import {stageAlarmFixture} from './fixtures/finite-alarm-handoff.mjs';

async function prepared(f=finiteFixture()){
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
 const before=await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,now:f.now});
 assert.equal(before.kind,'business');assert.equal(f.alarm,handoff.initialC0);
 f.setNow(f.plan.C1+1);
 assert.equal((await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,now:f.now})).kind,'waiting');
 f.setNow(handoff.initialC0);
 assert.equal((await protectPrivateQaFiniteBusinessAlarm({storage:f.storage,now:f.now})).kind,'original_due');
 assert.equal(f.alarm,handoff.initialC0);
});
test('missing alarm acknowledgement stops the dispatcher before business code can run',async()=>{
 const {f,control}=await prepared();assert.equal((await control.prepare()).status,'armed');
 f.setNow(f.plan.C0+2);f.storage.getAlarm=async()=>null;
 await assert.rejects(protectPrivateQaFiniteBusinessAlarm({storage:f.storage,now:f.now}));
});
