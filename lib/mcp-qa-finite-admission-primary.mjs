import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from './mcp-qa-finite-trial-control.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite QA initial admission unavailable');};
const purpose='afw.dossier-monitoring.v1',image='cloudflare/debian-trixie';
const keys=['grantId','projectId','subject','clientId','resource','revokedAt','grantExpiry','scopes','projectBound',
 'monitorAction','monitorPurpose','monitorSequence','monitorIssuedAt','monitorExpiry','monitorProject','monitorSubject',
 'monitorClient','monitorResource','generation','admissionContainer','admissionProgram','admissionSource','admissionImage',
 'closedGeneration','closedContainer','closedProgram','closedSource','closedImage','closedAt'];
const sql=`SELECT g.id AS grantId,g.project_id AS projectId,g.user_id AS subject,g.client_id AS clientId,g.resource AS resource,
 g.revoked_at AS revokedAt,g.expires_at AS grantExpiry,g.scopes_json AS scopes,CASE WHEN p.id IS NULL THEN 0 ELSE 1 END AS projectBound,
 m.action AS monitorAction,m.purpose AS monitorPurpose,m.sequence AS monitorSequence,m.issued_at AS monitorIssuedAt,m.expires_at AS monitorExpiry,
 m.project_id AS monitorProject,m.user_id AS monitorSubject,m.client_id AS monitorClient,m.resource AS monitorResource,
 a.process_generation AS generation,a.container_id AS admissionContainer,a.program_hash AS admissionProgram,a.source_revision AS admissionSource,a.image AS admissionImage,
 z.process_generation AS closedGeneration,z.container_id AS closedContainer,z.program_hash AS closedProgram,z.source_revision AS closedSource,z.image AS closedImage,z.closed_at AS closedAt
 FROM delegated_access_grants g
 LEFT JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
 LEFT JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
 LEFT JOIN dossier_node_process_admissions a ON a.grant_id=g.id
 LEFT JOIN dossier_node_process_closures z ON z.grant_id=g.id
 WHERE g.id=? OR (g.project_id=? AND g.user_id=? AND g.client_id=? AND g.resource=?)
 ORDER BY g.id LIMIT 17`;
const timestamp=value=>{
 if(typeof value!=='string')fail();
 const at=Date.parse(value);if(!time(at)||new Date(at).toISOString()!==value)fail();return at;
};

/** Read the original D1 scope. Verify the current permission independently
 * through the retained owner consent and keep historic exclusions factual. */
export async function readPrivateQaFiniteAdmissionPrimary({ctx,env,control,parent,readPermission,predecessor}={}){
 const c=finiteControlIdentity(control),p=c.plan,s=p.selectors;
 const {check,signal,deadline}=fields(parent,['check','signal','deadline']);
 const storage=ctx.storage,db=env.RELEASE_DB,withSession=db?.withSession;
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision}),raw=JSON.stringify(p);
 if(typeof check!=='function'||!(signal instanceof AbortSignal)||!time(deadline)||
    typeof withSession!=='function'||typeof readPermission!=='function')fail();
 const end=Math.min(deadline,p.launchPolicy.lastCreateAt,s.expiresAt);
 let last=-1;
 const current=()=>{
  const at=check();
  if(signal.aborted||parent.signal!==signal||parent.check!==check||parent.deadline!==deadline||ctx.storage!==storage||
     env.RELEASE_DB!==db||db.withSession!==withSession||!time(at)||at<last||at<p.T0||at>=end||
     readPrivateQaFiniteControlIdentity({nativePin,raw}).controlHash!==c.controlHash)fail();
  last=at;return at;
 };
 const inspect=async()=>{
  current();
  const d=Reflect.apply(withSession,db,['first-primary']);
  const v=await d.prepare(sql).bind(s.grantId,s.projectId,s.subject,s.clientId,s.resource).all();
  const at=current();
  if(v?.success!==true||!Array.isArray(v.results)||v.results.length<1||v.results.length>16)fail();
  const rows=v.results.map(value=>fields(value,keys)),seen=new Set(),previous=[];
  let selected,expiresAt;
  for(const r of rows){
   if(typeof r.grantId!=='string'||!r.grantId||seen.has(r.grantId)||r.projectId!==s.projectId||r.subject!==s.subject||
      r.clientId!==s.clientId||r.resource!==s.resource||r.projectBound!==1||
      !same(JSON.parse(r.scopes),['afw:project:read']))fail();
   seen.add(r.grantId);
   const grantExpiry=timestamp(r.grantExpiry);
   if(r.monitorAction!==null){
    if(r.monitorPurpose!==purpose||!Number.isSafeInteger(r.monitorSequence)||r.monitorSequence<1||
       !time(r.monitorIssuedAt)||r.monitorIssuedAt>at||!time(r.monitorExpiry)||r.monitorProject!==s.projectId||
       r.monitorSubject!==s.subject||r.monitorClient!==s.clientId||r.monitorResource!==s.resource||
       (r.monitorAction==='revoke'?r.monitorExpiry!==r.monitorIssuedAt:
        r.monitorAction!=='grant'||r.monitorExpiry<=r.monitorIssuedAt))fail();
   }
   if(r.grantId===s.grantId){
    if(r.revokedAt!==''||r.monitorAction!=='grant'||r.generation!==null||r.closedAt!==null)fail();
    expiresAt=Math.min(grantExpiry,r.monitorExpiry,s.expiresAt);
    if(at>=expiresAt)fail();
    selected=r;continue;
   }
   if(timestamp(r.revokedAt)>at||r.monitorAction==='grant'&&r.monitorExpiry>at)fail();
   if(r.generation!==null){
    if(!hex(r.generation)||r.closedGeneration!==r.generation||!time(r.closedAt)||r.closedAt>at||
       !hex(r.admissionContainer)||r.closedContainer!==r.admissionContainer||!hex(r.admissionProgram)||
       r.closedProgram!==r.admissionProgram||!hex(r.admissionSource,40)||r.closedSource!==r.admissionSource||
       r.admissionImage!==image||r.closedImage!==image)fail();
   }else if(r.closedGeneration!==null)fail();
   previous.push(r);
  }
  if(!selected||predecessor&&!previous.some(r=>r.admissionContainer===predecessor.containerId&&
   r.admissionProgram===predecessor.programHash&&r.admissionSource===predecessor.sourceRevision&&
   r.closedAt!==null&&r.closedAt<=p.T0&&timestamp(r.revokedAt)<=p.T0&&r.monitorAction==='revoke'&&r.monitorExpiry<=p.T0))fail();
  return {selected,previous,expiresAt};
 };
 const owner=async()=>{
  current();const grant=fields(await readPermission(),['valid','grantHash','monitorHash','expiresAt']);const at=current();
  if(grant.valid!==true||grant.grantHash!==p.grantHash||grant.monitorHash!==p.monitorHash||
     !time(grant.expiresAt)||grant.expiresAt>s.expiresAt||at>=grant.expiresAt)fail();
  return grant;
 };
 const [first,permission]=await Promise.all([inspect(),owner()]);
 const [after,grant]=await Promise.all([inspect(),owner()]);const at=current();
 if(!same(first,after)||!same(permission,grant)||grant.expiresAt>after.expiresAt||at>=grant.expiresAt)fail();
 return Object.freeze({status:'verified',intentId:p.intentId,controlHash:c.controlHash,observedAt:at,
  expiresAt:grant.expiresAt,permission:grant,evidenceHash:hash({rows:after,grant}),
  authorizesEffects:false,operationalReadiness:false});
}
