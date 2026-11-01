import test from 'node:test';
import assert from 'node:assert/strict';
import {generationArmFixture} from './fixtures/qa-generation-arm.mjs';
import {HEAD,INFO,CONTROL} from './fixtures/qa-generation-ledger.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const api=await import('../lib/mcp-qa-generation-arm.mjs').catch(()=>({}));
const checks=r=>{assert.ok(Object.isFrozen(r));assert.ok(Buffer.byteLength(JSON.stringify(r))<=2048);for(const k of ['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);for(const secret of ['synthetic-cf-token','packetJson','capsuleJson','new-preparation-grant'])assert.equal(JSON.stringify(r).includes(secret),false);};
test('real ledger arms metadata after two actual primary and fixed HTTP observations, preserving every legacy record',async()=>{
 const x=generationArmFixture(),before=structuredClone([...x.f.rows]),r=await x.run();assert.equal(r.status,'armed');checks(r);
 assert.equal(r.namedBundleHash,x.namedBundleHash);assert.notEqual(r.generationPlanHash,x.namedBundleHash);assert.equal(r.runtimeVersionId,x.http.version);assert.equal(r.preparedIdle,true);assert.equal(r.retainedUncertainty,true);
 assert.equal(x.eligibilityReads,2);assert.equal(x.f.rows.get(HEAD).planHash,r.generationPlanHash);assert.equal(x.f.rows.get(CONTROL+r.generationPlanHash).phase,'armed');
 assert.deepEqual([...x.f.rows].filter(([k])=>!k.startsWith('afw.qa-generation-')),before);
 assert.equal(x.http.requests.filter(r=>r.url.pathname.endsWith('/workflows')).length,2);assert.ok(x.http.requests.every(r=>r.init.method==='GET'));
 assert.ok(x.calls.filter(([k,s])=>k==='dossier-sql'&&s.startsWith('SELECT a.container_id AS containerId')).length>=2);
 assert.ok(x.calls.filter(([k,s])=>k==='dossier-sql'&&s.startsWith('SELECT 1 AS historicalIdentityVerified')).length>=2);
 assert.ok(x.calls.filter(([k,s])=>k==='eligibility-sql'&&s.includes('(SELECT COUNT(*) FROM dossier_successor_reservations)=0')).length===2);
});
test('one-shot consumes even rejected invocation and factory admits no injected authorization',async()=>{
 assert.equal(typeof api.createPrivateQaGenerationArm,'function');const x=generationArmFixture(),a=api.createPrivateQaGenerationArm(x.options);
 assert.equal((await a.arm(x.namedBundleHash)).status,'blocked');assert.equal((await a.arm(x.namedBundleHash,x.parent.signal)).status,'blocked');assert.equal(x.f.storage.puts,0);
 assert.throws(()=>api.createPrivateQaGenerationArm({...x.options,authorize:async()=>true}),/Private QA generation ARM unavailable/);
});
for(const flag of PRIVATE_QA_CLOSED_FLAGS)test('prepared_idle rejects drift in '+flag,async()=>{
 const x=generationArmFixture();x.options.env[flag]=x.options.env[flag]==='true'?'false':'true';const r=await x.run();assert.equal(r.status,'blocked');checks(r);assert.equal(x.f.storage.puts,0);
});
for(const attack of ['absent-db','alias-db','foreign-id','wrong-version','wrong-source','extra-invocation','aborted','wrong-hash','null-journal','orphan-v2','occupied-head'])test('closed admission '+attack,async()=>{
 const x=generationArmFixture();
 if(attack==='absent-db')delete x.options.env.AFW_QA_DOSSIER_DB;
 if(attack==='alias-db')x.options.env.AFW_QA_DOSSIER_DB=x.options.env.AFW_QA_DB;
 if(attack==='foreign-id')x.options.nativeInvocation.instanceId='afw-qa-arm-'+'e'.repeat(64);
 if(attack==='wrong-version')x.options.nativeInvocation.qaVersionId='11111111-1111-4111-8111-111111111111';
 if(attack==='wrong-source')x.options.nativeInvocation.sourceRevision='b'.repeat(40);
 if(attack==='extra-invocation')x.options.nativeInvocation.nativeInvocationVerified=true;
 if(attack==='aborted')x.parent.abort();
 if(attack==='wrong-hash')x.namedBundleHash='e'.repeat(64);
 if(attack==='null-journal')x.f.rows.set('afw.successor-retirement-handoff.v1',null);
 if(attack==='orphan-v2')x.f.rows.set(INFO+'d'.repeat(64),{});
 if(attack==='occupied-head')x.f.rows.set(HEAD,{});
 const r=await x.run();assert.equal(r.status,'blocked');checks(r);assert.equal(x.f.storage.puts,0);
});
for(const attack of ['reservation','revocation','abort','profile','binding','invocation','legacy','draft','clock','http'])test('after pending CAS '+attack+' retains pending uncertainty and never promotes',async()=>{
 const x=generationArmFixture();x.afterEligibility=async n=>{if(n!==2)return;
  if(['reservation','revocation'].includes(attack))x.eligible=false;
  if(attack==='abort')x.parent.abort();
  if(attack==='profile')x.options.env.AFW_QA_HTTP_ENABLED='true';
  if(attack==='binding')x.options.env.AFW_QA_DB={};
  if(attack==='invocation')x.options.nativeInvocation.instanceId='foreign';
  if(attack==='legacy')x.f.rows.set('afw.private-prepared-dispatch.v1',null);
  if(attack==='draft')x.draftJson+=' ';
  if(attack==='clock')x.f.setNow(x.f.now()+5000);
  if(attack==='http')x.mutateHttp=({url,body})=>{if(url.pathname.endsWith('/instances-v2'))body.result=[{id:'foreign'}];};
 };
 const r=await x.run();assert.equal(r.status,'uncertain');checks(r);assert.equal(r.writeMayHaveOccurred,true);
 const head=x.f.rows.get(HEAD);assert.ok(head);assert.equal(x.f.rows.get(CONTROL+head.planHash).phase,'pending');
});
for(const phase of ['pending','armed'])test('lost '+phase+' commit ACK preserves rows and uncertainty without retry',async()=>{
 const x=generationArmFixture(),transaction=x.f.storage.transaction;x.f.storage.transaction=async fn=>{
  const r=await Reflect.apply(transaction,x.f.storage,[fn]);const h=x.f.rows.get(HEAD);
  if(h&&x.f.rows.get(CONTROL+h.planHash).phase===phase)throw Error('synthetic-provider-private');return r;
 };
 const r=await x.run();assert.equal(r.status,'uncertain');checks(r);const h=x.f.rows.get(HEAD);assert.equal(x.f.rows.get(CONTROL+h.planHash).phase,phase);
});
for(const attack of ['native','credential','db-method','external-pin','deadline','abort'])test('first HTTP await fences '+attack+' before any write',async()=>{
 const x=generationArmFixture();let once=false;x.mutateHttp=()=>{if(once)return;once=true;
 if(attack==='native')x.options.nativeInvocation.qaVersionId='11111111-1111-4111-8111-111111111111';
 if(attack==='credential')x.options.env.AFW_MCP_CLOSURE_READ_TOKEN='changed';
 if(attack==='db-method')x.options.env.AFW_QA_DOSSIER_DB.withSession=()=>{};
 if(attack==='external-pin')x.options.externalPins.canary.module.sha256='f'.repeat(64);
 if(attack==='deadline')x.f.setNow(x.f.now()+5000);
 if(attack==='abort')x.parent.abort();
 };
 const r=await x.run();assert.ok(['blocked','uncertain'].includes(r.status));checks(r);assert.equal(x.f.storage.puts,0);
});

for(const phase of ['pending','armed'])test('late '+phase+' transaction ACK cannot turn aborted parent into blocked or successful authority',async()=>{
 const x=generationArmFixture(),transaction=x.f.storage.transaction;let release,held=false;
 x.f.storage.transaction=async fn=>{
  const value=await Reflect.apply(transaction,x.f.storage,[fn]),head=x.f.rows.get(HEAD);
  if(!held&&head&&x.f.rows.get(CONTROL+head.planHash).phase===phase){held=true;const waiting=new Promise(resolve=>{release=resolve;});queueMicrotask(()=>x.parent.abort());await waiting;}
  return value;
 };
 const r=await x.run();assert.equal(r.status,'uncertain');checks(r);assert.equal(r.writeMayHaveOccurred,true);
 const h=x.f.rows.get(HEAD),puts=x.f.storage.puts;assert.equal(x.f.rows.get(CONTROL+h.planHash).phase,phase);
 release();await new Promise(resolve=>setTimeout(resolve,10));assert.equal(x.f.storage.puts,puts);assert.equal(x.f.rows.get(CONTROL+h.planHash).phase,phase);
});
test('expired original clock after armed commit preserves armed row but reports uncertainty',async()=>{
 const x=generationArmFixture(),transaction=x.f.storage.transaction;x.f.storage.transaction=async fn=>{
  const value=await Reflect.apply(transaction,x.f.storage,[fn]),head=x.f.rows.get(HEAD);
  if(head&&x.f.rows.get(CONTROL+head.planHash).phase==='armed')x.f.setNow(x.f.now()+5000);return value;
 };
 const r=await x.run();assert.equal(r.status,'uncertain');checks(r);const h=x.f.rows.get(HEAD);assert.equal(x.f.rows.get(CONTROL+h.planHash).phase,'armed');
});
test('settlement drift after armed DTO assembly remains uncertain',async()=>{
 const x=generationArmFixture(),race=Promise.race;Promise.race=function(values){return Reflect.apply(race,this,[values]).then(value=>{
  if(value?.purpose==='afw.qa-generation-arm.v1'&&value.status==='armed')x.options.env.AFW_QA_VERSION={id:x.http.version};return value;
 });};
 try{const r=await x.run();assert.equal(r.status,'uncertain');checks(r);const h=x.f.rows.get(HEAD);assert.equal(x.f.rows.get(CONTROL+h.planHash).phase,'armed');}finally{Promise.race=race;}
});
test('remaining parent budget is never replenished by draft/primary stages',async()=>{
 const x=generationArmFixture(),original=x.options.now;let calls=0;x.options.timeoutMs=7;x.options.now=()=>original()+Math.floor(calls++/4);
 const r=await x.run();assert.equal(r.status,'blocked');checks(r);assert.equal(x.f.storage.puts,0);
});
test('getter on declared native identity is rejected without invoking it',async()=>{
 const x=generationArmFixture();let reads=0;Object.defineProperty(x.options.nativeInvocation,'instanceId',{enumerable:true,get(){reads++;return 'afw-qa-arm-'+x.namedBundleHash;}});
 const r=await x.run();assert.equal(r.status,'blocked');assert.equal(reads,0);assert.equal(x.f.storage.puts,0);
});
test('concurrent invocations consume one host and admit only one ledger chain',async()=>{
 assert.equal(typeof api.createPrivateQaGenerationArm,'function');const x=generationArmFixture(),host=api.createPrivateQaGenerationArm(x.options);
 const r=await Promise.all([host.arm(x.namedBundleHash,x.parent.signal),host.arm(x.namedBundleHash,x.parent.signal)]);
 assert.deepEqual(r.map(v=>v.status),['armed','blocked']);assert.equal([...x.f.rows.keys()].filter(k=>k.startsWith(INFO)).length,1);assert.equal(x.eligibilityReads,2);
});

test('malformed factory reflection cannot expose private exception text',()=>{
 assert.equal(typeof api.createPrivateQaGenerationArm,'function');
 const hostile=new Proxy({}, {getPrototypeOf(){throw Error('synthetic-private-factory-detail');}});
 assert.throws(()=>api.createPrivateQaGenerationArm(hostile),{message:'Private QA generation ARM unavailable'});
});
