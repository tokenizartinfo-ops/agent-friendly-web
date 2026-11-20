import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {readPrivateQaFinitePreparationCleanup} from './mcp-qa-finite-preparation-cleanup.mjs';
import {FINITE_PREPARATION_CLEANUP_PREFIX as PREPARATION_CLEANUP,sealFinitePreparationCleanupRecord as sealPreparationCleanup,encodeFinitePreparationCleanupRecord as encodePreparationCleanup} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {decodeFinitePreparationRecord as decodePreparation,hashFiniteOwnerEvidence as ownerEvidence,hashFiniteOwnerPreparationProject as ownerProjectHash} from './mcp-qa-finite-preparation-records.mjs';
import {retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
import {createHash} from 'node:crypto';
import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
const sha=v=>createHash('sha256').update(v).digest('hex');

/** Factual one-shot writer only; callers retain admission and source checks. */
export async function prepareFinitePreparationEnrollmentWrite(options,c,originalDeadline){
 const {ctx,env,preconnectionId,stageApprovalHash}=fields(options,['ctx','env','preconnectionId','stageApprovalHash','ownerSource','baseline','baselineBytes']);
 const owner=validateFiniteOwnerSource(options.ownerSource),baseline=data(options.baseline);
 fields(baseline,['versionId','deploymentId','module','configuration']);validateFiniteModule(baseline.module);
 if(!(options.baselineBytes instanceof Uint8Array))throw Error('Finite policy transport unavailable');
 const baselineBytes=Uint8Array.from(options.baselineBytes);
 let failed=false,stateOfWrite='prepared',ack=null,last=Date.now(),deadline=originalDeadline;
 const fail=()=>{failed=true;throw Error('Finite policy transport unavailable');};
 const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
 const validateBytes=(bytes,descriptor)=>{if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();};
 if(!Number.isSafeInteger(originalDeadline)||originalDeadline<=last||originalDeadline-last>5000)fail();
 const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,signal=c.signal,assertCurrent=c.assertCurrent;
 current(c);
   const get=storage.get,list=storage.list,transaction=storage.transaction,sync=storage.sync,getAlarm=storage.getAlarm;
   const actor=ctx.id,toString=actor.toString,ns=env.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env.AFW_QA_VERSION,qa=metadata?.id;
   if([get,list,transaction,sync,getAlarm,toString,idFromName].some(x=>typeof x!=='function'))fail();
   const check=()=>{if(failed)fail();try{current(c);const at=Date.now();if(c.signal!==signal||c.assertCurrent!==assertCurrent||at<last||at>=deadline||ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||env.AFW_QA_VERSION!==metadata||metadata.id!==qa)fail();last=at;}catch(error){failed=true;throw error;}};
   const io=async(method,args)=>{check();const value=await track(Reflect.apply(method,storage,args));check();return value;};
   const facts=await track(readPrivateQaFiniteInitialAnchors({ctx,env},c));check();
   const {capsule,plan,records,zero,state,anchors,actorId}=facts;
   if(preconnectionId!==capsule.preconnectionId||facts.alarm!==capsule.C0||canonical(state)!==canonical(zero)||Object.keys(records).length!==6||Date.now()<capsule.I0||Date.now()>=capsule.C0||owner.phase!=='closed_ui'||owner.sourceRevision!==capsule.sourceRevision||owner.qaVersionId!==capsule.qaVersionId||owner.actorId!==actorId||owner.window.startedAt!==capsule.I0||owner.window.expiresAt!==capsule.C0||owner.currentPublication.stage!==null||owner.currentPublication.versionId!==capsule.activatedVersionId||owner.currentPublication.deploymentId!==capsule.activatedDeploymentId||baseline.versionId!==capsule.activatedVersionId||baseline.deploymentId!==capsule.activatedDeploymentId||baseline.module.sha256!==capsule.moduleHash||finiteActivationConfigurationHash(baseline.configuration)!==finiteActivationConfigurationHash(plan.configuration))fail();
   validateBytes(baselineBytes,baseline.module);qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:baseline.configuration});
   const prefix='connection-preparation:'+preconnectionId;
   const names=[[prefix+':record','Preconnection'],[prefix+':source','OwnerSourceSnapshot'],[prefix+':connection:approval','StageApproval']];
   const ownerRows=[];for(const [key,kind]of names){const raw=await io(get,[key]);ownerRows.push([key,raw]);decodePreparation(kind,raw);}
   const pre=decodePreparation('Preconnection',ownerRows[0][1]),snapshot=decodePreparation('OwnerSourceSnapshot',ownerRows[1][1]),approval=decodePreparation('StageApproval',ownerRows[2][1]);
   const decisionKey='connection-approval:'+approval.approvalHash,decisionRaw=await io(get,[decisionKey]),decision=decodePreparation('ConfigurationApproval',decisionRaw);ownerRows.push([decisionKey,decisionRaw]);
   const ticketKey='owner-ticket:'+snapshot.initialTicketHash,ticketRaw=await io(get,[ticketKey]),ticket=decodePreparation('Ticket',ticketRaw);
   const useKey=ticketKey+':use',useRaw=await io(get,[useKey]),use=decodePreparation('TicketUse',useRaw),mapKey='owner-project-ref:'+ticket.projectRef,mapRaw=await io(get,[mapKey]),map=decodePreparation('ProjectRef',mapRaw);
   ownerRows.push([ticketKey,ticketRaw],[useKey,useRaw],[mapKey,mapRaw]);
   if(hash('StageApproval',approval)!==stageApprovalHash||canonical(snapshot.source)!==canonical(owner)||pre.preconnectionId!==capsule.preconnectionId||pre.sourceRevision!==owner.sourceRevision||pre.actorId!==owner.actorId||pre.approvalHash!==approval.approvalHash||approval.stage!=='connection'||approval.preconnectionId!==capsule.preconnectionId)fail();
   const childDeadline=Math.min(originalDeadline,capsule.C0,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,owner.window.expiresAt);deadline=childDeadline;check();
   const input={capsuleHash:capsule.capsuleHash,planHash:plan.recordHash,armAckHash:records['arm-ack'].recordHash,activationCompletionHash:records['activation-completion'].recordHash,entryHash:capsule.entryHash,materialHash:capsule.materialHash,actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:stageApprovalHash,configurationApprovalHash:hash('ConfigurationApproval',decision),issuedAt:Date.now(),deadline:childDeadline};
   for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])input[k]=capsule[k];
   for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])input[k]=plan[k];
   const enrollment=sealPreparationCleanup('Enrollment',input),enrollmentRaw=encodePreparationCleanup('Enrollment',enrollment);
   // Immutable exact native transaction, never a resumed writer from old DATA.
   async function append(key,raw,acknowledging=false){
    let entered=false;
    check();const committed=await track(Reflect.apply(transaction,storage,[async tx=>{
     if(entered)fail();entered=true;
     const tg=tx.get,tp=tx.put,tl=tx.list;if([tg,tp,tl].some(x=>typeof x!=='function'))fail();
     const txCheck=()=>{check();if(tx.get!==tg||tx.put!==tp||tx.list!==tl)fail();};
     const read=async k=>{txCheck();const value=await track(Reflect.apply(tg,tx,[k]));txCheck();return value;};
     const rows=async prefix=>{txCheck();const value=await track(Reflect.apply(tl,tx,[{prefix,limit:16}]));txCheck();return value;};
     for(const [k,v]of [...anchors,...ownerRows])if(await read(k)!==v)fail();
     if((await rows('afw.finite-initial-cleanup.v1:')).size!==6||await read('afw.qa-finite-trial.v1:head')!==undefined||(await rows('afw.finite-policy-effect.v1:')).size)fail();
     for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await read(prefix+':'+suffix)!==undefined)fail();
     const ownerScoped=await rows(prefix+':');
     if(ownerScoped.size!==3||[...ownerScoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
     const old=await rows(PREPARATION_CLEANUP);
     if(acknowledging?old.size!==1||old.get(PREPARATION_CLEANUP+'enrollment')!==enrollmentRaw:old.size!==0)fail();
     if(await read(key)!==undefined)fail();
     txCheck();await track(Reflect.apply(tp,tx,[key,raw]));txCheck();return true;
    }]));check();if(committed!==true)fail();
    await io(sync,[]);
    if(await io(get,[key])!==raw||await io(getAlarm,[])!==capsule.C0)fail();
   }
   // Validate real stored owner/project/realm/baseline linkage before the first write.
   const realm=ownerEvidence('realm',{...owner.access,origin:owner.origin}),subject=ownerEvidence('subject',{accessRealmHash:realm,subject:pre.owner.subject}),selection=facts.material.ownerSelection;
   if(ticket.preconnectionId!==capsule.preconnectionId||ticket.ticketHash!==snapshot.initialTicketHash||ticket.sourceRevision!==capsule.sourceRevision||ticket.action!=='connection'||ticket.connectionRef!==null||ticket.subjectHash!==subject||map.preconnectionId!==capsule.preconnectionId||map.sourceRevision!==capsule.sourceRevision||map.subjectHash!==subject||map.projectId!==owner.project.projectId||map.revision!==owner.project.revision||ticket.expiresAt>map.expiresAt||decision.expiresAt>ticket.expiresAt||use.ticketHash!==ticket.ticketHash||use.recordHash!==decision.csrfReceiptHash||decision.csrfReceiptHash!==ownerEvidence('decision',{ticket,decision:'approve',projectHash:ownerProjectHash(pre.project),goal:owner.goal,clientId:pre.clientId,approvedAt:decision.approvedAt,expiresAt:decision.expiresAt})||use.consumedAt<decision.approvedAt||enrollment.issuedAt<use.consumedAt||pre.owner.subject!==selection.subject||pre.owner.accessRealmHash!==realm||decision.subjectHash!==subject||pre.clientId!==owner.clientId||decision.clientId!==pre.clientId||owner.clientId!==selection.clientId||pre.resource!==owner.resource||owner.resource!==selection.resource||ownerProjectHash(pre.project)!==ownerProjectHash(owner.project)||ownerProjectHash(owner.project)!==ownerProjectHash(selection.project)||decision.projectHash!==ownerProjectHash(pre.project)||decision.sourceRevision!==owner.sourceRevision||approval.sourceRevision!==owner.sourceRevision||snapshot.preconnectionId!==capsule.preconnectionId||snapshot.initialTicketHash!==approval.ticketHash||canonical(owner.access)!==canonical(selection.access)||owner.goal!==selection.goal||pre.baselineHash!==ownerEvidence('baseline',owner.initialBaseline)||owner.initialBaseline.versionId!==capsule.activatedVersionId||owner.initialBaseline.deploymentId!==capsule.activatedDeploymentId||owner.initialBaseline.moduleHash!==capsule.moduleHash||owner.initialBaseline.bindingsHash!==capsule.bindingsHash||owner.initialBaseline.configurationHash!==finiteActivationConfigurationHash(plan.configuration))fail();

 return Object.freeze({
  async recordEnrollment(){
   if(stateOfWrite!=='prepared')fail();stateOfWrite='enrolling';
   try{
    check();await append(PREPARATION_CLEANUP+'enrollment',enrollmentRaw);
    const verified=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
    if(verified?.enrollment.recordHash!==enrollment.recordHash||verified.ack!==null)fail();
    // Same literal point as the original writer: after first factual readback,
    // before the caller's second qualified source observation.
    ack=sealPreparationCleanup('Ack',{enrollmentHash:enrollment.recordHash,stateHash:zero.recordHash,alarmAt:capsule.C0,acknowledgedAt:Date.now()});
    if(ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline)fail();
    stateOfWrite='enrolled';return Object.freeze({enrollment,ack:null});
   }catch(error){failed=true;throw error;}
  },
  async recordAck(){
   if(stateOfWrite!=='enrolled')fail();stateOfWrite='acknowledging';
   try{
    check();await append(PREPARATION_CLEANUP+'ack',encodePreparationCleanup('Ack',ack),true);
    const final=await track(readPrivateQaFinitePreparationCleanup({ctx,env},c));check();
    if(final?.ack?.recordHash!==ack.recordHash)fail();
    stateOfWrite='complete';return Object.freeze({enrollment,ack});
   }catch(error){failed=true;throw error;}
  }
 });
}
