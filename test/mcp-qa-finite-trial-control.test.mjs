import {finiteCleanupPolicyHash} from '../lib/mcp-finite-cleanup-policy.mjs';
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
 const f=finiteFixture();await control(f).prepare();const head=structuredClone(f.rows.get(HEAD));f.plan.intentId='other';f.plan.closePolicyHash=finiteCleanupPolicyHash(f.plan);assert.equal((await control(f).prepare()).status,'blocked');assert.deepEqual(f.rows.get(HEAD),head);
 for(const key of ['afw.qa-generation-head.v2','afw.qa-generation-info.v2:orphan',ROOT+':orphan:info']){
 const g=finiteFixture();g.rows.set(key,{});assert.equal((await control(g).prepare()).status,'blocked');assert.equal(g.puts,0);}
});
for(const mutation of [
 p=>{p.N1++;},p=>{p.C0++;},p=>{p.C1++;},p=>{p.R1++;},p=>{p.T0++;},
 p=>{p.command.kind='closed';},p=>{p.command.repository='other/repo';},p=>{p.source.extra=true;},
 p=>{p.selectors.subscriptionId='future';},p=>{p.selectors.expectedProjectRevision=0;},p=>{p.workflows.confirmation='other';},
 p=>{p.finalizer.runId=0;},p=>{p.legacy.preparedDispatchHash='0'.repeat(64);}
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
])test('arm denies '+label,async()=>{const f=finiteFixture();mutate(f);const pending=['queued finalizer','ready boolean','unfinished admit','wrong source','wrong job'].includes(label);assert.equal((await control(f).prepare()).status,pending?'uncertain':'blocked');if(pending){assert.ok(f.puts>0);assert.equal(f.alarm,f.plan.C0);}else assert.equal(f.puts,0);});
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
 const f=finiteFixture(),c=control(f);await c.prepare();f.setNow(f.plan.T0+1);await c.read();f.setNow(f.plan.T0);assert.equal((await c.claimEffect('nominal')).status,'blocked');f.setNow(f.plan.T0+2);assert.equal((await c.claimEffect('nominal')).status,'blocked');
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

test('separate QA and canary source tuples are bound without fabricated equal hashes',async()=>{
 const f=finiteFixture();assert.notEqual(f.plan.source.moduleHash,f.plan.canaryContainment.moduleHash);const c=control(f);assert.equal((await c.prepare()).status,'armed');
 const g=finiteFixture(),original=g.primary.admission;g.primary.admission=async()=>{const v=await original();v.containment.sourceHash=g.plan.source.moduleHash;return v;};
 assert.equal((await control(g).prepare()).status,'blocked');
});
test('saved fact capture rechecks primary subscription/process against retained facts',async()=>{
 const f=finiteFixture();for(const k of ['subscription','process','saved_event'])f.primary[k==='saved_event'?'savedEvent':k]=async()=>f.facts[k]();
 const c=control(f);await c.prepare();await c.captureObservedFacts('subscription');await c.captureObservedFacts('process');
 const old=f.facts.subscription;f.facts.subscription=()=>({...old(),receiptHash:'f'.repeat(64)});const n=f.puts;
 assert.equal((await c.captureObservedFacts('saved_event')).status,'blocked');assert.equal(f.puts,n);
});
test('late commit after bounded timeout preserves pending and cannot arm',async()=>{
 const f=finiteFixture(),original=f.storage.transaction;
 f.storage.transaction=async fn=>{const result=await original.call(f.storage,fn);await new Promise(r=>setTimeout(r,40));return result;};
 const options=f.options(api);options.timeoutMs=10;const c=api.createPrivateQaFiniteTrialControl(options);
 assert.equal((await c.prepare()).status,'uncertain');await new Promise(r=>setTimeout(r,60));
 const row=f.rows.get(ROOT+':'+f.plan.intentId+':control');assert.equal(row.phase,'pending');assert.equal(row.armedAt,null);
 assert.equal((await c.claimEffect('nominal')).status,'blocked');
});
test('captured facts and immutable claims reject corrupted or unknown stored records',async()=>{
 for(const suffix of ['unexpected','effect:close']){
 const f=finiteFixture(),c=control(f);await c.prepare();f.rows.set(ROOT+':'+f.plan.intentId+':'+suffix,{phase:'complete'});assert.equal((await c.read()).status,'blocked');}
});
test('capture expiry and changed native profile do not move any original deadline',async()=>{
 const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();const n=f.puts;f.setNow(f.plan.N1);
 assert.equal((await c.captureObservedFacts('subscription')).status,'blocked');assert.equal(f.puts,n);assert.equal(f.alarm,f.plan.C0);
});

