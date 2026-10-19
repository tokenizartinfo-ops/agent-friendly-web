import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';

const program="import {OAuthResourceServer} from '@cloudflare/workers-oauth-provider';\nimport {McpServer} from '@modelcontextprotocol/server';\nimport {createMcpHandler} from 'agents/mcp/server';\nimport {createCapsulePreparationHttpBoundary} from './lib/delegated-capsule-preparation-http.mjs';\nimport {createDelegatedCapsulePreparationOAuthHost} from './lib/delegated-capsule-preparation-oauth.mjs';\nimport {registerDelegatedCapsulePreparation} from './lib/delegated-capsule-preparation-mcp.mjs';\nconst issuer='https://example.invalid',resource=issuer+'/mcp';\nlet validations=0,boot;\nexport default {async fetch(request,env,ctx){\n boot??=Date.now();const started=boot,offset={mono:0};let protectedShape=null;\n // Miniflare's local proxy supplies its internal Host. Restore only the\n // fixture's effective URL host; do not widen the production allowlist.\n const canonicalHeaders=new Headers(request.headers);canonicalHeaders.set('host',new URL(request.url).host);\n request=new Request(request,{headers:canonicalHeaders});\n const now=()=>Date.now(),monotonic=()=>performance.now()+offset.mono;\n const policy={...env,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',\n  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(started+120000).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:'project-a',AFW_OAUTH_PILOT_CLIENT_ID:'client-a',\n  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'synthetic-aud',OAUTH_KV:{},\n  DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}}};\n const boundary=createCapsulePreparationHttpBoundary({enabled:true,issuer,now,monotonic,\n  handle:(bounded,_env,_ctx,requestLease)=>{\n   // CI-only synthetic validator. The real SDK builds ctx.auth; this is not\n   // cryptographic authentication, a real OAuth exchange or human consent.\n   const oauth=new OAuthResourceServer({resourceMetadata:{resource,authorization_servers:[issuer]},requiredScopes:['afw:capsule:prepare'],\n    validateToken:(_env,request)=>async(audience,token)=>{\n     validations++;if(token!=='ci-synthetic-bearer')return null;\n     const scenario=request.headers.get('x-ci-scenario');\n     if(scenario==='auth-spent-4s')offset.mono+=4000;\n     if(scenario==='auth-spent-6s')offset.mono+=6000;\n     return {userId:'owner-a',clientId:'client-a',audience:scenario==='wrong-audience'?'https://other.invalid/mcp':audience,\n      expiresAt:Math.floor((started+(scenario==='expired'?-10000:110000))/1000),\n      scope:scenario==='read-only'?['afw:project:read']:['afw:capsule:prepare'],\n      props:{applicationGrantId:'grant-a',userId:scenario==='owner-mismatch'?'other':'owner-a',projectId:'project-a'}};\n    },\n    handler:{async fetch(authorized,environment,authCtx){\n     const host=createDelegatedCapsulePreparationOAuthHost({env:environment,resource,requestLease,now,monotonic,\n      getVerifiedContext:()=>({auth:authCtx.auth,props:authCtx.props})});\n     return createMcpHandler(()=>{\n      const server=new McpServer({name:'afw-ci-native-preparation',version:'1.0.0'});\n      registerDelegatedCapsulePreparation(server,{enabled:true,host});return server;\n     },{route:'/mcp',corsOptions:false,allowedHostnames:['example.invalid'],legacy:'stateless',responseMode:'json'})(authorized,environment,authCtx);\n    }}\n   });\n   return oauth.fetch(bounded,policy,ctx).then(response=>{\n    protectedShape={status:response.status,type:response.headers.get('Content-Type'),body:!!response.body};\n    return response;\n   });\n  }});\n const response=await boundary(request,policy,ctx);\n // Counts only, for proving that rejected ingress never entered authentication.\n const headers=new Headers(response.headers);headers.set('x-ci-validations',String(validations));headers.set('x-ci-protected-shape',JSON.stringify(protectedShape));\n return new Response(response.body,{status:response.status,statusText:response.statusText,headers});\n}};\n";
const issuer='https://example.invalid',resource=issuer+'/mcp';
const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:1,idempotencyKey:'native-http-prepare-0001'};
const prepare='prepare_capsule_draft',reconcile='reconcile_capsule_preparation';
test('native HTTP composition keeps preparation authority, original budget and uncertain ACK recovery', {timeout:120000},async t=>{
 const bundle=await build({stdin:{contents:program,resolveDir:process.cwd()},bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  script:bundle.outputFiles[0].text,d1Databases:{DB:'capsule-native-http-ci-synthetic'}}));
 const clients=[];let scenario='',loseAck=false;const exchanges=[];
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of(await readdir('drizzle')).filter(n=>/^\d+.*\.sql$/.test(n)).sort())for(const sql of(await readFile('drizzle/'+name,'utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  for(const sql of(await readFile('db/agent-capsule-preparations.sql','utf8')).split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
  await db.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('project-a','owner-a','owner@example.invalid','Synthetic','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms"]',at,at).run();
  await db.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)").bind('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at).run();
  await db.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-real-token','verified',future,at,at).run();
  await db.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at) VALUES(?,?,?,?,?,?,?,?,?,?)").bind('grant-a','owner-a','client-a','project-a','https://example.invalid/mcp','["afw:capsule:prepare"]',at,future,'',at).run();

  const counts=()=>db.prepare("SELECT(SELECT count(*) FROM agent_capsule_preparations) AS intents,(SELECT count(*) FROM publication_capsules) AS capsules,(SELECT count(*) FROM project_events WHERE type='agent_capsule_prepared') AS events").first();
  const zero={intents:0,capsules:0,events:0};
  const rpc=(method,params={},headers={})=>runtime.dispatchFetch(resource,{method:'POST',headers:{
   Authorization:'Bearer ci-synthetic-bearer','Content-Type':'application/json',Accept:'application/json, text/event-stream',...headers},
   body:JSON.stringify({jsonrpc:'2.0',id:101,method,params})});
  const connect=async(mode='legacy',credential='ci-synthetic-bearer')=>{
   const client=new Client({name:'afw-native-http-test',version:'1.0.0'},{versionNegotiation:{mode}});
   clients.push(client);
   const fetch=async(url,init)=>{
    assert.equal(new URL(url).origin,issuer,'test transport must never dial another origin');
    const packet=typeof init?.body==='string'?JSON.parse(init.body):null;
    const headers=new Headers(init?.headers);headers.set('Authorization','Bearer '+credential);headers.set('host','example.invalid');
    // Fault knobs exist only in the fixture and only affect a tools/call.
    if(packet?.method==='tools/call'&&scenario)headers.set('x-ci-scenario',scenario);
    const response=await runtime.dispatchFetch(url,{...init,headers});
    exchanges.push({method:init?.method??'GET',rpc:packet?.method??'',tool:packet?.params?.name??'',status:response.status,shape:response.headers.get('x-ci-protected-shape')});
    if(loseAck&&packet?.method==='tools/call'&&packet.params.name===prepare){
     loseAck=false;const saved=await response.json();
     assert.equal(saved.result.structuredContent.code,'prepared','fault must occur after actual backend commit');
     throw Error('Synthetic HTTP acknowledgment lost');
    }
    return response;
   };
   try{await client.connect(new StreamableHTTPClientTransport(new URL(resource),{fetch,redirectPolicy:'same-origin',
    onInsufficientScope:'throw',maxStepUpRetries:0,reconnectionOptions:{maxRetries:0,initialReconnectionDelay:1,maxReconnectionDelay:1,reconnectionDelayGrowFactor:1}}));}
   catch(error){error.message+=' [protected shape '+exchanges.at(-1)?.shape+']';throw error;}
   return client;
  };
  const call=(client,name=prepare,args=input)=>client.callTool({name,arguments:args});
  let legacy,modern,first;

  await t.test('oversized and malformed ingress is rejected before OAuth or D1',async()=>{
   for(const [body,want] of [['x'.repeat(4097),413],['{',400],['[]',400]]){
    const r=await runtime.dispatchFetch(resource,{method:'POST',headers:{'Content-Type':'application/json'},body});
    assert.equal(r.status,want);assert.equal(r.headers.get('x-ci-validations'),'0');
   }assert.deepEqual(await counts(),zero);
  });
  await t.test('bad origin and method do not reach authentication',async()=>{
   const foreign=await runtime.dispatchFetch(resource,{method:'POST',headers:{Origin:'https://other.invalid','Content-Type':'application/json'},body:'{}'});
   assert.equal(foreign.status,403);assert.equal(foreign.headers.get('x-ci-validations'),'0');
   const get=await runtime.dispatchFetch(resource);assert.equal(get.status,405);assert.equal(get.headers.get('x-ci-validations'),'0');
   assert.deepEqual(await counts(),zero);
  });
  await t.test('SDK rejects foreign audience, expired and invalid synthetic token',async()=>{
   for(const header of [{'x-ci-scenario':'wrong-audience'},{'x-ci-scenario':'expired'},{Authorization:'Bearer invalid'}]){
    const r=await rpc('tools/call',{name:prepare,arguments:input},header);assert.equal(r.status,401);
   }assert.deepEqual(await counts(),zero);
  });
  await t.test('actual legacy HTTP client connects and gets only the two bounded tools',async()=>{
   legacy=await connect();const tools=(await legacy.listTools()).tools;
   assert.deepEqual(tools.map(x=>x.name).sort(),[prepare,reconcile].sort());
   for(const tool of tools){assert.equal(tool.inputSchema.additionalProperties,false);assert.equal(tool.outputSchema.additionalProperties,false);
    assert.equal(tool.annotations.readOnlyHint,tool.name===reconcile);assert.equal(tool.annotations.openWorldHint,false);}
   assert.deepEqual(await counts(),zero);
  });
  await t.test('MCP argument validation and revision fence create no intent',async()=>{
   assert.equal((await call(legacy,prepare,{...input,subject:'other'})).isError,true);
   assert.equal((await call(legacy,prepare,{...input,expectedRevision:2})).structuredContent.code,'revision_conflict');
   assert.deepEqual(await counts(),zero);
  });
  await t.test('read-only token never acquires preparation authority or writes',async()=>{
   scenario='read-only';try{const r=await call(legacy);assert.equal(r.isError,true);assert.equal(r.structuredContent.code,'insufficient_scope');}
   finally{scenario='';}assert.deepEqual(await counts(),zero);
  });
  await t.test('original HTTP deadline includes authentication rather than restarting in the host',async()=>{
   scenario='auth-spent-6s';const before=exchanges.filter(x=>x.rpc==='tools/call').length;
   try{await assert.rejects(call(legacy));}finally{scenario='';}
   assert.equal(exchanges.filter(x=>x.rpc==='tools/call').length-before,1);assert.equal(exchanges.at(-1).status,503);
   assert.deepEqual(await counts(),zero);
  });
  await t.test('actual native HTTP call prepares one capsule with truthful bounded output',async()=>{
   first=await call(legacy);assert.notEqual(first.isError,true);assert.equal(first.structuredContent.code,'prepared');
   assert.equal(first.structuredContent.replayed,false);
   assert.deepEqual(JSON.parse(first.content[0].text),first.structuredContent);
   for(const flag of ['executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(first.structuredContent[flag],false);
   assert.ok(!JSON.stringify(first).includes('owner-a'));assert.ok(!JSON.stringify(first).includes('ci-synthetic-bearer'));
   assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
  });
  await t.test('pinned modern HTTP client reconciles the same native result without writing',async()=>{
   modern=await connect({pin:'2026-07-28'});const found=await call(modern,reconcile);
   assert.equal(found.structuredContent.code,'prepared');assert.equal(found.structuredContent.replayed,true);
   assert.deepEqual(found.structuredContent.preparation,first.structuredContent.preparation);
   assert.deepEqual(await counts(),{intents:1,capsules:1,events:1});
  });
  await t.test('lost HTTP acknowledgment is not retried; explicit read recovers the committed capsule',async()=>{
   const lost={...input,idempotencyKey:'native-http-lost-0001'},before=exchanges.filter(x=>x.rpc==='tools/call'&&x.tool===prepare).length;
   loseAck=true;await assert.rejects(call(legacy,prepare,lost),/Synthetic HTTP acknowledgment lost/);
   assert.equal(exchanges.filter(x=>x.rpc==='tools/call'&&x.tool===prepare).length-before,1);
   assert.deepEqual(await counts(),{intents:2,capsules:2,events:2});
   const found=await call(legacy,reconcile,lost),latest=await db.prepare('SELECT id FROM publication_capsules ORDER BY version DESC LIMIT 1').first();
   assert.equal(found.structuredContent.code,'prepared');assert.equal(found.structuredContent.replayed,true);
   assert.equal(found.structuredContent.preparation.capsuleRef,latest.id);assert.equal(found.structuredContent.preparation.version,2);
   assert.deepEqual(await counts(),{intents:2,capsules:2,events:2});
  });
  await t.test('time already spent authenticating reduces the actual D1 intent cutoff',async()=>{
   scenario='auth-spent-4s';let prepared;try{prepared=await call(legacy,prepare,{...input,idempotencyKey:'native-http-budget-0001'});}finally{scenario='';}
   assert.equal(prepared.structuredContent.code,'prepared');
   const intent=await db.prepare('SELECT reserved_at,expires_at FROM agent_capsule_preparations WHERE version=3').first();
   assert.ok(intent.expires_at>intent.reserved_at);assert.ok(intent.expires_at-intent.reserved_at<=1000);
   assert.deepEqual(await counts(),{intents:3,capsules:3,events:3});
  });
  await t.test('native grant withdrawal blocks both clients on the following read and preserves history',async()=>{
   await db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='grant-a'").bind(new Date().toISOString()).run();
   for(const client of [legacy,modern]){const denied=await call(client,reconcile);assert.equal(denied.isError,true);
    assert.equal(denied.structuredContent.code,'delegated_access_denied');assert.equal(denied.structuredContent.preparation,null);}
   assert.deepEqual(await counts(),{intents:3,capsules:3,events:3});
  });
 }finally{await Promise.allSettled(clients.map(client=>client.close()));await runtime.dispose();}
});
