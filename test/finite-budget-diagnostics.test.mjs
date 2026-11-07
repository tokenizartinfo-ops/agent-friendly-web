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
test('Q8 opaque wire bytes stay null and measured scope peak is distinct from duration sum',()=>{
 const {c,r,child}=fixture(),a=begin(c,r,child,'authorize_get',0),b=begin(c,r,child,'authorize_get',2);
 c.bytes(a,{length:12,chunks:2,durationMs:3});c.cancel(a,{at:6,stage:'started'});c.cancel(a,{at:7,stage:'settled'});c.settle(b,{at:8,status:'fulfilled'});c.settle(a,{at:10,status:'fulfilled'});
 const s=c.snapshot();assert.equal(s.rows[1].nativeBytesRead,null);assert.equal(s.rows[1].nativeBytesReason,'not_exposed_by_native_api');assert.equal(s.rows[0].nativeBytesRead,12);assert.equal(s.coverage.nativeBytesUnavailable,1);assert.equal(s.totals.peak,2);assert.equal(s.totals.scopes[0].peak,2);assert.equal(s.totals.nativeDurationSumMs,16);assert.equal(s.totals.observedWallMs,10);assert.equal(s.totals.cancelSettled,1);
});
