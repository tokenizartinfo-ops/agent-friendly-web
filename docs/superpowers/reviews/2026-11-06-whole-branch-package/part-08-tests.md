# Whole-branch review packet 8/26 — tests

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 29 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- test/mcp-qa-finite-owner-native-conduit-native.test.mjs: ABSENT -> f4427e64e7c1fbaa0ed5b1178ba9e429fdb9289b; full diff chars=7509
- test/mcp-qa-finite-owner-native-conduit.test.mjs: ABSENT -> ee82468e9c8e788acf6c3c24f5c8c14145e3a440; full diff chars=4521
- test/mcp-qa-finite-owner-native-wire.test.mjs: ABSENT -> 16932f142db34f1116c379d8dc04b0e059f82458; full diff chars=9878
- test/mcp-qa-finite-owner-notice-consent-native.test.mjs: ABSENT -> 2169e0877eb72ab1db890f0c4e7b8c5c9075515b; full diff chars=32137
- test/mcp-qa-finite-owner-notice-get-native.test.mjs: ABSENT -> 906c100035213fd95cb0a1abe40d41e66105c7a5; full diff chars=30167
- test/mcp-qa-finite-owner-notice-link-native.test.mjs: ABSENT -> 7a2ce841f86a7fed5b59e268a2d43d5c210826e9; full diff chars=22616
- test/mcp-qa-finite-owner-original-context-native.test.mjs: ABSENT -> e1588ed4a8a0982b79c889ff5c1191c25fa56d73; full diff chars=2188
- test/mcp-qa-finite-owner-phase-context-native.test.mjs: ABSENT -> be1ff27807934797f371ea703cd9a2c6f7f3675a; full diff chars=17265
- test/mcp-qa-finite-owner-phase-context.test.mjs: ABSENT -> 613346c16689ae71e2902b2dc0aa338704884bdd; full diff chars=7072
- test/mcp-qa-finite-owner-preparation-native.test.mjs: ABSENT -> 2dc6d61f2ff35ddb4d075b573e492cd8b740d579; full diff chars=26663
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs: ABSENT -> 35c3d9a3bd7be8ea09e3963ac6e56cd3ee40a1f8; full diff chars=40559
- test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs: ABSENT -> 54865b41143b53fadcec189a92fe22de7519b092; full diff chars=27596
- test/mcp-qa-finite-owner-request-retention-native.test.mjs: ABSENT -> f459ce50c3da00839eaa92494343fb8aaeec95c3; full diff chars=5231
- test/mcp-qa-finite-owner-request-retention.test.mjs: ABSENT -> 6a2000c2eebe2a37998210218ff39018d3ce659f; full diff chars=4502
- test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs: ABSENT -> 76f7323216887b1b61307bc6fc1ac659e77505c4; full diff chars=3221
- test/mcp-qa-finite-package.test.mjs: ABSENT -> 96f4449cf73c4d312cfe1b6312bc480edd65c2a2; full diff chars=17955
- test/mcp-qa-finite-phase-inventory.test.mjs: ABSENT -> a0a6fcf5816f896bdba53d128412d63debd3a949; full diff chars=3006
- test/mcp-qa-finite-policy-configuration.test.mjs: ABSENT -> 60218aef444d8ff6f7ccab4cb413e408aff64890; full diff chars=7757
- test/mcp-qa-finite-policy-journal-native.test.mjs: ABSENT -> b54bf4a63fba6f38263d8e1519b10d1e2b4932bb; full diff chars=7578
- test/mcp-qa-finite-policy-setup-facts-native.test.mjs: ABSENT -> f1ab6c029602ac47d33568ef17518d4641c26d7b; full diff chars=1721
- test/mcp-qa-finite-policy-setup-native.test.mjs: ABSENT -> e9701d02edefb4ead10de2c1b447f062b4cb4bfe; full diff chars=9301
- test/mcp-qa-finite-policy-transport.test.mjs: ABSENT -> 3ca6cc31ef5e04a0232c447c77986a9e6609bbad; full diff chars=10004
- test/mcp-qa-finite-pre-entry-host-native.test.mjs: ABSENT -> 739645826deeed07882e01c97ff70c76ccd5f3b8; full diff chars=12786
- test/mcp-qa-finite-prearm-profile.test.mjs: ABSENT -> 1598a5099c098366ed7ce96b7c6cd6d0c48bf54c; full diff chars=3544
- test/mcp-qa-finite-preparation-cleanup-build.test.mjs: ABSENT -> 44126f704f2f7acb0b939493fda50fbc2b814cb8; full diff chars=2713
- test/mcp-qa-finite-preparation-cleanup-native.test.mjs: ABSENT -> d7dc91d1cf899e51d8f6e83ddd1bce23587d23d7; full diff chars=8929
- test/mcp-qa-finite-preparation-cleanup-records.test.mjs: ABSENT -> ecb6937ef0015740dc796ef5d3b589014f22d529; full diff chars=3047
- test/mcp-qa-finite-preparation-issuer-native.test.mjs: ABSENT -> fd2483e5d3af67987ebbf12b39acc4bd1b47534e; full diff chars=8835
- test/mcp-qa-finite-preparation-issuer-records.test.mjs: ABSENT -> 767a051cd722cd757dd0f21b10c58636be35b3b0; full diff chars=5170

## test/mcp-qa-finite-owner-native-conduit-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-native-conduit-native.test.mjs b/test/mcp-qa-finite-owner-native-conduit-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-native-conduit-native.test.mjs
@@ -0,0 +1,70 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFileSync} from 'node:fs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+const O='https://delegated-canary.agentfriendlyweb.dev',V='11111111-1111-4111-8111-111111111111';
+async function fixture(t){
+ const profile=name=>JSON.parse(readFileSync(name,'utf8'));
+ const m=profile('wrangler.mcp-own.finite.jsonc'),q=profile('wrangler.independent-closure-qa.finite.jsonc');
+ const compile=async name=>(await build({entryPoints:['test/fixtures/finite-native-conduit-'+name+'.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*']})).outputFiles[0].text;
+ const [sender,receiver]=await Promise.all([compile('sender'),compile('receiver')]);
+ const mf=new Miniflare(convertV4MiniflareOptions({workers:[
+  {name:'sender',modules:true,script:sender,compatibilityDate:m.compatibility_date,compatibilityFlags:m.compatibility_flags,
+   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'NativeReceiverFixture',scriptName:'receiver',useSQLite:true,uniqueKey:'SYN-native-conduit'}},
+   d1Databases:{DB:'SYN-M'},kvNamespaces:['OAUTH_KV'],ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{AFW_FINITE_TRIAL_VERSION:{id:V}}},
+  {name:'receiver',modules:true,script:receiver,compatibilityDate:q.compatibility_date,compatibilityFlags:q.compatibility_flags,
+   durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'NativeReceiverFixture',useSQLite:true,uniqueKey:'SYN-native-conduit'}},d1Databases:{RELEASE_DB:'SYN-Q'},bindings:{AFW_QA_VERSION:{id:'22222222-2222-4222-8222-222222222222'}}}
+ ]}));
+ t.after(()=>mf.dispose());
+ // Sender FIRST/default, direct established dispatchFetch path; no getWorker.
+ const call=(path,options)=>mf.dispatchFetch(O+path,options);
+ const state=async()=>{const r=await call('/fixture/state');return r.json();};
+ const wait=async key=>{for(let n=0;n<100;n++){const s=await state();if(s[key])return s;await new Promise(r=>setTimeout(r,20));}assert.fail('bounded native marker missing: '+key);};
+ return {call,state,wait,profiles:{sender:{date:m.compatibility_date,flags:m.compatibility_flags},receiver:{date:q.compatibility_date,flags:q.compatibility_flags}}};
+}
+test('actual fixed Worker to DO conduit stays pending and overwrites every caller private header',{timeout:20000},async t=>{
+ const f=await fixture(t);
+ const r=await f.call('/connections/finite-prepare',{headers:{'x-afw-finite-boundary':'SYN forged','x-afw-finite-extra':'SYN discard','x-afw-finite-version':'SYN forged','x-afw-finite-original-method':'DELETE','X-Caller-Arbitrary':'discard'}});
+ assert.equal(r.status,503);assert.deepEqual(await r.json(),{status:'admin_pending',mayRetry:false,operationalReadiness:false});
+ const s=await f.state();assert.equal(s.senderEntered,1);assert.equal(s.receiverEntered,1);assert.equal(s.businessRows,0);
+ assert.deepEqual(s.privateHeaders,['x-afw-finite-boundary','x-afw-finite-original-method','x-afw-finite-original-url','x-afw-finite-request-id','x-afw-finite-version']);
+ assert.equal(s.callerHeader,false);assert.equal(s.originalMethod,'GET');assert.equal(s.originalUrl,O+'/connections/finite-prepare');assert.equal(s.version,V);assert.equal(s.boundaryValid,true);
+ for(const [path,options,status]of [['/connections/finite-prepare?x=1',{},404],['/connections/finite-prepare',{method:'DELETE'},405],['/connections/finite-prepare',{method:'POST',headers:{Origin:'https://other.invalid'},body:'SYN'},403]]){
+  const rejected=await f.call(path,options);assert.equal(rejected.status,status);await rejected.body.cancel();
+ }
+ assert.equal((await f.state()).receiverEntered,1);console.log('native_two_ends_pending',JSON.stringify(f.profiles));
+});
+test('actual native signal capability observes receiver separately during held read and before guarded continuation',{timeout:20000},async t=>{
+ const f=await fixture(t);await f.call('/fixture/hold');
+ const pending=f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)},body:'handle='+'a'.repeat(64)+'&projectRef='+'b'.repeat(64)+'&decision=approve'}).then(async r=>({status:r.status,body:await r.json()}),()=>({senderRejected:true}));
+ await f.wait('held');await f.call('/fixture/abort');
+ const sender=await pending,held=await f.state();
+ await f.call('/fixture/release');const settled=await f.wait('readCancelled');
+ assert.equal(held.receiverEntered,1);
+ assert.equal(held.readReturned,false,'held native read has not physically returned after sender settles');
+ assert.equal(held.readCancelled,false,'held read cancellation awaits physical release');
+ assert.equal(settled.readReturned,true,'actual native read eventually returned');
+ assert.equal(settled.readCancelled,true,'product finiteNativeBytes caught the denied post-read lease guard and canceled the real reader');
+ assert.equal(settled.settled,true,'receiver handler has returned after cancellation');
+ assert.equal(settled.businessRows,0,'no storage mutation follows denied guard');
+ assert.equal(held.receiverAborted,true,'actual receiver Request.signal must abort while read remains held');
+ assert.equal(settled.beforeGuardAborted,true,'actual receiver signal must still be aborted immediately before product guard');
+ const qualification=held.receiverAborted&&settled.beforeGuardAborted?'receiver_abort_observed':'receiver_abort_NOT_qualified';
+ console.log('native_signal_capability',JSON.stringify({qualification,sender,receiverDuringHeldRead:held.receiverAborted,receiverBeforeGuard:settled.beforeGuardAborted,profiles:f.profiles,businessProducer:false}));
+});
+
+test('actual native size and malformed receiving envelope stay closed without storage effects',{timeout:20000},async t=>{
+ const f=await fixture(t);
+ const oversized=await f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)},body:'x'.repeat(16385)});
+ assert.equal(oversized.status,413);await oversized.body.cancel();assert.equal((await f.state()).receiverEntered,0);
+ const headers=()=>{const at=Date.now();return {'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:29999}),'x-afw-finite-original-url':O+'/connections/finite-prepare','x-afw-finite-original-method':'POST','x-afw-finite-version':V,'x-afw-finite-request-id':V,Origin:O};};
+ for(const [path,h,body,status]of [
+  ['/fixture/receiver-probe',{...headers(),'x-afw-finite-extra':'deny'},'SYN',400],
+  ['/fixture/receiver-probe',{...headers(),'x-afw-finite-boundary':'{}'},'SYN',400],
+  ['/fixture/receiver-probe',{...headers(),'x-afw-finite-version':'bad'},'SYN',400],
+  ['/fixture/receiver-probe',{...headers(),'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)},'x'.repeat(16385),413],
+  ['/fixture/wrong-actor',headers(),'SYN',503]
+ ]){const r=await f.call(path,{method:'POST',headers:h,body});assert.equal(r.status,status);await r.body.cancel();}
+ assert.equal((await f.state()).businessRows,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-native-conduit.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-native-conduit.test.mjs b/test/mcp-qa-finite-owner-native-conduit.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-native-conduit.test.mjs
@@ -0,0 +1,60 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as preparation from '../lib/mcp-qa-finite-owner-preparation.mjs';
+const request=()=>new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare');
+test('boundary preserves the spent original request budget across a new local root',t=>{
+ assert.equal(typeof preparation.readFiniteOwnerRequestBoundary,'function','registered original boundary export is missing');
+ assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function','translated local lease is missing');
+ let wall=100000,mono=100;
+ t.mock.method(Date,'now',()=>wall);t.mock.method(performance,'now',()=>mono);
+ const original=preparation.createFiniteOwnerRequestLease(request());let received;
+ try{
+  wall+=29000;mono+=29000;
+  const boundary=preparation.readFiniteOwnerRequestBoundary(original.lease);
+  assert.deepEqual(boundary,{startedAt:100000,deadline:130000,remainingMs:1000});assert.ok(Object.isFrozen(boundary));
+  received=preparation.createFiniteOwnerForwardedRequestLease(request(),boundary);
+  assert.notEqual(preparation.readFiniteOwnerRequestContext(received.lease).root,original.lease);
+  assert.equal(preparation.readFiniteOwnerRequestDeadline(received.lease),130000);
+  mono+=1000;assert.throws(()=>received.lease.assertCurrent());
+ }finally{received?.finish();original.finish();}
+});
+test('boundary cannot serialize a clone or read an expired root',()=>{
+ assert.equal(typeof preparation.readFiniteOwnerRequestBoundary,'function');
+ const original=preparation.createFiniteOwnerRequestLease(request());
+ try{assert.throws(()=>preparation.readFiniteOwnerRequestBoundary({...original.lease}));}
+ finally{original.finish();}
+ assert.throws(()=>preparation.readFiniteOwnerRequestBoundary(original.lease));
+});
+test('translated boundary rejects accessors, extras, prototype and inconsistent clocks without reading getters',t=>{
+ assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function');
+ t.mock.method(Date,'now',()=>100000);let calls=0;
+ const good={startedAt:99000,deadline:129000,remainingMs:29000};
+ const getter={...good};Object.defineProperty(getter,'remainingMs',{get(){calls++;return 29000;}});
+ for(const bad of [getter,{...good,x:0},{...good,[Symbol('x')]:0},Object.assign(Object.create({x:0}),good),
+ {...good,startedAt:100001},{...good,startedAt:98000},{...good,deadline:100000},{...good,remainingMs:0},
+ {...good,remainingMs:30001},{...good,deadline:NaN},{...good,remainingMs:1.5}])
+ assert.throws(()=>preparation.createFiniteOwnerForwardedRequestLease(request(),bad));
+ assert.equal(calls,0);
+});
+test('translated lease clips wall and monotonic disagreement and links actual incoming abort',t=>{
+ assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function');
+ let wall=100000,mono=100;t.mock.method(Date,'now',()=>wall);t.mock.method(performance,'now',()=>mono);
+ const controller=new AbortController(),incoming=new Request(request(),{signal:controller.signal});
+ const local=preparation.createFiniteOwnerForwardedRequestLease(incoming,{startedAt:90000,deadline:120000,remainingMs:500});
+ try{
+  assert.equal(preparation.readFiniteOwnerRequestDeadline(local.lease),100500);
+  wall+=10;mono+=400;assert.equal(preparation.readFiniteOwnerRequestBoundary(local.lease).remainingMs,100);
+  controller.abort();assert.equal(local.lease.signal.aborted,true);assert.throws(()=>local.lease.assertCurrent());
+ }finally{local.finish();}
+});
+
+test('descendant boundary cannot renew its spent five second monotonic budget when wall time stalls',async t=>{
+ let mono=100;t.mock.method(Date,'now',()=>100000);t.mock.method(performance,'now',()=>mono);
+ const incoming=request(),parent=preparation.createFiniteOwnerRequestLease(incoming),ctx={storage:{transaction(){}},id:{toString:()=> 'a'.repeat(64)}},env={RELEASE_DB:{withSession(){}}};let boundary;
+ try{
+  await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request:incoming},parent.lease,child=>{
+   mono+=4000;boundary=preparation.readFiniteOwnerRequestBoundary(child);throw Error('SYN stop before source');
+  }));
+  assert.ok(boundary.remainingMs<=1000,'descendant monotonic budget must not be renewed');
+ }finally{parent.finish();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-native-wire.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-native-wire.test.mjs b/test/mcp-qa-finite-owner-native-wire.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-native-wire.test.mjs
@@ -0,0 +1,111 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createFiniteOwnerRequestLease,readFiniteOwnerRequestBoundary,continuePrivateQaFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork} from '../lib/mcp-qa-finite-stage-work.mjs';
+import {forwardFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-native-bridge.mjs';
+import {createFiniteOwnerNativeReceiver} from '../lib/mcp-qa-finite-owner-native-receiver.mjs';
+const O='https://delegated-canary.agentfriendlyweb.dev',U=O+'/connections/finite-prepare',T='https://afw-private.invalid/_finite-owner/choice',V='11111111-1111-4111-8111-111111111111',A='a'.repeat(64);
+function sender(fetcher){
+ const sent=[],stub={fetch(request){sent.push(request);return fetcher(request);}},ns={idFromName(name){assert.equal(name,'afw-own-successor-closure-v1');return {toString:()=>A};},get(){return stub;}};
+ const env={AFW_FINITE_TRIAL_CONTROL:ns,AFW_FINITE_TRIAL_VERSION:{id:V},DB:{prepare(){},withSession(){}},OAUTH_KV:{get(){},put(){}},DELEGATED_RATE_LIMITER:{limit(){}}};
+ const retained=[],ctx={waitUntil(p){retained.push(p);}};return {env,ctx,sent,retained,stub};
+}
+async function invoke(f,request){
+ const parent=createFiniteOwnerRequestLease(request);
+ try{return await forwardFiniteOwnerChoice({...f,request},parent.lease);}finally{parent.finish();}
+}
+test('fixed M holder capture rejects drift across actual fetch settlement and never needs QA holders',async()=>{
+ const f=sender(async()=>{f.env.OAUTH_KV={};return new Response('bounded');});
+ const r=await invoke(f,new Request(U,{headers:{'x-afw-finite-extra':'forged','X-Other':'discard','Cookie':'synthetic=SYN-cookie','Cf-Access-Jwt-Assertion':'SYN-JWT'}}));
+ assert.equal(r.status,503);assert.equal(f.sent.length,1);assert.equal(f.sent[0].url,T);
+ assert.equal(f.sent[0].headers.has('x-afw-finite-extra'),false);assert.equal(f.sent[0].headers.has('X-Other'),false);
+ assert.equal(f.sent[0].headers.get('Cookie'),'synthetic=SYN-cookie');assert.equal(f.sent[0].headers.get('Cf-Access-Jwt-Assertion'),'SYN-JWT');
+ assert.equal(Object.hasOwn(f.env,'RELEASE_DB'),false);assert.equal(Object.hasOwn(f.ctx,'storage'),false);
+ assert.doesNotMatch(await r.text(),/SYN-cookie|SYN-JWT/);await Promise.all(f.retained);
+});
+test('known HTTP error is prompt and retains real cancellation past logical finish',async()=>{
+ let release,cancelled=false;const f=sender(async()=>new Response(new ReadableStream({cancel(){cancelled=true;return new Promise(r=>{release=r;});}}),{status:403}));
+ const r=await invoke(f,new Request(U));assert.equal(r.status,403);assert.equal(cancelled,true);
+ const other=createFiniteOwnerRequestLease(new Request(U));
+ try{
+  assert.throws(()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true));
+  release();await Promise.all(f.retained);
+  assert.equal(await observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true),true);
+ }finally{release();other.finish();}
+});
+test('bounded original body preserves first413 despite synchronous cancel error and sends no fetch',async()=>{
+ const f=sender(async()=>new Response('unused'));
+ const request=new Request(U,{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)},duplex:'half',body:new ReadableStream({start(c){c.enqueue(new Uint8Array(16385));},cancel(){throw Error('SYN cancel');}})});
+ const r=await invoke(f,request);assert.equal(r.status,413);assert.equal(f.sent.length,0);await Promise.all(f.retained);
+});
+test('oversized successful response fails closed and retains cancellation',async()=>{
+ let release;const f=sender(async()=>new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array(16385));},cancel(){return new Promise(r=>{release=r;});}})));
+ const r=await invoke(f,new Request(U));assert.equal(r.status,503);release();await Promise.all(f.retained);
+});
+function receiver(){
+ const id={toString:()=>A},storage={get(){},transaction(){}},ctx={id,storage},env={AFW_INDEPENDENT_CLOSURE:{idFromName:()=>id,get(){}},RELEASE_DB:{prepare(){},withSession(){}},AFW_QA_VERSION:{id:V}};
+ return {ctx,env,handler:createFiniteOwnerNativeReceiver({ctx,env})};
+}
+function headers(){
+ const at=Date.now();return {'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:29999}),'x-afw-finite-original-url':U,'x-afw-finite-original-method':'GET','x-afw-finite-version':V,'x-afw-finite-request-id':V};
+}
+test('receiver strict envelope route, metadata and actual QA holder denials stay pending with zero source I/O',async()=>{
+ let reads=0;const f=receiver();f.ctx.storage.get=()=>{reads++;};
+ for(const [url,h,status,body]of [[T,{...headers(),'x-afw-finite-extra':'x'},400],[T,{...headers(),'x-afw-finite-original-url':U+'?x=1'},400],[T,{...headers(),'x-afw-finite-version':'bad'},400],[T,{...headers(),'x-afw-finite-request-id':'x'.repeat(2100)},400],[T,{...headers(),'x-afw-finite-boundary':'{}'},400],['https://afw-private.invalid/other',headers(),404],[T,headers(),503]]){
+  const r=await f.handler.fetch(new Request(url,{method:'POST',headers:h,body}));assert.equal(r.status,status);assert.equal((await r.json()).operationalReadiness,false);
+ }
+ assert.equal(reads,0);
+ const good=receiver();const r=await good.handler.fetch(new Request(T,{method:'POST',headers:headers()}));assert.equal(r.status,503);
+ const post=new Request(T,{method:'POST',headers:{...headers(),'x-afw-finite-original-method':'POST',Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)},body:'x'.repeat(16385)});
+ assert.equal((await good.handler.fetch(post)).status,413);
+});
+test('registered genuine preparation child boundary preserves original start and earlier five second end',async()=>{
+ const request=new Request(U),parent=createFiniteOwnerRequestLease(request),root=readFiniteOwnerRequestBoundary(parent.lease);
+ const ctx={id:{toString:()=>A},storage:{transaction(){}}},env={RELEASE_DB:{withSession(){}}};let boundary;
+ try{
+  await assert.rejects(continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,child=>{boundary=readFiniteOwnerRequestBoundary(child);throw Error('SYN stop before source');}));
+  assert.equal(boundary.startedAt,root.startedAt);assert.ok(boundary.deadline<=root.deadline);assert.ok(boundary.remainingMs<=5000);
+ }finally{parent.finish();}
+});
+
+test('late native fetch and its subsequent real body cancellation remain occupied through physical settlement',async()=>{
+ let fetched,releaseFetch,releaseCancel,cancelStarted;
+ const entered=new Promise(r=>{fetched=r;}),cancelling=new Promise(r=>{cancelStarted=r;});
+ const f=sender(()=>{fetched();return new Promise(r=>{releaseFetch=r;});}),controller=new AbortController();
+ const pending=invoke(f,new Request(U,{signal:controller.signal}));await entered;controller.abort();assert.equal((await pending).status,503);
+ const other=createFiniteOwnerRequestLease(new Request(U)),probe=()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true);
+ try{
+  assert.throws(probe);
+  releaseFetch(new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array([1]));},cancel(){cancelStarted();return new Promise(r=>{releaseCancel=r;});}})));
+  await cancelling;assert.throws(probe);releaseCancel();await Promise.all(f.retained);assert.equal(await probe(),true);
+ }finally{releaseCancel?.();other.finish();}
+});
+
+for(const fault of ['abort','holder-drift'])test('empty late successful response cancels before its first read after '+fault,async()=>{
+ let enteredFetch,releaseFetch,releaseCancel,enterCancel,bodyController,readCalls=0,cancelStarted=false;
+ const fetched=new Promise(r=>{enteredFetch=r;}),cancelling=new Promise(r=>{enterCancel=r;});
+ const f=sender(()=>{enteredFetch();return new Promise(r=>{releaseFetch=r;});}),controller=new AbortController();
+ const pending=invoke(f,new Request(U,{signal:controller.signal}));
+ await fetched;
+ if(fault==='abort'){controller.abort();assert.equal((await pending).status,503);}
+ else f.env.OAUTH_KV={};
+ const stream=new ReadableStream({start(c){bodyController=c;},cancel(){cancelStarted=true;enterCancel();return new Promise(r=>{releaseCancel=r;});}});
+ const getReader=stream.getReader;
+ stream.getReader=function(){const reader=Reflect.apply(getReader,this,[]),read=reader.read;reader.read=function(){readCalls++;return Reflect.apply(read,this,[]);};return reader;};
+ const other=createFiniteOwnerRequestLease(new Request(U)),probe=()=>observeFiniteOwnerRequestWork({ctx:f.ctx,env:f.env,originalLease:other.lease},async()=>true);
+ let timer;
+ try{
+  releaseFetch(new Response(stream));
+  const cancelled=await Promise.race([cancelling.then(()=>true),new Promise(r=>{timer=setTimeout(()=>r(false),250);})]);
+  assert.equal(cancelled,true,'empty late response must begin cancellation before reading');
+  assert.equal(readCalls,0,'invalid original lease or holder must not start a response read');
+  assert.equal((await pending).status,503);assert.throws(probe,'actual cancel remains occupied after logical finish');
+  releaseCancel();await Promise.all(f.retained);assert.equal(await probe(),true);
+ }finally{
+  clearTimeout(timer);
+  // RED-only drain of the held read, after the causal assertion. This chunk
+  // never masks the empty-stream behavior being tested above.
+  if(!cancelStarted)bodyController.enqueue(new Uint8Array([1]));
+  await cancelling;releaseCancel?.();await pending;await Promise.all(f.retained);other.finish();
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-notice-consent-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-notice-consent-native.test.mjs b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-notice-consent-native.test.mjs
@@ -0,0 +1,278 @@
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {saveNoticeObservation,prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent} from './fixtures/finite-owner-notice-get.mjs';
+import {qualifyFiniteOwnerNoticeConsentRequest,qualifyFiniteOwnerNoticeGetRequest,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from '../lib/mcp-qa-finite-owner-notice-get-wire.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{
+  await prepareNoticeIssued(f);
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  await issueNotice(f);
+  await fn(f);
+ }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+test('native consent POST records original decision after actual ticket GET',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);const before=await ticket(f,'; unrelated="valid=="');assert.equal(before.events.length,0);
+ const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now(),response=await consent(f),html=await response.text();
+ const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began,after=await plain(f.stub.noticeInspect());
+ await saveNoticeObservation({unit:'consent',elapsed,...observation.state,io});
+ console.info('CONSENT native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:observation.state.trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications??0,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active}}));
+ assert(elapsed<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
+ assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,6);assert.equal(observation.state.accessVerifications,2);
+ const rowsAfter=await plain(f.stub.snapshot());for(const row of original)assert.deepEqual(rowsAfter.find(([k])=>k===row[0]),row);
+ const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
+
+ assert.equal(response.status,200,'fixed POST reached after native ticket; events='+after.events.length);
+ assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert((await plain(f.stub.snapshot())).some(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice'));assert.match(html,/Registré tu decisión temporal/);
+ assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ const record=suffix=>JSON.parse(after.notice.find(([k])=>k.endsWith(suffix))[1]),r=record(':reservation'),send=record('consent:send'),ack=record('consent:ack'),row=after.events[0],i=f.identity;
+ assert.deepEqual(row,{sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:r.ticket.requestId,issued_at:row.issued_at,expires_at:r.ticket.permissionExpiresAt});
+ assert(Number.isSafeInteger(row.sequence)&&row.sequence>0);assert(row.issued_at>=send.issuedAt);assert(row.issued_at<send.window.deadline);assert.equal(ack.sequence,row.sequence);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',row));assert.equal(ack.sendHash,send.recordHash);
+ console.info('CONSENT native original window',JSON.stringify({childElapsed:observation.state.trace.find(v=>v.position==='complete').at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt,parentElapsed:elapsed}));assert(send.window.deadline-send.window.startedAt<=5000);assert(observation.state.trace.find(v=>v.position==='complete').at<send.window.deadline);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ for(const path of ['/monitoring','/authorize']){
+  const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();
+ }
+ assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);
+ assert.doesNotMatch(html,/<form|<script|retirar|revisar/i);assert.match(html,new RegExp(new Date(r.ticket.permissionExpiresAt).toISOString().replaceAll('.','\\.')));
+ const repeat=await consent(f);assert.notEqual(repeat.status,200);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
+}));
+test('native consent malformed unrelated cookie denies before SEND',()=>withIssued(async f=>{
+ const before=await ticket(f);
+ for(const suffix of ['; bad:name=x','; ; extra=x']){
+  const response=await consent(f,{headers:{...f.notice.headers,Cookie:f.notice.headers.Cookie+suffix}});await response.body?.cancel();
+  assert.notEqual(response.status,200);assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+}));
+
+async function denied(f,response,before){
+ assert.notEqual(response.status,200);const text=await response.text();assert.doesNotMatch(text,/Registré tu decisión|<form/);assert.equal(response.headers.get('Set-Cookie'),null);
+ if(before)assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+}
+async function gate(f,name){
+ for(let n=0;n<500;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual consent gate not reached: '+name);
+}
+test('native consent preserves global sequence across another grant history',()=>withIssued(async f=>{
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
+ const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,before=await ticket(f);
+ const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert(after.events[0].sequence>1);assert.equal(before.tickets[0].expected_sequence,0);
+ const now=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(now.find(v=>v.sequence===row.sequence),row);
+}));
+test('native consent grammar denies untrusted request corpus',()=>withIssued(async f=>{
+ const before=await ticket(f),h=f.notice.headers,value='handle='+f.notice.handle;
+ const cases=[
+ ['method GET',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{headers:h})],
+ ['path revoke',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/revoke',{method:'POST',headers:h,body:value})],
+ ['query',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant?x=1',{method:'POST',headers:h,body:value})],
+ ['wrong Origin',()=>consent(f,{headers:{...h,Origin:'https://wrong.invalid'}})],
+ ['missing Origin',()=>{const headers={...h};delete headers.Origin;return consent(f,{headers});}],
+ ['extra handle',()=>consent(f,{body:value+'&action=grant'})],
+ ['duplicate handle',()=>consent(f,{body:value+'&'+value})],
+ ['malformed percent',()=>consent(f,{body:'handle=%QZ'})],
+ ['malformed UTF8',()=>consent(f,{body:new Uint8Array([0xff])})],
+ ['MIME parameter',()=>consent(f,{headers:{...h,'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}})],
+ ['1025 bytes',()=>consent(f,{body:'a'.repeat(1025)})],
+ ['duplicate cookie',()=>consent(f,{headers:{...h,Cookie:h.Cookie+'; '+h.Cookie.split('; ')[1]}})],
+ ['bad cookie hash',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner='+'b'.repeat(43)}})],
+ ['missing prepare',()=>consent(f,{headers:{...h,Cookie:h.Cookie.split('; ')[1]}})],
+ ['prepare mismatch',()=>consent(f,{headers:{...h,Cookie:h.Cookie.replace('a'.repeat(64),'b'.repeat(64))}})],
+ ['quoted own cookie',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner="'+f.notice.handle+'"'}})]
+ ];
+ for(const [kind,call]of cases){await denied(f,await call(),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
+}));
+test('native consent verified identity denies current signed identity corpus',()=>withIssued(async f=>{
+ const before=await ticket(f),h=f.notice.headers,parts=f.token.split('.');parts[2]=(parts[2][0]==='a'?'b':'a')+parts[2].slice(1);
+ const tokens=[
+ ['invalid signature',parts.join('.')],
+ ['wrong realm',await f.noticeToken({issuer:'https://wrong.invalid'})],
+ ['wrong audience',await f.noticeToken({audience:'SYN-other'})],
+ ['other subject',await f.noticeToken({subject:'SYN-other'})],
+ ['expired Access',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)-1})],
+ ['AccessPOST shorter than original ticket',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)+30})]
+ ];
+ for(const [kind,token]of tokens){await denied(f,await consent(f,{headers:{...h,'Cf-Access-Jwt-Assertion':token}}),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
+}));
+test('native consent own SQL continuation alone accepts pending SEND',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,4);assert.equal(before.events.length,0);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await denied(f,await consent(f),before);
+ await f.stub.noticeReleaseHeld();const response=await pending;assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+}));
+test('native consent lost native result never reconstructs ACK',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+ await f.stub.noticeConfigure();await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+for(const mode of ['lost-send','lost-ack'])test('native consent journal uncertainty never authorizes next effect '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,mode==='lost-send'?0:1);assert.equal(before.notice.length,mode==='lost-send'?4:5);
+ await f.stub.noticeConfigure();await denied(f,await consent(f),before);
+}));
+test('native consent original window fences queued SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('queue');const pending=consent(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
+ await new Promise(resolve=>setTimeout(resolve,5100));await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'actual operation remains retained');
+ await f.stub.noticeReleaseHeld();for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}assert.equal((await plain(f.stub.noticeProbe())).allowed,true,'actual queued SQL settlement observed');const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
+}));
+for(const [mode,drift]of [['before-send','revision'],['before-send','owner'],['before-send','pointer'],['before-insert','revision'],['before-insert','holder']])test('native consent source current drift denies '+mode+' '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,mode==='before-send'?'before-send':'before-insert');
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='holder')await f.stub.sdkReplaceHolder();
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,mode==='before-send'?3:4);
+}));
+for(const drift of ['exchange','event'])test('native consent second snapshot drift denies '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('consent-drift');const pending=consent(f);await gate(f,'between-own');
+ if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
+ else{
+  // SYN destructive immutable row corruption, never a legitimate transition.
+  await f.db.prepare('DROP TRIGGER dossier_monitoring_no_update').run();
+  await f.db.prepare("UPDATE dossier_monitoring_consent_events SET request_id='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee' WHERE grant_id=?").bind(f.identity.grantId).run();
+  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_no_update'))).run();
+ }
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
+}));
+for(const fault of ['own-unknown','overflow','freeze','row-hash'])test('native consent history closes replay '+fault,()=>withIssued(async f=>{
+ const before=await ticket(f);await f.stub.noticeCorrupt(fault);await denied(f,await consent(f));
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.deepEqual(after.tickets,before.tickets);assert(!after.notice.some(([k])=>k.endsWith('consent:send')));
+}));
+test('native consent withdrawal preserves history CLOSE before native SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);assert.equal((await plain(f.stub.noticeInspect())).events.length,0);
+}));
+test('native consent withdrawal preserves history real revokeGrant',()=>withIssued(async f=>{
+ await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());
+ const reduction=await plain(f.stub.sdkReduceOriginal());assert.equal(reduction.reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');
+ await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+test('native consent captured failure cannot resume commit',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');await f.stub.sdkReplaceHolder();
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
+}));
+test('notice cookie-list accepts token names and legitimate values POST',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
+ assert.equal(finiteOwnerNoticeConsentTarget,'https://afw-private.invalid/_finite-owner/monitoring/grant');
+ for(const cookie of ["!#$%&'*+-.^_\x60|~=x",'a=','a=base64===','a="quoted=="','a=""; b=x','a=x; A=y']){
+  const request=new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}});
+  assert.equal(qualifyFiniteOwnerNoticeConsentRequest(request,bytes).handle,'a'.repeat(43));
+ }
+});
+test('notice cookie-list rejects malformed list POST',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
+ for(const cookie of ['', '   ','; a=x','a=x;','a=x; ; b=y','bad:name=x','bad/name=x','bad@name=x','bad(name)=x','bad[name]=x','bad,name=x','bad name=x','námé=x','a=x; a=y','a=x,y','a=x\\y','a=has space','bad\x01name=x','a=x\x7fy','a=x\ty; b=1','a=x\r\ny=1','a=é','a="x"y','a="x','a=x"','a=x;b=y','a=x;  b=y','a=x ; b=y','a='+'x'.repeat(8191)]){
+  assert.throws(()=>qualifyFiniteOwnerNoticeConsentRequest(new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}}),bytes),JSON.stringify(cookie));
+ }
+});
+
+for(const kind of ['source-revision','issuer-reservation','original-grant-ack','grant-link','connection','ticket-request','event-sequence'])test('native consent correlated DATA denies '+kind,()=>withIssued(async f=>{
+ const before=await ticket(f);if(kind==='event-sequence'){const r=await consent(f);assert.equal(r.status,200);await r.body?.cancel();}
+ const original=await plain(f.stub.snapshot()),sqlBefore=await plain(f.stub.noticeInspect());await f.stub.noticeConfigure();
+ assert.deepEqual(await plain(f.stub.noticeCorrelated(kind)),{codecRoundtrip:true,journalValid:true});
+ await denied(f,await consent(f));
+ const after=await plain(f.stub.noticeInspect());assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.events,sqlBefore.events);
+ const expected=kind==='ticket-request'?'noticePrimary301':kind==='event-sequence'?'noticeConsentEventAck':'noticePrimary296',state=(await plain(f.stub.noticeStateRead())).state;
+ const correlators=state.trace.filter(v=>v.correlator);assert(correlators.some(v=>v.correlator===expected&&v.phase==='enter'),JSON.stringify(correlators));assert(!correlators.some(v=>v.correlator===expected&&v.phase==='exit'),JSON.stringify(correlators));
+ for(const earlier of expected==='noticePrimary301'?['noticePrimary296']:expected==='noticeConsentEventAck'?['noticePrimary296','noticePrimary301']:[])assert(correlators.some(v=>v.correlator===earlier&&v.phase==='exit'));
+ assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ const finalRows=await plain(f.stub.snapshot());for(const row of original.filter(([k])=>!k.startsWith('afw.finite-preparation-notice.v1:')))assert.deepEqual(finalRows.find(([k])=>k===row[0]),row);
+}));
+for(const where of ['M','QA'])test('native consent failed body retains actual cancellation '+where,()=>withIssued(async f=>{
+ const before=await ticket(f);let state;
+ if(where==='QA')state=await plain(f.stub.noticeBodyStart(f.notice.headers));
+ else{const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-start',{method:'POST',headers:f.notice.headers});state=await r.json();}
+ assert.notEqual(state.response,200);assert.equal(state.cancelEntered,true);assert.equal(state.cancelSettled,false);
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
+ assert.equal((await probe()).allowed,false,'new live root denied by actual pending cancellation');
+ if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
+ for(let n=0;n<100;n++){if((await probe()).allowed){if(where==='M'){const actual=await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();for(const key of ['readNativeEntered','readNativeSettled','cancelNativeEntered','cancelNativeSettled','bodyFinally','bodyPromiseEntered','bodyPromiseRejected','actualCallbackFinally','outerFinally'])assert.equal(actual[key],true,key);for(const key of ['cancelNativeRejected','readNativeRejected','bodyPromiseSettled'])assert.notEqual(actual[key],true,key);}return;}await new Promise(r=>setTimeout(r,10));}const finalState=where==='QA'?await plain(f.stub.noticeBodyRead()):await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();assert.fail('actual body cancellation not settled '+JSON.stringify({probe:await probe(),state:finalState}));
+}));
+test('native consent abort retains SQL and forbids late ACK',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');
+ const abort=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort');assert.equal(abort.status,204);await abort.body?.cancel();
+ await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);await f.stub.noticeReleaseHeld();
+ for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}
+ assert.equal((await plain(f.stub.noticeProbe())).allowed,true,'actual aborted SQL settlement observed');const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);assert(!after.notice.some(([k])=>k.endsWith('consent:ack')));
+}));
+test('pure fixed POST metadata and original grammar remain exact',()=>{
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ assert.equal(qualifyFiniteOwnerNoticeGetRequest(new Request(origin+'/monitoring'),new Uint8Array()).method,'GET');
+ const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'POST','x-afw-finite-original-url':origin+'/monitoring/grant','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
+ assert.equal(readFiniteOwnerNoticeConsentMetadata(h).method,'POST');h.set('x-afw-finite-original-method','GET');assert.throws(()=>readFiniteOwnerNoticeConsentMetadata(h));
+});
+
+for(const kind of ['absent','partial','failed-schema-metadata','malformed-schema-results'])test('native consent history closes replay schema '+kind,()=>withIssued(async f=>{
+ const before=await ticket(f);await f.stub.noticeConfigure(kind);
+ if(kind==='absent'){await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();}
+ if(kind==='partial')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+ await denied(f,await consent(f));
+ const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ const rows=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'));assert.deepEqual(rows,before.notice);
+}));
+test('native consent history closes replay event without SEND',()=>withIssued(async f=>{
+ const before=await ticket(f),i=f.identity,at=Date.now(),r=JSON.parse(before.notice.find(([k])=>k.endsWith(':reservation'))[1]);
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(i.grantId,i.projectId,i.subject,i.clientId,i.resource,i.projectRevision,'grant','afw.dossier-monitoring.v1',r.ticket.requestId,at,r.ticket.permissionExpiresAt).run();
+ const corrupted=await plain(f.stub.noticeInspect());await denied(f,await consent(f),corrupted);assert.equal(corrupted.notice.length,3);assert.equal(corrupted.events.length,1);
+}));
+test('native consent withdrawal preserves history ordinary append-only withdrawal',()=>withIssued(async f=>{
+ await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
+ const before=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],before.events[0]);assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.notice,before.notice);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});
+ await denied(f,await consent(f),after);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('native consent withdrawal preserves history revokeGrant before queued SQL',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
+ const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.reduction,'revoked');await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});
+}));
+
+for(const where of ['M','QA'])test('native consent failed body retains actual cancellation held read '+where,()=>withIssued(async f=>{
+ const before=await ticket(f);
+ const read=async()=>where==='QA'?plain(f.stub.noticeBodyRead()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();
+ const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
+ const pending=where==='QA'?plain(f.stub.noticeBodyStart(f.notice.headers,'read')):f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-read-start',{method:'POST',headers:f.notice.headers}).then(r=>r.json());
+ const until=async predicate=>{for(let n=0;n<200;n++){const state=await read();if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('native held body state not reached '+JSON.stringify({state:await read(),probe:await probe()}));};
+ await until(s=>s.readEntered);
+ if(where==='QA')await f.stub.noticeBodyAbortHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
+ const failed=await pending;assert.notEqual(failed.response,200);assert.equal(failed.readSettled,false);assert.equal((await probe()).allowed,false);
+ if(where==='QA')await f.stub.noticeBodyReleaseRead();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release-read')).body?.cancel();
+ const cancelling=await until(s=>s.cancelEntered);assert.equal(cancelling.readSettled,true);assert.equal(cancelling.cancelSettled,false);assert.equal((await probe()).allowed,false);
+ if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
+ for(let n=0;n<100;n++){if((await probe()).allowed){if(where==='M'){const actual=await read();for(const key of ['readNativeEntered','readNativeSettled','cancelNativeEntered','cancelNativeSettled','bodyFinally','bodyPromiseEntered','bodyPromiseRejected','actualCallbackFinally','outerFinally'])assert.equal(actual[key],true,key);for(const key of ['cancelNativeRejected','readNativeRejected','bodyPromiseSettled'])assert.notEqual(actual[key],true,key);}assert.deepEqual(await plain(f.stub.noticeInspect()),before);return;}await new Promise(r=>setTimeout(r,10));}assert.fail('actual held read/cancel scope not released');
+}));
+for(const drift of ['owner','revision','pointer'])test('native consent source current drift denies after-SEND before recheck '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('after-send');const pending=consent(f);await gate(f,'after-send');
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ await f.stub.noticeReleaseHeld();await denied(f,await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
+ const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+}));
+
+test('native consent lost native result never reconstructs ACK after actual actor restart',()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);
+ const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
+ const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance,'actual actor instance changed after native abort');
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);await f.stub.noticeConfigure();
+ await denied(f,await consent(f),before);const state=(await plain(f.stub.noticeStateRead())).state;
+ assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
+ assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
+}));

