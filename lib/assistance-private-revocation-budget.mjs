import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const CONTRACT='afw-private-revocation-budget/v1',PREFIX=CONTRACT+':';
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const uuid=v=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v);
const fail=()=>{throw Error('Private revocation unavailable');};
/** Internal checkpoint in the SAME primary transaction. Historical context is
 * not provider authority. No dispatch may be recovered from a stored record. */
export async function checkpointOwnRevocation(tx,context,pinsDigest,clock,operation){
 const r=context.primary.reservation,i=context.primary.intent,d=context.d1;
 if(r.state!=='withdrawn'||!i||!time(i.writeStartedAt)||!d)return null;
 const provenanceDigest=await computeAdministrativeResultDigest(d.provenance);clock();
 const key=PREFIX+r.recordRef,raw=await tx.get(key);clock();
 const base=['contract','recordRef','creationRef','intentId','occurrenceId','pinsDigest','provenanceDigest','attemptId','attemptedAt','state','sequence','recordDigest'];
 if(raw!==undefined){
  const observed=raw?.state==='d1_revocation_observed',keys=[...base,...(observed?['observedAt','causality']:[])];
  if(!raw||Object.getPrototypeOf(raw)!==Object.prototype||Reflect.ownKeys(raw).length!==keys.length||!keys.every(k=>{const p=Object.getOwnPropertyDescriptor(raw,k);return p?.enumerable&&Object.hasOwn(p,'value');})||raw.contract!==CONTRACT||raw.recordRef!==r.recordRef||raw.creationRef!==r.creationRef||raw.intentId!==i.intentId||raw.occurrenceId!==i.occurrenceId||raw.pinsDigest!==pinsDigest||raw.provenanceDigest!==provenanceDigest||!uuid(raw.attemptId)||!time(raw.attemptedAt)||raw.attemptedAt<r.withdrawnAt||raw.attemptedAt>clock()||!['attempted','d1_revocation_observed'].includes(raw.state)||raw.sequence!==(observed?2:1)||(observed&&(!time(raw.observedAt)||raw.observedAt<raw.attemptedAt||raw.observedAt>clock()||raw.causality!=='not-attributed')))fail();
  const {recordDigest,...body}=raw;if(recordDigest!==await computeAdministrativeResultDigest(body))fail();clock();
 }
 if(operation==='start'){
  if(raw!==undefined||d.revoked)return null;
  const body={contract:CONTRACT,recordRef:r.recordRef,creationRef:r.creationRef,intentId:i.intentId,occurrenceId:i.occurrenceId,pinsDigest,provenanceDigest,attemptId:crypto.randomUUID(),attemptedAt:clock(),state:'attempted',sequence:1};
  const recordDigest=await computeAdministrativeResultDigest(body);clock();await tx.put(key,{...body,recordDigest});clock();
  return {contract:'afw-private-revocation-dispatch/v1',recordRef:r.recordRef,intentId:i.intentId,occurrenceId:i.occurrenceId,attemptId:body.attemptId};
 }
 if(operation!=='observe'||!raw||!d.revoked||context.d1ObservedAt<raw.attemptedAt)return null;
 if(raw.state==='d1_revocation_observed')return structuredClone(raw);
 const {recordDigest:ignored,...old}=raw;void ignored;
 const body={...old,state:'d1_revocation_observed',sequence:2,observedAt:context.d1ObservedAt,causality:'not-attributed'};
 const recordDigest=await computeAdministrativeResultDigest(body);clock();await tx.put(key,{...body,recordDigest});clock();return {...body,recordDigest};
}
