import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';

// Presence is asserted before bundling; the SDK-backed factory executes only in workerd.
let source;
try{source=await readFile('lib/delegated-preparation-consent-http.mjs','utf8');}
catch(error){if(error.code!=='ENOENT')throw error;}
const issuer='https://example.invalid',resource=issuer+'/mcp',callback='https://client.example.invalid/callback';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
test('signed Access identity original SDK consent and finite D1 choice compose at the detached HTTP host',{timeout:120000},async t=>{
 assert.match(source??'',/export function createDelegatedPreparationConsentHttpHost\(/,'missing default-closed preparation consent HTTP host');
 const keys=await generateKeyPair('RS256'),other=await generateKeyPair('RS256');
 const publicJwk=await exportJWK(keys.publicKey);
 const jwt=async({subject='owner-a',audience='ci-preparation-audience',team='synthetic.cloudflareaccess.com',expiry=90,key=keys.privateKey}={})=>{
  const now=Math.floor(Date.now()/1000);
  return new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:'ci-only'}).setIssuer('https://'+team)
   .setAudience(audience).setSubject(subject).setIssuedAt(now).setExpirationTime(now+expiry).sign(key);
 };
 const identity=await jwt();
 const bundle=await build({entryPoints:['test/fixtures/preparation-consent-http-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,bindings:{CI_PUBLIC_JWK:JSON.stringify(publicJwk)},kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'preparation-http-identity-ci-only'}}));
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
  const stats=async()=>{const r=await dispatch('/__ci/http-stats');return r.json();};
  const mode=async value=>{const r=await dispatch('/__ci/http-mode',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:value})});assert.equal(r.status,200);};
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
  await t.test('missing or forged headers never substitute for a verified signed Access identity',async()=>{
   const before=await counts();
   for(const assertion of ['', 'not-a-jwt',await jwt({key:other.privateKey}),await jwt({audience:'foreign'}),await jwt({team:'foreign.cloudflareaccess.com'}),await jwt({expiry:-10})]){
    const a=await begin([READ],{assertion,headers:{'x-ci-actor':'owner-a'}});
    assert.equal(a.response.status,401);assert.ok(!a.html.includes(assertion)||!assertion);assert.deepEqual(await counts(),before);
   }
   assert.equal((await stats()).sdkBegins,0);
  });
  await t.test('valid signed foreign owner still cannot open this pinned dossier',async()=>{
   const before=await counts(),a=await begin([READ],{assertion:await jwt({subject:'foreign-owner'})});assert.equal(a.response.status,403);assert.deepEqual(await counts(),before);
  });
  await t.test('unknown scopes duplicate query and unregistered callback never create a consent',async()=>{
   const before=await counts();
   for(const extra of [{scope:READ+' afw:evidence:read'},{scope:DRAFTS},{redirect_uri:'https://foreign.example.invalid/callback'}]){
    assert.equal((await begin([READ,DRAFTS],{extra})).response.status,400);
   }
   const a=await requestFor();assert.equal((await dispatch(a.url+'&project=project-a',{headers:{'Cf-Access-Jwt-Assertion':identity}})).status,400);
   assert.deepEqual(await counts(),before);
  });
  await t.test('exact schema is required before SDK consent offer',async()=>{
   const before=await counts(),started=(await stats()).sdkBegins;
   await db.prepare('DROP TRIGGER agent_capsule_preparations_no_delete').run();
   try{assert.equal((await begin()).response.status,503);assert.deepEqual(await counts(),before);assert.equal((await stats()).sdkBegins,started);}
   finally{await db.prepare(ddl['agent-capsule-preparations'].find(x=>x.includes('agent_capsule_preparations_no_delete'))).run();}
  });
  await t.test('verified GET renders original scope expiry escaped dossier and exact registered callback CSP',async()=>{
   const a=await begin();assert.equal(a.response.status,200);assert.equal(typeof a.handle,'string');assert.match(a.html,/CI &lt;dossier&gt;/);
   assert.match(a.html,/AFW CI protocol client/);assert.match(a.html,/name="decision" value="drafts"/);
   assert.equal(a.response.headers.get('Cache-Control'),'no-store');
   const csp=a.response.headers.get('Content-Security-Policy');assert.match(csp,/form-action 'self' https:\/\/client\.example\.invalid;/);assert.equal(csp.includes('*'),false);
   const saved=await row(a);assert.equal(saved.transaction_expires_at,bootstrap.trialExpiresAt);
   assert.ok(a.html.includes(new Date(bootstrap.trialExpiresAt).toISOString()));assert.equal(a.html.includes(identity),false);
   const cancelled=await approve(a,'cancel');assert.equal(cancelled.status,302);assert.equal((await row(a)).state,'cancelled');
  });
  await t.test('foreign Origin duplicate decisions extra fields and tampered cookie do not admit a grant',async()=>{
   const a=await begin(),before=await counts();assert.equal(a.response.status,200);
   for(const options of [{origin:'https://foreign.example.invalid'},{extra:{scope:DRAFTS}},{extra:{decision:'read'}},{cookie:''}]){
    const r=await approve(a,'drafts',options);assert.ok([400,403].includes(r.status));assert.equal((await counts()).grants,before.grants);
   }
   assert.equal((await approve(a,'cancel')).status,302);
  });
  await t.test('the same original subject is required on POST after a valid GET',async()=>{
   const a=await begin(),before=await counts();
   assert.equal((await approve(a,'drafts',{assertion:await jwt({subject:'foreign-owner'})})).status,403);
   assert.equal((await counts()).grants,before.grants);assert.equal((await approve(a,'cancel')).status,302);
  });
  await t.test('fresh primary ownership changes prevent grant admission',async()=>{
   const a=await begin(),before=await counts();
   await db.prepare("UPDATE site_projects SET user_id='foreign-owner' WHERE id='project-a'").run();
   try{assert.ok([403,503].includes((await approve(a)).status));assert.equal((await counts()).grants,before.grants);}
   finally{await db.prepare("UPDATE site_projects SET user_id='owner-a' WHERE id='project-a'").run();}
   assert.equal((await approve(a,'cancel')).status,302);
  });
  let readGrant,draftGrant;
  await t.test('visible read downgrade issues only read scope and no preparation catalogue',async()=>{
   const a=await begin(),accepted=await approve(a,'read'),token=await exchange(a,accepted);
   assert.equal(token.scope,READ);assert.equal(token.refresh_token,undefined);
   const g=await grant(a);readGrant=g.id;assert.equal(Date.parse(g.expires_at),bootstrap.trialExpiresAt);assert.deepEqual(JSON.parse(g.scopes_json),[READ]);
   const c=await connect(token),names=(await c.listTools()).tools.map(x=>x.name);assert.ok(names.includes('read_project_summary'));assert.ok(!names.includes('prepare_capsule_draft'));
   const result=await c.callTool({name:'read_project_summary',arguments:{}});assert.notEqual(result.isError,true);
   assert.equal((await approve(a,'read')).status,403);assert.equal((await counts()).capsules,0);
  });
  await t.test('explicit drafts choice completes real code PKCE token and one actual native capsule',async()=>{
   const a=await begin(),accepted=await approve(a,'drafts'),token=await exchange(a,accepted);
   assert.deepEqual(token.scope.split(' '),[READ,DRAFTS]);assert.equal(token.refresh_token,undefined);
   const g=await grant(a);draftGrant=g.id;assert.equal(Date.parse(g.expires_at),bootstrap.trialExpiresAt);
   const c=await connect(token);assert.ok((await c.listTools()).tools.some(x=>x.name==='prepare_capsule_draft'));
   const revision=(await db.prepare("SELECT revision FROM site_projects WHERE id='project-a'").first()).revision;
   const result=await c.callTool({name:'prepare_capsule_draft',arguments:{contract:'agentfriendly.capsule-prepare.v1',expectedRevision:revision,idempotencyKey:'signed-http-native-0001'}});
   assert.equal(result.structuredContent.code,'prepared');assert.equal(result.structuredContent.preparation.version,1);
   assert.equal(result.structuredContent.publicationAllowed,false);assert.equal(result.structuredContent.chargeAllowed,false);assert.equal((await counts()).capsules,1);
   await db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').bind(new Date().toISOString(),g.id).run();
   const denied=await c.callTool({name:'reconcile_capsule_preparation',arguments:{contract:'agentfriendly.capsule-prepare.v1',expectedRevision:revision,idempotencyKey:'signed-http-native-0001'}});
   assert.equal(denied.structuredContent.code,'delegated_access_denied');assert.equal(denied.structuredContent.preparation,null);
  });
  for(const kind of ['reserve','admit'])await t.test('lost '+kind+' ACK never code-completes retries or revokes an uncertain admission',async()=>{
   const a=await begin(),before=await stats(),gBefore=(await counts()).grants;await mode(kind);
   try{
    assert.equal((await approve(a)).status,503);const after=await stats();assert.equal(after.sdkCompletions,before.sdkCompletions);assert.equal(after.revocations,before.revocations);
    assert.equal((await row(a)).state,kind==='reserve'?'reserved':'admitted');
    assert.equal((await counts()).grants,gBefore+(kind==='admit'?1:0));
    if(kind==='admit'){const g=await grant(a);assert.equal(g.exchanged_at,'');assert.equal(g.revoked_at,'');}
   }finally{await mode('');}
   const gCount=(await counts()).grants;assert.ok([400,403].includes((await approve(a)).status));assert.equal((await counts()).grants,gCount);
  });
  await t.test('lost actual SDK completion ACK revokes only its known-own grant with finite cleanup',async()=>{
   const a=await begin(),before=await stats();
   const prior=await db.prepare('SELECT id,revoked_at FROM delegated_access_grants WHERE id IN (?,?) ORDER BY id').bind(readGrant,draftGrant).all();
   await mode('complete');
   try{const r=await approve(a);assert.equal(r.status,503);assert.equal(r.headers.get('Location'),null);await stats();}
   finally{await mode('');}
   const g=await grant(a);assert.ok(g.revoked_at);assert.equal(g.exchanged_at,'');
   const after=await stats();assert.equal(after.sdkCompletions,before.sdkCompletions+1);assert.equal(after.revocations,before.revocations+1);
   assert.deepEqual((await db.prepare('SELECT id,revoked_at FROM delegated_access_grants WHERE id IN (?,?) ORDER BY id').bind(readGrant,draftGrant).all()).results,prior.results);
  });
  await t.test('actual UTF8 body cap and method admission precede identity and all application work',async()=>{
   const before=await stats(),n=await counts(),body='handle='+'á'.repeat(2050);
   assert.ok(new TextEncoder().encode(body).byteLength>4096);
   const r=await dispatch('/authorize',{method:'POST',headers:{Origin:issuer,'Cf-Access-Jwt-Assertion':identity,'Content-Type':'application/x-www-form-urlencoded'},body});
   assert.equal(r.status,413);assert.equal((await stats()).accessStarted,before.accessStarted);assert.deepEqual(await counts(),n);
   assert.equal((await dispatch('/authorize',{method:'DELETE',headers:{'Cf-Access-Jwt-Assertion':identity}})).status,405);
  });
  await t.test('rate denial offers no consent grant or SDK mutation',async()=>{
   const before=await counts(),s=await stats();await mode('limited');
   try{assert.equal((await begin()).response.status,429);assert.deepEqual(await counts(),before);assert.equal((await stats()).sdkBegins,s.sdkBegins);}
   finally{await mode('');}
  });
  await t.test('late Access completion cannot start consent and a later request reuses the same original-profile host',async()=>{
   const before=await counts(),s=await stats();assert.equal((await dispatch('/__ci/access-hold',{method:'POST'})).status,200);
   let response;
   try{response=await begin();assert.equal(response.response.status,503);assert.deepEqual(await counts(),before);}
   finally{const r=await dispatch('/__ci/release-access',{method:'POST'});assert.equal(r.status,200);}
   const after=await stats();assert.equal(after.accessCompleted,s.accessCompleted+1);assert.equal(after.sdkBegins,s.sdkBegins);assert.deepEqual(await counts(),before);
   const a=await begin();assert.equal(a.response.status,200);assert.equal((await approve(a,'cancel')).status,302);
  });
  await t.test('observed configuration drift closes this host permanently even after restoring the option',async()=>{
   const before=await counts(),s=await stats();await mode('config-drift');
   assert.equal((await begin()).response.status,503);await mode('');await dispatch('/__ci/http-restore',{method:'POST'});
   assert.equal((await begin()).response.status,503);assert.deepEqual(await counts(),before);assert.equal((await stats()).sdkBegins,s.sdkBegins);
  });
  await t.test('configuration drift after a known acknowledged admission revokes exactly its own grant',async()=>{
   // A NEW fixture instance, same original profile/dates; never revives the old invalidated host.
   assert.equal((await dispatch('/__ci/http-new-host',{method:'POST'})).status,200);
   const a=await begin();assert.equal(a.response.status,200);
   const before=await stats(),prior=(await db.prepare('SELECT id,revoked_at FROM delegated_access_grants ORDER BY id').all()).results;
   await mode('acknowledged-drift');
   try{
    const r=await approve(a);assert.equal(r.status,503);assert.equal(r.headers.get('Location'),null);
    const after=await stats(),g=await grant(a);
    assert.equal((await row(a)).state,'admitted');assert.ok(g.revoked_at,'known acknowledged admission must be revoked after configuration drift');
    assert.equal(g.exchanged_at,'');assert.equal(after.sdkCompletions,before.sdkCompletions);assert.equal(after.revocations,before.revocations+1);
    const current=(await db.prepare('SELECT id,revoked_at FROM delegated_access_grants ORDER BY id').all()).results;
    assert.deepEqual(current.filter(r=>prior.some(p=>p.id===r.id)),prior);
   }finally{await mode('');}
  });
 }finally{await Promise.allSettled(clients.map(c=>c.close()));await runtime.dispose();}
});
