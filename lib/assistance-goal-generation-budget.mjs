const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
// Nested generation admission: the current assistance run already consumed one
// shared admission. Do not reject/count it a second time or silently refund it.
export async function reserveAssistanceGoalGeneration({db,eventId,projectRef,runId,receiptId,revision,purpose,now}={}){
 try{
  if(!db?.prepare||!hash(eventId)||!hash(projectRef)||!uuid(runId)||!uuid(receiptId)||!Number.isSafeInteger(revision)||revision<1||purpose!=='afw.goal-guidance.propose.v1'||!Number.isSafeInteger(now)||now<0)return{allowed:false};
  const primary=db.withSession?db.withSession('first-primary'):db;
  const result=await primary.prepare(`INSERT OR IGNORE INTO assistance_goal_generation_budget(receipt_id,run_id,event_id,reserved_at,expires_at)
   SELECT ?,r.run_id,e.event_id,?,r.expires_at FROM assistance_supervision_events e JOIN assistance_supervision_runs r ON r.event_id=e.event_id
   WHERE e.event_id=? AND e.project_ref=? AND e.revision=? AND e.kind='assistance_requested' AND e.topic='orientation'
   AND r.run_id=? AND r.outcome IS NULL AND r.completed_at IS NULL AND r.started_at<=? AND r.expires_at>?
   AND r.expires_at<=r.started_at+300000
   AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision)
   AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs a WHERE a.run_id<>r.run_id AND a.outcome IS NULL AND a.expires_at>?)
   AND NOT EXISTS(SELECT 1 FROM dossier_supervision_runs WHERE outcome IS NULL AND expires_at>?)
   AND NOT EXISTS(SELECT 1 FROM operations_investigations WHERE finished_at IS NULL AND expires_at>?)
   AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE outcome IS NULL AND expires_at>?)
   AND ((SELECT count(*) FROM assistance_supervision_runs WHERE started_at>?)
    +(SELECT count(*) FROM dossier_supervision_runs WHERE started_at>?)
    +(SELECT count(*) FROM operations_investigations WHERE reserved_at>?)
    +(SELECT count(*) FROM operations_notice_reservations WHERE reserved_at>?))<=3`)
   .bind(receiptId,now,eventId,projectRef,revision,runId,now,now,now,now,now,now,now-86400000,now-86400000,now-86400000,now-86400000).run();
  return{allowed:result?.meta?.changes===1};
 }catch{return{allowed:false};}
}
