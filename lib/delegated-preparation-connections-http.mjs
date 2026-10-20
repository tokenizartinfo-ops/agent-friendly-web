import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
import {readRecord,readList,ref,oauthClientRef,text,clock as validWall,instant} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {renderPreparationConnectionsView,renderPreparationConsentView} from './delegated-preparation-consent-view.mjs';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const OPTIONS=['enabled','issuer','env','profile','management','clientName','locale','accessVerifier','now','monotonic'];
const PROFILE=['profileId','projectId','clientId','resource','trialStartedAt','trialExpiresAt'];
const PINS=['AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED','ACCESS_TEAM_DOMAIN','ACCESS_AUD','DB','DELEGATED_RATE_LIMITER'];
const COOKIE='__Host-afw-preparation-revoke',SQL_NOW="((julianday('now')-2440587.5)*86400000)";
const RELATION="d.grant_id=g.id AND d.user_id=g.user_id AND d.client_id=g.client_id AND d.project_id=g.project_id AND d.resource=g.resource"+
 " AND d.grant_created_iso=g.created_at AND d.grant_expires_iso=g.expires_at AND d.state='admitted'"+
 " AND g.scopes_json=CASE d.decision WHEN 'read' THEN '[\"afw:project:read\"]' WHEN 'drafts' THEN '[\"afw:project:read\",\"afw:capsule:prepare\"]' ELSE '' END";
const SELECT="SELECT g.id,g.scopes_json,g.created_at,g.expires_at,g.revoked_at FROM delegated_access_grants g JOIN delegated_preparation_consents d ON "+RELATION+
 " WHERE g.user_id=? AND g.client_id=? AND g.project_id=? AND g.resource=? AND d.profile_id=? AND d.trial_started_at=? AND d.trial_expires_at=?";
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
const unavailable=()=>Error('Connections unavailable');
class Rejected extends Error{constructor(status){super('Connections unavailable');this.status=status;}}
const opaque=value=>typeof value==='string'&&/^[A-Za-z0-9_-]{16,256}$/.test(value);
const nonce=()=>crypto.randomUUID().replaceAll('-','');
function profile(value,issuer){
 const p=readRecord(value,PROFILE);
 return p?.profileId==='afw.preparation-consent.v1'&&ref(p.projectId)&&oauthClientRef(p.clientId)&&p.resource===issuer+'/mcp'
  &&validWall(p.trialStartedAt)&&validWall(p.trialExpiresAt)&&p.trialExpiresAt>p.trialStartedAt&&p.trialExpiresAt-p.trialStartedAt<=600000?p:null;
}
function window(value){const m=readRecord(value,['startedAt','expiresAt']);return m&&validWall(m.startedAt)&&validWall(m.expiresAt)&&m.expiresAt>m.startedAt&&m.expiresAt-m.startedAt<=600000?m:null;}
function finite(work){let timer;return Promise.race([work,new Promise(resolve=>{timer=setTimeout(resolve,2000);})]).finally(()=>clearTimeout(timer));}

/** Detached HUMAN metadata/withdrawal only. The separate management window
 * never renews original agent authority; production imports and DDL are absent. */
