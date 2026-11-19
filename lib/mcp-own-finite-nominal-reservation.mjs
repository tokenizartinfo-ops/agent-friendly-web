import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createFiniteAdmissionGate} from './mcp-own-finite-admission-gate.mjs';
import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
import {createFiniteNativePrimaryReader} from './mcp-own-finite-primary.mjs';
import {finiteControlIdentity,finiteData as data,finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const QA='afw-own-successor-closure-v1',NODE='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Finite native reservation unavailable');};

/** Only the candidate's private journal and reservation writer are exposed.
 * QA keeps ownership of the original named child's authorization and clock. */
export async function runFiniteOwnNominalReservation({ctx,env,program,sourceRevision,refs,operation,now=Date.now}={}){
 if(!['journal','reserve','settle'].includes(operation)||!hex(sourceRevision,40)||typeof program!=='string'||!program)fail();
 const x=fields(refs,['intentId','controlHash']),qa=env.AFW_FINITE_TRIAL_CONTROL,metadata=env.AFW_FINITE_TRIAL_VERSION;
 const storage=ctx.storage,id=ctx.id,qaId=qa.idFromName(QA),peer=qa.get(qaId),node=env.AFW_DOSSIER_EVENTS_NODE;
 const start=now(),mono=performance.now();let last=start;
 const clock=()=>{
  const at=now();
  if(!time(at)||at<last||at-start>=4800||performance.now()-mono>=4800||ctx.storage!==storage||ctx.id!==id||
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
 if(v.purpose!=='afw.qa-finite-canary-nominal-context.v1'||v.operation!==operation||p.intentId!==x.intentId||
    c.controlHash!==x.controlHash||!hex(v.ackHash)||v.expiresAt!==end||!time(v.observedAt)||
    v.observedAt<p.T0||v.observedAt>clock()||clock()-v.observedAt>=4800||
    qaId.toString()!==p.resources.actorId||id.toString()!==p.resources.containerId||metadata?.id!==p.deployments.canaryLive.versionId||
    p.canaryContainment.runtimeVersionId!==metadata.id||p.canaryContainment.sourceRevision!==sourceRevision||s.sourceRevision!==sourceRevision||
    createHash('sha256').update(program).digest('hex')!==s.programHash)fail();
 const active=()=>{
  const at=clock();if(at>=end||metadata.id!==p.deployments.canaryLive.versionId)fail();return at;
 };
 const native=readDossierEventHostPolicy({enabled:true,env,historical:operation==='settle',now:active});
 if(native.policy.containerId!==p.resources.containerId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>native.policy[k]!==s[k]))fail();
 const current=()=>{native.current();return active();};
 const primary=createFiniteNativePrimaryReader({db:native.pins.DB,control:c,now:current});
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
  readPrimary:{reservation:primary.reservation,admission:primary.admission,launch:primary.launch},readNominalControl,
  nominalIdentity:{sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,
   actorId:p.resources.actorId,monitorHash:p.monitorHash,consentExpiresAt:s.expiresAt},now:current,timeoutMs:4800});
 if(operation==='reserve')return gate.beginReservation();
 if(operation==='settle')return gate.settleReservation();
 return gate.read();
}
