import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {operationsDb} from './fixtures/operations-db.mjs';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
import {signedAssistanceGoalRequest} from '../lib/assistance-goal-service-identity.mjs';
const http=await import('../lib/assistance-goal-http.mjs').catch(()=>({}));
const now=1791323200000,{privateKey,publicKey}=await generateKeyPair('RS256');
const signingSecret='synthetic-goal-read-separate-secret-minimum-32',signalSecret='synthetic-assistance-signal-secret-minimum-32';
async function fixture(){
 const source=new DatabaseSync(':memory:');source.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER,site_type TEXT,goals_json TEXT,notes TEXT);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);CREATE TABLE assistance_delivery_receipts(project_ref TEXT,source_event_id TEXT,event_id TEXT);'+readFileSync('db/assistance-goal-consent.sql','utf8')+readFileSync('db/assistance-goal-read-receipts.sql','utf8'));
 const sourceId='help-'+'a'.repeat(64),createdAt=new Date(now-1000).toISOString(),payload={contract:'afw.assistance-request.v1',requestId:'11111111-1111-4111-8111-111111111111',expectedRevision:3,topic:'orientation'};
 const signal=await projectAssistanceSignal({id:sourceId,projectId:'own',type:'assistance_requested',createdAt,payload},signalSecret);
 source.prepare('INSERT INTO site_projects VALUES(?,?,?,?,?,?)').run('own','owner',3,'commerce','["discovery"]','PRIVATE NARRATIVE');
 source.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(sourceId,'own','owner','assistance_requested',JSON.stringify(payload),createdAt);
 source.prepare('INSERT INTO assistance_delivery_receipts VALUES(?,?,?)').run(signal.projectRef,sourceId,signal.eventId);
 source.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').run('own','owner',sourceId,3,'grant','afw.assistance-goals-consent.v1','22222222-2222-4222-8222-222222222222',now-1000,now+60000);
 const statement=(sql,args=[])=>({bind:(...values)=>statement(sql,values),first:async()=>source.prepare(sql).get(...args)||null,run:async()=>({meta:{changes:source.prepare(sql).run(...args).changes}})});
 const sourceDb={prepare:sql=>statement(sql),withSession(mode){assert.equal(mode,'first-primary');return this;}};
 const operational=operationsDb();for(const name of ['assistance-supervision','assistance-supervision-runs'])operational.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 const runId='33333333-3333-4333-8333-333333333333';
 operational.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(signal.eventId,signal.projectRef,3,'assistance_requested','orientation',createdAt,now-900);
 operational.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(runId,'44444444-4444-4444-8444-444444444444',signal.eventId,now-500,now+30000,null,null);
 const config={enabled:true,origin:'https://goal-context-canary.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'goal-only',clientId:'goal-only.access',purpose:'afw.goal-guidance.read.v1',excludedClientIds:['operations.access'],excludedAudiences:['operations-only'],expiresAt:new Date(now+60000).toISOString(),enrollment:{projectId:'own',userId:'owner',since:new Date(now-2000).toISOString()}};
 const options={sourceDb,operationsDb:operational.db,getSettings:()=>config,signingSecret,signalSecret,keySet:publicKey,limiter:{limit:async()=>({success:true})},now:()=>now};
 const query={eventId:signal.eventId,projectRef:signal.projectRef,runId,revision:3};
 async function request({subject='',client=config.clientId}={}){const r=await signedAssistanceGoalRequest(query,signingSecret,now);r.headers.set('Cf-Access-Jwt-Assertion',await new SignJWT({type:'app',common_name:client}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject(subject).setExpirationTime(Math.floor(now/1000)+300).sign(privateKey));return r;}
 return{source,operational,options,config,query,request,sourceId,close(){source.close();operational.sqlite.close();}};
}
test('closed HTTP denies before storage; real JWT/signature compose a minimal native SQLite read',async()=>{
 assert.equal(typeof http.createAssistanceGoalHttp,'function');
 let touched=false;const closed=http.createAssistanceGoalHttp({getSettings:()=>({}),sourceDb:{prepare(){touched=true;throw Error('must not read');}},now:()=>now});
 assert.equal((await closed(new Request('https://goal-context-canary.agentfriendlyweb.dev/context',{method:'POST'}))).status,404);assert.equal(touched,false);
 const f=await fixture(),response=await http.createAssistanceGoalHttp(f.options)(await f.request()),body=await response.json();
 assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.deepEqual(body.context.declarations,{siteType:'commerce',goals:['discovery']});assert.doesNotMatch(JSON.stringify(body),/PRIVATE|"owner"|"own"|sourceId|sequence/);f.close();
});
test('stalled bodies cancel, rate rejection denies, and purpose signing key stays separate',async()=>{
 const f=await fixture();let cancelled=false;
 const stalled=new Request(f.config.origin+'/context',{method:'POST',headers:{'content-type':'application/json'},body:new ReadableStream({pull(){return new Promise(()=>{});},cancel(){cancelled=true;}}),duplex:'half'});
 assert.equal((await http.createAssistanceGoalHttp({...f.options,bodyTimeoutMs:25})(stalled)).status,408);assert.equal(cancelled,true);
 assert.equal((await http.createAssistanceGoalHttp({...f.options,limiter:{limit:async()=>({success:false})}})(await f.request())).status,429);
 assert.equal((await http.createAssistanceGoalHttp({...f.options,signingSecret:signalSecret})(await f.request())).status,404);f.close();
});
test('human/operations identities, browser requests, unknown revisions and body bounds deny context',async()=>{
 const f=await fixture(),handler=http.createAssistanceGoalHttp(f.options);
 for(const options of [{subject:'owner'},{client:'operations.access'}])assert.equal((await handler(await f.request(options))).status,401);
 const browser=await f.request();browser.headers.set('origin',f.config.origin);assert.equal((await handler(browser)).status,403);
 const oversized=new Request(f.config.origin+'/context',{method:'POST',headers:{'content-type':'application/json'},body:'x'.repeat(513)});assert.equal((await handler(oversized)).status,413);
 const changed=await signedAssistanceGoalRequest({...f.query,revision:4},signingSecret,now);changed.headers.set('Cf-Access-Jwt-Assertion',(await f.request()).headers.get('Cf-Access-Jwt-Assertion'));assert.notEqual((await handler(changed)).status,200);f.close();
});
test('closure and owner change while rate limiting prevent private context delivery',async()=>{
 for(const change of [f=>{f.config.enabled=false;},f=>f.source.exec("UPDATE site_projects SET user_id='other'")]){const f=await fixture();f.options.limiter={limit:async()=>{change(f);return{success:true};}};const r=await http.createAssistanceGoalHttp(f.options)(await f.request());assert.notEqual(r.status,200);assert.equal((await r.json()).context,undefined);f.close();}
});
test('withdrawal during the second operational lease check invalidates a native source read',async()=>{
 const f=await fixture(),prepare=f.operational.db.prepare;let leases=0;
 f.operational.db.prepare=sql=>{const statement=prepare(sql);if(!sql.includes('r.started_at AS startedAt'))return statement;return{bind(...args){const bound=statement.bind(...args);return{async first(){if(++leases===2)f.source.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').run('own','owner',f.sourceId,3,'revoke','afw.assistance-goals-consent.v1','55555555-5555-4555-8555-555555555555',now,now);return bound.first();}};}};};
 const response=await http.createAssistanceGoalHttp(f.options)(await f.request());assert.equal(response.status,403);assert.equal((await response.json()).context,undefined);assert.equal(f.source.prepare('SELECT COUNT(*) n FROM assistance_goal_consent_events').get().n,2);f.close();
});
test('HTTP read retries reuse a private receipt without exposing its consent sequence',async()=>{
 const f=await fixture();try{const handler=http.createAssistanceGoalHttp(f.options),first=await (await handler(await f.request())).json(),second=await (await handler(await f.request())).json();
 assert.equal(first.receipt?.version,'afw.assistance-goal-read-receipt.v1');assert.deepEqual(second.receipt,first.receipt);assert.doesNotMatch(JSON.stringify(first),/sequence|PRIVATE|"owner"/);
 }finally{f.close();}
});
