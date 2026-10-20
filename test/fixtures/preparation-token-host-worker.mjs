// CI ONLY: forwards real signed-consent SDK/D1/KV operations; faults never fake success.
import signed from './preparation-consent-http-worker.mjs';
import {preparationCodeCiContext} from './preparation-code-worker.mjs';
import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {createDelegatedPreparationAuthorizationHost} from '../../lib/delegated-preparation-token-host.mjs';
let host,options,mode='',lastToken;
const held=new Set(),background=new Set();
const stats={sdkTokenCalls:0,sdkTokensIssued:0,consumed:0,revocations:0};
const once={consume:false,lookup:false,put:false};
const sdkFetch=OAuthAuthorizationServer.prototype.fetch;
OAuthAuthorizationServer.prototype.fetch=async function(request,...args){
 const token=new URL(request.url).pathname==='/oauth/token';
 if(token)stats.sdkTokenCalls++;
 const response=await sdkFetch.call(this,request,...args);
 if(token&&response.ok){const data=await response.clone().json();lastToken=data.access_token;stats.sdkTokensIssued++;}
 return response;
};
const hold=()=>new Promise(resolve=>held.add(resolve));
function database(raw){
 const wrapSession=db=>({prepare(sql){
  const wrap=stmt=>({bind(...args){return wrap(stmt.bind(...args));},all:()=>stmt.all(),async first(...args){
   if(mode==='held-lookup'&&!once.lookup&&sql.startsWith('SELECT handle_hash,request_hash FROM delegated_preparation_consents')){once.lookup=true;await hold();}
   const value=await stmt.first(...args);
   if(sql.includes('UPDATE delegated_access_grants SET exchanged_at')&&value){
    stats.consumed++;
    if(mode==='post-consume-owner')await raw.prepare("UPDATE site_projects SET user_id='foreign-owner' WHERE id='project-a'").run();
    if(mode==='unknown-consume'&&!once.consume){once.consume=true;throw Error('CI actual exchange ACK lost');}
   }
   return value;
  },async run(){const result=await stmt.run();if(sql.includes('UPDATE delegated_access_grants SET revoked_at'))stats.revocations++;return result;}});
  return wrap(db.prepare(sql));
 }});
 return {prepare:sql=>raw.prepare(sql),withSession:choice=>wrapSession(raw.withSession(choice))};
}
async function ready(env){
 if(host)return;
 const original=await preparationCodeCiContext(env),p=original.profile,raw=env.OAUTH_KV;
 const put=async(key,...args)=>{
  const value=await raw.put(key,...args);
  if(mode==='held-token-put'&&!once.put&&key.startsWith('token:')){once.put=true;await hold();}
  return value;
 };
 const kv=new Proxy(raw,{get(target,key){if(key==='put')return put;const value=Reflect.get(target,key);return typeof value==='function'?value.bind(target):value;}});
 const pins={...env,DB:database(env.DB),OAUTH_KV:kv,AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',
  AFW_OAUTH_SERVICE_MODE:'window',AFW_OAUTH_PILOT_EXPIRES_AT:new Date(p.trialExpiresAt).toISOString(),
  AFW_OAUTH_PILOT_PROJECT_ID:p.projectId,AFW_OAUTH_PILOT_CLIENT_ID:p.clientId,
  DELEGATED_RATE_LIMITER:{async limit(){if(mode==='config-drift')options.enabled=false;return {success:true};}}};
 options={enabled:true,issuer:'https://example.invalid',env:pins,profile:p};host=createDelegatedPreparationAuthorizationHost(options);
}
const worker={async fetch(request,env,ctx){
 await ready(env);const path=new URL(request.url).pathname;
 if(path==='/__ci/token-mode'&&request.method==='POST'){mode=(await request.json()).mode;for(const key of Object.keys(once))once[key]=false;return Response.json({saved:true});}
 if(path==='/__ci/token-stats'){if(!held.size)await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/token-release'&&request.method==='POST'){
  for(const resolve of held)resolve();held.clear();await Promise.allSettled([...background]);return Response.json(stats);
 }
 if(path==='/__ci/token-restore'&&request.method==='POST'){options.enabled=true;return Response.json({restored:true});}
 if(path==='/__ci/orphan-token')return Response.json({access_token:lastToken}); // ephemeral CI bearer ONLY, never printed/persisted
 if(path==='/__ci/token-default'){
  let touched=0;const disabled={enabled:false};Object.defineProperty(disabled,'env',{get(){touched++;throw Error('must not execute');},enumerable:true});
  return Response.json({defaultClosed:createDelegatedPreparationAuthorizationHost()===null,
   disabledClosed:createDelegatedPreparationAuthorizationHost(disabled)===null,touched});
 }
 const headers=new Headers(request.headers);headers.set('host',new URL(request.url).host);
 if(path==='/__ci/token-bypass'){
  const url=new URL(request.url);url.pathname='/oauth/token';
  return host.authorizationServer.fetch(new Request(url,{method:'POST',headers,body:await request.text()}),options.env,ctx);
 }
 if(path==='/oauth/token'){
  const tracked={waitUntil(work){const p=Promise.resolve(work);background.add(p);p.then(()=>background.delete(p),()=>background.delete(p));ctx.waitUntil(p);}};
  return host.fetchToken(new Request(request,{headers}),tracked);
 }
 return signed.fetch(request,env,ctx);
}};
export default worker;
