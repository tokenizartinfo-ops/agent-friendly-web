import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {finiteFields as fields,finiteHex as hex,finiteTime as time} from '../lib/mcp-finite-evidence.mjs';
import {isQaGithubBearerTransportValue} from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
import {readFiniteMaterialSeedForCoupledRestore} from '../lib/mcp-qa-finite-seed-http.mjs';
import {finiteGhaCustody} from '../lib/mcp-qa-finite-custody.mjs';
import {createPrivateQaFiniteCoupledGitHub,createPrivateQaFiniteCoupledRestoreHttp} from '../lib/mcp-qa-finite-http.mjs';

const repo='tokenizartinfo-ops/agent-friendly-web',workflow='.github/workflows/afw-finite-coupled-restore.yml';
const fail=()=>{throw Error('Coupled QA restore job unavailable');};
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
/** The supplied values only select an existing native observation. The private
 * Workflow and immutable GitHub seed prove all restore scope and candidate pins. */
export async function runFiniteCoupledRestoreJob({runtime=process.env,read=readFile,fetchImpl=fetch,now=Date.now}={}){
 const ctl=new AbortController(),signal=ctl.signal;
 try{
  const fixed={GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REPOSITORY:repo,GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/main',
   GITHUB_WORKFLOW_REF:repo+'/'+workflow+'@refs/heads/main',GITHUB_RUN_ATTEMPT:'1',GITHUB_ACTOR:'tokenizartinfo-ops',GITHUB_ACTOR_ID:'290715446',
   GITHUB_JOB:'restore',GITHUB_ACTION:'coupled_restore_once',AFW_COUPLED_RESTORE_ORIGINAL_PID:String(process.pid)};
  if(Object.entries(fixed).some(([k,v])=>runtime[k]!==v))fail();
  const sourceRevision=runtime.GITHUB_SHA,runId=Number(runtime.GITHUB_RUN_ID),raw=await read(runtime.GITHUB_EVENT_PATH);
  if(!hex(sourceRevision,40)||!Number.isSafeInteger(runId)||runId<1||String(runId)!==runtime.GITHUB_RUN_ID||!raw||Buffer.byteLength(raw)>262144)fail();
  const event=JSON.parse(raw.toString());
  if(!['main','refs/heads/main'].includes(event.ref)||event.repository?.id!==1347578006||event.repository?.full_name!==repo||
     event.sender?.id!==290715446||event.sender?.login!=='tokenizartinfo-ops'||event.sender?.type!=='User')fail();
  const input=fields(event.inputs,['intent_id','control_hash','handoff_hash','restore_before']);
  if([input.intent_id,input.control_hash,input.handoff_hash].some(v=>!hex(v))||typeof input.restore_before!=='string'||
     !/^\d{13}$/.test(input.restore_before))fail();
  const restoreBefore=Number(input.restore_before),restoreFrom=restoreBefore-180000;
  const at=now();if(!time(at)||at<restoreFrom||at>=restoreBefore)fail();
  const scope=Object.freeze({intentId:input.intent_id,controlHash:input.control_hash,handoffHash:input.handoff_hash,
   sourceRevision,restoreFrom,restoreBefore});
  const custody=finiteGhaCustody(),credential=runtime.AFW_QA_CLOSED_TOKEN,archiveCredential=runtime.AFW_R2_BACKUPS_READ_TOKEN,
   githubToken=runtime.GITHUB_TOKEN;
  if(custody.expiresAt<restoreBefore||[credential,archiveCredential,githubToken].some(v=>!isQaGithubBearerTransportValue(v)))fail();
  const original=await readFiniteMaterialSeedForCoupledRestore({intentId:scope.intentId,sourceRevision,fetchImpl,now,signal});
  if(original.primaryEvidence.runId===runId||restoreFrom<=original.primaryEvidence.R1+30000)fail();
  const {versionId,deploymentId,configurationHash,module}=original.seed.qaPublication.qaLive;
  const qaLive={versionId,deploymentId,configurationHash,module:{name:module.name,sha256:module.sha256,bytes:module.bytes}};
  const github=createPrivateQaFiniteCoupledGitHub({scope,runId,runtime,credential:githubToken,fetchImpl,now,signal});
  const restore=createPrivateQaFiniteCoupledRestoreHttp({intent:scope,qaLive,custody,credential,archiveCredential,
   claimSend:github.claimSend,readSend:github.readSend,fetchImpl,now,signal});
  return await restore.run();
 }catch{return pending();}
 finally{ctl.abort();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=await runFiniteCoupledRestoreJob();process.stdout.write(JSON.stringify(result)+'\n');
 if(!['restored_observed','closed_observed_uncertain'].includes(result.status))process.exitCode=1;
}
