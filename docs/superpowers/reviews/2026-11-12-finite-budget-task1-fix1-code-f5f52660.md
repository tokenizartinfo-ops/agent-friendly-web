# Task1 fix round1 — four-code-file diff with verified U10 context

FIX_BASE eaf019aa872709d867aac53d9684ecdf1c21d013; code HEAD f5f52660d19ec9fc634bbc49558db75582fdaf88. This component covers only the four code files. The final re-review index will separately provide all fix commits, report append and prepared inactive workflow, binding the same four after-blobs. No scoped re-review is dispatched before that index. Diff generation expands GitHub patch against BOTH complete files, verifies every old/new line and all tail lines, then renders ten surrounding records. Complete Source files remain at the immutable HEAD URLs.

```diff
diff --git a/test/finite-budget-diagnostics.test.mjs b/test/finite-budget-diagnostics.test.mjs
# before_blob=f8745e0b8060e1d67066104690835f7ce25b1504 after_blob=5ae2d79aa657a5bdf71d11c2e764d4fa23f749ef
--- a/test/finite-budget-diagnostics.test.mjs
+++ b/test/finite-budget-diagnostics.test.mjs
@@ -1,24 +1,26 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {readFile,rm} from 'node:fs/promises';
 import {createHash} from 'node:crypto';
+import {spawnSync} from 'node:child_process';
 import {createBudgetDiagnostics,observeBudgetPromise,createBudgetRuntime} from './fixtures/finite-budget-diagnostics.mjs';
 import {persistBudgetEvidence,verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
 const revision='a'.repeat(40);
 const fixture=()=>{const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),r=c.root({},{phase:'authorize_get',deadline:30000,kind:'control'}),child=c.child(r,{},{deadline:5000});return {c,r,child};};
 const begin=(c,r,child,phase='authorize_get',at=0)=>c.begin(r,child,{phase,resourceClass:'KV',operation:'get',at});
 test('Q1 projection redacts secret markers and ignores accessors',()=>{
  const {c,r,child}=fixture();let accessed=false;const metadata={phase:'authorize_get',resourceClass:'KV',operation:'get',at:1,secret:'SECRET_Q1_NEVER_SERIALIZE'};Object.defineProperty(metadata,'url',{get(){accessed=true;throw Error('secret getter');}});
  const op=c.begin(r,child,metadata);c.settle(op,{at:2,status:'fulfilled'});const dto=c.snapshot(),raw=JSON.stringify(dto);
  assert(!raw.includes('SECRET_Q1'));assert(!raw.includes('url'));assert.equal(accessed,false);assert.equal(dto.rows[0].resourceClass,'KV');assert.equal(dto.testRevision,revision);
  const invalid=c.begin(r,child,{phase:'SECRET_Q1',resourceClass:'KV',operation:'get',at:3});assert.equal(invalid,null);assert(c.snapshot().coverage.invalid>0);assert(!JSON.stringify(c.snapshot()).includes('SECRET_Q1'));
+ optionalBudgetDefaultMode();
 });
 test('Q2 one native entry and duplicate settlement retain consistent denominators',async()=>{
  const {c,r,child}=fixture(),op=begin(c,r,child);c.settle(op,{at:10,status:'fulfilled'});c.settle(op,{at:20,status:'rejected'});
  const s=c.snapshot();assert.equal(s.rows.length,1);assert.equal(s.totals.nativeStarted,1);assert.equal(s.totals.nativeSettled,1);assert.equal(s.totals.nativeRejected,0);assert.equal(s.byPhaseResource[0].nativeSettled,1);assert.equal(s.totals.nativeDurationSumMs,10);assert.equal(s.totals.active,0);
  const c2=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),r2=c2.root({},{phase:'mcp_read',deadline:null,kind:'transport'});
  for(const [resourceClass,operation]of [['rateLimiter','limit'],['DO','rpc']]){const ref=c2.begin(r2,null,{phase:'mcp_read',resourceClass,operation,at:0});assert(ref);c2.settle(ref,{at:1,status:'fulfilled'});}
  const typed=c2.snapshot();assert.equal(typed.totals.nativeStarted,2);assert.equal(typed.totals.nativeSettled,2);assert.equal(typed.coverage.unattributed,0);assert.deepEqual(typed.rows.map(r=>[r.resourceClass,r.operation,r.fetchOpOrdinal]),[['rateLimiter','limit',null],['DO','rpc',null]]);
  for(const overlap of [true,false]){
   const probe=createBudgetDiagnostics({testRevision:revision,workerRole:'fixture'}),root=probe.root({},{phase:'setup',deadline:null,kind:'transport'});
   const left=begin(probe,root,null,'setup',7);
@@ -38,20 +40,21 @@
  assert.deepEqual(s.rows.map(v=>[v.rootOrdinal,v.childOrdinal,v.phase,v.settledAt]),[[1,1,'authorize_get',3],[2,null,'monitoring_post',2]]);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,1);assert.equal(s.coverage.unattributed,0);
  const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),one={},two={};let resolveOne,resolveTwo;
  const first=new Promise(resolve=>{resolveOne=resolve;}),second=new Promise(resolve=>{resolveTwo=resolve;}),holder={get(which){return which===1?first:second;}};
  runtime.nativeHolder(holder,'KV');runtime.clock(one,30000);runtime.clock(two,31000);
  assert.equal(runtime.control(one,'authorize_get',{},()=>runtime.member(holder,'get',{operation:'get'})(1)),first);
  assert.equal(runtime.control(two,'monitoring_post',{},()=>runtime.member(holder,'get',{operation:'get'})(2)),second);
  resolveTwo('two');await second;resolveOne('one');await first;
  const rows=runtime.snapshot().rows;assert.deepEqual(rows.map(v=>[v.rootOrdinal,v.phase]),[[1,'authorize_get'],[2,'monitoring_post']]);assert(rows[0].settledAt>=rows[1].settledAt);assert.equal(runtime.snapshot().totals.peak,2);
 
  await coldPhaseReentry();
+ await positiveEpochInventory();
 });
 test('Q4 logical denial and cancellation do not fabricate native settlement',()=>{
  const {c,r,child}=fixture(),op=begin(c,r,child);c.logical(op,{at:5,reason:'timeout'});c.cancel(op,{at:6,stage:'started'});
  let s=c.snapshot();assert.equal(s.totals.logicalDenied,1);assert.equal(s.totals.nativeSettled,0);assert.equal(s.totals.cancelStarted,1);assert.equal(s.totals.cancelSettled,0);assert.equal(s.totals.active,1);
  c.cancel(op,{at:7,stage:'settled'});assert.equal(c.snapshot().totals.nativeSettled,0);c.settle(op,{at:8,status:'rejected'});s=c.snapshot();assert.equal(s.totals.nativeRejected,1);assert.equal(s.rows[0].logicalAt,5);assert.equal(s.rows[0].cancelSettledAt,7);
  const fulfilled=begin(c,r,child,'authorize_get',9);c.settle(fulfilled,{at:10,status:'fulfilled'});
  c.scopeLogical(r,child,{phase:'authorize_get',at:11,reason:'guard'});c.scopeLogical(r,child,{phase:'authorize_get',at:12,reason:'guard'});
  const scoped=c.snapshot();assert.equal(scoped.rows[1].status,'fulfilled');assert.equal(scoped.rows[1].logicalAt,null,'scope failure does not relabel a fulfilled native leaf');assert.equal(scoped.totals.logicalDenied,1,'explicit per-op logical denominator unchanged');assert.equal(scoped.totals.scopeGuardEvents,2);assert.equal(scoped.totals.deniedScopes,1);assert.equal(scoped.logicalScopeEvents.length,2);
  const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),lease={},originalError=Error('not serialized');runtime.clock(lease,30000);
  assert.throws(()=>runtime.control(lease,'authorize_get',{},()=>{throw runtime.guardValue(originalError);}),error=>error===originalError);
@@ -220,20 +223,21 @@
  runtime.nativeHolder(transactionHolder,'DO','storage');
  function callback(argument){assert.equal(this,callbackThis);assert.equal(argument,tx);runtime.transactionArgument(argument);}
  const actualTransaction=runtime.run(lease,()=>runtime.member(transactionHolder,'transaction',{operation:'transaction'})(callback));
  assert.equal(actualTransaction,nativeTransaction);assert.equal(received,callback);await actualTransaction;
  let bottom;const outer={get(){bottom=runtime.member(holder,'get',{operation:'get'})(17);return bottom.then(v=>v);}};runtime.facadeHolder(outer,['get']);
  const outerActual=runtime.run(lease,()=>runtime.member(outer,'get',{operation:'get'})());
  assert.notEqual(outerActual,bottom);assert.equal(await outerActual,value);
  const snapshot=runtime.snapshot();assert.equal(snapshot.totals.nativeStarted,4,'outer facade ACK is not a second native row');assert.equal(snapshot.totals.nativeRejected,1);assert.equal(snapshot.coverage.unattributed,0);
 
  await coldFacadeBinding();
+ await unobservablePromiseSettlement();
 });
 test('Q6 retained record bounds preserve native identity, observed metrics and omission evidence',async()=>{
  const bounded=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1});
  const metaForBound={phase:'setup',deadline:30000,kind:'control'};
  const firstLease={},firstRef=bounded.root(firstLease,metaForBound);
  for(let event=1;event<16385;event++)bounded.root(firstLease,metaForBound);
  const laterRoot=bounded.root({},metaForBound);
  assert(laterRoot,'retention must not drop a legitimate new Root after 16384 collector calls');
  assert.notEqual(laterRoot,firstRef);
 
@@ -353,20 +357,21 @@
  assert.equal(fetchResult,fetchPromise);assert.equal(await fetchResult,ownedResponse);
  const heldReader=ownerRuntime.fixture(()=>ownerRuntime.member(ownerRuntime.body(ownedResponse),'getReader',{edge:'reader',readerSite:45})(argument));
  assert.equal(heldReader,ownedReader);
  const observedRead=ownerRuntime.member(heldReader,'read',{operation:'read',exposedBytes:true})();
  assert.equal(observedRead,readPromise);assert.equal(await observedRead,value);assert.deepEqual([fetches,factories,reads],[1,1,1]);
  const routed=ownerRuntime.snapshot();assert.equal(routed.coverage.invalid,0);assert.equal(routed.coverage.unattributed,0);
  assert.equal(routed.rows.length,2);const [outbound,bodyRead]=routed.rows;
  assert.equal(bodyRead.fetchOpOrdinal,outbound.opOrdinal);assert.equal(bodyRead.rootOrdinal,outbound.rootOrdinal);assert.equal(bodyRead.childOrdinal,outbound.childOrdinal);
  assert.equal(bodyRead.childDeadline,5000);assert.equal(bodyRead.rootDeadline,30000);assert.equal(bodyRead.phase,'authorize_get');assert.equal(bodyRead.resourceClass,'CFversion');
 
+ truncatedPeakConsistency();
 });
 test('Q7 bounded UTF8 summary hashes the exact complete JSON written',async t=>{
  const path='output/finite-budget/q7-evidence.json';t.after(()=>rm(path,{force:true}));const full={purpose:'SYN',payload:'ñ'.repeat(10000),nested:{preserved:true}},before=JSON.stringify(full),result=await persistBudgetEvidence({path,full,testRevision:revision,caseName:'Q7',counts:{tests:1,pass:1,unsafe:'SECRET_Q7'}});
  const bytes=await readFile(path);assert.equal(result.bytes,bytes.length);assert.equal(result.sha256,createHash('sha256').update(bytes).digest('hex'));assert.deepEqual(JSON.parse(bytes),full);assert.equal(JSON.stringify(full),before);assert(Buffer.byteLength(result.summary,'utf8')<=2048);assert(!result.summary.includes('SECRET_Q7'));
  await assert.rejects(persistBudgetEvidence({path:'output/finite-budget/../../escape.json',full,testRevision:revision,caseName:'Q7'}));
 });
 test('Q8 opaque wire bytes and linked body invocations preserve interval and byte denominators',async()=>{
  const {c,r,child}=fixture(),phase='authorize_get',resourceClass='CFversion';
  const fetch=c.begin(r,child,{phase,resourceClass,operation:'fetch',at:0});
  c.settle(fetch,{at:1,status:'fulfilled'});
@@ -400,20 +405,21 @@
   const first=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.deepEqual([...first.value],[1,2,3]);
   const eof=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.equal(eof.done,true);
   await runtime.member(reader,'cancel',{operation:'cancel'})();
  });
  const nativeRows=runtime.snapshot();assert.equal(nativeRows.coverage.unattributed,0);assert.equal(nativeRows.totals.nativeStarted,4);assert.equal(nativeRows.totals.nativeSettled,4);assert.equal(nativeRows.totals.nativeBytesRead,3);assert.deepEqual(nativeRows.rows.map(r=>r.fetchOpOrdinal),[null,1,1,1]);assert.equal(nativeRows.rows[0].nativeBytesRead,null);assert.equal(nativeRows.totals.cancelStarted,1);assert.equal(nativeRows.totals.cancelSettled,1);
 
  assert.equal(verifyCompleteBudgetTrace(nativeRows).level,'complete_trace');
  const wrongLink=structuredClone(nativeRows);wrongLink.rows[1].fetchOpOrdinal=wrongLink.rows[1].opOrdinal;
  assert.throws(()=>verifyObservedBudgetMetrics(wrongLink),/fetch parent/);
 
+ await intrinsicReadBytes();
 });
 
 async function coldSourceExpressions(kind, controls=''){
  const ts=(await import('typescript')).default;
  const {transformBudgetPreparedSource}=await import('./fixtures/finite-budget-world.mjs');
  const [file,pin]=kind==='initial'
   ?['lib/mcp-qa-finite-initial-cleanup.mjs','f0e8a2720987d13d0011c437abd3c5ef7d1452493b3c0e67b5da5d319e474de5']
   :['lib/mcp-qa-finite-owner-cleanup-journal.mjs','e40290e120266cd57bceb6faa5ea3c871ddd8aa00c9d02e98094aaf11dd4c888'];
  const raw=await readFile(file,'utf8');
  assert.equal(createHash('sha256').update(raw).digest('hex'),pin);
@@ -536,10 +542,119 @@
  release(value);assert.equal(await pending,value);await assert.rejects(rejected,e=>e===error);
  const result=runtime.snapshot();
  assert.equal(result.coverage.invalid,0);assert.equal(result.totals.nativeRejected,1);
  assert.deepEqual(result.rows.map(r=>[r.rootOrdinal,r.childOrdinal,r.rootDeadline,r.childDeadline]),[
   [1,1,30000,5000],[1,2,30000,4000],[1,1,30000,5000],[2,null,31000,null],[1,1,30000,5000],[1,1,30000,5000],[1,null,30000,null]]);
  assert.deepEqual(result.rows.map(r=>r.phase),['sdk_lookup','sdk_lookup','sdk_lookup','monitoring_post','sdk_lookup','cleanup_before_restore','cleanup_before_restore'],'cold-C explicit phase same-root reentry');
  const callback=function(){'use strict';return this;};
  const receivers=[runtime.run(child,callback),runtime.run(child,()=>runtime.phase('sdk_lookup',callback)),runtime.run(child,()=>runtime.phase('sdk_lookup',()=>runtime.run(child,callback)))];
  assert.deepEqual(receivers,[undefined,undefined,undefined],'cold-C original strict callback receiver');
 }
+
+function optionalBudgetDefaultMode(){
+ const env={...process.env};delete env.AFW_BUDGET_GROUP;delete env.NODE_TEST_CONTEXT;
+ const run=group=>spawnSync(process.execPath,['test/mcp-qa-finite-budget-native.test.mjs'],{env:group===undefined?env:{...env,AFW_BUDGET_GROUP:group},encoding:'utf8',timeout:30000,maxBuffer:256*1024});
+ const ordinary=run(undefined);
+ assert.equal(ordinary.error,undefined,'bounded default-mode subprocess');
+ if(ordinary.status!==0)assert(ordinary.stderr.includes('SYN budget group unsupported before I0'),'R1 default failure is existing before-I0 group guard');
+ assert.equal(ordinary.status,0,'R1 optional qualification inactive in ordinary command');
+ assert(!/^# Subtest: (?:R0|P1) /m.test(ordinary.stdout),'absent group registers no native qualification');
+ for(const group of ['', 'unknown']){
+  const rejected=run(group);assert.equal(rejected.status,1);assert(rejected.stderr.includes('SYN budget group unsupported before I0'));
+ }
+}
+
+function truncatedPeakConsistency(){
+ const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
+ for(let i=0;i<2;i++){const op=c.begin(r,null,{phase:'setup',resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});}
+ const valid=c.snapshot();assert.equal(valid.retention.operationRows.omitted,1);assert.equal(verifyObservedBudgetMetrics(valid).level,'observed_metrics');
+ assert.deepEqual([valid.totals.peak,valid.totals.scopes[0].peak,valid.byPhaseResource[0].peak],[1,1,1]);
+ const mutations=[
+  s=>{s.totals.scopes[0].peak=2;},
+  s=>{s.byPhaseResource[0].peak=2;},
+  s=>{s.totals.peak=2;}
+ ];
+ const rejected=mutations.map(mutate=>{const sample=structuredClone(valid);mutate(sample);try{verifyObservedBudgetMetrics(sample);return false;}catch(error){assert.equal(error.code,'ERR_ASSERTION');return true;}});
+ const multi=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1}),left=multi.root({},{phase:'setup',deadline:30000,kind:'control'}),right=multi.root({},{phase:'restore',deadline:30000,kind:'control'});
+ for(const [i,root,phase]of [[0,left,'setup'],[1,left,'setup'],[2,right,'restore']]){const op=multi.begin(root,null,{phase,resourceClass:'KV',operation:'get',at:i*2});multi.settle(op,{at:i*2+1,status:'fulfilled'});}
+ const multiple=multi.snapshot();assert.equal(verifyObservedBudgetMetrics(multiple).level,'observed_metrics');assert.deepEqual([multiple.totals.peak,...multiple.totals.scopes.map(s=>s.peak),...multiple.byPhaseResource.map(g=>g.peak)],[1,1,1,1,1]);
+ const impossible=structuredClone(multiple);impossible.totals.peak=3;
+ try{verifyObservedBudgetMetrics(impossible);rejected.push(false);}catch(error){assert.equal(error.code,'ERR_ASSERTION');rejected.push(true);}
+ assert.deepEqual(rejected,[true,true,true,true],'R2 scope group and global peak reconciliation');
+}
+
+async function unobservablePromiseSettlement(){
+ const {runtime,child}=memoryScope();let release,getters=0,calls=0;
+ const pending=new Promise(resolve=>{release=resolve;});
+ Object.defineProperty(pending,'then',{get(){getters++;throw Error('must not inspect then accessor');}});
+ const holder={get(arg){assert.equal(this,holder);assert.equal(arg,17);calls++;return pending;}};runtime.nativeHolder(holder,'KV');
+ const returned=runtime.run(child,()=>runtime.member(holder,'get',{operation:'get'})(17));
+ assert.equal(returned,pending);assert.deepEqual([calls,getters],[1,0]);
+ const s=runtime.snapshot(),observed=[s.rows[0].status,s.totals.nativeSettled,s.totals.active,s.coverage.observedMetricsComplete];
+ release('same');assert.equal(await pending,'same');assert.equal(getters,0);
+ assert.deepEqual(observed,['pending',0,1,false],'R3 uninspectable pending Promise remains unsettled');
+ const after=runtime.snapshot();assert.equal(after.rows[0].status,'pending');assert.equal(after.totals.nativeSettled,0);assert(after.coverage.invalid>0);assert.equal(after.totals.nativeRejected,0);
+ const control=memoryScope(),normal=Promise.resolve('normal'),syncValue={same:true};let controlCalls=0;
+ const native={get(value){assert.equal(this,native);controlCalls++;return value;}};control.runtime.nativeHolder(native,'KV');
+ assert.equal(control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(syncValue)),syncValue);
+ const normalReturned=control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(normal));assert.equal(normalReturned,normal);assert.equal(await normalReturned,'normal');
+ assert.deepEqual([controlCalls,control.runtime.snapshot().totals.nativeSettled,control.runtime.snapshot().totals.active,control.runtime.snapshot().coverage.invalid],[2,2,0,0]);
+ const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),root=c.root({},{phase:'setup',deadline:30000,kind:'control'}),op=begin(c,root,null,'setup',performance.now());
+ assert.equal(observeBudgetPromise(c,op,pending),pending);assert.equal(getters,0);assert.equal(c.snapshot().totals.nativeSettled,0);assert.equal(c.snapshot().totals.active,1);assert(c.snapshot().coverage.invalid>0);
+}
+
+async function positiveEpochInventory(){
+ const ts=(await import('typescript')).default;
+ const evidence=await import('./fixtures/finite-budget-evidence.mjs');
+ const source=await readFile('test/mcp-qa-finite-budget-native.test.mjs','utf8'),ast=ts.createSourceFile('native-test.mjs',source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
+ assert.equal(ast.parseDiagnostics.length,0);
+ const callbacks=[];
+ function visit(node){if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&node.expression.text==='test'&&ts.isStringLiteral(node.arguments[0])&&node.arguments[0].text.startsWith('P1 '))callbacks.push(node.arguments.at(-1));ts.forEachChild(node,visit);}
+ visit(ast);assert.equal(callbacks.length,1);const statements=callbacks[0].body.statements;
+ const first=statements.findIndex(node=>ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>ts.isIdentifier(d.name)&&d.name.text==='epochs'));
+ assert(first>=0,'actual P1 epoch validation block');
+ const block=statements.slice(first).map(node=>node.getText(ast)).join('\n');
+ const validate=Function('assert','result','process','console','verifyObservedBudgetMetrics','verifyCompleteBudgetTrace','verifyPositiveBudgetEpochInventory','"use strict";'+block);
+ const keys=[['producer',0,'M'],['producer',0,'QA'],['producer',1,'M'],['producer',1,'QA'],['producer',2,'M'],['producer',2,'QA'],['consumer',0,'M'],['consumer',0,'QA']];
+ const phases=['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'];
+ // MODELED DTOs from the real collector; no native fixture, clock or identity.
+ const epochs=keys.map(([segment,epoch,role])=>{
+  const c=createBudgetDiagnostics({testRevision:revision,workerRole:role}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
+  if(!(segment==='consumer'&&role==='M'))for(const [i,phase]of (segment==='producer'&&epoch===0&&role==='QA'?phases:['setup']).entries()){
+   const op=c.begin(r,null,{phase,resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});
+  }
+  return {segment,epoch,role,reason:'MODELED',capturedAt:1000+epoch,snapshot:c.snapshot()};
+ });
+ const check=value=>validate(assert,{diagnostics:{epochs:value}},{env:{GITHUB_SHA:revision}},{info(){}},verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,evidence.verifyPositiveBudgetEpochInventory);
+ assert.doesNotThrow(()=>check(epochs),'R4 source-faithful six-field captures accepted');
+ assert.throws(()=>check(epochs.filter(e=>!(e.segment==='consumer'&&e.role==='M'&&e.epoch===0))),{code:'ERR_ASSERTION'},'R4 missing empty consumer epoch rejected');
+ const invalid=[
+  [...epochs,epochs[0]],
+  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:1}],
+  [...epochs.slice(0,-1),{...epochs.at(-1),role:'fixture'}],
+  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:'0'}]
+ ];
+ for(const value of invalid)assert.throws(()=>check(value),{code:'ERR_ASSERTION'});
+ for(const mutate of [
+  e=>{e.reason=17;},e=>{e.capturedAt=NaN;},e=>{e.capturedAt='1000';},
+  e=>{e.snapshot.testRevision='b'.repeat(40);},e=>{e.snapshot.workerRole='fixture';}
+ ]){const altered=structuredClone(epochs);mutate(altered[0]);assert.throws(()=>check(altered),{code:'ERR_ASSERTION'});}
+}
+
+async function intrinsicReadBytes(){
+ const cases=[
+  {bytes:new ArrayBuffer(7),length:7,direct:true,throws:true},
+  {bytes:new Uint8Array(5),length:5,direct:false,throws:false},
+  {bytes:new DataView(new ArrayBuffer(3)),length:3,direct:false,throws:true}
+ ];
+ const observations=[];
+ for(const item of cases){
+  let getters=0,calls=0;Object.defineProperty(item.bytes,'byteLength',{get(){getters++;if(item.throws)throw Error('must not inspect byteLength accessor');return 999;}});
+  const value=item.direct?item.bytes:{value:item.bytes,done:false},actual=Promise.resolve(value);
+  const reader={read(arg){assert.equal(this,reader);assert.equal(arg,17);calls++;return actual;}},stream={getReader(){return reader;}},response={body:stream};
+  const {runtime,child}=memoryScope();
+  const returned=runtime.run(child,()=>{runtime.localResponse(response);const nativeReader=runtime.member(runtime.body(response),'getReader',{edge:'reader'})();return runtime.member(nativeReader,'read',{operation:'read',exposedBytes:true})(17);});
+  assert.equal(returned,actual);assert.equal(await returned,value);assert.equal(calls,1);
+  const s=runtime.snapshot(),row=s.rows[0];observations.push([getters,row.nativeBytesRead,row.status,s.totals.nativeSettled,s.totals.active,s.coverage.invalid]);
+ }
+ assert.deepEqual(observations,cases.map(c=>[0,c.length,'fulfilled',1,0,0]),'R5 byte lengths bypass own business getters');
+}
```

