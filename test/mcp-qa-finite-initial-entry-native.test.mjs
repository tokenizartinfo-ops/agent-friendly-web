import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const KEY='afw.finite-initial-preparation.v1:entry',ONCE='afw.finite-initial-preparation.v1:once';
const pending=r=>assert.equal(r.status,'admin_pending',JSON.stringify(r));
async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
const claimed=rows=>rows.some(([k])=>k===ONCE);
test('B1 actual finite actor durable entry composes A and returns only safe references',()=>using('normal',async f=>{
 const before=await f.stub.snapshot();await f.stub.configure('normal');const r=await f.stub.invoke(f.refs);
 assert.equal(r.status,'material_recorded',JSON.stringify(r));
 assert.deepEqual(Object.keys(r).sort(),['status','entryHash','materialHash','sourceRevision','qaVersionId','authorizesEffects','completePackage','operationalReadiness'].sort());
 assert.equal(r.authorizesEffects,false);assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
 const rows=await f.stub.snapshot(),entry=JSON.parse(rows.find(([k])=>k===KEY)[1]);
 assert.equal(entry.entryHash,r.entryHash);assert.equal(entry.createdAt,f.refs.createdAt);
 assert.equal(entry.operationDeadline,Math.min(entry.initialDeadline,entry.createdAt+30000,f.approval));
 assert.ok(claimed(rows));for(const pair of before)assert.deepEqual(rows.find(([k])=>k===pair[0]),pair);
 assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
 assert.equal((await f.stub.stats()).syncs,6);
 const requests=f.requests.length;pending(await f.stub.invoke(f.refs));assert.deepEqual(await f.stub.snapshot(),rows);
 assert.ok(f.requests.length>=requests);assert.equal((await f.stub.stats()).syncs,6);
}));
test('B1 concurrent actual SQLite contenders admit one A',()=>using('normal',async f=>{
 await f.stub.configure('normal');const results=await Promise.all([f.stub.invoke(f.refs),f.stub.invoke(f.refs)]);
 assert.equal(results.filter(r=>r.status==='material_recorded').length,1,JSON.stringify(results));
 assert.equal((await f.stub.snapshot()).filter(([k])=>k===KEY).length,1);
}));
test('B1 actual Workflow class calls fixed actor with safe result',()=>using('normal',async f=>{
 await f.stub.configure('normal');const r=await f.workflow(f.refs);
 assert.equal(r.result.status,'material_recorded',JSON.stringify(r));
 assert.equal(r.config.options.retries.limit,0);
}));
for(const mode of ['lost-ack','reject-sync','callback-retry'])test('B1 '+mode+' never enters A',()=>using('normal',async f=>{
 await f.stub.configure(mode);pending(await f.stub.invoke(f.refs));
 const rows=await f.stub.snapshot();assert.ok(rows.some(([k])=>k===KEY));assert.equal(claimed(rows),false);
 pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
}));
test('B1 never-committed entry permits same-deadline deterministic contender',()=>using('normal',async f=>{
 await f.stub.configure('never-commit');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
 const r=await f.stub.invoke(f.refs);assert.equal(r.status,'material_recorded',JSON.stringify(r));
}));
test('B1 A completed but post-sync unknown returns pending and never recollects',()=>using('normal',async f=>{
 await f.stub.configure('post-reject-sync');pending(await f.stub.invoke(f.refs));const rows=await f.stub.snapshot();assert.ok(claimed(rows));
 pending(await f.stub.invoke(f.refs));assert.deepEqual(await f.stub.snapshot(),rows);
}));
for(const mode of ['hold-sync','held-transaction'])test('B1 partial original deadline fences '+mode+' and late ACK',()=>using('partial',async f=>{
 await f.stub.configure(mode);const r=await f.stub.invoke(f.refs);pending(r);
 const rows=await f.stub.snapshot();assert.equal(claimed(rows),false);assert.ok(rows.some(([k])=>k===KEY));assert.equal((await f.stub.stats()).held,true);await f.stub.release();
 await new Promise(resolve=>setTimeout(resolve,20));assert.equal(claimed(await f.stub.snapshot()),false);
 pending(await f.stub.invoke(f.refs));
}));
for(const change of [r=>r.workflowName='other',r=>r.initialInstanceId+='x',r=>r.sourceRevision='e'.repeat(40),r=>r.createdAt=Date.now()-30001,r=>r.extra=true])test('B1 rejects mismatched native correlation before entry',()=>using('normal',async f=>{
 await f.stub.configure('normal');const refs={...f.refs};change(refs);pending(await f.stub.invoke(refs));
 assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);
}));
for(const mode of ['wrong-owner','edited','wrong-source','wrong-qa','command-drift'])test('B1 independent command rejects '+mode,()=>using(mode,async f=>{
 await f.stub.configure('normal');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
}));

for(const fault of ['lost-ack','post-reject-sync'])test('B1 actual persisted SQLite actor restart after '+fault+' never recollects',()=>using('restart',async f=>{
 await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));const before=await f.stub.snapshot();assert.ok(before.some(([k])=>k===KEY));
 await f.restart();assert.deepEqual(await f.stub.snapshot(),before,'persisted snapshot before restarted invocation');await f.stub.configure('normal');pending(await f.stub.invoke(f.refs));assert.deepEqual(await f.stub.snapshot(),before);assert.equal((await f.stub.stats()).syncs,0);
}));
test('B1 held actual sync expires at child5s despite cached entry readback',()=>using('normal',async f=>{
 await f.stub.configure('hold-sync');const began=Date.now(),operation=f.stub.invoke(f.refs);
 let observed=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){observed=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.ok(observed);
 const cached=await f.stub.snapshot();assert.ok(cached.some(([k])=>k===KEY));assert.equal(claimed(cached),false);
 pending(await operation);assert.ok(Date.now()-began>=4900);assert.ok(Date.now()-began<12000);
 await f.stub.release();pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
}));
test('B1 held post-A sync cannot report success before durability barrier',()=>using('normal',async f=>{
 await f.stub.configure('post-hold-sync');const operation=f.stub.invoke(f.refs);
 let held=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.ok(held);
 assert.ok(claimed(await f.stub.snapshot()));pending(await operation);await f.stub.release();pending(await f.stub.invoke(f.refs));
}));

for(const fault of ['missing-sync','missing-db','missing-node','missing-db-with-session','noncallable-db-with-session','missing-node-id-from-string','noncallable-node-id-from-string'])test('B1 missing native holder '+fault+' fails before entry',()=>using('normal',async f=>{
 await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);
}));
test('B1 changed actual sync holder after transaction cannot enter A',()=>using('normal',async f=>{
 await f.stub.configure('changed-sync');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
}));
test('B1 Workflow callback reentry cannot reconstruct winning admission',()=>using('normal',async f=>{
 await f.stub.configure('normal');const first=await f.workflow(f.refs);assert.equal(first.result.status,'material_recorded');
 const rows=await f.stub.snapshot();pending((await f.workflow(f.refs)).result);assert.deepEqual(await f.stub.snapshot(),rows);
}));

for(const fault of ['changed-db-with-session','changed-node-id-from-string'])test('B1 native method drift before CAS '+fault+' leaves entry absent',()=>using('normal',async f=>{
 await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);assert.equal((await f.stub.stats()).transactions,1);
}));
