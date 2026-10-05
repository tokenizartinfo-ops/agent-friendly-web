import test from 'node:test';
import assert from 'node:assert/strict';
import {readNoticeReviewTarget} from '../lib/operations-review-context.mjs';
import {recordNoticeReview} from '../lib/operations-notice-review.mjs';
import {reviewContextDb} from './fixtures/notice-review-context-db.mjs';
const now=Date.now();
test('review context is closed or unauthorized before storage and invalid selectors reject',async()=>{
 let io=0;const env={OPERATIONS_STATE_DB:{prepare(){io++;}},AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+1000).toISOString()};
 assert.equal(await readNoticeReviewTarget(env,{now}),null);
 assert.equal(await readNoticeReviewTarget({...env,AFW_OPERATIONS_REVIEWS_ENABLED:'false'},{now,authorized:true}),null);
 assert.equal(await readNoticeReviewTarget(env,{now:now+1000,authorized:true}),null);
 await assert.rejects(readNoticeReviewTarget(env,{now,authorized:true,runId:'foreign-selector'}),/Invalid review selector/);assert.equal(io,0);
});
test('context exposes one bounded sanitized snapshot and only defensible decisions',async()=>{
 const s=reviewContextDb(now);try{
  const target=await readNoticeReviewTarget(s.env,{now,authorized:true});
  assert.equal(target.runId,s.runId);assert.equal(target.resource,s.resource);assert.equal(target.snapshot.revision,2);assert.equal(target.snapshot.condition,'paused');assert.equal(target.snapshot.sequence,0);
  assert.deepEqual(target.choices,[{decision:'retain_block',reason:'investigation_required'},{decision:'close_obsolete',reason:'producer_paused'}]);
  assert.equal(Object.hasOwn(target,'operatorId'),false);assert.equal(Object.hasOwn(target,'requestId'),false);
  assert.deepEqual(await readNoticeReviewTarget(s.env,{now,authorized:true,runId:s.runId}),target);
  s.sqlite.prepare('UPDATE operations_watchdog_state SET checked_at=?,changed_at=?').run(now-900001,now-900001);
  assert.deepEqual((await readNoticeReviewTarget(s.env,{now,authorized:true})).choices,[{decision:'retain_block',reason:'investigation_required'}]);
 }finally{s.sqlite.close();}
});
test('provisional review remains actionable, terminal receipt is readable by run but absent from queue',async()=>{
 const s=reviewContextDb(now);try{
  const input={runId:s.runId,requestId:crypto.randomUUID(),decision:'retain_block',reason:'investigation_required',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
  await recordNoticeReview(s.env,input,{now,operatorId:'synthetic-operator',authorized:true});
  assert.equal((await readNoticeReviewTarget(s.env,{now,authorized:true})).snapshot.sequence,1);
  await recordNoticeReview(s.env,{...input,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedSequence:1},{now,operatorId:'synthetic-operator',authorized:true});
  assert.equal(await readNoticeReviewTarget(s.env,{now,authorized:true}),null);
  const receipt=await readNoticeReviewTarget(s.env,{now,authorized:true,runId:s.runId});assert.equal(receipt.lastReview.sequence,2);assert.equal(receipt.choices.length,0);
 }finally{s.sqlite.close();}
});
test('accepted/live attempts are not decisions and an active replacement only allows retain',async()=>{
 const s=reviewContextDb(now);try{
  s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),s.resource,1,now,now+1000,null,null);
  assert.deepEqual((await readNoticeReviewTarget(s.env,{now,authorized:true,runId:s.runId})).choices,[{decision:'retain_block',reason:'investigation_required'}]);
  s.sqlite.prepare("UPDATE operations_notice_reservations SET outcome='accepted' WHERE run_id=?").run(s.runId);
  assert.equal(await readNoticeReviewTarget(s.env,{now,authorized:true}),null);
 }finally{s.sqlite.close();}
});
test('expired unconfirmed attempt explains missing receipt without declaring delivery or repair',async()=>{
 const s=reviewContextDb(now);try{
  s.sqlite.prepare('UPDATE operations_notice_reservations SET outcome=NULL,acknowledged_at=NULL').run();
  s.sqlite.prepare('UPDATE operations_watchdog_state SET revision=1,condition=?').run('["delivery_pending"]');
  const target=await readNoticeReviewTarget(s.env,{now,authorized:true});
  assert.deepEqual(target.choices,[{decision:'retain_block',reason:'investigation_required'},{decision:'close_expired_unconfirmed',reason:'expired_unconfirmed'}]);assert.equal(target.outcome,null);
 }finally{s.sqlite.close();}
});
test('malformed stored snapshot fails generically rather than rendering it as evidence',async()=>{
 const s=reviewContextDb(now);try{
  s.sqlite.prepare('UPDATE operations_watchdog_state SET condition=?').run('<private-stored-data>');
  await assert.rejects(readNoticeReviewTarget(s.env,{now,authorized:true}),error=>error.message==='Review context unavailable');
 }finally{s.sqlite.close();}
});
test('a retained older notice does not hide another unreviewed notice',async()=>{
 const s=reviewContextDb(now);try{
  await recordNoticeReview(s.env,{runId:s.runId,requestId:crypto.randomUUID(),decision:'retain_block',reason:'investigation_required',expectedRevision:2,expectedCondition:'paused',expectedSequence:0},{now,operatorId:'synthetic-operator',authorized:true});
  const resource='afw_delegated_real_pilot',runId=crypto.randomUUID();
  s.sqlite.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').run(resource,now-500,now-500,'paused','healthy',2);
  s.sqlite.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').run(resource,1,'attention','["delivery_pending"]',now-5000);
  s.sqlite.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').run(resource,1,'attention','["delivery_pending"]',now-5000,now-5000);
  s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),resource,1,now-5000,now-1000,now-1000,'superseded');
  assert.equal((await readNoticeReviewTarget(s.env,{now,authorized:true})).runId,runId);
  assert.equal((await readNoticeReviewTarget(s.env,{now,authorized:true,runId:s.runId})).lastReview.decision,'retain_block');
 }finally{s.sqlite.close();}
});
