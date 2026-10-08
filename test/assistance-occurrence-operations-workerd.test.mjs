import test from 'node:test';
import assert from 'node:assert/strict';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {manifest,observation,schemas,sqlStatements} from './fixtures/occurrence-operations.mjs';
const implementation=await import('../lib/assistance-occurrence-operations.mjs').catch(()=>({}));
test('native internal operations share atomic run/journal, budget rollback and exact superseded outcome',async()=>{
 assert.equal(typeof implementation.createOccurrenceOperations,'function');
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'native-real-occurrence-operations',OTHER:'native-real-occurrence-operations'}}));
 try{
  const db=await runtime.getD1Database('DB'),other=await runtime.getD1Database('OTHER');
  for(const name of schemas)for(const sql of sqlStatements(readFileSync('worker/operations/'+name+'.sql','utf8')))await db.prepare(sql).run();
  const m=manifest();
  const insertSignal=async signal=>db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(signal.eventId,signal.projectRef,signal.revision,signal.kind,signal.topic,signal.observedAt,Date.now()).run();
  await insertSignal(m.signal);
  const make=(database,model=m)=>implementation.createOccurrenceOperations({db:database,manifest:model,identityRef:'c'.repeat(64),preflight:async()=>observation(model,Date.now()),now:Date.now});
  const a=make(db),b=make(other);assert.equal(await a.create(),true);assert.deepEqual(await a.list({expectedSequence:1}),[m.signal]);await a.admit({expectedSequence:2,phase:'claim'});
  const claims=await Promise.all([a.claim({expectedSequence:3}),b.claim({expectedSequence:3})]);assert.equal(claims.filter(Boolean).length,1);
  assert.equal(await make(other).claim({expectedSequence:3}),null); // response lost, no replay
  await insertSignal({...m.signal,eventId:'d'.repeat(64),revision:11});
  assert.equal(await a.admit({expectedSequence:4,phase:'finish'}),true);
  assert.equal(await a.finish({expectedSequence:5}),'superseded');assert.equal(await b.finish({expectedSequence:5}),null);
  const run=await other.prepare('SELECT * FROM assistance_supervision_runs').first(),j=await other.prepare('SELECT * FROM assistance_occurrence_journal ORDER BY sequence DESC LIMIT 1').first();assert.equal(run.outcome,'superseded');assert.equal(j.outcome,run.outcome);assert.equal(j.recorded_at,run.completed_at);
  for(let i=0;i<2;i++)await db.prepare('INSERT INTO dossier_supervision_runs(run_id,request_id,event_id,started_at,expires_at,outcome,completed_at) VALUES(?,?,?,?,?,?,?)').bind(crypto.randomUUID(),crypto.randomUUID(),String(i).repeat(64),Date.now()-2000,Date.now()-1000,'reviewed',Date.now()-1500).run();
  const m2={...m,occurrenceId:crypto.randomUUID(),requestId:crypto.randomUUID(),signal:{...m.signal,eventId:'e'.repeat(64),revision:11}};await insertSignal(m2.signal);const c=make(db,m2);await c.create();await c.list({expectedSequence:1});await c.admit({expectedSequence:2,phase:'claim'});
  await assert.rejects(c.claim({expectedSequence:3}),/Occurrence storage unavailable/);assert.equal((await other.prepare('SELECT max(sequence) n FROM assistance_occurrence_journal WHERE occurrence_id=?').bind(m2.occurrenceId).first()).n,3);assert.equal((await db.prepare('SELECT count(*) n FROM assistance_supervision_runs').first()).n,1);assert.equal(await c.close({reason:'ambiguous_response'}),true);
 }finally{await runtime.dispose();}
});
test('native effective SQL clock rejects a delayed claim transaction without any run or consumption',async()=>{
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'native-queued-real-occurrence'}}));
 try{
  const db=await runtime.getD1Database('DB');for(const name of schemas)for(const sql of sqlStatements(readFileSync('worker/operations/'+name+'.sql','utf8')))await db.prepare(sql).run();
  const t=Date.now(),deadline=t+12000,m={...manifest(),startAt:t-1,deadline,serverDeadline:deadline,tokenExpiresAt:deadline};
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(m.signal.eventId,m.signal.projectRef,10,'assistance_requested','orientation',m.signal.observedAt,t).run();
  const make=database=>implementation.createOccurrenceOperations({db:database,manifest:m,identityRef:'c'.repeat(64),preflight:async()=>observation(m,Date.now()),now:Date.now});const a=make(db);assert.equal(await a.create(),true);await a.list({expectedSequence:1});await a.admit({expectedSequence:2,phase:'claim'});
  const delayed={prepare:sql=>db.prepare(sql),batch:async statements=>{await new Promise(resolve=>setTimeout(resolve,Math.max(0,deadline-10000-Date.now()+100)));return db.batch(statements);}};
  assert.equal(await make(delayed).claim({expectedSequence:3}),null);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_supervision_runs').first()).n,0);assert.equal((await db.prepare('SELECT max(sequence) n FROM assistance_occurrence_journal').first()).n,3);assert.equal(await a.close({reason:'window_expired'}),true);
 }finally{await runtime.dispose();}
});
