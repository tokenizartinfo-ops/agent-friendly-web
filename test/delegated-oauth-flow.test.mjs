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

test('OAuth evidence read returns only dated synthetic current-owner/current-origin history and denies summary-only scope',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);
  const clients=[];
  try {
    const project=f.sqlite.prepare("SELECT website FROM site_projects WHERE id='p-a'").get();
    const origin=new URL(project.website).origin;
    const insert=f.sqlite.prepare('INSERT INTO scan_observations(id,project_id,user_id,target_origin,readiness_json,checked_at) VALUES(?,?,?,?,?,?)');
    const readiness=JSON.stringify({score:null,level:'SYNTHETIC — not an audit',methodology:'AFW synthetic acceptance fixture',privatePayload:'must-not-leak'});
    insert.run('synthetic-current','p-a','owner-a',origin,readiness,'2026-10-03T12:00:00.000Z');
    insert.run('synthetic-other-owner','p-a','owner-b',origin,readiness,'2026-10-03T12:01:00.000Z');
    insert.run('synthetic-old-origin','p-a','owner-a','https://old.example.invalid',readiness,'2026-10-03T12:02:00.000Z');
    insert.run('synthetic-undated','p-a','owner-a',origin,readiness,'invalid');
    for(const evidenceScope of [true,false]) {
      const scope=evidenceScope?['afw:project:read','afw:evidence:read']:['afw:project:read'];
      const auth=await authorize(f,{scope:scope.join(' ')});
      assert.match(auth.html,/el resumen del expediente/);
      if(evidenceScope)assert.match(auth.html,/y sus observaciones guardadas/);
      else assert.ok(!auth.html.includes('sus observaciones guardadas'));
      const redirect=await approve(f,auth,{scope});
      assert.equal(redirect.status,302);
      const exchanged=await exchange(f,redirect.headers.get('Location'),auth.verifier);
      assert.equal(exchanged.status,200);
      const token=await exchanged.json();
      const client=new Client({name:'afw-evidence-fixture',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});clients.push(client);
      await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)}));
      const result=await client.callTool({name:'read_saved_evidence',arguments:{}});
      if(!evidenceScope){assert.equal(result.isError,true);assert.equal(result.structuredContent.code,'insufficient_scope');continue;}
      assert.equal(result.isError,undefined);
      assert.deepEqual(result.structuredContent.data.history,[{id:'synthetic-current',target:origin,checkedAt:'2026-10-03T12:00:00.000Z',score:null,level:'SYNTHETIC — not an audit',methodology:'AFW synthetic acceptance fixture'}]);
      assert.ok(!JSON.stringify(result).includes('must-not-leak'));
      assert.ok(result.structuredContent.data.limits.length>0);
    }
  } finally {for(const client of clients)await client.close();f.close();}
});

test('OAuth consent, PKCE exchange, MCP read and disconnect work without sharing the human session',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);const client=new Client({name:'afw-delegated-local',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try {
    const anonymous=await f.request('/mcp',{},null);assert.equal(anonymous.status,401);assert.match(anonymous.headers.get('www-authenticate'),/oauth-protected-resource/);
    const auth=await authorize(f);assert.equal(auth.response.status,200);assert.ok(auth.html.includes('&lt;script&gt;'));assert.ok(!auth.html.includes('<script>'));
    // Fetch's navigation POST algorithm serializes Origin:null under no-referrer.
    // Keep origin available for the strict CSRF check, but send no cross-origin referrer.
    assert.equal(auth.response.headers.get('Referrer-Policy'),'same-origin');
    assert.match(auth.response.headers.get('Content-Security-Policy'),/form-action 'self' http:\/\/localhost:8950;/);
    assert.ok(!auth.response.headers.get('Content-Security-Policy').includes('*'));
    const redirect=await approve(f,auth);assert.equal(redirect.status,302);
    assert.equal(new URL(redirect.headers.get('Location')).searchParams.get('iss'),f.issuer);
    const tokenResponse=await exchange(f,redirect.headers.get('Location'),auth.verifier);assert.equal(tokenResponse.status,200);
    const tokens=await tokenResponse.json();assert.equal(tokens.expires_in,300);assert.equal(tokens.refresh_token,undefined);
    const transport=new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+tokens.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)});
    await client.connect(transport);
    const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.structuredContent.data.id,'p-a');
    const screen=await f.request('/connections');assert.equal(screen.headers.get('Referrer-Policy'),'same-origin');const html=await screen.text();const nonce=handle(html);const grant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
    assert.match(screen.headers.get('Content-Security-Policy'),/form-action 'self';/);
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

test('connections explain withdrawn and expired permissions without offering redundant disconnect',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    assert.match(await (await f.request('/connections')).text(),/No tenés conexiones/);
    const a=await authorize(f);await approve(f,a);
    let html=await (await f.request('/connections')).text();
    assert.match(html,/Conectada/);assert.match(html,/<button>Desconectar<\/button>/);
    assert.ok(!html.includes('owner-a'));
    f.sqlite.prepare("UPDATE delegated_access_grants SET expires_at='2020-01-01T00:00:00Z'").run();
    html=await (await f.request('/connections')).text();
    assert.match(html,/Permiso vencido/);assert.ok(!html.includes('<button>Desconectar</button>'));
    f.sqlite.prepare("UPDATE delegated_access_grants SET revoked_at='2026-10-01T13:00:00Z'").run();
    html=await (await f.request('/connections')).text();
    assert.match(html,/Desconectada/);assert.ok(!html.includes('<button>Desconectar</button>'));
    assert.ok(!html.includes(' · revoked · '));
  }finally{f.close();}
});

