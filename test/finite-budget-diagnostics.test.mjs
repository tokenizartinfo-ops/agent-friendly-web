import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createBudgetDiagnostics,observeBudgetPromise} from './fixtures/finite-budget-diagnostics.mjs';
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
test('Q3 fixed Root and phase survive a concurrent Root and late settlement',()=>{
 const {c,r,child}=fixture(),a=begin(c,r,child,'authorize_get',0),r2=c.root({},{phase:'monitoring_post',deadline:31000,kind:'control'}),b=begin(c,r2,null,'monitoring_post',1);
 c.settle(b,{at:2,status:'fulfilled'});c.settle(a,{at:3,status:'fulfilled'});const s=c.snapshot();
 assert.deepEqual(s.rows.map(v=>[v.rootOrdinal,v.childOrdinal,v.phase,v.settledAt]),[[1,1,'authorize_get',3],[2,null,'monitoring_post',2]]);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,1);assert.equal(s.coverage.unattributed,0);
});
test('Q4 logical denial and cancellation do not fabricate native settlement',()=>{
 const {c,r,child}=fixture(),op=begin(c,r,child);c.logical(op,{at:5,reason:'timeout'});c.cancel(op,{at:6,stage:'started'});
 let s=c.snapshot();assert.equal(s.totals.logicalDenied,1);assert.equal(s.totals.nativeSettled,0);assert.equal(s.totals.cancelStarted,1);assert.equal(s.totals.cancelSettled,0);assert.equal(s.totals.active,1);
 c.cancel(op,{at:7,stage:'settled'});assert.equal(c.snapshot().totals.nativeSettled,0);c.settle(op,{at:8,status:'rejected'});s=c.snapshot();assert.equal(s.totals.nativeRejected,1);assert.equal(s.rows[0].logicalAt,5);assert.equal(s.rows[0].cancelSettledAt,7);
});
test('Q5 observing preserves actual promise identity, resolution, rejection and no authority',async()=>{
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
test('Q8 opaque wire bytes and linked body invocations preserve interval and byte denominators',()=>{
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
});
