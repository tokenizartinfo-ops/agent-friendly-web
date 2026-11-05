import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
import {consumeFinitePolicySetupAdmission} from './mcp-qa-finite-policy-setup.mjs';
import {resolveFiniteNamedActivationPlan,validateFiniteNamedCancellationHistory} from './mcp-release-operator-policy.mjs';
import {adoptFiniteOwnerRequestStageWork,retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
import {createHash} from 'node:crypto';
import {consumeFiniteOwnerStageAdmission,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
import {readPrivateQaFiniteConnectionSource} from './mcp-qa-finite-connection-source.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
import {finiteFields as fields} from './mcp-finite-evidence.mjs';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const fail=()=>{throw Error('Finite policy transport unavailable');};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
const observed=v=>{if(v?.status!=='observed'||!v.record)fail();return v.record;};
function validateBytes(bytes,descriptor){
 validateFiniteModule(descriptor);if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();
 return Uint8Array.from(bytes);
}
/** Only effect entry. No caller transport/credential/body/pins or exported mint. */
export function createFinitePolicyTransport({ctx,env}){
 return Object.freeze({run(refs,originalLease){
  const admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:refs?.preconnectionId,stage:refs?.stage},originalLease);
  fields(refs,['preconnectionId','stage']);
  const originalEnd=readFiniteOwnerRequestDeadline(originalLease),lease=admission.lease;
  try{return adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},()=>{
  const track=retainFiniteOwnerStagePromise;
  const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
  let source,deadline=originalEnd,last=Date.now();
  const guard=()=>{current(lease);const at=Date.now();if(at<last||at>=deadline||ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishToken||env.AFW_QA_VERSION?.id!==admission.ownerSource.qaVersionId)fail();last=at;return at;};
  async function child(fn){
   guard();const wall=Date.now(),mono=performance.now(),end=Math.min(deadline,wall+5000),controller=new AbortController();let alive=true,timer,rejectAbort;
   const stop=()=>{alive=false;controller.abort();};
   const c=Object.freeze({signal:controller.signal,assertCurrent(){guard();const at=Date.now(),elapsed=performance.now()-mono;if(!alive||controller.signal.aborted||at<wall||at>=end||elapsed<0||elapsed>=end-wall)fail();}});
   const aborted=new Promise((_,reject)=>{rejectAbort=reject;});
   const abort=()=>{stop();rejectAbort(Error('Finite parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});
   const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{stop();reject(Error('Finite child expired'));},Math.max(1,end-Date.now()));});
   const work=track(Promise.resolve().then(()=>{current(c);return fn(c,end);}));
   try{const value=await Promise.race([work,timeout,aborted]);current(c);return value;}
   finally{stop();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
  }
  async function qualified(c){current(c);await source.assertCurrent(c);current(c);}
  async function enrollPreparationCleanup(c,end){
   current(c);await qualified(c);current(c);
   const writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:refs.preconnectionId,stageApprovalHash:admission.stageApprovalHash,ownerSource:source.ownerSource,baseline:source.baseline,baselineBytes:source.bytes.baseline},c,end);
   await qualified(c);current(c);await writer.recordEnrollment();
   await qualified(c);current(c);await writer.recordAck();
  }
  async function work(){
   guard();if(refs.stage!=='connection')fail();
   source=await child(c=>readPrivateQaFiniteConnectionSource({ctx,env,...refs},c));fields(source,['ownerSource','baseline','rollback','candidate','bytes','assertCurrent']);
   if(typeof source.assertCurrent!=='function'||canonical(validateFiniteOwnerSource(source.ownerSource))!==canonical(admission.ownerSource)||source.ownerSource.phase!=='closed_ui')fail();
   const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
   const pre=observed(await child(c=>store.readPreconnection({preconnectionId:refs.preconnectionId},c))),approval=observed(await child(c=>store.readStageApproval(refs,c)));
   if(hash('StageApproval',approval)!==admission.stageApprovalHash)fail();
   const decision=observed(await child(c=>store.readConfigurationApproval({approvalHash:approval.approvalHash},c)));
   deadline=Math.min(deadline,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,source.ownerSource.window.expiresAt);guard();
   await child(enrollPreparationCleanup);
   // Enrollment ACK is DATA only. Unit2 must qualify every later owner effect.
   return pending();
  }
  const actual=track(Promise.resolve().then(work));
  return actual.then(outcome=>Object.freeze({outcome,admission}),()=>Object.freeze({outcome:pending(),admission}));
  });}catch{return Promise.resolve(Object.freeze({outcome:pending(),admission}));}
 }});
}

