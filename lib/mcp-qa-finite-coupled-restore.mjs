import {createHash} from 'node:crypto';
import {FINITE_INITIAL_CLEANUP_PREFIX as P,sealFiniteInitialCleanupRecord as seal,
 decodeFiniteInitialCleanupRecord as decode,encodeFiniteInitialCleanupRecord as encode} from './mcp-qa-finite-initial-cleanup-records.mjs';

const SEND=P+'restore-send',ACK=P+'restore-ack';
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0;
const sha=body=>createHash('sha256').update(body).digest('hex');
const fail=()=>{throw Error('Finite coupled original restore unavailable');};

function request(plan){
 const annotation='afw-finite-initial-restore-'+plan.recordHash;
 const body=JSON.stringify({strategy:'percentage',versions:[{version_id:plan.baselineVersionId,percentage:100}],
  annotations:{'workers/message':annotation}});
 return {annotation,body};
}
function singleDeployment(value){
 const rows=Array.isArray(value)?value:value?.deployments,d=rows?.[0];
 if(!Array.isArray(rows)||rows.length!==1||!uuid(d?.id)||d.strategy!=='percentage'||
    !Array.isArray(d.versions)||d.versions.length!==1||!uuid(d.versions[0]?.version_id)||d.versions[0].percentage!==100)fail();
 return d;
}
function active(value,from){
 const d=singleDeployment(value);
 if(d.id!==from.deploymentId||d.versions[0].version_id!==from.versionId||Object.hasOwn(d,'annotations'))fail();
}

/** An acknowledged restore is only a candidate for fresh provider readback.
 * SEND without ACK remains unknown, even if a later deployment looks closed. */
export function readFiniteCoupledOriginalRestore({plan,activationCompletionHash,originalDeploymentId,from,send,ack,at}){
 if(!send&&!ack)return null;
 const {body,annotation}=request(plan);
 if(!send||!ack||!time(at)||send.planHash!==plan.recordHash||send.activationCompletionHash!==activationCompletionHash||
    send.bodyHash!==sha(body)||send.annotation!==annotation||send.issuedAt<plan.C0||send.deadline>plan.C1||
    ack.planHash!==plan.recordHash||ack.sendHash!==send.recordHash||ack.acknowledgedAt<send.issuedAt||
    ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>at||
    [plan.baselineDeploymentId,originalDeploymentId,from.deploymentId].includes(ack.deploymentId))fail();
 return Object.freeze({versionId:plan.baselineVersionId,deploymentId:ack.deploymentId,annotation,ackHash:ack.recordHash});
}

/** Only the original alarm supplies the borrowed reservation and fixed
 * provider calls. A claimed SEND never comes back into the write path. */
export async function executeFiniteCoupledOriginalRestore({authority,storage,plan,activationCompletionHash,originalDeploymentId,
 from,deadline,check,readDeployment,restoreDeployment}){
 const sync=storage?.sync;
 if([sync,check,readDeployment,restoreDeployment].some(f=>typeof f!=='function')||authority?.planHash!==plan.recordHash||
    !time(deadline)||deadline>plan.C1)fail();
 const current=()=>{
  authority.check();const at=check();
  if(!time(at)||at<plan.C0||at>=deadline||storage.sync!==sync)fail();
  return at;
 };
 const {annotation,body}=request(plan);
 async function durable(key,kind,value){
  current();await sync.call(storage);current();
  await authority.transact(async tx=>{
   const raw=await tx.get(key);current();
   if(raw!==encode(kind,value)||decode(kind,raw).recordHash!==value.recordHash)fail();
  });
 }
 async function unclaimed(tx){
  if(await tx.get(SEND)!==undefined||await tx.get(ACK)!==undefined)fail();
  current();
 }
 current();
 await authority.transact(unclaimed);
 active(await readDeployment(),from);current();
 const sent=await authority.transact(async tx=>{
  await unclaimed(tx);
  const send=seal('RestoreSend',{planHash:plan.recordHash,activationCompletionHash,bodyHash:sha(body),annotation,
   issuedAt:current(),deadline});
  await tx.put(SEND,encode('RestoreSend',send));current();
  return send;
 });
 await durable(SEND,'RestoreSend',sent);
 active(await readDeployment(),from);current();
 const installed=singleDeployment([await restoreDeployment(body)]),acknowledgedAt=current();
 if(installed.versions[0].version_id!==plan.baselineVersionId||installed.annotations?.['workers/message']!==annotation||
    [plan.baselineDeploymentId,originalDeploymentId,from.deploymentId].includes(installed.id))fail();
 const ack=seal('RestoreAck',{planHash:plan.recordHash,sendHash:sent.recordHash,deploymentId:installed.id,acknowledgedAt});
 await authority.transact(async tx=>{
  if(await tx.get(SEND)!==encode('RestoreSend',sent)||await tx.get(ACK)!==undefined)fail();
  current();await tx.put(ACK,encode('RestoreAck',ack));current();
 });
 await durable(ACK,'RestoreAck',ack);
 return readFiniteCoupledOriginalRestore({plan,activationCompletionHash,originalDeploymentId,from,send:sent,ack,at:current()});
}
