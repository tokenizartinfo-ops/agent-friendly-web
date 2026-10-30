import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
import {namedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
const hash=v=>createHash('sha256').update(v).digest('hex'),script='export default{fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
function builder({variant='valid',history=true,authorize=true}={}){
 return async bundle=>{
 const fixtureHistory=namedHistoryFixture(bundle,variant),raw=history?JSON.stringify(fixtureHistory.providedRaw):'undefined';
 const entry="import {WorkflowEntrypoint,WorkerEntrypoint} from 'cloudflare:workers';\nimport {runReleaseWorkflow} from './lib/mcp-release-runtime.mjs';\nconst bundle="+JSON.stringify(bundle)+";\nexport class AfwReleaseOperator extends WorkerEntrypoint{run(){throw Error('fixture RPC unavailable');}}\nexport class AfwReleaseWorkflow extends WorkflowEntrypoint{run(event,step){return runReleaseWorkflow({bundle,env:this.env,event,step,authorize:"+(authorize?'async()=>true':'undefined')+",cancellationHistory:"+raw+"});}}\nexport default{fetch(){return new Response(null,{status:404})}};";
 const r=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'named-known-history-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});const script=r.outputFiles[0].text;return{script,operatorHash:hash(script),planHash:hash(JSON.stringify(bundle)),fixtureHistory};
 };
}
const run=(options={},fixture={})=>rehearseExactNamedConfirmation({artifact,build:builder(options),mode:'confirmed',reserve:'true',historyFixture:true,...fixture});
test('server-owned known history reaches native final reservation without altering history',async()=>{
 const r=await run();assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));assert.equal(r.reservationCount,1);assert.equal(r.historyPreserved,true);assert.equal(r.output.reservation.mayBoot,false);assert.equal(r.output.operationalReadiness,false);assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
});
test('the same two-closure fixture without the server argument preserves legacy denial',async()=>{
 const r=await run({history:false});assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,0);assert.equal(r.historyPreserved,true);
});
for(const variant of ['missing-row','pin-mismatch','revoked-current'])test('native named known history rejects '+variant,async()=>{
 const r=await run({variant});assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,0);assert.equal(r.historyPreserved,true);assert.equal(r.output.operationalReadiness,false);
});
test('an alternative VALID same-scope grant cannot replace the revoked bundle grant',async()=>{
 const r=await run({variant:'alternative-grant'});assert.equal(r.alternativeGrantEligible,true,'alternate grant must independently satisfy primary eligibility');assert.equal(r.output.status,'blocked');assert.equal(r.reservationCount,0);assert.equal(r.counters.providerReads,0);assert.equal(r.counters.apiReads,0);assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});assert.equal(r.historyPreserved,true);
});
test('server history without an authorization callback blocks before credential/provider reads',async()=>{
 const r=await run({authorize:false});assert.equal(r.output.status,'blocked');assert.equal(r.reservationCount,0);assert.equal(r.counters.providerReads,0);assert.equal(r.counters.apiReads,0);assert.equal(r.historyPreserved,true);
});
test('server history without reservation opt-in blocks before provider work',async()=>{
 const r=await run({}, {reserve:'false',historyFixture:false});assert.equal(r.output.status,'blocked');assert.equal(r.counters.providerReads,0);assert.equal(r.counters.apiReads,0);
});
test('native known-history lost ACK preserves its immutable reservation and history',async()=>{
 const r=await run({}, {fault:'reservation-ack-lost',replay:true});assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.equal(r.historyPreserved,true);assert.equal(r.output.mayRetry,false);
});
