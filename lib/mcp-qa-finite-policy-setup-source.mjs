import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-profile.mjs';
import {finiteFields as fields,finiteHex as hex,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';

const origin='https://api.cloudflare.com/client/v4',account='/accounts/85d0d5dadac3341a564f22ce885e9eec';
const compiledRevision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const configKeys=['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'];
const fail=()=>{throw Error('Finite policy native entry unavailable');};
const stamp=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)?Date.parse(value):NaN;
const getTime=Date.prototype.getTime;

/** Native setup entry only. The enclosing Workflow owns the original event
 * and lease. Seed lineage and the actual deployment are read-only facts. */
export async function readPrivateQaFinitePolicyEntry({env,event,step},lease){
 const spec=AFW_FIXED_WORKFLOWS.find(row=>row.className==='PrivateQaBootstrap');
 const originalParams=event.payload,nativeDate=event.timestamp,eventTimestamp=Reflect.apply(getTime,nativeDate,[]);
 const params=fields(originalParams,['operation','intentId','sourceRevision']),{intentId,sourceRevision}=params;
 const setupInstanceId=finitePrivateQaSetupInstanceId({intentId,sourceRevision}),name=event.workflowName;
 const version=env.AFW_QA_VERSION,qaVersionId=version?.id,binding=env.AFW_QA_BOOTSTRAP,actor=env.AFW_INDEPENDENT_CLOSURE;
 const fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,stepDo=step?.do,signal=lease?.signal,assertCurrent=lease?.assertCurrent;
 if(params.operation!=='finite_private_policy_setup'||!hex(compiledRevision,40)||sourceRevision!==compiledRevision||
    !time(eventTimestamp)||!finiteUuid(qaVersionId)||!binding||typeof binding.get!=='function'||!actor||
    typeof stepDo!=='function'||typeof fetcher!=='function'||typeof readToken!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(readToken)||
    !(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail();
 let last=eventTimestamp,end=eventTimestamp+30000;
 const current=()=>{
  Reflect.apply(assertCurrent,lease,[]);
  const at=Date.now();
  if(!time(at)||at<last||at>=end||signal.aborted||lease.signal!==signal||lease.assertCurrent!==assertCurrent||
     event.timestamp!==nativeDate||Reflect.apply(getTime,nativeDate,[])!==eventTimestamp||event.payload!==originalParams||
     !same(fields(originalParams,['operation','intentId','sourceRevision']),params)||event.instanceId!==setupInstanceId||
     event.schedule!==undefined||event.workflowName!==name||name!==undefined&&name!==spec.name||
     env.AFW_QA_VERSION!==version||version.id!==qaVersionId||env.AFW_QA_BOOTSTRAP!==binding||env.AFW_INDEPENDENT_CLOSURE!==actor||
     step.do!==stepDo||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken)fail();
  last=at;return at;
 };
 current();
 const cloud=finiteSeedWire({fetchImpl:fetcher,now:Date.now,signal,origin,credential:readToken,check:current,limit:4718592,requests:5});
 const read=async path=>{current();const value=finiteCfEnvelope((await cloud.request(account+path)).value);current();return value;};
 try{
  const workflow='/workflows/'+spec.name;
  const [material,definition,run]=await Promise.all([
   readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl:fetcher,now:Date.now,signal}),
   read(workflow),
   read(workflow+'/instances/'+setupInstanceId),
  ]);
  current();
  const {T0,seedStepCompletedAt}=material.primaryEvidence,pin=material.seed.qaPublication.qaLive;
  const queuedAt=stamp(run?.queued),startedAt=stamp(run?.start);
  if(!time(T0)||!time(seedStepCompletedAt)||seedStepCompletedAt<T0||eventTimestamp<seedStepCompletedAt||
     !time(queuedAt)||!time(startedAt)||queuedAt<seedStepCompletedAt||startedAt<queuedAt||startedAt>last||
     run.status!=='running'||run.id!==undefined&&run.id!==setupInstanceId||run.error!=null||run.end!=null||run.schedule!=null||
     run.success===true||!finiteUuid(run.versionId)||run.step_count!==0||!Array.isArray(run.steps)||run.steps.length!==0||
     !same(fields(run.params,['operation','intentId','sourceRevision']),params)||pin.versionId!==qaVersionId||
     definition?.id!==spec.id||definition.name!==spec.name||definition.script_name!==spec.script||
     definition.class_name!==spec.className||definition.script_deleted===true)fail();
  end=Math.min(end,queuedAt+30000,T0+50000);current();
  const [workflowVersion,pointer,metadata]=await Promise.all([
   read(workflow+'/versions/'+run.versionId),
   read('/workers/scripts/'+spec.script+'/deployments?per_page=1'),
   read('/workers/workers/'+spec.script+'/versions/'+qaVersionId+'?include=modules'),
  ]);
  current();
  const deployed=pointer?.deployments?.[0];
  if(workflowVersion?.id!==run.versionId||workflowVersion.workflow_id!==spec.id||
     workflowVersion.class_name!==spec.className||workflowVersion.language!=='javascript'||
     !Array.isArray(pointer?.deployments)||pointer.deployments.length!==1||deployed.id!==pin.deploymentId||
     deployed.strategy!=='percentage'||!Array.isArray(deployed.versions)||deployed.versions.length!==1||
     deployed.versions[0].version_id!==qaVersionId||deployed.versions[0].percentage!==100)fail();
  qualifyFiniteWorkerVersion({metadata,pin,role:'qa',closed:false});
  const configuration=Object.fromEntries(configKeys.map(key=>[key,metadata[key]]));
  qualifyFiniteSourceRoleMetadata({manifest:material.seed.manifest,role:'qaLive',metadata:configuration});
  current();
  return Object.freeze({setupInstanceId,sourceRevision,qaVersionId,eventTimestamp,queuedAt,startedAt,T0});
 }finally{cloud.close();}
}

/** The actor must independently qualify original forwarding, the private
 * owner context, its permission and writer lineage before admitting effects. */
export async function readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease){
 void ctx;void env;void intentId;void sourceRevision;void originalLease;
 throw Error('Finite policy source unavailable');
}
