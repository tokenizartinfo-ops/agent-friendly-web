import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-preparation-cleanup.v1:';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function world(fn,mode='enrollment'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('causal: genuine owner POST consumes admission for actual original native capsule, enrolls once, remains pending without owner SEND',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]);
 const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
 f.nowOffset=capsule.I0+400000-Date.now();
 const screen=await plain(f.stub.enrollmentScreen(token));
 assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
 assert.equal(screen.preconnectionId,capsule.preconnectionId);
 const r=await plain(f.stub.enrollmentPost(token,screen));assert.equal(r.status,undefined,JSON.stringify(r));assert.equal(r.prepared.status,202);assert.match(r.result.admitted,/^[a-f0-9]{64}$/);
 assert.equal(r.result.outcome.status,'admin_pending');
 const rows=await plain(f.stub.snapshot());assert.equal(rows.filter(([k])=>k.startsWith(P)).length,2);
 assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
 for(const [k,v]of before)assert.equal(rows.find(([key])=>key===k)?.[1],v);
 assert.equal(await f.stub.alarmInfo(),capsule.C0);
}));

async function enroll(f,mode='normal',generic=false){
 const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]);
 const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
 f.nowOffset=capsule.I0+400000-Date.now();const screen=await plain(f.stub.enrollmentScreen(token,generic));
 assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
 const result=await plain(f.stub.enrollmentPost(token,screen,mode));return {result,capsule,before,screen,token};
}
test('generic first GET remains a genuine admitted mismatched-selector negative',()=>world(async f=>{
 const {result,capsule}=await enroll(f,'normal',true);
 assert.equal(result.prepared.status,202);assert.notEqual(result.prepared.preconnectionId,capsule.preconnectionId);assert.match(result.result.admitted,/^[a-f0-9]{64}$/);
 assert.equal(result.result.outcome.status,'admin_pending');assert.equal((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)).length,0);
 assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
}));
for(const mode of ['throw-enrollment','throw-ack','sync-reject','readback-lost','alarm-lost'])test('native '+mode+' is pending, immutable and never an owner forward',()=>world(async f=>{
 const {result,capsule,screen,token}=await enroll(f,mode);assert.equal(result.result.outcome.status,'admin_pending');
 const rows=await plain(f.stub.snapshot()),enrolled=rows.filter(([k])=>k.startsWith(P));
 assert(enrolled.length>=1&&enrolled.length<=2);
 assert.equal((await plain(f.stub.enrollmentPost(token,screen))).status,'unavailable','used ticket cannot mint or reconstruct admission');
 assert.deepEqual((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)),enrolled);
 assert.equal(await f.stub.alarmInfo(),capsule.C0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
 assert.equal((await plain(f.stub.enrollmentRead())).enrollment.capsuleHash,capsule.capsuleHash,'lost ACK remains factual DATA');
 f.alarmMode='normal';const outcome=await plain(f.alarmAt(capsule.C0+1));
 assert.equal(outcome.status,'restored','SYN/manual existing native alarm event must still recover closed_ui');
 assert.equal(f.restores.length,1);
}));
for(const mode of ['hold-enrollment','hold-ack','sync-hold'])test('actual '+mode+' after native commit stays in original scope until external release',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]),source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
 f.nowOffset=capsule.I0+400000-Date.now();const screen=await plain(f.stub.enrollmentScreen(token)),work=plain(f.stub.enrollmentPost(token,screen,mode));
 for(let i=0;i<200;i++){if((await plain(f.stub.stats())).held)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal((await plain(f.stub.stats())).held,true,'hold is after actual native transaction return');
 const result=await work;assert.equal(result.result.outcome.status,'admin_pending');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);
 const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k===P+'enrollment'));assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
 await f.stub.release();
 for(let i=0;i<200;i++){if((await plain(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal((await plain(f.stub.probeStageAvailability())).available,true);assert.deepEqual(await plain(f.stub.snapshot()),rows);
}));
test('native reconstruction, noAck and advanced delivery1/2 preserve original zero-state commitment/C0/C1',()=>world(async f=>{
 const {capsule}=await enroll(f,'throw-enrollment');
 await f.restart();
 assert.equal((await plain(f.stub.enrollmentRead())).ack,null);
 f.alarmMode='active-container';assert.equal((await plain(f.alarmAt(capsule.C0+1))).status,'admin_pending');
 let rows=await plain(f.stub.snapshot()),state=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:state')[1]);assert.equal(state.deliveries,1);assert.equal(await f.stub.alarmInfo(),capsule.C0+60000);
 assert.equal((await plain(f.stub.enrollmentRead())).enrollment.capsuleHash,capsule.capsuleHash);
 f.alarmMode='normal';assert.equal((await plain(f.alarmAt(capsule.C0+60001))).status,'restored');
 rows=await plain(f.stub.snapshot());state=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:state')[1]);assert.equal(state.deliveries,2);assert.equal(state.status,'complete');
 assert.equal(JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]).C1,capsule.C1);assert.equal(f.restores.length,1);
}),'enrollment-restart'));
for(const corruption of ['orphan','hash','unknown','head','policy','permission','foreign'])test('factual '+corruption+' obligation refuses restoration and all forwards',()=>world(async f=>{
 const {capsule}=await enroll(f);
 await f.stub.enrollmentCorrupt(corruption);
 assert.equal((await plain(f.stub.enrollmentRead())).status,'unavailable');
 assert.equal((await plain(f.alarmAt(capsule.C0+1))).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
}));
