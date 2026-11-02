import {createHash,randomBytes} from 'node:crypto';
import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {validateFiniteOwnerSource,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode} from './mcp-qa-finite-preparation-records.mjs';
import {readPrivateQaFiniteOwnerSource} from './mcp-qa-finite-owner-source.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const opaque=()=>randomBytes(32).toString('hex');
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const cookieName='__Host-afw-finite-prepare';
const canonical=v=>JSON.stringify(v);
const fail=(status=503)=>{const e=Error('Finite owner preparation unavailable');e.status=status;throw e;};
const current=lease=>{if(!lease||lease.signal?.aborted||typeof lease.assertCurrent!=='function')fail();lease.assertCurrent();};
const seals=(kind,v,key)=>({...v,[key]:hash(kind,v)});
/** Starts at the actual request entry, before any source/identity/SDK/storage IO. */
export function createFiniteOwnerRequestLease(request){
 const wall=Date.now(),mono=performance.now(),controller=new AbortController();
 let last=wall,closed=false;
 const abort=()=>controller.abort();
 request.signal.addEventListener('abort',abort,{once:true});
 if(request.signal.aborted)abort();
 const timer=setTimeout(abort,30000);
 const lease=Object.freeze({signal:controller.signal,assertCurrent(){
  const at=Date.now(),elapsed=performance.now()-mono;
  if(closed||controller.signal.aborted||at<last||at-wall>=30000||elapsed<0||elapsed>=30000)fail();last=at;
 }});
 return Object.freeze({lease,finish(){closed=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);controller.abort();}});
}
async function child(lease,work){
 current(lease);let timer,abort;
 const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Finite child deadline')),5000);abort=()=>reject(Error('Finite parent deadline'));lease.signal.addEventListener('abort',abort,{once:true});});
 try{const result=await Promise.race([Promise.resolve().then(()=>{current(lease);return work();}),timeout]);current(lease);return result;}
 finally{clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
}
async function body(request,lease,max=16384){
 const reader=request.body?.getReader();if(!reader)fail(400);const chunks=[];let length=0;
 try{for(;;){const {done,value}=await child(lease,()=>reader.read());if(done)break;length+=value.length;if(length>max)fail(400);chunks.push(value);}}
 catch(e){void reader.cancel().catch(()=>{});throw e;}
 const bytes=new Uint8Array(length);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}
 try{return new URLSearchParams(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{fail(400);}
}
function prepCookie(request){
 const values=(request.headers.get('Cookie')??'').split(';').map(x=>x.trim()).filter(x=>x.startsWith(cookieName+'='));
 if(values.length!==1)fail(403);const handle=values[0].slice(cookieName.length+1);if(!hex(handle))fail(403);return handle;
}
async function resolve({ctx,env,request,preconnectionId=null},lease){
 current(lease);
 if(!ctx?.storage?.transaction||!ctx?.id||typeof env?.RELEASE_DB?.withSession!=='function'||env.RELEASE_DB===env.DB)fail();
 const db=env.RELEASE_DB,storage=ctx.storage,version=env.QA_VERSION?.id;
 const readSource=async()=>validateFiniteOwnerSource(await child(lease,()=>readPrivateQaFiniteOwnerSource({ctx,env,parent:lease,preconnectionId})));
 const source=await readSource();
 const check=async()=>{
  current(lease);if(env.RELEASE_DB!==db||ctx.storage!==storage||env.QA_VERSION?.id!==version||source.qaVersionId!==version||ctx.id.toString()!==source.actorId)fail();
  const at=Date.now();if(at<source.window.startedAt||at>=source.window.expiresAt)fail();
  if(canonical(await readSource())!==canonical(source))fail();current(lease);
 };
 await check();
 const step=async fn=>{await check();const value=await child(lease,fn);await check();return value;};
 const primary=()=>{current(lease);return db.withSession('first-primary');};
 let identity=null;
 if(request){
  const url=new URL(request.url);if(url.origin!==source.origin||url.hash)fail(404);
  if(request.method==='POST'&&request.headers.get('Origin')!==source.origin)fail(403);
  const auth=await step(()=>verifyCloudflareAccessJwtWithExpiry({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
  if(!auth.ok||auth.identity.expiresAt<=Date.now())fail(401);identity=auth.identity;
 }
 const store=createFiniteOwnerPreparationStore({storage,now:Date.now});
 const own=async subject=>{
  const row=await step(()=>createDelegatedProjectRepository({db:primary(),grantStore:createDelegatedOAuthStore(primary())}).getOwnedProject(source.project.projectId,subject));
  if(!row||row.userId!==subject||row.id!==source.project.projectId||row.revision!==source.project.revision)fail(403);return row;
 };
 if(identity)await own(identity.subject);
 return {source,identity,store,step,check,primary,own,lease};
}
const observed=result=>{if(result?.status!=='observed'||!result.record)fail();return result.record;};
async function durable(c,write,read,kind,value){
 const result=await c.step(write);if(!['recorded','existing'].includes(result?.status)||result.recordHash!==hash(kind,value))fail();
 const record=observed(await c.step(read));if(encode(kind,record)!==encode(kind,value))fail();return record;
}
async function ticketContext(options,lease){
 const handle=prepCookie(options.request),ticketHash=sha(handle);
 let c=await resolve(options,lease);
 const ticket=observed(await c.step(()=>c.store.readTicket({ticketHash},lease)));
 c=await resolve({...options,preconnectionId:ticket.preconnectionId},lease);
 const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
 if(ticket.subjectHash!==subjectHash||ticket.sourceRevision!==c.source.sourceRevision||Date.now()<ticket.createdAt||Date.now()>=ticket.expiresAt)fail(403);
 const map=observed(await c.step(()=>c.store.readProjectRef({projectRef:ticket.projectRef},lease)));
 const snapshot=observed(await c.step(()=>c.store.readOwnerSourceSnapshot({preconnectionId:ticket.preconnectionId},lease)));
 if(map.preconnectionId!==ticket.preconnectionId||map.subjectHash!==subjectHash||map.sourceRevision!==ticket.sourceRevision||map.projectId!==c.source.project.projectId||map.revision!==c.source.project.revision||map.expiresAt<ticket.expiresAt||snapshot.preconnectionId!==ticket.preconnectionId)fail(403);
 const {phase:_phase,currentPublication:_publication,...stable}=c.source;
 const {phase:_initialPhase,currentPublication:_initialPublication,...initialStable}=snapshot.source;
 if(canonical(stable)!==canonical(initialStable))fail(403);
 return {...c,handle,ticket,map,snapshot,realm,subjectHash};
}
/** Actual QA request producer; missing Task3 publication remains explicitly pending. */
export async function prepareFiniteOwnerChoice({ctx,env,request},lease){
 const url=new URL(request.url);
 if(url.pathname!=='/connections/finite-prepare'||url.search||url.hash)fail(404);
 if(!['GET','POST'].includes(request.method))fail(405);
 if(request.method==='GET'){
  const c=await resolve({ctx,env,request},lease);if(c.source.phase!=='closed_ui')fail();
  if(typeof env.DELEGATED_RATE_LIMITER?.limit!=='function')fail();
  const limited=await c.step(()=>env.DELEGATED_RATE_LIMITER.limit({key:'finite-owner:'+sha(c.identity.subject)}));if(limited?.success!==true)fail(limited?.success===false?429:503);
  const at=Date.now(),expiresAt=Math.min(c.source.window.expiresAt,c.identity.expiresAt),handle=opaque(),ticketHash=sha(handle),preconnectionId=opaque(),projectRef=opaque();
  const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.source.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt};
  const map={projectRef,preconnectionId,subjectHash,sourceRevision:c.source.sourceRevision,projectId:c.source.project.projectId,revision:c.source.project.revision,issuedAt:at,expiresAt};
  const snapshot=seals('OwnerSourceSnapshot',{preconnectionId,initialTicketHash:ticketHash,source:c.source},'sourceHash');
  await durable(c,()=>c.store.putOwnerSourceSnapshot(snapshot,lease),()=>c.store.readOwnerSourceSnapshot({preconnectionId},lease),'OwnerSourceSnapshot',snapshot);
  await durable(c,()=>c.store.putProjectRef(map,lease),()=>c.store.readProjectRef({projectRef},lease),'ProjectRef',map);
  await durable(c,()=>c.store.putTicket(ticket,lease),()=>c.store.readTicket({ticketHash},lease),'Ticket',ticket);
  await c.own(c.identity.subject);await c.check();
  return {status:200,handle,projectRef,goal:c.source.goal,expiresAt};
 }
 if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail(400);
 const form=await body(request,lease,1024),keys=[...form.keys()];
 if(keys.length!==3||!['handle','projectRef','decision'].every(k=>form.getAll(k).length===1)||!hex(form.get('handle'))||!hex(form.get('projectRef'))||form.get('decision')!=='approve')fail(400);
 if(prepCookie(request)!==form.get('handle'))fail(403);
 const c=await ticketContext({ctx,env,request},lease);
 if(c.source.phase!=='closed_ui'||canonical(c.source)!==canonical(c.snapshot.source)||c.snapshot.initialTicketHash!==c.ticket.ticketHash||c.ticket.action!=='connection'||c.ticket.projectRef!==form.get('projectRef'))fail(403);
 const approvedAt=Date.now(),expiresAt=Math.min(c.ticket.expiresAt,c.identity.expiresAt);
 const csrfReceiptHash=evidence('decision',{ticket:c.ticket,decision:'approve',projectHash:projectHash(c.source.project),goal:c.source.goal,clientId:c.source.clientId,approvedAt,expiresAt});
 const used=await c.step(()=>c.store.consumeTicket({ticketHash:c.ticket.ticketHash,recordHash:csrfReceiptHash},lease));
 if(!['recorded','existing'].includes(used?.status))fail();
 const use=observed(await c.step(()=>c.store.readTicketUse({ticketHash:c.ticket.ticketHash},lease)));
 if(use.recordHash!==csrfReceiptHash||used.recordHash!==hash('TicketUse',use))fail();
 const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectHash:projectHash(c.source.project),clientId:c.source.clientId,approvedAt,expiresAt,csrfReceiptHash},approvalHash=hash('ConfigurationApproval',approval);
 await durable(c,()=>c.store.putConfigurationApproval(approval,lease),()=>c.store.readConfigurationApproval({approvalHash},lease),'ConfigurationApproval',approval);
 const pre=seals('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:c.ticket.preconnectionId,sourceRevision:c.source.sourceRevision,actorId:c.source.actorId,owner:{subject:c.identity.subject,accessRealmHash:c.realm,accessVerifiedAt:approvedAt,accessExpiresAt:c.identity.expiresAt},project:c.source.project,clientId:c.source.clientId,resource:c.source.resource,startedAt:approvedAt,expiresAt,approvalHash,baselineHash:evidence('baseline',c.source.initialBaseline)},'recordHash');
 await durable(c,()=>c.store.putPreconnection(pre,lease),()=>c.store.readPreconnection({preconnectionId:pre.preconnectionId},lease),'Preconnection',pre);
 return {status:202};
}
const unavailable=()=>{throw Error('Finite owner preparation unavailable');};
export const readFiniteOwnerPreparation=unavailable;
export const recordFinitePreparationGrant=unavailable;
export const recordFinitePreparationNotice=unavailable;
export const recordFinitePreparationAuthorization=unavailable;
