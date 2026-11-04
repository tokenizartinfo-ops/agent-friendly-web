import test from 'node:test';
import assert from 'node:assert/strict';
import {createFiniteOwnerRequestLease,readFiniteOwnerRequestBoundary,continuePrivateQaFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from '../lib/mcp-qa-finite-stage-work.mjs';
import {forwardFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-native-bridge.mjs';
import {createFiniteOwnerNativeReceiver} from '../lib/mcp-qa-finite-owner-native-receiver.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',U=O+'/connections/finite-prepare',T='https://afw-private.invalid/_finite-owner/choice',V='11111111-1111-4111-8111-111111111111',A='a'.repeat(64);
function sender(fetcher){
 const sent=[],stub={fetch(request){sent.push(request);return fetcher(request);}},ns={idFromName(name){assert.equal(name,'afw-own-successor-closure-v1');return {toString:()=>A};},get(){return stub;}};
 const env={AFW_FINITE_TRIAL_CONTROL:ns,AFW_FINITE_TRIAL_VERSION:{id:V},DB:{prepare(){},withSession(){}},OAUTH_KV:{get(){},put(){}},DELEGATED_RATE_LIMITER:{limit(){}}};
 const retained=[],ctx={waitUntil(p){retained.push(p);}};return {env,ctx,sent,retained,stub};
}
async function invoke(f,request){
 const parent=createFiniteOwnerRequestLease(request);
 try{return await forwardFiniteOwnerChoice({...f,request},parent.lease);}finally{parent.finish();}
}
test('fixed M holder capture rejects drift across actual fetch settlement and never needs QA holders',async()=>{
 const f=sender(async()=>{f.env.OAUTH_KV={};return new Response('bounded');});
 const r=await invoke(f,new Request(U,{headers:{'x-afw-finite-extra':'forged','X-Other':'discard','Cookie':'SYN-cookie','Cf-Access-Jwt-Assertion':'SYN-JWT'}}));
 assert.equal(r.status,503);assert.equal(f.sent.length,1);assert.equal(f.sent[0].url,T);
 assert.equal(f.sent[0].headers.has('x-afw-finite-extra'),false);assert.equal(f.sent[0].headers.has('X-Other'),false);
 assert.equal(f.sent[0].headers.get('Cookie'),'SYN-cookie');assert.equal(f.sent[0].headers.get('Cf-Access-Jwt-Assertion'),'SYN-JWT');
 assert.equal(Object.hasOwn(f.env,'RELEASE_DB'),false);assert.equal(Object.hasOwn(f.ctx,'storage'),false);
 assert.doesNotMatch(await r.text(),/SYN-cookie|SYN-JWT/);await Promise.all(f.retained);
});
test('known HTTP error is prompt and retains real cancellation past logical finish',async()=>{
 let release,cancelled=false;const f=sender(async()=>new Response(new ReadableStream({cancel(){cancelled=true;return new Promise(r=>{release=r;});}}),{status:403}));
 const r=await invoke(f,new Request(U));assert.equal(r.status,403);assert.equal(cancelled,true);
 const other=createFiniteOwnerRequestLease(new Request(U));
 try{
  assert.throws(()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));
  release();await Promise.all(f.retained);
  assert.equal(await observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true),true);
 }finally{release();other.finish();}
});
test('bounded original body preserves first400 despite synchronous cancel error and sends no fetch',async()=>{
 const f=sender(async()=>new Response('unused'));
 const request=new Request(U,{method:'POST',headers:{Origin:O},duplex:'half',body:new ReadableStream({start(c){c.enqueue(new Uint8Array(16385));},cancel(){throw Error('SYN cancel');}})});
 const r=await invoke(f,request);assert.equal(r.status,400);assert.equal(f.sent.length,0);await Promise.all(f.retained);
});
test('oversized successful response fails closed and retains cancellation',async()=>{
 let release;const f=sender(async()=>new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array(16385));},cancel(){return new Promise(r=>{release=r;});}})));
 const r=await invoke(f,new Request(U));assert.equal(r.status,503);release();await Promise.all(f.retained);
});
function receiver(){
 const id={toString:()=>A},storage={get(){},transaction(){}},ctx={id,storage},env={AFW_INDEPENDENT_CLOSURE:{idFromName:()=>id,get(){}},RELEASE_DB:{prepare(){},withSession(){}},AFW_QA_VERSION:{id:V}};
 return {ctx,env,handler:createFiniteOwnerNativeReceiver({ctx,env})};
}
function headers(){
 const at=Date.now();return {'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:29999}),'x-afw-finite-original-url':U,'x-afw-finite-original-method':'GET','x-afw-finite-version':V,'x-afw-finite-request-id':V};
}
test('receiver strict envelope route, metadata and actual QA holder denials stay pending with zero source I/O',async()=>{
 let reads=0;const f=receiver();f.ctx.storage.get=()=>{reads++;};
 for(const [url,h,status,body]of [[T,{...headers(),'x-afw-finite-extra':'x'},400],[T,{...headers(),'x-afw-finite-original-url':U+'?x=1'},400],[T,{...headers(),'x-afw-finite-version':'bad'},400],[T,{...headers(),'x-afw-finite-request-id':'x'.repeat(2100)},400],[T,{...headers(),'x-afw-finite-boundary':'{}'},400],['https://afw-private.invalid/other',headers(),404],[T,headers(),503]]){
  const r=await f.handler.fetch(new Request(url,{method:'POST',headers:h,body}));assert.equal(r.status,status);assert.equal((await r.json()).operationalReadiness,false);
 }
 assert.equal(reads,0);
 const good=receiver();const r=await good.handler.fetch(new Request(T,{method:'POST',headers:headers()}));assert.equal(r.status,503);
 const post=new Request(T,{method:'POST',headers:{...headers(),'x-afw-finite-original-method':'POST',Origin:O},body:'x'.repeat(16385)});
 assert.equal((await good.handler.fetch(post)).status,400);
});
test('registered genuine preparation child boundary preserves original start and earlier five second end',async()=>{
 const request=new Request(U),parent=createFiniteOwnerRequestLease(request),root=readFiniteOwnerRequestBoundary(parent.lease);
 const ctx={id:{toString:()=>A},storage:{transaction(){}}},env={RELEASE_DB:{withSession(){}}};let boundary;
 try{
  await assert.rejects(continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,child=>{boundary=readFiniteOwnerRequestBoundary(child);throw Error('SYN stop before source');}));
  assert.equal(boundary.startedAt,root.startedAt);assert.ok(boundary.deadline<=root.deadline);assert.ok(boundary.remainingMs<=5000);
 }finally{parent.finish();}
});

