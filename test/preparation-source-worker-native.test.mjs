import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';

const origin='https://preparation-canary.agentfriendlyweb.dev';
test('actual preparation Worker selects the independent closed source entry',{timeout:120000},async t=>{
 let source;try{source=await readFile('worker/mcp-preparation/index.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source?.includes('AFW_PREPARATION_SOURCE_INTAKE_ENABLED'),'missing independent source route in preparation Worker');
 const pair=await generateKeyPair('RS256'),jwk=await exportJWK(pair.publicKey);
 const assertion=async({subject='owner-a',aud='ci-source-aud',iss='https://synthetic.cloudflareaccess.com',exp=Math.floor(Date.now()/1000)+180}={})=>{
  let jwt=new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'}).setIssuer(iss).setAudience(aud).setSubject(subject);
  if(exp!==null)jwt=jwt.setExpirationTime(exp);return jwt.sign(pair.privateKey);
 };
 const good=await assertion(),bundle=await build({entryPoints:['test/fixtures/preparation-source-worker-native.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(jwk)}}));
 const dispatch=(path,init={})=>runtime.dispatchFetch(new URL(path,origin),{...init,redirect:'manual'});
 const get=(path='/source',token=good,headers={})=>dispatch(path,{headers:{'Cf-Access-Jwt-Assertion':token,...headers}});
 const stats=async()=>await(await dispatch('/__ci/stats')).json();
 const reset=()=>dispatch('/__ci/reset',{method:'POST'});
 try{
  await t.test('disabled factory and unsupported method cannot touch dependencies or a body',async()=>{
   assert.deepEqual(await(await dispatch('/__ci/default')).json(),{status:404,dependencyReads:0,bodyReads:0,clockReads:0});
   assert.equal((await dispatch('/source',{method:'POST',body:'not-read'})).status,405);
   assert.deepEqual(await stats(),{identity:0,limiter:0,body:0});
  });
  await t.test('source mode does not open OAuth, agent or unknown paths',async()=>{
   await reset();
   for(const path of ['/mcp','/authorize','/oauth/token','/connections','/admin'])
    assert.equal((await dispatch(path,{method:'POST',body:'must-not-be-read'})).status,404,path);
   assert.deepEqual(await stats(),{identity:0,limiter:0,body:0});
  });
  await t.test('original ingress lifetime includes source configuration decoding',async()=>{
   await reset();await dispatch('/__ci/slow-decode',{method:'POST'});
   assert.equal((await get()).status,503);assert.equal((await stats()).limiter,0);
   await reset();assert.equal((await get()).status,200);
  });
  await t.test('GET verifies a genuine assertion and creates no source, proof, permission or database dependency',async()=>{
   const r=await get(),html=await r.text();
   assert.equal(r.status,200);assert.match(html,/Te guío paso a paso/);
   assert.match(html,/no crea un expediente ni conecta a tu asistente/i);
   assert.match(html,/Comic Sans MS/);assert.match(html,/viewport/);
   assert.ok(!/<(?:script|form|img)\b/i.test(html));
   assert.match(r.headers.get('Content-Security-Policy'),/default-src 'none'/);
   assert.match(r.headers.get('Content-Security-Policy'),/form-action 'none'/);
   assert.match(r.headers.get('Cache-Control'),/no-store/);assert.equal(r.headers.get('Access-Control-Allow-Origin'),null);
   assert.ok(!html.includes(good)&&!html.includes('owner@example.invalid')&&!html.includes('owner-a'));
   const json=await(await get('/source/identity')).json();
   assert.equal(json.code,'source_session_verified');assert.equal(json.identity.subject,'owner-a');
   assert.ok(Number.isSafeInteger(json.identity.expiresAt));assert.equal(json.serverSubjectPinned,false);
   for(const key of ['sourceWritten','domainVerificationChecked','consentGranted','authorizationGranted','operationalReadiness','publicationAllowed','chargeAllowed','executionAllowed'])
    assert.equal(json[key],false,key);
   assert.equal(json.identity.email,undefined);assert.equal(json.identity.token,undefined);
  });
  await t.test('bad signature, issuer, audience, expiry and missing expiry are denied without details',async()=>{
   const bad=[good.slice(0,-8)+'abcdefgh',await assertion({iss:'https://foreign.cloudflareaccess.com'}),await assertion({aud:'foreign'}),
    await assertion({exp:Math.floor(Date.now()/1000)-1}),await assertion({exp:null}),''];
   for(const token of bad){
    const r=await get('/source/identity',token),text=await r.text();assert.equal(r.status,401);assert.ok(!text.includes(token)||!token);assert.ok(!text.includes('owner@example.invalid'));
   }
  });
  await t.test('explicit server subject pin rejects another signed identity',async()=>{
   await reset();await dispatch('/__ci/pin',{method:'POST'});
   const r=await get('/source/identity');assert.equal(r.status,200);assert.equal((await r.json()).serverSubjectPinned,true);
   assert.equal((await get('/source/identity',await assertion({subject:'other-owner'}))).status,403);
  });
  await t.test('unknown paths, query, hash, origin and methods never read identity/body',async()=>{
   await reset();
   for(const path of ['/source/other','/authorize','/source?owner=owner-a','/source/identity?subject=owner-a'])
    assert.ok([400,404].includes((await get(path)).status),path);
   assert.equal((await get('/__ci/request-fragment')).status,400); // Network strips fragments; inject only at trusted CI request boundary.
   assert.equal((await get('/source',good,{Origin:'https://foreign.invalid'})).status,403);
   assert.equal((await dispatch('/source/identity',{method:'PUT',body:'secret-not-read'})).status,405);
   assert.deepEqual(await stats(),{identity:0,limiter:0,body:0});
  });
  await t.test('rate limit and dependency failure preserve honest status without retries',async()=>{
   await reset();await dispatch('/__ci/limit-deny',{method:'POST'});
   assert.equal((await get()).status,429);assert.equal((await stats()).limiter,1);
   await reset();await dispatch('/__ci/limit-throw',{method:'POST'});
   assert.equal((await get()).status,503);assert.equal((await stats()).limiter,1);
   await reset();await dispatch('/__ci/identity-throw',{method:'POST'});
   assert.equal((await get()).status,503);assert.deepEqual(await stats(),{identity:1,limiter:0,body:0});
  });
  await t.test('original trial expiry renders paused and never renews on factory recreation',async()=>{
   await reset();await dispatch('/__ci/expire',{method:'POST'});
   const r=await get();assert.equal(r.status,410);assert.match(await r.text(),/Esta prueba está en pausa/);
   await dispatch('/__ci/recreate',{method:'POST'});assert.equal((await get()).status,410);
   assert.deepEqual(await stats(),{identity:0,limiter:0,body:0});
  });
  await t.test('configuration drift rejects the original request; a later restored request has its own lifetime',async()=>{
   await reset();await dispatch('/__ci/drift-identity',{method:'POST'});
   assert.equal((await get()).status,503);assert.equal((await stats()).limiter,0);
   await dispatch('/__ci/restore',{method:'POST'});assert.equal((await get()).status,200);
   await dispatch('/__ci/recreate',{method:'POST'});assert.equal((await get()).status,200);
  });
  await t.test('original ingress lease includes Access wait, does not start another five seconds',async()=>{
   await reset();await dispatch('/__ci/slow-identity',{method:'POST'});
   assert.equal((await get()).status,503);assert.equal((await stats()).limiter,0);
   await reset();assert.equal((await get()).status,200);
  });
  await t.test('signed expiration is rechecked after limiter wait before returning a session',async()=>{
   await reset();await dispatch('/__ci/expire-identity-at-limit',{method:'POST'});
   const short=await assertion({exp:Math.floor(Date.now()/1000)+3});
   assert.equal((await get('/source/identity',short)).status,401);
   await reset();assert.equal((await get('/source/identity')).status,200);
  });
 }finally{await runtime.dispose();}
});
