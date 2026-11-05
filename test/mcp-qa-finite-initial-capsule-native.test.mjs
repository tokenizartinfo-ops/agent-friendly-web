import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {initialCanonical as canonical,initialHash,hashFiniteInitialMaterialRecord} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-initial-preparation.v1:',C='afw.finite-initial-cleanup.v1:',KEY=P+'capsule',get=(rows,key)=>rows.find(([k])=>k===key)?.[1];
async function using(fn,mode='normal'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
async function invoke(f){const r=await f.stub.invoke(f.refs);try{return r.status;}finally{r[Symbol.dispose]?.();}}
async function stats(f){const r=await f.stub.stats();try{return {held:r.held,capsuleTransactions:r.capsuleTransactions};}finally{r[Symbol.dispose]?.();}}
async function available(f){const r=await f.stub.probeStageAvailability();try{return r.available;}finally{r[Symbol.dispose]?.();}}
async function until(fn){for(let n=0;n<150;n++){if(await fn())return;await new Promise(r=>setTimeout(r,20));}assert.fail('expected native boundary was not reached');}
test('capsule binds actual M and exact A journals once, survives restart and leaves cleanup enumeration intact',()=>using(async f=>{
 assert.equal(await invoke(f),'material_recorded');
 const rows=await f.stub.snapshot(),raw=get(rows,KEY),v=JSON.parse(raw),m=JSON.parse(get(rows,P+'material:'+v.materialHash)),ack=JSON.parse(get(rows,P+'ack')),selector=JSON.parse(get(rows,P+'selector')),plan=JSON.parse(get(rows,C+'plan')),completion=JSON.parse(get(rows,C+'activation-completion'));
 assert.equal(v.purpose,'afw.finite-initial-capsule.v1');assert.equal(v.activatedVersionId,'55555555-5555-4555-8555-555555555555');assert.equal(v.activatedDeploymentId,completion.deploymentId);assert.notEqual(v.activatedVersionId,f.x.pin.id);assert.notEqual(v.activatedDeploymentId,f.x.pin.deploymentId);
 assert.deepEqual(m.qaBootstrap.record.qaLive.publicStatic,finitePublicStaticExpectation('qaLive'));
 const prior=finitePublicProfileTemplate('qaLive').bindings.filter(b=>b.name!=='AFW_FINITE_OWNER_OAUTH_KV');
 const oldHash=initialHash('afw.finite-public-bindings.v1',prior);
 assert.notEqual(oldHash,m.qaBootstrap.record.qaLive.publicStatic.bindingsHash);
 const oldMaterial=structuredClone(m);
 oldMaterial.qaBootstrap.record.qaLive.publicStatic.bindingsHash=oldHash;
 assert.throws(()=>hashFiniteInitialMaterialRecord('InitialMaterial',oldMaterial));
 console.log('D0.1 actual codec lineage '+JSON.stringify({qaBindingsHash:m.qaBootstrap.record.qaLive.publicStatic.bindingsHash,materialHash:v.materialHash,capsuleHash:v.capsuleHash,mBindingsHash:v.bindingsHash}));
 assert.equal(v.selectorHash,hashFiniteInitialMaterialRecord('InitialSelector',selector));assert.equal(v.materialAckHash,hashFiniteInitialMaterialRecord('InitialAck',ack));assert.equal(v.preconnectionId,m.preconnectionId);assert.equal(v.qaVersionId,m.qaBootstrap.currentPointer.versionId);assert.equal(v.qaDeploymentId,m.qaBootstrap.currentPointer.deploymentId);
 assert.equal(v.bindingsHash,createHash('sha256').update(canonical([...plan.configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex'));
 assert.equal(v.moduleHash,f.resident.module.sha256);assert.notEqual(v.moduleHash,f.x.pin.module.sha256);assert.equal(v.C0,v.I0+900000);assert.equal(v.C1,v.C0+180000);assert.ok(v.recordedAt>=completion.observedAt&&v.recordedAt<v.initialDeadline);
 assert.equal(rows.filter(([k])=>k.startsWith(C)).length,6);assert.equal(get(rows,'afw.qa-finite-trial.v1:head'),undefined);assert.equal(await f.stub.alarmInfo(),plan.C0);
 await f.restart();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
 const r=await f.alarmAt(plan.C0+1);try{assert.equal(r.status,'restored');}finally{r[Symbol.dispose]?.();}
 assert.equal(get(await f.stub.snapshot(),KEY),raw);assert.equal(f.restores.length,1);
},'restart'));
for(const field of ['entry','claim','selector','materialAck','material','plan','state','arm','send','activationAck','completion'])test('capsule writer rejects mismatched '+field+' after actual Completion without replay',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure('capsule-mismatch-'+field);
 assert.equal(await invoke(f),'admin_pending');const rows=await f.stub.snapshot();assert.ok(get(rows,C+'activation-completion'));assert.equal(get(rows,KEY),undefined);assert.equal((await stats(f)).capsuleTransactions,1);
 await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
}));
for(const fault of ['missing-completion','coherent-ack','coherent-claim','finite-head','completion-return-lost','completion-sync-lost','completion-readback-lost'])test('capsule '+fault+' denies factual success without reissuing activation',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);assert.equal(await invoke(f),'admin_pending');
 const rows=await f.stub.snapshot();assert.ok(get(rows,C+'activation-completion'));assert.equal(get(rows,KEY),undefined);
 await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
}));
test('preexisting conflicting capsule is immutable and never authority to retry',()=>using(async f=>{
 await f.stub.seed([[KEY,'SYN conflicting capsule']]);assert.equal(await invoke(f),'admin_pending');assert.equal(get(await f.stub.snapshot(),KEY),'SYN conflicting capsule');
 assert.equal(await invoke(f),'admin_pending');assert.equal(f.activations.length,0);assert.equal(f.uploads.length,0);assert.equal(get(await f.stub.snapshot(),P+'entry'),undefined);
}));
for(const fault of ['return-lost','sync-lost','readback-lost','holder-drift'])test('capsule '+fault+' preserves uncertain append across restart without replay',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);assert.equal(await invoke(f),'admin_pending');
 const rows=await f.stub.snapshot();assert.ok(get(rows,KEY));assert.ok(get(rows,C+'activation-completion'));assert.equal(f.activations.length,1);
 await f.restart();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);assert.equal(f.uploads.length,1);
},'restart'));
for(const fault of ['held-sync','held-readback','held-transaction','expired-completion'])test('actual '+fault+' remains retained through deadline and late settlement never resumes',()=>using(async f=>{
 await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);const operation=invoke(f);
 await until(async()=>(await stats(f)).held);assert.equal(await operation,'admin_pending');
 const rows=await f.stub.snapshot();
 assert.equal(await available(f),false);await f.stub.release();await until(()=>available(f));
 const settled=await f.stub.snapshot();if(rows)assert.deepEqual(settled,rows);if(fault==='expired-completion')assert.equal(get(settled,KEY),undefined);
 if(fault==='expired-completion')assert.equal((await stats(f)).capsuleTransactions,0,'no capsule continuation begins after expired Completion');
 assert.equal(await invoke(f),'admin_pending');assert.equal(f.activations.length,1);
}));
test('capsule data linker rejects coherent cross-record contradictions and original timing violations',()=>using(async f=>{
 assert.equal(await invoke(f),'material_recorded');
 const rpc=await f.stub.capsuleFacts();let facts;
 try{facts=JSON.parse(JSON.stringify(rpc));}finally{rpc[Symbol.dispose]?.();}
 facts.recordedAt=facts.completion.observedAt;
 const probe=async value=>{const r=await f.stub.probeCapsuleFacts(value);try{return r.ok;}finally{r[Symbol.dispose]?.();}};
 assert.equal(await probe(facts),true);
 const rehash=(v,key='recordHash')=>{delete v[key];v[key]=initialHash(v.purpose,v);};
 for(const mutate of [
  x=>{x.claim.commandHash='f'.repeat(64);rehash(x.claim,'claimHash');},
  x=>x.selector.preconnectionId='f'.repeat(64),
  x=>x.materialAck.selectorHash='f'.repeat(64),
  x=>{x.material.qaBootstrap.currentPointer.deploymentId='77777777-7777-4777-8777-777777777777';rehash(x.material,'materialHash');},
  x=>{x.plan.materialHash='f'.repeat(64);rehash(x.plan);},
  x=>{x.state.deliveries=1;rehash(x.state);},
  x=>{x.arm.alarmAt++;rehash(x.arm);},
  x=>{x.send.entryHash='f'.repeat(64);rehash(x.send);},
  x=>{x.activationAck.sendHash='f'.repeat(64);rehash(x.activationAck);},
  x=>{x.completion.ackHash='f'.repeat(64);rehash(x.completion);},
  x=>{x.completion.candidateVersionId=x.plan.baselineVersionId;rehash(x.completion);},
  x=>{x.completion.settledAt=x.activationAck.acknowledgedAt-1;rehash(x.completion);},
  x=>x.materialAck.acknowledgedAt=x.material.observedAt-1,
  x=>x.recordedAt=x.completion.observedAt-1,
  x=>x.recordedAt=x.send.deadline
 ]){const altered=structuredClone(facts);mutate(altered);assert.equal(await probe(altered),false);}
}));
