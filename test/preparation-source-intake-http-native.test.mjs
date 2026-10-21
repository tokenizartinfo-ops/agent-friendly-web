import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {readPreparationSchemaPackage} from '../scripts/preparation-schema-package.mjs';
const issuer='https://preparation-canary.agentfriendlyweb.dev',website='https://agentfriendlyweb.dev';

test('private own-source form requires real identity and explicit intent; uncertain status inspection never writes',{timeout:120000},async t=>{
 let source;try{source=await readFile('lib/preparation-source-intake-http.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source?.includes('export function createPreparationSourceIntakeHttpHost'),'missing private source intake HTTP host');
 const pair=await generateKeyPair('RS256'),jwk=await exportJWK(pair.publicKey);
 const jwt=async({subject='owner-a',aud='ci-intake-aud',session='first',exp=Math.floor(Date.now()/1000)+180}={})=>{
  let value=new SignJWT({email:'owner@example.invalid',session}).setProtectedHeader({alg:'RS256',kid:'ci-only'}).setIssuer('https://synthetic.cloudflareaccess.com').setAudience(aud).setSubject(subject);
  if(exp!==null)value=value.setExpirationTime(exp);return value.sign(pair.privateKey);
 };
 const good=await jwt(),bundle=await build({entryPoints:['test/fixtures/preparation-source-intake-http-native.mjs'],bundle:true,format:'esm',
  platform:'neutral',mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(jwk)},d1Databases:{DB:'own-intake-http-ci-only'}}));
 try{
  const db=await runtime.getD1Database('DB');for(const row of (await readPreparationSchemaPackage()).statements)await db.prepare(row.sql).run();
  const dispatch=(path,init={})=>runtime.dispatchFetch(new URL(path,issuer),{...init,redirect:'manual'});
  const reset=()=>dispatch('/__ci/reset',{method:'POST'});
  const mode=value=>dispatch('/__ci/mode/'+value,{method:'POST'});
  const stats=async()=>await(await dispatch('/__ci/stats')).json();
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM site_projects)AS projects,(SELECT count(*) FROM project_events)AS events,(SELECT count(*) FROM domain_claims)AS claims,(SELECT count(*) FROM registry_sites)AS sites,(SELECT count(*) FROM delegated_access_grants)AS grants,(SELECT count(*) FROM publication_capsules)AS capsules").first();
  const snapshot=async()=>JSON.stringify({projects:(await db.prepare('SELECT * FROM site_projects ORDER BY id').all()).results,events:(await db.prepare('SELECT * FROM project_events ORDER BY id').all()).results});
  const code=html=>/data-result-code="([a-z_]+)"/.exec(html)?.[1];
  async function form(token=good){
   const r=await dispatch('/source/new',{headers:{'Cf-Access-Jwt-Assertion':token}}),html=await r.text();assert.equal(r.status,200);
   const csrf=/name="csrf" value="([a-f0-9]{64}\.[a-f0-9]{64})"/.exec(html)?.[1];
   assert.ok(csrf);const cookies=r.headers.getSetCookie();assert.equal(cookies.length,1);
   const cookie=cookies[0].split(';')[0];assert.match(cookie,/^__Host-AFWSourceCSRF=/);
   for(const flag of ['Secure','HttpOnly','SameSite=Strict','Path=/'])assert.ok(cookies[0].includes(flag),flag);
   assert.ok(!cookies[0].includes('Domain='));
   return {csrf,cookie,html,token};
  }
  function post(f,{decision='save',confirm=true,token=f.token,fields={},headers={},path='/source/new',body}={}){
   const p=new URLSearchParams({csrf:f.csrf,website,organization:'Agent Friendly Web',decision});
   if(confirm)p.set('confirmCreate','yes');
   for(const [k,v]of Object.entries(fields)){if(v===null)p.delete(k);else p.set(k,v);}
   return dispatch(path,{method:'POST',headers:{Origin:issuer,'Sec-Fetch-Site':'same-origin','Content-Type':'application/x-www-form-urlencoded',
    'Cf-Access-Jwt-Assertion':token,Cookie:f.cookie,...headers},body:body??p});
  }
  const noAuthority=async()=>{const c=await counts();for(const k of ['claims','sites','grants','capsules'])assert.equal(c[k],0,k);};

  await t.test('default-off consumes no dependency, clock, body or identity',async()=>{
   assert.deepEqual(await(await dispatch('/__ci/default')).json(),{status:404,dependencies:0,clocks:0,body:0});
  });
  await t.test('opening the real form reads no DB and shows an unchecked reviewable proposal',async()=>{
   await reset();const before=await counts(),f=await form(),s=await stats();
   assert.deepEqual(await counts(),before);assert.equal(s.dbReads,0);assert.equal(s.sessions,0);assert.equal(s.batches,0);
   assert.match(f.html,/Revisá estos datos/);assert.match(f.html,/consultar.*no.*guarda/i);
   assert.ok(!/name="confirmCreate"[^>]*\bchecked\b/.test(f.html));assert.ok(!/<script\b/i.test(f.html));
   assert.ok(!f.html.includes(good)&&!f.html.includes('owner@example.invalid'));await noAuthority();
  });
  await t.test('saving without explicit confirmation is rejected before DB; inspect without it remains read-only',async()=>{
   await reset();const f=await form(),before=await snapshot();
   assert.equal((await post(f,{confirm:false})).status,400);assert.equal((await stats()).dbReads,0);
   await mode('inspect-forbid-batch');const r=await post(f,{confirm:false,decision:'inspect'});
   assert.equal(r.status,200);assert.equal(code(await r.text()),'source_not_recorded');
   assert.equal((await stats()).batchReads,0);assert.equal(await snapshot(),before);
  });
  await t.test('one confirmed source and receipt are atomically saved; exact replay performs no second batch',async()=>{
   await reset();const f=await form(),before=await counts(),r=await post(f),html=await r.text();
   assert.equal(r.status,200);assert.equal(code(html),'source_created');assert.match(html,/Todavía falta comprobar el dominio/);
   const id=/data-project-ref="(project-[a-f0-9]{64})"/.exec(html)?.[1];assert.ok(id);
   const row=await db.prepare('SELECT user_id,owner_email,website,organization,revision,status FROM site_projects WHERE id=?').bind(id).first();
   assert.deepEqual(row,{user_id:'owner-a',owner_email:'owner@example.invalid',website:new URL(website).href,organization:'Agent Friendly Web',revision:1,status:'draft'});
   assert.equal((await counts()).projects,before.projects+1);assert.equal((await counts()).events,before.events+1);
   assert.equal((await stats()).batches,1);const same=await snapshot();
   assert.equal(code(await(await post(f)).text()),'source_already_recorded');assert.equal((await stats()).batches,1);
   await mode('inspect-forbid-batch');assert.equal(code(await(await post(f,{decision:'inspect',confirm:false})).text()),'source_already_recorded');
   assert.equal(await snapshot(),same);await noAuthority();
  });
  await t.test('lost ACK after real commit yields honest503; later inspect confirms it without a write',async()=>{
   await reset();const f=await form();await mode('lose-ack');
   const r=await post(f),html=await r.text();assert.equal(r.status,503);assert.equal(code(html),'unknown_ack');
   assert.match(html,/pudo haberse completado/);assert.ok(!html.includes(f.csrf)&&!html.includes('private-runtime-detail')&&!html.includes(good));
   const saved=await snapshot(),batches=(await stats()).batches;await mode('inspect-forbid-batch');
   assert.equal(code(await(await post(f,{decision:'inspect',confirm:false})).text()),'source_already_recorded');
   assert.equal((await stats()).batches,batches);assert.equal(await snapshot(),saved);
  });
  await t.test('uncertain failed dispatch stays absent when inspected; no implicit retry',async()=>{
   await reset();const f=await form(),before=await snapshot();await mode('fail-batch-before');
   assert.equal(code(await(await post(f)).text()),'unknown_ack');await mode('inspect-forbid-batch');
   assert.equal(code(await(await post(f,{decision:'inspect',confirm:false})).text()),'source_not_recorded');
   assert.equal(await snapshot(),before);assert.equal((await stats()).batches,1);
  });
  await t.test('changed original data conflicts without overwriting legitimate history',async()=>{
   await reset();const f=await form(),first=await post(f),html=await first.text(),id=/data-project-ref="([^"]+)"/.exec(html)[1];
   await db.prepare('UPDATE site_projects SET revision=2,organization=? WHERE id=?').bind('Legitimate update',id).run();
   const before=await snapshot();await mode('inspect-forbid-batch');
   const r=await post(f,{decision:'inspect',confirm:false});assert.equal(r.status,409);assert.equal(code(await r.text()),'source_conflict');
   assert.equal(await snapshot(),before);
  });
  await t.test('cross-origin and same-site POST cannot read identity/body or DB',async()=>{
   await reset();const f=await form(),prior=await stats(),before=await snapshot();
   assert.equal((await post(f,{headers:{Origin:'https://foreign.invalid'}})).status,403);
   assert.equal((await post(f,{headers:{'Sec-Fetch-Site':'same-site'}})).status,403);
   assert.equal((await stats()).body,prior.body);assert.equal((await stats()).identities,prior.identities);
   assert.equal((await stats()).dbReads,0);assert.equal(await snapshot(),before);
  });
  await t.test('missing, duplicated or forged cookie/token and same-subject foreign session fail before DB',async()=>{
   await reset();const f=await form(),before=await snapshot();
   const forged='b'.repeat(64)+'.'+'c'.repeat(64);
   for(const options of [
    {headers:{Cookie:''}},{headers:{Cookie:f.cookie+'; '+f.cookie}},{fields:{csrf:null}},
    {fields:{csrf:forged},headers:{Cookie:'__Host-AFWSourceCSRF='+forged}},
    {token:await jwt({session:'second'})},
   ]){
    const r=await post(f,options),body=await r.text();assert.equal(r.status,403);assert.ok(!body.includes(f.csrf)&&!body.includes(forged));
   }
   assert.equal((await stats()).dbReads,0);assert.equal(await snapshot(),before);
   const old=f;await reset();assert.equal((await post(old)).status,403);
  });
  await t.test('real signed foreign subject/audience, no expiry and expired tokens cannot open a form',async()=>{
   await reset();
   for(const [token,status]of [[await jwt({subject:'other-owner'}),403],[await jwt({aud:'other-aud'}),401],
    [await jwt({exp:null}),401],[await jwt({exp:Math.floor(Date.now()/1000)-1}),401]]){
    const r=await dispatch('/source/new',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.equal(r.status,status);
   }
   assert.equal((await stats()).dbReads,0);
  });
  await t.test('unknown fields/owner, duplicate fields, foreign website and malformed MIME fail before DB',async()=>{
   await reset();const f=await form(),before=await snapshot();
   for(const options of [{fields:{owner:'attacker'}},{fields:{website:'https://foreign.invalid'}},{fields:{organization:''}},
    {body:new URLSearchParams({csrf:f.csrf,website,organization:'Agent Friendly Web',decision:'save',confirmCreate:'yes'}).toString()+'&decision=inspect'}])
    assert.equal((await post(f,options)).status,400);
   assert.equal((await post(f,{headers:{'Content-Type':'application/json'}})).status,415);
   assert.equal((await post(f,{body:'a'.repeat(5000)})).status,413);
   assert.equal((await stats()).dbReads,0);assert.equal(await snapshot(),before);
  });
  await t.test('method and path admission does not consume identity or body',async()=>{
   await reset();const f=await form(),prior=await stats();
   assert.equal((await dispatch('/source/new',{method:'PUT',body:'private'})).status,405);
   assert.equal((await post(f,{path:'/source/new?owner=attacker'})).status,400);
   assert.equal((await post(f,{path:'/other'})).status,404);
   assert.equal((await stats()).body,prior.body);assert.equal((await stats()).identities,prior.identities);
  });
  await t.test('rate denial and configuration drift are terminal for the request without persistence',async()=>{
   await reset();const f=await form(),before=await snapshot();await mode('limit-deny');
   assert.equal((await post(f)).status,429);assert.equal((await stats()).dbReads,0);
   await reset();await mode('drift-identity');assert.equal((await dispatch('/source/new',{headers:{'Cf-Access-Jwt-Assertion':good}})).status,503);
   assert.equal((await stats()).dbReads,0);assert.equal(await snapshot(),before);
  });
  await t.test('signed expiry and original trial are rechecked after awaits and never renewed',async()=>{
   await reset();const short=await jwt({exp:Math.floor(Date.now()/1000)+3}),f=await form(short);await mode('expire-at-limit');
   assert.equal((await post(f)).status,401);assert.equal((await stats()).dbReads,0);
   await reset();const regular=await form();await mode('expire-profile');
   assert.equal((await post(regular)).status,410);assert.equal((await stats()).dbReads,0);
  });
  await t.test('original request lease includes slow body and abort; no late DB work',async()=>{
   await reset();const f=await form(),before=await snapshot();
   assert.equal((await post(f,{path:'/__ci/slow-body'})).status,503);assert.equal((await stats()).dbReads,0);
   await reset();await mode('abort-identity');
   assert.equal((await dispatch('/__ci/abort',{headers:{'Cf-Access-Jwt-Assertion':good}})).status,503);
   await new Promise(resolve=>setTimeout(resolve,350));assert.equal((await stats()).dbReads,0);assert.equal(await snapshot(),before);
   await reset();assert.equal((await form()).html.includes('Revisá estos datos'),true);
  });
  await noAuthority();
 }finally{await runtime.dispose();}
});
