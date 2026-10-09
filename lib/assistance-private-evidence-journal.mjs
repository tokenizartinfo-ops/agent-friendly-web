import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {validateOccurrenceApproval} from './assistance-occurrence-approvals.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
const CONTRACT='afw-private-evidence-journal/v1',PREFIX=CONTRACT+':',SHA=/^[0-9a-f]{64}$/;
const KINDS=['creation','inventory','cloud-context','cloud-execution','challenge-reception'];
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
const ref=v=>typeof v==='string'&&SHA.test(v),time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Evidence journal unavailable');};
function evidence(value,createdAt,recordedAt){if(!exact(value,['kind','sourceRef','contentDigest','observedAt','supersedes'])||!KINDS.includes(value.kind)||!ref(value.sourceRef)||!ref(value.contentDigest)||!time(value.observedAt)||value.observedAt<createdAt||value.observedAt>recordedAt||(value.supersedes!==null&&!ref(value.supersedes)))fail();return Object.freeze({...value});}
/** References only, private administrative composition. Recording is NOT
 * verification/provisioning authority. Sources must later be resolved from
 * independently observed originals; no raw data, credentials or HTTP mount. */
export function createPrivateEvidenceJournal({storage,readPins,now=Date.now}={}){
 let last=-1;
 const clock=()=>{const t=now();if(!time(t)||t<last)fail();last=t;return t;};
 const source=async recordRef=>{clock();const p=await readPins();clock();if(!exact(p,['registration','approval']))fail();const approval=validateOccurrenceApproval(p.approval),registration=await validateQaClosureApproval(p.registration,approval);if(registration.plan.baselineRef!==recordRef||clock()<registration.provisioning.createdAt)fail();return {registration,digest:await computeAdministrativeResultDigest({registration,approval})};};
 const history=async(tx,recordRef)=>{
  const h=await tx.get(PREFIX+'head:'+recordRef);clock();if(h===undefined)return null;
  const withdrawn=h.state==='withdrawn';if(!exact(h,['recordRef','caseRef','createdAt','pinsDigest','sequence','entryRef','state',...(withdrawn?['withdrawnAt']:[])])||h.recordRef!==recordRef||!ref(h.caseRef)||!ref(h.pinsDigest)||!time(h.createdAt)||h.createdAt>clock()||!Number.isInteger(h.sequence)||h.sequence<1||h.sequence>32||!ref(h.entryRef)||!['recorded','withdrawn'].includes(h.state)||(withdrawn&&(!time(h.withdrawnAt)||h.withdrawnAt>clock())))fail();
  const entries=[];let previousEntryRef=null,priorAt=h.createdAt;
  for(let sequence=1;sequence<=h.sequence;sequence++){
   const e=await tx.get(PREFIX+'entry:'+recordRef+':'+sequence);clock();if(!exact(e,['recordRef','caseRef','sequence','previousEntryRef','evidence','recordedAt','entryRef'])||e.recordRef!==recordRef||e.caseRef!==h.caseRef||e.sequence!==sequence||e.previousEntryRef!==previousEntryRef||!time(e.recordedAt)||e.recordedAt<priorAt||e.recordedAt>clock()||!ref(e.entryRef))fail();
   const body={recordRef:e.recordRef,caseRef:e.caseRef,sequence:e.sequence,previousEntryRef:e.previousEntryRef,evidence:evidence(e.evidence,h.createdAt,e.recordedAt),recordedAt:e.recordedAt};if(await computeAdministrativeResultDigest(body)!==e.entryRef)fail();clock();
   if(body.evidence.supersedes!==null&&!entries.some(old=>old.entryRef===body.evidence.supersedes&&old.evidence.kind===body.evidence.kind))fail();
   entries.push({...body,entryRef:e.entryRef});previousEntryRef=e.entryRef;priorAt=e.recordedAt;
  }
  if(previousEntryRef!==h.entryRef||(withdrawn&&h.withdrawnAt<priorAt))fail();
  return {contract:CONTRACT,...structuredClone(h),entries};
 };
 return Object.freeze({
  async append(recordRef,expectedSequence,value){try{
   if(!ref(recordRef)||!Number.isInteger(expectedSequence)||expectedSequence<0||expectedSequence>=32)return null;
   const first=await source(recordRef),entry=evidence(value,first.registration.provisioning.createdAt,clock());
   const current=async()=>{if((await source(recordRef)).digest!==first.digest)fail();};
   return await storage.transaction(async tx=>{
    await current();const old=await history(tx,recordRef);if((old?.sequence??0)!==expectedSequence||old?.state==='withdrawn'||(old&&(old.pinsDigest!==first.digest||old.caseRef!==first.registration.provisioning.custodyRef||old.createdAt!==first.registration.provisioning.createdAt)))fail();
    if(entry.supersedes!==null&&!old?.entries.some(e=>e.entryRef===entry.supersedes&&e.evidence.kind===entry.kind))fail();
    const sequence=expectedSequence+1,recordedAt=clock(),caseRef=first.registration.provisioning.custodyRef;
    const body={recordRef,caseRef,sequence,previousEntryRef:old?.entryRef??null,evidence:evidence(entry,first.registration.provisioning.createdAt,recordedAt),recordedAt};
    const entryRef=await computeAdministrativeResultDigest(body);clock();await current();
    await tx.put(PREFIX+'entry:'+recordRef+':'+sequence,{...body,entryRef});clock();
    await tx.put(PREFIX+'head:'+recordRef,{recordRef,caseRef,createdAt:first.registration.provisioning.createdAt,pinsDigest:first.digest,sequence,entryRef,state:'recorded'});await current();
    return {contract:CONTRACT,recordRef,state:'recorded',sequence,entryRef};
   });
  }catch{return null;}},
  async history(recordRef){try{if(!ref(recordRef))return null;return await storage.transaction(tx=>history(tx,recordRef));}catch{return null;}},
  async withdraw(recordRef,expectedSequence){try{if(!ref(recordRef)||!Number.isInteger(expectedSequence)||expectedSequence<1||expectedSequence>32)return false;return await storage.transaction(async tx=>{const h=await history(tx,recordRef);if(!h||h.sequence!==expectedSequence||h.state==='withdrawn')return false;const {contract:ignored,entries:ignoredEntries,...head}=h;void ignored;void ignoredEntries;await tx.put(PREFIX+'head:'+recordRef,{...head,state:'withdrawn',withdrawnAt:clock()});clock();return true;});}catch{return false;}},
 });
}
