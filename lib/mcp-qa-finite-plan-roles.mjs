import {qualifyFiniteInitialHistoricalBaseline} from './mcp-qa-finite-historical-source.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteFields as fields,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
import {QA_CLOUD_CLOSED_PINS as closed} from './mcp-qa-cloud-closed-pins.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-profile.mjs';

const fail=()=>{throw Error('Finite plan deployment evidence unavailable');};
const timestamp=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z$/.test(value)?Date.parse(value):NaN;
const configurationKeys=['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'];
const worker={qa:closed.qaClosed.name,canary:closed.canary.name,operator:closed.operator.name};
const list=(role,n)=>'/workers/scripts/'+worker[role]+'/deployments?per_page='+n;
const version=(role,id)=>'/workers/workers/'+worker[role]+'/versions/'+id+'?include=modules';
const known=(role,id)=>'/workers/scripts/'+worker[role]+'/deployments/'+id;
const descriptor=m=>({name:m.name,sha256:m.sha256,bytes:m.bytes});
const pin=(row,module,configurationHash)=>Object.freeze({versionId:row.versionId,deploymentId:row.deploymentId,configurationHash,module:Object.freeze(descriptor(module))});

function deployment(row,now){
 const createdAt=timestamp(row?.created_on);
 if(!finiteUuid(row?.id)||!time(createdAt)||createdAt>now||row.strategy!=='percentage'||
    !Array.isArray(row.versions)||row.versions.length!==1||row.versions[0]?.percentage!==100||
    !finiteUuid(row.versions[0]?.version_id))fail();
 return Object.freeze({deploymentId:row.id,versionId:row.versions[0].version_id,createdAt});
}

export function readFiniteDeploymentPair(value,{deploymentId,versionId,previousVersionId,now}){
 const list=value?.deployments;
 if(!time(now)||!Array.isArray(list)||list.length<2||list.length>3)fail();
 const [current,previous]=list.slice(0,2).map(row=>deployment(row,now));
 const ids=new Set(list.map(row=>row.id));
 if(ids.size!==list.length||current.deploymentId!==deploymentId||
    current.versionId!==versionId||previous.versionId!==previousVersionId||
    list.some((row,i)=>!finiteUuid(row?.id)||!time(timestamp(row?.created_on))||i>0&&timestamp(row.created_on)>=timestamp(list[i-1].created_on)))fail();
 return Object.freeze({current,previous});
}
function active(value,expected,now){
 if(!Array.isArray(value?.deployments)||value.deployments.length!==1)fail();
 const row=deployment(value.deployments[0],now);
 if(row.versionId!==expected.versionId||row.deploymentId!==expected.deploymentId)fail();
 return row;
}

/** GET-only evidence for the five fixed AFW roles. Caller owns the original
 * bounded provider transport. These observations cannot grant an effect. */
