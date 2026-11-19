import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {finiteControlIdentity,finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';

import {saveOwnSyntheticGoal} from './mcp-own-synthetic-save.mjs';

const QA='afw-own-successor-closure-v1',NODE='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Finite canary notice unavailable');};
const sha=value=>createHash('sha256').update(value).digest('hex');

/** Resolve both private phases against the same compiled canary and policy. */
function candidate({ctx,env,program,sourceRevision,refs,now}){
 if(!hex(sourceRevision,40)||typeof program!=='string'||!program)fail();
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
 async function read(phase){
  const key=phase==='save'?'target':'notice';
  clock();const raw=await (phase==='save'?peer.readFiniteCanarySaveContext(x):peer.readFiniteCanaryNoticeContext(x));
  try{
   const at=clock(),v=fields(data(structuredClone(raw)),['purpose','control','ackHash',key,'observedAt','expiresAt']);
   const control=finiteControlIdentity(v.control),p=control.plan,s=p.selectors;
   const target=fields(v[key],['eventId','revision','fingerprint','subscriptionReceiptHash','processReceiptHash']);
   const eventId=hash(['afw.own-synthetic-save.v1',s.subject,s.projectId,s.saveIdempotencyKey]);
   const fingerprint=hash(['afw.own-synthetic-save.v1',s.grantId,s.expectedProjectRevision,s.goal]);
   if(v.purpose!=='afw.qa-finite-canary-'+phase+'.v1'||!hex(v.ackHash)||
      p.intentId!==x.intentId||control.controlHash!==x.controlHash||p.resources.actorId!==qaId.toString()||
      p.resources.containerId!==id.toString()||p.deployments.canaryLive.versionId!==version||
      p.canaryContainment.runtimeVersionId!==version||p.canaryContainment.sourceRevision!==sourceRevision||
      s.sourceRevision!==sourceRevision||sha(program)!==s.programHash||target.eventId!==eventId||
      target.revision!==s.expectedProjectRevision+1||target.fingerprint!==fingerprint||
      !hex(target.subscriptionReceiptHash)||!hex(target.processReceiptHash)||
      !time(v.observedAt)||v.observedAt<p.T0||v.observedAt>at||at-v.observedAt>=4800||
      !time(v.expiresAt)||v.expiresAt>Math.min(p.C0,p.N1,s.expiresAt)||v.expiresAt<=at)fail();
   return {control,target,ackHash:v.ackHash,observedAt:v.observedAt,expiresAt:v.expiresAt};
  }finally{raw?.[Symbol.dispose]?.();}
 }
 return {start,clock,node,read};
}

async function bindCandidate(options,phase,expected){
 const {env}=options,{start,clock,node,read}=candidate(options),first=await read(phase);
 const {control,target,ackHash,observedAt,expiresAt}=first,p=control.plan,s=p.selectors;
 if(expected&&(!same(control,expected.control)||ackHash!==expected.ackHash||!same(target,expected.target)))fail();
 const deadline=Math.min(expiresAt,start+4800,expected?.expiresAt??Infinity);
 const active=()=>{const at=clock();if(at>=deadline)fail();return at;};
 const native=readDossierEventHostPolicy({enabled:true,env,now:active});
 if(sha(native.pins.AFW_DOSSIER_EVENTS_POLICY)!==p.eventPlanHash||native.policy.containerId!==p.resources.containerId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>native.policy[k]!==s[k])||
    typeof native.pins.DB.withSession!=='function')fail();
 const cfg=fields(JSON.parse(native.pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']);
 const manifest=resolveSuccessorPreparation({scope:cfg.scope,original:cfg.original,candidate:cfg.candidate,namespace:node});
 if(manifest.candidate.trialId!==p.trialId||manifest.candidate.programHash!==s.programHash||
    manifest.candidate.sourceRevision!==s.sourceRevision||manifest.manifest.scope.namespaceId!==p.resources.namespaceId||
    manifest.manifest.scope.applicationId!==p.resources.applicationId)fail();
 const assertCurrent=()=>{native.current();return active();};
 const recheck=async()=>{
  assertCurrent();const latest=await read(phase),at=assertCurrent();
  if(!same(latest.control,control)||latest.ackHash!==ackHash||!same(latest.target,target)||
     latest.expiresAt!==expiresAt||latest.observedAt<observedAt||latest.observedAt>at)fail();
 };
 return {first,native,assertCurrent,recheck,deadline};
}

/** Private canary entry for the event already saved by the acknowledged QA child. */
export async function runFiniteOwnTrialNotice(options={}){
 return deliverNotice(options);
}
async function deliverNotice(options,expected){
 const {deliver}=options;
 if(typeof deliver!=='function')fail();
 const {first,assertCurrent,recheck,deadline}=await bindCandidate({...options,now:options.now??Date.now},'notice',expected);
 let checked=false;
 const confirm=async()=>{if(checked)fail();await recheck();checked=true;};
 const receipt=fields(await deliver({notice:first.target,assertCurrent,recheck:confirm,deliveryDeadline:deadline}),
  ['eventId','status','httpReceivedAt','cloudReviewConfirmed']);
 const at=assertCurrent();
 if(!checked||!hex(receipt.eventId)||!Number.isInteger(receipt.status)||receipt.status<200||receipt.status>299||
    !time(receipt.httpReceivedAt)||receipt.httpReceivedAt<first.observedAt||receipt.httpReceivedAt>at||
    receipt.cloudReviewConfirmed!==false)fail();
 return receipt;
}

/** Source-fixed QA save. The selected goal was approved before launch. The
 * original primary writer and transport retain their own one-effect fences. */
export async function runFiniteOwnTrialDossier({save=saveOwnSyntheticGoal,now=Date.now,...options}={}){
 if(typeof save!=='function'||typeof options.deliver!=='function')fail();
 const bound={...options,now};
 const {first,native,assertCurrent,recheck,deadline}=await bindCandidate(bound,'save');
 const {resources,selectors:s}=first.control.plan;
 if(s.projectId!=='oauth-canary-owner')fail();
 const result=fields(await save({enabled:true,db:native.pins.DB,
  context:{grantId:s.grantId,subject:s.subject,clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']},
  projectId:s.projectId,containerId:resources.containerId,programHash:s.programHash,sourceRevision:s.sourceRevision,
  window:{startAt:s.startAt,expiresAt:deadline},now:assertCurrent,
  expectedSubscriptionReceiptHash:first.target.subscriptionReceiptHash,
  beforeCommit:async()=>{await recheck();return true;},assertCurrent:()=>{assertCurrent();return true;},
 },{expectedRevision:s.expectedProjectRevision,idempotencyKey:s.saveIdempotencyKey,goal:s.goal}),
 ['status','eventId','revision','replayed']);
 if(result.status!==200||result.eventId!==first.target.eventId||result.revision!==first.target.revision||
    typeof result.replayed!=='boolean')fail();
 let delivery=null;
 // Losing the transport acknowledgement does not undo the commit and must
 // not re-run it. The native transport owns the durable send budget.
 if(!result.replayed){
  try{delivery=await deliverNotice(bound,first);}catch{}
 }
 return Object.freeze({saved:true,revision:result.revision,delivery});
}
