import {createHash} from 'node:crypto';
import {hashFiniteOwnerEvidence as evidence} from './mcp-qa-finite-preparation-records.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';

const fail=()=>{throw Error('Original finite setup permission unavailable');};
const permissionScope='afw:project:read',evidenceScope='afw:evidence:read';
const instant=value=>{
 if(typeof value!=='string')fail();
 const at=Date.parse(value);
 if(!Number.isSafeInteger(at)||at<0||new Date(at).toISOString()!==value)fail();
 return at;
};
const scopes=value=>{
 if(typeof value!=='string'||value.length>1024)fail();
 const parsed=JSON.parse(value);
 if(!Array.isArray(parsed)||!parsed.includes(permissionScope)||parsed.length>2||
    new Set(parsed).size!==parsed.length||parsed.some(x=>x!==permissionScope&&x!==evidenceScope))fail();
 return parsed;
};
const QUERY=`SELECT
 g.created_at AS grant_created, g.expires_at AS grant_expires, g.scopes_json AS grant_scopes,
 a.expires_at AS authorization_expires, a.consumed_at AS authorization_consumed, a.scopes_json AS authorization_scopes,
 n.issued_at AS notice_issued, n.expires_at AS notice_expires, n.request_id AS notice_request
 FROM delegated_access_grants g
 JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
 JOIN delegated_consent_sessions a ON a.user_id=g.user_id AND a.project_id=g.project_id
  AND a.client_id=g.client_id AND a.resource=g.resource AND a.kind='authorize'
 JOIN dossier_monitoring_consent_events n ON n.grant_id=g.id AND n.user_id=g.user_id AND n.project_id=g.project_id
  AND n.client_id=g.client_id AND n.resource=g.resource AND n.action='grant' AND n.purpose='afw.dossier-monitoring.v1'
 WHERE g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND g.revoked_at=''
  AND a.handle_hash=? AND p.revision=? AND n.revision=p.revision AND n.sequence=?
  AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events later WHERE later.grant_id=g.id
    AND (later.action='revoke' OR later.sequence<>n.sequence))`;

/** Replace cached consent by an exact new first-primary read before effects.
 * Private input comes from the original qualified owner preparation. */
export function createPrivateQaFiniteSetupPermission({ctx,env,preparation,notice,authorizationHash}){
 if(evidence('event',notice)!==preparation.connection.noticesHash)fail();
 return createPrivateQaFiniteRetainedPermission({ctx,env,preparation,noticeSequence:notice.sequence,authorizationHash});
}

/** Uses the original, hash-bound notice link stored before policy setup. */
export function createPrivateQaFiniteRetainedPermission({ctx,env,preparation,noticeSequence,authorizationHash}){
 const storage=ctx.storage,db=env.RELEASE_DB,firstPrimary=db?.withSession;
 const {prepId,connection,owner,project,approval}=preparation;
 const {grantId,clientId,resource,grantHash,consentHash,noticesHash,permissionExpiresAt}=connection;
 const {subject}=owner,{projectId,revision}=project;
 const ownerExpiry=Math.min(preparation.expiresAt,owner.accessExpiresAt,approval.expiresAt);
 if(typeof firstPrimary!=='function'||!storage||project.synthetic!==true||!/^([a-f0-9]{64})$/.test(prepId)||
    typeof authorizationHash!=='string'||!/^[a-f0-9]{64}$/.test(authorizationHash)||
    !Number.isSafeInteger(noticeSequence)||noticeSequence<1||
    !Number.isSafeInteger(ownerExpiry)||!Number.isSafeInteger(permissionExpiresAt)||
    createHash('sha256').update(grantId).digest('hex')!==grantHash)fail();

 const selectors=[grantId,subject,projectId,clientId,resource,authorizationHash,revision,noticeSequence];
 return async lease=>{
  const check=()=>{
   lease.assertCurrent();
   if(lease.signal.aborted||ctx.storage!==storage||env.RELEASE_DB!==db||db.withSession!==firstPrimary)fail();
   const now=Date.now();
   if(now>=Math.min(ownerExpiry,permissionExpiresAt))fail();
   return now;
  };
  check();
  const session=Reflect.apply(firstPrimary,db,['first-primary']),prepare=session?.prepare;
  if(typeof prepare!=='function')fail();
  const statement=Reflect.apply(prepare,session,[QUERY]),bound=statement.bind(...selectors);
  check();
  const row=await retain(bound.first()),at=check();
  if(!row||session.prepare!==prepare)fail();
  const authorized=scopes(row.authorization_scopes),granted=scopes(row.grant_scopes);
  const consumed=instant(row.authorization_consumed),consentExpiry=instant(row.authorization_expires);
  const grantCreated=instant(row.grant_created),grantExpiry=instant(row.grant_expires);
  if(evidence('consent',{handle_hash:authorizationHash,user_id:subject,kind:'authorize',project_id:projectId,
     client_id:clientId,resource,scopes:authorized,expires_at:row.authorization_expires,consumed_at:row.authorization_consumed})!==consentHash||
     granted.some(x=>!authorized.includes(x))||grantCreated<consumed||grantCreated>at||grantExpiry>preparation.expiresAt||
     row.notice_issued>at||Math.min(grantExpiry,row.notice_expires)!==permissionExpiresAt||
     evidence('event',{grantId,projectId,subject,clientId,resource,revision,action:'grant',purpose:'afw.dossier-monitoring.v1',
      requestId:row.notice_request,sequence:noticeSequence,issuedAt:row.notice_issued,expiresAt:row.notice_expires})!==noticesHash)fail();
  const deadline=Math.min(ownerExpiry,permissionExpiresAt,consentExpiry);
  if(check()>=deadline)fail();
  return deadline;
 };
}
