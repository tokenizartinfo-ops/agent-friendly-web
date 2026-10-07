import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {reserveAssistanceGoalGeneration} from '../lib/assistance-goal-generation-budget.mjs';
function fixture(){
 const f=operationsDb();for(const name of ['assistance-supervision','assistance-supervision-runs','dossier-supervision','consumer-state','notice-reservations','assistance-goal-generation-budget'])f.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 const value={db:f.db,eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:crypto.randomUUID(),receiptId:crypto.randomUUID(),revision:1,purpose:'afw.goal-guidance.propose.v1',now:2000000000000};
 f.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(value.eventId,value.projectRef,1,'assistance_requested','orientation',new Date(value.now-1000).toISOString(),value.now-900);
 f.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(value.runId,crypto.randomUUID(),value.eventId,value.now-500,value.now+20000,null,null);
 return{...f,value};
}
test('nested budget admits current lease once, including concurrent callers, without a second run charge',async()=>{
 const f=fixture();try{
 const results=await Promise.all([reserveAssistanceGoalGeneration(f.value),reserveAssistanceGoalGeneration(f.value)]);
 assert.equal(results.filter(x=>x.allowed).length,1);
 assert.deepEqual(await reserveAssistanceGoalGeneration({...f.value,receiptId:crypto.randomUUID()}),{allowed:false});
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_generation_budget').get().n,1);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_supervision_runs').get().n,1);
 }finally{f.sqlite.close();}
});
test('expired, completed, superseded leases, missing schemas and shared budget overflow fail closed',async()=>{
 for(const mode of ['expired','completed','superseded','overflow','missing']){const f=fixture();try{
 if(mode==='expired')f.value.now+=30000;
 if(mode==='completed')f.sqlite.exec("UPDATE assistance_supervision_runs SET outcome='reviewed',completed_at=started_at+1");
 if(mode==='superseded')f.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run('c'.repeat(64),f.value.projectRef,2,'assistance_requested','orientation',new Date(f.value.now).toISOString(),f.value.now);
 if(mode==='overflow')for(let i=0;i<3;i++)f.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'d'.repeat(64),f.value.now-1000-i,f.value.now-900-i,'reviewed',f.value.now-950-i);
 if(mode==='missing')f.sqlite.exec('DROP TABLE operations_notice_reservations');
 assert.deepEqual(await reserveAssistanceGoalGeneration(f.value),{allowed:false});
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_generation_budget').get().n,0);
 }finally{f.sqlite.close();}}
});

test('the third admitted run may generate, while another active assistance or dossier run blocks it',async()=>{
 for(const mode of ['third','assistance','dossier']){const f=fixture();try{
 if(mode==='third')for(let i=0;i<2;i++)f.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'d'.repeat(64),f.value.now-1000-i,f.value.now-900-i,'reviewed',f.value.now-950-i);
 if(mode==='assistance')f.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'d'.repeat(64),f.value.now-300,f.value.now+20000,null,null);
 if(mode==='dossier')f.sqlite.prepare('INSERT INTO dossier_supervision_runs VALUES(?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'d'.repeat(64),f.value.now-300,f.value.now+20000,null,null);
 assert.deepEqual(await reserveAssistanceGoalGeneration(f.value),{allowed:mode==='third'});
 }finally{f.sqlite.close();}}
});
