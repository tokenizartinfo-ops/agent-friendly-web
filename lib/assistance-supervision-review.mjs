import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
import {assistanceBudgetFence} from './assistance-shared-budget.mjs';
const HASH=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const clock=time=>Number.isSafeInteger(time)&&time>=0&&Number.isFinite(new Date(time+300000).getTime());
const columns='event_id AS eventId,project_ref AS projectRef,revision,kind,topic,observed_at AS observedAt';
const newest=alias=>`NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=${alias}.project_ref AND n.revision>${alias}.revision)`;
const reservation=row=>({runId:row.run_id,eventId:row.event_id,requestId:row.request_id,expiresAt:row.expires_at});
export async function listAssistanceSignals(db,allowed){
 if(!Array.isArray(allowed)||!allowed.length||allowed.length>3||allowed.some(x=>typeof x!=='string'||!HASH.test(x)))return[];
 const rows=await db.prepare(`SELECT ${columns} FROM assistance_supervision_events e WHERE e.project_ref IN (${allowed.map(()=>'?').join(',')}) AND ${newest('e')} AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs r WHERE r.event_id=e.event_id AND r.outcome IN ('reviewed','intervention_required')) ORDER BY received_at,event_id LIMIT 3`).bind(...allowed).all();
 return rows.results.map(row=>validateAssistanceSignal({version:'afw-assistance-event-v1',...row}));
}
export async function claimAssistanceSignal(db,eventId,requestId,now,{expiresAt=now+300000}={}){
 if(typeof eventId!=='string'||!HASH.test(eventId)||typeof requestId!=='string'||!UUID.test(requestId)||!clock(now)||!Number.isSafeInteger(expiresAt)||expiresAt<=now||expiresAt>now+300000)return null;
 const previous=await db.prepare('SELECT * FROM assistance_supervision_runs WHERE request_id=?').bind(requestId).first();
 if(previous)return previous.event_id===eventId&&previous.outcome===null&&previous.expires_at>now?reservation(previous):null;
 const runId=crypto.randomUUID();
 await db.prepare(`INSERT OR IGNORE INTO assistance_supervision_runs(run_id,request_id,event_id,started_at,expires_at)
 SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM assistance_supervision_events e WHERE e.event_id=? AND ${newest('e')})
 AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs WHERE event_id=? AND outcome IN ('reviewed','intervention_required'))
 ${assistanceBudgetFence(true,now)}`).bind(runId,requestId,eventId,now,expiresAt,eventId,eventId).run();
 const row=await db.prepare('SELECT * FROM assistance_supervision_runs WHERE request_id=?').bind(requestId).first();
 return row&&row.event_id===eventId&&row.outcome===null&&row.expires_at>now?reservation(row):null;
}
export async function finishAssistanceSignal(db,runId,outcome,now){
 if(typeof runId!=='string'||!UUID.test(runId)||!['reviewed','intervention_required'].includes(outcome)||!clock(now))return null;
 await db.prepare(`UPDATE assistance_supervision_runs SET outcome=CASE WHEN EXISTS(SELECT 1 FROM assistance_supervision_events n JOIN assistance_supervision_events e ON e.event_id=assistance_supervision_runs.event_id WHERE n.project_ref=e.project_ref AND n.revision>e.revision) THEN 'superseded' ELSE ? END,completed_at=? WHERE run_id=? AND outcome IS NULL AND started_at<=? AND expires_at>?`).bind(outcome,now,runId,now,now).run();
 const row=await db.prepare('SELECT outcome,expires_at FROM assistance_supervision_runs WHERE run_id=?').bind(runId).first();
 return row&&row.expires_at>now&&[outcome,'superseded'].includes(row.outcome)?row.outcome:null;
}
