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
import {WebStandardStreamableHTTPServerTransport} from '@modelcontextprotocol/server';
import {importJWK} from 'jose';
let router,options,profile,management,pins,pub,probes,history,initialClosed,historyProfile;
let holdAccess=false;
let shortManagement,outputMode,outputRouter,outputEnv,outputOffset=0,holdOutput=false;
const heldOutput=new Set();
const held=new Set(),background=new Set(),stats={accessStarted:0,tokenCalls:0,outputStarted:0};
const sdkFetch=OAuthAuthorizationServer.prototype.fetch;
OAuthAuthorizationServer.prototype.fetch=async function(request,...args){
 if(new URL(request.url).pathname==='/oauth/token')stats.tokenCalls++;
 return sdkFetch.call(this,request,...args);
};
const transportHandle=WebStandardStreamableHTTPServerTransport.prototype.handleRequest;
WebStandardStreamableHTTPServerTransport.prototype.handleRequest=async function(request,...args){
 const response=await transportHandle.call(this,request,...args);
 if(request.headers.get('X-CI-Hold-Output')!=='true'||!response.body)return response;
 const reader=response.body.getReader();
 const stream=new ReadableStream({async pull(controller){
  stats.outputStarted++;if(holdOutput)await new Promise(resolve=>heldOutput.add(resolve));
  const item=await reader.read();if(item.done)controller.close();else controller.enqueue(item.value);
 },cancel(reason){return reader.cancel(reason);}},{highWaterMark:0});
 return new Response(stream,{status:response.status,statusText:response.statusText,headers:response.headers});
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
 if(path.startsWith('/__ci/probe-root/')){
  url.pathname=path.slice('/__ci/probe-root'.length);
  const parent=createCapsulePreparationRequestLease();readCapsulePreparationRequestLease(parent).close();
  return router(new Request(url,request),tracked,parent);
 }
 if(path.startsWith('/__ci/probe/')||path.startsWith('/__ci/borrow/')){
  const closed=path.startsWith('/__ci/probe/');url.pathname=path.slice((closed?'/__ci/probe':'/__ci/borrow').length);
  const parent=createCapsulePreparationRequestLease(),control=readCapsulePreparationRequestLease(parent);
  if(closed)control.close();
  try{
   const response=await probes[url.pathname](new Request(url,request),tracked,parent);
   if(closed)return response;
   let open=false;try{open=control.check().remaining>0;}catch{/* report only the lifetime state */}
   const h=new Headers(response.headers);h.set('X-CI-Parent-Open',String(open));
   return new Response(response.body,{status:response.status,headers:h});
  }finally{control.close();}
 }
 if(path.startsWith('/__ci/short-management/')){
  if(!shortManagement)shortManagement=createDelegatedPreparationRouter({...options,env:{...pins},management:{startedAt:Date.now(),expiresAt:Date.now()+30000}});
  url.pathname=path.slice('/__ci/short-management'.length);return shortManagement(new Request(url,request),tracked);
 }
 if(path==='/__ci/output-config'&&request.method==='POST'){
  outputMode=url.searchParams.get('mode');outputOffset=0;holdOutput=true;outputEnv={...pins};
  let outputProfile=profile;
  if(outputMode==='expiry'){
   outputProfile={...profile,trialExpiresAt:Date.now()+1500};
   outputEnv.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(outputProfile.trialExpiresAt).toISOString();
  }
  outputRouter=createDelegatedPreparationRouter({...options,env:outputEnv,profile:outputProfile,now:()=>Date.now()+outputOffset,monotonic:()=>performance.now()+outputOffset});
  return Response.json({ready:true});
 }
 if(path==='/__ci/output-drift'&&request.method==='POST'){
  if(outputMode==='expiry')outputOffset=2000;else outputEnv.AFW_DELEGATED_OAUTH_ENABLED='false';
  return Response.json({changed:true});
 }
 if(path==='/__ci/output-release'&&request.method==='POST'){
  holdOutput=false;for(const resolve of heldOutput)resolve();heldOutput.clear();return Response.json({released:true});
 }
 if(path.startsWith('/__ci/output/')){
  url.pathname=path.slice('/__ci/output'.length);return outputRouter(new Request(url,request),tracked);
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
