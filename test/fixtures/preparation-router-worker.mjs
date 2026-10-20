// CI ONLY: actual source router/hosts, ephemeral Access signature, SDK and D1/KV.
import {preparationCodeCiContext} from './preparation-code-worker.mjs';
import {createDelegatedPreparationRouter} from '../../lib/delegated-preparation-router.mjs';
import {createDelegatedPreparationAuthorizationHost} from '../../lib/delegated-preparation-token-host.mjs';
import {createDelegatedPreparationConsentHttpHost} from '../../lib/delegated-preparation-consent-http.mjs';
import {createDelegatedPreparationConnectionsHttpHost} from '../../lib/delegated-preparation-connections-http.mjs';
import {createDelegatedPreparationMcpMount} from '../../lib/delegated-preparation-mcp-mount.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';
import {verifyCloudflareAccessJwt} from '../../lib/cloudflare-access-identity.mjs';
import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {importJWK} from 'jose';
let router,options,profile,management,pins,pub,probes,history,initialClosed,historyProfile;
let holdAccess=false;
const held=new Set(),background=new Set(),stats={accessStarted:0,tokenCalls:0};
const sdkFetch=OAuthAuthorizationServer.prototype.fetch;
OAuthAuthorizationServer.prototype.fetch=async function(request,...args){
 if(new URL(request.url).pathname==='/oauth/token')stats.tokenCalls++;
 return sdkFetch.call(this,request,...args);
};
async function ready(env){
 if(router)return;
 const c=await preparationCodeCiContext(env),stamp=Date.now();profile=c.profile;
 management={startedAt:stamp,expiresAt:stamp+600000};pub=await importJWK(JSON.parse(env.CI_PUBLIC_JWK),'RS256');
 const verify=async args=>{
  stats.accessStarted++;if(holdAccess)await new Promise(resolve=>held.add(resolve));
  return verifyCloudflareAccessJwt({...args,keySet:pub});
 };
 pins={...env,AFW_DELEGATED_PREPARATION_ROUTER_ENABLED:'true',AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED:'true',
  AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(profile.trialExpiresAt).toISOString(),
  AFW_OAUTH_PILOT_PROJECT_ID:profile.projectId,AFW_OAUTH_PILOT_CLIENT_ID:profile.clientId,
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-preparation-audience',
  DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}}};
 options={enabled:true,issuer:'https://example.invalid',env:pins,profile,management,clientName:'CI real router',accessVerifier:verify};
 router=createDelegatedPreparationRouter(options);
 // Independent real source ports ONLY to qualify their borrowed-lease contract.
 const as=createDelegatedPreparationAuthorizationHost({enabled:true,issuer:options.issuer,env:pins,profile});
 probes={
  '/authorize':createDelegatedPreparationConsentHttpHost({enabled:true,issuer:options.issuer,env:pins,profile,authorizationServer:as.authorizationServer,accessVerifier:verify}),
  '/oauth/token':as.fetchToken,
  '/connections':createDelegatedPreparationConnectionsHttpHost({...options,enabled:true,env:pins,profile,management}),
  '/mcp':createDelegatedPreparationMcpMount({enabled:true,issuer:options.issuer,env:pins,
   validateAccessToken:environment=>(audience,token)=>as.authorizationServer.validateToken(audience,token,environment)}),
 };
}
const worker={async fetch(request,env,ctx){
 await ready(env);const url=new URL(request.url),path=url.pathname;
 const tracked={waitUntil(work){const task=Promise.resolve(work);background.add(task);task.then(()=>background.delete(task),()=>background.delete(task));ctx.waitUntil(task);}};
 if(path==='/__ci/bootstrap')return Response.json({clientId:profile.clientId,profile,management});
 if(path==='/__ci/stats'){if(!held.size)await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/access-hold'&&request.method==='POST'){holdAccess=true;return Response.json({held:true});}
 if(path==='/__ci/release'&&request.method==='POST'){holdAccess=false;for(const resolve of held)resolve();held.clear();await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/close-issuance'&&request.method==='POST'){pins.AFW_DELEGATED_OAUTH_ENABLED='false';return Response.json({closed:true});}
 if(path==='/__ci/restore-issuance'&&request.method==='POST'){pins.AFW_DELEGATED_OAUTH_ENABLED='true';return Response.json({restored:true});}
 if(path==='/__ci/root-drift'&&request.method==='POST'){options.enabled=false;return Response.json({closed:true});}
 if(path==='/__ci/root-restore'&&request.method==='POST'){options.enabled=true;return Response.json({restored:true});}
 if(path==='/__ci/default'){
  let touched=0;const off={enabled:false};Object.defineProperty(off,'env',{enumerable:true,get(){touched++;throw Error('must not read');}});
  return Response.json({closed:createDelegatedPreparationRouter()===null,disabled:createDelegatedPreparationRouter(off)===null,touched});
 }
 const headers=new Headers(request.headers);headers.set('host','example.invalid');
 if(path.startsWith('/__ci/probe/')){
  url.pathname=path.slice('/__ci/probe'.length);
  const parent=createCapsulePreparationRequestLease();readCapsulePreparationRequestLease(parent).close();
  return probes[url.pathname](new Request(url,request),tracked,parent);
 }
 if(path==='/__ci/history-config'){
  if(!history){
   const stamp=Date.now();historyProfile={...profile,trialStartedAt:stamp-200000,trialExpiresAt:stamp-10000};
   history=createDelegatedPreparationRouter({...options,env:{...pins,AFW_DELEGATED_OAUTH_ENABLED:'false'},profile:historyProfile});
  }
  return Response.json({profile:historyProfile});
 }
 if(path.startsWith('/__ci/history/')){
  url.pathname=path.slice('/__ci/history'.length);
  return history(new Request(url,request),tracked);
 }
 if(path.startsWith('/__ci/initial-closed/')){
  if(!initialClosed){
   const off={...pins,AFW_DELEGATED_OAUTH_ENABLED:'false'};
   initialClosed=createDelegatedPreparationRouter({...options,env:off});
   // Restoring this env after construction MUST NOT instantiate missing agent ports.
   off.AFW_DELEGATED_OAUTH_ENABLED='true';
  }
  url.pathname=path.slice('/__ci/initial-closed'.length);return initialClosed(new Request(url,request),tracked);
 }
 return router(new Request(request,{headers}),tracked);
}};
export default worker;
