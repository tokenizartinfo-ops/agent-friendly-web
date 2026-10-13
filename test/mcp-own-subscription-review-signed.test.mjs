import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,exportJWK,SignJWT,createLocalJWKSet} from 'jose';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {createOwnSyntheticSaveHost} from '../lib/mcp-own-synthetic-save-host.mjs';
import {verifyCloudflareAccessJwt} from '../lib/cloudflare-access-identity.mjs';
test('signed owner review observes same SQLite subscription withdrawal without boot or goal writes',async()=>{
 const issuer='https://delegated-canary.agentfriendlyweb.dev',f=await syntheticSaveFixture({projectId:'oauth-canary-owner',resource:issuer+'/mcp'});
 try{const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'own-review-signed',alg:'RS256'},keySet=createLocalJWKSet({keys:[jwk]});
  const token=sub=>new SignJWT({email:'owner@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject(sub).setIssuer('https://own.cloudflareaccess.com').setAudience('own').setExpirationTime('5m').sign(privateKey),owner=await token('owner'),foreign=await token('foreign');let reads=0;
  const env={AFW_DOSSIER_OWN_SAVE_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DOSSIER_MONITORING_OWNER_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(f.config.window.expiresAt+10000).toISOString(),AFW_OAUTH_ISSUER:issuer,AFW_OAUTH_RESOURCE:issuer+'/mcp',AFW_OAUTH_PILOT_PROJECT_ID:'oauth-canary-owner',AFW_OAUTH_PILOT_CLIENT_ID:'client',ACCESS_TEAM_DOMAIN:'own.cloudflareaccess.com',ACCESS_AUD:'own',DB:f.options.db,AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,
   AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'g',subject:'owner',projectId:'oauth-canary-owner',clientId:'client',resource:issuer+'/mcp',containerId:'a'.repeat(64),...f.config.window}),AFW_DOSSIER_EVENTS_NODE:{idFromString:id=>({toString:()=>id}),get:()=>({observeSubscription:async()=>{reads++;return f.host.observeSubscription();},readReadiness:()=>f.host.readReadiness()})}};
  const handler=createOwnSyntheticSaveHost({env,program:f.config.program,sourceRevision:f.config.sourceRevision,accessVerifier:o=>verifyCloudflareAccessJwt({...o,keySet})}),get=token=>handler(new Request(issuer+'/qa/expediente?view=avisos',{headers:{'Cf-Access-Jwt-Assertion':token}}));
  assert.notEqual((await get('invalid')).status,200);assert.notEqual((await get(foreign)).status,200);assert.equal(reads,0);assert.match(await (await get(owner)).text(),/El aviso sigue registrado/);
  const projectRef=await f.host.list();await f.host.unsubscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook'}});
  const before=f.rows(),r=await get(owner),html=await r.text();assert.equal(r.status,200);assert.match(html,/El registro de avisos está retirado/);assert.doesNotMatch(html,/callback\.agentfriendlyweb|whsec_|sub_[0-9a-f]/);assert.deepEqual(f.rows(),before);assert.equal(f.db.prepare('SELECT revision FROM site_projects').get().revision,1);assert.equal(f.db.prepare('SELECT count(*) n FROM project_events').get().n,0);assert.equal(f.config.ctx.container.running,false);assert.equal(f.boots(),1);assert.equal(f.sends(),1);
 }finally{f.close();}
});
