import {requireFiniteAdmissionGate} from './mcp-own-finite-admission-gate.mjs';
import {createHash,createHmac,randomBytes,createCipheriv,createDecipheriv,hkdfSync,timingSafeEqual} from 'node:crypto';
import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
import {createPrivateNodeBridge} from './mcp-node-private-bridge.mjs';
import {createNodeReadiness} from './mcp-node-readiness.mjs';
const PREFIX='afw.node-process-custody.v1:',SLOT=PREFIX+'original',SHA=/^[0-9a-f]{64}$/;
const fail=()=>{throw Error('Node process custody unavailable');};
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
const authPins=['principalRef','resourceRef','projectRef','permissionRef'];
const manifestKeys=['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'];
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}
const manifest=r=>Object.freeze(Object.fromEntries(manifestKeys.map(k=>[k,r[k]])));
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const sqlGrantExpiry="CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)";

/** INTERNAL fixed original grant/DO custody. D1 boot budget never recovers an
 * unknown INSERT ACK into permission. No schema setup, Container implementation
 * or real platform identity is implied; runtime dependencies are host-trusted. */
export function createNodeProcessCustody(options){
 const o=exact(options,[...(Object.hasOwn(options??{},'finiteGate')?['finiteGate']:[]),'enabled','db','context','projectId','projectionSecret','storage','custodyKey','containerId','programHash','sourceRevision','image','window','runtime','now']);
 if(o.enabled!==true||!o.db?.prepare||typeof o.storage?.transaction!=='function'||!Buffer.isBuffer(o.custodyKey)||o.custodyKey.length!==32||typeof o.now!=='function'||typeof o.containerId!=='string'||!SHA.test(o.containerId)||typeof o.programHash!=='string'||!SHA.test(o.programHash)||typeof o.sourceRevision!=='string'||!(/^[0-9a-f]{40}$/).test(o.sourceRevision)||o.image!=='cloudflare/debian-trixie')fail();
 const finiteGate=Object.hasOwn(o,'finiteGate')?requireFiniteAdmissionGate(o.finiteGate):null;
 const w=Object.freeze(exact(o.window,['startAt','expiresAt'])),runtime=Object.freeze(exact(o.runtime,['launch','observe','close']));if(!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||Object.values(runtime).some(v=>typeof v!=='function'))fail();
 const ctx=Object.freeze(exact(o.context,['grantId','subject','clientId','resource','scopes']));
 const readAuthorization=createDossierMonitoringAuthorization({db:o.db,context:ctx,projectId:o.projectId,projectionSecret:o.projectionSecret,now:o.now});
 const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;
 const encryption=Buffer.from(hkdfSync('sha256',o.custodyKey,PREFIX,'service-encryption',32)),sealing=Buffer.from(hkdfSync('sha256',o.custodyKey,PREFIX,'record-authentication',32));let last=-1;
 const clock=()=>{const t=o.now();if(!time(t)||t<last)fail();last=t;return t;};
 const current=async original=>{clock();const a=await readAuthorization();const closed=await db().prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();const t=clock();if(closed)fail();if(!a.enabled||t<w.startAt||t>=w.expiresAt||a.expiresAt<=t||original&&(authPins.some(k=>a[k]!==original[k])||original.expiresAt>a.expiresAt||t>=original.expiresAt))fail();return a;};
 const seal=r=>createHmac('sha256',sealing).update(PREFIX+JSON.stringify(r)).digest('hex');
 const save=async(tx,r)=>{const {seal:ignored,...body}=r;void ignored;await tx.put(SLOT,{...body,seal:seal(body)});};
 const read=async tx=>{
  const raw=await tx.get(SLOT);clock();if(raw===undefined)return null;
  const r=exact(raw,['version',...authPins,...manifestKeys,'state','startedAt','readyAt','cipher','seal']),{seal:provided,...body}=r;
  if(typeof provided!=='string'||!SHA.test(provided)||!timingSafeEqual(Buffer.from(provided,'hex'),Buffer.from(seal(body),'hex'))||r.version!==1||authPins.some(k=>typeof r[k]!=='string'||!SHA.test(r[k]))||r.containerId!==o.containerId||r.programHash!==o.programHash||r.sourceRevision!==o.sourceRevision||r.image!==o.image||typeof r.processGeneration!=='string'||!SHA.test(r.processGeneration)||!time(r.createdAt)||r.createdAt>clock()||r.createdAt<w.startAt||!time(r.expiresAt)||r.expiresAt<=r.createdAt||r.expiresAt>w.expiresAt||r.expiresAt-r.createdAt>600000||!['reserved','starting','ready','failed','withdrawn'].includes(r.state)||r.startedAt!==null&&(!time(r.startedAt)||r.startedAt<r.createdAt||r.startedAt>clock())||r.readyAt!==null&&(!time(r.readyAt)||r.startedAt===null||r.readyAt<r.startedAt||r.readyAt>clock())||r.state==='reserved'&&(r.startedAt!==null||r.readyAt!==null)||r.state==='ready'&&(r.startedAt===null||r.readyAt===null))fail();return body;
 };
 const encrypt=(m,key)=>{const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',encryption,iv);c.setAAD(Buffer.from(PREFIX+JSON.stringify(m)));const data=Buffer.concat([c.update(key),c.final()]);return{iv:iv.toString('base64'),tag:c.getAuthTag().toString('base64'),data:data.toString('base64')};};
 const decrypt=r=>{const c=exact(r.cipher,['iv','tag','data']);for(const k of ['iv','tag','data'])if(typeof c[k]!=='string'||Buffer.from(c[k],'base64').toString('base64')!==c[k])fail();const iv=Buffer.from(c.iv,'base64'),tag=Buffer.from(c.tag,'base64'),data=Buffer.from(c.data,'base64');if(iv.length!==12||tag.length!==16||data.length!==32)fail();const d=createDecipheriv('aes-256-gcm',encryption,iv);d.setAAD(Buffer.from(PREFIX+JSON.stringify(manifest(r))));d.setAuthTag(tag);return Buffer.concat([d.update(data),d.final()]);};
 const consent=async a=>{
  const r=await db().prepare('SELECT sequence,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? AND action=? ORDER BY sequence DESC LIMIT 1').bind(ctx.grantId,'grant').first();
  await current(a);if(!r||createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','permission',ctx.grantId,r.sequence,r.issued_at,r.expires_at])).digest('hex')!==a.permissionRef)fail();return r;
 };
 const claim=async(m,a)=>{
  const c=await consent(a);
  const query=`INSERT INTO dossier_node_process_admissions(grant_id,project_id,user_id,client_id,resource,consent_sequence,consent_issued_at,consent_expires_at,container_id,process_generation,program_hash,source_revision,image,created_at,expires_at)
   SELECT g.id,g.project_id,g.user_id,g.client_id,g.resource,c.sequence,c.issued_at,c.expires_at,?,?,?,?,?,?,?
   FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id AND c.project_id=g.project_id AND c.user_id=g.user_id AND c.client_id=g.client_id AND c.resource=g.resource
   WHERE g.id=? AND g.user_id=? AND g.client_id=? AND g.project_id=? AND g.resource=? AND g.revoked_at='' AND c.action='grant' AND c.purpose='afw.dossier-monitoring.v1' AND c.sequence=? AND c.issued_at=? AND c.expires_at=?
   AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id) AND c.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id) AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke')
   AND json_valid(g.scopes_json) AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)='array' AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE value='afw:project:read') AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE type<>'text') AND c.issued_at<=${sqlNow}
   AND ${sqlNow}>=? AND ${sqlNow}<? AND c.expires_at>=? AND ${sqlGrantExpiry}>=?`;
  const result=await db().prepare(query).bind(...manifestKeys.map(k=>m[k]),ctx.grantId,ctx.subject,ctx.clientId,o.projectId,ctx.resource,c.sequence,c.issued_at,c.expires_at,w.startAt,m.expiresAt,m.expiresAt,m.expiresAt).run();
  if(result?.meta?.changes!==1)fail();await current({...a,expiresAt:m.expiresAt});
 };
 const originalAdmission=async r=>{
  // One primary snapshot ties the admission to its original consent. Keep the
  // live authorization/closure checks on both sides; never cache permission.
  await current(r);const v=await db().prepare('SELECT a.*,c.sequence AS live_consent_sequence,c.issued_at AS live_consent_issued_at,c.expires_at AS live_consent_expires_at FROM dossier_node_process_admissions a JOIN dossier_monitoring_consent_events c ON c.grant_id=a.grant_id AND c.action=\'grant\' WHERE a.grant_id=? AND '+sqlNow+'<a.expires_at ORDER BY c.sequence DESC LIMIT 1').bind(ctx.grantId).first();await current(r);
  if(!v||v.project_id!==o.projectId||v.user_id!==ctx.subject||v.client_id!==ctx.clientId||v.resource!==ctx.resource||['containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt'].some((k,i)=>v[['container_id','process_generation','program_hash','source_revision','image','created_at','expires_at'][i]]!==r[k]))fail();
  if(createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','permission',ctx.grantId,v.live_consent_sequence,v.live_consent_issued_at,v.live_consent_expires_at])).digest('hex')!==r.permissionRef||v.consent_sequence!==v.live_consent_sequence||v.consent_issued_at!==v.live_consent_issued_at||v.consent_expires_at!==v.live_consent_expires_at)fail();
 };
  const invokeRuntime=async(fn,value,deadline)=>{
  const remaining=deadline===null?5000:Math.min(60000,deadline-clock());if(remaining<=0)fail();
  const c=new AbortController();let onAbort;const rejected=new Promise((_,reject)=>{onAbort=()=>reject(Error('Node process custody unavailable'));c.signal.addEventListener('abort',onAbort,{once:true});});
  const timer=setTimeout(()=>c.abort(),remaining),operation=Promise.resolve().then(()=>{if(c.signal.aborted)fail();return fn(value,c.signal);});
  try{const result=await Promise.race([operation,rejected]);if(c.signal.aborted||deadline!==null&&clock()>=deadline)fail();return result;}finally{clearTimeout(timer);c.signal.removeEventListener('abort',onAbort);c.abort();}
 };
 const observe=async r=>{await originalAdmission(r);const p=exact(await invokeRuntime((m,signal)=>runtime.observe(m,signal,async()=>{if(signal.aborted)fail();await originalAdmission(r);const key=decrypt(r);let probe;try{probe=createNodeReadiness({key,manifest:m,now:o.now}).probe();}finally{key.fill(0);}if(signal.aborted)fail();return Object.freeze({request:probe.request,accept(packet){if(signal.aborted)fail();return probe.accept(packet);}});}),manifest(r),r.expiresAt),[...manifestKeys,'running']);await originalAdmission(r);if(p.running!==true||manifestKeys.some(k=>p[k]!==r[k]))fail();};
 const readyState=async()=>{
  const r=await o.storage.transaction(read);if(!r||r.state!=='ready')fail();await observe(r);
  const latest=await o.storage.transaction(read);if(!latest||latest.state!=='ready'||JSON.stringify(latest)!==JSON.stringify(r))fail();await originalAdmission(latest);return latest;
 };
 const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
 return Object.freeze({
  start:safe(async()=>{
   // Commit the finite writer marker OUTSIDE custody's async transaction.
   if(finiteGate){requireFiniteAdmissionGate(finiteGate,{containerId:o.containerId,grantHash:createHash('sha256').update(ctx.grantId).digest('hex')},'admission');if((await finiteGate.beginAdmission()).status!=='issued')fail();}
   const a=await current();
   const reserved=await o.storage.transaction(async tx=>{
    const prior=await read(tx);if(prior){if(prior.state!=='ready')fail();await originalAdmission(prior);return{first:false,r:prior};}
    const createdAt=clock(),expiresAt=Math.min(w.expiresAt,a.expiresAt,createdAt+600000),m={containerId:o.containerId,processGeneration:randomBytes(32).toString('hex'),programHash:o.programHash,sourceRevision:o.sourceRevision,image:o.image,createdAt,expiresAt};
    await claim(m,a);const key=randomBytes(32);let cipher;try{cipher=encrypt(m,key);}finally{key.fill(0);}const r={version:1,...Object.fromEntries(authPins.map(k=>[k,a[k]])),...m,state:'reserved',startedAt:null,readyAt:null,cipher};await save(tx,r);await originalAdmission(r);return{first:true,r};
   });
   if(!reserved.first)return thisReady();
   const r=reserved.r;await originalAdmission(r);
   await o.storage.transaction(async tx=>{const s=await read(tx);if(!s||s.state!=='reserved'||s.processGeneration!==r.processGeneration)fail();await originalAdmission(s);await save(tx,{...s,state:'starting',startedAt:clock()});await originalAdmission(s);});
   await originalAdmission(r);const key=decrypt(r);
   try{
    await invokeRuntime(runtime.launch,Object.freeze({...manifest(r),key}),r.expiresAt);await observe(r);
    await o.storage.transaction(async tx=>{const s=await read(tx);if(!s||s.state!=='starting'||s.processGeneration!==r.processGeneration)fail();await originalAdmission(s);await save(tx,{...s,state:'ready',readyAt:clock()});await originalAdmission(s);});
    const ready=await thisReady();
    if(finiteGate&&!['settled','reconciled'].includes((await finiteGate.settleAdmission()).status))fail();
    return ready;
   }catch{try{await invokeRuntime(runtime.close,undefined,null);}catch{}try{await o.storage.transaction(async tx=>{const s=await read(tx);if(s&&s.processGeneration===r.processGeneration&&s.state!=='withdrawn')await save(tx,{...s,state:'failed'});});}catch{}fail();}finally{key.fill(0);}
  }),
  readReadiness:safe(thisReady),
  createBridge:safe(async()=>{const r=await readyState(),key=decrypt(r);try{await originalAdmission(r);return createPrivateNodeBridge({key,containerId:r.containerId,processGeneration:r.processGeneration,expiresAt:r.expiresAt,now:o.now});}finally{key.fill(0);}}),
  // INTERNAL historical observation, never a start permit or physical-stop proof.
  // It uses the ORIGINAL source/window/key and reads no decrypted capability.
  observeRetired:safe(async()=>invokeRuntime(async()=>{
   const r=await o.storage.transaction(read);if(!r||r.state!=='withdrawn')fail();
   const query=()=>db().prepare("SELECT a.*,c.closed_at,g.revoked_at,(SELECT MAX(e.issued_at) FROM dossier_monitoring_consent_events e WHERE e.grant_id=g.id AND e.project_id=g.project_id AND e.user_id=g.user_id AND e.client_id=g.client_id AND e.resource=g.resource AND e.action='revoke' AND e.purpose='afw.dossier-monitoring.v1') AS monitoring_revoked_at FROM dossier_node_process_admissions a JOIN dossier_node_process_closures c ON c.grant_id=a.grant_id AND c.process_generation=a.process_generation AND c.container_id=a.container_id AND c.program_hash=a.program_hash AND c.source_revision=a.source_revision AND c.image=a.image JOIN delegated_access_grants g ON g.id=a.grant_id AND g.project_id=a.project_id AND g.user_id=a.user_id AND g.client_id=a.client_id AND g.resource=a.resource JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id WHERE g.id=? AND g.project_id=? AND g.user_id=? AND g.client_id=? AND g.resource=?").bind(ctx.grantId,o.projectId,ctx.subject,ctx.clientId,ctx.resource).first();
   const row=await query(),observedAt=clock(),columns=['container_id','process_generation','program_hash','source_revision','image','created_at','expires_at'];
   if(!row||manifestKeys.some((k,n)=>row[columns[n]]!==r[k])||!time(row.closed_at)||row.closed_at<r.createdAt||row.closed_at>observedAt||!time(row.monitoring_revoked_at)||row.monitoring_revoked_at<r.createdAt||row.monitoring_revoked_at>observedAt||typeof row.revoked_at!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(row.revoked_at)||!Number.isSafeInteger(Date.parse(row.revoked_at))||new Date(row.revoked_at).toISOString()!==row.revoked_at||Date.parse(row.revoked_at)<r.createdAt||Date.parse(row.revoked_at)>observedAt)fail();
   if(createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','permission',ctx.grantId,row.consent_sequence,row.consent_issued_at,row.consent_expires_at])).digest('hex')!==r.permissionRef)fail();
   const latest=await o.storage.transaction(read);if(JSON.stringify(latest)!==JSON.stringify(r)||JSON.stringify(await query())!==JSON.stringify(row))fail();clock();
   return Object.freeze({purpose:'afw.node-retirement-observation.v1',...manifest(r),closedAt:row.closed_at,observedAt,physicalStopVerified:false,mayStartSuccessor:false});
  },undefined,null)),
  // Administrative reduction propagates its fixed outer stage deadline into
  // every continuation. Legacy no-argument close retains best-effort shutdown.
  close:safe(async(...args)=>{
   if(args.length>1)fail();
   const guard=args.length?Object.freeze(exact(args[0],['signal','assertCurrent','expiresAt'])):null;
   const entry=clock(),mono=performance.now();
   if(guard&&(!(guard.signal instanceof AbortSignal)||typeof guard.assertCurrent!=='function'||
    !time(guard.expiresAt)||guard.expiresAt<=entry||guard.expiresAt-entry>5000))fail();
   let finished=false;
   const current=signal=>{
    if(finished||signal?.aborted)fail();
    if(guard){
     if(guard.signal.aborted||clock()>=guard.expiresAt||performance.now()-mono>=guard.expiresAt-entry)fail();
     guard.assertCurrent();
    }
   };
   const deadline=guard?guard.expiresAt:null;
   try{
    current();let writeFailed=false;
    try{await invokeRuntime(async(_value,signal)=>{
     current(signal);
     const sql="INSERT OR IGNORE INTO dossier_node_process_closures(grant_id,process_generation,container_id,program_hash,source_revision,image,closed_at) SELECT g.id,a.process_generation,?,?,?,?,"+sqlNow+" FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id LEFT JOIN dossier_node_process_admissions a ON a.grant_id=g.id WHERE g.id=? AND g.project_id=? AND g.user_id=? AND g.client_id=? AND g.resource=? AND (a.grant_id IS NULL OR (a.container_id=? AND a.program_hash=? AND a.source_revision=? AND a.image=?))"+(guard?" AND "+sqlNow+"<?":"");
     const parameters=[o.containerId,o.programHash,o.sourceRevision,o.image,ctx.grantId,o.projectId,ctx.subject,ctx.clientId,ctx.resource,o.containerId,o.programHash,o.sourceRevision,o.image];
     if(guard)parameters.push(guard.expiresAt);
     await db().prepare(sql).bind(...parameters).run();current(signal);
     const closed=await db().prepare('SELECT * FROM dossier_node_process_closures WHERE grant_id=?').bind(ctx.grantId).first();current(signal);
     if(!closed||closed.container_id!==o.containerId||closed.program_hash!==o.programHash||closed.source_revision!==o.sourceRevision||closed.image!==o.image)fail();
     await o.storage.transaction(async tx=>{
      current(signal);const r=await read(tx);current(signal);
      if(r&&r.state!=='withdrawn'){await save(tx,{...r,state:'withdrawn'});current(signal);}
     });current(signal);
    },undefined,deadline);}catch{writeFailed=true;}
    finally{
     // A provider request already emitted cannot be cancelled here. Do not
     // initiate destroy after outer authority changes or expires.
     current();
     await invokeRuntime(async(value,signal)=>{current(signal);const result=await runtime.close(value,signal);current(signal);return result;},undefined,deadline);
    }
    current();if(writeFailed)fail();return Object.freeze({closed:true,runtimeStopRequested:true});
   }finally{finished=true;}
  }),
 });
 async function thisReady(){const r=await readyState();return Object.freeze({purpose:'afw.mcp-node-readiness.v1',processGeneration:r.processGeneration,ready:true,expiresAt:r.expiresAt});}
}
