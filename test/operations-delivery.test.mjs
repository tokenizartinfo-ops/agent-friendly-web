import test from 'node:test';
import assert from 'node:assert/strict';
import {deliverOperationalSignal} from '../lib/operations-delivery.mjs';
import {createOperationsIngress} from '../lib/operations-ingress.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';

const time=Date.parse('2026-10-04T16:00:00Z');
const secret='synthetic-only-producer-secret-32-characters';
const signal={eventId:'producer-test',resource:'afw_delegated_canary',check:'delegated_edge',version:'aa121311-2d88-4a2f-ad54-b52193cd1c20',observedAt:new Date(time).toISOString(),result:'failed'};
test('delivery deadline also bounds a receiver that never resolves',async()=>{
  const start=Date.now();
  const result=await deliverOperationalSignal({signal,secret,receiver:{fetch:()=>new Promise(()=>{})},now:()=>time});
  assert.equal(result.ok,false);assert.equal(result.reason,'delivery_unconfirmed');
  assert.ok(Date.now()-start<7000);
});
test('producer delivers authenticated immutable signal and confirms durable duplicate receipt',async()=>{
  const {db}=operationsDb(),worker=createOperationsIngress({now:()=>time});
  const receiver={fetch:request=>worker.fetch(request,{OPERATIONS_DB:db,AFW_OPERATIONS_ENABLED:'true',AFW_OPERATIONS_SIGNING_SECRET:secret})};
  const first=await deliverOperationalSignal({signal,secret,receiver,now:()=>time});
  assert.equal(first.ok,true);assert.equal(first.duplicate,false);
  assert.equal((await deliverOperationalSignal({signal,secret,receiver,now:()=>time})).duplicate,true);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_events').first()).n,1);
});
test('producer fails closed before sending invalid data and sanitizes rejected or malformed receipts',async()=>{
  let calls=0;
  const receiver={fetch:async()=>{calls++;throw Error('private provider detail');}};
  for(const extra of [{secret:''},{signal:{...signal,resource:'atelier'}},{signal:{...signal,body:'private'}}])
    await assert.rejects(()=>deliverOperationalSignal({signal,secret,receiver,now:()=>time,...extra}));
  assert.equal(calls,0);
  const unavailable=await deliverOperationalSignal({signal,secret,receiver,now:()=>time});
  assert.equal(unavailable.ok,false);assert.ok(!JSON.stringify(unavailable).includes('private'));
  for(const response of [Response.json({accepted:true},{status:200}),Response.json({accepted:false},{status:202}),new Response('x'.repeat(5000),{status:202,headers:{'content-type':'application/json'}}),new Response(null,{status:302,headers:{location:'https://other.invalid'}})]) {
    const result=await deliverOperationalSignal({signal,secret,receiver:{fetch:async request=>{assert.equal(request.url,'https://operations.agentfriendlyweb.dev/signals');assert.equal(request.redirect,'error');return response;}},now:()=>time});
    assert.equal(result.ok,false);
  }
});