/** Separate original native setup admission. Never accepts an owner POST lease. */
export function createFinitePolicySetupTransport({ctx,env}){
 return Object.freeze({async run(refs,originalLease){
  let a,blockingJournal;
  try{
   a=consumeFinitePolicySetupAdmission({ctx,env,refs},originalLease);
   const {source,context,candidate,material,parent}=a,storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
   const guard=()=>{current(originalLease);if(ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||env.AFW_QA_VERSION?.id!==source.native.qaVersionId)fail();return Date.now();};
   const child=fn=>parent.child(fn),engine=createFiniteFixedPolicyEngine({ctx,env},guard),{readPointer,readVersion}=engine,store=createFiniteOwnerPreparationStore({storage,now:Date.now});
   const qualified=async c=>{
    current(c);await source.assertCurrent(c);current(c);
    if(canonical(source.baseline)!==canonical(context.baseline)||canonical(source.rollback)!==canonical(context.rollback))fail();
    const selected=await retainFiniteOwnerStagePromise(store.readSelected({sourceRevision:refs.sourceRevision},c));current(c);
    if(!selected||selected.preparation.preparationHash!==context.preparationHash||selected.selection.selectionHash!==context.selectionHash||!selected.binding||hash('Binding',selected.binding)!==context.bindingHash)fail();
   };
   const identity=effect=>({kind:'policy',...refs,setupInstanceId:a.setupInstanceId,effect}),journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation'),contextHash=hash('SetupContext',context),baseline=context.baseline,rollback=context.rollback;
   const bytes=Object.fromEntries(['baseline','rollback','candidate'].map(k=>[k,validateBytes(source.bytes[k],k==='candidate'?candidate.module:context[k].module)]));
   await child(async c=>{await qualified(c);await readPointer(baseline,c);await readVersion(baseline,c);await readVersion(rollback,c,true);await qualified(c);});
   const first=await child(c=>upload.read(c)),second=await child(c=>activation.read(c));
   if(first.state!=='absent'||second.state!=='absent')fail();
   async function effect(j,effectName,request,operation){
    if(parent.end()-guard()<(effectName==='upload'?10000:5000))fail();
    return child(async(c,end)=>{
     await qualified(c);await readPointer(baseline,c);current(c);
     const send={purpose:'afw.finite-policy-send.v1',...refs,setupInstanceId:a.setupInstanceId,contextHash,effect:effectName,requestHash:digest('afw.finite-policy-request.v1',{method:'POST',path:request.path,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,body:request.body}),issuedAt:Date.now(),deadline:end};
     const claim=await retainFiniteOwnerStagePromise(j.issue(send,c));current(c);
     if(claim.status!=='recorded'||claim.recordHash!==hash('PolicySend',send))fail();blockingJournal=j;
     const read=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(read.state!=='issued'||canonical(read.send)!==canonical(send)||read.ack!==null)fail();
     await qualified(c);current(c);
     const result=await operation(c);current(c);
     const ack={purpose:'afw.finite-policy-ack.v1',sendHash:claim.recordHash,resourceId:result.id,acknowledgedAt:Date.now()};
     const saved=await retainFiniteOwnerStagePromise(j.acknowledge(ack,c));current(c);
     if(saved.status!=='recorded'||saved.recordHash!==hash('PolicyAck',ack))fail();
     const actual=await retainFiniteOwnerStagePromise(j.read(c));current(c);if(actual.state!=='acknowledged'||canonical(actual.ack)!==canonical(ack))fail();
     return result.id;
    });
   }
   const uploadInput={configuration:candidate.configuration,baselineVersionId:baseline.versionId,bytes:bytes.candidate};
   const versionId=await effect(upload,'upload',engine.describeUpload(uploadInput),c=>engine.upload(uploadInput,c));
   if(versionId===baseline.versionId||versionId===rollback.versionId)fail();
   const pin={versionId,module:candidate.module,configuration:candidate.configuration};
   await child(async c=>{await qualified(c);await readVersion(pin,c);await readPointer(baseline,c);await qualified(c);});
   const activationInput={versionId};
   const deploymentId=await effect(activation,'activation',engine.describeActivation(activationInput),c=>engine.activate(activationInput,c));
   if(deploymentId===baseline.deploymentId)fail();
   await child(async c=>{await qualified(c);await readPointer({versionId,deploymentId},c);await readVersion(pin,c);await qualified(c);});
   // Actual observation is now available; never predicted to satisfy Known.
   const publication=a.namedContext.publication,T0=context.T0,N1=T0+300000;
   const bundle={artifact:a.artifact,policy:{operation:'confirm_named',startAt:T0,expiresAt:N1,plan:{activationKey:publication.activationKey,artifactKey:publication.artifactKey,trialId:a.namedContext.trialId,configurationHash:context.expectedFull.activationHash,startAt:T0,expiresAt:N1},observation:{versionId,deploymentId,namespaceId:'d6fc71552de7494a863aca20365a572d',applicationId:'d6fc71552de7494a863aca20365a572d',configuration:candidate.configuration}}};
   const named=resolveFiniteNamedActivationPlan(bundle,env.AFW_RELEASE_EVENTS_NODE);named.current();validateFiniteNamedCancellationHistory(bundle,a.cancellationHistory);
   const raw={purpose:'afw.finite-policy-installed.v1',...refs,setupInstanceId:a.setupInstanceId,qaVersionId:source.native.qaVersionId,seedHash:material.seedHash,contextHash,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId,deploymentId,moduleHash:candidate.module.sha256,publicStaticHash:candidate.publicStatic.configurationHash,...context.expectedFull,installedAt:Date.now()},receipt={...raw,receiptHash:hash('PolicyReceipt',raw)};
   await child(async c=>{
    await qualified(c);const read=await retainFiniteOwnerStagePromise(store.readContext(refs,c));current(c);if(hash('SetupContext',read)!==contextHash)fail();
    const result=await retainFiniteOwnerStagePromise(activation.finish(receipt,c));current(c);if(result.status!=='recorded')fail();
    const actual=await retainFiniteOwnerStagePromise(activation.read(c));current(c);if(actual.state!=='installed'||canonical(actual.receipt)!==canonical(receipt))fail();
    const final=await retainFiniteOwnerStagePromise(store.readContext(refs,c));current(c);if(hash('SetupContext',final)!==contextHash)fail();await qualified(c);
   });
   return Object.freeze({status:'installed',receipt:Object.freeze(receipt)});
  }catch{
   if(a&&blockingJournal)try{await a.parent.child(c=>blockingJournal.markAdminPending({reasonCode:'provider_uncertain',observedAt:Date.now()},c));}catch{}
   return pending();
  }
 }});
}
