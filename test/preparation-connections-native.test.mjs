import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
let source;try{source=await readFile('lib/delegated-preparation-connections-http.mjs','utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
const issuer='https://example.invalid',resource=issuer+'/mcp',callback='https://client.example.invalid/callback',READ='afw:project:read',DRAFTS='afw:capsule:prepare';
async function nativeConnections(t,history=false){
 assert.match(source??'',/export function createDelegatedPreparationConnectionsHttpHost\(/,'missing finite preparation connections host');
 assert.match(await readFile('lib/delegated-preparation-consent-view.mjs','utf8'),/export function renderPreparationConnectionsView\(/,'missing preparation connections view');
 const keys=await generateKeyPair('RS256'),jwk=await exportJWK(keys.publicKey);
 async function identity(subject='owner-a',audience='ci-preparation-audience'){
  const stamp=Math.floor(Date.now()/1000);return new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'})
   .setIssuer('https://synthetic.cloudflareaccess.com').setAudience(audience).setSubject(subject).setIssuedAt(stamp).setExpirationTime(stamp+180).sign(keys.privateKey);
 }
 const jwt=await identity(),clients=[];
 const bundle=await build({entryPoints:['test/fixtures/preparation-connections-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(jwk),CI_CONNECTION_HISTORY:String(history)},
  kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-connections-ci-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean))await db.prepare(sql).run();
  for(const name of['agent-capsule-preparations','delegated-preparation-consents'])
   for(const sql of(await readFile('db/'+name+'.sql','utf8')).split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean))await db.prepare(sql).run();
  const past=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
   .bind('project-a','owner-a','owner@example.invalid','Private dossier title','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',past,past).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)")
   .bind('site-a','project-a','owner-a','example.org','https://example.org','verified',past,past).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
   .bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-token','verified',future,past,past).run();
  const dispatch=(path,init={})=>{const url=new URL(path,issuer);assert.equal(url.origin,issuer);return runtime.dispatchFetch(url,{...init,redirect:'manual'});};
  const boot=await(await dispatch('/__ci/bootstrap',{method:'POST'})).json(),context=await(await dispatch('/__ci/connections-context')).json();
  const mode=(value,target)=>dispatch('/__ci/connections-mode',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:value,target})});
  const stats=async()=>{const r=await dispatch('/__ci/connections-stats');return r.json();};
  const hash=async v=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v))).toString('hex');
  let seq=0;
  async function connection(decision='read'){
   const verifier='c'.repeat(64),challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url');
   const query=new URLSearchParams({response_type:'code',client_id:boot.clientId,redirect_uri:callback,resource,scope:READ+' '+DRAFTS,
    state:'connections-ci-'+(++seq),code_challenge:challenge,code_challenge_method:'S256',project:'project-a'});
   const begin=await dispatch('/authorize?'+query,{headers:{'Cf-Access-Jwt-Assertion':jwt}}),html=await begin.text();
   assert.equal(begin.status,200);const handle=/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1];assert.ok(handle);
   const cookie=begin.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');
   const approved=await dispatch('/authorize',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,Origin:issuer,Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({handle,decision})});assert.equal(approved.status,302);
   const grant=await db.prepare('SELECT g.* FROM delegated_access_grants g JOIN delegated_preparation_consents d ON d.grant_id=g.id WHERE d.handle_hash=?').bind(await hash(handle)).first();
   const tokenResponse=await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({
    grant_type:'authorization_code',client_id:boot.clientId,redirect_uri:callback,resource,code:new URL(approved.headers.get('Location')).searchParams.get('code'),code_verifier:verifier})});
   assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();
   const client=new Client({name:'afw-connections-ci',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});clients.push(client);
   const fetch=(url,init)=>{const headers=new Headers(init?.headers);headers.set('Authorization','Bearer '+token.access_token);headers.set('host','example.invalid');return dispatch(url,{...init,headers});};
   await client.connect(new StreamableHTTPClientTransport(new URL(resource),{fetch,redirectPolicy:'same-origin',onInsufficientScope:'throw',maxStepUpRetries:0,
    reconnectionOptions:{maxRetries:0,initialReconnectionDelay:1,maxReconnectionDelay:1,reconnectionDelayGrowFactor:1}}));
   return {grant,client,handle};
  }
  async function review(assertion=jwt){
   const response=await dispatch('/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}}),html=await response.text();
   return {response,html,handle:/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1],
    cookie:response.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ')};
  }
  const revoke=(v,id,{assertion=jwt,cookie=v.cookie,origin=issuer,extra={},handle=v.handle}={})=>dispatch('/connections/revoke',{method:'POST',
   headers:{'Cf-Access-Jwt-Assertion':assertion,Cookie:cookie,Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},
   body:new URLSearchParams({handle,grant:id,...extra})});
  const saved=id=>db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(id).first();
  assert.deepEqual(await(await dispatch('/__ci/connections-default')).json(),{closed:true,disabled:true,touched:0});
  if(history){
   const active=await connection(),original=await db.prepare('SELECT * FROM delegated_preparation_consents WHERE grant_id=?').bind(active.grant.id).first();
   // EXPLICIT synthetic historical metadata seed. This does not claim past OAuth/human consent.
   const p=context.profile,created=p.trialStartedAt+20,gid=crypto.randomUUID();
   const row={...original,handle_hash:'c'.repeat(64),request_hash:'d'.repeat(64),grant_id:gid,trial_started_at:p.trialStartedAt,trial_expires_at:p.trialExpiresAt,
    transaction_started_at:p.trialStartedAt+10,transaction_expires_at:p.trialExpiresAt,choice_at:created,expires_at:p.trialExpiresAt,choice_nonce:crypto.randomUUID(),
    grant_created_iso:new Date(created).toISOString(),grant_expires_iso:new Date(p.trialExpiresAt).toISOString(),state:'admitted',decision:'read'};
   const columns=Object.keys(row);assert.ok(columns.every(k=>/^[a-z_]+$/.test(k)));
   await db.prepare('INSERT INTO delegated_preparation_consents('+columns.join(',')+') VALUES('+columns.map(()=>'?').join(',')+')').bind(...columns.map(k=>row[k])).run();
   await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at) VALUES(?,?,?,?,?,?,?,?,?,?)")
    .bind(gid,'owner-a',p.clientId,p.projectId,p.resource,JSON.stringify([READ]),row.grant_created_iso,row.grant_expires_iso,'','').run();
   assert.ok(p.trialExpiresAt<Date.now());assert.ok(context.management.expiresAt>Date.now());
   const view=await review();assert.equal(view.response.status,200);assert.match(view.html,/Vencido/);assert.ok(view.html.includes(gid));assert.ok(!view.html.includes(active.grant.id));
   assert.equal((await revoke(view,gid)).status,303);assert.ok((await saved(gid)).revoked_at);assert.equal((await saved(active.grant.id)).revoked_at,'');
   assert.match((await review()).html,/Retirado/);return;
  }
  await t.test('real signed consent token and MCP access is denied after human connection withdrawal',async()=>{
   const a=await connection('drafts');assert.notEqual((await a.client.callTool({name:'read_project_summary',arguments:{}})).isError,true);
   const view=await review();assert.equal(view.response.status,200);assert.match(view.html,/Resumen y preparación de borradores/);
   assert.match(view.cookie,/__Host-afw-preparation-revoke=/);assert.ok(!view.html.includes('Private dossier title'));assert.ok(!view.html.includes('<assistant>'));
   const before=await stats(),response=await revoke(view,a.grant.id);assert.equal(response.status,303);assert.equal(response.headers.get('Location'),issuer+'/connections');
   assert.ok((await saved(a.grant.id)).revoked_at);assert.equal((await stats()).revocations,before.revocations+1);
   assert.equal((await a.client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
   const next=await review();assert.match(next.html,/Retirado/);const n=await stats();
   assert.equal((await revoke(next,a.grant.id)).status,303);assert.equal((await stats()).revocations,n.revocations);
  });
  await t.test('identity Origin cookie duplicate and unknown fields cannot withdraw',async()=>{
   const a=await connection(),view=await review(),n=await stats();
   for(const args of[{origin:'https://foreign.invalid'},{cookie:''},{assertion:await identity('owner-b')},{assertion:await identity('owner-a','wrong-audience')},{extra:{scope:DRAFTS}}]){
    assert.ok([400,401,403].includes((await revoke(view,a.grant.id,args)).status));
   }
   const body='handle='+encodeURIComponent(view.handle)+'&handle='+encodeURIComponent(view.handle)+'&grant='+a.grant.id;
   assert.equal((await dispatch('/connections/revoke',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,Origin:issuer,Cookie:view.cookie,'Content-Type':'application/x-www-form-urlencoded'},body})).status,400);
   assert.equal((await saved(a.grant.id)).revoked_at,'');assert.equal((await stats()).revocations,n.revocations);
   assert.ok(!(await review(await identity('owner-b'))).html.includes(a.grant.id));
  });
  await t.test('unknown nonce consume ACK never retries withdrawal or reports success',async()=>{
   const a=await connection(),view=await review(),n=await stats();await mode('unknown-consume');
   try{assert.equal((await revoke(view,a.grant.id)).status,503);}finally{await mode('');}
   assert.equal((await saved(a.grant.id)).revoked_at,'');assert.equal((await stats()).revocations,n.revocations);
   assert.equal((await revoke(view,a.grant.id)).status,403);assert.equal((await saved(a.grant.id)).revoked_at,'');
  });
  await t.test('unknown revoke ACK is recovered by a new primary GET and denies connected MCP',async()=>{
   const a=await connection(),view=await review(),n=await stats();await mode('unknown-revoke');
   try{assert.equal((await revoke(view,a.grant.id)).status,503);}finally{await mode('');}
   assert.ok((await saved(a.grant.id)).revoked_at);assert.equal((await stats()).revocations,n.revocations+1);
   assert.match((await review()).html,/Retirado/);
   assert.equal((await a.client.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
  });
  await t.test('held real SQL cannot revoke after the original deadline and the host later recovers',async()=>{
   const a=await connection(),view=await review(),n=await stats();await mode('held-revoke');
   try{assert.equal((await revoke(view,a.grant.id)).status,503);}finally{await mode('');assert.equal((await dispatch('/__ci/connections-release',{method:'POST'})).status,200);}
   assert.equal((await saved(a.grant.id)).revoked_at,'');assert.equal((await stats()).revocations,n.revocations);
   assert.equal((await revoke(await review(),a.grant.id)).status,303);assert.ok((await saved(a.grant.id)).revoked_at);
  });
  await t.test('original issuer flags can close and transfer cannot leak a new owner title or stop own withdrawal',async()=>{
   const a=await connection();await dispatch('/__ci/connections-old-flags',{method:'POST'});
   await db.prepare("UPDATE site_projects SET user_id='new-owner',organization='Private new owner title' WHERE id='project-a'").run();
   try{const view=await review();assert.equal(view.response.status,200);assert.ok(!view.html.includes('Private new owner title'));assert.equal((await revoke(view,a.grant.id)).status,303);}
   finally{await db.prepare("UPDATE site_projects SET user_id='owner-a',organization='Private dossier title' WHERE id='project-a'").run();}
   const b=await connection(),v=await review();await mode('target-drift',b.grant.id);
   try{assert.equal((await revoke(v,b.grant.id)).status,403);assert.equal((await saved(b.grant.id)).revoked_at,'');}
   finally{await mode('');await db.prepare('UPDATE delegated_access_grants SET client_id=? WHERE id=?').bind(boot.clientId,b.grant.id).run();}
  });
  await t.test('unconfirmed nonce creation returns no usable form or grant mutation',async()=>{
   const n=await stats();await mode('unknown-create');
   try{const v=await review();assert.equal(v.response.status,503);assert.equal(v.handle,undefined);}finally{await mode('');}
   assert.equal((await stats()).revocations,n.revocations);
  });
  await t.test('configuration drift is terminal after restoring options',async()=>{
   await mode('config-drift');assert.equal((await review()).response.status,503);await mode('');await dispatch('/__ci/connections-restore',{method:'POST'});
   assert.equal((await review()).response.status,503);
  });
 }finally{await Promise.allSettled(clients.map(c=>c.close()));await runtime.dispose();}
}
test('finite authenticated preparation connection withdrawal uses native primary authority',{timeout:120000},t=>nativeConnections(t));
test('separate management purpose can withdraw original expired historical permission without renewal',{timeout:30000},t=>nativeConnections(t,true));
