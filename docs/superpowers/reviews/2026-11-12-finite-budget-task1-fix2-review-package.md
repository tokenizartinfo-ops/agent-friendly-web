# Task1 fix round2 — complete scoped review package

FIX_BASE2 eb3b4f2337b9da2611164df5505f7a0d82b591fa (head previous scoped review saw); FIX_HEAD59d7bb15c01772550c8f38a90d771dba4a5342f5/tree8478646e2cd83968ab8e4678f48bd9a93c8877df. ALL3commits/stat/U10diff; notHEAD~1. Scope R3/newfixbreakage only, prior4findings addressed. No new whole-branch review.

## Commits

855a5ce02cbf81d931310d1a7a2f06f9f8bea0e9 test: expose synchronous noncallable then misclassification without weakening pending promises
54dbf0963bd36c1c4fb8a9dc7275aa75fd69d8d1 fix: settle readable ordinary noncallable then without certifying pending promises
59d7bb15c01772550c8f38a90d771dba4a5342f5 docs: preserve round2 causal evidence and restore exact inactive qualifier

## Stat

docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md +65 -0; before=fbc552b95667f032034c45bceb8147789e6a01b4; after=46de4d04d4d2c3dfc5ddeb9621014a1ec7196388
test/finite-budget-diagnostics.test.mjs +25 -0; before=5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef; after=1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8
test/fixtures/finite-budget-diagnostics.mjs +12 -2; before=2e911fd4e9d2287da687bef9b0389fbec48a5114; after=3aba82b323837f3c14463875d472500d49c0c2e0

## Primary evidence and Root preservation checks

Final Source/main refs verified;0runs on finalinactiveHEAD.3189leaves,3186otherBASEleavesexact; onlyruntime/test/appendreport. TEMP restored exact6f48; evidence/nativeP1/world/descriptors/custody/production/package/SDK/configunchanged. Report prefix exactfbc552b95667f032034c45bceb8147789e6a01b4. Finalcode equalsGREEN3aba82b3/1f8b02d5; testblob identicalRED→GREEN.

RED43152754915/1 job130965578105:8Q/7pass/1causalERR_ASSERTION Q5, pendingPromiseownnullcontrolpassedbefore ordinarysyncassert. GREEN43152967723/1 job130966264204:8/8,0fail/cancel/skip/todo,syntax/linttwochangedmodules/preflight176/130/635/54. Root read actual logs/AFW_PURE/AFW_PREFLIGHT/same-IDrecords, not only jobgreen. ArtifactsRED13913409622/2010B/c3e382812a5f4332a317a1d1111fabd0bb2cafa61202d6554ca282c5a577169c;GREEN13914153379/1546B/0e1119e90083a1474edadd55bcf474de26da301958fd56c5cad289ee4c017de0; firstGET3filesmanifest553Bhashes in appended report below. No other tests/nativequalification/broad/A-B were repeated. ORD-1stillOPEN; currentSource900s/P1pending;readiness/package/PCofffalse.

## Complete verified U10 diff

