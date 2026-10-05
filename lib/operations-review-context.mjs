import {operationsWindowOpen} from './operations-window.mjs';
import {reviewMatchesReceipt} from './operations-notice-review.mjs';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const causes=new Set(['checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed']);
const timestamp=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
function condition(value){
 if(value==='healthy'||value==='paused')return true;
 try{const list=JSON.parse(value);return typeof value==='string'&&Array.isArray(list)&&list.length>0&&list.length<=8&&list.every(x=>causes.has(x))&&new Set(list).size===list.length&&JSON.stringify([...list].sort())===value;}catch{return false;}
}
/** One server-authorized operational snapshot; never a permission derived from query/body. */
export async function readNoticeReviewTarget(env,{runId,now=Date.now(),authorized=false}={}){
 if(authorized!==true||env?.AFW_OPERATIONS_REVIEWS_ENABLED!=='true'||!timestamp(now)||!operationsWindowOpen(env,now))return null;
 if(runId!==undefined&&(typeof runId!=='string'||!uuid.test(runId)))throw Error('Invalid review selector');
 try{
  const raw=env.OPERATIONS_STATE_DB,db=typeof raw?.withSession==='function'?raw.withSession('first-primary'):raw;
  const row=await db.prepare(`SELECT r.run_id AS runId,r.resource,r.revision AS originalRevision,r.reserved_at AS reservedAt,r.expires_at AS expiresAt,r.outcome,
   s.revision,s.condition,s.changed_at AS changedAt,s.checked_at AS checkedAt,
   v.sequence,v.decision,v.reason,v.reviewed_at AS reviewedAt,
   EXISTS(SELECT 1 FROM operations_notice_reservations live WHERE live.run_id<>r.run_id AND live.resource=r.resource AND live.revision=r.revision AND live.outcome IS NULL AND live.expires_at>?) AS liveReplacement
   FROM operations_notice_reservations r JOIN operations_watchdog_state s ON s.resource=r.resource
   LEFT JOIN operations_notice_reviews v ON v.run_id=r.run_id AND v.sequence=(SELECT MAX(sequence) FROM operations_notice_reviews WHERE run_id=r.run_id)
   WHERE r.resource IN ('afw_delegated_canary','afw_delegated_real_pilot') AND r.reserved_at<=?
   AND (r.outcome='superseded' OR (r.outcome IS NULL AND r.expires_at<=?))
   ${runId===undefined?"AND (v.decision IS NULL OR v.decision='retain_block')":"AND r.run_id=?"}
   ORDER BY (v.sequence IS NOT NULL),r.reserved_at,r.run_id LIMIT 1`).bind(now,now,now,...(runId===undefined?[]:[runId])).first();
  if(!row)return null;
  if(!uuid.test(row.runId)||!Number.isSafeInteger(row.originalRevision)||row.originalRevision<1||!Number.isSafeInteger(row.revision)||row.revision<row.originalRevision
   ||!timestamp(row.reservedAt)||!timestamp(row.expiresAt)||row.expiresAt<=row.reservedAt||!timestamp(row.changedAt)||!timestamp(row.checkedAt)
   ||row.changedAt>row.checkedAt||row.checkedAt>now||!condition(row.condition)||![0,1].includes(row.liveReplacement))throw Error('Invalid snapshot');
  const sequence=row.sequence??0;
  if(!Number.isSafeInteger(sequence)||sequence<0)throw Error('Invalid snapshot');
  const lastReview=sequence?{sequence,decision:row.decision,reason:row.reason,reviewedAt:row.reviewedAt}:null;
  if(lastReview&&(!reviewMatchesReceipt({decision:row.decision,reason:row.reason,reviewedAt:row.reviewedAt},row.outcome,row.expiresAt)||row.reviewedAt<row.reservedAt||row.reviewedAt>now))throw Error('Invalid snapshot');
  const choices=[];
  if((!lastReview||lastReview.decision==='retain_block')&&sequence<Number.MAX_SAFE_INTEGER){
   choices.push({decision:'retain_block',reason:'investigation_required'});
   if(!row.liveReplacement&&row.checkedAt>=Math.max(0,now-900000)){
    if(row.condition==='paused')choices.push({decision:'close_obsolete',reason:'producer_paused'});
    else if(row.revision>row.originalRevision)choices.push({decision:'close_obsolete',reason:'obsolete_revision'});
    else if(row.outcome===null)choices.push({decision:'close_expired_unconfirmed',reason:'expired_unconfirmed'});
   }
  }
  return {runId:row.runId,resource:row.resource,originalRevision:row.originalRevision,reservedAt:row.reservedAt,expiresAt:row.expiresAt,outcome:row.outcome,
   observedAt:row.checkedAt,snapshot:{revision:row.revision,condition:row.condition,sequence},lastReview,choices};
 }catch{throw Error('Review context unavailable');}
}
