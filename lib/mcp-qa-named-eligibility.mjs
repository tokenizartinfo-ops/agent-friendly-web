import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
const fail=()=>{throw Error('Private QA named eligibility unavailable');};
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return Object.freeze(out);
}
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
/** Read-only named-phase observation BEFORE candidate admission. Not ACK,
 * reservation/retry permission, execution authority, guard or physical stop.
 * Host combines this with fixed generation/source/guard and primary write fences.
 * ARM keeps zero-only eligibility; cleanup has separate revoked-grant authority. */
export function createPrivateQaNamedEligibility(options){
 const keys=['db','original','candidate','window','cancellationHistory','now','timeoutMs'],pinned=fields(options,keys);
 const originalKeys=['containerId','processGeneration','programHash','sourceRevision','applicationId','closedAt'],candidateKeys=['trialId','containerId','programHash','sourceRevision','scopeHash','startAt','expiresAt','budget'],windowKeys=['grantId','startAt','expiresAt'];
 const o=fields(pinned.original,originalKeys),c=fields(pinned.candidate,candidateKeys),w=fields(pinned.window,windowKeys),{db,cancellationHistory,now,timeoutMs}=pinned;
 const ordinaryPrepare=db?.prepare,withSession=db?.withSession;
 if(!['containerId','processGeneration','programHash'].every(k=>hex(o[k],64))||!hex(o.sourceRevision,40)||typeof o.applicationId!=='string'||!/^[A-Za-z0-9-]{1,200}$/.test(o.applicationId)||!time(o.closedAt)||!['trialId','containerId','programHash','scopeHash'].every(k=>hex(c[k],64))||!hex(c.sourceRevision,40)||c.containerId===o.containerId||c.budget!==1||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000||typeof w.grantId!=='string'||!/^[A-Za-z0-9_-]{1,128}$/.test(w.grantId)||w.startAt!==c.startAt||w.expiresAt!==c.expiresAt||o.closedAt>=w.startAt||typeof ordinaryPrepare!=='function'||typeof withSession!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const known=prepareKnownCancellationHistory(cancellationHistory,c);if(JSON.parse(cancellationHistory).currentGrant.grantId!==w.grantId)fail();
 const times=['start_at','expires_at','closed_at','stopped_at','observed_at','reserved_at'].map(k=>"typeof(r."+k+")='integer' AND r."+k+">=0 AND r."+k+"<=8640000000000000").join(' AND ');
 const own="r.slot='afw.own-successor.v1' AND r.state='prepared' AND typeof(r.budget)='integer' AND r.budget=1 AND r.trial_id=? AND r.predecessor_container_id=a.container_id AND r.predecessor_generation=a.process_generation AND r.predecessor_program_hash=a.program_hash AND r.predecessor_source_revision=a.source_revision AND r.application_id=? AND r.container_id=? AND r.program_hash=? AND r.source_revision=? AND r.scope_hash=? AND r.start_at=? AND r.expires_at=? AND r.closed_at=z.closed_at AND "+times+" AND r.closed_at<=r.observed_at AND r.stopped_at<=r.observed_at AND r.observed_at<=r.reserved_at AND r.reserved_at>=r.start_at AND r.reserved_at<r.expires_at AND r.reserved_at<="+sqlNow+" AND r.reserved_at-r.observed_at<=30000";
 const sql="SELECT 1 AS eligible FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image='cloudflare/debian-trixie' AND z.closed_at=? AND (SELECT COUNT(*) FROM dossier_node_process_admissions)=1 AND a.expires_at<="+sqlNow+" AND a.consent_expires_at<="+sqlNow+" AND z.closed_at<="+sqlNow+" AND "+known.clause+" AND ((SELECT COUNT(*) FROM dossier_successor_reservations)=0 OR ((SELECT COUNT(*) FROM dossier_successor_reservations)=1 AND EXISTS(SELECT 1 FROM dossier_successor_reservations r WHERE "+own+"))) AND ?<="+sqlNow+" AND "+sqlNow+"<? LIMIT 1";
 const params=Object.freeze([o.containerId,o.processGeneration,o.programHash,o.sourceRevision,o.closedAt,...known.params,c.trialId,o.applicationId,c.containerId,c.programHash,c.sourceRevision,c.scopeHash,c.startAt,c.expiresAt,w.startAt,w.expiresAt]);
 const stable=()=>{
  const value=fields(options,keys),original=fields(pinned.original,originalKeys),candidate=fields(pinned.candidate,candidateKeys),window=fields(pinned.window,windowKeys);
  if(keys.some(k=>value[k]!==pinned[k])||originalKeys.some(k=>original[k]!==o[k])||candidateKeys.some(k=>candidate[k]!==c[k])||windowKeys.some(k=>window[k]!==w[k])||db.prepare!==ordinaryPrepare||db.withSession!==withSession)fail();
 };
 async function check(args){
  if(args.length!==1||!(args[0] instanceof AbortSignal)||args[0].aborted)return false;
  const parent=args[0];let finished=false,timer,onAbort,readCurrent=()=>{};
  try{
  const mono=performance.now(),entered=now();let lastWall=entered,lastMono=mono;
  const remaining=Math.min(timeoutMs,w.expiresAt-entered),end=mono+remaining,wallEnd=entered+remaining;
  const current=()=>{
   const at=now(),m=performance.now();if(finished||parent.aborted||!time(entered)||!time(at)||at<lastWall||at<w.startAt||at>=w.expiresAt||at>=wallEnd||!Number.isFinite(mono)||mono<0||!Number.isFinite(m)||m<lastMono||m>=end)fail();stable();readCurrent();lastWall=at;lastMono=m;return at;
  };
   current();if(!(remaining>0))fail();
   const failure=new Promise(resolve=>{onAbort=()=>{finished=true;resolve(false);};parent.addEventListener('abort',onAbort,{once:true});timer=setTimeout(()=>{finished=true;resolve(false);},Math.max(1,Math.floor(remaining)));});
   const work=async()=>{try{
    current();const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();current();
    const statement=Reflect.apply(prepare,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();current();
    const bound=Reflect.apply(bind,statement,params),first=bound?.first;if(typeof first!=='function')fail();readCurrent=()=>{if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();};current();
    const result=await Reflect.apply(first,bound,[]);current();if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();
    return fields(result,['eligible']).eligible===1;
   }catch{return false;}};
   const allowed=await Promise.race([failure,work()]);if(allowed!==true)return false;current();return true;
  }catch{return false;}finally{finished=true;clearTimeout(timer);if(onAbort)parent.removeEventListener('abort',onAbort);}
 }
 return Object.freeze({check(...args){return check(args);}});
}