```diff
diff --git a/test/fixtures/finite-budget-diagnostics.mjs b/test/fixtures/finite-budget-diagnostics.mjs
# before_blob=f9884aa893d6ab6d74597921cc8925bf05437eea after_blob=2e911fd4e9d2287da687bef9b0389fbec48a5114
--- a/test/fixtures/finite-budget-diagnostics.mjs
+++ b/test/fixtures/finite-budget-diagnostics.mjs
@@ -21,20 +21,31 @@
 const splitCount=()=>({beforeRetentionOmission:0,afterRetentionOmission:0});
 const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
 const PHASE_BITS=new Map([...PHASES].map((phase,index)=>[phase,1<<index]));
 const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport','rateLimiter']);
 const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec','rpc','limit']);
 const REASONS=new Set(['timeout','denied','aborted','guard']);
 const data=(value,key)=>{if(!value||typeof value!=='object')return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;};
 const nativeObject=value=>value!==null&&(typeof value==='object'||typeof value==='function');
 const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
 const integer=value=>Number.isSafeInteger(value)&&value>=0;
+const arrayBufferLength=Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,'byteLength').get;
+const typedArrayLength=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype),'byteLength').get;
+const dataViewLength=Object.getOwnPropertyDescriptor(DataView.prototype,'byteLength').get;
+const isArrayBufferView=ArrayBuffer.isView;
+function intrinsicBufferLength(value){
+ try{const length=Reflect.apply(arrayBufferLength,value,[]);return integer(length)?length:null;}catch{return null;}
+}
+function intrinsicViewLength(value){
+ for(const getter of [typedArrayLength,dataViewLength])try{const length=Reflect.apply(getter,value,[]);if(integer(length))return length;}catch{/* Unavailable bytes stay null. */}
+ return null;
+}
 const metric=()=>({nativeBytesUnavailable:0,nativeStarted:0,nativeSettled:0,nativeRejected:0,logicalDenied:0,cancelStarted:0,cancelSettled:0,active:0,peak:0,nativeBytesRead:null,chunksRead:null,nativeDurationSumMs:0});
 export const budgetProofVocabulary=Object.freeze(Object.fromEntries(Object.entries({
  phases:PHASES,resources:RESOURCES,operations:OPERATIONS,logicalReasons:REASONS,events:EVENTS,invalidReasons:INVALID_REASONS
 }).map(([key,values])=>[key,Object.freeze([...values])])));
 export function createBudgetDiagnostics(options={}){
 
  const revision=data(options,'testRevision'),role=data(options,'workerRole');
  const testRevision=typeof revision==='string'&&/^[a-f0-9]{40}$/.test(revision)?revision:null;
  const workerRole=['QA','M','fixture'].includes(role)?role:'fixture';
  let optionsValid=!!testRevision&&role===workerRole;
@@ -175,30 +186,31 @@
  const incomplete=safe('incomplete',(reason,origin,site,context)=>{
   event();
   if(origin===READER_ORIGIN){
    const buckets=firstOmission?readerAfter:readerBefore;
    increment(buckets,site);firstReaderOrigin??={ordinal:events,relation:relation(),site,context};
   }
   return invalid(reason,true);
  });
  return Object.freeze({root,child,begin,bytes,logical,scopeLogical,cancel,settle,snapshot,incomplete});
 }
+const UNOBSERVABLE_THEN=Symbol('unobservable-then');
 function passiveThen(value){
  if(!nativeObject(value))return null;
- for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:null;}
+ for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:UNOBSERVABLE_THEN;}
  return null;
 }
 export function observeBudgetPromise(collector,opRef,promise){
  try{
-  const then=passiveThen(promise);if(!then){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
+  const then=passiveThen(promise);if(typeof then!=='function'){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
   const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
-  const next=passiveThen(chain);if(next)Reflect.apply(next,chain,[undefined,()=>{}]);
+  const next=passiveThen(chain);if(typeof next==='function')Reflect.apply(next,chain,[undefined,()=>{}]);
  }catch{try{collector.settle(opRef,{at:performance.now(),status:null},'promiseThenException');}catch{/* A sensor never changes native output. */}}
  return promise;
 }
 
 
 // SYN observer only. Native identities and captured stores never authorize work.
 export function createBudgetRuntime(options={}){
  const collector=createBudgetDiagnostics(options),als=new AsyncLocalStorage();
  const leaseClocks=new WeakMap(),leases=new WeakMap(),nativeHolders=new WeakMap(),nativePairs=new WeakMap(),bodies=new WeakMap(),facades=new WeakSet(),facadeHolders=new WeakSet(),nativeFunctions=new WeakMap(),requestResources=new WeakMap(),requestMethods=new WeakMap();
  const now=()=>performance.now(),incomplete=reason=>collector.incomplete(reason);
@@ -257,23 +269,24 @@
  const body=(receiver,optional=false)=>{
   if(optional&&receiver==null)return undefined;
   // This getter is the business getter, evaluated once at its original access.
   const value=receiver.body,owner=bodies.get(receiver);
   if(owner)tagBody(value,owner);
   return value;
  };
  const thenObserve=(value,fulfilled,rejected)=>{
   try{
    const then=passiveThen(value);
-   if(!then){fulfilled(value);return;}
+   if(then===UNOBSERVABLE_THEN){incomplete('promiseThenMissing');return;}
+   if(then===null){fulfilled(value);return;}
    const chained=Reflect.apply(then,value,[v=>{try{fulfilled(v);}catch{incomplete('observerFulfilledCallback');}},()=>{try{rejected();}catch{incomplete('observerRejectedCallback');}}]);
-   const next=passiveThen(chained);if(next)Reflect.apply(next,chained,[undefined,()=>{}]);
+   const next=passiveThen(chained);if(typeof next==='function')Reflect.apply(next,chained,[undefined,()=>{}]);
   }catch{incomplete('observerThenException');}
  };
  function invoke(fn,receiver,args,meta,original=()=>Reflect.apply(fn,receiver,args)){
   const bodyOwner=bodies.get(receiver),currentStore=als.getStore();
   const localStore=bodyOwner&&!bodyOwner.fetch&&bodyOwner.origin!=='outbound'&&currentStore?.root===bodyOwner.store?.root&&!currentStore?.excluded?currentStore:null;
   const store=localStore??bodyOwner?.store??currentStore;
   if(meta.dormant){incomplete('dormantInvocation');return original();}
   if(meta.edge==='clone'){
    const result=original();if(bodyOwner)tagBody(result,bodyOwner);else incomplete('cloneOrigin');return result;
   }
@@ -301,22 +314,23 @@
   const at=now(),ref=collector.begin(store.root,store.child,{phase:store.phase,resourceClass,operation,at,fetchOpRef:bodyOwner?.fetch??null});
   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at,stage:'started'});
   let result;
   try{result=operation==='transaction'?als.run(immutable({...store,nativeTransaction:true}),()=>original()):original();}catch(error){collector.settle(ref,{at:now(),status:'rejected'});throw error;}
   thenObserve(result,value=>{
    const settled=now();
    if(operation==='fetch')tagBody(value,immutable({store,resource:resourceClass,fetch:ref,origin:'outbound'}));
    if(operation==='read'&&meta.exposedBytes){
     // Only exposed native ArrayBuffers/chunks. No text, JSON, cloning or probing.
     const chunk=data(value,'value'),done=data(value,'done');
-    if(value instanceof ArrayBuffer)collector.bytes(ref,{length:value.byteLength,chunks:1,durationMs:settled-at});
-    else if(ArrayBuffer.isView(chunk))collector.bytes(ref,{length:chunk.byteLength,chunks:1,durationMs:settled-at});
+    const directLength=intrinsicBufferLength(value);
+    if(directLength!==null)collector.bytes(ref,{length:directLength,chunks:1,durationMs:settled-at});
+    else if(isArrayBufferView(chunk)){const length=intrinsicViewLength(chunk);if(length!==null)collector.bytes(ref,{length,chunks:1,durationMs:settled-at});}
     else if(done===true)collector.bytes(ref,{length:0,chunks:0,durationMs:settled-at});
    }
    collector.settle(ref,{at:settled,status:'fulfilled'});
    if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
   },()=>{
    const settled=now();collector.settle(ref,{at:settled,status:'rejected'});
    if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
   });
   return result;
  }
```

