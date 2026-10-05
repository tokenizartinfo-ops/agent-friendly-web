import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import worker,{createOperationsReviewWorker,OPERATIONS_REVIEW_ORIGIN} from '../worker/operations-review/index.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';

const time=Date.now(),subject='synthetic-review-worker-human';
const {privateKey,publicKey}=await generateKeyPair('RS256');
function environment(db){return {
 OPERATIONS_STATE_DB:db,AFW_OPERATIONS_REVIEW_ENABLED:'true',AFW_OPERATIONS_REVIEWS_ENABLED:'true',
 AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time+300000).toISOString(),
 AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',
 AFW_OPERATIONS_REVIEW_AUDIENCE:'synthetic-review-worker',AFW_OPERATIONS_CONSUMER_AUDIENCE:'synthetic-receiver',
 AFW_OPERATIONS_REVIEW_SUBJECT:subject,OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>({success:true})},
};}
async function token(audience='synthetic-review-worker'){
 return new SignJWT({email:'synthetic@example.com'}).setProtectedHeader({alg:'RS256'}).setSubject(subject)
 .setAudience(audience).setIssuer('https://test.cloudflareaccess.com').setExpirationTime('5m').sign(privateKey);
}
function request(jwt,body,origin=OPERATIONS_REVIEW_ORIGIN){return new Request(origin+'/notices/review',{
 method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,Origin:origin,'Sec-Fetch-Site':'same-origin','content-type':'application/json'},body:JSON.stringify(body),
});}
test('review entrypoint is closed before IO, has no scheduled handler and fails closed without its operational binding',async()=>{
 let io=0;const instance=createOperationsReviewWorker({keySet:async()=>{io++;throw Error('private');},now:()=>time});
 const req={get url(){io++;throw Error('request touched');}};
 const base=environment({prepare(){io++;throw Error('DB touched');}});
 for(const env of [{},{...base,AFW_OPERATIONS_REVIEW_ENABLED:'false'},{...base,AFW_OPERATIONS_REVIEWS_ENABLED:'false'},
 {...base,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(time).toISOString()},{...base,OPERATIONS_STATE_DB:undefined}]){
  const response=await instance.fetch(req,env);assert.equal(response.status,404);assert.equal(response.headers.get('cache-control'),'no-store');
 }
 assert.equal(io,0);assert.equal(Object.hasOwn(worker,'scheduled'),false);
});
test('review configuration is unrouted, disabled and pinned exclusively to operations storage with its own limiter',()=>{
 const config=JSON.parse(readFileSync(new URL('../wrangler.operations-review.jsonc',import.meta.url),'utf8'));
 assert.equal(config.name,'agent-friendly-web-operations-review');assert.equal(config.main,'worker/operations-review/index.mjs');
 assert.equal(config.workers_dev,false);assert.equal(config.preview_urls,false);assert.deepEqual(config.routes??[],[]);assert.deepEqual(config.triggers.crons,[]);
 assert.equal(config.vars.AFW_OPERATIONS_REVIEW_ENABLED,'false');assert.equal(config.vars.AFW_OPERATIONS_REVIEWS_ENABLED,'false');
 assert.equal(Object.hasOwn(config.vars,'AFW_OPERATIONS_WINDOW_EXPIRES_AT'),false);
 assert.deepEqual(config.d1_databases,[{binding:'OPERATIONS_STATE_DB',database_name:'agent-friendly-web-operations',database_id:'603c471d-19bb-4530-9773-c02e18b29840'}]);
 assert.deepEqual(config.ratelimits,[{name:'OPERATIONS_REVIEW_RATE_LIMITER',namespace_id:'2026100502',simple:{limit:10,period:60}}]);
 assert.equal(Object.hasOwn(config.vars,'AFW_OPERATIONS_REVIEW_SUBJECT'),false);
});

test('review QA configuration isolates its synthetic database and remains closed without credentials or routes',()=>{
 const qa=JSON.parse(readFileSync(new URL('../wrangler.operations-review-qa.jsonc',import.meta.url),'utf8'));
 const operational=JSON.parse(readFileSync(new URL('../wrangler.operations-review.jsonc',import.meta.url),'utf8'));
 assert.equal(qa.account_id,operational.account_id);assert.equal(qa.name,'agent-friendly-web-operations-review');assert.equal(qa.main,operational.main);
 assert.deepEqual(qa.d1_databases,[{binding:'OPERATIONS_STATE_DB',database_name:'agent-friendly-web-review-qa-20261005',database_id:'d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46'}]);
 assert.notEqual(qa.d1_databases[0].database_id,operational.d1_databases[0].database_id);
 assert.equal(qa.workers_dev,false);assert.equal(qa.preview_urls,false);assert.deepEqual(qa.routes??[],[]);assert.deepEqual(qa.triggers.crons,[]);
 assert.deepEqual(qa.vars,{AFW_OPERATIONS_REVIEW_ENABLED:'false',AFW_OPERATIONS_REVIEWS_ENABLED:'false'});
 assert.equal(qa.ratelimits[0].simple.limit,10);assert.equal(qa.ratelimits[0].simple.period,60);
 assert.notEqual(qa.ratelimits[0].namespace_id,operational.ratelimits[0].namespace_id);
});
test('real review worker maps server-only human authority and storage into the signed adapter',async()=>{
 const s=operationsDb();try{
  for(const name of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8'));
  const runId=crypto.randomUUID();
  s.sqlite.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').run('afw_delegated_canary',time,time,'paused','healthy',2);
  s.sqlite.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').run('afw_delegated_canary',1,'attention','["delivery_pending"]',time-10000);
  s.sqlite.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').run('afw_delegated_canary',1,'attention','["delivery_pending"]',time-10000,time-10000);
  s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),'afw_delegated_canary',1,time-10000,time-1000,time-1000,'superseded');
  const body={runId,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
  const instance=createOperationsReviewWorker({keySet:publicKey,now:()=>time}),env=environment(s.db),jwt=await token();
  assert.equal((await instance.fetch(request(jwt,body,'https://operations-manager.agentfriendlyweb.dev'),env)).status,404);
  assert.equal((await instance.fetch(request(await token('synthetic-receiver'),body),env)).status,401);
  assert.equal((await instance.fetch(request(jwt,body),{...env,AFW_OPERATIONS_REVIEW_SUBJECT:'another-subject'})).status,401);
  assert.equal((await instance.fetch(request(jwt,body),{...env,AFW_OPERATIONS_REVIEW_AUDIENCE:env.AFW_OPERATIONS_CONSUMER_AUDIENCE})).status,401);
  assert.equal((await instance.fetch(request(jwt,{...body,authorized:true}),env)).status,400);
  assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,0);
  const response=await instance.fetch(request(jwt,body),env);assert.equal(response.status,200);
  assert.deepEqual(await response.json(),{review:{sequence:1,decision:'close_obsolete',reason:'producer_paused',reviewedAt:time}});
  assert.equal(s.sqlite.prepare('SELECT outcome FROM operations_notice_reservations').get().outcome,'superseded');
  assert.match(s.sqlite.prepare('SELECT operator_id FROM operations_notice_reviews').get().operator_id,/^operator-[a-f0-9]{64}$/);
 }finally{s.sqlite.close();}
});
