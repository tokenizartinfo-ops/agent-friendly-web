import test from 'node:test';
import assert from 'node:assert/strict';
import {createIndependentClosureCoordinator} from '../lib/assistance-independent-closure.mjs';

const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
function fixture(overrides={}) {
 const data=new Map(); let queue=Promise.resolve(); const calls=[];
 const storage={transaction(fn){const next=queue.then(()=>fn({get:async k=>structuredClone(data.get(k)),put:async(k,v)=>{data.set(k,structuredClone(v));}}));queue=next.catch(()=>{});return next;}};
 const options={storage,plan,now:()=>1000,revokePlan:async p=>{calls.push(['revoke',p]);return {verified:true,state:'revoked'};},closeLedger:async p=>{calls.push(['ledger',p]);return {verified:true,state:'completed'};},restoreAdministration:async p=>{calls.push(['admin',p]);return {verified:true,state:'restored'};},...overrides};
 return {data,calls,options,make:(extra={})=>createIndependentClosureCoordinator({...options,...extra})};
}
test('waits until deadline, then verifies three distinct layers and never repeats a completed closure',async()=>{
 const f=fixture();assert.deepEqual(await f.make({now:()=>999}).tick(),{state:'waiting',step:null});assert.equal(f.calls.length,0);
 assert.deepEqual(await f.make().tick(),{state:'complete',step:null});assert.deepEqual(f.calls.map(c=>c[0]),['revoke','ledger','admin']);assert.ok(f.calls.every(c=>JSON.stringify(c[1])===JSON.stringify(plan)));
 assert.deepEqual(await f.make().tick(),{state:'complete',step:null});assert.equal(f.calls.length,3);
});
test('concurrent ticks cannot duplicate a pending effect',async()=>{
 let release;const gate=new Promise(r=>{release=r;});let entered;const start=new Promise(r=>{entered=r;});let count=0;
 const f=fixture({revokePlan:async()=>{count++;entered();await gate;return {verified:true,state:'revoked'};}});
 const first=f.make().tick();await start;assert.deepEqual(await f.make().tick(),{state:'intervention_required',step:'revokePlan'});release();assert.equal((await first).state,'complete');assert.equal(count,1);
});
test('lost or invalid receipts retain issued state across restart without leaking errors or repeating writes',async()=>{
 for(const result of [null,{verified:false,state:'revoked'},{verified:true,state:'revoked',secret:'private-marker'},Error('private-marker')]){
  let count=0;const f=fixture({revokePlan:async()=>{count++;if(result instanceof Error)throw result;return result;}});
  assert.deepEqual(await f.make().tick(),{state:'intervention_required',step:'revokePlan'});assert.equal((await f.make().tick()).state,'intervention_required');assert.equal(count,1);assert.equal(JSON.stringify([...f.data]).includes('private-marker'),false);assert.equal(f.calls.length,0);
 }
});
test('ledger completion alone never certifies administrative restoration',async()=>{
 let writes=0;const f=fixture({restoreAdministration:async()=>{writes++;return {verified:true,state:'expired'};}});
 assert.deepEqual(await f.make().tick(),{state:'intervention_required',step:'restoreAdministration'});assert.equal((await f.make().tick()).state,'intervention_required');assert.equal(writes,1);assert.equal(f.calls.length,2);
});
test('changed plan and malformed storage fail closed before capabilities',async()=>{
 const f=fixture();await f.make({now:()=>999}).tick();await assert.rejects(f.make({plan:{...plan,baselineRef:'b'.repeat(64)}}).tick(),/Invalid closure state/);assert.equal(f.calls.length,0);
 const g=fixture();g.data.set('afw-independent-closure-v1',{state:'complete'});await assert.rejects(g.make().tick(),/Invalid closure state/);assert.equal(g.calls.length,0);
});
test('plan is copied and callbacks cannot modify it or receive unapproved fields',async()=>{
 const supplied={...plan};const f=fixture({plan:supplied,revokePlan:async p=>{assert.throws(()=>{p.baselineRef='b'.repeat(64);});return {verified:true,state:'revoked'};}});const c=f.make();supplied.closeAt=999999;assert.equal((await c.tick()).state,'complete');
 assert.throws(()=>f.make({plan:{...plan,url:'https://private.invalid'}}),/Invalid closure configuration/);
 assert.throws(()=>f.make({now:null}),/Invalid closure configuration/);
});
test('rejects non-string identifiers before creating any persisted plan',()=>{
 const f=fixture();
 for(const field of ['occurrenceId','baselineRef'])for(const value of [[plan[field]],{toString:()=>plan[field]}])assert.throws(()=>f.make({plan:{...plan,[field]:value}}),/Invalid closure configuration/);
 assert.equal(f.data.size,0);
});
