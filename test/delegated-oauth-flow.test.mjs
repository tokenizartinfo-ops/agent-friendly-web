import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { readFileSync } from 'node:fs';
import { Client,StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { localOAuthFixture,authorize,approve,exchange,handle,cookies } from './fixtures/delegated-oauth-runtime.mjs';

// Provider imports only the WorkerEntrypoint base; crypto/protocol/storage are real.
// Actual workerd bundling/runtime is a separate check, not represented by this shim.
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
hook.deregister();

test('valid OAuth transport delivers read recovery and resumes with the same consent after storage returns',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);
  const client=new Client({name:'afw-recovery-transport-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  const statuses=[];
  const originalPrepare=f.env.DB.prepare;
  let unavailable=false;
  try {
    const a=await authorize(f,{scope:'afw:project:read'});
    const approval=await approve(f,a,{scope:['afw:project:read']});
    const token=await (await exchange(f,approval.headers.get('Location'),a.verifier)).json();
    const grantBefore=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get();
    f.env.DB.prepare=sql=>{
      if(unavailable&&/FROM site_projects/i.test(sql))throw Error('synthetic outage with private diagnostic');
      return originalPrepare(sql);
    };
    await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{
      requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(f.issuer).host}},
      fetch:async(url,options)=>{
        const response=await f.worker.fetch(new Request(url,options),f.env,f.ctx);
        if(options.body&&JSON.parse(options.body).method==='tools/call')
          statuses.push({status:response.status,challenge:response.headers.get('WWW-Authenticate')});
        return response;
      },
    }));
    const first=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(first.structuredContent.status,200);
    unavailable=true;
    const failed=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(failed.isError,true);
    assert.equal(failed.structuredContent.status,503);
    assert.equal(failed.structuredContent.code,'delegated_read_unavailable');
    assert.equal(failed.structuredContent.recovery.action,'retry_read');
    assert.equal(failed.structuredContent.recovery.automaticReconnect,false);
    assert.equal(failed.structuredContent.recovery.lastKnownContext,'historical_only');
    assert.equal(failed.structuredContent.data,undefined);
    assert.equal(failed._meta,undefined);
    assert.ok(!JSON.stringify(failed).includes('private diagnostic'));
    assert.ok(!JSON.stringify(failed).includes(token.access_token));
    assert.deepEqual(statuses.at(-1),{status:200,challenge:null});
    unavailable=false;
    const resumed=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(resumed.structuredContent.status,200);
    assert.deepEqual(resumed.structuredContent.data.nextQuestion,first.structuredContent.data.nextQuestion);
    assert.deepEqual(f.sqlite.prepare('SELECT * FROM delegated_access_grants').get(),grantBefore);
    assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS n FROM delegated_access_grants').get().n,1);
    assert.equal(statuses.length,3);
    assert.ok(statuses.every(row=>row.status===200&&row.challenge===null));
  } finally {f.env.DB.prepare=originalPrepare;await client.close();f.close();}
});

test('human pages allow only their fresh style nonce and provide safe recovery',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    const first=await authorize(f),second=await authorize(f);
    const nonce=first.html.match(/<style nonce="([^"]+)"/)[1];
    const csp=first.response.headers.get('Content-Security-Policy');
    assert.ok(csp.includes(`style-src 'nonce-${nonce}'`));
    assert.ok(!csp.includes('unsafe-inline'));
    assert.ok(!second.html.includes(`nonce="${nonce}"`));
    assert.match(first.html,/name="viewport"/);
    const denied=await f.request('/authorize?invalid=1');
    assert.equal(denied.status,400);
    const html=await denied.text();
    assert.match(html,/href="https:\/\/agentfriendlyweb.dev\/expediente"/);
    assert.match(html,/No voy a volver a conectar/);
  }finally{f.close();}
});

async function refreshFixture(){
  const f=await localOAuthFixture(createDelegatedOAuthWorker);
  f.env.AFW_OAUTH_REFRESH_ENABLED='true';
  // Candidate schema only: production migration is a separate operation.
  f.sqlite.exec(readFileSync('drizzle/0014_bizarre_excalibur.sql','utf8'));
  await f.worker.authorizationServer.getOAuthApi(f.env).updateClient(f.client.clientId,{grantTypes:['authorization_code','refresh_token']});
  const auth=await authorize(f,{scope:'afw:project:read'}),redirect=await approve(f,auth,{scope:['afw:project:read']});
  const response=await exchange(f,redirect.headers.get('Location'),auth.verifier);
  assert.equal(response.status,200);f.initial=await response.json();
  f.refresh=(token=f.initial.refresh_token,extra={})=>f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:token,client_id:f.client.clientId,resource:f.resource,...extra})},null);
  return f;
}

