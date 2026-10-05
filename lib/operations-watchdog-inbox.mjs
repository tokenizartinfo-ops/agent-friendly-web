import {operationsWindowOpen} from './operations-window.mjs';

/** Admit current operational notices only. No dispatch, ACK, customer data or repair. */
export async function admitWatchdogNotices(env,{now=Date.now()}={}){
 if(!Number.isSafeInteger(now)||now<0||!Number.isFinite(new Date(now).getTime()))throw Error('Invalid notice clock');
 if(env?.AFW_OPERATIONS_NOTICES_ENABLED!=='true'||env.AFW_OPERATIONS_WATCHDOG_ENABLED!=='true'||env.AFW_OPERATIONS_PRODUCER_ENABLED!=='true'||!operationsWindowOpen(env,now))return {skipped:true,admitted:0};
 try{
  const db=env.OPERATIONS_STATE_DB.withSession?env.OPERATIONS_STATE_DB.withSession('first-primary'):env.OPERATIONS_STATE_DB;
  const statement=db.prepare(`INSERT INTO operations_watchdog_inbox
   (resource,revision,kind,condition,observed_at,admitted_at)
   SELECT o.resource,o.revision,o.kind,o.condition,o.observed_at,?
   FROM operations_watchdog_outbox o JOIN operations_watchdog_state s
   ON s.resource=o.resource AND s.revision=o.revision AND s.condition=o.condition AND s.changed_at=o.observed_at
   WHERE o.resource IN ('afw_delegated_canary','afw_delegated_real_pilot')
   AND s.checked_at BETWEEN ? AND ? AND s.changed_at<=s.checked_at AND s.changed_at>=0
   AND ((o.kind='recovered' AND o.condition='healthy') OR
    (o.kind='attention' AND json_type(CASE WHEN json_valid(o.condition) THEN o.condition ELSE '[]' END)='array'
     AND json_array_length(CASE WHEN json_valid(o.condition) THEN o.condition ELSE '[]' END) BETWEEN 1 AND 8
     AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(o.condition) THEN o.condition ELSE '[]' END)
      WHERE type<>'text' OR value NOT IN ('checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed'))
     AND o.condition=(SELECT json_group_array(value) FROM
      (SELECT DISTINCT value FROM json_each(CASE WHEN json_valid(o.condition) THEN o.condition ELSE '[]' END) ORDER BY value))))
   ON CONFLICT(resource,revision) DO NOTHING`).bind(now,Math.max(0,now-900000),now);
  const result=await db.batch([statement]);
  return {skipped:false,admitted:result[0].meta.changes};
 }catch{throw Error('Watchdog notice storage unavailable');}
}
