import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
const consent=await import('../lib/assistance-goal-consent.mjs').catch(()=>({}));
const now=1791323200000,sourceId='help-'+'a'.repeat(64),requestId='11111111-1111-4111-8111-111111111111';
function fixture(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 sqlite.exec("INSERT INTO site_projects VALUES('own','owner',3)");
 sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(sourceId,'own','owner','assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId,expectedRevision:3,topic:'orientation'}),new Date(now-1000).toISOString());
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 const db={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare:sql=>statement(sql)};
 const options={db,userId:'owner',projectId:'own',sourceId,revision:3,action:'grant',requestId,now};
 return{sqlite,options};
}
test('a purpose-specific consent is recorded once without renewal on retry',async()=>{
 assert.equal(typeof consent.recordAssistanceGoalConsent,'function');
 const f=fixture();
 const a=await consent.recordAssistanceGoalConsent(f.options);
 const b=await consent.recordAssistanceGoalConsent({...f.options,now:now+20000});
 assert.equal(a.status,200);assert.equal(a.granted,true);assert.equal(a.expiresAt,now+600000);
 assert.deepEqual(b,a);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,1);f.sqlite.close();
});

test('withdrawal between the state check and INSERT fences the grant in native SQLite',async()=>{
 const f=fixture(),prepare=f.options.db.prepare;
 const state=await consent.readAssistanceGoalConsent(f.options);
 f.options.db.prepare=sql=>{
  const statement=prepare(sql);if(!sql.startsWith('INSERT'))return statement;
  return{bind(...args){const bound=statement.bind(...args);return{async run(){
   f.sqlite.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').run('own','owner',sourceId,3,'revoke','afw.assistance-goals-consent.v1','22222222-2222-4222-8222-222222222222',now,now);
   return bound.run();
  }};}};
 };
 const result=await consent.recordAssistanceGoalConsent({...f.options,expectedProjectSequence:state.projectSequence,expectedStateVersion:state.stateVersion});
 assert.equal(result.status,409);
 assert.deepEqual(f.sqlite.prepare('SELECT action FROM assistance_goal_consent_events').all().map(row=>row.action),['revoke']);
 assert.equal((await consent.readAssistanceGoalConsent(f.options)).granted,false);f.sqlite.close();
});
test('withdrawal and expiry deny while preserving grant history',async()=>{
 const f=fixture();await consent.recordAssistanceGoalConsent(f.options);
 const revoked=await consent.recordAssistanceGoalConsent({...f.options,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222',now:now+1000});
 assert.equal(revoked.granted,false);assert.equal(revoked.sequence,2);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,2);
 const newGrant=await consent.recordAssistanceGoalConsent({...f.options,requestId:'33333333-3333-4333-8333-333333333333',now:now+2000});
 assert.equal(newGrant.sequence,3);
 assert.equal((await consent.readAssistanceGoalConsent({...f.options,now:newGrant.expiresAt})).granted,false);f.sqlite.close();
});
test('owner, request, revision and idempotency cannot be substituted',async()=>{
 const f=fixture();
 assert.equal((await consent.recordAssistanceGoalConsent({...f.options,userId:'another'})).status,404);
 assert.equal((await consent.recordAssistanceGoalConsent({...f.options,revision:4})).status,409);
 await consent.recordAssistanceGoalConsent(f.options);
 assert.equal((await consent.recordAssistanceGoalConsent({...f.options,action:'revoke'})).status,409);
 f.sqlite.exec('UPDATE site_projects SET revision=4');
 assert.equal((await consent.readAssistanceGoalConsent(f.options)).granted,false);
 const revoke=await consent.recordAssistanceGoalConsent({...f.options,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222'});
 assert.equal(revoke.status,200,'withdrawal remains possible after a revision change');
 f.sqlite.exec("UPDATE site_projects SET user_id='another'");
 assert.equal((await consent.readAssistanceGoalConsent(f.options)).status,404);f.sqlite.close();
});

for(const [name,change] of [
 ['owner',f=>f.sqlite.exec("UPDATE site_projects SET user_id='another'")],
 ['revision',f=>f.sqlite.exec('UPDATE site_projects SET revision=4')],
 ['source',f=>f.sqlite.exec("UPDATE project_events SET type='project_updated'")],
])test(`consent admission fences a concurrent ${name} change atomically`,async()=>{
 const f=fixture(),prepare=f.options.db.prepare;
 f.options.db.prepare=sql=>{
  const statement=prepare(sql);
  if(!sql.startsWith('INSERT'))return statement;
  return{bind(...args){const bound=statement.bind(...args);return{async run(){change(f);return bound.run();}};}};
 };
 const result=await consent.recordAssistanceGoalConsent(f.options);
 assert.equal(result.status,409);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});
