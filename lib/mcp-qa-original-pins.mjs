import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const fail=()=>{throw Error('Private QA original pins unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
/** INTERNAL metadata derivation only. The host supplies the fixed assembled
 * original and capsule window, and an explicitly verified dossier DB binding.
 * No RPC result, physical-stop evidence, grant, reservation or ARM authority.
 * Compose under the parent's original deadline; ARM eligibility independently
 * rechecks zero reservations, current consent and complete retained history. */
export function createPrivateQaOriginalPinsReader(options){
 const keys=['db','original','window','authorize','now','timeoutMs'],pinned=fields(options,keys);
 const originalKeys=['containerId','applicationId','programHash','sourceRevision'],windowKeys=['startAt','expiresAt'];
 const o=fields(pinned.original,originalKeys),w=fields(pinned.window,windowKeys),{db,authorize,now,timeoutMs}=pinned,ordinaryPrepare=db?.prepare,withSession=db?.withSession;
 if(!hex(o.containerId,64)||o.applicationId!==RELEASE_TARGET.namespaceId||!hex(o.programHash,64)||!hex(o.sourceRevision,40)||!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||typeof ordinaryPrepare!=='function'||typeof withSession!=='function'||typeof authorize!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const sql=`SELECT a.container_id AS containerId,a.process_generation AS processGeneration,a.program_hash AS programHash,a.source_revision AS sourceRevision,z.closed_at AS closedAt FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image WHERE a.container_id=? AND a.program_hash=? AND a.source_revision=? AND a.image='cloudflare/debian-trixie' AND (SELECT COUNT(*) FROM dossier_node_process_admissions)=1 AND typeof(a.created_at)='integer' AND typeof(a.expires_at)='integer' AND typeof(a.consent_expires_at)='integer' AND typeof(z.closed_at)='integer' AND a.created_at>=0 AND a.expires_at>a.created_at AND a.expires_at-a.created_at<=600000 AND a.expires_at<=${sqlNow} AND a.consent_expires_at>=a.expires_at AND a.consent_expires_at<=${sqlNow} AND z.closed_at>=a.created_at AND z.closed_at<=${sqlNow} AND z.closed_at<? LIMIT 1`;
 const params=Object.freeze([o.containerId,o.programHash,o.sourceRevision,w.startAt]);
 const stable=()=>{
  const p=fields(options,keys),a=fields(pinned.original,originalKeys),b=fields(pinned.window,windowKeys);
  if(keys.some(k=>p[k]!==pinned[k])||originalKeys.some(k=>a[k]!==o[k])||windowKeys.some(k=>b[k]!==w[k])||db.prepare!==ordinaryPrepare||db.withSession!==withSession)fail();
 };
 async function read(args){
  if(args.length)fail();
  let entered,lastWall,lastMono,finished=false,timer,selected=()=>{};const origin=performance.now(),abort=new AbortController();
  const current=()=>{
   const at=now(),mono=performance.now();
   if(finished||abort.signal.aborted||!time(entered)||!time(at)||at<lastWall||at<entered||at>=entered+timeoutMs||at<w.startAt-600000||at>=w.expiresAt||!Number.isFinite(mono)||mono<origin||mono<lastMono||mono>=origin+timeoutMs)fail();
   stable();selected();lastWall=at;lastMono=mono;return at;
  };
  const work=async()=>{
   entered=now();if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();lastWall=entered;lastMono=origin;current();
   if(await authorize('qa_original_before_read',abort.signal)!==true)fail();current();
   const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();current();
   const statement=Reflect.apply(prepare,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();current();
   const bound=Reflect.apply(bind,statement,params),first=bound?.first;if(typeof first!=='function')fail();
   selected=()=>{if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();};current();
   const raw=await Reflect.apply(first,bound,[]);current();
   const result=fields(raw,['containerId','processGeneration','programHash','sourceRevision','closedAt']);
   if(['containerId','programHash','sourceRevision'].some(k=>result[k]!==o[k])||!hex(result.processGeneration,64)||!time(result.closedAt)||result.closedAt>=w.startAt||result.closedAt>lastWall)fail();
   if(await authorize('qa_original_after_read',abort.signal)!==true)fail();current();return result;
  };
  try{
   const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Private QA original pins unavailable'));},Math.max(1,timeoutMs-(performance.now()-origin)));});
   const result=await Promise.race([work(),deadline]);current();return result;
  }catch{fail();}finally{finished=true;clearTimeout(timer);abort.abort();}
 }
 return Object.freeze({read(...args){return read(args);}});
}
