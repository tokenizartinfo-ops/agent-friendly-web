import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
import {recordAssistanceEvent} from '../lib/assistance-supervision-delivery.mjs';
test('native authenticated help review recovers a lost claim, finishes once and denies withdrawal',async()=>{
 const time=Date.now(),origin='https://operations-manager.agentfriendlyweb.dev';
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk=await exportJWK(publicKey);
 const token=await new SignJWT({type:'app',common_name:'synthetic-native.access'}).setProtectedHeader({alg:'RS256'}).setIssuer('https://test.cloudflareaccess.com').setAudience('synthetic-native').setSubject('').setExpirationTime('5m').sign(privateKey);
 const signal=await projectAssistanceSignal({id:'help-'+'a'.repeat(64),projectId:'qa-project',type:'assistance_requested',createdAt:new Date(time).toISOString(),payload:{contract:'afw.assistance-request.v1',requestId:crypto.randomUUID(),expectedRevision:3,topic:'orientation'}},'synthetic-native-help-review-secret-minimum-32');
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {importJWK} from 'jose';
 import {createOperationsServiceControls} from './lib/operations-service-controls.mjs';
 const key=await importJWK(${JSON.stringify(jwk)},'RS256');let closed=false;
 export default {async fetch(request,b){
 if(new URL(request.url).pathname==='/qa-close'){closed=true;return Response.json({closed});}
 const env={AFW_ASSISTANCE_SUPERVISION_ENABLED:closed?'false':'true',AFW_OPERATIONS_SHARED_ASSISTANCE_BUDGET_ENABLED:'true',AFW_ASSISTANCE_PROJECT_REFS:JSON.stringify(['${signal.projectRef}']),AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(${time}+60000).toISOString()};
 return createOperationsServiceControls({db:b.DB,keySet:key,now:()=>${time},noticeEnv:env,limiter:{limit:async()=>({success:true})},config:{enabled:true,origin:'${origin}',teamDomain:'test.cloudflareaccess.com',audience:'synthetic-native',clientId:'synthetic-native.access'}})(request);
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'native-help-review-ledger'}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of ['schema','consumer-state','notice-reservations','dossier-supervision','assistance-supervision','assistance-supervision-runs'])for(const sql of readFileSync('worker/operations/'+name+'.sql','utf8').replace(/--[^\n]*/g,'').split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  await recordAssistanceEvent(db,signal,time);
  const call=async(path,body)=>runtime.dispatchFetch(origin+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token,...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
  assert.deepEqual(await(await call('/assistance')).json(),{signals:[signal]});
  const request={eventId:signal.eventId,requestId:crypto.randomUUID()};
  const lost=await call('/assistance/claim',request);assert.equal(lost.status,200);await lost.body.cancel();
  const replay=await call('/assistance/claim',request);assert.equal(replay.status,200);const {reservation}=await replay.json();
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_supervision_runs').first()).n,1);
  assert.deepEqual(await(await call('/assistance/finish',{runId:reservation.runId,outcome:'reviewed'})).json(),{outcome:'reviewed'});
  assert.deepEqual(await(await call('/assistance/finish',{runId:reservation.runId,outcome:'reviewed'})).json(),{outcome:'reviewed'});
  assert.deepEqual(await(await call('/assistance')).json(),{signals:[]});
  await call('/qa-close');assert.equal((await call('/assistance')).status,404);
 }finally{await runtime.dispose();}
});
