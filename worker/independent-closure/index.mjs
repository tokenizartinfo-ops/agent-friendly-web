import {DurableObject} from 'cloudflare:workers';
import {createApprovedQaClosureHost} from '../../lib/assistance-approved-qa-closure-host.mjs';
import {createPrivateQaCatalogHost} from '../../lib/assistance-private-qa-catalog-host.mjs';

// Exported but deliberately unbound until private provisioning and installation
// are verified. No consumer-facing approval or installation methods exist.
export class PrivateQaCatalog extends DurableObject {
 constructor(ctx,env){
  super(ctx,env);
  this.reader=createPrivateQaCatalogHost({storage:ctx.storage,db:env.AFW_QA_DB,
   readProvisioning:ref=>env.AFW_QA_PROVISIONING.get(env.AFW_QA_PROVISIONING.idFromName('own-qa')).read(ref)});
 }
 read(){return this.reader.read();}
 readOccurrenceApproval(){return this.reader.readOccurrenceApproval();}
 fetch(){return new Response(null,{status:404});}
}

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
