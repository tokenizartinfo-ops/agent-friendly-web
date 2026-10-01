import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { Client,StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { localOAuthFixture,authorize,approve,exchange,handle,cookies } from './fixtures/delegated-oauth-runtime.mjs';

// Provider imports only the WorkerEntrypoint base; crypto/protocol/storage are real.
// Actual workerd bundling/runtime is a separate check, not represented by this shim.
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
hook.deregister();

test('OAuth consent, PKCE exchange, MCP read and disconnect work without sharing the human session',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);const client=new Client({name:'afw-delegated-local',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try {
    const anonymous=await f.request('/mcp',{},null);assert.equal(anonymous.status,401);assert.match(anonymous.headers.get('www-authenticate'),/oauth-protected-resource/);
    const auth=await authorize(f);assert.equal(auth.response.status,200);assert.ok(auth.html.includes('&lt;script&gt;'));assert.ok(!auth.html.includes('<script>'));
    // Fetch's navigation POST algorithm serializes Origin:null under no-referrer.
    // Keep origin available for the strict CSRF check, but send no cross-origin referrer.
    assert.equal(auth.response.headers.get('Referrer-Policy'),'same-origin');
    const redirect=await approve(f,auth);assert.equal(redirect.status,302);
    assert.equal(new URL(redirect.headers.get('Location')).searchParams.get('iss'),f.issuer);
    const tokenResponse=await exchange(f,redirect.headers.get('Location'),auth.verifier);assert.equal(tokenResponse.status,200);
    const tokens=await tokenResponse.json();assert.equal(tokens.expires_in,300);assert.equal(tokens.refresh_token,undefined);
    const transport=new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+tokens.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)});
    await client.connect(transport);
    const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.structuredContent.data.id,'p-a');
    const screen=await f.request('/connections');assert.equal(screen.headers.get('Referrer-Policy'),'same-origin');const html=await screen.text();const nonce=handle(html);const grant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
    const disconnect=await f.request('/connections/revoke',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(screen),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:nonce,grant})});
    assert.equal(disconnect.status,303);
    const revoked=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(revoked.isError,true);
    assert.equal(revoked.structuredContent.code,'delegated_access_denied');
  } finally {await client.close();f.close();}
});

test('consent cannot cross subjects, projects, browsers, redirect URIs or scopes',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try {
    assert.equal((await authorize(f,{project:'p-b'})).response.status,404);
    assert.equal((await authorize(f,{scope:'afw:project:read afw:write'})).response.status,400);
    assert.equal((await authorize(f,{params:{redirect_uri:'https://attacker.invalid/cb'}})).response.status,400);
    const a=await authorize(f);
    assert.equal((await approve(f,a,{identity:'owner-b'})).status,403);
    assert.equal((await f.request('/authorize',{method:'POST',headers:{Origin:'null',Cookie:a.cookie,'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({handle:handle(a.html),decision:'approve',scope:'afw:project:read'})})).status,403);
    assert.equal((await approve(f,a,{cookie:''})).status,400);
    assert.equal((await approve(f,a,{scope:['afw:project:read','afw:write']})).status,400);
    assert.equal((await approve(f,a)).status,302);
    assert.notEqual((await approve(f,a)).status,302);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,1);
  } finally {f.close();}
});

test('PKCE, audience and code replay failures do not issue a reusable token',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try {
    let a=await authorize(f);let r=await approve(f,a);
    assert.equal((await exchange(f,r.headers.get('Location'),'b'.repeat(64))).status,400);
    a=await authorize(f);r=await approve(f,a);
    assert.equal((await exchange(f,r.headers.get('Location'),a.verifier,{resource:'https://other.invalid/mcp'})).status,400);
    a=await authorize(f);r=await approve(f,a);
    assert.equal((await exchange(f,r.headers.get('Location'),a.verifier)).status,200);
    assert.equal((await exchange(f,r.headers.get('Location'),a.verifier)).status,400);
    assert.equal((await f.request('/authorize?'+a.query,{headers:{'Cf-Access-Jwt-Assertion':await f.actor('owner-a','wrong-audience')}},null)).status,401);
  } finally {f.close();}
});

test('configuration stays closed, consent expires and CSRF/disconnect fails closed',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try {
    f.env.AFW_DELEGATED_OAUTH_ENABLED='false';assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,404);
    f.env.AFW_DELEGATED_OAUTH_ENABLED='true';assert.equal((await f.request('/oauth/register',{method:'POST'},null)).status,404);
    const a=await authorize(f);f.setTime(new Date(Date.now()+20*60*1000).toISOString());assert.equal((await approve(f,a)).status,403);
    const response=await f.request('/connections/revoke',{method:'POST',headers:{Origin:'https://attacker.invalid','Content-Type':'application/x-www-form-urlencoded'},body:'handle=x&grant=y'});assert.equal(response.status,403);
  } finally {f.close();}
});

test('standard token revocation also disconnects the authoritative application grant',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const a=await authorize(f),redirect=await approve(f,a);
    const tokens=await (await exchange(f,redirect.headers.get('Location'),a.verifier)).json();
    const response=await f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({token:tokens.access_token,client_id:f.client.clientId})},null);
    assert.equal(response.status,200);assert.ok(f.sqlite.prepare('SELECT revoked_at FROM delegated_access_grants').get().revoked_at);
    assert.equal((await f.request('/mcp',{headers:{Authorization:'Bearer '+tokens.access_token}},null)).status,401);
  }finally{f.close();}
});

test('revoked consent grant cannot issue tokens; metadata describes only the isolated real service',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const metadata=await (await f.request('/.well-known/oauth-authorization-server',{},null)).json();
    assert.equal(metadata.issuer,f.issuer);assert.equal(metadata.registration_endpoint,undefined);
    const a=await authorize(f),redirect=await approve(f,a);
    f.sqlite.prepare("UPDATE delegated_access_grants SET revoked_at='2026-09-30T19:00:00Z'").run();
    assert.equal((await exchange(f,redirect.headers.get('Location'),a.verifier)).status,400);
    assert.equal((await f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'x='.padEnd(17000,'x')},null)).status,400);
  }finally{f.close();}
});

test('two concurrent exchanges of one code cannot issue two tokens',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const a=await authorize(f),redirect=await approve(f,a);
    const replies=await Promise.all([exchange(f,redirect.headers.get('Location'),a.verifier),exchange(f,redirect.headers.get('Location'),a.verifier)]);
    assert.equal(replies.filter(r=>r.status===200).length,1);
  }finally{f.close();}
});

test('bounded canary expires and refuses requests without its edge rate guard',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(Date.now()+60000).toISOString();
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
    f.env.DELEGATED_RATE_LIMITER={limit:async()=>({success:false})};
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,429);
    f.env.DELEGATED_RATE_LIMITER={limit:async()=>({success:true})};
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,200);
    f.setTime(new Date(Date.now()+120000).toISOString());
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,404);
    f.env.AFW_OAUTH_PILOT_EXPIRES_AT='invalid';
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
  }finally{f.close();}
});
