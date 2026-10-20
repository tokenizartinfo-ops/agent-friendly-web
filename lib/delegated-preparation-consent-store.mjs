import {randomUUID} from 'node:crypto';
import {readRecord,readList,ref,text,oauthClientRef,clock as validWall,instant} from './agent-consumption-input.mjs';
import {readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';
import {evaluatePreparationConsentChoice} from './delegated-preparation-consent-policy.mjs';
import {checkAgentCapsulePreparationSchema} from './agent-capsule-preparation-schema.mjs';

const PROFILE='afw.preparation-consent.v1',READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const OPTIONS=['enabled','profile','createPrimarySession','now','requestLease'];
const PROFILE_KEYS=['profileId','projectId','clientId','resource','trialStartedAt','trialExpiresAt'];
const REF_KEYS=['handleHash','requestHash','subject'];
const BEGIN_KEYS=[...REF_KEYS,'requestedScopes','transactionStartedAt','transactionExpiresAt','expectedRevision'];
const identity=value=>ref(value)&&text(value,128);
const digest=value=>typeof value==='string'&&value.length===64&&!/[^a-f0-9]/.test(value);
const scopesOf=value=>{
 const a=readList(value,2);
 return a&&a.includes(READ)&&new Set(a).size===a.length&&a.every(s=>s===READ||s===DRAFTS)?(a.includes(DRAFTS)?[READ,DRAFTS]:[READ]):null;
};
const selected=decision=>decision==='read'?[READ]:[READ,DRAFTS];
const isoAt=ms=>{if(!validWall(ms))return null;const value=new Date(ms).toISOString();return instant(value)===ms?value:null;};
const SQL_NOW="((julianday('now')-2440587.5)*86400000)";
const SOURCE_SQL=`SELECT p.id,p.user_id,p.role,p.revision,p.website,s.id AS site_id,s.hostname,s.canonical_origin,
 s.user_id AS site_owner,s.verification_status,c.id AS claim_id,c.user_id AS claim_owner,c.status AS claim_status,c.verified_at
 FROM site_projects p JOIN registry_sites s ON s.project_id=p.id AND s.user_id=p.user_id
 JOIN domain_claims c ON c.id=(SELECT id FROM domain_claims WHERE site_id=s.id AND project_id=p.id AND user_id=p.user_id AND status='verified'
 ORDER BY verified_at DESC,id DESC LIMIT 1)
 WHERE p.id=? AND p.user_id=? AND p.role='owner'`;
const SOURCE_KEYS=['revision','website','site_id','hostname','canonical_origin','claim_id','verified_at'];
const CURRENT_FENCE=`EXISTS(SELECT 1 FROM site_projects p JOIN registry_sites s ON s.id=d.site_id AND s.project_id=p.id AND s.user_id=p.user_id
 JOIN domain_claims c ON c.id=d.claim_id AND c.site_id=s.id AND c.project_id=p.id AND c.user_id=p.user_id
 WHERE p.id=d.project_id AND p.user_id=d.user_id AND p.role='owner' AND p.revision=d.source_revision AND p.website=d.website
 AND s.hostname=d.hostname AND s.canonical_origin=d.canonical_origin AND s.verification_status='verified'
 AND c.status='verified' AND c.verified_at=d.claim_verified_at AND julianday(c.verified_at)<=julianday('now') AND julianday(c.verified_at)+90>julianday('now'))
 AND `+SQL_NOW+'>=d.transaction_started_at AND '+SQL_NOW+'<d.transaction_expires_at AND '+SQL_NOW+'>=d.trial_started_at AND '+SQL_NOW+'<d.trial_expires_at';
const LOOKUP=`SELECT d.*,p.user_id AS current_owner,p.role AS current_role,p.revision AS current_revision,p.website AS current_website,
 s.id AS current_site_id,s.user_id AS current_site_owner,s.project_id AS current_site_project,s.hostname AS current_hostname,
 s.canonical_origin AS current_origin,s.verification_status AS current_site_status,
 c.id AS current_claim_id,c.user_id AS current_claim_owner,c.project_id AS current_claim_project,c.site_id AS current_claim_site,
 c.status AS current_claim_status,c.verified_at AS current_verified,
 g.id AS actual_grant,g.user_id AS grant_owner,g.client_id AS grant_client,g.project_id AS grant_project,
 g.resource AS grant_resource,g.scopes_json AS grant_scopes,g.created_at AS grant_created,g.expires_at AS grant_expires,g.revoked_at AS grant_revoked
 FROM delegated_preparation_consents d LEFT JOIN site_projects p ON p.id=d.project_id
 LEFT JOIN registry_sites s ON s.id=d.site_id LEFT JOIN domain_claims c ON c.id=d.claim_id
 LEFT JOIN delegated_access_grants g ON g.id=d.grant_id
 WHERE d.handle_hash=? AND d.request_hash=? AND d.user_id=? AND d.profile_id=? AND d.project_id=? AND d.client_id=?
 AND d.resource=? AND d.trial_started_at=? AND d.trial_expires_at=? LIMIT 1`;
const objects=Object.freeze([
 {type:"table",name:"delegated_preparation_consents",sql:`CREATE TABLE IF NOT EXISTS delegated_preparation_consents (
 handle_hash TEXT PRIMARY KEY NOT NULL CHECK(length(handle_hash)=64),
 request_hash TEXT NOT NULL CHECK(length(request_hash)=64),
 profile_id TEXT NOT NULL CHECK(profile_id='afw.preparation-consent.v1'),
 user_id TEXT NOT NULL,
 client_id TEXT NOT NULL,
 project_id TEXT NOT NULL,
 resource TEXT NOT NULL,
 grant_id TEXT NOT NULL UNIQUE,
 requested_scopes_json TEXT NOT NULL CHECK(requested_scopes_json IN ('["afw:project:read"]','["afw:project:read","afw:capsule:prepare"]')),
 transaction_started_at INTEGER NOT NULL CHECK(transaction_started_at>=0),
 transaction_expires_at INTEGER NOT NULL CHECK(transaction_expires_at>transaction_started_at AND transaction_expires_at-transaction_started_at<=600000),
 trial_started_at INTEGER NOT NULL CHECK(trial_started_at>=0),
 trial_expires_at INTEGER NOT NULL CHECK(trial_expires_at>trial_started_at AND trial_expires_at-trial_started_at<=600000),
 source_revision INTEGER NOT NULL CHECK(source_revision>0),
 site_id TEXT NOT NULL,
 website TEXT NOT NULL,
 hostname TEXT NOT NULL,
 canonical_origin TEXT NOT NULL,
 claim_id TEXT NOT NULL,
 claim_verified_at TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','reserved','admitted','cancelled')),
 decision TEXT NOT NULL DEFAULT '' CHECK(decision IN ('','read','drafts','cancel')),
 choice_nonce TEXT NOT NULL DEFAULT '',
 choice_at INTEGER NOT NULL DEFAULT 0,
 expires_at INTEGER NOT NULL DEFAULT 0,
 grant_created_iso TEXT NOT NULL DEFAULT '',
 grant_expires_iso TEXT NOT NULL DEFAULT '',
 CHECK(transaction_started_at>=trial_started_at AND transaction_started_at<trial_expires_at),
 CHECK(decision<>'drafts' OR requested_scopes_json='["afw:project:read","afw:capsule:prepare"]'),
 CHECK(
  (state='pending' AND decision='' AND choice_nonce='' AND choice_at=0 AND expires_at=0 AND grant_created_iso='' AND grant_expires_iso='') OR
  (state IN ('reserved','admitted') AND decision IN ('read','drafts') AND length(choice_nonce)=36
   AND choice_at>=transaction_started_at AND choice_at<transaction_expires_at AND choice_at<trial_expires_at
   AND expires_at>choice_at AND expires_at<=transaction_expires_at AND expires_at<=trial_expires_at AND expires_at-choice_at<=600000
   AND length(grant_created_iso)=24 AND length(grant_expires_iso)=24) OR
  (state='cancelled' AND decision IN ('read','drafts','cancel') AND length(choice_nonce)=36 AND choice_at>=transaction_started_at)
 )
);`},
 {type:"trigger",name:"delegated_preparation_consents_immutable",sql:`CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_immutable
BEFORE UPDATE ON delegated_preparation_consents
WHEN NEW.handle_hash IS NOT OLD.handle_hash
 OR NEW.request_hash IS NOT OLD.request_hash
 OR NEW.profile_id IS NOT OLD.profile_id
 OR NEW.user_id IS NOT OLD.user_id
 OR NEW.client_id IS NOT OLD.client_id
 OR NEW.project_id IS NOT OLD.project_id
 OR NEW.resource IS NOT OLD.resource
 OR NEW.grant_id IS NOT OLD.grant_id
 OR NEW.requested_scopes_json IS NOT OLD.requested_scopes_json
 OR NEW.transaction_started_at IS NOT OLD.transaction_started_at
 OR NEW.transaction_expires_at IS NOT OLD.transaction_expires_at
 OR NEW.trial_started_at IS NOT OLD.trial_started_at
 OR NEW.trial_expires_at IS NOT OLD.trial_expires_at
 OR NEW.source_revision IS NOT OLD.source_revision
 OR NEW.site_id IS NOT OLD.site_id
 OR NEW.website IS NOT OLD.website
 OR NEW.hostname IS NOT OLD.hostname
 OR NEW.canonical_origin IS NOT OLD.canonical_origin
 OR NEW.claim_id IS NOT OLD.claim_id
 OR NEW.claim_verified_at IS NOT OLD.claim_verified_at
 OR NOT ((OLD.state='pending' AND NEW.state='reserved') OR
  (OLD.state='pending' AND NEW.state='cancelled' AND NEW.decision='cancel') OR
  (OLD.state='reserved' AND NEW.state IN ('admitted','cancelled')))
 OR (OLD.state='reserved' AND (NEW.decision IS NOT OLD.decision OR NEW.choice_nonce IS NOT OLD.choice_nonce OR NEW.choice_at IS NOT OLD.choice_at OR NEW.expires_at IS NOT OLD.expires_at OR NEW.grant_created_iso IS NOT OLD.grant_created_iso OR NEW.grant_expires_iso IS NOT OLD.grant_expires_iso))
BEGIN SELECT RAISE(ABORT,'Preparation consent identity/decision is immutable'); END;`},
 {type:"trigger",name:"delegated_preparation_consents_grant",sql:`CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_grant
AFTER UPDATE OF state ON delegated_preparation_consents
WHEN OLD.state='reserved' AND NEW.state='admitted'
BEGIN
 INSERT INTO delegated_access_grants
 (id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at)
 VALUES(NEW.grant_id,NEW.user_id,NEW.client_id,NEW.project_id,NEW.resource,
  CASE NEW.decision WHEN 'read' THEN '["afw:project:read"]' ELSE '["afw:project:read","afw:capsule:prepare"]' END,
  NEW.grant_created_iso,NEW.grant_expires_iso,'','');
END;`},
 {type:"trigger",name:"delegated_preparation_consents_no_delete",sql:`CREATE TRIGGER IF NOT EXISTS delegated_preparation_consents_no_delete
BEFORE DELETE ON delegated_preparation_consents
BEGIN SELECT RAISE(ABORT,'Preparation consent history is retained'); END;`}
].map(Object.freeze));

const schemaCanonical=value=>typeof value==='string'&&value.length<=32768
 ?value.trim().replace(/\r\n/g,'\n').replace(/^CREATE (TABLE|TRIGGER) IF NOT EXISTS /,'CREATE $1 ').replace(/;\s*$/,''):null;
const META_SQL=`SELECT type,substr(name,1,129) AS name,tbl_name,substr(sql,1,32769) AS sql FROM sqlite_master
 WHERE (type='table' AND name='delegated_preparation_consents') OR (type='trigger' AND tbl_name='delegated_preparation_consents')
 ORDER BY type,name LIMIT 5`;
export function delegatedPreparationConsentSchemaSql(){
 return '-- Source candidate only: NOT an installed migration. No remote schema operation authorized.\n'+objects.map(x=>x.sql).join('\n--> statement-breakpoint\n')+'\n';
}
const response=(code,fields={})=>Object.freeze({
 contract:'agentfriendly.preparation-consent-store.v1',code,scopes:Object.freeze([]),grantRef:null,expiresAt:null,
 applicationGrantStored:false,freshDecision:false,authorizationCodeIssued:false,tokenIssued:false,
 refreshAllowed:false,executionAllowed:false,chargeAllowed:false,publicationAllowed:false,...fields,
});
const readRef=value=>{
 const r=readRecord(value,REF_KEYS);
 return r&&digest(r.handleHash)&&digest(r.requestHash)&&identity(r.subject)?r:null;
};
function profileOf(value){
 const p=readRecord(value,PROFILE_KEYS);
 if(!p||p.profileId!==PROFILE||!identity(p.projectId)||!oauthClientRef(p.clientId)
  ||!validWall(p.trialStartedAt)||!validWall(p.trialExpiresAt)||p.trialExpiresAt<=p.trialStartedAt||p.trialExpiresAt-p.trialStartedAt>600000)return null;
 try{const u=new URL(p.resource);if(p.resource.length>512||u.protocol!=='https:'||u.href!==p.resource||u.username||u.password||u.search||u.hash)return null;}
 catch{return null;}
 return p;
}
function domainReady(row,now){
 const at=instant(row.verified_at);
 try{return identity(row.site_id)&&identity(row.claim_id)&&row.verification_status==='verified'&&row.claim_status==='verified'
  &&at!==null&&at<=now&&now<at+90*86400000&&text(row.website,2048)&&text(row.canonical_origin,512)&&text(row.hostname,253)
  &&new URL(row.website).origin===row.canonical_origin&&new URL(row.canonical_origin).hostname===row.hostname;}
 catch{return false;}
}
function currentCode(row,now){
 if(row.current_owner!==row.user_id||row.current_role!=='owner'||row.current_site_owner!==row.user_id||row.current_claim_owner!==row.user_id)
  return 'delegated_access_denied';
 const same=row.current_revision===row.source_revision&&row.current_website===row.website
  &&row.current_site_id===row.site_id&&row.current_site_project===row.project_id&&row.current_hostname===row.hostname&&row.current_origin===row.canonical_origin
  &&row.current_claim_id===row.claim_id&&row.current_claim_project===row.project_id&&row.current_claim_site===row.site_id
  &&row.current_verified===row.claim_verified_at;
 const at=instant(row.current_verified);
 return same&&row.current_site_status==='verified'&&row.current_claim_status==='verified'&&at!==null&&at<=now&&now<at+90*86400000?null:'context_changed';
}
function policy(row){
 let scopes;try{scopes=scopesOf(JSON.parse(row.requested_scopes_json));}catch{return null;}
 if(!scopes||JSON.stringify(scopes)!==row.requested_scopes_json)return null;
 return {enabled:true,requestedScopes:scopes,transactionStartedAt:row.transaction_started_at,transactionExpiresAt:row.transaction_expires_at,
  trialStartedAt:row.trial_started_at,trialExpiresAt:row.trial_expires_at};
}
function receipt(row,now,{fresh=false,decision,duplicate=false}={}){
 if(!row)return response('delegated_access_denied');
 if(!identity(row.grant_id))return response('unavailable');
 const denied=currentCode(row,now);if(denied)return response(denied);
 if(row.state==='cancelled')return response('cancelled');
 const original=policy(row);
 if(!original)return response('unavailable');
 const valid=evaluatePreparationConsentChoice({decision:'read'},original,{now});
 if(valid.code!=='choice_valid')return response(valid.code==='expired'?'expired':'unavailable');
 const transaction=Object.freeze({...original,requestedScopes:Object.freeze([...original.requestedScopes])});
 if(row.state==='pending')return response('consent_pending',{transaction});
 if(row.state==='reserved')return response('decision_pending',{transaction});
 if(row.state!=='admitted'||!['read','drafts'].includes(row.decision))return response('unavailable');
 const chosen=selected(row.decision),scopeJson=JSON.stringify(chosen);
 if(row.actual_grant!==row.grant_id||row.grant_owner!==row.user_id||row.grant_client!==row.client_id||row.grant_project!==row.project_id
  ||row.grant_resource!==row.resource||row.grant_scopes!==scopeJson||row.grant_created!==row.grant_created_iso||row.grant_expires!==row.grant_expires_iso
  ||instant(row.grant_created_iso)!==row.choice_at||instant(row.grant_expires_iso)!==row.expires_at)return response('unavailable');
 if(row.grant_revoked!=='')return response('revoked',{applicationGrantStored:true});
 if(now>=row.expires_at)return response('expired',{applicationGrantStored:true});
 if(decision&&decision!==row.decision)return response('decision_conflict');
 return response(duplicate?'already_decided':'decision_saved',{transaction,decision:row.decision,scopes:Object.freeze(chosen),grantRef:row.grant_id,
  expiresAt:row.expires_at,applicationGrantStored:true,freshDecision:fresh});
}

/**
 * Detached storage primitive, not an identity/SDK/CSRF verifier or token issuer.
 * options/profile/session/clock/original lease and handle/request hashes MUST
 * originate in a future trusted host, never a browser or MCP argument.
 * Every fresh successful receipt is still conditional on that host's own SDK
 * validation/completion. Non-fresh/unknown receipts MUST NOT replay completion.
 */
export function createDelegatedPreparationConsentStore(options){
 const cfg=readRecord(options,OPTIONS);
 if(!cfg||cfg.enabled!==true)return null;
 const p=profileOf(cfg.profile),control=readCapsulePreparationRequestLease(cfg.requestLease);
 if(!p||!control||typeof cfg.createPrimarySession!=='function'||typeof cfg.now!=='function')return null;
 let invalidated=false,lastWall;
 function check(){
  if(invalidated)throw Error('Consent storage unavailable');
  try{
   const current=readRecord(options,OPTIONS),live=profileOf(current?.profile);
   if(!current||current.enabled!==true||current.profile!==cfg.profile||current.createPrimarySession!==cfg.createPrimarySession
    ||current.now!==cfg.now||current.requestLease!==cfg.requestLease||!live||!PROFILE_KEYS.every(k=>live[k]===p[k]))throw Error();
   const lifetime=control.check(),wall=cfg.now();
   if(!isoAt(wall)||wall<lifetime.started||wall>=lifetime.notAfter||wall<p.trialStartedAt||wall>=p.trialExpiresAt
    ||(lastWall!==undefined&&wall<lastWall))throw Error();
   lastWall=wall;return {wall,notAfter:Math.min(lifetime.notAfter,p.trialExpiresAt)};
  }catch{invalidated=true;throw Error('Consent storage unavailable');}
 }
 try{check();}catch{return null;}
 function primary(){check();const db=cfg.createPrimarySession();if(typeof db?.prepare!=='function')throw Error('Primary unavailable');return db;}
 async function query(sql,args=[],method='first'){
  return control.wait(async()=>{check();const r=await primary().prepare(sql).bind(...args)[method]();check();return r;});
 }
 async function ownSchema(){
  const meta=await query(META_SQL,[],'all');
  if(meta?.success===false||!Array.isArray(meta?.results)||meta.results.length!==objects.length)return false;
  const seen=new Set();
  for(const row of meta.results){
   const wanted=objects.find(x=>x.name===row.name);
   if(!wanted||seen.has(row.name)||row.type!==wanted.type||row.tbl_name!=='delegated_preparation_consents'||schemaCanonical(row.sql)!==schemaCanonical(wanted.sql))return false;
   seen.add(row.name);
  }
  const compiled=await query('SELECT * FROM ('+LOOKUP.replaceAll('?', "''")+') LIMIT 0',[],'all');
  return compiled?.success!==false&&Array.isArray(compiled?.results)&&compiled.results.length===0;
 }
 async function preparationSchema(){
  const result=await control.wait(()=>checkAgentCapsulePreparationSchema({createPrimarySession:primary,assertCurrent:check}));
  check();return result.ready===true;
 }
 const args=r=>[r.handleHash,r.requestHash,r.subject,p.profileId,p.projectId,p.clientId,p.resource,p.trialStartedAt,p.trialExpiresAt];
 const load=r=>query(LOOKUP,args(r));
 const matchBegin=(row,r,scopes)=>row.requested_scopes_json===JSON.stringify(scopes)&&row.transaction_started_at===r.transactionStartedAt
  &&row.transaction_expires_at===r.transactionExpiresAt&&row.source_revision===r.expectedRevision;
 async function run(method,value){
  let wrote=false;
  try{
   check();
   const allowed=method==='begin'?BEGIN_KEYS:method==='decide'?[...REF_KEYS,'decision']:REF_KEYS;
   const r=readRecord(value,allowed),key=r?readRef(Object.fromEntries(REF_KEYS.map(k=>[k,r[k]]))):null;
   if(!r||!key)return response('invalid_request');
   let originalScopes;
   if(method==='begin'){
    originalScopes=scopesOf(r.requestedScopes);
    const choice=evaluatePreparationConsentChoice({decision:'read'},{enabled:true,requestedScopes:originalScopes,
     transactionStartedAt:r.transactionStartedAt,transactionExpiresAt:r.transactionExpiresAt,trialStartedAt:p.trialStartedAt,trialExpiresAt:p.trialExpiresAt},{now:check().wall});
    if(!originalScopes||!Number.isSafeInteger(r.expectedRevision)||r.expectedRevision<1||choice.code!=='choice_valid')return response('invalid_request');
   }else if(method==='decide'&&!['read','drafts','cancel'].includes(r.decision))return response('invalid_request');
   if(!await ownSchema())return response('unavailable');
   let row=await load(key);check();
   if(method==='begin'){
    if(row){
     if(!matchBegin(row,r,originalScopes))return response('consent_conflict');
     return receipt(row,check().wall);
    }
    if(!await preparationSchema())return response('unavailable');
    const source=await query(SOURCE_SQL,[p.projectId,key.subject]);const time=check();
    if(!source)return response('delegated_access_denied');
    if(source.revision!==r.expectedRevision)return response('context_changed');
    if(!domainReady(source,time.wall))return response('context_changed');
    const grantId=randomUUID();
    const values=[key.handleHash,key.requestHash,p.profileId,key.subject,p.clientId,p.projectId,p.resource,grantId,JSON.stringify(originalScopes),
     r.transactionStartedAt,r.transactionExpiresAt,p.trialStartedAt,p.trialExpiresAt,r.expectedRevision,source.site_id,source.website,source.hostname,
     source.canonical_origin,source.claim_id,source.verified_at];
    const columns=['handle_hash','request_hash','profile_id','user_id','client_id','project_id','resource','grant_id','requested_scopes_json',
     'transaction_started_at','transaction_expires_at','trial_started_at','trial_expires_at','source_revision','site_id','website','hostname','canonical_origin','claim_id','claim_verified_at'];
    const sql='INSERT INTO delegated_preparation_consents ('+columns.join(',')+') SELECT '+values.map(()=>'?').join(',')+
     ' FROM ('+SOURCE_SQL+') a WHERE '+SOURCE_KEYS.map(k=>'a.'+k+' IS ?').join(' AND ')+
     " AND a.verification_status='verified' AND a.claim_status='verified' AND julianday(a.verified_at)<=julianday('now') AND julianday(a.verified_at)+90>julianday('now')"+
     ' AND '+SQL_NOW+'>=? AND '+SQL_NOW+'<? AND '+SQL_NOW+'<? AND NOT EXISTS(SELECT 1 FROM delegated_access_grants WHERE id=?) ON CONFLICT DO NOTHING';
    wrote=true;
    const saved=await query(sql,[...values,p.projectId,key.subject,...SOURCE_KEYS.map(k=>source[k]),r.transactionStartedAt,
     Math.min(r.transactionExpiresAt,p.trialExpiresAt),time.notAfter,grantId],'run');
    if(saved?.success!==true)return response('unknown_ack');
    row=await load(key);check();
    if(!row)return response('unknown_ack');
    if(!matchBegin(row,r,originalScopes))return response('consent_conflict');
    return receipt(row,check().wall);
   }
   if(!row)return response('delegated_access_denied');
   // Cancellation only reduces authority and retains the original choice;
   // source/domain changes never prohibit abandoning this subject's attempt.
   if(method==='decide'&&r.decision==='cancel'){
    if(row.state==='cancelled')return response('cancelled');
    if(row.state==='admitted')return receipt(row,check().wall,{duplicate:true,decision:'cancel'});
    const time=check(),nonce=randomUUID();
    const set=row.state==='pending'?"decision='cancel',choice_nonce=?,choice_at=?,state='cancelled'":"state='cancelled'";
    const bind=row.state==='pending'?[nonce,time.wall]:[];
    wrote=true;
    const saved=await query('UPDATE delegated_preparation_consents AS d SET '+set+
     " WHERE d.handle_hash=? AND d.request_hash=? AND d.user_id=? AND d.profile_id=? AND d.project_id=? AND d.client_id=? AND d.resource=?"+
     " AND d.trial_started_at=? AND d.trial_expires_at=? AND d.state IN ('pending','reserved')"+
     ' AND NOT EXISTS(SELECT 1 FROM delegated_access_grants WHERE id=d.grant_id) AND '+SQL_NOW+'<?',[...bind,...args(key),time.notAfter],'run');
    if(saved?.success!==true)return response('unknown_ack');
    row=await load(key);check();return row?.state==='cancelled'?response('cancelled'):response('unknown_ack');
   }
   const context=currentCode(row,check().wall);
   if(context)return response(context);
   const existing=receipt(row,check().wall,{decision:method==='decide'?r.decision:undefined,duplicate:method==='decide'});
   if(method==='inspect'||row.state!=='pending'||existing.code!=='consent_pending')return existing;
   const choice=evaluatePreparationConsentChoice({decision:r.decision},policy(row),{now:check().wall});
   if(choice.code!=='choice_valid')return response(choice.code==='expired'?'expired':'invalid_request');
   if(!await preparationSchema())return response('unavailable');
   const nonce=randomUUID(),time=check(),createdIso=isoAt(time.wall),expiresIso=isoAt(choice.expiresAt);
   if(!createdIso||!expiresIso)return response('unavailable');
   wrote=true;
   const reserved=await query("UPDATE delegated_preparation_consents AS d SET state='reserved',decision=?,choice_nonce=?,choice_at=?,expires_at=?,grant_created_iso=?,grant_expires_iso=?"+
    " WHERE d.handle_hash=? AND d.request_hash=? AND d.user_id=? AND d.profile_id=? AND d.project_id=? AND d.client_id=? AND d.resource=?"+
    " AND d.trial_started_at=? AND d.trial_expires_at=? AND d.state='pending' AND "+CURRENT_FENCE+' AND '+SQL_NOW+'<?',
    [r.decision,nonce,time.wall,choice.expiresAt,createdIso,expiresIso,...args(key),time.notAfter],'run');
   if(reserved?.success!==true)return response('unknown_ack');
   row=await load(key);check();
   if(!row)return response('unknown_ack');
   if(row.state!=='reserved'||row.choice_nonce!==nonce)return receipt(row,check().wall,{decision:r.decision,duplicate:true});
   if(currentCode(row,check().wall))return response('context_changed');
   const end=check().notAfter;
   const saved=await query("UPDATE delegated_preparation_consents AS d SET state='admitted'"+
    " WHERE d.handle_hash=? AND d.request_hash=? AND d.user_id=? AND d.profile_id=? AND d.project_id=? AND d.client_id=? AND d.resource=?"+
    " AND d.trial_started_at=? AND d.trial_expires_at=? AND d.state='reserved' AND d.choice_nonce=? AND "+CURRENT_FENCE+' AND '+SQL_NOW+'<?',
    [...args(key),nonce,end],'run');
   if(saved?.success!==true)return response('unknown_ack');
   row=await load(key);check();
   if(row?.state==='cancelled')return response('cancelled');
   if(row?.state!=='admitted'||row.choice_nonce!==nonce)return response('unknown_ack');
   return receipt(row,check().wall,{fresh:true,decision:r.decision});
  }catch{return response(wrote?'unknown_ack':'unavailable');}
 }
 return Object.freeze({begin:value=>run('begin',value),inspect:value=>run('inspect',value),decide:value=>run('decide',value)});
}