export async function readPrivateQaFinitePlanRoles({material,installed,read,check}){
 const {manifest,qaPublication}=material.seed,{qaLive,qaClosed}=qaPublication;
 const {receipt,original}=installed,{rollback}=original;
 if(qaClosed.versionId!==closed.qaClosed.id||qaClosed.configurationHash!==closed.qaClosed.configurationHash||
    rollback.versionId!==closed.canary.id||rollback.deploymentId!==closed.canary.deploymentId||
    !same(descriptor(rollback.module),descriptor(closed.canary.module))||
    receipt.qaVersionId!==qaLive.versionId)fail();
 const listed=(raw,limit)=>{
  const value=finiteCfEnvelope(raw),info=raw.result_info;
  if(info!==undefined&&(info.page!==undefined&&info.page!==1||
     info.per_page!==undefined&&info.per_page!==limit||info.count!==undefined&&info.count!==value?.deployments?.length))fail();
  return value;
 };
 const get=async path=>{check();const value=await read(path);check();return value;};
 const qaExpected={deploymentId:qaLive.deploymentId,versionId:qaLive.versionId,previousVersionId:qaClosed.versionId};
 const operatorExpected={deploymentId:closed.operator.deploymentId,versionId:closed.operator.id};
 const canaryExpected={deploymentId:receipt.deploymentId,versionId:receipt.versionId};
 const readPointers=()=>Promise.all([get(list('qa',3)),get(list('canary',1)),get(list('operator',1))]);
 const decodePointers=([qa,canary,operator])=>{
  const now=check();
  return Object.freeze({qa:readFiniteDeploymentPair(listed(qa,3),{...qaExpected,now}),
   canary:active(listed(canary,1),canaryExpected,now),operator:active(listed(operator,1),operatorExpected,now)});
 };
 const before=decodePointers(await readPointers());
 const values=await Promise.all([
  get(known('qa',before.qa.previous.deploymentId)),
  get(known('canary',rollback.deploymentId)),
  get(version('qa',qaLive.versionId)),
  get(version('qa',qaClosed.versionId)),
  get(version('canary',receipt.versionId)),
  get(version('canary',rollback.versionId)),
  get(version('operator',closed.operator.id)),
 ]);
 const [qaPrior,canaryPrior,liveQa,closedQa,liveCanary,closedCanary,closedOperator]=values.map(finiteCfEnvelope);
 const canaryBaseline=deployment(canaryPrior,check()),qaBaseline=deployment(qaPrior,check());
 if(!same(qaBaseline,before.qa.previous)||canaryBaseline.deploymentId!==rollback.deploymentId||
    canaryBaseline.versionId!==rollback.versionId||canaryBaseline.createdAt>=before.canary.createdAt||
    before.qa.current.createdAt>qaPublication.observedAt||before.canary.createdAt>receipt.installedAt||
    before.operator.createdAt>original.T0)fail();
 const qualifiedRollback=qualifyFiniteInitialHistoricalBaseline(closedCanary);
 if(qualifiedRollback.metadataProof.rawConfigurationHash!==rollback.rawConfigurationHash)fail();
 const closedCanaryMetadata={...qualifiedRollback.configuration,id:closedCanary.id,modules:closedCanary.modules,urls:closedCanary.urls};
 const deployments=Object.freeze({
  qaLive:pin(before.qa.current,manifest.modules.qaLive.module,qaLive.configurationHash),
  qaClosed:pin(qaBaseline,closed.qaClosed.module,closed.qaClosed.configurationHash),
  canaryLive:pin(before.canary,manifest.modules.canaryLive.module,receipt.restorationHash),
  canaryClosed:pin(canaryBaseline,closed.canary.module,closed.canary.configurationHash),
  operatorClosed:pin(before.operator,closed.operator.module,closed.operator.configurationHash),
 });
 for(const [role,kind,isClosed,metadata] of [
  ['qaLive','qa',false,liveQa],['qaClosed','qa',true,closedQa],
  ['canaryLive','canary',false,liveCanary],['canaryClosed','canary',true,closedCanaryMetadata],
  ['operatorClosed','operator',true,closedOperator],
 ]){
  const target=deployments[role],m=manifest.modules[role];
  if(!same(target.module,descriptor(m.module))||isClosed&&m.provenance.versionId!==target.versionId)fail();
  qualifyFiniteWorkerVersion({metadata,pin:target,role:kind,closed:isClosed});
  if(!isClosed)qualifyFiniteSourceRoleMetadata({manifest,role,metadata:Object.fromEntries(configurationKeys.map(k=>[k,metadata[k]]))});
 }
 const bind=(version,name,type)=>{
  const row=version.bindings.find(b=>b.name===name);
  if(row?.type!==type)fail();return row;
 };
 const qaD1Id=bind(liveQa,'AFW_QA_DB','d1').id,releaseD1Id=bind(liveQa,'RELEASE_DB','d1').id;
 const namespaceId=bind(liveCanary,'AFW_DOSSIER_EVENTS_NODE','durable_object_namespace').namespace_id;
 if(!finiteUuid(qaD1Id)||!finiteUuid(releaseD1Id)||qaD1Id===releaseD1Id||
    releaseD1Id!==bind(liveCanary,'DB','d1').id||releaseD1Id!==bind(closedOperator,'RELEASE_DB','d1').id||
    namespaceId!==bind(liveQa,'AFW_RELEASE_EVENTS_NODE','durable_object_namespace').namespace_id||
    namespaceId!==installed.record.policy.observation.namespaceId||
    namespaceId!==installed.record.policy.observation.applicationId)fail();
 const after=decodePointers(await readPointers());
 if(!same(before,after))fail();
 check();
 return Object.freeze({deployments,resources:Object.freeze({applicationId:namespaceId,namespaceId,qaD1Id,releaseD1Id})});
}
