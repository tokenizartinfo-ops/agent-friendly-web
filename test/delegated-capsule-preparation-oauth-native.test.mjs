import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let factory;
try{({createDelegatedCapsulePreparationOAuthHost:factory}=await import('../lib/delegated-capsule-preparation-oauth.mjs'));}
catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND')throw error;}
test('actual OAuth resource SDK context feeds native D1 preparation while malformed authority fails closed',async()=>{
 assert.equal(typeof factory,'function','missing closed preparation host');
 const program="import {OAuthResourceServer} from '@cloudflare/workers-oauth-provider';\nimport {createDelegatedCapsulePreparationOAuthHost} from './lib/delegated-capsule-preparation-oauth.mjs';\nlet started;const resource='https://example.invalid/mcp';\nconst limiter={async limit(){return {success:true};}};\nconst server=new OAuthResourceServer({\n resourceMetadata:{resource,authorization_servers:['https://example.invalid']},requiredScopes:['afw:capsule:prepare'],\n // Synthetic validator: the actual SDK builds ctx.auth; no real token or human consent.\n validateToken:(_env,request)=>async(audience,token)=>{\n  if(token!=='ci-synthetic-bearer')return null;\n  const scenario=request.headers.get('x-ci-scenario');\n  return {props:{applicationGrantId:'grant-a',userId:scenario==='owner-mismatch'?'other':'owner-a',projectId:'project-a'},\n   userId:'owner-a',clientId:'client-a',audience:scenario==='wrong-audience'?'https://other.invalid/mcp':audience,\n   ...(scenario==='missing-expiry'?{}:{expiresAt:Math.floor((started+(scenario==='expired'?-10000:110000))/1000)}),\n   scope:scenario==='read-only'?['afw:project:read']:['afw:capsule:prepare']};\n },\n handler:{async fetch(request,env,ctx){\n  let host;try{host=createDelegatedCapsulePreparationOAuthHost({env,resource,getVerifiedContext:()=>({auth:ctx.auth,props:ctx.props})});}\n  catch{return Response.json({code:'bridge_unavailable'},{status:503});}\n  const method=request.headers.get('x-ci-operation')==='reconcile'?'reconcile':'prepare';\n  return Response.json(await host[method](await request.json()));\n }}\n});\nexport default{async fetch(request,env,ctx){\n started??=Date.now();\n const policy={...env,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',\n  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:'project-a',AFW_OAUTH_PILOT_CLIENT_ID:'client-a',\n  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-aud',OAUTH_KV:{},DELEGATED_RATE_LIMITER:limiter};\n return server.fetch(request,policy,ctx);\n}};";
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
  const http=async({scenario='',operation='prepare',credential='ci-synthetic-bearer'}={})=>runtime.dispatchFetch('https://example.invalid/mcp',{method:'POST',headers:{Authorization:'Bearer '+credential,'Content-Type':'application/json','x-ci-scenario':scenario,'x-ci-operation':operation},body:JSON.stringify(input)});
  const call=async(options)=>{const r=await http(options),body=await r.text();assert.equal(r.status,200,body);return JSON.parse(body);};
  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM agent_capsule_preparations) AS intents,(SELECT count(*) FROM publication_capsules) AS capsules,(SELECT count(*) FROM project_events WHERE type='agent_capsule_prepared') AS events").first();
  for(const scenario of ['wrong-audience','expired'])assert.equal((await http({scenario})).status,401);
  assert.equal((await http({credential:'invalid'})).status,401);
  for(const scenario of ['missing-expiry','owner-mismatch'])assert.equal((await http({scenario})).status,503);
  assert.equal((await call({scenario:'read-only'})).code,'insufficient_scope');
  assert.deepEqual(await counts(),{intents:0,capsules:0,events:0});
  const first=await call();assert.equal(first.code,'prepared');assert.equal(first.replayed,false);
  const replay=await call({operation:'reconcile'});assert.equal(replay.code,'prepared');assert.deepEqual(replay.preparation,first.preparation);
  assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});assert.ok(!JSON.stringify([first,replay]).includes('ci-synthetic-bearer'));
  await db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='grant-a'").bind(new Date().toISOString()).run();
  assert.equal((await call({operation:'reconcile'})).code,'delegated_access_denied');
  assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
 }finally{await runtime.dispose();}
});
