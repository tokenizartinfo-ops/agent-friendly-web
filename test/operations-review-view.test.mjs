import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {createOperationsReviewWorker,OPERATIONS_REVIEW_ORIGIN} from '../worker/operations-review/index.mjs';
import {reviewContextDb} from './fixtures/notice-review-context-db.mjs';
const now=Date.now(),subject='synthetic-view-human';
const {privateKey,publicKey}=await generateKeyPair('RS256');
async function token(audience='synthetic-view',expires=now+300000){return new SignJWT({email:'synthetic@example.com'}).setSubject(subject).setProtectedHeader({alg:'RS256'}).setIssuer('https://test.cloudflareaccess.com').setAudience(audience).setExpirationTime(Math.floor(expires/1000)).sign(privateKey);}
function env(s){return {...s.env,AFW_OPERATIONS_REVIEW_ENABLED:'true',AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',AFW_OPERATIONS_REVIEW_AUDIENCE:'synthetic-view',AFW_OPERATIONS_CONSUMER_AUDIENCE:'synthetic-service',AFW_OPERATIONS_REVIEW_SUBJECT:subject,OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>({success:true})}};}
function request(jwt,path='/',headers={}){return new Request(OPERATIONS_REVIEW_ORIGIN+path,{headers:{'Cf-Access-Jwt-Assertion':jwt,'Sec-Fetch-Site':'same-origin',...headers}});}
test('view authenticates before reading and forbids cross-site fetch or selectors that broaden storage',async()=>{
 let reads=0,keys=0;const instance=createOperationsReviewWorker({keySet:async()=>{keys++;return publicKey;},now:()=>now});
 const state={...env({env:{}}),AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),OPERATIONS_STATE_DB:{prepare(){reads++;throw Error('private');}}};
 assert.equal((await instance.fetch(request('malformed'),state)).status,401);
 assert.equal((await instance.fetch(request(await token('synthetic-service')),state)).status,401);
 assert.equal((await instance.fetch(request(await token(),'/',{'Sec-Fetch-Site':'cross-site'}),state)).status,403);
 for(const path of ['/?DB=foreign','/?run=invalid','/?run='+crypto.randomUUID()+'&run='+crypto.randomUUID()])assert.equal((await instance.fetch(request(await token(),path),state)).status,400);
 assert.equal(reads,0);assert.equal(keys,1);
});
test('view serves one signed no-store/CSP-protected decision and reload proves its actual saved receipt',async()=>{
 const s=reviewContextDb(now);try{
  const instance=createOperationsReviewWorker({keySet:publicKey,now:()=>now}),state=env(s),jwt=await token();
  const response=await instance.fetch(request(jwt),state);assert.equal(response.status,200);
  assert.match(response.headers.get('content-type'),/text\/html/);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(response.headers.get('referrer-policy'),'no-referrer');assert.equal(response.headers.has('access-control-allow-origin'),false);
  const page=await response.text(),nonce=/nonce="([^"]+)"/.exec(page)[1];assert.match(response.headers.get('content-security-policy'),new RegExp("script-src 'nonce-"+nonce+"'"));assert.match(response.headers.get('content-security-policy'),/frame-ancestors 'none'/);
  assert.match(page,/¿Cómo seguimos con este aviso/);assert.doesNotMatch(page,new RegExp(subject));assert.doesNotMatch(page,/synthetic@example/);
  const body={runId:s.runId,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
  const saved=await instance.fetch(new Request(OPERATIONS_REVIEW_ORIGIN+'/notices/review',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,Origin:OPERATIONS_REVIEW_ORIGIN,'Sec-Fetch-Site':'same-origin','content-type':'application/json'},body:JSON.stringify(body)}),state);assert.equal(saved.status,200);
  const receipt=await instance.fetch(request(jwt,'/?run='+s.runId),state);assert.equal(receipt.status,200);const html=await receipt.text();assert.match(html,/Aviso anterior archivado/);assert.doesNotMatch(html,/data-choice=/);
  assert.match(await (await instance.fetch(request(jwt),state)).text(),/No hay una decisión disponible/);
 }finally{s.sqlite.close();}
});
test('session or window expiring during context read never discloses the snapshot',async()=>{
 for(const phase of ['session','window']){
  const s=reviewContextDb(now);let clock=now;try{
   const db={...s.db,prepare(sql){const statement=s.db.prepare(sql);const oldBind=statement.bind;statement.bind=(...values)=>{const bound=oldBind(...values),oldFirst=bound.first;bound.first=async()=>{const result=await oldFirst();clock=phase==='session'?now+10000:now+300000;return result;};return bound;};return statement;}};
   const response=await createOperationsReviewWorker({keySet:publicKey,now:()=>clock}).fetch(request(await token('synthetic-view',now+10000)),{...env(s),OPERATIONS_STATE_DB:db});
   assert.equal(response.status,phase==='session'?401:404);assert.doesNotMatch(await response.text(),new RegExp(s.runId));
  }finally{s.sqlite.close();}
 }
});