test('narrow primary consent never widens or survives an awaited finalizer expiry',async()=>{
 for(const operation of ['prepare','claimEffect','captureObservedFacts']){
 const f=finiteFixture();let expire=false;
 const base=f.primary.admission;f.primary.admission=async()=>{const v=await base();v.consent.expiresAt=f.plan.T0+10;return v;};
 const finalizer=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await finalizer();if(expire)f.setNow(f.plan.T0+10);return v;};
 f.primary.subscription=async()=>{const v=f.facts.subscription();if(expire)f.setNow(f.plan.T0+10);return v;};
 const c=control(f);if(operation!=='prepare')await c.prepare();const n=f.puts;expire=true;
 const r=await (operation==='prepare'?c.prepare():operation==='claimEffect'?c.claimEffect('nominal'):c.captureObservedFacts('subscription'));
 assert.equal(r.status,operation==='prepare'?'uncertain':'blocked');if(operation==='prepare'){assert.ok(f.puts>n);assert.equal(f.alarm,f.plan.C0);}else assert.equal(f.puts,n);
 }
});
test('consent expiry inside pending transaction prevents acknowledgment/nominal arm',async()=>{
 const f=finiteFixture(),base=f.primary.admission;f.primary.admission=async()=>{const v=await base();v.consent.expiresAt=f.plan.T0+10;return v;};
 const original=f.storage.transaction;f.storage.transaction=fn=>original.call(f.storage,async t=>fn({...t,put:async(k,v)=>{await t.put(k,v);if(k.endsWith(':info'))f.setNow(f.plan.T0+10);}}));
 const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.claimEffect('nominal')).status,'blocked');
});

test('consumed expired finite head cannot be reset, reused or advanced to another intent',async()=>{
 const f=finiteFixture(),c=control(f);await c.prepare();await c.claimEffect('nominal');await c.withdrawNominal();f.setNow(f.plan.R1+1);
 const old=[...f.rows].map(([k,v])=>[k,JSON.stringify(v)]);assert.equal((await control(f).prepare()).status,'blocked');
 const g=finiteFixture({at:f.plan.R1+1});g.plan.intentId='next-intent';g.plan.closePolicyHash=finiteCleanupPolicyHash(g.plan);g.rows.clear();for(const [k,v]of f.rows)g.rows.set(k,structuredClone(v));
 assert.equal((await control(g).prepare()).status,'blocked');assert.equal(g.puts,0);assert.deepEqual([...g.rows].map(([k,v])=>[k,JSON.stringify(v)]),old);
});
test('restore claims are distinct, bound to the same retained proof and reconciled read-only',async()=>{
 const f=finiteFixture();let controlHash,proofHash='1'.repeat(64),mode='eligibility',claim;
 f.primary.effect=async kind=>mode==='eligibility'?{purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash,kind,proofHash,observedAt:f.now(),eligible:true,evidenceHash:'2'.repeat(64)}:{purpose:'afw.qa-finite-effect-receipt.v1',intentId:f.plan.intentId,controlHash,kind,claimHash:hash(ROOT+':effect\n'+JSON.stringify(claim)),receiptHash:'3'.repeat(64),observedAt:f.now(),outcome:'complete'};
 const c=control(f);controlHash=(await c.prepare()).controlHash;
 const canary=await c.claimEffect('canary_restore');assert.equal(canary.status,'issued');
 proofHash='4'.repeat(64);assert.equal((await c.claimEffect('qa_restore')).status,'blocked');proofHash='1'.repeat(64);
 const qa=await c.claimEffect('qa_restore');assert.equal(qa.status,'issued');assert.notDeepEqual(canary.claim,qa.claim);
 claim=qa.claim;mode='receipt';const n=f.puts;assert.equal((await c.reconcileEffect('qa_restore')).status,'reconciled');assert.equal(f.puts,n);
});
test('nominal immutable claim retains narrower primary expiry and cannot refund its eligibility',async()=>{
 const f=finiteFixture(),original=f.primary.admission;f.primary.admission=async()=>{const v=await original();v.consent.expiresAt=f.plan.T0+100;return v;};
 const c=control(f);await c.prepare();const r=await c.claimEffect('nominal');assert.equal(r.claim.deadline,f.plan.T0+100);
 assert.equal((await c.read()).nominalEligible,false);assert.equal((await c.claimEffect('nominal')).status,'reconcile_only');
});
test('native pin invalidates when an unrelated closed QA flag is opened',async()=>{
 const f=finiteFixture(),c=control(f);f.env.AFW_QA_HTTP_ENABLED='true';assert.equal((await c.prepare()).status,'blocked');assert.equal(f.puts,0);
});

