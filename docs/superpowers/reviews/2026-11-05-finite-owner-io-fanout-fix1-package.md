# Fanout fix round1 — scoped re-review package

FIX_BASE previousreviewedHEAD ae39d1b220614498856160a3b2de994c58544110
HEAD 90bb28b59e638173a6a3d211e71f2d40879631c3
Fixcode59d6852539b59bc3430f41c7455ca36be223955d/tree480a8b61276489645f565fd54d19d07eeeab8883. Rootverified59d→90bbdelivery onlyreportappend/ownqualifierremoval. Productsourceunchanged. COMPLETE3file/3commitFIX_BASEdiff below, recomputedU10fromexactold/currentcontents. Previousfulltaskreviewalreadyperformed; onlyImportantpendingbranchfinding/fixdiffbelonghere.

## Commits
- 7ac10c3f69eb69d56f097219c199670b9cf4958d test(afw): expose pending-branch drift gap at old joined-result barrier
- 59d6852539b59bc3430f41c7455ca36be223955d test(afw): gate pending M branch before the original mutated fact read
- 90bb28b59e638173a6a3d211e71f2d40879631c3 docs(afw): append fix1 pending-branch evidence and remove scoped qualifier

## Stat
- docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md +52/-0
- test/fixtures/finite-owner-io-fanout.mjs +8/-6
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs +29/-2

## Full scoped diff

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md b/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md
--- a/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md
+++ b/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md
@@ -139,10 +139,62 @@
 |lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
 |package-lock.json|36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b|
 |wrangler.independent-closure-qa.finite.jsonc|31c6638c204b631c846a537cbec13b3f9b24e060|
 |wrangler.mcp-own.finite.jsonc|87d3f78c62d373c1f18803da7dc6a4e300caddbf|
 
 Changed product blob85c7105f906b5d7936b4bd205c1f4598f5521546; new I/O fixture8dbbdc542d52078de083d4828d1335ed1bae6254; final suite61aba9c1298f2999dd588f35011502e555df5072; exceptional phase fixturef1ddbfff29b1d5e4da4dbf70c649e0df20582b46. Tree comparison finds only the six authorized source/test files plus the own temporary qualifier before final delivery.
 
 The product ceiling2026-11-03T02:59:00Z stays expired. Initial fixture-only approval/custody/JWKS/provider/ledger/module/history substitutions are SYN; actual SDK crypto, journals, native KV/DO/D1 and original SDK positive execute. The new I/O positives keep actual JS/SQL clocks; existing adjacent historical fixtures explicitly retain their previously accepted SYN time projections, not real-provider operation.
 
 operationalReadiness=false; completePackage=false; PCoff=false. No alias installation, mounted graph, real credentials, runtime/provider timing, Entry/cleanup/notice/subscription/consumer availability or PC-off acceptance follows from these tests. The narrow five-second margin, captured-count uncertainty at the killed process, RPC warnings and staged-head coverage remain explicit limitations. ROOT owns the full actual BASE diff and fresh independent spec/quality review before any next decision.
