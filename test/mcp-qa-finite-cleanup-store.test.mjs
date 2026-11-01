import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
const api=await import('../lib/mcp-qa-finite-cleanup-store.mjs').catch(()=>({}));
async function setup(){
 const f=finiteFixture(),control=controls.createPrivateQaFiniteTrialControl(f.options(controls)),arm=await control.prepare();
 assert.equal(arm.status,'armed');const proof=finiteProofFixture({fixture:f,controlHash:arm.controlHash});f.setNow(f.plan.C0+3);
 return {f,proof,store:api.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now})};
}
test('retained proof APIs are fixed and available',()=>{
 for(const k of ['createPrivateQaFiniteCleanupStore','readFiniteTrialCleanupProofHead','readRetainedFiniteCleanupProof','readFiniteTrialCleanupCompletion'])assert.equal(typeof api[k],'function');
});
test('capture once, independent readback, two factual consumers and restart after former live observer closes',async()=>{
 const {f,proof,store}=await setup();let calls=0;
 const observed=await store.capture(async challenge=>{calls++;return {proof:{...proof.proof,proofChallenge:challenge},support:proof.support};});
 assert.equal(observed.status,'observed');assert.equal(calls,1);
 const refs={storage:f.storage,intentId:f.plan.intentId,controlHash:proof.control.controlHash};
 const head=await api.readFiniteTrialCleanupProofHead(refs);assert.equal(head.proofHash,observed.record.proofHash);
 f.setNow(f.plan.C1+1);
 for(let n=0;n<2;n++){const r=await api.readRetainedFiniteCleanupProof({storage:f.storage,intentId:f.plan.intentId,proofHash:head.proofHash});assert.deepEqual(r.record,observed.record);}
 await assert.rejects(api.readRetainedFiniteCleanupProof({storage:f.storage,intentId:f.plan.intentId,proofHash:'f'.repeat(64)}));
 assert.equal((await api.readFiniteTrialCleanupCompletion({...refs,proofHash:head.proofHash})).status,'not_yet_observed');
 assert.equal(calls,1);
});
test('missing proof and lost native response consume one challenge and never call producer again',async()=>{
 const {f,proof,store}=await setup();let calls=0;
 const refs={storage:f.storage,intentId:f.plan.intentId,controlHash:proof.control.controlHash};
 assert.equal((await api.readFiniteTrialCleanupProofHead(refs)).status,'not_yet_observed');
 assert.equal((await store.capture(async()=>{calls++;throw Error('lost');})).status,'uncertain');
 assert.equal((await store.capture(async()=>{calls++;throw Error('must not call');})).status,'admin_pending');
 assert.equal(calls,1);
});
