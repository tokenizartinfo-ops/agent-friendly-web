# Task1 code review component — GLOBALBASE to bd00 code

Base: 29681cae2bf1094ec5c66d5b2784254f77bec697. Code head: bd00efd8eb5efec59dcf3a7cf69b4481d3942e06. Same code blobs are frozen in qualification Source baef10ca4b50321bd4c19f91a0cfdf889201bfce. This component is preparation, not a review verdict or a qualification result. The final controller index must supply the final full commit list/stat, final report, binding requirements and actual run result before formal review.

Twelve code-file diffs follow, including complete contents of new modules and U10 context for the five modified fixtures. GitHub's supplied patches were reconstructed against both exact before/after contents before expanding context. Every server blob matched the comparison metadata; new-file contents below are the complete additions. No lib/worker/SDK/package/lock/config changes belong to this Task1 range.

| File | Before blob | After blob |
| --- | --- | --- |
| test/finite-budget-diagnostics.test.mjs | ABSENT | f8745e0b8060e1d67066104690835f7ce25b1504 |
| test/finite-checkpoint-custody.test.mjs | ABSENT | c913c94be080597704fbf7d370475443e1f1b96d |
| test/fixtures/finite-budget-diagnostics.mjs | ABSENT | f9884aa893d6ab6d74597921cc8925bf05437eea |
| test/fixtures/finite-budget-evidence.mjs | ABSENT | 81178d96e10784366ab1b11bbf0805e347dea173 |
| test/fixtures/finite-budget-world.mjs | ABSENT | f654001b027555c41dbe3f287445e73ac849094b |
| test/fixtures/finite-checkpoint-custody.mjs | ABSENT | 9a486b839874ed8e9a950f6a823b18e7585de52e |
| test/fixtures/finite-first-connection-publication.mjs | 047bd6afc34858fe5ce972120101a8d91c092c1e | cede301c3e9cd95716ae2134f938dbb1d940e7a9 |
| test/fixtures/finite-initial-entry-world.mjs | 8477a05e955d854e001d2315a8b2c4c6c6dbbbe2 | 605afed804fa4062b9eb76021946d89bbae60c5f |
| test/fixtures/finite-owner-cleanup-persistence.mjs | 72db124ac86c14537cfa711434393b4561904c30 | e317f58205b062adb6223a4dd5647b65e9c860b4 |
| test/fixtures/finite-owner-cleanup.mjs | 4e88d73a818497a5a64dcc34ee15737e93521d96 | a8a2df05822a8b6daee9067a3e02bb7a4912eb7d |
| test/mcp-qa-finite-budget-native.test.mjs | ABSENT | d63f6e5752894ddc7d52f2430fa8f1fd1c07156a |
| test/mcp-qa-finite-owner-cleanup-native.test.mjs | 378c09842bef0840883c481bd6cd4bad4b66413b | 84ba4a466197a1797929f13bab4de17c21d5a3bf |

The complete generated descriptor is a separate full-addition component at docs/superpowers/reviews/2026-11-12-finite-budget-task1-descriptors-bd00.json, blob be695028e4c12c3cb7d3b7bf2c5f2e7508f3db15 (absent at BASE). The exact executed qualification workflow is retained separately at docs/superpowers/reviews/2026-11-12-finite-budget-task1-workflow-baef.yml, blob f0f20df9450142efbc6b0d8a1b10f42c80a0e25d; it is temporary in Source and must be absent from the final head. The append-only implementation report is another complete addition; its final blob is supplied by the final controller index. These files are separated for paging, not omitted from review scope.

## test/finite-budget-diagnostics.test.mjs

```diff
diff --git a/test/finite-budget-diagnostics.test.mjs b/test/finite-budget-diagnostics.test.mjs
# before_blob=ABSENT after_blob=f8745e0b8060e1d67066104690835f7ce25b1504
--- /dev/null
+++ b/test/finite-budget-diagnostics.test.mjs
@@ -0,0 +1,545 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile,rm} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {createBudgetDiagnostics,observeBudgetPromise,createBudgetRuntime} from './fixtures/finite-budget-diagnostics.mjs';
+import {persistBudgetEvidence,verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
+const revision='a'.repeat(40);
+const fixture=()=>{const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),r=c.root({},{phase:'authorize_get',deadline:30000,kind:'control'}),child=c.child(r,{},{deadline:5000});return {c,r,child};};
+const begin=(c,r,child,phase='authorize_get',at=0)=>c.begin(r,child,{phase,resourceClass:'KV',operation:'get',at});
+test('Q1 projection redacts secret markers and ignores accessors',()=>{
+ const {c,r,child}=fixture();let accessed=false;const metadata={phase:'authorize_get',resourceClass:'KV',operation:'get',at:1,secret:'SECRET_Q1_NEVER_SERIALIZE'};Object.defineProperty(metadata,'url',{get(){accessed=true;throw Error('secret getter');}});
+ const op=c.begin(r,child,metadata);c.settle(op,{at:2,status:'fulfilled'});const dto=c.snapshot(),raw=JSON.stringify(dto);
+ assert(!raw.includes('SECRET_Q1'));assert(!raw.includes('url'));assert.equal(accessed,false);assert.equal(dto.rows[0].resourceClass,'KV');assert.equal(dto.testRevision,revision);
+ const invalid=c.begin(r,child,{phase:'SECRET_Q1',resourceClass:'KV',operation:'get',at:3});assert.equal(invalid,null);assert(c.snapshot().coverage.invalid>0);assert(!JSON.stringify(c.snapshot()).includes('SECRET_Q1'));
+});
+test('Q2 one native entry and duplicate settlement retain consistent denominators',async()=>{
+ const {c,r,child}=fixture(),op=begin(c,r,child);c.settle(op,{at:10,status:'fulfilled'});c.settle(op,{at:20,status:'rejected'});
+ const s=c.snapshot();assert.equal(s.rows.length,1);assert.equal(s.totals.nativeStarted,1);assert.equal(s.totals.nativeSettled,1);assert.equal(s.totals.nativeRejected,0);assert.equal(s.byPhaseResource[0].nativeSettled,1);assert.equal(s.totals.nativeDurationSumMs,10);assert.equal(s.totals.active,0);
+ const c2=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),r2=c2.root({},{phase:'mcp_read',deadline:null,kind:'transport'});
+ for(const [resourceClass,operation]of [['rateLimiter','limit'],['DO','rpc']]){const ref=c2.begin(r2,null,{phase:'mcp_read',resourceClass,operation,at:0});assert(ref);c2.settle(ref,{at:1,status:'fulfilled'});}
+ const typed=c2.snapshot();assert.equal(typed.totals.nativeStarted,2);assert.equal(typed.totals.nativeSettled,2);assert.equal(typed.coverage.unattributed,0);assert.deepEqual(typed.rows.map(r=>[r.resourceClass,r.operation,r.fetchOpOrdinal]),[['rateLimiter','limit',null],['DO','rpc',null]]);
+ for(const overlap of [true,false]){
+  const probe=createBudgetDiagnostics({testRevision:revision,workerRole:'fixture'}),root=probe.root({},{phase:'setup',deadline:null,kind:'transport'});
+  const left=begin(probe,root,null,'setup',7);
+  if(!overlap)probe.settle(left,{at:7,status:'fulfilled'});
+  const right=begin(probe,root,null,'setup',7);
+  if(overlap)probe.settle(left,{at:7,status:'fulfilled'});
+  probe.settle(right,{at:7,status:'fulfilled'});
+  const sameTime=probe.snapshot();assert.equal(sameTime.totals.peak,overlap?2:1);
+  assert.equal(verifyCompleteBudgetTrace(sameTime).level,'complete_trace');assert.equal(verifyObservedBudgetMetrics(sameTime).level,'observed_metrics');
+  const altered=structuredClone(sameTime);altered.totals.peak=overlap?1:2;assert.throws(()=>verifyCompleteBudgetTrace(altered));
+ }
+ await coldTransactionCallback();
+});
+test('Q3 fixed Root and phase survive a concurrent Root and late settlement',async()=>{
+ const {c,r,child}=fixture(),a=begin(c,r,child,'authorize_get',0),r2=c.root({},{phase:'monitoring_post',deadline:31000,kind:'control'}),b=begin(c,r2,null,'monitoring_post',1);
+ c.settle(b,{at:2,status:'fulfilled'});c.settle(a,{at:3,status:'fulfilled'});const s=c.snapshot();
+ assert.deepEqual(s.rows.map(v=>[v.rootOrdinal,v.childOrdinal,v.phase,v.settledAt]),[[1,1,'authorize_get',3],[2,null,'monitoring_post',2]]);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,1);assert.equal(s.coverage.unattributed,0);
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),one={},two={};let resolveOne,resolveTwo;
+ const first=new Promise(resolve=>{resolveOne=resolve;}),second=new Promise(resolve=>{resolveTwo=resolve;}),holder={get(which){return which===1?first:second;}};
+ runtime.nativeHolder(holder,'KV');runtime.clock(one,30000);runtime.clock(two,31000);
+ assert.equal(runtime.control(one,'authorize_get',{},()=>runtime.member(holder,'get',{operation:'get'})(1)),first);
+ assert.equal(runtime.control(two,'monitoring_post',{},()=>runtime.member(holder,'get',{operation:'get'})(2)),second);
+ resolveTwo('two');await second;resolveOne('one');await first;
+ const rows=runtime.snapshot().rows;assert.deepEqual(rows.map(v=>[v.rootOrdinal,v.phase]),[[1,'authorize_get'],[2,'monitoring_post']]);assert(rows[0].settledAt>=rows[1].settledAt);assert.equal(runtime.snapshot().totals.peak,2);
+
+ await coldPhaseReentry();
+});
+test('Q4 logical denial and cancellation do not fabricate native settlement',()=>{
+ const {c,r,child}=fixture(),op=begin(c,r,child);c.logical(op,{at:5,reason:'timeout'});c.cancel(op,{at:6,stage:'started'});
+ let s=c.snapshot();assert.equal(s.totals.logicalDenied,1);assert.equal(s.totals.nativeSettled,0);assert.equal(s.totals.cancelStarted,1);assert.equal(s.totals.cancelSettled,0);assert.equal(s.totals.active,1);
+ c.cancel(op,{at:7,stage:'settled'});assert.equal(c.snapshot().totals.nativeSettled,0);c.settle(op,{at:8,status:'rejected'});s=c.snapshot();assert.equal(s.totals.nativeRejected,1);assert.equal(s.rows[0].logicalAt,5);assert.equal(s.rows[0].cancelSettledAt,7);
+ const fulfilled=begin(c,r,child,'authorize_get',9);c.settle(fulfilled,{at:10,status:'fulfilled'});
+ c.scopeLogical(r,child,{phase:'authorize_get',at:11,reason:'guard'});c.scopeLogical(r,child,{phase:'authorize_get',at:12,reason:'guard'});
+ const scoped=c.snapshot();assert.equal(scoped.rows[1].status,'fulfilled');assert.equal(scoped.rows[1].logicalAt,null,'scope failure does not relabel a fulfilled native leaf');assert.equal(scoped.totals.logicalDenied,1,'explicit per-op logical denominator unchanged');assert.equal(scoped.totals.scopeGuardEvents,2);assert.equal(scoped.totals.deniedScopes,1);assert.equal(scoped.logicalScopeEvents.length,2);
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),lease={},originalError=Error('not serialized');runtime.clock(lease,30000);
+ assert.throws(()=>runtime.control(lease,'authorize_get',{},()=>{throw runtime.guardValue(originalError);}),error=>error===originalError);
+ const guardSnapshot=runtime.snapshot();assert.equal(guardSnapshot.totals.scopeGuardEvents,1);assert.equal(guardSnapshot.totals.logicalDenied,0);assert.equal(guardSnapshot.rows.length,0);assert(!JSON.stringify(guardSnapshot).includes('not serialized'));
+
+ assert.equal(verifyCompleteBudgetTrace(scoped).level,'complete_trace');
+ const guardPrefix=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxGuards:1});
+ const gr=guardPrefix.root({},{phase:'setup',deadline:30000,kind:'control'});
+ for(const phase of ['setup','setup','restore','restore'])guardPrefix.scopeLogical(gr,null,{phase,at:0,reason:'guard'});
+ const guarded=guardPrefix.snapshot();assert.equal(guarded.totals.deniedScopes,2);assert.equal(guarded.retention.guardRows.omitted,3);
+ assert.equal(verifyObservedBudgetMetrics(guarded).level,'observed_metrics');assert.throws(()=>verifyCompleteBudgetTrace(guarded));
+
+});
+test('Q5 observing preserves actual promise identity, resolution, rejection and no authority',async()=>{
+ // Regression: foreign fragment coordinates must not alter inserted compiler metadata.
+ const ts=(await import('typescript')).default;
+ const {createBudgetLiteral,createBudgetScopeExpression,transformBudgetPreparedSource,rewriteBudgetIdentityAccess}=await import('./fixtures/finite-budget-world.mjs');
+ const parse=(source,path)=>{const ast=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);assert.equal(ast.parseDiagnostics.length,0,'inserted compiler output parses');return ast;};
+ const decode=node=>{
+  if(ts.isStringLiteral(node))return node.text;
+  if(ts.isNumericLiteral(node))return Number(node.text);
+  if(node.kind===ts.SyntaxKind.TrueKeyword)return true;
+  if(node.kind===ts.SyntaxKind.FalseKeyword)return false;
+  if(node.kind===ts.SyntaxKind.NullKeyword)return null;
+  if(ts.isPrefixUnaryExpression(node)&&node.operator===ts.SyntaxKind.MinusToken)return -decode(node.operand);
+  if(ts.isArrayLiteralExpression(node))return node.elements.map(decode);
+  if(ts.isObjectLiteralExpression(node))return Object.fromEntries(node.properties.map(p=>{assert(ts.isPropertyAssignment(p)&&ts.isStringLiteral(p.name));return [p.name.text,decode(p.initializer)];}));
+  assert.fail('unexpected emitted JSON node');
+ };
+ const metadata={operation:'read',nested:[true,false,null,-0,-2.5,'quote" newline\n',[1]],resource:'transport'};
+ const expectedMetadata={operation:'read',nested:[true,false,null,0,-2.5,'quote" newline\n',[1]],resource:'transport'};
+ for(const [name,source]of [['witness-a.mjs','const target = 0;\n'],['witness-b.mjs','const padding = "different file";\nconst target = 0;\n']]){
+  const ast=parse(source,name),f=ts.factory,result=ts.transform(ast,[context=>{
+   const visit=node=>ts.isVariableDeclaration(node)&&node.name.getText(ast)==='target'
+    ?f.updateVariableDeclaration(node,node.name,node.exclamationToken,node.type,f.createCallExpression(f.createIdentifier('observe'),undefined,[createBudgetLiteral(metadata)]))
+    :ts.visitEachChild(node,visit,context);
+   return root=>ts.visitNode(root,visit);
+  }]);
+  const emitted=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();
+  const output=parse(emitted,name),statement=output.statements.at(-1),call=statement.declarationList.declarations[0].initializer;
+  assert(ts.isCallExpression(call));assert.deepEqual(decode(call.arguments[0]),expectedMetadata);
+  assert.deepEqual(call.arguments[0].properties.map(p=>p.name.text),['operation','nested','resource']);
+ }
+ let accessorCalls=0;const accessor={};Object.defineProperty(accessor,'secret',{enumerable:true,get(){accessorCalls++;return 'wrong';}});
+ assert.throws(()=>createBudgetLiteral(accessor));assert.equal(accessorCalls,0);
+ for(const unsupported of [undefined,NaN,Infinity,()=>{},Symbol('unsupported'),new Date(0)])assert.throws(()=>createBudgetLiteral(unsupported));
+ const cyclic={};cyclic.self=cyclic;assert.throws(()=>createBudgetLiteral(cyclic));
+ const shape=node=>{
+  if(ts.isParenthesizedExpression(node))return shape(node.expression);
+  if(ts.isIdentifier(node))return ['id',node.text];
+  if(ts.isStringLiteral(node))return ['string',node.text];
+  if(ts.isNumericLiteral(node))return ['number',Number(node.text)];
+  if(ts.isPropertyAccessExpression(node))return ['property',shape(node.expression),node.name.text];
+  if(ts.isBinaryExpression(node))return [ts.tokenToString(node.operatorToken.kind),shape(node.left),shape(node.right)];
+  if(ts.isConditionalExpression(node))return ['conditional',shape(node.condition),shape(node.whenTrue),shape(node.whenFalse)];
+  assert.fail('unexpected fixed scope expression');
+ };
+ const scopeCases=[
+  ['began+5000',['+',['id','began'],['number',5000]]],
+  ['entered+5000',['+',['id','entered'],['number',5000]]],
+  ['started+5000',['+',['id','started'],['number',5000]]],
+  ['parent.lease',['property',['id','parent'],'lease']],
+  ["metadata.method==='POST'?'authorize_post':'authorize_get'",['conditional',['===',['property',['id','metadata'],'method'],['string','POST']],['string','authorize_post'],['string','authorize_get']]],
+  ["consent?'monitoring_post':'monitoring_get'",['conditional',['id','consent'],['string','monitoring_post'],['string','monitoring_get']]]
+ ];
+ for(const [text,expected]of scopeCases){
+  const expression=createBudgetScopeExpression(text),emitted=ts.createPrinter().printNode(ts.EmitHint.Expression,expression,parse('const unrelated = "destination";','scope.mjs'));
+  const ast=parse('const value = ('+emitted+');','scope-output.mjs');
+  assert.deepEqual(shape(ast.statements[0].declarationList.declarations[0].initializer),expected);
+ }
+ assert.throws(()=>createBudgetScopeExpression('unlisted.expression'));
+ const path='lib/delegated-oauth-worker.mjs',raw=await readFile(path,'utf8');
+ assert.equal(Buffer.byteLength(raw),33008);assert.equal(createHash('sha256').update(raw).digest('hex'),'3161d183fac7bb31b5bd863deba7f0641400b4f0ef5709c940f11e5441125318');
+ const emitted=transformBudgetPreparedSource(raw,path,'M').source,ast=parse(emitted,path),readers=[];
+ const visit=node=>{
+  if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)==='__afwBudget'&&node.expression.name.text==='member'&&node.arguments[0]?.getText(ast)==='reader'){
+   assert(ts.isStringLiteral(node.arguments[1]));readers.push([node.arguments[1].text,decode(node.arguments[2])]);
+  }
+  ts.forEachChild(node,visit);
+ };
+ visit(ast);assert.deepEqual(readers.filter(([method])=>method==='read'),[['read',{operation:'read',exposedBytes:true}]]);
+ assert.deepEqual(readers.filter(([method])=>method==='cancel'),[['cancel',{operation:'cancel',exposedBytes:false}]]);
+
+ // Regression: identity observation keeps actual references assignable while visiting their reads.
+ const {transform}=await import('esbuild');
+ const identityOutput=source=>{
+  const ast=parse(source,'identity-fixture.mjs'),f=ts.factory,seen=[];
+  const hook=(name,args)=>f.createCallExpression(f.createPropertyAccessExpression(f.createIdentifier('__afwBudget'),name),undefined,args);
+  const result=ts.transform(ast,[context=>{
+   const visit=original=>{
+    const node=ts.visitEachChild(original,visit,context);
+    return rewriteBudgetIdentityAccess(original,node,{ast,path:'worker/mcp-own/finite.mjs',hook,count:kind=>seen.push(kind)});
+   };
+   return root=>ts.visitNode(root,visit);
+  }]);
+  const sourceText=ts.createPrinter().printFile(result.transformed[0]);result.dispose();return {source:sourceText,seen};
+ };
+ const referenceSource=`function refs(env,state,ctx,request,input){
+  state.counts.list++; ++state.counts.transaction; state.counts.get += 1; state.counts.sync ||= 0;
+  env.RELEASE_DB=input.value; (ctx.storage)=input.storage; delete request.body;
+  ({x:env.RELEASE_DB=request.body}=input.object);
+  [env.RELEASE_DB,...ctx.storage]=input.array; ({...env.RELEASE_DB}=input.object);
+  for(env.RELEASE_DB of input.array){} for(request.body in input.object){}
+  env.RELEASE_DB.get=input.fn; env.RELEASE_DB[request.body]=input.fn;
+  const method=env.RELEASE_DB[input.key]; return request.body===input.rhs&&request.method==='POST'&&method;
+ }`;
+ const references=identityOutput(referenceSource);await transform(references.source,{loader:'js',target:'es2022'});
+ const referenceAST=parse(references.source,'identity-output.mjs'),identityCalls=[];
+ const collect=node=>{if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(referenceAST)==='__afwBudget')identityCalls.push([node.expression.name.text,node.arguments[0]?.getText(referenceAST)]);ts.forEachChild(node,collect);};collect(referenceAST);
+ assert.equal(identityCalls.filter(([name,receiver])=>name==='nativeHolder'&&receiver==='env.RELEASE_DB').length,3,'larger member targets and captured method still read the binding');
+ assert.equal(identityCalls.filter(([name])=>name==='body').length,3,'default RHS, computed key and comparison each retain their body read');
+ assert.equal(identityCalls.filter(([name])=>name==='readMethod').length,1,'actual computed method acquisition remains observed');
+ assert.equal(identityCalls.filter(([name])=>name==='methodValue').length,1);
+ const semanticSource=`function exercise(input){
+  const env=input.env,state=input.state,ctx=input.ctx,request=input.request;
+  state.counts.list++; ++state.counts.transaction; state.counts.get+=2; state.counts.sync--;
+  env.RELEASE_DB=input.replacement;
+  env.RELEASE_DB.get=input.fn;
+  const body=request.body,method=ctx.storage.get;
+  input.target[request.body]=body;
+  const same=request.body===body&&request.method==='POST';
+  delete env.RELEASE_DB;
+  return {counts:state.counts,body,same,sameMethod:method===input.fn,target:input.target};
+ }`;
+ const semantic=identityOutput(semanticSource);await transform(semantic.source,{loader:'js',target:'es2022'});
+ const execute=source=>{
+  const trace=[],observations=[];const fn=()=>42,holder={get:fn},replacement={};
+  let binding=holder;
+  const env={};Object.defineProperty(env,'RELEASE_DB',{configurable:true,get(){trace.push('binding-get');return binding;},set(value){trace.push('binding-set');binding=value;}});
+  Object.defineProperty(replacement,'get',{configurable:true,set(value){trace.push('method-set');assert.equal(value,fn);}});
+  const request={get body(){trace.push('body-get');return 'key';},get method(){trace.push('method-get');return 'POST';}};
+  const ctx={get storage(){trace.push('storage-get');return holder;}};
+  const input={env,request,ctx,fn,holder,replacement,state:{counts:{list:0,transaction:0,get:0,sync:2}},target:{}};
+  const observer={nativeHolder(value){observations.push('holder');return value;},readMethod(receiver,key){observations.push('method');return receiver[key];},body(receiver){observations.push('body');return receiver.body;},methodValue(request,value){observations.push('request-method');return value;}};
+  const result=Function('__afwBudget','input',source+';return exercise(input);')(observer,input);
+  return {result,trace,observations,deleted:!Object.hasOwn(env,'RELEASE_DB')};
+ };
+ const untouched=execute(semanticSource),identityObserved=execute(semantic.source);
+ assert.deepEqual(identityObserved.result,untouched.result);assert.deepEqual(identityObserved.trace,untouched.trace);assert.equal(identityObserved.deleted,true);
+ assert.deepEqual(identityObserved.trace,['binding-set','binding-get','method-set','body-get','storage-get','body-get','body-get','method-get']);
+ assert.deepEqual(identityObserved.result.counts,{list:1,transaction:1,get:2,sync:1});assert.equal(identityObserved.result.sameMethod,true);
+ assert.deepEqual(identityObserved.observations,['holder','body','holder','method','body','body','request-method']);
+ const {c,r,child}=fixture();let effect=0;const actual=Promise.resolve().then(()=>{effect++;return 42;}),op=begin(c,r,child,'authorize_get',performance.now());
+ assert.equal(observeBudgetPromise(c,op,actual),actual);assert.equal(await actual,42);assert.equal(effect,1);
+ const error=Error('native rejection'),rejected=Promise.reject(error),second=begin(c,r,child,'authorize_get',performance.now());assert.equal(observeBudgetPromise(c,second,rejected),rejected);await assert.rejects(rejected,value=>value===error);await Promise.resolve();
+ assert.equal(c.snapshot().totals.nativeSettled,2);assert.equal(c.snapshot().totals.nativeRejected,1);assert.equal(effect,1);assert.equal(c.snapshot().allowed,undefined);
+ let invoked=false;const native={execute(){invoked=true;}};c.root(native,{phase:'setup',deadline:null,kind:'transport'});JSON.stringify(c.snapshot());assert.equal(invoked,false);
+ const thenable={then(resolve){resolve(7);return Promise.resolve();}},third=begin(c,r,null,'setup',performance.now());assert.equal(observeBudgetPromise(c,third,thenable),thenable);assert.equal(c.snapshot().totals.nativeSettled,3);
+ const typed=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),typedRoot=typed.root({},{phase:'mcp_read',deadline:null,kind:'transport'});let calls=0;
+ const limiter={limit(){calls++;return Promise.resolve(Object.freeze({success:false}));}},limiterActual=limiter.limit(),limitRef=typed.begin(typedRoot,null,{phase:'mcp_read',resourceClass:'rateLimiter',operation:'limit',at:performance.now()});
+ assert.equal(observeBudgetPromise(typed,limitRef,limiterActual),limiterActual);assert.equal((await limiterActual).success,false);assert.equal(calls,1);
+ const rpcError=Error('same RPC error'),rpc={invoke(){calls++;return Promise.reject(rpcError);}},rpcActual=rpc.invoke(),rpcRef=typed.begin(typedRoot,null,{phase:'mcp_read',resourceClass:'DO',operation:'rpc',at:performance.now()});
+ assert.equal(observeBudgetPromise(typed,rpcRef,rpcActual),rpcActual);await assert.rejects(rpcActual,error=>error===rpcError);assert.equal(calls,2);assert.equal(typed.snapshot().totals.nativeRejected,1);assert.equal(typed.snapshot().totals.logicalDenied,0,'native limiter result is not a Source denial event');
+
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),lease={},req={},order=[],value=Object.freeze({same:true}),actualNative=Promise.resolve(value);
+ runtime.clock(lease,30000);
+ const holder={};function method(arg){order.push('native');assert.equal(this,holder);assert.equal(arg,17);return actualNative;}
+ Object.defineProperty(holder,'get',{get(){order.push('getter');return method;}});
+ runtime.nativeHolder(holder,'KV');
+ const observed=runtime.control(lease,'authorize_get',req,()=>runtime.member(holder,'get',{operation:'get'})((order.push('argument'),17)));
+ assert.equal(observed,actualNative);assert.equal(await observed,value);assert.deepEqual(order,['getter','argument','native']);
+ const nativeError=Error('same synchronous native error'),bad={get(){throw nativeError;}};runtime.nativeHolder(bad,'KV');
+ assert.throws(()=>runtime.run(lease,()=>runtime.member(bad,'get',{operation:'get'})()),e=>e===nativeError);
+ const callbackThis={},tx={},nativeTransaction=Promise.resolve('transaction committed');let received;
+ const transactionHolder={transaction(callback){received=callback;Reflect.apply(callback,callbackThis,[tx]);return nativeTransaction;}};
+ runtime.nativeHolder(transactionHolder,'DO','storage');
+ function callback(argument){assert.equal(this,callbackThis);assert.equal(argument,tx);runtime.transactionArgument(argument);}
+ const actualTransaction=runtime.run(lease,()=>runtime.member(transactionHolder,'transaction',{operation:'transaction'})(callback));
+ assert.equal(actualTransaction,nativeTransaction);assert.equal(received,callback);await actualTransaction;
+ let bottom;const outer={get(){bottom=runtime.member(holder,'get',{operation:'get'})(17);return bottom.then(v=>v);}};runtime.facadeHolder(outer,['get']);
+ const outerActual=runtime.run(lease,()=>runtime.member(outer,'get',{operation:'get'})());
+ assert.notEqual(outerActual,bottom);assert.equal(await outerActual,value);
+ const snapshot=runtime.snapshot();assert.equal(snapshot.totals.nativeStarted,4,'outer facade ACK is not a second native row');assert.equal(snapshot.totals.nativeRejected,1);assert.equal(snapshot.coverage.unattributed,0);
+
+ await coldFacadeBinding();
+});
+test('Q6 retained record bounds preserve native identity, observed metrics and omission evidence',async()=>{
+ const bounded=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1});
+ const metaForBound={phase:'setup',deadline:30000,kind:'control'};
+ const firstLease={},firstRef=bounded.root(firstLease,metaForBound);
+ for(let event=1;event<16385;event++)bounded.root(firstLease,metaForBound);
+ const laterRoot=bounded.root({},metaForBound);
+ assert(laterRoot,'retention must not drop a legitimate new Root after 16384 collector calls');
+ assert.notEqual(laterRoot,firstRef);
+
+
+ const early=begin(bounded,firstRef,null,'setup',0);
+ const lateChild=bounded.child(laterRoot,{}, {deadline:5000});
+ const late=begin(bounded,laterRoot,lateChild,'setup',0);
+ const newest=bounded.root({},metaForBound);assert(newest);const newestChild=bounded.child(newest,{}, {deadline:5000});assert(newestChild);
+ const third=begin(bounded,newest,newestChild,'setup',0);assert(third);bounded.settle(third,{at:7,status:'fulfilled'});
+ bounded.settle(early,{at:10,status:'fulfilled'});
+ const promise=Promise.resolve('original native output');assert.equal(observeBudgetPromise(bounded,late,promise),promise);assert.equal(await promise,'original native output');
+ bounded.settle(late,{at:100,status:'rejected'});
+ const kept=bounded.snapshot();assert.deepEqual(bounded.snapshot(),kept);
+ assert.equal(kept.retention.operationRows.limit,1);assert.equal(kept.retention.operationRows.retained,1);assert.equal(kept.retention.operationRows.omitted,2);
+ assert.equal(kept.retention.firstOmission.kind,'operation');assert.equal(kept.retention.firstOmission.ordinal,kept.retention.operationRows.firstOmittedOrdinal);
+ assert.equal(kept.totals.nativeStarted,3);assert.equal(kept.totals.nativeSettled,3);assert.equal(kept.totals.nativeRejected,0);assert.equal(kept.totals.peak,3);
+ assert(kept.totals.scopes.some(scope=>scope.rootOrdinal===3&&scope.childOrdinal===2&&scope.nativeSettled===1));
+ assert.equal(kept.rows[0].settledAt,10);assert.equal(kept.coverage.invalid,0);
+ assert.equal(verifyObservedBudgetMetrics(kept).traceComplete,false);assert.throws(()=>verifyCompleteBudgetTrace(kept),/incomplete retained trace/);
+
+ const limited=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1,maxScopes:1,maxGuards:1});
+ const one=limited.root({},metaForBound),two=limited.root({},metaForBound);
+ const single=begin(limited,one,null,'setup',0),other=begin(limited,two,null,'setup',0);
+ limited.scopeLogical(two,null,{phase:'setup',at:0,reason:'guard'});limited.scopeLogical(two,null,{phase:'setup',at:0,reason:'guard'});
+ limited.scopeLogical(two,null,{phase:'restore',at:0,reason:'denied'});limited.scopeLogical(one,null,{phase:'setup',at:0,reason:'guard'});
+ limited.settle(other,{at:0,status:'fulfilled'});limited.settle(single,{at:0,status:'fulfilled'});
+ const lost=limited.snapshot();assert.deepEqual(lost.retention.firstOmission,{event:'begin',ordinal:4,kind:'scope'});
+ assert.equal(lost.retention.operationRows.firstOmittedOrdinal,4);assert.equal(lost.retention.scopeRows.omitted,1);
+ assert.equal(lost.retention.guardRows.omitted,3);assert.equal(lost.totals.deniedScopes,3);assert.equal(lost.totals.scopeGuardEvents,4);
+ assert.equal(lost.coverage.invalid,0);assert.equal(lost.coverage.observedMetricsComplete,false);
+ assert.throws(()=>verifyObservedBudgetMetrics(lost),/incomplete observed metrics/);
+ const hidden={get reason(){throw Error('private reason');},toString(){throw Error('private label');}};
+ limited.incomplete(hidden);limited.bytes(null,{});const losses=limited.snapshot();
+ assert.equal(losses.chronology.reasons.unknown,1);assert.equal(losses.chronology.reasons.bytesInput,1);
+ assert.deepEqual(losses.chronology.firstInvalid,{event:'incomplete',ordinal:11,reason:'unknown',relation:'afterRetentionOmission'});
+ assert(!JSON.stringify(losses).includes('private'));
+ const bad=createBudgetDiagnostics({}).snapshot();assert.equal(bad.chronology.firstInvalid.ordinal,0);assert.equal(bad.chronology.firstInvalid.reason,'constructorOptions');
+ const overflow=createBudgetDiagnostics({testRevision:revision,workerRole:'fixture'}),oroot=overflow.root({},metaForBound);
+ const read=overflow.begin(oroot,null,{phase:'setup',resourceClass:'transport',operation:'read',at:0});
+ overflow.bytes(read,{length:Number.MAX_SAFE_INTEGER,chunks:1,durationMs:0});overflow.bytes(read,{length:1,chunks:1,durationMs:0});
+ assert.equal(overflow.snapshot().coverage.numericOverflow,true);assert.equal(overflow.snapshot().coverage.observedMetricsComplete,false);
+ assert.throws(()=>verifyObservedBudgetMetrics(overflow.snapshot()),/numeric overflow/);
+ let capGetterCalls=0;const capInput=Object.defineProperty({testRevision:revision,workerRole:'QA'},'maxRows',{get(){capGetterCalls++;throw Error('private');}});
+ assert.equal(createBudgetDiagnostics(capInput).snapshot().coverage.invalid,1);assert.equal(capGetterCalls,0);
+ for(const stale of [{maxEvents:16384},{diagnosticCandidate:'cap32768'},{maxScopes:0},{maxGuards:16385}]){
+  const fallback=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',...stale}).snapshot();
+  assert.equal(fallback.coverage.observedMetricsComplete,false);assert.equal(fallback.chronology.firstInvalid.reason,'constructorOptions');
+ }
+ const falseClaim=structuredClone(lost);falseClaim.coverage.observedMetricsComplete=true;
+ assert.throws(()=>verifyObservedBudgetMetrics(falseClaim),/completeness flag/);
+ const corrupt=structuredClone(kept);let proofGetterCalls=0;
+ Object.defineProperty(corrupt.rows[0],'capability',{enumerable:true,get(){proofGetterCalls++;throw Error('private');}});
+ assert.throws(()=>verifyObservedBudgetMetrics(corrupt),/closed data fields/);assert.equal(proofGetterCalls,0);
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'fixture'});
+ const promised=Promise.resolve(17);let effects=0;
+ const preserved=runtime.run({},()=>runtime.direct(()=>{effects++;return promised;},{})());
+ assert.equal(preserved,promised);assert.equal(await preserved,17);assert.equal(effects,1);
+ assert.equal(runtime.snapshot().chronology.reasons.runMissingLease,1);assert.equal(runtime.snapshot().chronology.reasons.invocationIdentity,1);
+ assert.throws(()=>verifyObservedBudgetMetrics(runtime.snapshot()),/incomplete observed metrics/);
+ const readerRuntime=createBudgetRuntime({testRevision:revision,workerRole:'QA',maxRows:1});
+ const token=Promise.resolve(19);
+ let underlyingCalls=0,siteGetterRuns=0,coercions=0;
+ const receiver={getReader(){assert.equal(this,receiver);underlyingCalls++;return token;}};
+ const invokeReader=metadata=>readerRuntime.member(receiver,'getReader',metadata)();
+ assert.equal(invokeReader({edge:'reader',readerSite:1}),token);
+ const startedReader=readerRuntime.snapshot();
+ assert.equal(startedReader.chronology.readerOrigins?.firstReaderOrigin?.site,1,'missing fixed reader-site provenance');
+ assert.deepEqual(startedReader.chronology.readerOrigins.firstReaderOrigin,{ordinal:1,relation:'beforeRetentionOmission',site:1,context:'no_store'});
+ assert.equal(startedReader.chronology.eventCalls,1);assert.equal(startedReader.coverage.invalid,1);
+ const leaseForReader={};readerRuntime.root(leaseForReader,'setup',null);
+ const readerRoot=readerRuntime.collector.root(leaseForReader,{phase:'setup',deadline:null,kind:'control'});
+ begin(readerRuntime.collector,readerRoot,null,'setup',0);begin(readerRuntime.collector,readerRoot,null,'setup',0);
+ assert.equal(readerRuntime.run(leaseForReader,()=>invokeReader({edge:'reader',readerSite:2})),token);
+ const accessorSite=Object.defineProperty({edge:'reader'},'readerSite',{get(){siteGetterRuns++;throw Error('private site');}});
+ assert.equal(invokeReader(accessorSite),token);
+ assert.equal(invokeReader({edge:'reader',readerSite:{toString(){coercions++;throw Error('private label');}}}),token);
+ const doneReader=readerRuntime.snapshot(),origin=doneReader.chronology.readerOrigins;
+ assert.equal(await token,19);assert.equal(underlyingCalls,4);assert.equal(siteGetterRuns,0);assert.equal(coercions,0);
+ assert.deepEqual(readerRuntime.snapshot(),doneReader);
+ assert.equal(doneReader.chronology.eventCalls,8);assert.equal(doneReader.chronology.byEvent.incomplete,4);
+ assert.deepEqual(doneReader.retention.firstOmission,{ordinal:5,event:'begin',kind:'operation'});
+ assert.equal(doneReader.chronology.reasons.readerOrigin,4);assert.equal(doneReader.coverage.invalid,4);assert.equal(doneReader.coverage.unattributed,4);
+ assert.equal(origin.beforeRetentionOmission[1],1);assert.equal(origin.afterRetentionOmission[2],1);assert.equal(origin.afterRetentionOmission[0],2);
+ assert.equal(origin.beforeRetentionOmission.reduce((sum,n)=>sum+n,0),1);assert.equal(origin.afterRetentionOmission.reduce((sum,n)=>sum+n,0),3);
+ assert(!JSON.stringify(origin).includes('private'));
+ const scopedReader=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),activeLease={};
+ scopedReader.root(activeLease,'setup',null);
+ assert.equal(scopedReader.run(activeLease,()=>scopedReader.member(receiver,'getReader',{edge:'reader',readerSite:2})()),token);
+ assert.deepEqual(scopedReader.snapshot().chronology.readerOrigins.firstReaderOrigin,{ordinal:2,relation:'beforeRetentionOmission',site:2,context:'rooted'});
+
+ const exclusion=createBudgetRuntime({testRevision:revision,workerRole:'QA'});
+ const argument={},sentinel=Promise.resolve('reader value'),nativeFailure=Error('native failure');
+ let unsupportedCalls=0;
+ const unowned={getReader(value){assert.equal(this,unowned);unsupportedCalls++;if(value===nativeFailure)throw nativeFailure;assert.equal(value,argument);return sentinel;}};
+ const readUnowned=value=>exclusion.member(unowned,'getReader',{edge:'reader',readerSite:45})(value);
+ assert.equal(exclusion.fixture(()=>readUnowned(argument)),sentinel);
+ assert.throws(()=>exclusion.fixture(()=>readUnowned(nativeFailure)),error=>error===nativeFailure);
+ const ignored=exclusion.snapshot();
+ assert.equal(ignored.coverage.invalid,0,'declared fixture-only missing reader must not count as an invalid');
+ assert.equal(ignored.coverage.unattributed,0);assert.equal(ignored.chronology.eventCalls,0);assert.equal(ignored.chronology.reasons.readerOrigin,0);
+ assert.equal(ignored.chronology.readerOrigins.firstReaderOrigin,null);assert(ignored.chronology.readerOrigins.beforeRetentionOmission.every(n=>n===0));
+ assert(ignored.chronology.readerOrigins.afterRetentionOmission.every(n=>n===0));
+ assert.equal(readUnowned(argument),sentinel);assert.equal(await sentinel,'reader value');assert.equal(unsupportedCalls,3);
+ const exposed=exclusion.snapshot();assert.equal(exposed.coverage.invalid,1);assert.equal(exposed.coverage.unattributed,1);
+ assert.equal(exposed.chronology.reasons.readerOrigin,1);assert.equal(exposed.chronology.readerOrigins.beforeRetentionOmission[45],1);
+ assert.deepEqual(exposed.chronology.readerOrigins.firstReaderOrigin,{ordinal:1,relation:'beforeRetentionOmission',site:45,context:'no_store'});
+
+ const ownerRuntime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),ownerRoot={},ownerChild={};
+ ownerRuntime.root(ownerRoot,'authorize_get',30000);ownerRuntime.descendant(ownerRoot,ownerChild,5000);
+ const value={done:true},readPromise=Promise.resolve(value);let reads=0,factories=0,fetches=0;
+ const ownedReader={read(){assert.equal(this,ownedReader);reads++;return readPromise;}};
+ const ownedStream={getReader(option){assert.equal(this,ownedStream);assert.equal(option,argument);factories++;return ownedReader;}};
+ const ownedResponse={body:ownedStream},fetchPromise=Promise.resolve(ownedResponse);
+ const source={fetch(){assert.equal(this,source);fetches++;return fetchPromise;}};
+ ownerRuntime.nativeHolder(source,'CFversion');
+ const fetchResult=ownerRuntime.run(ownerChild,()=>ownerRuntime.member(source,'fetch',{operation:'fetch',resource:'CFversion'})());
+ assert.equal(fetchResult,fetchPromise);assert.equal(await fetchResult,ownedResponse);
+ const heldReader=ownerRuntime.fixture(()=>ownerRuntime.member(ownerRuntime.body(ownedResponse),'getReader',{edge:'reader',readerSite:45})(argument));
+ assert.equal(heldReader,ownedReader);
+ const observedRead=ownerRuntime.member(heldReader,'read',{operation:'read',exposedBytes:true})();
+ assert.equal(observedRead,readPromise);assert.equal(await observedRead,value);assert.deepEqual([fetches,factories,reads],[1,1,1]);
+ const routed=ownerRuntime.snapshot();assert.equal(routed.coverage.invalid,0);assert.equal(routed.coverage.unattributed,0);
+ assert.equal(routed.rows.length,2);const [outbound,bodyRead]=routed.rows;
+ assert.equal(bodyRead.fetchOpOrdinal,outbound.opOrdinal);assert.equal(bodyRead.rootOrdinal,outbound.rootOrdinal);assert.equal(bodyRead.childOrdinal,outbound.childOrdinal);
+ assert.equal(bodyRead.childDeadline,5000);assert.equal(bodyRead.rootDeadline,30000);assert.equal(bodyRead.phase,'authorize_get');assert.equal(bodyRead.resourceClass,'CFversion');
+
+});
+test('Q7 bounded UTF8 summary hashes the exact complete JSON written',async t=>{
+ const path='output/finite-budget/q7-evidence.json';t.after(()=>rm(path,{force:true}));const full={purpose:'SYN',payload:'ñ'.repeat(10000),nested:{preserved:true}},before=JSON.stringify(full),result=await persistBudgetEvidence({path,full,testRevision:revision,caseName:'Q7',counts:{tests:1,pass:1,unsafe:'SECRET_Q7'}});
+ const bytes=await readFile(path);assert.equal(result.bytes,bytes.length);assert.equal(result.sha256,createHash('sha256').update(bytes).digest('hex'));assert.deepEqual(JSON.parse(bytes),full);assert.equal(JSON.stringify(full),before);assert(Buffer.byteLength(result.summary,'utf8')<=2048);assert(!result.summary.includes('SECRET_Q7'));
+ await assert.rejects(persistBudgetEvidence({path:'output/finite-budget/../../escape.json',full,testRevision:revision,caseName:'Q7'}));
+});
+test('Q8 opaque wire bytes and linked body invocations preserve interval and byte denominators',async()=>{
+ const {c,r,child}=fixture(),phase='authorize_get',resourceClass='CFversion';
+ const fetch=c.begin(r,child,{phase,resourceClass,operation:'fetch',at:0});
+ c.settle(fetch,{at:1,status:'fulfilled'});
+ const a=c.begin(r,child,{phase,resourceClass,operation:'read',at:2,fetchOpRef:fetch}),b=c.begin(r,child,{phase,resourceClass,operation:'read',at:3,fetchOpRef:fetch});
+ c.bytes(a,{length:12,chunks:1,durationMs:8});
+ const cancel=c.begin(r,child,{phase,resourceClass,operation:'cancel',at:6,fetchOpRef:fetch});c.cancel(fetch,{at:6,stage:'started'});
+ let s=c.snapshot();assert.equal(s.totals.active,3,'headers settle does not settle pending reads or cancellation');assert.equal(s.rows[0].status,'fulfilled');assert.equal(s.rows[3].status,'pending');
+ c.settle(b,{at:8,status:'fulfilled'});c.settle(cancel,{at:9,status:'fulfilled'});c.cancel(fetch,{at:9,stage:'settled'});c.settle(a,{at:10,status:'fulfilled'});
+ s=c.snapshot();assert.equal(s.rows[0].nativeBytesRead,null,'no additive duplicate fetch bytes');assert.equal(s.rows[2].nativeBytesRead,null);assert.equal(s.rows[2].nativeBytesReason,'not_exposed_by_native_api');assert.equal(s.rows[1].nativeBytesRead,12);
+ assert.equal(s.totals.nativeBytesRead,12);assert.equal(s.coverage.nativeBytesUnavailable,3);assert.equal(s.totals.peak,3);assert.equal(s.totals.scopes[0].peak,3);assert.equal(s.totals.nativeDurationSumMs,17);assert.equal(s.totals.observedWallMs,10);assert.equal(s.totals.cancelSettled,1);
+ assert.deepEqual(s.rows.map(v=>v.fetchOpOrdinal),[null,1,1,1]);assert.equal(s.totals.nativeStarted,4);assert.equal(s.totals.nativeSettled,4);
+ const foreign=fixture(),other=foreign.c.begin(foreign.r,null,{phase,resourceClass,operation:'fetch',at:0});
+ assert.equal(c.begin(r,child,{phase,resourceClass,operation:'read',at:11,fetchOpRef:other}),null);
+ assert.equal(c.begin(r,child,{phase:'setup',resourceClass,operation:'read',at:11,fetchOpRef:fetch}),null);
+ assert.equal(c.begin(r,null,{phase,resourceClass,operation:'cancel',at:11,fetchOpRef:fetch}),null);
+ assert.equal(c.begin(r,child,{phase,resourceClass:'KV',operation:'read',at:11,fetchOpRef:fetch}),null);
+ assert.equal(c.snapshot().coverage.unattributed,4);assert.equal(c.snapshot().totals.nativeStarted,4);
+ const beforeBytes=c.snapshot().coverage.invalid;c.bytes(fetch,{length:12,chunks:1,durationMs:1});c.bytes(cancel,{length:12,chunks:1,durationMs:1});assert.equal(c.snapshot().coverage.invalid,beforeBytes+2);assert.equal(c.snapshot().totals.nativeBytesRead,12);
+ const inbound=c.begin(r,child,{phase,resourceClass:'transport',operation:'read',at:12});assert(inbound,'inbound Request body has no outbound fetch');c.settle(inbound,{at:13,status:'fulfilled'});assert.equal(c.snapshot().rows.at(-1).fetchOpOrdinal,null);
+
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'M'}),lease={},request={},response=new Response(new Uint8Array([1,2,3]));
+ let bodyGets=0;const bodyGetter=Object.getOwnPropertyDescriptor(Response.prototype,'body').get;
+ Object.defineProperty(response,'body',{get(){bodyGets++;return Reflect.apply(bodyGetter,this,[]);}});
+ const nativeFetch=Promise.resolve(response),fetcher={fetch(){return nativeFetch;}};runtime.nativeHolder(fetcher,'CFversion');runtime.clock(lease,30000);
+ const returned=runtime.control(lease,'authorize_get',request,()=>runtime.member(fetcher,'fetch',{operation:'fetch',resource:'CFversion'})());
+ assert.equal(returned,nativeFetch);await returned;assert.equal(bodyGets,0,'registration does not access body');
+ assert.equal(runtime.snapshot().totals.active,0,'fetch settles at headers');
+ await runtime.run(lease,async()=>{
+  const stream=runtime.body(response);assert.equal(bodyGets,1);
+  const reader=runtime.member(stream,'getReader',{edge:'reader'})();
+  const first=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.deepEqual([...first.value],[1,2,3]);
+  const eof=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.equal(eof.done,true);
+  await runtime.member(reader,'cancel',{operation:'cancel'})();
+ });
+ const nativeRows=runtime.snapshot();assert.equal(nativeRows.coverage.unattributed,0);assert.equal(nativeRows.totals.nativeStarted,4);assert.equal(nativeRows.totals.nativeSettled,4);assert.equal(nativeRows.totals.nativeBytesRead,3);assert.deepEqual(nativeRows.rows.map(r=>r.fetchOpOrdinal),[null,1,1,1]);assert.equal(nativeRows.rows[0].nativeBytesRead,null);assert.equal(nativeRows.totals.cancelStarted,1);assert.equal(nativeRows.totals.cancelSettled,1);
+
+ assert.equal(verifyCompleteBudgetTrace(nativeRows).level,'complete_trace');
+ const wrongLink=structuredClone(nativeRows);wrongLink.rows[1].fetchOpOrdinal=wrongLink.rows[1].opOrdinal;
+ assert.throws(()=>verifyObservedBudgetMetrics(wrongLink),/fetch parent/);
+
+});
+
+async function coldSourceExpressions(kind, controls=''){
+ const ts=(await import('typescript')).default;
+ const {transformBudgetPreparedSource}=await import('./fixtures/finite-budget-world.mjs');
+ const [file,pin]=kind==='initial'
+  ?['lib/mcp-qa-finite-initial-cleanup.mjs','f0e8a2720987d13d0011c437abd3c5ef7d1452493b3c0e67b5da5d319e474de5']
+  :['lib/mcp-qa-finite-owner-cleanup-journal.mjs','e40290e120266cd57bceb6faa5ea3c871ddd8aa00c9d02e98094aaf11dd4c888'];
+ const raw=await readFile(file,'utf8');
+ assert.equal(createHash('sha256').update(raw).digest('hex'),pin);
+ const emitted=transformBudgetPreparedSource(raw+controls,file,'QA').source;
+ const ast=ts.createSourceFile(file,emitted,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
+ assert.equal(ast.parseDiagnostics.length,0);
+ function exactly(predicate){
+  const found=[];
+  function visit(node){if(predicate(node))found.push(node);ts.forEachChild(node,visit);}
+  visit(ast);assert.equal(found.length,1,'unique emitted expression');return found[0];
+ }
+ function expression(node,bindings){
+  return Function(...Object.keys(bindings),'"use strict";return ('+node.getText(ast)+');')(...Object.values(bindings));
+ }
+ const transaction=exactly(n=>ts.isCallExpression(n)&&ts.isArrayLiteralExpression(n.arguments[2]??ast)&&ts.isArrowFunction(n.arguments[2].elements[0]??ast)&&n.expression.getText(ast).startsWith('__afwBudget.reflect('));
+ return {ts,ast,exactly,expression,transaction};
+}
+
+function memoryScope(){
+ const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),root={},child={};
+ runtime.root(root,'cleanup_before_restore',30000);
+ runtime.descendant(root,child,5000);
+ return {runtime,root,child};
+}
+
+async function coldTransactionCallback(){
+ const journal=await coldSourceExpressions('journal'),initial=await coldSourceExpressions('initial');
+ const {runtime,child}=memoryScope();
+ const operations=[];
+ const tx={
+  get(key){assert.equal(this,tx);operations.push(key);return Promise.resolve('same');},
+  put(){assert.fail('existing journal record must stay untouched');},list(){assert.fail('unexpected list');}
+ };
+ let actual;
+ const storage={transaction(callback){assert.equal(this,storage);actual=callback(tx);return actual;}};
+ runtime.nativeHolder(storage,'DO','storage');
+ const c={storage,transaction:runtime.readMethod(storage,'transaction'),actorId:1,qa:2,wait:promise=>promise};
+ const read=runtime.run(child,()=>journal.expression(journal.transaction,{
+  __afwBudget:runtime,c,g:()=>{},inventory:async()=>({}),kind:'Identity',id:1,v:{preconnectionId:1,actorId:1,qaVersionId:2},
+  prefix:()=>'',suffix:'receipt',raw:'same',fail:()=>assert.fail('unexpected journal control')
+ }));
+ assert.equal(read,actual);assert.equal(await read,'existing');assert.deepEqual(operations,['receipt']);
+ const result=runtime.snapshot();
+ // Recognized native transaction form has distinct, freshly allocated method identities.
+ const control=memoryScope(),calls=[];
+ const nativeTx={get(key){assert.equal(this,nativeTx);calls.push(key);return Promise.resolve(key==='head'?undefined:'plan');},put(){},setAlarm(){},deleteAlarm(){}};
+ const nativeStorage={transaction(callback){assert.equal(this,nativeStorage);return callback(nativeTx);}};
+ control.runtime.nativeHolder(nativeStorage,'DO','storage');
+ const ok=control.runtime.run(control.child,()=>initial.expression(initial.transaction,{
+  __afwBudget:control.runtime,storage:nativeStorage,transaction:control.runtime.readMethod(nativeStorage,'transaction'),
+  parent:{retain:value=>value},current:()=>{},l:control.child,HEAD:'head',P:'',p:{},encode:()=>'plan',work:()=>123,fail:()=>assert.fail('unexpected control')
+ }));
+ assert.equal(await ok,123);assert.deepEqual(calls,['head','plan']);
+ assert.deepEqual(control.runtime.snapshot().rows.map(r=>[r.operation,r.rootOrdinal,r.childOrdinal]),[['transaction',1,1],['get',1,1],['get',1,1]]);
+ let unknown=0;control.runtime.run(control.child,()=>control.runtime.member({get(){unknown++;}},'get',{operation:'get'})());
+ assert.equal(unknown,1);assert.equal(control.runtime.snapshot().chronology.reasons.invocationIdentity,1);
+ assert.deepEqual([result.chronology.reasons.invocationIdentity,...result.rows.map(r=>[r.operation,r.status,r.rootOrdinal,r.childOrdinal])],
+  [0,['transaction','fulfilled',1,1],['get','fulfilled',1,1]],'cold-B cleanup journal callback attribution');
+}
+
+async function coldFacadeBinding(){
+ const initial=await coldSourceExpressions('initial'),{ts,ast,exactly,expression}=initial;
+ const facadeCall=exactly(n=>ts.isCallExpression(n)&&n.expression.getText(ast)==='work'&&n.arguments[0]?.getText(ast).includes('alarm:'));
+ const wrapper=exactly(n=>ts.isVariableDeclaration(n)&&n.name.getText(ast)==='put'&&ts.isArrowFunction(n.initializer??ast)&&n.initializer.getText(ast).includes('tp'));
+ const putCall=exactly(n=>ts.isCallExpression(n)&&ts.isCallExpression(n.expression)&&n.expression.expression.getText(ast)==='__afwBudget.member'&&n.expression.arguments[0]?.getText(ast)==='tx'&&n.expression.arguments[1]?.text==='put'&&n.arguments[1]?.getText(ast).includes('next'));
+ const controls=await coldSourceExpressions('initial',"\nfunction coldExplicit(put){return {put(...args){return Reflect.apply(put,this,args);}};}\nfunction coldAlias(put){return {put};}\n");
+ const controlFunction=name=>controls.exactly(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);
+ async function probe(mode){
+  const {runtime,child}=memoryScope(),effects=[],value=Object.freeze({}),nativeResult=Promise.resolve(value);
+  const tx={put(...args){effects.push({receiver:this,args});return nativeResult;}};
+  runtime.nativeHolder(tx,'DO','transaction');
+  const tp=runtime.readMethod(tx,'put');
+  let originalPromise,enteredThis,nativePromise,unknownCalls=0;
+  const put=expression(wrapper.initializer,{__afwBudget:runtime,check:()=>{},tp,tx,parent:{retain(p){nativePromise=p;return p;}}});
+  const watched=new Proxy(put,{apply(target,receiver,args){enteredThis=receiver;originalPromise=Reflect.apply(target,receiver,args);return originalPromise;}});
+  let adapter;
+  const generate=(name,fn)=>controls.expression(controlFunction(name),{__afwBudget:runtime})(fn);
+  if(mode==='wrapper')adapter=expression(facadeCall.arguments[0],{__afwBudget:runtime,r:()=>{},put:watched});
+  if(mode==='explicit')adapter=generate('coldExplicit',watched);
+  if(mode==='alias')adapter=generate('coldAlias',tp);
+  if(mode==='unknown')adapter=generate('coldAlias',function(){unknownCalls++;return nativeResult;});
+  const observed=runtime.run(child,()=>expression(putCall,{__afwBudget:runtime,tx:adapter,P:'',encode:(_kind,v)=>v,next:value}));
+  if(mode==='wrapper'||mode==='explicit'){
+   assert.equal(enteredThis,adapter);assert.equal(observed,originalPromise);assert.equal(nativePromise,nativeResult);assert.equal(await observed,undefined);
+  }else{assert.equal(observed,nativeResult);assert.equal(await observed,value);}
+  if(mode==='unknown'){assert.equal(unknownCalls,1);assert.deepEqual(effects,[]);}
+  else{assert.equal(effects.length,1);assert.equal(effects[0].receiver,mode==='alias'?adapter:tx);assert.deepEqual(effects[0].args,['state',value]);}
+  const snapshot=runtime.snapshot();
+  assert(snapshot.rows.every(row=>row.operation==='put'&&row.rootOrdinal===1&&row.childOrdinal===1&&row.status==='fulfilled'));
+  return [snapshot.totals.nativeStarted,snapshot.totals.nativeSettled,snapshot.chronology.reasons.invocationIdentity];
+ }
+ assert.deepEqual(await probe('explicit'),[1,1,0]);
+ assert.deepEqual(await probe('alias'),[1,1,0]);
+ assert.deepEqual(await probe('unknown'),[0,0,1]);
+ assert.deepEqual(await probe('wrapper'),[1,1,0],'cold-A shorthand local wrapper attribution');
+}
+
+async function coldPhaseReentry(){
+ const {runtime,root,child}=memoryScope(),nested={},alias={},other={},error=Error('fixed phase check');
+ runtime.descendant(child,nested,4000);runtime.alias(child,alias);runtime.root(other,'monitoring_post',31000);
+ const value={},rejected=Promise.reject(error);rejected.catch(()=>{});
+ const get={get(promise){return promise;}};runtime.nativeHolder(get,'KV');
+ const leaf=p=>runtime.member(get,'get',{operation:'get'})(p);
+ let release;
+ const pending=new Promise(resolve=>{release=resolve;});
+ const original=runtime.run(child,()=>runtime.phase('sdk_lookup',()=>runtime.run(child,()=>leaf(pending))));
+ assert.equal(original,pending);
+ const settled=Promise.resolve(value);
+ runtime.run(child,()=>{
+  runtime.phase('sdk_lookup',()=>{
+   assert.equal(runtime.run(nested,()=>leaf(settled)),settled);
+   assert.equal(runtime.run(alias,()=>leaf(settled)),settled);
+   assert.equal(runtime.run(other,()=>leaf(settled)),settled);
+   assert.throws(()=>runtime.run(nested,()=>{throw error;}),e=>e===error);
+   assert.equal(runtime.run(child,()=>leaf(rejected)),rejected);
+  });
+  assert.equal(leaf(settled),settled);
+ });
+ assert.equal(runtime.run(root,()=>leaf(settled)),settled);
+ release(value);assert.equal(await pending,value);await assert.rejects(rejected,e=>e===error);
+ const result=runtime.snapshot();
+ assert.equal(result.coverage.invalid,0);assert.equal(result.totals.nativeRejected,1);
+ assert.deepEqual(result.rows.map(r=>[r.rootOrdinal,r.childOrdinal,r.rootDeadline,r.childDeadline]),[
+  [1,1,30000,5000],[1,2,30000,4000],[1,1,30000,5000],[2,null,31000,null],[1,1,30000,5000],[1,1,30000,5000],[1,null,30000,null]]);
+ assert.deepEqual(result.rows.map(r=>r.phase),['sdk_lookup','sdk_lookup','sdk_lookup','monitoring_post','sdk_lookup','cleanup_before_restore','cleanup_before_restore'],'cold-C explicit phase same-root reentry');
+ const callback=function(){'use strict';return this;};
+ const receivers=[runtime.run(child,callback),runtime.run(child,()=>runtime.phase('sdk_lookup',callback)),runtime.run(child,()=>runtime.phase('sdk_lookup',()=>runtime.run(child,callback)))];
+ assert.deepEqual(receivers,[undefined,undefined,undefined],'cold-C original strict callback receiver');
+}
```