test('review access withdrawal denies a still-valid token without touching storage',async()=>{
 let reads=0;const instance=createOperationsReviewWorker({keySet:publicKey,now:()=>now}),jwt=await token();
 const base={...env({env:{}}),AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),OPERATIONS_STATE_DB:{prepare(){reads++;throw Error('private');}}};
 for(const [change,status] of [[{AFW_OPERATIONS_REVIEW_ENABLED:'false'},404],[{AFW_OPERATIONS_REVIEW_SUBJECT:'withdrawn-human'},401]]){
  const state={...base,...change};assert.equal((await instance.fetch(request(jwt),state)).status,status);
  const write=new Request(OPERATIONS_REVIEW_ORIGIN+'/notices/review',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,Origin:OPERATIONS_REVIEW_ORIGIN,'Sec-Fetch-Site':'same-origin','content-type':'application/json'},body:'{}'});
  assert.equal((await instance.fetch(write,state)).status,status);
 }
 assert.equal(reads,0);
});

test('view rate-limit and key-provider denial fail before any operational read',async()=>{
 let reads=0,keys=0;const jwt=await token(),base={...env({env:{}}),AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),OPERATIONS_STATE_DB:{prepare(){reads++;throw Error('private');}}};
 for(const [limiter,status] of [[undefined,503],[{limit:async()=>({success:false})},429],[{limit:async()=>({})},503],[{limit:async()=>{throw Error('private-limit');}},503]]){
  const instance=createOperationsReviewWorker({keySet:async()=>{keys++;return publicKey;},now:()=>now});
  const response=await instance.fetch(request(jwt),{...base,OPERATIONS_REVIEW_RATE_LIMITER:limiter});assert.equal(response.status,status);assert.doesNotMatch(await response.text(),/private/);
 }
 assert.equal(keys,3);assert.equal(reads,0);
 const response=await createOperationsReviewWorker({keySet:async()=>{throw Error('private-key');},now:()=>now}).fetch(request(jwt),base);
 assert.equal(response.status,503);assert.doesNotMatch(await response.text(),/private/);assert.equal(reads,0);
});

test('top-level navigation accepts a human link while foreign Origin and programmatic reads remain denied',async()=>{
 const s=reviewContextDb(now);try{
  const instance=createOperationsReviewWorker({keySet:publicKey,now:()=>now}),state=env(s),jwt=await token();
  const headers={'Sec-Fetch-Site':'cross-site','Sec-Fetch-Mode':'navigate','Sec-Fetch-Dest':'document'};
  assert.equal((await instance.fetch(request(jwt,'/',headers),state)).status,200);
  assert.equal((await instance.fetch(request(jwt,'/',{...headers,Origin:'https://foreign.invalid'}),state)).status,403);
  assert.equal((await instance.fetch(request(jwt,'/',{...headers,'Sec-Fetch-Mode':'cors'}),state)).status,403);
  assert.equal(s.sqlite.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').get().n,0);
 }finally{s.sqlite.close();}
});