export function createDelegatedPreparationConnectionsHttpHost(options){
 const cfg=readRecord(options,OPTIONS);if(!cfg||cfg.enabled!==true)return null;
 const now=cfg.now===undefined?()=>Date.now():cfg.now,mono=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 const verify=cfg.accessVerifier===undefined?verifyCloudflareAccessJwt:cfg.accessVerifier,locale=cfg.locale??'es';
 let p,m,pins,db,prepare,session,limiter,limit,start,tick;
 try{
  const u=new URL(cfg.issuer);p=profile(cfg.profile,cfg.issuer);m=window(cfg.management);
  if(u.protocol!=='https:'||u.origin!==cfg.issuer||!p||!m||!text(cfg.clientName,200)||!['es','en','pt'].includes(locale)
   ||typeof now!=='function'||typeof mono!=='function'||typeof verify!=='function'||!cfg.env||typeof cfg.env!=='object')throw Error();
  pins=Object.fromEntries(PINS.map(k=>[k,cfg.env[k]]));db=pins.DB;prepare=db?.prepare;session=db?.withSession;
  limiter=pins.DELEGATED_RATE_LIMITER;limit=limiter?.limit;start=now();tick=mono();
  if(pins.AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED!=='true'||!pins.ACCESS_TEAM_DOMAIN||!pins.ACCESS_AUD
   ||typeof prepare!=='function'||typeof session!=='function'||typeof limit!=='function'||!validWall(start)||!Number.isFinite(tick)||tick<0
   ||start<m.startedAt||start>=m.expiresAt||start<p.trialStartedAt)throw Error();
 }catch{throw unavailable();}
 let invalidated=false,lastWall=start,lastTick=tick;
 function guard(control){
  if(invalidated)throw unavailable();
  try{
   const live=readRecord(options,OPTIONS),pr=profile(live?.profile,cfg.issuer),management=window(live?.management),wall=now(),mark=mono();
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||!pr||!PROFILE.every(k=>pr[k]===p[k])||!management
    ||management.startedAt!==m.startedAt||management.expiresAt!==m.expiresAt||!PINS.every(k=>cfg.env[k]===pins[k])
    ||db.prepare!==prepare||db.withSession!==session||limiter.limit!==limit||!validWall(wall)||!Number.isFinite(mark)
    ||wall<lastWall||mark<lastTick||wall>=m.expiresAt||mark-tick>=m.expiresAt-start)throw Error();
   lastWall=wall;lastTick=mark;
  }catch{invalidated=true;throw unavailable();}
  const request=control?.check(),remaining=Math.min(m.expiresAt-lastWall,m.expiresAt-start-(lastTick-tick),request?.remaining??Infinity);
  if(remaining<=0)throw unavailable();return {wall:lastWall,remaining,notAfter:Math.min(m.expiresAt,request?.notAfter??m.expiresAt)};
 }
 function failure(status){const v=renderPreparationConsentView({locale,styleNonce:nonce()});return new Response(v.html,{status,headers:v.headers});}
 return async function(request,ctx){
  if(typeof ctx?.waitUntil!=='function')return failure(503);
  let control,closed=false;const pending=[];
  const current=()=>{if(closed)throw unavailable();return guard(control);};
  const primary=()=>{current();return session.call(db,'first-primary');};
  const wait=fn=>control.wait(()=>{
   current();const work=Promise.resolve().then(()=>{current();return fn();}).then(value=>{current();return value;});
   pending.push(work.then(()=>{},()=>{}));return work;
  });
  const query=(sql,args=[],method='first')=>wait(()=>primary().prepare(sql).bind(...args)[method]());
  async function identity(expected){
   const v=await wait(()=>verify({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:pins.ACCESS_TEAM_DOMAIN,audience:pins.ACCESS_AUD}));
   const result=v?.ok===true?readRecord(v,['ok','identity']):null,id=readRecord(result?.identity,['userId','email']);
   if(!id||!ref(id.userId)||!text(id.email,254)||(expected!==undefined&&id.userId!==expected))throw new Rejected(401);
   return id.userId;
  }
  async function form(){
   if(request.headers.get('Origin')!==cfg.issuer)throw new Rejected(403);
   if(!/^application\/x-www-form-urlencoded(?:;\s*charset=utf-8)?$/i.test(request.headers.get('Content-Type')??'')||request.headers.has('Content-Encoding'))throw new Rejected(415);
   const declared=request.headers.get('Content-Length');
   if(declared!==null&&(!/^(0|[1-9][0-9]{0,5})$/.test(declared)||Number(declared)>4096))throw new Rejected(Number(declared)>4096?413:400);
   let reader,done=false,size=0,turns=0;const chunks=[];
   try{
    reader=request.body?.getReader();if(reader)for(;;){
     const item=await wait(()=>reader.read());if(item.done){done=true;break;}
     if(!(item.value instanceof Uint8Array)||++turns>4097)throw new Rejected(400);
     size+=item.value.byteLength;if(size>4096)throw new Rejected(413);chunks.push(new Uint8Array(item.value));
    }
    if(declared!==null&&Number(declared)!==size)throw new Rejected(400);
    const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}
    let f;try{f=new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw new Rejected(400);}
    if([...f.keys()].some(k=>!['handle','grant'].includes(k))||f.getAll('handle').length!==1||f.getAll('grant').length!==1||!opaque(f.get('handle'))||!ref(f.get('grant')))throw new Rejected(400);
    const raw=request.headers.get('Cookie')??'';
    if(raw.length>4096)throw new Rejected(403);
    const cookies=raw.split(';').map(s=>s.trim()).filter(s=>s.startsWith(COOKIE+'=')).map(s=>s.slice(COOKIE.length+1));
    if(cookies.length!==1||cookies[0]!==f.get('handle'))throw new Rejected(403);return f;
   }finally{
    if(reader&&!done)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* bounded source */}try{reader?.releaseLock();}catch{/* pending reader */}
   }
  }
  try{
   guard();control=readCapsulePreparationRequestLease(createCapsulePreparationRequestLease({now,monotonic:mono,signal:request.signal}));current();
   const url=new URL(request.url);
   if(url.origin!==cfg.issuer||!['/connections','/connections/revoke'].includes(url.pathname))throw new Rejected(404);
   if(url.search||url.hash||new TextEncoder().encode(url.href).byteLength>8192)throw new Rejected(400);
   if(!((url.pathname==='/connections'&&request.method==='GET')||(url.pathname==='/connections/revoke'&&request.method==='POST')))throw new Rejected(405);
   const f=request.method==='POST'?await form():null,subject=await identity();
   const kind='preparation-revoke:'+await wait(()=>hash(JSON.stringify([...PROFILE.map(k=>p[k]),m.startedAt,m.expiresAt])));
   const key=await wait(()=>hash(JSON.stringify([subject,kind]))),limited=await wait(()=>limit.call(limiter,{key:'afw-preparation-connections:'+key}));
   if(limited?.success!==true)throw new Rejected(limited?.success===false?429:503);
   const args=[subject,p.clientId,p.projectId,p.resource,p.profileId,p.trialStartedAt,p.trialExpiresAt];
   function entry(row){
    const r=readRecord(row,['id','scopes_json','created_at','expires_at','revoked_at']);
    let scopes;try{scopes=readList(JSON.parse(r?.scopes_json),2);}catch{throw unavailable();}
    const end=instant(r?.expires_at),begin=instant(r?.created_at),retired=r?.revoked_at?instant(r.revoked_at):null,time=current().wall;
    if(!r||!ref(r.id)||!scopes||!scopes.includes(READ)||new Set(scopes).size!==scopes.length||scopes.some(s=>s!==READ&&s!==DRAFTS)
     ||begin===null||end===null||begin<p.trialStartedAt||begin>time||end<=begin||end>p.trialExpiresAt
     ||(r.revoked_at&&(retired===null||retired>time)))throw unavailable();
    return {grantId:r.id,scopes,status:r.revoked_at?'revoked':end<=time?'expired':'active',expiresAt:end};
   }
   const target=async id=>{const row=await query(SELECT+' AND g.id=? LIMIT 1',[...args,id]);if(!row)throw new Rejected(403);return entry(row);};
   const persistence=()=>createDelegatedOAuthStore(primary());
   if(request.method==='GET'){
    const result=await query(SELECT+' ORDER BY g.created_at DESC,g.id DESC LIMIT 21',args,'all');
    if(result?.success!==true||!Array.isArray(result.results)||result.results.length>20)throw unavailable();
    const entries=result.results.map(entry);let handle='',cookie='';
    if(entries.some(e=>e.status!=='revoked')){
     handle=nonce();const digest=await wait(()=>hash(handle)),expiry=new Date(m.expiresAt).toISOString();
     await wait(()=>persistence().createConsent({handleHash:digest,subject,kind,projectId:p.projectId,clientId:p.clientId,resource:p.resource,scopes:[],expiresAt:expiry}));
     const receipt=await wait(()=>persistence().getConsent(digest,subject,kind,new Date(current().wall).toISOString()));
     if(receipt?.subject!==subject||receipt.kind!==kind||receipt.projectId!==p.projectId||receipt.clientId!==p.clientId||receipt.resource!==p.resource||receipt.expiresAt!==expiry)throw unavailable();
     cookie=COOKIE+'='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+Math.max(1,Math.floor((m.expiresAt-current().wall)/1000));
    }
    await identity(subject);
    const v=renderPreparationConnectionsView({code:'view_ready',locale,clientName:cfg.clientName,entries,handle,styleNonce:nonce(),managementExpiresAt:m.expiresAt});
    if(v?.code!=='view_ready'||new TextEncoder().encode(v.html).byteLength>32768)throw unavailable();
    const headers=new Headers(v.headers);if(cookie)headers.set('Set-Cookie',cookie);
    const response=new Response(v.html,{status:200,headers});current();return response;
   }
   const digest=await wait(()=>hash(f.get('handle'))),time=new Date(current().wall).toISOString();
   const csrf=await query("SELECT project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=? AND user_id=? AND kind=? AND expires_at>? LIMIT 1",[digest,subject,kind,time]);
   if(!csrf||csrf.project_id!==p.projectId||csrf.client_id!==p.clientId||csrf.resource!==p.resource||csrf.scopes_json!=='[]'||instant(csrf.expires_at)===null||instant(csrf.expires_at)>m.expiresAt)throw new Rejected(403);
   let live=await target(f.get('grant'));
   if(live.status!=='revoked'){
    if(csrf.consumed_at)throw new Rejected(403);
    const used=await wait(()=>persistence().consumeConsent(digest,subject,kind,new Date(current().wall).toISOString()));
    if(used?.subject!==subject||used.kind!==kind||used.projectId!==p.projectId||used.clientId!==p.clientId||used.resource!==p.resource||used.expiresAt!==csrf.expires_at)throw new Rejected(403);
    await identity(subject);live=await target(f.get('grant'));
    if(live.status!=='revoked'){
     const stamp=current(),receipt=await query("UPDATE delegated_access_grants AS g SET revoked_at=? WHERE g.id=? AND g.user_id=? AND g.client_id=? AND g.project_id=? AND g.resource=? AND g.revoked_at=''"+
      " AND EXISTS(SELECT 1 FROM delegated_preparation_consents d WHERE "+RELATION+" AND d.profile_id=? AND d.trial_started_at=? AND d.trial_expires_at=?) AND "+SQL_NOW+"<? RETURNING id,revoked_at",
      [new Date(stamp.wall).toISOString(),f.get('grant'),subject,p.clientId,p.projectId,p.resource,p.profileId,p.trialStartedAt,p.trialExpiresAt,stamp.notAfter]);
     if(receipt?.id!==f.get('grant')||instant(receipt.revoked_at)===null)throw unavailable();
    }
   }
   await identity(subject);if((await target(f.get('grant'))).status!=='revoked')throw unavailable();
   const response=new Response(null,{status:303,headers:{Location:cfg.issuer+'/connections','Cache-Control':'no-store'}});current();return response;
  }catch(error){return failure(error instanceof Rejected?error.status:503);}
  finally{closed=true;control?.close();try{ctx.waitUntil(finite(Promise.allSettled(pending)));}catch{/* no cancellation/receipt claim */}}
 };
}
