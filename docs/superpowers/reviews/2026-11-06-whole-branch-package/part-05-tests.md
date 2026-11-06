# Whole-branch review packet 5/26 — tests

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 33 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- test/delegated-oauth-flow.test.mjs: 7d3448521c1ad337493b48ab4ed8e836a25a0603 -> 8c9bab35b37ee6c74dd6fd9c4b2e307ff8f214f4; full diff chars=7574
- test/dossier-monitoring-oauth-native.test.mjs: 68007b6fca4e96240cda1875770acbd95e21dfcb -> 1b2be1b11aef877916e3e971562782f0169fb5c5; full diff chars=6265
- test/fixtures/named-confirmation-native-rehearsal.mjs: 010b1c57f4d977e601bf53d4b695851a54b7a256 -> 44e6f8b4e441065147fc8a2be5bb0207a8d9c750; full diff chars=14280
- test/mcp-node-process-custody.test.mjs: 0c348f73349e6c5f38379369056df93ba5f1ac71 -> 178eb3c10263b76f6c0f09c3503ca51c445345fe; full diff chars=3420
- test/mcp-original-container-runtime.test.mjs: e14f5ce22dc4bffee64f8ff3d904d058a15a1cf5 -> a8ac02545119d6598f7aac801870b8fdcbfd2369; full diff chars=12097
- test/mcp-own-permissions-only-reduction-native.test.mjs: ef9cbe38c475f1b4644955d73d4f016fee053f5a -> bc6adf6f26f58d35962de23357d1c8a8ac330560; full diff chars=2321
- test/mcp-release-known-cancellation.test.mjs: 87c9779f67cc26ec4cf553da6ed4f8af1298b3d0 -> 304ed29963093383f7dcaa3556fdf3072db36669; full diff chars=4945
- test/mcp-successor-launch-gate.test.mjs: df1d82fa2076dc4b97e5f6fae7b3c280f79163e3 -> d6ebf092a1e68d1f0083655b19ef5268ffc6c08f; full diff chars=11250
- test/mcp-successor-reservation.test.mjs: e6b1c785c4ab7c15e13b7f362ecbec72499d2cad -> 63cd17c13c78ff9aa6fe1078b59ab49097994782; full diff chars=2883
- test/build-finite-native-package.test.mjs: ABSENT -> 3b20f8a64ffbb6cfdb033c9c0941e9acd028032e; full diff chars=5421
- test/finite_archive_test.py: ABSENT -> 57ca96d3d4fcb1d693a4c0b43b4a047dc4343a34; full diff chars=6654
- test/fixtures/finite-admission-gate.mjs: ABSENT -> b16c7c8c678f5b5a6ae7ae67a1581a22e8129eef; full diff chars=2865
- test/fixtures/finite-bootstrap-world.mjs: ABSENT -> 02092a0ee7a5f566632ecd7ae461386d6bdde047; full diff chars=4895
- test/fixtures/finite-cf-http.mjs: ABSENT -> b0897d389ef3c1a0f057422ffc332e3e024d3a93; full diff chars=7123
- test/fixtures/finite-cleanup-proof.mjs: ABSENT -> 7d6bad1af0e42c9eb09be126779e536283dbf4f3; full diff chars=2577
- test/fixtures/finite-connection-owner-source.mjs: ABSENT -> 2a312b19d396d8474b2ac1307ed7a1a5c49f98ce; full diff chars=671
- test/fixtures/finite-connection-source.mjs: ABSENT -> ebe7a1d226dc73d1ff4131dd82eace7ece4a2c46; full diff chars=6986
- test/fixtures/finite-connection-worker.mjs: ABSENT -> d692ea6a96d290cf2e1d5562a170d6dcee6dd665; full diff chars=6316
- test/fixtures/finite-finalizer.mjs: ABSENT -> d3b254e9a21fc816ef6520bdff0f4abafe34f6ea; full diff chars=6088
- test/fixtures/finite-first-connection-publication.mjs: ABSENT -> 6a6950bbe7e956d3b7f19e1a04c5aa6f6ca7b379; full diff chars=50666
- test/fixtures/finite-github.mjs: ABSENT -> 5a0892424381a6edb356f95da66ea2657665136e; full diff chars=5077
- test/fixtures/finite-http-module.mjs: ABSENT -> cfbc564074d298cc333ddbb922ba7c19a96065fb; full diff chars=5002
- test/fixtures/finite-initial-entry-world.mjs: ABSENT -> 297b57846bbbe13bfc80ac52c5b033a382aef4b6; full diff chars=80610
- test/fixtures/finite-initial-history-world.mjs: ABSENT -> 74f9ca6470d596c0da1247bb9d9f464a80b9ec78; full diff chars=9649
- test/fixtures/finite-launch-native.mjs: ABSENT -> 80754f609ce55b62a1a4bc54c164802483f2b912; full diff chars=3520
- test/fixtures/finite-launch-operations-native.mjs: ABSENT -> e20d562bbe152e949943f90c7a016ad7025d184d; full diff chars=3159
- test/fixtures/finite-native-conduit-receiver.mjs: ABSENT -> 3d9329fe529a233686cff37b334d2ffb7944043a; full diff chars=2778
- test/fixtures/finite-native-conduit-sender.mjs: ABSENT -> a1703f6f5dd1307c42b30a7de150a1985282842c; full diff chars=1838
- test/fixtures/finite-nominal-control.mjs: ABSENT -> ef137edcb5f52285a7a39b1c043deead8c27fede; full diff chars=1259
- test/fixtures/finite-owner-component-host.mjs: ABSENT -> c749d25221d5810fe86c798c88bca98a33b014ff; full diff chars=4062
- test/fixtures/finite-owner-io-fanout.mjs: ABSENT -> e181bfd7634b6f71e4129b03fbb529a2f1b04f10; full diff chars=10426
- test/fixtures/finite-owner-native.mjs: ABSENT -> 79270d99c3d304f1f7149066827a42cc4d8f196c; full diff chars=6551
- test/fixtures/finite-owner-notice-get.mjs: ABSENT -> 3d279975e67611e72e2d1661970718ad4a3892bf; full diff chars=43111

## test/delegated-oauth-flow.test.mjs

~~~~~~~~~~diff
diff --git a/test/delegated-oauth-flow.test.mjs b/test/delegated-oauth-flow.test.mjs
--- a/test/delegated-oauth-flow.test.mjs
+++ b/test/delegated-oauth-flow.test.mjs
@@ -1,20 +1,42 @@
 import assert from 'node:assert/strict';
 import test from 'node:test';
 import { registerHooks } from 'node:module';
 import { readFileSync } from 'node:fs';
 import { Client,StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
 import { localOAuthFixture,authorize,approve,exchange,handle,cookies } from './fixtures/delegated-oauth-runtime.mjs';
 
 // Provider imports only the WorkerEntrypoint base; crypto/protocol/storage are real.
 // Actual workerd bundling/runtime is a separate check, not represented by this shim.
-const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
+// Static source-module replacement only; no production hook registration.
+const finiteHookState={events:[],late:false};
+globalThis[Symbol.for('afw.finite.synthetic-hooks')]=finiteHookState;
+const finiteSource=`
+export function readPrivateQaFiniteOwnerSource(){throw Error('synthetic source unavailable');}
+async function observe(kind,args,lease){
+ const state=globalThis[Symbol.for('afw.finite.synthetic-hooks')],event={kind,leaseActive:false,preserved:false};
+ state.events.push(event);
+ const original=Date.now;if(state.late)Date.now=()=>original()+30001;
+ try{lease.assertCurrent();event.leaseActive=true;
+  event.preserved=args.request instanceof Request&&args.request.headers.has('Cookie')&&(args.request.method==='GET'||(await args.request.text()).includes('decision=approve'));
+  throw Error('synthetic preparation link failure after genuine SDK success');
+ }finally{Date.now=original;}
+}
+export const forwardPrivateQaFiniteOwnerAuthorization=(args,lease)=>observe('authorization',args,lease);
+export const forwardPrivateQaFiniteOwnerGrant=(args,lease)=>observe('grant',args,lease);
+export const forwardPrivateQaFiniteOwnerNotice=(args,lease)=>observe('notice',args,lease);
+`;
+const hook=registerHooks({resolve(s,c,next){
+ if(s==='cloudflare:workers')return {url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true};
+ if(s.endsWith('/mcp-qa-finite-owner-source.mjs'))return {url:'data:text/javascript,'+encodeURIComponent(finiteSource),shortCircuit:true};
+ return next(s,c);
+}});
 const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');
 hook.deregister();
 
 test('valid OAuth transport delivers read recovery and resumes with the same consent after storage returns',async()=>{
   const f=await localOAuthFixture(createDelegatedOAuthWorker);
   const client=new Client({name:'afw-recovery-transport-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
   const statuses=[];
   const originalPrepare=f.env.DB.prepare;
   let unavailable=false;
   try {
@@ -541,11 +563,53 @@
     const grant=f.sqlite.prepare('SELECT created_at,expires_at FROM delegated_access_grants').get();
     assert.equal(Date.parse(grant.expires_at)-Date.parse(grant.created_at),600000);
     f.setTime(grant.expires_at);
     assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,200);
     const expired=await client.callTool({name:'read_project_summary',arguments:{}});
     assert.equal(expired.structuredContent.code,'delegated_access_denied');
     assert.equal(expired.structuredContent.data,undefined);
     f.env.AFW_DELEGATED_OAUTH_ENABLED='false';
     assert.equal((await f.request('/.well-known/oauth-authorization-server',{},null)).status,404);
   }finally{await client.close();f.close();}
+});
+
+test('fixed preparation link failure preserves genuine completed OAuth grant and ordinary redirect',async()=>{
+ finiteHookState.events=[];finiteHookState.late=false;
+ const f=await localOAuthFixture(createDelegatedOAuthWorker),base=f.request;
+ f.request=(path,options={},identity='owner-a')=>base(path,{...options,headers:{...options.headers,Cookie:[options.headers?.Cookie,'__Host-afw-finite-prepare='+'a'.repeat(64)].filter(Boolean).join('; ')}},identity);
+ try{
+  const a=await authorize(f),approved=await approve(f,a,{scope:['afw:project:read']});
+  assert.equal(approved.status,302);
+  const grant=f.sqlite.prepare('SELECT * FROM delegated_access_grants').get();
+  assert.equal(grant.revoked_at,'');assert.deepEqual(JSON.parse(grant.scopes_json),['afw:project:read']);
+  assert.deepEqual(finiteHookState.events.map(e=>({kind:e.kind,leaseActive:e.leaseActive,preserved:e.preserved})),[{kind:'authorization',leaseActive:true,preserved:true},{kind:'authorization',leaseActive:true,preserved:true},{kind:'grant',leaseActive:true,preserved:true}]);
+  assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM delegated_access_grants').get().n,1);
+  assert.equal((await exchange(f,approved.headers.get('Location'),a.verifier)).status,200);
+ }finally{f.close();finiteHookState.events=[];}
+});
+test('late preparation hook cannot replace the original request lease and does not revoke SDK success',async()=>{
+ finiteHookState.events=[];finiteHookState.late=false;
+ const f=await localOAuthFixture(createDelegatedOAuthWorker),base=f.request;
+ f.request=(path,options={},identity='owner-a')=>base(path,{...options,headers:{...options.headers,Cookie:[options.headers?.Cookie,'__Host-afw-finite-prepare='+'a'.repeat(64)].filter(Boolean).join('; ')}},identity);
+ try{
+  const a=await authorize(f);finiteHookState.events=[];finiteHookState.late=true;
+  const approved=await approve(f,a,{scope:['afw:project:read']});
+  assert.equal(approved.status,302);assert.equal(f.sqlite.prepare('SELECT revoked_at FROM delegated_access_grants').get().revoked_at,'');
+  assert.deepEqual(finiteHookState.events.map(e=>({kind:e.kind,leaseActive:e.leaseActive})),[{kind:'authorization',leaseActive:false},{kind:'grant',leaseActive:false}]);
+ }finally{finiteHookState.late=false;finiteHookState.events=[];f.close();}
+});
+
+test('cross-site initial consent without prep cookie binds only the genuine same-origin pregrant POST',async()=>{
+ finiteHookState.events=[];finiteHookState.late=false;
+ const f=await localOAuthFixture(createDelegatedOAuthWorker),base=f.request;
+ f.request=(path,options={},identity='owner-a')=>base(path,{...options,headers:{...options.headers,...(options.method==='POST'?{Cookie:[options.headers?.Cookie,'__Host-afw-finite-prepare='+'a'.repeat(64)].filter(Boolean).join('; ')}:{})}},identity);
+ try{
+  const a=await authorize(f);
+  assert.equal(a.response.status,200);assert.deepEqual(finiteHookState.events,[]);
+  const wrong=await f.request('/authorize',{method:'POST',headers:{Origin:f.issuer,Cookie:a.cookie,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:'unrelated-sdk-handle',decision:'approve',project:'p-a',scope:'afw:project:read'})});
+  assert.notEqual(wrong.status,302);assert.deepEqual(finiteHookState.events,[]);
+  const result=await approve(f,a,{scope:['afw:project:read']});assert.equal(result.status,302);
+  assert.deepEqual(finiteHookState.events.map(e=>({kind:e.kind,leaseActive:e.leaseActive,preserved:e.preserved})),[{kind:'authorization',leaseActive:true,preserved:true},{kind:'grant',leaseActive:true,preserved:true}]);
+  assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM delegated_access_grants').get().n,1);
+  assert.equal(f.sqlite.prepare('SELECT revoked_at FROM delegated_access_grants').get().revoked_at,'');
+ }finally{f.close();finiteHookState.events=[];}
 });

~~~~~~~~~~

## test/dossier-monitoring-oauth-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/dossier-monitoring-oauth-native.test.mjs b/test/dossier-monitoring-oauth-native.test.mjs
--- a/test/dossier-monitoring-oauth-native.test.mjs
+++ b/test/dossier-monitoring-oauth-native.test.mjs
@@ -11,31 +11,47 @@
  const owner=await jwt('owner'),foreign=await jwt('foreign');
  const schemas=['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].flatMap(p=>[...readFileSync(p,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]));
  const contents=`
 import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
 import {verifyCloudflareAccessJwt} from './lib/cloudflare-access-identity.mjs';
 import {createLocalJWKSet} from 'jose';
 const issuer='https://private.example.invalid',keySet=createLocalJWKSet({keys:[${JSON.stringify(key)}]});
 const worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp',accessVerifier:o=>verifyCloudflareAccessJwt({...o,keySet})});
 let policy;
 export default{async fetch(request,env,ctx){
+ if(new URL(request.url).pathname==='/fixture/notice-hooks')return Response.json(globalThis[Symbol.for('finite.notice.hooks')]??[]);
  if(new URL(request.url).pathname==='/seed'){
   const epoch=Date.now();policy=JSON.stringify({startAt:epoch-100,expiresAt:epoch+299900,projectId:'p',grantId:'g',clientId:'client'});
   await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,organization TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
   for(const sql of ${JSON.stringify(schemas)})await env.DB.prepare(sql).run();
   await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?,?)').bind('p','owner',1,'Mi empresa').run();
   await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',issuer+'/mcp','["afw:project:read"]',new Date(epoch+300000).toISOString(),'').run();return Response.json({});
  }
  return worker.fetch(request,{...env,AFW_DOSSIER_MONITORING_OWNER_POLICY:policy,AFW_DOSSIER_MONITORING_OWNER_ENABLED:request.headers.get('X-Fixture-Enabled')==='true'?'true':'false'},ctx);
 }};`;
- const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],conditions:['workerd','worker','browser'],external:['node:*','cloudflare:*']});
+ const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],conditions:['workerd','worker','browser'],external:['node:*','cloudflare:*'],plugins:[{name:'fixed-synthetic-notice-source',setup(b){
+ b.onResolve({filter:/mcp-qa-finite-owner-source\.mjs$/},()=>({path:'finite-notice-source',namespace:'synthetic'}));
+ b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({loader:'js',contents:`
+ export function readPrivateQaFiniteOwnerSource(){throw Error('synthetic source unavailable');}
+ export function forwardPrivateQaFiniteOwnerAuthorization(){throw Error('unused');}
+ export function forwardPrivateQaFiniteOwnerGrant(){throw Error('unused');}
+ export async function forwardPrivateQaFiniteOwnerNotice(args,lease){
+  lease.assertCurrent();const body=await args.request.text();lease.assertCurrent();
+  const events=globalThis[Symbol.for('finite.notice.hooks')]??=[];
+  events.push({method:args.request.method,path:new URL(args.request.url).pathname,preserved:body.startsWith('handle='),sequence:args.sequence,requestIdPresent:typeof args.requestId==='string'});
+  throw Error('synthetic link unavailable after real acknowledgement');
+ }`}));
+ }}]});
  const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'monitor-oauth-native'},kvNamespaces:['OAUTH_KV'],ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'88390',simple:{limit:30,period:60}}},bindings:{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'stable',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'own.cloudflareaccess.com',ACCESS_AUD:'own'}}));
- const call=(path,token,enabled=true,body,cookie)=>runtime.dispatchFetch('https://private.example.invalid'+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token??'','X-Fixture-Enabled':String(enabled),...(body?{Origin:'https://private.example.invalid','Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}:{})},...(body?{body}:{})});
+ const call=(path,token,enabled=true,body,cookie)=>runtime.dispatchFetch('https://private.example.invalid'+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token??'','X-Fixture-Enabled':String(enabled),...(body?{Origin:'https://private.example.invalid','Content-Type':'application/x-www-form-urlencoded',Cookie:cookie+'; __Host-afw-finite-prepare='+'a'.repeat(64)}:{})},...(body?{body}:{})});
  const form=async()=>{const r=await call('/monitoring',owner);assert.equal(r.status,200);const html=await r.text();return{handle:html.match(/name="handle" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie').split(';')[0]};};
  try{
   assert.equal((await call('/seed')).status,200);assert.equal((await call('/monitoring',owner,false)).status,404);
   assert.equal((await call('/monitoring','invalid')).status,401);assert.equal((await call('/monitoring',foreign)).status,403);
   const p=await form();assert.equal((await call('/monitoring/grant',owner,true,'handle='+p.handle,p.cookie)).status,200);assert.equal((await call('/monitoring/grant',owner,true,'handle='+p.handle,p.cookie)).status,200);
   const revoke=await form();assert.equal((await call('/monitoring/revoke',owner,true,'handle='+revoke.handle,revoke.cookie)).status,200);
   assert.match(await (await call('/monitoring',owner)).text(),/Retiraste los avisos/);
+  const hooks=await (await call('/fixture/notice-hooks')).json();
+  assert.equal(hooks.length,2);
+  assert.ok(hooks.every(h=>h.method==='POST'&&h.path==='/monitoring/grant'&&h.preserved&&h.requestIdPresent&&h.sequence===1));
  }finally{await runtime.dispose();}
 });

~~~~~~~~~~

## test/fixtures/named-confirmation-native-rehearsal.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/named-confirmation-native-rehearsal.mjs b/test/fixtures/named-confirmation-native-rehearsal.mjs
--- a/test/fixtures/named-confirmation-native-rehearsal.mjs
+++ b/test/fixtures/named-confirmation-native-rehearsal.mjs
@@ -1,54 +1,74 @@
 import assert from 'node:assert/strict';
 import {readFileSync} from 'node:fs';
 import {build as compileFixture} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
-import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
+import {createHash} from 'node:crypto';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
 import {RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
 import {inertNamedConfirmationPolicy} from './inert-named-confirmation-policy.mjs';
 import {reservationFaultHarness} from './reservation-fault-harness.mjs';
 import {knownCancellationNativeHarness,seedKnownCancellationFault} from './known-cancellation-native-harness.mjs';
 import {namedHistoryFixture,seedNamedHistoryFixture} from './named-known-cancellation.mjs';
 
 // CI-only composition. Actual compiled operator, native Workflow/D1/namespace,
 // exact historical module bytes; ALL provider replies and identities synthetic.
-export async function rehearseExactNamedConfirmation({artifact,build,mode,payloadMode='object',invocation='workflow',reserve=null,retirement='stopped',replay=false,fault=null,historyFixture=false,historyMode='known_cancellation',nativeFault=null,measure=false,replayExpected='uncertain'}){
+export function rehearseExactNamedConfirmation(options){return rehearseNamedConfirmation(false,options);}
+export function rehearseExactFiniteNamedConfirmation({artifact,mode='confirmed',payloadMode='object',retirement='stopped',replay=false,fault=null,nativeFault=null,measure=false,replayExpected='uncertain',witness=false}){
+ return rehearseNamedConfirmation(true,{artifact,mode,payloadMode,retirement,replay,fault,nativeFault,measure,replayExpected,build:bundle=>buildFiniteKnownFixture(bundle,witness),reserve:'true',historyMode:'known_cancellation',invocation:'workflow'});
+}
+// Unmounted test-only wrapper: the ACTUAL fixed finite Known core receives the
+// exact native event and step. No legacy validator or RPC operator is involved.
+async function buildFiniteKnownFixture(bundle,witness){
+ const source="import {WorkflowEntrypoint} from 'cloudflare:workers';import {runFiniteKnownCancellationReleaseWorkflow} from './lib/mcp-release-runtime.mjs';const bundle="+JSON.stringify(bundle)+";export class AfwReleaseWorkflow extends WorkflowEntrypoint{run(event,step){return runFiniteKnownCancellationReleaseWorkflow({bundle,env:this.env,event,step});}}export default{fetch(){return new Response(null,{status:404});}};";
+ const result=await compileFixture({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'finite-known-native-test.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ let script=result.outputFiles[0].text;
+ if(witness){
+  const anchor=/const authorize = async \(stage, signal\) => \{/g,settled=/active = false;\s*if \(onAbort\)/g;
+  assert.equal([...script.matchAll(anchor)].length,1);assert.equal([...script.matchAll(settled)].length,1);
+  script=script.replace(anchor,match=>match+' const __stageStart=performance.now(); globalThis.__knownStageWitness?.push(stage);').replace(settled,match=>'globalThis.__knownHookMs += performance.now()-__stageStart; '+match);
+ }
+ return {script,planHash:createHash('sha256').update(JSON.stringify(bundle)).digest('hex'),fixtureHistory:namedHistoryFixture(bundle)};
+}
+async function rehearseNamedConfirmation(finite,{artifact,build,mode,payloadMode='object',invocation='workflow',reserve=null,retirement='stopped',replay=false,fault=null,historyFixture=false,historyMode='known_cancellation',nativeFault=null,measure=false,replayExpected='uncertain'}){
+
  assert.ok(['known_cancellation','original_only'].includes(historyMode),'Unknown native history fixture mode');
  const completeHistory=reserve==='true'||historyFixture;
  if(!['confirmed','tail-corrupt','regional-incident','metadata-reject','second-active'].includes(mode))throw Error('Unknown CI rehearsal');
  const compiledIdentity=await compileFixture({stdin:{resolveDir:process.cwd(),sourcefile:'named-custody-fixture.mjs',contents:`
 import {DurableObject} from 'cloudflare:workers';
 import {createRetiredRpcReceipt} from './lib/mcp-retired-rpc-receipt.mjs';
 export class Own extends DurableObject{
  serverNow(){return Date.now()+(this.env.RETIREMENT==='server-ahead'?21:0);}
  observeRetired(){
   if(!this.env.RETIRED)throw Error('No custody');const r=JSON.parse(this.env.RETIRED);
   return {...r,observedAt:this.env.RETIREMENT==='future-string'?String(this.serverNow()+1000):this.env.RETIREMENT==='future-unsafe'?8640000000000001:this.serverNow()+(this.env.RETIREMENT==='stale'?-31000:this.env.RETIREMENT==='future'?1000:0),...(this.env.RETIREMENT==='mismatch'?{programHash:'0'.repeat(64)}:{})};
  }
  observeRetiredReceipt(challenge){return createRetiredRpcReceipt({challenge,now:()=>this.serverNow(),observe:async()=>({value:this.observeRetired()})});}
  fetch(){throw Error('No actor launch in package qualification');}
 }
 export default{fetch(r,e){return Response.json({original:e.NODE.idFromName('afw-own-event-one-occurrence-v1').toString()});}}
 `},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none'});
- const identity={name:'identity',modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:compiledIdentity.outputFiles[0].text,durableObjects:{NODE:{className:'Own',useSQLite:true}}};
+ const identity={name:'identity',modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:finite?['nodejs_compat','global_fetch_strictly_public','enable_request_signal']:['nodejs_compat'],script:compiledIdentity.outputFiles[0].text,durableObjects:{NODE:{className:'Own',useSQLite:true}}};
  const mf=new Miniflare(convertV4MiniflareOptions({workers:[identity]}));
  try{
   const ids=await (await (await mf.getWorker('identity')).fetch('https://synthetic.invalid/ids')).json();
   const policy=inertNamedConfirmationPolicy(artifact),window={startAt:Date.now()-1000,expiresAt:Date.now()+120000};
   Object.assign(policy,window);Object.assign(policy.plan,window);
   const config=policy.observation.configuration,manifestBinding=config.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(manifestBinding.text);
   manifest.original.containerId=ids.original;Object.assign(manifest.candidate,window);manifestBinding.text=JSON.stringify(manifest);
   const events=config.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');events.text=JSON.stringify({...JSON.parse(events.text),...window});
   // Mirror the real provider's Container-linked export and attachment shape.
   config.exports.AfwOwnEventNode.container='agent-friendly-web-delegated-canary-afwowneventnode';
   config.containers=[{class_name:'AfwOwnEventNode',name:'agent-friendly-web-delegated-canary-afwowneventnode'}];
-  policy.plan.configurationHash=activationConfigurationHash(config);
+  if(finite)config.compatibility_flags=['nodejs_compat','global_fetch_strictly_public','enable_request_signal'];
+  policy.plan.configurationHash=(finite?finiteActivationConfigurationHash:activationConfigurationHash)(config);
   const compiled=await build({artifact,policy}),{versionId,deploymentId}=policy.observation,etag='f'.repeat(64);
   const counters={providerReads:0,apiReads:0,largestReplyBytes:0,...(reserve!==null?{retirementReads:0}:{})},root='https://api.cloudflare.com/client/v4/accounts/'+RELEASE_TARGET.accountId;
   const urls={module:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId+'?include=modules',metadata:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId,legacy:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/versions/'+versionId,deployments:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/deployments',application:root+'/containers/applications/'+RELEASE_TARGET.namespaceId,instance:root+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances/'+ids.original};
   const outboundService=async request=>{
    assert.equal(request.method,'GET','qualification must never publish');
    if(request.url==='https://www.cloudflarestatus.com/api/v2/incidents.json'){
     counters.providerReads++;
     const incidents=[{id:'cbvocc87nsne',name:'Workers Cron Trigger Activation Issues',status:'resolved',updated_at:'2026-10-14T00:00:00.000Z',components:[],incident_updates:[]}];
     if(mode==='regional-incident')incidents.push({id:'ciworkersregion',name:'Regional elevated errors',status:'investigating',updated_at:'2026-10-14T00:00:00.000Z',components:[{name:'Workers'}],incident_updates:[]});
     return Response.json({page:{url:'https://www.cloudflarestatus.com'},incidents});
@@ -64,29 +84,38 @@
    else{
     result={id:versionId,...config,number:1,startup_time_ms:1,annotations:{'workers/message':'CI-only provider projection'},urls:[],source:'api',created_on:'2026-10-14T00:00:00.000Z',author_id:'ci-only',author_email:'ci-only@example.invalid',env:Object.fromEntries(config.bindings.map(b=>[b.name,null]))};
     if(request.url===urls.module){
      const bytes=Buffer.from(artifact.script);if(mode==='tail-corrupt')bytes[bytes.length-1]^=1;
      result.modules=[{name:'index.mjs',content_type:'application/javascript+module',content_base64:bytes.toString('base64')}];
     }
    }
    const encoded=JSON.stringify({success:true,errors:[],result});counters.largestReplyBytes=Math.max(counters.largestReplyBytes,Buffer.byteLength(encoded));
    return new Response(encoded,{headers:{'Content-Type':'application/json'}});
   };
-  const operator={name:'operator',modules:true,script:compiled.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',scriptName:'identity'}},d1Databases:{RELEASE_DB:'exact-named-rehearsal'},workflows:{FLOW:{name:'afw-exact-confirmation-qualification',className:'AfwReleaseWorkflow'}},outboundService};
+  const operator={name:'operator',modules:true,script:compiled.script,compatibilityDate:'2026-09-07',compatibilityFlags:finite?['nodejs_compat','enable_request_signal']:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',scriptName:'identity'}},d1Databases:{RELEASE_DB:'exact-named-rehearsal'},workflows:{FLOW:{name:'afw-exact-confirmation-qualification',className:'AfwReleaseWorkflow'}},outboundService};
   if(reserve!==null)operator.bindings.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED=reserve;
   if(measure||nativeFault!==null)operator.script+='\n'+knownCancellationNativeHarness({fault:nativeFault,policyExpiresAt:window.expiresAt,grantId:JSON.parse(events.text).grantId});
+  // Test-only credential observation, outside the untouched Known core.
+  if(finite&&(measure||nativeFault!==null))operator.script+=`
+const __finiteMeasuredRun=AfwReleaseWorkflow.prototype.run;
+AfwReleaseWorkflow.prototype.run=async function(event,step){
+ let credentialReads=0;const env=new Proxy(this.env,{get(target,key){if(key==='AFW_RELEASE_READ_TOKEN')credentialReads++;return Reflect.get(target,key,target);}});
+ const result=await __finiteMeasuredRun.call({env},event,step);
+ return {...result,qualification:{...result.qualification,credentialReads}};
+};
+`;
   if(fault!==null)operator.script+='\n'+reservationFaultHarness(fault);
   const retired={purpose:'afw.node-retirement-observation.v1',containerId:ids.original,programHash:manifest.original.programHash,sourceRevision:manifest.original.sourceRevision,processGeneration:'8'.repeat(64),image:'cloudflare/debian-trixie',createdAt:window.startAt-10000,expiresAt:window.startAt-5000,closedAt:window.startAt-3000,observedAt:window.startAt-2000,physicalStopVerified:false,mayStartSuccessor:false};
   identity.bindings={RETIREMENT:retirement,...(retirement==='absent'?{}:{RETIRED:JSON.stringify(retired)})};
   if(['expired','rewind'].includes(retirement))operator.script="const originalFetch=globalThis.fetch;globalThis.fetch=async(...args)=>{const r=await originalFetch(...args);if(String(args[0]).includes('/instances/'))Date.now=()=>"+(retirement==='expired'?window.expiresAt+1:window.startAt)+";return r;};\\n".replace('\\n','\n')+operator.script;
   const caller={name:'rpc-caller',modules:true,compatibilityDate:'2026-09-07',bindings:{PLAN_HASH:compiled.planHash},serviceBindings:{OPERATOR:{name:'operator',entrypoint:'AfwReleaseOperator'}},script:'export default{async fetch(r,e){try{return Response.json(await e.OPERATOR.run(e.PLAN_HASH));}catch(error){return Response.json({error:error.message});}}}'};
-  await mf.setOptions(convertV4MiniflareOptions({workers:[identity,operator,caller]}));
+  await mf.setOptions(convertV4MiniflareOptions({workers:finite?[identity,operator]:[identity,operator,caller]}));
   const db=await mf.getD1Database('RELEASE_DB','operator');
   for(const name of ['publication','activation']){
    const sql=readFileSync('db/dossier-'+name+'-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');
    for(const statement of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
   }
   let alternativeGrantEligible=null;
   if(reserve==='true'){
    const fixtureHistory=compiled.fixtureHistory??namedHistoryFixture({artifact,policy});
    alternativeGrantEligible=await seedNamedHistoryFixture(db,fixtureHistory,retired,{historyMode,omitCurrent:nativeFault==='missing-current'});
    await seedKnownCancellationFault(db,nativeFault,fixtureHistory,retired);

~~~~~~~~~~

## test/mcp-node-process-custody.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-node-process-custody.test.mjs b/test/mcp-node-process-custody.test.mjs
--- a/test/mcp-node-process-custody.test.mjs
+++ b/test/mcp-node-process-custody.test.mjs
@@ -114,10 +114,40 @@
 
 test('retired-only facade exposes no execution methods and preserves original records',async()=>{
  const {createRetiredCustodyReader}=await import('../lib/mcp-retired-custody-reader.mjs'),m=await load(),f=fixture();try{
  f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();const active=m.createNodeProcessCustody(f.config);await active.start();await active.close();withdrawOriginal(f);f.expire();
  const {runtime,enabled,...options}=f.config;void runtime;void enabled;
  const before=JSON.stringify(f.rows()),reader=createRetiredCustodyReader(options);assert.deepEqual(Object.keys(reader),['observeRetired']);
  const result=await reader.observeRetired();assert.equal(result.processGeneration,f.boot().processGeneration);assert.equal(result.mayStartSuccessor,false);assert.equal(JSON.stringify(f.rows()),before);assert.equal(f.launches(),1);
  assert.throws(()=>createRetiredCustodyReader({...options,runtime:f.config.runtime}));
  }finally{f.close();}
 });
+
+test('finite seal blocks actual custody admission before primary or launch',async()=>{
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteGateFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ const m=await load(),f=fixture(),g=finiteGateFixture(Date.now()-1000);
+ try{f.db.exec(readFileSync('db/dossier-node-process.sql','utf8'));f.grant();
+ const gate=createFiniteAdmissionGate(g.options);await gate.seal();
+ await assert.rejects(m.createNodeProcessCustody({...f.config,finiteGate:gate}).start());
+ assert.equal(f.launches(),0);assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM dossier_node_process_admissions').get().n,0);
+ }finally{f.close();}
+});
+
+
+test('finite settled admission reuse observes readiness without another writer or launch',async()=>{
+ const {exercise}=await import('./fixtures/finite-premature-admission-native.mjs');
+ const r=await exercise('reuse');
+ assert.equal(r.error,null);assert.equal(r.result.ready,true);assert.deepEqual(r.reused,r.result);assert.deepEqual(r.reuseBefore,r.reuseAfter);assert.equal(r.launches,1);assert.equal(r.sealedDenied,true);
+});
+test('finite custody retains the narrow deadline after a held admission read and permits independent close',async()=>{
+ const {exercise}=await import('./fixtures/finite-premature-admission-native.mjs');
+ const r=await exercise('read-held');
+ assert.equal(r.heldRead,true);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.equal(r.runs,0);assert.equal(r.closes,1);
+ const raw=r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1];assert.equal(raw.writers.admission.settlement,null);
+});
+test('finite custody passes its retained lease into REAL runtime makeControl continuation',async()=>{
+ const {exercise}=await import('./fixtures/finite-premature-admission-native.mjs');
+ const r=await exercise('runtime-held');
+ assert.equal(r.heldControl,true);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.ok(r.closes>=1);
+ const raw=r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1];assert.equal(raw.writers.admission.settlement,null);
+});

~~~~~~~~~~

## test/mcp-original-container-runtime.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-original-container-runtime.test.mjs b/test/mcp-original-container-runtime.test.mjs
--- a/test/mcp-original-container-runtime.test.mjs
+++ b/test/mcp-original-container-runtime.test.mjs
@@ -1,26 +1,52 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {createNodeReadiness} from '../lib/mcp-node-readiness.mjs';
 const load=()=>import('../lib/mcp-original-container-runtime.mjs');
-function fixture(){let now=Date.now()-1000,running=false,boots=0,stops=0,cancellations=0,mode='',manifest,key;const calls=[],program='/* fixed own program */',id='a'.repeat(64),window={startAt:now,expiresAt:now+60000};const port={async fetch(request){calls.push('port');if(mode==='hung')return new Promise(()=>{});if(mode==='hung-body')return new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('{'));},cancel(){cancellations++;}}),{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':'0'.repeat(64)}});if(mode==='refused'){mode='';throw Error('Connection refused');}const p=createNodeReadiness({key,manifest,now:()=>now}).respond({body:await request.text(),signature:request.headers.get('x-afw-node-signature')});if(mode==='stopped')running=false;return new Response(p.body,{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':mode==='tamper'?'0'.repeat(64):p.signature}});}};const container={get running(){return running;},start(options){calls.push('start');boots++;const bootstrap=JSON.parse(options.env.AFW_NODE_BOOTSTRAP);manifest=bootstrap.manifest;key=Buffer.from(bootstrap.key,'base64');running=true;if(mode==='lost-start')throw Error('Unknown start ACK');},async setInactivityTimeout(ms){assert.ok(running);assert.ok(ms<=window.expiresAt-now);calls.push('timeout');},async interceptOutboundHttp(host,entry){assert.equal(host,'afw-node-control.internal');assert.equal(typeof entry.fetch,'function');calls.push('control');},getTcpPort(number){assert.equal(number,8080);return port;},async destroy(){stops++;running=false;calls.push('destroy');}};const options={enabled:true,ctx:{id:{toString:()=>id},container},program,sourceRevision:'b'.repeat(40),window,makeControl:async identity=>{assert.equal(identity.containerId,id);return {fetch:async()=>new Response(null,{status:404})};},now:()=>now};const value={containerId:id,processGeneration:'c'.repeat(64),programHash:createHash('sha256').update(program).digest('hex'),sourceRevision:options.sourceRevision,image:'cloudflare/debian-trixie',createdAt:now,expiresAt:window.expiresAt,key:Buffer.alloc(32,9)};const original=()=>Object.fromEntries(Object.entries(value).filter(([k])=>k!=='key'));const probe=()=>createNodeReadiness({key:value.key,manifest:original(),now:()=>now}).probe();return {options,value,original,probe,calls,boots:()=>boots,stops:()=>stops,cancellations:()=>cancellations,mode:v=>{mode=v;},expire:()=>{now=window.expiresAt;},stop:()=>{running=false;}};}
+function fixture(){let now=Date.now()-1000,running=false,boots=0,stops=0,cancellations=0,mode='',manifest,key;const calls=[],program='/* fixed own program */',id='a'.repeat(64),window={startAt:now,expiresAt:now+60000};const port={async fetch(request){calls.push('port');if(mode==='hung')return new Promise(()=>{});if(mode==='hung-body')return new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('{'));},cancel(){cancellations++;}}),{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':'0'.repeat(64)}});if(mode==='refused'){mode='';throw Error('Connection refused');}const p=createNodeReadiness({key,manifest,now:()=>now}).respond({body:await request.text(),signature:request.headers.get('x-afw-node-signature')});if(mode==='stopped')running=false;return new Response(p.body,{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':mode==='tamper'?'0'.repeat(64):p.signature}});}};const container={get running(){return running;},start(options){calls.push('start');boots++;const bootstrap=JSON.parse(options.env.AFW_NODE_BOOTSTRAP);manifest=bootstrap.manifest;key=Buffer.from(bootstrap.key,'base64');running=true;if(mode==='lost-start')throw Error('Unknown start ACK');},async setInactivityTimeout(ms){assert.ok(running);assert.ok(ms<=window.expiresAt-now);calls.push('timeout');},async interceptOutboundHttp(host,entry){assert.equal(host,'afw-node-control.internal');assert.equal(typeof entry.fetch,'function');calls.push('control');},getTcpPort(number){assert.equal(number,8080);return port;},async destroy(){stops++;running=false;calls.push('destroy');}};const options={enabled:true,ctx:{id:{toString:()=>id},container},program,sourceRevision:'b'.repeat(40),window,makeControl:async identity=>{assert.equal(identity.containerId,id);return {fetch:async()=>new Response(null,{status:404})};},now:()=>now};const value={containerId:id,processGeneration:'c'.repeat(64),programHash:createHash('sha256').update(program).digest('hex'),sourceRevision:options.sourceRevision,image:'cloudflare/debian-trixie',createdAt:now,expiresAt:window.expiresAt,key:Buffer.alloc(32,9)};const original=()=>Object.fromEntries(Object.entries(value).filter(([k])=>k!=='key'));const probe=()=>createNodeReadiness({key:value.key,manifest:original(),now:()=>now}).probe();return {options,value,original,probe,calls,boots:()=>boots,stops:()=>stops,cancellations:()=>cancellations,mode:v=>{mode=v;},setNow:value=>{now=value;},expire:()=>{now=window.expiresAt;},stop:()=>{running=false;}};}
 test('Container adapter is closed before dependencies and rejects nonoriginal bootstrap',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture();assert.throws(()=>createOriginalContainerRuntime({...f.options,enabled:false,ctx:{get container(){throw Error('Must not read');}}}),/unavailable/);const r=createOriginalContainerRuntime(f.options);await assert.rejects(r.launch({...f.value,programHash:'0'.repeat(64)},new AbortController().signal));assert.equal(f.boots(),0);});
 test('original adapter starts once with private env and configures timeout only after start',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);assert.equal(f.boots(),1);assert.ok(f.calls.indexOf('timeout')>f.calls.indexOf('start'));assert.deepEqual(await r.observe(f.original(),a.signal,f.probe),{...f.original(),running:true});await assert.rejects(r.launch(f.value,a.signal));assert.equal(f.boots(),1);const rebuilt=createOriginalContainerRuntime(f.options);assert.deepEqual(await rebuilt.observe(f.original(),a.signal,f.probe),{...f.original(),running:true});assert.equal(f.boots(),1);await rebuilt.close();assert.equal(f.stops(),1);await assert.rejects(rebuilt.observe(f.original(),a.signal,f.probe));});
 test('lost start ACK, bad readiness, stopped process and lease cannot lead to another launch',async()=>{const {createOriginalContainerRuntime}=await load();for(const mode of ['lost-start','tamper','stopped']){const f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();f.mode(mode);if(mode==='lost-start')await assert.rejects(r.launch(f.value,a.signal));else{await r.launch(f.value,a.signal);await assert.rejects(r.observe(f.original(),a.signal,f.probe));}await assert.rejects(r.launch(f.value,a.signal));assert.equal(f.boots(),1);await r.close();}const f=fixture(),r=createOriginalContainerRuntime(f.options);await r.launch(f.value,new AbortController().signal);f.expire();await assert.rejects(r.observe(f.original(),new AbortController().signal,f.probe));assert.equal(f.boots(),1);});
 test('port readiness retries do not restart the original process and cancellation settles hung port',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);f.mode('refused');assert.equal((await r.observe(f.original(),a.signal,f.probe)).running,true);assert.equal(f.boots(),1);f.mode('hung');const result=r.observe(f.original(),a.signal,f.probe);setTimeout(()=>a.abort(),25);await assert.rejects(result);assert.equal(f.boots(),1);await r.close();});
 test('cancelled readiness body releases its native reader without another boot',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);f.mode('hung-body');const result=r.observe(f.original(),a.signal,f.probe);setTimeout(()=>a.abort(),25);await assert.rejects(result);assert.equal(f.cancellations(),1);assert.equal(f.boots(),1);await r.close();});
 
 test('constructor failure observation identifies only fixed runtime prerequisites and never boots',async()=>{
  const {createOriginalContainerRuntime}=await load();
  const cases=[
   ['native_runtime_options_invalid',o=>{o.extra='PRIVATE';}],
   ['native_runtime_inputs_invalid',o=>{o.program='';}],
   ['native_runtime_window_invalid',o=>{o.window={startAt:2,expiresAt:1};}],
   ['native_runtime_identity_invalid',o=>{o.ctx.id={toString:()=> 'PRIVATE'};}],
   ['native_runtime_context_invalid',o=>{o.ctx={...o.ctx,get container(){throw Error('PRIVATE');}};}],
   ['native_container_absent',o=>{o.ctx.container=undefined;}],
   ...[['start','native_container_start_unavailable'],['setInactivityTimeout','native_container_timeout_unavailable'],['interceptOutboundHttp','native_container_intercept_unavailable'],['getTcpPort','native_container_port_unavailable'],['destroy','native_container_destroy_unavailable']].map(([method,stage])=>[stage,o=>{o.ctx.container[method]=undefined;}]),
  ];
  for(const [stage,change]of cases){const f=fixture(),rows=[];change(f.options);assert.throws(()=>createOriginalContainerRuntime(f.options,r=>rows.push(r)),/unavailable/);assert.deepEqual(rows,[stage]);assert.equal(f.boots(),0);assert.equal(f.stops(),0);assert.ok(!JSON.stringify(rows).includes('PRIVATE'));}
  const f=fixture();assert.doesNotThrow(()=>createOriginalContainerRuntime(f.options,()=>{throw Error('PRIVATE');}));assert.equal(f.boots(),0);
+});
+
+test('internal parent lease is rechecked after every launch-side native await',async()=>{
+ const {createOriginalContainerRuntime}=await load();
+ for(const stage of ['makeControl','start','interceptOutboundHttp','setInactivityTimeout']){
+  const f=fixture(),deadline=f.options.now()+10000;let release,entered;
+  const waiting=new Promise(resolve=>{entered=resolve;}),held=new Promise(resolve=>{release=resolve;});
+  const target=stage==='makeControl'?f.options:f.options.ctx.container,original=target[stage];
+  target[stage]=async(...args)=>{const result=await original(...args);entered();await held;return result;};
+  const runtime=createOriginalContainerRuntime(f.options);
+  const current=()=>{if(f.options.now()>=deadline)throw Error('parent lease expired');};
+  const pending=runtime.launch(f.value,new AbortController().signal,current);
+  await waiting;f.setNow(deadline);release();await assert.rejects(pending);
+  assert.equal(f.boots(),stage==='makeControl'?0:1);
+  if(['makeControl','start'].includes(stage))assert.equal(f.calls.includes('control'),false);
+  if(stage!=='setInactivityTimeout')assert.equal(f.calls.includes('timeout'),false);
+  await runtime.close();assert.equal(f.stops(),1);
+ }
+});
+test('a valid narrower internal lease permits launch but cannot replace original runtime checks',async()=>{
+ const {createOriginalContainerRuntime}=await load(),f=fixture(),deadline=f.options.now()+10000;
+ const current=()=>{if(f.options.now()>=deadline)throw Error('parent lease expired');};
+ const runtime=createOriginalContainerRuntime(f.options);await runtime.launch(f.value,new AbortController().signal,current);assert.equal(f.boots(),1);
+ await runtime.close();const g=fixture(),other=createOriginalContainerRuntime(g.options);
+ await assert.rejects(other.launch(g.value,new AbortController().signal,true));assert.equal(g.boots(),0);
+ g.expire();await assert.rejects(other.launch(g.value,new AbortController().signal,()=>{}));assert.equal(g.boots(),0);
 });

