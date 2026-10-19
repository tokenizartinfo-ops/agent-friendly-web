import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let factory;
try{({createAgentCapsulePreparation:factory}=await import('../lib/agent-capsule-preparation.mjs'));}
catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND')throw error;}
test('native D1 primary sessions prepare once, reconcile without writes and deny after revocation',async()=>{
 assert.equal(typeof factory,'function','missing closed capsule preparation service');
 const program=`import {createAgentCapsulePreparation} from './lib/agent-capsule-preparation.mjs';
 const authority={subject:'owner-a',projectId:'project-a',clientId:'client-a',grantId:'grant-a',resource:'https://example.invalid/mcp'};
 export default{async fetch(request,env){
  const service=createAgentCapsulePreparation({enabled:true,createPrimarySession:()=>env.DB.withSession('first-primary'),resolveAuthority:async()=>authority});
  return Response.json(await service[new URL(request.url).pathname==='/reconcile'?'reconcile':'prepare'](await request.json()));
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
  const call=async(path='/prepare')=>(await runtime.dispatchFetch('http://localhost'+path,{method:'POST',body:JSON.stringify(input)})).json();
  const first=await call();assert.equal(first.code,'prepared');assert.equal(first.replayed,false);
  const replay=await call('/reconcile');assert.equal(replay.code,'prepared');assert.equal(replay.replayed,true);assert.deepEqual(replay.preparation,first.preparation);
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM agent_capsule_preparations) AS intents,(SELECT count(*) FROM publication_capsules) AS capsules,(SELECT count(*) FROM project_events WHERE type='agent_capsule_prepared') AS events").first();
  assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
  await db.prepare("UPDATE delegated_access_grants SET revoked_at=?").bind(new Date().toISOString()).run();
  assert.equal((await call()).code,'delegated_access_denied');assert.equal((await call('/reconcile')).code,'delegated_access_denied');assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
 }finally{await runtime.dispose();}
});
