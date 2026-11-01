import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFixture,ROOT,HEAD,hash} from './fixtures/qa-finite-trial.mjs';
const api=await import('../lib/mcp-qa-finite-trial-control.mjs').catch(()=>({}));
const control=f=>{assert.equal(typeof api.createPrivateQaFiniteTrialControl,'function');return api.createPrivateQaFiniteTrialControl(f.options(api));};
test('prepare stores planned INFO before subscription/save, exact original clocks and durable alarm',async()=>{
 const f=finiteFixture(),c=control(f),old=[...f.rows].map(([k,v])=>[k,JSON.stringify(v)]);
 assert.equal((await c.prepare()).status,'armed');assert.equal(f.alarm,f.plan.C0);
 const r=await c.read();assert.equal(r.phase,'armed');assert.equal(r.nominalEligible,true);assert.equal(r.operationalReadiness,false);
 const info=f.rows.get(ROOT+':'+f.plan.intentId+':info');assert.equal(info.plan,JSON.stringify(f.plan));assert.equal(JSON.stringify(info).includes('subscriptionId'),false);
 const before=f.puts;assert.equal((await c.captureObservedFacts('subscription')).status,'not_yet_observed');assert.equal(f.puts,before);
 for(const [k,v]of old)assert.equal(JSON.stringify(f.rows.get(k)),v);
 assert.equal((await c.prepare()).status,'blocked');assert.equal(f.puts,before);
});
test('capture exact fixed primary facts once, preserves immutable INFO/control hash',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();const info=structuredClone(f.rows.get(ROOT+':'+f.plan.intentId+':info'));
 for(const kind of ['subscription','process','saved_event']){f.primary[kind==='saved_event'?'savedEvent':kind]=async()=>f.facts[kind]();}
 // Capability method replacement is forbidden for an existing control; reconstruct.
 const fresh=control(f);
 for(const kind of ['subscription','process','saved_event'])assert.equal((await fresh.captureObservedFacts(kind)).status,'captured');
 const n=f.puts;assert.equal((await fresh.captureObservedFacts('saved_event')).status,'observed');assert.equal(f.puts,n);
 assert.deepEqual(f.rows.get(ROOT+':'+f.plan.intentId+':info'),info);
 assert.equal((await fresh.captureObservedFacts('latest')).status,'blocked');
 assert.equal((await fresh.captureObservedFacts('subscription',{})).status,'blocked');
});
test('withdraw nominal leaves cleanup claims and original alarm intact',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();assert.equal((await c.withdrawNominal()).status,'withdrawn');assert.equal(f.alarm,f.plan.C0);
 assert.equal((await c.claimEffect('nominal')).status,'blocked');
 f.setNow(f.plan.N1+1);assert.equal((await c.claimEffect('withdraw')).status,'issued');assert.equal((await c.claimEffect('withdraw')).status,'reconcile_only');
 f.setNow(f.plan.C1);assert.equal((await c.claimEffect('close')).status,'blocked');
 assert.equal((await c.read()).nominalEligible,false);
});
test('fresh per-intent head rejects a second intent and V2/orphan histories',async()=>{
 const f=finiteFixture();await control(f).prepare();const head=structuredClone(f.rows.get(HEAD));f.plan.intentId='other';assert.equal((await control(f).prepare()).status,'blocked');assert.deepEqual(f.rows.get(HEAD),head);
 for(const key of ['afw.qa-generation-head.v2','afw.qa-generation-info.v2:orphan',ROOT+':orphan:info']){
 const g=finiteFixture();g.rows.set(key,{});assert.equal((await control(g).prepare()).status,'blocked');assert.equal(g.puts,0);}
});
for(const mutation of [
 p=>{p.N1++;},p=>{p.C0++;},p=>{p.C1++;},p=>{p.R1++;},p=>{p.T0++;},
 p=>{p.command.kind='closed';},p=>{p.command.repository='other/repo';},p=>{p.source.extra=true;},
 p=>{p.selectors.subscriptionId='future';},p=>{p.selectors.expectedProjectRevision=0;},p=>{p.workflows.confirmation='other';},
 p=>{p.finalizer.runId=p.workflows.nominalRunId;},p=>{p.legacy.preparedDispatchHash='0'.repeat(64);}
])test('strict immutable plan rejects '+mutation.toString(),()=>{const f=finiteFixture();mutation(f.plan);assert.throws(()=>control(f));});
for(const [label,mutate]of [
 ['future T0',f=>f.setNow(f.plan.T0-1)],['less than 180s remaining',f=>f.setNow(f.plan.N1-179999)],
 ['uncontained legacy',f=>{const fn=f.primary.admission;f.primary.admission=async()=>{const v=await fn();v.containment.denyBeforeAccess=false;return v;};}],
 ['unresolved current write',f=>{const fn=f.primary.admission;f.primary.admission=async()=>{const v=await fn();v.quiescence.unresolvedWrites=1;return v;};}],
 ['queued finalizer',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.status='queued';return v;};}],
 ['ready boolean',f=>{f.primary.finalizer=async()=>({ready:true});}],
 ['unfinished admit',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.job.steps[0].status='in_progress';return v;};}],
 ['wrong source',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.sourceRevision='0'.repeat(40);return v;};}],
 ['wrong job',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.job.id++;return v;};}],
 ['changed legacy',f=>{f.rows.get('afw.private-prepared-dispatch.v1').phase='complete';}],
 ['present restoration',f=>{f.rows.set('afw.successor-canary-restoration.v1',null);}]
])test('arm denies '+label,async()=>{const f=finiteFixture();mutate(f);assert.equal((await control(f).prepare()).status,'blocked');assert.equal(f.puts,0);});
test('unknown initial commit stays pending, read does not arm or retry',async()=>{
 const f=finiteFixture();f.lost.add(1);const c=control(f);assert.equal((await c.prepare()).status,'uncertain');const n=f.puts;
 assert.equal((await control(f).read()).phase,'pending');assert.equal((await control(f).read()).nominalEligible,false);assert.equal((await control(f).prepare()).status,'blocked');assert.equal(f.puts,n);
});
test('alarm mismatch leaves pending and cannot be compensated',async()=>{
 const f=finiteFixture();f.storage.getAlarm=async()=>null;const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.read()).phase,'pending');
});
test('native pin rejects attestation and binds ctx storage, actual version and flags without touching secrets',async()=>{
 const f=finiteFixture();Object.defineProperty(f.env,'AFW_RELEASE_READ_TOKEN',{get(){throw Error('secret read');}});
 const options=f.options(api);assert.throws(()=>api.createPrivateQaFiniteTrialControl({...options,nativePin:{snapshot:()=>({ready:true})}}));
 const c=api.createPrivateQaFiniteTrialControl(options);assert.equal((await c.prepare()).status,'armed');
 f.env.AFW_RELEASE_WORKFLOW_ENABLED='false';assert.equal((await c.read()).status,'blocked');f.env.AFW_RELEASE_WORKFLOW_ENABLED='true';assert.equal((await c.claimEffect('nominal')).status,'blocked');
});
test('plan getters and noncanonical encoding rejected without evaluation',()=>{
 const f=finiteFixture();let calls=0;const o=f.options(api);Object.defineProperty(o,'plan',{enumerable:true,get(){calls++;return '{}';}});assert.throws(()=>api.createPrivateQaFiniteTrialControl(o));assert.equal(calls,0);
 const g=finiteFixture();assert.throws(()=>api.createPrivateQaFiniteTrialControl({...g.options(api),plan:JSON.stringify(g.plan,null,2)}));
});
test('capture rejects replacement receipt, wrong saved revision/fingerprint and generation',async()=>{
 for(const [kind,key,val]of [['subscription','receiptHash','f'.repeat(64)],['process','processGeneration','replacement'],['saved_event','revision',3],['saved_event','fingerprint','f'.repeat(64)]]){
 const f=finiteFixture();for(const k of ['subscription','process','saved_event'])f.primary[k==='saved_event'?'savedEvent':k]=async()=>f.facts[k]();
 const c=control(f);await c.prepare();await c.captureObservedFacts('subscription');await c.captureObservedFacts('process');await c.captureObservedFacts('saved_event');const old=f.facts[kind];f.facts[kind]=()=>({...old(),[key]:val});
 const n=f.puts;assert.equal((await c.captureObservedFacts(kind)).status,'blocked');assert.equal(f.puts,n);
 }
});
test('duplicate primary candidates and future primary facts rejected',async()=>{
 for(const patch of [{candidates:2},{observedAt:Infinity},{observedAt:0}]){
 const f=finiteFixture();f.primary.subscription=async()=>({...f.facts.subscription(),...patch});const c=control(f);await c.prepare();const n=f.puts;assert.equal((await c.captureObservedFacts('subscription')).status,'blocked');assert.equal(f.puts,n);}
});
test('unknown fact commit reconciles retained exact record without append/replay',async()=>{
 const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();f.lost.add(f.transactions+2);
 assert.equal((await c.captureObservedFacts('subscription')).status,'uncertain');const n=f.puts;
 assert.equal((await control(f).captureObservedFacts('subscription')).status,'observed');assert.equal(f.puts,n);
});
test('unknown fact claim without fact cannot be retried after reconstruction',async()=>{
 const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();f.lost.add(f.transactions+1);
 assert.equal((await c.captureObservedFacts('subscription')).status,'uncertain');const n=f.puts;
 assert.equal((await control(f).captureObservedFacts('subscription')).status,'reconcile_only');assert.equal(f.puts,n);
});
test('effect reconciliation is read only, receipts supplied as facts are rejected',async()=>{
 const f=finiteFixture();const c=control(f);await c.prepare();const claim=await c.claimEffect('nominal');assert.equal(claim.status,'issued');const n=f.puts;
 assert.equal((await c.reconcileEffect('nominal',{completed:true})).status,'blocked');assert.equal(f.puts,n);
 assert.equal((await c.reconcileEffect('nominal')).status,'unresolved');assert.equal(f.puts,n);
});
test('clock reversal invalidates current instance; original expiry survives reconstruction',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();f.setNow(f.plan.T0+1);await c.read();f.setNow(f.plan.T0);assert.equal((await c.claimEffect('nominal')).status,'blocked');
 f.setNow(f.plan.N1);assert.equal((await control(f).claimEffect('nominal')).status,'blocked');assert.equal((await control(f).read()).nominalEligible,false);
});
test('changed native tuple and primary capability fail closed',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();f.primary.admission=async()=>f.admission();assert.equal((await c.claimEffect('nominal')).status,'blocked');
 const g=finiteFixture(),d=control(g);g.env.AFW_QA_VERSION={id:g.env.AFW_QA_VERSION.id};assert.equal((await d.prepare()).status,'blocked');
});
test('no future saved evidence is synthesized or selected by latest',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();const n=f.puts;assert.equal((await c.captureObservedFacts('saved_event')).status,'not_yet_observed');assert.equal(f.puts,n);
 assert.equal(hash(JSON.stringify(f.plan)).length,64);
});

test('lost armed CAS ACK never grants nominal authority after reconstruction',async()=>{
 const f=finiteFixture();f.lost.add(2);const c=control(f);assert.equal((await c.prepare()).status,'uncertain');
 const n=f.puts,recovered=control(f);assert.equal((await recovered.read()).phase,'armed');assert.equal((await recovered.read()).nominalEligible,false);
 assert.equal((await recovered.claimEffect('nominal')).status,'blocked');assert.equal(f.puts,n);
 assert.equal((await recovered.claimEffect('close')).status,'issued');
});
test('successful prepare does not revive nominal after instance reconstruction',async()=>{
 const f=finiteFixture();assert.equal((await control(f).prepare()).status,'armed');assert.equal((await control(f).claimEffect('nominal')).status,'blocked');
});
