import {prepareKnownCancellationHistory} from './mcp-successor-cancellation-history.mjs';
const fail=()=>{throw Error('Private QA ARM eligibility unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,128}$/.test(v);
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return Object.freeze(out);
}
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
/** One primary SELECT per call. This is an observation, not reservation,
 * physical retirement, binding provenance, scheduling or effect authority.
 * Host must derive these pins and its capsule from the same fixed server data.
 * Final reservation SQL independently revalidates the remaining race. */
export function createPrivateQaArmEligibility(options){
 const keys=['db','original','window','cancellationHistory','authorize','now','timeoutMs'],pinned=fields(options,keys);
 const originalKeys=['containerId','processGeneration','programHash','sourceRevision','closedAt'],windowKeys=['grantId','startAt','expiresAt'];
 const o=fields(pinned.original,originalKeys),w=fields(pinned.window,windowKeys);
 const {db,cancellationHistory,authorize,now,timeoutMs}=pinned,ordinaryPrepare=db?.prepare,withSession=db?.withSession;
 if(!['containerId','processGeneration','programHash'].every(k=>hex(o[k],64))||!hex(o.sourceRevision,40)||!time(o.closedAt)||!id(w.grantId)||!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||o.closedAt>=w.startAt||typeof ordinaryPrepare!=='function'||typeof withSession!=='function'||typeof authorize!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const known=prepareKnownCancellationHistory(cancellationHistory,w);
 if(JSON.parse(cancellationHistory).currentGrant.grantId!==w.grantId)fail();
 const sql=`SELECT 1 AS eligible FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.process_generation=? AND a.program_hash=? AND a.source_revision=? AND a.image='cloudflare/debian-trixie' AND z.closed_at=? AND (SELECT COUNT(*) FROM dossier_node_process_admissions)=1 AND (SELECT COUNT(*) FROM dossier_successor_reservations)=0 AND a.expires_at<=${sqlNow} AND a.consent_expires_at<=${sqlNow} AND z.closed_at<=${sqlNow} AND ${known.clause} AND ?<=${sqlNow} AND ${sqlNow}<? LIMIT 1`;
 const params=Object.freeze([o.containerId,o.processGeneration,o.programHash,o.sourceRevision,o.closedAt,...known.params,w.startAt-600000,w.expiresAt]);
 const stable=()=>{
  const current=fields(options,keys);if(keys.some(k=>current[k]!==pinned[k])||db.prepare!==ordinaryPrepare||db.withSession!==withSession)fail();
  const original=fields(pinned.original,originalKeys),window=fields(pinned.window,windowKeys);if(originalKeys.some(k=>original[k]!==o[k])||windowKeys.some(k=>window[k]!==w[k]))fail();
 };
 async function check(args){
  if(args.length)return false;
  let finished=false,timer,lastWall=-1,lastMono=-1,enteredWall;const mono=performance.now(),abort=new AbortController();
  const current=()=>{
   const at=now(),m=performance.now();if(finished||abort.signal.aborted||!time(at)||!time(enteredWall)||at>=enteredWall+timeoutMs||at<lastWall||at<w.startAt-600000||at>=w.expiresAt||!Number.isFinite(m)||m<mono||m<lastMono||m>=mono+timeoutMs)fail();stable();lastWall=at;lastMono=m;
  };
  const work=async()=>{try{
   enteredWall=now();if(!time(enteredWall)||enteredWall+timeoutMs>8640000000000000||!Number.isFinite(mono)||mono<0)fail();lastWall=enteredWall;lastMono=mono;current();if(await authorize('qa_arm_before_read',abort.signal)!==true)fail();current();
   const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();current();
   const statement=Reflect.apply(prepare,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();current();
   const bound=Reflect.apply(bind,statement,params),first=bound?.first;if(typeof first!=='function')fail();current();
   const result=await Reflect.apply(first,bound,[]);current();
   if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();
   if(await authorize('qa_arm_after_read',abort.signal)!==true)fail();current();
   if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();
   return fields(result,['eligible']).eligible===1;
  }catch{return false;}};
  const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;abort.abort();resolve(false);},Math.max(1,timeoutMs-(performance.now()-mono)));});
  try{return await Promise.race([work(),deadline]);}finally{finished=true;clearTimeout(timer);abort.abort();}
 }
 return Object.freeze({check(...args){return check(args);}});
}
