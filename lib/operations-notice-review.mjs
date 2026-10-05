import {operationsWindowOpen} from './operations-window.mjs';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const pairs={retain_block:['investigation_required'],close_obsolete:['obsolete_revision','producer_paused'],close_expired_unconfirmed:['expired_unconfirmed']};
const pair=(decision,reason)=>typeof decision==='string'&&typeof reason==='string'&&Object.hasOwn(pairs,decision)&&pairs[decision].includes(reason);
const causes=new Set(['checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed']);
export function validNoticeReview(value){return value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===3&&['decision','reason','reviewedAt'].every(k=>Object.hasOwn(value,k))&&pair(value.decision,value.reason)&&Number.isSafeInteger(value.reviewedAt)&&value.reviewedAt>=0&&Number.isFinite(new Date(value.reviewedAt).getTime());}
export function reviewMatchesReceipt(review,outcome,expiresAt){return validNoticeReview(review)&&outcome!=='accepted'&&(outcome!==null||review.reviewedAt>=expiresAt)&&(review.decision!=='close_expired_unconfirmed'||outcome===null);}
function condition(value){if(['healthy','paused'].includes(value))return true;try{const x=JSON.parse(value);return typeof value==='string'&&Array.isArray(x)&&x.length>0&&x.length<=8&&x.every(c=>causes.has(c))&&new Set(x).size===x.length&&JSON.stringify([...x].sort())===value;}catch{return false;}}
/** Authorization is a server dependency; never derive it from reception input. */
export async function recordNoticeReview(env,input,{operatorId,authorized=false,now=Date.now()}={}){
 const keys=['runId','requestId','decision','reason','expectedRevision','expectedCondition','expectedSequence'];
 if(!input||Array.isArray(input)||Object.keys(input).length!==keys.length||!keys.every(k=>Object.hasOwn(input,k))||typeof input.runId!=='string'||!uuid.test(input.runId)||typeof input.requestId!=='string'||!uuid.test(input.requestId)||!pair(input.decision,input.reason)||!Number.isSafeInteger(input.expectedRevision)||input.expectedRevision<1||!Number.isSafeInteger(input.expectedSequence)||input.expectedSequence<0||input.expectedSequence>=Number.MAX_SAFE_INTEGER||!condition(input.expectedCondition)||!Number.isSafeInteger(now)||now<0||!Number.isFinite(new Date(now).getTime()))throw Error('Invalid review input');
 if(env?.AFW_OPERATIONS_REVIEWS_ENABLED!=='true'||authorized!==true||!operationsWindowOpen(env,now))return null;
 if(typeof operatorId!=='string'||!operatorId.trim()||operatorId.length>128)throw Error('Invalid review input');
 const {runId,requestId,decision,reason,expectedRevision,expectedCondition,expectedSequence}=input;
 let existing;
 try{
  const raw=env.OPERATIONS_STATE_DB,db=typeof raw?.withSession==='function'?raw.withSession('first-primary'):raw;
  await db.batch([db.prepare(`INSERT INTO operations_notice_reviews(run_id,sequence,expected_sequence,review_request_id,operator_id,reviewed_at,decision,reason,observed_revision,observed_condition)
   SELECT r.run_id,?,?,?,?,?,?,?,?,? FROM operations_notice_reservations r JOIN operations_watchdog_state s ON s.resource=r.resource
   WHERE r.run_id=? AND r.resource IN ('afw_delegated_canary','afw_delegated_real_pilot') AND r.reserved_at BETWEEN 0 AND ? AND r.expires_at>r.reserved_at
   AND r.expires_at<=8640000000000000 AND typeof(r.reserved_at)='integer' AND typeof(r.expires_at)='integer'
   AND (r.acknowledged_at IS NULL OR r.acknowledged_at BETWEEN r.reserved_at AND ?)
   AND s.revision>=r.revision AND typeof(s.revision)='integer' AND typeof(s.changed_at)='integer' AND typeof(s.checked_at)='integer'
   AND (r.outcome='superseded' OR (r.outcome IS NULL AND r.expires_at<=?))
   AND s.revision=? AND s.condition=? AND s.changed_at BETWEEN 0 AND ? AND s.checked_at BETWEEN s.changed_at AND ?
   AND ((?='retain_block') OR (?='close_obsolete' AND ((?='obsolete_revision' AND s.revision>r.revision) OR (?='producer_paused' AND s.condition='paused'))) OR (?='close_expired_unconfirmed' AND r.outcome IS NULL AND r.expires_at<=?))
   AND COALESCE((SELECT MAX(sequence) FROM operations_notice_reviews WHERE run_id=r.run_id),0)=?
   AND NOT EXISTS(SELECT 1 FROM operations_notice_reviews WHERE run_id=r.run_id AND decision<>'retain_block')
   ON CONFLICT DO NOTHING`).bind(expectedSequence+1,expectedSequence,requestId,operatorId,now,decision,reason,expectedRevision,expectedCondition,runId,now,now,now,expectedRevision,expectedCondition,now,now,decision,decision,reason,reason,decision,now,expectedSequence)]);
  existing=(await db.prepare('SELECT * FROM operations_notice_reviews WHERE review_request_id=?').bind(requestId).all()).results;
  if(!existing.length){const last=await db.prepare('SELECT sequence,decision FROM operations_notice_reviews WHERE run_id=? ORDER BY sequence DESC LIMIT 1').bind(runId).first();if((last?.sequence??0)!==expectedSequence||(last&&last.decision!=='retain_block'))throw Error('Review conflict');}
 }catch(error){if(error.message==='Review conflict')throw error;throw Error('Notice review storage unavailable');}
 if(!existing.length)return null;
 if(existing.length!==1||existing[0].run_id!==runId||existing[0].review_request_id!==requestId||existing[0].expected_sequence!==expectedSequence||existing[0].operator_id!==operatorId||existing[0].decision!==decision||existing[0].reason!==reason||existing[0].observed_revision!==expectedRevision||existing[0].observed_condition!==expectedCondition)throw Error('Review conflict');
 const row=existing[0];return {sequence:row.sequence,decision:row.decision,reason:row.reason,reviewedAt:row.reviewed_at};
}
