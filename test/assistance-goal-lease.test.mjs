import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
const leaseContract=await import('../lib/assistance-goal-lease.mjs').catch(()=>({}));
const now=1791323200000,eventId='a'.repeat(64),projectRef='b'.repeat(64),runId='11111111-1111-4111-8111-111111111111';
function fixture(){const f=operationsDb();for(const name of ['assistance-supervision','assistance-supervision-runs'])f.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 f.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(eventId,projectRef,3,'assistance_requested','orientation',new Date(now-1000).toISOString(),now-900);
 f.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(runId,'22222222-2222-4222-8222-222222222222',eventId,now-500,now+30000,null,null);
 f.db.withSession=function(mode){assert.equal(mode,'first-primary');return this;};
 return{...f,options:{db:f.db,eventId,projectRef,runId,revision:3,now}};
}
test('active orientation lease is selected from authoritative primary metadata',async()=>{
 assert.equal(typeof leaseContract.readActiveAssistanceGoalLease,'function');const f=fixture();
 assert.deepEqual(await leaseContract.readActiveAssistanceGoalLease(f.options),{eventId,projectRef,runId,revision:3,topic:'orientation',expiresAt:now+30000});f.sqlite.close();
});
test('expired, finished, future, mismatched and superseded leases cannot authorize context',async()=>{
 const changes=[f=>{f.options.now=now+30000;},f=>f.sqlite.exec("UPDATE assistance_supervision_runs SET outcome='reviewed',completed_at="+now),f=>{f.options.now=now-1000;},f=>{f.options.revision=4;},f=>{f.options.projectRef='c'.repeat(64);},f=>{f.options.runId='33333333-3333-4333-8333-333333333333';},f=>f.sqlite.exec("UPDATE assistance_supervision_events SET topic='delivery'"),f=>f.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run('c'.repeat(64),projectRef,4,'assistance_requested','orientation',new Date(now).toISOString(),now)];
 for(const change of changes){const f=fixture();change(f);assert.equal(await leaseContract.readActiveAssistanceGoalLease(f.options),null);f.sqlite.close();}
});
test('another same-revision request does not substitute or suppress this lease',async()=>{
 const f=fixture();f.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run('c'.repeat(64),projectRef,3,'assistance_requested','orientation',new Date(now).toISOString(),now);
 assert.equal((await leaseContract.readActiveAssistanceGoalLease(f.options)).eventId,eventId);f.sqlite.close();
});
