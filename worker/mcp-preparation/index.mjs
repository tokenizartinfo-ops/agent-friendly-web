import {readRecord,ref,oauthClientRef,text,instant,clock as validWall} from '../../lib/agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from '../../lib/capsule-preparation-request-lease.mjs';
import {createDelegatedPreparationRouter} from '../../lib/delegated-preparation-router.mjs';

const OPTIONS=['accessVerifier','now','monotonic'];
const CONFIG=['AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE',
 'AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID','AFW_PREPARATION_TRIAL_STARTED_AT','AFW_OAUTH_PILOT_EXPIRES_AT',
 'AFW_PREPARATION_MANAGEMENT_STARTED_AT','AFW_PREPARATION_MANAGEMENT_EXPIRES_AT','AFW_PREPARATION_CLIENT_NAME','AFW_PREPARATION_LOCALE'];
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
   // Disabled entry does not inspect other config/bindings, body, identity or clocks.
   if(env?.AFW_DELEGATED_PREPARATION_ROUTER_ENABLED!=='true')return failure(404);
   let pins,invalidated=false;
   function current(){
    if(invalidated)throw unavailable();
    try{
     const live=readRecord(options,OPTIONS);
     if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||(pins&&!CONFIG.every(k=>env[k]===pins[k])))throw unavailable();
    }catch{invalidated=true;throw unavailable();}
   }
   const now=()=>{current();return wall();},monotonic=()=>{current();return tick();};
   // This is the one original ingress lifetime, before decoding or host creation.
   const lease=createCapsulePreparationRequestLease({now,monotonic,signal:request.signal});
   control=readCapsulePreparationRequestLease(lease);control.check();
   pins=Object.fromEntries(CONFIG.map(k=>[k,env[k]]));
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
