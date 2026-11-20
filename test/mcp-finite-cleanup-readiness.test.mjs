import test from 'node:test';
import assert from 'node:assert/strict';
import {createFiniteNativeCleanupProofProducer} from '../lib/mcp-own-finite-cleanup-proof.mjs';
import {createPrivateQaFiniteCleanupProofCollector} from '../lib/mcp-qa-finite-cleanup-collector.mjs';
import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
test('readiness waits for stop without spending the sole native challenge',async()=>{
 const f=finiteProofFixture(),rows=new Map();let stopped=false,claims=0;
 const storage={transaction:async fn=>fn({get:async k=>rows.get(k),put:async(k,v)=>{claims++;rows.set(k,v);}})};
 const producer=createFiniteNativeCleanupProofProducer({storage,control:f.control,gate:{read:async()=>f.support.gate},primaryRead:async()=>f.support.primary,providerRead:async()=>{if(!stopped)throw Error('synthetic provider still running');return {...f.support.providerAfter,observedAt:f.support.primary.observedAt};},retirementRead:async()=>{throw Error('no admission');},now:f.now});
 assert.equal(typeof producer.ready,'function');
 assert.equal((await producer.ready()).status,'not_yet_observed');assert.equal(claims,0);
 stopped=true;assert.equal((await producer.ready()).status,'ready_for_capture');assert.equal(claims,0);
 const result=await producer.observe({intentId:f.control.plan.intentId,planHash:f.control.planHash,proofChallenge:f.expectedChallenge});
 assert.equal(claims,1);assert.equal(result.proof.evidenceHash,finiteHash({proofChallenge:f.expectedChallenge,sealHash:result.proof.sealHash,support:result.support}));
 await assert.rejects(()=>producer.observe({intentId:f.control.plan.intentId,planHash:f.control.planHash,proofChallenge:'3'.repeat(64)}));assert.equal(claims,1);
});
test('collector waits without calling capture and rejects malformed readiness time',async()=>{
 const f=finiteProofFixture();let capture=0,ready=false;
 const control={identity:f.control,read:async()=>({status:'not_yet_observed'}),capture:async()=>{capture++;throw Error('unexpected capture');}};
 const nativeProof={ready:async()=>ready?{status:'ready_for_capture',intentId:f.control.plan.intentId,controlHash:f.control.controlHash,sourceRevision:f.control.plan.canaryContainment.sourceRevision,runtimeVersionId:f.control.plan.canaryContainment.runtimeVersionId,observedAt:undefined}:{status:'not_yet_observed'},observe:async()=>{throw Error('unexpected observe');}};
 const collector=createPrivateQaFiniteCleanupProofCollector({control,nativeProof,primaryRead:async()=>null,providerRead:async()=>null,now:f.now});
 assert.equal((await collector.read()).status,'not_yet_observed');assert.equal(capture,0);ready=true;await assert.rejects(()=>collector.read());assert.equal(capture,0);
});