test('opt-in refresh remains bounded to original permission and uses each credential once',async()=>{
  const f=await refreshFixture();try{
    assert.equal(typeof f.initial.refresh_token,'string');
    const grant=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get();
    const metadata=await (await f.request('/.well-known/oauth-authorization-server',{},null)).json();
    assert.deepEqual(metadata.grant_types_supported,['authorization_code','refresh_token']);
    const replies=await Promise.all([f.refresh(),f.refresh()]);
    assert.deepEqual(replies.map(r=>r.status).sort(),[200,400]);
    const next=await replies.find(r=>r.status===200).json();assert.notEqual(next.refresh_token,f.initial.refresh_token);
    assert.equal((await f.refresh()).status,400);
    f.setTime(new Date(Date.parse(grant.expires_at)-90000).toISOString());
    const bounded=await f.refresh(next.refresh_token);assert.equal(bounded.status,200);
    const last=await bounded.json();assert.ok(last.expires_in<=90);
    assert.equal(f.sqlite.prepare('SELECT expires_at FROM delegated_access_grants').get().expires_at,grant.expires_at);
    f.setTime(grant.expires_at);assert.equal((await f.refresh(last.refresh_token)).status,400);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_refresh_uses').get().n,2);
  }finally{f.close();}
});

test('refresh denies withdrawal, changed owner and disabled mode without broadening scope',async()=>{
  for(const mode of ['revoked','owner','scope','disabled','storage','resource','client','pin']){
    const f=await refreshFixture();try{
      assert.equal(typeof f.initial.refresh_token,'string');
      let extra={};
      if(mode==='revoked')f.sqlite.prepare("UPDATE delegated_access_grants SET revoked_at='2026-10-03T00:00:00Z'").run();
      if(mode==='owner')f.sqlite.prepare("UPDATE site_projects SET user_id='owner-b' WHERE id='p-a'").run();
      if(mode==='scope')extra={scope:'afw:project:read afw:evidence:read'};
      if(mode==='disabled')f.env.AFW_OAUTH_REFRESH_ENABLED='false';
      if(mode==='storage')f.sqlite.exec('DROP TABLE delegated_refresh_uses');
      if(mode==='resource')extra={resource:'https://other.example/mcp'};
      if(mode==='client')extra={client_id:'other-client'};
      if(mode==='pin')f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-b';
      const response=await f.refresh(f.initial.refresh_token,extra);
      if(mode==='scope'){
        assert.equal(response.status,200);assert.equal((await response.json()).scope,'afw:project:read');
      }else assert.notEqual(response.status,200,mode);
    }finally{f.close();}
  }
});

test('refreshed MCP reads remain subject to disconnect and never expose credential records',async()=>{
  const f=await refreshFixture();const client=new Client({name:'afw-refresh-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try{
    const refreshed=await (await f.refresh()).json();
    await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+refreshed.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)}));
    assert.equal((await client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.data.id,'p-a');
    const screen=await f.request('/connections'),html=await screen.text();
    assert.ok(!html.includes(f.initial.refresh_token));assert.ok(!html.includes(refreshed.access_token));
    const records=JSON.stringify(f.sqlite.prepare('SELECT * FROM delegated_refresh_uses').all());
    assert.ok(!records.includes(f.initial.refresh_token));assert.match(records,/[a-f0-9]{64}/);
    const grant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
    assert.equal((await f.request('/connections/revoke',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(screen),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:handle(html),grant})})).status,303);
    const denied=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(denied.structuredContent.code,'delegated_access_denied');
    assert.equal((await f.refresh(refreshed.refresh_token)).status,400);
  }finally{await client.close();f.close();}
});

test('a failed credential write cannot retry the consumed refresh into another successor',async()=>{
  const f=await refreshFixture();try{
    const originalPut=f.env.OAUTH_KV.put;
    f.env.OAUTH_KV.put=async(key,...args)=>{if(key.startsWith('token:'))throw Error('synthetic storage outage');return originalPut(key,...args);};
    const failed=await f.refresh();assert.notEqual(failed.status,200);
    f.env.OAUTH_KV.put=originalPut;
    assert.equal((await f.refresh()).status,400);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM delegated_refresh_uses').get().n,1);
    // Credential recovery requires fresh consent; existing dossier remains intact.
    assert.equal(f.sqlite.prepare("SELECT organization FROM site_projects WHERE id='p-a'").get().organization,'A');
  }finally{f.close();}
});

