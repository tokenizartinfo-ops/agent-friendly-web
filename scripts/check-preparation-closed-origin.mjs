import {pathToFileURL} from 'node:url';

export const PREPARATION_CLOSED_ORIGIN='https://preparation-canary.agentfriendlyweb.dev';
const TEAM='tokenizart.cloudflareaccess.com';
const HUMAN=new Set(['/authorize','/connections','/connections/revoke']);
const PATHS=['/','/mcp','/oauth/token',...HUMAN];
const CONTRACT='afw.preparation.closed-origin.v1';
const unavailable=()=>Error('Closed preparation origin unavailable');
const quietCancel=body=>{try{Promise.resolve(body?.cancel()).catch(()=>{});}catch{}};

async function closedJson(response,signal,readers){
 if(response.status!==404||!/^application\/json(?:;|$)/i.test(response.headers.get('Content-Type')??'')
  ||!/(?:^|,)\s*no-store\s*(?:,|$)/i.test(response.headers.get('Cache-Control')??''))throw unavailable();
 const length=response.headers.get('Content-Length');
 if(length!==null&&(!/^\d+$/.test(length)||Number(length)>2048))throw unavailable();
 if(!response.body)throw unavailable();
 const reader=response.body.getReader();readers.add(reader);
 try{
  const chunks=[];let size=0;
  for(;;){const {done,value}=await reader.read();if(signal.aborted)throw unavailable();if(done)break;
   if(!(value instanceof Uint8Array)||(size+=value.byteLength)>2048)throw unavailable();chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  const keys=['chargeAllowed','code','executionAllowed','publicationAllowed'];
  if(!value||Array.isArray(value)||Object.keys(value).sort().join('|')!==keys.join('|')
   ||value.code!=='preparation_route_unavailable'||value.chargeAllowed!==false||value.executionAllowed!==false||value.publicationAllowed!==false)throw unavailable();
 }finally{readers.delete(reader);quietCancel(reader);try{reader.releaseLock();}catch{}}
}

/** Fixed public QA target only. This observes closure, never a live identity or consent. */
export async function inspectPreparationClosedOrigin(options={}){
 let timer;const controller=new AbortController(),readers=new Set();
 try{
  if(!options||typeof options!=='object'||Reflect.ownKeys(options).some(k=>!['fetcher','timeoutMs'].includes(k)))throw unavailable();
  const fetcher=options.fetcher??globalThis.fetch,timeoutMs=options.timeoutMs??15000;
  if(typeof fetcher!=='function'||!Number.isInteger(timeoutMs)||timeoutMs<100||timeoutMs>20000)throw unavailable();
  const work=async()=>{
   const checks=[];
   for(const path of PATHS){
    if(controller.signal.aborted)throw unavailable();
    const response=await fetcher(PREPARATION_CLOSED_ORIGIN+path,{method:'GET',redirect:'manual',credentials:'omit',cache:'no-store',
     headers:{Accept:HUMAN.has(path)?'text/html':'application/json'},signal:controller.signal});
    try{
     if(controller.signal.aborted||!(response instanceof Response)||response.redirected)throw unavailable();
     if(HUMAN.has(path)){
      let observation;
      if(response.status===403)observation='human_unauthenticated_rejected';
      else if(response.status===302){
       const location=new URL(response.headers.get('Location'));
       if(location.protocol!=='https:'||location.hostname!==TEAM||location.port||location.username||location.password
        ||location.pathname!=='/cdn-cgi/access/login/preparation-canary.agentfriendlyweb.dev')throw unavailable();
       observation='access_login_redirect_observed';
      }else throw unavailable();
      checks.push({path,status:response.status,observation});
     }else{await closedJson(response,controller.signal,readers);checks.push({path,status:response.status,observation:'closed_json'});}
    }finally{quietCancel(response?.body);}
   }
   return{contract:CONTRACT,checkedAt:new Date().toISOString(),origin:PREPARATION_CLOSED_ORIGIN,checks,closedSurfaceObserved:true,
    authenticatedIdentityAccepted:false,consentAccepted:false,operationalReadiness:false};
  };
  const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(unavailable());},timeoutMs);});
  return await Promise.race([work(),timeout]);
 }catch{throw unavailable();}
 finally{clearTimeout(timer);controller.abort();for(const reader of readers)quietCancel(reader);}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  const result=await inspectPreparationClosedOrigin();
  const sourceRevision=/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')?process.env.GITHUB_SHA:null;
  console.log(JSON.stringify({...result,sourceRevision}));
 }catch{
  console.log(JSON.stringify({contract:CONTRACT,checkedAt:new Date().toISOString(),origin:PREPARATION_CLOSED_ORIGIN,
   closedSurfaceObserved:false,authenticatedIdentityAccepted:false,consentAccepted:false,operationalReadiness:false,error:'closed_origin_check_failed'}));
  process.exitCode=1;
 }
}
