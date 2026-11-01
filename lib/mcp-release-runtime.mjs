import {createHash} from 'node:crypto';
import {checkOwnCronProvider} from '../scripts/check-own-cron-provider.mjs';
import {createClosedPublication} from './mcp-closed-publication.mjs';
import {createActivationJournal} from './mcp-activation-journal.mjs';
import {createActivationObserver} from './mcp-activation-observer.mjs';
import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {reserveReleaseSuccessor} from './mcp-release-successor-reservation.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createPrivateQaNamedEligibility} from './mcp-qa-named-eligibility.mjs';

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
export async function runReleaseOperator(bundle,env,args,lease,observation,authorize,cancellationHistory){
  const fail=()=>{throw Error('Release operator unavailable');};
  let timer;
  const controller=new AbortController();
  try{
   observation?.point('operator_admission');
   if(args.length!==1||typeof args[0]!=='string'||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||![undefined,'false','true'].includes(env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED)||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED==='true'&&lease?.reserveSuccessor!==true)fail();
   validateReleaseOperatorBundle(bundle);
   if(authorize!==undefined&&(typeof authorize!=='function'||bundle.policy.operation!=='confirm_named'))fail();
   if(cancellationHistory!==undefined){if(typeof authorize!=='function'||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!=='true'||lease?.reserveSuccessor!==true)fail();validateNamedCancellationHistory(bundle,cancellationHistory);}
   if(args[0]!==createHash('sha256').update(JSON.stringify(bundle)).digest('hex'))fail();
   const {artifact,policy}=bundle;
   let named;const namespace=env.AFW_RELEASE_EVENTS_NODE;
   const check=()=>{const now=Date.now();if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||controller.signal.aborted||now<policy.startAt||now>=policy.expiresAt||lease&&!lease.current())fail();if(named){if(env.AFW_RELEASE_EVENTS_NODE!==namespace)fail();named.current();}return now;};
   const remaining=()=>Math.min(policy.expiresAt-Date.now(),lease?lease.remaining():Infinity);
   check();timer=setTimeout(()=>controller.abort(),remaining());
   if(policy.operation==='confirm_named'){observation?.point('named_plan');named=resolveNamedActivationPlan(bundle,namespace);}
   const db=env.RELEASE_DB;if(!db?.withSession)fail();
   const readCredential=async()=>{check();if(authorize){if(await authorize('operator_credential',controller.signal)!==true)fail();check();}const value=env[policy.operation==='publish'?'AFW_RELEASE_PUBLISH_TOKEN':'AFW_RELEASE_READ_TOKEN'];if(typeof value!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(value))fail();return value;};
   await readCredential();check();
   // All provider requests remain under the same finite operator window.
   const fetchImpl=async(url,init)=>{check();const ticket=observation?.before(url,init);let result;try{result=await fetch(url,init);}finally{observation?.after(ticket,result);}check();return result;};
   if(policy.operation==='publish'){
    const result=await createClosedPublication({db,artifact,pins:policy.pins,readCredential,fetchImpl,now:lease?check:undefined,timeoutMs:Math.min(60000,remaining())}).publish(controller.signal);
    check();return result;
   }
   // Do not confirm a receipt for a different build or administrative target.
   observation?.point('publication_lookup');
   if(authorize){if(await authorize('operator_primary_read',controller.signal)!==true)fail();check();}
   const row=await db.withSession('first-primary').prepare('SELECT account_id,worker_name,source_revision,source_tree,program_hash,worker_hash FROM dossier_publication_attempts WHERE artifact_key=?').bind(policy.plan.artifactKey).first();check();
   if(authorize){if(await authorize('operator_primary_result',controller.signal)!==true)fail();check();}
   if(!row||row.account_id!==RELEASE_TARGET.accountId||row.worker_name!==RELEASE_TARGET.workerName||row.source_revision!==artifact.sourceRevision||row.source_tree!==artifact.sourceTree||row.program_hash!==artifact.programHash||row.worker_hash!==artifact.workerHash)fail();
   const expectedKey=createHash('sha256').update(JSON.stringify([row.account_id,row.worker_name,row.worker_hash])).digest('hex');if(expectedKey!==policy.plan.artifactKey)fail();
   const reader=createActivationObserver({...policy.observation,readCredential,fetchImpl});
   const observe=async(...args)=>{check();observation?.point('activation_observation');const result=await reader(...args);observation?.point('activation_observed');check();return result;};
   observation?.point('activation_journal');
   const result=await createActivationJournal({db,plan:named?.plan??policy.plan,observe,now:lease?check:undefined,timeoutMs:Math.min(20000,remaining()),authorize}).confirm(controller.signal);
   observation?.point('journal_complete');check();
   if(lease?.reserveSuccessor===true){
    observation?.point('successor_retirement');
    const reservation=await reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl,now:check,signal:controller.signal,observation,authorize,cancellationHistory});
    observation?.point('successor_reserved');check();return {...result,reservation};
   }
   return result;
  }catch{fail();}finally{clearTimeout(timer);controller.abort();}
}
export async function runReleaseWorkflow(options){
 const {bundle,env,event,step,authorize,cancellationHistory,requestLease}=options;
 const suppliedLease=Object.hasOwn(options,'requestLease');let leaseCurrent,leaseRemaining;
 let policy,expectedHash,observation,providerCheck,reservationFlag,reserveSuccessor=false;
  const outcome=status=>({status,mayRetry:false,operationalReadiness:false,...(status==='uncertain'&&observation?{observation:observation.snapshot()}:{}),...(status==='blocked'&&providerCheck?{providerCheck}:{})});
  try{
   if(suppliedLease){if(!knownRequestLeases.has(requestLease)||!Object.isFrozen(requestLease))return outcome('blocked');leaseCurrent=requestLease.current;leaseRemaining=requestLease.remaining;if(typeof leaseCurrent!=='function'||typeof leaseRemaining!=='function')return outcome('blocked');}
   if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true')return outcome('blocked');
   validateReleaseOperatorBundle(bundle);policy=bundle.policy;
   if(authorize!==undefined&&(typeof authorize!=='function'||policy.operation!=='confirm_named'))return outcome('blocked');
   reservationFlag=env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED;
   if(![undefined,'false','true'].includes(reservationFlag))return outcome('blocked');
   reserveSuccessor=reservationFlag==='true';
   if(reserveSuccessor&&policy.operation!=='confirm_named')return outcome('blocked');
   if(cancellationHistory!==undefined){if(!reserveSuccessor||typeof authorize!=='function')return outcome('blocked');validateNamedCancellationHistory(bundle,cancellationHistory);}
   expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
   const rawPayload=event?.payload;
   const payload=typeof rawPayload==='string'&&rawPayload===JSON.stringify({planHash:expectedHash})?{planHash:expectedHash}:rawPayload;
   if(policy.operation!=='publish'&&(policy.operation!=='confirm_named'||env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true')||event?.schedule!==undefined||event?.instanceId!=='afw-release-'+expectedHash||!payload||Object.getPrototypeOf(payload)!==Object.prototype||Reflect.ownKeys(payload).length!==1||!Object.hasOwn(payload,'planHash')||payload.planHash!==expectedHash)return outcome('blocked');
  }catch{return outcome('blocked');}
  const admittedAt=Date.now(),admittedMono=performance.now(),monotonicEnd=admittedMono+(policy.expiresAt-admittedAt);
  let lastWall=admittedAt,lastMono=admittedMono;
  const current=()=>{try{const now=Date.now(),mono=performance.now();if(suppliedLease&&(!knownRequestLeases.has(requestLease)||requestLease.current!==leaseCurrent||requestLease.remaining!==leaseRemaining||!leaseCurrent())||env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED!==reservationFlag||env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true'||policy.operation==='confirm_named'&&env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true'||!Number.isSafeInteger(now)||!Number.isFinite(mono)||mono<lastMono||mono>=monotonicEnd||now<lastWall||now<policy.startAt||now>=policy.expiresAt)return false;lastWall=now;lastMono=mono;return true;}catch{return false;}};
  const remaining=()=>Math.max(1,Math.floor(Math.min(policy.expiresAt-Date.now(),monotonicEnd-performance.now(),suppliedLease?leaseRemaining():Infinity)));
  if(!current())return outcome('blocked');
  if(authorize){
   const control=new AbortController(),end=Math.min(monotonicEnd,performance.now()+Math.min(5000,remaining()));let timer;
   try{
    const allowed=await Promise.race([(async()=>{if(!current())return false;return authorize('workflow_admission',control.signal);})(),new Promise((_,reject)=>{timer=setTimeout(()=>{control.abort();reject(Error('Workflow authorization unavailable'));},Math.max(1,Math.floor(end-performance.now())));})]);
    if(allowed!==true||!current()||performance.now()>=end)return outcome('blocked');
   }catch{return outcome('blocked');}finally{clearTimeout(timer);control.abort();}
  }
  if(policy.operation==='confirm_named')observation=namedObservation(policy);
  try{
   const settled=await step.do(policy.operation==='publish'?'publish-closed-release':'confirm-named-activation',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:Math.min(70000,remaining())},async()=>{
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
     const result=await runReleaseOperator(bundle,env,[expectedHash],{current,remaining,reserveSuccessor},observation,authorize,cancellationHistory);
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
   if(suppliedLease&&!current())return outcome('uncertain');
   return settled;
  }catch{return outcome('uncertain');}
}

// Only the fixed same-module adapter can mint a request lease. No DTO is authority.
const knownRequestLeases=new WeakSet();
const nativeDateTime=Date.prototype.getTime;
const knownStages=new Set(['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write']);
const knownFail=()=>{throw Error('Known cancellation confirmation unavailable');};
function knownFields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)knownFail();
 const copy={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))knownFail();copy[key]=d.value;}return copy;
}
const knownTime=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const originalProjection="SELECT a.grant_id,a.process_generation,z.closed_at,a.user_id,a.project_id,a.client_id,a.resource FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.program_hash=? AND a.source_revision=? AND a.image=? LIMIT 2";
const currentProjection="SELECT g.id AS grant_id,g.user_id,g.project_id,g.client_id,g.resource,m.user_id AS monitor_user_id,m.project_id AS monitor_project_id,m.client_id AS monitor_client_id,m.resource AS monitor_resource,m.sequence AS consent_sequence,m.revision AS consent_revision,m.issued_at,m.expires_at FROM delegated_access_grants g LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) WHERE g.id=? LIMIT 2";
// LEFT JOIN and no identity filter: missing/foreign joins remain visible and deny.
const cancellationsProjection="SELECT z.grant_id,z.container_id,z.program_hash,z.source_revision,z.image,z.closed_at,g.revoked_at,g.user_id,g.project_id,g.client_id,g.resource,m.user_id AS monitor_user_id,m.project_id AS monitor_project_id,m.client_id AS monitor_client_id,m.resource AS monitor_resource,m.sequence AS monitor_sequence,m.revision AS monitor_revision,m.issued_at AS monitor_revoked_at FROM dossier_node_process_closures z LEFT JOIN delegated_access_grants g ON g.id=z.grant_id LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) WHERE z.process_generation IS NULL ORDER BY z.grant_id,z.container_id,z.closed_at LIMIT 9";
/** Trusted administrative host only; no HTTP/RPC/OAuth authority is manufactured.
 * Primary data is private. The existing complete reader and atomic INSERT fence
 * remain decisive; late remote work is uncertain, never claimed cancelled. */
