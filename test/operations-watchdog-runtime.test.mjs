import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import worker,{runWatchdog as execute} from '../worker/operations-watchdog/index.mjs';
const now=Date.parse('2026-10-05T01:00:00.000Z');
const runWatchdog=(env,options)=>execute(env,{...options,clock:()=>options.now});
const config={AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+60000).toISOString(),AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_CANARY_VERSION:'aa121311-2d88-4a2f-ad54-b52193cd1c20',AFW_REAL_PILOT_VERSION:'94a3c291-a966-4bcd-987b-d913ed2fcf4d',AFW_CANARY_EXPECTED:'closed',AFW_REAL_PILOT_EXPECTED:'closed'};
function setup(){const store=operationsDb();for(const file of ['producer-state.sql','watchdog-state.sql'])store.sqlite.exec(readFileSync(new URL('../worker/operations/'+file,import.meta.url),'utf8'));return store;}
test('closed and expired watchdogs do not touch storage; fetch never exposes execution',async()=>{
 const db={prepare(){throw Error('unexpected IO');}};
 assert.deepEqual(await runWatchdog({...config,AFW_OPERATIONS_WATCHDOG_ENABLED:'false',OPERATIONS_STATE_DB:db},{now}),{skipped:true});
 assert.deepEqual(await runWatchdog({...config,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now).toISOString(),OPERATIONS_STATE_DB:db},{now}),{skipped:true});
 assert.equal((await worker.fetch(new Request('https://example.test/run'),config)).status,404);
});
test('independent runtime reads missing checkpoints and atomically records deduplicated notices',async()=>{
 const {db,sqlite}=setup(),env={...config,OPERATIONS_STATE_DB:db};
 assert.deepEqual(await runWatchdog(env,{now}),{skipped:false,paused:false,updates:2,notices:2});
 assert.equal((await runWatchdog(env,{now:now+1})).notices,0);
 assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM operations_events').get().count,0);
 assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM operations_probe_state').get().count,0);sqlite.close();
});
test('deliberate producer pause records silence without reading checkpoints or producing notices',async()=>{
 const {db,sqlite}=setup();const prepare=db.prepare;db.prepare=sql=>{assert.ok(!sql.includes('FROM operations_probe_state'));return prepare(sql);};
 assert.deepEqual(await runWatchdog({...config,AFW_OPERATIONS_PRODUCER_ENABLED:'false',OPERATIONS_STATE_DB:db},{now}),{skipped:false,paused:true,updates:2,notices:0});sqlite.close();
});
test('unknown producer state and storage failures fail closed with sanitized errors',async()=>{
 let reads=0;const db={prepare(){reads++;throw Error('private provider details');},async batch(){throw Error('private provider details');}};
 await assert.rejects(()=>runWatchdog({...config,AFW_OPERATIONS_PRODUCER_ENABLED:undefined,OPERATIONS_STATE_DB:db},{now}),/Invalid watchdog runtime configuration/);assert.equal(reads,0);
 await assert.rejects(()=>runWatchdog({...config,OPERATIONS_STATE_DB:db},{now}),error=>error.message==='Watchdog execution unavailable');
});
test('deadline expiring during checkpoint reads prevents transition writes',async()=>{
 const {db,sqlite}=setup();assert.deepEqual(await execute({...config,OPERATIONS_STATE_DB:db},{now,clock:()=>now+60000}),{skipped:true});
 assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM operations_watchdog_state').get().count,0);sqlite.close();
});
