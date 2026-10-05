import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordNoticeReview} from '../lib/operations-notice-review.mjs';
const now=1791170000000,runId=crypto.randomUUID(),requestId=crypto.randomUUID();
function setup(){const s=operationsDb();for(const name of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8'));s.sqlite.exec(`INSERT INTO operations_watchdog_state VALUES ('afw_delegated_canary',${now},${now},'paused','healthy',2); INSERT INTO operations_watchdog_outbox VALUES ('afw_delegated_canary',1,'attention','["delivery_pending"]',${now-10000}); INSERT INTO operations_watchdog_inbox VALUES ('afw_delegated_canary',1,'attention','["delivery_pending"]',${now-10000},${now-10000});`);s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),'afw_delegated_canary',1,now-10000,now-1000,now-1000,'superseded');return {...s,env:{OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+600000).toISOString()}};}
const input=()=>({runId,requestId,decision:'close_obsolete',reason:'producer_paused',expectedRevision:2,expectedCondition:'paused',expectedSequence:0}),context={authorized:true,operatorId:'operator',now};
test('review is immutable, retries stable, conflicting identities rejected and outcome preserved',async()=>{const s=setup();const a=await recordNoticeReview(s.env,input(),context);assert.equal(a.decision,'close_obsolete');assert.deepEqual(await recordNoticeReview(s.env,input(),context),a);await assert.rejects(()=>recordNoticeReview(s.env,{...input(),requestId:crypto.randomUUID()},context),/Review conflict/);assert.equal(s.sqlite.prepare('SELECT outcome FROM operations_notice_reservations').get().outcome,'superseded');s.sqlite.close();});
test('closed and unauthorized gates do not touch storage',async()=>{let io=0;const env={AFW_OPERATIONS_REVIEWS_ENABLED:'false',OPERATIONS_STATE_DB:{prepare(){io++;}}};assert.equal(await recordNoticeReview(env,input(),context),null);assert.equal(await recordNoticeReview({...env,AFW_OPERATIONS_REVIEWS_ENABLED:'true'},input(),{...context,authorized:false}),null);assert.equal(io,0);});
test('accepted and live pending reject reviews; atomic state fence rejects changed snapshot',async()=>{const s=setup();s.sqlite.exec("UPDATE operations_notice_reservations SET outcome='accepted'");assert.equal(await recordNoticeReview(s.env,input(),context),null);s.sqlite.exec(`UPDATE operations_notice_reservations SET outcome=NULL,acknowledged_at=NULL,expires_at=${now+1000}`);assert.equal(await recordNoticeReview(s.env,input(),context),null);s.sqlite.exec(`UPDATE operations_notice_reservations SET expires_at=${now-1000}`);assert.equal(await recordNoticeReview(s.env,{...input(),expectedRevision:3},context),null);assert.equal((await recordNoticeReview(s.env,{...input(),decision:'close_expired_unconfirmed',reason:'expired_unconfirmed'},context)).decision,'close_expired_unconfirmed');s.sqlite.close();});
test('malformed UUID, pairs, clock and unexpected keys fail generically',async()=>{for(const patch of [{runId:[runId]},{reason:'free text'},{expectedRevision:0},{extra:true}])await assert.rejects(()=>recordNoticeReview({}, {...input(),...patch},context),/Invalid review input/);await assert.rejects(()=>recordNoticeReview({},input(),{...context,now:NaN}),/Invalid review input/);});
import {listCurrentNotices,reserveNotice,listNoticeReceipts,acknowledgeNotice} from '../lib/operations-notice-reservation.mjs';
import {runNoticeCycle} from '../lib/operations-notice-cycle.mjs';
test('closed review suppresses old identity in list and claim and exposes sanitized receipt',async()=>{const s=setup();s.sqlite.exec(`UPDATE operations_notice_reservations SET outcome=NULL,acknowledged_at=NULL; UPDATE operations_watchdog_state SET revision=1,condition='["delivery_pending"]',changed_at=${now-10000}`);s.env={...s.env,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true'};await recordNoticeReview(s.env,{...input(),decision:'close_expired_unconfirmed',reason:'expired_unconfirmed',expectedRevision:1,expectedCondition:'["delivery_pending"]'},context);assert.equal((await listCurrentNotices(s.env,{now})).length,0);assert.equal(await reserveNotice(s.env,{resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID(),now}),null);const receipts=await listNoticeReceipts(s.env,{now});assert.deepEqual(receipts[0].review,{decision:'close_expired_unconfirmed',reason:'expired_unconfirmed',reviewedAt:now});s.sqlite.close();});
test('cycle ignores closed receipts without ACK and retain remains blocked',async()=>{const receipt={outcome:'superseded',reservation:{runId},review:{decision:'close_obsolete',reason:'producer_paused',reviewedAt:now}};let acks=0;const client={listNoticeReceipts:async()=>[receipt],listNotices:async()=>[],ackNotice:async()=>{acks++;}};assert.deepEqual(await runNoticeCycle(client,{now:()=>now}),{status:'idle'});receipt.review={decision:'retain_block',reason:'investigation_required',reviewedAt:now};assert.equal((await runNoticeCycle(client,{now:()=>now})).status,'review_required');assert.equal(acks,0);});
test('append-only retain can close with CAS; concurrent decision loses and terminal cannot reopen',async()=>{const s=setup();const first={...input(),decision:'retain_block',reason:'investigation_required'};assert.ok(await recordNoticeReview(s.env,first,context));const close={...input(),requestId:crypto.randomUUID(),expectedSequence:1};assert.ok(await recordNoticeReview(s.env,close,context));await assert.rejects(()=>recordNoticeReview(s.env,{...close,requestId:crypto.randomUUID()},context),/Review conflict/);await assert.rejects(()=>recordNoticeReview(s.env,{...first,requestId:crypto.randomUUID(),expectedSequence:2},context),/Review conflict/);assert.deepEqual(await recordNoticeReview(s.env,first,context),{sequence:1,decision:'retain_block',reason:'investigation_required',reviewedAt:now});assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,2);s.sqlite.close();});
test('state and ACK changes immediately before INSERT fence review atomically',async()=>{for(const change of ["UPDATE operations_watchdog_state SET revision=3","UPDATE operations_notice_reservations SET outcome='accepted'"]){const s=setup();const env={...s.env,OPERATIONS_STATE_DB:{...s.db,batch:async q=>{s.sqlite.exec(change);return s.db.batch(q);}}};assert.equal(await recordNoticeReview(env,input(),context),null);assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,0);s.sqlite.close();}});
test('two simultaneous provisional decisions use CAS and only one appends',async()=>{const s=setup();const outcomes=await Promise.allSettled([recordNoticeReview(s.env,{...input(),decision:'retain_block',reason:'investigation_required'},context),recordNoticeReview(s.env,{...input(),requestId:crypto.randomUUID(),decision:'retain_block',reason:'investigation_required'},context)]);assert.equal(outcomes.filter(x=>x.status==='fulfilled').length,1);assert.equal(outcomes.filter(x=>x.status==='rejected'&&x.reason.message==='Review conflict').length,1);assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,1);s.sqlite.close();});
test('requestId cannot replay across runs or different snapshots; future state blocks',async()=>{const s=setup();await recordNoticeReview(s.env,input(),context);await assert.rejects(()=>recordNoticeReview(s.env,{...input(),runId:crypto.randomUUID()},context),/Review conflict/);await assert.rejects(()=>recordNoticeReview(s.env,{...input(),expectedRevision:3},context),/Review conflict/);s.sqlite.close();const t=setup();t.sqlite.exec(`UPDATE operations_watchdog_state SET checked_at=${now+1}`);assert.equal(await recordNoticeReview(t.env,input(),context),null);t.sqlite.close();});
test('closed old revision permits later notice while preserving three-per-day budget',async()=>{const s=setup();await recordNoticeReview(s.env,input(),context);s.env={...s.env,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true'};s.sqlite.exec(`UPDATE operations_watchdog_state SET revision=3,condition='healthy'; INSERT INTO operations_watchdog_outbox VALUES ('afw_delegated_canary',3,'recovered','healthy',${now}); INSERT INTO operations_watchdog_inbox VALUES ('afw_delegated_canary',3,'recovered','healthy',${now},${now});`);assert.equal((await listCurrentNotices(s.env,{now}))[0].revision,3);const a=await reserveNotice(s.env,{resource:'afw_delegated_canary',revision:3,requestId:crypto.randomUUID(),now});assert.ok(a);s.sqlite.prepare('UPDATE operations_notice_reservations SET expires_at=? WHERE run_id=?').run(now+1,a.runId);s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'afw_delegated_canary',1,now-10000,now-1000,now-1000,'superseded');assert.equal(await reserveNotice(s.env,{resource:'afw_delegated_canary',revision:3,requestId:crypto.randomUUID(),now:now+2}),null);assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reservations').get().n,3);s.sqlite.close();});
test('journal rejects history edits and expired window avoids IO',async()=>{const s=setup();await recordNoticeReview(s.env,input(),context);assert.throws(()=>s.sqlite.exec("UPDATE operations_notice_reviews SET reason='obsolete_revision'"),/Immutable notice review/);assert.throws(()=>s.sqlite.exec('DELETE FROM operations_notice_reviews'),/Immutable notice review/);let io=0;assert.equal(await recordNoticeReview({...s.env,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now).toISOString(),OPERATIONS_STATE_DB:{prepare(){io++;}}},input(),context),null);assert.equal(io,0);s.sqlite.close();});