## test/finite-checkpoint-custody.test.mjs

```diff
diff --git a/test/finite-checkpoint-custody.test.mjs b/test/finite-checkpoint-custody.test.mjs
# before_blob=ABSENT after_blob=c913c94be080597704fbf7d370475443e1f1b96d
--- /dev/null
+++ b/test/finite-checkpoint-custody.test.mjs
@@ -0,0 +1,200 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createCipheriv,createHash,randomBytes} from 'node:crypto';
+import {mkdtemp,mkdir,writeFile,readFile,readdir,rm,symlink,link,stat,truncate,lstat} from 'node:fs/promises';
+import {join} from 'node:path';
+import {tmpdir} from 'node:os';
+import {spawnSync} from 'node:child_process';
+import {createServer} from 'node:net';
+import {gzipSync} from 'node:zlib';
+import {fileURLToPath} from 'node:url';
+
+const helper=new URL('./fixtures/finite-checkpoint-custody.mjs',import.meta.url);
+const purpose='afw.finite-checkpoint-custody.syn.v1';
+const context={purpose,repository:'tokenizartinfo-ops/agent-friendly-web',ref:'refs/heads/feat/finite-native-cleanup-20261101',sourceSha:'b'.repeat(40),runId:'17',runAttempt:1,kind:'checkpoint'};
+const marker='SYN-PRIVATE-EVIDENCE-MARKER';
+const fileNames=['envelope.bin','manifest.json','receipt.json'];
+const bytes=v=>Buffer.from(JSON.stringify(v));
+const sha=v=>createHash('sha256').update(v).digest('hex');
+const entry=(path,data)=>({path,bytes:data.length,sha256:sha(data),data:data.toString('base64')});
+const nonexistent=async path=>{try{await lstat(path);return false;}catch(error){if(error.code==='ENOENT')return true;throw error;}};
+const safeError=error=>error instanceof Error&&/^custody_[a-z_]+$/.test(error.message)&&!error.message.includes(marker);
+
+// Independently construct a SYN packet under the test's ephemeral key.
+// These path cases are input grammar checks; no external path is used by the fixture.
+function frames(inner){
+ const records=[{type:'header',version:1,context}];let total=0;
+ for(const file of inner.files){
+  const {path,bytes:count,sha256,data,...extra}=file;
+  records.push({type:'file',path,bytes:count,sha256,...extra});
+  if(data)records.push({type:'data',data});
+  records.push({type:'file-end',chunks:data?1:0});total+=count;
+ }
+ records.push({type:'end',files:inner.files.length,bytes:total});
+ return records;
+}
+function encodeLines(text,key,{compress=true,headerChanges={}}={}){
+ const iv=randomBytes(12);
+ const header=bytes({version:1,context,algorithm:'AES-256-GCM',compression:'gzip',iv:iv.toString('base64'),...headerChanges});
+ const prefix=Buffer.alloc(4);prefix.writeUInt32BE(header.length);
+ const cipher=createCipheriv('aes-256-gcm',key,iv,{authTagLength:16});cipher.setAAD(header);
+ return Buffer.concat([prefix,header,cipher.update(compress?gzipSync(text):Buffer.from(text)),cipher.final(),cipher.getAuthTag()]);
+}
+const jsonl=lines=>lines.map(row=>JSON.stringify(row)+'\n').join('');
+const encodePacket=(inner,key)=>encodeLines(jsonl(frames(inner)),key);
+async function stagePacket(folder,envelope,counts={fileCount:1,totalBytes:1},mutateReceipt=()=>{}){
+ await mkdir(folder,{mode:0o700});
+ const seal=envelope;
+ const receipt={purpose:'afw.finite-checkpoint-custody-receipt.syn.v1',context,envelopeBytes:seal.length,envelopeSha256:sha(seal),...counts,authenticated:true,innerInventoryVerified:true,operationalReadiness:false,completePackage:false,PCoff:false};
+ mutateReceipt(receipt);
+ const rec=bytes(receipt);
+ const manifest={purpose:'afw.finite-checkpoint-custody-manifest.syn.v1',context,files:[{path:'envelope.bin',bytes:seal.length,sha256:sha(seal)},{path:'receipt.json',bytes:rec.length,sha256:sha(rec)}]};
+ await Promise.all([writeFile(join(folder,'envelope.bin'),seal),writeFile(join(folder,'receipt.json'),rec),writeFile(join(folder,'manifest.json'),bytes(manifest))]);
+}
+
+test('SYN directory custody contract',async t=>{
+ let api;
+ try{api=await import(helper.href);}catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND'||error.url!==helper.href)throw Error('unexpected custody import failure');}
+ assert.equal(typeof api?.sealDirectory,'function','missing custody API');
+ assert.equal(typeof api?.openDirectory,'function','missing custody API');
+ const sandbox=await mkdtemp(join(tmpdir(),'afw-custody-syn-'));
+ const key=randomBytes(32),otherKey=randomBytes(32),keyEnv='AFW_SYN_CHECKPOINT_KEY';
+ const prior=process.env[keyEnv];process.env[keyEnv]=key.toString('hex');
+ t.after(async()=>{if(prior===undefined)delete process.env[keyEnv];else process.env[keyEnv]=prior;key.fill(0);otherKey.fill(0);await rm(sandbox,{recursive:true,force:true});});
+ const source=join(sandbox,'private'),stage=join(sandbox,'public'),sub=join(source,'datos');
+ await mkdir(sub,{recursive:true,mode:0o700});
+ const original=Buffer.concat([Buffer.from([0,255,1]),Buffer.from(marker),randomBytes(2*65536+19)]);
+ await writeFile(join(sub,'obra-ñ.bin'),original);await writeFile(join(source,'vacío'),Buffer.alloc(0));
+ const seal=(sourceDir,stagingDir,c=context)=>api.sealDirectory({sourceDir,stagingDir,context:c});
+ const open=(stagingDir,destinationDir,c=context)=>api.openDirectory({stagingDir,destinationDir,context:c});
+ const rejectNew=async(operation,dest)=>{await assert.rejects(operation,safeError);assert(await nonexistent(dest));};
+
+ await t.test('C1 closed staging, fresh IV and byte-exact authenticated roundtrip',async()=>{
+  const rec=await seal(source,stage);
+  assert.equal(rec.authenticated,true);assert.equal(rec.innerInventoryVerified,true);
+  assert.equal(rec.fileCount,2);assert.equal(rec.totalBytes,original.length);
+  for(const flag of ['operationalReadiness','completePackage','PCoff'])assert.equal(rec[flag],false);
+  assert.deepEqual((await readdir(stage)).sort(),fileNames);
+  const content=await Promise.all(fileNames.map(name=>readFile(join(stage,name))));
+  for(const item of content){assert(!item.includes(marker));assert(!item.includes('obra-ñ'));assert(!item.includes(key.toString('hex')));}
+  const readHeader=data=>JSON.parse(data.subarray(4,4+data.readUInt32BE(0)));
+  const envelope=readHeader(content[0]);assert.deepEqual(Object.keys(envelope).sort(),['algorithm','compression','context','iv','version']);
+  assert.equal(envelope.compression,'gzip');assert.equal(envelope.algorithm,'AES-256-GCM');assert.equal(Buffer.from(envelope.iv,'base64').length,12);
+  const alternate=join(sandbox,'second');await seal(source,alternate);
+  assert.notEqual(envelope.iv,readHeader(await readFile(join(alternate,'envelope.bin'))).iv);
+  const dest=join(sandbox,'restored');const receipt=await open(stage,dest);assert.deepEqual(receipt,rec);
+  assert((await readFile(join(dest,'datos','obra-ñ.bin'))).equals(original));assert.equal((await readFile(join(dest,'vacío'))).length,0);
+  assert.equal((await stat(dest)).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos'))).mode&0o777,0o700);assert.equal((await stat(join(dest,'datos','obra-ñ.bin'))).mode&0o777,0o600);
+ });
+
+ await t.test('C2 wrong key, absent key and every different context fail without output',async()=>{
+  const dest=join(sandbox,'bad-context');
+  for(const secret of [undefined,'',key.toString('hex').slice(2),key.toString('hex')+'\n',otherKey.toString('hex')]){
+   try{if(secret===undefined)delete process.env[keyEnv];else process.env[keyEnv]=secret;await rejectNew(()=>open(stage,dest),dest);}
+   finally{process.env[keyEnv]=key.toString('hex');}
+  }
+  for(const changes of [{sourceSha:'a'.repeat(40)},{runId:'18'},{runAttempt:2},{kind:'positive-result'},{repository:'unrelated/repo'},{ref:'refs/tags/fixture'},{extra:true}]){
+   await rejectNew(()=>open(stage,dest,{...context,...changes}),dest);
+  }
+ });
+
+ await t.test('C3 independent packet accepted and tampered IV, tag or ciphertext rejected',async()=>{
+  const data=Buffer.from([1]),inner={version:1,files:[entry('sample',data)]},envelope=encodePacket(inner,key);
+  const independent=join(sandbox,'independent');await stagePacket(independent,envelope);
+  await open(independent,join(sandbox,'independent-open'));
+  for(const field of ['iv','tag','ciphertext']){
+   const mutated=Buffer.from(envelope),headerEnd=4+mutated.readUInt32BE(0);
+   if(field==='iv'){
+    const header=JSON.parse(mutated.subarray(4,headerEnd)),changed=Buffer.from(header.iv,'base64');changed[0]^=1;header.iv=changed.toString('base64');bytes(header).copy(mutated,4);
+   }else mutated[field==='tag'?mutated.length-1:headerEnd]^=1;
+   const folder=join(sandbox,'tamper-'+field),dest=folder+'-open';
+   await stagePacket(folder,mutated);await rejectNew(()=>open(folder,dest),dest);
+  }
+ });
+
+ await t.test('C4 authenticated invalid internal records fail before any output',async()=>{
+  const ordinary=entry('sample',Buffer.from([1])),other=entry('other',Buffer.alloc(0));
+  const invalidPaths=['','/','C:example','x\\y','a//b','./a','inside/../inside','a\0b'];
+  const cases=[
+   ...invalidPaths.map(path=>[other,{...ordinary,path}]),
+   [ordinary,ordinary],[ordinary,{...other,path:'sample/child'}],
+   [ordinary,{...other,path:'other'}], // out of order
+   [{...ordinary,sha256:'0'.repeat(64)}],[{...ordinary,bytes:2}],
+   [{...ordinary,data:'AQ'}],[{...ordinary,data:'AR=='}],
+   [{...ordinary,type:'symlink'}],[{...ordinary,type:'fifo'}],
+   Array.from({length:4097},(_,i)=>({...other,path:'z'+String(i).padStart(5,'0')}))
+  ];
+  for(const [index,files] of cases.entries()){
+   const folder=join(sandbox,'inner-'+index),dest=folder+'-open';
+   await stagePacket(folder,encodePacket({version:1,files},key),{fileCount:files.length,totalBytes:files.reduce((n,row)=>n+row.bytes,0)});
+   await rejectNew(()=>open(folder,dest),dest);
+  }
+ });
+
+ await t.test('C5 strict bounded JSONL grammar, declared size, chunk scale and terminal EOF',async()=>{
+  const valid=frames({files:[entry('sample',Buffer.from([1]))]}),text=jsonl(valid);
+  const invalid=[
+   text.slice(0,-1),text+jsonl([{type:'extra'}]),jsonl(valid.slice(0,-1)),text.replace('"chunks":1','"chunks":2'),
+   text.replace('"files":1','"files":2'),text.replace('"bytes":1','"bytes":536870913'),
+   text.replace('{"type":"header"', '{"extra":false,"type":"header"'),
+   text.replace('"data":"AQ=="','"data":"'+Buffer.alloc(65537).toString('base64')+'"'),
+   text.replace('"data":"AQ=="','"data":"'+('x'.repeat(128*1024))+'"'),
+   jsonl([valid[0],valid[1],valid[1],...valid.slice(2)]),
+   jsonl([valid[0],valid[1],valid[2],valid[3],{...valid[1],path:'z',bytes:512*1024*1024},valid[4]])
+  ];
+  const dest=join(sandbox,'grammar-open');
+  const packets=invalid.map(value=>encodeLines(value,key));
+  packets.push(encodeLines(text,key,{compress:false}),encodeLines(text,key,{headerChanges:{compression:'identity'}}));
+  const unauthenticated=encodeLines(text,key,{compress:false});unauthenticated[unauthenticated.length-1]^=1;
+  const badTag=join(sandbox,'unauthenticated');await stagePacket(badTag,unauthenticated);
+  await assert.rejects(()=>open(badTag,dest),error=>error.message==='custody_authentication');assert(await nonexistent(dest));
+  for(const [i,packet] of packets.entries()){
+   const folder=join(sandbox,'grammar-'+i);await stagePacket(folder,packet);await rejectNew(()=>open(folder,dest),dest);
+  }
+ });
+
+ await t.test('C6 origin links, special files and over-limit inputs are rejected',async()=>{
+  const file=join(source,'vacío');
+  const blocked=async(name,make)=>{
+   const root=join(sandbox,'source-'+name),dest=join(sandbox,'stage-'+name);await mkdir(root);
+   await make(join(root,'entry'));await rejectNew(()=>seal(root,dest),dest);
+  };
+  await blocked('symlink',p=>symlink(file,p));
+  await blocked('hardlink',p=>link(file,p));await rm(join(sandbox,'source-hardlink','entry'));
+  await blocked('large',async p=>{await writeFile(p,'');await truncate(p,512*1024*1024+1);});
+  const root=join(sandbox,'socket'),dest=join(sandbox,'socket-output');await mkdir(root);
+  const socket=createServer();await new Promise((resolve,reject)=>{socket.once('error',reject);socket.listen(join(root,'sock'),resolve);});
+  try{await rejectNew(()=>seal(root,dest),dest);}finally{await new Promise(resolve=>socket.close(resolve));}
+ });
+
+ await t.test('C7 closed public inventory, totals, limits and exclusive destinations',async()=>{
+  const existing=join(sandbox,'existing');await mkdir(existing);await writeFile(join(existing,'preserve'),'untouched');
+  await assert.rejects(()=>open(stage,existing),safeError);await assert.rejects(()=>seal(source,existing),safeError);
+  assert.equal(await readFile(join(existing,'preserve'),'utf8'),'untouched');
+  const nested=join(source,'public-output');await rejectNew(()=>seal(source,nested),nested);
+  const unexpected=join(stage,'unexpected');await writeFile(unexpected,'x');
+  const dest=join(sandbox,'unexpected-open');await rejectNew(()=>open(stage,dest),dest);await rm(unexpected);
+  const envelope=encodePacket({version:1,files:[entry('sample',Buffer.from([1]))]},key);
+  const folder=join(sandbox,'wrong-receipt');await stagePacket(folder,envelope,{fileCount:1,totalBytes:1},r=>{r.fileCount=2;});
+  await rejectNew(()=>open(folder,dest),dest);
+  const caps=join(sandbox,'too-large-envelope');await stagePacket(caps,envelope);
+  await truncate(join(caps,'envelope.bin'),128*1024*1024+1);await rejectNew(()=>open(caps,dest),dest);
+ });
+
+ await t.test('C8 separate Node processes hand off sealed data and emit only fixed public output',async()=>{
+  const folder=join(sandbox,'child-stage'),dest=join(sandbox,'child-output');
+  const env={AFW_SYN_CHECKPOINT_KEY:key.toString('hex'),GITHUB_REPOSITORY:context.repository,GITHUB_REF:context.ref,GITHUB_SHA:context.sourceSha,GITHUB_RUN_ID:context.runId,GITHUB_RUN_ATTEMPT:'1'};
+  const child=(args,e=env)=>{
+   assert(!args.some(v=>v.includes(env.AFW_SYN_CHECKPOINT_KEY)));
+   const run=spawnSync(process.execPath,[fileURLToPath(helper),...args],{env:e,encoding:'utf8',timeout:15000});
+   const log=(run.stdout??'')+(run.stderr??'');assert(!log.includes(marker)&&!log.includes(env.AFW_SYN_CHECKPOINT_KEY)&&!log.includes(sandbox));
+   return {status:run.status,log};
+  };
+  assert.equal(child(['key-preflight','checkpoint']).status,0);
+  assert.equal(child(['seal','checkpoint',source,folder]).status,0);
+  assert.equal(child(['open','checkpoint',folder,dest]).status,0);
+  assert((await readFile(join(dest,'datos','obra-ñ.bin'))).equals(original));
+  const denied=child(['key-preflight','checkpoint'],{...env,AFW_SYN_CHECKPOINT_KEY:''});
+  assert.notEqual(denied.status,0);assert.match(denied.log,/custody_[a-z_]+/);
+ });
+});
```

