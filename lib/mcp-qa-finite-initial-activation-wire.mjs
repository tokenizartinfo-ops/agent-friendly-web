import {createHash} from 'node:crypto';
import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {encodeFiniteInitialEntry,decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';

// Pure unmounted data construction. No journal write, network call, live clock,
// admission or eligibility is implied by the returned values.
const fail=()=>{throw Error('Finite initial activation wire unavailable');};
const sha=value=>createHash('sha256').update(value).digest('hex');
const record=(kind,value)=>decode(kind,encode(kind,value));
const uuid=value=>typeof value==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value);
const time=value=>Number.isSafeInteger(value)&&value>=0;
const path='/workers/scripts/agent-friendly-web-delegated-canary/deployments';
function bodyFor(plan){
 const annotation='afw-finite-initial-activate-'+plan.recordHash;
 return {annotation,body:JSON.stringify({strategy:'percentage',versions:[{version_id:plan.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}})};
}
function checkedSend(plan,input){
 const send=record('ActivationSend',input),{annotation,body}=bodyFor(plan);
 if(send.planHash!==plan.recordHash||send.entryHash!==plan.entryHash||send.materialHash!==plan.materialHash||send.candidateVersionId!==plan.candidateVersionId||send.annotation!==annotation||send.bodyHash!==sha(body)||send.issuedAt<plan.I0||send.deadline>plan.forwardDeadline)fail();
 return send;
}
function checkedAck(plan,send,input){
 const ack=record('ActivationAck',input);
 if(ack.planHash!==plan.recordHash||ack.sendHash!==send.recordHash||ack.deploymentId===plan.baselineDeploymentId||ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline)fail();
 return ack;
}
function pointer(plan,value,deploymentId){
 const {annotation}=bodyFor(plan),v=value;
 if(!v||typeof v!=='object'||!uuid(v.id)||v.id!==deploymentId||v.strategy!=='percentage'||!Array.isArray(v.versions)||v.versions.length!==1||v.versions[0].version_id!==plan.candidateVersionId||v.versions[0].percentage!==100||v.annotations?.['workers/message']!==annotation)fail();
}
export function prepareFiniteInitialActivationWire(input){
 const v=fields(input,['plan','arm','entry','issuedAt','deadline']),plan=record('Plan',v.plan),arm=record('ArmAck',v.arm),entry=decodeFiniteInitialEntry(encodeFiniteInitialEntry(v.entry));
 const state=seal('State',{planHash:plan.recordHash,deliveries:0,status:'pending',nextAt:plan.C0,previousHash:null});
 if(entry.entryHash!==plan.entryHash||entry.I0!==plan.I0||entry.initialDeadline!==plan.initialDeadline||entry.operationDeadline!==plan.forwardDeadline||entry.sourceRevision!==plan.sourceRevision||entry.sourceTree!==plan.sourceTree||entry.qaVersionId!==plan.qaVersionId||entry.initialInstanceId!==plan.initialInstanceId||entry.commandId!==plan.commandId||arm.planHash!==plan.recordHash||arm.stateHash!==state.recordHash||arm.alarmAt!==plan.C0||arm.acknowledgedAt<plan.I0||arm.acknowledgedAt>=plan.forwardDeadline||!time(v.issuedAt)||!time(v.deadline)||v.issuedAt<arm.acknowledgedAt||v.deadline>plan.forwardDeadline)fail();
 const {annotation,body}=bodyFor(plan);
 const send=seal('ActivationSend',{planHash:plan.recordHash,entryHash:plan.entryHash,materialHash:plan.materialHash,candidateVersionId:plan.candidateVersionId,bodyHash:sha(body),annotation,issuedAt:v.issuedAt,deadline:v.deadline});
 return Object.freeze({path,body,send,authorizesEffects:false});
}
export function qualifyFiniteInitialActivationAck(input){
 const v=fields(input,['plan','send','result','acknowledgedAt']),plan=record('Plan',v.plan),send=checkedSend(plan,v.send);
 if(!time(v.acknowledgedAt)||v.acknowledgedAt<send.issuedAt||v.acknowledgedAt>=send.deadline||v.result?.id===plan.baselineDeploymentId)fail();
 pointer(plan,v.result,v.result?.id);
 return seal('ActivationAck',{planHash:plan.recordHash,sendHash:send.recordHash,deploymentId:v.result.id,acknowledgedAt:v.acknowledgedAt});
}
export function qualifyFiniteInitialActivationCompletion(input){
 const v=fields(input,['plan','send','ack','pointer','metadata','bytes','settledAt','observedAt']),plan=record('Plan',v.plan),send=checkedSend(plan,v.send),ack=checkedAck(plan,send,v.ack);
 if(!time(v.settledAt)||!time(v.observedAt)||v.settledAt<ack.acknowledgedAt||v.observedAt<v.settledAt||v.observedAt>=send.deadline)fail();
 pointer(plan,v.pointer,ack.deploymentId);
 if(!(v.bytes instanceof Uint8Array)||v.bytes.length!==plan.moduleBytes||sha(v.bytes)!==plan.moduleHash)fail();
 qualifyFiniteInitialUploadedVersion(v.metadata,plan.candidateVersionId,plan.configuration,v.bytes);
 return seal('ActivationCompletion',{planHash:plan.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:plan.candidateVersionId,deploymentId:ack.deploymentId,settledAt:v.settledAt,observedAt:v.observedAt});
}
