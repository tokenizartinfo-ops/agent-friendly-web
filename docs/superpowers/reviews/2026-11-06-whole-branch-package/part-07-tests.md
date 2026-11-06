# Whole-branch review packet 7/26 — tests

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 37 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- test/mcp-qa-finite-cf-http.test.mjs: ABSENT -> 57614b84a995c1771d8236be16beee4f1d58145c; full diff chars=4914
- test/mcp-qa-finite-cleanup-store.test.mjs: ABSENT -> 3b29fdce4f1e7cf38b8271cb1f8a2456efffe02d; full diff chars=3055
- test/mcp-qa-finite-command.test.mjs: ABSENT -> 2f8eecbf8972ec6fd4ab2c9d2e8e37a8cb627e87; full diff chars=8778
- test/mcp-qa-finite-confirmation-native.test.mjs: ABSENT -> 3600961dc96c8615189e25ed77e5d2a08856e061; full diff chars=9973
- test/mcp-qa-finite-connection-preparation-native.test.mjs: ABSENT -> dd229853a5eb26c42e80beb59ed4a9992f4a7a35; full diff chars=1582
- test/mcp-qa-finite-custody.test.mjs: ABSENT -> 23884857ef2a50b5cb833fddde75d775abad7ffc; full diff chars=2214
- test/mcp-qa-finite-finalizer.test.mjs: ABSENT -> 37a71ad56c00d77604e1485ecffd34bbd7dfc234; full diff chars=6552
- test/mcp-qa-finite-first-connection-publication-native.test.mjs: ABSENT -> 1298bb5b67749df0d7ee20c863b691562e6a81b9; full diff chars=57817
- test/mcp-qa-finite-first-connection-publication.test.mjs: ABSENT -> 9af1accd0ec533c5d7ab0dd445eda5f2a801d686; full diff chars=17413
- test/mcp-qa-finite-historical-source-native.test.mjs: ABSENT -> a4464db2b94ad1b7825f032d3d54a8b990e881b8; full diff chars=30020
- test/mcp-qa-finite-http.test.mjs: ABSENT -> 660ef1dd9aa914156229cda487497bb9321d9358; full diff chars=9182
- test/mcp-qa-finite-initial-activation-wire-native.test.mjs: ABSENT -> 7764b42084bba0b9b6fa568f7c0f8bf00a878553; full diff chars=2170
- test/mcp-qa-finite-initial-capsule-native.test.mjs: ABSENT -> d4f268d2674f024fa9410c1f8c71144f58e25cb2; full diff chars=9790
- test/mcp-qa-finite-initial-capsule-records.test.mjs: ABSENT -> a077b031d7c2b9273f3159cdd6b00bd050b9e145; full diff chars=3869
- test/mcp-qa-finite-initial-cleanup-native.test.mjs: ABSENT -> 8766bc9d325aa6aa6c19dd6ae1b4a1addfb8e337; full diff chars=20767
- test/mcp-qa-finite-initial-cleanup-records.test.mjs: ABSENT -> e92d2ad82e9d84d0a49075a539f9ff136a23f9c2; full diff chars=1580
- test/mcp-qa-finite-initial-custody-probe-native.test.mjs: ABSENT -> 51d273aa43b1a72186191208301e7cdb8338ddbd; full diff chars=5693
- test/mcp-qa-finite-initial-entry-native.test.mjs: ABSENT -> 2f9f22d8e34180a3eab2428229293e4dc47958a6; full diff chars=8606
- test/mcp-qa-finite-initial-entry-records.test.mjs: ABSENT -> cddee3cd987b32774e3e62a30cbde5cc1e78ce2f; full diff chars=1522
- test/mcp-qa-finite-initial-gates-native.test.mjs: ABSENT -> 2268c64fc8e1b5974056c1832265cbbf2f180fed; full diff chars=7858
- test/mcp-qa-finite-initial-history-schema-native.test.mjs: ABSENT -> ecc77d05e4c4c41174077f3c4212712f59be04da; full diff chars=1876
- test/mcp-qa-finite-initial-material-native.test.mjs: ABSENT -> 7f98bfe8cfe169ef1261f6c15ce9d08df9214d22; full diff chars=22529
- test/mcp-qa-finite-initial-material-records.test.mjs: ABSENT -> 348b81d9de25be0b58c6987d1fad86857066be8d; full diff chars=1136
- test/mcp-qa-finite-initial-old-guard-native.test.mjs: ABSENT -> 3e50bc1e4618016fea66c2b41fcc9a88614ff99d; full diff chars=1415
- test/mcp-qa-finite-initial-owner-source-native.test.mjs: ABSENT -> 26f773d460038d07bd4adf9e3461d489236126f6; full diff chars=9175
- test/mcp-qa-finite-initial-owner-source-records.test.mjs: ABSENT -> 15159977e639d821cf683a1e6005a1f501f0ed7c; full diff chars=1971
- test/mcp-qa-finite-initial-scope.test.mjs: ABSENT -> 8fff51e4b130a273fa93841b07b7e5c729a63df7; full diff chars=3041
- test/mcp-qa-finite-initial-upload-native.test.mjs: ABSENT -> 59c65f23ce15c7d0b5b1e1b93428c413060a5523; full diff chars=10807
- test/mcp-qa-finite-initial-upload-records.test.mjs: ABSENT -> ea74b7a415d5bdab6a315ff37e34b2c49a947e49; full diff chars=2589
- test/mcp-qa-finite-initial-workflows-native.test.mjs: ABSENT -> 00e807233224c80bd244e8a97d5a9d5095e6aba9; full diff chars=1319
- test/mcp-qa-finite-launch-inventory-native.test.mjs: ABSENT -> 090b3461e6a884788bd6d79f7d392190d4e0cb9e; full diff chars=26168
- test/mcp-qa-finite-launch-native.test.mjs: ABSENT -> 9a9d4ba546e34106edba9ad1b680d08c3c308135; full diff chars=19895
- test/mcp-qa-finite-launch-records.test.mjs: ABSENT -> 074bf954fc23c819e2d50412ebfd648ba0e49290; full diff chars=5735
- test/mcp-qa-finite-launcher-native.test.mjs: ABSENT -> d7192d32f359ffe92f8d5c0eb81a3a19dd3115c0; full diff chars=7714
- test/mcp-qa-finite-observer-native.test.mjs: ABSENT -> 3a41c4ac1dd3b9ce8ff0a9d403f4055f24e6b772; full diff chars=8551
- test/mcp-qa-finite-observer.test.mjs: ABSENT -> 368c94de3eb9c41ab61c1a8842aae958e96979a0; full diff chars=4242
- test/mcp-qa-finite-owner-context.test.mjs: ABSENT -> 64d27495fc474de619ceee0d5792f515921afb2a; full diff chars=6401

## test/mcp-qa-finite-cf-http.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-cf-http.test.mjs b/test/mcp-qa-finite-cf-http.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-cf-http.test.mjs
@@ -0,0 +1,48 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {cfFiniteFixture} from './fixtures/finite-cf-http.mjs';
+import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
+test('real fixed HTTP adapters recover terminal proof, perform one QA POST and separate GET-only readback',async()=>{
+ const f=await cfFiniteFixture(),a=f.adapters();
+ const r=await createPrivateQaFiniteTrialFinalizer({plan:f.p,readSnapshot:a.readSnapshot,claim:a.claim,deployClosed:a.deployClosed,now:f.base.f.now,signal:new AbortController().signal}).run();
+ assert.equal(r.status,'restored_observed');assert.equal(f.state.posts,1);
+ assert.ok(f.requests.some(x=>x.url.includes('/versions/77777777-7777-4777-8777-777777777777')));
+ const cfPosts=f.requests.filter(x=>x.method==='POST'&&x.url.includes('api.cloudflare.com'));
+ assert.equal(cfPosts.length,1);assert.ok(cfPosts[0].url.endsWith('/workers/scripts/agent-friendly-web-independent-closure-qa/deployments'));
+ const canary='agent-friendly-web-delegated-canary';
+ const pointerIndex=f.requests.findIndex(x=>x.url.includes('/scripts/'+canary+'/deployments'));
+ const metadataIndex=f.requests.findIndex(x=>x.url.includes('/workers/'+canary+'/versions/'+f.p.deployments.canaryClosed.versionId));
+ assert(pointerIndex>=0&&metadataIndex>pointerIndex);
+ assert(!f.requests.some(x=>x.url.includes('/workers/'+canary+'/versions/'+f.p.deployments.canaryLive.versionId)));
+ assert.equal(f.requests.some(x=>/\/d1\/|\/durable_objects\/.*\/invoke/.test(x.url)),false);
+});
+for(const mode of ['bad-token','bad-scope','wrong-first','wrong-native'])test('actual CF grammar rejects '+mode+' before GitHub effect fence',async()=>{
+ const f=await cfFiniteFixture();f.state.mode=mode;const a=f.adapters();
+ const r=await createPrivateQaFiniteTrialFinalizer({plan:f.p,readSnapshot:a.readSnapshot,claim:a.claim,deployClosed:a.deployClosed,now:f.base.f.now,signal:new AbortController().signal}).run();
+ assert.equal(r.status,'admin_pending');assert.equal(f.gh.refPosts,0);assert.equal(f.state.posts,0);
+});
+test('successful first-step output is readable while observer stays active; technical only',async()=>{
+ const f=await cfFiniteFixture();f.state.observerStatus='running';let preview;try{preview=await f.observer().preview();}catch{assert.fail('synthetic seed path stopped at '+f.requests.at(-1)?.url);}assert.equal(preview.controlHash,f.v.controlHash);assert.equal(JSON.stringify(preview).includes('selectors'),false);
+});
+test('caller ready boolean cannot create observer and consume a native occurrence',async()=>{
+ const f=await cfFiniteFixture();assert.equal(f.observer().create,undefined);assert.equal(f.requests.length,0);
+});
+
+test('parent abort after first custody response cannot start further authenticated reads',async()=>{
+ const f=await cfFiniteFixture(),parent=new AbortController(),original=f.fetchImpl;let calls=0;
+ // The named read operation propagates its parent through both custody GETs.
+ const {createPrivateQaFiniteObserverHttp}=await import('../lib/mcp-qa-finite-http.mjs');
+ const o=createPrivateQaFiniteObserverHttp({admission:{intentId:f.v.intentId,sourceRevision:f.v.sourceRevision,T0:f.v.T0,R1:f.v.R1},source:{qaLive:f.p.deployments.qaLive,custody:f.p.custody},credential:'synthetic_cf',githubToken:'synthetic_gh',fetchImpl:async(...args)=>{calls++;const r=await original(...args);parent.abort();return r;},now:f.base.f.now,signal:new AbortController().signal});
+ await assert.rejects(o.qualifyCustody(parent.signal,()=>{}));assert.equal(calls,1);
+});
+
+test('finite GHA ingress is GET-only even when exact observer is absent',async()=>{
+ const f=await cfFiniteFixture(),o=f.observer();assert.equal(o.create,undefined);
+ const {claimFiniteObserverCreation}=await import('../lib/mcp-qa-finite-http.mjs');assert.equal(claimFiniteObserverCreation,undefined);
+ await o.read();assert.equal(f.requests.filter(x=>x.method==='POST').length,0);
+ assert(!f.requests.some(x=>x.url.includes('/user/tokens')));
+});
+
+for(const launcher of [null,'running','queued','unknown'])test('actual QA restoration refuses unresolved launcher '+launcher,async()=>{const f=await cfFiniteFixture();f.base.restorationState.launcher=launcher;await assert.rejects(()=>f.adapters().readSnapshot(new AbortController().signal,()=>{}));assert.equal(f.state.posts,0);});
+
+test('default unavailable C2 setup cannot qualify a finite preview for admission',async()=>{const f=await cfFiniteFixture();f.state.observerStatus='running';const now=f.base.f.now(),parent={check:()=>now,signal:new AbortController().signal,deadline:now+5000};await assert.rejects(()=>f.observer().adopt(parent,parent.signal,parent.check));assert.equal(f.state.posts,0);});

~~~~~~~~~~

## test/mcp-qa-finite-cleanup-store.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-cleanup-store.test.mjs b/test/mcp-qa-finite-cleanup-store.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-cleanup-store.test.mjs
@@ -0,0 +1,35 @@
+import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
+import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
+const api=await import('../lib/mcp-qa-finite-cleanup-store.mjs').catch(()=>({}));
+async function setup(){
+ const f=finiteFixture(),control=controls.createPrivateQaFiniteTrialControl(f.options(controls)),arm=await control.prepare();
+ assert.equal(arm.status,'armed');const proof=finiteProofFixture({fixture:f,controlHash:arm.controlHash});f.setNow(f.plan.C0+3);
+ return {f,proof,store:api.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now})};
+}
+test('retained proof APIs are fixed and available',()=>{
+ for(const k of ['createPrivateQaFiniteCleanupStore','readFiniteTrialCleanupProofHead','readRetainedFiniteCleanupProof','readFiniteTrialCleanupCompletion'])assert.equal(typeof api[k],'function');
+});
+test('capture once, independent readback, two factual consumers and restart after former live observer closes',async()=>{
+ const {f,proof,store}=await setup();let calls=0;
+ const observed=await store.capture(async challenge=>{calls++;return {proof:{...proof.proof,proofChallenge:challenge,evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support:proof.support})},support:proof.support};});
+ assert.equal(observed.status,'observed');assert.equal(calls,1);
+ const refs={storage:f.storage,intentId:f.plan.intentId,controlHash:proof.control.controlHash};
+ const head=await api.readFiniteTrialCleanupProofHead(refs);assert.equal(head.proofHash,observed.record.proofHash);
+ f.setNow(f.plan.C1+1);
+ for(let n=0;n<2;n++){const r=await api.readRetainedFiniteCleanupProof({storage:f.storage,intentId:f.plan.intentId,proofHash:head.proofHash});assert.deepEqual(r.record,observed.record);}
+ await assert.rejects(api.readRetainedFiniteCleanupProof({storage:f.storage,intentId:f.plan.intentId,proofHash:'f'.repeat(64)}));
+ assert.equal((await api.readFiniteTrialCleanupCompletion({...refs,proofHash:head.proofHash})).status,'not_yet_observed');
+ assert.equal(calls,1);
+});
+test('missing proof and lost native response consume one challenge and never call producer again',async()=>{
+ const {f,proof,store}=await setup();let calls=0;
+ const refs={storage:f.storage,intentId:f.plan.intentId,controlHash:proof.control.controlHash};
+ assert.equal((await api.readFiniteTrialCleanupProofHead(refs)).status,'not_yet_observed');
+ assert.equal((await store.capture(async()=>{calls++;throw Error('lost');})).status,'uncertain');
+ assert.equal((await store.capture(async()=>{calls++;throw Error('must not call');})).status,'admin_pending');
+ assert.equal(calls,1);
+});

~~~~~~~~~~

## test/mcp-qa-finite-command.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-command.test.mjs b/test/mcp-qa-finite-command.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-command.test.mjs
@@ -0,0 +1,71 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {validateQaFiniteConfirmationCommand,assertQaFiniteConfirmationAdmission} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
+import {runFiniteFinalizerCli} from '../scripts/run-qa-finite-trial-finalizer.mjs';
+function fixture(){
+ const at=Date.now(),sha='b'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
+ const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{...actor},comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+sha,created_at:new Date(at).toISOString(),author_association:'OWNER',user:{...actor}}};
+ const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:sha};
+ return {at,event,context,now:()=>at};
+}
+test('new exact command has separate domain and original clocks through cleanup restart',()=>{
+ const f=fixture(),a=validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now});assert.equal(a.purpose,'afw.qa-finite-confirmation-command.v1');assert.equal(a.createdAt,f.at);assert.equal(a.cleanupExpiresAt,f.at+480000);
+ assertQaFiniteConfirmationAdmission(a);f.now=()=>f.at+300001;
+ const restored=validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now});assertQaFiniteConfirmationAdmission(restored,'cleanup');assert.throws(()=>assertQaFiniteConfirmationAdmission(restored));
+});
+for(const[mode,attack]of Object.entries({actor:f=>{f.event.sender.id=1;},owner:f=>{f.event.comment.user.type='Bot';},issue:f=>{f.event.issue.number=498;},branch:f=>{f.context.ref='refs/heads/feature';},attempt:f=>{f.context.runAttempt='2';},source:f=>{f.context.sourceRevision='c'.repeat(40);},extraCommand:f=>{f.event.comment.body+='\n';},oldKind:f=>{f.event.comment.body='/afw-qa-native-observe-restore v1 '+f.context.sourceRevision;},future:f=>{f.event.comment.created_at=new Date(f.at+1).toISOString();},expired:f=>{f.event.comment.created_at=new Date(f.at-480000).toISOString();}}))test('finite command denies '+mode,()=>{
+ const f=fixture();attack(f);assert.throws(()=>validateQaFiniteConfirmationCommand({event:f.event,context:f.context,now:f.now}));
+});
+test('uninstalled actual source constructor blocks before secret access, transport or effects',async()=>{
+ const f=fixture(),env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:f.context.repository,GITHUB_REPOSITORY_ID:f.context.repositoryId,GITHUB_REF:f.context.ref,GITHUB_EVENT_NAME:f.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:f.context.sourceRevision};
+ let secret=0,network=0;Object.defineProperty(env,'AFW_QA_CLOSED_TOKEN',{get(){secret++;throw Error('secret');}});
+ const r=await runFiniteFinalizerCli({phase:'admit',env,read:async()=>JSON.stringify(f.event),write:async()=>{},now:f.now,fetchImpl:async()=>{network++;throw Error('network');}});
+ assert.equal(r.status,'admin_pending');assert.equal(secret,0);assert.equal(network,0);
+});
+test('finalizer workflow independent of nominal and lock only in restore after admit completes',async()=>{
+ const yaml=await readFile('.github/workflows/afw-finite-finalizer.yml','utf8'),admit=yaml.split('  admit:')[1].split('  restore:')[0],restore=yaml.split('  restore:')[1];
+ assert.match(yaml,/group: afw-finite-finalizer-\$\{\{ needs.admission.outputs.intent_id \}\}/);assert.doesNotMatch(admit,/group: afw-qa-cloud-closed-rollback/);
+ assert.match(restore,/needs: admit/);assert.match(restore,/group: afw-qa-cloud-closed-rollback/);assert.equal((yaml.match(/cancel-in-progress: false/g)??[]).length,2);
+ assert.doesNotMatch(yaml,/needs: nominal|schedule:|workflow_dispatch:|canary.*TOKEN/);assert.match(yaml,/name: admit-and-ready/);
+});
+
+test('external poll covers late original C1 completion without exhausting at C0 or renewing R1',async()=>{
+ const {cfFiniteFixture}=await import('./fixtures/finite-cf-http.mjs');
+ const {finiteObserverInstanceId}=await import('../lib/mcp-qa-finite-observer.mjs');
+ const command=fixture(),a=validateQaFiniteConfirmationCommand({event:command.event,context:command.context,now:command.now});
+ const f=await cfFiniteFixture({at:command.at,configure:p=>{p.intentId=a.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});}});
+ f.base.f.setNow(command.at+100);f.state.observerStatus='running';f.gh.state.admitStatus='in_progress';
+ const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:command.context.repository,GITHUB_REPOSITORY_ID:command.context.repositoryId,GITHUB_REF:command.context.ref,GITHUB_EVENT_NAME:command.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:command.context.sourceRevision,GITHUB_TOKEN:'synthetic_gh',AFW_QA_CLOSED_TOKEN:'synthetic_cf'};
+ const {finiteCliSyntheticSource}=await import('./fixtures/finite-http-module.mjs');const synthetic=await finiteCliSyntheticSource(f.p,{seedHash:f.seedHash});
+ const result=await synthetic.runFiniteFinalizerCli({phase:'poll',env,now:f.base.f.now,read:async path=>JSON.stringify(path==='event.json'?command.event:f.p),write:async()=>{},sleep:async ms=>f.base.f.setNow(f.base.f.now()+ms),fetchImpl:async(...args)=>{if(f.base.f.now()>=f.v.C1+1)f.state.observerStatus='complete';return f.fetchImpl(...args);}});
+ assert.equal(result.status,'observer_complete');assert.ok(f.base.f.now()>f.v.C1);assert.ok(f.base.f.now()<f.v.R1);assert.equal(f.state.posts,0);
+});
+
+test('fixed restore launcher sets one coherence marker and execs once without a retry wrapper',async()=>{
+ const yaml=await readFile('.github/workflows/afw-finite-finalizer.yml','utf8'),restore=yaml.split('  restore:')[1];
+ assert.match(restore,/id: finite_restore_once/);
+ assert.equal((restore.match(/export AFW_FINITE_RESTORE_ORIGINAL_PID=\$\$/g)??[]).length,1);
+ assert.equal((restore.match(/exec node scripts\/run-qa-finite-trial-finalizer\.mjs restore/g)??[]).length,1);
+ assert.doesNotMatch(restore,/while |until |for .* in |retry:/);
+});
+
+test('fixed CLI adopts preview and persists existing ready without Workflow create',async()=>{
+ const {cfFiniteFixture}=await import('./fixtures/finite-cf-http.mjs');
+ const {finiteObserverInstanceId}=await import('../lib/mcp-qa-finite-observer.mjs');
+ const {finiteCliSyntheticSource}=await import('./fixtures/finite-http-module.mjs');
+ const command=fixture(),a=validateQaFiniteConfirmationCommand({event:command.event,context:command.context,now:command.now});
+ const f=await cfFiniteFixture({at:command.at,configure:p=>{p.intentId=a.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});}});
+ f.base.f.setNow(command.at+100);f.state.observerStatus='running';f.gh.state.admitStatus='in_progress';
+ const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:command.context.repository,GITHUB_REPOSITORY_ID:command.context.repositoryId,GITHUB_REF:command.context.ref,GITHUB_EVENT_NAME:command.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:command.context.sourceRevision,GITHUB_TOKEN:'synthetic_gh',AFW_QA_CLOSED_TOKEN:'synthetic_cf'},writes=[];
+ const synthetic=await finiteCliSyntheticSource(f.p,{seedHash:f.seedHash}),result=await synthetic.runFiniteFinalizerCli({phase:'admit',env,now:f.base.f.now,read:async()=>JSON.stringify(command.event),write:async(path,value)=>writes.push({path,value}),sleep:async ms=>f.base.f.setNow(f.base.f.now()+ms),fetchImpl:f.fetchImpl});
+ assert.equal(result.status,'ready');assert(writes.some(x=>x.path==='afw-finite-plan.json'));
+ assert.equal(f.requests.filter(x=>x.method==='POST'&&x.url.includes('api.cloudflare.com')).length,0);
+ assert.equal(f.gh.tagPosts,1);assert.equal(f.gh.refPosts,1);
+});
+test('caller source callback cannot replace missing fixed production constructor',async()=>{
+ const f=fixture();let called=0,network=0;
+ const env={GITHUB_EVENT_PATH:'event.json',GITHUB_REPOSITORY:f.context.repository,GITHUB_REPOSITORY_ID:f.context.repositoryId,GITHUB_REF:f.context.ref,GITHUB_EVENT_NAME:f.context.eventName,GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:f.context.sourceRevision};
+ const r=await runFiniteFinalizerCli({phase:'admit',env,resolveSource:async()=>{called++;return {};},read:async()=>JSON.stringify(f.event),write:async()=>{},now:f.now,fetchImpl:async()=>{network++;}});
+ assert.equal(r.status,'admin_pending');assert.equal(called,0);assert.equal(network,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-confirmation-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-confirmation-native.test.mjs b/test/mcp-qa-finite-confirmation-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-confirmation-native.test.mjs
@@ -0,0 +1,80 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Only the C2 external source is synthetic. The Known spy checks ONLY identity,
+// exact four keys and result preservation; its actual tests own business stages.
+const entry=`
+import {PrivateQaNamedConfirmation} from './worker/independent-closure/finite.mjs';
+import {finiteFixture,digest,hash} from './test/fixtures/qa-finite-trial.mjs';
+import {inertNamedConfirmationPolicy} from './test/fixtures/inert-named-confirmation-policy.mjs';
+import {finiteActivationConfigurationHash} from './lib/mcp-activation-observer.mjs';
+import {finiteCleanupPolicyHash} from './lib/mcp-finite-cleanup-policy.mjs';
+export const state={};
+export function material({env,event,step,parent}){
+ parent.check();state.reads++;
+ if(env!==state.env||event!==state.event||step!==state.step)throw Error('identity changed');
+ if(state.mode==='missing-source')throw Error('synthetic source missing');
+ if(state.mode==='hydration-expired')state.at+=5001;
+ if(state.mode==='mutated-event')event.timestamp.setTime(event.timestamp.getTime()+1);
+ const value=structuredClone(state.material);
+ if(state.mode==='wrong-source')value.execution.sourceRevision='a'.repeat(40);
+ if(state.mode==='wrong-plan')value.plan=value.plan.replace('"N1":','"extra":0,"N1":');
+ return value;
+}
+export async function known(input){state.calls++;state.same=input.env===state.env&&input.event===state.event&&input.step===state.step;state.keys=Object.keys(input).sort();if(state.mode==='known-throws')throw Error('synthetic Known throw');state.result={status:'blocked',mayRetry:false,operationalReadiness:false};return state.result;}
+export default {async fetch(request,env,ctx){
+ const {mode}=await request.json();state.mode=mode;state.calls=0;state.reads=0;
+ const real=Date.now(),f=finiteFixture({at:real+600000}),p=f.plan;state.at=p.T0+150000;Date.now=()=>state.at;
+ const script='export default {fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'},policy=inertNamedConfirmationPolicy(artifact);
+ policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public','enable_request_signal'];
+ const window={startAt:p.T0,expiresAt:p.N1};Object.assign(policy,window);Object.assign(policy.plan,window);
+ const bindings=policy.observation.configuration.bindings,mb=bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(mb.text);Object.assign(manifest.candidate,window);mb.text=JSON.stringify(manifest);
+ const eb=bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');eb.text=JSON.stringify({...JSON.parse(eb.text),...window});policy.plan.configurationHash=finiteActivationConfigurationHash(policy.observation.configuration);
+ const bundle={artifact,policy},bundleHash=hash(JSON.stringify(bundle));p.bundleHash=bundleHash;p.workflows.confirmation='afw-release-'+bundleHash;p.closePolicyHash=finiteCleanupPolicyHash(p);
+ const execution={intentId:p.intentId,finitePlanHash:digest(p.purpose,p),controlHash:'1'.repeat(64),sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash,preparedHash:'2'.repeat(64),sendHash:'3'.repeat(64),bindingHash:'4'.repeat(64),createdAt:state.at};
+ const binding={accountId:'85d0d5dadac3341a564f22ce885e9eec',bindingName:'AFW_QA_NAMED_CONFIRMATION',className:'PrivateQaNamedConfirmation',definitionName:'afw-own-qa-private-confirmation',qaVersionId:p.deployments.qaLive.versionId,scriptName:'agent-friendly-web-independent-closure-qa',sourceModuleHash:p.source.moduleHash,sourceProfileHash:p.source.profileHash,sourceRevision:p.source.revision};execution.bindingHash=hash('afw.finite-native-child-binding.v1\\n'+JSON.stringify(Object.fromEntries(Object.keys(binding).sort().map(k=>[k,binding[k]]))));
+ state.material={bundle,plan:JSON.stringify(p),execution};
+ const event={timestamp:new Date(state.at),instanceId:p.workflows.confirmation,payload:{planHash:bundleHash}};
+ if(mode==='early')event.timestamp=new Date(p.T0+149999);
+ if(mode==='late')event.timestamp=new Date(p.T0+160001);
+ if(mode==='future')event.timestamp=new Date(state.at+1);
+ if(mode==='queued-expired')state.at+=70000;
+ if(mode==='wrong-payload')event.payload.extra=true;
+ if(mode==='wrong-id')event.instanceId='wrong';
+ if(mode==='schedule')event.schedule='x';
+ if(mode==='wrong-name')event.workflowName='foreign';
+ if(mode==='timestamp-not-date')event.timestamp=state.at;
+ if(mode==='at-last-create'){state.at=p.T0+160000;event.timestamp=new Date(state.at);execution.createdAt=state.at;}
+ state.env={AFW_QA_VERSION:{id:p.deployments.qaLive.versionId},AFW_INDEPENDENT_CLOSURE:{idFromName:()=>({toString:()=>p.resources.actorId})}};state.event=event;state.step={do(){throw Error('no added business stage');}};
+ const workflow=new PrivateQaNamedConfirmation(ctx,state.env),result=await workflow.run(event,state.step);
+ return Response.json({result,calls:state.calls,reads:state.reads,same:state.same,keys:state.keys,preserved:result?.result===state.result});
+}};
+`;
+const bundles={};
+async function run(mode,source=true){
+ if(!bundles[source])bundles[source]=(await build({stdin:{contents:"export {default} from 'synthetic-entry';",resolveDir:process.cwd(),sourcefile:'synthetic-confirmation-entry.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-source-and-identity-spy',setup(b){
+ if(source)b.onLoad({filter:/mcp-qa-finite-confirmation-source\.mjs$/},()=>({contents:"export {material as readPrivateQaFiniteConfirmationMaterial} from 'synthetic-entry';",loader:'js'}));
+ b.onResolve({filter:/^synthetic-entry$/},()=>({path:'entry',namespace:'synthetic'}));b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:entry,resolveDir:process.cwd(),loader:'js'}));
+ b.onLoad({filter:/mcp-release-runtime\.mjs$/},()=>({contents:"export {known as runFiniteKnownCancellationReleaseWorkflow} from 'synthetic-entry'; export async function runKnownCancellationReleaseWorkflow(){throw Error('legacy Known entry forbidden for finite candidate');} export async function runReleaseWorkflow(){return {status:'blocked'}};export async function runReleaseOperator(){return {status:'blocked'}};",loader:'js'}));
+ }}]})).outputFiles[0].text;
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundles[source],compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']}));
+ try{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(r.status,200,await r.clone().text());return r.json();}finally{await mf.dispose();}
+}
+for(const mode of ['success','at-last-create'])test('finite_confirmation_handoff_fixed_entry '+mode,async()=>{
+ const r=await run(mode);assert.equal(r.calls,1);assert.equal(r.same,true);assert.deepEqual(r.keys,['bundle','env','event','step']);assert.equal(r.result.purpose,'afw.finite-confirmation-result.v1');assert.equal(r.preserved,true);
+});
+for(const mode of ['early','late','future','queued-expired','wrong-payload','wrong-id','schedule','wrong-name','timestamp-not-date','missing-source','hydration-expired','mutated-event','wrong-source','wrong-plan'])test('finite nominal rejects '+mode+' before Known',async()=>{const r=await run(mode);assert.equal(r.calls,0);assert.equal(r.result.status,'blocked');assert.equal(r.result.purpose,undefined);});
+test('Known throw cannot fabricate finite result envelope',async()=>{const r=await run('known-throws');assert.equal(r.calls,1);assert.equal(r.result.purpose,undefined);});
+
+test('finite technical result reader is strict, bounded and preserves actual Known result',async()=>{
+ const api=await import('../lib/mcp-qa-finite-confirmation.mjs');
+ assert.equal(typeof api.validatePrivateQaFiniteConfirmationResult,'function','finite output reader must exist');
+ const {finiteLauncherInstanceId}=await import('../lib/mcp-qa-finite-launch-records.mjs'),intentId='result-fixture',sourceRevision='b'.repeat(40),bundleHash='6'.repeat(64);
+ const e={intentId,finitePlanHash:'1'.repeat(64),controlHash:'2'.repeat(64),sourceRevision,qaVersionId:'11111111-1111-4111-8111-111111111111',actorId:'a'.repeat(64),launcherId:finiteLauncherInstanceId({intentId,sourceRevision}),nominalId:'afw-release-'+bundleHash,bundleHash,preparedHash:'3'.repeat(64),sendHash:'4'.repeat(64),bindingHash:'5'.repeat(64),createdAt:123000};
+ const provenance=Object.fromEntries(Object.entries(e).filter(([k])=>!['actorId','launcherId'].includes(k))),result={status:'blocked',mayRetry:false,operationalReadiness:false},value={purpose:'afw.finite-confirmation-result.v1',provenance,result};
+ assert.equal(api.validatePrivateQaFiniteConfirmationResult(value,e).result,result);
+ for(const alter of [v=>({...v,extra:true}),v=>({...v,provenance:{...v.provenance,sendHash:'f'.repeat(64)}}),v=>({...v,result:Object.create({hidden:true})}),v=>({...v,result:{padding:'x'.repeat(65536)}}),v=>{const c={};c.self=c;return {...v,result:c};},v=>({...v,result:{get status(){throw Error('must not invoke getter');}}})])assert.throws(()=>api.validatePrivateQaFiniteConfirmationResult(alter(value),e));
+});
+
+test('actual uninstalled confirmation source stays closed before Known',async()=>{const r=await run('success',false);assert.equal(r.calls,0);assert.equal(r.reads,0);assert.equal(r.result.status,'blocked');assert.equal(r.result.purpose,undefined);});

~~~~~~~~~~

## test/mcp-qa-finite-connection-preparation-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-connection-preparation-native.test.mjs b/test/mcp-qa-finite-connection-preparation-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-connection-preparation-native.test.mjs
@@ -0,0 +1,15 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {setup} from './fixtures/finite-transport-native.mjs';
+test('first genuine owner decision stops pending before permission phases, receipts, selection or audit',async t=>{
+ const f=await setup(t),first=await f.screen(),answer=await f.publish(first);
+ assert.equal(answer.status,'admin_pending');assert.equal(answer.mayRetry,false);assert.equal(f.posts(),0);
+ const all=await f.json('/fixture/rows',{});
+ assert.equal(all.filter(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':connection:approval')).length,1);
+ assert.equal(all.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
+ for(const prefix of ['afw.finite-policy-effect.v1:','preparation:','source-selection:'])assert.equal(all.filter(([k])=>k.startsWith(prefix)).length,0);
+ assert.equal(all.filter(([k])=>/:grant$|:notice$|:connection$|:notices:approval$|:finite:approval$/.test(k)).length,0);
+ const next=await f.call('/connections/finite-prepare',{headers:{Cookie:first.cookie}});assert.equal(next.status,503);assert.equal(next.headers.get('Set-Cookie'),null);
+ assert.equal((await f.publish(first)).status,'admin_pending');assert.equal(f.posts(),0);
+ assert.deepEqual(await f.json('/fixture/rows',{}),all,'used owner decision cannot be repaired or advanced');
+});

~~~~~~~~~~

## test/mcp-qa-finite-custody.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-custody.test.mjs b/test/mcp-qa-finite-custody.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-custody.test.mjs
@@ -0,0 +1,16 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finiteGhaCustody,verifyFiniteGhaCustody,finiteCfEnvelope} from '../lib/mcp-qa-finite-custody.mjs';
+test('account selfverify uses SOURCE receipt and informational null message without scope claim',async()=>{
+ const custody=finiteGhaCustody(),at=Date.parse('2026-11-01T18:00:00Z'),paths=[];
+ const result=await verifyFiniteGhaCustody({custody,check:()=>{},now:()=>at,R1:at+480000,request:async path=>{paths.push(path);return {value:{success:true,errors:[],messages:[{code:10000,message:'Valid',type:null}],result:{id:custody.id,status:'active',expires_on:new Date(custody.expiresAt).toISOString(),not_before:null}}};}});
+ assert.deepEqual(paths,['/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify']);assert.equal(result.scopeVerified,false);
+});
+for(const mode of ['id','inactive','expiry','notbefore','receipt','groups','hash','malformed-message'])test('account custody rejects '+mode,async()=>{
+ const custody=structuredClone(finiteGhaCustody()),at=Date.parse('2026-11-01T18:00:00Z');
+ const result={id:custody.id,status:'active',expires_on:new Date(custody.expiresAt).toISOString(),not_before:null};
+ if(mode==='id')result.id='a'.repeat(32);if(mode==='inactive')result.status='disabled';if(mode==='expiry')result.expires_on=new Date(at).toISOString();if(mode==='notbefore')result.not_before=new Date(at+1).toISOString();
+ if(mode==='receipt')custody.id='a'.repeat(32);if(mode==='groups')custody.permissionGroupIds.pop();if(mode==='hash')custody.policyHash='0'.repeat(64);
+ await assert.rejects(verifyFiniteGhaCustody({custody,check:()=>{},now:()=>at,R1:at+480000,request:async()=>({value:{success:true,errors:[],messages:mode==='malformed-message'?[{code:10000,message:'ok',token:'private'}]:[],result}})}));
+});
+test('malformed envelope cannot leak provider extras',()=>{for(const value of [{success:true,errors:[],messages:null,result:{}},{success:true,errors:[],messages:[],result:{},token:'secret'}])assert.throws(()=>finiteCfEnvelope(value));});

~~~~~~~~~~