## test/fixtures/finite-budget-diagnostics.mjs

```diff
diff --git a/test/fixtures/finite-budget-diagnostics.mjs b/test/fixtures/finite-budget-diagnostics.mjs
# before_blob=ABSENT after_blob=f9884aa893d6ab6d74597921cc8925bf05437eea
--- /dev/null
+++ b/test/fixtures/finite-budget-diagnostics.mjs
@@ -0,0 +1,413 @@
+import {AsyncLocalStorage} from 'node:async_hooks';
+const PURPOSE='afw.finite-budget-diagnostics.syn.v1';
+const CHRONOLOGY='afw.finite-budget-chronology.syn.v2';
+// IDs 1..54 are closed over the pinned compiler manifest. 0 denotes unknown.
+export const budgetReaderSiteCount=54;
+const READER_ORIGIN=Symbol('reader-origin');
+function readerSite(meta){
+ let value;
+ try{value=data(meta,'readerSite');}catch{return 0;}
+ return Number.isInteger(value)&&value>=1&&value<=budgetReaderSiteCount?value:0;
+}
+const EVENTS=['root','child','begin','bytes','logical','scopeLogical','cancel','settle','incomplete'];
+const INVALID_REASONS=new Set([
+ 'unknown','constructorOptions','collectorException','rootInput','childInput','childConflict','beginContext','beginMethodResource',
+ 'beginFetchLink','bytesInput','logicalInput','scopeLogicalInput','cancelInput','settleInput','settleTime','promiseThenMissing','promiseThenException',
+ 'descendantStore','descendantChild','runMissingLease','phaseStore','phaseValue','guardRoot','holderInput','holderConflict','captureInput',
+ 'captureConflict','facadeInput','localBodyStore','observerFulfilledCallback','observerRejectedCallback','observerThenException','dormantInvocation','cloneOrigin',
+ 'readerOrigin','holderIdentity','invocationIdentity','invocationRoot','methodPhase','clockLease','aliasStore','aliasChild','transportPhase','transactionContext','fetchResource',
+]);
+const counts=keys=>Object.fromEntries(Array.from(keys,key=>[key,0]));
+const splitCount=()=>({beforeRetentionOmission:0,afterRetentionOmission:0});
+const PHASES=new Set(['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory']);
+const PHASE_BITS=new Map([...PHASES].map((phase,index)=>[phase,1<<index]));
+const RESOURCES=new Set(['CFcredential','CFdeployment','CFversion','CFworkflow','CFcontainer','CFschedule','CFtail','GHsource','JWKS','DO','SQL','KV','transport','rateLimiter']);
+const OPERATIONS=new Set(['get','list','put','delete','first','all','run','sync','transaction','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel','batch','exec','rpc','limit']);
+const REASONS=new Set(['timeout','denied','aborted','guard']);
+const data=(value,key)=>{if(!value||typeof value!=='object')return undefined;const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;};
+const nativeObject=value=>value!==null&&(typeof value==='object'||typeof value==='function');
+const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
+const integer=value=>Number.isSafeInteger(value)&&value>=0;
+const metric=()=>({nativeBytesUnavailable:0,nativeStarted:0,nativeSettled:0,nativeRejected:0,logicalDenied:0,cancelStarted:0,cancelSettled:0,active:0,peak:0,nativeBytesRead:null,chunksRead:null,nativeDurationSumMs:0});
+export const budgetProofVocabulary=Object.freeze(Object.fromEntries(Object.entries({
+ phases:PHASES,resources:RESOURCES,operations:OPERATIONS,logicalReasons:REASONS,events:EVENTS,invalidReasons:INVALID_REASONS
+}).map(([key,values])=>[key,Object.freeze([...values])])));
+export function createBudgetDiagnostics(options={}){
+
+ const revision=data(options,'testRevision'),role=data(options,'workerRole');
+ const testRevision=typeof revision==='string'&&/^[a-f0-9]{40}$/.test(revision)?revision:null;
+ const workerRole=['QA','M','fixture'].includes(role)?role:'fixture';
+ let optionsValid=!!testRevision&&role===workerRole;
+ function recordLimit(key){
+  const descriptor=Object.getOwnPropertyDescriptor(options??{},key);
+  if(!descriptor)return 16384;
+  if(Object.hasOwn(descriptor,'value')&&integer(descriptor.value)&&descriptor.value>=1&&descriptor.value<=16384)return descriptor.value;
+  optionsValid=false;return 16384;
+ }
+ const limits={operation:recordLimit('maxRows'),guard:recordLimit('maxGuards'),scope:recordLimit('maxScopes')};
+ if(Object.getOwnPropertyDescriptor(options??{},'maxEvents')||Object.getOwnPropertyDescriptor(options??{},'diagnosticCandidate'))optionsValid=false;
+ const budget=Object.fromEntries(Object.entries(limits).map(([kind,limit])=>[kind,{limit,retained:0,omitted:0,firstOmittedOrdinal:null}]));
+ const coverage={overflow:false,invalid:optionsValid?0:1,unattributed:0,nativeBytesUnavailable:0,numericOverflow:false};
+ const roots=new WeakMap(),rootHandles=new WeakMap(),children=new WeakMap(),childHandles=new WeakMap(),operations=new WeakMap();
+ const rowMetrics=new WeakMap(),rows=[],logicalScopeEvents=[],scopeRows=[],groups=new Map(),totals=metric();
+ let rootOrdinal=0,childOrdinal=0,opOrdinal=0,scopeGuardEvents=0,deniedScopes=0,events=0,firstAt=null,lastAt=null;
+ const byEvent=counts(EVENTS),reasons=counts(INVALID_REASONS),invalidByRetention=splitCount(),unattributedByRetention=splitCount();
+ const readerBefore=Array(budgetReaderSiteCount+1).fill(0),readerAfter=Array(budgetReaderSiteCount+1).fill(0);
+ let firstReaderOrigin=null,firstOmission=null,firstInvalid=null,method='constructor';
+ function plus(value,delta=1,duration=false){
+  const next=value+delta;
+  if(duration?number(next):integer(next))return next;
+  coverage.numericOverflow=true;return value;
+ }
+ function increment(target,key,delta=1,duration=false){target[key]=plus(target[key]??0,delta,duration);}
+ const event=()=>{events=plus(events);increment(byEvent,method);};
+ const relation=()=>firstOmission?'afterRetentionOmission':'beforeRetentionOmission';
+ function admit(kind){
+  const entry=budget[kind];
+  if(entry.retained<entry.limit){increment(entry,'retained');return true;}
+  increment(entry,'omitted');entry.firstOmittedOrdinal??=events;
+  firstOmission??={event:method,ordinal:events,kind};coverage.overflow=true;return false;
+ }
+ const retention=()=>({
+  purpose:'afw.finite-budget-retention.syn.v1',operationRows:{...budget.operation},
+  guardRows:{...budget.guard},scopeRows:{...budget.scope},firstOmission:firstOmission&&{...firstOmission},traceComplete:!coverage.overflow
+ });
+ const recordInvalid=(candidate,unattributed)=>{
+  const reason=INVALID_REASONS.has(candidate)?candidate:'unknown',where=relation();
+  firstInvalid??={event:method,ordinal:events,reason,relation:where};
+  increment(reasons,reason);increment(invalidByRetention,where);
+  if(unattributed)increment(unattributedByRetention,where);
+ };
+ if(coverage.invalid)recordInvalid('constructorOptions',false);
+ const invalid=(reason,unattributed=false)=>{
+  increment(coverage,'invalid');if(unattributed)increment(coverage,'unattributed');
+  recordInvalid(reason,unattributed);return null;
+ };
+ const chronology=()=>({
+  purpose:CHRONOLOGY,eventCalls:events,byEvent:{...byEvent},firstInvalid:firstInvalid&&{...firstInvalid},
+  invalid:{...invalidByRetention},unattributed:{...unattributedByRetention},reasons:{...reasons},
+  readerOrigins:{beforeRetentionOmission:readerBefore.slice(),afterRetentionOmission:readerAfter.slice(),firstReaderOrigin:firstReaderOrigin&&{...firstReaderOrigin}}
+ });
+ const handle=()=>Object.freeze(Object.create(null));
+ function metricForScope(owner){
+  if(owner.metric===undefined){
+   owner.metric=admit('scope')?{rootOrdinal:owner.rootOrdinal,childOrdinal:owner.childOrdinal??null,...metric()}:null;
+   if(owner.metric)scopeRows.push(owner.metric);
+  }
+  return owner.metric;
+ }
+ const touch=(row,field,amount=1,duration=false)=>{for(const m of rowMetrics.get(row))increment(m,field,amount,duration);};
+ const active=(row,delta)=>{for(const m of rowMetrics.get(row)){increment(m,'active',delta);m.peak=Math.max(m.peak,m.active);}};
+ const safe=(name,fn)=>(...args)=>{
+  const previous=method;method=name;
+  try{return fn(...args);}catch{return invalid('collectorException');}
+  finally{method=previous;}
+ };
+ const root=safe('root',(object,meta)=>{
+  event();const phase=data(meta,'phase'),deadline=data(meta,'deadline'),kind=data(meta,'kind');
+  if(!nativeObject(object)||!PHASES.has(phase)||!['control','transport'].includes(kind)||!(deadline===null||number(deadline)))return invalid('rootInput',true);
+  const previous=roots.get(object);if(previous)return previous;
+  rootOrdinal=plus(rootOrdinal);
+  const ref=handle(),value={rootOrdinal,phase,deadline,kind,denialMask:0};roots.set(object,ref);rootHandles.set(ref,value);return ref;
+ });
+ const child=safe('child',(rootRef,object,meta)=>{
+  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),deadline=data(meta,'deadline');
+  if(!r||!nativeObject(object)||!(deadline===null||number(deadline)))return invalid('childInput',true);
+  const previous=children.get(object);if(previous){if(childHandles.get(previous).rootOrdinal!==r.rootOrdinal)return invalid('childConflict',true);return previous;}
+  childOrdinal=plus(childOrdinal);
+  const ref=handle();children.set(object,ref);childHandles.set(ref,{rootOrdinal:r.rootOrdinal,childOrdinal,deadline,denialMask:0});return ref;
+ });
+ const begin=safe('begin',(rootRef,childRef,meta)=>{
+  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),c=childRef===null?null:nativeObject(childRef)&&childHandles.get(childRef);
+  const phase=data(meta,'phase'),resourceClass=data(meta,'resourceClass'),operation=data(meta,'operation'),at=data(meta,'at'),fetchOpRef=data(meta,'fetchOpRef')??null;
+  const fetchRow=fetchOpRef===null?null:nativeObject(fetchOpRef)&&operations.get(fetchOpRef);
+  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!RESOURCES.has(resourceClass)||!OPERATIONS.has(operation)||!number(at))return invalid('beginContext',true);
+  if(operation==='rpc'&&resourceClass!=='DO'||operation==='limit'&&resourceClass!=='rateLimiter'||resourceClass==='rateLimiter'&&operation!=='limit')return invalid('beginMethodResource',true);
+  if(fetchOpRef!==null&&(!fetchRow||!['read','cancel'].includes(operation)||fetchRow.operation!=='fetch'||fetchRow.rootOrdinal!==r.rootOrdinal||fetchRow.childOrdinal!==(c?.childOrdinal??null)||fetchRow.phase!==phase||fetchRow.resourceClass!==resourceClass))return invalid('beginFetchLink',true);
+  opOrdinal=plus(opOrdinal);
+  const row={testRevision,workerRole,phase,resourceClass,operation,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,opOrdinal,enteredEventOrdinal:events,settledEventOrdinal:null,fetchOpOrdinal:fetchRow?.opOrdinal??null,kind:r.kind,rootDeadline:r.deadline,childDeadline:c?.deadline??null,enteredAt:at,settledAt:null,status:'pending',nativeBytesRead:null,nativeBytesReason:'not_exposed_by_native_api',chunksRead:null,readDurationMs:0,logicalAt:null,logicalReason:null,cancelStartedAt:null,cancelSettledAt:null};
+  const g=phase+'|'+resourceClass;if(!groups.has(g))groups.set(g,{phase,resourceClass,...metric()});
+  const scopeMetric=metricForScope(c??r),metrics=[totals,groups.get(g)];
+  if(scopeMetric)metrics.push(scopeMetric);
+  rowMetrics.set(row,metrics);
+  increment(coverage,'nativeBytesUnavailable');touch(row,'nativeBytesUnavailable');touch(row,'nativeStarted');active(row,1);
+  firstAt=firstAt===null?at:Math.min(firstAt,at);lastAt=lastAt===null?at:Math.max(lastAt,at);
+  const ref=handle();operations.set(ref,row);if(admit('operation'))rows.push(row);return ref;
+ });
+ const bytes=safe('bytes',(ref,meta)=>{
+  event();const row=nativeObject(ref)&&operations.get(ref),length=data(meta,'length'),chunks=data(meta,'chunks'),durationMs=data(meta,'durationMs');
+  if(!row||row.operation!=='read'||!integer(length)||!integer(chunks)||!number(durationMs))return invalid('bytesInput');
+  if(row.nativeBytesRead===null){row.nativeBytesRead=0;row.chunksRead=0;row.nativeBytesReason=null;increment(coverage,'nativeBytesUnavailable',-1);touch(row,'nativeBytesUnavailable',-1);}
+  increment(row,'nativeBytesRead',length);increment(row,'chunksRead',chunks);increment(row,'readDurationMs',durationMs,true);
+  touch(row,'nativeBytesRead',length);touch(row,'chunksRead',chunks);
+ });
+ const logical=safe('logical',(ref,meta)=>{
+  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),reason=data(meta,'reason');
+  if(!row||!number(at)||!REASONS.has(reason))return invalid('logicalInput');
+  if(row.logicalAt!==null)return;
+  row.logicalAt=at;row.logicalReason=reason;touch(row,'logicalDenied');
+ });
+
+ const scopeLogical=safe('scopeLogical',(rootRef,childRef,meta)=>{
+  event();const r=nativeObject(rootRef)&&rootHandles.get(rootRef),c=childRef===null?null:nativeObject(childRef)&&childHandles.get(childRef);
+  const phase=data(meta,'phase'),at=data(meta,'at'),reason=data(meta,'reason');
+  if(!r||childRef!==null&&!c||c&&c.rootOrdinal!==r.rootOrdinal||!PHASES.has(phase)||!number(at)||!REASONS.has(reason))return invalid('scopeLogicalInput',true);
+  const owner=c??r,bit=PHASE_BITS.get(phase);metricForScope(owner);
+  scopeGuardEvents=plus(scopeGuardEvents);
+  if(!(owner.denialMask&bit)){owner.denialMask|=bit;deniedScopes=plus(deniedScopes);}
+  if(admit('guard'))logicalScopeEvents.push({testRevision,workerRole,eventOrdinal:scopeGuardEvents,rootOrdinal:r.rootOrdinal,childOrdinal:c?.childOrdinal??null,phase,at,reason});
+ });
+
+ const cancel=safe('cancel',(ref,meta)=>{
+  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),stage=data(meta,'stage');
+  if(!row||!number(at)||!['started','settled'].includes(stage))return invalid('cancelInput');
+  const key=stage==='started'?'cancelStartedAt':'cancelSettledAt';if(row[key]!==null)return;
+  row[key]=at;touch(row,stage==='started'?'cancelStarted':'cancelSettled');
+ });
+ const settle=safe('settle',(ref,meta,observerReason)=>{
+  event();const row=nativeObject(ref)&&operations.get(ref),at=data(meta,'at'),status=data(meta,'status');
+  if(!row||!number(at)||!['fulfilled','rejected'].includes(status))return invalid(observerReason==='promiseThenMissing'||observerReason==='promiseThenException'?observerReason:'settleInput');
+  if(row.status!=='pending')return;
+  if(at<row.enteredAt)return invalid('settleTime');
+  row.status=status;row.settledAt=at;row.settledEventOrdinal=events;lastAt=Math.max(lastAt??at,at);touch(row,'nativeSettled');if(status==='rejected')touch(row,'nativeRejected');touch(row,'nativeDurationSumMs',at-row.enteredAt,true);active(row,-1);
+ });
+ const snapshot=safe('snapshot',()=>({purpose:PURPOSE,testRevision,workerRole,rows:rows.map(row=>({...row})),logicalScopeEvents:logicalScopeEvents.map(event=>({...event})),totals:{...totals,scopeGuardEvents,deniedScopes,observedWallMs:firstAt===null?0:(lastAt??firstAt)-firstAt,scopes:scopeRows.map(m=>({...m}))},byPhaseResource:[...groups.values()].map(m=>({...m})),coverage:{...coverage,observedMetricsComplete:coverage.invalid===0&&coverage.unattributed===0&&!coverage.numericOverflow&&budget.scope.omitted===0},retention:retention(),chronology:chronology(),operationalReadiness:false,completePackage:false,PCoff:false}));
+ const incomplete=safe('incomplete',(reason,origin,site,context)=>{
+  event();
+  if(origin===READER_ORIGIN){
+   const buckets=firstOmission?readerAfter:readerBefore;
+   increment(buckets,site);firstReaderOrigin??={ordinal:events,relation:relation(),site,context};
+  }
+  return invalid(reason,true);
+ });
+ return Object.freeze({root,child,begin,bytes,logical,scopeLogical,cancel,settle,snapshot,incomplete});
+}
+function passiveThen(value){
+ if(!nativeObject(value))return null;
+ for(let object=value;object!==null;object=Object.getPrototypeOf(object)){const d=Object.getOwnPropertyDescriptor(object,'then');if(d)return Object.hasOwn(d,'value')&&typeof d.value==='function'?d.value:null;}
+ return null;
+}
+export function observeBudgetPromise(collector,opRef,promise){
+ try{
+  const then=passiveThen(promise);if(!then){collector.settle(opRef,{at:performance.now(),status:null},'promiseThenMissing');return promise;}
+  const chain=Reflect.apply(then,promise,[()=>collector.settle(opRef,{at:performance.now(),status:'fulfilled'}),()=>collector.settle(opRef,{at:performance.now(),status:'rejected'})]);
+  const next=passiveThen(chain);if(next)Reflect.apply(next,chain,[undefined,()=>{}]);
+ }catch{try{collector.settle(opRef,{at:performance.now(),status:null},'promiseThenException');}catch{/* A sensor never changes native output. */}}
+ return promise;
+}
+
+
+// SYN observer only. Native identities and captured stores never authorize work.
+export function createBudgetRuntime(options={}){
+ const collector=createBudgetDiagnostics(options),als=new AsyncLocalStorage();
+ const leaseClocks=new WeakMap(),leases=new WeakMap(),nativeHolders=new WeakMap(),nativePairs=new WeakMap(),bodies=new WeakMap(),facades=new WeakSet(),facadeHolders=new WeakSet(),nativeFunctions=new WeakMap(),requestResources=new WeakMap(),requestMethods=new WeakMap();
+ const now=()=>performance.now(),incomplete=reason=>collector.incomplete(reason);
+ const immutable=value=>Object.freeze(value);
+ const root=(lease,phase,deadline,kind='control')=>{
+  const ref=collector.root(lease,{phase,deadline,kind});
+  if(nativeObject(lease)&&ref)leases.set(lease,immutable({root:ref,child:null,phase}));
+  return lease;
+ };
+ const descendant=(parent,child,deadline)=>{
+  const parentStore=leases.get(parent),currentStore=als.getStore(),store=currentStore?.root===parentStore?.root?currentStore:parentStore;
+  if(!store||!nativeObject(child)){incomplete(!store?'descendantStore':'descendantChild');return child;}
+  const ref=collector.child(store.root,child,{deadline});
+  if(ref)leases.set(child,immutable({...store,child:ref,phaseOverlay:undefined}));
+  return child;
+ };
+ const runWithPhase=(store,value,invoke)=>als.run(immutable({...store,phase:value,phaseOverlay:value}),()=>invoke());
+ const run=(lease,invoke)=>{
+  const store=leases.get(lease),active=als.getStore();
+  if(!store&&active?.excluded)return invoke();
+  if(!store)incomplete('runMissingLease');
+  if(store&&active?.root===store.root&&active.phaseOverlay)return runWithPhase(store,active.phaseOverlay,invoke);
+  return als.run(store,()=>invoke());
+ };
+ const phase=(value,invoke)=>{
+  const store=als.getStore();
+  if(!store||!PHASES.has(value)){incomplete(!store?'phaseStore':'phaseValue');return invoke();}
+  return runWithPhase(store,value,invoke);
+ };
+ const guardValue=value=>{const store=als.getStore();if(store?.excluded)return value;if(store?.root)collector.scopeLogical(store.root,store.child,{phase:store.phase,at:now(),reason:'guard'});else incomplete('guardRoot');return value;};
+ const fixture=invoke=>als.run(immutable({excluded:true}),()=>invoke());
+ const nativeHolder=(holder,resource,kind='holder')=>{
+  if(holder==null)return holder;
+  if(!nativeObject(holder)||!RESOURCES.has(resource)){incomplete('holderInput');return holder;}
+  const prior=nativeHolders.get(holder);if(prior&&(prior.resource!==resource||prior.kind!==kind))incomplete('holderConflict');else nativeHolders.set(holder,immutable({resource,kind}));
+  return holder;
+ };
+ // Called only at source-proven original acquisitions, never by method-name inference.
+ const capture=(holder,method,fn,resource)=>{
+  if(!nativeObject(holder)||typeof fn!=='function'||!RESOURCES.has(resource)){incomplete('captureInput');return fn;}
+  let pairs=nativePairs.get(holder);if(!pairs){pairs=new WeakMap();nativePairs.set(holder,pairs);}
+  const prior=pairs.get(fn);if(prior&&(prior.method!==method||prior.resource!==resource))incomplete('captureConflict');
+  else if(!facades.has(fn)){const description=immutable({method,resource,kind:nativeHolders.get(holder)?.kind??'holder'});pairs.set(fn,description);nativeFunctions.set(fn,description);}
+  return fn;
+ };
+ const facade=value=>{if(nativeObject(value))facades.add(value);else incomplete('facadeInput');return value;};
+ const tagBody=(value,owner)=>{
+  if(nativeObject(value)&&owner)bodies.set(value,owner);
+  return value;
+ };
+ const request=(value,lease)=>tagBody(value,immutable({store:leases.get(lease),resource:'transport',fetch:null,origin:'inbound'}));
+ const localResponse=(value)=>{
+  const store=als.getStore();if(!store)incomplete('localBodyStore');
+  return tagBody(value,immutable({store,resource:'transport',fetch:null,origin:'local-transport'}));
+ };
+ const body=(receiver,optional=false)=>{
+  if(optional&&receiver==null)return undefined;
+  // This getter is the business getter, evaluated once at its original access.
+  const value=receiver.body,owner=bodies.get(receiver);
+  if(owner)tagBody(value,owner);
+  return value;
+ };
+ const thenObserve=(value,fulfilled,rejected)=>{
+  try{
+   const then=passiveThen(value);
+   if(!then){fulfilled(value);return;}
+   const chained=Reflect.apply(then,value,[v=>{try{fulfilled(v);}catch{incomplete('observerFulfilledCallback');}},()=>{try{rejected();}catch{incomplete('observerRejectedCallback');}}]);
+   const next=passiveThen(chained);if(next)Reflect.apply(next,chained,[undefined,()=>{}]);
+  }catch{incomplete('observerThenException');}
+ };
+ function invoke(fn,receiver,args,meta,original=()=>Reflect.apply(fn,receiver,args)){
+  const bodyOwner=bodies.get(receiver),currentStore=als.getStore();
+  const localStore=bodyOwner&&!bodyOwner.fetch&&bodyOwner.origin!=='outbound'&&currentStore?.root===bodyOwner.store?.root&&!currentStore?.excluded?currentStore:null;
+  const store=localStore??bodyOwner?.store??currentStore;
+  if(meta.dormant){incomplete('dormantInvocation');return original();}
+  if(meta.edge==='clone'){
+   const result=original();if(bodyOwner)tagBody(result,bodyOwner);else incomplete('cloneOrigin');return result;
+  }
+  if(meta.edge==='reader'){
+   const result=original();
+   if(bodyOwner)tagBody(result,localStore?immutable({...bodyOwner,store:localStore}):bodyOwner);
+   else if(currentStore?.excluded!==true){
+    const context=currentStore===undefined?'no_store':currentStore?.excluded?'excluded':currentStore?.root?'rooted':'unrooted';
+    collector.incomplete('readerOrigin',READER_ORIGIN,readerSite(meta),context);
+   }
+   return result;
+  }
+  const pair=(nativeObject(receiver)?nativePairs.get(receiver)?.get(fn):null)??nativePairs.get(globalThis)?.get(fn)??nativeFunctions.get(fn);
+  const resource=pair?.resource;
+  if(meta.edge==='holder'||pair?.kind==='namespace'&&pair.method==='get'){
+   const result=original();
+   if(resource)nativeHolder(result,resource,pair?.kind==='namespace'?'stub':'holder');
+   else if(!facades.has(fn)&&!store?.excluded)incomplete('holderIdentity');
+   return result;
+  }
+  if(facades.has(fn)||meta.excluded||store?.excluded)return original();
+  const known=pair||bodyOwner;
+  if(!known||!store?.root){incomplete(!known?'invocationIdentity':'invocationRoot');return original();}
+  const operation=meta.operation??pair?.method,resourceClass=bodyOwner?.resource??(meta.classifyFetch?fetchResource(args[0]):meta.resource??resource);
+  const at=now(),ref=collector.begin(store.root,store.child,{phase:store.phase,resourceClass,operation,at,fetchOpRef:bodyOwner?.fetch??null});
+  if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at,stage:'started'});
+  let result;
+  try{result=operation==='transaction'?als.run(immutable({...store,nativeTransaction:true}),()=>original()):original();}catch(error){collector.settle(ref,{at:now(),status:'rejected'});throw error;}
+  thenObserve(result,value=>{
+   const settled=now();
+   if(operation==='fetch')tagBody(value,immutable({store,resource:resourceClass,fetch:ref,origin:'outbound'}));
+   if(operation==='read'&&meta.exposedBytes){
+    // Only exposed native ArrayBuffers/chunks. No text, JSON, cloning or probing.
+    const chunk=data(value,'value'),done=data(value,'done');
+    if(value instanceof ArrayBuffer)collector.bytes(ref,{length:value.byteLength,chunks:1,durationMs:settled-at});
+    else if(ArrayBuffer.isView(chunk))collector.bytes(ref,{length:chunk.byteLength,chunks:1,durationMs:settled-at});
+    else if(done===true)collector.bytes(ref,{length:0,chunks:0,durationMs:settled-at});
+   }
+   collector.settle(ref,{at:settled,status:'fulfilled'});
+   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
+  },()=>{
+   const settled=now();collector.settle(ref,{at:settled,status:'rejected'});
+   if(operation==='cancel'&&bodyOwner?.fetch)collector.cancel(bodyOwner.fetch,{at:settled,stage:'settled'});
+  });
+  return result;
+ }
+ const member=(receiver,method,meta,optionalReceiver=false,optionalMethod=false)=>{
+  if(optionalReceiver&&receiver==null)return undefined;
+  const fn=readMethod(receiver,method);
+  if(optionalMethod&&fn==null)return undefined;
+  return (...args)=>invoke(fn,receiver,args,meta);
+ };
+ const direct=(fn,meta)=>(...args)=>invoke(fn,undefined,args,meta,()=>Reflect.apply(fn,undefined,args));
+ const reflect=(apply,meta)=>(fn,receiver,args)=>invoke(fn,receiver,args,meta,()=>Reflect.apply(apply,Reflect,[fn,receiver,args]));
+ const call=(fn,meta)=>{
+  const callMethod=fn.call;
+  return (receiver,...args)=>invoke(fn,receiver,args,meta,()=>Reflect.apply(callMethod,fn,[receiver,...args]));
+ };
+ 
+ const methodValue=(request,value)=>{requestMethods.set(request,value);return value;};
+ const methodPhase=(request,prefix)=>{const method=requestMethods.get(request);if(!['GET','POST'].includes(method)){incomplete('methodPhase');return null;}return prefix+'_'+method.toLowerCase();};
+ const deadline=lease=>leaseClocks.get(lease);
+ const clock=(lease,deadline)=>{if(nativeObject(lease))leaseClocks.set(lease,deadline);else incomplete('clockLease');return lease;};
+ const control=(lease,value,req,invoke)=>{
+  if(!leases.has(lease))root(lease,value,leaseClocks.get(lease));
+  request(req,lease);return run(lease,invoke);
+ };
+ const childCall=(parent,child,deadline,invoke)=>{if(!leases.has(parent)&&als.getStore()?.excluded)return invoke();descendant(parent,child,deadline);return run(child,invoke);};
+ const childInvoke=(parent,deadline,fn,receiver,args)=>childCall(parent,args[0],deadline,()=>Reflect.apply(fn,receiver,args));
+ const alias=(parent,child)=>{const store=leases.get(parent);if(store&&nativeObject(child))leases.set(child,store);else if(!als.getStore()?.excluded)incomplete(!store?'aliasStore':'aliasChild');return child;};
+ const transport=(req,path,invoke)=>{
+  const value=path==='/oauth/token'?'token_exchange':path==='/mcp'?'mcp_read':null;
+  if(!value){incomplete('transportPhase');return invoke();}
+  root(req,value,null,'transport');request(req,req);return run(req,invoke);
+ };
+ function readMethod(receiver,method,optional=false){
+  if(optional&&receiver==null)return undefined;
+  const fn=receiver[method],holder=nativeHolders.get(receiver);
+  if(holder&&typeof fn==='function'&&!facades.has(fn))capture(receiver,method,fn,holder.resource);
+  return fn;
+ }
+ const facadeHolder=(value,keys)=>{
+  if(nativeObject(value))facadeHolders.add(value);
+  if(nativeObject(value))for(const key of keys){
+   const d=Object.getOwnPropertyDescriptor(value,key);
+   if(d&&Object.hasOwn(d,'value')&&typeof d.value==='function')facades.add(d.value);
+  }
+  return value;
+ };
+ const transactionArgument=value=>{
+  if(facadeHolders.has(value))return value;
+  if(als.getStore()?.nativeTransaction)nativeHolder(value,'DO','transaction');
+  else if(!als.getStore()?.excluded)incomplete('transactionContext');
+  return value;
+ };
+ 
+ 
+ function fetchResource(value,required=true){
+  if(nativeObject(value)&&requestResources.has(value))return requestResources.get(value);
+  let resource=null;
+  if(typeof value==='string'){
+   if(value.startsWith('https://api.github.com/'))resource='GHsource';
+   else if(value.includes('/cdn-cgi/access/certs'))resource='JWKS';
+   else if(value.startsWith('https://api.cloudflare.com/client/v4/')){
+    if(value.includes('/tokens/'))resource='CFcredential';
+    else if(value.includes('/deployments'))resource='CFdeployment';
+    else if(value.includes('/workflows'))resource='CFworkflow';
+    else if(value.includes('/containers')||value.includes('/instances-v2'))resource='CFcontainer';
+    else if(value.includes('/schedules'))resource='CFschedule';
+    else if(value.includes('/tails'))resource='CFtail';
+    else if(value.includes('/versions')||value.includes('/scripts/')||value.includes('/workers/workers/'))resource='CFversion';
+   }
+  }
+  if(required&&!resource)incomplete('fetchResource');
+  return resource;
+ }
+ const bind=fn=>{
+  const method=fn.bind;
+  return (...args)=>{
+   const value=Reflect.apply(method,fn,args),description=nativeFunctions.get(fn);
+   if(description&&typeof value==='function')nativeFunctions.set(value,description);
+   return value;
+  };
+ };
+ const construct=(constructor,kind)=>(...args)=>{
+  const value=Reflect.construct(constructor,args);
+  if(kind==='Request'){const resource=fetchResource(args[0],false);if(resource)requestResources.set(value,resource);}
+  const parent=bodies.get(args[0]),store=als.getStore();
+  if(parent)tagBody(value,parent);
+  else if(store)tagBody(value,immutable({store,resource:'transport',fetch:null,origin:kind==='Request'?'inbound':'local-transport'}));
+  return value;
+ };
+ // Captured once before the fixed fixture can install any of its existing facades.
+ capture(globalThis,'fetch',globalThis.fetch,'transport');
+ return immutable({collector,root,descendant,run,phase,fixture,guardValue,nativeHolder,capture,facade,facadeHolder,readMethod,transactionArgument,methodValue,methodPhase,deadline,clock,control,childCall,childInvoke,alias,transport,request,localResponse,body,construct,bind,member,direct,reflect,call,snapshot:collector.snapshot});
+
+}
```

