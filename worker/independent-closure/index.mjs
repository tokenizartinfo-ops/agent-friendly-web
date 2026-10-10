import {createPrivateProviderObservation} from '../../lib/assistance-private-provider-observation.mjs';
import {createPrivateProviderGetTransport} from '../../lib/assistance-private-provider-get-transport.mjs';
import {createPrivateQaProvisioning} from '../../lib/assistance-private-qa-provisioning.mjs';
import {createPrivateCustodyChallenge} from '../../lib/assistance-private-custody-challenge.mjs';
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
const originalControl=env=>{try{if(env.AFW_QA_ORIGINALS_ENABLED!=='true'||typeof env.AFW_QA_OPERATOR_CONTEXT!=='string'||env.AFW_QA_OPERATOR_CONTEXT.length>3000)return null;const c=JSON.parse(env.AFW_QA_OPERATOR_CONTEXT);if(!c||Object.keys(c).length!==2||!Object.hasOwn(c,'operatorRef')||!Object.hasOwn(c,'cloud'))return null;return {...c,enabled:true};}catch{return null;}};
const control=env=>({enabled:env.AFW_QA_BOOTSTRAP_ENABLED==='true',recordRef:pins(env)?.registration?.plan?.baselineRef??'',closeAt:pins(env)?.registration?.plan?.closeAt??0});
const identity=env=>{try{const text=env.AFW_QA_CHALLENGE_IDENTITY;if(env.AFW_QA_CHALLENGE_ENABLED!=='true'||typeof text!=='string'||text.length>3000)return null;return JSON.parse(text);}catch{return null;}};
const challengePath=request=>{const url=new URL(request.url);return request.method==='POST'&&url.pathname==='/assistance/custody/confirm'&&!url.search;};
const providerContext=env=>{if(env.AFW_QA_PROVIDER_OBSERVATION_ENABLED!=='true'||typeof env.AFW_QA_PROVIDER_CONTEXT!=='string'||env.AFW_QA_PROVIDER_CONTEXT.length>1000)throw Error('Provider unavailable');return JSON.parse(env.AFW_QA_PROVIDER_CONTEXT);};
async function observeProvider(actor,env,parentSignal){try{
 const provider=providerContext(env),fingerprint=JSON.stringify(provider),readPins=async()=>{const p=await actor.read();if(!p||JSON.stringify(providerContext(env))!==fingerprint)throw Error('Provider unavailable');return {...p,provider};};
 const first=await actor.readOperatorObservation();if(!first)return null;const p=await readPins(),recordRef=p.registration.plan.baselineRef;
 const transport=createPrivateProviderGetTransport({resources:p.registration.resources,readCredential:async()=>env.AFW_QA_ADMIN_READ_API_TOKEN});const request=input=>transport({...input,signal:parentSignal?AbortSignal.any([input.signal,parentSignal]):input.signal});
 const value=await createPrivateProviderObservation({readPins,request}).read(recordRef);if(!value)return null;
 const final=await actor.readOperatorObservation();if(!final||JSON.stringify(first.originals)!==JSON.stringify(final.originals)||first.correlation.receiptRef!==final.correlation.receiptRef||JSON.stringify(providerContext(env))!==fingerprint)return null;
 return value;
}catch{return null;}}
export class PrivateQaPreregistration extends DurableObject {
 #primaryStorage;
 constructor(ctx,env){super(ctx,env);this.#primaryStorage=ctx.storage;this.actor=createPrivateQaPreregistration({storage:ctx.storage,readPreregistration:()=>pins(env),readOriginalControl:()=>originalControl(env)});this.configuration=env;
  const readInstallation=()=>pins(env),readIdentityConfig=()=>identity(env);
  this.challenge=createPrivateChallengeHost({storage:ctx.storage,readInstallation,readIdentityConfig,allowChallengeRequest:true,
   prepareExchange:createPreregisteredExchangePreparation({preregistration:this.actor,readInstallation}),
   limiter:createPrivateChallengeBudget({storage:ctx.storage,readPrincipal:()=>readIdentityConfig()?.principalRef})});
 }
 async register(expectedRef){const c=control(this.configuration);if(c.enabled!==true||c.recordRef!==expectedRef)return false;return this.actor.register();}
 read(){return this.actor.read();}
 readForClosure(){return this.actor.readForClosure();}
 appendOperatorObservation(ref,sequence,originals){return this.actor.appendOperatorObservation(ref,sequence,originals);}
 readOperatorObservation(){return this.actor.readOperatorObservation();}
 readOperatorHistory(){return this.actor.readOperatorHistory();}
 readProviderObservation(){return observeProvider(this.actor,this.configuration);}
 reserveOwn(){return this.#reservation('reserve');}
 readOwnReservation(){return this.#reservation('read');}
 readOwnReservationHistory(){return this.#reservation('history');}
 withdrawOwnReservation(){return this.#reservation('withdraw');}
 async #reservation(method){let active=true,transaction;const startedAt=Date.now(),env=this.configuration,base=this.#primaryStorage;
  const live=()=>{if(!active)throw Error('Reservation unavailable');};
  // Invocation-local scope: nested readers share the current primary tx.
  const storage={get:keys=>{live();return (transaction??base).get(keys);},transaction:fn=>{live();if(transaction)return fn(transaction);return base.transaction(async tx=>{live();transaction=tx;try{const result=await fn(tx);live();return result;}finally{transaction=undefined;}});}};
  try{
   const initial=pins(env),creationRef=initial?.registration?.provisioning?.creationRef;if(!creationRef)return null;
   const documentary=method==='history';const fingerprint=JSON.stringify({pins:initial,control:originalControl(env),provider:env.AFW_QA_PROVIDER_CONTEXT,enabled:env.AFW_QA_PRIMARY_RESERVATION_ENABLED});
   const checked=()=>{live();if(!documentary&&(env.AFW_QA_PRIMARY_RESERVATION_ENABLED!=='true'||JSON.stringify({pins:pins(env),control:originalControl(env),provider:env.AFW_QA_PROVIDER_CONTEXT,enabled:env.AFW_QA_PRIMARY_RESERVATION_ENABLED})!==fingerprint))throw Error('Reservation unavailable');};
   checked();const actor=createPrivateQaPreregistration({storage,readPreregistration:()=>pins(env),readOriginalControl:()=>originalControl(env)}),challenge=createPrivateCustodyChallenge({storage,readInstallation:()=>pins(env)});
   const producer=createPrivateQaProvisioning({storage,readPins:async()=>{checked();const p=await actor.read(),original=await actor.readOperatorObservation();checked();if(!p||!original)throw Error('Reservation unavailable');return {...p,cloud:originalControl(env).cloud,provider:providerContext(env)};},readAdministrativeEvidence:async({signal})=>{checked();const provider=await observeProvider(actor,env,signal),original=await actor.readOperatorObservation();checked();if(!provider||!original)throw Error('Reservation unavailable');return {provider,execution:original.correlation};},readChallengeObservation:async()=>{checked();const status=await challenge.status();checked();return {contract:'afw-private-qa-observation/v1',state:'observed',recordRef:initial.registration.plan.baselineRef,challenge:status};}});
   const value=await producer[method](creationRef,...(method==='withdraw'?[1]:[]));checked();
   if(value&&(method==='reserve'||method==='read')){
    const ref=initial.registration.plan.baselineRef,r=initial.registration.resources;
    const prereg='afw-private-qa-preregistration/v1:current',originals='afw-private-qa-originals/v1:current',challengeKey='afw-private-custody-challenge/v1:current',reservation='afw-private-qa-provisioning-record/v1:',holds='afw-private-qa-resource-reservation/v1:',journal='afw-private-evidence-journal/v1:';
    const keys=[prereg,prereg+':withdrawn',originals,challengeKey,challengeKey+':withdrawn',reservation+'creation:'+creationRef,reservation+'record:'+ref,holds+'record:'+ref,...['token:'+r.tokenId,'application:'+r.applicationId,'policy:'+r.applicationId+':'+r.policyId,'worker:'+r.workerName].map(k=>holds+'owner:'+r.accountId+':'+k),journal+'head:'+ref,...Array.from({length:5},(_,i)=>journal+'entry:'+ref+':'+(i+1))];
    // Validate both authorities between atomic snapshots. No async work follows
    // the final combined checkpoint: withdrawal cannot slip across one reader.
    const before=await storage.get(keys),history=await producer.history(creationRef);
    if(!(before instanceof Map)||history?.state!=='reserved'||JSON.stringify(before.get(reservation+'record:'+ref))!==JSON.stringify(history))return null;
    const original=await actor.readOperatorObservation();if(!original)return null;
    const final=await storage.get(keys);checked();
    if(!(final instanceof Map)||JSON.stringify(keys.map(k=>before.get(k)))!==JSON.stringify(keys.map(k=>final.get(k)))||final.has(prereg+':withdrawn')||final.has(challengeKey+':withdrawn'))return null;
    const c=final.get(challengeKey),o=original.originals,t=Date.now();
    if(t<startedAt||t-startedAt>5000||t>=history.deadline||t<original.correlation.observedAt||t>Math.min(o.context.observedAt,o.execution.observedAt,o.execution.turnStartedAt,o.execution.turnCompletedAt,c.issuedAt,c.consumedAt)+30000)return null;
   }
   return value;
  }catch{return method==='withdraw'?false:null;}finally{active=false;}
 }
 readChallengeStatus(){return this.challenge.status();}
 // Private rollback preserves history. HTTP exposes only authenticated exchange.
 withdraw(){return this.actor.withdraw();}
 fetch(request){if(this.configuration.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request))return new Response(null,{status:404});return this.challenge.fetch(request);}
}
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(event,step){let params=event.payload;try{if(typeof params==='string'&&params.length<=8192){const decoded=JSON.parse(params);if(params.length<=256||decoded?.operation==='originals')params=decoded;}}catch{/* Strict handlers reject malformed payloads. */}
  if(params?.operation==='observe')return observePrivateQa(this.env,params);
  return createPrivateAdminBootstrap({readControl:()=>control(this.env),readRegistered:async ref=>(await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).read())?.registration?.plan?.baselineRef===ref,register:ref=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).register(ref),appendOriginals:(ref,sequence,originals)=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).appendOperatorObservation(ref,sequence,originals),readOriginals:async()=>{const value=await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).readOperatorObservation();try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}}}).run(event.payload,step);}
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