## test/mcp-qa-finite-finalizer.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-finalizer.test.mjs b/test/mcp-qa-finite-finalizer.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-finalizer.test.mjs
@@ -0,0 +1,71 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFixture,digest} from './fixtures/qa-finite-trial.mjs';
+const api=await import('../lib/mcp-qa-finite-trial-finalizer.mjs').catch(()=>({}));
+const observer=await import('../lib/mcp-qa-finite-observer.mjs').catch(()=>({}));
+test('material preview uses control canonical identity with no journal, alarm or ready read',async()=>{
+ const f=finiteFixture();let ready=0,available=false;f.primary.finalizer=async()=>{ready++;if(!available)throw Error('not ready yet');return f.finalizer();};
+ const c=controls.createPrivateQaFiniteTrialControl(f.options(controls));
+ assert.equal(typeof c.preview,'function');const r=await c.preview();
+ assert.equal(r.purpose,'afw.qa-finite-material-preview.v1');assert.equal(r.planHash,digest(f.plan.purpose,f.plan));assert.equal(r.R1,f.plan.R1);
+ assert.equal(f.puts,0);assert.equal(f.alarm,null);assert.equal(ready,0);assert.equal(JSON.stringify(r).includes('selectors'),false);
+ available=true;const armed=await c.prepare();assert.equal(armed.status,'armed');assert.equal(r.controlHash,armed.controlHash);
+});
+test('finite observer instance is deterministic before control exists and source bound',()=>{
+ assert.equal(typeof observer.finiteObserverInstanceId,'function');
+ const a=observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)});
+ assert.equal(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)}));
+ assert.notEqual(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'c'.repeat(40)}));
+});
+test('external exact finalizer constructor exists independently of the nominal runtime',()=>assert.equal(typeof api.createPrivateQaFiniteTrialFinalizer,'function'));
+
+import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
+import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';
+import {validateFiniteObserverOutput,finiteSendKey} from '../lib/mcp-qa-finite-external-contract.mjs';
+test('restart after canary closed consumes SAME proof/claim and exactly one independent QA send',async()=>{
+ const f=await finiteFinalizerFixture();let liveProofReads=0;f.liveProof=()=>{liveProofReads++;throw Error('closed canary');};
+ const first=await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();
+ assert.equal(first.status,'restored_observed');assert.equal(f.posts,1);assert.equal(f.claims,1);assert.equal(liveProofReads,0);
+ assert.equal(f.send.proofHash,f.output.retained.proofHash);assert.equal(f.send.nativeClaimHash,f.output.qaClaim.claimHash);
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'closed_observed');assert.equal(f.posts,1);
+ assert.equal(validateFiniteObserverOutput(f.output,f.plan).retained.proofHash,f.send.proofHash);
+});
+for(const mode of ['existing','uncertain','blocked'])test('send '+mode+' never permits a POST or replacement job send',async()=>{
+ const f=await finiteFinalizerFixture();f.state.claimMode=mode;
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'admin_pending');assert.equal(f.posts,0);
+ f.state.jobId=100;assert.equal(finiteSendKey(f.plan),finiteSendKey(f.plan));
+ await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,0);
+});
+for(const[mode,attack]of Object.entries({
+ expired:f=>f.f.setNow(f.preview.R1),foreign:f=>f.setPointer('88888888-8888-4888-8888-888888888888',f.plan.deployments.qaLive.deploymentId),
+ foreignDeployment:f=>f.setPointer(f.plan.deployments.qaLive.versionId,'88888888-8888-4888-8888-888888888888'),
+ unresolved:f=>{f.state.blocked=true;},proof:f=>{f.state.output.retained.proof.kind='stopped';},
+ completion:f=>{f.state.output.completion.completedAt=f.preview.R1;},nativeClaim:f=>{f.state.output.qaClaim.claim.kind='canary_restore';},
+ nativeVersion:f=>{f.state.output.preview.runtimeVersionId=f.plan.deployments.qaClosed.versionId;},
+ source:f=>{f.state.output.preview.sourceRevision='f'.repeat(40);},
+ writer:f=>{const r=f.state.output.primaryReceipt;r.writers.unresolvedRemoteWrites=1;const {receiptHash,...body}=r;void receiptHash;r.receiptHash=hash(body);},
+ rawConsent:f=>{f.state.output.plan.selectors={subject:'private'};}
+}))test('independent finalizer blocks '+mode+' before durable send claim',async()=>{
+ const f=await finiteFinalizerFixture();attack(f);const r=await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(r.status,'admin_pending');assert.equal(f.posts,0);assert.equal(f.claims,0);
+});
+test('lost POST ACK retains issued authority and reports closed uncertainty without resend',async()=>{
+ const f=await finiteFinalizerFixture();f.state.lostPost=true;
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'closed_observed_uncertain');assert.equal(f.posts,1);
+ await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,1);
+});
+test('late POST and original queued R1 never become a successful readback',async()=>{
+ const f=await finiteFinalizerFixture();f.state.late=true;
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'uncertain');assert.equal(f.posts,1);
+ await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,1);
+});
+test('abort and after-await expiry block effects',async()=>{
+ const f=await finiteFinalizerFixture(),a=new AbortController();a.abort();f.deps.signal=a.signal;
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'admin_pending');assert.equal(f.claims,0);
+ const g=await finiteFinalizerFixture();g.deps.readSnapshot=async()=>{g.f.setNow(g.preview.R1);return g.snapshot();};
+ await api.createPrivateQaFiniteTrialFinalizer(g.deps).run();assert.equal(g.claims,0);assert.equal(g.posts,0);
+});
+test('post-claim pointer conflict never overwrites and cannot refund send claim',async()=>{
+ const f=await finiteFinalizerFixture(),original=f.deps.claim;f.deps.claim=async(...a)=>{const r=await original(...a);f.setPointer('88888888-8888-4888-8888-888888888888',f.plan.deployments.qaLive.deploymentId);return r;};
+ assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'uncertain');assert.equal(f.posts,0);assert.ok(f.send);
+});

~~~~~~~~~~

## test/mcp-qa-finite-first-connection-publication-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-first-connection-publication-native.test.mjs b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-first-connection-publication-native.test.mjs
@@ -0,0 +1,351 @@
+import {createHash} from 'node:crypto';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {gunzipSync} from 'node:zlib';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {hashFinitePreparationRecord,hashFinitePolicyEffectIdentity} from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {plain,approveFirstConnection,readFirstConnectionProbe,setFirstConnectionFault} from './fixtures/finite-first-connection-publication.mjs';
+const O='https://delegated-canary.agentfriendlyweb.dev';
+async function fixture(t,options){
+ const f=await initialEntryHarness('first-connection-publication',options);
+ t.after(async()=>{console.info('T2 native stage','teardown-start');try{if(!f.mountFailed){await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}console.info('T2 native stage','teardown-restored');}finally{await f.mf.dispose();console.info('T2 native stage','teardown-disposed');await f.cleanup();console.info('T2 native stage','teardown-done');}});
+ await f.stub.configure('normal');
+ console.info('T2 native stage','upstream-start');const initial=await plain(f.stub.invoke(f.refs));console.info('T2 native stage','upstream-done:'+initial.status);if(initial.status!=='material_recorded'){const seen=await plain(f.stub.snapshot());console.info('T2 upstream DATA inspection',JSON.stringify({requests:f.providerRegistry.requests.map(({url,method})=>({method,path:new URL(url).pathname})),responses:f.providerRegistry.responses,rows:seen.map(([key])=>key),stats:await plain(f.stub.stats()),M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}}));}assert.equal(initial.status,'material_recorded',JSON.stringify(initial));await f.stub.restoreMethods();await f.mountFirstConnection();
+ const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]);
+ assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.phaseCurrent,undefined);
+ assert.equal(capsule.moduleHash,f.firstConnectionBuild.residency.module.sha256);
+ assert.equal(f.uploaded.modules[0].content_base64,gunzipSync(Buffer.from(f.resident.content,'base64')).toString('base64'));
+ return f;
+}
+test('T2 finite dispatch never falls through ordinary',{timeout:120000},async t=>{
+ const f=await fixture(t),spy=f.negative;
+ const cases=[
+  [O+'/connections/finite-prepare?x=1',{}],[O+'/connections/finite-prepare#bad',{}],
+  ['https://other.invalid/connections/finite-prepare',{}],[O+'/connections/finite-prepare',{method:'DELETE'}],
+  [O+'/connections',{}],[O+'/connections/revoke',{method:'POST'}],[O+'/monitoring/revoke',{method:'POST'}],
+  [O+'/authorize?bad=1',{method:'DELETE'}],[O+'/monitoring?x=1',{}],[O+'/monitoring/grant',{method:'GET'}]
+ ];
+ for(const [url,options]of cases){const r=await spy.fetch(url,options);assert.notEqual(r.status,200,url);await r.body?.cancel();}
+ for(const fault of ['qa-absent','version','actor','version-drift']){
+  await setFirstConnectionFault(f,fault);const r=await spy.fetch(O+'/connections/finite-prepare');assert.notEqual(r.status,200,fault);await r.body?.cancel();
+ }
+ await setFirstConnectionFault(f,'oauth-open');
+ for(const path of ['/authorize?bad=1','/monitoring','/monitoring/grant']){const r=await spy.fetch(O+path,path.endsWith('grant')?{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'handle='+'a'.repeat(43)}:{});assert.notEqual(r.status,200,path);await r.body?.cancel();}
+ const probe=await readFirstConnectionProbe(f);assert.equal(probe.negative.ordinary,0,'finite paths never enter ordinary handler before SQL');assert.equal(probe.negative.sql,0,'zero ordinary SQL');assert.equal(probe.effects,0);assert.equal(probe.uploads,1);assert.equal(probe.activations,1);
+ assert(probe.native.calls.some(c=>c.url==='https://afw-private.invalid/_finite-owner/monitoring'),'OAuth=true reaches QA without ordinary monitoring flag');
+ const target='https://afw-private.invalid/_finite-owner/';
+ for(const url of [target+'unknown',target+'choice?x=1',target+'monitoring/revoke']){const r=await f.stub.fetch(url,{method:'POST'});assert.notEqual(r.status,200);await r.body?.cancel();}
+ console.info('T2 negative bundle',JSON.stringify({spyHash:f.firstConnectionBuild.spyHash,probe:{...probe,rows:undefined,providerRequests:undefined,native:{...probe.native,business:undefined}}}));
+});
+test('T2 closed mounted conduits cannot authorize business',{timeout:120000},async t=>{
+ const f=await fixture(t);
+ const response=await f.call('/connections/finite-prepare');assert.notEqual(response.status,200,'unsigned choice cannot approve');await response.body?.cancel();
+ const before=await readFirstConnectionProbe(f);assert.equal(before.native.calls.filter(c=>c.url.endsWith('/choice')).length,1,'actual closed M dispatches to actual QA receiver');
+ for(const path of ['/authorize','/monitoring','/monitoring/grant']){const r=await f.call(path,path.endsWith('/grant')?{method:'POST'}:{});assert.notEqual(r.status,200);await r.body?.cancel();}
+ const p=await readFirstConnectionProbe(f);assert.equal(p.native.calls.length,before.native.calls.length,'closed OAuth/notice denied before QA');assert.equal(p.effects,0);assert.deepEqual(p.native.business,[]);assert.equal(p.uploads,1);assert.equal(p.activations,1);
+ const rows=p.rows,capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);assert.equal(p.native.alarm,capsule.C0);assert.equal(capsule.C0,capsule.I0+900000);assert.equal(capsule.C1,capsule.C0+180000);
+ const plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);assert.equal(plan.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
+ assert.equal(f.phaseCurrent,undefined);assert.equal(f.firstConnectionBuild.M.sha256,f.resident.module.sha256);
+ assert(f.firstConnectionBuild.M.inputs.includes('worker/mcp-own/finite.mjs'));assert(!f.firstConnectionBuild.M.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
+ assert(f.firstConnectionBuild.QA.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
+ console.info('T2 initial native build',JSON.stringify({...f.firstConnectionBuild,residency:{...f.resident,content:undefined},M:{...f.firstConnectionBuild.M,inputs:f.firstConnectionBuild.M.inputs.length},QA:{...f.firstConnectionBuild.QA,inputs:f.firstConnectionBuild.QA.inputs.length},requests:p.providerRequests.length}));
+});
+
+
+/** Node assertion over passive actual native observations; never product authority. */
+function assertNativePublicationOrder(trace,rows,requests){
+ const sha=value=>createHash('sha256').update(value).digest('hex'),prefix='native publication order: ';
+ const indexed=trace.map((event,index)=>({...event,index}));
+ const one=(values,label)=>{assert.equal(values.length,1,prefix+label+' must be unique');return values[0];};
+ const response=one(indexed.filter(e=>e.kind==='native-response-return'&&e.originalMethod==='POST'&&e.status===200),'actual successful QA response');
+ assert.equal(typeof response.requestId,'string');assert(response.requestId.length>0,prefix+'original request ID');
+ const events=indexed.filter(e=>e.requestId===response.requestId);
+ const records=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:'));
+ const readRow=key=>{const row=one(records.filter(([k])=>k===key),key);return {key,raw:row[1],value:JSON.parse(row[1]),valueHash:sha(row[1])};};
+ const sendFor=effect=>{const row=one(records.filter(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===effect),effect+' own SEND');return readRow(row[0]);};
+ const uploadSend=sendFor('upload'),activationSend=sendFor('activation');
+ const receipt=readRow(activationSend.key.slice(0,-4)+'receipt');
+ const durability=(record,label,before)=>{
+  const matches=kind=>events.filter(e=>e.kind===kind&&e.key===record.key&&e.valueHash===record.valueHash);
+  const put=one(matches('put-settled'),label+' actual native put'),commit=one(matches('transaction-settled'),label+' actual native commit');
+  assert(put.index<commit.index&&commit.index<before,prefix+label+' put/commit before next boundary');
+  const sync=matches('sync-settled').find(e=>e.index>commit.index&&e.index<before);assert(sync,prefix+label+' settled sync before next boundary');
+  const direct=matches('get-settled').find(e=>e.scope==='storage'&&e.index>sync.index&&e.index<before),transaction=matches('readback-transaction-settled').find(e=>e.index>sync.index&&e.index<before&&matches('get-settled').some(g=>g.scope==='transaction'&&g.transactionId===e.transactionId&&g.index>sync.index&&g.index<e.index)),read=direct??transaction;assert(read,prefix+label+' exact completed native readback after sync before next boundary');
+  return {key:record.key,valueHash:record.valueHash,put:put.index,commit:commit.index,sync:sync.index,read:read.index,readApi:direct?'storage.get':'read-only storage.transaction',readTransactionId:direct?null:transaction.transactionId};
+ };
+ const flows=[];
+ for(const [effect,send]of [['upload',uploadSend],['activation',activationSend]]){
+  const ack=readRow(send.key.slice(0,-4)+'ack'),identity={kind:'connection',preconnectionId:send.value.preconnectionId,sourceRevision:send.value.sourceRevision,stage:'connection',effect};
+  assert.equal(send.key,'afw.finite-policy-effect.v1:'+hashFinitePolicyEffectIdentity(identity)+':send',prefix+effect+' original journal identity');
+  assert.equal(ack.value.sendHash,hashFinitePreparationRecord('ConnectionSend',send.value),prefix+effect+' ACK links actual own SEND');
+  const invocation=one(events.filter(e=>e.kind==='native-invocation'&&e.effect===effect),effect+' actual fetch invocation');
+  const wire=one(requests.filter(r=>r.method==='POST'&&r.url===invocation.url),effect+' actual provider request');
+  assert.equal(invocation.method,wire.method,prefix+effect+' actual method');assert.equal(invocation.bodyHash,sha(wire.body),prefix+effect+' actual body hash');
+  assert.equal(send.value.requestHash,initialHash('afw.finite-policy-request.v1',{method:wire.method,path:wire.url,body:JSON.parse(wire.body),baselineVersionId:send.value.baselineVersionId,baselineDeploymentId:send.value.baselineDeploymentId}),prefix+effect+' SEND binds actual wire');
+  const headers=one(events.filter(e=>e.kind==='native-result-enter'&&e.effect===effect),effect+' captured native response');
+  const result=one(events.filter(e=>e.kind==='native-operation-settled'&&e.effect===effect),effect+' fulfilled original operation');
+  assert(invocation.index<headers.index&&headers.index<result.index,prefix+effect+' invocation then response then body/cancel/result settlement');
+  assert.equal(result.resourceId,ack.value.resourceId,prefix+effect+' ACK resource from actual normal result');
+  const next=effect==='upload'?one(events.filter(e=>e.kind==='transaction-settled'&&e.key===activationSend.key&&e.valueHash===activationSend.valueHash),'activation SEND commit').index:one(events.filter(e=>e.kind==='transaction-settled'&&e.key===receipt.key&&e.valueHash===receipt.valueHash),'receipt commit').index;
+  const sendOrder=durability(send,effect+' SEND',invocation.index),ackOrder=durability(ack,effect+' ACK',next);
+  assert(result.index<ackOrder.put,prefix+effect+' actual result before ACK put');
+  flows.push({effect,sendHash:hashFinitePreparationRecord('ConnectionSend',send.value),send:sendOrder,invocation:invocation.index,headers:headers.index,result:result.index,resourceId:result.resourceId,ack:ackOrder});
+ }
+ assert(flows[0].ack.read<flows[1].send.put,prefix+'upload ACK durability before activation SEND');
+ assert.equal(receipt.value.versionId,flows[0].resourceId,prefix+'receipt upload ID');assert.equal(receipt.value.deploymentId,flows[1].resourceId,prefix+'receipt deployment ID');
+ assert.equal(receipt.value.baselineVersionId,uploadSend.value.baselineVersionId,prefix+'receipt original baseline');assert.equal(receipt.value.baselineDeploymentId,activationSend.value.baselineDeploymentId,prefix+'receipt original deployment');
+ const receiptOrder=durability(receipt,'receipt',response.index);
+ assert(flows[1].ack.read<receiptOrder.put,prefix+'activation ACK durability before receipt put');
+ return {requestId:response.requestId,flows,receipt:receiptOrder,success:response.index,status:response.status};
+}
+function assertPublicationOrderDataSensitivity(trace,rows,requests,actual){
+ const checked=[],reject=(name,copy)=>{assert.throws(()=>assertNativePublicationOrder(copy,rows,requests),/native publication order:/,name+' must fail the Node order predicate');checked.push(name);};
+ const upload=actual.flows[0],activation=actual.flows[1];
+ reject('missing upload SEND sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===upload.send.key)));
+ const moved=trace.slice(),[invoke]=moved.splice(activation.invocation,1);moved.splice(activation.send.read,0,invoke);reject('activation invocation before SEND readback',moved);
+ reject('missing activation ACK sync',trace.filter(e=>!(e.kind==='sync-settled'&&e.key===activation.ack.key)));
+ reject('incomplete upload SEND transaction get',trace.filter(e=>!(e.kind==='readback-transaction-settled'&&e.key===upload.send.key)));
+ const late=trace.filter(e=>!(['get-settled','readback-transaction-settled'].includes(e.kind)&&e.key===actual.receipt.key));late.push(trace[actual.receipt.read]);reject('receipt readback only after success',late);
+ return {kind:'assertion discrimination on DATA copies only',nativeFailureInjected:false,checked};
+}
+
+test('T3 same initial bytes produce connection and downstream',{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f);assert.equal(f.firstConnectionBuild.negativeMutation,null,'positive principal is unmutated');assert.equal(f.firstConnectionBuild.M.sha256,'c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32','positive initial M stays exact D11');assert.equal(f.firstConnectionBuild.M.bytes,1988061);await f.stub.firstConnectionConfigure('normal');
+ const owner=(await plain(f.stub.capsuleFacts())).material.ownerSelection,originalToken=await f.firstConnectionToken(owner,{expiresAt:Math.floor((Date.now()+120000)/1000)}),choiceHeaders={'Cf-Access-Jwt-Assertion':originalToken};
+ const foreignUrl='https://foreign.invalid/connections/finite-prepare',foreign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreign.status,200);await foreign.body?.cancel();
+ const foreignSpy=await f.negative.fetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(foreignSpy.status,200);await foreignSpy.body?.cancel();
+ const originProbe=await readFirstConnectionProbe(f);assert.equal(originProbe.native.calls.length,0,'valid signed foreign URL never reaches QA');assert.equal(originProbe.negative.forwarded,0);assert.equal(originProbe.negative.ordinary,0);assert.equal(originProbe.negative.sql,0);assert.equal(effectRows(originProbe).length,0);
+ const response=await approveFirstConnection(f,{token:originalToken});
+ if(response.status!==200)console.info('T3 failed continuation observation',JSON.stringify(await plain(f.stub.firstConnectionProbe())));
+ assert.equal(response.status,200,'original signed choice must complete native ConnectionReceipt before success');
+ await response.body?.cancel();
+ const p=await readFirstConnectionProbe(f);
+ assert.equal(p.uploads,before.uploads+1,'new native upload');
+ assert.equal(p.activations,before.activations+1,'new native activation');
+ const receiptRows=p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'));
+ assert.equal(receiptRows.length,1,'durable own connection receipt');
+ assert.equal(JSON.parse(receiptRows[0][1]).moduleHash,f.firstConnectionBuild.M.sha256);
+ assert.equal(f.phaseCurrent,undefined,'no seeded publication authority');
+ const connectionTelemetry=await plain(f.stub.firstConnectionState());assert(connectionTelemetry.counts?.get>0);assert(connectionTelemetry.http.length>0);assert(connectionTelemetry.http.every(io=>io.settled&&io.cancelCalls===io.cancelSettled),'success retains every actual native body/cancel settlement');const orderRequests=p.providerRequests.slice(before.providerRequests.length),orderBuild={testRevision:process.env.GITHUB_SHA,negativeMutation:f.firstConnectionBuild.negativeMutation,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}};await mkdir('output/task3',{recursive:true});await writeFile('output/task3/native-publication-order.json',JSON.stringify({...orderBuild,stage:'captured before assertions',passiveTrace:connectionTelemetry.trace},null,2));const nativeOrder=assertNativePublicationOrder(connectionTelemetry.trace,p.rows,orderRequests),orderSensitivity=assertPublicationOrderDataSensitivity(connectionTelemetry.trace,p.rows,orderRequests,nativeOrder);console.info('T3 native publication chronology',JSON.stringify(nativeOrder));console.info('T3 chronology DATA sensitivity',JSON.stringify(orderSensitivity));console.info('T3 principal build provenance',JSON.stringify(orderBuild));await writeFile('output/task3/native-publication-order.json',JSON.stringify({...orderBuild,order:nativeOrder,assertionDiscrimination:orderSensitivity,passiveTrace:connectionTelemetry.trace},null,2));const receipt=JSON.parse(receiptRows[0][1]),originalRows=before.rows.filter(([k])=>!k.startsWith('owner-ticket:')&&!k.startsWith('owner-project-ref:')&&!k.startsWith('connection-preparation:'));
+ for(const row of originalRows)assert.deepEqual(p.rows.find(([k])=>k===row[0]),row);
+ const closedVersion=f.providerRegistry.versions[receipt.baselineVersionId],connectionVersion=f.providerRegistry.versions[receipt.versionId];
+ assert.equal(connectionVersion.modules[0].content_base64,closedVersion.modules[0].content_base64);
+ const configOnly=structuredClone(closedVersion);configOnly.id=receipt.versionId;configOnly.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(connectionVersion,configOnly);
+ // Adoption follows actual POST completion/body settlement and uses only the
+ // provider registry's real upload/pointer. QA script and physical references stay.
+ await f.adoptConnectionConfiguration();assert.equal(f.transportNormalized,false);
+ const postAdoptionBefore=await readFirstConnectionProbe(f),postAdoptionForeign=await f.mf.dispatchFetch(foreignUrl,{headers:choiceHeaders});assert.notEqual(postAdoptionForeign.status,200);await postAdoptionForeign.body?.cancel();assert.equal((await readFirstConnectionProbe(f)).native.calls.length,postAdoptionBefore.native.calls.length);
+ await f.adoptConnectionConfiguration({upstream:true});assert.equal(f.transportNormalized,true);
+ const normalBefore=await readFirstConnectionProbe(f),foreignOrigin=await f.negative.fetch(O+'/connections/finite-prepare',{headers:{...choiceHeaders,Origin:'https://foreign.invalid'}});assert.notEqual(foreignOrigin.status,200);await foreignOrigin.body?.cancel();const normalAfter=await readFirstConnectionProbe(f);assert.equal(normalAfter.native.calls.length,normalBefore.native.calls.length,'foreign Origin remains denied before QA under native upstream');assert.equal(normalAfter.negative.forwarded,normalBefore.negative.forwarded);assert.equal(normalAfter.negative.ordinary,0);assert.equal(normalAfter.negative.sql,0);
+ const actualPrep=p.rows.find(([key])=>key==='connection-preparation:'+receipt.preconnectionId+':record');assert(actualPrep);const narrowed=JSON.parse(actualPrep[1]);assert(narrowed.owner.accessExpiresAt<narrowed.expiresAt+1);assert(narrowed.expiresAt<JSON.parse(before.rows.find(([key])=>key.endsWith(':capsule'))[1]).C0,'valid shorter signed identity narrows original approval');
+ f.providerPhase='verification context after connection';const current=await plain(f.stub.firstConnectionContext());assert.equal(current.source?.phase,'read_consent',JSON.stringify(current));f.source=current.source;
+ const kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');
+ await kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
+ const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
+ const authorization=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
+ assert.equal(authorization.status,200);const authHtml=await authorization.text(),handle=/name="handle" value="([^"]+)"/.exec(authHtml)?.[1],sdkCookie=authorization.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&sdkCookie);
+ const issued=await f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+sdkCookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
+ assert.equal(issued.status,302);const code=new URL(issued.headers.get('Location')).searchParams.get('code');assert(code);await issued.body?.cancel();
+ const beforeExchange=await plain(f.stub.snapshot()),grantAck=beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack'));
+ assert(grantAck);
+ const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:verifier})});
+ assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');
+ const client=new Client({name:'SYN-native-T3',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>{f.providerPhase='MCP';return f.mf.dispatchFetch(String(url),options);}}));const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence']);const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
+ const originalActivation=effectRows(p).filter(([key])=>key.endsWith(':send')).map(([,raw])=>JSON.parse(raw)).find(send=>send.effect==='activation');assert(Date.now()>=originalActivation.deadline,'completed history is observed beyond its original effect window');
+ f.providerPhase='verification context after exchange';const actualCurrent=await plain(f.stub.firstConnectionContext());assert.equal(actualCurrent.source?.phase,'read_consent');const afterExchange=await plain(f.stub.snapshot());assert.deepEqual(afterExchange.find(([k])=>k===grantAck[0]),grantAck,'immutable original grant ACK');
+ const grant=(await f.db.prepare("SELECT exchanged_at FROM delegated_access_grants WHERE id=?").bind(JSON.parse(beforeExchange.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity.grantId).first());assert.notEqual(grant.exchanged_at,'','real native exchange timestamp');
+ const noticeGet=await f.call('/monitoring',{headers});assert.equal(noticeGet.status,200);const noticeHtml=await noticeGet.text(),noticeHandle=/name="handle" value="([^"]+)"/.exec(noticeHtml)?.[1],noticeCookie=noticeGet.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(noticeHandle&&noticeCookie);
+ const noticePost=await f.call('/monitoring/grant',{method:'POST',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+noticeCookie},body:new URLSearchParams({handle:noticeHandle})});assert.equal(noticePost.status,200);await noticePost.body?.cancel();
+ const final=await readFirstConnectionProbe(f),link=final.rows.find(([k])=>k==='connection-preparation:'+current.preconnectionId+':notice');assert(link,'actual native NoticeLink follows actual GET/POST');
+ const unsupported=await f.call('/connections/finite-prepare',{headers});assert.notEqual(unsupported.status,200);await unsupported.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);
+ assert.equal(final.negative.ordinary,0);assert.equal(final.negative.sql,0);
+ const telemetry=connectionTelemetry,sends=effectRows(final).filter(([k])=>k.endsWith(':send')).map(([,v])=>JSON.parse(v));console.info('T3 original clock and IO',JSON.stringify({counts:telemetry.counts,http:telemetry.http.reduce((out,io)=>{const key=io.kind+' '+io.method,row=out[key]??={requests:0,bytes:0,reads:0,cancelCalls:0,cancelSettled:0};row.requests++;for(const field of ['bytes','reads','cancelCalls','cancelSettled'])row[field]+=io[field];return out;},{}),originalRoots:p.native.calls.map(c=>({method:c.method,windowMs:c.boundary.deadline-c.boundary.startedAt})),pairs:p.native.observation.filter(v=>v.kind==='pair').map(v=>v.elapsedMs),providerRequests:final.providerRequests.length,providerByPhase:final.providerRequests.reduce((out,r)=>{const key=r.phase+' '+new URL(r.url).host;out[key]=(out[key]??0)+1;return out;},{}),providerResponseBytes:f.providerRegistry.responses.reduce((out,r)=>{const path=r.path.includes('/versions/')?r.path.replace(/\/versions\/[^/]+$/,'/versions/:id'):r.path,key=r.phase+' '+r.host+' '+r.method+' '+path,row=out[key]??={responses:0,bytes:0};row.responses++;row.bytes+=r.bytes;return out;},{}),providerByHost:final.providerRequests.reduce((out,r)=>{const host=new URL(r.url).host;out[host]=(out[host]??0)+1;return out;},{}),providerByEndpoint:final.providerRequests.reduce((out,r)=>{const u=new URL(r.url),path=u.pathname.includes('/versions/')?u.pathname.replace(/\/versions\/[^/]+$/,'/versions/:id'):u.pathname,key=u.host+' '+r.method+' '+path;out[key]=(out[key]??0)+1;return out;},{}),sends:sends.map(s=>({effect:s.effect,windowMs:s.deadline-s.issuedAt})),receiptInsideActivation:receipt.completedAt<sends.find(s=>s.effect==='activation').deadline}));
+ console.info('T3 native closure SYN',JSON.stringify({sourceRevision:f.source.sourceRevision,testRevision:process.env.GITHUB_SHA,receiptHash:receipt.receiptHash,grantTimestampNative:true,noticeLink:true,seededConnection:false,completePackage:false,operationalReadiness:false}));
+
+});
+
+const effectRows=p=>p.rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:'));
+const ticketUses=p=>p.rows.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use'));
+const receipts=p=>effectRows(p).filter(([k])=>k.endsWith(':receipt'));
+async function waitFirstState(f,predicate,label,observePost=false){
+ let end=performance.now()+30000,waitingPost=observePost,last;
+ for(;;){
+  // GET and POST have separate actual incoming roots. Observe the root whose
+  // native boundary is requested; this DATA timestamp never reaches the product.
+  if(waitingPost&&Number.isFinite(f.choicePostStarted)){end=f.choicePostStarted+30000;waitingPost=false;}
+  if(performance.now()>=end)break;
+  last=await plain(f.stub.firstConnectionState());if(predicate(last))return last;
+  if(waitingPost&&f.failedChoiceState)break;
+  await new Promise(r=>setTimeout(r,10));
+ }
+ const probe=await plain(f.stub.firstConnectionProbe());console.info('T3 missing boundary SYN',JSON.stringify({label,observePost,postObserved:observePost&&!waitingPost,choicePostStarted:f.choicePostStarted,state:{...last,http:undefined,trace:last?.trace?.slice(-12)},failures:probe.observation.filter(v=>['failure','connection-failure'].includes(v.kind)).slice(-8)}));
+ assert.fail('actual native boundary absent: '+label);
+}
+async function firstSettled(f){
+ const end=performance.now()+5000;
+ while(performance.now()<end){const probe=await plain(f.stub.firstConnectionAvailability());if(probe.available){assert.equal(probe.live,true);return;}await new Promise(r=>setTimeout(r,10));}
+ assert.fail('actual retained work did not settle');
+}
+async function failureCase(t,mode){
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);
+ const response=await approveFirstConnection(f);assert.notEqual(response.status,200,mode);await response.body?.cancel();
+ const state=f.failedChoiceState??await plain(f.stub.firstConnectionState()),probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0,mode);return {f,probe,state};
+}
+for(const mode of ['enrollment-transaction-lost','enrollment-sync-lost'])test('T3 enrollment unknown cannot upload: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key==='afw.finite-preparation-cleanup.v1:enrollment'&&v.kind==='put-settled'));assert(probe.rows.some(([k])=>k==='afw.finite-preparation-cleanup.v1:enrollment'));assert.equal(effectRows(probe).length,0);const factual=await plain(f.stub.firstConnectionContext());assert.equal(factual.source?.phase,'closed_ui');assert.equal(factual.source.currentPublication.stage,null);const source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,fresh=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.enrollmentToken(source)}});assert.notEqual(fresh.status,200,'genuinely fresh signed choice cannot resume enrollment');await fresh.body?.cancel();assert.equal(f.uploads.length,1);assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);
+});
+for(const mode of ['upload-send-transaction-lost','upload-lost','upload-malformed','upload-cached','upload-oversize'])test('T3 upload uncertainty cannot activate: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.activations.length,1);assert(state.trace.some(v=>v.key?.endsWith(':send')&&v.kind==='put-settled'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect==='activation'));const context=await plain(f.stub.firstConnectionContext()),publicProbe=await plain(f.stub.firstConnectionProbe());assert(publicProbe.observation.some(v=>v.kind==='public-partial-target'),'valid private partial pair reaches public denial predicate');assert.equal(context.status,'unavailable','public partial connection cannot appear closed_ui');assert.equal(f.uploads.length,mode==='upload-send-transaction-lost'?1:2);
+});
+for(const mode of ['activation-lost','activation-malformed','activation-cached'])test('T3 activation uncertainty cannot finish: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert(state.trace.some(v=>v.effect==='activation'&&v.kind==='native-result-enter'));assert(!effectRows(probe).some(([k,v])=>k.endsWith(':ack')&&JSON.parse(v).resourceId==='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'));assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+});
+for(const mode of ['receipt-transaction-lost','receipt-sync-lost','receipt-readback-lost','final-pair-owner-drift'])test('T3 final readback cannot turn uncertainty into success: '+mode,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const response=await approveFirstConnection(f);assert.notEqual(response.status,200);await response.body?.cancel();const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);assert.equal(receipts(probe).length,1,'durable own receipt preserved despite failed response');const state=await plain(f.stub.firstConnectionState());assert(state.trace.some(v=>v.key?.endsWith(':receipt')&&v.kind==='put-settled'));
+});
+for(const mode of ['upload-held','activation-held','upload-read-held','upload-cancel-held','source-sql-held','enrollment-transaction-held','enrollment-sync-held','upload-ack-held','receipt-transaction-held'])test('T3 retained work blocks a different live root: '+mode,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(mode);const pending=approveFirstConnection(f);
+ const which=['upload-held','activation-held'].includes(mode)?'fetch':mode==='upload-read-held'?'read':mode==='upload-cancel-held'?'cancel':'work';
+ const heldState=await waitFirstState(f,s=>s[which+'Held'],'held '+which,true),boundary=which==='cancel'?heldState.uploadAdmission:heldState[which+'Boundary'];assert.equal(boundary.originalMethod,mode==='source-sql-held'?'GET':'POST');assert(boundary.enteredAt>=boundary.startedAt&&boundary.enteredAt<boundary.deadline,'original business IO entered while its original request lease was live');console.info('T3 actual held entry',JSON.stringify({mode,originalIo:boundary,heldBoundary:heldState[which+'Boundary'],cleanupMayOutliveOriginal:which==='cancel'}));
+ const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();
+ const other=await plain(f.stub.firstConnectionAvailability());assert.equal(other.live,true,'different root is genuinely still live');assert.equal(other.available,false,'actual retained native work owns scope');
+ assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+ await f.stub.firstConnectionRelease(which);
+ if(which==='read'){await waitFirstState(f,s=>s.cancelHeld,'late read reached real cancel');assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.firstConnectionRelease('cancel');}
+ await firstSettled(f);const state=await plain(f.stub.firstConnectionState());assert.equal(state[which+'Settled'],true,'actual native settlement observed');if(which==='read')assert.equal(state.cancelSettled,true);if(['read','cancel'].includes(which))console.info('T3 retained cleanup settled',JSON.stringify({mode,originalIo:boundary,cancelBoundary:state.cancelBoundary,cancelSettled:state.cancelSettled,logicalResponse:response.status}));
+ const probe=await readFirstConnectionProbe(f);assert.equal(f.activations.length,['activation-held','receipt-transaction-held'].includes(mode)?2:1);assert.equal(receipts(probe).length,mode==='receipt-transaction-held'?1:0);assert.equal(effectRows(probe).filter(([k])=>k.endsWith(':ack')).length,mode==='receipt-transaction-held'?2:['activation-held','upload-ack-held'].includes(mode)?1:0);
+});
+for(const effect of ['upload','activation'])for(const variant of ['ack','context'])test('T3 resealed foreign publication is not own completion: '+effect+' '+variant,{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure(effect+'-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual '+effect+' result held',true);
+ assert.deepEqual(await plain(f.stub.firstConnectionReseal(effect,variant)),{codecRoundtrip:true,journalValid:true});
+ await f.stub.firstConnectionRelease('fetch');const response=await pending;assert.notEqual(response.status,200);await response.body?.cancel();await firstSettled(f);
+ const probe=await readFirstConnectionProbe(f);assert.equal(receipts(probe).length,0);assert.equal(f.activations.length,effect==='upload'?1:2);assert.equal((await plain(f.stub.firstConnectionContext())).status,'unavailable');
+});
+
+async function actualChoice(f,token){
+ const response=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.equal(response.status,200);
+ const html=await response.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(html)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(html)?.[1],cookie=response.headers.get('set-cookie')?.split(';')[0];assert(handle&&projectRef&&cookie);return {handle,projectRef,cookie};
+}
+const choicePost=(f,form,token,{body=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString(),headers={},url='/connections/finite-prepare'}={})=>f.call(url,{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':token,Cookie:form.cookie,...headers},body});
+test('T3 identity and choice cannot mint admission',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,valid=await f.firstConnectionToken(source),parts=valid.split('.'),signature=parts[2],badSignature=parts[0]+'.'+parts[1]+'.'+(signature[0]==='A'?'B':'A')+signature.slice(1);
+ const invalid=[['signature',badSignature],['issuer',await f.firstConnectionToken(source,{issuer:'https://foreign.invalid'})],['audience',await f.firstConnectionToken(source,{audience:'SYN-foreign-audience'})],['subject',await f.firstConnectionToken(source,{subject:'SYN-foreign-owner'})],['expiry',await f.firstConnectionToken(source,{expiresAt:Math.floor(Date.now()/1000)-1})]];
+ for(const [label,token]of invalid){const r=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
+ const form=await actualChoice(f,valid),normal=new URLSearchParams({handle:form.handle,projectRef:form.projectRef,decision:'approve'}).toString();
+ const cases=[['Origin',{headers:{Origin:'https://foreign.invalid'}}],['cookie repeat',{headers:{Cookie:form.cookie+'; '+form.cookie}}],['cookie list',{headers:{Cookie:form.cookie+'; bad name=x'}}],['handle',{body:normal.replace(form.handle,'f'.repeat(64))}],['projectRef',{body:normal.replace(form.projectRef,'e'.repeat(64))}],['decision',{body:normal.replace('approve','deny')}],['extra',{body:normal+'&extra=x'}],['duplicate',{body:normal+'&decision=approve'}],['escape',{body:normal+'&x=%ZZ'}],['oversize',{body:normal+'x'.repeat(1025)}],['UTF8',{body:new Uint8Array([0xff])}]];
+ for(const [label,patch]of cases){const r=await choicePost(f,form,valid,patch);assert.notEqual(r.status,200,label);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,label);assert.equal(effectRows(p).length,0,label);}
+ const ticketBaseline=(await readFirstConnectionProbe(f)).rows;
+ for(const variant of ['action','preconnection','source','subject-realm','project-map','snapshot']){
+  const altered=await plain(f.stub.firstConnectionTicketFault(variant));assert.equal(altered.codecRoundtrip,true,variant+' passes actual record codec');
+  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;const r=await choicePost(f,form,valid);assert.notEqual(r.status,200,'persisted ticket correlation '+variant);await r.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0,variant);assert.equal(effectRows(p).length,0,variant);assert(!p.rows.some(([key])=>key.startsWith('connection-approval:')),variant+' cannot approve');assert(p.native.observation.slice(observedBefore).some(v=>v.kind==='correlator'&&v.name===(variant==='snapshot'?'source-snapshot':'ticket-map')),variant+' reaches actual complete-snapshot correlator');
+  await f.stub.firstConnectionTicketFault('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,ticketBaseline,'original history restored after negative '+variant);
+  console.info('T3 actual ticket correlation',JSON.stringify({variant,codecRoundtrip:true,ticketUse:0,approval:0,effects:0}));
+ }
+ const accepted=await choicePost(f,form,valid);assert.equal(accepted.status,200,'same actual ticket and current owner remain usable after invalid inputs');await accepted.body?.cancel();assert.equal(receipts(await readFirstConnectionProbe(f)).length,1);
+});
+test('T3 source and rollback must be recoverable',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),headers={'Cf-Access-Jwt-Assertion':token};
+ for(const fault of ['module','configuration','qa-module','qa-namespace','sdk-alias','sdk-extra']){f.ownerFault=fault;const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();f.ownerFault=null;assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);}
+ for(const fault of ['missing-backup','missing-receipt','missing-chunk','tamper-chunk']){await f.stub.firstConnectionBackupFault(fault);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,fault);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0);await f.stub.firstConnectionBackupFault('restore');}
+
+ const originalProviderVersion=structuredClone(f.uploaded);
+ const configFaults=[
+  ['extra binding',v=>v.bindings.push({name:'SYN_UNAPPROVED_BINDING',type:'plain_text',text:'false'})],
+  ['ordinary monitoring flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED').text='true';}],
+  ['events flag',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';}],
+  ['nonempty policy',v=>{v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text='{"SYN":"not empty"}';}],
+  ['physical namespace',v=>{v.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_CONTROL').namespace_id='f'.repeat(32);}],
+  ['limiter',v=>{v.bindings.find(b=>b.name==='DELEGATED_RATE_LIMITER').namespace_id='99199';}],
+  ['secret value',v=>{v.bindings.find(b=>b.type==='secret_text').text='SYN NEGATIVE NEVER AUTHORITY';}]
+ ];
+ for(const [label,mutate]of configFaults){mutate(f.uploaded);const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,label);await r.body?.cancel();assert.equal(effectRows(await readFirstConnectionProbe(f)).length,0,label);assert.equal(ticketUses(await readFirstConnectionProbe(f)).length,0,label);f.uploaded=structuredClone(originalProviderVersion);}
+ const original=(await f.db.prepare('SELECT id,user_id,revision FROM site_projects WHERE id=?').bind(source.project.projectId).first());
+ for(const field of ['user_id','revision']){if(field==='user_id')await f.db.prepare("UPDATE site_projects SET user_id='SYN-owner-drift' WHERE id=?").bind(original.id).run();else await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(original.id).run();const r=await f.call('/connections/finite-prepare',{headers});assert.notEqual(r.status,200,field);await r.body?.cancel();await f.db.prepare('UPDATE site_projects SET user_id=?,revision=? WHERE id=?').bind(original.user_id,original.revision,original.id).run();}
+ const form=await actualChoice(f,token);assert(form.handle);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+});
+test('T3 original deadline fences each native boundary: shorter signed Access before TicketUse',{timeout:120000},async t=>{
+ const f=await fixture(t),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,expiresAt=Math.floor((Date.now()+5000)/1000),token=await f.firstConnectionToken(source,{expiresAt});assert(Date.now()<expiresAt*1000);
+ await f.stub.firstConnectionConfigure('access-expiry-held');const pending=f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});const state=await waitFirstState(f,s=>s.jwkFetched&&s.workHeld,'actual signed verification followed by retained factual read');assert.equal(state.workSettled,undefined);
+ await new Promise(resolve=>setTimeout(resolve,Math.max(1,expiresAt*1000-Date.now()+1)));await f.stub.firstConnectionRelease('work');const response=await pending;assert.equal(response.status,401,'current signed expiry crosses before ticket/admission');await response.body?.cancel();await firstSettled(f);const p=await readFirstConnectionProbe(f);assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);assert.equal(f.uploads.length,1);
+});
+test('T3 admission cannot cross lineage or resume',{timeout:120000},async t=>{
+ const {f,probe}=await failureCase(t,'upload-lost');await firstSettled(f);const before=probe.rows,source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source);await f.stub.firstConnectionRestore();
+ const replay=()=>choicePost(f,f.choice,token);
+ for(const step of ['new root','actual actor restart']){
+  if(step==='actual actor restart'){const instance=await f.stub.firstConnectionInstance();await assert.rejects(async()=>{await f.stub.firstConnectionRestart();});const bindings=await f.mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));assert.notEqual(await f.stub.firstConnectionInstance(),instance);}
+  const r=await replay();assert.notEqual(r.status,200,step);await r.body?.cancel();assert.equal(f.uploads.length,2);assert.equal(f.activations.length,1);assert.deepEqual((await readFirstConnectionProbe(f)).rows,before,'consumed history and unrelated rows preserved');
+ }
+});
+
+test('T3 resealed completed owner baseline physical and receipt facts remain correlated',{timeout:120000},async t=>{
+ const f=await fixture(t),response=await approveFirstConnection(f);assert.equal(response.status,200);await response.body?.cancel();
+ const baseline=await readFirstConnectionProbe(f),posts=baseline.providerRequests.filter(r=>r.method==='POST').length;
+ const variants=['owner','source','context','baseline','preconnection','module','configuration','version','deployment','writer-head','receipt-links','receipt-time'];
+ for(const variant of variants){
+  assert.equal((await plain(f.stub.firstConnectionContext())).source?.phase,'read_consent','valid produced baseline before '+variant);
+  assert.deepEqual(await plain(f.stub.firstConnectionCorruptCompleted(variant)),{codecRoundtrip:true,journalValid:true},variant);
+
+  const observedBefore=(await plain(f.stub.firstConnectionProbe())).observation.length;
+  const r=await plain(f.stub.firstConnectionContext());assert.equal(r.status,'unavailable',variant+' must fail current correlation after valid codecs/journals');
+  const newObservations=(await plain(f.stub.firstConnectionProbe())).observation.slice(observedBefore),target={owner:'preparation',source:'preparation',context:'connection-history',baseline:'connection-history',module:'receipt-physical-hash',configuration:'receipt-physical-hash',version:'publication-pointer',deployment:'publication-pointer','writer-head':'writer-head'}[variant];
+  if(target)assert(newObservations.some(v=>v.kind==='correlator'&&v.name===target),variant+' reaches intended '+target+' correlator');
+  else assert(newObservations.some(v=>v.frames?.some(frame=>frame.includes('qualifyFiniteOwnerInstalledStage'))),variant+' reaches installed-stage receipt link/time correlator');
+
+  const probe=await readFirstConnectionProbe(f),observations=probe.native.observation.filter(v=>v.kind==='public-reader-rejected');assert(observations.length,variant);console.info('T3 completed correlator',JSON.stringify({variant,codecRoundtrip:true,journalValid:true,frames:observations.at(-1).frames}));
+  assert.equal(probe.providerRequests.filter(r=>r.method==='POST').length,posts,'no next provider effect for '+variant);
+  await f.stub.firstConnectionCorruptCompleted('restore');assert.deepEqual((await readFirstConnectionProbe(f)).rows,baseline.rows,'foreign/original rows preserved for '+variant);
+ }
+});
+test('T3 own completion requires genuinely recorded original ACK even when foreign bytes match',{timeout:120000},async t=>{
+ const f=await fixture(t);await f.stub.firstConnectionConfigure('upload-held');const pending=approveFirstConnection(f);await waitFirstState(f,s=>s.fetchHeld,'actual upload result held',true);
+ assert.deepEqual(await plain(f.stub.firstConnectionReseal('upload','ack-matched')),{codecRoundtrip:true,journalValid:true});
+ await f.stub.firstConnectionRelease('fetch');const response=await pending,status=response.status;await response.body?.cancel();await firstSettled(f);const before=await readFirstConnectionProbe(f);assert(before.native.observation.some(v=>v.kind==='journal-mutation'&&v.recordKind==='ConnectionAck'&&v.status==='existing'),'exact valid foreign bytes reach the own-recorded guard');console.info('T3 recorded ACK target',JSON.stringify({status,activations:before.activations,mutant:f.firstConnectionBuild.negativeMutation??null}));assert.notEqual(status,200,'existing foreign ACK cannot be accepted by own continuation');assert.equal(f.activations.length,1);assert.equal(receipts(before).length,0);
+});
+
+for(const mode of ['clock-backward','source-holder-drift','upload-holder-drift','activation-holder-drift','upload-metadata-id-drift','upload-db-method-drift','upload-db-prepare-drift','upload-node-method-drift','upload-self-method-drift','upload-kv-method-drift','upload-fetch-drift','upload-credential-drift'])test('T3 original deadline and holder references remain original: '+mode,{timeout:120000},async t=>{
+ const {f,probe,state}=await failureCase(t,mode);assert.equal(mode==='clock-backward'?state.backward:state.holderChanged,true,'actual native guard boundary reached');if(mode!=='clock-backward')assert.deepEqual(state.afterDriftIo,{get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0},'changed original holder cannot invoke the next native factual read');
+ assert.equal(f.uploads.length,['clock-backward','source-holder-drift'].includes(mode)?1:2);assert.equal(f.activations.length,mode==='activation-holder-drift'?2:1);
+ assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,mode==='activation-holder-drift'?1:0,'changed original holder cannot produce ACK');if(mode!=='activation-holder-drift')assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation'),'changed original holder denies activation SEND');if(['clock-backward','source-holder-drift'].includes(mode))assert.equal(ticketUses(probe).length,0);
+});
+test('T3 original parent expires before first native IO',{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f);const result=await plain(f.stub.firstConnectionExpiredEntry());assert.notEqual(result.status,200);const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length,'expired original boundary admits no provider IO');assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
+});
+for(const kind of ['overflow','read'])test('T3 original body retains real read and cancellation: '+kind,{timeout:120000},async t=>{
+ const f=await fixture(t),before=await readFirstConnectionProbe(f),pending=plain(f.stub.firstConnectionBodyStart(kind));
+ const until=async predicate=>{const end=performance.now()+10000;while(performance.now()<end){const state=await plain(f.stub.firstConnectionBodyState());if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('actual body boundary absent '+kind);};
+ await until(s=>kind==='read'?s.readHeld:s.cancelHeld);
+ if(kind==='read')await f.stub.firstConnectionBodyControl('abort');
+ const response=await pending;assert.notEqual(response.status,200);const competing=await plain(f.stub.firstConnectionAvailability());assert.equal(competing.live,true);assert.equal(competing.available,false);
+ if(kind==='read'){await f.stub.firstConnectionBodyControl('read');await until(s=>s.cancelHeld);assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);}
+ await f.stub.firstConnectionBodyControl('cancel');await until(s=>s.cancelSettled);await firstSettled(f);
+ const state=await plain(f.stub.firstConnectionBodyState());assert.equal(state.logicalFinished,true);assert.equal(state.cancelSettled,true);if(kind==='read')assert.equal(state.readSettled,true);
+ const after=await readFirstConnectionProbe(f);assert.equal(after.providerRequests.length,before.providerRequests.length);assert.deepEqual(after.rows,before.rows);assert.equal(ticketUses(after).length,0);assert.equal(effectRows(after).length,0);
+});
+
+test('T3 fixed protocol and genuinely compiled foreign profile cannot mint choice',{timeout:120000},async t=>{
+ const f=await fixture(t,{negativeProfile:true}),source=(await plain(f.stub.capsuleFacts())).material.ownerSelection,token=await f.firstConnectionToken(source),initial=await readFirstConnectionProbe(f);
+ assert.equal(typeof f.firstConnectionBuild.wrongProfileHash,'string');assert.notEqual(f.firstConnectionBuild.wrongProfileHash,f.firstConnectionBuild.M.sha256);
+ const wrong=await f.wrongProfile.fetch(O+'/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token}});assert.notEqual(wrong.status,200);await wrong.body?.cancel();
+ const wrongProbe=await (await f.wrongProfile.fetch(O+'/_fixture/probe')).json();assert.equal(wrongProbe.ordinary,0);assert.equal(wrongProbe.sql,0);assert.equal(wrongProbe.forwarded,0);assert.equal((await readFirstConnectionProbe(f)).native.calls.length,0);
+ const transport=()=>{const at=Date.now();return new Headers({'x-afw-finite-boundary':JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':O+'/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),'Cf-Access-Jwt-Assertion':token});};
+ const cases=[['extra protocol',h=>h.set('x-afw-finite-extra','SYN unknown')],['duplicate version',h=>h.append('x-afw-finite-version',h.get('x-afw-finite-version'))],['duplicate request ID',h=>h.append('x-afw-finite-request-id',h.get('x-afw-finite-request-id'))],['duplicate original method',h=>h.append('x-afw-finite-original-method','GET')],['duplicate boundary',h=>h.append('x-afw-finite-boundary',h.get('x-afw-finite-boundary'))]];
+ for(const [label,change]of cases){const headers=transport();change(headers);const response=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.notEqual(response.status,200,label);await response.body?.cancel();const p=await readFirstConnectionProbe(f);assert.equal(p.providerRequests.length,initial.providerRequests.length,label+' denies before factual IO');assert.equal(ticketUses(p).length,0);assert.equal(p.native.business.length,0);assert.equal(effectRows(p).length,0);}
+ const headers=transport();headers.set('X-SYN-Unrelated-Trace','ignored input, never permission');const counterpart=await f.stub.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers});assert.equal(counterpart.status,200,'same signed fixed protocol otherwise reaches real choice');await counterpart.body?.cancel();const p=await readFirstConnectionProbe(f);assert(p.native.business.some(key=>key.startsWith('owner-ticket:')));assert.equal(ticketUses(p).length,0);assert.equal(effectRows(p).length,0);
+ console.info('T3 compiled profile negative',JSON.stringify({positiveM:f.firstConnectionBuild.M.sha256,negativeProfileM:f.firstConnectionBuild.wrongProfileHash,protocolVariants:cases.length,ignoredUnrelatedHeader:true}));
+});
+
+for(const fault of ['upload-module','upload-config','upload-pointer','activation-pointer','activation-percentage','activation-version','activation-config','activation-secret'])test('T3 actual publication readback denies next effect: '+fault,{timeout:120000},async t=>{
+ const f=await fixture(t);f.connectionReadbackFault=fault;
+ const response=await approveFirstConnection(f);assert.notEqual(response.status,200,fault);await response.body?.cancel();
+ assert(f.connectionReadbackHits>0,'actual fixed provider readback reached '+fault);
+ const probe=await readFirstConnectionProbe(f);assert.equal(f.uploads.length,2,'actual original upload was applied');
+ assert.equal(f.activations.length,fault.startsWith('upload-')?1:2,'invalid upload readback cannot activate');
+ assert.equal(receipts(probe).length,0,'invalid activation readback cannot issue receipt');
+ assert(!effectRows(probe).some(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect==='activation')||fault.startsWith('activation-'),'invalid upload readback denies activation SEND');
+ assert.equal(effectRows(probe).filter(([key])=>key.endsWith(':ack')).length,fault.startsWith('upload-')?1:2,'original native ACKs preserved without compensation');
+ console.info('T3 actual readback target',JSON.stringify({fault,hits:f.connectionReadbackHits,uploads:f.uploads.length,activations:f.activations.length,receipt:0}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-first-connection-publication.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-first-connection-publication.test.mjs b/test/mcp-qa-finite-first-connection-publication.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-first-connection-publication.test.mjs
@@ -0,0 +1,167 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {access,mkdir,writeFile} from 'node:fs/promises';
+test('T1 fixed engine exposes only finite operations',async()=>{
+ await assert.doesNotReject(access('lib/mcp-qa-finite-fixed-policy-engine.mjs'),'fixed finite operation contract must exist before publication');
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs');
+ const engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
+ assert(Object.isFrozen(engine));
+ assert.deepEqual(Object.keys(engine).sort(),['activate','describeActivation','describeUpload','readPointer','readVersion','upload'].sort());
+});
+test('T1 enrollment preserves literal chronology and one shot',async()=>{
+ await assert.doesNotReject(access('lib/mcp-qa-finite-preparation-enrollment-writer.mjs'),'fixed factual enrollment writer contract must exist');
+ await component('normal',async(result,f)=>{
+  assert.equal(result.failure,null,JSON.stringify(result));assert.equal(result.settled,true);
+  assert.deepEqual(result.trace.slice(result.trace.indexOf('put:enrollment')),["put:enrollment","transaction-settled","sync","get:enrollment","alarm","list:","alarm","get:enrollment","put:ack","transaction-settled","sync","get:ack","alarm","list:","alarm","get:ack","get:enrollment"]);
+  assert(result.enrollment);assert(result.ack);assert.equal(result.ack.enrollmentHash,result.enrollment.recordHash);
+  assert(result.ack.acknowledgedAt>=result.enrollment.issuedAt);assert(result.ack.acknowledgedAt<result.enrollment.deadline);
+  assert(result.enrollment.deadline-result.enrollment.issuedAt<=5000);
+  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]),plan=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);
+  for(const key of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1','capsuleHash','entryHash','materialHash'])assert.equal(result.enrollment[key],capsule[key]);
+  for(const key of ['manifestHash','readerId','publisherId','readerExpiresAt','publisherExpiresAt','baselineVersionId','baselineDeploymentId'])assert.equal(result.enrollment[key],plan[key]);
+  assert.equal(result.ack.alarmAt,capsule.C0);assert.equal(await f.stub.alarmInfo(),capsule.C0);
+  assert.equal(result.enrollment.C0,result.enrollment.I0+900000);assert.equal(result.enrollment.C1,result.enrollment.C0+180000);
+ });
+});
+
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {plain,exerciseEnrollmentWriter} from './fixtures/finite-first-connection-publication.mjs';
+test('T1 baseline enrollment chronology remains native and pending',async()=>{
+ const f=await initialEntryHarness('first-connection-enrollment-component');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);
+  const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);f.nowOffset=capsule.I0+400000-Date.now();
+  const screen=await plain(f.stub.enrollmentScreen(token));assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
+  const observed=await plain(f.stub.captureLegacyEnrollment(token,screen));
+  assert.equal(observed.result.result.outcome.status,'admin_pending',JSON.stringify(observed));
+  assert.equal(observed.result.prepared.status,202);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+  assert(observed.trace.includes('put:enrollment'));assert(observed.trace.includes('put:ack'));
+  console.info('T1 legacy enrollment trace',JSON.stringify(observed.trace));
+  const written=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-cleanup.v1:'));
+  console.info('T1 legacy enrollment DATA',JSON.stringify(written.map(([key,raw])=>({key,record:JSON.parse(raw)}))));
+ }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+});
+
+async function component(scenario,inspect){
+ const f=await initialEntryHarness('first-connection-enrollment-component');
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  await inspect(await exerciseEnrollmentWriter(f,scenario),f);
+ }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+}
+for(const scenario of ['double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'])test('T1 factual enrollment refuses '+scenario+' without repeated IO',()=>component(scenario,async result=>{
+ assert.equal(result.settled,true);assert(result.failure,JSON.stringify(result));assert(result.trace.includes('writer-prepared'),JSON.stringify(result));
+ assert(result.trace.filter(value=>value==='put:enrollment').length<=1);
+ assert(result.trace.filter(value=>value==='put:ack').length<=1);
+ if(['ack-first','holder-drift','deadline'].includes(scenario))assert.equal(result.trace.filter(value=>value.startsWith('put:')).length,0);
+ if(scenario==='unknown-enrollment'){assert.equal(result.trace.filter(value=>value==='put:enrollment').length,1);assert.equal(result.trace.filter(value=>value==='put:ack').length,0);}
+ if(scenario==='unknown-ack')assert.equal(result.trace.filter(value=>value==='put:ack').length,1);
+}));
+import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
+test('T1 fixed descriptions preserve literal wire and secret baseline inheritance',async()=>{
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
+ const configuration=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}}),baselineVersionId='22222222-2222-4222-8222-222222222222',bytes=new Uint8Array([1,2,3]);
+ const upload=engine.describeUpload({configuration,baselineVersionId,bytes});
+ assert.equal(upload.method,'POST');assert.equal(upload.path,'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false');
+ assert.deepEqual(upload.body,{...configuration,containers:configuration.containers.map(({class_name})=>({class_name})),bindings:configuration.bindings.map(value=>value.type==='secret_text'?{name:value.name,type:'inherit',version_id:baselineVersionId}:value),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:'AQID'}]});
+ assert.deepEqual(engine.describeActivation({versionId:baselineVersionId}),{method:'POST',path:'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments',body:{strategy:'percentage',versions:[{version_id:baselineVersionId,percentage:100}]}});
+ const activation=engine.describeActivation({versionId:baselineVersionId}),original=globalThis.fetch;
+ try{
+  const requests=[];globalThis.fetch=async(path,options)=>{requests.push({method:options.method,path,body:JSON.parse(options.body)});return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
+  const native=createFiniteFixedPolicyEngine({ctx:{},env:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
+  await native.upload({configuration,baselineVersionId,bytes},lease);await native.activate({versionId:baselineVersionId},lease);
+  assert.deepEqual(requests,[upload,activation],'description and effective native request are identical');
+ }finally{globalThis.fetch=original;}
+
+});
+test('T1 engine holder drift is absorbing before another provider effect',async()=>{
+ const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),original=globalThis.fetch;
+ try{
+  let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
+  const env={AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},engine=createFiniteFixedPolicyEngine({ctx:{},env},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
+  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_CHANGED_PUBLISHER_00000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
+  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_PUBLISHER_000000000000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
+  assert.equal(calls,0);
+ }finally{globalThis.fetch=original;}
+});
+
+import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
+import {execFileSync} from 'node:child_process';
+import {createHash as firstHash} from 'node:crypto';
+import {gunzipSync as firstInflate} from 'node:zlib';
+import {createFiniteOwnerRequestLease} from '../lib/mcp-qa-finite-owner-preparation.mjs';
+import {forwardFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-native-bridge.mjs';
+const O='https://delegated-canary.agentfriendlyweb.dev',U=O+'/connections/finite-prepare',V='11111111-1111-4111-8111-111111111111',H='a'.repeat(64),P='b'.repeat(64);
+const validForm='handle='+H+'&projectRef='+P+'&decision=approve';
+function conduit(fetcher){
+ const sent=[],retained=[],stub={fetch(request){sent.push(request);return fetcher(request);}},ns={idFromName(){return {toString:()=> 'c'.repeat(64)};},get(){return stub;}};
+ return {sent,retained,env:{AFW_FINITE_TRIAL_CONTROL:ns,AFW_FINITE_TRIAL_VERSION:{id:V},DB:{prepare(){},withSession(){}},OAUTH_KV:{get(){},put(){}},DELEGATED_RATE_LIMITER:{limit(){}}},ctx:{waitUntil(p){retained.push(p);}}};
+}
+const html=()=>new Response('<!doctype html><p>Prepared</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'",'Referrer-Policy':'no-referrer','Cache-Control':'no-store'}});
+async function choice(f,options={},url=U){
+ const request=new Request(url,options),parent=createFiniteOwnerRequestLease(request);
+ try{return await forwardFiniteOwnerChoice({request,...f},parent.lease);}finally{parent.finish();await Promise.all(f.retained);}
+}
+function post(body=validForm,headers={}){return {method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+H,...headers},body};}
+test('T2 initial artifact already contains fixed finite dispatch',async()=>{
+ const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:revision}),m=r.metafiles.canaryLive.inputs,q=r.metafiles.qaLive.inputs;
+ const artifacts='output/t2-graphs';await mkdir(artifacts,{recursive:true});
+ await Promise.all([
+  writeFile(artifacts+'/compiler-metafiles.json',JSON.stringify(r.metafiles,null,2)),
+  writeFile(artifacts+'/compiler.json',JSON.stringify({purpose:r.purpose,sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,modules:r.modules,candidateResidency:{...r.candidateResidency,content:undefined},completePackage:r.completePackage,operationalReadiness:r.operationalReadiness},null,2)),
+  writeFile(artifacts+'/canary-index.mjs',r.files['canaryLive/index.mjs']),
+  writeFile(artifacts+'/qa-index.mjs',r.files['qaLive/index.mjs'])
+ ]);
+ for(const path of ['lib/mcp-qa-finite-owner-native-bridge.mjs','lib/mcp-qa-finite-owner-oauth-forward.mjs','lib/mcp-qa-finite-owner-notice-get-forward.mjs'])assert(m[path],'initial M must contain '+path);
+ for(const path of ['lib/mcp-qa-finite-owner-native-receiver.mjs','lib/mcp-qa-finite-owner-oauth-qa.mjs','lib/mcp-qa-finite-owner-notice-get-qa.mjs'])assert(q[path],'initial QA must contain '+path);
+ assert.equal(m['lib/mcp-qa-finite-candidate-residency.mjs'],undefined);assert(q['lib/mcp-qa-finite-candidate-residency.mjs']);
+ assert.deepEqual(firstInflate(Buffer.from(r.candidateResidency.content,'base64')),r.files['canaryLive/index.mjs']);
+ for(const role of ['canaryLive','qaLive'])console.info('T2 compiler',JSON.stringify({role,sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,bytes:r.files[role+'/index.mjs'].length,sha256:firstHash('sha256').update(r.files[role+'/index.mjs']).digest('hex'),inputs:Object.keys(r.metafiles[role].inputs).length}));
+ assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
+});
+test('T2 choice grammar bounds actual body and cookies',async t=>{
+ const cases=[
+  ['overflow',post('x'.repeat(1025)),413],['utf8',post(new Uint8Array([0xc3,0x28])),503],
+  ['escape',post(validForm+'&bad=%GG'),400],['encoded utf8',post(validForm.replace(H,'%FF')),400],
+  ['extra',post(validForm+'&extra=1'),400],['duplicate',post(validForm+'&handle='+H),400],
+  ['decision',post(validForm.replace('approve','deny')),400],['short handle',post(validForm.replace(H,'a')),400],
+  ['project',post(validForm.replace(P,'b')),400],['missing cookie',post(validForm,{Cookie:''}),400],
+  ['absent cookie',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:validForm},403],
+  ['cookie separator',post(validForm,{Cookie:'other=x;__Host-afw-finite-prepare='+H}),400],
+  ['cookie name',post(validForm,{Cookie:'bad name=x; __Host-afw-finite-prepare='+H}),400],
+  ['cookie duplicate',post(validForm,{Cookie:'__Host-afw-finite-prepare='+H+'; __Host-afw-finite-prepare='+H}),400],
+  ['foreign duplicate',post(validForm,{Cookie:'x=1; x=2; __Host-afw-finite-prepare='+H}),400],
+  ['mismatch',post(validForm,{Cookie:'__Host-afw-finite-prepare='+P}),403],
+  ['legacy cookie',post(validForm,{Cookie:'SYN-cookie'}),400],['legacy form',post('SYN=bounded'),400],
+  ['content-type',post(validForm,{'Content-Type':'text/plain'}),400],['origin',post(validForm,{Origin:'https://other.invalid'}),403]
+ ];
+ for(const [name,options,status]of cases)await t.test(name,async()=>{const f=conduit(html),r=await choice(f,options);assert.equal(r.status,status,name);assert.equal(f.sent.length,0,'invalid choice must not enter QA');});
+ for(const [name,options]of [['get',{}],['get valid foreign cookie',{headers:{Cookie:'synthetic="valid value"'}}],['post',post()],['post foreign cookie',post(validForm,{Cookie:'other=""; __Host-afw-finite-prepare='+H})]]){
+  // Cookie values follow RFC6265 octets: a quoted space is still invalid.
+  if(name==='get valid foreign cookie')options.headers.Cookie='synthetic="valid-value"';
+  await t.test(name,async()=>{const f=conduit(html),r=await choice(f,options);assert.equal(r.status,200);assert.equal(f.sent.length,1);assert.match(await r.text(),/Prepared/);});
+ }
+ for(const suffix of ['?q=1','#fragment']){const f=conduit(html);assert.equal((await choice(f,{},U+suffix)).status,404);assert.equal(f.sent.length,0);}
+});
+test('T2 choice response only carries bounded QA HTML and allowed headers',async t=>{
+ for(const [name,make,status]of [
+  ['pending',()=>Response.json({status:'admin_pending'},{status:503}),503],
+  ['json',()=>Response.json({success:true}),503],['header',()=>new Response('html',{headers:{'Content-Type':'text/html','X-Provider-Secret':'SYN'}}),503],
+  ['oversize',()=>new Response('x'.repeat(16385),{headers:{'Content-Type':'text/html'}}),503],['status202',()=>new Response('partial',{status:202,headers:{'Content-Type':'text/html'}}),503],
+  ['html',html,200]
+ ])await t.test(name,async()=>{const f=conduit(make),r=await choice(f);assert.equal(r.status,status);assert.equal(r.headers.get('X-Provider-Secret'),null);assert.equal(r.headers.get('Cache-Control'),'no-store');if(status===200){assert(r.headers.has('Content-Security-Policy'));assert.equal(r.headers.get('Referrer-Policy'),'no-referrer');}});
+});
+
+test('T2 original headers and signal remain fixed until actual continuation',async()=>{
+ let entered,release;const ready=new Promise(r=>{entered=r;}),f=conduit(()=>{entered();return new Promise(r=>{release=r;});});
+ const request=new Request(U,{headers:{Cookie:'synthetic=one'}}),parent=createFiniteOwnerRequestLease(request);
+ try{
+  const pending=forwardFiniteOwnerChoice({request,...f},parent.lease);await ready;request.headers.set('Cookie','synthetic=two');release(html());assert.equal((await pending).status,503);assert.equal(f.sent.length,1);
+ }finally{parent.finish();await Promise.all(f.retained);}
+ const g=conduit(html),get=new Request(U),body=new ReadableStream({start(c){c.enqueue(new Uint8Array([1]));c.close();}});
+ Object.defineProperty(get,'body',{value:body});
+ const original=createFiniteOwnerRequestLease(get);
+ try{assert.equal((await forwardFiniteOwnerChoice({request:get,...g},original.lease)).status,400);assert.equal(g.sent.length,0);}
+ finally{original.finish();await Promise.all(g.retained);}
+});

