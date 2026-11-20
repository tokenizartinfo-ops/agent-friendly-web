import test from 'node:test';
import assert from 'node:assert/strict';
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