+
+
+## Fix round 1/5 — actual pending-branch drift (5 November 2026)
+
+FIX_BASE / previous reviewed HEAD: ae39d1b220614498856160a3b2de994c58544110. Same source writer, no subagents/reviewer. Independent reviewer review_owner_io_fanout found product structure Pass but SpecIssues/Needsfixes: the old before-join barrier was injected AFTER awaited Promise.allSettled([qaWork,mWork]). ROOT authorized only fixture/native-case/report changes and an own temporary scoped qualifier. Product scheduling, source guards, clocks, permissions and deferred minor cleanup were outside this round.
+
+This append CORRECTS the earlier report's before-join claim: those four existing drift cases changed state after both branches had settled, before joined results were consumed. They were useful post-join coverage, not evidence of drift with a branch pending. The historical report above remains unchanged for provenance; this append supersedes that characterization.
+
+Fix code/test head: 59d6852539b59bc3430f41c7455ca36be223955d; tree 480a8b61276489645f565fd54d19d07eeeab8883. Final report containing commit/tree are in the CAS delivery receipt; final delivery only appends this text and removes the own qualifier. Before CAS, branch ref readback matched the expected head. Final product blob remains 85c7105f906b5d7936b4bd205c1f4598f5521546, exactly unchanged from FIX_BASE. Fixed I/O fixture blob 900172e1dd24662c354c0d3d48d4ed28a86c3a52; native test blob fb645efe76fd007e64aed1c485ac98834ba7b729.
+
+Only these code/test files changed against FIX_BASE:
+- test/fixtures/finite-owner-io-fanout.mjs
+- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+
+The fixture observes the original fixed QA/M branch promises entering pending state and reaching their actual helper-promise finalizers. Exact-one instrumentation markers fail closed. It records whether each original request callback has actually invoked fetch. It does not substitute source/result/DTO, query an additional authority, wrap SDK/KV, change a grant or export a capability.
+
+The new selected before-join gate is inside the retained original request callback, before the original fetch is invoked. It applies only to the explicitly selected category in snapshot 1:
+- Owner/pointer: M deployment request, before that branch obtains the pointer or reaches its later original owned-project SELECT.
+- Module/configuration: current M version request, before the original metadata fetch observes the mutated module/configuration.
+
+A real retained source M branch/helper and its original child callback remain unfinished while the gate is held. The trace's active1 at this gate means that callback is awaiting the test barrier; it does NOT claim an outbound fetch/body is already in flight. Tests explicitly require M=pending, the affected callback entered, fetchStarted=false, outcome=pending, no end marker, snapshot1, and peak≤2 BEFORE performing the native D1 owner mutation or mocked provider pointer/module/configuration mutation. Then they release the barrier and verify denial through the original following checks. No guessed sleep, timer/clock offset, shortened delay, deadline extension or new source read is used.
+
+The old four cases are retained under joined-before-consumption. They now explicitly assert QA=settled, M=settled and active0 at that checkpoint. The eight existing after-first/between-snapshot cases are unchanged and were not rerun. The new four tests own their pending request/barrier cleanup; the existing world() prefix through its finally block is byte-for-byte unchanged. ROOT's deferred minor at the global world cleanup remains deferred and was not mixed into fix1.
+
+### Causal RED and scoped GREEN
+
+| Actual head | Run / job / attempt | Command result | Fixture builds |
+| --- | --- | --- | ---: |
+|7ac10c3f69eb69d56f097219c199670b9cf4958d|42056328272 /127345582052 /1|0P4F0skip, intended pending-state RED at old location; scoped lint clean|8|
+|59d6852539b59bc3430f41c7455ca36be223955d|42056890908 /127347597989 /1|8P0F0skip: four new pending cases +four preserved post-join cases; scoped lint clean|16|
+
+RED retained the old barrier location and added actual branch observation plus the new pending assertion. All four owner/pointer/module/configuration cases failed exactly at “original M branch must still be unfinished at mutation barrier”: expected pending, actual settled. Each recorded QA=settled, M=settled, affected fetchStarted=true, outcome=fulfilled, active0, snapshot1. The failed assertion preceded mutation. Per-test finally released the old gate and awaited/cancelled the original pending response. These were causal coverage REDs, not initialization/observer/source mismatch failures or fabricated product positives.
+
+GREEN kept the same four assertions and mutations, moving only the selected test barrier before the affected fetch; the old post-join barrier was renamed and preserved. All four new mutations recorded QA=settled, M=pending, fetchStarted=false, outcome=pending, active1, snapshot1. After release, each actual request returned503 without form/Location/SDK operation/receipt/issuer SEND/ACK/new grant, the affected fetch had actually started and its cancellation/end markers had settled, both branches were settled, active0, snapshot1, peak2. Thus all four denied at original checks in the first snapshot. No detection after all original checkpoints or atomic-provider-state claim is made.
+
+Exact cloud commands:
+
+~~~sh
+npx eslint test/fixtures/finite-owner-io-fanout.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+timeout 180s node --test --test-concurrency=1 --test-name-pattern="fanout pending branch" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+timeout 180s node --test --test-concurrency=1 --test-name-pattern="fanout pending branch|drift at causal joined-before-consumption" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+~~~
+
+Both Actions jobs use Ubuntu24.04/Node22.23.4, timeout5min, contents:read, checkout persist-credentials:false/fetch-depth1 and npm ci --ignore-scripts --no-audit --no-fund. No secrets, artifact uploads, local clone/dependencies/build/tests or real provider requests. The branch/path-scoped .github/workflows/afw-owner-io-source.yml is removed in final delivery.
+
+Compilation accounting for this round is exact: 4 native worlds ×2 roles=8 actual esbuild calls for RED, 8 worlds ×2=16 for GREEN, total24, all completed; 0 observed compiler failures or esbuild warnings. GREEN's executing component fixture QA is1696356 bytes/320 parsed inputs (first SHA2bc2954c260101eb7c4591703d3f2f4e2366872ef4fe85c198a2c052a46316b1), M110968 bytes/187 inputs/SHAa90fcc6ef797de0218b93de2c166c8f6957c7bdf5468e0280f998b3ef0e0d45a. QA hashes vary with the existing disclosed SYN ceiling. No extra hash-only build or standard compiler was invoked; no production graph/import/mount changed. Cumulative known authored fixture calls become271, with the same possible1 unlogged invocation at the earlier180s cutoff still unresolved.
+
+Warnings retained: RED0 RPC-stub warnings/4 CIMD notices; GREEN8 RPC-stub warnings/8 CIMD notices; npm/action/Node deprecations remain in both bounded logs. Scoped lint has0 errors/warnings, esbuild diagnostics0. The RPC notices are not suppressed and are not physical-drain evidence. There were no additional failure/correction runs in this round.
+
+Prior57 SDK, staged80 phase and65 adjacent coverage remains at its documented heads; this is ONLY the scoped eight-case fix1 qualification. No full57/80/65 suite, 50ms repeat/stress or new standard compile gate was run. The prior132ms empirical margin and earlier one-call accounting uncertainty remain limitations. The deferred minor and full integration checks remain ROOT's final whole-branch list.
+
+DONE_WITH_CONCERNS; ready for the same independent reviewer's scoped re-review, not self-approval. operationalReadiness=false; completePackage=false; PCoff=false. No next unit, runtime, Entry, alias, credential, OAuth/OTP, clock, Max, main or merge action is activated by this append.
~~~

