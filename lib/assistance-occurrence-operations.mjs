import {createOccurrenceD1Store} from './assistance-occurrence-d1.mjs';
import {assistanceBudgetFenceAtServerClock} from './assistance-shared-budget.mjs';
import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
const exactSequence=input=>input&&typeof input==='object'&&!Array.isArray(input)&&Object.keys(input).length===1&&Object.hasOwn(input,'expectedSequence')&&Number.isSafeInteger(input.expectedSequence)&&input.expectedSequence>=0;
const CLOCK="CAST(unixepoch('subsec')*1000 AS INTEGER)";
const columns="'afw-assistance-event-v1' AS version,event_id AS eventId,project_ref AS projectRef,revision,kind,topic,observed_at AS observedAt";
/** INTERNAL composition only; never mounted by a Worker or called with request SQL.
 * All statements, including checked postconditions and result reads, share consume's batch.
 * No retries or read-after-loss recovery; terminal metadata is not a personalized answer.
 */
export function createOccurrenceOperations(options){
 const {db,manifest,now=Date.now}=options??{},store=createOccurrenceD1Store(options);
 // Store validates first; use a private immutable copy for the preflight lease proposal only.
 const deadline=Math.min(manifest.deadline,manifest.tokenExpiresAt,manifest.serverDeadline);
 function live(ctx){return `EXISTS(SELECT 1 FROM assistance_occurrence_journal j JOIN assistance_occurrences o ON o.occurrence_id=j.occurrence_id WHERE j.operation_id='${ctx.operationId}' AND ${CLOCK}>=o.start_at AND ${CLOCK}+10000<min(o.deadline,o.token_expires_at,o.server_deadline,coalesce(j.lease_expires_at,8640000000000000)) AND j.observation_at<=${CLOCK} AND ${CLOCK}-j.observation_at<=30000)`;}
 function check(ctx,predicate,values){return db.prepare(`INSERT INTO assistance_occurrence_effect_checks(operation_id,occurrence_id,phase,verified) SELECT ?,?,?,CASE WHEN (${predicate}) AND ${live(ctx)} THEN 1 ELSE 0 END`).bind(ctx.operationId,ctx.occurrenceId,ctx.phase,...values);}
 function recorded(ctx){return {sql:'(SELECT recorded_at FROM assistance_occurrence_journal WHERE operation_id=?)',values:[ctx.operationId]};}
 // Exact existing shared-budget semantics: one active across four channels and 3 rolling24h.
 // The ONLY clock is SQLite's effective clock, not the caller's pre-batch timestamp.
 const budget=assistanceBudgetFenceAtServerClock();
 return {
  create:store.create,admit:store.admit,close:store.close,
  async list(input){if(!exactSequence(input))return null;
   const result=await store.consumePrepared({...input,phase:'list'},ctx=>{
    const m=ctx.manifest,s=m.signal;
    const predicate="EXISTS(SELECT 1 FROM assistance_supervision_events e WHERE e.event_id=? AND e.project_ref=? AND e.revision=? AND e.kind=? AND e.topic=? AND e.observed_at=? AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision) AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs r WHERE r.event_id=e.event_id AND r.outcome IN ('reviewed','intervention_required')))";
    return [check(ctx,predicate,[s.eventId,s.projectRef,s.revision,s.kind,s.topic,s.observedAt]),db.prepare(`SELECT ${columns} FROM assistance_supervision_events WHERE event_id=? AND ${live(ctx)}`).bind(s.eventId)];
   });
   if(!result)return null;return result[2].results.map(validateAssistanceSignal);
  },
  async claim(input){if(!exactSequence(input))return null;
   const runId=crypto.randomUUID(),expiresAt=Math.min(deadline,now()+300000);
   const result=await store.consumePrepared({...input,phase:'claim',runId,leaseExpiresAt:expiresAt},ctx=>{
    const m=ctx.manifest,s=m.signal,t=recorded(ctx);
    const insert=db.prepare(`INSERT OR IGNORE INTO assistance_supervision_runs(run_id,request_id,event_id,started_at,expires_at)
 SELECT ?,?,?,${t.sql},? WHERE EXISTS(SELECT 1 FROM assistance_supervision_events e WHERE e.event_id=? AND NOT EXISTS(SELECT 1 FROM assistance_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision))
 AND NOT EXISTS(SELECT 1 FROM assistance_supervision_runs WHERE event_id=? AND outcome IN ('reviewed','intervention_required')) AND ${live(ctx)} ${budget}`).bind(ctx.runId,m.requestId,s.eventId,...t.values,ctx.leaseExpiresAt,s.eventId,s.eventId);
    const post=check(ctx,`changes()=1 AND EXISTS(SELECT 1 FROM assistance_supervision_runs WHERE run_id=? AND request_id=? AND event_id=? AND started_at=${t.sql} AND expires_at=? AND outcome IS NULL AND completed_at IS NULL)`,[ctx.runId,m.requestId,s.eventId,...t.values,ctx.leaseExpiresAt]);
    return [insert,post,db.prepare('SELECT run_id AS runId,event_id AS eventId,request_id AS requestId,expires_at AS expiresAt FROM assistance_supervision_runs WHERE run_id=?').bind(ctx.runId)];
   });
   return result?{...result[3].results[0]}:null;
  },
  async finish(input){if(!exactSequence(input))return null;
   const result=await store.consumePrepared({...input,phase:'finish',outcome:'intervention_required'},ctx=>{
    const m=ctx.manifest,t=recorded(ctx);
    const update=db.prepare(`UPDATE assistance_supervision_runs SET outcome=(SELECT outcome FROM assistance_occurrence_journal WHERE operation_id=?),completed_at=${t.sql}
 WHERE run_id=? AND request_id=? AND event_id=? AND expires_at=? AND outcome IS NULL AND started_at<=${CLOCK} AND expires_at>${CLOCK}+10000 AND ${live(ctx)}`).bind(ctx.operationId,...t.values,ctx.runId,m.requestId,m.signal.eventId,ctx.leaseExpiresAt);
    const post=check(ctx,`changes()=1 AND EXISTS(SELECT 1 FROM assistance_supervision_runs r JOIN assistance_occurrence_journal j ON j.operation_id=? WHERE r.run_id=? AND r.request_id=? AND r.event_id=? AND r.expires_at=? AND r.outcome=j.outcome AND r.completed_at=j.recorded_at AND j.state='completed')`,[ctx.operationId,ctx.runId,m.requestId,m.signal.eventId,ctx.leaseExpiresAt]);
    return [update,post,db.prepare('SELECT outcome FROM assistance_supervision_runs WHERE run_id=?').bind(ctx.runId)];
   });
   return result?result[3].results[0].outcome:null;
  },
 };
}
