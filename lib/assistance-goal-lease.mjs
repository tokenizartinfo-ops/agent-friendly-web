const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
// Operational metadata only. Does not authenticate a service, resolve a private owner,
// create a reservation or confer the user's separate goal-context consent.
export async function readActiveAssistanceGoalLease({db,eventId,projectRef,runId,revision,now}={}){
 if(!db?.prepare||!hash(eventId)||!hash(projectRef)||!uuid(runId)||!Number.isSafeInteger(revision)||revision<1||!time(now))return null;
 const primary=db.withSession?db.withSession('first-primary'):db;
 const row=await primary.prepare(`SELECT e.event_id AS eventId,e.project_ref AS projectRef,e.revision,e.topic,e.observed_at AS observedAt,
 r.run_id AS runId,r.started_at AS startedAt,r.expires_at AS expiresAt FROM assistance_supervision_events e
 JOIN assistance_supervision_runs r ON r.event_id=e.event_id
 WHERE e.event_id=? AND e.project_ref=? AND e.revision=? AND e.kind='assistance_requested' AND e.topic='orientation'
 AND r.run_id=? AND r.outcome IS NULL AND r.completed_at IS NULL AND r.started_at<=? AND r.expires_at>?
 AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision)`)
 .bind(eventId,projectRef,revision,runId,now,now).first();
 if(!row)return null;
 if(!time(row.startedAt)||!time(row.expiresAt)||row.startedAt>now||row.expiresAt<=now||row.expiresAt-row.startedAt>300000||row.expiresAt<=row.startedAt||typeof row.observedAt!=='string'||!Number.isFinite(Date.parse(row.observedAt))||new Date(row.observedAt).toISOString()!==row.observedAt||Date.parse(row.observedAt)>row.startedAt)return null;
 return{eventId:row.eventId,projectRef:row.projectRef,runId:row.runId,revision:row.revision,topic:row.topic,expiresAt:row.expiresAt};
}