## test/fixtures/finite-budget-evidence.mjs

```diff
diff --git a/test/fixtures/finite-budget-evidence.mjs b/test/fixtures/finite-budget-evidence.mjs
# before_blob=ABSENT after_blob=81178d96e10784366ab1b11bbf0805e347dea173
--- /dev/null
+++ b/test/fixtures/finite-budget-evidence.mjs
@@ -0,0 +1,198 @@
+import assert from 'node:assert/strict';
+import {types} from 'node:util';
+import {budgetProofVocabulary as vocab,budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {resolve,relative,dirname} from 'node:path';
+export async function persistBudgetEvidence({path,full,testRevision,caseName,counts}){
+ if(typeof path!=='string'||!/^output\/(?:finite-budget|owner-reference|owner-cleanup)\/[a-zA-Z0-9_./-]+\.json$/.test(path)||path.split('/').some(part=>part==='..'||part===''))throw Error('SYN evidence fixed path required');
+ const target=resolve(path),root=resolve('output'),rel=relative(root,target);if(rel.startsWith('..')||rel===root)throw Error('SYN evidence path outside fixed output');
+ if(!(testRevision===null||typeof testRevision==='string'&&/^[a-f0-9]{40}$/.test(testRevision))||typeof caseName!=='string'||!/^[a-zA-Z0-9_-]{1,96}$/.test(caseName))throw Error('SYN evidence provenance required');
+ const bytes=Buffer.from(JSON.stringify(full,null,2),'utf8');await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);
+ const sha256=createHash('sha256').update(bytes).digest('hex'),safeCounts={};
+ for(const key of ['tests','pass','fail','nativeStarted','nativeSettled','nativeRejected','logicalDenied','cancelStarted','cancelSettled','roots','children'])if(Number.isSafeInteger(counts?.[key])&&counts[key]>=0)safeCounts[key]=counts[key];
+ const summary=JSON.stringify({purpose:'afw.finite-budget-evidence.syn.v1',source:testRevision,caseName,status:'preserved',counts:safeCounts,path,bytes:bytes.length,sha256,operationalReadiness:false,completePackage:false,PCoff:false});
+ if(Buffer.byteLength(summary,'utf8')>2048)throw Error('SYN bounded evidence summary exceeded');
+ return {path,bytes:bytes.length,sha256,summary};
+}
+
+const metricKeys=['nativeBytesUnavailable','nativeStarted','nativeSettled','nativeRejected','logicalDenied','cancelStarted','cancelSettled','active','peak','nativeBytesRead','chunksRead','nativeDurationSumMs'];
+const additive=metricKeys.filter(key=>key!=='peak');
+const spanKeys=['beforeRetentionOmission','afterRetentionOmission'];
+const rowKeys=['testRevision','workerRole','phase','resourceClass','operation','rootOrdinal','childOrdinal','opOrdinal','enteredEventOrdinal','settledEventOrdinal','fetchOpOrdinal','kind','rootDeadline','childDeadline','enteredAt','settledAt','status','nativeBytesRead','nativeBytesReason','chunksRead','readDurationMs','logicalAt','logicalReason','cancelStartedAt','cancelSettledAt'];
+const scopeKey=r=>r.rootOrdinal+'|'+(r.childOrdinal??0);
+const groupKey=r=>r.phase+'|'+r.resourceClass;
+const count=n=>Number.isSafeInteger(n)&&n>=0;
+const pos=n=>count(n)&&n>0;
+const time=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
+const nullable=(n,p)=>n===null||p(n);
+const valid=(ok,field)=>assert(ok,'invalid SYN '+field);
+function shape(o,keys){
+ valid(o&&typeof o==='object'&&!types.isProxy(o)&&[Object.prototype,null].includes(Object.getPrototypeOf(o)),'record');
+ const ds=Object.getOwnPropertyDescriptors(o);
+ valid(Reflect.ownKeys(ds).length===keys.length&&keys.every(k=>Object.hasOwn(ds,k)&&ds[k].enumerable&&Object.hasOwn(ds[k],'value')),'closed data fields');
+}
+function list(a,max){
+ valid(Array.isArray(a)&&!types.isProxy(a)&&Object.getPrototypeOf(a)===Array.prototype&&a.length<=max,'bounded list');
+ valid(Reflect.ownKeys(a).length===a.length+1,'dense list');
+ for(let i=0;i<a.length;i++)valid(Object.hasOwn(Object.getOwnPropertyDescriptor(a,i)??{},'value'),'list data');
+}
+function numericMap(o,keys){shape(o,keys);for(const k of keys)valid(count(o[k]),'count');}
+function sum(values){
+ const present=values.filter(v=>v!==null);
+ return present.length?present.reduce((a,b)=>a+b,0):null;
+}
+function equalMetric(a,b,key){
+ if(key==='nativeDurationSumMs')valid(time(a)&&time(b)&&Math.abs(a-b)<=1e-8+1e-10*Math.max(a,b),'duration sum');
+ else valid(a===b,'metric '+key);
+}
+function metric(m,identity){
+ shape(m,[...identity,...metricKeys]);
+ for(const k of metricKeys){
+  const ok=k==='nativeDurationSumMs'?time(m[k]):['nativeBytesRead','chunksRead'].includes(k)?nullable(m[k],count):count(m[k]);
+  valid(ok,'metric scalar');
+ }
+ valid(m.nativeSettled+m.active===m.nativeStarted&&m.nativeRejected<=m.nativeSettled&&m.peak>=m.active&&m.peak<=m.nativeStarted,'operation balance');
+ valid(m.logicalDenied<=m.nativeStarted&&m.cancelStarted<=m.nativeStarted&&m.cancelSettled<=m.nativeStarted,'facet balance');
+ valid(m.nativeBytesUnavailable<=m.nativeStarted&&(m.nativeBytesRead===null)===(m.chunksRead===null),'byte denominator');
+ valid((m.nativeBytesRead===null)===(m.nativeBytesUnavailable===m.nativeStarted),'observed byte availability');
+}
+function scope(s){valid(pos(s.rootOrdinal)&&nullable(s.childOrdinal,pos),'scope identity');}
+function retention(s){
+ // Check the descriptor before the ordinal can participate in a comparison.
+ valid(s.chronology&&typeof s.chronology==='object'&&!types.isProxy(s.chronology)&&Object.hasOwn(Object.getOwnPropertyDescriptor(s.chronology,'eventCalls')??{},'value')&&count(s.chronology.eventCalls),'chronology count data');
+ const r=s.retention;shape(r,['purpose','operationRows','guardRows','scopeRows','firstOmission','traceComplete']);
+ valid(r.purpose==='afw.finite-budget-retention.syn.v1','retention purpose');
+ const stores=[[r.scopeRows,s.totals.scopes,'scope'],[r.operationRows,s.rows,'operation'],[r.guardRows,s.logicalScopeEvents,'guard']];
+ const missing=[];
+ for(const [b,items,kind] of stores){
+  shape(b,['limit','retained','omitted','firstOmittedOrdinal']);valid(pos(b.limit)&&b.limit<=16384&&count(b.retained)&&count(b.omitted),'record capacity');
+  list(items,b.limit);valid(items.length===b.retained&&(!b.omitted||b.retained===b.limit),'record admission');
+  valid(b.omitted?pos(b.firstOmittedOrdinal)&&b.firstOmittedOrdinal<=s.chronology.eventCalls:b.firstOmittedOrdinal===null,'first omission ordinal');
+  if(b.omitted)missing.push({kind,ordinal:b.firstOmittedOrdinal});
+ }
+ valid(r.traceComplete===!missing.length&&s.coverage.overflow===!!missing.length,'retention completeness');
+ if(!missing.length)valid(r.firstOmission===null,'no omission');
+ else{
+  shape(r.firstOmission,['event','ordinal','kind']);missing.sort((a,b)=>a.ordinal-b.ordinal);
+  const m=missing[0],f=r.firstOmission;
+  valid(f.kind===m.kind&&f.ordinal===m.ordinal&&(f.kind==='scope'?['begin','scopeLogical'].includes(f.event):f.event===(f.kind==='operation'?'begin':'scopeLogical')),'first omitted record');
+ }
+}
+function chronology(s){
+ const c=s.chronology;shape(c,['purpose','eventCalls','byEvent','firstInvalid','invalid','unattributed','reasons','readerOrigins']);
+ valid(c.purpose==='afw.finite-budget-chronology.syn.v2'&&count(c.eventCalls),'chronology');
+ numericMap(c.byEvent,vocab.events);numericMap(c.reasons,vocab.invalidReasons);numericMap(c.invalid,spanKeys);numericMap(c.unattributed,spanKeys);
+ valid(sum(Object.values(c.byEvent))===c.eventCalls&&sum(Object.values(c.reasons))===s.coverage.invalid,'event denominators');
+ valid(sum(Object.values(c.invalid))===s.coverage.invalid&&sum(Object.values(c.unattributed))===s.coverage.unattributed,'invalid denominators');
+ for(const k of spanKeys)valid(c.unattributed[k]<=c.invalid[k],'attribution');
+ function witness(w){
+  valid(count(w.ordinal)&&w.ordinal<=c.eventCalls&&spanKeys.includes(w.relation),'witness');
+  const first=s.retention.firstOmission;
+  valid(w.relation===(first&&w.ordinal>=first.ordinal?'afterRetentionOmission':'beforeRetentionOmission'),'witness relation');
+ }
+ if(s.coverage.invalid){shape(c.firstInvalid,['event','ordinal','reason','relation']);witness(c.firstInvalid);valid([...vocab.events,'constructor','snapshot'].includes(c.firstInvalid.event)&&vocab.invalidReasons.includes(c.firstInvalid.reason),'reason witness');}
+ else valid(c.firstInvalid===null,'no invalid witness');
+ const o=c.readerOrigins;shape(o,[...spanKeys,'firstReaderOrigin']);
+ for(const k of spanKeys){
+  list(o[k],budgetReaderSiteCount+1);valid(o[k].length===budgetReaderSiteCount+1&&o[k].every(count),'reader buckets');
+ }
+ const recorded=sum([...o[spanKeys[0]],...o[spanKeys[1]]]);
+ valid(recorded<=c.reasons.readerOrigin,'reader reason denominator');
+ if(recorded){const f=o.firstReaderOrigin;shape(f,['ordinal','relation','site','context']);witness(f);valid(count(f.site)&&f.site<=budgetReaderSiteCount&&o[f.relation][f.site]>0&&['no_store','excluded','rooted','unrooted'].includes(f.context),'reader origin');}
+ else valid(o.firstReaderOrigin===null,'reader witness');
+}
+function blank(){return Object.fromEntries(metricKeys.map(k=>[k,['nativeBytesRead','chunksRead'].includes(k)?null:0]));}
+function updateFromRow(m,r){
+ m.nativeStarted++;m.nativeSettled+=r.status!=='pending';m.nativeRejected+=r.status==='rejected';
+ m.logicalDenied+=r.logicalAt!==null;m.cancelStarted+=r.cancelStartedAt!==null;m.cancelSettled+=r.cancelSettledAt!==null;
+ m.nativeDurationSumMs+=r.settledAt===null?0:r.settledAt-r.enteredAt;
+ if(r.nativeBytesRead===null)m.nativeBytesUnavailable++;
+ else{m.nativeBytesRead=(m.nativeBytesRead??0)+r.nativeBytesRead;m.chunksRead=(m.chunksRead??0)+r.chunksRead;}
+}
+function inspect(s){
+ shape(s,['purpose','testRevision','workerRole','rows','logicalScopeEvents','totals','byPhaseResource','coverage','retention','chronology','operationalReadiness','completePackage','PCoff']);
+ valid(s.purpose==='afw.finite-budget-diagnostics.syn.v1'&&typeof s.testRevision==='string'&&/^[a-f0-9]{40}$/.test(s.testRevision)&&['M','QA','fixture'].includes(s.workerRole),'source identity');
+ for(const key of ['operationalReadiness','completePackage','PCoff'])valid(s[key]===false,'readiness');
+ shape(s.coverage,['overflow','invalid','unattributed','nativeBytesUnavailable','numericOverflow','observedMetricsComplete']);
+ for(const key of ['overflow','numericOverflow','observedMetricsComplete'])valid(typeof s.coverage[key]==='boolean','coverage flag');
+ for(const key of ['invalid','unattributed','nativeBytesUnavailable'])valid(count(s.coverage[key]),'coverage count');
+ // A snapshot with exhausted arithmetic cannot support numeric reconciliation.
+ valid(!s.coverage.numericOverflow,'numeric overflow');
+ metric(s.totals,['scopeGuardEvents','deniedScopes','observedWallMs','scopes']);
+ valid(time(s.totals.observedWallMs)&&count(s.totals.scopeGuardEvents)&&count(s.totals.deniedScopes)&&s.totals.deniedScopes<=s.totals.scopeGuardEvents,'guard totals');
+ retention(s);chronology(s);
+ const complete=s.coverage.invalid===0&&s.coverage.unattributed===0&&s.retention.scopeRows.omitted===0;
+ valid(s.coverage.observedMetricsComplete===complete,'observed completeness flag');
+ assert(complete,'incomplete observed metrics');
+ valid(s.coverage.nativeBytesUnavailable===s.totals.nativeBytesUnavailable,'global byte denominator');
+ valid(s.chronology.byEvent.begin===s.totals.nativeStarted&&s.chronology.byEvent.scopeLogical===s.totals.scopeGuardEvents&&s.chronology.byEvent.settle>=s.totals.nativeSettled&&s.chronology.byEvent.incomplete===0,'observed event counts');
+ list(s.byPhaseResource,vocab.phases.length*vocab.resources.length);
+ const groups=new Map(),scopes=new Map(),replayGroups=new Map(),replayScopes=new Map(),childRoots=new Map(),observedScopes=new Set();
+ for(const entry of s.byPhaseResource){
+  metric(entry,['phase','resourceClass']);
+  valid(vocab.phases.includes(entry.phase)&&vocab.resources.includes(entry.resourceClass)&&entry.nativeStarted>0,'phase/resource');
+  const key=groupKey(entry);valid(!groups.has(key),'unique phase/resource');
+  groups.set(key,entry);replayGroups.set(key,blank());
+ }
+ for(const entry of s.totals.scopes){
+  metric(entry,['rootOrdinal','childOrdinal']);scope(entry);const key=scopeKey(entry);
+  valid(!scopes.has(key),'unique scope');
+  if(entry.childOrdinal!==null){valid(!childRoots.has(entry.childOrdinal),'unique child root');childRoots.set(entry.childOrdinal,entry.rootOrdinal);}
+  scopes.set(key,entry);replayScopes.set(key,blank());
+ }
+ for(const entries of [s.byPhaseResource,s.totals.scopes])for(const k of additive){
+  const combined=sum(entries.map(m=>m[k]));
+  equalMetric(s.totals[k],combined??(['nativeBytesRead','chunksRead'].includes(k)?null:0),k);
+ }
+ const all=blank(),transitions=[],ordinals=new Set(),rows=new Map(),guards=new Set();
+ let priorEnter=0,firstAt=null,lastAt=null;
+ const rootMetadata=new Map(),childMetadata=new Map();
+ const stamp=n=>{valid(pos(n)&&n<=s.chronology.eventCalls&&!ordinals.has(n),'unique transition');ordinals.add(n);};
+ for(const [index,r] of s.rows.entries()){
+  shape(r,rowKeys);scope(r);observedScopes.add(scopeKey(r));valid(r.opOrdinal===index+1&&r.testRevision===s.testRevision&&r.workerRole===s.workerRole,'prefix provenance');
+  valid(vocab.phases.includes(r.phase)&&vocab.resources.includes(r.resourceClass)&&vocab.operations.includes(r.operation),'row enums');
+  valid((r.operation!=='rpc'||r.resourceClass==='DO')&&((r.operation==='limit')===(r.resourceClass==='rateLimiter')),'method resource');
+  valid(['control','transport'].includes(r.kind)&&(r.kind==='control'?time(r.rootDeadline):nullable(r.rootDeadline,time))&&nullable(r.childDeadline,time)&&(r.childOrdinal===null?r.childDeadline===null:time(r.childDeadline)),'deadlines');
+  const rootInfo=rootMetadata.get(r.rootOrdinal);
+  if(rootInfo)valid(rootInfo.kind===r.kind&&rootInfo.deadline===r.rootDeadline,'root context');
+  else rootMetadata.set(r.rootOrdinal,{kind:r.kind,deadline:r.rootDeadline});
+  if(r.childOrdinal!==null){
+   if(childMetadata.has(r.childOrdinal))valid(childMetadata.get(r.childOrdinal)===r.childDeadline,'child deadline');else childMetadata.set(r.childOrdinal,r.childDeadline);
+  }
+  valid(time(r.enteredAt)&&nullable(r.settledAt,time)&&['pending','fulfilled','rejected'].includes(r.status),'native timing');
+  valid((r.status==='pending')===(r.settledAt===null)&&(r.status==='pending')===(r.settledEventOrdinal===null),'settlement');
+  valid(r.enteredEventOrdinal>priorEnter&&(!s.retention.operationRows.omitted||r.enteredEventOrdinal<s.retention.operationRows.firstOmittedOrdinal),'entry order');stamp(r.enteredEventOrdinal);priorEnter=r.enteredEventOrdinal;
+  if(r.status!=='pending'){valid(r.settledAt>=r.enteredAt&&r.settledEventOrdinal>r.enteredEventOrdinal,'terminal order');stamp(r.settledEventOrdinal);}
+  valid(nullable(r.nativeBytesRead,count)&&nullable(r.chunksRead,count)&&time(r.readDurationMs)&&(r.nativeBytesRead===null)===(r.chunksRead===null),'row bytes');
+  valid(r.nativeBytesRead===null?r.nativeBytesReason==='not_exposed_by_native_api':r.nativeBytesReason===null&&r.operation==='read','byte source');
+  valid(nullable(r.logicalAt,time)&&(r.logicalAt===null?r.logicalReason===null:vocab.logicalReasons.includes(r.logicalReason)),'logical state');
+  valid(nullable(r.cancelStartedAt,time)&&nullable(r.cancelSettledAt,time),'cancel state');
+  valid(groups.has(groupKey(r))&&scopes.has(scopeKey(r)),'row scope and group');
+  if(r.fetchOpOrdinal!==null){const parent=rows.get(r.fetchOpOrdinal);valid(parent?.operation==='fetch'&&['read','cancel'].includes(r.operation)&&groupKey(parent)===groupKey(r)&&scopeKey(parent)===scopeKey(r),'fetch parent');}
+  rows.set(r.opOrdinal,r);
+  const targets=[all,replayGroups.get(groupKey(r)),replayScopes.get(scopeKey(r))];
+  for(const target of targets)updateFromRow(target,r);
+  transitions.push([r.enteredEventOrdinal,1,targets]);if(r.settledEventOrdinal!==null)transitions.push([r.settledEventOrdinal,-1,targets]);
+  firstAt=firstAt===null?r.enteredAt:Math.min(firstAt,r.enteredAt);lastAt=Math.max(lastAt??r.enteredAt,r.enteredAt,r.settledAt??0);
+ }
+ for(const [,delta,targets] of transitions.sort((a,b)=>a[0]-b[0]))for(const m of targets){m.active+=delta;m.peak=Math.max(m.peak,m.active);}
+ for(const [index,r] of s.logicalScopeEvents.entries()){
+  shape(r,['testRevision','workerRole','eventOrdinal','rootOrdinal','childOrdinal','phase','at','reason']);scope(r);
+  valid(r.testRevision===s.testRevision&&r.workerRole===s.workerRole&&r.eventOrdinal===index+1&&time(r.at)&&vocab.phases.includes(r.phase)&&vocab.logicalReasons.includes(r.reason)&&scopes.has(scopeKey(r)),'guard prefix');
+  observedScopes.add(scopeKey(r));guards.add(scopeKey(r)+'|'+r.phase);
+ }
+ valid(s.totals.nativeStarted===s.rows.length+s.retention.operationRows.omitted&&s.totals.scopeGuardEvents===s.logicalScopeEvents.length+s.retention.guardRows.omitted&&s.totals.deniedScopes>=guards.size,'admission accounting');
+ for(const [actual,part] of [[s.totals,all],...[...groups].map(([k,v])=>[v,replayGroups.get(k)]),...[...scopes].map(([k,v])=>[v,replayScopes.get(k)])]){
+  for(const k of metricKeys){
+   if(!s.retention.operationRows.omitted)equalMetric(actual[k],part[k],k);
+   else if(part[k]!==null)valid(actual[k]!==null&&(k==='nativeDurationSumMs'?part[k]<=actual[k]+1e-8+Math.abs(actual[k])*1e-10:part[k]<=actual[k]),'prefix metric subset');
+  }
+ }
+ if(s.retention.traceComplete)valid(observedScopes.size===scopes.size,'complete scope witnesses');
+ if(!s.retention.guardRows.omitted)valid(s.totals.deniedScopes===guards.size,'distinct denied scopes');
+ if(!s.retention.operationRows.omitted)equalMetric(s.totals.observedWallMs,firstAt===null?0:lastAt-firstAt,'nativeDurationSumMs');
+}
+const proof=(s,level)=>({purpose:'afw.finite-budget-metrics-proof.syn.v1',level,traceComplete:s.retention.traceComplete,operationalReadiness:false,completePackage:false,PCoff:false});
+export function verifyObservedBudgetMetrics(s){inspect(s);return proof(s,'observed_metrics');}
+export function verifyCompleteBudgetTrace(s){inspect(s);assert(s.retention.traceComplete,'incomplete retained trace');return proof(s,'complete_trace');}
```

## test/fixtures/finite-budget-world.mjs

