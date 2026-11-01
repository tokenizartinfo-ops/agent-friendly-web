import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {runPrivateQaFiniteObserver,installPrivateQaFiniteObserverSource,FINITE_OBSERVER_OPERATION,FINITE_PREVIEW_STEP,FINITE_CLAIM_STEP} from '../lib/mcp-qa-finite-observer.mjs';
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
 assert.ok(f.samples>1&&f.samples<=31);assert.ok(f.sleeps.at(-1).at>=f.v.C1-1000);assert.equal(f.claims,1);assert.equal(f.finalReads,1);
 assert.equal(new Set(f.names).size,f.names.length);assert.ok(f.options.every(x=>x.retries.limit===0));assert.equal(r.provenance.runtimeVersionId,f.v.runtimeVersionId);
});
test('absent proof is sampled through original capture window, never forever cached or resealed',async()=>{
 const f=await fixture();f.setReady(f.v.R1);
 const r=await runPrivateQaFiniteObserver(f);assert.equal(r.status,'admin_pending');assert.equal(f.samples,31);assert.equal(f.claims,0);assert.ok(f.sleeps.at(-1).at>f.v.C1);
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
