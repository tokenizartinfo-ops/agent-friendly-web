import {readRecord,ref,clock as validWall} from './agent-consumption-input.mjs';
import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {renderPreparationSourceSessionView} from './preparation-source-session-view.mjs';

const OPTIONS=['enabled','issuer','env','profile','accessVerifier','now','monotonic'];
const PROFILE=['profileId','operationKey','subject','startedAt','expiresAt'];
const PINS=['AFW_PREPARATION_SOURCE_INTAKE_ENABLED','ACCESS_TEAM_DOMAIN','ACCESS_AUD','DELEGATED_RATE_LIMITER'];
const ISSUER='https://preparation-canary.agentfriendlyweb.dev';
class Rejected extends Error{constructor(status){super('Source session unavailable');this.status=status;}}
const keyOk=v=>typeof v==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(v);
function profileOf(raw){
 const p=readRecord(raw,PROFILE);
 return p?.profileId==='afw.preparation-source-session.v1'&&keyOk(p.operationKey)&&(p.subject===null||ref(p.subject))
  &&validWall(p.startedAt)&&validWall(p.expiresAt)&&p.expiresAt>p.startedAt&&p.expiresAt-p.startedAt<=600000?p:null;
}
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');
const nonce=()=>Array.from(crypto.getRandomValues(new Uint8Array(24)),b=>b.toString(16).padStart(2,'0')).join('');
const authority=()=>({sourceWritten:false,domainVerificationChecked:false,consentGranted:false,authorizationGranted:false,
 operationalReadiness:false,publicationAllowed:false,chargeAllowed:false,executionAllowed:false});
const headers=()=>({'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff',
 'Vary':'Cf-Access-Jwt-Assertion, Accept','X-Frame-Options':'DENY',
 'Content-Security-Policy':"default-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'",
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()'});

/** Detached GET-only session bootstrap. No storage, OAuth, registration, source
 * creation or domain verification dependency. Verifier/profile are trusted
 * SERVER configuration, never options supplied by the browser. */
export function createPreparationSourceSessionHttpHost(options){
 const cfg=readRecord(options,OPTIONS);
 if(!cfg||cfg.enabled!==true)return null;
 let p,env,pins,limiter,limit;
 const now=cfg.now===undefined?()=>Date.now():cfg.now,mono=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 const verify=cfg.accessVerifier===undefined?verifyCloudflareAccessJwtWithExpiry:cfg.accessVerifier;
 try{
  p=profileOf(cfg.profile);env=cfg.env;
  if(cfg.issuer!==ISSUER||!p||!env||typeof env!=='object'||typeof now!=='function'||typeof mono!=='function'||typeof verify!=='function')return null;
  pins=Object.fromEntries(PINS.map(k=>[k,env[k]]));limiter=pins.DELEGATED_RATE_LIMITER;limit=limiter?.limit;
  if(pins.AFW_PREPARATION_SOURCE_INTAKE_ENABLED!=='true'||typeof pins.ACCESS_TEAM_DOMAIN!=='string'||!pins.ACCESS_TEAM_DOMAIN
   ||typeof pins.ACCESS_AUD!=='string'||!pins.ACCESS_AUD||typeof limit!=='function')return null;
 }catch{return null;}
 let invalidated=false;
 function configuration(){
  if(invalidated)throw new Rejected(503);
  try{
   const live=readRecord(options,OPTIONS),profile=profileOf(live?.profile);
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||!profile||!PROFILE.every(k=>profile[k]===p[k])
    ||!PINS.every(k=>env[k]===pins[k])||limiter.limit!==limit)throw Error();
  }catch{invalidated=true;throw new Rejected(503);}
 }
 return async function handle(request,_ctx,originalLease){
  void _ctx; // Reserved integration context, no background work in this GET-only host.
  const ownsLease=originalLease===undefined;
  let control,closed=false,identityExpires=Infinity;
  const jsonMode=(()=>{try{return new URL(request.url).pathname==='/source/identity';}catch{return false;}})();
  function current(){
   if(closed)throw new Rejected(503);
   configuration();control.check();
   const wall=now();
   if(!validWall(wall))throw new Rejected(503);
   if(wall<p.startedAt||wall>=p.expiresAt)throw new Rejected(410);
   if(wall>=identityExpires)throw new Rejected(401);
   return wall;
  }
  const wait=work=>control.wait(async()=>{current();const value=await work();current();return value;});
  function reply(status,receipt){
   const code=receipt?.code??({400:'source_session_request_invalid',401:'source_session_identity_required',403:'source_session_denied',
    404:'source_session_not_found',405:'source_session_method_denied',410:'source_session_paused',429:'source_session_limited'}[status]??'source_session_unavailable');
   if(jsonMode)return Response.json(receipt??{contract:'afw.preparation-source-session.v1',code,...authority()},{status,headers:headers()});
   const view=renderPreparationSourceSessionView({status,expiresAt:receipt?.expiresAt,serverSubjectPinned:receipt?.serverSubjectPinned===true,styleNonce:nonce()});
   return new Response(view.html,{status,headers:{...headers(),...view.headers}});
  }
  try{
   const lease=ownsLease?createCapsulePreparationRequestLease({now,monotonic:mono,signal:request.signal}):originalLease;
   control=readCapsulePreparationRequestLease(lease);if(!control)throw new Rejected(503);current();
   const url=new URL(request.url);
   if(url.origin!==ISSUER||!['/source','/source/identity'].includes(url.pathname))throw new Rejected(404);
   if(url.search||url.hash||new TextEncoder().encode(url.href).byteLength>2048)throw new Rejected(400);
   if(request.method!=='GET')throw new Rejected(405);
   const origin=request.headers.get('Origin');if(origin!==null&&origin!==ISSUER)throw new Rejected(403);
   const verified=await wait(()=>verify({token:request.headers.get('Cf-Access-Jwt-Assertion'),
    teamDomain:pins.ACCESS_TEAM_DOMAIN,audience:pins.ACCESS_AUD}));
   const result=verified?.ok===true?readRecord(verified,['ok','identity']):null,id=readRecord(result?.identity,['subject','email','expiresAt']);
   if(!id||!ref(id.subject)||!validWall(id.expiresAt))throw new Rejected(401);
   identityExpires=id.expiresAt;current();
   if(p.subject!==null&&id.subject!==p.subject)throw new Rejected(403);
   const digest=await wait(()=>hash(JSON.stringify(['source-session',id.subject,p.operationKey,p.startedAt,p.expiresAt])));
   const limited=await wait(()=>limit.call(limiter,{key:'afw-preparation-source-session:'+digest}));
   if(limited?.success!==true)throw new Rejected(limited?.success===false?429:503);
   const receipt=Object.freeze({contract:'afw.preparation-source-session.v1',code:'source_session_verified',
    sessionVerified:true,serverSubjectPinned:p.subject!==null,
    identity:Object.freeze({subject:id.subject,expiresAt:id.expiresAt}),expiresAt:Math.min(p.expiresAt,id.expiresAt),...authority()});
   current();const response=reply(200,receipt);current();return response;
  }catch(error){return reply(error instanceof Rejected?error.status:503);}
  finally{closed=true;if(ownsLease)control?.close();}
 };
}
