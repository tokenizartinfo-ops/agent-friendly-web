import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';

const issuer='https://example.invalid',resource=issuer+'/mcp',callback=issuer+'/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const prepare='prepare_capsule_draft',reconcile='reconcile_capsule_preparation';
const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:1,idempotencyKey:'code-native-prepare-0001'};
test('native code PKCE consent and real KV tokens compose with preparation without broadening read authority',{timeout:120000},async t=>{
 const bundle=await build({entryPoints:['test/fixtures/preparation-code-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-code-pkce-ci-only'}}));
 const clients=[];let loseMcpAck=false,mcpFault='';const transmissions=[];let sequence=0;
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const ddl=(await readFile('db/agent-capsule-preparations.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);
  for(const sql of ddl)await db.prepare(sql).run();
  for(const sql of(await readFile('db/delegated-preparation-consents.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('project-a','owner-a','owner@example.invalid','Synthetic','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)").bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-real-token','verified',future,at,at).run();

  const dispatch=(path,init={})=>{
   const url=new URL(path,issuer);assert.equal(url.origin,issuer,'CI must not dispatch to another host');
   return runtime.dispatchFetch(url,{...init,redirect:'manual'});
  };
  const bootstrap=await (await dispatch('/__ci/bootstrap',{method:'POST'})).json();
  assert.equal(typeof bootstrap.clientId,'string');
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM delegated_access_grants) AS grants,(SELECT count(*) FROM delegated_consent_sessions) AS consents,(SELECT count(*) FROM agent_capsule_preparations) AS intents,(SELECT count(*) FROM publication_capsules) AS capsules,(SELECT count(*) FROM project_events WHERE type='agent_capsule_prepared') AS events").first();
  const capsules=async()=>{const c=await counts();return {intents:c.intents,capsules:c.capsules,events:c.events};};
  const grantCount=async()=>(await counts()).grants;
  const cookies=response=>response.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ');
  async function begin(scopes=[READ,DRAFTS],extra={},accept='application/json'){
   const verifier='a'.repeat(64),challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url');
   const state='ci-preparation-state-'+(++sequence);
   const query=new URLSearchParams({response_type:'code',client_id:bootstrap.clientId,redirect_uri:callback,resource,
    scope:scopes.join(' '),state,code_challenge:challenge,code_challenge_method:'S256',project:'project-a',...extra});
   const response=await dispatch('/authorize?'+query,{headers:{'x-ci-actor':'owner-a',Accept:accept}});
   const html=response.headers.get('Content-Type')?.startsWith('text/html')?await response.text():null;
   const data=html===null?await response.json():{handle:/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1],html};
   return {response,data,cookie:cookies(response),verifier,state};
  }
  function approve(a,decision='drafts',{cookie=a.cookie,actor='owner-a',origin=issuer,extra={},ackLoss=false,consentFault='',codeAckLoss=false}={}){
   const body=new URLSearchParams({handle:a.data.handle,decision});
   for(const [key,values]of Object.entries(extra))for(const value of Array.isArray(values)?values:[values])body.append(key,value);
   return dispatch('/authorize',{method:'POST',headers:{Origin:origin,Cookie:cookie,'x-ci-actor':actor,
    'Content-Type':'application/x-www-form-urlencoded',...(ackLoss?{'x-ci-grant-ack-loss':'true'}:{}),...(consentFault?{'x-ci-consent-ack-loss':consentFault}:{}),...(codeAckLoss?{'x-ci-code-ack-loss':'true'}:{})},body});
  }
  function exchange(a,redirect,extra={}){
   const code=new URL(redirect).searchParams.get('code');assert.equal(typeof code,'string');
   return dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'authorization_code',code,client_id:bootstrap.clientId,redirect_uri:callback,
     code_verifier:a.verifier,resource,...extra})});
  }
  async function authorizeToken(decision='drafts',scopes=[READ,DRAFTS]){
   const a=await begin(scopes);assert.equal(a.response.status,200);
   const approved=await approve(a,decision);assert.equal(approved.status,302);
   const redirect=approved.headers.get('Location');
   assert.equal(new URL(redirect).searchParams.get('state'),a.state);
   const response=await exchange(a,redirect);assert.equal(response.status,200);
   const token=await response.json();assert.equal(typeof token.access_token,'string');
   return {a,approved,redirect,response,token};
  }
  async function connect(token,mode='legacy'){
   const client=new Client({name:'afw-code-pkce-native-test',version:'1.0.0'},{versionNegotiation:{mode}});clients.push(client);
   const fetch=async(url,init)=>{
    assert.equal(new URL(url).origin,issuer);
    const packet=typeof init?.body==='string'?JSON.parse(init.body):null,headers=new Headers(init?.headers);
    headers.set('Authorization','Bearer '+token.access_token);headers.set('host','example.invalid');
    if(mcpFault&&packet?.method==='tools/list')headers.set('x-ci-mcp-fault',mcpFault);
    const response=await dispatch(url,{...init,headers});
    transmissions.push({rpc:packet?.method??'',tool:packet?.params?.name??'',status:response.status});
    if(loseMcpAck&&packet?.method==='tools/call'&&packet.params.name===prepare){
     loseMcpAck=false;const saved=await response.json();
     assert.equal(saved.result.structuredContent.code,'prepared','ACK fault must follow actual commit');throw Error('CI MCP acknowledgment lost');
    }
    return response;
   };
   await client.connect(new StreamableHTTPClientTransport(new URL(resource),{fetch,redirectPolicy:'same-origin',onInsufficientScope:'throw',
    maxStepUpRetries:0,reconnectionOptions:{maxRetries:0,initialReconnectionDelay:1,maxReconnectionDelay:1,reconnectionDelayGrowFactor:1}}));
   return client;
  }
  const call=(client,name,args={})=>client.callTool({name,arguments:args});
  let sessionToken,legacy,modern,first;
  let currentInput={...input};

  await t.test('unknown scopes and foreign project produce no consent or grant',async()=>{
   const before=await counts();
   assert.equal((await begin([READ,'afw:evidence:read'])).response.status,400);
   assert.equal((await begin([READ,DRAFTS],{project:'other-project'})).response.status,400);
   assert.deepEqual(await counts(),before);
  });
  await t.test('exact preparation schema is checked before starting a protocol consent',async()=>{
   const before=await counts();
   await db.prepare('DROP TRIGGER agent_capsule_preparations_no_delete').run();
   try{assert.equal((await begin()).response.status,503);assert.deepEqual(await counts(),before);}
   finally{await db.prepare(ddl.find(x=>x.includes('agent_capsule_preparations_no_delete'))).run();}
  });
  const handleHash=async a=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(a.data.handle))).toString('hex');
  const consentRow=async a=>db.prepare('SELECT * FROM delegated_preparation_consents WHERE handle_hash=?').bind(await handleHash(a)).first();
  const consentGrant=async a=>db.prepare('SELECT g.* FROM delegated_access_grants g JOIN delegated_preparation_consents c ON c.grant_id=g.id WHERE c.handle_hash=?').bind(await handleHash(a)).first();
  await t.test('SDK begin persists explicit original metadata without legacy kind or reconstructed start',async()=>{
   const before=await grantCount(),entered=Date.now(),a=await begin(),row=await consentRow(a);
   assert.equal(a.response.status,200);assert.ok(row,'missing original persisted consent');
   assert.equal(row.profile_id,'afw.preparation-consent.v1');assert.equal(row.user_id,'owner-a');
   assert.equal(row.client_id,bootstrap.clientId);assert.equal(row.project_id,'project-a');assert.equal(row.resource,resource);
   assert.match(row.request_hash,/^[a-f0-9]{64}$/);assert.equal(row.state,'pending');
   assert.equal(row.trial_started_at,bootstrap.trialStartedAt);assert.equal(row.trial_expires_at,bootstrap.trialExpiresAt);
   assert.ok(row.transaction_started_at>=entered&&row.transaction_started_at<=Date.now());
   assert.equal(row.transaction_expires_at,Math.min(row.transaction_started_at+600000,bootstrap.trialExpiresAt));
   assert.equal(await grantCount(),before);
   assert.equal((await db.prepare('SELECT count(*) AS n FROM delegated_consent_sessions').first()).n,0);
   assert.equal((await approve(a,'cancel')).status,302);assert.equal((await consentRow(a)).state,'cancelled');
  });
  await t.test('actual HTML form uses original window and the resulting summary reflects the visible read choice',async()=>{
   const a=await begin([READ,DRAFTS],{},'text/html');assert.equal(a.response.status,200);
   assert.match(a.response.headers.get('Content-Type'),/^text\/html/);assert.equal(a.response.headers.get('Cache-Control'),'no-store');
   assert.match(a.response.headers.get('Content-Security-Policy'),/frame-ancestors 'none'/);
   assert.equal(typeof a.data.handle,'string');assert.match(a.data.html,/name="decision" value="read"/);
   assert.match(a.data.html,/name="decision" value="drafts"/);assert.match(a.data.html,/name="decision" value="cancel"/);
   assert.ok(a.data.html.includes(new Date(bootstrap.trialExpiresAt).toISOString()));assert.doesNotMatch(a.data.html,/name="(?:scope|subject|project|expiresAt|requestHash)"/);
   const approved=await approve(a,'read');assert.equal(approved.status,302);
   const grant=await consentGrant(a);assert.ok(grant);assert.equal(grant.scopes_json,JSON.stringify([READ]));
   assert.equal(Date.parse(grant.expires_at),bootstrap.trialExpiresAt);
   const summary=await dispatch('/__ci/connection?handle='+encodeURIComponent(a.data.handle),{headers:{'x-ci-actor':'owner-a'}});
   assert.equal(summary.status,200);const html=await summary.text();assert.match(html,/<dd>Resumen<\/dd>/);
   assert.doesNotMatch(html,/<dd>Resumen y preparación de borradores<\/dd>/);assert.ok(html.includes(new Date(bootstrap.trialExpiresAt).toISOString()));
   const response=await exchange(a,approved.headers.get('Location'));assert.equal(response.status,200);
   assert.equal((await response.json()).scope,READ);
  });
  await t.test('actual reservation ACK loss never creates a grant or resumes approval',async()=>{
   const a=await begin(),before=await grantCount(),response=await approve(a,'drafts',{consentFault:'reserve'});
   assert.equal(response.status,503);assert.equal(response.headers.get('Location'),null);
   assert.equal((await consentRow(a)).state,'reserved');assert.equal(await grantCount(),before);
   assert.ok([400,403].includes((await approve(a)).status));assert.equal(await grantCount(),before);
  });
  await t.test('actual admission ACK loss retains an unexchanged grant without code or retry',async()=>{
   const a=await begin(),before=await grantCount(),response=await approve(a,'drafts',{consentFault:'admit'});
   assert.equal(response.status,503);assert.equal(response.headers.get('Location'),null);assert.equal(await grantCount(),before+1);
   assert.equal((await consentRow(a)).state,'admitted');
   const row=await consentGrant(a);assert.equal(row.revoked_at,'');assert.equal(row.exchanged_at,'');
   assert.ok([400,403].includes((await approve(a)).status));assert.equal(await grantCount(),before+1);
  });
  await t.test('lost SDK completion ACK revokes the application grant and never returns or replays a code',async()=>{
   const a=await begin(),before=await grantCount(),response=await approve(a,'drafts',{codeAckLoss:true});
   assert.equal(response.status,503);assert.equal(response.headers.get('Location'),null);assert.equal(await grantCount(),before+1);
   const row=await consentGrant(a);assert.ok(row.revoked_at);assert.equal(row.exchanged_at,'');
   assert.ok([400,403].includes((await approve(a)).status));assert.equal(await grantCount(),before+1);
  });
  await t.test('SDK cookie binding and immutable actor/origin reject forged approval before any grant',async()=>{
   const a=await begin();assert.equal(a.response.status,200);const before=await grantCount();
   assert.equal((await approve(a,'drafts',{cookie:''})).status,400);
   assert.equal((await approve(a,'drafts',{actor:'owner-b'})).status,403);
   assert.equal((await approve(a,'drafts',{origin:'https://other.invalid'})).status,403);
   assert.equal(await grantCount(),before);
   assert.equal((await approve(a,'cancel')).status,302);assert.equal(await grantCount(),before);
  });
  await t.test('extra and repeated form fields cannot widen the stored original request',async()=>{
   const a=await begin([READ]);assert.equal(a.response.status,200);const before=await grantCount();
   assert.equal((await approve(a,'drafts')).status,400);
   assert.equal((await approve(a,'read',{extra:{scope:DRAFTS}})).status,400);
   assert.equal((await approve(a,'read',{extra:{decision:'drafts'}})).status,400);
   assert.equal((await approve(a,'read',{extra:{project:'other-project'}})).status,400);
   assert.equal(await grantCount(),before);
   const accepted=await approve(a,'read');assert.equal(accepted.status,302);
   const response=await exchange(a,accepted.headers.get('Location'));assert.equal(response.status,200);
   const token=await response.json();assert.equal(token.scope,READ);
   const client=await connect(token),tools=(await client.listTools()).tools.map(x=>x.name);
   assert.ok(tools.includes('read_project_summary'));assert.ok(!tools.includes(prepare));assert.ok(!tools.includes(reconcile));
   const summary=await call(client,'read_project_summary');assert.notEqual(summary.isError,true);
   assert.deepEqual(await capsules(),{intents:0,capsules:0,events:0});
  });
  await t.test('fresh owner and schema checks remain required after a consent was opened',async()=>{
   const a=await begin(),before=await grantCount();
   await db.prepare("UPDATE site_projects SET user_id='owner-b' WHERE id='project-a'").run();
   try{assert.equal((await approve(a)).status,403);assert.equal(await grantCount(),before);}
   finally{await db.prepare("UPDATE site_projects SET user_id='owner-a' WHERE id='project-a'").run();}
   assert.equal((await approve(a)).status,403,'restored ownership does not restore the original revision');
   assert.equal((await approve(a,'cancel')).status,302);assert.equal(await grantCount(),before);
   const fresh=await begin();assert.equal(fresh.response.status,200);
   await db.prepare('DROP TRIGGER agent_capsule_preparations_no_delete').run();
   try{assert.equal((await approve(fresh)).status,503);assert.equal(await grantCount(),before);}
   finally{await db.prepare(ddl.find(x=>x.includes('agent_capsule_preparations_no_delete'))).run();}
   assert.equal((await approve(fresh,'cancel')).status,302);
  });
  await t.test('SDK rejects wrong PKCE and resource without issuing an access token',async()=>{
   for(const extra of [{code_verifier:'b'.repeat(64)},{resource:'https://other.invalid/mcp'}]){
    const a=await begin(),approved=await approve(a);assert.equal(approved.status,302);
    const response=await exchange(a,approved.headers.get('Location'),extra);assert.equal(response.status,400);
    assert.equal((await response.json()).access_token,undefined);
   }
   assert.deepEqual(await capsules(),{intents:0,capsules:0,events:0});
  });
  await t.test('concurrent approval of one handle persists one application grant and one redirect',async()=>{
   const a=await begin(),before=await grantCount();
   const responses=await Promise.all([approve(a),approve(a)]);
   assert.equal(responses.filter(x=>x.status===302).length,1);
   assert.ok(responses.every(x=>[302,400,403].includes(x.status)));
   assert.equal(await grantCount(),before+1);
   const winner=responses.find(x=>x.status===302);
   assert.equal((await exchange(a,winner.headers.get('Location'))).status,200,'losing submission must not revoke the winner');
  });
  await t.test('lost grant ACK after real D1 commit closes without issuing a code or a second grant',async()=>{
   const a=await begin(),before=await grantCount(),response=await approve(a,'drafts',{ackLoss:true});
   assert.equal(response.status,503);assert.equal(response.headers.get('Location'),null);assert.equal(await grantCount(),before+1);
   const row=await consentGrant(a);
   assert.ok(row.revoked_at);assert.equal(row.exchanged_at,'');
   assert.equal((await approve(a)).status,403);assert.equal(await grantCount(),before+1);
   assert.deepEqual(await capsules(),{intents:0,capsules:0,events:0});
  });
  await t.test('replaying a real code revokes its token family and cannot poison a separate fresh flow',async()=>{
   const replayed=await authorizeToken('read',[READ]);
   assert.equal((await exchange(replayed.a,replayed.redirect)).status,400);
   const response=await dispatch(resource,{method:'POST',headers:{Authorization:'Bearer '+replayed.token.access_token,
    'Content-Type':'application/json',Accept:'application/json, text/event-stream'},
    body:JSON.stringify({jsonrpc:'2.0',id:91,method:'tools/list',params:{}})});
   assert.equal(response.status,401);assert.match(response.headers.get('WWW-Authenticate'),/^Bearer/);
   assert.deepEqual(await capsules(),{intents:0,capsules:0,events:0});
  });
  await t.test('real SDK code exchange issues a bounded non-refresh token with only explicit draft scopes',async()=>{
   sessionToken=await authorizeToken();
   assert.equal(sessionToken.token.scope,[READ,DRAFTS].join(' '));assert.equal(sessionToken.token.refresh_token,undefined);
   assert.ok(sessionToken.token.expires_in>0&&sessionToken.token.expires_in<=90);
   const row=await db.prepare("SELECT expires_at,exchanged_at,scopes_json FROM delegated_access_grants WHERE id=(SELECT id FROM delegated_access_grants WHERE exchanged_at<>'' AND revoked_at='' ORDER BY created_at DESC LIMIT 1)").first();
   assert.ok(row.exchanged_at);assert.equal(Date.parse(row.expires_at),bootstrap.trialExpiresAt);
   assert.deepEqual(JSON.parse(row.scopes_json),[READ,DRAFTS]);
   assert.equal((await approve(sessionToken.a)).status,403);
  });
  await t.test('issued KV token reaches legacy MCP and prepares an actual D1 capsule',async()=>{
   legacy=await connect(sessionToken.token);
   assert.ok((await legacy.listTools()).tools.some(x=>x.name===prepare));
   // The earlier owner changes legitimately advanced the dossier revision.
   // Keep that history; prove stale input fails, then use a fresh authenticated read.
   assert.equal((await call(legacy,prepare,input)).structuredContent.code,'revision_conflict');
   const summary=await call(legacy,'read_project_summary');
   assert.notEqual(summary.isError,true);
   const current=await db.prepare("SELECT revision FROM site_projects WHERE id='project-a'").first();
   assert.ok(Number.isSafeInteger(current.revision)&&current.revision>input.expectedRevision);
   assert.equal(summary.structuredContent.data.revision,current.revision);
   currentInput={...input,expectedRevision:summary.structuredContent.data.revision};
   first=await call(legacy,prepare,currentInput);assert.equal(first.structuredContent.code,'prepared');
   for(const flag of ['executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(first.structuredContent[flag],false);
   assert.equal(JSON.stringify(first).includes(sessionToken.token.access_token),false);
   assert.deepEqual(await capsules(),{intents:1,capsules:1,events:1});
  });
  await t.test('modern MCP uses the same issued token and primary result without another preparation',async()=>{
   modern=await connect(sessionToken.token,{pin:'2026-07-28'});
   const found=await call(modern,reconcile,currentInput);assert.equal(found.structuredContent.code,'prepared');
   assert.deepEqual(found.structuredContent.preparation,first.structuredContent.preparation);
   assert.deepEqual(await capsules(),{intents:1,capsules:1,events:1});
  });
  await t.test('lost HTTP ACK uses one write POST and explicit reconciliation under the same real token',async()=>{
   const before=transmissions.filter(x=>x.rpc==='tools/call'&&x.tool===prepare).length,lost={...currentInput,idempotencyKey:'code-native-lost-0001'};
   loseMcpAck=true;await assert.rejects(call(legacy,prepare,lost),/CI MCP acknowledgment lost/);
   assert.equal(transmissions.filter(x=>x.rpc==='tools/call'&&x.tool===prepare).length-before,1);
   const found=await call(modern,reconcile,lost);assert.equal(found.structuredContent.code,'prepared');
   assert.equal(found.structuredContent.preparation.version,2);assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('current D1 withdrawal denies the next preparation read even while the SDK token remains valid',async()=>{
   await db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE exchanged_at<>'' AND revoked_at='' AND scopes_json LIKE '%capsule:prepare%'")
    .bind(new Date().toISOString()).run();
   for(const client of [legacy,modern]){
    const denied=await call(client,reconcile,currentInput);assert.equal(denied.structuredContent.code,'delegated_access_denied');
    assert.equal(denied.structuredContent.preparation,null);
   }
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('SDK token revocation withdraws its application grant and next HTTP request is unauthorized',async()=>{
   const fresh=await authorizeToken('read',[READ]);
   const revoked=await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({token:fresh.token.access_token,client_id:bootstrap.clientId})});
   assert.equal(revoked.status,200);
   const response=await dispatch(resource,{method:'POST',headers:{Authorization:'Bearer '+fresh.token.access_token,
    'Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:99,method:'tools/list',params:{}})});
   assert.equal(response.status,401);assert.match(response.headers.get('WWW-Authenticate'),/^Bearer/);
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('ephemeral profile offers no refresh or registration and malformed token is rejected',async()=>{
   const metadata=await (await dispatch('/.well-known/oauth-authorization-server')).json();
   assert.deepEqual(metadata.grant_types_supported,['authorization_code']);
   assert.equal((await dispatch('/oauth/register',{method:'POST'})).status,404);
   const refresh=await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'refresh_token',refresh_token:'ci-not-a-token',client_id:bootstrap.clientId,resource})});
   assert.equal(refresh.status,400);
   const invalid=await dispatch(resource,{method:'POST',headers:{Authorization:'Bearer ci-not-a-token','Content-Type':'application/json'},
    body:'{"jsonrpc":"2.0","id":7,"method":"tools/list"}'});assert.equal(invalid.status,401);
  });

  const mountStats=async()=>{const r=await dispatch('/__ci/mcp-stats');return r.json();};
  const releaseHold=async()=>{const r=await dispatch('/__ci/release-mcp-hold',{method:'POST'});return r.json();};
  await t.test('detached mount stays absent without opt-in and never evaluates disabled dependency getters',async()=>{
   const r=await dispatch('/__ci/mount-disabled');assert.equal(r.status,200);
   assert.deepEqual(await r.json(),{closed:true,touched:0});
  });
  for(const [label,mode]of [['legacy','legacy'],['modern',{pin:'2026-07-28'}]])
   await t.test(label+' real token authentication held past the original deadline cannot create a late MCP server',async()=>{
    const fresh=await authorizeToken(),client=await connect(fresh.token,mode),before=await mountStats();
    const transmissionsBefore=transmissions.filter(x=>x.rpc==='tools/list').length;
    mcpFault='held-auth';
    try{
     await assert.rejects(client.listTools());
     assert.equal(transmissions.at(-1).status,503);assert.equal(transmissions.filter(x=>x.rpc==='tools/list').length-transmissionsBefore,1);
     const stopped=await mountStats();assert.equal(stopped.authStarted,before.authStarted+1);
     assert.equal(stopped.authCompleted,before.authCompleted);assert.equal(stopped.created,before.created);
    }finally{mcpFault='';await releaseHold();}
    const after=await mountStats();assert.equal(after.authCompleted,before.authCompleted+1);
    assert.equal(after.created,before.created);assert.equal(after.connected,0);assert.equal(after.unknownState,0);
    assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
   });
  await t.test('legacy connect completing after timeout is closed again and never returns a tool response',async()=>{
   const fresh=await authorizeToken(),client=await connect(fresh.token),before=await mountStats();
   mcpFault='held-connect';
   try{
    await assert.rejects(client.listTools());assert.equal(transmissions.at(-1).status,503);
    const stopped=await mountStats();assert.equal(stopped.created,before.created+1);
    assert.equal(stopped.connectStarted,before.connectStarted+1);assert.equal(stopped.connectCompleted,before.connectCompleted);
   }finally{mcpFault='';await releaseHold();}
   const after=await mountStats();assert.equal(after.connectCompleted,before.connectCompleted+1);
   assert.equal(after.connected,0);assert.equal(after.unknownState,0);assert.ok(after.closed>before.closed);
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('configuration drift after actual token validation prevents any server creation',async()=>{
   const fresh=await authorizeToken(),client=await connect(fresh.token),before=await mountStats();
   mcpFault='config-changed';
   try{await assert.rejects(client.listTools());assert.equal(transmissions.at(-1).status,503);}
   finally{mcpFault='';await releaseHold();}
   const after=await mountStats();assert.equal(after.created,before.created);assert.equal(after.connected,0);
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('actual UTF8 ingress cap rejects an issued token request before any SDK validation',async()=>{
   const fresh=await authorizeToken(),before=await mountStats(),body='{"pad":"'+'á'.repeat(2048)+'"}';
   assert.ok(body.length<4096);assert.ok(new TextEncoder().encode(body).byteLength>4096);
   const response=await dispatch(resource,{method:'POST',headers:{Authorization:'Bearer '+fresh.token.access_token,'Content-Type':'application/json'},body});
   assert.equal(response.status,413);const after=await mountStats();
   assert.ok(Number.isSafeInteger(before.authStarted));assert.equal(after.authStarted,before.authStarted);assert.equal(after.created,before.created);
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
  await t.test('both real-token protocol clients retain primary schema admission at their explicit mount',async()=>{
   const fresh=await authorizeToken(),clientsByProtocol=[await connect(fresh.token),await connect(fresh.token,{pin:'2026-07-28'})];
   await db.prepare('DROP TRIGGER agent_capsule_preparations_no_delete').run();
   try{for(const client of clientsByProtocol){
    const result=await call(client,prepare,{...currentInput,idempotencyKey:'native-mount-absent-schema'});
    assert.equal(result.structuredContent.code,'unavailable');assert.equal(result.structuredContent.preparation,null);
   }}finally{await db.prepare(ddl.find(x=>x.includes('agent_capsule_preparations_no_delete'))).run();}
   assert.deepEqual(await capsules(),{intents:2,capsules:2,events:2});
  });
 }finally{await Promise.allSettled(clients.map(client=>client.close()));await runtime.dispose();}
});