~~~diff
diff --git a/test/fixtures/finite-owner-io-fanout.mjs b/test/fixtures/finite-owner-io-fanout.mjs
--- a/test/fixtures/finite-owner-io-fanout.mjs
+++ b/test/fixtures/finite-owner-io-fanout.mjs
@@ -1,20 +1,21 @@
 // Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
 export function instrumentFiniteOwnerIo(source){
  const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
  const runtime=String.raw`
 const ioState=()=>globalThis.__finiteIo;
+const ioBranch=(name,value)=>{const s=ioState();if(s)s.branches[name]=value;};
 const ioBegin=(path,token,reader,snapshot)=>{
  const s=ioState();if(!s)return null;
  if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
  const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
+ const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending',fetchStarted:false};
- const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending'};
  s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
 };
 const ioResponse=async(response,row)=>{
  const s=ioState();if(!s||!row)return response;
  if(s.fail===row.category){await response.body.cancel();return new Response(null,{status:503,headers:response.headers});}
  if(s.hold!==row.category||s.holdUsed)return response;
  s.holdUsed=true;const bytes=new Uint8Array(await response.arrayBuffer());let pulled=false;
  return new Response(new ReadableStream({
   pull(controller){
    if(pulled){controller.close();return;}pulled=true;s.held={category:row.category,phase:'body'};
@@ -27,58 +28,59 @@
  },{highWaterMark:0}),{status:response.status,headers:response.headers});
 };
 const ioCheckpoint=async name=>{
  const s=ioState();if(!s||s.checkpoint!==name||s.snapshots!==1)return;
  s.checkpointHeld=name;await new Promise(resolve=>{s.releaseCheckpoint=()=>{s.releaseCheckpoint=null;s.checkpointHeld=null;resolve();};if(s.autoRelease)s.releaseCheckpoint();});
 };
 const ioEnd=row=>{if(!row)return;row.endedAt=Date.now();row.endMono=performance.now();ioState().active--;};
 `;
  once("const CF='https://api.cloudflare.com",runtime+"\nconst CF='https://api.cloudflare.com");
  once("const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;","let ioSnapshot=0;\n   const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io=ioBegin(path,token,reader,ioSnapshot);let response,stream;");
+ once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","if(io&&ioState().pendingCategory===io.category&&ioState().snapshots===1)await ioCheckpoint('before-join');if(io)io.fetchStarted=true;response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
- once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
  once("if(length!==null&&Number(length)!==size)fail();","if(io)io.bytes=size;if(length!==null&&Number(length)!==size)fail();");
  once("return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};","const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));if(io)io.outcome='fulfilled';return {value,date};");
  once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
+ once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;if(ioState())ioState().branches={qa:'not-started',m:'not-started'};await credentials();");
- once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;await credentials();");
  once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
  once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
  once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();if(ioState())ioState().same={child:consumptionChild===l,store:consumptionStore===store};");
  once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","onAbort=()=>{if(ioState())ioState().parentAborted=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
+ once("const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));","const qaWork=retain(Promise.resolve().then(()=>{ioBranch('qa','pending');return readQaPrimary();}).finally(()=>ioBranch('qa','settled'))),mWork=retain(Promise.resolve().then(()=>{ioBranch('m','pending');return readMPrimary();}).finally(()=>ioBranch('m','settled')));");
+ once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('joined-before-consumption');");
- once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('before-join');");
  once("const observed=await primary();","const observed=await primary();await ioCheckpoint('after-first');");
  once("const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);","const qualified=await qualify(first,observed);await ioCheckpoint('between');const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);");
  return source;
 }
 export function extendFiniteOwnerIo(entry){
  const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
  return entry.replace(needle,needle+String.raw`
  async ioConfigure(options={}){
   await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
+  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null,pendingCategory:options.pendingCategory??null,branches:{}};
-  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null};
  }
 
  async ioRelease(kind='all'){
   const s=globalThis.__finiteIo;if(!s)return;
   if(kind==='all')s.autoRelease=true;
   if(kind==='all'||kind==='body')s.releaseRead?.();
   if(kind==='all'||kind==='cancel')s.releaseCancel?.();
   if(kind==='all'||kind==='checkpoint')s.releaseCheckpoint?.();
  }
  async ioProbe(){
   const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/retention'));
   try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}
   catch{return {allowed:false};}finally{root.finish();}
  }
  async ioObservation(){
   const s=globalThis.__finiteIo;if(!s)return null;
   const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
   let factual=0,preflight=0,writes=0;
   for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
+  return {rows:s.rows,branches:s.branches,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
-  return {rows:s.rows,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
  }
 `);
 }
 export async function delayFiniteOwnerIo(f,req){
  if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
  const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
  (f.ioWaits??=[]).push(performance.now()-start);
 }
~~~

~~~diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
--- a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+++ b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
@@ -335,30 +335,57 @@
   await ioPhysicalRelease(f);
   assert.equal((await observe(f)).rows.length,0,'no late SDK receipt');
  },{observed:false,io:true}));
 }
 test('fanout sibling beyond original child cannot renew its deadline',{timeout:60000},()=>world(async f=>{
  await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
  await ioDeny(f,await pending);const elapsed=performance.now()-start;assert(elapsed>=4900&&elapsed<15000);
  await ioPhysicalRelease(f);assert.equal((await plain(f.stub.ioObservation())).snapshots,1);
  console.info('fanout native sibling expiry',JSON.stringify({elapsed,renewed:false}));
 },{observed:false,io:true}));