test('token response advertises only original permission time remaining after storage latency',async()=>{
  const f=await refreshFixture();try{
    const deadline=f.sqlite.prepare('SELECT expires_at FROM delegated_access_grants').get().expires_at;
    f.setTime(new Date(Date.parse(deadline)-90000).toISOString());
    const put=f.env.OAUTH_KV.put;
    f.env.OAUTH_KV.put=async(key,...args)=>{if(key.startsWith('token:'))f.setTime(new Date(Date.parse(deadline)-85000).toISOString());return put(key,...args);};
    const response=await f.refresh();assert.equal(response.status,200);
    const token=await response.json();assert.ok(token.expires_in<=85);
    // Provider KV lifetime is not the authority for the application permission.
    f.setTime(deadline);
    const client=new Client({name:'afw-latency-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
    try{
      await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)}));
      assert.equal((await client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
    }finally{await client.close();}
  }finally{f.close();}
});

test('browser consent starts with summary only and requires an explicit evidence choice',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);
  try {
    const auth=await authorize(f);
    const controls=[...auth.html.matchAll(/<input\b[^>]*name="scope"[^>]*>/g)].map(m=>m[0]);
    const defaults=controls.filter(tag=>/type="hidden"/.test(tag)||/\bchecked(?:\s|>|=)/.test(tag)).map(tag=>tag.match(/value="([^"]+)"/)[1]);
    assert.deepEqual(defaults,['afw:project:read']);
    const evidence=controls.find(tag=>tag.includes('afw:evidence:read'));
    assert.match(evidence,/type="checkbox"/);
    assert.ok(!/\bchecked(?:\s|>|=)/.test(evidence));
    assert.match(auth.html,/También compartir las observaciones guardadas/);
    const response=await approve(f,auth,{scope:defaults});
    const token=await (await exchange(f,response.headers.get('Location'),auth.verifier)).json();
    assert.equal(token.scope,'afw:project:read');
    assert.deepEqual(JSON.parse(f.sqlite.prepare('SELECT scopes_json FROM delegated_access_grants').get().scopes_json),defaults);
    const explicit=await authorize(f);
    const both=['afw:project:read','afw:evidence:read'];
    const approved=await approve(f,explicit,{scope:both});
    const second=await (await exchange(f,approved.headers.get('Location'),explicit.verifier)).json();
    assert.equal(second.scope,both.join(' '));
    const summary=await authorize(f,{scope:'afw:project:read'});
    assert.doesNotMatch(summary.html,/<input\b[^>]*type="checkbox"/);
  } finally { f.close(); }
});

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
      if(evidenceScope)assert.match(auth.html,/También compartir las observaciones guardadas/);
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
    assert.deepEqual(metadata.grant_types_supported,['authorization_code']);
    assert.deepEqual(metadata.token_endpoint_auth_methods_supported,['none']);
    const a=await authorize(f),redirect=await approve(f,a);
    f.sqlite.prepare("UPDATE delegated_access_grants SET revoked_at='2026-09-30T19:00:00Z'").run();
    assert.equal((await exchange(f,redirect.headers.get('Location'),a.verifier)).status,400);
    assert.equal((await f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'x='.padEnd(17000,'x')},null)).status,400);
  }finally{f.close();}
});

test('connections explain expiry without exposing or revoking grants of another service',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try{
    f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';
    f.sqlite.prepare("UPDATE site_projects SET organization=? WHERE id='p-a'").run('A <script>owner</script>');
    const a=await authorize(f),redirect=await approve(f,a);
    await exchange(f,redirect.headers.get('Location'),a.verifier);
    const grant=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get();
    f.sqlite.prepare('INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)')
      .run('other-service','owner-a','other-client','p-a','https://other.example/mcp','["afw:project:read"]',grant.created_at,grant.expires_at,'');
    const active=await f.request('/connections');const activeHtml=await active.text();
    assert.match(activeHtml,/Expediente: A &lt;script&gt;owner&lt;\/script&gt;/);
    assert.match(activeHtml,/Resumen y comprobaciones guardadas/);
    assert.ok(!activeHtml.includes('other-service'));
    assert.match(activeHtml,/<time datetime=/);
    const denied=await f.request('/connections/revoke',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(active),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:handle(activeHtml),grant:'other-service'})});
    assert.equal(denied.status,403);
    assert.equal(f.sqlite.prepare("SELECT revoked_at FROM delegated_access_grants WHERE id='other-service'").get().revoked_at,'');
    for(let i=0;i<21;i++)f.sqlite.prepare('INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)')
      .run('foreign-'+i,'owner-a','other-client','p-a','https://other.example/mcp','["afw:project:read"]',new Date(Date.parse(grant.created_at)+1000).toISOString(),grant.expires_at,'');
    assert.match(await (await f.request('/connections')).text(),/Expediente: A/);
    f.setTime(new Date(Date.parse(grant.expires_at)+1000).toISOString());
    const expiredHtml=await (await f.request('/connections')).text();
    assert.match(expiredHtml,/Permiso vencido/);
    assert.match(expiredHtml,/Tu expediente sigue guardado/);
    assert.match(expiredHtml,/Volver a tu expediente/);
    assert.ok(!expiredHtml.includes('<button>Desconectar</button>'));
  }finally{f.close();}
});

