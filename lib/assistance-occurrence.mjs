import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ORIGIN='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const TIMEOUT=10000;
const exact=(value,fields)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===fields.length&&fields.every(key=>Object.hasOwn(value,key));
const stamp=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const fail=()=>{throw Error('Occurrence stopped');};
const fields=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];

/** Finite metadata triage only. Caller supplies a trusted fresh preflight and an
 * exclusive, durable CAS checkpoint. No credential access, activation or retry.
 * A stored attempt is consumed even if its response never arrives. Re-entry
 * must refuse an existing occurrence; recovery is a separate human decision.
 */
export async function runAssistanceOccurrence({manifest,client,checkpoint,preflight,now=Date.now}={}) {
 let phase='preflight',attempts=0,sequence=0,lastTime=-1,owned=false;
 let signal,lease,receipt;
 const clock=()=>{const time=now();if(!stamp(time)||time<lastTime)fail();lastTime=time;return time;};
 const fits=()=>{const time=clock(),end=Math.min(manifest.deadline,manifest.tokenExpiresAt,manifest.serverDeadline,lease?.expiresAt??Infinity);if(time<manifest.startAt||time+TIMEOUT>=end)fail();return time;};
 const save=async state=>{
  const next={...receipt,sequence:sequence+1,phase,state,attempts,observedAt:clock(),...(lease?{runId:lease.runId,leaseExpiresAt:lease.expiresAt}:{})};
  if(await checkpoint.advance(sequence,next)!==true)fail();sequence++;receipt=next;
 };
 const ready=async()=>{
  fits();const observed=await preflight(),time=fits();
  if(!observed||observed.sourceRevision!==manifest.sourceRevision||observed.configId!==manifest.configId||observed.publicationId!==manifest.publicationId||observed.origin!==ORIGIN||observed.observationsCurrent!==true||observed.networkMode!=='restricted'||observed.networkEnforced!==true||observed.operationsBindingsReady!==true||!Number.isSafeInteger(observed.observationRevision)||observed.observationRevision<1||observed.observationRevision!==observed.configurationRevision||!stamp(observed.observedAt)||observed.observedAt>time||time-observed.observedAt>30000)fail();
 };
 const call=async(method,...args)=>{
  await ready();if(attempts>=3)fail();attempts++;await save('attempted');await ready();
  let timer;
  try{
   const response=await Promise.race([client[method](...args),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Occurrence stopped')),TIMEOUT);})]);
   fits();return response;
  }finally{clearTimeout(timer);}
 };
 try{
  if(!exact(manifest,fields)||!['occurrenceId','requestId','sourceRevision','configId','publicationId'].every(key=>typeof manifest[key]==='string')||!UUID.test(manifest.occurrenceId)||!UUID.test(manifest.requestId)||!/^[0-9a-f]{40}$/.test(manifest.sourceRevision)||!/^cecfg_[a-zA-Z0-9]{1,128}$/.test(manifest.configId)||!/^cecfgver_[a-zA-Z0-9]{1,128}$/.test(manifest.publicationId)||!['startAt','deadline','tokenExpiresAt','serverDeadline'].every(key=>stamp(manifest[key]))||typeof preflight!=='function'||typeof checkpoint?.create!=='function'||typeof checkpoint?.advance!=='function'||!['listAssistance','claimAssistance','finishAssistance'].every(key=>typeof client?.[key]==='function'))fail();
  signal=validateAssistanceSignal(manifest.signal);if(!Object.keys(signal).filter(key=>key!=='revision').every(key=>typeof signal[key]==='string'))fail();manifest={...manifest,signal};fits();
  if(Date.parse(signal.observedAt)>clock())fail();
  receipt={version:'afw-assistance-occurrence-v1',occurrenceId:manifest.occurrenceId,eventId:signal.eventId,requestId:manifest.requestId,sequence:0,phase,state:'started',attempts:0,observedAt:clock()};
  if(await checkpoint.create(receipt)!==true)fail();owned=true;
  phase='list';const listed=await call('listAssistance');
  if(!Array.isArray(listed)||listed.length>3)fail();
  const signals=listed.map(validateAssistanceSignal);
  if(new Set(signals.map(x=>x.eventId)).size!==signals.length)fail();
  const selected=signals.find(x=>x.eventId===signal.eventId);
  if(!selected||Object.keys(signal).some(key=>selected[key]!==signal[key]))fail();await save('received');
  phase='claim';const reservation=await call('claimAssistance',signal.eventId,manifest.requestId);
  if(!exact(reservation,['eventId','requestId','runId','expiresAt'])||reservation.eventId!==signal.eventId||reservation.requestId!==manifest.requestId||typeof reservation.runId!=='string'||!UUID.test(reservation.runId)||!stamp(reservation.expiresAt))fail();
  lease={runId:reservation.runId,expiresAt:reservation.expiresAt};fits();await save('received');
  phase='finish';const outcome=await call('finishAssistance',lease.runId,'intervention_required');
  if(!['intervention_required','superseded'].includes(outcome))fail();await save('completed');
  return {status:'completed',outcome,attempts};
 }catch{
  if(owned){try{await save('stopped');}catch{ /* An ambiguous checkpoint is never replayed. */ }}
  return {status:'stopped',phase,attempts};
 }
}
