import {readRecord,clock as validWall} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createDelegatedPreparationAuthorizationHost} from './delegated-preparation-token-host.mjs';
import {createDelegatedPreparationConsentHttpHost} from './delegated-preparation-consent-http.mjs';
import {createDelegatedPreparationMcpMount} from './delegated-preparation-mcp-mount.mjs';
import {createDelegatedPreparationConnectionsHttpHost} from './delegated-preparation-connections-http.mjs';
const KEYS=['enabled','issuer','env','profile','management','clientName','locale','accessVerifier','now','monotonic'];
const PROFILE=['profileId','projectId','clientId','resource','trialStartedAt','trialExpiresAt'];
const MANAGEMENT=['startedAt','expiresAt'];
const SHARED=['AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED','ACCESS_TEAM_DOMAIN','ACCESS_AUD','DB','DELEGATED_RATE_LIMITER'];
const unavailable=()=>Error('Preparation router unavailable');
function failure(status=503){return Response.json({code:'preparation_route_unavailable',executionAllowed:false,chargeAllowed:false,publicationAllowed:false},
 {status,headers:{'Cache-Control':'no-store'}});}

/** Detached direct dispatcher. No production importer/discovery/registration.
 * Optional originalLease is server-owned lifetime only, never browser input.
 */
export function createDelegatedPreparationRouter(options){
 const cfg=readRecord(options,KEYS);if(!cfg||cfg.enabled!==true)return null;
 if(cfg.env?.AFW_DELEGATED_PREPARATION_ROUTER_ENABLED!=='true')return null;
 const rawNow=cfg.now===undefined?()=>Date.now():cfg.now,rawMono=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 const p=readRecord(cfg.profile,PROFILE),m=readRecord(cfg.management,MANAGEMENT);
 let pins,lastWall,lastMono;
 try{
  const url=new URL(cfg.issuer);
  if(url.protocol!=='https:'||url.origin!==cfg.issuer||!p||!m||typeof rawNow!=='function'||typeof rawMono!=='function')throw unavailable();
  pins=Object.fromEntries(SHARED.map(k=>[k,cfg.env[k]]));lastWall=rawNow();lastMono=rawMono();
  if(pins.AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED!=='true'||!validWall(lastWall)||!Number.isFinite(lastMono)||lastMono<0)throw unavailable();
 }catch{throw unavailable();}
 let invalidated=false;
 function current(){
  if(invalidated)throw unavailable();
  try{
   const live=readRecord(options,KEYS),profile=readRecord(live?.profile,PROFILE),management=readRecord(live?.management,MANAGEMENT);
   const wall=rawNow(),mono=rawMono();
   if(!live||!KEYS.every(k=>live[k]===cfg[k])||!profile||!PROFILE.every(k=>profile[k]===p[k])
    ||!management||!MANAGEMENT.every(k=>management[k]===m[k])||!SHARED.every(k=>cfg.env[k]===pins[k])
    ||!validWall(wall)||!Number.isFinite(mono)||mono<lastMono||wall<lastWall)throw unavailable();
   lastWall=wall;lastMono=mono;return {wall,mono};
  }catch{invalidated=true;throw unavailable();}
 }
 // These wrappers propagate root drift through every existing child await.
 const now=()=>current().wall,monotonic=()=>current().mono,locale=cfg.locale??'es';
 const human=createDelegatedPreparationConnectionsHttpHost({enabled:true,issuer:cfg.issuer,env:cfg.env,profile:cfg.profile,
  management:cfg.management,clientName:cfg.clientName,locale,accessVerifier:cfg.accessVerifier,now,monotonic});
 if(typeof human!=='function')throw unavailable();
 let agent=null;
 const stamp=current().wall;
 if(stamp>=p.trialStartedAt&&stamp<p.trialExpiresAt&&cfg.env.AFW_DELEGATED_OAUTH_ENABLED==='true'&&cfg.env.AFW_DELEGATED_PREPARATION_ENABLED==='true'){
  try{
   const as=createDelegatedPreparationAuthorizationHost({enabled:true,issuer:cfg.issuer,env:cfg.env,profile:cfg.profile,now,monotonic});
   const consent=createDelegatedPreparationConsentHttpHost({enabled:true,issuer:cfg.issuer,env:cfg.env,profile:cfg.profile,
    authorizationServer:as.authorizationServer,accessVerifier:cfg.accessVerifier,locale,now,monotonic});
   const mcp=createDelegatedPreparationMcpMount({enabled:true,issuer:cfg.issuer,env:cfg.env,now,monotonic,
    validateAccessToken:environment=>{
     current();if(environment!==cfg.env)throw unavailable();
     return (audience,token)=>as.authorizationServer.validateToken(audience,token,environment);
    }});
   if(typeof consent!=='function'||typeof as.fetchToken!=='function'||typeof mcp!=='function')throw unavailable();
   agent=Object.freeze({'/authorize':consent,'/oauth/token':as.fetchToken,'/mcp':mcp});
  }catch{agent=null;} // No dynamic retry or fallback; human withdrawal remains independent.
 }
 return function(request,ctx,originalLease){
  const ownsLease=originalLease===undefined;let control;
  const close=()=>{if(ownsLease)control?.close();};
  try{
   const lease=ownsLease?createCapsulePreparationRequestLease({now,monotonic,signal:request.signal}):originalLease;
   control=readCapsulePreparationRequestLease(lease);if(!control)throw unavailable();control.check();current();
   if(typeof ctx?.waitUntil!=='function')throw unavailable();
   if(new TextEncoder().encode(request.url).byteLength>8192)return Promise.resolve(failure(400)).finally(close);
   const url=new URL(request.url);
   if(url.origin!==cfg.issuer||url.username||url.password)return Promise.resolve(failure(404)).finally(close);
   if(url.hash)return Promise.resolve(failure(400)).finally(close);
   let route;
   if(url.pathname==='/connections'||url.pathname==='/connections/revoke')route=human;
   else if(['/authorize','/oauth/token','/mcp'].includes(url.pathname))route=agent?.[url.pathname];
   else return Promise.resolve(failure(404)).finally(close);
   if(!route)return Promise.resolve(failure()).finally(close);
   // No new await/output proxy/fence after the selected host's own handoff.
   return Promise.resolve(route(request,ctx,lease)).catch(()=>failure()).finally(close);
  }catch{close();return Promise.resolve(failure());}
 };
}
