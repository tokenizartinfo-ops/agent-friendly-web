import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-initial-cleanup.v1:';
async function using(fn){const f=await initialEntryHarness('normal');try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('B2b actual native initial winner owns immutable cleanup and native alarm before safe return',()=>using(async f=>{
 const r=await f.workflow(f.refs);assert.equal(r.result.status,'material_recorded');
 const rows=await f.stub.snapshot(),read=k=>JSON.parse(rows.find(([key])=>key===P+k)?.[1]??'null'),plan=read('plan'),state=read('state'),ack=read('arm-ack');
 assert.ok(plan,'actual native winner must persist cleanup plan after actual inactive receipt');
 assert.ok(state);assert.ok(ack);assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);assert.equal(state.deliveries,0);assert.equal(await f.stub.alarmInfo(),plan.C0);
 assert.equal(ack.planHash,plan.recordHash);assert.equal(plan.candidateVersionId,'55555555-5555-4555-8555-555555555555');
 assert.equal(JSON.stringify(r).includes(plan.recordHash),false);assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
 const before=JSON.stringify(rows);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(JSON.stringify(await f.stub.snapshot()),before);
}));
test('B2b native surviving upload cannot arm over preexisting native alarm',()=>using(async f=>{
 const at=Date.now()+3600000;await f.stub.installAlarm(at);
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(await f.stub.alarmInfo(),at);
 assert.equal((await f.stub.snapshot()).some(([k])=>k===P+'plan'),false);
}));
test('B2b finite alarm refuses orphan ownership fragment instead of nominal fallback',()=>using(async f=>{
 await f.stub.seed([[P+'state','{}']]);const result=await f.stub.initialAlarm();assert.equal(result.status,'admin_pending');
}));
