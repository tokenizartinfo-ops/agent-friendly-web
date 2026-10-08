import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
const HASH=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
export const revision=v=>Number.isSafeInteger(v)&&v>=1;
export const timestamp=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const mf=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];
const fail=()=>{throw Error('Invalid occurrence approval');};
export function validateOccurrenceManifest(value){
 const m=value;if(!exact(m,mf)||!['occurrenceId','requestId'].every(k=>typeof m[k]==='string'&&UUID.test(m[k]))||typeof m.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(m.sourceRevision)||typeof m.configId!=='string'||!/^cecfg_[a-zA-Z0-9]{1,128}$/.test(m.configId)||typeof m.publicationId!=='string'||!/^cecfgver_[a-zA-Z0-9]{1,128}$/.test(m.publicationId)||!['startAt','deadline','tokenExpiresAt','serverDeadline'].every(k=>timestamp(m[k]))||['deadline','tokenExpiresAt','serverDeadline'].some(k=>m[k]<=m.startAt))fail();
 let signal;try{signal=validateAssistanceSignal(m.signal);}catch{fail();}
 if(!Object.entries(signal).every(([k,v])=>k==='revision'||typeof v==='string'))fail();
 return Object.freeze({...m,signal:Object.freeze({...signal})});
}
export function validateOccurrenceApproval(value){
 if(!exact(value,['manifest','identityRef','enrollmentRef','serverConfigVersion','planRevision'])||!['identityRef','enrollmentRef','serverConfigVersion'].every(k=>typeof value[k]==='string'&&HASH.test(value[k]))||!revision(value.planRevision))fail();
 return Object.freeze({...value,manifest:validateOccurrenceManifest(value.manifest)});
}

export const approvalColumns=['occurrence_id','request_id','event_id','project_ref','revision','kind','topic','observed_at','source_revision','config_id','publication_id','start_at','deadline','token_expires_at','server_deadline','identity_ref','enrollment_ref','server_config_version','plan_revision'];
export function approvalValues(a){const m=a.manifest,s=m.signal;return [m.occurrenceId,m.requestId,s.eventId,s.projectRef,s.revision,s.kind,s.topic,s.observedAt,m.sourceRevision,m.configId,m.publicationId,m.startAt,m.deadline,m.tokenExpiresAt,m.serverDeadline,a.identityRef,a.enrollmentRef,a.serverConfigVersion,a.planRevision];}
export function validServerAdmission(o,a,t){return exact(o,['contractVersion','serverConfigVersion','planRevision','admissionRevision','observedAt','identityRef','enrollmentRef','schemaVersion'])&&o.contractVersion==='afw-server-admission-v1'&&o.schemaVersion===2&&o.serverConfigVersion===a.serverConfigVersion&&o.identityRef===a.identityRef&&o.enrollmentRef===a.enrollmentRef&&o.planRevision===a.planRevision&&revision(o.admissionRevision)&&timestamp(o.observedAt)&&o.observedAt<=t&&t-o.observedAt<=30000;}
/** Internal server-owned catalog only. No consumer SQL, secrets or arbitrary JSON. */
export function createOccurrenceApprovalCatalog({db}={}){
 if(typeof db?.prepare!=='function'||typeof db?.batch!=='function')fail();
 async function schema(fenced=false){try{return (await db.prepare('SELECT version FROM assistance_occurrence_schema WHERE singleton=1').first())?.version===2&&(!fenced||(await db.prepare('SELECT generation FROM assistance_occurrence_reservation_fence WHERE singleton=1').first())?.generation===1);}catch{return false;}}
 return {
  async approve(value){const a=validateOccurrenceApproval(value);if(!await schema(true))return false;try{await db.prepare(`INSERT INTO assistance_occurrence_approved_plans(${approvalColumns.join(',')}) VALUES(${approvalColumns.map(()=>'?').join(',')})`).bind(...approvalValues(a)).run();return true;}catch(e){if(String(e?.cause?.message??e?.message).includes('UNIQUE constraint failed')||String(e?.cause?.message??e?.message).includes('Occurrence denied'))return false;throw Error('Occurrence approval storage unavailable');}},
  async read(occurrenceId){if(typeof occurrenceId!=='string'||!UUID.test(occurrenceId))fail();if(!await schema())return null;try{const r=await db.prepare('SELECT * FROM assistance_occurrence_approved_plans WHERE occurrence_id=?').bind(occurrenceId).first();if(!r)return null;const revoked=Boolean(await db.prepare('SELECT occurrence_id FROM assistance_occurrence_plan_revocations WHERE occurrence_id=?').bind(occurrenceId).first());return Object.freeze({approval:validateOccurrenceApproval({manifest:{occurrenceId:r.occurrence_id,requestId:r.request_id,signal:{version:'afw-assistance-event-v1',eventId:r.event_id,projectRef:r.project_ref,revision:r.revision,kind:r.kind,topic:r.topic,observedAt:r.observed_at},sourceRevision:r.source_revision,configId:r.config_id,publicationId:r.publication_id,startAt:r.start_at,deadline:r.deadline,tokenExpiresAt:r.token_expires_at,serverDeadline:r.server_deadline},identityRef:r.identity_ref,enrollmentRef:r.enrollment_ref,serverConfigVersion:r.server_config_version,planRevision:r.plan_revision}),revoked});}catch{throw Error('Occurrence approval storage unavailable');}},
  async revoke(input){if(!exact(input,['occurrenceId','reason'])||typeof input.occurrenceId!=='string'||!UUID.test(input.occurrenceId)||!['operator_closed','window_expired','security_denied'].includes(input.reason))fail();if(!await schema())return false;try{await db.prepare("INSERT INTO assistance_occurrence_plan_revocations(occurrence_id,reason,recorded_at) SELECT occurrence_id,?,CAST(unixepoch('subsec')*1000 AS INTEGER) FROM assistance_occurrence_approved_plans WHERE occurrence_id=?").bind(input.reason,input.occurrenceId).run();return Boolean(await db.prepare('SELECT occurrence_id FROM assistance_occurrence_plan_revocations WHERE occurrence_id=?').bind(input.occurrenceId).first());}catch(e){if(String(e?.cause?.message??e?.message).includes('UNIQUE constraint failed')||String(e?.cause?.message??e?.message).includes('Occurrence denied'))return false;throw Error('Occurrence approval storage unavailable');}},
 };
}