~~~~~~~~~~

## test/mcp-own-permissions-only-reduction-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-own-permissions-only-reduction-native.test.mjs b/test/mcp-own-permissions-only-reduction-native.test.mjs
--- a/test/mcp-own-permissions-only-reduction-native.test.mjs
+++ b/test/mcp-own-permissions-only-reduction-native.test.mjs
@@ -32,10 +32,20 @@
  const f=await fixture(admitted);try{
   const before=await f.history(),r=await make(f.options).withdraw();assert.equal(r.purpose,'afw.own-permissions-only-reduction.v1');assert.equal(r.permissionsWithdrawn,true);for(const key of ['runtimeStopRequested','physicalStopVerified','nativeWithdrawalVerified','operationalReadiness'])assert.equal(r[key],false);
   assert.deepEqual(await f.history(),before);const permissions=await f.permissions();assert.ok(permissions.grant.revoked_at);assert.equal(permissions.monitor.length,2);assert.equal(permissions.monitor[1].action,'revoke');
   const again=await make({...f.options,db:f.other}).withdraw();assert.equal(again.permissionsWithdrawn,true);assert.equal(again.runtimeStopRequested,false);assert.deepEqual(await f.permissions(),permissions);assert.deepEqual(await f.history(),before);
   await assert.rejects(f.db.prepare('DELETE FROM dossier_node_process_closures').run());
  }finally{await f.mf.dispose();}
 });
 test('legacy native constructor still requests its qualified close callback',async()=>{
  const f=await fixture();try{let calls=0;const result=await withdrawal.createOwnPermissionWithdrawal({...f.options,close:async()=>{calls++;return{closed:true,runtimeStopRequested:true};}}).withdraw();assert.equal(calls,1);assert.equal(result.runtimeStopRequested,true);assert.equal(result.permissionsWithdrawn,true);}finally{await f.mf.dispose();}
 });
+
+test('permissions-only observer is read only before and after actual native reduction',async()=>{
+ const f=await fixture();try{
+  const before=await f.permissions(),read=withdrawal.createOwnPermissionsOnlyObservation(f.options);
+  assert.equal((await read.observe()).permissionsWithdrawn,false);assert.deepEqual(await f.permissions(),before);
+  await make(f.options).withdraw();const after=await f.permissions();
+  assert.equal((await withdrawal.createOwnPermissionsOnlyObservation({...f.options,db:f.other}).observe()).permissionsWithdrawn,true);
+  assert.deepEqual(await f.permissions(),after);
+ }finally{await f.mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-release-known-cancellation.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-release-known-cancellation.test.mjs b/test/mcp-release-known-cancellation.test.mjs
--- a/test/mcp-release-known-cancellation.test.mjs
+++ b/test/mcp-release-known-cancellation.test.mjs
@@ -38,21 +38,21 @@
  const node={idFromName(name){return {toString:()=>name==='afw-own-event-one-occurrence-v1'?manifest.original.containerId:'6'.repeat(64)};},idFromString(id){return{toString:()=>id};},get(){throw Error('fixture cannot launch');}};
  const env={AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_EVENTS_NODE:node,RELEASE_DB:audited};
  Object.defineProperty(env,'AFW_RELEASE_READ_TOKEN',{get(){f.credentials++;throw Error('private credential must not be read');}});
  const planHash=hash(JSON.stringify(bundle)),event={timestamp:new Date(at),instanceId:'afw-release-'+planHash,payload:{planHash}};
  const step={async do(name,options){f.steps++;f.timeout=options.timeout;assert.equal(name,'confirm-named-activation');return f.stepResult;}};
  f.input={bundle,env,event,step};return f;
  }catch(e){await mf.dispose();throw e;}
 }
 test('fixed adapter exists without exporting a lease mint or registry',()=>{
  assert.equal(typeof runtime.runKnownCancellationReleaseWorkflow,'function');
- assert.deepEqual(Object.keys(runtime).sort(),['runKnownCancellationReleaseWorkflow','runReleaseOperator','runReleaseWorkflow']);
+ assert.deepEqual(Object.keys(runtime).sort(),['runFiniteKnownCancellationReleaseWorkflow','runKnownCancellationReleaseWorkflow','runReleaseOperator','runReleaseWorkflow']);
 });
 test('two primary snapshots plus initial and Workflow eligibility precede the fixed named step',async()=>{
  const f=await fixture();try{
  assert.deepEqual(await call(f),blocked);assert.equal(f.steps,1);assert.equal(f.credentials,0);
  assert.equal(f.reads.filter(s=>s.includes('SELECT 1 AS eligible')).length,2);
  assert.equal(f.reads.filter(s=>s.includes('LIMIT 2')).length,4);
  assert.equal(f.reads.filter(s=>s.includes('LIMIT 9')).length,2);
  assert.ok(f.timeout>0&&f.timeout<=70000-(Date.now()-f.input.event.timestamp.getTime())+200);
  }finally{await f.mf.dispose();}
 });
@@ -137,23 +137,23 @@
 
 test('absent projected current grant blocks before eligibility or runtime',async()=>{
  const f=await fixture();try{f.afterRead=async(sql,r)=>{if(sql.includes('WHERE g.id=?'))r.results=[];};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
 });
 // White-box closure tests only. The separate native composition above uses the
 // unmodified module and never injects an authorization callback or lease mint.
 let harnessSerial=0;
 async function closureHarness(capture){
  const url=new URL('../lib/mcp-release-runtime.mjs',import.meta.url);
  let source=readFileSync(url,'utf8');
- const anchor='const result=await runReleaseWorkflow({bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});';
+ const anchor='const result=await runReleaseWorkflowImpl(profile,{bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});';
  assert.ok(source.includes(anchor));
- source=source.replace(anchor,'const result=await globalThis.__knownAdapterCapture({bundle,env,event,step,authorize,cancellationHistory:first.raw,requestLease,runReleaseWorkflow});');
+ source=source.replace(anchor,'const result=await globalThis.__knownAdapterCapture({bundle,env,event,step,authorize,cancellationHistory:first.raw,requestLease,runReleaseWorkflow:options=>runReleaseWorkflowImpl(profile,options)});');
  source=source.replace(/from '([^']+)'/g,(whole,path)=>path.startsWith('.')?"from '"+new URL(path,url).href+"'":whole);
  globalThis.__knownAdapterCapture=capture;
  return import('data:text/javascript;base64,'+Buffer.from(source+'\n// harness '+(++harnessSerial)).toString('base64'));
 }
 const stages=['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write'];
 test('private closure rechecks complete primary eligibility at all 18 fixed hooks and retires its lease',async()=>{
  const f=await fixture();let captured;
  try{
  const h=await closureHarness(async args=>{captured=args;for(const stage of stages)assert.equal(await args.authorize(stage,new AbortController().signal),true,stage);return blocked;});
  assert.deepEqual(await h.runKnownCancellationReleaseWorkflow(f.input),blocked);

~~~~~~~~~~

## test/mcp-successor-launch-gate.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-successor-launch-gate.test.mjs b/test/mcp-successor-launch-gate.test.mjs
--- a/test/mcp-successor-launch-gate.test.mjs
+++ b/test/mcp-successor-launch-gate.test.mjs
@@ -1,27 +1,27 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {DatabaseSync} from 'node:sqlite';
 import {readFileSync} from 'node:fs';
 import {createHash} from 'node:crypto';
 import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
 import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
 const load=()=>import('../lib/mcp-successor-launch-gate.mjs');
-async function fixture(retirementAge=0){
+async function fixture(retirementAge=0,programHash='e'.repeat(64)){
  const db=new DatabaseSync(':memory:'),now=Date.now(),secret='z'.repeat(32),context={grantId:'new',subject:'owner',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',scopes:['afw:project:read']};
  db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
  for(const path of ['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation','dossier-successor-launch'])db.exec(readFileSync('db/'+path+'.sql','utf8'));
  db.prepare('INSERT INTO site_projects VALUES(?,?)').run('p','owner');db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('new','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(now+120000).toISOString(),'');
  db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run('new','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',now-1000,now+60000);
  const projected=await projectDossierEvent({id:'x',projectId:'p',type:'project_created',revision:1,createdAt:'1970-01-01T00:00:00.000Z'},secret);
  const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'own-app',ownerRef:createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','principal','owner','client'])).digest('hex'),projectRef:projected.projectRef,resource:context.resource};
- const original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},candidate={trialId:'d'.repeat(64),programHash:'e'.repeat(64),sourceRevision:'f'.repeat(40),startAt:now-1000,expiresAt:now+30000,budget:1};
+ const original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},candidate={trialId:'d'.repeat(64),programHash,sourceRevision:'f'.repeat(40),startAt:now-1000,expiresAt:now+30000,budget:1};
  const namespace={idFromName:()=>({toString:()=> '9'.repeat(64)}),idFromString:v=>({toString:()=>v})},plan={scope,original,candidate,namespace},p=resolveSuccessorPreparation(plan);
  const evidence={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'8'.repeat(64),closedAt:now-retirementAge-1000,stoppedAt:now-retirementAge-1000,observedAt:now-retirementAge,physicalStopVerified:true,mayStartSuccessor:false};
  const columns=['slot','trial_id','predecessor_container_id','predecessor_generation','predecessor_program_hash','predecessor_source_revision','application_id','container_id','program_hash','source_revision','scope_hash','start_at','expires_at','budget','closed_at','stopped_at','observed_at','reserved_at','state'];
  db.prepare('INSERT INTO dossier_successor_reservations('+columns.join(',')+') VALUES('+columns.map(()=>'?').join(',')+')').run('afw.own-successor.v1',candidate.trialId,original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,scope.applicationId,p.candidate.containerId,candidate.programHash,candidate.sourceRevision,p.candidate.scopeHash,candidate.startAt,candidate.expiresAt,1,evidence.closedAt,evidence.stoppedAt,now,now,'prepared');
  const boot={containerId:p.candidate.containerId,processGeneration:'7'.repeat(64),programHash:candidate.programHash,sourceRevision:candidate.sourceRevision,image:'cloudflare/debian-trixie',createdAt:now,expiresAt:candidate.expiresAt,key:Buffer.alloc(32,7)};
  db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('new','p','owner','client',context.resource,1,now-1000,now+60000,boot.containerId,boot.processGeneration,boot.programHash,boot.sourceRevision,boot.image,boot.createdAt,boot.expiresAt);
  const adapter={withSession(){return this;},prepare:sql=>({bind:(...args)=>({first:async()=>db.prepare(sql).get(...args),run:async()=>{const r=db.prepare(sql).run(...args);return{success:true,meta:{changes:Number(r.changes)}};}})})};let launches=0;
  const deployment={scopeHash:p.candidate.scopeHash,sourceRevision:candidate.sourceRevision,programHash:candidate.programHash,observedAt:now};
  return{db,boot,plan,evidence,deployment,launches:()=>launches,options:{db:adapter,plan,context,projectId:'p',projectionSecret:secret,readRetirement:async()=>structuredClone(evidence),readDeployment:async()=>({...deployment}),launch:async()=>{launches++;},now:Date.now}};
 }
@@ -87,12 +87,60 @@
  }finally{f.db.close();}
 });
 
 test('launch passes original deadline after deployment and before a retirement child starts',async t=>{
  const {createSuccessorLaunchGate}=await load(),f=await fixture();let tick=0,parent,childReads=0;t.mock.method(performance,'now',()=>tick);
  try{
   const reader=async(_input,assertParent)=>{parent=assertParent;tick=31;if(assertParent)assertParent();childReads++;return f.evidence;};
   await assert.rejects(createSuccessorLaunchGate({...f.options,timeoutMs:30,readRetirement:reader})(f.boot,new AbortController().signal));
   assert.equal(typeof parent,'function');assert.equal(childReads,0);assert.equal(f.launches(),0);
   assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM dossier_successor_launch_claims').get().n,0);
+ }finally{f.db.close();}
+});
+
+test('finite seal blocks actual successor launch claim and runtime launch',async()=>{
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteGateFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ const m=await load(),f=await fixture(),g=finiteGateFixture(Date.now()-1000);
+ try{const gate=createFiniteAdmissionGate(g.options);await gate.seal();
+ await assert.rejects(m.createSuccessorLaunchGate({...f.options,finiteGate:gate})(f.boot,new AbortController().signal));
+ assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM dossier_successor_launch_claims').get().n,0);
+ }finally{f.db.close();}
+});
+
+test('finite launch retains the narrower nominal deadline through held continuations',async()=>{
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteWriterFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ for(const held of ['deployment','retirement','primary','primary_send']){
+  const f=await fixture();try{
+   let at=f.boot.createdAt,heldCount=0;const deadline=at+20000;
+   const g=finiteWriterFixture({now:()=>at,deadline,identity:{containerId:f.boot.containerId,trialId:f.plan.candidate.trialId,grantHash:createHash('sha256').update('new').digest('hex')}});
+   const options={...f.options,now:()=>at,finiteGate:createFiniteAdmissionGate(g.options)};
+   for(const [mode,name] of [['deployment','readDeployment'],['retirement','readRetirement']])if(held===mode){const read=options[name];options[name]=async(...args)=>{const value=await read(...args);await Promise.resolve();if(!heldCount){heldCount++;at=deadline;}return value;};}
+   if(['primary','primary_send'].includes(held)){const db=options.db;options.db={withSession(){return this;},prepare(sql){const q=db.prepare(sql);return{bind(...args){const r=q.bind(...args);return{first:r.first,async run(){if(held==='primary_send'){await Promise.resolve();heldCount++;at=deadline;f.db.function('strftime',(format,value)=>{const t=value==='now'?at:Date.parse(value);return format==='%s'?String(Math.floor(t/1000)):format==='%f'?(t%60000/1000).toFixed(3).padStart(6,'0'):null;});return r.run();}const value=await r.run();await Promise.resolve();heldCount++;at=deadline;return value;}};}};}};}
+   await assert.rejects((await load()).createSuccessorLaunchGate(options)(f.boot,new AbortController().signal));
+   assert.equal(f.launches(),0,held+' must not launch after finite deadline');assert.equal(heldCount,1);if(held==='primary_send')assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_successor_launch_claims').get().n,0);
+   assert.equal(g.rows.get('afw.own-finite-admission.v1:head').writers.launch.settlement,null);
+  }finally{f.db.close();}
+ }
+});
+
+test('finite launch holds the REAL runtime makeControl across D without starting a Container',async()=>{
+ const {createOriginalContainerRuntime}=await import('../lib/mcp-original-container-runtime.mjs');
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteWriterFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ const program='/* fixed synthetic Container source */',f=await fixture(0,createHash('sha256').update(program).digest('hex'));
+ try{
+  let at=f.boot.createdAt,starts=0,running=false,releaseControl,enteredControl;
+  const entered=new Promise(resolve=>{enteredControl=resolve;}),held=new Promise(resolve=>{releaseControl=resolve;}),deadline=at+20000;
+  const container={get running(){return running;},async start(){starts++;running=true;},async setInactivityTimeout(){},async interceptOutboundHttp(){},getTcpPort(){throw Error('no readiness expected');},async destroy(){running=false;}};
+  const runtime=createOriginalContainerRuntime({enabled:true,ctx:{id:{toString:()=>f.boot.containerId},container},program,sourceRevision:f.boot.sourceRevision,window:{startAt:f.plan.candidate.startAt,expiresAt:f.boot.expiresAt},makeControl:async()=>{enteredControl();await held;return{fetch:async()=>new Response(null,{status:404})};},now:()=>at});
+  const g=finiteWriterFixture({now:()=>at,deadline,identity:{containerId:f.boot.containerId,trialId:f.plan.candidate.trialId,grantHash:createHash('sha256').update('new').digest('hex')}});
+  const launch=(await load()).createSuccessorLaunchGate({...f.options,now:()=>at,finiteGate:createFiniteAdmissionGate(g.options),launch:runtime.launch});
+  const pending=launch(f.boot,new AbortController().signal);await entered;at=deadline;releaseControl();
+  await assert.rejects(pending);assert.equal(starts,0,'makeControl must not resume into container.start at D');
+  assert.equal(f.db.prepare('SELECT count(*) n FROM dossier_successor_launch_claims').get().n,1);
+  assert.equal(g.rows.get('afw.own-finite-admission.v1:head').writers.launch.settlement,null);
+  await assert.rejects(launch(f.boot,new AbortController().signal));assert.equal(starts,0);
+  await runtime.close();assert.equal(running,false);
  }finally{f.db.close();}
 });

~~~~~~~~~~

## test/mcp-successor-reservation.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-successor-reservation.test.mjs b/test/mcp-successor-reservation.test.mjs
--- a/test/mcp-successor-reservation.test.mjs
+++ b/test/mcp-successor-reservation.test.mjs
@@ -78,10 +78,38 @@
  const {createSuccessorReservation}=await load();
  for(const delta of [-21,21]){
   const f=fixture(),local=f.evidence.observedAt,sqlTime=local+delta;
   try{
    f.db.function('strftime',(format,input)=>{assert.equal(input,'now');return format==='%s'?String(Math.floor(sqlTime/1000)):String(new Date(sqlTime).getUTCSeconds()).padStart(2,'0')+'.'+String(sqlTime%1000).padStart(3,'0');});
    const run=createSuccessorReservation({...f.options,now:()=>local}).reserve();
    if(delta<0){await assert.rejects(run);assert.equal(f.rows().length,0);}else{await run;assert.equal(f.rows().length,1);}
   }finally{f.db.close();}
  }
 });
+
+test('finite seal blocks the actual administrative reservation INSERT',async()=>{
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteGateFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ const {createSuccessorReservation}=await load(),f=fixture(),g=finiteGateFixture(Date.now()-1000);
+ try{const gate=createFiniteAdmissionGate(g.options);await gate.seal();
+ await assert.rejects(createSuccessorReservation({...f.options,finiteGate:gate}).reserve());
+ assert.equal(f.rows().length,0);assert.equal((await gate.read()).sealed,true);
+ }finally{f.db.close();}
+});
+
+test('finite reservation SQL fences a held send at the narrower nominal deadline',async()=>{
+ const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
+ const {finiteWriterFixture}=await import('./fixtures/finite-admission-gate.mjs');
+ const f=fixture();try{
+  let at=f.candidate.startAt,held=false;const deadline=at+20000;
+  const g=finiteWriterFixture({now:()=>at,deadline,identity:{containerId:f.candidate.containerId,trialId:f.candidate.trialId}});
+  f.options.original.applicationId=g.identity.applicationId;f.evidence.applicationId=g.identity.applicationId;
+  const db=f.options.db;const primary={withSession(){return this;},prepare(sql){const q=db.prepare(sql);return{bind(...args){const r=q.bind(...args);return{async run(){
+   await Promise.resolve();held=true;at=deadline;
+   f.db.function('strftime',(format,value)=>{assert.equal(value,'now');return format==='%s'?String(Math.floor(at/1000)):format==='%f'?(at%60000/1000).toFixed(3).padStart(6,'0'):null;});
+   return r.run();
+  }};}};}};
+  await assert.rejects((await load()).createSuccessorReservation({...f.options,db:primary,now:()=>at,finiteGate:createFiniteAdmissionGate(g.options)}).reserve());
+  assert.equal(held,true);assert.equal(f.rows().length,0);
+  assert.equal(g.rows.get('afw.own-finite-admission.v1:head').writers.reservation.settlement,null);
+ }finally{f.db.close();}
+});

~~~~~~~~~~

## test/build-finite-native-package.test.mjs

