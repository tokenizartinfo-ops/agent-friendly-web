import test from 'node:test';
import assert from 'node:assert/strict';
import {observeDelegatedService} from '../lib/delegated-operations-observer.mjs';
import {recordSignal} from '../lib/operations-ledger.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';

test('delegated probe records grouped failure and verified recovery without private content',async()=>{
  const {db}=operationsDb();let time=Date.parse('2026-10-04T15:00:00Z');
  const base={service:'canary',expected:'closed',version:'aa121311-2d88-4a2f-ad54-b52193cd1c20',now:()=>time};
  const failure=async()=>new Response('private body',{status:503});
  for(const eventId of ['first','second']) {
    const {report,signal}=await observeDelegatedService({...base,eventId,fetchImpl:failure});
    assert.equal(report.ok,false);assert.equal(signal.resource,'afw_delegated_canary');
    assert.ok(!JSON.stringify(signal).includes('private'));
    await recordSignal(db,signal,time);time++;
  }
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_incidents').first()).n,1);
  assert.equal((await db.prepare('SELECT failures FROM operations_incidents').first()).failures,2);
  const {signal}=await observeDelegatedService({...base,eventId:'recovery',fetchImpl:async()=>new Response(null,{status:404})});
  await recordSignal(db,signal,time);
  assert.equal((await db.prepare('SELECT state,phase FROM operations_incidents').first()).state,'recovered');
  assert.equal((await db.prepare('SELECT phase FROM operations_incidents').first()).phase,'closed');
  let calls=0;
  for(const extra of [{version:'main'},{service:'atelier'},{eventId:'https://external.invalid'},{expected:'guess'}])
    await assert.rejects(()=>observeDelegatedService({...base,eventId:'invalid',...extra,fetchImpl:async()=>{calls++;return new Response(null,{status:404});}}));
  assert.equal(calls,0);
});
