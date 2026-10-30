import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
import {runReleaseWorkflow} from '../lib/mcp-release-runtime.mjs';
import {RELEASE_TARGET} from '../lib/mcp-release-operator-policy.mjs';

const hash=x=>createHash('sha256').update(x).digest('hex');
const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
function guardedBuild({deny=null,shiftStage=null,shiftOccurrence=1,shiftMs=0,returned='true'}={}){
 return async bundle=>{
  const source="import {WorkflowEntrypoint} from 'cloudflare:workers';\nimport {runReleaseWorkflow} from './lib/mcp-release-runtime.mjs';\nexport {AfwReleaseOperator} from './worker/mcp-release/index.mjs';\nconst bundle="+JSON.stringify(bundle)+";\nconst stages=[],counts={};let clockApplied=false;const nativeNow=performance.now.bind(performance);\nasync function authorize(stage){stages.push(stage);counts[stage]=(counts[stage]||0)+1;if(stage==="+JSON.stringify(shiftStage)+"&&counts[stage]==="+shiftOccurrence+"){await Promise.resolve();Object.defineProperty(performance,'now',{configurable:true,value:()=>nativeNow()+"+shiftMs+"});clockApplied=performance.now()-nativeNow()>="+(shiftMs-1)+";}if(stage==="+JSON.stringify(deny)+")return false;return "+returned+";}\nexport class AfwReleaseWorkflow extends WorkflowEntrypoint {async run(event,step){const output=await runReleaseWorkflow({bundle,env:this.env,event,step,authorize});return {...output,authorizationStages:[...stages],clockApplied};}}\nexport default{fetch(){return new Response(null,{status:404});}};";
  const result=await build({stdin:{contents:source,resolveDir:fileURLToPath(new URL('..',import.meta.url)),sourcefile:'guarded-named-native.mjs',loader:'js'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__':JSON.stringify(bundle)}});
  return {script:result.outputFiles[0].text,planHash:hash(JSON.stringify(bundle))};
 };
}
const run=(guard,extra={})=>rehearseExactNamedConfirmation({artifact,build:guardedBuild(guard),mode:'confirmed',reserve:'true',...extra});

test('named-only internal authorization is required before admission and cannot be borrowed by publication',async()=>{
 const r=await run({deny:'workflow_admission'});
 assert.equal(r.output.status,'blocked');assert.ok(r.output.authorizationStages.includes('workflow_admission'));
 assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});assert.equal(r.reservationCount,0);
 assert.equal(r.counters.providerReads,0);assert.equal(r.counters.apiReads,0);
 const startAt=Date.now()-1000,expiresAt=Date.now()+120000;
 const bundle={artifact,policy:{operation:'publish',startAt,expiresAt,pins:{...Object.fromEntries(['accountId','workerName','namespaceId','databaseId','kvId'].map(k=>[k,RELEASE_TARGET[k]])),baseVersionId:'11111111-1111-4111-8111-111111111111'}}};
 const planHash=hash(JSON.stringify(bundle));let steps=0,authorizations=0;
 const output=await runReleaseWorkflow({bundle,env:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true'},event:{instanceId:'afw-release-'+planHash,payload:{planHash}},step:{do(){steps++;throw Error('must not enter a guarded publication');}},authorize:async()=>{authorizations++;return true;}});
 assert.deepEqual(output,{status:'blocked',mayRetry:false,operationalReadiness:false});assert.equal(steps,0);assert.equal(authorizations,0);
});

test('authorization requires exact true and sanitizes a rejected internal fence',async t=>{
 for(const returned of ['undefined','null',"Promise.reject(Error('synthetic_private_guard_detail'))",'new Promise(()=>{})'])await t.test(returned,async()=>{
  const r=await run({returned});assert.equal(r.output.status,'blocked');assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});assert.equal(r.reservationCount,0);assert.equal(r.counters.providerReads,0);
  assert.equal(JSON.stringify(r.output).includes('synthetic_private_guard_detail'),false);
 });
});

test('true internal authorization preserves named confirmation, immutable reservation and consumed replay',async()=>{
 const r=await run({}, {replay:true});
 assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(r.reservationCount,1);
 assert.ok(r.output.authorizationStages.includes('successor_before_write'));assert.ok(r.output.authorizationStages.includes('successor_after_write'));
 assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
});

test('a failed fence preserves only effects already admitted and never advances the next primary write',async t=>{
 const cases=[
  ['activation_before_read',{attempts:0,receipts:0,acceptances:0}],
  ['activation_before_attempt',{attempts:0,receipts:0,acceptances:0}],
  ['activation_before_receipt',{attempts:1,receipts:0,acceptances:0}],
  ['activation_before_acceptance',{attempts:1,receipts:1,acceptances:0}],
  ['successor_before_write',{attempts:1,receipts:1,acceptances:1}]
 ];
 for(const[deny,counts]of cases)await t.test(deny,async()=>{
  const r=await run({deny});
  assert.equal(r.output.status,'uncertain',JSON.stringify(r.output));assert.ok(r.output.authorizationStages.includes(deny));assert.deepEqual(r.counts,counts);assert.equal(r.reservationCount,0);assert.equal(r.output.mayRetry,false);
 });
});

test('authorization await cannot renew an activation or successor child lease while the parent remains live',async t=>{
 for(const[shiftStage,shiftMs,counts]of [
  ['activation_before_receipt',21000,{attempts:1,receipts:0,acceptances:0}],
  ['successor_before_write',6000,{attempts:1,receipts:1,acceptances:1}]
 ])await t.test(shiftStage,async()=>{
  const r=await run({shiftStage,shiftMs});
  assert.equal(r.output.clockApplied,true,'the test clock shift must actually execute');
  assert.equal(r.output.status,'uncertain',JSON.stringify(r.output));assert.deepEqual(r.counts,counts);assert.equal(r.reservationCount,0);assert.equal(r.output.mayRetry,false);
 });
});

test('metadata observer retains its original five-second deadline across credential authorization before any metadata GET',async()=>{
 // Credential1 is operator admission,2 artifact bytes,3 the metadata reader.
 const r=await run({shiftStage:'operator_credential',shiftOccurrence:3,shiftMs:6000});
 assert.equal(r.output.clockApplied,true,'must advance the metadata child clock');
 assert.equal(r.output.status,'uncertain',JSON.stringify({output:r.output,counters:r.counters,counts:r.counts,reservationCount:r.reservationCount}));
 assert.equal(r.output.authorizationStages.filter(s=>s==='operator_credential').length,3);assert.deepEqual(r.counts,{attempts:1,receipts:0,acceptances:0});assert.equal(r.reservationCount,0);
 assert.equal(r.counters.apiReads,2,'only module bytes and legacy etag reads precede metadata');
 assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
});
