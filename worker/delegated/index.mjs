import { createDelegatedOAuthWorker } from '../../lib/delegated-oauth-worker.mjs';
const worker={fetch(request,env,ctx){
  return createDelegatedOAuthWorker({issuer:env.AFW_OAUTH_ISSUER,resource:env.AFW_OAUTH_RESOURCE}).fetch(request,env,ctx);
}};
export default worker;
