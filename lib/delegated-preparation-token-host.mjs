import {AsyncLocalStorage} from 'node:async_hooks';
import {OAuthAuthorizationServer,OAuthError} from '@cloudflare/workers-oauth-provider';
import {readRecord,readList,ref,oauthClientRef,clock as validWall} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createDelegatedPreparationConsentStore} from './delegated-preparation-consent-store.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {checkAgentCapsulePreparationSchema} from './agent-capsule-preparation-schema.mjs';

const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const OPTIONS=['enabled','issuer','env','profile','now','monotonic'];
const PROFILE=['profileId','projectId','clientId','resource','trialStartedAt','trialExpiresAt'];
const PINS=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_OAUTH_SERVICE_MODE',
 'AFW_OAUTH_PILOT_EXPIRES_AT','AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID','DB','OAUTH_KV','DELEGATED_RATE_LIMITER'];
const SDK=['grantType','clientId','subjectClientId','userId','grantId','scope','requestedScope','resource','props','env'];
const PROPS=['applicationGrantId','userId','projectId'];
const FIELDS=['grant_type','code','code_verifier','client_id','redirect_uri','resource','scope'];
const unavailable=()=>Error('Token connection unavailable');
class Rejected extends Error{constructor(status){super('Token connection unavailable');this.status=status;}}
const equal=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
const scopeSet=value=>{const a=readList(value,2);return a&&a.includes(READ)&&new Set(a).size===a.length&&a.every(x=>x===READ||x===DRAFTS)?a:null;};
function profile(value,issuer){
 const p=readRecord(value,PROFILE);
 return p?.profileId==='afw.preparation-consent.v1'&&ref(p.projectId)&&oauthClientRef(p.clientId)&&p.resource===issuer+'/mcp'
  &&validWall(p.trialStartedAt)&&validWall(p.trialExpiresAt)&&p.trialExpiresAt>p.trialStartedAt&&p.trialExpiresAt-p.trialStartedAt<=600000?p:null;
}
function failure(status){
 return Response.json({error:status>=429?'temporarily_unavailable':'invalid_request',error_description:'Connection unavailable'},
  {status,headers:{'Cache-Control':'no-store','Pragma':'no-cache'}});
}
function finite(work){let timer;return Promise.race([work,new Promise(resolve=>{timer=setTimeout(resolve,2000);})]).finally(()=>clearTimeout(timer));}

/** Detached own preparation AS/token source. No production entrypoint imports it.
 * Its callback has authority ONLY in fetchToken's original request-local lease.
 * Returning the AS does not authorize registration, refresh, or live mounting.
 */
