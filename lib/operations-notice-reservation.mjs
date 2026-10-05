import {operationsWindowOpen} from './operations-window.mjs';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const causes=new Set(['checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed']);
function primary(env){const db=env.OPERATIONS_STATE_DB;return typeof db?.withSession==='function'?db.withSession('first-primary'):db;}
function open(env,now){if(!Number.isSafeInteger(now)||now<0||!Number.isFinite(new Date(now).getTime()))throw Error('Invalid notice input');return env?.AFW_OPERATIONS_NOTICES_ENABLED==='true'&&env.AFW_OPERATIONS_WATCHDOG_ENABLED==='true'&&env.AFW_OPERATIONS_PRODUCER_ENABLED==='true'&&operationsWindowOpen(env,now);}
const current=`EXISTS(SELECT 1 FROM operations_watchdog_state s JOIN operations_watchdog_inbox i ON i.resource=s.resource AND i.revision=s.revision AND i.condition=s.condition AND i.observed_at=s.changed_at WHERE s.resource=r.resource AND s.revision=r.revision AND s.condition<>'paused' AND s.checked_at BETWEEN ? AND ?)`;
export async function listCurrentNotices(env,{now=Date.now()}={}){
 if(!open(env,now))return [];
 try{const db=primary(env);const {results}=await db.prepare(`SELECT i.resource,i.revision,i.kind,i.condition,i.observed_at AS observedAt
 FROM operations_watchdog_inbox i JOIN operations_watchdog_state s ON s.resource=i.resource AND s.revision=i.revision AND s.condition=i.condition AND s.changed_at=i.observed_at
 WHERE i.resource IN ('afw_delegated_canary','afw_delegated_real_pilot') AND s.condition<>'paused' AND s.checked_at BETWEEN ? AND ?
 AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations r WHERE r.resource=i.resource AND r.revision=i.revision AND (r.outcome='accepted' OR (r.outcome IS NULL AND r.expires_at>?)))
 ORDER BY i.observed_at,i.resource LIMIT 2`).bind(Math.max(0,now-900000),now,now).all();
 for(const row of results){
  if(!Number.isSafeInteger(row.revision)||row.revision<1||!Number.isSafeInteger(row.observedAt)||row.observedAt<0||row.observedAt>now)throw Error('Invalid notice');
  if(row.kind==='recovered'&&row.condition==='healthy')continue;
  const values=JSON.parse(row.condition);
  if(row.kind!=='attention'||!Array.isArray(values)||values.length<1||values.length>8||values.some(x=>!causes.has(x))||new Set(values).size!==values.length||JSON.stringify([...values].sort())!==row.condition)throw Error('Invalid notice');
 }return results;}catch{throw Error('Notice reservation storage unavailable');}
}
export async function reserveNotice(env,{resource,revision,requestId,now=Date.now()}={}){
 if(typeof requestId!=='string'||!uuid.test(requestId)||!['afw_delegated_canary','afw_delegated_real_pilot'].includes(resource)||!Number.isSafeInteger(revision)||revision<1)throw Error('Invalid notice input');
 if(!open(env,now))return null;
 try{const db=primary(env);const expires=Math.min(now+300000,Date.parse(env.AFW_OPERATIONS_WINDOW_EXPIRES_AT));
 await db.batch([db.prepare(`INSERT INTO operations_notice_reservations(run_id,request_id,resource,revision,reserved_at,expires_at)
 SELECT ?,?,i.resource,i.revision,?,? FROM operations_watchdog_inbox i JOIN operations_watchdog_state s ON s.resource=i.resource AND s.revision=i.revision AND s.condition=i.condition AND s.changed_at=i.observed_at
 WHERE i.resource=? AND i.revision=? AND s.condition<>'paused' AND s.checked_at BETWEEN ? AND ?
 AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE resource=i.resource AND revision=i.revision AND (outcome='accepted' OR (outcome IS NULL AND expires_at>?)))
 AND (SELECT COUNT(*) FROM operations_notice_reservations WHERE reserved_at>?)<3
 AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE outcome IS NULL AND expires_at>?)
 ON CONFLICT(request_id) DO NOTHING`).bind(crypto.randomUUID(),requestId,now,expires,resource,revision,Math.max(0,now-900000),now,now,now-86400000,now)]);
 const row=await db.prepare(`SELECT r.run_id AS runId,r.request_id AS requestId,r.resource,r.revision,r.expires_at AS expiresAt FROM operations_notice_reservations r WHERE request_id=? AND resource=? AND revision=? AND outcome IS NULL AND reserved_at<=? AND expires_at>? AND ${current}`).bind(requestId,resource,revision,now,now,Math.max(0,now-900000),now).first();return row?{...row}:null;
 }catch{throw Error('Notice reservation storage unavailable');}
}
/** ACK records reception only, never delivery to a person or permission to repair. */
export async function acknowledgeNotice(env,runId,{now=Date.now()}={}){
 if(typeof runId!=='string'||!uuid.test(runId))throw Error('Invalid notice input');if(!open(env,now))return null;
 try{const db=primary(env);await db.batch([db.prepare(`UPDATE operations_notice_reservations AS r SET acknowledged_at=?,outcome=CASE WHEN ${current} THEN 'accepted' ELSE 'superseded' END WHERE run_id=? AND outcome IS NULL AND reserved_at<=? AND expires_at>?`).bind(now,Math.max(0,now-900000),now,runId,now,now)]);const row=await db.prepare('SELECT outcome FROM operations_notice_reservations WHERE run_id=?').bind(runId).first();return row?.outcome??null;}catch{throw Error('Notice reservation storage unavailable');}
}
