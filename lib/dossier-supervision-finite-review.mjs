import {finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {validateFiniteDossierReviewReceipt} from './mcp-finite-dossier-review-receipt.mjs';

const PURPOSE='afw.finite-dossier-review.v1';
const POLICY='afw.finite-dossier-review-policy.v1';
const primaryTime="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const UUID=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const fail=()=>{throw Error('Finite dossier review unavailable');};

function readPolicy(env){
 if(env?.AFW_DOSSIER_FINITE_REVIEW_ENABLED!=='true')return null;
 const raw=env.AFW_DOSSIER_FINITE_REVIEW_POLICY;
 if(typeof raw!=='string'||Buffer.byteLength(raw)>2048)fail();
 const p=fields(JSON.parse(raw),['purpose','eventId','projectRef','revision','controlHash','executionHash','actorHash','startAt','reviewBefore','readBefore']);
 if(p.purpose!==POLICY||['eventId','projectRef','controlHash','executionHash','actorHash'].some(k=>!hex(p[k]))||
    !Number.isSafeInteger(p.revision)||p.revision<1||['startAt','reviewBefore','readBefore'].some(k=>!time(p[k]))||
    p.startAt>=p.reviewBefore||p.reviewBefore>=p.readBefore||p.readBefore-p.startAt>480000)fail();
 return p;
}
const actorHash=config=>hash(['afw.finite-dossier-review-actor.v1',config.teamDomain,config.audience,config.clientId]);

async function observe(db,p){
 const rows=await db.prepare(`SELECT w.event_id AS eventId,w.control_hash AS controlHash,w.run_id AS runId,w.actor_hash AS actorHash,
   w.execution_hash AS executionHash,w.result_hash AS resultHash,w.revision,w.received_at AS receivedAt,w.reviewed_at AS reviewedAt
  FROM dossier_supervision_finite_reviews w
  JOIN dossier_supervision_events e ON e.event_id=w.event_id AND e.revision=w.revision AND e.received_at=w.received_at
  JOIN dossier_supervision_runs r ON r.run_id=w.run_id AND r.event_id=e.event_id AND r.outcome='reviewed' AND r.completed_at=w.reviewed_at
  WHERE w.event_id=? AND w.control_hash=? AND w.actor_hash=? AND w.execution_hash=? AND e.project_ref=? AND e.revision=?
   AND w.received_at>=? AND r.started_at>=w.received_at AND w.reviewed_at>=r.started_at AND w.reviewed_at<r.expires_at AND w.reviewed_at<?
  LIMIT 2`).bind(p.eventId,p.controlHash,p.actorHash,p.executionHash,p.projectRef,p.revision,p.startAt,p.reviewBefore).all();
 if(!Array.isArray(rows?.results)||rows.results.length>1)fail();
 return rows.results.length?validateFiniteDossierReviewReceipt({purpose:PURPOSE,...rows.results[0]}):null;
}

/** Private first-primary read. The original review deadline is never extended. */
export async function readFiniteDossierReviewReceipt({env,refs,now=Date.now}){
 const x=fields(refs,['eventId','controlHash']),p=readPolicy(env),db=env.OPERATIONS_DB;
 if(!p||x.eventId!==p.eventId||x.controlHash!==p.controlHash||typeof db?.withSession!=='function')return null;
 const raw=env.AFW_DOSSIER_FINITE_REVIEW_POLICY,session=db.withSession;
 const check=()=>{const at=now();if(!time(at)||at<p.startAt||at>=p.readBefore||env.OPERATIONS_DB!==db||db.withSession!==session||
  env.AFW_DOSSIER_FINITE_REVIEW_POLICY!==raw||env.AFW_DOSSIER_FINITE_REVIEW_ENABLED!=='true')fail();return at;};
 check();const r=await observe(session.call(db,'first-primary'),p);check();
 if(r&&r.reviewedAt>check())fail();return r;
}

/** Called only after the existing service JWT, enrollment and request gates.
 * The receipt and current run outcome share one primary D1 atomic batch. */
export async function finishFiniteDossierReview({db,env,config,body,now,dossierOpen,allowed}){
 const p=readPolicy(env);
 if(!p||!allowed.includes(p.projectRef)||p.actorHash!==actorHash(config)||typeof db?.batch!=='function')return null;
 const x=fields(body,['runId','outcome','review']),r=fields(x.review,['eventId','executionHash','resultHash']);
 if(typeof x.runId!=='string'||!UUID.test(x.runId)||x.outcome!=='reviewed'||r.eventId!==p.eventId||r.executionHash!==p.executionHash||!hex(r.resultHash))return null;
 const raw=env.AFW_DOSSIER_FINITE_REVIEW_POLICY;
 const check=()=>{const at=now();if(!time(at)||at<p.startAt||at>=p.reviewBefore||!dossierOpen()||
  env.AFW_DOSSIER_FINITE_REVIEW_POLICY!==raw||env.AFW_DOSSIER_FINITE_REVIEW_ENABLED!=='true')fail();return at;};
 check();const existing=await observe(db,p);check();
 const matches=value=>value?.runId===x.runId&&value.resultHash===r.resultHash;
 if(existing)return matches(existing)?existing:null;
 const at=check();
 const insert=db.prepare(`INSERT OR IGNORE INTO dossier_supervision_finite_reviews
 (event_id,control_hash,run_id,actor_hash,execution_hash,result_hash,revision,received_at,reviewed_at)
 SELECT e.event_id,?,r.run_id,?,?,?,e.revision,e.received_at,?
 FROM dossier_supervision_runs r JOIN dossier_supervision_events e ON e.event_id=r.event_id
 WHERE r.run_id=? AND e.event_id=? AND e.project_ref=? AND e.revision=?
   AND e.received_at>=? AND r.started_at>=e.received_at AND r.started_at<=? AND r.expires_at>? AND ${primaryTime}<MIN(r.expires_at,?)
   AND r.outcome IS NULL AND NOT EXISTS(SELECT 1 FROM dossier_supervision_events newer WHERE newer.project_ref=e.project_ref AND newer.revision>e.revision)`)
  .bind(p.controlHash,p.actorHash,p.executionHash,r.resultHash,at,x.runId,p.eventId,p.projectRef,p.revision,p.startAt,at,at,p.reviewBefore);
 const finish=db.prepare(`UPDATE dossier_supervision_runs SET outcome='reviewed',completed_at=?
 WHERE run_id=? AND event_id=? AND outcome IS NULL AND EXISTS(
  SELECT 1 FROM dossier_supervision_finite_reviews w
  WHERE w.event_id=? AND w.run_id=? AND w.control_hash=? AND w.result_hash=? AND w.reviewed_at=?)`)
  .bind(at,x.runId,p.eventId,p.eventId,x.runId,p.controlHash,r.resultHash,at);
 check();await db.batch([insert,finish]);check();
 const persisted=await observe(db,p);check();return matches(persisted)?persisted:null;
}

export function finiteDossierReviewIsRequired(env,eventId){
 const p=readPolicy(env);return p!==null&&p.eventId===eventId;
}
