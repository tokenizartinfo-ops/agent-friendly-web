import {projectDossierEvent,validateDossierSignal,recordDossierEvent} from './dossier-supervision.mjs';
import {operationsWindowOpen} from './operations-window.mjs';
const ORIGIN='https://operations.agentfriendlyweb.dev';
const HASH=/^[0-9a-f]{64}$/;
const open=(env,now)=>env?.AFW_DOSSIER_SUPERVISION_ENABLED==='true'&&operationsWindowOpen(env,now);
const secretValid=x=>typeof x==='string'&&x.length>=32&&x.length<=8192;
const canonicalDate=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString()===x;
export function enrolledDossierRefs(env){return refs(env);}
function refs(env){try{const p=JSON.parse(env.AFW_DOSSIER_PROJECT_REFS);if(!Array.isArray(p)||p.length<1||p.length>3||p.some(x=>typeof x!=='string'||!HASH.test(x))||new Set(p).size!==p.length)return[];return p;}catch{return[];}}
function enrollments(env){try{const p=JSON.parse(env.AFW_DOSSIER_ENROLLMENTS);if(!Array.isArray(p)||p.length<1||p.length>3||p.some(x=>!x||typeof x!=='object'||Array.isArray(x)||Object.keys(x).length!==3||!['projectId','ownerId','since'].every(k=>Object.hasOwn(x,k))||!['projectId','ownerId'].every(k=>typeof x[k]==='string'&&x[k].length>0&&x[k].length<=256)||!canonicalDate(x.since))||new Set(p.map(x=>x.projectId)).size!==p.length)return[];return p;}catch{return[];}}
async function hmac(secret,bytes,usage){return crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,[usage]).then(key=>usage==='sign'?crypto.subtle.sign('HMAC',key,bytes):key);}
export async function signedDossierRequest(value,secret,now){
 const signal=validateDossierSignal(value);if(!secretValid(secret)||!Number.isSafeInteger(now))throw Error('Invalid dossier transport');
 const body=JSON.stringify(signal),timestamp=String(now),bytes=new TextEncoder().encode(timestamp+'.'+body);
 const signature=Array.from(new Uint8Array(await hmac(secret,bytes,'sign')),x=>x.toString(16).padStart(2,'0')).join('');
 return new Request(ORIGIN+'/dossier-events',{method:'POST',redirect:'manual',headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
}
async function boundedText(response,max=1024,timeoutMs=3000){
 const reader=response.body?.getReader();if(!reader)throw Error('body');let timer,size=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),timeoutMs);});
 try{while(true){const r=await Promise.race([reader.read(),deadline]);if(r.done)break;size+=r.value.length;if(size>max)throw Error('size');chunks.push(r.value);}const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
export function createDossierIngress({now=Date.now}={}){
 const reply=(code,status)=>Response.json(code,{status,headers:{'cache-control':'no-store'}});
 return{async fetch(request,env){
  const url=new URL(request.url);
  if(url.origin!==ORIGIN||url.pathname!=='/dossier-events'||url.search)return reply({code:'unavailable'},404);
  if(!open(env,now())||!env.OPERATIONS_DB||!secretValid(env.AFW_DOSSIER_SIGNING_SECRET))return reply({code:'unavailable'},404);
  if(request.method!=='POST')return reply({code:'method_not_allowed'},405);
  if(request.headers.has('Origin')||request.headers.has('Sec-Fetch-Site'))return reply({code:'service_request_required'},403);
  if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply({code:'invalid_request'},415);
  const timestamp=request.headers.get('x-afw-timestamp'),signature=request.headers.get('x-afw-signature');
  if(!/^\d{13}$/.test(timestamp||'')||Math.abs(now()-Number(timestamp))>300000||!HASH.test(signature||''))return reply({code:'signature'},401);
  try{
   const body=await boundedText(request),key=await hmac(env.AFW_DOSSIER_SIGNING_SECRET,new Uint8Array(),'verify');
   const valid=await crypto.subtle.verify('HMAC',key,Uint8Array.from(signature.match(/../g),x=>parseInt(x,16)),new TextEncoder().encode(timestamp+'.'+body));
   if(!valid)return reply({code:'signature'},401);
   const signal=validateDossierSignal(JSON.parse(body));if(!refs(env).includes(signal.projectRef))return reply({code:'project_not_enrolled'},403);
   if(!open(env,now()))return reply({code:'unavailable'},404);
   const db=env.OPERATIONS_DB.withSession?env.OPERATIONS_DB.withSession('first-primary'):env.OPERATIONS_DB;
   return reply(await recordDossierEvent(db,signal,now()),202);
  }catch{return reply({code:'signal_unavailable'},503);}
 }};
}
export function createDossierProducer({now=Date.now}={}){
 return{async run(env){
  let delivered=0,failed=0;const paused=()=>({delivered,failed,paused:true});
  if(!open(env,now())||!secretValid(env.AFW_DOSSIER_SIGNING_SECRET)||!env.DOSSIER_SOURCE_DB||!env.DOSSIER_BRIDGE_STATE_DB||typeof env.DOSSIER_RECEIVER?.fetch!=='function')return paused();
  const enrolled=enrollments(env);if(!enrolled.length)return paused();
  // Scan only already-committed events; never call a remote service on the client's save path.
  for(const entry of enrolled){
   if(!open(env,now()))return paused();
   try{
    const sample=await projectDossierEvent({id:'cursor',projectId:entry.projectId,type:'project_created',revision:1,createdAt:entry.since},env.AFW_DOSSIER_SIGNING_SECRET);
    const cursor=await env.DOSSIER_BRIDGE_STATE_DB.prepare('SELECT revision FROM dossier_supervision_cursors WHERE project_ref=?').bind(sample.projectRef).first();
    const rows=await env.DOSSIER_SOURCE_DB.prepare(`SELECT e.id,e.project_id AS projectId,e.type,e.created_at AS createdAt,json_extract(e.payload_json,'$.revision') AS revision FROM project_events e JOIN site_projects p ON p.id=e.project_id WHERE p.id=? AND p.user_id=? AND e.user_id=? AND e.created_at>=? AND e.type IN ('project_created','project_updated') AND json_extract(e.payload_json,'$.revision')>? ORDER BY revision,e.id LIMIT 3`).bind(entry.projectId,entry.ownerId,entry.ownerId,entry.since,cursor?.revision||0).all();
    for(const row of rows.results){
     if(!open(env,now()))return paused();
     const signal=await projectDossierEvent(row,env.AFW_DOSSIER_SIGNING_SECRET);const request=await signedDossierRequest(signal,env.AFW_DOSSIER_SIGNING_SECRET,now());
     if(!open(env,now()))return paused();
     let timer;const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('transport timeout')),5000);});let receipt;
     try{receipt=await Promise.race([env.DOSSIER_RECEIVER.fetch(request),timeout]);}finally{clearTimeout(timer);}
     if(receipt.status!==202||receipt.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw Error('receipt');
     const accepted=JSON.parse(await boundedText(receipt));if(!accepted||Object.keys(accepted).length!==2||accepted.eventId!==signal.eventId||typeof accepted.duplicate!=='boolean')throw Error('receipt');
     if(!open(env,now()))return paused();
     await env.DOSSIER_BRIDGE_STATE_DB.prepare('INSERT INTO dossier_supervision_cursors(project_ref,revision,updated_at) VALUES(?,?,?) ON CONFLICT(project_ref) DO UPDATE SET revision=MAX(revision,excluded.revision),updated_at=excluded.updated_at').bind(signal.projectRef,signal.revision,now()).run();
     delivered++;
    }
   }catch{failed++;}
  }
  return{delivered,failed,paused:false};
 }};
}