~~~~~~~~~~

## test/mcp-qa-finite-historical-source-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-historical-source-native.test.mjs b/test/mcp-qa-finite-historical-source-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-historical-source-native.test.mjs
@@ -0,0 +1,221 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {readFile} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
+import {QA_CLOUD_CLOSED_PINS as REAL_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
+const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec',APP='d6fc71552de7494a863aca20365a572d',VERSION='2607abae-cec3-4e35-89eb-8b8572262b54',QA='11111111-1111-4111-8111-111111111111';
+const PRODUCTION_CEILING=Date.parse('2026-11-03T02:59:00Z');
+const CEILING_DECLARATION="CEILING=Date.parse('2026-11-03T02:59:00Z')";
+const keys=['afw.canary-restoration-control.v1','afw.private-prepared-dispatch.v1','afw.private-reduction-dispatch.v1','afw.successor-canary-restoration.v1','afw.successor-retirement-handoff.v1'];
+function fixture(ids){
+ const at=Date.now()-600000,start=at+20000,end=start+60000,script='//'+('"'.repeat(1830100))+'\nexport default{};',hash=sha(script),original={containerId:ids.original,applicationId:APP,programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40)},candidate={trialId:'3'.repeat(64),programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40),startAt:start,expiresAt:end,budget:1};
+ const events={grantId:'cancelled-old',subject:'owner',projectId:'synthetic-project',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',startAt:start,expiresAt:end};
+ const scope={accountId:ACCOUNT,workerName:'agent-friendly-web-delegated-canary',namespaceId:APP,applicationId:APP,ownerRef:'6'.repeat(64),projectRef:'7'.repeat(64),resource:events.resource};
+ const successor={scope,original,candidate,publication:{artifactKey:'8'.repeat(64),workerHash:hash,activationKey:'9'.repeat(64)}};
+ const retirement={...events,grantId:'original',containerId:ids.original,startAt:at,expiresAt:at+10000,programHash:original.programHash,sourceRevision:original.sourceRevision};
+ const bindings=[...Object.entries({AFW_DOSSIER_SUCCESSOR_POLICY:J(successor),AFW_DOSSIER_EVENTS_POLICY:J(events),AFW_DOSSIER_RETIREMENT_POLICY:J(retirement),AFW_OAUTH_PILOT_CLIENT_ID:events.clientId,AFW_OAUTH_PILOT_PROJECT_ID:events.projectId,AFW_OAUTH_RESOURCE:events.resource,AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1'}).map(([name,text])=>({name,type:'plain_text',text})),{name:'DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',class_name:'AfwOwnEventNode',namespace_id:APP},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'},{name:'AFW_DOSSIER_EVENTS_CUSTODY_KEY',type:'secret_text'}];
+ for(const name of ['AFW_DELEGATED_OAUTH_ENABLED','AFW_OAUTH_REFRESH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED'])bindings.push({name,type:'plain_text',text:'false'});
+ while(bindings.length<29)bindings.push({name:'HISTORICAL_EXTRA_'+bindings.length,type:'plain_text',text:''});
+ const container='agent-friendly-web-delegated-canary-afwowneventnode';
+ const cfg={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',containers:[{class_name:'AfwOwnEventNode',name:container}],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite',container}},bindings};
+ const receipt={baseVersionId:VERSION,artifactKey:sha(J([ACCOUNT,scope.workerName,hash])),sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:candidate.programHash,workerHash:hash,workerBytes:Buffer.byteLength(script),sourceCheck:'git-inputs-before-after-v1'};
+ const closure={operation:'restore_canary',startAt:start+1000,expiresAt:end,candidate:{containerId:ids.candidate,applicationId:APP,programHash:candidate.programHash,sourceRevision:candidate.sourceRevision},live:{versionId:QA,deploymentId:QA,configurationHash:'c'.repeat(64)},closed:{versionId:VERSION,moduleHash:hash,moduleBytes:receipt.workerBytes,configurationHash:restorationConfigurationHash(cfg)},operator:{versionId:'22222222-2222-4222-8222-222222222222',deploymentId:'33333333-3333-4333-8333-333333333333',moduleHash:'d'.repeat(64),moduleBytes:100,configurationHash:'e'.repeat(64)}};
+ const control={purpose:keys[0],planHash:sha(J(closure)),policy:J(closure),armedAt:start-1000,withdrawnAt:end+1000},prepared={purpose:keys[1],planHash:control.planHash,withdrawalHash:'f'.repeat(64),phase:'issued',issuedAt:start,completedAt:null,dispatchPolicyHash:'0'.repeat(64)},reduced={purpose:keys[2],planHash:control.planHash,withdrawalHash:prepared.withdrawalHash,phase:'complete',issuedAt:start+2000,completedAt:start+3000};
+ const historical={purpose:'afw.qa-legacy-historical-context.v1',controlHash:sha(J(control)),closurePolicyHash:control.planHash,namedPolicyHash:'a'.repeat(64),namedBundleHash:'b'.repeat(64),dispatchPolicyHash:prepared.dispatchPolicyHash,withdrawalPolicyHash:prepared.withdrawalHash,trialIdHash:sha(candidate.trialId),grantIdHash:sha(events.grantId),eventIdHash:'c'.repeat(64),journalHashes:{restoration:null,retirement:null,preparedDispatch:sha(J(prepared)),reductionDispatch:sha(J(reduced))},artifactSourceRevision:receipt.sourceRevision,artifactSourceTree:receipt.sourceTree,artifactProgramHash:receipt.programHash,artifactWorkerHash:receipt.workerHash,evidence:{qaVersionId:QA,operatorVersionId:closure.operator.versionId,operatorModuleHash:closure.operator.moduleHash,operatorModuleBytes:100}};
+ return {at,start,end,script,receipt,historical,cfg,events,original,candidate,rows:[[keys[0],control],[keys[1],prepared],[keys[2],reduced]],pin:{name:scope.workerName,id:VERSION,configurationHash:restorationConfigurationHash(cfg),bindingCount:29,flagCount:8,module:{name:'index.mjs',bytes:receipt.workerBytes,sha256:hash},deploymentId:QA},metadata:{id:VERSION,...cfg,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}],urls:[]}};
+}
+async function seed(db,x){
+ await db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL); CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT);');
+ for(const file of ['db/dossier-node-process.sql','db/dossier-monitoring-consent.sql'])for(const m of (await readFile(file,'utf8')).matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();
+ await db.prepare('INSERT INTO site_projects VALUES(?,?)').bind('synthetic-project','owner').run();
+ for(const id of ['original','cancelled-old'])await db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,'owner','client','synthetic-project',x.events.resource,'["afw:project:read"]',new Date(x.at-1000).toISOString(),new Date(x.end).toISOString(),new Date(x.start+4000).toISOString(),new Date(x.at).toISOString()).run();
+ await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('original','synthetic-project','owner','client',x.events.resource,1,x.at,x.at+10000,x.original.containerId,'e'.repeat(64),x.original.programHash,x.original.sourceRevision,'cloudflare/debian-trixie',x.at,x.at+10000).run();
+ for(const [id,generation,container,program,source,closed]of [['original','e'.repeat(64),x.original.containerId,x.original.programHash,x.original.sourceRevision,x.at+15000],['cancelled-old',null,x.ids.candidate,x.candidate.programHash,x.candidate.sourceRevision,x.start+5000]])await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind(id,generation,container,program,source,'cloudflare/debian-trixie',closed).run();
+ for(const [sequence,id,action,issued,expires]of [[1,'original','grant',x.at,x.at+10000],[2,'cancelled-old','grant',x.start,x.end],[3,'cancelled-old','revoke',x.start+4000,x.start+4000]])await db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(sequence,id,'synthetic-project','owner','client',x.events.resource,1,action,'afw.dossier-monitoring.v1','request-'+sequence,issued,expires).run();
+}
+async function harness(actualPins=false,productionExpiry=null,commitmentFault=null){
+ const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:QA},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader'},d1Databases:{RELEASE_DB:'history'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'History',useSQLite:true,uniqueKey:'history-b2'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'history-node-b2'}}};
+ const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class History extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
+ const first=await mf.getBindings(),ns=first.AFW_RELEASE_EVENTS_NODE,ids={original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},x=fixture(ids);x.ids=ids;
+ if(commitmentFault==='receipt-version')x.receipt.baseVersionId='22222222-2222-4222-8222-222222222222';
+ if(commitmentFault==='source-link')x.historical.artifactSourceRevision='f'.repeat(40);
+ let source;try{source=await readFile('lib/mcp-qa-finite-historical-source.mjs','utf8');}catch{source='export async function readPrivateQaFiniteHistoricalSource(){throw Error("Finite historical source unavailable:input");}';}
+ // Explicit test-only build boundary: no product API or caller-clock override.
+ assert.equal(source.split(CEILING_DECLARATION).length,2,'exact production approval datum occurs once');
+ const fixtureApproval=Math.max(Date.now()+86400000,Date.parse('2026-11-04T00:00:00Z'));
+ if(productionExpiry!==null){
+  assert.ok(['before','at'].includes(productionExpiry));
+  // Only this focused boundary case freezes the reader clock. The parent lease,
+  // performance clock, native storage and D1 keep their actual clocks.
+  assert.equal(source.match(/Date\.now\(\)/g)?.length,7,'known reader-only clock call sites');
+  source=source.replaceAll('Date.now()',String(PRODUCTION_CEILING-(productionExpiry==='before'?1:0)));
+  assert.equal(source.includes('Date.now()'),false);
+  assert.equal(source.split(CEILING_DECLARATION).length,2,'production ceiling remains unchanged');
+ }else{
+  // Synthetic approval is renewed for the test bundle, never for production.
+  // This also applies when historical pins remain real in the metadata negative.
+  source=source.replace(CEILING_DECLARATION,'CEILING='+fixtureApproval);
+  assert.equal(source.includes(CEILING_DECLARATION),false);
+  assert.equal(source.split('CEILING='+fixtureApproval).length,2);
+ }
+ const entry=String.raw`import{DurableObject}from'cloudflare:workers';import{readPrivateQaFiniteHistoricalSource as read,qualifyFiniteInitialHistoricalBaseline as baseline}from'./lib/mcp-qa-finite-historical-source.mjs';import{createHash}from'node:crypto';import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
+ export class Node extends DurableObject{}
+ export class History extends DurableObject{
+ async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);return true;}
+ async snapshot(){return[...await this.ctx.storage.list()];}
+ async qualifyBaseline(metadata){
+ try{const value=baseline(metadata);return{ok:true,keys:Object.keys(value).sort(),moduleHash:createHash('sha256').update(value.bytes).digest('hex'),moduleBytes:value.bytes.length,sourceRevision:value.sourceRevision,sourceTree:value.sourceTree,metadataProof:value.metadataProof};}
+ catch(e){return{ok:false,message:e.message};}
+ }
+ async removeFixture(key){await this.ctx.storage.delete(key);}
+ async read(mode='normal'){
+ const controller=new AbortController(),parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/',{signal:controller.signal}));let signalTimer;
+ if(mode==='abort')signalTimer=setTimeout(()=>controller.abort(),5);
+ const lease=mode==='expired'?{signal:controller.signal,assertCurrent(){throw Error('expired');}}:parent.lease;
+ try{const result=await read({ctx:this.ctx,env:this.env},lease);return{ok:true,keys:Object.keys(result).sort(),artifactBytes:new TextEncoder().encode(result.artifact.script).length,artifactHash:createHash('sha256').update(result.artifact.script).digest('hex'),escapedBytes:JSON.stringify(result.artifact).length,history:result.history,metadataProof:result.metadataProof,legacy:result.legacy,claims:[result.sourceIdentityVerified,result.scopeVerified,result.authorizesEffects,result.operationalReadiness]};}catch(e){return{ok:false,message:e.message};}finally{clearTimeout(signalTimer);parent.finish();}
+ }
+ async retention(){
+ // Test-only held continuation AFTER the REAL native transaction settles. This ctx
+ // adapter is not a native source-identity fixture or permission witness.
+ const actual=this.ctx.storage,ctx={id:this.ctx.id,storage:{transaction:async fn=>{const value=await actual.transaction(fn);await new Promise(resolve=>setTimeout(resolve,5500));return value;}}};
+ const parent=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/')),a={lease:parent.lease};
+ try{await observeFiniteOwnerStageWork({ctx,env:this.env,admission:a,originalLease:parent.lease},()=>read({ctx,env:this.env},parent.lease));}catch{}finally{parent.finish();}
+ async function tryEntry(env){const next=createFiniteOwnerRequestLease(new Request('https://fixture.invalid/'));let entered=false;try{await observeFiniteOwnerStageWork({ctx,env,admission:{lease:next.lease},originalLease:next.lease},async()=>{entered=true;});}catch{}finally{next.finish();}return entered;}
+ const blocked=!(await tryEntry(this.env));await new Promise(resolve=>setTimeout(resolve,700));const released=await tryEntry(this.env);return JSON.stringify({blocked,released});
+ }
+ }export default{fetch(){return new Response(null,{status:404})}};`;
+ const plugin={name:'explicit-synthetic-external-source-commitments',setup(b){b.onResolve({filter:/mcp-qa-finite-historical-source\.mjs$/},()=>({path:'historical-reader',namespace:'b2-source'}));b.onLoad({filter:/.*/,namespace:'b2-source'},()=>({contents:source,loader:'js',resolveDir:process.cwd()+'/lib'}));if(actualPins)return;b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...REAL_PINS,canary:x.pin})+';',loader:'js'}));}};
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin]});
+ const f={x,mf,requests:[],mode:'normal',delay:0,versionReads:0,fixtureApproval};
+ await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
+ const u=new URL(req.url);f.requests.push(u.pathname);assert.equal(req.method,'GET');assert.equal(req.headers.get('Authorization'),'Bearer synthetic-native-reader');
+ if(f.delay)await new Promise(r=>setTimeout(r,f.delay));
+ let result;
+ if(u.pathname.endsWith('/tokens/verify'))result={id:f.mode==='wrong-token'?'9db7901af95faf07e6f7ef378045328e':'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:f.mode==='expired-token'?'2020-01-01T00:00:00Z':new Date(fixtureApproval+60000).toISOString(),not_before:null};
+ else{assert.equal(u.pathname,'/client/v4/accounts/'+ACCOUNT+'/workers/workers/'+x.pin.name+'/versions/'+VERSION);assert.equal(u.search,'?include=modules');result=structuredClone(x.metadata);f.versionReads++;
+ if(f.mode==='defaults'||f.mode==='drift'&&f.versionReads%2===0){for(const e of Object.values(result.exports))e.state='created';result.exports.default.cache={enabled:false};result.cache_options={enabled:false,cross_version_cache:false};}
+ if(f.mode==='transfer')result.exports.AfwOwnEventNode={...result.exports.AfwOwnEventNode,state:'expecting-transfer',transfer_from:'foreign'};
+ if(f.mode==='cache-on')result.exports.default.cache={enabled:true};
+ if(f.mode==='secret-value')result.bindings.find(b=>b.type==='secret_text').text='NEVER-HASH-SECRET';
+ if(f.mode==='unknown')result.env={private:'no'};
+ if(f.mode==='corrupt-code')result.modules[0].content_base64=Buffer.from('wrong').toString('base64');
+ if(f.mode==='missing-slot')result.bindings.find(b=>b.name==='AFW_DOSSIER_RETIREMENT_POLICY').text='';
+ }
+ return new Response(J({success:true,errors:[],messages:[],result}),{status:f.mode==='redirect'?302:200,headers:{date:new Date().toUTCString(),'content-type':'application/json'}});
+ }}));
+ const b=await mf.getBindings();f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB');await seed(f.db,x);await f.stub.seed(x.rows);return f;
+}
+test('B2-AB actual native historical reader, private CF boundary is synthetic',async t=>{
+ const f=await harness();try{
+ assert.ok(f.fixtureApproval>PRODUCTION_CEILING);assert.ok(f.fixtureApproval>Date.now());
+ const before=await f.stub.snapshot(),dbBefore=(await f.db.prepare('SELECT * FROM dossier_node_process_closures ORDER BY grant_id').all()).results;
+ await t.test('real positive path preserves Q distinct from historical artifact and returns actual cancellation rows',async()=>{const r=await f.stub.read();assert.equal(r.ok,true,J(r));assert.equal(r.artifactBytes,Buffer.byteLength(f.x.script));assert.ok(r.escapedBytes>2097152,'escaped private script is not a wire cap');assert.equal(r.history.originalAdmission.sourceRevision,'2'.repeat(40));assert.equal(r.history.cancellations[0].sourceRevision,'5'.repeat(40));assert.equal(r.history.cancellations[0].grantId,'cancelled-old');assert.deepEqual(r.claims,[false,false,false,false]);assert.deepEqual(r.metadataProof.normalizations,[]);assert.equal(r.legacy.preparedDispatch,JSON.stringify(f.x.rows[1][1]));});
+ await t.test('documented defaults normalize with independent raw fingerprint',async()=>{f.mode='defaults';const r=await f.stub.read();assert.equal(r.ok,true,J(r));assert.notEqual(r.metadataProof.rawConfigurationHash,r.metadataProof.normalizedConfigurationHash);assert.deepEqual(r.metadataProof.normalizations,['cache_options','exports.AfwNodeControl.state','exports.AfwOwnEventNode.state','exports.default.cache','exports.default.state']);f.mode='normal';});
+ for(const mode of ['wrong-token','expired-token','transfer','cache-on','secret-value','unknown','corrupt-code','missing-slot','redirect','drift'])await t.test('deny '+mode,async()=>{f.mode=mode;f.versionReads=0;const r=await f.stub.read();assert.equal(r.ok,false);assert.match(r.message,/^Finite historical source unavailable:/);assert.equal(r.message.includes('NEVER-HASH'),false);f.mode='normal';});
+ await t.test('extra foreign closure is not filtered away',async()=>{await f.db.prepare('INSERT INTO delegated_access_grants SELECT ?,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?').bind('foreign','cancelled-old').run();await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('foreign',null,'a'.repeat(64),'b'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',Date.now()-1000).run();assert.equal((await f.stub.read()).ok,false);await f.db.exec('DROP TRIGGER dossier_node_process_close_no_delete');await f.db.prepare('DELETE FROM dossier_node_process_closures WHERE grant_id=?').bind('foreign').run();});
+
+ await t.test('actual D1 rejects foreign scope, malformed chronology and nonlatest monitor',async()=>{
+  for(const [column,bad]of [['user_id','foreign'],['scopes_json','["afw:evidence:read"]'],['revoked_at',''],['expires_at','2099-01-01T00:00:00.000Z']]){
+   const old=(await f.db.prepare('SELECT '+column+' AS v FROM delegated_access_grants WHERE id=?').bind('cancelled-old').first()).v;
+   await f.db.prepare('UPDATE delegated_access_grants SET '+column+'=? WHERE id=?').bind(bad,'cancelled-old').run();
+   assert.equal((await f.stub.read()).ok,false,column);
+   await f.db.prepare('UPDATE delegated_access_grants SET '+column+'=? WHERE id=?').bind(old,'cancelled-old').run();
+  }
+  await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(4,'cancelled-old','synthetic-project','owner','client',f.x.events.resource,2,'grant','afw.dossier-monitoring.v1','late-grant',f.x.start+6000,f.x.end).run();
+  assert.equal((await f.stub.read()).ok,false,'a later grant supersedes the prior revoke');
+  await f.db.exec('DROP TRIGGER dossier_monitoring_no_delete');await f.db.prepare('DELETE FROM dossier_monitoring_consent_events WHERE sequence=4').run();
+ });
+ await t.test('exactly eight actual cancellations qualify; ninth is rejected without filtering',async()=>{
+  const added=[];
+  for(let n=0;n<8;n++){
+   const grant='historical-'+n;added.push(grant);
+   await f.db.prepare('INSERT INTO delegated_access_grants SELECT ?,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?').bind(grant,'cancelled-old').run();
+   await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind(grant,null,String(n+1).repeat(64),'a'.repeat(64),'b'.repeat(40),'cloudflare/debian-trixie',f.x.start+5000).run();
+   for(const [offset,action,issued,expires]of [[0,'grant',f.x.start,f.x.end],[1,'revoke',f.x.start+4000,f.x.start+4000]])await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(10+n*2+offset,grant,'synthetic-project','owner','client',f.x.events.resource,1,action,'afw.dossier-monitoring.v1','history-'+n+'-'+offset,issued,expires).run();
+   if(n===6){const r=await f.stub.read();assert.equal(r.ok,true,JSON.stringify(r));assert.equal(r.history.cancellations.length,8);assert.equal(r.history.cancellations.find(z=>z.grantId==='historical-0').programHash,'a'.repeat(64),'each cancellation keeps its own actual program');}
+  }
+  assert.equal((await f.stub.read()).ok,false);
+  for(const grant of added){await f.db.prepare('DELETE FROM dossier_monitoring_consent_events WHERE grant_id=?').bind(grant).run();await f.db.prepare('DELETE FROM dossier_node_process_closures WHERE grant_id=?').bind(grant).run();await f.db.prepare('DELETE FROM delegated_access_grants WHERE id=?').bind(grant).run();}
+ });
+ await t.test('stored null and corrupted actual legacy journal never become absent history',async()=>{
+  await f.stub.seed([[keys[3],null]]);assert.equal((await f.stub.read()).ok,false);
+  await f.stub.removeFixture(keys[3]);
+  await f.stub.seed([[keys[1],{...f.x.rows[1][1],phase:'complete',completedAt:f.x.start+1}]]);assert.equal((await f.stub.read()).ok,false);
+  await f.stub.seed([f.x.rows[1]]);assert.equal((await f.stub.read()).ok,true);
+ });
+
+ await t.test('later active new grant and Save do not gate historical reads',async()=>{await f.db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?,?,?)').bind('new-active','owner','client','synthetic-project',f.x.events.resource,'["afw:project:read"]',new Date().toISOString(),new Date(Date.now()+100000).toISOString(),'',new Date().toISOString()).run();assert.equal((await f.stub.read()).ok,true);await f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').bind(new Date().toISOString(),'new-active').run();assert.equal((await f.stub.read()).ok,true);});
+ await t.test('original aborted or expired parent denies without a renewed lease',async()=>{const n=f.requests.length;assert.equal((await f.stub.read('expired')).ok,false);assert.equal(f.requests.length,n);f.delay=30;assert.equal((await f.stub.read('abort')).ok,false);f.delay=0;});
+ await t.test('original termination retains the held native continuation until settlement',async()=>{const r=JSON.parse(await f.stub.retention());assert.deepEqual(r,{blocked:true,released:true});});
+ assert.deepEqual(await f.stub.snapshot(),before);assert.deepEqual((await f.db.prepare('SELECT * FROM dossier_node_process_closures ORDER BY grant_id').all()).results,dbBefore);assert.equal((await f.mf.dispatchFetch('https://fixture.invalid')).status,404);
+ }finally{await f.mf.dispose();}
+});
+
+test('production fixed commitments reject synthetic historical bytes; no external pin override',async()=>{
+ const f=await harness(true);try{const r=await f.stub.read();assert.equal(r.ok,false);assert.equal(r.message,'Finite historical source unavailable:metadata');assert.ok(f.requests.some(p=>p.endsWith('/versions/'+VERSION)),'historical metadata was actually read');}finally{await f.mf.dispose();}
+});
+
+test('unchanged production custody ceiling denies exactly at expiry before provider reads',async()=>{
+ // At ceiling-1 the same unchanged guard admits the first provider read. At
+ // ceiling it denies before any read: this distinguishes expiry from parent,
+ // wall drift, monotonic or native-input rejection.
+ for(const boundary of ['before','at']){
+  const f=await harness(false,boundary);try{
+   const r=await f.stub.read();
+   if(boundary==='before')assert.ok(f.requests.length>0,'one millisecond before expiry passes initial custody ceiling');
+   else{assert.equal(r.ok,false);assert.equal(r.message,'Finite historical source unavailable:deadline');assert.equal(f.requests.length,0);}
+  }finally{await f.mf.dispose();}
+ }
+});
+
+test('shared historical byte boundary agrees for backup and native reader without conflating their policies',async t=>{
+ const f=await harness();try{
+  const original=structuredClone(f.x.metadata),originalRows=await f.stub.snapshot();
+  await t.test('both consumers qualify exact source bytes and keep distinct output responsibilities',async()=>{
+   const backup=await f.stub.qualifyBaseline(original),reader=await f.stub.read();
+   assert.equal(backup.ok,true,JSON.stringify(backup));assert.equal(reader.ok,true,JSON.stringify(reader));
+   assert.equal(backup.moduleHash,sha(f.x.script));assert.equal(reader.artifactHash,sha(f.x.script));
+   assert.equal(backup.moduleBytes,Buffer.byteLength(f.x.script));assert.equal(reader.artifactBytes,Buffer.byteLength(f.x.script));
+   assert.equal(backup.sourceRevision,f.x.receipt.sourceRevision);assert.equal(backup.sourceTree,f.x.receipt.sourceTree);
+   assert.deepEqual(backup.metadataProof,reader.metadataProof);
+   assert.deepEqual(backup.keys,['bytes','configuration','metadataProof','rawConfiguration','sourceRevision','sourceTree']);
+   assert.equal(reader.keys.includes('rawConfiguration'),false);assert.equal(reader.keys.includes('bytes'),false);assert.equal(reader.keys.includes('history'),true);
+  });
+  const cases=[
+   ['missing module',v=>v.modules=[]],
+   ['extra module',v=>v.modules.push({...v.modules[0],content_base64:''})],
+   ['wrong module type',v=>v.modules[0].content_type='text/plain'],
+   ['wrong module name',v=>v.modules[0].name='other.mjs'],
+   ['noncanonical base64',v=>v.modules[0].content_base64+='\n'],
+   ['wrong byte hash',v=>v.modules[0].content_base64=Buffer.from('foreign module').toString('base64')],
+   ['unknown metadata field',v=>v.assets={}],
+   ['secret value',v=>v.bindings.find(b=>b.type==='secret_text').text='SYN-MUST-NOT-ESCAPE'],
+   ['namespace drift',v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE').namespace_id='f'.repeat(32)],
+  ];
+  for(const [name,change]of cases)await t.test(name+' is rejected by both consumers',async()=>{
+   const metadata=structuredClone(original);change(metadata);f.x.metadata=metadata;
+   for(const response of [await f.stub.qualifyBaseline(metadata),await f.stub.read()]){
+    assert.equal(response.ok,false,name);assert.equal(response.message,'Finite historical source unavailable:metadata');assert.equal(JSON.stringify(response).includes('SYN-MUST-NOT-ESCAPE'),false);
+   }
+   f.x.metadata=original;
+  });
+  await t.test('native legacy evidence remains required only by historical reader',async()=>{
+   await f.stub.seed([[keys[1],{...f.x.rows[1][1],phase:'complete',completedAt:f.x.start+1}]]);
+   assert.equal((await f.stub.qualifyBaseline(original)).ok,true);
+   const reader=await f.stub.read();assert.equal(reader.ok,false);assert.equal(reader.message,'Finite historical source unavailable:legacy');
+   await f.stub.seed([f.x.rows[1]]);assert.equal((await f.stub.read()).ok,true);
+  });
+  assert.deepEqual(await f.stub.snapshot(),originalRows);
+ }finally{await f.mf.dispose();}
+});
+for(const fault of ['receipt-version','source-link'])test('both historical consumers reject loaded '+fault+' commitment mismatch',async()=>{
+ const f=await harness(false,null,fault);try{
+  for(const response of [await f.stub.qualifyBaseline(f.x.metadata),await f.stub.read()]){
+   assert.equal(response.ok,false);assert.equal(response.message,'Finite historical source unavailable:metadata');
+  }
+ }finally{await f.mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-http.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-http.test.mjs b/test/mcp-qa-finite-http.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-http.test.mjs
@@ -0,0 +1,101 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {githubFixture as fixture} from './fixtures/finite-github.mjs';
+
+test('durable unique ref fences changed job/reconstructed client; tag object alone grants nothing',async()=>{
+ const x=await fixture(),client=x.make(),record=x.record();
+ assert.throws(()=>client.consumeNewSend(record));assert.equal(await client.claimSend(record,new AbortController().signal,()=>{}),'issued');
+ assert.deepEqual(await client.readSend(),record);client.consumeNewSend(record);assert.throws(()=>client.consumeNewSend(record));
+ x.state.job=100;const restarted=x.make();assert.equal(await restarted.claimSend(x.record(),new AbortController().signal,()=>{}),'existing');assert.throws(()=>restarted.consumeNewSend(x.record()));
+ assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.equal(x.requests.filter(x=>['PATCH','DELETE','PUT'].includes(x.method)).length,0);
+});
+for(const mode of ['lost','late'])test('send fence '+mode+' ACK never becomes POST authority',async()=>{
+ const x=await fixture();x.state.mode=mode;const client=x.make(),r=x.record();
+ assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'uncertain');assert.throws(()=>client.consumeNewSend(r));assert.equal(x.refPosts,1);
+ assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'existing');assert.equal(x.refPosts,1);
+});
+for(const[mode,attack]of Object.entries({attempt:x=>{x.state.attempt=2;},source:x=>{x.state.source='f'.repeat(40);},main:x=>{x.state.main='f'.repeat(40);},nominalDeadlock:x=>{x.state.admitStatus='in_progress';},restoreTerminal:x=>{x.state.restoreStatus='completed';}}))test('primary GitHub '+mode+' blocks tag/ref effects',async()=>{
+ const x=await fixture();attack(x);assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
+});
+test('ready phase requires admit job in progress; restore phase requires it terminal',async()=>{
+ const x=await fixture(),g=x.make();await assert.rejects(g.inspect('ready'));assert.equal((await g.inspect('restore')).restoreJobId,99);
+ x.state.admitStatus='in_progress';assert.equal((await g.inspect('ready')).jobId,12);await assert.rejects(g.inspect('restore'));
+});
+
+test('lost send-ref ACK remains GET-only after reconstructing the GitHub client',async()=>{
+ const x=await fixture();x.state.mode='lost';const record=x.record();
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
+ const before=x.requests.length,refPosts=x.refPosts,tagPosts=x.tagPosts;x.state.mode='normal';
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
+ assert.equal(x.refPosts,refPosts);assert.equal(x.tagPosts,tagPosts);
+ assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
+});
+
+test('unknown deferred ref POST plus 404 cannot renew a reconstructed client',async()=>{
+ const x=await fixture();x.state.mode='deferred';const record=x.record(),original=x.make();
+ assert.equal(await original.claimSend(record,new AbortController().signal,()=>{}),'uncertain');
+ const before=x.requests.length;
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
+ assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
+ x.finishPending();await new Promise(resolve=>setImmediate(resolve));
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
+ assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.throws(()=>original.consumeNewSend(record));
+});
+test('lost annotated-tag ACK consumes eligibility even when no send ref exists',async()=>{
+ const x=await fixture();x.state.mode='tag-lost';const record=x.record();
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
+ const before=x.requests.length;
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
+ assert.equal(x.tagPosts,1);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
+});
+test('default recovery with 404 has no capability and performs no mutation',async()=>{
+ const x=await fixture(undefined,{origin:'none'}),before=x.requests.length;
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
+ assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
+});
+test('first failed claim consumes the one capability across clients and cannot re-admit',async()=>{
+ const x=await fixture();x.state.attempt=2;
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.attempt=1;
+ assert.equal(await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output}),false);
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
+});
+for(const mode of ['attempt2','unqualified-admission','wrong-proof','wrong-job','wrong-step'])test('original capability rejects '+mode,async()=>{
+ const {syntheticOriginalEnvironment}=await import('./fixtures/finite-http-module.mjs');
+ const x=await fixture(undefined,{origin:'none'});syntheticOriginalEnvironment(x.f.plan);
+ let admission=x.admission,output=structuredClone(x.f.output);
+ if(mode==='attempt2')x.state.attempt=2;
+ if(mode==='unqualified-admission')admission={...admission};
+ if(mode==='wrong-proof')output.retained.proofHash='f'.repeat(64);
+ if(mode==='wrong-step')x.state.step=0;
+ if(mode==='wrong-job')x.state.restoreStatus='completed';
+ assert.equal(await x.make().admitOriginalExecution({admission,output}),false);
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
+});
+for(const mode of ['proof','job','step'])test('admitted capability does not survive changed '+mode,async()=>{
+ const x=await fixture(),record=structuredClone(x.record());
+ if(mode==='proof')record.proofHash='f'.repeat(64);
+ if(mode==='job'){x.state.job=100;record.jobId=100;}
+ if(mode==='step')x.state.step++;
+ assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
+});
+test('actual child process inheriting original PID marker cannot admit a send capability',async()=>{
+ const {spawnSync}=await import('node:child_process');
+ process.env.AFW_FINITE_RESTORE_ORIGINAL_PID=String(process.pid);
+ const code="import {githubFixture} from './test/fixtures/finite-github.mjs';const x=await githubFixture(undefined,{origin:'none'});const admitted=await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output});process.stdout.write(JSON.stringify({admitted,requests:x.requests.length,child:process.pid!==Number(process.env.AFW_FINITE_RESTORE_ORIGINAL_PID)}));";
+ const child=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:20000});
+ assert.equal(child.status,0,child.stderr);assert.deepEqual(JSON.parse(child.stdout),{admitted:false,requests:0,child:true});
+});
+
+test('cached 404 cannot authorize the original tag POST or refund the consumed capability',async()=>{
+ const x=await fixture();x.state.mode='cached-404';
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
+ assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
+ assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
+});
+
+test('fixed export-and-exec launcher retains actual PID and admits one original synthetic send',async()=>{
+ const {spawnSync}=await import('node:child_process');
+ const code="import {githubFixture} from './test/fixtures/finite-github.mjs';const x=await githubFixture(undefined,{origin:'none'});const client=x.make(),admitted=await client.admitOriginalExecution({admission:x.admission,output:x.f.output});const send=await client.claimSend(x.record(),new AbortController().signal,()=>{});process.stdout.write(JSON.stringify({admitted,send,tagPosts:x.tagPosts,refPosts:x.refPosts,pidMatches:String(process.pid)===process.env.AFW_FINITE_RESTORE_ORIGINAL_PID}));";
+ const child=spawnSync('bash',['-c','export AFW_FINITE_RESTORE_ORIGINAL_PID=$$; exec "$@"','finite-fixture',process.execPath,'--input-type=module','-e',code],{encoding:'utf8',timeout:20000,env:{...process.env,GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:'11',GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:'b'.repeat(40)}});
+ assert.equal(child.status,0,child.stderr);assert.deepEqual(JSON.parse(child.stdout),{admitted:true,send:'issued',tagPosts:1,refPosts:1,pidMatches:true});
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-activation-wire-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-activation-wire-native.test.mjs b/test/mcp-qa-finite-initial-activation-wire-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-activation-wire-native.test.mjs
@@ -0,0 +1,20 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const P='afw.finite-initial-cleanup.v1:';
+async function using(fn){const f=await initialEntryHarness();try{await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'material_recorded');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('initial activation wire is an unmounted factual proposal from the native actor',()=>using(async f=>{
+ const before=await f.stub.snapshot(),reads=f.requests.length,r=await f.stub.probeActivationWire(f.uploaded,'normal');
+ assert.equal(r.status,'proposal_only');assert.equal(r.wire.authorizesEffects,false);
+ const plan=JSON.parse(before.find(([k])=>k===P+'plan')[1]),body=JSON.parse(r.wire.body);
+ assert.equal(r.wire.path,'/workers/scripts/agent-friendly-web-delegated-canary/deployments');
+ assert.equal(body.versions[0].version_id,plan.candidateVersionId);
+ assert.equal(body.annotations['workers/message'],'afw-finite-initial-activate-'+plan.recordHash);
+ assert.equal(r.ack.sendHash,r.wire.send.recordHash);assert.equal(r.completion.ackHash,r.ack.recordHash);
+ assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.requests.length,reads);assert.equal(f.restores.length,0);
+}));
+for(const mode of ['arm','wrong-version','wrong-annotation','wrong-deployment','wrong-module','coherent-wrong-module','same-size-wrong-module','issued-before-arm','deadline-too-long','ack-after-deadline','observation-after-deadline'])test('activation wire rejects '+mode,()=>using(async f=>{
+ const before=await f.stub.snapshot(),reads=f.requests.length;
+ assert.equal((await f.stub.probeActivationWire(f.uploaded,mode)).status,'rejected');
+ assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.requests.length,reads);assert.equal(f.restores.length,0);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-capsule-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-capsule-native.test.mjs b/test/mcp-qa-finite-initial-capsule-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-capsule-native.test.mjs
@@ -0,0 +1,86 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {initialCanonical as canonical,initialHash,hashFiniteInitialMaterialRecord} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const P='afw.finite-initial-preparation.v1:',C='afw.finite-initial-cleanup.v1:',KEY=P+'capsule',get=(rows,key)=>rows.find(([k])=>k===key)?.[1];
+async function using(fn,mode='normal'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+async function invoke(f){const r=await f.stub.invoke(f.refs);try{return r.status;}finally{r[Symbol.dispose]?.();}}
+async function stats(f){const r=await f.stub.stats();try{return {held:r.held,capsuleTransactions:r.capsuleTransactions};}finally{r[Symbol.dispose]?.();}}
+async function available(f){const r=await f.stub.probeStageAvailability();try{return r.available;}finally{r[Symbol.dispose]?.();}}
+async function until(fn){for(let n=0;n<150;n++){if(await fn())return;await new Promise(r=>setTimeout(r,20));}assert.fail('expected native boundary was not reached');}
+test('capsule binds actual M and exact A journals once, survives restart and leaves cleanup enumeration intact',()=>using(async f=>{
+ assert.equal(await invoke(f),'material_recorded');
+ const rows=await f.stub.snapshot(),raw=get(rows,KEY),v=JSON.parse(raw),m=JSON.parse(get(rows,P+'material:'+v.materialHash)),ack=JSON.parse(get(rows,P+'ack')),selector=JSON.parse(get(rows,P+'selector')),plan=JSON.parse(get(rows,C+'plan')),completion=JSON.parse(get(rows,C+'activation-completion'));
+ assert.equal(v.purpose,'afw.finite-initial-capsule.v1');assert.equal(v.activatedVersionId,'55555555-5555-4555-8555-555555555555');assert.equal(v.activatedDeploymentId,completion.deploymentId);assert.notEqual(v.activatedVersionId,f.x.pin.id);assert.notEqual(v.activatedDeploymentId,f.x.pin.deploymentId);
+ assert.deepEqual(m.qaBootstrap.record.qaLive.publicStatic,finitePublicStaticExpectation('qaLive'));
+ const prior=finitePublicProfileTemplate('qaLive').bindings.filter(b=>b.name!=='AFW_FINITE_OWNER_OAUTH_KV');
+ const oldHash=initialHash('afw.finite-public-bindings.v1',prior);
+ assert.notEqual(oldHash,m.qaBootstrap.record.qaLive.publicStatic.bindingsHash);
+ const oldMaterial=structuredClone(m);
+ oldMaterial.qaBootstrap.record.qaLive.publicStatic.bindingsHash=oldHash;
+ assert.throws(()=>hashFiniteInitialMaterialRecord('InitialMaterial',oldMaterial));
+ console.log('D0.1 actual codec lineage '+JSON.stringify({qaBindingsHash:m.qaBootstrap.record.qaLive.publicStatic.bindingsHash,materialHash:v.materialHash,capsuleHash:v.capsuleHash,mBindingsHash:v.bindingsHash}));
+ assert.equal(v.selectorHash,hashFiniteInitialMaterialRecord('InitialSelector',selector));assert.equal(v.materialAckHash,hashFiniteInitialMaterialRecord('InitialAck',ack));assert.equal(v.preconnectionId,m.preconnectionId);assert.equal(v.qaVersionId,m.qaBootstrap.currentPointer.versionId);assert.equal(v.qaDeploymentId,m.qaBootstrap.currentPointer.deploymentId);
+ assert.equal(v.bindingsHash,createHash('sha256').update(canonical([...plan.configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex'));
+ assert.equal(v.moduleHash,f.resident.module.sha256);assert.notEqual(v.moduleHash,f.x.pin.module.sha256);assert.equal(v.C0,v.I0+900000);assert.equal(v.C1,v.C0+180000);assert.ok(v.recordedAt>=completion.observedAt&&v.recordedAt<v.initialDeadline);
+ assert.equal(rows.filter(([k])=>k.startsWith(C)).length,6);assert.equal(get(rows,'afw.qa-finite-trial.v1:head'),undefined);assert.equal(await f.stub.alarmInfo(),plan.C0);
+ await f.restart();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+ const r=await f.alarmAt(plan.C0+1);try{assert.equal(r.status,'restored');}finally{r[Symbol.dispose]?.();}
+ assert.equal(get(await f.stub.snapshot(),KEY),raw);assert.equal(f.restores.length,1);
+},'restart'));
+for(const field of ['entry','claim','selector','materialAck','material','plan','state','arm','send','activationAck','completion'])test('capsule writer rejects mismatched '+field+' after actual Completion without replay',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('capsule-mismatch-'+field);
+ assert.equal(await invoke(f),'admin_pending');const rows=await f.stub.snapshot();assert.ok(get(rows,C+'activation-completion'));assert.equal(get(rows,KEY),undefined);assert.equal((await stats(f)).capsuleTransactions,1);
+ await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
+}));
+for(const fault of ['missing-completion','coherent-ack','coherent-claim','finite-head','completion-return-lost','completion-sync-lost','completion-readback-lost'])test('capsule '+fault+' denies factual success without reissuing activation',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);assert.equal(await invoke(f),'admin_pending');
+ const rows=await f.stub.snapshot();assert.ok(get(rows,C+'activation-completion'));assert.equal(get(rows,KEY),undefined);
+ await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
+}));
+test('preexisting conflicting capsule is immutable and never authority to retry',()=>using(async f=>{
+ await f.stub.seed([[KEY,'SYN conflicting capsule']]);assert.equal(await invoke(f),'admin_pending');assert.equal(get(await f.stub.snapshot(),KEY),'SYN conflicting capsule');
+ assert.equal(await invoke(f),'admin_pending');assert.equal(f.activations.length,0);assert.equal(f.uploads.length,0);assert.equal(get(await f.stub.snapshot(),P+'entry'),undefined);
+}));
+for(const fault of ['return-lost','sync-lost','readback-lost','holder-drift'])test('capsule '+fault+' preserves uncertain append across restart without replay',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);assert.equal(await invoke(f),'admin_pending');
+ const rows=await f.stub.snapshot();assert.ok(get(rows,KEY));assert.ok(get(rows,C+'activation-completion'));assert.equal(f.activations.length,1);
+ await f.restart();await f.stub.configure('normal');assert.equal(await invoke(f),'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);assert.equal(f.uploads.length,1);
+},'restart'));
+for(const fault of ['held-sync','held-readback','held-transaction','expired-completion'])test('actual '+fault+' remains retained through deadline and late settlement never resumes',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('capsule-'+fault);const operation=invoke(f);
+ await until(async()=>(await stats(f)).held);assert.equal(await operation,'admin_pending');
+ const rows=await f.stub.snapshot();
+ assert.equal(await available(f),false);await f.stub.release();await until(()=>available(f));
+ const settled=await f.stub.snapshot();if(rows)assert.deepEqual(settled,rows);if(fault==='expired-completion')assert.equal(get(settled,KEY),undefined);
+ if(fault==='expired-completion')assert.equal((await stats(f)).capsuleTransactions,0,'no capsule continuation begins after expired Completion');
+ assert.equal(await invoke(f),'admin_pending');assert.equal(f.activations.length,1);
+}));
+test('capsule data linker rejects coherent cross-record contradictions and original timing violations',()=>using(async f=>{
+ assert.equal(await invoke(f),'material_recorded');
+ const rpc=await f.stub.capsuleFacts();let facts;
+ try{facts=JSON.parse(JSON.stringify(rpc));}finally{rpc[Symbol.dispose]?.();}
+ facts.recordedAt=facts.completion.observedAt;
+ const probe=async value=>{const r=await f.stub.probeCapsuleFacts(value);try{return r.ok;}finally{r[Symbol.dispose]?.();}};
+ assert.equal(await probe(facts),true);
+ const rehash=(v,key='recordHash')=>{delete v[key];v[key]=initialHash(v.purpose,v);};
+ for(const mutate of [
+  x=>{x.claim.commandHash='f'.repeat(64);rehash(x.claim,'claimHash');},
+  x=>x.selector.preconnectionId='f'.repeat(64),
+  x=>x.materialAck.selectorHash='f'.repeat(64),
+  x=>{x.material.qaBootstrap.currentPointer.deploymentId='77777777-7777-4777-8777-777777777777';rehash(x.material,'materialHash');},
+  x=>{x.plan.materialHash='f'.repeat(64);rehash(x.plan);},
+  x=>{x.state.deliveries=1;rehash(x.state);},
+  x=>{x.arm.alarmAt++;rehash(x.arm);},
+  x=>{x.send.entryHash='f'.repeat(64);rehash(x.send);},
+  x=>{x.activationAck.sendHash='f'.repeat(64);rehash(x.activationAck);},
+  x=>{x.completion.ackHash='f'.repeat(64);rehash(x.completion);},
+  x=>{x.completion.candidateVersionId=x.plan.baselineVersionId;rehash(x.completion);},
+  x=>{x.completion.settledAt=x.activationAck.acknowledgedAt-1;rehash(x.completion);},
+  x=>x.materialAck.acknowledgedAt=x.material.observedAt-1,
+  x=>x.recordedAt=x.completion.observedAt-1,
+  x=>x.recordedAt=x.send.deadline
+ ]){const altered=structuredClone(facts);mutate(altered);assert.equal(await probe(altered),false);}
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-capsule-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-capsule-records.test.mjs b/test/mcp-qa-finite-initial-capsule-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-capsule-records.test.mjs
@@ -0,0 +1,32 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {initialCanonical as canonical,initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {encodeFiniteInitialCapsule as encode,decodeFiniteInitialCapsule as decode,finiteInitialCapsuleBindingsHash as bindingsHash,FINITE_INITIAL_CAPSULE_KEY} from '../lib/mcp-qa-finite-initial-capsule-records.mjs';
+const h='a'.repeat(64),id='11111111-1111-4111-8111-111111111111',I0=Date.parse('2026-11-02T12:00:00Z');
+const body={purpose:'afw.finite-initial-capsule.v1',entryHash:h,materialHash:h,selectorHash:h,materialAckHash:h,cleanupPlanHash:h,cleanupArmAckHash:h,activationCompletionHash:h,sourceRevision:'b'.repeat(40),sourceTree:'c'.repeat(40),qaVersionId:id,qaDeploymentId:id,initialInstanceId:'afw-finite-initial-'+h,preconnectionId:h,I0,initialDeadline:I0+300000,C0:I0+900000,C1:I0+1080000,activatedVersionId:'22222222-2222-4222-8222-222222222222',activatedDeploymentId:id,moduleHash:h,configurationHash:h,bindingsHash:h,recordedAt:I0+1000};
+const signed=b=>({...b,capsuleHash:initialHash(body.purpose,b)});
+test('capsule exact canonical bounded data roundtrips without exposing cleanup authority',()=>{
+ const v=signed(body),raw=encode(v);assert.deepEqual(decode(raw),v);
+ assert.equal(FINITE_INITIAL_CAPSULE_KEY,'afw.finite-initial-preparation.v1:capsule');
+ assert.equal(Object.isFrozen(decode(raw)),true);
+ for(const value of [raw+' ',JSON.stringify(v),raw.replace(h,'f'.repeat(64)),raw.replace('"purpose":','"purpose":"duplicate","purpose":'),' '.repeat(4097),'null','[]'])assert.throws(()=>decode(value));
+ for(const update of [{extra:true},{purpose:'wrong'},{materialAckHash:'bad'},{sourceRevision:h},{qaDeploymentId:'opaque'},{initialInstanceId:'borrowed'},{initialDeadline:I0+300001},{C0:I0+900001},{C1:I0+1080001},{recordedAt:I0-1},{recordedAt:I0+300000},{I0:-1},{recordedAt:Infinity},{activatedVersionId:id}])assert.throws(()=>encode(signed({...body,...update})));
+ const missing={...body};delete missing.preconnectionId;assert.throws(()=>encode(signed(missing)));
+ const late={...body,I0:Date.parse('2026-11-03T02:59:00Z')};late.initialDeadline=late.I0+300000;late.C0=late.I0+900000;late.C1=late.C0+180000;late.recordedAt=late.I0;assert.throws(()=>encode(signed(late)));
+});
+test('capsule rejects accessors, symbols and prototypes without evaluating attacker code',()=>{
+ let reads=0;const v=signed(body);Object.defineProperty(v,'entryHash',{enumerable:true,get(){reads++;return h;}});
+ assert.throws(()=>encode(v));assert.equal(reads,0);
+ assert.throws(()=>encode(Object.assign(Object.create({}),signed(body))));
+ assert.throws(()=>encode({...signed(body),[Symbol('extra')]:true}));
+});
+test('full bindings commitment sorts names and recursive keys, and includes private binding fields',()=>{
+ const a=[{name:'Z',type:'service',service:'private-internal',environment:'production'},{type:'ratelimit',name:'A',simple:{period:60,limit:10},namespace_id:'123'}];
+ const b=[{name:'A',namespace_id:'123',simple:{limit:10,period:60},type:'ratelimit'},{environment:'production',service:'private-internal',type:'service',name:'Z'}];
+ const expected=createHash('sha256').update(canonical([a[1],a[0]])).digest('hex');
+ assert.equal(bindingsHash(a),expected);assert.equal(bindingsHash(b),expected);
+ const changed=structuredClone(a);changed[0].service='other-private-service';assert.notEqual(bindingsHash(changed),expected);
+ assert.notEqual(initialHash('afw.finite-public-bindings.v1',[a[1],a[0]]),expected);
+ assert.throws(()=>bindingsHash([a[0],a[0]]));assert.throws(()=>bindingsHash([]));
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-cleanup-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-cleanup-native.test.mjs b/test/mcp-qa-finite-initial-cleanup-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-cleanup-native.test.mjs
@@ -0,0 +1,191 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const P='afw.finite-initial-cleanup.v1:';
+async function using(fn,mode='normal'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('B2b actual native initial winner owns immutable cleanup and native alarm before safe return',()=>using(async f=>{
+ const r=await f.workflow(f.refs);assert.equal(r.result.status,'material_recorded');
+ const rows=await f.stub.snapshot(),read=k=>JSON.parse(rows.find(([key])=>key===P+k)?.[1]??'null'),plan=read('plan'),state=read('state'),ack=read('arm-ack');
+ assert.ok(plan,'actual native winner must persist cleanup plan after actual inactive receipt');
+ assert.ok(state);assert.ok(ack);assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);assert.equal(state.deliveries,0);assert.equal(await f.stub.alarmInfo(),plan.C0);
+ assert.equal(ack.planHash,plan.recordHash);assert.equal(plan.candidateVersionId,'55555555-5555-4555-8555-555555555555');
+ assert.equal(JSON.stringify(r).includes(plan.recordHash),false);assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
+ const before=JSON.stringify(rows);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(JSON.stringify(await f.stub.snapshot()),before);
+}));
+test('B2b native surviving upload cannot arm over preexisting native alarm',()=>using(async f=>{
+ const at=Date.now()+3600000;await f.stub.installAlarm(at);
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(await f.stub.alarmInfo(),at);
+ assert.equal((await f.stub.snapshot()).some(([k])=>k===P+'plan'),false);
+}));
+test('B2b finite alarm refuses orphan ownership fragment instead of nominal fallback',()=>using(async f=>{
+ await f.stub.seed([[P+'state','{}']]);const result=await f.stub.initialAlarm();assert.equal(result.status,'admin_pending');
+}));
+
+const record=(rows,key)=>JSON.parse(rows.find(([k])=>k===P+key)?.[1]??'null');
+async function prepared(f){await f.stub.restoreMethods();await f.stub.configure('late-initial-journal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');await f.stub.restoreMethods();await f.stub.configure('normal');return record(await f.stub.snapshot(),'plan');}
+for(const fault of ['missing-get-alarm','missing-list'])test('B2b predictable '+fault+' fails before permanent Entry',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
+ await f.stub.restoreMethods();assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
+}));
+for(const fault of ['cleanup-missing-tx-alarm','cleanup-never-commit','cleanup-callback-retry','cleanup-final-return-lost','cleanup-reject-sync','cleanup-alarm-ack-lost','cleanup-publisher-drift','cleanup-nominal-conflict'])test('B2b native '+fault+' never produces positive arm or permits replay',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
+ let rows=await f.stub.snapshot();assert.equal(record(rows,'arm-ack'),null);assert.equal(f.uploads.length,1);
+ await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.uploads.length,1);
+}));
+test('B2b held native arm sync consumes child5s; late settlement cannot ACK',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('cleanup-hold-sync');const operation=f.stub.invoke(f.refs),start=Date.now();
+ let held=false;for(let i=0;i<150;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(r=>setTimeout(r,20));}assert.ok(held);
+ const rows=await f.stub.snapshot();assert.ok(record(rows,'plan'));assert.equal(record(rows,'arm-ack'),null);
+ assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-start>=4900);await f.stub.release();await new Promise(r=>setTimeout(r,30));assert.equal(record(await f.stub.snapshot(),'arm-ack'),null);
+}));
+test('B2b cleanup custody must cover original C1 before arming',()=>using(async f=>{
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);assert.equal(record(await f.stub.snapshot(),'plan'),null);
+},'short-cleanup-custody'));
+test('B2b persisted native restart owns initial alarm; manual SYN delivery observes never activated',()=>using(async f=>{
+ const plan=await prepared(f),before=await f.stub.snapshot();assert.equal(await f.stub.alarmInfo(),plan.C0);
+ await f.restart();assert.deepEqual(await f.stub.snapshot(),before);assert.equal(await f.stub.alarmInfo(),plan.C0);
+ await f.stub.configure('normal');const r=await f.alarmAt(plan.C0+1);
+ assert.equal(r.status,'never_activated');assert.equal(record(await f.stub.snapshot(),'state').status,'complete');assert.equal(f.restores.length,0);assert.equal(await f.stub.alarmInfo(),null);
+},'restart'));
+test('B2b only actual finite alarm with no initial records delegates nominal unchanged',()=>using(async f=>{
+ const result=await f.stub.nominalAlarmData();assert.equal(await result.state,'unavailable');assert.equal(f.requests.length,0);
+}));
+test('B2b complete future SYN activation evidence permits exactly one fixed native restore wire',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();const r=await f.alarmAt(plan.C0+1);assert.equal(r.status,'restored');
+ assert.equal(f.restores.length,1);assert.deepEqual(f.restores[0].data,{strategy:'percentage',versions:[{version_id:f.x.pin.id,percentage:100}],annotations:{'workers/message':'afw-finite-initial-restore-'+plan.recordHash}});
+ const rows=await f.stub.snapshot();assert.ok(record(rows,'restore-send'));assert.ok(record(rows,'restore-ack'));assert.equal(record(rows,'receipt').outcome,'restored');
+ assert.equal((await f.alarmAt(plan.C0+60001)).status,'restored');assert.equal(f.restores.length,1);
+}));
+for(const journal of ['send','ack'])test('B2b future SYN '+journal+' without settled completion never restores even if baseline later observed',()=>using(async f=>{
+ const plan=await prepared(f);await f.future(journal);f.pointerMode='baseline';
+ assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'receipt'),null);
+}));
+for(const fault of ['active-workflow','active-container','schedule','ineligible','custody-drift','candidate-module','candidate-resource','candidate-secret'])test('B2b actual native alarm rejects '+fault+' before restore SEND',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();const before=f.requests.length;f.alarmMode=fault;assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'restore-send'),null);
+ const target=fault==='custody-drift'?'/tokens/verify':fault==='active-workflow'?'/instances?':fault==='active-container'?'/instances-v2?':fault==='schedule'?'/schedules':fault==='ineligible'?'/versions?deployable=true':'/versions/'+plan.candidateVersionId+'?include=modules';assert.ok(f.requests.slice(before).some(url=>url.includes(target)),fault+' reached its intended boundary');
+}));
+test('B2b foreign primary pointer stops without blind overwrite',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();f.pointerMode='foreign';assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);
+}));
+test('B2b unknown issued restore remains reconcile-only through remaining deliveries and restart',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();f.alarmMode='restore-ack-lost';assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,1);assert.ok(record(await f.stub.snapshot(),'restore-send'));assert.equal(record(await f.stub.snapshot(),'restore-ack'),null);
+ await f.restart();await f.stub.configure('normal');f.alarmMode='normal';assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.equal((await f.alarmAt(plan.C0+120001)).status,'admin_pending');assert.equal(record(await f.stub.snapshot(),'state').deliveries,3);assert.equal(await f.stub.alarmInfo(),null);
+ assert.equal((await f.alarmAt(plan.C1+1)).status,'admin_pending');assert.equal(f.restores.length,1);assert.equal(record(await f.stub.snapshot(),'receipt'),null);
+},'restart'));
+test('B2b nominal collision after arm preserves owner and nominal records and native alarm',()=>using(async f=>{
+ const plan=await prepared(f);await f.stub.seed([['afw.qa-finite-trial.v1:head',{intentId:'SYN nominal'}]]);
+ const rows=await f.stub.snapshot();assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(await f.stub.alarmInfo(),plan.C0);assert.equal(f.restores.length,0);
+}));
+test('B2b corrupt backup chunk blocks fixed restore',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();const rows=await f.stub.snapshot(),pair=rows.find(([k])=>k.includes(':chunk:'));await f.stub.seed([[pair[0],pair[1]+' ']]);
+ assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);
+}));
+test('B2b exhausted original C1 never renews or dispatches',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();const before=await f.stub.snapshot();assert.equal((await f.alarmAt(plan.C1)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.restores.length,0);
+}));
+
+test('B2b completed never_activated rejects later unsettled activation SEND without effects',()=>using(async f=>{
+ const plan=await prepared(f);assert.equal((await f.alarmAt(plan.C0+1)).status,'never_activated');await f.future('send');const rows=await f.stub.snapshot(),before=f.requests.length;
+ assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,0);
+}));
+for(const mode of ['delete','contradict'])test('B2b completed restored rejects '+mode+' restore ACK without effects',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();assert.equal((await f.alarmAt(plan.C0+1)).status,'restored');await f.stub.mutateCleanup('restore-ack',mode);const rows=await f.stub.snapshot(),before=f.requests.length;
+ assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,1);
+}));
+test('B2b pre-arm activation SEND cannot authorize restore',()=>using(async f=>{
+ const plan=await prepared(f);await f.future('pre-arm');const rows=await f.stub.snapshot(),arm=record(rows,'arm-ack'),send=record(rows,'activation-send');assert.ok(send.issuedAt<arm.acknowledgedAt);assert.equal((await f.alarmAt(plan.C0+1)).status,'admin_pending');assert.equal(f.restores.length,0);assert.equal(record(await f.stub.snapshot(),'restore-send'),null);
+}));
+
+for(const [key,mode] of [['activation-send','delete'],['activation-ack','delete'],['activation-completion','delete'],['activation-completion','contradict'],['restore-send','delete'],['receipt','contradict']])test('B2b completed restored rejects '+mode+' '+key+' chain without effects',()=>using(async f=>{
+ const plan=await prepared(f);await f.future();assert.equal((await f.alarmAt(plan.C0+1)).status,'restored');await f.stub.mutateCleanup(key,mode);const rows=await f.stub.snapshot(),before=f.requests.length;
+ assert.equal((await f.alarmAt(plan.C0+60001)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.requests.length,before);assert.equal(f.restores.length,1);
+}));
+
+
+test('initial winner durably records actual activation after one fixed POST',()=>using(async f=>{
+ const r=await f.stub.invoke(f.refs);
+ try{
+ const rows=await f.stub.snapshot();
+ assert.ok(record(rows,'activation-send'),'live winner must persist SEND');
+ assert.ok(record(rows,'activation-ack'),'actual provider response must yield ACK');
+ assert.ok(record(rows,'activation-completion'),'primary readback must yield Completion');
+ const capsuleRow=rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule');assert.ok(capsuleRow,'completed activation must persist immutable capsule');
+ const capsule=JSON.parse(capsuleRow[1]),plan=record(rows,'plan'),completion=record(rows,'activation-completion');
+ const material=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-initial-preparation.v1:material:'))[1]);
+ assert.equal(capsule.activationCompletionHash,completion.recordHash);assert.equal(capsule.activatedVersionId,plan.candidateVersionId);assert.equal(capsule.activatedDeploymentId,completion.deploymentId);assert.equal(capsule.preconnectionId,material.preconnectionId);assert.equal(capsule.qaDeploymentId,material.qaBootstrap.currentPointer.deploymentId);
+ assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
+ assert.equal(f.activations.length,1);assert.equal(f.restores.length,0);
+ assert.equal(r.status,'material_recorded');
+ const replay=await f.stub.invoke(f.refs);try{assert.equal(replay.status,'admin_pending');}finally{replay[Symbol.dispose]?.();}assert.equal(f.activations.length,1);
+ }finally{r[Symbol.dispose]?.();}
+}));
+test('lost activation acknowledgement remains uncertain and never reposts',()=>using(async f=>{
+ f.alarmMode='activation-ack-lost';assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
+ const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);assert.equal(f.activations.length,1);
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
+}));
+
+for(const fault of ['activation-pointer-drift','activation-completion-module'])test('post-ACK '+fault+' prevents durable Completion without replay',()=>using(async f=>{
+ f.alarmMode=fault;assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const rows=await f.stub.snapshot();
+ assert.ok(record(rows,'activation-send'));assert.ok(record(rows,'activation-ack'));assert.equal(record(rows,'activation-completion'),null);assert.equal(f.activations.length,1);
+ await f.restart();await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.activations.length,1);assert.deepEqual(await f.stub.snapshot(),rows);
+},'restart'));
+test('malformed actual activation ACK remains an uncertain issued effect',()=>using(async f=>{
+ f.alarmMode='activation-ack-bad';assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const rows=await f.stub.snapshot();
+ assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);assert.equal(f.activations.length,1);
+}));
+
+test('preexisting activation SEND blocks before any activation POST',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('preexisting-send');
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const rows=await f.stub.snapshot();
+ assert.equal(rows.find(([k])=>k===P+'activation-send')?.[1],'SYN conflict');assert.equal(f.activations.length,0);
+}));
+
+test('timed out actual activation POST remains retained and cannot write a late ACK',()=>using(async f=>{
+ f.alarmMode='activation-held';const operation=f.stub.invoke(f.refs);let held=false;
+ for(let n=0;n<150&&!held;n++){held=f.held==='activation';if(!held)await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
+ assert.equal((await operation).status,'admin_pending');const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);
+ assert.equal((await f.stub.probeStageAvailability()).available,false);f.release();
+ let available=false;for(let n=0;n<150&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
+}));
+
+for(const mode of ['activation-storage-return-lost','activation-storage-sync-lost'])test(mode+' keeps SEND uncertain without a POST',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure(mode);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
+ const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);assert.equal(f.activations.length,0);
+ await f.stub.restoreMethods();await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,0);
+}));
+
+
+test('late activation headers retain body cancellation until it settles',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('late-activation-cancel');f.alarmMode='activation-held';const operation=f.stub.invoke(f.refs);let held=false;
+ for(let n=0;n<150&&!held;n++){held=f.held==='activation';if(!held)await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
+ assert.equal((await operation).status,'admin_pending');const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);
+ f.release();let cancelling=false;
+ try{
+  for(let n=0;n<150&&!cancelling;n++){cancelling=(await f.stub.stats()).cancelHeld;if(!cancelling)await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(cancelling,true,'native response cancellation started');
+  assert.equal((await f.stub.probeStageAvailability()).available,false,'late body cancellation remains retained');
+ }finally{await f.stub.releaseBodyCancel();}
+ let available=false;for(let n=0;n<150&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.activations.length,1);
+}));
+
+
+test('late activation body read retains cancellation until it settles',()=>using(async f=>{
+ await f.stub.restoreMethods();await f.stub.configure('late-activation-read');const operation=f.stub.invoke(f.refs);let reading=false;
+ for(let n=0;n<150&&!reading;n++){reading=(await f.stub.stats()).readHeld;if(!reading)await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(reading,true);
+ assert.equal((await operation).status,'admin_pending');const rows=await f.stub.snapshot();assert.ok(record(rows,'activation-send'));assert.equal(record(rows,'activation-ack'),null);
+ assert.equal((await f.stub.probeStageAvailability()).available,false);await f.stub.releaseBodyRead();let cancelling=false;
+ try{
+  for(let n=0;n<150&&!cancelling;n++){cancelling=(await f.stub.stats()).cancelHeld;if(!cancelling)await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(cancelling,true,'native reader cancellation started');
+  assert.equal((await f.stub.probeStageAvailability()).available,false,'late reader cancellation remains retained');
+ }finally{await f.stub.releaseBodyCancel();}
+ let available=false;for(let n=0;n<150&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),rows);assert.equal(f.activations.length,1);
+}));
+
+test('Unit2a unresolved issuer prefix refuses initial alarm without inventing authority',()=>using(async f=>{
+ await f.stub.seed([['afw.finite-preparation-issuer.v1:'+'a'.repeat(64)+':reservation','{}']]);
+ const before=await f.stub.snapshot();assert.equal((await f.stub.initialAlarm()).status,'admin_pending');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-cleanup-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-cleanup-records.test.mjs b/test/mcp-qa-finite-initial-cleanup-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-cleanup-records.test.mjs
@@ -0,0 +1,14 @@
+import test from 'node:test';import assert from 'node:assert/strict';
+import {sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from '../lib/mcp-qa-finite-initial-cleanup-records.mjs';
+const h='a'.repeat(64);
+test('B2b recovery codecs are bounded exact own DATA with domain-separated hashes',()=>{
+ const s=seal('State',{planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null}),raw=encode('State',s);
+ assert.deepEqual(decode('State',raw),s);
+ for(const v of [raw+' ',raw.replace(h,'b'.repeat(64)),JSON.stringify({...s,extra:true}),' '.repeat(65537)])assert.throws(()=>decode('State',v));
+ assert.throws(()=>decode('ArmAck',raw));assert.throws(()=>seal('State',{planHash:h,deliveries:4,status:'pending',nextAt:100,previousHash:null}));
+});
+test('B2b recovery codec does not invoke accessors or accept prototypes/unknown fields',()=>{
+ let reads=0;const v={planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null};Object.defineProperty(v,'extra',{enumerable:true,get(){reads++;return true;}});
+ assert.throws(()=>seal('State',v));assert.equal(reads,0);assert.throws(()=>seal('State',Object.assign(Object.create({}),{planHash:h})));
+ assert.throws(()=>seal('State',{planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null,extra:true}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-custody-probe-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-custody-probe-native.test.mjs b/test/mcp-qa-finite-initial-custody-probe-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-custody-probe-native.test.mjs
@@ -0,0 +1,58 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('native actor observes fixed custody identity and old guard without effects',()=>using('normal',async f=>{
+ const before=await f.stub.snapshot(),result=await f.stub.probeNativeCustody();
+ assert.equal(result.status,'observed');assert.equal(result.guardVerified,true);assert.equal(result.authorizesEffects,false);assert.equal(result.operationalReadiness,false);
+ assert.equal(result.reader.status,'active');assert.equal(result.publisher.status,'active');
+ assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
+ assert.equal(f.requests.filter(x=>x.endsWith('/tokens/verify')).length,2);
+ assert.equal(f.requests.filter(x=>x.includes('/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04')).length,1);
+ assert.equal(JSON.stringify(result).includes('synthetic-native'),false);assert.equal(JSON.stringify(result).includes('Bearer'),false);
+}));
+for(const mode of ['reader-wrong-id','publisher-wrong-id','reader-inactive','publisher-inactive','reader-expired','publisher-expired','reader-not-before','publisher-not-before'])test('native custody observation rejects '+mode,()=>using(mode,async f=>{
+ const before=await f.stub.snapshot(),r=await f.stub.probeNativeCustody();assert.notEqual(r.status,'observed');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
+}));
+test('old guard 401 stays unavailable without exposing credential or changing actor state',()=>using('normal',async f=>{
+ f.oldGuardMode='http-401';const before=await f.stub.snapshot(),r=await f.stub.probeNativeCustody();assert.notEqual(r.status,'observed');assert.equal(JSON.stringify(r).includes('synthetic-native'),false);assert.deepEqual(await f.stub.snapshot(),before);
+}));
+for(const mode of ['aborted','expired'])test('unavailable parent prevents native custody reads '+mode,()=>using('normal',async f=>{
+ const n=f.requests.length,r=await f.stub.probeNativeCustody(mode);assert.notEqual(r.status,'observed');assert.equal(f.requests.length,n);assert.equal(f.uploads.length,0);
+}));
+
+test('unscoped caller cannot start native custody reads',()=>using('normal',async f=>{
+ const before=f.requests.length,r=await f.stub.probeNativeCustody('unscoped');
+ assert.equal(r.status,'unavailable');assert.equal(f.requests.length,before);assert.equal(f.uploads.length,0);
+}));
+test('scoped pending custody read remains retained after timeout',()=>using('custody-hold',async f=>{
+ const before=await f.stub.snapshot(),result=await f.stub.probeNativeCustody();
+ assert.equal(result.status,'unavailable');assert.equal(f.held,'custody-read');
+ try{assert.equal((await f.stub.probeStageAvailability()).available,false);}finally{f.release();}
+ let available=false;for(let n=0;n<200&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
+}));
+
+test('pre-entry custody observes without entry or mutation',()=>using('normal',async f=>{
+ const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();
+ assert.equal(before.some(([key])=>key==='afw.finite-initial-preparation.v1:entry'),false);
+ assert.equal(r.status,'observed');assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);
+ assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
+ assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
+}));
+test('pre-entry pending read retains exclusive scope after timeout',()=>using('custody-hold',async f=>{
+ const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();assert.equal(r.status,'unavailable');assert.equal(f.held,'custody-read');
+ try{assert.equal((await f.stub.probeStageAvailability()).available,false);assert.equal((await f.stub.preEntryCustody()).status,'unavailable');}finally{f.release();}
+ let available=false;for(let n=0;n<200&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);
+}));
+
+for(const mode of ['reader-wrong-id','publisher-wrong-id','reader-expired','publisher-inactive'])test('pre-entry rejects '+mode,()=>using(mode,async f=>{
+ const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();
+ assert.equal(r.status,'unavailable');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
+}));
+
+test('wrong native actor cannot start a pre-entry custody read',()=>using('normal',async f=>{
+ const n=f.requests.length,before=await f.stub.snapshot(),r=await f.stub.preEntryCustody('wrong-actor');
+ assert.equal(r.status,'unavailable');assert.equal(f.requests.length,n);assert.deepEqual(await f.stub.snapshot(),before);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-entry-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-entry-native.test.mjs b/test/mcp-qa-finite-initial-entry-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-entry-native.test.mjs
@@ -0,0 +1,92 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const KEY='afw.finite-initial-preparation.v1:entry',ONCE='afw.finite-initial-preparation.v1:once';
+const pending=r=>assert.equal(r.status,'admin_pending',JSON.stringify(r));
+async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+const claimed=rows=>rows.some(([k])=>k===ONCE);
+test('B1 actual finite actor durable entry composes A and returns only safe references',()=>using('normal',async f=>{
+ const before=await f.stub.snapshot();await f.stub.configure('normal');const r=await f.stub.invoke(f.refs);
+ try{
+ assert.equal(r.status,'material_recorded',JSON.stringify(r));
+ assert.deepEqual(Object.keys(r).sort(),['status','entryHash','materialHash','sourceRevision','qaVersionId','authorizesEffects','completePackage','operationalReadiness'].sort());
+ assert.equal(r.authorizesEffects,false);assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
+ const rows=await f.stub.snapshot(),entry=JSON.parse(rows.find(([k])=>k===KEY)[1]);
+ assert.equal(entry.entryHash,r.entryHash);assert.equal(entry.createdAt,f.refs.createdAt);
+ assert.equal(entry.operationDeadline,Math.min(entry.initialDeadline,entry.createdAt+30000,f.approval));
+ assert.ok(claimed(rows));for(const pair of before)assert.deepEqual(rows.find(([k])=>k===pair[0]),pair);
+ assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-preparation.v1:capsule'));
+ const stats=await f.stub.stats();try{assert.equal(stats.syncs,12);}finally{stats[Symbol.dispose]?.();}
+ const requests=f.requests.length,replay=await f.stub.invoke(f.refs);try{pending(replay);}finally{replay[Symbol.dispose]?.();}assert.deepEqual(await f.stub.snapshot(),rows);
+ assert.ok(f.requests.length>=requests);const after=await f.stub.stats();try{assert.equal(after.syncs,12);}finally{after[Symbol.dispose]?.();}
+ }finally{r[Symbol.dispose]?.();}
+}));
+test('B1 concurrent actual SQLite contenders admit one A',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const results=await Promise.all([f.stub.invoke(f.refs),f.stub.invoke(f.refs)]);
+ assert.equal(results.filter(r=>r.status==='material_recorded').length,1,JSON.stringify(results));
+ assert.equal((await f.stub.snapshot()).filter(([k])=>k===KEY).length,1);
+}));
+test('B1 actual Workflow class calls fixed actor with safe result',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const r=await f.workflow(f.refs);
+ assert.equal(r.result.status,'material_recorded',JSON.stringify(r));
+ assert.equal(r.config.options.retries.limit,0);
+}));
+for(const mode of ['lost-ack','reject-sync','callback-retry'])test('B1 '+mode+' never enters A',()=>using('normal',async f=>{
+ await f.stub.configure(mode);pending(await f.stub.invoke(f.refs));
+ const rows=await f.stub.snapshot();assert.ok(rows.some(([k])=>k===KEY));assert.equal(claimed(rows),false);
+ pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
+}));
+test('B1 never-committed entry permits same-deadline deterministic contender',()=>using('normal',async f=>{
+ await f.stub.configure('never-commit');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
+ const r=await f.stub.invoke(f.refs);assert.equal(r.status,'material_recorded',JSON.stringify(r));
+}));
+test('B1 A completed but post-sync unknown returns pending and never recollects',()=>using('normal',async f=>{
+ await f.stub.configure('post-reject-sync');pending(await f.stub.invoke(f.refs));const rows=await f.stub.snapshot();assert.ok(claimed(rows));
+ pending(await f.stub.invoke(f.refs));assert.deepEqual(await f.stub.snapshot(),rows);
+}));
+for(const mode of ['hold-sync','held-transaction'])test('B1 partial original deadline fences '+mode+' and late ACK',()=>using('partial',async f=>{
+ await f.stub.configure(mode);const r=await f.stub.invoke(f.refs);pending(r);
+ const rows=await f.stub.snapshot();assert.equal(claimed(rows),false);assert.ok(rows.some(([k])=>k===KEY));assert.equal((await f.stub.stats()).held,true);await f.stub.release();
+ await new Promise(resolve=>setTimeout(resolve,20));assert.equal(claimed(await f.stub.snapshot()),false);
+ pending(await f.stub.invoke(f.refs));
+}));
+for(const change of [r=>r.workflowName='other',r=>r.initialInstanceId+='x',r=>r.sourceRevision='e'.repeat(40),r=>r.createdAt=Date.now()-30001,r=>r.extra=true])test('B1 rejects mismatched native correlation before entry',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const refs={...f.refs};change(refs);pending(await f.stub.invoke(refs));
+ assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);
+}));
+for(const mode of ['wrong-owner','edited','wrong-source','wrong-qa','command-drift'])test('B1 independent command rejects '+mode,()=>using(mode,async f=>{
+ await f.stub.configure('normal');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
+}));
+
+for(const fault of ['lost-ack','post-reject-sync'])test('B1 actual persisted SQLite actor restart after '+fault+' never recollects',()=>using('restart',async f=>{
+ await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));const before=await f.stub.snapshot();assert.ok(before.some(([k])=>k===KEY));
+ await f.restart();assert.deepEqual(await f.stub.snapshot(),before,'persisted snapshot before restarted invocation');await f.stub.configure('normal');pending(await f.stub.invoke(f.refs));assert.deepEqual(await f.stub.snapshot(),before);assert.equal((await f.stub.stats()).syncs,0);
+}));
+test('B1 held actual sync expires at child5s despite cached entry readback',()=>using('normal',async f=>{
+ await f.stub.configure('hold-sync');const began=Date.now(),operation=f.stub.invoke(f.refs);
+ let observed=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){observed=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.ok(observed);
+ const cached=await f.stub.snapshot();assert.ok(cached.some(([k])=>k===KEY));assert.equal(claimed(cached),false);
+ pending(await operation);assert.ok(Date.now()-began>=4900);assert.ok(Date.now()-began<12000);
+ await f.stub.release();pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
+}));
+test('B1 held post-A sync cannot report success before durability barrier',()=>using('normal',async f=>{
+ await f.stub.configure('post-hold-sync');const operation=f.stub.invoke(f.refs);
+ let held=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.ok(held);
+ assert.ok(claimed(await f.stub.snapshot()));pending(await operation);await f.stub.release();pending(await f.stub.invoke(f.refs));
+}));
+
+for(const fault of ['missing-sync','missing-db','missing-node','missing-db-with-session','noncallable-db-with-session','missing-node-id-from-string','noncallable-node-id-from-string'])test('B1 missing native holder '+fault+' fails before entry',()=>using('normal',async f=>{
+ await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);
+}));
+test('B1 changed actual sync holder after transaction cannot enter A',()=>using('normal',async f=>{
+ await f.stub.configure('changed-sync');pending(await f.stub.invoke(f.refs));assert.equal(claimed(await f.stub.snapshot()),false);
+}));
+test('B1 Workflow callback reentry cannot reconstruct winning admission',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const first=await f.workflow(f.refs);assert.equal(first.result.status,'material_recorded');
+ const rows=await f.stub.snapshot();pending((await f.workflow(f.refs)).result);assert.deepEqual(await f.stub.snapshot(),rows);
+}));
+
+for(const fault of ['changed-db-with-session','changed-node-id-from-string'])test('B1 native method drift before CAS '+fault+' leaves entry absent',()=>using('normal',async f=>{
+ await f.stub.configure(fault);pending(await f.stub.invoke(f.refs));assert.equal((await f.stub.snapshot()).some(([k])=>k===KEY),false);assert.equal((await f.stub.stats()).transactions,1);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-entry-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-entry-records.test.mjs b/test/mcp-qa-finite-initial-entry-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-entry-records.test.mjs
@@ -0,0 +1,7 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialInstanceId} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+let codec;try{codec=await import('../lib/mcp-qa-finite-initial-entry-records.mjs');}catch{codec={encodeFiniteInitialEntry(){throw Error('missing entry codec');},hashFiniteInitialEntry(){throw Error('missing entry codec');}};}
+const base=()=>{const v={purpose:'afw.finite-initial-entry.v1',commandId:1,commandHash:'a'.repeat(64),sourceRevision:'b'.repeat(40),sourceTree:'c'.repeat(40),qaVersionId:'11111111-1111-4111-8111-111111111111',workflowName:'afw-own-qa-private-bootstrap',createdAt:1000,I0:0,initialDeadline:300000,operationDeadline:31000};v.initialInstanceId=initialInstanceId(v);return v;};
+test('B1 exact deterministic entry codec roundtrip',()=>{const b=base(),v={...b,entryHash:codec.hashFiniteInitialEntry(b)},raw=codec.encodeFiniteInitialEntry(v);assert.deepEqual(codec.decodeFiniteInitialEntry(raw),v);assert.ok(Buffer.byteLength(raw)<=4096);});
+test('B1 entry codec rejects renewed deadline, getters and extra fields',()=>{const b=base();for(const v of [{...b,operationDeadline:32000},{...b,extra:true},Object.defineProperty({...b},'I0',{get(){throw Error('getter');},enumerable:true})])assert.throws(()=>codec.hashFiniteInitialEntry(v));});

~~~~~~~~~~

## test/mcp-qa-finite-initial-gates-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-gates-native.test.mjs b/test/mcp-qa-finite-initial-gates-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-gates-native.test.mjs
@@ -0,0 +1,120 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+
+async function using(fn,mode='normal'){
+ const f=await initialEntryHarness('normal');
+ try{await f.stub.configure(mode);await fn(f);}
+ finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+}
+const has=(f,part)=>f.requests.some(x=>x.includes(part));
+test('same original initial actor observes preliminary gates before activation',()=>using(async f=>{
+ const r=await f.stub.invoke(f.refs);
+ assert.equal(r.status,'material_recorded',JSON.stringify(r));
+ assert.equal(r.authorizesEffects,false);assert.equal(r.completePackage,false);
+ assert.ok(has(f,'/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04'));
+ assert.ok(has(f,'/workflows?per_page=100&page=1'));
+ assert.equal(f.requests.filter(x=>x.includes('independent-closure-qa/deployments?per_page=1')).length>=4,true);
+ assert.equal(f.uploads.length,1);assert.equal(f.restores.length,0);
+ assert.equal(f.activations.length,1);
+}));
+for(const fault of ['guard','inventory','schema','qa','history','custody'])test('preliminary '+fault+' failure cannot progress after arm',()=>using(async f=>{
+ if(fault==='guard')f.oldGuardMode='http-401';
+ if(fault==='inventory')f.inventoryMode='foreign';
+ if(fault==='schema')await f.db.exec('DROP TRIGGER dossier_node_process_no_update');
+ if(['qa','history','custody'].includes(fault))f.gateMode=fault;
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending',fault);
+ assert.equal(f.uploads.length,1);assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'),fault+' reached durable arm');
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+}));
+
+test('failed sibling retains the actual unfinished D1 read until it settles',()=>using(async f=>{
+ f.oldGuardMode='retention-401';
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending');
+ assert.equal((await f.stub.stats()).held,true,'the native query completion remains held');
+ assert.equal((await f.stub.probeStageAvailability()).available,false,'the prior actor work remains retained');
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+ await f.stub.release();
+ let available=false;
+ for(let n=0;n<100&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(available,true,'settlement releases the prior retention');
+ assert.deepEqual(await f.stub.snapshot(),rows);
+},'gate-retention'));
+
+for(const fault of ['active-container','schedule','ineligible','candidate-module','candidate-resource','candidate-secret'])test('pre-effect primary '+fault+' blocks without activation',()=>using(async f=>{
+ f.alarmMode=fault;
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending',fault);
+ assert.equal(f.uploads.length,1);
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'));
+ const target=fault==='active-container'?'/instances-v2?':fault==='schedule'?'/schedules':fault==='ineligible'?'/versions?deployable=true':'/versions/55555555-5555-4555-8555-555555555555?include=modules';
+ assert.ok(f.requests.some(url=>url.includes(target)),fault+' reached its primary read');
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+}));
+
+test('failed primary sibling retains actual outstanding provider read',()=>using(async f=>{
+ f.gateMode='primary-retention';
+ const result=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(result.status,'admin_pending');
+ assert.equal(f.held,'provider-read');
+ try{
+  assert.equal((await f.stub.probeStageAvailability()).available,false);
+  assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ }finally{f.release();}
+ let available=false;
+ for(let n=0;n<100&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(available,true);
+ assert.deepEqual(await f.stub.snapshot(),rows);
+}));
+
+for(const fault of ['operator-pointer','operator-version','canary-pointer','tails'])test('pre-effect primary '+fault+' fails closed',()=>using(async f=>{
+ f.gateMode=fault;
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending',fault);
+ assert.equal(f.uploads.length,1);
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'));
+ const target=fault==='operator-pointer'?'agent-friendly-web-release-operator/deployments?':fault==='operator-version'?'agent-friendly-web-release-operator/versions/':fault==='canary-pointer'?'agent-friendly-web-delegated-canary/deployments?':'/tails';
+ assert.ok(f.requests.some(url=>url.includes(target)),fault+' reached its primary read');
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+}));
+
+test('late primary headers cancel open response body after sibling failure',()=>using(async f=>{
+ f.gateMode='primary-late-headers';
+ const result=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(result.status,'admin_pending');
+ assert.equal(f.held,'provider-read');
+ assert.equal((await f.stub.probeStageAvailability()).available,false);
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ f.release();
+ let cancelled=false;
+ for(let n=0;n<200&&!cancelled;n++){cancelled=(await f.stub.stats()).bodyCancelled===true;if(!cancelled)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(cancelled,true,'the actual late body is cancelled');
+ let available=false;
+ for(let n=0;n<200&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
+ assert.equal(available,true,'the body cancellation has settled');
+ assert.deepEqual(await f.stub.snapshot(),rows);
+},'late-body-observe'));
+
+test('final serial canary pointer drift blocks before activation',()=>using(async f=>{
+ f.gateMode='final-pointer';
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending');
+ assert.ok(f.pointerReads>=5,'the post-inventory pointer was observed');
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'));
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+}));
+test('late initial journal conflict blocks the final gate',()=>using(async f=>{
+ const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
+ assert.equal(r.status,'admin_pending');
+ assert.ok(f.pointerReads>=5);
+ assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'));
+ assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
+ assert.equal(f.restores.length,0);assert.equal(f.activations.length,0);
+},'late-initial-journal'));

~~~~~~~~~~

## test/mcp-qa-finite-initial-history-schema-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-history-schema-native.test.mjs b/test/mcp-qa-finite-initial-history-schema-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-history-schema-native.test.mjs
@@ -0,0 +1,31 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+
+const triggers=[
+ 'dossier_node_process_no_update',
+ 'dossier_node_process_no_delete',
+ 'dossier_node_process_close_no_update',
+ 'dossier_node_process_close_no_delete'
+];
+test('native D1 installed immutable history triggers are checked before an initial gate can qualify',async()=>{
+ const f=await initialEntryHarness('normal');
+ try{
+  const observed=await f.stub.probeHistorySchema();assert.equal(observed.schemaVerified,true);assert.equal(observed.authorizesEffects,false);assert.equal(observed.operationalReadiness,false);
+  assert.equal((await f.stub.probeHistorySchema('aborted')).status,'unavailable');
+  assert.equal((await f.stub.probeHistorySchema('expired')).status,'unavailable');
+  for(const name of triggers){
+   const saved=await f.db.prepare("SELECT sql FROM sqlite_schema WHERE type='trigger' AND name=?").bind(name).first();
+   assert.ok(saved?.sql,name);
+   await f.db.exec('DROP TRIGGER '+name);
+   assert.equal((await f.stub.probeHistorySchema()).status,'unavailable',name+' absent');
+   const altered=saved.sql.replace(/SELECT RAISE\(ABORT,'[^']+'\)/,'SELECT 1');
+   assert.notEqual(altered,saved.sql);
+   await f.db.exec(altered);
+   assert.equal((await f.stub.probeHistorySchema()).status,'unavailable',name+' altered');
+   await f.db.exec('DROP TRIGGER '+name);
+   await f.db.exec(saved.sql);
+   assert.equal((await f.stub.probeHistorySchema()).schemaVerified,true,name+' restored');
+  }
+ }finally{await f.mf.dispose();await f.cleanup();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-material-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-material-native.test.mjs b/test/mcp-qa-finite-initial-material-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-material-native.test.mjs
@@ -0,0 +1,217 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {gzipSync} from 'node:zlib';
+import {readFile} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {bootstrapWorld,UUID,GH,CF} from './fixtures/finite-bootstrap-world.mjs';
+import {initialHistoryFixture,seedInitialHistory} from './fixtures/finite-initial-history-world.mjs';
+import {QA_CLOUD_CLOSED_PINS as realPins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
+import {finiteData,finiteFields} from '../lib/mcp-finite-evidence.mjs';
+import {initialCanonical,initialHash,validateFiniteInitialOriginalContext,encodeFiniteInitialMaterialRecord,decodeFiniteInitialMaterialRecord} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
+const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001,ONCE='afw.finite-initial-preparation.v1:once';
+async function harness(mode='normal'){
+ const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
+ const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
+ const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
+ const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
+ const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
+ const created=new Date(Math.floor((Date.now()-1000)/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
+ const approval=Date.now()+86400000;
+ const f={mf,x,w,command,requests:[],mode,held:null,release:null,commandReads:0,approval};
+ const entry=String.raw`
+ import{DurableObject}from'cloudflare:workers';
+ import{createPrivateQaFiniteInitialMaterial}from'./lib/mcp-qa-finite-initial-material.mjs';
+ import{createFiniteInitialMaterialStore}from'./lib/mcp-qa-finite-initial-material-store.mjs';
+ import{hashFiniteInitialMaterialRecord,initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';
+ import{observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';
+ export class Node extends DurableObject{}
+ export class Initial extends DurableObject{
+ async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);}
+ async snapshot(){return[...await this.ctx.storage.list()];}
+ async run(mode='normal'){
+  const abort=new AbortController(),entered=Date.now(),mono=performance.now(),end=entered+(mode==='held-parent'?120:30000);
+  const lease=Object.freeze({signal:abort.signal,assertCurrent(){if(abort.signal.aborted||Date.now()>=end||performance.now()-mono>=end-entered)throw Error('parent expired');}});
+  const timer=setTimeout(()=>abort.abort(),end-entered),storage=this.ctx.storage;
+  const nativeTransaction=storage.transaction;
+  if(mode==='held-parent')storage.transaction=(...args)=>Reflect.apply(nativeTransaction,storage,args).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));
+  const producer=createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env});
+  let result;
+  try{
+   if(mode==='held-parent')await new Promise(r=>setTimeout(r,60));
+   if(mode==='aborted')abort.abort();
+   if(mode==='holder-drift')this.env.AFW_QA_VERSION={id:this.env.AFW_QA_VERSION.id};
+   result=await producer.collect({commandId:9001},lease);
+   if(result?.purpose!=='afw.finite-initial-material-result.v1')return{ok:false,status:result?.status};
+   producer.assertCurrent(result,lease);
+   const originalContext=result.originalContext,artifact=originalContext.artifact,script=artifact.script;
+   const frozenOwnership=Object.isFrozen(result)&&Object.isFrozen(originalContext)&&Object.isFrozen(artifact)&&typeof script==='string';
+   let scriptWriteDenied=false,artifactWriteDenied=false,forgedScriptDenied=false,borrowedArtifactsDenied=false;
+   try{artifact.script=script+'SYN changed';}catch{scriptWriteDenied=true;}
+   try{originalContext.artifact=Object.freeze({...artifact});}catch{artifactWriteDenied=true;}
+   const forgedScript=Object.freeze({...result,originalContext:Object.freeze({...originalContext,artifact:Object.freeze({...artifact,script:script+'SYN forged'})})});
+   try{producer.assertCurrent(forgedScript,lease);}catch{forgedScriptDenied=true;}
+   try{producer.assertCurrent(Object.freeze({...result,originalContext, candidateBytes:result.candidateBytes}),lease);}catch{borrowedArtifactsDenied=true;}
+   producer.assertCurrent(result,lease);
+   const sameOwnedContext=result.originalContext===originalContext&&result.originalContext.artifact===artifact&&artifact.script===script;
+   let cloneDenied=false,otherDenied=false,otherLeaseDenied=false,mutatedDenied=false,expiredDenied=false;
+   try{producer.assertCurrent(structuredClone(result),lease);}catch{cloneDenied=true;}
+   try{createPrivateQaFiniteInitialMaterial({ctx:this.ctx,env:this.env}).assertCurrent(result,lease);}catch{otherDenied=true;}
+   try{producer.assertCurrent(result,{...lease});}catch{otherLeaseDenied=true;}
+   result.candidateBytes[0]^=1;try{producer.assertCurrent(result,lease);}catch{mutatedDenied=true;}result.candidateBytes[0]^=1;
+   abort.abort();try{producer.assertCurrent(result,lease);}catch{expiredDenied=true;}
+   return{ok:true,frozenOwnership,scriptWriteDenied,artifactWriteDenied,forgedScriptDenied,borrowedArtifactsDenied,sameOwnedContext,otherLeaseDenied,mutatedDenied,expiredDenied,claims:[result.sourceIdentityVerified,result.scopeVerified,result.authorizesEffects,result.completePackage,result.operationalReadiness],cloneDenied,otherDenied,material:result.material,scriptHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(result.originalContext.artifact.script)).then(v=>[...new Uint8Array(v)].map(b=>b.toString(16).padStart(2,'0')).join('')),candidateBytes:result.candidateBytes.length,storageSame:storage===this.ctx.storage};
+  }catch(e){return{ok:false,error:e.message};}finally{clearTimeout(timer);abort.abort();storage.transaction=nativeTransaction;}
+ }
+ async holdReady(){return typeof this.releaseHeld==='function';}
+ async releaseHold(){this.releaseHeld?.();this.releaseHeld=null;}
+ async storageCase(mode,template){
+  const storage=this.ctx.storage,native=storage.transaction,abort=new AbortController();
+  const lease={signal:abort.signal,assertCurrent(){if(abort.signal.aborted)throw Error('expired');}};
+  let count=0;
+  storage.transaction=(...args)=>{count++;const n=count;
+   if(mode==='claim-not-committed'&&n===1||mode==='ack-write-failed'&&n===3)return Promise.reject(Error('SYN unavailable before ack transaction'));
+   return Reflect.apply(native,storage,args).then(value=>{
+    if(mode==='claim-ack-unknown'&&n===1||mode==='material-ack-unknown'&&n===2)throw Error('SYN actual transaction ACK lost');
+    return value;
+   });
+  };
+  try{
+   const store=createFiniteInitialMaterialStore({storage}),intent=template.intent,deadline=Date.now()+20000,commandHash='f'.repeat(64);
+   if(mode==='concurrent'){
+    const results=await Promise.allSettled([store.claim(intent,commandHash,deadline,lease),store.claim(intent,commandHash,deadline,lease)]);
+    return{attempts:count,fulfilled:results.filter(r=>r.status==='fulfilled').length,rows:[...await storage.list()]};
+   }
+   let claim,firstDenied=false;try{claim=await store.claim(intent,commandHash,deadline,lease);}catch{firstDenied=true;}
+   if(mode==='claim-ack-unknown'||mode==='claim-not-committed'){
+    const before=[...await storage.list()],nextIntent={...intent,sourceRevision:'e'.repeat(40),qaVersionId:'44444444-4444-4444-8444-444444444444'};
+    nextIntent.initialInstanceId=initialInstanceId(nextIntent);
+    // A new constructor, same actual native storage: neither new M/QA nor
+    // an unknown/uncommitted transaction ACK permits a second claim attempt.
+    const fresh=createFiniteInitialMaterialStore({storage});let replayDenied=false;try{await fresh.claim(nextIntent,commandHash,deadline,lease);}catch{replayDenied=true;}
+    return{attempts:count,firstDenied,replayDenied,before,after:[...await storage.list()]};
+   }
+   const context=structuredClone(template.originalContext);
+   Object.assign(context,{trialId:claim.ids.trialId,withdrawalRequestId:claim.ids.withdrawalRequestId,saveIdempotencyKey:claim.ids.saveIdempotencyKey});
+   context.publication.activationKey=claim.ids.activationKey;
+   const material={...template,claimHash:claim.claimHash,preconnectionId:claim.ids.preconnectionId,originalContext:context,observedAt:Date.now()};
+   material.materialHash=hashFiniteInitialMaterialRecord('InitialMaterial',material);
+   let denied=false;try{await store.publish(claim,material,lease);}catch{denied=true;}
+   const before=[...await storage.list()];let replayDenied=false;try{await store.publish(claim,material,lease);}catch{replayDenied=true;}
+   return{denied,replayDenied,before,after:[...await storage.list()]};
+  }finally{abort.abort();storage.transaction=native;}
+ }
+ async blocked(){
+  const abort=new AbortController(),lease={signal:abort.signal,assertCurrent(){if(abort.signal.aborted)throw Error('expired');}};
+  let entered=false;try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission:{lease},originalLease:lease},async()=>{entered=true;});}catch{}finally{abort.abort();}return!entered;
+ }
+ }export default{fetch(){return new Response(null,{status:404})}};
+ `;
+ let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
+ const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
+ if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
+ const sources=new Map();
+ for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
+  const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
+ }
+ const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
+  b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
+  b.onLoad({filter:/mcp-qa-finite-(historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
+  b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
+  b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
+  b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin})+';',loader:'js'}));
+ }};
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ await mf.setOptions(convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
+  f.requests.push(req.url);assert.equal(req.method,'GET');
+  let value;
+  if(req.url.startsWith(GH)){
+   assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
+   if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
+  }else{
+   assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
+   let result;
+   if(req.url===CF+'/tokens/verify')result={id:'9aa97ad1fc9afe3021cf69ea497d5190',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1')result=w.pointer;
+   else{assert.equal(req.url,CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/2607abae-cec3-4e35-89eb-8b8572262b54?include=modules');result=structuredClone(x.metadata);}
+   value={success:true,errors:[],messages:[],result};
+  }
+  return Response.json(value,{headers:{date:new Date().toUTCString(),'x-ratelimit-remaining':'60'}});
+ }}));
+ const bindings=await mf.getBindings();f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB');
+ await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
+ if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
+ if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
+ f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;return f;
+}
+test('C2-A actual native B1+B2+C1 composition retains private factual material, never authority',async()=>{
+ const f=await harness();try{
+  const before=await f.stub.snapshot(),r=await f.stub.run();assert.equal(r.ok,true,J(r));
+  assert.deepEqual(r.claims,[false,false,false,false,false]);assert.ok(r.cloneDenied&&r.otherDenied&&r.otherLeaseDenied&&r.mutatedDenied&&r.expiredDenied&&r.storageSame);
+  assert.equal(r.material.intent.sourceRevision,M);assert.equal(r.material.originalContext.artifact.sourceRevision,M);assert.equal(r.material.originalContext.original.sourceRevision,'2'.repeat(40));
+  assert.equal(r.material.originalContext.legacy.sourceRevision,M);assert.equal(r.material.ownerSelection.project.synthetic,true);assert.equal(r.material.ownerSelection.project.revision,1);
+  assert.equal(r.material.originalContext.retirementPolicy,J({...f.x.events,grantId:'original',containerId:f.x.original.containerId,startAt:f.x.at,expiresAt:f.x.at+10000,programHash:f.x.original.programHash,sourceRevision:f.x.original.sourceRevision}));
+  assert.equal(r.scriptHash,f.resident.module.sha256);assert.equal(r.candidateBytes,f.resident.module.bytes);assert.equal(Object.hasOwn(r.material.originalContext.artifact,'script'),false);
+  const decoded=decodeFiniteInitialMaterialRecord('InitialMaterial',encodeFiniteInitialMaterialRecord('InitialMaterial',r.material));
+  // Reconstruct the actual Task4 projection and digest formula; script is only
+  // in the private full context and excluded by the exact artifact fields.
+  const original=finiteFields({...r.material.originalContext,artifact:{script:'private script',...r.material.originalContext.artifact}},['artifact','scope','original','publication','cancellations','retirementPolicy','withdrawalRequestId','saveIdempotencyKey','legacy','trialId']);
+  const identity=Object.fromEntries(['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'].map(k=>[k,original.artifact[k]]));
+  const projection=finiteData({...original,artifact:identity});
+  const task4=sha('afw.finite-original-context.v1\n'+initialCanonical(projection));
+  assert.equal(initialHash('afw.finite-original-context.v1',finiteData(decoded.originalContext)),task4);
+  for(const mutate of [
+   x=>x.originalContext.artifact.script='unexpected',
+   x=>x.qaBootstrap.primaryEvidence.jobId++,
+   x=>x.qaBootstrap.currentPointer.versionId='44444444-4444-4444-8444-444444444444',
+   x=>x.historicalEvidence.reader.sourceRevision='e'.repeat(40),
+   x=>x.ownerSelection.extra=true,
+   x=>x.materialHash='f'.repeat(64)
+  ]){const invalid=structuredClone(decoded);mutate(invalid);assert.throws(()=>encodeFiniteInitialMaterialRecord('InitialMaterial',invalid));}
+  const oversized=structuredClone(decoded);oversized.originalContext.legacy.control+=' '.repeat(33000);
+  assert.ok(Buffer.byteLength(initialCanonical(oversized))<65536,'whole material still below 64KiB');
+  assert.throws(()=>validateFiniteInitialOriginalContext(oversized.originalContext));
+  assert.throws(()=>encodeFiniteInitialMaterialRecord('InitialMaterial',oversized));
+  const after=await f.stub.snapshot();for(const pair of before)assert.deepEqual(after.find(x=>x[0]===pair[0]),pair);
+  assert.equal(after.some(x=>x[0]==='afw.qa-finite-trial.v1:head'),false);
+  assert.equal(f.requests.filter(x=>x.startsWith(GH)).length,13);assert.equal(f.requests.filter(x=>x.startsWith(CF)).length,6);
+  assert.equal(after.filter(x=>x[0].startsWith('afw.finite-initial-preparation.v1:')).length,4);
+  for(const mode of ['concurrent','claim-ack-unknown','claim-not-committed','material-ack-unknown','ack-write-failed']){
+   const stub=f.namespace.get(f.namespace.idFromName('SYN-store-'+mode));
+   const outcome=await stub.storageCase(mode,r.material);
+   if(mode==='concurrent'){assert.equal(outcome.attempts,1);assert.equal(outcome.fulfilled,1);assert.equal(outcome.rows.length,1);}
+   else{
+    assert.equal(outcome.replayDenied,true,mode);assert.deepEqual(outcome.after,outcome.before,mode);
+    if(mode==='claim-ack-unknown'||mode==='claim-not-committed'){assert.equal(outcome.attempts,1);assert.equal(outcome.firstDenied,true);assert.equal(outcome.after.length,mode==='claim-not-committed'?0:1);}
+    else{assert.equal(outcome.denied,true);assert.equal(outcome.after.length,3);assert.equal(outcome.after.some(x=>x[0].endsWith(':ack')),false);}
+   }
+  }
+  const claim=after.find(x=>x[0]===ONCE)[1],calls=f.requests.length;const replay=await f.stub.run();assert.equal(replay.ok,false);assert.equal((await f.stub.snapshot()).find(x=>x[0]===ONCE)[1],claim);assert.ok(f.requests.length-calls<=1);
+ }finally{await f.mf.dispose();}
+});
+for(const mode of ['wrong-owner','wrong-repository','wrong-issue','wrong-source','wrong-qa','edited','expired-command','command-drift','missing-access','missing-limiter','invalid-limiter','invalid-owned-revision','wrong-owned-subject','aborted','holder-drift'])test('C2-A denies '+mode+' without material/selector/ACK',async()=>{
+ const f=await harness(mode);try{const r=await f.stub.run(mode);assert.equal(r.ok,false);const rows=await f.stub.snapshot();assert.equal(rows.some(x=>/:(?:selector|ack)$/.test(x[0])),false);}finally{await f.mf.dispose();}
+});
+test('C2-A partially consumed original parent aborts held child, retains real promise and writes nothing late',async()=>{
+ const f=await harness('held-parent');try{
+  const before=await f.stub.snapshot(),running=f.stub.run('held-parent');
+  let held=false;for(let n=0;n<100&&!held;n++){held=await f.stub.holdReady();if(!held)await new Promise(r=>setTimeout(r,10));}
+  assert.equal(held,true);const r=await running;assert.equal(r.ok,false);
+  assert.equal(await f.stub.blocked(),true,'actual native storage ACK promise retained after parent expiry');
+  await f.stub.releaseHold();await new Promise(r=>setTimeout(r,80));
+  assert.equal(await f.stub.blocked(),false);assert.deepEqual(await f.stub.snapshot(),before);
+ }finally{await f.stub.releaseHold();await f.mf.dispose();}
+});
+
+test('T2 material native ownership keeps frozen script and mutable bytes fenced',async()=>{
+ const f=await harness();try{
+  const result=await f.stub.run();assert.equal(result.ok,true,J(result));
+  for(const key of ['frozenOwnership','scriptWriteDenied','artifactWriteDenied','forgedScriptDenied','borrowedArtifactsDenied','sameOwnedContext','cloneDenied','otherDenied','otherLeaseDenied','mutatedDenied','expiredDenied'])assert.equal(result[key],true,key);
+  assert.equal(result.scriptHash,f.resident.module.sha256);assert.equal(result.candidateBytes,f.resident.module.bytes);
+  assert.deepEqual(result.claims,[false,false,false,false,false]);
+ }finally{await f.mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-material-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-material-records.test.mjs b/test/mcp-qa-finite-initial-material-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-material-records.test.mjs
@@ -0,0 +1,9 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+let api;try{api=await import('../lib/mcp-qa-finite-initial-material-records.mjs');}catch{/* absent product RED */}
+test('C2-A record codec required before private storage',()=>{assert.equal(typeof api?.encodeFiniteInitialMaterialRecord,'function');assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');});
+test('C2-A strict codec rejects scripts/getters/extra fields rather than admitting caller facts',()=>{
+ assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');
+ for(const bad of ['{}','{"purpose":"afw.finite-initial-material.v1","script":"private"}','null'])assert.throws(()=>api.decodeFiniteInitialMaterialRecord('InitialMaterial',bad));
+ let invoked=false;assert.throws(()=>api.encodeFiniteInitialMaterialRecord('InitialClaim',{get purpose(){invoked=true;return 'no';}}));assert.equal(invoked,false);
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-old-guard-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-old-guard-native.test.mjs b/test/mcp-qa-finite-initial-old-guard-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-old-guard-native.test.mjs
@@ -0,0 +1,20 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+test('native fixed old guard observation qualifies only the historical blocked invocation',async()=>{
+ const f=await initialEntryHarness('normal');
+ try{
+  const valid=await f.stub.probeOldGuard();
+  assert.equal(valid.guardVerified,true);
+  assert.equal(valid.authorizesEffects,false);
+  assert.equal(valid.operationalReadiness,false);
+  assert.ok(f.requests.some(x=>x.endsWith('/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04')));
+  for(const mode of ['active','changed-output','changed-dispatch','changed-withdrawal','changed-readiness','retry','bad-step','bad-time','duplicate','short','http-401']){
+   f.oldGuardMode=mode;assert.equal((await f.stub.probeOldGuard()).status,'unavailable',mode);
+  }
+  const before=f.requests.length;
+  assert.equal((await f.stub.probeOldGuard('aborted')).status,'unavailable');
+  assert.equal((await f.stub.probeOldGuard('expired')).status,'unavailable');
+  assert.equal(f.requests.length,before);
+ }finally{await f.mf.dispose();await f.cleanup();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-owner-source-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-owner-source-native.test.mjs b/test/mcp-qa-finite-initial-owner-source-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-owner-source-native.test.mjs
@@ -0,0 +1,90 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {initialCanonical as canonical,initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const P='afw.finite-initial-preparation.v1:',C='afw.finite-initial-cleanup.v1:',get=(rows,k)=>rows.find(([key])=>key===k)?.[1];
+async function result(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
+async function using(fn){const f=await initialEntryHarness();try{await f.stub.configure('normal');assert.equal((await result(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('fixed factual envelope after technical expiry preserves original A, actual M and original Q with stable unchanged source grammar',()=>using(async f=>{
+ const before=await result(f.stub.snapshot()),capsule=JSON.parse(get(before,P+'capsule')),m=JSON.parse(get(before,P+'material:'+capsule.materialHash)),plan=JSON.parse(get(before,C+'plan')),start=f.requests.length;
+ const a=await result(f.ownerRead()),b=await result(f.ownerRead());
+ assert.equal(await f.stub.ownerEffectCount(),0);assert.deepEqual(a,b);assert.deepEqual(Object.keys(a).sort(),['capsuleHash','preconnectionId','source']);assert.equal(a.preconnectionId,m.preconnectionId);assert.equal(a.capsuleHash,capsule.capsuleHash);
+ assert.deepEqual(validateFiniteOwnerSource(a.source),a.source);
+ assert.deepEqual(a.source.window,{startedAt:capsule.I0,expiresAt:capsule.C0});assert.equal(a.source.phase,'closed_ui');
+ assert.deepEqual(a.source.currentPublication,{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null});
+ assert.notEqual(a.source.initialBaseline.versionId,f.x.pin.id);assert.equal(a.source.initialBaseline.moduleHash,capsule.moduleHash);
+ assert.equal(a.source.initialBaseline.configurationHash,finiteActivationConfigurationHash(plan.configuration));assert.notEqual(a.source.initialBaseline.configurationHash,capsule.configurationHash);
+ assert.equal(a.source.initialBaseline.bindingsHash,createHash('sha256').update(canonical([...plan.configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex'));
+ assert.notEqual(m.originalContext.original.programHash,m.originalContext.artifact.programHash);assert.notEqual(m.originalContext.original.sourceRevision,m.originalContext.artifact.sourceRevision);
+ assert.deepEqual(a.source.programContext,{programHash:m.originalContext.original.programHash,sourceRevision:m.originalContext.original.sourceRevision,originalContextHash:initialHash('afw.finite-original-context.v1',m.originalContext)});
+ assert.deepEqual(await result(f.stub.snapshot()),before);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.restores.length,0);
+ assert.ok(f.requests.slice(start).length>0);assert.ok(f.requestMethods.slice(start).every(method=>method==='GET'));
+ assert.deepEqual(await result(f.ownerRead(899000,'normal',a.preconnectionId)),a);
+ assert.equal((await result(f.ownerRead(900000))).status,'unavailable');
+}));
+test('strict same-lineage and holders deny without writes',()=>using(async f=>{
+ const before=await result(f.stub.snapshot());
+ for(const mode of ['missing','material','malformed','hash','anchor-entry','anchor-once','anchor-selector','anchor-ack','anchor-plan','anchor-state','anchor-arm-ack','anchor-activation-send','anchor-activation-ack','anchor-activation-completion','changed-anchor','alarm','transition','head','publication','wrong-version','wrong-actor','holder-drift','backward','parent-deadline','aborted','request-abort','untrusted-parent']){
+  assert.equal((await result(f.ownerRead(400000,mode))).status,'unavailable',mode);assert.equal(await f.stub.ownerEffectCount(),0);
+ }
+ assert.equal((await result(f.ownerRead(400000,'normal','f'.repeat(64)))).status,'unavailable');
+ assert.deepEqual(await result(f.stub.snapshot()),before);
+}));
+test('fresh primary owner and metadata mismatches deny',()=>using(async f=>{
+ for(const fault of ['qa-module','qa-namespace','module','configuration']){f.ownerFault=fault;assert.equal((await result(f.ownerRead())).status,'unavailable',fault);}f.ownerFault=null;
+ await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();assert.equal((await result(f.ownerRead())).status,'unavailable');
+ await f.db.prepare("UPDATE site_projects SET revision=1").run();assert.ok((await result(f.ownerRead())).source,'original revision must independently qualify before changing owner');
+ await f.db.prepare("UPDATE site_projects SET user_id='SYN another-owner'").run();assert.equal((await result(f.ownerRead())).status,'unavailable');
+}));
+test('actual deferred read stays retained after child timeout and blocks owner and readonly until settlement',()=>using(async f=>{
+ const rows=await result(f.stub.snapshot()),p=result(f.ownerRead(400000,'held-read'));
+ for(let i=0;i<150;i++){if((await result(f.stub.stats())).held)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await result(f.stub.stats())).held,true);
+ assert.equal((await p).status,'unavailable');
+ assert.equal((await result(f.stub.probeStageAvailability())).available,false);
+ assert.equal((await result(f.ownerRead())).status,'unavailable');
+ assert.equal((await result(f.stub.preEntryCustody())).status,'unavailable');
+ await f.stub.release();
+ for(let i=0;i<150;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await result(f.stub.probeStageAvailability())).available,true);
+ assert.deepEqual(await result(f.stub.snapshot()),rows);
+ assert.ok((await result(f.ownerRead())).source);
+}));
+
+for(const mode of ['held-fetch','held-cancel','held-body'])test('whole '+mode+' and cancellation remain retained after timeout',()=>using(async f=>{
+ const before=await result(f.stub.snapshot()),p=result(f.ownerRead(400000,mode));
+ const wait=async key=>{for(let i=0;i<200;i++){if((await result(f.stub.stats()))[key])return;await new Promise(r=>setTimeout(r,20));}assert.fail('actual '+key+' not reached');};
+ await wait(mode==='held-fetch'?'held':mode==='held-cancel'?'cancelHeld':'readHeld');
+ assert.equal((await p).status,'unavailable');assert.equal((await result(f.stub.probeStageAvailability())).available,false);
+ if(mode==='held-fetch')await f.stub.release();
+ else if(mode==='held-body'){await f.stub.releaseBodyRead();await wait('cancelHeld');assert.equal((await result(f.stub.probeStageAvailability())).available,false);await f.stub.releaseBodyCancel();}
+ else await f.stub.releaseBodyCancel();
+ for(let i=0;i<200;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await result(f.stub.probeStageAvailability())).available,true);assert.deepEqual(await result(f.stub.snapshot()),before);
+}));
+
+test('factual entry narrows the remaining ORIGINAL request budget rather than restarting thirty seconds',()=>using(async f=>{
+ const began=performance.now();
+ assert.equal((await result(f.ownerRead(400000,'request-budget'))).status,'unavailable');
+ assert.ok(performance.now()-began<1500,'original remaining budget was not renewed');
+ assert.equal((await result(f.stub.stats())).held,true);
+ assert.equal((await result(f.stub.probeStageAvailability())).available,false);
+ await f.stub.release();
+ for(let i=0;i<150;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await result(f.stub.probeStageAvailability())).available,true);
+}));
+
+test('actual fixed reader borrows only its existing native request and retains actual held read',()=>using(async f=>{
+ const standalone=await result(f.ownerRead()),nested=await result(f.ownerRead(400000,'nested-request'));
+ assert.deepEqual(nested,standalone);
+ const p=result(f.ownerRead(400000,'nested-request-held-read'));
+ for(let i=0;i<200;i++){if((await result(f.stub.stats())).held)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await p).status,'unavailable');assert.equal((await result(f.ownerRead())).status,'unavailable');assert.equal((await result(f.stub.probeStageAvailability())).available,false);
+ await f.stub.release();
+ for(let i=0;i<200;i++){if((await result(f.stub.probeStageAvailability())).available)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal((await result(f.stub.probeStageAvailability())).available,true);
+ assert.deepEqual(await result(f.ownerRead()),standalone);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-owner-source-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-owner-source-records.test.mjs b/test/mcp-qa-finite-initial-owner-source-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-owner-source-records.test.mjs
@@ -0,0 +1,23 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readPrivateQaFiniteInitialOwnerSource as read} from '../lib/mcp-qa-finite-initial-owner-source.mjs';
+import {createFiniteOwnerRequestLease} from '../lib/mcp-qa-finite-owner-preparation.mjs';
+import * as unavailable from '../lib/mcp-qa-finite-owner-source.mjs';
+test('factual entry rejects caller metadata before touching native holders',async()=>{
+ let calls=0;const ctx=new Proxy({},{get(){calls++;return null;}});
+ const entry=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/finite/prepare'));
+ try{
+  for(const extra of [{url:'https://example.com'},{capsule:{}},{now:Date.now()},{leaseFactory:()=>{}},{sourceRevision:'a'.repeat(40)},{genericRPC:()=>{}}]){
+   await assert.rejects(()=>read({ctx,env:{},parent:entry.lease,preconnectionId:null,...extra}));
+  }
+  assert.equal(calls,0);
+ }finally{entry.finish();}
+});
+test('a clone of a genuine parent is not incoming request provenance',async()=>{
+ let calls=0;const ctx=new Proxy({},{get(){calls++;return null;}}),entry=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/finite/prepare'));
+ try{await assert.rejects(()=>read({ctx,env:{},parent:{...entry.lease},preconnectionId:null}));assert.equal(calls,0);}finally{entry.finish();}
+});
+test('original owner source and all three effect forwarding seams remain unavailable',()=>{
+ assert.deepEqual(Object.keys(unavailable).sort(),['forwardPrivateQaFiniteOwnerAuthorization','forwardPrivateQaFiniteOwnerGrant','forwardPrivateQaFiniteOwnerNotice','readPrivateQaFiniteOwnerSource'].sort());
+ for(const seam of Object.values(unavailable))assert.throws(()=>seam({}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-scope.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-scope.test.mjs b/test/mcp-qa-finite-initial-scope.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-scope.test.mjs
@@ -0,0 +1,38 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {observeFiniteOwnerStageWork,continueFiniteOwnerStageWork,observeFiniteReadOnlyWork} from '../lib/mcp-qa-finite-stage-work.mjs';
+
+test('continuation reuses only the original context, holders and live parent',async()=>{
+ const controller=new AbortController(),otherController=new AbortController(),storage={},db={},ctx={storage},env={RELEASE_DB:db};
+ const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted)throw Error('expired');}});
+ const otherLease=Object.freeze({signal:otherController.signal,assertCurrent(){}});
+ const admission=Object.freeze({lease});
+ let release;const held=new Promise(resolve=>{release=resolve;});
+ const original=observeFiniteOwnerStageWork({ctx,env,admission,originalLease:lease},()=>held);
+ try{
+  await Promise.resolve();
+  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:otherLease},async()=>true));
+  assert.throws(()=>continueFiniteOwnerStageWork({ctx:{storage},env,originalLease:lease},async()=>true));
+  env.RELEASE_DB={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));env.RELEASE_DB=db;
+  ctx.storage={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));ctx.storage=storage;
+  assert.equal(await continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true),true);
+  controller.abort();
+  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));
+ }finally{controller.abort();otherController.abort();release();await original;}
+});
+
+test('read-only scope cannot substitute owner authority and excludes overlapping work',async()=>{
+ const c=new AbortController(),storage={},db={},ctx={storage},env={RELEASE_DB:db};
+ const lease=Object.freeze({signal:c.signal,assertCurrent(){if(c.signal.aborted)throw Error('expired');}});
+ let release;const held=new Promise(resolve=>{release=resolve;});
+ const op=observeFiniteReadOnlyWork({ctx,env,originalLease:lease},()=>held);
+ try{
+  await Promise.resolve();
+  assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));
+  assert.throws(()=>observeFiniteOwnerStageWork({ctx,env,admission:{lease},originalLease:lease},async()=>true));
+  assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:lease},async()=>true));
+  env.RELEASE_DB={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));env.RELEASE_DB=db;
+  ctx.storage={};assert.throws(()=>continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>true));ctx.storage=storage;
+  c.abort();assert.throws(()=>observeFiniteReadOnlyWork({ctx,env,originalLease:lease},async()=>true));
+ }finally{c.abort();release();await op;}
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-upload-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-upload-native.test.mjs b/test/mcp-qa-finite-initial-upload-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-upload-native.test.mjs
@@ -0,0 +1,87 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex');
+async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
+test('B2a actual native winner uploads actual M once with exact JSON deploy=false and baseline inheritance',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const r=await f.workflow(f.refs);
+ assert.equal(r.result.status,'material_recorded');assert.equal(f.uploads.length,1,'surviving native winner must perform real inactive upload');
+ const {data}=f.uploads[0];assert.deepEqual(Object.keys(data).sort(),['bindings','compatibility_date','compatibility_flags','containers','exports','main_module','modules','usage_model'].sort());
+ const bytes=Buffer.from(data.modules[0].content_base64,'base64');assert.equal(sha(bytes),f.resident.module.sha256);assert.notEqual(sha(bytes),f.x.pin.module.sha256);
+ assert.deepEqual(data.containers,[{class_name:'AfwOwnEventNode'}]);assert.deepEqual(Object.keys(data.exports).sort(),['AfwNodeControl','AfwOwnEventNode','default']);
+ assert.equal(data.exports.AfwOwnEventNode.storage,'sqlite');assert.equal(data.exports.AfwOwnEventNode.container,'agent-friendly-web-delegated-canary-afwowneventnode');
+ for(const b of data.bindings){assert.notEqual(b.type,'secret_text');if(b.type==='inherit')assert.deepEqual(b,{name:b.name,type:'inherit',version_id:'2607abae-cec3-4e35-89eb-8b8572262b54'});if(b.name.endsWith('_ENABLED'))assert.equal(b.text,'false');}
+ const rows=await f.stub.snapshot();assert.ok(rows.some(([k])=>k.startsWith('afw.finite-initial-upload.v1:')&&k.endsWith(':receipt')));
+ assert.equal(JSON.stringify(r).includes('content_base64'),false);assert.equal(JSON.stringify(r).includes('55555555'),false);assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
+ assert.equal((await f.workflow(f.refs)).result.status,'admin_pending');assert.equal(f.uploads.length,1);
+}));
+for(const mode of ['missing-publisher','invalid-publisher'])test('B2a '+mode+' fails before spending permanent Entry',()=>using('normal',async f=>{
+ await f.stub.configure(mode);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');
+ assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
+}));
+
+const uploadRows=rows=>rows.filter(([k])=>k.startsWith('afw.finite-initial-upload.v1:'));
+const has=(rows,suffix)=>uploadRows(rows).some(([k])=>k.endsWith(':'+suffix));
+const digestRows=rows=>sha(JSON.stringify(rows));
+test('B2a private backup reconstructs exact baseline with bounded deterministic chunks and retains old unknown',()=>using('normal',async f=>{
+ await f.stub.configure('normal');const before=await f.stub.snapshot(),r=await f.stub.invoke(f.refs);assert.equal(r.status,'material_recorded');
+ const rows=await f.stub.snapshot(),manifest=JSON.parse(uploadRows(rows).find(([k])=>k.endsWith(':backup'))[1]),chunks=uploadRows(rows).filter(([k])=>k.includes(':chunk:')).map(([,raw])=>JSON.parse(raw)).sort((a,b)=>a.index-b.index);
+ assert.equal(chunks.length,Math.ceil(f.x.pin.module.bytes/32768));assert.equal(chunks.every(c=>c.manifestHash===manifest.recordHash&&sha(Buffer.from(c.content,'base64'))===c.sha256),true);
+ assert.equal(sha(Buffer.concat(chunks.map(c=>Buffer.from(c.content,'base64')))),f.x.pin.module.sha256);
+ assert.equal(uploadRows(rows).every(([,raw])=>Buffer.byteLength(raw)<=65536),true);
+ const material=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-initial-preparation.v1:material:'))[1]);
+ assert.equal(manifest.retainedIds.preconnectionId,material.preconnectionId);assert.equal(manifest.retainedIds.activationKey,material.originalContext.publication.activationKey);
+ assert.equal(f.uploads[0].data.bindings.find(b=>b.name==='AFW_OAUTH_PILOT_EXPIRES_AT').text,new Date(material.intent.I0+900000).toISOString());
+ assert.equal(manifest.historicalSourceRevision,f.x.receipt.sourceRevision);assert.notEqual(manifest.historicalSourceRevision,material.intent.sourceRevision);
+ for(const [key,value]of before)assert.equal(digestRows(rows.filter(([k])=>k===key)),digestRows([[key,value]]));
+ const send=JSON.parse(uploadRows(rows).find(([k])=>k.endsWith(':send'))[1]);assert.equal(send.bodyHash,sha(f.uploads[0].body));assert.ok(send.deadline-send.issuedAt<=5000);
+ assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
+}));
+for(const fault of ['upload-lost-send-ack','upload-never-commit','upload-callback-retry','upload-reject-sync','upload-readback-tamper','upload-chunk-tamper','upload-publisher-drift'])test('B2a '+fault+' cannot authorize a POST or retry',()=>using('normal',async f=>{
+ await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);
+ const before=digestRows(await f.stub.snapshot());assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(digestRows(await f.stub.snapshot()),before);
+}));
+for(const fault of ['upload-lost-send-ack','upload-never-commit'])test('B2a persisted native restart after '+fault+' never resumes effect',()=>using('restart',async f=>{
+ await f.stub.configure(fault);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');const before=digestRows(await f.stub.snapshot());
+ await f.restart();await f.stub.configure('normal');assert.equal(digestRows(await f.stub.snapshot()),before);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);
+}));
+for(const fault of ['upload-held-send','upload-hold-sync','upload-hold-ack-sync'])test('B2a actual pending '+fault+' cannot continue after child expiry',()=>using('normal',async f=>{
+ await f.stub.configure(fault);const operation=f.stub.invoke(f.refs),start=Date.now();
+ let held=false;for(let i=0;i<100;i++){if((await f.stub.stats()).held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
+ const rows=await f.stub.snapshot();assert.equal(has(rows,'send'),true);assert.equal(has(rows,'receipt'),false);
+ assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-start>=4900);await f.stub.release();
+ const count=f.uploads.length;await new Promise(resolve=>setTimeout(resolve,30));assert.equal(f.uploads.length,count);assert.equal(has(await f.stub.snapshot(),'receipt'),false);
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,count);
+}));
+test('B2a held SEND sync consumes partially spent original native parent, not a new30s',()=>using('upload-partial',async f=>{
+ await f.stub.configure('upload-hold-sync');const began=Date.now(),operation=f.stub.invoke(f.refs);
+ assert.equal((await operation).status,'admin_pending');assert.ok(Date.now()-began<5000);assert.equal((await f.stub.stats()).held,true);await f.stub.release();
+ assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'receipt'),false);
+}));
+for(const fault of ['reader-wrong-id','reader-inactive','reader-expired','reader-not-before','publisher-wrong-id','publisher-inactive','publisher-expired','publisher-not-before'])test('B2a actual loaded custody '+fault+' fails before Entry',()=>using(fault,async f=>{
+ await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal((await f.stub.snapshot()).some(([k])=>k==='afw.finite-initial-preparation.v1:entry'),false);assert.equal(f.uploads.length,0);
+}));
+test('B2a baseline mismatch never adopts pointer or dispatches upload',()=>using('baseline-drift',async f=>{
+ await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'send'),false);
+}));
+for(const fault of ['lost-http-ack','ack-baseline','ack-qa','ack-latest','ack-invalid','wrong-uploaded-module','qa-uploaded-module','literal-secret','new-resource','new-class','new-migration','enabled-cache','pointer-drift'])test('B2a '+fault+' preserves unknown/orphan without receipt, second POST or activation',()=>using(fault,async f=>{
+ await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);const rows=await f.stub.snapshot();
+ assert.equal(has(rows,'send'),true);assert.equal(has(rows,'receipt'),false);assert.equal(JSON.stringify(rows).includes('SYNTHETIC_SHOULD_NEVER_PERSIST'),false);
+ assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);
+ assert.equal(f.requests.some(u=>u.includes('/deployments')&&!u.endsWith('?per_page=1')),false);
+}));
+for(const fault of ['held-http','held-body'])test('B2a retained underlying '+fault+' cannot publish late ACK',()=>using(fault,async f=>{
+ await f.stub.configure('normal');const operation=f.stub.invoke(f.refs);
+ let held=false;for(let i=0;i<150;i++){if(f.held){held=true;break;}await new Promise(resolve=>setTimeout(resolve,20));}assert.equal(held,true);
+ assert.equal((await operation).status,'admin_pending');assert.equal(f.uploads.length,1);f.release();await new Promise(resolve=>setTimeout(resolve,50));
+ assert.equal(has(await f.stub.snapshot(),'ack'),false);assert.equal(has(await f.stub.snapshot(),'receipt'),false);assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,1);
+}));
+
+for(const mode of ['baseline-secret','baseline-new-resource','baseline-unknown','baseline-cache','baseline-module','publisher-revoked-before-send'])test('B2a fresh pre-send '+mode+' never dispatches or persists secret values',()=>using(mode,async f=>{
+ await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'send'),false);
+ assert.equal(JSON.stringify(await f.stub.snapshot()).includes('SYNTHETIC_SHOULD_NEVER_PERSIST'),false);
+}));
+test('B2a upload-config-tamper invalidates actual private baseline preservation before SEND',()=>using('normal',async f=>{
+ await f.stub.configure('upload-config-tamper');assert.equal((await f.stub.invoke(f.refs)).status,'admin_pending');assert.equal(f.uploads.length,0);assert.equal(has(await f.stub.snapshot(),'send'),false);
+}));

