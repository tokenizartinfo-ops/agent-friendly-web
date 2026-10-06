import { createOperationsIngress } from '../../lib/operations-ingress.mjs';
import { operationsWindowOpen } from '../../lib/operations-window.mjs';
import {createDossierIngress} from '../../lib/dossier-supervision-bridge.mjs';
import {createAssistanceIngress} from '../../lib/assistance-supervision-delivery.mjs';

const ingress = createOperationsIngress();
const dossierIngress=createDossierIngress();
const assistanceIngress=createAssistanceIngress();
export default {
  fetch(request, env) {
    if (!operationsWindowOpen(env)) return Response.json({ error: 'paused' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    if(new URL(request.url).pathname==='/dossier-events')return dossierIngress.fetch(request,env);
    if(new URL(request.url).pathname==='/assistance-events')return assistanceIngress.fetch(request,env);
    return ingress.fetch(request, env);
  },
};
