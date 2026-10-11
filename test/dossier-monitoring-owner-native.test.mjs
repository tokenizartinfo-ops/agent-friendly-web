import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
test('native owner HTTP verifies signed Access identity and records one D1 consent then withdrawal',async()=>{
 const {publicKey,privateKey}=await generateKeyPair('RS256'),key=await exportJWK(publicKey);key.kid='own-synthetic';key.alg='RS256';
 const jwt=subject=>new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:key.kid}).setSubject(subject).setIssuer('https://own.cloudflareaccess.com').setAudience('own').setIssuedAt().setExpirationTime('5m').sign(privateKey);
 const owner=await jwt('owner'),foreign=await jwt('other');
 const schemas=['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].flatMap(path=>[...readFileSync(path,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]));assert.equal(schemas.length,7);
 const contents=`
import {createDossierMonitoringOwnerHandler} from './lib/dossier-monitoring-owner-http.mjs';
import {verifyCloudflareAccessJwt} from './lib/cloudflare-access-identity.mjs';
import {createLocalJWKSet} from 'jose';
let epoch;const issuer='https://private.example.invalid',keySet=createLocalJWKSet({keys:[${JSON.stringify(key)}]});
export default{async fetch(request,env){
 if(new URL(request.url).pathname==='/seed'){epoch=Date.now();
  await env.DB.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,organization TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
  for(const sql of ${JSON.stringify(schemas)})await env.DB.prepare(sql).run();
  await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?,?)').bind('p','owner',3,'Mi empresa').run();
  await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',issuer+'/mcp','["afw:project:read"]',new Date(epoch+300000).toISOString(),'').run();return Response.json({});
 }
 const policy={enabled:true,startAt:epoch-100,expiresAt:epoch+299900,projectId:'p',grantId:'g',clientId:'client',resource:issuer+'/mcp',teamDomain:'own.cloudflareaccess.com',audience:'own'};
 return createDossierMonitoringOwnerHandler({issuer,db:env.DB,policy,accessVerifier:o=>verifyCloudflareAccessJwt({...o,keySet})})(request);
}};`;
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:bundle.outputFiles[0].text,d1Databases:{DB:'monitor-owner-native'}}));
 const call=(path,token,body,cookie)=>runtime.dispatchFetch('https://private.example.invalid'+path,{method:body?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':token??'',...(body?{Origin:'https://private.example.invalid','Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}: {})},...(body?{body}: {})});
 const form=async()=>{const r=await call('/monitoring',owner);assert.equal(r.status,200);const html=await r.text();return{handle:html.match(/name="handle" value="([^"]+)"/)?.[1],cookie:r.headers.get('Set-Cookie').split(';')[0]};};
 try{
  assert.equal((await call('/seed')).status,200);assert.equal((await call('/monitoring','invalid')).status,401);assert.equal((await call('/monitoring',foreign)).status,403);
  const p=await form();assert.ok(p.handle);assert.equal((await call('/monitoring/grant',owner,'handle='+p.handle,p.cookie)).status,200);assert.equal((await call('/monitoring/grant',owner,'handle='+p.handle,p.cookie)).status,200);
  const withdraw=await form();assert.equal((await call('/monitoring/revoke',owner,'handle='+withdraw.handle,withdraw.cookie)).status,200);assert.match(await (await call('/monitoring',owner)).text(),/Retiraste los avisos/);
 }finally{await runtime.dispose();}
});
