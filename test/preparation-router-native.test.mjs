import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {createCapsulePreparationHttpBoundary} from '../lib/delegated-capsule-preparation-http.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from '../lib/capsule-preparation-request-lease.mjs';
const issuer='https://example.invalid',resource=issuer+'/mcp',callback='https://client.example.invalid/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
for(const kind of ['closed','expired','forged'])test(kind+' borrowed ingress lease cannot invoke HTTP handler or reset its deadline',async()=>{
 let invoked=0,clock=0;
 const parent=kind==='forged'?{}:createCapsulePreparationRequestLease({now:()=>1000+clock,monotonic:()=>clock});
 if(kind==='closed')readCapsulePreparationRequestLease(parent).close();if(kind==='expired')clock=5000;
 const boundary=createCapsulePreparationHttpBoundary({enabled:true,issuer,handle:async()=>{invoked++;return Response.json({ok:true});}});
 const response=await boundary(new Request(resource,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}),{}, {},parent);
 assert.notEqual(response.status,200,'supplied original lifetime must fail closed rather than mint another5s');
 assert.equal(invoked,0);
});
test('a successful HTTP borrower leaves the parent lifetime open for its owner',async()=>{
 const parent=createCapsulePreparationRequestLease(),control=readCapsulePreparationRequestLease(parent);
 try{
  const boundary=createCapsulePreparationHttpBoundary({enabled:true,issuer,handle:async()=>Response.json({ok:true})});
  const r=await boundary(new Request(resource,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}),{},{},parent);
  assert.equal(r.status,200);assert.ok(control.check().remaining>0);
 }finally{control.close();}
});
test('integrated preparation router preserves consent token preparation and independent withdrawal',{timeout:120000},async t=>{
 let source;try{source=await readFile('lib/delegated-preparation-router.mjs','utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
 assert.ok(source,'missing detached preparation router before native bundle');
 const keys=await generateKeyPair('RS256'),jwk=await exportJWK(keys.publicKey),clients=[];
 const jwt=async(subject='owner-a',audience='ci-preparation-audience')=>{
  const at=Math.floor(Date.now()/1000);return new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'})
   .setIssuer('https://synthetic.cloudflareaccess.com').setAudience(audience).setSubject(subject).setIssuedAt(at).setExpirationTime(at+180).sign(keys.privateKey);
 };
 const assertion=await jwt(),bundle=await build({entryPoints:['test/fixtures/preparation-router-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(jwk)},kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-router-ci-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  for(const name of ['agent-capsule-preparations','delegated-preparation-consents'])
   for(const sql of(await readFile('db/'+name+'.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
   .bind('project-a','owner-a','owner@example.invalid','Router private dossier','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)")
   .bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
   .bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-token','verified',future,at,at).run();
  const dispatch=(path,init={})=>{const url=new URL(path,issuer);assert.equal(url.origin,issuer);return runtime.dispatchFetch(url,{...init,redirect:'manual'});};
  const boot=await(await dispatch('/__ci/bootstrap')).json();
  const stats=async()=>{const r=await dispatch('/__ci/stats');return r.json();};
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM delegated_preparation_consents)AS consents,(SELECT count(*) FROM delegated_access_grants)AS grants,(SELECT count(*) FROM delegated_consent_sessions)AS nonces,(SELECT count(*) FROM publication_capsules)AS capsules,(SELECT count(*) FROM project_events)AS events").first();
  const hash=async value=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))).toString('hex');
  let seq=0;
  async function query(){
   const verifier='r'.repeat(64),challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url');
   return {verifier,url:'/authorize?'+new URLSearchParams({response_type:'code',client_id:boot.clientId,redirect_uri:callback,resource,
    scope:READ+' '+DRAFTS,state:'router-ci-'+(++seq),code_challenge:challenge,code_challenge_method:'S256',project:'project-a'})};
  }
  async function begin(){
   const q=await query(),response=await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}}),html=await response.text();
   assert.equal(response.status,200);return {...q,handle:/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1],
    cookie:response.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ')};
  }
  async function approve(decision='read'){
   const a=await begin();assert.ok(a.handle);
   const response=await dispatch('/authorize',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':assertion,Origin:issuer,Cookie:a.cookie,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({handle:a.handle,decision})});assert.equal(response.status,302);
   return {...a,code:new URL(response.headers.get('Location')).searchParams.get('code')};
  }
  const tokenInit=a=>({method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({
   grant_type:'authorization_code',client_id:boot.clientId,redirect_uri:callback,code:a.code,code_verifier:a.verifier,resource})});
  async function redeem(a){const r=await dispatch('/oauth/token',tokenInit(a));assert.equal(r.status,200);return r.json();}
  const saved=async a=>db.prepare('SELECT g.* FROM delegated_access_grants g JOIN delegated_preparation_consents d ON d.grant_id=g.id WHERE d.handle_hash=?').bind(await hash(a.handle)).first();
  async function connect(token){
   const c=new Client({name:'afw-router-ci',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});clients.push(c);
   const fetch=(url,init)=>{const h=new Headers(init?.headers);h.set('Authorization','Bearer '+token.access_token);h.set('host','example.invalid');return dispatch(url,{...init,headers:h});};
   await c.connect(new StreamableHTTPClientTransport(new URL(resource),{fetch,redirectPolicy:'same-origin',onInsufficientScope:'throw',maxStepUpRetries:0,
    reconnectionOptions:{maxRetries:0,initialReconnectionDelay:1,maxReconnectionDelay:1,reconnectionDelayGrowFactor:1}}));return c;
  }
  async function review(prefix=''){
   const response=await dispatch(prefix+'/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}}),html=await response.text();
   assert.equal(response.status,200);return {html,handle:/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1],
    cookie:response.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ')};
  }
  const withdraw=(v,id,prefix='')=>dispatch(prefix+'/connections/revoke',{method:'POST',headers:{
   'Cf-Access-Jwt-Assertion':assertion,Origin:issuer,Cookie:v.cookie,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:v.handle,grant:id})});
  assert.deepEqual(await(await dispatch('/__ci/default')).json(),{closed:true,disabled:true,touched:0});
  await t.test('fixed unknown paths refresh bad identity and body do not create authority',async()=>{
   const before=await counts(),calls=await stats();
   for(const path of ['/.well-known/oauth-authorization-server','/.well-known/oauth-protected-resource','/oauth/register','/oauth/revoke','/other'])
    assert.equal((await dispatch(path)).status,404);
   assert.equal((await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token'})).status,400);
   const q=await query();assert.equal((await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':await jwt('owner-a','wrong')}})).status,401);
   assert.equal((await dispatch('/mcp',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"large":"'+('x'.repeat(4096))+'"}'})).status,413);
   assert.equal((await dispatch('/mcp',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://foreign.invalid'},body:'{}'})).status,403);
   assert.deepEqual(await counts(),before);assert.equal((await stats()).tokenCalls,calls.tokenCalls);
  });
  let read,readToken;
  await t.test('same actual AS turns explicit read consent and PKCE into read-only MCP',async()=>{
   read=await approve();readToken=await redeem(read);assert.equal(readToken.scope,READ);assert.equal(readToken.refresh_token,undefined);
   const c=await connect(readToken);assert.ok(!(await c.listTools()).tools.some(x=>x.name==='prepare_capsule_draft'));
   assert.notEqual((await c.callTool({name:'read_project_summary',arguments:{}})).isError,true);
  });
  await t.test('all four real source ports reject a closed parent without body auth or state changes',async()=>{
   const a=await approve(),q=await query(),before=await counts(),calls=await stats();
   assert.equal((await dispatch('/__ci/probe'+q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   assert.equal((await dispatch('/__ci/probe/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   assert.equal((await dispatch('/__ci/probe/oauth/token',tokenInit(a))).status,503);
   assert.equal((await dispatch('/__ci/probe/mcp',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+readToken.access_token},
    body:'{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'})).status,408);
   assert.deepEqual(await counts(),before);assert.deepEqual(await stats(),calls);
   assert.equal((await saved(a)).exchanged_at,'');assert.equal((await redeem(a)).scope,READ);
  });
  await t.test('drafts prepare once reconcile same result and human withdrawal denies connected MCP',async()=>{
   const a=await approve('drafts'),token=await redeem(a),c=await connect(token),before=await counts();
   const revision=(await db.prepare("SELECT revision FROM site_projects WHERE id='project-a'").first()).revision;
   const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:revision,idempotencyKey:'router-native-preparation-0001'};
   const prepared=(await c.callTool({name:'prepare_capsule_draft',arguments:input})).structuredContent;
   assert.equal(prepared.code,'prepared');assert.equal(prepared.publicationAllowed,false);
   const reconciled=(await c.callTool({name:'reconcile_capsule_preparation',arguments:input})).structuredContent;
   assert.equal(reconciled.code,'prepared');assert.equal(reconciled.preparation.capsuleRef,prepared.preparation.capsuleRef);
   assert.equal((await counts()).capsules,before.capsules+1);
   const g=await saved(a),v=await review();assert.ok(v.html.includes(g.id));assert.ok(!v.html.includes('Router private dossier'));
   assert.equal((await withdraw(v,g.id)).status,303);assert.ok((await saved(a)).revoked_at);
   assert.equal((await c.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
   assert.equal((await counts()).capsules,before.capsules+1);
  });
  await t.test('held genuine Access work cannot write after original ingress expiry and a fresh request recovers',async()=>{
   const q=await query(),before=await counts();await dispatch('/__ci/access-hold',{method:'POST'});
   try{assert.equal((await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);}
   finally{await dispatch('/__ci/release',{method:'POST'});}
   assert.deepEqual(await counts(),before);await begin();
  });
  await t.test('a router constructed after original expiry retains only own historical withdrawal',async()=>{
   const original=await db.prepare('SELECT * FROM delegated_preparation_consents WHERE grant_id=?').bind((await saved(read)).id).first();
   const p=(await(await dispatch('/__ci/history-config')).json()).profile,gid=crypto.randomUUID(),created=p.trialStartedAt+20;
   // Explicit synthetic historical seed. It does NOT claim past OAuth or elapsed production consent.
   const row={...original,handle_hash:'e'.repeat(64),request_hash:'f'.repeat(64),grant_id:gid,trial_started_at:p.trialStartedAt,trial_expires_at:p.trialExpiresAt,
    transaction_started_at:p.trialStartedAt+10,transaction_expires_at:p.trialExpiresAt,choice_at:created,expires_at:p.trialExpiresAt,choice_nonce:crypto.randomUUID(),
    grant_created_iso:new Date(created).toISOString(),grant_expires_iso:new Date(p.trialExpiresAt).toISOString(),state:'admitted',decision:'read'};
   const cols=Object.keys(row);assert.ok(cols.every(k=>/^[a-z_]+$/.test(k)));
   await db.prepare('INSERT INTO delegated_preparation_consents('+cols.join(',')+')VALUES('+cols.map(()=>'?').join(',')+')').bind(...cols.map(k=>row[k])).run();
   await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at)VALUES(?,?,?,?,?,?,?,?,?,?)")
    .bind(gid,'owner-a',p.clientId,p.projectId,p.resource,JSON.stringify([READ]),row.grant_created_iso,row.grant_expires_iso,'','').run();
   const v=await review('/__ci/history');assert.match(v.html,/Vencido/);assert.ok(v.html.includes(gid));assert.ok(!v.html.includes((await saved(read)).id));
   assert.equal((await withdraw(v,gid,'/__ci/history')).status,303);
   assert.equal((await dispatch('/__ci/history/oauth/token',tokenInit(read))).status,503);
  });
  await t.test('initial issuance closure cannot dynamically activate and later closure keeps human withdrawal',async()=>{
   const q=await query();assert.equal((await dispatch('/__ci/initial-closed'+q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   await review('/__ci/initial-closed');
   await dispatch('/__ci/close-issuance',{method:'POST'});
   assert.equal((await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   const v=await review();assert.equal((await withdraw(v,(await saved(read)).id)).status,303);
   await dispatch('/__ci/restore-issuance',{method:'POST'});
   assert.equal((await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
  });
  await t.test('root configuration closure is terminal across both purposes',async()=>{
   const before=await counts();await dispatch('/__ci/root-drift',{method:'POST'});
   assert.equal((await dispatch('/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   await dispatch('/__ci/root-restore',{method:'POST'});
   assert.equal((await dispatch('/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);assert.deepEqual(await counts(),before);
  });
 }finally{await Promise.allSettled(clients.map(c=>c.close()));await runtime.dispose();}
});
