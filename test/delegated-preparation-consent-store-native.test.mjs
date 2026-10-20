import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
test('native D1 keeps explicit consent attempts atomic and unknown ACKs non-repeatable',{timeout:120000},async t=>{
 const consentModule=await import('../lib/delegated-preparation-consent-store.mjs').catch(()=>null);
 assert.equal(typeof consentModule?.createDelegatedPreparationConsentStore,'function','missing closed preparation consent store');
 const bundle=await build({entryPoints:['test/fixtures/preparation-consent-store-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,d1Databases:{DB:'preparation-consent-store-ci-only'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  for(const name of ['agent-capsule-preparations','delegated-preparation-consents'])
   for(const sql of(await readFile('db/'+name+'.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('project-a','owner-a','owner@example.invalid','Synthetic','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)").bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-token','verified',future,at,at).run();
  await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?)").bind('legacy-grant','owner-a','legacy-client','project-a','https://example.invalid/mcp',JSON.stringify([READ]),at,future).run();
  const initial=await db.prepare("SELECT * FROM delegated_access_grants WHERE id='legacy-grant'").first();
  const dispatch=async(action,body,ack)=>{
   const response=await runtime.dispatchFetch('https://example.invalid/__ci/'+action,{method:body?'POST':'GET',
    headers:body?{'Content-Type':'application/json',...(ack?{'x-ci-ack-loss':ack}:{})}:{},...(body?{body:JSON.stringify(body)}:{})});
   assert.equal(response.status,200);return response.json();
  };
  const profile=await dispatch('profile'),tx=(char,scopes=[READ,DRAFTS])=>({handleHash:char.repeat(64),requestHash:'0'.repeat(64),subject:'owner-a',
   requestedScopes:scopes,transactionStartedAt:profile.trialStartedAt+500,transactionExpiresAt:profile.trialExpiresAt-10000,expectedRevision:1});
  const ref=char=>({handleHash:char.repeat(64),requestHash:'0'.repeat(64),subject:'owner-a'});
  const choose=(char,decision='drafts')=>({...ref(char),decision});
  const count=async()=>(await db.prepare("SELECT count(*) AS n FROM delegated_access_grants WHERE client_id='_ci-client'").first()).n;
  await t.test('real primary D1 stores original metadata and one downgraded grant',async()=>{
   assert.equal((await dispatch('begin',tx('a'))).code,'consent_pending');assert.equal(await count(),0);
   const result=await dispatch('decide',choose('a','read'));assert.equal(result.code,'decision_saved');assert.equal(result.freshDecision,true);
   assert.deepEqual(result.scopes,[READ]);assert.equal(await count(),1);
   const grant=await db.prepare("SELECT * FROM delegated_access_grants WHERE id=?").bind(result.grantRef).first();
   assert.equal(Date.parse(grant.expires_at),tx('a').transactionExpiresAt);assert.equal(grant.exchanged_at,'');
   assert.equal((await dispatch('decide',choose('a','read'))).code,'already_decided');
  });
  await t.test('native SQLite trigger failure rolls back grant admission and consumes the attempt',async()=>{
   await dispatch('begin',tx('c'));
   await db.prepare("CREATE TRIGGER ci_reject_grant BEFORE INSERT ON delegated_access_grants WHEN NEW.id=(SELECT grant_id FROM delegated_preparation_consents WHERE handle_hash='"+'c'.repeat(64)+"') BEGIN SELECT RAISE(ABORT,'synthetic rejection'); END").run();
   assert.equal((await dispatch('decide',choose('c'))).code,'unknown_ack');
   assert.equal((await dispatch('inspect',ref('c'))).code,'decision_pending');assert.equal(await count(),1);
   assert.equal((await dispatch('decide',choose('c'))).code,'decision_pending');assert.equal(await count(),1);
  });
  await t.test('lost reservation ACK never creates or retries a grant in another request',async()=>{
   await dispatch('begin',tx('e'));assert.equal((await dispatch('decide',choose('e'),'reserve')).code,'unknown_ack');
   assert.equal((await dispatch('inspect',ref('e'))).code,'decision_pending');assert.equal(await count(),1);
   assert.equal((await dispatch('decide',choose('e'))).code,'decision_pending');assert.equal(await count(),1);
  });
  await t.test('lost admitted ACK reads one result with no code or token claim',async()=>{
   await dispatch('begin',tx('f'));assert.equal((await dispatch('decide',choose('f'),'admit')).code,'unknown_ack');
   const result=await dispatch('inspect',ref('f'));assert.equal(result.code,'decision_saved');assert.equal(result.freshDecision,false);
   assert.equal(result.authorizationCodeIssued,false);assert.equal(result.tokenIssued,false);assert.equal(await count(),2);
   assert.equal((await dispatch('decide',choose('f'))).code,'already_decided');assert.equal(await count(),2);
   await db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id=?").bind(new Date().toISOString(),result.grantRef).run();
   assert.equal((await dispatch('inspect',ref('f'))).code,'revoked');
   assert.equal((await db.prepare("SELECT state FROM delegated_preparation_consents WHERE handle_hash=?").bind('f'.repeat(64)).first()).state,'admitted');
  });
  await t.test('primary owner change closes new grant admission and preserves legacy history',async()=>{
   await dispatch('begin',tx('b'));await db.prepare("UPDATE site_projects SET user_id='other-owner' WHERE id='project-a'").run();
   assert.ok(['context_changed','delegated_access_denied'].includes((await dispatch('decide',choose('b'))).code));assert.equal(await count(),2);
   assert.deepEqual(await db.prepare("SELECT * FROM delegated_access_grants WHERE id='legacy-grant'").first(),initial);
  });
 }finally{await runtime.dispose();}
});
