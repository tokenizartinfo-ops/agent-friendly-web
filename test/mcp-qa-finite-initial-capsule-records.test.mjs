import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {initialCanonical as canonical,initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {encodeFiniteInitialCapsule as encode,decodeFiniteInitialCapsule as decode,finiteInitialCapsuleBindingsHash as bindingsHash,FINITE_INITIAL_CAPSULE_KEY} from '../lib/mcp-qa-finite-initial-capsule-records.mjs';
const h='a'.repeat(64),id='11111111-1111-4111-8111-111111111111',I0=Date.parse('2026-11-02T12:00:00Z');
const body={purpose:'afw.finite-initial-capsule.v1',entryHash:h,materialHash:h,selectorHash:h,materialAckHash:h,cleanupPlanHash:h,cleanupArmAckHash:h,activationCompletionHash:h,sourceRevision:'b'.repeat(40),sourceTree:'c'.repeat(40),qaVersionId:id,qaDeploymentId:id,initialInstanceId:'afw-finite-initial-'+h,preconnectionId:h,I0,initialDeadline:I0+300000,C0:I0+900000,C1:I0+1080000,activatedVersionId:'22222222-2222-4222-8222-222222222222',activatedDeploymentId:id,moduleHash:h,configurationHash:h,bindingsHash:h,recordedAt:I0+1000};
const signed=b=>({...b,capsuleHash:initialHash(body.purpose,b)});
test('capsule exact canonical bounded data roundtrips without exposing cleanup authority',()=>{
 const v=signed(body),raw=encode(v);assert.deepEqual(decode(raw),v);
 assert.equal(FINITE_INITIAL_CAPSULE_KEY,'afw.finite-initial-preparation.v1:capsule');
 assert.equal(Object.isFrozen(decode(raw)),true);
 for(const value of [raw+' ',JSON.stringify(v),raw.replace(h,'f'.repeat(64)),raw.replace('"purpose":','"purpose":"duplicate","purpose":'),' '.repeat(4097),'null','[]'])assert.throws(()=>decode(value));
 for(const update of [{extra:true},{purpose:'wrong'},{materialAckHash:'bad'},{sourceRevision:h},{qaDeploymentId:'opaque'},{initialInstanceId:'borrowed'},{initialDeadline:I0+300001},{C0:I0+900001},{C1:I0+1080001},{recordedAt:I0-1},{recordedAt:I0+300000},{I0:-1},{recordedAt:Infinity},{activatedVersionId:id}])assert.throws(()=>encode(signed({...body,...update})));
 const missing={...body};delete missing.preconnectionId;assert.throws(()=>encode(signed(missing)));
 const late={...body,I0:Date.parse('2026-11-03T02:59:00Z')};late.initialDeadline=late.I0+300000;late.C0=late.I0+900000;late.C1=late.C0+180000;late.recordedAt=late.I0;assert.throws(()=>encode(signed(late)));
});
test('capsule rejects accessors, symbols and prototypes without evaluating attacker code',()=>{
 let reads=0;const v=signed(body);Object.defineProperty(v,'entryHash',{enumerable:true,get(){reads++;return h;}});
 assert.throws(()=>encode(v));assert.equal(reads,0);
 assert.throws(()=>encode(Object.assign(Object.create({}),signed(body))));
 assert.throws(()=>encode({...signed(body),[Symbol('extra')]:true}));
});
test('full bindings commitment sorts names and recursive keys, and includes private binding fields',()=>{
 const a=[{name:'Z',type:'service',service:'private-internal',environment:'production'},{type:'ratelimit',name:'A',simple:{period:60,limit:10},namespace_id:'123'}];
 const b=[{name:'A',namespace_id:'123',simple:{limit:10,period:60},type:'ratelimit'},{environment:'production',service:'private-internal',type:'service',name:'Z'}];
 const expected=createHash('sha256').update(canonical([a[1],a[0]])).digest('hex');
 assert.equal(bindingsHash(a),expected);assert.equal(bindingsHash(b),expected);
 const changed=structuredClone(a);changed[0].service='other-private-service';assert.notEqual(bindingsHash(changed),expected);
 assert.notEqual(initialHash('afw.finite-public-bindings.v1',[a[1],a[0]]),expected);
 assert.throws(()=>bindingsHash([a[0],a[0]]));assert.throws(()=>bindingsHash([]));
});
