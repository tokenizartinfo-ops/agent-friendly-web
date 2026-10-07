import {createAssistanceGoalHttp} from '../../lib/assistance-goal-http.mjs';
import {GOAL_READ_ORIGIN,GOAL_READ_PURPOSE} from '../../lib/assistance-goal-service-identity.mjs';
const parse=value=>{try{return JSON.parse(value);}catch{return null;}};
// Closed by default; no cron, model calls, mutation routes or customer enrollment.
const worker={fetch(request,env){
 return createAssistanceGoalHttp({sourceDb:env.ASSISTANCE_SOURCE_DB,operationsDb:env.OPERATIONS_DB,limiter:env.GOAL_CONTEXT_RATE_LIMIT,
  signingSecret:env.AFW_GOAL_CONTEXT_SIGNING_SECRET,signalSecret:env.AFW_ASSISTANCE_SIGNING_SECRET,
  getSettings:()=>({enabled:env.AFW_GOAL_CONTEXT_ENABLED==='true',origin:GOAL_READ_ORIGIN,purpose:GOAL_READ_PURPOSE,
   teamDomain:env.AFW_GOAL_CONTEXT_ACCESS_TEAM_DOMAIN,audience:env.AFW_GOAL_CONTEXT_ACCESS_AUD,clientId:env.AFW_GOAL_CONTEXT_CLIENT_ID,
   excludedClientIds:parse(env.AFW_GOAL_CONTEXT_EXCLUDED_CLIENT_IDS),excludedAudiences:parse(env.AFW_GOAL_CONTEXT_EXCLUDED_AUDIENCES),
   expiresAt:env.AFW_GOAL_CONTEXT_EXPIRES_AT,enrollment:parse(env.AFW_GOAL_CONTEXT_ENROLLMENT),
  }),
 })(request);
}};
export default worker;