~~~~~~~~~~diff
diff --git a/test/build-finite-native-package.test.mjs b/test/build-finite-native-package.test.mjs
--- /dev/null
+++ b/test/build-finite-native-package.test.mjs
@@ -0,0 +1,71 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {execFileSync} from 'node:child_process';
+import {createHash} from 'node:crypto';
+import {existsSync} from 'node:fs';
+import {mkdtemp,readFile,appendFile,symlink,rm,realpath} from 'node:fs/promises';
+import {tmpdir} from 'node:os';
+import {join,resolve} from 'node:path';
+import {verifyMcpReleaseSource} from '../scripts/mcp-release-source.mjs';
+let api;
+try{api=await import('../scripts/build-finite-native-package.mjs');}catch{/* Explicit missing compiler RED. */}
+const sourceRevision=()=>execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
+test('missing_factory_blocks_package',async()=>{
+ assert.equal(typeof api?.buildFiniteNativePackage,'function','actual builder required');
+ await assert.rejects(api.buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:sourceRevision()}),/unavailable/i);
+ assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
+});
+test('stale_historical_artifact_blocks_upload',async()=>{
+ assert.equal(typeof api?.buildFiniteNativePackage,'function','actual builder required');
+ // Caller-supplied historical input cannot replace a source-approved exact locator.
+ await assert.rejects(api.buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:sourceRevision(),historicalArtifact:{expired:true}}),/unavailable/i);
+ assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
+});
+
+test('actual compiler staging hashes final bytes and retains source classes without eligible manifest',async()=>{
+ assert.equal(typeof api?.compileFiniteNativeStaging,'function');
+ const M=sourceRevision(),r=await api.compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:M});
+ assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
+ assert.equal(r.manifest,undefined);assert.equal(r.sourceRevision,M);
+ assert.deepEqual(Object.keys(r.files).sort(),['canaryLive/index.mjs','qaLive/index.mjs']);
+ for(const role of ['qaLive','canaryLive']){
+  const bytes=r.files[role+'/index.mjs'],d=r.modules[role];
+  assert.equal(createHash('sha256').update(bytes).digest('hex'),d.module.sha256);
+  assert.equal(bytes.length,d.module.bytes);assert.equal(d.provenance.sourceRevision,M);
+  assert(r.metafiles[role].inputs[role==='qaLive'?'worker/independent-closure/index.mjs':'worker/mcp-own/index.mjs']);
+ }
+ assert.deepEqual(r.modules.canaryLive.module.exports,['AfwNodeControl','AfwOwnEventNode','default']);
+ assert(r.modules.qaLive.module.exports.includes('IndependentClosure'));
+ assert.equal(existsSync('output/finite-native-package/manifest.json'),false);
+});
+
+test('compiler imported from checkout A rejects independently verified checkout B with different Node source',async t=>{
+ const ownerRoot=await realpath(process.cwd()),temporary=await mkdtemp(join(tmpdir(),'afw-finite-checkout-boundary-')),other=join(temporary,'checkout-b');
+ let added=false;
+ t.after(async()=>{
+  if(added)execFileSync('git',['worktree','remove','--force',other],{cwd:ownerRoot,stdio:'pipe'});
+  assert.equal(resolve(temporary).startsWith(resolve(tmpdir())+'/afw-finite-checkout-boundary-'),true);
+  await rm(temporary,{recursive:true,force:true});
+ });
+ execFileSync('git',['worktree','add','--detach',other,sourceRevision()],{cwd:ownerRoot,stdio:'pipe'});added=true;
+ const nodePath='worker/mcp-node/server.mjs';
+ await appendFile(join(other,nodePath),'\nconsole.info("SYNTHETIC_CHECKOUT_B_NODE_PROGRAM");\n');
+ execFileSync('git',['add','--',nodePath],{cwd:other,stdio:'pipe'});
+ execFileSync('git',['-c','user.name=AFW synthetic test','-c','user.email=synthetic@example.invalid','-c','core.hooksPath=/dev/null','commit','-m','test-only divergent Node source'],{cwd:other,stdio:'pipe'});
+ await symlink(join(ownerRoot,'node_modules'),join(other,'node_modules'),'dir');
+ const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:other,encoding:'utf8'}).trim();
+ assert.notEqual(revision,sourceRevision());
+ assert.notEqual(await readFile(join(other,nodePath),'utf8'),await readFile(join(ownerRoot,nodePath),'utf8'));
+ // B is a real clean, independently verified checkout. The rejection must be
+ // the executing-compiler boundary, not invalid Git/configuration/dependencies.
+ assert.equal((await verifyMcpReleaseSource({cwd:other,sourceRevision:revision})).sourceRevision,revision);
+ await assert.rejects(api.compileFiniteNativeStaging({cwd:other,sourceRevision:revision}),{message:'Finite native package unavailable'});
+});
+test('canonical symlink alias of executing checkout remains the same trusted root',async t=>{
+ const temporary=await mkdtemp(join(tmpdir(),'afw-finite-root-alias-')),alias=join(temporary,'same-checkout');
+ t.after(async()=>{assert.equal(resolve(temporary).startsWith(resolve(tmpdir())+'/afw-finite-root-alias-'),true);await rm(temporary,{recursive:true,force:true});});
+ await symlink(await realpath(process.cwd()),alias,'dir');
+ const staged=await api.compileFiniteNativeStaging({cwd:alias,sourceRevision:sourceRevision()});
+ assert.equal(staged.completePackage,false);assert.equal(staged.sourceRevision,sourceRevision());
+ assert(staged.files['canaryLive/index.mjs'].length>0);
+});

~~~~~~~~~~

## test/finite_archive_test.py

~~~~~~~~~~diff
diff --git a/test/finite_archive_test.py b/test/finite_archive_test.py
--- /dev/null
+++ b/test/finite_archive_test.py
@@ -0,0 +1,138 @@
+"""Synthetic ZIP fixtures and black-box tests of the actual bounded parser."""
+import hashlib
+import io
+import json
+from pathlib import Path
+import stat
+import struct
+import subprocess
+import sys
+import unittest
+import warnings
+import zipfile
+
+SCRIPT = Path(__file__).resolve().parents[1] / "scripts/verify-qa-finite-archive.py"
+ROLES = ("qaLive", "qaClosed", "canaryLive", "canaryClosed", "operatorClosed")
+MODULE = b"throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n"
+
+
+def make_archive(manifest, mutation=None):
+    text = json.dumps(manifest, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
+    if mutation == "duplicate-json":
+        text = text[:-1] + ',"purpose":"afw.finite-native-package.v2"}'
+    if mutation == "noncanonical":
+        text += "\n"
+    if mutation == "bad-json":
+        text = "{"
+    if mutation == "manifest-overflow":
+        text = " " * 24577
+    stream = io.BytesIO()
+    with warnings.catch_warnings():
+        warnings.simplefilter("ignore", UserWarning)
+        with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED) as z:
+            z.writestr("manifest.json", text)
+            for role in ROLES:
+                name = role + ("/closed-rollback.mjs" if role == "qaClosed" else "/index.mjs")
+                if role == "qaClosed" and mutation == "qa-closed-renamed":
+                    name = "qaClosed/index.mjs"
+                if role == "qaLive" and mutation in ("traversal", "absolute", "backslash"):
+                    name = {"traversal": "../qaLive/index.mjs", "absolute": "/qaLive/index.mjs",
+                            "backslash": "qaLive\\index.mjs"}[mutation]
+                info = zipfile.ZipInfo(name)
+                info.compress_type = zipfile.ZIP_DEFLATED
+                info.external_attr = (stat.S_IFREG | 0o600) << 16
+                if role == "qaLive" and mutation == "symlink":
+                    info.external_attr = (stat.S_IFLNK | 0o777) << 16
+                if role == "qaLive" and mutation == "fifo":
+                    info.external_attr = (stat.S_IFIFO | 0o600) << 16
+                data = MODULE
+                if role == "qaLive" and mutation == "module-altered":
+                    data += b"x"
+                if role == "qaLive" and mutation == "bomb":
+                    data = b"x" * 3145729
+                z.writestr(info, data)
+            if mutation == "extra":
+                z.writestr("extra.txt", "hidden")
+            if mutation == "directory":
+                z.writestr("qaLive/", "")
+            if mutation == "duplicate":
+                z.writestr("qaLive/index.mjs", MODULE)
+            if mutation == "entry-overflow":
+                for n in range(65):
+                    z.writestr(str(n), "")
+    data = bytearray(stream.getvalue())
+    with zipfile.ZipFile(io.BytesIO(data)) as z:
+        info = z.getinfo("qaLive/index.mjs") if mutation not in ("traversal", "absolute", "backslash") else None
+    central = data.find(b"PK\x01\x02", data.find(b"PK\x01\x02") + 4)
+    if mutation in ("crc", "declared-short", "declared-long", "encrypted", "unsupported", "nul"):
+        offset = info.header_offset
+        if mutation == "crc":
+            struct.pack_into("<I", data, offset + 14, 1)
+            struct.pack_into("<I", data, central + 16, 1)
+        if mutation in ("declared-short", "declared-long"):
+            size = 1 if mutation == "declared-short" else 3145729
+            struct.pack_into("<I", data, offset + 22, size)
+            struct.pack_into("<I", data, central + 24, size)
+        if mutation == "encrypted":
+            struct.pack_into("<H", data, offset + 6, 1)
+            struct.pack_into("<H", data, central + 8, 1)
+        if mutation == "unsupported":
+            struct.pack_into("<H", data, offset + 8, 12)
+            struct.pack_into("<H", data, central + 10, 12)
+        if mutation == "nul":
+            data[offset + 30 + 2] = 0
+            data[central + 46 + 2] = 0
+    return bytes(data)
+
+
+class ArchiveTests(unittest.TestCase):
+    def invoke(self, data):
+        return subprocess.run([sys.executable, str(SCRIPT)], input=data, capture_output=True, timeout=8)
+
+    def test_valid_archive_is_inspected_not_executed(self):
+        r = self.invoke(make_archive({"purpose": "afw.finite-native-package.v2"}))
+        self.assertEqual(r.returncode, 0, r.stderr)
+        result = json.loads(r.stdout)
+        self.assertEqual(result["manifest"], {"purpose": "afw.finite-native-package.v2"})
+        self.assertEqual(len(result["files"]), 5)
+        for role in ROLES:
+            self.assertEqual(result["files"][role + ("/closed-rollback.mjs" if role == "qaClosed" else "/index.mjs")],
+                             {"sha256": hashlib.sha256(MODULE).hexdigest(), "bytes": len(MODULE)})
+        self.assertNotIn(b"ARCHIVE_MUST_NEVER_EXECUTE", r.stdout)
+        self.assertEqual(r.stderr, b"")
+
+    def test_exact_manifest_boundary(self):
+        base = {"purpose": "afw.finite-native-package.v2", "x": ""}
+        base["x"] = "a" * (24576 - len(json.dumps(base, separators=(",", ":"))))
+        text = json.dumps(base, separators=(",", ":"))
+        self.assertEqual(len(text), 24576)
+        self.assertEqual(self.invoke(make_archive(json.loads(text))).returncode, 0)
+
+    def test_archive_overflow(self):
+        self.assert_rejected(b"x" * (64 * 1024 * 1024 + 1))
+
+    def assert_rejected(self, data):
+        r = self.invoke(data)
+        self.assertNotEqual(r.returncode, 0)
+        self.assertEqual(r.stdout, b"")
+        self.assertEqual(r.stderr, b"Finite archive unavailable\n")
+
+
+def rejection_test(mutation):
+    def run(self):
+        self.assert_rejected(make_archive({"purpose": "afw.finite-native-package.v2"}, mutation))
+    return run
+
+
+for case in ("traversal", "absolute", "backslash", "symlink", "fifo", "extra", "directory",
+             "duplicate", "entry-overflow", "crc", "declared-short", "declared-long",
+             "encrypted", "unsupported", "nul", "bomb", "duplicate-json", "noncanonical",
+             "bad-json", "manifest-overflow", "qa-closed-renamed"):
+    setattr(ArchiveTests, "test_reject_" + case.replace("-", "_"), rejection_test(case))
+
+if __name__ == "__main__":
+    if sys.argv[1:] == ["--fixture"]:
+        request = json.load(sys.stdin)
+        sys.stdout.buffer.write(make_archive(request["manifest"], request.get("mutation")))
+    else:
+        unittest.main()

~~~~~~~~~~

## test/fixtures/finite-admission-gate.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-admission-gate.mjs b/test/fixtures/finite-admission-gate.mjs
--- /dev/null
+++ b/test/fixtures/finite-admission-gate.mjs
@@ -0,0 +1,21 @@
+import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
+import {nominalFixture} from './finite-nominal-control.mjs';
+export function finiteGateFixture(atValue=1000){
+ let at=atValue,alarm=null,chain=Promise.resolve(),lost=false;
+ const rows=new Map();
+ const storage={get:async k=>structuredClone(rows.get(k)),transaction(fn){const work=chain.then(async()=>{const copy=new Map(rows);const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>copy.set(k,structuredClone(v)),list:async({prefix})=>new Map([...copy].filter(([k])=>k.startsWith(prefix))),setAlarm:async v=>{alarm=v;}});rows.clear();for(const [k,v]of copy)rows.set(k,v);if(lost){lost=false;throw Error('lost ACK');}return result;});chain=work.catch(()=>{});return work;}};
+ const identity={intentId:'finite-1',controlHash:'1'.repeat(64),planHash:'2'.repeat(64),containerId:'3'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',grantHash:'4'.repeat(64),trialId:'5'.repeat(64),sourceRevision:'6'.repeat(40),runtimeVersionId:'22222222-2222-4222-8222-222222222222',T0:at,N1:at+300000,C1:at+420000};
+ const primary={reservation:async()=>null,admission:async()=>null,launch:async()=>null};
+ const nominal=nominalFixture(identity);const options={storage,identity,readPrimary:primary,readNominalControl:async()=>({...nominal.value,observedAt:at,ownedWriters:['reservation','admission','launch'].filter(k=>rows.get('afw.own-finite-admission.v1:head')?.writers[k]).map(kind=>{const w=rows.get('afw.own-finite-admission.v1:head').writers[kind];return {intentId:identity.intentId,controlHash:identity.controlHash,actorId:identity.containerId,kind,claimHash:finiteHash(w.claim),phase:w.settlement===null?'issued':'settled'};})}),nominalIdentity:nominal.nominalIdentity,now:()=>at,timeoutMs:1000};
+ return {options,identity,primary,rows,setTime:v=>{at=v;},lose:()=>{lost=true;},get alarm(){return alarm;}};
+}
+
+/** Synthetic fixed control/primary fixture for real consumer continuation tests. */
+export function finiteWriterFixture({identity={},now,deadline}){
+ const g=finiteGateFixture(now());Object.assign(g.identity,identity);g.options.now=now;
+ g.options.readNominalControl=async()=>{
+  const n=nominalFixture(g.identity,{...g.options.nominalIdentity,consentExpiresAt:deadline},now());
+  const raw=g.rows.get('afw.own-finite-admission.v1:head');
+  return {...n.value,ownedWriters:['reservation','admission','launch'].filter(k=>raw?.writers[k]).map(kind=>({intentId:g.identity.intentId,controlHash:g.identity.controlHash,actorId:g.identity.containerId,kind,claimHash:finiteHash(raw.writers[kind].claim),phase:raw.writers[kind].settlement===null?'issued':'settled'}))};
+ };return g;
+}

~~~~~~~~~~

## test/fixtures/finite-bootstrap-world.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-bootstrap-world.mjs b/test/fixtures/finite-bootstrap-world.mjs
--- /dev/null
+++ b/test/fixtures/finite-bootstrap-world.mjs
@@ -0,0 +1,27 @@
+import {readFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {finitePublicStaticExpectation,finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+import {BOOTSTRAP,bootstrapHash,encodeFiniteQaBootstrap} from '../../lib/mcp-qa-finite-bootstrap-record.mjs';
+export const UUID='11111111-1111-4111-8111-111111111111',DEP='22222222-2222-4222-8222-222222222222';
+export const GH='https://api.github.com/repos/'+BOOTSTRAP.repository,CF='https://api.cloudflare.com/client/v4/accounts/'+BOOTSTRAP.accountId;
+export async function bootstrapWorld(staging){
+ const actor={id:290715446,login:'tokenizartinfo-ops',type:'User'},repo={id:1347578006,full_name:BOOTSTRAP.repository},P0=Math.floor((Date.now()-10000)/1000)*1000,M=staging?.sourceRevision??'a'.repeat(40),tree=staging?.sourceTree??'b'.repeat(40);
+ const workflow=await readFile(BOOTSTRAP.workflowPath,'utf8'),cli=await readFile(BOOTSTRAP.cliPath,'utf8'),expected={sourceRevision:M,sourceTree:tree,workflowHash:bootstrapHash(workflow),cliHash:bootstrapHash(cli)};
+ const moduleDescriptor=staging?.modules.qaLive.module??{name:'index.mjs',sha256:bootstrapHash('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]};
+ const r={purpose:'afw.finite-qa-bootstrap.v1',repository:BOOTSTRAP.repository,repositoryId:1347578006,sourceRevision:M,sourceTree:tree,sourceCheck:BOOTSTRAP.sourceCheck,workflowHash:expected.workflowHash,cliHash:expected.cliHash,commandId:123,runId:456,jobId:789,attempt:1,workflowPath:BOOTSTRAP.workflowPath,job:'publish',step:'qa-bootstrap-provenance',P0,Pend:P0+300000,jobStartedAt:P0+1000,stepStartedAt:P0+2000,observedAt:P0+3000,qaLive:{versionId:UUID,deploymentId:DEP,module:moduleDescriptor,publicStatic:finitePublicStaticExpectation('qaLive')}};
+ const comment={id:123,user:actor,author_association:'OWNER',body:'/afw-qa-finite-bootstrap v1 '+M,created_at:new Date(P0).toISOString(),issue_url:GH+'/issues/497'};
+ const run={id:456,run_attempt:1,head_sha:M,head_branch:'main',event:'issue_comment',path:BOOTSTRAP.workflowPath,repository:repo,head_repository:repo,actor,triggering_actor:actor,display_title:'AFW finite QA bootstrap comment-123 source-'+M,status:'completed',conclusion:'success'};
+ const step={name:'qa-bootstrap-provenance',number:4,started_at:new Date(r.stepStartedAt).toISOString(),completed_at:new Date(P0+4000).toISOString(),status:'completed',conclusion:'success'};
+ const job={id:789,name:'publish',run_id:456,head_sha:M,started_at:new Date(r.jobStartedAt).toISOString(),completed_at:new Date(P0+5000).toISOString(),status:'completed',conclusion:'success',steps:[step]};
+ const file=(path,text)=>{const bytes=Buffer.from(text);return {type:'file',path,encoding:'base64',size:bytes.length,content:bytes.toString('base64'),sha:createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')};};
+ const refPath='/git/ref/tags/afw-finite-bootstrap/'+UUID,tagSha='f'.repeat(40),map=new Map([
+ ['/issues/comments/123',comment],['/git/ref/heads/main',{ref:'refs/heads/main',object:{type:'commit',sha:M}}],
+ ['/actions/runs/456',run],['/actions/runs/456/attempts/1/jobs?per_page=100',{total_count:1,jobs:[job]}],
+ ['/git/commits/'+M,{sha:M,tree:{sha:tree}}],
+ ['/contents/'+BOOTSTRAP.workflowPath+'?ref='+M,file(BOOTSTRAP.workflowPath,workflow)],
+ ['/contents/'+BOOTSTRAP.cliPath+'?ref='+M,file(BOOTSTRAP.cliPath,cli)]]);
+ const pointer={deployments:[{id:DEP,strategy:'percentage',versions:[{version_id:UUID,percentage:100}]}]},version={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(staging?.files['qaLive/index.mjs']??'export default{};').toString('base64')}]};
+ const refresh=()=>{map.set(refPath,{ref:'refs/tags/afw-finite-bootstrap/'+UUID,object:{type:'tag',sha:tagSha}});map.set('/git/tags/'+tagSha,{sha:tagSha,tag:'afw-finite-bootstrap-'+UUID,object:{type:'commit',sha:M},message:encodeFiniteQaBootstrap(r)});};refresh();
+ const event={action:'created',repository:repo,issue:{number:497},comment,sender:actor},context={repository:repo.full_name,repositoryId:String(repo.id),ref:'refs/heads/main',eventName:'issue_comment',runId:'456',runAttempt:'1',sourceRevision:M};
+ return {record:r,expected,map,comment,run,job,step,pointer,version,refPath,tagSha,refresh,event,context,issuer(){run.status=job.status=step.status='in_progress';run.conclusion=job.conclusion=step.conclusion=null;job.completed_at=step.completed_at=null;map.delete(refPath);map.delete('/git/tags/'+tagSha);},get:async p=>{if(!map.has(p))throw Error('SYN GH missing '+p);return structuredClone(map.get(p));}};
+}

~~~~~~~~~~

## test/fixtures/finite-cf-http.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-cf-http.mjs b/test/fixtures/finite-cf-http.mjs
--- /dev/null
+++ b/test/fixtures/finite-cf-http.mjs
@@ -0,0 +1,58 @@
+import {decodeFiniteMaterialSeed} from '../../lib/mcp-qa-finite-seed.mjs';
+import {seedPrimaryFixture,SEED_GH} from './finite-seed-primary.mjs';
+import {createHash} from 'node:crypto';
+import {finiteFinalizerFixture} from './finite-finalizer.mjs';
+import {githubFixture} from './finite-github.mjs';
+import {qaClosedConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
+import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
+
+const QA='agent-friendly-web-independent-closure-qa',ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec';
+export async function cfFiniteFixture({at,configure=()=>{}}={}){
+ const versions={};
+ const base=await finiteFinalizerFixture({at,authenticatedIntent:true,configure:(p,f)=>{
+  for(const key of ['qaLive','qaClosed']){
+   const pin=p.deployments[key],bytes=Buffer.from('export default '+JSON.stringify({profile:key})+';');
+   const meta={id:pin.versionId,main_module:'index.mjs',compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],usage_model:'standard',urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:bytes.toString('base64')}],bindings:[{name:'AFW_INDEPENDENT_CLOSURE',type:'durable_object_namespace',class_name:'IndependentClosure',namespace_id:'070c4a7708eb4592a3ded7c117a88225'}]};
+   pin.module={name:'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};pin.configurationHash=qaClosedConfigurationHash(meta);versions[pin.versionId]=meta;
+  }
+  p.source.moduleHash=p.deployments.qaLive.module.sha256;configure(p,f);
+ }});
+ const gh=await githubFixture(base),p=base.plan,v=p.preview,def=AFW_FIXED_WORKFLOWS.find(x=>x.className==='PrivateQaBootstrap'),workflowVersion='77777777-7777-4777-8777-777777777777',requests=[];
+ base.restorationState.observer='complete';base.old.state.canary={...base.old.state.canary,versions:[{version_id:p.deployments.canaryClosed.versionId,percentage:100}],id:p.deployments.canaryClosed.deploymentId};
+ const state={mode:'normal',observerStatus:'complete',qaVersion:p.deployments.qaLive.versionId,qaDeployment:p.deployments.qaLive.deploymentId,annotation:null,posts:0};
+ const seedFixture=await seedPrimaryFixture({T0:v.T0,sourceRevision:v.sourceRevision,commandId:p.commandId,qaLive:p.deployments.qaLive});
+ seedFixture.seed.qaPublication.observedAt=v.T0;seedFixture.refresh();
+ const ref=seedFixture.ref;gh.rows.set(ref,seedFixture.map.get('/git/ref/tags/afw-finite-observer-create/'+v.intentId));gh.tags.set(seedFixture.tagSha,seedFixture.map.get('/git/tags/'+seedFixture.tagSha));
+ const response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{date:new Date(base.f.now()).toUTCString(),'content-type':'application/json'}});
+ const answer=(result,result_info)=>({success:true,errors:[],messages:[],result,...result_info?{result_info}:{}});
+ const fetchImpl=async(url,init)=>{
+  requests.push({url,method:init.method});if(url.startsWith('https://api.github.com/')){
+   const path=url.slice(SEED_GH.length);
+   if(path.startsWith('/git/commits/')||path.startsWith('/contents/')||path.startsWith('/actions/artifacts/')||path==='/actions/runs/101')return response(seedFixture.map.get(path));
+   return gh.fetchImpl(url,init);
+  }
+  const u=new URL(url),path=u.pathname.slice('/client/v4'.length),query=Object.fromEntries([...u.searchParams].map(([k,x])=>[k,/^\d+$/.test(x)?Number(x):x]));
+  if(path===ROOT+'/tokens/verify')return response(answer({id:state.mode==='bad-token'?'b'.repeat(32):p.custody.id,status:state.mode==='bad-scope'?'disabled':'active',expires_on:new Date(p.custody.expiresAt).toISOString()}));
+  if(path===ROOT+'/workers/workers/'+QA+'/versions/'+p.deployments.qaLive.versionId||path===ROOT+'/workers/workers/'+QA+'/versions/'+p.deployments.qaClosed.versionId)return response(answer(versions[path.split('/').at(-1)]));
+  if(path===ROOT+'/workflows/'+def.name+'/versions/'+workflowVersion)return response(answer({id:workflowVersion,workflow_id:def.id,class_name:def.className,language:'javascript'}));
+  if(path===ROOT+'/workflows/'+def.name+'/instances/'+p.workflows.bootstrap){
+   const provenance=structuredClone(base.output.provenance);if(state.mode==='wrong-native')provenance.runtimeVersionId=p.deployments.qaClosed.versionId;
+   const step={name:state.mode==='wrong-first'?'other':'finite-material-preview',type:'step',success:true,start:new Date(v.T0).toISOString(),end:new Date(v.T0+1).toISOString(),attempts:[{success:true}],output:JSON.stringify({purpose:'afw.finite-observer-preview.v1',provenance,material:v})};
+   return response(answer({versionId:workflowVersion,status:state.observerStatus,success:true,queued:new Date(v.T0).toISOString(),end:new Date(base.f.now()).toISOString(),params:{operation:'finite_cleanup_observer',intentId:v.intentId,sourceRevision:v.sourceRevision},step_count:1,steps:[step],output:JSON.stringify(base.output)}));
+  }
+  if(path===ROOT+'/workers/scripts/'+QA+'/deployments'){
+   if(init.method==='POST'){state.posts++;state.qaVersion=p.deployments.qaClosed.versionId;state.qaDeployment='99999999-9999-4999-8999-999999999999';state.annotation=JSON.parse(init.body).annotations; if(state.mode==='lost-post')throw Error('lost');return response(answer({id:state.qaDeployment}));}
+   return response(answer({deployments:[{id:state.qaDeployment,strategy:'percentage',versions:[{version_id:state.qaVersion,percentage:100}],...(state.annotation?{annotations:state.annotation}:{})}]}));
+  }
+  if(path.startsWith(ROOT+'/workers/scripts/'+QA+'/')){
+   if(path.endsWith('/subdomain'))return response(answer({enabled:false,previews_enabled:false}));
+   if(path.endsWith('/schedules'))return response(answer({schedules:[]}));
+   if(path.endsWith('/tails'))return response(answer([]));
+  }
+  if(path===ROOT+'/workers/durable_objects/namespaces')return response(answer([{id:'070c4a7708eb4592a3ded7c117a88225',class:'IndependentClosure',script:QA,use_sqlite:true},{id:'6f30104244424152b800bc64d5f4cfac',class:'PrivateQaPreregistration',script:QA,use_sqlite:true}],{page:1,per_page:1000,count:2,total_count:2,total_pages:1}));
+  const r=await base.request({method:init.method,path,query,signal:init.signal});return response({...r,messages:[]},r.status);
+ };
+ const options={plan:p,credential:'synthetic_cf_custody',githubToken:'synthetic_github',fetchImpl,now:base.f.now,signal:new AbortController().signal};
+ const observer=()=>gh.api.createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential:options.credential,githubToken:options.githubToken,fetchImpl,now:base.f.now,signal:options.signal});
+ return {base,p,v,state,gh,requests,fetchImpl,observer,seedHash:decodeFiniteMaterialSeed(seedFixture.map.get('/git/tags/'+seedFixture.tagSha).message).seedHash,adapters:()=>gh.api.createPrivateQaFiniteRestoreHttp(options)};
+}

~~~~~~~~~~

