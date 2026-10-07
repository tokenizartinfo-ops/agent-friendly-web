import {env} from 'cloudflare:workers';
import {getCloudflareAccessUser} from '../../../../cloudflare-access-auth';
import {createOwnerAssistanceGoalProposalHandler} from '../../../../../lib/assistance-goal-owner-proposal-handler.mjs';
export async function GET(request:Request,context:{params:Promise<{projectId:string}>}){
 const settings=env as unknown as Record<string,unknown>;
 return createOwnerAssistanceGoalProposalHandler({
 getSettings:()=>({enabled:settings.AFW_ASSISTANCE_GOAL_PROPOSAL_ENABLED==='true',expiresAt:settings.AFW_ASSISTANCE_GOAL_PROPOSAL_EXPIRES_AT,allowedProjectId:settings.AFW_ASSISTANCE_PROJECT_ID}),
 getIdentity:getCloudflareAccessUser,db:env.DB,
 })(request,(await context.params).projectId);
}