+for(const checkpoint of ['joined-before-consumption','after-first','between'])for(const drift of ['owner','pointer','module','configuration']){
-for(const checkpoint of ['before-join','after-first','between'])for(const drift of ['owner','pointer','module','configuration']){
  test('fanout '+drift+' drift at causal '+checkpoint+' denies at original following checkpoint',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({checkpoint});const pending=f.get();const at=await ioWait(f,s=>s.checkpointHeld===checkpoint);
+  if(checkpoint==='joined-before-consumption'){assert.deepEqual(at.branches,{qa:'settled',m:'settled'});assert.equal(at.active,0);}
-  await f.stub.ioConfigure({checkpoint});const pending=f.get();await ioWait(f,s=>s.checkpointHeld===checkpoint);
   if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();
   if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
   if(drift==='module')f.phaseFault='module';
   if(drift==='configuration')f.phaseFault='configuration';
   await f.stub.ioRelease('checkpoint');await ioDeny(f,await pending);
   const s=await ioWait(f,s=>s.active===0);assert(s.snapshots<=2);assert(s.peak<=2);
  },{observed:false,io:true}));
 }
 
 test('fanout completed sibling cannot hide live holder replacement',{timeout:60000},()=>world(async f=>{
  await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();
  await ioWait(f,s=>s.held?.phase==='body'&&s.rows.some(r=>r.category==='verify-reader'&&r.outcome==='fulfilled'));
  await f.stub.sdkReplaceHolder();await f.stub.ioRelease('body');
  await ioWait(f,s=>s.held?.phase==='cancel');assert(performance.now()-start<4500,'replacement precedes original child expiry');
  await f.stub.ioRelease('cancel');await ioDeny(f,await pending);
  const s=await ioWait(f,s=>s.active===0);assert.equal(s.snapshots,1);assert.equal(s.peak,2);
 },{observed:false,io:true}));
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
~~~