~~~~~~~~~~

## test/mcp-qa-finite-owner-notice-get-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-notice-get-native.test.mjs b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-notice-get-native.test.mjs
@@ -0,0 +1,265 @@
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
+  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
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
+  await fn(f);
+ }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+test('inventory own negative key after actual SDK grant closes legacy reader',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
+ await f.stub.noticeCorrupt('own-unknown');
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+
+async function actualExchangeMcp(f){
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
+test('GET acknowledged original after actual QA code M token MCP and D04 reader',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
+ const originalRows=await plain(f.stub.snapshot());await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now();
+ const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'});
+ const status=response.status,html=await response.text();
+ const after=await plain(f.stub.noticeInspect());
+ assert.equal(status,200,'fixed GET missing after actual prerequisites; tickets='+after.tickets.length+' journal='+after.notice.length);
+ const state=(await plain(f.stub.noticeStateRead())).state,io=await plain(f.stub.ioObservation());await saveNoticeObservation({elapsed:Date.now()-began,trace:state.trace,sql:state.sql,ops:state.ops,lists:state.lists,io});console.info('NOTICE actual principal costs',JSON.stringify({elapsed:Date.now()-began,trace:state.trace,sessions:state.sql.length,first:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,queries:[...new Set(state.sql.flatMap(s=>s.queries).map(q=>q.sql))],ops:state.ops,noticeLists:state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).map(v=>v.limit),http:{snapshots:io.snapshots,rows:io.rows.length,peak:io.peak,active:io.active,bodyCancels:io.rows.filter(v=>v.cancelSettledAt>=v.cancelStartedAt).length}}));
+ assert(Date.now()-began<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
+ assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 8'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1&&s.queries[0].method==='all'));assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 2')||q.sql.endsWith('LIMIT 3'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1));
+ assert.equal(after.tickets.length,1);assert.equal(after.notice.length,3);assert.deepEqual(after.events,[]);
+ const records=Object.fromEntries(after.notice.map(([key,value])=>[key.split(':').slice(-2).join(':'),JSON.parse(value)])),ticket=after.tickets[0],handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ assert.equal(createHash('sha256').update(handle).digest('hex'),ticket.handle_hash);assert.equal(Object.keys(ticket).length,14);assert.equal(ticket.grant_id,f.identity.grantId);assert.equal(ticket.user_id,f.identity.subject);assert.equal(ticket.expected_sequence,0);assert.equal(ticket.action,'grant');assert.equal(ticket.purpose,'afw.dossier-monitoring-owner.v1');
+ const reservation=JSON.parse(after.notice.find(([key])=>key.endsWith(':reservation'))[1]),rt=reservation.ticket,i=f.identity;
+ assert.deepEqual(reservation.identity,i);assert.deepEqual(reservation.expectedGrant,{scopes:JSON.parse(f.grant.scopes_json),createdAt:f.grant.created_at,expiresAt:f.grant.expires_at});
+ assert.deepEqual(ticket,{handle_hash:createHash('sha256').update(handle).digest('hex'),request_id:rt.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:0,issued_at:rt.issuedAt,expires_at:rt.expiresAt,permission_expires_at:rt.permissionExpiresAt});
+ assert.equal(records['ticket:ack'].rowHash,initialHash('afw.finite-preparation-notice-row.v1',ticket));
+ assert.equal(ticket.expires_at,Math.min(ticket.issued_at+600000,reservation.accessExpiresAt,reservation.preconnectionExpiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(f.grant.expires_at)));
+ const sourceRowsAfter=await plain(f.stub.snapshot());for(const row of originalRows)assert.deepEqual(sourceRowsAfter.find(([key])=>key===row[0]),row,'original preparation/issuer/SDK history retained');
+ assert.equal(records['ticket:ack'].outcome,'applied');assert.equal(records['ticket:ack'].sequence,null);assert(records['ticket:ack'].observedAt<records['ticket:send'].window.deadline);assert(state.trace.find(v=>v.position==='complete').at<records['ticket:send'].window.deadline);assert(records['ticket:send'].window.deadline-records['ticket:send'].window.startedAt<=5000);
+ assert.match(html,/<form method="post" action="\/monitoring\/grant">/);assert.match(html,/<button type="submit">Permitir avisos temporales<\/button>/);assert.doesNotMatch(html,/<script|disabled|autosubmit/);assert.match(html,/Podés registrar un permiso temporal para avisos/);assert(html.includes(new Date(ticket.permission_expires_at).toISOString()));
+ assert.match(response.headers.get('Content-Security-Policy'),/form-action 'self'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ const repeat=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers});assert.equal(repeat.status,503);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
+}));
+
+async function notice(f,headers=f.headers,options={}){
+ return f.mf.dispatchFetch(f.source.origin+'/monitoring',{redirect:'manual',headers,...options});
+}
+async function deny(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Set-Cookie'),null);}
+async function ownRows(f){return (await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'+f.identity.preconnectionId+':'));}
+async function gate(f,name){
+ for(let n=0;n<150;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual native gate not reached: '+name);
+}
+test('fixed grammar and Access negatives never write notice or SQL',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());
+ for(const path of ['/monitoring','/monitoring/grant','/monitoring/revoke']){
+  await deny(await f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'grant=true'}));
+  assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+ for(const path of ['/monitoring?grant=caller','/monitoring#caller','/monitoring/grant']){
+  // Hashes never travel over HTTP; the pure wire test covers the original URL.
+  if(path.includes('#'))continue;
+  await deny(await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers}));
+ }
+ const signature=f.token.split('.');signature[2]=(signature[2][0]==='a'?'b':'a')+signature[2].slice(1);
+ const negatives=[
+  {...f.headers,Origin:'https://foreign.invalid'},
+  {...f.headers,Cookie:PREP+'; '+PREP},
+  {...f.headers,Cookie:''},
+  {...f.headers,Cookie:PREP+'; __Host-afw-monitoring-owner=previous'},
+  {...f.headers,'Cf-Access-Jwt-Assertion':signature.join('.')},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({subject:'SYN-other'})},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({audience:'SYN-other'})},
+  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({issuer:'https://wrong.invalid'})}
+ ];
+ for(const headers of negatives){await deny(await notice(f,headers));assert.deepEqual(await plain(f.stub.noticeInspect()),before);}
+ assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('pure fixed GET wire rejects caller authority and noncanonical metadata',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q,readFiniteOwnerNoticeGetMetadata:metadata}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev',empty=new Uint8Array();
+ assert.deepEqual(q(new Request(origin+'/monitoring'),empty),{method:'GET',url:origin+'/monitoring'});
+ for(const url of [origin+'/monitoring?grant=x',origin+'/monitoring#x','https://foreign.invalid/monitoring','https://u:p@delegated-canary.agentfriendlyweb.dev/monitoring'])assert.throws(()=>q(new Request(url),empty));
+ assert.throws(()=>q(new Request(origin+'/monitoring',{method:'POST'}),empty));assert.throws(()=>q(new Request(origin+'/monitoring'),new Uint8Array([1])));
+ for(const cookie of ['a=1; a=2','malformed','a=has space'])assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{Cookie:cookie}}),empty));
+ const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'GET','x-afw-finite-original-url':origin+'/monitoring','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
+ assert.equal(metadata(h).method,'GET');h.set('x-afw-finite-allowPending','true');assert.throws(()=>metadata(h));
+});
+test('full empty and totally absent schema preserve reader; GET partial schema fails before journal',()=>withIssued(async f=>{
+ const before=await plain(f.stub.sdkReadCurrent());assert.equal(Object.keys(before).length,3);
+ await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();
+ assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+ for(const sql of SCHEMA)await f.db.prepare(sql).run();
+ assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);
+ for(const fault of ['index','trigger','extra','sql']){
+  if(fault==='index'||fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+  if(fault==='trigger')await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_delete').run();
+  if(fault==='extra')await f.db.prepare('CREATE INDEX SYN_negative_extra_index ON dossier_monitoring_owner_tickets(grant_id)').run();
+  if(fault==='sql')await f.db.prepare('CREATE INDEX dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(sequence,grant_id)').run();
+  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+  if(fault==='extra')await f.db.prepare('DROP INDEX SYN_negative_extra_index').run();
+  if(fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
+  for(const sql of SCHEMA)await f.db.prepare(sql).run();
+ }
+ await f.stub.noticeConfigure('failed-schema-metadata');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
+}));
+test('foreign preconnection and UUID history is neither enumerated nor changed',()=>withIssued(async f=>{
+ await f.stub.noticeCorrupt('foreign-unknown');
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('f'.repeat(64),foreign,'SYN-other',foreign,'SYN-other','SYN-other','https://foreign.invalid/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,at,at+60000,at+60000).run();
+ const history=await plain(f.stub.snapshot()),foreignRow=await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first();
+ assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
+ assert.deepEqual(await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first(),foreignRow);
+ const after=await plain(f.stub.snapshot());for(const row of history)assert.deepEqual(after.find(([key])=>key===row[0]),row);
+}));
+for(const fault of ['overflow','ack-without-send','foreign-send'])test('SYN negative journal '+fault+' fails closed',()=>withIssued(async f=>{
+ await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.equal((await plain(f.stub.noticeInspect())).tickets.length,0);
+}));
+for(const fault of ['identity','grant-link','connection','row-hash'])test('SYN negative settled notice '+fault+' fails closed',()=>withIssued(async f=>{
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
+ const before=await plain(f.stub.noticeInspect());await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual((await plain(f.stub.noticeInspect())).tickets,before.tickets);
+}));
+for(const mode of ['hold-before','hold-after'])test('owned native '+mode+' denies bearer continuation and only own stack ACKs',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure(mode);const pending=notice(f);const seen=await gate(f,mode==='hold-before'?'before-sql':'after-sql');assert.equal(seen.state.resolution?.row??false,mode==='hold-after');
+ const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,2);assert.equal(before.tickets.length,mode==='hold-after'?1:0);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));await f.stub.noticeReleaseHeld();
+ const result=await pending;assert.equal(result.status,200);await result.body?.cancel();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.notice.length,3);assert.equal(after.tickets.length,1);
+}));
+for(const mode of ['lost-reservation','lost-send','lost-sql'])test('unknown acknowledgement '+mode+' retains facts and never retries',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure(mode);await deny(await notice(f));const before=await plain(f.stub.noticeInspect());
+ assert.equal(before.notice.length,mode==='lost-reservation'?1:2);assert.equal(before.tickets.length,mode==='lost-sql'?1:0);
+ assert.equal(before.notice.some(([key])=>key.endsWith('ticket:ack')),false);await deny(await notice(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+}));
+test('freeze after actual SQL commit blocks own ACK without deleting ticket',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('hold-after');const pending=notice(f);await gate(f,'after-sql');await f.stub.noticeCorrupt('freeze');await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('queue past original five-second SQL window cannot mutate or ACK',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('queue');const pending=notice(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
+ await new Promise(resolve=>setTimeout(resolve,5100));await deny(await pending);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false},'actual queued SQL retains scope after child abort');await f.stub.noticeReleaseHeld();
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
+}));
+test('original CLOSE wins queued INSERT without deleting history or revoking grant',()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('hold-before');const pending=notice(f);await gate(f,'before-sql');assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('ticket wins before original CLOSE; retained ticket and grant survive',()=>withIssued(async f=>{
+ const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());assert.equal((await plain(f.stub.noticeFence())).status,'fenced');
+ assert.deepEqual(await plain(f.stub.noticeInspect()),before);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+test('actual Access expires inside GET before any reservation',()=>withIssued(async f=>{
+ const expires=Math.floor(Date.now()/1000)+4,token=await f.noticeToken({expiresAt:expires});await f.stub.noticeConfigure('expire-access');
+ const pending=notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});await gate(f,'access');await new Promise(resolve=>setTimeout(resolve,Math.max(1,expires*1000-Date.now()+20)));await f.stub.noticeReleaseHeld();await deny(await pending);assert.deepEqual(await ownRows(f),[]);
+}));
+test('shorter signed current Access clamps ticket to original minimum',()=>withIssued(async f=>{
+ const expires=Math.floor(Date.now()/1000)+60,token=await f.noticeToken({expiresAt:expires});const response=await notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});assert.equal(response.status,200);await response.body?.cancel();
+ const after=await plain(f.stub.noticeInspect()),ticket=after.tickets[0];assert.equal(ticket.expires_at,Math.min(expires*1000,Date.parse(f.grant.expires_at)));assert(ticket.expires_at-ticket.issued_at>5000);
+}));
+
+test('SYN negative original UUID ticket without journal and consent history fail closed',()=>withIssued(async f=>{
+ const at=Date.now(),request='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('e'.repeat(64),request,f.identity.subject,f.identity.grantId,f.identity.projectId,f.identity.clientId,f.identity.resource,'afw.dossier-monitoring-owner.v1','grant',f.identity.projectRevision,0,at,at+60000,at+60000).run();
+ await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await ownRows(f),[]);
+}));
+test('SYN negative consent event with real correct ticket never authorizes GET',()=>withIssued(async f=>{
+ const prepared=await notice(f);assert.equal(prepared.status,200);await prepared.body?.cancel();const ticketBefore=(await plain(f.stub.noticeInspect())).tickets;assert.equal(ticketBefore.length,1);
+ const at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(f.identity.grantId,f.identity.projectId,f.identity.subject,f.identity.clientId,f.identity.resource,f.identity.projectRevision,'grant','afw.dossier-monitoring.v1','eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',at,at+60000).run();
+ await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual((await plain(f.stub.noticeInspect())).tickets,ticketBefore);assert.equal((await ownRows(f)).length,3);
+}));
+for(const drift of ['owner','revision','pointer','exchange','journal','ticket'])test('two complete snapshots reject SYN own-state drift '+drift,()=>withIssued(async f=>{
+ await f.stub.noticeConfigure('drift');const pending=notice(f);await gate(f,'between-own');
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE drift' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='exchange'){
+  const created=Date.parse(f.grant.created_at),value=new Date(Math.max(created,Date.now()-1)).toISOString();
+  assert.notEqual(value,f.grant.exchanged_at);await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();
+ }
+ if(drift==='journal')await f.stub.noticeCorrupt('connection');
+ if(drift==='ticket'){
+  // Explicit destructive SYN corruption, after first snapshot; not a legitimate transition.
+  await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_update').run();
+  await f.db.prepare('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE grant_id=?').bind('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',f.identity.grantId).run();
+  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_tickets_no_update'))).run();
+ }
+ await f.stub.noticeReleaseHeld();await deny(await pending);
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
+}));
+
+async function ioGate(f,phase){
+ for(let n=0;n<200;n++){const state=await plain(f.stub.ioObservation());if(state.held?.phase===phase)return state;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual provider body/cancel gate not reached: '+phase);
+}
+test('GET child expiry retains actual HTTP body and cancel until physical settlement',()=>withIssued(async f=>{
+ await f.stub.ioConfigure({hold:'qa-version'});const began=Date.now(),pending=notice(f);await ioGate(f,'body');
+ await deny(await pending);assert(Date.now()-began>=4900);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
+ assert.deepEqual(await ownRows(f),[]);await f.stub.ioRelease('body');const cancelling=await ioGate(f,'cancel');assert.equal(cancelling.active,1);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
+ await f.stub.ioRelease('cancel');
+ for(let n=0;n<100;n++){const state=await plain(f.stub.ioObservation());if(state.active===0&&(await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual HTTP body/cancel did not settle in original parent window');
+}));
+
+test('notice GET malformed unrelated cookie denies before reservation',()=>withIssued(async f=>{
+ const before=await plain(f.stub.noticeInspect());
+ for(const suffix of ['; bad:name=x','; ; extra=x']){
+  const response=await notice(f,{...f.headers,Cookie:PREP+suffix});await response.body?.cancel();
+  assert.notEqual(response.status,200);assert.deepEqual(await plain(f.stub.noticeInspect()),before);
+ }
+}));
+test('notice cookie-list accepts token names and legitimate values',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ for(const cookie of [null,"!#$%&'*+-.^_`|~=x",'a=','a=base64===','a="quoted=="','a=""; b=x','a=x; A=y']){
+  const headers=cookie===null?{}:{Cookie:cookie};assert.equal(q(new Request(origin+'/monitoring',{headers}),new Uint8Array()).method,'GET');
+ }
+});
+test('notice cookie-list rejects malformed list',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ for(const cookie of ['', '   ','; a=x','a=x;','a=x; ; b=y','bad:name=x','bad/name=x','bad@name=x','bad(name)=x','bad[name]=x','bad,name=x','bad name=x','námé=x','a=x; a=y','a=x,y','a=x\\y','a=has space','bad\x01name=x','a=x\x7fy','a=x\ty; b=1','a=x\r\ny=1','a=é','a="x"y','a="x','a=x"','a=x;b=y','a=x;  b=y','a=x ; b=y','a='+'x'.repeat(8191)]){
+  assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{Cookie:cookie}}),new Uint8Array()),'must reject '+JSON.stringify(cookie));
+ }
+});
+
+test('notice cookie-list bounds assertion and native header envelope',async()=>{
+ const {qualifyFiniteOwnerNoticeGetRequest:q}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs'),origin='https://delegated-canary.agentfriendlyweb.dev';
+ assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{'Cf-Access-Jwt-Assertion':'x'.repeat(8193)}}),new Uint8Array()));
+ assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{'Cf-Access-Jwt-Assertion':'x\r\ny'}}),new Uint8Array()));
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-notice-link-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-notice-link-native.test.mjs b/test/mcp-qa-finite-owner-notice-link-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-notice-link-native.test.mjs
@@ -0,0 +1,168 @@
+import {hashFiniteOwnerEvidence,encodeFinitePreparationRecord,decodeFinitePreparationRecord} from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
+import {prepareNoticeIssued,issueNotice,actualExchangeMcp,ticket,consent,noticePlain as plain,saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
+
+async function withIssued(fn){
+ const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
+ try{await prepareNoticeIssued(f);await seedFiniteOwnerSdkClient(f.mf,f.source);await issueNotice(f);await fn(f);}
+ finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+test('native notice link follows actual consent ACK in the same POST child',()=>withIssued(async f=>{
+ await actualExchangeMcp(f);await ticket(f);
+ const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,grants=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,schema=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results;await f.stub.noticeConfigure();await f.stub.ioConfigure();const began=Date.now();const response=await consent(f);await response.body?.cancel();const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began;const after=await plain(f.stub.noticeInspect());
+ assert.equal(response.status,200);assert.equal(after.fixtureError,undefined);assert.equal(after.events.length,1);
+ assert.equal(after.notice.length,5);assert(after.notice.some(([key])=>key.endsWith('consent:ack')));
+ const all=await plain(f.stub.snapshot()),link=all.find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');
+ assert(link,'actual POST 200 and durable SQL/ACK must produce NoticeLink');
+ const record=decodeFinitePreparationRecord('NoticeLink',link[1]),event=after.events[0],ack=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:ack'))[1]),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
+ assert.deepEqual(Object.keys(record).sort(),['acceptedAt','eventHash','grantHash','preconnectionId','sequence']);assert.equal(encodeFinitePreparationRecord('NoticeLink',record),link[1]);
+ assert.equal(record.eventHash,hashFiniteOwnerEvidence('event',{grantId:event.grant_id,projectId:event.project_id,subject:event.user_id,clientId:event.client_id,resource:event.resource,revision:event.revision,action:event.action,purpose:event.purpose,requestId:event.request_id,sequence:event.sequence,issuedAt:event.issued_at,expiresAt:event.expires_at}));
+ assert.notEqual(record.eventHash,ack.rowHash);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',event));assert.equal(record.sequence,event.sequence);assert(record.sequence>1);assert(record.acceptedAt>=ack.observedAt);assert(record.acceptedAt<send.window.deadline);
+ for(const row of original)assert.deepEqual(all.find(([key])=>key===row[0]),row);
+ const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);
+ assert.equal(grants.length,3);assert.equal(history.length,3);assert.equal(schema.length,7);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,grants);assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name").all()).results,schema);
+ const trace=observation.state.trace;
+ assert.deepEqual(trace.filter(v=>v.link&&v.link!=='transaction-settled').map(v=>v.link),['put-enter','put-exit','sync-enter','sync-exit','read-enter','read-exit']);
+ const snapshots=trace.filter(v=>v.snapshotNotice).map(v=>v.snapshotNotice);assert.equal(snapshots.length,14);assert.deepEqual(snapshots.slice(0,12),Array.from({length:12},()=>({present:false,inventory:false,anchor:false})));assert.deepEqual(snapshots.slice(12),Array.from({length:2},()=>({present:true,inventory:true,anchor:true})));
+ assert.equal(trace.filter(v=>v.stage==='after').length,6);assert.equal(io.snapshots,14);assert.equal(io.peak,2);assert.equal(io.active,0);
+ const complete=trace.find(v=>v.position==='complete');assert(complete.at<send.window.deadline);assert(elapsed<30000);
+ await saveNoticeObservation({unit:'link',elapsed,...observation.state,io});
+ console.info('LINK native principal costs',JSON.stringify({elapsed,pairs:io.snapshots/2,rechecks:trace.filter(v=>v.stage==='after').length,accessVerifications:observation.state.accessVerifications,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeLists:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).length,http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active},childElapsed:complete.at-send.window.startedAt,windowMs:send.window.deadline-send.window.startedAt}));
+
+}));
+
+async function state(f){return (await plain(f.stub.noticeStateRead())).state;}
+async function gate(f,name){
+ for(let n=0;n<500;n++){const s=await plain(f.stub.noticeStateRead());if(s.held===name)return s;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('SYN actual Link gate not reached: '+name);
+}
+async function settled(f){for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}assert.fail('actual originating Link work did not settle');}
+async function denied(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/Registré tu decisión|<form/);}
+async function success(f){await ticket(f);await f.stub.noticeConfigure();const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();return plain(f.stub.noticeInspect());}
+async function linkEntry(f){return (await plain(f.stub.snapshot())).find(([key])=>key==='connection-preparation:'+f.identity.preconnectionId+':notice');}
+function countWrites(s){return s.trace.filter(v=>v.link==='put-enter').length;}
+function consentInserts(s){return s.sql.flatMap(v=>v.queries).filter(v=>v.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length;}
+async function replayClosed(f,before){
+ await f.stub.noticeConfigure();await denied(await consent(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);const s=await state(f);assert.equal(countWrites(s),0);assert.equal(consentInserts(s),0);
+}
+test('native notice link retains global event sequence and foreign history',()=>withIssued(async f=>{
+ const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
+ await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
+ const original=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
+ const after=await success(f),record=decodeFinitePreparationRecord('NoticeLink',(await linkEntry(f))[1]);assert.equal(record.sequence,after.events[0].sequence);assert(record.sequence>original.at(-1).sequence);
+ const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of original)assert.deepEqual(history.find(v=>v.sequence===row.sequence),row);
+}));
+test('native notice link never advances source or public readers and remains factual after deadline',()=>withIssued(async f=>{
+ const after=await success(f),entry=await linkEntry(f),send=JSON.parse(after.notice.find(([key])=>key.endsWith('consent:send'))[1]);
+ await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));assert(Date.now()>send.window.deadline);
+ await f.stub.noticeConfigure();assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ const trace=(await state(f)).trace;assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'&&v.at>send.window.deadline));assert(trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'));
+ for(const path of ['/monitoring','/authorize','/monitoring/notice-link']){const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();}
+ await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+}));
+for(const history of ['complete','cut-after-ack'])test('native notice link requires live originating SQL continuation '+history,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(history==='complete'?'normal':'link-cut-after-ack');
+ if(history==='complete'){const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();}
+ else{const pending=consent(f);await gate(f,'before-link');await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();await denied(await pending);await f.stub.noticeReleaseHeld();await settled(f);}
+ const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.equal(Boolean(await linkEntry(f)),history==='complete');
+ const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
+ const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance);await replayClosed(f,after);assert.equal(Boolean(await linkEntry(f)),history==='complete');
+}));
+for(const mode of ['link-lost-transaction','link-lost-sync','link-lost-readback','link-wrong-readback'])test('native notice link unknown or lost actual result remains closed '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);await denied(await consent(f));
+ const after=await plain(f.stub.noticeInspect()),entry=await linkEntry(f),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(entry);assert.equal(countWrites(s),1);
+ if(mode==='link-lost-transaction'){assert(s.trace.some(v=>v.link==='put-exit'&&v.status==='uncertain'));assert(!s.trace.some(v=>v.link==='sync-enter'||v.link==='read-enter'));}
+ if(mode==='link-lost-sync')assert(!s.trace.some(v=>v.link==='read-enter'));
+ assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);assert.deepEqual(await linkEntry(f),entry);
+}));
+for(const mode of ['link-existing','link-conflict'])test('native notice link existing or conflicting record cannot win '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,'before-link');await f.stub.noticeReleaseHeld();await denied(await pending);
+ const after=await plain(f.stub.noticeInspect()),s=await state(f);assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(s),1);assert(s.trace.some(v=>v.link==='negative-race-insert'));assert(!s.trace.some(v=>v.link==='sync-enter'));await replayClosed(f,after);
+}));
+async function qaControl(f,action){
+ if(!f.qaControlFetch){assert.equal(typeof f.mf.getWorker,'function','actual Miniflare getWorker API is present');const worker=await f.mf.getWorker('qa-sdk');assert.equal(typeof worker.fetch,'function');f.qaControlFetch=worker.fetch.bind(worker);}
+ const response=await f.qaControlFetch('https://qa-fixture.invalid/fixture/notice-link-control',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});assert.equal(response.status,200);return response.json();
+}
+async function controlGate(f){
+ for(let n=0;n<500;n++){const data=await qaControl(f,'read');if(data.held==='link-write')return data;await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual QA fetch did not observe original TX DATA gate within original child');
+}
+for(const [mode,name]of [['link-hold-write','link-write'],['link-hold-commit','link-commit'],['link-hold-sync','link-sync'],['link-hold-readback','link-readback']])test('native notice link held native work and cancellation retain scope '+mode,()=>withIssued(async f=>{
+ const dispatch=f.mf.dispatchFetch.bind(f.mf);let pendingConsent=null,competingHttp=null,httpSettled=false,httpStatus=null,httpError=null,originalAborted=false;
+ if(mode==='link-hold-write'){
+  const data=await qaControl(f,'reset'),actor=await plain(f.stub.noticeLinkControlRead());assert.equal(data.visible,true);assert.equal(actor.visible,true);assert.equal(actor.marker,data.marker);
+ }
+ try{
+  await ticket(f);await f.stub.noticeConfigure(mode);const pending=pendingConsent=consent(f);
+  if(mode==='link-hold-write'){
+   const data=await controlGate(f);assert.equal(data.entered,1);assert.equal(data.txStarted,true);assert.equal(data.txSettled,false);assert.equal(data.expired,false);
+   console.info('LINK native DATA visibility',JSON.stringify({actualQaFetch:true,actorShared:true,originalTxEntered:data.entered,nativeTransactionPending:!data.txSettled}));
+   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;
+   competingHttp=dispatch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'}).then(response=>{httpSettled=true;httpStatus=response.status;return response;},error=>{httpSettled=true;httpError=String(error?.message);return null;});
+   await new Promise(r=>setTimeout(r,25));const during=await qaControl(f,'read');
+   assert.equal(during.held,'link-write');assert.equal(during.txStarted,true);assert.equal(during.txSettled,false);assert.equal(during.txOutcome,null);assert.equal(during.expired,false);assert.notEqual(httpStatus,200);
+   console.info('LINK native TX HTTP observation',JSON.stringify({requestSettledDuringHeld:httpSettled,statusDuringHeld:httpStatus,errorDuringHeld:httpError,controlHeld:during.held,nativeTxSettled:during.txSettled,nativeTxOutcome:during.txOutcome,classification:httpSettled?'closed response while native TX pending':'native HTTP pending at bounded observation'}));
+   await qaControl(f,'release');await denied(await pending);const competingResponse=await competingHttp;assert.equal(httpError,null);assert(competingResponse);await denied(competingResponse);
+   const after=await qaControl(f,'read');assert.equal(after.settled,1);assert.equal(after.expired,false);assert.equal(after.txSettled,true);assert(['fulfilled','rejected'].includes(after.txOutcome));
+   console.info('LINK native original transaction settlement',JSON.stringify({settled:after.txSettled,outcome:after.txOutcome,httpStatus,noLateSuccess:true}));
+  }else{
+   await gate(f,name);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'fresh native request denied while actual work outstanding');
+   await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();originalAborted=true;await denied(await pending);
+   assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'aborting original request is not settlement');await f.stub.noticeReleaseHeld();
+  }
+  await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+  const s=await state(f);assert.equal(countWrites(s),1);assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
+ }finally{
+  if(mode==='link-hold-write'){
+   if(!originalAborted)await (await dispatch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
+   await qaControl(f,'release');
+   for(const actual of [pendingConsent,competingHttp])if(actual){const response=await actual;await response?.body?.cancel().catch(()=>{});}
+  }
+ }
+}));
+for(const [mode,name]of [['link-before','before-link'],['link-hold-commit','link-commit']])test('native notice link original child expires without renewal '+mode,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f),seen=await gate(f,name);
+ const at=await plain(f.stub.noticeInspect()),send=JSON.parse(at.notice.find(([key])=>key.endsWith('consent:send'))[1]);assert(seen.state.trace.some(v=>v.gate===name&&v.at<send.window.deadline));
+ await new Promise(r=>setTimeout(r,Math.max(0,send.window.deadline-Date.now()+25)));await denied(await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);
+ await f.stub.noticeReleaseHeld();await settled(f);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
+ const s=await state(f);assert.equal(countWrites(s),mode==='link-before'?0:1);assert.equal(Boolean(await linkEntry(f)),mode==='link-hold-commit');assert(!s.trace.some(v=>v.position==='complete'));await replayClosed(f,after);
+}));
+for(const drift of ['owner','revision','QA','M','holder','exchange'])test('native notice link current facts drift at final recheck '+drift,()=>withIssued(async f=>{
+ await ticket(f);await f.stub.noticeConfigure('link-drift');const pending=consent(f);await gate(f,'link-between');assert(await linkEntry(f));
+ if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
+ if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
+ if(drift==='M')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+ if(drift==='QA'){f.phaseQaObservation=1;f.phaseDrift='qa-pointer';}
+ if(drift==='holder')await f.stub.sdkReplaceHolder();
+ if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
+ await f.stub.noticeReleaseHeld();await denied(await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert(await linkEntry(f));assert.equal(countWrites(await state(f)),1);
+}));
+test('native notice link factual mismatch denies valid codec and journal data',()=>withIssued(async f=>{
+ const after=await success(f),event=after.events[0],grant=await plain(f.stub.sdkGrant(f.identity.grantId)),baselineInserts=consentInserts(await state(f));assert.equal(baselineInserts,1);
+ for(const kind of ['eventHash','grantHash','sequence','preconnectionId','future','before-ack','after-deadline']){
+  const proof=await plain(f.stub.noticeLinkCorrupt(kind));assert.equal(proof.codecRoundtrip,true,kind);assert.equal(proof.journalValid,true,kind);
+  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable',kind);const s=await state(f);assert(s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='enter'),kind+' reaches actual correlator');assert(!s.trace.some(v=>v.correlator==='noticeLink'&&v.phase==='exit'),kind+' fails actual predicate');assert.equal(countWrites(s),0);assert.equal(consentInserts(s),baselineInserts);
+  assert.deepEqual((await plain(f.stub.noticeInspect())).events,[event]);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),grant);await f.stub.noticeLinkRestore(proof.original);
+ }
+}));
+for(const missing of ['ack','unknown-send','no-mutation','freeze','withdrawal'])test('native notice link missing source evidence never becomes authority '+missing,()=>withIssued(async f=>{
+ await success(f);const entry=await linkEntry(f);
+ if(missing==='freeze')await f.stub.noticeCorrupt('freeze');
+ else if(missing==='withdrawal'){
+  const original=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});
+  const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
+  const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],original.events[0]);assert.deepEqual(after.notice,original.notice);assert.deepEqual(after.tickets,original.tickets);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
+ }else await f.stub.noticeLinkMissing(missing);
+ const before=await plain(f.stub.noticeInspect());await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+}));
+for(const reduction of ['CLOSE','revokeGrant'])test('native notice link real reduction preserves event and link '+reduction,()=>withIssued(async f=>{
+ const before=await success(f),entry=await linkEntry(f);
+ if(reduction==='CLOSE'){assert.equal((await plain(f.stub.noticeFence())).status,'fenced');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);}
+ else{assert.equal((await plain(f.stub.sdkReduceOriginal())).reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});}
+ await replayClosed(f,before);assert.deepEqual(await linkEntry(f),entry);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-owner-original-context-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-original-context-native.test.mjs b/test/mcp-qa-finite-owner-original-context-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-original-context-native.test.mjs
@@ -0,0 +1,21 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const copy=async p=>{const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}};
+test('actual fixed QA adapter first GET uses exact original capsule selector and unrelated UI handles',async()=>{
+ const f=await initialEntryHarness('private-choice');
+ try{
+  await f.stub.configure('normal');assert.equal((await copy(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  const envelope=await copy(f.ownerRead()),token=await f.enrollmentToken(envelope.source),before=await copy(f.stub.snapshot());
+  const result=await copy(f.ownerRead(400000,'private-choice',null,token));
+  assert.equal(result.status,200);assert.equal(result.stage,'connection');
+  assert.notEqual(result.handle,envelope.preconnectionId);assert.notEqual(result.projectRef,envelope.preconnectionId);
+  const rows=await copy(f.stub.snapshot()),added=rows.filter(([key])=>!before.some(([old])=>key===old));
+  const tickets=added.filter(([key])=>key.startsWith('owner-ticket:')).map(([,v])=>typeof v==='string'?JSON.parse(v):v);
+  assert.equal(tickets.length,1);assert.equal(tickets[0].preconnectionId,envelope.preconnectionId,'original capsule selector must remain exact');
+  const snapshots=added.filter(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':source')).map(([,v])=>typeof v==='string'?JSON.parse(v):v);
+  assert.equal(snapshots.length,1);assert.equal(snapshots[0].preconnectionId,envelope.preconnectionId);
+  assert.equal(added.some(([key])=>key.endsWith(':use')||key.endsWith(':connection:approval')),false);
+  assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.restores.length,0,'only existing SYN setup effects');
+ }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-phase-context-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-phase-context-native.test.mjs b/test/mcp-qa-finite-owner-phase-context-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-phase-context-native.test.mjs
@@ -0,0 +1,116 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
+async function world(fn){const f=await initialEntryHarness('phase-context');try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+async function read(f,mode='normal'){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=c.I0+420000-Date.now();try{const start=f.requestMethods.length;const result=await plain(f.stub.phaseContextRead(420000,mode));assert(f.requestMethods.slice(start).every(m=>m==='GET'));assert.equal(await f.stub.ownerEffectCount(),0);return result;}finally{f.nowOffset=0;}}
+test('closed source keeps original A and stable original context',()=>world(async f=>{
+ const before=await plain(f.stub.snapshot()),original=await plain(f.ownerRead()),writes=f.uploads.length+f.activations.length;
+ const result=await read(f);assert.equal(result.fixtureError,undefined,JSON.stringify(result));assert.deepEqual(Object.keys(result).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(validateFiniteOwnerSource(result.source),original.source);assert.equal(result.preconnectionId,original.preconnectionId);assert.equal(result.capsuleHash,original.capsuleHash);
+ assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);
+ const sessions=await plain(f.stub.phasePrimaryReads());assert(sessions.length>=2);for(const queries of sessions)assert.match(queries[0],/^SELECT/i);
+}));
+
+async function seed(f,kind='settled',delta=410000){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=delta===null?0:c.I0+delta-Date.now();try{const result=await plain(f.stub.seedPhaseFacts(kind,delta));assert.equal(result.fixtureError,undefined,JSON.stringify(result));return result;}finally{f.nowOffset=0;}}
+test('original approval and enrollment stay closed without publication',()=>world(async f=>{
+ await seed(f,'enrollment');const before=await plain(f.stub.snapshot()),r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');
+ assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
+ const mutations=await plain(f.stub.phaseEnrollmentMutations());for(const [key,value]of Object.entries(mutations))assert.equal(value,true,key);
+}));
+for(const kind of ['approval','enrollment-no-ack'])test('closed source preserves factual '+kind,()=>world(async f=>{await seed(f,kind);const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');}));
+test('settled first connection derives read_consent from exact primary state',()=>world(async f=>{
+ const original=await plain(f.ownerRead());f.phaseCurrent=await seed(f);const before=await plain(f.stub.snapshot()),writes=f.uploads.length+f.activations.length;
+ const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'read_consent');assert.equal(r.source.currentPublication.receiptHash,f.phaseCurrent.receipt.receiptHash);assert.deepEqual(r.source.initialBaseline,original.source.initialBaseline);assert.deepEqual(r.source.programContext,original.source.programContext);assert.deepEqual(r.source.window,original.source.window);
+ const plan=JSON.parse(before.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]),expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(f.phaseCurrent.configuration,expected);
+ assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');
+}));
+for(const kind of ['upload-send','upload-ack','activation-send'])test('unknown SEND denies even while provider pointer equals original M: '+kind,()=>world(async f=>{
+ await seed(f,kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
+}));
+for(const kind of ['writer-head','orphan-receipt','orphan-ack','contextHash','foreign-A','extra','later-approval','orphan-grant'])test('foreign extra and later stages never become matching phase state: '+kind,()=>world(async f=>{
+ f.phaseCurrent=await seed(f);await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
+}));
+for(const kind of ['missing-backup','missing-receipt','missing-chunk','tamper-backup','tamper-receipt','tamper-chunk','mismatch-receipt-material','mismatch-receipt-manifest','mismatch-receipt-baseline','mismatch-chunk-manifest'])test('retained original backup denies '+kind,()=>world(async f=>{
+ await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
+}));
+for(const fault of ['module','configuration','later','empty-private','placeholder-private'])test('actual current module and profile independently deny '+fault,()=>world(async f=>{
+ f.phaseCurrent=await seed(f);f.phaseFault=fault;assert.equal((await read(f)).status,'unavailable');
+}));
+for(const mode of ['untrusted-parent','holder-drift','parent-deadline','request-abort','wrong-version','transition','head'])test('original retained request cannot be renewed or borrowed: '+mode,()=>world(async f=>{assert.equal((await read(f,mode)).status,'unavailable');assert.equal(await f.stub.ownerEffectCount(),0);}));
+
+for(const prefix of ['reservation','open','authorization','consumed','grant','linked'])test('primary issuer prefixes remain facts not next-stage permission: '+prefix,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);const issuer=await plain(f.stub.seedPhaseIssuer(prefix));assert.equal(issuer.fixtureError,undefined,JSON.stringify(issuer));
+ const before=await plain(f.stub.snapshot()),grants=(await f.db.prepare('SELECT * FROM delegated_access_grants').all()).results,fences=(await f.db.prepare('SELECT * FROM finite_preparation_issuer_fences').all()).results;
+ const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'read_consent');assert.deepEqual(Object.keys(r).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants').all()).results,grants);assert.deepEqual((await f.db.prepare('SELECT * FROM finite_preparation_issuer_fences').all()).results,fences);assert.equal(await f.stub.ownerEffectCount(),0);
+}));
+for(const prefix of ['open_fence','authorization','consume','grant'])test('unknown issuer SEND denies '+prefix,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);const issuer=await plain(f.stub.seedPhaseIssuer('unknown-'+prefix));assert.equal(issuer.fixtureError,undefined,JSON.stringify(issuer));assert.equal((await read(f)).status,'unavailable');
+}));
+test('absent original issuer never triggers a global grant lookup',()=>world(async f=>{
+ f.phaseCurrent=await seed(f);const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));const queries=(await plain(f.stub.phasePrimaryReads())).flat();assert(queries.every(q=>!q.includes('delegated_access_grants')));
+}));
+
+for(const drift of ['revision','owner','configuration','pointer','grant','schema'])test('fresh current owner and current publication are independently rechecked: '+drift,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);if(drift==='grant'){const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));}
+ f.phaseObservation=0;f.phaseDrift=drift;assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseObservation,2);
+}));
+for(const fault of ['terminal-fence','revoked-grant','expired-grant','unknown-ack'])test('original primary issuer denies '+fault,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));
+ if(fault==='terminal-fence')await f.db.prepare("UPDATE finite_preparation_issuer_fences SET fence_request_id='11111111-1111-4111-8111-111111111111',fenced_at=?").bind(Date.now()).run();
+ if(fault==='revoked-grant')await f.db.prepare('UPDATE delegated_access_grants SET revoked_at=?').bind(new Date().toISOString()).run();
+ if(fault==='expired-grant')await f.db.prepare('UPDATE delegated_access_grants SET expires_at=?').bind(new Date().toISOString()).run();
+ if(fault==='unknown-ack')await f.stub.phaseCorrupt('issuer-ack');
+ assert.equal((await read(f)).status,'unavailable');
+}));
+async function waitStat(f,key){for(let i=0;i<200;i++){if((await plain(f.stub.stats()))[key])return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual '+key+' not entered');}
+async function settled(f){for(let i=0;i<200;i++){if((await plain(f.stub.probeStageAvailability())).available)return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual work did not settle');}
+for(const mode of ['held-read','held-fetch','held-body','held-cancel','nested-request-held-read'])test('original retained read blocks foreign root until actual settlement: '+mode,()=>world(async f=>{
+ const before=await plain(f.stub.snapshot()),work=read(f,mode);await waitStat(f,mode==='held-body'?'readHeld':mode==='held-cancel'?'cancelHeld':'held');
+ assert.equal((await work).status,'unavailable');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);assert.equal((await read(f)).status,'unavailable');
+ if(mode==='held-body'){await f.stub.releaseBodyRead();await waitStat(f,'cancelHeld');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);await f.stub.releaseBodyCancel();}
+ else if(mode==='held-cancel')await f.stub.releaseBodyCancel();else await f.stub.release();
+ await settled(f);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.ok((await read(f)).source);
+}));
+test('original retained request with 29 seconds elapsed keeps at most its remaining second',()=>world(async f=>{
+ const started=performance.now();assert.equal((await read(f,'request-budget')).status,'unavailable');assert(performance.now()-started<1500);assert.equal((await plain(f.stub.stats())).held,true);assert.equal((await plain(f.stub.probeStageAvailability())).available,false);await f.stub.release();await settled(f);
+}));
+test('same ambient original request borrows factual scope without a new root',()=>world(async f=>{assert.deepEqual(await read(f,'nested-request'),await read(f));}));
+
+test('absent exact issuer table and empty original prefix remain factual context only',()=>world(async f=>{
+ await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();const closed=await read(f);assert.equal(closed.fixtureError,undefined,JSON.stringify(closed));assert.equal(closed.source.phase,'closed_ui');f.phaseCurrent=await seed(f);const installed=await read(f);assert.equal(installed.fixtureError,undefined,JSON.stringify(installed));assert.equal(installed.source.phase,'read_consent');const queries=(await plain(f.stub.phasePrimaryReads())).flat();assert(queries.some(q=>q.includes('FROM sqlite_schema')));assert(queries.every(q=>!q.includes('delegated_access_grants')&&!q.includes('FROM finite_preparation_issuer_fences')));
+}));
+test('original issuer reservation requires actual exact table',()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('reservation'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();assert.equal((await read(f)).status,'unavailable');
+}));
+test('existing orphan original fence denies without global grant lookup',()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);const r=await plain(f.stub.seedPhaseIssuer('open'));assert.equal(r.fixtureError,undefined,JSON.stringify(r));const rows=await plain(f.stub.snapshot()),original=rows.filter(([k])=>!k.startsWith('afw.finite-preparation-issuer.v1:'));await f.stub.removePhaseIssuerFixture();assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),original);
+}));
+test('failed schema SELECT denies and malformed existing table never falls back',()=>world(async f=>{
+ assert.equal((await read(f,'schema-failure')).status,'unavailable');await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();await f.db.prepare('CREATE TABLE finite_preparation_issuer_fences (preconnection_id TEXT PRIMARY KEY)').run();assert.equal((await read(f)).status,'unavailable');
+}));
+
+for(const prefix of ['snapshot-only','snapshot-map'])test('exact original metadata prefix remains closed without ticket: '+prefix,()=>world(async f=>{await seed(f,prefix);const before=await plain(f.stub.snapshot()),r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');assert.deepEqual(await plain(f.stub.snapshot()),before);}));
+for(const fault of ['orphan-ticket-use','foreign-snapshot','stale-snapshot','later-approval','extra'])test('missing original ticket never relaxes '+fault,()=>world(async f=>{await seed(f,'snapshot-only');await f.stub.phaseCorrupt(fault);assert.equal((await read(f)).status,'unavailable');}));
+
+test('fresh QA pointer drift after the first snapshot denies',()=>world(async f=>{f.phaseCurrent=await seed(f);f.phaseQaObservation=0;f.phaseDrift='qa-pointer';assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseQaObservation,2);}));
+test('actual allocated phase fixture disposes after initialization failure',async()=>{await assert.rejects(initialEntryHarness('phase-context-init-failure'),e=>e.message==='SYN phase fixture initialization failed'&&e.fixtureDisposed===true);});
+
+test('settled original M journals never imply read_consent',()=>world(async f=>{
+ const original=await plain(f.ownerRead());f.phaseCurrent=await seed(f,'settled-original');
+ assert.equal(f.phaseCurrent.receipt.versionId,original.source.initialBaseline.versionId);assert.equal(f.phaseCurrent.receipt.deploymentId,original.source.initialBaseline.deploymentId);
+ assert.equal(f.phaseCurrent.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
+ const before=await plain(f.stub.snapshot()),writes=f.uploads.length+f.activations.length,r=await read(f);
+ assert.equal(r.status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(f.uploads.length+f.activations.length,writes);assert.equal(await f.stub.ownerEffectCount(),0);
+}));
+
+for(const drift of ['revision','owner','configuration','pointer','grant','schema'])test('T3 current snapshots remain complete: '+drift,()=>world(async f=>{
+ f.phaseCurrent=await seed(f,'settled',null);
+ if(drift==='grant'){const r=await plain(f.stub.seedPhaseIssuer('linked'));assert.equal(r.fixtureError,undefined);}
+ f.phaseObservation=0;f.phaseDrift=drift;const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.equal(f.phaseObservation,2,'both real current observations were reached');assert.deepEqual(await plain(f.stub.snapshot()),before,'source observer preserves durable history');
+}));
+test('T3 history is factual not replay authority: historical deadline',{timeout:120000},()=>world(async f=>{
+ f.phaseCurrent=await seed(f);const before=await plain(f.stub.snapshot()),send=before.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':send')).map(([,raw])=>JSON.parse(raw)).find(v=>v.effect==='activation');
+ const c=JSON.parse(before.find(([key])=>key.endsWith(':capsule'))[1]);assert(c.I0+420000>send.deadline,'actual source observation is beyond historical effect deadline');
+ const r=await read(f);assert.equal(r.source?.phase,'read_consent');assert.equal(r.source.currentPublication.receiptHash,f.phaseCurrent.receipt.receiptHash);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-owner-phase-context.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-phase-context.test.mjs b/test/mcp-qa-finite-owner-phase-context.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-phase-context.test.mjs
@@ -0,0 +1,57 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {qualifyFiniteOwnerInstalledStage as stageFacts} from '../lib/mcp-qa-finite-owner-stage-facts.mjs';
+import {qualifyFinitePreparationEnrollmentFacts as enrollmentFacts} from '../lib/mcp-qa-finite-preparation-enrollment-facts.mjs';
+import {hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from '../lib/mcp-qa-finite-preparation-records.mjs';
+const h='a'.repeat(64),rev='b'.repeat(40),uuid=n=>String(n).repeat(8)+'-'+String(n).repeat(4)+'-4'+String(n).repeat(3)+'-8'+String(n).repeat(3)+'-'+String(n).repeat(12);
+const sorted=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
+function fixture(){
+ const source={sourceRevision:rev,actorId:h,qaNamespaceId:'c'.repeat(32),qaVersionId:uuid(1),origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:{teamDomain:'synthetic.cloudflareaccess.com',audience:'SYN'},clientId:'SYN',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',project:{projectId:'SYN',revision:1,synthetic:true},goal:'content',programContext:{programHash:h,sourceRevision:rev,originalContextHash:h},initialBaseline:{versionId:uuid(2),deploymentId:uuid(3),moduleHash:h,configurationHash:h,bindingsHash:h},currentPublication:{stage:null,versionId:uuid(2),deploymentId:uuid(3),receiptHash:null},window:{startedAt:1000,expiresAt:901000}};
+ const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:'SYN-owner'});
+ const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash:h,subjectHash,sourceRevision:rev,projectRef:h,connectionRef:null,preconnectionId:h,action:'connection',createdAt:1100,expiresAt:901000};
+ const approval={purpose:'afw.finite-connection-approval.v1',subjectHash,sourceRevision:rev,projectHash:projectHash(source.project),clientId:source.clientId,approvedAt:1200,expiresAt:901000};
+ approval.csrfReceiptHash=evidence('decision',{ticket,decision:'approve',projectHash:approval.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
+ const preconnection={purpose:'afw.finite-connection-preparation.v1',preconnectionId:h,sourceRevision:rev,actorId:h,owner:{subject:'SYN-owner',accessRealmHash:realm,accessVerifiedAt:1000,accessExpiresAt:901000},project:source.project,clientId:source.clientId,resource:source.resource,startedAt:1200,expiresAt:901000,approvalHash:hash('ConfigurationApproval',approval),baselineHash:evidence('baseline',source.initialBaseline)};
+ preconnection.recordHash=hash('Preconnection',preconnection);
+ const sourceSnapshot={preconnectionId:h,initialTicketHash:h,source};sourceSnapshot.sourceHash=hash('OwnerSourceSnapshot',sourceSnapshot);
+ const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',ticketHash:h,approvalHash:preconnection.approvalHash};
+ const ticketUse={purpose:'afw.finite-owner-ticket-use.v1',ticketHash:h,recordHash:approval.csrfReceiptHash,consumedAt:1200};
+ const contextHash=createHash('sha256').update('afw.finite-connection-context.v1\n'+sorted({preconnection,stageApproval,predecessors:[],grant:null,notice:null})).digest('hex');
+ const send=effect=>({purpose:'afw.finite-connection-send.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',contextHash,effect,baselineVersionId:uuid(2),baselineDeploymentId:uuid(3),requestHash:h,issuedAt:1300,deadline:6300});
+ const uploadSend=send('upload'),activationSend={...send('activation'),issuedAt:1400,deadline:6400};
+ const upload={state:'acknowledged',send:uploadSend,ack:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',uploadSend),resourceId:uuid(4),acknowledgedAt:1350},receipt:null};
+ const receipt={purpose:'afw.finite-connection-installed.v1',preconnectionId:h,sourceRevision:rev,stage:'connection',baselineVersionId:uuid(2),baselineDeploymentId:uuid(3),versionId:uuid(4),deploymentId:uuid(5),moduleHash:h,configurationHash:h,completedAt:1500};receipt.receiptHash=hash('ConnectionReceipt',receipt);
+ const activation={state:'installed',send:activationSend,ack:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',activationSend),resourceId:uuid(5),acknowledgedAt:1450},receipt};
+ return {source,preconnection,sourceSnapshot,initialTicket:ticket,connection:null,stage:'connection',stageApproval,approval,ticket,ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:1600};
+}
+test('pure installed first stage correlates exact original DATA chain',()=>{const f=fixture(),r=stageFacts(f);assert.deepEqual(r,f.activation.receipt);assert(Object.isFrozen(r));assert(!Object.keys(r).some(k=>/permission|callback|authoriz/i.test(k)));});
+for(const [name,mutate] of [
+ ['original A',f=>{f.preconnection.preconnectionId='d'.repeat(64);}],
+ ['subject',f=>{f.ticket.subjectHash='d'.repeat(64);}],
+ ['source',f=>{f.source.sourceRevision='d'.repeat(40);}],
+ ['project',f=>{f.source.project.revision++;}],
+ ['predecessor',f=>{f.activation.receipt.baselineVersionId=uuid(6);}],
+ ['decision',f=>{f.ticketUse.recordHash='d'.repeat(64);}],
+ ['ACK send hash',f=>{f.upload.ack.sendHash='d'.repeat(64);}],
+ ['receipt version',f=>{f.activation.receipt.versionId=uuid(6);}],
+ ['receipt deployment',f=>{f.activation.receipt.deploymentId=uuid(6);}],
+ ['before upload ACK',f=>{f.upload.ack.acknowledgedAt=1501;}],
+ ['before activation ACK',f=>{f.activation.ack.acknowledgedAt=1501;}],
+ ['unknown journal state',f=>{f.upload.state='ready';}],
+ ['unknown key',f=>{f.upload.permission=true;}],
+ ['function',f=>{f.env=()=>{};}],
+ ['expired original',f=>{f.observedAt=901000;}]
+])test('pure stage denies '+name,()=>{const f=fixture();mutate(f);assert.throws(()=>stageFacts(f));});
+test('pure helpers reject accessors, symbols and callback/options without executing them',()=>{
+ let called=0;
+ for(const qualify of [stageFacts,enrollmentFacts]){
+  for(const bad of [{env:()=>{}},{...fixture(),[Symbol('extra')]:1},Object.defineProperty(fixture(),'source',{enumerable:true,get(){called++;}})])assert.throws(()=>qualify(bad));
+ }assert.equal(called,0);
+});
+test('shared predicates never acquire source, store or QA decoder authority',async()=>{
+ for(const path of ['lib/mcp-qa-finite-owner-stage-facts.mjs','lib/mcp-qa-finite-preparation-enrollment-facts.mjs']){
+  const text=await readFile(path,'utf8');assert.doesNotMatch(text,/from ['"].*(?:bootstrap|residency|owner-preparation|preparation-store)(?:\.mjs)?['"]/);assert.doesNotMatch(text,/\b(?:fetch|resolve|stageHistory)\s*\(/);
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-preparation-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-preparation-native.test.mjs b/test/mcp-qa-finite-owner-preparation-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-preparation-native.test.mjs
@@ -0,0 +1,278 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash,randomBytes,randomUUID} from 'node:crypto';
+import {hashFinitePreparationRecord,hashFiniteOwnerPreparationProject,hashFiniteOwnerEvidence} from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+const qaLimiterBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='ratelimit').name;
+const qaVersionBinding=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.type==='version_metadata').name;
+const origin='https://delegated-canary.agentfriendlyweb.dev';
+import {native} from './fixtures/finite-owner-native.mjs';
+
+test('initial owned synthetic selection needs no OAuth grant and uses release primary',async t=>{
+ const f=await native(t),s=await f.screen();
+ assert.match(s.html,/facilitar que encuentren y entiendan el sitio/);assert.doesNotMatch(s.html,/discovery/);assert.match(s.html,/configuración/i);assert.match(s.html,/quince minutos/);assert.match(s.html,/<time datetime=/);assert.doesNotMatch(s.html,/synthetic-owned|synthetic-client/);
+ assert.match(s.handle,/^[a-f0-9]{64}$/);assert.match(s.projectRef,/^[a-f0-9]{64}$/);
+ assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM delegated_access_grants').first()).n,0);
+ assert.ok(f.jwksReads()>0);
+ const rows=await f.json('/fixture/rows',{});
+ assert.equal(rows.filter(([k])=>k.endsWith(':source')).length,1);
+ assert.equal(rows.filter(([k])=>k.startsWith('owner-project-ref:')).length,1);
+ assert.equal(rows.filter(([k])=>k.startsWith('owner-ticket:')).length,1);
+ assert.equal((await f.submit(s)).status,202);
+ const after=await f.json('/fixture/rows',{});
+ assert.equal(after.filter(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':record')).length,1);
+ assert.equal(after.filter(([k])=>k.startsWith('source-selection:')).length,0);
+});
+test('signature audience and current owner are independently checked',async t=>{
+ const f=await native(t);
+ for(const token of ['invalid',await f.jwt('owner','foreign-audience')])assert.equal((await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}})).status,401);
+ assert.equal((await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.jwt('other')}})).status,403);
+});
+test('origin cookie duplicate fields raw IDs and ticket mismatch deny before approval',async t=>{
+ const f=await native(t),s=await f.screen();
+ assert.equal((await f.submit(s,{headers:{Origin:'https://foreign.invalid'}})).status,403);
+ assert.equal((await f.submit(s,{headers:{Cookie:'__Host-afw-finite-prepare='+'f'.repeat(64)}})).status,403);
+ assert.equal((await f.submit(s,{fields:{projectRef:'synthetic-owned'}})).status,400);
+ assert.equal((await f.submit(s,{fields:{handle:'f'.repeat(64)}})).status,403);
+ assert.equal((await f.submit(s,{fields:{project:'synthetic-owned'}})).status,400);
+ assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':record')).length,0);
+});
+for(const field of ['goal','programContext','initialBaseline','window','project','sourceRevision','qaVersionId']){
+ test('displayed initial choice rejects changed '+field,async t=>{
+  const f=await native(t),s=await f.screen();
+  const changes={goal:'content',programContext:{programHash:'e'.repeat(64),sourceRevision:'d'.repeat(40),originalContextHash:'a'.repeat(64)},initialBaseline:{versionId:'22222222-2222-4222-8222-222222222222',deploymentId:'11111111-1111-4111-8111-111111111111',moduleHash:'a'.repeat(64),configurationHash:'a'.repeat(64),bindingsHash:'a'.repeat(64)},window:{startedAt:Date.now(),expiresAt:Date.now()+800000},project:{projectId:'synthetic-owned',revision:2,synthetic:true},sourceRevision:'e'.repeat(40),qaVersionId:'22222222-2222-4222-8222-222222222222'};
+  await f.json('/fixture/source',{[field]:changes[field]});
+  assert.notEqual((await f.submit(s)).status,202);
+  assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.startsWith('connection-approval:')).length,0);
+ });
+}
+for(const mode of ['missing','wrong'])test('missing or wrong release primary cannot fall back '+mode,async t=>{
+ const f=await native(t,mode);assert.equal((await f.call('/connections/finite-prepare')).status,503);
+ assert.equal((await f.json('/fixture/rows',{})).length,0);
+});
+
+const sha=v=>createHash('sha256').update(v).digest('hex');
+const rows=async f=>(await f.json('/fixture/rows',{})).map(([key,value])=>[key,JSON.parse(value)]);
+async function connection(t){
+ const f=await native(t),screen=await f.screen();assert.equal((await f.submit(screen)).status,202);
+ const initial=(await rows(f)).find(([k])=>k.endsWith(':source'))[1].source;
+ const stage=async phase=>f.json('/fixture/source',{phase,currentPublication:{stage:phase==='read_consent'?'connection':'notices',versionId:initial.initialBaseline.versionId,deploymentId:initial.initialBaseline.deploymentId,receiptHash:'f'.repeat(64)}});
+ await stage('read_consent');
+ const handle=randomBytes(32).toString('base64url'),authorizationHash=sha(handle),until=new Date(Date.now()+590000).toISOString();
+ await f.db.prepare('INSERT INTO delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(authorizationHash,'owner','authorize','synthetic-owned','synthetic-client',origin+'/mcp','["afw:project:read","afw:evidence:read"]',until,'').run();
+ const link=(kind,refs,request)=>f.json('/fixture/link',{kind,...refs,...request});
+ const headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:screen.cookie};
+ const authRequest={url:origin+'/authorize?'+new URLSearchParams({client_id:'synthetic-client',resource:origin+'/mcp',project:'synthetic-owned',scope:'afw:project:read afw:evidence:read'}),headers};
+ return {...f,screen,initial,stage,handle,authorizationHash,until,link,headers,authRequest};
+}
+async function granted(t){
+ const f=await connection(t);
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},f.authRequest)).result?.status,'recorded');
+ const at=new Date().toISOString();
+ await f.db.prepare('UPDATE delegated_consent_sessions SET consumed_at=? WHERE handle_hash=?').bind(at,f.authorizationHash).run();
+ for(const [id,created] of [['accepted-grant',at],['later-unrelated-grant',new Date(Date.now()+1).toISOString()]]){
+  await f.db.prepare('INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(id,'owner','synthetic-client','synthetic-owned',origin+'/mcp','["afw:project:read"]',created,f.until,'').run();
+ }
+ const grantRequest={url:origin+'/authorize',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:f.handle,decision:'approve',project:'synthetic-owned',scope:'afw:project:read'}).toString()};
+ assert.equal((await f.link('grant',{grantId:'accepted-grant'},grantRequest)).result?.status,'recorded');
+ return {...f,grantRequest};
+}
+test('exact original authorization and server accepted grant win over newer matching grant',async t=>{
+ const f=await granted(t),stored=await rows(f),grant=stored.find(([k])=>k.endsWith(':grant'))[1];
+ assert.equal(grant.grantId,'accepted-grant');assert.equal(grant.grantHash,sha('accepted-grant'));assert.equal(grant.authorizationHash,f.authorizationHash);
+ assert.equal((await f.link('grant',{grantId:'later-unrelated-grant'},f.grantRequest)).rejected,true);
+ const snapshot=await rows(f);
+ await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='accepted-grant'").bind(new Date().toISOString()).run();
+ assert.equal((await f.link('grant',{grantId:'accepted-grant'},f.grantRequest)).rejected,true);
+ assert.deepEqual(await rows(f),snapshot);
+});
+test('unmapped or unconsumed authorization cannot create a link and reconstructed exact map survives',async t=>{
+ const f=await connection(t),request={url:origin+'/authorize',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:f.handle,decision:'approve',scope:'afw:project:read'}).toString()};
+ assert.equal((await f.link('grant',{grantId:'unmapped'},request)).rejected,true);
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},f.authRequest)).result?.status,'recorded');
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},f.authRequest)).result?.status,'existing');
+ assert.equal((await f.link('grant',{grantId:'unmapped'},request)).rejected,true);
+ assert.equal((await rows(f)).filter(([k])=>k.endsWith(':grant')).length,0);
+});
+test('notice producer rereads exact acknowledged primary event and terminal revocation denies relinking',async t=>{
+ const f=await granted(t);await f.stage('notice_consent');
+ const monitorHandle=randomBytes(32).toString('base64url'),requestId=randomUUID(),at=Date.now(),expires=Math.min(Date.parse(f.until),at+500000);
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(sha(monitorHandle),requestId,'owner','accepted-grant','synthetic-owned','synthetic-client',origin+'/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,at,expires,expires).run();
+ const ack=await f.json('/fixture/monitoring',{requestId,action:'grant',expectedSequence:0,expiresAt:expires});
+ assert.equal(ack.status,200);assert.equal(ack.eventHash,undefined);
+ const request={url:origin+'/monitoring/grant',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.screen.cookie+'; __Host-afw-monitoring-owner='+monitorHandle},body:'handle='+monitorHandle};
+ assert.equal((await f.link('notice',{requestId,sequence:ack.sequence+1},request)).rejected,true);
+ assert.equal((await f.link('notice',{requestId,sequence:ack.sequence},request)).result?.status,'recorded');
+ const snapshot=await rows(f),notice=snapshot.find(([k])=>k.endsWith(':notice'))[1];
+ assert.equal(notice.sequence,ack.sequence);assert.equal(notice.grantHash,sha('accepted-grant'));assert.match(notice.eventHash,/^[a-f0-9]{64}$/);
+ const revoked=await f.json('/fixture/monitoring',{requestId:randomUUID(),action:'revoke',expectedSequence:ack.sequence,expiresAt:Date.now()});
+ assert.equal(revoked.status,200);
+ assert.equal((await f.link('notice',{requestId,sequence:ack.sequence},request)).rejected,true);
+ assert.deepEqual(await rows(f),snapshot);
+});
+test('expired original parent cannot record authorization or reconstruct a new lease',async t=>{
+ const f=await connection(t);
+ assert.equal((await f.json('/fixture/link',{kind:'authorization',authorizationHash:f.authorizationHash,...f.authRequest,expired:true})).rejected,true);
+ assert.equal((await rows(f)).filter(([k])=>k.startsWith('connection-authorization:')).length,0);
+});
+
+test('factual selected preparation without actual stage receipts and audit cannot become qualified',async t=>{
+ const f=await granted(t);await f.stage('notice_consent');
+ const monitorHandle=randomBytes(32).toString('base64url'),requestId=randomUUID(),at=Date.now(),expires=Math.min(Date.parse(f.until),at+580000);
+ await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(sha(monitorHandle),requestId,'owner','accepted-grant','synthetic-owned','synthetic-client',origin+'/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,at,expires,expires).run();
+ const ack=await f.json('/fixture/monitoring',{requestId,action:'grant',expectedSequence:0,expiresAt:expires});
+ const request={url:origin+'/monitoring/grant',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.screen.cookie+'; __Host-afw-monitoring-owner='+monitorHandle},body:'handle='+monitorHandle};
+ assert.equal((await f.link('notice',{requestId,sequence:ack.sequence},request)).result?.status,'recorded');
+ const saved=await rows(f),pre=saved.find(([k])=>k.endsWith(':record'))[1],approval=saved.find(([k])=>k.startsWith('connection-approval:'))[1],notice=saved.find(([k])=>k.endsWith(':notice'))[1];
+ const raw=await f.db.prepare('SELECT * FROM delegated_consent_sessions WHERE handle_hash=?').bind(f.authorizationHash).first();
+ const consentHash=hashFiniteOwnerEvidence('consent',{handle_hash:raw.handle_hash,user_id:raw.user_id,kind:raw.kind,project_id:raw.project_id,client_id:raw.client_id,resource:raw.resource,scopes:JSON.parse(raw.scopes_json),expires_at:raw.expires_at,consumed_at:raw.consumed_at});
+ const now=Date.now(),relation=saved.find(([k])=>k.endsWith(':connection'))?.[1];
+ assert.ok(relation,'actual genuine grant producer must supply the exact next-stage relation');
+ const connectionRef=relation.connectionRef,map=saved.find(([k])=>k==='owner-connection-ref:'+connectionRef)?.[1];
+ assert.equal(map?.grantId,'accepted-grant');
+ const prep={purpose:'afw.finite-owner-preparation.v1',prepId:pre.preconnectionId,sourceRevision:pre.sourceRevision,actorId:pre.actorId,selectedAt:now,expiresAt:pre.expiresAt,commandBy:expires-510000,owner:pre.owner,connection:{connectionRef,grantId:'accepted-grant',clientId:'synthetic-client',resource:origin+'/mcp',grantHash:sha('accepted-grant'),consentHash,noticesHash:notice.eventHash,permissionExpiresAt:expires},project:pre.project,goal:'discovery',programContext:f.initial.programContext,approval:{purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:pre.sourceRevision,projectHash:hashFiniteOwnerPreparationProject(pre.project),goal:'discovery',approvedAt:approval.approvedAt,expiresAt:approval.expiresAt,csrfReceiptHash:approval.csrfReceiptHash},auditHash:'a'.repeat(64)};
+ prep.preparationHash=hashFinitePreparationRecord('OwnerPreparation',prep);
+ const selection={purpose:'afw.finite-owner-selection.v1',sourceRevision:pre.sourceRevision,prepId:pre.preconnectionId,preparationHash:prep.preparationHash,selectedAt:now,sequence:1,previousSelectionHash:null};
+ selection.selectionHash=hashFinitePreparationRecord('Selection',selection);
+ assert.equal((await f.json('/fixture/store',{method:'publishSelection',arg:{preparation:prep,selection,expectedHeadHash:null}})).result?.status,'recorded');
+ await f.json('/fixture/source',{phase:'finite_prearm',currentPublication:{stage:'finite',versionId:f.initial.initialBaseline.versionId,deploymentId:f.initial.initialBaseline.deploymentId,receiptHash:'e'.repeat(64)}});
+ const found=await f.json('/fixture/read',{sourceRevision:pre.sourceRevision});
+ assert.equal(found.rejected,true);
+ await f.json('/fixture/source',{sourceRevision:'e'.repeat(40)});
+ assert.equal((await f.json('/fixture/read',{sourceRevision:pre.sourceRevision})).rejected,true);
+ await f.json('/fixture/source',{sourceRevision:pre.sourceRevision});
+ await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='accepted-grant'").bind(new Date().toISOString()).run();
+ assert.equal((await f.json('/fixture/read',{sourceRevision:pre.sourceRevision})).rejected,true);
+});
+
+test('same-origin SDK-approved POST can map exact unconsumed transaction when initial GET omitted preparation cookie',async t=>{
+ const f=await connection(t);
+ const post={url:origin+'/authorize',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:f.handle,decision:'approve',scope:'afw:project:read',project:'synthetic-owned'}).toString()};
+ assert.equal((await f.link('authorization',{authorizationHash:sha('wrong-handle')},post)).rejected,true);
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},post)).result?.status,'recorded');
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},post)).result?.status,'existing');
+ assert.equal((await rows(f)).filter(([k])=>k.startsWith('connection-authorization:')).length,1);
+});
+
+test('lost original snapshot acknowledgement returns no handle and preserves committed native facts',async t=>{
+ const f=await native(t),result=await f.call('/connections/finite-prepare',{headers:{'X-Fixture-Lose-Ack':'true'}});
+ assert.equal(result.status,503);assert.equal(result.headers.get('Set-Cookie'),null);assert.doesNotMatch(await result.text(),/name="handle"/);
+ const stored=await rows(f);assert.equal(stored.filter(([k])=>k.endsWith(':source')).length,1);
+ assert.equal(stored.filter(([k])=>k.startsWith('owner-ticket:')||k.startsWith('connection-approval:')).length,0);
+});
+test('unqualified product source and forwarding constructors remain unavailable despite caller DTOs',async()=>{
+ const source=await import('../lib/mcp-qa-finite-owner-source.mjs');
+ for(const name of ['readPrivateQaFiniteOwnerSource','forwardPrivateQaFiniteOwnerAuthorization','forwardPrivateQaFiniteOwnerGrant','forwardPrivateQaFiniteOwnerNotice']){
+  assert.throws(()=>source[name]({ctx:{},env:{enabled:true,verified:true},sourceRevision:'b'.repeat(40),identity:{subject:'owner'}},{signal:new AbortController().signal,assertCurrent(){}}),/unavailable/);
+ }
+});
+
+test('the same verified Access expiration remains a fence across asynchronous primary preparation',async t=>{
+ const f=await native(t);await f.json('/fixture/delay',{atCall:5,ms:2200});
+ const token=await f.jwt('owner','finite-owner',Math.floor(Date.now()/1000)+2);
+ const result=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});
+ const delay=await f.json('/fixture/delay-state',{});
+ assert.equal(delay.fired,true,'the native source delay must occur after signature verification');
+ assert.equal((await rows(f)).length,0,'expired proof cannot append even an initial source snapshot');
+ assert.equal(result.status,401);
+ assert.equal(result.headers.get('Set-Cookie'),null);
+});
+
+async function pairFixture(t){
+ const f=await connection(t),pre=(await rows(f)).find(([k])=>k.endsWith(':record'))[1],at=Date.now();
+ const grant={preconnectionId:pre.preconnectionId,authorizationHash:f.authorizationHash,grantId:'paired-grant',grantHash:sha('paired-grant'),acceptedAt:at};
+ assert.equal((await f.json('/fixture/store',{method:'putLink',arg:{kind:'grant',record:grant}})).result?.status,'recorded');
+ const make=()=>{const linkedAt=Date.now(),connectionRef=randomBytes(32).toString('hex');return {relation:{preconnectionId:pre.preconnectionId,connectionRef,grantHash:grant.grantHash,linkedAt},connection:{connectionRef,subject:pre.owner.subject,grantId:grant.grantId,clientId:pre.clientId,projectId:pre.project.projectId,resource:pre.resource,issuedAt:linkedAt,expiresAt:pre.expiresAt}};};
+ return {...f,pre,make};
+}
+test('native relation transaction accepts one competing pair without orphan connection maps',async t=>{
+ const f=await pairFixture(t),a=f.make(),b=f.make();
+ const results=await Promise.all([a,b].map(arg=>f.json('/fixture/store',{method:'putPreconnectionConnection',arg})));
+ assert.equal(results.filter(r=>r.result?.status==='recorded').length,1);
+ assert.equal(results.filter(r=>r.rejected).length,1);
+ const stored=await rows(f),relation=stored.find(([k])=>k.endsWith(':connection'))[1];
+ assert.ok([a.relation.connectionRef,b.relation.connectionRef].includes(relation.connectionRef));
+ assert.equal(stored.filter(([k])=>k.startsWith('owner-connection-ref:')).length,1);
+ assert.equal(stored.find(([k])=>k==='owner-connection-ref:'+relation.connectionRef)[1].grantId,'paired-grant');
+});
+test('native pair lost ACK preserves one exact retrievable relation and idempotent reconstruction',async t=>{
+ const f=await pairFixture(t),arg=f.make();
+ const lost=await f.json('/fixture/store',{method:'putPreconnectionConnection',arg,loseAck:true});
+ assert.equal(lost.result?.status,'uncertain');
+ const relation=await f.json('/fixture/store',{method:'readPreconnectionConnection',arg:{preconnectionId:f.pre.preconnectionId}});
+ assert.deepEqual(relation.result?.record,arg.relation);
+ const before=await rows(f);
+ assert.equal((await f.json('/fixture/store',{method:'putPreconnectionConnection',arg})).result?.status,'existing');
+ assert.deepEqual(await rows(f),before);
+ assert.equal((await f.json('/fixture/store',{method:'putPreconnectionConnection',arg:f.make()})).rejected,true);
+ assert.deepEqual(await rows(f),before);
+});
+test('pre-existing GrantLink without a pair is not a new allocation opportunity',async t=>{
+ const f=await connection(t),at=new Date().toISOString(),pre=(await rows(f)).find(([k])=>k.endsWith(':record'))[1];
+ assert.equal((await f.link('authorization',{authorizationHash:f.authorizationHash},f.authRequest)).result?.status,'recorded');
+ await f.db.prepare('UPDATE delegated_consent_sessions SET consumed_at=? WHERE handle_hash=?').bind(at,f.authorizationHash).run();
+ await f.db.prepare('INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at) VALUES(?,?,?,?,?,?,?,?,?)').bind('accepted-grant','owner','synthetic-client','synthetic-owned',origin+'/mcp','["afw:project:read"]',at,f.until,'').run();
+ await f.json('/fixture/store',{method:'putLink',arg:{kind:'grant',record:{preconnectionId:pre.preconnectionId,authorizationHash:f.authorizationHash,grantId:'accepted-grant',grantHash:sha('accepted-grant'),acceptedAt:Date.now()}}});
+ const request={url:origin+'/authorize',headers:{...f.headers,Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:f.handle,decision:'approve',scope:'afw:project:read'}).toString()};
+ const result=await f.link('grant',{grantId:'accepted-grant'},request);
+ assert.equal(result.result?.status,'uncertain');
+ assert.equal((await rows(f)).filter(([k])=>k.endsWith(':connection')||k.startsWith('owner-connection-ref:')).length,0);
+});
+
+for(const mode of ['before','after'])test('child timeout '+mode+' native transaction settles without reviving its captured deadline',async t=>{
+ const f=await connection(t),secondHash=sha(randomBytes(32).toString('base64url'));
+ await f.db.prepare('INSERT INTO delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(secondHash,'owner','authorize','synthetic-owned','synthetic-client',origin+'/mcp','["afw:project:read"]',f.until,'').run();
+ const result=await f.json('/fixture/held-child',{mode,authorizationHash:f.authorizationHash,secondHash,...f.authRequest});
+ assert.equal(result.hookRejected,true);
+ assert.equal(result.parentAlive,true);
+ assert.equal(result.transactions,2);
+ assert.equal(result.consumed,true);
+ assert.equal(result.grantActive,true);
+ assert.equal(result.committedBeforeRelease,mode==='after');
+ assert.equal(result.secondStatus,'recorded');
+ assert.equal(result.secondPresent,true);
+ assert.equal(result.firstPresent,mode==='after',mode==='before'?'expired child must not append after original consent consumption':'timeout must preserve already-committed uncertain facts');
+});
+
+test('accepted qaLive profile version and limiter bindings alone qualify actual owner source',async t=>{
+ assert.equal(qaVersionBinding,'AFW_QA_VERSION');
+ assert.equal(qaLimiterBinding,'AFW_QA_OCCURRENCE_RATE_LIMITER');
+ const f=await native(t,'normal',qaVersionBinding,qaLimiterBinding),s=await f.screen();
+ assert.match(s.handle,/^[a-f0-9]{64}$/);
+ assert.equal((await f.submit(s)).status,202);
+});
+test('obsolete QA_VERSION alone cannot qualify actual owner source',async t=>{
+ const f=await native(t,'normal','QA_VERSION');
+ assert.equal((await f.call('/connections/finite-prepare')).status,503);
+ assert.deepEqual(await f.json('/fixture/rows',{}),[]);
+});
+
+test('canary DELEGATED_RATE_LIMITER alone cannot qualify private QA owner preparation',async t=>{
+ const f=await native(t,'normal',qaVersionBinding,'DELEGATED_RATE_LIMITER');
+ assert.equal((await f.call('/connections/finite-prepare')).status,503);
+ assert.deepEqual(await f.json('/fixture/rows',{}),[]);
+});
+
+test('Task3 stage approval is immutable exact lookup over actual original owner decision',async t=>{
+ const f=await native(t),s=await f.screen();assert.equal((await f.submit(s)).status,202);
+ const all=await rows(f),pre=all.find(([k])=>k.endsWith(':record'))[1],snapshot=all.find(([k])=>k.endsWith(':source'))[1];
+ const record={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:pre.preconnectionId,sourceRevision:pre.sourceRevision,stage:'connection',ticketHash:snapshot.initialTicketHash,approvalHash:pre.approvalHash};
+ const put=arg=>f.json('/fixture/store',{method:'putStageApproval',arg});
+ assert.equal((await put(record)).result?.status,'existing');
+ assert.equal((await put(record)).result?.status,'existing');
+ const got=await f.json('/fixture/store',{method:'readStageApproval',arg:{preconnectionId:pre.preconnectionId,stage:'connection'}});
+ assert.deepEqual(got.result,{status:'observed',record});
+ for(const change of [{stage:'notices'},{sourceRevision:'e'.repeat(40)},{ticketHash:'e'.repeat(64)},{approvalHash:'e'.repeat(64)},{preconnectionId:'e'.repeat(64)}]){
+  assert.equal((await put({...record,...change})).rejected,true);
+ }
+ assert.equal((await f.json('/fixture/store',{method:'readStageApproval',arg:{preconnectionId:pre.preconnectionId,stage:'notices'}})).result?.status,'absent');
+});
+
+for(const mode of ['original','wrong','finished'])test('Task3 source admission consumed once by '+mode+' original request lease',async t=>{
+ const f=await native(t),s=await f.screen();
+ const r=await f.json('/fixture/admission',{url:origin+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:s.cookie},body:new URLSearchParams({handle:s.handle,projectRef:s.projectRef,decision:'approve'}).toString(),wrong:mode==='wrong',finish:mode==='finished'});
+ assert.equal(r.deadlineBound,true);assert.equal(r.cloneDenied,true);assert.equal(r.finishedDenied,true);
+ assert.equal(r.prepared,true);assert.equal(r.first,mode==='original');assert.equal(r.qualified,mode==='original');assert.equal(r.second,false);assert.equal(r.wrong,false);assert.equal(r.expired,true);
+ const stored=await rows(f);assert.equal(stored.filter(([k])=>k.endsWith(':connection:approval')).length,1);
+ assert.notEqual((await f.submit(s)).status,202);
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-qa-sdk-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
@@ -0,0 +1,391 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+
+// Missing-feature RED is deliberately separate from a native pending-operation
+// RED: absence of these modules does not claim that an SDK call was entered.
+async function feature(path,names){
+ const m=await import(path).catch(error=>{if(error.code==='ERR_MODULE_NOT_FOUND'&&error.message.includes(path.split('/').at(-1)))return {};throw error;});
+ for(const name of names)assert.equal(typeof m[name],'function','missing D0.2 helper: '+name);
+ return m;
+}
+test('D0.2 local resolved result has a strict domain and rejects the removed reported ACK',async()=>{
+ const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await feature('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs',['sealFiniteOwnerIssuerProvenanceRecord','encodeFiniteOwnerIssuerProvenanceRecord','decodeFiniteOwnerIssuerProvenanceRecord']);
+ const input={purpose:'afw.finite-owner-sdk-observed.v1',sendHash:'a'.repeat(64),resultHash:'b'.repeat(64),observedAt:100,outcome:'resolved'};
+ const record=seal('SdkObserved',input),raw=encode('SdkObserved',record);
+ assert.deepEqual(decode('SdkObserved',raw),record);
+ for(const extra of [{reported:true},{code:'never durable'},{operation:'sdk_complete'},{outcome:'reported'}])assert.throws(()=>seal('SdkObserved',{...input,...extra}));
+ assert.throws(()=>seal('SdkAck',input));
+ assert.throws(()=>decode('SdkObserved',raw+' '));
+ assert.throws(()=>seal('SdkObserved',Object.defineProperty({...input},'resultHash',{enumerable:true,get(){throw Error('accessor ran');}})),error=>!error.message.includes('accessor ran'));
+});
+test('D0.2 fixed original authorization grammar denies old result paths and payloads',async()=>{
+ const {qualifyFiniteOwnerOAuthRequest:qualify}=await feature('../lib/mcp-qa-finite-owner-oauth-wire.mjs',['qualifyFiniteOwnerOAuthRequest']);
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ const url=origin+'/authorize?client_id=c&redirect_uri=https%3A%2F%2Fclient.example%2Fcb&response_type=code&resource='+encodeURIComponent(origin+'/mcp')+'&scope=afw%3Aproject%3Aread&state=s&code_challenge='+'a'.repeat(43)+'&code_challenge_method=S256';
+ const get=new Request(url);assert.equal(qualify(get,new Uint8Array()).method,'GET');
+ for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'])assert.throws(()=>qualify(new Request(origin+path),new Uint8Array()));
+ assert.throws(()=>qualify(new Request(url+'&resultHash='+'b'.repeat(64)),new Uint8Array()));
+ assert.throws(()=>qualify(new Request(url+'&client_id=c'),new Uint8Array()));
+ const headers={Origin:origin,'Content-Type':'application/x-www-form-urlencoded'};
+ const post=new Request(origin+'/authorize',{method:'POST',headers});
+ const form='handle='+'a'.repeat(43)+'&decision=approve&scope=afw%3Aproject%3Aread';
+ assert.equal(qualify(post,new TextEncoder().encode(form)).method,'POST');
+ for(const suffix of ['&sdkCompleted=true','&resultHash=x','&decision=approve'])assert.throws(()=>qualify(post,new TextEncoder().encode(form+suffix)));
+ assert.throws(()=>qualify(post,new Uint8Array(16385)));
+});
+
+test('strict local provenance records preserve exact bounded DATA-only fields',async()=>{
+ const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await import('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs');
+ const h='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111',I0=1000;
+ const values={
+  Root:{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:h,capsuleHash:h,enrollmentHash:h,sourceRevision:'a'.repeat(40),actorId:h,qaVersionId:uuid,mVersionId:uuid,originalConnectionReceiptHash:h,I0,C0:I0+900000,C1:I0+1080000,createdAt:I0},
+  SdkSend:{purpose:'afw.finite-owner-sdk-send.v1',rootHash:h,operation:'sdk_begin',originalRequestId:uuid,originalRequestHash:h,issuedAt:I0,deadline:I0+30000,bindingHash:h},
+  ExpectedGrant:{purpose:'afw.finite-owner-expected-grant.v1',rootHash:h,identityHash:h,reservationHash:h,authorizationHash:h,grantId:uuid,approvedRequestHash:h,scopes:['afw:project:read'],createdAt:'2026-11-05T00:00:00.000Z',expiresAt:'2026-11-05T00:01:00.000Z'}
+ };
+ for(const [kind,value]of Object.entries(values)){
+  const sealed=seal(kind,value),raw=encode(kind,sealed);assert.deepEqual(decode(kind,raw),sealed);
+  for(const bad of [{...value,extra:true},{...value,[Symbol('unknown')]:true},Object.assign(Object.create({}),value),Object.defineProperty({...value},'purpose',{enumerable:true,get(){throw Error('executed accessor');}})])assert.throws(()=>seal(kind,bad),e=>!e.message.includes('executed accessor'));
+  assert.throws(()=>decode(kind,raw+' '));assert.throws(()=>decode(kind,' '.repeat(16385)));
+ }
+ assert.throws(()=>seal('Root',{...values.Root,C0:values.Root.C0+1}));
+ assert.throws(()=>seal('SdkSend',{...values.SdkSend,operation:'sdk-completed'}));
+ assert.throws(()=>seal('SdkSend',{...values.SdkSend,deadline:I0+30001}));
+ assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,grantId:'substitute'}));
+ assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,scopes:['afw:write']}));
+});
+
+test('legacy pair predicate rejects expiry with its original 503 status',async()=>{
+ const {qualifyFiniteOwnerConnectionPair:qualify}=await import('../lib/mcp-qa-finite-owner-approved-ticket-facts.mjs');
+ const {createHash}=await import('node:crypto'),h='a'.repeat(64),ref='b'.repeat(64),grantId='11111111-1111-4111-8111-111111111111',grantHash=createHash('sha256').update(grantId).digest('hex'),resource='https://delegated-canary.agentfriendlyweb.dev/mcp';
+ const value={source:{clientId:'client',resource,project:{projectId:'project'}},identity:{subject:'owner'},pre:{preconnectionId:h,expiresAt:2000,owner:{accessExpiresAt:2000}},link:{grantHash,acceptedAt:1000},grant:{grantId,expiresAt:'1970-01-01T00:00:02.000Z'},relation:{preconnectionId:h,connectionRef:ref,grantHash,linkedAt:1000},connection:{connectionRef:ref,subject:'owner',grantId,clientId:'client',projectId:'project',resource,issuedAt:1000,expiresAt:2000},observedAt:1500};
+ assert.doesNotThrow(()=>qualify(value));
+ assert.throws(()=>qualify({...value,observedAt:2000}),error=>error.status===503);
+});
+
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function world(fn,{observed=true,restart=false,io=false}={}){
+ const f=await initialEntryHarness(io?'phase-context-sdk-io':'phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent');
+  f.source=context.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
+  f.timings={};f.get=async extra=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:{...f.headers,...extra}});}finally{f.timings.get=Date.now()-start;}};
+  f.post=async (form,extra={})=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+form.cookie,...extra},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});}finally{f.timings.post=Date.now()-start;}};
+  f.history=await plain(f.stub.sdkGrants());
+  if(observed){await f.stub.sdkConfigure();await f.stub.sdkPrimaryObserve();}
+  await fn(f);
+  const after=await plain(f.stub.sdkGrants());
+  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'original historical D1 grant unchanged');
+ }finally{if(io){await f.stub.ioRelease('all');await ioWait(f,s=>s.active===0);}await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+async function consent(f){
+ const response=await f.get();assert.equal(response.status,200);
+ const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+ const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);
+ assert.equal(await plain(f.stub.sdkGrant(reservation.identity.grantId)),null);
+ return {handle,cookie,identity:reservation.identity};
+}
+async function status(p){const r=await p;await r.body?.cancel();return r.status;}
+async function observe(f){return plain(f.stub.sdkObservation());}
+async function held(f){for(let n=0;n<200;n++){const state=await observe(f);if(state.held)return state;await new Promise(r=>setTimeout(r,20));}assert.fail('actual SDK KV hold did not enter');}
+function has(s,suffix){return s.rows.some(([key])=>key.endsWith(suffix));}
+async function oldPaths(f,form={handle:'a'.repeat(43),cookie:'SYN'}){
+ const before=await observe(f),rows=await plain(f.stub.snapshot()),grants=await plain(f.stub.sdkGrants());
+ for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve']){
+  assert.equal(await f.stub.sdkOldPath(path,{...f.headers,Cookie:PREP+'; '+form.cookie},JSON.stringify({handle:form.handle,resultHash:'a'.repeat(64),sdkCompleted:true})),404);
+  assert.equal(await status(f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'resultHash='+ 'b'.repeat(64)})),503);
+ }
+ assert.deepEqual(await plain(f.stub.snapshot()),rows);assert.deepEqual(await plain(f.stub.sdkGrants()),grants);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
+}
+async function issued(f,form,response){
+ assert.equal(response.status,302);const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);
+ const app=await plain(f.stub.sdkGrant(form.identity.grantId));
+ assert.equal(app.id,form.identity.grantId);assert.equal(app.revoked_at,'');
+ const [subject,sdkId]=code.split(':'),kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk'),grant=await kv.get('grant:'+subject+':'+sdkId,{type:'json'});
+ assert(grant,'M fixture alias observes actual SDK grant');assert.equal(grant.userId,form.identity.subject);assert.equal(grant.clientId,form.identity.clientId);assert.equal(grant.resource,form.identity.resource);assert.deepEqual(grant.scope,['afw:project:read']);assert(grant.encryptedProps);assert(grant.authCodeId);
+ assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
+ const final=await observe(f);assert(has(final,'sdk_complete:observed'));assert.equal(final.rows.length,8);
+ const journal=await plain(f.stub.snapshot()),read=suffix=>JSON.parse(journal.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))[1]),consume=read(':consume:send'),ack=read(':grant:ack');assert(ack.observedAt<consume.deadline);console.info('D02 native timing',JSON.stringify({...f.timings,consumeSendToGrantAckMs:ack.observedAt-consume.issuedAt,childRemainingAtGrantAckMs:consume.deadline-ack.observedAt,consumeIssuedAt:consume.issuedAt,grantAckObservedAt:ack.observedAt,mockedProviderGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='provider'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length,mockedLedgerGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='ledger'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length}));
+ return {app,code,sdkId,grant};
+}
+test('uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code',()=>world(async f=>{
+ await oldPaths(f);
+ const form=await consent(f),racing=await Promise.all([f.post(form),f.post(form)]);assert.deepEqual(racing.map(r=>r.status).sort(),[302,503]);const winner=await issued(f,form,racing.find(r=>r.status===302));await racing.find(r=>r.status===503).body?.cancel();
+ const before=await plain(f.stub.snapshot());
+ assert.equal(await status(f.post(form)),503);assert.equal(await status(f.get()),503);
+ assert.deepEqual(await plain(f.stub.snapshot()),before);
+ assert.deepEqual(await plain(f.stub.sdkGrant(form.identity.grantId)),winner.app);
+ assert.equal((await observe(f)).calls.length,0,'positive uses unwrapped native KV methods');
+},{observed:false}));
+test('held actual approve denies fabricated results and concurrent complete bearer replay; one original winner',()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);
+ let s=await held(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
+ assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
+ await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ await f.stub.sdkReleaseHeld();await issued(f,form,await pending);
+ s=await observe(f);assert(s.calls.some(c=>c.method==='get'&&c.prefix==='transaction'));assert(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').every(c=>c.actualGrantAck));assert.equal(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').length,1);assert.equal(s.calls.filter(c=>c.method==='list').length,0);assert(s.calls.every(c=>c.method==='get'&&['client','transaction'].includes(c.prefix)||c.method==='put'&&c.prefix==='grant'||c.method==='delete'&&c.prefix==='transaction'),'no other SDK grant/token mutation');
+ for(const p of s.probes.filter(p=>p.strictUnavailable!==undefined))assert.equal(p.strictUnavailable,true,'strict public reader denied same ambient unresolved SEND');
+ for(const op of ['consume','grant'])assert(s.probes.some(p=>p.kind==='issuer'&&p.op===op&&p.strictUnavailable));for(const op of ['sdk_approve','sdk_complete'])assert(s.probes.some(p=>p.kind==='sdk'&&p.op===op&&p.strictUnavailable));
+ const consumed=s.probes.find(p=>p.kind==='consumption');assert(consumed.sameStore&&consumed.sameChild);assert(consumed.windowMs<=5000&&consumed.remainingMs>0);
+ const writes=[];let readCount=0;for(const session of s.primary){assert.equal(session.constraint,'first-primary');if(session.queries.length>1){assert.equal(session.queries.length,8,'exact unchanged Unit2a preflight');assert.equal(session.queries[0],"SELECT type,name,sql FROM sqlite_schema WHERE tbl_name='finite_preparation_issuer_fences' AND type IN ('table','trigger') ORDER BY type,name");assert.match(session.queries[1],/^SELECT CAST\(unixepoch\('subsec'\)\*1000 AS INTEGER\) AS ms,/);for(const [index,table]of [[2,'delegated_consent_sessions'],[3,'delegated_access_grants'],[4,'site_projects']])assert(session.queries[index].startsWith('SELECT ')&&session.queries[index].endsWith(' FROM '+table+' LIMIT 0'));assert.deepEqual(session.queries.slice(5),['PRAGMA table_info(delegated_consent_sessions)','PRAGMA table_info(delegated_access_grants)','PRAGMA table_info(site_projects)']);continue;}const sql=session.queries[0];if(/^SELECT\b/i.test(sql)){readCount++;continue;}assert.match(sql,/^WITH q\(preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,/);assert(sql.includes("n(ms) AS (SELECT CAST(unixepoch('subsec')*1000 AS INTEGER))"));const kind=['INSERT INTO finite_preparation_issuer_fences','INSERT INTO delegated_consent_sessions','UPDATE delegated_consent_sessions AS c SET consumed_at=','INSERT INTO delegated_access_grants'].find(k=>sql.includes(k));assert(kind,'only exact original Unit2a atomic writer');writes.push(kind);}assert(readCount>20);assert.equal(new Set(writes).size,4);assert.equal(writes.length,4);
+}));
+test('missing actual SDK binding cookie denies copied public form before original consume',()=>world(async f=>{
+ const form=await consent(f);assert.equal(await status(f.post(form,{Cookie:PREP})),503);
+ const s=await observe(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
+ assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
+ assert.equal(await status(f.post(form)),503,'unknown approve claim cannot be retried with later credentials');
+}));
+test('stale actual native KV transaction remains unavailable and cannot allocate another attempt',()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('stale');assert.equal(await status(f.post(form)),503);
+ const before=await observe(f);assert(has(before,'sdk_approve:send'));assert(!has(before,'sdk_approve:observed'));assert.equal(await status(f.post(form)),503);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
+}));
+test('real KV client miss/error, wrong actual alias profile and missing holder deny before SDK claim',()=>world(async f=>{
+ const original=await plain(f.stub.snapshot());
+ for(const fault of ['sdk-alias','sdk-extra','qa-module']){f.ownerFault=fault;assert.equal(await status(f.get()),503,fault);assert.deepEqual(await plain(f.stub.snapshot()),original);}f.ownerFault=null;
+ await f.stub.sdkAliasAbsent(true);assert.equal(await status(f.get()),503);await f.stub.sdkAliasAbsent(false);
+ for(const mode of ['miss','error']){await f.stub.sdkConfigure(mode);assert.equal(await status(f.get()),503,mode);assert.deepEqual(await plain(f.stub.snapshot()),original);assert.equal((await observe(f)).rows.length,0);}
+}));
+test('actual begin native abort retains SDK uncertainty; late resolution creates no reservation or form',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ assert(!has(await observe(f),'sdk_begin:observed'));await status(f.mf.dispatchFetch(f.source.origin+'/fixture/abort'));
+ assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
+ assert.equal(await status(f.get()),503);await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
+ const s=await observe(f);assert(!has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+ assert.equal(await status(f.get()),503,'unresolved original begin SEND never reissues');
+}));
+test('actual begin holder replacement while pending denies actual settled result',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);await f.stub.sdkReplaceHolder();await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);
+ assert(!has(await observe(f),'sdk_begin:observed'));assert.equal(await status(f.get()),503);
+}));
+test('held actual complete times out at original parent; late KV settlement and actor restart cannot ACK or reissue',{timeout:55000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-put');const start=Date.now(),pending=f.post(form);
+ const s=await held(f);assert(has(s,'sdk_complete:send'));assert(!has(s,'sdk_complete:observed'));assert(s.calls.some(c=>c.prefix==='grant'&&c.actualGrantAck));
+ await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
+ assert.equal(await status(pending),503);assert(Date.now()-start<32000);assert.equal((await observe(f)).held,true);
+ const frozen=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
+ assert.deepEqual(await plain(f.stub.snapshot()),frozen);assert(!has(await observe(f),'sdk_complete:observed'));
+ await f.restart();assert.equal(await status(f.post(form)),503);assert.deepEqual(await plain(f.stub.snapshot()),frozen);
+},{restart:true}));
+test('29 seconds of actual original request lifetime leaves at most one second for held SDK begin',{timeout:42000},()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');await status(f.mf.dispatchFetch(f.source.origin+'/fixture/elapsed'));const start=Date.now(),pending=f.get();
+ const response=await pending;assert.equal(response.status,503);await response.body?.cancel();assert(Date.now()-start<32000);
+ const s=await observe(f);if(s.held){assert(!has(s,'sdk_begin:observed'));await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));}
+ assert(!has(await observe(f),'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+
+for(const boundary of ['controller','root-finish','dispatch-signal'])test('abort boundary diagnostic '+boundary,{timeout:45000},()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const control=new AbortController(),pending=(boundary==='dispatch-signal'?f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:f.headers,signal:control.signal}):f.get()).then(async r=>({status:await status(Promise.resolve(r))}),()=>({rejected:true}));
+ await held(f);
+ if(boundary==='dispatch-signal')control.abort();else await status(f.mf.dispatchFetch(f.source.origin+(boundary==='controller'?'/fixture/abort':'/fixture/abort-root')));
+ await new Promise(r=>setTimeout(r,100));
+ const before=await observe(f),m=await (await f.mf.dispatchFetch(f.source.origin+'/fixture/signal-state')).json();
+ await f.stub.sdkReleaseHeld();const response=await pending;await new Promise(r=>setTimeout(r,100));const after=await observe(f);
+ for(const key of ['incomingEntryAborted','incomingAbortObserved','rootAbortObserved','rootEntryAborted','outgoingEntryAborted','outgoingAbortObserved'])assert.equal(typeof m[key],'boolean','missing actual signal observation '+key);
+ if(boundary!=='dispatch-signal'||m.incomingAbortObserved){assert.equal(m.rootAbortObserved,true);assert.equal(m.outgoingAbortObserved,true);assert.equal(before.signals.abortObserved,true);assert.equal(before.leaseSignals.abortObserved,true);assert.equal(after.leaseSignals.sdkSettledAborted,true);assert.equal(has(after,'sdk_begin:observed'),false,'actual native QA abort must deny late observed ACK');}
+ console.info('D02 abort boundary diagnostic',JSON.stringify({boundary,sender:m,qaBefore:before.signals,qaLeaseBefore:before.leaseSignals,qaAfter:after.signals,qaLeaseAfter:after.leaseSignals,response,lateObserved:has(after,'sdk_begin:observed'),profiles:f.sdkProfiles}));
+}));
+
+for(const snapshot of ['first','second'])test('actual current publication drift denies owned SDK result at '+snapshot+' observation',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(snapshot==='first')f.phaseFault='configuration';else{f.phaseObservation=0;f.phaseDrift='configuration';}
+ await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+test('actual verified owner expiry during held SDK begin cannot extend original access',()=>world(async f=>{
+ f.headers['Cf-Access-Jwt-Assertion']=await f.enrollmentToken(f.source,Math.floor(Date.now()/1000)+8);
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
+ await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));assert(!has(await observe(f),'sdk_begin:observed'));
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+
+for(const fault of ['sdk-extra','sdk-observed','issuer-extra','policy-send','backup','module','pointer','owner-revision'])test('owned begin recheck rejects actual foreign delta '+fault,()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(['sdk-extra','sdk-observed','issuer-extra','policy-send'].includes(fault))await f.stub.sdkCorrupt(fault);
+ else if(fault==='backup')await f.stub.phaseCorrupt('tamper-backup');
+ else if(fault==='module')f.phaseFault='module';
+ else {f.phaseObservation=0;f.phaseDrift=fault==='pointer'?'pointer':'revision';}
+ const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before,'actual SDK result cannot adopt foreign ledger facts');
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation')));
+}));
+for(const fault of ['issuer-freeze','issuer-ack'])test('owned approve recheck rejects original issuer '+fault,()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);await held(f);
+ if(fault==='issuer-freeze')await f.stub.sdkCorrupt(fault);else await f.stub.phaseCorrupt(fault);
+ const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);assert(!has(await observe(f),'sdk_approve:observed'));
+}));
+for(const snapshot of ['first','second'])test('owned recheck still requires original CLOSED configuration in '+snapshot+' snapshot',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(snapshot==='first')f.ownerFault='original-open';else{f.phaseObservation=0;f.phaseDrift='original-open';}
+ await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
+}));
+test('absent original issuer schema denies handler before any actual SDK lookup or claim',()=>world(async f=>{
+ await f.stub.sdkCorrupt('absent-schema');assert.equal(await status(f.get()),503);const s=await observe(f);assert.equal(s.calls.length,0);assert.equal(s.rows.length,0);
+}));
+for(const operation of ['open','grant'])test('actual handler original child cannot authorize SQL queued beyond five seconds: '+operation,{timeout:35000},()=>world(async f=>{
+ const form=operation==='grant'?await consent(f):null;
+ await f.stub.sdkConfigure('queue-'+operation);
+ assert.equal(await status(form?f.post(form):f.get()),503);
+ let s;for(let n=0;n<100;n++){s=await observe(f);if(s.queue?.returned)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal(s.queue?.entered,true);assert.equal(s.queue?.returned,true);assert.equal(s.queue?.rowAbsent,true,'original SQL clock rejected actual delayed execution');
+ assert(!has(s,'sdk_complete:send'));
+ if(form){assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k.endsWith(':consume:ack')));assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack')));}
+ else {assert(has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.endsWith(':authorization:ack')));}
+ const beforeCalls=s.calls.length;assert.equal(await status(form?f.post(form):f.get()),503);assert.equal((await observe(f)).calls.length,beforeCalls,'incomplete first GET/POST never restarts SDK');
+}));
+
+
+async function fanoutMetrics(f,form,response,{peak}){
+ const state=await plain(f.stub.ioObservation()),rows=await plain(f.stub.snapshot());
+ const read=suffix=>{const raw=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))?.[1];return raw?JSON.parse(raw):null;};
+ const send=read(':consume:send'),ack=read(':grant:ack'),child=state.child;
+ const full=child?state.rows.slice(child.first,child.last):[];
+ const narrow=send&&ack?full.filter(r=>r.startedAt>=send.issuedAt&&r.startedAt<=ack.observedAt):[];
+ const counts={};for(const row of full)counts[row.category]=(counts[row.category]??0)+1;
+ console.info('fanout actual lifecycle',JSON.stringify({status:response.status,peak:state.peak,active:state.active,child,elapsed:child?child.endMono-child.startMono:null,tail:child&&ack?child.endedAt-ack.observedAt:null,full:full.length,narrow:narrow.length,counts,sql:state.sql,delayMinimum:f.ioWaits?.length?Math.min(...f.ioWaits):0,sendPresent:!!send,ackPresent:!!ack}));
+ assert.equal(response.status,302,'genuine original POST must issue code before original child expiry');
+ assert(child);assert(child.endMono-child.startMono<5000);assert(child.endedAt<child.deadline);
+ assert.equal(full.length,112);assert.equal(narrow.length,84);
+ assert.deepEqual(counts,Object.fromEntries(['verify-reader','verify-publisher','qa-deployment','qa-version','m-deployment','m-initial-version','m-current-version'].map(k=>[k,16])));
+ assert.deepEqual(state.sql,{factual:128,preflight:16,writes:2});
+ assert.equal(state.peak,peak);assert.equal(state.active,0);assert.deepEqual(state.same,{child:true,store:true});assertIoOrder(state.rows);
+ assert(full.every(r=>r.outcome==='fulfilled'&&r.endMono>=r.cancelSettledAt&&r.cancelSettledAt>=r.cancelStartedAt&&r.bytes>0));
+ if(f.ioDelay)assert(f.ioWaits.every(ms=>ms>=50));
+ await issued(f,form,response);
+ assert.equal((await observe(f)).calls.length,0,'I/O-only mode leaves actual SDK KV unwrapped');
+ assert.equal((await observe(f)).probes.length,0,'I/O-only mode never probes source');
+ return state;
+}
+test('fanout causal control delay0 preserves complete native child and original reads',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+test('fanout 50ms preserves original five second child and actual grant',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();f.ioDelay=50;
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+test('fanout fixed two overlaps real request lifecycles',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+
+
+async function ioWait(f,predicate){
+ for(let n=0;n<400;n++){const s=await plain(f.stub.ioObservation());if(!s||predicate(s))return s;await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.fail('native I/O barrier did not settle within 8s');
+}
+function assertIoOrder(rows){
+ let priorEnd=0;
+ for(const snapshot of [...new Set(rows.map(r=>r.snapshot))]){
+  const group=rows.filter(r=>r.snapshot===snapshot),by=k=>group.find(r=>r.category===k);
+  assert.equal(group.length,7,'all original reads in each complete primary');
+  const reader=by('verify-reader'),publisher=by('verify-publisher'),qa=by('qa-deployment'),m=by('m-deployment');
+  assert(Math.min(reader.startMono,publisher.startMono)>=priorEnd,'no primary snapshot overlap');
+  assert(Math.min(qa.startMono,m.startMono)>=Math.max(reader.endMono,publisher.endMono),'both credentials fully settled before descriptors');
+  assert(by('qa-version').startMono>=qa.endMono);
+  assert(by('m-initial-version').startMono>=m.endMono);
+  assert(by('m-current-version').startMono>=by('m-initial-version').endMono);
+  priorEnd=Math.max(...group.map(r=>r.endMono));
+ }
+ const events=rows.flatMap(r=>[[r.startMono,1],[r.endMono,-1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);let active=0;
+ // Native workerd timestamps can tie; strict positive intervals carry the peak
+ // assertion separately from the in-lifecycle increment/decrement counter.
+ for(const [,delta]of events){active+=delta;assert(active<=2,'physical body/cancel concurrency bound');}
+}
+async function ioDeny(f,response){
+ assert.equal(response.status,503);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Location'),null);
+ const s=await observe(f);assert.equal(s.rows.length,0,'no actual SDK operation/receipt');assert.equal(s.calls.length,0);assert.equal(s.probes.length,0);
+ assert.equal((await plain(f.stub.sdkGrants())).length,f.history.length,'no new grant');
+ const rows=await plain(f.stub.snapshot());assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')),'no issuer SEND or ACK');
+}
+async function ioPhysicalRelease(f,{replace=false}={}){
+ const held=await ioWait(f,s=>s.held?.phase==='body');assert.equal(held.active,1);
+ assert.deepEqual(await plain(f.stub.ioProbe()),{allowed:false},'original native request remains occupied');
+ if(replace)await f.stub.sdkReplaceHolder();
+ await f.stub.ioRelease('body');
+ const cancelling=await ioWait(f,s=>s.held?.phase==='cancel');assert.equal(cancelling.active,1);
+ assert.deepEqual(await plain(f.stub.ioProbe()),{allowed:false},'cancellation Promise retains occupancy');
+ await f.stub.ioRelease('cancel');
+ const done=await ioWait(f,s=>s.active===0);assert(done.rows.some(r=>r.cancelReleasedAt>=r.cancelHeldAt));assert(done.peak<=2);
+ for(let n=0;n<100;n++){if((await plain(f.stub.ioProbe())).allowed)return done;await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.fail('native request did not release after actual physical settlement');
+}
+for(const [fail,hold]of [['verify-reader','verify-publisher'],['verify-publisher','verify-reader'],['qa-deployment','m-deployment'],['m-deployment','qa-version']]){
+ test('fanout failed '+fail+' retains sibling actual body and cancellation',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({fail,hold});const pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+  await ioDeny(f,await pending);const failed=await plain(f.stub.ioObservation());assert.equal(failed.snapshots,1);assert.equal(failed.peak,2);
+  if(fail.startsWith('verify-'))assert(failed.rows.every(r=>r.branch==='credentials'),'no descriptors after credential failure');
+  await ioPhysicalRelease(f);
+  const done=await plain(f.stub.ioObservation());assert.equal(done.snapshots,1,'failed join never starts next snapshot');
+  console.info('fanout retained failure',JSON.stringify({fail,hold,activeAtDenial:failed.active,settled:done.active,peak:done.peak,categories:done.rows.map(r=>r.category)}));
+ },{observed:false,io:true}));
+}
+for(const boundary of ['controller','root-finish']){
+ test('fanout native '+boundary+' abort retains actual body and cancel',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({hold:'qa-version'});const pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+  await status(f.mf.dispatchFetch(f.source.origin+(boundary==='controller'?'/fixture/abort':'/fixture/abort-root')));
+  await ioDeny(f,await pending);assert.equal((await plain(f.stub.ioObservation())).parentAborted,true,'accepted actual native QA boundary received abort');
+  await ioPhysicalRelease(f);
+  assert.equal((await observe(f)).rows.length,0,'no late SDK receipt');
+ },{observed:false,io:true}));
+}
+test('fanout sibling beyond original child cannot renew its deadline',{timeout:60000},()=>world(async f=>{
+ await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+ await ioDeny(f,await pending);const elapsed=performance.now()-start;assert(elapsed>=4900&&elapsed<15000);
+ await ioPhysicalRelease(f);assert.equal((await plain(f.stub.ioObservation())).snapshots,1);
+ console.info('fanout native sibling expiry',JSON.stringify({elapsed,renewed:false}));
+},{observed:false,io:true}));
+for(const checkpoint of ['joined-before-consumption','after-first','between'])for(const drift of ['owner','pointer','module','configuration']){
+ test('fanout '+drift+' drift at causal '+checkpoint+' denies at original following checkpoint',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({checkpoint});const pending=f.get();const at=await ioWait(f,s=>s.checkpointHeld===checkpoint);
+  if(checkpoint==='joined-before-consumption'){assert.deepEqual(at.branches,{qa:'settled',m:'settled'});assert.equal(at.active,0);}
+  if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();
+  if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+  if(drift==='module')f.phaseFault='module';
+  if(drift==='configuration')f.phaseFault='configuration';
+  await f.stub.ioRelease('checkpoint');await ioDeny(f,await pending);
+  const s=await ioWait(f,s=>s.active===0);assert(s.snapshots<=2);assert(s.peak<=2);
+ },{observed:false,io:true}));
+}
+
+test('fanout completed sibling cannot hide live holder replacement',{timeout:60000},()=>world(async f=>{
+ await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();
+ await ioWait(f,s=>s.held?.phase==='body'&&s.rows.some(r=>r.category==='verify-reader'&&r.outcome==='fulfilled'));
+ await f.stub.sdkReplaceHolder();await f.stub.ioRelease('body');
+ await ioWait(f,s=>s.held?.phase==='cancel');assert(performance.now()-start<4500,'replacement precedes original child expiry');
+ await f.stub.ioRelease('cancel');await ioDeny(f,await pending);
+ const s=await ioWait(f,s=>s.active===0);assert.equal(s.snapshots,1);assert.equal(s.peak,2);
+},{observed:false,io:true}));
+
+
+for(const drift of ['owner','pointer','module','configuration']){
+ test('fanout pending branch '+drift+' drift before original fact read denies',{timeout:60000},()=>world(async f=>{
+  const category=['owner','pointer'].includes(drift)?'m-deployment':'m-current-version';
+  await f.stub.ioConfigure({checkpoint:'before-join',pendingCategory:category});const pending=f.get();
+  try{
+   const at=await ioWait(f,s=>s.checkpointHeld==='before-join'),row=at.rows.find(r=>r.snapshot===1&&r.category===category);
+   console.info('fanout pending branch barrier',JSON.stringify({drift,category,branches:at.branches,fetchStarted:row?.fetchStarted,outcome:row?.outcome,active:at.active,snapshot:at.snapshots}));
+   assert.equal(at.branches.m,'pending','original M branch must still be unfinished at mutation barrier');
+   assert(row,'actual affected request callback entered');assert.equal(row.fetchStarted,false,'mutated fact has not yet been fetched');
+   assert.equal(row.outcome,'pending');assert.equal(row.endMono,undefined);assert.equal(at.snapshots,1);assert(at.active>=1&&at.peak<=2);
+   if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();
+   if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+   if(drift==='module')f.phaseFault='module';
+   if(drift==='configuration')f.phaseFault='configuration';
+   await f.stub.ioRelease('checkpoint');await ioDeny(f,await pending);
+   const done=await ioWait(f,s=>s.active===0),read=done.rows.find(r=>r.snapshot===1&&r.category===category);
+   assert.equal(read.fetchStarted,true);assert(read.cancelSettledAt<=read.endMono);assert.equal(done.branches.m,'settled');assert(done.snapshots<=2&&done.peak<=2);
+   console.info('fanout pending branch denial',JSON.stringify({drift,status:503,active:done.active,branches:done.branches,snapshots:done.snapshots,peak:done.peak}));
+  }finally{
+   await f.stub.ioRelease('all');
+   await pending.then(async response=>{if(response.body&&!response.body.locked)await response.body.cancel();},()=>{});
+  }
+ },{observed:false,io:true}));
+}

~~~~~~~~~~

## test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
@@ -0,0 +1,301 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {decodeFinitePreparationIssuerRecord} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+const plain=async p=>{const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v?.[Symbol.dispose]?.();}};
+async function world(fn,{late=false}={}){
+ const f=await initialEntryHarness('phase-context-sdk-token'+(late?'-late':''));
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined);
+  f.source=(await plain(f.stub.sdkReadCurrent())).source;assert.equal(f.source?.phase,'read_consent');
+  f.headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.history=await plain(f.stub.sdkGrants());f.kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk');
+  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
+  const configured=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(configured.status,204);
+  f.get=()=>f.mf.dispatchFetch(f.source.origin+'/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'}),{redirect:'manual',headers:f.headers});
+  f.post=form=>f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+form.cookie},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});
+  await fn(f);
+  const after=await plain(f.stub.sdkGrants());assert.equal(after.length,f.history.length+1,'only the original newly issued application grant');
+  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'historical grant unchanged');
+ }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+async function consent(f){
+ const r=await f.get();assert.equal(r.status,200);const html=await r.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=r.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
+ const rows=await plain(f.stub.snapshot()),identity=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity;
+ assert.equal(await plain(f.stub.sdkGrant(identity.grantId)),null);
+ return {handle,cookie,identity};
+}
+async function issued(f){
+ const form=await consent(f),r=await f.post(form);assert.equal(r.status,302);
+ const code=new URL(r.headers.get('Location')).searchParams.get('code');assert.equal(typeof code,'string');
+ const [subject,id]=code.split(':'),key='grant:'+subject+':'+id,grant=await f.kv.get(key,{type:'json'});
+ assert(grant);const props=await readSyntheticIssuedGrantProps(code,grant);
+ assert.deepEqual(props,{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
+ const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert.equal(app.revoked_at,'');
+ return {form,code,key,grant,props,app};
+}
+async function exchange(f,x,patch={}){
+ return f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:x.code,code_verifier:f.verifier,...patch})});
+}
+async function readSummary(f,token){
+ const client=new Client({name:'SYN-native-D03',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{
+  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
+  const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence'],'events disabled');
+  return await client.callTool({name:'read_project_summary',arguments:{}});
+ }finally{await client.close();}
+}
+test('valid actual QA code exchanges through actual M bounded response and actual MCP original permission',()=>world(async f=>{
+ const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');assert.equal(Object.hasOwn(payload,'refresh_token'),false);
+ assert(payload.expires_in>0&&payload.expires_in<=300);assert(payload.expires_in<=Math.floor((Date.parse(x.app.expires_at)-Date.now())/1000)+1);
+ assert.equal(r.headers.get('Cache-Control'),'no-store');
+ const summary=await readSummary(f,payload.access_token);assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,x.app.project_id);
+ assert.notEqual(await plain(f.stub.sdkGrant(x.app.id)).then(v=>v.exchanged_at),'');
+ for(const path of ['/oauth/register','/connections','/authorize/ordinary']){const closed=await f.mf.dispatchFetch(f.source.origin+path);assert.equal(closed.status,404);await closed.body?.cancel();}
+ console.info('D03 valid bounded exchange',JSON.stringify({expiresIn:payload.expires_in,refresh:false,originalProject:true,events:false,profiles:f.sdkProfiles}));
+}));
+
+/** Explicit SYN SDK-format corruption of this QA-issued code's own encrypted
+ * grant; same SDK family, native KV and original application UUID. No issuer,
+ * token response or callback is replaced. The key stays transient in memory. */
+async function corruptProps(f,x,change){
+ const wrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',wrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(x.code));
+ const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
+ const key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['encrypt','decrypt']);
+ const props={...x.props};change(props);
+ const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
+ await f.kv.put(x.key,JSON.stringify({...x.grant,encryptedProps:Buffer.from(encrypted).toString('base64')}));
+}
+
+/** SYN negative identity in the ACTUAL SDK code grammar. Preserve this family's
+ * SDK id and original app UUID; rewrap its actual key for the changed code.
+ * This is a corrupted negative fixture, never QA's positive issuance. */
+async function corruptSdkSubject(f,x){
+ const constant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',constant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const derive=async code=>crypto.subtle.importKey('raw',await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code)),{name:'AES-KW'},false,['wrapKey','unwrapKey']);
+ const originalWrapping=await derive(x.code),key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),originalWrapping,{name:'AES-KW'},{name:'AES-GCM'},true,['encrypt','decrypt']);
+ const [,id,secret]=x.code.split(':'),subject='SYN-foreign',code=subject+':'+id+':'+secret,newWrapping=await derive(code);
+ const props={...x.props,userId:subject},encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
+ const grant={...x.grant,userId:subject,authCodeId:createHash('sha256').update(code).digest('hex'),authCodeWrappedKey:Buffer.from(await crypto.subtle.wrapKey('raw',key,newWrapping,{name:'AES-KW'})).toString('base64'),encryptedProps:Buffer.from(encrypted).toString('base64')};
+ assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),props,'actual SDK key/props format remains valid');
+ await f.kv.delete(x.key);const newKey='grant:'+subject+':'+id;await f.kv.put(newKey,JSON.stringify(grant));
+ x.code=code;x.key=newKey;x.grant=grant;
+}
+
+async function rawMcp(f,token){
+ const r=await f.mf.dispatchFetch(f.source.resource,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Accept:'application/json, text/event-stream',Host:new URL(f.source.origin).host},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'read_project_summary',arguments:{}}})});
+ const body=await r.text();let result;try{result=JSON.parse(body);}catch{/* Actual M human failure page has no JSON result. */}
+ return {status:r.status,result,mediaType:r.headers.get('Content-Type'),format:/^data:/m.test(body)?'sse':result?'json':'other'};
+}
+for(const field of ['userId','projectId'])for(const kind of ['missing','wrong'])test('SYN SDK-format '+kind+' redundant '+field+' denies actual token exchange',()=>world(async f=>{
+ const x=await issued(f);await corruptProps(f,x,props=>{if(kind==='missing')delete props[field];else props[field]='SYN-foreign';});
+ const r=await exchange(f,x),tokenStatus=r.status;
+ if(r.ok){
+  const payload=await r.json(),mcp=await rawMcp(f,payload.access_token);
+  console.info('D03 redundant tuple causal RED',JSON.stringify({field,kind,tokenStatus,mcpStatus:mcp.status,mcpCode:mcp.result?.result?.structuredContent?.code??null}));
+ }else{const error=await r.json();assert.equal(error.error,'invalid_grant');}
+ assert.equal(tokenStatus,400,'exact redundant tuple must deny before consumeExchange');
+ const app=await plain(f.stub.sdkGrant(x.app.id));assert.equal(app.exchanged_at,'');
+}));
+
+async function deniedExchange(f,x,patch={},expected){
+ const r=await exchange(f,x,patch),status=r.status;let error;
+ const body=await r.text();try{error=JSON.parse(body).error;}catch{/* Keep the actual non-JSON denial status. */}
+ assert([400,401,503].includes(status),'actual OAuth route must deny');if(expected)assert.equal(error,expected);
+ console.info('D03 denial stage',JSON.stringify({case:f.negative,tokenStatus:status,oauthError:error}));
+ return error;
+}
+for(const fault of ['pkce','client','resource','namespace','missing-app','wrong-app','sdk-subject','owner','native-project','granted-scope','requested-scope','consumed-exchange'])test('actual original QA code negative '+fault,()=>world(async f=>{
+ const x=await issued(f);f.negative=fault;
+ let patch={};
+ if(fault==='pkce')patch={code_verifier:'wrong'.repeat(16)};
+ if(fault==='client')patch={client_id:'SYN-other-client'};
+ if(fault==='resource')patch={resource:'https://foreign.example/mcp'};
+ if(fault==='namespace'){
+  const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-namespace',{method:'POST'});assert.equal(r.status,204);
+ }
+ if(fault==='missing-app'||fault==='wrong-app')await corruptProps(f,x,p=>{if(fault==='missing-app')delete p.applicationGrantId;else p.applicationGrantId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';});
+ if(fault==='sdk-subject')await corruptSdkSubject(f,x);
+ if(fault==='owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
+ if(fault==='native-project')await f.db.prepare('UPDATE delegated_access_grants SET project_id=? WHERE id=?').bind('SYN-foreign',x.app.id).run();
+ if(fault==='granted-scope')await f.kv.put(x.key,JSON.stringify({...x.grant,scope:['afw:project:read','afw:evidence:read']}));
+ if(fault==='requested-scope')patch={scope:'afw:evidence:read'}; // SDK downscopes a mixed request to read; evidence-only is genuinely outside this grant.
+ if(fault==='consumed-exchange')await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(new Date().toISOString(),x.app.id).run();
+ await deniedExchange(f,x,patch);
+ const row=await plain(f.stub.sdkGrant(x.app.id));assert.equal(row.revoked_at,'');if(fault!=='consumed-exchange')assert.equal(row.exchanged_at,'','denial did not consume original application exchange');
+}));
+test('real code reuse denies without a second application grant; SDK family behavior is separate',()=>world(async f=>{
+ const x=await issued(f),first=await exchange(f,x);assert.equal(first.status,200);const payload=await first.json();
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ const before=await plain(f.stub.sdkGrant(x.app.id));f.negative='code-reuse';await deniedExchange(f,x);
+ assert.deepEqual(await plain(f.stub.sdkGrant(x.app.id)),before);
+ const after=await rawMcp(f,payload.access_token);console.info('D03 actual vendor reuse family',JSON.stringify({mcpStatus:after.status,code:after.result?.result?.structuredContent?.code??null,originalApplicationUnchanged:true}));
+}));
+for(const reduction of ['revoke','expire'])test('actual original '+reduction+' before token denies actual callback',()=>world(async f=>{
+ const x=await issued(f);f.negative=reduction;
+ if(reduction==='revoke'){const r=await plain(f.stub.sdkReduceOriginal());assert.equal(r.fence,'fenced');assert.equal(r.activeAfterFence,true,'fence alone did not revoke the active row');assert.equal(r.reduction,'revoked');}
+ else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
+ await deniedExchange(f,x,{},'invalid_grant');
+ assert.equal((await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,'');
+}));
+for(const reduction of ['revoke','expire'])test('otherwise valid actual token loses actual MCP permission after original '+reduction,()=>world(async f=>{
+ const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ if(reduction==='revoke'){const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.fence,'fenced');assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.reduction,'revoked');}
+ else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
+ const carrier=await rawMcp(f,payload.access_token);assert.equal(carrier.status,200,'SDK cryptography still accepted; permission is checked separately');
+ console.info('D03 actual permission carrier',JSON.stringify({reduction,http:carrier.status,mediaType:carrier.mediaType,format:carrier.format}));
+ const denied=await readSummary(f,payload.access_token);assert.equal(denied.isError,true);assert.equal(denied.structuredContent.code,'delegated_access_denied');assert.equal(denied.structuredContent.data,undefined);
+ console.info('D03 actual permission reduction',JSON.stringify({reduction,code:denied.structuredContent.code}));
+}));
+test('held actual SDK completion settles late after original terminal fence and real grant reduction',{timeout:45000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-put');const pending=f.post(form);
+ let held=false;for(let n=0;n<1000;n++){const s=await plain(f.stub.sdkObservation());if(s.held){held=true;assert(s.rows.some(([k])=>k.endsWith('sdk_complete:send')));assert(!s.rows.some(([k])=>k.endsWith('sdk_complete:observed')));break;}await new Promise(r=>setTimeout(r,20));}
+ assert.equal(held,true);const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert(app);assert.equal(app.revoked_at,'');
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable','active original grant with actual sdk_complete SEND and no OBSERVED remains pending before reduction/release');
+ const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.fence,'fenced');assert.equal(reduced.reduction,'revoked');
+ await f.stub.sdkReleaseHeld();const response=await pending;assert.equal(response.status,503);await response.body?.cancel();
+ let code;for(let n=0;n<100;n++){code=await f.stub.sdkTakeLateCode();if(code)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal(typeof code,'string','observe only actual SDK complete result, transiently');
+ f.negative='late-completion-after-terminal-reduction';await deniedExchange(f,{code},{},'invalid_grant');
+ const after=await plain(f.stub.sdkObservation());assert(!after.rows.some(([k])=>k.endsWith('sdk_complete:observed')));
+ assert.notEqual((await plain(f.stub.sdkGrant(app.id))).revoked_at,'');
+ console.info('D03 late completion',JSON.stringify({actualSdkSettled:true,applicationRevoked:true,tokenDenied:true,physicalKvDrain:'not-proven'}));
+},{late:true}));
+
+test('SYN reduction of original issued expiry clamps actual token response below SDK default',()=>world(async f=>{
+ const x=await issued(f),expiresAt=new Date(Date.now()+90000).toISOString();
+ // Labelled timestamp reduction on this original already-issued native row.
+ await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(expiresAt,x.app.id).run();
+ const r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert(payload.expires_in>0&&payload.expires_in<=90);assert.equal(Object.hasOwn(payload,'refresh_token'),false);
+ assert(payload.expires_in<=Math.floor((Date.parse(expiresAt)-Date.now())/1000)+1);
+ assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
+ console.info('D03 reduced original expiry bound',JSON.stringify({expiresIn:payload.expires_in,refresh:false,actualClock:true}));
+}));
+
+
+async function d04Read(f,x){
+ const current=await plain(f.stub.sdkReadCurrent());
+ assert.deepEqual(Object.keys(current).sort(),['capsuleHash','preconnectionId','source']);
+ assert.equal(current.source.phase,'read_consent');
+ assert.equal(current.preconnectionId,x.form.identity.preconnectionId);
+ assert.equal(current.source.project.projectId,x.app.project_id);
+ return current;
+}
+async function d04Journals(f){
+ return initialHash('afw.finite-d04-test-do-snapshot.v1',await plain(f.stub.snapshot()));
+}
+async function d04Ack(f,x){
+ const rows=await plain(f.stub.snapshot()),key='afw.finite-preparation-issuer.v1:'+x.form.identity.preconnectionId+':grant:ack';
+ const raw=rows.find(([k])=>k===key)?.[1];assert.equal(typeof raw,'string');
+ const ack=decodeFinitePreparationIssuerRecord('Ack',raw);
+ return {rows:initialHash('afw.finite-d04-test-do-snapshot.v1',rows),key,raw,ack};
+}
+async function d04Exchanged(f){
+ const x=await issued(f),before=await d04Read(f,x),original=await d04Ack(f,x);
+ assert.equal(x.app.exchanged_at,'');
+ assert.equal(original.ack.rowHash,initialHash('afw.finite-preparation-issuer-row.v1',x.app));
+ const r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
+ assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');
+ assert.equal(Object.hasOwn(payload,'refresh_token'),false);assert.equal(r.headers.get('Cache-Control'),'no-store');
+ assert(payload.expires_in>0&&payload.expires_in<=300);
+ assert(payload.expires_in<=Math.floor((Date.parse(x.app.expires_at)-Date.now())/1000)+1);
+ const summary=await readSummary(f,payload.access_token);assert.equal(summary.isError,undefined);
+ assert.equal(summary.structuredContent.data.id,x.app.project_id);
+ const current=await plain(f.stub.sdkGrant(x.app.id));assert.notEqual(current.exchanged_at,'');
+ assert.equal(initialHash('afw.finite-preparation-issuer-row.v1',{...current,exchanged_at:''}),initialHash('afw.finite-preparation-issuer-row.v1',x.app),'real token only changed original exchanged_at');
+ assert.notEqual(initialHash('afw.finite-preparation-issuer-row.v1',current),original.ack.rowHash);
+ assert.equal(initialHash('afw.finite-preparation-issuer-row.v1',{...current,exchanged_at:''}),original.ack.rowHash);
+ assert.equal(await d04Journals(f),original.rows,'token/MCP leave DO journals and raw ACK bytes unchanged');
+ assert.equal((await plain(f.stub.sdkGrants())).filter(row=>!f.history.some(old=>old.id===row.id)).map(row=>row.id).join(),x.app.id);
+ console.info('D04 actual exchange prerequisites',JSON.stringify({preTokenReader:true,actualToken:200,actualMcpOriginalProject:true,originalAppOnly:true,currentHashDifferent:true,historicalHashMatches:true,ackUnchanged:true}));
+ return {x,before,original,current};
+}
+test('D04 actual exchange retains factual read_consent and immutable grant ACK',()=>world(async f=>{
+ const {x,before,original}=await d04Exchanged(f);
+ const after=await d04Read(f,x);assert.equal(initialHash('afw.finite-d04-test-reader.v1',after),initialHash('afw.finite-d04-test-reader.v1',before));
+ assert.equal(await d04Journals(f),original.rows,'reader also leaves original raw ACK/recordHash and every DO journal unchanged');
+}));
+
+/** SYN negative-only native changes follow the genuine QA -> M -> MCP flow.
+ * A stable valid timestamp is current field data, never new exchange authority. */
+for(const fault of ['blob-type','numeric-text','invalid-text','noncanonical','future','before-created','expiry','after-expiry'])test('D04 actual exchange then SYN invalid exchanged_at '+fault,()=>world(async f=>{
+ const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
+ const created=Date.parse(current.created_at),expiry=Date.parse(current.expires_at),now=Date.now();
+ let value;
+ if(fault==='blob-type')value=new Uint8Array([1,2,3]);
+ if(fault==='numeric-text')value=42; // SQLite TEXT affinity; invalid canonical time after native storage.
+ if(fault==='invalid-text')value='SYN-invalid-time';
+ if(fault==='noncanonical')value=current.exchanged_at.replace('.'+current.exchanged_at.split('.')[1],'Z');
+ if(fault==='future'){assert(now+60000<expiry);value=new Date(now+60000).toISOString();}
+ if(fault==='before-created'){assert(created-1<now&&created-1<expiry);value=new Date(created-1).toISOString();}
+ if(fault==='expiry')value=current.expires_at;
+ if(fault==='after-expiry')value=new Date(expiry+1).toISOString();
+ // Under this active grant, expiry/expiry+1 also fail no-future; no predicate isolation claimed.
+ assert(now<expiry);
+ await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,x.app.id).run();
+ if(fault==='blob-type')assert.equal(typeof (await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,'object');
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ assert.equal(await d04Journals(f),original.rows);
+}));
+
+test('D04 actual exchange then SYN inclusive created_at remains factual only',()=>world(async f=>{
+ const {x,before,original,current}=await d04Exchanged(f);await d04Read(f,x);
+ assert(Date.parse(current.created_at)<=Date.now()&&Date.parse(current.created_at)<Date.parse(current.expires_at));
+ await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(current.created_at,x.app.id).run();
+ assert.equal(initialHash('afw.finite-d04-test-reader.v1',await d04Read(f,x)),initialHash('afw.finite-d04-test-reader.v1',before));
+ assert.equal(await d04Journals(f),original.rows);
+}));
+
+for(const field of ['id','user_id','client_id','project_id','resource','scopes_json','created_at','expires_at','revoked_at','current-owner','current-revision'])test('D04 actual exchange then SYN immutable original '+field+' denies',()=>world(async f=>{
+ const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
+ const values={id:'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',user_id:'SYN-foreign',client_id:'SYN-foreign',project_id:'SYN-foreign',resource:'https://foreign.example/mcp',scopes_json:'["afw:project:read","afw:evidence:read"]',revoked_at:new Date().toISOString()};
+ if(field==='created_at'){
+  const shifted=Date.parse(current.created_at)+1;
+  assert(shifted<=Date.parse(current.exchanged_at)&&shifted<=Date.now()&&shifted<Date.parse(current.expires_at));
+  values.created_at=new Date(shifted).toISOString();
+ }
+ if(field==='expires_at'){
+  const shifted=Date.parse(current.expires_at)-1;
+  assert(shifted>Date.now()&&shifted>Date.parse(current.exchanged_at)&&shifted>Date.parse(current.created_at));
+  values.expires_at=new Date(shifted).toISOString();
+ }
+ if(field==='current-owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
+ else if(field==='current-revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(x.app.project_id).run();
+ else{
+  // The closed list above is test-controlled; all writes target the actual original UUID.
+  await f.db.prepare('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?').bind(values[field],x.app.id).run();
+  if(field==='id')assert.equal(await plain(f.stub.sdkGrant(x.app.id)),null,'original UUID absent; another row cannot substitute');
+ }
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ assert.equal(await d04Journals(f),original.rows);
+}));
+
+test('D04 actual exchange then SYN valid native timestamp drift at observation two denies',()=>world(async f=>{
+ const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
+ let different=current.created_at;
+ if(different===current.exchanged_at){
+  const next=Date.parse(current.exchanged_at)+1;
+  while(Date.now()<next)await new Promise(resolve=>setTimeout(resolve,1));
+  different=new Date(next).toISOString();
+ }
+ assert.notEqual(different,current.exchanged_at);
+ assert(Date.parse(different)>=Date.parse(current.created_at)&&Date.parse(different)<=Date.now()&&Date.parse(different)<Date.parse(current.expires_at));
+ f.phaseObservation=0;f.phaseDrift='exchange';f.exchangeDrift={grantId:x.app.id,exchangedAt:different};
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ assert.equal(f.phaseObservation,2,'existing second pointer observation performed fixed native UPDATE');
+ assert.equal((await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,different);
+ assert.equal(await d04Journals(f),original.rows);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-owner-request-retention-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-request-retention-native.test.mjs b/test/mcp-qa-finite-owner-request-retention-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-request-retention-native.test.mjs
@@ -0,0 +1,54 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {native} from './fixtures/finite-owner-native.mjs';
+import {setup} from './fixtures/finite-transport-native.mjs';
+const O='https://delegated-canary.agentfriendlyweb.dev';
+const wait=async(f,key)=>{for(let i=0;i<400;i++){const v=await f.json('/fixture/request-state',{});if(v[key])return v;await new Promise(r=>setTimeout(r,20));}assert.fail(key+' not reached');};
+const blocked=async f=>assert.deepEqual(await f.json('/fixture/request-probe',{}),{requestAllowed:false,readAllowed:false,ownerAllowed:false,continueAllowed:false});
+for(const mode of ['source','ticket','approval'])test('actual pre-admission '+mode+' remains occupied after timeout until actual settlement',async t=>{
+ const f=await native(t),screen=mode==='approval'?await f.screen():null;
+ const input={mode,method:screen?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':f.token,...screen?{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie}:{}},...screen?{body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()}:{}};
+ const p=f.json('/fixture/request-prepare',input);await wait(f,'held');assert.equal((await p).rejected,true);
+ try{await blocked(f);}finally{await f.json('/fixture/request-release',{});}
+ await wait(f,'settled');await new Promise(r=>setTimeout(r,30));
+ assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
+ const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':connection:approval')).length,0,'no late stage admission or publication');
+});
+test('late streamed body cancellation keeps request occupied until cancellation settles',async t=>{
+ const f=await native(t),p=f.json('/fixture/request-prepare',{mode:'body',method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'}});
+ await wait(f,'held');await wait(f,'denied');await blocked(f);await f.json('/fixture/request-release',{});await wait(f,'cancelHeld');await blocked(f);
+ await f.json('/fixture/request-release',{});assert.equal((await p).rejected,true);await wait(f,'settled');
+ assert.deepEqual(await f.json('/fixture/rows',{}),[]);
+});
+test('actual unmounted host GET and POST stay pending without form or ticket consumption',async t=>{
+ const f=await native(t);
+ for(const method of ['GET','POST']){
+  const r=await f.call('/fixture/pending-host',{method});assert.equal(r.status,503);assert.equal(r.headers.get('Set-Cookie'),null);assert.doesNotMatch(await r.text(),/<form|name="handle"|value="approve"/);
+ }
+ assert.deepEqual(await f.json('/fixture/rows',{}),[]);assert.equal(f.jwksReads(),0);
+});
+
+test('genuine consumed stage adopts the original request in place and replay cannot effect',async t=>{
+ const f=await setup(t),screen=await f.screen(),input={url:O+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()};
+ const result=await f.json('/fixture/request-publish',input);
+ assert.equal(result.answer?.status,'admin_pending');assert.equal(result.continued,true);assert.equal(result.replayed,false);assert.equal(f.posts(),0);
+ try{await blocked(f);}finally{await f.json('/fixture/request-release',{});}await wait(f,'settled');await new Promise(r=>setTimeout(r,30));
+ assert.deepEqual(await f.json('/fixture/request-missing-admission',{preconnectionId:'a'.repeat(64),stage:'connection'}),{accepted:false});assert.equal(f.posts(),0);
+});
+test('resolver genuine children and proof descendants retain root and five second bound',async t=>{
+ const f=await native(t),r=await f.json('/fixture/request-prepare',{mode:'normal',headers:{'Cf-Access-Jwt-Assertion':f.token}});
+ assert.equal(r.result?.status,200);assert.ok(r.lineage.length>=3);
+ for(const observation of r.lineage){assert.equal(observation.sameRoot,true);assert.equal(observation.cloneDenied,true);assert.equal(observation.frozen,true);assert.ok(observation.remaining>0&&observation.remaining<=5000);}
+});
+
+test('oversized body preserves first400 while actual cancellation stays retained past child timeout',async t=>{
+ const f=await native(t),p=f.json('/fixture/request-prepare',{mode:'oversize',method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'}});
+ await wait(f,'cancelHeld');
+ try{
+  assert.equal((await p).status,400,'the size failure precedes any cancellation or deadline failure');
+  await blocked(f);await new Promise(resolve=>setTimeout(resolve,5100));await blocked(f);
+  assert.deepEqual(await f.json('/fixture/rows',{}),[]);
+ }finally{await f.json('/fixture/request-release',{});}
+ await wait(f,'settled');await new Promise(resolve=>setTimeout(resolve,30));
+ assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-request-retention.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-request-retention.test.mjs b/test/mcp-qa-finite-owner-request-retention.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-request-retention.test.mjs
@@ -0,0 +1,47 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createFiniteOwnerRequestLease,readFiniteOwnerRequestContext} from '../lib/mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork,observeFiniteFactualReadWork,adoptFiniteOwnerRequestStageWork,continueFiniteOwnerStageWork,observeFiniteOwnerStageWork,observeFiniteReadOnlyWork,retainFiniteOwnerStagePromise} from '../lib/mcp-qa-finite-stage-work.mjs';
+const world=()=>{const ctx={storage:{}},env={RELEASE_DB:{}},parent=createFiniteOwnerRequestLease(new Request('https://example.invalid'));return {ctx,env,parent};};
+test('request scope rejects clone and foreign roots and never confers continuation authority',async()=>{
+ const {ctx,env,parent}=world(),other=world();
+ try{
+  assert.throws(()=>readFiniteOwnerRequestContext({...parent.lease}));
+  assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:{...parent.lease}},async()=>true));
+  await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{
+   assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:parent.lease},async()=>true));
+   assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true));
+   assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:parent.lease},async()=>true));
+   assert.throws(()=>observeFiniteOwnerStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>true));
+   const read=()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease},async()=>42);
+   assert.equal(await read(),42);
+   ctx.storage={};assert.throws(read);ctx.storage=other.ctx.storage;assert.throws(read);
+   assert.throws(()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:other.parent.lease},async()=>true));
+  });
+ }finally{parent.finish();other.parent.finish();}
+ assert.throws(()=>readFiniteOwnerRequestContext(parent.lease));
+});
+test('request handoff preserves already-retained work and does not restart original clock',async()=>{
+ const {ctx,env,parent}=world(),end=readFiniteOwnerRequestContext(parent.lease).deadline;let release;const held=new Promise(r=>{release=r;});
+ try{
+  await observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{
+   retainFiniteOwnerStagePromise(held);
+   await adoptFiniteOwnerRequestStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>assert.equal(await continueFiniteOwnerStageWork({ctx,env,originalLease:parent.lease},async()=>readFiniteOwnerRequestContext(parent.lease).deadline),end));
+  });
+  parent.finish();
+  const other=world();
+  try{assert.throws(()=>observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true));release();await held;await Promise.resolve();assert.equal(await observeFiniteOwnerRequestWork({ctx,env,originalLease:other.parent.lease},async()=>true),true);}finally{other.parent.finish();}
+ }finally{parent.finish();release();}
+});
+test('readonly cannot upgrade, separate ambient RPC cannot borrow, standalone observer stays compatible',async()=>{
+ const {ctx,env,parent}=world();let release,enter;const entered=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
+ const op=observeFiniteOwnerRequestWork({ctx,env,originalLease:parent.lease},async()=>{enter();await held;});
+ try{
+  await entered;
+  assert.throws(()=>observeFiniteFactualReadWork({ctx,env,originalLease:parent.lease,requestLease:parent.lease},async()=>true));
+  assert.throws(()=>adoptFiniteOwnerRequestStageWork({ctx,env,originalLease:parent.lease,admission:{lease:parent.lease}},async()=>true));
+ }finally{parent.finish();release();await op;}
+ const w=world();
+ try{await observeFiniteReadOnlyWork({ctx:w.ctx,env:w.env,originalLease:w.parent.lease},async()=>assert.throws(()=>adoptFiniteOwnerRequestStageWork({ctx:w.ctx,env:w.env,originalLease:w.parent.lease,admission:{lease:w.parent.lease}},async()=>true)));}finally{w.parent.finish();}
+ const old=world();try{assert.equal(await adoptFiniteOwnerRequestStageWork({ctx:old.ctx,env:old.env,originalLease:old.parent.lease,admission:{lease:old.parent.lease}},async()=>true),true);}finally{old.parent.finish();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs b/test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
@@ -0,0 +1,40 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+let api;try{api=await import('../lib/mcp-qa-finite-owner-sdk-binding-facts.mjs');}catch{/* missing helper is causal RED */}
+const alias='AFW_FINITE_OWNER_OAUTH_KV',id='6b94ff702e504e14a7730cee73a0f6ff';
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+function metadata(){
+ const qaMetadata=structuredClone(finitePublicProfileTemplate('qaLive'));
+ const mMetadata=structuredClone(finitePublicProfileTemplate('canaryLive'));
+ mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='false';
+ return {qaMetadata,mMetadata};
+}
+test('D0.1 strict DATA maps exact QA alias to original M KV under closed/read M preparation',()=>{
+ assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
+ for(const flag of ['false','true']){
+  const v=metadata();v.mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text=flag;
+  const f=api.qualifyFiniteOwnerSdkBindingFacts(v);
+  assert.deepEqual(f,{alias,namespaceId:id,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical({alias,namespaceId:id})).digest('hex')});
+  assert(Object.isFrozen(f));assert.equal(Object.keys(f).length,3);
+ }
+});
+test('D0.1 wrong roles, namespace drift, extra alias, fake profile and hostile DATA deny',()=>{
+ assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
+ const good=metadata();
+ const denied=[
+  {...good,qaMetadata:good.mMetadata,mMetadata:good.qaMetadata},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.filter(b=>b.name!==alias)}},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.map(b=>b.name===alias?{...b,namespace_id:'0'.repeat(32)}:b)}},
+  {...good,mMetadata:{...good.mMetadata,bindings:good.mMetadata.bindings.map(b=>b.name==='OAUTH_KV'?{...b,namespace_id:'0'.repeat(32)}:b)}},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:[...good.qaMetadata.bindings,{name:'EXTRA_OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
+  {...good,mMetadata:{...good.mMetadata,bindings:[...good.mMetadata.bindings,{name:'OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
+  {...good,qaMetadata:{...good.qaMetadata,compatibility_date:'2026-09-08'}},
+  {...good,qaMetadata:Object.assign(Object.create({}),good.qaMetadata)},
+  {...good,qaMetadata:{...good.qaMetadata,[Symbol('extra')]:true}},
+ ];
+ for(const v of denied)assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(v));
+ let reads=0;const hostile=metadata();Object.defineProperty(hostile.qaMetadata.bindings[0],'name',{enumerable:true,get(){reads++;return alias;}});
+ assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(hostile));assert.equal(reads,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-package.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-package.test.mjs b/test/mcp-qa-finite-package.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-package.test.mjs
@@ -0,0 +1,198 @@
+import {readFileSync} from 'node:fs';
+import {v2Manifest} from './fixtures/finite-v2.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {spawnSync} from 'node:child_process';
+import {fileURLToPath} from 'node:url';
+import {encodeFinitePackageManifest,hashFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
+import {resolvePrivateQaFiniteExternalSource,resolveFiniteNativePackage as syntheticResolver} from './fixtures/finite-package-resolver.mjs';
+
+let resolver;
+resolver=syntheticResolver;
+const REPO='tokenizartinfo-ops/agent-friendly-web',ID=1347578006;
+const API='https://api.github.com/repos/'+REPO;
+const M='a'.repeat(40),TREE='b'.repeat(40),OLD='c'.repeat(40),OLDTREE='d'.repeat(40);
+const WORKFLOW='.github/workflows/afw-finite-native-package.yml';
+const WORKFLOW_TEXT='name: Finite native package\non:\n  push:\n    branches: [main]\npermissions:\n  contents: read\njobs:\n  package:\n    runs-on: ubuntu-24.04\n    steps:\n      - run: echo source-only-synthetic-fixture\n';
+const SIGNED='https://productionresultssa1.blob.core.windows.net/actions-results/11111111-1111-4111-8111-111111111111/artifacts/fixture.zip?sig=SYNTHETIC_PRIVATE_SIGNATURE';
+const TOKEN='opaque+/=~.future-'+'z'.repeat(30);
+const AT=Date.parse('2026-11-01T18:00:00.000Z');
+const MODULE=Buffer.from("throw new Error('ARCHIVE_MUST_NEVER_EXECUTE');\n");
+const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+const sha=b=>createHash('sha256').update(b).digest('hex');
+const blob=b=>createHash('sha1').update('blob '+Buffer.byteLength(b)+'\0').update(b).digest('hex');
+const clone=o=>structuredClone(o);
+function fixture(){
+ const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:sha(WORKFLOW_TEXT),modules:{},compatibility:{}};
+ for(const role of ROLES)manifest.modules[role]={sourceRevision:role==='operatorClosed'?OLD:M,sourceTree:role==='operatorClosed'?OLDTREE:TREE,module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:sha(MODULE),bytes:MODULE.length,exports:[]},configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)};
+ for(const k of ['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'])manifest.compatibility[k]=true;
+ v2Manifest(manifest);
+ const run={id:101,workflow_id:11,path:WORKFLOW,head_sha:M,head_branch:'main',event:'push',status:'completed',conclusion:'success',run_attempt:1,repository:{id:ID,full_name:REPO},head_repository:{id:ID,full_name:REPO}};
+ const f={manifest,run,pages:null,artifact:null,calls:[],mutation:null,hook:null,workflowText:WORKFLOW_TEXT};
+ f.options={sourceRevision:M,githubToken:TOKEN,now:()=>AT,fetchImpl:async(url,init)=>{
+  f.calls.push({url,init});
+  if(f.hook){const r=await f.hook(url,init);if(r)return r;}
+  const json=value=>new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});
+  if(url===API+'/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+M){const text=readFileSync('lib/mcp-qa-cloud-closed-pins.mjs','utf8');return json({type:'file',path:'lib/mcp-qa-cloud-closed-pins.mjs',sha:blob(text),size:Buffer.byteLength(text),encoding:'base64',content:Buffer.from(text).toString('base64')});}
+  if(url===API+'/git/commits/'+M)return json({sha:M,tree:{sha:TREE}});
+  if(url===API+'/git/commits/'+OLD)return json({sha:OLD,tree:{sha:OLDTREE}});
+  if(url===API+'/contents/'+WORKFLOW+'?ref='+M)return json({type:'file',path:WORKFLOW,sha:blob(f.workflowText),size:Buffer.byteLength(f.workflowText),encoding:'base64',content:Buffer.from(f.workflowText).toString('base64')});
+  if(url===API+'/actions/workflows/afw-finite-native-package.yml')return json({id:11,path:WORKFLOW,state:'active'});
+  if(url.startsWith(API+'/actions/workflows/afw-finite-native-package.yml/runs?')){
+   const page=Number(new URL(url).searchParams.get('page'));
+   const value=f.pages?.[page-1]??{total_count:1,workflow_runs:[f.run]};
+   const r=json(value);
+   if(f.links?.[page-1])r.headers.set('link',f.links[page-1]);
+   return r;
+  }
+  if(url===API+'/actions/runs/101/artifacts?per_page=100&page=1'){
+   const built=spawnSync('python3',[fileURLToPath(new URL('./finite_archive_test.py',import.meta.url)),'--fixture'],{input:JSON.stringify({manifest:f.manifest,mutation:f.mutation}),maxBuffer:64*1024*1024,timeout:5000});
+   assert.equal(built.status,0,built.stderr?.toString());
+   f.zip=built.stdout;
+   const artifact={id:202,name:'afw-finite-native-package-'+M,expired:false,expires_at:new Date(AT+86400000).toISOString(),digest:'sha256:'+sha(f.zip),size_in_bytes:f.zip.length,workflow_run:{id:101,repository_id:ID,head_repository_id:ID,head_sha:M,head_branch:'main'}};
+   if(f.editArtifact)f.editArtifact(artifact);
+   return json(f.artifact??{total_count:1,artifacts:[artifact]});
+  }
+  if(url===API+'/actions/artifacts/202/zip')return new Response(null,{status:302,headers:{location:SIGNED}});
+  if(url===SIGNED)return new Response(f.zip);
+  throw Error('Unexpected synthetic URL '+url);
+ }};
+ return f;
+}
+async function resolve(f){assert.equal(typeof resolver,'function','concrete package resolver must be installed');return resolver(f.options);}
+async function denied(f){await assert.rejects(()=>resolve(f),{message:'Finite package unavailable'});}
+function runURL(page){return API+'/actions/workflows/afw-finite-native-package.yml/runs?head_sha='+M+'&branch=main&event=push&status=success&per_page=100&page='+page;}
+
+test('real ZIP through actual Python subprocess yields immutable technical material only',async()=>{
+ const f=fixture(),result=await resolve(f);
+ assert.deepEqual(result.manifest,f.manifest);
+ assert.deepEqual(result.build,{workflowPath:WORKFLOW,runId:101,attempt:1,artifactId:202,artifactName:'afw-finite-native-package-'+M,artifactDigest:'sha256:'+sha(f.zip),manifestHash:hashFinitePackageManifest(f.manifest)});
+ assert.equal(encodeFinitePackageManifest(result.manifest),encodeFinitePackageManifest(f.manifest));
+ assert(Object.isFrozen(result));assert(Object.isFrozen(result.build));assert(Object.isFrozen(result.manifest.modules.operatorClosed.module));
+ assert.equal(result.manifest.modules.operatorClosed.provenance.kind,'historical-content-pin.v1');
+ assert.deepEqual(Object.keys(result).sort(),['build','manifest']);
+ assert(!JSON.stringify(result).includes(TOKEN));assert(!JSON.stringify(result).includes('ARCHIVE_MUST_NEVER_EXECUTE'));
+ assert(!f.calls.some(x=>x.url===API+'/git/commits/'+OLD));
+ assert(f.calls.some(x=>x.url===API+'/contents/lib/mcp-qa-cloud-closed-pins.mjs?ref='+M));
+ for(const {url,init} of f.calls){assert.equal(init.method,'GET');assert.equal(init.redirect,'manual');assert.equal(init.headers.Authorization,url===SIGNED?undefined:'Bearer '+TOKEN);}
+});
+test('source constructor invokes concrete resolver only during seed-material',async()=>{
+ const f=fixture(),r=await resolvePrivateQaFiniteExternalSource({phase:'seed-material',...f.options});
+ assert.deepEqual(r.manifest,f.manifest);assert(f.calls.some(x=>x.url===SIGNED));
+ const missing=fixture();missing.hook=async url=>url.includes('/actions/workflows/')?new Response('{}',{status:404}):null;
+ await assert.rejects(()=>resolvePrivateQaFiniteExternalSource({phase:'seed-material',...missing.options}),{message:'Finite package unavailable'});
+ for(const phase of [undefined,'prepare','admit-and-ready','runtime'])await assert.rejects(()=>resolvePrivateQaFiniteExternalSource({phase,...f.options}));
+});
+for(const [field,value] of [['head_sha',OLD],['head_branch','feature'],['event','pull_request'],['path','.github/workflows/other.yml'],['run_attempt',2],['status','in_progress'],['conclusion','failure'],['workflow_id',12],['repository',{id:2,full_name:REPO}],['head_repository',{id:ID,full_name:'foreign/repo'}]]){
+ test('reject run provenance '+field,async()=>{const f=fixture();f.run[field]=value;await denied(f);});
+}
+for(const [name,make] of [
+ ['zero runs',f=>{f.pages=[{total_count:0,workflow_runs:[]}];}],
+ ['two eligible runs',f=>{f.pages=[{total_count:2,workflow_runs:[f.run,{...f.run,id:102}]}];}],
+ ['duplicate run IDs',f=>{f.pages=[{total_count:2,workflow_runs:[f.run,clone(f.run)]}];}],
+ ['overflow total',f=>{f.pages=[{total_count:201,workflow_runs:[f.run]}];}],
+ ['incomplete page',f=>{f.pages=[{total_count:2,workflow_runs:[f.run]}];}],
+ ['unknown total',f=>{f.pages=[{workflow_runs:[f.run]}];}],
+ ['unexpected pagination link',f=>{f.links=['<https://evil.test/private>; rel="next"'];}],
+]){
+ test(name,async()=>{const f=fixture();make(f);await denied(f);});
+}
+function twoPages(f){
+ const others=Array.from({length:100},(_,i)=>({...f.run,id:1000+i,conclusion:'failure'}));
+ f.pages=[{total_count:101,workflow_runs:others},{total_count:101,workflow_runs:[f.run]}];
+ f.links=['<'+runURL(2)+'>; rel="next", <'+runURL(2)+'>; rel="last"','<'+runURL(1)+'>; rel="prev", <'+runURL(1)+'>; rel="first"'];
+}
+test('complete bounded two-page lookup preserves one exact eligible run',async()=>{const f=fixture();twoPages(f);assert.equal((await resolve(f)).build.runId,101);});
+for(const name of ['changed total','missing next','duplicate across pages','short first page']){
+ test('reject '+name,async()=>{
+  const f=fixture();twoPages(f);
+  if(name==='changed total')f.pages[1].total_count=102;
+  if(name==='missing next')f.links[0]='';
+  if(name==='duplicate across pages')f.pages[1].workflow_runs=[clone(f.pages[0].workflow_runs[0])];
+  if(name==='short first page')f.pages[0].workflow_runs.pop();
+  await denied(f);
+ });
+}
+for(const [name,edit] of [
+ ['expired',a=>{a.expired=true;}],['past expiry',a=>{a.expires_at=new Date(AT).toISOString();}],
+ ['unknown expiry',a=>{delete a.expires_at;}],['wrong name',a=>{a.name='afw-independent-closure-'+M;}],
+ ['missing digest',a=>{delete a.digest;}],['malformed digest',a=>{a.digest='sha256:AAAA';}],
+ ['mismatched digest',a=>{a.digest='sha256:'+'0'.repeat(64);}],
+ ['wrong run',a=>{a.workflow_run.id=999;}],['wrong repo',a=>{a.workflow_run.repository_id=2;}],
+ ['wrong head repo',a=>{a.workflow_run.head_repository_id=2;}],['wrong source',a=>{a.workflow_run.head_sha=OLD;}],
+ ['wrong branch',a=>{a.workflow_run.head_branch='feature';}],['too large',a=>{a.size_in_bytes=67108865;}],
+ ['size mismatch',a=>{a.size_in_bytes++;}],
+]){
+ test('reject artifact '+name,async()=>{const f=fixture();f.editArtifact=edit;await denied(f);});
+}
+for(const name of ['zero','duplicate','overflow','incomplete']){
+ test('reject artifact listing '+name,async()=>{
+  const f=fixture();
+  f.editArtifact=a=>{f.artifact=name==='zero'?{total_count:0,artifacts:[]}:name==='duplicate'?{total_count:2,artifacts:[a,{...a,id:203}]}:{total_count:name==='overflow'?101:2,artifacts:[a]};};
+  await denied(f);
+ });
+}
+for(const [name,edit] of [
+ ['wrong source',m=>{m.sourceRevision=OLD;}],['wrong tree',m=>{m.sourceTree=OLDTREE;}],
+ ['workflow hash',m=>{m.buildWorkflowHash='0'.repeat(64);}],['module hash',m=>{m.modules.qaLive.module.sha256='0'.repeat(64);}],
+ ['module size',m=>{m.modules.qaLive.module.bytes++;}],['literal historical module mismatch',m=>{m.modules.qaClosed.module.sha256='0'.repeat(64);}],['private field',m=>{m.token='private';}],
+ ['nested unknown field',m=>{m.modules.qaLive.policy={};}],['historical operator relabeled current M',m=>{m.modules.operatorClosed.sourceRevision=M;m.modules.operatorClosed.sourceTree=TREE;}],
+ ['unknown historical source tree',m=>{m.modules.operatorClosed.sourceTree=TREE;}],['untrue structural assertion',m=>{m.compatibility.legacyContainmentQualified=false;}],
+ ['module traversal',m=>{m.modules.qaLive.module.name='../index.mjs';}],
+]){
+ test('reject manifest '+name,async()=>{const f=fixture();edit(f.manifest);await denied(f);});
+}
+for(const mutation of ['traversal','symlink','duplicate','crc','bomb','extra','directory','nul','encrypted','unsupported','declared-short','duplicate-json','noncanonical','module-altered','manifest-overflow']){
+ test('actual Python subprocess rejects ZIP '+mutation,async()=>{const f=fixture();f.mutation=mutation;await denied(f);});
+}
+for(const [name,hook] of [
+ ['missing future workflow',url=>url.includes('/actions/workflows/')?new Response('{}',{status:404}):null],
+ ['wrong workflow path',url=>url.endsWith('/actions/workflows/afw-finite-native-package.yml')?Response.json({id:11,path:'.github/workflows/other.yml',state:'active'}):null],
+ ['wrong primary commit',url=>url===API+'/git/commits/'+M?Response.json({sha:OLD,tree:{sha:TREE}}):null],
+ ['workflow blob SHA mismatch',url=>url.includes('/contents/')?Response.json({type:'file',path:WORKFLOW,sha:'0'.repeat(40),size:WORKFLOW_TEXT.length,encoding:'base64',content:Buffer.from(WORKFLOW_TEXT).toString('base64')}):null],
+ ['rate limit',()=>new Response('{}',{status:429})],
+ ['rate exhausted',()=>new Response('{}',{headers:{'x-ratelimit-remaining':'0'}})],
+ ['unexpected API redirect',()=>new Response(null,{status:302,headers:{location:SIGNED}})],
+ ['response overflow',()=>new Response('{}',{headers:{'content-length':'1048577'}})],
+ ['sanitized provider exception',()=>{throw Error(TOKEN+' '+SIGNED);}],
+]){
+ test('fail closed '+name,async()=>{const f=fixture();f.hook=async url=>hook(url);await denied(f);});
+}
+test('workflow committed source must contain fixed push/main',async()=>{const f=fixture();f.workflowText=WORKFLOW_TEXT.replace('branches: [main]','branches: [feature]');f.manifest.buildWorkflowHash=sha(f.workflowText);await denied(f);});
+for(const target of ['http://productionresultssa1.blob.core.windows.net/actions-results/a.zip?sig=x','https://evil.test/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net.evil.test/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net/other/a.zip?sig=x','https://user:pass@productionresultssa1.blob.core.windows.net/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net:8443/actions-results/a.zip?sig=x','https://productionresultssa1.blob.core.windows.net/actions-results/%2e%2e/a.zip?sig=x']){
+ test('reject unsafe provider redirect '+target.split('?')[0],async()=>{const f=fixture();f.hook=async url=>url.endsWith('/202/zip')?new Response(null,{status:302,headers:{location:target}}):null;await denied(f);assert(!f.calls.some(x=>x.url===target));});
+}
+test('redirect loop is denied without forwarding credential',async()=>{const f=fixture();f.hook=async url=>url===SIGNED?new Response(null,{status:302,headers:{location:SIGNED}}):null;await denied(f);assert.equal(f.calls.filter(x=>x.url===SIGNED).length,1);});
+for(const sourceRevision of ['',M.toUpperCase(),'a'.repeat(41),null])test('invalid source before any read '+String(sourceRevision),async()=>{const f=fixture();f.options.sourceRevision=sourceRevision;await denied(f);assert.equal(f.calls.length,0);});
+for(const githubToken of ['',null,'bad token','a\nb','\u007f','x'.repeat(8193)])test('invalid opaque credential denied before read '+String(githubToken).length,async()=>{const f=fixture();f.options.githubToken=githubToken;await denied(f);assert.equal(f.calls.length,0);});
+test('opaque one-byte and 8192-byte credentials are valid transport',async()=>{for(const token of ['X','q'.repeat(8192)]){const f=fixture();f.options.githubToken=token;await resolve(f);assert.equal(f.calls[0].init.headers.Authorization,'Bearer '+token);}});
+test('native parent abort cancels hanging fetch and sanitizes its reason',async()=>{
+ const f=fixture(),c=new AbortController();f.options.signal=c.signal;
+ f.options.fetchImpl=async(_url,init)=>new Promise((_,reject)=>{init.signal.addEventListener('abort',()=>reject(Error(SIGNED)),{once:true});});
+ const pending=resolve(f);setTimeout(()=>c.abort(Error(TOKEN)),20);await assert.rejects(pending,{message:'Finite package unavailable'});
+});
+test('real timeout bounds noncooperative fetch',async()=>{
+ const f=fixture();f.options.fetchImpl=async()=>new Promise(()=>{});const started=Date.now();
+ await denied(f);assert(Date.now()-started<7500);
+});
+test('body read timeout is bounded even when stream ignores abort',async()=>{
+ const f=fixture();f.options.fetchImpl=async()=>new Response(new ReadableStream({start(){}}));
+ const started=Date.now();await denied(f);assert(Date.now()-started<7500);
+});
+test('original elapsed clock cannot be reset by successful reads',async()=>{const f=fixture();let ticks=0;f.options.now=()=>AT+(ticks++>6?30001:0);await denied(f);});
+test('unknown/backwards time fails closed',async()=>{for(const value of [NaN,AT-1]){const f=fixture();let first=true;f.options.now=()=>first?(first=false,AT):value;await denied(f);}});
+test('parent abort remains active across actual archive subprocess',async()=>{const f=fixture(),c=new AbortController();f.options.signal=c.signal;f.hook=async url=>{if(url===SIGNED)setTimeout(()=>c.abort(),1);return null;};await denied(f);});
+
+test('closed QA archive cannot be silently renamed to index.mjs',async()=>{
+ const f=fixture();f.mutation='qa-closed-renamed';await denied(f);
+});
+test('provider signature query may contain escaped slash without weakening raw path limits',async()=>{
+ const f=fixture(),signed=SIGNED.replace('SYNTHETIC_PRIVATE_SIGNATURE','SYNTHETIC%2FPRIVATE%2BSIGNATURE%3D');
+ f.hook=async(url,init)=>{
+  if(url.endsWith('/202/zip'))return new Response(null,{status:302,headers:{location:signed}});
+  if(url===signed){assert.equal(init.headers.Authorization,undefined);return new Response(f.zip);}
+  return null;
+ };
+ assert.equal((await resolve(f)).manifest.modules.qaClosed.module.name,'closed-rollback.mjs');
+});

~~~~~~~~~~

## test/mcp-qa-finite-phase-inventory.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-phase-inventory.test.mjs b/test/mcp-qa-finite-phase-inventory.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-phase-inventory.test.mjs
@@ -0,0 +1,32 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {AFW_FIXED_WORKFLOWS,readFiniteTrialAfwWorkflows} from '../lib/mcp-fixed-terminal-workflows.mjs';
+const confirmationId='afw-release-'+'6'.repeat(64),observerId='afw-qa-arm-'+'7'.repeat(64);
+function fixture(phase,{absent=false,nominalStatus='complete',observerStatus='complete'}={}){
+ const rows=AFW_FIXED_WORKFLOWS.map(spec=>({id:spec.id,name:spec.name,script_name:spec.script,class_name:spec.className}));
+ const reads=[];
+ const read=async path=>{
+  reads.push(path);if(path==='/workflows')return {value:rows,info:{per_page:100,count:3,total_count:3,page:1,total_pages:1}};
+  const spec=AFW_FIXED_WORKFLOWS.find(s=>path.startsWith('/workflows/'+s.name));assert.ok(spec);
+  if(!path.endsWith('/instances'))return {value:rows.find(x=>x.id===spec.id)};
+  const value=spec.className==='PrivateQaNamedConfirmation'?(absent?[]:[{id:confirmationId,status:nominalStatus,workflow_id:spec.id}]):spec.className==='PrivateQaBootstrap'?[{id:observerId,status:observerStatus,workflow_id:spec.id}]:[];
+  return {value,info:{per_page:100,count:value.length,total_count:value.length,page:1,total_pages:1}};
+ };
+ return {reads,options:{read,assertCurrent(){},phase,confirmationId,observerId,qualifiedExecution:{intentId:'finite-test-001',controlHash:'1'.repeat(64),sourceRevision:'b'.repeat(40),moduleHash:'d'.repeat(64),confirmationId,observerId,admissionHash:'2'.repeat(64)}}};
+}
+for(const phase of ['arm','nominal','canary_restore','qa_restore'])test('missing nominal remains blocked at '+phase,async()=>{
+ const f=fixture(phase,{absent:true});await assert.rejects(readFiniteTrialAfwWorkflows(f.options),/inventory unavailable/);
+ assert.equal(f.reads.includes('/workflows/afw-own-qa-private-confirmation/instances'),true);
+});
+test('unchanged inventory permits exact existing named instance and complete phase inventory',async()=>{
+ for(const phase of ['arm','nominal','canary_restore','qa_restore']){
+  const f=fixture(phase),value=await readFiniteTrialAfwWorkflows(f.options);assert.equal(value.phase,phase);assert.equal(value.workflowCount,3);assert.equal(value.instanceCount,2);assert.equal(value.authorizesEffects,false);
+ }
+});
+for(const phase of ['canary_restore','qa_restore'])test('active nominal blocks '+phase,async()=>{
+ await assert.rejects(readFiniteTrialAfwWorkflows(fixture(phase,{nominalStatus:'running'}).options),/inventory unavailable/);
+});
+test('observer must complete for QA restore but may run at canary restore',async()=>{
+ assert.equal((await readFiniteTrialAfwWorkflows(fixture('canary_restore',{observerStatus:'running'}).options)).phase,'canary_restore');
+ await assert.rejects(readFiniteTrialAfwWorkflows(fixture('qa_restore',{observerStatus:'running'}).options),/inventory unavailable/);
+});

~~~~~~~~~~

## test/mcp-qa-finite-policy-configuration.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-policy-configuration.test.mjs b/test/mcp-qa-finite-policy-configuration.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-policy-configuration.test.mjs
@@ -0,0 +1,114 @@
+import {createHash} from 'node:crypto';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finitePolicyConfigurationFixture} from './fixtures/finite-policy-configuration-data.mjs';
+import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from '../lib/mcp-qa-finite-profile.mjs';
+import {finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
+let api;
+try{api=await import('../lib/mcp-qa-finite-policy-configuration.mjs');}catch{/* Missing new module is the causal RED. */}
+const fixture=()=>finitePolicyConfigurationFixture();
+const build=x=>{assert.equal(typeof api?.buildFinitePolicySetupConfiguration,'function','full-policy builder required');return api.buildFinitePolicySetupConfiguration(x);};
+const copy=x=>structuredClone(x);
+const binding=(v,name)=>v.bindings.find(b=>b.name===name);
+const removed=['ACCESS_AUD','ACCESS_TEAM_DOMAIN','AFW_DOSSIER_MONITORING_OWNER_POLICY','AFW_OAUTH_PILOT_EXPIRES_AT','DELEGATED_RATE_LIMITER'];
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+const bindingsHash=v=>createHash('sha256').update(canonical([...v.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex');
+
+test('clone and six patches leaves the causal shape failure',()=>{
+ const {prearmConfiguration,policies}=fixture();
+ const oldClone=copy(prearmConfiguration);
+ oldClone.bindings=oldClone.bindings.map(b=>Object.hasOwn(policies,b.name)?{name:b.name,type:'plain_text',text:policies[b.name]}:b);
+ assert.throws(()=>projectFinitePublicConfiguration({role:'canaryLive',metadata:oldClone}));
+ assert.equal(typeof api?.buildFinitePolicySetupConfiguration,'function','missing full-policy builder is the causal RED');
+ const full=build({prearmConfiguration,policies});
+ assert.deepEqual(projectFinitePublicConfiguration({role:'canaryLive',metadata:full}),finitePublicProfileTemplate('canaryLive'));
+});
+
+test('full candidate preserves holders and removes exactly five names',()=>{
+ const {prearmConfiguration,policies}=fixture(),full=build({prearmConfiguration,policies});
+ const before=prearmConfiguration.bindings.map(b=>b.name),after=full.bindings.map(b=>b.name);
+ assert.deepEqual(before.filter(n=>!after.includes(n)).sort(),removed);
+ assert.deepEqual(after.filter(n=>!before.includes(n)),[]);
+ for(const holder of prearmConfiguration.bindings.filter(b=>b.type!=='plain_text'&&!removed.includes(b.name)))assert.deepEqual(binding(full,holder.name),holder);
+ assert.equal(binding(full,'DELEGATED_RATE_LIMITER'),undefined);
+ for(const key of Object.keys(prearmConfiguration).filter(k=>k!=='bindings'))assert.deepEqual(full[key],prearmConfiguration[key]);
+ assert.deepEqual(full.exports,prearmConfiguration.exports);
+ assert.deepEqual(full.containers,prearmConfiguration.containers);
+ assert(Object.isFrozen(full)&&Object.isFrozen(full.bindings)&&Object.isFrozen(binding(full,'DB'))&&Object.isFrozen(full.exports.AfwOwnEventNode));
+});
+
+test('full flags and six original strings are exact',()=>{
+ const input=fixture(),before=copy(input),full=build(input);
+ const enabled=full.bindings.filter(b=>b.name.endsWith('_ENABLED'));
+ assert.deepEqual(enabled.filter(b=>b.text==='true').map(b=>b.name).sort(),['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED']);
+ assert(enabled.filter(b=>b.text!=='true').every(b=>b.text==='false'));
+ for(const [name,raw] of Object.entries(input.policies))assert.equal(binding(full,name).text,raw);
+ assert(full.bindings.every(b=>!Object.hasOwn(b,'privateSlot')));
+ assert.deepEqual(input,before);
+ input.policies.AFW_DOSSIER_EVENTS_POLICY='changed';
+ assert.equal(binding(full,'AFW_DOSSIER_EVENTS_POLICY').text,before.policies.AFW_DOSSIER_EVENTS_POLICY);
+});
+
+test('foreign shape and private placeholder cannot be repaired',()=>{
+ const valid=fixture();
+ const changes=[
+  x=>binding(x.prearmConfiguration,'DB').id='0'.repeat(64),
+  x=>binding(x.prearmConfiguration,'OAUTH_KV').namespace_id='0'.repeat(32),
+  x=>binding(x.prearmConfiguration,'AFW_FINITE_TRIAL_VERSION').type='plain_text',
+  x=>binding(x.prearmConfiguration,'AFW_DOSSIER_EVENTS_NODE').name='OTHER_NODE',
+  x=>x.prearmConfiguration.exports.AfwOwnEventNode.container='foreign-container',
+  x=>x.prearmConfiguration.containers[0].name='foreign-container',
+  x=>x.prearmConfiguration.bindings.push({name:'EXTRA',type:'plain_text',text:'x'}),
+  x=>x.prearmConfiguration.bindings.pop(),
+  x=>x.prearmConfiguration.bindings.push(copy(x.prearmConfiguration.bindings[0])),
+  x=>x.prearmConfiguration.compatibility_flags.reverse(),
+  x=>x.prearmConfiguration.compatibility_date='2026-09-08',
+  x=>x.policies.EXTRA='x',
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='',
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='SYNTHETIC-PRIVATE-EVENTS',
+  x=>x.policies.AFW_DOSSIER_RETIREMENT_POLICY='SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT',
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='[]',
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='1',
+  x=>x.policies.AFW_OAUTH_PILOT_PROJECT_ID='foreign-project',
+  x=>x.policies.AFW_OAUTH_PILOT_CLIENT_ID='foreign-client',
+  x=>x.policies.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify({scope:{},original:{},candidate:{},publication:{},extra:true})
+ ];
+ for(const mutate of changes){const x=copy(valid);mutate(x);assert.throws(()=>build(x));}
+});
+
+test('strict builder DATA rejects hidden capabilities without evaluating accessors',()=>{
+ const changes=[
+  x=>x.extra=true,
+  x=>x.policies[Symbol('hidden')]='x',
+  x=>Object.setPrototypeOf(x.policies,{}),
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='x'.repeat(32769),
+  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY=()=>{},
+  x=>x.prearmConfiguration.env={},
+  x=>x.prearmConfiguration.bindings.length++
+ ];
+ for(const mutate of changes){const x=fixture();mutate(x);assert.throws(()=>build(x));}
+ let calls=0;
+ for(const target of ['input','policies','prearm']){
+  const x=fixture(),obj=target==='input'?x:target==='policies'?x.policies:x.prearmConfiguration;
+  Object.defineProperty(obj,target==='input'?'policies':target==='policies'?'AFW_DOSSIER_EVENTS_POLICY':'bindings',{enumerable:true,get(){calls++;throw Error('getter ran');}});
+  assert.throws(()=>build(x));assert.equal(calls,0);
+ }
+});
+
+test('full hashes keep distinct original domains',()=>{
+ const input=fixture(),a=build(input),b=build(fixture());
+ const hashes=v=>[finiteActivationConfigurationHash(v),restorationConfigurationHash(v),bindingsHash(v)];
+ assert.deepEqual(hashes(a),hashes(b));
+ assert.notEqual(finiteActivationConfigurationHash(input.prearmConfiguration),finiteActivationConfigurationHash(a));
+ assert.notEqual(restorationConfigurationHash(input.prearmConfiguration),restorationConfigurationHash(a));
+ assert.notEqual(bindingsHash(input.prearmConfiguration),bindingsHash(a));
+ const changed=fixture(),event=JSON.parse(changed.policies.AFW_DOSSIER_EVENTS_POLICY);
+ event.grantId='ci-synthetic-other-grant';
+ changed.policies.AFW_DOSSIER_EVENTS_POLICY=JSON.stringify(event);
+ const c=build(changed);
+ assert.notEqual(hashes(a)[0],hashes(c)[0]);
+ assert.notEqual(hashes(a)[1],hashes(c)[1]);
+ assert.notEqual(hashes(a)[2],hashes(c)[2]);
+ assert.deepEqual(projectFinitePublicConfiguration({role:'canaryLive',metadata:a}),projectFinitePublicConfiguration({role:'canaryLive',metadata:c}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-policy-journal-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-policy-journal-native.test.mjs b/test/mcp-qa-finite-policy-journal-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-policy-journal-native.test.mjs
@@ -0,0 +1,92 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {mkdtemp,rm} from 'node:fs/promises';
+import {tmpdir} from 'node:os';
+import {join} from 'node:path';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+async function native(t,persistent=false){
+ const built=await build({entryPoints:['test/fixtures/finite-preparation-store-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const directory=persistent?await mkdtemp(join(tmpdir(),'afw-task3-journal-')):null;
+ const options=()=>({...convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:'FinitePreparationFixture',useSQLite:true,uniqueKey:'finite-private-task1'}}}),...(directory?{resourcePersistencePath:directory}:{})});
+ let mf=new Miniflare(options());
+ t.after(async()=>{try{await mf.dispose();}finally{if(directory)await rm(directory,{recursive:true,force:true});}});let path='/'+t.name.replace(/[^a-z0-9_]/gi,'');
+ const call=async(op,arg,extra={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify({op,arg,...extra})});assert.equal(r.status,200);return r.json();};
+ return {call,f:await call('fixtures'),async restart(){if(!directory)throw Error('Restart requires hosted test persistence');await mf.dispose();mf=new Miniflare(options());}};
+}
+
+test('lost_issue_ack_retains_issued',async t=>{
+ const {call,f}=await native(t),extra={target:'journal'};
+ const lost=await call('issue',f.send,{...extra,loseCommitAck:true});
+ assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
+ const read=await call('read',null,extra);
+ assert.equal(read.result.state,'issued');assert.deepEqual(read.result.send,f.send);
+ assert.equal((await call('issue',f.send,extra)).result.status,'existing');
+ assert.equal((await call('read',null,extra)).result.state,'issued');
+});
+test('activation_requires_actual_upload_ack',async t=>{
+ const {call,f}=await native(t),extra={target:'journal'};
+ const activation={...f.send,effect:'activation',issuedAt:40},identity={...f.identity,effect:'activation'};
+ assert.equal((await call('issue',activation,{...extra,identity})).rejected,true);
+ assert.equal((await call('issue',f.send,extra)).result.status,'recorded');
+ for(const bad of [{...f.ack,acknowledgedAt:101},{...f.ack,acknowledgedAt:29},{...f.ack,sendHash:'e'.repeat(64)}])assert.equal((await call('acknowledge',bad,extra)).rejected,true);
+ assert.equal((await call('acknowledge',f.ack,{...extra,now:5001})).rejected,true);
+ assert.equal((await call('acknowledge',f.ack,extra)).result.status,'recorded');
+ assert.equal((await call('issue',activation,{...extra,identity})).result.status,'recorded');
+});
+test('admin_pending_keeps_outstanding_send',async t=>{
+ const {call,f}=await native(t),extra={target:'journal'};
+ await call('issue',f.send,extra);
+ assert.equal((await call('markAdminPending',{reasonCode:'provider_uncertain',observedAt:100},extra)).result.status,'recorded');
+ const before=await call('rows'),read=(await call('read',null,extra)).result;
+ assert.equal(read.state,'admin_pending');assert.deepEqual(read.send,f.send);assert.equal(read.ack,null);assert.equal(read.receipt,null);
+ assert.equal((await call('issue',f.send,extra)).result.status,'existing');
+ assert.equal((await call('acknowledge',f.ack,extra)).rejected,true);
+ assert.deepEqual(await call('rows'),before);
+});
+
+test('receipt_requires_both_actual_acks_and_exact_resource_ids',async t=>{
+ const {call,f}=await native(t),extra={target:'journal'},activation={...f.send,effect:'activation',issuedAt:40},act={...extra,identity:{...f.identity,effect:'activation'}};
+ assert.equal((await call('finish',f.receipt,act)).rejected,true);
+ await call('issue',f.send,extra);await call('acknowledge',f.ack,extra);
+ await call('issue',activation,act);
+ assert.equal((await call('finish',f.receipt,act)).rejected,true);
+ const activationHash=await call('recordHash',{kind:'PolicySend',record:activation});
+ const ack={...f.ack,sendHash:activationHash.result,acknowledgedAt:50};
+ assert.equal((await call('acknowledge',ack,act)).result.status,'recorded');
+ const wrong=await call('recordHash',{kind:'PolicyReceipt',record:{...f.receipt,versionId:'22222222-2222-4222-8222-222222222222'}});
+ assert.equal((await call('finish',{...f.receipt,versionId:'22222222-2222-4222-8222-222222222222',receiptHash:wrong.result},act)).rejected,true);
+ assert.equal((await call('finish',f.receipt,act)).result.status,'recorded');
+ assert.equal((await call('read',null,act)).result.state,'installed');
+ assert.equal((await call('finish',f.receipt,act)).result.status,'existing');
+});
+test('connection_stage_and_effect_identity_isolation',async t=>{
+ const {call,f}=await native(t),identity={kind:'connection',preconnectionId:f.preparation.prepId,sourceRevision:f.preparation.sourceRevision,stage:'connection',effect:'upload'};
+ const send={purpose:'afw.finite-connection-send.v1',preconnectionId:identity.preconnectionId,sourceRevision:identity.sourceRevision,stage:'connection',contextHash:'a'.repeat(64),effect:'upload',baselineVersionId:f.ack.resourceId,baselineDeploymentId:f.ack.resourceId,requestHash:'a'.repeat(64),issuedAt:30,deadline:5000};
+ const extra={target:'journal',identity};
+ assert.equal((await call('issue',send,extra)).result.status,'recorded');
+ assert.equal((await call('read',null,{...extra,identity:{...identity,stage:'notices'}})).result.state,'absent');
+ assert.equal((await call('issue',{...send,stage:'notices'},extra)).rejected,true);
+ assert.equal((await call('read',null,{target:'journal'})).result.state,'absent');
+});
+
+test('Task3 actor writer head blocks different preparations after unknown commit and actual native runtime restart',async t=>{
+ const {call,f,restart}=await native(t,true);
+ assert.equal((await call('issue',f.send,{target:'journal',loseCommitAck:true})).result.status,'uncertain');
+ await restart();
+ assert.equal((await call('read',null,{target:'journal'})).result.state,'issued');
+ const other={...f.identity,intentId:'different-original',setupInstanceId:'different-setup'},send={...f.send,intentId:other.intentId,setupInstanceId:other.setupInstanceId};
+ assert.equal((await call('issue',send,{target:'journal',identity:other})).rejected,true);
+ const before=await call('rows');
+ assert.equal(before.filter(([key])=>key==='afw.finite-policy-effect.v1:writer-head').length,1);
+ assert.equal((await call('issue',f.send,{target:'journal'})).result.status,'existing');
+ assert.deepEqual(await call('rows'),before);
+});
+test('Task3 native concurrent new journals atomically admit only one actor writer',async t=>{
+ const {call,f}=await native(t);
+ const args=[0,1].map(n=>({identity:{...f.identity,intentId:'original-'+n,setupInstanceId:'setup-'+n},send:{...f.send,intentId:'original-'+n,setupInstanceId:'setup-'+n}}));
+ const outcomes=await call('concurrentJournal',null,{args});
+ assert.equal(outcomes.filter(x=>x.status==='recorded').length,1);
+ assert.equal(outcomes.filter(x=>x.rejected).length,1);
+ assert.equal((await call('rows')).filter(([key])=>key.endsWith(':send')).length,1);
+});

~~~~~~~~~~

## test/mcp-qa-finite-policy-setup-facts-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-policy-setup-facts-native.test.mjs b/test/mcp-qa-finite-policy-setup-facts-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-policy-setup-facts-native.test.mjs
@@ -0,0 +1,19 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {setup} from './fixtures/finite-transport-native.mjs';
+// Unit1 intentionally retires the CURRENT owner-flow prerequisites of these
+// composed positives: post-commandBy normal/grant/revision/selection. Unit2b
+// must restore all four once a qualified owner continuation is available.
+test('current owner preparation cannot reach selected setup facts through the Unit1 pending fence',async t=>{
+ const f=await setup(t,'normal',{setupFacts:true}),first=await f.screen();
+ assert.equal((await f.publish(first)).status,'admin_pending');assert.equal(f.posts(),0);
+ const before=await f.json('/fixture/rows',{});
+ assert.equal(before.filter(([k])=>k.endsWith(':connection:approval')).length,1);
+ assert.equal(before.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
+ for(const prefix of ['source-selection:','preparation:','afw.finite-policy-effect.v1:'])assert.equal(before.filter(([k])=>k.startsWith(prefix)).length,0);
+ const result=await f.json('/fixture/task4-facts',{});
+ assert.equal(result.outcome.status,'admin_pending');assert.notEqual(result.facts?.accepted,true);assert.equal(f.posts(),0);
+ const after=await f.json('/fixture/rows',{});
+ for(const [k,v]of before)assert.deepEqual(after.find(([key])=>key===k)?.[1],v);
+ for(const prefix of ['source-selection:','preparation:','afw.finite-policy-effect.v1:'])assert.equal(after.filter(([k])=>k.startsWith(prefix)).length,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-policy-setup-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-policy-setup-native.test.mjs b/test/mcp-qa-finite-policy-setup-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-policy-setup-native.test.mjs
@@ -0,0 +1,103 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual workerd Workflow subclass. External native source qualification is
+// SYNTHETIC; it deliberately denies. This fixture never claims native authority.
+const entry=`
+import {createHash} from 'node:crypto';
+import {PrivateQaBootstrap} from './worker/independent-closure/finite.mjs';
+const state={reads:0};
+export function entrySource({env,event,step},lease){lease.assertCurrent();state.reads++;if(env!==state.env||event!==state.event||step!==state.step)throw Error('SYNTHETIC identity drift');throw Error('SYNTHETIC original source incomplete');}
+export default {async fetch(request,env,ctx){
+ const {mode}=await request.json();state.reads=0;
+ const refs={intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)};
+ const id='afw-finite-policy-'+createHash('sha256').update('afw.finite-private-policy-setup.v1\\n'+JSON.stringify(refs)).digest('hex');
+ const event={timestamp:new Date(),instanceId:id,workflowName:'afw-own-qa-private-bootstrap',payload:{operation:'finite_private_policy_setup',...refs}};
+ if(mode==='extra')event.payload.T0=Date.now();
+ if(mode==='future')event.timestamp=new Date(Date.now()+10000);
+ if(mode==='expired')event.timestamp=new Date(Date.now()-30000);
+ if(mode==='non_date')event.timestamp=Date.now();
+ if(mode==='wrong_id')event.instanceId='wrong';
+ if(mode==='wrong_name')event.workflowName='wrong';
+ state.env=env;state.event=event;state.step={async do(name,options,callback){return callback();}};
+ let outcome;try{outcome=await new PrivateQaBootstrap(ctx,env).run(event,state.step);}catch{outcome={status:'admin_pending'};}
+ return Response.json({reads:state.reads,outcome});
+}};
+`;
+const bundles=new Map();
+async function run(t,mode,synthetic=true){
+ if(!bundles.has(synthetic)){
+  const r=await build({stdin:{contents:"export {default} from 'synthetic-policy-entry';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC-native-entry',setup(b){
+   b.onResolve({filter:/^synthetic-policy-entry$/},()=>({path:'entry',namespace:'synthetic'}));
+   b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:entry,resolveDir:process.cwd(),loader:'js'}));
+   if(synthetic)b.onLoad({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},()=>({contents:"export {entrySource as readPrivateQaFinitePolicyEntry} from 'synthetic-policy-entry'; export function readPrivateQaFinitePolicySource(){throw Error('SYNTHETIC unavailable');}",loader:'js'}));
+  }}]});bundles.set(synthetic,r.outputFiles[0].text);
+ }
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundles.get(synthetic),compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200);return response.json();
+}
+test('Task4 native finite setup dispatch consults original source before any effect',async t=>{
+ const r=await run(t,'normal');assert.equal(r.reads,1);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
+});
+for(const mode of ['extra','future','expired','non_date','wrong_id','wrong_name'])test('Task4 native setup denies '+mode+' before source',async t=>{
+ const r=await run(t,mode);assert.equal(r.reads,0);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
+});
+test('Task4 actual unavailable source cannot mint setup authority',async t=>{
+ const r=await run(t,'normal',false);assert.equal(r.reads,0);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
+});
+
+import {policyFixture} from './fixtures/finite-policy-setup-native.mjs';
+import {hashFinitePreparationRecord as recordHash,decodeFinitePreparationRecord} from '../lib/mcp-qa-finite-preparation-records.mjs';
+test('Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions',async t=>{
+ const f=await policyFixture(t),outcome=await f.run();assert.equal(outcome.status,'installed',JSON.stringify({posts:f.posts(),reads:f.reads,keys:(await f.rows()).map(([k])=>k)}));assert.equal(f.posts(),2);
+ assert.equal(outcome.receipt.versionId,f.actual().versionId);assert.equal(outcome.receipt.deploymentId,f.actual().deploymentId);
+ assert.equal(outcome.receipt.receiptHash,recordHash('PolicyReceipt',outcome.receipt));
+ const rows=await f.rows(),context=decodeFinitePreparationRecord('SetupContext',rows.find(([k])=>k.endsWith(':context'))[1]);
+ assert.equal(context.ownerPreparation.programContext.sourceRevision,'c'.repeat(40));assert.equal(context.sourceRevision,'b'.repeat(40));
+ assert(context.T0<context.ownerPreparation.commandBy);assert(outcome.receipt.installedAt>context.ownerPreparation.commandBy);
+ assert.deepEqual(context.baseline.configuration.compatibility_flags,['nodejs_compat','global_fetch_strictly_public','enable_request_signal']);
+ assert.deepEqual(context.rollback.configuration.compatibility_flags,['nodejs_compat','global_fetch_strictly_public']);
+ assert(f.reads.some(url=>url.includes(context.baseline.versionId)));assert(f.reads.some(url=>url.includes(context.rollback.versionId)));
+ assert.equal(context.C0,context.T0+240000);assert.equal(context.C1,context.T0+420000);
+ const withdrawal=JSON.parse(context.policies.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY);assert.equal(withdrawal.startAt,context.C0);assert.equal(withdrawal.expiresAt,context.C1);
+ const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
+ for(const request of f.requests){
+  const effect=request.url.includes('/versions?')?'upload':'activation',send=JSON.parse(rows.find(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect===effect)[1]);
+  const {createHash}=await import('node:crypto');
+  const expected=createHash('sha256').update('afw.finite-policy-request.v1\n'+canonical({method:request.method,path:request.url,baselineVersionId:context.baseline.versionId,baselineDeploymentId:context.baseline.deploymentId,body:request.body})).digest('hex');
+  assert.equal(send.requestHash,expected);assert(send.deadline-send.issuedAt<=5000);assert(send.deadline<=f.state.T0+200+30000);assert(send.deadline<=f.state.T0+50000);
+ }
+ assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,2);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,2);
+ assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
+ assert.equal(JSON.stringify(outcome).includes('SYNTHETIC_OWNER'),false);
+ assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),2);
+});
+for(const mode of ['actual_facts_unavailable','owner_incomplete','seed_incomplete','changed_grant','changed_revision','changed_selection','publisher_unavailable','queue_expired','setup_expired','original_queue_budget','command_at_boundary','head_touched','oversize','foreign_pointer']){
+ test('Task4 native setup denies '+mode+' before SEND',async t=>{
+  const f=await policyFixture(t,mode);assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),0);assert.equal((await f.rows()).filter(([k])=>k.endsWith(':send')).length,0);
+ });
+}
+for(const mode of ['lost_ack','late_upload','provider404','wrong_bytes','wrong_full','foreign_after_upload']){
+ test('Task4 native upload '+mode+' preserves issued state without activation or resend',async t=>{
+  const f=await policyFixture(t,mode);assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),1);
+  assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),1);
+  assert.equal((await f.rows()).filter(([k])=>k.endsWith(':send')).length,1);
+ });
+}
+test('Task4 lost activation ACK cannot produce installed receipt or repeat effects',async t=>{
+ const f=await policyFixture(t,'lost_activation');assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),2);
+ assert.equal((await f.rows()).filter(([k])=>k.endsWith(':receipt')).length,0);
+ assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),2);
+});
+
+test('Task4 held nested hydration retains original lineage after response until actual settlement',async t=>{
+ const f=await policyFixture(t,'held_hydration');
+ assert.equal((await f.run()).status,'admin_pending');
+ assert.equal((await f.run(true)).status,'admin_pending');
+ assert.deepEqual(await f.hydration(),{reads:1,lateDenied:0});
+ assert.equal(f.posts(),0);assert.equal((await f.rows()).filter(([k])=>k.endsWith(':send')).length,0);
+ await new Promise(r=>setTimeout(r,6700));
+ assert.deepEqual(await f.hydration(),{reads:1,lateDenied:1});
+ assert.equal((await f.rows()).some(([k])=>k==='fixture:late-write'),false);
+});

