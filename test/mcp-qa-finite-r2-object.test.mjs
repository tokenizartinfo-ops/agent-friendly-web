import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import pin from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};

const api=await import('../lib/mcp-qa-finite-r2-object.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-r2-object.mjs'))throw error;
 return {};
});
const account='85d0d5dadac3341a564f22ce885e9eec',now=()=>Date.parse('2026-11-19T15:30:00Z');
function signed(){
 const url=new URL('https://'+pin.bucket+'.'+account+'.r2.cloudflarestorage.com/'+pin.objectKey);
 const q={'X-Amz-Algorithm':'AWS4-HMAC-SHA256','X-Amz-Credential':'1'.repeat(32)+'/20261119/auto/s3/aws4_request','X-Amz-Date':'20261119T152900Z',
  'X-Amz-Expires':'600','X-Amz-SignedHeaders':'host','X-Amz-Signature':'2'.repeat(64),'X-Amz-Content-Sha256':'UNSIGNED-PAYLOAD','x-id':'GetObject'};
 for(const [key,value] of Object.entries(q))url.searchParams.set(key,value);
 return url;
}
const signal=new AbortController().signal;
test('final ZIP configuration selects the dedicated exact package link ahead of a draft link',()=>{
 const sourceRevision='a'.repeat(40),draft=signed(),pkg=signed();
 draft.pathname='/finite-bundles-v1/'+sourceRevision+'.zip';
 pkg.pathname='/finite-packages-v2/'+sourceRevision+'.zip';
 assert.equal(api.finiteR2PackageReadCredential({AFW_R2_PACKAGE_READ_URL:pkg.href,AFW_R2_BUNDLE_READ_URL:draft.href},{sourceRevision,now}),pkg.href);
 assert.equal(api.finiteR2PackageReadCredential({AFW_R2_BUNDLE_READ_URL:pkg.href},{sourceRevision,now}),pkg.href);
 assert.equal(api.finiteR2PackageReadCredential({AFW_R2_PACKAGE_READ_URL:'',AFW_R2_BUNDLE_READ_URL:pkg.href},{sourceRevision,now}),pkg.href);
});
test('final ZIP configuration rejects draft, historical, mismatched and expired links locally',()=>{
 const sourceRevision='a'.repeat(40),draft=signed(),pkg=signed(),wrong=signed(),expired=signed();
 draft.pathname='/finite-bundles-v1/'+sourceRevision+'.zip';
 pkg.pathname='/finite-packages-v2/'+sourceRevision+'.zip';
 wrong.pathname='/finite-packages-v2/'+'b'.repeat(40)+'.zip';
 expired.pathname=pkg.pathname;expired.searchParams.set('X-Amz-Expires','45');
 for(const env of [
  {},{AFW_R2_BUNDLE_READ_URL:draft.href},{AFW_R2_PACKAGE_READ_URL:signed().href},
  {AFW_R2_PACKAGE_READ_URL:wrong.href},{AFW_R2_PACKAGE_READ_URL:expired.href},
  {AFW_R2_PACKAGE_READ_URL:draft.href,AFW_R2_BUNDLE_READ_URL:pkg.href},
 ]){
  assert.throws(()=>api.finiteR2PackageReadCredential(env,{sourceRevision,now}),{message:'Finite R2 package credential unavailable'});
 }
});
test('the executor reads only the pinned backup object with a signed GET and no account bearer token',async()=>{
 assert.equal(typeof api.readFiniteR2Archive,'function','exact R2 reader required');
 const url=signed(),calls=[];
 const response=await api.readFiniteR2Archive({credential:url.href,now,requiredUntil:now()+120000,signal,fetchImpl:async(input,opts)=>{
  calls.push({input,opts});return new Response('archive',{headers:{'content-type':'application/zip'}});
 }});
 assert.equal(response.status,200);
 assert.equal(calls.length,1);assert.equal(calls[0].input,url.href);
 assert.equal(calls[0].opts.method,'GET');assert.equal(calls[0].opts.redirect,'error');
 assert.equal(Object.keys(calls[0].opts.headers).some(k=>k.toLowerCase()==='authorization'),false);
});
test('foreign bucket, extra operations, duplicate parameters and short credentials fail before any fetch',async()=>{
 assert.equal(typeof api.readFiniteR2Archive,'function','exact R2 reader required');
 const changes=[
  u=>{u.hostname='other.'+account+'.r2.cloudflarestorage.com';},
  u=>{u.pathname='/other.zip';},u=>{u.port='8443';},u=>{u.username='secret';},
  u=>{u.searchParams.set('x-id','PutObject');},
  u=>{u.searchParams.append('X-Amz-Signature','3'.repeat(64));},
  u=>{u.searchParams.set('X-Amz-Expires','119');}
 ];
 for(const change of changes){const u=signed();change(u);
  await assert.rejects(api.readFiniteR2Archive({credential:u.href,now,requiredUntil:now()+120000,signal,fetchImpl:async()=>assert.fail('unexpected fetch')}),{message:'Finite R2 archive unavailable'});
 }
});
test('redirects and upstream exceptions cannot leak the signed URL or start another read',async()=>{
 assert.equal(typeof api.readFiniteR2Archive,'function','exact R2 reader required');
 const credential=signed().href;
 let calls=0;
 await assert.rejects(api.readFiniteR2Archive({credential,now,requiredUntil:now()+120000,signal,
  fetchImpl:async()=>{calls++;throw Error(credential);}}),{message:'Finite R2 archive unavailable'});
 assert.equal(calls,1);
});