test('late native fetch and its subsequent real body cancellation remain occupied through physical settlement',async()=>{
 let fetched,releaseFetch,releaseCancel,cancelStarted;
 const entered=new Promise(r=>{fetched=r;}),cancelling=new Promise(r=>{cancelStarted=r;});
 const f=sender(()=>{fetched();return new Promise(r=>{releaseFetch=r;});}),controller=new AbortController();
 const pending=invoke(f,new Request(U,{signal:controller.signal}));await entered;controller.abort();assert.equal((await pending).status,503);
 const other=createFiniteOwnerRequestLease(new Request(U)),probe=()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true);
 try{
  assert.throws(probe);
  releaseFetch(new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array([1]));},cancel(){cancelStarted();return new Promise(r=>{releaseCancel=r;});}})));
  await cancelling;assert.throws(probe);releaseCancel();await Promise.all(f.retained);assert.equal(await probe(),true);
 }finally{releaseCancel?.();other.finish();}
});

for(const fault of ['abort','holder-drift'])test('empty late successful response cancels before its first read after '+fault,async()=>{
 let enteredFetch,releaseFetch,releaseCancel,enterCancel,bodyController,readCalls=0,cancelStarted=false;
 const fetched=new Promise(r=>{enteredFetch=r;}),cancelling=new Promise(r=>{enterCancel=r;});
 const f=sender(()=>{enteredFetch();return new Promise(r=>{releaseFetch=r;});}),controller=new AbortController();
 const pending=invoke(f,new Request(U,{signal:controller.signal}));
 await fetched;
 if(fault==='abort'){controller.abort();assert.equal((await pending).status,503);}
 else f.env.OAUTH_KV={};
 const stream=new ReadableStream({start(c){bodyController=c;},cancel(){cancelStarted=true;enterCancel();return new Promise(r=>{releaseCancel=r;});}});
 const getReader=stream.getReader;
 stream.getReader=function(){const reader=Reflect.apply(getReader,this,[]),read=reader.read;reader.read=function(){readCalls++;return Reflect.apply(read,this,[]);};return reader;};
 const other=createFiniteOwnerRequestLease(new Request(U)),probe=()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true);
 let timer;
 try{
  releaseFetch(new Response(stream));
  const cancelled=await Promise.race([cancelling.then(()=>true),new Promise(r=>{timer=setTimeout(()=>r(false),250);})]);
  assert.equal(cancelled,true,'empty late response must begin cancellation before reading');
  assert.equal(readCalls,0,'invalid original lease or holder must not start a response read');
  assert.equal((await pending).status,503);assert.throws(probe,'actual cancel remains occupied after logical finish');
  releaseCancel();await Promise.all(f.retained);assert.equal(await probe(),true);
 }finally{
  clearTimeout(timer);
  // RED-only drain of the held read, after the causal assertion. This chunk
  // never masks the empty-stream behavior being tested above.
  if(!cancelStarted)bodyController.enqueue(new Uint8Array([1]));
  await cancelling;releaseCancel?.();await pending;await Promise.all(f.retained);other.finish();
 }
});
