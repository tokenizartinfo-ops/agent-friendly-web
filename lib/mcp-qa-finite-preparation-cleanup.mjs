import {finitePublicProfileTemplate} from './mcp-qa-finite-profile.mjs';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {FINITE_PREPARATION_CLEANUP_PREFIX as P,decodeFinitePreparationCleanupRecord as decode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {decodeFinitePreparationRecord as prep,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
import {initialCanonical as canonical} from './mcp-qa-finite-initial-material-records.mjs';
const fail=()=>{throw Error('Finite preparation cleanup unavailable');};
/** Factual recovery DATA only; no admission, enrollment writer or readiness. */
export async function readPrivateQaFinitePreparationCleanup({ctx,env},originalLease){
 const storage=ctx?.storage,get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync,getAlarm=storage?.getAlarm,actor=ctx?.id,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,ns=env?.AFW_INDEPENDENT_CLOSURE,db=env?.RELEASE_DB,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 const guard=()=>{originalLease.assertCurrent();if(originalLease.signal.aborted||ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.AFW_INDEPENDENT_CLOSURE!==ns||env.RELEASE_DB!==db||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
 if([get,list,transaction,sync,getAlarm].some(x=>typeof x!=='function'))fail();
 const io=async(method,args)=>{guard();const value=await retain(Reflect.apply(method,storage,args));guard();return value;};
 const rows=await io(list,[{prefix:P,limit:3}]);
 if(rows.size===0)return null;
 if(rows.size>2||!rows.has(P+'enrollment')||[...rows.keys()].some(k=>![P+'enrollment',P+'ack'].includes(k)))fail();
 const enrollment=decode('Enrollment',rows.get(P+'enrollment')),ack=rows.has(P+'ack')?decode('Ack',rows.get(P+'ack')):null;
 const a=await retain(readPrivateQaFiniteInitialAnchors({ctx,env},originalLease));guard();
 const {capsule:c,plan:p,zero,records:r}=a;
 const expected={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:a.actorId};
 for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])expected[k]=c[k];
 for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])expected[k]=p[k];
 for(const [k,v]of Object.entries(expected))if(enrollment[k]!==v)fail();
 if(ack&&(ack.enrollmentHash!==enrollment.recordHash||ack.stateHash!==zero.recordHash||ack.alarmAt!==c.C0||ack.acknowledgedAt<enrollment.issuedAt||ack.acknowledgedAt>=enrollment.deadline))fail();
 if(await io(get,['afw.qa-finite-trial.v1:head'])!==undefined||(await io(list,[{prefix:'afw.finite-policy-effect.v1:',limit:1}])).size)fail();
 const prefix='connection-preparation:'+c.preconnectionId;
 const read=async(k,kind)=>prep(kind,await io(get,[k]));
 const pre=await read(prefix+':record','Preconnection'),snapshot=await read(prefix+':source','OwnerSourceSnapshot'),stage=await read(prefix+':connection:approval','StageApproval'),approval=await read('connection-approval:'+stage.approvalHash,'ConfigurationApproval'),source=snapshot.source,selection=a.material.ownerSelection;
 const ticket=await read('owner-ticket:'+snapshot.initialTicketHash,'Ticket'),use=await read('owner-ticket:'+snapshot.initialTicketHash+':use','TicketUse'),map=await read('owner-project-ref:'+ticket.projectRef,'ProjectRef');
 const scoped=await io(list,[{prefix:prefix+':',limit:16}]);
 if(scoped.size!==3||[...scoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
 const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
 if(ticket.preconnectionId!==c.preconnectionId||ticket.action!=='connection'||ticket.connectionRef!==null||ticket.ticketHash!==snapshot.initialTicketHash||ticket.sourceRevision!==c.sourceRevision||map.preconnectionId!==c.preconnectionId||map.sourceRevision!==c.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||ticket.subjectHash!==subject||ticket.expiresAt>map.expiresAt||approval.expiresAt>ticket.expiresAt||use.ticketHash!==ticket.ticketHash||use.recordHash!==approval.csrfReceiptHash||approval.csrfReceiptHash!==evidence('decision',{ticket,decision:'approve',projectHash:projectHash(pre.project),goal:source.goal,clientId:pre.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt})||use.consumedAt<approval.approvedAt||enrollment.issuedAt<use.consumedAt||
 enrollment.ownerSourceHash!==snapshot.sourceHash||enrollment.preconnectionHash!==pre.recordHash||enrollment.stageApprovalHash!==hash('StageApproval',stage)||enrollment.configurationApprovalHash!==hash('ConfigurationApproval',approval)||pre.approvalHash!==stage.approvalHash||pre.preconnectionId!==c.preconnectionId||snapshot.preconnectionId!==c.preconnectionId||stage.preconnectionId!==c.preconnectionId||stage.stage!=='connection'||stage.ticketHash!==snapshot.initialTicketHash||
 source.qaNamespaceId!==finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id||source.phase!=='closed_ui'||source.actorId!==a.actorId||source.sourceRevision!==c.sourceRevision||source.qaVersionId!==c.qaVersionId||source.window.startedAt!==c.I0||source.window.expiresAt!==c.C0||source.currentPublication.stage!==null||source.currentPublication.versionId!==c.activatedVersionId||source.currentPublication.deploymentId!==c.activatedDeploymentId||
 pre.sourceRevision!==source.sourceRevision||stage.sourceRevision!==source.sourceRevision||approval.sourceRevision!==source.sourceRevision||pre.actorId!==a.actorId||pre.owner.subject!==selection.subject||pre.owner.accessRealmHash!==realm||approval.subjectHash!==subject||projectHash(pre.project)!==projectHash(source.project)||projectHash(source.project)!==projectHash(selection.project)||approval.projectHash!==projectHash(pre.project)||pre.clientId!==source.clientId||approval.clientId!==pre.clientId||source.clientId!==selection.clientId||pre.resource!==source.resource||source.resource!==selection.resource||canonical(source.access)!==canonical(selection.access)||source.goal!==selection.goal||pre.baselineHash!==evidence('baseline',source.initialBaseline)||
 source.initialBaseline.versionId!==c.activatedVersionId||source.initialBaseline.deploymentId!==c.activatedDeploymentId||source.initialBaseline.moduleHash!==c.moduleHash||source.initialBaseline.bindingsHash!==c.bindingsHash||source.initialBaseline.configurationHash!==activationConfigurationHash(p.configuration)||enrollment.issuedAt<pre.startedAt||enrollment.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail();
 // Any later permission or nominal effect requires Unit2, never this fallback.
 for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await io(get,[prefix+':'+suffix])!==undefined)fail();
 for(const [k,v]of rows)if(await io(get,[k])!==v)fail();
 guard();return Object.freeze({enrollment,ack});
}
