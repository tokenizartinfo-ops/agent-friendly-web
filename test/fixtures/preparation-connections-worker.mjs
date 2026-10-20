// CI ONLY: real signed Access / SDK / D1 / KV forwarding; no production import.
import original from './preparation-token-host-worker.mjs';
import {preparationCodeCiContext} from './preparation-code-worker.mjs';
import {createDelegatedPreparationConnectionsHttpHost} from '../../lib/delegated-preparation-connections-http.mjs';
import {verifyCloudflareAccessJwt} from '../../lib/cloudflare-access-identity.mjs';
import {importJWK} from 'jose';
let host,options,p,management,mode='',target='',pub;
const held=new Set(),background=new Set(),stats={nonceCreates:0,nonceConsumes:0,revocations:0,identities:0};
let tripped=false;
const hold=()=>new Promise(resolve=>held.add(resolve));
function database(raw){
 const wrap=db=>({prepare(sql){
  const bind=stmt=>({bind(...args){return bind(stmt.bind(...args));},all:()=>stmt.all(),async first(...args){
   if(mode==='held-revoke'&&!tripped&&sql.startsWith('UPDATE delegated_access_grants AS g SET revoked_at')){tripped=true;await hold();}
   const value=await stmt.first(...args);
   if(sql.startsWith('UPDATE delegated_consent_sessions SET consumed_at')&&value){
    stats.nonceConsumes++;
    if(mode==='unknown-consume'&&!tripped){tripped=true;throw Error('CI nonce ACK lost after actual commit');}
    if(mode==='target-drift'&&target)await raw.prepare("UPDATE delegated_access_grants SET client_id='foreign-client' WHERE id=?").bind(target).run();
   }
   if(sql.startsWith('UPDATE delegated_access_grants AS g SET revoked_at')&&value){
    stats.revocations++;if(mode==='unknown-revoke'&&!tripped){tripped=true;throw Error('CI revoke ACK lost after actual commit');}
   }return value;
  },async run(){
   const value=await stmt.run();
   if(sql.includes('INSERT INTO delegated_consent_sessions')){
    stats.nonceCreates++;if(mode==='unknown-create'&&!tripped){tripped=true;throw Error('CI nonce creation ACK lost');}
   }return value;
  }});
  return bind(db.prepare(sql));
 }});
 return {prepare:sql=>raw.prepare(sql),withSession:choice=>wrap(raw.withSession(choice))};
}
async function ready(env){
 if(host)return;
 const c=await preparationCodeCiContext(env),stamp=Date.now();p=c.profile;
 if(env.CI_CONNECTION_HISTORY==='true')p={...p,trialStartedAt:stamp-200000,trialExpiresAt:stamp-10000};
 management={startedAt:stamp,expiresAt:stamp+180000};
 pub=await importJWK(JSON.parse(env.CI_PUBLIC_JWK),'RS256');
 const pins={...env,DB:database(env.DB),AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED:'true',
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-preparation-audience',
  DELEGATED_RATE_LIMITER:{async limit(){if(mode==='config-drift')options.enabled=false;return {success:mode!=='limited'};}}};
 options={enabled:true,issuer:'https://example.invalid',env:pins,profile:p,management,clientName:'CI <assistant>',locale:'es',
  accessVerifier:async args=>{stats.identities++;if(mode==='held-identity')await hold();return verifyCloudflareAccessJwt({...args,keySet:pub});}};
 host=createDelegatedPreparationConnectionsHttpHost(options);
}
export default{async fetch(request,env,ctx){
 await ready(env);const path=new URL(request.url).pathname;
 if(path==='/__ci/connections-context')return Response.json({profile:p,management});
 if(path==='/__ci/connections-mode'&&request.method==='POST'){const value=await request.json();mode=value.mode;target=value.target??'';tripped=false;return Response.json({saved:true});}
 if(path==='/__ci/connections-stats'){if(!held.size)await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/connections-release'&&request.method==='POST'){for(const resolve of held)resolve();held.clear();await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/connections-old-flags'&&request.method==='POST'){options.env.AFW_DELEGATED_OAUTH_ENABLED='false';options.env.AFW_DELEGATED_PREPARATION_ENABLED='false';return Response.json({closed:true});}
 if(path==='/__ci/connections-restore'&&request.method==='POST'){options.enabled=true;return Response.json({restored:true});}
 if(path==='/__ci/connections-default'){
  let touched=0;const off={enabled:false};Object.defineProperty(off,'env',{enumerable:true,get(){touched++;throw Error('must not read');}});
  return Response.json({closed:createDelegatedPreparationConnectionsHttpHost()===null,disabled:createDelegatedPreparationConnectionsHttpHost(off)===null,touched});
 }
 if(path==='/connections'||path==='/connections/revoke'){
  const headers=new Headers(request.headers);headers.set('host',new URL(request.url).host);
  const tracked={waitUntil(work){const task=Promise.resolve(work);background.add(task);task.then(()=>background.delete(task),()=>background.delete(task));ctx.waitUntil(task);}};
  return host(new Request(request,{headers}),tracked);
 }
 return original.fetch(request,env,ctx);
}};
