import {FINITE_INITIAL_CAPSULE_KEY,sealFiniteInitialCapsule,encodeFiniteInitialCapsule,decodeFiniteInitialCapsule} from './mcp-qa-finite-initial-capsule-records.mjs';
import {prepareFiniteInitialActivationWire,qualifyFiniteInitialActivationAck,qualifyFiniteInitialActivationCompletion} from './mcp-qa-finite-initial-activation-wire.mjs';
import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
import {continueFiniteOwnerStageWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
import {FINITE_INITIAL_CLEANUP_PREFIX as CLEANUP,FINITE_INITIAL_CLEANUP_KINDS,sealFiniteInitialCleanupRecord as sealCleanup,encodeFiniteInitialCleanupRecord as encodeCleanup,decodeFiniteInitialCleanupRecord as decodeCleanup} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {qualifyFiniteInitialHistoricalBaseline} from './mcp-qa-finite-historical-source.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {buildFiniteInitialUpload,qualifyFiniteInitialUploadedVersion,initialUploadSha as sha} from './mcp-qa-finite-initial-upload-wire.mjs';
import {sealFiniteInitialUploadRecord as sealUpload,encodeFiniteInitialUploadRecord as encodeUpload,decodeFiniteInitialUploadRecord as decodeUpload} from './mcp-qa-finite-initial-upload-records.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {createPrivateQaFiniteInitialMaterial} from './mcp-qa-finite-initial-material.mjs';
import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHash as hash,initialHex as hex,initialInstanceId,decodeFiniteInitialMaterialRecord as decodeMaterial,encodeFiniteInitialMaterialRecord as encodeMaterial} from './mcp-qa-finite-initial-material-records.mjs';
import {hashFiniteInitialEntry,encodeFiniteInitialEntry,decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {readPrivateQaFiniteHistoricalSource} from './mcp-qa-finite-historical-source.mjs';
import {readFiniteInitialHistorySchema} from './mcp-qa-finite-initial-history-schema.mjs';
import {readFiniteInitialOldGuard} from './mcp-qa-finite-initial-old-guard.mjs';
import {readFiniteInitialAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web',CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const CEILING=Date.parse('2026-11-03T02:59:00Z'),KEY='afw.finite-initial-preparation.v1:entry',SLOT='afw-own-successor-closure-v1',WORKFLOW='afw-own-qa-private-bootstrap';
const fail=()=>{throw Error('Finite initial entry unavailable');},pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const nativeTime=Date.prototype.getTime,refKeys=['commandId','sourceRevision','qaVersionId','initialInstanceId','workflowName','createdAt'];
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
/** Original absolute lifetime, independent pending-promise retention; no capability. */
const clock=(deadline,holders)=>createFiniteInitialLease(deadline,CEILING,holders,fail);
function refs(value){const r=own(fields(value,refKeys));if(r.initialInstanceId!==initialInstanceId(r)||r.workflowName!==WORKFLOW||!Number.isSafeInteger(r.createdAt)||r.createdAt<0||r.createdAt>Date.now())fail();return r;}
function safe(value,r){
 const v=own(fields(value,['status','entryHash','materialHash','sourceRevision','qaVersionId','authorizesEffects','completePackage','operationalReadiness']));
 if(v.status!=='material_recorded'||!hex(v.entryHash)||!hex(v.materialHash)||v.sourceRevision!==r.sourceRevision||v.qaVersionId!==r.qaVersionId||v.authorizesEffects!==false||v.completePackage!==false||v.operationalReadiness!==false)fail();return v;
}
/** Native RPC alone adds this own synchronous disposer; it is not authority or settlement. */
function nativeResult(value,r){
 let disposer,descriptor,result,firstError;
 try{
  if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
  descriptor=Object.getOwnPropertyDescriptor(value,Symbol.dispose);
  if(descriptor){if(descriptor.enumerable||!Object.hasOwn(descriptor,'value')||typeof descriptor.value!=='function')fail();disposer=descriptor.value;}
  const out={};
  for(const k of Reflect.ownKeys(value)){
   if(k===Symbol.dispose)continue;
   const d=Object.getOwnPropertyDescriptor(value,k);
   if(typeof k!=='string'||!d?.enumerable||!Object.hasOwn(d,'value')||['__proto__','constructor','prototype','toJSON'].includes(k))fail();
   out[k]=d.value;
  }
  const data=own(out);
  if(data.status==='material_recorded')result=safe(data,r);
  else{const v=fields(data,['status','mayRetry','operationalReadiness']);
   if(v.status!=='admin_pending'||v.mayRetry!==false||v.operationalReadiness!==false)fail();result=pending();}
 }catch(error){firstError=error;}finally{
  try{if(disposer){
   const latest=Object.getOwnPropertyDescriptor(value,Symbol.dispose);
   if(!latest||latest.value!==disposer||latest.enumerable!==descriptor.enumerable)fail();
   Reflect.apply(disposer,value,[]);
  }}catch(error){firstError??=error;}
 }
 if(firstError)throw firstError;return result;
}
/** Fixed source-owned actor continuation; transported native fields are correlation DATA. */
export function createPrivateQaFiniteInitialEntry(options){
 fields(options,['ctx','env']);const {ctx,env}=options;
 return Object.freeze({async run(input){
  let parent;
  try{
   const r=refs(input),storage=ctx?.storage,transaction=storage?.transaction,get=storage?.get,sync=storage?.sync,getAlarm=storage?.getAlarm,list=storage?.list,actorId=ctx?.id,toString=actorId?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,node=env?.AFW_RELEASE_EVENTS_NODE,nodeIdFromName=node?.idFromName,nodeIdFromString=node?.idFromString,nodeGet=node?.get,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   if([transaction,get,sync,getAlarm,list,toString,idFromName,namespaceGet,prepare,withSession,nodeIdFromName,nodeIdFromString,nodeGet,fetcher].some(x=>typeof x!=='function')||[credential,publisher].some(x=>typeof x!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(x)))fail();
   const expected=readFiniteQaBootstrapSourceExpectations(),candidate=readPrivateQaFiniteCandidate(),actor=Reflect.apply(toString,actorId,[]);
   if(!hex(actor)||self.idFromName(SLOT).toString()!==actor||r.sourceRevision!==expected.sourceRevision||qaVersionId!==r.qaVersionId||candidate.sourceRevision!==expected.sourceRevision||candidate.sourceTree!==expected.sourceTree)fail();
   const holders=()=>{if(options.ctx!==ctx||options.env!==env||ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||storage.sync!==sync||storage.getAlarm!==getAlarm||storage.list!==list||ctx.id!==actorId||actorId.toString!==toString||Reflect.apply(toString,actorId,[])!==actor||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||self.idFromName(SLOT).toString()!==actor||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeIdFromName||node.idFromString!==nodeIdFromString||node.get!==nodeGet||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
   parent=clock(r.createdAt+30000,holders);const lease=parent.lease;
   const retainRequest=p=>parent.retain(retainFiniteOwnerStagePromise(p));
   const request=(base,path,cap,token=credential,retainUntilSettled=false)=>parent.child(async l=>{
    const work=(async()=>{
    let response,reader;
    try{
     response=await retainRequest(fetcher(base+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',...retainUntilSettled?{}:{signal:l.signal},headers:{Accept:'application/json','Cache-Control':'no-cache',...base===CF?{Authorization:'Bearer '+token}:{'X-GitHub-Api-Version':'2022-11-28'}}}));current(l);
     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length'),remaining=response?.headers?.get('x-ratelimit-remaining');
     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap)||remaining!==null&&(!/^\d+$/.test(remaining)||Number(remaining)<1))fail();
     reader=response.body.getReader();let size=0;const chunks=[];
     for(;;){const v=await retainRequest(reader.read());current(l);if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
     if(length!==null&&Number(length)!==size)fail();return{value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
    }finally{if(reader)await retainRequest(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retainRequest(response.body.cancel()).catch(()=>{});}
    })();
    return await retainRequest(work);
   });
   const command=async()=>{
    const v=(await request(GH,'/issues/comments/'+r.commandId,16384)).value,I0=Date.parse(v.created_at);current(lease);
    if(v.id!==r.commandId||v.body!=='/afw-qa-finite-prepare v1 '+expected.sourceRevision+' '+qaVersionId||v.user?.id!==290715446||v.user.login!=='tokenizartinfo-ops'||v.user.type!=='User'||v.author_association!=='OWNER'||v.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(I0)||I0<0||![new Date(I0).toISOString(),new Date(I0).toISOString().replace('.000Z','Z')].includes(v.created_at)||v.updated_at!==v.created_at||I0>r.createdAt||Date.now()>=I0+300000)fail();
    return own({commandId:r.commandId,body:v.body,createdAt:I0,updatedAt:I0,ownerId:290715446,repository:'tokenizartinfo-ops/agent-friendly-web',issueNumber:497});
   };
   const first=await command();parent.narrow(first.createdAt+300000);
   for(const [loaded,id]of [[credential,'9aa97ad1fc9afe3021cf69ea497d5190'],[publisher,'05718105dcdfc92e55cc3624172c2740']]){
    const token=finiteCfEnvelope((await request(CF,'/tokens/verify',8192,loaded)).value);fields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]]);
    const expiry=Date.parse(token.expires_on);if(token.id!==id||token.status!=='active'||!Number.isSafeInteger(expiry)||token.not_before!=null&&(!Number.isSafeInteger(Date.parse(token.not_before))||Date.parse(token.not_before)>Date.now()))fail();parent.narrow(expiry);
   }
   const main=(await request(GH,'/git/ref/heads/main',16384)).value;
   if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==expected.sourceRevision)fail();
   const pointer=finiteQaPointer(await request(CF,'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1',65536));if(pointer.versionId!==qaVersionId)fail();
   const body={purpose:'afw.finite-initial-entry.v1',commandId:r.commandId,commandHash:hash('afw.finite-initial-command.v1',first),sourceRevision:expected.sourceRevision,sourceTree:expected.sourceTree,qaVersionId,initialInstanceId:r.initialInstanceId,workflowName:WORKFLOW,createdAt:r.createdAt,I0:first.createdAt,initialDeadline:first.createdAt+300000,operationDeadline:Math.min(first.createdAt+300000,r.createdAt+30000,CEILING)};
   const record={...body,entryHash:hashFiniteInitialEntry(body)},raw=encodeFiniteInitialEntry(record);
   const inserted=await parent.child(l=>Reflect.apply(transaction,storage,[async tx=>{
    const tg=tx.get,tp=tx.put;const check=()=>{current(l);if(tx.get!==tg||tx.put!==tp)fail();};
    check();const old=await Reflect.apply(tg,tx,[KEY]);check();
    if(old!==undefined){decodeFiniteInitialEntry(old);if(old!==raw)fail();return false;}
    for(const key of ['afw.finite-initial-preparation.v1:once','afw.finite-initial-preparation.v1:selector','afw.finite-initial-preparation.v1:ack','afw.qa-finite-trial.v1:head']){if(await Reflect.apply(tg,tx,[key])!==undefined)fail();check();}
    await Reflect.apply(tp,tx,[KEY,raw]);check();return true;
   }]));
   if(inserted!==true)return pending();
   await parent.child(()=>Reflect.apply(sync,storage,[]));
   const readback=await parent.child(()=>Reflect.apply(get,storage,[KEY]));if(readback!==raw)fail();decodeFiniteInitialEntry(readback);
   if(canonical(await command())!==canonical(first))fail();current(lease);
   // Only this surviving ACKed/durable invocation reaches A; no exported admission.
   const producer=createPrivateQaFiniteInitialMaterial({ctx,env}),result=await parent.wait(producer.collect({commandId:r.commandId},lease));
   producer.assertCurrent(result,lease);
   await parent.child(()=>Reflect.apply(sync,storage,[]));producer.assertCurrent(result,lease);current(lease);
   const uploaded=await publishInitialClosedVersion(ctx,env,record,producer,result,parent);
   const armed=await armInitialCleanup(ctx,env,record,producer,result,parent,uploaded);
   await parent.wait(continueFiniteOwnerStageWork({ctx,env,originalLease:lease},async()=>{
    // Factual pre-effect observations remain inside the original B1/A lifetime.
    // They do not authorize activation and are not reconstructible from RPC data.
    const verify=()=>{current(lease);producer.assertCurrent(result,lease);holders();};
    const storageCheck=()=>parent.child(async l=>{
     verify();
     const [planRaw,stateRaw,armRaw,alarm,head,journals]=await Promise.all([
      retainRequest(Reflect.apply(get,storage,[CLEANUP+'plan'])),
      retainRequest(Reflect.apply(get,storage,[CLEANUP+'state'])),
      retainRequest(Reflect.apply(get,storage,[CLEANUP+'arm-ack'])),
      retainRequest(Reflect.apply(getAlarm,storage,[])),
      retainRequest(Reflect.apply(get,storage,['afw.qa-finite-trial.v1:head'])),
      retainRequest(Reflect.apply(list,storage,[{prefix:CLEANUP,limit:16}]))
     ]);current(l);verify();
     if(journals.size!==3||journals.get(CLEANUP+'plan')!==planRaw||journals.get(CLEANUP+'state')!==stateRaw||journals.get(CLEANUP+'arm-ack')!==armRaw)fail();
     const plan=decodeCleanup('Plan',planRaw),state=decodeCleanup('State',stateRaw),arm=decodeCleanup('ArmAck',armRaw);
     if(plan.entryHash!==record.entryHash||plan.materialHash!==result.material.materialHash||plan.candidateVersionId!==uploaded.ack.uploadedVersionId||plan.manifestHash!==uploaded.backup.recordHash||state.planHash!==plan.recordHash||state.status!=='pending'||state.deliveries!==0||state.nextAt!==plan.C0||state.previousHash!==null||arm.planHash!==plan.recordHash||arm.stateHash!==state.recordHash||arm.alarmAt!==plan.C0||arm.acknowledgedAt<plan.I0||arm.acknowledgedAt>=plan.forwardDeadline||alarm!==plan.C0||head!==undefined)fail();
     return {plan,state,arm};
    });
    const anchored=await storageCheck(),plan=anchored.plan;
    if(canonical(armed.plan)!==canonical(plan)||canonical(armed.arm)!==canonical(anchored.arm))fail();
    const readCf=async(path,query,cap=262144)=>{
     verify();const suffix=path+(query?'?'+new URLSearchParams(query):''),envelope=(await request(CF,suffix,cap,credential,true)).value;verify();
     return {value:finiteCfEnvelope(envelope),info:envelope.result_info};
    };
    const qa=async()=>{const value=finiteQaPointer(await request(CF,'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1',65536,credential,true));verify();if(canonical(value)!==canonical(result.material.qaBootstrap.currentPointer))fail();};
    const custody=async()=>{
     for(const [loaded,id,expiry]of [[credential,plan.readerId,plan.readerExpiresAt],[publisher,plan.publisherId,plan.publisherExpiresAt]]){
      const value=finiteCfEnvelope((await request(CF,'/tokens/verify',8192,loaded,true)).value);verify();
      fields(value,['id','status','expires_on',...Object.hasOwn(value,'not_before')?['not_before']:[]]);
      if(value.id!==id||value.status!=='active'||Date.parse(value.expires_on)!==expiry||expiry<plan.C1||value.not_before!=null&&(!Number.isSafeInteger(Date.parse(value.not_before))||Date.parse(value.not_before)>Date.now()))fail();
     }
    };
    const [schema,oldGuard,historical,inventory]=await parent.wait(Promise.all([
     readFiniteInitialHistorySchema({env},lease),
     readFiniteInitialOldGuard({env},lease),
     readPrivateQaFiniteHistoricalSource({ctx,env},lease),
     readFiniteInitialAfwWorkflows({read:readCf,assertCurrent:verify,entry:record}),
     qa(),custody()
    ]));verify();
    const h=result.material.historicalEvidence;
    if(schema.schemaVerified!==true||schema.authorizesEffects!==false||oldGuard.guardVerified!==true||oldGuard.historicalDispatch!=='uncertain'||oldGuard.authorizesEffects!==false||inventory.currentInitialObserved!==true||inventory.otherWorkflowsTerminal!==true||inventory.authorizesEffects!==false||hash('afw.finite-historical-artifact-receipt.v1',historical.receipt)!==h.artifactReceiptHash||hash('afw.finite-historical-metadata-proof.v1',historical.metadataProof)!==h.metadataProofHash||hash('afw.finite-historical-bindings.v1',historical.bindings)!==h.bindingsHash||hash('afw.finite-historical-legacy.v1',historical.legacy)!==h.legacyHash||hash('afw.finite-historical-history.v1',historical.history)!==h.historyHash)fail();
    // Fixed primary observations are factual only. Each read remains bounded by
    // the original entry lease and retained by this live stage.
    const W=QA_CLOUD_CLOSED_PINS.canary.name,OP=QA_CLOUD_CLOSED_PINS.operator.name;
    const exactPointer=(value,version,deployment)=>{
     const rows=Array.isArray(value)?value:value?.deployments,d=rows?.[0];
     if(!Array.isArray(rows)||rows.length!==1||d?.id!==deployment||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==version||d.versions[0].percentage!==100)fail();
    };
    const primary=async()=>{
     const [active,canarySchedules,canaryTails,operatorSchedules,operatorTails,operatorPointer,operatorVersion,baseline,candidate,eligible,canaryPointer]=await Promise.all([
      readCf('/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2',{state:'active',per_page:100}),
      readCf('/workers/scripts/'+W+'/schedules'),readCf('/workers/scripts/'+W+'/tails'),
      readCf('/workers/scripts/'+OP+'/schedules'),readCf('/workers/scripts/'+OP+'/tails'),
      readCf('/workers/scripts/'+OP+'/deployments',{per_page:1}),
      readCf('/workers/workers/'+OP+'/versions/'+QA_CLOUD_CLOSED_PINS.operator.id,{include:'modules'},3145728),
      readCf('/workers/workers/'+W+'/versions/'+plan.baselineVersionId,{include:'modules'},3145728),
      readCf('/workers/workers/'+W+'/versions/'+plan.candidateVersionId,{include:'modules'},3145728),
      readCf('/workers/scripts/'+W+'/versions',{deployable:true,per_page:100,page:1}),
      readCf('/workers/scripts/'+W+'/deployments',{per_page:1})
     ]);verify();
     if(!Array.isArray(active.value)||active.value.length||!active.info||active.info.per_page!==100||active.info.next_page_token||active.info.page_token)fail();
     for(const r of [canarySchedules,canaryTails,operatorSchedules,operatorTails]){
      const a=Array.isArray(r.value)?r.value:r.value?.schedules;
      if(!Array.isArray(a)||a.length||r.info&&(r.info.count!==0||r.info.total_count!==0||r.info.cursor))fail();
     }
     const op=QA_CLOUD_CLOSED_PINS.operator;
     exactPointer(operatorPointer.value,op.id,op.deploymentId);
     qualifyFiniteWorkerVersion({metadata:operatorVersion.value,pin:{versionId:op.id,module:op.module,configurationHash:op.configurationHash},role:'operator',closed:true});
     const old=qualifyFiniteInitialHistoricalBaseline(baseline.value);
     if(restorationConfigurationHash(old.rawConfiguration)!==uploaded.backup.rawConfigurationHash||sha(old.bytes)!==uploaded.backup.moduleHash)fail();
     qualifyFiniteInitialUploadedVersion(candidate.value,plan.candidateVersionId,plan.configuration,uploaded.bytes);
     const items=fields(eligible.value,['items']).items;
     if(!Array.isArray(items)||items.length>100||!eligible.info||eligible.info.page!==0||eligible.info.per_page!==100||eligible.info.count!==items.length||eligible.info.total_count!==items.length||eligible.info.total_pages!==undefined||eligible.info.cursor)fail();
     const ids=new Set();let previous=Infinity;
     for(const row of items){if(typeof row.id!=='string'||ids.has(row.id)||!Number.isSafeInteger(row.number)||row.number<1||row.number>=previous)fail();ids.add(row.id);previous=row.number;}
     if(!ids.has(plan.baselineVersionId))fail();
     exactPointer(canaryPointer.value,plan.baselineVersionId,plan.baselineDeploymentId);verify();
    };
    await primary();verify();
    // Refresh mutable history and the complete fixed Workflow inventory under
    // the same admission. They remain observations, not an effect authority.
    const [finalSchema,finalHistorical,finalInventory]=await parent.wait(Promise.all([
     readFiniteInitialHistorySchema({env},lease),
     readPrivateQaFiniteHistoricalSource({ctx,env},lease),
     readFiniteInitialAfwWorkflows({read:readCf,assertCurrent:verify,entry:record})
    ]));verify();
    if(finalSchema.schemaVerified!==true||finalSchema.authorizesEffects!==false||finalInventory.currentInitialObserved!==true||finalInventory.otherWorkflowsTerminal!==true||finalInventory.authorizesEffects!==false||hash('afw.finite-historical-artifact-receipt.v1',finalHistorical.receipt)!==h.artifactReceiptHash||hash('afw.finite-historical-metadata-proof.v1',finalHistorical.metadataProof)!==h.metadataProofHash||hash('afw.finite-historical-bindings.v1',finalHistorical.bindings)!==h.bindingsHash||hash('afw.finite-historical-legacy.v1',finalHistorical.legacy)!==h.legacyHash||hash('afw.finite-historical-history.v1',finalHistorical.history)!==h.historyHash)fail();
    // Serial final reads establish current QA, both custodians and baseline.
    await qa();verify();
    await custody();verify();
    const finalPointer=await readCf('/workers/scripts/'+W+'/deployments',{per_page:1});verify();
    exactPointer(finalPointer.value,plan.baselineVersionId,plan.baselineDeploymentId);
    const after=await storageCheck();if(canonical(after)!==canonical(anchored))fail();verify();
    // Only the original live B1/A continuation can reserve and send.
    await parent.child(async(l,deadline)=>{
     const check=()=>{current(l);verify();};
     const wire=prepareFiniteInitialActivationWire({plan,arm:armed.arm,entry:record,issuedAt:Date.now(),deadline});
     const expected=[['plan','Plan',anchored.plan],['state','State',anchored.state],['arm-ack','ArmAck',anchored.arm]];
     const append=async(key,kind,value,previous)=>{
      check();const raw=encodeCleanup(kind,value);
      const committed=await retainRequest(Reflect.apply(transaction,storage,[async tx=>{
       const getTx=tx.get,putTx=tx.put;
       if(typeof getTx!=='function'||typeof putTx!=='function')fail();
       const read=async k=>{check();if(tx.get!==getTx||tx.put!==putTx)fail();const v=await retainRequest(Reflect.apply(getTx,tx,[k]));check();return v;};
       for(const [k,t,v] of expected)if(await read(CLEANUP+k)!==encodeCleanup(t,v))fail();
       if(await read('afw.qa-finite-trial.v1:head')!==undefined)fail();
       for(const [k,t,v] of previous)if(await read(CLEANUP+k)!==encodeCleanup(t,v))fail();
       for(const k of Object.keys(FINITE_INITIAL_CLEANUP_KINDS))if(!expected.some(x=>x[0]===k)&&!previous.some(x=>x[0]===k)&&await read(CLEANUP+k)!==undefined)return false;
       await retainRequest(Reflect.apply(putTx,tx,[CLEANUP+key,raw]));check();return true;
      }]));check();if(committed!==true)fail();
      await retainRequest(Reflect.apply(sync,storage,[]));check();
      if(await retainRequest(Reflect.apply(get,storage,[CLEANUP+key]))!==raw||await retainRequest(Reflect.apply(getAlarm,storage,[]))!==plan.C0)fail();check();
      decodeCleanup(kind,raw);
     };
     const http=async(method,path,token,body,cap)=>{
      const work=(async()=>{
      check();const response=await retainRequest(fetcher(CF+path,{method,redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body===null?{}:{body})}));let reader;
      try{
       check();const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
       if(!(response instanceof Response)||!(method==='GET'?response.status===200:[200,201].includes(response.status))||response.redirected||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
       reader=response.body.getReader();let size=0;const chunks=[];
       for(;;){const part=await retainRequest(reader.read());check();if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>cap)fail();chunks.push(part.value);}
       if(length!==null&&Number(length)!==size)fail();return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))));
      }finally{if(reader)await retainRequest(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retainRequest(response.body.cancel()).catch(()=>{});}
      })();
      return await retainRequest(work);
     };
     await append('activation-send','ActivationSend',wire.send,[]);check();
     const actual=await http('POST',wire.path,publisher,wire.body,65536);
     const ack=qualifyFiniteInitialActivationAck({plan,send:wire.send,result:actual,acknowledgedAt:Date.now()});
     await append('activation-ack','ActivationAck',ack,[['activation-send','ActivationSend',wire.send]]);check();
     const settledAt=Date.now();
     const pointer=await http('GET','/workers/scripts/'+W+'/deployments?per_page=1',credential,null,65536);
     const rows=Array.isArray(pointer)?pointer:pointer?.deployments;if(!Array.isArray(rows)||rows.length!==1)fail();
     const metadata=await http('GET','/workers/workers/'+W+'/versions/'+plan.candidateVersionId+'?include=modules',credential,null,3145728);
     const completion=qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:rows[0],metadata,bytes:uploaded.bytes,settledAt,observedAt:Date.now()});
     await append('activation-completion','ActivationCompletion',completion,[['activation-send','ActivationSend',wire.send],['activation-ack','ActivationAck',ack]]);check();
     // Factual capsule ONLY in this surviving original activation continuation.
     // Reads are comparisons to actual A/activation results, never replay authority.
     const initial='afw.finite-initial-preparation.v1:';
     const cleanupRows=[...expected,['activation-send','ActivationSend',wire.send],['activation-ack','ActivationAck',ack],['activation-completion','ActivationCompletion',completion]];
     let capsuleRaw;
     const inserted=await retainRequest(Reflect.apply(transaction,storage,[async tx=>{
      const readTx=tx.get,putTx=tx.put;if(typeof readTx!=='function'||typeof putTx!=='function')fail();
      const guard=()=>{check();if(tx.get!==readTx||tx.put!==putTx)fail();};
      const read=async k=>{guard();const raw=await retainRequest(Reflect.apply(readTx,tx,[k]));guard();return raw;};
      if(await read(FINITE_INITIAL_CAPSULE_KEY)!==undefined||await read('afw.qa-finite-trial.v1:head')!==undefined)fail();
      if(await read(KEY)!==encodeFiniteInitialEntry(record))fail();
      const claim=decodeMaterial('InitialClaim',await read(initial+'once'));
      const selector=decodeMaterial('InitialSelector',await read(initial+'selector'));
      const materialAck=decodeMaterial('InitialAck',await read(initial+'ack'));
      producer.assertPublished(result,lease,claim,selector,materialAck);guard();
      if(await read(initial+'material:'+result.material.materialHash)!==encodeMaterial('InitialMaterial',result.material))fail();
      for(const [key,kind,value]of cleanupRows)if(await read(CLEANUP+key)!==encodeCleanup(kind,value))fail();
      for(const key of Object.keys(FINITE_INITIAL_CLEANUP_KINDS))if(!cleanupRows.some(x=>x[0]===key)&&await read(CLEANUP+key)!==undefined)fail();
      if(canonical(plan.configuration)!==canonical(uploaded.configuration)||plan.moduleHash!==sha(uploaded.bytes)||plan.candidateVersionId!==uploaded.ack.uploadedVersionId||uploaded.backup.retainedIds.preconnectionId!==result.material.preconnectionId)fail();
      const capsule=sealFiniteInitialCapsule({entry:record,claim,selector,materialAck,material:result.material,plan,state:anchored.state,arm:anchored.arm,send:wire.send,activationAck:ack,completion,recordedAt:Date.now()});
      capsuleRaw=encodeFiniteInitialCapsule(capsule);guard();
      await retainRequest(Reflect.apply(putTx,tx,[FINITE_INITIAL_CAPSULE_KEY,capsuleRaw]));guard();return true;
     }]));check();if(inserted!==true||typeof capsuleRaw!=='string')fail();
     await retainRequest(Reflect.apply(sync,storage,[]));check();
     const capsuleReadback=await retainRequest(Reflect.apply(get,storage,[FINITE_INITIAL_CAPSULE_KEY]));check();
     if(capsuleReadback!==capsuleRaw)fail();decodeFiniteInitialCapsule(capsuleReadback);
     if(await retainRequest(Reflect.apply(getAlarm,storage,[]))!==plan.C0||await retainRequest(Reflect.apply(get,storage,['afw.qa-finite-trial.v1:head']))!==undefined)fail();check();
    });

   }),lease);
   return safe({status:'material_recorded',entryHash:record.entryHash,materialHash:result.material.materialHash,sourceRevision:expected.sourceRevision,qaVersionId,authorizesEffects:false,completePackage:false,operationalReadiness:false},r);
  }catch{return pending();}finally{parent?.close();}
 }});
}

