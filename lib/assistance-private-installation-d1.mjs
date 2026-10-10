import {validateOccurrenceApproval,approvalColumns,approvalValues} from './assistance-occurrence-approvals.mjs';
import {validateQaClosureApproval} from './assistance-qa-closure-catalog.mjs';
import {computeAdministrativeResultDigest} from './assistance-administrative-closure-readback.mjs';
import {computeOccurrencePlanDigest} from './assistance-occurrence-digest.mjs';
const CONTRACT='afw-private-installation-provenance/v1',UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,HASH=/^[0-9a-f]{64}$/;
const fields=['occurrenceId','intentId','ownerRef','reservationSequence','approvalPinsDigest','approvalDigest','deadline'];
const columns=['occurrence_id','intent_id','owner_ref','reservation_sequence','approval_pins_digest','approval_digest','deadline'];
const exact=(v,keys)=>v&&Object.getPrototypeOf(v)===Object.prototype&&Reflect.ownKeys(v).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(v,k);return d?.enumerable&&Object.hasOwn(d,'value');});
// Snapshot own data descriptors before any asynchronous validation or read.
function snapshot(value){
 let remaining=2048;
 function copy(v,depth){
  if(--remaining<0||depth>12)throw Error('Material exceeds bounds');
  if(v===null||typeof v==='boolean')return v;
  if(typeof v==='string'&&v.length<=8192)return v;
  if(typeof v==='number'&&Number.isFinite(v))return v;
  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==Object.prototype)throw Error('Invalid material');
  const keys=Reflect.ownKeys(v);if(keys.length>32)throw Error('Material exceeds bounds');
  const result={};
  for(const key of keys){
   const descriptor=Object.getOwnPropertyDescriptor(v,key);
   if(typeof key!=='string'||!descriptor?.enumerable||!Object.hasOwn(descriptor,'value'))throw Error('Invalid descriptor');
   Object.defineProperty(result,key,{value:copy(descriptor.value,depth+1),enumerable:true});
  }
  return Object.freeze(result);
 }
 return copy(value,0);
}
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const values=p=>fields.map(k=>p[k]);
const valid=p=>exact(p,['contract',...fields])&&p.contract===CONTRACT&&['occurrenceId','intentId'].every(k=>typeof p[k]==='string'&&UUID.test(p[k]))&&['ownerRef','approvalPinsDigest','approvalDigest'].every(k=>typeof p[k]==='string'&&HASH.test(p[k]))&&p.reservationSequence===1&&time(p.deadline)&&p.deadline>0;
const digest=a=>computeOccurrencePlanDigest({manifest:a.manifest,identityRef:a.identityRef,admissionContract:'server-v1',approval:a});
function approval(row){return validateOccurrenceApproval({manifest:{occurrenceId:row.occurrence_id,requestId:row.request_id,signal:{version:'afw-assistance-event-v1',eventId:row.event_id,projectRef:row.project_ref,revision:row.revision,kind:row.kind,topic:row.topic,observedAt:row.observed_at},sourceRevision:row.source_revision,configId:row.config_id,publicationId:row.publication_id,startAt:row.start_at,deadline:row.deadline,tokenExpiresAt:row.token_expires_at,serverDeadline:row.server_deadline},identityRef:row.identity_ref,enrollmentRef:row.enrollment_ref,serverConfigVersion:row.server_config_version,planRevision:row.plan_revision});}
/** Internal D1 primitive only, unmounted. Validated material is NOT authority.
 * Primary caller owns the single-send budget; an uncertain write must only be
 * reconciled by read. Absence cannot establish that an in-flight write stopped. */
