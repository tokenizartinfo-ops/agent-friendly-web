import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const revision='a63b16237d76ae333b3883e34523f73d3f69a173';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED'];
async function required(path,message){let text;try{text=await readFile(path,'utf8');}catch(e){if(e.code!=='ENOENT')throw e;}assert.ok(text,message);}
const caller=`export default {async fetch(request,env){
 const p=new URL(request.url).pathname;
 if(p.startsWith('/http'))return env.MAINT.fetch(request);
 if(p==='/private'){
  try{const value=await env.MAINT.env;return Response.json({denied:value===undefined});}
  catch{return Response.json({denied:true});}
 }
 if(p==='/helper'){
  try{await env.MAINT.getOAuthApi();return Response.json({denied:false});}
  catch{return Response.json({denied:true});}
 }
 const value=p==='/register'?await env.MAINT.register():p==='/args'?await env.MAINT.register({redirectUri:'https://other.invalid/callback'}):await env.MAINT.reconcile();
 return Response.json(value);
}};`;
function safe(r){
 for(const key of ['executionAllowed','chargeAllowed','publicationAllowed','authorizationGranted','operationalReadiness'])assert.equal(r[key],false);
 assert.equal(r.automaticRetry,false);assert.doesNotMatch(JSON.stringify(r),/PRIVATE|clientSecret|client_secret|access_token|refresh_token/);
}

