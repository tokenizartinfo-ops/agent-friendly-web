import {DurableObject,WorkflowEntrypoint} from 'cloudflare:workers';
import {createApprovedQaClosureHost} from '../../lib/assistance-approved-qa-closure-host.mjs';
import {createPrivateQaCatalogHost} from '../../lib/assistance-private-qa-catalog-host.mjs';
import {createPrivateQaPreregistration} from '../../lib/assistance-private-qa-preregistration.mjs';
import {createPrivateAdminBootstrap} from '../../lib/assistance-private-admin-bootstrap.mjs';
import {createPrivateQaObservation} from '../../lib/assistance-private-qa-observation.mjs';
import {createPrivateChallengeHost,createPreregisteredExchangePreparation} from '../../lib/assistance-private-challenge-host.mjs';
import {createPrivateChallengeBudget} from '../../lib/assistance-private-challenge-budget.mjs';

// Configuration comes only from prior administrative deployment. Never params.
const pins=env=>{try{const text=env.AFW_QA_PREREGISTRATION;if(typeof text!=='string'||text.length>20000)return null;return JSON.parse(text);}catch{return null;}};
const control=env=>({enabled:env.AFW_QA_BOOTSTRAP_ENABLED==='true',recordRef:pins(env)?.registration?.plan?.baselineRef??'',closeAt:pins(env)?.registration?.plan?.closeAt??0});
const identity=env=>{try{const text=env.AFW_QA_CHALLENGE_IDENTITY;if(env.AFW_QA_CHALLENGE_ENABLED!=='true'||typeof text!=='string'||text.length>3000)return null;return JSON.parse(text);}catch{return null;}};
const challengePath=request=>{const url=new URL(request.url);return request.method==='POST'&&url.pathname==='/assistance/custody/confirm'&&!url.search;};
export class PrivateQaPreregistration extends DurableObject {
 constructor(ctx,env){super(ctx,env);this.actor=createPrivateQaPreregistration({storage:ctx.storage,readPreregistration:()=>pins(env)});this.configuration=env;
  const readInstallation=()=>pins(env),readIdentityConfig=()=>identity(env);
  this.challenge=createPrivateChallengeHost({storage:ctx.storage,readInstallation,readIdentityConfig,allowChallengeRequest:true,
   prepareExchange:createPreregisteredExchangePreparation({preregistration:this.actor,readInstallation}),
   limiter:createPrivateChallengeBudget({storage:ctx.storage,readPrincipal:()=>readIdentityConfig()?.principalRef})});
 }
 async register(expectedRef){const c=control(this.configuration);if(c.enabled!==true||c.recordRef!==expectedRef)return false;return this.actor.register();}
 read(){return this.actor.read();}
 readForClosure(){return this.actor.readForClosure();}
 readChallengeStatus(){return this.challenge.status();}
 // Private rollback preserves history. HTTP exposes only authenticated exchange.
 withdraw(){return this.actor.withdraw();}
 fetch(request){if(this.configuration.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request))return new Response(null,{status:404});return this.challenge.fetch(request);}
}
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(event,step){let params=event.payload;try{if(typeof params==='string'&&params.length<=256)params=JSON.parse(params);}catch{/* Strict handlers reject malformed payloads. */}
  if(params?.operation==='observe')return observePrivateQa(this.env,params);
  return createPrivateAdminBootstrap({readControl:()=>control(this.env),readRegistered:async ref=>(await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).read())?.registration?.plan?.baselineRef===ref,register:ref=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).register(ref)}).run(event.payload,step);}
}
export function observePrivateQa(env,params){const actor=()=>env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa'));
 // workerd adds a disposable RPC handle to otherwise plain metadata. Remove
 // only transport machinery before the strict schema validation, then release.
 const metadata=async promise=>{const value=await promise;try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}};
 return createPrivateQaObservation({readHistory:()=>metadata(actor().readForClosure()),readChallenge:()=>metadata(actor().readChallengeStatus())}).run(params);}

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
const worker={async fetch(request,env){if(env?.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request)||!env.AFW_QA_PREREGISTRY)return new Response(null,{status:404});try{return await env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).fetch(request);}catch{return Response.json({code:'unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}}};
export default worker;
