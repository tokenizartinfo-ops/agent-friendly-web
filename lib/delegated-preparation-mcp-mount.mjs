import {OAuthResourceServer} from '@cloudflare/workers-oauth-provider';
import {isLegacyRequest,WebStandardStreamableHTTPServerTransport} from '@modelcontextprotocol/server';
import {createMcpHandler} from 'agents/mcp/server';
import {readRecord,ref,oauthClientRef} from './agent-consumption-input.mjs';
import {readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {createCapsulePreparationHttpBoundary} from './delegated-capsule-preparation-http.mjs';
import {readCapsulePreparationOAuthAuthorization,createDelegatedCapsulePreparationOAuthHost} from './delegated-capsule-preparation-oauth.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
import {createDelegatedProjectMcpServer} from './delegated-project-mcp.mjs';
import {registerDelegatedCapsulePreparation} from './delegated-capsule-preparation-mcp.mjs';

const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const KEYS=['enabled','issuer','env','validateAccessToken','now','monotonic'];
const PINS=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_OAUTH_SERVICE_MODE',
 'AFW_OAUTH_PILOT_EXPIRES_AT','AFW_OAUTH_PILOT_PROJECT_ID','AFW_OAUTH_PILOT_CLIENT_ID',
 'ACCESS_TEAM_DOMAIN','ACCESS_AUD','DB','OAUTH_KV','DELEGATED_RATE_LIMITER'];
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const unavailable=()=>Error('Preparation mount unavailable');
const denied=()=>Response.json({code:'request_unavailable',executionAllowed:false,chargeAllowed:false,publicationAllowed:false},
 {status:503,headers:{'Cache-Control':'no-store'}});
function boundedCleanup(work){
 let timer;return Promise.race([work,new Promise(resolve=>{timer=setTimeout(resolve,2000);})]).finally(()=>clearTimeout(timer));
}

/** Detached mount only. Validator is trusted server configuration inside a
 * future authenticated host; never supplied by a browser/MCP argument.
 * No current production entrypoint imports this module.
 */
