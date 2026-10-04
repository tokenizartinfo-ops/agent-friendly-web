import test from 'node:test';
import assert from 'node:assert/strict';
import {readProducerWatchdog} from '../lib/operations-watchdog.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {readFileSync} from 'node:fs';
import {createProducerState} from '../lib/operations-producer-state.mjs';
const now=Date.parse('2026-10-04T17:00:00Z');
const env={AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_CANARY_VERSION:'aa121311-2d88-4a2f-ad54-b52193cd1c20',AFW_REAL_PILOT_VERSION:'94a3c291-a966-4bcd-987b-d913ed2fcf4d',AFW_CANARY_EXPECTED:'closed',AFW_REAL_PILOT_EXPECTED:'closed'};
function database(rows){let reads=0;return {get reads(){return reads;},prepare(sql){assert.ok(!/INSERT|UPDATE|DELETE/.test(sql));assert.ok(!sql.includes('lease_token'));return {bind(resource){return {async first(){reads++;return rows.find(x=>x.resource===resource)??null;}};}};}};}
function row(resource,version,extra={}){return {resource,version,expected:'closed',observed_at:now-1000,confirmed_at:now-1000,last_result:'recovered',delivery_pending:0,...extra};}
test('paused producer does not query storage or invent a silence alert',async()=>{const db=database([]);assert.deepEqual(await readProducerWatchdog({...env,AFW_OPERATIONS_PRODUCER_ENABLED:'false',OPERATIONS_STATE_DB:db},{now}),{paused:true,checkedAt:new Date(now).toISOString(),resources:[]});assert.equal(db.reads,0);});
test('watchdog distinguishes missing, silent and pending delivery without exposing raw rows',async()=>{
 const db=database([row('afw_delegated_canary',env.AFW_CANARY_VERSION,{observed_at:now-900001,delivery_pending:1,private:'do not expose'})]);
 const result=await readProducerWatchdog({...env,OPERATIONS_STATE_DB:db},{now});assert.equal(db.reads,2);
 assert.deepEqual(result.resources[0].issues,['observation_stale','delivery_pending']);assert.deepEqual(result.resources[1].issues,['checkpoint_missing']);assert.ok(!JSON.stringify(result).includes('do not expose'));
});
test('healthy recently confirmed rows are not alerts; invalid clocks or version changes are actionable',async()=>{
 const rows=[row('afw_delegated_canary',env.AFW_CANARY_VERSION),row('afw_delegated_real_pilot',env.AFW_REAL_PILOT_VERSION)];
 assert.ok((await readProducerWatchdog({...env,OPERATIONS_STATE_DB:database(rows)},{now})).resources.every(x=>x.issues.length===0));
 rows[0].observed_at=now+1;rows[1].version=env.AFW_CANARY_VERSION;
 const result=await readProducerWatchdog({...env,OPERATIONS_STATE_DB:database(rows)},{now});assert.deepEqual(result.resources[0].issues,['clock_invalid']);assert.deepEqual(result.resources[1].issues,['configuration_changed']);
 await assert.rejects(()=>readProducerWatchdog({...env,OPERATIONS_STATE_DB:database(rows)},{now:NaN}));
});
test('unconfirmed or failed observations remain distinct from missing producer activity',async()=>{
 const rows=[row('afw_delegated_canary',env.AFW_CANARY_VERSION,{confirmed_at:now-900001}),row('afw_delegated_real_pilot',env.AFW_REAL_PILOT_VERSION,{last_result:'failed'})];
 const result=await readProducerWatchdog({...env,OPERATIONS_STATE_DB:database(rows)},{now});assert.deepEqual(result.resources[0].issues,['delivery_stale']);assert.deepEqual(result.resources[1].issues,['service_failed']);
});
test('invalid configuration fails before reading, and storage failures stay sanitized',async()=>{
 const db=database([]);await assert.rejects(()=>readProducerWatchdog({...env,AFW_CANARY_VERSION:'private-invalid',OPERATIONS_STATE_DB:db},{now}),/Invalid watchdog configuration/);assert.equal(db.reads,0);
 const broken={prepare(){throw Error('private storage credentials');}};
 await assert.rejects(()=>readProducerWatchdog({...env,OPERATIONS_STATE_DB:broken},{now}),error=>error.message==='Watchdog storage unavailable');
 const corrupted=database([row('afw_delegated_canary',env.AFW_CANARY_VERSION,{confirmed_at:NaN})]);
 assert.deepEqual((await readProducerWatchdog({...env,OPERATIONS_STATE_DB:corrupted},{now})).resources[0].issues,['checkpoint_invalid']);
});
test('watchdog reads the actual state schema without changing checkpoints or incidents',async()=>{
 const {db,sqlite}=operationsDb();sqlite.exec(readFileSync(new URL('../worker/operations/producer-state.sql',import.meta.url),'utf8'));
 const state=createProducerState(db),target={resource:'afw_delegated_canary',version:env.AFW_CANARY_VERSION,expected:'closed'};
 const lease=await state.claim(target,now-1000);await state.finish(lease,{result:'recovered',confirmed:true},now-500);
 const before=sqlite.prepare('SELECT total_changes() AS changes').get().changes;
 const result=await readProducerWatchdog({...env,OPERATIONS_STATE_DB:db},{now});
 assert.deepEqual(result.resources[0].issues,[]);assert.deepEqual(result.resources[1].issues,['checkpoint_missing']);
 assert.equal(sqlite.prepare('SELECT total_changes() AS changes').get().changes,before);sqlite.close();
});
