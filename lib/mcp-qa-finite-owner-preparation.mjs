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
const stageAdmissions=new WeakMap();
/** Consume-only native boundary. Durable records can never recreate this entry. */
export function consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId,stage},originalLease){
 const admitted=stageAdmissions.get(originalLease);stageAdmissions.delete(originalLease);
 current(originalLease);
 if(!admitted||admitted.ctx!==ctx||admitted.env!==env||admitted.preconnectionId!==preconnectionId||admitted.stage!==stage||ctx.storage!==admitted.storage||env.RELEASE_DB!==admitted.db||env.AFW_QA_VERSION?.id!==admitted.source.qaVersionId||ctx.id.toString()!==admitted.source.actorId)fail();
 current(admitted.proof);
 return Object.freeze({lease:admitted.proof,ownerSource:admitted.source,stageApprovalHash:admitted.stageApprovalHash});
}
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
 return Object.freeze({lease,finish(){stageAdmissions.delete(lease);closed=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);controller.abort();}});
}
async function child(lease,work){
 current(lease);
 const wall=Date.now(),mono=performance.now(),controller=new AbortController();
 let timer,abort,active=true,last=wall;
 // Each operation captures THIS guard. A later child cannot renew a callback
 // still waiting on storage, and abort never claims a committed write vanished.
 const invalidate=()=>{active=false;controller.abort();};
 const childLease=Object.freeze({signal:controller.signal,assertCurrent(){
  current(lease);const at=Date.now(),elapsed=performance.now()-mono;
  if(!active||controller.signal.aborted||at<last||at-wall>=5000||elapsed<0||elapsed>=5000)fail();
  last=at;
 }});
 const timeout=new Promise((_,reject)=>{
  timer=setTimeout(()=>{invalidate();reject(Error('Finite child deadline'));},5000);
  abort=()=>{invalidate();reject(Error('Finite parent deadline'));};
  lease.signal.addEventListener('abort',abort,{once:true});
 });
 try{const result=await Promise.race([Promise.resolve().then(()=>{current(childLease);return work(childLease);}),timeout]);current(childLease);return result;}
 finally{invalidate();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
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
 const db=env.RELEASE_DB,storage=ctx.storage,version=env.AFW_QA_VERSION?.id;
 const readSource=async(parent=lease)=>validateFiniteOwnerSource(await child(parent,childLease=>readPrivateQaFiniteOwnerSource({ctx,env,parent:childLease,preconnectionId})));
 const source=await readSource();
 let identity=null;
 // Narrow the SAME original parent with the SAME verified expiration; no new
 // request clock, identity refresh or wider lease. Storage receives this guard.
 const proofLease=Object.freeze({signal:lease.signal,assertCurrent(){
  current(lease);const at=Date.now();
  if(identity&&at>=identity.expiresAt)fail(401);
  if(at<source.window.startedAt||at>=source.window.expiresAt)fail();
 }});
 const check=async()=>{
  current(proofLease);if(env.RELEASE_DB!==db||ctx.storage!==storage||env.AFW_QA_VERSION?.id!==version||source.qaVersionId!==version||ctx.id.toString()!==source.actorId)fail();
  const at=Date.now();if(at<source.window.startedAt||at>=source.window.expiresAt)fail();
  if(canonical(await readSource(proofLease))!==canonical(source))fail();current(proofLease);
 };
 await check();
 const step=async fn=>{await check();const value=await child(proofLease,fn);await check();return value;};
 const primary=()=>{current(proofLease);return db.withSession('first-primary');};
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
 return {source,identity,store,step,check,primary,own,lease:proofLease};
}
const observed=result=>{if(result?.status!=='observed'||!result.record)fail();return result.record;};
async function durable(c,write,read,kind,value){
 const result=await c.step(write);if(!['recorded','existing'].includes(result?.status)||result.recordHash!==hash(kind,value))fail();
 const record=observed(await c.step(read));if(encode(kind,record)!==encode(kind,value))fail();return Object.freeze({record,mutation:result});
}
async function ticketContext(options,lease){
 const handle=prepCookie(options.request),ticketHash=sha(handle);
 // Factual private lookup chooses the exact source reference only. No mapped
 // owner or DTO is trusted; source and current Access are independently verified next.
 if(!options.ctx?.storage?.transaction)fail();
 const candidateStore=createFiniteOwnerPreparationStore({storage:options.ctx.storage,now:Date.now});
 const ticket=observed(await child(lease,childLease=>candidateStore.readTicket({ticketHash},childLease)));
 const c=await resolve({...options,preconnectionId:ticket.preconnectionId},lease);
 const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
 if(ticket.subjectHash!==subjectHash||ticket.sourceRevision!==c.source.sourceRevision||Date.now()<ticket.createdAt||Date.now()>=ticket.expiresAt)fail(403);
 const map=observed(await c.step(childLease=>c.store.readProjectRef({projectRef:ticket.projectRef},childLease)));
 const snapshot=observed(await c.step(childLease=>c.store.readOwnerSourceSnapshot({preconnectionId:ticket.preconnectionId},childLease)));
 if(map.preconnectionId!==ticket.preconnectionId||map.subjectHash!==subjectHash||map.sourceRevision!==ticket.sourceRevision||map.projectId!==c.source.project.projectId||map.revision!==c.source.project.revision||map.expiresAt<ticket.expiresAt||snapshot.preconnectionId!==ticket.preconnectionId)fail(403);
 const stable=Object.fromEntries(Object.entries(c.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
 const initialStable=Object.fromEntries(Object.entries(snapshot.source).filter(([k])=>!['phase','currentPublication'].includes(k)));
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
  if(typeof env.AFW_QA_OCCURRENCE_RATE_LIMITER?.limit!=='function')fail();
  const limited=await c.step(()=>env.AFW_QA_OCCURRENCE_RATE_LIMITER.limit({key:'finite-owner:'+sha(c.identity.subject)}));if(limited?.success!==true)fail(limited?.success===false?429:503);
  const at=Date.now(),expiresAt=Math.min(c.source.window.expiresAt,c.identity.expiresAt),handle=opaque(),ticketHash=sha(handle),preconnectionId=opaque(),projectRef=opaque();
  const realm=evidence('realm',{...c.source.access,origin:c.source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:c.identity.subject});
  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.source.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt};
  const map={projectRef,preconnectionId,subjectHash,sourceRevision:c.source.sourceRevision,projectId:c.source.project.projectId,revision:c.source.project.revision,issuedAt:at,expiresAt};
  const snapshot=seals('OwnerSourceSnapshot',{preconnectionId,initialTicketHash:ticketHash,source:c.source},'sourceHash');
  await durable(c,childLease=>c.store.putOwnerSourceSnapshot(snapshot,childLease),childLease=>c.store.readOwnerSourceSnapshot({preconnectionId},childLease),'OwnerSourceSnapshot',snapshot);
  await durable(c,childLease=>c.store.putProjectRef(map,childLease),childLease=>c.store.readProjectRef({projectRef},childLease),'ProjectRef',map);
  await durable(c,childLease=>c.store.putTicket(ticket,childLease),childLease=>c.store.readTicket({ticketHash},childLease),'Ticket',ticket);
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
 const used=await c.step(childLease=>c.store.consumeTicket({ticketHash:c.ticket.ticketHash,recordHash:csrfReceiptHash},childLease));
 if(used?.status!=='recorded')fail();
 const use=observed(await c.step(childLease=>c.store.readTicketUse({ticketHash:c.ticket.ticketHash},childLease)));
 if(use.recordHash!==csrfReceiptHash||used.recordHash!==hash('TicketUse',use))fail();
 const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectHash:projectHash(c.source.project),clientId:c.source.clientId,approvedAt,expiresAt,csrfReceiptHash},approvalHash=hash('ConfigurationApproval',approval);
 await durable(c,childLease=>c.store.putConfigurationApproval(approval,childLease),childLease=>c.store.readConfigurationApproval({approvalHash},childLease),'ConfigurationApproval',approval);
 const pre=seals('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:c.ticket.preconnectionId,sourceRevision:c.source.sourceRevision,actorId:c.source.actorId,owner:{subject:c.identity.subject,accessRealmHash:c.realm,accessVerifiedAt:approvedAt,accessExpiresAt:c.identity.expiresAt},project:c.source.project,clientId:c.source.clientId,resource:c.source.resource,startedAt:approvedAt,expiresAt,approvalHash,baselineHash:evidence('baseline',c.source.initialBaseline)},'recordHash');
 await durable(c,childLease=>c.store.putPreconnection(pre,childLease),childLease=>c.store.readPreconnection({preconnectionId:pre.preconnectionId},childLease),'Preconnection',pre);
 const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:pre.preconnectionId,sourceRevision:pre.sourceRevision,stage:'connection',ticketHash:c.ticket.ticketHash,approvalHash};
 await durable(c,childLease=>c.store.putStageApproval(stageApproval,childLease),childLease=>c.store.readStageApproval({preconnectionId:pre.preconnectionId,stage:'connection'},childLease),'StageApproval',stageApproval);
 await c.check();current(lease);current(c.lease);
 stageAdmissions.set(lease,Object.freeze({ctx,env,storage:ctx.storage,db:env.RELEASE_DB,preconnectionId:pre.preconnectionId,stage:'connection',source:c.source,proof:c.lease,stageApprovalHash:hash('StageApproval',stageApproval)}));
 return {status:202,preconnectionId:pre.preconnectionId,stage:'connection'};
}

async function approved(options,lease,phase){
 const c=await ticketContext(options,lease);if(c.source.phase!==phase)fail();
 const id=c.ticket.preconnectionId;
 const pre=observed(await c.step(childLease=>c.store.readPreconnection({preconnectionId:id},childLease)));
 const approval=observed(await c.step(childLease=>c.store.readConfigurationApproval({approvalHash:pre.approvalHash},childLease)));
 const ticket=observed(await c.step(childLease=>c.store.readTicket({ticketHash:c.snapshot.initialTicketHash},childLease)));
 const use=observed(await c.step(childLease=>c.store.readTicketUse({ticketHash:c.snapshot.initialTicketHash},childLease)));
 const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(c.source.project),goal:c.source.goal,clientId:c.source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
 if(ticket.preconnectionId!==id||ticket.projectRef!==c.ticket.projectRef||ticket.subjectHash!==c.subjectHash||use.recordHash!==decision||approval.csrfReceiptHash!==decision||hash('ConfigurationApproval',approval)!==pre.approvalHash||approval.subjectHash!==c.subjectHash||approval.sourceRevision!==c.source.sourceRevision||approval.projectHash!==projectHash(c.source.project)||approval.clientId!==c.source.clientId||pre.owner.subject!==c.identity.subject||pre.owner.accessRealmHash!==c.realm||pre.sourceRevision!==c.source.sourceRevision||pre.actorId!==c.source.actorId||pre.clientId!==c.source.clientId||pre.resource!==c.source.resource||projectHash(pre.project)!==projectHash(c.source.project)||pre.baselineHash!==evidence('baseline',c.snapshot.source.initialBaseline)||Date.now()>=Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail(403);
 return {...c,pre,approval};
}
function scopes(value){
 let result;try{result=JSON.parse(value);}catch{fail();}
 if(!Array.isArray(result)||result.length<1||result.length>2||new Set(result).size!==result.length||!result.includes('afw:project:read')||result.some(x=>!['afw:project:read','afw:evidence:read'].includes(x)))fail();
 return result;
}
const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
async function consent(c,authorizationHash,consumed){
 if(!hex(authorizationHash))fail();
 const row=await c.step(()=>c.primary().prepare('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=? AND user_id=? AND kind=?').bind(authorizationHash,c.identity.subject,'authorize').first());
 if(!row||row.handle_hash!==authorizationHash||row.project_id!==c.source.project.projectId||row.client_id!==c.source.clientId||row.resource!==c.source.resource||!iso(row.expires_at)||Date.parse(row.expires_at)<=Date.now())fail();
 const requested=scopes(row.scopes_json);
 if(consumed?(!iso(row.consumed_at)||Date.parse(row.consumed_at)>Date.now()):row.consumed_at!=='')fail();
 return {handle_hash:row.handle_hash,user_id:row.user_id,kind:row.kind,project_id:row.project_id,client_id:row.client_id,resource:row.resource,scopes:requested,expires_at:row.expires_at,consumed_at:row.consumed_at};
}
async function exactGrant(c,grantId,requested){
 if(typeof grantId!=='string'||!grantId||grantId.length>200)fail();
 const grant=await c.step(()=>createDelegatedOAuthStore(c.primary()).getGrant(grantId));
 if(!grant||grant.grantId!==grantId||grant.subject!==c.identity.subject||grant.projectId!==c.source.project.projectId||grant.clientId!==c.source.clientId||grant.resource!==c.source.resource||grant.status!=='active'||grant.revokedAt||!iso(grant.createdAt)||!iso(grant.expiresAt)||Date.parse(grant.createdAt)>Date.now()||Date.parse(grant.expiresAt)<=Date.now()||Date.parse(grant.expiresAt)>c.pre.expiresAt)fail(403);
 const approvedScopes=scopes(JSON.stringify(grant.scopes));
 if(requested&&approvedScopes.some(x=>!requested.includes(x)))fail(403);
 await c.own(c.identity.subject);return grant;
}
async function authorization(c,authorizationHash){
 const link=observed(await c.step(childLease=>c.store.readAuthorizationLink({authorizationHash},childLease)));
 if(link.preconnectionId!==c.pre.preconnectionId||link.subjectHash!==c.subjectHash||link.sourceRevision!==c.source.sourceRevision||link.projectRef!==c.ticket.projectRef||link.clientId!==c.source.clientId||link.resource!==c.source.resource||Date.now()>=link.expiresAt)fail();
 return link;
}
export async function recordFinitePreparationAuthorization({ctx,env,request,authorizationHash},lease){
 current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
 const url=new URL(request.url);if(url.pathname!=='/authorize')fail();
 if(request.method==='GET'){
  if(url.searchParams.getAll('client_id').length!==1||url.searchParams.get('client_id')!==c.source.clientId||url.searchParams.getAll('resource').length!==1||url.searchParams.get('resource')!==c.source.resource)fail();
 }else if(request.method==='POST'){
  if(url.search||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
  const form=await body(request,lease);if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||sha(form.get('handle')??'')!==authorizationHash)fail();
 }else fail();
 const row=await consent(c,authorizationHash,false),old=await c.step(childLease=>c.store.readAuthorizationLink({authorizationHash},childLease));
 const record={preconnectionId:c.pre.preconnectionId,authorizationHash,subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectRef:c.ticket.projectRef,clientId:c.source.clientId,resource:c.source.resource,issuedAt:old.record?.issuedAt??Date.now(),expiresAt:Math.min(c.pre.expiresAt,Date.parse(row.expires_at))};
 await durable(c,childLease=>c.store.putAuthorizationLink(record,childLease),childLease=>c.store.readAuthorizationLink({authorizationHash},childLease),'AuthorizationLink',record);
 return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('AuthorizationLink',record)});
}
export async function recordFinitePreparationGrant({ctx,env,request,grantId},lease){
 current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
 if(request.method!=='POST'||new URL(request.url).pathname!=='/authorize'||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
 const form=await body(request,lease);
 if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.get('handle'))fail();
 const authorizationHash=sha(form.get('handle'));await authorization(c,authorizationHash);
 const row=await consent(c,authorizationHash,true),grant=await exactGrant(c,grantId,row.scopes),approvedScopes=form.getAll('scope');
 if(canonical(approvedScopes)!==canonical(grant.scopes)||Date.parse(grant.createdAt)<Date.parse(row.consumed_at)||form.has('project')&&(form.getAll('project').length!==1||form.get('project')!==c.source.project.projectId))fail();
 const preconnectionId=c.pre.preconnectionId,old=await c.step(childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease));
 const record={preconnectionId,authorizationHash,grantId,grantHash:sha(grantId),acceptedAt:old.record?.acceptedAt??Date.now()};
 const linked=await durable(c,childLease=>c.store.putLink({kind:'grant',record},childLease),childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease),'GrantLink',record);
 const existing=await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId},childLease));
 if(existing.status==='absent'){
  // An existing link without the pair may represent a lost earlier outcome.
  // Only this invocation's genuinely new link ACK permits the first allocation.
  if(linked.mutation.status!=='recorded')return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
  const connectionRef=opaque(),linkedAt=Date.now(),relation={preconnectionId,connectionRef,grantHash:record.grantHash,linkedAt};
  const connection={connectionRef,subject:c.identity.subject,grantId:grant.grantId,clientId:c.source.clientId,projectId:c.source.project.projectId,resource:c.source.resource,issuedAt:linkedAt,expiresAt:Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,c.identity.expiresAt,Date.parse(grant.expiresAt))};
  const paired=await c.step(childLease=>c.store.putPreconnectionConnection({relation,connection},childLease));
  if(!['recorded','existing'].includes(paired?.status)||paired.recordHash!==hash('PreconnectionConnection',relation))return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
 }
 await connectionPair(c,record,grant);
 return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('GrantLink',record)});
}

