const VERSION='afw.assistance-goals-consent.v1';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const time=n=>Number.isSafeInteger(n)&&n>=0&&Number.isFinite(new Date(n).getTime());
const id=x=>typeof x==='string'&&x.length>0&&x.length<=256;
const fail=(status,code)=>({status,code});
const primary=db=>db.withSession?db.withSession('first-primary'):db;
function sourcePayload(row,now){
 try{
  const p=JSON.parse(row.payload_json);
  const keys=['contract','requestId','expectedRevision','topic'];
  if(!p||Array.isArray(p)||Object.keys(p).length!==keys.length||!keys.every(k=>Object.hasOwn(p,k))
   ||p.contract!=='afw.assistance-request.v1'||!uuid.test(p.requestId)||p.topic!=='orientation'
   ||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<1
   ||typeof row.created_at!=='string'||new Date(row.created_at).toISOString()!==row.created_at||Date.parse(row.created_at)>now)return null;
  return p;
 }catch{return null;}
}
const sourceSql=`SELECT p.revision AS currentRevision,e.payload_json,e.created_at FROM site_projects p
 JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id
 WHERE p.id=? AND p.user_id=? AND e.id=? AND e.type='assistance_requested'`;
const valid=(o)=>id(o.userId)&&id(o.projectId)&&typeof o.sourceId==='string'&&/^help-[0-9a-f]{64}$/.test(o.sourceId)&&time(o.now)&&o.db?.prepare;

// Storage preparation only: identity, CSRF, rollout, body bounds and response fencing
// belong to the future server adapter. Never pass an untrusted actor or client clock.
export async function readAssistanceGoalConsent(options){
 if(!valid(options))return fail(400,'invalid_input');
 const {userId,projectId,sourceId,now}=options,db=primary(options.db);
 const row=await db.prepare(`SELECT p.revision AS currentRevision,e.payload_json,e.created_at,
 c.sequence,c.revision,c.action,c.consent_version,c.issued_at,c.expires_at
 FROM site_projects p JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id
 LEFT JOIN assistance_goal_consent_events c ON c.project_id=p.id AND c.user_id=p.user_id AND c.source_event_id=e.id
 AND c.sequence=(SELECT MAX(sequence) FROM assistance_goal_consent_events WHERE project_id=p.id AND user_id=p.user_id AND source_event_id=e.id)
 WHERE p.id=? AND p.user_id=? AND e.id=? AND e.type='assistance_requested'`).bind(projectId,userId,sourceId).first();
 if(!row)return fail(404,'project_unavailable');
 const payload=sourcePayload(row,now);if(!payload)return fail(409,'assistance_unavailable');
 if(row.sequence==null)return{status:200,granted:false,sequence:0,revision:payload.expectedRevision,issuedAt:null,expiresAt:null};
 if(!Number.isSafeInteger(row.sequence)||row.sequence<1||row.consent_version!==VERSION
  ||row.revision!==payload.expectedRevision||!['grant','revoke'].includes(row.action)
  ||!time(row.issued_at)||!time(row.expires_at)||row.issued_at>now
  ||(row.action==='grant'?row.expires_at<=row.issued_at||row.expires_at-row.issued_at>600000:row.expires_at!==row.issued_at))return fail(503,'consent_unavailable');
 return{status:200,granted:row.action==='grant'&&row.revision===row.currentRevision&&row.expires_at>now,
  sequence:row.sequence,revision:row.revision,issuedAt:row.issued_at,expiresAt:row.expires_at};
}
export async function recordAssistanceGoalConsent(options){
 if(!valid(options)||!['grant','revoke'].includes(options.action)||typeof options.requestId!=='string'||!uuid.test(options.requestId)
  ||!Number.isSafeInteger(options.revision)||options.revision<1||!time(options.now+600000))return fail(400,'invalid_input');
 const {projectId,userId,sourceId,revision,action,requestId,now}=options,db=primary(options.db);
 const expiresAt=action==='grant'?(options.expiresAt??now+600000):now;
 if(!time(expiresAt)||(action==='grant'&&(expiresAt<=now||expiresAt-now>600000)))return fail(400,'invalid_input');
 const source=await db.prepare(sourceSql).bind(projectId,userId,sourceId).first();
 if(!source)return fail(404,'project_unavailable');
 const payload=sourcePayload(source,now);if(!payload)return fail(409,'assistance_unavailable');
 const recover=async()=>{
  const row=await db.prepare('SELECT * FROM assistance_goal_consent_events WHERE project_id=? AND request_id=?').bind(projectId,requestId).first();
  if(!row)return null;
  if(row.user_id!==userId||row.source_event_id!==sourceId||row.revision!==revision||row.action!==action||row.consent_version!==VERSION)return fail(409,'idempotency_conflict');
  return readAssistanceGoalConsent(options);
 };
 const prior=await recover();if(prior)return prior;
 if(payload.expectedRevision!==revision||(action==='grant'&&source.currentRevision!==revision))return fail(409,'project_changed');
 await db.prepare(`INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at)
 SELECT ?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM site_projects p JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id
 WHERE p.id=? AND p.user_id=? AND e.id=? AND e.type='assistance_requested' AND e.payload_json=? AND e.created_at=? ${action==='grant'?'AND p.revision=?':''})
 ON CONFLICT(project_id,request_id) DO NOTHING`).bind(projectId,userId,sourceId,revision,action,VERSION,requestId,now,expiresAt,
 projectId,userId,sourceId,source.payload_json,source.created_at,...(action==='grant'?[revision]:[])).run();
 return(await recover())??fail(409,'project_changed');
}
