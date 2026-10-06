const HASH=/^[0-9a-f]{64}$/;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const fields=['version','eventId','projectRef','revision','kind','observedAt'];
const kinds=new Set(['project_created','project_updated']);
const canonicalDate=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString()===x;
const time=x=>Number.isSafeInteger(x)&&x>=0;
const fail=()=>{throw new Error('Invalid dossier signal');};
export function validateDossierSignal(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==fields.length||fields.some(x=>!Object.hasOwn(value,x))||value.version!=='afw-dossier-event-v1'||!HASH.test(value.eventId)||!HASH.test(value.projectRef)||!Number.isSafeInteger(value.revision)||value.revision<1||!kinds.has(value.kind)||!canonicalDate(value.observedAt))fail();
 return Object.fromEntries(fields.map(x=>[x,value[x]]));
}
export async function projectDossierEvent(source,secret){
 if(typeof secret!=='string'||secret.length<32||secret.length>8192||!source||typeof source.id!=='string'||!source.id||source.id.length>256||typeof source.projectId!=='string'||!source.projectId||source.projectId.length>256||!kinds.has(source.type)||!Number.isSafeInteger(source.revision)||source.revision<1||!canonicalDate(source.createdAt))fail();
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const opaque=async purpose=>Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(JSON.stringify(['afw-dossier-event-v1',purpose,source.projectId,...(purpose==='event'?[source.id]:[])])))),x=>x.toString(16).padStart(2,'0')).join('');
 return validateDossierSignal({version:'afw-dossier-event-v1',eventId:await opaque('event'),projectRef:await opaque('project'),revision:source.revision,kind:source.type,observedAt:source.createdAt});
}
const select='event_id AS eventId, project_ref AS projectRef, revision, kind, observed_at AS observedAt';
export async function recordDossierEvent(db,value,now){
 const signal=validateDossierSignal(value);if(!time(now)||Date.parse(signal.observedAt)>now+300000)fail();
 const r=await db.prepare('INSERT OR IGNORE INTO dossier_supervision_events(event_id,project_ref,revision,kind,observed_at,received_at) VALUES(?,?,?,?,?,?)').bind(signal.eventId,signal.projectRef,signal.revision,signal.kind,signal.observedAt,now).run();
 const row=await db.prepare(`SELECT ${select} FROM dossier_supervision_events WHERE event_id=?`).bind(signal.eventId).first();
 if(!row||['eventId','projectRef','revision','kind','observedAt'].some(x=>row[x]!==signal[x]))throw new Error('Dossier event collision');
 return {eventId:signal.eventId,duplicate:r.meta.changes===0};
}
export async function listDossierSignals(db,allowedRefs){
 if(allowedRefs!==undefined&&(!Array.isArray(allowedRefs)||!allowedRefs.length||allowedRefs.length>3||allowedRefs.some(x=>typeof x!=='string'||!HASH.test(x))))return[];
 const result=await db.prepare(`SELECT ${select} FROM dossier_supervision_events e WHERE ${allowedRefs?'e.project_ref IN ('+allowedRefs.map(()=>'?').join(',')+') AND ':''}NOT EXISTS(SELECT 1 FROM dossier_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision) AND NOT EXISTS(SELECT 1 FROM dossier_supervision_runs r WHERE r.event_id=e.event_id AND r.outcome IN ('reviewed','intervention_required')) ORDER BY received_at,event_id LIMIT 3`).bind(...(allowedRefs||[])).all();
 return result.results.map(x=>validateDossierSignal({version:'afw-dossier-event-v1',...x}));
}
const reservation=r=>({runId:r.run_id,eventId:r.event_id,requestId:r.request_id,expiresAt:r.expires_at});
export async function claimDossierSignal(db,eventId,requestId,now,{sharedBudget=false}={}){
 if(typeof eventId!=='string'||!HASH.test(eventId)||typeof requestId!=='string'||!UUID.test(requestId)||!time(now))return null;
 const previous=await db.prepare('SELECT * FROM dossier_supervision_runs WHERE request_id=?').bind(requestId).first();
 if(previous)return previous.event_id===eventId&&previous.outcome===null&&previous.expires_at>now?reservation(previous):null;
 const runId=crypto.randomUUID(),expires=now+300000;
 await db.prepare(`INSERT OR IGNORE INTO dossier_supervision_runs(run_id,request_id,event_id,started_at,expires_at)
 SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM dossier_supervision_events e WHERE e.event_id=? AND NOT EXISTS(SELECT 1 FROM dossier_supervision_events n WHERE n.project_ref=e.project_ref AND n.revision>e.revision))
 AND NOT EXISTS(SELECT 1 FROM dossier_supervision_runs WHERE outcome IS NULL AND expires_at>?)
 AND NOT EXISTS(SELECT 1 FROM dossier_supervision_runs WHERE event_id=? AND outcome IN ('reviewed','intervention_required'))
 ${sharedBudget?'AND NOT EXISTS(SELECT 1 FROM operations_investigations WHERE outcome IS NULL AND expires_at>?) AND NOT EXISTS(SELECT 1 FROM operations_notice_reservations WHERE outcome IS NULL AND expires_at>?)':''}
 AND ((SELECT COUNT(*) FROM dossier_supervision_runs WHERE started_at>?)${sharedBudget?'+(SELECT COUNT(*) FROM operations_investigations WHERE reserved_at>?)+(SELECT COUNT(*) FROM operations_notice_reservations WHERE reserved_at>?)':''})<3`).bind(runId,requestId,eventId,now,expires,eventId,now,eventId,...(sharedBudget?[now,now]:[]),now-86400000,...(sharedBudget?[now-86400000,now-86400000]:[])).run();
 const row=await db.prepare('SELECT * FROM dossier_supervision_runs WHERE request_id=?').bind(requestId).first();
 return row&&row.event_id===eventId&&row.outcome===null&&row.expires_at>now?reservation(row):null;
}
export async function finishDossierSignal(db,runId,outcome,now){
 if(typeof runId!=='string'||!UUID.test(runId)||!['reviewed','intervention_required'].includes(outcome)||!time(now))return null;
 await db.prepare(`UPDATE dossier_supervision_runs SET outcome=CASE WHEN EXISTS(SELECT 1 FROM dossier_supervision_events n JOIN dossier_supervision_events e ON e.event_id=dossier_supervision_runs.event_id WHERE n.project_ref=e.project_ref AND n.revision>e.revision) THEN 'superseded' ELSE ? END,completed_at=? WHERE run_id=? AND outcome IS NULL AND expires_at>?`).bind(outcome,now,runId,now).run();
 const row=await db.prepare('SELECT outcome,expires_at FROM dossier_supervision_runs WHERE run_id=?').bind(runId).first();
 return row&&row.expires_at>now&&[outcome,'superseded'].includes(row.outcome)?row.outcome:null;
}
