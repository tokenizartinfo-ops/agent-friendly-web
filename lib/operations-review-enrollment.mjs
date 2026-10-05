import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
import {resolveOperationsReviewOperator} from './operations-review-operator.mjs';

/** Read-only identity attestation; never creates an operator permission or exposes claims. */
export async function resolveOperationsReviewEnrollment(request,config,{keySet,now=Date.now}={}){
 try{
  const valid=value=>typeof value==='string'&&value.trim()===value&&value.length>0&&value.length<=512;
  if(config?.enabled!==true||config.origin!=='https://operations-review.agentfriendlyweb.dev'||new URL(request.url).origin!==config.origin
   ||!valid(config.audience)||!valid(config.consumerAudience)||config.audience===config.consumerAudience
   ||typeof config.email!=='string'||config.email.length>254||config.email!==config.email.trim().toLowerCase()||!/^\S+@\S+\.\S+$/.test(config.email))return {ok:false};
  const verified=await verifyCloudflareAccessJwt({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:config.teamDomain,audience:config.audience,keySet});
  if(!verified.ok||verified.identity.email!==config.email)return {ok:false};
  return await resolveOperationsReviewOperator(request,{...config,operatorId:undefined,subject:verified.identity.userId},{keySet,now});
 }catch{return {ok:false};}
}
