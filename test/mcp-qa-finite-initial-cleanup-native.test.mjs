import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-initial-cleanup.v1:';
async function using(fn,mode='normal'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
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

const record=(rows,key)=>JSON.parse(rows.find(([k])=>k===P+key)?.[1]??'null');
async function prepared(f){await f.stub.restoreMethods();await f.stub.configure('late-initial-journal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');await f.stub.restoreMethods();await f.stub.configure('normal');return record(await f.stub.snapshot(),'plan');}
for(const fault of ['missing-get-alarm','missing-list'])test('B2b predictable '+fault+' fails before permanent Entry',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
 await f.stub.restoreMethods();assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
}));
for(const fault of ['cleanup-missing-tx-alarm','cleanup-never-commit','cleanup-callback-retry','cleanup-final-return-lost','cleanup-reject-sync','cleanup-alarm-ack-lost','cleanup-publisher-drift','cleanup-nominal-conflict'])test('B2b native '+fault+' never produces positive arm or permits replay',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
 let rows=await f.stub.snapshot();assert.equal(record(rows,'arm-ack'),null);assert.equal(f.uploads.length,1);
 await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);
}));
test('B2b held native arm sync consumes child5s; late settlement cannot ACK',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure('cleanup-hold-sync');const operation=f.stub.invoke(f.refs),start=Date.now();
 let held=false;for(let i=0;i<150;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(r=>setTimeout(r,20));}assert.ok(held);
 const rows=await f.stub.snapshot();assert.ok(record(rows,'plan'));assert.equal(record(rows,'arm-ack'),null);
 assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-start>=4900);await f.stub.release();await new Promise(r=>setTimeout(r,30));assert.equal(record(await f.stub.snapshot(),'arm-ack'),null);
}));
test('B2b cleanup custody must cover original C1 before arming',()=>using(async f=>{
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);assert.equal(record(await f.stub.snapshot(),'plan'),null);
},'short-cleanup-custody'));
test('B2b persisted native restart owns initial alarm; manual SYN delivery observes never activated',()=>using(async f=>{
 const plan=await prepared(f),before=await f.stub.snapshot();assert.equal(await f.stub.alarmInfo(),plan.C0);
 await f.restart();assert.deepEqual(await f.stub.snapshot(),before);assert.equal(await f.stub.alarmInfo(),plan.C0);
 await f.stub.configure('normal');const r=await f.alarmAt(plan.C0+1);
 assert.equal(r.status,'never_activated');assert.equal(record(await f.stub.snapshot(),'state').status,'complete');assert.equal(f.restores.length,0);assert.equal(await f.stub.alarmInfo(),null);
},'restart'));
test('B2b only actual finite alarm with no initial records delegates nominal unchanged',()=>using(async f=>{
 const result=await f.stub.nominalAlarmData();assert.equal(await result.state,'unavailable');assert.equal(f.requests.length,0);
}));
test('B2b complete future SYN activation evidence permits exactly one fixed native restore wire',()=>using(async f=>{
 const plan=await prepared(f);await f.future();const r=await f.alarmAt(plan.C0+1);assert.equal(r.status,'restored');
 assert.equal(f.restores.length,1);assert.deepEqual(f.restores[0].data,{strategy:'percentage',versions:[{version_id:f.x.pin.id,percentage:100}],annotations:{'workers/message':'afw-finite-initial-restore-'+plan.recordHash}});
 const rows=await f.stub.snapshot();assert.ok(record(rows,'restore-send'));assert.ok(record(rows,'restore-ack'));assert.equal(record(rows,'receipt').outcome,'restored');
 assert.equal((await f.alarmAt(plan.C0+60001)).status,'restored');assert.equal(f.restores.length,1);
}));
for(const journal of ['send','ack'])test('B2b future SYN '+journal+' without settled completion never restores even if baseline later observed',()=>using(async f=>{
 const plan=await prepared(f);await f.future(journal);f.pointerMode='baseline';
 assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'receipt'),null);
}));
for(const fault of ['active-workflow','active-container','schedule','ineligible','custody-drift','candidate-module','candidate-resource','candidate-secret'])test('B2b actual native alarm rejects '+fault+' before restore SEND',()=>using(async f=>{
 const plan=await prepared(f);await f.future();const before=f.requests.length;f.alarmMode=fault;assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'restore-send'),null);
 const target=fault==='custody-drift'?'/tokens/verify':fault==='active-workflow'?'/instances?':fault==='active-container'?'/instances-v2?':fault==='schedule'?'/schedules':fault==='ineligible'?'/versions?deployable=true':'/versions/'+plan.candidateVersionId+'?include=modules';assert.ok(f.requests.slice(before).some(url=>url.includes(target)),fault+' reached its intended boundary');
}));
test('B2b foreign primary pointer stops without blind overwrite',()=>using(async f=>{
 const plan=await prepared(f);await f.future();f.pointerMode='foreign';assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);
}));
test('B2b unknown issued restore remains reconcile-only through remaining deliveries and restart',()=>using(async f=>{
 const plan=await prepared(f);await f.future();f.alarmMode='restore-ack-lost';assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,1);assert.ok(record(await f.stub.snapshot(),'restore-send'));assert.equal(record(await f.stub.snapshot(),'restore-ack'),null);
 await f.restart();await f.stub.configure('normal');f.alarmMode='normal';assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.equal((await f.alarmAt(plan.C0+120001)).status,'admin_pending');assert.equal(record(await f.stub.snapshot(),'state').deliveries,3);assert.equal(await f.stub.alarmInfo(),null);
 assert.equal((await f.alarmAt(plan.C1+1)).status,'admin_pending');assert.equal(f.restores.length,1);assert.equal(record(await f.stub.snapshot(),'receipt'),null);
},'restart'));
test('B2b nominal collision after arm preserves owner and nominal records and native alarm',()=>using(async f=>{
 const plan=await prepared(f);await f.stub.seed([['afw.qa-finite-trial.v1:head',{intentId:'SYN nominal'}]]);
 const rows=await f.stub.snapshot();assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(await f.stub.alarmInfo(),plan.C0);assert.equal(f.restores.length,0);
}));
test('B2b corrupt backup chunk blocks fixed restore',()=>using(async f=>{
 const plan=await prepared(f);await f.future();const rows=await f.stub.snapshot(),pair=rows.find(([k])=>k.includes(':chunk:'));await f.stub.seed([[pair[0],pair[1]+' ']]);
 assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);
}));
test('B2b exhausted original C1 never renews or dispatches',()=>using(async f=>{
 const plan=await prepared(f);await f.future();const before=await f.stub.snapshot();assert.equal((await f.alarmAt(plan.C1)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.restores.length,0);
}));

test('B2b completed never_activated rejects later unsettled activation SEND without effects',()=>using(async f=>{
 const plan=await prepared(f);assert.equal((await f.alarmAt(plan.C0+1)).status,'never_activated');await f.future('send');const rows=await f.stub.snapshot(),before=f.requests.length;
 assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,0);
}));
for(const mode of ['delete','contradict'])test('B2b completed restored rejects '+mode+' restore ACK without effects',()=>using(async f=>{
 const plan=await prepared(f);await f.future();assert.equal((await f.alarmAt(plan.C0+1)).status,'restored');await f.stub.mutateCleanup('restore-ack',mode);const rows=await f.stub.snapshot(),before=f.requests.length;
 assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,1);
}));
test('B2b pre-arm activation SEND cannot authorize restore',()=>using(async f=>{
 const plan=await prepared(f);await f.future('pre-arm');const rows=await f.stub.snapshot(),arm=record(rows,'arm-ack'),send=record(rows,'activation-send');assert.ok(send.issuedAt<arm.acknowledgedAt);assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'restore-send'),null);
}));

