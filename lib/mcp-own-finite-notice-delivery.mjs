import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {finiteControlIdentity,finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

const QA='afw-own-successor-closure-v1',NODE='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Finite canary notice unavailable');};
const sha=value=>createHash('sha256').update(value).digest('hex');

/** Private canary entry for the event already saved by the acknowledged QA child. */
export async function runFiniteOwnTrialNotice({ctx,env,program,sourceRevision,refs,deliver,now=Date.now}={}){
 if(!hex(sourceRevision,40)||typeof program!=='string'||!program||typeof deliver!=='function')fail();
 const x=fields(refs,['intentId','controlHash']);
 if(typeof x.intentId!=='string'||!hex(x.controlHash))fail();
 const qa=env.AFW_FINITE_TRIAL_CONTROL,node=env.AFW_DOSSIER_EVENTS_NODE,metadata=env.AFW_FINITE_TRIAL_VERSION;
 const storage=ctx.storage,id=ctx.id,qaId=qa.idFromName(QA),peer=qa.get(qaId),version=metadata?.id;
 const start=now(),mono=performance.now();let last=start;
 const clock=()=>{
  const at=now();
  if(!time(at)||at<last||at-start>=4800||performance.now()-mono>=4800||ctx.storage!==storage||ctx.id!==id||
     env.AFW_FINITE_TRIAL_CONTROL!==qa||env.AFW_DOSSIER_EVENTS_NODE!==node||env.AFW_FINITE_TRIAL_VERSION!==metadata||
     metadata?.id!==version||qa.idFromName(QA).toString()!==qaId.toString()||
     node.idFromName(NODE).toString()!==id.toString())fail();
  last=at;return at;
 };
 async function read(){
  clock();const raw=await peer.readFiniteCanaryNoticeContext(x);
  try{
   clock();
   return fields(data(structuredClone(raw)),['purpose','control','ackHash','notice','observedAt','expiresAt']);
  }finally{raw?.[Symbol.dispose]?.();}
 }
 const first=await read(),control=finiteControlIdentity(first.control),p=control.plan,s=p.selectors;
 const notice=fields(first.notice,['eventId','revision','fingerprint','subscriptionReceiptHash','processReceiptHash']);
 const {observedAt,expiresAt}=first;
 const eventId=hash(['afw.own-synthetic-save.v1',s.subject,s.projectId,s.saveIdempotencyKey]);
 const fingerprint=hash(['afw.own-synthetic-save.v1',s.grantId,s.expectedProjectRevision,s.goal]);
 if(first.purpose!=='afw.qa-finite-canary-notice.v1'||!hex(first.ackHash)||
    p.intentId!==x.intentId||control.controlHash!==x.controlHash||p.resources.actorId!==qaId.toString()||
    p.resources.containerId!==id.toString()||p.deployments.canaryLive.versionId!==version||
    p.canaryContainment.runtimeVersionId!==version||p.canaryContainment.sourceRevision!==sourceRevision||
    s.sourceRevision!==sourceRevision||sha(program)!==s.programHash||notice.eventId!==eventId||
    notice.revision!==s.expectedProjectRevision+1||notice.fingerprint!==fingerprint||
    !hex(notice.subscriptionReceiptHash)||!hex(notice.processReceiptHash)||
    !time(observedAt)||observedAt<p.T0||observedAt>clock()||clock()-observedAt>=4800||
    !time(expiresAt)||expiresAt>Math.min(p.C0,p.N1,s.expiresAt)||expiresAt<=clock())fail();
 const deliveryDeadline=Math.min(expiresAt,start+4800);
 const active=()=>{const at=clock();if(at>=deliveryDeadline)fail();return at;};
 const native=readDossierEventHostPolicy({enabled:true,env,now:active});
 if(sha(native.pins.AFW_DOSSIER_EVENTS_POLICY)!==p.eventPlanHash||native.policy.containerId!==p.resources.containerId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>native.policy[k]!==s[k])||
    typeof native.pins.DB.withSession!=='function')fail();
 const cfg=fields(JSON.parse(native.pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']);
 const manifest=resolveSuccessorPreparation({scope:cfg.scope,original:cfg.original,candidate:cfg.candidate,namespace:node});
 if(manifest.candidate.trialId!==p.trialId||manifest.candidate.programHash!==s.programHash||
    manifest.candidate.sourceRevision!==sourceRevision||manifest.manifest.scope.namespaceId!==p.resources.namespaceId||
    manifest.manifest.scope.applicationId!==p.resources.applicationId)fail();
 const assertCurrent=()=>{native.current();return active();};
 let checked=false;
 const recheck=async()=>{
  if(checked)fail();
  assertCurrent();const latest=await read(),at=assertCurrent();
  if(latest.purpose!==first.purpose||!same(latest.control,control)||latest.ackHash!==first.ackHash||
     !same(latest.notice,notice)||latest.expiresAt!==expiresAt||!time(latest.observedAt)||
     latest.observedAt<observedAt||latest.observedAt>at||at-latest.observedAt>=4800)fail();
  checked=true;
 };
 const receipt=fields(await deliver({notice,assertCurrent,recheck,deliveryDeadline}),['eventId','status','httpReceivedAt','cloudReviewConfirmed']);
 const at=assertCurrent();
 if(!checked||!hex(receipt.eventId)||!Number.isInteger(receipt.status)||receipt.status<200||receipt.status>299||
    !time(receipt.httpReceivedAt)||receipt.httpReceivedAt<observedAt||receipt.httpReceivedAt>at||
    receipt.cloudReviewConfirmed!==false)fail();
 return receipt;
}
