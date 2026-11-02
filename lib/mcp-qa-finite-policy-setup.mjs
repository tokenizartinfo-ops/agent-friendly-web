import {createHash} from 'node:crypto';
import {readPrivateQaFinitePolicyEntry} from './mcp-qa-finite-policy-setup-source.mjs';
import {readFiniteOwnerSetupFacts} from './mcp-qa-finite-owner-preparation.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {createFinitePolicySetupTransport} from './mcp-qa-finite-policy-transport.mjs';
import {observeFiniteOwnerStageWork,retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
import {hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode} from './mcp-qa-finite-preparation-records.mjs';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {validateReleaseOperatorBundle,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {projectFinitePublicConfiguration,finitePublicStaticExpectation} from './mcp-qa-finite-profile.mjs';
const fail=()=>{throw Error('Finite private policy setup unavailable');};
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
const parents=new WeakMap(),admissions=new WeakMap(),nativeTime=Date.prototype.getTime;
const nativeKeys=['setupInstanceId','sourceRevision','qaVersionId','eventTimestamp','queuedAt','startedAt','T0'];
const current=l=>{if(l?.signal?.aborted||typeof l?.assertCurrent!=='function')fail();l.assertCurrent();};
export const FINITE_POLICY_SETUP_OPERATION='finite_private_policy_setup';
export function finitePolicySetupInstanceId(refs){const r=fields(refs,['intentId','sourceRevision']);if(!hex(r.intentId)||!hex(r.sourceRevision,40))fail();return 'afw-finite-policy-'+digest('afw.finite-private-policy-setup.v1',r);}
function clock(initialEnd,check=()=>{}){
 const entered=Date.now(),mono=performance.now(),controller=new AbortController();let end=Math.min(initialEnd,entered+30000),last=entered,lastMono=mono,closed=false,timer;
 const stop=()=>controller.abort();
 const lease=Object.freeze({signal:controller.signal,assertCurrent(){
  check();const at=Date.now(),m=performance.now();
  if(closed||controller.signal.aborted||!time(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;
 }});
 const narrow=until=>{current(lease);if(!time(until))fail();end=Math.min(end,until);clearTimeout(timer);current(lease);timer=setTimeout(stop,Math.max(1,end-Date.now()));};
 const child=async fn=>{
  current(lease);const wall=Date.now(),m0=performance.now(),childEnd=Math.min(end,wall+5000),c=new AbortController();let alive=true,t,abort;
  const l=Object.freeze({signal:c.signal,assertCurrent(){current(lease);const at=Date.now(),m=performance.now();if(!alive||c.signal.aborted||at<wall||at>=childEnd||m<m0||m-m0>=childEnd-wall)fail();}});
  const work=track(Promise.resolve().then(()=>{current(l);return fn(l,childEnd);}));
  try{return await Promise.race([work,new Promise((_,reject)=>{abort=()=>{alive=false;c.abort();reject(Error('Finite setup parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});t=setTimeout(abort,Math.max(1,childEnd-Date.now()));})]).then(v=>{current(l);return v;});}
  finally{alive=false;c.abort();clearTimeout(t);lease.signal.removeEventListener('abort',abort);}
 };
 const parent={lease,child,narrow,end:()=>end,async wait(promise){
  let abort;try{return await Promise.race([track(promise),new Promise((_,reject)=>{abort=()=>reject(Error('Finite setup parent expired'));lease.signal.addEventListener('abort',abort,{once:true});if(lease.signal.aborted)abort();})]).then(v=>{current(lease);return v;});}
  finally{lease.signal.removeEventListener('abort',abort);}
 },finish(){closed=true;clearTimeout(timer);controller.abort();parents.delete(lease);admissions.delete(lease);}};
 parents.set(lease,parent);narrow(end);return parent;
}
/** INTERNAL narrowing only: cannot create a parent/admission or extend a clock. */
export function narrowFinitePolicySetupClock(originalLease,native,refs,env){
 current(originalLease);const parent=parents.get(originalLease);if(!parent)fail();
 const n=fields(native,nativeKeys),at=Date.now();
 if(n.setupInstanceId!==finitePolicySetupInstanceId(refs)||n.sourceRevision!==refs.sourceRevision||n.qaVersionId!==env.AFW_QA_VERSION?.id||['eventTimestamp','queuedAt','startedAt','T0'].some(k=>!time(n[k]))||n.queuedAt>n.startedAt||n.startedAt>at||n.eventTimestamp>at||n.T0>n.queuedAt||n.T0>n.eventTimestamp)fail();
 parent.narrow(Math.min(n.eventTimestamp,n.queuedAt)+30000);parent.narrow(n.T0+50000);
}
/** Consume-only fixed transport handoff; no setter, lease or capability mint. */
export function consumeFinitePolicySetupAdmission({ctx,env,refs},originalLease){
 const a=admissions.get(originalLease);admissions.delete(originalLease);current(originalLease);
 if(!a||a.ctx!==ctx||a.env!==env||a.storage!==ctx.storage||a.db!==env.RELEASE_DB||canonical(a.refs)!==canonical(fields(refs,['intentId','sourceRevision'])))fail();
 current(a.lease);return a;
}
function derive(facts,refs,binding,env){
 const {source,material,notice}=facts,p=facts.selected.preparation,T0=material.primaryEvidence.T0,N1=T0+300000,C0=T0+240000,C1=T0+420000;
 const o=fields(source.originalContext,['artifact','scope','original','publication','cancellations','retirementPolicy','withdrawalRequestId','saveIdempotencyKey','legacy','trialId']);
 const a=fields(o.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']),descriptor=material.seed.manifest.modules.canaryLive.module;
 fields(descriptor,['name','sha256','bytes','exports']);fields(source.bytes,['baseline','rollback','candidate']);
 const candidateBytes=source.bytes.candidate;
 if(typeof a.script!=='string'||Buffer.byteLength(a.script)>2097152||!(candidateBytes instanceof Uint8Array)||candidateBytes.byteLength!==descriptor.bytes||descriptor.name!=='index.mjs'||sha(candidateBytes)!==descriptor.sha256||a.workerHash!==descriptor.sha256||sha(a.script)!==a.workerHash||!Buffer.from(a.script).equals(Buffer.from(candidateBytes))||a.sourceRevision!==refs.sourceRevision||a.sourceTree!==material.seed.manifest.sourceTree||a.sourceCheck!=='git-inputs-before-after-v1'||!hex(a.programHash)||!hex(o.trialId))fail();
 for(const role of ['baseline','rollback']){
  fields(source[role],['versionId','deploymentId','module','configuration']);
  const bytes=source.bytes[role],m=fields(source[role].module,['name','sha256','bytes']);
  if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==m.bytes||sha(bytes)!==m.sha256)fail();
 }
 const {script:unused,...artifactIdentity}=a;void unused;
 const projection=data({...o,artifact:artifactIdentity});
 if(digest('afw.finite-original-context.v1',projection)!==p.programContext.originalContextHash||o.original.programHash!==p.programContext.programHash||o.original.sourceRevision!==p.programContext.sourceRevision)fail();
 if(source.baseline.versionId!==facts.receipt.versionId||source.baseline.deploymentId!==facts.receipt.deploymentId||source.baseline.module.sha256!==facts.receipt.moduleHash||activationConfigurationHash(source.baseline.configuration)!==facts.receipt.configurationHash)fail();
 validateReleaseOperatorBundle({artifact:a,policy:{operation:'publish',startAt:T0,expiresAt:N1,pins:{...RELEASE_TARGET,baseVersionId:source.baseline.versionId}}});
 const scope=fields(o.scope,['accountId','workerName','namespaceId','applicationId','ownerRef','projectRef','resource']),original=fields(o.original,['containerId','applicationId','programHash','sourceRevision']),publication=fields(o.publication,['artifactKey','workerHash','activationKey']);
 if(scope.accountId!==RELEASE_TARGET.accountId||scope.workerName!==RELEASE_TARGET.workerName||scope.namespaceId!==RELEASE_TARGET.namespaceId||scope.applicationId!==RELEASE_TARGET.namespaceId||env.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()!==original.containerId||scope.resource!==p.connection.resource||publication.workerHash!==a.workerHash||publication.artifactKey!==sha(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,a.workerHash]))||!hex(publication.activationKey))fail();
 const candidate={trialId:o.trialId,programHash:a.programHash,sourceRevision:a.sourceRevision,startAt:T0,expiresAt:N1,budget:1};
 const resolved=resolveSuccessorPreparation({scope,original,candidate,namespace:env.AFW_RELEASE_EVENTS_NODE});
 const history=JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:p.connection.grantId,consentSequence:notice.sequence,consentRevision:notice.revision,issuedAt:notice.issuedAt,expiresAt:notice.expiresAt},cancellations:o.cancellations});
 prepareKnownCancellationHistory(history,candidate);
 const events={grantId:p.connection.grantId,subject:p.owner.subject,projectId:p.project.projectId,clientId:p.connection.clientId,resource:p.connection.resource,startAt:T0,expiresAt:N1};
 if(['grantId','subject','projectId','clientId','resource'].some(k=>typeof events[k]!=='string'||!events[k].length||events[k].length>200||events[k].trim()!==events[k]))fail();
 const withdrawal=JSON.stringify({purpose:'afw.private-permission-withdrawal.v1',requestId:o.withdrawalRequestId,startAt:C0,expiresAt:C1,originalConsent:{sequence:notice.sequence,revision:notice.revision,issuedAt:notice.issuedAt,expiresAt:notice.expiresAt},containerId:resolved.candidate.containerId,programHash:a.programHash,sourceRevision:a.sourceRevision});
 parseOwnPermissionWithdrawalPolicy(withdrawal);
 if(typeof o.retirementPolicy!=='string'||!o.retirementPolicy||Buffer.byteLength(o.retirementPolicy)>4096)fail();
 const policies={AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(events),AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:withdrawal,AFW_DOSSIER_RETIREMENT_POLICY:o.retirementPolicy,AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication}),AFW_OAUTH_PILOT_CLIENT_ID:p.connection.clientId,AFW_OAUTH_PILOT_PROJECT_ID:p.project.projectId};
 const configuration=data({...source.baseline.configuration,bindings:source.baseline.configuration.bindings.map(b=>Object.hasOwn(policies,b.name)?{name:b.name,type:'plain_text',text:policies[b.name]}:b)});
 projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration});
 const publicStatic=finitePublicStaticExpectation('canaryLive');if(canonical(material.seed.manifest.modules.canaryLive.publicStatic)!==canonical(publicStatic))fail();
 const expectedFull={activationHash:activationConfigurationHash(configuration),restorationHash:restorationConfigurationHash(configuration),bindingsHash:sha(canonical([...configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0)))};
 const raw={purpose:'afw.finite-policy-context.v1',...refs,seedHash:material.seedHash,preparationHash:p.preparationHash,selectionHash:facts.selected.selection.selectionHash,bindingHash:hash('Binding',binding),T0,C0,C1,ownerPreparation:p,baselineProjectRevision:p.project.revision,goal:p.goal,saveIdempotencyKey:o.saveIdempotencyKey,legacy:o.legacy,policies,baseline:source.baseline,rollback:source.rollback,expectedFull};
 const context=decode('SetupContext',encode('SetupContext',raw));
 return {context,candidate:{module:{name:descriptor.name,sha256:descriptor.sha256,bytes:descriptor.bytes},configuration,publicStatic},artifact:a,namedContext:data({publication,trialId:o.trialId}),cancellationHistory:history};
}
/** The only actual setup producer. Refs are selectors, never native authority. */
export function createPrivateQaFinitePolicySetup({ctx,env}){
 return Object.freeze({async run(refs){
  let parent;
  try{
   refs=fields(refs,['intentId','sourceRevision']);const setupInstanceId=finitePolicySetupInstanceId(refs),storage=ctx.storage,db=env.RELEASE_DB,version=env.AFW_QA_VERSION?.id;
   parent=clock(Date.now()+30000,()=>{if(ctx.storage!==storage||env.RELEASE_DB!==db||env.AFW_QA_VERSION?.id!==version)fail();});
   // Original invocation lineage only: this denial scope grants no send authority.
   const invocation=Object.freeze({lease:parent.lease});
   return await observeFiniteOwnerStageWork({ctx,env,admission:invocation,originalLease:parent.lease},async()=>{
    const facts=await parent.child(()=>readFiniteOwnerSetupFacts({ctx,env,...refs},parent.lease));current(parent.lease);
    const p=facts.selected.preparation;parent.narrow(Math.min(p.expiresAt,p.owner.accessExpiresAt,p.connection.permissionExpiresAt,p.approval.expiresAt,facts.ownerSource.window.expiresAt,facts.material.primaryEvidence.R1));
    const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
    if(await parent.child(()=>track(storage.get('afw.qa-finite-trial.v1:head')))!==undefined)fail();
    const binding={purpose:'afw.finite-owner-binding.v1',prepId:p.prepId,preparationHash:p.preparationHash,selectionHash:facts.selected.selection.selectionHash,...refs,T0:facts.material.primaryEvidence.T0,boundAt:Date.now()};
    const derived=derive(facts,refs,binding,env);
    const saved=await parent.child(l=>track(store.bindSelection(binding,l)));if(saved.status!=='recorded'||saved.recordHash!==hash('Binding',binding))fail();
    const selected=await parent.child(l=>track(store.readSelected({sourceRevision:refs.sourceRevision},l)));
    if(!selected||canonical(selected.binding)!==canonical(binding)||selected.selection.selectionHash!==binding.selectionHash)fail();
    const c=await parent.child(l=>track(store.putContext(derived.context,l)));if(c.status!=='recorded'||c.recordHash!==hash('SetupContext',derived.context))fail();
    const actual=await parent.child(l=>track(store.readContext(refs,l)));if(encode('SetupContext',actual)!==encode('SetupContext',derived.context))fail();
    await parent.child(l=>facts.source.assertCurrent(l));current(parent.lease);
    const admission=Object.freeze({ctx,env,storage,db,refs,lease:parent.lease,parent,source:facts.source,material:facts.material,setupInstanceId,...derived});
    admissions.set(parent.lease,admission);
    return createFinitePolicySetupTransport({ctx,env}).run(refs,parent.lease);
   });
  }catch{return pending();}finally{parent?.finish();}
 }});
}
/** Original native Workflow entry: fixed source proves route/provenance. */
export async function runFinitePrivatePolicySetup({env,event,step}){
 let parent;
 try{
  const timestamp=event.timestamp,eventTimestamp=Reflect.apply(nativeTime,timestamp,[]),payload=event.payload,x=fields(payload,['operation','intentId','sourceRevision']),refs={intentId:x.intentId,sourceRevision:x.sourceRevision},id=finitePolicySetupInstanceId(refs),version=env.AFW_QA_VERSION?.id,ns=env.AFW_INDEPENDENT_CLOSURE,stepDo=step?.do;
  if(x.operation!==FINITE_POLICY_SETUP_OPERATION||!time(eventTimestamp)||eventTimestamp>Date.now()||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!=='afw-own-qa-private-bootstrap'||typeof stepDo!=='function')fail();
  const own=()=>{if(event.timestamp!==timestamp||Reflect.apply(nativeTime,timestamp,[])!==eventTimestamp||event.payload!==payload||canonical(fields(payload,['operation','intentId','sourceRevision']))!==canonical(x)||event.instanceId!==id||event.schedule!==undefined||event.workflowName!==undefined&&event.workflowName!=='afw-own-qa-private-bootstrap'||env.AFW_QA_VERSION?.id!==version||env.AFW_INDEPENDENT_CLOSURE!==ns||step.do!==stepDo)fail();};
  parent=clock(eventTimestamp+30000,own);
  const native=await parent.child(()=>readPrivateQaFinitePolicyEntry({env,event,step},parent.lease));
  if(native.eventTimestamp!==eventTimestamp)fail();narrowFinitePolicySetupClock(parent.lease,native,refs,env);
  const actor=ns.get(ns.idFromName('afw-own-successor-closure-v1')),setup=actor.setupFinitePrivatePolicy;
  if(typeof setup!=='function')fail();
  const result=await parent.wait(Reflect.apply(stepDo,step,['finite-private-policy-setup',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'30 seconds'},async()=>{
   current(parent.lease);
   const value=await track((async()=>await Reflect.apply(setup,actor,[refs]))());
   try{current(parent.lease);return structuredClone(value);}finally{value?.[Symbol.dispose]?.();}
  }]));
  current(parent.lease);
  if(result?.status!=='installed')return pending();
  fields(result,['status','receipt']);const receipt=decode('PolicyReceipt',encode('PolicyReceipt',result.receipt));
  if(receipt.intentId!==refs.intentId||receipt.sourceRevision!==refs.sourceRevision||receipt.setupInstanceId!==id||receipt.qaVersionId!==version||receipt.installedAt<native.T0||receipt.installedAt>=native.T0+50000||receipt.installedAt>Date.now())fail();
  return Object.freeze({status:'installed',receipt});
 }catch{return pending();}finally{parent?.finish();}
}
