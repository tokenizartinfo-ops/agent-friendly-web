import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';

test('workerd/D1 preserves notice identity and fences ACK after a real state transition',async()=>{
 const base=Date.now();
 // Test-only harness: no deployed route, identity assertion or external delivery.
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {recordWatchdogObservation} from './lib/operations-watchdog-transitions.mjs';
 import {admitWatchdogNotices} from './lib/operations-watchdog-inbox.mjs';
 import {reserveNotice,acknowledgeNotice} from './lib/operations-notice-reservation.mjs';
 let time=${base};
 export default {async fetch(request,binding){
  const now=++time,path=new URL(request.url).pathname;
  const env={OPERATIONS_STATE_DB:binding.DB,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(${base}+600000).toISOString()};
  if(['/fixture','/changed','/pause'].includes(path)){
   await recordWatchdogObservation(binding.DB,{paused:path==='/pause',checkedAt:new Date(now).toISOString(),resources:path==='/pause'?[]:[{resource:'afw_delegated_canary',issues:[path==='/changed'?'observation_stale':'delivery_pending']},{resource:'afw_delegated_real_pilot',issues:[]}]},{now});
   return Response.json(await admitWatchdogNotices(env,{now}));
  }
  const body=await request.json();
  if(path==='/closed')env.AFW_OPERATIONS_NOTICES_ENABLED='false';
  if(path==='/reserve'||path==='/closed')return Response.json(await reserveNotice(env,{resource:'afw_delegated_canary',revision:body.revision,requestId:body.requestId,now}));
  if(path==='/ack')return Response.json(await acknowledgeNotice(env,body.runId,{now}));
  return new Response(null,{status:404});
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'notice-contract-test'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of ['watchdog-state','watchdog-inbox','notice-reservations']){
   const sql=readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8').replace(/--[^\n]*/g,'');
   for(const statement of sql.split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(statement).run();
  }
  const call=async(path,body)=>{const r=await runtime.dispatchFetch('https://notice-contract.invalid'+path,body?{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
  assert.equal((await call('/fixture')).admitted,1);
  const first={revision:1,requestId:crypto.randomUUID()},reservation=await call('/reserve',first);
  assert.ok(reservation.runId);assert.deepEqual(await call('/reserve',first),reservation);
  assert.equal(await call('/ack',{runId:reservation.runId}),'accepted');assert.equal(await call('/ack',{runId:reservation.runId}),'accepted');
  assert.equal((await call('/changed')).admitted,1);
  const second=await call('/reserve',{revision:2,requestId:crypto.randomUUID()});assert.ok(second.runId);
  await call('/pause');assert.equal(await call('/ack',{runId:second.runId}),'superseded');assert.equal(await call('/ack',{runId:second.runId}),'superseded');
  assert.equal(await call('/closed',{revision:2,requestId:crypto.randomUUID()}),null);
  const {results}=await db.prepare('SELECT outcome FROM operations_notice_reservations ORDER BY reserved_at').all();assert.deepEqual(results,[{outcome:'accepted'},{outcome:'superseded'}]);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM operations_watchdog_outbox').first()).n,2);
 }finally{await runtime.dispose();}
});
