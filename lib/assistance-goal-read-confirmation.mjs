import {validAssistanceGoalProposal} from './assistance-goal-proposal.mjs';
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
export async function confirmOwnerAssistanceGoalRead({db,projectId,userId,sourceId,proposalId,revision,requestId,now=Date.now()}){
 const fail={status:409,code:'proposal_changed'};
 if(!db?.prepare||!id(projectId)||!id(userId)||!/^help-[a-f0-9]{64}$/.test(sourceId||'')||!uuid(proposalId)||!uuid(requestId)||!Number.isSafeInteger(revision)||revision<1||!Number.isSafeInteger(now)||now<0)return{status:400,code:'invalid_input'};
 try{
 const primary=db.withSession?db.withSession('first-primary'):db;
 const existing=()=>primary.prepare(`SELECT a.proposal_id AS proposalId,a.source_event_id AS sourceId,a.revision,a.confirmed_at AS confirmedAt
 FROM assistance_goal_read_confirmations a JOIN site_projects p ON p.id=a.project_id AND p.user_id=a.user_id
 WHERE a.project_id=? AND a.user_id=? AND (a.request_id=? OR a.proposal_id=?) ORDER BY CASE WHEN a.request_id=? THEN 0 ELSE 1 END LIMIT 1`).bind(projectId,userId,requestId,proposalId,requestId).first();
 const recovered=await existing();
 const receipt=row=>row&&row.proposalId===proposalId&&row.sourceId===sourceId&&row.revision===revision&&Number.isSafeInteger(row.confirmedAt)&&row.confirmedAt>=0&&row.confirmedAt<=now?{status:200,confirmedAt:row.confirmedAt}:fail;
 if(recovered)return receipt(recovered);
 const row=await primary.prepare(`SELECT x.payload_json AS payload,x.prepared_at AS preparedAt,r.id AS receiptId,r.expires_at AS expiresAt,r.revision
 FROM assistance_goal_proposal_results x JOIN assistance_goal_read_receipts r ON r.id=x.receipt_id
 JOIN site_projects p ON p.id=r.project_id AND p.user_id=r.user_id AND p.revision=r.revision
 JOIN project_events e ON e.id=r.source_event_id AND e.project_id=p.id AND e.user_id=p.user_id AND e.type='assistance_requested'
 WHERE x.proposal_id=? AND p.id=? AND p.user_id=? AND e.id=? AND r.revision=?
 AND r.expires_at>? AND x.prepared_at<=?
 AND x.proposal_id=(SELECT x2.proposal_id FROM assistance_goal_proposal_results x2 JOIN assistance_goal_read_receipts r2 ON r2.id=x2.receipt_id WHERE r2.project_id=p.id AND r2.user_id=p.user_id AND r2.source_event_id=e.id ORDER BY x2.prepared_at DESC,x2.proposal_id DESC LIMIT 1)`)
 .bind(proposalId,projectId,userId,sourceId,revision,now,now).first();
 if(!row||typeof row.payload!=='string'||row.payload.length>2048||!validAssistanceGoalProposal(JSON.parse(row.payload),{receiptId:row.receiptId,revision,expiresAt:row.expiresAt}))return fail;
 await primary.prepare(`INSERT OR IGNORE INTO assistance_goal_read_confirmations(project_id,user_id,source_event_id,proposal_id,revision,request_id,confirmed_at)
 SELECT p.id,p.user_id,e.id,x.proposal_id,r.revision,?,? FROM assistance_goal_proposal_results x
 JOIN assistance_goal_read_receipts r ON r.id=x.receipt_id JOIN site_projects p ON p.id=r.project_id AND p.user_id=r.user_id AND p.revision=r.revision
 JOIN project_events e ON e.id=r.source_event_id AND e.project_id=p.id AND e.user_id=p.user_id AND e.type='assistance_requested'
 WHERE x.proposal_id=? AND p.id=? AND p.user_id=? AND e.id=? AND r.revision=? AND r.expires_at>? AND x.prepared_at<=? AND x.payload_json=?
 AND x.proposal_id=(SELECT x2.proposal_id FROM assistance_goal_proposal_results x2 JOIN assistance_goal_read_receipts r2 ON r2.id=x2.receipt_id WHERE r2.project_id=p.id AND r2.user_id=p.user_id AND r2.source_event_id=e.id ORDER BY x2.prepared_at DESC,x2.proposal_id DESC LIMIT 1)`)
 .bind(requestId,now,proposalId,projectId,userId,sourceId,revision,now,now,row.payload).run();
 return receipt(await existing());
 }catch{return{status:503,code:'confirmation_unavailable'};}
}
