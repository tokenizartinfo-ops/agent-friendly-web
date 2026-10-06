import {isCopilotProjectAllowed} from './copilot-rollout.mjs';
import {validateAssistanceReview} from './assistance-feedback.mjs';
const TYPE='assistance_requested',CONTRACT='afw.assistance-request.v1';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const topics=new Set(['orientation','save','comparison','delivery']);
const fail=(status,code)=>({status,code});
const projectSql='SELECT revision FROM site_projects WHERE id=? AND user_id=?';
function valid(raw){const keys=['contract','requestId','expectedRevision','topic'];return raw&&typeof raw==='object'&&!Array.isArray(raw)&&Object.keys(raw).length===keys.length&&keys.every(x=>Object.hasOwn(raw,x))&&raw.contract===CONTRACT&&UUID.test(raw.requestId)&&Number.isSafeInteger(raw.expectedRevision)&&raw.expectedRevision>0&&topics.has(raw.topic);}
function present(event,revision){const body=JSON.parse(event.payload_json);if(!valid(body))throw Error('Invalid assistance receipt');return{id:event.id,requestedAt:event.created_at,revision:body.expectedRevision,topic:body.topic,state:'received',stale:body.expectedRevision!==revision};}
export async function readAssistanceRequest(db,userId,projectId,{feedbackEnabled=false}={}){
 const project=await db.prepare(projectSql).bind(projectId,userId).first();if(!project)return fail(404,'project_unavailable');
 const event=await db.prepare('SELECT * FROM project_events WHERE project_id=? AND user_id=? AND type=? ORDER BY rowid DESC LIMIT 1').bind(projectId,userId,TYPE).first();
 const receipt=event?present(event,project.revision):null;
 if(receipt&&feedbackEnabled){
  const row=await db.prepare('SELECT f.review_json,d.event_id,d.project_ref FROM assistance_feedback_receipts f JOIN assistance_delivery_receipts d ON d.source_event_id=f.source_event_id WHERE f.source_event_id=?').bind(event.id).first();
  if(row){const review=validateAssistanceReview(JSON.parse(row.review_json));if(review.eventId!==row.event_id||review.projectRef!==row.project_ref||review.revision!==receipt.revision||review.topic!==receipt.topic||review.reviewedAt<Date.parse(receipt.requestedAt))throw Error('Invalid assistance review');receipt.review={outcome:review.outcome,reviewedAt:review.reviewedAt};}
 }
 if(!await db.prepare(projectSql).bind(projectId,userId).first())return fail(404,'project_unavailable');
 return{status:200,receipt};
}
/** The committed private journal entry is also the future outbox source. No remote call on the save path. */
export async function saveAssistanceRequest(db,userId,projectId,raw){
 const project=await db.prepare(projectSql).bind(projectId,userId).first();if(!project)return fail(404,'project_unavailable');
 if(!valid(raw))return fail(400,'invalid_assistance_request');
 const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([CONTRACT,userId,projectId,raw.requestId])));
 const id='help-'+Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('');
 const payload=JSON.stringify({contract:CONTRACT,requestId:raw.requestId,expectedRevision:raw.expectedRevision,topic:raw.topic});
 const recover=async()=>{const event=await db.prepare('SELECT * FROM project_events WHERE id=? AND project_id=? AND user_id=? AND type=?').bind(id,projectId,userId,TYPE).first();if(!event)return null;if(event.payload_json!==payload)return fail(409,'idempotency_conflict');const current=await db.prepare(projectSql).bind(projectId,userId).first();return current?{status:200,receipt:present(event,current.revision)}:fail(404,'project_unavailable');};
 const prior=await recover();if(prior)return prior;
 // One statement admits only the current owner's exact saved revision; double clicks share one primary key.
 await db.prepare('INSERT INTO project_events(id,project_id,user_id,type,payload_json,created_at) SELECT ?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM site_projects WHERE id=? AND user_id=? AND revision=?) ON CONFLICT(id) DO NOTHING').bind(id,projectId,userId,TYPE,payload,new Date().toISOString(),projectId,userId,raw.expectedRevision).run();
 return(await recover())??fail(409,'project_changed');
}
async function body(request){
 const reader=request.body?.getReader();if(!reader)throw{status:400};let timer,length=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject({status:408}),3000);});
 try{while(true){const value=await Promise.race([reader.read(),deadline]);if(value.done)break;length+=value.value.length;if(length>512)throw{status:413};chunks.push(value.value);}const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}
 finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
export function createAssistanceHandler({enabled,allowedProjectId,db,limiter,getIdentity,feedbackEnabled=false}){
 const reply=x=>Response.json(x,{status:x.status,headers:{'cache-control':'no-store'}});
 return async(request,projectId)=>{
  if(!isCopilotProjectAllowed({enabled,allowedProjectId,projectId}))return reply(fail(404,'unavailable'));
  try{
   const user=await getIdentity();if(!user)return reply(fail(401,'authentication_required'));
   const primary=db.withSession?db.withSession('first-primary'):db;
   if(!await primary.prepare(projectSql).bind(projectId,user.userId).first())return reply(fail(404,'project_unavailable'));
   if(request.method==='GET')return reply(await readAssistanceRequest(primary,user.userId,projectId,{feedbackEnabled}));
   if(request.method!=='POST')return reply(fail(405,'method_not_allowed'));
   if(request.headers.get('origin')!==new URL(request.url).origin||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply(fail(403,'invalid_origin'));
   let raw;try{raw=await body(request);}catch(error){return reply(fail(error.status||400,'invalid_input'));}
   if(!valid(raw))return reply(fail(400,'invalid_assistance_request'));
   if(typeof limiter?.limit!=='function')return reply(fail(503,'assistance_unavailable'));
   if(!(await limiter.limit({key:'assistance:'+user.userId})).success)return reply(fail(429,'try_later'));
   return reply(await saveAssistanceRequest(primary,user.userId,projectId,raw));
  }catch{return reply(fail(503,'assistance_unavailable'));}
 };
}
