import {computeAdministrativeResultDigest} from '../../lib/assistance-administrative-closure-readback.mjs';
import {createPrimaryQaInstaller} from '../../lib/assistance-private-qa-installer.mjs';
import {createPrivateInstallationD1} from '../../lib/assistance-private-installation-d1.mjs';
import {matchPrivateInstallationD1,expectedPrivateInstallationDigests} from '../../lib/assistance-private-installation-finalization.mjs';
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
 installOwn(){return this.#reservation('install');}
 readOwnInstallationHistory(){return this.#reservation('installationHistory');}
 readOwnClosureScope(){return this.#reservation('closure');}
 readOwnAdmissionScope(){return this.#reservation('admission');}
 async #reservation(method){let active=true,transaction,installStarted=false;const startedAt=Date.now(),env=this.configuration,base=this.#primaryStorage;
  const live=()=>{const t=Date.now();if(!active||t<startedAt||t-startedAt>5000)throw Error('Primary operation unavailable');};
  // Invocation-local scope: nested readers share the current primary tx.
  const storage={get:keys=>{live();return (transaction??base).get(keys);},transaction:fn=>{live();if(transaction)return fn(transaction);return base.transaction(async tx=>{live();transaction=tx;try{const result=await fn(tx);live();return result;}finally{transaction=undefined;}});}};
  try{
   const initial=pins(env),creationRef=initial?.registration?.provisioning?.creationRef;if(!creationRef)return method==='install'?{state:'unavailable'}:null;
   const documentary=['history','installationHistory','closure'].includes(method),dispatcher=env.AFW_QA_OCCURRENCE_DISPATCH;
   const configuration=()=>JSON.stringify({pins:pins(env),control:originalControl(env),provider:env.AFW_QA_PROVIDER_CONTEXT,providerEnabled:env.AFW_QA_PROVIDER_OBSERVATION_ENABLED,reservationEnabled:env.AFW_QA_PRIMARY_RESERVATION_ENABLED,installationEnabled:env.AFW_QA_INSTALLATION_ENABLED,admissionEnabled:env.AFW_QA_PRIMARY_ADMISSION_ENABLED});
   const fingerprint=configuration(),pinsFingerprint=JSON.stringify(initial);
   const checked=()=>{live();if(JSON.stringify(pins(env))!==pinsFingerprint||(!documentary&&(env.AFW_QA_PRIMARY_RESERVATION_ENABLED!=='true'||configuration()!==fingerprint))||(method==='closure'&&env.AFW_QA_PRIMARY_CATALOG_ENABLED!=='true')||(method==='admission'&&env.AFW_QA_PRIMARY_ADMISSION_ENABLED!=='true')||(method==='install'&&(env.AFW_QA_INSTALLATION_ENABLED!=='true'||env.AFW_QA_OCCURRENCE_DISPATCH!==dispatcher)))throw Error('Primary operation unavailable');};
   checked();
   // Missing dispatcher stays closed before reservation or any D1 write.
   if(method==='install'&&(typeof dispatcher?.dispatch!=='function'||!env.AFW_QA_DB))return {state:'unavailable'};
   const actor=createPrivateQaPreregistration({storage,readPreregistration:()=>pins(env),readOriginalControl:()=>originalControl(env)}),challenge=createPrivateCustodyChallenge({storage,readInstallation:()=>pins(env)});
   const installation=['install','closure','admission'].includes(method)?createPrivateInstallationD1({db:env.AFW_QA_DB,now:()=>{checked();return Date.now();}}):null;
   const producer=createPrivateQaProvisioning({storage,readPins:async()=>{checked();const p=await actor.read(),original=await actor.readOperatorObservation();checked();if(!p||!original)throw Error('Primary operation unavailable');return {...p,cloud:originalControl(env).cloud,provider:providerContext(env)};},readAdministrativeEvidence:async({signal})=>{checked();const provider=await observeProvider(actor,env,signal),original=await actor.readOperatorObservation();checked();if(!provider||!original)throw Error('Primary operation unavailable');return {provider,execution:original.correlation};},readChallengeObservation:async()=>{checked();const status=await challenge.status();checked();return {contract:'afw-private-qa-observation/v1',state:'observed',recordRef:initial.registration.plan.baselineRef,challenge:status};},readInstallationD1:installation?({occurrenceId})=>installation.read(occurrenceId):undefined});
   const ref=initial.registration.plan.baselineRef,r=initial.registration.resources;
   const prereg='afw-private-qa-preregistration/v1:current',originals='afw-private-qa-originals/v1:current',challengeKey='afw-private-custody-challenge/v1:current',reservation='afw-private-qa-provisioning-record/v1:',holds='afw-private-qa-resource-reservation/v1:',journal='afw-private-evidence-journal/v1:';
   const keys=[prereg,prereg+':withdrawn',originals,challengeKey,challengeKey+':withdrawn',reservation+'creation:'+creationRef,reservation+'record:'+ref,holds+'record:'+ref,...['token:'+r.tokenId,'application:'+r.applicationId,'policy:'+r.applicationId+':'+r.policyId,'worker:'+r.workerName].map(k=>holds+'owner:'+r.accountId+':'+k),journal+'head:'+ref,...Array.from({length:5},(_,i)=>journal+'entry:'+ref+':'+(i+1)),...['intent','finalization','consumption'].map(kind=>'afw-private-installation-'+kind+'/v1:'+ref)];
   const same=(a,b)=>a instanceof Map&&b instanceof Map&&JSON.stringify(keys.map(k=>a.get(k)))===JSON.stringify(keys.map(k=>b.get(k)));
   const evidenceTime=(rows,original)=>{
    const c=rows.get(challengeKey),o=original.originals;
    return Math.min(o.context.observedAt,o.execution.observedAt,o.execution.turnStartedAt,o.execution.turnCompletedAt,c.issuedAt,c.consumedAt);
   };
   const freshnessLimit=(rows,original,history)=>Math.min(history.deadline,evidenceTime(rows,original)+30000);
   const fresh=(rows,original,history)=>{
    if(!original||rows.has(challengeKey+':withdrawn'))return false;
    const t=Date.now();
    return t>=original.correlation.observedAt&&t<freshnessLimit(rows,original,history);
   };
   const checkpoint=async value=>{
    if(!value)return value;
    // Complete validation between atomic snapshots; no await follows final.
    const before=await storage.get(keys),history=await producer.history(creationRef);
    if(!(before instanceof Map)||history?.state!=='reserved'||JSON.stringify(before.get(reservation+'record:'+ref))!==JSON.stringify(history))return null;
    const original=await actor.readOperatorObservation();if(!original)return null;
    const final=await storage.get(keys);checked();
    if(!same(before,final)||final.has(prereg+':withdrawn')||final.has(challengeKey+':withdrawn'))return null;
    if(!fresh(final,original,history))return null;
    return value;
   };
   const invoke=async(name,...args)=>{checked();const value=await producer[name](creationRef,...args);checked();return checkpoint(value);};
   const history=async()=>({reservation:await producer.history(creationRef),intent:await producer.installationHistory(creationRef),finalization:await producer.finalizationHistory(creationRef),consumption:await producer.consumptionHistory(creationRef)});
   const historyMatches=(rows,value)=>rows instanceof Map&&[['reservation',reservation+'record:'+ref],...['intent','finalization','consumption'].map(kind=>[kind,'afw-private-installation-'+kind+'/v1:'+ref])].every(([kind,key])=>rows.has(key)?value[kind]!==null&&JSON.stringify(rows.get(key))===JSON.stringify(value[kind]):value[kind]===null);
   if(method==='installationHistory'){
    const before=await storage.get(keys),value=await history(),final=await storage.get(keys);checked();
    return same(before,final)&&historyMatches(before,value)&&value.reservation?value:null;
   }
   if(method==='closure'||method==='admission'){
    const admitting=method==='admission';
    const before=await storage.get(keys),registered=await (admitting?actor.read():actor.readForClosure()),value=await history();checked();
    if(!historyMatches(before,value)||JSON.stringify(registered)!==pinsFingerprint||value.reservation?.state!=='reserved'||value.intent?.state!=='write_started'||!value.finalization)return null;
    const original=admitting?await actor.readOperatorObservation():null;checked();
    if(admitting&&(!original||value.consumption?.state!=='consumed'))return null;
    if(value.reservation.approvalPinsDigest!==await computeAdministrativeResultDigest(initial)||value.reservation.deadline!==initial.registration.plan.closeAt||JSON.stringify(before.get(holds+'record:'+ref)?.resources)!==JSON.stringify(r))return null;
    const first=await installation.read(initial.registration.plan.occurrenceId),clock=()=>{checked();return Date.now();};
    if(!await matchPrivateInstallationD1(value.reservation,value.intent,initial.approval,first,clock,{allowRevoked:!admitting}))return null;
    const expected=await expectedPrivateInstallationDigests(value.reservation,value.intent,initial.approval,clock);
    if(!expected||value.finalization.approvalDigest!==expected.approvalDigest||value.finalization.provenanceDigest!==expected.provenanceDigest)return null;
    const second=await installation.read(initial.registration.plan.occurrenceId);if(JSON.stringify(first)!==JSON.stringify(second))return null;
    const final=await storage.get(keys);checked();
    if(!same(before,final)||final.has(prereg+':withdrawn')||JSON.stringify(final.get(reservation+'record:'+ref))!==JSON.stringify(value.reservation))return null;
    if(admitting&&!fresh(final,original,value.reservation))return null;
    if(admitting)return {...structuredClone(initial),admission:{contract:'afw-primary-admission-observation/v1',observedAt:Date.now(),evidenceAt:evidenceTime(final,original),freshUntil:freshnessLimit(final,original,value.reservation)}};
    // Admission validates current pins; neither read returns a dispatch permit.
    return structuredClone(initial);
   }
   if(method==='install'){
    const provisioning=Object.fromEntries(['reserve','read','beginInstallation','startInstallationWrite','readInstallationIntent','finalizeInstallation','readFinalizedInstallation','consumeInstallation'].map(name=>[name,(_creation,...args)=>invoke(name,...args)]));
    const readInstallation=async()=>{checked();const value=await actor.read(),original=await actor.readOperatorObservation();checked();if(!value||!original)throw Error('Installation unavailable');return value;};
    const installer=createPrimaryQaInstaller({creationRef,provisioning,installation,readInstallation,dispatchOccurrence:async input=>{checked();if(input.signal.aborted||!await invoke('readFinalizedInstallation'))throw Error('Dispatch unavailable');checked();if(input.signal.aborted)throw Error('Dispatch unavailable');const {signal,...payload}=input;void signal;return dispatcher.dispatch(payload);}});
    installStarted=true;return await installer.install();
   }
   if(method==='history'){const value=await producer.history(creationRef);checked();return value;}
   if(method==='withdraw'){const value=await producer.withdraw(creationRef,1);checked();return value;}
   return await invoke(method);
  }catch{return method==='install'?{state:installStarted?'pending':'unavailable'}:method==='withdraw'?false:null;}finally{active=false;}
 }
 readChallengeStatus(){return this.challenge.status();}
 // Private rollback preserves history. HTTP exposes only authenticated exchange.
 withdraw(){return this.actor.withdraw();}
 fetch(request){if(this.configuration.AFW_QA_CHALLENGE_ENABLED!=='true'||!challengePath(request))return new Response(null,{status:404});return this.challenge.fetch(request);}
}
export class PrivateQaBootstrap extends WorkflowEntrypoint {
 run(event,step){let params=event.payload;try{if(typeof params==='string'&&params.length<=8192){const decoded=JSON.parse(params);if(params.length<=256||decoded?.operation==='originals')params=decoded;}}catch{/* Strict handlers reject malformed payloads. */}
  if(params?.operation==='observe')return observePrivateQa(this.env,params);
  return createPrivateAdminBootstrap({install:async()=>{const value=await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).installOwn();try{return {state:value?.state};}finally{value?.[Symbol.dispose]?.();}},readControl:()=>control(this.env),readRegistered:async ref=>(await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).read())?.registration?.plan?.baselineRef===ref,register:ref=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).register(ref),appendOriginals:(ref,sequence,originals)=>this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).appendOperatorObservation(ref,sequence,originals),readOriginals:async()=>{const value=await this.env.AFW_QA_PREREGISTRY.get(this.env.AFW_QA_PREREGISTRY.idFromName('own-qa')).readOperatorObservation();try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}}}).run(event.payload,step);}
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
  const legacy=()=>env.AFW_QA_CATALOG.get(env.AFW_QA_CATALOG.idFromName('own-qa'));
  const primaryScope=async()=>{if(env.AFW_QA_PRIMARY_CATALOG_ENABLED!=='true')return null;const value=await env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).readOwnClosureScope();try{return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}};
  const catalog=()=>env.AFW_QA_PRIMARY_CATALOG_ENABLED==='true'?{read:async()=>(await primaryScope())?.registration??null,readOccurrenceApproval:async()=>(await primaryScope())?.approval??null}:legacy();
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
