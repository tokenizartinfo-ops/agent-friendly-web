import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationsProducer} from '../lib/operations-producer.mjs';
import {createOperationsIngress} from '../lib/operations-ingress.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {readFileSync} from 'node:fs';

const time=Date.parse('2026-10-04T16:00:00Z'),secret='synthetic-only-producer-secret-32-characters';
const vars={AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+60000).toISOString(),AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_SIGNING_SECRET:secret,AFW_CANARY_VERSION:'aa121311-2d88-4a2f-ad54-b52193cd1c20',AFW_REAL_PILOT_VERSION:'94a3c291-a966-4bcd-987b-d913ed2fcf4d',AFW_CANARY_EXPECTED:'closed',AFW_REAL_PILOT_EXPECTED:'closed'};

test('producer closed window admits no database, probe or delivery work',async()=>{
 let probes=0,writes=0,deliveries=0;
 const producer=createOperationsProducer({now:()=>time,probeFetch:async()=>{probes++;return new Response(null,{status:404});}});
 const env={...vars,OPERATIONS_STATE_DB:{prepare(){writes++;throw Error('unexpected database work');}},OPERATIONS_RECEIVER:{fetch(){deliveries++;throw Error('unexpected delivery');}}};
 for(const expiry of [undefined,'invalid',new Date(time).toISOString(),new Date(time-1).toISOString()])assert.equal((await producer.run({...env,AFW_OPERATIONS_WINDOW_EXPIRES_AT:expiry})).paused,true);
 assert.deepEqual([writes,probes,deliveries],[0,0,0]);
});

test('expiry during a probe blocks subsequent network and delivery, preserving unfinished lease',async()=>{
 const {db,sqlite}=operationsDb();sqlite.exec(readFileSync(new URL('../worker/operations/producer-state.sql',import.meta.url),'utf8'));
 let clock=time,probes=0,deliveries=0;
 const env={...vars,OPERATIONS_STATE_DB:db,OPERATIONS_RECEIVER:{fetch:async()=>{deliveries++;return new Response(null,{status:202});}}};
 const producer=createOperationsProducer({now:()=>clock,probeFetch:async()=>{probes++;clock=time+60000;return new Response(null,{status:404});}});
 const result=await producer.run(env);
 assert.equal(result.paused,true);assert.equal(probes,1);assert.equal(deliveries,0);
 const row=sqlite.prepare('SELECT observed_at,lease_token,lease_until FROM operations_probe_state').get();
 assert.equal(row.observed_at,0);assert.ok(row.lease_token);assert.equal(row.lease_until,time+300000);
 assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM operations_probe_state').get().n,1);sqlite.close();
});
test('producer validates complete configuration before probing and delivers both closed observations',async()=>{
  const {db,sqlite}=operationsDb(),ingress=createOperationsIngress({now:()=>time});let probes=0,id=0;
  sqlite.exec(readFileSync(new URL('../worker/operations/producer-state.sql',import.meta.url),'utf8'));
  const env={...vars,OPERATIONS_STATE_DB:db,OPERATIONS_RECEIVER:{fetch:request=>ingress.fetch(request,{OPERATIONS_DB:db,AFW_OPERATIONS_ENABLED:'true',AFW_OPERATIONS_SIGNING_SECRET:secret})}};
  const producer=createOperationsProducer({now:()=>time,randomId:()=>String(++id),probeFetch:async()=>{probes++;return new Response(null,{status:404});}});
  assert.equal((await producer.run({...env,AFW_OPERATIONS_PRODUCER_ENABLED:'false'})).paused,true);
  for(const extra of [{AFW_REAL_PILOT_VERSION:'main'},{AFW_CANARY_EXPECTED:'guess'},{AFW_OPERATIONS_SIGNING_SECRET:''},{OPERATIONS_RECEIVER:undefined},{OPERATIONS_STATE_DB:undefined}])await assert.rejects(()=>producer.run({...env,...extra}));
  assert.equal(probes,0);
  const result=await producer.run(env);assert.equal(result.ok,true);assert.equal(probes,6);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_events').first()).n,2);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_incidents').first()).n,0);
  const second=await producer.run(env);assert.equal(second.ok,true);assert.ok(second.results.every(x=>x.suppressed));
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_events').first()).n,2);
  await db.prepare('UPDATE operations_probe_state SET delivery_pending=1').run();
  const unavailable=await producer.run({...env,OPERATIONS_RECEIVER:{fetch:async()=>new Response(null,{status:503})}});
  assert.equal(unavailable.ok,false);assert.ok(unavailable.results.every(x=>!x.delivered));
});

test('expiry while delivery is in flight does not finish the lease or start another target',async()=>{
 const {db,sqlite}=operationsDb();sqlite.exec(readFileSync(new URL('../worker/operations/producer-state.sql',import.meta.url),'utf8'));
 const ingress=createOperationsIngress({now:()=>time});let clock=time,probes=0,deliveries=0;
 const env={...vars,OPERATIONS_STATE_DB:db,OPERATIONS_RECEIVER:{fetch:async request=>{
  deliveries++;const response=await ingress.fetch(request,{OPERATIONS_DB:db,AFW_OPERATIONS_ENABLED:'true',AFW_OPERATIONS_SIGNING_SECRET:secret});
  clock=time+60000;return response;
 }}};
 const producer=createOperationsProducer({now:()=>clock,probeFetch:async()=>{probes++;return new Response(null,{status:404});}});
 const result=await producer.run(env);assert.equal(result.paused,true);assert.equal(probes,3);assert.equal(deliveries,1);
 const row=sqlite.prepare('SELECT observed_at,confirmed_at,lease_token FROM operations_probe_state').get();
 assert.equal(row.observed_at,0);assert.equal(row.confirmed_at,0);assert.ok(row.lease_token);
 assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM operations_events').get().n,1);
 assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM operations_probe_state').get().n,1);sqlite.close();
});
