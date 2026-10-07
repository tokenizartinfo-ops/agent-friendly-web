import {isCopilotProjectAllowed} from './copilot-rollout.mjs';
import {readOwnerAssistanceGoalProposal} from './assistance-goal-owner-proposal.mjs';
export function createOwnerAssistanceGoalProposalHandler({getSettings,getIdentity,db,now=Date.now}){
 return async(request,projectId)=>{
 const initial=getSettings(),start=now(),deadline=Date.parse(initial.expiresAt);
 const open=()=>{const current=getSettings(),clock=now();return Number.isSafeInteger(clock)&&clock>=start&&Number.isFinite(deadline)&&deadline>clock&&deadline-start<=600000&&new Date(deadline).toISOString()===initial.expiresAt&&current.expiresAt===initial.expiresAt&&isCopilotProjectAllowed({enabled:current.enabled===true,allowedProjectId:current.allowedProjectId,projectId});};
 const reply=(status,body)=>Response.json(body,{status,headers:{'cache-control':'no-store'}});
 if(!open())return reply(404,{code:'unavailable'});
 if(request.method!=='GET')return reply(405,{code:'method_not_allowed'});
 try{
 const user=await getIdentity();if(!user)return reply(401,{code:'authentication_required'});
 const url=new URL(request.url);if([...url.searchParams.keys()].length!==1||!/^help-[a-f0-9]{64}$/.test(url.searchParams.get('source')||''))return reply(400,{code:'invalid_input'});
 if(!open())return reply(404,{code:'unavailable'});
 const options={db,projectId,userId:user.userId,sourceId:url.searchParams.get('source')};
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
