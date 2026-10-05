import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordWatchdogObservation} from '../lib/operations-watchdog-transitions.mjs';
const base=Date.parse('2026-10-05T01:00:00.000Z');
function setup(){const store=operationsDb();store.sqlite.exec(readFileSync(new URL('../worker/operations/watchdog-state.sql',import.meta.url),'utf8'));return store;}
function snapshot(offset,issues=[],paused=false){return {paused,checkedAt:new Date(base+offset).toISOString(),resources:paused?[]:[{resource:'afw_delegated_canary',issues},{resource:'afw_delegated_real_pilot',issues:[]}]};}
const notices=sqlite=>sqlite.prepare('SELECT resource,revision,kind,condition FROM operations_watchdog_outbox ORDER BY revision').all();
const record=(db,value)=>recordWatchdogObservation(db,value,{now:base+100000});
test('one durable notice per transition; repeated health and failures do not flood the queue',async()=>{
 const {db,sqlite}=setup();await record(db,snapshot(0));assert.equal(notices(sqlite).length,0);
 await record(db,snapshot(1,['observation_stale']));await record(db,snapshot(2,['observation_stale']));await record(db,snapshot(2,['observation_stale']));
 assert.equal(notices(sqlite).length,1);assert.equal(notices(sqlite)[0].kind,'attention');
 await record(db,snapshot(3,['delivery_pending']));await record(db,snapshot(4));await record(db,snapshot(5));
 assert.deepEqual(notices(sqlite).map(x=>x.kind),['attention','attention','recovered']);sqlite.close();
});
test('deliberate pause is silent and resume cannot certify recovery from a pre-pause observation',async()=>{
 const {db,sqlite}=setup();await record(db,snapshot(0,['service_failed']));await record(db,snapshot(1,[],true));await record(db,snapshot(2));
 assert.deepEqual(notices(sqlite).map(x=>x.kind),['attention']);
 await record(db,snapshot(3,['service_failed']));assert.equal(notices(sqlite).length,2);sqlite.close();
});
test('out-of-order observations and concurrent duplicates cannot roll state backwards or duplicate notices',async()=>{
 const {db,sqlite}=setup();await record(db,snapshot(10,['delivery_pending']));
 await record(db,snapshot(9));await Promise.all([record(db,snapshot(11,['delivery_pending'])),record(db,snapshot(11,['delivery_pending']))]);
 assert.equal(notices(sqlite).length,1);assert.equal(sqlite.prepare("SELECT condition FROM operations_watchdog_state WHERE resource='afw_delegated_canary'").get().condition,'["delivery_pending"]');sqlite.close();
});
test('failure to enqueue rolls back the state transition; historical incident data is untouched',async()=>{
 const {db,sqlite,failBatchAt}=setup();
 sqlite.prepare('INSERT INTO operations_events(event_id,payload,fingerprint,observed_at,result,received_at) VALUES (?,?,?,?,?,?)').run('historical-synthetic','{}','a'.repeat(64),base-1,'failed',base-1);
 const historical=sqlite.prepare('SELECT * FROM operations_events').all();
 await record(db,snapshot(0));const before=sqlite.prepare('SELECT * FROM operations_watchdog_state').all();
 failBatchAt(1);await assert.rejects(()=>record(db,snapshot(1,['service_failed'])),/Watchdog transition storage unavailable/);
 assert.deepEqual(sqlite.prepare('SELECT * FROM operations_watchdog_state').all(),before);assert.equal(notices(sqlite).length,0);
 assert.deepEqual(sqlite.prepare('SELECT * FROM operations_events').all(),historical);sqlite.close();
});
test('invalid or unsanitized snapshots fail before IO; issue order is canonicalized',async()=>{
 let io=0;const db={prepare(){io++;throw Error('private storage');}};
 for(const value of [snapshot(0,['invented']),{...snapshot(0),private:'secret'},snapshot(100001),{...snapshot(0),resources:[{resource:'other',issues:[]}]}])await assert.rejects(()=>record(db,value),/Invalid watchdog observation/);
 await assert.rejects(()=>recordWatchdogObservation(db,snapshot(0),{now:Number.MAX_SAFE_INTEGER}),/Invalid watchdog observation/);
 assert.equal(io,0);const store=setup();await record(store.db,snapshot(0,['service_failed','delivery_pending']));await record(store.db,snapshot(1,['delivery_pending','service_failed']));assert.equal(notices(store.sqlite).length,1);store.sqlite.close();
});
