import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
import {FINITE_ACCOUNT,FINITE_REPOSITORY,FINITE_QA,validateFiniteExternalPlan,validateFiniteObserverOutput,finiteSendKey,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteObserverInstanceId,FINITE_OBSERVER_OPERATION,FINITE_PREVIEW_STEP,validateFiniteMaterialPreview} from './mcp-qa-finite-observer.mjs';
import {AFW_FIXED_WORKFLOWS,readFiniteTrialAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {isQaGithubBearerTransportValue,assertQaFiniteConfirmationAdmission} from './mcp-qa-cloud-lifecycle-admission.mjs';
const CF='https://api.cloudflare.com/client/v4',ROOT='/accounts/'+FINITE_ACCOUNT,GH='https://api.github.com/repos/'+FINITE_REPOSITORY;
const CANARY='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator';
const creationClaims=new WeakMap();
const definition=AFW_FIXED_WORKFLOWS.find(x=>x.className==='PrivateQaBootstrap');
const fail=()=>{throw Error('Finite fixed transport unavailable');};
const digest=x=>createHash('sha256').update(x).digest('hex');
/** Module-private wire, reachable ONLY from named fixed operations below.
 * No provider text/header/token is attached to a thrown error. */
function wire({credential,fetchImpl,now,T0,R1,signal}){
 if(!isQaGithubBearerTransportValue(credential)||typeof fetchImpl!=='function'||typeof now!=='function'||!(signal instanceof AbortSignal)||!time(T0)||R1!==T0+480000)fail();
 let wall=now(),mono=performance.now(),origin=mono,reads=0,lastFailure=null;
 const current=()=>{const n=now(),m=performance.now();if(signal.aborted||!time(n)||n<T0||n<wall||n>=R1||!Number.isFinite(m)||m<mono||m>=end)fail();wall=n;mono=m;return n;};
 // The monotonic end is fixed once, never recomputed from a later wall reading.
 const end=origin+R1-wall;
 async function request(url,method,body,{parent=signal,assertCurrent=()=>{},allow404=false,conflict=false,max=4194304}={}){
  let reader,timer,done=false,httpStatus=null;const child=new AbortController(),began=current(),start=performance.now();
  const check=()=>{assertCurrent();current();if(done||parent.aborted||child.signal.aborted||now()-began>=5000||performance.now()-start>=5000||performance.now()>=end)fail();};
  const stop=()=>child.abort();parent.addEventListener('abort',stop,{once:true});
  try{
   const work=async()=>{
    check();if(method==='GET'&&++reads>512)fail();
    const response=await fetchImpl(url,{method,redirect:'error',cache:'no-store',signal:child.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache',...(url.startsWith(GH)?{'X-GitHub-Api-Version':'2022-11-28'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});check();
    if(!(response instanceof Response))fail();httpStatus=response.status;
    if(allow404&&httpStatus===404)return {status:404,value:null};
    if(conflict&&[409,422].includes(httpStatus))return {status:httpStatus,value:null};
    if(![200,201].includes(httpStatus)||method==='GET'&&httpStatus!==200)fail();
    const date=Date.parse(response.headers.get('date')??'');
    if(!time(date)||Math.abs(now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    const size=response.headers.get('content-length');if(size!==null&&(!/^\d+$/.test(size)||Number(size)>max)||!response.body)fail();
    reader=response.body.getReader();const chunks=[];let bytes=0;
    for(;;){check();const r=await reader.read();check();if(r.done)break;if(!(r.value instanceof Uint8Array)||(bytes+=r.value.length)>max)fail();chunks.push(r.value);}
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
function fixedInstance(value,id){
 if(!value||value.id!==id||value.workflow_id!==definition.id||!['running','waiting','complete'].includes(value.status)||!Array.isArray(value.steps)||value.steps.length>100)fail();return value;
}
/** Creation and GET recovery use the fixed existing Workflow only. Source is
 * approved technical artifact metadata, never command-supplied scope. */
export function createPrivateQaFiniteObserverHttp({admission,source,credential,fetchImpl=fetch,now=Date.now,signal}={}){
 const a=fields(admission,['intentId','sourceRevision','T0','R1']),s=fields(data(source),['qaLive','custody']);
 if(!hex(a.intentId)||!hex(a.sourceRevision,40)||a.R1!==a.T0+480000)fail();
 const id=finiteObserverInstanceId({intentId:a.intentId,sourceRevision:a.sourceRevision}),input={operation:FINITE_OBSERVER_OPERATION,intentId:a.intentId,sourceRevision:a.sourceRevision};
 const client=wire({credential,fetchImpl,now,T0:a.T0,R1:a.R1,signal});let createStarted=false;
 const get=async path=>cfValue(await client.request(CF+ROOT+path,'GET'));
 async function custody(){
  client.current();
  const verified=cfValue(await client.request(CF+'/user/tokens/verify','GET')).value;
  if(verified?.id!==s.custody.id||verified.status!=='active'||Date.parse(verified.expires_on)!==s.custody.expiresAt||s.custody.expiresAt<a.R1)fail();
  // Independent effective scope evidence. Verify success is NOT permission.
  const actual=cfValue(await client.request(CF+'/user/tokens/'+s.custody.id,'GET')).value;
  if(actual?.id!==s.custody.id||actual.status!=='active'||Date.parse(actual.expires_on)!==s.custody.expiresAt||!Array.isArray(actual.policies)||hash(actual.policies)!==s.custody.policyHash)fail();
  const granted=new Set();
  for(const policy of actual.policies){if(policy.effect!=='allow'||policy.resources?.['com.cloudflare.api.account.'+FINITE_ACCOUNT]!=='*'||!Array.isArray(policy.permission_groups))fail();for(const g of policy.permission_groups)granted.add(g.id);}
  if(s.custody.permissionGroupIds.length!==2||s.custody.permissionGroupIds.some(x=>!granted.has(x)))fail();
  return {custodyHash:hash({id:actual.id,expiresAt:s.custody.expiresAt,policyHash:s.custody.policyHash}),expiresAt:s.custody.expiresAt};
 }
 async function provenance(){
  const d=(await get('/workflows/'+definition.name)).value;
  if(d.id!==definition.id||d.name!==definition.name||d.script_name!==definition.script||d.class_name!==definition.className||d.script_deleted===true)fail();
  const version=(await get('/workers/workers/'+FINITE_QA+'/versions/'+s.qaLive.versionId+'?include=modules')).value;
  qualifyFiniteWorkerVersion({metadata:version,pin:s.qaLive,role:'qa',closed:false});
 }
 async function read(){
  await custody();await provenance();const r=fixedInstance((await get('/workflows/'+definition.name+'/instances/'+id)).value,id);
  if(!same(r.params,input)||r.version_id!==s.qaLive.versionId)fail();
  return data(r);
 }
 return Object.freeze({
  instanceId:id,input:Object.freeze(input),qualifyCustody:custody,
  async create(claimAcknowledged){
   const claim=creationClaims.get(claimAcknowledged);if(createStarted||!claim||claim.used||claim.intentId!==a.intentId||claim.sourceRevision!==a.sourceRevision||claim.T0!==a.T0)fail();createStarted=true;claim.used=true;await custody();await provenance();client.current();
   try{
    const response=await client.request(CF+ROOT+'/workflows/'+definition.name+'/instances','POST',{id,params:input});
    if(response.status!==200&&response.status!==201)fail();if(cfValue(response).value?.id!==id)fail();
   }catch{/* one send only; exact GET reconciliation even after lost ACK */}
   return read();
  },
  read,
  async preview(){
   const r=await read();if(!['running','waiting'].includes(r.status))fail();
   const first=r.steps[0];if(first?.name!==FINITE_PREVIEW_STEP||first.status!=='complete'||first.success!==true)fail();
   const p=validateFiniteMaterialPreview(first.output);if(p.intentId!==a.intentId||p.sourceRevision!==a.sourceRevision||p.runtimeVersionId!==s.qaLive.versionId||p.T0!==a.T0||p.R1!==a.R1)fail();return p;
  },
  diagnostic:client.diagnostic
 });
}
/** GitHub primary metadata plus append-only tag/ref fences; never update/delete.
 * A tag object without a NEW acknowledged unique ref is not authority. */
export function createPrivateQaFiniteGithub({plan,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 const p=validateFiniteExternalPlan(plan),v=p.preview,client=wire({credential:githubToken,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 let claimStarted=false,acknowledgedSend=null,sendConsumed=false;
 const get=async path=>(await client.request(GH+path,'GET')).value;
 async function inspect(phase){
  client.current();if(!['ready','restore'].includes(phase))fail();
  const comment=await get('/issues/comments/'+p.commandId),main=await get('/git/ref/heads/main');
  if(comment.id!==Number(p.commandId)||comment.body!=='/afw-qa-finite-confirmation v1 '+v.sourceRevision||Date.parse(comment.created_at)!==v.T0||comment.user?.id!==290715446||comment.user.login!=='tokenizartinfo-ops'||comment.user.type!=='User'||comment.author_association!=='OWNER'||comment.issue_url!==GH+'/issues/497'||main.object?.sha!==v.sourceRevision)fail();
  const run=await get('/actions/runs/'+p.finalizer.runId),jobs=await get('/actions/runs/'+p.finalizer.runId+'/attempts/1/jobs?per_page=100');
  if(run.id!==p.finalizer.runId||run.run_attempt!==1||run.head_sha!==v.sourceRevision||run.head_branch!=='main'||run.event!=='issue_comment'||run.path!=='.github/workflows/afw-finite-finalizer.yml'||run.repository?.full_name!==FINITE_REPOSITORY||run.actor?.id!==290715446||run.actor.login!=='tokenizartinfo-ops'||run.status!=='in_progress'||jobs.total_count!==jobs.jobs?.length||jobs.jobs.length>100)fail();
  const admits=jobs.jobs.filter(x=>x.id===p.finalizer.jobId&&x.name==='admit'),restores=jobs.jobs.filter(x=>x.name==='restore');
  if(admits.length!==1)fail();const job=admits[0],steps=job.steps.filter(x=>x.name==='admit-and-ready');
  if(steps.length!==1||steps[0].status!=='completed'||steps[0].conclusion!=='success'||Date.parse(job.started_at)<v.T0||Date.parse(steps[0].started_at)<Date.parse(job.started_at)||Date.parse(steps[0].completed_at)>now())fail();
  if(phase==='ready'&&job.status!=='in_progress'||phase==='restore'&&(job.status!=='completed'||job.conclusion!=='success'||restores.length!==1||restores[0].status!=='in_progress'||restores[0].run_id!==p.finalizer.runId||restores[0].head_sha!==v.sourceRevision))fail();
  return data({runId:run.id,jobId:job.id,restoreJobId:phase==='restore'?restores[0].id:null,job,observedAt:client.current(),evidenceHash:hash({run,jobs})});
 }
 async function claimSend(record,parent,assertCurrent){
  if(claimStarted)return 'existing';claimStarted=true;
  const r=data(record),key=finiteSendKey(p),ref='refs/tags/afw-finite-qa-send/'+key;
  if(r.key!==key||r.intentId!==v.intentId||r.controlHash!==v.controlHash||r.kind!=='qa_restore'||r.sourceRevision!==v.sourceRevision||r.runId!==p.finalizer.runId||r.attempt!==1||r.R1!==v.R1||!same(r.candidate,p.deployments.qaLive)||!same(r.target,p.deployments.qaClosed))fail();
  const opts={parent,assertCurrent,conflict:true,max:32768};
  try{
   assertCurrent();const metadata=await inspect('restore');assertCurrent();if(metadata.restoreJobId!==r.jobId)fail();
   const tag=(await client.request(GH+'/git/tags','POST',{tag:'afw-finite-qa-send-'+key,message:JSON.stringify(r),object:v.sourceRevision,type:'commit'},opts)).value;
   if(!hex(tag?.sha,40)||tag.object?.sha!==v.sourceRevision||tag.object?.type!=='commit'||tag.message!==JSON.stringify(r))fail();
   assertCurrent();const created=await client.request(GH+'/git/refs','POST',{ref,sha:tag.sha},opts);assertCurrent();
   if(created.status!==201)return 'existing';
   if(created.value?.ref!==ref||created.value.object?.type!=='tag'||created.value.object?.sha!==tag.sha)fail();
   acknowledgedSend=r;return 'issued';
  }catch{return 'uncertain';}
 }
 async function readSend(){
  const key=finiteSendKey(p),ref=await get('/git/ref/tags/afw-finite-qa-send/'+key);
  if(ref.ref!=='refs/tags/afw-finite-qa-send/'+key||ref.object?.type!=='tag'||!hex(ref.object.sha,40))fail();
  const tag=await get('/git/tags/'+ref.object.sha);
  if(tag.object?.type!=='commit'||tag.object.sha!==v.sourceRevision||typeof tag.message!=='string'||Buffer.byteLength(tag.message)>32768)fail();
  const record=data(JSON.parse(tag.message));if(record.key!==key||record.controlHash!==v.controlHash||record.kind!=='qa_restore')fail();return record;
 }
 async function admissionReceipt(write){
  const key=v.intentId+'/'+v.controlHash,ref='refs/tags/afw-finite-ready/'+key;
  if(write){
   const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential:write.credential,fetchImpl,now,signal});
   const preview=await observer.preview(),custody=await observer.qualifyCustody();client.current();
   if(!same(preview,v)||v.N1-now()<180000)fail();
   const body={commandId:p.commandId,controlPlanHash:v.planHash,R1:v.R1,resourceHash:v.resourceHash,custodyHash:custody.custodyHash,validatedAt:now()};
   const tag=(await client.request(GH+'/git/tags','POST',{tag:'afw-finite-ready-'+v.intentId,message:JSON.stringify(body),object:v.sourceRevision,type:'commit'})).value;
   if(!hex(tag?.sha,40)||tag.message!==JSON.stringify(body)||tag.object?.sha!==v.sourceRevision)fail();
   const made=await client.request(GH+'/git/refs','POST',{ref,sha:tag.sha},{conflict:true});
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
  inspect,claimSend,readSend,
  consumeNewSend(record){if(sendConsumed||!acknowledgedSend||!same(record,acknowledgedSend))fail();sendConsumed=true;},
  persistAdmission:credential=>admissionReceipt({credential}),
  async readReady(){
   const g=await inspect('ready'),a=await admissionReceipt(),j=g.job,step=j.steps.find(x=>x.name==='admit-and-ready');
   if(a.validatedAt<Date.parse(step.started_at)||a.validatedAt>Date.parse(step.completed_at))fail();
   return data({purpose:'afw.qa-finite-finalizer-ready.v1',intentId:v.intentId,sourceRevision:v.sourceRevision,runtimeVersionId:v.runtimeVersionId,actorId:v.actorId,planHash:v.planHash,observedAt:client.current(),repository:FINITE_REPOSITORY,runId:p.finalizer.runId,attempt:1,workflow:'afw-finite-finalizer',status:'in_progress',job:{id:p.finalizer.jobId,status:'in_progress',startedAt:Date.parse(j.started_at),steps:[{name:'admit-and-ready',status:'completed',conclusion:'success',startedAt:Date.parse(step.started_at),completedAt:Date.parse(step.completed_at)}]},admission:a,evidenceHash:g.evidenceHash});
  },
  diagnostic:client.diagnostic
 });
}

/** Fixed restore adapter. The returned readSnapshot closes over a separate
 * GET-only wire, and consumes retained first-primary facts rather than issuing
 * an imaginary external D1 query. No canary publisher is present here. */
export function createPrivateQaFiniteRestoreHttp({plan,credential,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 const p=validateFiniteExternalPlan(plan),v=p.preview;
 const readWire=wire({credential,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 const writeWire=wire({credential,fetchImpl,now,T0:v.T0,R1:v.R1,signal});
 const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:v.intentId,sourceRevision:v.sourceRevision,T0:v.T0,R1:v.R1},source:{qaLive:p.deployments.qaLive,custody:p.custody},credential,fetchImpl,now,signal});
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
  const began=now();assertCurrent();const custody=await observer.qualifyCustody();assertCurrent();
  const observed=await observer.read();assertCurrent();if(observed.status!=='complete')fail();
  const output=validateFiniteObserverOutput(observed.output,p);
  const source=await get('/workers/workers/'+FINITE_QA+'/versions/'+p.deployments.qaLive.versionId,{include:'modules'},parent,assertCurrent);
  qualifyFiniteWorkerVersion({metadata:source.value,pin:p.deployments.qaLive,role:'qa',closed:false});
  const livePointer=(await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,assertCurrent)).value;
  const version=livePointer?.deployments?.[0]?.versions?.[0]?.version_id;
  const closed=version===p.deployments.qaClosed.versionId,qa=pointer(livePointer,closed?p.deployments.qaClosed:p.deployments.qaLive,closed?undefined:p.deployments.qaLive.deploymentId);
  if(closed&&qa.annotations?.['workers/message']!==message)fail();
  const pins=[[FINITE_QA,p.deployments.qaClosed,'qa'],[CANARY,p.deployments.canaryClosed,'canary'],[OP,p.deployments.operatorClosed,'operator']];
  for(const[name,pin,role]of pins){
   const meta=(await get('/workers/workers/'+name+'/versions/'+pin.versionId,{include:'modules'},parent,assertCurrent)).value;
   qualifyFiniteWorkerVersion({metadata:meta,pin,role,closed:true});
   if(name!==FINITE_QA)pointer((await get('/workers/scripts/'+name+'/deployments',undefined,parent,assertCurrent)).value,pin,name===CANARY?output.completion.canaryDeploymentId:pin.deploymentId);
   for(const part of ['schedules','tails']){const r=(await get('/workers/scripts/'+name+'/'+part,undefined,parent,assertCurrent)).value,a=Array.isArray(r)?r:r?.schedules;if(!Array.isArray(a)||a.length)fail();}
  }
  const exposure=(await get('/workers/scripts/'+FINITE_QA+'/subdomain',undefined,parent,assertCurrent)).value;
  if(exposure?.enabled!==false||exposure.previews_enabled!==false)fail();
  const namespaces=await get('/workers/durable_objects/namespaces',{page:1,per_page:1000},parent,assertCurrent),ni=namespaces.info;
  if(!Array.isArray(namespaces.value)||namespaces.value.length>1000||ni?.page!==1||ni.per_page!==1000||ni.count!==namespaces.value.length||ni.total_count!==namespaces.value.length||ni.total_pages!==undefined&&ni.total_pages!==1)fail();
  const ns=namespaces.value.filter(x=>x.script===FINITE_QA),expected={IndependentClosure:'070c4a7708eb4592a3ded7c117a88225',PrivateQaPreregistration:'6f30104244424152b800bc64d5f4cfac'};
  if(ns.length!==2||new Set(ns.map(x=>x.id)).size!==2||ns.some(x=>x.id!==expected[x.class]||x.use_sqlite!==true))fail();
  const qualifiedExecution={intentId:v.intentId,controlHash:v.controlHash,sourceRevision:v.sourceRevision,moduleHash:p.source.moduleHash,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,admissionHash:hash(p)};
  const inventory=await readFiniteTrialAfwWorkflows({read:(path,query)=>get(path,query,parent,assertCurrent),assertCurrent,phase:'qa_restore',confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,qualifiedExecution});
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
  const g=await github.inspect('restore');assertCurrent();
  // Last pointer/observer read fences writes or replacement during qualification.
  pointer((await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,assertCurrent)).value,closed?p.deployments.qaClosed:p.deployments.qaLive,qa.id);
  const after=await observer.read();assertCurrent();if(after.status!=='complete'||!same(after.output,observed.output)||now()<began)fail();
  return data({purpose:'afw.finite-qa-snapshot.v1',observedAt:now(),qaVersionId:version,qaDeploymentId:qa.id,output,restoreJobId:g.restoreJobId,custodyExpiresAt:custody.expiresAt,profilesVerified:true,namespacesPreserved:true,exposureDisabled:true,providerSettled:true,workflowsTerminal:true,primarySealedChainVerified:true,githubVerified:true,evidenceHash:hash({qa,inventory,rows,outputHash:hash(output),github:g.evidenceHash,custodyHash:custody.custodyHash})});
 }
 async function deployClosed(input,parent,assertCurrent){
  const x=fields(input,['record','recordHash']);if(sent||x.recordHash!==hash(x.record)||x.record.key!==finiteSendKey(p))fail();sent=true;github.consumeNewSend(x.record);assertCurrent();
  const receipt=await github.readSend();assertCurrent();if(!same(receipt,x.record))fail();
  pointer((await get('/workers/scripts/'+FINITE_QA+'/deployments',undefined,parent,assertCurrent)).value,p.deployments.qaLive,p.deployments.qaLive.deploymentId);assertCurrent();
  const response=cfValue(await writeWire.request(CF+ROOT+'/workers/scripts/'+FINITE_QA+'/deployments','POST',{strategy:'percentage',versions:[{version_id:p.deployments.qaClosed.versionId,percentage:100}],annotations:{'workers/message':message}},{parent,assertCurrent}));assertCurrent();
  if(!finiteUuid(response.value?.id))fail();return {deploymentId:response.value.id};
 }
 return Object.freeze({readSnapshot,claim:github.claimSend,deployClosed,github,observer});
}

/** Consumed once before Workflow creation, in a distinct fixed intent domain.
 * Unknown ref ACK yields no branded creation token and only exact GET recovery. */
export async function claimFiniteObserverCreation({admission,githubToken,fetchImpl=fetch,now=Date.now,signal}={}){
 assertQaFiniteConfirmationAdmission(admission);
 const client=wire({credential:githubToken,fetchImpl,now,T0:admission.createdAt,R1:admission.cleanupExpiresAt,signal}),ref='refs/tags/afw-finite-observer-create/'+admission.intentId;
 const r=await client.request(GH+'/git/refs','POST',{ref,sha:admission.sourceRevision},{conflict:true});
 assertQaFiniteConfirmationAdmission(admission);client.current();
 if(r.status!==201||r.value?.ref!==ref||r.value.object?.type!=='commit'||r.value.object?.sha!==admission.sourceRevision)fail();
 const token=Object.freeze({});creationClaims.set(token,{intentId:admission.intentId,sourceRevision:admission.sourceRevision,T0:admission.createdAt,used:false});return token;
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
