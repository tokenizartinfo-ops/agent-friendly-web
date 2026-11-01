import {qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteSourcePackage,qualifyFiniteSourceRoleMetadata} from './mcp-qa-finite-source-authority.mjs';
import {validateFinitePackageManifest} from './mcp-qa-finite-seed.mjs';
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa';
const fail=()=>{throw Error('Finite QA publication unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
export function finiteQaPointer(response){
 const result=finiteCfEnvelope(response.value),d=result?.deployments?.[0];
 if(!Array.isArray(result?.deployments)||result.deployments.length!==1||!uuid(d.id)||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();
 return Object.freeze({versionId:d.versions[0].version_id,deploymentId:d.id});
}
/** Actual bytes first; independently approved SOURCE semantics are mandatory.
 * No caller expected-hash callback, override locator or source-success DTO. */
export async function readFiniteQaPublication({manifest,request,check}){
 const m=validateFinitePackageManifest(manifest);qualifyFiniteSourcePackage({manifest:m});check();
 const first=finiteQaPointer(await request(ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1'));check();
 const closed=QA_CLOUD_CLOSED_PINS.qaClosed,roles={};
 if(first.versionId===closed.id)fail();
 for(const role of ['qaLive','qaClosed']){
  const descriptor=m.modules[role],versionId=role==='qaLive'?first.versionId:closed.id;
  if(role==='qaClosed'&&(descriptor.module.name!==closed.module.name||descriptor.module.sha256!==closed.module.sha256||descriptor.module.bytes!==closed.module.bytes))fail();
  const response=await request(ROOT+'/workers/workers/'+QA+'/versions/'+versionId+'?include=modules');check();
  const metadata=finiteCfEnvelope(response.value),{exports,...module}=descriptor.module;
  const configurationHash=qaClosedConfigurationHash(metadata);
  if(role==='qaClosed'&&configurationHash!==closed.configurationHash)fail();
  qualifyFiniteWorkerVersion({metadata,pin:{versionId,module,configurationHash},role:'qa',closed:role==='qaClosed'});
  if(!Array.isArray(metadata.exports)||JSON.stringify(metadata.exports)!==JSON.stringify(exports))fail();
  if(role==='qaClosed'&&(metadata.bindings.length!==closed.bindingCount||metadata.bindings.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED')).length!==closed.flagCount))fail();
  // 4C validates exact profile/binding semantics and their independently built
  // manifest commitments, exports/classes/namespaces and closed history.
  const configuration=Object.fromEntries(['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'].map(k=>[k,metadata[k]??(k==='containers'?[]:k==='usage_model'?'standard':undefined)]));
  const qualified=qualifyFiniteSourceRoleMetadata({manifest:m,role,metadata:configuration});check();
  roles[role]={versionId,...(role==='qaLive'?{deploymentId:first.deploymentId}:{}),module:descriptor.module,configurationHash,publicStatic:qualified.publicStatic};
 }
 const last=await request(ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1');check();
 if(JSON.stringify(finiteQaPointer(last))!==JSON.stringify(first))fail();
 return Object.freeze({purpose:'afw.finite-qa-publication.v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:QA,...roles,observedAt:last.date});
}
