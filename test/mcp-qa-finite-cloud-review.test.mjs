import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {generateKeyPair,SignJWT} from 'jose';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordDossierEvent} from '../lib/dossier-supervision.mjs';
import {createOperationsServiceControls} from '../lib/operations-service-controls.mjs';

const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'operations-only',clientId:'synthetic-dedicated-cloud.access'};
const keys=await generateKeyPair('RS256');
const route='/dossiers/finish';
const api=await import('../lib/dossier-supervision-finite-review.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('dossier-supervision-finite-review.mjs'))throw error;
 return {};
});
async function setup(){
 const f=operationsDb();
 for(const schema of ['consumer-state','notice-reservations','dossier-supervision'])f.sqlite.exec(readFileSync('worker/operations/'+schema+'.sql','utf8'));
 if(typeof api.readFiniteDossierReviewReceipt==='function')f.sqlite.exec(readFileSync('worker/operations/dossier-supervision-finite-reviews.sql','utf8'));
 f.db.withSession=name=>{assert.equal(name,'first-primary');return f.db;};
 const now=Date.now(),signal={version:'afw-dossier-event-v1',eventId:'1'.repeat(64),projectRef:'2'.repeat(64),revision:2,kind:'project_updated',observedAt:new Date(now-30).toISOString()};
 await recordDossierEvent(f.db,signal,now-20);
 const policy={purpose:'afw.finite-dossier-review-policy.v1',eventId:signal.eventId,projectRef:signal.projectRef,revision:2,
  controlHash:'3'.repeat(64),executionHash:'4'.repeat(64),
  actorHash:digest(['afw.finite-dossier-review-actor.v1',config.teamDomain,config.audience,config.clientId]),
  startAt:now-30000,reviewBefore:now+30000,readBefore:now+90000};
 const env={OPERATIONS_DB:f.db,AFW_DOSSIER_SUPERVISION_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+30000).toISOString(),
  AFW_DOSSIER_PROJECT_REFS:JSON.stringify([signal.projectRef]),
  AFW_DOSSIER_FINITE_REVIEW_ENABLED:'true',AFW_DOSSIER_FINITE_REVIEW_POLICY:JSON.stringify(policy)};
 const token=await new SignJWT({type:'app',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime('5m').sign(keys.privateKey);
 const handle=createOperationsServiceControls({db:f.db,config,keySet:keys.publicKey,now:()=>now,limiter:{limit:async()=>({success:true})},noticeEnv:env});
 const post=(path,body,jwt=token)=>handle(new Request(config.origin+path,{method:'POST',headers:{'Cf-Access-Jwt-Assertion':jwt,'content-type':'application/json'},body:JSON.stringify(body)}));
 const c=await post('/dossiers/claim',{eventId:signal.eventId,requestId:crypto.randomUUID()});
 assert.equal(c.status,200);
 const {reservation}=await c.json();
 const payload={runId:reservation.runId,outcome:'reviewed',review:{eventId:policy.eventId,executionHash:policy.executionHash,resultHash:'5'.repeat(64)}};
 return {...f,post,now,signal,policy,env,payload};
}
test('authenticated cloud finish records a primary receipt for the same event and exact execution',async()=>{
 const f=await setup(),r=await f.post(route,f.payload);
 assert.equal(r.status,200,'scoped cloud review is not recorded');
 const {receipt,outcome}=await r.json();
 assert.equal(outcome,'reviewed');
 assert.equal(receipt.eventId,f.signal.eventId);
 assert.equal(receipt.actorHash,f.policy.actorHash);
 assert.equal(receipt.executionHash,f.policy.executionHash);
 assert.equal(receipt.resultHash,f.payload.review.resultHash);
 assert.equal(receipt.controlHash,f.policy.controlHash);
 assert.equal(receipt.runId,f.payload.runId);
 assert.deepEqual(await api.readFiniteDossierReviewReceipt({env:f.env,refs:{eventId:receipt.eventId,controlHash:receipt.controlHash},now:()=>f.now+40000}),receipt);
 const exactRetry=await f.post(route,f.payload);assert.equal(exactRetry.status,200);
 assert.deepEqual((await exactRetry.json()).receipt,receipt);
});
