import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordWatchdogObservation} from '../lib/operations-watchdog-transitions.mjs';
import {admitWatchdogNotices} from '../lib/operations-watchdog-inbox.mjs';
const now=Date.parse('2026-10-05T02:00:00.000Z');
function setup(){const store=operationsDb();for(const name of ['watchdog-state','watchdog-inbox'])store.sqlite.exec(readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8'));return store;}
const env=db=>({OPERATIONS_STATE_DB:db,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+60000).toISOString()});
async function record(db,offset,issues=[],paused=false){await recordWatchdogObservation(db,{paused,checkedAt:new Date(now+offset).toISOString(),resources:paused?[]:[{resource:'afw_delegated_canary',issues},{resource:'afw_delegated_real_pilot',issues:[]}]},{now});}
const rows=sqlite=>sqlite.prepare('SELECT * FROM operations_watchdog_inbox').all();
test('only current notices enter inbox; concurrent retries dedupe and preserve outbox history',async()=>{
 const {db,sqlite}=setup();await record(db,-3,['delivery_pending']);await record(db,-2,['observation_stale']);
 const results=await Promise.all([admitWatchdogNotices(env(db),{now}),admitWatchdogNotices(env(db),{now})]);
 assert.equal(results.reduce((n,x)=>n+x.admitted,0),1);assert.equal(rows(sqlite)[0].revision,2);assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM operations_watchdog_outbox').get().n,2);sqlite.close();
});
test('pause suppresses historical notices and healthy recovery admits its own current revision only',async()=>{
 const {db,sqlite}=setup();await record(db,-4,['delivery_pending']);await record(db,-3,[],true);assert.equal((await admitWatchdogNotices(env(db),{now})).admitted,0);
 await record(db,-2,['delivery_stale']);await record(db,-1);assert.equal((await admitWatchdogNotices(env(db),{now})).admitted,1);assert.equal(rows(sqlite)[0].kind,'recovered');assert.equal(rows(sqlite)[0].revision,4);sqlite.close();
});
test('stale/future state and mismatched or invalid outbox conditions are not admitted',async()=>{
 for(const change of ["UPDATE operations_watchdog_state SET checked_at=checked_at-1000000", "UPDATE operations_watchdog_state SET checked_at=checked_at+1000000", "UPDATE operations_watchdog_outbox SET condition='[\"invented\"]'", "UPDATE operations_watchdog_state SET condition='[\"invented\"]';UPDATE operations_watchdog_outbox SET condition='[\"invented\"]'", "UPDATE operations_watchdog_outbox SET observed_at=observed_at-1"]){const {db,sqlite}=setup();await record(db,-1,['delivery_pending']);sqlite.exec(change);assert.equal((await admitWatchdogNotices(env(db),{now})).admitted,0);sqlite.close();}
});
test('closed flags or invalid/expired deadline perform no IO; invalid clock fails closed',async()=>{
 let io=0;const db={prepare(){io++;throw Error('private value');},batch(){io++;}};
 for(const change of [{AFW_OPERATIONS_NOTICES_ENABLED:'false'},{AFW_OPERATIONS_PRODUCER_ENABLED:'false'},{AFW_OPERATIONS_WATCHDOG_ENABLED:'false'},{AFW_OPERATIONS_WINDOW_EXPIRES_AT:undefined},{AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now).toISOString()}])assert.deepEqual(await admitWatchdogNotices({...env(db),...change},{now}),{skipped:true,admitted:0});
 await assert.rejects(()=>admitWatchdogNotices(env(db),{now:Number.MAX_SAFE_INTEGER}),/Invalid notice clock/);assert.equal(io,0);
});
test('storage failure exposes no private error and creates no inbox row',async()=>{
 const {db,sqlite,failBatchAt}=setup();await record(db,-1,['delivery_pending']);failBatchAt(0);await assert.rejects(()=>admitWatchdogNotices(env(db),{now}),/^Error: Watchdog notice storage unavailable$/);assert.equal(rows(sqlite).length,0);sqlite.close();
});
test('a pause between statement preparation and execution fences admission atomically',async()=>{
 const {db,sqlite}=setup();await record(db,-1,['delivery_pending']);
 const racing={...db,batch:async statements=>{await record(db,0,[],true);return db.batch(statements);}};
 assert.equal((await admitWatchdogNotices(env(racing),{now})).admitted,0);assert.equal(rows(sqlite).length,0);sqlite.close();
});
test('malformed, duplicate or noncanonical conditions fail closed even when state and outbox match',async()=>{
 for(const condition of ['not-json','[]','["delivery_pending","delivery_pending"]','["service_failed","delivery_pending"]','[1]','[null]','{}']){
  const {db,sqlite}=setup();await record(db,-1,['delivery_pending']);sqlite.prepare('UPDATE operations_watchdog_state SET condition=?').run(condition);sqlite.prepare('UPDATE operations_watchdog_outbox SET condition=?').run(condition);
  assert.equal((await admitWatchdogNotices(env(db),{now})).admitted,0);sqlite.close();
 }
});
