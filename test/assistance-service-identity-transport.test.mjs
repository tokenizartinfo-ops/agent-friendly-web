import test from 'node:test';
import assert from 'node:assert/strict';
import {createServiceIdentityTransport} from '../lib/assistance-service-identity-transport.mjs';
import {computeServiceIdentityDigest,createServiceIdentityDisableAction} from '../lib/assistance-service-identity-disable.mjs';
const identity={accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',name:'AFW synthetic own QA',exclusiveQa:true};
const path='/accounts/'+identity.accountId+'/access/service_tokens/'+identity.tokenId;
const token={id:identity.tokenId,name:identity.name,client_id:'synthetic.access',created_at:'2026-10-08T00:00:00Z',duration:'10m',expires_at:'2026-10-08T00:10:00Z',enabled:true,client_secret_version:1};
const get=()=>({method:'GET',path}),put=()=>({method:'PUT',path,body:{enabled:false,name:identity.name}}),failure={success:false};
const options=extra=>({identity:{...identity},closeAt:1000,now:()=>1000,readCredential:async()=> 'synthetic-private-api-key-only',fetchImpl:async()=>Response.json({success:true,result:{...token}}),...extra});
test('fixed origin and minimal body; PUT credentials never leave transport and pins are copied',async()=>{
 const calls=[],o=options({fetchImpl:async(url,init)=>{calls.push({url,init});return Response.json({success:true,result:{client_secret:'must-not-escape'}});}}),t=createServiceIdentityTransport(o);o.identity.name='other';
 assert.deepEqual(await t(put()),{success:true,result:null});assert.equal(calls[0].url,'https://api.cloudflare.com/client/v4'+path);assert.equal(calls[0].init.redirect,'manual');assert.deepEqual(JSON.parse(calls[0].init.body),{enabled:false,name:identity.name});assert.equal(calls[0].init.headers.Authorization,'Bearer synthetic-private-api-key-only');
});
test('unsafe methods, routes, body, extra properties and accessors never read custody',async()=>{
 let calls=0;const t=createServiceIdentityTransport(options({readCredential:async()=>{calls++;return 'synthetic-private-api-key-only';}}));
 for(const input of [{method:'POST',path},{method:'GET',path:path+'?x=1'},{method:'GET',path,headers:{}},{method:'PUT',path,body:{enabled:true,name:identity.name}},{method:'PUT',path,body:{enabled:false,name:'other'}},{method:'PUT',path,body:{enabled:false,name:identity.name,duration:'1h'}},{get method(){throw Error('private accessor');},path}])assert.deepEqual(await t(input),failure);
 assert.equal(calls,0);assert.throws(()=>createServiceIdentityTransport(options({identity:{...identity,exclusiveQa:false}})));
});
test('early writes denied, early GET allowed; changed body or regressed clock after custody cannot dispatch',async()=>{
 let calls=0;const early=createServiceIdentityTransport(options({now:()=>999,fetchImpl:async()=>{calls++;return Response.json({success:true,result:token});}}));assert.deepEqual(await early(put()),failure);assert.equal(calls,0);assert.equal((await early(get())).success,true);
 for(const mode of ['body','clock']){let clock=1000;const input=put(),t=createServiceIdentityTransport(options({now:()=>clock,readCredential:async()=>{if(mode==='body')input.body.name='other';else clock=999;return 'synthetic-private-api-key-only';},fetchImpl:async()=>{calls++;}}));const before=calls;assert.deepEqual(await t(input),failure);assert.equal(calls,before);}
});
test('custody deadline prevents late PUT and invalid credentials never dispatch',async()=>{
 let resolve,calls=0;const pending=new Promise(r=>resolve=r),t=createServiceIdentityTransport(options({timeoutMs:15,readCredential:()=>pending,fetchImpl:async()=>{calls++;}}));assert.deepEqual(await t(put()),failure);resolve('synthetic-private-api-key-only');await new Promise(r=>setTimeout(r,10));assert.equal(calls,0);
 const invalid=createServiceIdentityTransport(options({readCredential:async()=> 'private\r\nheader',fetchImpl:async()=>{calls++;}}));assert.deepEqual(await invalid(put()),failure);assert.equal(calls,0);
});
test('stalled fetch/body aborted and cancelled without retry',async()=>{
 let signal,calls=0;const fetchStall=createServiceIdentityTransport(options({timeoutMs:15,fetchImpl:async(_url,init)=>{calls++;signal=init.signal;return new Promise(()=>{});}}));assert.deepEqual(await fetchStall(put()),failure);assert.equal(signal.aborted,true);assert.equal(calls,1);
 let cancelled=false;const body=new ReadableStream({start(){},cancel(){cancelled=true;}}),bodyStall=createServiceIdentityTransport(options({timeoutMs:15,fetchImpl:async()=>new Response(body,{headers:{'Content-Type':'application/json'}})}));assert.deepEqual(await bodyStall(put()),failure);assert.equal(cancelled,true);
});
test('private failures, invalid MIME/JSON, oversized body and credential-bearing GET fail closed',async()=>{
 for(const response of [new Response('private',{status:401}),new Response(null,{status:302}),new Response('{}',{headers:{'Content-Type':'text/html'}}),new Response('bad',{headers:{'Content-Type':'application/json'}}),Response.json({success:false,errors:[{message:'private key'}]}),Response.json({success:true,result:{...token,client_secret:'must-not-escape'}}),Response.json({success:true,result:'a'.repeat(262145)}),new Response('{}',{headers:{'Content-Type':'application/json','Content-Length':'262145'}})])assert.deepEqual(await createServiceIdentityTransport(options({fetchImpl:async()=>response}))(get()),failure);
});
test('actual action composed with transport confirms GET/PUT/GET primary disabled metadata',async()=>{
 let current={...token};const methods=[],request=createServiceIdentityTransport(options({fetchImpl:async(_url,init)=>{methods.push(init.method);if(init.method==='PUT')current={...current,...JSON.parse(init.body)};return Response.json({success:true,result:{...current}});}}));
 const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000};
 const a=createServiceIdentityDisableAction({plan,identity:{accountId:identity.accountId,tokenId:identity.tokenId,metadataDigest:await computeServiceIdentityDigest(token),exclusiveQa:true},request,now:()=>1000});assert.deepEqual(await a.disableServiceIdentity(plan),{verified:true,state:'disabled'});assert.deepEqual(methods,['GET','PUT','GET']);
});
