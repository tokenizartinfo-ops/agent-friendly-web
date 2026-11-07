import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createBudgetDiagnostics,observeBudgetPromise,createBudgetRuntime} from './fixtures/finite-budget-diagnostics.mjs';
import {persistBudgetEvidence} from './fixtures/finite-budget-evidence.mjs';
const revision='a'.repeat(40);
const fixture=()=>{const c=createBudgetDiagnostics({testRevision:revision,workerRole:'QA'}),r=c.root({},{phase:'authorize_get',deadline:30000,kind:'control'}),child=c.child(r,{},{deadline:5000});return {c,r,child};};
const begin=(c,r,child,phase='authorize_get',at=0)=>c.begin(r,child,{phase,resourceClass:'KV',operation:'get',at});
test('Q1 projection redacts secret markers and ignores accessors',()=>{
 const {c,r,child}=fixture();let accessed=false;const metadata={phase:'authorize_get',resourceClass:'KV',operation:'get',at:1,secret:'SECRET_Q1_NEVER_SERIALIZE'};Object.defineProperty(metadata,'url',{get(){accessed=true;throw Error('secret getter');}});
 const op=c.begin(r,child,metadata);c.settle(op,{at:2,status:'fulfilled'});const dto=c.snapshot(),raw=JSON.stringify(dto);
 assert(!raw.includes('SECRET_Q1'));assert(!raw.includes('url'));assert.equal(accessed,false);assert.equal(dto.rows[0].resourceClass,'KV');assert.equal(dto.testRevision,revision);
 const invalid=c.begin(r,child,{phase:'SECRET_Q1',resourceClass:'KV',operation:'get',at:3});assert.equal(invalid,null);assert(c.snapshot().coverage.invalid>0);assert(!JSON.stringify(c.snapshot()).includes('SECRET_Q1'));
});
test('Q2 one native entry and duplicate settlement retain consistent denominators',()=>{
 const {c,r,child}=fixture(),op=begin(c,r,child);c.settle(op,{at:10,status:'fulfilled'});c.settle(op,{at:20,status:'rejected'});
 const s=c.snapshot();assert.equal(s.rows.length,1);assert.equal(s.totals.nativeStarted,1);assert.equal(s.totals.nativeSettled,1);assert.equal(s.totals.nativeRejected,0);assert.equal(s.byPhaseResource[0].nativeSettled,1);assert.equal(s.totals.nativeDurationSumMs,10);assert.equal(s.totals.active,0);
 const c2=createBudgetDiagnostics({testRevision:revision,workerRole:'M'}),r2=c2.root({},{phase:'mcp_read',deadline:null,kind:'transport'});
 for(const [resourceClass,operation]of [['rateLimiter','limit'],['DO','rpc']]){const ref=c2.begin(r2,null,{phase:'mcp_read',resourceClass,operation,at:0});assert(ref);c2.settle(ref,{at:1,status:'fulfilled'});}
 const typed=c2.snapshot();assert.equal(typed.totals.nativeStarted,2);assert.equal(typed.totals.nativeSettled,2);assert.equal(typed.coverage.unattributed,0);assert.deepEqual(typed.rows.map(r=>[r.resourceClass,r.operation,r.fetchOpOrdinal]),[['rateLimiter','limit',null],['DO','rpc',null]]);
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

});
test('Q6 overflow at 16385 events is explicit and does not change native output',async()=>{
 const {c,r}=fixture();for(let i=0;i<16385;i++)begin(c,r,null,'setup',i);
 const s=c.snapshot();assert.equal(s.coverage.overflow,true);assert(s.rows.length<=16384);assert.equal(s.totals.nativeStarted,16385);
 const actual=Promise.resolve('same native output');const op=begin(c,r,null,'setup',performance.now());assert.equal(observeBudgetPromise(c,op,actual),actual);assert.equal(await actual,'same native output');assert(c.snapshot().coverage.overflow);
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

});