test('expired application permission requires fresh consent and never revives a revoked grant',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);const clients=[];
  async function connect(token){const client=new Client({name:'expiry-read',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});clients.push(client);await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)}));return client;}
  try{
    const first=await authorize(f,{scope:'afw:project:read'});
    const firstRedirect=await approve(f,first,{scope:['afw:project:read']});
    const token=await (await exchange(f,firstRedirect.headers.get('Location'),first.verifier)).json();
    const oldClient=await connect(token.access_token);
    assert.equal((await oldClient.callTool({name:'read_project_summary',arguments:{}})).isError,undefined);
    const oldGrant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
    f.sqlite.prepare("UPDATE delegated_access_grants SET expires_at='2020-01-01T00:00:00Z' WHERE id=?").run(oldGrant);
    assert.equal((await oldClient.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
    f.sqlite.prepare("UPDATE delegated_access_grants SET revoked_at='2026-10-03T00:00:00Z' WHERE id=?").run(oldGrant);
    const fresh=await authorize(f,{scope:'afw:project:read'});
    assert.match(fresh.html,/El permiso dura diez minutos/);
    const freshRedirect=await approve(f,fresh,{scope:['afw:project:read']});
    const renewed=await (await exchange(f,freshRedirect.headers.get('Location'),fresh.verifier)).json();
    assert.equal(renewed.refresh_token,undefined);
    const newClient=await connect(renewed.access_token);
    assert.equal((await newClient.callTool({name:'read_project_summary',arguments:{}})).isError,undefined);
    assert.equal((await oldClient.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
    assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS count FROM delegated_access_grants').get().count,2);
  }finally{for(const client of clients)await client.close();f.close();}
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
    f.env.AFW_OAUTH_SERVICE_MODE='window';
    delete f.env.DELEGATED_RATE_LIMITER;
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

test('enabled service rejects missing or ambiguous availability policy',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);try {
    delete f.env.AFW_OAUTH_SERVICE_MODE;
    delete f.env.AFW_OAUTH_PILOT_EXPIRES_AT;
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
    f.env.AFW_OAUTH_SERVICE_MODE='unexpected';
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
    f.env.AFW_OAUTH_SERVICE_MODE='stable';
    f.env.AFW_OAUTH_PILOT_EXPIRES_AT='2026-10-04T00:00:00Z';
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
  }finally{f.close();}
});

test('stable service requires a functioning edge guard and keeps consent duration bounded',async()=>{
  const f=await localOAuthFixture(createDelegatedOAuthWorker);
  const client=new Client({name:'afw-stable-guard-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  try {
    f.env.AFW_OAUTH_SERVICE_MODE='stable';
    delete f.env.AFW_OAUTH_PILOT_EXPIRES_AT;
    delete f.env.DELEGATED_RATE_LIMITER;
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,503);
    f.env.DELEGATED_RATE_LIMITER={limit:async()=>({success:false})};
    const limited=await f.request('/.well-known/oauth-authorization-server',{},null);
    assert.equal(limited.status,429);assert.equal(limited.headers.get('Retry-After'),'60');
    f.env.DELEGATED_RATE_LIMITER={limit:async()=>{throw Error('private limiter diagnostic');}};
    const failed=await f.request('/.well-known/oauth-authorization-server',{},null);
    assert.equal(failed.status,503);assert.ok(!(await failed.text()).includes('private limiter diagnostic'));
    f.env.DELEGATED_RATE_LIMITER={limit:async()=>({success:true})};
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,200);
    const a=await authorize(f,{scope:'afw:project:read'});
    const approved=await approve(f,a,{scope:['afw:project:read']});
    const issued=await exchange(f,approved.headers.get('Location'),a.verifier);
    assert.equal(issued.status,200);const token=await issued.json();
    await client.connect(new StreamableHTTPClientTransport(new URL(f.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(f.issuer).host}},fetch:(url,options)=>f.worker.fetch(new Request(url,options),f.env,f.ctx)}));
    assert.equal((await client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.status,200);
    const grant=f.sqlite.prepare('SELECT created_at,expires_at FROM delegated_access_grants').get();
    assert.equal(Date.parse(grant.expires_at)-Date.parse(grant.created_at),600000);
    f.setTime(grant.expires_at);
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,200);
    const expired=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(expired.structuredContent.code,'delegated_access_denied');
    assert.equal(expired.structuredContent.data,undefined);
    f.env.AFW_DELEGATED_OAUTH_ENABLED='false';
    assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,404);
  }finally{await client.close();f.close();}
});
