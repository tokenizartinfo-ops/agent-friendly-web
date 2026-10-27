import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {buildMcpReleaseOperator} from '../scripts/build-mcp-release-operator.mjs';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
const run=options=>rehearseExactNamedConfirmation({artifact,build:buildMcpReleaseOperator,mode:'confirmed',...options});
test('native named Workflow reserves one immutable successor only under its separate explicit opt-in',async()=>{
 const r=await run({reserve:'true'});
 assert.equal(r.httpStatus,404);assert.equal(r.output.status,'confirmed',JSON.stringify({output:r.output,counts:r.counts,counters:r.counters,reservationCount:r.reservationCount}));
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(r.reservationCount,1);
 assert.deepEqual(r.output.reservation,{purpose:'afw.successor-reservation.v1',trialId:'e'.repeat(64),state:'prepared',mayBoot:false});
 assert.equal(r.counters.retirementReads,2);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
 assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
});
test('absent or disabled reservation opt-in preserves confirmation without retirement calls or reservation',async()=>{
 for(const reserve of [null,'false']){const r=await run({reserve});assert.equal(r.output.status,'confirmed');assert.equal(r.reservationCount,0);assert.equal(r.counters.retirementReads??0,0);assert.equal(Object.hasOwn(r.output,'reservation'),false);}
});
test('malformed reservation opt-in blocks before provider or journal admission',async()=>{
 const r=await run({reserve:'TRUE'});assert.equal(r.output.status,'blocked');assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});assert.equal(r.counters.apiReads,0);assert.equal(r.counters.providerReads,0);
});
test('reservation failure preserves accepted activation history and never reports ready or starts a process',async t=>{
 for(const retirement of ['running','stale','future','mismatch','absent','expired','rewind'])await t.test(retirement,async()=>{
  const r=await run({reserve:'true',retirement});assert.equal(r.output.status,'uncertain');assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(r.reservationCount,0);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);assert.equal(Object.hasOwn(r.output,'reservation'),false);assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
 });
});
test('direct operator RPC cannot enter the reservation-enabled Workflow operation',async()=>{
 const r=await run({reserve:'true',invocation:'rpc'});assert.ok(r.output.error);assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});assert.equal(r.reservationCount,0);assert.equal(r.counters.apiReads,0);
});
test('restarting the consumed Workflow cannot reserve or confirm a second time',async()=>{
 const r=await run({reserve:'true',replay:true});assert.equal(r.output.status,'confirmed');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(r.counters.retirementReads,2);
});

test('native reservation keeps its committed row terminal when its acknowledgement is lost',async()=>{
 const r=await run({reserve:'true',fault:'reservation-ack-lost',replay:true});
 assert.equal(r.httpStatus,404);
 assert.equal(r.output.status,'uncertain');
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(r.reservationCount,1);
 assert.equal(r.counters.retirementReads,2);
 assert.equal(r.output.mayRetry,false);
 assert.equal(r.output.operationalReadiness,false);
 assert.equal(Object.hasOwn(r.output,'reservation'),false);
 assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
 assert.equal(JSON.stringify(r.output).includes('synthetic_reservation_ack_lost'),false);
});
test('native reservation denies changed authority after the first retirement provider await',async t=>{
 for(const fault of ['reservation-flag-drift','reservation-db-drift','reservation-namespace-drift'])await t.test(fault,async()=>{
  const r=await run({reserve:'true',fault});
  assert.equal(r.output.status,'uncertain');
  assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
  assert.equal(r.counters.retirementReads,1);
  assert.equal(r.reservationCount,0);
  assert.equal(r.output.mayRetry,false);
  assert.equal(r.output.operationalReadiness,false);
  assert.equal(Object.hasOwn(r.output,'reservation'),false);
  assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
 });
});
