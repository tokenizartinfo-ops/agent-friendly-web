import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
const load=()=>import('../lib/assistance-private-qa-preregistration.mjs');
async function setup(){
 const f=fixture(),approval={manifest:f.m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=f.m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:f.m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 let source={registration:r,approval},clock=f.m.startAt,values=new Map(),hook;
 const storage={transaction:async fn=>{const draft=new Map(structuredClone([...values]));const out=await fn({get:async k=>structuredClone(draft.get(k)),put:async(k,v)=>{draft.set(k,structuredClone(v));await hook?.();}});values=draft;return out;}};
 return {r,approval,options:{storage,readPreregistration:()=>source,now:()=>clock},get values(){return values;},source:v=>{source=v;},clock:v=>{clock=v;},hook:v=>{hook=v;},cleanup:f.cleanup};
}
test('operator pins persist before any catalog and cannot be replaced or supplied by caller',async()=>{
 const f=await setup();try{const {createPrivateQaPreregistration}=await load(),h=createPrivateQaPreregistration(f.options);assert.equal(await h.register({registration:'forged'}),true);assert.deepEqual(await h.read(),{registration:f.r,approval:f.approval});const restarted=createPrivateQaPreregistration(f.options);assert.equal(await restarted.register(),false);assert.deepEqual(await restarted.read(),await h.read());}finally{f.cleanup();}
});
test('withdrawal and expiry close admission but preserve validated closure pins',async()=>{
 const f=await setup();try{const {createPrivateQaPreregistration}=await load(),h=createPrivateQaPreregistration(f.options);assert.equal(await h.register(),true);f.clock(f.r.plan.closeAt);assert.equal(await h.read(),null);assert.deepEqual(await h.readForClosure(),{registration:f.r,approval:f.approval});assert.equal(await h.withdraw(),true);f.source(null);const restarted=createPrivateQaPreregistration(f.options);assert.equal(await restarted.read(),null);assert.equal(await restarted.register(),false);assert.deepEqual(await restarted.readForClosure(),{registration:f.r,approval:f.approval});}finally{f.cleanup();}
});
test('missing or mismatched trusted source never registers and mutation during write rolls back',async()=>{
 const f=await setup();try{const {createPrivateQaPreregistration}=await load();f.source({registration:f.r,approval:{...f.approval,identityRef:'f'.repeat(64)}});assert.equal(await createPrivateQaPreregistration(f.options).register(),false);assert.equal(f.values.size,0);f.source({registration:f.r,approval:f.approval});f.hook(()=>f.source(null));assert.equal(await createPrivateQaPreregistration(f.options).register(),false);assert.equal(f.values.size,0);}finally{f.cleanup();}
});
test('lost registration acknowledgement does not permit replacement and late reads fail closed',async()=>{
 const f=await setup();try{const {createPrivateQaPreregistration}=await load(),base=f.options.storage,uncertain=createPrivateQaPreregistration({...f.options,storage:{transaction:async fn=>{await base.transaction(fn);throw Error('lost ack');}}});assert.equal(await uncertain.register(),false);const h=createPrivateQaPreregistration(f.options);assert.equal(await h.register(),false);assert.deepEqual(await h.readForClosure(),{registration:f.r,approval:f.approval});f.clock(f.r.plan.closeAt);assert.equal(await h.read(),null);}finally{f.cleanup();}
});

test('withdrawal during transaction acknowledgement cannot return active pins',async()=>{const f=await setup();try{const {createPrivateQaPreregistration}=await load(),h=createPrivateQaPreregistration(f.options);assert.equal(await h.register(),true);let raced=false;const base=f.options.storage,late=createPrivateQaPreregistration({...f.options,storage:{transaction:async fn=>{const value=await base.transaction(fn);if(!raced){raced=true;await h.withdraw();}return value;}}});assert.equal(await late.read(),null);assert.deepEqual(await h.readForClosure(),{registration:f.r,approval:f.approval});}finally{f.cleanup();}});

test('source withdrawal after final storage acknowledgement cannot return active pins',async()=>{const f=await setup();try{const {createPrivateQaPreregistration}=await load(),h=createPrivateQaPreregistration(f.options);assert.equal(await h.register(),true);let calls=0;const base=f.options.storage,late=createPrivateQaPreregistration({...f.options,storage:{transaction:async fn=>{const value=await base.transaction(fn);if(++calls===2)f.source(null);return value;}}});assert.equal(await late.read(),null);}finally{f.cleanup();}});

test('asynchronous source and accessor then never create trusted pins or invoke getters',async()=>{const f=await setup();try{const {createPrivateQaPreregistration}=await load();let invoked=0;const raw={registration:f.r,approval:f.approval};Object.defineProperty(raw,'then',{enumerable:true,get(){invoked++;return undefined;}});f.source(raw);assert.equal(await createPrivateQaPreregistration(f.options).register(),false);assert.equal(invoked,0);f.source(Promise.resolve({registration:f.r,approval:f.approval}));assert.equal(await createPrivateQaPreregistration(f.options).register(),false);assert.equal(f.values.size,0);}finally{f.cleanup();}});
