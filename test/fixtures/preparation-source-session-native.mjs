import {createPreparationSourceSessionHttpHost} from '../../lib/preparation-source-session-http.mjs';
import {verifyCloudflareAccessJwtWithExpiry} from '../../lib/cloudflare-access-identity.mjs';
import {importJWK} from 'jose';
const issuer='https://preparation-canary.agentfriendlyweb.dev';
let env,profile,host,keySet,offset=0,counts,mode='';
let original;
function make(){
 const base={AFW_PREPARATION_SOURCE_INTAKE_ENABLED:'true',ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-source-aud',
  DELEGATED_RATE_LIMITER:{async limit(){counts.limiter++;if(mode==='limit-throw')throw Error('private dependency detail');
   if(mode==='expire-identity-at-limit')offset+=4000;return {success:mode!=='limit-deny'};}}};
 env=new Proxy(base,{get(target,k){if(k==='DB'||k==='OAUTH_KV')throw Error('forbidden storage dependency');return target[k];}});
 profile={...original};host=createPreparationSourceSessionHttpHost({enabled:true,issuer,env,profile,now:()=>Date.now()+offset,
  accessVerifier:async options=>{
   counts.identity++;if(mode==='identity-throw')throw Error('do not reflect private error');
   const verified=await verifyCloudflareAccessJwtWithExpiry({...options,keySet});
   if(mode==='drift-identity')env.ACCESS_AUD='changed-after-verified';
   if(mode==='slow-identity')await new Promise(resolve=>setTimeout(resolve,5100));
   return verified;
  }});
}
function reset(){
 offset=0;mode='';counts={identity:0,limiter:0,body:0};original={profileId:'afw.preparation-source-session.v1',
  operationKey:'source-session-ci-original-01',subject:null,startedAt:Date.now()-1000,expiresAt:Date.now()+180000};make();
}
const fixture={async fetch(request,runtimeEnv){
 keySet??=await importJWK(JSON.parse(runtimeEnv.CI_PUBLIC_JWK),'RS256');if(!host)reset();
 const path=new URL(request.url).pathname;
 if(path==='/__ci/stats')return Response.json(counts);
 if(path==='/__ci/reset'){reset();return new Response(null,{status:204});}
 if(path==='/__ci/default'){
  let dependencyReads=0,bodyReads=0,clockReads=0;
  const disabled=createPreparationSourceSessionHttpHost({enabled:false,issuer,env:new Proxy({},{get(){dependencyReads++;throw Error();}}),
   get profile(){dependencyReads++;throw Error();},now:()=>{clockReads++;throw Error();}});
  const closed=disabled?await disabled(new Proxy(request,{get(target,k){if(k==='body'){bodyReads++;throw Error();}return target[k];}})):new Response(null,{status:404});
  return Response.json({status:closed.status,dependencyReads,bodyReads,clockReads});
 }
 if(path.startsWith('/__ci/')&&path!=='/__ci/request-fragment'){
  const action=path.slice('/__ci/'.length);
  if(action==='pin'){original.subject='owner-a';make();}
  else if(action==='expire')offset=181000;
  else if(action==='recreate')make();
  else if(action==='restore'){mode='';env.ACCESS_AUD='ci-source-aud';}
  else mode=action;
  return new Response(null,{status:204});
 }
 const protectedRequest=new Proxy(request,{get(target,k){if(k==='url'&&path==='/__ci/request-fragment')return issuer+'/source#owner';if(k==='body'){counts.body++;throw Error('body must not be read');}const value=Reflect.get(target,k,target);return typeof value==='function'?value.bind(target):value;}});
 return host(protectedRequest);
}};
export default fixture;
