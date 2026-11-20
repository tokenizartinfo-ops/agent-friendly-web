import {FINITE_COUPLED_QA_OPERATION,finiteCoupledQaPreparationInstanceId} from './mcp-qa-finite-coupled-restore-observer.mjs';
import {createHash} from 'node:crypto';
import {assertFiniteR2ArchiveCredential,readFiniteR2Archive} from './mcp-qa-finite-r2-object.mjs';
import recoveryArchive from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {createPrivateQaFiniteCoupledRestorer} from './mcp-qa-finite-coupled-restorer.mjs';
import {FINITE_LAUNCHER_OPERATION} from './mcp-qa-finite-launcher.mjs';
import {finitePolicyStepName} from './mcp-qa-finite-policy-origin.mjs';
import {readPrivateQaFiniteSetupCompletion} from './mcp-qa-finite-adoption-source.mjs';
import {validatePrivateQaFiniteSetupCompletion} from './mcp-qa-finite-adoption.mjs';
import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
import {verifyFiniteGhaCustody} from './mcp-qa-finite-custody.mjs';
import process from 'node:process';
import {finiteFields as fields,finiteData as data,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
import {FINITE_ACCOUNT,FINITE_REPOSITORY,FINITE_QA,validateFiniteExternalPlan,validateFiniteObserverOutput,finiteSendKey,finiteSendRecord,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteObserverInstanceId,FINITE_OBSERVER_OPERATION,FINITE_PREVIEW_STEP,validateFiniteMaterialPreview,validateFiniteObserverPreviewEnvelope,validateFiniteNativeObserverHandoff} from './mcp-qa-finite-observer.mjs';
import {AFW_FIXED_WORKFLOWS,readTerminalAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
import {readFiniteLaunchTrialAfwWorkflows} from './mcp-qa-finite-workflow-inventory.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {isQaGithubBearerTransportValue,assertQaFiniteConfirmationAdmission} from './mcp-qa-cloud-lifecycle-admission.mjs';
const CF='https://api.cloudflare.com/client/v4',ROOT='/accounts/'+FINITE_ACCOUNT,GH='https://api.github.com/repos/'+FINITE_REPOSITORY;
const CANARY='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator';
const ORIGINAL_PID='AFW_FINITE_RESTORE_ORIGINAL_PID',RESTORE_STEP='Restore exact QA candidate once under original R1';
let originalAdmissionAttempted=false,originalSendExecution=null;
function restoreStep(metadata){
 const j=metadata.restoreJob,steps=j?.steps?.filter(x=>x.name===RESTORE_STEP);
 if(!Array.isArray(steps)||steps.length!==1)fail();const s=steps[0];
 if(s.status!=='in_progress'||s.conclusion!==null||!Number.isSafeInteger(s.number)||s.number<1||!time(Date.parse(s.started_at)))fail();
 return data({jobId:j.id,number:s.number,name:s.name,startedAt:Date.parse(s.started_at)});
}

const definition=AFW_FIXED_WORKFLOWS.find(x=>x.className==='PrivateQaBootstrap');
const fail=()=>{throw Error('Finite fixed transport unavailable');};
/** Module-private wire, reachable ONLY from named fixed operations below.
 * No provider text/header/token is attached to a thrown error. */
function wire({credential,fetchImpl,now,T0,R1,signal,windowMs=480000}){
 if(!isQaGithubBearerTransportValue(credential)||typeof fetchImpl!=='function'||typeof now!=='function'||!(signal instanceof AbortSignal)||!time(T0)||![180000,480000].includes(windowMs)||R1!==T0+windowMs)fail();
 let wall=now(),mono=performance.now(),origin=mono,reads=0,lastFailure=null;
 const current=()=>{const n=now(),m=performance.now();if(signal.aborted||!time(n)||n<T0||n<wall||n>=R1||!Number.isFinite(m)||m<mono||m>=end)fail();wall=n;mono=m;return n;};
 // The monotonic end is fixed once, never recomputed from a later wall reading.
 const end=origin+R1-wall;
 async function request(url,method,body,{parent=signal,assertCurrent=()=>{},allow404=false,parse404=false,conflict=false,max=4194304}={}){
  let reader,timer,done=false,httpStatus=null;const child=new AbortController(),began=current(),start=performance.now();
  const check=()=>{assertCurrent();current();if(done||parent.aborted||child.signal.aborted||now()-began>=5000||performance.now()-start>=5000||performance.now()>=end)fail();};
  const stop=()=>child.abort();parent.addEventListener('abort',stop,{once:true});
  try{
   const work=async()=>{
    check();if(method==='GET'&&++reads>512)fail();
    const response=await fetchImpl(url,{method,redirect:'error',cache:'no-store',signal:child.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache',...(url.startsWith(GH)?{'X-GitHub-Api-Version':'2022-11-28'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});check();
    if(!(response instanceof Response))fail();httpStatus=response.status;
    if(conflict&&[409,422].includes(httpStatus))return {status:httpStatus,value:null};
    if(![200,201].includes(httpStatus)&&!(allow404&&httpStatus===404)||method==='GET'&&httpStatus!==200&&!(allow404&&httpStatus===404))fail();
    const date=Date.parse(response.headers.get('date')??'');
    if(!time(date)||Math.abs(now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    if(allow404&&httpStatus===404&&!parse404)return {status:404,value:null};
    const limit=httpStatus===404?Math.min(max,2048):max;
    const size=response.headers.get('content-length');if(size!==null&&(!/^\d+$/.test(size)||Number(size)>limit)||!response.body)fail();
    reader=response.body.getReader();const chunks=[];let bytes=0;
    for(;;){check();const r=await reader.read();check();if(r.done)break;if(!(r.value instanceof Uint8Array)||(bytes+=r.value.length)>limit)fail();chunks.push(r.value);}
    const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,bytes)));check();
    if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
    // Data is parsed with bounded bytes; recursive consumers additionally bound
    // fields/depth. Provider error bodies are never read on non-success status.
    return {status:httpStatus,value};
   };
   const stopPromise=new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;child.abort();reject(Error('Finite request stopped'));},Math.max(1,Math.min(5000,R1-began)));});
   return await Promise.race([work(),stopPromise]);
  }catch{lastFailure=Object.freeze({httpStatus:Number.isSafeInteger(httpStatus)?httpStatus:null,reason:'unavailable'});fail();}
  finally{done=true;clearTimeout(timer);parent.removeEventListener('abort',stop);child.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 return {request,current,diagnostic:()=>lastFailure};
}
function cfValue(r){
 const v=r.value;if(v?.success!==true||!Array.isArray(v.errors)||v.errors.length||!Object.hasOwn(v,'result'))fail();
 return {value:v.result,info:v.result_info};
}
function assertMissingWorkflowInstance(response){
 const v=fields(data(response.value),['success','messages','errors','result']);
 if(response.status!==404||v.success!==false||v.result!==null||!Array.isArray(v.messages)||v.messages.length!==0||!Array.isArray(v.errors)||v.errors.length!==1)fail();
 const error=fields(v.errors[0],['code','message']);
 if(error.code!==10400||error.message!=='workflows.api.error.instance.not_found')fail();
}
function decodeOutput(value){if(typeof value!=='string'||Buffer.byteLength(value)>32768)fail();return data(JSON.parse(value));}
function fixedInstance(value){
 if(!value||!['queued','running','waiting','complete'].includes(value.status)||!finiteUuid(value.versionId)||!Array.isArray(value.steps)||value.steps.length>100||value.step_count!==value.steps.length)fail();return value;
}
/** GET-only adoption uses the fixed existing Workflow only. Source is
 * approved technical artifact metadata, never command-supplied scope. */
export function createPrivateQaFiniteObserverHttp({admission,source,credential,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 const a=fields(admission,['intentId','sourceRevision','T0','R1']),s=fields(data(source),['qaLive','custody']);
 if(!hex(a.intentId)||!hex(a.sourceRevision,40)||a.R1!==a.T0+480000)fail();
 const id=finiteObserverInstanceId({intentId:a.intentId,sourceRevision:a.sourceRevision}),input={operation:FINITE_OBSERVER_OPERATION,intentId:a.intentId,sourceRevision:a.sourceRevision};
 if(!isQaGithubBearerTransportValue(githubToken))fail();
 const client=wire({credential,fetchImpl,now,T0:a.T0,R1:a.R1,signal});
 const get=async(path,parent=signal,assertCurrent=()=>{})=>{assertCurrent();const r=cfValue(await client.request(CF+ROOT+path,'GET',undefined,{parent,assertCurrent}));assertCurrent();return r;};
 async function custody(parent=signal,assertCurrent=()=>{}){
  return verifyFiniteGhaCustody({custody:s.custody,request:path=>client.request(CF+path,'GET',undefined,{parent,assertCurrent}),check:()=>{assertCurrent();client.current();if(parent.aborted)fail();},now,R1:a.R1});
 }
 async function provenance(parent=signal,assertCurrent=()=>{}){
  const d=(await get('/workflows/'+definition.name,parent,assertCurrent)).value;
  if(d.id!==definition.id||d.name!==definition.name||d.script_name!==definition.script||d.class_name!==definition.className||d.script_deleted===true)fail();
  const version=(await get('/workers/workers/'+FINITE_QA+'/versions/'+s.qaLive.versionId+'?include=modules',parent,assertCurrent)).value;
  qualifyFiniteWorkerVersion({metadata:version,pin:s.qaLive,role:'qa',closed:false});
 }
 async function read(parent=signal,assertCurrent=()=>{},adoptionParent){
  assertCurrent();const material=await readFiniteMaterialSeed({intentId:a.intentId,sourceRevision:a.sourceRevision,fetchImpl,now,signal:parent});assertCurrent();
  if(material.primaryEvidence.T0!==a.T0||material.seed.qaPublication.qaLive.versionId!==s.qaLive.versionId||material.seed.qaPublication.qaLive.module.sha256!==s.qaLive.module.sha256)fail();
  await custody(parent,assertCurrent);await provenance(parent,assertCurrent);
  const path='/workflows/'+definition.name+'/instances/'+id;
  let response;
  if(adoptionParent){
   response=await client.request(CF+ROOT+path,'GET',undefined,{parent,assertCurrent,allow404:true,parse404:true});assertCurrent();
   if(response.status===404){
    assertMissingWorkflowInstance(response);
    return {status:'not_yet_observed'};
   }
  }
  const r=fixedInstance(response?cfValue(response).value:(await get(path,parent,assertCurrent)).value);
  if(!same(r.params,input)||!time(Date.parse(r.queued))||Date.parse(r.queued)<a.T0||Date.parse(r.queued)>now())fail();
  const workflow=(await get('/workflows/'+definition.name+'/versions/'+r.versionId,parent,assertCurrent)).value;
  if(workflow.id!==r.versionId||workflow.workflow_id!==definition.id||workflow.class_name!==definition.className||workflow.language!=='javascript')fail();
  let setupReceipt;
  if(adoptionParent){
   const canaryModule=material.seed.manifest.modules.canaryLive;
   const completion=await readPrivateQaFiniteSetupCompletion({
    intentId:a.intentId,sourceRevision:a.sourceRevision,parent:adoptionParent,
    expected:{qa:{versionId:s.qaLive.versionId,deploymentId:s.qaLive.deploymentId},seedHash:material.seedHash,
     T0:a.T0,seedCompletedAt:material.primaryEvidence.seedStepCompletedAt,
     canaryModuleHash:canaryModule.module.sha256,canaryPublicStaticHash:canaryModule.publicStatic.configurationHash},
    read:async resource=>(await get(resource,parent,assertCurrent)).value,
   });assertCurrent();
   validatePrivateQaFiniteSetupCompletion(completion,{intentId:a.intentId,sourceRevision:a.sourceRevision,qaVersionId:s.qaLive.versionId,seedHash:material.seedHash,T0:a.T0,now:now()});assertCurrent();
   setupReceipt=completion.receipt;
  }
  const first=r.steps[0];let preview=null,plan=null;
  if(first){
   if(!finitePolicyStepName(first,FINITE_PREVIEW_STEP)||first.type!=='step'||
      r.steps.filter(s=>s.name===FINITE_PREVIEW_STEP||s.name.startsWith(FINITE_PREVIEW_STEP+'-')).length!==1)fail();
   if(adoptionParent&&first.success!==true&&(first.success!==null||first.end!==null||!Array.isArray(first.attempts)||first.attempts.length>1))fail();
   if(first.success===true){
    if(!time(Date.parse(first.start))||!time(Date.parse(first.end))||Date.parse(first.start)<a.T0||Date.parse(first.end)<Date.parse(first.start)||Date.parse(first.end)>now()||!Array.isArray(first.attempts)||first.attempts.length!==1||first.attempts[0].success!==true)fail();
    const envelope=validateFiniteObserverPreviewEnvelope(decodeOutput(first.output),{setupReceiptHash:setupReceipt?.receiptHash,requireSetupReceipt:adoptionParent!==undefined}),native=fields(envelope.provenance,['purpose','instanceId','sourceRevision','runtimeVersionId']);
    if(native.purpose!=='afw.finite-observer-provenance.v1'||native.instanceId!==id||native.sourceRevision!==a.sourceRevision||native.runtimeVersionId!==s.qaLive.versionId)fail();
    preview=validateFiniteMaterialPreview(envelope.material);
    if(envelope.plan!==undefined){
     plan=validateFiniteExternalPlan(envelope.plan);
     if(!same(plan.preview,preview)||!same(plan.deployments.qaLive,s.qaLive)||!same(plan.custody,s.custody)||
        plan.workflows.bootstrap!==id||plan.commandId!==material.seed.commandId||
        plan.finalizer.runId!==material.primaryEvidence.runId||plan.finalizer.jobId!==material.primaryEvidence.jobId)fail();
     if(setupReceipt){
      const target=plan.deployments.canaryLive;
      if(target.versionId!==setupReceipt.versionId||target.deploymentId!==setupReceipt.deploymentId||
         target.module.sha256!==setupReceipt.moduleHash||target.configurationHash!==setupReceipt.restorationHash)fail();
     }
    }
    if(preview.intentId!==a.intentId||preview.sourceRevision!==a.sourceRevision||preview.runtimeVersionId!==s.qaLive.versionId||preview.T0!==a.T0||preview.R1!==a.R1)fail();
   }
  }
  if(r.status==='complete'&&(r.success!==true||!preview||!time(Date.parse(r.end))||Date.parse(r.end)>=a.R1||Date.parse(r.end)>now()))fail();
  if(adoptionParent){
   if(!['queued','running','waiting'].includes(r.status))fail();
   if(preview){if(!['running','waiting'].includes(r.status))fail();return {status:'ready',preview,plan};}
   return {status:'preview_pending'};
  }
  let output=r.status==='complete'?decodeOutput(r.output):null;
  if(output?.purpose==='afw.finite-native-observer-handoff.v1'){
   if(!plan||Date.parse(r.end)>=preview.C0)fail();
   output=validateFiniteNativeObserverHandoff(output,preview);
   const tail=r.steps.at(-1);
   const steps=Array.from({length:6},(_,i)=>'finite-independent-qa-scope-'+i);
   if(tail?.type!=='step'||!steps.some(name=>finitePolicyStepName(tail,name))||tail.success!==true||
      !Array.isArray(tail.attempts)||tail.attempts.length!==1||tail.attempts[0].success!==true)fail();
   const start=Date.parse(tail.start),end=Date.parse(tail.end);
   if(!time(start)||!time(end)||start<preview.T0+85000||end<start||end>Date.parse(r.end)||
      !same(decodeOutput(tail.output),output.scope))fail();
  }
  return data({status:r.status,versionId:r.versionId,preview,output});
 }
 return Object.freeze({
  instanceId:id,input:Object.freeze(input),qualifyCustody:custody,
  read,
  async adopt(originalParent,childSignal,check){originalParent.check();return read(childSignal,check,originalParent);},
  async preview(parent=signal,assertCurrent=()=>{}){
   const r=await read(parent,assertCurrent);if(!['running','waiting'].includes(r.status))fail();
   if(!r.preview)fail();
   const p=validateFiniteMaterialPreview(r.preview);if(p.intentId!==a.intentId||p.sourceRevision!==a.sourceRevision||p.runtimeVersionId!==s.qaLive.versionId||p.T0!==a.T0||p.R1!==a.R1)fail();return p;
  },
  diagnostic:client.diagnostic
 });
}
/** Read exactly the original private Workflow instance after OAuth closure.
 * The final output must agree with the sole successful retained step. */
export function createPrivateQaFiniteCoupledObservationHttp({intent,liveVersionId,credential,fetchImpl=fetch,now=Date.now,signal}={}){
 const scope=fields(data(intent),['intentId','controlHash','sourceRevision','handoffHash','restoreFrom','restoreBefore']);
 const id=finiteCoupledQaPreparationInstanceId(scope),base='/workflows/'+definition.name;
 if(!finiteUuid(liveVersionId)||!hex(scope.handoffHash))fail();
 const client=wire({credential,fetchImpl,now,T0:scope.restoreFrom,R1:scope.restoreBefore,signal,windowMs:180000});
 const expected={operation:FINITE_COUPLED_QA_OPERATION,intentId:scope.intentId,controlHash:scope.controlHash,sourceRevision:scope.sourceRevision};
 const date=value=>{const n=Date.parse(value);if(!time(n)||n<scope.restoreFrom||n>=scope.restoreBefore||n>client.current())fail();return n;};
 return async function readObservation(parent=signal,assertCurrent=()=>{}){
  const get=async(path,max=65536)=>{
   assertCurrent();const result=cfValue(await client.request(CF+ROOT+path,'GET',undefined,{parent,assertCurrent,max}));
   assertCurrent();return result.value;
  };
  const path=CF+ROOT+base+'/instances/'+id;
  assertCurrent();
  const [d,response]=await Promise.all([get(base),client.request(path,'GET',undefined,{parent,assertCurrent,max:131072,allow404:true,parse404:true})]);
  assertCurrent();
  if(d?.id!==definition.id||d.name!==definition.name||d.script_name!==definition.script||d.class_name!==definition.className||
     d.script_deleted===true||d.schedules!==undefined&&(!Array.isArray(d.schedules)||d.schedules.length))fail();
  if(response.status===404){assertMissingWorkflowInstance(response);return {status:'not_yet_observed'};}
  const row=fixedInstance(cfValue(response).value);
  if(!same(row.params,expected))fail();
  const queued=date(row.queued);
  const version=async()=>{
   const v=await get(base+'/versions/'+row.versionId);
   if(v?.id!==row.versionId||v.workflow_id!==definition.id||v.class_name!==definition.className||v.language!=='javascript')fail();
  };
  if(row.status!=='complete'){
   const pendingStep=row.steps[0];
   if(row.end!=null||row.output!=null||row.error!=null||row.success===true||row.step_count>1)fail();
   if(pendingStep&&(pendingStep.type!=='step'||!finitePolicyStepName(pendingStep,'observe-original-qa-restore-preparation')||
      pendingStep.success===false||!Array.isArray(pendingStep.attempts)||pendingStep.attempts.length>1||
      pendingStep.attempts.some(attempt=>attempt.success===false)))fail();
   await version();return {status:'not_yet_observed'};
  }
  if(row.success!==true||row.step_count!==1)fail();
  const ended=date(row.end),step=row.steps[0];
  if(step.type!=='step'||!finitePolicyStepName(step,'observe-original-qa-restore-preparation')||step.success!==true||
     !Array.isArray(step.attempts)||step.attempts.length!==1||step.attempts[0].success!==true)fail();
  const started=date(step.start),stepped=date(step.end);
  if(queued>started||started>stepped||stepped>ended)fail();
  await version();
  const out=fields(decodeOutput(row.output),['purpose','instanceId','runtimeVersionId','sourceRevision','preparation']);
  if(out.purpose!=='afw.finite-coupled-qa-preparation-observed.v1'||out.instanceId!==id||out.runtimeVersionId!==liveVersionId||
     out.sourceRevision!==scope.sourceRevision||!same(out.preparation,decodeOutput(step.output)))fail();
  return out;
 };
}
/** Bound the R2 read to the already preserved archive; bytes never leave the
 * independent executor. Authenticated Worker metadata is checked separately. */
async function qualifyCoupledArchive(fetchImpl,credential,signal,check,now,requiredUntil){
 const {archiveBytes,archiveSha256}=recoveryArchive;
 check();
 const response=await readFiniteR2Archive({credential,fetchImpl,signal,now,requiredUntil});
 check();
 const digest=createHash('sha256'),reader=response.body.getReader();let bytes=0;
 try{
  for(;;){
   check();const part=await reader.read();check();if(part.done)break;
   if(!(part.value instanceof Uint8Array)||(bytes+=part.value.byteLength)>archiveBytes)fail();
   digest.update(part.value);
  }
  if(bytes!==archiveBytes||digest.digest('hex')!==archiveSha256)fail();
  return archiveSha256;
 }finally{void reader.cancel().catch(()=>{});}
}

async function confirmCoupledWorkflowRegistry(read){
 const ids=new Set(),owned=new Set();let expectedCount;
 for(let page=1;page<=4;page++){
  const {value:rows,info}=await read('/workflows',{page,per_page:100});
  if(!Array.isArray(rows)||rows.length>100||info?.page!==page||info.per_page!==100||info.count!==rows.length||
     !Number.isSafeInteger(info.total_count)||info.total_count<0||info.total_count>400||info.cursor)fail();
  expectedCount??=info.total_count;
  if(info.total_count!==expectedCount)fail();
  for(const row of rows){
   if(!finiteUuid(row?.id)||ids.has(row.id)||typeof row.script_name!=='string')fail();
   ids.add(row.id);
   if(![FINITE_QA,OP].includes(row.script_name))continue;
   const spec=AFW_FIXED_WORKFLOWS.find(f=>f.id===row.id&&f.script===row.script_name);
   if(!spec||spec.name!==row.name||spec.className!==row.class_name||row.script_deleted===true||
      row.schedules!==undefined&&(!Array.isArray(row.schedules)||row.schedules.length))fail();
   owned.add(row.id);
  }
  if(ids.size===expectedCount){
   if(owned.size!==AFW_FIXED_WORKFLOWS.length||info.total_pages!==undefined&&info.total_pages!==page)fail();
   return;
  }
  if(ids.size>expectedCount||rows.length!==100)fail();
 }
 fail();
}

/** Independent CF adapter. The job supplies its already qualified durable
 * claim/lookup and exact source pins; this module grants no job admission. */
export function createPrivateQaFiniteCoupledRestoreHttp({intent,qaLive,custody,credential,archiveCredential,claimSend,readSend,fetchImpl=fetch,now=Date.now,signal}={}){
 const scope=fields(data(intent),['intentId','controlHash','sourceRevision','handoffHash','restoreFrom','restoreBefore']);
 const candidate=fields(data(qaLive),['versionId','deploymentId','configurationHash','module']);
 if(!finiteUuid(candidate.versionId)||!finiteUuid(candidate.deploymentId))fail();
 assertFiniteR2ArchiveCredential(archiveCredential,{now,requiredUntil:scope.restoreBefore});
 const readObservation=createPrivateQaFiniteCoupledObservationHttp({intent:scope,liveVersionId:candidate.versionId,credential,fetchImpl,now,signal});
 const client=wire({credential,fetchImpl,now,T0:scope.restoreFrom,R1:scope.restoreBefore,signal,windowMs:180000});
 const closed=[['qaClosed',FINITE_QA,'qa'],['canary',CANARY,'canary'],['operator',OP,'operator']].map(([key,name,role])=>{
  const {id,configurationHash,module}=QA_CLOUD_CLOSED_PINS[key];return {name,role,pin:{versionId:id,configurationHash,module}};
 });
 let observed,verifiedArchive,sent=false;
 const get=async(path,query,parent,check)=>{
  check();const url=new URL(CF+ROOT+path);
  for(const [k,v] of Object.entries(query??{}))url.searchParams.set(k,String(v));
  const result=cfValue(await client.request(url.href,'GET',undefined,{parent,assertCurrent:check}));check();return result;
 };
 const pointer=async(name,parent,check)=>{
  const {value}=await get('/workers/scripts/'+name+'/deployments',{per_page:1},parent,check);
  const rows=value?.deployments,d=rows?.[0];
  if(!Array.isArray(rows)||rows.length!==1||d?.strategy!=='percentage'||!finiteUuid(d.id)||
     !Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100||!finiteUuid(d.versions[0].version_id))fail();
  return {versionId:d.versions[0].version_id,deploymentId:d.id,annotation:d.annotations?.['workers/message']??null};
 };
 const currentCandidate=r=>r.versionId===candidate.versionId&&r.deploymentId===candidate.deploymentId;
 async function readProvider(parent,assertCurrent){
  const check=()=>{assertCurrent();client.current();if(parent.aborted)fail();};
  check();if(!observed)fail();
  const read=(path,query)=>get(path,query,parent,check);
  const custodyProof=await verifyFiniteGhaCustody({custody,request:path=>client.request(CF+path,'GET',undefined,{parent,assertCurrent:check}),check,now,R1:scope.restoreBefore});
  verifiedArchive??=await qualifyCoupledArchive(fetchImpl,archiveCredential,parent,check,now,scope.restoreBefore);check();
  const names=[FINITE_QA,CANARY,OP],pointers=()=>Promise.all(names.map(name=>pointer(name,parent,check)));
  const first=await pointers(),[qa,canary,operator]=first,restored=observed.preparation.restoredCanary;
  if(!currentCandidate(qa)&&qa.versionId!==closed[0].pin.versionId||
     canary.versionId!==restored?.versionId||canary.deploymentId!==restored?.deploymentId||
     operator.versionId!==QA_CLOUD_CLOSED_PINS.operator.id||operator.deploymentId!==QA_CLOUD_CLOSED_PINS.operator.deploymentId)fail();
  await Promise.all([...closed,{name:FINITE_QA,role:'qa',pin:candidate}].map(async({name,role,pin})=>{
   const {value:metadata}=await read('/workers/workers/'+name+'/versions/'+pin.versionId,{include:'modules'});
   qualifyFiniteWorkerVersion({metadata,pin,role,closed:pin!==candidate});
  }));
  const scopes=await Promise.all([
   confirmCoupledWorkflowRegistry(read),
   readTerminalAfwWorkflows({read,assertCurrent:check,includeBootstrap:true}),
   (async()=>{
    const e=(await read('/workers/scripts/'+FINITE_QA+'/subdomain')).value;
    if(e?.enabled!==false||e.previews_enabled!==false)fail();
    const {value:rows,info}=await read('/workers/durable_objects/namespaces',{page:1,per_page:1000});
    if(!Array.isArray(rows)||rows.length>1000||info?.page!==1||info.per_page!==1000||info.count!==rows.length||
       info.total_count!==rows.length||info.total_pages!==undefined&&info.total_pages!==1)fail();
    const expected=new Map([['IndependentClosure','070c4a7708eb4592a3ded7c117a88225'],['PrivateQaPreregistration','6f30104244424152b800bc64d5f4cfac']]);
    const own=rows.filter(r=>r.script===FINITE_QA);
    if(own.length!==2||new Set(own.map(r=>r.class)).size!==2||own.some(r=>r.id!==expected.get(r.class)||r.use_sqlite!==true))fail();
    return hash(own);
   })(),
   (async()=>{
    const {value,info}=await read('/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2',{state:'active',per_page:100});
    if(!Array.isArray(value)||value.length||info?.per_page!==100||
       ['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==0)||
       ['next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||info.has_more===true)fail();
    return true;
   })(),
   ...names.flatMap(name=>['schedules','tails'].map(async part=>{
    const {value}=await read('/workers/scripts/'+name+'/'+part),items=Array.isArray(value)?value:value?.schedules;
    if(!Array.isArray(items)||items.length)fail();return part;
   }))
  ]);
  if(!same(first,await pointers()))fail();check();
  return data({purpose:'afw.finite-coupled-qa-provider.v1',observedAt:now(),archiveSha256:verifiedArchive,custodyUntil:custodyProof.expiresAt,
   providerEvidenceHash:hash({first,scopes:scopes.slice(1),archiveSha256:verifiedArchive,custodyHash:custodyProof.custodyHash}),
   namespacePreserved:true,privateExposure:true,peerVersionsClosed:true,ownWorkflowsTerminal:true,ownContainerEmpty:true,targetQualified:true,...qa});
 }
 return createPrivateQaFiniteCoupledRestorer({intent:scope,now,signal,claimSend,readSend,readProvider,
  async readObservation(parent,check){
   const row=await readObservation(parent,check);
   if(row.status==='not_yet_observed'&&!observed)return row;
   if(observed&&!same(observed,row)||!same(row.preparation?.liveQa,{versionId:candidate.versionId,deploymentId:candidate.deploymentId}))fail();
   observed=row;return row;
  },
  async deployClosed({record,recordHash,body},parent,check){
   const target=QA_CLOUD_CLOSED_PINS.qaClosed.id;
   if(sent||!observed||!verifiedArchive||hash(record)!==recordHash||record.requestHash!==hash(body)||
      !same(body,{strategy:'percentage',versions:[{version_id:target,percentage:100}],annotations:{'workers/message':record.annotation}}))fail();
   sent=true;
   if(!currentCandidate(await pointer(FINITE_QA,parent,check)))fail();
   check();const post=CF+ROOT+'/workers/scripts/'+FINITE_QA+'/deployments';
   const {value}=cfValue(await client.request(post,'POST',body,{parent,assertCurrent:check,max:65536}));
   if(!finiteUuid(value?.id))fail();return {deploymentId:value.id};
  }
 });
}
const COUPLED_WORKFLOW='.github/workflows/afw-finite-coupled-restore.yml';
const CONFIRMATION_WORKFLOW='.github/workflows/afw-finite-finalizer.yml';
const COUPLED_STEP='Restore exact QA after original owner closure';
const COUPLED_REPOSITORY_ID=1347578006,COUPLED_OWNER_ID=290715446;
const usedCoupledOrigins=new WeakSet();
const coupledOwner=v=>v?.id===COUPLED_OWNER_ID&&v.login==='tokenizartinfo-ops'&&v.type==='User';
const coupledRepository=v=>v?.id===COUPLED_REPOSITORY_ID&&v.full_name===FINITE_REPOSITORY;

/** The one writer is the original first-attempt job; the published ref is
 * append-only. Reconciliation can read the exact send after losing the ACK. */
export function createPrivateQaFiniteCoupledGitHub({scope,runId,credential,confirmation,runtime=process.env,fetchImpl=fetch,now=Date.now,signal}={}){
 const lease=fields(data(scope),['intentId','controlHash','handoffHash','sourceRevision','restoreFrom','restoreBefore']);
 const {intentId,controlHash,handoffHash,sourceRevision,restoreFrom,restoreBefore}=lease;
 if([intentId,controlHash,handoffHash].some(x=>!hex(x))||!hex(sourceRevision,40)||
    !Number.isSafeInteger(runId)||runId<1||!runtime||typeof runtime!=='object')fail();
 const confirm=confirmation===undefined?null:fields(data(confirmation),['commentId','admitJobId','T0']);
 if(confirm&&(typeof confirm.commentId!=='string'||!/^[1-9][0-9]{0,19}$/.test(confirm.commentId)||
     !Number.isSafeInteger(confirm.admitJobId)||confirm.admitJobId<1||!time(confirm.T0)||restoreFrom<=confirm.T0+510000))fail();
 const workflow=confirm?CONFIRMATION_WORKFLOW:COUPLED_WORKFLOW,event=confirm?'issue_comment':'workflow_dispatch';
 const key=hash({purpose:'afw.finite-coupled-qa-restore-key.v1',intentId,controlHash,handoffHash});
 const client=wire({credential,fetchImpl,now,T0:restoreFrom,R1:restoreBefore,signal,windowMs:180000});
 const localBranch='refs/heads/main',refPath='tags/afw-finite-coupled-qa-send/'+key,ref='refs/'+refPath,tagName='afw-finite-coupled-qa-send-'+key;
 const pid=process.pid;
 const mustMatch={
  GITHUB_EVENT_NAME:event,GITHUB_REPOSITORY:FINITE_REPOSITORY,GITHUB_REPOSITORY_ID:String(COUPLED_REPOSITORY_ID),
  GITHUB_REF:localBranch,GITHUB_SHA:sourceRevision,GITHUB_RUN_ID:String(runId),GITHUB_RUN_ATTEMPT:'1',
  GITHUB_WORKFLOW_REF:FINITE_REPOSITORY+'/'+workflow+'@'+localBranch,
  GITHUB_ACTOR:'tokenizartinfo-ops',GITHUB_ACTOR_ID:String(COUPLED_OWNER_ID),GITHUB_JOB:'restore',
  GITHUB_ACTION:'coupled_restore_once',AFW_COUPLED_RESTORE_ORIGINAL_PID:String(pid)
 };
 const original=()=>process.pid===pid&&Object.entries(mustMatch).every(([k,v])=>runtime[k]===v);
 const date=value=>{const at=Date.parse(value);if(!time(at)||at<(confirm?.T0??restoreFrom)||at>=restoreBefore||at>client.current())fail();return at;};
 const get=(path,opts)=>client.request(GH+path,'GET',undefined,opts);
 async function inspect(parent,assertCurrent){
  const opts={parent,assertCurrent,max:262144};
  const [main,run,jobs,comment]=(await Promise.all([get('/git/ref/heads/main',opts),
   get('/actions/runs/'+runId,opts),get('/actions/runs/'+runId+'/attempts/1/jobs?per_page=100',opts),
   ...(confirm?[get('/issues/comments/'+confirm.commentId,opts)]:[])])).map(x=>x.value);
  if(main?.ref!==localBranch||main.object?.type!=='commit'||main.object.sha!==sourceRevision||
     run?.id!==runId||run.run_attempt!==1||run.event!==event||run.head_sha!==sourceRevision||run.head_branch!=='main'||
     run.path!==workflow||run.status!=='in_progress'||!coupledOwner(run.actor)||!coupledOwner(run.triggering_actor)||
     !coupledRepository(run.repository)||!coupledRepository(run.head_repository))fail();
  const started=date(run.created_at);
  const names=confirm?['admission','admit','restore']:['restore'];
  if(jobs?.total_count!==names.length||!Array.isArray(jobs.jobs)||jobs.jobs.length!==names.length||
     names.some(name=>jobs.jobs.filter(job=>job.name===name).length!==1)||
     jobs.jobs.some(job=>job.run_id!==runId||job.head_sha!==sourceRevision))fail();
  const j=jobs.jobs.find(job=>job.name==='restore');
  if(j?.name!=='restore'||j.status!=='in_progress'||j.run_id!==runId||j.head_sha!==sourceRevision||!Number.isSafeInteger(j.id)||j.id<1||
     !Array.isArray(j.steps)||j.steps.length>100||date(j.started_at)<started)fail();
  const matches=j.steps.filter(step=>step.name===COUPLED_STEP),s=matches[0];
  if(matches.length!==1||s.status!=='in_progress'||s.conclusion!==null||!Number.isSafeInteger(s.number)||s.number<1||date(s.started_at)<date(j.started_at))fail();
  let observedAt=null;
  if(confirm){
   if(comment?.id!==Number(confirm.commentId)||!coupledOwner(comment.user)||comment.author_association!=='OWNER'||
      comment.issue_url!==GH+'/issues/497'||comment.body!=='/afw-qa-finite-confirmation v1 '+sourceRevision||
      date(comment.created_at)!==confirm.T0)fail();
   const admit=jobs.jobs.find(job=>job.name==='admit'),admission=jobs.jobs.find(job=>job.name==='admission');
   const observed=admit.steps?.filter(step=>step.name==='Wait for exact observer terminal output');
   if(admit.id!==confirm.admitJobId||admit.status!=='completed'||admit.conclusion!=='success'||
      admission.status!=='completed'||admission.conclusion!=='success'||observed?.length!==1||
      observed[0].status!=='completed'||observed[0].conclusion!=='success')fail();
   observedAt=date(observed[0].completed_at);
   if(observedAt>=confirm.T0+480000||observedAt>date(j.started_at))fail();
  }
  return {jobId:j.id,stepNumber:s.number,startedAt:s.started_at,observedAt};
 }
 function qualifyRecord(raw){
  const r=fields(data(raw),['purpose','key','intentId','controlHash','handoffHash','sourceRevision','ownerReceiptHash','preparationHash','liveQa','closedQa',
   'archiveSha256','issuedAt','restoreBefore','annotation','requestHash']);
  const live=fields(r.liveQa,['versionId','deploymentId']),target=QA_CLOUD_CLOSED_PINS.qaClosed,annotation='afw-coupled-qa-restore-'+key;
  if(r.purpose!=='afw.finite-coupled-qa-send.v1'||r.key!==key||r.intentId!==intentId||r.controlHash!==controlHash||r.handoffHash!==handoffHash||
     r.sourceRevision!==sourceRevision||r.restoreBefore!==restoreBefore||r.annotation!==annotation||
     !hex(r.ownerReceiptHash)||!hex(r.preparationHash)||!time(r.issuedAt)||r.issuedAt<restoreFrom||r.issuedAt>client.current()||
     !finiteUuid(live.versionId)||!finiteUuid(live.deploymentId)||live.versionId===target.id||
     !same(r.closedQa,{versionId:target.id,configurationHash:target.configurationHash,module:target.module})||
     r.archiveSha256!==recoveryArchive.archiveSha256||
     r.requestHash!==hash({strategy:'percentage',versions:[{version_id:target.id,percentage:100}],annotations:{'workers/message':annotation}}))fail();
  return r;
 }
 let attempted=false;
 return Object.freeze({
  async claimSend(value,parent,assertCurrent){
   if(attempted)return 'existing';attempted=true;
   const write=original()&&!usedCoupledOrigins.has(runtime);
   if(write)usedCoupledOrigins.add(runtime);
   try{
    const record=qualifyRecord(value);
    const readOpts={parent,assertCurrent,max:32768};
    const prior=await get('/git/ref/'+refPath,{...readOpts,allow404:true});
    if(prior.status===200)return 'existing';
    if(!write||prior.status!==404)return 'uncertain';
    const check=()=>{assertCurrent();client.current();if(!original())fail();};
    const step=await inspect(parent,check);check();
    const body={tag:tagName,message:JSON.stringify(record),object:sourceRevision,type:'commit'};
    const opts={parent,assertCurrent:check,conflict:true,max:32768};
    const tag=(await client.request(GH+'/git/tags','POST',body,opts)).value;check();
    if(!hex(tag?.sha,40)||tag.tag!==tagName||tag.object?.type!=='commit'||tag.object.sha!==sourceRevision||tag.message!==body.message)fail();
    if(!same(await inspect(parent,check),step))fail();check();
    const made=await client.request(GH+'/git/refs','POST',{ref,sha:tag.sha},opts);check();
    if([409,422].includes(made.status))return 'existing';
    if(made.status!==201||made.value?.ref!==ref||made.value.object?.type!=='tag'||made.value.object.sha!==tag.sha)fail();
    return 'issued';
   }catch{return 'uncertain';}
  },
  async readSend(requested,parent,assertCurrent){
   if(requested!==key)fail();
   const opts={parent,assertCurrent,max:32768};
   const r=(await get('/git/ref/'+refPath,opts)).value;
   if(r?.ref!==ref||r.object?.type!=='tag'||!hex(r.object.sha,40))fail();
   const tag=(await get('/git/tags/'+r.object.sha,opts)).value;
   if(tag?.sha!==r.object.sha||tag.tag!==tagName||tag.object?.sha!==sourceRevision||tag.object?.type!=='commit'||
      typeof tag.message!=='string'||Buffer.byteLength(tag.message)>16384)fail();
   return qualifyRecord(JSON.parse(tag.message));
  }
 });
}
/** GitHub primary metadata plus append-only tag/ref fences; never update/delete.
 * A tag object without a NEW acknowledged unique ref is not authority. */
export function createPrivateQaFiniteGithub({plan,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 const p=validateFiniteExternalPlan(plan),v=p.preview,client=wire({credential:githubToken,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 let claimStarted=false,acknowledgedSend=null,sendConsumed=false;
 const get=async path=>(await client.request(GH+path,'GET')).value;
 async function inspect(phase,parent=signal,assertCurrent=()=>{}){
  const get=async path=>{assertCurrent();const r=(await client.request(GH+path,'GET',undefined,{parent,assertCurrent})).value;assertCurrent();return r;};
  assertCurrent();client.current();if(!['ready','restore'].includes(phase))fail();
  const comment=await get('/issues/comments/'+p.commandId),main=await get('/git/ref/heads/main');
  if(comment.id!==Number(p.commandId)||comment.body!=='/afw-qa-finite-confirmation v1 '+v.sourceRevision||Date.parse(comment.created_at)!==v.T0||comment.user?.id!==290715446||comment.user.login!=='tokenizartinfo-ops'||comment.user.type!=='User'||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||main.object?.sha!==v.sourceRevision)fail();
  const run=await get('/actions/runs/'+p.finalizer.runId),jobs=await get('/actions/runs/'+p.finalizer.runId+'/attempts/1/jobs?per_page=100');
  if(run.id!==p.finalizer.runId||run.run_attempt!==1||run.head_sha!==v.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!=='.github/workflows/afw-finite-finalizer.yml'||run.repository?.full_name!==FINITE_REPOSITORY||run.actor?.id!==290715446||run.actor.login!=='tokenizartinfo-ops'||run.status!=='in_progress'||jobs.total_count!==jobs.jobs?.length||jobs.jobs.length>100)fail();
  const admits=jobs.jobs.filter(x=>x.id===p.finalizer.jobId&&x.name==='admit'),restores=jobs.jobs.filter(x=>x.name==='restore');
  if(admits.length!==1)fail();const job=admits[0],steps=job.steps.filter(x=>x.name==='admit-and-ready');
  if(steps.length!==1||steps[0].status!=='completed'||steps[0].conclusion!=='success'||Date.parse(job.started_at)<v.T0||Date.parse(steps[0].started_at)<Date.parse(job.started_at)||Date.parse(steps[0].completed_at)>now())fail();
  if(phase==='ready'&&job.status!=='in_progress'||phase==='restore'&&(job.status!=='completed'||job.conclusion!=='success'||restores.length!==1||restores[0].status!=='in_progress'||restores[0].run_id!==p.finalizer.runId||restores[0].head_sha!==v.sourceRevision))fail();
  return data({runId:run.id,jobId:job.id,restoreJobId:phase==='restore'?restores[0].id:null,restoreJob:phase==='restore'?restores[0]:null,job,observedAt:client.current(),evidenceHash:hash({run,jobs})});
 }
 /** Only the once-launched trusted restore process may initialize this cap.
  * PID is coherence, never durable identity; recovery does not regenerate it. */
 async function admitOriginalExecution({admission,output}={}){
  if(originalAdmissionAttempted)return false;originalAdmissionAttempted=true;
  try{
   assertQaFiniteConfirmationAdmission(admission,'cleanup');
   const pid=process.pid,marker=process.env[ORIGINAL_PID],expected={GITHUB_JOB:'restore',GITHUB_ACTION:'finite_restore_once',GITHUB_RUN_ID:String(p.finalizer.runId),GITHUB_RUN_ATTEMPT:'1',GITHUB_SHA:v.sourceRevision};
   const current=()=>{
    assertQaFiniteConfirmationAdmission(admission,'cleanup');client.current();
    if(signal.aborted||process.pid!==pid||marker!==String(pid)||process.env[ORIGINAL_PID]!==marker||Object.entries(expected).some(([k,value])=>process.env[k]!==value)||admission.intentId!==v.intentId||admission.sourceRevision!==v.sourceRevision||admission.createdAt!==v.T0||Number(admission.runId)!==p.finalizer.runId)fail();
   };
   current();const result=validateFiniteObserverOutput(output,p),metadata=await inspect('restore',signal,current);current();
   const step=restoreStep(metadata);if(step.startedAt<v.T0||step.startedAt>now())fail();
   originalSendExecution={consumed:false,current,planHash:hash(p),step,expected:at=>finiteSendRecord({plan:p,output:result,restoreJobId:step.jobId,issuedAt:at})};
   return true;
  }catch{return false;}
 }
 async function claimSend(record,parent,assertCurrent){
  if(claimStarted)return 'existing';claimStarted=true;
  // Shared across all clients. Consume BEFORE any awaited operation or mutation;
  // uncertainty never restores this original-process eligibility.
  let origin=originalSendExecution;
  if(origin?.consumed)origin=null;else if(origin)origin.consumed=true;
  const r=data(record),key=finiteSendKey(p),ref='refs/tags/afw-finite-qa-send/'+key;
  if(r.key!==key||r.intentId!==v.intentId||r.controlHash!==v.controlHash||r.kind!=='qa_restore'||r.sourceRevision!==v.sourceRevision||r.runId!==p.finalizer.runId||r.attempt!==1||r.R1!==v.R1||!same(r.candidate,p.deployments.qaLive)||!same(r.target,p.deployments.qaClosed))fail();
  const check=()=>{assertCurrent();client.current();if(origin){origin.current();if(origin.planHash!==hash(p)||!same(origin.expected(r.issuedAt),r))fail();}};
  const opts={parent,assertCurrent:check,conflict:true,max:32768};
  try{
   check();const metadata=await inspect('restore',parent,check);check();if(metadata.restoreJobId!==r.jobId)fail();
   const existing=await client.request(GH+'/git/ref/tags/afw-finite-qa-send/'+key,'GET',undefined,{parent,assertCurrent:check,allow404:true});check();
   if(existing.status===200)return 'existing';
   // 404 is not proof that no prior uncertain POST is still pending.
   if(!origin)return 'uncertain';
   if(!same(restoreStep(metadata),origin.step))fail();
   const tag=(await client.request(GH+'/git/tags','POST',{tag:'afw-finite-qa-send-'+key,message:JSON.stringify(r),object:v.sourceRevision,type:'commit'},opts)).value;
   if(!hex(tag?.sha,40)||tag.object?.sha!==v.sourceRevision||tag.object?.type!=='commit'||tag.message!==JSON.stringify(r))fail();
   check();const beforeRef=await inspect('restore',parent,check);check();if(!same(restoreStep(beforeRef),origin.step))fail();
   const created=await client.request(GH+'/git/refs','POST',{ref,sha:tag.sha},opts);check();
   if(created.status!==201)return 'existing';
   if(created.value?.ref!==ref||created.value.object?.type!=='tag'||created.value.object?.sha!==tag.sha)fail();
   acknowledgedSend={record:r,origin};return 'issued';
  }catch{return 'uncertain';}
 }
 async function readSend(parent=signal,assertCurrent=()=>{}){
  const get=async path=>{assertCurrent();const r=(await client.request(GH+path,'GET',undefined,{parent,assertCurrent})).value;assertCurrent();return r;};
  const key=finiteSendKey(p),ref=await get('/git/ref/tags/afw-finite-qa-send/'+key);
  if(ref.ref!=='refs/tags/afw-finite-qa-send/'+key||ref.object?.type!=='tag'||!hex(ref.object.sha,40))fail();
  const tag=await get('/git/tags/'+ref.object.sha);
  if(tag.object?.type!=='commit'||tag.object.sha!==v.sourceRevision||typeof tag.message!=='string'||Buffer.byteLength(tag.message)>32768)fail();
  const record=data(JSON.parse(tag.message));if(record.key!==key||record.controlHash!==v.controlHash||record.kind!=='qa_restore')fail();return record;
 }
 async function admissionReceipt(write){
  const key=v.intentId+'/'+v.controlHash,ref='refs/tags/afw-finite-ready/'+key;
  if(write){
   const a=write.admission,assertCurrent=()=>{assertQaFiniteConfirmationAdmission(a);client.current();if(a.intentId!==v.intentId||a.sourceRevision!==v.sourceRevision||a.createdAt!==v.T0)fail();};assertCurrent();
   const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential:write.credential,githubToken,fetchImpl,now,signal});
   const preview=await observer.preview(signal,assertCurrent),custody=await observer.qualifyCustody(signal,assertCurrent);assertCurrent();
   if(!same(preview,v)||v.N1-now()<180000)fail();
   const body={commandId:p.commandId,controlPlanHash:v.planHash,R1:v.R1,resourceHash:v.resourceHash,custodyHash:custody.custodyHash,validatedAt:now()};
   const tag=(await client.request(GH+'/git/tags','POST',{tag:'afw-finite-ready-'+v.intentId,message:JSON.stringify(body),object:v.sourceRevision,type:'commit'},{parent:signal,assertCurrent})).value;assertCurrent();
   if(!hex(tag?.sha,40)||tag.message!==JSON.stringify(body)||tag.object?.sha!==v.sourceRevision)fail();
   const made=await client.request(GH+'/git/refs','POST',{ref,sha:tag.sha},{conflict:true,parent:signal,assertCurrent});assertCurrent();
   if(made.status!==201||made.value?.ref!==ref||made.value.object?.sha!==tag.sha)fail();return body;
  }
  const reference=await get('/git/ref/tags/afw-finite-ready/'+key);
  if(reference.ref!==ref||reference.object?.type!=='tag'||!hex(reference.object.sha,40))fail();
  const tag=await get('/git/tags/'+reference.object.sha);
  if(tag.object?.type!=='commit'||tag.object.sha!==v.sourceRevision||typeof tag.message!=='string'||tag.message.length>4096)fail();
  const body=fields(JSON.parse(tag.message),['commandId','controlPlanHash','R1','resourceHash','custodyHash','validatedAt']);
  if(body.commandId!==p.commandId||body.controlPlanHash!==v.planHash||body.R1!==v.R1||body.resourceHash!==v.resourceHash||!hex(body.custodyHash)||!time(body.validatedAt)||body.validatedAt<v.T0||body.validatedAt>=v.N1)fail();return body;
 }
 return Object.freeze({
  inspect,claimSend,readSend,admitOriginalExecution,
  consumeNewSend(record){if(sendConsumed||!acknowledgedSend||!same(record,acknowledgedSend.record))fail();acknowledgedSend.origin.current();sendConsumed=true;},
  assertSendExecution(record){if(!sendConsumed||!acknowledgedSend||!same(record,acknowledgedSend.record))fail();acknowledgedSend.origin.current();},
  persistAdmission:(credential,admission)=>admissionReceipt({credential,admission}),
  async readReady(){
   const g=await inspect('ready'),a=await admissionReceipt(),j=g.job,step=j.steps.find(x=>x.name==='admit-and-ready');
   if(a.validatedAt<Date.parse(step.started_at)||a.validatedAt>Date.parse(step.completed_at))fail();
   return data({purpose:'afw.qa-finite-finalizer-ready.v1',intentId:v.intentId,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId,actorId:v.actorId,planHash:v.planHash,observedAt:client.current(),repository:FINITE_REPOSITORY,runId:p.finalizer.runId,attempt:1,workflow:'afw-finite-finalizer',status:'in_progress',job:{id:p.finalizer.jobId,status:'in_progress',startedAt:Date.parse(j.started_at),steps:[{name:'admit-and-ready',status:'completed',conclusion:'success',startedAt:Date.parse(step.started_at),completedAt:Date.parse(step.completed_at)}]},admission:a,evidenceHash:g.evidenceHash});
  },
  diagnostic:client.diagnostic
 });
}


const launcherOrigins=new WeakSet();
/** Only the original admitted Actions step may issue the fixed private
 * launcher. The unique acknowledged GitHub reference precedes Cloudflare. */
export async function issuePrivateQaFiniteLauncher({plan,admission,runtime=process.env,credential,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 let issued=false;
 const outcome=status=>Object.freeze({status,mayRetry:false,authorizesEffects:false,operationalReadiness:false});
 try{
  const p=validateFiniteExternalPlan(plan),v=p.preview,original=process.pid;
  const expected={GITHUB_EVENT_NAME:'issue_comment',GITHUB_REPOSITORY:FINITE_REPOSITORY,GITHUB_REPOSITORY_ID:'1347578006',
   GITHUB_REF:'refs/heads/main',GITHUB_SHA:v.sourceRevision,GITHUB_RUN_ID:String(p.finalizer.runId),GITHUB_RUN_ATTEMPT:'1',
   GITHUB_ACTOR:'tokenizartinfo-ops',GITHUB_JOB:'admit',GITHUB_ACTION:'finite_nominal_launch_once',AFW_FINITE_LAUNCH_ORIGINAL_PID:String(original)};
  if(!runtime||typeof runtime!=='object'||launcherOrigins.has(runtime))fail();
  const gh=wire({credential:githubToken,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
  const cf=wire({credential,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
  const github=createPrivateQaFiniteGithub({plan:p,githubToken,fetchImpl,now,signal});
  const entered=now(),mono=performance.now(),deadline=Math.min(entered+20000,p.launchPolicy.armAckBy);
  const check=()=>{
   const at=gh.current();cf.current();assertQaFiniteConfirmationAdmission(admission,'nominal');
   if(at>=deadline||performance.now()-mono>=deadline-entered||process.pid!==original||
      Object.entries(expected).some(([k,val])=>runtime[k]!==val)||
      admission.intentId!==v.intentId||admission.sourceRevision!==v.sourceRevision||admission.createdAt!==v.T0||
      admission.runId!==String(p.finalizer.runId)||admission.commentId!==p.commandId)fail();
   return at;
  };
  check();launcherOrigins.add(runtime);
  const options={parent:signal,assertCurrent:check,max:32768},readCF=path=>cf.request(CF+path,'GET',undefined,options);
  const readOriginalStep=async()=>{
   const value=(await gh.request(GH+'/actions/runs/'+p.finalizer.runId+'/attempts/1/jobs?per_page=100','GET',undefined,{...options,max:262144})).value;
   if(!Array.isArray(value?.jobs)||value.total_count!==value.jobs.length||value.jobs.length>100)fail();
   const list=value.jobs.filter(j=>j.id===p.finalizer.jobId&&j.name==='admit'&&j.status==='in_progress'&&j.run_id===p.finalizer.runId&&j.head_sha===v.sourceRevision);
   if(list.length!==1||!Array.isArray(list[0].steps))fail();
   const steps=list[0].steps.filter(s=>s.name==='Create the exact AFW nominal launcher once'),s=steps[0],at=Date.parse(s?.started_at);
   if(steps.length!==1||s.status!=='in_progress'||s.conclusion!==null||!Number.isSafeInteger(s.number)||s.number<1||
      !time(at)||at<v.T0||at>check()||at>=p.launchPolicy.armAckBy)fail();
   return {step:s.number,startedAt:at};
  };
  const qualify=async()=>{
   check();
   const [ready,step,_,workflow]=await Promise.all([
    github.readReady(),readOriginalStep(),
    verifyFiniteGhaCustody({custody:p.custody,request:readCF,check,now,R1:v.R1}),
    readCF(ROOT+'/workflows/'+definition.name).then(cfValue)
   ]);
   const d=workflow.value,first=ready.job.steps[0];
   if(first.completedAt>step.startedAt||first.completedAt>=p.launchPolicy.armAckBy||
      ready.admission.custodyHash!==hash({id:p.custody.id,expiresAt:p.custody.expiresAt,policyHash:p.custody.policyHash})||
      d?.id!==definition.id||d.name!==definition.name||d.script_name!==definition.script||d.class_name!==definition.className||
      d.script_deleted===true||d.schedules!==undefined&&(!Array.isArray(d.schedules)||d.schedules.length))fail();
   check();return {step,admission:ready.admission};
  };
  const originalReady=await qualify();
  const suffix='tags/afw-finite-launcher-issued/'+v.intentId+'/'+v.controlHash,ref='refs/'+suffix;
  issued=true;check();
  const claim=await gh.request(GH+'/git/refs','POST',{ref,sha:v.sourceRevision},{...options,conflict:true});check();
  if([409,422].includes(claim.status))return outcome('admin_pending');
  if(claim.status!==201||claim.value?.ref!==ref||claim.value.object?.type!=='commit'||claim.value.object.sha!==v.sourceRevision)fail();
  const tracked=(await gh.request(GH+'/git/ref/'+suffix,'GET',undefined,options)).value;
  if(tracked?.ref!==ref||tracked.object?.type!=='commit'||tracked.object.sha!==v.sourceRevision||!same(await qualify(),originalReady))fail();
  check();
  const payload={operation:FINITE_LAUNCHER_OPERATION,intentId:v.intentId,sourceRevision:v.sourceRevision};
  const result=cfValue(await cf.request(CF+ROOT+'/workflows/'+definition.name+'/instances','POST',
   {instance_id:p.workflows.launcher,params:JSON.stringify(payload)},options)).value;
  check();if(result?.id!==p.workflows.launcher)fail();
  return outcome('launcher_created');
 }catch{return outcome(issued?'uncertain':'admin_pending');}
}

/** Fixed restore adapter. The returned readSnapshot closes over a separate
 * GET-only wire, and consumes retained first-primary facts rather than issuing
 * an imaginary external D1 query. No canary publisher is present here. */
export function createPrivateQaFiniteRestoreHttp({plan,credential,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 const p=validateFiniteExternalPlan(plan),v=p.preview;
 const readWire=wire({credential,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 const writeWire=wire({credential,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential,githubToken,fetchImpl,now,signal});
 const github=createPrivateQaFiniteGithub({plan:p,githubToken,fetchImpl,now,signal});
 const message='AFW finite QA restoration '+finiteSendKey(p);let sent=false;
 const get=async(path,query,parent,assertCurrent)=>{
  assertCurrent();const url=new URL(CF+ROOT+path);if(query)for(const [k,value]of Object.entries(query))url.searchParams.set(k,String(value));
  const r=cfValue(await readWire.request(url.href,'GET',undefined,{parent,assertCurrent}));assertCurrent();return r;
 };
 function pointer(value,pin,expected){
  const list=Array.isArray(value)?value:value?.deployments,d=list?.[0];
  if(!Array.isArray(list)||list.length!==1||!finiteUuid(d?.id)||d.strategy!=='percentage'||d.versions?.length!==1||d.versions[0].version_id!==pin.versionId||d.versions[0].percentage!==100||expected!==undefined&&d.id!==expected)fail();return d;
 }
 async function readSnapshot(parent,assertCurrent){
  const began=now();assertCurrent();const custody=await observer.qualifyCustody(parent,assertCurrent);assertCurrent();
  const observed=await observer.read(parent,assertCurrent);assertCurrent();if(observed.status!=='complete')fail();
  const output=validateFiniteObserverOutput(observed.output,p);
  const source=await get('/workers/workers/'+FINITE_QA+'/versions/'+p.deployments.qaLive.versionId,{include:'modules'},parent,assertCurrent);
  qualifyFiniteWorkerVersion({metadata:source.value,pin:p.deployments.qaLive,role:'qa',closed:false});
  const livePointer=(await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,assertCurrent)).value;
  const version=livePointer?.deployments?.[0]?.versions?.[0]?.version_id;
  const closed=version===p.deployments.qaClosed.versionId,qa=pointer(livePointer,closed?p.deployments.qaClosed:p.deployments.qaLive,closed?undefined:p.deployments.qaLive.deploymentId);
  if(closed&&qa.annotations?.['workers/message']!==message)fail();
  const pins=[[FINITE_QA,p.deployments.qaClosed,'qa'],[CANARY,p.deployments.canaryClosed,'canary'],[OP,p.deployments.operatorClosed,'operator']];
  for(const[name,pin,role]of pins){
   // Closed pointer first: GHA must never read live canary private metadata.
   if(name!==FINITE_QA)pointer((await get('/workers/scripts/'+name+'/deployments',undefined,parent,assertCurrent)).value,pin,name===CANARY?output.completion.canaryDeploymentId:pin.deploymentId);
   const meta=(await get('/workers/workers/'+name+'/versions/'+pin.versionId,{include:'modules'},parent,assertCurrent)).value;
   qualifyFiniteWorkerVersion({metadata:meta,pin,role,closed:true});
   for(const part of ['schedules','tails']){const r=(await get('/workers/scripts/'+name+'/'+part,undefined,parent,assertCurrent)).value,a=Array.isArray(r)?r:r?.schedules;if(!Array.isArray(a)||a.length)fail();}
  }
  const exposure=(await get('/workers/scripts/'+FINITE_QA+'/subdomain',undefined,parent,assertCurrent)).value;
  if(exposure?.enabled!==false||exposure.previews_enabled!==false)fail();
  const namespaces=await get('/workers/durable_objects/namespaces',{page:1,per_page:1000},parent,assertCurrent),ni=namespaces.info;
  if(!Array.isArray(namespaces.value)||namespaces.value.length>1000||ni?.page!==1||ni.per_page!==1000||ni.count!==namespaces.value.length||ni.total_count!==namespaces.value.length||ni.total_pages!==undefined&&ni.total_pages!==1)fail();
  const ns=namespaces.value.filter(x=>x.script===FINITE_QA),expected={IndependentClosure:'070c4a7708eb4592a3ded7c117a88225',PrivateQaPreregistration:'6f30104244424152b800bc64d5f4cfac'};
  if(ns.length!==2||new Set(ns.map(x=>x.id)).size!==2||ns.some(x=>x.id!==expected[x.class]||x.use_sqlite!==true))fail();
  const qualifiedExecution={intentId:v.intentId,controlHash:v.controlHash,sourceRevision:v.sourceRevision,moduleHash:p.source.moduleHash,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,launcherId:p.workflows.launcher,admissionHash:hash(p)};
  const inventory=await readFiniteLaunchTrialAfwWorkflows({read:(path,query)=>get(path,query,parent,assertCurrent),assertCurrent,phase:'qa_restore',confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,launcherId:p.workflows.launcher,qualifiedExecution});
  const rows=[],seen=new Set(),cursors=new Set();let cursor;
  for(let page=0;page<4;page++){
   const r=await get('/containers/applications/'+p.resources.applicationId+'/instances-v2',{per_page:100,...(cursor?{page_token:cursor}:{})},parent,assertCurrent);
   if(!Array.isArray(r.value)||r.value.length>100||r.info?.per_page!==100||(r.info.page_token??'')!==(cursor??''))fail();
   for(const row of r.value){
    if(!hex(row.id)||seen.has(row.id)||row.application_id!==p.resources.applicationId||row.image!=='cloudflare/debian-trixie'||row.status?.state!=='stopped'||row.status.exit_code!==0)fail();seen.add(row.id);
    const startedAt=Date.parse(row.started_at),stoppedAt=Date.parse(row.status.updated_at);
    if(!time(startedAt)||!time(stoppedAt)||stoppedAt<startedAt||stoppedAt>now())fail();
    rows.push({containerId:row.id,applicationId:row.application_id,image:row.image,startedAt,stoppedAt,state:'stopped',exitCode:0});
   }
   if(rows.length>64)fail();const next=r.info.next_page_token;
   if(!next)break;if(page===3||typeof next!=='string'||next.length>1024||cursors.has(next))fail();cursors.add(next);cursor=next;
  }
  rows.sort((a,b)=>a.containerId.localeCompare(b.containerId));
  if(!same(rows,output.retained.support.providerAfter.instances))fail();
  const g=await github.inspect('restore',parent,assertCurrent);assertCurrent();
  // Last pointer/observer read fences writes or replacement during qualification.
  pointer((await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,assertCurrent)).value,closed?p.deployments.qaClosed:p.deployments.qaLive,qa.id);
  const after=await observer.read(parent,assertCurrent);assertCurrent();if(after.status!=='complete'||!same(after.output,observed.output)||now()<began)fail();
  return data({purpose:'afw.finite-qa-snapshot.v1',observedAt:now(),qaVersionId:version,qaDeploymentId:qa.id,output,restoreJobId:g.restoreJobId,custodyExpiresAt:custody.expiresAt,profilesVerified:true,namespacesPreserved:true,exposureDisabled:true,providerSettled:true,workflowsTerminal:true,primarySealedChainVerified:true,githubVerified:true,evidenceHash:hash({qa,inventory,rows,outputHash:hash(output),github:g.evidenceHash,custodyHash:custody.custodyHash})});
 }
 async function deployClosed(input,parent,assertCurrent){
  const x=fields(input,['record','recordHash']);if(sent||x.recordHash!==hash(x.record)||x.record.key!==finiteSendKey(p))fail();sent=true;github.consumeNewSend(x.record);
  const check=()=>{assertCurrent();github.assertSendExecution(x.record);};check();
  const receipt=await github.readSend(parent,check);check();if(!same(receipt,x.record))fail();
  pointer((await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,check)).value,p.deployments.qaLive,p.deployments.qaLive.deploymentId);check();
  const response=cfValue(await writeWire.request(CF+ROOT+'/workers/scripts/'+FINITE_QA+'/deployments','POST',{strategy:'percentage',versions:[{version_id:p.deployments.qaClosed.versionId,percentage:100}],annotations:{'workers/message':message}},{parent,assertCurrent:check}));check();
  if(!finiteUuid(response.value?.id))fail();return {deploymentId:response.value.id};
 }
 return Object.freeze({readSnapshot,claim:github.claimSend,deployClosed,github,observer});
}

/** Actual finalizer admit job identity from primary GitHub, before CF custody.
 * Source constructor may use these technical facts, never caller actor/job DTO. */
export async function readFiniteFinalizerGithubContext({admission,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 assertQaFiniteConfirmationAdmission(admission,'cleanup');
 const client=wire({credential:githubToken,fetchImpl,now,T0:admission.createdAt,R1:admission.cleanupExpiresAt,signal});
 const get=async path=>(await client.request(GH+path,'GET')).value;
 const comment=await get('/issues/comments/'+admission.commentId),main=await get('/git/ref/heads/main'),run=await get('/actions/runs/'+admission.runId);
 if(comment.id!==Number(admission.commentId)||comment.body!=='/afw-qa-finite-confirmation v1 '+admission.sourceRevision||Date.parse(comment.created_at)!==admission.createdAt||comment.user?.id!==290715446||comment.user.login!=='tokenizartinfo-ops'||comment.user.type!=='User'||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||main.object?.sha!==admission.sourceRevision||run.id!==Number(admission.runId)||run.run_attempt!==1||run.head_sha!==admission.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!=='.github/workflows/afw-finite-finalizer.yml'||run.repository?.full_name!==FINITE_REPOSITORY||run.actor?.id!==290715446||run.actor.login!=='tokenizartinfo-ops'||run.status!=='in_progress')fail();
 const jobs=await get('/actions/runs/'+admission.runId+'/attempts/1/jobs?per_page=100'),found=jobs.jobs?.filter(x=>x.name==='admit');
 if(!Array.isArray(jobs.jobs)||jobs.total_count!==jobs.jobs.length||jobs.jobs.length>100||found?.length!==1||!Number.isSafeInteger(found[0].id))fail();
 return data({repository:FINITE_REPOSITORY,runId:run.id,attempt:1,jobId:found[0].id,workflow:'afw-finite-finalizer',sourceRevision:admission.sourceRevision,readyStep:'admit-and-ready'});
}
