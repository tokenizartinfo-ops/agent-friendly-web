import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';

test('real workerd limiter returns 429, foreign-origin POST cannot write, and closing denies a live JWT',async()=>{
 const now=Date.now(),origin='https://operations-review.agentfriendlyweb.dev',subject='synthetic-real-limiter';
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk=await exportJWK(publicKey);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
  import {importJWK} from 'jose';
  import {createOperationsReviewWorker} from './worker/operations-review/handler.mjs';
  const worker=createOperationsReviewWorker({keySet:await importJWK(${JSON.stringify(jwk)},'RS256'),now:()=>${now}});
  export default {fetch(request,env){return worker.fetch(request,env);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const bindings={AFW_OPERATIONS_REVIEW_ENABLED:'true',AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',AFW_OPERATIONS_REVIEW_AUDIENCE:'synthetic-real-limiter',AFW_OPERATIONS_CONSUMER_AUDIENCE:'synthetic-consumer',AFW_OPERATIONS_REVIEW_SUBJECT:subject};
 const options={modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,bindings,d1Databases:{OPERATIONS_STATE_DB:'synthetic-real-limiter-'+crypto.randomUUID()},ratelimits:{OPERATIONS_REVIEW_RATE_LIMITER:{namespace_id:'synthetic-'+crypto.randomUUID(),simple:{limit:10,period:60}}}};
 const runtime=new Miniflare(convertV4MiniflareOptions(options));
 try{
  const db=await runtime.getD1Database('OPERATIONS_STATE_DB');
  for(const name of ['schema','consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews']){
   const sql=readFileSync(new URL(`../worker/operations/${name}.sql`,import.meta.url),'utf8').replace(/--[^\n]*/g,'');
   const pattern=/^\s*CREATE TRIGGER\b[\s\S]*?\bEND\s*;/gm,triggers=sql.match(pattern)??[];
   for(const statement of [...sql.replace(pattern,'').split(';').map(x=>x.trim()).filter(Boolean),...triggers])await db.prepare(statement).run();
  }
  const jwt=await new SignJWT({email:'synthetic@example.com'}).setSubject(subject).setIssuer('https://test.cloudflareaccess.com').setAudience(bindings.AFW_OPERATIONS_REVIEW_AUDIENCE).setExpirationTime(Math.floor(now/1000)+300).setProtectedHeader({alg:'RS256'}).sign(privateKey);
  const headers={'Cf-Access-Jwt-Assertion':jwt,'Sec-Fetch-Site':'same-origin'};
  const foreign=await runtime.dispatchFetch(origin+'/notices/review',{method:'POST',headers:{...headers,Origin:'https://foreign.example','content-type':'application/json'},body:'{}'});
  assert.equal(foreign.status,403);assert.deepEqual(await foreign.json(),{code:'same_origin_required'});
  for(let i=0;i<10;i++)assert.equal((await runtime.dispatchFetch(origin+'/',{headers})).status,200);
  const limited=await runtime.dispatchFetch(origin+'/',{headers});assert.equal(limited.status,429);assert.deepEqual(await limited.json(),{code:'try_later'});
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').first()).n,0);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_OPERATIONS_REVIEW_ENABLED:'false'}}));
  const closed=await runtime.dispatchFetch(origin+'/',{headers});assert.equal(closed.status,404);assert.deepEqual(await closed.json(),{code:'unavailable'});
  const deniedWrite=await runtime.dispatchFetch(origin+'/notices/review',{method:'POST',headers:{...headers,Origin:origin,'content-type':'application/json'},body:'{}'});assert.equal(deniedWrite.status,404);
  const after=await runtime.getD1Database('OPERATIONS_STATE_DB');assert.equal((await after.prepare('SELECT COUNT(*) n FROM operations_notice_reviews').first()).n,0);
 }finally{await runtime.dispose();}
});
