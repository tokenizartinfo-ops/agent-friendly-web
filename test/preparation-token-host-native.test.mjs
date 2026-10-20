import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';

// Presence is asserted before bundling; the SDK-backed factory executes only in workerd.
let source;
try{source=await readFile('lib/delegated-preparation-token-host.mjs','utf8');}
catch(error){if(error.code!=='ENOENT')throw error;}
const issuer='https://example.invalid',resource=issuer+'/mcp',callback='https://client.example.invalid/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
async function nativeHostSuite(t,profileMs=180000){
 assert.match(source??'',/export function createDelegatedPreparationAuthorizationHost\(/,'missing finite preparation token host');
 const keys=await generateKeyPair('RS256'),other=await generateKeyPair('RS256');
 const publicJwk=await exportJWK(keys.publicKey);
 const jwt=async({subject='owner-a',audience='ci-preparation-audience',team='synthetic.cloudflareaccess.com',expiry=90,key=keys.privateKey}={})=>{
  const now=Math.floor(Date.now()/1000);
  return new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'}).setIssuer('https://'+team)
   .setAudience(audience).setSubject(subject).setIssuedAt(now).setExpirationTime(now+expiry).sign(key);
 };
 const identity=await jwt();
 const bundle=await build({entryPoints:['test/fixtures/preparation-token-host-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(publicJwk),CI_PREPARATION_PROFILE_MS:String(profileMs)},kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-http-identity-ci-only'}}));
 const clients=[];
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const ddl={};for(const name of ['agent-capsule-preparations','delegated-preparation-consents']){
   ddl[name]=(await readFile('db/'+name+'.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);
   for(const sql of ddl[name])await db.prepare(sql).run();
  }
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
   .bind('project-a','owner-a','owner@example.invalid','CI <dossier>','https://example.org','owner','services','owner','People','[\"explain_services\"]','[\"es\"]','[\"llms\"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)")
   .bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
   .bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-token','verified',future,at,at).run();
  const dispatch=(path,init={})=>{const url=new URL(path,issuer);assert.equal(url.origin,issuer);return runtime.dispatchFetch(url,{...init,redirect:'manual'});};
  const bootstrap=await(await dispatch('/__ci/bootstrap',{method:'POST'})).json();let seq=0;
  assert.deepEqual(await(await dispatch('/__ci/http-default')).json(),{defaultClosed:true,disabledClosed:true,touched:0});
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM delegated_preparation_consents) AS consents,(SELECT count(*) FROM delegated_access_grants) AS grants,(SELECT count(*) FROM publication_capsules) AS capsules").first();
  const stats=async()=>{const r=await dispatch('/__ci/token-stats');return r.json();};
  const mode=async value=>{const r=await dispatch('/__ci/token-mode',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:value})});assert.equal(r.status,200);};
  async function requestFor(scopes=[READ,DRAFTS],extra={}){
   const verifier='b'.repeat(64),challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url'),state='ci-signed-state-'+(++seq);
   const query=new URLSearchParams({response_type:'code',client_id:bootstrap.clientId,redirect_uri:callback,resource,scope:scopes.join(' '),state,
    code_challenge:challenge,code_challenge_method:'S256',project:'project-a',...extra});
   return {url:'/authorize?'+query,verifier,state};
  }
  async function begin(scopes=[READ,DRAFTS],{extra={},assertion=identity,headers={}}={}){
   const a=await requestFor(scopes,extra),response=await dispatch(a.url,{headers:{'Cf-Access-Jwt-Assertion':assertion,Accept:'text/html',...headers}});
   const html=await response.text();
   const handle=/name="handle" value="([A-Za-z0-9_-]+)"/.exec(html)?.[1];
   return {...a,response,html,handle,cookie:response.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ')};
  }
  function approve(a,decision='drafts',{assertion=identity,cookie=a.cookie,origin=issuer,extra={},headers={}}={}){
   const body=new URLSearchParams({handle:a.handle,decision});
   for(const [key,values]of Object.entries(extra))for(const v of Array.isArray(values)?values:[values])body.append(key,v);
   return dispatch('/authorize',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':assertion,Origin:origin,Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded',...headers},body});
  }
  const hash=async value=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))).toString('hex');
  const row=async a=>db.prepare('SELECT * FROM delegated_preparation_consents WHERE handle_hash=?').bind(await hash(a.handle)).first();
  const grant=async a=>db.prepare('SELECT g.* FROM delegated_access_grants g JOIN delegated_preparation_consents c ON c.grant_id=g.id WHERE c.handle_hash=?').bind(await hash(a.handle)).first();
  async function exchange(a,response){
   assert.equal(response.status,302);const redirect=new URL(response.headers.get('Location'));
   assert.equal(redirect.origin,new URL(callback).origin);assert.equal(redirect.searchParams.get('state'),a.state);
   const r=await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({
    grant_type:'authorization_code',client_id:bootstrap.clientId,redirect_uri:callback,code:redirect.searchParams.get('code'),code_verifier:a.verifier,resource})});
   assert.equal(r.status,200);return r.json();
  }
  async function connect(token){
   const c=new Client({name:'afw-signed-access-ci',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});clients.push(c);
   const fetch=(url,init)=>{
    assert.equal(new URL(url).origin,issuer);const headers=new Headers(init?.headers);headers.set('Authorization','Bearer '+token.access_token);headers.set('host','example.invalid');
    return dispatch(url,{...init,headers});
   };
   await c.connect(new StreamableHTTPClientTransport(new URL(resource),{fetch,redirectPolicy:'same-origin',onInsufficientScope:'throw',maxStepUpRetries:0,
    reconnectionOptions:{maxRetries:0,initialReconnectionDelay:1,maxReconnectionDelay:1,reconnectionDelayGrowFactor:1}}));return c;
  }

  assert.deepEqual(await(await dispatch('/__ci/token-default')).json(),{defaultClosed:true,disabledClosed:true,touched:0});
  const redeem=(a,accepted,extra={})=>dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({
   grant_type:'authorization_code',client_id:bootstrap.clientId,redirect_uri:callback,code:new URL(accepted.headers.get('Location')).searchParams.get('code'),
   code_verifier:a.verifier,resource,...extra})});
  const complete=async decision=>{const a=await begin(),accepted=await approve(a,decision);assert.equal(a.response.status,200);assert.equal(accepted.status,302);return {a,accepted};};
  const rawGrant=async a=>db.prepare('SELECT g.exchanged_at,g.revoked_at FROM delegated_access_grants g JOIN delegated_preparation_consents c ON c.grant_id=g.id WHERE c.handle_hash=?').bind(await hash(a.handle)).first();
  if(profileMs!==180000){
   await t.test('original profile respects the minimum TTL before consumption and preserves absolute expiry',async()=>{
    assert.equal(bootstrap.trialExpiresAt-bootstrap.trialStartedAt,profileMs);
    const {a,accepted}=await complete('read'),before=await stats(),response=await redeem(a,accepted),after=await stats();
    if(profileMs===70000){
     assert.equal(response.status,200);const token=await response.json();
     assert.equal(token.scope,READ);assert.equal(token.refresh_token,undefined);assert.ok(token.expires_in>0&&token.expires_in<=70);
     assert.ok((await rawGrant(a)).exchanged_at);assert.equal((await rawGrant(a)).revoked_at,'');
     assert.equal(after.consumed,before.consumed+1);assert.equal(after.revocations,before.revocations);
     assert.equal(after.sdkTokensIssued,before.sdkTokensIssued+1);
     const client=await connect(token);assert.notEqual((await client.callTool({name:'read_project_summary',arguments:{}})).isError,true);
     return;
    }
    assert.equal((await response.json()).access_token,undefined);
    assert.deepEqual(await rawGrant(a),{exchanged_at:'',revoked_at:''},'SDK minimum TTL must be checked before consuming the original permission');
    assert.equal(response.status,503);assert.equal(after.consumed,before.consumed);
    assert.equal(after.revocations,before.revocations);assert.equal(after.sdkTokensIssued,before.sdkTokensIssued);
    assert.equal(after.sdkTokenCalls,before.sdkTokenCalls+1);
   });
   return;
  }
  await t.test('read choice issues an original-expiry token without refresh or preparation tools',async()=>{
   const {a,accepted}=await complete('read'),r=await redeem(a,accepted);assert.equal(r.status,200);
   const token=await r.json();assert.equal(token.scope,READ);assert.equal(token.refresh_token,undefined);assert.ok(token.expires_in>0&&token.expires_in<=90);
   const c=await connect(token);assert.ok(!(await c.listTools()).tools.some(x=>x.name==='prepare_capsule_draft'));
   assert.notEqual((await c.callTool({name:'read_project_summary',arguments:{}})).isError,true);
   const g=await grant(a);assert.equal(Date.parse(g.expires_at),bootstrap.trialExpiresAt);assert.ok((await rawGrant(a)).exchanged_at);
   assert.ok([400,503].includes((await redeem(a,accepted)).status));
  });
  await t.test('drafts choice and actual PKCE exchange prepare once then current D1 withdrawal denies the connected client',async()=>{
   const {a,accepted}=await complete('drafts'),r=await redeem(a,accepted);assert.equal(r.status,200);const token=await r.json();
   assert.deepEqual(token.scope.split(' '),[READ,DRAFTS]);assert.equal(token.refresh_token,undefined);
   const c=await connect(token),revision=(await db.prepare("SELECT revision FROM site_projects WHERE id='project-a'").first()).revision;
   const result=await c.callTool({name:'prepare_capsule_draft',arguments:{contract:'agentfriendly.capsule-prepare.v1',expectedRevision:revision,idempotencyKey:'finite-token-native-0001'}});
   assert.equal(result.structuredContent.code,'prepared');assert.equal(result.structuredContent.publicationAllowed,false);
   const g=await grant(a);await db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').bind(new Date().toISOString(),g.id).run();
   const denied=await c.callTool({name:'read_project_summary',arguments:{}});assert.equal(denied.structuredContent.code,'delegated_access_denied');
  });
  await t.test('a drafts consent can be explicitly downscoped to read at token exchange',async()=>{
   const {a,accepted}=await complete('drafts'),r=await redeem(a,accepted,{scope:READ});assert.equal(r.status,200);
   const token=await r.json();assert.equal(token.scope,READ);const c=await connect(token);
   assert.ok(!(await c.listTools()).tools.some(x=>x.name==='prepare_capsule_draft'));
  });
  await t.test('two simultaneous SDK exchanges keep their own consent scopes and grant identities',async()=>{
   const read=await complete('read'),drafts=await complete('drafts');
   const [one,two]=await Promise.all([redeem(read.a,read.accepted),redeem(drafts.a,drafts.accepted)]);
   assert.equal(one.status,200);assert.equal(two.status,200);
   const [readToken,draftToken]=await Promise.all([one.json(),two.json()]);
   assert.equal(readToken.scope,READ);assert.deepEqual(draftToken.scope.split(' '),[READ,DRAFTS]);
   assert.notEqual((await grant(read.a)).id,(await grant(drafts.a)).id);
   assert.ok((await rawGrant(read.a)).exchanged_at);assert.ok((await rawGrant(drafts.a)).exchanged_at);
   const client=await connect(readToken);assert.ok(!(await client.listTools()).tools.some(t=>t.name==='prepare_capsule_draft'));
  });
  await t.test('refresh unknown fields duplicate fields and actual body cap never reach SDK or consumption',async()=>{
   const n=await counts(),s=await stats();
   for(const body of [new URLSearchParams({grant_type:'refresh_token',refresh_token:'not-a-token'}),
    new URLSearchParams({grant_type:'authorization_code',code:'x',scope:READ,extra:'x'}),
    'grant_type=authorization_code&grant_type=authorization_code','code='+'á'.repeat(2050)]){
    const r=await dispatch('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});assert.ok([400,413].includes(r.status));
   }
   assert.deepEqual(await counts(),n);assert.equal((await stats()).sdkTokenCalls,s.sdkTokenCalls);assert.equal((await stats()).consumed,s.consumed);
  });
  await t.test('changed owner or missing schema before exchange cannot consume the grant',async()=>{
   const {a,accepted}=await complete('read');await db.prepare("UPDATE site_projects SET user_id='foreign-owner' WHERE id='project-a'").run();
   try{assert.ok([400,503].includes((await redeem(a,accepted)).status));assert.deepEqual(await rawGrant(a),{exchanged_at:'',revoked_at:''});}
   finally{await db.prepare("UPDATE site_projects SET user_id='owner-a' WHERE id='project-a'").run();}
   const second=await complete('drafts');await db.prepare('DROP TRIGGER agent_capsule_preparations_no_delete').run();
   try{assert.ok([400,503].includes((await redeem(second.a,second.accepted)).status));assert.equal((await rawGrant(second.a)).exchanged_at,'');}
   finally{await db.prepare(ddl['agent-capsule-preparations'].find(x=>x.includes('agent_capsule_preparations_no_delete'))).run();}
  });
  await t.test('scope escalation or missing original request context cannot exchange application authority',async()=>{
   const one=await complete('read');assert.ok([400,503].includes((await redeem(one.a,one.accepted,{scope:READ+' '+DRAFTS})).status));assert.equal((await rawGrant(one.a)).exchanged_at,'');
   const two=await complete('drafts'),form=new URLSearchParams({grant_type:'authorization_code',client_id:bootstrap.clientId,redirect_uri:callback,
    code:new URL(two.accepted.headers.get('Location')).searchParams.get('code'),code_verifier:two.a.verifier,resource});
   const bypass=await dispatch('/__ci/token-bypass',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:form});
   assert.equal(bypass.status,503);assert.equal((await rawGrant(two.a)).exchanged_at,'');
  });
  await t.test('an unknown actual consume ACK never returns token or revokes an uncertain winner',async()=>{
   const {a,accepted}=await complete('drafts'),s=await stats(),n=await counts();await mode('unknown-consume');
   try{const r=await redeem(a,accepted);assert.equal(r.status,503);assert.equal((await r.json()).access_token,undefined);}
   finally{await mode('');}
   const g=await rawGrant(a);assert.ok(g.exchanged_at);assert.equal(g.revoked_at,'');assert.equal((await stats()).revocations,s.revocations);assert.equal((await stats()).sdkTokensIssued,s.sdkTokensIssued);
   assert.ok([400,503].includes((await redeem(a,accepted)).status));assert.deepEqual(await counts(),n);
  });
  await t.test('owner change after acknowledged consumption retires exactly its known-own grant',async()=>{
   const {a,accepted}=await complete('read'),s=await stats(),prior=(await db.prepare('SELECT id,revoked_at FROM delegated_access_grants ORDER BY id').all()).results;
   await mode('post-consume-owner');
   try{assert.equal((await redeem(a,accepted)).status,503);await stats();assert.ok((await rawGrant(a)).revoked_at);assert.equal((await stats()).revocations,s.revocations+1);}
   finally{await mode('');await db.prepare("UPDATE site_projects SET user_id='owner-a' WHERE id='project-a'").run();}
   const after=(await db.prepare('SELECT id,revoked_at FROM delegated_access_grants ORDER BY id').all()).results;
   for(const p of prior)if(p.id!==(await grant(a)).id)assert.deepEqual(after.find(r=>r.id===p.id),p);
  });
  await t.test('a D1 lookup held beyond the original deadline cannot consume late and later request reuses the same host',async()=>{
   const {a,accepted}=await complete('read'),s=await stats();await mode('held-lookup');
   try{const r=await redeem(a,accepted);assert.equal(r.status,503);assert.equal((await rawGrant(a)).exchanged_at,'');}
   finally{await mode('');assert.equal((await dispatch('/__ci/token-release',{method:'POST'})).status,200);}
   assert.equal((await rawGrant(a)).exchanged_at,'');assert.equal((await stats()).consumed,s.consumed);
   const next=await complete('read');assert.equal((await redeem(next.a,next.accepted)).status,200);
  });
  await t.test('late real KV token completion never escapes the deadline and its known-own D1 grant denies actual MCP',async()=>{
   const {a,accepted}=await complete('drafts'),s=await stats();await mode('held-token-put');
   try{const r=await redeem(a,accepted);assert.equal(r.status,503);assert.equal((await r.json()).access_token,undefined);}
   finally{await mode('');assert.equal((await dispatch('/__ci/token-release',{method:'POST'})).status,200);}
   assert.ok((await rawGrant(a)).revoked_at);assert.equal((await stats()).revocations,s.revocations+1);assert.equal((await stats()).sdkTokensIssued,s.sdkTokensIssued+1);
   const orphan=await(await dispatch('/__ci/orphan-token')).json();assert.equal(typeof orphan.access_token,'string');
   const c=await connect(orphan),denied=await c.callTool({name:'read_project_summary',arguments:{}});assert.equal(denied.structuredContent.code,'delegated_access_denied');
  });
  await t.test('configuration drift stays terminal even after restoring its option',async()=>{
   const {a,accepted}=await complete('read');await mode('config-drift');
   assert.equal((await redeem(a,accepted)).status,503);await mode('');await dispatch('/__ci/token-restore',{method:'POST'});
   const next=await complete('read');assert.equal((await redeem(next.a,next.accepted)).status,503);assert.equal((await rawGrant(next.a)).exchanged_at,'');
  });
 }finally{await Promise.allSettled(clients.map(c=>c.close()));await runtime.dispose();}
}
test('finite token host enforces original consent scope deadline and native withdrawal',{timeout:120000},nativeHostSuite);
for(const duration of [55000,59000,60000,70000])
 test('original preparation window '+duration+'ms respects the native SDK minimum TTL',{timeout:30000},t=>nativeHostSuite(t,duration));
