import test from 'node:test';
import assert from 'node:assert/strict';
import {createAdministrativeGetTransport} from '../lib/assistance-administrative-get-transport.mjs';
const resources={accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'};
const path='/accounts/'+resources.accountId+'/workers/scripts/'+resources.workerName+'/settings';
const json=v=>Response.json(v);
const options=extra=>({resources,readCredential:async()=> 'synthetic-only-private-api-key',fetchImpl:async()=>json({success:true,result:{bindings:[]}}),...extra});
test('fixed GET origin and server custody; response strips private metadata and caller mutation cannot repin resources',async()=>{
 const requests=[],o=options({fetchImpl:async(url,init)=>{requests.push({url,init});return json({success:true,result:{bindings:[]},errors:[],messages:[{message:'private'}]});}}),transport=createAdministrativeGetTransport(o);
 o.resources={...resources,workerName:'different'};
 assert.deepEqual(await transport({method:'GET',path}),{success:true,result:{bindings:[]}});
 assert.equal(requests[0].url,'https://api.cloudflare.com/client/v4'+path);assert.equal(requests[0].init.method,'GET');assert.equal(requests[0].init.redirect,'error');assert.ok(requests[0].init.signal instanceof AbortSignal);assert.equal(requests[0].init.headers.Authorization,'Bearer synthetic-only-private-api-key');
});
test('unapproved methods, URLs, queries, fields and resource paths never read custody or fetch',async()=>{
 let calls=0;const transport=createAdministrativeGetTransport(options({readCredential:async()=>{calls++;return 'synthetic-only-private-api-key';}}));
 for(const input of [{method:'POST',path},{method:'GET',path:path+'?x=1'},{method:'GET',path:path+'/other'},{method:'GET',path,headers:{}},{method:'GET',path:'https://other.invalid'}])assert.deepEqual(await transport(input),{success:false});
 assert.equal(calls,0);assert.throws(()=>createAdministrativeGetTransport(options({resources:{...resources,workerName:'../other'}})));
});
test('private provider failures, redirects, malformed or oversized responses return only failure',async()=>{
 for(const response of [new Response('private',{status:401}),new Response(null,{status:302,headers:{Location:'https://other.invalid'}}),new Response('bad',{headers:{'Content-Type':'application/json'}}),json({success:false,errors:[{message:'private secret'}]}),json({success:true,result:'a'.repeat(262145)})]){
  const transport=createAdministrativeGetTransport(options({fetchImpl:async()=>response}));assert.deepEqual(await transport({method:'GET',path}),{success:false});
 }
});
test('deadline includes credential lookup and cannot dispatch after a late secret resolves',async()=>{
 let resolve,calls=0;const credential=new Promise(r=>{resolve=r;});
 const transport=createAdministrativeGetTransport(options({timeoutMs:15,readCredential:()=>credential,fetchImpl:async()=>{calls++;return json({success:true,result:{}});}}));
 assert.deepEqual(await transport({method:'GET',path}),{success:false});resolve('synthetic-only-private-api-key');await new Promise(r=>setTimeout(r,10));assert.equal(calls,0);
});
test('deadline aborts fetch/body; edited input or invalid credential cannot dispatch',async()=>{
 let signal;const transport=createAdministrativeGetTransport(options({timeoutMs:15,fetchImpl:async(_url,init)=>{signal=init.signal;return new Promise(()=>{});}}));
 assert.deepEqual(await transport({method:'GET',path}),{success:false});assert.equal(signal.aborted,true);
 let calls=0;const input={method:'GET',path};const edited=createAdministrativeGetTransport(options({readCredential:async()=>{input.method='POST';return 'synthetic-only-private-api-key';},fetchImpl:async()=>{calls++;}}));
 assert.deepEqual(await edited(input),{success:false});assert.equal(calls,0);
 const invalid=createAdministrativeGetTransport(options({readCredential:async()=> 'secret\r\nheader',fetchImpl:async()=>{calls++;}}));assert.deepEqual(await invalid({method:'GET',path}),{success:false});assert.equal(calls,0);
});
test('a stalled response body is cancelled when the deadline expires',async()=>{
 let cancelled=false;const body=new ReadableStream({start(){},cancel(){cancelled=true;}});
 const transport=createAdministrativeGetTransport(options({timeoutMs:15,fetchImpl:async()=>new Response(body,{headers:{'Content-Type':'application/json'}})}));
 assert.deepEqual(await transport({method:'GET',path}),{success:false});assert.equal(cancelled,true);
});
test('oversized declared body and non-JSON MIME are rejected; custody errors stay private',async()=>{
 for(const response of [new Response('{}',{headers:{'Content-Type':'text/html'}}),new Response('{}',{headers:{'Content-Type':'application/json','Content-Length':'262145'}})]){
  const transport=createAdministrativeGetTransport(options({fetchImpl:async()=>response}));assert.deepEqual(await transport({method:'GET',path}),{success:false});
 }
 const unavailable=createAdministrativeGetTransport(options({readCredential:async()=>{throw Error('private custodian failure');}}));assert.deepEqual(await unavailable({method:'GET',path}),{success:false});
});
