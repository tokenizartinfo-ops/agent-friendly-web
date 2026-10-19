import {createHash,randomUUID} from 'node:crypto';
import {buildPublicationCapsule} from './publication-capsule.mjs';
import {maintainerApprovalRequired} from './capsule-access.mjs';
import {readRecord} from './agent-consumption-input.mjs';

const CONTRACT='agentfriendly.capsule-prepare.v1';
const GENERATOR='afw.capsule-generator.2026-10-19.v1';
const SCOPE='afw:capsule:prepare'; // Proposed domain prerequisite, NOT registered in OAuth.
const WINDOW_MS=5000;
const CAPSULE_TTL_MS=7*24*60*60*1000;
const SQL_NOW="((julianday('now')-2440587.5)*86400000)";
const SQL_ISO="strftime('%Y-%m-%dT%H:%M:%fZ','now')";
const SNAPSHOT_SQL=`SELECT p.id,p.user_id,p.organization,p.website,p.site_type,p.control,p.audience,
 p.goals_json,p.languages_json,p.authorized_resources_json,p.crawler_search_policy,p.crawler_training_policy,
 p.owner_email,p.maintainer_email,p.revision,s.id AS site_id,s.hostname,s.canonical_origin,s.verification_status,
 c.id AS claim_id,c.status AS claim_status,c.verified_at,g.expires_at AS grant_expires_at,
 (SELECT coalesce(max(version),0) FROM publication_capsules WHERE site_id=s.id) AS max_version
 FROM site_projects p JOIN delegated_access_grants g ON g.project_id=p.id AND g.user_id=p.user_id
 LEFT JOIN registry_sites s ON s.project_id=p.id AND s.user_id=p.user_id
 LEFT JOIN domain_claims c ON c.id=(SELECT id FROM domain_claims
  WHERE site_id=s.id AND project_id=p.id AND user_id=p.user_id AND status='verified'
  ORDER BY verified_at DESC,id DESC LIMIT 1)
 WHERE p.id=? AND p.user_id=? AND g.id=? AND g.client_id=? AND g.resource=?
 AND g.revoked_at='' AND g.exchanged_at<>'' AND julianday(g.expires_at)>julianday('now')
 AND julianday(g.created_at)<=julianday('now')
 AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE 'null' END)='array'
 AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)
  WHERE type='text' AND value='${SCOPE}')
 AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)
  WHERE type<>'text')`;
const FENCES=['revision','organization','website','site_type','control','audience','goals_json','languages_json',
 'authorized_resources_json','crawler_search_policy','crawler_training_policy','owner_email','maintainer_email',
 'site_id','hostname','canonical_origin','verification_status','claim_id','claim_status','verified_at','max_version'];
const SOURCE_FENCE=FENCES.map(key=>`a.${key} IS ?`).join(' AND ');
const DOMAIN_FENCE="a.verification_status='verified' AND a.claim_status='verified' AND julianday(a.verified_at)<=julianday('now') AND julianday(a.verified_at)+90>julianday('now')";
const INTENT_SQL=`SELECT i.*,c.manifest_sha256 AS actual_manifest,c.version AS actual_version,
 c.project_id AS actual_project,c.user_id AS actual_user,c.site_id AS actual_site,
 c.idempotency_key AS actual_key,c.expires_at AS capsule_expires_at,
 EXISTS(SELECT 1 FROM project_events e WHERE e.id=i.event_id AND e.project_id=i.project_id
  AND e.user_id=i.user_id AND e.type='agent_capsule_prepared') AS event_present
 FROM agent_capsule_preparations i LEFT JOIN publication_capsules c ON c.id=i.capsule_id
 WHERE i.request_ref=? AND i.user_id=? AND i.project_id=? AND i.client_id=? AND i.resource=? LIMIT 1`;

const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const result=(code,fields={})=>({contract:CONTRACT,code,...fields,executionAllowed:false,chargeAllowed:false,publicationAllowed:false});
class DeadlineError extends Error {}
function requestInput(value){
 const r=readRecord(value,['contract','expectedRevision','idempotencyKey']);
 return r?.contract===CONTRACT&&Number.isSafeInteger(r.expectedRevision)&&r.expectedRevision>=1
  &&typeof r.idempotencyKey==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/.test(r.idempotencyKey)?r:null;
}
function serverIdentity(value){
 const r=readRecord(value,['subject','projectId','clientId','grantId','resource']);
 if(!r||!['subject','projectId','clientId','grantId'].every(k=>typeof r[k]==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(r[k])))return null;
 try{const u=new URL(r.resource);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||r.resource.length>512)return null;}catch{return null;}
 return r;
}
function domainReady(row,now){
 const verified=Date.parse(row.verified_at);
 try{return row.verification_status==='verified'&&row.claim_status==='verified'&&Number.isFinite(verified)
  &&verified<=now&&now<verified+90*24*60*60*1000
  &&new URL(row.website).origin===row.canonical_origin&&new URL(row.canonical_origin).hostname===row.hostname;}
 catch{return false;}
}
function list(value){
 const a=JSON.parse(value);
 if(!Array.isArray(a)||a.length>20||a.some(x=>typeof x!=='string'||x.length>1000))throw Error('invalid source');
 return a;
}

