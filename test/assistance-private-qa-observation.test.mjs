import test from 'node:test';
import assert from 'node:assert/strict';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
const load=()=>import('../lib/assistance-private-qa-observation.mjs');
async function fixture(){
 const m={...manifest(),startAt:1000,deadline:2000};
 const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration}=await qaAdministrationFixture({createdAt:1000,closeAt:2000,expiresAt:12000});
 registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=m.occurrenceId;
 registration.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const pins={registration,approval},recordRef=registration.plan.baselineRef;
 const challenge={contract:'afw-private-custody-challenge/v1',state:'confirmed',recordRef,receiptRef:'f'.repeat(64),issuedAt:1100,deadline:2000,consumedAt:1200};
 return {pins,recordRef,challenge};
}
test('private observer reads historical receipt after expiry without treating it as live authorization',async()=>{
 const {createPrivateQaObservation}=await load(),f=await fixture();let calls=0;
 const observer=createPrivateQaObservation({readHistory:async()=>{calls++;return structuredClone(f.pins);},readChallenge:async()=>f.challenge,now:()=>3000});
 const result=await observer.run(JSON.stringify({operation:'observe',recordRef:f.recordRef}));
 assert.deepEqual(result,{contract:'afw-private-qa-observation/v1',state:'observed',recordRef:f.recordRef,challenge:f.challenge});assert.equal(calls,2);assert.equal(Object.hasOwn(result,'approval'),false);
});
test('invalid selectors and mutating operations cause zero reads',async()=>{
 const {createPrivateQaObservation}=await load();let reads=0;const observer=createPrivateQaObservation({readHistory:async()=>{reads++;},readChallenge:async()=>{reads++;}});
 for(const input of [{operation:'register',recordRef:'a'.repeat(64)},{operation:'observe',recordRef:'A'.repeat(64)},{operation:'observe',recordRef:'a'.repeat(64),extra:true},'x'.repeat(257)])assert.equal((await observer.run(input)).state,'unavailable');assert.equal(reads,0);
});
test('wrong record, receipt window, extra sensitive fields and registration drift fail closed',async()=>{
 const {createPrivateQaObservation}=await load(),f=await fixture();
 for(const bad of [{...f.challenge,recordRef:'a'.repeat(64)},{...f.challenge,deadline:2001},{...f.challenge,consumedAt:2000},{...f.challenge,nonce:'b'.repeat(64)}]){
  assert.equal((await createPrivateQaObservation({readHistory:async()=>structuredClone(f.pins),readChallenge:async()=>bad,now:()=>3000}).run({operation:'observe',recordRef:f.recordRef})).state,'unavailable');
 }
 let n=0;assert.equal((await createPrivateQaObservation({readHistory:async()=>{const p=structuredClone(f.pins);if(n++)p.approval.planRevision++;return p;},readChallenge:async()=>f.challenge,now:()=>3000}).run({operation:'observe',recordRef:f.recordRef})).state,'unavailable');
});
test('missing, issued and withdrawn journal states remain observations, never confirmations',async()=>{
 const {createPrivateQaObservation}=await load(),f=await fixture();
 const issued={...f.challenge,state:'issued'};delete issued.consumedAt;
 for(const challenge of [null,issued,{...issued,state:'withdrawn'},{...f.challenge,state:'withdrawn'}]){
  const r=await createPrivateQaObservation({readHistory:async()=>structuredClone(f.pins),readChallenge:async()=>challenge,now:()=>3000}).run({operation:'observe',recordRef:f.recordRef});assert.equal(r.state,'observed');assert.deepEqual(r.challenge,challenge);
 }
});
test('timeout and clock regression return fixed unavailable without leaking transport errors',async()=>{
 const {createPrivateQaObservation}=await load(),f=await fixture();
 const args={operation:'observe',recordRef:f.recordRef};
 const hanging=createPrivateQaObservation({readHistory:()=>new Promise(()=>{}),readChallenge:async()=>f.challenge,timeoutMs:10});assert.deepEqual(await hanging.run(args),{contract:'afw-private-qa-observation/v1',state:'unavailable'});
 let t=3000;const regressing=createPrivateQaObservation({readHistory:async()=>structuredClone(f.pins),readChallenge:async()=>{t=2999;return f.challenge;},now:()=>t});assert.equal((await regressing.run(args)).state,'unavailable');
 for(const time of [999,8640000000000001])assert.equal((await createPrivateQaObservation({readHistory:async()=>structuredClone(f.pins),readChallenge:async()=>null,now:()=>time}).run(args)).state,'unavailable');
});
