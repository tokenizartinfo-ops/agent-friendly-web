import {env} from 'cloudflare:workers';
import {getCloudflareAccessUser} from '../../../../cloudflare-access-auth';
import {createOwnerAssistanceGoalProposalHandler} from '../../../../../lib/assistance-goal-owner-proposal-handler.mjs';
async function handle(request:Request,context:{params:Promise<{projectId:string}>}){
 const settings=env as unknown as Record<string,unknown>;
 return createOwnerAssistanceGoalProposalHandler({
 getSettings:()=>({enabled:settings.AFW_ASSISTANCE_GOAL_PROPOSAL_ENABLED==='true',expiresAt:settings.AFW_ASSISTANCE_GOAL_PROPOSAL_EXPIRES_AT,allowedProjectId:settings.AFW_ASSISTANCE_PROJECT_ID}),
 getIdentity:getCloudflareAccessUser,db:env.DB,limiter:env.COPILOT_RATE_LIMIT,
 })(request,(await context.params).projectId);
}
export const GET=handle;
export const POST=handle;
