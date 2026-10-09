import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native administrative transports accept fixed requests and reject redirects without forwarding credentials',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {qaAdministrationFixture} from './test/fixtures/qa-administrative-composition.mjs';
 import {createServiceIdentityTransport} from './lib/assistance-service-identity-transport.mjs';
 import {createAdministrativeGetTransport} from './lib/assistance-administrative-get-transport.mjs';
 export default {async fetch(){
  const f=await qaAdministrationFixture(),r=f.registration,requests=[];
  let redirect=false;
  const fetchImpl=async(url,init)=>{
   // Real workerd Request validation, before any synthetic provider response.
   const req=new Request(url,init);requests.push({method:req.method,redirect:req.redirect});
   if(redirect)return new Response(null,{status:302,headers:{Location:'https://other.invalid'}});
   return f.options.fetchImpl(url,init);
  };
  const identity=createServiceIdentityTransport({identity:{accountId:r.resources.accountId,tokenId:r.resources.tokenId,name:r.identity.name,exclusiveQa:true},closeAt:r.plan.closeAt,now:f.options.now,readCredential:f.options.readIdentityCredential,fetchImpl});
  const administration=createAdministrativeGetTransport({resources:r.resources,readCredential:f.options.readAdministrativeCredential,fetchImpl});
  const tokenPath='/accounts/'+r.resources.accountId+'/access/service_tokens/'+r.resources.tokenId;
  const adminPath='/accounts/'+r.resources.accountId+'/workers/scripts/'+r.resources.workerName+'/settings';
  const get={method:'GET',path:tokenPath},put={method:'PUT',path:tokenPath,body:{enabled:false,name:r.identity.name}};
  const success=[await identity(get),await identity(put),await administration({method:'GET',path:adminPath})].map(x=>x.success);
  redirect=true;
  const denied=[await identity(get),await identity(put),await administration({method:'GET',path:adminPath})];
  return Response.json({success,denied,requests,providerCalls:f.calls.length});
 }};
 `},bundle:true,format:'esm',platform:'browser',write:false});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text}));
 try{
  const response=await runtime.dispatchFetch('https://synthetic.invalid');assert.equal(response.status,200);
  const r=await response.json();assert.deepEqual(r.success,[true,true,true]);
  assert.deepEqual(r.denied,[{success:false},{success:false},{success:false}]);
  assert.equal(r.requests.length,6);assert.ok(r.requests.every(x=>x.redirect==='manual'));
  assert.equal(r.providerCalls,3);
 }finally{await runtime.dispose();}
});
