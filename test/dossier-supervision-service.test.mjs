import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {operationsDb} from './fixtures/operations-db.mjs';
import {projectDossierEvent,recordDossierEvent} from '../lib/dossier-supervision.mjs';
import {createOperationsServiceControls} from '../lib/operations-service-controls.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');const now=Date.now();
const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'operations-only',clientId:'synthetic-operations.access'};
async function fixture(){const f=operationsDb();for(const name of ['consumer-state','notice-reservations'])f.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));f.sqlite.exec(readFileSync('worker/operations/dossier-supervision.sql','utf8'));const signal=await projectDossierEvent({id:'synthetic-save',projectId:'synthetic-project',revision:2,type:'project_updated',createdAt:new Date(now).toISOString()},'synthetic-dossier-bridge-signing-key-32');await recordDossierEvent(f.db,signal,now);const env={AFW_DOSSIER_SUPERVISION_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+60000).toISOString(),AFW_DOSSIER_PROJECT_REFS:JSON.stringify([signal.projectRef])};const jwt=await new SignJWT({type:'app',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime('5m').sign(privateKey);const handle=change=>createOperationsServiceControls({db:f.db,config,keySet:publicKey,now:()=>now,limiter:{limit:async()=>({success:true})},noticeEnv:{...env,...change}});const request=(path,body,token=jwt)=>new Request(config.origin+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token,...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});return {...f,signal,handle,request};}
test('service can review only opaque metadata through bounded claim and finish',async()=>{
 const f=await fixture(),h=f.handle();const list=await h(f.request('/dossiers'));assert.equal(list.status,200);assert.deepEqual((await list.json()).signals,[f.signal]);
 const c=await h(f.request('/dossiers/claim',{eventId:f.signal.eventId,requestId:crypto.randomUUID()}));assert.equal(c.status,200);const {reservation}=await c.json();
 assert.deepEqual(await(await h(f.request('/dossiers/finish',{runId:reservation.runId,outcome:'reviewed'}))).json(),{outcome:'reviewed'});
 assert.deepEqual(await(await h(f.request('/dossiers'))).json(),{signals:[]});
});
test('flag, deadline, enrollment withdrawal and wrong identity fail closed',async()=>{
 const f=await fixture();for(const change of [{AFW_DOSSIER_SUPERVISION_ENABLED:'false'},{AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now-1).toISOString()},{AFW_DOSSIER_PROJECT_REFS:'[]'}])assert.equal((await f.handle(change)(f.request('/dossiers'))).status,404);
 assert.equal((await f.handle()(f.request('/dossiers',undefined,'forged'))).status,401);
});
test('dossier mode excludes legacy claims and cannot accept client text or resolved outcome',async()=>{
 const f=await fixture(),h=f.handle();assert.equal((await h(f.request('/incidents'))).status,404);
 assert.equal((await h(f.request('/dossiers/claim',{eventId:f.signal.eventId,requestId:crypto.randomUUID(),notes:'private'}))).status,400);
 assert.equal((await h(f.request('/dossiers/finish',{runId:crypto.randomUUID(),outcome:'resolved'}))).status,400);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_runs').get().n,0);
});
test('previous operational reservations share the same daily budget',async()=>{
 const f=await fixture(),h=f.handle();
 for(let i=0;i<3;i++)f.sqlite.prepare("INSERT INTO operations_investigations(run_id,request_id,fingerprint,consumer_ref,lease_token,observed_at,reserved_at,expires_at) VALUES(?,?,?,'afw-cloud-manager',?,?,?,?)").run(crypto.randomUUID(),crypto.randomUUID(),'0'.repeat(64),crypto.randomUUID(),now-2000,now-2000,now-1000);
 assert.equal((await h(f.request('/dossiers/claim',{eventId:f.signal.eventId,requestId:crypto.randomUUID()}))).status,409);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_runs').get().n,0);
});

