import {createHash} from 'node:crypto';
import {hashFiniteMonitorGrantEvidence,finiteNoticeRequestId} from './mcp-finite-monitor-grant-evidence.mjs';
import {finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite withdrawal primary consent unavailable');};
const stamp=s=>{const at=Date.parse(s);if(typeof s!=='string'||!time(at)||new Date(at).toISOString()!==s)fail();return at;};
const digest=s=>createHash('sha256').update(s).digest('hex');
const purpose='afw.dossier-monitoring.v1';
const query=`SELECT g.created_at,g.expires_at AS grant_expiry,g.revoked_at,g.scopes_json,
 c.request_id,c.issued_at,c.expires_at,c.revision,c.sequence,
 l.sequence AS latest_sequence,l.action AS latest_action,l.revision AS latest_revision,
 l.request_id AS latest_request,l.issued_at AS latest_issued,l.expires_at AS latest_expiry,
 CAST(unixepoch('subsec')*1000 AS INTEGER) AS db_now
 FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
 JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id AND c.project_id=g.project_id AND c.user_id=g.user_id
  AND c.client_id=g.client_id AND c.resource=g.resource AND c.action='grant' AND c.purpose='afw.dossier-monitoring.v1'
 JOIN dossier_monitoring_consent_events l ON l.grant_id=g.id AND l.project_id=g.project_id AND l.user_id=g.user_id
  AND l.client_id=g.client_id AND l.resource=g.resource AND l.purpose='afw.dossier-monitoring.v1'
  AND l.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
 WHERE g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND c.sequence=?
  AND NOT EXISTS (SELECT 1 FROM dossier_monitoring_consent_events r WHERE r.grant_id=g.id AND r.sequence>c.sequence AND r.action='grant')`;

/** Re-read the original row and latest decision on the real first primary.
 * The pre-trial consent and the trial's event window are separate clocks. */
export function createFiniteOwnWithdrawalEvidence({db,policy,plan}){
 const withSession=db?.withSession,consent=policy.originalConsent;
 const {grantId,subject,projectId,clientId,resource,expectedProjectRevision}=plan.selectors;
 if(typeof withSession!=='function'||consent.revision!==expectedProjectRevision||consent.issuedAt>plan.T0||
    consent.expiresAt<=plan.R1+30000||digest(grantId)!==plan.grantHash)fail();
 return async check=>{
  check();
  const primary=Reflect.apply(withSession,db,['first-primary']),prepare=primary?.prepare;
  if(db.withSession!==withSession||typeof prepare!=='function')fail();
  const row=await Reflect.apply(prepare,primary,[query]).bind(grantId,subject,projectId,clientId,resource,consent.sequence).first();
  const now=check();if(db.withSession!==withSession||primary.prepare!==prepare||!row||!time(row.db_now)||
    row.db_now<policy.startAt||row.db_now>=policy.expiresAt)fail();
  if(typeof row.scopes_json!=='string'||row.scopes_json.length>1024)fail();
  const scopes=JSON.parse(row.scopes_json),created=stamp(row.created_at),expiry=stamp(row.grant_expiry);
  if(!Array.isArray(scopes)||!scopes.includes('afw:project:read')||scopes.length>2||new Set(scopes).size!==scopes.length||
     scopes.some(s=>s!=='afw:project:read'&&s!=='afw:evidence:read')||created>consent.issuedAt||
     created>=expiry||Math.min(expiry,consent.expiresAt)<=plan.R1+30000||
     row.revision!==consent.revision||row.sequence!==consent.sequence||
     row.issued_at!==consent.issuedAt||row.expires_at!==consent.expiresAt||
     row.request_id===policy.requestId)fail();
  const originalHash=hashFiniteMonitorGrantEvidence({grantId,projectId,subject,clientId,resource,
   revision:row.revision,action:'grant',purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at});
  if(originalHash!==plan.monitorHash)fail();
  if(row.revoked_at!==''){const revoked=stamp(row.revoked_at);if(revoked<consent.issuedAt||revoked>now)fail();}
  if(row.latest_action==='grant'){
   if(row.latest_sequence!==consent.sequence||row.latest_request!==row.request_id||row.latest_revision!==consent.revision||
      row.latest_issued!==consent.issuedAt||row.latest_expiry!==consent.expiresAt)fail();
  }else if(row.latest_action!=='revoke'||!Number.isSafeInteger(row.latest_sequence)||row.latest_sequence<=consent.sequence||
    !finiteNoticeRequestId(row.latest_request)||row.latest_request===row.request_id||row.latest_revision<consent.revision||
    !time(row.latest_issued)||row.latest_issued<consent.issuedAt||row.latest_issued>now||row.latest_expiry!==row.latest_issued)fail();
  return row.request_id;
 };
}
