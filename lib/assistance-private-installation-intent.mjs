import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const CONTRACT='afw-private-installation-intent/v1';
const PREFIX=CONTRACT+':';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const fail=()=>{throw Error('Private installation intent unavailable');};
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const keys=['contract','recordRef','creationRef','ownerRef','reservationSequence','intentId','approvalPinsDigest','occurrenceId','deadline','preparedAt','state','sequence','recordDigest'];
async function write(tx,body,clock){const recordDigest=await computeAdministrativeResultDigest(body);clock();await tx.put(PREFIX+body.recordRef,{...body,recordDigest});clock();return {...body,recordDigest};}
/** Pure primary-tx helpers. Caller must validate the reservation and current pins
 * in this SAME transaction; these states are not D1 installation authority. */
export async function readPrivateInstallationIntent(tx,reservation,clock){
 const raw=await tx.get(PREFIX+reservation.recordRef);clock();if(raw===undefined)return null;
 if(!raw||Object.getPrototypeOf(raw)!==Object.prototype)fail();
 const withdrawn=raw.state==='withdrawn',started=Object.hasOwn(raw,'writeStartedAt');
 const expected=[...keys,...(started?['writeStartedAt']:[]),...(withdrawn?['withdrawnAt']:[])];
 if(Reflect.ownKeys(raw).length!==expected.length||!expected.every(k=>{const d=Object.getOwnPropertyDescriptor(raw,k);return d?.enumerable&&Object.hasOwn(d,'value');})||raw.contract!==CONTRACT||raw.recordRef!==reservation.recordRef||raw.creationRef!==reservation.creationRef||raw.ownerRef!==reservation.recordRef||raw.reservationSequence!==1||raw.approvalPinsDigest!==reservation.approvalPinsDigest||!UUID.test(raw.intentId)||!UUID.test(raw.occurrenceId)||raw.deadline!==reservation.deadline||!time(raw.preparedAt)||raw.preparedAt<reservation.verifiedAt||raw.preparedAt>=raw.deadline||raw.preparedAt>clock()||!['prepared','write_started','withdrawn'].includes(raw.state)||raw.sequence!==(withdrawn?(started?3:2):(started?2:1))||(raw.state==='prepared'&&started)||(raw.state==='write_started'&&!started)||(started&&(!time(raw.writeStartedAt)||raw.writeStartedAt<raw.preparedAt||raw.writeStartedAt>=raw.deadline||raw.writeStartedAt>clock()))||(withdrawn&&(!time(raw.withdrawnAt)||raw.withdrawnAt<(raw.writeStartedAt??raw.preparedAt)||raw.withdrawnAt>clock()))||(reservation.state==='withdrawn'&&!withdrawn))fail();
 const {recordDigest,...body}=raw;if(await computeAdministrativeResultDigest(body)!==recordDigest)fail();clock();return structuredClone(raw);
}
export async function beginPrivateInstallationIntent(tx,reservation,registration,clock){
 const old=await readPrivateInstallationIntent(tx,reservation,clock);if(old){if(old.state==='withdrawn'||old.occurrenceId!==registration.plan.occurrenceId)fail();return old;}
 return write(tx,{contract:CONTRACT,recordRef:reservation.recordRef,creationRef:reservation.creationRef,ownerRef:reservation.recordRef,reservationSequence:1,intentId:crypto.randomUUID(),approvalPinsDigest:reservation.approvalPinsDigest,occurrenceId:registration.plan.occurrenceId,deadline:reservation.deadline,preparedAt:clock(),state:'prepared',sequence:1},clock);
}
export async function startPrivateInstallationWrite(tx,reservation,intentId,expectedSequence,clock,occurrenceId){
 if(expectedSequence!==1||typeof intentId!=='string'||!UUID.test(intentId))return null;
 const old=await readPrivateInstallationIntent(tx,reservation,clock);if(!old||old.intentId!==intentId||old.state!=='prepared'||old.sequence!==1||old.occurrenceId!==occurrenceId)return null;
 const {recordDigest:ignored,...body}=old;void ignored;
 await write(tx,{...body,state:'write_started',sequence:2,writeStartedAt:clock()},clock);
 // Only the initial acknowledged transition returns this ephemeral dispatch
 // locator. History/replays never reconstruct it or permit another D1 INSERT.
 return {contract:'afw-private-installation-dispatch/v1',recordRef:old.recordRef,intentId:old.intentId,sequence:2};
}
export async function withdrawPrivateInstallationIntent(tx,reservation,clock){
 const old=await readPrivateInstallationIntent(tx,reservation,clock);if(!old)return;
 if(old.state==='withdrawn')fail();const {recordDigest:ignored,...body}=old;void ignored;
 await write(tx,{...body,state:'withdrawn',sequence:old.sequence+1,withdrawnAt:clock()},clock);
}