```diff
diff --git a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
# before_blob=fbc552b95667f032034c45bceb8147789e6a01b4 after_blob=46de4d04d4d2c3dfc5ddeb9621014a1ec7196388
--- a/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
+++ b/docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md
@@ -2652,10 +2652,75 @@
 
 This is YAML syntax/metadata plus exact template-delta verification, NOT GitHub runtime acceptance or a new test result. No test run is needed or was started for these inactive/documentary changes. No Code-U10 component was regenerated or reviewed by the implementer; Root owns the scoped review packet/gate.
 
 ### ORD-1 disclosure and stop boundary
 
 R1 requires the optional entrypoint to load with group absent; the causal final8Q covers that and the other amended behavior. It does not promise universal npm-green. Root keeps ORD-1 OPEN: the725-file ordinary run was incomplete, the36 failed pure tests in four completed files predate THIS round under matched setup, and the three pending native cases remain unclassified. This scope correction does not waive the integration gate or authorize unrelated repairs, and does not claim these failures predate Task1 or identify their cause.
 
 Final delivery intentionally has TEMP PRESENT BUT INACTIVE (3,189leaves if otherwise unchanged), for scoped review BEFORE any activation. Relative to delivered f5, only TEMP plus append-only report differ;3,187other base blobs, including every core/production/dependency blob, remain exact. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Final fulltree/ref/report readbacks and absence of a run on the inactive head are checked at handoff. A later authorized qualification must retire TEMP again.
 
 All five Important findings remain OPEN until reviewer verdict. No new ordinary/A-B/900s/P1 run, inactive activation, subagent/reviewer, PR/main/merge/deploy/Cloudflare/credential/owner action follows from this staging. STOP_WRITES after final readback. operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Task1 fix round2/5 — readable non-callable then vs pending Promise — 2026-11-12 UTC
+
+The [round2 brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d44f99fa91ac8bcfd90203017efc97313302d6f5/docs/superpowers/briefs/2026-11-12-finite-budget-task1-fix-round2.md), blob `3996e7d5edebb718934651887015b67b09489218`, governs this bounded correction. [Scoped fix1 re-review](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d44f99fa91ac8bcfd90203017efc97313302d6f5/docs/superpowers/reviews/2026-11-12-finite-budget-task1-fix1-re-review.es.md), blob `1919850b5208c3df0e32b012b4d843182eade0b9`, marks R1/R2/R4/R5 ADDRESSED; R3 alone remained Important/Needs fixes because a normal synchronous {then:null} stayed pending. This section records implementation evidence, not a reviewer acceptance verdict for R3.
+
+FIX_BASE2 `eb3b4f2337b9da2611164df5505f7a0d82b591fa`, tree `7e63ab6e728d9abd89851b37aad3c49f88efcd2a`,3,189leaves; report prefix `fbc552b95667f032034c45bceb8147789e6a01b4`; inactive TEMP `6f48afaaf998abc9a120410a10cfca27b1afed87`. Scope only runtime/puretest/TEMP/append-only report. Same sole Source writer; Root's independent ORD-1 read-only investigation did not write this Source.
+
+### Causal regression and preservation controls
+
+The new readableNonCallableThen behavior control is appended inside existing Q5, retaining all eight Q identities and all prior assertions. It first exercises a genuine pending Promise with own readable data then:null via runtime.member. Receiver/arg17, original Promise identity and exactly one native call are checked. BEFORE the later failing sync assertion, BASE2 already passes the required preservation: pending/nativeSettled0/active1/incomplete, getter counter0. After releasing/awaiting that actual Promise, unavailable observational settlement remains pending; no artificial fulfillment/rejection or replacement Promise is introduced.
+
+Then five independent real runtime.member return observations evaluate {then:null}, {then:undefined}, {then:false}, {then:0}, and an inherited readable then:null. Each returns its original object with original receiver/argument and one native call. Every value carries a throwing Symbol.toStringTag getter to prove metadata is not invoked. All observations are collected before comparing to literal expected fulfilled/started1/settled1/active0/invalid0/calls1/tagGetter0. The fixed failure marker is `R3 readable non-callable data then settles synchronously`. Existing own-then-accessor pending Promise, ordinary Promise/data-method, synchronous value, error/identity and four accepted fix controls remain unchanged.
+
+[RED43152754915/1, job130965578105](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152754915/job/130965578105):
+- Source `855a5ce02cbf81d931310d1a7a2f06f9f8bea0e9`, tree `d0ec47f300bc5fd22ee430cab1d0b3170456f0d4`.
+- Test `1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8`; TEMP `c4b0b74351a9b3de4e4ee8fc05f6ddbfde3f7b9d`.
+- Runtime read back unchanged BASE2 `2e911fd4e9d2287da687bef9b0389fbec48a5114`.
+- Command `node --test --test-reporter=tap test/finite-budget-diagnostics.test.mjs`: exit1,8tests/7pass/1fail,0cancelled/skipped/todo.
+- Only Q5 fails with ERR_ASSERTION/deepStrictEqual at readableNonCallableThen, line684, on the fixed marker. The ordinary returns are wrongly pending; the genuine pending Promise-own-null preservation control passed first. No import/setup/guard failure or artificial RED for that already-correct Promise behavior was accepted.
+- Causal RED and exact-ID artifact readback were terminal before runtime edits; no repeat was needed.
+
+### Minimal passive classifier and its limit
+
+Root approved the bounded proposal after the expected RED. The repair changes only passiveThen plus captured standard intrinsic references:
+- capture Object.getPrototypeOf, Object.getOwnPropertyDescriptor, Object.hasOwn, Object.prototype and Promise.prototype;
+- retain existing callable-data then behavior and immediately treat an accessor as unobservable;
+- after a readable NON-callable then, inspect only the descriptor/prototype lineage; known Promise.prototype, a higher callable/accessor then, or an unrecognized lineage remains unobservable/incomplete;
+- certify the tested ordinary lineage reaching captured Object.prototype as synchronous when no Promise/hidden callable/accessor evidence occurs.
+
+There is no business-method/Promise-method probe, Object.prototype.toString, Symbol.toStringTag read, then getter read/call, Node util/v8 import, business-object mutation, Promise replacement or extra business I/O. Prototype and descriptor reflection use captured worker-compatible standard intrinsics. The known native Promise with own then:null remains conservatively pending; plain/readable non-callable ordinary values now settle fulfilled.
+
+This is a bounded observational classifier, NOT a universal Promise hidden-slot/brand test. Foreign/ambiguous prototype lineages remain conservative where recognized as such; arbitrary reparented/spoofed/proxy objects cannot receive universal guarantees from passive lineage inspection. The report does not claim cross-realm or nonstandard prototype-mutation coverage. The tested domain is the ordinary data cases and native Promise controls above. Callback receiver trampolines, phase overlay, weak identity/caps, bytes observation and all previously accepted fixes are preserved.
+
+### GREEN and exact compile-only covering checks
+
+[GREEN43152967723/1, job130966264204](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152967723/job/130966264204):
+- Executed Source `54dbf0963bd36c1c4fb8a9dc7275aa75fd69d8d1`, tree `017355bc5e1892d7b14dbc3d12f85014723b719e`.
+- Runtime `3aba82b323837f3c14463875d472500d49c0c2e0`.
+- EXACT unchanged RED test `1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8`.
+- TEMP `5f4bd9261e50c7699aaef73ce6f2aa853495a1d3`.
+- Same8Q command: exit0,8tests/8pass/0fail/cancelled/skipped/todo.
+- node --check and eslint on ONLY the two changed modules (runtime and pure test): PASS.
+- Current source/run/attempt-bound compile-only preflight:176roleinputs,130fixed paths,635selector groups,54unique reader sites; syntax/lint PASS; I0Opened=false/nativeExecutionProduced=false.
+
+The five ordinary cases fulfilled with nativeSettled1/active0/invalid0 and all tag-getter counts0, original identity/this/args/calls preserved. Native Promise-own-null and own-accessor controls both remained pending/incomplete without getters. No normal npm, A/B, recorder controls, custody-nine, historical56, full9/P1, native900s, Miniflare construction or provider probe was run for this correction.
+
+Both jobs were fixed Source/self-path push/attempt1, Node22.23.4/Ubuntu24.04/current lock, <=7minutes, contents:read/actions:read, no secrets/environment or arbitrary input, cancel-in-progress:false. Platform noise remains the reused Node20-actions-forced-to24 warning; actual script Node was22.23.4.
+
+| Evidence | Safe artifact | ZIP bytes | ZIP SHA-256 | Expiry UTC |
+| --- | --- | --- | --- | --- |
+| RED | [13913409622](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152754915/artifacts/13913409622) | 2010 | `c3e382812a5f4332a317a1d1111fabd0bb2cafa61202d6554ca282c5a577169c` | 2026-11-19T04:08:26Z |
+| GREEN | [13914153379](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43152967723/artifacts/13914153379) | 1546 | `0e1119e90083a1474edadd55bcf474de26da301958fd56c5cad289ee4c017de0` | 2026-11-19T04:10:21Z |
+
+Each seven-day artifact contains tests.tap/result.json/budget-artifact.json. Both first exact-ID GETs succeeded; later attempts/waits were skipped. Same-ID source/run/attempt/inventory/content hashes verified. RED553-byte manifest SHA `e6aa7e27f616e02528ab3d53e7065b79a5bff9d65ed7b7cb5f1efb914a682bf5`; GREEN553-byte manifest SHA `8dab991eea0df0ac047e68913d094d64728f7554cc3e6eec2e5d2c8e11003728`.
+
+### Restore, protected proof and stop
+
+After terminal GREEN/readback, restore the EXACT original inactive TEMP blob `6f48afaaf998abc9a120410a10cfca27b1afed87`: manual/noinputs/no push/three false job guards. This reuses the already verified YAML/template bytes; it is not a new activation or qualification. Executed GREEN Source above remains distinct from the final restore/report Source. Final code blobs equal GREEN; no post-test runtime/test edit.
+
+Final full-tree comparison against BASE2 must show only runtime, pure test and this appended report changed; TEMP is exact BASE2 again;3,189leaves/3,186protected blobs exact. Evidence helper `0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9`, native P1 `082340b6ede2a252a8602721ec19063cc68fafc8`, compiler/world/descriptors/custody/production/lib/worker/SDK/package/lock/config/compatibility stay exact BASE2. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Final ref/tree/report/TEMP readbacks and zero runs on the restored inactive head are checked at handoff.
+
+R1/R2/R4/R5 remain addressed by the scoped prior verdict; R3 now has causal RED/GREEN evidence and awaits the ONE scoped re-review of R3/new breakage. ORD-1 independently remains OPEN for integration; no waiver or repair of its36pre-round failures is implied. Current-source native qualification remains pending. No human step was needed/requested; no Source/main force/reset, unrelated edit, runtime/Cloudflare/OAuth/OTP/credential/cron/Container/realconsumer/Max/mail/PR/deploy action occurred. STOP_WRITES after final restore/report readback.
+
+operationalReadiness=false; completePackage=false; PCoff=false.
```