~~~~~~~~~~

## test/mcp-qa-finite-initial-upload-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-upload-records.test.mjs b/test/mcp-qa-finite-initial-upload-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-upload-records.test.mjs
@@ -0,0 +1,25 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {sealFiniteInitialUploadRecord as seal,encodeFiniteInitialUploadRecord as encode,decodeFiniteInitialUploadRecord as decode} from '../lib/mcp-qa-finite-initial-upload-records.mjs';
+const sha=x=>createHash('sha256').update(x).digest('hex');
+test('B2a bounded chunk codec reconstructs exact bytes and rejects tampered framing/hash',()=>{
+ const bytes=Buffer.from('private baseline bytes'),v=seal('Chunk',{manifestHash:'a'.repeat(64),index:0,bytes:bytes.length,sha256:sha(bytes),content:bytes.toString('base64')}),raw=encode('Chunk',v);
+ assert.equal(Buffer.from(decode('Chunk',raw).content,'base64').equals(bytes),true);
+ for(const changed of [raw+' ',raw.replace('cHJp','AAAA'),raw.replace('"index":0','"index":1'),raw.replace('"purpose":','"unexpected":true,"purpose":')])assert.throws(()=>decode('Chunk',changed),/unavailable/);
+});
+test('B2a chunk codec rejects getter/prototype/unknown fields and oversize native values',()=>{
+ const input={manifestHash:'a'.repeat(64),index:0,bytes:1,sha256:sha(Buffer.from([1])),content:'AQ=='};
+ assert.throws(()=>seal('Chunk',{...input,extra:true}),/unavailable/);
+ const getter={...input};Object.defineProperty(getter,'content',{get(){throw Error('getter executed');},enumerable:true});assert.throws(()=>seal('Chunk',getter),/unavailable/);
+ assert.throws(()=>encode('Chunk',Object.assign(Object.create({}),seal('Chunk',input))),/unavailable/);
+ assert.throws(()=>seal('Chunk',{...input,content:'A'.repeat(65537)}),/unavailable/);
+ assert.throws(()=>seal('Chunk',{...input,index:64}),/unavailable/);
+ assert.throws(()=>seal('Chunk',{...input,content:'AQ==\n'}),/unavailable/);
+});
+test('B2a ACK codecs accept only exact factual canonical UUID records, never latest/capability',()=>{
+ const input={sendHash:'a'.repeat(64),uploadedVersionId:'55555555-5555-4555-8555-555555555555',acknowledgedAt:42},v=seal('Ack',input);
+ assert.equal(decode('Ack',encode('Ack',v)).uploadedVersionId,input.uploadedVersionId);
+ for(const id of ['latest','future','55555555-5555-4555-8555-55555555555Z'])assert.throws(()=>seal('Ack',{...input,uploadedVersionId:id}),/unavailable/);
+ assert.throws(()=>seal('Ack',{...input,authorizesEffects:true}),/unavailable/);assert.throws(()=>seal('Activate',input),/unavailable/);
+});

