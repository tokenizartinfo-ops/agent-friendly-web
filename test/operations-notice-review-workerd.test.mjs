import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';

const origin='https://operations-manager.agentfriendlyweb.dev';
const resource='afw_delegated_canary';
async function harness(){
 const {privateKey,publicKey}=await generateKeyPair('RS256');
 const jwk=await exportJWK(publicKey),current=Date.now();
 const config={enabled:true,origin,teamDomain:'test.cloudflareaccess.com',audience:'synthetic-review-workerd',consumerAudience:'synthetic-reception-workerd',subject:'synthetic-human-workerd'};
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
  import {importJWK} from 'jose';
  import {createNoticeReviewControls} from './lib/operations-notice-review-controls.mjs';
  import {createOperationsServiceControls} from './lib/operations-service-controls.mjs';
  const key=await importJWK(${JSON.stringify(jwk)},'RS256');
  const config=${JSON.stringify(config)},now=()=>${current};
  export default {async fetch(request,binding){
   const env={OPERATIONS_STATE_DB:binding.DB,AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_SHARED_BUDGET_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now()+600000).toISOString()};
   const limiter={limit:async()=>({success:true})};
   if(['/notices','/notices/claim','/notices/ack','/notices/receipts'].includes(new URL(request.url).pathname))return createOperationsServiceControls({db:binding.DB,noticeEnv:env,keySet:key,limiter,now,config:{enabled:true,origin:config.origin,teamDomain:config.teamDomain,audience:config.consumerAudience,clientId:'synthetic-reception.access'}})(request);
   return createNoticeReviewControls({env,config,keySet:key,limiter,now})(request);
  }};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'synthetic-notice-review-'+crypto.randomUUID()}}));
 try{
  const db=await runtime.getD1Database('DB');
  await install(db);
  const runId=crypto.randomUUID(),requestId=crypto.randomUUID();
  await seed(db,{runId,requestId,current});
  const token=async({audience=config.audience,subject=config.subject,service=false,expired=false}={})=>new SignJWT(service?{type:'app',common_name:'synthetic-reception.access'}:{email:'synthetic@example.com'}).setSubject(subject).setIssuer('https://'+config.teamDomain).setAudience(audience).setExpirationTime(expired?Math.floor(current/1000)-60:Math.floor(current/1000)+600).setProtectedHeader({alg:'RS256'}).sign(privateKey);
  const jwt=await token(),serviceJwt=await token({audience:config.consumerAudience,subject:'',service:true});
  const body={runId,requestId:crypto.randomUUID(),decision:'retain_block',reason:'investigation_required',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
  const review=(value=body,{assertion=jwt,headers={}}={})=>{
   const metadata={'Cf-Access-Jwt-Assertion':assertion,Origin:origin,'Sec-Fetch-Site':'same-origin','content-type':'application/json',...headers};
   for(const key of Object.keys(metadata))if(metadata[key]===null)delete metadata[key];
   return runtime.dispatchFetch(origin+'/notices/review',{method:'POST',headers:metadata,body:JSON.stringify(value)});
  };
  const notice=(path,value)=>runtime.dispatchFetch(origin+path,{method:value?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':serviceJwt,...(value?{'content-type':'application/json'}:{})},...(value?{body:JSON.stringify(value)}:{})});
  return {runtime,db,runId,requestId,current,config,token,jwt,body,review,notice};
 }catch(error){await runtime.dispose();throw error;}
}
async function install(db){
 for(const name of ['schema','consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews']){
  const sql=readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8').replace(/--[^\n]*/g,'');
  // These actual schemas have simple ordinary statements and BEGIN/END trigger bodies.
  // Extract COMPLETE triggers before splitting ordinary statements; never split their inner semicolons.
  const triggerPattern=/^\s*CREATE TRIGGER\b[\s\S]*?\bEND\s*;/gm;
  const triggers=sql.match(triggerPattern)??[];
  assert.equal(triggers.length,name==='notice-reviews'?2:0);
  const ordinary=sql.replace(triggerPattern,'');
  assert.doesNotMatch(ordinary,/CREATE TRIGGER/i);
  for(const statement of [...ordinary.split(';').map(x=>x.trim()).filter(Boolean),...triggers])await db.prepare(statement).run();
 }
}
async function seed(db,{runId,requestId,current}){
 await db.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').bind(resource,current,current,'paused','healthy',2).run();
 await db.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').bind(resource,1,'attention','["delivery_pending"]',current-10000).run();
 await db.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').bind(resource,1,'attention','["delivery_pending"]',current-10000,current-10000).run();
 await db.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').bind(runId,requestId,resource,1,current-10000,current-1000,current-1000,'superseded').run();
}
async function rows(db,sql,...values){return (await db.prepare(sql).bind(...values).all()).results;}

test('signed workerd operator writes immutable history and journal fences active original revision',async()=>{
 const s=await harness();
 try{
  const original=await rows(s.db,'SELECT * FROM operations_notice_reservations');assert.equal(original.length,1);assert.equal(original[0].outcome,'superseded');
  const retained=await s.review();assert.equal(retained.status,200);
  const value=await retained.json();assert.deepEqual(value,{review:{sequence:1,decision:'retain_block',reason:'investigation_required',reviewedAt:s.current}});
  assert.equal(JSON.stringify(value).includes(s.config.subject),false);assert.equal(JSON.stringify(value).includes(s.jwt),false);
  assert.equal(retained.headers.get('cache-control'),'no-store');assert.equal(retained.headers.has('access-control-allow-origin'),false);
  const replay=await s.review();assert.equal(replay.status,200);assert.deepEqual(await replay.json(),value);
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reservations'),original);
  const closedBody={...s.body,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedSequence:1};
  const closed=await s.review(closedBody);assert.equal(closed.status,200);assert.deepEqual(await closed.json(),{review:{sequence:2,decision:'close_obsolete',reason:'producer_paused',reviewedAt:s.current}});
  assert.equal((await s.review({...s.body,requestId:crypto.randomUUID(),expectedSequence:2})).status,409);
  assert.equal((await s.review({...s.body,reason:'producer_paused',decision:'close_obsolete'})).status,409);
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reservations'),original);
  const journal=await rows(s.db,'SELECT * FROM operations_notice_reviews ORDER BY sequence');assert.equal(journal.length,2);
  const triggers=await rows(s.db,"SELECT name,sql FROM sqlite_master WHERE type='trigger' AND name LIKE 'operations_notice_reviews_%' ORDER BY name");
  assert.deepEqual(triggers.map(x=>x.name),['operations_notice_reviews_no_delete','operations_notice_reviews_no_update']);
  for(const trigger of triggers){assert.match(trigger.sql,/BEGIN/i);assert.match(trigger.sql,/END/i);}
  await assert.rejects(s.db.prepare('UPDATE operations_notice_reviews SET reviewed_at=reviewed_at+1').run(),/Immutable notice review/);
  await assert.rejects(s.db.prepare('DELETE FROM operations_notice_reviews').run(),/Immutable notice review/);
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reviews ORDER BY sequence'),journal);
  // Deliberately restore the original ACTIVE state. Paused state alone would hide a missing journal fence.
  await s.db.prepare('UPDATE operations_watchdog_state SET revision=1,condition=?,changed_at=?,checked_at=? WHERE resource=?').bind('["delivery_pending"]',s.current-10000,s.current,resource).run();
  assert.equal((await s.db.prepare("SELECT COUNT(*) n FROM operations_watchdog_inbox i JOIN operations_watchdog_state s ON s.resource=i.resource AND s.revision=i.revision AND s.condition=i.condition AND s.changed_at=i.observed_at WHERE s.condition<>'paused' AND s.checked_at BETWEEN ? AND ?").bind(s.current-900000,s.current).first()).n,1);
  const listing=await s.notice('/notices');assert.equal(listing.status,200);assert.deepEqual(await listing.json(),{notices:[]});
  assert.equal((await s.notice('/notices/claim',{resource,revision:1,requestId:crypto.randomUUID()})).status,409);
  const ack=await s.notice('/notices/ack',{runId:s.runId});assert.equal(ack.status,200);assert.deepEqual(await ack.json(),{outcome:'superseded'});
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reservations'),original);
  // Pre-fix inconsistent live replacement fixture tests actual claim retry/readback and ACK defenses.
  const replacement={runId:crypto.randomUUID(),requestId:crypto.randomUUID()};
  await s.db.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').bind(replacement.runId,replacement.requestId,resource,1,s.current,s.current+300000,null,null).run();
  const before=await rows(s.db,'SELECT * FROM operations_notice_reservations ORDER BY run_id');
  assert.equal((await s.notice('/notices/claim',{resource,revision:1,requestId:replacement.requestId})).status,409);
  assert.equal((await s.notice('/notices/ack',{runId:replacement.runId})).status,409);
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reservations ORDER BY run_id'),before);
  assert.equal(before.length,2);
  const receipts=await s.notice('/notices/receipts');assert.equal(receipts.status,200);const snapshots=(await receipts.json()).receipts;
  assert.equal(snapshots.length,2);assert.equal(snapshots.find(x=>x.reservation.runId===s.runId).outcome,'superseded');
  assert.equal(snapshots.find(x=>x.reservation.runId===replacement.runId).outcome,null);
 }finally{await s.runtime.dispose();}
});

test('workerd denies unsigned/browser/reception authority and enforces competing operator CAS',async()=>{
 const s=await harness();
 try{
  for(const headers of [{Origin:null},{Origin:'https://foreign.invalid'},{'Sec-Fetch-Site':null},{'Sec-Fetch-Site':'cross-site'}])assert.equal((await s.review(s.body,{headers})).status,403);
  for(const assertion of ['malformed',await s.token({audience:s.config.consumerAudience}),await s.token({audience:[s.config.audience,s.config.consumerAudience]}),await s.token({subject:'synthetic-other-human'}),await s.token({expired:true})])assert.equal((await s.review(s.body,{assertion})).status,401);
  for(const extra of [{operatorId:'forged'},{authorized:true},{DB:'foreign'}])assert.equal((await s.review({...s.body,...extra})).status,400);
  assert.equal((await s.db.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').first()).n,0);
  const original=await rows(s.db,'SELECT * FROM operations_notice_reservations');
  const responses=await Promise.all([s.review(),s.review({...s.body,requestId:crypto.randomUUID()})]);
  assert.deepEqual(responses.map(x=>x.status).sort(),[200,409]);
  assert.equal((await s.db.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').first()).n,1);
  assert.deepEqual(await rows(s.db,'SELECT * FROM operations_notice_reservations'),original);
 }finally{await s.runtime.dispose();}
});