/** One original native winner only. Not exported, registered, or reconstructible. */
async function publishInitialClosedVersion(ctx,env,entry,producer,result,parent){
 const lease=parent.lease,storage=ctx.storage,transaction=storage.transaction,get=storage.get,sync=storage.sync;
 const fetcher=globalThis.fetch,readerToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publisherToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
 const material=result.material,intent=material.intent,bytes=Uint8Array.from(result.candidateBytes),pin=QA_CLOUD_CLOSED_PINS.canary;
 const refs={entryHash:entry.entryHash,materialHash:material.materialHash,sourceRevision:entry.sourceRevision,sourceTree:entry.sourceTree,qaVersionId:entry.qaVersionId,initialInstanceId:entry.initialInstanceId};
 const prefix='afw.finite-initial-upload.v1:'+entry.entryHash+':',path='/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false';
 const guard=l=>{
  current(l);current(lease);producer.assertCurrent(result,lease);
  if(ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||storage.sync!==sync||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readerToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisherToken||sha(bytes)!==material.originalContext.artifact.workerHash)fail();
 };
 guard(lease);
 if(intent.commandId!==entry.commandId||intent.sourceRevision!==entry.sourceRevision||intent.sourceTree!==entry.sourceTree||intent.qaVersionId!==entry.qaVersionId||intent.initialInstanceId!==entry.initialInstanceId||intent.I0!==entry.I0||intent.initialDeadline!==entry.initialDeadline||sha(bytes)===pin.module.sha256)fail();
 const track=parent.retain;
 async function http(method,suffix,token,body,l,cap=3145728){
  guard(l);const actual=fetcher(CF+suffix,{method,redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...body===null?{}:{body}});
  const response=await track(actual);let stream;
  try{
   guard(l);
   const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
   if(!(response instanceof Response)||!(method==='GET'?response.status===200:[200,201].includes(response.status))||response.redirected||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
   stream=response.body.getReader();const chunks=[];let size=0;
   for(;;){const read=await track(stream.read());guard(l);if(read.done)break;if(!(read.value instanceof Uint8Array)||(size+=read.value.length)>cap)fail();chunks.push(read.value);}
   if(length!==null&&Number(length)!==size)fail();return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))));
  }finally{if(stream)track(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}
 }
 async function custody(l){
  for(const [token,id]of [[readerToken,'9aa97ad1fc9afe3021cf69ea497d5190'],[publisherToken,'05718105dcdfc92e55cc3624172c2740']]){
   const v=await http('GET','/tokens/verify',token,null,l,8192);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
   const expires=Date.parse(v.expires_on);if(v.id!==id||v.status!=='active'||!Number.isSafeInteger(expires)||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
   parent.narrow(expires);expiries[id]=expires;guard(l);
  }
 }
 async function pointer(l){
  const v=await http('GET','/workers/scripts/'+pin.name+'/deployments?per_page=1',readerToken,null,l,65536),d=v?.deployments?.[0];
  if(!Array.isArray(v?.deployments)||v.deployments.length!==1||d?.id!==pin.deploymentId||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==pin.id||d.versions[0].percentage!==100)fail();
  guard(l);return Date.now();
 }
 // Returned true is from the final successful native transaction callback.
 // Existing values never authorize even an identical SEND.
 async function append(entries,l){
  guard(l);const actual=Reflect.apply(transaction,storage,[async tx=>{
   const read=tx.get,write=tx.put;if(typeof read!=='function'||typeof write!=='function')fail();
   const check=()=>{guard(l);if(tx.get!==read||tx.put!==write)fail();};
   for(const [key]of entries){check();const old=await track(Reflect.apply(read,tx,[key]));check();if(old!==undefined)return false;}
   for(const [key,kind,value]of entries){check();await track(Reflect.apply(write,tx,[key,encodeUpload(kind,value)]));check();}
   return true;
  }]);
  const committed=await track(actual);guard(l);if(committed!==true)fail();
 }
 async function durable(entries,l){
  guard(l);await track(Reflect.apply(sync,storage,[]));guard(l);
  for(const [key,kind,value]of entries){const raw=await track(Reflect.apply(get,storage,[key]));guard(l);if(raw!==encodeUpload(kind,value))fail();decodeUpload(kind,raw);}
 }
 const expiries={};
 let beforeObservedAt;
 const baseline=await parent.child(async l=>{
  await custody(l);beforeObservedAt=await pointer(l);
  const v=qualifyFiniteInitialHistoricalBaseline(await http('GET','/workers/workers/'+pin.name+'/versions/'+pin.id+'?include=modules',readerToken,null,l));
  guard(l);return v;
 });
 const projected=buildFiniteInitialUpload(material,baseline,bytes),configuration=projected.configuration,body=projected.body,bodyHash=projected.bodyHash;
 const chunks=[];for(let offset=0;offset<baseline.bytes.length;offset+=32768){const part=baseline.bytes.slice(offset,offset+32768);chunks.push({index:chunks.length,bytes:part.length,sha256:sha(part)});}
 const o=material.originalContext;
 const backup=sealUpload('Backup',{...refs,baselineVersionId:pin.id,baselineDeploymentId:pin.deploymentId,moduleHash:pin.module.sha256,moduleBytes:pin.module.bytes,configurationHash:pin.configurationHash,rawConfigurationHash:restorationConfigurationHash(baseline.rawConfiguration),historicalSourceRevision:baseline.sourceRevision,historicalSourceTree:baseline.sourceTree,rawConfiguration:baseline.rawConfiguration,configuration:baseline.configuration,chunks,retainedIds:{preconnectionId:material.preconnectionId,trialId:o.trialId,activationKey:o.publication.activationKey,withdrawalRequestId:o.withdrawalRequestId,saveIdempotencyKey:o.saveIdempotencyKey}});
 const preserved=[[prefix+'backup','Backup',backup],...chunks.map(c=>[prefix+'chunk:'+String(c.index).padStart(3,'0'),'Chunk',sealUpload('Chunk',{manifestHash:backup.recordHash,...c,content:Buffer.from(baseline.bytes.slice(c.index*32768,c.index*32768+c.bytes)).toString('base64')})])];
 await parent.child(async l=>{await append(preserved,l);await durable(preserved,l);});
 // SEND, actual storage sync/readback, current checks and POST share ONE child.
 const ack=await parent.child(async(l,deadline)=>{
  await custody(l);beforeObservedAt=await pointer(l);guard(l);
  if(sha(body)!==bodyHash)fail();
  const requestHash=hash('afw.finite-initial-upload-request.v1',{method:'POST',path,bodyHash,baselineVersionId:pin.id,baselineDeploymentId:pin.deploymentId});
  const send=sealUpload('Send',{...refs,manifestHash:backup.recordHash,moduleHash:sha(bytes),baselineVersionId:pin.id,baselineDeploymentId:pin.deploymentId,effect:'upload',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:pin.name,method:'POST',path,bodyHash,requestHash,issuedAt:Date.now(),deadline});
  const entries=[[prefix+'send','Send',send]];
  await append(entries,l);await durable(entries,l);guard(l);
  if(sha(body)!==bodyHash||parent.end()<=Date.now())fail();
  const v=await http('POST','/workers/workers/'+pin.name+'/versions?deploy=false',publisherToken,body,l,65536);guard(l);
  fields(v,['id',...Object.hasOwn(v,'exports_reconciliation')?['exports_reconciliation']:[]]);
  if(typeof v.id!=='string'||!/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v.id)||[pin.id,entry.qaVersionId].includes(v.id))fail();
  if(v.exports_reconciliation!==undefined){
   const r=own(v.exports_reconciliation),keys=['created','deleted','renamed','transfer_pending','transferred','updated','removable_entries','info','warnings'];
   if(Object.keys(r).some(k=>!keys.includes(k))||Object.entries(r).some(([k,x])=>!Array.isArray(x)||(k==='updated'?x.some(v=>v!=='AfwOwnEventNode'):x.length>0)))fail();
  }
  const saved=sealUpload('Ack',{sendHash:send.recordHash,uploadedVersionId:v.id,acknowledgedAt:Date.now()}),rows=[[prefix+'ack','Ack',saved]];
  await append(rows,l);await durable(rows,l);return saved;
 });
 const receipt=await parent.child(async l=>{
  await custody(l);
  const actual=await http('GET','/workers/workers/'+pin.name+'/versions/'+ack.uploadedVersionId+'?include=modules',readerToken,null,l);
  qualifyFiniteInitialUploadedVersion(actual,ack.uploadedVersionId,configuration,bytes);guard(l);
  const afterObservedAt=await pointer(l),receipt=sealUpload('Receipt',{...refs,manifestHash:backup.recordHash,sendHash:ack.sendHash,ackHash:ack.recordHash,uploadedVersionId:ack.uploadedVersionId,moduleHash:sha(bytes),configurationHash:restorationConfigurationHash(configuration),baselineVersionId:pin.id,baselineDeploymentId:pin.deploymentId,beforeObservedAt,afterObservedAt,recordedAt:Date.now(),authorizesEffects:false,completePackage:false,operationalReadiness:false});
  const rows=[[prefix+'receipt','Receipt',receipt]];await append(rows,l);await durable(rows,l);guard(l);return receipt;
 });
 // Private actual continuation only: never transported as an RPC admission.
 return {backup,ack,receipt,configuration,bytes,readerToken,publisherToken,expiries};
}

