import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('preparation maintenance uses durable admission with actual SDK and storage',{timeout:120000},async t=>{
 let source;try{source=await readFile('lib/preparation-client-maintenance.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing preparation client maintenance feature');
 const ddl=await readFile('db/preparation-client-bootstrap.sql','utf8');
 const bundle=await build({entryPoints:['test/fixtures/preparation-client-maintenance-worker.mjs'],bundle:true,format:'esm',platform:'neutral',
  mainFields:['module','main'],conditions:['workerd','worker','browser'],target:'es2022',write:false,external:['cloudflare:workers','node:*']});
 async function own(run){
  const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
   script:bundle.outputFiles[0].text,kvNamespaces:['OAUTH_KV'],d1Databases:{DB:'maintenance-ci-only'}}));
  try{
   const db=await runtime.getD1Database('DB');await db.prepare(ddl).run();
   const call=async(path,body)=>{const response=await runtime.dispatchFetch('https://preparation.example.invalid/__ci/'+path,
    body===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});assert.equal(response.status,200);return response.json();};
   await run(call,db);
  }finally{await runtime.dispose();}
 }
 function safe(r){
  for(const k of ['executionAllowed','chargeAllowed','publicationAllowed','authorizationGranted','operationalReadiness'])assert.equal(r[k],false);
  assert.equal(r.automaticRetry,false);assert.doesNotMatch(JSON.stringify(r),/PRIVATE|clientSecret|client_secret|access_token|refresh_token/);
 }
 await t.test('disabled and invalid options never bootstrap',()=>own(async call=>{
  assert.deepEqual(await call('default'),{defaultClosed:true,disabledClosed:true,touched:0});
  assert.deepEqual((await call('invalid')).failures,Array(6).fill(true));
  const stats=await call('stats');assert.equal(stats.writes,0);assert.equal(stats.row,null);
 }));
 await t.test('one actual public client survives repeated calls and new factories',()=>own(async(call,db)=>{
  const r=await call('register');safe(r);assert.equal(r.status,'confirmed');assert.match(r.clientId,/^[A-Za-z0-9_-]{1,128}$/);
  assert.equal(r.redirectUri,'https://chatgpt.com/connector/oauth/ci_callback_1');
  const again=await call('register');assert.equal(again.clientId,r.clientId);
  await call('recreate');const rec=await call('reconcile');safe(rec);assert.equal(rec.clientId,r.clientId);
  const stats=await call('stats');assert.equal(stats.writes,1);assert.equal(stats.claimWrites,1);assert.equal(stats.row.client_id,r.clientId);
  assert.equal(stats.keyNames.length,1);assert.match(stats.keyNames[0],/^client:/);
  const names=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE '_cf_%'").all();
  assert.deepEqual(names.results.map(x=>x.name),['preparation_client_bootstrap']);
 }));
 await t.test('independent calls contend on one primary slot',()=>own(async call=>{
  const values=await Promise.all([call('register'),call('register')]);values.forEach(safe);
  await call('recreate');const r=await call('reconcile');safe(r);assert.equal(r.status,'confirmed');
  const stats=await call('stats');assert.equal(stats.writes,1);assert.equal(stats.claimWrites,1);
 }));
 await t.test('committed D1 claim with lost ACK never dispatches SDK create',()=>own(async call=>{
  await call('mode',{mode:'claim-ack-loss'});const r=await call('register');safe(r);assert.equal(r.status,'unconfirmed');
  await call('mode',{mode:''});await call('recreate');const again=await call('register');safe(again);assert.equal(again.status,'unconfirmed');
  const stats=await call('stats');assert.equal(stats.writes,0);assert.equal(stats.claimWrites,1);assert.ok(stats.row);assert.equal(stats.row.client_id,null);
 }));
 await t.test('lost SDK ACK and invisible/incomplete KV reconcile without recreation',()=>own(async call=>{
  await call('mode',{mode:'sdk-ack-loss'});safe(await call('register'));
  await call('mode',{mode:'invisible'});await call('recreate');const invisible=await call('register');safe(invisible);assert.equal(invisible.status,'unconfirmed');
  await call('mode',{mode:'incomplete'});const incomplete=await call('reconcile');safe(incomplete);assert.equal(incomplete.status,'unconfirmed');
  await call('mode',{mode:''});const recovered=await call('reconcile');safe(recovered);assert.equal(recovered.status,'confirmed');
  const stats=await call('stats');assert.equal(stats.writes,1);assert.equal(stats.claimWrites,1);
 }));
 await t.test('late SDK completion cannot reset original deadline or admit another create',()=>own(async call=>{
  await call('mode',{mode:'sdk-late'});const started=Date.now(),r=await call('register');safe(r);
  assert.equal(r.status,'unconfirmed');assert.ok(Date.now()-started<8000);
  let stats=await call('stats');assert.equal(stats.writes,1);assert.equal(stats.row.client_id,null);
  await call('release');await call('mode',{mode:''});await call('recreate');const rec=await call('reconcile');safe(rec);assert.equal(rec.status,'confirmed');
  stats=await call('stats');assert.equal(stats.writes,1);
 }));
 await t.test('drift after actual KV write forbids acceptance, later metadata-only reconciliation works',()=>own(async call=>{
  await call('mode',{mode:'sdk-drift'});const r=await call('register');safe(r);assert.equal(r.status,'unconfirmed');
  await call('restore');await call('mode',{mode:''});await call('recreate');const rec=await call('reconcile');safe(rec);assert.equal(rec.status,'confirmed');
  assert.equal((await call('stats')).writes,1);
 }));
 await t.test('expiry and competing manifest never create another client',()=>own(async call=>{
  const first=await call('register');assert.equal(first.status,'confirmed');
  await call('change-operation');const conflict=await call('register');safe(conflict);assert.equal(conflict.status,'blocked');
  await call('expire');const expired=await call('reconcile');safe(expired);assert.notEqual(expired.status,'confirmed');
  assert.equal((await call('stats')).writes,1);
 }));
 for(const mode of ['tamper','duplicate'])await t.test(mode+' is rejected without deleting or replacing client',()=>own(async call=>{
  assert.equal((await call('register')).status,'confirmed');await call(mode);
  const rec=await call('reconcile');safe(rec);assert.notEqual(rec.status,'confirmed');
  const before=(await call('stats')).writes;safe(await call('register'));assert.equal((await call('stats')).writes,before);
 }));
});