```diff
diff --git a/test/finite-budget-diagnostics.test.mjs b/test/finite-budget-diagnostics.test.mjs
# before_blob=5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef after_blob=1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8
--- a/test/finite-budget-diagnostics.test.mjs
+++ b/test/finite-budget-diagnostics.test.mjs
@@ -224,20 +224,21 @@
  function callback(argument){assert.equal(this,callbackThis);assert.equal(argument,tx);runtime.transactionArgument(argument);}
  const actualTransaction=runtime.run(lease,()=>runtime.member(transactionHolder,'transaction',{operation:'transaction'})(callback));
  assert.equal(actualTransaction,nativeTransaction);assert.equal(received,callback);await actualTransaction;
  let bottom;const outer={get(){bottom=runtime.member(holder,'get',{operation:'get'})(17);return bottom.then(v=>v);}};runtime.facadeHolder(outer,['get']);
  const outerActual=runtime.run(lease,()=>runtime.member(outer,'get',{operation:'get'})());
  assert.notEqual(outerActual,bottom);assert.equal(await outerActual,value);
  const snapshot=runtime.snapshot();assert.equal(snapshot.totals.nativeStarted,4,'outer facade ACK is not a second native row');assert.equal(snapshot.totals.nativeRejected,1);assert.equal(snapshot.coverage.unattributed,0);
 
  await coldFacadeBinding();
  await unobservablePromiseSettlement();
+ await readableNonCallableThen();
 });
 test('Q6 retained record bounds preserve native identity, observed metrics and omission evidence',async()=>{
  const bounded=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1});
  const metaForBound={phase:'setup',deadline:30000,kind:'control'};
  const firstLease={},firstRef=bounded.root(firstLease,metaForBound);
  for(let event=1;event<16385;event++)bounded.root(firstLease,metaForBound);
  const laterRoot=bounded.root({},metaForBound);
  assert(laterRoot,'retention must not drop a legitimate new Root after 16384 collector calls');
  assert.notEqual(laterRoot,firstRef);
 
@@ -651,10 +652,34 @@
   let getters=0,calls=0;Object.defineProperty(item.bytes,'byteLength',{get(){getters++;if(item.throws)throw Error('must not inspect byteLength accessor');return 999;}});
   const value=item.direct?item.bytes:{value:item.bytes,done:false},actual=Promise.resolve(value);
   const reader={read(arg){assert.equal(this,reader);assert.equal(arg,17);calls++;return actual;}},stream={getReader(){return reader;}},response={body:stream};
   const {runtime,child}=memoryScope();
   const returned=runtime.run(child,()=>{runtime.localResponse(response);const nativeReader=runtime.member(runtime.body(response),'getReader',{edge:'reader'})();return runtime.member(nativeReader,'read',{operation:'read',exposedBytes:true})(17);});
   assert.equal(returned,actual);assert.equal(await returned,value);assert.equal(calls,1);
   const s=runtime.snapshot(),row=s.rows[0];observations.push([getters,row.nativeBytesRead,row.status,s.totals.nativeSettled,s.totals.active,s.coverage.invalid]);
  }
  assert.deepEqual(observations,cases.map(c=>[0,c.length,'fulfilled',1,0,0]),'R5 byte lengths bypass own business getters');
 }
+
+async function readableNonCallableThen(){
+ const pendingControl=memoryScope();let release,pendingCalls=0,pendingTags=0;
+ const pending=new Promise(resolve=>{release=resolve;});
+ Object.defineProperty(pending,'then',{value:null});
+ Object.defineProperty(pending,Symbol.toStringTag,{get(){pendingTags++;throw Error('metadata getter forbidden');}});
+ const asyncHolder={get(arg){assert.equal(this,asyncHolder);assert.equal(arg,17);pendingCalls++;return pending;}};pendingControl.runtime.nativeHolder(asyncHolder,'KV');
+ const actual=pendingControl.runtime.run(pendingControl.child,()=>pendingControl.runtime.member(asyncHolder,'get',{operation:'get'})(17));
+ assert.equal(actual,pending);
+ const before=pendingControl.runtime.snapshot();
+ assert.deepEqual([before.rows[0].status,before.totals.nativeSettled,before.totals.active,before.coverage.invalid>0,before.coverage.observedMetricsComplete,pendingCalls,pendingTags],['pending',0,1,true,false,1,0],'R3 pending Promise with own data then null stays unobserved');
+ release('same');assert.equal(await pending,'same');assert.equal(pendingTags,0);
+ const after=pendingControl.runtime.snapshot();assert.equal(after.rows[0].status,'pending');assert.equal(after.totals.nativeSettled,0);assert.equal(after.totals.active,1);
+
+ const inherited=Object.create({then:null}),values=[{then:null},{then:undefined},{then:false},{then:0},inherited],observed=[];
+ for(const value of values){
+  const {runtime,child}=memoryScope();let calls=0,tags=0;
+  Object.defineProperty(value,Symbol.toStringTag,{get(){tags++;throw Error('metadata getter forbidden');}});
+  const holder={get(arg){assert.equal(this,holder);assert.equal(arg,17);calls++;return value;}};runtime.nativeHolder(holder,'KV');
+  const returned=runtime.run(child,()=>runtime.member(holder,'get',{operation:'get'})(17));assert.equal(returned,value);
+  const s=runtime.snapshot();observed.push([s.rows[0].status,s.totals.nativeStarted,s.totals.nativeSettled,s.totals.active,s.coverage.invalid,calls,tags]);
+ }
+ assert.deepEqual(observed,values.map(()=>['fulfilled',1,1,0,0,1,0]),'R3 readable non-callable data then settles synchronously');
+}
```

