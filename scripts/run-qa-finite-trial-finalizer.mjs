import {createFiniteAdoptionParent,waitForFiniteObserverAdoption} from '../lib/mcp-qa-finite-adoption.mjs';
import {issueFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-issuer.mjs';
import {readFile,writeFile,appendFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {validateQaFiniteConfirmationCommand,assertQaFiniteConfirmationAdmission} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {issuePrivateQaFiniteLauncher,createPrivateQaFiniteObserverHttp,createPrivateQaFiniteRestoreHttp,createPrivateQaFiniteGithub,readFiniteFinalizerGithubContext,createPrivateQaFiniteCoupledGitHub,createPrivateQaFiniteCoupledRestoreHttp} from '../lib/mcp-qa-finite-http.mjs';
import {validateFiniteExternalPlan,validateFiniteObserverOutput} from '../lib/mcp-qa-finite-external-contract.mjs';
import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
import {resolvePrivateQaFiniteExternalSource} from '../lib/mcp-qa-finite-source.mjs';
import {validateFiniteNativeObserverHandoff} from '../lib/mcp-qa-finite-observer.mjs';
import {assertFiniteR2ArchiveCredential} from '../lib/mcp-qa-finite-r2-object.mjs';
import {verifyFiniteCoupledQaTrialResult} from './run-qa-finite-coupled-restore.mjs';
const fail=()=>{throw Error('Finite finalizer unavailable');};
/** Fixed phase CLI. Source implementation may be installed only in reviewed code.
 * Environment contributes GitHub's authenticated event/context, never a plan. */
export async function runFiniteFinalizerCli({phase,env=process.env,read=readFile,write=writeFile,append=appendFile,fetchImpl=fetch,now=Date.now,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
 let signal=AbortSignal.timeout(phase==='restore-independent'?900000:480000),adoption;
 try{
  if(!['admission','seed-material','admit','launch','poll','restore','restore-independent'].includes(phase))fail();
  const raw=await read(env.GITHUB_EVENT_PATH,'utf8');if(Buffer.byteLength(raw)>262144)fail();
  const event=JSON.parse(raw),context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,eventName:env.GITHUB_EVENT_NAME,runId:env.GITHUB_RUN_ID,runAttempt:env.GITHUB_RUN_ATTEMPT,sourceRevision:env.GITHUB_SHA};
  const admission=validateQaFiniteConfirmationCommand({event,context,now});
  assertQaFiniteConfirmationAdmission(admission,phase==='admission'||phase==='seed-material'||phase==='admit'||phase==='launch'?'nominal':'cleanup');
  if(phase==='restore-independent'&&(env.GITHUB_JOB!=='restore'||env.GITHUB_ACTION!=='coupled_restore_once'||
     env.AFW_COUPLED_RESTORE_ORIGINAL_PID!==String(process.pid)))fail();
  if(phase==='admit'){
   adoption=createFiniteAdoptionParent({T0:admission.createdAt,N1:admission.expiresAt,now,signal});
   signal=adoption.parent.signal;adoption.parent.check();
  }
  if(phase==='admission'){await append(env.GITHUB_OUTPUT,'intent_id='+admission.intentId+'\n');return {status:'admitted',operationalReadiness:false};}
  if(phase==='seed-material'){
   return await issueFiniteMaterialSeed({admission,githubToken:env.GITHUB_TOKEN,credential:env.AFW_QA_CLOSED_TOKEN,
    r2Credential:env.AFW_R2_BUNDLE_READ_URL,fetchImpl,now,signal});
  }
  // Bootstrap facts identify only the original QA publication and custody.
  if(phase==='launch'){
   const raw=await read('afw-finite-plan.json');
   if(Buffer.byteLength(raw)>65536)fail();
   const plan=validateFiniteExternalPlan(JSON.parse(raw));
   const result=await issuePrivateQaFiniteLauncher({plan,admission,runtime:env,credential:env.AFW_QA_CLOSED_TOKEN,githubToken:env.GITHUB_TOKEN,fetchImpl,now,signal});
   return result.status==='uncertain'?{status:'launcher_uncertain',operationalReadiness:false}:result;
  }
  const source=await resolvePrivateQaFiniteExternalSource({admission,phase:phase==='restore-independent'?'restore':phase,sourceRevision:admission.sourceRevision,githubToken:env.GITHUB_TOKEN,fetchImpl,now,signal});
  if(phase==='admit')adoption.parent.check();
  assertQaFiniteConfirmationAdmission(admission,phase==='admit'?'nominal':'cleanup');
  const githubToken=env.GITHUB_TOKEN,finalizer=await readFiniteFinalizerGithubContext({admission,githubToken,fetchImpl,now,signal});
  assertQaFiniteConfirmationAdmission(admission,phase==='admit'?'nominal':'cleanup');
  const credential=env.AFW_QA_CLOSED_TOKEN;
  const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:admission.intentId,sourceRevision:admission.sourceRevision,T0:admission.createdAt,R1:admission.cleanupExpiresAt},source,credential,githubToken,fetchImpl,now,signal});
  if(phase==='admit'){
   const check=()=>{adoption.parent.check();assertQaFiniteConfirmationAdmission(admission);};
   check();
   const adopted=await waitForFiniteObserverAdoption({parent:adoption.parent,T0:admission.createdAt,observer,sleep,now});check();
   const plan=validateFiniteExternalPlan(adopted.plan);
   if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||
      plan.commandId!==admission.commentId||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
   const github=createPrivateQaFiniteGithub({plan,githubToken,fetchImpl,now,signal});
   await github.persistAdmission(credential,admission);check();
   await write('afw-finite-plan.json',JSON.stringify(plan));return {status:'ready',operationalReadiness:false};
  }
  if(phase==='poll'){
   const plan=validateFiniteExternalPlan(JSON.parse(await read('afw-finite-plan.json','utf8')));
   if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
   for(let i=0;i<48;i++){
    assertQaFiniteConfirmationAdmission(admission,'cleanup');
    const target=admission.createdAt+Math.floor(i*(admission.cleanupExpiresAt-admission.createdAt-5000)/47);
    if(now()<target)await sleep(target-now());
    assertQaFiniteConfirmationAdmission(admission,'cleanup');
    const result=await observer.read();
    if(result.status!=='complete')continue;
    if(result.output?.purpose==='afw.finite-native-observer-handoff.v1'){
     validateFiniteNativeObserverHandoff(result.output,plan.preview);
     await append(env.GITHUB_OUTPUT,'restore_mode=independent\n');
     return {status:'independent_observer_ready',operationalReadiness:false};
    }
    const output=validateFiniteObserverOutput(result.output,plan);
    await write('afw-finite-terminal.json',JSON.stringify(output));
    if(env.GITHUB_OUTPUT)await append(env.GITHUB_OUTPUT,'restore_mode=legacy\n');
    return {status:'observer_complete',operationalReadiness:false};
   }fail();
  }
  // Restart/restore loads the exact ORIGINAL observer primary output. No live
  // canary proof method, reseal, challenge or replacement observer is invoked.
  const observed=await observer.read();if(observed.status!=='complete')fail();
  if(phase==='restore-independent'){
   assertQaFiniteConfirmationAdmission(admission,'cleanup');
   const {scope:reservation}=validateFiniteNativeObserverHandoff(observed.output,observed.preview);
   const {intentId,controlHash,handoffHash,sourceRevision,restoreFrom,restoreBefore}=reservation;
   const scope=Object.freeze({intentId,controlHash,handoffHash,sourceRevision,restoreFrom,restoreBefore});
   const archiveCredential=env.AFW_R2_BACKUPS_READ_URL;
   if(source.custody.expiresAt<restoreBefore)fail();
   const started=now();
   assertFiniteR2ArchiveCredential(archiveCredential,{now,requiredUntil:restoreBefore});
   if(started<restoreFrom)await sleep(restoreFrom-started);
   if(signal.aborted||now()<restoreFrom||now()>=restoreBefore)fail();
   signal=AbortSignal.any([signal,AbortSignal.timeout(restoreBefore-now())]);
   const github=createPrivateQaFiniteCoupledGitHub({scope,runId:finalizer.runId,runtime:env,credential:githubToken,
    confirmation:{commentId:admission.commentId,admitJobId:finalizer.jobId,T0:admission.createdAt},fetchImpl,now,signal});
   const restore=createPrivateQaFiniteCoupledRestoreHttp({intent:scope,qaLive:source.qaLive,custody:source.custody,credential,
    archiveCredential,claimSend:github.claimSend,readSend:github.readSend,fetchImpl,now,signal});
   const closed=await restore.run();
   let result;
   try{result={status:'restore_verified',...verifyFiniteCoupledQaTrialResult(closed,{controlHash,restoreFrom})};}
   catch{result={status:'independent_trial_unverified',restorationStatus:closed.status,operationalReadiness:false,mayRetry:false};}
   await write('afw-finite-result.json',JSON.stringify(result));return result;
  }
  const plan=validateFiniteExternalPlan(observed.output.plan);
  if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
  validateFiniteObserverOutput(observed.output,plan);
  const adapters=createPrivateQaFiniteRestoreHttp({plan,credential,githubToken,fetchImpl,now,signal});
  await adapters.github.admitOriginalExecution({admission,output:observed.output});
  const result=await createPrivateQaFiniteTrialFinalizer({plan,readSnapshot:adapters.readSnapshot,claim:adapters.claim,deployClosed:adapters.deployClosed,now,signal}).run();
  await write('afw-finite-result.json',JSON.stringify(result));return result;
 }catch{
  const result={status:'admin_pending',operationalReadiness:false,mayRetry:false};
  await write('afw-finite-result.json',JSON.stringify(result));return result;
 }finally{adoption?.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=await runFiniteFinalizerCli({phase:process.argv[2]});
 if(!['admitted','seed_material_created','ready','observer_complete','independent_observer_ready','restore_verified','launcher_created','launcher_uncertain','restored_observed','closed_observed','closed_observed_uncertain'].includes(result.status))process.exitCode=1;
}
