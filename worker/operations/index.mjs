import { createOperationsIngress } from '../../lib/operations-ingress.mjs';
import { operationsWindowOpen } from '../../lib/operations-window.mjs';

const ingress = createOperationsIngress();
export default {
  fetch(request, env) {
    if (!operationsWindowOpen(env)) return Response.json({ error: 'paused' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    return ingress.fetch(request, env);
  },
};
