import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
import {readRecord,ref,oauthClientRef} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createDelegatedPreparationConsentStore} from './delegated-preparation-consent-store.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {checkAgentCapsulePreparationSchema} from './agent-capsule-preparation-schema.mjs';
import {evaluatePreparationConsentChoice} from './delegated-preparation-consent-policy.mjs';
import {renderPreparationConsentView} from './delegated-preparation-consent-view.mjs';

const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const OPTIONS=['enabled','issuer','env','profile','authorizationServer','accessVerifier','now','monotonic','locale'];
const PROFILE=['profileId','projectId','clientId','resource','trialStartedAt','trialExpiresAt'];
const PINS=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_OAUTH_SERVICE_MODE',
 'AFW_OAUTH_PILOT_EXPIRES_AT','AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID','ACCESS_TEAM_DOMAIN','ACCESS_AUD',
 'DB','OAUTH_KV','DELEGATED_RATE_LIMITER'];
const API=['parseAuthRequest','describeConsent','beginConsent','approveConsent','denyConsent','completeAuthorization'];
const QUERY=['response_type','client_id','redirect_uri','resource','scope','state','code_challenge','code_challenge_method','project','ui_locales'];
const validTime=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const label=(v,n)=>typeof v==='string'&&v.length>0&&v.length<=n&&!/[\u0000-\u001f\u007f]/.test(v);
const opaque=(v,n)=>typeof v==='string'&&v.length>0&&v.length<=n&&/^[A-Za-z0-9_-]+$/.test(v);
const scopes=v=>Array.isArray(v)&&v.length>0&&v.length<=2&&v.includes(READ)&&new Set(v).size===v.length&&v.every(s=>s===READ||s===DRAFTS);
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
const packet=a=>JSON.stringify({responseType:a.responseType,clientId:a.clientId,redirectUri:a.redirectUri,scope:a.scope,
 state:a.state,codeChallenge:a.codeChallenge,codeChallengeMethod:a.codeChallengeMethod,resource:a.resource,issuer:a.issuer});
