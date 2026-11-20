import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {runPrivateQaFiniteObserver,installPrivateQaFiniteObserverSource,FINITE_OBSERVER_OPERATION,FINITE_PREVIEW_STEP,FINITE_CLAIM_STEP,validateFiniteObserverPreviewEnvelope} from '../lib/mcp-qa-finite-observer.mjs';
let installed=false;
async function fixture(){
 const f=await finiteFinalizerFixture(),v=f.preview;let samples=0,claims=0,finalReads=0,at=v.T0,readyAt=v.C0;
 const names=[],sleeps=[],options=[];
 const actor={
 previewFiniteTrialMaterial:async()=>v,
 readFiniteTrialCleanupProofHead:async()=>{samples++;return at<readyAt?{status:'not_yet_observed'}:{status:'observed',intentId:v.intentId,controlHash:v.controlHash,proofHash:f.output.retained.proofHash};},
 readRetainedFiniteCleanupProof:async()=>({status:'observed',record:f.output.retained}),
 readFiniteTrialCleanupCompletion:async()=>({status:'complete',receipt:f.output.completion}),
 claimFiniteTrialQaRestore:async()=>{claims++;return f.output.qaClaim;},
 readFiniteTrialFinalPrimary:async()=>{finalReads++;return {plan:f.plan,receipt:f.output.primaryReceipt};}
 };
 const env={AFW_QA_VERSION:{id:v.runtimeVersionId},AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{assert.equal(name,'afw-own-successor-closure-v1');return {toString:()=>v.actorId};},get:()=>actor}};
 const event={instanceId:f.plan.workflows.bootstrap,payload:{operation:FINITE_OBSERVER_OPERATION,intentId:v.intentId,sourceRevision:v.sourceRevision}};
 const step={do:async(name,opts,fn)=>{names.push(name);options.push(opts);return fn();},sleepUntil:async(name,date)=>{sleeps.push({name,at:date.getTime()});at=date.getTime();}};
 return {f,v,env,event,step,actor,names,sleeps,options,now:()=>at,setReady:value=>{readyAt=value;},get samples(){return samples;},get claims(){return claims;},get finalReads(){return finalReads;}};
}
test('absent compiled observer source is unavailable before actor access',async()=>{
 const f=await fixture();assert.equal((await runPrivateQaFiniteObserver(f)).status,'admin_pending');assert.equal(f.samples,0);assert.equal(f.names.length,0);
 installPrivateQaFiniteObserverSource(f.v.sourceRevision);installed=true;
});
test('material first, deterministic observation slots and one separately named journal claim',async()=>{
 assert.ok(installed);const f=await fixture();f.setReady(f.v.C1-1000);
 const r=await runPrivateQaFiniteObserver(f);assert.equal(r.purpose,'afw.finite-observer-output.v1');
 assert.equal(f.names[0],FINITE_PREVIEW_STEP);assert.equal(f.names.at(-2),FINITE_CLAIM_STEP);assert.equal(f.names.at(-1),'finite-final-primary');
 assert.ok(f.samples>1&&f.samples<=30);assert.ok(f.sleeps.at(-1).at>=f.v.C1-1000);assert.equal(f.claims,1);assert.equal(f.finalReads,1);
 assert.equal(new Set(f.names).size,f.names.length);assert.ok(f.options.every(x=>x.retries.limit===0));assert.equal(r.provenance.runtimeVersionId,f.v.runtimeVersionId);
});
test('absent proof is sampled through original capture window, never forever cached or resealed',async()=>{
 const f=await fixture();f.setReady(f.v.R1);
 const r=await runPrivateQaFiniteObserver(f);assert.equal(r.status,'admin_pending');assert.equal(f.samples,30);assert.equal(f.claims,0);assert.ok(f.sleeps.at(-1).at>f.v.C1);
});
for(const mode of ['wrong-source','wrong-instance','extra-selector','claim-lost','claim-existing','primary-writer'])test('observer closes for '+mode,async()=>{
 const f=await fixture();
 if(mode==='wrong-source')f.event.payload.sourceRevision='c'.repeat(40);
 if(mode==='wrong-instance')f.event.instanceId='replacement';
 if(mode==='extra-selector')f.event.payload.actorId=f.v.actorId;
 if(mode==='claim-lost')f.actor.claimFiniteTrialQaRestore=async()=>{throw Error('lost ACK');};
 if(mode==='claim-existing')f.actor.claimFiniteTrialQaRestore=async()=>({status:'reconcile_only'});
 if(mode==='primary-writer')f.actor.readFiniteTrialFinalPrimary=async()=>{throw Error('held D1 writer');};
 const r=await runPrivateQaFiniteObserver(f);assert.equal(r.status,'admin_pending');
});