test('server-pinned pilot cannot select another owned project or retain access after its target changes',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);const client=new Client({name:'afw-pinned-pilot',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try {
    f.sqlite.prepare("INSERT INTO site_projects (id,user_id,organization,website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at) SELECT 'p-a2',user_id,'Other owned project',website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at FROM site_projects WHERE id='p-a'").run();
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';
    const auth=await authorize(f,{project:null});
    assert.equal(auth.response.status,200);assert.ok(!auth.html.includes('Other owned project'));assert.ok(!auth.html.includes('<select'));
    assert.equal((await authorize(f,{project:'p-a2'})).response.status,404);
    assert.equal((await authorize(f,{project:null,identity:'owner-b'})).response.status,404);
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a2';
    assert.equal((await approve(f,auth)).status,403);
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';
    const redirect=await approve(f,auth);assert.equal(redirect.status,302);
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a2';
    assert.equal((await exchange(f,redirect.headers.get('Location'),auth.verifier)).status,400);
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';
    const fresh=await authorize(f,{project:null}),approved=await approve(f,fresh);
    const tokenResponse=await exchange(f,approved.headers.get('Location'),fresh.verifier);assert.equal(tokenResponse.status,200);
    const token=await tokenResponse.json();
    let lastMcpStatus;
    await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(f.issuer).host}},fetch:async(url,options)=>{const response=await f.worker.fetch(new Request(url,options),f.env,f.ctx);lastMcpStatus=response.status;return response;}}));
    assert.equal((await client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.data.id,'p-a');
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a2';
    await assert.rejects(()=>client.callTool({name:'read_project_summary',arguments:{}}));
    assert.equal(lastMcpStatus,403);
    f.env.AFW_OAUTH_PILOT_PROJECT_ID=' ';
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
  } finally {await client.close();f.close();}
});

test('standard authorization selects an owned project in consent without a client-specific query',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    f.sqlite.prepare("INSERT INTO site_projects (id,user_id,organization,website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at) SELECT 'p-a2',user_id,'Second <site>',website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at FROM site_projects WHERE id='p-a'").run();
    const a=await authorize(f,{project:null});assert.equal(a.response.status,200);
    assert.match(a.html,/<select name="project" required>/);assert.match(a.html,/Second &lt;site&gt;/);
    assert.ok(!a.html.includes('value="p-b"'));assert.ok(!a.html.includes('selected'));
    assert.equal((await approve(f,a)).status,400);
    assert.equal((await approve(f,a,{project:['p-a','p-a2']})).status,400);
    assert.equal((await approve(f,a,{project:'p-b'})).status,404);
    const redirect=await approve(f,a,{project:'p-a2'});assert.equal(redirect.status,302);
    assert.equal(f.sqlite.prepare('SELECT project_id FROM delegated_access_grants').get().project_id,'p-a2');
    assert.equal((await exchange(f,redirect.headers.get('Location'),a.verifier)).status,200);
  }finally{f.close();}
});

test('project consent handles no projects, cancellation, pinned tampering and ownership changes',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const pinned=await authorize(f);assert.equal((await approve(f,pinned,{project:'p-b'})).status,400);
    const a=await authorize(f,{project:null});assert.equal(a.response.status,200);
    assert.equal((await approve(f,a,{decision:'deny'})).status,302);
    const b=await authorize(f,{project:null});
    f.sqlite.prepare("UPDATE site_projects SET user_id='owner-b' WHERE id='p-a'").run();
    assert.equal((await approve(f,b,{project:'p-a'})).status,404);
    const empty=await authorize(f,{project:null});assert.equal(empty.response.status,200);
    assert.match(empty.html,/Todavía no tenés un expediente/);assert.ok(!empty.html.includes('Permitir lectura'));
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,0);
  }finally{f.close();}
});

test('project picker stays bounded and rejects duplicate query, expired consent and replay',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const a=await authorize(f,{project:null});assert.match(a.html,/name="project" value="p-a"/);
    const repeated=await f.request('/authorize?'+a.query+'&project=p-a&project=p-a');assert.equal(repeated.status,400);
    const redirect=await approve(f,a,{project:'p-a'});assert.equal(redirect.status,302);
    assert.notEqual((await approve(f,a,{project:'p-a'})).status,302);
    const b=await authorize(f,{project:null});f.setTime(new Date(Date.now()+20*60*1000).toISOString());
    assert.equal((await approve(f,b,{project:'p-a'})).status,403);
    f.setTime(new Date().toISOString());
    for(let i=0;i<20;i++)f.sqlite.prepare("INSERT INTO site_projects (id,user_id,organization,website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at) SELECT ?,user_id,organization,website,role,site_type,control,audience,goals_json,languages_json,status,completion,revision,updated_at FROM site_projects WHERE id='p-a'").run('extra-'+i);
    const bounded=await authorize(f,{project:null});assert.equal(bounded.response.status,200);
    assert.match(bounded.html,/Elegí el expediente desde AFW/);assert.ok(!bounded.html.includes('Permitir lectura'));
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,1);
  }finally{f.close();}
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
