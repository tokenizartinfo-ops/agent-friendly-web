import {WorkerEntrypoint,WorkflowEntrypoint} from 'cloudflare:workers';
import {createHash} from 'node:crypto';
import {checkOwnCronProvider} from '../../scripts/check-own-cron-provider.mjs';
import {createClosedPublication} from '../../lib/mcp-closed-publication.mjs';
import {createActivationJournal} from '../../lib/mcp-activation-journal.mjs';
import {createActivationObserver} from '../../lib/mcp-activation-observer.mjs';
import {validateReleaseOperatorBundle,resolveNamedActivationPlan,RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
import {runSuccessorRetirementObservation} from '../../lib/mcp-successor-retirement-observation.mjs';
import {reserveReleaseSuccessor} from '../../lib/mcp-release-successor-reservation.mjs';
import {runReleaseIdentityObservation} from '../../lib/mcp-release-identity-observation.mjs';
import {runReleaseCustodyClockObservation} from '../../lib/mcp-release-custody-clock-observation.mjs';

// Build-time inputs, not RPC arguments or public environment metadata.
const bundle=globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;
const closedHttp={fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});}};
export default closedHttp;
// Workflow-local last point only: never an authority decision or a cause.
function namedObservation(policy){
 const stages=['unknown','workflow_admitted','provider_check','operator_admission','named_plan','publication_lookup','activation_journal','activation_observation','artifact_modules','artifact_legacy','activation_metadata','deployment_first','deployment_version','deployment_application','deployment_second','provider_get','activation_observed','journal_complete','successor_retirement','successor_admission','successor_manifest','successor_reader','successor_reservation','successor_custody','successor_custody_returned','successor_custody_value','successor_custody_prototype','successor_custody_keys','successor_custody_fields','successor_custody_future','successor_custody_identity','successor_custody_checked','successor_primary','successor_reserved','workflow_result'];
 const root='https://api.cloudflare.com/client/v4/accounts/'+RELEASE_TARGET.accountId,worker=RELEASE_TARGET.workerName,version=policy.observation.versionId;
 const routes={modules:root+'/workers/workers/'+worker+'/versions/'+version+'?include=modules',legacy:root+'/workers/scripts/'+worker+'/versions/'+version,metadata:root+'/workers/workers/'+worker+'/versions/'+version,deployments:root+'/workers/scripts/'+worker+'/deployments',application:root+'/containers/applications/'+policy.observation.applicationId};
 let value={stage:'workflow_admitted',getIndex:0,httpCode:null,durationMs:null},generation=0,legacy=0,active=0,getCount=0;
 const point=(stage,detail)=>{try{
   generation++;let custodyClock;
   if(stage==='successor_custody_future'){
    const remoteObservedAt=detail?.remoteObservedAt,receivedAt=detail?.receivedAt;
    if([remoteObservedAt,receivedAt].every(n=>Number.isSafeInteger(n)&&n>=0&&n<=8640000000000000)&&remoteObservedAt>receivedAt)custodyClock={remoteObservedAt,receivedAt,deltaMs:remoteObservedAt-receivedAt};
   }
   value={stage:stages.includes(stage)?stage:'unknown',getIndex:value.getIndex,httpCode:null,durationMs:null,...(custodyClock?{custodyClock}:{})};
  }catch{/* Observation cannot change admission. */}};
 return {
  point,
  before(url,init){try{
   const stage=init?.method!=='GET'?'unknown':url===routes.modules?'artifact_modules':url===routes.legacy?(++legacy===1?'artifact_legacy':'deployment_version'):url===routes.metadata?'activation_metadata':url===routes.deployments?(++active===1?'deployment_first':'deployment_second'):url===routes.application?'deployment_application':'provider_get';
   point(stage);if(init?.method==='GET')value.getIndex=++getCount<=7?getCount:null;
   return {generation,started:performance.now()};
  }catch{return null;}},
  after(ticket,response){try{
   if(!ticket||ticket.generation!==generation)return;
   const code=response?.status,elapsed=performance.now()-ticket.started;
   value.httpCode=Number.isSafeInteger(code)&&code>=100&&code<=599?code:null;
   value.durationMs=Number.isFinite(elapsed)&&elapsed>=0&&elapsed<=70000?Math.floor(elapsed):null;
  }catch{/* No response data escapes. */}},
  snapshot(){return {...value};}
 };
}
async function runReleaseOperator(env,args,lease,observation){
  const fail=()=>{throw Error('Release operator unavailable');};
  let timer;
  const controller=new AbortController();
  try{
   observation?.point('operator_admission');
   if(args.length!==1||typeof args[0]!=='string'||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||![undefined,'false','true'].includes(env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED)||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED==='true'&&lease?.reserveSuccessor!==true)fail();
   validateReleaseOperatorBundle(bundle);
   if(args[0]!==createHash('sha256').update(JSON.stringify(bundle)).digest('hex'))fail();
   const {artifact,policy}=bundle;
   let named;const namespace=env.AFW_RELEASE_EVENTS_NODE;
   const check=()=>{const now=Date.now();if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||controller.signal.aborted||now<policy.startAt||now>=policy.expiresAt||lease&&!lease.current())fail();if(named){if(env.AFW_RELEASE_EVENTS_NODE!==namespace)fail();named.current();}return now;};
   const remaining=()=>Math.min(policy.expiresAt-Date.now(),lease?lease.remaining():Infinity);
   check();timer=setTimeout(()=>controller.abort(),remaining());
   if(policy.operation==='confirm_named'){observation?.point('named_plan');named=resolveNamedActivationPlan(bundle,namespace);}
   const db=env.RELEASE_DB;if(!db?.withSession)fail();
   const readCredential=async()=>{check();const value=env[policy.operation==='publish'?'AFW_RELEASE_PUBLISH_TOKEN':'AFW_RELEASE_READ_TOKEN'];if(typeof value!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(value))fail();return value;};
   await readCredential();check();
   // All provider requests remain under the same finite operator window.
   const fetchImpl=async(url,init)=>{check();const ticket=observation?.before(url,init);let result;try{result=await fetch(url,init);}finally{observation?.after(ticket,result);}check();return result;};
   if(policy.operation==='publish'){
    const result=await createClosedPublication({db,artifact,pins:policy.pins,readCredential,fetchImpl,now:lease?check:undefined,timeoutMs:Math.min(60000,remaining())}).publish(controller.signal);
    check();return result;
   }
   // Do not confirm a receipt for a different build or administrative target.
   observation?.point('publication_lookup');
   const row=await db.withSession('first-primary').prepare('SELECT account_id,worker_name,source_revision,source_tree,program_hash,worker_hash FROM dossier_publication_attempts WHERE artifact_key=?').bind(policy.plan.artifactKey).first();check();
   if(!row||row.account_id!==RELEASE_TARGET.accountId||row.worker_name!==RELEASE_TARGET.workerName||row.source_revision!==artifact.sourceRevision||row.source_tree!==artifact.sourceTree||row.program_hash!==artifact.programHash||row.worker_hash!==artifact.workerHash)fail();
   const expectedKey=createHash('sha256').update(JSON.stringify([row.account_id,row.worker_name,row.worker_hash])).digest('hex');if(expectedKey!==policy.plan.artifactKey)fail();
   const reader=createActivationObserver({...policy.observation,readCredential,fetchImpl});
   const observe=async(...args)=>{check();observation?.point('activation_observation');const result=await reader(...args);observation?.point('activation_observed');check();return result;};
   observation?.point('activation_journal');
   const result=await createActivationJournal({db,plan:named?.plan??policy.plan,observe,now:lease?check:undefined,timeoutMs:Math.min(20000,remaining())}).confirm(controller.signal);
   observation?.point('journal_complete');check();
   if(lease?.reserveSuccessor===true){
    observation?.point('successor_retirement');
    const reservation=await reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl,now:check,signal:controller.signal,observation});
    observation?.point('successor_reserved');check();return {...result,reservation};
   }
   return result;
  }catch{fail();}finally{clearTimeout(timer);controller.abort();}
}
export class AfwReleaseOperator extends WorkerEntrypoint {
 run(...args){return runReleaseOperator(this.env,args);}
}

