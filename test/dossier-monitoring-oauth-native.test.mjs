import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';

test('native same OAuth Worker mounts only opted-in own monitoring with real D1 and Access signature',async()=>{
 const {privateKey,publicKey}=await generateKeyPair('RS256'),key={...await exportJWK(publicKey),kid:'own-oauth-native',alg:'RS256'};
 const jwt=subject=>new SignJWT({email:'synthetic@example.invalid'}).setProtectedHeader({alg:'RS256',kid:key.kid}).setSubject(subject).setIssuer('https://own.cloudflareaccess.com').setAudience('own').setIssuedAt().setExpirationTime('5m').sign(privateKey);
 const owner=await jwt('owner'),foreign=await jwt('foreign');
 const schemas=['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].flatMap(p=>[...readFileSync(p,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]));
 const contents=`
import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
import {verifyCloudflareAccessJwt} from './lib/cloudflare-access-identity.mjs';
import {createLocalJWKSet} from 'jose';
const issuer='https://private.example.invalid',keySet=createLocalJWKSet({keys:[${JSON.stringify(key)}]});
const worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp',accessVerifier:o=>verifyCloudflareAccessJwt({...o,keySet})});
let policy;
export default{async fetch(request,env,ctx){
 if(new URL(request.url).pathname==='/seed'){
  const epoch=Date.now();policy=JSON.stringify({startAt:epoch-100,expiresAt:epoch+299900,projectId:'p',grantId:'g',clientId:'client'});
  await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,organization TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
  for(const sql of ${JSON.stringify(schemas)})await env.DB.prepare(sql).run();
  await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?,?)').bind('p','owner',1,'Mi empresa').run();
  await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',issuer+'/mcp','["afw:project:read"]',new Date(epoch+300000).toISOString(),'').run();return Response.json({});
 }
 return worker.fetch(request,{...env,AFW_DOSSIER_MONITORING_OWNER_POLICY:policy,AFW_DOSSIER_MONITORING_OWNER_ENABLED:request.headers.get('X-Fixture-Enabled')==='true'?'true':'false'},ctx);
}};`;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],conditions:['workerd','worker','browser'],external:['node:*','cloudflare:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'monitor-oauth-native'},kvNamespaces:['OAUTH_KV'],ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'88390',simple:{limit:30,period:60}}},bindings:{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'stable',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'own.cloudflareaccess.com',ACCESS_AUD:'own'}}));
 const call=(path,token,enabled=true,body,cookie)=>runtime.dispatchFetch('https://private.example.invalid'+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token??'','X-Fixture-Enabled':String(enabled),...(body?{Origin:'https://private.example.invalid','Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}:{})},...(body?{body}:{})});
 const form=async()=>{const r=await call('/monitoring',owner);assert.equal(r.status,200);const html=await r.text();return{handle:html.match(/name="handle" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie').split(';')[0]};};
 try{
  assert.equal((await call('/seed')).status,200);assert.equal((await call('/monitoring',owner,false)).status,404);
  assert.equal((await call('/monitoring','invalid')).status,401);assert.equal((await call('/monitoring',foreign)).status,403);
  const p=await form();assert.equal((await call('/monitoring/grant',owner,true,'handle='+p.handle,p.cookie)).status,200);assert.equal((await call('/monitoring/grant',owner,true,'handle='+p.handle,p.cookie)).status,200);
  const revoke=await form();assert.equal((await call('/monitoring/revoke',owner,true,'handle='+revoke.handle,revoke.cookie)).status,200);
  assert.match(await (await call('/monitoring',owner)).text(),/Retiraste los avisos/);
 }finally{await runtime.dispose();}
});
