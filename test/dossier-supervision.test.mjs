import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
const bridge=await import('../lib/dossier-supervision.mjs').catch(()=>({}));
const now=Date.parse('2026-10-06T15:00:00.000Z');
const secret='synthetic-dossier-bridge-secret-minimum-32';
const event={id:'save-private-id',projectId:'private-project-id',type:'project_updated',revision:2,createdAt:new Date(now).toISOString()};
const required=name=>{assert.equal(typeof bridge[name],'function',`${name} must implement the supervision contract`);return bridge[name];};
function sqliteDb(sql){const sqlite=new DatabaseSync(':memory:');sqlite.exec(sql);const make=(sql,args=[])=>({bind:(...a)=>make(sql,a),first:async()=>sqlite.prepare(sql).get(...args)||null,all:async()=>({results:sqlite.prepare(sql).all(...args)}),run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});return {sqlite,db:{prepare:sql=>make(sql)}};}
async function fixture(){required('recordDossierEvent');return sqliteDb(await readFile('worker/operations/dossier-supervision.sql','utf8'));}

test('projection is stable, purpose separated and excludes client data',async()=>{
 const project=required('projectDossierEvent');const a=await project({...event,notes:'PRIVATE',email:'private@example.org'},secret);
 assert.deepEqual(a,await project(event,secret));assert.notEqual(a.eventId,a.projectRef);
 assert.deepEqual(Object.keys(a).sort(),['eventId','kind','observedAt','projectRef','revision','version']);
 assert.doesNotMatch(JSON.stringify(a),/PRIVATE|private-project-id|save-private-id|@/);
 assert.notEqual(a.projectRef,(await project(event,secret+'other')).projectRef);
});
test('invalid revision, source type or canonical timestamp cannot be projected',async()=>{
 const project=required('projectDossierEvent');for(const change of [{revision:0},{revision:1.5},{type:'published'},{createdAt:'yesterday'}])await assert.rejects(project({...event,...change},secret));
 await assert.rejects(project(event,''));
});
test('receiver rejects extra fields and stores no private input',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);
 await assert.rejects(bridge.recordDossierEvent(f.db,{...packet,notes:'PRIVATE'},now));
 assert.equal(f.sqlite.prepare('select count(*) n from dossier_supervision_events').get().n,0);
});
test('duplicate receipt survives recreation; a collision is rejected',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);
 assert.deepEqual(await bridge.recordDossierEvent(f.db,packet,now),{eventId:packet.eventId,duplicate:false});
 assert.deepEqual(await bridge.recordDossierEvent(f.db,packet,now),{eventId:packet.eventId,duplicate:true});
 await assert.rejects(bridge.recordDossierEvent(f.db,{...packet,revision:3},now),/collision/);
 assert.equal(f.sqlite.prepare('select count(*) n from dossier_supervision_events').get().n,1);
});
test('receiver coalesces newer revisions without losing immutable receipts',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);
 await bridge.recordDossierEvent(f.db,packet,now);
 await bridge.recordDossierEvent(f.db,await bridge.projectDossierEvent({...event,id:'older',revision:1},secret),now);
 const list=await required('listDossierSignals')(f.db);assert.equal(list.length,1);assert.equal(list[0].revision,2);
 assert.equal(f.sqlite.prepare('select count(*) n from dossier_supervision_events').get().n,2);
});
test('one active lease, bounded budget, replay and stale completion are distinct',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);await bridge.recordDossierEvent(f.db,packet,now);
 const claim=required('claimDossierSignal');const requestId=crypto.randomUUID();const r=await claim(f.db,packet.eventId,requestId,now);
 assert.ok(r);assert.deepEqual(await claim(f.db,packet.eventId,requestId,now+1),r);
 assert.equal(await claim(f.db,packet.eventId,crypto.randomUUID(),now+1),null);
 await bridge.recordDossierEvent(f.db,await bridge.projectDossierEvent({...event,id:'new',revision:3},secret),now+2);
 assert.equal(await required('finishDossierSignal')(f.db,r.runId,'reviewed',now+3),'superseded');
 assert.equal((await bridge.listDossierSignals(f.db))[0].revision,3);
});
test('reviewed is quiet and never means resolved; expired leases cannot finish',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);await bridge.recordDossierEvent(f.db,packet,now);
 const r=await required('claimDossierSignal')(f.db,packet.eventId,crypto.randomUUID(),now);
 assert.equal(await required('finishDossierSignal')(f.db,r.runId,'resolved',now+1),null);
 assert.equal(await bridge.finishDossierSignal(f.db,r.runId,'reviewed',now+1),'reviewed');
 assert.equal((await bridge.listDossierSignals(f.db)).length,0);
 assert.equal(f.sqlite.prepare('select outcome from dossier_supervision_runs').get().outcome,'reviewed');
});
test('expired reservation cannot finish and consumed attempts exhaust the rolling budget',async()=>{
 const f=await fixture();const packet=await required('projectDossierEvent')(event,secret);await bridge.recordDossierEvent(f.db,packet,now);
 for(let i=0;i<3;i++){const clock=now+i*300001,r=await bridge.claimDossierSignal(f.db,packet.eventId,crypto.randomUUID(),clock);assert.ok(r);assert.equal(await bridge.finishDossierSignal(f.db,r.runId,'reviewed',r.expiresAt),null);}
 assert.equal(await bridge.claimDossierSignal(f.db,packet.eventId,crypto.randomUUID(),now+900003),null);
});
