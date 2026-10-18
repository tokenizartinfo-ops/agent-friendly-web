const fail=()=>{throw Error('Activation confirmation unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
/** Private operator observation journal. observe must verify actual bytes,
 * approved configuration and provider deployment; no caller evidence or writes
 * to the provider. Neither this module nor its receipt authorizes execution. */
export function createActivationJournal({db,plan,observe,now=Date.now,timeoutMs=20000}={}){
 const keys=['activationKey','artifactKey','trialId','scopeHash','configurationHash','startAt','expiresAt'];
 if(!plan||Object.getPrototypeOf(plan)!==Object.prototype||Reflect.ownKeys(plan).length!==keys.length)fail();
 const p={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(plan,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();p[k]=d.value;}Object.freeze(p);
 if(keys.slice(0,5).some(k=>!hex(p[k],64))||!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!db?.withSession||typeof observe!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>20000)fail();
 return Object.freeze({async confirm(signal){
  if(!(signal instanceof AbortSignal)||signal.aborted)fail();
  const controller=new AbortController(),end=performance.now()+timeoutMs,clockAt=now();
  if(!Number.isSafeInteger(clockAt)||clockAt<p.startAt||clockAt>=p.expiresAt||performance.now()>=end)fail();
  // Derive the primary-clock fence from the ORIGINAL remaining budget. A
  // delayed first clock read must not extend SQL eligibility beyond that budget.
  const writeDeadline=Math.min(p.expiresAt,clockAt+Math.max(0,Math.floor(end-performance.now())));let timer,rejectCancel,last=clockAt;
  const check=()=>{const t=now();if(signal.aborted||controller.signal.aborted||performance.now()>=end||!Number.isSafeInteger(t)||t<last||t<p.startAt||t>=p.expiresAt)fail();last=t;return t;};
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Activation confirmation unavailable'));};signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{const expire=()=>{const remaining=end-performance.now();if(remaining>0){timer=setTimeout(expire,Math.ceil(remaining));return;}controller.abort();reject(Error('Activation confirmation unavailable'));};timer=setTimeout(expire,Math.max(0,Math.ceil(end-performance.now())));});
  const work=async()=>{
   const startedAt=check(),primary=db.withSession('first-primary');
   const code=await primary.prepare('SELECT a.account_id,a.worker_name,a.source_revision,a.program_hash,a.worker_hash,r.version_id FROM dossier_publication_attempts a JOIN dossier_publication_receipts r ON r.artifact_key=a.artifact_key WHERE a.artifact_key=?').bind(p.artifactKey).first();check();
   if(!code||!hex(code.account_id,32)||code.worker_name!=='agent-friendly-web-delegated-canary'||!hex(code.source_revision,40)||!hex(code.program_hash,64)||!hex(code.worker_hash,64)||!uuid(code.version_id))fail();
   const attempt=await primary.prepare('INSERT INTO dossier_activation_attempts VALUES(?,?,?,?,?,?,?,?)').bind(p.activationKey,p.artifactKey,p.trialId,p.scopeHash,p.configurationHash,p.startAt,p.expiresAt,startedAt).run();check();if(attempt?.success!==true||attempt.meta?.changes!==1)fail();
   const r=await observe(Object.freeze({...p,accountId:code.account_id,workerName:code.worker_name,sourceRevision:code.source_revision,programHash:code.program_hash,workerHash:code.worker_hash,baseVersionId:code.version_id}),controller.signal);check();
   if(!r||!uuid(r.versionId)||r.versionId===code.version_id||!uuid(r.deploymentId)||!hex(r.etag,64)||r.configurationHash!==p.configurationHash)fail();
   const confirmedAt=check(),receipt=await primary.prepare('INSERT INTO dossier_activation_receipts SELECT ?,?,?,?,('+sqlNow+') WHERE ('+sqlNow+')>=? AND ('+sqlNow+')<?').bind(p.activationKey,r.versionId,r.deploymentId,r.etag,p.startAt,writeDeadline).run();check();if(receipt?.success!==true||receipt.meta?.changes!==1)fail();
   // Only an acknowledged receipt can be accepted. A late/lost receipt ACK cannot reach this write.
   const accepted=await primary.prepare('INSERT INTO dossier_activation_acceptances SELECT activation_key,('+sqlNow+') FROM dossier_activation_receipts WHERE activation_key=? AND ('+sqlNow+')>=confirmed_at AND ('+sqlNow+')<?').bind(p.activationKey,writeDeadline).run();check();if(accepted?.success!==true||accepted.meta?.changes!==1)fail();
   return Object.freeze({activationKey:p.activationKey,versionId:r.versionId,deploymentId:r.deploymentId,confirmedAt,mayLaunch:false});
  };
  try{return await Promise.race([work(),cancelled,deadline]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();}
 }});
}
