import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const feedback=await import('../lib/assistance-feedback.mjs').catch(()=>({}));
const time=Date.now(),secret='synthetic-feedback-secret-at-least-32',eventId='a'.repeat(64),projectRef='b'.repeat(64),runId=crypto.randomUUID();
const review={version:'afw-assistance-review-v1',eventId,projectRef,revision:3,topic:'orientation',runId,outcome:'reviewed',reviewedAt:time};
function database(sql){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec(sql);
 const statement=(sql,args=[])=>({bind:(...a)=>statement(sql,a),first:async()=>sqlite.prepare(sql).get(...args)||null,all:async()=>({results:sqlite.prepare(sql).all(...args)}),run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}})});
 return{sqlite,db:{prepare:sql=>statement(sql)}};
}
function fixture(){
 const ledger=database(readFileSync('worker/operations/assistance-supervision.sql','utf8')+readFileSync('worker/operations/assistance-supervision-runs.sql','utf8'));
 ledger.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(eventId,projectRef,3,'assistance_requested','orientation',new Date(time-1000).toISOString(),time-500);
 ledger.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),eventId,time-100,time+60000,'reviewed',time);
 const env={AFW_ASSISTANCE_FEEDBACK_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+60000).toISOString(),AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET:secret,AFW_ASSISTANCE_PROJECT_REFS:JSON.stringify([projectRef]),OPERATIONS_DB:ledger.db};
 return{ledger,env};
}
test('review metadata is exact and cannot claim resolution or contain private context',()=>{
 assert.equal(typeof feedback.validateAssistanceReview,'function');
 assert.deepEqual(feedback.validateAssistanceReview(review,{now:time}),review);
 for(const invalid of [{...review,outcome:'resolved'},{...review,notes:'private'},{...review,reviewedAt:time+1},{...review,reviewedAt:'date'},{...review,revision:0}])assert.throws(()=>feedback.validateAssistanceReview(invalid,{now:time}));
});
test('feedback is a bounded purpose-signed service read and withdrawal denies immediately',async()=>{
 assert.equal(typeof feedback.createAssistanceFeedbackIngress,'function');
 const {env}=fixture(),ingress=feedback.createAssistanceFeedbackIngress({now:()=>time});
 const request=()=>feedback.signedAssistanceReviewRequest({eventId,projectRef},secret,time);
 const response=await ingress.fetch(await request(),env);assert.equal(response.status,200);assert.deepEqual(await response.json(),{review});
 assert.equal((await ingress.fetch(await request(),{...env,AFW_ASSISTANCE_FEEDBACK_ENABLED:'false'})).status,404);
 assert.equal((await ingress.fetch(await request(),{...env,AFW_ASSISTANCE_PROJECT_REFS:'[]'})).status,403);
 const signed=await request();assert.equal((await ingress.fetch(new Request(signed,{headers:{...Object.fromEntries(signed.headers),origin:'https://agentfriendlyweb.dev'}}),env)).status,403);
 assert.equal((await ingress.fetch(await feedback.signedAssistanceReviewRequest({eventId,projectRef},'foreign-secret-at-least-32-characters',time),env)).status,401);
});
test('private feedback retries lost responses, preserves source and rechecks ownership before persistence',async()=>{
 assert.equal(typeof feedback.createAssistanceFeedbackProducer,'function');
 const {env}=fixture();
 const source=database("CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER);CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);"+readFileSync('worker/operations/assistance-delivery-receipts.sql','utf8')+readFileSync('worker/operations/assistance-feedback-receipts.sql','utf8'));
 source.sqlite.prepare('INSERT INTO site_projects VALUES(?,?,?)').run('p','alice',3);
 source.sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run('help-'+'c'.repeat(64),'p','alice','assistance_requested',JSON.stringify({contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'}),new Date(time-1000).toISOString());
 source.sqlite.prepare('INSERT INTO assistance_delivery_receipts VALUES(?,?,?,?)').run(projectRef,'help-'+'c'.repeat(64),eventId,time-500);
 let lost=true;const ingress=feedback.createAssistanceFeedbackIngress({now:()=>time});
 const config={...env,ASSISTANCE_SOURCE_DB:source.db,AFW_ASSISTANCE_ENROLLMENTS:JSON.stringify([{projectId:'p',ownerId:'alice',since:new Date(time-2000).toISOString()}]),ASSISTANCE_RECEIVER:{fetch:async request=>{const response=await ingress.fetch(request,env);if(lost){lost=false;throw Error('lost');}return response;}}};
 const producer=feedback.createAssistanceFeedbackProducer({now:()=>time});
 assert.equal((await producer.run(config)).failed,1);assert.equal((await producer.run(config)).confirmed,1);assert.equal((await producer.run(config)).confirmed,0);
 assert.equal(source.sqlite.prepare('SELECT COUNT(*) n FROM assistance_feedback_receipts').get().n,1);
 source.sqlite.exec('DELETE FROM assistance_feedback_receipts');
 config.ASSISTANCE_RECEIVER.fetch=async request=>{const response=await ingress.fetch(request,env);source.sqlite.exec("UPDATE site_projects SET user_id='bob'");return response;};
 assert.equal((await producer.run(config)).confirmed,0);assert.equal(source.sqlite.prepare('SELECT COUNT(*) n FROM assistance_feedback_receipts').get().n,0);
 source.sqlite.exec("UPDATE site_projects SET user_id='alice'");
 config.ASSISTANCE_RECEIVER.fetch=async request=>{const response=await ingress.fetch(request,env);config.AFW_ASSISTANCE_FEEDBACK_ENABLED='false';return response;};
 assert.equal((await producer.run(config)).paused,true);assert.equal(source.sqlite.prepare('SELECT COUNT(*) n FROM assistance_feedback_receipts').get().n,0,'withdrawal during transport cannot persist feedback');
 assert.equal((await producer.run({...config,AFW_ASSISTANCE_FEEDBACK_ENABLED:'false'})).paused,true);
});
