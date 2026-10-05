import {createNoticeReviewControls} from '../../lib/operations-notice-review-controls.mjs';
import {operationsWindowOpen} from '../../lib/operations-window.mjs';
import {decodeJwt} from 'jose';
import {resolveOperationsReviewOperator} from '../../lib/operations-review-operator.mjs';
import {readNoticeReviewTarget} from '../../lib/operations-review-context.mjs';
import {renderReviewPage} from '../../lib/operations-review-page.mjs';

// Prepared origin only. This module/config does not provision a hostname or Access policy.
export const OPERATIONS_REVIEW_ORIGIN='https://operations-review.agentfriendlyweb.dev';
const unavailable=()=>Response.json({code:'unavailable'},{status:404,headers:{'Cache-Control':'no-store'}});
const json=(code,status)=>Response.json({code},{status,headers:{'Cache-Control':'no-store'}});
async function view(request,env,{config,keySet,now}){
 const url=new URL(request.url),selector=url.searchParams.get('run');
 if(url.origin!==OPERATIONS_REVIEW_ORIGIN)return unavailable();
 if([...url.searchParams.keys()].some(key=>key!=='run')||url.searchParams.getAll('run').length>1
  ||(selector!==null&&!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(selector)))return json('invalid_request',400);
 const origin=request.headers.get('Origin'),navigation=request.headers.get('Sec-Fetch-Mode')==='navigate'&&request.headers.get('Sec-Fetch-Dest')==='document';
 if((origin&&origin!==OPERATIONS_REVIEW_ORIGIN)||(request.headers.get('Sec-Fetch-Site')!=='same-origin'&&!navigation))return json('same_origin_required',403);
 const limiter=env.OPERATIONS_REVIEW_RATE_LIMITER;
 if(typeof limiter?.limit!=='function')return json('temporarily_unavailable',503);
 let providerFailed=false;
 const keys=typeof keySet==='function'?async(...args)=>{try{return await keySet(...args);}catch(error){if(error?.code!=='ERR_JWKS_NO_MATCHING_KEY')providerFailed=true;throw Error('Key unavailable');}}:keySet;
 const operator=await resolveOperationsReviewOperator(request,config,{keySet:keys,now});
 if(!operationsWindowOpen(env,now()))return unavailable();
 if(providerFailed)return json('temporarily_unavailable',503);
 if(!operator.ok)return json('operator_identity_required',401);
 const exp=decodeJwt(request.headers.get('Cf-Access-Jwt-Assertion')).exp,live=()=>Number.isSafeInteger(exp)&&exp>Math.floor(now()/1000);
 if(!live())return json('operator_identity_required',401);
 const limited=await limiter.limit({key:operator.operatorId});
 if(!operationsWindowOpen(env,now()))return unavailable();
 if(!live())return json('operator_identity_required',401);
 if(limited?.success===false)return json('try_later',429);
 if(limited?.success!==true)return json('temporarily_unavailable',503);
 const target=await readNoticeReviewTarget(env,{runId:selector??undefined,authorized:true,now:now()});
 if(!operationsWindowOpen(env,now()))return unavailable();
 if(!live())return json('operator_identity_required',401);
 const nonce=crypto.randomUUID().replaceAll('-','');
 return new Response(renderReviewPage(target,nonce),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer',
  'X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow',
  'Content-Security-Policy':`default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`}});
}

/** Separate human review entrypoint. Trusted key/clock injection is for local acceptance,
 * never taken from HTTP input. The default export uses Access JWKS and the server clock.
 */
export function createOperationsReviewWorker({keySet,now=Date.now}={}){
 return {async fetch(request,env){
  try{
   if(env?.AFW_OPERATIONS_REVIEW_ENABLED!=='true'||env?.AFW_OPERATIONS_REVIEWS_ENABLED!=='true'
    ||!operationsWindowOpen(env,now())||!env.OPERATIONS_STATE_DB)return unavailable();
   const config={enabled:true,origin:OPERATIONS_REVIEW_ORIGIN,teamDomain:env.AFW_OPERATIONS_ACCESS_TEAM_DOMAIN,
     audience:env.AFW_OPERATIONS_REVIEW_AUDIENCE,consumerAudience:env.AFW_OPERATIONS_CONSUMER_AUDIENCE,
     subject:env.AFW_OPERATIONS_REVIEW_SUBJECT};
   if(request.method==='GET'&&new URL(request.url).pathname==='/')return await view(request,env,{config,keySet,now});
   return await createNoticeReviewControls({env,keySet,now,limiter:env.OPERATIONS_REVIEW_RATE_LIMITER,config})(request);
  }catch{return Response.json({code:'temporarily_unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}
 }};
}

export default createOperationsReviewWorker();
