import {knownGoalCodes} from './copilot-goal-contract.mjs';
const fail=(status,code)=>({status,code});
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const types=new Set(['','artist','gallery','museum','institution','commerce','other']);
// Internal storage preparation only. This function authenticates no service and grants
// no authority. A future adapter must resolve actor/source/clock by server, authenticate
// a separate purpose, bind the signed event and live lease, and fence again at delivery.
// Never serialize this internal snapshot as a browser/cloud HTTP response.
export async function readAssistanceGoalSnapshot({db,userId,projectId,sourceId,now}={}){
 if(!db?.prepare||!id(userId)||!id(projectId)||typeof sourceId!=='string'||!/^help-[a-f0-9]{64}$/.test(sourceId)||!time(now))return fail(400,'invalid_input');
 try{
  const primary=db.withSession?db.withSession('first-primary'):db;
  const row=await primary.prepare(`SELECT p.revision,p.site_type AS siteType,p.goals_json AS goalsJson,
   e.payload_json AS payloadJson,e.created_at AS createdAt,
   c.sequence,c.revision AS consentRevision,c.action,c.consent_version AS consentVersion,c.issued_at AS issuedAt,c.expires_at AS expiresAt
   FROM site_projects p JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id
   LEFT JOIN assistance_goal_consent_events c ON c.project_id=p.id AND c.user_id=p.user_id AND c.source_event_id=e.id
    AND c.sequence=(SELECT MAX(sequence) FROM assistance_goal_consent_events WHERE project_id=p.id AND user_id=p.user_id AND source_event_id=e.id)
   WHERE p.id=? AND p.user_id=? AND e.id=? AND e.type='assistance_requested'`).bind(projectId,userId,sourceId).first();
  if(!row)return fail(404,'project_unavailable');
  if(!Number.isSafeInteger(row.sequence)||row.sequence<1||row.action!=='grant'||row.consentVersion!=='afw.assistance-goals-consent.v1'||row.consentRevision!==row.revision||!time(row.issuedAt)||!time(row.expiresAt)||row.issuedAt>now||row.expiresAt<=now||row.expiresAt<=row.issuedAt||row.expiresAt-row.issuedAt>600000)return fail(403,'consent_required');
  const payload=JSON.parse(row.payloadJson),keys=['contract','requestId','expectedRevision','topic'];
  if(!payload||Array.isArray(payload)||Object.keys(payload).length!==4||!keys.every(key=>Object.hasOwn(payload,key))||payload.contract!=='afw.assistance-request.v1'||payload.topic!=='orientation'||typeof payload.requestId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(payload.requestId)||!Number.isSafeInteger(row.revision)||row.revision<1||payload.expectedRevision!==row.revision||typeof row.createdAt!=='string'||new Date(row.createdAt).toISOString()!==row.createdAt||Date.parse(row.createdAt)>now)return fail(409,'assistance_unavailable');
  if(!types.has(row.siteType)||typeof row.goalsJson!=='string'||row.goalsJson.length>256)return fail(409,'declarations_unavailable');
  const goals=JSON.parse(row.goalsJson);
  if(!Array.isArray(goals)||goals.length>5||knownGoalCodes(goals).length!==goals.length)return fail(409,'declarations_unavailable');
  return{status:200,snapshot:{
   project:{id:projectId,userId,revision:row.revision,siteType:row.siteType,goalsJson:row.goalsJson},
   source:{id:sourceId,projectId,type:'assistance_requested',createdAt:row.createdAt,payload},
   consent:{sequence:row.sequence,issuedAt:row.issuedAt,expiresAt:row.expiresAt},
  }};
 }catch{return fail(503,'context_unavailable');}
}
