// CI-ONLY: real ephemeral-key Access verification and real SDK fault forwarding.
// No production entrypoint imports this wrapper; every control is synthetic.
import legacy,{preparationCodeCiContext} from './preparation-code-worker.mjs';
import {createDelegatedPreparationConsentHttpHost} from '../../lib/delegated-preparation-consent-http.mjs';
import {verifyCloudflareAccessJwt} from '../../lib/cloudflare-access-identity.mjs';
import {importJWK} from 'jose';
let host,options,pub,mode='',accessHeld=false;
const release=new Set(),background=new Set();
const stats={accessStarted:0,accessCompleted:0,sdkBegins:0,sdkCompletions:0,revocations:0};
const once={reserve:false,admit:false,complete:false};
function database(raw){
 const wrapSession=db=>{
  const wrap=(stmt,sql)=>({bind(...args){return wrap(stmt.bind(...args),sql);},first:(...args)=>stmt.first(...args),all:()=>stmt.all(),
   async run(){
    const value=await stmt.run();
    if(sql.includes('UPDATE delegated_access_grants SET revoked_at'))stats.revocations++;
    for(const kind of ['reserve','admit']){
     if(mode===kind&&!once[kind]&&sql.includes(kind==='reserve'?"SET state='reserved'":"SET state='admitted'")){
      once[kind]=true;throw Error('CI consent ACK lost after actual D1 commit');
     }
    }return value;
   }});
  return {prepare:sql=>wrap(db.prepare(sql),sql)};
 };
 return {prepare:sql=>raw.prepare(sql),withSession:mode=>wrapSession(raw.withSession(mode))};
}
async function ready(env){
 if(host)return;
 const original=await preparationCodeCiContext(env),as=original.authorizationServer;
 pub=await importJWK(JSON.parse(env.CI_PUBLIC_JWK),'RS256');
 const getApi=environment=>{
  const api=as.getOAuthApi(environment),wrapped={};
  for(const name of ['parseAuthRequest','describeConsent','approveConsent','denyConsent'])
   wrapped[name]=(...args)=>api[name](...args);
  wrapped.beginConsent=async(...args)=>{stats.sdkBegins++;return api.beginConsent(...args);};
  wrapped.completeAuthorization=async(...args)=>{
   const value=await api.completeAuthorization(...args);stats.sdkCompletions++;
   if(mode==='complete'&&!once.complete){once.complete=true;throw Error('CI completion ACK lost after actual SDK completion');}
   return value;
  };
  return wrapped;
 };
 // Instance stays the ACTUAL SDK server. This proxy only forwards the six API
 // methods; two wrappers observe real calls and can lose their real ACK.
 const sdk=new Proxy(as,{get(target,key,receiver){return key==='getOAuthApi'?getApi:Reflect.get(target,key,receiver);}});
 const p=original.profile;
 const pins={...env,DB:database(env.DB),AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',
  AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(p.trialExpiresAt).toISOString(),
  AFW_OAUTH_PILOT_PROJECT_ID:p.projectId,AFW_OAUTH_PILOT_CLIENT_ID:p.clientId,
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-preparation-audience',
  DELEGATED_RATE_LIMITER:{async limit(){return {success:mode!=='limited'};}}};
 options={enabled:true,issuer:'https://example.invalid',env:pins,profile:p,authorizationServer:sdk,
  accessVerifier:async args=>{
   stats.accessStarted++;
   if(accessHeld)await new Promise(resolve=>release.add(resolve));
   const value=await verifyCloudflareAccessJwt({...args,keySet:pub});stats.accessCompleted++;
   if(mode==='config-drift')options.enabled=false;
   return value;
  }};
 host=createDelegatedPreparationConsentHttpHost(options);
}
export default{async fetch(request,env,ctx){
 await ready(env);
 const path=new URL(request.url).pathname;
 if(path==='/__ci/http-mode'&&request.method==='POST'){mode=(await request.json()).mode;for(const k of Object.keys(once))once[k]=false;return Response.json({saved:true});}
 if(path==='/__ci/access-hold'&&request.method==='POST'){accessHeld=true;return Response.json({held:true});}
 if(path==='/__ci/release-access'&&request.method==='POST'){
  accessHeld=false;for(const resolve of release)resolve();release.clear();await Promise.allSettled([...background]);return Response.json(stats);
 }
 if(path==='/__ci/http-stats'){if(!accessHeld)await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/http-restore'&&request.method==='POST'){options.enabled=true;return Response.json({restored:true});}
 if(path==='/authorize'){
  // Miniflare proxy Host normalization is CI-only, as in the original fixture.
  const headers=new Headers(request.headers);headers.set('host',new URL(request.url).host);
  const tracked={waitUntil(work){const p=Promise.resolve(work);background.add(p);p.then(()=>background.delete(p),()=>background.delete(p));ctx.waitUntil(p);}};
  return host(new Request(request,{headers}),tracked);
 }
 return legacy.fetch(request,env,ctx);
}};