test('finite-only observer records the setup receipt from its fixed QA actor',async()=>{
 const f=await fixture(),receipt='7'.repeat(64);let observed;
 f.actor.previewFiniteTrialMaterial=async()=>{assert.fail('legacy preview used');};
 f.actor.fetch=async request=>{
  assert.equal(request.url,'https://afw-private.invalid/_finite-native/observer-preview');
  assert.equal(request.method,'GET');assert.equal(request.body,null);
  return Response.json({material:f.v,setupReceiptHash:receipt,plan:f.f.plan});
 };
 const step={...f.step,do:async(name,opts,fn)=>{
  const value=await f.step.do(name,opts,fn);
  if(name===FINITE_PREVIEW_STEP)observed=value;
  return value;
 }};
 const result=await runPrivateQaFiniteObserver({...f,step,requireSetupReceipt:true});
 assert.equal(result.purpose,'afw.finite-observer-output.v1');
 assert.equal(observed.purpose,'afw.finite-observer-preview.v2');
 assert.equal(observed.setupReceiptHash,receipt);
 assert.equal(f.claims,1);
});
test('finite-only observer refuses a preview without the setup receipt before any restoration claim',async()=>{
 const f=await fixture();
 f.actor.fetch=async()=>Response.json({material:f.v});
 const result=await runPrivateQaFiniteObserver({...f,requireSetupReceipt:true});
 assert.equal(result.status,'admin_pending');assert.equal(f.samples,0);assert.equal(f.claims,0);
});

test('adoption only accepts a preview with the independently read setup receipt',async()=>{
 const f=await fixture(),expected='8'.repeat(64),provenance=f.f.output.provenance,material=f.v;
 const receipt={purpose:'afw.finite-observer-preview.v2',provenance,material,setupReceiptHash:expected,plan:f.f.plan};
 assert.deepEqual(validateFiniteObserverPreviewEnvelope(receipt,{setupReceiptHash:expected}),receipt);
 assert.throws(()=>validateFiniteObserverPreviewEnvelope(receipt,{setupReceiptHash:'9'.repeat(64)}));
 const legacy={purpose:'afw.finite-observer-preview.v1',provenance,material};
 assert.throws(()=>validateFiniteObserverPreviewEnvelope(legacy,{setupReceiptHash:expected}));
 assert.deepEqual(validateFiniteObserverPreviewEnvelope(legacy),legacy);
});

function independentScope(v){
 return {purpose:'afw.finite-independent-qa-restore-scope.v1',status:'reserved',intentId:v.intentId,
  sourceRevision:v.sourceRevision,controlHash:v.controlHash,planHash:v.planHash,runtimeVersionId:v.runtimeVersionId,
  handoffHash:'6'.repeat(64),restoreFrom:v.R1+60000,restoreBefore:v.R1+240000,
  authorizesEffects:false,operationalReadiness:false};
}
test('the native observer stops sending on an uncertain launch and hands the committed scope to independent QA',async()=>{
 const f=await fixture(),calls=[],reads=[],scope=independentScope(f.v);
 f.actor.fetch=async()=>Response.json({material:f.v,setupReceiptHash:'7'.repeat(64),plan:f.f.plan});
 f.actor.scheduleFiniteNominalLauncher=async refs=>{
  calls.push({refs,at:f.now()});
  if(calls.length===1)return {status:'pending',operationalReadiness:false};
  return {status:'uncertain',operationalReadiness:false};
 };
 f.actor.readFiniteIndependentQaRestoreScope=async refs=>{
  reads.push(refs);
  return reads.length===1?{status:'pending',authorizesEffects:false,operationalReadiness:false}:scope;
 };
 const result=await runPrivateQaFiniteObserver({...f,requireSetupReceipt:true,useNativeLauncher:true});
 assert.equal(result.purpose,'afw.finite-native-observer-handoff.v1');
 assert.deepEqual(result.scope,scope);
 assert.deepEqual(calls.map(row=>row.refs),Array(2).fill({intentId:f.v.intentId,sourceRevision:f.v.sourceRevision,controlHash:f.v.controlHash}));
 assert(calls[0].at>=f.v.T0&&calls[1].at<f.v.T0+90000);
 assert.equal(f.names[0],FINITE_PREVIEW_STEP);
 assert.deepEqual(reads,Array(2).fill({intentId:f.v.intentId,sourceRevision:f.v.sourceRevision,controlHash:f.v.controlHash}));
 assert.equal(f.samples,0);assert.equal(f.claims,0);assert.equal(f.finalReads,0);
});
for(const fault of ['missing handoff','foreign control','wrong clock','late cached scope'])test('native observer denies '+fault+' without the legacy restore path',async()=>{
 const f=await fixture(),scope=independentScope(f.v);let reads=0;
 f.actor.fetch=async()=>Response.json({material:f.v,setupReceiptHash:'7'.repeat(64),plan:f.f.plan});
 f.actor.scheduleFiniteNominalLauncher=async()=>({status:'acknowledged',operationalReadiness:false});
 f.actor.readFiniteIndependentQaRestoreScope=async()=>{
  reads++;
  if(fault==='missing handoff')return {status:'pending',authorizesEffects:false,operationalReadiness:false};
  if(fault==='foreign control')return {...scope,controlHash:'f'.repeat(64)};
  if(fault==='wrong clock')return {...scope,restoreFrom:f.v.R1};
  return scope;
 };
 const base=f.step.do;
 if(fault==='late cached scope')f.step.do=async(name,opts,fn)=>{
  const value=await base(name,opts,fn);
  if(name.startsWith('finite-independent-qa-scope-'))await f.step.sleepUntil('delayed step resume',new Date(f.v.C0));
  return value;
 };
 const result=await runPrivateQaFiniteObserver({...f,requireSetupReceipt:true,useNativeLauncher:true});
 assert.equal(result.status,'admin_pending');
 assert(reads>0&&reads<=6);
 assert.equal(f.samples,0);assert.equal(f.claims,0);assert.equal(f.finalReads,0);
});