~~~~~~~~~~

## test/mcp-qa-finite-policy-transport.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-policy-transport.test.mjs b/test/mcp-qa-finite-policy-transport.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-policy-transport.test.mjs
@@ -0,0 +1,106 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {setup} from './fixtures/finite-transport-native.mjs';
+test('actual consumed owner approval without original native cleanup capsule remains pending and has no SEND/POST',async t=>{
+ const f=await setup(t),screen=await f.screen(),r=await f.publish(screen);
+ assert.deepEqual(r,{status:'admin_pending',mayRetry:false,operationalReadiness:false});assert.equal(f.posts(),0);
+ const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':connection:approval')).length,1);
+ assert.equal(rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
+ assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
+ assert.equal((await f.publish(screen)).status,'admin_pending');assert.equal(f.posts(),0);
+ assert.deepEqual(await f.json('/fixture/rows',{}),rows);
+});
+for(const mode of ['lost','late','not_found','unexpected_reconciliation','foreign','held_claim','extra_binding','namespace','wrong_secret'])test('owner boundary '+mode+' never reaches retired upload segment without original capsule',async t=>{
+ const f=await setup(t,mode);assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
+ assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
+});
+import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
+import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
+test('Task3 preparation grammar preserves Access/limiter and closed business flags in each exact phase',()=>{
+ const source={clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}};
+ for(const phase of ['closed_ui','read_consent']){
+  const metadata=syntheticPreparation(phase,source),r=qualifyFiniteConnectionProfile({phase,metadata});
+  assert.deepEqual(r,metadata);assert(Object.isFrozen(r));
+  for(const mutate of [v=>v.bindings.pop(),v=>v.bindings.push({name:'UNAPPROVED',type:'plain_text',text:'x'}),v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true',v=>delete v.exports.AfwOwnEventNode.container]){
+   const v=structuredClone(metadata);mutate(v);assert.throws(()=>qualifyFiniteConnectionProfile({phase,metadata:v}));
+  }
+ }
+ assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata:syntheticPreparation('closed_ui',source)}));
+});
+
+test('Task3 original parent finish retains actual pending source work even without a durable SEND',async t=>{
+ const f=await setup(t,'held_source');
+ assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
+ assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:false});
+ assert.equal((await f.publish(await f.screen())).status,'admin_pending');assert.equal(f.posts(),0);
+ assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
+ await new Promise(r=>setTimeout(r,1400));
+ assert.deepEqual(await f.json('/fixture/source-hold-state',{}),{used:true,settled:true});
+ assert.equal(f.posts(),0);assert.equal((await f.json('/fixture/rows',{})).filter(([k])=>k.endsWith(':send')).length,0);
+});
+
+import {build} from 'esbuild';
+import {readFile} from 'node:fs/promises';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {createHash} from 'node:crypto';
+async function versionRoleHarness(t){
+ // Test-only exposure of the private engine; no public role/configuration API.
+ const entry=`import {createFiniteFixedPolicyEngine} from './lib/mcp-qa-finite-fixed-policy-engine.mjs';
+ export default {async fetch(request,env){
+  const {pin,closed,wire}=await request.json(),lease={signal:new AbortController().signal,assertCurrent(){}};
+  const engine=createFiniteFixedPolicyEngine({ctx:{},env},()=>{});
+  try{if(wire)engine.describeUpload({configuration:pin.configuration,baselineVersionId:pin.versionId,bytes:new Uint8Array([1])});else await engine.readVersion(pin,lease,closed);return Response.json({accepted:true});}
+  catch{return Response.json({accepted:false});}
+ }};`;
+ const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+ let metadata,writes=0,gets=0;
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_READ_TOKEN:'SYNTHETIC_READER_00000000000000',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},outboundService:request=>{if(request.method!=='GET'){writes++;throw Error('write forbidden');}gets++;return Response.json({success:true,errors:[],messages:[],result:metadata});}}));
+ t.after(()=>mf.dispose());
+ const script='export default {}',descriptor={name:'index.mjs',sha256:createHash('sha256').update(script).digest('hex'),bytes:Buffer.byteLength(script)},versionId='22222222-2222-4222-8222-222222222222';
+ const candidate=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}});
+ const historical=structuredClone(candidate);historical.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
+ return {candidate,historical,counts:()=>({writes,gets}),async read(actual,expected,closed=false,wire=false){
+  metadata={...actual,id:versionId,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
+  return (await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({pin:{versionId,module:descriptor,configuration:expected},closed,wire})})).json();
+ }};
+}
+test('read_version_current_candidate_and_historical_rollback',async t=>{
+ const f=await versionRoleHarness(t);
+ assert.deepEqual(await f.read(f.candidate,f.candidate),{accepted:true});
+ assert.deepEqual(await f.read(f.historical,f.historical,true),{accepted:true});
+ assert.deepEqual(f.counts(),{writes:0,gets:2});
+});
+test('wrong_role_denied_before_mutation',async t=>{
+ const f=await versionRoleHarness(t);
+ for(const closed of [false,true]){
+  const right=closed?f.historical:f.candidate,wrong=closed?f.candidate:f.historical;
+  for(const [actual,pin]of [[wrong,right],[right,wrong],[wrong,wrong]])assert.deepEqual(await f.read(actual,pin,closed),{accepted:false});
+ }
+ assert.deepEqual(await f.read(f.historical,f.historical,false,true),{accepted:false},'wire remains candidate-only');
+ assert.deepEqual(f.counts(),{writes:0,gets:6});
+});
+
+test('T1 known failure retains real cancellation',async t=>{
+ const fresh=await readFile('lib/mcp-qa-finite-fixed-policy-engine.mjs','utf8').then(()=>true,()=>false);
+ const entry=`import {${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}} from './lib/${fresh?'mcp-qa-finite-fixed-policy-engine':'mcp-qa-finite-policy-transport'}.mjs';
+ export default {async fetch(request,env){
+  let release,started,failed=false,settled=false,cancelStarted=false,cancelSettled=false,posts=0;
+  const cancellationStarted=new Promise(r=>{started=r;});
+  globalThis.fetch=async()=>{posts++;return new Response(new ReadableStream({cancel(){cancelStarted=true;started();return new Promise(r=>{release=()=>{cancelSettled=true;r();};});}}),{status:200,headers:{'Content-Type':'text/plain'}});};
+  const lease={signal:new AbortController().signal,assertCurrent(){}};
+  const engine=${fresh?'createFiniteFixedPolicyEngine':'fixedPolicyEngine'}({ctx:{},env},()=>{});
+  const actual=${fresh?"engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease)":"engine.http('POST','scripts/agent-friendly-web-delegated-canary/deployments',{strategy:'percentage',versions:[{version_id:'22222222-2222-4222-8222-222222222222',percentage:100}]},lease)"};
+  const logical=actual.then(()=>{settled=true;},()=>{failed=true;settled=true;});
+  await cancellationStarted;
+  // Drain only already-queued native continuations inside this original request.
+  for(let i=0;i<12;i++)await Promise.resolve();
+  const before={failed,settled,cancelStarted,cancelSettled,posts};
+  release();await logical;for(let i=0;i<4;i++)await Promise.resolve();
+  return Response.json({before,after:{failed,settled,cancelStarted,cancelSettled,posts}});
+ }};`;
+ const compiled=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:fresh?[]:[{name:'old-private-contract-only',setup(b){b.onLoad({filter:/mcp-qa-finite-policy-transport\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8'))+'\nexport {fixedPolicyEngine};',resolveDir:process.cwd()+'/lib',loader:'js'}));}}]});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}}));t.after(()=>mf.dispose());
+ const {before,after}=await (await mf.dispatchFetch('https://fixture.invalid')).json();
+ assert.deepEqual(before,{failed:true,settled:true,cancelStarted:true,cancelSettled:false,posts:1},'known failure must reject logically while actual cancellation remains retained');
+ assert.deepEqual(after,{failed:true,settled:true,cancelStarted:true,cancelSettled:true,posts:1});
+});

~~~~~~~~~~

## test/mcp-qa-finite-pre-entry-host-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-pre-entry-host-native.test.mjs b/test/mcp-qa-finite-pre-entry-host-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-pre-entry-host-native.test.mjs
@@ -0,0 +1,112 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+
+const source='a'.repeat(40),id='e'.repeat(64),slot='afw-own-successor-closure-v1';
+const baselineHash='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f';
+const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
+const exactPath=process.env.AFW_QA_INSPECTION_BASE_MODULE;
+const requireExact=process.env.AFW_REQUIRE_EXACT_BASELINE==='1';
+if(requireExact&&!exactPath)throw Error('Exact historical baseline required');
+const exact=exactPath?await readFile(exactPath):null;
+if(exact){assert.equal(exact.length,395915);assert.equal(createHash('sha256').update(exact).digest('hex'),baselineHash);}
+console.log('CUSTODY_HOST_BASELINE',JSON.stringify({mode:exact?'exact':'synthetic',bytes:exact?.length??null,sha256:exact?baselineHash:null}));
+
+const wrapperBytes=await readFile('scripts/qa-finite-pre-entry-custody-wrapper.mjs').catch(()=>null);
+const hasWrapper=wrapperBytes!==null;
+if(wrapperBytes)console.log('CUSTODY_HOST_SOURCE',JSON.stringify({bytes:wrapperBytes.length,sha256:createHash('sha256').update(wrapperBytes).digest('hex')}));
+test('fixed host wrapper source exists',()=>assert.equal(hasWrapper,true));
+const hostTest=hasWrapper?test:test.skip;
+
+async function fixture(mode='normal'){
+ const now=Date.now();
+ const context={purpose:'afw.qa-pre-entry-custody-context.v1',id,sourceRevision:source,baselineVersionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',baselineModuleHash:baselineHash,startAt:now-1000,expiresAt:now+120000};
+ if(mode==='expired')context.expiresAt=now-1;
+ if(mode==='bad-source')context.sourceRevision='bad';
+ const entry=`import base,{IndependentClosure,PrivateQaBootstrap} from './scripts/qa-finite-pre-entry-custody-wrapper.mjs';
+ import {observeFiniteOwnerStageWork} from './lib/mcp-qa-finite-stage-work.mjs';
+ export class Actor extends IndependentClosure{
+  async readPreEntryCustody(...args){if(this.env.SYNTHETIC_MODE==='forged')return JSON.stringify({purpose:'afw.qa-pre-entry-custody.v1',status:'observed',guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false,reader:{status:'active'},publisher:{status:'active'},extra:'untrusted'});return super.readPreEntryCustody(...args);}
+  async snapshot(){return JSON.stringify([...await this.ctx.storage.list()]);}
+  async inheritedInventory(){
+   const base=Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this)));
+   const names=Object.getOwnPropertyNames(base).filter(k=>k!=='constructor'&&typeof base[k]==='function').sort(),result=[];
+   for(const name of names){try{const value=await this[name]();result.push({name,returned:true,positive:value?.authorizesEffects===true||value?.operationalReadiness===true});}catch{result.push({name,returned:false,positive:false});}}
+   return JSON.stringify(result);
+  }
+  async availability(){const c=new AbortController(),lease={signal:c.signal,assertCurrent(){}};try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},async()=>true);return true;}catch{return false;}finally{c.abort();}}
+  async inherited(){return JSON.stringify({alarm:await this.alarm(),arm:await this.arm(),status:await this.status()});}
+ }
+ export {PrivateQaBootstrap};export default base;`;
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-base-and-context',setup(b){
+  b.onResolve({filter:/^\.\/closed-rollback\.mjs$/},()=>({path:'base',namespace:'fixture'}));
+  b.onResolve({filter:/^\.\/pre-entry-custody-context\.mjs$/},()=>({path:'context',namespace:'fixture'}));
+  b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:a.path==='context'?'export const custodyContext=Object.freeze('+JSON.stringify(context)+');':exact?exact.toString('utf8'):"export {IndependentClosure,PrivateQaBootstrap,PrivateQaPreregistration,PrivateQaNamedConfirmation,default} from './worker/independent-closure/closed-rollback.mjs';",resolveDir:process.cwd(),loader:'js'}));
+ }}]});
+ let calls=[],release,held=false;
+ const bindings={SYNTHETIC_MODE:mode,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher',...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(policies.map(k=>[k,'']))};
+ if(mode==='open')bindings.AFW_MCP_CLOSURE_ENABLED='true';
+ if(mode==='missing-holder')delete bindings.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,d1Databases:{RELEASE_DB:'custody-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Actor',useSQLite:true,uniqueKey:'pre-entry-fixture'}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'PrivateQaBootstrap'}},outboundService:async req=>{
+  calls.push({url:req.url,method:req.method});assert.equal(req.method,'GET');
+  if(mode==='hold'&&req.url.endsWith('/tokens/verify')&&!held){held=true;await new Promise(r=>{release=r;});}
+  let result;
+  if(req.url.endsWith('/tokens/verify'))result={id:mode==='wrong-holder'?'0'.repeat(32):req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(Date.now()+3600000).toISOString(),not_before:null};
+  else {assert.match(req.url,/\/workflows\/afw-own-qa-private-bootstrap\/instances\/afw-mcp-closure-/);result={status:'complete',step_count:6,output:{status:'blocked',dispatchStatus:'uncertain',nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false},steps:[{name:'one'},{name:'restore-own-closed-canary-1',start:'2026-10-30T16:41:01.564Z',end:'2026-10-30T16:41:01.675Z',success:true},{name:'two'},{name:'three'},{name:'four'},{name:'five'}]};}
+  return Response.json({success:true,errors:[],messages:[],result},{headers:{date:new Date().toUTCString()}});
+ }}));
+ const b=await mf.getBindings(),stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName(slot));
+ async function run(params={operation:'inspect_pre_entry_custody',observationId:id},instance='afw-qa-custody-'+id){
+  const wf=await b.FLOW.create({id:instance,params});let state;const end=Date.now()+22000;
+  do{state=await wf.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
+  assert.equal(state.status,'complete',JSON.stringify(state));return state.output;
+ }
+ return{mf,stub,ns:b.AFW_INDEPENDENT_CLOSURE,run,calls,get held(){return held;},release:()=>release?.()};
+}
+hostTest('fixed native Workflow reaches actual custody actor without consuming Entry or changing history',async()=>{
+ const f=await fixture();try{
+  const before=await f.stub.snapshot();assert.deepEqual(JSON.parse(await f.stub.inherited()),{alarm:{state:'unavailable'},arm:{state:'unavailable'},status:{state:'unavailable'}});
+  const r=await f.run();assert.equal(r.status,'observed');assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);assert.equal(r.scopeVerified,false);
+  assert.equal(f.calls.length,3);assert.equal(await f.stub.snapshot(),before);assert.equal((await f.mf.dispatchFetch('https://synthetic.invalid/')).status,404);
+ }finally{await f.mf.dispose();}
+});
+for(const mode of ['open','expired','bad-source','missing-holder'])hostTest('closed host rejects '+mode,async()=>{const f=await fixture(mode);try{assert.notEqual((await f.run()).status,'observed');assert.equal(f.calls.length,0);}finally{await f.mf.dispose();}});
+hostTest('selector and wrong actor cannot start custody reads',async()=>{const f=await fixture();try{
+ for(const args of [[],['f'.repeat(64)],[id,'b'.repeat(40)],[id,source,{}]])assert.notEqual(JSON.parse(await f.stub.readPreEntryCustody(...args)).status,'observed');
+ const wrong=f.ns.get(f.ns.idFromName('foreign'));assert.notEqual(JSON.parse(await wrong.readPreEntryCustody(id,source)).status,'observed');
+ assert.equal(f.calls.length,0);
+ }finally{await f.mf.dispose();}});
+hostTest('pending read remains exclusive after timeout until underlying operation settles',async()=>{
+ const f=await fixture('hold');try{const r=await f.run();assert.notEqual(r.status,'observed');assert.equal(f.held,true);assert.equal(await f.stub.availability(),false);assert.notEqual(JSON.parse(await f.stub.readPreEntryCustody(id,source)).status,'observed');f.release();let ok=false;for(let n=0;n<200&&!ok;n++){ok=await f.stub.availability();if(!ok)await new Promise(r=>setTimeout(r,10));}assert.equal(ok,true);}finally{f.release();await f.mf.dispose();}
+});
+
+hostTest('loaded wrong credential identity fails closed without mutations',async()=>{const f=await fixture('wrong-holder');try{const before=await f.stub.snapshot();assert.notEqual((await f.run()).status,'observed');assert.equal(await f.stub.snapshot(),before);assert.equal(f.calls.every(x=>x.method==='GET'),true);}finally{await f.mf.dispose();}});
+hostTest('Workflow rejects extra selectors before actor access',async()=>{const f=await fixture();try{const r=await f.run({operation:'inspect_pre_entry_custody',observationId:id,target:'foreign'});assert.equal(r.status,'blocked');assert.equal(f.calls.length,0);}finally{await f.mf.dispose();}});
+
+hostTest('Workflow rejects a malformed actor receipt instead of forwarding it',async()=>{const f=await fixture('forged');try{const r=await f.run();assert.equal(r.status,'blocked');assert.equal(f.calls.length,0);}finally{await f.mf.dispose();}});
+
+hostTest('synthetic inherited RPC inventory remains closed on unscoped calls',async()=>{const f=await fixture();try{const before=await f.stub.snapshot(),inventory=JSON.parse(await f.stub.inheritedInventory());assert.ok(inventory.some(x=>x.name==='arm'));assert.ok(inventory.some(x=>x.name==='alarm'));assert.equal(inventory.some(x=>x.positive),false);assert.equal(await f.stub.snapshot(),before);assert.equal(f.calls.length,0);console.log('SYNTHETIC_INHERITED_RPC_INVENTORY',JSON.stringify(inventory));}finally{await f.mf.dispose();}});
+
+hostTest('fixed wrapper bundles reproducibly with only fixed external boundaries',async()=>{
+ const options={entryPoints:['scripts/qa-finite-pre-entry-custody-wrapper.mjs'],bundle:true,format:'esm',platform:'neutral',target:'es2022',write:false,metafile:true,logLevel:'silent',external:['node:*','cloudflare:*','./closed-rollback.mjs','./pre-entry-custody-context.mjs']};
+ const a=await build(options),b=await build(options),bytes=a.outputFiles[0].contents;assert.deepEqual(bytes,b.outputFiles[0].contents);
+ const output=Object.values(a.metafile.outputs);assert.equal(output.length,1);
+ assert.deepEqual([...output[0].exports].sort(),['IndependentClosure','PrivateQaBootstrap','PrivateQaNamedConfirmation','PrivateQaPreregistration','default'].sort());
+ const imports=output[0].imports;assert.equal(imports.every(x=>x.external&&x.kind==='import-statement'),true);
+ const names=imports.map(x=>x.path);assert.equal(names.includes('./closed-rollback.mjs'),true);assert.equal(names.includes('./pre-entry-custody-context.mjs'),true);assert.equal(names.every(x=>['./closed-rollback.mjs','./pre-entry-custody-context.mjs','node:async_hooks','node:crypto'].includes(x)),true);
+ console.log('CUSTODY_HOST_BUNDLE',JSON.stringify({bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}));
+});
+
+hostTest('Workflow rejects wrong correlation and instance before actor access',async()=>{
+ for(const variant of ['correlation','instance']){
+  const f=await fixture();try{
+   const params={operation:'inspect_pre_entry_custody',observationId:variant==='correlation'?'f'.repeat(64):id};
+   const name=variant==='instance'?'afw-qa-custody-'+'f'.repeat(64):'afw-qa-custody-'+id;
+   assert.equal((await f.run(params,name)).status,'blocked');assert.equal(f.calls.length,0);
+  }finally{await f.mf.dispose();}
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-prearm-profile.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-prearm-profile.test.mjs b/test/mcp-qa-finite-prearm-profile.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-prearm-profile.test.mjs
@@ -0,0 +1,60 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finitePolicyConfigurationFixture} from './fixtures/finite-policy-configuration-data.mjs';
+import {qualifyFiniteConnectionProfile} from '../lib/mcp-qa-finite-connection-profile.mjs';
+import {projectFinitePublicConfiguration} from '../lib/mcp-qa-finite-profile.mjs';
+
+let api;
+try{api=await import('../lib/mcp-qa-finite-prearm-profile.mjs');}catch{/* Missing new module is the causal RED. */}
+const fixture=()=>finitePolicyConfigurationFixture().prearmConfiguration;
+const clone=x=>structuredClone(x);
+const binding=(v,name)=>v.bindings.find(b=>b.name===name);
+
+test('exact original closed prearm is detached frozen DATA',()=>{
+ const metadata=fixture(),originalConfiguration=clone(metadata),before=clone(metadata);
+ assert.equal(typeof api?.qualifyFinitePrearmConfiguration,'function','new closed-prearm qualifier required');
+ const result=api.qualifyFinitePrearmConfiguration({metadata,originalConfiguration});
+ assert.deepEqual(result,before);
+ assert.notStrictEqual(result,metadata);
+ assert(Object.isFrozen(result)&&Object.isFrozen(result.bindings)&&Object.isFrozen(result.bindings[0])&&Object.isFrozen(result.compatibility_flags)&&Object.isFrozen(binding(result,'DELEGATED_RATE_LIMITER').simple));
+ binding(metadata,'ACCESS_AUD').text='changed';
+ assert.deepEqual(result,before);
+ for(const change of [
+  v=>binding(v,'ACCESS_AUD').text='other-aud',
+  v=>binding(v,'AFW_OAUTH_PILOT_EXPIRES_AT').text='2026-11-03T03:00:00.000Z',
+  v=>binding(v,'DELEGATED_RATE_LIMITER').simple.limit=9,
+  v=>binding(v,'AFW_OAUTH_PILOT_PROJECT_ID').text='different-project',
+  v=>binding(v,'AFW_OAUTH_PILOT_CLIENT_ID').text='different-client'
+ ]){const changed=fixture();change(changed);assert.throws(()=>api.qualifyFinitePrearmConfiguration({metadata:changed,originalConfiguration:fixture()}));}
+});
+
+test('closed prearm never passes the full projection',()=>{
+ const metadata=fixture();
+ assert.throws(()=>projectFinitePublicConfiguration({role:'canaryLive',metadata}));
+ assert.throws(()=>qualifyFiniteConnectionProfile({phase:'finite_prearm',metadata}));
+});
+
+test('strict data rejects hidden capabilities without evaluating accessors',()=>{
+ assert.equal(typeof api?.qualifyFinitePrearmConfiguration,'function','new closed-prearm qualifier required');
+ const q=api.qualifyFinitePrearmConfiguration;
+ const normal=()=>({metadata:fixture(),originalConfiguration:fixture()});
+ const bad=[
+  x=>{x.extra=true;},
+  x=>{x.metadata.extra=true;},
+  x=>{x.metadata.bindings[0].extra=true;},
+  x=>{x.metadata.bindings[0].lease=()=>{};},
+  x=>{x.metadata.env={};},
+  x=>{x.metadata.bindings[0].name='x'.repeat(32769);},
+  x=>{x.metadata.bindings[1]=()=>{};},
+  x=>{Object.setPrototypeOf(x.metadata,{});},
+  x=>{x.metadata.bindings.length++;},
+  x=>{x.metadata[Symbol('capability')]=true;}
+ ];
+ for(const mutate of bad){const x=normal();mutate(x);assert.throws(()=>q(x));}
+ let calls=0;
+ for(const target of ['input','metadata','binding']){
+  const x=normal(),v=target==='input'?x:target==='metadata'?x.metadata:x.metadata.bindings[0];
+  Object.defineProperty(v,target==='input'?'metadata':target==='metadata'?'bindings':'name',{enumerable:true,get(){calls++;throw Error('getter ran');}});
+  assert.throws(()=>q(x));assert.equal(calls,0);
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-cleanup-build.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-cleanup-build.test.mjs b/test/mcp-qa-finite-preparation-cleanup-build.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-cleanup-build.test.mjs
@@ -0,0 +1,31 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {execFileSync} from 'node:child_process';
+import {readFile} from 'node:fs/promises';
+import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
+const sha=v=>createHash('sha256').update(v).digest('hex');
+test('one actual changed-graph compiler/residency check remains closed with original size ceilings',async()=>{
+ const sourceRevision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision});
+ assert.equal(r.sourceRevision,sourceRevision);assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
+ for(const path of ['lib/mcp-qa-finite-preparation-cleanup-records.mjs','lib/mcp-qa-finite-preparation-cleanup.mjs','lib/mcp-qa-finite-initial-anchors.mjs']){
+  assert(r.metafiles.qaLive.inputs[path]);
+  console.log('SOURCE '+path+' sha256='+sha(await readFile(path)));
+ }
+ // Pure DATA helpers may occur in the shared graph. Full QA-only sources and
+ // actual embedded M payload must still be absent from canary.
+ for(const path of ['lib/mcp-qa-finite-bootstrap-source.mjs','lib/mcp-qa-finite-candidate-residency.mjs']){
+  assert(r.metafiles.qaLive.inputs[path]);assert.equal(r.metafiles.canaryLive.inputs[path],undefined);
+ }
+ assert(!r.files['canaryLive/index.mjs'].includes(Buffer.from(r.candidateResidency.content)));
+ for(const role of ['qaLive','canaryLive']){
+  for(const output of Object.values(r.metafiles[role].outputs))assert(output.imports.every(x=>!/^node:fs(?:\/|$)/.test(x.path)));
+  assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('build-finite-native-package')&&!x.includes('bootstrap-issuer')&&!x.includes('node_modules/esbuild')));
+  const bytes=r.files[role+'/index.mjs'];assert(bytes.length<=(role==='canaryLive'?2097152:3145728));
+  assert.equal(sha(bytes),r.modules[role].module.sha256);
+  console.log('ACTUAL MODULE '+role+' bytes='+bytes.length+' sha256='+sha(bytes));
+ }
+ assert.equal(r.candidateResidency.module.sha256,r.modules.canaryLive.module.sha256);assert(r.files['qaLive/index.mjs'].includes(Buffer.from(r.candidateResidency.content)));
+ assert(r.candidateResidency.compressedBytes<=2098176);
+ for(const path of ['lib/mcp-qa-finite-policy-transport.mjs','lib/mcp-qa-finite-initial-cleanup.mjs'])console.log('SOURCE '+path+' sha256='+sha(await readFile(path)));
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-cleanup-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-cleanup-native.test.mjs b/test/mcp-qa-finite-preparation-cleanup-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-cleanup-native.test.mjs
@@ -0,0 +1,91 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const P='afw.finite-preparation-cleanup.v1:';
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
+async function world(fn,mode='enrollment'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('causal: genuine owner POST consumes admission for actual original native capsule, enrolls once, remains pending without owner SEND',()=>world(async f=>{
+ const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]);
+ const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
+ f.nowOffset=capsule.I0+400000-Date.now();
+ const screen=await plain(f.stub.enrollmentScreen(token));
+ assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
+ assert.equal(screen.preconnectionId,capsule.preconnectionId);
+ const r=await plain(f.stub.enrollmentPost(token,screen));assert.equal(r.status,undefined,JSON.stringify(r));assert.equal(r.prepared.status,202);assert.match(r.result.admitted,/^[a-f0-9]{64}$/);
+ assert.equal(r.result.outcome.status,'admin_pending');
+ const rows=await plain(f.stub.snapshot());assert.equal(rows.filter(([k])=>k.startsWith(P)).length,2);
+ assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+ assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
+ for(const [k,v]of before)assert.deepEqual(rows.find(([key])=>key===k)?.[1],v);
+ assert.equal(await f.stub.alarmInfo(),capsule.C0);
+}));
+
+async function enroll(f,mode='normal',generic=false){
+ const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]);
+ const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
+ f.nowOffset=capsule.I0+400000-Date.now();const screen=await plain(f.stub.enrollmentScreen(token,generic));
+ assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
+ const result=await plain(f.stub.enrollmentPost(token,screen,mode));return {result,capsule,before,screen,token};
+}
+test('generic first GET remains a genuine admitted mismatched-selector negative',()=>world(async f=>{
+ const {result,capsule}=await enroll(f,'normal',true);
+ assert.equal(result.prepared.status,202);assert.notEqual(result.prepared.preconnectionId,capsule.preconnectionId);assert.match(result.result.admitted,/^[a-f0-9]{64}$/);
+ assert.equal(result.result.outcome.status,'admin_pending');assert.equal((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)).length,0);
+ assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+}));
+for(const mode of ['throw-enrollment','throw-ack','sync-reject','readback-lost','alarm-lost','ack-readback-lost','ack-sync-reject','ack-alarm-lost'])test('native '+mode+' is pending, immutable and never an owner forward',()=>world(async f=>{
+ const {result,capsule,screen,token}=await enroll(f,mode);assert.equal(result.result.outcome.status,'admin_pending');
+ const rows=await plain(f.stub.snapshot()),enrolled=rows.filter(([k])=>k.startsWith(P));
+ assert(enrolled.length>=1&&enrolled.length<=2);
+ assert.equal((await plain(f.stub.enrollmentPost(token,screen))).status,'unavailable','used ticket cannot mint or reconstruct admission');
+ assert.deepEqual((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)),enrolled);
+ assert.equal(await f.stub.alarmInfo(),capsule.C0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+ assert.equal((await plain(f.stub.enrollmentRead())).enrollment.capsuleHash,capsule.capsuleHash,'lost ACK remains factual DATA');
+ f.alarmMode='normal';const outcome=await plain(f.alarmAt(capsule.C0+1));
+ assert.equal(outcome.status,'restored','SYN/manual existing native alarm event must still recover closed_ui');
+ assert.equal(f.restores.length,1);
+}));
+for(const mode of ['hold-enrollment','hold-ack','sync-hold','readback-hold'])test('actual '+mode+' after native commit stays in original scope until external release',()=>world(async f=>{
+ const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]),source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
+ f.nowOffset=capsule.I0+400000-Date.now();const screen=await plain(f.stub.enrollmentScreen(token)),work=plain(f.stub.enrollmentPost(token,screen,mode));
+ for(let i=0;i<200;i++){if((await plain(f.stub.stats())).held)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await plain(f.stub.stats())).held,true,'hold is after actual native transaction return');
+ const result=await work;assert.equal(result.result.outcome.status,'admin_pending');assert.equal((await plain(f.stub.probeStageAvailability())).available,false);
+ assert.deepEqual(await plain(f.stub.enrollmentProbe()),{requestAllowed:false,readAllowed:false});
+ const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k===P+'enrollment'));assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+ await f.stub.release();
+ for(let i=0;i<200;i++){if((await plain(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await plain(f.stub.probeStageAvailability())).available,true);assert.deepEqual(await plain(f.stub.snapshot()),rows);
+}));
+test('native reconstruction, noAck and advanced delivery1/2 preserve original zero-state commitment/C0/C1',()=>world(async f=>{
+ const {capsule}=await enroll(f,'throw-enrollment');
+ await f.restart();
+ assert.equal((await plain(f.stub.enrollmentRead())).ack,null);
+ f.alarmMode='active-container';assert.equal((await plain(f.alarmAt(capsule.C0+1))).status,'admin_pending');
+ let rows=await plain(f.stub.snapshot()),state=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:state')[1]);assert.equal(state.deliveries,1);assert.equal(await f.stub.alarmInfo(),capsule.C0+60000);
+ assert.equal((await plain(f.stub.enrollmentRead())).enrollment.capsuleHash,capsule.capsuleHash);
+ f.alarmMode='normal';assert.equal((await plain(f.alarmAt(capsule.C0+60001))).status,'restored');
+ rows=await plain(f.stub.snapshot());state=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:state')[1]);assert.equal(state.deliveries,2);assert.equal(state.status,'complete');
+ assert.equal(JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]).C1,capsule.C1);assert.equal(f.restores.length,1);
+},'enrollment-restart'));
+for(const corruption of ['orphan','hash','unknown','head','policy','permission','foreign'])test('factual '+corruption+' obligation refuses restoration and all forwards',()=>world(async f=>{
+ const {capsule}=await enroll(f);
+ await f.stub.enrollmentCorrupt(corruption);
+ assert.equal((await plain(f.stub.enrollmentRead())).status,'unavailable');
+ assert.equal((await plain(f.alarmAt(capsule.C0+1))).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+}));
+
+for(const mode of ['source-drift','holder-drift','qa-drift','clock-backward','clock-forward','clone-admission','wrong-stage'])test('genuine original owner decision refuses '+mode+' without any cleanup DATA or forward',()=>world(async f=>{
+ const {result}=await enroll(f,mode);
+ assert.equal((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)).length,0);
+ assert.equal((await plain(f.stub.snapshot())).filter(([k])=>k.endsWith(':connection:approval')).length,1,'actual signed POST/CSRF precedes boundary refusal');
+ if(result.result)assert.equal(result.result.outcome.status,'admin_pending');else assert.equal(result.status,'unavailable');
+ assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+}));
+
+for(const pin of ['absent','foreign','malformed','accessor'])test('SYN malformed compiled DATA descriptor '+pin+' fails after real original admission without a row or forward',()=>world(async f=>{
+ const {result}=await enroll(f);
+ assert.equal(result.prepared.status,202);assert.match(result.result.admitted,/^[a-f0-9]{64}$/);assert.equal(result.result.outcome.status,'admin_pending');
+ assert.equal((await plain(f.stub.snapshot())).filter(([k])=>k.startsWith(P)).length,0);
+ assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+},'enrollment-pin-'+pin));

