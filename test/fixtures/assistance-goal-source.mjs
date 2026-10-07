import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {projectAssistanceSignal} from '../../lib/assistance-supervision-contract.mjs';
export const time=1791323200000;
export async function goalSourceFixture(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,site_type TEXT,goals_json TEXT,notes TEXT);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);CREATE TABLE assistance_delivery_receipts(project_ref TEXT,source_event_id TEXT,event_id TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 sqlite.exec(readFileSync('db/assistance-goal-read-receipts.sql','utf8'));
 const source={id:'help-'+'a'.repeat(64),projectId:'own',type:'assistance_requested',createdAt:new Date(time-1000).toISOString(),payload:{contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'}};
 const signal=await projectAssistanceSignal(source,'synthetic-signal-secret-minimum-thirty-two');
 const context={version:'afw.assistance-goal-context.v1',eventId:signal.eventId,projectRef:signal.projectRef,runId:crypto.randomUUID(),revision:3,expiresAt:time+30000,declarations:{siteType:'commerce',goals:['discovery']},evidenceStatus:'owner_declared',operationsAuthorized:false};
 sqlite.prepare('INSERT INTO site_projects VALUES(?,?,?,?,?,?)').run('own','owner',3,'commerce','["discovery"]','PRIVATE NARRATIVE');
 sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(source.id,'own','owner',source.type,JSON.stringify(source.payload),source.createdAt);
 sqlite.prepare('INSERT INTO assistance_delivery_receipts VALUES(?,?,?)').run(context.projectRef,source.id,context.eventId);
 const grant=(action='grant')=>sqlite.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').run('own','owner',source.id,3,action,'afw.assistance-goals-consent.v1',crypto.randomUUID(),time-1000,time+60000);
 grant();const snapshot={project:{id:'own',userId:'owner',revision:3,siteType:'commerce',goalsJson:'["discovery"]'},source,consent:{sequence:1,issuedAt:time-1000,expiresAt:time+60000}};
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 const db={prepare:sql=>statement(sql),withSession:()=>db};
 return{sqlite,db,snapshot,context,grant,close:()=>sqlite.close()};
}
