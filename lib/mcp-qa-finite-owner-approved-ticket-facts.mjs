import {initialOwn as own,initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode} from './mcp-qa-finite-preparation-records.mjs';
import {createHash} from 'node:crypto';
const fail=()=>{const e=Error('Finite owner preparation unavailable');e.status=403;throw e;};
const sha=x=>createHash('sha256').update(x).digest('hex');
/** Pure predicates; actual owner verification, clocks and all I/O stay with callers. */
export function qualifyFiniteOwnerApprovedTicket(input){
 const v=own(input);fields(v,['source','identity','currentTicket','ticket','use','pre','approval','snapshot','realm','subjectHash','observedAt']);
 const {source,identity,currentTicket,ticket,use,pre,approval,snapshot,realm,subjectHash,observedAt}=v,id=currentTicket.preconnectionId;
 const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(source.project),goal:source.goal,clientId:source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
 if(ticket.preconnectionId!==id||ticket.projectRef!==currentTicket.projectRef||ticket.subjectHash!==subjectHash||use.recordHash!==decision||approval.csrfReceiptHash!==decision||hash('ConfigurationApproval',approval)!==pre.approvalHash||approval.subjectHash!==subjectHash||approval.sourceRevision!==source.sourceRevision||approval.projectHash!==projectHash(source.project)||approval.clientId!==source.clientId||pre.owner.subject!==identity.subject||pre.owner.accessRealmHash!==realm||pre.sourceRevision!==source.sourceRevision||pre.actorId!==source.actorId||pre.clientId!==source.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||pre.baselineHash!==evidence('baseline',snapshot.source.initialBaseline)||!Number.isSafeInteger(observedAt)||observedAt>=Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail();
}
const data=(kind,input)=>decode(kind,encode(kind,own(input)));
export const finiteOwnerAuthorizationLink=input=>data('AuthorizationLink',input);
export const finiteOwnerGrantLink=input=>data('GrantLink',input);
export const finiteOwnerPreconnectionConnection=input=>data('PreconnectionConnection',input);
export const finiteOwnerConnectionRef=input=>data('ConnectionRef',input);
export function qualifyFiniteOwnerConnectionPair(input){
 const v=own(input);fields(v,['source','identity','pre','link','grant','relation','connection','observedAt']);
 const {source,identity,pre,link,grant,observedAt}=v,relation=finiteOwnerPreconnectionConnection(v.relation),connection=finiteOwnerConnectionRef(v.connection);
 if(relation.preconnectionId!==pre.preconnectionId||relation.grantHash!==sha(grant.grantId)||relation.grantHash!==link.grantHash||relation.linkedAt<link.acceptedAt||relation.linkedAt>observedAt||connection.connectionRef!==relation.connectionRef||connection.issuedAt!==relation.linkedAt||connection.subject!==identity.subject||connection.grantId!==grant.grantId||connection.clientId!==source.clientId||connection.projectId!==source.project.projectId||connection.resource!==source.resource||connection.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,Date.parse(grant.expiresAt))||!Number.isSafeInteger(observedAt)||observedAt>=connection.expiresAt)fail();
}