/** Same surviving producer and ORIGINAL parent; never exported or replayed. */
async function armInitialCleanup(ctx,env,entry,producer,result,parent,uploaded){
 const storage=ctx.storage,transaction=storage.transaction,get=storage.get,sync=storage.sync,getAlarm=storage.getAlarm,list=storage.list,fetcher=globalThis.fetch,lease=parent.lease;
 const guard=l=>{current(l);current(lease);producer.assertCurrent(result,lease);if(ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||storage.sync!==sync||storage.getAlarm!==getAlarm||storage.list!==list||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==uploaded.readerToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==uploaded.publisherToken)fail();};
 const receipt=decodeUpload('Receipt',encodeUpload('Receipt',uploaded.receipt)),backup=decodeUpload('Backup',encodeUpload('Backup',uploaded.backup)),ack=decodeUpload('Ack',encodeUpload('Ack',uploaded.ack));
 if(receipt.entryHash!==entry.entryHash||receipt.materialHash!==result.material.materialHash||receipt.manifestHash!==backup.recordHash||receipt.ackHash!==ack.recordHash||receipt.uploadedVersionId!==ack.uploadedVersionId||receipt.moduleHash!==sha(uploaded.bytes)||receipt.configurationHash!==restorationConfigurationHash(uploaded.configuration))fail();
 const C0=entry.I0+900000,C1=C0+180000;
 if(C1>CEILING||uploaded.expiries['9aa97ad1fc9afe3021cf69ea497d5190']<C1||uploaded.expiries['05718105dcdfc92e55cc3624172c2740']<C1)fail();
 const plan=sealCleanup('Plan',{entryHash:entry.entryHash,materialHash:result.material.materialHash,sourceRevision:entry.sourceRevision,sourceTree:entry.sourceTree,qaVersionId:entry.qaVersionId,initialInstanceId:entry.initialInstanceId,commandId:entry.commandId,I0:entry.I0,initialDeadline:entry.initialDeadline,forwardDeadline:entry.operationDeadline,C0,C1,candidateVersionId:ack.uploadedVersionId,moduleHash:receipt.moduleHash,moduleBytes:uploaded.bytes.length,configuration:uploaded.configuration,configurationHash:receipt.configurationHash,manifestHash:backup.recordHash,baselineVersionId:backup.baselineVersionId,baselineDeploymentId:backup.baselineDeploymentId,readerId:'9aa97ad1fc9afe3021cf69ea497d5190',publisherId:'05718105dcdfc92e55cc3624172c2740',readerExpiresAt:uploaded.expiries['9aa97ad1fc9afe3021cf69ea497d5190'],publisherExpiresAt:uploaded.expiries['05718105dcdfc92e55cc3624172c2740']});
 const state=sealCleanup('State',{planHash:plan.recordHash,deliveries:0,status:'pending',nextAt:C0,previousHash:null}),rows=[['plan','Plan',plan],['state','State',state]];
 const arm=await parent.child(async l=>{
  guard(l);
  if(await parent.retain(Reflect.apply(getAlarm,storage,[]))!==null)fail();guard(l);
  const fragments=await parent.retain(Reflect.apply(list,storage,[{prefix:CLEANUP,limit:16}]));guard(l);if(fragments.size!==0)fail();
  const committed=await parent.retain(Reflect.apply(transaction,storage,[async tx=>{
   const read=tx.get,write=tx.put,alarm=tx.setAlarm;if([read,write,alarm].some(x=>typeof x!=='function'))fail();
   const check=()=>{guard(l);if(tx.get!==read||tx.put!==write||tx.setAlarm!==alarm)fail();};
   for(const key of ['afw.qa-finite-trial.v1:head',...Object.keys(FINITE_INITIAL_CLEANUP_KINDS).map(k=>CLEANUP+k)]){check();if(await parent.retain(Reflect.apply(read,tx,[key]))!==undefined)return false;}
   for(const [key,kind,value]of rows){check();await parent.retain(Reflect.apply(write,tx,[CLEANUP+key,encodeCleanup(kind,value)]));check();}
   await parent.retain(Reflect.apply(alarm,tx,[C0]));check();return true;
  }]));guard(l);if(committed!==true)fail();
  await parent.retain(Reflect.apply(sync,storage,[]));guard(l);
  for(const [key,kind,value]of rows){const raw=await parent.retain(Reflect.apply(get,storage,[CLEANUP+key]));guard(l);if(raw!==encodeCleanup(kind,value))fail();decodeCleanup(kind,raw);}
  if(await parent.retain(Reflect.apply(getAlarm,storage,[]))!==C0||await parent.retain(Reflect.apply(get,storage,['afw.qa-finite-trial.v1:head']))!==undefined)fail();guard(l);
  const saved=sealCleanup('ArmAck',{planHash:plan.recordHash,stateHash:state.recordHash,alarmAt:C0,acknowledgedAt:Date.now()}),raw=encodeCleanup('ArmAck',saved);
  const acked=await parent.retain(Reflect.apply(transaction,storage,[async tx=>{
   const read=tx.get,write=tx.put;if([read,write].some(x=>typeof x!=='function'))fail();
   const check=()=>{guard(l);if(tx.get!==read||tx.put!==write)fail();};
   for(const [key,kind,value]of rows){check();if(await parent.retain(Reflect.apply(read,tx,[CLEANUP+key]))!==encodeCleanup(kind,value))fail();}
   check();if(await parent.retain(Reflect.apply(read,tx,[CLEANUP+'arm-ack']))!==undefined||await parent.retain(Reflect.apply(read,tx,['afw.qa-finite-trial.v1:head']))!==undefined)fail();check();
   await parent.retain(Reflect.apply(write,tx,[CLEANUP+'arm-ack',raw]));check();return true;
  }]));guard(l);if(acked!==true)fail();
  await parent.retain(Reflect.apply(sync,storage,[]));guard(l);
  if(await parent.retain(Reflect.apply(get,storage,[CLEANUP+'arm-ack']))!==raw||await parent.retain(Reflect.apply(getAlarm,storage,[]))!==C0||await parent.retain(Reflect.apply(get,storage,['afw.qa-finite-trial.v1:head']))!==undefined)fail();guard(l);return saved;
 });
 return {plan,arm};
}

