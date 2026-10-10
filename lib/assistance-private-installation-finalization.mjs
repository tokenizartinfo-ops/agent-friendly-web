import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
import {validateOccurrenceApproval,approvalValues} from './assistance-occurrence-approvals.mjs';
import {computeOccurrencePlanDigest} from './assistance-occurrence-digest.mjs';
const CONTRACT='afw-private-installation-finalization/v1';
const PREFIX=CONTRACT+':';
const fields=['contract','recordRef','creationRef','intentId','ownerRef','reservationSequence','approvalPinsDigest','approvalDigest','provenanceDigest','occurrenceId','deadline','confirmedAt','recordDigest'];
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const hash=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Private installation finalization unavailable');};
/** Same-primary transaction helpers only. A receipt records a historical D1
 * observation, never distributed atomicity, a dispatch permit or admission. */
export async function readPrivateInstallationFinalization(tx,reservation,intent,clock){
 const raw=await tx.get(PREFIX+reservation.recordRef);clock();if(raw===undefined)return null;
 if(!intent||!exact(raw,fields)||raw.contract!==CONTRACT||raw.recordRef!==reservation.recordRef||raw.creationRef!==reservation.creationRef||raw.intentId!==intent.intentId||raw.ownerRef!==reservation.recordRef||raw.reservationSequence!==1||raw.approvalPinsDigest!==reservation.approvalPinsDigest||!hash(raw.approvalDigest)||!hash(raw.provenanceDigest)||raw.occurrenceId!==intent.occurrenceId||raw.deadline!==reservation.deadline||!time(raw.confirmedAt)||!time(intent.writeStartedAt)||raw.confirmedAt<intent.writeStartedAt||raw.confirmedAt>=raw.deadline||raw.confirmedAt>clock()||(intent.state==='withdrawn'&&raw.confirmedAt>intent.withdrawnAt)||(reservation.state==='withdrawn'&&raw.confirmedAt>reservation.withdrawnAt))fail();
 const {recordDigest,...body}=raw;if(await computeAdministrativeResultDigest(body)!==recordDigest)fail();clock();return structuredClone(raw);
}
export async function finalizePrivateInstallation(tx,reservation,intent,approval,d1,clock,{create=true}={}){
 if(reservation.state!=='reserved'||intent?.state!=='write_started')return null;
 if(!exact(d1,['contract','approval','provenance','revoked'])||d1.contract!=='afw-private-installation-d1/v1'||d1.revoked!==false)return null;
 const observed=validateOccurrenceApproval(d1.approval),p=d1.provenance;
 if(!approvalValues(observed).every((v,i)=>v===approvalValues(approval)[i]))return null;
 const approvalDigest=await computeOccurrencePlanDigest({manifest:approval.manifest,identityRef:approval.identityRef,admissionContract:'server-v1',approval});clock();
 if(!exact(p,['contract','occurrenceId','intentId','ownerRef','reservationSequence','approvalPinsDigest','approvalDigest','deadline'])||p.contract!=='afw-private-installation-provenance/v1'||p.occurrenceId!==intent.occurrenceId||p.intentId!==intent.intentId||p.ownerRef!==reservation.recordRef||p.reservationSequence!==1||p.approvalPinsDigest!==reservation.approvalPinsDigest||p.approvalDigest!==approvalDigest||p.deadline!==reservation.deadline)return null;
 const provenanceDigest=await computeAdministrativeResultDigest(p);clock();
 const previous=await readPrivateInstallationFinalization(tx,reservation,intent,clock);
 if(previous){if(previous.approvalDigest!==approvalDigest||previous.provenanceDigest!==provenanceDigest)fail();return previous;}
 if(!create)return null;
 const body={contract:CONTRACT,recordRef:reservation.recordRef,creationRef:reservation.creationRef,intentId:intent.intentId,ownerRef:reservation.recordRef,reservationSequence:1,approvalPinsDigest:reservation.approvalPinsDigest,approvalDigest,provenanceDigest,occurrenceId:intent.occurrenceId,deadline:reservation.deadline,confirmedAt:clock()};
 const recordDigest=await computeAdministrativeResultDigest(body);clock();await tx.put(PREFIX+reservation.recordRef,{...body,recordDigest});clock();return {...body,recordDigest};
}