export function createPrivateInstallationD1({db,now=Date.now}={}){
 const primary=typeof db?.withSession==='function'?db.withSession('first-primary'):db;
 if(typeof primary?.prepare!=='function'||typeof primary?.batch!=='function'||typeof now!=='function')throw Error('Private installation storage unavailable');
 async function schema(){try{return (await primary.prepare('SELECT version FROM assistance_occurrence_schema WHERE singleton=1').first())?.version===2&&(await primary.prepare('SELECT generation FROM assistance_occurrence_reservation_fence WHERE singleton=1').first())?.generation===1&&(await primary.prepare('SELECT version FROM assistance_private_installation_schema WHERE singleton=1').first())?.version===1&&(await primary.prepare("SELECT count(*) n FROM sqlite_master WHERE type='trigger' AND name IN ('assistance_private_installation_window','assistance_private_installation_provenance_no_update','assistance_private_installation_provenance_no_delete','assistance_private_installation_schema_no_update','assistance_private_installation_schema_no_delete')").first())?.n===5;}catch{return false;}}
 async function read(occurrenceId){if(typeof occurrenceId!=='string'||!UUID.test(occurrenceId)||!await schema())return null;try{const r=await primary.prepare('SELECT a.*,p.intent_id,p.owner_ref,p.reservation_sequence,p.approval_pins_digest,p.approval_digest,p.deadline AS provenance_deadline,EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations v WHERE v.occurrence_id=a.occurrence_id) AS revoked FROM assistance_occurrence_approved_plans a JOIN assistance_private_installation_provenance p ON p.occurrence_id=a.occurrence_id WHERE a.occurrence_id=?').bind(occurrenceId).first();if(!r)return null;const a=approval(r),p={contract:CONTRACT,occurrenceId:r.occurrence_id,intentId:r.intent_id,ownerRef:r.owner_ref,reservationSequence:r.reservation_sequence,approvalPinsDigest:r.approval_pins_digest,approvalDigest:r.approval_digest,deadline:r.provenance_deadline};if(!valid(p)||p.deadline!==a.manifest.deadline||p.approvalDigest!==await digest(a)||![0,1].includes(r.revoked))return null;return {contract:'afw-private-installation-d1/v1',approval:a,provenance:p,revoked:r.revoked===1};}catch{throw Error('Private installation read unavailable');}}
 return Object.freeze({
  read,
  async write(input){let a,p,checkedAt;try{input=snapshot(input);if(!exact(input,['registration','approval','intent']))return false;a=validateOccurrenceApproval(input.approval);const r=await validateQaClosureApproval(input.registration,a),i=input.intent;if(!exact(i,['contract','recordRef','creationRef','ownerRef','reservationSequence','intentId','approvalPinsDigest','occurrenceId','deadline','preparedAt','state','sequence','recordDigest','writeStartedAt']))return false;const {recordDigest,...body}=i;if(i.contract!=='afw-private-installation-intent/v1'||i.recordRef!==r.plan.baselineRef||i.creationRef!==r.provisioning.creationRef||i.ownerRef!==r.plan.baselineRef||i.reservationSequence!==1||i.occurrenceId!==r.plan.occurrenceId||i.deadline!==r.plan.closeAt||i.state!=='write_started'||i.sequence!==2||!time(i.preparedAt)||i.preparedAt<r.provisioning.createdAt||!time(i.writeStartedAt)||i.writeStartedAt<i.preparedAt||i.writeStartedAt>=Math.min(i.deadline,a.manifest.tokenExpiresAt,a.manifest.serverDeadline)||i.approvalPinsDigest!==await computeAdministrativeResultDigest({registration:input.registration,approval:input.approval})||recordDigest!==await computeAdministrativeResultDigest(body))return false;p={contract:CONTRACT,occurrenceId:i.occurrenceId,intentId:i.intentId,ownerRef:i.ownerRef,reservationSequence:1,approvalPinsDigest:i.approvalPinsDigest,approvalDigest:r.approvalDigest,deadline:i.deadline};const t=now();checkedAt=t;if(!valid(p)||!time(t)||t<i.writeStartedAt||t>=Math.min(i.deadline,a.manifest.tokenExpiresAt,a.manifest.serverDeadline))return false;}catch{return false;}
   if(!await schema())return false;
   // Existing rows, even identical ones without provenance, are never adopted.
   if(await primary.prepare('SELECT occurrence_id FROM assistance_occurrence_approved_plans WHERE occurrence_id=?').bind(p.occurrenceId).first())return false;
   const finalAt=now();if(!time(finalAt)||finalAt<checkedAt||finalAt>=Math.min(p.deadline,a.manifest.tokenExpiresAt,a.manifest.serverDeadline))return false;try{await primary.batch([primary.prepare(`INSERT INTO assistance_occurrence_approved_plans(${approvalColumns.join(',')}) VALUES(${approvalColumns.map(()=>'?').join(',')})`).bind(...approvalValues(a)),primary.prepare(`INSERT INTO assistance_private_installation_provenance(${columns.join(',')}) VALUES(${columns.map(()=>'?').join(',')})`).bind(...values(p))]);return true;}catch(e){if(String(e?.cause?.message??e?.message).includes('UNIQUE constraint failed'))return false;throw Error('Private installation write acknowledgement unavailable');}
  },
  async revoke(p){try{p=snapshot(p);}catch{return false;}if(!valid(p))return false;const observed=await read(p.occurrenceId);if(!observed||fields.some(k=>observed.provenance[k]!==p[k]))return false;if(observed.revoked)return true;try{await primary.prepare(`INSERT INTO assistance_occurrence_plan_revocations(occurrence_id,reason,recorded_at) SELECT a.occurrence_id,'operator_closed',CAST(unixepoch('subsec')*1000 AS INTEGER) FROM assistance_occurrence_approved_plans a JOIN assistance_private_installation_provenance p ON p.occurrence_id=a.occurrence_id WHERE ${columns.map(k=>'p.'+k+'=?').join(' AND ')} AND NOT EXISTS(SELECT 1 FROM assistance_occurrence_plan_revocations v WHERE v.occurrence_id=a.occurrence_id)`).bind(...values(p)).run();return (await read(p.occurrenceId))?.revoked===true;}catch{throw Error('Private installation revocation acknowledgement unavailable');}},
 });
}
