import {pathToFileURL} from 'node:url';
const SOURCE='https://www.cloudflarestatus.com/api/v2/incidents.json';
const INCIDENT='cbvocc87nsne',MAX_BYTES=262144;
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
export function assessCronProviderSnapshot(snapshot,{now=Date.now()}={}){
 try{
  if(!receipt('unknown',now).checkedAt||snapshot?.page?.url!=='https://www.cloudflarestatus.com'||!Array.isArray(snapshot.incidents)||snapshot.incidents.length>50)return receipt('unknown',now);
  if(snapshot.incidents.some(x=>!x||typeof x.id!=='string'||typeof x.name!=='string'))return receipt('unknown',now);
  const originals=snapshot.incidents.filter(x=>x.id===INCIDENT),relevant=snapshot.incidents.map(x=>({incident:x,...signals(x)})).filter(x=>x.worker||x.cron||x.dependency);
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
export async function checkOwnCronProvider({fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000}={}){
 let at;try{at=now();}catch{return receipt('unknown',null,'invalid_input');}
 if(!receipt('unknown',at).checkedAt||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)return receipt('unknown',at,'invalid_input');
 const controller=new AbortController();let reader,timer,httpStatus=null,receivedBytes=0,reason='request_failed';
 const diagnostic=result=>Object.freeze({...result,httpStatus,receivedBytes});
 try{
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{reason='deadline_exceeded';controller.abort();reject(Error('unavailable'));},timeoutMs);});
  const request=(async()=>{
   const r=await fetchImpl(SOURCE,{redirect:'error',signal:controller.signal,headers:{'User-Agent':'AFW-Diagnostic/1.0 (+https://agentfriendlyweb.dev)'}});
   if(controller.signal.aborted)throw Error('unavailable');
   const code=r.status;httpStatus=Number.isSafeInteger(code)&&code>=100&&code<=599?code:null;
   reason='http_status';if(!r.ok)throw Error('unavailable');
   reason='unexpected_response_url';if(r.url&&r.url!==SOURCE)throw Error('unavailable');
   reason='unexpected_content_type';if(!/^application\\/json(?:;|$)/i.test(r.headers.get('Content-Type')??''))throw Error('unavailable');
   reason='body_unavailable';if(!r.body)throw Error('unavailable');
   reader=r.body.getReader();const decoder=new TextDecoder('utf-8',{fatal:true});let text='';
   while(true){
    reason='body_read_failed';const part=await reader.read();if(controller.signal.aborted)throw Error('unavailable');if(part.done)break;
    receivedBytes=Math.min(MAX_BYTES+1,receivedBytes+part.value.byteLength);
    reason='body_too_large';if(receivedBytes>MAX_BYTES)throw Error('unavailable');
    reason='invalid_utf8';text+=decoder.decode(part.value,{stream:true});
   }
   reason='invalid_utf8';text+=decoder.decode();
   reason='invalid_json';const snapshot=JSON.parse(text);
   return diagnostic(assessCronProviderSnapshot(snapshot,{now:at}));
  })();
  return await Promise.race([request,deadline]);
 }catch{return diagnostic(receipt('unknown',at,reason));}
 finally{clearTimeout(timer);controller.abort();if(reader){void reader.cancel().catch(()=>{});try{reader.releaseLock();}catch{/* A pending read is cancelled above. */}}}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=await checkOwnCronProvider();process.stdout.write(JSON.stringify(result)+'\n');process.exitCode=result.providerGate==='resolved'?0:result.providerGate==='blocked'?2:1;
}
