import {createHash} from 'node:crypto';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
import {parsePrivatePreparedDispatchPolicy} from './mcp-private-prepared-dispatch-policy.mjs';
import {validateReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';
import {restorationConfigurationHash} from './mcp-successor-canary-restorer.mjs';

const fail=()=>{throw Error('Private historical QA material unavailable');};
const hash=s=>createHash('sha256').update(s).digest('hex');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}
 return v;
}
function json(raw,max){
 if(typeof raw!=='string'||raw.length>max||Buffer.byteLength(raw)>max)fail();
 const v=JSON.parse(raw);if(JSON.stringify(v)!==raw)fail();return v;
}
function context(raw){
 const p=fields(raw,['purpose','controlHash','closurePolicyHash','namedPolicyHash','namedBundleHash','dispatchPolicyHash','withdrawalPolicyHash','trialIdHash','grantIdHash','eventIdHash','journalHashes','artifactSourceRevision','artifactSourceTree','artifactProgramHash','artifactWorkerHash','evidence']);
 const hashes=['controlHash','closurePolicyHash','namedPolicyHash','namedBundleHash','dispatchPolicyHash','withdrawalPolicyHash','trialIdHash','grantIdHash','eventIdHash','artifactProgramHash','artifactWorkerHash'];
 if(p.purpose!=='afw.qa-legacy-historical-context.v1'||hashes.some(k=>!hex(p[k]))||!hex(p.artifactSourceRevision,40)||!hex(p.artifactSourceTree,40))fail();
 const j=fields(p.journalHashes,['restoration','retirement','preparedDispatch','reductionDispatch']);
 if(j.restoration!==null||j.retirement!==null||!hex(j.preparedDispatch)||!hex(j.reductionDispatch))fail();
 const e=fields(p.evidence,['qaVersionId','operatorVersionId','operatorModuleHash','operatorModuleBytes']);
 if(!uuid(e.qaVersionId)||!uuid(e.operatorVersionId)||e.qaVersionId===e.operatorVersionId||!hex(e.operatorModuleHash)||!Number.isSafeInteger(e.operatorModuleBytes)||e.operatorModuleBytes<1||e.operatorModuleBytes>2097152)fail();
 return p;
}
function journal(raw,key,p,closure,dispatch,at){
 const isDispatch=key==='preparedDispatch',purpose=isDispatch?'afw.private-prepared-dispatch.v1':'afw.private-reduction-dispatch.v1';
 const r=fields(raw,['purpose','planHash','withdrawalHash','phase','issuedAt','completedAt',...isDispatch?['dispatchPolicyHash']:[]]);
 if(hash(JSON.stringify(r))!==p.journalHashes[key]||r.purpose!==purpose||r.planHash!==p.closurePolicyHash||r.withdrawalHash!==p.withdrawalPolicyHash||isDispatch&&r.dispatchPolicyHash!==p.dispatchPolicyHash||!['issued','complete'].includes(r.phase)||!time(r.issuedAt)||r.issuedAt<(isDispatch?dispatch.dispatchAt:closure.startAt)||r.issuedAt>=closure.expiresAt||r.issuedAt>at||r.phase==='issued'&&r.completedAt!==null||r.phase==='complete'&&(!time(r.completedAt)||r.completedAt<r.issuedAt||r.completedAt>=closure.expiresAt||r.completedAt>at))fail();
 return r;
}
/** INTERNAL private data only. The caller must supply compiled source commitments,
 * actual native storage values and the fixed frozen artifact. This pure function
 * verifies historical declarations and retained journal bodies, never execution,
 * current D1 identity, ARM, permission, physical stop or effect authority.
 * Do not expose its private result through RPC. The finite host must independently
 * correlate primary D1 scope and enforce its original lease before using it. */
export function materializePrivateQaLegacyPredecessor(options){
 try{
  const o=fields(options,['artifact','historicalContext','control','journals','namedPolicyJson','dispatchPolicyJson','at']),p=context(o.historicalContext),a=o.artifact;
  if(!time(o.at))fail();
  fields(a,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
  if(a.sourceRevision!==p.artifactSourceRevision||a.sourceTree!==p.artifactSourceTree||a.programHash!==p.artifactProgramHash||a.workerHash!==p.artifactWorkerHash)fail();
  const policy=json(o.namedPolicyJson,16384);
  if(hash(o.namedPolicyJson)!==p.namedPolicyHash||policy.operation!=='confirm_named'||validateReleaseOperatorBundle({artifact:a,policy})!==true||hash(JSON.stringify({artifact:a,policy}))!==p.namedBundleHash)fail();
  const r=fields(o.control,['purpose','planHash','policy','armedAt','withdrawnAt']),closure=parseCanaryRestorationPolicy(r.policy);
  if(r.purpose!=='afw.canary-restoration-control.v1'||r.planHash!==p.closurePolicyHash||hash(r.policy)!==p.closurePolicyHash||hash(JSON.stringify(r))!==p.controlHash||!time(r.armedAt)||r.armedAt<closure.startAt-600000||r.armedAt>=closure.expiresAt||!time(r.withdrawnAt)||r.withdrawnAt<r.armedAt||r.withdrawnAt>o.at||closure.expiresAt>o.at||policy.startAt>closure.startAt||policy.expiresAt<closure.expiresAt)fail();
  const observation=policy.observation;
  if(observation.versionId!==closure.live.versionId||observation.deploymentId!==closure.live.deploymentId||restorationConfigurationHash(observation.configuration)!==closure.live.configurationHash)fail();
  const dispatch=json(o.dispatchPolicyJson,1024);
  parsePrivatePreparedDispatchPolicy(o.dispatchPolicyJson,{closure,closurePolicyHash:p.closurePolicyHash,withdrawalPolicyHash:p.withdrawalPolicyHash,dispatchPolicyHash:p.dispatchPolicyHash});
  const eventBinding=observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY'),event=json(eventBinding?.text,4096);
  fields(event,['grantId','subject','projectId','clientId','resource','startAt','expiresAt']);
  if(typeof event.grantId!=='string'||!/^[A-Za-z0-9_-]{1,128}$/.test(event.grantId)||hash(policy.plan.trialId)!==p.trialIdHash||hash(event.grantId)!==p.grantIdHash||hash(dispatch.eventId)!==p.eventIdHash)fail();
  const rows=fields(o.journals,['restoration','retirement','preparedDispatch','reductionDispatch']);
  // An absent KV value is undefined. Stored null remains a present unknown record.
  if(rows.restoration!==undefined||rows.retirement!==undefined)fail();
  journal(rows.preparedDispatch,'preparedDispatch',p,closure,dispatch,o.at);
  journal(rows.reductionDispatch,'reductionDispatch',p,closure,dispatch,o.at);
  const predecessor=Object.freeze({kind:'legacy',control:JSON.stringify(r),trialId:policy.plan.trialId,grantId:event.grantId,eventId:dispatch.eventId});
  const historicalScope=Object.freeze(Object.fromEntries(['grantId','subject','projectId','clientId','resource'].map(k=>[k,event[k]])));
  return Object.freeze({purpose:'afw.qa-legacy-predecessor-material.v1',predecessor,historicalScope,historicalDeclarationsVerified:true,journalBodiesVerified:true,retainedUncertainty:true,d1IdentityCorrelationVerified:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
 }catch{fail();}
}
