import test from 'node:test';
import assert from 'node:assert/strict';
import {computeServiceIdentityDigest,createServiceIdentityDisableAction} from '../lib/assistance-service-identity-disable.mjs';
const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
const original={id:'22222222-2222-4222-8222-222222222222',client_id:'synthetic.access',name:'AFW own QA',duration:'10m',created_at:'2026-10-08T00:00:00Z',expires_at:'2026-10-08T00:10:00Z',client_secret_version:2,enabled:true};
const unknown={verified:false,state:'unknown'},disabled={verified:true,state:'disabled'};
async function fixture(){
 let token={...original},clock=1000,hook;const calls=[];
 const options={plan:{...plan},identity:{accountId:'a'.repeat(32),tokenId:token.id,metadataDigest:await computeServiceIdentityDigest(token)},now:()=>clock,request:async input=>{calls.push(input);if(hook)return hook(input);if(input.method==='PUT')token={...token,enabled:false,updated_at:'2026-10-08T00:10:01Z'};return {success:true,result:{...token}};}};
 return {options,calls,setHook:h=>hook=h,setToken:t=>token=t,setClock:t=>clock=t};
}
test('one fixed disable PUT is verified by primary GET, with no renewal or rotation fields',async()=>{
 const f=await fixture(),a=createServiceIdentityDisableAction(f.options);assert.deepEqual(await a.disableServiceIdentity(plan),disabled);
 assert.deepEqual(f.calls.map(c=>c.method),['GET','PUT','GET']);assert.deepEqual(f.calls[1],{method:'PUT',path:'/accounts/'+ 'a'.repeat(32)+'/access/service_tokens/'+original.id,body:{enabled:false}});
 assert.deepEqual(await a.disableServiceIdentity(plan),disabled);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
});
test('early, changed input, identity drift and provider failure do not dispatch PUT',async()=>{
 for(const kind of ['early','input','drift','failure','secret']){const f=await fixture(),input={...plan};if(kind==='early')f.setClock(999);if(kind==='input')input.extra=true;if(kind==='drift')f.setToken({...original,name:'other'});if(kind==='failure')f.setHook(async()=>({success:false,errors:[{message:'private'}]}));if(kind==='secret')f.setToken({...original,client_secret:'never-export'});assert.deepEqual(await createServiceIdentityDisableAction(f.options).disableServiceIdentity(input),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,0);}
});
test('expiry/version side effects and successful PUT without primary disabled evidence remain unknown',async()=>{
 for(const kind of ['expiry','version','still-enabled','read-fails']){const f=await fixture();let written=false;f.setHook(async req=>{if(req.method==='PUT'){written=true;return {success:true,result:{...original,enabled:false}};}if(!written)return {success:true,result:{...original}};if(kind==='read-fails')return {success:false};return {success:true,result:{...original,enabled:kind==='still-enabled',...(kind==='expiry'?{expires_at:'2026-10-09T00:00:00Z'}:{}),...(kind==='version'?{client_secret_version:3}:{})}};});assert.deepEqual(await createServiceIdentityDisableAction(f.options).disableServiceIdentity(plan),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);}
});
test('lost PUT acknowledgement never retries; separate primary read reconciles disabled identity',async()=>{
 const f=await fixture();let written=false;f.setHook(async req=>{if(req.method==='PUT'){written=true;throw Error('private credential error');}return {success:true,result:{...original,enabled:!written}};});const a=createServiceIdentityDisableAction(f.options);assert.deepEqual(await a.disableServiceIdentity(plan),unknown);assert.deepEqual(await a.readDisabledIdentity(plan),disabled);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
});
test('ambiguous write with enabled primary state and overlapping calls cannot replay PUT',async()=>{
 const f=await fixture();f.setHook(async req=>req.method==='PUT'?{success:false}:{success:true,result:{...original}});const a=createServiceIdentityDisableAction(f.options);const r=await Promise.all([a.disableServiceIdentity(plan),a.disableServiceIdentity(plan)]);assert.deepEqual(r,[unknown,unknown]);assert.deepEqual(await a.disableServiceIdentity(plan),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);assert.deepEqual(await a.readDisabledIdentity(plan),unknown);assert.equal(f.calls.filter(c=>c.method==='PUT').length,1);
});
test('input edits and regressed clock after awaited primary read prevent writes',async()=>{
 for(const kind of ['input','clock']){const f=await fixture(),input={...plan};f.setHook(async()=>{if(kind==='input')input.baselineRef='b'.repeat(64);else f.setClock(999);return {success:true,result:{...original}};});assert.deepEqual(await createServiceIdentityDisableAction(f.options).disableServiceIdentity(input),unknown);assert.equal(f.calls.length,1);}
});
test('configuration is copied and unsafe metadata/resources are rejected',async()=>{
 const f=await fixture(),a=createServiceIdentityDisableAction(f.options);f.options.plan.closeAt=2000;f.options.identity.tokenId='33333333-3333-4333-8333-333333333333';assert.deepEqual(await a.readDisabledIdentity(plan),unknown);assert.ok(f.calls[0].path.endsWith(original.id));
 assert.throws(()=>createServiceIdentityDisableAction({...f.options,identity:{...f.options.identity,accountId:'../../'}}));
 await assert.rejects(computeServiceIdentityDigest({...original,enabled:'false'}));await assert.rejects(computeServiceIdentityDigest({...original,duration:'forever'}));await assert.rejects(computeServiceIdentityDigest({...original,expires_at:'invalid'}));
 await assert.rejects(computeServiceIdentityDigest({...original,previous_client_secret_expires_at:'invalid'}));
 assert.equal(await computeServiceIdentityDigest({...original,enabled:false,updated_at:'new',last_seen_at:'new'}),await computeServiceIdentityDigest(original));
});
