import test from 'node:test';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {createDelegatedOAuthWorker}=await import('../lib/delegated-oauth-worker.mjs');hook.deregister();
const issuer='https://private.example',epoch=Date.UTC(2026,9,12,16,0);
const worker=()=>createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp',now:()=>new Date(epoch).toISOString()});
test('disabled human entry explains pause without dependency access or an automatic reconnection',async()=>{
 const env={AFW_DELEGATED_OAUTH_ENABLED:'false'};for(const k of ['DB','DELEGATED_RATE_LIMITER','ACCESS_AUD'])Object.defineProperty(env,k,{get(){throw Error('unexpected dependency');}});
 for(const path of ['/authorize','/monitoring','/connections']){const r=await worker().fetch(new Request(issuer+path),env,{});assert.equal(r.status,404);const body=await r.text();assert.match(body,/Esta prueba está en pausa/);assert.doesNotMatch(body,/No puedo confirmar la causa|<form|Permitir lectura|Permitir avisos/);assert.equal(r.headers.get('cache-control'),'no-store');}
});
test('expired service gives a clear human next step while protocol routes retain generic closed response',async()=>{
 const env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(epoch-1).toISOString()};
 const r=await worker().fetch(new Request(issuer+'/authorize'),env,{});assert.equal(r.status,404);assert.match(await r.text(),/Esta ventana de prueba terminó/);
 const mcp=await worker().fetch(new Request(issuer+'/mcp'),env,{});assert.equal(mcp.status,404);assert.match(await mcp.text(),/No puedo confirmar la causa/);
});
test('monitoring not yet mounted explains pause without inferring reading means notice consent',async()=>{
 const r=await worker().fetch(new Request(issuer+'/monitoring'),{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'stable'},{});assert.equal(r.status,404);assert.match(await r.text(),/Esta prueba está en pausa/);
});
test('expired or future original monitoring window is explained before any identity or SQL work',async()=>{
 for(const future of [false,true]){let writes=0;const policy={grantId:'g',projectId:'p',clientId:'client',startAt:future?epoch+60000:epoch-600000,expiresAt:future?epoch+120000:epoch-1},env={AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_POLICY:JSON.stringify(policy),AFW_OAUTH_SERVICE_MODE:'stable',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'team.cloudflareaccess.com',ACCESS_AUD:'aud',OAUTH_KV:{},DB:{prepare(){writes++;throw Error('no SQL');}},DELEGATED_RATE_LIMITER:{limit(){writes++;throw Error('no rate IO');}}};
 const r=await worker().fetch(new Request(issuer+'/monitoring'),env,{});assert.equal(r.status,404);assert.match(await r.text(),future?/Esta prueba todavía no empezó/:/Esta ventana de prueba terminó/);assert.equal(writes,0);
 }
});
