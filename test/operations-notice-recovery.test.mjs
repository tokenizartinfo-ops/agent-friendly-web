import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordWatchdogObservation} from '../lib/operations-watchdog-transitions.mjs';
import {admitWatchdogNotices} from '../lib/operations-watchdog-inbox.mjs';
import * as notices from '../lib/operations-notice-reservation.mjs';
const now=Date.parse('2026-10-05T15:00:00Z');
async function setup(){const s=operationsDb();for(const n of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${n}.sql`,import.meta.url),'utf8'));const env={OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+600000).toISOString()};await recordWatchdogObservation(s.db,{paused:false,checkedAt:new Date(now).toISOString(),resources:[{resource:'afw_delegated_canary',issues:['delivery_pending']},{resource:'afw_delegated_real_pilot',issues:[]}]},{now});await admitWatchdogNotices(env,{now});return {...s,env};}
test('durable receipt recovers a lost reservation and ACK including its original notice',async()=>{
 const s=await setup();try{
  const reservation=await notices.reserveNotice(s.env,{resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID(),now});
  const [receipt]=await notices.listNoticeReceipts(s.env,{now});
  assert.deepEqual(receipt.reservation,reservation);assert.equal(receipt.outcome,null);assert.equal(receipt.notice.condition,'["delivery_pending"]');
  await notices.acknowledgeNotice(s.env,reservation.runId,{now});
  assert.equal((await notices.listNoticeReceipts(s.env,{now}))[0].outcome,'accepted');
  assert.equal(s.sqlite.prepare('SELECT COUNT(*) AS n FROM operations_notice_reservations').get().n,1);
 }finally{s.sqlite.close();}
});
test('receipt recovery preserves expired history, denies closed IO and sanitizes poisoned metadata',async()=>{
 const s=await setup();try{
  await notices.reserveNotice(s.env,{resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID(),now});
  assert.equal((await notices.listNoticeReceipts(s.env,{now:now+300001}))[0].outcome,null);
  let io=0;assert.deepEqual(await notices.listNoticeReceipts({...s.env,AFW_OPERATIONS_NOTICES_ENABLED:'false',OPERATIONS_STATE_DB:{prepare(){io++;throw Error('secret');}}},{now}),[]);assert.equal(io,0);
  s.sqlite.exec("UPDATE operations_watchdog_inbox SET condition='[\"private-detail\"]'");
  await assert.rejects(()=>notices.listNoticeReceipts(s.env,{now}),{message:'Notice reservation storage unavailable'});
 }finally{s.sqlite.close();}
});
