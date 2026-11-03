import {FINITE_INITIAL_CLEANUP_PREFIX as P,FINITE_INITIAL_CLEANUP_KINDS as K,sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {decodeFiniteInitialUploadRecord as upload} from './mcp-qa-finite-initial-upload-records.mjs';
import {qualifyFiniteInitialHistoricalBaseline,readPrivateQaFiniteHistoricalSource} from './mcp-qa-finite-historical-source.mjs';
import {qualifyFiniteInitialUploadedVersion,initialUploadSha as sha} from './mcp-qa-finite-initial-upload-wire.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {readFiniteAfwWorkflowInventory} from './mcp-fixed-terminal-workflows.mjs';
import {readPrivateQaFiniteBootstrap} from './mcp-qa-finite-bootstrap-native.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec',SLOT='afw-own-successor-closure-v1',HEAD='afw.qa-finite-trial.v1:head',CEILING=Date.parse('2026-11-03T02:59:00Z');
const W='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator',NS='d6fc71552de7494a863aca20365a572d';
const fail=()=>{throw Error('Finite initial cleanup unavailable');};
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const out=status=>Object.freeze({status,operationalReadiness:false});
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
function clock(deadline,holders){
 const entered=Date.now(),mono=performance.now(),controller=new AbortController(),pendingWork=new Set();
 let end=Math.min(deadline,CEILING),last=entered,lastMono=mono,closed=false,timer;
 const stop=()=>controller.abort();
 const check=()=>{holders();const at=Date.now(),m=performance.now();if(closed||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;return at;};
 const lease=Object.freeze({signal:controller.signal,assertCurrent:check});
 const retain=p=>{pendingWork.add(p);const settled=()=>pendingWork.delete(p);p.then(settled,settled);return p;};
 const narrow=until=>{check();if(!Number.isSafeInteger(until))fail();end=Math.min(end,until);clearTimeout(timer);check();timer=setTimeout(stop,Math.max(1,end-Date.now()));};
 const wait=async(p,l=lease)=>{let abort;try{return await Promise.race([retain(p),new Promise((_,reject)=>{abort=()=>reject(Error('Finite initial expired'));l.signal.addEventListener('abort',abort,{once:true});if(l.signal.aborted)abort();})]).then(v=>{current(l);return v;});}finally{l.signal.removeEventListener('abort',abort);}};
 const child=async work=>{
  check();const began=Date.now(),m0=performance.now(),until=Math.min(end,began+5000),c=new AbortController();let alive=true,t;
  const abort=()=>c.abort();controller.signal.addEventListener('abort',abort,{once:true});t=setTimeout(abort,Math.max(1,until-Date.now()));
  const l=Object.freeze({signal:c.signal,assertCurrent(){check();if(!alive||c.signal.aborted||Date.now()>=until||performance.now()-m0>=until-began)fail();}});
  let actual;
  try{current(l);actual=work(l,until);if(!actual||typeof actual.then!=='function')fail();retain(actual);return await wait(actual,l);}finally{alive=false;clearTimeout(t);controller.signal.removeEventListener('abort',abort);c.abort();}
 };
 narrow(end);return{lease,child,wait,narrow,retain,end(){check();return end;},close(){closed=true;clearTimeout(timer);stop();}};
}
/** Fixed initial-only native alarm. No supplied success facts, clock or capability. */
export async function runPrivateQaFiniteInitialCleanupAlarm({ctx,env}){
 let parent;
 try{
  const ns=env?.AFW_INDEPENDENT_CLOSURE,actor=ctx?.id,toString=actor?.toString,idFromName=ns?.idFromName;
  if(typeof toString!=='function'||typeof idFromName!=='function')fail();
  if(actor.toString()!==ns.idFromName(SLOT).toString())return null;
  const storage=ctx.storage,get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync,getAlarm=storage?.getAlarm,fetcher=globalThis.fetch,metadata=env.AFW_QA_VERSION,qa=metadata?.id,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
  if([get,list,transaction,sync,getAlarm,fetcher].some(x=>typeof x!=='function'))fail();
  const holders=()=>{if(ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||actor.toString()!==ns.idFromName(SLOT).toString()||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
  parent=clock(Date.now()+30000,holders);const lease=parent.lease;
  const read=key=>parent.child(()=>Reflect.apply(get,storage,[key]));
  const rawRows=await parent.child(()=>Reflect.apply(list,storage,[{prefix:P,limit:16}]));
  if(rawRows.size===0)return null;
  if(rawRows.size>Object.keys(K).length)fail();
  const records={};for(const [key,raw]of rawRows){const name=key.slice(P.length);if(!Object.hasOwn(K,name))fail();records[name]=decode(K[name],raw);}
  const p=records.plan,s=records.state;if(!p||!s||s.planHash!==p.recordHash||await read(HEAD)!==undefined)fail();
  if(s.nextAt!==(s.status==='complete'||s.deliveries===3?null:p.C0+s.deliveries*60000)||s.deliveries===0&&(s.status!=='pending'||s.previousHash!==null))fail();
  const expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
  if(expected.sourceRevision!==p.sourceRevision||expected.sourceTree!==p.sourceTree||qa!==p.qaVersionId||resident.sourceRevision!==p.sourceRevision||resident.sourceTree!==p.sourceTree||resident.module.sha256!==p.moduleHash||resident.module.bytes!==p.moduleBytes||p.C1>CEILING||Date.now()<p.C0||Date.now()>=p.C1)fail();
  parent.narrow(Math.min(p.C1,p.readerExpiresAt,p.publisherExpiresAt));
  const entry=decodeFiniteInitialEntry(await read('afw.finite-initial-preparation.v1:entry'));
  if(entry.entryHash!==p.entryHash||entry.I0!==p.I0||entry.initialDeadline!==p.initialDeadline||entry.operationDeadline!==p.forwardDeadline||entry.initialInstanceId!==p.initialInstanceId||entry.sourceRevision!==p.sourceRevision||entry.sourceTree!==p.sourceTree||entry.qaVersionId!==p.qaVersionId)fail();
  const up='afw.finite-initial-upload.v1:'+p.entryHash+':',receipt=upload('Receipt',await read(up+'receipt')),backup=upload('Backup',await read(up+'backup'));
  if(receipt.manifestHash!==p.manifestHash||backup.recordHash!==p.manifestHash||receipt.materialHash!==p.materialHash||backup.materialHash!==p.materialHash||receipt.uploadedVersionId!==p.candidateVersionId||receipt.moduleHash!==p.moduleHash||receipt.configurationHash!==p.configurationHash||backup.baselineVersionId!==p.baselineVersionId||backup.baselineDeploymentId!==p.baselineDeploymentId)fail();
  const alarm=await parent.child(()=>Reflect.apply(getAlarm,storage,[]));
  if(alarm!==null&&alarm!==s.nextAt)fail();
  if(s.status==='complete'){if(!records.receipt||records.receipt.planHash!==p.recordHash)fail();return out(records.receipt.outcome);}
  if(s.deliveries===3||s.nextAt===null||Date.now()<s.nextAt)fail();
  const deliveries=Math.max(s.deliveries+1,Math.floor((Date.now()-p.C0)/60000)+1);if(deliveries>3)fail();
  const nextAt=deliveries<3?p.C0+deliveries*60000:null;
  const next=seal('State',{planHash:p.recordHash,deliveries,status:deliveries===3?'admin_pending':'processing',nextAt,previousHash:s.recordHash});
  async function transact(work,l){
   current(l);const result=await parent.retain(Reflect.apply(transaction,storage,[async tx=>{
    const tg=tx.get,tp=tx.put,ta=tx.setAlarm,td=tx.deleteAlarm;
    if([tg,tp,ta,td].some(x=>typeof x!=='function'))fail();
    const check=()=>{current(l);if(tx.get!==tg||tx.put!==tp||tx.setAlarm!==ta||tx.deleteAlarm!==td)fail();};
    const r=async key=>{check();const v=await parent.retain(Reflect.apply(tg,tx,[key]));check();return v;};
    const put=async(key,value)=>{check();await parent.retain(Reflect.apply(tp,tx,[key,value]));check();};
    if(await r(HEAD)!==undefined||await r(P+'plan')!==encode('Plan',p))fail();
    const value=await work({r,put,alarm:async at=>{check();await parent.retain(at===null?Reflect.apply(td,tx,[]):Reflect.apply(ta,tx,[at]));check();}});check();return value;
   }]));current(l);return result;
  }
  async function durable(key,kind,value,l){await parent.retain(Reflect.apply(sync,storage,[]));current(l);const raw=await parent.retain(Reflect.apply(get,storage,[P+key]));current(l);if(raw!==encode(kind,value))fail();decode(kind,raw);}
  await parent.child(async l=>{
   const reserved=await transact(async tx=>{if(await tx.r(P+'state')!==encode('State',s))fail();await tx.put(P+'state',encode('State',next));await tx.alarm(nextAt);return true;},l);
   if(reserved!==true)fail();await durable('state','State',next,l);
   if(await parent.retain(Reflect.apply(getAlarm,storage,[]))!==nextAt)fail();current(l);
  });
  async function append(key,kind,value,l){
   const inserted=await transact(async tx=>{if(await tx.r(P+key)!==undefined)return false;await tx.put(P+key,encode(kind,value));return true;},l);
   if(inserted!==true)fail();await durable(key,kind,value,l);
  }
  async function http(method,path,token,body,l,cap=3145728){
   current(l);const actual=fetcher(CF+path,{method,redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body===null?{}:{body})});
   const response=await parent.retain(actual);let stream;
   try{
    current(l);const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
    if(!(response instanceof Response)||!(method==='GET'?response.status===200:[200,201].includes(response.status))||response.redirected||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
    stream=response.body.getReader();let size=0;const chunks=[];
    for(;;){const v=await parent.retain(stream.read());current(l);if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
    if(length!==null&&Number(length)!==size)fail();const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),value=finiteCfEnvelope(envelope);return{value,info:envelope.result_info};
   }finally{if(stream)parent.retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)parent.retain(response.body.cancel()).catch(()=>{});}
  }
  const getCf=(path,query)=>parent.child(l=>http('GET',path+(query?'?'+new URLSearchParams(query):''),reader,null,l));
  async function custody(l){
   for(const [token,id,expiry]of [[reader,p.readerId,p.readerExpiresAt],[publisher,p.publisherId,p.publisherExpiresAt]]){
    const v=(await http('GET','/tokens/verify',token,null,l,8192)).value;fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiry||expiry<p.C1||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();current(l);
   }
  }
  const pointer=v=>{const ds=Array.isArray(v)?v:v?.deployments,d=ds?.[0];if(!Array.isArray(ds)||ds.length!==1||!d||!(/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/).test(d.id)||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100)fail();return d;};
  const exact=(d,version,id,annotation)=>{if(d.id!==id||d.versions[0].version_id!==version||annotation!==undefined&&d.annotations?.['workers/message']!==annotation)fail();};
  async function gates(){
   await parent.child(custody);
   await parent.wait(readPrivateQaFiniteBootstrap({ctx,env},lease));current(lease);
   const historical=await parent.wait(readPrivateQaFiniteHistoricalSource({ctx,env},lease));current(lease);
   if(historical.artifact.workerHash!==backup.moduleHash||restorationConfigurationHash(historical.configuration)!==backup.configurationHash)fail();
   const inv=await parent.wait(readFiniteAfwWorkflowInventory({read:getCf,assertCurrent:lease.assertCurrent}));
   if(inv.instances.some(x=>!['complete','errored','terminated'].includes(x.status)))fail();
   const active=await getCf('/containers/applications/'+NS+'/instances-v2',{state:'active',per_page:100});
   if(!Array.isArray(active.value)||active.value.length||!active.info||active.info.per_page!==100||active.info.next_page_token||active.info.page_token)fail();
   for(const name of [W,OP])for(const part of ['schedules','tails']){
    const r=await getCf('/workers/scripts/'+name+'/'+part),a=Array.isArray(r.value)?r.value:r.value?.schedules;
    if(!Array.isArray(a)||a.length||r.info&&(r.info.count!==0||r.info.total_count!==0||r.info.cursor))fail();
   }
   const op=QA_CLOUD_CLOSED_PINS.operator,dp=pointer((await getCf('/workers/scripts/'+OP+'/deployments?per_page=1')).value);exact(dp,op.id,op.deploymentId);
   qualifyFiniteWorkerVersion({metadata:(await getCf('/workers/workers/'+OP+'/versions/'+op.id+'?include=modules')).value,pin:{versionId:op.id,module:op.module,configurationHash:op.configurationHash},role:'operator',closed:true});
   const baseline=qualifyFiniteInitialHistoricalBaseline((await getCf('/workers/workers/'+W+'/versions/'+p.baselineVersionId+'?include=modules')).value);
   if(restorationConfigurationHash(baseline.rawConfiguration)!==backup.rawConfigurationHash||sha(baseline.bytes)!==backup.moduleHash)fail();
   const parts=[];for(const c of backup.chunks){const chunk=upload('Chunk',await read(up+'chunk:'+String(c.index).padStart(3,'0')));if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();parts.push(Buffer.from(chunk.content,'base64'));}
   if(sha(Buffer.concat(parts))!==backup.moduleHash||Buffer.concat(parts).length!==backup.moduleBytes)fail();
   const eligible=await getCf('/workers/scripts/'+W+'/versions',{deployable:true,per_page:100,page:1});
   if(!Array.isArray(eligible.value)||eligible.value.length>100||!eligible.info||eligible.info.page!==1||eligible.info.per_page!==100||eligible.info.count!==eligible.value.length||eligible.info.total_count!==eligible.value.length||eligible.info.total_pages!==undefined&&eligible.info.total_pages!==1||eligible.info.cursor)fail();
   const ids=new Set();let previous=Infinity;
   for(const row of eligible.value){if(typeof row.id!=='string'||ids.has(row.id)||!Number.isSafeInteger(row.number)||row.number<1||row.number>=previous)fail();ids.add(row.id);previous=row.number;}
   if(!ids.has(p.baselineVersionId))fail();
   current(lease);if(await read(HEAD)!==undefined)fail();
   return pointer((await getCf('/workers/scripts/'+W+'/deployments?per_page=1')).value);
  }
  let dp=await gates();
  const send=records['activation-send'],ack=records['activation-ack'],completion=records['activation-completion'],restore=records['restore-send'],restoreAck=records['restore-ack'];
  const activationAnnotation='afw-finite-initial-activate-'+p.recordHash,activationBody=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':activationAnnotation}});
  async function finish(outcome,deploymentId,restoreAckHash){
   await parent.child(async l=>{
    const receipt=seal('Receipt',{planHash:p.recordHash,outcome,deploymentId,restoreAckHash,observedAt:Date.now()});await append('receipt','Receipt',receipt,l);
    const done=seal('State',{planHash:p.recordHash,deliveries,status:'complete',nextAt:null,previousHash:next.recordHash});
    const committed=await transact(async tx=>{if(await tx.r(P+'state')!==encode('State',next))fail();await tx.put(P+'state',encode('State',done));await tx.alarm(null);return true;},l);
    if(committed!==true)fail();await durable('state','State',done,l);
   });return out(outcome);
  }
  if(!send){if(ack||completion||restore||restoreAck||records.receipt)fail();exact(dp,p.baselineVersionId,p.baselineDeploymentId);if(Date.now()<=p.initialDeadline)fail();return await finish('never_activated',dp.id,null);}
  if(send.planHash!==p.recordHash||send.entryHash!==p.entryHash||send.materialHash!==p.materialHash||send.candidateVersionId!==p.candidateVersionId||send.annotation!==activationAnnotation||send.bodyHash!==sha(activationBody)||send.issuedAt<p.I0||send.deadline>p.forwardDeadline||!ack||!completion||!records['arm-ack'])fail();
  if(ack.planHash!==p.recordHash||ack.sendHash!==send.recordHash||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||completion.planHash!==p.recordHash||completion.sendHash!==send.recordHash||completion.ackHash!==ack.recordHash||completion.candidateVersionId!==p.candidateVersionId||completion.deploymentId!==ack.deploymentId||completion.settledAt<ack.acknowledgedAt||completion.observedAt>=send.deadline)fail();
  const armAck=records['arm-ack'];if(armAck.stateHash!==seal('State',{planHash:p.recordHash,deliveries:0,status:'pending',nextAt:p.C0,previousHash:null}).recordHash||armAck.planHash!==p.recordHash||armAck.alarmAt!==p.C0||armAck.acknowledgedAt>=p.forwardDeadline)fail();
  const annotation='afw-finite-initial-restore-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.baselineVersionId,percentage:100}],annotations:{'workers/message':annotation}});
  if(restore){
   if(restore.planHash!==p.recordHash||restore.activationCompletionHash!==completion.recordHash||restore.bodyHash!==sha(body)||restore.annotation!==annotation||restore.issuedAt<p.C0||restore.deadline>p.C1||!restoreAck)fail();
   if(restoreAck.planHash!==p.recordHash||restoreAck.sendHash!==restore.recordHash||restoreAck.acknowledgedAt<restore.issuedAt||restoreAck.acknowledgedAt>=restore.deadline)fail();
   exact(dp,p.baselineVersionId,restoreAck.deploymentId,annotation);return await finish('restored',dp.id,restoreAck.recordHash);
  }
  if(restoreAck||records.receipt)fail();
  exact(dp,p.candidateVersionId,ack.deploymentId,activationAnnotation);
  qualifyFiniteInitialUploadedVersion((await getCf('/workers/workers/'+W+'/versions/'+p.candidateVersionId+'?include=modules')).value,p.candidateVersionId,p.configuration,resident.bytes);
  await parent.child(async(l,deadline)=>{
   await custody(l);
   const fresh=pointer((await http('GET','/workers/scripts/'+W+'/deployments?per_page=1',reader,null,l,65536)).value);exact(fresh,p.candidateVersionId,ack.deploymentId,activationAnnotation);
   const sent=seal('RestoreSend',{planHash:p.recordHash,activationCompletionHash:completion.recordHash,bodyHash:sha(body),annotation,issuedAt:Date.now(),deadline});
   await append('restore-send','RestoreSend',sent,l);current(l);
   const actual=(await http('POST','/workers/scripts/'+W+'/deployments',publisher,body,l,65536)).value;
   const actualPointer=pointer([actual]);exact(actualPointer,p.baselineVersionId,actual.id,annotation);
   if(actual.id===ack.deploymentId||actual.id===p.baselineDeploymentId)fail();
   const saved=seal('RestoreAck',{planHash:p.recordHash,sendHash:sent.recordHash,deploymentId:actual.id,acknowledgedAt:Date.now()});await append('restore-ack','RestoreAck',saved,l);records['restore-ack']=saved;
  });
  dp=await gates();exact(dp,p.baselineVersionId,records['restore-ack'].deploymentId,annotation);
  return await finish('restored',dp.id,records['restore-ack'].recordHash);
 }catch{return pending();}finally{parent?.close();}
}