```diff
diff --git a/test/fixtures/finite-budget-evidence.mjs b/test/fixtures/finite-budget-evidence.mjs
# before_blob=81178d96e10784366ab1b11bbf0805e347dea173 after_blob=0d95b1616a167f7f089e3a8ca59ca9628aa8aaa9
--- a/test/fixtures/finite-budget-evidence.mjs
+++ b/test/fixtures/finite-budget-evidence.mjs
@@ -138,20 +138,25 @@
  for(const entry of s.totals.scopes){
   metric(entry,['rootOrdinal','childOrdinal']);scope(entry);const key=scopeKey(entry);
   valid(!scopes.has(key),'unique scope');
   if(entry.childOrdinal!==null){valid(!childRoots.has(entry.childOrdinal),'unique child root');childRoots.set(entry.childOrdinal,entry.rootOrdinal);}
   scopes.set(key,entry);replayScopes.set(key,blank());
  }
  for(const entries of [s.byPhaseResource,s.totals.scopes])for(const k of additive){
   const combined=sum(entries.map(m=>m[k]));
   equalMetric(s.totals[k],combined??(['nativeBytesRead','chunksRead'].includes(k)?null:0),k);
  }
+ for(const entries of [s.byPhaseResource,s.totals.scopes]){
+  const peaks=entries.map(entry=>entry.peak),upper=sum(peaks)??0;
+  valid(peaks.every(peak=>peak<=s.totals.peak)&&s.totals.peak<=upper,'partition peak bounds');
+  for(const entry of entries)if(entry.nativeStarted===s.totals.nativeStarted)valid(entry.peak===s.totals.peak,'whole partition peak');
+ }
  const all=blank(),transitions=[],ordinals=new Set(),rows=new Map(),guards=new Set();
  let priorEnter=0,firstAt=null,lastAt=null;
  const rootMetadata=new Map(),childMetadata=new Map();
  const stamp=n=>{valid(pos(n)&&n<=s.chronology.eventCalls&&!ordinals.has(n),'unique transition');ordinals.add(n);};
  for(const [index,r] of s.rows.entries()){
   shape(r,rowKeys);scope(r);observedScopes.add(scopeKey(r));valid(r.opOrdinal===index+1&&r.testRevision===s.testRevision&&r.workerRole===s.workerRole,'prefix provenance');
   valid(vocab.phases.includes(r.phase)&&vocab.resources.includes(r.resourceClass)&&vocab.operations.includes(r.operation),'row enums');
   valid((r.operation!=='rpc'||r.resourceClass==='DO')&&((r.operation==='limit')===(r.resourceClass==='rateLimiter')),'method resource');
   valid(['control','transport'].includes(r.kind)&&(r.kind==='control'?time(r.rootDeadline):nullable(r.rootDeadline,time))&&nullable(r.childDeadline,time)&&(r.childOrdinal===null?r.childDeadline===null:time(r.childDeadline)),'deadlines');
   const rootInfo=rootMetadata.get(r.rootOrdinal);
@@ -189,10 +194,23 @@
    else if(part[k]!==null)valid(actual[k]!==null&&(k==='nativeDurationSumMs'?part[k]<=actual[k]+1e-8+Math.abs(actual[k])*1e-10:part[k]<=actual[k]),'prefix metric subset');
   }
  }
  if(s.retention.traceComplete)valid(observedScopes.size===scopes.size,'complete scope witnesses');
  if(!s.retention.guardRows.omitted)valid(s.totals.deniedScopes===guards.size,'distinct denied scopes');
  if(!s.retention.operationRows.omitted)equalMetric(s.totals.observedWallMs,firstAt===null?0:lastAt-firstAt,'nativeDurationSumMs');
 }
 const proof=(s,level)=>({purpose:'afw.finite-budget-metrics-proof.syn.v1',level,traceComplete:s.retention.traceComplete,operationalReadiness:false,completePackage:false,PCoff:false});
 export function verifyObservedBudgetMetrics(s){inspect(s);return proof(s,'observed_metrics');}
 export function verifyCompleteBudgetTrace(s){inspect(s);assert(s.retention.traceComplete,'incomplete retained trace');return proof(s,'complete_trace');}
+
+export function verifyPositiveBudgetEpochInventory(epochs){
+ list(epochs,8);valid(epochs.length===8,'positive epoch inventory');
+ const expected=new Set(['producer|0|M','producer|0|QA','producer|1|M','producer|1|QA','producer|2|M','producer|2|QA','consumer|0|M','consumer|0|QA']);
+ for(const epoch of epochs){
+  shape(epoch,['segment','epoch','role','reason','capturedAt','snapshot']);
+  valid(typeof epoch.reason==='string'&&count(epoch.capturedAt),'positive epoch capture metadata');
+  valid(['producer','consumer'].includes(epoch.segment)&&count(epoch.epoch)&&['M','QA'].includes(epoch.role),'positive epoch identity');
+  valid(epoch.snapshot&&typeof epoch.snapshot==='object'&&!types.isProxy(epoch.snapshot)&&[Object.prototype,null].includes(Object.getPrototypeOf(epoch.snapshot)),'positive epoch snapshot');
+  valid(expected.delete(epoch.segment+'|'+epoch.epoch+'|'+epoch.role),'positive epoch key');
+ }
+ valid(expected.size===0,'positive epoch completeness');
+}
```