class Rejected extends Error{constructor(status){super('Consent request unavailable');this.status=status;}}
const unavailable=()=>Error('Consent host unavailable');
function profile(value,issuer){
 const p=readRecord(value,PROFILE);
 return p?.profileId==='afw.preparation-consent.v1'&&ref(p.projectId)&&oauthClientRef(p.clientId)&&p.resource===issuer+'/mcp'
  &&validTime(p.trialStartedAt)&&validTime(p.trialExpiresAt)&&p.trialExpiresAt>p.trialStartedAt&&p.trialExpiresAt-p.trialStartedAt<=600000?p:null;
}
function callback(value){
 try{
  const u=new URL(value),loopback=['localhost','127.0.0.1','[::1]'].includes(u.hostname);
  if((u.protocol!=='https:'&&!(u.protocol==='http:'&&loopback))||u.username||u.password||u.hash||/[\s;'"*]/.test(u.origin))throw Error();
  return u;
 }catch{throw new Rejected(400);}
}
function boundedCleanup(work){
 let timer;return Promise.race([work,new Promise(resolve=>{timer=setTimeout(resolve,2000);})]).finally(()=>clearTimeout(timer));
}

/** Detached human consent adapter ONLY. Never mounted by a production entrypoint.
 * The actual AS, profile, verifier and clocks are trusted server configuration.
 * No token/refresh/registration/connections handler is supplied by this module.
 */
export function createDelegatedPreparationConsentHttpHost(options){
 const cfg=readRecord(options,OPTIONS);
 if(!cfg||cfg.enabled!==true)return null;
 const env=cfg.env,now=cfg.now===undefined?()=>Date.now():cfg.now,mono=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 const verify=cfg.accessVerifier===undefined?verifyCloudflareAccessJwt:cfg.accessVerifier,locale=cfg.locale??'es';
 let p,pins,db,prepare,withSession,limiter,limit,getApi,api,methods,start,tick;
 try{
  const u=new URL(cfg.issuer);p=profile(cfg.profile,cfg.issuer);
  if(u.protocol!=='https:'||u.origin!==cfg.issuer||!p||!env||typeof env!=='object'||!['es','en','pt'].includes(locale)
   ||typeof now!=='function'||typeof mono!=='function'||typeof verify!=='function'||!(cfg.authorizationServer instanceof OAuthAuthorizationServer))throw Error();
  pins=Object.fromEntries(PINS.map(k=>[k,env[k]]));db=pins.DB;prepare=db?.prepare;withSession=db?.withSession;
  limiter=pins.DELEGATED_RATE_LIMITER;limit=limiter?.limit;start=now();tick=mono();
  if(pins.AFW_DELEGATED_OAUTH_ENABLED!=='true'||pins.AFW_DELEGATED_PREPARATION_ENABLED!=='true'||pins.AFW_OAUTH_SERVICE_MODE!=='window'
   ||pins.AFW_OAUTH_PILOT_EXPIRES_AT!==new Date(p.trialExpiresAt).toISOString()
   ||pins.AFW_OAUTH_PILOT_PROJECT_ID!==p.projectId||pins.AFW_OAUTH_PILOT_CLIENT_ID!==p.clientId
   ||!pins.ACCESS_TEAM_DOMAIN||!pins.ACCESS_AUD||!pins.OAUTH_KV||typeof prepare!=='function'||typeof withSession!=='function'||typeof limit!=='function'
   ||!validTime(start)||!Number.isFinite(tick)||tick<0||start<p.trialStartedAt||start>=p.trialExpiresAt)throw Error();
  getApi=cfg.authorizationServer.getOAuthApi;
  if(typeof getApi!=='function')throw Error();
  api=getApi.call(cfg.authorizationServer,env);methods=Object.fromEntries(API.map(k=>[k,api[k]]));
  if(!API.every(k=>typeof methods[k]==='function'))throw Error();
 }catch{throw unavailable();}
 let invalidated=false,lastWall=start,lastTick=tick;
 function guard(control){
  if(invalidated)throw unavailable();
  try{
   const current=readRecord(options,OPTIONS),live=profile(current?.profile,cfg.issuer),wall=now(),m=mono();
   if(!current||!OPTIONS.every(k=>current[k]===cfg[k])||!live||!PROFILE.every(k=>live[k]===p[k])
    ||!PINS.every(k=>env[k]===pins[k])||db.prepare!==prepare||db.withSession!==withSession||limiter.limit!==limit
    ||cfg.authorizationServer.getOAuthApi!==getApi||!API.every(k=>api[k]===methods[k])
    ||!validTime(wall)||!Number.isFinite(m)||wall<lastWall||m<lastTick||wall>=p.trialExpiresAt||m-tick>=p.trialExpiresAt-start)
    throw Error();
   lastWall=wall;lastTick=m;
  }catch{invalidated=true;throw unavailable();}
  const remaining=Math.min(p.trialExpiresAt-lastWall,p.trialExpiresAt-start-(lastTick-tick),control?.check().remaining??Infinity);
  if(remaining<=0)throw unavailable();
  return {wall:lastWall,remaining};
 }
 const nonce=()=>crypto.randomUUID().replaceAll('-','');
 function failure(status){
  const v=renderPreparationConsentView({locale,styleNonce:nonce()});
  return new Response(v.html,{status,headers:v.headers});
 }
 function html(view,extra,redirect){
  if(view?.code!=='view_ready'||new TextEncoder().encode(view.html).byteLength>32768)throw unavailable();
  const headers=new Headers(extra);for(const [key,value]of Object.entries(view.headers))headers.set(key,value);
  if(redirect.origin!==cfg.issuer)headers.set('Content-Security-Policy',headers.get('Content-Security-Policy').replace("form-action 'self';","form-action 'self' "+redirect.origin+';'));
  return new Response(view.html,{status:200,headers});
 }
 return async function(request,ctx){
  if(typeof ctx?.waitUntil!=='function')return failure(503);
  let control,closed=false,own=null,handedOff=false,cleanup;
  const pending=[];
  const current=()=>{if(closed)throw unavailable();return guard(control);};
  async function wait(fn){
   const time=current();let timer;
   try{
    return await control.wait(()=>{
     const raw=Promise.resolve().then(()=>{current();return fn();}).then(value=>{current();return value;});
     pending.push(raw.then(()=>{},()=>{}));
     return Promise.race([raw,new Promise((_,reject)=>{timer=setTimeout(()=>reject(unavailable()),Math.max(1,Math.floor(time.remaining)));})]);
    });
   }finally{clearTimeout(timer);}
  }
  const primary=()=>{current();return withSession.call(db,'first-primary');};
  const sdk=async(name,args,status=400)=>{
   try{return await wait(()=>methods[name].apply(api,args));}
   catch{current();throw new Rejected(status);}
  };
  async function identity(request,expected){
   const value=await wait(()=>verify({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:pins.ACCESS_TEAM_DOMAIN,audience:pins.ACCESS_AUD}));
   const r=value?.ok===true?readRecord(value,['ok','identity']):null,id=readRecord(r?.identity,['userId','email']);
   if(!id||!ref(id.userId)||!label(id.email,254)||(expected!==undefined&&id.userId!==expected))throw new Rejected(401);
   return id.userId;
  }
  const ready=async()=>{const r=await wait(()=>checkAgentCapsulePreparationSchema({createPrimarySession:primary,assertCurrent:current}));if(r.ready!==true)throw unavailable();};
  async function original(handleHash,subject){
   return wait(()=>primary().prepare("SELECT * FROM delegated_preparation_consents WHERE handle_hash=? AND user_id=? AND profile_id=? AND project_id=? AND client_id=? AND resource=? AND trial_started_at=? AND trial_expires_at=?")
    .bind(handleHash,subject,p.profileId,p.projectId,p.clientId,p.resource,p.trialStartedAt,p.trialExpiresAt).first());
  }
  async function form(request){
   if(request.headers.get('Origin')!==cfg.issuer)throw new Rejected(403);
   if(!/^application\/x-www-form-urlencoded(?:;\s*charset=utf-8)?$/i.test(request.headers.get('Content-Type')??'')||request.headers.has('Content-Encoding'))throw new Rejected(415);
   const declared=request.headers.get('Content-Length');
   if(declared!==null&&(!/^(0|[1-9][0-9]{0,5})$/.test(declared)||Number(declared)>4096))throw new Rejected(Number(declared)>4096?413:400);
   let reader,done=false,total=0,turns=0;const chunks=[];
   try{
    reader=request.body?.getReader();
    if(reader)for(;;){const item=await wait(()=>reader.read());if(item.done){done=true;break;}
     if(!(item.value instanceof Uint8Array)||++turns>4097)throw new Rejected(400);
     total+=item.value.byteLength;if(total>4096)throw new Rejected(413);chunks.push(new Uint8Array(item.value));}
    if(declared!==null&&Number(declared)!==total)throw new Rejected(400);
    const bytes=new Uint8Array(total);let i=0;for(const chunk of chunks){bytes.set(chunk,i);i+=chunk.byteLength;}
    let f;try{f=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw new Rejected(400);}
    if([...f.keys()].some(k=>!['handle','decision'].includes(k))||f.getAll('handle').length!==1||f.getAll('decision').length!==1
     ||!opaque(f.get('handle'),256)||!['read','drafts','cancel'].includes(f.get('decision')))throw new Rejected(400);
    return f;
   }finally{
    if(reader&&!done)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* no await or details */}
    try{reader?.releaseLock();}catch{/* pending source */}
   }
  }
  function reduceAuthority(){
   if(!own||handedOff)return Promise.resolve();
   cleanup??=Promise.resolve().then(()=>createDelegatedOAuthStore(withSession.call(db,'first-primary'))
    .revokeGrant(own.grantId,own.subject,new Date().toISOString()));
   return cleanup;
  }
  try{
   guard();
   const lease=createCapsulePreparationRequestLease({now,monotonic:mono,signal:request.signal});
   control=readCapsulePreparationRequestLease(lease);current();
   const url=new URL(request.url);
   if(url.origin!==cfg.issuer||url.pathname!=='/authorize')throw new Rejected(404);
   if(url.hash||new TextEncoder().encode(url.href).byteLength>8192)throw new Rejected(400);
   if(!['GET','POST'].includes(request.method))throw new Rejected(405);
   const f=request.method==='POST'?await form(request):null;
   if(request.method==='POST'&&url.search)throw new Rejected(400);
   if(request.method==='GET'){
    if([...url.searchParams.keys()].some(k=>!QUERY.includes(k))||QUERY.some(k=>url.searchParams.getAll(k).length>1)
     ||url.searchParams.get('project')!==p.projectId)throw new Rejected(400);
   }
   const subject=await identity(request);
   const key=await wait(()=>hash(JSON.stringify([subject,p.clientId,p.projectId,p.resource])));
   const limited=await wait(()=>limit.call(limiter,{key:'afw-preparation-consent:'+key}));
   if(limited?.success!==true)throw new Rejected(limited?.success===false?429:503);
   const persistence=createDelegatedPreparationConsentStore({enabled:true,profile:p,createPrimarySession:primary,now,requestLease:lease});
   if(!persistence)throw unavailable();
   if(request.method==='GET'){
    const entered=control.check().started,auth=await sdk('parseAuthRequest',[request]);
    if(auth.responseType!=='code'||auth.issuer!==cfg.issuer||auth.clientId!==p.clientId||auth.resource!==p.resource||auth.codeChallengeMethod!=='S256'
     ||typeof auth.codeChallenge!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(auth.codeChallenge)
     ||!scopes(auth.scope)||!label(auth.state,512))throw new Rejected(400);
    const redirect=callback(auth.redirectUri);
    await ready();
    const source=await wait(()=>primary().prepare("SELECT organization,revision FROM site_projects WHERE id=? AND user_id=? AND role='owner'").bind(p.projectId,subject).first());
    if(!source)throw new Rejected(403);
    const description=await sdk('describeConsent',[auth]);
    const transaction=await sdk('beginConsent',[auth]);
    const digest=await wait(()=>hash(transaction.handle)),requestHash=await wait(()=>hash(packet(auth)));
    const saved=await persistence.begin({handleHash:digest,requestHash,subject,requestedScopes:auth.scope,
     transactionStartedAt:entered,transactionExpiresAt:Math.min(entered+600000,p.trialExpiresAt),expectedRevision:source.revision});
    current();if(saved.code!=='consent_pending')throw new Rejected(['delegated_access_denied','context_changed'].includes(saved.code)?403:503);
    const row=await original(digest,subject);if(!row)throw unavailable();
    const view=renderPreparationConsentView({locale,projectName:source.organization,clientName:description.clientName,siteHost:row.hostname,
     handle:transaction.handle,styleNonce:nonce(),policy:saved.transaction,clock:{now:current().wall}});
    const response=html(view,transaction.headers,redirect);current();return response;
   }
   const handle=f.get('handle'),decision=f.get('decision'),digest=await wait(()=>hash(handle)),row=await original(digest,subject);
   if(!row)throw new Rejected(403);
   const reference={handleHash:digest,requestHash:row.request_hash,subject};
   if(decision==='cancel'){
    const denied=await sdk('denyConsent',[request,handle],403);
    if(await wait(()=>hash(packet(denied.request)))!==row.request_hash)throw new Rejected(403);
    const cancelled=await persistence.decide({...reference,decision});current();
    if(cancelled.code!=='cancelled')throw unavailable();
    const headers=new Headers(denied.headers);headers.set('Cache-Control','no-store');
    return new Response(null,{status:302,headers});
   }
   const prior=await persistence.inspect(reference);current();
   if(prior.code!=='consent_pending')throw new Rejected(prior.code==='unavailable'?503:403);
   const choice=evaluatePreparationConsentChoice({decision},prior.transaction,{now:current().wall});
   if(choice.code!=='choice_valid')throw new Rejected(400);
   await ready();await identity(request,subject);
   const approved=await sdk('approveConsent',[request,handle],403);
   if(await wait(()=>hash(packet(approved.request)))!==row.request_hash)throw new Rejected(403);
   const redirect=callback(approved.request.redirectUri);
   const admitted=await persistence.decide({...reference,decision});current();
   if(admitted.code!=='decision_saved'||admitted.freshDecision!==true||admitted.applicationGrantStored!==true
    ||admitted.grantRef!==row.grant_id||JSON.stringify(admitted.scopes)!==JSON.stringify(choice.scopes))
    throw new Rejected(['unknown_ack','unavailable'].includes(admitted.code)?503:403);
   own={grantId:admitted.grantRef,subject};
   await ready();await identity(request,subject);
   const live=await persistence.inspect(reference);current();
   if(live.code!=='decision_saved'||live.grantRef!==own.grantId||live.expiresAt!==admitted.expiresAt
    ||JSON.stringify(live.scopes)!==JSON.stringify(admitted.scopes)||current().wall>=admitted.expiresAt)throw unavailable();
   const completed=await wait(()=>methods.completeAuthorization.call(api,{request:approved.request,userId:subject,scope:[...admitted.scopes],metadata:{},
    props:{applicationGrantId:own.grantId,userId:subject,projectId:p.projectId},revokeExistingGrants:false}));
   const location=new URL(completed.redirectTo);
   if(location.origin!==redirect.origin||location.pathname!==redirect.pathname||location.username||location.password||location.hash
    ||location.searchParams.getAll('code').length!==1||!location.searchParams.get('code')
    ||location.searchParams.getAll('state').length!==1||location.searchParams.get('state')!==approved.request.state)throw unavailable();
   const headers=new Headers(approved.headers);headers.set('Location',location.href);headers.set('Cache-Control','no-store');
   const response=new Response(null,{status:302,headers});current();handedOff=true;return response;
  }catch(error){return failure(error instanceof Rejected?error.status:503);}
  finally{
   closed=true;control?.close();
   const immediate=reduceAuthority();
   const drain=Promise.allSettled([immediate,...pending]).then(()=>reduceAuthority());
   try{ctx.waitUntil(boundedCleanup(drain));}catch{/* No cleanup/client-receipt claim. */}
  }
 };
}
