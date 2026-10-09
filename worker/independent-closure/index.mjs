import {DurableObject} from 'cloudflare:workers';
import {createApprovedQaClosureHost} from '../../lib/assistance-approved-qa-closure-host.mjs';

// Private host only. Missing catalog/custody stays closed. No caller approval,
// provisioning, registration, HTTP routes or implicit enrollment.
export class IndependentClosure extends DurableObject {
 constructor(ctx,env){
  super(ctx,env);
  const catalog=()=>env.AFW_QA_CATALOG.get(env.AFW_QA_CATALOG.idFromName('own-qa'));
  this.actor=createApprovedQaClosureHost({context:ctx,db:env.AFW_QA_DB,
   readApproval:()=>catalog().readOccurrenceApproval(),catalog:{read:()=>catalog().read()},
   readIdentityCredential:async()=>env.AFW_QA_IDENTITY_API_TOKEN,
   readAdministrativeCredential:async()=>env.AFW_QA_ADMIN_READ_API_TOKEN});
 }
 arm(){return this.actor.arm();}
 status(){return this.actor.status();}
 alarm(){return this.actor.alarm();}
 fetch(){return new Response(null,{status:404});}
}
const worker={fetch(){return new Response(null,{status:404});}};
export default worker;
