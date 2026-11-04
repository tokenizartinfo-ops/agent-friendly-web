import {createHash} from 'node:crypto';
import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash} from './mcp-qa-finite-initial-material-records.mjs';
import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
const fail=()=>{throw Error('Finite installed stage facts unavailable');};
const record=(kind,v)=>decode(kind,encode(kind,v));
const stable=s=>Object.fromEntries(Object.entries(s).filter(([k])=>!['phase','currentPublication'].includes(k)));
/** Pure exact installed-stage DATA. No admission or source qualification. */
export function qualifyFiniteOwnerInstalledStage(input){
 if(arguments.length!==1)fail();
 const v=own(fields(input,['source','preconnection','sourceSnapshot','initialTicket','connection','stage','stageApproval','approval','ticket','ticketUse','upload','activation','predecessors','grantLink','noticeLink','observedAt']));
 const source=validateFiniteOwnerSource(v.source),pre=record('Preconnection',v.preconnection),snapshot=record('OwnerSourceSnapshot',v.sourceSnapshot),initial=record('Ticket',v.initialTicket),sa=record('StageApproval',v.stageApproval),a=record('ConfigurationApproval',v.approval),ticket=record('Ticket',v.ticket),use=record('TicketUse',v.ticketUse),connection=v.connection===null?null:record('ConnectionRef',v.connection),grant=v.grantLink===null?null:record('GrantLink',v.grantLink),notice=v.noticeLink===null?null:record('NoticeLink',v.noticeLink);
 const stages=['connection','notices','finite'],i=stages.indexOf(v.stage),at=v.observedAt,id=pre.preconnectionId;
 if(i<0||!Number.isSafeInteger(at)||at<0||!Array.isArray(v.predecessors)||v.predecessors.length!==i)fail();
 const predecessors=v.predecessors.map((r,n)=>{r=record('ConnectionReceipt',r);if(r.stage!==stages[n]||r.preconnectionId!==id||r.sourceRevision!==source.sourceRevision||r.completedAt>at)fail();const b=n?v.predecessors[n-1]:snapshot.source.initialBaseline;if(r.baselineVersionId!==b.versionId||r.baselineDeploymentId!==b.deploymentId)fail();return r;});
 const baseline=predecessors.at(-1)??snapshot.source.initialBaseline;
 const realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject});
 if(canonical(stable(source))!==canonical(stable(snapshot.source))||snapshot.preconnectionId!==id||snapshot.initialTicketHash!==initial.ticketHash||initial.preconnectionId!==id||initial.action!=='connection'||initial.sourceRevision!==source.sourceRevision||initial.subjectHash!==subject||initial.connectionRef!==null||
 pre.sourceRevision!==source.sourceRevision||pre.actorId!==source.actorId||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||pre.baselineHash!==evidence('baseline',snapshot.source.initialBaseline)||pre.startedAt<source.window.startedAt||pre.expiresAt>source.window.expiresAt)fail();
 const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(source.project),goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
 if(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!==v.stage||ticket.preconnectionId!==id||ticket.sourceRevision!==sa.sourceRevision||ticket.action!==v.stage||ticket.projectRef!==initial.projectRef||ticket.ticketHash!==sa.ticketHash||ticket.subjectHash!==subject||a.subjectHash!==subject||a.sourceRevision!==sa.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(pre.project)||hash('ConfigurationApproval',a)!==sa.approvalHash||use.ticketHash!==ticket.ticketHash||use.recordHash!==decision||a.csrfReceiptHash!==decision||a.approvedAt<pre.startedAt||a.approvedAt<ticket.createdAt||use.consumedAt<a.approvedAt||use.consumedAt>at||a.expiresAt>Math.min(ticket.expiresAt,pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt)||at>=a.expiresAt)fail();
 if(i===0){if(sa.approvalHash!==pre.approvalHash||sa.ticketHash!==snapshot.initialTicketHash||ticket.connectionRef!==null)fail();}
 else if(!connection||ticket.connectionRef!==connection.connectionRef||a.expiresAt>connection.expiresAt||!grant||grant.preconnectionId!==id||grant.grantId!==connection.grantId||grant.grantHash!==createHash('sha256').update(connection.grantId).digest('hex')||connection.subject!==pre.owner.subject||connection.clientId!==source.clientId||connection.projectId!==source.project.projectId||connection.resource!==source.resource)fail();
 if(i===2&&(!notice||notice.preconnectionId!==id||notice.grantHash!==grant.grantHash))fail();
 const journal=(value,effect,expectedState)=>{
  fields(value,['state','send','ack','receipt']);if(value.state!==expectedState)fail();
  const send=record('ConnectionSend',value.send),ack=record('ConnectionAck',value.ack),receipt=value.receipt===null?null:record('ConnectionReceipt',value.receipt);
  if(send.effect!==effect||send.stage!==v.stage||send.preconnectionId!==id||send.sourceRevision!==source.sourceRevision||ack.sendHash!==hash('ConnectionSend',send)||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>at||send.baselineVersionId!==baseline.versionId||send.baselineDeploymentId!==baseline.deploymentId||send.issuedAt<a.approvedAt||send.issuedAt<use.consumedAt||send.deadline>Math.min(a.expiresAt,pre.expiresAt,pre.owner.accessExpiresAt,source.window.expiresAt)||send.deadline-send.issuedAt>5000)fail();
  return {send,ack,receipt};
 };
 const upload=journal(v.upload,'upload','acknowledged'),activation=journal(v.activation,'activation','installed'),receipt=activation.receipt;
 const contextHash=initialHash('afw.finite-connection-context.v1',{preconnection:pre,stageApproval:sa,predecessors,grant:i?grant:null,notice:i===2?notice:null});
 if(upload.receipt!==null||!receipt||receipt.preconnectionId!==id||receipt.stage!==v.stage||receipt.sourceRevision!==source.sourceRevision||receipt.versionId!==upload.ack.resourceId||receipt.deploymentId!==activation.ack.resourceId||receipt.baselineVersionId!==baseline.versionId||receipt.baselineDeploymentId!==baseline.deploymentId||receipt.completedAt<activation.ack.acknowledgedAt||receipt.completedAt<upload.ack.acknowledgedAt||receipt.completedAt>at||receipt.completedAt>=activation.send.deadline||activation.send.issuedAt<upload.ack.acknowledgedAt||upload.send.contextHash!==contextHash||activation.send.contextHash!==contextHash)fail();
 return receipt;
}
