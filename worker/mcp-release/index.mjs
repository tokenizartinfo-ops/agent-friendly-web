import {WorkerEntrypoint,WorkflowEntrypoint} from 'cloudflare:workers';
import {runReleaseOperator,runReleaseWorkflow,runKnownCancellationReleaseWorkflow} from '../../lib/mcp-release-runtime.mjs';
import {runSuccessorRetirementObservation} from '../../lib/mcp-successor-retirement-observation.mjs';
import {runReleaseIdentityObservation} from '../../lib/mcp-release-identity-observation.mjs';
import {runReleaseCustodyClockObservation} from '../../lib/mcp-release-custody-clock-observation.mjs';

// Build-time inputs, not RPC arguments or public environment metadata.
const bundle=globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;
const closedHttp={fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});}};
export default closedHttp;
export class AfwReleaseOperator extends WorkerEntrypoint {
 run(...args){return runReleaseOperator(bundle,this.env,args);}
}

/** Administrative API adapter only. Named confirmation requires its own opt-in.
 * No schedule, HTTP or client event consumer. */
export class AfwReleaseWorkflow extends WorkflowEntrypoint {
 async run(event,step){
  if(this.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED==='true')return runReleaseCustodyClockObservation({env:this.env,event,step});
  if(this.env.AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED==='true')return runReleaseIdentityObservation({env:this.env,event,step});
  if(this.env.AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED==='true')return runSuccessorRetirementObservation({env:this.env,event,step});
  if(bundle?.policy?.operation==='confirm_named'&&this.env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED==='true')return runKnownCancellationReleaseWorkflow({bundle,env:this.env,event,step});
  return runReleaseWorkflow({bundle,env:this.env,event,step});
 }
}
