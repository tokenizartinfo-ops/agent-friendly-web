import {pathToFileURL} from 'node:url';
const SOURCE='https://www.cloudflarestatus.com/api/v2/incidents.json';
const INCIDENT='cbvocc87nsne',MAX_BYTES=262144;
const TRACKED_SOURCE='https://www.cloudflarestatus.com/api/v2/incidents/cbvocc87nsne.json';
const ACTIVE=new Set(['investigating','identified','monitoring']);
const TERMINAL=new Set(['resolved','postmortem']);
function signals(x){
 const names=[x.name];
 const components=value=>{if(value===undefined||value===null)return;if(!Array.isArray(value))throw Error('unavailable');for(const c of value){if(typeof c?.name!=='string')throw Error('unavailable');names.push(c.name);}};
 components(x.components);
 if(x.incident_updates!==undefined&&x.incident_updates!==null){if(!Array.isArray(x.incident_updates))throw Error('unavailable');for(const u of x.incident_updates){if(!u||typeof u!=='object')throw Error('unavailable');components(u.affected_components);}}
 return{worker:names.some(s=>/Workers/i.test(s)),cron:names.some(s=>/Cron Trigger/i.test(s)),dependency:names.some(s=>/\b(?:Durable Objects|Containers|D1|Workflows)\b/i.test(s))};
}
function receipt(providerGate,now,reason=providerGate==='unknown'?'invalid_snapshot':undefined){
 let checkedAt=null;try{if(Number.isSafeInteger(now)&&now>=0)checkedAt=new Date(now).toISOString();}catch{}
 return Object.freeze({source:SOURCE,incidentId:INCIDENT,checkedAt,providerGate,...(reason?{reason}:{}),mayRunClosedVerification:providerGate==='resolved',operationalReadiness:false});
}
/** Public operator prerequisite only: never authorizes OAuth, Node, ONE or PC-off. */
function assessCronProviderSnapshotAll(snapshot,{now=Date.now(),trackedSnapshot}={}){
 try{
  if(!receipt('unknown',now).checkedAt||snapshot?.page?.url!=='https://www.cloudflarestatus.com'||!Array.isArray(snapshot.incidents)||snapshot.incidents.length>50)return receipt('unknown',now);
  if(snapshot.incidents.some(x=>!x||typeof x.id!=='string'||typeof x.name!=='string')||new Set(snapshot.incidents.map(x=>x.id)).size!==snapshot.incidents.length)return receipt('unknown',now);
  let incidents=snapshot.incidents,originals=incidents.filter(x=>x.id===INCIDENT);
  if(!originals.length){
   if(!trackedSnapshot)return receipt('unknown',now,'tracked_incident_absent');
   if(trackedSnapshot.page?.url!=='https://www.cloudflarestatus.com'||trackedSnapshot.incident?.id!==INCIDENT||typeof trackedSnapshot.incident.name!=='string')return receipt('unknown',now,'invalid_tracked_snapshot');
   originals=[trackedSnapshot.incident];incidents=[...incidents,trackedSnapshot.incident];
  }
  const relevant=incidents.map(x=>({incident:x,...signals(x)})).filter(x=>x.worker||x.cron||x.dependency);
  if(originals.length!==1||!signals(originals[0]).worker||!signals(originals[0]).cron||new Set(relevant.map(x=>x.incident.id)).size!==relevant.length)return receipt('unknown',now);
  for(const {incident:x} of relevant){
   const updated=Date.parse(x.updated_at);
   if(!/^[a-z0-9]{1,64}$/.test(x.id)||!ACTIVE.has(x.status)&&!TERMINAL.has(x.status)||!Number.isSafeInteger(updated)||updated>now||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(x.updated_at))return receipt('unknown',now);
   if(new Date(updated).toISOString()!==x.updated_at.replace(/Z$/,x.updated_at.includes('.')?'Z':'.000Z'))return receipt('unknown',now);
  }
  if(relevant.some(x=>x.worker&&x.cron&&ACTIVE.has(x.incident.status)))return receipt('blocked',now,'active_cron_incident');
  const active=relevant.filter(x=>ACTIVE.has(x.incident.status));
  if(active.length)return Object.freeze({...receipt('unknown',now),reason:'active_related_incident',impactAttribution:'not-established',relatedIncidents:Object.freeze(active.map(({incident:x})=>Object.freeze({id:x.id,status:x.status,updatedAt:x.updated_at,url:'https://www.cloudflarestatus.com/incidents/'+x.id})))});
  return receipt('resolved',now);
 }catch{return receipt('unknown',now);}
}

