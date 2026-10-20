import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const origin='https://example.invalid',resource=origin+'/mcp';
const route='./app/api/projects/[projectId]/deployment-capsules/route.ts';
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const split=value=>value.split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);

// Source qualification ONLY. Two explicit build aliases supply synthetic identity
// and a native D1 database to the ACTUAL human GET/POST route. No route body/SQL,
// generator, domain check, Drizzle or D1 implementation is replaced.
const program=`
import {setCiDb} from 'ci:db';
import {GET,POST} from '${route}';
import {createAgentCapsulePreparation} from './lib/agent-capsule-preparation.mjs';
import {checkAgentCapsulePreparationSchema} from './lib/agent-capsule-preparation-schema.mjs';
import {createDelegatedPreparationConsentStore} from './lib/delegated-preparation-consent-store.mjs';
import {createCapsulePreparationRequestLease} from './lib/capsule-preparation-request-lease.mjs';
let profile;
const authority={subject:'owner-a',projectId:'project-a',clientId:'_ci-migration',grantId:'',resource:'${resource}'};
async function human(env,key){
 setCiDb(env.DB);
 return POST(new Request('${origin}/api/projects/project-a/deployment-capsules',{method:'POST',
  body:JSON.stringify({contract:'agentfriendly.publication-capsule-build.v1',confirmBuild:true,idempotencyKey:key,expectedDomain:'example.org'})}),
  {params:Promise.resolve({projectId:'project-a'})});
}
export default{async fetch(request,env){
 setCiDb(env.DB);
 profile??={profileId:'afw.preparation-consent.v1',projectId:'project-a',clientId:'_ci-migration',resource:'${resource}',
  trialStartedAt:Date.now()-1000,trialExpiresAt:Date.now()+180000};
 const path=new URL(request.url).pathname;
 if(path==='/profile')return Response.json(profile);
 if(path==='/human'&&request.method==='GET')return GET(request,{params:Promise.resolve({projectId:'project-a'})});
 if(path==='/human'&&request.method==='POST')return human(env,(await request.json()).key);
 const primary=()=>env.DB.withSession('first-primary');
 if(path==='/schema')return Response.json(await checkAgentCapsulePreparationSchema({createPrimarySession:primary}));
 const input=await request.json();
 if(path==='/begin'||path==='/decide'||path==='/inspect'){
  const now=()=>Date.now(),requestLease=createCapsulePreparationRequestLease({now});
  const store=createDelegatedPreparationConsentStore({enabled:true,profile,createPrimarySession:primary,now,requestLease});
  const result=await store[path.slice(1)](input);
  if(path==='/decide'&&result.freshDecision===true&&result.code==='decision_saved')authority.grantId=result.grantRef;
  return Response.json(result);
 }
 if(path==='/prepare'||path==='/reconcile'){
  let interleaved=false;
  const createPrimarySession=()=>{
   const db=primary();
   const wrap=(stmt,sql)=>({__ciRaw:stmt,bind(...args){return wrap(stmt.bind(...args),sql);},
    first:(...args)=>stmt.first(...args),all:()=>stmt.all(),
    async run(){
     const result=await stmt.run();
     if(!interleaved&&request.headers.get('x-ci-human-interleave')==='true'
      &&sql.includes('INSERT INTO agent_capsule_preparations')&&result.meta.changes===1){
      interleaved=true;const inserted=await human(env,'human-native-race-0001');
      if(inserted.status!==201)throw Error('CI human route interleaving failed');
     }return result;
    }});
   return {prepare:sql=>wrap(db.prepare(sql),sql),batch:statements=>db.batch(statements.map(x=>x.__ciRaw))};
  };
  const service=createAgentCapsulePreparation({enabled:true,createPrimarySession,resolveAuthority:async()=>authority});
  return Response.json(await service[path.slice(1)](input));
 }
 return new Response(null,{status:404});
}};`;
const aliases={name:'explicit-ci-human-adapters',setup(b){
 b.onResolve({filter:/^(?:ci:db|\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/db)$/},()=>({path:'db',namespace:'ci-human'}));
 b.onResolve({filter:/^\.\.\/\.\.\/\.\.\/\.\.\/cloudflare-access-auth$/},()=>({path:'identity',namespace:'ci-human'}));
 b.onLoad({filter:/.*/,namespace:'ci-human'},args=>args.path==='identity'?{
  contents:"export async function getCloudflareAccessUser(){return {userId:'owner-a',email:'owner@example.invalid'};}",loader:'js'
 }:{contents:"import {drizzle} from 'drizzle-orm/d1';import * as schema from './db/schema.ts';let db;export function setCiDb(binding){db=drizzle(binding,{schema});}export function getDb(){if(!db)throw Error('CI D1 not set');return db;}",resolveDir:process.cwd(),loader:'js'});
}};
test('proposed preparation DDL preserves populated native D1 and actual human capsule route',{timeout:120000},async t=>{
 const bundle=await build({stdin:{contents:program,resolveDir:process.cwd()},plugins:[aliases],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const prep=split(await readFile('db/agent-capsule-preparations.sql','utf8'));
 const consents=split(await readFile('db/delegated-preparation-consents.sql','utf8'));
 assert.equal(prep.length,3);assert.equal(consents.length,4);
 const runtimes=[];
 async function populated(){
  const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
   script:bundle.outputFiles[0].text,d1Databases:{DB:'preparation-populated-ci-only'}}));runtimes.push(runtime);
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())
   for(const sql of split(await readFile('drizzle/'+name,'utf8')))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString(),past='2020-01-01T00:00:00.000Z';
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
   .bind('project-a','owner-a','owner@example.invalid','Synthetic migration','https://example.org','owner','services','owner','People','[\"explain_services\"]','[\"es\"]','[\"llms\"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)")
   .bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
   .bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-token','verified',future,at,at).run();
  for(const [id,scopes,expires,revoked]of [['legacy-active',[READ],future,''],['legacy-expired',[READ],past,''],['legacy-revoked',[READ,'afw:evidence:read'],future,at]])
   await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at) VALUES(?,?,?,?,?,?,?,?,?,?)")
    .bind(id,'owner-a','legacy-client','project-a',resource,JSON.stringify(scopes),at,expires,revoked,at).run();
  await db.prepare("INSERT INTO delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at) VALUES(?,?,?,?,?,?,?,?,?)")
   .bind('1'.repeat(64),'owner-a','connect','project-a','legacy-client',resource,JSON.stringify([READ]),future,at).run();
  await db.prepare("INSERT INTO delegated_refresh_uses(token_hash,grant_id,expires_at) VALUES(?,?,?)").bind('2'.repeat(64),'legacy-active',future).run();
  await db.prepare("INSERT INTO copilot_working_drafts(project_id,user_id,text,revision,last_mutation_key,updated_at,session_json) VALUES(?,?,?,?,?,?,?)")
   .bind('project-a','owner-a','Synthetic retained narrative',2,'draft-before-schema',at,'{"version":1,"deferred":["hosting"]}').run();
  await db.prepare("INSERT INTO copilot_consent_events(project_id,user_id,action,consent_version,idempotency_key,created_at) VALUES(?,?,?,?,?,?)")
   .bind('project-a','owner-a','accepted','ci-v1','consent-before-schema',at).run();
  const call=async(path,body,headers={})=>{
   const response=await runtime.dispatchFetch(origin+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json',...headers}:headers,...(body?{body:JSON.stringify(body)}:{})});
   return {status:response.status,data:await response.json()};
  };
  const human=await call('/human',{key:'human-native-before-0001'});assert.equal(human.status,201);
  const capsuleId=human.data.capsule.capsuleId;
  assert.equal(human.data.capsule.version,1);
  await db.prepare("INSERT INTO capsule_approvals(id,capsule_id,project_id,role,actor_user_id,decision,manifest_sha256,idempotency_key,note,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)")
   .bind('approval-before',capsuleId,'project-a','owner','owner-a','approved',human.data.capsule.integrity.manifestSha256,'approval-before-schema','Synthetic retained approval',at).run();
  await db.prepare("INSERT INTO delivery_plans(capsule_id,project_id,user_id,revision,mutation_key,payload,updated_at) VALUES(?,?,?,?,?,?,?)")
   .bind(capsuleId,'project-a','owner-a',1,'plan-before-schema','{"synthetic":"retained"}',at).run();
  const tables=(await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT GLOB '_cf_*' ORDER BY name").all()).results.map(x=>x.name);
  assert.ok(tables.every(x=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(x)));
  const snapshot=async(names=tables)=>{
   const values={};
   for(const name of names){
    const rows=(await db.prepare('SELECT * FROM "'+name+'"').all()).results.map(x=>JSON.stringify(x)).sort();
    values[name]=digest(rows);
   }return values;
  };
  const objects=async()=>(await db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' AND name NOT GLOB '_cf_*' ORDER BY type,name").all()).results;
  const baseline=await snapshot(),originalObjects=await objects();
  const profile=(await call('/profile')).data;
  const tx={handleHash:'a'.repeat(64),requestHash:'b'.repeat(64),subject:'owner-a',requestedScopes:[READ,DRAFTS],
   transactionStartedAt:profile.trialStartedAt+500,transactionExpiresAt:profile.trialExpiresAt-1000,expectedRevision:1};
  const reference={handleHash:tx.handleHash,requestHash:tx.requestHash,subject:tx.subject};
  const oldHuman=(await call('/human')).data;
  const assertOriginalObjects=async()=>{
   const current=await objects();
   for(const old of originalObjects)assert.deepEqual(current.find(x=>x.type===old.type&&x.name===old.name),old);
  };
  return {runtime,db,call,tables,snapshot,objects,baseline,assertOriginalObjects,tx,reference,oldHuman};
 }
 try{
  const f=await populated();
  await t.test('every interruption keeps legacy bytes and human reads while exact partial dependencies stay closed',async()=>{
   assert.equal((await f.call('/schema')).data.ready,false);
   assert.equal((await f.call('/begin',f.tx)).data.code,'unavailable');
   const statements=[...prep,...consents];
   for(const [i,sql]of statements.entries()){
    await f.db.prepare(sql).run();
    assert.deepEqual(await f.snapshot(),f.baseline,'baseline rows changed at additive statement '+i);
    await f.assertOriginalObjects();
    assert.equal((await f.call('/schema')).data.ready,i>=2);
    if(i<statements.length-1)assert.equal((await f.call('/begin',f.tx)).data.code,'unavailable');
    assert.deepEqual((await f.call('/human')).data,f.oldHuman);
   }
   assert.equal((await f.db.prepare('SELECT count(*) AS n FROM delegated_preparation_consents').first()).n,0);
  });
  await t.test('exact replay is row/object-idempotent and does not issue or replace historical permissions',async()=>{
   const names=[...f.tables,'agent_capsule_preparations','delegated_preparation_consents'];
   const before=await f.snapshot(names),objects=await f.objects();
   for(const sql of [...prep,...consents])await f.db.prepare(sql).run();
   assert.deepEqual(await f.snapshot(names),before);assert.deepEqual(await f.objects(),objects);
   assert.equal((await f.call('/begin',f.tx)).data.code,'consent_pending');
   const decision=(await f.call('/decide',{...f.reference,decision:'drafts'})).data;
   assert.equal(decision.code,'decision_saved');assert.equal(decision.freshDecision,true);
   assert.equal(decision.authorizationCodeIssued,false);assert.equal(decision.tokenIssued,false);
   const grant=await f.db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(decision.grantRef).first();
   assert.deepEqual(JSON.parse(grant.scopes_json),[READ,DRAFTS]);assert.equal(grant.exchanged_at,'');
   // Synthetic source authority below is NOT an OAuth/token exchange.
   await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?')
    .bind(new Date().toISOString(),decision.grantRef).run();
  });
  await t.test('actual human route and agent service share versions without overwriting prior rows',async()=>{
   const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:1,idempotencyKey:'agent-native-after-0001'};
   const prepared=(await f.call('/prepare',input)).data;assert.equal(prepared.code,'prepared');assert.equal(prepared.preparation.version,2);
   const human=await f.call('/human',{key:'human-native-after-0001'});assert.equal(human.status,201);assert.equal(human.data.capsule.version,3);
   const before=await f.db.prepare('SELECT id,version,capsule_json FROM publication_capsules ORDER BY version').all();
   const race=(await f.call('/prepare',{...input,idempotencyKey:'agent-native-race-0001'},{'x-ci-human-interleave':'true'})).data;
   assert.equal(race.code,'preparation_pending');
   const after=(await f.db.prepare('SELECT id,version,capsule_json FROM publication_capsules ORDER BY version').all()).results;
   assert.deepEqual(after.slice(0,3),before.results);assert.deepEqual(after.map(x=>x.version),[1,2,3,4]);
   const status=(await f.db.prepare('SELECT status FROM agent_capsule_preparations ORDER BY version').all()).results.map(x=>x.status);
   assert.deepEqual(status,['prepared','reserved']);
   assert.equal((await f.db.prepare("SELECT count(*) AS n FROM project_events WHERE type='publication_capsule_created'").first()).n,3);
   assert.equal((await f.db.prepare("SELECT count(*) AS n FROM project_events WHERE type='agent_capsule_prepared'").first()).n,1);
   const untouched=f.tables.filter(n=>!['publication_capsules','project_events','delegated_access_grants'].includes(n));
   const now=await f.snapshot(untouched);for(const n of untouched)assert.equal(now[n],f.baseline[n],n+' changed');
   const legacy=(await f.db.prepare("SELECT * FROM delegated_access_grants WHERE client_id='legacy-client'").all()).results.map(x=>JSON.stringify(x)).sort();
   assert.equal(digest(legacy),f.baseline.delegated_access_grants);
   assert.equal((await f.call('/human')).data.capsule.version,4);
  });
  await t.test('unknown additive trigger is retained and exact replay cannot silently repair new consent admission',async()=>{
   await f.db.prepare("CREATE TRIGGER ci_unknown_preparation_trigger AFTER INSERT ON delegated_preparation_consents BEGIN SELECT 1; END").run();
   const names=[...f.tables,'agent_capsule_preparations','delegated_preparation_consents'],before=await f.snapshot(names),objects=await f.objects();
   for(const sql of [...prep,...consents])await f.db.prepare(sql).run();
   assert.deepEqual(await f.snapshot(names),before);assert.deepEqual(await f.objects(),objects);
   assert.equal((await f.call('/begin',{...f.tx,handleHash:'c'.repeat(64)})).data.code,'unavailable');
   assert.deepEqual(await f.snapshot(names),before);
   assert.equal((await f.call('/human')).status,200);
  });
  await t.test('consent-first additive order remains closed until the other exact schema exists',async()=>{
   const f=await populated();
   for(const sql of consents)await f.db.prepare(sql).run();
   assert.equal((await f.call('/schema')).data.ready,false);
   assert.equal((await f.call('/begin',f.tx)).data.code,'unavailable');assert.deepEqual(await f.snapshot(),f.baseline);
   for(const sql of prep)await f.db.prepare(sql).run();
   assert.equal((await f.call('/schema')).data.ready,true);
   assert.deepEqual(await f.snapshot(),f.baseline);await f.assertOriginalObjects();
   assert.equal((await f.call('/begin',f.tx)).data.code,'consent_pending');
   assert.deepEqual((await f.call('/human')).data,f.oldHuman);
  });
 }finally{await Promise.allSettled(runtimes.map(runtime=>runtime.dispose()));}
});
