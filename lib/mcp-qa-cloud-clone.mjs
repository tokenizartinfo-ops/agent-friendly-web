import {createHash} from 'node:crypto';
import {QA_CLOUD_CLOSED_PINS as P} from './mcp-qa-cloud-closed-pins.mjs';
import {qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
import {createOwnClosedReadbackApi} from './mcp-qa-own-closed-api.mjs';
import {readOwnClosedRuntime} from './mcp-qa-own-closed-readback.mjs';
import {validateQaNativeArtifact} from './mcp-qa-native-artifact.mjs';
import {validateQaNativeObservationResult} from './mcp-qa-native-observation-result.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {assertQaNativeObservationClaim,claimQaNativeObservationOnce,assertQaLifecycleWindow,remainingQaLifecycleWindow,assertQaLifecycleClaim,claimQaLifecycleOnce,isQaGithubBearerTransportValue} from './mcp-qa-cloud-lifecycle-admission.mjs';
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',ORIGIN='https://api.cloudflare.com/client/v4',QA=P.qaClosed.name,BASE=P.qaClosed.id;
const CONFIG=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const fail=()=>{throw Error('Closed QA cloud clone unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
function exact(o,keys){if(!o||Object.getPrototypeOf(o)!==Object.prototype||Reflect.ownKeys(o).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>{const d=Object.getOwnPropertyDescriptor(o,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return[k,d.value];}));}
function closed(v,id,tag){
 const pin=P.qaClosed;
 if(v?.id!==id||v.main_module!==pin.module.name||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.bindings)||v.bindings.length!==pin.bindingCount||new Set(v.bindings.map(b=>b.name)).size!==pin.bindingCount||!Array.isArray(v.urls)||v.urls.length)fail();
 const m=v.modules[0];if(m?.name!==pin.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string')fail();
 const bytes=Buffer.from(m.content_base64,'base64');if(bytes.toString('base64')!==m.content_base64||bytes.length!==pin.module.bytes||createHash('sha256').update(bytes).digest('hex')!==pin.module.sha256||qaClosedConfigurationHash(v)!==pin.configurationHash)fail();
 const flags=v.bindings.filter(b=>b.name?.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));
 if(flags.length!==pin.flagCount||flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail();
 for(const b of v.bindings)if(typeof b.name!=='string'||b.type==='secret_text'&&(Reflect.ownKeys(b).length!==2||Reflect.ownKeys(b).some(k=>!['name','type'].includes(k))))fail();
 if(tag!==undefined&&v.annotations?.['workers/tag']!==tag)fail();return v;
}
/** Fixed immutable historical profile validation only, without a transport capability. */
export function validateQaClosedBaseVersion(value){return closed(value,BASE);}
/** Trusted Node entry point only. Fixed literal-copy operation; no public target, mode or policy. */
export async function runQaClosedCloudClone(options){return runQaCloudOperation(options,false);}
/** Fixed metadata-only native operation; never ARM or owner-data authority. */
export async function runQaNativeMetadataObservation(options){return runQaCloudOperation(options,true);}
async function runQaCloudOperation(options,native){
 const optionKeys=['admission','credential','githubCredential','fetchImpl','now',...(native?['artifact']:[])];
 const o=exact(options,optionKeys),{admission,credential,githubCredential,fetchImpl,now}=o;
 if(typeof credential!=='string'||!/^[A-Za-z0-9_-]{20,512}$/.test(credential)||!isQaGithubBearerTransportValue(githubCredential)||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 if(admission?.purpose!==(native?'afw.qa-native-observation-command.v1':'afw.qa-closed-lifecycle-command.v1'))fail();
 assertQaLifecycleWindow(admission,'cleanup');
 const wrapper=native?validateQaNativeArtifact({artifact:o.artifact,sourceRevision:admission.sourceRevision}):null;
 const claimOnce=native?claimQaNativeObservationOnce:claimQaLifecycleOnce,assertClaim=native?assertQaNativeObservationClaim:assertQaLifecycleClaim;
 let wall=now(),mono=performance.now(),poisoned=false;
 if(!Number.isSafeInteger(wall)||wall<0||!Number.isFinite(mono)||mono<0)fail();
 let stage='admission',candidate=null,activationDeployment=null,restorationDeployment=null,claimAck=false,candidateObserved=false,restorationAcknowledged=false,finalReadback=null,uncertain=false,conflict=false,normal=false,providerChecked=false,otherIncidentCount=0,failureStage=null,cleanupFailureStage=null;
 const posts={upload:0,activate:0,restore:0,...native?{createWorkflow:0,terminateWorkflow:0}:{}},outcomes={upload:'not_sent',activate:'not_sent',restore:'not_sent',...native?{createWorkflow:'not_sent',terminateWorkflow:'not_sent'}:{}},reads={nominal:0,cleanup:0};
 let expectedModules=null,workflowStatus='not_created',nativeResult=null,workflowCreateAcknowledged=false,workflowCleanupFailure=false,subBudget=null;
 const spec=AFW_FIXED_WORKFLOWS[2],workflowPath='/workflows/'+spec.name,instanceId='afw-qa-arm-'+admission.intentId,instancePath=workflowPath+'/instances/'+instanceId;
 const params=JSON.stringify({operation:'inspect_closed_quiescence',observationId:admission.intentId});
 const message=(native?'AFW closed native metadata ':'AFW closed QA clone ')+admission.intentId;
 const check=(phase,margin=0)=>{
  const c=exact(options,optionKeys);if(Object.keys(o).some(k=>c[k]!==o[k])||poisoned)fail();
  let w,m;try{w=now();m=performance.now();}catch{poisoned=true;fail();}
  if(!Number.isSafeInteger(w)||w<wall||!Number.isFinite(m)||m<mono){poisoned=true;fail();}wall=w;mono=m;
  assertQaLifecycleWindow(admission,phase,margin);if(subBudget&&(subBudget.closed||w>=subBudget.wallEnd||m>=subBudget.monoEnd))fail();return w;
 };
 // Each request has its own abort, but all authorization ends at the original N1/R1.
 async function json(phase,method,url,body,publicStatus=false,allowAbsent=false,effectKind=null){
  let timer,reader,httpStatus=null;const abort=new AbortController(),began=check(phase),origin=mono;
  const localBudget=subBudget,duration=Math.min(5000,remainingQaLifecycleWindow(admission,phase),localBudget?Math.min(localBudget.wallEnd-wall,localBudget.monoEnd-mono):Infinity);
  if(duration<1)fail();
  const current=()=>{check(phase);if(abort.signal.aborted||localBudget?.closed||wall-began>=duration||mono-origin>=duration)fail();};
  try{
   const stopped=new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Closed QA request stopped'));},duration);});
   const work=async()=>{
    current();if(method==='GET'&&++reads[phase]>128)fail();
    const headers={Accept:'application/json','Cache-Control':'no-cache'};if(!publicStatus)headers.Authorization='Bearer '+credential;
    if(body!==undefined)headers['Content-Type']='application/json';
    const serialized=body===undefined?undefined:JSON.stringify(body);current();
    const r=await fetchImpl(url,{method,redirect:'error',cache:'no-store',headers,signal:abort.signal,...(serialized===undefined?{}:{body:serialized})});current();
    if(!(r instanceof Response))fail();httpStatus=r.status;const absent=allowAbsent&&r.status===404;if(r.status!==200&&!(effectKind==='createWorkflow'&&r.status===201)&&!absent)fail();
    if(!(r.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    if(!publicStatus){const date=Date.parse(r.headers.get('date')??'');if(!Number.isFinite(date)||Math.abs(wall-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase()))fail();}
    const cap=publicStatus?131072:4194304,length=r.headers.get('content-length');
    if(length!==null&&(!/^\d+$/.test(length)||Number(length)>cap)||!r.body)fail();
    reader=r.body.getReader();let size=0;const chunks=[];
    while(true){current();const b=await reader.read();current();if(b.done)break;if(!(b.value instanceof Uint8Array)||(size+=b.value.length)>cap)fail();chunks.push(b.value);}
    const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();
    if(publicStatus)return e;
    if(absent){if(e?.success!==false||!Array.isArray(e.errors)||!e.errors.length||e.errors.length>8||!Array.isArray(e.messages))fail();return null;}
    if(!e||Object.getPrototypeOf(e)!==Object.prototype||e.success!==true||!Array.isArray(e.errors)||e.errors.length||!Array.isArray(e.messages)||e.messages.length||!Object.hasOwn(e,'result'))fail();
    return e.result;
   };
   const v=await Promise.race([work(),stopped]);current();return v;
  }catch{if(effectKind){const kind=effectKind;outcomes[kind]=httpStatus!==null&&httpStatus>=400&&httpStatus<500?'denied':'unknown';if(outcomes[kind]==='unknown')uncertain=true;}fail();}
  finally{clearTimeout(timer);abort.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 const read=async(phase,path,query)=>{const u=new URL(ORIGIN+ROOT+path);for(const[k,v]of Object.entries(query??{}))u.searchParams.set(k,String(v));return json(phase,'GET',u.href);};
 const active=async(phase,role='qa')=>{
  const pin=role==='qa'?P.qaClosed:P[role];if(!pin||!['qa','canary','operator'].includes(role)||phase==='cleanup'&&role!=='qa')fail();
  const r=await read(phase,'/workers/scripts/'+pin.name+'/deployments',{per_page:1}),d=r?.deployments?.[0];
  if(r?.deployments?.length!==1||!uuid(d.id)||d.strategy!=='percentage'||d.versions?.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();
  return{versionId:d.versions[0].version_id,deploymentId:d.id,message:d.annotations?.['workers/message']??null};
 };
 const post=async(kind,path,body,query)=>{
  const phase=['restore','terminateWorkflow'].includes(kind)?'cleanup':'nominal';check(phase);
  if(!claimAck||posts[kind]!==0)fail();if(phase==='nominal')assertClaim(admission);
  posts[kind]++;outcomes[kind]='sent';const u=new URL(ORIGIN+ROOT+path);for(const[k,v]of Object.entries(query??{}))u.searchParams.set(k,String(v));
  const v=await json(phase,kind==='terminateWorkflow'?'PATCH':'POST',u.href,body,false,false,kind);outcomes[kind]='received';return v;
 };
 async function snapshot(phase){
  check(phase);
  // The existing GET-only allowlist is not broadened by this writer.
  const stop=new AbortController(),remaining=Math.min(120000,remainingQaLifecycleWindow(admission,phase),subBudget?Math.min(subBudget.wallEnd-wall,subBudget.monoEnd-mono):Infinity);
  let c,rejectPhase;
  const expired=new Promise((_,reject)=>{rejectPhase=reject;});
  const phaseTimer=setTimeout(()=>{stop.abort();c?.close();rejectPhase(Error('Closed QA snapshot stopped'));},Math.max(1,Math.floor(remaining)));
  try{
   c=createOwnClosedReadbackApi({credential,now,fetchImpl:async(url,init)=>{check(phase);if(++reads[phase]>128||stop.signal.aborted)fail();return fetchImpl(url,{...init,signal:AbortSignal.any([init.signal,stop.signal])});}});
   const proof=await Promise.race([readOwnClosedRuntime({request:async q=>{check(phase);const v=await c.request(q);check(phase);return v;},now}),expired]);c.assertCurrent();if(proof.purpose!=='afw.own-closed-readback.v1'||proof.status!=='closed'||proof.operationalReadiness!==false||proof.authorizesEffects!==false)fail();check(phase);return proof;
  }finally{c?.close();clearTimeout(phaseTimer);stop.abort();}
 }

 function candidateProfile(v){
  if(!native)return closed(v,candidate,admission.intentId);
  if(v?.id!==candidate||v.main_module!=='index.mjs'||!Array.isArray(v.modules)||v.modules.length!==3||v.annotations?.['workers/tag']!==admission.intentId)fail();
  const names=new Set();
  for(const m of v.modules){const q=exact(m,['name','content_type','content_base64']),e=expectedModules.find(x=>x.name===q.name);if(!e||names.has(q.name)||q.content_type!==e.content_type||q.content_base64!==e.content_base64)fail();names.add(q.name);}
  closed({...v,main_module:P.qaClosed.module.name,modules:[v.modules.find(m=>m.name===P.qaClosed.module.name)]},candidate,admission.intentId);
 }
 function beginBudget(max,reserve,bestEffort){
  check('cleanup');const left=remainingQaLifecycleWindow(admission,'cleanup'),available=left-reserve,duration=Math.min(max,bestEffort?left:available);if(duration<=0)fail();
  subBudget={wallEnd:wall+duration,monoEnd:mono+duration,closed:false};
 }
 function endBudget(){if(subBudget)subBudget.closed=true;subBudget=null;}
 async function budget(max,reserve,fn){beginBudget(max,reserve,false);try{return await fn();}finally{endBudget();}}
 async function definition(phase){
  const d=await read(phase,workflowPath);
  if(d?.id!==spec.id||d.name!==spec.name||d.script_name!==QA||d.class_name!==spec.className||d.script_deleted===true||d.schedules!==undefined&&(!Array.isArray(d.schedules)||d.schedules.length))fail();
 }
 async function ownInstance(phase,absent=false){
  const r=await json(phase,'GET',ORIGIN+ROOT+instancePath,undefined,false,absent);
  if(r===null&&absent)return null;
  if(!r||!['queued','running','waiting','complete','errored','terminated','paused','waitingForPause','rollingBack'].includes(r.status)||typeof r.params!=='string')fail();
  let p;try{p=exact(JSON.parse(r.params),['operation','observationId']);}catch{fail();}
  if(p.operation!=='inspect_closed_quiescence'||p.observationId!==admission.intentId){conflict=true;fail();}
  workflowStatus=r.status;return r;
 }
 async function observeNative(){
  stage='workflow_definition';await definition('nominal');
  stage='workflow_absence';if(await ownInstance('nominal',true)!==null){conflict=true;fail();}
  stage='workflow_create';const ack=await post('createWorkflow',workflowPath+'/instances',{instance_id:instanceId,params});
  if(ack?.id!==instanceId||ack.workflow_id!==spec.id||typeof ack.version_id!=='string'||ack.version_id.length<1||ack.version_id.length>256){uncertain=true;fail();}workflowCreateAcknowledged=true;outcomes.createWorkflow='acknowledged';
  stage='workflow_observation';const began=check('nominal'),origin=mono,duration=Math.min(20000,remainingQaLifecycleWindow(admission,'nominal'));
  subBudget={wallEnd:began+duration,monoEnd:origin+duration,closed:false};
  try{for(let i=0;i<12;i++){
   check('nominal');if(wall-began>=20000||mono-origin>=20000)fail();const r=await ownInstance('nominal');check('nominal');
   if(wall-began>=20000||mono-origin>=20000)fail();
   if(r.status==='complete'){nativeResult=validateQaNativeObservationResult({output:r.output,candidateVersionId:candidate,sourceRevision:admission.sourceRevision,startAt:admission.createdAt,expiresAt:admission.expiresAt});check('nominal');if(nativeResult.status!=='observed')fail();return;}
   if(['errored','terminated'].includes(r.status))fail();
   if(['paused','waitingForPause','rollingBack'].includes(r.status)){conflict=true;fail();}
   if(i<11){const delay=Math.min(1000,subBudget.wallEnd-wall,subBudget.monoEnd-mono,remainingQaLifecycleWindow(admission,'nominal'));if(delay<=0)fail();await new Promise(resolve=>setTimeout(resolve,delay));check('nominal');}
  }fail();}finally{endBudget();}
 }
 async function cleanupWorkflow(){
  stage='workflow_cleanup';await definition('cleanup');const r=await ownInstance('cleanup');
  if(['complete','errored','terminated'].includes(r.status))return;
  if(!['queued','running','waiting'].includes(r.status)){conflict=true;fail();}
  // This read-to-PATCH check is not CAS; never force a pause observed here.
  const ack=await post('terminateWorkflow',instancePath+'/status',{status:'terminate',rollback:false});
  if(!ack||Object.getPrototypeOf(ack)!==Object.prototype||!['queued','running','paused','errored','terminated','complete','waitingForPause','waiting','rollingBack'].includes(ack.status)||typeof ack.timestamp!=='string'||!Number.isFinite(Date.parse(ack.timestamp))){uncertain=true;fail();}outcomes.terminateWorkflow='acknowledged';
  const after=await ownInstance('cleanup');if(!['complete','errored','terminated'].includes(after.status))fail();
 }

 try{
  check('nominal',180000);stage='provider';
  const provider=await json('nominal','GET','https://www.cloudflarestatus.com/api/v2/incidents/unresolved.json',undefined,true);
  if(!provider||Object.getPrototypeOf(provider)!==Object.prototype||!Array.isArray(provider.incidents)||provider.incidents.length>100)fail();
  const relevant=/workers|durable objects|\bd1\b|workflows|containers|cloudflare api/i;
  for(const incident of provider.incidents){
   if(!incident||Object.getPrototypeOf(incident)!==Object.prototype||typeof incident.id!=='string'||typeof incident.name!=='string'||!['investigating','identified','monitoring','resolved','postmortem'].includes(incident.status))fail();
   if(['resolved','postmortem'].includes(incident.status))continue;
   if(relevant.test(incident.name))fail();
   if(!Array.isArray(incident.components)||incident.components.some(c=>!c||typeof c.name!=='string'||relevant.test(c.name)))fail();
   otherIncidentCount++;
  }providerChecked=true;
  stage='preflight';const before=await snapshot('nominal');check('nominal',180000);
  stage='claim';const claim=await claimOnce({admission,credential:githubCredential,fetchImpl});
  check('nominal',180000);if(claim.claimed!==true||claim.intentId!==admission.intentId)fail();claimAck=true;
  stage='baseline';const base=closed(await read('nominal','/workers/workers/'+QA+'/versions/'+BASE,{include:'modules'}),BASE);
  const unchanged=async()=>{for(const role of ['canary','operator','qa']){const a=await active('nominal',role),p=before.deployments[role];if(a.versionId!==p.versionId||a.deploymentId!==p.deploymentId)fail();}};
  await unchanged();check('nominal',180000);
  if(native){const context={purpose:'afw.qa-closed-quiescence-context.v2',id:admission.intentId,sourceRevision:admission.sourceRevision,baselineVersionId:BASE,baselineModuleHash:P.qaClosed.module.sha256,startAt:admission.createdAt,expiresAt:admission.expiresAt};
   expectedModules=[...base.modules,{name:'index.mjs',content_type:'application/javascript+module',content_base64:wrapper.base64},{name:'closed-observation-context-v2.mjs',content_type:'application/javascript+module',content_base64:Buffer.from('export const observation=Object.freeze('+JSON.stringify(context)+');\n').toString('base64')}];}
  const body={...Object.fromEntries(CONFIG.filter(k=>Object.hasOwn(base,k)).map(k=>[k,base[k]])),bindings:base.bindings.map(b=>({name:b.name,type:'inherit',version_id:BASE})),modules:native?expectedModules:base.modules,...native?{main_module:'index.mjs'}:{},annotations:{'workers/tag':admission.intentId,'workers/message':message}};
  stage='upload';const uploaded=await post('upload','/workers/workers/'+QA+'/versions',body,{deploy:false});
  if(!uuid(uploaded?.id)||uploaded.id===BASE){uncertain=true;fail();}candidate=uploaded.id;outcomes.upload='acknowledged';
  stage='inactive_readback';candidateProfile(await read('nominal','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'}));
  const inactive=await active('nominal');if(inactive.versionId===candidate){uncertain=true;fail();}
  if(inactive.versionId!==BASE||inactive.deploymentId!==before.deployments.qa.deploymentId)fail();await unchanged();
  stage='activate';const deployed=await post('activate','/workers/scripts/'+QA+'/deployments',{strategy:'percentage',versions:[{version_id:candidate,percentage:100}],annotations:{'workers/message':message}});
  if(!uuid(deployed?.id)){uncertain=true;fail();}activationDeployment=deployed.id;outcomes.activate='acknowledged';
  stage='candidate_observation';const observed=await active('nominal');
  if(observed.versionId!==candidate||observed.deploymentId!==activationDeployment||observed.message!==message){conflict=true;fail();}
  candidateProfile(await read('nominal','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'}));
  for(const role of ['canary','operator']){const a=await active('nominal',role),p=before.deployments[role];if(a.versionId!==p.versionId||a.deploymentId!==p.deploymentId)fail();}
  check('nominal');candidateObserved=true;
  if(native){await observeNative();check('nominal');}normal=true;
 }catch{failureStage=stage;/* Never propagate provider/credential text. */}
 finally{
  if(native&&posts.createWorkflow&&outcomes.createWorkflow!=='denied'){try{await budget(15000,165000,cleanupWorkflow);}catch{workflowCleanupFailure=true;} }
  if(posts.upload&&claimAck){
   try{
    if(native)beginBudget(40000,125000,true);
    stage='cleanup';check('cleanup');const a=await active('cleanup');
    if(a.versionId!==BASE){
     if(!candidate||a.versionId!==candidate||a.message!==message||activationDeployment&&a.deploymentId!==activationDeployment){conflict=true;fail();}
     const owned=await read('cleanup','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'});
     if(owned?.id!==candidate||owned.annotations?.['workers/tag']!==admission.intentId){conflict=true;fail();}
     // Cleanup depends on ownership and recoverable BASE, never failed nominal eligibility.
     closed(await read('cleanup','/workers/workers/'+QA+'/versions/'+BASE,{include:'modules'}),BASE);
     if(posts.activate===0)uncertain=true;
     const immediatelyBefore=await active('cleanup');
     if(immediatelyBefore.versionId!==a.versionId||immediatelyBefore.deploymentId!==a.deploymentId||immediatelyBefore.message!==message){conflict=true;fail();}
     stage='restore';const restored=await post('restore','/workers/scripts/'+QA+'/deployments',{strategy:'percentage',versions:[{version_id:BASE,percentage:100}],annotations:{'workers/message':'AFW closed QA restoration '+admission.intentId}});
     if(!uuid(restored?.id)){uncertain=true;fail();}restorationDeployment=restored.id;outcomes.restore='acknowledged';
     const closedPointer=await active('cleanup');if(closedPointer.versionId!==BASE||closedPointer.deploymentId!==restorationDeployment)fail();restorationAcknowledged=true;
    }
   }catch{cleanupFailureStage=stage;/* No second restore or force after any uncertain result. */}finally{endBudget();}
   try{if(native)beginBudget(120000,5000,false);stage='final_readback';finalReadback=await snapshot('cleanup');check('cleanup');}catch{finalReadback=null;}finally{endBudget();}
  }
 }
 const verified=normal&&!uncertain&&!conflict&&candidateObserved&&restorationAcknowledged&&finalReadback!==null&&(!native||nativeResult?.status==='observed'&&!workflowCleanupFailure);
 return Object.freeze({purpose:native?'afw.qa-cloud-native-observation.v1':'afw.qa-closed-cloud-clone.v1',status:verified?'verified':uncertain?'uncertain':'blocked',observedAt:new Date(wall).toISOString(),stage:verified?'complete':failureStage??stage,cleanupFailureStage,intentId:admission.intentId,sourceRevision:admission.sourceRevision,artifactBaseVersionId:BASE,artifactModuleHash:P.qaClosed.module.sha256,providerChecked,otherIncidentCount,claimAcknowledged:claimAck,candidateVersionId:candidate,activationDeploymentId:activationDeployment,restorationDeploymentId:restorationDeployment,candidateObserved,restorationAcknowledged,finalClosedVerified:finalReadback!==null,finalReadback,posts:Object.freeze({...posts}),outcomes:Object.freeze({...outcomes}),reads:Object.freeze({...reads}),uncertain,conflict,controlPlaneOnly:!native,nativeExecutionVerified:false,...native?{commentId:admission.commentId,runId:admission.runId,nativeMetadataObservationVerified:verified,workflowInstanceId:posts.createWorkflow?instanceId:null,workflowCreateAcknowledged,workflowStatus,workflowCleanupFailure,nativeResult,armEligibilityVerified:false}:{},authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
}
