import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordWatchdogObservation} from '../lib/operations-watchdog-transitions.mjs';
import {admitWatchdogNotices} from '../lib/operations-watchdog-inbox.mjs';
import {createOperationsServiceControls} from '../lib/operations-service-controls.mjs';
import {recordSignal} from '../lib/operations-ledger.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256'),now=Date.now();
const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'notices-test',clientId:'notices.access'};
test('service-only receipts recover reservation identity and terminal ACK',async()=>{
 const s=await setup(),handle=createOperationsServiceControls(s.options),jwt=await token();try{
  const claim=await handle(request('/notices/claim',jwt,{resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID()}));const {reservation}=await claim.json();
  const read=await handle(request('/notices/receipts',jwt));assert.equal(read.status,200);assert.deepEqual((await read.json()).receipts[0].reservation,reservation);
  assert.equal((await handle(request('/notices/receipts','bad'))).status,401);
  assert.equal((await createOperationsServiceControls({...s.options,noticeEnv:undefined})(request('/notices/receipts',jwt))).status,404);
  await handle(request('/notices/ack',jwt,{runId:reservation.runId}));assert.equal((await (await handle(request('/notices/receipts',jwt))).json()).receipts[0].outcome,'accepted');
 }finally{s.sqlite.close();}
});
test('server enabled notices enforce the shared budget on the legacy HTTP claim',async()=>{
 const s=await setup(),handle=createOperationsServiceControls(s.options),jwt=await token();try{
  const incident=await recordSignal(s.db,{eventId:crypto.randomUUID(),check:'public_home',resource:'afw_public_web',version:crypto.randomUUID(),observedAt:new Date(now).toISOString(),result:'failed'},now);
  const body={resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID()};
  const claim=await handle(request('/notices/claim',jwt,body));assert.equal(claim.status,200);
  assert.equal((await handle(request('/claim',jwt,{fingerprint:incident.fingerprint,requestId:crypto.randomUUID()}))).status,409);
  assert.equal(s.sqlite.prepare('SELECT attempts FROM operations_incidents').get().attempts,0);
  const closedNotices=createOperationsServiceControls({...s.options,noticeEnv:{...s.noticeEnv,AFW_OPERATIONS_NOTICES_ENABLED:'false',AFW_OPERATIONS_SHARED_BUDGET_ENABLED:'true'}});
  assert.equal((await closedNotices(request('/notices',jwt))).status,404);
  assert.equal((await closedNotices(request('/claim',jwt,{fingerprint:incident.fingerprint,requestId:crypto.randomUUID()}))).status,409);
 }finally{s.sqlite.close();}
});
async function token(claims={}){return new SignJWT({type:'app',common_name:config.clientId,...claims}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime('5m').sign(privateKey);}
async function setup(){const s=operationsDb();for(const n of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations'])s.sqlite.exec(readFileSync(new URL(`../worker/operations/${n}.sql`,import.meta.url),'utf8'));const noticeEnv={OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_NOTICES_ENABLED:'true',AFW_OPERATIONS_WATCHDOG_ENABLED:'true',AFW_OPERATIONS_PRODUCER_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+600000).toISOString()};await recordWatchdogObservation(s.db,{paused:false,checkedAt:new Date(now).toISOString(),resources:[{resource:'afw_delegated_canary',issues:['delivery_pending']},{resource:'afw_delegated_real_pilot',issues:[]}]},{now});await admitWatchdogNotices(noticeEnv,{now});return {...s,noticeEnv,options:{db:s.db,config,keySet:publicKey,noticeEnv,now:()=>now,limiter:{limit:async()=>({success:true})}}};}
function request(path,jwt,body,headers={}){return new Request(config.origin+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':jwt,...(body?{'content-type':'application/json'}:{}),...headers},...(body?{body:JSON.stringify(body)}:{})});}
test('pinned service lists current notices, reserves and acknowledges without legacy incident writes',async()=>{const s=await setup(),handle=createOperationsServiceControls(s.options),jwt=await token();const list=await handle(request('/notices',jwt));assert.equal(list.status,200);const {notices}=await list.json();assert.equal(notices.length,1);const claim=await handle(request('/notices/claim',jwt,{resource:notices[0].resource,revision:notices[0].revision,requestId:crypto.randomUUID()}));assert.equal(claim.status,200);const {reservation}=await claim.json();const ack=await handle(request('/notices/ack',jwt,{runId:reservation.runId}));assert.deepEqual(await ack.json(),{outcome:'accepted'});assert.equal((await (await handle(request('/notices',jwt))).json()).notices.length,0);assert.equal(s.sqlite.prepare('SELECT COUNT(*) AS n FROM operations_events').get().n,0);s.sqlite.close();});
test('closed channel, browser and wrong service identity cannot access notices',async()=>{const s=await setup(),jwt=await token();assert.equal((await createOperationsServiceControls({...s.options,noticeEnv:undefined})(request('/notices',jwt))).status,404);const handle=createOperationsServiceControls(s.options);assert.equal((await handle(request('/notices',await token({common_name:'other.access'})))).status,401);assert.equal((await handle(request('/notices',jwt,undefined,{Origin:config.origin}))).status,403);s.sqlite.close();});
test('strict bodies reject caller configuration and unknown resource before reservation',async()=>{const s=await setup(),handle=createOperationsServiceControls(s.options),jwt=await token();for(const body of [{resource:'other',revision:1,requestId:crypto.randomUUID()},{resource:'afw_delegated_canary',revision:1,requestId:crypto.randomUUID(),clientId:'other'},{runId:crypto.randomUUID(),outcome:'accepted'}])assert.equal((await handle(request(body.runId?'/notices/ack':'/notices/claim',jwt,body))).status,400);assert.equal(s.sqlite.prepare('SELECT COUNT(*) AS n FROM operations_notice_reservations').get().n,0);s.sqlite.close();});
test('listing excludes obsolete notices and sanitizes invalid metadata or limiter failures',async()=>{const s=await setup(),jwt=await token();const limited=createOperationsServiceControls({...s.options,limiter:{limit:async()=>({success:false})}});assert.equal((await limited(request('/notices',jwt))).status,429);s.sqlite.exec("UPDATE operations_watchdog_state SET condition='[\"private-provider-detail\"]';UPDATE operations_watchdog_inbox SET condition='[\"private-provider-detail\"]'");const r=await createOperationsServiceControls(s.options)(request('/notices',jwt));assert.equal(r.status,503);assert.equal((await r.text()).includes('private-provider-detail'),false);s.sqlite.exec("UPDATE operations_watchdog_state SET condition='paused',revision=2");assert.deepEqual(await (await createOperationsServiceControls(s.options)(request('/notices',jwt))).json(),{notices:[]});s.sqlite.close();});
test('UUID arrays and objects are rejected as invalid bodies rather than reaching storage',async()=>{const s=await setup(),handle=createOperationsServiceControls(s.options),jwt=await token();for(const value of [[crypto.randomUUID()],{value:crypto.randomUUID()}]){assert.equal((await handle(request('/notices/claim',jwt,{resource:'afw_delegated_canary',revision:1,requestId:value}))).status,400);assert.equal((await handle(request('/notices/ack',jwt,{runId:value}))).status,400);}assert.equal(s.sqlite.prepare('SELECT COUNT(*) AS n FROM operations_notice_reservations').get().n,0);s.sqlite.close();});
