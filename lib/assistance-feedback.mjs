import {operationsWindowOpen} from './operations-window.mjs';
import {enrolledAssistanceRefs,assistanceEnrollments} from './assistance-supervision-delivery.mjs';
import {projectAssistanceSignal} from './assistance-supervision-contract.mjs';
const ORIGIN='https://operations.agentfriendlyweb.dev',PATH='/assistance-reviews',VERSION='afw-assistance-review-v1';
const HASH=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const topics=['orientation','save','comparison','delivery'],outcomes=['reviewed','intervention_required','superseded'];
const exact=(x,keys)=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const time=x=>Number.isSafeInteger(x)&&x>=0&&Number.isFinite(new Date(x).getTime());
const hash=x=>typeof x==='string'&&HASH.test(x);
const secretValid=x=>typeof x==='string'&&x.length>=32&&x.length<=8192;
const open=(env,now)=>env?.AFW_ASSISTANCE_FEEDBACK_ENABLED==='true'&&operationsWindowOpen(env,now);
const primary=db=>db.withSession?db.withSession('first-primary'):db;
const fail=()=>{throw Error('Assistance review unavailable');};
export function validateAssistanceReview(value,{now=Date.now()}={}){
 const keys=['version','eventId','projectRef','revision','topic','runId','outcome','reviewedAt'];
 if(!exact(value,keys)||value.version!==VERSION||!hash(value.eventId)||!hash(value.projectRef)||!Number.isSafeInteger(value.revision)||value.revision<1||!topics.includes(value.topic)||typeof value.runId!=='string'||!UUID.test(value.runId)||!outcomes.includes(value.outcome)||!time(now)||!time(value.reviewedAt)||value.reviewedAt>now)fail();
 return Object.fromEntries(keys.map(k=>[k,value[k]]));
}
async function bounded(response,max=2048){
 const reader=response.body?.getReader();if(!reader)fail();let timer,size=0;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),3000);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.length;if(size>max)fail();chunks.push(part.value);}const bytes=new Uint8Array(size);let at=0;for(const part of chunks){bytes.set(part,at);at+=part.length;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
const key=(secret,usage)=>crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,[usage]);
const signingText=(timestamp,body)=>VERSION+'\n'+PATH+'\n'+timestamp+'.'+body;
export async function signedAssistanceReviewRequest(value,secret,now){
 if(!exact(value,['eventId','projectRef'])||!hash(value.eventId)||!hash(value.projectRef)||!secretValid(secret)||!time(now))fail();
 const body=JSON.stringify(value),timestamp=String(now);
 const signature=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',await key(secret,'sign'),new TextEncoder().encode(signingText(timestamp,body)))),x=>x.toString(16).padStart(2,'0')).join('');
 return new Request(ORIGIN+PATH,{method:'POST',redirect:'manual',headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
}
export function createAssistanceFeedbackIngress({now=Date.now}={}){
 const reply=(body,status)=>Response.json(body,{status,headers:{'cache-control':'no-store'}});
 return{async fetch(request,env){
  const url=new URL(request.url);
  if(url.origin!==ORIGIN||url.pathname!==PATH||url.search||!open(env,now())||!env.OPERATIONS_DB||!secretValid(env.AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET))return reply({code:'unavailable'},404);
  if(request.method!=='POST')return reply({code:'method_not_allowed'},405);
  if(request.headers.has('origin')||request.headers.has('sec-fetch-site'))return reply({code:'service_request_required'},403);
  if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply({code:'invalid_request'},415);
  const timestamp=request.headers.get('x-afw-timestamp'),signature=request.headers.get('x-afw-signature');
  if(!/^\d{13}$/.test(timestamp||'')||Math.abs(now()-Number(timestamp))>300000||!hash(signature))return reply({code:'signature'},401);
  try{
   const body=await bounded(request,512);
   if(!await crypto.subtle.verify('HMAC',await key(env.AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET,'verify'),Uint8Array.from(signature.match(/../g),x=>parseInt(x,16)),new TextEncoder().encode(signingText(timestamp,body))))return reply({code:'signature'},401);
   const value=JSON.parse(body);if(!exact(value,['eventId','projectRef'])||!hash(value.eventId)||!hash(value.projectRef))return reply({code:'invalid_request'},400);
   if(!enrolledAssistanceRefs(env).includes(value.projectRef))return reply({code:'project_not_enrolled'},403);
   if(!open(env,now()))return reply({code:'unavailable'},404);
   const row=await primary(env.OPERATIONS_DB).prepare("SELECT e.event_id AS eventId,e.project_ref AS projectRef,e.revision,e.topic,r.run_id AS runId,r.outcome,r.completed_at AS reviewedAt,e.observed_at AS observedAt FROM assistance_supervision_events e JOIN assistance_supervision_runs r ON r.event_id=e.event_id WHERE e.event_id=? AND e.project_ref=? AND r.outcome IN ('reviewed','intervention_required','superseded') ORDER BY r.completed_at DESC LIMIT 1").bind(value.eventId,value.projectRef).first();
   let review=null;if(row){const {observedAt,...metadata}=row;review=validateAssistanceReview({version:VERSION,...metadata},{now:now()});if(!Number.isFinite(Date.parse(observedAt))||review.reviewedAt<Date.parse(observedAt))fail();}
   if(!open(env,now()))return reply({code:'unavailable'},404);return reply({review},200);
  }catch{return reply({code:'review_unavailable'},503);}
 }};
}
export function createAssistanceFeedbackProducer({now=Date.now}={}){
 return{async run(env){
  let confirmed=0,failed=0,attempted=0;const paused=()=>({confirmed,failed,paused:true});
  if(!open(env,now())||!env.ASSISTANCE_SOURCE_DB||typeof env.ASSISTANCE_RECEIVER?.fetch!=='function'||!secretValid(env.AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET)||!secretValid(env.AFW_ASSISTANCE_SIGNING_SECRET))return paused();
  const source=primary(env.ASSISTANCE_SOURCE_DB);
  for(const entry of assistanceEnrollments(env)){
   try{
    if(!open(env,now()))return paused();
    const rows=await source.prepare("SELECT e.id,e.created_at AS createdAt,e.payload_json,d.event_id AS eventId,d.project_ref AS projectRef FROM project_events e JOIN site_projects p ON p.id=e.project_id JOIN assistance_delivery_receipts d ON d.source_event_id=e.id WHERE p.id=? AND p.user_id=? AND e.user_id=? AND e.type='assistance_requested' AND e.created_at>=? AND NOT EXISTS(SELECT 1 FROM assistance_feedback_receipts f WHERE f.source_event_id=e.id) ORDER BY e.created_at DESC,e.rowid DESC LIMIT ?").bind(entry.projectId,entry.ownerId,entry.ownerId,entry.since,3-attempted).all();
    for(const row of rows.results){
     if(!open(env,now()))return paused();attempted++;
     const payload=JSON.parse(row.payload_json);if(!exact(payload,['contract','requestId','expectedRevision','topic'])||payload.contract!=='afw.assistance-request.v1'||typeof payload.requestId!=='string'||!UUID.test(payload.requestId)||!Number.isSafeInteger(payload.expectedRevision)||payload.expectedRevision<1||!topics.includes(payload.topic)||!/^help-[0-9a-f]{64}$/.test(row.id))fail();
     const signal=await projectAssistanceSignal({id:row.id,projectId:entry.projectId,type:'assistance_requested',createdAt:row.createdAt,payload},env.AFW_ASSISTANCE_SIGNING_SECRET);
     if(signal.eventId!==row.eventId||signal.projectRef!==row.projectRef)fail();
     const request=await signedAssistanceReviewRequest({eventId:row.eventId,projectRef:row.projectRef},env.AFW_ASSISTANCE_FEEDBACK_SIGNING_SECRET,now());
     if(!open(env,now()))return paused();
     let timer;const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),5000);});let response;
     try{response=await Promise.race([env.ASSISTANCE_RECEIVER.fetch(request),deadline]);}finally{clearTimeout(timer);}
     if(response.status!==200||response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')fail();
     const body=JSON.parse(await bounded(response));if(!exact(body,['review']))fail();if(body.review===null)continue;
     const review=validateAssistanceReview(body.review,{now:now()});
     if(review.eventId!==row.eventId||review.projectRef!==row.projectRef||review.revision!==payload.expectedRevision||review.topic!==payload.topic||!Number.isFinite(Date.parse(row.createdAt))||review.reviewedAt<Date.parse(row.createdAt))fail();
     if(!open(env,now()))return paused();
     const json=JSON.stringify(review);
     await source.prepare("INSERT OR IGNORE INTO assistance_feedback_receipts(source_event_id,review_json,confirmed_at) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM site_projects p JOIN project_events e ON e.project_id=p.id JOIN assistance_delivery_receipts d ON d.source_event_id=e.id WHERE p.id=? AND p.user_id=? AND e.user_id=? AND e.id=? AND e.type='assistance_requested' AND e.payload_json=? AND e.created_at=? AND d.event_id=? AND d.project_ref=?)").bind(row.id,json,now(),entry.projectId,entry.ownerId,entry.ownerId,row.id,row.payload_json,row.createdAt,row.eventId,row.projectRef).run();
     const stored=await source.prepare('SELECT review_json FROM assistance_feedback_receipts WHERE source_event_id=?').bind(row.id).first();if(!stored||stored.review_json!==json)fail();confirmed++;
    }
   }catch{failed++;}
   if(attempted>=3)break;
  }
  return{confirmed,failed,paused:false};
 }};
}

