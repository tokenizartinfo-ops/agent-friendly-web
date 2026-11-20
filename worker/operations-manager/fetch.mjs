import {FINITE_DOSSIER_CALLBACK_PATH,receiveFiniteDossierCallback} from '../../lib/mcp-qa-finite-dossier-callback.mjs';
import {FINITE_DOSSIER_QA_ORIGIN} from '../../lib/dossier-supervision-finite-review.mjs';
import { createOperationsServiceControls, OPERATIONS_MANAGER_ORIGIN } from '../../lib/operations-service-controls.mjs';
import { operationsWindowOpen } from '../../lib/operations-window.mjs';

/** Separate operational service; canonical deployment remains disabled and unrouted. */
const operationsManager = {
  async fetch(request, env) {
    const url=new URL(request.url),dedicated=url.origin===FINITE_DOSSIER_QA_ORIGIN;
    if(url.pathname===FINITE_DOSSIER_CALLBACK_PATH)return receiveFiniteDossierCallback({request,env});
    if (dedicated&&(env.AFW_DOSSIER_FINITE_REVIEW_ISOLATED!=='true'||env.AFW_DOSSIER_FINITE_REVIEW_ENABLED!=='true')||!operationsWindowOpen(env) || env.AFW_OPERATIONS_CONSUMER_ENABLED !== 'true' || !env.OPERATIONS_DB) {
      return Response.json({ code: 'unavailable' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }
    return createOperationsServiceControls({ db: env.OPERATIONS_DB, limiter: env.OPERATIONS_RATE_LIMITER, noticeEnv:env,
      config: { enabled: true, origin: dedicated?FINITE_DOSSIER_QA_ORIGIN:OPERATIONS_MANAGER_ORIGIN, teamDomain: env.AFW_OPERATIONS_ACCESS_TEAM_DOMAIN,
        audience: env.AFW_OPERATIONS_CONSUMER_AUDIENCE, clientId: env.AFW_OPERATIONS_CONSUMER_CLIENT_ID } })(request);
  },
};
export default operationsManager;