~~~~~~~~~~

## test/mcp-qa-finite-preparation-cleanup-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-cleanup-records.test.mjs b/test/mcp-qa-finite-preparation-cleanup-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-cleanup-records.test.mjs
@@ -0,0 +1,22 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {FINITE_PREPARATION_CLEANUP_PREFIX as P,sealFinitePreparationCleanupRecord as seal,encodeFinitePreparationCleanupRecord as encode,decodeFinitePreparationCleanupRecord as decode} from '../lib/mcp-qa-finite-preparation-cleanup-records.mjs';
+import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
+const I0=1000000,C0=I0+900000,C1=C0+180000,h='a'.repeat(64),m='b'.repeat(40),v='11111111-1111-4111-8111-111111111111';
+function input(){return {capsuleHash:h,planHash:h,armAckHash:h,activationCompletionHash:h,entryHash:h,materialHash:h,sourceRevision:m,sourceTree:m,qaVersionId:v,initialInstanceId:'afw-finite-initial-'+h,actorId:h,preconnectionId:h,I0,C0,C1,readerId:'9aa97ad1fc9afe3021cf69ea497d5190',publisherId:'05718105dcdfc92e55cc3624172c2740',readerExpiresAt:C1,publisherExpiresAt:C1,manifestHash:h,baselineVersionId:QA_CLOUD_CLOSED_PINS.canary.id,baselineDeploymentId:QA_CLOUD_CLOSED_PINS.canary.deploymentId,ownerSourceHash:h,preconnectionHash:h,stageApprovalHash:h,configurationApprovalHash:h,issuedAt:I0+400000,deadline:I0+405000};}
+test('bounded immutable canonical domain-separated DATA exports only Enrollment/Ack',()=>{
+ assert.equal(P,'afw.finite-preparation-cleanup.v1:');
+ for(const [kind,value]of [['Enrollment',input()],['Ack',{enrollmentHash:h,stateHash:h,alarmAt:C0,acknowledgedAt:I0+401000}]]){
+  const sealed=seal(kind,value),raw=encode(kind,sealed);assert.deepEqual(decode(kind,raw),sealed);assert(Object.isFrozen(sealed));assert(Buffer.byteLength(raw)<=8192);
+  assert.throws(()=>decode(kind,raw+' '));assert.throws(()=>decode(kind,raw.replace(sealed.recordHash,'f'.repeat(64))));
+  assert.throws(()=>seal(kind,{...value,unknown:true}));assert.throws(()=>seal('Send',value));assert.throws(()=>seal(kind,{...value,purpose:sealed.purpose}));
+ }
+});
+test('reject accessors/prototypes/symbols/toJSON before executing user code',()=>{
+ let executed=0;
+ for(const value of [Object.assign(Object.create({}),input()),Object.assign(input(),{[Symbol('foreign')]:1}),Object.assign(input(),{toJSON(){executed++;}}),Object.defineProperty(input(),'capsuleHash',{enumerable:true,get(){executed++;return h;}})])assert.throws(()=>seal('Enrollment',value));
+ assert.equal(executed,0);assert.throws(()=>decode('Enrollment',' '.repeat(8193)));
+});
+test('fixed pins, hashes, time grammar and same existing <=5s/C0 boundary',()=>{
+ for(const patch of [{sourceRevision:h},{actorId:'slot'},{preconnectionId:m},{initialInstanceId:'new-owner'},{readerId:'0'.repeat(32)},{readerExpiresAt:C1-1},{publisherExpiresAt:C1-1},{C0:C0+1},{C1:C1+1},{issuedAt:NaN},{deadline:I0+405001},{deadline:I0+400000},{issuedAt:C0-1,deadline:C0+1},{baselineVersionId:v}])assert.throws(()=>seal('Enrollment',{...input(),...patch}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-issuer-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-issuer-native.test.mjs b/test/mcp-qa-finite-preparation-issuer-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-issuer-native.test.mjs
@@ -0,0 +1,77 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+async function scenario(t,name,extra={}){
+ const built=await build({entryPoints:['test/fixtures/finite-preparation-issuer-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'issuer-component'},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-issuer-component'}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,...extra})});assert.equal(response.status,200);return response.json();
+}
+for(const fault of ['missing_schema','tamper_schema','unsupported_clock','unsupported_iso'])test('REAL native preflight denies '+fault+' before effects',async t=>{
+ const {result:r}=await scenario(t,fault);assert.equal(r.rejected,true);assert.deepEqual(r.consents??r.rows.consents.results,[]);
+});
+test('REAL closed-first monotonic tombstone permits early reduction and blocks delayed OPEN',async t=>{
+ const {result:r,identity:i}=await scenario(t,'schema');assert.equal(r.error,undefined);assert.equal(r.barrier.status,'fenced');assert.ok(r.barrier.row.fenced_at<i.C0);assert.equal(r.delayedOpen,true);
+ for(const k of ['noDelete','immutable','noReopen','noReterminal','collision'])assert.equal(r[k],true,k);
+ assert.equal(r.rows.fences.results.length,1);assert.deepEqual(r.rows.consents.results,[]);assert.deepEqual(r.rows.grants.results,[]);
+});
+test('REAL OPEN then terminal close prevents late authorization',async t=>{
+ const {result:r}=await scenario(t,'open_then_close');assert.equal(r.error,undefined);assert.equal(r.open.status,'applied');assert.equal(r.barrier.status,'fenced');assert.equal(r.authorization.status,'no_mutation');
+});
+for(const kind of ['consent_queue','C0_queue','deadline_queue'])test('SYN queue REAL native DB clock denies stale consumedAt beyond '+kind,async t=>{
+ const {result:r}=await scenario(t,kind);assert.equal(r.error,undefined);assert.equal(r.consumption,null);assert.equal(r.rows.consents.results[0].consumed_at,'');assert.deepEqual(r.rows.grants.results,[]);
+});
+test('SYN queue REAL SQL grant expiry denies actual late grant without repairing consumed consent',async t=>{
+ const {result:r}=await scenario(t,'grant_expiry_queue');assert.equal(r.error,undefined);assert.equal(r.grant.status,'no_mutation');assert.notEqual(r.rows.consents.results[0].consumed_at,'');assert.deepEqual(r.rows.grants.results,[]);
+});
+test('REAL consumption UPDATE RETURNING privately witnesses same-instance surviving one-use grant',async t=>{
+ const {result:r}=await scenario(t,'witness');assert.equal(r.error,undefined);
+ for(const k of ['cloneDenied','rebuiltDenied','foreignDenied','leaseDenied','replayDenied'])assert.equal(r[k],true,k);assert.equal(r.grant.status,'applied');assert.equal(r.rows.grants.results.length,1);
+});
+test('REAL serialized barrier orders future grant to zero and makes exact absence meaningful',async t=>{
+ const {result:r}=await scenario(t,'grant_after_barrier');assert.equal(r.error,undefined);assert.equal(r.grant.status,'no_mutation');assert.equal(r.observation.status,'absent');
+});
+test('REAL unknown fence ACK reconciles same original ID on fresh primary before absence',async t=>{
+ const {result:r,events}=await scenario(t,'unknown_fence');assert.equal(r.error,undefined);assert.equal(r.unknown,true);assert.equal(r.lookupBeforeBarrier,true);assert.equal(r.foreignReconcile,true);assert.equal(r.observation.status,'absent');
+ const fenceReads=events.filter(e=>e.sql?.includes('SELECT f.*'));assert.ok(fenceReads.length>=2);
+ for(const read of fenceReads)assert.equal(events.find(e=>e.sid===read.sid),read,'barrier SELECT is FIRST query of new first-primary session');
+});
+for(const mode of ['normal','held_grant_ack','history'])test('REAL original UUID grant-only cleanup '+mode+' preserves unrelated rows/history',async t=>{
+ const {result:r}=await scenario(t,mode);assert.equal(r.error,undefined);assert.equal(r.clonedBarrierDenied,true);assert.equal(r.clonedObservationDenied,true);assert.equal(r.unrelatedUnchanged,true);
+ if(mode==='held_grant_ack')assert.equal(r.barrierBeforeGrantAck,true);assert.equal(r.revoke.status,mode==='history'?'already_revoked':'revoked');assert.ok(r.rows.grants.results.find(g=>g.id!=='unrelated').revoked_at);if(mode==='history')assert.ok(r.revoke.row.exchanged_at);
+});
+test('REAL foreign project revision fails closed after barrier',async t=>{
+ const {result:r}=await scenario(t,'foreign_owner');assert.match(r.error,/unavailable/);assert.equal(r.rows,undefined);
+});
+test('REAL journal native transaction final return sync exact readback produces append-once facts',async t=>{
+ const {result:r}=await scenario(t,'journal');assert.equal(r.error,undefined);assert.equal(r.append.status,'recorded');assert.equal(r.existing.status,'existing');assert.equal(r.data.reservation.recordHash,r.append.recordHash);assert.equal(r.rows.length,1);
+});
+for(const fault of ['final_throw','sync_loss','post_commit_hold','readback_loss'])test('SYN '+fault+' after REAL native journal commit permits no next SQL issue',async t=>{
+ const {result:r}=await scenario(t,'journal',{fault});assert.equal(r.error,undefined);assert.equal(r.txCommitted,true);assert.equal(r.append.status,'uncertain');assert.equal(r.sqlBefore,r.sqlAfter);assert.equal(r.rows.length,1);
+});
+
+test('SYN native callback final throw rolls back journal and permits no SQL continuation',async t=>{
+ const {result:r}=await scenario(t,'journal',{fault:'callback_throw'});assert.equal(r.error,undefined);assert.equal(r.txCommitted,false);assert.equal(r.append.status,'uncertain');assert.equal(r.sqlBefore,r.sqlAfter);assert.equal(r.rows.length,0);
+});
+test('REAL exact grant immutable field mismatches all fail closed without rewriting history',async t=>{
+ const {result:r}=await scenario(t,'foreign_grants');assert.equal(r.error,undefined);for(const [field,denied]of Object.entries(r.denials))assert.equal(denied,true,field);assert.equal(Object.keys(r.denials).length,7);assert.equal(r.rows.grants.results[0].revoked_at,'');
+});
+
+test('REAL expired original grant and consent are reduced after C0 within original cleanup C1',async t=>{
+ const {result:r,identity:i}=await scenario(t,'expired_cleanup');assert.equal(r.error,undefined);assert.ok(r.barrier.row.fenced_at>=i.C0);assert.ok(r.barrier.row.fenced_at>=Date.parse(i.consentExpiresAt));assert.equal(r.revoke.status,'revoked');assert.equal(r.revoke.row.expires_at,i.consentExpiresAt);
+});
+
+test('REAL journal append-once send ACK freeze rejects replacement grant ID and unknown keys',async t=>{
+ const {result:r}=await scenario(t,'journal_chain');assert.equal(r.error,undefined);
+ for(const name of ['send','ack','freeze','cleanupSend'])assert.equal(r[name].status,'recorded',name);
+ for(const name of ['frozenGrant','replacement'])assert.equal(r[name].status,'uncertain',name);
+ assert.equal(r.chain.operations.open_fence.send.recordHash,r.chain.operations.open_fence.ack.sendHash);assert.equal(r.chain.operations.grant.send,null);assert.equal(r.unknownDenied,true);
+});
+
+for(const target of ['open','consume','grant'])test('REAL barrier beats SYN queued original '+target+' SQL without reopening',async t=>{
+ const {result:r}=await scenario(t,'queued_barrier',{target});assert.equal(r.error,undefined);assert.equal(r.barrier.status,'fenced');assert.equal(r.rows.fences.results.length,1);assert.equal(r.rows.fences.results[0].fence_request_id,r.barrier.row.fence_request_id);assert.deepEqual(r.rows.grants.results,[]);
+ if(target==='open')assert.equal(r.pending.rejected,true);else if(target==='consume')assert.equal(r.pending.value,null);else assert.equal(r.pending.value.status,'no_mutation');
+});
+for(const mode of ['authorization_queue','open_queue','deadline_grant_queue','C0_grant_queue'])test('REAL native execution fence rejects SYN late '+mode,async t=>{
+ const {result:r}=await scenario(t,mode);assert.equal(r.error,undefined);assert.equal((r.operation??r.grant).status,'no_mutation');assert.deepEqual(r.rows.grants.results,[]);if(mode==='authorization_queue')assert.deepEqual(r.rows.consents.results,[]);if(mode==='open_queue')assert.deepEqual(r.rows.fences.results,[]);
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-issuer-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-issuer-records.test.mjs b/test/mcp-qa-finite-preparation-issuer-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-issuer-records.test.mjs
@@ -0,0 +1,48 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+test('issuer strict codec new interface exists',async()=>{
+ const api=await import('../lib/mcp-qa-finite-preparation-issuer-records.mjs');
+ for(const name of ['sealFinitePreparationIssuerRecord','encodeFinitePreparationIssuerRecord','decodeFinitePreparationIssuerRecord'])assert.equal(typeof api[name],'function');
+ assert.equal(api.FINITE_PREPARATION_ISSUER_PREFIX,'afw.finite-preparation-issuer.v1:');
+});
+test('issuer new monotonic schema exists and plain open cannot replace tombstone',async()=>{
+ const sql=await readFile('db/finite-preparation-issuer-fences.sql','utf8');
+ for(const word of ['finite_preparation_issuer_fences','no_delete','immutable_identity','terminal_fence'])assert.ok(sql.includes(word));
+});
+test('issuer new fixed native factories exist without ordinary fallback',async()=>{
+ for(const [file,name] of [['journal','createFinitePreparationIssuerJournal'],['store','createFinitePreparationIssuerStore']]){
+  const api=await import('../lib/mcp-qa-finite-preparation-issuer-'+file+'.mjs');assert.equal(typeof api[name],'function');
+ }
+});
+
+import {createHash} from 'node:crypto';
+import {initialCanonical as canonical} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {sealFinitePreparationIssuerRecord as seal,encodeFinitePreparationIssuerRecord as encode,decodeFinitePreparationIssuerRecord as decode} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {FINITE_PREPARATION_ISSUER_SCHEMA as schema} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111';
+const identity=()=>seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:H,subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:H,grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:'2026-11-02T00:15:00.000Z',I0:Date.parse('2026-11-02T00:00:00Z'),C0:Date.parse('2026-11-02T00:15:00Z'),C1:Date.parse('2026-11-02T00:18:00Z'),reservedAt:Date.parse('2026-11-02T00:00:01Z')});
+const reservation=()=>seal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:identity(),requestHash:H,issuedAt:Date.parse('2026-11-02T00:00:01Z'),deadline:Date.parse('2026-11-02T00:00:05Z')});
+test('issuer canonical domain own-data strict roundtrip is DATA not live capsule',()=>{
+ const r=reservation(),body={...r};delete body.recordHash;
+ assert.equal(r.recordHash,createHash('sha256').update(r.purpose+'\n'+canonical(body)).digest('hex'));assert.deepEqual(decode('Reservation',encode('Reservation',r)),r);
+ for(const op of ['open_fence','authorization','consume','grant','close_fence','revoke_grant']){
+  const s=seal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,operation:op,requestId:['close_fence','revoke_grant'].includes(op)?U:null,requestHash:H,issuedAt:r.issuedAt,deadline:r.deadline});
+  assert.deepEqual(decode('Send',encode('Send',s)),s);
+  const a=seal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:s.recordHash,rowHash:null,outcome:'no_mutation',observedAt:r.issuedAt+1});assert.deepEqual(decode('Ack',encode('Ack',a)),a);
+ }
+ const f=seal('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,frozenAt:r.identity.C0});assert.deepEqual(decode('Freeze',encode('Freeze',f)),f);
+});
+test('issuer rejects unknown/prototype/accessor/symbol before getters',()=>{
+ let reads=0;const r=reservation(),bad=Object.defineProperty({...r},'identity',{enumerable:true,get(){reads++;return r.identity;}});
+ for(const v of [bad,Object.setPrototypeOf({...r},{}),{...r,[Symbol('x')]:1},{...r,extra:true}])assert.throws(()=>encode('Reservation',v));
+ assert.equal(reads,0);assert.throws(()=>decode('Reservation',' '+encode('Reservation',r)));assert.throws(()=>decode('Reservation',' '.repeat(16385)));assert.throws(()=>encode('Reservation',{...r,recordHash:H}));
+});
+for(const [key,value]of [['C0',0],['grantId','fresh-id'],['projectRevision',0],['resource','https://other.invalid/mcp'],['requestedScopes',['afw:write']],['consentExpiresAt','2026-11-02T00:15:00Z'],['reservedAt',0]]){
+ test('issuer rejects invalid identity '+key,()=>assert.throws(()=>seal('Identity',{...identity(),[key]:value})));
+}
+test('source SQL schema and exact preflight definitions agree by content',async()=>{
+ const sql=await readFile('db/finite-preparation-issuer-fences.sql','utf8');
+ assert.equal(sql.replace(/^--[^\n]*\n/,''),schema.join(';\n\n')+';\n');
+ console.log('issuer-schema-sha256='+createHash('sha256').update(sql).digest('hex'));
+});

~~~~~~~~~~
