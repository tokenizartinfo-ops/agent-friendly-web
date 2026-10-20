import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const categories=['consumer','afw','persistence','verification','human','recipe'];
function data(){
 const cases=Array.from({length:5},(_,i)=>({caseRef:'case-'+i,variant:'afw',conditionsRef:'conditions-'+i,
  outcome:i<2?'accepted':'failed',acceptanceRef:i<2?'accepted-'+i:null}));
 const observations=cases.flatMap((c,i)=>categories.map(category=>({observationRef:'observation-'+i+'-'+category,caseRef:c.caseRef,variant:c.variant,category,
  attemptRef:category==='consumer'?'attempt-'+i:null,observedAt:'2026-10-20T17:00:00.000Z',
  costMicros:category==='consumer'?10000000:0,costBasis:category==='consumer'?'observed_variable':'not_applicable',
  costRef:category==='consumer'?'cost-'+i:null,usage:null,usageRef:null})));
 return {contract:'afw.efficiency-observations.v1',trialRef:'trial-example',currency:'TST',mode:'synthetic',cases,observations};
}
const copy=v=>structuredClone(v);
const usage=()=>({inputTokens:100,outputTokens:20,cachedInputTokens:40,requestBytes:800,responseBytes:400});
test('efficiency ledger retains failed spend unknown components and unique attempted cases',async t=>{
 const file=new URL('../examples/agent-consumer/trial-ledger.mjs',import.meta.url);
 assert.ok(await readFile(file,'utf8').catch(()=>null),'missing efficiency observation ledger');
 const {summarizeEfficiencyTrial:summarize}=await import(file.href);
 await t.test('all failed costs remain in the numerator and accepted cases are unique',()=>{
  const r=summarize(data());assert.equal(r.status,'summarized');assert.equal(r.isEfficiencyEvidence,false);assert.equal(r.sourceMode,'synthetic');
  const a=r.variants.afw;assert.equal(a.attemptedCases,5);assert.equal(a.acceptedCases,2);assert.equal(a.totalCostMicros,50000000);
  assert.deepEqual(a.costPerAccepted,{numeratorMicros:50000000,denominator:2});assert.deepEqual(a.acceptanceRate,{accepted:2,attempted:5});
  assert.equal(a.recordedAttempts,5);assert.equal(a.observationCount,30);assert.equal(a.usage.inputTokens,null);
  for(const k of ['executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r[k],false);
 });
 await t.test('retry spend counts once per measurement delivery without becoming another case',()=>{
  const v=data(),retry={...v.observations[0],observationRef:'retry-observation',attemptRef:'retry-attempt',costMicros:3000000,costRef:'retry-cost'};
  v.observations.push(retry,copy(retry));const a=summarize(v).variants.afw;
  assert.equal(a.totalCostMicros,53000000);assert.equal(a.attemptedCases,5);assert.equal(a.acceptedCases,2);assert.equal(a.recordedAttempts,6);assert.equal(a.observationCount,31);
  v.observations.at(-1).costMicros++;assert.equal(summarize(v).code,'observation_conflict');
 });
 await t.test('no accepted case yields null cost per accepted without deleting spend',()=>{
  const v=data();for(const c of v.cases){c.outcome='failed';c.acceptanceRef=null;}
  const a=summarize(v).variants.afw;assert.equal(a.totalCostMicros,50000000);assert.equal(a.costPerAccepted,null);assert.deepEqual(a.acceptanceRate,{accepted:0,attempted:5});
 });
 await t.test('unknown or missing categories cannot become a zero or a complete total',()=>{
  const v=data();Object.assign(v.observations[0],{costMicros:null,costBasis:'unknown',costRef:null});
  let a=summarize(v).variants.afw;assert.equal(a.totalCostMicros,null);assert.equal(a.knownCostMicros,40000000);assert.equal(a.unknownCostObservations,1);assert.equal(a.costPerAccepted,null);
  const missing=data();missing.observations=missing.observations.filter(o=>!(o.caseRef==='case-0'&&o.category==='recipe'));
  a=summarize(missing).variants.afw;assert.equal(a.totalCostMicros,null);assert.equal(a.missingCostCategories,1);assert.equal(a.knownCostMicros,50000000);
 });
 await t.test('tokens are provider observations, cache is a subset and bytes never estimate tokens',()=>{
  const v=data();for(const o of v.observations)if(o.attemptRef){o.usage=usage();o.usageRef='usage-'+o.attemptRef;}
  let a=summarize(v).variants.afw;assert.equal(a.usage.inputTokens,500);assert.equal(a.usage.outputTokens,100);assert.equal(a.usage.cachedInputTokens,200);
  assert.equal(a.usage.requestBytes,4000);assert.equal(Object.hasOwn(a,'tokensSaved'),false);
  v.observations[0].usage.inputTokens=null;a=summarize(v).variants.afw;assert.equal(a.usage.inputTokens,null);assert.equal(a.knownUsage.inputTokens,400);
  const bytes=data();bytes.observations[0].usage={inputTokens:null,outputTokens:null,cachedInputTokens:null,requestBytes:8000,responseBytes:4000};bytes.observations[0].usageRef='transport-observation';
  a=summarize(bytes).variants.afw;assert.equal(a.usage.inputTokens,null);assert.equal(a.knownUsage.inputTokens,0);
 });
 await t.test('one request cannot contribute its same usage twice through separate cost rows',()=>{
  const v=data(),other=v.observations[1];Object.assign(v.observations[0],{usage:usage(),usageRef:'usage-one'});
  Object.assign(other,{attemptRef:'attempt-0',costMicros:100,costBasis:'observed_variable',costRef:'afw-cost',usage:usage(),usageRef:'usage-duplicate'});
  assert.equal(summarize(v).code,'duplicate_attempt_usage');
 });
 await t.test('inconsistent paired conditions and duplicate cases are rejected',()=>{
  const v=data();v.cases.push({...v.cases[0],variant:'direct',conditionsRef:'different-conditions'});
  assert.equal(summarize(v).code,'comparison_conditions_mismatch');
  const duplicate=data();duplicate.cases.push(copy(duplicate.cases[0]));assert.equal(summarize(duplicate).status,'blocked');
 });
 await t.test('not-applicable cannot hide spend and approval allocation requires a receipt',()=>{
  const v=data();v.observations.push({...v.observations[1],observationRef:'extra-afw-spend',costMicros:100,costBasis:'observed_variable',costRef:'actual-cost'});
  assert.equal(summarize(v).code,'cost_coverage_conflict');
  const a=data();Object.assign(a.observations[0],{costBasis:'approved_allocation',costRef:null});assert.equal(summarize(a).status,'blocked');
 });
 await t.test('malformed private extras unsafe numbers and unreferenced inputs do not enter a summary',()=>{
  const changes=[
   v=>{v.observations[0].costMicros=-1;},v=>{v.observations[0].costMicros=1.5;},
   v=>{v.observations[0].costMicros=Number.MAX_SAFE_INTEGER+1;},v=>{v.cases[0].acceptanceRef=null;},
   v=>{v.observations[0].caseRef='foreign-case';},v=>{v.observations[0].headers='do not store';},
   v=>{v.observations[0].observedAt='2026-10-20T17:00:00+00:00';},
   v=>{v.observations[0].usage=usage();},v=>{v.currency='not a price';},
   v=>{v.observations=Array.from({length:1001},()=>copy(v.observations[0]));}
  ];for(const change of changes){const v=data();change(v);assert.equal(summarize(v).status,'blocked');}
 });
 await t.test('reported cache cannot exceed reported input and summaries detach from source',()=>{
  const v=data();Object.assign(v.observations[0],{usage:usage(),usageRef:'provider-usage'});v.observations[0].usage.cachedInputTokens=101;
  assert.equal(summarize(v).status,'blocked');
  const d=data(),r=summarize(d);d.cases[0].outcome='failed';d.observations[0].costMicros=999;assert.equal(r.variants.afw.acceptedCases,2);assert.equal(r.variants.afw.totalCostMicros,50000000);
 });
 await t.test('demo is arithmetic with fictional units and never reports real savings',async()=>{
  const {buildTrialDemo}=await import('../examples/agent-consumer/trial-demo.mjs');const r=buildTrialDemo();
  assert.equal(r.synthetic,true);assert.equal(r.summary.currency,'TST');assert.equal(r.summary.isEfficiencyEvidence,false);
  assert.equal(r.summary.variants.afw.acceptedCases,2);assert.equal(r.summary.variants.afw.totalCostMicros,50000000);
 });
});
