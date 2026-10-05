import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';

test('actual review entrypoint in workerd persists a receipt and denies a live JWT after capability withdrawal',async()=>{
 const current=Date.now(),origin='https://operations-review.agentfriendlyweb.dev',subject='synthetic-workerd-view';
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk=await exportJWK(publicKey);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
  import {importJWK} from 'jose';
  import {createOperationsReviewWorker} from './worker/operations-review/handler.mjs';
  const key=await importJWK(${JSON.stringify(jwk)},'RS256');
  const worker=createOperationsReviewWorker({keySet:key,now:()=>${current}});
  export default {fetch(request,binding){return worker.fetch(request,{...binding,OPERATIONS_STATE_DB:binding.DB,OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>({success:true})}});}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const bindings={AFW_OPERATIONS_REVIEW_ENABLED:'true',AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',AFW_OPERATIONS_REVIEW_AUDIENCE:'synthetic-view-workerd',AFW_OPERATIONS_CONSUMER_AUDIENCE:'synthetic-service-workerd',AFW_OPERATIONS_REVIEW_SUBJECT:subject,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(current+300000).toISOString()};
 const options={modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'synthetic-review-view-'+crypto.randomUUID()},bindings};
 const runtime=new Miniflare(convertV4MiniflareOptions(options));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of ['schema','consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews']){
   const sql=readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8').replace(/--[^\n]*/g,'');
   const pattern=/^\s*CREATE TRIGGER\b[\s\S]*?\bEND\s*;/gm,triggers=sql.match(pattern)??[];
   assert.equal(triggers.length,name==='notice-reviews'?2:0);
   for(const statement of [...sql.replace(pattern,'').split(';').map(x=>x.trim()).filter(Boolean),...triggers])await db.prepare(statement).run();
  }
  const runId=crypto.randomUUID(),resource='afw_delegated_canary';
  await db.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').bind(resource,current,current,'paused','healthy',2).run();
  await db.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').bind(resource,1,'attention','["delivery_pending"]',current-10000).run();
  await db.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').bind(resource,1,'attention','["delivery_pending"]',current-10000,current-10000).run();
  await db.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').bind(runId,crypto.randomUUID(),resource,1,current-10000,current-1000,current-1000,'superseded').run();
  const jwt=await new SignJWT({email:'synthetic@example.com'}).setSubject(subject).setIssuer('https://test.cloudflareaccess.com').setAudience(bindings.AFW_OPERATIONS_REVIEW_AUDIENCE).setExpirationTime(Math.floor(current/1000)+300).setProtectedHeader({alg:'RS256'}).sign(privateKey);
  const headers={'Cf-Access-Jwt-Assertion':jwt,'Sec-Fetch-Site':'same-origin'};
  const view=()=>runtime.dispatchFetch(origin+'/?run='+runId,{headers});
  const body={runId,requestId:crypto.randomUUID(),decision:'close_obsolete',reason:'producer_paused',expectedRevision:2,expectedCondition:'paused',expectedSequence:0};
  const write=()=>runtime.dispatchFetch(origin+'/notices/review',{method:'POST',headers:{...headers,Origin:origin,'content-type':'application/json'},body:JSON.stringify(body)});
  const page=await view();assert.equal(page.status,200);assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.match(await page.text(),/¿Cómo seguimos con este aviso/);
  const saved=await write();assert.equal(saved.status,200);const receipt=await saved.json();assert.equal(receipt.review.sequence,1);
  const replay=await write();assert.equal(replay.status,200);assert.deepEqual(await replay.json(),receipt);
  const reopened=await view();assert.equal(reopened.status,200);const html=await reopened.text();assert.match(html,/La decisión quedó registrada/);assert.doesNotMatch(html,/data-choice=/);assert.doesNotMatch(html,new RegExp(subject));
  const before=(await db.prepare('SELECT * FROM operations_notice_reservations').all()).results;
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_OPERATIONS_REVIEW_ENABLED:'false'}}));
  assert.equal((await view()).status,404);assert.equal((await write()).status,404);
  const afterDb=await runtime.getD1Database('DB');
  assert.equal((await afterDb.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').first()).n,1);
  assert.deepEqual((await afterDb.prepare('SELECT * FROM operations_notice_reservations').all()).results,before);
 }finally{await runtime.dispose();}
});

