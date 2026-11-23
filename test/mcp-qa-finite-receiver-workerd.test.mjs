import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteDossierChannelTag} from '../lib/mcp-qa-finite-dossier-channel.mjs';
import {signMcpVerification} from '../lib/mcp-signed-envelope.mjs';
import {readFileSync} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {saveOwnSyntheticGoal} from '../lib/mcp-own-synthetic-save.mjs';
import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
import {ownSubscriptionReceiptFields} from '../lib/mcp-own-subscription-receipt.mjs';
import {createPrivateQaFiniteCoupledRestorer} from '../lib/mcp-qa-finite-coupled-restorer.mjs';
import {verifyFiniteCoupledQaTrialResult} from '../scripts/run-qa-finite-coupled-restore.mjs';
import {finiteCoupledRestoreFixture} from './fixtures/mcp-qa-finite-coupled-restorer.mjs';

const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('one isolated occurrence boots, reviews and withdraws one notice before verifying simulated restoration',async()=>{
 const {privateKey,publicKey}=await generateKeyPair('RS256'),kid='finite-review-workerd-test';
 const jwk={...await exportJWK(publicKey),kid,alg:'RS256'};
 const access={team:'afw-review-fixture.cloudflareaccess.com',audience:'synthetic-finite-review',client:'synthetic-review.access'};
 const jwt=await new SignJWT({type:'app',common_name:access.client}).setProtectedHeader({alg:'RS256',kid})
  .setIssuer('https://'+access.team).setAudience(access.audience).setSubject('').setExpirationTime('5m').sign(privateKey);
 const actorHash=createHash('sha256').update(JSON.stringify(['afw.finite-dossier-review-actor.v1',access.team,access.audience,access.client])).digest('hex');
 const startAt=Date.now()-2000,projectId='oauth-canary-owner',idempotencyKey='11111111-1111-4111-8111-111111111111';
 const savedId=digest(['afw.own-synthetic-save.v1','owner',projectId,idempotencyKey]);
 const signal=await projectDossierEvent({id:savedId,projectId,type:'project_updated',revision:2,
  createdAt:new Date(startAt).toISOString()},'z'.repeat(32));
 const callbackKey='whsec_'+Buffer.alloc(32,7).toString('base64');
 const policy={purpose:'afw.finite-dossier-review-policy.v1',projectRef:signal.projectRef,eventId:signal.eventId,
  controlHash:'3'.repeat(64),actorHash,executionHash:'5'.repeat(64),revision:2,startAt,
  reviewBefore:startAt+90000,readBefore:startAt+120000};
 const resultHash='6'.repeat(64);
 const buildOptions={bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*','cloudflare:*']};
 const [qa,receiver]=await Promise.all([
  build({...buildOptions,stdin:{resolveDir:process.cwd(),contents:`
   import {observePrivateQaFiniteDossierReview} from './lib/mcp-qa-finite-dossier-review.mjs';
   export default {async fetch(request,env){
    const path=new URL(request.url).pathname;
    if(path==='/channel'){
     const result=await env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER.verifyChannel(await request.json());
     return Response.json(result);
    }
    const notice=await request.json();
    const control={controlHash:${JSON.stringify(policy.controlHash)},plan:{T0:${startAt},C0:${policy.reviewBefore},selectors:{expectedProjectRevision:1}}};
    const completion={notice};
    return Response.json({receipt:await observePrivateQaFiniteDossierReview({env,control,completion,check:Date.now})});
   }};`}}),
  build({...buildOptions,mainFields:['module','main'],entryPoints:['worker/operations-manager/index.mjs']}),
 ]);
 const opts={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']};
 let keyReads=0;
 const runtime=new Miniflare(convertV4MiniflareOptions({workers:[
  {...opts,name:'qa',script:qa.outputFiles[0].text,serviceBindings:{AFW_FINITE_DOSSIER_REVIEW_RECEIVER:{name:'receiver',entrypoint:'FiniteDossierReviews'}}},
  {...opts,name:'receiver',script:receiver.outputFiles[0].text,d1Databases:{OPERATIONS_DB:'finite-review-ledger'},
   outboundService:async request=>{
    assert.equal(request.method,'GET');
    assert.equal(request.url,'https://'+access.team+'/cdn-cgi/access/certs');
    keyReads++;return Response.json({keys:[jwk]});
   },
   ratelimits:{OPERATIONS_RATE_LIMITER:{namespace_id:'finite-review-workerd-test',simple:{limit:10,period:60}}},
   bindings:{AFW_OPERATIONS_CONSUMER_ENABLED:'true',AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:access.team,
    AFW_OPERATIONS_CONSUMER_AUDIENCE:access.audience,AFW_OPERATIONS_CONSUMER_CLIENT_ID:access.client,
    AFW_DOSSIER_FINITE_REVIEW_ENABLED:'true',AFW_DOSSIER_FINITE_REVIEW_ISOLATED:'true',AFW_DOSSIER_SUPERVISION_ENABLED:'true',
    AFW_DOSSIER_FINITE_CALLBACK_ENABLED:'true',AFW_DOSSIER_FINITE_CALLBACK_SECRET:callbackKey,
    AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(policy.reviewBefore).toISOString(),AFW_DOSSIER_PROJECT_REFS:JSON.stringify([policy.projectRef]),
    AFW_DOSSIER_FINITE_REVIEW_POLICY:JSON.stringify(policy)}},
 ]}));
 let source;
 const callbacks=[];
 try{
  const db=await runtime.getD1Database('OPERATIONS_DB','receiver');
  const schema=readFileSync('worker/operations/dossier-supervision.sql','utf8').replace(/--[^\n]*/g,'');
  for(const sql of schema.split(';').map(x=>x.trim()).filter(Boolean))await db.prepare(sql).run();
  const receiptSchema=readFileSync('worker/operations/dossier-supervision-finite-reviews.sql','utf8').replace(/--[^\n]*/g,'');
  for(const statement of receiptSchema.split(/(?=^CREATE TRIGGER)/m))await db.prepare(statement.trim()).run();
  const handler=await runtime.getWorker('receiver'),origin='https://finite-review-qa.agentfriendlyweb.dev';
  const endpoint=origin+'/mcp/finite-dossier-callback';

  const nonce=Buffer.alloc(32,9).toString('base64url');
  const channel=async (key,eventId=policy.eventId,wrongTag=false)=>{
   const refs={challenge:nonce,projectRef:policy.projectRef,eventId,controlHash:policy.controlHash,revision:policy.revision};
   const tag=wrongTag?'7'.repeat(64):finiteDossierChannelTag(refs);
   const envelope=signMcpVerification(nonce,'verify_'+tag,'sub_'+tag,key,Date.now());
   const response=await runtime.dispatchFetch('https://qa-receiver.invalid/channel',{method:'POST',
    body:JSON.stringify({...refs,envelope})});
   assert.equal(response.status,200);return response.json();
  };
  assert.deepEqual(await channel(callbackKey),{verified:true,challenge:nonce});
  assert.deepEqual(await channel('whsec_'+Buffer.alloc(32,8).toString('base64')),{verified:false});
  assert.deepEqual(await channel(callbackKey,'f'.repeat(64)),{verified:false});
  assert.deepEqual(await channel(callbackKey,policy.eventId,true),{verified:false});
  const before=await db.prepare('SELECT count(*) AS n FROM dossier_supervision_events').first();
  assert.equal(before.n,0);
  source=await syntheticSaveFixture({projectId,windowMs:90000,
   delivery:{mode:'webhook',url:endpoint,secret:callbackKey},
   async sendCallback(url,envelope){
    assert.equal(url,endpoint);
    const reply=await handler.fetch(url,{method:'POST',headers:envelope.headers,body:envelope.body});
    callbacks.push(reply.status);
    return {status:reply.status,body:await reply.text()};
   },
  });
  assert.equal(source.boots(),1);
  assert.deepEqual(callbacks,[200]);
  assert.equal(source.config.ctx.container.running,true);
  source.config.db.withSession=name=>{assert.equal(name,'first-primary');return source.config.db;};
  const saved=await saveOwnSyntheticGoal(source.options,{expectedRevision:1,idempotencyKey,goal:'discovery'});
  assert.equal(saved.status,200);
  assert.equal(saved.eventId,savedId);
  const subscription=source.db.prepare('SELECT * FROM dossier_event_subscription_receipts').get();
  const receiptHash=digest(Object.fromEntries(ownSubscriptionReceiptFields.map(key=>[key,subscription[key]])));
  const fingerprint=digest(['afw.own-synthetic-save.v1','g',1,'discovery']);
  const boundary=new AbortController();
  const assertCurrent=()=>assert.equal(boundary.signal.aborted,false);
  const input={notice:{eventId:saved.eventId,revision:saved.revision,fingerprint,
   subscriptionReceiptHash:receiptHash,processReceiptHash:null},assertCurrent,recheck:async()=>{},
   deliveryDeadline:source.config.window.expiresAt-1};
  const sent=await source.host.deliverFiniteOwnSaved(input);
  assert.equal(sent.eventId,policy.eventId);
  assert.deepEqual(callbacks,[200,202]);
  const auth={'Cf-Access-Jwt-Assertion':jwt};
  const post=(path,value,headers=auth)=>handler.fetch(origin+path,{
   method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(value),
  });
  const list=await handler.fetch(origin+'/dossiers',{headers:auth});
  assert.equal(list.status,200);
  assert.deepEqual((await list.json()).signals.map(signal=>signal.eventId),[policy.eventId]);
  const claimBody={eventId:policy.eventId,requestId:randomUUID()};
  const unsigned=await post('/dossiers/claim',claimBody,{});
  assert.equal(unsigned.status,401);await unsigned.body.cancel();
  const claimed=await post('/dossiers/claim',claimBody);
  assert.equal(claimed.status,200);
  const {reservation:{runId}}=await claimed.json();
  const complete={runId,outcome:'reviewed',review:{eventId:policy.eventId,executionHash:policy.executionHash,resultHash}};
  const substituted=await post('/dossiers/finish',{...complete,review:{...complete.review,eventId:'f'.repeat(64)}});
  assert.equal(substituted.status,409);await substituted.body.cancel();
  const finished=await post('/dossiers/finish',complete);
  assert.equal(finished.status,200);
  const {receipt,outcome}=await finished.json();
  assert.equal(outcome,'reviewed');
  assert.equal(receipt.resultHash,resultHash);
  assert.equal(receipt.runId,runId);
  const row=await db.prepare('SELECT received_at AS receivedAt FROM dossier_supervision_events WHERE event_id=?').bind(policy.eventId).first();
  assert.equal(receipt.receivedAt,row.receivedAt);
  assert.equal(keyReads,1);
  const {receivedAt,reviewedAt}=receipt;
  const read=async notice=>{
   const response=await runtime.dispatchFetch('https://qa-receiver.invalid/read',{
    method:'POST',body:JSON.stringify(notice),
   });
   assert.equal(response.status,200);return (await response.json()).receipt;
  };
  source.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?')
   .run(new Date().toISOString(),'g');
  const withdrawn=await source.host.withdrawFiniteSubscription({
   signal:boundary.signal,assertCurrent,expiresAt:Date.now()+5000,
  },{id:saved.eventId,revision:saved.revision});
  assert.equal(withdrawn.eventId,sent.eventId);
  assert.equal(withdrawn.subscriptionHash,createHash('sha256').update(subscription.subscription_id).digest('hex'));
  assert.equal(withdrawn.withdrawn,true);
  assert.deepEqual(withdrawn.httpReceipt,{status:202,httpReceivedAt:sent.httpReceivedAt});
  assert.equal(await read({...withdrawn,eventId:'e'.repeat(64)}),null);
  assert.equal(await read({...withdrawn,withdrawn:false}),null);
  const review=await read(withdrawn);
  assert.deepEqual(review,{purpose:'afw.finite-dossier-review.v1',eventId:policy.eventId,controlHash:policy.controlHash,
   actorHash:policy.actorHash,executionHash:policy.executionHash,resultHash,runId,revision:policy.revision,receivedAt,reviewedAt});
  await source.host.close();
  assert.equal(source.config.ctx.container.running,false);
  assert.ok(source.db.prepare('SELECT 1 FROM dossier_node_process_closures WHERE grant_id=?').get('g'));
  await assert.rejects(source.host.deliverFiniteOwnSaved(input));
  assert.equal(source.boots(),1);
  assert.deepEqual(callbacks,[200,202]);

  const noticeEvidence={purpose:'afw.finite-coupled-notice-evidence.v1',completionHash:digest({withdrawn,review}),
   startAt,closeAt:startAt+240000,notice:withdrawn,review};
  // Advance only the simulated provider clock. Workerd supplied the actual
  // review and withdrawal from this occurrence. No provider call is made.
  const restore=finiteCoupledRestoreFixture({at:startAt+600000,controlHash:policy.controlHash,noticeEvidence});
  const result=await createPrivateQaFiniteCoupledRestorer(restore.deps).run();
  const accepted=verifyFiniteCoupledQaTrialResult(result,restore.intent);
  assert.equal(accepted.sameNoticeReviewed,true);
  assert.equal(accepted.subscriptionWithdrawn,true);
  assert.equal(accepted.qaRestored,true);
  assert.equal(accepted.operationalReadiness,false);
  assert.deepEqual(result.noticeEvidence,noticeEvidence);
  assert.equal(restore.claims,1);assert.equal(restore.writes,1);assert.equal(restore.readback,1);
 }finally{
  try{if(source?.config.ctx.container.running)await source.host.close();}
  finally{source?.close();await runtime.dispose();}
 }
});
