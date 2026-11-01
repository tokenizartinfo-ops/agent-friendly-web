import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {buildMcpReleaseOperator} from '../scripts/build-mcp-release-operator.mjs';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';

const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
const run=options=>rehearseExactNamedConfirmation({artifact,build:buildMcpReleaseOperator,mode:'confirmed',reserve:'true',measure:true,...options});
const journals={attempts:1,receipts:1,acceptances:1},empty={attempts:0,receipts:0,acceptances:0};
const stages=['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write'].sort();
const safe=r=>{
 assert.equal(r.httpStatus,404);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
 assert.equal(r.immutableHistoryPreserved,true);
 assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
 assert.equal(r.output.qualification.nativeDate,true);
 assert.equal(r.output.qualification.workflowName,'afw-exact-confirmation-qualification');
 assert.deepEqual(r.output.qualification.payloadKeys,['planHash']);assert.equal(r.output.qualification.identityMatches,true);
};
test('actual production builder and mounted wrapper authorize complete history and exact own reservation after INSERT',async()=>{
 const r=await run();safe(r);
 assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));assert.deepEqual(r.counts,journals);
 assert.equal(r.historyPreserved,true);assert.equal(r.reservationCount,1);assert.equal(r.counters.retirementReads,2);
 assert.equal(r.output.reservation.mayBoot,false);
 const q=r.output.qualification;
 assert.equal(q.projectionReads,6);assert.ok(q.eligibilityChecks>=19);assert.equal(q.rpcReads,2);
 assert.ok(q.elapsedMs<70000);assert.ok(q.remainingOriginalMs>0);
 assert.deepEqual(q.stageInvocations,[],'primary qualification uses unmodified adapter source');
 console.log('untouched-mounted-native-measurement',JSON.stringify(q));
});
test('observation-only instrumented native witness executes all 18 actual hooks with same outcome and journals',async()=>{
 const build=async bundle=>{
  const compiled=await buildMcpReleaseOperator(bundle);
  const anchor=/const authorize = async \(stage, signal\) => \{/g;
  assert.equal([...compiled.script.matchAll(anchor)].length,1,'only observe the existing private closure');
  return {...compiled,script:compiled.script.replace(anchor,match=>match+' globalThis.__knownStageWitness?.push(stage);')};
 };
 const r=await run({build});safe(r);
 assert.equal(r.output.status,'confirmed');assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,1);
 assert.equal(r.historyPreserved,true);assert.equal(r.counters.retirementReads,2);
 const q=r.output.qualification;assert.deepEqual(q.uniqueStages,stages);
 assert.equal(q.stageInvocations.length,q.eligibilityChecks);assert.ok(q.stageInvocations.length>18);
 assert.ok(q.remainingOriginalMs>0);
 console.log('instrumented-mounted-native-hook-witness',JSON.stringify(q));
});
for(const nativeFault of ['missing-current','expired-current','identity-mismatch','extra-cancellation','queue-expired','projection-deadline'])
 test('mounted route blocks '+nativeFault+' before credentials, provider or journal',async()=>{
  const r=await run({nativeFault});safe(r);assert.equal(r.output.status,'blocked',JSON.stringify(r.output));
  assert.deepEqual(r.counts,empty);assert.equal(r.reservationCount,0);assert.equal(r.counters.apiReads,0);assert.equal(r.counters.providerReads,0);
  assert.equal(r.historyPreserved,true);
 });
for(const nativeFault of ['revoke-prewrite','revoke-postwrite'])test('current grant '+nativeFault+' preserves activation journals and immutable history',async()=>{
 const r=await run({nativeFault});safe(r);assert.equal(r.output.status,'uncertain');
 assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,nativeFault==='revoke-postwrite'?1:0);
 assert.equal(r.counters.retirementReads,2);assert.equal(Object.hasOwn(r.output,'reservation'),false);
 assert.equal(r.historyPreserved,false,'only the synthetic current grant was revoked');
});
test('external different-trial/scope reservation wins the fixed slot and denies both mounted attempt and restart',async()=>{
 const r=await run({nativeFault:'foreign-reservation-race',replay:true,replayExpected:'blocked'});safe(r);
 assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
 assert.equal(r.replayOutput.status,'blocked');assert.equal(r.replayOutput.mayRetry,false);assert.equal(r.historyPreserved,true);
});
test('native lost acknowledgement retains the committed reservation and all journals without retry',async()=>{
 const r=await run({fault:'reservation-ack-lost',replay:true});safe(r);
 assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
 assert.equal(r.replayOutput.status,'uncertain');assert.equal(r.historyPreserved,true);
});
test('native outer step settlement after original event deadline never reports a late confirmation',async()=>{
 const r=await run({nativeFault:'outer-settlement'});safe(r);
 assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
 assert.ok(r.output.qualification.remainingOriginalMs<0);assert.equal(r.historyPreserved,true);
});
test('same native instance restart cannot consume a second activation or reservation',async()=>{
 const r=await run({replay:true});safe(r);
 assert.equal(r.output.status,'confirmed');assert.equal(r.replayOutput.status,'uncertain');
 assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,1);assert.equal(r.counters.retirementReads,2);assert.equal(r.historyPreserved,true);
});
