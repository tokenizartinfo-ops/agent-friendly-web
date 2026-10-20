import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {readPreparationSchemaPackage} from '../scripts/preparation-schema-package.mjs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {consumeCapsulePreparation} from '../examples/agent-consumer/preparation-client.mjs';
const issuer='https://example.invalid',resource=issuer+'/mcp',callback='https://client.example.invalid/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
test('production preparation Worker preserves original configuration and durable own withdrawal',{timeout:120000},async t=>{
 let source;try{source=await readFile('worker/mcp-preparation/index.mjs','utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
 assert.ok(source,'missing preparation Worker source before native bundle');
 const keys=await generateKeyPair('RS256'),jwk=await exportJWK(keys.publicKey),clients=[];
 const jwt=async(subject='owner-a',audience='ci-preparation-audience')=>{
  const at=Math.floor(Date.now()/1000);return new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'})
   .setIssuer('https://synthetic.cloudflareaccess.com').setAudience(audience).setSubject(subject).setIssuedAt(at).setExpirationTime(at+180).sign(keys.privateKey);
 };
 const assertion=await jwt(),bundle=await build({entryPoints:['test/fixtures/preparation-worker-native.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(jwk)},kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-worker-ci-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  const schema=await readPreparationSchemaPackage();
  for(const row of schema.statements)await db.prepare(row.sql).run();
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
  assert.deepEqual(await(await dispatch('/__ci/default')).json(),{status:404,cache:'no-store',dependencyReads:0,bodyReads:0,clockReads:0});
  await t.test('missing malformed and mismatched server configuration cannot create authority',async()=>{
   const q=await query(),before=await counts();
   for(const mode of ['missing-start','offset-start','bad-management','wrong-resource','unknown-locale']){
    const r=await dispatch('/__ci/variant/'+mode+q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}});
    assert.equal(r.status,503,mode);assert.equal(r.headers.get('Cache-Control'),'no-store');
   }
   assert.deepEqual(await counts(),before);
  });
  await t.test('unknown discovery registration refresh and foreign Origin stay denied',async()=>{
   const before=await counts();
   for(const path of ['/.well-known/oauth-authorization-server','/.well-known/oauth-protected-resource','/oauth/register','/admin','/other'])
    assert.equal((await dispatch(path)).status,404);
   assert.equal((await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token'})).status,400);
   assert.equal((await dispatch('/mcp',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://foreign.invalid'},body:'{}'})).status,403);
   assert.deepEqual(await counts(),before);
  });
  let read,readToken,readClient;
  await t.test('fresh request hosts exchange original explicit read consent through actual SDK KV and D1',async()=>{
   read=await approve();readToken=await redeem(read);assert.equal(readToken.scope,READ);assert.equal(readToken.refresh_token,undefined);
   const grant=await saved(read);assert.equal(grant.expires_at,new Date(boot.profile.trialExpiresAt).toISOString());
   assert.equal(Date.parse(grant.expires_at)-boot.profile.trialStartedAt,180000);
   readClient=await connect(readToken);assert.ok(!(await readClient.listTools()).tools.some(x=>x.name==='prepare_capsule_draft'));
   assert.notEqual((await readClient.callTool({name:'read_project_summary',arguments:{}})).isError,true);
   await dispatch('/__ci/recreate',{method:'POST'});
   assert.equal((await saved(read)).expires_at,grant.expires_at);
   assert.notEqual((await readClient.callTool({name:'read_project_summary',arguments:{}})).isError,true);
  });
  await t.test('draft preparation reconciles once and native withdrawal survives source factory recreation',async()=>{
   const a=await approve('drafts'),token=await redeem(a),c=await connect(token),before=await counts();
   const revision=(await db.prepare("SELECT revision FROM site_projects WHERE id='project-a'").first()).revision;
   const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:revision,idempotencyKey:'worker-native-preparation-0001'};
   const prepared=(await c.callTool({name:'prepare_capsule_draft',arguments:input})).structuredContent;
   assert.equal(prepared.code,'prepared');assert.equal(prepared.publicationAllowed,false);
   const interpreted=consumeCapsulePreparation(prepared,{method:'prepare',request:input});assert.equal(interpreted.status,'draft_ready');assert.equal(interpreted.preparation.capsuleRef,prepared.preparation.capsuleRef);
   const recovered=(await c.callTool({name:'reconcile_capsule_preparation',arguments:input})).structuredContent;
   assert.equal(recovered.preparation.capsuleRef,prepared.preparation.capsuleRef);assert.equal((await counts()).capsules,before.capsules+1);
   assert.equal(consumeCapsulePreparation(recovered,{method:'reconcile',request:input}).status,'draft_ready');
   const v=await review();assert.equal((await withdraw(v,(await saved(a)).id)).status,303);
   await dispatch('/__ci/recreate',{method:'POST'});
   assert.equal((await c.callTool({name:'read_project_summary',arguments:{}})).structuredContent.code,'delegated_access_denied');
   assert.equal((await counts()).capsules,before.capsules+1);
  });
  await t.test('short management remains human-only and explicit expired profile keeps own management',async()=>{
   const a=await approve(),q=await query(),before=await counts(),prefix='/__ci/variant/short-management';
   assert.equal((await dispatch(prefix+q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);
   assert.deepEqual(await counts(),before);
   const v=await review(prefix);assert.equal((await withdraw(v,(await saved(a)).id,prefix)).status,303);
   await review('/__ci/variant/expired-profile');
   assert.equal((await dispatch('/__ci/variant/expired-profile/oauth/token',tokenInit(read))).status,503);
  });
  await t.test('observed scalar configuration drift during genuine identity work prevents late state',async()=>{
   const before=await counts(),prior=await stats();await dispatch('/__ci/hold',{method:'POST'});
   const pending=dispatch('/connections',{headers:{'Cf-Access-Jwt-Assertion':assertion}});
   try{
    const until=Date.now()+2000;let seen=false;
    while(Date.now()<until){if((await stats()).accessStarted>prior.accessStarted){seen=true;break;}await new Promise(resolve=>setTimeout(resolve,10));}
    assert.equal(seen,true);await dispatch('/__ci/drift',{method:'POST'});
   }finally{await dispatch('/__ci/release',{method:'POST'});}
   assert.equal((await pending).status,503);assert.deepEqual(await counts(),before);
   await dispatch('/__ci/restore',{method:'POST'});await review();
  });
  await t.test('original ingress expiry includes genuine identity wait and never starts another five seconds',async()=>{
   const q=await query(),before=await counts();await dispatch('/__ci/hold',{method:'POST'});
   try{assert.equal((await dispatch(q.url,{headers:{'Cf-Access-Jwt-Assertion':assertion}})).status,503);}
   finally{await dispatch('/__ci/release',{method:'POST'});}
   assert.deepEqual(await counts(),before);await begin();
  });
 }finally{await Promise.allSettled(clients.map(c=>c.close()));await runtime.dispose();}
});
