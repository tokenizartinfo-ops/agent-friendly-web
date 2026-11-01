import {PrivateQaBootstrap as BaselineBootstrap} from './closed-rollback.mjs';
import {observation} from './closed-observation-context-v2.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {runPrivateQaClosedObservation} from '../lib/mcp-qa-closed-observation-v2.mjs';
export {IndependentClosure,PrivateQaPreregistration,PrivateQaNamedConfirmation,default} from './closed-rollback.mjs';
const pins=Object.freeze({canary:QA_CLOUD_CLOSED_PINS.canary,operator:QA_CLOUD_CLOSED_PINS.operator});
export class PrivateQaBootstrap extends BaselineBootstrap{
 run(event,step){let p=event?.payload;try{if(typeof p==='string'&&Buffer.byteLength(p)<=256)p=JSON.parse(p);}catch{/* Baseline remains responsible for all other payloads. */}
  if(p?.operation!=='inspect_closed_quiescence')return super.run(event,step);
  return runPrivateQaClosedObservation({env:this.env,event,step,context:observation,pins,fetchImpl:fetch,now:Date.now});
 }
}
