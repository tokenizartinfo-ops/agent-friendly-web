import {createHash} from 'node:crypto';
import {readOwnSuccessorHost} from './mcp-own-successor-host.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
import {finiteFields as fields,finiteHash as hash,finiteTime as time,finiteControlIdentity} from './mcp-finite-evidence.mjs';
const admissionSources=new WeakMap();
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const fail=()=>{throw Error('Finite first-primary unavailable');};
/** Fixed first-primary D1 readback. No SQL/selector/receipt supplied by RPC.
 * Reservation/admission/launch tables already have immutable unique keys.
 * Existing closure rows (including NULL generation) are merely hashed history. */
export function createFiniteNativePrimaryReader({db,control,now=Date.now,nativeAdmission}={}){
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
 return Object.freeze({read,reservation:settle('reservation'),admission:settle('admission'),launch:settle('launch'),...(nativeAdmission===undefined?{}:{admissionSource:createAdmissionSource({db,control:c,nativeAdmission,clock})})});
}

/** Opaque source token; constructors capture provenance only. Live resolution
 * is deliberately lazy so historical reads, sealing and reductions survive N1. */
function createAdmissionSource({db,control:c,nativeAdmission,clock}){
 const n=fields(nativeAdmission,['ctx','env','program','programSourceRevision']),{ctx,env,program,programSourceRevision}=n,p=c.plan,s=p.selectors,r=p.resources;
 const storage=ctx?.storage,id=ctx?.id,namespace=env?.AFW_DOSSIER_EVENTS_NODE,version=env?.AFW_FINITE_TRIAL_VERSION;
 if(env?.DB!==db||typeof storage?.get!=='function'||typeof storage?.transaction!=='function'||typeof namespace?.idFromName!=='function'||typeof namespace?.idFromString!=='function'||typeof namespace?.get!=='function'||typeof program!=='string'||createHash('sha256').update(program).digest('hex')!==s.programHash||programSourceRevision!==s.sourceRevision||version?.id!==p.canaryContainment.runtimeVersionId)fail();
 const get=storage.get,transaction=storage.transaction,named=namespace.idFromName,from=namespace.idFromString,nsGet=namespace.get,prepare=db.prepare,session=db.withSession;
 const policyNames=['AFW_DOSSIER_SUCCESSOR_POLICY','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_EVENTS_NODE_NAME','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','AFW_DOSSIER_EVENTS_PROJECTION_SECRET'];
 const pins=Object.freeze(Object.fromEntries(policyNames.map(k=>[k,env[k]]))),denials=new WeakSet();
 const provenance=()=>{
  if(ctx.storage!==storage||ctx.id!==id||env.DB!==db||env.AFW_DOSSIER_EVENTS_NODE!==namespace||env.AFW_FINITE_TRIAL_VERSION!==version||version.id!==p.canaryContainment.runtimeVersionId||storage.get!==get||storage.transaction!==transaction||namespace.idFromName!==named||namespace.idFromString!==from||namespace.get!==nsGet||db.prepare!==prepare||db.withSession!==session||id.toString()!==r.containerId||named.call(namespace,'afw-own-event-first-successor-v1').toString()!==r.containerId||from.call(namespace,r.containerId).toString()!==r.containerId)fail();
 };provenance();
 const live=async()=>{
  provenance();clock();if(policyNames.some(k=>env[k]!==pins[k]))fail();
  const native=readDossierEventHostPolicy({enabled:true,env,now:clock}),policy=native.policy;
  if(native.pins.DB!==db||['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>policy[k]!==s[k])||policy.containerId!==r.containerId)fail();
  const host=readOwnSuccessorHost({env,ctx,program,sourceRevision:programSourceRevision,window:{startAt:s.startAt,expiresAt:s.expiresAt},now:clock});
  if(!host)fail();const resolved=resolveSuccessorPreparation(host.successor.plan),candidate=resolved.candidate,scope=resolved.manifest.scope;
  if(candidate.trialId!==p.trialId||candidate.containerId!==r.containerId||candidate.programHash!==s.programHash||candidate.sourceRevision!==s.sourceRevision||candidate.startAt!==s.startAt||candidate.expiresAt!==s.expiresAt||candidate.budget!==1||scope.namespaceId!==r.namespaceId||scope.applicationId!==r.applicationId||scope.resource!==s.resource||resolved.original.applicationId!==r.applicationId)fail();
  const current=()=>{provenance();native.current();host.current();return clock();};
  const context={grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']};
  const auth=await createDossierMonitoringAuthorization({db,context,projectId:s.projectId,projectionSecret:native.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,now:current})();current();
  if(!auth.enabled||auth.principalRef!==scope.ownerRef||auth.projectRef!==scope.projectRef)fail();
  return {resolved,current};
 };
 const predicate=(resolved,manifest,lease)=>{
  const o=resolved.original,q=resolved.candidate;
  // Aliases and parameter order are source-owned; no caller SQL is accepted.
  const clause=`EXISTS(SELECT 1 FROM dossier_successor_reservations r
   JOIN dossier_node_process_admissions a ON a.container_id=r.predecessor_container_id AND a.process_generation=r.predecessor_generation AND a.program_hash=r.predecessor_program_hash AND a.source_revision=r.predecessor_source_revision AND a.image='cloudflare/debian-trixie'
   JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image
   WHERE r.slot='afw.own-successor.v1' AND r.trial_id=? AND r.scope_hash=? AND r.application_id=? AND r.predecessor_container_id=? AND r.predecessor_program_hash=? AND r.predecessor_source_revision=? AND r.container_id=? AND r.program_hash=? AND r.source_revision=? AND r.start_at=? AND r.expires_at=? AND r.closed_at=z.closed_at AND r.state='prepared' AND r.budget=1
   AND r.reserved_at>=? AND r.reserved_at<=${sqlNow} AND r.start_at<=${sqlNow} AND ${sqlNow}<r.expires_at AND ${sqlNow}<?${manifest?' AND ?<=r.expires_at AND '+sqlNow+'<?':''})`;
  const params=[q.trialId,q.scopeHash,o.applicationId,o.containerId,o.programHash,o.sourceRevision,q.containerId,q.programHash,q.sourceRevision,q.startAt,q.expiresAt,p.T0,Math.min(p.N1,q.expiresAt,s.expiresAt),...(manifest?[manifest.expiresAt,Math.min(manifest.expiresAt,lease.deadline)]:[])];
  return Object.freeze({clause,params:Object.freeze(params)});
 };
 const source=Object.freeze({});
 admissionSources.set(source,{identity:finiteAdmissionIdentity(c),db,selectors:s,provenance,denials,
  async assertPrepared(){
   const {resolved,current}=await live(),q=predicate(resolved);current();
   const query=`SELECT /* finite-prepared-admission */ CASE WHEN ${q.clause} THEN 1 ELSE 0 END AS prepared,
    (SELECT COUNT(*) FROM dossier_node_process_admissions WHERE grant_id=? OR container_id=?) AS admissions,
    (SELECT COUNT(*) FROM dossier_successor_launch_claims WHERE trial_id=? OR container_id=?) AS launches,
    (SELECT COUNT(*) FROM dossier_node_process_closures WHERE grant_id=? OR container_id=?) AS closures`;
   const result=await db.withSession('first-primary').prepare(query).bind(...q.params,s.grantId,r.containerId,p.trialId,r.containerId,s.grantId,r.containerId).all();current();
   if(result?.success!==true||!Array.isArray(result.results)||result.results.length!==1)fail();
   const row=fields(result.results[0],['prepared','admissions','launches','closures']);
   if(![0,1].includes(row.prepared)||['admissions','launches','closures'].some(k=>!Number.isSafeInteger(row[k])||row[k]<0))fail();
   if(row.prepared!==1){const error=Error('Finite first-primary unavailable');if(row.admissions===0&&row.launches===0&&row.closures===0)denials.add(error);throw error;}
   if(row.admissions!==0||row.launches!==0||row.closures!==0)fail();
  },
  async insertConstraint(manifest,lease){
   if(!manifest||manifest.containerId!==r.containerId||manifest.programHash!==s.programHash||manifest.sourceRevision!==s.sourceRevision||manifest.image!=='cloudflare/debian-trixie'||!time(manifest.createdAt)||!time(manifest.expiresAt)||manifest.createdAt<s.startAt||manifest.expiresAt>s.expiresAt||manifest.expiresAt<=manifest.createdAt||typeof lease?.assertCurrent!=='function'||!time(lease.deadline))fail();
   lease.assertCurrent();const {resolved,current}=await live();lease.assertCurrent();current();return predicate(resolved,manifest,lease);
  }
 });return source;
}
function sourceRecord(source,identity){const r=admissionSources.get(source);if(!r||JSON.stringify(r.identity)!==JSON.stringify(identity))fail();r.provenance();return r;}
// Internal fixed hooks only. There is no token registration or arbitrary callback.
export function requireFiniteNativeAdmissionSource(source,identity,scope){
 const r=sourceRecord(source,identity);
 if(scope&&(scope.db!==r.db||Object.entries(scope).some(([k,v])=>k!=='db'&&r.selectors[k]!==v)))fail();
}
export const assertNativeFinitePrepared=(source,identity)=>sourceRecord(source,identity).assertPrepared();
export const nativeFiniteInsertConstraint=(source,identity,manifest,lease)=>sourceRecord(source,identity).insertConstraint(manifest,lease);
export function isNativeFinitePreparedDenial(source,identity,error){return sourceRecord(source,identity).denials.has(error);}
