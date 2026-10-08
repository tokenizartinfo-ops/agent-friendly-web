import {exact,revision,timestamp,createOccurrenceApprovalCatalog} from './assistance-occurrence-approvals.mjs';
import {computeOccurrencePlanDigest} from './assistance-occurrence-digest.mjs';
import {createOccurrenceOperations} from './assistance-occurrence-operations.mjs';
import {verifyOperationsServiceIdentity,readOperationsServicePayload} from './operations-service-request-controls.mjs';
const ORIGIN='https://operations-manager.agentfriendlyweb.dev',HASH=/^[0-9a-f]{64}$/,UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const names=['mode','auth','principalRef','enrollments','serverConfigVersion','admissionRevision','serverDeadline','qaBindingRef'];
const routes=new Map(['create','list','admit-claim','claim','admit-finish','finish','stop'].map((p,i)=>['/assistance/occurrences/'+p,{phase:({'admit-claim':'admitClaim','admit-finish':'admitFinish'})[p]??p,sequence:i+1}]));
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const deny=()=>{throw Error('Occurrence service unavailable');};
function policy(value){
 if(!exact(value,names)||!['QA_OFF','QA_OCCURRENCE_EXCLUSIVE'].includes(value.mode)||!exact(value.auth,['enabled','origin','teamDomain','audience','clientId'])||typeof value.auth.enabled!=='boolean'||value.auth.origin!==ORIGIN||typeof value.auth.teamDomain!=='string'||!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(value.auth.teamDomain)||!['audience','clientId'].every(k=>typeof value.auth[k]==='string'&&value.auth[k].length>0&&value.auth[k].length<=(k==='audience'?512:200))||!['principalRef','serverConfigVersion','qaBindingRef'].every(k=>typeof value[k]==='string'&&HASH.test(value[k]))||!revision(value.admissionRevision)||!timestamp(value.serverDeadline)||!Array.isArray(value.enrollments)||value.enrollments.length<1||value.enrollments.length>3||value.enrollments.some(e=>!exact(e,['enrollmentRef','projectRef'])||!['enrollmentRef','projectRef'].every(k=>typeof e[k]==='string'&&HASH.test(e[k])))||new Set(value.enrollments.map(e=>e.enrollmentRef)).size!==value.enrollments.length||new Set(value.enrollments.map(e=>e.projectRef)).size!==value.enrollments.length)deny();
 return Object.freeze({...value,auth:Object.freeze({...value.auth}),enrollments:Object.freeze(value.enrollments.map(e=>Object.freeze({...e})))});
}
function configValues(p){return [p.mode,p.auth.enabled,p.auth.origin,p.auth.teamDomain,p.auth.audience,p.auth.clientId,p.principalRef,p.enrollments.map(e=>[e.enrollmentRef,e.projectRef]).sort((a,b)=>a[0].localeCompare(b[0])),p.admissionRevision,p.serverDeadline,p.qaBindingRef];}
/** Fingerprint of trusted own effective allowlisted config; not cloud/deployment attestation. */
export async function computeOccurrenceServerConfigVersion(value){const p=policy(value);return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(configValues(p))))),x=>x.toString(16).padStart(2,'0')).join('');}
/** Standalone only: never imported/mounted by a Worker. DB/policy/auth mappings are
 * trusted server dependencies. readPolicy is synchronous own-runtime state, never IO. Consumer cannot choose a plan/resource or approve it.
 */
