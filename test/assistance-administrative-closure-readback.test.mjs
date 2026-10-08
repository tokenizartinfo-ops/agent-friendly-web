import test from 'node:test';
import assert from 'node:assert/strict';
import {computeAdministrativeResultDigest,createAdministrativeClosureReadback} from '../lib/assistance-administrative-closure-readback.mjs';
const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
async function fixture(){
 const baseline={accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'};
 const results={token:{id:baseline.tokenId,enabled:false,client_secret_version:2,expires_at:'2026-10-08T02:07:44Z'},settings:{bindings:[{name:'OWN_FLAG',type:'plain_text',text:'false'}]},schedules:{schedules:[]},policy:{id:baseline.policyId,include:[],decision:'non_identity'}};
 baseline.digests=Object.fromEntries(await Promise.all(Object.entries(results).map(async([k,v])=>[k,await computeAdministrativeResultDigest(v)])));
 const calls=[];let clock=1000,hook=null;
 const options={plan,baseline,now:()=>clock,request:async input=>{calls.push(input);if(hook)return hook(input,calls.length);const key=input.path.includes('/service_tokens/')?'token':input.path.endsWith('/settings')?'settings':input.path.endsWith('/schedules')?'schedules':'policy';return {success:true,result:structuredClone(results[key])};}};
 return {options,baseline,results,calls,setClock(v){clock=v;},setHook(fn){hook=fn;}};
}
test('two complete primary GET passes certify only exact already-closed resources',async()=>{
 const f=await fixture(),a=createAdministrativeClosureReadback(f.options);
 assert.deepEqual(await a.restoreAdministration({...plan}),{verified:true,state:'restored'});
 assert.equal(f.calls.length,8);assert.ok(f.calls.every(c=>Object.keys(c).join(',')==='method,path'&&c.method==='GET'));
 assert.deepEqual(f.calls.slice(0,4),f.calls.slice(4));assert.ok(f.calls.every(c=>c.path.startsWith('/accounts/'+f.baseline.accountId+'/')));
 assert.deepEqual(await a.readIssuedReceipt({...plan,step:'restoreAdministration'}),{verified:true,state:'restored'});
});
test('enabled token cannot certify closure even with a matching approved digest',async()=>{
 const f=await fixture();f.results.token.enabled=true;f.baseline.digests.token=await computeAdministrativeResultDigest(f.results.token);
 assert.deepEqual(await createAdministrativeClosureReadback(f.options).restoreAdministration(plan),{verified:false,state:'unknown'});
});
test('resource drift, API failure or private error body remain unknown and never issue mutations',async()=>{
 for(const kind of ['drift','failure','throw']){
  const f=await fixture();f.setHook(async(input,count)=>{if(kind==='throw')throw Error('private credential detail');if(kind==='failure')return {success:false,result:{secret:'private'}};return {success:true,result:count===1?f.results.token:{bindings:[{name:'NEW',type:'plain_text',text:'true'}]}};});
  assert.deepEqual(await createAdministrativeClosureReadback(f.options).restoreAdministration(plan),{verified:false,state:'unknown'});assert.ok(f.calls.every(c=>c.method==='GET'));
 }
});
test('callback edits and clock regression during awaited provider read reject verification',async()=>{
 for(const mode of ['clock','input']){
  const f=await fixture(),input={...plan};f.setHook(async()=>{if(mode==='clock')f.setClock(999);else input.baselineRef='b'.repeat(64);return {success:true,result:f.results.token};});
  assert.deepEqual(await createAdministrativeClosureReadback(f.options).restoreAdministration(input),{verified:false,state:'unknown'});assert.equal(f.calls.length,1);
 }
});
test('baseline is immutable, readback is administrative-only and unsafe resource paths fail closed',async()=>{
 const f=await fixture(),a=createAdministrativeClosureReadback(f.options);f.baseline.workerName='different';f.baseline.digests.token='b'.repeat(64);
 assert.deepEqual(await a.restoreAdministration(plan),{verified:true,state:'restored'});
 const count=f.calls.length;assert.deepEqual(await a.readIssuedReceipt({...plan,step:'closeLedger'}),{verified:false,state:'unknown'});assert.equal(f.calls.length,count);
 assert.throws(()=>createAdministrativeClosureReadback({...f.options,baseline:{...f.baseline,workerName:'../../other'}}));
});
test('canonical digest ignores object key order but retains every value and array order',async()=>{
 assert.equal(await computeAdministrativeResultDigest({a:1,b:2}),await computeAdministrativeResultDigest({b:2,a:1}));
 assert.notEqual(await computeAdministrativeResultDigest([1,2]),await computeAdministrativeResultDigest([2,1]));
 await assert.rejects(computeAdministrativeResultDigest({a:undefined}));
});
test('malformed settings or an open service flag/cron cannot certify closure even with matching digests',async()=>{
 for(const kind of ['missing','flag','cron']){
  const f=await fixture();
  if(kind==='missing')f.results.settings=null;
  if(kind==='flag')f.results.settings.bindings.push({name:'AFW_OPERATIONS_CONSUMER_ENABLED',type:'plain_text',text:'true'});
  if(kind==='cron')f.results.schedules.schedules.push({cron:'* * * * *'});
  for(const key of ['settings','schedules'])f.baseline.digests[key]=await computeAdministrativeResultDigest(f.results[key]);
  assert.deepEqual(await createAdministrativeClosureReadback(f.options).restoreAdministration(plan),{verified:false,state:'unknown'});
 }
});
