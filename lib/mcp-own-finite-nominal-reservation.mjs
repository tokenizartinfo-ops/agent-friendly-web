import {createHash} from 'node:crypto';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createFiniteAdmissionGate} from './mcp-own-finite-admission-gate.mjs';
import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {snapshotMcpSubscriptionRequest} from './mcp-subscription-lifecycle.mjs';
import {FINITE_DOSSIER_CALLBACK_PATH} from './mcp-qa-finite-dossier-callback.mjs';
import {FINITE_DOSSIER_QA_ORIGIN} from './dossier-supervision-finite-review.mjs';
import {finiteControlIdentity,finiteData as data,finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const QA='afw-own-successor-closure-v1',NODE='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Finite native reservation unavailable');};


async function resolveGate({ctx,env,program,sourceRevision,refs,operation,subscription=false,now=Date.now}){
 if(!hex(sourceRevision,40)||typeof program!=='string'||!program)fail();
 const limit=subscription?20000:4800;
 const x=fields(refs,['intentId','controlHash']),qa=env.AFW_FINITE_TRIAL_CONTROL,metadata=env.AFW_FINITE_TRIAL_VERSION;
 const storage=ctx.storage,id=ctx.id,qaId=qa.idFromName(QA),peer=qa.get(qaId),node=env.AFW_DOSSIER_EVENTS_NODE;
 const start=now(),mono=performance.now();let last=start;
 const clock=()=>{
  const at=now();
  if(!time(at)||at<last||at-start>=limit||performance.now()-mono>=limit||ctx.storage!==storage||ctx.id!==id||
     env.AFW_FINITE_TRIAL_CONTROL!==qa||env.AFW_FINITE_TRIAL_VERSION!==metadata||env.AFW_DOSSIER_EVENTS_NODE!==node||
     qa.idFromName(QA).toString()!==qaId.toString()||node.idFromName(NODE).toString()!==id.toString())fail();
  last=at;return at;
 };
 clock();
 const raw=await peer.readFiniteCanaryNominalContext({...x,operation});
 let v;
 try{
  clock();
  v=fields(data(structuredClone(raw)),['purpose','operation','control','ackHash','nominalClaim','observedAt','expiresAt']);
 }finally{raw?.[Symbol.dispose]?.();}
 const c=finiteControlIdentity(v.control),p=c.plan,s=p.selectors;
 const end=operation==='settle'?p.C1:Math.min(p.C0,p.N1,s.expiresAt);
 const deadline=subscription?Math.min(end,v.nominalClaim.deadline):end;
 if(v.purpose!=='afw.qa-finite-canary-nominal-context.v1'||v.operation!==operation||p.intentId!==x.intentId||
    c.controlHash!==x.controlHash||!hex(v.ackHash)||v.expiresAt!==end||!time(v.observedAt)||
    v.observedAt<p.T0||v.observedAt>clock()||clock()-v.observedAt>=4800||
    qaId.toString()!==p.resources.actorId||id.toString()!==p.resources.containerId||metadata?.id!==p.deployments.canaryLive.versionId||
    p.canaryContainment.runtimeVersionId!==metadata.id||p.canaryContainment.sourceRevision!==sourceRevision||s.sourceRevision!==sourceRevision||
    createHash('sha256').update(program).digest('hex')!==s.programHash)fail();
 const active=()=>{
  const at=clock();if(at>=deadline||metadata.id!==p.deployments.canaryLive.versionId)fail();return at;
 };
 const native=readDossierEventHostPolicy({enabled:true,env,historical:operation==='settle',now:active});
 if(subscription&&createHash('sha256').update(native.pins.AFW_DOSSIER_EVENTS_POLICY).digest('hex')!==p.eventPlanHash||
    native.policy.containerId!==p.resources.containerId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>native.policy[k]!==s[k]))fail();
 let scope;
 if(operation!=='settle'){
  const policy=fields(JSON.parse(native.pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']);
  const resolved=resolveSuccessorPreparation({scope:policy.scope,original:policy.original,candidate:policy.candidate,namespace:node});
  const selected=resolved.candidate;scope=resolved.manifest.scope;
  if(selected.trialId!==p.trialId||selected.programHash!==s.programHash||selected.sourceRevision!==sourceRevision||
     resolved.manifest.scope.namespaceId!==p.resources.namespaceId||
     resolved.manifest.scope.applicationId!==p.resources.applicationId)fail();
 }
 const current=()=>{native.current();return active();};
 const primary=createFiniteNativePrimaryReader({db:native.pins.DB,control:c,now:current,
  ...(subscription?{nativeAdmission:{ctx,env,program,programSourceRevision:sourceRevision}}:{})});
 const readNominalControl=async()=>{
  current();const raw=await peer.readFiniteTrialNominalControl(x);
  try{
   current();
   const reply=data(structuredClone(raw));
   if(reply?.status!=='observed'||reply.value?.claimHash!==createHash('sha256')
      .update('afw.qa-finite-trial.v1:effect\n'+JSON.stringify(v.nominalClaim)).digest('hex'))fail();
   return reply.value;
  }finally{raw?.[Symbol.dispose]?.();}
 };
 const gate=createFiniteAdmissionGate({storage,identity:finiteAdmissionIdentity(c),
  ...(subscription?{admissionSource:primary.admissionSource}:{}),
  readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,
  nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,
   actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:s.expiresAt},now:current,timeoutMs:4800});
 return {gate,scope,control:c,current,deadline};
}

/** Candidate journal for the same original named QA child. */
export async function runFiniteOwnNominalReservation(options={}){
 const {operation}=options;
 if(!['journal','reserve','settle'].includes(operation))fail();
 const {gate}=await resolveGate({...options,subscription:false});
 if(operation==='reserve')return gate.beginReservation();
 if(operation==='settle')return gate.settleReservation();
 return gate.read();
}

/** The receiver and signing-key slot belong to this build, never the caller.
 * The original subscription receipt is committed before the dossier write. */
export async function runFiniteOwnTrialSubscription({subscribe,runDossier,...options}={}){
 if(typeof subscribe!=='function'||typeof runDossier!=='function')fail();
 const {env}=options,secret=env.AFW_DOSSIER_FINITE_CALLBACK_SECRET;
 if(typeof secret!=='string'||!secret.startsWith('whsec_'))fail();
 const {gate,scope,control,current,deadline}=await resolveGate({...options,operation:'reserve',subscription:true});
 if(control.plan.selectors.projectId!=='oauth-canary-owner')fail();
 const assertCurrent=()=>{
  if(env.AFW_DOSSIER_FINITE_CALLBACK_SECRET!==secret)fail();
  return current();
 };
 assertCurrent();
 const request=snapshotMcpSubscriptionRequest({name:'afw.dossier.changed',arguments:{projectRef:scope.projectRef},
  delivery:{mode:'webhook',url:FINITE_DOSSIER_QA_ORIGIN+FINITE_DOSSIER_CALLBACK_PATH,secret}});
 const raw=await subscribe({gate,request,assertCurrent,deadline});
 const r=fields(raw,['id','refreshBefore','cursor','truncated']),at=assertCurrent(),expiresAt=Date.parse(r.refreshBefore);
 if(typeof r.id!=='string'||!/^sub_[0-9a-f]{64}$/.test(r.id)||!time(expiresAt)||expiresAt<=at||expiresAt>deadline||
    new Date(expiresAt).toISOString()!==r.refreshBefore||r.cursor!==null||r.truncated!==false)fail();
 return runDossier(assertCurrent);
}
