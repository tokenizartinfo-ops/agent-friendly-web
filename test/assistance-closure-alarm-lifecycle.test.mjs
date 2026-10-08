import test from 'node:test';
import assert from 'node:assert/strict';
import {createClosureAlarmLifecycle} from '../lib/assistance-closure-alarm-lifecycle.mjs';

const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
function fixture({lost=false,unknown=false}={}){
 const data=new Map();let alarm=null,time=500;const counts=[0,0,0];let reads=0;
 const storage={async get(k){return structuredClone(data.get(k));},async put(k,v){data.set(k,structuredClone(v));},async setAlarm(t){alarm=t;},async deleteAlarm(){alarm=null;},async transaction(fn){return fn(this);}};
 const action=i=>async()=>{counts[i]++;if(i===0&&lost)throw Error('secret provider detail');return {verified:!(unknown&&i===2),state:['revoked','stopped','restored'][i]};};
 const options={storage,plan,now:()=>time,revokePlan:action(0),closeLedger:action(1),restoreAdministration:action(2),readIssuedReceipt:async p=>{reads++;const i=['revokePlan','closeLedger','restoreAdministration'].indexOf(p.step);return {verified:counts[i]===1&&!(unknown&&i===2),state:['revoked','stopped','restored'][i]};}};
 return {options,counts,storage,setTime(t){time=t;},get alarm(){return alarm;},get reads(){return reads;}};
}
test('arms once, rejects different persisted plan, waits and completes without repeating effects',async()=>{
 const f=fixture(),l=createClosureAlarmLifecycle(f.options);
 assert.deepEqual(await l.arm(),{state:'armed',step:null,attempts:0});assert.equal(f.alarm,1000);
 assert.deepEqual(await l.alarm(),{state:'armed',step:null,attempts:0});assert.deepEqual(f.counts,[0,0,0]);
 await l.arm();assert.equal(f.alarm,1000);
 const other=createClosureAlarmLifecycle({...f.options,plan:{...plan,baselineRef:'b'.repeat(64)}});
 await assert.rejects(other.arm(),/Closure lifecycle unavailable/);
 f.setTime(1000);assert.deepEqual(await l.alarm(),{state:'complete',step:null,attempts:1});assert.equal(f.alarm,null);
 const restarted=createClosureAlarmLifecycle(f.options);await restarted.arm();await restarted.alarm();assert.deepEqual(f.counts,[1,1,1]);assert.equal(f.alarm,null);
});
test('lost acknowledgement recovers by readback, never repeats the issued write',async()=>{
 const f=fixture({lost:true}),l=createClosureAlarmLifecycle(f.options);await l.arm();f.setTime(1000);
 assert.deepEqual(await l.alarm(),{state:'intervention_required',step:'revokePlan',attempts:1});assert.equal(f.alarm,2000);
 const restarted=createClosureAlarmLifecycle(f.options);f.setTime(2000);
 assert.deepEqual(await restarted.alarm(),{state:'complete',step:null,attempts:2});assert.deepEqual(f.counts,[1,1,1]);assert.equal(f.reads,1);
});
test('unknown administration exhausts finite budget, remains unverified and cannot be rearmed',async()=>{
 const f=fixture({unknown:true}),l=createClosureAlarmLifecycle(f.options);await l.arm();f.setTime(1000);
 for(let i=1;i<=3;i++){const r=await l.alarm();assert.deepEqual(r,{state:'intervention_required',step:'restoreAdministration',attempts:i});f.setTime(1000+i*1000);}
 assert.equal(f.alarm,null);await l.arm();await l.alarm();assert.deepEqual(f.counts,[1,1,1]);assert.equal(f.reads,2);assert.equal(f.alarm,null);
});
test('invalid clock or missing capability never arms or executes',async()=>{
 const f=fixture();assert.throws(()=>createClosureAlarmLifecycle({...f.options,restoreAdministration:undefined}));
 const l=createClosureAlarmLifecycle({...f.options,now:()=>NaN});await assert.rejects(l.arm(),/Closure lifecycle unavailable/);assert.equal(f.alarm,null);assert.deepEqual(f.counts,[0,0,0]);
});
test('restart after the last reserved attempt records intervention instead of remaining processing',async()=>{
 const f=fixture(),l=createClosureAlarmLifecycle(f.options);await l.arm();
 await f.storage.put('afw-closure-alarm-lifecycle-v1',{plan,state:'processing',step:'revokePlan',attempts:3});
 f.setTime(4000);
 assert.deepEqual(await l.alarm(),{state:'intervention_required',step:'revokePlan',attempts:3});
 assert.deepEqual(await l.status(),{state:'intervention_required',step:'revokePlan',attempts:3});
 assert.equal(f.alarm,null);assert.deepEqual(f.counts,[0,0,0]);
});
test('failed final state write already leaves intervention persisted without needing another alarm',async()=>{
 const f=fixture({unknown:true}),l=createClosureAlarmLifecycle(f.options);await l.arm();f.setTime(1000);
 await l.alarm();await l.alarm();
 const put=f.storage.put.bind(f.storage);let finalWrites=0;
 f.storage.put=async(k,v)=>{if(k==='afw-closure-alarm-lifecycle-v1'&&v.attempts===3&&++finalWrites===2)throw Error('synthetic final write unavailable');return put(k,v);};
 await assert.rejects(l.alarm(),/Closure lifecycle unavailable/);f.storage.put=put;
 assert.deepEqual(await l.status(),{state:'intervention_required',step:'restoreAdministration',attempts:3});
 assert.deepEqual(await l.arm(),{state:'intervention_required',step:'restoreAdministration',attempts:3});
 assert.equal(f.alarm,null);assert.deepEqual(f.counts,[1,1,1]);
});
test('overlapping deliveries serialize recovery and do not duplicate issued actions',async()=>{
 const f=fixture({lost:true}),l=createClosureAlarmLifecycle(f.options);await l.arm();f.setTime(1000);
 const results=await Promise.all([l.alarm(),l.alarm(),l.alarm()]);
 assert.deepEqual(results.map(r=>r.state),['intervention_required','complete','complete']);assert.deepEqual(f.counts,[1,1,1]);assert.equal(f.alarm,null);
});
