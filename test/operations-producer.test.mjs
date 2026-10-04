import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationsProducer} from '../lib/operations-producer.mjs';
import {createOperationsIngress} from '../lib/operations-ingress.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {readFileSync} from 'node:fs';

const time=Date.parse('2026-10-04T16:00:00Z'),secret='synthetic-only-producer-secret-32-characters';
const vars={AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_SIGNING_SECRET:secret,AFW_CANARY_VERSION:'aa121311-2d88-4a2f-ad54-b52193cd1c20',AFW_REAL_PILOT_VERSION:'94a3c291-a966-4bcd-987b-d913ed2fcf4d',AFW_CANARY_EXPECTED:'closed',AFW_REAL_PILOT_EXPECTED:'closed'};
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
