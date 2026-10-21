import {preparationComicAssetResponse} from '../../lib/preparation-comic-font.mjs';
import {readRecord,ref,oauthClientRef,text,instant,clock as validWall} from '../../lib/agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';
import {createDelegatedPreparationRouter} from '../../lib/delegated-preparation-router.mjs';
import {createPreparationSourceSessionHttpHost} from '../../lib/preparation-source-session-http.mjs';
import {createPreparationSourceIntakeHttpHost} from '../../lib/preparation-source-intake-http.mjs';

const OPTIONS=['accessVerifier','sourceAccessVerifier','now','monotonic'];
const CONFIG=['AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE',
 'AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID','AFW_PREPARATION_TRIAL_STARTED_AT','AFW_OAUTH_PILOT_EXPIRES_AT',
 'AFW_PREPARATION_MANAGEMENT_STARTED_AT','AFW_PREPARATION_MANAGEMENT_EXPIRES_AT','AFW_PREPARATION_CLIENT_NAME','AFW_PREPARATION_LOCALE'];
const SOURCE_CONFIG=['AFW_PREPARATION_SOURCE_INTAKE_ENABLED','AFW_PREPARATION_SOURCE_SESSION_OPERATION_KEY',
 'AFW_PREPARATION_SOURCE_SESSION_SUBJECT','AFW_PREPARATION_SOURCE_SESSION_STARTED_AT','AFW_PREPARATION_SOURCE_SESSION_EXPIRES_AT'];
const SOURCE_CREATE_CONFIG=['AFW_PREPARATION_SOURCE_CREATE_ENABLED',...SOURCE_CONFIG.slice(1),'AFW_PREPARATION_SOURCE_CSRF_SECRET'];
const SOURCE_ISSUER='https://preparation-canary.agentfriendlyweb.dev';
const unavailable=()=>Error('Preparation Worker unavailable');
const failure=(status=503)=>Response.json({code:'preparation_route_unavailable',executionAllowed:false,chargeAllowed:false,publicationAllowed:false},
 {status,headers:{'Cache-Control':'no-store'}});
function decode(raw){
 const issuer=raw.AFW_OAUTH_ISSUER,url=new URL(issuer),resource=raw.AFW_OAUTH_RESOURCE;
 const started=instant(raw.AFW_PREPARATION_TRIAL_STARTED_AT),expires=instant(raw.AFW_OAUTH_PILOT_EXPIRES_AT);
 const humanStart=instant(raw.AFW_PREPARATION_MANAGEMENT_STARTED_AT),humanEnd=instant(raw.AFW_PREPARATION_MANAGEMENT_EXPIRES_AT);
 const clientName=raw.AFW_PREPARATION_CLIENT_NAME,locale=raw.AFW_PREPARATION_LOCALE??'es';
 if(url.protocol!=='https:'||url.origin!==issuer||resource!==issuer+'/mcp'
  ||!ref(raw.AFW_OAUTH_PILOT_PROJECT_ID)||!oauthClientRef(raw.AFW_OAUTH_PILOT_CLIENT_ID)||!text(clientName,200)||!['es','en','pt'].includes(locale)
  ||![started,expires,humanStart,humanEnd].every(validWall)||expires<=started||expires-started>600000||humanEnd<=humanStart||humanEnd-humanStart>600000)
  throw unavailable();
 return {issuer,clientName,locale,profile:Object.freeze({profileId:'afw.preparation-consent.v1',projectId:raw.AFW_OAUTH_PILOT_PROJECT_ID,
  clientId:raw.AFW_OAUTH_PILOT_CLIENT_ID,resource,trialStartedAt:started,trialExpiresAt:expires}),
  management:Object.freeze({startedAt:humanStart,expiresAt:humanEnd})};
}

function decodeSource(raw){
 const startedAt=instant(raw.AFW_PREPARATION_SOURCE_SESSION_STARTED_AT),expiresAt=instant(raw.AFW_PREPARATION_SOURCE_SESSION_EXPIRES_AT);
 const subject=raw.AFW_PREPARATION_SOURCE_SESSION_SUBJECT??'';
 if(![startedAt,expiresAt].every(validWall)||expiresAt<=startedAt||expiresAt-startedAt>600000
  ||(subject!==''&&!ref(subject)))throw unavailable();
 return Object.freeze({profileId:'afw.preparation-source-session.v1',operationKey:raw.AFW_PREPARATION_SOURCE_SESSION_OPERATION_KEY,
  subject:subject===''?null:subject,startedAt,expiresAt});
}