```diff
diff --git a/test/fixtures/finite-budget-diagnostics.mjs b/test/fixtures/finite-budget-diagnostics.mjs
# before_blob=2e911fd4e9d2287da687bef9b0389fbec48a5114 after_blob=3aba82b323837f3c14463875d472500d49c0c2e0
--- a/test/fixtures/finite-budget-diagnostics.mjs
+++ b/test/fixtures/finite-budget-diagnostics.mjs
@@ -187,24 +187,34 @@
   event();
   if(origin===READER_ORIGIN){
    const buckets=firstOmission?readerAfter:readerBefore;
    increment(buckets,site);firstReaderOrigin??={ordinal:events,relation:relation(),site,context};
   }
   return invalid(reason,true);
  });
  return Object.freeze({root,child,begin,bytes,logical,scopeLogical,cancel,settle,snapshot,incomplete});
 }
 const UNOBSERVABLE_THEN=Symbol('unobservable-then');
+const passivePrototypeOf=Object.getPrototypeOf,passiveDescriptor=Object.getOwnPropertyDescriptor,passiveHasOwn=Object.hasOwn;
+const ordinaryPrototype=Object.prototype,promisePrototype=Promise.prototype;
 function passiveThen(value){
  if(!nativeObject(value))return null;
- for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:UNOBSERVABLE_THEN;}
- return null;
+ let nonCallable=false,ordinary=false;
+ for(let object=value;object!==null;object=passivePrototypeOf(object)){
+  if(nonCallable&&object===promisePrototype)return UNOBSERVABLE_THEN;
+  if(object===ordinaryPrototype)ordinary=true;
+  const descriptor=passiveDescriptor(object,'then');if(!descriptor)continue;
+  if(!passiveHasOwn(descriptor,'value'))return UNOBSERVABLE_THEN;
+  if(typeof descriptor.value==='function')return nonCallable?UNOBSERVABLE_THEN:descriptor.value;
+  nonCallable=true;
+ }
+ return nonCallable&&!ordinary?UNOBSERVABLE_THEN:null;
 }
 export function observeBudgetPromise(collector,opRef,promise){
  try{
   const then=passiveThen(promise);if(typeof then!=='function'){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
   const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
   const next=passiveThen(chain);if(typeof next==='function')Reflect.apply(next,chain,[undefined,()=>{}]);
  }catch{try{collector.settle(opRef,{at:performance.now(),status:null},'promiseThenException');}catch{/* A sensor never changes native output. */}}
  return promise;
 }
 
```

