import {readPrivateQaFiniteLauncherPayload} from './mcp-qa-finite-launcher.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {finiteFields as fields,finiteData as data,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteLauncherInstanceId,hashFiniteLaunchRecord,validateFiniteLaunchPrepared} from './mcp-qa-finite-launch-records.mjs';

const label='finite-launch-prepare';
const fail=()=>{throw Error('Finite launcher provider evidence unavailable');};
const stamp=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)?Date.parse(value):NaN;

/** Read the successful provider step that acknowledged this exact durable
 * preparation. The caller retains its existing parent and GET-only transport. */
export async function readPrivateQaFiniteLauncherPrepared({plan,prepared,phase,check,read}){
 if(!['create','confirm'].includes(phase)||typeof check!=='function'||typeof read!=='function')fail();
 const spec=AFW_FIXED_WORKFLOWS.find(item=>item.className==='PrivateQaBootstrap');
 const path='/workflows/'+spec.name;
 const {intentId,sourceRevision}=validateFiniteLaunchPrepared(prepared);
 const instance=finiteLauncherInstanceId({intentId,sourceRevision});
 if(intentId!==plan.intentId||sourceRevision!==plan.source.revision||instance!==plan.workflows.launcher||
    prepared.launcherId!==instance||prepared.qaVersionId!==plan.deployments.qaLive.versionId||
    prepared.bundleHash!==plan.bundleHash||prepared.nominalId!==plan.workflows.confirmation||
    prepared.armAckBy!==plan.launchPolicy.armAckBy||prepared.launchAt!==plan.launchPolicy.launchAt||
    prepared.lastCreateAt!==plan.launchPolicy.lastCreateAt)fail();
 const get=async resource=>{check();const result=await read(resource);check();return result;};
 const run=await get(path+'/instances/'+instance);
 const status=run?.status;
 if(!(status==='running'||status==='waiting'||phase==='confirm'&&status==='complete')||
    run.id!==undefined&&run.id!==instance||run.schedule!=null||run.error!=null||!finiteUuid(run.versionId)||
    status==='complete'&&run.success!==true||
    !Array.isArray(run.steps)||run.steps.length<1||run.steps.length>12||run.step_count!==run.steps.length)fail();
 // Cloudflare keeps the original serialized payload for some REST-created
 // instances. Use the same exact decoder as the native Workflow entry.
 const params=readPrivateQaFiniteLauncherPayload(run.params);
 if(params.intentId!==intentId||params.sourceRevision!==sourceRevision)fail();

 const originals=run.steps.filter(step=>typeof step?.name==='string'&&(step.name===label||step.name.startsWith(label+'-')));
 if(originals.length!==1)fail();
 const step=originals[0];
 if(![label,label+'-1'].includes(step.name)||step.type!=='step'||step.success!==true||
    !Array.isArray(step.attempts)||step.attempts.length!==1||step.attempts[0]?.success!==true||
    typeof step.output!=='string'||Buffer.byteLength(step.output)>8192)fail();
 const receipt=fields(data(JSON.parse(step.output)),['purpose','prepared','preparedHash','acknowledgedAt']);
 const hash=hashFiniteLaunchRecord(prepared);
 if(receipt.purpose!=='afw.finite-launcher-prepared.v1'||receipt.preparedHash!==hash||
    !same(validateFiniteLaunchPrepared(receipt.prepared),validateFiniteLaunchPrepared(prepared)))fail();

 const queued=stamp(run.queued),started=stamp(run.start),stepStart=stamp(step.start),stepEnd=stamp(step.end),at=check();
 if([queued,started,stepStart,stepEnd,receipt.acknowledgedAt].some(x=>!time(x))||
    queued<plan.T0||started<queued||stepStart<started||prepared.preparedAt<stepStart||
    receipt.acknowledgedAt<prepared.preparedAt||stepEnd<receipt.acknowledgedAt||
    stepEnd>prepared.armAckBy||stepEnd>at)fail();
 if(status==='complete'){
  const ended=stamp(run.end);if(!time(ended)||ended<stepEnd||ended>at)fail();
 }
 const version=await get(path+'/versions/'+run.versionId);
 if(version?.id!==run.versionId||version.workflow_id!==spec.id||version.class_name!==spec.className||version.language!=='javascript')fail();
 return Object.freeze({instance,preparedHash:hash,acknowledgedAt:receipt.acknowledgedAt,completedAt:stepEnd});
}
