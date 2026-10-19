import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let factory;
try{({createDelegatedCapsulePreparationHost:factory}=await import('../lib/delegated-capsule-preparation-host.mjs'));}
catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND')throw error;}
test('native D1 host checks history constraints, prepares once and refuses a weakened schema',async()=>{
 assert.equal(typeof factory,'function','missing closed preparation host');
 const program=`import {createDelegatedCapsulePreparationHost} from './lib/delegated-capsule-preparation-host.mjs';
 let started;const resource='https://example.invalid/mcp';
 const context={grantId:'grant-a',subject:'owner-a',clientId:'client-a',resource,scopes:['afw:capsule:prepare']};
 const limiter={async limit(){return {success:true};}};
 export default{async fetch(request,env){
  started??=Date.now(); // Anchor the synthetic window at the first real request, never module startup.
  const policy={...env,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
   AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:'project-a',AFW_OAUTH_PILOT_CLIENT_ID:'client-a',
   ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-audience',OAUTH_KV:{},DELEGATED_RATE_LIMITER:limiter};
  // Synthetic server-owned authorization, not a real token or consent receipt.
  const host=createDelegatedCapsulePreparationHost({env:policy,resource,resolveAuthorization:async()=>({context,projectId:'project-a',tokenExpiresAt:started+110000})});
  return Response.json(await host[new URL(request.url).pathname==='/reconcile'?'reconcile':'prepare'](await request.json()));
 }};`;
 const bundle=await build({stdin:{contents:program,resolveDir:process.cwd()},bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'capsule-preparation-ci-synthetic'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  // D1 exec accepts complete trigger definitions; this source DDL is not an installed migration.
  const ddl=await readFile('db/agent-capsule-preparations.sql','utf8');
  for(const sql of ddl.split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('project-a','owner-a','owner@example.invalid','Synthetic','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)").bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-real-token','verified',future,at,at).run();
  await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at) VALUES(?,?,?,?,?,?,?,?,?,?)").bind('grant-a','owner-a','client-a','project-a','https://example.invalid/mcp','["afw:capsule:prepare"]',at,future,'',at).run();
  const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:1,idempotencyKey:'prepare-native-0001'};
  const call=async(path='/prepare')=>{const r=await runtime.dispatchFetch('http://localhost'+path,{method:'POST',body:JSON.stringify(input)});const body=await r.text();assert.equal(r.status,200,body);return JSON.parse(body);};
  const first=await call();assert.equal(first.code,'prepared');assert.equal(first.replayed,false);
  const replay=await call('/reconcile');assert.equal(replay.code,'prepared');assert.equal(replay.replayed,true);assert.deepEqual(replay.preparation,first.preparation);
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM agent_capsule_preparations) AS intents,(SELECT count(*) FROM publication_capsules) AS capsules,(SELECT count(*) FROM project_events WHERE type='agent_capsule_prepared') AS events").first();
  assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
  await db.prepare("DROP TRIGGER agent_capsule_preparations_no_delete").run();
  assert.equal((await call()).code,'unavailable');assert.equal((await call('/reconcile')).code,'unavailable');assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
 }finally{await runtime.dispose();}
});