export const FINITE_INITIAL_PREPARATION_OPERATION='finite_initial_preparation';
/** Real Workflow.run event; account/binding governance, not cryptographic RPC caller proof. */
export async function runPrivateQaFiniteInitialPreparation({env,event,step}){
 let parent;
 try{
  const timestamp=event.timestamp,createdAt=Reflect.apply(nativeTime,timestamp,[]),payload=event.payload,p=own(fields(payload,['operation','commandId','sourceRevision','qaVersionId'])),stepDo=step?.do,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id;
  const r=refs({commandId:p.commandId,sourceRevision:p.sourceRevision,qaVersionId:p.qaVersionId,initialInstanceId:event.instanceId,workflowName:event.workflowName,createdAt});
  if(p.operation!==FINITE_INITIAL_PREPARATION_OPERATION||event.schedule!==undefined||[stepDo,idFromName,namespaceGet].some(x=>typeof x!=='function')||qaVersionId!==r.qaVersionId||r.sourceRevision!==readFiniteQaBootstrapSourceExpectations().sourceRevision)fail();
  const holders=()=>{if(event.timestamp!==timestamp||Reflect.apply(nativeTime,timestamp,[])!==createdAt||event.payload!==payload||canonical(own(fields(payload,['operation','commandId','sourceRevision','qaVersionId'])))!==canonical(p)||event.instanceId!==r.initialInstanceId||event.workflowName!==WORKFLOW||event.schedule!==undefined||step.do!==stepDo||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId)fail();};
  parent=clock(createdAt+30000,holders);
  const actor=Reflect.apply(namespaceGet,self,[Reflect.apply(idFromName,self,[SLOT])]),method=actor.prepareFiniteInitialMaterial;if(typeof method!=='function')fail();
  const actualStep=Reflect.apply(stepDo,step,['finite-initial-preparation',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'30 seconds'},async()=>{
   current(parent.lease);
   const actualRpc=Reflect.apply(method,actor,[r]),result=await parent.wait(actualRpc);
   const data=nativeResult(result,r);current(parent.lease);return data;
  }]);
  const value=await parent.wait(actualStep),data=nativeResult(value,r);
  current(parent.lease);return data;
 }catch{return pending();}finally{parent?.close();}
}
