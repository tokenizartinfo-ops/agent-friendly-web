import test from 'node:test';
import assert from 'node:assert/strict';
import * as preparation from '../lib/mcp-qa-finite-owner-preparation.mjs';
const request=()=>new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare');
test('boundary preserves the spent original request budget across a new local root',t=>{
 assert.equal(typeof preparation.readFiniteOwnerRequestBoundary,'function','registered original boundary export is missing');
 assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function','translated local lease is missing');
 let wall=100000,mono=100;
 t.mock.method(Date,'now',()=>wall);t.mock.method(performance,'now',()=>mono);
 const original=preparation.createFiniteOwnerRequestLease(request());let received;
 try{
  wall+=29000;mono+=29000;
  const boundary=preparation.readFiniteOwnerRequestBoundary(original.lease);
  assert.deepEqual(boundary,{startedAt:100000,deadline:130000,remainingMs:1000});assert.ok(Object.isFrozen(boundary));
  received=preparation.createFiniteOwnerForwardedRequestLease(request(),boundary);
  assert.notEqual(preparation.readFiniteOwnerRequestContext(received.lease).root,original.lease);
  assert.equal(preparation.readFiniteOwnerRequestDeadline(received.lease),130000);
  mono+=1000;assert.throws(()=>received.lease.assertCurrent());
 }finally{received?.finish();original.finish();}
});
test('boundary cannot serialize a clone or read an expired root',()=>{
 assert.equal(typeof preparation.readFiniteOwnerRequestBoundary,'function');
 const original=preparation.createFiniteOwnerRequestLease(request());
 try{assert.throws(()=>preparation.readFiniteOwnerRequestBoundary({...original.lease}));}
 finally{original.finish();}
 assert.throws(()=>preparation.readFiniteOwnerRequestBoundary(original.lease));
});
test('translated boundary rejects accessors, extras, prototype and inconsistent clocks without reading getters',t=>{
 assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function');
 t.mock.method(Date,'now',()=>100000);let calls=0;
 const good={startedAt:99000,deadline:129000,remainingMs:29000};
 const getter={...good};Object.defineProperty(getter,'remainingMs',{get(){calls++;return 29000;}});
 for(const bad of [getter,{...good,x:0},{...good,[Symbol('x')]:0},Object.assign(Object.create({x:0}),good),
 {...good,startedAt:100001},{...good,startedAt:98000},{...good,deadline:100000},{...good,remainingMs:0},
 {...good,remainingMs:30001},{...good,deadline:NaN},{...good,remainingMs:1.5}])
 assert.throws(()=>preparation.createFiniteOwnerForwardedRequestLease(request(),bad));
 assert.equal(calls,0);
});
test('translated lease clips wall and monotonic disagreement and links actual incoming abort',t=>{
 assert.equal(typeof preparation.createFiniteOwnerForwardedRequestLease,'function');
 let wall=100000,mono=100;t.mock.method(Date,'now',()=>wall);t.mock.method(performance,'now',()=>mono);
 const controller=new AbortController(),incoming=new Request(request(),{signal:controller.signal});
 const local=preparation.createFiniteOwnerForwardedRequestLease(incoming,{startedAt:90000,deadline:120000,remainingMs:500});
 try{
  assert.equal(preparation.readFiniteOwnerRequestDeadline(local.lease),100500);
  wall+=10;mono+=400;assert.equal(preparation.readFiniteOwnerRequestBoundary(local.lease).remainingMs,100);
  controller.abort();assert.equal(local.lease.signal.aborted,true);assert.throws(()=>local.lease.assertCurrent());
 }finally{local.finish();}
});

test('descendant boundary cannot renew its spent five second monotonic budget when wall time stalls',async t=>{
 let mono=100;t.mock.method(Date,'now',()=>100000);t.mock.method(performance,'now',()=>mono);
 const incoming=request(),parent=preparation.createFiniteOwnerRequestLease(incoming),ctx={storage:{transaction(){}},id:{toString:()=> 'a'.repeat(64)}},env={RELEASE_DB:{withSession(){}}};let boundary;
 try{
  await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request:incoming},parent.lease,child=>{
   mono+=4000;boundary=preparation.readFiniteOwnerRequestBoundary(child);throw Error('SYN stop before source');
  }));
  assert.ok(boundary.remainingMs<=1000,'descendant monotonic budget must not be renewed');
 }finally{parent.finish();}
});
