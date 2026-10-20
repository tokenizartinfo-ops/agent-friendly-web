// CI ONLY: actual production Worker factory, ephemeral Access key, real SDK/KV/D1.
import {createDelegatedPreparationWorker} from '../../worker/mcp-preparation/index.mjs';
import {preparationCodeCiContext} from './preparation-code-worker.mjs';
import {verifyCloudflareAccessJwt} from '../../lib/cloudflare-access-identity.mjs';
import {importJWK} from 'jose';
let product,pins,profile,management,verify,heldMode=false;
const held=new Set(),background=new Set(),stats={accessStarted:0};
async function ready(env){
 if(product)return;
 const c=await preparationCodeCiContext(env),stamp=Date.now();profile=c.profile;management={startedAt:stamp,expiresAt:stamp+600000};
 const pub=await importJWK(JSON.parse(env.CI_PUBLIC_JWK),'RS256');
 verify=async args=>{stats.accessStarted++;if(heldMode)await new Promise(resolve=>held.add(resolve));return verifyCloudflareAccessJwt({...args,keySet:pub});};
 pins={...env,AFW_DELEGATED_PREPARATION_ROUTER_ENABLED:'true',AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED:'true',
  AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_DELEGATED_PREPARATION_ENABLED:'true',AFW_OAUTH_SERVICE_MODE:'window',
  AFW_OAUTH_PILOT_EXPIRES_AT:new Date(profile.trialExpiresAt).toISOString(),AFW_OAUTH_PILOT_PROJECT_ID:profile.projectId,
  AFW_OAUTH_PILOT_CLIENT_ID:profile.clientId,AFW_OAUTH_ISSUER:'https://example.invalid',AFW_OAUTH_RESOURCE:profile.resource,
  AFW_PREPARATION_TRIAL_STARTED_AT:new Date(profile.trialStartedAt).toISOString(),
  AFW_PREPARATION_MANAGEMENT_STARTED_AT:new Date(management.startedAt).toISOString(),
  AFW_PREPARATION_MANAGEMENT_EXPIRES_AT:new Date(management.expiresAt).toISOString(),AFW_PREPARATION_CLIENT_NAME:'CI actual preparation Worker',
  ACCESS_TEAM_DOMAIN:'synthetic.cloudflareaccess.com',ACCESS_AUD:'ci-preparation-audience',
  DELEGATED_RATE_LIMITER:{async limit(){return {success:true};}}};
 product=createDelegatedPreparationWorker({accessVerifier:verify});
}
const fixture={async fetch(request,env,ctx){
 const url=new URL(request.url),path=url.pathname;
 if(path==='/__ci/default'){
  let dependencyReads=0,bodyReads=0,clockReads=0;
  const off=new Proxy({}, {get(_target,key){if(key==='AFW_DELEGATED_PREPARATION_ROUTER_ENABLED')return undefined;dependencyReads++;throw Error('disabled dependency');}});
  const quiet=createDelegatedPreparationWorker({now:()=>{clockReads++;throw Error('disabled clock');},monotonic:()=>{clockReads++;throw Error('disabled clock');}});
  const body=new ReadableStream({pull(controller){bodyReads++;controller.enqueue(new Uint8Array([123,125]));controller.close();}},{highWaterMark:0});
  const r=await quiet.fetch(new Request('https://example.invalid/mcp',{method:'POST',body}),off,ctx);
  return Response.json({status:r.status,cache:r.headers.get('Cache-Control'),dependencyReads,bodyReads,clockReads});
 }
 await ready(env);
 const tracked={waitUntil(work){const p=Promise.resolve(work);background.add(p);p.then(()=>background.delete(p),()=>background.delete(p));ctx.waitUntil(p);}};
 if(path==='/__ci/bootstrap')return Response.json({clientId:profile.clientId,profile,management});
 if(path==='/__ci/stats'){if(!held.size)await Promise.allSettled([...background]);return Response.json(stats);}
 if(path==='/__ci/hold'&&request.method==='POST'){heldMode=true;return Response.json({held:true});}
 if(path==='/__ci/release'&&request.method==='POST'){heldMode=false;for(const r of held)r();held.clear();await Promise.allSettled([...background]);return Response.json({released:true});}
 if(path==='/__ci/drift'&&request.method==='POST'){pins.AFW_PREPARATION_MANAGEMENT_EXPIRES_AT=new Date(management.expiresAt-1000).toISOString();return Response.json({changed:true});}
 if(path==='/__ci/restore'&&request.method==='POST'){pins.AFW_PREPARATION_MANAGEMENT_EXPIRES_AT=new Date(management.expiresAt).toISOString();return Response.json({restored:true});}
 if(path==='/__ci/recreate'&&request.method==='POST'){product=createDelegatedPreparationWorker({accessVerifier:verify});return Response.json({freshFactory:true});}
 if(path.startsWith('/__ci/variant/')){
  const parts=path.slice('/__ci/variant/'.length).split('/'),mode=parts.shift(),copy={...pins};url.pathname='/'+parts.join('/');
  if(mode==='missing-start')delete copy.AFW_PREPARATION_TRIAL_STARTED_AT;
  if(mode==='offset-start')copy.AFW_PREPARATION_TRIAL_STARTED_AT=new Date(profile.trialStartedAt).toISOString().replace('Z','+00:00');
  if(mode==='bad-management')copy.AFW_PREPARATION_MANAGEMENT_EXPIRES_AT=new Date(management.startedAt).toISOString();
  if(mode==='wrong-resource')copy.AFW_OAUTH_RESOURCE='https://elsewhere.invalid/mcp';
  if(mode==='unknown-locale')copy.AFW_PREPARATION_LOCALE='other';
  if(mode==='short-management')copy.AFW_PREPARATION_MANAGEMENT_EXPIRES_AT=new Date(management.startedAt+30000).toISOString();
  if(mode==='expired-profile'){
   const stamp=Date.now();copy.AFW_PREPARATION_TRIAL_STARTED_AT=new Date(stamp-200000).toISOString();
   copy.AFW_OAUTH_PILOT_EXPIRES_AT=new Date(stamp-10000).toISOString();
  }
  return product.fetch(new Request(url,request),copy,tracked);
 }
 return product.fetch(request,pins,tracked);
}};
export default fixture;