```diff
diff --git a/test/fixtures/finite-budget-world.mjs b/test/fixtures/finite-budget-world.mjs
# before_blob=ABSENT after_blob=f654001b027555c41dbe3f287445e73ac849094b
--- /dev/null
+++ b/test/fixtures/finite-budget-world.mjs
@@ -0,0 +1,870 @@
+import assert from 'node:assert/strict';
+import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {resolve,relative,join} from 'node:path';
+import {pathToFileURL} from 'node:url';
+import ts from 'typescript';
+import {budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
+import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './finite-budget-evidence.mjs';
+
+
+const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
+const METHODS=new Set(['get','put','list','delete','first','all','run','exec','batch','transaction','sync','getAlarm','setAlarm','deleteAlarm','fetch','read','cancel']);
+const label=text=>text.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g,'[literal]');
+function nearest(node){
+ for(let n=node.parent;n;n=n.parent)if(ts.isFunctionDeclaration(n)||ts.isFunctionExpression(n)||ts.isArrowFunction(n)||ts.isMethodDeclaration(n)||ts.isConstructorDeclaration(n)||ts.isGetAccessorDeclaration(n)||ts.isSetAccessorDeclaration(n)){
+  const name=n.name?.getText();if(name)return name;
+  if(ts.isVariableDeclaration(n.parent))return n.parent.name.getText();
+  if(ts.isCallExpression(n.parent))return 'callback:'+n.parent.expression.getText();
+  return 'anonymous';
+ }
+ return 'module';
+}
+function decision(receiver,method,target){
+ const joined=receiver+' '+target;
+ if(/^(?:Promise|Math|Object|Reflect|JSON|Array|Buffer|String|Number|Date|console)$/.test(receiver))return ['excluded','pure-language-or-aggregation'];
+ if(/(?:WeakMap|WeakSet|Map|Set)/.test(joined)||/^(?:roots|rootHandles|children|childHandles|operations|groups|scopes|results|receipts|reductions|requestContexts|stageAdmissions|outstanding|requestEntries|cache|map|maps|handlers|headers|form|params|searchParams)$/.test(receiver)||/\.headers$|\.searchParams$/.test(receiver))return ['excluded','memory-collection-or-HTTP-data-accessor'];
+ if(method==='read'||method==='cancel'){
+  if(/stream|reader|body|message|response/i.test(joined))return ['body-facet','associate-with-captured-request-opRef-not-another-fetch'];
+  return ['unresolved','receiver-needs-native-or-helper-disposition'];
+ }
+ if(method==='fetch'||/^(?:fetch|fetcher|actualFetch)$/.test(target))return ['native-candidate',/stub|worker|actor|node|negative|m\b/i.test(receiver)?'DO-or-transport-fetch':'network-fetch-source-owned-resource-classification-required'];
+ if(/storage|^(?:tx|transaction|s)$/.test(receiver)||/storage|(?:^|\.)ctx(?:\.|$)/.test(joined)&&/get|put|list|delete|sync|transaction|Alarm/.test(method))return ['native-candidate','DO-storage-or-transaction-method-capture'];
+ if(/^(?:alias|kv|oauthKv)$/.test(receiver)||/OAUTH_KV|OAuthKv|oauthKv/.test(joined))return ['native-candidate','native-KV-boundary-or-fixed-facet-entry'];
+ if(/^(?:bound|statement|stmt|db|session)$/.test(receiver)&&['first','all','run','exec','batch'].includes(method)||/\.prepare\(|\.bind\(/.test(receiver)&&['first','all','run'].includes(method))return ['native-candidate','native-SQL-statement-result'];
+ if(/(?:^|\.)env\.[A-Z_]+$/.test(receiver)&&method==='get')return ['unresolved','binding-type-and-selector-versus-I/O-required'];
+ return ['unresolved','lexical-receiver-or-helper-boundary-needs-review'];
+}
+function discover(source,path,roles){
+ const file=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,path.endsWith('.tsx')?ts.ScriptKind.TSX:path.endsWith('.ts')?ts.ScriptKind.TS:ts.ScriptKind.JS);
+ assert.equal(file.parseDiagnostics.length,0,'parse actual graph input '+path);
+ const candidates=[];let calls=0;
+ function walk(node){
+  if(ts.isCallExpression(node)){
+   calls++;
+   let receiver='',method='',target='',reflect=false;
+   if(ts.isPropertyAccessExpression(node.expression)){
+    receiver=node.expression.expression.getText(file);method=node.expression.name.text;target=node.expression.getText(file);
+    if(target==='Reflect.apply'&&node.arguments.length>=2){
+     reflect=true;target=node.arguments[0].getText(file);receiver=node.arguments[1].getText(file);
+     if(ts.isPropertyAccessExpression(node.arguments[0]))method=node.arguments[0].name.text;
+     else if(ts.isElementAccessExpression(node.arguments[0]))method='dynamic';
+     else method=target.replace(/^(?:native|storage)/,'');
+    }
+   }else if(ts.isIdentifier(node.expression)&&['fetch','fetcher','actualFetch'].includes(node.expression.text)){method='fetch';target=node.expression.text;}
+   if(METHODS.has(method)||reflect&&(/^(?:get|put|list|delete|first|all|sync|transaction|getAlarm|setAlarm|deleteAlarm|tg|tp|td|ta|getTx|putTx|readTx|read|write|alarm|del|ns|ng|nt|native\.|methods\[)/.test(target))){
+    assert(candidates.length<16384,'bounded syntactic candidate inventory');
+    const [classification,reason]=decision(receiver,method,target),position=file.getLineAndCharacterOfPosition(node.getStart(file));
+    candidates.push({roles,path,line:position.line+1,column:position.character+1,position:node.getStart(file),end:node.end,receiver:label(receiver).slice(0,240),method,target:label(target).slice(0,240),function:label(nearest(node)).slice(0,160),reflect,classification,reason,callBytes:Buffer.byteLength(node.getText(file)),callSha256:hash(node.getText(file))});
+   }
+  }
+  ts.forEachChild(node,walk);
+ }
+ walk(file);return {candidates,calls};
+}
+const SEAMS=[
+ {path:'lib/mcp-qa-finite-initial-entry.mjs',marker:'parent=clock(r.createdAt+30000,holders);const lease=parent.lease;',expected:1,meaning:'actual setup Root before first command/source/storage I/O and stage-work',phase:'setup'},
+ {path:'lib/mcp-qa-finite-initial-cleanup.mjs',marker:'parent=clock(Date.now()+30000,holders);const lease=parent.lease;',expected:1,meaning:'actual original alarm Root; never a reconstructed request Root',phase:'cleanup_before_restore'},
+ {path:'lib/mcp-qa-finite-owner-preparation.mjs',marker:'requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});',expected:1,meaning:'actual request Root registration; observed deadline only',phase:'request-callsite'},
+ {path:'lib/mcp-qa-finite-owner-preparation.mjs',marker:'descendant(childLease,lease,()=>end,()=>end-wall-(performance.now()-mono));',expected:1,meaning:'actual request child identity and original deadline',phase:'inherited'},
+ {path:'lib/mcp-qa-finite-initial-lease.mjs',marker:'actual=work(l,until);',expected:1,meaning:'actual child callback retains exact returned native promise',phase:'inherited'},
+ {path:'lib/mcp-qa-finite-owner-phase-context.mjs',marker:"return await readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l);",expected:1,meaning:'lookup callback fixed sdk_lookup scope before composed existing diagnostics',phase:'sdk_lookup'},
+ {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'check();const native=Reflect.apply(methods[q.method],alias,q.args);return retain(native);',expected:1,meaning:'actual private readonly native entry, original guards/retain/order',phase:'sdk_lookup'},
+ {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'const actual=retain(Promise.resolve().then(()=>{check();return retain(Reflect.apply(methods[q.method],alias,q.args));}));',expected:1,meaning:'actual private reduction native entry, no exported facet',phase:'sdk_reduction'},
+ {path:'lib/mcp-qa-finite-owner-cleanup.mjs',marker:'async function readCleanupFinalInventory(options,originalLease,s){',expected:1,meaning:'fixed final-inventory call scope, nested I/O inherits immutable store',phase:'final_inventory'},
+ {path:'worker/mcp-own/finite.mjs',marker:'if(!reserved(path)&&!reserved(decoded))return worker.fetch(request,env,ctx);',expected:1,meaning:'actual unreserved M entry; transport Root only, deadline null',phase:'token_exchange-or-mcp_read'}
+];
+async function inventoryFiles(root){
+ const rows=[];async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=join(dir,e.name);assert(!e.isSymbolicLink());if(e.isDirectory())await walk(path);else{assert(e.isFile());const b=await readFile(path);rows.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:hash(b)});}}}
+ await walk(root);return rows.sort((a,b)=>a.path.localeCompare(b.path));
+}
+export async function inspectBudgetCompilation(root){
+ assert.equal(process.env.AFW_BUDGET_INSPECTION,'compile-only');
+ assert.equal(root,'output/finite-budget/compile-only');
+ const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
+ const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
+ const began=Date.now(),graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true});
+ assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);assert.equal(graphs.nativeCheckpointProduced,false);
+ assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));
+ const overriddenByRole={M:new Map(),QA:new Map(graphs.preparedSources.map(([p,s])=>[relative(process.cwd(),p).replaceAll('\\','/'),s]))};
+ const rolePaths={M:Object.keys(graphs.M.metafile.inputs),QA:Object.keys(graphs.QA.metafile.inputs)},paths=[...new Set([...rolePaths.M,...rolePaths.QA])].sort(),inputs=[],modules=[],candidates=[];
+ for(const role of ['M','QA'])for(const path of [...rolePaths[role]].sort()){
+  const roles=[role],overridden=overriddenByRole[role],hookStage=role==='QA'?'after-existing-QA-fixture-composition':'M-original-source';
+  if(path.startsWith('<define:')){const text=graphs.virtualSources[path];assert.equal(typeof text,'string','known virtual define');inputs.push({path,role,roles,hookStage,kind:'compiler-define-data',bytes:Buffer.byteLength(text),sha256:hash(text)});modules.push({path,roles,classification:'excluded',reason:'compile-time-data-no-native-callsite'});continue;}
+  const raw=path==='<stdin>'?graphs.QA.entry:await readFile(path,'utf8'),prepared=overridden.get(path)??raw;
+  inputs.push({path,role,roles,hookStage,kind:path==='<stdin>'?'fixture-entry':'source',diskBytes:Buffer.byteLength(raw),diskSha256:hash(raw),preparedBytes:Buffer.byteLength(prepared),preparedSha256:hash(prepared),prepared:prepared!==raw});
+  if(path.endsWith('.json')){modules.push({path,roles,classification:'excluded',reason:'JSON-data-no-native-callsite'});continue;}
+  if(path.endsWith('.d.ts')){modules.push({path,roles,classification:'excluded',reason:'declaration-only-no-runtime'});continue;}
+  const discovered=discover(prepared,path,roles);
+  assert(candidates.length+discovered.candidates.length<=16384,'bounded complete syntactic candidate map');
+  candidates.push(...discovered.candidates);modules.push({path,roles,syntacticCalls:discovered.calls,candidateCount:discovered.candidates.length,classification:discovered.candidates.length?'inventoried':'excluded',reason:discovered.candidates.length?'API-shaped calls require individual disposition':'no-call-matching-closed-native-method-discovery-set'});
+ }
+ const seams=[];
+ for(const seam of SEAMS)for(const role of ['M','QA'].filter(role=>rolePaths[role].includes(seam.path))){const raw=await readFile(seam.path,'utf8'),prepared=seam.rawSource?raw:overriddenByRole[role].get(seam.path)??raw,count=prepared.split(seam.marker).length-1;assert.equal(count,seam.expected,'exact source seam '+role+' '+seam.path+' '+seam.phase);seams.push({...seam,role,count,markerSha256:hash(seam.marker),rawSha256:hash(raw),preparedSha256:hash(prepared),hookStage:role==='QA'?'after-existing-QA-fixture-composition':'M-original-source'});}
+ const grouped=new Map();
+ for(const row of candidates){const key=JSON.stringify([row.roles,row.path,row.receiver,row.method,row.target,row.function,row.classification,row.reason]);let group=grouped.get(key);if(!group){group={roles:row.roles,path:row.path,receiver:row.receiver,method:row.method,target:row.target,function:row.function,classification:row.classification,reason:row.reason,count:0,callsites:[]};grouped.set(key,group);}group.count++;group.callsites.push({line:row.line,column:row.column,position:row.position,end:row.end,callBytes:row.callBytes,callSha256:row.callSha256});}
+ const counts={inputPaths:paths.length,roleVariants:inputs.length,inputs:inputs.length,modulesWithCandidates:modules.filter(m=>m.candidateCount>0).length,candidates:candidates.length,groups:grouped.size,nativeCandidates:candidates.filter(c=>c.classification==='native-candidate').length,bodyFacets:candidates.filter(c=>c.classification==='body-facet').length,excluded:candidates.filter(c=>c.classification==='excluded').length,unresolved:candidates.filter(c=>c.classification==='unresolved').length,seams:seams.length};
+ const envelope={purpose:'afw.finite-budget-compile-inspection.syn.v1',source,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,I0Opened:false,nativeExecutionProduced:false,nativeCheckpointProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ const map={...envelope,discovery:'TypeScript5.9.3 exploratory CallExpression inspection; separate role/path/raw/prepared/stage variants; method set is not complete native coverage',counts,seams,modules,candidates:[...grouped.values()],scopeNotes:{carrier:'proposed immutable AsyncLocalStorage; no enterWith/disable/fallback Root',phase:'fixed actual source entry and child callback capture, never global currentPhase',identity:'actual weak Root/child identities required in final native run; compile-only modeled IDs are not identities',segments:'disjoint producer/consumer and M/QA epochs; ordinals and peaks remain local',unresolved:'must receive explicit source/callback/reachability disposition before native preflight may pass'},acceptedForNativeInstrumentation:false};
+ await mkdir(join(root,'scripts'),{recursive:true});
+ await writeFile(join(root,'scripts/M-index.mjs'),graphs.M.script);await writeFile(join(root,'scripts/QA-index.mjs'),graphs.QA.script);
+ await writeFile(join(root,'metafiles.json'),JSON.stringify({M:graphs.M.metafile,QA:graphs.QA.metafile},null,2));
+ await writeFile(join(root,'prepared-inputs.json'),JSON.stringify({...envelope,inputs:['M','QA'].flatMap(role=>[...overriddenByRole[role]].map(([path,content])=>({role,path,content}))),virtualInputs:Object.entries(graphs.virtualSources).map(([path,content])=>({path,content}))},null,2));
+ await writeFile(join(root,'source-inputs.json'),JSON.stringify({...envelope,inputs},null,2));await writeFile(join(root,'candidate-map.json'),JSON.stringify(map,null,2));
+ const provenance={...envelope,counts,startedAt:began,finishedAt:Date.now(),compatibility:{M:{date:graphs.compatibility.M.compatibility_date,flags:graphs.compatibility.M.compatibility_flags},QA:graphs.compatibility.QA},modeledCompilerInput:{label:'MODELED compile-only namespace hash/string DATA, never instantiated as namespaces or used by P1',namespaceHashes:graphs.modeledNamespaceIds},graphs:{M:{bytes:Buffer.byteLength(graphs.M.script),sha256:hash(graphs.M.script)},QA:{bytes:Buffer.byteLength(graphs.QA.script),sha256:hash(graphs.QA.script)}},notProduced:['I0','native-Root','native-child','SDK-complete','OAuth-exchange','native-checkpoint','provider-API-call','runtime','positive-lineage']};
+ await writeFile(join(root,'provenance.json'),JSON.stringify(provenance,null,2));
+ console.info('COMPILE ONLY INVENTORY',JSON.stringify({source,counts,graphs:provenance.graphs,I0Opened:false,nativeExecutionProduced:false,nativeCheckpointProduced:false}));
+ return provenance;
+}
+
+export {inventoryFiles as inventoryBudgetFiles};
+
+
+// Compilation-only data. This module is never imported by a Worker graph.
+const descriptorURL=new URL('./finite-budget-descriptors.json',import.meta.url);
+export const budgetNativeDescriptorProposal=Object.freeze(JSON.parse(await readFile(descriptorURL,'utf8')));
+const objectPath=p=>relative(process.cwd(),p).replaceAll('\\','/');
+const nativeDescriptorByPath=new Map(budgetNativeDescriptorProposal.sourceDescriptors.map(row=>[row.path,row]));
+function sourceAST(source,path){
+ const ast=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,path.endsWith('.ts')?ts.ScriptKind.TS:ts.ScriptKind.JS);
+ let detail='';
+ if(ast.parseDiagnostics.length){
+  const first=ast.parseDiagnostics[0],start=first.start??0,location=ast.getLineAndCharacterOfPosition(start),from=Math.max(0,start-120);
+  detail='\nAFW_PARSE_WITNESS '+JSON.stringify({path,diagnostics:ast.parseDiagnostics.length,code:first.code,start,length:first.length??0,line:location.line+1,column:location.character+1,bytes:Buffer.byteLength(source),sha256:hash(source),contextStart:from,context:source.slice(from,from+240)});
+ }
+ assert.equal(ast.parseDiagnostics.length,0,'budget prepared source parses: '+path+detail);return ast;
+}
+function callShape(node,ast){
+ const callee=node.expression;
+ if(ts.isPropertyAccessExpression(callee)){
+  const receiver=callee.expression.getText(ast),method=callee.name.text;
+  if(receiver==='Reflect'&&method==='apply'&&node.arguments.length===3)return {form:'Reflect.apply',target:node.arguments[0].getText(ast),receiver:node.arguments[1].getText(ast),method};
+  if(method==='call')return {form:'Function.call',target:receiver,method};
+  return {form:'member',receiver,method};
+ }
+ if(ts.isIdentifier(callee))return {form:'direct-fetch',callee:callee.text};
+ return {form:'other'};
+}
+function matchesSelector(row,shape){
+ const s=row.selector;
+ if(row.family==='Reflect.apply')return shape.form===row.family&&shape.target===s.target&&shape.receiver===s.receiver;
+ if(row.family==='Function.call')return shape.form===row.family&&shape.target===s.target;
+ if(row.family==='direct-fetch')return shape.form===row.family&&shape.callee===s.callee;
+ if(shape.form!=='member'||shape.method!==s.method)return false;
+ if(row.family==='body'&&s.receivers){if(!Object.hasOwn(s.receivers,shape.receiver))return false;}
+ else if(s.receiver!==undefined&&shape.receiver!==s.receiver)return false;
+ if(s.exclude==='nominalLease.run'&&shape.receiver==='nominalLease')return false;
+ // These two bind expressions bind pure helper functions, not D1 statements.
+ if(row.family==='SQL-identity'&&shape.method==='bind'&&['provisioning[k]','installation[k]'].includes(shape.receiver))return false;
+ return true;
+}
+export function selectBudgetCallsites(source,path,role){
+ assert(['M','QA'].includes(role));const row=nativeDescriptorByPath.get(path);assert(row,'fixed descriptor path '+path);assert(row.roles.includes(role),'fixed descriptor role '+role+' '+path);
+ const ast=sourceAST(source,path),hits=row.selectors.map(()=>[]),calls=[];
+ function visit(node){
+  if(ts.isCallExpression(node)){
+   const shape=callShape(node,ast),matches=[];
+   row.selectors.forEach((s,i)=>{const pin=s.family==='body'?budgetNativeDescriptorProposal.implementationSupplement.bodyReceiverPins.find(p=>p.path===path&&p.selector===i):null;const effective=pin?{...s,selector:{...s.selector,receivers:pin.receivers}}:s;if(matchesSelector(effective,shape))matches.push(i);});
+   assert(matches.length<=1,'overlapping descriptor at '+role+' '+path+':'+(ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1));
+   if(matches.length){const index=matches[0],at=node.getStart(ast),site={selector:index,position:at,end:node.end,line:ast.getLineAndCharacterOfPosition(at).line+1,shape,node};hits[index].push(site);calls.push(site);}
+  }
+  ts.forEachChild(node,visit);
+ }
+ visit(ast);
+ row.selectors.forEach((s,i)=>assert.equal(hits[i].length,s.expectedCount,'exact prepared AST count '+role+' '+path+' selector '+i+' '+JSON.stringify(s.selector)));
+ for(const p of budgetNativeDescriptorProposal.implementationSupplement.bodyReceiverPins.filter(p=>p.path===path)){const actual={};for(const hit of hits[p.selector])actual[hit.shape.receiver]=(actual[hit.shape.receiver]??0)+1;assert.deepEqual(actual,p.receivers,'exact resolved body receiver '+role+' '+path+' '+p.selector);}
+ return {ast,row,calls,counts:hits.map((v,i)=>({selector:i,count:v.length}))};
+}
+export async function validateBudgetPreparedSource({path,role,prepared,raw}){
+ const descriptor=nativeDescriptorByPath.get(path);assert(descriptor,'fixed native descriptor path '+path);
+ assert.equal(Buffer.byteLength(raw),descriptor.rawBytes,'raw byte pin '+path);
+ assert.equal(hash(raw),descriptor.rawSha256,'raw SHA256 pin '+path);
+ if(role==='M')assert.equal(prepared,raw,'M uses its original role variant '+path);
+ // QA uses the actual existing fixture composition. Its old dynamic hashes are
+ // historical provenance, not a replacement for today's prepared source.
+ const selected=selectBudgetCallsites(prepared,path,role);
+ return {role,path,rawSha256:hash(raw),rawBytes:Buffer.byteLength(raw),preparedSha256:hash(prepared),preparedBytes:Buffer.byteLength(prepared),stage:role==='M'?'M-original-source':'after-existing-QA-fixture-composition',selectors:selected.counts,calls:selected.calls.map(({selector,position,end,line,shape})=>({selector,position,end,line,shape})),selected};
+}
+
+const BUDGET_ID='__afwBudget';
+const RESOURCE_BINDINGS=Object.freeze({
+ DB:'SQL',RELEASE_DB:'SQL',AFW_QA_DB:'SQL',OAUTH_KV:'KV',AFW_FINITE_OWNER_OAUTH_KV:'KV',
+ DELEGATED_RATE_LIMITER:'rateLimiter',AFW_QA_OCCURRENCE_RATE_LIMITER:'rateLimiter',
+ AFW_FINITE_TRIAL_CONTROL:'DO',AFW_INDEPENDENT_CLOSURE:'DO',AFW_RELEASE_EVENTS_NODE:'DO',AFW_DOSSIER_EVENTS_NODE:'DO',AFW_MCP_CLOSURE_NODE:'DO'
+});
+const CAPTURE_METHODS=new Set([...METHODS,'prepare','bind','withSession','limit']);
+const FIXTURE_EXCLUDED_METHODS=new Set(["ownerReferenceConfigure","ownerReferenceObserve","ownerReferenceControl","ownerCleanupFault","ownerCleanupReset","ownerCleanupControl","ownerCleanupFaultSignal","ownerCleanupFaultFacts","ownerCleanupScopeProbe","ownerCleanupNativeRows","ownerCleanupSignal","ownerCleanupFacts","firstConnectionTicketFault","firstConnectionCorruptCompleted","firstConnectionExpiredEntry","firstConnectionBodyControl","firstConnectionBodyState","firstConnectionInstance","firstConnectionBackupFault","firstConnectionAvailability","firstConnectionRestore","firstConnectionState","firstConnectionRelease","firstConnectionConfigure","firstConnectionReseal","firstConnectionContext","firstConnectionProbe","seed","snapshot","mutateCleanup","capsuleFacts","probeCapsuleFacts","seedFutureActivation","probeActivationWire","ownerSourceRead","ownerEffectCount","preEntryCustody","probeStageAvailability","probeNativeCustody","probeOldGuard","probeHistorySchema","probeInitialInventory","alarmInfo","nominalAlarmData","installAlarm","configure","release","releaseBodyCancel","releaseBodyRead","stats","restoreMethods"]);
+const sourceOnlyHookPaths=new Set(['lib/mcp-qa-finite-initial-lease.mjs','lib/mcp-qa-finite-stage-work.mjs','worker/mcp-own/finite.mjs','lib/mcp-qa-finite-owner-oauth-qa.mjs','lib/mcp-qa-finite-owner-notice-get-qa.mjs','lib/mcp-qa-finite-owner-preparation-qa.mjs','lib/mcp-qa-finite-owner-native-receiver.mjs']);
+function descriptorMeta(selector){
+ const {family,selector:s}=selector,d=s.disposition??'';
+ if(d.startsWith('Pure ')||d.startsWith('RPC-result disposal')||d.startsWith('Source helper'))return {excluded:true};
+ if(d.startsWith('Workflow '))return {dormant:true};
+ if(family==='identity'||family==='SQL-identity'||d.includes('holder identity edge')||d.startsWith('DO namespace'))return {edge:'holder'};
+ if(family==='body')return s.method==='getReader'?{edge:'reader'}:{operation:s.method,exposedBytes:s.method==='read'};
+ if(family==='rateLimiter')return {operation:'limit',resource:'rateLimiter'};
+ if(family==='direct-fetch')return {operation:'fetch',classifyFetch:true};
+ if(d.startsWith('DO named RPC'))return {operation:'rpc',resource:'DO'};
+ if(d.startsWith('DO fetch'))return {operation:'fetch',resource:'DO'};
+ if(family==='Function.call'&&d==='fixed-selector/helper-or-dormant')return {excluded:true};
+ if(family==='Function.call'&&s.target==='withSession')return {edge:'holder'};
+ return s.method?{operation:s.method}:{};
+}
+// Only inserted compiler data uses these factories; original business nodes are untouched.
+export function createBudgetLiteral(value){
+ const f=ts.factory,active=new Set();
+ const build=value=>{
+  if(value===null)return f.createNull();
+  if(typeof value==='string')return f.createStringLiteral(value);
+  if(typeof value==='boolean')return value?f.createTrue():f.createFalse();
+  if(typeof value==='number'){
+   assert(Number.isFinite(value),'finite compiler JSON number');
+   const normalized=value===0?0:value;
+   return normalized<0?f.createPrefixUnaryExpression(ts.SyntaxKind.MinusToken,f.createNumericLiteral(-normalized)):f.createNumericLiteral(normalized);
+  }
+  assert(value&&typeof value==='object','supported compiler JSON value');
+  const array=Array.isArray(value),prototype=Object.getPrototypeOf(value);
+  assert(array?prototype===Array.prototype:prototype===Object.prototype||prototype===null,'plain compiler JSON data');
+  assert.equal(Object.getOwnPropertySymbols(value).length,0,'no compiler symbol fields');
+  assert(!active.has(value),'acyclic compiler JSON data');active.add(value);
+  try{
+   const descriptors=Object.getOwnPropertyDescriptors(value);
+   for(const descriptor of Object.values(descriptors))assert(Object.hasOwn(descriptor,'value'),'no compiler data accessors');
+   if(array){
+    const elements=[];for(let i=0;i<descriptors.length.value;i++)elements.push(Object.hasOwn(descriptors,String(i))?build(descriptors[i].value):f.createNull());
+    return f.createArrayLiteralExpression(elements);
+   }
+   return f.createObjectLiteralExpression(Object.keys(descriptors).filter(key=>descriptors[key].enumerable).map(key=>f.createPropertyAssignment(f.createStringLiteral(key),build(descriptors[key].value))));
+  }finally{active.delete(value);}
+ };
+ return build(value);
+}
+export function createBudgetScopeExpression(text){
+ const f=ts.factory,id=name=>f.createIdentifier(name),property=(name,key)=>f.createPropertyAccessExpression(id(name),key);
+ const conditional=(condition,yes,no)=>f.createConditionalExpression(condition,f.createToken(ts.SyntaxKind.QuestionToken),f.createStringLiteral(yes),f.createToken(ts.SyntaxKind.ColonToken),f.createStringLiteral(no));
+ switch(text){
+  case 'began+5000':return f.createBinaryExpression(id('began'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
+  case 'entered+5000':return f.createBinaryExpression(id('entered'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
+  case 'started+5000':return f.createBinaryExpression(id('started'),f.createToken(ts.SyntaxKind.PlusToken),f.createNumericLiteral(5000));
+  case 'parent.lease':return property('parent','lease');
+  case "metadata.method==='POST'?'authorize_post':'authorize_get'":return conditional(f.createBinaryExpression(property('metadata','method'),f.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),f.createStringLiteral('POST')),'authorize_post','authorize_get');
+  case "consent?'monitoring_post':'monitoring_get'":return conditional(id('consent'),'monitoring_post','monitoring_get');
+  default:assert.fail('fixed compiler scope expression required');
+ }
+}
+// Source order is independent of esbuild's concurrent onLoad callbacks.
+const readerCatalog=[];
+for(const role of ['M','QA']){
+ const modules=[...budgetNativeDescriptorProposal.sourceDescriptors,...budgetNativeDescriptorProposal.packages]
+  .filter(module=>module.roles.includes(role)).sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
+ for(const descriptor of modules){
+  const groups=Array.isArray(descriptor.selectors)
+   ?descriptor.selectors.flatMap((row,index)=>descriptorMeta(row).edge==='reader'?[[index,row.expectedCount]]:[])
+   :[['readerFactory',descriptor.selectors.readerFactory??0]];
+  for(const [selector,count] of groups)for(let occurrence=1;occurrence<=count;occurrence++){
+   readerCatalog.push({id:readerCatalog.length+1,role,path:descriptor.path,selector,occurrence});
+  }
+ }
+}
+assert.equal(readerCatalog.length,budgetReaderSiteCount,'closed reader catalog and runtime enum agree');
+
+function attachReaderSites(ast,nodes,selected,role,path){
+ const expected=readerCatalog.filter(entry=>entry.role===role&&entry.path===path);
+ const slots=new Map((selected?.calls??[]).map(call=>[call.node,call.selector??call.group]));
+ const occurrences=new Map(),proof=[];
+ for(const [node,meta] of nodes){
+  if(meta.edge!=='reader')continue;
+  const selector=slots.get(node),occurrence=(occurrences.get(selector)??0)+1;occurrences.set(selector,occurrence);
+  const entry=expected.find(row=>row.selector===selector&&row.occurrence===occurrence);
+  assert(entry,'unregistered selected getReader in pinned module '+role+' '+path);
+  assert.equal(callShape(node,ast).method,'getReader');
+  const start=ast.getLineAndCharacterOfPosition(node.getStart(ast));
+  proof.push({...entry,preparedLine:start.line+1,preparedColumn:start.character+1});
+  nodes.set(node,{...meta,readerSite:entry.id});
+ }
+ proof.sort((a,b)=>a.id-b.id);
+ assert.deepEqual(proof.map(row=>row.id),expected.map(row=>row.id),'all pinned readers emitted in '+role+' '+path);
+ return proof;
+}
+function packageSelection(source,path,role){
+ const pin=budgetNativeDescriptorProposal.packages.find(p=>p.path===path);
+ assert(pin&&pin.roles.includes(role),'fixed package role');assert.equal(Buffer.byteLength(source),pin.bytes,'installed package byte pin');assert.equal(hash(source),pin.sha256,'installed package hash pin');
+ const ast=sourceAST(source,path),calls=[],counts=Object.fromEntries(Object.keys(pin.selectors).map(k=>[k,0]));
+ const sdk=path.includes('workers-oauth-provider'),mcp=path.includes('/server/'),jose=path.includes('/jose/');
+ function visit(node){
+  if(ts.isCallExpression(node)){
+   const shape=callShape(node,ast);let group=null,meta=null;
+   if(sdk&&shape.form==='member'&&['env.OAUTH_KV','this.env.OAUTH_KV','kv'].includes(shape.receiver)&&['get','put','list','delete'].includes(shape.method)){group='kv';meta={operation:shape.method,resource:'KV'};}
+   else if(sdk&&shape.form==='direct-fetch'&&shape.callee==='fetch'){group='fetch';meta={operation:'fetch',resource:'JWKS'};}
+   else if(shape.form==='member'&&['read','cancel'].includes(shape.method)&&(['reader','response.body','callbackRequest.body'].includes(shape.receiver))){
+    group=sdk?'readCancel':shape.method;meta={operation:shape.method,exposedBytes:shape.method==='read'};
+   }else if(shape.form==='member'&&shape.method==='getReader'){group='readerFactory';meta={edge:'reader'};}
+   else if(shape.form==='member'&&shape.method==='clone'&&(sdk||mcp)){group='requestClone';meta={edge:'clone'};}
+   else if(sdk&&shape.form==='member'&&shape.method==='formData'){group='requestFormData';meta={operation:'read'};}
+   else if(mcp&&shape.form==='member'&&shape.method==='json'&&shape.receiver==='req'){group='requestJson';meta={operation:'read'};}
+   else if(mcp&&shape.form==='member'&&shape.method==='text'&&shape.receiver==='request'){group='requestText';meta={operation:'read'};}
+   else if(jose&&shape.form==='direct-fetch'&&shape.callee==='fetchImpl'){group='fetchImpl';meta={operation:'fetch',resource:'JWKS'};}
+   else if(jose&&shape.form==='member'&&shape.method==='json'&&shape.receiver==='response'){group='responseJson';meta={operation:'read'};}
+   if(group){assert(Object.hasOwn(counts,group),'package selector category '+path+' '+group);counts[group]++;calls.push({node,meta,group});}
+  }
+  ts.forEachChild(node,visit);
+ }
+ visit(ast);for(const [group,count]of Object.entries(pin.selectors))assert.equal(counts[group],count,'exact installed package selector '+path+' '+group);
+ return {ast,calls,counts,pin};
+}
+
+function entrySelection(source){
+ const pin=budgetNativeDescriptorProposal.entry;assert.equal(Buffer.byteLength(source),pin.bytes,'composed QA entry bytes');assert.equal(hash(source),pin.sha256,'composed QA entry pin');
+ const nativeMembers=budgetNativeDescriptorProposal.implementationSupplement.entryNativeMembers;
+ const extraExpected=budgetNativeDescriptorProposal.implementationSupplement.entryAdditionalCounts;
+ const ast=sourceAST(source,'<stdin>'),counts=Object.fromEntries(Object.keys(pin.reflectSelectors).map(k=>[k,0])),members=Object.fromEntries(Object.keys(nativeMembers).map(k=>[k,0])),extras=Object.fromEntries(Object.keys(extraExpected).map(k=>[k,0])),calls=[];
+ function visit(node){
+  if(ts.isCallExpression(node)){
+   const shape=callShape(node,ast);
+   if(shape.form==='Reflect.apply'){
+    const key=shape.target+' → '+shape.receiver;assert(Object.hasOwn(counts,key),'unmapped QA entry Reflect.apply '+key);counts[key]++;
+    let meta={};
+    if(['nodeName','nodeString'].includes(shape.target))meta={excluded:true};
+    else if(shape.target==='selfGet')meta={edge:'holder'};
+    else if(['session','withSession','dbSession','prepare','originalPrepare','bind'].includes(shape.target))meta={edge:'holder'};
+    else if(['fetcher','actualFetch'].includes(shape.target))meta={operation:'fetch',classifyFetch:true};
+    calls.push({node,meta,group:key});
+   }else if(shape.form==='member'&&Object.hasOwn(members,shape.receiver+' → '+shape.method)){
+    const key=shape.receiver+' → '+shape.method;members[key]++;calls.push({node,meta:{operation:shape.method},group:key});
+   }else if(shape.form==='direct-fetch'&&shape.callee==='fetch'){
+    extras.fetch++;calls.push({node,meta:{operation:'fetch',classifyFetch:true},group:'fetch'});
+   }else if(shape.form==='member'&&shape.method==='json'&&['r','request'].includes(shape.receiver)){
+    extras.json++;calls.push({node,meta:{operation:'read'},group:'json'});
+   }else if(shape.form==='member'&&['prepare','bind','first','all','run'].includes(shape.method)&&/^(?:db|this\.env\.RELEASE_DB|env\.RELEASE_DB)(?:\.prepare\(|$)/.test(shape.receiver)){
+    extras[shape.method]++;calls.push({node,meta:['prepare','bind'].includes(shape.method)?{edge:'holder'}:{operation:shape.method},group:shape.method});
+   }
+  }
+  ts.forEachChild(node,visit);
+ }
+ visit(ast);assert.deepEqual(members,nativeMembers,'exact composed entry native member selectors');assert.deepEqual(extras,extraExpected,'exact composed entry SQL/body selectors');
+ for(const [key,count]of Object.entries(pin.reflectSelectors))assert.equal(counts[key],count,'exact composed QA entry selector '+key);
+ return {ast,calls,counts:{reflect:counts,members,extras}};
+}
+
+
+function budgetScopeSeams(source,path){
+ const replace=(needle,replacement)=>{assert.equal(source.split(needle).length-1,1,'fixed scope seam '+path+' '+needle);source=source.replace(needle,replacement);};
+ if(path==='worker/mcp-own/finite.mjs')replace('const url=new URL(request.url),path=url.pathname;',"const url=new URL(request.url),path=url.pathname;if(path==='/_fixture/finite-budget')return new Response(JSON.stringify(__afwBudget.snapshot()),{headers:{'Content-Type':'application/json'}});");
+ if(path==='lib/mcp-qa-finite-initial-lease.mjs'){
+  const n='const lease=Object.freeze({signal:controller.signal,assertCurrent:check});';
+  replace(n,n+'__afwBudget.clock(lease,end);');
+  replace('current(l,fail);actual=work(l,until);','actual=__afwBudget.childCall(lease,l,until,()=>{current(l,fail);return work(l,until);});');
+ }
+ if(path==='lib/mcp-qa-finite-initial-entry.mjs'){
+  const n='parent=clock(r.createdAt+30000,holders);const lease=parent.lease;';
+  replace(n,n+"__afwBudget.root(lease,'setup',__afwBudget.deadline(lease));");
+ }
+ if(path==='lib/mcp-qa-finite-initial-cleanup.mjs'){
+  const n='parent=clock(Date.now()+30000,holders);const lease=parent.lease;';
+  replace(n,n+"__afwBudget.root(lease,'cleanup_before_restore',__afwBudget.deadline(lease));");
+ }
+ if(path==='lib/mcp-qa-finite-owner-preparation.mjs'){
+  const n='requestContexts.set(lease,{root:lease,startedAt,remaining,deadline:()=>deadline});';
+  replace(n,n+'__afwBudget.clock(lease,deadline);');
+  const d='const ancestor=requestContexts.get(parent);if(!ancestor)return;';
+  replace(d,'__afwBudget.alias(parent,lease);'+d);
+  replace('current(childLease);return work(childLease);','current(childLease);return __afwBudget.childCall(lease,childLease,end,()=>work(childLease));');
+ }
+ if(path==='lib/mcp-qa-finite-initial-material.mjs'){
+  const n='const lease=Object.freeze({signal:controller.signal,assertCurrent:check});narrow(end);';
+  replace(n,n+'__afwBudget.alias(originalLease,lease);');
+  replace('current();return work(l);','current();return __afwBudget.childCall(lease,l,childEnd,()=>work(l));');
+ }
+ 
+ if(['lib/mcp-qa-finite-owner-phase-context.mjs','lib/mcp-qa-finite-initial-owner-source.mjs'].includes(path)){
+  const n='clock=createFiniteInitialLease(deadline,deadline,holders,fail);';replace(n,n+'__afwBudget.alias(parent,clock.lease);');
+ }
+ if(path==='lib/mcp-qa-finite-owner-phase-context.mjs'){
+  const n='clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);';
+  assert.equal(source.split(n).length-1,4,'four actual request clock aliases');source=source.replaceAll(n,n+'__afwBudget.alias(originalLease,clock.lease);');
+ }
+ if(path==='lib/mcp-qa-finite-historical-source.mjs')replace('current();return work(abort.signal,current);','current();return __afwBudget.childInvoke(originalLease,start+5000,work,undefined,[abort.signal,current]);');
+ if(path==='lib/mcp-qa-finite-owner-cleanup.mjs')replace('current(clock.lease);return work(clock.lease,end);','current(clock.lease);return __afwBudget.childCall(originalLease,clock.lease,end,()=>work(clock.lease,end));');
+ if(path==='lib/mcp-qa-finite-policy-transport.mjs')replace('current(c);return fn(c,end);','current(c);return __afwBudget.childCall(originalLease,c,end,()=>fn(c,end));');
+ return source;
+}
+
+// A reference target must remain a reference; its receiver/key reads are still visited.
+export function isBudgetReferenceTarget(original){
+ let node=original;
+ for(;;){
+  const parent=node.parent;if(!parent)return false;
+  if(ts.isParenthesizedExpression(parent)&&parent.expression===node){node=parent;continue;}
+  if(ts.isBinaryExpression(parent)&&parent.left===node)return parent.operatorToken.kind>=ts.SyntaxKind.FirstAssignment&&parent.operatorToken.kind<=ts.SyntaxKind.LastAssignment;
+  if((ts.isPrefixUnaryExpression(parent)||ts.isPostfixUnaryExpression(parent))&&parent.operand===node)return parent.operator===ts.SyntaxKind.PlusPlusToken||parent.operator===ts.SyntaxKind.MinusMinusToken;
+  if(ts.isDeleteExpression(parent)&&parent.expression===node)return true;
+  if((ts.isForInStatement(parent)||ts.isForOfStatement(parent))&&parent.initializer===node)return true;
+  if((ts.isSpreadElement(parent)||ts.isSpreadAssignment(parent))&&parent.expression===node){node=parent;continue;}
+  if(ts.isPropertyAssignment(parent)&&parent.initializer===node){node=parent;continue;}
+  if(ts.isArrayLiteralExpression(parent)&&parent.elements.includes(node)){node=parent;continue;}
+  if(ts.isObjectLiteralExpression(parent)&&parent.properties.includes(node)){node=parent;continue;}
+  // In particular, do not ascend through a larger member receiver or computed key.
+  return false;
+ }
+}
+export function rewriteBudgetIdentityAccess(original,node,{ast,path,hook,count}){
+ if(!(ts.isPropertyAccessExpression(original)||ts.isElementAccessExpression(original))||isBudgetReferenceTarget(original))return node;
+ const f=ts.factory,literal=createBudgetLiteral;
+ if(ts.isElementAccessExpression(original)&&ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method'){
+  count('identity');return hook('readMethod',[node.expression,node.argumentExpression]);
+ }
+ if(ts.isPropertyAccessExpression(original)){
+  const method=original.name.text,receiver=original.expression.getText(ast),optional=!!original.questionDotToken;
+  if(path==='worker/mcp-own/finite.mjs'&&receiver==='request'&&method==='method'){count('scope');return hook('methodValue',[f.createIdentifier('request'),node]);}
+  const resource=RESOURCE_BINDINGS[method];
+  if(resource&&/(?:^|\.)env$/.test(receiver)){count('identity');return hook('nativeHolder',[node,literal(resource),literal(resource==='DO'?'namespace':'holder')]);}
+  if(method==='storage'&&/^(?:this\.ctx|ctx|context)$/.test(receiver)){count('identity');return hook('nativeHolder',[node,literal('DO'),literal('storage')]);}
+  if(method==='body'){count('body');return hook('body',[node.expression,optional?f.createTrue():f.createFalse()]);}
+  if((CAPTURE_METHODS.has(method)||ts.isVariableDeclaration(original.parent)&&original.parent.name.getText(ast)==='method')&&!(ts.isCallExpression(original.parent)&&original.parent.expression===original)){
+   count('identity');return hook('readMethod',[node.expression,literal(method),optional?f.createTrue():f.createFalse()]);
+  }
+ }
+ return node;
+}
+
+// Pinned cleanup source gives work() a local put adapter around the captured transaction leaf.
+function isInitialCleanupPutAdapter(node,ast,path){
+ if(path!=='lib/mcp-qa-finite-initial-cleanup.mjs')return false;
+ const call=node.parent;
+ if(!ts.isCallExpression(call)||call.expression.getText(ast)!=='work'||call.arguments[0]!==node)return false;
+ if(!node.properties.some(p=>ts.isShorthandPropertyAssignment(p)&&p.name.text==='put'))return false;
+ let block=call.parent;
+ while(block&&!ts.isBlock(block))block=block.parent;
+ if(!block)return false;
+ const definitions=block.statements.filter(ts.isVariableStatement)
+  .filter(statement=>statement.declarationList.flags&ts.NodeFlags.Const)
+  .flatMap(statement=>[...statement.declarationList.declarations])
+  .filter(d=>ts.isIdentifier(d.name)&&d.name.text==='put');
+ const wrapper=definitions.length===1?definitions[0].initializer:null;
+ return Boolean(wrapper&&ts.isArrowFunction(wrapper)&&wrapper.getText(ast)==='async(key,value)=>{check();await parent.retain(Reflect.apply(tp,tx,[key,value]));check();}');
+}
+
+export function transformBudgetPreparedSource(source,path,role){
+ source=budgetScopeSeams(source,path);
+ const selected=nativeDescriptorByPath.has(path)?selectBudgetCallsites(source,path,role):budgetNativeDescriptorProposal.packages.some(p=>p.path===path)?packageSelection(source,path,role):path==='<stdin>'?entrySelection(source):null;
+ assert(selected||sourceOnlyHookPaths.has(path)||path==='<stdin>','fixed transform input '+path);
+ const ast=selected?.ast??sourceAST(source,path),selectedNodes=new Map();
+ if(selected)for(const call of selected.calls)selectedNodes.set(call.node,call.meta??descriptorMeta(selected.row.selectors[call.selector]));
+ 
+ // Supplemental native body methods omitted by the earlier lexical method set.
+ // The fixed delegated adapter contains five existing clones and two consumers;
+ // only its actual P1 branches are claimed at runtime.
+ if(path==='lib/delegated-oauth-worker.mjs'){
+  const expected={clone:5,json:2},found={clone:0,json:0};
+  const scan=n=>{if(ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&Object.hasOwn(expected,n.expression.name.text)){
+   const method=n.expression.name.text;found[method]++;assert(!selectedNodes.has(n));selectedNodes.set(n,method==='clone'?{edge:'clone'}:{operation:'read'});
+  }ts.forEachChild(n,scan);};scan(ast);assert.deepEqual(found,expected,'fixed delegated body methods');
+ }
+ const readerSites=attachReaderSites(ast,selectedNodes,selected,role,path);
+ const transactionCallbacks=new Set();
+ for(const node of selectedNodes.keys()){
+  const shape=callShape(node,ast);
+  const cleanupJournalTransaction=path==='lib/mcp-qa-finite-owner-cleanup-journal.mjs'&&shape.form==='Reflect.apply'&&shape.target==='c.transaction'&&shape.receiver==='c.storage';
+  const transaction=cleanupJournalTransaction||shape.method==='transaction'||['transaction','native.transaction','nt'].includes(shape.target);
+  if(!transaction)continue;
+  const arg=shape.form==='Reflect.apply'&&ts.isArrayLiteralExpression(node.arguments[2])?node.arguments[2].elements[0]:shape.form==='Function.call'?node.arguments[1]:node.arguments[0];
+  if(cleanupJournalTransaction)assert(arg&&ts.isArrowFunction(arg),'fixed cleanup journal transaction callback');
+  if(arg&&(ts.isArrowFunction(arg)||ts.isFunctionExpression(arg)))transactionCallbacks.add(arg);
+ }
+ const f=ts.factory,id=()=>f.createIdentifier(BUDGET_ID),access=name=>f.createPropertyAccessExpression(id(),name);
+ const literal=createBudgetLiteral;
+ const hook=(name,args)=>f.createCallExpression(access(name),undefined,args);
+ let nativeCalls=0,identityEdges=0,bodyEdges=0,facadeEdges=0,scopeEdges=0,guardEdges=0,cleanupPutAdapters=0;
+ const closure=expression=>f.createArrowFunction(undefined,undefined,[],undefined,f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),expression);
+ const result=ts.transform(ast,[context=>{
+  const visit=node=>{
+   const original=node;
+   // Preserve the original callee getter evaluation before argument evaluation.
+   if(ts.isCallExpression(node)&&selectedNodes.has(node)){
+    const meta=selectedNodes.get(node),expr=node.expression;
+    if(meta.excluded)return ts.visitEachChild(node,visit,context);
+    const args=node.arguments.map(arg=>ts.visitNode(arg,visit)),data=literal(meta);
+    nativeCalls++;
+    if(ts.isPropertyAccessExpression(expr)&&expr.expression.getText(ast)==='Reflect'&&expr.name.text==='apply'){
+     return f.updateCallExpression(node,hook('reflect',[ts.visitNode(expr,visit),data]),node.typeArguments,args);
+    }
+    if(ts.isPropertyAccessExpression(expr)&&expr.name.text==='call'){
+     return f.updateCallExpression(node,hook('call',[ts.visitNode(expr.expression,visit),data]),node.typeArguments,args);
+    }
+    if(ts.isPropertyAccessExpression(expr)){
+     const optionalReceiver=!!expr.questionDotToken,optionalMethod=!!node.questionDotToken;
+     const callee=hook('member',[ts.visitNode(expr.expression,visit),literal(expr.name.text),data,optionalReceiver?f.createTrue():f.createFalse(),optionalMethod?f.createTrue():f.createFalse()]);
+     return optionalReceiver||optionalMethod?f.createCallChain(callee,f.createToken(ts.SyntaxKind.QuestionDotToken),node.typeArguments,args):f.updateCallExpression(node,callee,node.typeArguments,args);
+    }
+    assert(ts.isIdentifier(expr),'fixed call form');
+    return f.updateCallExpression(node,hook('direct',[expr,data]),node.typeArguments,args);
+   }
+   node=ts.visitEachChild(node,visit,context);
+   if(ts.isThrowStatement(original)){
+    let owner=original.parent;
+    while(owner&&!ts.isFunctionLike(owner))owner=owner.parent;
+    const name=owner?.name?.getText(ast)??(owner&&ts.isVariableDeclaration(owner.parent)?owner.parent.name.getText(ast):null);
+    if(['fail','finiteNativeFailure'].includes(name)){guardEdges++;return f.updateThrowStatement(node,hook('guardValue',[node.expression]));}
+   }
+   if(path==='<stdin>'&&ts.isMethodDeclaration(original)&&ts.isClassDeclaration(original.parent)&&FIXTURE_EXCLUDED_METHODS.has(original.name.getText(ast))){
+    const modifiers=original.modifiers?.some(m=>m.kind===ts.SyntaxKind.AsyncKeyword)?[f.createModifier(ts.SyntaxKind.AsyncKeyword)]:undefined;
+    const invoke=f.createArrowFunction(modifiers,undefined,[],undefined,f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),node.body);
+    scopeEdges++;return f.updateMethodDeclaration(node,node.modifiers,node.asteriskToken,node.name,node.questionToken,node.typeParameters,node.parameters,node.type,f.createBlock([f.createReturnStatement(hook('fixture',[invoke]))],true));
+   }
+
+   if(ts.isCallExpression(original)){
+    const callee=original.expression.getText(ast),text=original.getText(ast);
+
+    if(callee==='Promise.resolve().then'&&path==='lib/mcp-qa-finite-bootstrap-native.mjs'&&text.includes('r=await fetcher(')){
+     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('child'),createBudgetScopeExpression('began+5000'),closure(node)]);
+    }
+    if(callee==='Promise.resolve().then'&&path==='lib/mcp-qa-finite-initial-old-guard.mjs'&&text.includes('response=await fetcher(')){
+     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('controller'),createBudgetScopeExpression('entered+5000'),closure(node)]);
+    }
+    if(path==='lib/mcp-qa-finite-initial-custody-probe.mjs'&&ts.isParenthesizedExpression(original.expression)&&ts.isArrowFunction(original.expression.expression)&&text.includes("fetcher(ROOT+'/tokens/verify'")){
+     scopeEdges++;return hook('childCall',[f.createIdentifier('originalLease'),f.createIdentifier('childCheck'),createBudgetScopeExpression('started+5000'),closure(node)]);
+    }
+
+    if(path==='lib/mcp-qa-finite-stage-work.mjs'&&callee==='scopes.run'){scopeEdges++;return hook('run',[f.createIdentifier('originalLease'),closure(node)]);}
+    let phase=null;
+    if(path==='lib/mcp-qa-finite-owner-phase-context.mjs'&&callee==='readPrivateQaFiniteOwnerSdkGrant')phase='sdk_lookup';
+    if(path==='lib/mcp-qa-finite-owner-cleanup.mjs'&&callee==='child'&&text.includes('api.revokeGrant('))phase='sdk_reduction';
+    if(path==='lib/mcp-qa-finite-owner-cleanup.mjs'&&callee==='readCleanupFinalInventory')phase='final_inventory';
+    if(path==='lib/mcp-qa-finite-initial-cleanup.mjs'&&callee==='parent.child'&&text.includes("seal('RestoreSend'"))phase='restore';
+    if(phase){scopeEdges++;return hook('phase',[literal(phase),closure(node)]);}
+    if(path==='worker/mcp-own/finite.mjs'){
+     if(callee==='worker.fetch'){scopeEdges++;return hook('transport',[f.createIdentifier('request'),f.createIdentifier('path'),closure(node)]);}
+     const control=callee==='forwardFiniteOwnerChoice'?'setup':callee==='forwardPrivateFiniteOwnerOAuth'?'authorize':text.startsWith('(path===')?'monitoring':null;
+     if(control){scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),control==='setup'?literal(control):hook('methodPhase',[f.createIdentifier('request'),literal(control)]),f.createIdentifier('request'),closure(node)]);}
+    }
+    if(path==='lib/mcp-qa-finite-owner-native-receiver.mjs'&&callee==='handlePrivateQaFiniteOwnerConnection'){
+     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),literal('setup'),f.createIdentifier('request'),closure(node)]);
+    }
+    if(path==='lib/mcp-qa-finite-owner-oauth-qa.mjs'&&callee==='handlePrivateQaFiniteOwnerOAuth'){
+     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),createBudgetScopeExpression("metadata.method==='POST'?'authorize_post':'authorize_get'"),f.createIdentifier('request'),closure(node)]);
+    }
+    if(path==='lib/mcp-qa-finite-owner-notice-get-qa.mjs'&&callee.startsWith('(consent?handlePrivateQaFiniteOwnerNoticeConsent')){
+     scopeEdges++;return hook('control',[createBudgetScopeExpression('parent.lease'),createBudgetScopeExpression("consent?'monitoring_post':'monitoring_get'"),f.createIdentifier('request'),closure(node)]);
+    }
+   }
+
+   if(ts.isCallExpression(original)&&ts.isPropertyAccessExpression(original.expression)&&original.expression.name.text==='bind'&&ts.isPropertyAccessExpression(original.expression.expression)&&CAPTURE_METHODS.has(original.expression.expression.name.text)){
+    identityEdges++;return f.updateCallExpression(node,hook('bind',[node.expression.expression]),node.typeArguments,node.arguments);
+   }
+   if(ts.isCallExpression(original)&&original.expression.getText(ast)==='Response.json'){
+    bodyEdges++;return hook('localResponse',[node]);
+   }
+   
+   if(path==='<stdin>'&&ts.isClassDeclaration(original)&&original.name?.text==='Initial'){
+    const method=f.createMethodDeclaration(undefined,undefined,'budgetSnapshot',undefined,undefined,[],undefined,f.createBlock([f.createReturnStatement(hook('snapshot',[]))],true));
+    return f.updateClassDeclaration(node,node.modifiers,node.name,node.typeParameters,node.heritageClauses,[...node.members,method]);
+   }
+   const identity=rewriteBudgetIdentityAccess(original,node,{ast,path,hook,count:kind=>{if(kind==='identity')identityEdges++;else if(kind==='body')bodyEdges++;else if(kind==='scope')scopeEdges++;else assert.fail('fixed identity hook kind');}});
+   if(identity!==node)return identity;
+   if(ts.isNewExpression(original)&&ts.isIdentifier(original.expression)&&['Request','Response','ReadableStream'].includes(original.expression.text)){
+    bodyEdges++;return f.createCallExpression(hook('construct',[node.expression,literal(original.expression.text)]),node.typeArguments,node.arguments??[]);
+   }
+   
+   if(transactionCallbacks.has(original)){
+    assert.equal(original.parameters.length,1,'fixed native transaction callback argument');
+    const parameter=original.parameters[0].name;assert(ts.isIdentifier(parameter),'native tx identity argument');
+    const mark=hook('transactionArgument',[parameter]);
+    const body=ts.isBlock(node.body)?f.updateBlock(node.body,[f.createExpressionStatement(mark),...node.body.statements]):f.createParenthesizedExpression(f.createCommaListExpression([mark,node.body]));
+    identityEdges++;
+    return ts.isArrowFunction(node)?f.updateArrowFunction(node,node.modifiers,node.typeParameters,node.parameters,node.type,node.equalsGreaterThanToken,body):f.updateFunctionExpression(node,node.modifiers,node.asteriskToken,node.name,node.typeParameters,node.parameters,node.type,body);
+   }
+   if(ts.isObjectLiteralExpression(original)){
+    const names=original.properties.filter(p=>(ts.isMethodDeclaration(p)||ts.isPropertyAssignment(p)&&(ts.isArrowFunction(p.initializer)||ts.isFunctionExpression(p.initializer)))&&p.name&&!ts.isComputedPropertyName(p.name)).map(p=>p.name.getText(ast).replace(/^['"]|['"]$/g,'')).filter(name=>CAPTURE_METHODS.has(name)||name==='fetch'||name==='rpc');
+    if(isInitialCleanupPutAdapter(original,ast,path)){cleanupPutAdapters++;names.push('put');}
+    if(names.length){facadeEdges++;return hook('facadeHolder',[node,literal(names)]);}
+   }
+   if(ts.isBinaryExpression(original)&&original.operatorToken.kind===ts.SyntaxKind.EqualsToken&&(ts.isPropertyAccessExpression(original.left)||ts.isElementAccessExpression(original.left))&&
+      (ts.isArrowFunction(original.right)||ts.isFunctionExpression(original.right))&&(ts.isElementAccessExpression(original.left)||CAPTURE_METHODS.has(original.left.name.text))){
+    facadeEdges++;return f.updateBinaryExpression(node,node.left,node.operatorToken,hook('facade',[node.right]));
+   }
+   return node;
+  };
+  return root=>ts.visitNode(root,visit);
+ }]);
+
+ const expectedScopes={
+  '<stdin>':51,
+  'lib/mcp-qa-finite-stage-work.mjs':7,
+  'worker/mcp-own/finite.mjs':7,
+  'lib/mcp-qa-finite-owner-native-receiver.mjs':1,
+  'lib/mcp-qa-finite-owner-oauth-qa.mjs':1,
+  'lib/mcp-qa-finite-owner-notice-get-qa.mjs':1,
+  'lib/mcp-qa-finite-owner-phase-context.mjs':1,
+  'lib/mcp-qa-finite-owner-cleanup.mjs':2,
+  'lib/mcp-qa-finite-initial-cleanup.mjs':1,
+  'lib/mcp-qa-finite-bootstrap-native.mjs':1,
+  'lib/mcp-qa-finite-initial-old-guard.mjs':1,
+  'lib/mcp-qa-finite-initial-custody-probe.mjs':1
+ };
+ assert.equal(cleanupPutAdapters,path==='lib/mcp-qa-finite-initial-cleanup.mjs'?1:0,'fixed local cleanup put adapter');
+ assert.equal(scopeEdges,expectedScopes[path]??0,'fixed prepared scope hook count '+role+' '+path);
+ const transformed=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();sourceAST(transformed,path);
+ return {source:"import {budget as "+BUDGET_ID+"} from 'afw:budget-runtime';\n"+transformed,counts:{nativeCalls,identityEdges,bodyEdges,facadeEdges,scopeEdges,guardEdges},selectorCounts:selected?.counts??[],readerSites};
+}
+
+const scopeInputPins=budgetNativeDescriptorProposal.implementationSupplement.scopeInputPins;
+function requireOrdinaryObserver(){
+ assert.equal(process.env.AFW_BUDGET_DIAGNOSTIC_CANDIDATE,undefined,'deprecated diagnostic candidate rejected before I0');
+}
+export function createBudgetCompiler(role){
+ assert(['M','QA'].includes(role));const testRevision=process.env.GITHUB_SHA;assert.match(testRevision??'',/^[a-f0-9]{40}$/,'budget actual Actions revision before I0');
+ requireOrdinaryObserver();const runtimeOptions={testRevision,workerRole:role};
+ const records=new Map(),prepared=new Map(),expected=new Set(budgetNativeDescriptorProposal.sourceDescriptors.filter(p=>p.roles.includes(role)).map(p=>p.path));
+ for(const p of scopeInputPins.filter(p=>p.roles.includes(role)))expected.add(p.path);
+ for(const p of budgetNativeDescriptorProposal.packages.filter(p=>p.roles.includes(role)))expected.add(p.path);
+ if(role==='QA')expected.add('<stdin>');
+ const wanted=path=>expected.has(path);
+ async function transform(path,source){
+  assert(wanted(path),'unexpected instrumentation path '+role+' '+path);assert(!records.has(path),'duplicate prepared module '+role+' '+path);
+  const raw=path==='<stdin>'?source:await readFile(path,'utf8');
+  if(nativeDescriptorByPath.has(path))await validateBudgetPreparedSource({path,role,prepared:source,raw});
+  else if(path!=='<stdin>'&&!path.startsWith('node_modules/')){
+   const pin=scopeInputPins.find(p=>p.path===path);assert(pin?.roles.includes(role));assert.equal(hash(raw),pin.rawSha256,'scope input raw pin '+path);assert.equal(Buffer.byteLength(raw),pin.rawBytes);if(role==='M')assert.equal(source,raw);
+  }
+  const result=transformBudgetPreparedSource(source,path,role);
+  records.set(path,{role,path,rawBytes:Buffer.byteLength(raw),rawSha256:hash(raw),preparedBytes:Buffer.byteLength(source),preparedSha256:hash(source),emittedBytes:Buffer.byteLength(result.source),emittedSha256:hash(result.source),counts:result.counts,selectors:result.selectorCounts,readerSites:result.readerSites});
+  prepared.set(path,result.source);return result.source;
+ }
+ function plugin(existing=null){
+  return {name:'fixed-finite-budget-'+role,setup(builder){
+   builder.onResolve({filter:/^afw:budget-runtime$/},()=>({path:'runtime',namespace:'afw-budget'}));
+   builder.onLoad({filter:/.*/,namespace:'afw-budget'},()=>({contents:"import {createBudgetRuntime} from "+JSON.stringify(resolve('test/fixtures/finite-budget-diagnostics.mjs'))+";export const budget=createBudgetRuntime("+JSON.stringify(runtimeOptions)+");",loader:'js',resolveDir:process.cwd()}));
+   if(existing){
+    existing.setup({...builder,onLoad(options,loader){
+     builder.onLoad(options,async args=>{
+      const result=await loader(args),path=objectPath(args.path);
+      if(result?.contents!==undefined&&wanted(path))return {...result,contents:await transform(path,String(result.contents))};
+      return result;
+     });
+    }});
+   }
+   builder.onLoad({filter:/\.(?:mjs|js|ts)$/},async args=>{
+    const path=objectPath(args.path);if(!wanted(path))return undefined;
+    return {contents:await transform(path,await readFile(args.path,'utf8')),loader:path.endsWith('.ts')?'ts':'js'};
+   });
+   builder.onEnd(async result=>{
+    if(result.errors.length)return;
+    assert.deepEqual([...records.keys()].sort(),[...expected].sort(),'closed prepared role input map '+role);
+    assert(!Object.keys(result.metafile?.inputs??{}).some(path=>path.endsWith('finite-budget-descriptors.json')||path.endsWith('finite-budget-world.mjs')||path.endsWith('finite-budget-evidence.mjs')),'Node-only map/compiler excluded from Worker bundle');
+    const actualIds=[...records.values()].flatMap(record=>record.readerSites.map(site=>site.id)).sort((a,b)=>a-b);
+    assert.deepEqual(actualIds,readerCatalog.filter(site=>site.role===role).map(site=>site.id),'complete role reader catalog before I0');
+    if(process.env.AFW_BUDGET_PREFLIGHT){
+     const prior=JSON.parse(await readFile(process.env.AFW_BUDGET_PREFLIGHT,'utf8'));
+     assert.equal(prior.source,testRevision);assert.equal(prior.run,process.env.GITHUB_RUN_ID);assert.equal(prior.attempt,process.env.GITHUB_RUN_ATTEMPT);
+     assert.equal(prior.observerChronology,'afw.finite-budget-chronology.syn.v2','same v2 preflight');
+     const shape=list=>list.map(r=>({role:r.role,path:r.path,rawBytes:r.path==='<stdin>'?null:r.rawBytes,rawSha256:r.path==='<stdin>'?null:r.rawSha256,counts:r.counts,selectors:r.selectors,readerSites:r.readerSites})).sort((a,b)=>a.path.localeCompare(b.path));
+     assert.deepEqual(shape([...records.values()]),shape(prior.inputs[role]),'native prepared role hooks match exact prior pure preflight before I0');
+    }
+   });
+  }};
+ }
+ return Object.freeze({role,plugin,entry:source=>transform('<stdin>',source),records:()=>[...records.values()],prepared:()=>[...prepared]});
+}
+export function attachBudgetEpochCapture(f,{segment='producer',epochs=[],epoch=0}={}){
+ assert(['producer','consumer'].includes(segment));let current=epoch;
+ f.budgetEpochs=epochs;
+ f.captureBudgetEpoch=async reason=>{
+  const qaValue=await f.stub.budgetSnapshot();let QA;try{QA=JSON.parse(JSON.stringify(qaValue));}finally{qaValue[Symbol.dispose]?.();}
+  const worker=await f.mf.getWorker('canary-first-connection'),response=await worker.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/finite-budget');
+  assert.equal(response.status,200);const M=await response.json();
+  for(const [role,snapshot]of Object.entries({M,QA})){
+   assert.equal(snapshot.purpose,'afw.finite-budget-diagnostics.syn.v1');assert.equal(snapshot.workerRole,role);assert.equal(snapshot.testRevision,process.env.GITHUB_SHA);
+   const value={segment,epoch:current,role,reason,capturedAt:Date.now(),snapshot},index=epochs.findIndex(v=>v.segment===segment&&v.epoch===current&&v.role===role);
+   if(index<0)epochs.push(value);else epochs[index]=value;
+  }
+  return epochs;
+ };
+ f.nextBudgetEpoch=()=>{current++;};
+ return f;
+}
+export async function preflightBudgetCompilation(){
+ assert.equal(process.env.AFW_BUDGET_GROUP,'positive');
+ requireOrdinaryObserver();
+ const {initialEntryHarness}=await import('./finite-initial-entry-world.mjs');
+ const graphs=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint:true,budgetCompileOnly:true,budgetQualification:true});
+ assert.equal(graphs.I0Opened,false);assert.equal(graphs.nativeExecutionProduced,false);
+ assert(graphs.budget?.M?.length&&graphs.budget?.QA?.length);
+ assert(graphs.compatibility.M.compatibility_flags.includes('nodejs_compat'));assert(graphs.compatibility.QA.flags.includes('nodejs_compat'));
+ const result={purpose:'afw.finite-budget-preflight.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,inputs:graphs.budget,I0Opened:false,nativeExecutionProduced:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ result.observerChronology='afw.finite-budget-chronology.syn.v2';
+ await mkdir('output/finite-budget/pure',{recursive:true});await writeFile('output/finite-budget/pure/preflight.json',JSON.stringify(result,null,2));
+ return result;
+}
+
+export function instrumentBudgetDiagnostics(source,{moduleRole}={}){
+ assert(moduleRole&&['M','QA'].includes(moduleRole.workerRole)&&typeof moduleRole.path==='string','fixed role/path selector required');
+ return transformBudgetPreparedSource(source,moduleRole.path,moduleRole.workerRole).source;
+}
+export function extendBudgetQualification(entry){
+ return transformBudgetPreparedSource(entry,'<stdin>','QA').source;
+}
+function positiveKind(kind){assert.equal(kind,'positive','SYN budget kind unsupported before I0');assert.equal(process.env.AFW_BUDGET_GROUP,'positive');}
+export async function prepareBudgetProducer(kind,root){
+ positiveKind(kind);
+ const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
+ return produceCheckpoint(root,{variant:'principal',budgetQualification:true});
+}
+
+async function preparePositiveProbe(root){
+ positiveKind('positive');
+ assert.equal(root,'output/finite-budget/producer');
+ assert.equal(process.env.AFW_BUDGET_PREFLIGHT,'output/finite-budget/prior-pure/preflight.json');
+ requireOrdinaryObserver();
+ const checkpoint='output/chronology-native-checkpoint';
+ const {produceCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
+ console.info('AFW_PROBE {"kind":"step","step":"producer-entered"}');
+ await produceCheckpoint(checkpoint,{variant:'principal',budgetQualification:true,deferWait:true});
+ console.info('AFW_PROBE {"kind":"step","step":"producer-returned"}');
+ const returnedAt=Date.now();
+ const {manifest,data}=await verifyBudgetCheckpoint('positive',checkpoint);
+ console.info('AFW_PROBE {"kind":"step","step":"checkpoint-verified"}');
+ const {I0,C0,C1}=manifest;
+ const {completeNormal,completeWrites,referenceRows,referenceReadbacks}=data.budget.ownerReference;
+ const noticeRows=data.facts.rows.filter(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice')).length;
+ const epochs=data.budget.epochs;
+ const recordLimits={operations:16384,guards:16384,scopes:16384};
+ const facts={
+  recordLimits,
+  purpose:'afw.finite-budget-producer-probe.syn.v1',scope:'partial-producer-only',
+  source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
+  I0,C0,C1,returnedAt,completeNormal,completeWrites,referenceRows,referenceReadbacks,noticeRows,
+  disposedBeforeC0:returnedAt<C0,originalAlarmObserved:data.facts.signal.entered!==0,
+  operationalReadiness:false,completePackage:false,PCoff:false
+ };
+ await mkdir(join(root,'graphs'),{recursive:true});
+ await writeFile(join(root,'full-result.json'),JSON.stringify({facts,epochs,preparedInputs:data.budget.preparedInputs},null,2));
+ const aggregates=[{kind:'facts',...facts}];let rejectedProjection=false;
+ const siteMap=Object.values(data.budget.preparedInputs).flatMap(records=>records.flatMap(record=>record.readerSites)).sort((a,b)=>a.id-b.id);
+ assert.deepEqual(siteMap.map(site=>site.id),readerCatalog.map(site=>site.id),'producer contains every fixed site');
+ for(const site of siteMap)aggregates.push({kind:'readerSite',...site});
+ for(const {segment,epoch,role,snapshot} of epochs){
+  const {purpose,eventCalls,byEvent,firstInvalid,invalid,unattributed,reasons}=snapshot.chronology;
+  const who={segment,epoch,role};
+  const {retention,coverage}=snapshot,{scopes,...totals}=snapshot.totals;
+  assert.equal(retention.operationRows.limit,recordLimits.operations);assert.equal(retention.guardRows.limit,recordLimits.guards);assert.equal(retention.scopeRows.limit,recordLimits.scopes);
+  const expectedComplete=coverage.invalid===0&&coverage.unattributed===0&&!coverage.numericOverflow&&retention.scopeRows.omitted===0;
+  assert.equal(coverage.observedMetricsComplete,expectedComplete);
+  let observedProof=null,traceProof=null;
+  try{
+   if(expectedComplete){
+    observedProof=verifyObservedBudgetMetrics(snapshot);
+    if(retention.traceComplete)traceProof=verifyCompleteBudgetTrace(snapshot);
+   }else{
+    assert.throws(()=>verifyObservedBudgetMetrics(snapshot),coverage.numericOverflow?/numeric overflow/:/incomplete observed metrics/);
+   }
+  }catch{
+   rejectedProjection=true;
+   aggregates.push({kind:'proofRejected',...who,expectedComplete});
+  }
+  aggregates.push({kind:'chronology',...who,purpose,eventCalls,byEvent,firstInvalid,invalid,unattributed,coverage});
+  aggregates.push({kind:'retention',...who,retention,observedProof,traceProof});
+  aggregates.push({kind:'totals',...who,totals,enumeratedScopes:scopes.length,maximumEnumeratedScopePeak:scopes.reduce((peak,s)=>Math.max(peak,s.peak),0)});
+  for(const group of snapshot.byPhaseResource)aggregates.push({kind:'phaseResource',...who,...group});
+  aggregates.push({kind:'reasons',...who,reasons});
+  const {beforeRetentionOmission,afterRetentionOmission,firstReaderOrigin}=snapshot.chronology.readerOrigins;
+  assert.equal(beforeRetentionOmission.length,budgetReaderSiteCount+1);assert.equal(afterRetentionOmission.length,budgetReaderSiteCount+1);
+  const sum=array=>array.reduce((total,value)=>total+value,0);
+  assert.equal(sum(beforeRetentionOmission)+sum(afterRetentionOmission),reasons.readerOrigin);
+  aggregates.push({kind:'readerFirst',...who,firstReaderOrigin,before:sum(beforeRetentionOmission),after:sum(afterRetentionOmission)});
+  for(let site=0;site<=budgetReaderSiteCount;site++)if(beforeRetentionOmission[site]||afterRetentionOmission[site]){
+   if(site)assert.equal(siteMap[site-1].role,role);
+   aggregates.push({kind:'readerCounts',...who,site,before:beforeRetentionOmission[site],after:afterRetentionOmission[site]});
+  }
+ }
+ const proofNames=['graphs/native-syn.json','graphs/metafiles.json','graphs/canary-index.mjs','graphs/qa-index.mjs','manifest.json'];
+ for(const name of proofNames){
+  const file=join(checkpoint,name);
+  const bytes=await readFile(file);
+  const proof={path:name,bytes:bytes.length,sha256:hash(bytes)};
+  if(name!=='manifest.json')assert.deepEqual(proof,manifest.files.find(entry=>entry.path===name));
+  await copyFile(file,join(root,name));
+  aggregates.push({kind:'proof',...proof});
+ }
+ await writeFile(join(root,'aggregates.json'),JSON.stringify(aggregates,null,2));
+ for(const record of aggregates){
+  const line='AFW_PROBE '+JSON.stringify(record);
+  assert(Buffer.byteLength(line,'utf8')<=2048,'bounded SYN aggregate');
+  console.info(line);
+ }
+ assert.equal(rejectedProjection,false,'producer projection failed its declared evidence check');
+ assert.equal(C0,I0+900000);assert.equal(C1,C0+180000);assert(facts.disposedBeforeC0);assert.equal(facts.originalAlarmObserved,false);
+ assert.equal(completeNormal,1);assert.equal(completeWrites,1);assert.equal(referenceRows,1);assert(referenceReadbacks>0);assert.equal(noticeRows,1);
+ const identities=new Set();
+ for(const {segment,role,epoch,snapshot} of epochs){
+  assert.equal(segment,'producer');assert(['M','QA'].includes(role));
+  assert(Number.isSafeInteger(epoch)&&epoch>=0);const key=role+'|'+epoch;assert(!identities.has(key));identities.add(key);
+  const {purpose,eventCalls,byEvent,reasons,firstInvalid,invalid,unattributed}=snapshot.chronology;
+  const sum=values=>Object.values(values).reduce((a,b)=>a+b,0);
+  assert.equal(purpose,'afw.finite-budget-chronology.syn.v2');assert.equal(sum(byEvent),eventCalls);
+  assert.equal(sum(invalid),snapshot.coverage.invalid);assert.equal(sum(reasons),snapshot.coverage.invalid);
+  assert.equal(sum(unattributed),snapshot.coverage.unattributed);assert.equal(!!firstInvalid,snapshot.coverage.invalid>0);
+  assert.equal(!snapshot.retention.traceComplete,snapshot.coverage.overflow);
+ }
+ for(const {epoch} of epochs){assert(identities.has('M|'+epoch));assert(identities.has('QA|'+epoch));}
+}
+
+export async function verifyBudgetCheckpoint(kind,root){
+ positiveKind(kind);
+ const {verifyCheckpoint}=await import('./finite-owner-cleanup-persistence.mjs');
+ const value=await verifyCheckpoint(root),b=value.data.budget;
+ assert.equal(b?.purpose,'afw.finite-budget-checkpoint.syn.v1');assert.equal(b.source,process.env.GITHUB_SHA);
+ assert.equal(b.run,process.env.GITHUB_RUN_ID);assert.equal(b.attempt,process.env.GITHUB_RUN_ATTEMPT);
+ assert.equal(value.data.variant,'principal');assert.equal(value.data.unexchanged,false);assert.equal(value.data.sdkOnlyBuild,null);
+ assert(b.preparedInputs.M.length&&b.preparedInputs.QA.length);assert(b.epochs.length>=2);
+ for(const e of b.epochs){assert.equal(e.segment,'producer');assert.equal(e.snapshot.testRevision,process.env.GITHUB_SHA);assert.equal(e.role,e.snapshot.workerRole);}
+ return value;
+}
+export async function runBudgetConsumer(kind,root){
+ positiveKind(kind);await verifyBudgetCheckpoint(kind,root);
+ const {recoverCheckpoint,observeOriginalAlarm}=await import('./finite-owner-cleanup-persistence.mjs');
+ const {plain}=await import('./finite-first-connection-publication.mjs');
+ const f=await recoverCheckpoint(root,{label:'finite-budget-positive',restart:false,budgetQualification:true});
+ try{
+  await f.captureBudgetEpoch('after-consumer-cold-load');
+  const facts=await observeOriginalAlarm(f),native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
+  await f.captureBudgetEpoch('consumer-final-before-dispose');
+  const result={purpose:'afw.finite-budget-positive-result.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
+   plan:f.plan,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,facts,fault,native,restores:f.restores.length,pointer:f.providerRegistry.pointer,
+   producer:f.checkpoint.budget.ownerReference,sdkAfterExchange:f.checkpoint.sdkAfterExchange,preparedInputs:f.checkpoint.budget.preparedInputs,
+   diagnostics:{purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision:process.env.GITHUB_SHA,epochs:structuredClone(f.budgetEpochs)},
+   modeledProviderInput:f.checkpoint.modeledProviderInput,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+  return result;
+ }finally{
+  try{await f.captureBudgetEpoch('consumer-before-dispose');await mkdir('output/finite-budget/positive',{recursive:true});await writeFile('output/finite-budget/positive/epochs.json',JSON.stringify({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs},null,2));}
+  finally{await f.mf.dispose();}
+ }
+}
+export async function sealBudgetArtifact(root,kind){
+ assert(['pure','checkpoint','positive'].includes(kind));
+ await mkdir(root,{recursive:true});
+ const files=(await inventoryFiles(root)).filter(f=>f.path!=='budget-artifact.json');
+ const manifest={purpose:'afw.finite-budget-artifact.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,kind,files,operationalReadiness:false,completePackage:false,PCoff:false};
+ await writeFile(join(root,'budget-artifact.json'),JSON.stringify(manifest,null,2));return manifest;
+}
+export async function verifyBudgetArtifact(root,kind,artifactId){
+ assert.match(artifactId??'',/^[1-9][0-9]*$/);
+ const bytes=await readFile(join(root,'budget-artifact.json')),m=JSON.parse(bytes);
+ assert.equal(m.purpose,'afw.finite-budget-artifact.syn.v1');assert.equal(m.kind,kind);assert.equal(m.source,process.env.GITHUB_SHA);assert.equal(m.run,process.env.GITHUB_RUN_ID);assert.equal(m.attempt,process.env.GITHUB_RUN_ATTEMPT);
+ for(const flag of ['operationalReadiness','completePackage','PCoff'])assert.equal(m[flag],false);
+ const files=await inventoryFiles(root);assert.deepEqual(files.filter(f=>f.path!=='budget-artifact.json'),m.files,'exact same-ID downloaded path/bytes/SHA inventory');
+ console.info('BUDGET SAME ID READBACK VERIFIED',JSON.stringify({source:m.source,run:m.run,attempt:m.attempt,kind,artifactId,files:files.length,manifestBytes:bytes.length,manifestSha256:hash(bytes),operationalReadiness:false,completePackage:false,PCoff:false}));
+ return m;
+}
+
+if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
+ const main=async()=>{
+  const [command,root]=process.argv.slice(2);
+  if(command==='preflight-budget')await preflightBudgetCompilation();
+  else if(command==='prepare-positive-probe')await preparePositiveProbe(root);
+  else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
+  else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
+  else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
+  else throw Error('SYN budget command unsupported before I0');
+ };
+ // Finish this module before command work imports fixtures that import it.
+ setImmediate(()=>{main().catch(error=>{console.error(error);process.exitCode=1;});});
+}
```