test('private preparation entry uses actual service binding and durable SDK storage',{timeout:120000},async t=>{
 await required('worker/preparation-maintenance/index.mjs','missing private preparation maintenance entry');
 const {buildPreparationMaintenanceWorker}=await import('../scripts/build-preparation-maintenance-worker.mjs');
 const {script}=await buildPreparationMaintenanceWorker({sourceRevision:revision});
 const ddl=await readFile('db/preparation-client-bootstrap.sql','utf8');
 async function own(changes,run,{stores=true}={}){
  const start=Date.now()-1000;
  const policy={redirectUri:'https://chatgpt.com/connector/oauth/ci_private_1',operationId:'ci-private-1',startedAt:new Date(start).toISOString(),expiresAt:new Date(start+600000).toISOString()};
  const bindings={AFW_PREPARATION_CLIENT_MAINTENANCE_ENABLED:'true',AFW_OAUTH_ISSUER:'https://preparation.example.invalid',
   AFW_OAUTH_RESOURCE:'https://preparation.example.invalid/mcp',AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:JSON.stringify(policy),...Object.fromEntries(flags.map(k=>[k,'false'])),...changes};
  const common={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']};
  const mf=new Miniflare(convertV4MiniflareOptions({workers:[
   {name:'caller',...common,script:caller,serviceBindings:{MAINT:'maintenance'}},
   {name:'maintenance',...common,script,bindings,...(stores?{kvNamespaces:{OAUTH_KV:'private-ci-kv'},d1Databases:{DB:'private-ci-db'}}:{})},
  ]}));
  try{
   const db=stores?await mf.getD1Database('DB','maintenance'):null,kv=stores?await mf.getKVNamespace('OAUTH_KV','maintenance'):null;
   if(db)await db.prepare(ddl).run();
   const call=async(path,init)=>{const res=await mf.dispatchFetch('https://caller.example.invalid/'+path,init);return {status:res.status,cache:res.headers.get('Cache-Control'),body:await res.json()};};
   await run(call,db,kv);
  }finally{await mf.dispose();}
 }
 await t.test('disabled RPC needs no datastore or policy',()=>own({AFW_PREPARATION_CLIENT_MAINTENANCE_ENABLED:'false',AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:'PRIVATE invalid'},async call=>{
  for(const path of ['register','reconcile']){const r=await call(path);safe(r.body);assert.equal(r.body.status,'unconfirmed');}
 },{stores:false}));
 await t.test('concurrent and fresh native RPC invocations preserve one fixed registration',()=>own({},async(call,db,kv)=>{
  const raced=await Promise.all([call('register'),call('register')]);raced.forEach(r=>safe(r.body));
  const r=(await call('reconcile')).body;safe(r);assert.equal(r.status,'confirmed');
  assert.equal(r.redirectUri,'https://chatgpt.com/connector/oauth/ci_private_1');
  assert.equal((await call('register')).body.clientId,r.clientId);
  const rows=await db.prepare('SELECT * FROM preparation_client_bootstrap').all();assert.equal(rows.results.length,1);assert.equal(rows.results[0].client_id,r.clientId);
  const keys=await kv.list();assert.equal(keys.keys.length,1);assert.equal(keys.keys[0].name,'client:'+r.clientId);
  const metadata=await kv.get(keys.keys[0].name,'json');assert.equal(metadata.tokenEndpointAuthMethod,'none');assert.deepEqual(metadata.redirectUris,[r.redirectUri]);
  assert.deepEqual(metadata.grantTypes,['authorization_code']);assert.equal(metadata.clientSecret,undefined);
 }));
 await t.test('HTTP never opens registration and RPC arguments never select policy',()=>own({},async(call,db,kv)=>{
  for(const path of ['http/register','http/authorize','http/mcp','http/oauth/token']){
   const res=await call(path,{method:'POST',body:'PRIVATE caller data'});assert.equal(res.status,404);assert.equal(res.cache,'no-store');assert.equal(res.body.executionAllowed,false);
  }
  const r=(await call('args')).body;safe(r);assert.equal(r.status,'blocked');
  assert.equal((await db.prepare('SELECT COUNT(*) AS count FROM preparation_client_bootstrap').first()).count,0);assert.equal((await kv.list()).keys.length,0);
  assert.equal((await call('private')).body.denied,true);assert.equal((await call('helper')).body.denied,true);
 }));
 const expired={redirectUri:'https://chatgpt.com/connector/oauth/ci_private_1',operationId:'ci-private-1',
  startedAt:new Date(Date.now()-700000).toISOString(),expiresAt:new Date(Date.now()-100000).toISOString()};
 for(const changes of [
  {AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:'PRIVATE malformed'},
  {AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:JSON.stringify({...expired,unknown:true})},
  {AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:JSON.stringify(expired)},
  {AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:'x'.repeat(2049)},
  {[flags[0]]:'true'},
 ])await t.test('invalid server policy or preparation flag has no storage effects',()=>own(changes,async(call,db,kv)=>{
  const r=(await call('register')).body;safe(r);assert.equal(r.status,'unconfirmed');
  assert.equal((await db.prepare('SELECT COUNT(*) AS count FROM preparation_client_bootstrap').first()).count,0);assert.equal((await kv.list()).keys.length,0);
 }));
 await t.test('real changed KV metadata forbids later RPC confirmation without recreating',()=>own({},async(call,db,kv)=>{
  const first=(await call('register')).body;assert.equal(first.status,'confirmed');
  const key='client:'+first.clientId,metadata=await kv.get(key,'json');
  await kv.put(key,JSON.stringify({...metadata,redirectUris:['https://chatgpt.com/connector/oauth/wrong']}));
  const changed=(await call('reconcile')).body;safe(changed);assert.equal(changed.status,'unconfirmed');
  safe((await call('register')).body);assert.equal((await kv.list()).keys.length,1);
  assert.equal((await db.prepare('SELECT client_id FROM preparation_client_bootstrap').first()).client_id,first.clientId);
 }));
});
test('private maintenance build requires explicit revision and hashes actual emitted bytes',async()=>{
 await required('scripts/build-preparation-maintenance-worker.mjs','missing private preparation maintenance build');
 const {buildPreparationMaintenanceWorker}=await import('../scripts/build-preparation-maintenance-worker.mjs');
 for(const sourceRevision of [undefined,'main','A'.repeat(40),'a'.repeat(39)])await assert.rejects(buildPreparationMaintenanceWorker({sourceRevision}));
 const built=await buildPreparationMaintenanceWorker({sourceRevision:revision});
 assert.equal(built.sourceRevision,revision);assert.ok(Buffer.byteLength(built.script)>0&&Buffer.byteLength(built.script)<=2097152);
 assert.equal(built.workerHash,createHash('sha256').update(built.script).digest('hex'));assert.equal(Object.isFrozen(built),true);
});
