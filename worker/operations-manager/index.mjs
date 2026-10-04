import { createOperationsServiceControls, OPERATIONS_MANAGER_ORIGIN } from '../../lib/operations-service-controls.mjs';
import { operationsWindowOpen } from '../../lib/operations-window.mjs';

/** Separate operational service; canonical deployment remains disabled and unrouted. */
const operationsManager = {
  async fetch(request, env) {
    if (!operationsWindowOpen(env) || env.AFW_OPERATIONS_CONSUMER_ENABLED !== 'true' || !env.OPERATIONS_DB) {
      return Response.json({ code: 'unavailable' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }
    return createOperationsServiceControls({ db: env.OPERATIONS_DB, limiter: env.OPERATIONS_RATE_LIMITER,
      config: { enabled: true, origin: OPERATIONS_MANAGER_ORIGIN, teamDomain: env.AFW_OPERATIONS_ACCESS_TEAM_DOMAIN,
        audience: env.AFW_OPERATIONS_CONSUMER_AUDIENCE, clientId: env.AFW_OPERATIONS_CONSUMER_CLIENT_ID } })(request);
  },
};
export default operationsManager;
