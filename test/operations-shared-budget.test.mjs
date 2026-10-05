import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordSignal} from '../lib/operations-ledger.mjs';
import {recordWatchdogObservation} from '../lib/operations-watchdog-transitions.mjs';
import {admitWatchdogNotices} from '../lib/operations-watchdog-inbox.mjs';
import {reserveNotice,acknowledgeNotice} from '../lib/operations-notice-reservation.mjs';
import {reserveInvestigation,completeInvestigation} from '../lib/operations-consumer.mjs';
const now=Date.parse('2026-10-05T12:00:00Z');
async function setup(){
 const s=operationsDb();
 for(const name of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8'));
 const env={OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+600000).toISOString()};
 await recordWatchdogObservation(s.db,{paused:false,checkedAt:new Date(now).toISOString(),resources:[{resource:'afw_delegated_canary',issues:['delivery_pending']},{resource:'afw_delegated_real_pilot',issues:[]}]},{now});
 await admitWatchdogNotices(env,{now});
 const incident=await recordSignal(s.db,{eventId:crypto.randomUUID(),check:'public_home',resource:'afw_public_web',version:crypto.randomUUID(),observedAt:new Date(now).toISOString(),result:'failed'},now);
 return {...s,env,incident};
}
const notice=(s,id=crypto.randomUUID())=>reserveNotice(s.env,{resource:'afw_delegated_canary',revision:1,requestId:id,now});
const investigation=(s,id=crypto.randomUUID())=>reserveInvestigation(s.db,s.incident.fingerprint,now,id,{sharedNoticeBudget:true});
test('notice and investigation serialize in either order and retries retain their receipt',async()=>{
 for(const first of ['notice','investigation']){
  const s=await setup(),id=crypto.randomUUID();
  try{
   const run=await (first==='notice'?notice(s,id):investigation(s,id));assert.ok(run);
   assert.equal(await (first==='notice'?investigation(s):notice(s)),null);
   assert.equal((await (first==='notice'?notice(s,id):investigation(s,id))).runId,run.runId);
   await (first==='notice'?acknowledgeNotice(s.env,run.runId,{now}):completeInvestigation(s.db,run.runId,'diagnosed',now));
   assert.ok(await (first==='notice'?investigation(s):notice(s)));
  }finally{s.sqlite.close();}
 }
});
test('mixed expired reservations exhaust the same rolling daily budget',async()=>{
 for(const target of ['notice','investigation']){
  const s=await setup();
  try{
   for(let i=0;i<2;i++)s.sqlite.prepare('INSERT INTO operations_notice_reservations(run_id,request_id,resource,revision,reserved_at,expires_at) VALUES (?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'afw_delegated_canary',1,now-2000,now-1000);
   const run=await investigation(s);assert.ok(run);await completeInvestigation(s.db,run.runId,'diagnosed',now);
   s.sqlite.exec("UPDATE operations_incidents SET phase='pending'");
   assert.equal(await (target==='notice'?notice(s):investigation(s)),null);
   assert.equal(s.sqlite.prepare('SELECT attempts FROM operations_incidents').get().attempts,1);
  }finally{s.sqlite.close();}
 }
});
test('simultaneous channels reserve only one task and missing shared storage fails closed',async()=>{
 const s=await setup();try{
  const runs=await Promise.all([notice(s),investigation(s)]);assert.equal(runs.filter(Boolean).length,1);
  assert.equal(s.sqlite.prepare('SELECT (SELECT COUNT(*) FROM operations_notice_reservations)+(SELECT COUNT(*) FROM operations_investigations) AS n').get().n,1);
 }finally{s.sqlite.close();}
 const missing=await setup();try{
  missing.sqlite.exec('DROP TABLE operations_notice_reservations');
  await assert.rejects(()=>investigation(missing));
  assert.equal(missing.sqlite.prepare('SELECT attempts FROM operations_incidents').get().attempts,0);
 }finally{missing.sqlite.close();}
});