~~~~~~~~~~

## test/mcp-qa-finite-initial-workflows-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-initial-workflows-native.test.mjs b/test/mcp-qa-finite-initial-workflows-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-initial-workflows-native.test.mjs
@@ -0,0 +1,21 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+
+async function using(fn){
+ const f=await initialEntryHarness('normal');
+ try{await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'material_recorded');f.inventoryProbe=true;await fn(f);}
+ finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
+}
+test('initial inventory accepts only its actual active bootstrap instance',()=>using(async f=>{
+ const r=await f.stub.probeInitialInventory();
+ assert.equal(r.currentInitialObserved,true);
+ assert.equal(r.otherWorkflowsTerminal,true);
+ assert.equal(r.authorizesEffects,false);
+ assert.equal(r.operationalReadiness,false);
+ f.inventoryMode='waiting';assert.equal((await f.stub.probeInitialInventory()).currentInitialObserved,true);
+ for(const mode of ['missing','terminal','duplicate','wrong-id','foreign','other-active']){
+  f.inventoryMode=mode;
+  assert.equal((await f.stub.probeInitialInventory()).status,'unavailable',mode);
+ }
+}));

~~~~~~~~~~

## test/mcp-qa-finite-launch-inventory-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-launch-inventory-native.test.mjs b/test/mcp-qa-finite-launch-inventory-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-launch-inventory-native.test.mjs
@@ -0,0 +1,267 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as controlApi from '../lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
+const inventoryApi=await import('../lib/mcp-qa-finite-launch-inventory.mjs').catch(()=>({}));
+test('actual native pin snapshot reads true before-HEAD absence without writes',async()=>{
+ assert.equal(typeof controlApi.readPrivateQaFiniteControlSnapshot,'function');
+ const f=finiteFixture(),o=f.options(controlApi),before=structuredClone([...f.rows]);
+ const parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
+ const s=await controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent});
+ assert.equal(s.state,null);assert.equal(s.prepared,null);assert.equal(s.send,null);assert.equal(s.ack,null);
+ assert.equal(s.control.plan.intentId,f.plan.intentId);assert.match(s.control.controlHash,/^[a-f0-9]{64}$/);
+ assert.deepEqual([...f.rows],before);assert.equal(f.puts,0);assert.equal(f.alarm,null);
+});
+test('default fixed launch context and caller DTO cannot mint absence',async()=>{
+ assert.equal(typeof inventoryApi.createPrivateQaFiniteLaunchInventory,'function');
+ const f=finiteFixture(),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
+ const i=await inventoryApi.createPrivateQaFiniteLaunchInventory({ctx:f.ctx,env:f.env,context:{kind:'never_issued',sourceCoverage:true},parent});
+ assert.equal((await i.observeBeforeCreation()).kind,'unavailable');
+});
+
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {consumePrivateFiniteLaunchInventory} from '../lib/mcp-fixed-terminal-workflows.mjs';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+import {readFile} from 'node:fs/promises';
+const entry=`
+import {DurableObject} from 'cloudflare:workers';
+import * as inventory from './lib/mcp-qa-finite-launch-inventory.mjs';
+import {resolvePrivateQaFiniteLaunchContext} from './lib/mcp-qa-finite-launch-source.mjs';
+import {fixture} from './test/fixtures/finite-launch-native.mjs';
+import {digest} from './test/fixtures/qa-finite-trial.mjs';
+import {createPrivateQaFiniteTrialGuard} from './lib/mcp-qa-finite-trial-guard.mjs';
+import {hashFiniteLaunchRecord} from './lib/mcp-qa-finite-launch-records.mjs';
+import {finiteHash} from './lib/mcp-finite-evidence.mjs';
+import {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from './lib/mcp-qa-finite-trial-control.mjs';
+export class LaunchFixture extends DurableObject{
+ async run(mode){
+  const f=await fixture(this.ctx,this.env),parent=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000});
+  const refs={intentId:f.plan.intentId,sourceRevision:f.plan.source.revision};
+  if(mode==='hydrate-expired'){f.hydrate=async()=>{f.setNow(f.now()+5000);};try{await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});return {bad:true};}catch{return {expired:true,paths:f.paths};}}
+  const context=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});
+  const i=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context,parent});
+  const nativePin=createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision});
+  const snapshot=()=>readPrivateQaFiniteControlSnapshot({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),parent});
+  const before=await snapshot();
+  if(mode==='foreign-head')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{intentId:'foreign'});
+  if(mode==='orphan-guard')await this.ctx.storage.put('afw.qa-finite-guard.v1:'+f.plan.intentId+':state',{purpose:'afw.finite-guard-state.v1',controlHash:before.control.controlHash,deliveries:0,state:'armed',nextAt:f.plan.C0});
+  if(mode==='incomplete')f.incomplete=true;
+  if(mode==='provider-nominal')f.providerNominal='running';
+  if(mode==='provider-expired')f.onRequest=async()=>{f.setNow(f.now()+5000);};
+  if(mode==='snapshot-change')f.onRequest=async()=>{await this.ctx.storage.put('afw.qa-finite-child-create.v1:'+f.plan.intentId+':send',{purpose:'uncertain'});};
+  if(['prelaunch','issued','ack','send-race','prepared-tamper','alarm-tamper','cleanup-started','reconstruct-pending'].includes(mode)){
+   f.launcher=true;const admission=f.primary.admission;
+   f.primary.admission=async()=>{const r=await i.observeBeforeCreation();if(r.kind!=='never_issued')throw Error('inventory unavailable');return admission();};
+   if(mode==='reconstruct-pending')f.primary.finalizer=async()=>{throw Error('lost finalizer');};
+   const control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),readPrimary:f.primary,now:parent.check,timeoutMs:5000});
+   const armed=await control.prepare();
+   if(mode==='reconstruct-pending'){
+    const p2=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000}),c2=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:p2});
+    const i2=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context:c2,parent:p2});return {armed,result:await i2.observeBeforeCreation()};
+   }
+   if(armed.status!=='armed')throw Error('fixture native prepare '+armed.status);
+   const state=await snapshot(),effects=Object.fromEntries(['withdraw','close','seal','canary_restore'].map(k=>[k,{execute:async()=>{throw Error('unused effect');},reconcile:async()=>null}]));
+   const guard=createPrivateQaFiniteTrialGuard({ctx:this.ctx,env:this.env,control,capabilities:{identity:state.control,readPrimary:f.primary.admission,...effects,proof:{read:async()=>{throw Error('unused proof');}}},now:parent.check});
+   const guarded=await guard.arm();if(guarded.status!=='armed')throw Error('fixture native guard '+guarded.status);
+   const claimed=await control.claimEffect('nominal');if(claimed.status!=='issued')throw Error('fixture native claim '+claimed.status);
+   const after=await snapshot(),p=f.plan;
+   const identity={intentId:p.intentId,finitePlanHash:after.control.planHash,controlHash:after.control.controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash:p.bundleHash,nominalClaimHash:digest('afw.qa-finite-trial.v1:effect',claimed.claim)};
+   const prepared={purpose:'afw.qa-finite-launch-prepared.v1',...identity,guardStateHash:finiteHash(after.guard),preparedAt:f.now(),...p.launchPolicy};
+   const prefix='afw.qa-finite-child-create.v1:'+p.intentId+':';
+   await this.ctx.storage.transaction(async tx=>{await tx.put(prefix+'prepared',prepared);});
+   if(mode==='cleanup-started')await control.claimEffect('close');
+   if(mode==='alarm-tamper')await this.ctx.storage.setAlarm(p.C0+1);
+   if(mode==='prepared-tamper')await this.ctx.storage.put(prefix+'prepared',{...prepared,nominalClaimHash:'0'.repeat(64)});
+   if(mode==='prelaunch'||mode==='prepared-tamper'||mode==='alarm-tamper'||mode==='cleanup-started')return {result:await i.observeBeforeCreation(),prepared,claim:claimed.claim};
+   f.setNow(p.launchPolicy.launchAt);
+   const p2=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000}),c2=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:p2});
+   const i2=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context:c2,parent:p2});
+   const send={purpose:'afw.qa-finite-child-create-send.v1',...identity,preparedHash:hashFiniteLaunchRecord(prepared),bindingHash:'8'.repeat(64),issuedAt:f.now(),deadline:p.launchPolicy.lastCreateAt};
+   const appendSend=()=>inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context:c2,parent:p2},async check=>{check();await this.ctx.storage.transaction(async tx=>{check();if(await tx.get(prefix+'send')!==undefined)throw Error('fixture append-only');check();await tx.put(prefix+'send',send);check();});check();});
+   if(mode==='send-race'){
+    let enter,release,once=true;const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
+    f.onRequest=async()=>{if(once){once=false;enter();await held;}};
+    const observation=i2.observeBeforeCreation();await reached;const writing=appendSend();
+    await Promise.resolve();const whileHeld=await this.ctx.storage.get(prefix+'send')??null;
+    release();const observed=await observation;await writing;
+    return {whileHeld,observed,after:await i2.observeBeforeCreation(),stored:await this.ctx.storage.get(prefix+'send')};
+   }
+   await appendSend();
+   if(mode==='ack')await this.ctx.storage.put(prefix+'ack',{purpose:'afw.qa-finite-child-create-ack.v1',intentId:p.intentId,controlHash:identity.controlHash,sendHash:hashFiniteLaunchRecord(send),nominalId:p.workflows.confirmation,acknowledgedAt:f.now()});
+   return {result:await i2.observeBeforeCreation(),prepared,send,claim:claimed.claim};
+  }
+  if(mode==='nested'||mode==='pending'){
+   const original=f.primary.admission;
+   f.primary.admission=async()=>{const observation=await i.observeBeforeCreation();f.observations.push(observation);if(observation.kind!=='never_issued')throw Error('inventory unavailable');return original();};
+   if(mode==='pending')f.primary.finalizer=async()=>{throw Error('lost finalizer');};
+   const control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),readPrimary:f.primary,now:parent.check,timeoutMs:5000});
+   const prepared=await control.prepare();
+   return {prepared,observations:f.observations,after:await snapshot(),paths:f.paths};
+  }
+  if(['active-provider-expired','active-storage-expired','active-snapshot-expired'].includes(mode)){
+   // Distinct original lifetimes: only the first invocation has a narrower end.
+   const shortParent=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+500});
+   const shortContext=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:shortParent});
+   const freshParent=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000});
+   const freshContext=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:freshParent});
+   let enter,release,settled=false,enteredFresh=false,lateEffect=false,unhandled=0;
+   const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
+   const onUnhandled=()=>{unhandled++;};addEventListener('unhandledrejection',onUnhandled);
+   const pause=async()=>{enter();try{await held;}finally{settled=true;}};
+   let first;const originalTransaction=this.ctx.storage.transaction;
+   if(mode!=='active-storage-expired'){
+    if(mode==='active-provider-expired')f.onRequest=pause;
+    else this.ctx.storage.transaction=async fn=>{const result=await originalTransaction.call(this.ctx.storage,fn);await pause();return result;};
+    const observing=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context:shortContext,parent:shortParent});
+    first=observing.observeBeforeCreation();
+   }else{
+    first=inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context:shortContext,parent:shortParent},async check=>{
+     check();await this.ctx.storage.transaction(async tx=>{check();const value=await tx.get('fixture:late-effect');check();return value;}).then(async value=>{await pause();return value;});check();lateEffect=true;await this.ctx.storage.put('fixture:late-effect',true);check();
+    }).then(()=>({kind:'unexpected-success'}),()=>({kind:'unavailable'}));
+   }
+   await reached;
+   const firstResult=await first,settledAtReturn=settled;
+   const fresh=inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context:freshContext,parent:freshParent},async check=>{
+    check();enteredFresh=true;await this.ctx.storage.put('fixture:fresh-entry',true);check();return 'entered';
+   });
+   // Allow queued work to enter if the expired caller incorrectly released it.
+   await new Promise(r=>setTimeout(r,30));const enteredBeforeSettlement=enteredFresh;
+   release();const freshResult=await fresh;this.ctx.storage.transaction=originalTransaction;
+   await new Promise(r=>setTimeout(r,10));removeEventListener('unhandledrejection',onUnhandled);
+   return {firstResult,settledAtReturn,enteredBeforeSettlement,freshResult,settled,lateEffect,lateStored:await this.ctx.storage.get('fixture:late-effect')??null,freshStored:await this.ctx.storage.get('fixture:fresh-entry'),unhandled};
+  }
+  if(mode==='storage-expired'){
+   const storage=this.ctx.storage,original=storage.transaction;let enter,release,once=true;
+   const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
+   storage.transaction=async fn=>{const result=await original.call(storage,fn);if(once){once=false;enter();await held;}return result;};
+   const observing=i.observeBeforeCreation();await reached;f.setNow(f.now()+5000);release();
+   const result=await observing;storage.transaction=original;return {result};
+  }
+  if(mode==='race'||mode==='queue-expired'){
+   let release,entered;const reached=new Promise(r=>{entered=r;}),held=new Promise(r=>{release=r;});let once=true,written=false;
+   f.onRequest=async()=>{if(once){once=false;entered();await held;}};
+   const observing=i.observeBeforeCreation();await reached;
+   const sending=inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context,parent},async()=>{
+    parent.check();written=true;await this.ctx.storage.put('fixture:send-entered',true);parent.check();return true;
+   }).catch(()=>false);
+   await Promise.resolve();const whileHeld=written;
+   if(mode==='queue-expired')f.setNow(f.now()+5000);
+   release();const observation=await observing,send=await sending;
+   return {observation,whileHeld,send,written};
+  }
+  const result=await i.observeBeforeCreation();
+  return {result,before,paths:f.paths,head:await this.ctx.storage.get('afw.qa-finite-trial.v1:head')??null,alarm:await this.ctx.storage.getAlarm()};
+ }
+ async alarm(){}
+}
+export default {async fetch(request,env){const {mode}=await request.json();const stub=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));return Response.json(await stub.run(mode));}};
+`;
+async function native(mode){
+ assert.equal(typeof inventoryApi.createPrivateQaFiniteLaunchInventory,'function');
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'finite-launch-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC external provenance boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-launch-source\.mjs$/},async args=>({contents:"export {resolvePrivateQaFiniteLaunchContext,readPrivateQaFiniteLaunchMaterial} from '../test/fixtures/finite-launch-native.mjs';",loader:'js',resolveDir:args.path.slice(0,args.path.lastIndexOf('/'))}));}}]});
+ const flags=Object.fromEntries(['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'].map(k=>[k,'true']));
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launch-test-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'LaunchFixture',useSQLite:true,uniqueKey:'launch-native-fixture'},AFW_RELEASE_EVENTS_NODE:{className:'LaunchFixture',useSQLite:true,uniqueKey:'launch-native-node'}}}));
+ try{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200,await response.clone().text());return response.json();}finally{await mf.dispose();}
+}
+test('native DO before-HEAD full fixed inventory proves only point-in-time absence',async()=>{
+ const r=await native('before');assert.equal(r.result.kind,'never_issued');assert.equal(r.result.phase,'arm');assert.equal(r.before.state,null);assert.equal(r.head,null);assert.equal(r.alarm,null);assert.equal(r.paths.length,7);
+});
+test('real prepare awaits its own native inventory without control.read reentry',async()=>{
+ const r=await native('nested');assert.equal(r.prepared.status,'armed');assert.equal(r.observations.length,2);assert.ok(r.observations.every(x=>x.kind==='never_issued'));assert.equal(r.after.state.phase,'armed');
+});
+test('same-invocation pending survives factual snapshot but never becomes prepared',async()=>{
+ const r=await native('pending');assert.equal(r.prepared.status,'uncertain');assert.equal(r.after.state.phase,'pending');assert.equal(r.after.prepared,null);
+});
+for(const mode of ['foreign-head','incomplete','provider-nominal','provider-expired','snapshot-change'])test('native inventory denies '+mode,async()=>{assert.equal((await native(mode)).result.kind,'unavailable');});
+test('actual shared coordinator blocks SEND transition until protected consumption',async()=>{
+ const r=await native('race');assert.equal(r.whileHeld,false);assert.equal(r.observation.kind,'never_issued');assert.equal(r.send,true);assert.equal(r.written,true);
+});
+test('queued transition and provider work consume the original parent deadline',async()=>{
+ const r=await native('queue-expired');assert.equal(r.whileHeld,false);assert.equal(r.observation.kind,'unavailable');assert.equal(r.send,false);assert.equal(r.written,false);
+});
+test('source hydration cannot refresh the original parent lifetime',async()=>{
+ const r=await native('hydrate-expired');assert.equal(r.expired,true);assert.deepEqual(r.paths,[]);
+});
+test('default source has no registration or positive authority escape',async()=>{
+ const source=await readFile(new URL('../lib/mcp-qa-finite-launch-source.mjs',import.meta.url),'utf8');assert.doesNotMatch(source,/export (?:function|const) (?:install|register)/);
+});
+
+test('copied actual snapshot and fabricated provider DTO cannot mint an absence result',async()=>{
+ const f=finiteFixture(),o=f.options(controlApi),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
+ const snapshot=await controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent});
+ const execution={intentId:f.plan.intentId,controlHash:snapshot.control.controlHash,sourceRevision:f.plan.source.revision,moduleHash:f.plan.source.moduleHash,confirmationId:f.plan.workflows.confirmation,observerId:f.plan.workflows.bootstrap,admissionHash:'e'.repeat(64),launcherId:f.plan.workflows.launcher};
+ const inventory={workflowCount:3,instanceCount:1,instances:[{definition:'06b6c3eb-ce59-4594-8b9e-2636977d56da',id:f.plan.workflows.bootstrap,status:'running'}]};
+ assert.throws(()=>consumePrivateFiniteLaunchInventory({inventory,snapshot,execution,observedAt:f.now()}));
+});
+test('returned point-in-time fact DTO cannot be replayed after coordinator release',async()=>{
+ const r=await native('before');assert.equal(r.result.kind,'never_issued');
+ assert.throws(()=>consumePrivateFiniteLaunchInventory(r.result));
+});
+
+test('actual same-object prepare guard claim and prepared journal qualify prelaunch',async()=>{
+ const r=await native('prelaunch');assert.equal(r.result.kind,'never_issued');assert.equal(r.result.phase,'prelaunch');
+ const {digest}=await import('./fixtures/qa-finite-trial.mjs');assert.equal(r.prepared.nominalClaimHash,digest('afw.qa-finite-trial.v1:effect',r.claim));
+});
+for(const mode of ['issued','ack'])test('durable '+mode+' with provider absence remains issued and unresolved',async()=>{
+ const r=await native(mode);assert.equal(r.result.kind,'issued');assert.equal(r.result.provider,null);assert.match(r.result.sendHash,/^[a-f0-9]{64}$/);assert.equal(Object.hasOwn(r.result,'ackHash'),mode==='ack');
+});
+test('tampered prepared claim linkage cannot qualify prelaunch',async()=>{assert.equal((await native('prepared-tamper')).result.kind,'unavailable');});
+test('reconstructed pending is factual uncertainty, never new arm authority',async()=>{
+ const r=await native('reconstruct-pending');assert.equal(r.armed.status,'uncertain');assert.equal(r.result.kind,'unavailable');
+});
+
+test('actual storage transaction ACK after parent expiry releases no observation',async()=>{assert.equal((await native('storage-expired')).result.kind,'unavailable');});
+test('prelaunch checks the actual sole C0 alarm as well as guard metadata',async()=>{assert.equal((await native('alarm-tamper')).result.kind,'unavailable');});
+
+test('orphan guard without a finite HEAD is not an unspent launch',async()=>{assert.equal((await native('orphan-guard')).result.kind,'unavailable');});
+test('actual cleanup permission claim prevents a new prelaunch observation',async()=>{assert.equal((await native('cleanup-started')).result.kind,'unavailable');});
+
+test('one parent retains narrower absolute ends and rejects reversal, expiry and reuse',()=>{
+ let at=1000;const p=inventoryApi.createPrivateQaFiniteLaunchParent({now:()=>at,deadline:1100});
+ assert.equal(p.deadline,1100);assert.equal(p.check(),1000);at=999;assert.throws(()=>p.check());at=1000;assert.throws(()=>p.check());
+ const q=inventoryApi.createPrivateQaFiniteLaunchParent({now:()=>at,deadline:20000});assert.equal(q.deadline,6000);at=6000;assert.throws(()=>q.check());
+});
+test('snapshot rejects a DTO native pin, orphan ACK and an old missing-policy plan',async()=>{
+ const f=finiteFixture(),o=f.options(controlApi),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
+ const read=changes=>controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent,...changes});
+ await assert.rejects(read({nativePin:{}}));
+ const old=JSON.parse(o.plan);delete old.launchPolicy;await assert.rejects(read({plan:JSON.stringify(old)}));
+ f.rows.set('afw.qa-finite-child-create.v1:'+f.plan.intentId+':ack',{purpose:'afw.qa-finite-child-create-ack.v1',intentId:f.plan.intentId,controlHash:'1'.repeat(64),sendHash:'2'.repeat(64),nominalId:f.plan.workflows.confirmation,acknowledgedAt:f.now()});
+ await assert.rejects(read({}));
+});
+
+test('actual append-only SEND transaction waits for full inventory and synchronous consumption',async()=>{
+ const r=await native('send-race');assert.equal(r.whileHeld,null);assert.equal(r.observed.kind,'never_issued');assert.equal(r.after.kind,'issued');assert.equal(r.stored.purpose,'afw.qa-finite-child-create-send.v1');
+});
+
+for(const boundary of ['provider','storage','snapshot'])test('expired active '+boundary+' callback keeps coordinator until actual settlement',async()=>{
+ const r=await native('active-'+boundary+'-expired');
+ assert.equal(r.firstResult.kind,'unavailable');assert.equal(r.settledAtReturn,false,'caller must fail before held work settles');
+ assert.equal(r.enteredBeforeSettlement,false,'fresh parent must not enter while expired callback is outstanding');
+ assert.equal(r.freshResult,'entered');assert.equal(r.settled,true);assert.equal(r.freshStored,true);
+ assert.equal(r.lateEffect,false);assert.equal(r.lateStored,null);assert.equal(r.unhandled,0);
+});
+
+test('finite restoration inventory requires actual terminal launcher AND nominal, exact observer only',async()=>{
+ const api=await import('../lib/mcp-fixed-terminal-workflows.mjs');
+ assert.equal(typeof api.readFiniteLaunchTrialAfwWorkflows,'function','finite restoration phase composition must exist');
+ const {finiteLauncherInstanceId}=await import('../lib/mcp-qa-finite-launch-records.mjs');
+ const intentId='phase-fixture',sourceRevision='b'.repeat(40),launcherId=finiteLauncherInstanceId({intentId,sourceRevision}),confirmationId='afw-release-'+'6'.repeat(64),observerId='observer-fixed';
+ const q={intentId,sourceRevision,controlHash:'1'.repeat(64),moduleHash:'2'.repeat(64),admissionHash:'3'.repeat(64),confirmationId,observerId,launcherId};
+ const rows=api.AFW_FIXED_WORKFLOWS.map(s=>({id:s.id,name:s.name,script_name:s.script,class_name:s.className}));
+ async function run(phase,nominal,launcher,observer='running'){
+  const read=async path=>{
+   if(path==='/workflows')return {value:rows,info:{per_page:100,count:3,total_count:3}};
+   const spec=api.AFW_FIXED_WORKFLOWS.find(s=>path.startsWith('/workflows/'+s.name));
+   if(!path.endsWith('/instances'))return {value:rows.find(r=>r.id===spec.id)};
+   const value=spec.className==='PrivateQaNamedConfirmation'?(nominal?[{id:confirmationId,status:nominal,workflow_id:spec.id}]:[]):spec.className==='PrivateQaBootstrap'?[{id:observerId,status:observer,workflow_id:spec.id},...(launcher?[{id:launcherId,status:launcher,workflow_id:spec.id}]:[])]:[];
+   return {value,info:{per_page:100,count:value.length,total_count:value.length}};
+  };
+  return api.readFiniteLaunchTrialAfwWorkflows({read,assertCurrent(){},phase,confirmationId,observerId,launcherId,qualifiedExecution:q});
+ }
+ assert.equal((await run('canary_restore','complete','complete')).phase,'canary_restore');
+ assert.equal((await run('qa_restore','complete','complete','complete')).phase,'qa_restore');
+ for(const phase of ['canary_restore','qa_restore'])for(const [nominal,launcher]of [['complete','running'],['complete','queued'],['complete',null],[null,'complete'],['queued','complete'],['unknown','complete']])await assert.rejects(run(phase,nominal,launcher,'complete'));
+ await assert.rejects(run('qa_restore','complete','complete','running'));
+});

