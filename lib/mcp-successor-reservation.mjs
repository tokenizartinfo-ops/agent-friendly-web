const fail=()=>{throw Error('Successor reservation unavailable');};
const sha=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const revision=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
/** Private administrative preparation only. Pins/evidence reader are host-owned.
 * One immutable reservation; lost ACK never becomes retry permission or boot. */
export function createSuccessorReservation({db,original,candidate,readRetirement,now=Date.now,timeoutMs=5000}={}){
 const o=exact(original,['containerId','applicationId','programHash','sourceRevision']),c=exact(candidate,['trialId','containerId','programHash','sourceRevision','scopeHash','startAt','expiresAt','budget']);
 if(!sha(o.containerId)||!sha(o.programHash)||!revision(o.sourceRevision)||typeof o.applicationId!=='string'||!/^[A-Za-z0-9-]{1,200}$/.test(o.applicationId)||!['trialId','containerId','programHash','scopeHash'].every(k=>sha(c[k]))||!revision(c.sourceRevision)||c.containerId===o.containerId||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000||c.budget!==1||typeof db?.prepare!=='function'||typeof readRetirement!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 return Object.freeze({async reserve(){
  const end=performance.now()+timeoutMs,abort=new AbortController();let timer,last=-1;
  const clock=()=>{const n=now();if(abort.signal.aborted||performance.now()>=end||!time(n)||n<last||n>=c.expiresAt)fail();last=n;return n;};
  const work=async()=>{
   clock();const e=exact(await readRetirement({signal:abort.signal},clock),['purpose','containerId','applicationId','programHash','sourceRevision','processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor']),n=clock();
   if(e.purpose!=='afw.retirement-evidence.v1'||Object.keys(o).some(k=>e[k]!==o[k])||!sha(e.processGeneration)||!['closedAt','stoppedAt','observedAt'].every(k=>time(e[k]))||e.closedAt>e.observedAt||e.stoppedAt>e.observedAt||e.observedAt>n||n-e.observedAt>30000||e.physicalStopVerified!==true||e.mayStartSuccessor!==false)fail();
   const columns=['slot','trial_id','predecessor_container_id','predecessor_generation','predecessor_program_hash','predecessor_source_revision','application_id','container_id','program_hash','source_revision','scope_hash','start_at','expires_at','budget','closed_at','stopped_at','observed_at','state'];
   const values=['afw.own-successor.v1',c.trialId,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,o.applicationId,c.containerId,c.programHash,c.sourceRevision,c.scopeHash,c.startAt,c.expiresAt,c.budget,e.closedAt,e.stoppedAt,e.observedAt,'prepared'];
   const primary=db.withSession?db.withSession('first-primary'):db;
   const sql=`INSERT INTO dossier_successor_reservations (${columns.join(',')},reserved_at) SELECT ${columns.map(()=>'?').join(',')},${sqlNow} FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image='cloudflare/debian-trixie' AND z.closed_at=? AND (SELECT COUNT(*) FROM dossier_node_process_admissions)=1 AND (SELECT COUNT(*) FROM dossier_node_process_closures)=1 AND ?>${sqlNow} AND ?<=${sqlNow} AND ${sqlNow}-?<=30000`;
   clock();const result=await primary.prepare(sql).bind(...values,o.containerId,e.processGeneration,o.programHash,o.sourceRevision,e.closedAt,c.expiresAt,e.observedAt,e.observedAt).run();clock();
   if(result?.success!==true||result.meta?.changes!==1)fail();
   return Object.freeze({purpose:'afw.successor-reservation.v1',trialId:c.trialId,state:'prepared',mayBoot:false});
  };
  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Successor reservation unavailable'));},timeoutMs);})]);}catch{fail();}finally{clearTimeout(timer);abort.abort();}
 }});
}
