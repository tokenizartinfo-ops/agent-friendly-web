import { createOperationsIngress } from '../../lib/operations-ingress.mjs';
import { operationsWindowOpen } from '../../lib/operations-window.mjs';
import {createDossierIngress} from '../../lib/dossier-supervision-bridge.mjs';

const ingress = createOperationsIngress();
const dossierIngress=createDossierIngress();
export default {
  fetch(request, env) {
    if (!operationsWindowOpen(env)) return Response.json({ error: 'paused' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    if(new URL(request.url).pathname==='/dossier-events')return dossierIngress.fetch(request,env);
    return ingress.fetch(request, env);
  },
};
