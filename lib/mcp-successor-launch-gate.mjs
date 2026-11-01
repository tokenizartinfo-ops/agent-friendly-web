import {createHash} from 'node:crypto';
import {requireFiniteAdmissionGate,retainFiniteWriterDeadline} from './mcp-own-finite-admission-gate.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
const fail=()=>{throw Error('Successor launch unavailable');};
const sha=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return out;};
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
/** Private launcher decorator. Host retains lifecycle deadline, observation and cleanup.
 * Deployment/retirement readers are trusted server adapters, never client evidence. */
export function createSuccessorLaunchGate({db,plan,context,projectId,projectionSecret,readRetirement,readDeployment,launch,now=Date.now,timeoutMs=5000,finiteGate}={}){
 const finite=finiteGate===undefined?null:requireFiniteAdmissionGate(finiteGate,{},'launch');
 const p=resolveSuccessorPreparation(plan),c=p.candidate,o=p.original,scope=p.manifest.scope,namespace=plan.namespace,idFromName=namespace.idFromName,idFromString=namespace.idFromString;
 const ctx=exact(context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(ctx.scopes))fail();ctx.scopes=Object.freeze([...ctx.scopes]);Object.freeze(ctx);
 if(ctx.resource!==scope.resource||typeof readRetirement!=='function'||typeof readDeployment!=='function'||typeof launch!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const authorization=createDossierMonitoringAuthorization({db,context:ctx,projectId,projectionSecret,now});
 return async(boot,signal)=>{
  let key,timer,rejectCancel;const abort=new AbortController(),end=performance.now()+timeoutMs;let last=-1,finiteLease;
  const cancel=()=>{abort.abort();rejectCancel?.(Error('Successor launch unavailable'));};
  try{
   if(!(signal instanceof AbortSignal)||signal.aborted)fail();
   const m=exact(boot,['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','key']);
   if(m.containerId!==c.containerId||m.programHash!==c.programHash||m.sourceRevision!==c.sourceRevision||m.image!=='cloudflare/debian-trixie'||!sha(m.processGeneration)||!time(m.createdAt)||!time(m.expiresAt)||m.createdAt<c.startAt||m.expiresAt>c.expiresAt||m.expiresAt<=m.createdAt||!Buffer.isBuffer(m.key)||m.key.length!==32)fail();key=Buffer.from(m.key);m.key=key;Object.freeze(m);
   const clock=()=>{finiteLease?.assertCurrent();const n=now();if(signal.aborted||abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n<m.createdAt||n>=m.expiresAt||namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||idFromName.call(namespace,p.manifest.actorName).toString()!==c.containerId||idFromString.call(namespace,c.containerId).toString()!==c.containerId)fail();last=n;return n;};
   const auth=async()=>{clock();const a=await authorization();clock();if(!a.enabled||a.principalRef!==scope.ownerRef||a.projectRef!==scope.projectRef||a.expiresAt<m.expiresAt)fail();return a;};
   const deployed=async()=>{clock();const d=exact(await readDeployment({signal:abort.signal}),['scopeHash','sourceRevision','programHash','observedAt']),n=clock();if(d.scopeHash!==c.scopeHash||d.sourceRevision!==c.sourceRevision||d.programHash!==c.programHash||!time(d.observedAt)||d.observedAt>n||n-d.observedAt>30000)fail();return d;};
   const work=async()=>{
    if(finite){requireFiniteAdmissionGate(finite,{containerId:c.containerId,trialId:c.trialId,grantHash:createHash('sha256').update(ctx.grantId).digest('hex')},'launch');const begun=await finite.beginLaunch();if(begun.status!=='issued')fail();finiteLease=retainFiniteWriterDeadline(finite,begun.claim,'launch',now,m.expiresAt);}clock();
    const before=await auth();await deployed();
    const e=exact(await readRetirement({signal:abort.signal},clock),['purpose','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor']),n=clock();
    if(e.purpose!=='afw.retirement-evidence.v1'||Object.keys(o).some(k=>o[k]!==e[k])||!sha(e.processGeneration)||!['closedAt','stoppedAt','observedAt'].every(k=>time(e[k]))||e.closedAt>e.observedAt||e.stoppedAt>e.observedAt||e.observedAt>n||n-e.observedAt>30000||e.physicalStopVerified!==true||e.mayStartSuccessor!==false)fail();
    const primary=db.withSession?db.withSession('first-primary'):db;
    const sql=`INSERT INTO dossier_successor_launch_claims(trial_id,scope_hash,container_id,process_generation,grant_id,claimed_at) SELECT r.trial_id,r.scope_hash,a.container_id,a.process_generation,g.id,${sqlNow} FROM dossier_successor_reservations r JOIN dossier_node_process_admissions a ON a.container_id=r.container_id AND a.program_hash=r.program_hash AND a.source_revision=r.source_revision JOIN delegated_access_grants g ON g.id=a.grant_id AND g.user_id=a.user_id AND g.project_id=a.project_id AND g.client_id=a.client_id AND g.resource=a.resource JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_monitoring_consent_events q ON q.grant_id=g.id AND q.project_id=g.project_id AND q.user_id=g.user_id AND q.client_id=g.client_id AND q.resource=g.resource AND q.sequence=a.consent_sequence AND q.issued_at=a.consent_issued_at AND q.expires_at=a.consent_expires_at WHERE r.trial_id=? AND r.scope_hash=? AND r.application_id=? AND r.predecessor_container_id=? AND r.predecessor_generation=? AND r.predecessor_program_hash=? AND r.predecessor_source_revision=? AND r.closed_at=? AND r.stopped_at=? AND r.state='prepared' AND r.budget=1 AND r.start_at=? AND r.expires_at=? AND a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image=? AND a.created_at=? AND a.expires_at=? AND g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND g.revoked_at='' AND q.action='grant' AND q.purpose='afw.dossier-monitoring.v1' AND q.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id) AND ${sqlNow}>=r.start_at AND ${sqlNow}<a.expires_at AND ${sqlNow}<? AND q.issued_at<=${sqlNow} AND q.expires_at>=a.expires_at AND CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)>=a.expires_at AND ?<=${sqlNow} AND ${sqlNow}-?<=30000`;
    const result=await primary.prepare(sql).bind(c.trialId,c.scopeHash,o.applicationId,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,e.stoppedAt,c.startAt,c.expiresAt,m.containerId,m.processGeneration,m.programHash,m.sourceRevision,m.image,m.createdAt,m.expiresAt,ctx.grantId,ctx.subject,projectId,ctx.clientId,ctx.resource,finiteLease?.deadline??m.expiresAt,e.observedAt,e.observedAt).run();clock();if(result?.success!==true||result.meta?.changes!==1)fail();
    const deployment=await deployed();const after=await auth();if(['principalRef','resourceRef','projectRef','permissionRef'].some(k=>before[k]!==after[k]))fail();clock();
    const finalPrimary=db.withSession?db.withSession('first-primary'):db;const closed=await finalPrimary.prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();const finalNow=clock();if(closed||finalNow-e.observedAt>30000||finalNow-deployment.observedAt>30000)fail();
   };
   const cancelled=new Promise((_,reject)=>{rejectCancel=reject;});signal.addEventListener('abort',cancel,{once:true});
   const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Successor launch unavailable'));},timeoutMs);});
   await Promise.race([work(),cancelled,deadline]);clearTimeout(timer);clock();
   await launch(m,signal);finiteLease?.assertCurrent();const finished=now();if(signal.aborted||!time(finished)||finished<last||finished>=m.expiresAt)fail();
   if(finite&&!['settled','reconciled'].includes((await finite.settleLaunch()).status))fail();clock();
  }catch{fail();}finally{clearTimeout(timer);signal?.removeEventListener?.('abort',cancel);abort.abort();if(key)key.fill(0);}
 };
}
