import {validateAssistanceSignal} from './assistance-supervision-contract.mjs';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const HASH=/^[0-9a-f]{64}$/;
const ORIGIN='https://github.com/tokenizartinfo-ops/agent-friendly-web.git';
const fields=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const stamp=v=>Number.isSafeInteger(v)&&v>=0&&Number.isFinite(new Date(v).getTime());
const invalid=()=>{throw Error('Invalid occurrence contract');};
const journalColumns=['occurrence_id','sequence','operation_id','identity_ref','manifest_digest','phase','state','attempts','controls','recorded_at','observation_at','observation_revision','run_id','lease_expires_at','outcome','reason'];
/** INTERNAL, unmounted. Caller supplies trusted preflight/clock/principal and SQL statements.
 * consume batches an exclusive transition BEFORE effects in one D1 transaction.
 * Effects must include SQL postconditions where zero affected rows would mean failure.
 * Never pass request-provided SQL, issue effects in JS, or retry ambiguous results.
 */
export function createOccurrenceD1Store({db,manifest,identityRef,preflight,now=Date.now}={}){
 if(typeof db?.prepare!=='function'||typeof db?.batch!=='function'||typeof preflight!=='function'||typeof now!=='function'||typeof identityRef!=='string'||!HASH.test(identityRef)||!exact(manifest,fields)||!['occurrenceId','requestId'].every(k=>typeof manifest[k]==='string'&&UUID.test(manifest[k]))||typeof manifest.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(manifest.sourceRevision)||typeof manifest.configId!=='string'||!/^cecfg_[a-zA-Z0-9]{1,128}$/.test(manifest.configId)||typeof manifest.publicationId!=='string'||!/^cecfgver_[a-zA-Z0-9]{1,128}$/.test(manifest.publicationId)||!['startAt','deadline','tokenExpiresAt','serverDeadline'].every(k=>stamp(manifest[k])))invalid();
 const signal=validateAssistanceSignal(manifest.signal);
 if(!Object.entries(signal).every(([k,v])=>k==='revision'||typeof v==='string')||[manifest.deadline,manifest.tokenExpiresAt,manifest.serverDeadline].some(v=>v<=manifest.startAt))invalid();
 const m={...manifest,signal:{...signal}},identity=identityRef;
 const digest=crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([...fields.map(k=>k==='signal'?Object.values(signal):m[k]),identity]))).then(b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join(''));
 let lastTime=-1;
 function clock(){const t=now();if(!stamp(t)||t<lastTime)return null;lastTime=t;return t;}
 function fits(t,lease){return t!==null&&t>=m.startAt&&t+10000<Math.min(m.deadline,m.tokenExpiresAt,m.serverDeadline,lease??Infinity)&&Date.parse(signal.observedAt)<=t;}
 async function ready(lease){if(!fits(clock(),lease))return null;let o;try{o=await preflight();}catch{return null;}const t=clock();if(!fits(t,lease)||!o||o.sourceRevision!==m.sourceRevision||o.configId!==m.configId||o.publicationId!==m.publicationId||o.origin!==ORIGIN||o.observationsCurrent!==true||o.networkMode!=='restricted'||o.networkEnforced!==true||o.operationsBindingsReady!==true||!Number.isSafeInteger(o.observationRevision)||o.observationRevision<1||o.observationRevision!==o.configurationRevision||!stamp(o.observedAt)||o.observedAt>t||t-o.observedAt>30000)return null;return {time:t,observationAt:o.observedAt,revision:o.observationRevision};}
 function insert(row){
  const values=[],expressions=journalColumns.map(k=>{
   if(k==='recorded_at')return "CAST(unixepoch('subsec')*1000 AS INTEGER)";
   if(k==='outcome'&&row.state==='completed'){values.push(row.occurrence_id);return "CASE WHEN EXISTS(SELECT 1 FROM assistance_supervision_events n JOIN assistance_occurrences o ON o.project_ref=n.project_ref WHERE o.occurrence_id=? AND n.revision>o.revision) THEN 'superseded' ELSE 'intervention_required' END";}
   values.push(row[k]??null);return '?';
  });
  return db.prepare(`INSERT INTO assistance_occurrence_journal(${journalColumns.join(',')}) VALUES(${expressions.join(',')})`).bind(...values);
 }
 async function batch(statements,returnResults=false){try{const results=await db.batch(statements);return returnResults?results:true;}catch(e){const message=String(e?.cause?.message??e?.message??'');if(message.includes('Occurrence denied')||message.includes('UNIQUE constraint failed: assistance_'))return false;throw Error('Occurrence storage unavailable');}}
 async function previous(){try{return await db.prepare('SELECT * FROM assistance_occurrence_journal WHERE occurrence_id=? ORDER BY sequence DESC LIMIT 1').bind(m.occurrenceId).first();}catch{throw Error('Occurrence storage unavailable');}}
 function row(p,check,change){return {...p,occurrence_id:m.occurrenceId,sequence:p?p.sequence+1:0,operation_id:crypto.randomUUID(),identity_ref:identity,phase:'preflight',state:'started',attempts:0,controls:1,run_id:null,lease_expires_at:null,outcome:null,reason:null,...(p?{phase:p.phase,attempts:p.attempts,controls:p.controls,run_id:p.run_id,lease_expires_at:p.lease_expires_at}:{}),recorded_at:check.time,observation_at:check.observationAt,observation_revision:check.revision,...change};}
 async function consume(input,build){const keys=input?.phase==='claim'?['expectedSequence','phase','runId','leaseExpiresAt']:input?.phase==='finish'?['expectedSequence','phase','outcome']:['expectedSequence','phase'];
   if(!exact(input,keys)||!Number.isSafeInteger(input.expectedSequence)||input.expectedSequence<0||!['list','claim','finish'].includes(input.phase)||typeof build!=='function'||(input.phase==='claim'&&(typeof input.runId!=='string'||!UUID.test(input.runId)||!stamp(input.leaseExpiresAt)))||(input.phase==='finish'&&!['intervention_required','superseded'].includes(input.outcome)))return false;
   const key=await digest,p=await previous();if(!p||p.sequence!==input.expectedSequence||p.state!=='attempted'||p.phase!==input.phase||p.manifest_digest!==key||p.identity_ref!==identity)return false;
   const lease=input.phase==='claim'?input.leaseExpiresAt:p.lease_expires_at,check=await ready(lease);if(!check||(input.phase==='claim'&&lease>check.time+300000))return false;
   const next=row(p,check,{manifest_digest:key,state:input.phase==='finish'?'completed':'consumed',...(input.phase==='claim'?{run_id:input.runId,lease_expires_at:lease}:{}),...(input.phase==='finish'?{outcome:input.outcome}:{})});
   const effects=build(Object.freeze({operationId:next.operation_id,occurrenceId:m.occurrenceId,manifest:Object.freeze({...m,signal:Object.freeze({...signal})}),runId:next.run_id,leaseExpiresAt:next.lease_expires_at,phase:input.phase}));
   if(!Array.isArray(effects)||effects.length>8||effects.some(s=>typeof s?.bind!=='function'||typeof s?.run!=='function')||(input.phase!=='list'&&effects.length===0))invalid();
   const clockCheck=db.prepare(`INSERT INTO assistance_occurrence_clock_checks(operation_id,verified)
 SELECT ?,CASE WHEN EXISTS(SELECT 1 FROM assistance_occurrence_journal j JOIN assistance_occurrences o ON o.occurrence_id=j.occurrence_id WHERE j.operation_id=? AND j.state IN ('consumed','completed')
 AND CAST(unixepoch('subsec')*1000 AS INTEGER)>=o.start_at
 AND CAST(unixepoch('subsec')*1000 AS INTEGER)+10000<min(o.deadline,o.token_expires_at,o.server_deadline,coalesce(j.lease_expires_at,8640000000000000))
 AND j.observation_at<=CAST(unixepoch('subsec')*1000 AS INTEGER)
 AND CAST(unixepoch('subsec')*1000 AS INTEGER)-j.observation_at<=30000) THEN 1 ELSE 0 END`).bind(next.operation_id,next.operation_id);
   return batch([insert(next),...effects,clockCheck],true);
 }
 return {
  async create(){const key=await digest,check=await ready();if(!check)return false;
   const columns=['occurrence_id','request_id','event_id','project_ref','revision','kind','topic','observed_at','source_revision','config_id','publication_id','origin','identity_ref','manifest_digest','configuration_revision','start_at','deadline','token_expires_at','server_deadline'];
   const values=[m.occurrenceId,m.requestId,signal.eventId,signal.projectRef,signal.revision,signal.kind,signal.topic,signal.observedAt,m.sourceRevision,m.configId,m.publicationId,ORIGIN,identity,key,check.revision,m.startAt,m.deadline,m.tokenExpiresAt,m.serverDeadline];
   const first=row(null,check,{manifest_digest:key}),attempt={...first,sequence:1,operation_id:crypto.randomUUID(),phase:'list',state:'attempted',attempts:1};
   return batch([db.prepare(`INSERT INTO assistance_occurrences(${columns.join(',')}) VALUES(${columns.map(()=>'?').join(',')})`).bind(...values),insert(first),insert(attempt)]);
  },
  async admit(input){if(!exact(input,['expectedSequence','phase'])||!Number.isSafeInteger(input.expectedSequence)||input.expectedSequence<0||!['claim','finish'].includes(input.phase))return false;
   const key=await digest,p=await previous();if(!p||p.sequence!==input.expectedSequence||p.state!=='consumed'||p.manifest_digest!==key||p.identity_ref!==identity||!((p.phase==='list'&&input.phase==='claim')||(p.phase==='claim'&&input.phase==='finish')))return false;
   const check=await ready(p.lease_expires_at);if(!check)return false;return batch([insert(row(p,check,{manifest_digest:key,phase:input.phase,state:'attempted',attempts:p.attempts+1,controls:p.controls+1}))]);
  },
  async consume(input,effects=[]){return Boolean(await consume(input,()=>effects));},
  async consumePrepared(input,build){return consume(input,build);},
  async close(input){if(!exact(input,['reason'])||!['operator_closed','window_expired','ambiguous_response'].includes(input.reason))return false;
   const key=await digest,p=await previous(),t=clock();if(!p||['completed','stopped'].includes(p.state)||p.manifest_digest!==key||p.identity_ref!==identity||t===null)return false;
   return batch([insert(row(p,{time:t,observationAt:p.observation_at,revision:p.observation_revision},{manifest_digest:key,state:'stopped',controls:p.controls+1,reason:input.reason}))]);
  },
 };
}
