import {WorkflowEntrypoint} from 'cloudflare:workers';
import {runPreparationMaintenanceCaller} from '../../lib/preparation-maintenance-caller.mjs';

// No public or RPC control surface. Only the separately authorized Workflow API.
export default {fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});}};
export class AfwPreparationClientMaintenanceWorkflow extends WorkflowEntrypoint {
 run(event,step){return runPreparationMaintenanceCaller(this.env,event,step);}
}
