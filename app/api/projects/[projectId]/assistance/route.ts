import {env} from 'cloudflare:workers';
import {getCloudflareAccessUser} from '../../../../cloudflare-access-auth';
import {createAssistanceHandler} from '../../../../../lib/dossier-assistance.mjs';
type Context={params:Promise<{projectId:string}>};
async function handle(request:Request,context:Context){
 const settings=env as unknown as Record<string,unknown>;
 return createAssistanceHandler({enabled:settings.AFW_ASSISTANCE_ENABLED==='true',feedbackEnabled:settings.AFW_ASSISTANCE_FEEDBACK_ENABLED==='true',allowedProjectId:settings.AFW_ASSISTANCE_PROJECT_ID,db:env.DB,limiter:env.COPILOT_RATE_LIMIT,getIdentity:getCloudflareAccessUser})(request,(await context.params).projectId);
}
export const GET=handle;
export const POST=handle;
