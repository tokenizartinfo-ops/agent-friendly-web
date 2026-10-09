import {DurableObject,WorkflowEntrypoint} from 'cloudflare:workers';
import {createApprovedQaClosureHost} from '../../lib/assistance-approved-qa-closure-host.mjs';
import {createPrivateQaCatalogHost} from '../../lib/assistance-private-qa-catalog-host.mjs';
import {createPrivateQaPreregistration} from '../../lib/assistance-private-qa-preregistration.mjs';
import {createPrivateAdminBootstrap} from '../../lib/assistance-private-admin-bootstrap.mjs';

// Configuration comes only from prior administrative deployment. Never params.
const pins=env=>{try{const text=env.AFW_QA_PREREGISTRATION;if(typeof text!=='string'||text.length>20000)return null;return JSON.parse(text);}catch{return null;}};
const control=env=>({enabled:env.AFW_QA_BOOTSTRAP_ENABLED==='true',recordRef:pins(env)?.registration?.plan?.baselineRef??'',closeAt:pins(env)?.registration?.plan?.closeAt??0});
export class PrivateQaPreregistration extends DurableObject {
 constructor(ctx,env){super(ctx,env);this.actor=createPrivateQaPreregistration({storage:ctx.storage,readPreregistration:()=>pins(env)});this.configuration=env;}
 async register(expectedRef){const c=control(this.configuration);if(c.enabled!==true||c.recordRef!==expectedRef)return false;return this.actor.register();}
 read(){return this.actor.read();}
 readForClosure(){return this.actor.readForClosure();}
 // Private rollback preserves history. No HTTP methods expose these RPCs.
 withdraw(){return this.actor.withdraw();}
 fetch(){return new Response(null,{status:404});}
}
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(event,step){return createPrivateAdminBootstrap({readControl:()=>control(this.env),readRegistered:async ref=>(await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).read())?.registration?.plan?.baselineRef===ref,register:ref=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).register(ref)}).run(event.payload,step);}
}

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
