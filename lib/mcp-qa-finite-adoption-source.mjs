import {readFinitePolicyOriginStep,finitePolicyStepName,FINITE_POLICY_INSTALL_STEP} from './mcp-qa-finite-policy-origin.mjs';
import {createHash} from 'node:crypto';
import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finitePrivateQaSetupInstanceId,validatePrivateQaFiniteSetupCompletion} from './mcp-qa-finite-adoption.mjs';
import {FINITE_QA,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';

const definition=AFW_FIXED_WORKFLOWS.find(workflow=>workflow.className==='PrivateQaBootstrap');
const path='/workflows/'+definition.name;
const canary='agent-friendly-web-delegated-canary';
const fail=()=>{throw Error('Finite private setup completion unavailable');};
const canonical=value=>JSON.stringify(value,(_,item)=>item&&typeof item==='object'&&!Array.isArray(item)
 ?Object.fromEntries(Object.entries(item).sort(([a],[b])=>a<b?-1:a>b?1:0)):item);
function output(value){
 if(typeof value!=='string'||Buffer.byteLength(value)>8192)fail();
 return fields(data(JSON.parse(value)),['status','receipt']);
}
function deployment(readback,pin){
 const row=readback?.deployments?.[0];
 if(!row||row.id!==pin.deploymentId||row.strategy!=='percentage'||!Array.isArray(row.versions)||row.versions.length!==1||
    row.versions[0].version_id!==pin.versionId||row.versions[0].percentage!==100)fail();
}

/** Internal GET-only setup receipt reader. The observer passes its already
 * qualified seed and fixed provider capability, under the original parent.
 * The receipt cannot grant writes or substitute for the native cleanup proof. */
export async function readPrivateQaFiniteSetupCompletion(options){
 const {intentId,sourceRevision,parent,expected,read}=fields(options,['intentId','sourceRevision','parent','expected','read']);
 const x=fields(data(expected),['qa','seedHash','canaryModuleHash','canaryPublicStaticHash','seedCompletedAt','T0']);
 const qa=fields(x.qa,['versionId','deploymentId']),clock=fields(parent,['signal','deadline','check']);
 if(typeof read!=='function'||typeof clock.check!=='function'||!(clock.signal instanceof AbortSignal)||
    !time(clock.deadline)||!time(x.T0)||!time(x.seedCompletedAt)||x.seedCompletedAt<x.T0||x.seedCompletedAt>=x.T0+50000||
    [qa.versionId,qa.deploymentId].some(v=>!finiteUuid(v))||
    [x.seedHash,x.canaryModuleHash,x.canaryPublicStaticHash].some(v=>!hex(v)))fail();

 function current(){
  if(clock.signal.aborted||parent.signal!==clock.signal||parent.check!==clock.check||parent.deadline!==clock.deadline)fail();
  const now=clock.check();if(!time(now)||now<x.seedCompletedAt||now>=clock.deadline)fail();return now;
 }
 async function get(resource){current();const value=await read(resource);current();return value;}
 const id=finitePrivateQaSetupInstanceId({intentId,sourceRevision});
 const run=await get(path+'/instances/'+id);
 if(run?.status!=='complete'||run.success!==true||run.error!=null||run.schedule!=null||!finiteUuid(run.versionId)||
    !Array.isArray(run.steps)||run.step_count!==2||run.steps.length!==2)fail();
 const params=fields(data(run.params),['operation','intentId','sourceRevision']);
 if(params.operation!=='finite_private_policy_setup'||params.intentId!==intentId||params.sourceRevision!==sourceRevision)fail();
 const queued=Date.parse(run.queued),started=Date.parse(run.start),ended=Date.parse(run.end),[originStep,step]=run.steps;
 const origin=readFinitePolicyOriginStep({step:originStep,refs:{intentId,sourceRevision},qaVersionId:qa.versionId,
  queuedAt:queued,startedAt:started,seedCompletedAt:x.seedCompletedAt,T0:x.T0,observedAt:current()});
 const stepStarted=Date.parse(step?.start),stepEnded=Date.parse(step?.end);
 if([queued,started,ended,stepStarted,stepEnded].some(v=>!time(v))||
    queued<x.seedCompletedAt||started<queued||stepStarted<origin.completedAt||stepEnded<stepStarted||ended<stepEnded||
    ended>=Math.min(x.T0+50000,origin.native.eventTimestamp+30000,queued+30000)||ended>current()||!finitePolicyStepName(step,FINITE_POLICY_INSTALL_STEP)||step.type!=='step'||step.success!==true||
    !Array.isArray(step.attempts)||step.attempts.length!==1||step.attempts[0]?.success!==true)fail();
 const completed=output(run.output),stepResult=output(step.output);
 if(completed.status!=='installed'||canonical(completed)!==canonical(stepResult))fail();
 const receipt=completed.receipt;
 if(receipt.moduleHash!==x.canaryModuleHash||receipt.publicStaticHash!==x.canaryPublicStaticHash||
    receipt.versionId===receipt.baselineVersionId||receipt.deploymentId===receipt.baselineDeploymentId||
    receipt.installedAt<stepStarted||receipt.installedAt>stepEnded)fail();
 const instance={definitionName:definition.name,instanceId:id,status:'complete',sourceRevision,qaVersionId:qa.versionId,
  completedAt:ended,outputHash:createHash('sha256').update(canonical(completed)).digest('hex')};
 const qualify=()=>validatePrivateQaFiniteSetupCompletion({receipt,instance,observedAt:current()},
  {intentId,sourceRevision,qaVersionId:qa.versionId,seedHash:x.seedHash,T0:x.T0,now:current()});
 qualify();

 const [version,qaDeployments,canaryDeployments]=await Promise.all([
  get(path+'/versions/'+run.versionId),
  get('/workers/scripts/'+FINITE_QA+'/deployments'),
  get('/workers/scripts/'+canary+'/deployments'),
 ]);
 if(version.id!==run.versionId||version.workflow_id!==definition.id||version.class_name!==definition.className||version.language!=='javascript')fail();
 deployment(qaDeployments,qa);
 deployment(canaryDeployments,receipt);
 return qualify();
}
