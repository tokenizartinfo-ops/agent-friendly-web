import {timingSafeEqual} from 'node:crypto';
import {readRecord,ref,text,clock as validWall} from './agent-consumption-input.mjs';
import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createPreparationSourceIntakeStore} from './preparation-source-intake-store.mjs';
import {renderPreparationSourceIntakeView} from './preparation-source-intake-view.mjs';

const OPTIONS=['enabled','issuer','env','profile','csrfKey','accessVerifier','now','monotonic'];
const PROFILE=['profileId','operationKey','subject','startedAt','expiresAt'];
const PINS=['AFW_PREPARATION_SOURCE_CREATE_ENABLED','ACCESS_TEAM_DOMAIN','ACCESS_AUD','DELEGATED_RATE_LIMITER'];
const ISSUER='https://preparation-canary.agentfriendlyweb.dev',SITE='https://agentfriendlyweb.dev',COOKIE='__Host-AFWSourceCSRF';
const FIELDS=['csrf','decision','website','organization','confirmCreate'];
const enc=new TextEncoder(),tokenPattern=/^[a-f0-9]{64}\.[a-f0-9]{64}$/;
class Rejected extends Error{constructor(status){super('Source intake request unavailable');this.status=status;}}
const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
const unhex=value=>new Uint8Array(value.match(/../g).map(x=>parseInt(x,16)));
const random=(bytes=32)=>hex(crypto.getRandomValues(new Uint8Array(bytes)));
function profileOf(raw){
 const p=readRecord(raw,PROFILE);
 return p?.profileId==='afw.preparation-source-intake.v1'&&typeof p.operationKey==='string'
  &&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(p.operationKey)&&ref(p.subject)
  &&validWall(p.startedAt)&&validWall(p.expiresAt)&&p.expiresAt>p.startedAt&&p.expiresAt-p.startedAt<=600000?p:null;
}
function validKey(key){
 return key instanceof CryptoKey&&key.type==='secret'&&key.extractable===false&&key.algorithm.name==='HMAC'
  &&key.algorithm.hash?.name==='SHA-256'&&key.algorithm.length===256&&key.usages.length===2&&key.usages.includes('sign')&&key.usages.includes('verify');
}
function postHeaders(request){
 if(request.headers.get('Origin')!==ISSUER)throw new Rejected(403);
 const site=request.headers.get('Sec-Fetch-Site');if(site!==null&&site!=='same-origin')throw new Rejected(403);
 if(!/^application\/x-www-form-urlencoded(?:;\s*charset=utf-8)?$/i.test(request.headers.get('Content-Type')??'')||request.headers.has('Content-Encoding'))throw new Rejected(415);
 const length=request.headers.get('Content-Length');
 if(length!==null&&(!/^(0|[1-9][0-9]{0,5})$/.test(length)||Number(length)>4096))throw new Rejected(Number(length)>4096?413:400);
 return length;
}
function cookieOf(request){
 const raw=request.headers.get('Cookie')??'';if(raw.length>32768)throw new Rejected(403);
 const found=raw.split(';').map(x=>x.trim()).filter(x=>x.slice(0,x.indexOf('='))===COOKIE);
 if(found.length!==1)throw new Rejected(403);
 const value=found[0].slice(COOKIE.length+1);if(!tokenPattern.test(value))throw new Rejected(403);return value;
}

/** Detached human-only HTTP host. SERVER profile/key/verifier/binding confer
 * authority; browser data never selects identity, project, claim or DB.
 * GET issues only a stateless CSRF form, not a project/grant/transaction row. */
