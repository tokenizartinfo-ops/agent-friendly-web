import {recordAssistanceGoalRead} from './assistance-goal-read-receipt.mjs';
import {GOAL_READ_ORIGIN,GOAL_READ_PATH,verifyAssistanceGoalService,validAssistanceGoalQuery} from './assistance-goal-service-identity.mjs';
import {createAssistanceGoalReader} from './assistance-goal-reader.mjs';
import {readActiveAssistanceGoalLease} from './assistance-goal-lease.mjs';
import {readAssistanceGoalSnapshot} from './assistance-goal-snapshot.mjs';
const reply=(body,status)=>Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const secret=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
class BodyError extends Error{constructor(status){super('Invalid goal read body');this.status=status;}}
async function boundedBody(request,timeoutMs){
 if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw new BodyError(415);
 const reader=request.body?.getReader();if(!reader)throw new BodyError(400);let timer,size=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new BodyError(408)),timeoutMs);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>512)throw new BodyError(413);chunks.push(part.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 }catch(error){throw error instanceof BodyError?error:new BodyError(400);}finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
// Prepared service-only read adapter. No runtime mount, enrollment or custody is implied.
// All resource bindings/configuration are server dependencies. Access policy must be
// provisioned separately; neither this factory nor a caller-provided purpose grants access.
export function createAssistanceGoalHttp({sourceDb,operationsDb,getSettings,signingSecret,signalSecret,keySet,limiter,now=Date.now,bodyTimeoutMs=3000}={}){
 return async request=>{
  try{
   const started=now(),initial=structuredClone(getSettings?.()||{}),serialized=JSON.stringify(initial),until=Date.parse(initial.expiresAt),enrollment=initial.enrollment;
   const open=()=>initial.enabled===true&&initial.origin===GOAL_READ_ORIGIN&&Number.isSafeInteger(started)&&Number.isFinite(until)&&typeof initial.expiresAt==='string'&&new Date(until).toISOString()===initial.expiresAt&&until>started&&until-started<=600000&&now()>=started&&now()<until&&JSON.stringify(getSettings())===serialized;
   if(!open()||!sourceDb?.prepare||!operationsDb?.prepare||!secret(signingSecret)||!secret(signalSecret)||signingSecret===signalSecret||!enrollment||Object.keys(enrollment).length!==3||!id(enrollment.projectId)||!id(enrollment.userId)||typeof enrollment.since!=='string'||!Number.isFinite(Date.parse(enrollment.since))||new Date(enrollment.since).toISOString()!==enrollment.since||Date.parse(enrollment.since)>started)return reply({code:'unavailable'},404);
   const url=new URL(request.url);if(url.origin!==GOAL_READ_ORIGIN||url.pathname!==GOAL_READ_PATH||url.search||request.method!=='POST')return reply({code:'unavailable'},404);
   if(request.headers.has('origin')||request.headers.has('sec-fetch-site'))return reply({code:'service_request_required'},403);
   if(!Number.isSafeInteger(bodyTimeoutMs)||bodyTimeoutMs<10||bodyTimeoutMs>3000||typeof limiter?.limit!=='function')return reply({code:'unavailable'},503);
   let body;try{body=await boundedBody(request,bodyTimeoutMs);}catch(error){return reply({code:'invalid_request'},error.status||400);}
   let query;try{query=JSON.parse(body);}catch{return reply({code:'invalid_request'},400);}
   if(!validAssistanceGoalQuery(query))return reply({code:'invalid_request'},400);
   const authenticate=()=>verifyAssistanceGoalService({request,body,config:getSettings(),keySet,signingSecret,now:now()});
   const identity=await authenticate();if(!identity)return reply({code:'service_identity_required'},401);if(!open())return reply({code:'unavailable'},404);
   if(!(await limiter.limit({key:'afw-goal-context:'+identity.id})).success)return reply({code:'try_later'},429);if(!open())return reply({code:'unavailable'},404);
   const read=createAssistanceGoalReader({authenticate,signalSecret,isOpen:open,getWindowExpiresAt:()=>Date.parse(getSettings().expiresAt),now,
    resolveSource:async value=>{
     const db=sourceDb.withSession?sourceDb.withSession('first-primary'):sourceDb;
     const row=await db.prepare(`SELECT e.id AS sourceId,p.id AS projectId,p.user_id AS userId FROM site_projects p
      JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id JOIN assistance_delivery_receipts d ON d.source_event_id=e.id
      WHERE p.id=? AND p.user_id=? AND e.type='assistance_requested' AND e.created_at>=? AND d.event_id=? AND d.project_ref=?`)
      .bind(enrollment.projectId,enrollment.userId,enrollment.since,value.eventId,value.projectRef).first();return row?{...row}:null;
    },
    readLease:value=>readActiveAssistanceGoalLease({...value,db:operationsDb}),
    readSnapshot:value=>readAssistanceGoalSnapshot({...value,db:sourceDb}),
    recordRead:value=>recordAssistanceGoalRead({...value,db:sourceDb}),
   });
   const result=await read(query,request);if(!open())return reply({code:'unavailable'},404);
   return result.status===200?reply({context:result.context,receipt:result.receipt},200):reply({code:result.code},result.status);
  }catch{return reply({code:'context_unavailable'},503);}
 };
}
