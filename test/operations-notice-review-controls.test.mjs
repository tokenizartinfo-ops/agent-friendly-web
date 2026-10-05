import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {operationsDb} from './fixtures/operations-db.mjs';
import {createNoticeReviewControls} from '../lib/operations-notice-review-controls.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'synthetic-review',consumerAudience:'synthetic-reception',subject:'synthetic-human'};
const initialTime=Math.floor(Date.now()/1000)*1000;
async function jwt({subject=config.subject,audience=config.audience,expiresAt=initialTime+300000,issuer='https://'+config.teamDomain}={}){
 return new SignJWT({email:'synthetic@example.com'}).setProtectedHeader({alg:'RS256'}).setIssuer(issuer).setAudience(audience).setSubject(subject).setExpirationTime(Math.floor(expiresAt/1000)).sign(privateKey);
}
function setup(){
 const s=operationsDb();for(const n of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${n}.sql`,import.meta.url),'utf8'));
 const runId=crypto.randomUUID();
 s.sqlite.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').run('afw_delegated_canary',initialTime,initialTime,'paused','healthy',2);
 s.sqlite.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').run('afw_delegated_canary',1,'attention','["delivery_pending"]',initialTime-10000);
 s.sqlite.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').run('afw_delegated_canary',1,'attention','["delivery_pending"]',initialTime-10000,initialTime-10000);
 s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),'afw_delegated_canary',1,initialTime-10000,initialTime-1000,initialTime-1000,'superseded');
 const body={runId,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
 const env={OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(initialTime+600000).toISOString()};
 return {...s,body,env,options:{env,config,keySet:publicKey,limiter:{limit:async()=>({success:true})},now:()=>initialTime}};
}
function request(token,body,{path='/notices/review',method='POST',headers={},stream}={}){
 const metadata={'Cf-Access-Jwt-Assertion':token,Origin:config.origin,'Sec-Fetch-Site':'same-origin','content-type':'application/json',...headers};
 for(const key of Object.keys(metadata))if(metadata[key]===null)delete metadata[key];
 return new Request(config.origin+path,{method,headers:metadata,...(method==='POST'?{body:stream??JSON.stringify(body),...(stream?{duplex:'half'}:{})}:{})});
}
function count(s){return s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n;}
function assertResponse(response,status){assert.equal(response.status,status);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(response.headers.get('content-type'),'application/json');assert.equal(response.headers.has('access-control-allow-origin'),false);}

test('closed gate and invalid limiter deny before key, body, limiter or DB IO',async()=>{
 let io=0;const keySet=async()=>{io++;throw Error('private-provider');};const limiter={limit:async()=>{io++;throw Error('private-limiter');}};
 const env={AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(initialTime+600000).toISOString(),OPERATIONS_STATE_DB:{prepare(){io++;}}};
 const req={url:config.origin+'/notices/review',method:'POST',headers:new Headers({Origin:config.origin,'Sec-Fetch-Site':'same-origin'}),get body(){io++;throw Error('private-body');}};
 for(const patch of [{config:{...config,enabled:false}},{env:{...env,AFW_OPERATIONS_REVIEWS_ENABLED:'false'}},{env:{...env,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(initialTime).toISOString()}}])assertResponse(await createNoticeReviewControls({env,config,keySet,limiter,now:()=>initialTime,...patch})(req),404);
 assertResponse(await createNoticeReviewControls({env,config,keySet,now:()=>initialTime})(req),503);assert.equal(io,0);
});
test('path and method contract is closed and JSON no-store',async()=>{const s=setup();try{const handle=createNoticeReviewControls(s.options),token=await jwt();for(const path of ['/notices/review?query=1','/other'])assertResponse(await handle(request(token,s.body,{path})),404);const response=await handle(request(token,s.body,{method:'GET'}));assertResponse(response,405);assert.equal(response.headers.get('allow'),'POST');assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('missing or foreign browser metadata denies before resolving identity or limiter',async()=>{const s=setup();let io=0;try{const handle=createNoticeReviewControls({...s.options,keySet:async()=>{io++;return publicKey;},limiter:{limit:async()=>{io++;return {success:true};}}});for(const headers of [{Origin:null},{Origin:'https://evil.example'},{'Sec-Fetch-Site':null},{'Sec-Fetch-Site':'cross-site'},{'Sec-Fetch-Site':'same-site'}])assertResponse(await handle(request(await jwt(),s.body,{headers})),403);assert.equal(io,0);assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('signed reception, multiple audiences, wrong subject, issuer and expired identity cannot review',async()=>{const s=setup();let limits=0;try{const handle=createNoticeReviewControls({...s.options,limiter:{limit:async()=>{limits++;return {success:true};}}});for(const claims of [{audience:config.consumerAudience},{audience:[config.audience,config.consumerAudience]},{subject:'another-human'},{issuer:'https://other.cloudflareaccess.com'},{expiresAt:initialTime-1000}])assertResponse(await handle(request(await jwt(claims),s.body)),401);assert.equal(limits,0);assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('signed operator records exactly one immutable decision and replay has trusted opaque limiter actor',async()=>{const s=setup();const keys=[];try{const handle=createNoticeReviewControls({...s.options,limiter:{limit:async input=>{keys.push(input.key);return {success:true};}}}),token=await jwt();const before=s.sqlite.prepare('SELECT * FROM operations_notice_reservations').get();const response=await handle(request(token,s.body));assertResponse(response,200);const value=await response.json();assert.deepEqual(Object.keys(value),['review']);assert.deepEqual(Object.keys(value.review).sort(),['decision','reason','reviewedAt','sequence']);const replay=await handle(request(token,s.body));assertResponse(replay,200);assert.deepEqual(await replay.json(),value);assert.equal(count(s),1);assert.match(keys[0],/^operator-[a-f0-9]{64}$/);assert.equal(keys[0],keys[1]);assert.equal(s.sqlite.prepare('SELECT operator_id FROM operations_notice_reviews').get().operator_id,keys[0]);assert.deepEqual(s.sqlite.prepare('SELECT * FROM operations_notice_reservations').get(),before);assert.equal(JSON.stringify(value).includes(config.subject),false);}finally{s.sqlite.close();}});
test('untrusted authorization fields reject, snapshot or request conflict returns409, retain can close later',async()=>{const s=setup();try{const handle=createNoticeReviewControls(s.options),token=await jwt();for(const extra of [{operatorId:'forged'},{authorized:true},{DB:'foreign'},{origin:'foreign'},{role:'operator'}])assertResponse(await handle(request(token,{...s.body,...extra})),400);assertResponse(await handle(request(token,{...s.body,expectedRevision:3})),409);const retained={...s.body,decision:'retain_block',reason:'investigation_required'};assertResponse(await handle(request(token,retained)),200);assertResponse(await handle(request(token,{...s.body,expectedSequence:1,requestId:crypto.randomUUID()})),200);assertResponse(await handle(request(token,{...s.body,expectedSequence:2,requestId:crypto.randomUUID()})),409);assert.equal(count(s),2);assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reservations').get().n,1);}finally{s.sqlite.close();}});
test('limiter denial/error and storage error are sane and never confirm a review',async()=>{const s=setup();try{const token=await jwt();assertResponse(await createNoticeReviewControls({...s.options,limiter:{limit:async()=>({success:false})}})(request(token,s.body)),429);const unavailable=await createNoticeReviewControls({...s.options,limiter:{limit:async()=>{throw Error('private-limiter');}}})(request(token,s.body));assertResponse(unavailable,503);assert.equal((await unavailable.text()).includes('private-limiter'),false);s.failBatchAt(0);const storage=await createNoticeReviewControls(s.options)(request(token,s.body));assertResponse(storage,503);assert.equal((await storage.text()).includes('synthetic storage fault'),false);assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('oversized body is rejected and stream cancelled without journal IO',async()=>{
 const s=setup();let cancelled=0;try{
  const bytes=new TextEncoder().encode(' '.repeat(1025)+JSON.stringify(s.body));
  const stream=new ReadableStream({start(controller){controller.enqueue(bytes);},cancel(){cancelled++;}},{highWaterMark:0});
  const handle=createNoticeReviewControls({...s.options,bodyTimeoutMs:10});
  // Complete the stream for an unbounded implementation, so RED cannot hang.
  const complete=new ReadableStream({start(controller){controller.enqueue(bytes);controller.close();}});
  assertResponse(await handle(request(await jwt(),s.body,{stream:complete})),413);
  assertResponse(await handle(request(await jwt(),s.body,{stream})),413);
  assert.equal(cancelled,1);assert.equal(count(s),0);
 }finally{s.sqlite.close();}
});
test('stuck body times out and cancels without echoing data or waiting for cancellation',async()=>{
 const s=setup();let cancelled=0,controller,timer;try{
  const stream=new ReadableStream({start(c){controller=c;},cancel(){cancelled++;return new Promise(()=>{});}});
  const handle=createNoticeReviewControls({...s.options,bodyTimeoutMs:10});
  const response=await Promise.race([handle(request(await jwt(),s.body,{stream})),new Promise(resolve=>{timer=setTimeout(()=>resolve(Response.json({code:'test_timeout'},{status:500})),200);})]);
  assertResponse(response,408);assert.equal(cancelled,1);assert.equal(count(s),0);
 }finally{clearTimeout(timer);try{controller.close();}catch{}s.sqlite.close();}
});
test('JSON media, invalid UTF8, malformed JSON and nonobject bodies fail generically',async()=>{
 const s=setup();try{const handle=createNoticeReviewControls(s.options),token=await jwt();assertResponse(await handle(request(token,s.body,{headers:{'content-type':'text/plain'}})),415);
 for(const bytes of [new Uint8Array([0xc3,0x28]),new TextEncoder().encode('{private-body'),new TextEncoder().encode('null'),new TextEncoder().encode('[]')]){
  const stream=new ReadableStream({start(controller){controller.enqueue(bytes);controller.close();}});
  const response=await handle(request(token,s.body,{stream}));assertResponse(response,400);assert.equal((await response.text()).includes('private-body'),false);
 }
 assert.equal(count(s),0);}finally{s.sqlite.close();}
});
test('identity expiring during limiter or body awaits cannot persist',async()=>{
 for(const phase of ['limiter','body']){
  const s=setup();let clock=initialTime;
  try{const expiry=initialTime+30000,token=await jwt({expiresAt:expiry});
   const options={...s.options,now:()=>clock,limiter:{limit:async()=>{if(phase==='limiter')clock=expiry;return {success:true};}}};
   const stream=phase==='body'?new ReadableStream({pull(controller){clock=expiry;controller.enqueue(new TextEncoder().encode(JSON.stringify(s.body)));controller.close();}},{highWaterMark:0}):undefined;
   assertResponse(await createNoticeReviewControls(options)(request(token,s.body,{stream})),401);assert.equal(count(s),0);
  }finally{s.sqlite.close();}
 }
});
test('fresh identity expiration is checked after final awaited key resolution',async()=>{
 const s=setup();let clock=initialTime,keys=0;try{const expiry=initialTime+30000;
 const handle=createNoticeReviewControls({...s.options,now:()=>clock,keySet:async()=>{if(++keys===2)clock=expiry;return publicKey;}});
 assertResponse(await handle(request(await jwt({expiresAt:expiry}),s.body)),401);assert.equal(keys,2);assert.equal(count(s),0);
 }finally{s.sqlite.close();}
});
test('window closing during identity, limiter, body or final identity awaits blocks persistence',async()=>{
 for(const phase of ['identity','limiter','body','final_identity']){
  const s=setup();let clock=initialTime,keys=0;const deadline=initialTime+600000;
  try{const handle=createNoticeReviewControls({...s.options,now:()=>clock,keySet:async()=>{keys++;if(phase==='identity'||(phase==='final_identity'&&keys===2))clock=deadline;return publicKey;},limiter:{limit:async()=>{if(phase==='limiter')clock=deadline;return {success:true};}}});
   const stream=phase==='body'?new ReadableStream({pull(controller){clock=deadline;controller.enqueue(new TextEncoder().encode(JSON.stringify(s.body)));controller.close();}},{highWaterMark:0}):undefined;
   assertResponse(await handle(request(await jwt(),s.body,{stream})),404);assert.equal(count(s),0);
  }finally{s.sqlite.close();}
 }
});
test('key provider failure is unavailable without revealing provider error',async()=>{const s=setup();try{const response=await createNoticeReviewControls({...s.options,keySet:async()=>{throw Error('private-key-provider');}})(request(await jwt(),s.body));assertResponse(response,503);assert.equal((await response.text()).includes('private-key-provider'),false);assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('journal insert fences state, ACK and replacement lease races through signed adapter',async()=>{
 for(const race of ['state','ack','lease']){
  const s=setup();try{
   let body=s.body;
   if(race==='lease'){
    s.sqlite.exec(`UPDATE operations_notice_reservations SET outcome=NULL,acknowledged_at=NULL;UPDATE operations_watchdog_state SET revision=1,condition='["delivery_pending"]',changed_at=${initialTime-10000}`);
    body={...body,decision:'close_expired_unconfirmed',reason:'expired_unconfirmed',expectedRevision:1,expectedCondition:'["delivery_pending"]'};
   }
   const db={...s.db,batch:async statements=>{
    if(race==='state')s.sqlite.exec('UPDATE operations_watchdog_state SET revision=3');
    if(race==='ack')s.sqlite.exec("UPDATE operations_notice_reservations SET outcome='accepted'");
    if(race==='lease')s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(crypto.randomUUID(),crypto.randomUUID(),'afw_delegated_canary',1,initialTime,initialTime+1000,null,null);
    return s.db.batch(statements);
   }};
   const response=await createNoticeReviewControls({...s.options,env:{...s.env,OPERATIONS_STATE_DB:db}})(request(await jwt(),body));assertResponse(response,409);assert.equal(count(s),0);
   assert.equal(s.sqlite.prepare('SELECT outcome FROM operations_notice_reservations WHERE run_id=?').get(s.body.runId).outcome,race==='ack'?'accepted':race==='lease'?null:'superseded');
  }finally{s.sqlite.close();}
 }
});
test('provider error text cannot spoof input/conflict statuses',async()=>{const s=setup();try{for(const message of ['Invalid review input','Review conflict']){const response=await createNoticeReviewControls({...s.options,limiter:{limit:async()=>{throw Error(message);}}})(request(await jwt(),s.body));assertResponse(response,503);assert.equal((await response.text()).includes(message),false);}assert.equal(count(s),0);}finally{s.sqlite.close();}});
test('concurrent signed operator decisions preserve CAS and the original reservation',async()=>{const s=setup();try{const token=await jwt(),handle=createNoticeReviewControls(s.options),before=s.sqlite.prepare('SELECT * FROM operations_notice_reservations').get();const responses=await Promise.all([handle(request(token,s.body)),handle(request(token,{...s.body,requestId:crypto.randomUUID()}))]);assert.deepEqual(responses.map(x=>x.status).sort(),[200,409]);assert.equal(count(s),1);assert.deepEqual(s.sqlite.prepare('SELECT * FROM operations_notice_reservations').get(),before);}finally{s.sqlite.close();}});
