import {createNoticeReviewControls} from '../../lib/operations-notice-review-controls.mjs';
import {operationsWindowOpen} from '../../lib/operations-window.mjs';

// Prepared origin only. This module/config does not provision a hostname or Access policy.
export const OPERATIONS_REVIEW_ORIGIN='https://operations-review.agentfriendlyweb.dev';
const unavailable=()=>Response.json({code:'unavailable'},{status:404,headers:{'Cache-Control':'no-store'}});

/** Separate human review entrypoint. Trusted key/clock injection is for local acceptance,
 * never taken from HTTP input. The default export uses Access JWKS and the server clock.
 */
export function createOperationsReviewWorker({keySet,now=Date.now}={}){
 return {async fetch(request,env){
  try{
   if(env?.AFW_OPERATIONS_REVIEW_ENABLED!=='true'||env?.AFW_OPERATIONS_REVIEWS_ENABLED!=='true'
    ||!operationsWindowOpen(env,now())||!env.OPERATIONS_STATE_DB)return unavailable();
   return await createNoticeReviewControls({env,keySet,now,limiter:env.OPERATIONS_REVIEW_RATE_LIMITER,
    config:{enabled:true,origin:OPERATIONS_REVIEW_ORIGIN,teamDomain:env.AFW_OPERATIONS_ACCESS_TEAM_DOMAIN,
     audience:env.AFW_OPERATIONS_REVIEW_AUDIENCE,consumerAudience:env.AFW_OPERATIONS_CONSUMER_AUDIENCE,
     subject:env.AFW_OPERATIONS_REVIEW_SUBJECT}})(request);
  }catch{return Response.json({code:'temporarily_unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}
 }};
}

export default createOperationsReviewWorker();
