import test from 'node:test';
import assert from 'node:assert/strict';
import {computeAdministrativeResultDigest,createAdministrativeClosureReadback} from '../lib/assistance-administrative-closure-readback.mjs';
import {computeAdministrativeTokenDigestV2,createAdministrativeClosureReadbackV2} from '../lib/assistance-administrative-closure-v2.mjs';
const contract='afw-administrative-closure/v2';
const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
async function fixture(){
 const baseline={contract,accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'};
 const token={id:baseline.tokenId,client_id:'synthetic-client',name:'owned-qa',duration:'10m',created_at:'2026-10-08T22:00:00Z',expires_at:'2026-10-08T22:10:00Z',enabled:false,updated_at:'2026-10-08T22:01:00Z',last_seen_at:null,client_secret_version:1,previous_client_secret_expires_at:null,version:1};
 const results={token,settings:{bindings:[{name:'AFW_OPERATIONS_CONSUMER_ENABLED',type:'plain_text',text:'false'}]},schedules:{schedules:[]},policy:{id:baseline.policyId,include:[],decision:'non_identity'}};
 baseline.digests=Object.fromEntries(await Promise.all(Object.entries(results).map(async([k,v])=>[k,await (k==='token'?computeAdministrativeTokenDigestV2(v):computeAdministrativeResultDigest(v))])));
 const calls=[];let clock=1000,hook=null;
 const options={plan,baseline,now:()=>clock,request:async input=>{calls.push(input);const key=input.path.includes('/service_tokens/')?'token':input.path.endsWith('/settings')?'settings':input.path.endsWith('/schedules')?'schedules':'policy';const response={success:true,result:structuredClone(results[key])};return hook?hook(response,key,calls.length):response;}};
 return {baseline,results,calls,options,setClock(v){clock=v;},setHook(fn){hook=fn;}};
}
test('V2 accepts observational timestamp changes in two exact GET passes',async()=>{
 const f=await fixture(),a=createAdministrativeClosureReadbackV2(f.options);
 f.results.token.updated_at='2026-10-08T22:05:00Z';f.results.token.last_seen_at='2026-10-08T22:04:00Z';
 assert.deepEqual(await a.restoreAdministration({...plan}),{verified:true,state:'restored'});
 assert.equal(f.calls.length,8);assert.deepEqual(f.calls.slice(0,4),f.calls.slice(4));assert.ok(f.calls.every(c=>c.method==='GET'&&Object.keys(c).join(',')==='method,path'));
 assert.deepEqual(await a.readIssuedReceipt({...plan,step:'restoreAdministration'}),{verified:true,state:'restored'});
});
test('every stable token metadata field remains part of V2 baseline',async()=>{
 const changes={id:'99999999-9999-4999-8999-999999999999',client_id:'other',name:'other',duration:'20m',created_at:'2026-10-08T21:00:00Z',expires_at:'2026-10-08T22:20:00Z',client_secret_version:2,previous_client_secret_expires_at:'2026-10-08T22:09:00Z',version:2};
 for(const [key,value] of Object.entries(changes)){const f=await fixture();f.results.token[key]=value;assert.deepEqual(await createAdministrativeClosureReadbackV2(f.options).restoreAdministration(plan),{verified:false,state:'unknown'},key);assert.equal(f.calls.length,1);}
});
test('active token and malformed or credential-bearing metadata fail closed',async()=>{
 for(const patch of [{enabled:true},{client_secret:'private'},{unexpected:true},{updated_at:'bad-date'},{last_seen_at:42},{expires_at:'bad-date'},{duration:'forever'}]){
  const f=await fixture(),candidate={...f.results.token,...patch};await assert.rejects(computeAdministrativeTokenDigestV2(candidate));f.results.token=candidate;
  assert.deepEqual(await createAdministrativeClosureReadbackV2(f.options).restoreAdministration(plan),{verified:false,state:'unknown'});
 }
});
test('metadata snapshot rejects accessors symbols hidden properties and nonplain objects',async()=>{
 const f=await fixture();let invoked=0;
 const getter={...f.results.token};Object.defineProperty(getter,'name',{enumerable:true,get(){invoked++;return 'owned-qa';}});
 const symbol={...f.results.token,[Symbol('secret')]:'private'};
 const hidden={...f.results.token};Object.defineProperty(hidden,'client_secret',{value:'private'});
 for(const token of [getter,symbol,hidden,Object.assign(Object.create(null),f.results.token)])await assert.rejects(computeAdministrativeTokenDigestV2(token));
 assert.equal(invoked,0);
});
test('settings policy and schedules still require complete unchanged closed results',async()=>{
 for(const key of ['settings','policy','schedules']){const f=await fixture();f.results[key].extra='drift';assert.deepEqual(await createAdministrativeClosureReadbackV2(f.options).restoreAdministration(plan),{verified:false,state:'unknown'},key);}
 for(const key of ['settings','schedules']){const f=await fixture();if(key==='settings')f.results.settings.bindings[0].text='true';else f.results.schedules.schedules.push({cron:'* * * * *'});f.baseline.digests[key]=await computeAdministrativeResultDigest(f.results[key]);assert.deepEqual(await createAdministrativeClosureReadbackV2(f.options).restoreAdministration(plan),{verified:false,state:'unknown'});}
});
test('V2 contract is explicit and legacy V1 timestamp evidence remains unchanged',async()=>{
 const f=await fixture();for(const value of [undefined,'afw-administrative-closure/v1','other'])assert.throws(()=>createAdministrativeClosureReadbackV2({...f.options,baseline:{...f.baseline,contract:value}}));
 const {contract:ignored,...legacy}=f.baseline;assert.equal(ignored,contract);legacy.digests={...legacy.digests,token:await computeAdministrativeResultDigest(f.results.token)};
 const v1=createAdministrativeClosureReadback({...f.options,baseline:legacy});f.results.token.updated_at='2026-10-08T22:05:00Z';
 assert.deepEqual(await v1.restoreAdministration(plan),{verified:false,state:'unknown'});
});
test('baseline pins are copied while input edits clock regression and provider errors fail closed',async()=>{
 const f=await fixture(),a=createAdministrativeClosureReadbackV2(f.options);f.baseline.tokenId='other';f.baseline.digests.token='b'.repeat(64);assert.deepEqual(await a.restoreAdministration(plan),{verified:true,state:'restored'});
 for(const mode of ['input','clock','failure','throw']){const g=await fixture(),input={...plan};g.setHook(response=>{if(mode==='input')input.baselineRef='b'.repeat(64);if(mode==='clock')g.setClock(999);if(mode==='failure')return {success:false,result:{secret:'private'}};if(mode==='throw')throw Error('private');return response;});assert.deepEqual(await createAdministrativeClosureReadbackV2(g.options).restoreAdministration(input),{verified:false,state:'unknown'});assert.equal(g.calls.length,1);}
});
test('second pass detects drift and wrong receipt step performs no reads',async()=>{
 const f=await fixture();f.setHook((response,key,count)=>{if(count===5)response.result.name='changed';return response;});
 const a=createAdministrativeClosureReadbackV2(f.options);assert.deepEqual(await a.readIssuedReceipt({...plan,step:'disableServiceIdentity'}),{verified:false,state:'unknown'});assert.equal(f.calls.length,0);
 assert.deepEqual(await a.restoreAdministration(plan),{verified:false,state:'unknown'});assert.equal(f.calls.length,5);
});