## test/fixtures/finite-checkpoint-custody.mjs

```diff
diff --git a/test/fixtures/finite-checkpoint-custody.mjs b/test/fixtures/finite-checkpoint-custody.mjs
# before_blob=ABSENT after_blob=9a486b839874ed8e9a950f6a823b18e7585de52e
--- /dev/null
+++ b/test/fixtures/finite-checkpoint-custody.mjs
@@ -0,0 +1,384 @@
+import {createCipheriv,createDecipheriv,createHash,randomBytes} from 'node:crypto';
+import {constants} from 'node:fs';
+import {open,opendir,lstat,mkdir,rmdir,unlink} from 'node:fs/promises';
+import {resolve,dirname,basename,sep} from 'node:path';
+import {Readable} from 'node:stream';
+import {pipeline} from 'node:stream/promises';
+import {createGzip,createGunzip} from 'node:zlib';
+
+const MiB=1024*1024;
+const MAX_FILES=4096,MAX_NATIVE=512*MiB,MAX_JSONL=768*MiB,MAX_ENVELOPE=128*MiB;
+const MAX_RECORD=128*1024,CHUNK=65536,MAX_HEADER=4096;
+const PURPOSE='afw.finite-checkpoint-custody.syn.v1';
+const REPOSITORY='tokenizartinfo-ops/agent-friendly-web',REF='refs/heads/feat/finite-native-cleanup-20261101';
+const PUBLIC_NAMES=['envelope.bin','manifest.json','receipt.json'];
+const DIRECTORY=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
+const REGULAR=constants.O_RDONLY|constants.O_NONBLOCK|constants.O_NOFOLLOW;
+const utf8=value=>Buffer.from(JSON.stringify(value),'utf8');
+const sha=value=>createHash('sha256').update(value).digest('hex');
+const numeric=(value,max)=>Number.isSafeInteger(value)&&value>=0&&value<=max;
+const fail=code=>{throw new CustodyError(code);};
+class CustodyError extends Error{
+ constructor(code){super('custody_'+code);this.name='CustodyError';}
+}
+function requireValue(ok,code='format'){if(!ok)fail(code);}
+function fields(value,keys){
+ requireValue(value!==null&&typeof value==='object'&&!Array.isArray(value));
+ const descriptors=Object.getOwnPropertyDescriptors(value);
+ requireValue(Reflect.ownKeys(descriptors).length===keys.length&&keys.every(k=>Object.hasOwn(descriptors,k)&&Object.hasOwn(descriptors[k],'value')&&descriptors[k].enumerable));
+}
+function parse(bytes){
+ const string=bytes.toString('utf8');requireValue(Buffer.from(string).equals(bytes));
+ let value;try{value=JSON.parse(string);}catch{fail('format');}
+ // Canonical records prevent duplicate keys and ambiguous string representations.
+ requireValue(utf8(value).equals(bytes));return value;
+}
+function expectedContext(c){
+ fields(c,['purpose','repository','ref','sourceSha','runId','runAttempt','kind']);
+ requireValue(c.purpose===PURPOSE&&c.repository===REPOSITORY&&c.ref===REF,'context');
+ requireValue(typeof c.sourceSha==='string'&&c.sourceSha.length===40&&/^[0-9a-f]{40}$/.test(c.sourceSha)&&typeof c.runId==='string'&&c.runId.trim()===c.runId&&/^[1-9][0-9]*$/.test(c.runId)&&c.runAttempt===1,'context');
+ requireValue(['checkpoint','positive-result','producer-failure','consumer-failure'].includes(c.kind),'context');
+ return {purpose:PURPOSE,repository:REPOSITORY,ref:REF,sourceSha:c.sourceSha,runId:c.runId,runAttempt:1,kind:c.kind};
+}
+function keyFromEnvironment(){
+ const hex=process.env.AFW_SYN_CHECKPOINT_KEY;
+ requireValue(typeof hex==='string'&&hex.length===64&&/^[0-9a-fA-F]{64}$/.test(hex),'key');
+ return Buffer.from(hex,'hex');
+}
+async function guarded(fn){
+ let key;
+ try{key=keyFromEnvironment();return await fn(key);}
+ catch(error){if(error instanceof CustodyError)throw error;fail('io');}
+ finally{key?.fill(0);}
+}
+function pathParts(path){
+ requireValue(typeof path==='string'&&path.length>0&&Buffer.from(path).toString('utf8')===path,'path');
+ const parts=path.split('/');
+ requireValue(parts.every(p=>p!==''&&p!=='.'&&p!=='..'&&!p.includes('\\')&&!p.includes('\0')&&!/^[A-Za-z]:/.test(p)&&Buffer.byteLength(p)<=255),'path');
+ return parts;
+}
+const order=(a,b)=>Buffer.compare(Buffer.from(a),Buffer.from(b));
+function separate(one,two){
+ requireValue(typeof one==='string'&&typeof two==='string'&&one&&two,'path');
+ const a=resolve(one),b=resolve(two);
+ requireValue(a!==b&&a!=='/'&&b!=='/'&&!b.startsWith(a+sep)&&!a.startsWith(b+sep),'path');
+}
+// Linux hosted runners: anchor every lookup in an open directory. A later
+// rename or symlink swap cannot redirect a child lookup into a different tree.
+const at=(handle,name)=>'/proc/self/fd/'+handle.fd+(name?'/'+name:'');
+async function withDirs(root,parts,operation,onMissing){
+ let parent=root,owned=null;
+ try{
+  for(let i=0;i<parts.length;i++){
+   const name=parts[i],p=at(parent,name);let child;
+   try{child=await open(p,DIRECTORY);}
+   catch(error){
+    if(error.code!=='ENOENT'||!onMissing)throw error;
+    await mkdir(p,{mode:0o700});
+    const created=await lstat(p,{bigint:true});
+    onMissing(parts.slice(0,i+1),created);
+    child=await open(p,DIRECTORY);
+    requireValue(sameFile(created,await child.stat({bigint:true})),'changed');
+   }
+   if(owned)await owned.close();parent=child;owned=child;
+  }
+  return await operation(parent);
+ }finally{if(owned)await owned.close();}
+}
+async function fromAbsolute(path,fn){
+ requireValue(process.platform==='linux','platform');
+ const root=await open('/',DIRECTORY);
+ try{return await withDirs(root,resolve(path).split('/').filter(Boolean),fn);}
+ finally{await root.close();}
+}
+const sameFile=(a,b)=>a.dev===b.dev&&a.ino===b.ino;
+const unchanged=(a,b)=>sameFile(a,b)&&a.size===b.size&&a.mtimeNs===b.mtimeNs&&a.ctimeNs===b.ctimeNs;
+async function regular(parent,leaf,max,fn){
+ const h=await open(at(parent,leaf),REGULAR);
+ try{
+  const stat=await h.stat({bigint:true});
+  requireValue(stat.isFile()&&stat.nlink===1n,'file');
+  requireValue(stat.size>=0n&&stat.size<=BigInt(max),'limit');
+  const result=await fn(h,stat);
+  requireValue(unchanged(stat,await h.stat({bigint:true})),'changed');
+  return result;
+ }finally{await h.close();}
+}
+async function* chunks(handle,size){
+ let offset=0;
+ while(offset<size){
+  const b=Buffer.allocUnsafe(Math.min(CHUNK,size-offset));
+  const {bytesRead}=await handle.read(b,0,b.length,offset);
+  requireValue(bytesRead>0,'changed');offset+=bytesRead;yield b.subarray(0,bytesRead);
+ }
+}
+async function readSmall(parent,name,max){
+ return regular(parent,name,max,async(h,stat)=>{
+  const parts=[];for await(const chunk of chunks(h,Number(stat.size)))parts.push(chunk);
+  return Buffer.concat(parts,Number(stat.size));
+ });
+}
+async function listDirectory(root,hashFiles){
+ const files=[];let total=0;
+ async function walk(parent,prefix){
+  const entries=await opendir(at(parent),{encoding:'buffer'});
+  for await(const e of entries){
+   const raw=Buffer.isBuffer(e.name)?e.name:Buffer.from(e.name);
+   const name=raw.toString('utf8');requireValue(Buffer.from(name).equals(raw),'path');
+   pathParts(name);const path=prefix?prefix+'/'+name:name;
+   const st=await lstat(at(parent,name),{bigint:true});
+   if(st.isDirectory()){
+    await withDirs(parent,[name],async dir=>{requireValue(sameFile(st,await dir.stat({bigint:true})),'changed');await walk(dir,path);});
+    continue;
+   }
+   requireValue(st.isFile()&&st.nlink===1n,'file');
+   requireValue(files.length<MAX_FILES&&st.size<=BigInt(MAX_NATIVE-total),'limit');
+   total+=Number(st.size);const entry={path,bytes:Number(st.size),stat:st};
+   if(hashFiles){
+    entry.sha256=await regular(parent,name,MAX_NATIVE,async(h,before)=>{
+     requireValue(unchanged(st,before),'changed');const digest=createHash('sha256');
+     for await(const chunk of chunks(h,entry.bytes))digest.update(chunk);
+     return digest.digest('hex');
+    });
+   }
+   files.push(entry);
+  }
+ }
+ await walk(root,'');files.sort((a,b)=>order(a.path,b.path));
+ return {files,total};
+}
+const line=value=>{const b=Buffer.concat([utf8(value),Buffer.from('\n')]);requireValue(b.length<=MAX_RECORD,'limit');return b;};
+async function* sourceRecords(root,inventory,context){
+ yield line({type:'header',version:1,context});
+ for(const file of inventory.files){
+  yield line({type:'file',path:file.path,bytes:file.bytes,sha256:file.sha256});
+  const parts=pathParts(file.path),leaf=parts.pop();
+  const h=await withDirs(root,parts,parent=>open(at(parent,leaf),REGULAR));
+  let n=0;
+  try{
+   const stat=await h.stat({bigint:true});requireValue(stat.isFile()&&stat.nlink===1n&&unchanged(stat,file.stat),'changed');
+   const digest=createHash('sha256');
+   for await(const chunk of chunks(h,file.bytes)){n++;digest.update(chunk);yield line({type:'data',data:chunk.toString('base64')});}
+   requireValue(digest.digest('hex')===file.sha256&&unchanged(stat,await h.stat({bigint:true})),'changed');
+  }finally{await h.close();}
+  yield line({type:'file-end',chunks:n});
+ }
+ const after=await listDirectory(root,false);
+ requireValue(after.total===inventory.total&&after.files.length===inventory.files.length&&after.files.every((f,i)=>f.path===inventory.files[i].path&&unchanged(f.stat,inventory.files[i].stat)),'changed');
+ yield line({type:'end',files:inventory.files.length,bytes:inventory.total});
+}
+async function encrypt(records,context,key){
+ const iv=randomBytes(12);
+ const header=utf8({version:1,context,algorithm:'AES-256-GCM',compression:'gzip',iv:iv.toString('base64')});
+ requireValue(header.length<=MAX_HEADER,'limit');
+ const size=Buffer.alloc(4);size.writeUInt32BE(header.length);
+ const cipher=createCipheriv('aes-256-gcm',key,iv,{authTagLength:16});cipher.setAAD(header);
+ const parts=[size,header];let length=4+header.length+16;
+ async function* bounded(){let n=0;for await(const row of records){n+=row.length;requireValue(n<=MAX_JSONL,'limit');yield row;}}
+ await pipeline(Readable.from(bounded(),{objectMode:false}),createGzip(),cipher,async stream=>{
+  for await(const chunk of stream){length+=chunk.length;requireValue(length<=MAX_ENVELOPE,'limit');parts.push(chunk);}
+ });
+ parts.push(cipher.getAuthTag());return Buffer.concat(parts,length);
+}
+function base64(text,max){
+ requireValue(typeof text==='string'&&text.length<=4*Math.ceil(max/3),'format');
+ const b=Buffer.from(text,'base64');requireValue(b.length<=max&&b.toString('base64')===text,'format');return b;
+}
+function authenticate(envelope,context,key){
+ requireValue(envelope.length<=MAX_ENVELOPE&&envelope.length>20,'limit');
+ const n=envelope.readUInt32BE(0);requireValue(n>0&&n<=MAX_HEADER&&4+n+16<envelope.length);
+ const header=envelope.subarray(4,4+n),h=parse(header);
+ fields(h,['version','context','algorithm','compression','iv']);
+ requireValue(h.version===1&&h.algorithm==='AES-256-GCM'&&h.compression==='gzip');
+ requireValue(utf8(expectedContext(h.context)).equals(utf8(context)),'context');
+ const iv=base64(h.iv,12);requireValue(iv.length===12);
+ try{
+  const decipher=createDecipheriv('aes-256-gcm',key,iv,{authTagLength:16});
+  decipher.setAAD(header);decipher.setAuthTag(envelope.subarray(-16));
+  const compressed=decipher.update(envelope.subarray(n+4,-16));
+  // No inflater or filesystem writer sees bytes until final authenticates them.
+  const tail=decipher.final();return tail.length?Buffer.concat([compressed,tail]):compressed;
+ }catch{fail('authentication');}
+}
+
+async function inspectPacket(compressed,context,writer){
+ const inventory=[],paths=new Set();let current=null,header=false,ended=false,total=0;
+ async function record(raw){
+  requireValue(!ended);const row=parse(raw);
+  if(!header){
+   fields(row,['type','version','context']);
+   requireValue(row.type==='header'&&row.version===1&&utf8(expectedContext(row.context)).equals(utf8(context)),'context');
+   header=true;return;
+  }
+  if(row?.type==='file'&&!current){
+   fields(row,['type','path','bytes','sha256']);const parts=pathParts(row.path);
+   requireValue(inventory.length<MAX_FILES&&numeric(row.bytes,MAX_NATIVE-total),'limit');
+   requireValue(typeof row.sha256==='string'&&/^[0-9a-f]{64}$/.test(row.sha256));
+   requireValue(!inventory.length||order(inventory[inventory.length-1].path,row.path)<0,'path');
+   let parent='';for(const name of parts.slice(0,-1)){parent=parent?parent+'/'+name:name;requireValue(!paths.has(parent),'path');}
+   requireValue(!paths.has(row.path),'path');paths.add(row.path);
+   current={path:row.path,bytes:row.bytes,sha256:row.sha256,digest:createHash('sha256'),seen:0,chunks:0,handle:null};
+   if(writer)current.handle=await writer.create(row.path);
+   return;
+  }
+  if(row?.type==='data'&&current){
+   fields(row,['type','data']);const chunk=base64(row.data,CHUNK);
+   requireValue(chunk.length>0&&current.seen+chunk.length<=current.bytes,'size');
+   current.digest.update(chunk);current.seen+=chunk.length;current.chunks++;
+   if(current.handle){
+    let offset=0;while(offset<chunk.length){
+     const {bytesWritten}=await current.handle.write(chunk,offset,chunk.length-offset,null);
+     requireValue(bytesWritten>0,'io');offset+=bytesWritten;
+    }
+   }
+   return;
+  }
+  if(row?.type==='file-end'&&current){
+   fields(row,['type','chunks']);requireValue(current.seen===current.bytes&&row.chunks===current.chunks&&current.digest.digest('hex')===current.sha256,'integrity');
+   if(current.handle)await current.handle.close();
+   total+=current.bytes;inventory.push({path:current.path,bytes:current.bytes,sha256:current.sha256});current=null;return;
+  }
+  if(row?.type==='end'&&!current){
+   fields(row,['type','files','bytes']);requireValue(row.files===inventory.length&&row.bytes===total,'size');ended=true;return;
+  }
+  fail('format');
+ }
+ try{
+  await pipeline(Readable.from([compressed],{objectMode:false}),createGunzip(),async stream=>{
+   let expanded=0,pending=0,pieces=[];
+   for await(const block of stream){
+    expanded+=block.length;requireValue(expanded<=MAX_JSONL,'limit');
+    let start=0;
+    while(start<block.length){
+     const nl=block.indexOf(10,start),end=nl<0?block.length:nl,part=block.subarray(start,end);
+     pending+=part.length;requireValue(pending+1<=MAX_RECORD,'limit');if(part.length)pieces.push(part);
+     if(nl<0)break;
+     requireValue(pending>0);const raw=pieces.length===1?pieces[0]:Buffer.concat(pieces,pending);
+     await record(raw);pieces=[];pending=0;start=nl+1;
+    }
+   }
+   requireValue(pending===0&&header&&ended&&!current,'format');
+  });
+ }finally{if(current?.handle)await current.handle.close();}
+ return {files:inventory,total};
+}
+const publicEntry=(path,data)=>({path,bytes:data.length,sha256:sha(data)});
+function publicReceipt(context,envelope,inventory){
+ return {purpose:'afw.finite-checkpoint-custody-receipt.syn.v1',context,envelopeBytes:envelope.length,envelopeSha256:sha(envelope),fileCount:inventory.files.length,totalBytes:inventory.total,authenticated:true,innerInventoryVerified:true,operationalReadiness:false,completePackage:false,PCoff:false};
+}
+function publicManifest(context,envelope,receipt){
+ return {purpose:'afw.finite-checkpoint-custody-manifest.syn.v1',context,files:[publicEntry('envelope.bin',envelope),publicEntry('receipt.json',receipt)]};
+}
+function compareInventory(actual,expected){
+ requireValue(actual.total===expected.total&&actual.files.length===expected.files.length,'integrity');
+ for(let i=0;i<actual.files.length;i++){
+  const a=actual.files[i],b=expected.files[i];
+  requireValue(a.path===b.path&&a.bytes===b.bytes&&a.sha256===b.sha256,'integrity');
+ }
+}
+async function verifyPublic(dir,context,key){
+ const names=[];const listing=await opendir(at(dir));
+ for await(const e of listing){requireValue(names.length<3&&PUBLIC_NAMES.includes(e.name)&&e.isFile(),'staging');names.push(e.name);}
+ requireValue(names.sort().join('|')===PUBLIC_NAMES.join('|'),'staging');
+ const envelope=await readSmall(dir,'envelope.bin',MAX_ENVELOPE);
+ const receipt=await readSmall(dir,'receipt.json',MAX_RECORD),manifest=await readSmall(dir,'manifest.json',MAX_RECORD);
+ requireValue(manifest.equals(utf8(publicManifest(context,envelope,receipt))),'integrity');
+ const compressed=authenticate(envelope,context,key);
+ const inventory=await inspectPacket(compressed,context);
+ const checked=publicReceipt(context,envelope,inventory);
+ requireValue(receipt.equals(utf8(checked)),'integrity');
+ return {compressed,inventory,receipt:checked};
+}
+async function removeIfOwned(parent,name,id){
+ let current;try{current=await lstat(at(parent,name),{bigint:true});}catch(error){if(error.code==='ENOENT')return;throw error;}
+ if(!sameFile(current,id))return;
+ if(id.isDirectory())await rmdir(at(parent,name));else await unlink(at(parent,name));
+}
+// The caller supplies private runner parents. mkdir and O_EXCL prevent overwrites,
+// and rollback targets only inodes created by this invocation, without recursive deletion.
+async function exclusiveDirectory(target,operation){
+ return fromAbsolute(dirname(resolve(target)),async parent=>{
+  const leaf=basename(resolve(target));requireValue(leaf&&leaf!=='.'&&leaf!=='..','path');
+  try{await mkdir(at(parent,leaf),{mode:0o700});}catch(error){if(error.code==='EEXIST')fail('destination');throw error;}
+  const id=await lstat(at(parent,leaf),{bigint:true}),owned=[];let root;
+  try{
+   root=await open(at(parent,leaf),DIRECTORY);requireValue(sameFile(id,await root.stat({bigint:true})),'changed');
+   const writer={create:async path=>{
+    const parts=pathParts(path),name=parts.pop();
+    return withDirs(root,parts,async folder=>{
+     const h=await open(at(folder,name),constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);
+     try{owned.push({parts:[...parts,name],id:await h.stat({bigint:true})});return h;}catch(error){await h.close();throw error;}
+    },(parts,id)=>owned.push({parts,id}));
+   }};
+   return await operation(root,writer);
+  }catch(error){
+   let cleanupFailed=false;
+   if(root)for(const obj of owned.reverse()){
+    const parts=obj.parts.slice(),name=parts.pop();
+    try{await withDirs(root,parts,p=>removeIfOwned(p,name,obj.id));}catch{cleanupFailed=true;}
+   }
+   try{await removeIfOwned(parent,leaf,id);}catch{cleanupFailed=true;}
+   if(cleanupFailed)fail('cleanup');throw error;
+  }finally{await root?.close();}
+ });
+}
+async function writeClosed(writer,path,data){
+ const h=await writer.create(path);try{await h.writeFile(data);}finally{await h.close();}
+}
+export async function sealDirectory(options){
+ return guarded(async key=>{
+  fields(options,['sourceDir','stagingDir','context']);
+  const {sourceDir,stagingDir}=options,context=expectedContext(options.context);separate(sourceDir,stagingDir);
+  return fromAbsolute(sourceDir,async source=>{
+   const original=await listDirectory(source,true);
+   const envelope=await encrypt(sourceRecords(source,original,context),context,key);
+   const checked=await inspectPacket(authenticate(envelope,context,key),context);
+   compareInventory(checked,original);
+   const receipt=publicReceipt(context,envelope,checked),body=utf8(receipt);
+   return exclusiveDirectory(stagingDir,async(dir,writer)=>{
+    await writeClosed(writer,'envelope.bin',envelope);await writeClosed(writer,'receipt.json',body);
+    await writeClosed(writer,'manifest.json',utf8(publicManifest(context,envelope,body)));
+    // Verify the actual three on-disk artifacts before a caller can publish them.
+    const readback=await verifyPublic(dir,context,key);compareInventory(readback.inventory,original);
+    return readback.receipt;
+   });
+  });
+ });
+}
+export async function openDirectory(options){
+ return guarded(async key=>{
+  fields(options,['stagingDir','destinationDir','context']);
+  const {stagingDir,destinationDir}=options,context=expectedContext(options.context);separate(stagingDir,destinationDir);
+  const checked=await fromAbsolute(stagingDir,dir=>verifyPublic(dir,context,key));
+  // The first complete, bounded validation succeeded. Restore only from the
+  // same authenticated compressed bytes; do not reopen the public input paths.
+  return exclusiveDirectory(destinationDir,async(dir,writer)=>{
+   const restored=await inspectPacket(checked.compressed,context,writer);
+   compareInventory(restored,checked.inventory);
+   compareInventory(await listDirectory(dir,true),checked.inventory);
+   return checked.receipt;
+  });
+ });
+}
+function githubContext(kind){
+ requireValue(process.env.GITHUB_RUN_ATTEMPT==='1','context');
+ return expectedContext({purpose:PURPOSE,repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind});
+}
+async function preflight(context){
+ return guarded(async key=>{
+  const marker=randomBytes(16),file={path:'marker',bytes:marker.length,sha256:sha(marker)};
+  const rows=[{type:'header',version:1,context},{type:'file',...file},{type:'data',data:marker.toString('base64')},{type:'file-end',chunks:1},{type:'end',files:1,bytes:marker.length}];
+  const envelope=await encrypt(rows.map(line),context,key);
+  const restored=await inspectPacket(authenticate(envelope,context,key),context);
+  compareInventory(restored,{files:[file],total:marker.length});
+ });
+}
+if(process.argv[1]&&resolve(process.argv[1])===import.meta.filename){
+ try{
+  const [cmd,kind,first,second]=process.argv.slice(2),context=githubContext(kind);
+  if(cmd==='key-preflight'&&process.argv.length===4){await preflight(context);process.stdout.write('custody_key_verified\n');}
+  else if(cmd==='seal'&&process.argv.length===6){const receipt=await sealDirectory({sourceDir:first,stagingDir:second,context});process.stdout.write(JSON.stringify(receipt)+'\n');}
+  else if(cmd==='open'&&process.argv.length===6){const receipt=await openDirectory({stagingDir:first,destinationDir:second,context});process.stdout.write(JSON.stringify(receipt)+'\n');}
+  else fail('command');
+ }catch(error){process.stderr.write((error instanceof CustodyError?error.message:'custody_io')+'\n');process.exitCode=1;}
+}
```

