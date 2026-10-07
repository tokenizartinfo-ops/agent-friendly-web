import {projectAssistanceGoalContext} from './assistance-goal-context.mjs';
import {validAssistanceGoalQuery} from './assistance-goal-service-identity.mjs';
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const fail=()=>({status:403,code:'read_receipt_unavailable'});
const primary=db=>db.withSession?db.withSession('first-primary'):db;
const digest=async context=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(context)))),x=>x.toString(16).padStart(2,'0')).join('');
const sourceFingerprint=source=>({id:source.id,projectId:source.projectId,type:source.type,createdAt:source.createdAt,payload:{contract:source.payload.contract,requestId:source.payload.requestId,expectedRevision:source.payload.expectedRevision,topic:source.payload.topic}});
const queryOf=context=>({eventId:context.eventId,projectRef:context.projectRef,runId:context.runId,revision:context.revision});
function contextFrom(project,consent,query,expiresAt,now){
 return projectAssistanceGoalContext({project,grant:{version:'afw.assistance-goals-consent.v1',purpose:'orientation',scope:'goal-guidance',projectId:project.id,userId:project.userId,eventId:query.eventId,sequence:consent.sequence,issuedAt:consent.issuedAt,expiresAt:consent.expiresAt},lease:{...query,projectId:project.id,userId:project.userId,topic:'orientation',expiresAt},authority:{granted:true,sequence:consent.sequence},now});
}
// Internal audit adapter only. Inputs must come from the authenticated server reader.
// A receipt ID is correlation, not permission or a bearer credential. This adapter
// checks private primary state, but does not authenticate or validate an operational lease.
export async function recordAssistanceGoalRead({db,snapshot,context,now,receiptId=crypto.randomUUID()}={}){
 try{
  if(!db?.prepare||!time(now)||!uuid(receiptId)||!snapshot?.project||!snapshot.source||!snapshot.consent||!context)return fail();
  const p=snapshot.project,s=snapshot.source,c=snapshot.consent,query=queryOf(context);
  if(!id(p.id)||!id(p.userId)||!/^help-[a-f0-9]{64}$/.test(s.id)||s.projectId!==p.id||s.type!=='assistance_requested'||!validAssistanceGoalQuery(query)||context.revision!==p.revision||!time(context.expiresAt)||context.expiresAt<=now||context.expiresAt-now>600000)return fail();
  const expected=contextFrom(p,c,query,context.expiresAt,now);if(JSON.stringify(expected)!==JSON.stringify(context))return fail();
  const contextHash=await digest(expected),sourceHash=await digest(sourceFingerprint(s)),session=primary(db);
  await session.prepare(`INSERT OR IGNORE INTO assistance_goal_read_receipts
   (id,project_id,user_id,source_event_id,revision,consent_sequence,event_id,project_ref,run_id,context_hash,source_hash,issued_at,expires_at)
   SELECT ?,p.id,p.user_id,e.id,p.revision,c.sequence,?,?,?,?,?,?,? FROM site_projects p
   JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id
   JOIN assistance_delivery_receipts d ON d.source_event_id=e.id
   JOIN assistance_goal_consent_events c ON c.project_id=p.id AND c.user_id=p.user_id AND c.source_event_id=e.id
   WHERE p.id=? AND p.user_id=? AND p.revision=? AND p.site_type=? AND p.goals_json=?
   AND e.id=? AND e.type='assistance_requested' AND e.created_at=? AND json(e.payload_json)=json(?)
   AND d.event_id=? AND d.project_ref=? AND c.sequence=?
   AND c.sequence=(SELECT MAX(sequence) FROM assistance_goal_consent_events WHERE project_id=p.id AND user_id=p.user_id AND source_event_id=e.id)
   AND c.action='grant' AND c.consent_version='afw.assistance-goals-consent.v1' AND c.revision=p.revision
   AND c.issued_at=? AND c.expires_at=? AND c.issued_at<=? AND c.expires_at>=?`)
   .bind(receiptId,query.eventId,query.projectRef,query.runId,contextHash,sourceHash,now,context.expiresAt,p.id,p.userId,p.revision,p.siteType,p.goalsJson,s.id,s.createdAt,JSON.stringify(s.payload),query.eventId,query.projectRef,c.sequence,c.issuedAt,c.expiresAt,now,context.expiresAt).run();
  const row=await session.prepare('SELECT id FROM assistance_goal_read_receipts WHERE run_id=? AND consent_sequence=?').bind(query.runId,c.sequence).first();if(!row)return fail();
  const current=await readCurrentAssistanceGoalReceipt({db:session,projectId:p.id,userId:p.userId,receiptId:row.id,query,now});
  if(current.status!==200||current.receipt.contextHash!==contextHash||current.receipt.expiresAt!==context.expiresAt)return fail();
  return{status:200,receipt:{version:'afw.assistance-goal-read-receipt.v1',id:row.id,expiresAt:context.expiresAt}};
 }catch{return fail();}
}
export async function readCurrentAssistanceGoalReceipt({db,projectId,userId,receiptId,query,now}={}){
 try{
  if(!db?.prepare||!id(projectId)||!id(userId)||!uuid(receiptId)||!validAssistanceGoalQuery(query)||!time(now))return fail();
  const statement=primary(db).prepare(`SELECT r.id,r.context_hash AS contextHash,r.source_hash AS sourceHash,e.id AS sourceId,r.issued_at AS readAt,r.expires_at AS readExpiresAt,
   p.site_type AS siteType,p.goals_json AS goalsJson,c.sequence,c.issued_at AS issuedAt,c.expires_at AS expiresAt,
   e.payload_json AS payloadJson,e.created_at AS createdAt
   FROM assistance_goal_read_receipts r JOIN site_projects p ON p.id=r.project_id AND p.user_id=r.user_id AND p.revision=r.revision
   JOIN project_events e ON e.id=r.source_event_id AND e.project_id=p.id AND e.user_id=p.user_id
   JOIN assistance_delivery_receipts d ON d.source_event_id=e.id AND d.event_id=r.event_id AND d.project_ref=r.project_ref
   JOIN assistance_goal_consent_events c ON c.project_id=p.id AND c.user_id=p.user_id AND c.source_event_id=e.id AND c.sequence=r.consent_sequence
   WHERE r.id=? AND p.id=? AND p.user_id=? AND r.event_id=? AND r.project_ref=? AND r.run_id=? AND r.revision=?
   AND e.type='assistance_requested' AND c.sequence=(SELECT MAX(sequence) FROM assistance_goal_consent_events WHERE project_id=p.id AND user_id=p.user_id AND source_event_id=e.id)
   AND c.action='grant' AND c.consent_version='afw.assistance-goals-consent.v1' AND c.revision=p.revision
   AND c.issued_at<=r.issued_at AND c.expires_at>=r.expires_at AND r.issued_at<=? AND r.expires_at>?`)
   .bind(receiptId,projectId,userId,query.eventId,query.projectRef,query.runId,query.revision,now,now);
  const row=await statement.first();
  if(!row||!time(row.readAt)||!time(row.readExpiresAt)||row.readExpiresAt-row.readAt>600000||row.readExpiresAt<=row.readAt)return fail();
  const payload=JSON.parse(row.payloadJson);if(!payload||Array.isArray(payload)||Object.keys(payload).length!==4||payload.contract!=='afw.assistance-request.v1'||payload.topic!=='orientation'||payload.expectedRevision!==query.revision||!uuid(payload.requestId)||typeof row.createdAt!=='string'||new Date(row.createdAt).toISOString()!==row.createdAt||Date.parse(row.createdAt)>row.readAt)return fail();
  const context=contextFrom({id:projectId,userId,revision:query.revision,siteType:row.siteType,goalsJson:row.goalsJson},{sequence:row.sequence,issuedAt:row.issuedAt,expiresAt:row.expiresAt},query,row.readExpiresAt,now);
  if(await digest(context)!==row.contextHash||await digest(sourceFingerprint({id:row.sourceId,projectId,type:"assistance_requested",createdAt:row.createdAt,payload}))!==row.sourceHash)return fail();
  const fresh=await statement.first();if(JSON.stringify(fresh)!==JSON.stringify(row))return fail();
  return{status:200,receipt:{id:row.id,contextHash:row.contextHash,consentSequence:row.sequence,expiresAt:row.readExpiresAt},context};
 }catch{return fail();}
}