export function createDelegatedPreparationMcpMount(options){
 const cfg=readRecord(options,KEYS);
 if(!cfg||cfg.enabled!==true)return null;
 const env=cfg.env,now=cfg.now===undefined?()=>Date.now():cfg.now,monotonic=cfg.monotonic===undefined?()=>performance.now():cfg.monotonic;
 let url,pins,db,withSession,prepare,limiter,limit,started,tick,until;
 try{
  url=new URL(cfg.issuer);
  if(url.protocol!=='https:'||url.origin!==cfg.issuer||typeof now!=='function'||typeof monotonic!=='function'
   ||typeof cfg.validateAccessToken!=='function'||!env||typeof env!=='object')throw unavailable();
  pins=Object.fromEntries(PINS.map(k=>[k,env[k]]));db=pins.DB;limiter=pins.DELEGATED_RATE_LIMITER;
  withSession=db?.withSession;prepare=db?.prepare;limit=limiter?.limit;started=now();tick=monotonic();
  until=Date.parse(pins.AFW_OAUTH_PILOT_EXPIRES_AT);
  if(pins.AFW_DELEGATED_OAUTH_ENABLED!=='true'||pins.AFW_DELEGATED_PREPARATION_ENABLED!=='true'||pins.AFW_OAUTH_SERVICE_MODE!=='window'
   ||!time(started)||!Number.isFinite(tick)||tick<0||!time(until)||until<=started||until-started>600000
   ||new Date(until).toISOString()!==pins.AFW_OAUTH_PILOT_EXPIRES_AT
   ||!ref(pins.AFW_OAUTH_PILOT_PROJECT_ID)||!oauthClientRef(pins.AFW_OAUTH_PILOT_CLIENT_ID)
   ||!pins.ACCESS_TEAM_DOMAIN||!pins.ACCESS_AUD||!pins.OAUTH_KV||typeof prepare!=='function'||typeof withSession!=='function'||typeof limit!=='function')
   throw unavailable();
 }catch{throw unavailable();}
 const resource=cfg.issuer+'/mcp';let invalidated=false,lastWall=started,lastTick=tick;
 function guard(control){
  if(invalidated)throw unavailable();
  try{
   const current=readRecord(options,KEYS),wall=now(),mono=monotonic();
   if(!current||!KEYS.every(k=>current[k]===cfg[k])||!PINS.every(k=>env[k]===pins[k])
    ||db.prepare!==prepare||db.withSession!==withSession||limiter.limit!==limit
    ||!time(wall)||!Number.isFinite(mono)||wall<lastWall||mono<lastTick||wall>=until||mono-tick>=until-started)
    throw unavailable();
   lastWall=wall;lastTick=mono;
  }catch{invalidated=true;throw unavailable();}
  control?.check();return {wall:lastWall,mono:lastTick};
 }
 return async function(request,ctx,originalLease){
  if(typeof ctx?.waitUntil!=='function')return denied();
  let finalized=false;const owned=new Set(),closing=new Map(),pending=[];
  function closeOwned(){
   return Promise.allSettled([...owned].map(server=>{
    if(closing.has(server))return closing.get(server);
    const work=Promise.resolve().then(()=>server.close()).finally(()=>closing.delete(server));
    closing.set(server,work);return work;
   }));
  }
  try{
   guard();
   const boundary=createCapsulePreparationHttpBoundary({enabled:true,issuer:cfg.issuer,now,monotonic,checkCurrent:()=>guard(),
    handle:(bounded,_environment,_ctx,requestLease)=>{
     const control=readCapsulePreparationRequestLease(requestLease);
     const current=()=>{if(finalized)throw unavailable();return guard(control);};
     current();
     const oauth=new OAuthResourceServer({resourceMetadata:{resource,authorization_servers:[cfg.issuer]},requiredScopes:[READ],
      validateToken:(environment,authorizedRequest)=>{
       current();const validator=cfg.validateAccessToken(environment,authorizedRequest);
       if(typeof validator!=='function')throw unavailable();
       return async(audience,token)=>{current();const verified=await validator(audience,token);current();return verified;};
      },
      handler:{async fetch(authorized,environment,authCtx){
       try{
        current();const verifiedContext=Object.freeze({auth:authCtx.auth,props:authCtx.props});
        const authorization=readCapsulePreparationOAuthAuthorization(verifiedContext);
        if(!authorization||authorization.projectId!==pins.AFW_OAUTH_PILOT_PROJECT_ID
         ||authorization.context.clientId!==pins.AFW_OAUTH_PILOT_CLIENT_ID||authorization.context.resource!==resource
         ||authorization.tokenExpiresAt<=current().wall||!authorization.context.scopes.includes(READ)
         ||authorization.context.scopes.length>2||new Set(authorization.context.scopes).size!==authorization.context.scopes.length
         ||authorization.context.scopes.some(s=>s!==READ&&s!==DRAFTS))return denied();
        Object.freeze(authorization.context.scopes);Object.freeze(authorization.context);Object.freeze(authorization);
        const signature=JSON.stringify(authorization);
        const authenticated=()=>{
         const clock=current(),fresh=readCapsulePreparationOAuthAuthorization(verifiedContext);
         if(!fresh||JSON.stringify(fresh)!==signature||authorization.tokenExpiresAt<=clock.wall)throw unavailable();
         return clock;
        };
        const primary=()=>{authenticated();return withSession.call(db,'first-primary');};
        const repository=createDelegatedProjectRepository({db:primary(),grantStore:createDelegatedOAuthStore(primary()),createPrimarySession:primary});
        const server=createDelegatedProjectMcpServer({repository,resource,now:()=>new Date(authenticated().wall).toISOString(),
         resolveAuthorization:async()=>{authenticated();return {context:authorization.context,projectId:authorization.projectId};}});
        owned.add(server);
        if(authorization.context.scopes.includes(DRAFTS)){
         const host=createDelegatedCapsulePreparationOAuthHost({env:environment,resource,requestLease,now,monotonic,
          getVerifiedContext:()=>{authenticated();return verifiedContext;}});
         registerDelegatedCapsulePreparation(server,{enabled:true,host});
        }
        authenticated();
        const legacy=await isLegacyRequest(authorized,undefined,{maxRequestBodySize:4096});authenticated();
        if(legacy){
         const transport=new WebStandardStreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true});
         await server.connect(transport);authenticated();
         const response=await transport.handleRequest(authorized);authenticated();return response;
        }
        const handler=createMcpHandler(()=>{authenticated();return server;},{route:'/mcp',corsOptions:false,
         allowedHostnames:[url.hostname],legacy:'reject',responseMode:'json'});
        const response=await handler(authorized,environment,authCtx);authenticated();return response;
       }catch{return denied();}
      }}});
     const work=Promise.resolve().then(()=>{current();return oauth.fetch(bounded,env,ctx);});
     pending.push(work.then(()=>finalized?closeOwned():undefined,()=>finalized?closeOwned():undefined));
     return work;
    }});
   return await boundary(request,env,ctx,originalLease);
  }catch{return denied();}
  finally{
   finalized=true;
   // Close now, then again if an already-started connect completes late.
   // This finite privilege-reducing grace never reopens the response lease.
   const immediate=closeOwned();
   const drain=Promise.allSettled([immediate,...pending]).then(()=>closeOwned());
   try{ctx.waitUntil(boundedCleanup(drain));}catch{/* No remote closure claim. */}
  }
 };
}