/** Administrative API adapter only. Named confirmation requires its own opt-in.
 * No schedule, HTTP or client event consumer. */
export class AfwReleaseWorkflow extends WorkflowEntrypoint {
 async run(event,step){
  if(this.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED==='true')return runReleaseCustodyClockObservation({env:this.env,event,step});
  if(this.env.AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED==='true')return runReleaseIdentityObservation({env:this.env,event,step});
  if(this.env.AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED==='true')return runSuccessorRetirementObservation({env:this.env,event,step});
  const env=this.env;let policy,expectedHash,observation,providerCheck,reservationFlag,reserveSuccessor=false;
  const outcome=status=>({status,mayRetry:false,operationalReadiness:false,...(status==='uncertain'&&observation?{observation:observation.snapshot()}:{}),...(status==='blocked'&&providerCheck?{providerCheck}:{})});
  try{
   if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true')return outcome('blocked');
   validateReleaseOperatorBundle(bundle);policy=bundle.policy;
   reservationFlag=env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED;
   if(![undefined,'false','true'].includes(reservationFlag))return outcome('blocked');
   reserveSuccessor=reservationFlag==='true';
   if(reserveSuccessor&&policy.operation!=='confirm_named')return outcome('blocked');
   expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
   const rawPayload=event?.payload;
   const payload=typeof rawPayload==='string'&&rawPayload===JSON.stringify({planHash:expectedHash})?{planHash:expectedHash}:rawPayload;
   if(policy.operation!=='publish'&&(policy.operation!=='confirm_named'||env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true')||event?.schedule!==undefined||event?.instanceId!=='afw-release-'+expectedHash||!payload||Object.getPrototypeOf(payload)!==Object.prototype||Reflect.ownKeys(payload).length!==1||!Object.hasOwn(payload,'planHash')||payload.planHash!==expectedHash)return outcome('blocked');
  }catch{return outcome('blocked');}
  const admittedAt=Date.now(),admittedMono=performance.now(),monotonicEnd=admittedMono+(policy.expiresAt-admittedAt);
  let lastWall=admittedAt,lastMono=admittedMono;
  const current=()=>{try{const now=Date.now(),mono=performance.now();if(env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!==reservationFlag||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true'||policy.operation==='confirm_named'&&env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true'||!Number.isSafeInteger(now)||!Number.isFinite(mono)||mono<lastMono||mono>=monotonicEnd||now<lastWall||now<policy.startAt||now>=policy.expiresAt)return false;lastWall=now;lastMono=mono;return true;}catch{return false;}};
  const remaining=()=>Math.max(1,Math.floor(Math.min(policy.expiresAt-Date.now(),monotonicEnd-performance.now())));
  if(!current())return outcome('blocked');
  if(policy.operation==='confirm_named')observation=namedObservation(policy);
  try{
   return await step.do(policy.operation==='publish'?'publish-closed-release':'confirm-named-activation',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:Math.min(70000,remaining())},async()=>{
    if(!current())return outcome('blocked');
    observation?.point('provider_check');
    const gate=await checkOwnCronProvider({fetchImpl:(url,init)=>fetch(url,{...init,redirect:'manual'}),timeoutMs:Math.min(5000,remaining()),dependencyProfile:policy.operation==='publish'?'prebuilt-closed-publication':'all-workers'});
    if(!current())return outcome('blocked');
    if(gate.providerGate!=='resolved'||gate.mayRunClosedVerification!==true){
     const reasons=['invalid_input','invalid_snapshot','active_cron_incident','active_related_incident','request_failed','deadline_exceeded','http_status','unexpected_response_url','unexpected_content_type','body_unavailable','body_read_failed','body_too_large','invalid_utf8','invalid_json'];
     providerCheck={providerGate:['unknown','blocked'].includes(gate.providerGate)?gate.providerGate:'unknown',reason:reasons.includes(gate.reason)?gate.reason:'invalid_snapshot',httpStatus:Number.isSafeInteger(gate.httpStatus)&&gate.httpStatus>=100&&gate.httpStatus<=599?gate.httpStatus:null,receivedBytes:Number.isSafeInteger(gate.receivedBytes)&&gate.receivedBytes>=0&&gate.receivedBytes<=262145?gate.receivedBytes:null};
     return outcome('blocked');
    }
    try{
     const result=await runReleaseOperator(env,[expectedHash],{current,remaining,reserveSuccessor},observation);
     observation?.point('workflow_result');
     if(!current())return outcome('uncertain');
     if(policy.operation==='confirm_named'){
      if(result?.mayLaunch!==false||result.activationKey!==policy.plan.activationKey||result.versionId!==policy.observation.versionId||result.deploymentId!==policy.observation.deploymentId||!Number.isSafeInteger(result.confirmedAt)||result.confirmedAt<policy.startAt||result.confirmedAt>=policy.expiresAt||result.confirmedAt>Date.now())return outcome('uncertain');
      if(reserveSuccessor){const r=result.reservation;if(!r||Object.getPrototypeOf(r)!==Object.prototype||Reflect.ownKeys(r).length!==4||r.purpose!=='afw.successor-reservation.v1'||r.trialId!==policy.plan.trialId||r.state!=='prepared'||r.mayBoot!==false)return outcome('uncertain');}
      return {...outcome('confirmed'),receipt:{activationKey:result.activationKey,versionId:result.versionId,deploymentId:result.deploymentId},...(reserveSuccessor?{reservation:result.reservation}:{})};
     }
     if(result?.mayDeploy!==false||typeof result.artifactKey!=='string'||!/^[a-f0-9]{64}$/.test(result.artifactKey)||typeof result.versionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(result.versionId))return outcome('uncertain');
     return {...outcome('confirmed'),receipt:{artifactKey:result.artifactKey,versionId:result.versionId}};
    }catch{return outcome('uncertain');}
   });
  }catch{return outcome('uncertain');}
 }
}