## test/fixtures/finite-cleanup-proof.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-cleanup-proof.mjs b/test/fixtures/finite-cleanup-proof.mjs
--- /dev/null
+++ b/test/fixtures/finite-cleanup-proof.mjs
@@ -0,0 +1,14 @@
+import {createHash} from 'node:crypto';
+import {finiteFixture,digest} from './qa-finite-trial.mjs';
+const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
+export function finiteProofFixture({fixture:provided,controlHash='1'.repeat(64)}={}){
+ const f=provided??finiteFixture(),p=f.plan,c={plan:p,planHash:digest(p.purpose,p),controlHash};
+ const identity={intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,T0:p.T0,N1:p.N1,C1:p.C1};
+ const identityHash=hash({purpose:'afw.own-finite-admission.v1',identity}),seal={purpose:'afw.own-finite-admission.v1:seal',identityHash,sealedAt:p.C0};
+ const gate={status:'observed',identity,identityHash,sealed:true,seal,sealHash:hash(seal),writers:{reservation:null,admission:null,launch:null},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
+ const primary={purpose:'afw.finite-primary-snapshot.v1',intentId:p.intentId,controlHash:c.controlHash,observedAt:p.C0+1,reservationHash:null,admissionHash:null,launchHash:null,closureHash:null,processGeneration:null};
+ const provider=at=>({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:at,instances:[],totalCount:0});
+ const support={gate,primary,providerBefore:provider(p.C0),providerAfter:provider(p.C0+2)};
+ const proof={purpose:'afw.finite-trial-cleanup-proof.v1',kind:'sealed_without_admission',intentId:p.intentId,planHash:c.planHash,controlHash:c.controlHash,sourceRevision:p.canaryContainment.sourceRevision,runtimeVersionId:p.canaryContainment.runtimeVersionId,containerId:p.resources.containerId,applicationId:p.resources.applicationId,grantHash:p.grantHash,trialId:p.trialId,sealHash:gate.sealHash,proofChallenge:'2'.repeat(64),observedAt:p.C0+3,evidenceHash:hash({proofChallenge:'2'.repeat(64),sealHash:gate.sealHash,support}),sealedAt:p.C0,admissionClosed:true,launchNeverIssued:true,primaryWriterSetHash:hash(gate.writers),primaryWriterTerminal:true,primarySnapshotHash:hash(primary),providerAbsenceHash:hash([support.providerBefore,support.providerAfter])};
+ return {control:c,proof,support,expectedChallenge:proof.proofChallenge,now:()=>p.C0+3};
+}

~~~~~~~~~~

## test/fixtures/finite-connection-owner-source.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-connection-owner-source.mjs b/test/fixtures/finite-connection-owner-source.mjs
--- /dev/null
+++ b/test/fixtures/finite-connection-owner-source.mjs
@@ -0,0 +1,6 @@
+// SYNTHETIC fixed source: phase derives ONLY from actual native journal receipt.
+import {readPrivateQaFiniteOwnerSource as read} from './finite-owner-source.mjs';
+import {synchronizeSyntheticConnectionSource} from './finite-connection-source.mjs';
+export async function readPrivateQaFiniteOwnerSource(input){
+ input.parent.assertCurrent();await synchronizeSyntheticConnectionSource(input.ctx,input.preconnectionId);input.parent.assertCurrent();return read(input);
+}

~~~~~~~~~~

## test/fixtures/finite-connection-source.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-connection-source.mjs b/test/fixtures/finite-connection-source.mjs
--- /dev/null
+++ b/test/fixtures/finite-connection-source.mjs
@@ -0,0 +1,68 @@
+// SYNTHETIC PRIVATE SOURCE/CUSTODY ONLY. Static esbuild substitution; never runtime evidence.
+import {hashFinitePolicyEffectIdentity} from '../../lib/mcp-qa-finite-preparation-records.mjs';
+import {createHash} from 'node:crypto';
+import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../../lib/mcp-qa-finite-profile.mjs';
+import {finiteActivationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex');
+const script='export class AfwOwnEventNode {} export class AfwNodeControl {} export default {fetch(){return new Response(null,{status:404})}}';
+const descriptor={name:'index.mjs',sha256:sha(script),bytes:Buffer.byteLength(script)};
+const freeze=v=>{if(v&&typeof v==='object'&&!(v instanceof Uint8Array)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
+export function syntheticPreparation(phase,source){
+ const v=structuredClone(finitePublicProfileTemplate('canaryLive'));
+ for(const b of v.bindings){
+  if(b.privateSlot){delete b.privateSlot;b.text=b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?source.clientId:b.name==='AFW_OAUTH_PILOT_PROJECT_ID'?source.project.projectId:'';}
+  if(b.name.endsWith('_ENABLED'))b.text='false';
+  if(b.name==='AFW_DELEGATED_OAUTH_ENABLED'&&phase!=='closed_ui')b.text='true';
+  if(b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED'&&phase==='notice_consent')b.text='true';
+ }
+ v.bindings.push({name:'ACCESS_AUD',type:'plain_text',text:source.access.audience},{name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:source.access.teamDomain},{name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:new Date(source.window.expiresAt).toISOString()},{name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'88231',simple:{limit:30,period:60}},{name:'AFW_DOSSIER_MONITORING_OWNER_POLICY',type:'plain_text',text:''});
+ v.bindings.sort((a,b)=>a.name<b.name?-1:1);return v;
+}
+export async function initializeSyntheticConnectionMaterial(ctx){
+ const source=await ctx.storage.get('fixture:source'),configuration=syntheticPreparation('closed_ui',source);
+ source.initialBaseline={...source.initialBaseline,moduleHash:descriptor.sha256,configurationHash:finiteActivationConfigurationHash(configuration),bindingsHash:sha(JSON.stringify(configuration.bindings))};
+ await ctx.storage.put('fixture:source',source);await ctx.storage.put('fixture:configuration',configuration);
+ return {source,configuration,script,module:descriptor,restorationHash:restorationConfigurationHash(configuration)};
+}
+export async function readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease){
+ lease.assertCurrent();
+ const delay=await ctx.storage.get('fixture:source-hold');
+ if(delay&&!delay.used){
+  await ctx.storage.put('fixture:source-hold',{used:true,settled:false});
+  await new Promise(r=>setTimeout(r,6000));
+  // Test instrumentation records physical settlement; it grants no authority.
+  await ctx.storage.put('fixture:source-hold',{used:true,settled:true});
+  lease.assertCurrent();
+ }
+ const source=await ctx.storage.get('fixture:source'),pre=await ctx.storage.get('connection-preparation:'+preconnectionId+':record');
+ if(!source||!pre||env.RELEASE_DB===env.DB)throw Error('SYNTHETIC material missing original source');
+ const initial=await ctx.storage.get('connection-preparation:'+preconnectionId+':source'),original=JSON.parse(initial).source;
+ const baseline={versionId:source.currentPublication.versionId,deploymentId:source.currentPublication.deploymentId,module:descriptor,configuration:await ctx.storage.get('fixture:configuration')};
+ const rollback={versionId:original.initialBaseline.versionId,deploymentId:original.initialBaseline.deploymentId,module:descriptor,configuration:syntheticPreparation('closed_ui',original)};
+ const candidateConfiguration=stage==='finite'?structuredClone(finitePublicProfileTemplate('canaryLive')):syntheticPreparation(stage==='connection'?'read_consent':'notice_consent',source);
+ if(stage==='notices'){
+  const link=JSON.parse(await ctx.storage.get('connection-preparation:'+preconnectionId+':grant')),grant=await env.RELEASE_DB.prepare('SELECT expires_at FROM delegated_access_grants WHERE id=?').bind(link.grantId).first();
+  candidateConfiguration.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_POLICY').text=JSON.stringify({grantId:link.grantId,projectId:source.project.projectId,clientId:source.clientId,startAt:link.acceptedAt,expiresAt:Date.parse(grant.expires_at)});
+ }
+ for(const b of candidateConfiguration.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC-PRIVATE-'+b.name;}
+ const candidate={sourceRevision:source.sourceRevision,role:stage==='finite'?'canaryLive':'preparation',module:descriptor,configuration:candidateConfiguration,publicStatic:stage==='finite'?finitePublicStaticExpectation('canaryLive'):null};
+ await ctx.storage.put('fixture:candidate:'+preconnectionId+':'+stage,candidateConfiguration);
+ const storage=ctx.storage,db=env.RELEASE_DB,core=v=>JSON.stringify(Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k))));
+ return freeze({ownerSource:source,baseline,rollback,candidate,bytes:{baseline:new TextEncoder().encode(script),rollback:new TextEncoder().encode(script),candidate:new TextEncoder().encode(script)},async assertCurrent(child){
+  child.assertCurrent();if(ctx.storage!==storage||env.RELEASE_DB!==db||env.AFW_QA_VERSION?.id!==source.qaVersionId)throw Error('SYNTHETIC custody drift');
+  const latest=await storage.get('fixture:source');child.assertCurrent();if(core(latest)!==core(source))throw Error('SYNTHETIC source drift');
+ }});
+}
+
+export async function synchronizeSyntheticConnectionSource(ctx,preconnectionId){
+ if(!preconnectionId)return;
+ const source=await ctx.storage.get('fixture:source'),stages=['connection','notices','finite'],phases=['read_consent','notice_consent','finite_prearm'];
+ for(let i=2;i>=0;i--){
+  const identity={kind:'connection',preconnectionId,sourceRevision:source.sourceRevision,stage:stages[i],effect:'activation'},prefix='afw.finite-policy-effect.v1:'+hashFinitePolicyEffectIdentity(identity)+':';
+  const raw=await ctx.storage.get(prefix+'receipt');if(!raw)continue;const receipt=JSON.parse(raw),candidate=await ctx.storage.get('fixture:candidate:'+preconnectionId+':'+stages[i]);
+  if(!candidate)throw Error('SYNTHETIC acknowledged configuration missing');
+  await ctx.storage.put('fixture:source',{...source,phase:phases[i],currentPublication:{stage:stages[i],versionId:receipt.versionId,deploymentId:receipt.deploymentId,receiptHash:receipt.receiptHash}});
+  await ctx.storage.put('fixture:configuration',candidate);return;
+ }
+}

~~~~~~~~~~

## test/fixtures/finite-connection-worker.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-connection-worker.mjs b/test/fixtures/finite-connection-worker.mjs
--- /dev/null
+++ b/test/fixtures/finite-connection-worker.mjs
@@ -0,0 +1,81 @@
+import * as requestStage from '../../lib/mcp-qa-finite-stage-work.mjs';
+import {createFinitePolicyTransport} from '../../lib/mcp-qa-finite-policy-transport.mjs';
+import {FiniteOwnerFixture} from './finite-owner-worker.mjs';
+import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+import {createFiniteConnectionPreparation} from '../../lib/mcp-qa-finite-connection-preparation.mjs';
+import {initializeSyntheticConnectionMaterial} from './finite-connection-source.mjs';
+export class FiniteConnectionFixture extends FiniteOwnerFixture{
+ async fetch(request){
+  const path=new URL(request.url).pathname;
+  if(path==='/fixture/hold-final'){
+   const {mode}=await request.json();if(!['selection','nested_source'].includes(mode))throw Error('SYNTHETIC gate mode');
+   let release,settled;const wait=new Promise(r=>{release=r;}),settlement=new Promise(r=>{settled=r;});
+   const gate={mode,held:false,settled:false,finalReceipt:false,parentFinished:false,release,settlement,async hold(){this.held=true;try{await wait;}finally{this.settled=true;settled();}}};
+   const actual=this.ctx.storage;
+   const storage={put:(...a)=>actual.put(...a),get:async key=>{
+    const value=await actual.get(key);
+    if(mode==='nested_source'&&gate.finalReceipt&&!gate.held&&key==='fixture:source')await gate.hold();
+    return value;
+   },transaction:async fn=>{
+    let finite=false,selection=false;
+    const answer=await actual.transaction(async tx=>fn({get:(...a)=>tx.get(...a),put:(key,value)=>{
+     if(key.endsWith(':receipt')&&typeof value==='string'&&JSON.parse(value).stage==='finite')finite=true;
+     if(key.startsWith('source-selection:')&&key.endsWith(':head'))selection=true;
+     return tx.put(key,value);
+    }}));
+    if(finite)gate.finalReceipt=true;
+    if(mode==='selection'&&selection&&!gate.held)await gate.hold();
+    return answer;
+   }};
+   this.finalGate=gate;this.effectCtx={id:this.ctx.id,storage};return Response.json({configured:true});
+  }
+  if(path==='/fixture/final-gate-state'){
+   const gate=this.finalGate;return Response.json({held:gate.held,settled:gate.settled,parentFinished:gate.parentFinished,finalReceipt:gate.finalReceipt});
+  }
+  if(path==='/fixture/release-final'){
+   const gate=this.finalGate;gate.release();if(gate.held)await gate.settlement;return Response.json({released:true});
+  }
+  if(path==='/fixture/hold-source'){await this.ctx.storage.put('fixture:source-hold',{used:false,settled:false});return Response.json({configured:true});}
+  if(path==='/fixture/source-hold-state')return Response.json(await this.ctx.storage.get('fixture:source-hold'));
+  if(path==='/fixture/hold-claim'){
+   const actual=this.ctx.storage;let held=false;
+   const storage={get:(...a)=>actual.get(...a),put:(...a)=>actual.put(...a),transaction:async fn=>{
+    let send=false;const result=await actual.transaction(async tx=>fn({get:(...a)=>tx.get(...a),put:(key,...args)=>{if(key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':send'))send=true;return tx.put(key,...args);}}));
+    if(send&&!held){held=true;await new Promise(r=>setTimeout(r,6000));}return result;
+   }};
+   this.effectCtx={id:this.ctx.id,storage};return Response.json({configured:true});
+  }
+  if(path==='/fixture/material')return Response.json(await initializeSyntheticConnectionMaterial(this.ctx));
+
+  if(path==='/fixture/request-publish'){
+   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=createFiniteOwnerRequestLease(original),ctx=this.effectCtx??this.ctx;
+   const observer=requestStage.observeFiniteOwnerRequestWork;
+   const gate={held:true,settled:false};this.requestGate=gate;this.requestCtx=ctx;
+   try{return await observer({ctx,env:this.env,originalLease:parent.lease},async()=>{
+    requestStage.retainFiniteOwnerStagePromise(new Promise(resolve=>{gate.release=()=>{gate.settled=true;resolve();};}));
+    const prepared=await prepareFiniteOwnerChoice({ctx,env:this.env,request:original},parent.lease),refs={preconnectionId:prepared.preconnectionId,stage:prepared.stage};
+    const answer=await createFiniteConnectionPreparation({ctx,env:this.env}).run(refs,parent.lease);
+    let continued=false,replayed=false;try{continued=await requestStage.continueFiniteOwnerStageWork({ctx,env:this.env,originalLease:parent.lease},async()=>true);}catch{}
+    try{await createFinitePolicyTransport({ctx,env:this.env}).run(refs,parent.lease);replayed=true;}catch{}
+    return Response.json({answer,continued,replayed});
+   });}catch{return Response.json({rejected:true});}finally{parent.finish();}
+  }
+  if(path==='/fixture/request-missing-admission'){
+   const input=await request.json(),parent=createFiniteOwnerRequestLease(request),observer=requestStage.observeFiniteOwnerRequestWork;
+   try{return await observer({ctx:this.ctx,env:this.env,originalLease:parent.lease},async()=>{try{await createFinitePolicyTransport({ctx:this.ctx,env:this.env}).run({...input,admission:{lease:parent.lease}},parent.lease);return Response.json({accepted:true});}catch{return Response.json({accepted:false});}});}finally{parent.finish();}
+  }
+  if(path==='/fixture/publish'){
+   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=createFiniteOwnerRequestLease(original);
+   try{
+    const ctx=this.effectCtx??this.ctx;
+    const result=await prepareFiniteOwnerChoice({ctx,env:this.env,request:original},parent.lease);
+    const answer=await createFiniteConnectionPreparation({ctx,env:this.env}).run({preconnectionId:result.preconnectionId,stage:result.stage},parent.lease);
+    return Response.json(answer);
+   }catch{return Response.json({status:'admin_pending',mayRetry:false,operationalReadiness:false});}finally{parent.finish();if(this.finalGate?.held)this.finalGate.parentFinished=true;}
+  }
+  return super.fetch(request);
+ }
+}
+const worker={fetch(request,env){return env.FIXTURE.get(env.FIXTURE.idFromName('owner')).fetch(request);}};
+
+export default worker;

~~~~~~~~~~

## test/fixtures/finite-finalizer.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-finalizer.mjs b/test/fixtures/finite-finalizer.mjs
--- /dev/null
+++ b/test/fixtures/finite-finalizer.mjs
@@ -0,0 +1,33 @@
+import {finiteLauncherInstanceId} from '../../lib/mcp-qa-finite-launch-records.mjs';
+import {finiteGhaCustody} from '../../lib/mcp-qa-finite-custody.mjs';
+import {validateQaFiniteConfirmationCommand} from '../../lib/mcp-qa-cloud-lifecycle-admission.mjs';
+import {finiteRestorationFixture} from './finite-restoration.mjs';
+import {finiteHash as hash} from '../../lib/mcp-finite-evidence.mjs';
+import {projectPrivateQaFiniteReferences} from '../../lib/mcp-qa-finite-trial-control.mjs';
+import {projectFiniteExternalPlan,validateFiniteObserverOutput} from '../../lib/mcp-qa-finite-external-contract.mjs';
+import {finiteObserverInstanceId} from '../../lib/mcp-qa-finite-observer.mjs';
+export async function finiteFinalizerFixture({configure=()=>{},at,authenticatedIntent=false}={}){
+ const base=await finiteRestorationFixture({at,configure:(p,f)=>{const actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};p.intentId=authenticatedIntent?validateQaFiniteConfirmationCommand({event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:actor,comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+p.source.revision,created_at:new Date(p.T0).toISOString(),author_association:'OWNER',user:actor}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:p.source.revision},now:()=>p.T0}).intentId:'a'.repeat(64);p.workflows.launcher=finiteLauncherInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});configure(p,f);}});
+ const {f,identity,store,ctl}=base,p=f.plan,v=projectPrivateQaFiniteReferences(identity),retained=base.retained.record;
+ const policy=[{effect:'allow',resources:{'com.cloudflare.api.account.85d0d5dadac3341a564f22ce885e9eec':'*'},permission_groups:[{id:'1'.repeat(32)},{id:'2'.repeat(32)}]}];
+ const custody=finiteGhaCustody();
+ for(const kind of ['withdraw','close','seal','canary_restore']){
+  const claim=kind==='canary_restore'?base.input.claim:(await ctl.claimEffect(kind)).claim;
+  const receipt=kind==='canary_restore'?{purpose:'afw.finite-canary-restored.v1',intentId:p.intentId,controlHash:v.controlHash,proofHash:retained.proofHash,versionId:p.deployments.canaryClosed.versionId,deploymentId:p.deployments.canaryClosed.deploymentId,readbackHash:'b'.repeat(64),observedAt:f.now()}:{synthetic:true};
+  f.rows.set('afw.qa-finite-guard.v1:'+p.intentId+':effect:'+kind,{purpose:'afw.finite-guard-effect.v1',controlHash:v.controlHash,kind,claimHash:hash(claim),phase:'complete',receipt,completedAt:f.now()});
+ }
+ const completed=await store.retainCompletion();if(completed.status!=='complete')throw Error('fixture completion '+completed.status);
+ const native=await ctl.claimEffect('qa_restore');if(native.status!=='issued')throw Error('fixture claim '+native.status);
+ const qaClaim={purpose:'afw.finite-qa-claim-handoff.v1',claim:native.claim,claimHash:hash(native.claim)};
+ const plan=projectFiniteExternalPlan({control:identity,preview:v,custody});
+ const primary={...retained.support.primary,observedAt:f.now()},writers={purpose:'afw.finite-writer-exclusion.v1',controlHash:v.controlHash,sealHash:retained.proof.sealHash,settledWriterHash:hash(retained.support.gate.writers),sourceRevision:p.canaryContainment.sourceRevision,closedModuleHash:p.deployments.canaryClosed.module.sha256,inventoryHash:'c'.repeat(64),knownActive:0,knownPending:0,unresolvedRemoteWrites:0,legacyContained:true,closedSourceQualified:true,observedAt:f.now()};
+ const body={purpose:'afw.finite-final-primary.v1',intentId:p.intentId,controlHash:v.controlHash,planHash:v.planHash,proofHash:retained.proofHash,completionHash:completed.receipt.receiptHash,nativeClaimHash:qaClaim.claimHash,sealHash:retained.proof.sealHash,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId,actorId:v.actorId,closedCanaryVersionId:p.deployments.canaryClosed.versionId,closedCanaryModuleHash:p.deployments.canaryClosed.module.sha256,primary,writers,observedAt:f.now()};
+ const primaryReceipt={...body,receiptHash:hash(body)};
+ const output={purpose:'afw.finite-observer-output.v1',instanceId:p.workflows.bootstrap,provenance:{purpose:'afw.finite-observer-provenance.v1',instanceId:p.workflows.bootstrap,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId},preview:v,retained,completion:completed.receipt,qaClaim,plan,primaryReceipt};
+ validateFiniteObserverOutput(output,plan);
+ let posts=0,claims=0,version=p.deployments.qaLive.versionId,deployment=p.deployments.qaLive.deploymentId,send;
+ const state={output:structuredClone(output),jobId:99,claimMode:'issued',lostPost:false,late:false,blocked:false};
+ const snapshot=()=>({purpose:'afw.finite-qa-snapshot.v1',observedAt:f.now(),qaVersionId:version,qaDeploymentId:deployment,output:state.output,restoreJobId:state.jobId,custodyExpiresAt:p.R1,profilesVerified:true,namespacesPreserved:true,exposureDisabled:true,providerSettled:true,workflowsTerminal:true,primarySealedChainVerified:!state.blocked,githubVerified:true,evidenceHash:'a'.repeat(64)});
+ const deps={plan,now:f.now,signal:new AbortController().signal,readSnapshot:async()=>snapshot(),claim:async r=>{claims++;if(send)return 'existing';if(state.claimMode!=='issued')return state.claimMode;send=r;return 'issued';},deployClosed:async()=>{posts++;version=p.deployments.qaClosed.versionId;deployment='99999999-9999-4999-8999-999999999999';if(state.late)f.setNow(p.R1);if(state.lostPost)throw Error('lost');return{deploymentId:deployment};}};
+ return {...base,restorationState:base.state,plan,preview:v,custody,policy,output,state,deps,snapshot,get posts(){return posts;},get claims(){return claims;},get send(){return send;},setPointer:(a,b)=>{version=a;deployment=b;}};
+}

~~~~~~~~~~

