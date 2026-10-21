import {createHash} from 'node:crypto';
import {readRecord,ref,text,clock as validWall} from './agent-consumption-input.mjs';
import {normalizeIntake,completionForIntake} from './intake.mjs';
import {readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';

const OPTIONS=['enabled','profile','resolveIdentity','createPrimarySession','now','requestLease'];
const PROFILE=['profileId','operationKey','subject','startedAt','expiresAt'];
const INPUT=['contract','confirmCreate','idempotencyKey','website','organization'];
const IDENTITY=['subject','email','expiresAt'];
const ORIGIN='https://agentfriendlyweb.dev',CONTRACT='agentfriendly.project-create.v1';
const SQL_NOW="((julianday('now')-2440587.5)*86400000)";
const operationKey=value=>typeof value==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(value);
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const result=(code,projectRef=null)=>Object.freeze({
 contract:'afw.preparation-source-intake-receipt.v1',code,projectRef,sourceRecorded:projectRef!==null,
 domainVerificationRequired:true,sourceVerified:false,consentGranted:false,authorizationGranted:false,
 operationalReadiness:false,executionAllowed:false,chargeAllowed:false,publicationAllowed:false,
});
function profileOf(raw){
 const p=readRecord(raw,PROFILE);
 return p&&p.profileId==='afw.preparation-source-intake.v1'&&operationKey(p.operationKey)&&ref(p.subject)
  &&validWall(p.startedAt)&&validWall(p.expiresAt)&&p.expiresAt>p.startedAt&&p.expiresAt-p.startedAt<=600000?p:null;
}
function inputOf(raw,p){
 const r=readRecord(raw,INPUT);
 if(!r||r.contract!==CONTRACT||r.confirmCreate!==true||r.idempotencyKey!==p.operationKey||!text(r.organization,200)||typeof r.website!=='string')return null;
 try{
  const u=new URL(r.website);
  if(u.origin!==ORIGIN||u.username||u.password||u.pathname!=='/'||u.search||u.hash)return null;
 }catch{return null;}
 return normalizeIntake({website:r.website,organization:r.organization});
}
const READ=`SELECT p.id AS project_id,p.user_id,p.owner_email,p.website,p.organization,p.revision,p.status,p.created_at,p.updated_at,
 e.id AS event_id,e.project_id AS event_project,e.user_id AS event_owner,e.type AS event_type,e.payload_json,e.created_at AS event_created
 FROM (SELECT 1) seed LEFT JOIN site_projects p ON p.id=? LEFT JOIN project_events e ON e.id=?`;

/** Unmounted storage core. resolveIdentity MUST be a trusted server adapter for
 * verified Access identity; this module does not authenticate browser input.
 * No caller-provided owner, source proof, grant, migration or network callback.
 */
export function createPreparationSourceIntakeStore(options){
 const cfg=readRecord(options,OPTIONS);
 if(!cfg||cfg.enabled!==true)return null;
 const p=profileOf(cfg.profile),control=readCapsulePreparationRequestLease(cfg.requestLease);
 if(!p||!control||typeof cfg.resolveIdentity!=='function'||typeof cfg.createPrimarySession!=='function'||typeof cfg.now!=='function')return null;
 let invalidated=false,lastWall;
 function check(){
  if(invalidated)throw Error('Source intake unavailable');
  try{
   const live=readRecord(options,OPTIONS),profile=profileOf(live?.profile);
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||!profile||!PROFILE.every(k=>profile[k]===p[k]))throw Error();
   // Capture wall BEFORE obtaining the remaining original lifetime: later work
   // cannot receive a fresh five-second SQL budget after an awaited operation.
   const wall=cfg.now(),lifetime=control.check();
   if(!validWall(wall)||wall<lifetime.started||wall>=lifetime.notAfter||wall<p.startedAt||wall>=p.expiresAt
    ||(lastWall!==undefined&&wall<lastWall))throw Error();
   lastWall=wall;
   const deadline=Math.floor(Math.min(lifetime.notAfter,p.expiresAt,wall+lifetime.remaining));
   if(deadline<=wall)throw Error();
   return {wall,deadline};
  }catch{invalidated=true;throw Error('Source intake unavailable');}
 }
 try{check();}catch{return null;}
 async function operate(input,write){
  const intake=inputOf(input,p);if(!intake)return result('invalid_source_request');
  let dispatched=false,identityExpires=Infinity;
  function current(){
   const time=check();
   if(time.wall>=identityExpires)throw Error('Source intake unavailable');
   return {wall:time.wall,deadline:Math.min(time.deadline,identityExpires)};
  }
  async function wait(work){return control.wait(async()=>{current();const value=await work();current();return value;});}
  try{
   current();
   const identity=readRecord(await wait(()=>cfg.resolveIdentity()),IDENTITY);
   if(!identity||identity.subject!==p.subject||!text(identity.email,254)||!/^\S+@[^\s@]+\.[^\s@]+$/.test(identity.email)
    ||!validWall(identity.expiresAt))return result('source_unavailable');
   identityExpires=identity.expiresAt;current();
   const db=cfg.createPrimarySession();current();
   if(typeof db?.prepare!=='function'||(write&&typeof db?.batch!=='function'))throw Error();
   const columns=await wait(()=>db.prepare('PRAGMA table_info(project_events)').all());
   const receiptKey=columns?.results?.find(row=>row.name==='id');
   if(receiptKey?.notnull!==1||receiptKey.pk!==1||receiptKey.type?.toUpperCase()!=='TEXT')throw Error();
   const projectId='project-'+hash(['project-create-v1',identity.subject,p.operationKey]);
   const eventId='creation-'+hash(['project-create-receipt-v1',identity.subject,p.operationKey]);
   const requestHash=hash([intake.website,intake.organization,p.profileId,p.subject,p.operationKey,p.startedAt,p.expiresAt]);
   const payload=JSON.stringify({contract:CONTRACT,requestHash,purpose:'own-preparation-trial',revision:1});
   async function original(){return wait(()=>db.prepare(READ).bind(projectId,eventId).first());}
   function match(row){
    return row?.project_id===projectId&&row.user_id===identity.subject&&row.owner_email===identity.email
     &&row.website===intake.website&&row.organization===intake.organization&&row.revision===1&&row.status==='draft'
     &&row.event_id===eventId&&row.event_project===projectId&&row.event_owner===identity.subject&&row.event_type==='project_created'
     &&row.payload_json===payload&&row.created_at===row.event_created&&row.updated_at===row.event_created;
   }
   const prior=await original();
   if(!prior)throw Error();
   if(prior.project_id||prior.event_id)return match(prior)?result('source_already_recorded',projectId):result('source_conflict');
   if(!write)return result('source_not_recorded');
   const time=current(),at=new Date(time.wall).toISOString();
   const inWindow=' AND '+SQL_NOW+'>=? AND '+SQL_NOW+'<? AND '+SQL_NOW+'<?';
   // D1 batch is atomic. Receipt first ONLY for an absent project; the second
   // statement may create that project ONLY from this exact original receipt.
   const statements=[
    db.prepare(`INSERT INTO project_events(id,project_id,user_id,type,payload_json,created_at)
     SELECT ?,?,?,'project_created',?,? WHERE NOT EXISTS(SELECT 1 FROM site_projects WHERE id=?)`+inWindow+' ON CONFLICT DO NOTHING')
     .bind(eventId,projectId,identity.subject,payload,at,projectId,p.startedAt,p.expiresAt,time.deadline),
    db.prepare(`INSERT INTO site_projects(id,user_id,owner_email,organization,website,completion,status,created_at,updated_at)
     SELECT ?,?,?,?,?,?,'draft',e.created_at,e.created_at FROM project_events e
     WHERE e.id=? AND e.project_id=? AND e.user_id=? AND e.type='project_created' AND e.payload_json=?`+inWindow+' ON CONFLICT DO NOTHING')
     .bind(projectId,identity.subject,identity.email,intake.organization,intake.website,completionForIntake(intake),
      eventId,projectId,identity.subject,payload,p.startedAt,p.expiresAt,time.deadline),
    // Conditional constraint assertion. A receipt without its exact project
    // deliberately violates the verified canonical NOT NULL key; D1 rolls
    // back the ENTIRE batch, including expiry between its first two steps.
    db.prepare(`UPDATE project_events SET id=NULL WHERE id=? AND project_id=? AND user_id=? AND payload_json=?
     AND NOT EXISTS(SELECT 1 FROM site_projects p WHERE p.id=? AND p.user_id=? AND p.owner_email=?
      AND p.website=? AND p.organization=? AND p.revision=1 AND p.status='draft'
      AND p.created_at=project_events.created_at AND p.updated_at=project_events.created_at)`)
     .bind(eventId,projectId,identity.subject,payload,projectId,identity.subject,identity.email,intake.website,intake.organization),
   ];
   const ack=await wait(()=>{dispatched=true;return db.batch(statements);});
   if(!Array.isArray(ack)||ack.length!==3||ack[2]?.meta?.changes!==0||!ack.every(x=>x?.success===true&&Number.isSafeInteger(x.meta?.changes)&&x.meta.changes>=0&&x.meta.changes<=1))return result('unknown_ack');
   const saved=await original();current();
   if(!match(saved))return result('unknown_ack');
   return result(ack[1].meta.changes===1?'source_created':'source_already_recorded',projectId);
  }catch{return result(dispatched?'unknown_ack':'source_unavailable');}
 }
 // These wrappers choose the operation; request fields cannot switch modes.
 return Object.freeze({create:input=>operate(input,true),inspect:input=>operate(input,false)});
}
