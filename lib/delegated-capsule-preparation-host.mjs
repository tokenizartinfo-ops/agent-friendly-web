import {createHash} from 'node:crypto';
import {readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createAgentCapsulePreparation,readAgentCapsulePreparationInput} from './agent-capsule-preparation.mjs';
import {checkAgentCapsulePreparationSchema} from './agent-capsule-preparation-schema.mjs';
import {readRecord,readList,oauthClientRef} from './agent-consumption-input.mjs';

const pins=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_OAUTH_SERVICE_MODE',
 'AFW_OAUTH_PILOT_EXPIRES_AT','AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID',
 'ACCESS_TEAM_DOMAIN','ACCESS_AUD','DB','OAUTH_KV','DELEGATED_RATE_LIMITER'];
const identifier=v=>typeof v==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(v);
const validTime=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const closed=code=>({contract:'agentfriendly.capsule-prepare.v1',code,executionAllowed:false,chargeAllowed:false,publicationAllowed:false});
class Unavailable extends Error {}
class Denied extends Error {}
function readAuthorization(value){
 const a=readRecord(value,['context','projectId','tokenExpiresAt']);
 const c=readRecord(a?.context,['grantId','subject','clientId','resource','scopes']);
 const scopes=readList(c?.scopes,10);
 if(!a||!c||!identifier(a.projectId)||!['grantId','subject'].every(k=>identifier(c[k]))||!oauthClientRef(c.clientId)
  ||typeof c.resource!=='string'||!validTime(a.tokenExpiresAt)||!scopes
  ||scopes.some(x=>typeof x!=='string'||x.length>80))return null;
 return {projectId:a.projectId,tokenExpiresAt:a.tokenExpiresAt,
  context:{grantId:c.grantId,subject:c.subject,clientId:c.clientId,resource:c.resource,scopes}};
}
const fingerprint=a=>JSON.stringify([a.projectId,a.tokenExpiresAt,a.context.grantId,a.context.subject,
 a.context.clientId,a.context.resource,a.context.scopes]);

/** Source-only finite host, NOT an OAuth/token verifier or a transport.
 * resolveAuthorization must return server-verified request context AND verified
 * token expiry. Never derive it from tool input, arbitrary headers or a decoded JWT.
 * No caller imports or mounts this host in the OAuth Worker in this increment.
 */