export function createOccurrenceHttpAdapter({db,readPolicy,keySet,limiter,legacy}={}){
 function effective(){const value=readPolicy();if(value&&typeof value.then==='function'){if(typeof value.catch==='function')void value.catch(()=>{});deny();}return policy(value);}
 return async request=>{
  try{
   if(typeof readPolicy!=='function')return json({code:'service_unavailable'},503);
   const initial=effective(),url=new URL(request.url),route=routes.get(url.pathname);
   if(initial.mode==='QA_OFF')return url.pathname.startsWith('/assistance/occurrences')?json({code:'unavailable'},404):typeof legacy==='function'?legacy(request):json({code:'unavailable'},404);
   if(url.origin!==ORIGIN||url.search||!route||request.method!=='POST')return json({code:'unavailable'},404);
   if(request.headers.has('Origin')||request.headers.has('Sec-Fetch-Site'))return json({code:'service_request_required'},403);
   if(initial.auth.enabled!==true||initial.serverConfigVersion!==await computeOccurrenceServerConfigVersion(initial))return json({code:'service_unavailable'},503);
   if(!await verifyOperationsServiceIdentity(request,initial.auth,keySet))return json({code:'service_identity_required'},401);
   if(typeof limiter?.limit!=='function'||typeof db?.prepare!=='function')return json({code:'service_unavailable'},503);
   if(!(await limiter.limit({key:'afw-operations-consumer'})).success)return json({code:'try_later'},429);
   let body;try{body=await readOperationsServicePayload(request,1000);}catch(e){return json({code:'invalid_request'},e.status??400);}
   const keys=route.phase==='create'?['occurrenceId']:route.phase==='stop'?['occurrenceId','reason']:['occurrenceId','expectedSequence'];
   if(!exact(body,keys)||typeof body.occurrenceId!=='string'||!UUID.test(body.occurrenceId)||(route.phase==='stop'?!['operator_closed','window_expired','ambiguous_response'].includes(body.reason):route.phase!=='create'&&body.expectedSequence!==route.sequence-1))return json({code:'invalid_request'},400);
   const primary=db.withSession?db.withSession('first-primary'):db,catalog=createOccurrenceApprovalCatalog({db:primary});
   const found=await catalog.read(body.occurrenceId);if(!found)return json({code:'not_admitted'},409);
   const approved=found.approval,m=approved.manifest;
   const snapshot=JSON.stringify([...configValues(initial),initial.serverConfigVersion]);
   function matches(p){return p.mode==='QA_OCCURRENCE_EXCLUSIVE'&&p.auth.enabled===true&&JSON.stringify([...configValues(p),p.serverConfigVersion])===snapshot&&p.principalRef===approved.identityRef&&p.serverConfigVersion===approved.serverConfigVersion&&p.serverDeadline===m.serverDeadline&&p.enrollments.some(e=>e.enrollmentRef===approved.enrollmentRef&&e.projectRef===m.signal.projectRef);}
   let clock;
   async function checked(stop=false){
    const current=effective();if(!matches(current)||request.signal.aborted)deny();
    const plan=await catalog.read(m.occurrenceId);if(!plan||(!stop&&plan.revoked)||plan.approval.planRevision!==approved.planRevision)deny();
    if((await primary.prepare('SELECT version FROM assistance_occurrence_schema WHERE singleton=1').first())?.version!==2||(await primary.prepare('SELECT generation FROM assistance_occurrence_reservation_fence WHERE singleton=1').first())?.generation!==1)deny();
    // Recheck effective config after authority awaits, then sample the primary
    // SQL clock LAST. ready() uses this same sampled clock, not Date.now.
    const final=effective();if(!matches(final)||request.signal.aborted)deny();
    const row=await primary.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) AS time").first();
    if(!timestamp(row?.time)||clock!==undefined&&row.time<clock||request.signal.aborted||!matches(effective()))deny();clock=row.time;
    return {contractVersion:'afw-server-admission-v1',serverConfigVersion:current.serverConfigVersion,planRevision:approved.planRevision,admissionRevision:current.admissionRevision,observedAt:clock,identityRef:current.principalRef,enrollmentRef:approved.enrollmentRef,schemaVersion:2};
   }
   try{await checked(route.phase==='stop');}catch{return json({code:'not_admitted'},409);}
   const ops=createOccurrenceOperations({db:primary,manifest:m,identityRef:approved.identityRef,admissionContract:'server-v1',approval:approved,readServerAdmission:()=>checked(false),now:()=>clock,beforeCloseCommit:()=>!request.signal.aborted&&matches(effective())});
   let result,sequence=route.sequence;
   if(route.phase==='create')result=await ops.create()?'accepted':null;
   else if(route.phase==='list')result=await ops.list({expectedSequence:body.expectedSequence});
   else if(route.phase==='admitClaim'||route.phase==='admitFinish')result=await ops.admit({expectedSequence:body.expectedSequence,phase:route.phase==='admitClaim'?'claim':'finish'})?'accepted':null;
   else if(route.phase==='claim')result=await ops.claim({expectedSequence:body.expectedSequence});
   else if(route.phase==='finish')result=await ops.finish({expectedSequence:body.expectedSequence});
   else{if(await ops.close({reason:body.reason})){const row=await primary.prepare('SELECT sequence FROM assistance_occurrence_journal WHERE occurrence_id=? AND state=?').bind(m.occurrenceId,'stopped').first();sequence=row?.sequence;result='stopped';}}
   if(result===null||result===undefined||result===false)return json({code:'not_admitted'},409);
   if(route.phase==='list'&&(!Array.isArray(result)||result.length!==1))deny();
   const planDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approved.identityRef,admissionContract:'server-v1',approval:approved});
   const reply={version:'afw-occurrence-http-v1',occurrenceId:m.occurrenceId,phase:route.phase,sequence,planDigest,result};
   if(new TextEncoder().encode(JSON.stringify(reply)).byteLength>8192)deny();return json(reply);
  }catch{return json({code:'temporarily_unavailable'},503);}
 };
}