export async function runKnownCancellationReleaseWorkflow(options){
 const outcome=status=>({status,mayRetry:false,operationalReadiness:false});
 let requestLease,timer,handedOff=false,valid=true;
 const parent=new AbortController();
 const invalidate=()=>{valid=false;parent.abort();};
 try{
  const {bundle:inputBundle,env,event,step}=knownFields(options,['bundle','env','event','step']);
  const entered=Date.now(),mono=performance.now();
  validateReleaseOperatorBundle(inputBundle);
  const bundle=JSON.parse(JSON.stringify(inputBundle)),policy=bundle.policy;
  if(policy.operation!=='confirm_named')knownFail();
  const flags=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
  if(flags.some(k=>env[k]!=='true'))knownFail();
  const namespace=env.AFW_RELEASE_EVENTS_NODE,db=env.RELEASE_DB,withSession=db?.withSession,ordinaryPrepare=db?.prepare,get=namespace?.get;
  if(typeof withSession!=='function'||typeof ordinaryPrepare!=='function'||typeof get!=='function')knownFail();
  const named=resolveNamedActivationPlan(bundle,namespace),stepDo=step?.do;
  if(typeof stepDo!=='function')knownFail();
  const expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
  const timestamp=event?.timestamp,eventAt=Reflect.apply(nativeDateTime,timestamp,[]),payload=event?.payload,instanceId=event?.instanceId;
  const payloadCurrent=()=>typeof payload==='string'?payload===JSON.stringify({planHash:expectedHash}):knownFields(payload,['planHash']).planHash===expectedHash;
  if(!knownTime(entered)||!Number.isFinite(mono)||mono<0||!knownTime(eventAt)||eventAt>entered||event?.schedule!==undefined||instanceId!=='afw-release-'+expectedHash||!payloadCurrent())knownFail();
  const end=Math.min(policy.expiresAt,eventAt+70000),monoEnd=mono+(end-entered);
  let lastWall=entered,lastMono=mono;
  const current=()=>{
   try{
    const at=Date.now(),m=performance.now();
    if(!valid||parent.signal.aborted||!knownTime(at)||at<lastWall||at<policy.startAt||at>=end||!Number.isFinite(m)||m<lastMono||m>=monoEnd||flags.some(k=>env[k]!=='true')||env.RELEASE_DB!==db||env.AFW_RELEASE_EVENTS_NODE!==namespace||db.withSession!==withSession||db.prepare!==ordinaryPrepare||namespace.get!==get||event.timestamp!==timestamp||Reflect.apply(nativeDateTime,timestamp,[])!==eventAt||event.instanceId!==instanceId||event.payload!==payload||event.schedule!==undefined||!payloadCurrent())knownFail();
    named.current();lastWall=at;lastMono=m;return true;
   }catch{invalidate();return false;}
  };
  const remaining=()=>current()?Math.max(0,Math.floor(Math.min(end-Date.now(),monoEnd-performance.now()))):0;
  const now=()=>{if(!current())knownFail();return lastWall;};
  // Registered before the first await, never exported, removed at settlement.
  requestLease=Object.freeze({current,remaining});knownRequestLeases.add(requestLease);
  if(!current()||remaining()<1)knownFail();
  const binding=name=>bundle.policy.observation.configuration.bindings.find(b=>b.name===name).text;
  const manifest=JSON.parse(binding('AFW_DOSSIER_SUCCESSOR_POLICY')),events=JSON.parse(binding('AFW_DOSSIER_EVENTS_POLICY'));
  const resolved=resolveSuccessorPreparation({scope:manifest.scope,original:manifest.original,candidate:manifest.candidate,namespace});
  const originalKeys=['grant_id','process_generation','closed_at','user_id','project_id','client_id','resource'];
  const currentKeys=['grant_id','user_id','project_id','client_id','resource','monitor_user_id','monitor_project_id','monitor_client_id','monitor_resource','consent_sequence','consent_revision','issued_at','expires_at'];
  const cancellationKeys=['grant_id','container_id','program_hash','source_revision','image','closed_at','revoked_at','user_id','project_id','client_id','resource','monitor_user_id','monitor_project_id','monitor_client_id','monitor_resource','monitor_sequence','monitor_revision','monitor_revoked_at'];
  const identity={user_id:events.subject,project_id:events.projectId,client_id:events.clientId,resource:events.resource};
  const sameIdentity=(row,monitor=false)=>{if(Object.entries(identity).some(([k,v])=>row[k]!==v||monitor&&row['monitor_'+k]!==v))knownFail();};
  async function read(sql,params,keys,limit){
   now();const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')knownFail();
   const statement=Reflect.apply(prepare,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')knownFail();
   const bound=Reflect.apply(bind,statement,params),all=bound?.all;if(typeof all!=='function')knownFail();
   const childEnd=performance.now()+Math.min(5000,remaining());let readTimer;
   try{
    const result=await Promise.race([Reflect.apply(all,bound,[]),new Promise((_,reject)=>{readTimer=setTimeout(()=>{invalidate();reject(Error('Primary projection unavailable'));},Math.max(1,Math.floor(childEnd-performance.now())));})]);
    now();if(performance.now()>=childEnd||session.prepare!==prepare||statement.bind!==bind||bound.all!==all)knownFail();
    const results=Object.getOwnPropertyDescriptor(result??{},'results'),success=Object.getOwnPropertyDescriptor(result??{},'success');
    if(!results||!Object.hasOwn(results,'value')||!success||success.value!==true||!Object.hasOwn(success,'value'))knownFail();
    const rows=results.value;if(!Array.isArray(rows)||rows.length>limit||Reflect.ownKeys(rows).length!==rows.length+1)knownFail();
    const copies=[];for(let i=0;i<rows.length;i++){
     const d=Object.getOwnPropertyDescriptor(rows,String(i));if(!d||!Object.hasOwn(d,'value'))knownFail();
     const row=knownFields(d.value,keys);
     if(Object.values(row).some(v=>!(typeof v==='string'&&v.length<=200||knownTime(v))))knownFail();
     copies.push(row);
    }
    if(new TextEncoder().encode(JSON.stringify(copies)).byteLength>16384)knownFail();return copies;
   }finally{clearTimeout(readTimer);}
  }
  async function snapshot(){
   const o=manifest.original;
   const originals=await read(originalProjection,[o.containerId,o.programHash,o.sourceRevision,'cloudflare/debian-trixie'],originalKeys,2);
   if(originals.length!==1)knownFail();const original=originals[0];sameIdentity(original);
   if(!knownTime(original.closed_at)||original.closed_at>=events.startAt||original.closed_at>now()||typeof original.process_generation!=='string'||!/^[a-f0-9]{64}$/.test(original.process_generation))knownFail();
   const grants=await read(currentProjection,[events.grantId],currentKeys,2);
   if(grants.length!==1)knownFail();const grant=grants[0];sameIdentity(grant,true);
   if(grant.grant_id!==events.grantId||grant.grant_id===original.grant_id||!knownTime(grant.issued_at)||grant.issued_at>now())knownFail();
   const rows=await read(cancellationsProjection,[],cancellationKeys,9);if(rows.length>8)knownFail();
   const cancellations=rows.map(row=>{
    sameIdentity(row,true);if(row.grant_id===original.grant_id||!knownTime(row.closed_at)||row.closed_at>now())knownFail();
    return {grantId:row.grant_id,containerId:row.container_id,programHash:row.program_hash,sourceRevision:row.source_revision,image:row.image,closedAt:row.closed_at,revokedAt:row.revoked_at,monitorSequence:row.monitor_sequence,monitorRevision:row.monitor_revision,monitorRevokedAt:row.monitor_revoked_at};
   });
   const raw=JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:grant.grant_id,consentSequence:grant.consent_sequence,consentRevision:grant.consent_revision,issuedAt:grant.issued_at,expiresAt:grant.expires_at},cancellations});
   validateNamedCancellationHistory(bundle,raw);
   return {bytes:JSON.stringify([originals,grants,rows]),raw,original:{...resolved.original,processGeneration:original.process_generation,closedAt:original.closed_at}};
  }
  const failure=new Promise(resolve=>{parent.signal.addEventListener('abort',()=>resolve(outcome(handedOff?'uncertain':'blocked')),{once:true});timer=setTimeout(invalidate,remaining());});
  const work=async()=>{
   const first=await snapshot(),second=await snapshot();now();if(first.bytes!==second.bytes)knownFail();
   let active=false;
   const authorize=async(stage,signal)=>{
    if(!knownStages.has(stage)||active||!(signal instanceof AbortSignal)||signal.aborted||!current()){invalidate();return false;}
    active=true;let onAbort;
    try{
     onAbort=invalidate;signal.addEventListener('abort',onAbort,{once:true});
     const eligibility=createPrivateQaNamedEligibility({db,original:first.original,candidate:resolved.candidate,window:{grantId:events.grantId,startAt:events.startAt,expiresAt:events.expiresAt},cancellationHistory:first.raw,now,timeoutMs:Math.min(5000,remaining())});
     const allowed=await eligibility.check(AbortSignal.any([signal,parent.signal]));
     if(allowed!==true||signal.aborted||!current()){invalidate();return false;}return true;
    }catch{invalidate();return false;}finally{active=false;if(onAbort)signal.removeEventListener('abort',onAbort);}
   };
   if(await authorize('workflow_admission',parent.signal)!==true||!current())return outcome('blocked');
   handedOff=true;
   const result=await runReleaseWorkflow({bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});
   if(!current())return outcome('uncertain');return result;
  };
  const result=await Promise.race([work(),failure]);
  if(!current())return outcome(handedOff?'uncertain':'blocked');return result;
 }catch{return outcome(handedOff?'uncertain':'blocked');}
 finally{clearTimeout(timer);invalidate();if(requestLease)knownRequestLeases.delete(requestLease);}
}
