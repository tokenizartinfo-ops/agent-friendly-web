import {readCurrentAssistanceGoalReceipt} from './assistance-goal-read-receipt.mjs';
import {validAssistanceGoalProposal} from './assistance-goal-proposal.mjs';
import {validAssistanceGoalQuery} from './assistance-goal-service-identity.mjs';
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const fail=()=>({status:403,code:'proposal_unavailable'});
const primary=db=>db.withSession?db.withSession('first-primary'):db;
function scope(value){
 const {db,projectId,userId,query,now}=value||{};
 if(!db?.prepare||!id(projectId)||!id(userId)||!time(now)||!query||Object.keys(query).length!==5||!uuid(query.receiptId))return null;
 const opaque={eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:query.revision};if(!validAssistanceGoalQuery(opaque))return null;
 return{db:primary(db),projectId,userId,receiptId:query.receiptId,query:opaque,now};
}
const privateWhere=`FROM assistance_goal_read_receipts r
 JOIN site_projects p ON p.id=r.project_id AND p.user_id=r.user_id AND p.revision=r.revision
 JOIN assistance_goal_consent_events c ON c.project_id=p.id AND c.user_id=p.user_id AND c.source_event_id=r.source_event_id AND c.sequence=r.consent_sequence
 WHERE r.id=? AND p.id=? AND p.user_id=? AND r.event_id=? AND r.project_ref=? AND r.run_id=? AND r.revision=?
 AND r.context_hash=? AND p.site_type=? AND json(p.goals_json)=json(?)
 AND c.sequence=(SELECT MAX(sequence) FROM assistance_goal_consent_events WHERE project_id=p.id AND user_id=p.user_id AND source_event_id=r.source_event_id)
 AND c.action='grant' AND c.consent_version='afw.assistance-goals-consent.v1' AND c.revision=p.revision
 AND c.expires_at>=r.expires_at AND r.issued_at<=? AND r.expires_at>?`;
const bindScope=(s,read)=>[s.receiptId,s.projectId,s.userId,s.query.eventId,s.query.projectRef,s.query.runId,s.query.revision,read.receipt.contextHash,read.context.declarations.siteType,JSON.stringify(read.context.declarations.goals),s.now,s.now];
async function rowFor(s){return s.db.prepare(`SELECT c.claim_id AS claimId,c.context_hash AS contextHash,c.consent_sequence AS consentSequence,c.started_at AS startedAt,c.expires_at AS expiresAt,
 p.proposal_id AS proposalId,p.payload_json AS payloadJson,p.prepared_at AS preparedAt FROM assistance_goal_proposal_claims c
 LEFT JOIN assistance_goal_proposal_results p ON p.claim_id=c.claim_id AND p.receipt_id=c.receipt_id WHERE c.receipt_id=?`).bind(s.receiptId).first();}
function prepared(row,read,s){
 if(!row?.proposalId)return null;
 if(!uuid(row.proposalId)||!time(row.preparedAt)||row.preparedAt<row.startedAt||row.preparedAt>=row.expiresAt||row.preparedAt>s.now||typeof row.payloadJson!=='string'||row.payloadJson.length>2048)throw Error('invalid result');
 const proposal=JSON.parse(row.payloadJson);if(!validAssistanceGoalProposal(proposal,{receiptId:s.receiptId,revision:s.query.revision,expiresAt:read.receipt.expiresAt}))throw Error('invalid proposal');
 return{status:200,mode:'prepared',proposalId:row.proposalId,proposal};
}
// Internal private audit adapters only. Authentication, enrollment, active operational
// lease and immutable finite runtime window are separate coordinator requirements.
// Receipt/claim/proposal IDs grant no access and are not client-supplied actor authority.
export async function reserveAssistanceGoalProposal(value={}){
 try{
  const s=scope(value);if(!s)return fail();const read=await readCurrentAssistanceGoalReceipt(s);if(read.status!==200)return fail();
  const claimId=crypto.randomUUID(),expiresAt=Math.min(s.now+30000,read.receipt.expiresAt);
  await s.db.prepare(`INSERT OR IGNORE INTO assistance_goal_proposal_claims(receipt_id,claim_id,context_hash,consent_sequence,started_at,expires_at)
   SELECT r.id,?,r.context_hash,r.consent_sequence,?,? ${privateWhere}`).bind(claimId,s.now,expiresAt,...bindScope(s,read)).run();
  const row=await rowFor(s);if(!row||!uuid(row.claimId)||row.contextHash!==read.receipt.contextHash||row.consentSequence!==read.receipt.consentSequence||!time(row.startedAt)||!time(row.expiresAt)||row.startedAt>s.now||row.expiresAt-row.startedAt>30000||row.expiresAt<=row.startedAt||row.expiresAt>read.receipt.expiresAt)return fail();
  const result=prepared(row,read,s);
  const current=await readCurrentAssistanceGoalReceipt(s);if(!same(read,current))return fail();
  if(result)return result;
  if(row.expiresAt<=s.now)return{status:409,code:'proposal_attempt_expired'};
  return row.claimId===claimId?{status:200,mode:'claimed',claimId,expiresAt:row.expiresAt}:{status:202,mode:'processing',expiresAt:row.expiresAt};
 }catch{return fail();}
}
export async function completeAssistanceGoalProposal(value={}){
 try{
  const s=scope(value);if(!s||!uuid(value.claimId))return fail();const read=await readCurrentAssistanceGoalReceipt(s);if(read.status!==200||!validAssistanceGoalProposal(value.proposal,{receiptId:s.receiptId,revision:s.query.revision,expiresAt:read.receipt.expiresAt}))return fail();
  const proposal=structuredClone(value.proposal),payload=JSON.stringify(proposal);if(payload.length>2048||new TextEncoder().encode(payload).byteLength>4096)return fail();
  const proposalId=crypto.randomUUID();
  await s.db.prepare(`INSERT OR IGNORE INTO assistance_goal_proposal_results(claim_id,receipt_id,proposal_id,payload_json,prepared_at)
   SELECT ?,r.id,?,?,? ${privateWhere}
   AND EXISTS(SELECT 1 FROM assistance_goal_proposal_claims a WHERE a.receipt_id=r.id AND a.claim_id=? AND a.context_hash=r.context_hash AND a.consent_sequence=r.consent_sequence AND a.started_at<=? AND a.expires_at>?)`)
   .bind(value.claimId,proposalId,payload,s.now,...bindScope(s,read),value.claimId,s.now,s.now).run();
  const row=await rowFor(s);if(!row||row.claimId!==value.claimId||row.contextHash!==read.receipt.contextHash||row.consentSequence!==read.receipt.consentSequence)return fail();
  const result=prepared(row,read,s);if(!result||!same(result.proposal,proposal))return fail();
  if(!same(read,await readCurrentAssistanceGoalReceipt(s)))return fail();
  return{status:200,proposalId:result.proposalId,proposal:result.proposal};
 }catch{return fail();}
}
