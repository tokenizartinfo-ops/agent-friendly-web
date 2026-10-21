import {createPreparationSourceIntakeHttpHost} from '../../lib/preparation-source-intake-http.mjs';
import {verifyCloudflareAccessJwtWithExpiry} from '../../lib/cloudflare-access-identity.mjs';
import {importJWK} from 'jose';
const issuer='https://preparation-canary.agentfriendlyweb.dev';
let host,pins,profile,keySet,csrfKey,realDB,mode='',offset=0,seq=0,stats;
function reset(){
 mode='';offset=0;stats={dbReads:0,sessions:0,batches:0,batchReads:0,identities:0,limits:0,body:0};
 profile={profileId:'afw.preparation-source-intake.v1',operationKey:'native-intake-http-original-'+(++seq),subject:'owner-a',startedAt:Date.now()-1000,expiresAt:Date.now()+180000};
 const db={withSession(which){
  stats.sessions++;if(which!=='first-primary')throw Error('not-primary');const session=realDB.withSession(which);
  return new Proxy(session,{get(target,k){
   if(k==='batch'){stats.batchReads++;if(mode==='inspect-forbid-batch')throw Error('inspection attempted batch access');
    return async statements=>{stats.batches++;if(mode==='fail-batch-before')throw Error('private-runtime-detail');
     const result=await target.batch(statements);if(mode==='lose-ack')throw Error('private-runtime-detail');return result;};}
   const v=Reflect.get(target,k,target);return typeof v==='function'?v.bind(target):v;
  }});
 }};
 const base={AFW_PREPARATION_SOURCE_CREATE_ENABLED:'true',ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-intake-aud',
  DELEGATED_RATE_LIMITER:{async limit(){stats.limits++;if(mode==='expire-at-limit')offset+=4000;return {success:mode!=='limit-deny'};}}};
 pins=new Proxy(base,{get(target,k){if(k==='DB'){stats.dbReads++;return db;}if(k==='OAUTH_KV')throw Error('forbidden KV');return target[k];}});
 host=createPreparationSourceIntakeHttpHost({enabled:true,issuer,env:pins,profile,csrfKey,now:()=>Date.now()+offset,
  accessVerifier:async options=>{
   stats.identities++;const r=await verifyCloudflareAccessJwtWithExpiry({...options,keySet});
   if(mode==='drift-identity')pins.AFW_PREPARATION_SOURCE_CREATE_ENABLED='false';
   if(mode==='abort-identity')await new Promise(resolve=>setTimeout(resolve,300));
   return r;
  }});
}
const fixture={async fetch(request,env){
 if(!keySet){keySet=await importJWK(JSON.parse(env.CI_PUBLIC_JWK),'RS256');csrfKey=await crypto.subtle.generateKey({name:'HMAC',hash:'SHA-256',length:256},false,['sign','verify']);realDB=env.DB;}
 if(!host)reset();const path=new URL(request.url).pathname;
 if(path==='/__ci/default'){
  let dependencies=0,clocks=0,body=0;
  const off=createPreparationSourceIntakeHttpHost({enabled:false,issuer,env:new Proxy({},{get(){dependencies++;throw Error();}}),
   get profile(){dependencies++;throw Error();},now:()=>{clocks++;throw Error();}});
  const r=off?await off(new Proxy(request,{get(target,k){if(k==='body'){body++;throw Error();}return Reflect.get(target,k,target);}})):new Response(null,{status:404});
  return Response.json({status:r.status,dependencies,clocks,body});
 }
 if(path==='/__ci/reset'){reset();return new Response(null,{status:204});}
 if(path==='/__ci/stats')return Response.json(stats);
 if(path.startsWith('/__ci/mode/')){mode=path.slice('/__ci/mode/'.length);if(mode==='expire-profile')offset=181000;return new Response(null,{status:204});}
 let customBody,controller,timer;
 if(path==='/__ci/slow-body')customBody=new ReadableStream({async pull(c){await new Promise(resolve=>setTimeout(resolve,5100));try{c.enqueue(new TextEncoder().encode('late'));c.close();}catch{/* original request closed */}}},{highWaterMark:0});
 if(path==='/__ci/abort'){controller=new AbortController();timer=setTimeout(()=>controller.abort(),50);}
 const wrapped=new Proxy(request,{get(target,k){
  if(k==='url'&&(path==='/__ci/slow-body'||path==='/__ci/abort'))return issuer+'/source/new';
  if(k==='signal'&&controller)return controller.signal;
  if(k==='body'){stats.body++;return customBody??Reflect.get(target,k,target);}
  const v=Reflect.get(target,k,target);return typeof v==='function'?v.bind(target):v;
 }});
 try{return await host(wrapped);}finally{clearTimeout(timer);}
}};
export default fixture;
