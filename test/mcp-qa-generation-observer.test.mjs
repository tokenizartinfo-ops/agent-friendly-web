import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../lib/mcp-qa-generation-ledger.mjs';
import {generationFixture,HEAD,INFO,CONTROL} from './fixtures/qa-generation-ledger.mjs';
const copy=f=>structuredClone([...f.rows]);
const flags=r=>{for(const key of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[key],false);};
function observer(f,extra={}){
 assert.equal(typeof api.createPrivateQaGenerationObserver,'function','read-only generation observer is required');
 return api.createPrivateQaGenerationObserver({storage:f.storage,capsule:JSON.stringify(f.capsule),now:f.now,timeoutMs:5000,...extra});
}
test('observer reads stored execution identity without accessing put or mutating history',async()=>{
 const f=generationFixture(),ledger=api.createPrivateQaGenerationLedger(f.options()),r=await ledger.arm(),before=copy(f);let writes=0;
 const storage={transaction:fn=>f.storage.transaction(t=>fn(Object.defineProperty({get:t.get,list:t.list},'put',{get(){writes++;throw Error('observer cannot access writes');}})))};
 const value=await observer(f,{storage}).read();assert.equal(value.purpose,'afw.qa-generation-resolution.v2');assert.equal(value.status,'armed');assert.equal(value.isHead,true);assert.equal(value.withinWindow,true);assert.equal(value.planHash,r.planHash);assert.equal(value.runtimeVersionId,f.env.AFW_QA_VERSION.id);assert.equal(value.sourceRevision,'a'.repeat(40));assert.equal(value.storedContext,'durable_object');flags(value);assert.equal(writes,0);assert.deepEqual(copy(f),before);assert.equal(Object.hasOwn(value,'capsule'),false);assert.equal(Object.hasOwn(value,'grantId'),false);
});
test('absent pending withdrawn and expired observations never imply authority',async()=>{
 const f=generationFixture(),o=observer(f);let value=await o.read();assert.equal(value.status,'absent');flags(value);f.eligibility=async n=>n===1;const ledger=api.createPrivateQaGenerationLedger(f.options());await ledger.arm();value=await o.read();assert.equal(value.status,'pending');flags(value);await ledger.withdraw();value=await o.read();assert.equal(value.status,'withdrawn');flags(value);f.setNow(f.capsule.expiresAt);value=await o.read();assert.equal(value.withinWindow,false);flags(value);
});
test('historical identity remains stored under new code and a newer HEAD',async()=>{
 const f=generationFixture(),ledger=api.createPrivateQaGenerationLedger(f.options()),oldObserver=observer(f),first=await ledger.arm();await ledger.withdraw();f.setNow(f.capsule.expiresAt+1);f.env.AFW_QA_VERSION={id:'22222222-2222-4222-8222-222222222222'};f.pinOptions.expectedVersionId=f.env.AFW_QA_VERSION.id;f.pinOptions.sourceRevision='b'.repeat(40);
 f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:first.planHash,infoHash:first.infoHash,sequence:first.sequence},trialId:'8'.repeat(64),grantId:'new-grant',eventId:'9'.repeat(64),startAt:f.now(),expiresAt:f.now()+60000};assert.equal((await api.createPrivateQaGenerationLedger(f.options()).arm()).status,'armed');
 const before=copy(f),old=await oldObserver.read(),current=await observer(f).read();assert.equal(old.isHead,false);assert.equal(old.runtimeVersionId,'11111111-1111-4111-8111-111111111111');assert.equal(old.sourceRevision,'a'.repeat(40));assert.equal(old.withinWindow,false);assert.equal(current.runtimeVersionId,f.env.AFW_QA_VERSION.id);assert.equal(current.sourceRevision,'b'.repeat(40));flags(old);flags(current);assert.deepEqual(copy(f),before);
});
for(const broken of ['head','info','control','orphan-info','orphan-control'])test('observer rejects '+broken+' corruption without repair',async()=>{
 const f=generationFixture(),r=await api.createPrivateQaGenerationLedger(f.options()).arm();
 if(broken==='head')f.rows.set(HEAD,{corrupt:true});else if(broken.startsWith('orphan'))f.rows.set((broken==='orphan-info'?INFO:CONTROL)+'f'.repeat(64),{orphan:true});else f.rows.delete((broken==='info'?INFO:CONTROL)+r.planHash);
 const before=copy(f),value=await observer(f).read();assert.equal(value.status,'blocked');flags(value);assert.deepEqual(copy(f),before);
});
for(const method of ['get','list'])test('hung '+method+' is bounded and late data is never accepted',async()=>{
 const f=generationFixture();await api.createPrivateQaGenerationLedger(f.options()).arm();let release;const gate=new Promise(resolve=>{release=resolve;});const storage={transaction:fn=>f.storage.transaction(t=>fn({get:async(...args)=>{if(method==='get')await gate;return t.get(...args);},list:async(...args)=>{if(method==='list')await gate;return t.list(...args);}}))};
 try{const before=copy(f),promise=observer(f,{storage,timeoutMs:30}).read(),value=await Promise.race([promise,new Promise(resolve=>setTimeout(()=>resolve('hung'),180))]);assert.notEqual(value,'hung');assert.equal(value.status,'blocked');release();await new Promise(resolve=>setTimeout(resolve,10));assert.equal((await promise).status,'blocked');assert.deepEqual(copy(f),before);}finally{release();}
});
test('observer has no mutators or pin-bypass option and rejects selectors',async()=>{
 const f=generationFixture(),o=observer(f);assert.deepEqual(Object.keys(o),['read']);flags(await o.read('foreign'));assert.equal((await o.read('foreign')).status,'blocked');assert.throws(()=>observer(f,{skipPin:true}));assert.throws(()=>observer(f,{timeoutMs:5001}));
});
test('observer retains original wall deadline across storage reads',async()=>{
 const f=generationFixture();await api.createPrivateQaGenerationLedger(f.options()).arm();const at=f.now(),storage={transaction:fn=>f.storage.transaction(t=>fn({get:async(...args)=>{const r=await t.get(...args);f.setNow(at+5000);return r;},list:t.list}))};assert.equal((await observer(f,{storage}).read()).status,'blocked');
});

test('observer rejects regression between initial wall capture and first check',async()=>{
 const f=generationFixture(),at=f.now();let n=0;const now=()=>++n===1?at+1:at;assert.equal((await observer(f,{now}).read()).status,'blocked');
});
for(const initial of [NaN,-1])test('observer rejects invalid monotonic origin '+String(initial),async()=>{
 const f=generationFixture(),original=Object.getOwnPropertyDescriptor(performance,'now'),real=performance.now.bind(performance);let n=0;
 Object.defineProperty(performance,'now',{configurable:true,value:()=>++n===1?initial:real()});
 try{assert.equal((await observer(f).read()).status,'blocked');}finally{if(original)Object.defineProperty(performance,'now',original);else delete performance.now;}
});
