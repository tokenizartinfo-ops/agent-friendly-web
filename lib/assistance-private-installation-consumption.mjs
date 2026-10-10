import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const CONTRACT='afw-private-installation-consumption/v1';
const PREFIX=CONTRACT+':';
const keys=['contract','recordRef','creationRef','intentId','ownerRef','occurrenceId','approvalPinsDigest','finalizationDigest','admissionId','consumedAt','deadline','state','sequence','recordDigest'];
const uuid=v=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v);
const exact=(v,fields)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===fields.length&&fields.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Private installation consumption unavailable');};
/** Same-primary helpers. Historical receipt is not a dispatch permit. */
export async function readPrivateInstallationConsumption(tx,reservation,intent,finalization,clock){
 const raw=await tx.get(PREFIX+reservation.recordRef);clock();if(raw===undefined)return null;
 if(!intent||!finalization||!exact(raw,keys)||raw.contract!==CONTRACT||raw.recordRef!==reservation.recordRef||raw.creationRef!==reservation.creationRef||raw.intentId!==intent.intentId||raw.ownerRef!==reservation.recordRef||raw.occurrenceId!==intent.occurrenceId||raw.approvalPinsDigest!==reservation.approvalPinsDigest||raw.finalizationDigest!==finalization.recordDigest||!uuid(raw.admissionId)||!time(raw.consumedAt)||raw.consumedAt<finalization.confirmedAt||raw.consumedAt>=reservation.deadline||raw.consumedAt>clock()||raw.deadline!==reservation.deadline||raw.state!=='consumed'||raw.sequence!==1||(intent.state==='withdrawn'&&raw.consumedAt>intent.withdrawnAt)||(reservation.state==='withdrawn'&&raw.consumedAt>reservation.withdrawnAt))fail();
 const {recordDigest,...body}=raw;
 if(await computeAdministrativeResultDigest(body)!==recordDigest)fail();clock();return structuredClone(raw);
}
export async function consumePrivateInstallation(tx,reservation,intent,finalization,clock){
 if(reservation.state!=='reserved'||intent?.state!=='write_started'||!finalization)return null;
 if(await readPrivateInstallationConsumption(tx,reservation,intent,finalization,clock))return null;
 const body={contract:CONTRACT,recordRef:reservation.recordRef,creationRef:reservation.creationRef,intentId:intent.intentId,ownerRef:reservation.recordRef,occurrenceId:intent.occurrenceId,approvalPinsDigest:reservation.approvalPinsDigest,finalizationDigest:finalization.recordDigest,admissionId:crypto.randomUUID(),consumedAt:clock(),deadline:reservation.deadline,state:'consumed',sequence:1};
 const recordDigest=await computeAdministrativeResultDigest(body);clock();
 await tx.put(PREFIX+reservation.recordRef,{...body,recordDigest});clock();
 // Only the first acknowledged transition returns this internal locator.
 // Replays, history and a lost ACK never reconstruct permission to dispatch.
 return {contract:'afw-private-installation-consumption-dispatch/v1',recordRef:body.recordRef,intentId:body.intentId,occurrenceId:body.occurrenceId,admissionId:body.admissionId};
}
