import {isCopilotProjectAllowed} from './copilot-rollout.mjs';
import {readOwnerAssistanceGoalProposal} from './assistance-goal-owner-proposal.mjs';
import {confirmOwnerAssistanceGoalRead} from './assistance-goal-read-confirmation.mjs';
async function boundedBody(request){
 const reader=request.body?.getReader();if(!reader)throw{status:400};let size=0,timer;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject({status:408}),3000);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>768)throw{status:413};chunks.push(part.value);}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}
 finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
export function createOwnerAssistanceGoalProposalHandler({getSettings,getIdentity,db,limiter,now=Date.now}){
 return async(request,projectId)=>{
 const initial=getSettings(),start=now(),deadline=Date.parse(initial.expiresAt);
 const open=()=>{const current=getSettings(),clock=now();return Number.isSafeInteger(clock)&&clock>=start&&Number.isFinite(deadline)&&deadline>clock&&deadline-start<=600000&&new Date(deadline).toISOString()===initial.expiresAt&&current.expiresAt===initial.expiresAt&&isCopilotProjectAllowed({enabled:current.enabled===true,allowedProjectId:current.allowedProjectId,projectId});};
 const reply=(status,body)=>Response.json(body,{status,headers:{'cache-control':'no-store'}});
 if(!open())return reply(404,{code:'unavailable'});
 if(!['GET','POST'].includes(request.method))return reply(405,{code:'method_not_allowed'});
 try{
 const user=await getIdentity();if(!user)return reply(401,{code:'authentication_required'});
 const url=new URL(request.url);let sourceId,body;
 if(request.method==='GET'){
 if([...url.searchParams.keys()].length!==1||!/^help-[a-f0-9]{64}$/.test(url.searchParams.get('source')||''))return reply(400,{code:'invalid_input'});sourceId=url.searchParams.get('source');
 }else{
 if(request.headers.get('origin')!==url.origin||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply(403,{code:'invalid_origin'});
 if(url.search)return reply(400,{code:'invalid_input'});
 try{body=await boundedBody(request);}catch(error){return reply(error.status||400,{code:'invalid_input'});}
 if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).sort().join(',')!=='expectedRevision,proposalId,requestId,sourceId'||!/^help-[a-f0-9]{64}$/.test(body.sourceId||'')||!uuid(body.proposalId)||!uuid(body.requestId)||!Number.isSafeInteger(body.expectedRevision)||body.expectedRevision<1)return reply(400,{code:'invalid_input'});
 sourceId=body.sourceId;
 if(typeof limiter?.limit!=='function')return reply(503,{code:'confirmation_unavailable'});
 if(!(await limiter.limit({key:'assistance-read-confirmation:'+user.userId})).success)return reply(429,{code:'try_later'});
 }
 if(!open())return reply(404,{code:'unavailable'});
 const options={db,projectId,userId:user.userId,sourceId};
 if(body){
 const fresh=await getIdentity();if(!fresh||fresh.userId!==user.userId)return reply(401,{code:'authentication_required'});
 if(!open())return reply(404,{code:'unavailable'});
 const confirmed=await confirmOwnerAssistanceGoalRead({...options,proposalId:body.proposalId,revision:body.expectedRevision,requestId:body.requestId,now:now()});
 const current=await getIdentity();if(!current||current.userId!==user.userId)return reply(401,{code:'authentication_required'});
 if(!open())return reply(404,{code:'unavailable'});
 // Re-read through the same owner-scoped conditional adapter. A lost response
 // is recovered by GET or retry; never report a timestamp after ownership changes.
 if(confirmed.status!==200)return reply(confirmed.status,{code:confirmed.code});
 const recovered=await confirmOwnerAssistanceGoalRead({...options,proposalId:body.proposalId,revision:body.expectedRevision,requestId:body.requestId,now:now()});
 if(!open())return reply(404,{code:'unavailable'});
 return reply(recovered.status,recovered.status===200?{confirmedAt:recovered.confirmedAt}:{code:recovered.code});
 }
 const first=await readOwnerAssistanceGoalProposal({...options,now:now()});
 const fresh=await getIdentity();if(!fresh||fresh.userId!==user.userId)return reply(401,{code:'authentication_required'});
 if(!open())return reply(404,{code:'unavailable'});
 const result=await readOwnerAssistanceGoalProposal({...options,now:now()});
 if(!open())return reply(404,{code:'unavailable'});
 if(first.status!==result.status||JSON.stringify(first.guidance)!==JSON.stringify(result.guidance))return reply(409,{code:'proposal_changed'});
 return reply(result.status,result.status===200?{guidance:result.guidance}:{code:result.code});
 }catch{return reply(503,{code:'proposal_unavailable'});}
 };
}