const revision='a'.repeat(40),object='finite-bundles-v1/'+revision+'.zip';
function bundleUrl(write=false){
 const url=signed();
 url.pathname='/'+object;
 if(write){
  url.searchParams.set('x-id','PutObject');
  url.searchParams.set('X-Amz-SignedHeaders','host;if-none-match');
 }
 return url.href;
}
test('private bundle is created conditionally and a separate GET verifies the exact bytes',async()=>{
 const bytes=Buffer.from('private finite bundle'),calls=[];
 const result=await api.storeFiniteR2Bundle({sourceRevision:revision,bytes,writeCredential:bundleUrl(true),readCredential:bundleUrl(),
  now,signal,fetchImpl:async(url,options)=>{
   calls.push({url,options});
   if(options.method==='PUT')return new Response(null,{status:200});
   return new Response(bytes,{headers:{'content-type':'application/zip','content-length':String(bytes.length)}});
  }});
 assert.equal(result.objectKey,object);assert.equal(result.status,'created_verified');
 assert.deepEqual(calls.map(c=>c.options.method),['PUT','GET']);
 assert.equal(calls[0].options.headers['If-None-Match'],'*');
 assert.equal(calls[0].options.body,bytes);
});

test('occupied or uncertain object is read back once, and conflicting contents fail without overwrite',async()=>{
 const bytes=Buffer.from('private finite bundle');
 for(const fault of ['existing','uncertain','different','foreign']){
  const calls=[],options={sourceRevision:revision,bytes,writeCredential:bundleUrl(true),readCredential:fault==='foreign'?signed().href:bundleUrl(),
   now,signal,fetchImpl:async(url,init)=>{
    calls.push(init.method);
    if(init.method==='PUT'){
     if(fault==='uncertain')throw Error(url);
     return new Response(null,{status:412});
    }
    const payload=fault==='different'?Buffer.from('foreign content'):bytes;
    return new Response(payload,{headers:{'content-type':'application/zip','content-length':String(payload.length)}});
   }};
  if(fault==='different'||fault==='foreign'){
   await assert.rejects(api.storeFiniteR2Bundle(options),{message:'Finite R2 archive unavailable'});
  }else assert.equal((await api.storeFiniteR2Bundle(options)).status,'readback_verified');
  assert.deepEqual(calls,fault==='foreign'?[]:['PUT','GET']);
 }
});
test('the reviewed candidate uses its own R2 key and cannot overwrite an existing object',async()=>{
 const key='finite-candidates-v1/'+revision+'.zip',bytes=Buffer.from('candidate archive');
 const digest=createHash('sha256').update(bytes).digest('hex');
 function candidateUrl(write=false,prefix='finite-candidates-v1'){
  const u=new URL(bundleUrl(write));
  u.pathname='/'+prefix+'/'+revision+'.zip';
  return u.href;
 }
 assert.equal(api.finiteR2CandidateKey(revision),key);
 for(const variant of ['fresh','existing','conflicting','final-key','draft-key','misdirected-read','wrong-digest','no-digest','short-read']){
  const calls=[];
  const update=variant==='final-key'?candidateUrl(true,'finite-packages-v2'):variant==='draft-key'?bundleUrl(true):candidateUrl(true);
  const read=new URL(variant==='misdirected-read'?candidateUrl(false,'finite-packages-v2'):candidateUrl());
  if(variant==='short-read')read.searchParams.set('X-Amz-Expires','80');
  const expectedArchiveSha256=variant==='wrong-digest'?'0'.repeat(64):variant==='no-digest'?undefined:digest;
  const result=api.storeFiniteR2Candidate({sourceRevision:revision,bytes,expectedArchiveSha256,writeCredential:update,readCredential:read.href,now,signal,
   fetchImpl:async(url,init)=>{
    assert.equal(new URL(url).pathname,'/'+key);
    calls.push(init.method);
    if(init.method==='PUT'){
     assert.equal(init.headers['If-None-Match'],'*');
     return new Response(null,{status:variant==='fresh'?200:412});
    }
    const returned=variant==='conflicting'?Buffer.alloc(bytes.length,9):bytes;
    return new Response(returned,{headers:{'content-type':'application/zip','content-length':String(bytes.length)}});
   }});
  if(variant==='fresh'||variant==='existing'){
   const receipt=await result;
   assert.equal(receipt.objectKey,key);
   assert.equal(receipt.archiveBytes,bytes.length);
   assert.equal(receipt.status,variant==='fresh'?'created_verified':'readback_verified');
   assert.equal(receipt.archiveSha256,digest);
  }else await assert.rejects(result,{message:'Finite R2 archive unavailable'});
  assert.deepEqual(calls,['final-key','draft-key','misdirected-read','wrong-digest','no-digest','short-read'].includes(variant)?[]:['PUT','GET']);
 }
});

