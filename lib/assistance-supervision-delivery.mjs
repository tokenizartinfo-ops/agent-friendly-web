import {projectAssistanceSignal,validateAssistanceSignal} from './assistance-supervision-contract.mjs';
import {operationsWindowOpen} from './operations-window.mjs';
const ORIGIN='https://operations.agentfriendlyweb.dev',PATH='/assistance-events';
const HASH=/^[0-9a-f]{64}$/;
const open=(env,time)=>env?.AFW_ASSISTANCE_SUPERVISION_ENABLED==='true'&&operationsWindowOpen(env,time);
const secretValid=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
const canonical=value=>typeof value==='string'&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString()===value;
const primary=db=>db.withSession?db.withSession('first-primary'):db;
function references(env){try{const values=JSON.parse(env.AFW_ASSISTANCE_PROJECT_REFS);return Array.isArray(values)&&values.length>0&&values.length<=3&&values.every(x=>typeof x==='string'&&HASH.test(x))&&new Set(values).size===values.length?values:[];}catch{return[];}}
function enrollments(env){try{const values=JSON.parse(env.AFW_ASSISTANCE_ENROLLMENTS);return Array.isArray(values)&&values.length>0&&values.length<=3&&values.every(x=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).length===3&&['projectId','ownerId'].every(k=>typeof x[k]==='string'&&x[k].length>0&&x[k].length<=256)&&canonical(x.since))&&new Set(values.map(x=>x.projectId)).size===values.length?values:[];}catch{return[];}}
async function key(secret,usage){return crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,[usage]);}
async function boundedText(response,max=1024){
 const reader=response.body?.getReader();if(!reader)throw Error('body');let timer,size=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),3000);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.length;if(size>max)throw Error('size');chunks.push(part.value);}const bytes=new Uint8Array(size);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
