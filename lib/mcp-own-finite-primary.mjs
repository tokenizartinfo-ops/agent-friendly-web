import {finiteFields as fields,finiteHash as hash,finiteTime as time,finiteControlIdentity} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite first-primary unavailable');};
/** Fixed first-primary D1 readback. No SQL/selector/receipt supplied by RPC.
 * Reservation/admission/launch tables already have immutable unique keys.
 * Existing closure rows (including NULL generation) are merely hashed history. */
export function createFiniteNativePrimaryReader({db,control,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,s=p.selectors,r=p.resources;
 if(typeof db?.withSession!=='function'||typeof now!=='function')fail();
 const session=db.withSession,prepare=db.prepare;let last=-1;
 const clock=()=>{const n=now();if(!time(n)||n<p.T0||n<last||db.withSession!==session||db.prepare!==prepare)fail();last=n;return n;};
 async function read(){
  clock();const d=db.withSession('first-primary');if(typeof d?.prepare!=='function')fail();
  const rows=async(sql,args)=>{clock();const result=await d.prepare(sql).bind(...args).all();clock();if(result?.success!==true||!Array.isArray(result.results)||result.results.length>1)fail();return result.results[0]??null;};
  const reservation=await rows('SELECT * FROM dossier_successor_reservations WHERE slot=? LIMIT 2',['afw.own-successor.v1']);
  const admission=await rows('SELECT * FROM dossier_node_process_admissions WHERE grant_id=? OR container_id=? LIMIT 2',[s.grantId,r.containerId]);
  const launch=await rows('SELECT * FROM dossier_successor_launch_claims WHERE trial_id=? OR container_id=? LIMIT 2',[p.trialId,r.containerId]);
  const closure=await rows('SELECT * FROM dossier_node_process_closures WHERE grant_id=? LIMIT 2',[s.grantId]);
  if(reservation&&(reservation.trial_id!==p.trialId||reservation.container_id!==r.containerId||reservation.program_hash!==s.programHash||reservation.source_revision!==s.sourceRevision||reservation.application_id!==r.applicationId||reservation.budget!==1||reservation.state!=='prepared'||reservation.start_at!==s.startAt||reservation.expires_at>s.expiresAt||reservation.reserved_at<p.T0))fail();
  if(admission&&(admission.grant_id!==s.grantId||admission.container_id!==r.containerId||admission.project_id!==s.projectId||admission.user_id!==s.subject||admission.client_id!==s.clientId||admission.resource!==s.resource||admission.program_hash!==s.programHash||admission.source_revision!==s.sourceRevision||admission.created_at<p.T0||admission.expires_at>s.expiresAt))fail();
  if(launch&&(launch.trial_id!==p.trialId||launch.container_id!==r.containerId||launch.grant_id!==s.grantId||!admission||launch.process_generation!==admission.process_generation||launch.claimed_at<p.T0))fail();
  if(closure&&(closure.grant_id!==s.grantId||closure.container_id!==r.containerId||closure.program_hash!==s.programHash||closure.source_revision!==s.sourceRevision))fail();
  return Object.freeze({purpose:'afw.finite-primary-snapshot.v1',intentId:p.intentId,controlHash:c.controlHash,observedAt:clock(),reservationHash:reservation?hash(reservation):null,admissionHash:admission?hash(admission):null,launchHash:launch?hash(launch):null,closureHash:closure?hash(closure):null,processGeneration:admission?.process_generation??null});
 }
 const settle=kind=>async value=>{
  const x=fields(value,['identityHash','claimHash']);const snapshot=await read(),row=snapshot[kind+'Hash'];if(!row)return null;
  return Object.freeze({purpose:'afw.own-finite-admission.v1:settled',identityHash:x.identityHash,kind,claimHash:x.claimHash,primaryRowHash:row,settledAt:clock()});
 };
 return Object.freeze({read,reservation:settle('reservation'),admission:settle('admission'),launch:settle('launch')});
}
