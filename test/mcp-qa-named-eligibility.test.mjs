import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaNamedEligibility} from '../lib/mcp-qa-named-eligibility.mjs';
function fixture(){
 const at=Date.now();let sessions=0,reads=0;const f={wall:at,answer:async()=>({eligible:1})};
 const db={prepare(){throw Error('ordinary reads forbidden');},withSession(mode){assert.equal(mode,'first-primary');sessions++;return{prepare(){return{bind(){return{first:async()=>{reads++;return f.answer();},run(){assert.fail('reader must not write');}};}};}};}};
 f.options=()=>({db,original:{containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),applicationId:'4'.repeat(32),closedAt:at-5000},candidate:{trialId:'f'.repeat(64),containerId:'e'.repeat(64),programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40),scopeHash:'3'.repeat(64),startAt:at-1000,expiresAt:at+60000,budget:1},window:{grantId:'current',startAt:at-1000,expiresAt:at+60000},cancellationHistory:JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:'current',consentSequence:1,consentRevision:1,issuedAt:at-1000,expiresAt:at+60000},cancellations:[]}),now:()=>f.wall,timeoutMs:5000});
 Object.defineProperties(f,{sessions:{get:()=>sessions},reads:{get:()=>reads}});return f;
}
const make=(f,extra={})=>createPrivateQaNamedEligibility({...f.options(),...extra}),check=(a,signal=new AbortController().signal)=>a.check(signal);
test('named primary reader uses one fresh first-primary SELECT per call and returns only literal boolean',async()=>{
 const f=fixture(),a=make(f);assert.equal(await check(a),true);assert.equal(await check(a),true);assert.equal(f.sessions,2);assert.equal(f.reads,2);assert.deepEqual(Object.keys(a),['check']);
});
for(const value of [null,undefined,{}, {eligible:0},{eligible:true},{eligible:'1'},{eligible:1,extra:true}])test('invalid primary result is closed '+JSON.stringify(value),async()=>{
 const f=fixture();f.answer=async()=>value;assert.equal(await check(make(f)),false);
});
test('result accessors are never invoked and private errors do not escape',async()=>{
 const f=fixture();let touches=0;f.answer=async()=>Object.defineProperty({},'eligible',{enumerable:true,get(){touches++;throw Error('private-grant-detail');}});assert.equal(await check(make(f)),false);assert.equal(touches,0);f.answer=async()=>{throw Error('private-grant-detail');};assert.equal(await check(make(f)),false);
});
test('signal and method arity cannot be omitted or widened',async()=>{
 const f=fixture(),a=make(f);assert.equal(await a.check(),false);assert.equal(await a.check({aborted:false}),false);assert.equal(await a.check(new AbortController().signal,'foreign'),false);assert.equal(f.reads,0);
});
test('binding and pinned scope drift after an awaited query blocks the observation',async()=>{
 const f=fixture(),o=f.options();f.answer=async()=>{o.candidate.scopeHash='0'.repeat(64);return{eligible:1};};assert.equal(await check(createPrivateQaNamedEligibility(o)),false);assert.equal(f.reads,1);
});
test('strict server pins reject alternative grant, mismatched windows and unexpected options',()=>{
 const f=fixture(),o=f.options();for(const delta of [{extra:true},{timeoutMs:5001},{timeoutMs:0},{db:{prepare:o.db.prepare}},{window:{...o.window,grantId:'foreign'}},{candidate:{...o.candidate,startAt:o.candidate.startAt-1}},{candidate:{...o.candidate,budget:2}},{original:{...o.original,containerId:o.candidate.containerId}}])assert.throws(()=>createPrivateQaNamedEligibility({...o,...delta}));
 let calls=0;const bad={...o};Object.defineProperty(bad,'candidate',{enumerable:true,get(){calls++;return o.candidate;}});assert.throws(()=>createPrivateQaNamedEligibility(bad));assert.equal(calls,0);
});
test('parent abort and hung primary read are prompt and late success stays false',async()=>{
 for(const abortEarly of [false,true]){
 const f=fixture(),parent=new AbortController();let release;const gate=new Promise(r=>{release=r;});f.answer=()=>gate;
 const pending=check(make(f,{timeoutMs:30}),parent.signal);if(abortEarly)parent.abort();assert.equal(await Promise.race([pending,new Promise(r=>setTimeout(()=>r('hung'),180))]),false);release({eligible:1});assert.equal(await pending,false);
 }
});
test('the original wall deadline survives a forward jump while the grant remains live',async()=>{
 const f=fixture(),at=f.wall;f.answer=async()=>{f.wall=at+5000;return{eligible:1};};assert.equal(await check(make(f)),false);
});
test('wall regression or an already expired named window prevents success',async()=>{
 const f=fixture(),at=f.wall;f.answer=async()=>{f.wall=at-1;return{eligible:1};};assert.equal(await check(make(f)),false);
 const g=fixture(),o=g.options();g.wall=o.window.expiresAt;assert.equal(await check(createPrivateQaNamedEligibility(o)),false);assert.equal(g.reads,0);
});
test('abort queued during successful result settlement cannot escape as true',async()=>{
 const f=fixture(),parent=new AbortController();f.answer=async()=>{queueMicrotask(()=>queueMicrotask(()=>parent.abort()));return{eligible:1};};assert.equal(await check(make(f),parent.signal),false);
});