## test/fixtures/finite-first-connection-publication.mjs

```diff
diff --git a/test/fixtures/finite-first-connection-publication.mjs b/test/fixtures/finite-first-connection-publication.mjs
# before_blob=047bd6afc34858fe5ce972120101a8d91c092c1e after_blob=cede301c3e9cd95716ae2134f938dbb1d940e7a9
--- a/test/fixtures/finite-first-connection-publication.mjs
+++ b/test/fixtures/finite-first-connection-publication.mjs
@@ -1,10 +1,11 @@
+import {createBudgetCompiler} from './finite-budget-world.mjs';
 // Fixed Node SYN component probes. DATA approvals exercise only the factual writer;
 // they never consume an admission, publish a version, or produce ConnectionReceipt.
 import assert from 'node:assert/strict';
 export async function plain(p){const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v[Symbol.dispose]?.();}}
 export function extendEnrollmentComponent(entry,writerAvailable){
  const imports=`import {readPrivateQaFiniteInitialAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
  import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encodePrep,hashFinitePreparationRecord as hashPrep,hashFiniteOwnerEvidence as componentEvidence,hashFiniteOwnerPreparationProject as projectHash} from './lib/mcp-qa-finite-preparation-records.mjs';
  import {finiteActivationConfigurationHash} from './lib/mcp-activation-observer.mjs';
  import {finitePublicProfileTemplate} from './lib/mcp-qa-finite-profile.mjs';
  import {initialHash as initialDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
@@ -92,24 +93,25 @@
 
 // First-connection SOURCE lab: no seeded connection facts or source alias.
 import {build} from 'esbuild';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile} from 'node:fs/promises';
 import {buildMcpNodeProgram} from '../../scripts/build-mcp-node-program.mjs';
 import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const digest=x=>createHash('sha256').update(x).digest('hex');
 const origin='https://delegated-canary.agentfriendlyweb.dev';
-export async function compileFirstConnectionCandidate(revision,tree,{negativeProfile=false}={}){
+export async function compileFirstConnectionCandidate(revision,tree,{negativeProfile=false,budgetQualification=false}={}){
  const node=await buildMcpNodeProgram(),define={'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event')};
  const options={bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define};
- const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs']});
+ const budget=budgetQualification?createBudgetCompiler('M'):null;
+ const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs'],...budget?{plugins:[budget.plugin()]}:{}});
  const bytes=m.outputFiles[0].contents,compressed=gzipSync(bytes,{level:9,mtime:0});
  const resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:revision,sourceTree:tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:{name:'index.mjs',sha256:digest(bytes),bytes:bytes.length},compressedSha256:digest(compressed),compressedBytes:compressed.length,content:Buffer.from(compressed).toString('base64')};
  // Negative-only, separately hashed ordinary-entry/SQL spy. The positive M
  // uses m.outputFiles unchanged, not this instrumented wrapper.
  const source=String.raw`
  import finite from './worker/mcp-own/finite.mjs';
  export {AfwOwnEventNode,AfwNodeControl} from './worker/mcp-own/finite.mjs';
  import {finiteNativeActor} from './lib/mcp-qa-finite-owner-native-wire.mjs';
  let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0,lateRelease;
  const late={armed:false,reached:false,released:false,nativeReturned:false,nativeRejected:false,startedAt:null,finishedAt:null};
@@ -136,21 +138,21 @@
    const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
   }};
   if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
   // Literal actor is asserted in the product forwards, never selected by input.
   if(!finiteNativeActor)throw Error('SYN missing actor');
   return finite.fetch(request,prepared,ctx);
  }};
  `;
  const spyOptions={...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]};
  const spy=await build(spyOptions),wrong=negativeProfile?await build({...spyOptions,define:{...define,'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('ordinary')}}):null;
- return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
+ return {...budget?{budget:budget.records()}: {},script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
 }
 export function extendFirstConnectionPublication(entry){
  return "import {createHash as firstTraceHash} from 'node:crypto';\nimport {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
  async fetch(request){
   try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstRequestId=request.headers.get('x-afw-finite-request-id');globalThis.__t3NativeTraceRequestId=this.firstRequestId;this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,originalMethod:this.firstOriginalMethod,requestId:this.firstRequestId,version:request.headers.get('x-afw-finite-version')});
   const originalMethod=this.firstOriginalMethod,requestId=this.firstRequestId,target=request.url,trace=this.firstState?.trace,actual=super.fetch(request);
   const observed=response=>{if(originalMethod==='POST'&&target==='https://afw-private.invalid/_finite-owner/choice')trace?.push({kind:'native-response-return',requestId,originalMethod,target,status:response.status,at:Date.now()});};
   if(actual&&typeof actual.then==='function')actual.then(observed,()=>{}).catch(()=>{});else observed(actual);
   return actual;
  }
```

## test/fixtures/finite-initial-entry-world.mjs

```diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
# before_blob=8477a05e955d854e001d2315a8b2c4c6c6dbbbe2 after_blob=605afed804fa4062b9eb76021946d89bbae60c5f
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,10 +1,11 @@
+import {createBudgetCompiler,attachBudgetEpochCapture} from './finite-budget-world.mjs';
 import {extendFiniteOwnerCleanup,instrumentFiniteOwnerCleanup,instrumentCleanupConsumer} from './finite-owner-cleanup.mjs';
 import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent,instrumentFirstConnection,instrumentFirstConnectionEngine} from './finite-first-connection-publication.mjs';
 import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
@@ -18,35 +19,39 @@
 import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
 import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
-export async function initialEntryHarness(mode='normal',{negativeProfile=false,ownerCleanup=false,cleanupCheckpoint=false}={}){
+export async function initialEntryHarness(mode='normal',{negativeProfile=false,ownerCleanup=false,cleanupCheckpoint=false,budgetCompileOnly=false,budgetQualification=false}={}){
+ if(budgetCompileOnly)assert((process.env.AFW_BUDGET_INSPECTION==='compile-only'||budgetQualification&&process.env.AFW_BUDGET_GROUP==='positive')&&mode==='first-connection-publication'&&ownerCleanup&&cleanupCheckpoint&&!negativeProfile,'SYN compile-only inspection route');
+ if(budgetQualification)assert(mode==='first-connection-publication'&&ownerCleanup&&cleanupCheckpoint&&!negativeProfile&&!process.env.AFW_T3_MUTANT,'fixed positive budget composition');
+ const budget=budgetQualification?createBudgetCompiler('QA'):null;
+ const compileInputs=new Map();
  const firstConnection=mode==='first-connection-publication',firstConnectionMutation=firstConnection?(process.env.AFW_T3_MUTANT??null):null;if(![null,'public-partial','existing-ack'].includes(firstConnectionMutation))throw Error('SYN unknown negative mutation');
  const mark=stage=>{if(firstConnection)console.info('T2 native stage',stage);};mark('harness-start');
  const enrollmentComponent=mode==='first-connection-enrollment-component';
- const pair=(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
+ const pair=!budgetCompileOnly&&(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
  if(cleanupCheckpoint)assert(firstConnection&&ownerCleanup,'SYN checkpoint requires unchanged owner producer mode');
- const persist=mode.endsWith('restart')||cleanupCheckpoint?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
+ const persist=!budgetCompileOnly&&(mode.endsWith('restart')||cleanupCheckpoint)?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
  const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
  const base={...(firstConnection?{name:'qa-first-connection'}:{}),...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(firstConnection?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'first-connection-oauth'}}:mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
- const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
+ const mf=budgetCompileOnly?null:new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
  let failedInitializationDisposal;
- const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
+ const disposeFailedInitialization=()=>failedInitializationDisposal??=mf?.dispose();
  try{
- mark('provisional-bindings-start');const b=await mf.getBindings();mark('provisional-bindings-ready');const ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
- mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile}):null;mark('M-compile-done');
+ mark(budgetCompileOnly?'MODELED compile-only namespace DATA':'provisional-bindings-start');const b=budgetCompileOnly?null:await mf.getBindings();if(!budgetCompileOnly)mark('provisional-bindings-ready');const ns=b?.AFW_RELEASE_EVENTS_NODE,compileIds=budgetCompileOnly?{original:sha('MODELED compile-only original namespace'),candidate:sha('MODELED compile-only candidate namespace')}:null,x=initialHistoryFixture(compileIds??{original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:compileIds?.candidate??ns.idFromName('afw-own-event-first-successor-v1').toString()};
+ mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile,budgetQualification}):null;mark('M-compile-done');
  const program=firstCandidate?.program??'SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=firstCandidate?.bytes??Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment')||enrollmentComponent)entry=extendPreparationCleanupFixture(entry);
  if(firstConnection)entry=extendFirstConnectionPublication(entry);
  if(ownerCleanup){assert(firstConnection);entry=extendFiniteOwnerCleanup(entry);}
@@ -110,86 +115,88 @@
    contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
   });
   if(mode.startsWith('enrollment')||enrollmentComponent)b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
   b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
  }};
- const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ const built=await build({metafile:true,stdin:{contents:budget?await budget.entry(entry):entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[budget?budget.plugin(plugin):budgetCompileOnly?{name:'compile-only-record-actual-prepared-inputs',setup(builder){const recorder={...builder,onLoad(options,loader){builder.onLoad(options,async args=>{const result=await loader(args);if(result?.contents!==undefined)compileInputs.set(args.path,String(result.contents));return result;});}};plugin.setup(recorder);}}:plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ if(budgetCompileOnly){assert.equal(mf,null);assert.equal(persist,null);assert.equal(pair,null);return {purpose:'afw.finite-budget-compile-only-inputs.syn.v1',...budget?{budget:{M:firstCandidate.budget,QA:budget.records()}}:{},M:firstCandidate,QA:{script:built.outputFiles[0].text,metafile:built.metafile,entry},preparedSources:[...compileInputs],virtualSources:{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_NODE_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__>':J('finite_trial_event'),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)},modeledNamespaceIds:compileIds,compatibility:{QA:{date:base.compatibilityDate,flags:base.compatibilityFlags},M:finiteWranglerProfileTemplate('canaryLive')},nativeExecutionProduced:false,nativeCheckpointProduced:false,I0Opened:false};}
  if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
  if(mode==='phase-context-sdk-token-notice-get')await captureNoticeBundle(built,'QA',{'<stdin>':entry,'<define:globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__>':J(resident),'<define:globalThis.__AFW_QA_SOURCE_REVISION__>':J(M),'<define:globalThis.__AFW_FINITE_SOURCE_TREE__>':J(TREE),'<define:globalThis.__AFW_NODE_PROGRAM__>':J(program),'<define:globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__>':J(w.expected)});
  mark('QA-compile-done');if(firstConnection){
   w.record.qaLive.module={name:'index.mjs',sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,exports:[...finitePublicProfileTemplate('qaLive').exports]};w.refresh();
-  f.firstConnectionBuild={negativeMutation:firstConnectionMutation,wrongProfileHash:firstCandidate.wrongProfileHash,M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
+  f.firstConnectionBuild={...budget?{budget:{M:firstCandidate.budget,QA:budget.records()}}:{},negativeMutation:firstConnectionMutation,wrongProfileHash:firstCandidate.wrongProfileHash,M:{sha256:sha(bytes),bytes:bytes.length,inputs:Object.keys(firstCandidate.metafile.inputs)},QA:{sha256:sha(built.outputFiles[0].contents),bytes:built.outputFiles[0].contents.length,inputs:Object.keys(built.metafile.inputs)},spyHash:firstCandidate.spyHash,residency:resident};
   f.providerRegistry={requests:[],versions:{},pointer:null};
   const artifacts='output/t2-native-graphs/'+sha(built.outputFiles[0].contents);await mkdir(artifacts,{recursive:true});
   await Promise.all([
    writeFile(artifacts+'/native-syn.json',J({purpose:firstConnectionMutation?'afw.first-connection-negative-mutant-syn-build.v1':'afw.first-connection-native-syn-build.v1',negativeMutation:firstConnectionMutation,testRevision:process.env.GITHUB_SHA??null,M:{...f.firstConnectionBuild.M,inputs:undefined},QA:{...f.firstConnectionBuild.QA,inputs:undefined},resident:{...resident,content:undefined},negativeSpyHash:firstCandidate.spyHash,negativeCompiledProfileHash:firstCandidate.wrongProfileHash,completePackage:false,operationalReadiness:false})),
    writeFile(artifacts+'/metafiles.json',J({M:firstCandidate.metafile,QA:built.metafile})),
    writeFile(artifacts+'/canary-index.mjs',firstCandidate.bytes),
    writeFile(artifacts+'/qa-index.mjs',built.outputFiles[0].contents)
   ]);
  }
  let finalOptions={...base,script:built.outputFiles[0].text,outboundService:createInitialEntrySynOutbound({f,firstConnection,jwk,w,mode,created,approval,opPin,opMetadata,built,x,cleanupCheckpoint})};
  if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io',noticeGet:mode==='phase-context-sdk-token-notice-get'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
  if(firstConnection)finalOptions=firstConnectionWorkers(finalOptions,firstCandidate);
  if(cleanupCheckpoint)finalOptions={...finalOptions,resourcePersistencePath:persist};
  const rawFinalOptions=finalOptions;let currentMountedOptions=rawFinalOptions;
  finalOptions=convertV4MiniflareOptions(finalOptions);
  mark('harness-setOptions-start');await mf.setOptions(finalOptions);mark('harness-setOptions-ready');
  mark('QA-bindings-start');const bindings=await mf.getBindings(firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',firstConnection?'qa-first-connection':mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
  if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
+ if(budget)attachBudgetEpochCapture(f);
  mark('QA-bindings-ready');if(firstConnection||mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();
  const oldMonitoringSql=(await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results;
  const oldMonitoringEvents=(await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results;
  const originalGrants=(await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results;
  assert.equal(originalGrants.length,2);assert.equal(oldMonitoringSql.length,4);assert.equal(oldMonitoringEvents.length,3);
  for(const sql of FINITE_PREPARATION_MONITORING_SCHEMA)await f.db.prepare(sql).run();
  assert.deepEqual((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name='dossier_monitoring_consent_events' AND sql IS NOT NULL ORDER BY name LIMIT 5").all()).results,oldMonitoringSql);
  assert.deepEqual((await f.db.prepare('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events ORDER BY sequence LIMIT 4').all()).results,oldMonitoringEvents);
  assert.equal((await f.db.prepare("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8").all()).results.length,7);
  assert.deepEqual((await f.db.prepare('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants ORDER BY id LIMIT 3').all()).results,originalGrants);
  console.info('NOTICE SYN schema adapter',JSON.stringify({consentObjectsPreserved:4,consentRowsPreserved:3,grantsPreserved:2,objectsAfter:7,addedObjects:3}));}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  if(firstConnection){
   f.mountFirstConnection=async()=>{mark('mount-start');assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.pointerMode,'candidate');
    const vars=Object.fromEntries(f.uploaded.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));
    const mountedRaw={...rawFinalOptions,workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:f.uploaded.id}}})},mounted=convertV4MiniflareOptions(mountedRaw);
-   mark('mount-updateOptions-start');try{await mf.setOptions(mounted);currentMountedOptions=mountedRaw;}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
+   mark('mount-updateOptions-start');try{if(budget)await f.captureBudgetEpoch('before-first-connection-remount');await mf.setOptions(mounted);if(budget)f.nextBudgetEpoch();currentMountedOptions=mountedRaw;}catch(error){f.mountFailed=true;console.info('T2 original mount error',JSON.stringify({name:error?.name,code:error?.code??null,issues:(error?.issues??[]).map(({path,code,expected})=>({path,code,expected})),frames:String(error?.stack??'').split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,5),workers:mounted.workers.map(worker=>({name:worker.name,keys:Object.keys(worker),bindings:Object.entries(worker.bindings??{}).map(([key,value])=>({key,type:typeof value,defined:value!==undefined}))}))}));throw error;}mark('mount-updateOptions-ready');const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');mark('mount-ready');
   };
   f.adoptConnectionConfiguration=async({upstream=false}={})=>{
    assert.equal(f.uploads.length,2);assert.equal(f.activations.length,2);const pointer=f.providerRegistry.pointer,version=f.providerRegistry.versions[pointer.versions[0].version_id],closed=f.providerRegistry.versions['55555555-5555-4555-8555-555555555555'];
    assert.equal(version.id,pointer.versions[0].version_id);assert.equal(version.modules[0].content_base64,closed.modules[0].content_base64);const candidate=structuredClone(closed);candidate.id=version.id;candidate.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(version,candidate);
    const vars=Object.fromEntries(version.bindings.filter(b=>b.type==='plain_text').map(b=>[b.name,b.text]));const mountedRaw={...rawFinalOptions,...upstream?{upstream:'https://delegated-canary.agentfriendlyweb.dev'}:{},workers:rawFinalOptions.workers.map(worker=>worker.name==='qa-first-connection'?worker:{...worker,bindings:{...vars,AFW_FINITE_TRIAL_VERSION:{id:version.id}}})},mounted=convertV4MiniflareOptions(mountedRaw);f.transportNormalized=upstream;if(upstream)assert.equal(mounted.upstream,'https://delegated-canary.agentfriendlyweb.dev');
-   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');await mf.setOptions(mounted);currentMountedOptions=mountedRaw;const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
+   const originalWorker=rawFinalOptions.workers.find(worker=>worker.name==='canary-first-connection');assert.equal(sha(originalWorker.script),f.firstConnectionBuild.M.sha256,'actual script input remains initial M');if(budget)await f.captureBudgetEpoch('before-connection-configuration-remount');await mf.setOptions(mounted);if(budget)f.nextBudgetEpoch();currentMountedOptions=mountedRaw;const fresh=await mf.getBindings('qa-first-connection');f.stub=fresh.AFW_INDEPENDENT_CLOSURE.get(fresh.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
   };
   f.negative=await mf.getWorker('negative-first-connection');if(firstCandidate.wrongProfileScript)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');f.call=(path,options)=>{f.providerPhase=(options?.method??'GET')+' '+new URL('https://delegated-canary.agentfriendlyweb.dev'+path).pathname;return mf.dispatchFetch('https://delegated-canary.agentfriendlyweb.dev'+path,options);};}
  if(firstConnection&&negativeProfile)f.wrongProfile=await mf.getWorker('wrong-profile-first-connection');
  if(cleanupCheckpoint){
   f.mountCleanupSdkOnly=async candidate=>{
    assert(!currentMountedOptions.workers.some(w=>w.name==='sdk-only-first-connection'));
    const m=currentMountedOptions.workers.find(w=>w.name==='canary-first-connection');
    const extra={name:'sdk-only-first-connection',modules:true,script:candidate.script,compatibilityDate:m.compatibilityDate,compatibilityFlags:m.compatibilityFlags,kvNamespaces:{OAUTH_KV:m.kvNamespaces.OAUTH_KV},outboundService:async()=>new Response(null,{status:503})};
    const next={...currentMountedOptions,workers:[...currentMountedOptions.workers,extra]};
-   await mf.setOptions(convertV4MiniflareOptions(next));currentMountedOptions=next;
+   if(budget)await f.captureBudgetEpoch('before-sdk-only-remount');await mf.setOptions(convertV4MiniflareOptions(next));if(budget)f.nextBudgetEpoch();currentMountedOptions=next;
    const b=await mf.getBindings('qa-first-connection');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
    f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');f.kv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection');
   };
   f.cleanupCheckpointInputs=()=>({persist,currentMountedOptions,factory:{firstConnection,jwk,mode,created,approval,opPin,opMetadata,qaScript:built.outputFiles[0].text,x,w:{map:[...w.map],pointer:w.pointer}},state:Object.fromEntries(['command','nowOffset','activations','restores','pointerMode','alarmMode','requests','uploads','mode','pointerReads','tokenReads','publisherReads','baselineReads','commandReads','approval','providerRegistry','uploaded','refs','activationAnnotation','inventoryMode','firstConnectionBuild','source','resident'].filter(k=>Object.hasOwn(f,k)).map(k=>[k,f[k]]))});
  }
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
- f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
+ f.restart=async()=>{assert.ok(persist);if(budget)await f.captureBudgetEpoch('before-restart');await f.mf.dispose();if(budget)f.nextBudgetEpoch();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
  f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
  f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
  f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
  f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
  f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  if(mode==='phase-context-sdk-token-notice-get')f.noticeToken=async({subject='owner',audience=f.source.access.audience,issuer='https://'+f.source.access.teamDomain,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  if(firstConnection)f.firstConnectionToken=async(source,{subject='owner',issuer='https://'+source.access.teamDomain,audience=source.access.audience,expiresAt=Math.floor((Date.now()+3600000)/1000)}={})=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(subject).setIssuer(issuer).setAudience(audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
  mark('harness-ready');return f;
  }catch(error){mark('harness-error:'+String(error));await disposeFailedInitialization();mark('harness-error-disposed');throw error;}
```

## test/fixtures/finite-owner-cleanup-persistence.mjs

```diff
diff --git a/test/fixtures/finite-owner-cleanup-persistence.mjs b/test/fixtures/finite-owner-cleanup-persistence.mjs
# before_blob=72db124ac86c14537cfa711434393b4561904c30 after_blob=e317f58205b062adb6223a4dd5647b65e9c860b4
--- a/test/fixtures/finite-owner-cleanup-persistence.mjs
+++ b/test/fixtures/finite-owner-cleanup-persistence.mjs
@@ -1,20 +1,21 @@
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,readFile,writeFile,readdir,cp} from 'node:fs/promises';
 import {resolve,join,relative} from 'node:path';
 import {pathToFileURL} from 'node:url';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,downstreamOwnerReference,recordOwnerReference,cleanupMTransport,readCleanupM,cleanupMProfile,classifyCleanupMDenial} from './finite-owner-cleanup.mjs';
 import {createInitialEntrySynOutbound} from './finite-initial-entry-world.mjs';
 import {plain,compileCleanupSdkOnlyWorker,compileFirstConnectionCandidate} from './finite-first-connection-publication.mjs';
 import {build} from 'esbuild';
+import {attachBudgetEpochCapture} from './finite-budget-world.mjs';
 
 const P='afw.finite-initial-cleanup.v1:',sha=x=>createHash('sha256').update(x).digest('hex');
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const json=x=>JSON.stringify(x,null,2);
 export const principalName='R2 original alarm restores the produced current cycle at real C0';
 export async function waitUntil(at){while(Date.now()<at)await pause(Math.min(1000,at-Date.now()));}
 function beneath(root,path){const rel=relative(resolve(root),resolve(path));assert(rel&&!rel.startsWith('..')&&!resolve(rel).startsWith('/../'));return resolve(path);}
 async function inventory(root){
  const files=[];async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);assert(!item.isSymbolicLink(),'SYN evidence cannot contain symlink');if(item.isDirectory())await walk(path);else{assert(item.isFile());const b=await readFile(path);files.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:sha(b)});}}}
  await walk(root);return files.sort((a,b)=>a.path.localeCompare(b.path));
@@ -59,27 +60,27 @@
  return {manifest,data};
 }
 function portableOptions(options,persist){
  return JSON.parse(JSON.stringify(options,(key,value)=>{
   if(key==='outboundService'){assert.equal(typeof value,'function');return undefined;}
   if(key==='resourcePersistencePath'){assert.equal(value,persist);return '$NATIVE_STATE';}
   assert.notEqual(typeof value,'function','unrecognized executable checkpoint field '+key);
   return value;
  }));
 }
-export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false,unexchanged=false}={}){
+export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false,unexchanged=false,budgetQualification=false}={}){
  assert(['principal','grant-before-link','notice-before-link'].includes(variant));
  const started=Number(process.env.AFW_JOB_STARTED_MS);assert(Number.isSafeInteger(started));
  assert(Date.now()-started<=90000,'do not open I0 without original 13min plus export margin');
  let f;
  try{
-  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
+  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true,budgetQualification});
   if(sdkOnly){
    assert.equal(variant,'principal');const extra=await compileCleanupSdkOnlyWorker();await f.mountCleanupSdkOnly(extra);f.cleanupSdkOnly=true;
    const initial=await plain(f.stub.ownerCleanupFacts()),original=JSON.parse(initial.rows.find(([k])=>k===P+'plan')[1]);
    assert(Date.now()<original.C0-300000,'late producer must wait without a live Root');
    f.cleanupOriginalIdentityToken=await f.enrollmentToken(f.source);
    await waitUntil(original.C0-300000);
    f.sdkOnlyBuild={worker:'sdk-only-first-connection',sha256:extra.sha256,bytes:extra.bytes,inputs:Object.keys(extra.metafile.inputs),callbackOmitted:true,MAdmission:false,accessTokenTTL:300,refreshTokenTTL:0,namespaceId:'first-connection-oauth'};
    const graphRoot='output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256;
    await writeFile(graphRoot+'/sdk-only-index.mjs',extra.script);await writeFile(graphRoot+'/sdk-only-metafile.json',json(extra.metafile));
   }
@@ -99,66 +100,74 @@
    assert.equal(response.status,302);const completed=await assertActualComplete(f,{reference:true});
    if(unexchanged){
     await response.body?.cancel();const ref=completed.reference,native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
     const raw=await f.kv.get(key),value=JSON.parse(raw),listed=await f.kv.list({prefix:key,limit:1});
     assert.equal(value.id,ref.sdkGrantId);assert.equal(value.expiresAt,undefined);assert.equal(listed.keys.length,1);assert.equal(listed.keys[0].name,key);assert(Number.isSafeInteger(listed.keys[0].expiration));
     f.sdkUnexchanged={label:'genuine original SDK authorization code, never exchanged; unchanged native TTL600',codeExchanged:false,referenceHash:ref.recordHash,selectorHash:sha(ref.sdkGrantId),referenceExpiresAt:ref.expiresAt,createdAt:value.createdAt,nativeKVExpiration:listed.keys[0].expiration,grantObjectHash:sha(raw),observedAt:Date.now()};
    }else await downstreamOwnerReference(f,response,prepared,{cleanupPartial:variant==='notice-before-link'});
   }
   const partialBoundary=variant==='principal'?null:await plain(f.stub.ownerCleanupFaultFacts());if(partialBoundary)assert.equal(partialBoundary.sqlWrites,1);
   await f.stub.ownerCleanupReset();