export function createDelegatedCapsulePreparationHost({env,resource,resolveAuthorization,requestLease,
 now=()=>Date.now(),monotonic=()=>performance.now()}={}){
 if(env?.AFW_DELEGATED_PREPARATION_ENABLED!=='true')return null;
 const external=requestLease===undefined?null:readCapsulePreparationRequestLease(requestLease);
 if(requestLease!==undefined&&!external)throw new Error('Preparation host unavailable');
 const original=Object.fromEntries(pins.map(name=>[name,env[name]]));
 const db=original.DB,limiter=original.DELEGATED_RATE_LIMITER;
 const start=now(),initialMono=monotonic(),until=Date.parse(original.AFW_OAUTH_PILOT_EXPIRES_AT);
 let validResource=false;
 try{const u=new URL(resource);validResource=u.protocol==='https:'&&!u.username&&!u.password&&!u.search&&!u.hash&&u.href===resource&&resource.length<=512;}catch{/* Closed below. */}
 if(original.AFW_DELEGATED_OAUTH_ENABLED!=='true'||original.AFW_OAUTH_SERVICE_MODE!=='window'
  ||!validTime(start)||!Number.isFinite(initialMono)||initialMono<0||!validTime(until)||until<=start||until-start>600000
  ||new Date(until).toISOString()!==original.AFW_OAUTH_PILOT_EXPIRES_AT
  ||!identifier(original.AFW_OAUTH_PILOT_PROJECT_ID)||!oauthClientRef(original.AFW_OAUTH_PILOT_CLIENT_ID)
  ||!original.ACCESS_TEAM_DOMAIN||!original.ACCESS_AUD||!original.OAUTH_KV||!validResource
  ||typeof resolveAuthorization!=='function'||typeof db?.prepare!=='function'||typeof db?.withSession!=='function'
  ||typeof limiter?.limit!=='function')throw new Error('Preparation host unavailable');
 const prepare=db.prepare,withSession=db.withSession,limit=limiter.limit;
 let lastWall=start,lastMono=initialMono,invalidated=false;
 function clock(){
  if(invalidated)throw new Unavailable();
  try{
   const wall=now(),tick=monotonic();
   const outer=external?.check();
   const windowRemaining=Math.min(until-wall,until-start-(tick-initialMono),outer?.remaining??Infinity);
   if(!validTime(wall)||!Number.isFinite(tick)||wall<lastWall||tick<lastMono||windowRemaining<=0
    ||!pins.every(name=>env[name]===original[name])||db.prepare!==prepare||db.withSession!==withSession
    ||limiter.limit!==limit)throw new Unavailable();
   lastWall=wall;lastMono=tick;return {wall,tick,windowRemaining};
  }catch{
   invalidated=true;throw new Unavailable();
  }
 }
 function budget(){
  const initial=clock();let deadline=Math.min(initial.wall+5000,until),raw,auth,signature;
  function check(){
   const time=clock();let tokenRemaining=Infinity;
   if(auth){
    const current=readAuthorization(raw);
    tokenRemaining=Math.min(auth.tokenExpiresAt-time.wall,auth.tokenExpiresAt-start-(time.tick-initialMono));
    if(!current||fingerprint(current)!==signature||tokenRemaining<=0)throw new Denied();
   }
   const remaining=Math.min(deadline-time.wall,5000-(time.tick-initial.tick),time.windowRemaining,tokenRemaining);
   if(remaining<=0)throw new Unavailable();
   return {...time,remaining};
  }
  return {check,get auth(){return auth;},
   admit(value){
    raw=value;auth=readAuthorization(value);
    if(!auth||auth.projectId!==original.AFW_OAUTH_PILOT_PROJECT_ID
     ||auth.context.clientId!==original.AFW_OAUTH_PILOT_CLIENT_ID||auth.context.resource!==resource)throw new Denied();
    signature=fingerprint(auth);deadline=Math.min(deadline,auth.tokenExpiresAt);check();
   },
   async wait(promise){
    const time=check();let timer;
    try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Unavailable()),time.remaining);})]);}
    finally{clearTimeout(timer);}
   },
  };
 }
 async function run(value,method){
  // A later flag/window change never revives this captured host.
  let invoked=false;
  try{
   const b=budget();
   const input=readAgentCapsulePreparationInput(value);if(!input)return closed('invalid_request');
   const authorization=await b.wait(resolveAuthorization());b.admit(authorization);
   if(!b.auth.context.scopes.includes('afw:capsule:prepare'))return closed('insufficient_scope');
   const key='afw-capsule:'+createHash('sha256').update(JSON.stringify([b.auth.context.subject,
    b.auth.context.clientId,b.auth.projectId,resource])).digest('hex');
   const limited=await b.wait(limit.call(limiter,{key}));b.check();
   if(limited?.success!==true)return closed(limited?.success===false?'rate_limited':'unavailable');
   const primary=()=>{b.check();return withSession.call(db,'first-primary');};
   const ready=await b.wait(checkAgentCapsulePreparationSchema({createPrimarySession:primary,assertCurrent:()=>b.check()}));b.check();
   if(ready.ready!==true)return closed('unavailable');
   const time=b.check(),notAfter=Math.min(time.wall+Math.floor(time.remaining),until,b.auth.tokenExpiresAt);
   const a=b.auth.context;
   const service=createAgentCapsulePreparation({enabled:true,notAfter,createPrimarySession:primary,
    now:()=>b.check().wall,monotonic:()=>b.check().tick,
    resolveAuthority:async()=>{b.check();return {subject:a.subject,grantId:a.grantId,clientId:a.clientId,resource,projectId:b.auth.projectId};}});
   b.check();invoked=true;const result=await b.wait(service[method](input));b.check();return result;
  }catch(error){
   if(invoked&&method==='prepare')return closed('unknown_ack');
   return closed(error instanceof Denied?'delegated_access_denied':'unavailable');
  }
 }
 return Object.freeze({prepare:value=>run(value,'prepare'),reconcile:value=>run(value,'reconcile')});
}
