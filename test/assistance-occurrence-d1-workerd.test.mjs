import test from 'node:test';
import assert from 'node:assert/strict';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
const implementation=await import('../lib/assistance-occurrence-d1.mjs').catch(()=>({}));
test('native D1 two bindings enforce create/CAS/one-use effects, rollback and independent closure',async()=>{
 assert.equal(typeof implementation.createOccurrenceD1Store,'function','D1 store contract missing');
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'native-occurrence-ledger',OTHER:'native-occurrence-ledger'}}));
 try{
  const db=await runtime.getD1Database('DB'),other=await runtime.getD1Database('OTHER'),time=1791450000000;
  for(const name of ['assistance-supervision','assistance-occurrences']){
   const source=readFileSync('worker/operations/'+name+'.sql','utf8').replace(/--[^\n]*/g,'');
   const pattern=/^CREATE TRIGGER\b[\s\S]*?^END;/gm, triggers=source.match(pattern)??[];
   for(const sql of [...source.replace(pattern,'').split(';').map(x=>x.trim()).filter(Boolean),...triggers])await db.prepare(sql).run();
  }
  await db.exec('CREATE TABLE qa_effects(id TEXT PRIMARY KEY,value INTEGER NOT NULL CHECK(value>0))');
  const m={occurrenceId:crypto.randomUUID(),requestId:crypto.randomUUID(),signal:{version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:10,kind:'assistance_requested',topic:'orientation',observedAt:new Date(time-1).toISOString()},sourceRevision:'8eecaac0dcfca4c5dd2748cd75c8dda5b6cde5cc',configId:'cecfg_synthetic',publicationId:'cecfgver_synthetic',startAt:time-1,deadline:time+120000,tokenExpiresAt:time+120000,serverDeadline:time+120000};
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(m.signal.eventId,m.signal.projectRef,10,'assistance_requested','orientation',m.signal.observedAt,time).run();
  const preflight=async()=>({sourceRevision:m.sourceRevision,configId:m.configId,publicationId:m.publicationId,origin:'https://github.com/tokenizartinfo-ops/agent-friendly-web.git',observationsCurrent:true,networkMode:'restricted',networkEnforced:true,operationsBindingsReady:true,observationRevision:2,configurationRevision:2,observedAt:time});
  const make=(database,manifest=m)=>implementation.createOccurrenceD1Store({db:database,manifest,identityRef:'c'.repeat(64),preflight,now:()=>time});
  const a=make(db),b=make(other);
  const starts=await Promise.all([a.create(),b.create()]);assert.equal(starts.filter(Boolean).length,1);
  assert.equal(await make(other,{...m,occurrenceId:crypto.randomUUID(),requestId:crypto.randomUUID()}).create(),false);
  assert.equal(await a.consume({expectedSequence:1,phase:'list'}),true);
  const races=await Promise.all([a.admit({expectedSequence:2,phase:'claim'}),b.admit({expectedSequence:2,phase:'claim'})]);assert.equal(races.filter(Boolean).length,1);
  const claim={expectedSequence:3,phase:'claim',runId:crypto.randomUUID(),leaseExpiresAt:time+60000};
  await assert.rejects(a.consume(claim,[db.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('invalid',0)]),/Occurrence storage unavailable/);
  assert.equal((await other.prepare('SELECT max(sequence) n FROM assistance_occurrence_journal').first()).n,3);
  const consumed=await Promise.all([a.consume(claim,[db.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('claim',1)]),b.consume(claim,[other.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('competing',1)])]);assert.equal(consumed.filter(Boolean).length,1);
  assert.equal(await b.consume(claim,[other.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('replay',1)]),false);
  assert.equal((await other.prepare('SELECT count(*) n FROM qa_effects').first()).n,1);
  assert.equal(await b.close({reason:'ambiguous_response'}),true);
  assert.equal(await a.admit({expectedSequence:4,phase:'finish'}),false);
  await assert.rejects(db.prepare('DELETE FROM assistance_occurrence_journal').run());
  await assert.rejects(db.prepare('UPDATE assistance_occurrences SET deadline=deadline+1').run());
  const next={...m,occurrenceId:crypto.randomUUID(),requestId:crypto.randomUUID(),signal:{...m.signal,eventId:'d'.repeat(64)}};
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(next.signal.eventId,next.signal.projectRef,10,'assistance_requested','orientation',next.signal.observedAt,time).run();
  const c=make(db,next),d=make(other,next);assert.equal(await c.create(),true);await c.consume({expectedSequence:1,phase:'list'});await c.admit({expectedSequence:2,phase:'claim'});
  await c.consume({expectedSequence:3,phase:'claim',runId:crypto.randomUUID(),leaseExpiresAt:time+60000},[db.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('next-claim',1)]);await c.admit({expectedSequence:4,phase:'finish'});
  const finish={expectedSequence:5,phase:'finish',outcome:'intervention_required'};assert.equal(await c.consume(finish,[db.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('finish',1)]),true);assert.equal(await d.consume(finish,[other.prepare('INSERT INTO qa_effects VALUES(?,?)').bind('finish-replay',1)]),false);
  assert.equal((await other.prepare('SELECT state FROM assistance_occurrence_journal WHERE occurrence_id=? ORDER BY sequence DESC LIMIT 1').bind(next.occurrenceId).first()).state,'completed');
 }finally{await runtime.dispose();}
});
