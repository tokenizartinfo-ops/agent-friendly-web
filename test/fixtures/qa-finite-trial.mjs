import {finiteLauncherInstanceId} from '../../lib/mcp-qa-finite-launch-records.mjs';
import {finiteCleanupPolicyHash} from '../../lib/mcp-finite-cleanup-policy.mjs';
import {createHash} from 'node:crypto';
import {PRIVATE_QA_CLOSED_FLAGS} from '../../lib/mcp-qa-closed-context.mjs';
import {generationFixture} from './qa-generation-ledger.mjs';
export const hash=v=>createHash('sha256').update(v).digest('hex');
export const ROOT='afw.qa-finite-trial.v1',HEAD=ROOT+':head';
export const digest=(domain,v)=>hash(domain+'\n'+JSON.stringify(v));
export function finiteFixture({at:override}={}){
 const old=generationFixture();let at=override??old.now()+1000000;
 const T0=at,N1=T0+300000,C0=N1-60000,C1=N1+120000,R1=N1+180000;
 const version='11111111-1111-4111-8111-111111111111',actorId='a'.repeat(64);
 const legacy=old.legacy;
 const prepared={purpose:'afw.private-prepared-dispatch.v1',planHash:legacy.planHash,withdrawalHash:'1'.repeat(64),phase:'issued',issuedAt:legacy.armedAt+1000,completedAt:null,dispatchPolicyHash:'2'.repeat(64)};
 const reduction={purpose:'afw.private-reduction-dispatch.v1',planHash:legacy.planHash,withdrawalHash:'1'.repeat(64),phase:'complete',issuedAt:legacy.armedAt+1000,completedAt:legacy.armedAt+2000};
 const pin=n=>({versionId:version.replace(/^1/,String(n)),deploymentId:version.replace(/^1/,String(n+1)),configurationHash:String(n).repeat(64),module:{name:'worker.mjs',sha256:n===1?'d'.repeat(64):n===3?'0'.repeat(64):String(n).repeat(64),bytes:1024}});
 const plan={
 purpose:'afw.qa-finite-trial-plan.v1',intentId:'finite-test-001',
 command:{kind:'finite_native_confirmation',id:'123',createdAt:T0,repository:'tokenizartinfo-ops/agent-friendly-web',sourceRevision:'b'.repeat(40)},
 source:{revision:'b'.repeat(40),tree:'c'.repeat(40),moduleHash:'d'.repeat(64),profileHash:'e'.repeat(64),bindingsHash:'f'.repeat(64)},
 trialId:'3'.repeat(64),grantHash:hash('current-grant'),monitorHash:'4'.repeat(64),eventPlanHash:'5'.repeat(64),bundleHash:'6'.repeat(64),
 T0,N1,C0,C1,R1,
 resources:{actorId,containerId:'7'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',namespaceId:'8'.repeat(32),qaD1Id:version,releaseD1Id:version.replace(/^1/,'2'),canaryActorId:'9'.repeat(64)},
 deployments:{qaLive:{...pin(1),versionId:version},qaClosed:pin(2),canaryLive:pin(3),canaryClosed:pin(4),operatorClosed:pin(5)},
 canaryContainment:{sourceRevision:'f'.repeat(40),runtimeVersionId:pin(3).versionId,moduleHash:'0'.repeat(64),profileHash:'1'.repeat(64),bindingsHash:'2'.repeat(64)},
 selectors:{grantId:'current-grant',subject:'subject',projectId:'project',clientId:'client',resource:'https://fixed.invalid/mcp',consentHash:'a'.repeat(64),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),startAt:T0,expiresAt:N1,saveIdempotencyKey:'11111111-1111-4111-8111-111111111111',expectedProjectRevision:1,goal:'discovery'},
 withdrawalPolicyHash:'1'.repeat(64),closePolicyHash:'2'.repeat(64),
 launchPolicy:{armAckBy:T0+90000,launchAt:T0+150000,lastCreateAt:T0+160000},
 workflows:{confirmation:'afw-release-'+'6'.repeat(64),bootstrap:'fixed-bootstrap',launcher:finiteLauncherInstanceId({intentId:'finite-test-001',sourceRevision:'b'.repeat(40)})},
 finalizer:{repository:'tokenizartinfo-ops/agent-friendly-web',runId:11,attempt:1,jobId:12,workflow:'afw-finite-finalizer',sourceRevision:'b'.repeat(40),readyStep:'admit-and-ready'},
 legacy:{control:JSON.stringify(legacy),controlHash:hash(JSON.stringify(legacy)),preparedDispatch:JSON.stringify(prepared),preparedDispatchHash:hash(JSON.stringify(prepared)),reductionDispatch:JSON.stringify(reduction),reductionDispatchHash:hash(JSON.stringify(reduction)),restoration:null,retirement:null,sourceRevision:'d'.repeat(40),sourceHash:'e'.repeat(64)}
 };
 plan.closePolicyHash=finiteCleanupPolicyHash(plan);
 let alarm=null,transactions=0,puts=0,chain=Promise.resolve();
 const rows=new Map([['afw.canary-restoration-control.v1',legacy],['afw.private-prepared-dispatch.v1',prepared],['afw.private-reduction-dispatch.v1',reduction]]),lost=new Set();
 const storage={
 get:async k=>structuredClone(rows.get(k)),
 getAlarm:async()=>alarm,
 transaction(fn){const p=chain.then(async()=>{
  const n=++transactions,copy=new Map([...rows].map(([k,v])=>[k,structuredClone(v)]));let nextAlarm=alarm;
  const result=await fn({get:async k=>structuredClone(copy.get(k)),put:async(k,v)=>{puts++;copy.set(k,structuredClone(v));},list:async({prefix,limit})=>new Map([...copy].filter(([k])=>k.startsWith(prefix)).slice(0,limit)),setAlarm:async v=>{nextAlarm=v;},getAlarm:async()=>nextAlarm});
  rows.clear();for(const [k,v]of copy)rows.set(k,v);alarm=nextAlarm;if(lost.has(n))throw Error('lost ACK');return result;
 });chain=p.catch(()=>{});return p;}
 };
 const namespace={idFromName:name=>({toString:()=>name==='afw-own-successor-closure-v1'?actorId:'0'.repeat(64)})};
 const env={AFW_QA_VERSION:{id:version},AFW_INDEPENDENT_CLOSURE:namespace,RELEASE_DB:{},AFW_RELEASE_EVENTS_NODE:{},AFW_RELEASE_READ_TOKEN:'not-accessed'};
 for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])env[k]='true';
 for(const k of PRIVATE_QA_CLOSED_FLAGS)env[k]='false';
 const ctx={storage,id:{toString:()=>actorId}};
 const eventId=hash(JSON.stringify(['afw.own-synthetic-save.v1',plan.selectors.subject,plan.selectors.projectId,plan.selectors.saveIdempotencyKey]));
 const fingerprint=hash(JSON.stringify(['afw.own-synthetic-save.v1',plan.selectors.grantId,1,'discovery']));
 const identity=()=>({intentId:plan.intentId,sourceRevision:plan.source.revision,runtimeVersionId:version,actorId:plan.resources.actorId,planHash:digest(plan.purpose,plan)});
 const admission=()=>({purpose:'afw.qa-finite-primary.v1',...identity(),observedAt:at,command:structuredClone(plan.command),source:structuredClone(plan.source),resources:structuredClone(plan.resources),deployments:structuredClone(plan.deployments),legacyControlHash:plan.legacy.controlHash,legacyPreparedHash:plan.legacy.preparedDispatchHash,legacyReductionHash:plan.legacy.reductionDispatchHash,legacySourceHash:plan.legacy.sourceHash,retainedUncertainty:true,
 containment:{entrypoint:'legacy_saved_event',finiteEntrypoint:'finite_trial_event',sourceRevision:plan.canaryContainment.sourceRevision,runtimeVersionId:plan.canaryContainment.runtimeVersionId,sourceHash:plan.canaryContainment.moduleHash,profileHash:plan.canaryContainment.profileHash,bindingsHash:plan.canaryContainment.bindingsHash,denyBeforeAccess:true,enteredWritersIsolated:true,signedPacketsFenced:true,separateLegacyWritersTerminal:true,legacyGrantRevoked:true,legacyMonitorExpired:true,evidenceHash:'1'.repeat(64)},
 quiescence:{currentWriters:0,newScopeWriters:0,unresolvedWrites:0,completeInventory:true,inventoryHash:'2'.repeat(64),receiptsHash:'3'.repeat(64),snapshotHash:'4'.repeat(64)},
 consent:{grantHash:plan.grantHash,monitorHash:plan.monitorHash,selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),valid:true,expiresAt:N1}});
 const finalizer=()=>({purpose:'afw.qa-finite-finalizer-ready.v1',...identity(),observedAt:at,repository:plan.finalizer.repository,runId:11,attempt:1,sourceRevision:plan.source.revision,intentId:plan.intentId,workflow:plan.finalizer.workflow,status:'in_progress',job:{id:12,status:'in_progress',startedAt:T0,steps:[{name:'admit-and-ready',status:'completed',conclusion:'success',startedAt:T0,completedAt:T0}]},admission:{commandId:'123',controlPlanHash:identity().planHash,R1,resourceHash:digest('afw.qa-finite-resources.v1',plan.resources),custodyHash:'5'.repeat(64),validatedAt:T0},evidenceHash:'6'.repeat(64)});
 const primary={admission:async()=>admission(),finalizer:async()=>finalizer(),subscription:async()=>null,process:async()=>null,savedEvent:async()=>null,effect:async()=>null};
 const facts={
 subscription:()=>({purpose:'afw.qa-finite-subscription.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,subscriptionId:'subscription',processGeneration:'generation',expiresAt:N1,receiptHash:'7'.repeat(64)}),
 process:()=>({purpose:'afw.qa-finite-process.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,processGeneration:'generation',manifestHash:'8'.repeat(64),receiptHash:'9'.repeat(64)}),
 saved_event:()=>({purpose:'afw.qa-finite-saved_event.v1',...identity(),selectorsHash:digest('afw.qa-finite-selectors.v1',plan.selectors),observedAt:at,candidates:1,eventId,revision:2,fingerprint,subscriptionReceiptHash:'7'.repeat(64),processReceiptHash:'9'.repeat(64),receiptHash:'a'.repeat(64)})
 };
 const f={plan,rows,storage,ctx,env,primary,facts,lost,admission,finalizer,now:()=>at,setNow:v=>{at=v;},get alarm(){return alarm;},setAlarm:v=>{alarm=v;},get puts(){return puts;},get transactions(){return transactions;}};
 f.options=api=>({storage,nativePin:api.createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:plan.source.revision}),plan:JSON.stringify(plan),readPrimary:primary,now:f.now,timeoutMs:1000});
 return f;
}
