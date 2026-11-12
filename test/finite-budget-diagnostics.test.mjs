import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
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
 optionalBudgetDefaultMode();
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
  if(!overlap)probe.settle(left,{at:7,status:'fulfilled'});
  const right=begin(probe,root,null,'setup',7);
  if(overlap)probe.settle(left,{at:7,status:'fulfilled'});
  probe.settle(right,{at:7,status:'fulfilled'});
  const sameTime=probe.snapshot();assert.equal(sameTime.totals.peak,overlap?2:1);
  assert.equal(verifyCompleteBudgetTrace(sameTime).level,'complete_trace');assert.equal(verifyObservedBudgetMetrics(sameTime).level,'observed_metrics');
  const altered=structuredClone(sameTime);altered.totals.peak=overlap?1:2;assert.throws(()=>verifyCompleteBudgetTrace(altered));
 }
 await coldTransactionCallback();
});
test('Q3 fixed Root and phase survive a concurrent Root and late settlement',async()=>{
 const {c,r,child}=fixture(),a=begin(c,r,child,'authorize_get',0),r2=c.root({},{phase:'monitoring_post',deadline:31000,kind:'control'}),b=begin(c,r2,null,'monitoring_post',1);
 c.settle(b,{at:2,status:'fulfilled'});c.settle(a,{at:3,status:'fulfilled'});const s=c.snapshot();
 assert.deepEqual(s.rows.map(v=>[v.rootOrdinal,v.childOrdinal,v.phase,v.settledAt]),[[1,1,'authorize_get',3],[2,null,'monitoring_post',2]]);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,1);assert.equal(s.coverage.unattributed,0);
 const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),one={},two={};let resolveOne,resolveTwo;
 const first=new Promise(resolve=>{resolveOne=resolve;}),second=new Promise(resolve=>{resolveTwo=resolve;}),holder={get(which){return which===1?first:second;}};
 runtime.nativeHolder(holder,'KV');runtime.clock(one,30000);runtime.clock(two,31000);
 assert.equal(runtime.control(one,'authorize_get',{},()=>runtime.member(holder,'get',{operation:'get'})(1)),first);
 assert.equal(runtime.control(two,'monitoring_post',{},()=>runtime.member(holder,'get',{operation:'get'})(2)),second);
 resolveTwo('two');await second;resolveOne('one');await first;
 const rows=runtime.snapshot().rows;assert.deepEqual(rows.map(v=>[v.rootOrdinal,v.phase]),[[1,'authorize_get'],[2,'monitoring_post']]);assert(rows[0].settledAt>=rows[1].settledAt);assert.equal(runtime.snapshot().totals.peak,2);

 await coldPhaseReentry();
 await positiveEpochInventory();
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
 const guardSnapshot=runtime.snapshot();assert.equal(guardSnapshot.totals.scopeGuardEvents,1);assert.equal(guardSnapshot.totals.logicalDenied,0);assert.equal(guardSnapshot.rows.length,0);assert(!JSON.stringify(guardSnapshot).includes('not serialized'));

 assert.equal(verifyCompleteBudgetTrace(scoped).level,'complete_trace');
 const guardPrefix=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxGuards:1});
 const gr=guardPrefix.root({},{phase:'setup',deadline:30000,kind:'control'});
 for(const phase of ['setup','setup','restore','restore'])guardPrefix.scopeLogical(gr,null,{phase,at:0,reason:'guard'});
 const guarded=guardPrefix.snapshot();assert.equal(guarded.totals.deniedScopes,2);assert.equal(guarded.retention.guardRows.omitted,3);
 assert.equal(verifyObservedBudgetMetrics(guarded).level,'observed_metrics');assert.throws(()=>verifyCompleteBudgetTrace(guarded));

});
test('Q5 observing preserves actual promise identity, resolution, rejection and no authority',async()=>{
 // Regression: foreign fragment coordinates must not alter inserted compiler metadata.
 const ts=(await import('typescript')).default;
 const {createBudgetLiteral,createBudgetScopeExpression,transformBudgetPreparedSource,rewriteBudgetIdentityAccess}=await import('./fixtures/finite-budget-world.mjs');
 const parse=(source,path)=>{const ast=ts.createSourceFile(path,source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);assert.equal(ast.parseDiagnostics.length,0,'inserted compiler output parses');return ast;};
 const decode=node=>{
  if(ts.isStringLiteral(node))return node.text;
  if(ts.isNumericLiteral(node))return Number(node.text);
  if(node.kind===ts.SyntaxKind.TrueKeyword)return true;
  if(node.kind===ts.SyntaxKind.FalseKeyword)return false;
  if(node.kind===ts.SyntaxKind.NullKeyword)return null;
  if(ts.isPrefixUnaryExpression(node)&&node.operator===ts.SyntaxKind.MinusToken)return -decode(node.operand);
  if(ts.isArrayLiteralExpression(node))return node.elements.map(decode);
  if(ts.isObjectLiteralExpression(node))return Object.fromEntries(node.properties.map(p=>{assert(ts.isPropertyAssignment(p)&&ts.isStringLiteral(p.name));return [p.name.text,decode(p.initializer)];}));
  assert.fail('unexpected emitted JSON node');
 };
 const metadata={operation:'read',nested:[true,false,null,-0,-2.5,'quote" newline\n',[1]],resource:'transport'};
 const expectedMetadata={operation:'read',nested:[true,false,null,0,-2.5,'quote" newline\n',[1]],resource:'transport'};
 for(const [name,source]of [['witness-a.mjs','const target = 0;\n'],['witness-b.mjs','const padding = "different file";\nconst target = 0;\n']]){
  const ast=parse(source,name),f=ts.factory,result=ts.transform(ast,[context=>{
   const visit=node=>ts.isVariableDeclaration(node)&&node.name.getText(ast)==='target'
    ?f.updateVariableDeclaration(node,node.name,node.exclamationToken,node.type,f.createCallExpression(f.createIdentifier('observe'),undefined,[createBudgetLiteral(metadata)]))
    :ts.visitEachChild(node,visit,context);
   return root=>ts.visitNode(root,visit);
  }]);
  const emitted=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(result.transformed[0]);result.dispose();
  const output=parse(emitted,name),statement=output.statements.at(-1),call=statement.declarationList.declarations[0].initializer;
  assert(ts.isCallExpression(call));assert.deepEqual(decode(call.arguments[0]),expectedMetadata);
  assert.deepEqual(call.arguments[0].properties.map(p=>p.name.text),['operation','nested','resource']);
 }
 let accessorCalls=0;const accessor={};Object.defineProperty(accessor,'secret',{enumerable:true,get(){accessorCalls++;return 'wrong';}});
 assert.throws(()=>createBudgetLiteral(accessor));assert.equal(accessorCalls,0);
 for(const unsupported of [undefined,NaN,Infinity,()=>{},Symbol('unsupported'),new Date(0)])assert.throws(()=>createBudgetLiteral(unsupported));
 const cyclic={};cyclic.self=cyclic;assert.throws(()=>createBudgetLiteral(cyclic));
 const shape=node=>{
  if(ts.isParenthesizedExpression(node))return shape(node.expression);
  if(ts.isIdentifier(node))return ['id',node.text];
  if(ts.isStringLiteral(node))return ['string',node.text];
  if(ts.isNumericLiteral(node))return ['number',Number(node.text)];
  if(ts.isPropertyAccessExpression(node))return ['property',shape(node.expression),node.name.text];
  if(ts.isBinaryExpression(node))return [ts.tokenToString(node.operatorToken.kind),shape(node.left),shape(node.right)];
  if(ts.isConditionalExpression(node))return ['conditional',shape(node.condition),shape(node.whenTrue),shape(node.whenFalse)];
  assert.fail('unexpected fixed scope expression');
 };
 const scopeCases=[
  ['began+5000',['+',['id','began'],['number',5000]]],
  ['entered+5000',['+',['id','entered'],['number',5000]]],
  ['started+5000',['+',['id','started'],['number',5000]]],
  ['parent.lease',['property',['id','parent'],'lease']],
  ["metadata.method==='POST'?'authorize_post':'authorize_get'",['conditional',['===',['property',['id','metadata'],'method'],['string','POST']],['string','authorize_post'],['string','authorize_get']]],
  ["consent?'monitoring_post':'monitoring_get'",['conditional',['id','consent'],['string','monitoring_post'],['string','monitoring_get']]]
 ];
 for(const [text,expected]of scopeCases){
  const expression=createBudgetScopeExpression(text),emitted=ts.createPrinter().printNode(ts.EmitHint.Expression,expression,parse('const unrelated = "destination";','scope.mjs'));
  const ast=parse('const value = ('+emitted+');','scope-output.mjs');
  assert.deepEqual(shape(ast.statements[0].declarationList.declarations[0].initializer),expected);
 }
 assert.throws(()=>createBudgetScopeExpression('unlisted.expression'));
 const path='lib/delegated-oauth-worker.mjs',raw=await readFile(path,'utf8');
 assert.equal(Buffer.byteLength(raw),33008);assert.equal(createHash('sha256').update(raw).digest('hex'),'3161d183fac7bb31b5bd863deba7f0641400b4f0ef5709c940f11e5441125318');
 const emitted=transformBudgetPreparedSource(raw,path,'M').source,ast=parse(emitted,path),readers=[];
 const visit=node=>{
  if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(ast)==='__afwBudget'&&node.expression.name.text==='member'&&node.arguments[0]?.getText(ast)==='reader'){
   assert(ts.isStringLiteral(node.arguments[1]));readers.push([node.arguments[1].text,decode(node.arguments[2])]);
  }
  ts.forEachChild(node,visit);
 };
 visit(ast);assert.deepEqual(readers.filter(([method])=>method==='read'),[['read',{operation:'read',exposedBytes:true}]]);
 assert.deepEqual(readers.filter(([method])=>method==='cancel'),[['cancel',{operation:'cancel',exposedBytes:false}]]);

 // Regression: identity observation keeps actual references assignable while visiting their reads.
 const {transform}=await import('esbuild');
 const identityOutput=source=>{
  const ast=parse(source,'identity-fixture.mjs'),f=ts.factory,seen=[];
  const hook=(name,args)=>f.createCallExpression(f.createPropertyAccessExpression(f.createIdentifier('__afwBudget'),name),undefined,args);
  const result=ts.transform(ast,[context=>{
   const visit=original=>{
    const node=ts.visitEachChild(original,visit,context);
    return rewriteBudgetIdentityAccess(original,node,{ast,path:'worker/mcp-own/finite.mjs',hook,count:kind=>seen.push(kind)});
   };
   return root=>ts.visitNode(root,visit);
  }]);
  const sourceText=ts.createPrinter().printFile(result.transformed[0]);result.dispose();return {source:sourceText,seen};
 };
 const referenceSource=`function refs(env,state,ctx,request,input){
  state.counts.list++; ++state.counts.transaction; state.counts.get += 1; state.counts.sync ||= 0;
  env.RELEASE_DB=input.value; (ctx.storage)=input.storage; delete request.body;
  ({x:env.RELEASE_DB=request.body}=input.object);
  [env.RELEASE_DB,...ctx.storage]=input.array; ({...env.RELEASE_DB}=input.object);
  for(env.RELEASE_DB of input.array){} for(request.body in input.object){}
  env.RELEASE_DB.get=input.fn; env.RELEASE_DB[request.body]=input.fn;
  const method=env.RELEASE_DB[input.key]; return request.body===input.rhs&&request.method==='POST'&&method;
 }`;
 const references=identityOutput(referenceSource);await transform(references.source,{loader:'js',target:'es2022'});
 const referenceAST=parse(references.source,'identity-output.mjs'),identityCalls=[];
 const collect=node=>{if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)&&node.expression.expression.getText(referenceAST)==='__afwBudget')identityCalls.push([node.expression.name.text,node.arguments[0]?.getText(referenceAST)]);ts.forEachChild(node,collect);};collect(referenceAST);
 assert.equal(identityCalls.filter(([name,receiver])=>name==='nativeHolder'&&receiver==='env.RELEASE_DB').length,3,'larger member targets and captured method still read the binding');
 assert.equal(identityCalls.filter(([name])=>name==='body').length,3,'default RHS, computed key and comparison each retain their body read');
 assert.equal(identityCalls.filter(([name])=>name==='readMethod').length,1,'actual computed method acquisition remains observed');
 assert.equal(identityCalls.filter(([name])=>name==='methodValue').length,1);
 const semanticSource=`function exercise(input){
  const env=input.env,state=input.state,ctx=input.ctx,request=input.request;
  state.counts.list++; ++state.counts.transaction; state.counts.get+=2; state.counts.sync--;
  env.RELEASE_DB=input.replacement;
  env.RELEASE_DB.get=input.fn;
  const body=request.body,method=ctx.storage.get;
  input.target[request.body]=body;
  const same=request.body===body&&request.method==='POST';
  delete env.RELEASE_DB;
  return {counts:state.counts,body,same,sameMethod:method===input.fn,target:input.target};
 }`;
 const semantic=identityOutput(semanticSource);await transform(semantic.source,{loader:'js',target:'es2022'});
 const execute=source=>{
  const trace=[],observations=[];const fn=()=>42,holder={get:fn},replacement={};
  let binding=holder;
  const env={};Object.defineProperty(env,'RELEASE_DB',{configurable:true,get(){trace.push('binding-get');return binding;},set(value){trace.push('binding-set');binding=value;}});
  Object.defineProperty(replacement,'get',{configurable:true,set(value){trace.push('method-set');assert.equal(value,fn);}});
  const request={get body(){trace.push('body-get');return 'key';},get method(){trace.push('method-get');return 'POST';}};
  const ctx={get storage(){trace.push('storage-get');return holder;}};
  const input={env,request,ctx,fn,holder,replacement,state:{counts:{list:0,transaction:0,get:0,sync:2}},target:{}};
  const observer={nativeHolder(value){observations.push('holder');return value;},readMethod(receiver,key){observations.push('method');return receiver[key];},body(receiver){observations.push('body');return receiver.body;},methodValue(request,value){observations.push('request-method');return value;}};
  const result=Function('__afwBudget','input',source+';return exercise(input);')(observer,input);
  return {result,trace,observations,deleted:!Object.hasOwn(env,'RELEASE_DB')};
 };
 const untouched=execute(semanticSource),identityObserved=execute(semantic.source);
 assert.deepEqual(identityObserved.result,untouched.result);assert.deepEqual(identityObserved.trace,untouched.trace);assert.equal(identityObserved.deleted,true);
 assert.deepEqual(identityObserved.trace,['binding-set','binding-get','method-set','body-get','storage-get','body-get','body-get','method-get']);
 assert.deepEqual(identityObserved.result.counts,{list:1,transaction:1,get:2,sync:1});assert.equal(identityObserved.result.sameMethod,true);
 assert.deepEqual(identityObserved.observations,['holder','body','holder','method','body','body','request-method']);
 const {c,r,child}=fixture();let effect=0;const actual=Promise.resolve().then(()=>{effect++;return 42;}),op=begin(c,r,child,'authorize_get',performance.now());
 assert.equal(observeBudgetPromise(c,op,actual),actual);assert.equal(await actual,42);assert.equal(effect,1);
 const error=Error('native rejection'),rejected=Promise.reject(error),second=begin(c,r,child,'authorize_get',performance.now());assert.equal(observeBudgetPromise(c,second,rejected),rejected);await assert.rejects(rejected,value=>value===error);await Promise.resolve();
 assert.equal(c.snapshot().totals.nativeSettled,2);assert.equal(c.snapshot().totals.nativeRejected,1);assert.equal(effect,1);assert.equal(c.snapshot().allowed,undefined);
 let invoked=false;const native={execute(){invoked=true;}};c.root(native,{phase:'setup',deadline:null,kind:'transport'});JSON.stringify(c.snapshot());assert.equal(invoked,false);
 const thenable={then(resolve){resolve(7);return Promise.resolve();}},third=begin(c,r,null,'setup',performance.now());assert.equal(observeBudgetPromise(c,third,thenable),thenable);assert.equal(c.snapshot().totals.nativeSettled,3);
 const typed=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),typedRoot=typed.root({},{phase:'mcp_read',deadline:null,kind:'transport'});let calls=0;
 const limiter={limit(){calls++;return Promise.resolve(Object.freeze({success:false}));}},limiterActual=limiter.limit(),limitRef=typed.begin(typedRoot,null,{phase:'mcp_read',resourceClass:'rateLimiter',operation:'limit',at:performance.now()});
 assert.equal(observeBudgetPromise(typed,limitRef,limiterActual),limiterActual);assert.equal((await limiterActual).success,false);assert.equal(calls,1);
 const rpcError=Error('same RPC error'),rpc={invoke(){calls++;return Promise.reject(rpcError);}},rpcActual=rpc.invoke(),rpcRef=typed.begin(typedRoot,null,{phase:'mcp_read',resourceClass:'DO',operation:'rpc',at:performance.now()});
 assert.equal(observeBudgetPromise(typed,rpcRef,rpcActual),rpcActual);await assert.rejects(rpcActual,error=>error===rpcError);assert.equal(calls,2);assert.equal(typed.snapshot().totals.nativeRejected,1);assert.equal(typed.snapshot().totals.logicalDenied,0,'native limiter result is not a Source denial event');

 const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),lease={},req={},order=[],value=Object.freeze({same:true}),actualNative=Promise.resolve(value);
 runtime.clock(lease,30000);
 const holder={};function method(arg){order.push('native');assert.equal(this,holder);assert.equal(arg,17);return actualNative;}
 Object.defineProperty(holder,'get',{get(){order.push('getter');return method;}});
 runtime.nativeHolder(holder,'KV');
 const observed=runtime.control(lease,'authorize_get',req,()=>runtime.member(holder,'get',{operation:'get'})((order.push('argument'),17)));
 assert.equal(observed,actualNative);assert.equal(await observed,value);assert.deepEqual(order,['getter','argument','native']);
 const nativeError=Error('same synchronous native error'),bad={get(){throw nativeError;}};runtime.nativeHolder(bad,'KV');
 assert.throws(()=>runtime.run(lease,()=>runtime.member(bad,'get',{operation:'get'})()),e=>e===nativeError);
 const callbackThis={},tx={},nativeTransaction=Promise.resolve('transaction committed');let received;
 const transactionHolder={transaction(callback){received=callback;Reflect.apply(callback,callbackThis,[tx]);return nativeTransaction;}};
 runtime.nativeHolder(transactionHolder,'DO','storage');
 function callback(argument){assert.equal(this,callbackThis);assert.equal(argument,tx);runtime.transactionArgument(argument);}
 const actualTransaction=runtime.run(lease,()=>runtime.member(transactionHolder,'transaction',{operation:'transaction'})(callback));
 assert.equal(actualTransaction,nativeTransaction);assert.equal(received,callback);await actualTransaction;
 let bottom;const outer={get(){bottom=runtime.member(holder,'get',{operation:'get'})(17);return bottom.then(v=>v);}};runtime.facadeHolder(outer,['get']);
 const outerActual=runtime.run(lease,()=>runtime.member(outer,'get',{operation:'get'})());
 assert.notEqual(outerActual,bottom);assert.equal(await outerActual,value);
 const snapshot=runtime.snapshot();assert.equal(snapshot.totals.nativeStarted,4,'outer facade ACK is not a second native row');assert.equal(snapshot.totals.nativeRejected,1);assert.equal(snapshot.coverage.unattributed,0);

 await coldFacadeBinding();
 await unobservablePromiseSettlement();
});
test('Q6 retained record bounds preserve native identity, observed metrics and omission evidence',async()=>{
 const bounded=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1});
 const metaForBound={phase:'setup',deadline:30000,kind:'control'};
 const firstLease={},firstRef=bounded.root(firstLease,metaForBound);
 for(let event=1;event<16385;event++)bounded.root(firstLease,metaForBound);
 const laterRoot=bounded.root({},metaForBound);
 assert(laterRoot,'retention must not drop a legitimate new Root after 16384 collector calls');
 assert.notEqual(laterRoot,firstRef);


 const early=begin(bounded,firstRef,null,'setup',0);
 const lateChild=bounded.child(laterRoot,{}, {deadline:5000});
 const late=begin(bounded,laterRoot,lateChild,'setup',0);
 const newest=bounded.root({},metaForBound);assert(newest);const newestChild=bounded.child(newest,{}, {deadline:5000});assert(newestChild);
 const third=begin(bounded,newest,newestChild,'setup',0);assert(third);bounded.settle(third,{at:7,status:'fulfilled'});
 bounded.settle(early,{at:10,status:'fulfilled'});
 const promise=Promise.resolve('original native output');assert.equal(observeBudgetPromise(bounded,late,promise),promise);assert.equal(await promise,'original native output');
 bounded.settle(late,{at:100,status:'rejected'});
 const kept=bounded.snapshot();assert.deepEqual(bounded.snapshot(),kept);
 assert.equal(kept.retention.operationRows.limit,1);assert.equal(kept.retention.operationRows.retained,1);assert.equal(kept.retention.operationRows.omitted,2);
 assert.equal(kept.retention.firstOmission.kind,'operation');assert.equal(kept.retention.firstOmission.ordinal,kept.retention.operationRows.firstOmittedOrdinal);
 assert.equal(kept.totals.nativeStarted,3);assert.equal(kept.totals.nativeSettled,3);assert.equal(kept.totals.nativeRejected,0);assert.equal(kept.totals.peak,3);
 assert(kept.totals.scopes.some(scope=>scope.rootOrdinal===3&&scope.childOrdinal===2&&scope.nativeSettled===1));
 assert.equal(kept.rows[0].settledAt,10);assert.equal(kept.coverage.invalid,0);
 assert.equal(verifyObservedBudgetMetrics(kept).traceComplete,false);assert.throws(()=>verifyCompleteBudgetTrace(kept),/incomplete retained trace/);

 const limited=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1,maxScopes:1,maxGuards:1});
 const one=limited.root({},metaForBound),two=limited.root({},metaForBound);
 const single=begin(limited,one,null,'setup',0),other=begin(limited,two,null,'setup',0);
 limited.scopeLogical(two,null,{phase:'setup',at:0,reason:'guard'});limited.scopeLogical(two,null,{phase:'setup',at:0,reason:'guard'});
 limited.scopeLogical(two,null,{phase:'restore',at:0,reason:'denied'});limited.scopeLogical(one,null,{phase:'setup',at:0,reason:'guard'});
 limited.settle(other,{at:0,status:'fulfilled'});limited.settle(single,{at:0,status:'fulfilled'});
 const lost=limited.snapshot();assert.deepEqual(lost.retention.firstOmission,{event:'begin',ordinal:4,kind:'scope'});
 assert.equal(lost.retention.operationRows.firstOmittedOrdinal,4);assert.equal(lost.retention.scopeRows.omitted,1);
 assert.equal(lost.retention.guardRows.omitted,3);assert.equal(lost.totals.deniedScopes,3);assert.equal(lost.totals.scopeGuardEvents,4);
 assert.equal(lost.coverage.invalid,0);assert.equal(lost.coverage.observedMetricsComplete,false);
 assert.throws(()=>verifyObservedBudgetMetrics(lost),/incomplete observed metrics/);
 const hidden={get reason(){throw Error('private reason');},toString(){throw Error('private label');}};
 limited.incomplete(hidden);limited.bytes(null,{});const losses=limited.snapshot();
 assert.equal(losses.chronology.reasons.unknown,1);assert.equal(losses.chronology.reasons.bytesInput,1);
 assert.deepEqual(losses.chronology.firstInvalid,{event:'incomplete',ordinal:11,reason:'unknown',relation:'afterRetentionOmission'});
 assert(!JSON.stringify(losses).includes('private'));
 const bad=createBudgetDiagnostics({}).snapshot();assert.equal(bad.chronology.firstInvalid.ordinal,0);assert.equal(bad.chronology.firstInvalid.reason,'constructorOptions');
 const overflow=createBudgetDiagnostics({testRevision:revision,workerRole:'fixture'}),oroot=overflow.root({},metaForBound);
 const read=overflow.begin(oroot,null,{phase:'setup',resourceClass:'transport',operation:'read',at:0});
 overflow.bytes(read,{length:Number.MAX_SAFE_INTEGER,chunks:1,durationMs:0});overflow.bytes(read,{length:1,chunks:1,durationMs:0});
 assert.equal(overflow.snapshot().coverage.numericOverflow,true);assert.equal(overflow.snapshot().coverage.observedMetricsComplete,false);
 assert.throws(()=>verifyObservedBudgetMetrics(overflow.snapshot()),/numeric overflow/);
 let capGetterCalls=0;const capInput=Object.defineProperty({testRevision:revision,workerRole:'QA'},'maxRows',{get(){capGetterCalls++;throw Error('private');}});
 assert.equal(createBudgetDiagnostics(capInput).snapshot().coverage.invalid,1);assert.equal(capGetterCalls,0);
 for(const stale of [{maxEvents:16384},{diagnosticCandidate:'cap32768'},{maxScopes:0},{maxGuards:16385}]){
  const fallback=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',...stale}).snapshot();
  assert.equal(fallback.coverage.observedMetricsComplete,false);assert.equal(fallback.chronology.firstInvalid.reason,'constructorOptions');
 }
 const falseClaim=structuredClone(lost);falseClaim.coverage.observedMetricsComplete=true;
 assert.throws(()=>verifyObservedBudgetMetrics(falseClaim),/completeness flag/);
 const corrupt=structuredClone(kept);let proofGetterCalls=0;
 Object.defineProperty(corrupt.rows[0],'capability',{enumerable:true,get(){proofGetterCalls++;throw Error('private');}});
 assert.throws(()=>verifyObservedBudgetMetrics(corrupt),/closed data fields/);assert.equal(proofGetterCalls,0);
 const runtime=createBudgetRuntime({testRevision:revision,workerRole:'fixture'});
 const promised=Promise.resolve(17);let effects=0;
 const preserved=runtime.run({},()=>runtime.direct(()=>{effects++;return promised;},{})());
 assert.equal(preserved,promised);assert.equal(await preserved,17);assert.equal(effects,1);
 assert.equal(runtime.snapshot().chronology.reasons.runMissingLease,1);assert.equal(runtime.snapshot().chronology.reasons.invocationIdentity,1);
 assert.throws(()=>verifyObservedBudgetMetrics(runtime.snapshot()),/incomplete observed metrics/);
 const readerRuntime=createBudgetRuntime({testRevision:revision,workerRole:'QA',maxRows:1});
 const token=Promise.resolve(19);
 let underlyingCalls=0,siteGetterRuns=0,coercions=0;
 const receiver={getReader(){assert.equal(this,receiver);underlyingCalls++;return token;}};
 const invokeReader=metadata=>readerRuntime.member(receiver,'getReader',metadata)();
 assert.equal(invokeReader({edge:'reader',readerSite:1}),token);
 const startedReader=readerRuntime.snapshot();
 assert.equal(startedReader.chronology.readerOrigins?.firstReaderOrigin?.site,1,'missing fixed reader-site provenance');
 assert.deepEqual(startedReader.chronology.readerOrigins.firstReaderOrigin,{ordinal:1,relation:'beforeRetentionOmission',site:1,context:'no_store'});
 assert.equal(startedReader.chronology.eventCalls,1);assert.equal(startedReader.coverage.invalid,1);
 const leaseForReader={};readerRuntime.root(leaseForReader,'setup',null);
 const readerRoot=readerRuntime.collector.root(leaseForReader,{phase:'setup',deadline:null,kind:'control'});
 begin(readerRuntime.collector,readerRoot,null,'setup',0);begin(readerRuntime.collector,readerRoot,null,'setup',0);
 assert.equal(readerRuntime.run(leaseForReader,()=>invokeReader({edge:'reader',readerSite:2})),token);
 const accessorSite=Object.defineProperty({edge:'reader'},'readerSite',{get(){siteGetterRuns++;throw Error('private site');}});
 assert.equal(invokeReader(accessorSite),token);
 assert.equal(invokeReader({edge:'reader',readerSite:{toString(){coercions++;throw Error('private label');}}}),token);
 const doneReader=readerRuntime.snapshot(),origin=doneReader.chronology.readerOrigins;
 assert.equal(await token,19);assert.equal(underlyingCalls,4);assert.equal(siteGetterRuns,0);assert.equal(coercions,0);
 assert.deepEqual(readerRuntime.snapshot(),doneReader);
 assert.equal(doneReader.chronology.eventCalls,8);assert.equal(doneReader.chronology.byEvent.incomplete,4);
 assert.deepEqual(doneReader.retention.firstOmission,{ordinal:5,event:'begin',kind:'operation'});
 assert.equal(doneReader.chronology.reasons.readerOrigin,4);assert.equal(doneReader.coverage.invalid,4);assert.equal(doneReader.coverage.unattributed,4);
 assert.equal(origin.beforeRetentionOmission[1],1);assert.equal(origin.afterRetentionOmission[2],1);assert.equal(origin.afterRetentionOmission[0],2);
 assert.equal(origin.beforeRetentionOmission.reduce((sum,n)=>sum+n,0),1);assert.equal(origin.afterRetentionOmission.reduce((sum,n)=>sum+n,0),3);
 assert(!JSON.stringify(origin).includes('private'));
 const scopedReader=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),activeLease={};
 scopedReader.root(activeLease,'setup',null);
 assert.equal(scopedReader.run(activeLease,()=>scopedReader.member(receiver,'getReader',{edge:'reader',readerSite:2})()),token);
 assert.deepEqual(scopedReader.snapshot().chronology.readerOrigins.firstReaderOrigin,{ordinal:2,relation:'beforeRetentionOmission',site:2,context:'rooted'});

 const exclusion=createBudgetRuntime({testRevision:revision,workerRole:'QA'});
 const argument={},sentinel=Promise.resolve('reader value'),nativeFailure=Error('native failure');
 let unsupportedCalls=0;
 const unowned={getReader(value){assert.equal(this,unowned);unsupportedCalls++;if(value===nativeFailure)throw nativeFailure;assert.equal(value,argument);return sentinel;}};
 const readUnowned=value=>exclusion.member(unowned,'getReader',{edge:'reader',readerSite:45})(value);
 assert.equal(exclusion.fixture(()=>readUnowned(argument)),sentinel);
 assert.throws(()=>exclusion.fixture(()=>readUnowned(nativeFailure)),error=>error===nativeFailure);
 const ignored=exclusion.snapshot();
 assert.equal(ignored.coverage.invalid,0,'declared fixture-only missing reader must not count as an invalid');
 assert.equal(ignored.coverage.unattributed,0);assert.equal(ignored.chronology.eventCalls,0);assert.equal(ignored.chronology.reasons.readerOrigin,0);
 assert.equal(ignored.chronology.readerOrigins.firstReaderOrigin,null);assert(ignored.chronology.readerOrigins.beforeRetentionOmission.every(n=>n===0));
 assert(ignored.chronology.readerOrigins.afterRetentionOmission.every(n=>n===0));
 assert.equal(readUnowned(argument),sentinel);assert.equal(await sentinel,'reader value');assert.equal(unsupportedCalls,3);
 const exposed=exclusion.snapshot();assert.equal(exposed.coverage.invalid,1);assert.equal(exposed.coverage.unattributed,1);
 assert.equal(exposed.chronology.reasons.readerOrigin,1);assert.equal(exposed.chronology.readerOrigins.beforeRetentionOmission[45],1);
 assert.deepEqual(exposed.chronology.readerOrigins.firstReaderOrigin,{ordinal:1,relation:'beforeRetentionOmission',site:45,context:'no_store'});

 const ownerRuntime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),ownerRoot={},ownerChild={};
 ownerRuntime.root(ownerRoot,'authorize_get',30000);ownerRuntime.descendant(ownerRoot,ownerChild,5000);
 const value={done:true},readPromise=Promise.resolve(value);let reads=0,factories=0,fetches=0;
 const ownedReader={read(){assert.equal(this,ownedReader);reads++;return readPromise;}};
 const ownedStream={getReader(option){assert.equal(this,ownedStream);assert.equal(option,argument);factories++;return ownedReader;}};
 const ownedResponse={body:ownedStream},fetchPromise=Promise.resolve(ownedResponse);
 const source={fetch(){assert.equal(this,source);fetches++;return fetchPromise;}};
 ownerRuntime.nativeHolder(source,'CFversion');
 const fetchResult=ownerRuntime.run(ownerChild,()=>ownerRuntime.member(source,'fetch',{operation:'fetch',resource:'CFversion'})());
 assert.equal(fetchResult,fetchPromise);assert.equal(await fetchResult,ownedResponse);
 const heldReader=ownerRuntime.fixture(()=>ownerRuntime.member(ownerRuntime.body(ownedResponse),'getReader',{edge:'reader',readerSite:45})(argument));
 assert.equal(heldReader,ownedReader);
 const observedRead=ownerRuntime.member(heldReader,'read',{operation:'read',exposedBytes:true})();
 assert.equal(observedRead,readPromise);assert.equal(await observedRead,value);assert.deepEqual([fetches,factories,reads],[1,1,1]);
 const routed=ownerRuntime.snapshot();assert.equal(routed.coverage.invalid,0);assert.equal(routed.coverage.unattributed,0);
 assert.equal(routed.rows.length,2);const [outbound,bodyRead]=routed.rows;
 assert.equal(bodyRead.fetchOpOrdinal,outbound.opOrdinal);assert.equal(bodyRead.rootOrdinal,outbound.rootOrdinal);assert.equal(bodyRead.childOrdinal,outbound.childOrdinal);
 assert.equal(bodyRead.childDeadline,5000);assert.equal(bodyRead.rootDeadline,30000);assert.equal(bodyRead.phase,'authorize_get');assert.equal(bodyRead.resourceClass,'CFversion');

 truncatedPeakConsistency();
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
 const a=c.begin(r,child,{phase,resourceClass,operation:'read',at:2,fetchOpRef:fetch}),b=c.begin(r,child,{phase,resourceClass,operation:'read',at:3,fetchOpRef:fetch});
 c.bytes(a,{length:12,chunks:1,durationMs:8});
 const cancel=c.begin(r,child,{phase,resourceClass,operation:'cancel',at:6,fetchOpRef:fetch});c.cancel(fetch,{at:6,stage:'started'});
 let s=c.snapshot();assert.equal(s.totals.active,3,'headers settle does not settle pending reads or cancellation');assert.equal(s.rows[0].status,'fulfilled');assert.equal(s.rows[3].status,'pending');
 c.settle(b,{at:8,status:'fulfilled'});c.settle(cancel,{at:9,status:'fulfilled'});c.cancel(fetch,{at:9,stage:'settled'});c.settle(a,{at:10,status:'fulfilled'});
 s=c.snapshot();assert.equal(s.rows[0].nativeBytesRead,null,'no additive duplicate fetch bytes');assert.equal(s.rows[2].nativeBytesRead,null);assert.equal(s.rows[2].nativeBytesReason,'not_exposed_by_native_api');assert.equal(s.rows[1].nativeBytesRead,12);
 assert.equal(s.totals.nativeBytesRead,12);assert.equal(s.coverage.nativeBytesUnavailable,3);assert.equal(s.totals.peak,3);assert.equal(s.totals.scopes[0].peak,3);assert.equal(s.totals.nativeDurationSumMs,17);assert.equal(s.totals.observedWallMs,10);assert.equal(s.totals.cancelSettled,1);
 assert.deepEqual(s.rows.map(v=>v.fetchOpOrdinal),[null,1,1,1]);assert.equal(s.totals.nativeStarted,4);assert.equal(s.totals.nativeSettled,4);
 const foreign=fixture(),other=foreign.c.begin(foreign.r,null,{phase,resourceClass,operation:'fetch',at:0});
 assert.equal(c.begin(r,child,{phase,resourceClass,operation:'read',at:11,fetchOpRef:other}),null);
 assert.equal(c.begin(r,child,{phase:'setup',resourceClass,operation:'read',at:11,fetchOpRef:fetch}),null);
 assert.equal(c.begin(r,null,{phase,resourceClass,operation:'cancel',at:11,fetchOpRef:fetch}),null);
 assert.equal(c.begin(r,child,{phase,resourceClass:'KV',operation:'read',at:11,fetchOpRef:fetch}),null);
 assert.equal(c.snapshot().coverage.unattributed,4);assert.equal(c.snapshot().totals.nativeStarted,4);
 const beforeBytes=c.snapshot().coverage.invalid;c.bytes(fetch,{length:12,chunks:1,durationMs:1});c.bytes(cancel,{length:12,chunks:1,durationMs:1});assert.equal(c.snapshot().coverage.invalid,beforeBytes+2);assert.equal(c.snapshot().totals.nativeBytesRead,12);
 const inbound=c.begin(r,child,{phase,resourceClass:'transport',operation:'read',at:12});assert(inbound,'inbound Request body has no outbound fetch');c.settle(inbound,{at:13,status:'fulfilled'});assert.equal(c.snapshot().rows.at(-1).fetchOpOrdinal,null);

 const runtime=createBudgetRuntime({testRevision:revision,workerRole:'M'}),lease={},request={},response=new Response(new Uint8Array([1,2,3]));
 let bodyGets=0;const bodyGetter=Object.getOwnPropertyDescriptor(Response.prototype,'body').get;
 Object.defineProperty(response,'body',{get(){bodyGets++;return Reflect.apply(bodyGetter,this,[]);}});
 const nativeFetch=Promise.resolve(response),fetcher={fetch(){return nativeFetch;}};runtime.nativeHolder(fetcher,'CFversion');runtime.clock(lease,30000);
 const returned=runtime.control(lease,'authorize_get',request,()=>runtime.member(fetcher,'fetch',{operation:'fetch',resource:'CFversion'})());
 assert.equal(returned,nativeFetch);await returned;assert.equal(bodyGets,0,'registration does not access body');
 assert.equal(runtime.snapshot().totals.active,0,'fetch settles at headers');
 await runtime.run(lease,async()=>{
  const stream=runtime.body(response);assert.equal(bodyGets,1);
  const reader=runtime.member(stream,'getReader',{edge:'reader'})();
  const first=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.deepEqual([...first.value],[1,2,3]);
  const eof=await runtime.member(reader,'read',{operation:'read',exposedBytes:true})();assert.equal(eof.done,true);
  await runtime.member(reader,'cancel',{operation:'cancel'})();
 });
 const nativeRows=runtime.snapshot();assert.equal(nativeRows.coverage.unattributed,0);assert.equal(nativeRows.totals.nativeStarted,4);assert.equal(nativeRows.totals.nativeSettled,4);assert.equal(nativeRows.totals.nativeBytesRead,3);assert.deepEqual(nativeRows.rows.map(r=>r.fetchOpOrdinal),[null,1,1,1]);assert.equal(nativeRows.rows[0].nativeBytesRead,null);assert.equal(nativeRows.totals.cancelStarted,1);assert.equal(nativeRows.totals.cancelSettled,1);

 assert.equal(verifyCompleteBudgetTrace(nativeRows).level,'complete_trace');
 const wrongLink=structuredClone(nativeRows);wrongLink.rows[1].fetchOpOrdinal=wrongLink.rows[1].opOrdinal;
 assert.throws(()=>verifyObservedBudgetMetrics(wrongLink),/fetch parent/);

 await intrinsicReadBytes();
});