~~~~~~~~~~

## test/mcp-qa-finite-launch-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-launch-native.test.mjs b/test/mcp-qa-finite-launch-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-launch-native.test.mjs
@@ -0,0 +1,175 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+const entry=`
+import {IndependentClosure,PrivateQaNamedConfirmation} from './worker/independent-closure/index.mjs';
+import {fixture,resolvePrivateQaFiniteLaunchContext} from './test/fixtures/finite-launch-operations-native.mjs';
+import {createPrivateQaFiniteLaunchParent,withPrivateQaFiniteLaunchCoordinator} from './lib/mcp-qa-finite-launch-inventory.mjs';
+import {runPrivateQaFiniteLaunchOperation} from './lib/mcp-qa-finite-launch.mjs';
+export {PrivateQaNamedConfirmation};
+export class Native extends IndependentClosure{
+ async run(mode){
+  const methods=['prepareFiniteNominalLaunch','createFiniteNominalChild','readFiniteNominalLaunch'];
+  if(methods.some(k=>typeof this[k]!=='function'))return {missingMount:true};
+  const f=await fixture(this.ctx,this.env);f.setup='completed';f.seed='original';f.launcher=true;
+  Date.now=f.now;
+  const prepareRefs={intentId:f.plan.intentId,sourceRevision:f.plan.source.revision};
+  const prefix='afw.qa-finite-child-create.v1:'+f.plan.intentId+':',controlPrefix='afw.qa-finite-trial.v1:'+f.plan.intentId+':';
+  const originalTx=this.ctx.storage.transaction,originalGet=this.ctx.storage.get,originalCreate=this.env.AFW_QA_NAMED_CONFIRMATION.create;
+  let calls=0,callArgs=null,armedAt=null,enter,release,settled=false;
+  const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
+  this.env.AFW_QA_NAMED_CONFIRMATION.create=async options=>{
+   calls++;callArgs=options;
+   const actual=await originalCreate.call(this.env.AFW_QA_NAMED_CONFIRMATION,options);
+   if(mode==='held-create'){enter();await held;settled=true;}
+   if(mode==='lost-create')throw Error('SYNTHETIC lost create ACK');
+   if(mode==='late-create')f.setNow(f.now()+5000);
+   if(mode==='wrong-create')return {id:'foreign'};
+   return actual;
+  };
+  if(mode==='missing-setup')f.setup=null;
+  if(mode==='unsettled-setup')f.setup='running';
+  if(mode==='altered-seed')f.seed='changed';
+  if(mode==='source-unavailable')f.sourceUnavailable=true;
+  if(mode==='operations-unavailable')f.operationsUnavailable=true;
+  if(mode==='workflow-context'){const parent=createPrivateQaFiniteLaunchParent({deadline:f.now()+5000});return {outcome:await runPrivateQaFiniteLaunchOperation({ctx:{},env:this.env,operation:'prepare',refs:prepareRefs,parent}),calls};}
+  if(mode==='prepare-90000')f.setNow(f.plan.T0+90000);
+  if(mode==='hydrate-expiry')f.hydrate=async()=>{f.setNow(f.now()+5000);};
+  if(mode==='old-head')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{intentId:'old'});
+  if(mode==='prepare-phase-hydration'){f.setNow(f.plan.T0+89900);f.hydrate=async()=>{f.setNow(f.plan.launchPolicy.armAckBy);};}
+  if(mode==='binding-after-await'){const original=f.primary.finalizer;f.primary.finalizer=async()=>{const r=await original();this.env.AFW_QA_NAMED_CONFIRMATION.create=async()=>{throw Error('foreign');};return r;};}
+  if(mode==='invalid-args'){
+   const cases=[[],[prepareRefs,{}],[{...prepareRefs,source:{}}],[{...prepareRefs,operation:'create'}]];
+   const results=[];for(const a of cases){try{await this.prepareFiniteNominalLaunch(...a);results.push(false);}catch{results.push(true);}}
+   return {results,calls};
+  }
+  if(['lost-prepare','lost-prepared','late-prepared','late-guard','late-claim','late-prepared-readback','lost-prepared-reconstruction'].includes(mode)){
+   let seen=0;
+   this.ctx.storage.transaction=async fn=>{
+    const r=await originalTx.call(this.ctx.storage,fn);
+    const state=await originalGet.call(this.ctx.storage,mode==='lost-prepare'?controlPrefix+'control':mode==='late-guard'?'afw.qa-finite-guard.v1:'+f.plan.intentId+':state':mode==='late-claim'?controlPrefix+'effect:nominal':prefix+'prepared');
+    if(state&&(mode!=='lost-prepare'||state.phase==='armed')){
+     if(mode.startsWith('late-')){if(mode!=='late-prepared-readback'||++seen===2)f.setNow(f.now()+5000);}else throw Error('SYNTHETIC unknown transaction ACK');
+    }return r;
+   };
+  }
+  const prepared=await this.prepareFiniteNominalLaunch(prepareRefs);
+  this.ctx.storage.transaction=originalTx;
+  const journal=async()=>({prepared:await this.ctx.storage.get(prefix+'prepared')??null,send:await this.ctx.storage.get(prefix+'send')??null,ack:await this.ctx.storage.get(prefix+'ack')??null,claim:await this.ctx.storage.get(controlPrefix+'effect:nominal')??null,guard:await this.ctx.storage.get('afw.qa-finite-guard.v1:'+f.plan.intentId+':state')??null,alarm:await this.ctx.storage.getAlarm()});
+  if(mode==='lost-prepared-reconstruction'){const s=await journal();f.prepareSuccess=false;f.setNow(f.plan.launchPolicy.launchAt);const created=await this.createFiniteNominalChild({intentId:f.plan.intentId,controlHash:s.prepared.controlHash});return {prepared,created,journal:await journal(),calls};}
+  if(prepared.status!=='prepared'||mode==='prepare')return {prepared,journal:await journal(),calls};
+  armedAt=f.now();f.prepareSuccess=true;
+  const refs={intentId:f.plan.intentId,controlHash:prepared.prepared.controlHash};
+  if(mode==='reprepare')return {prepared,again:await this.prepareFiniteNominalLaunch(prepareRefs),journal:await journal(),calls};
+  f.setNow(f.plan.T0+(mode==='create-149999'?149999:mode==='create-160000'?160000:150000));
+  if(mode==='consent-changed'){const original=f.primary.admission;f.primary.admission=async()=>{const p=await original();p.consent.valid=false;return p;};}
+  if(mode==='readiness-changed')f.primary.finalizer=async()=>{throw Error('SYNTHETIC not READY');};
+  if(['readiness-missing','readiness-stale','readiness-after-await','create-primary-expired'].includes(mode)){
+   const original=f.primary.finalizer;let n=0;f.primary.finalizer=async()=>{
+    const r=await original();n++;if(mode==='readiness-missing')return null;
+    if(mode==='readiness-stale')r.observedAt=f.now()-5001;
+    if(mode==='readiness-after-await'||mode==='create-primary-expired'&&n===2)f.setNow(f.now()+5000);
+    return r;
+   };
+  }
+  if(mode==='prepare-step-failed')f.prepareSuccess=false;
+  if(mode==='sealed')f.sealed=true;
+  if(mode==='withdrawn'){const c=await this.ctx.storage.get(controlPrefix+'control');await this.ctx.storage.put(controlPrefix+'control',{...c,withdrawnAt:f.now()});}
+  if(mode==='pin-changed')this.env.AFW_QA_VERSION={id:'22222222-2222-4222-8222-222222222222'};
+  if(mode.startsWith('current-consent-')){
+   const admission=f.primary.admission,finalizer=f.primary.finalizer;let primaryReads=0,finalizerReads=0,crossed=false;
+   const expiresAt=f.plan.T0+150000+(mode==='current-consent-no-widen'?1000:mode==='current-consent-held-snapshot'?500:100);
+   f.primary.admission=async()=>{const value=await admission();primaryReads++;value.consent.expiresAt=mode==='current-consent-no-widen'?(primaryReads===1?expiresAt:f.plan.N1):(primaryReads===1?f.plan.N1:expiresAt);return value;};
+   f.primary.finalizer=async()=>{const value=await finalizer();finalizerReads++;return value;};
+   this.ctx.storage.transaction=async fn=>{
+    let journalWithSend=false;
+    const result=await originalTx.call(this.ctx.storage,tx=>fn({
+     get:tx.get.bind(tx),put:tx.put.bind(tx),setAlarm:tx.setAlarm.bind(tx),getAlarm:tx.getAlarm.bind(tx),
+     list:async options=>{const rows=await tx.list(options);if(options.prefix==='afw.qa-finite-child-create.v1:'&&rows.has(prefix+'send'))journalWithSend=true;return rows;}
+    }));
+    // SECOND fresh() snapshot, after acknowledged SEND and the second real
+    // readLaunchControl() result. The claim retains its older wider deadline.
+    if(!crossed&&journalWithSend&&finalizerReads===2){
+     crossed=true;f.consentCrossed=true;
+     if(mode==='current-consent-held-snapshot'){enter();await held;settled=true;}
+     f.setNow(expiresAt+1);
+    }
+    return result;
+   };
+  }
+  if(['lost-send','late-send','late-send-readback','late-ack','late-ack-readback'].includes(mode)){
+   let seen=0;
+   this.ctx.storage.transaction=async fn=>{
+    const result=await originalTx.call(this.ctx.storage,fn);
+    if(await originalGet.call(this.ctx.storage,prefix+(mode.startsWith('late-ack')?'ack':'send'))){
+     if(mode.startsWith('late-')){if(!mode.endsWith('readback')||++seen===2)f.setNow(f.now()+5000);}else throw Error('SYNTHETIC lost SEND ACK');
+    }return result;
+   };
+  }
+  if(mode==='duplicate-id'){await originalCreate.call(this.env.AFW_QA_NAMED_CONFIRMATION,{id:f.plan.workflows.confirmation,params:{planHash:f.plan.bundleHash}});f.providerNominal='running';}
+  if(['held-create','held-send','current-consent-held-snapshot'].includes(mode)){
+   if(mode!=='current-consent-held-snapshot')f.hydrate=async()=>{f.setNow(f.now()+4500);f.hydrate=null;};
+   if(mode==='held-send'){let heldOnce=false;this.ctx.storage.transaction=async fn=>{const r=await originalTx.call(this.ctx.storage,fn);if(!heldOnce&&await originalGet.call(this.ctx.storage,prefix+'send')){heldOnce=true;enter();await held;settled=true;}return r;};}
+   const enteredAt=performance.now(),first=this.createFiniteNominalChild(refs);await Promise.race([reached,first.then(r=>{throw Error('did not reach native create '+r.status);})]);const firstResult=await first,settledAtReturn=settled,elapsedAtReturn=performance.now()-enteredAt;
+   const parent=createPrivateQaFiniteLaunchParent({deadline:f.now()+5000}),context=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});
+   let enteredFresh=false;const fresh=withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context,parent},async check=>{check();enteredFresh=true;return true;});
+   await new Promise(r=>setTimeout(r,30));const enteredBeforeSettlement=enteredFresh;release();await fresh;
+   const again=await this.createFiniteNominalChild(refs);return {firstResult,settledAtReturn,elapsedAtReturn,enteredBeforeSettlement,again,journal:await journal(),calls};
+  }
+  const created=await this.createFiniteNominalChild(refs);
+  this.ctx.storage.transaction=originalTx;
+  const before=await journal();
+  const again=await this.createFiniteNominalChild(refs),read=await this.readFiniteNominalLaunch(refs);
+  return {prepared,created,again,read,journal:await journal(),unchanged:JSON.stringify(before)===JSON.stringify(await journal()),calls,callArgs,armedAt,plan:f.plan,consentCrossed:f.consentCrossed??false};
+ }
+}
+export default{async fetch(r,e){const {mode}=await r.json();const s=e.AFW_INDEPENDENT_CLOSURE.get(e.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));try{return Response.json(await s.run(mode));}catch(error){return Response.json({error:String(error)},{status:500});}}};
+`;
+let bundled;
+async function native(mode,synthetic=true){
+ const key=synthetic?'yes':'no';bundled??={};
+ if(!bundled[key])bundled[key]=(await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:synthetic?[{name:'SYNTHETIC C2 source only',setup(b){b.onLoad({filter:/mcp-qa-finite-launch-source\.mjs$/},async args=>({contents:"export {resolvePrivateQaFiniteLaunchContext,readPrivateQaFiniteLaunchMaterial,readPrivateQaFiniteLaunchOperations} from '../test/fixtures/finite-launch-operations-native.mjs';",loader:'js',resolveDir:args.path.slice(0,args.path.lastIndexOf('/'))}));}}]:[]})).outputFiles[0].text;
+ const release=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundled[key],compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(release.map(k=>[k,'true'])),AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launch-operation-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'launch-operation-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'launch-operation-node'}},workflows:{AFW_QA_NAMED_CONFIRMATION:{name:'afw-own-qa-private-confirmation',className:'PrivateQaNamedConfirmation'}}}));
+ try{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(r.status,200,await r.clone().text());const value=await r.json();assert.notEqual(value.missingMount,true,'actual IndependentClosure fixed launch methods must exist');return value;}finally{await mf.dispose();}
+}
+test('actual native prepare arms C0 guard then consumes same-object nominal once',async()=>{
+ const r=await native('prepare');assert.equal(r.prepared.status,'prepared');assert.equal(r.journal.claim.kind,'nominal');assert.equal(r.journal.guard.state,'armed');assert.equal(r.journal.alarm,r.journal.guard.nextAt);assert.equal(r.journal.send,null);assert.equal(r.calls,0);
+});
+test('actual native binding creates exact fixed child once; receipt/read/reconstruction grant no send',async()=>{
+ const r=await native('create');assert.equal(r.created.status,'acknowledged');assert.equal(r.calls,1);assert.deepEqual(r.callArgs,{id:r.plan.workflows.confirmation,params:{planHash:r.plan.bundleHash}});assert.ok(r.journal.send);assert.ok(r.journal.ack);assert.equal(r.unchanged,true);assert.equal(r.again.authorizesEffects,false);assert.equal(r.read.operationalReadiness,false);
+ const identity={accountId:'85d0d5dadac3341a564f22ce885e9eec',bindingName:'AFW_QA_NAMED_CONFIRMATION',className:'PrivateQaNamedConfirmation',definitionName:'afw-own-qa-private-confirmation',qaVersionId:r.plan.deployments.qaLive.versionId,scriptName:'agent-friendly-web-independent-closure-qa',sourceModuleHash:r.plan.source.moduleHash,sourceProfileHash:r.plan.source.profileHash,sourceRevision:r.plan.source.revision};
+ const hash=s=>createHash('sha256').update(s).digest('hex');
+ assert.equal(r.journal.send.bindingHash,hash('afw.finite-native-child-binding.v1\n'+JSON.stringify(Object.fromEntries(Object.keys(identity).sort().map(k=>[k,identity[k]])))));
+ assert.equal(r.journal.prepared.guardStateHash,hash(JSON.stringify(r.journal.guard)));
+ assert.equal(r.journal.prepared.nominalClaimHash,hash('afw.qa-finite-trial.v1:effect\n'+JSON.stringify(r.journal.claim)));
+});
+test('RPC exact arity/fields reject caller source and operation',async()=>{assert.deepEqual((await native('invalid-args')).results,[true,true,true,true]);});
+test('default unqualified C2 denies before storage/effects',async()=>{const r=await native('prepare',false);assert.equal(r.prepared.status,'admin_pending');assert.equal(r.journal.prepared,null);assert.equal(r.journal.claim,null);assert.equal(r.calls,0);});
+for(const mode of ['missing-setup','unsettled-setup','altered-seed','source-unavailable','operations-unavailable','prepare-90000','hydrate-expiry','prepare-phase-hydration','binding-after-await','old-head','lost-prepare','lost-prepared','late-prepared','late-guard','late-claim','late-prepared-readback'])test('prepare denies '+mode,async()=>{const r=await native(mode);assert.equal(r.prepared.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
+test('reconstructed prepare never acquires same-object claim again',async()=>{const r=await native('reprepare');assert.equal(r.again.status,'admin_pending');assert.equal(r.calls,0);});
+for(const mode of ['create-149999','create-160000','consent-changed','readiness-changed','readiness-missing','readiness-stale','readiness-after-await','prepare-step-failed','sealed','withdrawn','pin-changed'])test('create denies '+mode,async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
+for(const mode of ['lost-send','late-send','late-send-readback','create-primary-expired'])test('durable '+mode+' consumes SEND without native invocation/refund',async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.ok(r.journal.send);assert.equal(r.journal.ack,null);assert.equal(r.calls,0);assert.equal(r.unchanged,true);});
+for(const mode of ['lost-create','late-create','wrong-create'])test('one-shot '+mode+' retains unresolved SEND without retry',async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.ok(r.journal.send);assert.equal(r.journal.ack,null);assert.equal(r.calls,1);assert.equal(r.unchanged,true);});
+
+test('preexisting actual native child denies SEND even though Miniflare create returns its existing ID',async()=>{const r=await native('duplicate-id');assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
+test('Workflow context cannot replace actual DO storage context',async()=>{const r=await native('workflow-context');assert.equal(r.outcome.status,'admin_pending');assert.equal(r.calls,0);});
+test('held actual native create retains coordinator after caller expiry against a fresh parent',async()=>{const r=await native('held-create');assert.equal(r.firstResult.status,'admin_pending');assert.equal(r.settledAtReturn,false);assert.equal(r.enteredBeforeSettlement,false);assert.equal(r.calls,1);assert.ok(r.journal.send);assert.equal(r.journal.ack,null);});
+for(const mode of ['late-ack','late-ack-readback'])test('late actual ACK persistence remains factual after '+mode,async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,1);assert.ok(r.journal.send);assert.ok(r.journal.ack);assert.equal(r.unchanged,true);});
+
+test('held actual SEND transaction retains coordinator after caller expiry against fresh parent',async()=>{const r=await native('held-send');assert.equal(r.firstResult.status,'admin_pending');assert.equal(r.settledAtReturn,false);assert.equal(r.enteredBeforeSettlement,false);assert.equal(r.calls,0);assert.ok(r.journal.send);assert.equal(r.journal.ack,null);});
+
+test('lost prepared ACK cannot reconstruct launch from its durable receipt without source step success',async()=>{const r=await native('lost-prepared-reconstruction');assert.equal(r.prepared.status,'admin_pending');assert.equal(r.created.status,'admin_pending');assert.ok(r.journal.prepared);assert.equal(r.journal.send,null);assert.equal(r.calls,0);});
+
+for(const mode of ['current-consent-crossing','current-consent-no-widen'])test('current consent expiry survives second fresh storage await: '+mode,async()=>{
+ const r=await native(mode);assert.equal(r.consentCrossed,true,'cross the independently read current expiry during second fresh snapshot after SEND');
+ assert.equal(r.calls,0,'expired current consent must prevent native create');assert.equal(r.created.status,'admin_pending');
+ assert.ok(r.journal.send);assert.equal(r.journal.ack,null);assert.equal(r.unchanged,true);assert.equal(r.journal.claim.deadline,r.plan.N1,'persisted claim is deliberately wider than current consent');
+});
+test('narrowed current consent timeout retains actual second snapshot work against a fresh parent',async()=>{
+ const r=await native('current-consent-held-snapshot');assert.equal(r.firstResult.status,'admin_pending');assert.equal(r.settledAtReturn,false);assert.ok(r.elapsedAtReturn<2000,'500ms current consent narrows the caller timeout without waiting for original 5s');
+ assert.equal(r.enteredBeforeSettlement,false);assert.equal(r.calls,0);assert.ok(r.journal.send);assert.equal(r.journal.ack,null);
+});

~~~~~~~~~~

## test/mcp-qa-finite-launch-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-launch-records.test.mjs b/test/mcp-qa-finite-launch-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-launch-records.test.mjs
@@ -0,0 +1,64 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+// New source primitives; absence is asserted as RED rather than an import error.
+const api=await import('../lib/mcp-qa-finite-launch-records.mjs').catch(()=>({}));
+const h=(domain,value)=>createHash('sha256').update(domain+'\n'+JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:1)))).digest('hex');
+const T0=1700000000000, sourceRevision='b'.repeat(40), intentId='finite-test-001';
+const launcherId='afw-finite-launch-'+h('afw.finite-launcher.v1',{intentId,sourceRevision});
+const identity={intentId,finitePlanHash:'1'.repeat(64),controlHash:'2'.repeat(64),sourceRevision,qaVersionId:'11111111-1111-4111-8111-111111111111',actorId:'3'.repeat(64),launcherId,nominalId:'afw-release-'+'4'.repeat(64),bundleHash:'4'.repeat(64),nominalClaimHash:'5'.repeat(64)};
+const policy={armAckBy:T0+90000,launchAt:T0+150000,lastCreateAt:T0+160000};
+const prepared={purpose:'afw.qa-finite-launch-prepared.v1',...identity,guardStateHash:'6'.repeat(64),preparedAt:T0+90000,...policy};
+const send={purpose:'afw.qa-finite-child-create-send.v1',...identity,preparedHash:'7'.repeat(64),bindingHash:'8'.repeat(64),issuedAt:policy.launchAt,deadline:policy.lastCreateAt};
+const ack={purpose:'afw.qa-finite-child-create-ack.v1',intentId,controlHash:identity.controlHash,sendHash:'9'.repeat(64),nominalId:identity.nominalId,acknowledgedAt:policy.lastCreateAt-1};
+test('launcher identity uses the exact new domain and canonical key order',()=>{
+ assert.equal(typeof api.finiteLauncherInstanceId,'function');
+ assert.equal(api.finiteLauncherInstanceId({sourceRevision,intentId}),launcherId);
+ assert.throws(()=>api.finiteLauncherInstanceId({intentId,sourceRevision,extra:true}));
+ assert.throws(()=>api.finiteLauncherInstanceId({intentId,sourceRevision:'B'.repeat(40)}));
+});
+test('launch policy is exact original T0 arithmetic with safe dates',()=>{
+ assert.equal(typeof api.validateFiniteLaunchPolicy,'function');
+ assert.deepEqual(api.validateFiniteLaunchPolicy({T0,launchPolicy:policy}),policy);
+ for(const k of Object.keys(policy))for(const value of [policy[k]+1,NaN,Infinity,-1,8640000000000001]){
+  assert.throws(()=>api.validateFiniteLaunchPolicy({T0,launchPolicy:{...policy,[k]:value}}),k);
+ }
+ assert.throws(()=>api.validateFiniteLaunchPolicy({T0,launchPolicy:{...policy,extra:true}}));
+ assert.throws(()=>api.validateFiniteLaunchPolicy({T0:8640000000000000,launchPolicy:policy}));
+});
+for(const [name,value]of [['validateFiniteLaunchPrepared',prepared],['validateFiniteChildCreateSend',send],['validateFiniteChildCreateAck',ack]]){
+ test(name+' validates exact immutable data and canonical purpose hash',()=>{
+  assert.equal(typeof api[name],'function');assert.equal(typeof api.hashFiniteLaunchRecord,'function');
+  const result=api[name](value);assert.deepEqual(result,value);assert.ok(Object.isFrozen(result));
+  assert.equal(api.hashFiniteLaunchRecord(value),h(value.purpose,value));
+  assert.equal(api.hashFiniteLaunchRecord(Object.fromEntries(Object.entries(value).reverse())),h(value.purpose,value));
+  for(const key of Object.keys(value)){const copy={...value};delete copy[key];assert.throws(()=>api[name](copy),key);}
+  assert.throws(()=>api[name]({...value,extra:true}));
+  assert.throws(()=>api[name](Object.create(value)));
+  const getter={...value};Object.defineProperty(getter,'intentId',{enumerable:true,get(){throw Error('getter must not run');}});
+  assert.throws(()=>api[name](getter),/unavailable/);
+  for(const key of Object.keys(value).filter(k=>/Hash$/.test(k)))assert.throws(()=>api[name]({...value,[key]:'G'.repeat(64)}),key);
+  assert.throws(()=>api.hashFiniteLaunchRecord({...value,purpose:'arbitrary'}));
+ });
+}
+test('prepared identity and arm acknowledgement reject altered IDs and timing',()=>{
+ assert.equal(typeof api.validateFiniteLaunchPrepared,'function');
+ for(const change of [{launcherId:'afw-finite-launch-'+'0'.repeat(64)},{nominalId:'afw-release-'+'0'.repeat(64)},{preparedAt:policy.armAckBy+1},{preparedAt:T0-1},{launchAt:policy.launchAt+1},{qaVersionId:'bad'},{sourceRevision:'0'.repeat(64)}])assert.throws(()=>api.validateFiniteLaunchPrepared({...prepared,...change}));
+});
+test('SEND has original half-open create window, distinct from permission claim',()=>{
+ assert.equal(typeof api.validateFiniteChildCreateSend,'function');
+ for(const issuedAt of [policy.launchAt,policy.lastCreateAt-1])assert.equal(api.validateFiniteChildCreateSend({...send,issuedAt}).issuedAt,issuedAt);
+ for(const issuedAt of [policy.launchAt-1,policy.lastCreateAt])assert.throws(()=>api.validateFiniteChildCreateSend({...send,issuedAt}));
+ assert.throws(()=>api.validateFiniteChildCreateSend({...send,purpose:'afw.qa-finite-trial.v1:effect'}));
+});
+test('ACK accepts only safe factual timestamp and exact nominal identity grammar',()=>{
+ assert.equal(typeof api.validateFiniteChildCreateAck,'function');
+ assert.throws(()=>api.validateFiniteChildCreateAck({...ack,acknowledgedAt:NaN}));
+ assert.throws(()=>api.validateFiniteChildCreateAck({...ack,nominalId:launcherId}));
+});
+
+test('record domain lookup excludes inherited property names and UUID coercion',()=>{
+ for(const purpose of ['constructor','toString','__proto__'])assert.throws(()=>api.hashFiniteLaunchRecord({purpose}));
+ const qaVersionId={toString(){throw Error('coercion executed');}};
+ assert.throws(()=>api.validateFiniteLaunchPrepared({...prepared,qaVersionId}),/unavailable/);
+});

