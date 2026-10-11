import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {registerHooks} from 'node:module';
import {localOAuthFixture,authorize,approve,exchange,cookies,handle} from './fixtures/delegated-oauth-runtime.mjs';
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');hook.deregister();
async function fixture(){
 const f=await localOAuthFixture(createDelegatedOAuthWorker);
 f.sqlite.exec(readFileSync('db/dossier-monitoring-consent.sql','utf8'));
 f.sqlite.exec(readFileSync('db/dossier-monitoring-owner-tickets.sql','utf8'));
 f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';
 const a=await authorize(f),approved=await approve(f,a);assert.equal(approved.status,302);
 const token=await exchange(f,approved.headers.get('Location'),a.verifier);assert.equal(token.status,200);
 const grant=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
 const epoch=Date.now();f.setTime(new Date(epoch).toISOString());
 const policy={grantId:grant,projectId:'p-a',clientId:f.client.clientId,startAt:epoch-100,expiresAt:epoch+599900};
 f.env.AFW_DOSSIER_MONITORING_OWNER_ENABLED='true';f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify(policy);
 return {...f,policy};
}
test('monitoring mount default closes before limiter, storage, Access or policy reads',async()=>{
 const w=createDelegatedOAuthWorker({issuer:'https://private.example',resource:'https://private.example/mcp',accessVerifier(){throw Error('verify');}});
 const env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'stable'};
 for(const key of ['DB','DELEGATED_RATE_LIMITER','AFW_DOSSIER_MONITORING_OWNER_POLICY'])Object.defineProperty(env,key,{get(){throw Error('unexpected dependency');}});
 for(const path of ['/monitoring','/monitoring/grant','/monitoring/revoke'])assert.equal((await w.fetch(new Request('https://private.example'+path),env,{})).status,404);
});
test('same OAuth host consent, exchange, owner grant, original retry and withdrawal; reading stays separate',async()=>{
 const f=await fixture();try{
 const r=await f.request('/monitoring');assert.equal(r.status,200);const html=await r.text(),h=handle(html),cookie=cookies(r);
 assert.match(html,/Permitir avisos temporales/);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);
 const post=path=>f.request(path,{method:'POST',headers:{Origin:f.issuer,Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:h})});
 assert.equal((await post('/monitoring/grant')).status,200);assert.equal((await post('/monitoring/grant')).status,200);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,1);
 const withdrawn=await f.request('/monitoring'),body=await withdrawn.text();assert.match(body,/Retirar/);
 assert.equal((await f.request('/monitoring/revoke',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(withdrawn),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:handle(body)})})).status,200);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,2);
 assert.equal(f.sqlite.prepare('SELECT revoked_at FROM delegated_access_grants').get().revoked_at,'');
 assert.equal((await f.request('/connections')).status,200);
 }finally{f.close();}
});
test('monitoring requires exact client/project policy and rejects missing or unknown configuration before limiter',async()=>{
 const f=await fixture();try{
 let calls=0;f.env.DELEGATED_RATE_LIMITER={limit:async()=>{calls++;return{success:true};}};
 for(const patch of [{projectId:'p-b'},{clientId:'foreign'},{resource:f.resource},{startAt:0},{expiresAt:f.policy.startAt+600001}]){
 f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify({...f.policy,...patch});assert.equal((await f.request('/monitoring')).status,503);
 }
 delete f.env.AFW_OAUTH_PILOT_PROJECT_ID;f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify(f.policy);assert.equal((await f.request('/monitoring')).status,503);assert.equal(calls,0);
 }finally{f.close();}
});
test('limiter deny and flag/project/database drift while awaiting rate admission never mint tickets',async()=>{
 const f=await fixture();try{
 f.env.DELEGATED_RATE_LIMITER={limit:async()=>({success:false})};assert.equal((await f.request('/monitoring')).status,429);
 const originalDB=f.env.DB;
 for(const mutate of [()=>{f.env.AFW_DOSSIER_MONITORING_OWNER_ENABLED='false';},()=>{f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-b';},()=>{f.env.DB={prepare(){throw Error('foreign DB');}};}]){
 f.env.AFW_DOSSIER_MONITORING_OWNER_ENABLED='true';f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';f.env.DB=originalDB;
 f.env.DELEGATED_RATE_LIMITER={limit:async()=>{mutate();return{success:true};}};assert.equal((await f.request('/monitoring')).status,503);
 }
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_owner_tickets').get().n,0);
 }finally{f.close();}
});
test('foreign identity, wrong origin and closed window do not grant monitoring',async()=>{
 const f=await fixture();try{
 assert.equal((await f.request('/monitoring',{},'owner-b')).status,403);
 assert.equal((await f.request('/monitoring/grant',{method:'POST',headers:{Origin:'https://foreign.example'}})).status,403);
 f.env.DELEGATED_RATE_LIMITER={limit:async()=>{f.setTime(new Date(f.policy.expiresAt).toISOString());return{success:true};}};
 assert.equal((await f.request('/monitoring')).status,404);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_owner_tickets').get().n,0);
 }finally{f.close();}
});
test('broken monitoring policy does not change the existing OAuth connection and metadata routes',async()=>{
 const f=await fixture();try{
 f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY='not JSON';
 assert.equal((await f.request('/monitoring')).status,503);
 assert.equal((await f.request('/connections')).status,200);
 const metadata=await f.request('/.well-known/oauth-authorization-server',{},null);assert.equal(metadata.status,200);
 assert.deepEqual((await metadata.json()).scopes_supported,['afw:project:read','afw:evidence:read']);
 }finally{f.close();}
});
test('policy mutation during signed Access verification cannot mint an owner form',async()=>{
 let mutate=()=>{};
 const f=await localOAuthFixture(options=>createDelegatedOAuthWorker({...options,accessVerifier:async o=>{const result=await options.accessVerifier(o);mutate();return result;}}));
 try{
 f.sqlite.exec(readFileSync('db/dossier-monitoring-consent.sql','utf8'));f.sqlite.exec(readFileSync('db/dossier-monitoring-owner-tickets.sql','utf8'));
 f.env.AFW_OAUTH_PILOT_PROJECT_ID='p-a';const a=await authorize(f);assert.equal((await approve(f,a)).status,302);
 const epoch=Date.now(),grantId=f.sqlite.prepare('SELECT id FROM delegated_access_grants').get().id;
 f.env.AFW_DOSSIER_MONITORING_OWNER_ENABLED='true';f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify({grantId,projectId:'p-a',clientId:f.client.clientId,startAt:epoch-100,expiresAt:epoch+599900});
 mutate=()=>{f.env.AFW_DOSSIER_MONITORING_OWNER_POLICY='{}';};assert.equal((await f.request('/monitoring')).status,401);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_owner_tickets').get().n,0);
 }finally{f.close();}
});
test('shorter original OAuth host deadline bounds the persisted monitoring permission',async()=>{
 const f=await fixture();try{
 const deadline=Date.now()+15000;f.env.AFW_OAUTH_SERVICE_MODE='window';f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(deadline).toISOString();
 const r=await f.request('/monitoring');assert.equal(r.status,200);const h=handle(await r.text());
 assert.equal((await f.request('/monitoring/grant',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(r),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:h})})).status,200);
 assert.equal(f.sqlite.prepare('SELECT expires_at FROM dossier_monitoring_consent_events').get().expires_at,deadline);
 }finally{f.close();}
});
test('atomic SQL denies a delayed monitoring write after original host expiry even with stale JS clock',async()=>{
 const f=await fixture();try{
 f.env.AFW_OAUTH_SERVICE_MODE='window';f.env.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(Date.now()+1200).toISOString();
 const r=await f.request('/monitoring');assert.equal(r.status,200);const h=handle(await r.text()),original=f.env.DB;
 f.env.DB={prepare(sql){const prepared=original.prepare(sql);return{bind(...args){const bound=prepared.bind(...args);return{...bound,run:async()=>{if(/INSERT INTO dossier_monitoring_consent_events/.test(sql))await new Promise(resolve=>setTimeout(resolve,1500));return bound.run();}};}};}};
 assert.equal((await f.request('/monitoring/grant',{method:'POST',headers:{Origin:f.issuer,Cookie:cookies(r),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({handle:h})})).status,409);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM dossier_monitoring_consent_events').get().n,0);
 }finally{f.close();}
});