async function coldSourceExpressions(kind, controls=''){
 const ts=(await import('typescript')).default;
 const {transformBudgetPreparedSource}=await import('./fixtures/finite-budget-world.mjs');
 const [file,pin]=kind==='initial'
  ?['lib/mcp-qa-finite-initial-cleanup.mjs','f0e8a2720987d13d0011c437abd3c5ef7d1452493b3c0e67b5da5d319e474de5']
  :['lib/mcp-qa-finite-owner-cleanup-journal.mjs','e40290e120266cd57bceb6faa5ea3c871ddd8aa00c9d02e98094aaf11dd4c888'];
 const raw=await readFile(file,'utf8');
 assert.equal(createHash('sha256').update(raw).digest('hex'),pin);
 const emitted=transformBudgetPreparedSource(raw+controls,file,'QA').source;
 const ast=ts.createSourceFile(file,emitted,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
 assert.equal(ast.parseDiagnostics.length,0);
 function exactly(predicate){
  const found=[];
  function visit(node){if(predicate(node))found.push(node);ts.forEachChild(node,visit);}
  visit(ast);assert.equal(found.length,1,'unique emitted expression');return found[0];
 }
 function expression(node,bindings){
  return Function(...Object.keys(bindings),'"use strict";return ('+node.getText(ast)+');')(...Object.values(bindings));
 }
 const transaction=exactly(n=>ts.isCallExpression(n)&&ts.isArrayLiteralExpression(n.arguments[2]??ast)&&ts.isArrowFunction(n.arguments[2].elements[0]??ast)&&n.expression.getText(ast).startsWith('__afwBudget.reflect('));
 return {ts,ast,exactly,expression,transaction};
}

function memoryScope(){
 const runtime=createBudgetRuntime({testRevision:revision,workerRole:'QA'}),root={},child={};
 runtime.root(root,'cleanup_before_restore',30000);
 runtime.descendant(root,child,5000);
 return {runtime,root,child};
}

async function coldTransactionCallback(){
 const journal=await coldSourceExpressions('journal'),initial=await coldSourceExpressions('initial');
 const {runtime,child}=memoryScope();
 const operations=[];
 const tx={
  get(key){assert.equal(this,tx);operations.push(key);return Promise.resolve('same');},
  put(){assert.fail('existing journal record must stay untouched');},list(){assert.fail('unexpected list');}
 };
 let actual;
 const storage={transaction(callback){assert.equal(this,storage);actual=callback(tx);return actual;}};
 runtime.nativeHolder(storage,'DO','storage');
 const c={storage,transaction:runtime.readMethod(storage,'transaction'),actorId:1,qa:2,wait:promise=>promise};
 const read=runtime.run(child,()=>journal.expression(journal.transaction,{
  __afwBudget:runtime,c,g:()=>{},inventory:async()=>({}),kind:'Identity',id:1,v:{preconnectionId:1,actorId:1,qaVersionId:2},
  prefix:()=>'',suffix:'receipt',raw:'same',fail:()=>assert.fail('unexpected journal control')
 }));
 assert.equal(read,actual);assert.equal(await read,'existing');assert.deepEqual(operations,['receipt']);
 const result=runtime.snapshot();
 // Recognized native transaction form has distinct, freshly allocated method identities.
 const control=memoryScope(),calls=[];
 const nativeTx={get(key){assert.equal(this,nativeTx);calls.push(key);return Promise.resolve(key==='head'?undefined:'plan');},put(){},setAlarm(){},deleteAlarm(){}};
 const nativeStorage={transaction(callback){assert.equal(this,nativeStorage);return callback(nativeTx);}};
 control.runtime.nativeHolder(nativeStorage,'DO','storage');
 const ok=control.runtime.run(control.child,()=>initial.expression(initial.transaction,{
  __afwBudget:control.runtime,storage:nativeStorage,transaction:control.runtime.readMethod(nativeStorage,'transaction'),
  parent:{retain:value=>value},current:()=>{},l:control.child,HEAD:'head',P:'',p:{},encode:()=>'plan',work:()=>123,fail:()=>assert.fail('unexpected control')
 }));
 assert.equal(await ok,123);assert.deepEqual(calls,['head','plan']);
 assert.deepEqual(control.runtime.snapshot().rows.map(r=>[r.operation,r.rootOrdinal,r.childOrdinal]),[['transaction',1,1],['get',1,1],['get',1,1]]);
 let unknown=0;control.runtime.run(control.child,()=>control.runtime.member({get(){unknown++;}},'get',{operation:'get'})());
 assert.equal(unknown,1);assert.equal(control.runtime.snapshot().chronology.reasons.invocationIdentity,1);
 assert.deepEqual([result.chronology.reasons.invocationIdentity,...result.rows.map(r=>[r.operation,r.status,r.rootOrdinal,r.childOrdinal])],
  [0,['transaction','fulfilled',1,1],['get','fulfilled',1,1]],'cold-B cleanup journal callback attribution');
}

async function coldFacadeBinding(){
 const initial=await coldSourceExpressions('initial'),{ts,ast,exactly,expression}=initial;
 const facadeCall=exactly(n=>ts.isCallExpression(n)&&n.expression.getText(ast)==='work'&&n.arguments[0]?.getText(ast).includes('alarm:'));
 const wrapper=exactly(n=>ts.isVariableDeclaration(n)&&n.name.getText(ast)==='put'&&ts.isArrowFunction(n.initializer??ast)&&n.initializer.getText(ast).includes('tp'));
 const putCall=exactly(n=>ts.isCallExpression(n)&&ts.isCallExpression(n.expression)&&n.expression.expression.getText(ast)==='__afwBudget.member'&&n.expression.arguments[0]?.getText(ast)==='tx'&&n.expression.arguments[1]?.text==='put'&&n.arguments[1]?.getText(ast).includes('next'));
 const controls=await coldSourceExpressions('initial',"\nfunction coldExplicit(put){return {put(...args){return Reflect.apply(put,this,args);}};}\nfunction coldAlias(put){return {put};}\n");
 const controlFunction=name=>controls.exactly(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);
 async function probe(mode){
  const {runtime,child}=memoryScope(),effects=[],value=Object.freeze({}),nativeResult=Promise.resolve(value);
  const tx={put(...args){effects.push({receiver:this,args});return nativeResult;}};
  runtime.nativeHolder(tx,'DO','transaction');
  const tp=runtime.readMethod(tx,'put');
  let originalPromise,enteredThis,nativePromise,unknownCalls=0;
  const put=expression(wrapper.initializer,{__afwBudget:runtime,check:()=>{},tp,tx,parent:{retain(p){nativePromise=p;return p;}}});
  const watched=new Proxy(put,{apply(target,receiver,args){enteredThis=receiver;originalPromise=Reflect.apply(target,receiver,args);return originalPromise;}});
  let adapter;
  const generate=(name,fn)=>controls.expression(controlFunction(name),{__afwBudget:runtime})(fn);
  if(mode==='wrapper')adapter=expression(facadeCall.arguments[0],{__afwBudget:runtime,r:()=>{},put:watched});
  if(mode==='explicit')adapter=generate('coldExplicit',watched);
  if(mode==='alias')adapter=generate('coldAlias',tp);
  if(mode==='unknown')adapter=generate('coldAlias',function(){unknownCalls++;return nativeResult;});
  const observed=runtime.run(child,()=>expression(putCall,{__afwBudget:runtime,tx:adapter,P:'',encode:(_kind,v)=>v,next:value}));
  if(mode==='wrapper'||mode==='explicit'){
   assert.equal(enteredThis,adapter);assert.equal(observed,originalPromise);assert.equal(nativePromise,nativeResult);assert.equal(await observed,undefined);
  }else{assert.equal(observed,nativeResult);assert.equal(await observed,value);}
  if(mode==='unknown'){assert.equal(unknownCalls,1);assert.deepEqual(effects,[]);}
  else{assert.equal(effects.length,1);assert.equal(effects[0].receiver,mode==='alias'?adapter:tx);assert.deepEqual(effects[0].args,['state',value]);}
  const snapshot=runtime.snapshot();
  assert(snapshot.rows.every(row=>row.operation==='put'&&row.rootOrdinal===1&&row.childOrdinal===1&&row.status==='fulfilled'));
  return [snapshot.totals.nativeStarted,snapshot.totals.nativeSettled,snapshot.chronology.reasons.invocationIdentity];
 }
 assert.deepEqual(await probe('explicit'),[1,1,0]);
 assert.deepEqual(await probe('alias'),[1,1,0]);
 assert.deepEqual(await probe('unknown'),[0,0,1]);
 assert.deepEqual(await probe('wrapper'),[1,1,0],'cold-A shorthand local wrapper attribution');
}

async function coldPhaseReentry(){
 const {runtime,root,child}=memoryScope(),nested={},alias={},other={},error=Error('fixed phase check');
 runtime.descendant(child,nested,4000);runtime.alias(child,alias);runtime.root(other,'monitoring_post',31000);
 const value={},rejected=Promise.reject(error);rejected.catch(()=>{});
 const get={get(promise){return promise;}};runtime.nativeHolder(get,'KV');
 const leaf=p=>runtime.member(get,'get',{operation:'get'})(p);
 let release;
 const pending=new Promise(resolve=>{release=resolve;});
 const original=runtime.run(child,()=>runtime.phase('sdk_lookup',()=>runtime.run(child,()=>leaf(pending))));
 assert.equal(original,pending);
 const settled=Promise.resolve(value);
 runtime.run(child,()=>{
  runtime.phase('sdk_lookup',()=>{
   assert.equal(runtime.run(nested,()=>leaf(settled)),settled);
   assert.equal(runtime.run(alias,()=>leaf(settled)),settled);
   assert.equal(runtime.run(other,()=>leaf(settled)),settled);
   assert.throws(()=>runtime.run(nested,()=>{throw error;}),e=>e===error);
   assert.equal(runtime.run(child,()=>leaf(rejected)),rejected);
  });
  assert.equal(leaf(settled),settled);
 });
 assert.equal(runtime.run(root,()=>leaf(settled)),settled);
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

function optionalBudgetDefaultMode(){
 const env={...process.env};delete env.AFW_BUDGET_GROUP;
 const run=group=>spawnSync(process.execPath,['--test','--test-reporter=tap','test/mcp-qa-finite-budget-native.test.mjs'],{env:group===undefined?env:{...env,AFW_BUDGET_GROUP:group},encoding:'utf8',timeout:30000,maxBuffer:256*1024});
 const ordinary=run(undefined);
 assert.equal(ordinary.error,undefined,'bounded default-mode subprocess');
 assert.equal(ordinary.status,0,'R1 optional qualification inactive in ordinary command');
 assert(!/^# Subtest: (?:R0|P1) /m.test(ordinary.stdout),'absent group registers no native qualification');
 for(const group of ['', 'unknown']){
  const rejected=run(group);assert.equal(rejected.status,1);assert((rejected.stdout+rejected.stderr).includes('SYN budget group unsupported before I0'));
 }
}

function truncatedPeakConsistency(){
 const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA',maxRows:1}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
 for(let i=0;i<2;i++){const op=c.begin(r,null,{phase:'setup',resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});}
 const valid=c.snapshot();assert.equal(valid.retention.operationRows.omitted,1);assert.equal(verifyObservedBudgetMetrics(valid).level,'observed_metrics');
 assert.deepEqual([valid.totals.peak,valid.totals.scopes[0].peak,valid.byPhaseResource[0].peak],[1,1,1]);
 const mutations=[
  s=>{s.totals.scopes[0].peak=2;},
  s=>{s.byPhaseResource[0].peak=2;},
  s=>{s.totals.peak=2;}
 ];
 const rejected=mutations.map(mutate=>{const sample=structuredClone(valid);mutate(sample);try{verifyObservedBudgetMetrics(sample);return false;}catch(error){assert.equal(error.code,'ERR_ASSERTION');return true;}});
 assert.deepEqual(rejected,[true,true,true],'R2 scope group and global peak reconciliation');
}

async function unobservablePromiseSettlement(){
 const {runtime,child}=memoryScope();let release,getters=0,calls=0;
 const pending=new Promise(resolve=>{release=resolve;});
 Object.defineProperty(pending,'then',{get(){getters++;throw Error('must not inspect then accessor');}});
 const holder={get(arg){assert.equal(this,holder);assert.equal(arg,17);calls++;return pending;}};runtime.nativeHolder(holder,'KV');
 const returned=runtime.run(child,()=>runtime.member(holder,'get',{operation:'get'})(17));
 assert.equal(returned,pending);assert.deepEqual([calls,getters],[1,0]);
 const s=runtime.snapshot(),observed=[s.rows[0].status,s.totals.nativeSettled,s.totals.active,s.coverage.observedMetricsComplete];
 release('same');assert.equal(await pending,'same');assert.equal(getters,0);
 assert.deepEqual(observed,['pending',0,1,false],'R3 uninspectable pending Promise remains unsettled');
 const after=runtime.snapshot();assert.equal(after.rows[0].status,'pending');assert.equal(after.totals.nativeSettled,0);assert(after.coverage.invalid>0);assert.equal(after.totals.nativeRejected,0);
 const control=memoryScope(),normal=Promise.resolve('normal'),syncValue={same:true};let controlCalls=0;
 const native={get(value){assert.equal(this,native);controlCalls++;return value;}};control.runtime.nativeHolder(native,'KV');
 assert.equal(control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(syncValue)),syncValue);
 const normalReturned=control.runtime.run(control.child,()=>control.runtime.member(native,'get',{operation:'get'})(normal));assert.equal(normalReturned,normal);assert.equal(await normalReturned,'normal');
 assert.deepEqual([controlCalls,control.runtime.snapshot().totals.nativeSettled,control.runtime.snapshot().totals.active,control.runtime.snapshot().coverage.invalid],[2,2,0,0]);
 const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),root=c.root({},{phase:'setup',deadline:30000,kind:'control'}),op=begin(c,root,null,'setup',performance.now());
 assert.equal(observeBudgetPromise(c,op,pending),pending);assert.equal(getters,0);assert.equal(c.snapshot().totals.nativeSettled,0);assert.equal(c.snapshot().totals.active,1);assert(c.snapshot().coverage.invalid>0);
}

async function positiveEpochInventory(){
 const ts=(await import('typescript')).default;
 const evidence=await import('./fixtures/finite-budget-evidence.mjs');
 const source=await readFile('test/mcp-qa-finite-budget-native.test.mjs','utf8'),ast=ts.createSourceFile('native-test.mjs',source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
 assert.equal(ast.parseDiagnostics.length,0);
 const callbacks=[];
 function visit(node){if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&node.expression.text==='test'&&ts.isStringLiteral(node.arguments[0])&&node.arguments[0].text.startsWith('P1 '))callbacks.push(node.arguments.at(-1));ts.forEachChild(node,visit);}
 visit(ast);assert.equal(callbacks.length,1);const statements=callbacks[0].body.statements;
 const first=statements.findIndex(node=>ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>ts.isIdentifier(d.name)&&d.name.text==='epochs'));
 assert(first>=0,'actual P1 epoch validation block');
 const block=statements.slice(first).map(node=>node.getText(ast)).join('\n');
 const validate=Function('assert','result','process','console','verifyObservedBudgetMetrics','verifyCompleteBudgetTrace','verifyPositiveBudgetEpochInventory','"use strict";'+block);
 const keys=[['producer',0,'M'],['producer',0,'QA'],['producer',1,'M'],['producer',1,'QA'],['producer',2,'M'],['producer',2,'QA'],['consumer',0,'M'],['consumer',0,'QA']];
 const phases=['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'];
 // MODELED DTOs from the real collector; no native fixture, clock or identity.
 const epochs=keys.map(([segment,epoch,role])=>{
  const c=createBudgetDiagnostics({testRevision:revision,workerRole:role}),r=c.root({},{phase:'setup',deadline:30000,kind:'control'});
  if(!(segment==='consumer'&&role==='M'))for(const [i,phase]of (segment==='producer'&&epoch===0&&role==='QA'?phases:['setup']).entries()){
   const op=c.begin(r,null,{phase,resourceClass:'KV',operation:'get',at:i*2});c.settle(op,{at:i*2+1,status:'fulfilled'});
  }
  return {segment,epoch,role,snapshot:c.snapshot()};
 });
 const check=value=>validate(assert,{diagnostics:{epochs:value}},{env:{GITHUB_SHA:revision}},{info(){}},verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,evidence.verifyPositiveBudgetEpochInventory);
 check(epochs);
 assert.throws(()=>check(epochs.filter(e=>!(e.segment==='consumer'&&e.role==='M'&&e.epoch===0))),{code:'ERR_ASSERTION'},'R4 missing empty consumer epoch rejected');
 const invalid=[
  [...epochs,epochs[0]],
  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:1}],
  [...epochs.slice(0,-1),{...epochs.at(-1),role:'fixture'}],
  [...epochs.slice(0,-1),{...epochs.at(-1),epoch:'0'}]
 ];
 for(const value of invalid)assert.throws(()=>check(value),{code:'ERR_ASSERTION'});
}

async function intrinsicReadBytes(){
 const cases=[
  {bytes:new ArrayBuffer(7),length:7,direct:true,throws:true},
  {bytes:new Uint8Array(5),length:5,direct:false,throws:false},
  {bytes:new DataView(new ArrayBuffer(3)),length:3,direct:false,throws:true}
 ];
 const observations=[];
 for(const item of cases){
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