async function connectionPair(c,link,grant){
 const relation=observed(await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId:c.pre.preconnectionId},childLease)));
 const connection=observed(await c.step(childLease=>c.store.readConnectionRef({connectionRef:relation.connectionRef},childLease)));
 if(relation.preconnectionId!==c.pre.preconnectionId||relation.grantHash!==sha(grant.grantId)||relation.grantHash!==link.grantHash||relation.linkedAt<link.acceptedAt||relation.linkedAt>Date.now()||connection.connectionRef!==relation.connectionRef||connection.issuedAt!==relation.linkedAt||connection.subject!==c.identity.subject||connection.grantId!==grant.grantId||connection.clientId!==c.source.clientId||connection.projectId!==c.source.project.projectId||connection.resource!==c.source.resource||connection.expiresAt>Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,Date.parse(grant.expiresAt))||Date.now()>=connection.expiresAt)fail();
 return {relation,connection};
}

async function eventRow(c,{requestId,sequence,grantId}){
 const row=await c.step(()=>c.primary().prepare("SELECT c.* FROM dossier_monitoring_consent_events c WHERE c.request_id=? AND c.sequence=? AND c.grant_id=? AND c.user_id=? AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events r WHERE r.grant_id=c.grant_id AND r.action='revoke')").bind(requestId,sequence,grantId,c.identity.subject).first());
 if(!row)fail(403);
 const event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at};
 evidence('event',event);
 if(event.projectId!==c.source.project.projectId||event.subject!==c.identity.subject||event.clientId!==c.source.clientId||event.resource!==c.source.resource||event.revision!==c.source.project.revision||event.issuedAt>Date.now()||event.expiresAt<=Date.now()||event.expiresAt>c.pre.expiresAt)fail(403);
 return event;
}
export async function recordFinitePreparationNotice({ctx,env,request,requestId,sequence},lease){
 current(lease);const c=await approved({ctx,env,request},lease,'notice_consent'),url=new URL(request.url);
 if(request.method!=='POST'||url.pathname!=='/monitoring/grant'||url.search||request.headers.get('Content-Type')!=='application/x-www-form-urlencoded')fail();
 const form=await body(request,lease,1024),handle=form.get('handle');
 if([...form.keys()].length!==1||!handle||!/^[A-Za-z0-9_-]{43}$/.test(handle))fail();
 const cookies=(request.headers.get('Cookie')??'').split(';').map(x=>x.trim()).filter(x=>x.startsWith('__Host-afw-monitoring-owner='));
 if(cookies.length!==1||cookies[0]!=='__Host-afw-monitoring-owner='+handle)fail(403);
 const preconnectionId=c.pre.preconnectionId,grantLink=observed(await c.step(childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease)));
 await authorization(c,grantLink.authorizationHash);const row=await consent(c,grantLink.authorizationHash,true),grant=await exactGrant(c,grantLink.grantId,row.scopes);
 if(grantLink.grantHash!==sha(grant.grantId))fail();
 await connectionPair(c,grantLink,grant);
 const ticket=await c.step(()=>c.primary().prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE handle_hash=? AND request_id=?').bind(sha(handle),requestId).first());
 if(!ticket||ticket.user_id!==c.identity.subject||ticket.grant_id!==grant.grantId||ticket.project_id!==c.source.project.projectId||ticket.client_id!==c.source.clientId||ticket.resource!==c.source.resource||ticket.purpose!=='afw.dossier-monitoring-owner.v1'||ticket.action!=='grant'||ticket.revision!==c.source.project.revision||ticket.issued_at>Date.now()||ticket.expires_at<=Date.now())fail(403);
 const event=await eventRow(c,{requestId,sequence,grantId:grant.grantId});
 if(ticket.permission_expires_at!==event.expiresAt||ticket.expected_sequence>=event.sequence||event.expiresAt>Date.parse(grant.expiresAt))fail();
 const old=await c.step(childLease=>c.store.readLink({kind:'notice',preconnectionId},childLease)),record={preconnectionId,grantHash:grantLink.grantHash,eventHash:evidence('event',event),sequence,acceptedAt:old.record?.acceptedAt??Date.now()};
 await durable(c,childLease=>c.store.putLink({kind:'notice',record},childLease),childLease=>c.store.readLink({kind:'notice',preconnectionId},childLease),'NoticeLink',record);
 return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('NoticeLink',record)});
}

