import {createAssistanceGoalHttp} from '../../lib/assistance-goal-http.mjs';
import {GOAL_READ_ORIGIN,GOAL_READ_PURPOSE} from '../../lib/assistance-goal-service-identity.mjs';
import {createAssistanceGoalProposalHttp} from '../../lib/assistance-goal-proposal-http.mjs';
import {GOAL_PROPOSAL_ORIGIN,GOAL_PROPOSAL_PATH,GOAL_PROPOSAL_PURPOSE} from '../../lib/assistance-goal-proposal-identity.mjs';
import {reserveAssistanceGoalGeneration} from '../../lib/assistance-goal-generation-budget.mjs';
import {createAssistanceGoalGenerator} from '../../lib/assistance-goal-provider.mjs';
const parse=value=>{try{return JSON.parse(value);}catch{return null;}};
// Both purposes remain independently closed by default. No cron or enrollment
// is inferred from read activation; generation requires its own gate and budget.
const worker={fetch(request,env){
 if(new URL(request.url).pathname===GOAL_PROPOSAL_PATH){
  if(env.AFW_GOAL_PROPOSAL_ENABLED!=='true'||env.AFW_GOAL_GENERATION_ENABLED!=='true')return Response.json({code:'unavailable'},{status:404,headers:{'cache-control':'no-store'}});
  if(typeof env.AI?.run!=='function'||!['es','en','pt'].includes(env.AFW_GOAL_GENERATION_LOCALE))return Response.json({code:'unavailable'},{status:503,headers:{'cache-control':'no-store'}});
  return createAssistanceGoalProposalHttp({sourceDb:env.ASSISTANCE_SOURCE_DB,operationsDb:env.OPERATIONS_DB,limiter:env.GOAL_PROPOSAL_RATE_LIMIT,
   signingSecret:env.AFW_GOAL_PROPOSAL_SIGNING_SECRET,readSigningSecret:env.AFW_GOAL_CONTEXT_SIGNING_SECRET,signalSecret:env.AFW_ASSISTANCE_SIGNING_SECRET,
   reserveGeneration:value=>reserveAssistanceGoalGeneration({...value,db:env.OPERATIONS_DB}),
   generate:createAssistanceGoalGenerator({ai:env.AI,locale:env.AFW_GOAL_GENERATION_LOCALE}),
   getSettings:()=>({enabled:env.AFW_GOAL_PROPOSAL_ENABLED==='true',generationEnabled:env.AFW_GOAL_GENERATION_ENABLED==='true',origin:GOAL_PROPOSAL_ORIGIN,purpose:GOAL_PROPOSAL_PURPOSE,
    teamDomain:env.AFW_GOAL_PROPOSAL_ACCESS_TEAM_DOMAIN,audience:env.AFW_GOAL_PROPOSAL_ACCESS_AUD,clientId:env.AFW_GOAL_PROPOSAL_CLIENT_ID,
    readClientId:env.AFW_GOAL_CONTEXT_CLIENT_ID,readAudience:env.AFW_GOAL_CONTEXT_ACCESS_AUD,
    operationsClientId:env.AFW_ASSISTANCE_CLIENT_ID,operationsAudience:env.AFW_ASSISTANCE_ACCESS_AUD,
    expiresAt:env.AFW_GOAL_PROPOSAL_EXPIRES_AT,enrollment:parse(env.AFW_GOAL_PROPOSAL_ENROLLMENT),
   }),
  })(request);
 }
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
