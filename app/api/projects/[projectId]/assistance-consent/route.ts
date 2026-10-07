import {env} from 'cloudflare:workers';
import {getCloudflareAccessUser} from '../../../../cloudflare-access-auth';
import {createAssistanceGoalConsentHandler} from '../../../../../lib/assistance-goal-consent-handler.mjs';
type Context={params:Promise<{projectId:string}>};
async function handle(request:Request,context:Context){
 const settings=env as unknown as Record<string,unknown>;
 return createAssistanceGoalConsentHandler({
  getSettings:()=>({enabled:settings.AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED==='true',allowedProjectId:settings.AFW_ASSISTANCE_PROJECT_ID,expiresAt:settings.AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT}),
  db:env.DB,limiter:env.COPILOT_RATE_LIMIT,getIdentity:getCloudflareAccessUser,
 })(request,(await context.params).projectId);
}
export const GET=handle;
export const POST=handle;
