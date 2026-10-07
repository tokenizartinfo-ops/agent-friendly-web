import {GOAL_PROPOSAL_ORIGIN,GOAL_PROPOSAL_PATH,verifyAssistanceGoalProposalService,validAssistanceGoalProposalQuery} from './assistance-goal-proposal-identity.mjs';
import {createAssistanceGoalProposal} from './assistance-goal-proposal.mjs';
import {readActiveAssistanceGoalLease} from './assistance-goal-lease.mjs';
import {readCurrentAssistanceGoalReceipt} from './assistance-goal-read-receipt.mjs';
import {reserveAssistanceGoalProposal,completeAssistanceGoalProposal} from './assistance-goal-proposal-ledger.mjs';
const reply=(body,status)=>Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
const id=value=>typeof value==='string'&&value.length>0&&value.length<=256;
const secret=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
async function boundedBody(request,timeoutMs){
 if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw{status:415};
 const reader=request.body?.getReader();if(!reader)throw{status:400};let size=0,timer;const chunks=[];
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject({status:408}),timeoutMs);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>512)throw{status:413};chunks.push(part.value);}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}
 finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
// Server dependency composition only: no runtime mount or provider configured.
// reserveGeneration must be a trusted, durable budget adapter. Its absence fails
// closed; the private proposal claim prevents retries from charging/generating again.
export function createAssistanceGoalProposalHttp({sourceDb,operationsDb,getSettings,signingSecret,readSigningSecret,signalSecret,keySet,limiter,reserveGeneration,generate,now=Date.now,bodyTimeoutMs=3000}={}){
 return async request=>{
 try{
 const start=now(),initial=structuredClone(getSettings?.()||{}),serialized=JSON.stringify(initial),until=Date.parse(initial.expiresAt),enrollment=initial.enrollment;
 const open=()=>initial.enabled===true&&initial.generationEnabled===true&&initial.origin===GOAL_PROPOSAL_ORIGIN&&Number.isSafeInteger(start)&&Number.isFinite(until)&&typeof initial.expiresAt==='string'&&new Date(until).toISOString()===initial.expiresAt&&until>start&&until-start<=600000&&now()>=start&&now()<until&&JSON.stringify(getSettings())===serialized;
 if(!open()||!sourceDb?.prepare||!operationsDb?.prepare||[signingSecret,readSigningSecret,signalSecret].some(value=>!secret(value))||new Set([signingSecret,readSigningSecret,signalSecret]).size!==3||!enrollment||Object.keys(enrollment).sort().join(',')!=='projectId,since,userId'||!id(enrollment.projectId)||!id(enrollment.userId)||typeof enrollment.since!=='string'||!Number.isFinite(Date.parse(enrollment.since))||new Date(enrollment.since).toISOString()!==enrollment.since||Date.parse(enrollment.since)>start)return reply({code:'unavailable'},404);
 const url=new URL(request.url);if(url.origin!==GOAL_PROPOSAL_ORIGIN||url.pathname!==GOAL_PROPOSAL_PATH||url.search||request.method!=='POST')return reply({code:'unavailable'},404);
 if(request.headers.has('origin')||request.headers.has('sec-fetch-site'))return reply({code:'service_request_required'},403);
 if(typeof limiter?.limit!=='function'||typeof reserveGeneration!=='function'||typeof generate!=='function'||!Number.isSafeInteger(bodyTimeoutMs)||bodyTimeoutMs<10||bodyTimeoutMs>3000)return reply({code:'unavailable'},503);
 let body;try{body=await boundedBody(request,bodyTimeoutMs);}catch(error){return reply({code:'invalid_request'},error.status||400);}
 let query;try{query=JSON.parse(body);}catch{return reply({code:'invalid_request'},400);}
 if(!validAssistanceGoalProposalQuery(query))return reply({code:'invalid_request'},400);
 const authenticate=()=>verifyAssistanceGoalProposalService({request,body,config:getSettings(),keySet,signingSecret,readSigningSecret,signalSecret,now:now()});
 const identity=await authenticate();if(!identity)return reply({code:'service_identity_required'},401);if(!open())return reply({code:'unavailable'},404);
 if(!(await limiter.limit({key:'afw-goal-proposal:'+identity.id})).success)return reply({code:'try_later'},429);if(!open())return reply({code:'unavailable'},404);
 const handler=createAssistanceGoalProposal({authenticate,isOpen:open,getWindowExpiresAt:()=>Date.parse(getSettings().expiresAt),now,
 resolveSource:async value=>{
 const db=sourceDb.withSession?sourceDb.withSession('first-primary'):sourceDb;
 const row=await db.prepare(`SELECT e.id AS sourceId,p.id AS projectId,p.user_id AS userId FROM site_projects p
 JOIN project_events e ON e.project_id=p.id AND e.user_id=p.user_id JOIN assistance_delivery_receipts d ON d.source_event_id=e.id
 WHERE p.id=? AND p.user_id=? AND e.type='assistance_requested' AND e.created_at>=? AND d.event_id=? AND d.project_ref=?`)
 .bind(enrollment.projectId,enrollment.userId,enrollment.since,value.eventId,value.projectRef).first();return row?{...row}:null;
 },
 readLease:value=>readActiveAssistanceGoalLease({...value,db:operationsDb}),
 readReceipt:value=>readCurrentAssistanceGoalReceipt({...value,db:sourceDb}),
 reserveProposal:value=>reserveAssistanceGoalProposal({...value,db:sourceDb}),
 completeProposal:value=>completeAssistanceGoalProposal({...value,db:sourceDb}),
 generate:async(input,options)=>{
 if(!open()||options.signal.aborted)throw Error('closed');
 const current=async()=>{
 const service=await authenticate();if(!service||service.id!==identity.id||!open()||options.signal.aborted)throw Error('identity changed');
 const opaque={eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:query.revision};
 const lease=await readActiveAssistanceGoalLease({...opaque,db:operationsDb,now:now()});
 const read=await readCurrentAssistanceGoalReceipt({db:sourceDb,projectId:enrollment.projectId,userId:enrollment.userId,receiptId:query.receiptId,query:opaque,now:now()});
 if(!lease||read.status!==200||read.receipt.expiresAt>lease.expiresAt||JSON.stringify(input)!==JSON.stringify({declarations:read.context.declarations,evidenceStatus:'owner_declared',operationsAuthorized:false})||!open()||options.signal.aborted)throw Error('permission changed');
 return{service,lease,read};
 };
 const before=JSON.stringify(await current());
 const budget=await reserveGeneration({projectId:enrollment.projectId,userId:enrollment.userId,eventId:query.eventId,runId:query.runId,receiptId:query.receiptId,revision:query.revision,purpose:initial.purpose,now:now()});
 if(!budget||Object.keys(budget).length!==1||budget.allowed!==true||!open()||options.signal.aborted)throw Error('budget unavailable');
 // Reserving budget is asynchronous too: it must not become an unchecked gap
 // between consent capture and sending the minimal declarations to a provider.
 if(before!==JSON.stringify(await current())||before!==JSON.stringify(await current()))throw Error('permission changed');
 return generate(input,options);
 },
 });
 const result=await handler(query,request);if(!open())return reply({code:'unavailable'},404);
 if(result.status===200)return reply({proposalId:result.proposalId,proposal:result.proposal},200);
 return reply(result.status===202?{code:result.code,expiresAt:result.expiresAt}:{code:result.code},result.status);
 }catch{return reply({code:'proposal_unavailable'},503);}
 };
}
