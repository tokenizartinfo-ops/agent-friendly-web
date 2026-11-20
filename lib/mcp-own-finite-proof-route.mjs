import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createFiniteOwnNativeCleanupHost} from './mcp-own-finite-cleanup-host.mjs';
import {readFiniteCanaryReductionControl} from './mcp-qa-finite-reduction-control.mjs';
import {createRetiredCustodyReader} from './mcp-retired-custody-reader.mjs';
import {finiteData as data,finiteFields as fields,finiteTime as time} from './mcp-finite-evidence.mjs';

const SLOT='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite native cleanup proof unavailable');};

/** Proof-only entry. No nominal host, token or generic provider request is
 * available to the canary. QA independently rechecks the retained authorization. */
export async function runFiniteOwnCleanupProof({ctx,env,program,sourceRevision,refs,capture,now=Date.now}={}){
 if(typeof capture!=='boolean'||typeof program!=='string'||!program)fail();
 const operation=capture?'proofCapture':'proofReadiness';
 const x=fields(refs,['intentId','planHash',...(capture?['proofChallenge']:[])]);
 const qa=env.AFW_FINITE_TRIAL_CONTROL,storage=ctx.storage,id=ctx.id,version=env.AFW_FINITE_TRIAL_VERSION;
 const keyText=env.AFW_DOSSIER_EVENTS_CUSTODY_KEY,started=now(),mono=performance.now();
 let last=started;
 const clock=()=>{
  const at=now();
  if(!time(at)||at<last||at-started>=5000||performance.now()-mono>=5000||ctx.storage!==storage||
     ctx.id!==id||env.AFW_FINITE_TRIAL_CONTROL!==qa||env.AFW_FINITE_TRIAL_VERSION!==version||
     env.AFW_DOSSIER_EVENTS_CUSTODY_KEY!==keyText)fail();
  last=at;return at;
 };
 const control=await readFiniteCanaryReductionControl({ctx,env,sourceRevision,refs:x,operation,now:clock});
 const p=control.plan,s=p.selectors;
 if(createHash('sha256').update(program).digest('hex')!==s.programHash)fail();
 const native=readDossierEventHostPolicy({enabled:true,env,historical:true,now:clock});
 if(native.policy.containerId!==p.resources.containerId||
    ['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>native.policy[k]!==s[k]))fail();
 const qaId=qa.idFromName(SLOT),peer=qa.get(qaId);
 const current=()=>{
  const at=clock();native.current();
  if(qaId.toString()!==p.resources.actorId||qa.idFromName(SLOT).toString()!==p.resources.actorId||
     version.id!==p.deployments.canaryLive.versionId||at<p.C0||at>=p.C1)fail();
  return at;
 };
 function check(assertCurrent,signal){
  assertCurrent();if(signal.aborted)fail();return current();
 }
 async function providerRead({signal,assertCurrent}){
  const at=check(assertCurrent,signal);
  const raw=await peer.readFiniteCanaryProofInventory({...x,operation});
  try{
   const later=check(assertCurrent,signal),observed=fields(data(structuredClone(raw)),['purpose','applicationId','observedAt','instances','totalCount']);
   if(observed.purpose!=='afw.finite-provider-inventory.v1'||observed.applicationId!==p.resources.applicationId||
      !time(observed.observedAt)||observed.observedAt<at||observed.observedAt>later||
      !Array.isArray(observed.instances)||observed.instances.length>64||observed.instances.length!==observed.totalCount)fail();
   return observed;
  }finally{raw?.[Symbol.dispose]?.();}
 }
 async function readCustody({signal},assertCurrent){
  const now=()=>check(assertCurrent,signal);
  now();
  if(typeof keyText!=='string'||keyText.length!==44)fail();
  const key=Buffer.from(keyText,'base64');
  let reader;
  try{
   if(key.length!==32||key.toString('base64')!==keyText)fail();
   reader=createRetiredCustodyReader({db:native.pins.DB,context:{grantId:s.grantId,subject:s.subject,
    clientId:s.clientId,resource:s.resource,scopes:['afw:project:read']},projectId:s.projectId,
    projectionSecret:native.pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,storage,custodyKey:key,
    containerId:p.resources.containerId,programHash:s.programHash,sourceRevision,image:'cloudflare/debian-trixie',
    window:{startAt:s.startAt,expiresAt:s.expiresAt},now});
  }finally{key.fill(0);}
  const result=await reader.observeRetired();now();return result;
 }
 async function readInstance({containerId,applicationId,signal},assertCurrent){
  if(containerId!==p.resources.containerId||applicationId!==p.resources.applicationId)fail();
  const snapshot=await providerRead({signal,assertCurrent});
  const candidates=snapshot.instances.filter(v=>v.containerId===containerId);
  if(candidates.length!==1)fail();
  const v=fields(candidates[0],['containerId','applicationId','image','startedAt','stoppedAt','state','exitCode']);
  if(v.applicationId!==applicationId||v.image!=='cloudflare/debian-trixie'||v.state!=='stopped'||v.exitCode!==0||
     !time(v.startedAt)||!time(v.stoppedAt)||v.startedAt>v.stoppedAt||v.stoppedAt>snapshot.observedAt)fail();
  return {id:containerId,application_id:applicationId,image:v.image,started_at:new Date(v.startedAt).toISOString(),
   status:{state:v.state,exit_code:v.exitCode,updated_at:new Date(v.stoppedAt).toISOString()}};
 }
 const host=createFiniteOwnNativeCleanupHost({ctx,env,control,sourceRevision,providerRead,readCustody,readInstance,
  readNominalControl:fail,now:current});
 if(capture)return host.observeFiniteTrialCleanup(x);
 return host.readFiniteTrialCleanupReadiness(x);
}