/** Internal source-only domain service. Resolver/session factory are trusted host dependencies.
 * No transport, OAuth registration, consent UI, migration, publication or payment is mounted.
 */
export function createAgentCapsulePreparation({enabled=false,createPrimarySession,resolveAuthority,
 now=()=>Date.now(),monotonic=()=>performance.now()}={}){
 function primary(){
  const session=createPrimarySession();
  if(typeof session?.prepare!=='function'||typeof session?.batch!=='function')throw Error('primary unavailable');
  return session;
 }
 function budget(){
  const started=now(),mono=monotonic(),end=started+WINDOW_MS;
  if(!Number.isSafeInteger(started)||started<0||!Number.isFinite(mono)||!Number.isSafeInteger(end))throw new DeadlineError();
  function remaining(){
   const wall=now(),tick=monotonic();
   if(!Number.isSafeInteger(wall)||!Number.isFinite(tick)||wall<started||tick<mono)throw new DeadlineError();
   const left=Math.min(end-wall,WINDOW_MS-(tick-mono));
   if(left<=0)throw new DeadlineError();
   return left;
  }
  return {started,end,check:remaining,async wait(promise){
   const left=remaining();let timer;
   try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new DeadlineError()),left);})]);}
   finally{clearTimeout(timer);}
  }};
 }
 const authArgs=a=>[a.projectId,a.subject,a.grantId,a.clientId,a.resource];
 const requestRef=(a,r)=>hash(['capsule-preparation',a.subject,a.projectId,a.clientId,a.resource,r.idempotencyKey]);
 const scopeHash=r=>hash([CONTRACT,r.expectedRevision,GENERATOR]);
 async function snapshot(a,b){
  b.check();const row=await b.wait(primary().prepare(SNAPSHOT_SQL).bind(...authArgs(a)).first());b.check();return row;
 }
 async function intent(a,ref,b){
  b.check();const row=await b.wait(primary().prepare(INTENT_SQL).bind(ref,a.subject,a.projectId,a.clientId,a.resource).first());b.check();return row;
 }
 async function inspect(a,r,ref,b){
  const row=await snapshot(a,b);
  if(!row)return {response:result('delegated_access_denied')};
  if(!domainReady(row,now()))return {response:result('domain_unverified')};
  const old=await intent(a,ref,b);
  if(old&&old.scope_hash!==scopeHash(r))return {response:result('idempotency_conflict')};
  if(row.revision!==r.expectedRevision)return {response:result('revision_conflict')};
  if(old){
   if(old.status!=='prepared')return {response:result('preparation_pending')};
   if(old.source_hash!==hash(FENCES.filter(k=>k!=='max_version').map(k=>row[k])))return {response:result('revision_conflict')};
   if(old.actual_manifest!==old.manifest_sha256||old.actual_version!==old.version
    ||old.actual_project!==a.projectId||old.actual_user!==a.subject||old.actual_site!==old.site_id
    ||old.actual_key!==old.capsule_key||old.event_present!==1)return {response:result('preparation_pending')};
   if(!(now()<Date.parse(old.capsule_expires_at)))return {response:result('capsule_expired')};
   return {response:result('prepared',{replayed:true,preparation:{capsuleRef:old.capsule_id,version:old.version,
    manifestSha256:old.manifest_sha256,sourceRevision:old.source_revision}})};
  }
  return {row};
 }
 async function run(value,reconcile){
  if(enabled!==true)return result('unavailable');
  const r=requestInput(value);if(!r)return result('invalid_request');
  let writeStarted=false;
  try{
   const b=budget();
   if(typeof createPrimarySession!=='function'||typeof resolveAuthority!=='function')return result('unavailable');
   const a=serverIdentity(await b.wait(resolveAuthority()));b.check();
   if(!a)return result('delegated_access_denied');
   const ref=requestRef(a,r),check=await inspect(a,r,ref,b);
   if(check.response)return check.response;
   if(reconcile)return result('preparation_not_found');
   const row=check.row,version=row.max_version+1;
   if(!Number.isSafeInteger(version)||version<1)return result('unavailable');
   const expires=Math.min(b.end,Date.parse(row.grant_expires_at));
   if(!Number.isSafeInteger(expires)||expires<=now())return result('deadline_exceeded');
   const id=randomUUID(),capsuleId=randomUUID(),eventId=randomUUID(),capsuleKey=hash(['agent-capsule',ref]);
   const sourceHash=hash(FENCES.filter(k=>k!=='max_version').map(k=>row[k]));
   const values=[id,ref,a.subject,a.projectId,a.clientId,a.resource,a.grantId,scopeHash(r),sourceHash,
    r.expectedRevision,GENERATOR,row.site_id,version,capsuleId,capsuleKey,eventId,b.started,expires];
   const reserveSql=`INSERT INTO agent_capsule_preparations
    (intent_id,request_ref,user_id,project_id,client_id,resource,grant_id,scope_hash,source_hash,
     source_revision,generator_revision,site_id,version,capsule_id,capsule_key,event_id,reserved_at,expires_at)
    SELECT ${values.map(()=>'?').join(',')} FROM (${SNAPSHOT_SQL}) a
    WHERE ${SOURCE_FENCE} AND ${DOMAIN_FENCE} AND ${SQL_NOW}<?
    ON CONFLICT DO NOTHING`;
   b.check();writeStarted=true;
   const reserved=await b.wait(primary().prepare(reserveSql).bind(...values,...authArgs(a),...FENCES.map(k=>row[k]),expires).run());b.check();
   if(reserved?.success===false)return result('unknown_ack');
   if(reserved?.meta?.changes!==1){
    const current=await inspect(a,r,ref,b);return current.response??result('preparation_conflict');
   }
   // No generation/continuation unless THIS immutable reservation was acknowledged.
   const createdAt=new Date(now()).toISOString(),expiresAt=new Date(Date.parse(createdAt)+CAPSULE_TTL_MS).toISOString();
   let capsule;
   try{
    const required=maintainerApprovalRequired({ownerEmail:row.owner_email,maintainerEmail:row.maintainer_email,control:row.control});
    capsule=buildPublicationCapsule({capsuleId,projectId:a.projectId,siteId:row.site_id,version,
     canonicalOrigin:row.canonical_origin,organization:row.organization,siteType:row.site_type,audience:row.audience,
     goals:list(row.goals_json),languages:list(row.languages_json),selectedResources:list(row.authorized_resources_json),
     crawlerSearchPolicy:row.crawler_search_policy,crawlerTrainingPolicy:row.crawler_training_policy,
     ownerRef:'owner:'+hash(a.subject).slice(0,24),maintainerRequired:required,
     maintainerRef:row.maintainer_email?'maintainer:'+hash(row.maintainer_email.toLowerCase()).slice(0,24):'maintainer:pending-contact',
     createdAt,expiresAt});
   }catch{return result('invalid_source');}
   const serialized=JSON.stringify(capsule);
   if(new TextEncoder().encode(serialized).byteLength>768*1024)return result('invalid_source');
   b.check();
   const insert=`INSERT INTO publication_capsules
    (id,site_id,project_id,user_id,version,contract_version,mode,manifest_sha256,idempotency_key,capsule_json,
     status,owner_approval_status,maintainer_approval_status,expires_at,created_at,updated_at)
    SELECT i.capsule_id,i.site_id,i.project_id,i.user_id,i.version,?,?,?,i.capsule_key,?,
     'owner_approval_pending','pending',?,?,?,?
    FROM (${SNAPSHOT_SQL}) a JOIN agent_capsule_preparations i ON i.intent_id=?
    WHERE i.status='reserved' AND i.request_ref=? AND i.grant_id=? AND i.scope_hash=? AND i.source_hash=?
     AND i.expires_at>${SQL_NOW} AND ${SOURCE_FENCE} AND ${DOMAIN_FENCE}`;
   const session=primary();
   const manifest=capsule.integrity.manifestSha256;
   const statements=[
    session.prepare(insert).bind(capsule.contract,capsule.mode,manifest,serialized,
     capsule.approvals.maintainer,expiresAt,createdAt,createdAt,...authArgs(a),id,ref,a.grantId,scopeHash(r),sourceHash,...FENCES.map(k=>row[k])),
    session.prepare(`UPDATE agent_capsule_preparations SET status='prepared',manifest_sha256=?,persisted_at=${SQL_ISO}
     WHERE intent_id=? AND status='reserved' AND EXISTS(SELECT 1 FROM publication_capsules c
      WHERE c.id=agent_capsule_preparations.capsule_id AND c.manifest_sha256=?)`).bind(manifest,id,manifest),
    session.prepare(`INSERT INTO project_events(id,project_id,user_id,type,payload_json,created_at)
     SELECT event_id,project_id,user_id,'agent_capsule_prepared',?,${SQL_ISO}
     FROM agent_capsule_preparations WHERE intent_id=? AND status='prepared'`)
     .bind(JSON.stringify({capsuleId,version,manifestSha256:manifest,sourceRevision:r.expectedRevision}),id)
   ];
   const committed=await b.wait(session.batch(statements));b.check();
   if(!Array.isArray(committed)||committed.length!==3||committed.some(x=>x?.success===false))return result('unknown_ack');
   const confirmed=await inspect(a,r,ref,b);
   if(confirmed.response?.code==='prepared')return {...confirmed.response,replayed:false};
   return confirmed.response??result('preparation_pending');
  }catch(error){
   if(writeStarted)return result('unknown_ack');
   return result(error instanceof DeadlineError?'deadline_exceeded':'unavailable');
  }
 }
 return {prepare:value=>run(value,false),reconcile:value=>run(value,true)};
}
