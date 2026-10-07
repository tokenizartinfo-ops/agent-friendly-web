import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const snapshotContract=await import('../lib/assistance-goal-snapshot.mjs').catch(()=>({}));
const now=1791323200000,sourceId='help-'+'a'.repeat(64);
function fixture(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,site_type TEXT,goals_json TEXT,notes TEXT);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 sqlite.prepare('INSERT INTO site_projects VALUES(?,?,?,?,?,?)').run('own','owner',3,'commerce','["discovery","content"]','PRIVATE NARRATIVE');
 sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(sourceId,'own','owner','assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId:'11111111-1111-4111-8111-111111111111',expectedRevision:3,topic:'orientation'}),new Date(now-1000).toISOString());
 sqlite.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').run('own','owner',sourceId,3,'grant','afw.assistance-goals-consent.v1','22222222-2222-4222-8222-222222222222',now-1000,now+60000);
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null});
 const db={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare:sql=>statement(sql)};
 return{sqlite,options:{db,userId:'owner',projectId:'own',sourceId,now}};
}
test('the primary snapshot selects only declarations tied to a current own grant',async()=>{
 assert.equal(typeof snapshotContract.readAssistanceGoalSnapshot,'function');const f=fixture();
 const value=await snapshotContract.readAssistanceGoalSnapshot(f.options);
 assert.equal(value.status,200);assert.deepEqual(value.snapshot.project,{id:'own',userId:'owner',revision:3,siteType:'commerce',goalsJson:'["discovery","content"]'});
 assert.equal(value.snapshot.consent.sequence,1);assert.equal(value.snapshot.source.id,sourceId);
 assert.doesNotMatch(JSON.stringify(value),/PRIVATE NARRATIVE|notes/);f.sqlite.close();
});
test('expiry, withdrawal, ownership, revision and unrelated sources yield no snapshot',async()=>{
 const changes=[f=>{f.options.now=now+60000;},f=>f.sqlite.exec("UPDATE assistance_goal_consent_events SET action='revoke',expires_at=issued_at"),f=>f.sqlite.exec("UPDATE site_projects SET user_id='other'"),f=>f.sqlite.exec('UPDATE site_projects SET revision=4'),f=>f.sqlite.exec("UPDATE project_events SET type='project_updated'"),f=>f.sqlite.exec("UPDATE project_events SET user_id='other'"),f=>f.sqlite.exec("UPDATE assistance_goal_consent_events SET consent_version='afw-copilot-processing-v1'")];
 for(const change of changes){const f=fixture();change(f);const result=await snapshotContract.readAssistanceGoalSnapshot(f.options);assert.notEqual(result.status,200);assert.equal(result.snapshot,undefined);f.sqlite.close();}
});
