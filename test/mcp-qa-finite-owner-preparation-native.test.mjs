import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
const origin='https://delegated-canary.agentfriendlyweb.dev';
async function native(t,mode='normal'){
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'finite-source-native',alg:'RS256'};
 const bundle=await build({entryPoints:['test/fixtures/finite-owner-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-fixed-source',setup(b){b.onResolve({filter:/mcp-qa-finite-owner-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-owner-source.mjs'}));}}]});
 let jwksReads=0;
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:'FiniteOwnerFixture',useSQLite:true,uniqueKey:'finite-owner-task2'}},d1Databases:{DB:'qa-private',...(mode==='missing'?{}:{RELEASE_DB:mode==='wrong'?'qa-private':'release-primary'})},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},outboundService:async request=>{
  assert.equal(request.url,'https://finite-fixture.cloudflareaccess.com/cdn-cgi/access/certs');jwksReads++;
  return Response.json({keys:[jwk]});
 }}));
 t.after(()=>runtime.dispose());
 const db=await runtime.getD1Database(mode==='missing'?'DB':'RELEASE_DB');
 await db.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT); CREATE TABLE copilot_working_drafts(project_id TEXT,user_id TEXT,session_json TEXT);");
 await db.prepare("INSERT INTO site_projects VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('synthetic-owned','owner','Proyecto sintético','https://example.invalid','owner','content','none','users','[\"discovery\"]','[\"es\"]','draft',10,1,new Date().toISOString(),'','','[]').run();
 for(const name of readdirSync('drizzle').filter(x=>/^001[12]_.*\.sql$/.test(x)).sort()){
  const statements=readFileSync('drizzle/'+name,'utf8').split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);
  for(const sql of statements)await db.prepare(sql).run();
 }
 for(const path of ['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql']){
  const sqls=[...readFileSync(path,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]);
  for(const sql of sqls)await db.prepare(sql).run();
 }
 const jwt=(subject='owner',aud='finite-owner')=>new SignJWT({email:'fixture@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer('https://finite-fixture.cloudflareaccess.com').setAudience(aud).setIssuedAt().setExpirationTime('30m').sign(privateKey);
 const token=await jwt();
 const call=(path,options={})=>runtime.dispatchFetch(origin+path,{...options,headers:{'Cf-Access-Jwt-Assertion':token,...options.headers}});
 const json=(path,value)=>call(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value)}).then(r=>r.json());
 assert.equal((await call('/fixture/init')).status,200);
 const screen=async()=>{const r=await call('/connections/finite-prepare'),html=await r.text();assert.equal(r.status,200);return {html,handle:html.match(/name="handle" value="([^"]+)"/)?.[1],projectRef:html.match(/name="projectRef" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie')?.split(';')[0]};};
 const submit=(s,extra={})=>call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:s.cookie,...extra.headers},body:new URLSearchParams({handle:s.handle,projectRef:s.projectRef,decision:'approve',...extra.fields})});
 return {call,json,screen,submit,jwt,token,db,jwksReads:()=>jwksReads};
}
test('initial owned synthetic selection needs no OAuth grant and uses release primary',async t=>{
 const f=await native(t),s=await f.screen();
 assert.match(s.html,/discovery/);assert.match(s.html,/configuración/i);assert.doesNotMatch(s.html,/synthetic-owned|synthetic-client/);
 assert.match(s.handle,/^[a-f0-9]{64}$/);assert.match(s.projectRef,/^[a-f0-9]{64}$/);
 assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM delegated_access_grants').first()).n,0);
 assert.ok(f.jwksReads()>0);
 const rows=await f.json('/fixture/rows',{});
 assert.equal(rows.filter(([k])=>k.endsWith(':source')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('owner-project-ref:')).length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('owner-ticket:')).length,1);
 assert.equal((await f.submit(s)).status,202);
 const after=await f.json('/fixture/rows',{});
 assert.equal(after.filter(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':record')).length,1);
 assert.equal(after.filter(([k])=>k.startsWith('source-selection:')).length,0);
});
test('signature audience and current owner are independently checked',async t=>{
 const f=await native(t);
 for(const token of ['invalid',await f.jwt('owner','foreign-audience')])assert.equal((await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}})).status,401);
 assert.equal((await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.jwt('other')}})).status,403);
});
test('origin cookie duplicate fields raw IDs and ticket mismatch deny before approval',async t=>{
 const f=await native(t),s=await f.screen();
 assert.equal((await f.submit(s,{headers:{Origin:'https://foreign.invalid'}})).status,403);
 assert.equal((await f.submit(s,{headers:{Cookie:'__Host-afw-finite-prepare='+'f'.repeat(64)}})).status,403);
 assert.equal((await f.submit(s,{fields:{projectRef:'synthetic-owned'}})).status,400);
 assert.equal((await f.submit(s,{fields:{handle:'f'.repeat(64)}})).status,403);
 assert.equal((await f.submit(s,{fields:{project:'synthetic-owned'}})).status,400);
 assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':record')).length,0);
});
for(const field of ['goal','programContext','initialBaseline','window','project','sourceRevision','qaVersionId']){
 test('displayed initial choice rejects changed '+field,async t=>{
  const f=await native(t),s=await f.screen();
  const changes={goal:'content',programContext:{programHash:'e'.repeat(64),sourceRevision:'d'.repeat(40),originalContextHash:'a'.repeat(64)},initialBaseline:{versionId:'22222222-2222-4222-8222-222222222222',deploymentId:'11111111-1111-4111-8111-111111111111',moduleHash:'a'.repeat(64),configurationHash:'a'.repeat(64),bindingsHash:'a'.repeat(64)},window:{startedAt:Date.now(),expiresAt:Date.now()+800000},project:{projectId:'synthetic-owned',revision:2,synthetic:true},sourceRevision:'e'.repeat(40),qaVersionId:'22222222-2222-4222-8222-222222222222'};
  await f.json('/fixture/source',{[field]:changes[field]});
  assert.notEqual((await f.submit(s)).status,202);
  assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.startsWith('connection-approval:')).length,0);
 });
}
for(const mode of ['missing','wrong'])test('missing or wrong release primary cannot fall back '+mode,async t=>{
 const f=await native(t,mode);assert.equal((await f.call('/connections/finite-prepare')).status,503);
 assert.equal((await f.json('/fixture/rows',{})).length,0);
});