for(const [key,mode] of [['activation-send','delete'],['activation-ack','delete'],['activation-completion','delete'],['activation-completion','contradict'],['restore-send','delete'],['receipt','contradict']])test('B2b completed restored rejects '+mode+' '+key+' chain without effects',()=>using(async f=>{
 const plan=await prepared(f);await f.future();assert.equal((await f.alarmAt(plan.C0+1)).status,'restored');await f.stub.mutateCleanup(key,mode);const rows=await f.stub.snapshot(),before=f.requests.length;
 assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,1);
}));


test('initial winner durably records actual activation after one fixed POST',()=>using(async f=>{
 const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
 assert.ok(record(rows,'activation-send'),'live winner must persist SEND');
 assert.ok(record(rows,'activation-ack'),'actual provider response must yield ACK');
 assert.ok(record(rows,'activation-completion'),'primary readback must yield Completion');
 assert.equal(f.activations.length,1);assert.equal(f.restores.length,0);
 assert.equal(r.status,'material_recorded');
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.activations.length,1);
}));
test('lost activation acknowledgement remains uncertain and never reposts',()=>using(async f=>{
 f.alarmMode='activation-ack-lost';assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
 const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);assert.equal(f.activations.length,1);
 assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
}));

for(const fault of ['activation-pointer-drift','activation-completion-module'])test('post-ACK '+fault+' prevents durable Completion without replay',()=>using(async f=>{
 f.alarmMode=fault;assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const rows=await f.stub.snapshot();
 assert.ok(record(rows,'activation-send'));assert.ok(record(rows,'activation-ack'));assert.equal(record(rows,'activation-completion'),null);assert.equal(f.activations.length,1);
 await f.restart();await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.activations.length,1);assert.deepEqual(await f.stub.snapshot(),rows);
},'restart'));
test('malformed actual activation ACK remains an uncertain issued effect',()=>using(async f=>{
 f.alarmMode='activation-ack-bad';assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const rows=await f.stub.snapshot();
 assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);assert.equal(f.activations.length,1);
}));