const PREBUILT_PROFILE='prebuilt-closed-publication',BUILDS_COMPONENT='vcpsk0w6g86k';
const buildsTitles=new Set(['Cloudflare Workers build delays','Workers Builds delays','Workers Builds failures','Workers Builds errors','Workers Builds degraded performance']);
function exclusivelyBuilds(x){
 if(!buildsTitles.has(x.name)||!Array.isArray(x.components)||x.components.length!==1||!Array.isArray(x.incident_updates))return false;
 const top=x.components[0];
 if(top.id!==BUILDS_COMPONENT||top.name!=='Workers Builds'||top.code!==undefined&&top.code!==BUILDS_COMPONENT)return false;
 let identifiedUpdate=false;
 for(const u of x.incident_updates){
  const affected=u.affected_components;if(affected===undefined||affected===null)continue;
  if(!Array.isArray(affected))return false;
  for(const c of affected){
   if(c.code!==BUILDS_COMPONENT||c.name!=='Cloudflare Sites and Services - Workers Builds'||c.id!==undefined&&c.id!==BUILDS_COMPONENT)return false;
   identifiedUpdate=true;
  }
 }
 return identifiedUpdate;
}
// This fixed prebuilt publisher does not invoke Workers AI. Keep all-workers
// conservative, and require exclusive named service evidence before excluding.
const WORKERS_AI_COMPONENT='zvm7mqn92xzc';
function exclusivelyAiSafety(x){
 if(x.name!=='Issues with AI Security for Apps'||!Array.isArray(x.components)||x.components.length!==1||!Array.isArray(x.incident_updates))return false;
 const top=x.components[0];
 if(top?.id!==WORKERS_AI_COMPONENT||top.name!=='Workers AI'||top.code!==undefined&&top.code!==WORKERS_AI_COMPONENT)return false;
 let identifiedUpdate=false;
 for(const u of x.incident_updates){
  if(!u||typeof u!=='object'||Array.isArray(u))return false;
  const affected=u.affected_components;if(affected===undefined||affected===null)continue;
  if(!Array.isArray(affected))return false;
  for(const c of affected){
   if(c?.code!==WORKERS_AI_COMPONENT||c.name!=='Cloudflare Sites and Services - Workers AI'||c.id!==undefined&&c.id!==WORKERS_AI_COMPONENT)return false;
   identifiedUpdate=true;
  }
 }
 return identifiedUpdate;
}
/** Narrow fixed-publication dependencies; never an authorization to publish. */
export function assessCronProviderSnapshot(snapshot,{now=Date.now(),dependencyProfile='all-workers',trackedSnapshot}={}){
 if(!['all-workers',PREBUILT_PROFILE].includes(dependencyProfile))return receipt('unknown',now,'invalid_input');
 const conservative=assessCronProviderSnapshotAll(snapshot,{now,trackedSnapshot});
 if(dependencyProfile==='all-workers')return conservative;
 const finish=(value,nonBlockingIncidents=[])=>Object.freeze({...value,dependencyProfile:PREBUILT_PROFILE,nonBlockingIncidents:Object.freeze(nonBlockingIncidents)});
 // The conservative pass validates all relevant IDs, statuses and timestamps FIRST.
 if(conservative.providerGate!=='unknown'||conservative.reason!=='active_related_incident')return finish(conservative);
 try{
  const excluded=snapshot.incidents.filter(x=>ACTIVE.has(x.status)&&(exclusivelyBuilds(x)||exclusivelyAiSafety(x)));
  if(!excluded.length)return finish(conservative);
  const ids=new Set(excluded.map(x=>x.id));
  const scoped=assessCronProviderSnapshotAll({...snapshot,incidents:snapshot.incidents.filter(x=>!ids.has(x.id))},{now,trackedSnapshot});
  return finish(scoped,conservative.relatedIncidents.filter(x=>ids.has(x.id)));
 }catch{return finish(receipt('unknown',now));}
}
const needsTrackedSnapshot=s=>s?.page?.url==='https://www.cloudflarestatus.com'&&Array.isArray(s.incidents)&&s.incidents.length<=50&&s.incidents.every(x=>x&&typeof x.id==='string'&&typeof x.name==='string')&&new Set(s.incidents.map(x=>x.id)).size===s.incidents.length&&!s.incidents.some(x=>x.id===INCIDENT);
export async function checkOwnCronProvider({fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000,dependencyProfile='all-workers'}={}){
 let at,started;try{started=performance.now();at=now();}catch{return receipt('unknown',null,'invalid_input');}
 if(!Number.isFinite(started)||!['all-workers',PREBUILT_PROFILE].includes(dependencyProfile)||!receipt('unknown',at).checkedAt||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)return receipt('unknown',at,'invalid_input');
 const controller=new AbortController();let reader,timer,httpStatus=null,receivedBytes=0,reason='request_failed',requestCount=0,trackedIncidentLookup=false;
 const diagnostic=result=>Object.freeze({...result,...(dependencyProfile===PREBUILT_PROFILE?{dependencyProfile:PREBUILT_PROFILE}:{}),httpStatus,receivedBytes,requestCount,trackedIncidentLookup});
 const cutoff=started+timeoutMs;let lastTick=started;
 const budget=()=>{const tick=performance.now();if(!Number.isFinite(tick)||tick<lastTick||tick>=cutoff||controller.signal.aborted){reason='deadline_exceeded';controller.abort();throw Error('unavailable');}lastTick=tick;};
 try{
  budget();const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{reason='deadline_exceeded';controller.abort();reject(Error('unavailable'));},Math.max(0,cutoff-lastTick));});
  const readJson=async url=>{
   budget();
   reason='request_failed';requestCount++;
   const r=await fetchImpl(url,{redirect:'error',signal:controller.signal,headers:{'User-Agent':'AFW-Diagnostic/1.0 (+https://agentfriendlyweb.dev)'}});
   budget();
   const code=r.status;httpStatus=Number.isSafeInteger(code)&&code>=100&&code<=599?code:null;
   reason='http_status';if(!r.ok)throw Error('unavailable');
   reason='unexpected_response_url';if(r.url&&r.url!==url)throw Error('unavailable');
   reason='unexpected_content_type';if(!/^application\/json(?:;|$)/i.test(r.headers.get('Content-Type')??''))throw Error('unavailable');
   reason='body_unavailable';if(!r.body)throw Error('unavailable');
   reader=r.body.getReader();const decoder=new TextDecoder('utf-8',{fatal:true});let text='';
   while(true){
    reason='body_read_failed';const part=await reader.read();budget();if(part.done)break;
    receivedBytes=Math.min(MAX_BYTES+1,receivedBytes+part.value.byteLength);
    reason='body_too_large';if(receivedBytes>MAX_BYTES)throw Error('unavailable');
    reason='invalid_utf8';text+=decoder.decode(part.value,{stream:true});
   }
   reason='invalid_utf8';text+=decoder.decode();reader.releaseLock();reader=null;
   reason='invalid_json';const parsed=JSON.parse(text);budget();return parsed;
  };
  const request=(async()=>{
   const snapshot=await readJson(SOURCE);
   let trackedSnapshot;
   if(needsTrackedSnapshot(snapshot)){
    budget();
    trackedIncidentLookup=true;trackedSnapshot=await readJson(TRACKED_SOURCE);
   }
   const assessed=assessCronProviderSnapshot(snapshot,{now:at,dependencyProfile,trackedSnapshot});budget();return diagnostic(assessed);
  })();
  return await Promise.race([request,deadline]);
 }catch{return diagnostic(receipt('unknown',at,reason));}
 finally{clearTimeout(timer);controller.abort();if(reader){void reader.cancel().catch(()=>{});try{reader.releaseLock();}catch{/* A pending read is cancelled above. */}}}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=await checkOwnCronProvider();process.stdout.write(JSON.stringify(result)+'\n');process.exitCode=result.providerGate==='resolved'?0:result.providerGate==='blocked'?2:1;
}