~~~~~~~~~~

## test/mcp-qa-finite-launcher-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-launcher-native.test.mjs b/test/mcp-qa-finite-launcher-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-launcher-native.test.mjs
@@ -0,0 +1,64 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+// SYNTHETIC source/primary and accelerated wall clock. Actual exported finite
+// Workflow, DO, SQLite control/guard/journal and native child binding are real.
+const entry=`
+import {IndependentClosure,PrivateQaBootstrap,PrivateQaNamedConfirmation} from './worker/independent-closure/finite.mjs';
+import {fixture} from './test/fixtures/finite-launch-operations-native.mjs';
+const state={};
+export class Native extends IndependentClosure {
+ async seed(mode){
+  const f=await fixture(this.ctx,this.env);state.f=f;state.mode=mode;state.calls={prepare:0,read:0,create:0,sleeps:[],steps:[]};state.cache=new Map();state.replaying=false;
+  f.setup='completed';f.seed='original';f.launcher=true;f.setNow(f.plan.T0+1000);Date.now=f.now;
+  if(mode==='missing-seed')f.seed='missing';
+  return {id:f.plan.workflows.launcher,payload:{operation:'finite_nominal_launcher',intentId:f.plan.intentId,sourceRevision:f.plan.source.revision},plan:f.plan};
+ }
+ async prepareFiniteNominalLaunch(refs){state.calls.prepare++;const r=await super.prepareFiniteNominalLaunch(refs);state.calls.preparedStatus=r.status;if(state.mode==='lost-prepare')throw Error('synthetic lost acknowledgement');return r;}
+ async readFiniteNominalLaunch(refs){state.calls.read++;const r=await super.readFiniteNominalLaunch(refs);state.calls.readStatus=r.status;if(state.mode==='late-readback')state.f.setNow(state.f.plan.launchPolicy.armAckBy+1);return r;}
+ async createFiniteNominalChild(refs){state.calls.create++;const r=await super.createFiniteNominalChild(refs);if(state.mode==='lost-create-response')throw Error('synthetic lost create RPC');return r;}
+ report(){return state.calls;}
+}
+export class Launcher extends PrivateQaBootstrap{
+ async run(event,step){
+  state.calls.workflowName=event.workflowName??null;
+  const adapted={
+   do:async(name,options,fn)=>{state.calls.steps.push({name,options});if(state.replaying&&state.cache.has(name))return structuredClone(state.cache.get(name));const r=await step.do(name,options,fn);state.cache.set(name,structuredClone(r));if(name==='finite-launch-prepare'&&state.mode==='late-step')state.f.setNow(state.f.plan.launchPolicy.armAckBy+1);return r;},
+   sleepUntil:async(name,date)=>{if(state.replaying)return;state.calls.sleeps.push({name,at:date.getTime()});state.f.prepareSuccess=true;state.f.setNow(date.getTime()+(state.mode==='late-wake'?10000:state.mode==='early-wake'?-1:0));if(state.mode==='replay-prepare')throw Error('SYNTHETIC delivery suspended after actual recorded prepare');try{return await step.sleepUntil(name,new Date(new Date().getTime()+25));}catch(error){state.calls.sleepError=String(error);throw error;}}
+  };
+  const first=await super.run(event,adapted);if(['replay','replay-prepare'].includes(state.mode)){state.replaying=true;return super.run(event,adapted);}return first;
+ }
+}
+export {PrivateQaNamedConfirmation};
+export default {async fetch(request,env){const actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));const x=await request.json();return Response.json(x.action==='seed'?await actor.seed(x.mode):await actor.report());}};
+`;
+let code;
+async function native(mode){
+ if(!code)code=(await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-external-provenance',setup(b){b.onResolve({filter:/mcp-qa-finite-launch-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-launch-operations-native.mjs'}));}}]})).outputFiles[0].text;
+ const flags=Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false']));for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])flags[k]='true';
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:code,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launcher-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'launcher-do'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'launcher-node'}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'Launcher'},AFW_QA_NAMED_CONFIRMATION:{name:'afw-own-qa-private-confirmation',className:'PrivateQaNamedConfirmation'}}}));
+ try{
+  const call=async x=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify(x)});assert.equal(r.status,200,await r.clone().text());return r.json();};
+  const seed=await call({action:'seed',mode}),env=await mf.getBindings(),wf=await env.FLOW.create({id:seed.id,params:seed.payload});
+  let r;const end=Date.now()+15000;do{r=await wf.status();if(['complete','errored'].includes(r.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<end);
+  return {status:r,report:await call({action:'report'}),seed};
+ }finally{await mf.dispose();}
+}
+test('actual finite Bootstrap prepares with readback, absolute sleep and one journaled native child',async()=>{
+ const r=await native('success');console.log('finite-native-event-metadata',JSON.stringify({workflowName:r.report.workflowName}));assert.equal(r.status.status,'complete');assert.equal(r.report.prepare,1,'finite source must dispatch launcher');assert.equal(r.report.read,1,JSON.stringify({status:r.status,report:r.report}));assert.equal(r.report.create,1,JSON.stringify(r));
+ assert.deepEqual(r.report.sleeps,[{name:'finite-launch-wait',at:r.seed.plan.launchPolicy.launchAt}]);
+ assert.deepEqual(r.report.steps.map(x=>x.name),['finite-launch-prepare','finite-launch-create']);for(const s of r.report.steps)assert.equal(s.options.retries.limit,0);
+ assert.equal(r.status.output.status,'acknowledged');assert.equal(r.status.output.authorizesEffects,false);
+});
+for(const mode of ['missing-seed','lost-prepare','late-readback','late-step','late-wake','early-wake'])test('actual launcher denies '+mode+' without a child or retry',async()=>{
+ const r=await native(mode);assert.equal(r.status.output?.status,'admin_pending');assert.equal(r.report.create,0);assert.ok(r.report.prepare<=1);
+});
+
+// Replay DELIVERY is synthetic: use unchanged actual native successful outputs.
+test('recorded native successful outputs replay without prepare or native create',async()=>{const r=await native('replay');assert.equal(r.status.output.status,'acknowledged',JSON.stringify(r.report));assert.equal(r.report.prepare,1);assert.equal(r.report.read,1);assert.equal(r.report.create,1);});
+
+test('lost native create RPC acknowledgement terminalizes without retry',async()=>{const r=await native('lost-create-response');assert.equal(r.status.output.status,'admin_pending');assert.equal(r.report.prepare,1);assert.equal(r.report.create,1);});
+
+test('cached successful prepare resumes at original150s and performs only first create',async()=>{const r=await native('replay-prepare');assert.equal(r.status.output.status,'acknowledged',JSON.stringify(r.report));assert.equal(r.report.prepare,1);assert.equal(r.report.read,1);assert.equal(r.report.create,1);});