export async function readFiniteOwnerPreparation({ctx,env,sourceRevision,intentId,signal}){
 if(typeof sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(sourceRevision)||!(signal instanceof AbortSignal)||!ctx?.storage?.transaction)fail();
 const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal})),lease=parent.lease;
 try{
  const store=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now});
  const selected=await child(lease,childLease=>store.readSelected({sourceRevision},childLease));
  if(!selected)fail();
  const p=selected.preparation,id=p.prepId,c=await resolve({ctx,env,preconnectionId:id},lease);
  if(c.source.phase!=='finite_prearm'||c.source.sourceRevision!==sourceRevision||p.actorId!==c.source.actorId||Date.now()>=p.commandBy)fail();
  if(intentId!==undefined&&(!selected.binding||selected.binding.intentId!==intentId||selected.binding.prepId!==id||selected.binding.preparationHash!==p.preparationHash||selected.binding.selectionHash!==selected.selection.selectionHash))fail();
  const pre=observed(await c.step(childLease=>store.readPreconnection({preconnectionId:id},childLease)));
  const snapshot=observed(await c.step(childLease=>store.readOwnerSourceSnapshot({preconnectionId:id},childLease)));
  const stable=v=>Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k)));
  if(canonical(stable(c.source))!==canonical(stable(snapshot.source))||pre.preconnectionId!==id||pre.sourceRevision!==sourceRevision||p.sourceRevision!==sourceRevision||pre.actorId!==p.actorId||projectHash(pre.project)!==projectHash(p.project)||projectHash(p.project)!==projectHash(c.source.project)||p.goal!==c.source.goal||canonical(p.programContext)!==canonical(c.source.programContext)||canonical(p.owner)!==canonical(pre.owner)||pre.baselineHash!==evidence('baseline',snapshot.source.initialBaseline))fail();
  const realm=evidence('realm',{...c.source.access,origin:c.source.origin});
  if(pre.owner.accessRealmHash!==realm||Date.now()>=pre.owner.accessExpiresAt)fail();
  // Stored proof is usable only inside this fixed, freshly qualified native source.
  // It is not a fresh JWT or a browser identity DTO; original expiry never renews.
  c.identity={subject:pre.owner.subject,expiresAt:pre.owner.accessExpiresAt};c.pre=pre;
  await c.own(pre.owner.subject);
  const approval=observed(await c.step(childLease=>store.readConfigurationApproval({approvalHash:pre.approvalHash},childLease)));
  const ticket=observed(await c.step(childLease=>store.readTicket({ticketHash:snapshot.initialTicketHash},childLease)));
  const use=observed(await c.step(childLease=>store.readTicketUse({ticketHash:snapshot.initialTicketHash},childLease)));
  const subjectHash=evidence('subject',{accessRealmHash:realm,subject:pre.owner.subject}),decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(p.project),goal:p.goal,clientId:c.source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
  c.subjectHash=subjectHash;c.ticket=ticket;
  if(ticket.preconnectionId!==id||ticket.subjectHash!==subjectHash||ticket.sourceRevision!==sourceRevision||approval.subjectHash!==subjectHash||approval.sourceRevision!==sourceRevision||approval.projectHash!==projectHash(p.project)||approval.clientId!==c.source.clientId||hash('ConfigurationApproval',approval)!==pre.approvalHash||use.recordHash!==decision||approval.csrfReceiptHash!==decision||p.approval.csrfReceiptHash!==decision||p.approval.approvedAt!==approval.approvedAt||p.approval.expiresAt!==approval.expiresAt)fail();
  const link=observed(await c.step(childLease=>store.readLink({kind:'grant',preconnectionId:id},childLease)));
  const notice=observed(await c.step(childLease=>store.readLink({kind:'notice',preconnectionId:id},childLease)));
  await authorization(c,link.authorizationHash);
  const consentRow=await consent(c,link.authorizationHash,true),grant=await exactGrant(c,link.grantId,consentRow.scopes);
  if(link.grantHash!==sha(grant.grantId)||p.connection.grantId!==grant.grantId||p.connection.grantHash!==link.grantHash||p.connection.clientId!==c.source.clientId||p.connection.resource!==c.source.resource||p.connection.consentHash!==evidence('consent',consentRow)||notice.grantHash!==link.grantHash||notice.eventHash!==p.connection.noticesHash)fail();
  const eventIdentity=await c.step(()=>c.primary().prepare('SELECT request_id FROM dossier_monitoring_consent_events WHERE sequence=? AND grant_id=? AND user_id=?').bind(notice.sequence,grant.grantId,pre.owner.subject).first());
  if(!eventIdentity)fail();
  const event=await eventRow(c,{requestId:eventIdentity.request_id,sequence:notice.sequence,grantId:grant.grantId});
  if(evidence('event',event)!==notice.eventHash)fail();
  const {connection}=await connectionPair(c,link,grant);
  if(connection.connectionRef!==p.connection.connectionRef)fail();
  const permissionExpiry=Math.min(Date.parse(grant.expiresAt),event.expiresAt);
  if(connection.subject!==pre.owner.subject||connection.grantId!==grant.grantId||connection.clientId!==c.source.clientId||connection.projectId!==p.project.projectId||connection.resource!==c.source.resource||connection.issuedAt<link.acceptedAt||connection.expiresAt>Math.min(Date.parse(grant.expiresAt),pre.expiresAt,pre.owner.accessExpiresAt)||Date.now()>=connection.expiresAt||p.connection.permissionExpiresAt!==permissionExpiry||p.expiresAt!==pre.expiresAt||p.commandBy!==Math.min(permissionExpiry,pre.owner.accessExpiresAt,approval.expiresAt,c.source.window.expiresAt,pre.expiresAt)-510000)fail();
  const final=await c.step(childLease=>store.readSelected({sourceRevision},childLease));
  if(canonical(final)!==canonical(selected))fail();
  return final;
 }finally{parent.finish();}
}