export async function signedAssistanceRequest(value,secret,time){
 const signal=validateAssistanceSignal(value);if(!secretValid(secret)||!Number.isSafeInteger(time)||time<0)throw Error('Invalid assistance transport');
 const body=JSON.stringify(signal),timestamp=String(time);
 const signature=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',await key(secret,'sign'),new TextEncoder().encode(timestamp+'.'+body))),x=>x.toString(16).padStart(2,'0')).join('');
 return new Request(ORIGIN+PATH,{method:'POST',redirect:'manual',headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
}
const columns='event_id AS eventId,project_ref AS projectRef,revision,kind,topic,observed_at AS observedAt';
export async function recordAssistanceEvent(db,value,time){
 const signal=validateAssistanceSignal(value);if(!Number.isSafeInteger(time)||time<0||Date.parse(signal.observedAt)>time+300000)throw Error('Invalid assistance observation');
 const inserted=await db.prepare('INSERT OR IGNORE INTO assistance_supervision_events(event_id,project_ref,revision,kind,topic,observed_at,received_at) VALUES(?,?,?,?,?,?,?)').bind(signal.eventId,signal.projectRef,signal.revision,signal.kind,signal.topic,signal.observedAt,time).run();
 const row=await db.prepare(`SELECT ${columns} FROM assistance_supervision_events WHERE event_id=?`).bind(signal.eventId).first();
 if(!row||Object.keys(row).some(k=>row[k]!==signal[k]))throw Error('Assistance event collision');
 return{version:'afw-assistance-receipt-v1',eventId:signal.eventId,duplicate:inserted.meta.changes===0};
}
export function createAssistanceIngress({now=Date.now}={}){
 const reply=(body,status)=>Response.json(body,{status,headers:{'cache-control':'no-store'}});
 return{async fetch(request,env){
  const url=new URL(request.url);
  if(url.origin!==ORIGIN||url.pathname!==PATH||url.search||!open(env,now())||!env.OPERATIONS_DB||!secretValid(env.AFW_ASSISTANCE_SIGNING_SECRET))return reply({code:'unavailable'},404);
  if(request.method!=='POST')return reply({code:'method_not_allowed'},405);
  if(request.headers.has('origin')||request.headers.has('sec-fetch-site'))return reply({code:'service_request_required'},403);
  if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply({code:'invalid_request'},415);
  const timestamp=request.headers.get('x-afw-timestamp'),signature=request.headers.get('x-afw-signature');
  if(!/^\d{13}$/.test(timestamp||'')||Math.abs(now()-Number(timestamp))>300000||!HASH.test(signature||''))return reply({code:'signature'},401);
  try{
   const body=await boundedText(request);
   if(!await crypto.subtle.verify('HMAC',await key(env.AFW_ASSISTANCE_SIGNING_SECRET,'verify'),Uint8Array.from(signature.match(/../g),x=>parseInt(x,16)),new TextEncoder().encode(timestamp+'.'+body)))return reply({code:'signature'},401);
   const signal=validateAssistanceSignal(JSON.parse(body));if(!references(env).includes(signal.projectRef))return reply({code:'project_not_enrolled'},403);
   if(!open(env,now()))return reply({code:'unavailable'},404);
   const receipt=await recordAssistanceEvent(primary(env.OPERATIONS_DB),signal,now());
   if(!open(env,now()))return reply({code:'unavailable'},404);
   return reply(receipt,202);
  }catch{return reply({code:'signal_unavailable'},503);}
 }};
}
export function createAssistanceProducer({now=Date.now}={}){
 return{async run(env){
  let delivered=0,failed=0,attempted=0;const paused=()=>({delivered,failed,paused:true});
  if(!open(env,now())||!secretValid(env.AFW_ASSISTANCE_SIGNING_SECRET)||!env.ASSISTANCE_SOURCE_DB||typeof env.ASSISTANCE_RECEIVER?.fetch!=='function')return paused();
  const entries=enrollments(env);if(!entries.length)return paused();
  const source=primary(env.ASSISTANCE_SOURCE_DB);
  for(const entry of entries){
   if(attempted>=3)break;if(!open(env,now()))return paused();
   try{
    const probe=await projectAssistanceSignal({id:'help-'+'0'.repeat(64),projectId:entry.projectId,type:'assistance_requested',createdAt:entry.since,payload:{contract:'afw.assistance-request.v1',requestId:'00000000-0000-0000-0000-000000000000',expectedRevision:1,topic:'orientation'}},env.AFW_ASSISTANCE_SIGNING_SECRET);
    if(!open(env,now()))return paused();
    const rows=await source.prepare(`SELECT e.id,e.project_id AS projectId,e.type,e.created_at AS createdAt,e.payload_json FROM project_events e JOIN site_projects p ON p.id=e.project_id WHERE p.id=? AND p.user_id=? AND e.user_id=? AND e.created_at>=? AND e.type='assistance_requested' AND NOT EXISTS(SELECT 1 FROM assistance_delivery_receipts d WHERE d.project_ref=? AND d.source_event_id=e.id) ORDER BY e.created_at,e.id LIMIT ?`).bind(entry.projectId,entry.ownerId,entry.ownerId,entry.since,probe.projectRef,3-attempted).all();
    for(const row of rows.results){
     if(!open(env,now()))return paused();attempted++;
     const signal=await projectAssistanceSignal({...row,payload:JSON.parse(row.payload_json)},env.AFW_ASSISTANCE_SIGNING_SECRET);
     const request=await signedAssistanceRequest(signal,env.AFW_ASSISTANCE_SIGNING_SECRET,now());
     if(!open(env,now()))return paused();
     const current=await source.prepare('SELECT e.id FROM site_projects p JOIN project_events e ON e.project_id=p.id WHERE p.id=? AND p.user_id=? AND e.id=? AND e.user_id=? AND e.type=? AND e.created_at=? AND e.payload_json=?').bind(entry.projectId,entry.ownerId,row.id,entry.ownerId,'assistance_requested',row.createdAt,row.payload_json).first();
     if(!current)throw Error('source changed');
     if(!open(env,now()))return paused();
     let timer;const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('transport timeout')),5000);});let response;
     try{response=await Promise.race([env.ASSISTANCE_RECEIVER.fetch(request),timeout]);}finally{clearTimeout(timer);}
     if(response.status!==202||response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw Error('receipt');
     const receipt=JSON.parse(await boundedText(response));
     if(!receipt||Object.keys(receipt).length!==3||receipt.version!=='afw-assistance-receipt-v1'||receipt.eventId!==signal.eventId||typeof receipt.duplicate!=='boolean')throw Error('receipt');
     if(!open(env,now()))return paused();
     // Ownership must still match at the acknowledgement boundary.
     await source.prepare(`INSERT OR IGNORE INTO assistance_delivery_receipts(project_ref,source_event_id,event_id,confirmed_at) SELECT ?,?,?,? WHERE EXISTS(SELECT 1 FROM site_projects p JOIN project_events e ON e.project_id=p.id WHERE p.id=? AND p.user_id=? AND e.id=? AND e.user_id=? AND e.type=? AND e.created_at=? AND e.payload_json=?)`).bind(signal.projectRef,row.id,signal.eventId,now(),entry.projectId,entry.ownerId,row.id,entry.ownerId,'assistance_requested',row.createdAt,row.payload_json).run();
     const acknowledged=await source.prepare('SELECT event_id FROM assistance_delivery_receipts WHERE project_ref=? AND source_event_id=?').bind(signal.projectRef,row.id).first();
     if(!acknowledged||acknowledged.event_id!==signal.eventId)throw Error('acknowledgement');
     delivered++;
    }
   }catch{failed++;}
  }
  return{delivered,failed,paused:false};
 }};
}