for(const kind of ['close','qa_restore'])test('late '+kind+' claim ACK at original cleanup expiry is uncertain and consumed',{timeout:5000},async()=>{
 const f=finiteFixture();let controlHash,claim,receiptMode=false,release,entered;
 const held=new Promise(resolve=>{release=resolve;}),started=new Promise(resolve=>{entered=resolve;});
 const original=f.storage.transaction;
 f.storage.transaction=async fn=>{
  const result=await original.call(f.storage,fn);
  if(result?.claim?.kind===kind){claim=result.claim;entered();await held;}
  return result;
 };
 f.primary.effect=async selected=>receiptMode?{
  purpose:'afw.qa-finite-effect-receipt.v1',intentId:f.plan.intentId,controlHash,kind:selected,
  claimHash:hash(ROOT+':effect\n'+JSON.stringify(claim)),receiptHash:'3'.repeat(64),observedAt:f.now(),outcome:'complete'
 }:{
  purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash,kind:selected,
  proofHash:'1'.repeat(64),observedAt:f.now(),eligible:true,evidenceHash:'2'.repeat(64)
 };
 const c=control(f);controlHash=(await c.prepare()).controlHash;
 const end=kind==='qa_restore'?f.plan.R1:f.plan.C1;f.setNow(end-1);
 const pending=c.claimEffect(kind);await started;
 const key=ROOT+':'+f.plan.intentId+':effect:'+kind,retained=structuredClone(f.rows.get(key)),puts=f.puts;
 assert.equal(retained.phase,'issued');assert.equal(retained.issuedAt,end-1);assert.equal(retained.deadline,end);
 f.setNow(end);release();assert.equal((await pending).status,'uncertain');
 assert.deepEqual(f.rows.get(key),retained);assert.equal(f.puts,puts);
 assert.equal((await c.claimEffect(kind)).status,'reconcile_only');assert.equal(f.puts,puts);
 receiptMode=true;f.setNow(end+1);assert.equal((await c.reconcileEffect(kind)).status,'reconciled');
 assert.deepEqual(f.rows.get(key),retained);assert.equal(f.puts,puts);
});

test('finite plan pins exact closed module bytes and canonical cleanup policy',()=>{
 for(const mode of ['missing','hash','bytes','name','policy']){const f=finiteFixture();
  if(mode==='missing')delete f.plan.deployments.qaClosed.module;
  if(mode==='hash')f.plan.deployments.qaLive.module.sha256='0'.repeat(64);
  if(mode==='bytes')f.plan.deployments.canaryClosed.module.bytes=0;
  if(mode==='name')f.plan.deployments.canaryClosed.module.name='../worker';
  if(mode==='policy')f.plan.closePolicyHash='0'.repeat(64);
  assert.throws(()=>control(f));
 }
});

test('first finalizer readiness failure leaves durable pending control and original alarm',async()=>{
 const f=finiteFixture();f.primary.finalizer=async()=>{throw Error('synthetic unavailable resource admission');};const c=control(f);
 assert.equal((await c.prepare()).status,'uncertain');assert.equal(f.alarm,f.plan.C0);
 const r=await control(f).read();assert.equal(r.phase,'pending');assert.equal(r.nominalEligible,false);
 assert.equal((await control(f).claimEffect('nominal')).status,'blocked');assert.equal((await control(f).claimEffect('close')).status,'issued');
});

test('native nominal identity needs no fictitious GHA run; legacy field is rejected',async()=>{
 const f=finiteFixture();assert.deepEqual(Object.keys(f.plan.workflows),['confirmation','bootstrap']);
 const c=control(f);assert.equal((await c.prepare()).status,'armed');
 assert.equal((await c.claimEffect('nominal')).status,'issued');
 const g=finiteFixture();g.plan.workflows.nominalRunId=10;assert.throws(()=>control(g));
});
for(const [name,mutate] of [
 ['run',v=>v.runId++],['attempt',v=>v.attempt++],['job',v=>v.job.id++],
 ['workflow',v=>v.workflow='other'],['repository',v=>v.repository='other/repo'],
])test('exact finalizer primary still required: '+name,async()=>{
 const f=finiteFixture(),base=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await base();mutate(v);return v;};
 const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.claimEffect('nominal')).status,'blocked');
});
test('external projection removes nominal GHA identity and preserves exact finalizer fields',async()=>{
 const {finiteFinalizerFixture}=await import('./fixtures/finite-finalizer.mjs');
 const {validateFiniteExternalPlan}=await import('../lib/mcp-qa-finite-external-contract.mjs');
 const f=await finiteFinalizerFixture();assert.deepEqual(Object.keys(f.plan.workflows),['confirmation','bootstrap']);
 assert.deepEqual(f.plan.finalizer,f.f.plan.finalizer);assert.doesNotThrow(()=>validateFiniteExternalPlan(f.plan));
 const old=structuredClone(f.plan);old.workflows.nominalRunId=10;assert.throws(()=>validateFiniteExternalPlan(old));
 for(const [key,value] of [['runId',0],['jobId',0],['attempt',2],['workflow','other'],['sourceRevision','0'.repeat(40)]]){
  const p=structuredClone(f.plan);p.finalizer[key]=value;assert.throws(()=>validateFiniteExternalPlan(p));
 }
});