export function createDelegatedPreparationAuthorizationHost(options){
 const cfg=readRecord(options,OPTIONS);if(!cfg||cfg.enabled!==true)return null;
 const now=cfg.now===undefined?()=>Date.now():cfg.now,mono=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 let p,pins,db,prepare,withSession,limiter,limit,start,tick;
 try{
  const u=new URL(cfg.issuer);p=profile(cfg.profile,cfg.issuer);
  if(u.protocol!=='https:'||u.origin!==cfg.issuer||!p||!cfg.env||typeof cfg.env!=='object'||typeof now!=='function'||typeof mono!=='function')throw Error();
  pins=Object.fromEntries(PINS.map(k=>[k,cfg.env[k]]));db=pins.DB;prepare=db?.prepare;withSession=db?.withSession;
  limiter=pins.DELEGATED_RATE_LIMITER;limit=limiter?.limit;start=now();tick=mono();
  if(pins.AFW_DELEGATED_OAUTH_ENABLED!=='true'||pins.AFW_DELEGATED_PREPARATION_ENABLED!=='true'||pins.AFW_OAUTH_SERVICE_MODE!=='window'
   ||pins.AFW_OAUTH_PILOT_EXPIRES_AT!==new Date(p.trialExpiresAt).toISOString()||pins.AFW_OAUTH_PILOT_PROJECT_ID!==p.projectId
   ||pins.AFW_OAUTH_PILOT_CLIENT_ID!==p.clientId||typeof prepare!=='function'||typeof withSession!=='function'||!pins.OAUTH_KV
   ||typeof limit!=='function'||!validWall(start)||!Number.isFinite(tick)||tick<0||start<p.trialStartedAt||start>=p.trialExpiresAt)throw Error();
 }catch{throw unavailable();}
 const requestContext=new AsyncLocalStorage();
 let invalidated=false,lastWall=start,lastTick=tick,as,fetchSdk,validateSdk;
 function guard(control){
  if(invalidated)throw unavailable();
  try{
   const live=readRecord(options,OPTIONS),pr=profile(live?.profile,cfg.issuer),wall=now(),m=mono();
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||!pr||!PROFILE.every(k=>pr[k]===p[k])
    ||!PINS.every(k=>cfg.env[k]===pins[k])||db.prepare!==prepare||db.withSession!==withSession||limiter.limit!==limit
    ||(as&&(as.fetch!==fetchSdk||as.validateToken!==validateSdk))
    ||!validWall(wall)||!Number.isFinite(m)||wall<lastWall||m<lastTick||wall>=p.trialExpiresAt||m-tick>=p.trialExpiresAt-start)throw Error();
   lastWall=wall;lastTick=m;
  }catch{invalidated=true;throw unavailable();}
  const remaining=Math.min(p.trialExpiresAt-lastWall,p.trialExpiresAt-start-(lastTick-tick),control?.check().remaining??Infinity);
  if(remaining<=0)throw unavailable();
  return {wall:lastWall,remaining};
 }
 const primary=s=>{s.current();return withSession.call(db,'first-primary');};
 function reduce(s){
  if(!s.own||s.handedOff)return Promise.resolve();
  s.cleanup??=Promise.resolve().then(()=>createDelegatedOAuthStore(withSession.call(db,'first-primary'))
   .revokeGrant(s.own.grantId,s.own.subject,new Date().toISOString()));
  return s.cleanup;
 }
 async function wait(s,fn){
  const time=s.current();let timer;
  try{return await s.control.wait(()=>{
   const raw=Promise.resolve().then(()=>{s.current();return fn();}).then(value=>{s.current();return value;});
   s.pending.push(raw.then(()=>s.closed?reduce(s):undefined,()=>s.closed?reduce(s):undefined));
   return Promise.race([raw,new Promise((_,reject)=>{timer=setTimeout(()=>reject(unavailable()),Math.max(1,Math.floor(time.remaining)));})]);
  });}finally{clearTimeout(timer);}
 }
 async function schema(s){
  const result=await wait(s,()=>checkAgentCapsulePreparationSchema({createPrimarySession:()=>primary(s),assertCurrent:s.current}));
  if(result.ready!==true)throw unavailable();
 }
 async function inspect(s){
  await schema(s);
  const r=await s.persistence.inspect(s.reference);s.current();
  if(r.code!=='decision_saved'||r.applicationGrantStored!==true||r.grantRef!==s.grantId||!equal(r.scopes,s.ceiling)
   ||r.expiresAt!==s.expiresAt||s.current().wall>=r.expiresAt)throw unavailable();
  return r;
 }
 // SDK1.2.1/KV require at least60s. Reserve the remaining ORIGINAL request
 // budget for callback/SDK work; never round up or extend the consent expiry.
 function tokenTtl(s){
  const time=s.current(),left=Math.floor((s.expiresAt-time.wall-time.remaining)/1000);
  if(left<60)throw unavailable();return Math.min(90,left);
 }
 function snapshot(value){
  const r=readRecord(value,SDK),props=readRecord(r?.props,PROPS),ceiling=scopeSet(r?.scope),asked=scopeSet(r?.requestedScope);
  if(!r||r.env!==cfg.env||r.grantType!=='authorization_code'||r.clientId!==p.clientId||r.subjectClientId!==p.clientId
   ||r.resource!==p.resource||!ref(r.userId)||typeof r.grantId!=='string'||!r.grantId||r.grantId.length>256
   ||!props||!ref(props.applicationGrantId)||props.userId!==r.userId||props.projectId!==p.projectId||!ceiling||!asked
   ||asked.some(x=>!ceiling.includes(x)))throw unavailable();
  return {r,props,ceiling,asked,signature:JSON.stringify([r.grantType,r.clientId,r.subjectClientId,r.userId,r.grantId,ceiling,asked,r.resource,props])};
 }
 async function exchange(value){
  const s=requestContext.getStore();
  // SDK1.2.1 invalid_grant auto-revokes provider state. Unowned/uncertain
  // denials use temporarily_unavailable so they cannot revoke another winner.
  try{
   if(!s||s.closed||s.callbackStarted)throw unavailable();s.callbackStarted=true;s.current();
   const initial=snapshot(value),{r,props,ceiling,asked}=initial;
   if(s.requestedScope&&(!equal(s.requestedScope,asked)||s.requestedScope.some(x=>!ceiling.includes(x))))throw unavailable();
   await schema(s);
   const unchanged=()=>{s.current();if(snapshot(value).signature!==initial.signature)throw unavailable();};
   const row=await wait(s,()=>primary(s).prepare('SELECT handle_hash,request_hash FROM delegated_preparation_consents WHERE grant_id=? AND user_id=? AND profile_id=? AND project_id=? AND client_id=? AND resource=? AND trial_started_at=? AND trial_expires_at=? LIMIT 1')
    .bind(props.applicationGrantId,r.userId,p.profileId,p.projectId,p.clientId,p.resource,p.trialStartedAt,p.trialExpiresAt).first());
   if(!row)throw unavailable();
   s.reference={handleHash:row.handle_hash,requestHash:row.request_hash,subject:r.userId};s.grantId=props.applicationGrantId;
   s.ceiling=[...ceiling];s.issuedScope=[...asked];s.subject=r.userId;
   s.persistence=createDelegatedPreparationConsentStore({enabled:true,profile:p,createPrimarySession:()=>primary(s),now,requestLease:s.lease});
   if(!s.persistence)throw unavailable();
   const admitted=await s.persistence.inspect(s.reference);s.current();
   if(admitted.code!=='decision_saved'||admitted.applicationGrantStored!==true||admitted.grantRef!==s.grantId||!equal(admitted.scopes,ceiling))throw unavailable();
   s.expiresAt=admitted.expiresAt;unchanged();tokenTtl(s);
   const consumed=await wait(s,async()=>{
    const g=await createDelegatedOAuthStore(primary(s)).consumeExchange(s.grantId,s.subject,p.clientId,p.resource,new Date(s.current().wall).toISOString());
    // Capture only this acknowledged conditional UPDATE, before the next
    // fallible request/config fence. Null/unknown/losing results stay unowned.
    if(g?.grantId===s.grantId&&g.subject===s.subject&&g.clientId===p.clientId&&g.projectId===p.projectId&&g.resource===p.resource
     &&g.status==='active'&&Date.parse(g.expiresAt)===s.expiresAt&&equal(g.scopes,s.ceiling))s.own={grantId:g.grantId,subject:g.subject};
    return g;
   });
   if(!consumed||!s.own)throw unavailable();
   unchanged();await inspect(s);unchanged();
   return {accessTokenTTL:tokenTtl(s),refreshTokenTTL:0};
  }catch{throw new OAuthError('temporarily_unavailable',{description:'Connection unavailable',statusCode:503});}
 }
 as=new OAuthAuthorizationServer({issuer:cfg.issuer,resources:[p.resource],scopesSupported:[READ,DRAFTS],accessTokenTTL:90,
  clientIdMetadataDocumentEnabled:false,clientRegistrationCallback:()=>({code:'access_denied',description:'Connection unavailable',status:403}),
  tokenExchangeCallback:exchange});
 fetchSdk=as.fetch;validateSdk=as.validateToken;
 if(typeof fetchSdk!=='function'||typeof validateSdk!=='function')throw unavailable();
 async function bytes(s,body,cap){
  let reader,done=false,total=0,turns=0;const chunks=[];
  try{
   reader=body?.getReader();if(reader)for(;;){
    const item=await wait(s,()=>reader.read());if(item.done){done=true;break;}
    if(!(item.value instanceof Uint8Array)||++turns>cap+1)throw new Rejected(400);
    total+=item.value.byteLength;if(total>cap)throw new Rejected(cap===4096?413:503);chunks.push(new Uint8Array(item.value));
   }
   const all=new Uint8Array(total);let offset=0;for(const item of chunks){all.set(item,offset);offset+=item.byteLength;}return all;
  }finally{
   if(reader&&!done)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* finite request source */}
   try{reader?.releaseLock();}catch{/* pending reader */}
  }
 }
 async function fetchToken(request,ctx){
  if(typeof ctx?.waitUntil!=='function')return failure(503);
  const s={pending:[],closed:false,own:null,handedOff:false,callbackStarted:false};
  s.current=()=>{if(s.closed)throw unavailable();return guard(s.control);};
  try{
   guard();s.lease=createCapsulePreparationRequestLease({now,monotonic:mono,signal:request.signal});
   s.control=readCapsulePreparationRequestLease(s.lease);s.current();
   const url=new URL(request.url);
   if(url.origin!==cfg.issuer||url.pathname!=='/oauth/token')throw new Rejected(404);
   if(url.hash||url.search||new TextEncoder().encode(url.href).byteLength>8192)throw new Rejected(400);
   if(request.method!=='POST')throw new Rejected(405);
   if(request.headers.has('Origin')&&request.headers.get('Origin')!==cfg.issuer)throw new Rejected(403);
   if(!/^application\/x-www-form-urlencoded(?:;\s*charset=utf-8)?$/i.test(request.headers.get('Content-Type')??'')||request.headers.has('Content-Encoding'))throw new Rejected(415);
   const declared=request.headers.get('Content-Length');
   if(declared!==null&&(!/^(0|[1-9][0-9]{0,5})$/.test(declared)||Number(declared)>4096))throw new Rejected(Number(declared)>4096?413:400);
   const body=await bytes(s,request.body,4096);
   if(declared!==null&&Number(declared)!==body.byteLength)throw new Rejected(400);
   let form;try{form=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(body));}catch{throw new Rejected(400);}
   if([...form.keys()].some(k=>!FIELDS.includes(k))||FIELDS.some(k=>form.getAll(k).length>1)
    ||form.get('grant_type')!=='authorization_code'||form.get('client_id')!==p.clientId||form.get('resource')!==p.resource
    ||!form.get('code')||!form.get('code_verifier')||!form.get('redirect_uri'))throw new Rejected(400);
   s.requestedScope=form.has('scope')?scopeSet(form.get('scope').split(' ')):null;
   if(form.has('scope')&&!s.requestedScope)throw new Rejected(400);
   const digest=await wait(s,()=>crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([p.clientId,p.resource]))));
   const key=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
   const limited=await wait(s,()=>limit.call(limiter,{key:'afw-preparation-token:'+key}));
   if(limited?.success!==true)throw new Rejected(limited?.success===false?429:503);
   const headers=new Headers(request.headers);headers.delete('Content-Length');
   const bounded=new Request(request.url,{method:'POST',headers,body,signal:request.signal});
   const response=await wait(s,()=>requestContext.run(s,()=>fetchSdk.call(as,bounded,cfg.env,ctx)));
   if(response.status!==200)throw new Rejected(response.status>=500?503:400);
   if(!s.own||!s.issuedScope||!/^application\/json(?:;|$)/i.test(response.headers.get('Content-Type')??''))throw unavailable();
   let payload;try{payload=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(await bytes(s,response.body,32768)));}catch{throw unavailable();}
   if(!payload||typeof payload!=='object'||Array.isArray(payload)||typeof payload.access_token!=='string'||!payload.access_token||payload.access_token.length>8192
    ||typeof payload.token_type!=='string'||payload.token_type.toLowerCase()!=='bearer'||payload.refresh_token!==undefined
    ||!Number.isSafeInteger(payload.expires_in)||payload.expires_in<1||payload.expires_in>90||typeof payload.scope!=='string')throw unavailable();
   const issued=scopeSet(payload.scope.split(' '));if(!issued||!equal(issued,s.issuedScope))throw unavailable();
   const verified=await wait(s,()=>validateSdk.call(as,p.resource,payload.access_token,cfg.env));
   const props=readRecord(verified?.props,PROPS),scope=scopeSet(verified?.scope);
   if(!verified||verified.userId!==s.subject||verified.clientId!==p.clientId||verified.audience!==p.resource
    ||!props||props.applicationGrantId!==s.own.grantId||props.userId!==s.subject||props.projectId!==p.projectId||!scope||!equal(scope,issued)
    ||!Number.isSafeInteger(verified.expiresAt)||!validWall(verified.expiresAt*1000)||verified.expiresAt*1000>s.expiresAt)throw unavailable();
   await inspect(s);
   const left=Math.floor((Math.min(verified.expiresAt*1000,s.expiresAt)-s.current().wall)/1000);if(left<1)throw unavailable();
   const final=Response.json({access_token:payload.access_token,token_type:payload.token_type,expires_in:Math.min(payload.expires_in,left),scope:payload.scope},
    {headers:{'Cache-Control':'no-store','Pragma':'no-cache'}});
   s.current();s.handedOff=true;return final;
  }catch(error){return failure(error instanceof Rejected?error.status:503);}
  finally{
   s.closed=true;s.control?.close();
   const immediate=reduce(s),drain=Promise.allSettled([immediate,...s.pending]).then(()=>reduce(s));
   try{ctx.waitUntil(finite(drain));}catch{/* No cleanup/client receipt claim. */}
  }
 }
 return Object.freeze({authorizationServer:as,fetchToken});
}
