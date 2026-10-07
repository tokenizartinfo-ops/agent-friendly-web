import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const handler=await import('../lib/assistance-goal-consent-handler.mjs').catch(()=>({}));
const {assistanceGoalStateVersion}=await import('../lib/assistance-goal-consent.mjs');
const initial=1791323400000,sourceId='help-'+'a'.repeat(64),key='11111111-1111-4111-8111-111111111111';
const emptyVersion=await assistanceGoalStateVersion('own','owner',0);
const firstVersion=await assistanceGoalStateVersion('own','owner',1);
function fixture(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8'));
 sqlite.exec("INSERT INTO site_projects VALUES('own','owner',3)");sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(sourceId,'own','owner','assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId:key,expectedRevision:3,topic:'orientation'}),new Date(initial-1000).toISOString());
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>sqlite.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 const db={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare:sql=>statement(sql)};
 let clock=initial,actor={userId:'owner'};
 const settings={enabled:true,allowedProjectId:'own',expiresAt:new Date(initial+60000).toISOString()};
 const limiter={limit:async()=>({success:true})};
 const run=handler.createAssistanceGoalConsentHandler({getSettings:()=>settings,db,limiter,getIdentity:async()=>actor,now:()=>clock});
 const body={action:'grant',sourceId,expectedRevision:3,consentVersion:'afw.assistance-goals-consent.v1',requestId:key,stateVersion:emptyVersion};
 const post=(data=body,headers={})=>run(new Request('https://agentfriendlyweb.dev/api/projects/own/assistance-consent',{method:'POST',headers:{origin:'https://agentfriendlyweb.dev','content-type':'application/json',...headers},body:JSON.stringify(data)}),'own');
 const get=()=>run(new Request('https://agentfriendlyweb.dev/api/projects/own/assistance-consent?source='+sourceId),'own');
 return{sqlite,settings,limiter,body,post,get,run,actor:x=>{actor=x;},clock:x=>{clock=x;}};
}
test('consent HTTP is closed, authenticated, own-project and same-origin',async()=>{
 assert.equal(typeof handler.createAssistanceGoalConsentHandler,'function');
 const f=fixture();f.settings.enabled=false;assert.equal((await f.get()).status,404);
 f.settings.enabled=true;f.actor(null);assert.equal((await f.get()).status,401);
 f.actor({userId:'another'});assert.equal((await f.get()).status,404);
 f.actor({userId:'owner'});assert.equal((await f.post(f.body,{origin:'https://another.test'})).status,403);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});
test('HTTP grant is bounded by the trial window and hides the internal sequence',async()=>{
 const f=fixture();const result=await f.post();assert.equal(result.status,200);
 assert.equal(result.headers.get('cache-control'),'no-store');
 assert.deepEqual(await result.json(),{granted:true,issuedAt:initial,expiresAt:initial+60000,stateVersion:firstVersion});
 assert.equal((await f.post()).status,200);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,1);
 const revoked=await f.post({...f.body,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222'});
 assert.equal((await revoked.json()).granted,false);f.sqlite.close();
});
test('closure while rate limiting prevents a grant, and invalid purpose is refused',async()=>{
 const f=fixture();assert.equal((await f.post({...f.body,consentVersion:'afw-copilot-processing-v1'})).status,400);
 assert.equal((await f.post({...f.body,notes:'private'})).status,400);
 f.limiter.limit=async()=>{f.clock(initial+60000);return{success:true};};
 assert.equal((await f.post()).status,404);assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});

test('HTTP validates bounded UTF-8 bodies and rate limits before any permission write',async()=>{
 const f=fixture();
 const request=body=>new Request('https://agentfriendlyweb.dev/api/projects/own/assistance-consent',{method:'POST',headers:{origin:'https://agentfriendlyweb.dev','content-type':'application/json'},body});
 assert.equal((await f.run(request('x'.repeat(769)),'own')).status,413);
 assert.equal((await f.run(request('{'),'own')).status,400);
 f.limiter.limit=async()=>({success:false});assert.equal((await f.post()).status,429);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});
test('a stalled upload times out and cancels without creating a permission',async()=>{
 const f=fixture();let cancelled=false;
 const body=new ReadableStream({pull(){return new Promise(()=>{});},cancel(){cancelled=true;}});
 const response=await f.run(new Request('https://agentfriendlyweb.dev/api/projects/own/assistance-consent',{method:'POST',headers:{origin:'https://agentfriendlyweb.dev','content-type':'application/json'},body,duplex:'half'}),'own');
 assert.equal(response.status,408);assert.equal(cancelled,true);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});
test('identity withdrawal during rate limiting prevents admission',async()=>{
 const f=fixture();f.limiter.limit=async()=>{f.actor(null);return{success:true};};
 assert.equal((await f.post()).status,401);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,0);f.sqlite.close();
});

test('a late original grant cannot reactivate permission after withdrawal',async()=>{
 const f=fixture();
 assert.equal((await f.post({...f.body,action:'revoke',requestId:'22222222-2222-4222-8222-222222222222'})).status,200);
 const late=await f.post(f.body);
 assert.equal(late.status,409);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,1);f.sqlite.close();
});
