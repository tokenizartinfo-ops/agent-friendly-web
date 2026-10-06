import {isCopilotProjectAllowed} from './copilot-rollout.mjs';
import {readAssistanceGoalConsent,recordAssistanceGoalConsent} from './assistance-goal-consent.mjs';
const sourcePattern=/^help-[0-9a-f]{64}$/;
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const failure=(status,code)=>({status,code});
const reply=result=>Response.json(result.status===200?{granted:result.granted,issuedAt:result.issuedAt,expiresAt:result.expiresAt,stateVersion:result.stateVersion}:{code:result.code},{status:result.status,headers:{'cache-control':'no-store'}});
async function boundedBody(request){
 const reader=request.body?.getReader();if(!reader)throw{status:400};let size=0,timer;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject({status:408}),3000);});
 try{
  while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>768)throw{status:413};chunks.push(part.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 }finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
const validBody=body=>body&&typeof body==='object'&&!Array.isArray(body)&&Object.keys(body).length===6
 &&['action','sourceId','expectedRevision','consentVersion','requestId','stateVersion'].every(key=>Object.hasOwn(body,key))
 &&['grant','revoke'].includes(body.action)&&typeof body.sourceId==='string'&&sourcePattern.test(body.sourceId)
 &&Number.isSafeInteger(body.expectedRevision)&&body.expectedRevision>0&&body.consentVersion==='afw.assistance-goals-consent.v1'
 &&typeof body.stateVersion==='string'&&/^[0-9a-f]{64}$/.test(body.stateVersion)
 &&typeof body.requestId==='string'&&uuid.test(body.requestId);

export function createAssistanceGoalConsentHandler({getSettings,getIdentity,db,limiter,now=Date.now}){
 return async(request,projectId)=>{
  const started=now(),initial=getSettings(),until=Date.parse(initial.expiresAt);
  const open=()=>{
   const settings=getSettings(),clock=now();
   return Number.isSafeInteger(clock)&&clock>=started&&Number.isFinite(until)&&until>started&&until-started<=600000
    &&typeof initial.expiresAt==='string'&&new Date(until).toISOString()===initial.expiresAt&&clock<until
    &&settings.expiresAt===initial.expiresAt&&isCopilotProjectAllowed({enabled:settings.enabled===true,allowedProjectId:settings.allowedProjectId,projectId});
  };
  if(!open())return reply(failure(404,'unavailable'));
  try{
   const user=await getIdentity();if(!user)return reply(failure(401,'authentication_required'));
   if(!open())return reply(failure(404,'unavailable'));
   const primary=db.withSession?db.withSession('first-primary'):db;
   if(!await primary.prepare('SELECT id FROM site_projects WHERE id=? AND user_id=?').bind(projectId,user.userId).first())return reply(failure(404,'project_unavailable'));
   let sourceId,body;
   const url=new URL(request.url);
   if(request.method==='GET'){
    if([...url.searchParams.keys()].length!==1||!url.searchParams.has('source'))return reply(failure(400,'invalid_input'));
    sourceId=url.searchParams.get('source');if(!sourcePattern.test(sourceId||''))return reply(failure(400,'invalid_input'));
   }else if(request.method==='POST'){
    if(request.headers.get('origin')!==url.origin||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply(failure(403,'invalid_origin'));
    if(url.search)return reply(failure(400,'invalid_input'));
    try{body=await boundedBody(request);}catch(error){return reply(failure(error.status||400,'invalid_input'));}
    if(!validBody(body))return reply(failure(400,'invalid_input'));sourceId=body.sourceId;
    if(typeof limiter?.limit!=='function')return reply(failure(503,'consent_unavailable'));
    if(!(await limiter.limit({key:'assistance-consent:'+user.userId})).success)return reply(failure(429,'try_later'));
   }else return reply(failure(405,'method_not_allowed'));
   const fresh=await getIdentity();if(!fresh||fresh.userId!==user.userId)return reply(failure(401,'authentication_required'));
   if(!open())return reply(failure(404,'unavailable'));
   const options={db:primary,projectId,userId:user.userId,sourceId,now:now()};
   if(body){
    const baseline=await readAssistanceGoalConsent(options);if(baseline.status!==200)return reply(baseline);
    if(!open())return reply(failure(404,'unavailable'));
    const written=await recordAssistanceGoalConsent({...options,revision:body.expectedRevision,action:body.action,requestId:body.requestId,expiresAt:until,expectedProjectSequence:baseline.projectSequence,expectedStateVersion:body.stateVersion});
    if(written.status!==200)return reply(written);
   }
   const current=await getIdentity();if(!current||current.userId!==user.userId)return reply(failure(401,'authentication_required'));
   if(!open())return reply(failure(404,'unavailable'));
   const state=await readAssistanceGoalConsent({...options,now:now()});
   if(!open())return reply(failure(404,'unavailable'));
   if(state.status===200&&state.granted&&state.expiresAt<=now())state.granted=false;
   return reply(state);
  }catch{return reply(failure(503,'consent_unavailable'));}
 };
}
