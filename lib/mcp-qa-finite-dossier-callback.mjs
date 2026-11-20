import {operationsWindowOpen} from './operations-window.mjs';
import {enrolledDossierRefs,readBoundedDossierText} from './dossier-supervision-bridge.mjs';
import {recordDossierEvent,validateDossierSignal} from './dossier-supervision.mjs';
import {readFiniteDossierReviewPolicy,FINITE_DOSSIER_QA_ORIGIN} from './dossier-supervision-finite-review.mjs';
import {verifyMcpSignedEnvelope} from './mcp-signed-envelope.mjs';

export const FINITE_DOSSIER_CALLBACK_PATH='/mcp/finite-dossier-callback';
const reply=(body,status)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const unavailable=()=>reply({code:'unavailable'},404);
const exact=(value,keys)=>value&&Object.getPrototypeOf(value)===Object.prototype&&
 Object.keys(value).length===keys.length&&keys.every(k=>Object.hasOwn(value,k));

/** Admit only the original signed callback for the dedicated synthetic
 * occurrence. Verifying a challenge never inserts an event or a review. */
export async function receiveFiniteDossierCallback({request,env,now=Date.now}){
 const url=new URL(request.url);
 if(url.origin!==FINITE_DOSSIER_QA_ORIGIN||url.pathname!==FINITE_DOSSIER_CALLBACK_PATH||url.search)return unavailable();
 const db=env?.OPERATIONS_DB,secret=env?.AFW_DOSSIER_FINITE_CALLBACK_SECRET,policy=env?.AFW_DOSSIER_FINITE_REVIEW_POLICY;
 let scope;
 try{scope=readFiniteDossierReviewPolicy(env);}catch{return unavailable();}
 const enrolled=enrolledDossierRefs(env),expiry=env?.AFW_OPERATIONS_WINDOW_EXPIRES_AT;
 const open=at=>scope&&Number.isSafeInteger(at)&&scope.startAt<=at&&at<scope.reviewBefore&&operationsWindowOpen(env,at)&&
  env.AFW_DOSSIER_SUPERVISION_ENABLED==='true'&&env.AFW_DOSSIER_FINITE_REVIEW_ISOLATED==='true'&&
  env.AFW_DOSSIER_FINITE_REVIEW_ENABLED==='true'&&env.AFW_DOSSIER_FINITE_CALLBACK_ENABLED==='true'&&
  env.OPERATIONS_DB===db&&env.AFW_DOSSIER_FINITE_CALLBACK_SECRET===secret&&env.AFW_DOSSIER_FINITE_REVIEW_POLICY===policy&&
  env.AFW_OPERATIONS_WINDOW_EXPIRES_AT===expiry&&enrolled.length===1&&enrolled[0]===scope.projectRef&&
  enrolledDossierRefs(env).join()===scope.projectRef;
 if(!open(now())||typeof db?.withSession!=='function'||typeof secret!=='string')return unavailable();
 if(request.method!=='POST')return reply({code:'method'},405);
 if(request.headers.has('Origin')||request.headers.has('Sec-Fetch-Site'))return reply({code:'service_request_required'},403);
 if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply({code:'invalid_request'},415);
 const id=request.headers.get('webhook-id'),sub=request.headers.get('x-mcp-subscription-id'),
  timestamp=request.headers.get('webhook-timestamp'),signature=request.headers.get('webhook-signature');
 const signedAt=Number(timestamp)*1000;
 if(!/^sub_[a-f0-9]{64}$/.test(sub??'')||!Number.isSafeInteger(signedAt))return reply({code:'signature'},401);
 let body;
 try{body=await readBoundedDossierText(request,1024,1000);}catch{return reply({code:'invalid_request'},400);}
 const receivedAt=now();
 if(!open(receivedAt))return unavailable();
 if(signedAt+999<scope.startAt||signedAt>receivedAt+5000||receivedAt-signedAt>30000||
    !verifyMcpSignedEnvelope({body,id,subscriptionId:sub,timestamp,signature,secret}))return reply({code:'signature'},401);
 try{
  const value=JSON.parse(body);
  if(JSON.stringify(value)!==body)return reply({code:'invalid_request'},400);
  if(exact(value,['type','challenge'])&&value.type==='verification'){
   const challenge=value.challenge;
   if(!/^verify_[a-f0-9]{64}$/.test(id??'')||typeof challenge!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(challenge)||
      Buffer.from(challenge,'base64url').toString('base64url')!==challenge)return reply({code:'invalid_request'},400);
   return open(now())?reply({challenge},200):unavailable();
  }
  if(!exact(value,['eventId','name','timestamp','data','cursor'])||
     value.name!=='afw.dossier.changed'||value.cursor!==null||!exact(value.data,['projectRef','revision','kind']))return reply({code:'invalid_request'},400);
  const signal=validateDossierSignal({version:'afw-dossier-event-v1',eventId:value.eventId,observedAt:value.timestamp,...value.data});
  const observedAt=Date.parse(signal.observedAt);
  if(id!==scope.eventId||signal.eventId!==scope.eventId||signal.projectRef!==scope.projectRef||signal.revision!==scope.revision||
     signal.kind!=='project_updated'||observedAt<scope.startAt||observedAt>receivedAt||observedAt>signedAt+999)return reply({code:'outside_occurrence'},409);
  if(!open(now()))return unavailable();
  const result=await recordDossierEvent(db.withSession('first-primary'),signal,receivedAt,
   {deadline:Math.min(scope.reviewBefore,Date.parse(expiry))});
  return open(now())?reply(result,202):unavailable();
 }catch{return reply({code:'notice_unavailable'},503);}
}
