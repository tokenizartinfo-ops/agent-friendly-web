import {readRecord,integer,text,closed} from '../../lib/agent-consumption-input.mjs';
const CONTRACT='agentfriendly.capsule-prepare.v1',NEXT='reconcile_capsule_preparation';
const FIELDS=['contract','code','replayed','preparation','executionAllowed','chargeAllowed','publicationAllowed','recovery'];
const RECOVERY=['action','nextTool','reuseOriginalRequest','automaticRetry','automaticReconnect','message'];
const ERRORS=new Set(['delegated_access_denied','domain_unverified','idempotency_conflict','revision_conflict','preparation_pending',
 'capsule_expired','unavailable','invalid_request','preparation_not_found','deadline_exceeded','unknown_ack','preparation_conflict',
 'invalid_source','insufficient_scope','rate_limited']);
const TRANSIENT=new Set(['unavailable','deadline_exceeded','rate_limited']);
const full=(value,keys)=>{const r=readRecord(value,keys);return r&&keys.every(k=>Object.hasOwn(r,k))?r:null;};
function original(value){
 const r=full(value,['contract','expectedRevision','idempotencyKey']);
 return r?.contract===CONTRACT&&integer(r.expectedRevision,1)&&typeof r.idempotencyKey==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(r.idempotencyKey)?Object.freeze(r):null;
}
function expectedRecovery(code,method){
 if(code==='prepared')return ['review_capsule',null,false];
 if(code==='unknown_ack'||code==='preparation_pending'||(method==='prepare'&&TRANSIENT.has(code)))return ['check_preparation',NEXT,true];
 if(['delegated_access_denied','insufficient_scope'].includes(code))return ['review_permission',null,false];
 if(code==='domain_unverified')return ['review_domain',null,false];
 if(code==='capsule_expired')return ['review_capsule',null,false];
 if(TRANSIENT.has(code))return ['retry_read',NEXT,true];
 return ['review_request',null,false];
}
function validRecovery(value,code,method){
 const r=full(value,RECOVERY),e=expectedRecovery(code,method);
 return r&&r.action===e[0]&&r.nextTool===e[1]&&r.reuseOriginalRequest===e[2]
  &&r.automaticRetry===false&&r.automaticReconnect===false&&text(r.message,500);
}
function result(status,code,action,request=null,preparation=null,replayed=null,next=false){
 const nextRead=next?Object.freeze({tool:NEXT,arguments:request}):null;
 return Object.freeze(closed(status,{code,action,originalRequest:request,preparation,replayed,nextRead,automaticRetry:false,automaticReconnect:false}));
}
/** Consistency guidance for an already-received structuredContent, not a client
 * transport or authorization check. The caller must bind response to its actual
 * authenticated call. Descriptors are MANUAL and confer no permission.
 */
export function consumeCapsulePreparation(value,options){
 const c=full(options,['method','request']),request=original(c?.request);
 if(!c||!request||!['prepare','reconcile'].includes(c.method))return result('blocked','invalid_context','review_request');
 const uncertain=()=>result('blocked','invalid_response',c.method==='prepare'?'reconcile_manually':'retry_read_manually',request,null,null,true);
 const r=full(value,FIELDS);
 if(!r||r.contract!==CONTRACT||!['executionAllowed','chargeAllowed','publicationAllowed'].every(k=>r[k]===false)
  ||(r.code!=='prepared'&&!ERRORS.has(r.code))||(c.method==='reconcile'&&r.code==='unknown_ack')||!validRecovery(r.recovery,r.code,c.method))return uncertain();
 if(r.code==='prepared'){
  const p=full(r.preparation,['capsuleRef','version','manifestSha256','sourceRevision']);
  if(typeof r.replayed!=='boolean'||(c.method==='reconcile'&&r.replayed!==true)||!p
   ||typeof p.capsuleRef!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(p.capsuleRef)
   ||!integer(p.version,1)||typeof p.manifestSha256!=='string'||!/^[0-9a-f]{64}$/.test(p.manifestSha256)||p.sourceRevision!==request.expectedRevision)return uncertain();
  return result('draft_ready','prepared','review_draft',request,Object.freeze(p),r.replayed);
 }
 if(r.preparation!==null||r.replayed!==null)return uncertain();
 const [action,next]=expectedRecovery(r.code,c.method);
 return result('blocked',r.code,action==='check_preparation'?'reconcile_manually':action==='retry_read'?'retry_read_manually':action,
  request,null,null,next!==null);
}