export function createPreparationSourceIntakeHttpHost(options){
 const cfg=readRecord(options,OPTIONS);if(!cfg||cfg.enabled!==true)return null;
 const p=profileOf(cfg.profile),env=cfg.env,now=cfg.now??(()=>Date.now()),mono=cfg.monotonic??(()=>performance.now());
 const verify=cfg.accessVerifier??verifyCloudflareAccessJwtWithExpiry,key=cfg.csrfKey;
 let pins,limiter,limit,invalidated=false;
 try{
  if(cfg.issuer!==ISSUER||!p||!env||typeof env!=='object'||typeof now!=='function'||typeof mono!=='function'||typeof verify!=='function')return null;
  // Do not inspect a key or storage when the independent server flag is closed.
  pins=Object.fromEntries(PINS.map(k=>[k,env[k]]));
  if(pins.AFW_PREPARATION_SOURCE_CREATE_ENABLED!=='true')return null;
  limiter=pins.DELEGATED_RATE_LIMITER;limit=limiter?.limit;
  if(!validKey(key)||typeof limit!=='function'||!text(pins.ACCESS_TEAM_DOMAIN,253)||!text(pins.ACCESS_AUD,512))return null;
 }catch{return null;}
 function configuration(){
  if(invalidated)throw new Rejected(503);
  try{
   const live=readRecord(options,OPTIONS),profile=profileOf(live?.profile);
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||!profile||!PROFILE.every(k=>profile[k]===p[k])
    ||!PINS.every(k=>env[k]===pins[k])||limiter.limit!==limit||!validKey(key))throw Error();
  }catch{invalidated=true;throw new Rejected(503);}
 }
 return async function handle(request,_ctx,originalLease){
  void _ctx;const ownsLease=originalLease===undefined;
  let control,closed=false,identityExpires=Infinity,identity,sessionHash,db,withSession,saveAttempted=false;
  function current(){
   if(closed)throw new Rejected(503);configuration();control.check();
   const wall=now();if(!validWall(wall))throw new Rejected(503);
   if(wall<p.startedAt||wall>=p.expiresAt)throw new Rejected(410);
   if(wall>=identityExpires)throw new Rejected(401);
   if(db&&(env.DB!==db||db.withSession!==withSession))throw new Rejected(503);
   return wall;
  }
  const wait=work=>control.wait(async()=>{current();const v=await work();current();return v;});
  const hash=value=>wait(async()=>hex(await crypto.subtle.digest('SHA-256',enc.encode(value))));
  const data=nonce=>enc.encode(JSON.stringify(['afw.source-create-csrf.v1',ISSUER,p.profileId,p.subject,p.operationKey,
   p.startedAt,p.expiresAt,identityExpires,sessionHash,nonce]));
  async function issueCsrf(){
   const nonce=random(),signature=await wait(()=>crypto.subtle.sign('HMAC',key,data(nonce)));
   return nonce+'.'+hex(signature);
  }
  async function verifyCsrf(token){
   const cookie=cookieOf(request);
   if(typeof token!=='string'||!tokenPattern.test(token)||!timingSafeEqual(enc.encode(cookie),enc.encode(token)))throw new Rejected(403);
   const [nonce,signature]=token.split('.');
   if(await wait(()=>crypto.subtle.verify('HMAC',key,unhex(signature),data(nonce)))!==true)throw new Rejected(403);
  }
  async function readForm(declared){
   let reader,done=false,total=0,turns=0;const chunks=[];
   try{
    reader=request.body?.getReader();
    if(reader)for(;;){
     const item=await wait(()=>reader.read());if(item.done){done=true;break;}
     if(!(item.value instanceof Uint8Array)||++turns>4097)throw new Rejected(400);
     total+=item.value.byteLength;if(total>4096)throw new Rejected(413);chunks.push(new Uint8Array(item.value));
    }
    if(declared!==null&&Number(declared)!==total)throw new Rejected(400);
    const bytes=new Uint8Array(total);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.byteLength;}
    let f;try{f=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw new Rejected(400);}
    if([...f.keys()].some(k=>!FIELDS.includes(k))||['decision','website','organization'].some(k=>f.getAll(k).length!==1)
     ||f.getAll('csrf').length>1||f.getAll('confirmCreate').length>1||!['save','inspect'].includes(f.get('decision')))throw new Rejected(400);
    // Missing/malformed CSRF is an admission denial, not a new creation request.
    await verifyCsrf(f.get('csrf'));
    if((f.get('decision')==='save'&&f.get('confirmCreate')!=='yes')
     ||(f.has('confirmCreate')&&f.get('confirmCreate')!=='yes')
     ||f.get('website')!==SITE||!text(f.get('organization'),200))throw new Rejected(400);
    return f;
   }finally{
    if(reader&&!done)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* no private details */}
    try{reader?.releaseLock();}catch{/* pending underlying source */}
   }
  }
  function reply(status,code,fields={}){
   const view=renderPreparationSourceIntakeView({status,code,styleNonce:random(24),...fields});
   if(enc.encode(view.html).byteLength>32768)throw new Rejected(503);
   return new Response(view.html,{status,headers:{...view.headers,'Cache-Control':'private, no-store',
    'Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY',
    'Permissions-Policy':'camera=(), microphone=(), geolocation=()','Vary':'Cf-Access-Jwt-Assertion'}});
  }
  try{
   const lease=ownsLease?createCapsulePreparationRequestLease({now,monotonic:mono,signal:request.signal}):originalLease;
   control=readCapsulePreparationRequestLease(lease);if(!control)throw new Rejected(503);current();
   const url=new URL(request.url);
   if(url.origin!==ISSUER||url.pathname!=='/source/new')throw new Rejected(404);
   if(url.search||url.hash||enc.encode(url.href).byteLength>2048)throw new Rejected(400);
   if(!['GET','POST'].includes(request.method))throw new Rejected(405);
   const declared=request.method==='POST'?postHeaders(request):null;
   if(request.method==='GET'&&request.headers.has('Origin')&&request.headers.get('Origin')!==ISSUER)throw new Rejected(403);
   const token=request.headers.get('Cf-Access-Jwt-Assertion');
   const value=await wait(()=>verify({token,teamDomain:pins.ACCESS_TEAM_DOMAIN,audience:pins.ACCESS_AUD}));
   const verified=value?.ok===true?readRecord(value,['ok','identity']):null,id=readRecord(verified?.identity,['subject','email','expiresAt']);
   if(!id||!ref(id.subject)||!text(id.email,254)||!/^\S+@[^\s@]+\.[^\s@]+$/.test(id.email)||!validWall(id.expiresAt))throw new Rejected(401);
   identityExpires=id.expiresAt;current();if(id.subject!==p.subject)throw new Rejected(403);
   if(typeof token!=='string'||!token.trim())throw new Rejected(401);
   identity=Object.freeze({...id});sessionHash=await hash(token.trim());
   const rateKey=await hash(JSON.stringify(['source-intake-form',p.subject,p.operationKey,p.startedAt,p.expiresAt]));
   const limited=await wait(()=>limit.call(limiter,{key:'afw-preparation-source-intake:'+rateKey}));
   if(limited?.success!==true)throw new Rejected(limited?.success===false?429:503);
   const expiresAt=Math.min(p.expiresAt,identityExpires);
   if(request.method==='GET'){
    const csrfToken=await issueCsrf();current();
    const response=reply(200,'form_ready',{csrfToken,website:SITE,organization:'Agent Friendly Web',expiresAt});
    response.headers.set('Set-Cookie',COOKIE+'='+csrfToken+'; Secure; HttpOnly; SameSite=Strict; Path=/; Expires='+new Date(expiresAt).toUTCString()+
     '; Max-Age='+Math.max(0,Math.floor((expiresAt-current())/1000)));
    current();return response;
   }
   const f=await readForm(declared);current();
   db=env.DB;withSession=db?.withSession;if(typeof withSession!=='function')throw new Rejected(503);current();
   const persistence=createPreparationSourceIntakeStore({enabled:true,profile:cfg.profile,now:current,requestLease:lease,
    resolveIdentity:async()=>{current();return identity;},
    createPrimarySession:()=>{current();return withSession.call(db,'first-primary');}});
   if(!persistence)throw new Rejected(503);
   const input={contract:'agentfriendly.project-create.v1',confirmCreate:true,idempotencyKey:p.operationKey,website:SITE,organization:f.get('organization')};
   // inspect's canonical comparison DTO is NOT a new creation consent.
   const method=f.get('decision')==='save'?'create':'inspect';saveAttempted=method==='create';
   const result=await persistence[method](input);current();
   const status={source_created:200,source_already_recorded:200,source_not_recorded:200,source_conflict:409,
    invalid_source_request:400,unknown_ack:503,source_unavailable:503}[result?.code];
   if(!status)throw new Rejected(503);
   const fields=status===200?{csrfToken:f.get('csrf'),website:SITE,organization:input.organization,expiresAt,projectRef:result.projectRef}: {};
   const response=reply(status,result.code,fields);current();return response;
  }catch(error){
   const status=error instanceof Rejected?error.status:503;
   const code=saveAttempted?'unknown_ack':({400:'source_request_invalid',401:'source_identity_required',403:'source_request_denied',
    404:'source_not_found',405:'source_method_denied',410:'source_paused',413:'source_request_too_large',415:'source_media_denied',429:'source_limited'}[status]??'source_unavailable');
   return reply(saveAttempted?503:status,code);
  }finally{closed=true;if(ownsLease)control?.close();}
 };
}