-  await recordOwnerReference(f,'r2-produced-'+variant);
+  const ownerReference=await recordOwnerReference(f,'r2-produced-'+variant);
   await f.stub.ownerReferenceControl('released');await f.stub.firstConnectionRestore();await f.stub.restoreMethods();
   const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);
   assert.equal(facts.signal.entered,0);assert.equal(facts.alarm,plan.C0);assert(facts.dbNow<plan.C0);assert(Math.abs(facts.dbNow-facts.wall)<=1000);
   assert(plan.C0-120000<started+870000,'original checkpoint wait must fit job budget');
   if(variant!=='grant-before-link')assert(facts.rows.some(([k])=>k.endsWith(':reference')));assert.equal(facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')),variant==='principal'&&!unexchanged);
   // MODELED PROVIDER INPUT, not evidence of actual Cloudflare Workflow termination.
   f.inventoryMode='terminal';
   const input=f.cleanupCheckpointInputs();input.state.inventoryMode='terminal';
   input.state.providerRegistry.versions[plan.baselineVersionId]=structuredClone(input.factory.x.metadata);
   input.state.cleanupRestorePlan=plan;
   const clientKey='client:'+f.source.clientId,client=await f.kv.get(clientKey);assert.equal(typeof client,'string');assert.equal(JSON.parse(client).clientId,f.source.clientId);
   const kvProof={purpose:'afw.same-oauth-kv-client.syn.v1',key:clientKey,keyHash:sha(clientKey),valueHash:sha(client),expires:false,namespaceId:'first-connection-oauth'};
   const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,unexchanged,sdkUnexchanged:f.sdkUnexchanged??null,partialBoundary,lateToken:f.cleanupToken??null,sdkBeforeExchange:f.sdkBeforeExchange??null,sdkAfterExchange:f.sdkAfterExchange??null,sdkOnlyBuild:f.sdkOnlyBuild??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
   if(sdkOnly||unexchanged)assert(Date.now()<plan.C0-120000,'late genuine producer must finish before original export');
+  if(budgetQualification){
+   await f.captureBudgetEpoch('before-producer-checkpoint-dispose');
+   data.budget={purpose:'afw.finite-budget-checkpoint.syn.v1',source:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,epochs:structuredClone(f.budgetEpochs),ownerReference,preparedInputs:f.firstConnectionBuild.budget};
+   assert(data.budget.preparedInputs.M?.length&&data.budget.preparedInputs.QA?.length);
+  }
   await f.mf.dispose();f.disposedForCheckpoint=true;
   await mkdir(root,{recursive:true});await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});
   await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
   await writeFile(join(root,'checkpoint.json'),json(data));
+  if(budgetQualification)await cp('output/owner-reference/r2-produced-'+variant+'.json',join(root,'owner-reference.json'),{errorOnExist:true,force:false});
   const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,files,nativeClock: facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false};
   await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);
   console.info('R2 checkpoint produced',json({source:manifest.source,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,files:files.length,manifestSha256:sha(await readFile(join(root,'manifest.json'))),modeledProviderInput:data.modeledProviderInput}));
   await f.cleanup();if(!deferWait)await waitUntil(plan.C0-120000);
   assert(Date.now()<started+885000,'export/upload margin exhausted');
   return manifest;
- }finally{if(f&&!f.disposedForCheckpoint){await f.mf.dispose();await f.cleanup();}}
+ }finally{if(f&&!f.disposedForCheckpoint){try{if(budgetQualification){await f.captureBudgetEpoch('producer-failure-before-dispose');await mkdir('output/finite-budget/producer',{recursive:true});await writeFile('output/finite-budget/producer/failure-epochs.json',json({source:process.env.GITHUB_SHA,epochs:f.budgetEpochs}));}}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}}
 }
-export async function recoverCheckpoint(root,{label='principal',restart=false}={}){
+export async function recoverCheckpoint(root,{label='principal',restart=false,budgetQualification=false}={}){
  const {data,manifest}=await verifyCheckpoint(root);
+ if(budgetQualification){assert.equal(restart,false);assert.equal(data.budget?.purpose,'afw.finite-budget-checkpoint.syn.v1');assert.equal(data.budget.source,process.env.GITHUB_SHA);}
  if(!restart)assert(Date.now()+30000<data.plan.C0,'native recovery requires >=30s original pre-C0 margin');
  else assert(Date.now()+10000<data.plan.C1,'native restart requires original C1 margin');
  const dest=beneath('output',join('output','r2-native-'+label));await mkdir(dest,{recursive:true});
  await cp(join(root,'state'),join(dest,'state'),{recursive:true,errorOnExist:true,force:false});
  const originalFiles=manifest.files.filter(x=>x.path.startsWith('state/')).map(x=>({...x,path:x.path.slice(6)}));
  assert.deepEqual(await inventory(join(dest,'state')),originalFiles);
  const options=JSON.parse(JSON.stringify(data.options)),f={...structuredClone(data.state),nowOffset:0};
  const factory=data.factory,map=new Map(factory.w.map),w={pointer:factory.w.pointer,get:async p=>{assert(map.has(p),'fixed SYN provider missing original path');return structuredClone(map.get(p));}};
  const outbound=createInitialEntrySynOutbound({...factory,w,f,built:{outputFiles:[{contents:Buffer.from(factory.qaScript)}]},cleanupCheckpoint:true});
  options.resourcePersistencePath=join(dest,'state');
  for(const worker of options.workers){
   if(worker.resourcePersistencePath==='$NATIVE_STATE')worker.resourcePersistencePath=join(dest,'state');
   worker.outboundService=worker.name==='qa-first-connection'?outbound:async()=>new Response(null,{status:503});
  }
  const entered=Date.now(),mf=new Miniflare(convertV4MiniflareOptions(options));f.mf=mf;
  try{
   const bindings=await mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');
+  if(budgetQualification)attachBudgetEpochCapture(f,{segment:'consumer',epochs:structuredClone(data.budget.epochs)});
   const current=await plain(f.stub.ownerCleanupFacts());
   if(!restart){assert.equal(current.alarm,data.plan.C0);assert.equal(current.signal.entered,0);assert(Date.now()<data.plan.C0);}
   assert(Math.abs(current.dbNow-current.wall)<=1000);assert(current.dbNow>=data.facts.dbNow);
   assert.deepEqual(current.rows,data.facts.rows,'cold load preserves original native rows exactly before alarm');
   const mKv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection'),qaKv=await mf.getKVNamespace('AFW_FINITE_OWNER_OAUTH_KV','qa-first-connection');
   for(const kv of [mKv,qaKv]){const value=await kv.get(data.kvProof.key);assert.equal(typeof value,'string');assert.equal(sha(value),data.kvProof.valueHash,'same non-expirable client after cold load');}
   f.negative=await mf.getWorker('negative-first-connection');f.m=cleanupMTransport(mf,{currentMountedOptions:options,expectedModuleHash:data.build.M.sha256});if(data.sdkOnlyBuild)f.sdkOnly=await mf.getWorker('sdk-only-first-connection');f.kv=mKv;f.kvSemanticProof={keyHash:data.kvProof.keyHash,valueHash:data.kvProof.valueHash,bothAliases:true,expires:false};
   await f.stub.ownerCleanupFault('normal');
   f.plan=data.plan;f.checkpoint=data;f.directory=dest;f.recovery={entered,ready:Date.now(),nativeDbNow:current.dbNow,manifestSha256:sha(await readFile(join(root,'manifest.json')))};
   return f;
```

## test/fixtures/finite-owner-cleanup.mjs

```diff
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
# before_blob=4e88d73a818497a5a64dcc34ee15737e93521d96 after_blob=a8a2df05822a8b6daee9067a3e02bb7a4912eb7d
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -1,10 +1,11 @@
+import {persistBudgetEvidence} from './finite-budget-evidence.mjs';
 import {build as buildCleanupComponent} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {mkdir,writeFile} from 'node:fs/promises';
 import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
 import {initialEntryHarness} from './finite-initial-entry-world.mjs';
 import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
 import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {sealFinitePreparationIssuerRecord as issuerSeal} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
@@ -103,23 +104,23 @@
  const child="const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});";
  assert.equal(source.split(child).length,2);source=source.replace(child,()=>"const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const state=globalThis.__r1ReferenceState,at=performance.now(),metric={position,startedAt:Date.now(),deadline:until,steps:[]};if(state){state.children.push(metric);state.activeMetric=metric;}try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{metric.endPosition=position;metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;if(state)state.activeMetric=null;activeChild=null;}});");
  for(const marker of ["async function issuerCall(op,window,call){","async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){"]){assert.equal(source.split(marker).length,2);const name=marker.includes('issuerCall')?'op':'kind';source=source.replace(marker,()=>marker+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:"+name+",at:performance.now()});");}
  const pair="(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});";assert.equal(source.split(pair).length,2);
  source=source.replace(pair,()=>pair+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:'source-pair',elapsedMs:performance.now()-observedAt,at:performance.now()});");
  const io="const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};";assert.equal(source.split(io).length,2);source=source.replace(io,()=>io+"io.enteredAt=performance.now();io.childStartedAt=globalThis.__r1ReferenceState?.activeMetric?.startedAt??null;");
  const guard="io.reads++;io.bytes+=part.value?.byteLength??0;current(l);";assert.equal(source.split(guard).length,2);source=source.replace(guard,()=>"io.reads++;io.bytes+=part.value?.byteLength??0;const guardAt=performance.now();try{current(l);}finally{io.bodyGuardMs=(io.bodyGuardMs??0)+performance.now()-guardAt;}");
  const settled="io.settled=true;}";assert.equal(source.split(settled).length,2);source=source.replace(settled,()=>"io.elapsedMs=performance.now()-io.enteredAt;io.settled=true;}");
  return source;
 }
-export async function ownerReferenceFixture(t,{cleanupCheckpoint=false}={}){
- const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint});f.cleanupQualification=cleanupCheckpoint;
- t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{await f.mf.dispose();await f.cleanup();}});
+export async function ownerReferenceFixture(t,{cleanupCheckpoint=false,budgetQualification=false}={}){
+ const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true,cleanupCheckpoint,budgetQualification});f.cleanupQualification=cleanupCheckpoint;
+ t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{try{if(f.captureBudgetEpoch)await f.captureBudgetEpoch('before-fixture-dispose');}finally{try{await f.mf.dispose();}finally{await f.cleanup();}}}});
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
  const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
  const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
  const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
  await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
  f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
 }
 export async function prepareOwnerReference(f,fault='normal'){
  await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':f.cleanupOriginalIdentityToken??await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
  const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
@@ -128,21 +129,22 @@
 }
 export async function assertActualComplete(f,{reference=false}={}){
  const observed=await plain(f.stub.ownerReferenceObserve()),rows=observed.rows;
  assert.equal(observed.completeWrites,1,'one actual SDK grant effect');assert.equal(observed.completeNormal,1,'actual SDK complete fulfilled normally');assert(rows.some(([k])=>k.endsWith(':sdk_complete:observed')),'actual complete observation durable');
  const ref=rows.find(([k])=>k.endsWith(':reference'));if(reference)assert(ref,'R1 missing durable SDK Reference AFTER actual completeAuthorization');return {observed,reference:ref?JSON.parse(ref[1]):null};
 }
 export async function recordOwnerReference(f,label,extra={}){
  const o=await plain(f.stub.ownerReferenceObserve()),state=await plain(f.stub.firstConnectionState());
  assert(o.lists<=2&&o.gets<=200&&o.peak<=2,'native KV calls stay within fixed budget');
  const result={label,testRevision:process.env.GITHUB_SHA??null,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes},completeWrites:o.completeWrites,completeNormal:o.completeNormal,referenceRows:o.rows.filter(([k])=>k.endsWith(':reference')).length,lists:o.lists,gets:o.gets,peak:o.peak,listLimit:o.nativeListLimit??null,trace:o.trace,requests:o.requests,children:o.children,lookupChild:o.lookupChild??null,referenceReadbacks:o.referenceReadbacks,sdkSuffixes:o.rows.map(([key])=>key.split(':').slice(2).join(':')),roots:(await plain(f.stub.firstConnectionProbe())).calls.map(c=>({method:c.originalMethod,windowMs:c.boundary.deadline-c.boundary.startedAt})),httpSpans:state.http.filter(v=>Number.isSafeInteger(v.childStartedAt)).map(v=>({kind:v.kind,bytes:v.bytes,elapsedMs:v.elapsedMs,bodyGuardMs:v.bodyGuardMs??0,childStartedAt:v.childStartedAt})),http:state.http.reduce((a,v)=>({requests:a.requests+1,bytes:a.bytes+v.bytes}),{requests:0,bytes:0}),completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false,...extra};
- await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/'+label+'.json',JSON.stringify(result,null,2));console.info('R1 sanitized native marker',JSON.stringify(result));return result;
+ if(f.captureBudgetEpoch)result.diagnostics={purpose:'afw.finite-budget-diagnostics.syn.v1',testRevision:process.env.GITHUB_SHA,epochs:await f.captureBudgetEpoch('owner-reference-record')};
+ const evidence=await persistBudgetEvidence({path:'output/owner-reference/'+label+'.json',full:result,testRevision:process.env.GITHUB_SHA??null,caseName:label,counts:{}});console.info('R1 sanitized native marker',evidence.summary);return result;
 }
 export async function downstreamOwnerReference(f,response,prepared,{cleanupPartial=false}={}){
  const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);await response.body?.cancel();
  if(f.cleanupQualification){
   const rows=await plain(f.stub.ownerReferenceObserve()),ref=JSON.parse(rows.rows.find(([k])=>k.endsWith(':reference'))[1]),native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
   const raw=JSON.parse(await f.kv.get(key)),listed=await f.kv.list({prefix:key,limit:1});assert.equal(listed.keys[0]?.name,key);assert(Number.isSafeInteger(listed.keys[0].expiration));assert.equal(raw.expiresAt,undefined);
   f.sdkBeforeExchange={referenceHash:ref.recordHash,grantExpiresAt:null,nativeKVExpiration:listed.keys[0].expiration,createdAt:raw.createdAt,observedAt:Date.now()};
  }
  const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:prepared.verifier})});assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');f.cleanupToken=token;
  if(f.cleanupQualification)f.sdkAfterExchange=await observeCleanupSdkExchange(f,token);
```

## test/mcp-qa-finite-budget-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-budget-native.test.mjs b/test/mcp-qa-finite-budget-native.test.mjs
# before_blob=ABSENT after_blob=d63f6e5752894ddc7d52f2430fa8f1fd1c07156a
--- /dev/null
+++ b/test/mcp-qa-finite-budget-native.test.mjs
@@ -0,0 +1,96 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
+import {join} from 'node:path';
+import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';
+
+import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace} from './fixtures/finite-budget-evidence.mjs';
+
+const group=process.env.AFW_BUDGET_GROUP;
+if(!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
+const directory='output/finite-budget/red',hash=bytes=>createHash('sha256').update(bytes).digest('hex');
+if(group==='red')test('R0 attributable diagnostics after genuine SDK complete and durable Reference',{timeout:180000},async t=>{
+ await mkdir(directory,{recursive:true});
+ const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
+ const outcome={purpose:'afw.finite-budget-red-outcome.syn.v1',source,caseName:'R0',startedAt:Date.now(),stage:'fixture',actualCompleteNormal:null,referenceHash:null,responseStatus:null,diagnosticsPurpose:null,expectedDeficitObserved:false,operationalReadiness:false,completePackage:false,PCoff:false};
+ try{
+  const f=await ownerReferenceFixture(t);
+  outcome.stage='prepare';
+  const prepared=await prepareOwnerReference(f);
+  outcome.stage='issue';
+  const response=await prepared.issue();
+  outcome.responseStatus=response.status;
+  outcome.stage='actual-complete';
+  const completed=await assertActualComplete(f,{reference:true});
+  assert.equal(response.status,302);
+  outcome.actualCompleteNormal=completed.observed.completeNormal;
+  outcome.referenceHash=completed.reference.recordHash;
+  assert.match(outcome.referenceHash,/^[a-f0-9]{64}$/);
+  outcome.stage='record';
+  const result=await recordOwnerReference(f,'budget-red-after-real-complete',{status:response.status});
+  outcome.diagnosticsPurpose=result.diagnostics?.purpose??null;
+  const nativeFacts={
+   purpose:'afw.finite-budget-red-native-facts.syn.v1',source,
+   capturedAt:Date.now(),responseStatus:response.status,
+   completeWrites:completed.observed.completeWrites,completeNormal:completed.observed.completeNormal,
+   referenceHash:completed.reference.recordHash,referenceCommits:completed.observed.referenceCommits,
+   referenceSyncs:completed.observed.referenceSyncs,referenceReadbacks:completed.observed.referenceReadbacks,
+   lists:completed.observed.lists,gets:completed.observed.gets,peak:completed.observed.peak,
+   trace:completed.observed.trace,requests:completed.observed.requests,
+   M:result.M,QA:result.QA,diagnosticsPresent:result.diagnostics!==undefined,
+   operationalReadiness:false,completePackage:false,PCoff:false
+  };
+  const full=Buffer.from(JSON.stringify(result,null,2));
+  await writeFile(join(directory,'full-result.json'),full);
+  nativeFacts.fullResult={path:'full-result.json',bytes:full.length,sha256:hash(full)};
+  await writeFile(join(directory,'native-facts.json'),JSON.stringify(nativeFacts,null,2));
+  await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(directory,'graphs'),{recursive:true,errorOnExist:true,force:false});
+  const metafiles=JSON.parse(await readFile(join(directory,'graphs/metafiles.json'),'utf8'));
+  const paths=[...new Set([...Object.keys(metafiles.M.inputs),...Object.keys(metafiles.QA.inputs)])].filter(path=>!path.startsWith('<')).sort();
+  const inputs=[];
+  for(const path of paths){const bytes=await readFile(path);inputs.push({path,bytes:bytes.length,sha256:hash(bytes)});}
+  await writeFile(join(directory,'source-inputs.json'),JSON.stringify({purpose:'afw.finite-budget-red-source-inputs.syn.v1',source,inputs},null,2));
+  outcome.stage='missing-diagnostics-assertion';
+  outcome.expectedDeficitObserved=outcome.diagnosticsPurpose!=='afw.finite-budget-diagnostics.syn.v1';
+  await writeFile(join(directory,'outcome.json'),JSON.stringify({...outcome,assertionAt:Date.now()},null,2));
+  // Assert only after the native effect, durable Reference, 302 and evidence.
+  assert.equal(result.diagnostics?.purpose,'afw.finite-budget-diagnostics.syn.v1','R0 missing attributable diagnostics after actual SDKcomplete1 + durable Reference +302');
+  outcome.stage='unexpected-pass';
+ }catch(error){
+  outcome.assertionName=error?.name==='AssertionError'?'AssertionError':'setup-or-native-error';
+  throw error;
+ }finally{
+  outcome.finishedAt=Date.now();
+  await writeFile(join(directory,'outcome.json'),JSON.stringify(outcome,null,2));
+ }
+});
+
+if(group==='positive')test('P1 original 900s native lifecycle proves observed metrics and any complete retained traces',{timeout:300000},async()=>{
+ const {runBudgetConsumer}=await import('./fixtures/finite-budget-world.mjs');
+ const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');
+ const result=await runBudgetConsumer('positive',process.env.AFW_BUDGET_CHECKPOINT??'output/finite-budget/checkpoint');
+ const evidence=await persistBudgetEvidence({path:'output/finite-budget/positive/full-result.json',full:result,testRevision:process.env.GITHUB_SHA,caseName:'P1',counts:{tests:1}});
+ console.info('P1 native budget evidence',evidence.summary);
+ const {facts,plan,native}=result,P='afw.finite-initial-cleanup.v1:';
+ const state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]),receipt=JSON.parse(facts.rows.find(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'))[1]);
+ assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);
+ assert(result.recovery.ready<=plan.C0-30000);assert(facts.dbNow>=plan.C0);assert.equal(facts.alarm,null);assert.equal(state.status,'complete');assert.equal(result.restores,1);
+ assert.equal(result.pointer.versions[0].version_id,plan.baselineVersionId);assert.equal(result.kvSemanticProof.bothAliases,true);
+ assert.equal(receipt.businessAccessClosed,true);assert.equal(receipt.sdkReductionReturned,true);assert(receipt.sdkSendHash&&receipt.sdkObservedHash);
+ assert.equal(receipt.globalNativeDrainVerified,false);assert.equal(receipt.sdkNamespaceEmptyVerified,false);
+ assert(native.fence.fenced_at);assert(!native.grant||native.grant.revoked_at);assert.deepEqual(native.notices.map(n=>n.action),['grant','revoke']);assert(facts.finalInventoryProof);
+ assert.equal(result.producer.completeNormal,1);assert.equal(result.producer.referenceRows,1);assert(result.producer.referenceReadbacks>0);assert(result.sdkAfterExchange);assert(result.sdkAfterExchange.expiresAt*1000<=plan.C0);
+ const epochs=result.diagnostics.epochs,identities=new Set(),phases=new Set(),roles=new Set();
+ assert(epochs.some(e=>e.segment==='producer'));assert(epochs.some(e=>e.segment==='consumer'));
+ for(const epoch of epochs){
+  const key=epoch.segment+'|'+epoch.epoch+'|'+epoch.role;assert(!identities.has(key));identities.add(key);roles.add(epoch.role);
+  const s=epoch.snapshot;assert.equal(s.testRevision,process.env.GITHUB_SHA);assert.equal(s.workerRole,epoch.role);
+  const observed=verifyObservedBudgetMetrics(s),full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
+  for(const group of s.byPhaseResource)if(group.nativeStarted>0)phases.add(group.phase);
+  console.info('P1 SYN proof',JSON.stringify({segment:epoch.segment,epoch:epoch.epoch,role:epoch.role,observed,full,retention:s.retention}));
+ }
+ assert.deepEqual([...roles].sort(),['M','QA']);
+ assert.deepEqual([...phases].sort(),['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'].sort());
+ for(const role of roles)assert(epochs.some(e=>e.role===role&&e.snapshot.rows.length>0));
+});
```

## test/mcp-qa-finite-owner-cleanup-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-owner-cleanup-native.test.mjs b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
# before_blob=378c09842bef0840883c481bd6cd4bad4b66413b after_blob=84ba4a466197a1797929f13bab4de17c21d5a3bf
--- a/test/mcp-qa-finite-owner-cleanup-native.test.mjs
+++ b/test/mcp-qa-finite-owner-cleanup-native.test.mjs
@@ -12,21 +12,21 @@
 const row=(facts,key)=>{const v=facts.rows.find(([k])=>k===P+key);return v?JSON.parse(v[1]):null;};
 const cleanupRows=facts=>facts.rows.filter(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:'));
 const cleanupReceipt=facts=>{const r=cleanupRows(facts).find(([k])=>k.endsWith(':receipt'));return r?JSON.parse(r[1]):null;};
 async function recover(label,variant='principal',options={}){
  const f=await recoverCheckpoint(join(root,variant),{label,...options});fixtures.push(f);return f;
 }
 async function capture(f,label,facts){
  const native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
  const receipt=cleanupReceipt(facts),state=row(facts,'state'),metrics={children:facts.children,sqlCalls:fault?.sqlCalls??0,sqlElapsedMs:fault?.sqlElapsedMs??0,kvLists:fault?.lists??0,kvDeletes:fault?.deletes??0,providerRequests:f.providerRegistry.requests.length-f.checkpoint.state.providerRegistry.requests.length};
  const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,...facts.finalInventoryProof?{finalInventoryProof:facts.finalInventoryProof}:{},failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
- await writeCleanupEvidence(label,result);console.info('R2 native result',JSON.stringify(result));return {result,native,receipt,state};
+ {const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');const evidence=await persistBudgetEvidence({path:'output/owner-cleanup/'+label+'.json',full:result,testRevision:process.env.GITHUB_SHA??null,caseName:label,counts:{}});console.info('R2 native result',evidence.summary);}return {result,native,receipt,state};
 }
 function assertClosed(f,facts,capture){
  assert(facts.dbNow>=f.plan.C0);assert.equal(capture.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);
  assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId);assert(capture.receipt);assert.equal(capture.receipt.businessAccessClosed,true);assert.equal(capture.receipt.globalNativeDrainVerified,false);assert.equal(capture.receipt.sdkNamespaceEmptyVerified,false);
  assert(capture.native.fence?.fenced_at);assert(!capture.native.grant||capture.native.grant.revoked_at);if(capture.native.notices.some(e=>e.action==='grant'))assert.equal(capture.native.notices.at(-1).action,'revoke');
  assert.equal(f.kvSemanticProof.bothAliases,true);
 }
 let principal;
 if(group==='g0'){
  test(principalName,async()=>{
@@ -121,21 +121,21 @@
   const startedAt=Date.now(),request=f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subjectToken:token.access_token,sdkGrantId:ref.sdkGrantId,clientId:f.checkpoint.state.source.clientId,correlationHash:ref.correlationHash,referenceHash:ref.recordHash,C0:f.plan.C0})});
   const response=await request,deniedHeadersAt=Date.now();assert.equal(response.status,403,'logical denial at child deadline');const pendingBody=response.text();
   const before=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();
   assert(before.reached&&before.retained&&!before.settled,'actual SDK write must be held, not rejected early');assert.equal(before.logicalReason,'deadline');assert(before.reachedAt<before.childDeadline);assert(before.childDeadline-before.rootStartedAt<=5000);assert(before.rootDeadline-before.rootStartedAt<=30000);assert(before.logicalDeniedAt<f.plan.C0);assert.equal(before.selectorHash,expiry.selectorHash);assert.equal(before.tokenHash,expiry.tokenHash);
   const blocked=await f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST'});assert.equal(blocked.status,409,'same retained invocation excludes replacement');await blocked.body?.cancel();
   const facts=await observeOriginalAlarm(f),r=await capture(f,'late-isolate-business-closure',facts);assertClosed(f,facts,r);
   await f.sdkOnly.fetch(O+'/_fixture/sdk-only-release');const deniedBody=await pendingBody;
   const after=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();assert(after.reached&&after.released&&after.settled&&!after.retained);assert(after.nativeReturned||after.nativeRejected);assert(after.nativeAttemptAt>=f.plan.C0);assert(!deniedBody.includes('access_token'));
   const negative=await observeCleanupMDenial(f.m,token.access_token,f.checkpoint.state.source.project.projectId,{C0:f.plan.C0});
   const outcome={label:'SYN adversarial SDK-only; not an M token-exchange admission',startedAt,deniedHeadersAt,C0:f.plan.C0,positive,negative,build:f.checkpoint.sdkOnlyBuild,before,after,denialBodyHash:hash(deniedBody),mcpWorker:'canary-first-connection',denialLayer:negative.classification.layer,expiry,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,operationalReadiness:false};
-  await writeCleanupEvidence('late-kv-actual-outcome',outcome);console.info('R2 late M denial diagnostic',JSON.stringify(outcome));
+  {const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');const evidence=await persistBudgetEvidence({path:'output/owner-cleanup/'+'late-kv-actual-outcome'+'.json',full:outcome,testRevision:process.env.GITHUB_SHA??null,caseName:'late-kv-actual-outcome',counts:{}});console.info('R2 late M denial diagnostic',evidence.summary);}
   assert.deepEqual(negative.profile,positive.profile,'same original M script/config/namespace and wrapper');
   assert(negative.responses.some(r=>r.method==='POST'&&r.startedAt>=f.plan.C0),'real post-C0 M request recorded');
   assert.equal(negative.classification.dataDenied,true,'actual M data-denial contract, not initialize HTTP alone');
   assert.equal(hash(m.script),f.checkpoint.build.M.sha256);
  });
 }
 
 let fixPair,fixMatched;
 async function fixCurrentPair(){
  if(!fixPair){
```
