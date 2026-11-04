import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
export const FINITE_PREPARATION_CLEANUP_PREFIX='afw.finite-preparation-cleanup.v1:';
const fail=()=>{throw Error('Finite preparation cleanup record unavailable');};
const schemas={
 Enrollment:'capsuleHash planHash armAckHash activationCompletionHash entryHash materialHash sourceRevision sourceTree qaVersionId initialInstanceId actorId preconnectionId I0 C0 C1 readerId publisherId readerExpiresAt publisherExpiresAt manifestHash baselineVersionId baselineDeploymentId ownerSourceHash preconnectionHash stageApprovalHash configurationApprovalHash issuedAt deadline'.split(' '),
 Ack:['enrollmentHash','stateHash','alarmAt','acknowledgedAt']
};
const purpose=k=>'afw.finite-preparation-cleanup-'+k.toLowerCase()+'.v1';
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
function validate(kind,input){
 if(typeof kind!=='string'||!Object.hasOwn(schemas,kind))fail();
 const v=own(fields(input,['purpose',...schemas[kind],'recordHash'])),{recordHash,...body}=v;
 if(v.purpose!==purpose(kind)||!hex(recordHash)||hash(v.purpose,body)!==recordHash||Buffer.byteLength(canonical(v))>8192)fail();
 for(const k of schemas[kind]){
  if(k.endsWith('Hash')&&!hex(v[k]))fail();
  if(['I0','C0','C1','readerExpiresAt','publisherExpiresAt','issuedAt','deadline','alarmAt','acknowledgedAt'].includes(k)&&!time(v[k]))fail();
 }
 if(kind==='Enrollment'){
  const p=QA_CLOUD_CLOSED_PINS.canary;
  if(!hex(v.sourceRevision,40)||!hex(v.sourceTree,40)||!hex(v.actorId)||!hex(v.preconnectionId)||!uuid(v.qaVersionId)||typeof v.initialInstanceId!=='string'||!/^afw-finite-initial-[a-f0-9]{64}$/.test(v.initialInstanceId)||v.C0!==v.I0+900000||v.C1!==v.C0+180000||v.readerExpiresAt<v.C1||v.publisherExpiresAt<v.C1||v.readerId!=='9aa97ad1fc9afe3021cf69ea497d5190'||v.publisherId!=='05718105dcdfc92e55cc3624172c2740'||v.baselineVersionId!==p.id||v.baselineDeploymentId!==p.deploymentId||v.issuedAt<v.I0||v.deadline<=v.issuedAt||v.deadline>v.C0||v.deadline-v.issuedAt>5000)fail();
 }
 return v;
}
export function sealFinitePreparationCleanupRecord(kind,input){
 if(typeof kind!=='string'||!Object.hasOwn(schemas,kind))fail();
 const value=own(fields(input,schemas[kind])),body={purpose:purpose(kind),...value};return validate(kind,{...body,recordHash:hash(body.purpose,body)});
}
export function encodeFinitePreparationCleanupRecord(kind,input){return canonical(validate(kind,input));}
export function decodeFinitePreparationCleanupRecord(kind,raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>8192)fail();
 const v=validate(kind,JSON.parse(raw));if(canonical(v)!==raw)fail();return v;
}
