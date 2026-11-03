import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex,initialInstanceId} from './mcp-qa-finite-initial-material-records.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
const fail=()=>{throw Error('Finite initial cleanup record unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0;
export const FINITE_INITIAL_CLEANUP_PREFIX='afw.finite-initial-cleanup.v1:';
export const FINITE_INITIAL_CLEANUP_KINDS=Object.freeze({plan:'Plan',state:'State','arm-ack':'ArmAck','activation-send':'ActivationSend','activation-ack':'ActivationAck','activation-completion':'ActivationCompletion','restore-send':'RestoreSend','restore-ack':'RestoreAck',receipt:'Receipt'});
const schemas={
 Plan:['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','commandId','I0','initialDeadline','forwardDeadline','C0','C1','candidateVersionId','moduleHash','moduleBytes','configuration','configurationHash','manifestHash','baselineVersionId','baselineDeploymentId','readerId','publisherId','readerExpiresAt','publisherExpiresAt'],
 State:['planHash','deliveries','status','nextAt','previousHash'],
 ArmAck:['planHash','stateHash','alarmAt','acknowledgedAt'],
 ActivationSend:['planHash','entryHash','materialHash','candidateVersionId','bodyHash','annotation','issuedAt','deadline'],
 ActivationAck:['planHash','sendHash','deploymentId','acknowledgedAt'],
 ActivationCompletion:['planHash','sendHash','ackHash','candidateVersionId','deploymentId','settledAt','observedAt'],
 RestoreSend:['planHash','activationCompletionHash','bodyHash','annotation','issuedAt','deadline'],
 RestoreAck:['planHash','sendHash','deploymentId','acknowledgedAt'],
 Receipt:['planHash','outcome','deploymentId','restoreAckHash','observedAt']
};
const purpose=k=>'afw.finite-initial-cleanup-'+k.toLowerCase()+'.v1';
function validate(kind,input){
 if(!Object.hasOwn(schemas,kind))fail();
 const v=own(fields(input,['purpose',...schemas[kind],'recordHash'])),{recordHash,...body}=v;
 if(v.purpose!==purpose(kind)||!hex(recordHash)||hash(v.purpose,body)!==recordHash)fail();
 for(const k of ['entryHash','materialHash','planHash','moduleHash','configurationHash','manifestHash','stateHash','sendHash','ackHash','bodyHash','activationCompletionHash'])if(Object.hasOwn(v,k)&&!hex(v[k]))fail();
 for(const k of ['qaVersionId','candidateVersionId','deploymentId','baselineVersionId','baselineDeploymentId'])if(Object.hasOwn(v,k)&&!uuid(v[k]))fail();
 for(const k of ['I0','initialDeadline','forwardDeadline','C0','C1','readerExpiresAt','publisherExpiresAt','alarmAt','acknowledgedAt','issuedAt','deadline','settledAt','observedAt'])if(Object.hasOwn(v,k)&&!time(v[k]))fail();
 if(kind==='Plan'){
  const p=QA_CLOUD_CLOSED_PINS.canary;
  if(!hex(v.sourceRevision,40)||!hex(v.sourceTree,40)||v.initialInstanceId!==initialInstanceId(v)||v.initialDeadline!==v.I0+300000||v.forwardDeadline>v.initialDeadline||v.forwardDeadline<=v.I0||v.C0!==v.I0+900000||v.C1!==v.C0+180000||v.readerExpiresAt<v.C1||v.publisherExpiresAt<v.C1||v.readerId!=='9aa97ad1fc9afe3021cf69ea497d5190'||v.publisherId!=='05718105dcdfc92e55cc3624172c2740'||v.baselineVersionId!==p.id||v.baselineDeploymentId!==p.deploymentId||[p.id,v.qaVersionId].includes(v.candidateVersionId)||!Number.isSafeInteger(v.moduleBytes)||v.moduleBytes<1||v.moduleBytes>2097152||restorationConfigurationHash(v.configuration)!==v.configurationHash)fail();
  qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:v.configuration});
 }
 if(kind==='State'&&(!Number.isSafeInteger(v.deliveries)||v.deliveries<0||v.deliveries>3||!['pending','processing','admin_pending','complete'].includes(v.status)||v.nextAt!==null&&!time(v.nextAt)||v.previousHash!==null&&!hex(v.previousHash)))fail();
 if(kind==='Receipt'&&(!['never_activated','restored'].includes(v.outcome)||v.restoreAckHash!==null&&!hex(v.restoreAckHash)||v.outcome==='never_activated'&&v.restoreAckHash!==null||v.outcome==='restored'&&!hex(v.restoreAckHash)))fail();
 if(kind.endsWith('Send')&&(typeof v.annotation!=='string'||v.annotation.length>128||v.deadline<=v.issuedAt||v.deadline-v.issuedAt>5000))fail();
 if(kind==='ActivationCompletion'&&v.observedAt<v.settledAt)fail();
 return v;
}
/** Recovery DATA codec; no activation producer, admission or persistence. */
export function sealFiniteInitialCleanupRecord(kind,input){const body={purpose:purpose(kind),...own(input)};return validate(kind,{...body,recordHash:hash(body.purpose,body)});}
export function encodeFiniteInitialCleanupRecord(kind,input){return canonical(validate(kind,input));}
export function decodeFiniteInitialCleanupRecord(kind,raw){if(typeof raw!=='string'||Buffer.byteLength(raw)>65536)fail();const v=validate(kind,JSON.parse(raw));if(canonical(v)!==raw)fail();return v;}