function expiredCurrent(){
 const s=setup();
 s.sqlite.exec(`UPDATE operations_notice_reservations SET outcome=NULL,acknowledged_at=NULL; UPDATE operations_watchdog_state SET revision=1,condition='["delivery_pending"]',changed_at=${now-10000}`);
 s.env={...s.env,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true'};
 return s;
}
const expiredReview=()=>({...input(),decision:'close_expired_unconfirmed',reason:'expired_unconfirmed',expectedRevision:1,expectedCondition:'["delivery_pending"]'});
const claimInput=()=>({resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID(),now});
test('live replacement lease blocks closing an expired receipt, while retain and later close preserve budget',async()=>{
 const s=expiredCurrent(),claim=claimInput();
 const b=await reserveNotice(s.env,claim);assert.ok(b);
 const before=s.sqlite.prepare('SELECT * FROM operations_notice_reservations ORDER BY run_id').all();
 assert.equal(await recordNoticeReview(s.env,expiredReview(),context),null);
 assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,0);
 assert.ok(await recordNoticeReview(s.env,{...expiredReview(),decision:'retain_block',reason:'investigation_required'},context));
 assert.deepEqual(s.sqlite.prepare('SELECT * FROM operations_notice_reservations ORDER BY run_id').all(),before);
 assert.deepEqual(await reserveNotice(s.env,claim),b);
 assert.ok(await recordNoticeReview(s.env,{...expiredReview(),requestId:crypto.randomUUID(),expectedSequence:1},{...context,now:b.expiresAt}));
 assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reservations').get().n,2);
 s.sqlite.close();
});
test('claim and expired close interleavings allow exactly one winner at their SQL fence',async()=>{
 for(const first of ['claim','review','simultaneous-claim','simultaneous-review']){
  const s=expiredCurrent();let b,review;
  if(first==='claim'){
   const env={...s.env,OPERATIONS_STATE_DB:{...s.db,batch:async statements=>{b=await reserveNotice(s.env,claimInput());return s.db.batch(statements);}}};
   review=await recordNoticeReview(env,expiredReview(),context);
  }else if(first==='review'){
   const env={...s.env,OPERATIONS_STATE_DB:{...s.db,batch:async statements=>{review=await recordNoticeReview(s.env,expiredReview(),context);return s.db.batch(statements);}}};
   b=await reserveNotice(env,claimInput());
  }else if(first==='simultaneous-claim'){
   [b,review]=await Promise.all([reserveNotice(s.env,claimInput()),recordNoticeReview(s.env,expiredReview(),context)]);
  }else{
   [review,b]=await Promise.all([recordNoticeReview(s.env,expiredReview(),context),reserveNotice(s.env,claimInput())]);
  }
  assert.equal(Number(Boolean(b))+Number(Boolean(review)),1,first);
  assert.equal(s.sqlite.prepare('SELECT outcome FROM operations_notice_reservations WHERE run_id=?').get(runId).outcome,null);
  assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reservations').get().n,b?2:1);
  s.sqlite.close();
 }
});
test('defensive closed fence denies restoring and ACKing pending B without changing historical ACKs',async()=>{
 for(const historical of [null,'accepted','superseded']){
  const s=expiredCurrent(),claim=claimInput(),b=await reserveNotice(s.env,claim);assert.ok(b);
  if(historical==='superseded')s.sqlite.exec("UPDATE operations_watchdog_state SET condition='paused'");
  if(historical)assert.equal(await acknowledgeNotice(s.env,b.runId,{now}),historical);
  if(historical==='superseded')s.sqlite.exec("UPDATE operations_watchdog_state SET condition='[\"delivery_pending\"]'");
  // Simulate a pre-fix inconsistent journal; the helper must never create it now.
  s.sqlite.prepare('INSERT INTO operations_notice_reviews VALUES (?,?,?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),1,0,'operator',now,'close_expired_unconfirmed','expired_unconfirmed',1,'["delivery_pending"]');
  const before=s.sqlite.prepare('SELECT * FROM operations_notice_reservations ORDER BY run_id').all();
  assert.equal(await reserveNotice(s.env,claim),null);
  assert.equal(await acknowledgeNotice(s.env,b.runId,{now}),historical??null);
  assert.deepEqual(s.sqlite.prepare('SELECT * FROM operations_notice_reservations ORDER BY run_id').all(),before);
  assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reservations').get().n,2);
  if(!historical){
   const result=await runNoticeCycle({listNoticeReceipts:()=>listNoticeReceipts(s.env,{now}),ackNotice:id=>acknowledgeNotice(s.env,id,{now})},{now:()=>now});
   assert.equal(result.status,'review_required');
   assert.equal(s.sqlite.prepare('SELECT outcome FROM operations_notice_reservations WHERE run_id=?').get(b.runId).outcome,null);
  }
  s.sqlite.close();
 }
});