~~~~~~~~~~

## test/mcp-qa-finite-observer-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-observer-native.test.mjs b/test/mcp-qa-finite-observer-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-observer-native.test.mjs
@@ -0,0 +1,96 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+const entry=`
+import {IndependentClosure,PrivateQaBootstrap} from './worker/independent-closure/index.mjs';
+import {installPrivateQaFiniteMaterialFactory} from './lib/mcp-qa-finite-observer-native.mjs';
+import {installPrivateQaFiniteObserverSource} from './lib/mcp-qa-finite-observer.mjs';
+import {createPrivateQaFiniteTrialNativePin} from './lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFinalizerFixture} from './test/fixtures/finite-finalizer.mjs';
+const fixtures=new Map();
+installPrivateQaFiniteObserverSource('b'.repeat(40));
+installPrivateQaFiniteMaterialFactory(async({ctx,env})=>{
+ const f=fixtures.get(ctx.id.toString());if(!f)throw Error('fixture absent');
+ const p=f.f.plan,controlOptions={storage:ctx.storage,nativePin:createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision}),plan:JSON.stringify(p),readPrimary:{...f.f.primary,effect:async kind=>({purpose:'afw.qa-finite-effect-eligibility.v1',intentId:p.intentId,controlHash:f.preview.controlHash,kind,proofHash:f.output.retained.proofHash,observedAt:Date.now(),eligible:true,evidenceHash:'a'.repeat(64)})},now:Date.now,timeoutMs:5000};
+ return {controlOptions,custody:f.custody,readFinalPrimary:async check=>{
+  check();const row=await env.RELEASE_DB.prepare('SELECT pending, writes FROM held_writer WHERE id = 1').first();check();
+  const observedAt=Date.now();return {primary:{...f.output.primaryReceipt.primary,observedAt},writers:{...f.output.primaryReceipt.writers,knownPending:row.pending,unresolvedRemoteWrites:row.pending,observedAt}};
+ }};
+});
+export class Native extends IndependentClosure{
+ async seed(){
+  const f=await finiteFinalizerFixture({at:Number(this.env.T0),configure:(p,f)=>{p.resources.actorId=this.ctx.id.toString();f.ctx.id={toString:()=>p.resources.actorId};f.env.AFW_INDEPENDENT_CLOSURE={idFromName:()=>({toString:()=>p.resources.actorId})};}});
+  fixtures.set(this.ctx.id.toString(),f);
+  for(const[k,v]of f.f.rows)await this.ctx.storage.put(k,v);
+  await this.ctx.storage.delete('afw.qa-finite-trial.v1:'+f.preview.intentId+':effect:qa_restore');
+  await this.env.RELEASE_DB.exec('CREATE TABLE held_writer (id INTEGER PRIMARY KEY, pending INTEGER, writes INTEGER); INSERT INTO held_writer VALUES (1,0,0);');
+  return {preview:f.preview,instanceId:f.plan.workflows.bootstrap,plan:f.plan};
+ }
+ // Synthetic approved preview/primary authority; actual native dispatcher,
+ // Workflow engine, claim journal and bound D1 are exercised below.
+ previewFiniteTrialMaterial(){return fixtures.get(this.ctx.id.toString()).preview;}
+ async refs(){const f=fixtures.get(this.ctx.id.toString());return {intentId:f.preview.intentId,controlHash:f.preview.controlHash,proofHash:f.output.retained.proofHash};}
+ async hold(){
+  await this.env.RELEASE_DB.prepare('UPDATE held_writer SET pending=1 WHERE id=1').run();
+  const gate=new Promise(resolve=>{this.releaseWrite=resolve;});
+  this.pendingWrite=gate.then(()=>this.env.RELEASE_DB.prepare('UPDATE held_writer SET pending=0,writes=writes+1 WHERE id=1').run());
+  return {held:true};
+ }
+ async release(){this.releaseWrite();await this.pendingWrite;return this.env.RELEASE_DB.prepare('SELECT pending,writes FROM held_writer WHERE id=1').first();}
+}
+export {PrivateQaBootstrap};
+export default {async fetch(request,env){
+ if(request.method!=='POST')return new Response(null,{status:404});
+ const x=await request.json(),actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+ try{
+  if(x.method==='seed')return Response.json(await actor.seed());
+  if(x.method==='refs')return Response.json(await actor.refs());
+  if(x.method==='hold')return Response.json(await actor.hold());
+  if(x.method==='release')return Response.json(await actor.release());
+  if(x.method==='claim')return Response.json(await actor.claimFiniteTrialQaRestore(x.refs));
+  if(x.method==='primary')return Response.json(await actor.readFiniteTrialFinalPrimary(x.refs));
+  return new Response(null,{status:404});
+ }catch(error){return Response.json({error:String(error)},{status:409});}
+}};
+`;
+async function fixture(){
+ const b=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+ const T0=Date.now()-240100,flags=Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false']));
+ for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])flags[k]='true';
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...flags,T0:String(T0),AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-final-primary-native'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'finite-final-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-candidate-native'}},workflows:{FLOW:{name:'finite-observer-test',className:'PrivateQaBootstrap'}}}));
+ try{
+  const env=await mf.getBindings(),call=async(method,refs)=>{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',body:JSON.stringify({method,refs})});const body=await response.json();if(response.status!==200)throw Error(JSON.stringify(body));return body;};
+  const actor={seed:()=>call('seed'),refs:()=>call('refs'),hold:()=>call('hold'),release:()=>call('release'),claimFiniteTrialQaRestore:refs=>call('claim',refs),readFiniteTrialFinalPrimary:refs=>call('primary',refs)};
+  const seed=await actor.seed();return {mf,env,actor,seed};
+ }catch(error){await mf.dispose();throw error;}
+}
+test('actual native Workflow carries one real journal claim then bounded first-primary receipt',{timeout:30000},async()=>{
+ const f=await fixture();
+ try{
+  const wf=await f.env.FLOW.create({id:f.seed.instanceId,params:{operation:'finite_cleanup_observer',intentId:f.seed.preview.intentId,sourceRevision:f.seed.preview.sourceRevision}});
+  let r;const deadline=Date.now()+12000;
+  do{r=await wf.status();if(r.status==='complete'||r.status==='errored')break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<deadline);
+  assert.equal(r.status,'complete');assert.equal(r.output.purpose,'afw.finite-observer-output.v1',JSON.stringify(r.output));
+  assert.equal(r.output.qaClaim.claim.kind,'qa_restore');assert.equal(r.output.primaryReceipt.writers.knownPending,0);
+  await assert.rejects(f.actor.claimFiniteTrialQaRestore(await f.actor.refs()));
+  assert.equal((await (await f.mf.getWorker()).fetch('https://synthetic.invalid')).status,404);
+ }finally{await f.mf.dispose();}
+});
+test('actual held D1 writer after claim blocks terminal evidence while later write can still commit',{timeout:30000},async()=>{
+ const f=await fixture();
+ try{
+  const refs=await f.actor.refs(),claim=await f.actor.claimFiniteTrialQaRestore(refs);assert.equal(claim.claim.kind,'qa_restore');
+  await f.actor.hold();
+  await assert.rejects(f.actor.readFiniteTrialFinalPrimary({...refs,claimHash:claim.claimHash}));
+  let sendClaims=0,posts=0;
+  const result=await createPrivateQaFiniteTrialFinalizer({plan:f.seed.plan,readSnapshot:()=>f.actor.readFiniteTrialFinalPrimary({...refs,claimHash:claim.claimHash}),claim:async()=>{sendClaims++;return 'issued';},deployClosed:async()=>{posts++;},now:Date.now,signal:new AbortController().signal}).run();
+  assert.equal(result.status,'admin_pending');assert.equal(sendClaims,0);assert.equal(posts,0);
+  // This is why empty provider/Workflow state cannot be substituted for a
+  // complete writer fence: the outstanding real D1 operation later commits.
+  assert.deepEqual(await f.actor.release(),{pending:0,writes:1});
+  await assert.rejects(f.actor.claimFiniteTrialQaRestore(refs));
+ }finally{await f.mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-observer.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-observer.test.mjs b/test/mcp-qa-finite-observer.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-observer.test.mjs
@@ -0,0 +1,46 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
+import {runPrivateQaFiniteObserver,installPrivateQaFiniteObserverSource,FINITE_OBSERVER_OPERATION,FINITE_PREVIEW_STEP,FINITE_CLAIM_STEP} from '../lib/mcp-qa-finite-observer.mjs';
+let installed=false;
+async function fixture(){
+ const f=await finiteFinalizerFixture(),v=f.preview;let samples=0,claims=0,finalReads=0,at=v.T0,readyAt=v.C0;
+ const names=[],sleeps=[],options=[];
+ const actor={
+ previewFiniteTrialMaterial:async()=>v,
+ readFiniteTrialCleanupProofHead:async()=>{samples++;return at<readyAt?{status:'not_yet_observed'}:{status:'observed',intentId:v.intentId,controlHash:v.controlHash,proofHash:f.output.retained.proofHash};},
+ readRetainedFiniteCleanupProof:async()=>({status:'observed',record:f.output.retained}),
+ readFiniteTrialCleanupCompletion:async()=>({status:'complete',receipt:f.output.completion}),
+ claimFiniteTrialQaRestore:async()=>{claims++;return f.output.qaClaim;},
+ readFiniteTrialFinalPrimary:async()=>{finalReads++;return {plan:f.plan,receipt:f.output.primaryReceipt};}
+ };
+ const env={AFW_QA_VERSION:{id:v.runtimeVersionId},AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{assert.equal(name,'afw-own-successor-closure-v1');return {toString:()=>v.actorId};},get:()=>actor}};
+ const event={instanceId:f.plan.workflows.bootstrap,payload:{operation:FINITE_OBSERVER_OPERATION,intentId:v.intentId,sourceRevision:v.sourceRevision}};
+ const step={do:async(name,opts,fn)=>{names.push(name);options.push(opts);return fn();},sleepUntil:async(name,date)=>{sleeps.push({name,at:date.getTime()});at=date.getTime();}};
+ return {f,v,env,event,step,actor,names,sleeps,options,now:()=>at,setReady:value=>{readyAt=value;},get samples(){return samples;},get claims(){return claims;},get finalReads(){return finalReads;}};
+}
+test('absent compiled observer source is unavailable before actor access',async()=>{
+ const f=await fixture();assert.equal((await runPrivateQaFiniteObserver(f)).status,'admin_pending');assert.equal(f.samples,0);assert.equal(f.names.length,0);
+ installPrivateQaFiniteObserverSource(f.v.sourceRevision);installed=true;
+});
+test('material first, deterministic observation slots and one separately named journal claim',async()=>{
+ assert.ok(installed);const f=await fixture();f.setReady(f.v.C1-1000);
+ const r=await runPrivateQaFiniteObserver(f);assert.equal(r.purpose,'afw.finite-observer-output.v1');
+ assert.equal(f.names[0],FINITE_PREVIEW_STEP);assert.equal(f.names.at(-2),FINITE_CLAIM_STEP);assert.equal(f.names.at(-1),'finite-final-primary');
+ assert.ok(f.samples>1&&f.samples<=30);assert.ok(f.sleeps.at(-1).at>=f.v.C1-1000);assert.equal(f.claims,1);assert.equal(f.finalReads,1);
+ assert.equal(new Set(f.names).size,f.names.length);assert.ok(f.options.every(x=>x.retries.limit===0));assert.equal(r.provenance.runtimeVersionId,f.v.runtimeVersionId);
+});
+test('absent proof is sampled through original capture window, never forever cached or resealed',async()=>{
+ const f=await fixture();f.setReady(f.v.R1);
+ const r=await runPrivateQaFiniteObserver(f);assert.equal(r.status,'admin_pending');assert.equal(f.samples,30);assert.equal(f.claims,0);assert.ok(f.sleeps.at(-1).at>f.v.C1);
+});
+for(const mode of ['wrong-source','wrong-instance','extra-selector','claim-lost','claim-existing','primary-writer'])test('observer closes for '+mode,async()=>{
+ const f=await fixture();
+ if(mode==='wrong-source')f.event.payload.sourceRevision='c'.repeat(40);
+ if(mode==='wrong-instance')f.event.instanceId='replacement';
+ if(mode==='extra-selector')f.event.payload.actorId=f.v.actorId;
+ if(mode==='claim-lost')f.actor.claimFiniteTrialQaRestore=async()=>{throw Error('lost ACK');};
+ if(mode==='claim-existing')f.actor.claimFiniteTrialQaRestore=async()=>({status:'reconcile_only'});
+ if(mode==='primary-writer')f.actor.readFiniteTrialFinalPrimary=async()=>{throw Error('held D1 writer');};
+ const r=await runPrivateQaFiniteObserver(f);assert.equal(r.status,'admin_pending');
+});

~~~~~~~~~~

## test/mcp-qa-finite-owner-context.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-owner-context.test.mjs b/test/mcp-qa-finite-owner-context.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-owner-context.test.mjs
@@ -0,0 +1,56 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {createFiniteOwnerPreparationStore} from '../lib/mcp-qa-finite-preparation-store.mjs';
+import * as preparation from '../lib/mcp-qa-finite-owner-preparation.mjs';
+import {native} from './fixtures/finite-owner-native.mjs';
+test('private original context has a distinct internal continuation; ordinary arguments cannot select it',async()=>{
+ assert.equal(typeof preparation.continuePrivateQaFiniteOwnerChoice,'function','fixed private original-context continuation is missing');
+ let called=0;const parent=preparation.createFiniteOwnerRequestLease(new Request('https://example.invalid'));
+ try{await assert.rejects(preparation.prepareFiniteOwnerChoice({ctx:{},env:{},request:new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare')},parent.lease,()=>{called++;}));assert.equal(called,0);}
+ finally{parent.finish();}
+});
+test('genuine one-use consumed admission permits same ambient owner factual borrow and retains actual held read',async t=>{
+ const f=await native(t),screen=await f.screen(),shortToken=await f.jwt('owner','finite-owner','5s');
+ const r=await f.json('/fixture/owner-borrow',{probeExpiry:true,headers:{'Cf-Access-Jwt-Assertion':shortToken,Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
+ try{
+  assert.equal(r.replayDenied,true);assert.equal(r.borrowed,true,'same genuine adopted owner entry cannot borrow factual work');
+  assert.deepEqual(r.denied,{foreign:true,clone:true,ctx:true,storage:true,db:true,admissionExpiry:true});
+  assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,false);
+ }finally{await f.json('/fixture/request-release',{});}
+ await new Promise(resolve=>setTimeout(resolve,30));
+ assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
+});
+
+const source=()=>{const at=Date.now(),hex='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111';return {sourceRevision:'b'.repeat(40),actorId:hex,qaNamespaceId:'c'.repeat(32),qaVersionId:uuid,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'SYN',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',project:{projectId:'SYN',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:hex,sourceRevision:'d'.repeat(40),originalContextHash:hex},initialBaseline:{versionId:uuid,deploymentId:uuid,moduleHash:hex,configurationHash:hex,bindingsHash:hex},currentPublication:{stage:null,versionId:uuid,deploymentId:uuid,receiptHash:null},window:{startedAt:at-10,expiresAt:at+60000}};};
+test('private envelope rejects accessor/extra/inner drift and capsule or selector drift before identity I/O',async()=>{
+ for(const mode of ['accessor','extra','inner','hash-drift','selector-drift','source-drift']){
+  let calls=0,getters=0;const initial=source(),ctx={id:{toString:()=>initial.actorId},storage:{transaction(){throw Error('unexpected storage');}}},env={RELEASE_DB:{withSession(){throw Error('unexpected DB');}},AFW_QA_VERSION:{id:initial.qaVersionId}};
+  const request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'),parent=preparation.createFiniteOwnerRequestLease(request);
+  try{await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,()=>{
+   calls++;const value={source:structuredClone(initial),preconnectionId:'e'.repeat(64),capsuleHash:'f'.repeat(64)};
+   if(mode==='accessor')Object.defineProperty(value,'source',{get(){getters++;return initial;}});
+   if(mode==='extra')value.extra=true;if(mode==='inner')value.source.extra=true;
+   if(calls>1){if(mode==='hash-drift')value.capsuleHash='1'.repeat(64);if(mode==='selector-drift')value.preconnectionId='2'.repeat(64);if(mode==='source-drift')value.source.goal='content';}
+   return value;
+  }));assert.equal(getters,0);assert.equal(calls,mode.endsWith('drift')?2:1,mode);}finally{parent.finish();}
+ }
+});
+
+test('requested ticket selector cannot substitute for exact original A envelope',async()=>{
+ const initial=source(),map=new Map(),storage={get:async key=>map.get(key),put:async(key,value)=>map.set(key,value),async transaction(fn){return fn(this);}};
+ const ctx={storage,id:{toString:()=>initial.actorId}},env={RELEASE_DB:{withSession(){throw Error('unexpected primary');}},AFW_QA_VERSION:{id:initial.qaVersionId}};
+ const handle='1'.repeat(64),ticketHash=createHash('sha256').update(handle).digest('hex'),request=new Request(initial.origin+'/connections/finite-prepare',{headers:{Cookie:'__Host-afw-finite-prepare='+handle}}),parent=preparation.createFiniteOwnerRequestLease(request);
+ const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash:'2'.repeat(64),sourceRevision:initial.sourceRevision,projectRef:'3'.repeat(64),connectionRef:null,preconnectionId:'4'.repeat(64),action:'connection',createdAt:Date.now()-1,expiresAt:Date.now()+30000};
+ try{
+  assert.equal((await createFiniteOwnerPreparationStore({storage,now:Date.now}).putTicket(ticket,parent.lease)).status,'recorded');
+  let requested;
+  await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,(child,id)=>{child.assertCurrent();requested=id;return {source:initial,preconnectionId:'5'.repeat(64),capsuleHash:'6'.repeat(64)};}));
+  assert.equal(requested,ticket.preconnectionId);assert.equal(map.size,1);
+ }finally{parent.finish();}
+});
+test('private continuation rejects positive POST before any factual reader invocation',async()=>{
+ let calls=0;const request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{method:'POST'}),parent=preparation.createFiniteOwnerRequestLease(request);
+ try{await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx:{},env:{},request},parent.lease,()=>{calls++;}));assert.equal(calls,0);}
+ finally{parent.finish();}
+});

~~~~~~~~~~