## test/fixtures/finite-first-connection-publication.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
--- /dev/null
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -0,0 +1,410 @@
+// Fixed Node SYN component probes. DATA approvals exercise only the factual writer;
+// they never consume an admission, publish a version, or produce ConnectionReceipt.
+import assert from 'node:assert/strict';
+export async function plain(p){const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v[Symbol.dispose]?.();}}
+export function extendEnrollmentComponent(entry,writerAvailable){
+ const imports=`import {readPrivateQaFiniteInitialAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
+ import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encodePrep,hashFinitePreparationRecord as hashPrep,hashFiniteOwnerEvidence as componentEvidence,hashFiniteOwnerPreparationProject as projectHash} from './lib/mcp-qa-finite-preparation-records.mjs';
+ import {finiteActivationConfigurationHash} from './lib/mcp-activation-observer.mjs';
+ import {finitePublicProfileTemplate} from './lib/mcp-qa-finite-profile.mjs';
+ import {initialHash as initialDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
+ ${writerAvailable?"import {prepareFinitePreparationEnrollmentWrite} from './lib/mcp-qa-finite-preparation-enrollment-writer.mjs';":''}
+ `;
+ const methods=` async captureLegacyEnrollment(token,screen){
+  const s=this.ctx.storage,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},trace=[],P='afw.finite-preparation-cleanup.v1:';
+  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
+  s.get=async(...a)=>{observe('get',a[0]);return Reflect.apply(native.get,s,a);};
+  s.list=async(...a)=>{observe('list',a[0]?.prefix);return Reflect.apply(native.list,s,a);};
+  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
+  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
+  s.transaction=async fn=>{const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(key,value)=>{observe('put',key);return tx.put(key,value);}})]);trace.push('transaction-settled');return result;};
+  try{const result=await this.enrollmentPost(token,screen);return {result,trace:trace.slice(trace.indexOf('put:enrollment'))};}
+  finally{for(const [key,value]of Object.entries(native))s[key]=value;}
+ }
+  async exerciseEnrollmentComponent(scenario='normal'){
+   try{return await this.exerciseEnrollmentComponentBody(scenario);}
+   catch(error){console.info('T1 component setup failure',String(error?.stack??error));return {trace:[],enrollment:null,ack:null,failure:'SYN component setup: '+String(error),settled:true};}
+  }
+  async exerciseEnrollmentComponentBody(scenario='normal'){
+  const allowed=['normal','double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'];
+  if(!allowed.includes(scenario))throw Error('SYN scenario absent');
+  const ctx=this.ctx,env=this.env,s=ctx.storage,controller=new AbortController(),start=Date.now(),end=start+5000;
+  const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()>=end)throw Error('SYN original child expired');}});
+  const facts=await readPrivateQaFiniteInitialAnchors({ctx,env},lease),{capsule:c,material,actorId,plan}=facts,p=material.ownerSelection;
+  const source=validateFiniteOwnerSource({sourceRevision:c.sourceRevision,actorId,qaNamespaceId:finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id,qaVersionId:c.qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:p.project,goal:p.goal,programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:initialDigest('afw.finite-original-context.v1',material.originalContext)},initialBaseline:{versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,moduleHash:c.moduleHash,configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:c.bindingsHash},currentPublication:{stage:null,versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,receiptHash:null},window:{startedAt:c.I0,expiresAt:c.C0}});
+  const at=Date.now(),preconnectionId=c.preconnectionId,realm=componentEvidence('realm',{...source.access,origin:source.origin}),subjectHash=componentEvidence('subject',{accessRealmHash:realm,subject:p.subject}),ticketHash='8'.repeat(64),projectRef='7'.repeat(64);
+  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt:c.C0};
+  const decision={purpose:'afw.finite-connection-approval.v1',subjectHash,sourceRevision:c.sourceRevision,projectHash:projectHash(p.project),clientId:p.clientId,approvedAt:at,expiresAt:c.C0,csrfReceiptHash:componentEvidence('decision',{ticket,decision:'approve',projectHash:projectHash(p.project),goal:p.goal,clientId:p.clientId,approvedAt:at,expiresAt:c.C0})};
+  const approvalHash=hashPrep('ConfigurationApproval',decision),approval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision:c.sourceRevision,stage:'connection',ticketHash,approvalHash};
+  const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId,sourceRevision:c.sourceRevision,actorId,owner:{subject:p.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:c.C0},project:p.project,clientId:p.clientId,resource:p.resource,startedAt:at,expiresAt:c.C0,approvalHash,baselineHash:componentEvidence('baseline',source.initialBaseline)};pre.recordHash=hashPrep('Preconnection',pre);
+  const snapshot={preconnectionId,initialTicketHash:ticketHash,source};snapshot.sourceHash=hashPrep('OwnerSourceSnapshot',snapshot);
+  const prefix='connection-preparation:'+preconnectionId,rows=[[prefix+':record','Preconnection',pre],[prefix+':source','OwnerSourceSnapshot',snapshot],[prefix+':connection:approval','StageApproval',approval],['connection-approval:'+approvalHash,'ConfigurationApproval',decision],['owner-ticket:'+ticketHash,'Ticket',ticket],['owner-ticket:'+ticketHash+':use','TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',ticketHash,recordHash:decision.csrfReceiptHash,consumedAt:at}],['owner-project-ref:'+projectRef,'ProjectRef',{projectRef,preconnectionId,subjectHash,sourceRevision:c.sourceRevision,projectId:p.project.projectId,revision:p.project.revision,issuedAt:at,expiresAt:c.C0}]];
+  for(const [key,kind,value]of rows)await s.put(key,encodePrep(kind,value));await s.sync();
+  const trace=[],native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},metadata=env.AFW_QA_VERSION;
+  let committed=null,failure=null,enrollment=null,ack=null,settled=false,writer;
+  const P='afw.finite-preparation-cleanup.v1:';
+  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
+  s.get=async(...args)=>{observe('get',args[0]);return Reflect.apply(native.get,s,args);};
+  s.list=async(...args)=>{observe('list',args[0]?.prefix);return Reflect.apply(native.list,s,args);};
+  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
+  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
+  s.transaction=async fn=>{
+   const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...args)=>tx.get(...args),list:(...args)=>tx.list(...args),put:(key,value)=>{observe('put',key);committed=key;return tx.put(key,value);}})]);
+   trace.push('transaction-settled');
+   if(scenario==='unknown-enrollment'&&committed===P+'enrollment'||scenario==='unknown-ack'&&committed===P+'ack')throw Error('SYN native commit return unknown');
+   return result;
+  };
+  try{
+   if(!${writerAvailable})throw Error('fixed factual enrollment writer contract absent');
+   const baseline={versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,module:readPrivateQaFiniteCandidate().module,configuration:plan.configuration};
+   writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash:hashPrep('StageApproval',approval),ownerSource:source,baseline,baselineBytes:readPrivateQaFiniteCandidate().bytes},lease,end);
+   if(!Object.isFrozen(writer)||Object.keys(writer).sort().join(',')!=='recordAck,recordEnrollment')throw Error('SYN writer interface mismatch');
+   trace.push('writer-prepared');
+   if(scenario==='holder-drift')env.AFW_QA_VERSION={id:metadata.id};
+   if(scenario==='deadline')controller.abort();
+   if(scenario==='ack-first')await writer.recordAck();
+   else {
+    const first=writer.recordEnrollment();
+    if(scenario==='double-enrollment')await writer.recordEnrollment().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-enrollment-denied');});
+    const recorded=await first;enrollment=recorded.enrollment;const enrollmentReturnedAt=Date.now();
+    if(recorded.ack!==null)throw Error('SYN premature ACK');
+    const second=writer.recordAck();
+    if(scenario==='double-ack')await writer.recordAck().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-ack-denied');});
+    ack=(await second).ack;if(ack.acknowledgedAt>enrollmentReturnedAt)throw Error('SYN ACK was prepared after enrollment returned');
+   }
+  }catch(error){failure=String(error);}
+  finally{settled=true;for(const [key,value]of Object.entries(native))s[key]=value;env.AFW_QA_VERSION=metadata;controller.abort();}
+  return {trace,enrollment,ack,failure,settled};
+ }
+ `;
+ return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+export async function exerciseEnrollmentWriter(f,scenario){
+ assert.equal(f.mode,'first-connection-enrollment-component');
+ const before={uploads:f.uploads.length,activations:f.activations.length};
+ const result=await plain(f.stub.exerciseEnrollmentComponent(scenario));
+ assert.equal(f.uploads.length,before.uploads,'component has zero provider upload');
+ assert.equal(f.activations.length,before.activations,'component has zero provider activation');
+ const rows=await plain(f.stub.snapshot());
+ assert.equal(rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')).length,0,'no ConnectionReceipt or SEND');
+ return result;
+}
+
+// First-connection SOURCE lab: no seeded connection facts or source alias.
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {gzipSync} from 'node:zlib';
+import {readFile} from 'node:fs/promises';
+import {buildMcpNodeProgram} from '../../scripts/build-mcp-node-program.mjs';
+import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+const digest=x=>createHash('sha256').update(x).digest('hex');
+const origin='https://delegated-canary.agentfriendlyweb.dev';
+export async function compileFirstConnectionCandidate(revision,tree,{negativeProfile=false}={}){
+ const node=await buildMcpNodeProgram(),define={'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event')};
+ const options={bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define};
+ const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs']});
+ const bytes=m.outputFiles[0].contents,compressed=gzipSync(bytes,{level:9,mtime:0});
+ const resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:revision,sourceTree:tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:{name:'index.mjs',sha256:digest(bytes),bytes:bytes.length},compressedSha256:digest(compressed),compressedBytes:compressed.length,content:Buffer.from(compressed).toString('base64')};
+ // Negative-only, separately hashed ordinary-entry/SQL spy. The positive M
+ // uses m.outputFiles unchanged, not this instrumented wrapper.
+ const source=String.raw`
+ import finite from './worker/mcp-own/finite.mjs';
+ export {AfwOwnEventNode,AfwNodeControl} from './worker/mcp-own/finite.mjs';
+ import {finiteNativeActor} from './lib/mcp-qa-finite-owner-native-wire.mjs';
+ let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0;
+ export default{async fetch(request,env,ctx){
+  const path=new URL(request.url).pathname;
+  if(path==='/_fixture/fault'){fault=await request.text();return new Response(null,{status:204});}
+  if(path==='/_fixture/probe')return Response.json({ordinary:globalThis.__firstConnectionOrdinary,sql,forwarded});
+  const ns=env.AFW_FINITE_TRIAL_CONTROL,db=env.DB;
+  const prepared={...env,DB:{prepare(...a){sql++;return db.prepare(...a);},withSession(...a){sql++;return db.withSession(...a);}}};
+  if(fault==='qa-absent')prepared.AFW_FINITE_TRIAL_CONTROL=undefined;
+  if(fault==='version')prepared.AFW_FINITE_TRIAL_VERSION={id:'invalid'};
+  if(fault==='actor')prepared.AFW_FINITE_TRIAL_CONTROL={idFromName(){return {toString:()=> 'bad'};},get(){throw Error('SYN wrong actor');}};
+  if(!['qa-absent','actor'].includes(fault))prepared.AFW_FINITE_TRIAL_CONTROL={idFromName:ns.idFromName.bind(ns),get(id){
+   const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
+  }};
+  if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
+  // Literal actor is asserted in the product forwards, never selected by input.
+  if(!finiteNativeActor)throw Error('SYN missing actor');
+  return finite.fetch(request,prepared,ctx);
+ }};
+ `;
+ const spyOptions={...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]};
+ const spy=await build(spyOptions),wrong=negativeProfile?await build({...spyOptions,define:{...define,'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('ordinary')}}):null;
+ return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
+}
+export function extendFirstConnectionPublication(entry){
+ return "import {createHash as firstTraceHash} from 'node:crypto';\nimport {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
+ async fetch(request){
+  try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstRequestId=request.headers.get('x-afw-finite-request-id');globalThis.__t3NativeTraceRequestId=this.firstRequestId;this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,originalMethod:this.firstOriginalMethod,requestId:this.firstRequestId,version:request.headers.get('x-afw-finite-version')});
+  const originalMethod=this.firstOriginalMethod,requestId=this.firstRequestId,target=request.url,trace=this.firstState?.trace,actual=super.fetch(request);
+  const observed=response=>{if(originalMethod==='POST'&&target==='https://afw-private.invalid/_finite-owner/choice')trace?.push({kind:'native-response-return',requestId,originalMethod,target,status:response.status,at:Date.now()});};
+  if(actual&&typeof actual.then==='function')actual.then(observed,()=>{}).catch(()=>{});else observed(actual);
+  return actual;
+ }
+
+
+
+
+ async firstConnectionTicketFault(variant){
+  const s=this.ctx.storage;
+  if(variant==='restore'){for(const [key,raw]of this.firstTicketOriginal??[])await s.put(key,raw);this.firstTicketOriginal=null;await s.sync();return {restored:true};}
+  if(this.firstTicketOriginal)throw Error('SYN ticket corruption not restored');
+  const rows=[...await s.list()],ticketRow=rows.find(([key])=>key.startsWith('owner-ticket:')&&!key.endsWith(':use'));if(!ticketRow)throw Error('SYN actual choice ticket absent');
+  let key=ticketRow[0],kind='Ticket',record=JSON.parse(ticketRow[1]);
+  if(variant==='action'){record.action='notices';record.connectionRef='c'.repeat(64);}
+  if(variant==='preconnection')record.preconnectionId='f'.repeat(64);
+  if(variant==='source')record.sourceRevision='e'.repeat(40);
+  if(variant==='subject-realm')record.subjectHash='d'.repeat(64);
+  if(variant==='project-map'){kind='ProjectRef';key='owner-project-ref:'+record.projectRef;record=JSON.parse(await s.get(key));record.projectId='SYN-foreign-project';}
+  if(variant==='snapshot'){kind='OwnerSourceSnapshot';key='connection-preparation:'+record.preconnectionId+':source';record=JSON.parse(await s.get(key));record.source.project.revision++;record.sourceHash=firstPrepHash(kind,record);}
+  const original=await s.get(key),raw=firstPrepEncode(kind,record);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN negative ticket codec');
+  this.firstTicketOriginal=[[key,original]];await s.put(key,raw);await s.sync();return {codecRoundtrip:true,kind};
+ }
+ async firstConnectionCorruptCompleted(variant){
+  const s=this.ctx.storage;
+  if(variant==='restore'){for(const [key,raw]of this.firstCorruptedOriginal??[])await s.put(key,raw);this.firstCorruptedOriginal=null;await s.sync();return;}
+  if(this.firstCorruptedOriginal)throw Error('SYN corruption not restored');
+  const rows=[...await s.list()],effect=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')),send=kind=>effect.find(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===kind),u=send('upload'),a=send('activation'),r=effect.find(([key])=>key.endsWith(':receipt'));
+  if(!u||!a||!r)throw Error('SYN actual completed publication absent');
+  const up=JSON.parse(u[1]),act=JSON.parse(a[1]),uploadAck=JSON.parse(await s.get(u[0].slice(0,-4)+'ack')),activationAck=JSON.parse(await s.get(a[0].slice(0,-4)+'ack')),receipt=JSON.parse(r[1]),modified=[];
+  const change=async(key,kind,value)=>{const original=await s.get(key);modified.push([key,original]);if(kind==='Preconnection')value.recordHash=firstPrepHash(kind,value);if(kind==='ConnectionReceipt')value.receiptHash=firstPrepHash(kind,value);const raw=firstPrepEncode(kind,value);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN codec did not roundtrip');await s.put(key,raw);};
+  const foreign='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
+  if(variant==='owner'||variant==='source'){
+   const key='connection-preparation:'+receipt.preconnectionId+':record',pre=JSON.parse(await s.get(key));if(variant==='owner')pre.owner.subject='SYN-foreign-owner';else pre.sourceRevision='e'.repeat(40);await change(key,'Preconnection',pre);
+  }else{
+   if(variant==='context')up.contextHash=act.contextHash='f'.repeat(64);
+   if(variant==='baseline'){up.baselineVersionId=act.baselineVersionId=receipt.baselineVersionId=foreign;up.baselineDeploymentId=act.baselineDeploymentId=receipt.baselineDeploymentId=foreign;}
+   if(variant==='preconnection')receipt.preconnectionId='f'.repeat(64);
+   if(variant==='module')receipt.moduleHash='f'.repeat(64);
+   if(variant==='configuration')receipt.configurationHash='f'.repeat(64);
+   if(variant==='version')uploadAck.resourceId=receipt.versionId=foreign;
+   if(variant==='deployment')activationAck.resourceId=receipt.deploymentId=foreign;
+   if(variant==='receipt-links')receipt.baselineDeploymentId=foreign;
+   if(variant==='receipt-time')receipt.completedAt=act.deadline;
+   if(!['context','baseline','preconnection','module','configuration','version','deployment','receipt-links','receipt-time','writer-head'].includes(variant))throw Error('SYN unknown completed variant');
+   uploadAck.sendHash=firstPrepHash('ConnectionSend',up);activationAck.sendHash=firstPrepHash('ConnectionSend',act);
+   for(const [key,kind,value]of [[u[0],'ConnectionSend',up],[a[0],'ConnectionSend',act],[u[0].slice(0,-4)+'ack','ConnectionAck',uploadAck],[a[0].slice(0,-4)+'ack','ConnectionAck',activationAck],[r[0],'ConnectionReceipt',receipt]])await change(key,kind,value);
+   const key='afw.finite-policy-effect.v1:writer-head';modified.push([key,await s.get(key)]);const h=variant==='writer-head'?up:act,identity={kind:'connection',preconnectionId:h.preconnectionId,sourceRevision:h.sourceRevision,stage:h.stage,effect:h.effect};await s.put(key,JSON.stringify({identityHash:firstIdentityHash(identity),sendHash:firstPrepHash('ConnectionSend',h)}));
+  }
+  this.firstCorruptedOriginal=modified;await s.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/journal-codec'));
+  try{const identity=kind=>({kind:'connection',preconnectionId:up.preconnectionId,sourceRevision:up.sourceRevision,stage:'connection',effect:kind}),upload=await firstJournal({storage:s,identity:identity('upload'),now:Date.now}).read(root.lease),activation=await firstJournal({storage:s,identity:identity('activation'),now:Date.now}).read(root.lease);return {codecRoundtrip:true,journalValid:upload.state==='acknowledged'&&activation.state==='installed'};}finally{root.finish();}
+ }
+
+
+ async firstConnectionExpiredEntry(){
+  const now=Date.now(),headers={'x-afw-finite-boundary':JSON.stringify({startedAt:now-30000,deadline:now-1,remainingMs:0}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID()};
+  const response=await this.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers})),status=response.status;await response.body?.cancel();return {status};
+ }
+ async firstConnectionBodyControl(key){if(this.firstBodyControl)this.firstBodyControl[key]=true;}
+ async firstConnectionBodyState(){return this.firstBodyState??{};}
+ async firstConnectionBodyStart(kind='read'){
+  const began=Date.now(),deadline=began+30000,owner=this,controller=new AbortController(),state=this.firstBodyState={readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false,kind},control=this.firstBodyControl={abort:false,read:false,cancel:false};
+  const held=key=>{state[key+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(remaining<=0){state[key+'Settled']=true;reject(Error('SYN original body deadline'));return;}if(control[key]){state[key+'Settled']=true;resolve();return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
+  let pulled=false;
+  const body=new ReadableStream({start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},pull(c){if(kind!=='read'||pulled)return;pulled=true;return held('read').then(()=>{c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(64)));});},cancel(){return held('cancel');}},{highWaterMark:0});
+  const headers={'x-afw-finite-boundary':JSON.stringify({startedAt:began,deadline,remainingMs:30000}),'x-afw-finite-original-method':'POST','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded'};
+  let timer,logicalFinished=false;
+  const tick=()=>{if(logicalFinished)return;if(control.abort||Date.now()>=deadline){controller.abort();return;}timer=setTimeout(tick,Math.min(10,Math.max(1,deadline-Date.now())));};tick();
+  try{const response=await owner.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers,body,signal:controller.signal}));state.status=response.status;await response.body?.cancel();return state;}
+  finally{logicalFinished=true;clearTimeout(timer);state.logicalFinished=true;}
+ }
+
+ async firstConnectionRestart(){this.ctx.abort('SYN original actor restart');}
+ async firstConnectionInstance(){return this.firstInstance??=crypto.randomUUID();}
+ async firstConnectionBackupFault(mode){
+  const s=this.ctx.storage;
+  if(mode==='restore'){for(const [key,raw]of this.firstBackupOriginal??[])await s.put(key,raw);await s.sync();return;}
+  const rows=[...await s.list()],entries=rows.filter(([key])=>key.startsWith('afw.finite-initial-upload.v1:'));this.firstBackupOriginal??=entries;
+  const backup=entries.find(([key])=>key.endsWith(':backup')),chunk=entries.find(([key])=>key.includes(':chunk:')),receipt=entries.find(([key])=>key.endsWith(':receipt'));
+  const target=mode==='missing-backup'?backup:mode==='missing-receipt'?receipt:chunk;if(!target)throw Error('SYN retained original target absent');
+  if(mode.startsWith('missing-'))await s.delete(target[0]);else await s.put(target[0],target[1]+' ');
+  await s.sync();
+ }
+ async firstConnectionAvailability(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/live-root')),entered=Date.now();
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({available:true,live:true,entered}));}
+  catch{return {available:false,live:!root.lease.signal.aborted,entered};}finally{root.finish();}
+ }
+ async firstConnectionRestore(){this.firstRestore?.();this.firstRestore=null;}
+ async firstConnectionState(){return {...(this.firstState??{trace:[]}),http:globalThis.__t3Http??[]};}
+ async firstConnectionRelease(which='work'){if(this.firstRelease)this.firstRelease[which]=true;}
+ async firstConnectionConfigure(mode='normal'){
+  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};globalThis.__t3NativeTrace=this.firstState.trace;this.firstRelease={};
+  const owner=this,state=this.firstState,s=this.ctx.storage,env=this.env,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},fetcher=globalThis.fetch,wall=Date.now;
+  let writes=[],receiptRead=false,shift=0;const committedValues=new Map();const originalMetadata=env.AFW_QA_VERSION,originalQaId=originalMetadata.id,originalPrepare=env.RELEASE_DB.prepare,originalNode=env.AFW_RELEASE_EVENTS_NODE,nodeName=originalNode.idFromName,originalSelf=env.AFW_INDEPENDENT_CLOSURE,selfGet=originalSelf.get,originalKv=env.AFW_FINITE_OWNER_OAUTH_KV,kvGet=originalKv.get,originalReader=env.AFW_MCP_CLOSURE_READ_TOKEN;state.afterDriftIo={get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0};const afterDrift=kind=>{if(state.holderChanged)state.afterDriftIo[kind]++;};state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
+  db.withSession=(...args)=>{afterDrift('db');if(args[0]==='first-primary')state.counts.firstPrimary++;const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=(...a)=>{state.counts.sql++;const statement=Reflect.apply(prepare,session,a);if(mode==='source-sql-held'&&String(a[0]).includes('site_projects')){const bind=statement.bind;statement.bind=(...values)=>{const bound=Reflect.apply(bind,statement,values),first=bound.first;bound.first=async(...params)=>{const actual=Reflect.apply(first,bound,params),value=await actual;if(state.sqlHeld)return value;state.sqlHeld=true;return held('work',value);};return bound;};}return statement;};return session;};
+  s.list=(...args)=>{afterDrift('list');state.counts.list++;return Reflect.apply(native.list,s,args);};
+  const target=key=>typeof key==='string'&&(key.startsWith('afw.finite-preparation-cleanup.v1:')||key.startsWith('afw.finite-policy-effect.v1:'));
+  const rawHash=value=>typeof value==='string'?firstTraceHash('sha256').update(value).digest('hex'):null;
+  const note=(kind,key,value,scope,transactionId=null)=>{if(target(key))state.trace.push({kind,key,valueHash:rawHash(value),scope,transactionId,requestId:owner.firstRequestId,at:Date.now()});};
+  const held=(name,value)=>{const deadline=owner.firstBoundary.deadline;state[name+'Boundary']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state[name+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){state[name+'Settled']=true;reject(Error('SYN original request deadline'));return;}if(owner.firstRelease[name]===true){state[name+'Settled']=true;resolve(value);return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
+  const get=async(method,holder,args,scope='storage',transactionId=null,transactionReads=null)=>{
+   afterDrift('get');state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key,value,scope,transactionId);if(transactionReads&&target(key))transactionReads.push([key,value]);
+   if(mode==='clock-backward'&&owner.firstBoundary&&!state.backward){shift-=100;state.backward=true;}
+   if(mode==='source-holder-drift'&&owner.firstBoundary&&!state.holderChanged){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
+   if(mode==='access-expiry-held'&&state.jwkFetched&&!state.workHeld)return held('work',value);
+   if(mode==='receipt-readback-lost'&&key.endsWith(':receipt')&&key.startsWith('afw.finite-policy-effect.v1:')&&value!==undefined)throw Error('SYN receipt readback unknown');
+   if(mode==='final-pair-owner-drift'&&receiptRead&&key.endsWith(':capsule'))await env.RELEASE_DB.prepare("UPDATE site_projects SET user_id='SYN-negative-owner'").run();
+   if(target(key)&&key.endsWith(':receipt')&&value!==undefined)receiptRead=true;
+   return value;
+  };
+  s.get=(...a)=>get(native.get,s,a);
+  s.transaction=fn=>{
+   const transactionId=++state.counts.transaction,currentWrites=[],currentValues=new Map(),currentReads=[];
+   const actual=Reflect.apply(native.transaction,s,[async tx=>{
+    const result=await fn({get:(...a)=>get(tx.get,tx,a,'transaction',transactionId,currentReads),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k,v,'transaction',transactionId);const out=await tx.put(k,v);note('put-settled',k,v,'transaction',transactionId);currentValues.set(k,v);currentWrites.push(k);return out;}});
+    return result;
+   }]).then(value=>{writes=currentWrites;for(const key of writes){const raw=currentValues.get(key);if(target(key))committedValues.set(key,raw);note('transaction-settled',key,raw,'transaction',transactionId);}if(currentWrites.length===0)for(const [key,raw]of currentReads)note('readback-transaction-settled',key,raw,'transaction',transactionId);return value;});
+   return actual.then(async value=>{
+    if(mode==='enrollment-transaction-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-send-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))||mode==='receipt-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native transaction result lost');
+    if(mode==='enrollment-transaction-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-ack-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':ack'))||mode==='receipt-transaction-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':receipt')))return held('work',value);
+    return value;
+   });
+  };
+  s.sync=async(...args)=>{
+   state.counts.sync++;const syncing=writes.map(key=>[key,committedValues.get(key)]),value=await Reflect.apply(native.sync,s,args);for(const [key,raw]of syncing)note('sync-settled',key,raw,'storage');
+   if(mode==='enrollment-sync-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='receipt-sync-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native sync result lost');
+   if(mode==='enrollment-sync-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
+   return value;
+  };
+  globalThis.fetch=async(...args)=>{
+   const url=String(args[0]),method=args[1]?.method??'GET',effect=method==='POST'?(url.endsWith('/versions?deploy=false')?'upload':url.endsWith('/deployments')?'activation':null):null;
+   afterDrift('fetch');if(effect){state[effect+'Admission']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state.trace.push({kind:'native-invocation',effect,requestId:owner.firstRequestId,method,url,bodyHash:rawHash(args[1]?.body),at:Date.now()});}const response=await Reflect.apply(fetcher,globalThis,args);if(url.endsWith('/cdn-cgi/access/certs'))state.jwkFetched=true;if(!effect)return response;
+   state.trace.push({kind:'native-result-enter',effect,requestId:owner.firstRequestId,status:response.status,at:Date.now()});
+   if(effect==='upload'){
+    if(mode==='upload-metadata-id-drift'){originalMetadata.id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';state.holderChanged=true;}
+    if(mode==='upload-db-method-drift'){db.withSession=(...args)=>{afterDrift('db');return Reflect.apply(withSession,db,args);};state.holderChanged=true;}
+    if(mode==='upload-db-prepare-drift'){db.prepare=(...args)=>{afterDrift('db');return Reflect.apply(originalPrepare,db,args);};state.holderChanged=true;}
+    if(mode==='upload-node-method-drift'){originalNode.idFromName=(...args)=>{afterDrift('node');return Reflect.apply(nodeName,originalNode,args);};state.holderChanged=true;}
+    if(mode==='upload-self-method-drift'){originalSelf.get=(...args)=>{afterDrift('self');return Reflect.apply(selfGet,originalSelf,args);};state.holderChanged=true;}
+    if(mode==='upload-kv-method-drift'){originalKv.get=(...args)=>{afterDrift('kv');return Reflect.apply(kvGet,originalKv,args);};state.holderChanged=true;}
+    if(mode==='upload-fetch-drift'){globalThis.fetch=(...args)=>{afterDrift('fetch');return Reflect.apply(fetcher,globalThis,args);};state.holderChanged=true;}
+    if(mode==='upload-credential-drift'){env.AFW_MCP_CLOSURE_READ_TOKEN='SYN-negative-changed-reader';state.holderChanged=true;}
+   }
+   if(mode===effect+'-holder-drift'){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
+   if(mode===effect+'-lost')throw Error('SYN applied provider result lost');
+   if(mode===effect+'-held')return held('fetch',response);
+   if(mode===effect+'-malformed'){await response.body.cancel();return Response.json({success:true,errors:[],messages:[],result:{id:'invalid'}},{headers:response.headers});}
+   if(mode===effect+'-cached'){await response.body.cancel();return new Response('SYN rejected cache',{status:200,headers:{...Object.fromEntries(response.headers),Age:'1'}});}
+   if(mode==='upload-oversize'){await response.body.cancel();return new Response('SYN header only',{status:200,headers:{...Object.fromEntries(response.headers),'Content-Length':'4718593'}});}
+   if(mode==='upload-cancel-held'){await response.body.cancel();return new Response(new ReadableStream({cancel(){return held('cancel');}}),{status:401,headers:response.headers});}
+   if(mode==='upload-read-held'){
+    await response.body.cancel();let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return held('read').then(()=>{controller.enqueue(new Uint8Array([123]));});},cancel(){return held('cancel');}}),{headers:response.headers});
+   }
+   return response;
+  };
+  Date.now=()=>wall()+shift;
+  this.firstRestore=()=>{for(const [key,value]of Object.entries(native))s[key]=value;globalThis.fetch=fetcher;Date.now=wall;db.withSession=withSession;originalMetadata.id=originalQaId;env.AFW_QA_VERSION=originalMetadata;db.prepare=originalPrepare;originalNode.idFromName=nodeName;originalSelf.get=selfGet;originalKv.get=kvGet;env.AFW_MCP_CLOSURE_READ_TOKEN=originalReader;};
+ }
+ async firstConnectionReseal(effect='upload',variant='ack'){
+  const s=this.ctx.storage,rows=[...await s.list({prefix:'afw.finite-policy-effect.v1:'})],pair=rows.find(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect===effect);if(!pair)throw Error('SYN actual SEND absent');
+  const send=JSON.parse(pair[1]),resourceId=effect==='upload'?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
+  if(variant==='ack-matched'){const frozen=Date.now();Date.now=()=>frozen;}
+  if(variant==='context'){send.contextHash='f'.repeat(64);await s.put(pair[0],firstPrepEncode('ConnectionSend',send));}
+  const ack={purpose:'afw.finite-connection-ack.v1',sendHash:firstPrepHash('ConnectionSend',send),resourceId,acknowledgedAt:Date.now()},raw=firstPrepEncode('ConnectionAck',ack);
+  await s.put(pair[0].slice(0,-4)+'ack',raw);await s.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/foreign-journal'));
+  try{const read=await firstJournal({storage:s,identity:{kind:'connection',preconnectionId:send.preconnectionId,sourceRevision:send.sourceRevision,stage:send.stage,effect},now:Date.now}).read(root.lease);return {codecRoundtrip:firstPrepEncode('ConnectionAck',firstPrepDecode('ConnectionAck',raw))===raw,journalValid:read.state==='acknowledged'};}finally{root.finish();}
+ }
+
+ async firstConnectionContext(){const request=new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/current'),root=createFiniteOwnerRequestLease(request);try{return await firstConnectionContext({ctx:this.ctx,env:this.env,parent:root.lease});}catch(error){(globalThis.__t3Observation??=[]).push({kind:'public-reader-rejected',frames:String(error.stack).split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,8)});return {status:'unavailable'};}finally{root.finish();}}
+ async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {observation:globalThis.__t3Observation??[],calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
+ `);
+}
+export function firstConnectionWorkers(qa,candidate){
+ const p=finiteWranglerProfileTemplate('canaryLive'),bindingValues={...p.vars};
+ const options={modules:true,outboundService:async()=>new Response(null,{status:503}),compatibilityDate:p.compatibility_date,compatibilityFlags:p.compatibility_flags,durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'},AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true,uniqueKey:'first-connection-node'}},d1Databases:{DB:'initial-db'},kvNamespaces:{OAUTH_KV:'first-connection-oauth'},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{...bindingValues,AFW_FINITE_TRIAL_VERSION:{id:'55555555-5555-4555-8555-555555555555'}}};
+ return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript},...(candidate.wrongProfileScript?[{...options,name:'wrong-profile-first-connection',script:candidate.wrongProfileScript}]:[])]};
+}
+export async function approveFirstConnection(f,{token=null}={}){
+ assert.equal(f.mode,'first-connection-publication');f.choicePostStarted=null;f.failedChoiceState=null;
+ const facts=await plain(f.stub.capsuleFacts()),source=facts.material.ownerSelection;
+ const screenStart=performance.now(),screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token??await f.enrollmentToken(source)}});
+ console.info('T3 actual choice GET',JSON.stringify({status:screen.status,elapsedMs:performance.now()-screenStart}));if(screen.status!==200){f.failedChoiceState=await plain(f.stub.firstConnectionState());console.info('T3 actual choice failure',JSON.stringify(await plain(f.stub.firstConnectionProbe())));return screen;}
+ const text=await screen.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(text)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(text)?.[1],cookie=screen.headers.get('set-cookie')?.split(';')[0];
+ assert(handle&&projectRef&&cookie,'actual choice must supply bounded form/cookie');
+ f.choice={handle,projectRef,cookie};const postToken=token??await f.enrollmentToken(source);f.choicePostStarted=performance.now();
+ return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':postToken,Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
+}
+export async function setFirstConnectionFault(f,fault){
+ assert.equal(f.mode,'first-connection-publication');assert(['none','qa-absent','version','actor','version-drift','oauth-open'].includes(fault));
+ const response=await f.negative.fetch(origin+'/_fixture/fault',{method:'POST',body:fault});assert.equal(response.status,204);
+}
+export async function readFirstConnectionProbe(f){
+ const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.firstConnectionProbe()),negative=await (await f.negative.fetch(origin+'/_fixture/probe')).json();
+ return {native,negative,providerRequests:f.providerRegistry.requests.slice(),uploads:f.uploads.length,activations:f.activations.length,effects:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,rows};
+}
+
+/** Passive SYN scalar/frame observation; no guard, return, body or source changed. */
+export function instrumentFirstConnection(source,{mutation=null}={}){
+ const fail="const fail=()=>{throw Error('Finite owner phase context unavailable');};";
+ assert.equal(source.split(fail).length,2);
+ source=source.replace(fail,()=> "const fail=()=>{const error=Error('Finite owner phase context unavailable');(globalThis.__t3Observation??=[]).push({kind:'failure',frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});throw error;};");
+ const start=source.indexOf('export async function handlePrivateQaFiniteOwnerConnection('),end=source.indexOf('/** Fixed unmounted QA implementation.',start);
+ assert(start>=0&&end>start);let handler=source.slice(start,end);
+ handler=handler.replace("}catch(error){failed=true;position='failed';",()=>"}catch(error){(globalThis.__t3Observation??=[]).push({kind:'connection-failure',position,frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});failed=true;position='failed';");
+
+
+ const resultTarget="const result=await wait(()=>j[method](value,l));";
+ assert.equal(handler.split(resultTarget).length,2,'passive original journal result target exactly once');
+ handler=handler.replace(resultTarget,()=>resultTarget+"(globalThis.__t3Observation??=[]).push({kind:'journal-mutation',recordKind:kind,method,status:result.status});");
+ if(mutation==='existing-ack'){
+  const target="if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();";
+  assert.equal(handler.split(target).length,2,'negative-only own recorded ACK target exactly once');
+  handler=handler.replace(target,()=>"if(result.status!=='recorded'&&!(kind==='ConnectionAck'&&result.status==='existing')||result.recordHash!==prepHash(kind,value))fail();");
+ }
+ source=source.slice(0,start)+handler+source.slice(end);
+ const publicTarget="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
+ assert.equal(source.split(publicTarget).length,2,'passive public partial boundary exactly once');
+ source=source.replace(publicTarget,()=>"if(s.records.effects.length&&!s.installed.receipt)(globalThis.__t3Observation??=[]).push({kind:'public-partial-target'});"+publicTarget);
+ if(mutation==='public-partial'){
+  const target="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
+  assert.equal(source.split(target).length,2,'negative-only public partial target exactly once');
+  source=source.replace(target,()=>"if(s.preparation.ticketUse&&!s.preparation.stageApproval)fail();");
+ }
+ const correlators=[
+  ["pre.owner.subject!==p.subject","sa.ticketHash!==t.ticketHash",'preparation'],
+  ["t.ticketHash!==data.sourceSnapshot.initialTicketHash","t.action!=='connection'",'ticket-map'],
+  ["data.sourceSnapshot.preconnectionId!==id","canonical(data.sourceSnapshot.source)!==canonical(source)",'source-snapshot'],
+  ["s.preconnectionId!==id","s.contextHash!==contextHash",'connection-history'],
+  ["upload.ack.resourceId===capsule.activatedVersionId","actual.pointer.versionId!==upload.ack.resourceId",'publication-pointer'],
+  ["receipt.moduleHash!==capsule.moduleHash","receipt.configurationHash!==finiteActivationConfigurationHash",'receipt-physical-hash'],
+  ["f.effects.size!==expectedRows","writer-head",'writer-head']
+ ];
+ for(const [first,second,name]of correlators){
+  const lines=source.split('\n'),matches=lines.map((line,i)=>line.includes(first)&&line.includes(second)?i:-1).filter(i=>i>=0);assert.equal(matches.length,1,'passive correlator label '+name);
+  const i=matches[0];assert(lines[i].endsWith('fail();'));lines[i]=lines[i].slice(0,-7)+"{(globalThis.__t3Observation??=[]).push({kind:'correlator',name:'"+name+"'});fail();}";source=lines.join('\n');
+ }
+
+ source=source.replace("async function observeOwnerPhasePair(options){\n let clock,onAbort,parentSignal;",()=>"async function observeOwnerPhasePair(options){\ const observedAt=performance.now();\n let clock,onAbort,parentSignal;");
+ source=source.replace("}finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}",()=>"}finally{(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}");
+ return instrumentFirstConnectionObserverIo(source);
+}
+
+
+function instrumentFirstConnectionObserverIo(source){
+ const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive native HTTP source marker');source=source.replace(needle,()=>next);};
+ const declaration="const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;";
+ once(declaration,"const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);let response,stream;");
+ const loop="for(;;){const part=await retain(stream.read());current(l);";
+ once(loop,"for(;;){const part=await retain(stream.read());io.reads++;io.bytes+=part.value?.byteLength??0;current(l);");
+ const ending="}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
+ once(ending,"}finally{if(stream){io.cancelCalls++;await retain(stream.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
+ return source;
+}
+export function instrumentFirstConnectionEngine(source){
+ const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive fixed engine HTTP marker');source=source.replace(needle,()=>next);};
+ once("async function http(method,path,body,c){\n  check(c);","async function http(method,path,body,c){\n  const io={kind:'engine',method,bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);check(c);");
+ once("for(;;){const part=await retain(reader.read());check(c);","for(;;){const part=await retain(reader.read());io.reads++;io.bytes+=part.value?.byteLength??0;check(c);");
+
+ for(const [method,effect]of [['upload','upload'],['activate','activation']]){
+  const describe=method==='upload'?'describeUpload':'describeActivation',needle=method+"(input,c){return invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});}";
+  once(needle,method+"(input,c){const trace=globalThis.__t3NativeTrace,requestId=globalThis.__t3NativeTraceRequestId,actual=invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});actual.then(value=>{trace?.push({kind:'native-operation-settled',effect:'"+effect+"',resourceId:value.id,requestId,at:Date.now()});},()=>{}).catch(()=>{});return actual;}");
+ }
+ const ending="finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
+ once(ending,"finally{if(reader){io.cancelCalls++;await retain(reader.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
+ return source;
+}

~~~~~~~~~~

## test/fixtures/finite-github.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-github.mjs b/test/fixtures/finite-github.mjs
--- /dev/null
+++ b/test/fixtures/finite-github.mjs
@@ -0,0 +1,36 @@
+import assert from 'node:assert/strict';
+import {finiteFinalizerFixture} from './finite-finalizer.mjs';
+import {finiteHttpModule,syntheticOriginalEnvironment,syntheticCommand} from './finite-http-module.mjs';
+import {finiteSendRecord} from '../../lib/mcp-qa-finite-external-contract.mjs';
+const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
+export async function githubFixture(base,{origin='original'}={}){
+ const api=await finiteHttpModule();
+ const f=base??await finiteFinalizerFixture({authenticatedIntent:true}),v=f.preview,rows=new Map(),tags=new Map(),requests=[];let refPosts=0,tagPosts=0,commitPending=null;
+ const state={step:3,stepStart:null,job:99,mode:'normal',attempt:1,source:v.sourceRevision,admitStatus:'completed',admitConclusion:'success',restoreStatus:'in_progress',main:v.sourceRevision};
+ const iso=n=>new Date(n).toISOString(),response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{date:new Date(f.f.now()).toUTCString(),'content-type':'application/json'}});
+ const fetchImpl=async(url,init)=>{
+  requests.push({url,method:init.method});assert.ok(url.startsWith(GH));assert.equal(init.redirect,'error');
+  const path=url.slice(GH.length),body=init.body?JSON.parse(init.body):null;
+  if(path==='/issues/comments/'+f.plan.commandId)return response({id:Number(f.plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:iso(v.T0),user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',issue_url:GH+'/issues/497'});
+  if(path==='/git/ref/heads/main')return response({ref:'refs/heads/main',object:{type:'commit',sha:state.main}});
+  if(path==='/actions/runs/11')return response({id:11,run_attempt:state.attempt,head_sha:state.source,head_branch:'main',event:'issue_comment',path:'.github/workflows/afw-finite-finalizer.yml',repository:{id:1347578006,full_name:f.plan.finalizer.repository},head_repository:{id:1347578006,full_name:f.plan.finalizer.repository},actor:{id:290715446,login:'tokenizartinfo-ops',type:'User'},triggering_actor:{id:290715446,login:'tokenizartinfo-ops',type:'User'},display_title:'AFW finite finalizer comment-'+f.plan.commandId+' source-'+v.sourceRevision,status:'in_progress'});
+  if(path==='/actions/runs/11/attempts/1/jobs?per_page=100')return response({total_count:2,jobs:[{id:12,run_id:11,head_sha:state.source,name:'admit',status:state.admitStatus,conclusion:state.admitConclusion,started_at:iso(v.T0),steps:[{name:'seed-material',number:3,status:'completed',conclusion:'success',started_at:iso(v.T0),completed_at:iso(v.T0+1)},{name:'admit-and-ready',status:'completed',conclusion:'success',started_at:iso(v.T0),completed_at:iso(v.T0+1)}]},{id:state.job,name:'restore',run_id:11,head_sha:state.source,status:state.restoreStatus,steps:[{name:'Restore exact QA candidate once under original R1',number:state.step,status:'in_progress',conclusion:null,started_at:iso(state.stepStart??v.C0)}]}]});
+  if(path==='/git/tags'&&init.method==='POST'){tagPosts++;const sha=String(tagPosts).padStart(40,'a'),tag={sha,message:body.message,object:{type:body.type,sha:body.object}};tags.set(sha,tag);if(state.mode==='tag-lost')throw Error('synthetic lost tag ACK');return response(tag,201);}
+  if(path==='/git/refs'&&init.method==='POST'){
+   refPosts++;if(rows.has(body.ref))return response({},422);
+   const value={ref:body.ref,object:{type:tags.has(body.sha)?'tag':'commit',sha:body.sha}};
+   if(state.mode==='deferred')return new Promise(resolve=>{commitPending=()=>{rows.set(body.ref,value);resolve(response(value,201));};});
+   rows.set(body.ref,value);
+   if(state.mode==='lost')throw Error('fixture secret');if(state.mode==='late')f.f.setNow(v.R1);
+   return response(value,201);
+  }
+  if(path.startsWith('/git/ref/')){const r=response(rows.get('refs/'+path.slice('/git/ref/'.length))??{},rows.has('refs/'+path.slice('/git/ref/'.length))?200:404);if(state.mode==='cached-404'&&r.status===404)r.headers.set('age','10');return r;}
+  if(path.startsWith('/git/tags/'))return response(tags.get(path.split('/').at(-1)));
+  throw Error('unexpected fixed path');
+ };
+ const make=()=>api.createPrivateQaFiniteGithub({plan:f.plan,githubToken:'synthetic_opaque',fetchImpl,now:f.f.now,signal:new AbortController().signal});
+ const record=()=>finiteSendRecord({plan:f.plan,output:f.output,restoreJobId:state.job,issuedAt:f.f.now()});
+ const admission=syntheticCommand(api,f);let admitted=false;
+ if(origin==='original'){syntheticOriginalEnvironment(f.plan);admitted=await make().admitOriginalExecution({admission,output:f.output});assert.equal(admitted,true);}
+ return {f,state,make,record,requests,fetchImpl,rows,tags,api,admission,admitted,finishPending(){assert.ok(commitPending);commitPending();},get refPosts(){return refPosts;},get tagPosts(){return tagPosts;}};
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## test/fixtures/finite-http-module.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-http-module.mjs b/test/fixtures/finite-http-module.mjs
--- /dev/null
+++ b/test/fixtures/finite-http-module.mjs
@@ -0,0 +1,39 @@
+Error.stackTraceLimit=0;
+import {build} from 'esbuild';
+import {randomUUID} from 'node:crypto';
+// Synthetic source-private process worlds. Each bundle has independent module
+// state; no production reset hook, environment flag or DTO can reset a cap.
+export async function finiteHttpModule(){
+ const b=await build({stdin:{contents:"export * from './lib/mcp-qa-finite-http.mjs';export {validateQaFiniteConfirmationCommand} from './lib/mcp-qa-cloud-lifecycle-admission.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"}});
+ return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64')+'#'+randomUUID());
+}
+export function syntheticOriginalEnvironment(plan,{pid=process.pid,attempt='1'}={}){
+ Object.assign(process.env,{AFW_FINITE_RESTORE_ORIGINAL_PID:String(pid),GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:String(plan.finalizer.runId),GITHUB_RUN_ATTEMPT:attempt,GITHUB_SHA:plan.preview.sourceRevision});
+}
+export function syntheticCommand(api,f){
+ const v=f.preview,actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
+ return api.validateQaFiniteConfirmationCommand({event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:actor,comment:{id:Number(f.plan.commandId),body:'/afw-qa-finite-confirmation v1 '+v.sourceRevision,created_at:new Date(v.T0).toISOString(),author_association:'OWNER',user:actor}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:String(f.plan.finalizer.runId),runAttempt:'1',sourceRevision:v.sourceRevision},now:f.f.now});
+}
+
+/** Explicit test SOURCE composition only; production CLI accepts no factory. */
+export async function finiteCliSyntheticSource(plan,{setupMode='normal',seedHash}={}){
+ const source='export async function resolvePrivateQaFiniteExternalSource(){return '+JSON.stringify(plan)+';}';
+ const setup=`
+import {createHash} from 'node:crypto';
+const canonical=v=>JSON.stringify(sort(v)),sort=v=>Array.isArray(v)?v.map(sort):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sort(v[k])])):v;
+const hash=v=>createHash('sha256').update(v).digest('hex');
+export async function readPrivateQaFiniteSetupCompletion({intentId,sourceRevision,parent}){
+ const p=${JSON.stringify(plan)},mode=${JSON.stringify(setupMode)};
+ if(mode==='setup-missing')throw Error('synthetic missing setup');
+ if(mode==='setup-held'){await new Promise(resolve=>parent.signal.addEventListener('abort',resolve,{once:true}));parent.check();}
+ const seedHash=${JSON.stringify(seedHash??'6'.repeat(64))};
+ const receipt={purpose:'afw.finite-policy-installed.v1',intentId,sourceRevision,setupInstanceId:'afw-finite-policy-'+hash('afw.finite-private-policy-setup.v1\\n'+canonical({intentId,sourceRevision})),qaVersionId:p.deployments.qaLive.versionId,seedHash,contextHash:'1'.repeat(64),baselineVersionId:p.deployments.canaryClosed.versionId,baselineDeploymentId:p.deployments.canaryClosed.deploymentId,versionId:p.deployments.canaryLive.versionId,deploymentId:p.deployments.canaryLive.deploymentId,moduleHash:p.deployments.canaryLive.module.sha256,publicStaticHash:'2'.repeat(64),activationHash:'3'.repeat(64),restorationHash:'4'.repeat(64),bindingsHash:'5'.repeat(64),installedAt:p.preview.T0};
+ receipt.receiptHash=hash(receipt.purpose+'\\n'+canonical(receipt));
+ const observedAt=parent.check(),instance={definitionName:'afw-own-qa-private-bootstrap',instanceId:receipt.setupInstanceId,status:mode==='setup-running'?'running':'complete',sourceRevision,qaVersionId:receipt.qaVersionId,completedAt:p.preview.T0,outputHash:hash(canonical({status:'installed',receipt}))};
+ if(mode==='setup-bad-hash')instance.outputHash='0'.repeat(64);
+ return {receipt,instance,observedAt};
+}
+`;
+ const b=await build({stdin:{contents:"export {runFiniteFinalizerCli} from './scripts/run-qa-finite-trial-finalizer.mjs';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node',external:['node:*'],banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require = __createRequire(process.cwd()+'/package.json');"},plugins:[{name:'synthetic-source-module-only',setup(builder){builder.onLoad({filter:/mcp-qa-finite-source\.mjs$/},()=>({contents:source,loader:'js'}));builder.onLoad({filter:/mcp-qa-finite-adoption-source\.mjs$/},()=>({contents:setup,resolveDir:process.cwd(),loader:'js'}));}}]});
+ return import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64')+'#'+randomUUID());
+}

~~~~~~~~~~

## test/fixtures/finite-initial-entry-world.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- /dev/null
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -0,0 +1,324 @@
+import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent,instrumentFirstConnection,instrumentFirstConnectionEngine} from './finite-first-connection-publication.mjs';
+import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
+import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
+import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
+import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {gzipSync} from 'node:zlib';
+import {readFile,mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
+import {tmpdir} from 'node:os';
+import {join,resolve} from 'node:path';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
+import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
+import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
+import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
+import {generateKeyPair,exportJWK,SignJWT} from 'jose';
+import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
+import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
+import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
+const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
+export async function initialEntryHarness(mode='normal',{negativeProfile=false}={}){
+ const firstConnection=mode==='first-connection-publication',firstConnectionMutation=firstConnection?(process.env.AFW_T3_MUTANT??null):null;if(![null,'public-partial','existing-ack'].includes(firstConnectionMutation))throw Error('SYN unknown negative mutation');
+ const mark=stage=>{if(firstConnection)console.info('T2 native stage',stage);};mark('harness-start');
+ const enrollmentComponent=mode==='first-connection-enrollment-component';
+ const pair=(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
+ const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
+ const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
+ const base={...(firstConnection?{name:'qa-first-connection'}:{}),...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(firstConnection?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'first-connection-oauth'}}:mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
+ const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
+ let failedInitializationDisposal;
+ const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
+ try{
+ mark('provisional-bindings-start');const b=await mf.getBindings();mark('provisional-bindings-ready');const ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
+ mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile}):null;mark('M-compile-done');
+ const program=firstCandidate?.program??'SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=firstCandidate?.bytes??Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
+ const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
+ const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
+ const approval=Date.now()+86400000;
+ const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
+ const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
+ let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
+ if(mode.startsWith('enrollment')||enrollmentComponent)entry=extendPreparationCleanupFixture(entry);
+ if(firstConnection)entry=extendFirstConnectionPublication(entry);
+ if(enrollmentComponent)entry=extendEnrollmentComponent(entry,await readFile('lib/mcp-qa-finite-preparation-enrollment-writer.mjs','utf8').then(()=>true,()=>false));
+ if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
+ if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed'),noticeGet:mode==='phase-context-sdk-token-notice-get'});
+ if(mode==='phase-context-sdk-io'||mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerIo(entry);
+ if(mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerNoticeGet(entry);
+ let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
+ const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
+ if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
+ const sources=new Map();
+ for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
+ for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
+  const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
+ }
+ if(firstConnection||mode.startsWith('phase-context-sdk-observed')){
+  // Test-only original error frames; no return/guard/authority replacement.
+  const frames=String.raw`console.info('T2 original upstream error',JSON.stringify({name:error?.name,status:error?.status??null,frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5)}));`;
+  const instrument=source=>source.replaceAll('catch{return pending();}',()=>firstConnection?'catch(error){'+frames+'return pending();}':"catch(error){console.info('D02 initial failure frames',String(error?.stack??'').split('\\n').slice(1,5).join(' | '));if(/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.test(error?.message??''))console.info('D02 historical gate',error.message);return pending();}").replaceAll('catch{fail();}',()=>firstConnection?'catch(error){'+frames+'fail();}':'catch{fail();}');
+  product=instrument(product);
+  sources.set('mcp-qa-finite-initial-entry.mjs',instrument(sources.get('mcp-qa-finite-initial-entry.mjs')));
+  if(firstConnection){
+   sources.set('mcp-qa-finite-bootstrap-native.mjs',instrument(sources.get('mcp-qa-finite-bootstrap-native.mjs')));
+   let lease=await readFile('lib/mcp-qa-finite-initial-lease.mjs','utf8');
+   const holder='holders();const at=Date.now()',parentClock='if(closed||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();',childClock='if(!alive||c.signal.aborted||Date.now()>=until||performance.now()-m0>=until-began)fail();';
+   for(const needle of [holder,parentClock,childClock])assert.equal(lease.split(needle).length,2,'SYN original lease seam');
+   lease=lease.replace(holder,()=>"try{holders();}catch(error){console.info('T2 original parent holders rejected',JSON.stringify({closed,aborted:controller.signal.aborted,entered,end,last,mono,lastMono}));throw error;}const at=Date.now()");
+   lease=lease.replace(parentClock,()=>parentClock.slice(0,-7)+"{console.info('T2 original parent clock rejected',JSON.stringify({closed,aborted:controller.signal.aborted,entered,end,last,at,mono,m,lastMono}));fail();}");
+   lease=lease.replace(childClock,()=>childClock.slice(0,-7)+"{console.info('T2 original child clock rejected',JSON.stringify({alive,aborted:c.signal.aborted,began,until,m0,wall:Date.now(),monotonic:performance.now()}));fail();}");
+   sources.set('mcp-qa-finite-initial-lease.mjs',lease);
+   let initial=sources.get('mcp-qa-finite-initial-entry.mjs');
+   const declaration='async function http(method,suffix,token,body,l,cap=3145728){',readLoop='for(;;){const read=await track(stream.read());guard(l);if(read.done)break;',ending='}finally{if(stream)track(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}';
+   for(const needle of [declaration,readLoop,ending])assert.equal(initial.split(needle).length,2,'SYN original upload HTTP seam');
+   initial=initial.replace(declaration,()=>declaration+"const observed={reads:0,bytes:0,readMs:0,postReadGuardMs:0};");
+   initial=initial.replace(readLoop,()=>"for(;;){const readAt=performance.now(),read=await track(stream.read());observed.readMs+=performance.now()-readAt;observed.reads++;observed.bytes+=read.value?.byteLength??0;const guardAt=performance.now();try{guard(l);}finally{observed.postReadGuardMs+=performance.now()-guardAt;}if(read.done)break;");
+   initial=initial.replace(ending,()=>"}finally{console.info('T2 original upload HTTP scalars',JSON.stringify({method,path:suffix.split('?')[0],...observed}));"+ending.slice('}finally{'.length));
+   sources.set('mcp-qa-finite-initial-entry.mjs',initial);
+  }
+ }
+ const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFirstConnection(await readFile(args.path,'utf8'),{mutation:firstConnectionMutation}),loader:'js'}));
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-fixed-policy-engine\.mjs$/},async args=>({contents:instrumentFirstConnectionEngine(await readFile(args.path,'utf8')),loader:'js'}));
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-initial-lease\.mjs$/},()=>({contents:sources.get('mcp-qa-finite-initial-lease.mjs'),loader:'js'}));
+  if(mode==='phase-context-sdk-token-notice-get')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteNoticeGet(instrumentFiniteOwnerIo(await readFile(args.path,'utf8'))),loader:'js'}));
+  if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
+  if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
+  if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
+  if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
+   let contents=await readFile(args.path,'utf8');
+   const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
+   assert.equal(contents.split(needle).length,2);
+   const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
+   contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
+  });
+  if(mode.startsWith('enrollment')||enrollmentComponent)b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
+  b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
+  b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
+  b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
+  b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
+  b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
+  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
+ }};
+ const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
+ if(mode==='phase-context-sdk-token-notice-get')await captureNoticeBundle(built,'QA',{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)});
+ mark('QA-compile-done');if(firstConnection){
+  w.record.qaLive.module={name:'index.mjs',sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,exports:[...finitePublicProfileTemplate('qaLive').exports]};w.refresh();
+  f.firstConnectionBuild={negativeMutation:firstConnectionMutation,wrongProfileHash:firstCandidate.wrongProfileHash,M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
+  f.providerRegistry={requests:[],versions:{},pointer:null};
+  const artifacts='output/t2-native-graphs/'+sha(built.outputFiles[0].contents);await mkdir(artifacts,{recursive:true});
+  await Promise.all([
+   writeFile(artifacts+'/native-syn.json',J({purpose:firstConnectionMutation?'afw.first-connection-negative-mutant-syn-build.v1':'afw.first-connection-native-syn-build.v1',negativeMutation:firstConnectionMutation,testRevision:process.env.GITHUB_SHA??null,M:{...f.firstConnectionBuild.M,inputs:undefined},QA:{...f.firstConnectionBuild.QA,inputs:undefined},resident:{...resident,content:undefined},negativeSpyHash:firstCandidate.spyHash,negativeCompiledProfileHash:firstCandidate.wrongProfileHash,completePackage:false,operationalReadiness:false})),
+   writeFile(artifacts+'/metafiles.json',J({M:firstCandidate.metafile,QA:built.metafile})),
+   writeFile(artifacts+'/canary-index.mjs',firstCandidate.bytes),
+   writeFile(artifacts+'/qa-index.mjs',built.outputFiles[0].contents)
+  ]);
+ }
+ let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
+  const providerPhase=f.providerPhase??'initial-upstream',providerUrl=new URL(req.url);
+  const respond=(payload,options)=>{
+   if(firstConnection){const encoded=J(payload);f.providerRegistry.responses??=[];f.providerRegistry.responses.push({phase:providerPhase,host:providerUrl.host,method:req.method,path:providerUrl.pathname,status:options?.status??200,bytes:Buffer.byteLength(encoded),sha256:sha(encoded)});}
+   return Response.json(payload,options);
+  };
+  if(firstConnection)f.providerRegistry.requests.push({phase:providerPhase,url:req.url,method:req.method,...(req.method==='POST'?{body:await req.clone().text()}:{})});
+  await delayFiniteOwnerIo(f,req);
+  if(req.url.endsWith('/cdn-cgi/access/certs'))return respond({keys:[jwk]});
+  f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
+  let value;
+  if(req.url.startsWith(GH)){
+   assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
+   if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
+  }else{
+   assert.ok(['Bearer synthetic-native-reader','Bearer synthetic-native-publisher'].includes(req.headers.get('authorization')));
+   let result;
+   if(req.url===CF+'/tokens/verify'){if(mode==='custody-hold'){f.held='custody-read';await new Promise(resolve=>{f.release=resolve;});}result={id:req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};}
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1'){
+    result=structuredClone(w.pointer);
+    if(f.phaseDrift==='qa-pointer'&&++f.phaseQaObservation===2)result.deployments[0].id='99999999-9999-4999-8999-999999999999';
+    if(f.uploads.length>0){f.gateReached=true;if(f.gateMode==='qa')result.deployments[0].id='99999999-9999-4999-8999-999999999999';}
+   }
+   else if(req.url===CF+'/workers/workers/agent-friendly-web-independent-closure-qa/versions/'+UUID+'?include=modules'){result={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(firstConnection?built.outputFiles[0].contents:'export default{};').toString('base64')}]};if(f.ownerFault==='qa-module')result.modules[0].content_base64='AAAA';if(f.ownerFault==='qa-namespace')result.bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-alias')result.bindings.find(b=>b.name==='AFW_FINITE_OWNER_OAUTH_KV').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-extra')result.bindings.push({name:'EXTRA_SAME_ACCOUNT',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'});}
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-release-operator/deployments?per_page=1'){if(['primary-retention','primary-late-headers'].includes(f.gateMode))await new Promise(resolve=>setTimeout(resolve,500));result={deployments:[{id:['primary-retention','primary-late-headers','operator-pointer'].includes(f.gateMode)?'99999999-9999-4999-8999-999999999999':opPin.deploymentId,strategy:'percentage',versions:[{version_id:opPin.id,percentage:100}]}]};}
+   else if(req.url===CF+'/workers/workers/agent-friendly-web-release-operator/versions/'+opPin.id+'?include=modules'){result=structuredClone(opMetadata);if(f.gateMode==='operator-version')result.modules[0].content_base64=Buffer.from('SYN operator drift').toString('base64');}
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/versions?deployable=true&per_page=100&page=1'){
+    const items=Array.from({length:100},(_,i)=>({id:i===5&&f.alarmMode!=='ineligible'?x.pin.id:'00000000-0000-4000-8000-'+String(i+1).padStart(12,'0'),number:171-i}));
+    result={items};
+    return respond({success:true,errors:[],messages:[],result,result_info:{page:0,per_page:100,count:100,total_count:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+   }
+   else if(req.url===CF+'/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04'){
+    assert.equal(req.method,'GET');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
+    if(f.oldGuardMode==='retention-401')await new Promise(resolve=>setTimeout(resolve,500));
+    if(['http-401','retention-401'].includes(f.oldGuardMode))return respond({success:false,errors:[],messages:[],result:null},{status:401,headers:{date:new Date().toUTCString()}});
+    const step={name:'restore-own-closed-canary-1',start:'2026-10-30T16:41:01.564Z',end:'2026-10-30T16:41:01.675Z',success:true};
+    const output={status:'blocked',dispatchStatus:'uncertain',nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
+    result={status:'complete',step_count:6,output,steps:[{name:'SYN-1'},step,{name:'SYN-2'},{name:'SYN-3'},{name:'SYN-4'},{name:'SYN-5'}]};
+    if(f.oldGuardMode==='active')result.status='running';
+    if(f.oldGuardMode==='changed-output')output.status='complete';
+    if(f.oldGuardMode==='changed-dispatch')output.dispatchStatus='complete';
+    if(f.oldGuardMode==='changed-withdrawal')output.nativeWithdrawalVerified=true;
+    if(f.oldGuardMode==='changed-readiness')output.operationalReadiness=true;
+    if(f.oldGuardMode==='retry')output.mayRetry=true;
+    if(f.oldGuardMode==='bad-step')step.success=false;
+    if(f.oldGuardMode==='bad-time')step.end='2026-10-30T16:41:01.676Z';
+    if(f.oldGuardMode==='duplicate')result.steps[0]={...step};
+    if(f.oldGuardMode==='short')result.steps.pop();
+   }
+   else if(req.url===CF+'/workflows?per_page=100&page=1'){
+    return respond({success:true,errors:[],messages:[],result:AFW_FIXED_WORKFLOWS.map(s=>({name:s.name,id:s.id,script_name:s.script,class_name:s.className})),result_info:{per_page:100,count:3,total_count:3,page:1,total_pages:1}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+   }
+   else if(req.url.startsWith(CF+'/workflows/')){
+    const name=new URL(req.url).pathname.split('/').at(req.url.includes('/instances?')?-2:-1),s=AFW_FIXED_WORKFLOWS.find(x=>x.name===name);assert.ok(s,req.url);
+    if(req.url.includes('/instances?')&&(f.inventoryProbe||f.uploads.length>0&&f.nowOffset===0)){
+     const own=s.name==='afw-own-qa-private-bootstrap',self={id:f.refs.initialInstanceId,status:'running',workflow_id:s.id};
+     result=own&&f.inventoryMode!=='missing'?[self]:[];
+     if(own&&f.inventoryMode==='terminal')result=[{...self,status:'complete'}];
+     if(own&&f.inventoryMode==='waiting')result=[{...self,status:'waiting'}];
+     if(own&&f.inventoryMode==='duplicate')result=[self,self];
+     if(own&&f.inventoryMode==='wrong-id')result=[{...self,id:'afw-finite-initial-'+'b'.repeat(64)}];
+     if(own&&f.inventoryMode==='foreign')result.push({id:'SYN-foreign',status:'running',workflow_id:s.id});
+     if(!own&&f.inventoryMode==='other-active')result=[{id:'SYN-other',status:'waiting',workflow_id:s.id}];
+    }else result=req.url.includes('/instances?')?(f.alarmMode==='active-workflow'?[{id:'SYN-active',status:'running',workflow_id:s.id}]:[]):{name:s.name,id:s.id,script_name:s.script,class_name:s.className};
+    return respond({success:true,errors:[],messages:[],result,...Array.isArray(result)?{result_info:{per_page:100,count:result.length,total_count:result.length,page:1,total_pages:1}}:{}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+   }
+   else if(req.url.includes('/instances-v2?state=active&per_page=100')){
+    if(['primary-retention','primary-late-headers'].includes(f.gateMode)){f.held='provider-read';await new Promise(resolve=>{f.release=resolve;});}
+    return respond({success:true,errors:[],messages:[],result:f.alarmMode==='active-container'?[{id:'SYN'}]:[],result_info:{per_page:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
+   }
+   else if(['/schedules','/tails'].some(p=>req.url.endsWith(p)))result=f.alarmMode==='schedule'||f.gateMode==='tails'&&req.url.endsWith('/tails')?[{id:'SYN'}]:[];
+   else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
+    assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);assert.equal(data.versions[0].percentage,100);assert.ok(f.providerRegistry.versions[data.versions[0].version_id]);
+    f.activations.push({body,data});result={id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',...data};f.providerRegistry.pointer=structuredClone(result);
+   }
+   else if(firstConnection&&f.uploads.length>1&&req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1')result={deployments:[structuredClone(f.providerRegistry.pointer)]};
+   else if(firstConnection&&f.uploads.length>1&&req.url.includes('/workers/workers/agent-friendly-web-delegated-canary/versions/')&&f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)])result=structuredClone(f.providerRegistry.versions[new URL(req.url).pathname.split('/').at(-1)]);
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments'){
+    assert.equal(req.method,'POST');const body=await req.text(),data=JSON.parse(body);
+    if(data.annotations?.['workers/message']?.startsWith('afw-finite-initial-activate-')){
+     f.activations.push({body,data});f.activationAnnotation=data.annotations['workers/message'];
+     result={id:'66666666-6666-4666-8666-666666666666',...data};if(firstConnection)f.providerRegistry.pointer=structuredClone(result);f.pointerMode=f.alarmMode==='activation-pointer-drift'?'foreign':'candidate';
+     if(f.alarmMode==='activation-ack-bad')result.versions[0].percentage=99;
+     if(f.alarmMode==='activation-held'){f.held='activation';await new Promise(resolve=>{f.release=resolve;});}
+     if(f.alarmMode==='activation-ack-lost')throw Error('SYN activation applied ACK lost');
+    }else{
+     f.restores.push({body,data});result={id:'77777777-7777-4777-8777-777777777777',...data};f.restored=result;f.pointerMode='restored';
+     if(f.alarmMode==='restore-ack-lost')throw Error('SYN restore applied ACK lost');
+    }
+   }
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1'){f.pointerReads++;if(f.phaseDrift&&++f.phaseObservation===2){if(f.phaseDrift==='schema')await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();if(f.phaseDrift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();if(f.phaseDrift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();if(f.phaseDrift==='configuration')f.phaseFault='configuration';if(f.phaseDrift==='original-open')f.ownerFault='original-open';if(f.phaseDrift==='pointer')f.phaseCurrent.receipt.deploymentId='11111111-1111-4111-8111-111111111111';if(f.phaseDrift==='grant')await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=?").bind(new Date().toISOString()).run();if(f.phaseDrift==='exchange')await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(f.exchangeDrift.exchangedAt,f.exchangeDrift.grantId).run();}if(f.phaseCurrent)result={deployments:[{id:f.phaseCurrent.receipt.deploymentId,strategy:'percentage',versions:[{version_id:f.phaseCurrent.receipt.versionId,percentage:100}]}]};else if(f.pointerMode==='restored')result={deployments:[f.restored]};else if(f.pointerMode==='candidate'||f.pointerMode==='foreign')result={deployments:[{id:f.pointerMode==='foreign'?'99999999-9999-4999-8999-999999999999':'66666666-6666-4666-8666-666666666666',strategy:'percentage',versions:[{version_id:f.uploaded.id,percentage:100}],annotations:{'workers/message':f.activationAnnotation}}]};else result={deployments:[{id:mode==='baseline-drift'||mode==='pointer-drift'&&f.uploads.length||(f.gateMode==='canary-pointer'&&f.gateReached||f.gateMode==='final-pointer'&&f.pointerReads>=5)?'99999999-9999-4999-8999-999999999999':x.pin.deploymentId,strategy:'percentage',versions:[{version_id:x.pin.id,percentage:100}]}]};}
+   else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false'){
+    assert.equal(req.method,'POST');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-publisher');assert.match(req.headers.get('content-type'),/^application\/json/);
+    const body=await req.text(),data=JSON.parse(body);f.uploads.push({body,data});f.uploaded={...data,id:firstConnection&&f.uploads.length>1?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'55555555-5555-4555-8555-555555555555',urls:[],containers:data.containers.map(c=>({...c,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),bindings:data.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)};
+    if(firstConnection)f.providerRegistry.versions[f.uploaded.id]=structuredClone(f.uploaded);
+    result={id:mode==='ack-baseline'?x.pin.id:mode==='ack-qa'?UUID:mode==='ack-latest'?'latest':mode==='ack-invalid'?'not-a-uuid':f.uploaded.id};
+    if(mode==='lost-http-ack')throw Error('SYN provider ACK lost after version creation');
+    if(mode==='held-http'){f.held='fetch';await new Promise(resolve=>{f.release=resolve;});}
+    if(mode==='held-body'){
+     f.held='body';return new Response(new ReadableStream({start(controller){f.release=()=>{controller.enqueue(new TextEncoder().encode(JSON.stringify({success:true,errors:[],messages:[],result})));controller.close();};}}),{headers:{date:new Date().toUTCString(),'content-type':'application/json'}});
+    }
+   }else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/55555555-5555-4555-8555-555555555555?include=modules'){assert.ok(f.uploaded);result=structuredClone(f.uploaded);
+    if(f.ownerFault==='module')result.modules[0].content_base64='AAAA';
+    if(f.ownerFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';if(f.ownerFault==='original-open')result.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
+    if(mode==='wrong-uploaded-module'||f.alarmMode==='candidate-module'&&f.gateReached||f.alarmMode==='activation-completion-module'&&f.activations.length)result.modules[0].content_base64=Buffer.from(x.script).toString('base64');
+    if(mode==='qa-uploaded-module')result.modules[0].content_base64=Buffer.from('export default{};').toString('base64');
+    if(mode==='literal-secret'||f.alarmMode==='candidate-secret'&&f.gateReached)result.bindings.find(b=>b.type==='secret_text').text='SYNTHETIC_SHOULD_NEVER_PERSIST';
+    if(mode==='new-resource'||f.alarmMode==='candidate-resource'&&f.gateReached)result.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_CONTROL').namespace_id='f'.repeat(32);
+    if(mode==='new-class')result.exports.NewClass={type:'durable-object',storage:'sqlite'};
+    if(mode==='new-migration')result.migrations=[];
+    if(mode==='enabled-cache')result.exports.default.cache={enabled:true};
+   }
+   else if(f.phaseCurrent&&req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/'+f.phaseCurrent.receipt.versionId+'?include=modules'){result={...structuredClone(f.phaseCurrent.configuration),id:f.phaseCurrent.receipt.versionId,urls:[],modules:structuredClone(f.uploaded.modules)};if(f.phaseFault==='module')result.modules[0].content_base64='AAAA';if(f.phaseFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';if(f.phaseFault==='later')result.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED').text='true';if(f.phaseFault==='empty-private'||f.phaseFault==='placeholder-private'){result.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text=f.phaseFault==='empty-private'?'':'SYNTHETIC-PRIVATE-AFW_DOSSIER_EVENTS_POLICY';result.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';}}
+   else{assert.equal(req.method,'GET');assert.equal(req.url,CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/2607abae-cec3-4e35-89eb-8b8572262b54?include=modules');result=structuredClone(x.metadata);f.baselineReads++;if(f.gateMode==='history'&&f.uploads.length>0)result.modules[0].content_base64=Buffer.from('SYN drift').toString('base64');
+    if(f.baselineReads>=3){
+     if(mode==='baseline-secret')result.bindings.find(b=>b.type==='secret_text').text='SYNTHETIC_SHOULD_NEVER_PERSIST';
+     if(mode==='baseline-new-resource')result.bindings.find(b=>b.name==='OAUTH_KV').namespace_id='f'.repeat(32);
+     if(mode==='baseline-unknown')result.assets={};
+     if(mode==='baseline-cache')result.exports.default.cache={enabled:true};
+     if(mode==='baseline-module')result.modules[0].content_base64=Buffer.from('export default{};').toString('base64');
+    }
+   }
+   if(req.url===CF+'/tokens/verify'){
+    if(f.gateMode==='custody'&&f.gateReached)result.status='disabled';
+    if(mode==='short-cleanup-custody')result.expires_on=new Date(Date.parse(created)+1000000).toISOString();
+    if(f.alarmMode==='custody-drift')result.expires_on=new Date(approval+60001).toISOString();
+    f.tokenReads++;const role=req.headers.get('authorization')==='Bearer synthetic-native-reader'?'reader':'publisher';
+    if(role==='publisher')f.publisherReads++;
+    if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
+    if(mode===role+'-wrong-id')result.id='0'.repeat(32);
+    if(mode===role+'-inactive')result.status='disabled';
+    if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
+    if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
+   }
+   // Negative-only corruption of the actual fixed provider READ response.
+   // Registry artifacts and native POST results remain their genuine originals.
+   if(firstConnection&&f.connectionReadbackFault&&f.uploads.length>1){
+    const fault=f.connectionReadbackFault,stage=f.activations.length===1?'upload':'activation',pointer=req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1',candidate=req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa?include=modules';
+    if(fault.startsWith(stage+'-')&&(pointer&&['upload-pointer','activation-pointer','activation-percentage','activation-version'].includes(fault)||candidate&&['upload-module','upload-config','activation-config','activation-secret'].includes(fault))){
+     f.connectionReadbackHits=(f.connectionReadbackHits??0)+1;
+     if(fault.endsWith('-module'))result.modules[0].content_base64='AAAA';
+     if(fault.endsWith('-config'))result.bindings.find(binding=>binding.name==='ACCESS_AUD').text='SYN readback mismatch';
+     if(fault==='activation-secret')result.bindings.find(binding=>binding.type==='secret_text').text='SYN negative secret metadata';
+     if(fault.endsWith('-pointer'))result.deployments[0].id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
+     if(fault==='activation-percentage')result.deployments[0].versions[0].percentage=99;
+     if(fault==='activation-version')result.deployments[0].versions[0].version_id='55555555-5555-4555-8555-555555555555';
+    }
+   }
+   value={success:true,errors:[],messages:[],result};
+  }
+  return respond(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
+ }};
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
+ if(firstConnection)finalOptions=firstConnectionWorkers(finalOptions,firstCandidate);
+ const rawFinalOptions=finalOptions;
+ finalOptions=convertV4MiniflareOptions(finalOptions);
+ mark('harness-setOptions-start');await mf.setOptions(finalOptions);mark('harness-setOptions-ready');
+ mark('QA-bindings-start');const bindings=await mf.getBindings(firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
+ if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
+ mark('QA-bindings-ready');if(firstConnection||mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
+ const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
+ const oldMonitoringEvents=(await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results;
+ const originalGrants=(await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results;
+ assert.equal(originalGrants.length,2);assert.equal(oldMonitoringSql.length,4);assert.equal(oldMonitoringEvents.length,3);
+ for(const sql of FINITE_PREPARATION_MONITORING_SCHEMA)await f.db.prepare(sql).run();
+ assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results,oldMonitoringSql);
+ assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
+ assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
+ assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
+ console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
+ if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
+ if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
+ if(firstConnection){
+  f.mountFirstConnection=async()=>{mark('mount-start');assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.pointerMode,'candidate');
+   const vars=Object.fromEntries(f.uploaded.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));
+   const mounted=convertV4MiniflareOptions({...rawFinalOptions,workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:f.uploaded.id}}})});
+   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
+  };
+  f.adoptConnectionConfiguration=async({upstream=false}={})=>{
+   assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);const pointer=f.providerRegistry.pointer,version=f.providerRegistry.versions[pointer.versions[0].version_id],closed=f.providerRegistry.versions['55555555-5555-4555-8555-555555555555'];
+   assert.equal(version.id,pointer.versions[0].version_id);assert.equal(version.modules[0].content_base64,closed.modules[0].content_base64);const candidate=structuredClone(closed);candidate.id=version.id;candidate.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(version,candidate);
+   const vars=Object.fromEntries(version.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));const mounted=convertV4MiniflareOptions({...rawFinalOptions,...upstream?{upstream:'https://delegated-canary.agentfriendlyweb.dev'}:{},workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:version.id}}})});f.transportNormalized=upstream;if(upstream)assert.equal(mounted.upstream,'https://delegated-canary.agentfriendlyweb.dev');
+   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');await mf.setOptions(mounted);const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+  };
+  f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');f.call=(path,options)=>{f.providerPhase=(options?.method??'GET')+' '+new URL('https://delegated-canary.agentfriendlyweb.dev'+path).pathname;return mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);};}
+ if(firstConnection&&negativeProfile)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+ f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
+ f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
+ f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
+ f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
+ f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
+ f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
+ f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
+ f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ if(firstConnection)f.firstConnectionToken=async(source,{subject='owner',issuer='https://'+source.access.teamDomain,audience=source.access.audience,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
+ f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
+ mark('harness-ready');return f;
+ }catch(error){mark('harness-error:'+String(error));await disposeFailedInitialization();mark('harness-error-disposed');throw error;}
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## test/fixtures/finite-initial-history-world.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-initial-history-world.mjs b/test/fixtures/finite-initial-history-world.mjs
--- /dev/null
+++ b/test/fixtures/finite-initial-history-world.mjs
@@ -0,0 +1,38 @@
+// Explicit SYNTHETIC external historical receipt/configuration/data fixture.
+// Actual B2 parser, storage and SQLite queries run unchanged against these facts.
+import {createHash} from 'node:crypto';
+import {readFile} from 'node:fs/promises';
+import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
+const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec',APP='d6fc71552de7494a863aca20365a572d',VERSION='2607abae-cec3-4e35-89eb-8b8572262b54',QA='11111111-1111-4111-8111-111111111111';
+const keys=['afw.canary-restoration-control.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
+export function initialHistoryFixture(ids,mode){
+ const at=Date.now()-600000,start=at+20000,end=start+60000,script='//'+('"'.repeat(1830100))+'\nexport default{};',hash=sha(script),original={containerId:ids.original,applicationId:APP,programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40)},candidate={trialId:'3'.repeat(64),programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40),startAt:start,expiresAt:end,budget:1};
+ const events={grantId:'cancelled-old',subject:'owner',projectId:'synthetic-project',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',startAt:start,expiresAt:end};
+ const scope={accountId:ACCOUNT,workerName:'agent-friendly-web-delegated-canary',namespaceId:APP,applicationId:APP,ownerRef:'6'.repeat(64),projectRef:'7'.repeat(64),resource:events.resource};
+ const successor={scope,original,candidate,publication:{artifactKey:'8'.repeat(64),workerHash:hash,activationKey:'9'.repeat(64)}};
+ const retirement={...events,grantId:'original',containerId:ids.original,startAt:at,expiresAt:at+10000,programHash:original.programHash,sourceRevision:original.sourceRevision};
+ const bindings=[...Object.entries({AFW_DOSSIER_SUCCESSOR_POLICY:J(successor),AFW_DOSSIER_EVENTS_POLICY:J(events),AFW_DOSSIER_RETIREMENT_POLICY:J(retirement),AFW_OAUTH_PILOT_CLIENT_ID:events.clientId,AFW_OAUTH_PILOT_PROJECT_ID:events.projectId,AFW_OAUTH_RESOURCE:events.resource,AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1'}).map(([name,text])=>({name,type:'plain_text',text})),{name:'DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',class_name:'AfwOwnEventNode',namespace_id:APP},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'},{name:'AFW_DOSSIER_EVENTS_CUSTODY_KEY',type:'secret_text'},{name:'AFW_DOSSIER_EVENTS_PROJECTION_SECRET',type:'secret_text'}];
+ for(const name of ['AFW_DELEGATED_OAUTH_ENABLED','AFW_OAUTH_REFRESH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED'])bindings.push({name,type:'plain_text',text:'false'});
+ bindings.push({name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:'synthetic-team.cloudflareaccess.com'},{name:'ACCESS_AUD',type:'plain_text',text:'synthetic-audience'},{name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'12345',simple:{limit:10,period:60}});
+ if(mode==='missing-access')bindings.splice(bindings.findIndex(b=>b.name==='ACCESS_AUD'),1);
+ if(mode==='missing-limiter')bindings.splice(bindings.findIndex(b=>b.name==='DELEGATED_RATE_LIMITER'),1);
+ if(mode==='invalid-limiter')bindings.find(b=>b.name==='DELEGATED_RATE_LIMITER').simple.period=42;
+ while(bindings.length<29)bindings.push({name:'HISTORICAL_EXTRA_'+bindings.length,type:'plain_text',text:''});
+ const container='agent-friendly-web-delegated-canary-afwowneventnode';
+ const cfg={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',containers:[{class_name:'AfwOwnEventNode',name:container}],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite',container}},bindings};
+ const receipt={baseVersionId:VERSION,artifactKey:sha(J([ACCOUNT,scope.workerName,hash])),sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:candidate.programHash,workerHash:hash,workerBytes:Buffer.byteLength(script),sourceCheck:'git-inputs-before-after-v1'};
+ const closure={operation:'restore_canary',startAt:start+1000,expiresAt:end,candidate:{containerId:ids.candidate,applicationId:APP,programHash:candidate.programHash,sourceRevision:candidate.sourceRevision},live:{versionId:QA,deploymentId:QA,configurationHash:'c'.repeat(64)},closed:{versionId:VERSION,moduleHash:hash,moduleBytes:receipt.workerBytes,configurationHash:restorationConfigurationHash(cfg)},operator:{versionId:'22222222-2222-4222-8222-222222222222',deploymentId:'33333333-3333-4333-8333-333333333333',moduleHash:'d'.repeat(64),moduleBytes:100,configurationHash:'e'.repeat(64)}};
+ const control={purpose:keys[0],planHash:sha(J(closure)),policy:J(closure),armedAt:start-1000,withdrawnAt:end+1000},prepared={purpose:keys[1],planHash:control.planHash,withdrawalHash:'f'.repeat(64),phase:'issued',issuedAt:start,completedAt:null,dispatchPolicyHash:'0'.repeat(64)},reduced={purpose:keys[2],planHash:control.planHash,withdrawalHash:prepared.withdrawalHash,phase:'complete',issuedAt:start+2000,completedAt:start+3000};
+ const historical={purpose:'afw.qa-legacy-historical-context.v1',controlHash:sha(J(control)),closurePolicyHash:control.planHash,namedPolicyHash:'a'.repeat(64),namedBundleHash:'b'.repeat(64),dispatchPolicyHash:prepared.dispatchPolicyHash,withdrawalPolicyHash:prepared.withdrawalHash,trialIdHash:sha(candidate.trialId),grantIdHash:sha(events.grantId),eventIdHash:'c'.repeat(64),journalHashes:{restoration:null,retirement:null,preparedDispatch:sha(J(prepared)),reductionDispatch:sha(J(reduced))},artifactSourceRevision:receipt.sourceRevision,artifactSourceTree:receipt.sourceTree,artifactProgramHash:receipt.programHash,artifactWorkerHash:receipt.workerHash,evidence:{qaVersionId:QA,operatorVersionId:closure.operator.versionId,operatorModuleHash:closure.operator.moduleHash,operatorModuleBytes:100}};
+ return {at,start,end,script,receipt,historical,cfg,events,original,candidate,rows:[[keys[0],control],[keys[1],prepared],[keys[2],reduced]],pin:{name:scope.workerName,id:VERSION,configurationHash:restorationConfigurationHash(cfg),bindingCount:29,flagCount:8,module:{name:'index.mjs',bytes:receipt.workerBytes,sha256:hash},deploymentId:QA},metadata:{id:VERSION,...cfg,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}],urls:[]}};
+}
+export async function seedInitialHistory(db,x){
+ await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT); CREATE TABLE copilot_working_drafts(project_id TEXT,user_id TEXT,session_json TEXT); CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT);');
+ for(const file of ['db/dossier-node-process.sql','db/dossier-monitoring-consent.sql'])for(const m of (await readFile(file,'utf8')).matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();
+ await db.prepare('INSERT INTO site_projects(id,user_id,revision) VALUES(?,?,1)').bind('synthetic-project','owner').run();
+ for(const id of ['original','cancelled-old'])await db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,'owner','client','synthetic-project',x.events.resource,'["afw:project:read"]',new Date(x.at-1000).toISOString(),new Date(x.end).toISOString(),new Date(x.start+4000).toISOString(),new Date(x.at).toISOString()).run();
+ await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('original','synthetic-project','owner','client',x.events.resource,1,x.at,x.at+10000,x.original.containerId,'e'.repeat(64),x.original.programHash,x.original.sourceRevision,'cloudflare/debian-trixie',x.at,x.at+10000).run();
+ for(const [id,generation,container,program,source,closed]of [['original','e'.repeat(64),x.original.containerId,x.original.programHash,x.original.sourceRevision,x.at+15000],['cancelled-old',null,x.ids.candidate,x.candidate.programHash,x.candidate.sourceRevision,x.start+5000]])await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind(id,generation,container,program,source,'cloudflare/debian-trixie',closed).run();
+ for(const [sequence,id,action,issued,expires]of [[1,'original','grant',x.at,x.at+10000],[2,'cancelled-old','grant',x.start,x.end],[3,'cancelled-old','revoke',x.start+4000,x.start+4000]])await db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(sequence,id,'synthetic-project','owner','client',x.events.resource,1,action,'afw.dossier-monitoring.v1','request-'+sequence,issued,expires).run();
+}

~~~~~~~~~~

## test/fixtures/finite-launch-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-launch-native.mjs b/test/fixtures/finite-launch-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-launch-native.mjs
@@ -0,0 +1,41 @@
+// SYNTHETIC external provenance ONLY. Real DO storage, D1 bindings, native pins,
+// control decoder, fixed enumeration/parser and coordinator are bundled unchanged.
+import {finiteFixture} from './qa-finite-trial.mjs';
+import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from '../../lib/mcp-qa-finite-trial-control.mjs';
+import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
+const fixtures=new WeakMap(),contexts=new WeakMap();
+export async function fixture(ctx,env){
+ if(fixtures.has(ctx))return fixtures.get(ctx);
+ const f=finiteFixture({at:Date.now()+600000});f.plan.resources.actorId=ctx.id.toString();
+ f.ctx=ctx;f.env=env;f.storage=ctx.storage;f.paths=[];f.observations=[];
+ for(const [key,value]of f.rows)await ctx.storage.put(key,value);
+ fixtures.set(ctx,f);return f;
+}
+export async function resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}){
+ parent.check();const f=await fixture(ctx,env);parent.check();
+ if(refs.intentId!==f.plan.intentId||refs.sourceRevision!==f.plan.source.revision)throw Error('synthetic refs');
+ if(f.hydrate)await f.hydrate();parent.check();
+ const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:f.plan.source.revision});
+ const s=await readPrivateQaFiniteControlSnapshot({storage:ctx.storage,nativePin,plan:JSON.stringify(f.plan),parent});parent.check();
+ const execution={intentId:f.plan.intentId,controlHash:s.control.controlHash,sourceRevision:f.plan.source.revision,moduleHash:f.plan.source.moduleHash,confirmationId:f.plan.workflows.confirmation,observerId:f.plan.workflows.bootstrap,admissionHash:'e'.repeat(64),launcherId:f.plan.workflows.launcher};
+ const request=async ({method,path,query,signal},check)=>{
+  if(method!=='GET'||signal!==parent.signal)throw Error('synthetic fixed transport');
+  check();f.paths.push(path);if(f.onRequest)await f.onRequest(path);check();
+  const row=x=>({id:x.id,name:x.name,script_name:x.script,class_name:x.className});
+  let result,result_info;
+  if(path==='/workflows'){result=AFW_FIXED_WORKFLOWS.map(row);result_info={per_page:100,count:3,total_count:3};}
+  else{
+   const spec=AFW_FIXED_WORKFLOWS.find(x=>path==='/workflows/'+x.name||path==='/workflows/'+x.name+'/instances');if(!spec)throw Error('unexpected fixed path');
+   if(path.endsWith('/instances')){
+    result=spec.className==='PrivateQaBootstrap'?[{id:f.plan.workflows.bootstrap,status:'running',workflow_id:spec.id},...(f.launcher?[{id:f.plan.workflows.launcher,status:'waiting',workflow_id:spec.id}]:[])]:[];
+    if(f.providerNominal&&spec.className==='PrivateQaNamedConfirmation')result=[{id:f.plan.workflows.confirmation,status:f.providerNominal,workflow_id:spec.id}];
+    result_info={per_page:100,count:result.length,total_count:result.length,...(f.incomplete?{cursor:'missing-page',total_count:2}:{}),...(query.cursor?{page:2}:{})};
+   }else result=row(spec);
+  }
+  return {status:200,success:true,errors:[],result,result_info};
+ };
+ const context=Object.freeze({});contexts.set(context,{ctx,env,plan:JSON.stringify(f.plan),request,execution});return context;
+}
+export function readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}){
+ parent.check();const m=contexts.get(context);if(!m||m.ctx!==ctx||m.env!==env)throw Error('synthetic context unavailable');return m;
+}

~~~~~~~~~~

## test/fixtures/finite-launch-operations-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-launch-operations-native.mjs b/test/fixtures/finite-launch-operations-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-launch-operations-native.mjs
@@ -0,0 +1,30 @@
+// SYNTHETIC C2 provenance and external primary evidence only. No runtime hook.
+// The native DO, SQLite, control, guard, parent, inventory and Workflow are real.
+import {fixture,resolvePrivateQaFiniteLaunchContext as resolve,readPrivateQaFiniteLaunchMaterial} from './finite-launch-native.mjs';
+import {finiteAdmissionIdentity} from '../../lib/mcp-own-finite-cleanup-proof.mjs';
+import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
+import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshotUnderCoordinator} from '../../lib/mcp-qa-finite-trial-control.mjs';
+export {fixture,readPrivateQaFiniteLaunchMaterial};
+export async function resolvePrivateQaFiniteLaunchContext(options){
+ const {ctx,env,refs,parent}=options,f=await fixture(ctx,env);parent.check();
+ if(f.sourceUnavailable||f.setup!=='completed'||f.seed!=='original'||f.prepareSuccess===false&&Object.hasOwn(refs,'controlHash'))throw Error('SYNTHETIC provenance unavailable');
+ const context=await resolve({...options,refs:{intentId:refs.intentId,sourceRevision:refs.sourceRevision??f.plan.source.revision}});parent.check();
+ const m=readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent});
+ if(Object.hasOwn(refs,'controlHash')&&refs.controlHash!==m.execution.controlHash)throw Error('SYNTHETIC control mismatch');
+ return context;
+}
+export async function readPrivateQaFiniteLaunchOperations(options){
+ const {ctx,env,parent}=options,m=readPrivateQaFiniteLaunchMaterial(options),f=await fixture(ctx,env);parent.check();
+ if(f.operationsUnavailable)throw Error('SYNTHETIC operations unavailable');
+ const original=f.primary.admission;
+ const nominal=async()=>{
+  const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:f.plan.source.revision});
+  const s=await readPrivateQaFiniteControlSnapshotUnderCoordinator({storage:ctx.storage,nativePin,plan:m.plan,parent});parent.check();
+  const identity=finiteAdmissionIdentity(s.control),nativeJournal={status:'observed',identity,identityHash:finiteHash({purpose:'afw.own-finite-admission.v1',identity}),sealed:!!f.sealed,seal:null,sealHash:null,writers:{reservation:null,admission:null,launch:null},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
+  const primary=await original();parent.check();
+  primary.quiescence={currentWriters:0,newScopeWriters:0,unresolvedWrites:0,completeInventory:true,inventoryHash:finiteHash([]),receiptsHash:finiteHash(nativeJournal),snapshotHash:'1'.repeat(64)};
+  return {purpose:'afw.qa-finite-child-primary.v1',primary,nativeJournal,writers:[]};
+ };
+ const effects=Object.fromEntries(['withdraw','close','seal','canary_restore'].map(k=>[k,{execute:async()=>{throw Error('unused synthetic cleanup');},reconcile:async()=>null}]));
+ return {controlPrimary:{...f.primary,nominal},guardActions:{readPrimary:original,...effects,proof:{read:async()=>{throw Error('unused synthetic proof');}}}};
+}

~~~~~~~~~~

## test/fixtures/finite-native-conduit-receiver.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-native-conduit-receiver.mjs b/test/fixtures/finite-native-conduit-receiver.mjs
--- /dev/null
+++ b/test/fixtures/finite-native-conduit-receiver.mjs
@@ -0,0 +1,32 @@
+import {DurableObject} from 'cloudflare:workers';
+import {createFiniteOwnerNativeReceiver} from '../../lib/mcp-qa-finite-owner-native-receiver.mjs';
+// SYN observations are bounded booleans/counts only, never credentials/body.
+export class NativeReceiverFixture extends DurableObject{
+ constructor(ctx,env){super(ctx,env);this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}
+ async hold(){this.heldMode=true;}
+ async release(){this.releaseRead?.();}
+ async reset(){this.heldMode=false;this.releaseRead?.();this.observed={receiverEntered:0,receiverAborted:false,beforeGuardAborted:null,held:false,readReturned:false,readCancelled:false,settled:false,privateHeaders:[],callerHeader:false,businessRows:0};}
+ async state(){return {...this.observed,businessRows:(await this.ctx.storage.list()).size};}
+ async fetch(request){
+  const seen=this.observed;seen.receiverEntered++;seen.privateHeaders=[...request.headers.keys()].filter(k=>k.startsWith('x-afw-finite-')).sort();seen.callerHeader=request.headers.has('X-Caller-Arbitrary');
+  seen.receiverAborted=request.signal.aborted;request.signal.addEventListener('abort',()=>{seen.receiverAborted=true;},{once:true});
+  seen.originalMethod=request.headers.get('x-afw-finite-original-method');seen.originalUrl=request.headers.get('x-afw-finite-original-url');
+  seen.version=request.headers.get('x-afw-finite-version');try{seen.boundaryValid=Number.isSafeInteger(JSON.parse(request.headers.get('x-afw-finite-boundary')).remainingMs);}catch{seen.boundaryValid=false;}
+  if(this.heldMode&&request.body){
+   // Hold the actual native read's settlement, not a replacement signal.
+   const stream=request.body,getReader=stream.getReader;
+   stream.getReader=()=>{
+    const reader=Reflect.apply(getReader,stream,[]),read=reader.read,cancel=reader.cancel;let once=false;
+    reader.cancel=(...args)=>{seen.readCancelled=true;return Reflect.apply(cancel,reader,args);};
+    reader.read=async()=>{
+     const value=await Reflect.apply(read,reader,[]);
+     if(!once){once=true;seen.held=true;await new Promise(resolve=>{this.releaseRead=resolve;});}
+     seen.readReturned=true;seen.beforeGuardAborted=request.signal.aborted;return value;
+    };return reader;
+   };
+  }
+  try{return await createFiniteOwnerNativeReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
+  finally{seen.settled=true;}
+ }
+}
+export default {fetch(){return new Response(null,{status:404});}};

~~~~~~~~~~

## test/fixtures/finite-native-conduit-sender.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-native-conduit-sender.mjs b/test/fixtures/finite-native-conduit-sender.mjs
--- /dev/null
+++ b/test/fixtures/finite-native-conduit-sender.mjs
@@ -0,0 +1,18 @@
+import {createFiniteOwnerRequestLease} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+import {forwardFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-native-bridge.mjs';
+let active=null,entered=0;
+// SYN controls exist only in this fixture. The actual product bridge owns every
+// forwarded target/header/holder and the receiver is the actual product helper.
+export default {async fetch(request,env,ctx){
+ const path=new URL(request.url).pathname;
+ const stub=env.AFW_FINITE_TRIAL_CONTROL.get(env.AFW_FINITE_TRIAL_CONTROL.idFromName('afw-own-successor-closure-v1'));
+ if(path==='/fixture/state')return Response.json({senderEntered:entered,...await stub.state()});
+ if(path==='/fixture/hold'){await stub.hold();return Response.json({configured:true});}
+ if(path==='/fixture/release'){await stub.release();return Response.json({released:true});}
+ if(path==='/fixture/abort'){active?.finish();return Response.json({aborted:!!active});}
+ if(path==='/fixture/reset'){await stub.reset();return Response.json({reset:true});}
+ if(['/fixture/receiver-probe','/fixture/wrong-actor'].includes(path)){const receiver=path==='/fixture/wrong-actor'?env.AFW_FINITE_TRIAL_CONTROL.get(env.AFW_FINITE_TRIAL_CONTROL.idFromName('SYN-foreign')):stub;return receiver.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers:request.headers,body:request.body,signal:request.signal}));}
+ const parent=createFiniteOwnerRequestLease(request);active=parent;entered++;
+ try{return await forwardFiniteOwnerChoice({request,env,ctx},parent.lease);}
+ finally{parent.finish();if(active===parent)active=null;}
+}};

~~~~~~~~~~

## test/fixtures/finite-nominal-control.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-nominal-control.mjs b/test/fixtures/finite-nominal-control.mjs
--- /dev/null
+++ b/test/fixtures/finite-nominal-control.mjs
@@ -0,0 +1,7 @@
+import {createHash} from 'node:crypto';
+export function nominalFixture(identity,{sourceRevision='b'.repeat(40),runtimeVersionId='11111111-1111-4111-8111-111111111111',actorId='a'.repeat(64),monitorHash='9'.repeat(64),consentExpiresAt=identity.N1}={},at=identity.T0){
+ const nominalIdentity={sourceRevision,runtimeVersionId,actorId,monitorHash,consentExpiresAt};
+ const claim={purpose:'afw.qa-finite-trial.v1:effect',intentId:identity.intentId,controlHash:identity.controlHash,kind:'nominal',phase:'issued',issuedAt:identity.T0,deadline:Math.min(identity.N1,consentExpiresAt),proofHash:null};
+ const value={purpose:'afw.qa-finite-nominal-control.v1',intentId:identity.intentId,controlHash:identity.controlHash,planHash:identity.planHash,sourceRevision,runtimeVersionId,actorId,observedAt:at,phase:'armed',withdrawnAt:null,claim,claimHash:createHash('sha256').update('afw.qa-finite-trial.v1:effect\n'+JSON.stringify(claim)).digest('hex'),ownedWriters:[],consent:{grantHash:identity.grantHash,monitorHash,expiresAt:consentExpiresAt,valid:true}};
+ return {nominalIdentity,value};
+}

~~~~~~~~~~

## test/fixtures/finite-owner-component-host.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-component-host.mjs b/test/fixtures/finite-owner-component-host.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-component-host.mjs
@@ -0,0 +1,30 @@
+// TEST ONLY: internal component renderer from the former host, using actual
+// prepare/auth/ticket calls. Never imported by production; this is no cleanup
+// handoff qualification or available owner HTTP capability.
+import {createFiniteOwnerRequestLease,prepareFiniteOwnerChoice} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
+import {createFiniteConnectionPreparation} from '../../lib/mcp-qa-finite-connection-preparation.mjs';
+const headers={'Cache-Control':'no-store','Content-Type':'text/html; charset=utf-8','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"};
+const goals={content:'explicar mejor productos o servicios',discovery:'facilitar que encuentren y entiendan el sitio'};
+const stages={
+ connection:{title:'Preparar la conexión de lectura',reason:'Esto habilita la pantalla donde revisarás por separado el permiso de lectura.',next:'Revisá y aceptá el permiso de lectura antes de preparar los avisos.'},
+ notices:{title:'Preparar los avisos',reason:'La lectura ya tiene su decisión propia. Este paso habilita la pantalla para decidir los avisos por separado.',next:'Revisá y aceptá los avisos antes de preparar el ensayo.'},
+ finite:{title:'Preparar el ensayo temporal',reason:'La lectura y los avisos ya tienen decisiones separadas. Este paso prepara la configuración del ensayo con esos límites.',next:'La preparación quedó registrada. El ensayo y el guardado del objetivo requieren su ejecución autorizada posterior.'}
+};
+const uncertain='<h1>No pude confirmar esta preparación</h1><p>Puede haber decisiones guardadas o cambios de configuración. Hace falta conciliar el estado antes de continuar. No repitas la preparación ni abras otra conexión para resolverlo.</p>';
+export function createFiniteOwnerComponentHost({ctx,env}){
+ return Object.freeze({async fetch(request){
+  const parent=createFiniteOwnerRequestLease(request);
+  try{
+   const result=await prepareFiniteOwnerChoice({ctx,env,request},parent.lease);
+   if(result.status===202){
+    const outcome=await createFiniteConnectionPreparation({ctx,env}).run({preconnectionId:result.preconnectionId,stage:result.stage},parent.lease);
+    return new Response(outcome.status==='installed'?'<h1>Configuración confirmada</h1><p>'+stages[result.stage].next+'</p><p>Los permisos y la ventana original no se renuevan.</p>':uncertain,{status:202,headers});
+   }
+   const stage=stages[result.stage],goal=goals[result.goal];if(!stage||!goal)throw Error('Unavailable choice');
+   const expiry=new Date(result.expiresAt),humanExpiry=new Intl.DateTimeFormat('es-AR',{dateStyle:'medium',timeStyle:'long',timeZone:'UTC'}).format(expiry);
+   const body='<h1>'+stage.title+'</h1><p>Proyecto sintético propio. Objetivo: '+goal+'.</p><p>'+stage.reason+'</p><p>Esta decisión prepara una configuración temporal. La ventana completa dura como máximo quince minutos y no se reinicia. Vence el <time datetime="'+expiry.toISOString()+'">'+humanExpiry+'</time>. No concede ni renueva permisos de lectura o avisos.</p><p>Guardar el único objetivo conocido será una acción distinta en el ensayo autorizado.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+result.handle+'"><input type="hidden" name="projectRef" value="'+result.projectRef+'"><button name="decision" value="approve">Aprobar preparación temporal</button></form>';
+   return new Response(body,{headers:{...headers,'Set-Cookie':'__Host-afw-finite-prepare='+result.handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+Math.max(1,Math.floor((result.expiresAt-Date.now())/1000))}});
+  }catch(e){return new Response(uncertain,{status:[400,401,403,404,405,429].includes(e.status)?e.status:503,headers});}
+  finally{parent.finish();}
+ }});
+}

~~~~~~~~~~

## test/fixtures/finite-owner-io-fanout.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-io-fanout.mjs b/test/fixtures/finite-owner-io-fanout.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-io-fanout.mjs
@@ -0,0 +1,90 @@
+// Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
+export function instrumentFiniteOwnerIo(source){
+ const noticeStart=source.indexOf('/** UNMOUNTED fixed GET.'),noticeSuffix=noticeStart<0?'':source.slice(noticeStart);if(noticeStart>=0)source=source.slice(0,noticeStart);
+ const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
+ const runtime=String.raw`
+const ioState=()=>globalThis.__finiteIo;
+const ioBranch=(name,value)=>{const s=ioState();if(s)s.branches[name]=value;};
+const ioBegin=(path,token,reader,snapshot)=>{
+ const s=ioState();if(!s)return null;
+ if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
+ const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
+ const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending',fetchStarted:false};
+ s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
+};
+const ioResponse=async(response,row)=>{
+ const s=ioState();if(!s||!row)return response;
+ if(s.fail===row.category){await response.body.cancel();return new Response(null,{status:503,headers:response.headers});}
+ if(s.hold!==row.category||s.holdUsed)return response;
+ s.holdUsed=true;const bytes=new Uint8Array(await response.arrayBuffer());let pulled=false;
+ return new Response(new ReadableStream({
+  pull(controller){
+   if(pulled){controller.close();return;}pulled=true;s.held={category:row.category,phase:'body'};
+   return new Promise(resolve=>{s.releaseRead=()=>{s.releaseRead=null;s.held=null;controller.enqueue(bytes);resolve();};if(s.autoRelease)s.releaseRead();});
+  },
+  cancel(){
+   s.held={category:row.category,phase:'cancel'};row.cancelHeldAt=performance.now();
+   return new Promise(resolve=>{s.releaseCancel=()=>{s.releaseCancel=null;s.held=null;row.cancelReleasedAt=performance.now();resolve();};if(s.autoRelease)s.releaseCancel();});
+  }
+ },{highWaterMark:0}),{status:response.status,headers:response.headers});
+};
+const ioCheckpoint=async name=>{
+ const s=ioState();if(!s||s.checkpoint!==name||s.snapshots!==1)return;
+ s.checkpointHeld=name;await new Promise(resolve=>{s.releaseCheckpoint=()=>{s.releaseCheckpoint=null;s.checkpointHeld=null;resolve();};if(s.autoRelease)s.releaseCheckpoint();});
+};
+const ioEnd=row=>{if(!row)return;row.endedAt=Date.now();row.endMono=performance.now();ioState().active--;};
+`;
+ once("const CF='https://api.cloudflare.com",runtime+"\nconst CF='https://api.cloudflare.com");
+ once("const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;","let ioSnapshot=0;\n   const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io=ioBegin(path,token,reader,ioSnapshot);let response,stream;");
+ once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","if(io&&ioState().pendingCategory===io.category&&ioState().snapshots===1)await ioCheckpoint('before-join');if(io)io.fetchStarted=true;response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
+ once("if(length!==null&&Number(length)!==size)fail();","if(io)io.bytes=size;if(length!==null&&Number(length)!==size)fail();");
+ once("return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};","const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));if(io)io.outcome='fulfilled';return {value,date};");
+ once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
+ once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;if(ioState())ioState().branches={qa:'not-started',m:'not-started'};await credentials();");
+ once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
+ once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
+ once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();if(ioState())ioState().same={child:consumptionChild===l,store:consumptionStore===store};");
+ once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","onAbort=()=>{if(ioState())ioState().parentAborted=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
+ once("const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));","const qaWork=retain(Promise.resolve().then(()=>{ioBranch('qa','pending');return readQaPrimary();}).finally(()=>ioBranch('qa','settled'))),mWork=retain(Promise.resolve().then(()=>{ioBranch('m','pending');return readMPrimary();}).finally(()=>ioBranch('m','settled')));");
+ once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('joined-before-consumption');");
+ once("const observed=await primary();","const observed=await primary();await ioCheckpoint('after-first');");
+ once("const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);","const qualified=await qualify(first,observed);await ioCheckpoint('between');const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);");
+
+ once("const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;","if(ioState())ioState().factualFirst=(ioState().factualFirst??0)+1;const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;");
+ once("const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);","if(ioState())ioState().factualAll=(ioState().factualAll??0)+1;const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);");
+ return source+noticeSuffix;
+}
+export function extendFiniteOwnerIo(entry){
+ const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
+ return entry.replace(needle,needle+String.raw`
+ async ioConfigure(options={}){
+  await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
+  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null,pendingCategory:options.pendingCategory??null,branches:{}};
+ }
+
+ async ioRelease(kind='all'){
+  const s=globalThis.__finiteIo;if(!s)return;
+  if(kind==='all')s.autoRelease=true;
+  if(kind==='all'||kind==='body')s.releaseRead?.();
+  if(kind==='all'||kind==='cancel')s.releaseCancel?.();
+  if(kind==='all'||kind==='checkpoint')s.releaseCheckpoint?.();
+ }
+ async ioProbe(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/retention'));
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}
+  catch{return {allowed:false};}finally{root.finish();}
+ }
+ async ioObservation(){
+  const s=globalThis.__finiteIo;if(!s)return null;
+  const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
+  let factual=0,preflight=0,writes=0;
+  for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
+  return {factualFirst:s.factualFirst??0,factualAll:s.factualAll??0,rows:s.rows,branches:s.branches,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
+ }
+`);
+}
+export async function delayFiniteOwnerIo(f,req){
+ if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
+ const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
+ (f.ioWaits??=[]).push(performance.now()-start);
+}

~~~~~~~~~~

## test/fixtures/finite-owner-native.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-native.mjs b/test/fixtures/finite-owner-native.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-native.mjs
@@ -0,0 +1,43 @@
+import assert from 'node:assert/strict';
+import {readFileSync,readdirSync} from 'node:fs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {generateKeyPair,exportJWK,SignJWT} from 'jose';
+import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+const qaLimiterBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='ratelimit').name;
+const qaVersionBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='version_metadata').name;
+const origin='https://delegated-canary.agentfriendlyweb.dev';
+export async function native(t,mode='normal',versionBinding=qaVersionBinding,limiterBinding=qaLimiterBinding,connection=null){
+ const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'finite-source-native',alg:'RS256'};
+ const bundle=await build({entryPoints:[connection?.setupFacts?'test/fixtures/finite-policy-setup-facts-worker.mjs':connection?'test/fixtures/finite-connection-worker.mjs':'test/fixtures/finite-owner-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-fixed-source',setup(b){if(connection?.setupFacts){
+ b.onResolve({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-policy-setup-facts-source.mjs'}));
+ b.onResolve({filter:/mcp-qa-finite-seed-http\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-policy-setup-facts-seed.mjs'}));
+ b.onLoad({filter:/mcp-qa-finite-owner-preparation\.mjs$/},args=>({contents:readFileSync(args.path,'utf8').replace('export async function readFiniteOwnerSetupFacts','async function actualReadFiniteOwnerSetupFacts')+"\nimport {observeActualFacts} from '"+process.cwd()+"/test/fixtures/finite-policy-setup-facts-source.mjs'; export function readFiniteOwnerSetupFacts(options,lease){return observeActualFacts(actualReadFiniteOwnerSetupFacts,options,lease);}",resolveDir:process.cwd()+'/lib',loader:'js'}));
+ }if(connection)b.onResolve({filter:/mcp-qa-finite-connection-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-connection-source.mjs'}));b.onResolve({filter:/mcp-qa-finite-owner-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/'+(connection?'finite-connection-owner-source.mjs':'finite-owner-source.mjs')}));}}]});
+ let jwksReads=0;
+ const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:connection?.setupFacts?'SetupFactsFixture':connection?'FiniteConnectionFixture':'FiniteOwnerFixture',useSQLite:true,uniqueKey:'finite-owner-task2'}},d1Databases:{DB:'qa-private',FIXTURE_RELEASE_DB:'release-primary',...(mode==='missing'?{}:{RELEASE_DB:mode==='wrong'?'qa-private':'release-primary'})},ratelimits:{[limiterBinding]:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{...(connection?{AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_0000000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_0000000000000000'}:{}),[versionBinding]:{id:'11111111-1111-4111-8111-111111111111'}},outboundService:async request=>{
+  if(connection&&new URL(request.url).origin==='https://api.cloudflare.com')return connection.outbound(request);
+  assert.equal(request.url,'https://finite-fixture.cloudflareaccess.com/cdn-cgi/access/certs');jwksReads++;
+  return Response.json({keys:[jwk]});
+ }}));
+ t.after(()=>runtime.dispose());
+ const db=await runtime.getD1Database('FIXTURE_RELEASE_DB');
+ await db.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT); CREATE TABLE copilot_working_drafts(project_id TEXT,user_id TEXT,session_json TEXT);");
+ await db.prepare("INSERT INTO site_projects VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind('synthetic-owned','owner','Proyecto sintético','https://example.invalid','owner','content','none','users','[\"discovery\"]','[\"es\"]','draft',10,1,new Date().toISOString(),'','','[]').run();
+ for(const name of readdirSync('drizzle').filter(x=>/^001[12]_.*\.sql$/.test(x)).sort()){
+  const statements=readFileSync('drizzle/'+name,'utf8').split('--> statement-breakpoint').map(x=>x.trim()).filter(Boolean);
+  for(const sql of statements)await db.prepare(sql).run();
+ }
+ for(const path of ['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql']){
+  const sqls=[...readFileSync(path,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]);
+  for(const sql of sqls)await db.prepare(sql).run();
+ }
+ const jwt=(subject='owner',aud='finite-owner',expires='30m')=>new SignJWT({email:'fixture@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer('https://finite-fixture.cloudflareaccess.com').setAudience(aud).setIssuedAt().setExpirationTime(expires).sign(privateKey);
+ const token=await jwt();
+ const call=(path,options={})=>runtime.dispatchFetch(origin+path,{...options,headers:{'Cf-Access-Jwt-Assertion':token,...options.headers}});
+ const json=(path,value)=>call(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value)}).then(r=>r.json());
+ assert.equal((await call('/fixture/init')).status,200);
+ const screen=async(cookie)=>{const r=await call('/connections/finite-prepare',cookie?{headers:{Cookie:cookie}}:{}),html=await r.text();assert.equal(r.status,200);return {html,handle:html.match(/name="handle" value="([^"]+)"/)?.[1],projectRef:html.match(/name="projectRef" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie')?.split(';')[0]};};
+ const submit=(s,extra={})=>call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:s.cookie,...extra.headers},body:new URLSearchParams({handle:s.handle,projectRef:s.projectRef,decision:'approve',...extra.fields})});
+ return {call,json,screen,submit,jwt,token,db,jwksReads:()=>jwksReads};
+}
[Source lacks final newline: before=true, after=true; exact blob references control.]

~~~~~~~~~~

## test/fixtures/finite-owner-notice-get.mjs

~~~~~~~~~~diff
diff --git a/test/fixtures/finite-owner-notice-get.mjs b/test/fixtures/finite-owner-notice-get.mjs
--- /dev/null
+++ b/test/fixtures/finite-owner-notice-get.mjs
@@ -0,0 +1,375 @@
+import assert from 'node:assert/strict';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import {createHash} from 'node:crypto';
+import {mkdir,writeFile,readFile} from 'node:fs/promises';
+import {join} from 'node:path';
+// Actual harness compiler evidence, never a separate compiler or source authority.
+let bundleIndex=0;
+export async function saveNoticeObservation(data){
+ if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
+ const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
+ await writeFile(join(directory,'principal-io-'+process.pid+'.json'),JSON.stringify(data));
+}
+export async function captureNoticeBundle(built,role,virtualSources={}){
+ if(!process.env.AFW_NOTICE_BUNDLE_CAPTURE)return;
+ const bytes=built.outputFiles[0].contents,sha256=createHash('sha256').update(bytes).digest('hex'),metafile=built.metafile;
+ const inputs=await Promise.all(Object.entries(metafile.inputs).map(async([path,data])=>({path,bytes:data.bytes,imports:data.imports,virtual:path.startsWith('<'),sha256:path.startsWith('<')?(Object.hasOwn(virtualSources,path)?createHash('sha256').update(virtualSources[path]).digest('hex'):null):createHash('sha256').update(await readFile(path)).digest('hex'),hashKind:path.startsWith('<')?'actual-compile-option-text':'file-bytes'})));
+ const data={role,bytes:bytes.length,sha256,inputs,metafile,graphSha256:createHash('sha256').update(JSON.stringify(metafile)).digest('hex')};
+ const directory=join(process.env.RUNNER_TEMP,'afw-notice-get-bundles');await mkdir(directory,{recursive:true});
+ await writeFile(join(directory,role+'-'+process.pid+'-'+(++bundleIndex)+'.json'),JSON.stringify(data));
+ console.info('NOTICE actual compiler graph',JSON.stringify({role,bytes:bytes.length,sha256,inputs:inputs.length,graphSha256:data.graphSha256}));
+}
+// SYN negative corruption and factual observation only. No positive SQL producer.
+export function extendFiniteOwnerNoticeGet(entry){
+ const methods=String.raw`
+
+
+ async noticeLinkCorrupt(kind){
+  // SYN negative DATA only, starting from an actual producer Link.
+  const all=[...await this.ctx.storage.list()],entry=all.find(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice'));
+  if(!entry)throw Error('SYN real Link required');
+  const link=noticePrepDecode('NoticeLink',entry[1]),prefix='afw.finite-preparation-notice.v1:'+link.preconnectionId+':';
+  const ack=JSON.parse(await this.ctx.storage.get(prefix+'consent:ack')),send=JSON.parse(await this.ctx.storage.get(prefix+'consent:send'));
+  const changed={...link};
+  if(['eventHash','grantHash','preconnectionId'].includes(kind))changed[kind]=link[kind]==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64);
+  else if(kind==='sequence')changed.sequence++;
+  else if(kind==='future')changed.acceptedAt=Date.now()+60000;
+  else if(kind==='before-ack')changed.acceptedAt=ack.observedAt-1;
+  else if(kind==='after-deadline')changed.acceptedAt=send.window.deadline;
+  else throw Error('SYN unknown Link corruption');
+  if(kind==='after-deadline')await new Promise(resolve=>setTimeout(resolve,Math.max(0,send.window.deadline-Date.now()+25)));
+  const raw=noticePrepEncode('NoticeLink',changed);await this.ctx.storage.put(entry[0],raw);await this.ctx.storage.sync();
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-link-negative'));
+  let journalValid=false;try{await noticeRealJournal({ctx:this.ctx,env:this.env}).read({preconnectionId:link.preconnectionId},root.lease);journalValid=true;}finally{root.finish();}
+  this.noticeState.trace=[];
+  return {original:entry,codecRoundtrip:noticePrepEncode('NoticeLink',noticePrepDecode('NoticeLink',raw))===raw,journalValid};
+ }
+ async noticeLinkRestore(entry){await this.ctx.storage.put(entry[0],entry[1]);await this.ctx.storage.sync();this.noticeState.trace=[];}
+ async noticeLinkMissing(kind){
+  const all=[...await this.ctx.storage.list()],entry=all.find(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice')),link=noticePrepDecode('NoticeLink',entry[1]),prefix='afw.finite-preparation-notice.v1:'+link.preconnectionId+':';
+  if(kind==='ack')await this.ctx.storage.delete(prefix+'consent:ack');
+  else if(kind==='unknown-send')await this.ctx.storage.put(prefix+'consent:send','SYN NEGATIVE unknown SEND');
+  else if(kind==='no-mutation'){
+   const ack=JSON.parse(await this.ctx.storage.get(prefix+'consent:ack'));
+   await this.ctx.storage.put(prefix+'consent:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,outcome:'no_mutation',rowHash:null,sequence:null})));
+  }else throw Error('SYN unknown missing source kind');
+  await this.ctx.storage.sync();this.noticeState.trace=[];
+ }
+ async noticeLinkControlRead(){const c=globalThis.__noticeLinkData;return {visible:!!c,marker:c?.marker??null};}
+ async noticeLinkWriteGate(deadline){
+  const c=globalThis.__noticeLinkData;
+  if(!c||!Number.isSafeInteger(deadline)||Date.now()>=deadline||c.held!==null)throw Error('SYN Link DATA control unavailable');
+  c.held='link-write';c.entered++;c.deadline=deadline;
+  try{while(!c.released){if(Date.now()>=deadline){c.expired=true;throw Error('SYN Link original child deadline reached');}await new Promise(resolve=>setTimeout(resolve,Math.min(10,Math.max(1,deadline-Date.now()))));}}
+  finally{c.held=null;c.settled++;}
+ }
+ async noticeCorrelated(kind){
+  // SYN negative DATA reseal only; original issuer/source/SQL facts never change.
+  const all=[...await this.ctx.storage.list()],original=all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'));
+  const key=original[0].slice(0,-'reservation'.length),r=JSON.parse(original[1]);
+  if(kind==='event-sequence'){
+   const ack=JSON.parse(await this.ctx.storage.get(key+'consent:ack'));await this.ctx.storage.put(key+'consent:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sequence:ack.sequence+1})));
+  }else{
+   if(kind==='source-revision')r.identity=noticeIssuerSeal('Identity',{...r.identity,sourceRevision:r.identity.sourceRevision==='f'.repeat(40)?'e'.repeat(40):'f'.repeat(40)});
+   else if(kind==='ticket-request')r.ticket.requestId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
+   else{
+    const fields={'issuer-reservation':'issuerReservationHash','original-grant-ack':'originalGrantAckHash','grant-link':'grantLinkHash','connection':'connectionHash'},field=fields[kind];if(!field)throw Error('SYN unknown correlated negative');
+    r[field]=r[field]==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64);
+   }
+   const reservation=noticeSeal('Reservation',r);await this.ctx.storage.put(key+'reservation',noticeEncode('Reservation',reservation));
+   const s=JSON.parse(await this.ctx.storage.get(key+'ticket:send'));
+   const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt:s.accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window:s.window};
+   const send=noticeSeal('Send',{...s,identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,requestHash:noticeHash('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket:reservation.ticket,decisionHash:null})});
+   await this.ctx.storage.put(key+'ticket:send',noticeEncode('Send',send));
+   const ack=JSON.parse(await this.ctx.storage.get(key+'ticket:ack'));await this.ctx.storage.put(key+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,sendHash:send.recordHash})));
+  }
+  await this.ctx.storage.sync();
+  const rows=[...await this.ctx.storage.list({prefix:key})];
+  const codecRoundtrip=rows.every(([k,raw])=>{const name=k.slice(key.length),kind=name==='reservation'?'Reservation':name.endsWith(':send')?'Send':'Ack';return noticeEncode(kind,noticeDecode(kind,raw))===raw;});
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-read'));
+  let journalValid=false;try{await noticeRealJournal({ctx:this.ctx,env:this.env}).read({preconnectionId:r.identity.preconnectionId},root.lease);journalValid=true;}finally{root.finish();}
+  if(this.noticeState)this.noticeState.trace=[];
+  return {codecRoundtrip,journalValid};
+ }
+ async noticeBodyStart(headers,kind='overflow'){
+  this.noticeBodyState={readEntered:false,readSettled:false,cancelEntered:false,cancelSettled:false,response:null};
+  const state=this.noticeBodyState,control=new AbortController();this.noticeBodyAbort=()=>control.abort();
+  const body=new ReadableStream({
+   start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},
+   pull:c=>{if(kind==='read'&&!state.readEntered){state.readEntered=true;return new Promise(resolve=>{this.noticeBodyReadRelease=()=>{this.noticeBodyReadRelease=null;state.readSettled=true;c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(43)));resolve();};});}},
+   cancel:()=>{state.cancelEntered=true;return new Promise(resolve=>{this.noticeBodyRelease=()=>{this.noticeBodyRelease=null;state.cancelSettled=true;resolve();};});}
+  },{highWaterMark:0});
+  const at=Date.now(),h=new Headers(headers);h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/monitoring/grant');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
+  const response=await createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner/monitoring/grant',{method:'POST',headers:h,body,signal:control.signal}));state.response=response.status;await response.body?.cancel();return {...state};
+ }
+ async noticeBodyAbortHeld(){this.noticeBodyAbort?.();}
+ async noticeBodyReleaseRead(){this.noticeBodyReadRelease?.();}
+ async noticeBodyRead(){return {...this.noticeBodyState};}
+ async noticeBodyReleaseHeld(){this.noticeBodyRelease?.();}
+
+
+ async noticeOrdinaryWithdraw(){
+  // Restore observational wrappers so the ordinary native store retains its run method.
+  this.noticeRestore?.();
+  const all=[...await this.ctx.storage.list()],r=JSON.parse(all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'))[1]),i=r.identity;
+  const event=await this.env.RELEASE_DB.prepare('SELECT sequence FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence DESC LIMIT 1').bind(i.grantId).first();
+  return noticeOrdinaryRecord({db:this.env.RELEASE_DB,subject:i.subject,grantId:i.grantId,projectId:i.projectId,expectedClientId:i.clientId,expectedResource:i.resource,expectedRevision:i.projectRevision,expectedSequence:event.sequence,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222',now:Date.now()});
+ }
+ async noticeOrdinaryRead(){
+  const all=[...await this.ctx.storage.list()],r=JSON.parse(all.find(([k])=>k.startsWith('afw.finite-preparation-notice.v1:')&&k.endsWith(':reservation'))[1]),i=r.identity;
+  try{const auth=await noticeOrdinaryAuthorization({db:this.env.RELEASE_DB,context:{grantId:i.grantId,subject:i.subject,clientId:i.clientId,resource:i.resource,scopes:i.requestedScopes},projectId:i.projectId,projectionSecret:'SYN-only-public-fixture-projection-secret-00000000'})();
+   return {enabled:auth.enabled};
+  }catch(error){return {unavailable:true,message:error.message};}
+ }
+
+ async noticeInstanceRead(){this.noticeInstance??=crypto.randomUUID();return this.noticeInstance;}
+ async noticeRestart(){this.ctx.abort('SYN notice restart',{retryAlarm:false});}
+ async noticeConfigure(mode='normal'){
+  this.noticeRestore?.();globalThis.__noticeOwner=this;this.noticeMode=mode;this.noticeHeld=null;this.noticeRelease=null;
+  const state=globalThis.__noticeState={trace:[],sql:[],ops:{get:0,list:0,sync:0,transaction:0,txGet:0,txList:0,txPut:0},lists:[],resolution:null};this.noticeState=state;
+  const db=this.env.RELEASE_DB,sessionMethod=db.withSession,storage=this.ctx.storage,originals={get:storage.get,list:storage.list,sync:storage.sync,transaction:storage.transaction};
+  this.noticeLinkPhase=null;this.noticeLinkReleased=false;this.noticeLinkTransactionObserved=false;
+  for(const kind of ['get','list','sync'])storage[kind]=async(...args)=>{
+   state.ops[kind]++;if(kind==='list')state.lists.push({prefix:String(args[0]?.prefix??''),limit:args[0]?.limit??null});
+   const stage=this.noticeLinkPhase,actual=Reflect.apply(originals[kind],storage,args),value=await actual;
+   if(stage==='sync'&&kind==='sync'){
+    if(this.noticeMode==='link-hold-sync')await this.noticeLinkGate('link-sync');
+    if(this.noticeMode==='link-lost-sync')throw Error('SYN NEGATIVE actual Link sync result lost');
+   }
+   if(stage==='readback'&&kind==='get'&&String(args[0]).endsWith(':notice')){
+    if(this.noticeMode==='link-hold-readback')await this.noticeLinkGate('link-readback');
+    if(this.noticeMode==='link-lost-readback')throw Error('SYN NEGATIVE actual Link readback result lost');
+    if(this.noticeMode==='link-wrong-readback'){const data=JSON.parse(value);return noticePrepEncode('NoticeLink',{...data,eventHash:data.eventHash==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64)});}
+   }
+   return value;
+  };
+  storage.transaction=async callback=>{
+   const stage=this.noticeLinkPhase;state.ops.transaction++;
+   const actual=Reflect.apply(originals.transaction,storage,[async tx=>{
+    const methods={get:tx.get,list:tx.list,put:tx.put},wrapped={};
+    for(const [name,method]of Object.entries(methods))wrapped[name]=(...args)=>{state.ops[{get:'txGet',list:'txList',put:'txPut'}[name]]++;return Reflect.apply(method,tx,args);};
+    const result=await callback(wrapped);if(stage==='write'&&this.noticeMode==='link-hold-write')await this.noticeLinkWriteGate(this.noticeLinkDeadline);return result;
+   }]);
+   if(stage==='write'&&!this.noticeLinkTransactionObserved){
+    this.noticeLinkTransactionObserved=true;const data=globalThis.__noticeLinkData;
+    if(data){data.txStarted=true;actual.then(()=>{data.txSettled=true;data.txOutcome='fulfilled';},()=>{data.txSettled=true;data.txOutcome='rejected';});}
+   }
+   const result=await actual;
+   if(stage==='write'){
+    state.trace.push({link:'transaction-settled',at:Date.now()});
+    if(this.noticeMode==='link-hold-commit')await this.noticeLinkGate('link-commit');
+    if(this.noticeMode==='link-lost-transaction')throw Error('SYN NEGATIVE actual Link committed, transaction result lost');
+   }
+   return result;
+  };
+  db.withSession=constraint=>{
+   const session=Reflect.apply(sessionMethod,db,[constraint]),prepare=session.prepare,record={constraint,queries:[]};state.sql.push(record);
+   session.prepare=sql=>{
+    const statement=Reflect.apply(prepare,session,[sql]),entry={sql,method:null};record.queries.push(entry);
+    return {bind:(...args)=>{
+     const bound=statement.bind(...args),run=async kind=>{
+      entry.method=kind;entry.at=Date.now();
+      const ticketInsert=sql.includes('INSERT INTO dossier_monitoring_owner_tickets')||sql.includes('INSERT INTO dossier_monitoring_consent_events');
+      if(ticketInsert){state.sqlEnteredAt=Date.now();if(this.noticeMode==='queue'||this.noticeMode==='hold-before')await this.noticeGate('before-sql');}
+      const actual=Reflect.apply(bound[kind],bound,[]),result=await actual;entry.doneAt=Date.now();
+      if(ticketInsert){state.resolution={at:Date.now(),row:result!==null};if(this.noticeMode==='hold-after')await this.noticeGate('after-sql');if(this.noticeMode==='lost-sql')throw Error('SYN NEGATIVE actual SQL committed, result lost');}
+      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='failed-schema-metadata')return {...result,success:false};
+      if(kind==='all'&&sql.endsWith('ORDER BY name LIMIT 8')&&this.noticeMode==='malformed-schema-results')return {...result,results:{}};
+      return result;
+     };
+     return {first:()=>run('first'),all:()=>run('all')};
+    }};
+   };return session;
+  };
+  this.noticeRestore=()=>{for(const [k,v]of Object.entries(originals))storage[k]=v;db.withSession=sessionMethod;};
+ }
+ async noticeGate(name){
+  const state=this.noticeState;state.trace.push({gate:name,at:Date.now()});this.noticeHeld=name;
+  await new Promise(resolve=>{this.noticeRelease=()=>{this.noticeRelease=null;this.noticeHeld=null;resolve();};});
+ }
+ async noticeReleaseHeld(){this.noticeLinkReleased=true;this.noticeRelease?.();}
+ async noticeLinkGate(name){this.noticeHeld=name;this.noticeLinkReleased=false;this.noticeState.trace.push({gate:name,at:Date.now()});while(!this.noticeLinkReleased)await new Promise(resolve=>setTimeout(resolve,10));this.noticeHeld=null;}
+
+ async noticeStateRead(){return {held:this.noticeHeld??null,mode:this.noticeMode,state:this.noticeState??null};}
+ async noticeProbe(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-probe'));
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}catch{return {allowed:false};}finally{root.finish();}
+ }
+ async noticeFence(){
+  const rows=[...await this.ctx.storage.list()],reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]),parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/notice-close'));
+  try{return await phaseIssuerStore({ctx:this.ctx,env:this.env}).closeFence({identity:reservation.identity,window:{startedAt:Date.now(),deadline:Date.now()+4500},fenceRequestId:'22222222-2222-4222-8222-222222222222'},parent.lease);}finally{parent.finish();}
+ }
+ async noticeInspect(){
+  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
+  const issuer=all.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:'+capsule.preconnectionId+':')&&k.endsWith(':reservation')),identity=issuer?JSON.parse(issuer[1]).identity:null;
+  const schema=(await this.env.RELEASE_DB.withSession('first-primary').prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").bind().all()).results;
+  const tickets=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2').bind(identity.grantId).all()).results:[];
+  const events=identity?(await this.env.RELEASE_DB.withSession('first-primary').prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3').bind(identity.grantId).all()).results:[];
+  return {notice:all.filter(([k])=>k.startsWith(prefix)),schema,tickets,events};
+ }
+ async noticeCorrupt(kind){
+  const all=[...await this.ctx.storage.list()],capsule=JSON.parse(all.find(([k])=>k.endsWith(':capsule'))[1]),prefix='afw.finite-preparation-notice.v1:'+capsule.preconnectionId+':';
+  if(kind==='own-unknown')await this.ctx.storage.put(prefix+'unknown','SYN NEGATIVE unknown key');
+  else if(kind==='foreign-unknown')await this.ctx.storage.put('afw.finite-preparation-notice.v1:'+'f'.repeat(64)+':unknown','SYN NEGATIVE foreign history');
+ 
+  else if(kind==='overflow')for(let n=0;n<7;n++)await this.ctx.storage.put(prefix+'unknown'+n,'SYN NEGATIVE overflow');
+  else if(kind==='ack-without-send')await this.ctx.storage.put(prefix+'ticket:ack','SYN NEGATIVE malformed ACK');
+  else if(kind==='foreign-send')await this.ctx.storage.put(prefix+'ticket:send','SYN NEGATIVE malformed foreign SEND');
+  else{
+   const row=all.find(([k])=>k===prefix+'reservation'),reservation=row?JSON.parse(row[1]):null;
+   if(!reservation)throw Error('SYN own reservation required');
+   if(kind==='freeze')await this.ctx.storage.put(prefix+'freeze',noticeEncode('Freeze',noticeSeal('Freeze',{purpose:'afw.finite-preparation-notice-freeze.v1',identityHash:reservation.identity.identityHash,reservationHash:reservation.recordHash,frozenAt:Date.now()})));
+   else if(kind==='row-hash'){
+    const ack=JSON.parse(await this.ctx.storage.get(prefix+'ticket:ack'));delete ack.recordHash;
+    await this.ctx.storage.put(prefix+'ticket:ack',noticeEncode('Ack',noticeSeal('Ack',{...ack,rowHash:'f'.repeat(64)})));
+   }else if(['identity','grant-link','connection'].includes(kind)){
+    delete reservation.recordHash;
+    if(kind==='identity')reservation.identity={...reservation.identity,subject:'SYN NEGATIVE wrong subject'};
+    if(kind==='grant-link')reservation.grantLinkHash='f'.repeat(64);
+    if(kind==='connection')reservation.connectionHash='f'.repeat(64);
+    // Identity corruption intentionally fails the accepted codec; never a positive producer.
+    if(kind==='identity')await this.ctx.storage.put(prefix+'reservation',JSON.stringify(reservation));
+    else await this.ctx.storage.put(prefix+'reservation',noticeEncode('Reservation',noticeSeal('Reservation',reservation)));
+   }else throw Error('SYN unknown notice fault');
+  }
+  await this.ctx.storage.sync();
+ }
+ `;
+ // Passive diagnostic of the original caught Error: guard, throw and return stay intact.
+ const leaseImport="import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';";
+ if(entry.split(leaseImport).length!==2)throw Error('SYN initial diagnostic lease import marker');
+ entry=entry.replace(leaseImport,"import{createFiniteOwnerRequestLease,readFiniteOwnerRequestDeadline as noticeDiagnosticDeadline}from'./lib/mcp-qa-finite-owner-preparation.mjs';");
+ const originalRead="try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}";
+ if(entry.split(originalRead).length!==2)throw Error('SYN initial diagnostic original catch marker');
+ entry=entry.replace(originalRead,"try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch(error){let deadline=null;try{deadline=noticeDiagnosticDeadline(parent.lease);}catch{}console.info('NOTICE SYN original phase failure',JSON.stringify({stage:'sdkReadCurrent-catch',at:Date.now(),deadline,signalAborted:parent.lease.signal.aborted,frames:String(error?.stack??'').split('\\n').slice(1,5).map(line=>line.slice(0,240))}));return {status:'unavailable'};}finally{parent.finish();}");
+ const fetchMarker='export default{async fetch(request,env){const refs=await request.json();';
+ if(entry.split(fetchMarker).length!==2)throw Error('SYN fixed QA DATA fetch marker');
+ entry=entry.replace(fetchMarker,`export default{async fetch(request,env){
+  if(new URL(request.url).pathname==='/fixture/notice-link-control'){
+   if(request.method!=='POST'||new URL(request.url).search)return new Response(null,{status:400});
+   let input;try{const raw=await request.text();if(raw.length>64)throw Error();input=JSON.parse(raw);}catch{return new Response(null,{status:400});}
+   if(!input||Object.getPrototypeOf(input)!==Object.prototype||Object.keys(input).length!==1||!['read','reset','release'].includes(input.action))return new Response(null,{status:400});
+   if(input.action==='reset'){if(globalThis.__noticeLinkData?.held)return new Response(null,{status:409});globalThis.__noticeLinkData={marker:crypto.randomUUID(),held:null,released:false,entered:0,settled:0,expired:false,deadline:null,txStarted:false,txSettled:false,txOutcome:null};}
+   const c=globalThis.__noticeLinkData;
+   if(input.action==='release'&&c)c.released=true;
+   return Response.json({visible:!!c,marker:c?.marker??null,held:c?.held??null,entered:c?.entered??0,settled:c?.settled??0,expired:c?.expired??false,txStarted:c?.txStarted??false,txSettled:c?.txSettled??false,txOutcome:c?.txOutcome??null});
+  }
+  const refs=await request.json();`);
+ if(entry.split(' export class Initial extends FiniteClosure{').length!==2)throw Error('SYN notice class marker');
+ return "import {encodeFinitePreparationRecord as noticePrepEncode,decodeFinitePreparationRecord as noticePrepDecode} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {recordDossierMonitoringConsent as noticeOrdinaryRecord,createDossierMonitoringAuthorization as noticeOrdinaryAuthorization} from './lib/dossier-monitoring-authority.mjs';\nimport {initialHash as noticeHash} from './lib/mcp-qa-finite-initial-material-records.mjs';\nimport {sealFinitePreparationIssuerRecord as noticeIssuerSeal} from './lib/mcp-qa-finite-preparation-issuer-records.mjs';\nimport {createFinitePreparationNoticeJournal as noticeRealJournal} from './lib/mcp-qa-finite-preparation-notice-journal.mjs';\nimport {sealFinitePreparationNoticeRecord as noticeSeal,encodeFinitePreparationNoticeRecord as noticeEncode,decodeFinitePreparationNoticeRecord as noticeDecode} from './lib/mcp-qa-finite-preparation-notice-records.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+
+// Read-only instrumentation of exact lexical source sites. SYN gates never supply authority.
+export function instrumentFiniteNoticeGet(source){
+ const postAt=source.indexOf('/** UNMOUNTED fixed human POST.'),post=postAt<0?'':source.slice(postAt);if(postAt>=0)source=source.slice(0,postAt);
+ const marker='/** UNMOUNTED fixed GET.',at=source.indexOf(marker);
+ if(at<0)throw Error('SYN notice handler marker');
+ let head=source.slice(0,at),body=source.slice(at);
+ const between="await ioCheckpoint('between');";
+ if(head.split(between).length!==2)throw Error('SYN notice second snapshot marker');
+ head=head.replace(between,between+"if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');");
+
+ const replace=(needle,next)=>{if(body.split(needle).length!==2)throw Error('SYN notice marker changed: '+needle);body=body.replace(needle,next);};
+ replace("async function recheckNoticeGetOwned(){\n    check();","async function recheckNoticeGetOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
+ replace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
+ replace("await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';","await recheckNoticeGetOwned();check();\n    position='ticket-sql-pending';");
+ replace("const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);","const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
+ replace("ownedReservation=record;expected.records.notice.reservation=","if(globalThis.__noticeOwner?.noticeMode==='lost-reservation')throw Error('SYN NEGATIVE reservation recorded, return lost');ownedReservation=record;expected.records.notice.reservation=");
+ replace("ownedSend=send;operation='ticket';","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE SEND recorded, return lost');ownedSend=send;operation='ticket';");
+ replace("   check();\n   const maxAge=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});check();\n   const maxAge=");
+
+ replace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;if(globalThis.__noticeOwner?.noticeMode==='expire-access')await wait(globalThis.__noticeOwner.noticeGate('access'));clock.narrow(identity.expiresAt);");
+ let consent=post;
+ const postReplace=(needle,next)=>{if(consent.split(needle).length!==2)throw Error('SYN consent marker changed: '+needle);consent=consent.replace(needle,next);};
+ if(consent){
+  postReplace("async function recheckConsentOwned(){\n    check();","async function recheckConsentOwned(){\n    globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'before'});check();");
+  postReplace("if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();","if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();globalThis.__noticeState?.trace.push({position,at:Date.now(),stage:'after'});");
+  postReplace("context=qualifyNoticeConsentBaseline(baseline);","context=qualifyNoticeConsentBaseline(baseline);globalThis.__noticeState?.trace.push({position:'baseline-observed',at:Date.now()});");
+  postReplace("position='ticket-observed';await recheckConsentOwned();","position='ticket-observed';if(globalThis.__noticeOwner?.noticeMode==='before-send')await wait(globalThis.__noticeOwner.noticeGate('before-send'));await recheckConsentOwned();");
+  postReplace("anchor();position='consent-send-recorded';","anchor();position='consent-send-recorded';if(globalThis.__noticeOwner?.noticeMode==='after-send')await wait(globalThis.__noticeOwner.noticeGate('after-send'));");
+  postReplace("ownSend=send;expected.records.notice.operations.consent.send=","if(globalThis.__noticeOwner?.noticeMode==='lost-send')throw Error('SYN NEGATIVE consent SEND recorded, result lost');ownSend=send;expected.records.notice.operations.consent.send=");
+  postReplace("expected.records.notice.operations.consent.ack=structuredClone(ack);","if(globalThis.__noticeOwner?.noticeMode==='lost-ack')throw Error('SYN NEGATIVE consent ACK recorded, result lost');expected.records.notice.operations.consent.ack=structuredClone(ack);");
+  postReplace("    position='consent-sql-pending';sqlSettled=false;","    if(globalThis.__noticeOwner?.noticeMode==='before-insert')await wait(globalThis.__noticeOwner.noticeGate('before-insert'));check();position='consent-sql-pending';sqlSettled=false;");
+  postReplace("if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);","if(!verified.ok)fail();identity=verified.identity;globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);clock.narrow(identity.expiresAt);");
+  postReplace("if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();","if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();globalThis.__noticeState&&(globalThis.__noticeState.accessVerifications=(globalThis.__noticeState.accessVerifications??0)+1);");
+  postReplace("    const acceptedAt=Date.now();","    if(globalThis.__noticeOwner){globalThis.__noticeState?.trace.push({position:'before-link',at:Date.now()});if(['link-before','link-cut-after-ack','link-existing','link-conflict'].includes(globalThis.__noticeOwner.noticeMode))await wait(globalThis.__noticeOwner.noticeLinkGate('before-link'));}check();const acceptedAt=Date.now();");
+  postReplace("    position='notice-link-pending';linkSettled=false;","    if(['link-existing','link-conflict'].includes(globalThis.__noticeOwner?.noticeMode)){const data=globalThis.__noticeOwner.noticeMode==='link-conflict'?{...ownedNoticeLink,eventHash:ownedNoticeLink.eventHash==='f'.repeat(64)?'e'.repeat(64):'f'.repeat(64)}:ownedNoticeLink;await wait(ctx.storage.put('connection-preparation:'+id+':notice',prepEncode('NoticeLink',data)));await wait(ctx.storage.sync());globalThis.__noticeState?.trace.push({link:'negative-race-insert',at:Date.now()});}position='notice-link-pending';linkSettled=false;");
+  postReplace("    linkPromise=retain(preparationStore.putLink","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkDeadline=window.deadline);globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='write');globalThis.__noticeState?.trace.push({link:'put-enter',at:Date.now()});linkPromise=retain(preparationStore.putLink");
+  postReplace("    if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();","    globalThis.__noticeState?.trace.push({link:'put-exit',status:linkResult?.status,at:Date.now()});if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();");
+  postReplace("    check();linkSyncPromise=retain","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='sync');globalThis.__noticeState?.trace.push({link:'sync-enter',at:Date.now()});check();linkSyncPromise=retain");
+  postReplace("linkSynced=true;","linkSynced=true;globalThis.__noticeState?.trace.push({link:'sync-exit',at:Date.now()});");
+  postReplace("    check();linkReadPromise=retain","    globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase='readback');globalThis.__noticeState?.trace.push({link:'read-enter',at:Date.now()});check();linkReadPromise=retain");
+  postReplace("    check();linkSettled=true;","    globalThis.__noticeState?.trace.push({link:'read-exit',at:Date.now()});globalThis.__noticeOwner&&(globalThis.__noticeOwner.noticeLinkPhase=null);check();linkSettled=true;");
+  postReplace("   const html=","   globalThis.__noticeState?.trace.push({position:'complete',at:Date.now()});const html=");
+ }
+ head=head.replace("if(globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')await globalThis.__noticeOwner.noticeGate('between-own');","if((globalThis.__noticeOwner?.noticeMode==='drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='ticket-sql-resolved')||(globalThis.__noticeOwner?.noticeMode==='consent-drift'&&globalThis.__noticeState?.trace.at(-1)?.position==='consent-sql-resolved'))await globalThis.__noticeOwner.noticeGate('between-own');");
+
+ head=head.replaceAll("globalThis.__noticeState?.trace.at(-1)?.position","globalThis.__noticeState?.trace.filter(v=>v.position).at(-1)?.position");
+ const betweenLink="await ioCheckpoint('between');";
+ if(head.split(betweenLink).length!==2)throw Error('SYN Link second snapshot marker');
+ head=head.replace(betweenLink,betweenLink+"if(globalThis.__noticeOwner?.noticeMode==='link-drift'&&globalThis.__noticeState?.trace.filter(v=>v.position&&v.stage==='before').at(-1)?.position==='notice-link-recorded')await globalThis.__noticeOwner.noticeLinkGate('link-between');");
+
+ const passiveMarker=(needle,entry,exit)=>{
+  if(head.split(needle).length!==2)throw Error('SYN passive correlator marker changed: '+entry);
+  head=head.replace(needle,"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'enter'});"+needle+(exit?"globalThis.__noticeState?.trace.push({correlator:'"+entry+"',phase:'exit'});":""));
+ };
+ passiveMarker("if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();",'noticePrimary296',true);
+ passiveMarker("if(tickets.some(v=>canonical(v)!==canonical(row)))fail();",'noticePrimary301',true);
+ passiveMarker("if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();",'noticeConsentEventAck',true);
+
+ const snapshotMarker="const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};";
+ if(head.split(snapshotMarker).length!==2)throw Error('SYN Link full snapshot marker');
+ head=head.replace(snapshotMarker,snapshotMarker+"for(const s of [pair.first,pair.second])globalThis.__noticeState?.trace.push({snapshotNotice:{present:s.preparation.noticeLink!==null,inventory:s.records.inventory.some(([key])=>key==='connection-preparation:'+s.preconnectionId+':notice'),anchor:s.anchor.inventory.some(([key])=>key==='connection-preparation:'+s.preconnectionId+':notice')}});");
+ const linkPredicate="if(link.preconnectionId!==i.preconnectionId";
+ if(head.split(linkPredicate).length!==2)throw Error('SYN Link correlator marker');
+ head=head.replace(linkPredicate,"globalThis.__noticeState?.trace.push({correlator:'noticeLink',phase:'enter',acceptedAt:link.acceptedAt,deadline:send.window.deadline,at:Date.now()});"+linkPredicate);
+ const linkEnd="||Date.now()>=ceiling)fail();";
+ if(head.split(linkEnd).length!==2)throw Error('SYN Link correlator exit marker');
+ head=head.replace(linkEnd,linkEnd+"globalThis.__noticeState?.trace.push({correlator:'noticeLink',phase:'exit',at:Date.now()});");
+ return head+body+consent;
+}
+
+
+// Fixed SYN authentic-flow setup, on an existing native harness; no world/SDK fixture import.
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+export async function noticePlain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+const plain=noticePlain;
+export async function prepareNoticeIssued(f){
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
+  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+}
+export async function issueNotice(f){
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
+  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
+  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
+  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
+  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
+  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+}
+export async function actualExchangeMcp(f){
+ const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
+ const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
+ const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
+ const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
+ }finally{await client.close();}
+ f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
+ const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
+}
+
+export async function ticket(f,extra=''){
+ const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:{...f.headers,Cookie:PREP+extra},redirect:'manual'});
+ const html=await response.text();assert.equal(response.status,200);const handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+ f.notice={handle,headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+cookie+extra}};
+ return plain(f.stub.noticeInspect());
+}
+export const consent=(f,options={})=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{method:'POST',redirect:'manual',headers:f.notice.headers,body:new URLSearchParams({handle:f.notice.handle}),...options});

~~~~~~~~~~
