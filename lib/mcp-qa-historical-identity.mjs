import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const fail=()=>{throw Error('Private QA historical identity unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,128}$/.test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const all=parts=>parts.length===1?'('+parts[0]+')':'('+all(parts.slice(0,Math.floor(parts.length/2)))+' AND '+all(parts.slice(Math.floor(parts.length/2)))+')';
const scopeMatch=(a,b)=>['user_id','project_id','client_id','resource'].map(k=>a+'.'+k+'='+b+'.'+k);
const canonicalDate=column=>["typeof("+column+")='text'","strftime('%Y-%m-%dT%H:%M:%fZ',"+column+")="+column,column+">='1970-01-01T00:00:00.000Z'"];
/** PRIVATE historical correlation only. Host fixes all declaration/primary pins
 * and explicit dossier DB under its original parent lease. Never use a draft's
 * verified flags or ordinary QA_DB fallback. Returns boolean, no identity data.
 * Does not validate current consent, complete history, reservations, execution,
 * physical stop, ARM, delivery, guard liveness or operational readiness. */
export function createPrivateQaHistoricalIdentityReader(options){
 const keys=['db','scope','candidate','original','window','authorize','now','timeoutMs'],pinned=fields(options,keys);
 const scopeKeys=['grantId','subject','projectId','clientId','resource'],candidateKeys=['containerId','applicationId','programHash','sourceRevision'],originalKeys=['containerId','processGeneration','programHash','sourceRevision','closedAt'],windowKeys=['startAt','expiresAt'];
 const s=fields(pinned.scope,scopeKeys),c=fields(pinned.candidate,candidateKeys),o=fields(pinned.original,originalKeys),w=fields(pinned.window,windowKeys),{db,authorize,now,timeoutMs}=pinned,ordinaryPrepare=db?.prepare,withSession=db?.withSession;
 if(!id(s.grantId)||['subject','projectId','clientId'].some(k=>typeof s[k]!=='string'||!s[k].length||s[k].length>200||s[k].trim()!==s[k])||s.resource!=='https://delegated-canary.agentfriendlyweb.dev/mcp'||!hex(c.containerId,64)||c.containerId===o.containerId||c.applicationId!==RELEASE_TARGET.namespaceId||!hex(c.programHash,64)||!hex(c.sourceRevision,40)||!['containerId','processGeneration','programHash'].every(k=>hex(o[k],64))||!hex(o.sourceRevision,40)||!time(o.closedAt)||!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||o.closedAt>=w.startAt||typeof ordinaryPrepare!=='function'||typeof withSession!=='function'||typeof authorize!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const safeScopes="CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END";
 const earlier=all(["earlier.grant_id=g.id","earlier.sequence<m.sequence","typeof(earlier.sequence)='integer'","earlier.sequence>0","typeof(earlier.revision)='integer'","earlier.revision>0","earlier.action='grant'","earlier.purpose='afw.dossier-monitoring.v1'",...scopeMatch('earlier','g'),"typeof(earlier.issued_at)='integer'","typeof(earlier.expires_at)='integer'","earlier.issued_at>=0","earlier.expires_at>earlier.issued_at","earlier.expires_at-earlier.issued_at<=600000","earlier.issued_at<=m.issued_at"]);
 const where=all([
  "a.container_id=?","a.process_generation=?","a.program_hash=?","a.source_revision=?","z.closed_at=?","a.image='cloudflare/debian-trixie'",
  "(SELECT COUNT(*) FROM dossier_node_process_admissions)=1","(SELECT COUNT(*) FROM dossier_node_process_closures WHERE process_generation IS NOT NULL)=1",
  "typeof(a.created_at)='integer'","typeof(a.expires_at)='integer'","typeof(a.consent_expires_at)='integer'","typeof(z.closed_at)='integer'","a.created_at>=0","a.expires_at>a.created_at","a.expires_at-a.created_at<=600000","a.expires_at<="+sqlNow,"a.consent_expires_at>=a.expires_at","a.consent_expires_at<="+sqlNow,"z.closed_at>=a.created_at","z.closed_at<="+sqlNow,"z.closed_at<?",
  "g.id=?","g.user_id=?","g.project_id=?","g.client_id=?","g.resource=?","g.id<>a.grant_id",...scopeMatch('g','a'),
  "EXISTS(SELECT 1 FROM site_projects p WHERE p.id=g.project_id AND p.user_id=g.user_id)",
  "json_valid(g.scopes_json)","json_type("+safeScopes+")='array'","json_array_length("+safeScopes+")=1","json_extract("+safeScopes+",'$[0]')='afw:project:read'",
  ...['g.created_at','g.exchanged_at','g.expires_at','g.revoked_at'].flatMap(canonicalDate),
  "g.created_at<=g.exchanged_at","g.exchanged_at<g.expires_at","g.exchanged_at<=g.revoked_at","g.expires_at<=strftime('%Y-%m-%dT%H:%M:%fZ','now')","g.revoked_at<=strftime('%Y-%m-%dT%H:%M:%fZ','now')",
  "NOT EXISTS(SELECT 1 FROM dossier_node_process_admissions WHERE grant_id=g.id)",
  "cz.process_generation IS NULL","cz.container_id=?","cz.program_hash=?","cz.source_revision=?","cz.image='cloudflare/debian-trixie'","typeof(cz.closed_at)='integer'","cz.closed_at>=0","cz.closed_at<="+sqlNow,"cz.closed_at<?","g.revoked_at<=strftime('%Y-%m-%dT%H:%M:%fZ',cz.closed_at/1000.0,'unixepoch')",
  "typeof(m.sequence)='integer'","m.sequence>0","typeof(m.revision)='integer'","m.revision>0","m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)","m.action='revoke'","m.purpose='afw.dossier-monitoring.v1'",...scopeMatch('m','g'),
  "typeof(m.issued_at)='integer'","typeof(m.expires_at)='integer'","m.issued_at>=0","m.expires_at=m.issued_at","m.issued_at<=cz.closed_at","EXISTS(SELECT 1 FROM dossier_monitoring_consent_events earlier WHERE "+earlier+")",
  "?<="+sqlNow,sqlNow+"<?"
 ]);
 const sql="SELECT 1 AS historicalIdentityVerified FROM dossier_node_process_admissions a JOIN dossier_node_process_closures z ON z.grant_id=a.grant_id AND z.container_id=a.container_id AND z.process_generation=a.process_generation AND z.program_hash=a.program_hash AND z.source_revision=a.source_revision AND z.image=a.image JOIN delegated_access_grants g ON g.id<>a.grant_id JOIN dossier_node_process_closures cz ON cz.grant_id=g.id JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id WHERE "+where+" LIMIT 1";
 const params=Object.freeze([o.containerId,o.processGeneration,o.programHash,o.sourceRevision,o.closedAt,w.startAt,s.grantId,s.subject,s.projectId,s.clientId,s.resource,c.containerId,c.programHash,c.sourceRevision,w.startAt,w.startAt-600000,w.expiresAt]);
 const stable=()=>{const p=fields(options,keys);if(keys.some(k=>p[k]!==pinned[k])||db.prepare!==ordinaryPrepare||db.withSession!==withSession)fail();for(const [input,ks,snapshot]of [[pinned.scope,scopeKeys,s],[pinned.candidate,candidateKeys,c],[pinned.original,originalKeys,o],[pinned.window,windowKeys,w]]){const current=fields(input,ks);if(ks.some(k=>current[k]!==snapshot[k]))fail();}};
 async function check(args){
  if(args.length!==1||!(args[0] instanceof AbortSignal)||args[0].aborted)return false;
  const parent=args[0],abort=new AbortController();let entered,lastWall,lastMono,finished=false,timer,onAbort,selected=()=>{};const origin=performance.now();
  const current=()=>{const at=now(),mono=performance.now();if(finished||parent.aborted||abort.signal.aborted||!time(entered)||!time(at)||at<lastWall||at>=entered+timeoutMs||at<w.startAt-600000||at>=w.expiresAt||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs)fail();stable();selected();lastWall=at;lastMono=mono;return at;};
  try{
   entered=now();if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();lastWall=entered;lastMono=origin;
   const work=async()=>{try{
    current();if(await authorize('qa_history_before_read',abort.signal)!==true)fail();current();
    const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();current();
    const statement=Reflect.apply(prepare,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();current();
    const bound=Reflect.apply(bind,statement,params),first=bound?.first;if(typeof first!=='function')fail();selected=()=>{if(session.prepare!==prepare||statement.bind!==bind||bound.first!==first)fail();};current();
    const result=await Reflect.apply(first,bound,[]);current();if(fields(result,['historicalIdentityVerified']).historicalIdentityVerified!==1)return false;
    if(await authorize('qa_history_after_read',abort.signal)!==true)fail();current();return true;
   }catch{return false;}};
   const stopped=new Promise(resolve=>{onAbort=()=>{finished=true;abort.abort();resolve(false);};parent.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,Math.max(1,Math.floor(timeoutMs-(performance.now()-origin))));});
   const result=await Promise.race([stopped,work()]);if(result!==true)return false;current();return true;
  }catch{return false;}finally{finished=true;clearTimeout(timer);if(onAbort)parent.removeEventListener('abort',onAbort);abort.abort();}
 }
 return Object.freeze({check(...args){return check(args);}});
}