```diff
diff --git a/test/mcp-qa-finite-budget-native.test.mjs b/test/mcp-qa-finite-budget-native.test.mjs
# before_blob=d63f6e5752894ddc7d52f2430fa8f1fd1c07156a after_blob=082340b6ede2a252a8602721ec19063cc68fafc8
--- a/test/mcp-qa-finite-budget-native.test.mjs
+++ b/test/mcp-qa-finite-budget-native.test.mjs
@@ -1,21 +1,21 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
 import {join} from 'node:path';
 import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';
 
-import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
+import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './fixtures/finite-budget-evidence.mjs';
 
 const group=process.env.AFW_BUDGET_GROUP;
-if(!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
+if(group!==undefined&&!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
 const directory='output/finite-budget/red',hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 if(group==='red')test('R0 attributable diagnostics after genuine SDK complete and durable Reference',{timeout:180000},async t=>{
  await mkdir(directory,{recursive:true});
  const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
  const outcome={purpose:'afw.finite-budget-red-outcome.syn.v1',source,caseName:'R0',startedAt:Date.now(),stage:'fixture',actualCompleteNormal:null,referenceHash:null,responseStatus:null,diagnosticsPurpose:null,expectedDeficitObserved:false,operationalReadiness:false,completePackage:false,PCoff:false};
  try{
   const f=await ownerReferenceFixture(t);
   outcome.stage='prepare';
   const prepared=await prepareOwnerReference(f);
   outcome.stage='issue';
@@ -75,20 +75,21 @@
  const {facts,plan,native}=result,P='afw.finite-initial-cleanup.v1:';
  const state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]),receipt=JSON.parse(facts.rows.find(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'))[1]);
  assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);
  assert(result.recovery.ready<=plan.C0-30000);assert(facts.dbNow>=plan.C0);assert.equal(facts.alarm,null);assert.equal(state.status,'complete');assert.equal(result.restores,1);
  assert.equal(result.pointer.versions[0].version_id,plan.baselineVersionId);assert.equal(result.kvSemanticProof.bothAliases,true);
  assert.equal(receipt.businessAccessClosed,true);assert.equal(receipt.sdkReductionReturned,true);assert(receipt.sdkSendHash&&receipt.sdkObservedHash);
  assert.equal(receipt.globalNativeDrainVerified,false);assert.equal(receipt.sdkNamespaceEmptyVerified,false);
  assert(native.fence.fenced_at);assert(!native.grant||native.grant.revoked_at);assert.deepEqual(native.notices.map(n=>n.action),['grant','revoke']);assert(facts.finalInventoryProof);
  assert.equal(result.producer.completeNormal,1);assert.equal(result.producer.referenceRows,1);assert(result.producer.referenceReadbacks>0);assert(result.sdkAfterExchange);assert(result.sdkAfterExchange.expiresAt*1000<=plan.C0);
  const epochs=result.diagnostics.epochs,identities=new Set(),phases=new Set(),roles=new Set();
+ verifyPositiveBudgetEpochInventory(epochs);
  assert(epochs.some(e=>e.segment==='producer'));assert(epochs.some(e=>e.segment==='consumer'));
  for(const epoch of epochs){
   const key=epoch.segment+'|'+epoch.epoch+'|'+epoch.role;assert(!identities.has(key));identities.add(key);roles.add(epoch.role);
   const s=epoch.snapshot;assert.equal(s.testRevision,process.env.GITHUB_SHA);assert.equal(s.workerRole,epoch.role);
   const observed=verifyObservedBudgetMetrics(s),full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
   for(const group of s.byPhaseResource)if(group.nativeStarted>0)phases.add(group.phase);
   console.info('P1 SYN proof',JSON.stringify({segment:epoch.segment,epoch:epoch.epoch,role:epoch.role,observed,full,retention:s.retention}));
  }
  assert.deepEqual([...roles].sort(),['M','QA']);
  assert.deepEqual([...phases].sort(),['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'].sort());
```

