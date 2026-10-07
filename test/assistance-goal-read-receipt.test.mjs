import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
const contract=await import('../lib/assistance-goal-read-receipt.mjs').catch(()=>({}));
const time=1791323200000;
async function fixture(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,site_type TEXT,goals_json TEXT,notes TEXT);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);CREATE TABLE assistance_delivery_receipts(project_ref TEXT,source_event_id TEXT,event_id TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 if(typeof contract.recordAssistanceGoalRead==='function')sqlite.exec(readFileSync('db/assistance-goal-read-receipts.sql','utf8'));
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
test('read receipts are append-only, minimal and retries preserve the first deadline',async()=>{
 assert.equal(typeof contract.recordAssistanceGoalRead,'function');const f=await fixture();try{
 const first=await contract.recordAssistanceGoalRead({...f,now:time}),again=await contract.recordAssistanceGoalRead({...f,now:time+1000});
 assert.equal(first.status,200);assert.deepEqual(again.receipt,first.receipt);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_receipts').get().n,1);
 assert.deepEqual(Object.keys(first.receipt).sort(),['expiresAt','id','version']);assert.doesNotMatch(JSON.stringify(first),/owner|PRIVATE|sequence/);
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 const current=await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:first.receipt.id,query,now:time+1000});assert.equal(current.status,200);assert.deepEqual(current.context,f.context);
 }finally{f.close();}
});
test('withdrawal or regrant cannot revive a captured read; ownership and declarations must still match',async()=>{
 for(const change of [f=>f.grant('revoke'),f=>f.grant(),f=>f.sqlite.exec("UPDATE site_projects SET user_id='foreign'"),f=>f.sqlite.exec('UPDATE site_projects SET revision=4'),f=>f.sqlite.exec("UPDATE site_projects SET goals_json='[\"content\"]'")]){
 const f=await fixture();try{assert.equal(typeof contract.recordAssistanceGoalRead,'function');const result=await contract.recordAssistanceGoalRead({...f,now:time});change(f);
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 assert.notEqual((await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time+1000})).status,200);
 assert.notEqual((await contract.recordAssistanceGoalRead({...f,now:time+1000})).status,200);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_receipts').get().n,1);
 }finally{f.close();}}
});
test('expired, altered and foreign references do not deliver context',async()=>{
 const f=await fixture();try{assert.equal(typeof contract.recordAssistanceGoalRead,'function');const result=await contract.recordAssistanceGoalRead({...f,now:time}),query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 for(const change of [{userId:'foreign'},{now:time+30000},{query:{...query,runId:crypto.randomUUID()}},{receiptId:crypto.randomUUID()}]){
 const denied=await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time,...change});assert.notEqual(denied.status,200);assert.equal(denied.context,undefined);}
 f.context.declarations.goals=['content'];assert.notEqual((await contract.recordAssistanceGoalRead({...f,now:time})).status,200);
 }finally{f.close();}
});
test('primary state changed while hashing cannot escape the receipt validation',async()=>{
 const f=await fixture();try{const result=await contract.recordAssistanceGoalRead({...f,now:time});let reads=0;
 const db={prepare(sql){const statement=f.db.prepare(sql);return{bind(...args){const bound=statement.bind(...args);return{async first(){const row=await bound.first();if(sql.includes('SELECT r.id,r.context_hash')&&++reads===1)f.grant('revoke');return row;}};}};}};
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 const denied=await contract.readCurrentAssistanceGoalReceipt({db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time});assert.notEqual(denied.status,200);assert.equal(denied.context,undefined);
 }finally{f.close();}
});
test('a changed source event cannot reuse a receipt for the previous request',async()=>{
 const f=await fixture();try{const result=await contract.recordAssistanceGoalRead({...f,now:time});const changed={...f.snapshot.source.payload,requestId:crypto.randomUUID()};
 f.sqlite.prepare('UPDATE project_events SET payload_json=?').run(JSON.stringify(changed));
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 assert.notEqual((await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time})).status,200);
 }finally{f.close();}
});
