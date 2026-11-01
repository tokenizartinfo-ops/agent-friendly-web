import {readFile,writeFile,appendFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {validateQaFiniteConfirmationCommand,assertQaFiniteConfirmationAdmission} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {createPrivateQaFiniteObserverHttp,createPrivateQaFiniteRestoreHttp,createPrivateQaFiniteGithub,claimFiniteObserverCreation,readFiniteFinalizerGithubContext} from '../lib/mcp-qa-finite-http.mjs';
import {validateFiniteExternalPlan,validateFiniteObserverOutput} from '../lib/mcp-qa-finite-external-contract.mjs';
import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
import {resolvePrivateQaFiniteExternalSource} from '../lib/mcp-qa-finite-source.mjs';
const fail=()=>{throw Error('Finite finalizer unavailable');};
/** Fixed phase CLI. Source implementation may be installed only in reviewed code.
 * Environment contributes GitHub's authenticated event/context, never a plan. */
export async function runFiniteFinalizerCli({phase,env=process.env,read=readFile,write=writeFile,append=appendFile,resolveSource=resolvePrivateQaFiniteExternalSource,fetchImpl=fetch,now=Date.now,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
 const signal=AbortSignal.timeout(480000);
 try{
  if(!['admission','admit','poll','restore'].includes(phase))fail();
  const raw=await read(env.GITHUB_EVENT_PATH,'utf8');if(Buffer.byteLength(raw)>262144)fail();
  const event=JSON.parse(raw),context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,eventName:env.GITHUB_EVENT_NAME,runId:env.GITHUB_RUN_ID,runAttempt:env.GITHUB_RUN_ATTEMPT,sourceRevision:env.GITHUB_SHA};
  const admission=validateQaFiniteConfirmationCommand({event,context,now});
  assertQaFiniteConfirmationAdmission(admission,phase==='admission'||phase==='admit'?'nominal':'cleanup');
  if(phase==='admission'){await append(env.GITHUB_OUTPUT,'intent_id='+admission.intentId+'\n');return {status:'admitted',operationalReadiness:false};}
  // Missing actual Task4 constructor fails before reading CF custody.
  const source=await resolveSource({admission,phase,now});
  assertQaFiniteConfirmationAdmission(admission,phase==='admit'?'nominal':'cleanup');
  const githubToken=env.GITHUB_TOKEN,finalizer=await readFiniteFinalizerGithubContext({admission,githubToken,fetchImpl,now,signal});
  const credential=env.AFW_QA_CLOSED_TOKEN;
  const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:admission.intentId,sourceRevision:admission.sourceRevision,T0:admission.createdAt,R1:admission.cleanupExpiresAt},source:{qaLive:source.deployments.qaLive,custody:source.custody},credential,fetchImpl,now,signal});
  if(phase==='admit'){
   await observer.qualifyCustody();assertQaFiniteConfirmationAdmission(admission);
   let created=false;
   try{const token=await claimFiniteObserverCreation({admission,githubToken,fetchImpl,now,signal});await observer.create(token);created=true;}catch{/* exact GET only after existing/uncertain creation */}
   if(!created)await observer.read();
   let preview;
   for(let i=0;i<12;i++){assertQaFiniteConfirmationAdmission(admission);try{preview=await observer.preview();break;}catch{if(i===11)fail();await sleep(1000);}}
   const plan=validateFiniteExternalPlan({...source,preview,commandId:admission.commentId,finalizer});
   const github=createPrivateQaFiniteGithub({plan,githubToken,fetchImpl,now,signal});
   await github.persistAdmission(credential);assertQaFiniteConfirmationAdmission(admission);
   await write('afw-finite-plan.json',JSON.stringify(plan));return {status:'ready',operationalReadiness:false};
  }
  if(phase==='poll'){
   const plan=validateFiniteExternalPlan(JSON.parse(await read('afw-finite-plan.json','utf8')));
   if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
   for(let i=0;i<48;i++){
    assertQaFiniteConfirmationAdmission(admission,'cleanup');
    const result=await observer.read();
    if(result.status==='complete'){const output=validateFiniteObserverOutput(result.output,plan);await write('afw-finite-terminal.json',JSON.stringify(output));return {status:'observer_complete',operationalReadiness:false};}
    await sleep(Math.min(5000,Math.max(1,admission.cleanupExpiresAt-now())));
   }fail();
  }
  // Restart/restore loads the exact ORIGINAL observer primary output. No live
  // canary proof method, reseal, challenge or replacement observer is invoked.
  const observed=await observer.read();if(observed.status!=='complete')fail();
  const plan=validateFiniteExternalPlan(observed.output.plan);
  if(plan.preview.intentId!==admission.intentId||plan.preview.sourceRevision!==admission.sourceRevision||JSON.stringify(plan.finalizer)!==JSON.stringify(finalizer))fail();
  validateFiniteObserverOutput(observed.output,plan);
  const adapters=createPrivateQaFiniteRestoreHttp({plan,credential,githubToken,fetchImpl,now,signal});
  const result=await createPrivateQaFiniteTrialFinalizer({plan,readSnapshot:adapters.readSnapshot,claim:adapters.claim,deployClosed:adapters.deployClosed,now,signal}).run();
  await write('afw-finite-result.json',JSON.stringify(result));return result;
 }catch{
  const result={status:'admin_pending',operationalReadiness:false,mayRetry:false};
  await write('afw-finite-result.json',JSON.stringify(result));return result;
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=await runFiniteFinalizerCli({phase:process.argv[2]});
 if(!['admitted','ready','observer_complete','restored_observed','closed_observed','closed_observed_uncertain'].includes(result.status))process.exitCode=1;
}