function decodeSourceCreate(raw){
 const session=decodeSource(raw),secret=raw.AFW_PREPARATION_SOURCE_CSRF_SECRET;
 if(!ref(session.subject)||typeof session.operationKey!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(session.operationKey)
  ||typeof secret!=='string'||!/^[a-f0-9]{64}$/.test(secret))throw unavailable();
 return Object.freeze({...session,profileId:'afw.preparation-source-intake.v1'});
}

/** Isolated source entry, unmounted until a separately scoped deployment.
 * Trusted options are server integration only; no request/env hook installs them.
 * Each fetch creates private hosts over the same real KV/D1 and original dates.
 */
export function createDelegatedPreparationWorker(options={}){
 const cfg=readRecord(options,OPTIONS);
 if(!cfg||OPTIONS.some(k=>cfg[k]!==undefined&&typeof cfg[k]!=='function'))throw unavailable();
 const wall=cfg.now??(()=>Date.now()),tick=cfg.monotonic??(()=>performance.now());
 return Object.freeze({async fetch(request,env,ctx){
  let control;
  try{
   const asset=preparationComicAssetResponse(request);if(asset)return asset;
   // Each exact human source entry has an independent gate from OAuth/agent paths.
   const path=new URL(request.url).pathname,sourceCreate=path==='/source/new',sourceEntry=['/source','/source/identity'].includes(path);
   const selectedFlag=sourceCreate?'AFW_PREPARATION_SOURCE_CREATE_ENABLED':sourceEntry?'AFW_PREPARATION_SOURCE_INTAKE_ENABLED':'AFW_DELEGATED_PREPARATION_ROUTER_ENABLED';
   // Disabled selected entry does not inspect other pins/bindings/body/identity/clocks.
   if(env?.[selectedFlag]!=='true')return failure(404);
   const activeKeys=sourceCreate?SOURCE_CREATE_CONFIG:sourceEntry?SOURCE_CONFIG:CONFIG;
   let pins,invalidated=false;
   function current(){
    if(invalidated)throw unavailable();
    try{
     const live=readRecord(options,OPTIONS);
     if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||(pins&&!activeKeys.every(k=>env[k]===pins[k])))throw unavailable();
    }catch{invalidated=true;throw unavailable();}
   }
   const now=()=>{current();return wall();},monotonic=()=>{current();return tick();};
   // This is the one original ingress lifetime, before decoding or host creation.
   const lease=createCapsulePreparationRequestLease({now,monotonic,signal:request.signal});
   control=readCapsulePreparationRequestLease(lease);control.check();
   pins=Object.fromEntries(activeKeys.map(k=>[k,env[k]]));
   if(sourceCreate){
    const profile=decodeSourceCreate(pins);control.check();
    // A dedicated server secret only; import consumes this ingress lease and
    // cannot restart its clock or reuse an Access assertion as key material.
    const csrfKey=await control.wait(()=>crypto.subtle.importKey('raw',
     new Uint8Array(pins.AFW_PREPARATION_SOURCE_CSRF_SECRET.match(/../g).map(x=>parseInt(x,16))),
     {name:'HMAC',hash:'SHA-256'},false,['sign','verify']));
    control.check();
    const host=createPreparationSourceIntakeHttpHost({enabled:true,issuer:SOURCE_ISSUER,env,profile,csrfKey,
     accessVerifier:cfg.sourceAccessVerifier,now,monotonic});
    if(typeof host!=='function')throw unavailable();
    return await host(request,ctx,lease);
   }
   if(sourceEntry){
    const profile=decodeSource(pins);control.check();
    const host=createPreparationSourceSessionHttpHost({enabled:true,issuer:SOURCE_ISSUER,env,profile,
     accessVerifier:cfg.sourceAccessVerifier,now,monotonic});
    if(typeof host!=='function')throw unavailable();
    return await host(request,ctx,lease);
   }
   const parsed=decode(pins);control.check();
   const router=createDelegatedPreparationRouter({enabled:true,env,...parsed,accessVerifier:cfg.accessVerifier,now,monotonic});
   if(typeof router!=='function')throw unavailable();
   // Selected host retains its existing output fence; no second response proxy.
   return await router(request,ctx,lease);
  }catch{return failure();}
  finally{control?.close();}
 }});
}
export default createDelegatedPreparationWorker();
