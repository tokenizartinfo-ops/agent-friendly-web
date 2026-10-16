import assert from 'node:assert/strict';
import test from 'node:test';
import {registerHooks} from 'node:module';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {z} from 'zod';
import {localOAuthFixture,authorize,approve} from './fixtures/delegated-oauth-runtime.mjs';
import {observeMcpDiscoveryRequest,observeMcpEventAuthority} from '../lib/mcp-discovery-diagnostic.mjs';

const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
hook.deregister();

// Installed provider + real authorization-code/PKCE/storage logic; synthetic
// identity and local SQLite/KV only. This does not prove remote token receipt.
test('diagnostic follows the token endpoint advertised by the real AFW OAuth host',async()=>{
 const rows=[],sourceRevision='a'.repeat(40);
 const f=await localOAuthFixture(options=>{
  const host=createDelegatedOAuthWorker(options);
  return {authorizationServer:host.authorizationServer,fetch:(request,env,ctx)=>observeMcpDiscoveryRequest({request,env,sourceRevision,emit:r=>rows.push(r)},()=>host.fetch(request,env,ctx))};
 });
 try{
  const startAt=Date.now();Object.assign(f.env,{AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'true',AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT:String(startAt),AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT:String(startAt+600000)});
  const metadata=await(await f.request('/.well-known/oauth-authorization-server',{},null)).json();
  const endpoint=new URL(metadata.token_endpoint);assert.equal(endpoint.origin,f.issuer);
  const auth=await authorize(f,{scope:'afw:project:read'}),approved=await approve(f,auth,{scope:['afw:project:read']});
  const code=new URL(approved.headers.get('Location')).searchParams.get('code');
  const response=await f.request(endpoint.pathname,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,client_id:f.client.clientId,redirect_uri:'http://localhost:8950/callback',code_verifier:auth.verifier,resource:f.resource})},null);
  assert.equal(response.status,200);
  const token=await response.json();assert.equal(typeof token.access_token,'string');
  assert.deepEqual(rows.map(r=>[r.method,r.stage,r.status]),[['oauth/token','received',undefined],['oauth/token','response',200]]);
  const safe=JSON.stringify(rows);for(const secret of [code,auth.verifier,auth.cookie,token.access_token])assert.ok(!safe.includes(secret));
  const before=rows.length;await f.request('/token',{method:'POST',body:'private-body'},null);assert.equal(rows.length,before);
 }finally{f.close();}
});

test('actual OAuth MCP requests distinguish closed and enabled Events before catalog publication',async()=>{
 const rows=[],sourceRevision='b'.repeat(40);let catalogReads=0,client;
 const f=await localOAuthFixture(options=>{
  const authorizationServer=createDelegatedOAuthWorker(options).authorizationServer;
  return{authorizationServer,fetch:(request,env,ctx)=>observeMcpDiscoveryRequest({request,env,sourceRevision,emit:r=>rows.push(r)},diagnostic=>createDelegatedOAuthWorker({...options,eventsAuthorityFactory:()=>observeMcpEventAuthority(diagnostic,()=>({list:async()=>{catalogReads++;return 'c'.repeat(64);},subscribe:async()=>{throw Error('Not allowed in catalog test');},unsubscribe:async()=>{throw Error('Not allowed in catalog test');}}))}).fetch(request,env,ctx))};
 });
 try{
  const startAt=Date.now();Object.assign(f.env,{AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED:'true',AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT:String(startAt),AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT:String(startAt+600000)});
  const auth=await authorize(f,{scope:'afw:project:read'}),approved=await approve(f,auth,{scope:['afw:project:read']});
  const code=new URL(approved.headers.get('Location')).searchParams.get('code');
  const token=await(await f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,client_id:f.client.clientId,redirect_uri:'http://localhost:8950/callback',code_verifier:auth.verifier,resource:f.resource})},null)).json();
  const connect=async()=>{
   client=new Client({name:'afw-diagnostic-catalog',version:'1'},{versionNegotiation:{mode:{pin:'2026-07-28'}}});
   await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{fetch:async(input,init)=>{const request=new Request(input,init);request.headers.set('Authorization','Bearer '+token.access_token);request.headers.set('host',new URL(request.url).host);return f.worker.fetch(request,f.env,f.ctx);}}));
  };
  await connect();assert.equal(catalogReads,0);assert.ok(rows.some(r=>r.stage==='events_not_enabled'));assert.ok(!rows.some(r=>r.stage==='authenticated'));await client.close();
  rows.length=0;f.env.AFW_DOSSIER_EVENTS_ENABLED='true';await connect();
  const catalog=await client.request({method:'events/list',params:{}},z.object({events:z.array(z.any())}));
  assert.equal(catalog.events.length,1);assert.equal(catalogReads,1);
  assert.ok(rows.some(r=>r.stage==='events_enabled'));assert.ok(!rows.some(r=>r.stage==='events_not_enabled'));
  assert.ok(rows.some(r=>r.stage==='authenticated'));assert.ok(rows.some(r=>r.stage==='catalog'&&r.count===1));assert.ok(!JSON.stringify(rows).includes(token.access_token));
 }finally{if(client)await client.close();f.close();}
});
