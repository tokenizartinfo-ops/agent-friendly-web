import {validAssistanceGoalProposal} from './assistance-goal-proposal.mjs';
// Owner history read only. Never a service credential, acceptance or viewing receipt.
export async function readOwnerAssistanceGoalProposal({db,projectId,userId,sourceId,now=Date.now()}){
 const fail={status:404,code:'proposal_unavailable'};
 if(!db?.prepare||typeof projectId!=='string'||typeof userId!=='string'||!/^help-[a-f0-9]{64}$/.test(sourceId||'')||!Number.isSafeInteger(now)||now<0)return fail;
 try{
 const primary=db.withSession?db.withSession('first-primary'):db;
 const owner=()=>primary.prepare('SELECT revision FROM site_projects WHERE id=? AND user_id=?').bind(projectId,userId).first();
 const before=await owner();if(!before)return fail;
 const row=await primary.prepare(`SELECT x.payload_json AS payload,r.id AS receiptId,r.revision,r.expires_at AS expiresAt,x.prepared_at AS preparedAt
 FROM assistance_goal_proposal_results x JOIN assistance_goal_read_receipts r ON r.id=x.receipt_id
 JOIN project_events e ON e.id=r.source_event_id AND e.project_id=r.project_id AND e.user_id=r.user_id AND e.type='assistance_requested'
 WHERE r.project_id=? AND r.user_id=? AND r.source_event_id=? ORDER BY x.prepared_at DESC,x.proposal_id DESC LIMIT 1`).bind(projectId,userId,sourceId).first();
 const after=await owner();if(!after||after.revision!==before.revision)return fail;
 if(!row)return{status:200,guidance:null};
 if(typeof row.payload!=='string'||row.payload.length>2048||!Number.isSafeInteger(row.preparedAt)||row.preparedAt>now||row.preparedAt<0)return fail;
 const proposal=JSON.parse(row.payload);
 if(!validAssistanceGoalProposal(proposal,{receiptId:row.receiptId,revision:row.revision,expiresAt:row.expiresAt}))return fail;
 return{status:200,guidance:{message:proposal.message,preparedAt:row.preparedAt,revision:row.revision,expired:row.expiresAt<=now,stale:after.revision!==row.revision}};
 }catch{return fail;}
}