test('draft and deployable package credentials for the same revision cannot be interchanged',async()=>{
 const draft=bundleUrl(),release=new URL(draft);
 release.pathname='/finite-packages-v2/'+revision+'.zip';
 assert.equal(api.finiteR2BundleKey(revision),object);
 assert.equal(api.finiteR2PackageKey(revision),release.pathname.slice(1));
 const calls=[],options={sourceRevision:revision,archiveBytes:1,now,signal,fetchImpl:async url=>{
  calls.push(url);
  return new Response('z',{headers:{'content-type':'application/zip','content-length':'1'}});
 }};
 await assert.rejects(api.readFiniteR2Bundle({...options,credential:release.href}),{message:'Finite R2 archive unavailable'});
 await assert.rejects(api.readFiniteR2Package({...options,credential:draft}),{message:'Finite R2 archive unavailable'});
 assert.deepEqual(calls,[]);
 assert.equal(await (await api.readFiniteR2Bundle({...options,credential:draft})).text(),'z');
 assert.equal(await (await api.readFiniteR2Package({...options,credential:release.href})).text(),'z');
 assert.deepEqual(calls,[draft,release.href]);
});

test('protected historical access failures distinguish a missing secret, expiry and HTTP refusal without exposing the URL',async()=>{
 const credential=signed().href, expired=signed(),future=signed();
 expired.searchParams.set('X-Amz-Expires','20');
 future.searchParams.set('X-Amz-Date','20261119T153530Z');
 const cases=[
  [undefined,'credential_missing',null],
  ['https://synthetic.invalid/foreign.zip','credential_format_or_scope',null],
  [future.href,'signing_time_in_future',null],
  [expired.href,'signing_window_too_short',null],
  [credential,'archive_http_status',403,()=>new Response('private error body',{status:403})],
  [credential,'archive_response_metadata',200,()=>new Response('not a zip',{status:200})],
  [credential,'archive_request_failed',null,()=>{throw Error(credential);}]
 ];
 for(const [input,stage,httpStatus,respond] of cases){
  let calls=0;
  await assert.rejects(api.readFiniteR2Archive({credential:input,now,signal,fetchImpl:async()=>{
   calls+=1;
   return respond();
  }}),{message:'Finite R2 archive unavailable',cause:{stage,httpStatus}});
  assert.equal(calls,respond?1:0);
 }
});

test('official AWS CLI GetObject checksum query preserves the signature and remains GET-only',async()=>{
 const credential=signed();
 credential.searchParams.set('x-amz-checksum-mode','ENABLED');
 await api.readFiniteR2Archive({credential:credential.href,now,signal,fetchImpl:async(input,init)=>{
  assert.equal(input,credential.href);assert.equal(init.method,'GET');
  return new Response('archive',{headers:{'content-type':'application/zip'}});
 }});
 credential.searchParams.set('x-amz-checksum-mode','DISABLED');
 await assert.rejects(api.readFiniteR2Archive({credential:credential.href,now,signal,fetchImpl:async()=>assert.fail('unexpected fetch')}),
  {cause:{stage:'credential_format_or_scope',httpStatus:null}});
 const put=new URL(bundleUrl(true));
 put.searchParams.set('x-amz-checksum-mode','ENABLED');
 await assert.rejects(api.storeFiniteR2Bundle({sourceRevision:revision,bytes:Buffer.from('archive'),
  writeCredential:put.href,readCredential:bundleUrl(),now,signal,fetchImpl:async()=>assert.fail('unexpected fetch')}),
  {message:'Finite R2 archive unavailable'});
});

test('protected diagnostics do not trust thrown properties, reread status or wait for a rejected stream',{timeout:2000},async()=>{
 const credential=signed().href, malicious=Object.defineProperty(new Error(credential),'cause',{
  get(){assert.fail('untrusted cause inspected');}
 });
 await assert.rejects(api.readFiniteR2Archive({credential,now:()=>{throw malicious;},signal,
  fetchImpl:async()=>assert.fail('unexpected fetch')}),{cause:{stage:'credential_format_or_scope',httpStatus:null}});
 const stream=new ReadableStream({cancel:()=>new Promise(()=>{})});
 const refused=new Response(stream,{status:403});
 let reads=0;
 Object.defineProperty(refused,'status',{get:()=>++reads===1?403:credential});
 await assert.rejects(api.readFiniteR2Archive({credential,now,signal,fetchImpl:async()=>refused}),
  {cause:{stage:'archive_http_status',httpStatus:403}});
 assert.equal(reads,1);
 const controller=new AbortController();
 Object.defineProperty(controller.signal,'aborted',{get(){assert.fail('untrusted abort property inspected');}});
 await assert.rejects(api.readFiniteR2Archive({credential,now,signal:controller.signal,fetchImpl:async()=>{
  controller.abort();throw new Error(credential);
 }}),{cause:{stage:'archive_read_deadline',httpStatus:null}});
});
