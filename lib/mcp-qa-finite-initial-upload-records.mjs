import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {initialUploadSha as sha} from './mcp-qa-finite-initial-upload-wire.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
const fail=()=>{throw Error('Finite initial upload record unavailable');};
const UUID=/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/;
const common=['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId'];
const schemas={
 Backup:[...common,'baselineVersionId','baselineDeploymentId','moduleHash','moduleBytes','configurationHash','rawConfigurationHash','historicalSourceRevision','historicalSourceTree','rawConfiguration','configuration','chunks','retainedIds'],
 Chunk:['manifestHash','index','bytes','sha256','content'],
 Send:[...common,'manifestHash','moduleHash','baselineVersionId','baselineDeploymentId','effect','accountId','workerName','method','path','bodyHash','requestHash','issuedAt','deadline'],
 Ack:['sendHash','uploadedVersionId','acknowledgedAt'],
 Receipt:[...common,'manifestHash','sendHash','ackHash','uploadedVersionId','moduleHash','configurationHash','baselineVersionId','baselineDeploymentId','beforeObservedAt','afterObservedAt','recordedAt','authorizesEffects','completePackage','operationalReadiness']
};
const purpose=k=>'afw.finite-initial-upload-'+k.toLowerCase()+'.v1';
function validate(kind,value){
 if(!Object.hasOwn(schemas,kind))fail();
 const v=own(fields(value,['purpose',...schemas[kind],'recordHash']));
 if(v.purpose!==purpose(kind))fail();
 const {recordHash,...body}=v;if(!hex(recordHash)||hash(v.purpose,body)!==recordHash)fail();
 for(const [k,x]of Object.entries(v)){
  if(k.endsWith('Hash')&&!hex(x)||['sourceRevision','sourceTree','historicalSourceRevision','historicalSourceTree'].includes(k)&&!hex(x,40)||['qaVersionId','baselineVersionId','baselineDeploymentId','uploadedVersionId'].includes(k)&&!UUID.test(x))fail();
 }
 if(common.every(k=>Object.hasOwn(v,k))&&(!/^afw-finite-initial-[a-f0-9]{64}$/.test(v.initialInstanceId)))fail();
 if(Object.hasOwn(v,'baselineVersionId')&&v.baselineVersionId!=='2607abae-cec3-4e35-89eb-8b8572262b54')fail();
 for(const k of ['issuedAt','deadline','acknowledgedAt','beforeObservedAt','afterObservedAt','recordedAt'])if(Object.hasOwn(v,k)&&(!Number.isSafeInteger(v[k])||v[k]<0))fail();
 if(kind==='Chunk'){
  if(!Number.isSafeInteger(v.index)||v.index<0||v.index>=64||!Number.isSafeInteger(v.bytes)||v.bytes<1||v.bytes>32768||!hex(v.sha256)||typeof v.content!=='string'||v.content.length!==4*Math.ceil(v.bytes/3))fail();
  const bytes=Buffer.from(v.content,'base64');if(bytes.length!==v.bytes||bytes.toString('base64')!==v.content||sha(bytes)!==v.sha256)fail();
 }
 if(kind==='Backup'){
  const p=QA_CLOUD_CLOSED_PINS.canary;if(v.moduleHash!==p.module.sha256||v.moduleBytes!==p.module.bytes||v.baselineDeploymentId!==p.deploymentId||v.configurationHash!==p.configurationHash||restorationConfigurationHash(v.configuration)!==v.configurationHash||restorationConfigurationHash(v.rawConfiguration)!==v.rawConfigurationHash)fail();
  if(!Number.isSafeInteger(v.moduleBytes)||v.moduleBytes<1||v.moduleBytes>2097152||!Array.isArray(v.chunks)||v.chunks.length!==Math.ceil(v.moduleBytes/32768)||v.chunks.length>64)fail();
  let size=0;for(const [index,c]of v.chunks.entries()){fields(c,['index','bytes','sha256']);if(c.index!==index||!hex(c.sha256)||c.bytes!==Math.min(32768,v.moduleBytes-size))fail();size+=c.bytes;}
  fields(v.retainedIds,['preconnectionId','trialId','activationKey','withdrawalRequestId','saveIdempotencyKey']);
  for(const k of ['preconnectionId','trialId','activationKey'])if(!hex(v.retainedIds[k]))fail();
  for(const k of ['withdrawalRequestId','saveIdempotencyKey'])if(!UUID.test(v.retainedIds[k]))fail();
  for(const cfg of [v.rawConfiguration,v.configuration]){
   if(!Array.isArray(cfg.bindings))fail();
   for(const b of cfg.bindings)if(b.type==='secret_text')fields(b,['name','type']);
  }
 }
 if(kind==='Send'&&(v.effect!=='upload'||v.accountId!=='85d0d5dadac3341a564f22ce885e9eec'||v.workerName!=='agent-friendly-web-delegated-canary'||v.method!=='POST'||v.path!=='/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false'||v.deadline<=v.issuedAt||v.deadline-v.issuedAt>5000))fail();
 if(kind==='Receipt'&&(v.authorizesEffects!==false||v.completePackage!==false||v.operationalReadiness!==false||v.afterObservedAt<v.beforeObservedAt||v.recordedAt<v.afterObservedAt))fail();
 return v;
}
/** Pure bounded factual codecs only: no persistence, caller admission or capability. */
export function sealFiniteInitialUploadRecord(kind,value){
 const body=own({purpose:purpose(kind),...own(value)});return validate(kind,{...body,recordHash:hash(body.purpose,body)});
}
export function encodeFiniteInitialUploadRecord(kind,value){return canonical(validate(kind,value));}
export function decodeFiniteInitialUploadRecord(kind,raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>65536)fail();
 const v=validate(kind,JSON.parse(raw));if(canonical(v)!==raw)fail();return v;
}
