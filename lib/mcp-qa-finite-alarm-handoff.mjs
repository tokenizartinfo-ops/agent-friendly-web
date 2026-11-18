import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {hashFinitePolicyEffectIdentity} from './mcp-qa-finite-preparation-records.mjs';
import {finiteData as data,finiteFields as fields,finiteHex as hex,finiteHash as hash,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';

export const FINITE_ALARM_HANDOFF='afw.finite-original-alarm-handoff.v1';
const HEAD='afw.qa-finite-trial.v1:head';
const CAPSULE='afw.finite-initial-preparation.v1:capsule';
const INITIAL='afw.finite-initial-cleanup.v1:';
const ENROLLMENT='afw.finite-preparation-cleanup.v1:';
const SCOPE='afw.finite-preparation-cleanup-scope.v1:';
const fail=()=>{throw Error('Finite original alarm handoff unavailable');};
const staged=new WeakMap();

function identity(control){
 const p=control.plan;
 return {intentId:p.intentId,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,
  actorId:p.resources.actorId,planHash:control.planHash,controlHash:control.controlHash,C0:p.C0,C1:p.C1,R1:p.R1};
}
const headFor=r=>({purpose:HEAD,intentId:r.intentId,controlHash:r.controlHash,planHash:r.planHash});
const names=['purpose','intentId','sourceRevision','qaVersionId','actorId','planHash','controlHash','C0','C1','R1',
 'prepId','capsuleHash','initialPlanHash','initialStateHash','enrollmentHash','setupReceiptHash','selectionHash','cleanupScopeHash',
 'initialC0','initialC1','anchorsHash'];
const hashNames=names.filter(k=>k.endsWith('Hash'));
const id=v=>typeof v==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);

export function readFiniteOriginalAlarmHandoff(value,control){
 const r=fields(data(value),[...names,'handoffHash']);
 const body=fields(Object.fromEntries(Object.entries(r).filter(([k])=>k!=='handoffHash')),names);
 if(r.purpose!==FINITE_ALARM_HANDOFF||!id(r.intentId)||!hex(r.sourceRevision,40)||!hex(r.actorId)||!uuid(r.qaVersionId)||!hex(r.prepId)||
    !hashNames.every(k=>hex(r[k]))||!['C0','C1','R1','initialC0','initialC1'].every(k=>time(r[k]))||
    r.C1!==r.C0+180000||r.R1!==r.C1+60000||r.initialC0<=r.R1+30000||r.initialC1!==r.initialC0+180000||
    r.handoffHash!==hash(body)||control&&Object.entries(identity(control)).some(([k,v])=>r[k]!==v))fail();
 return r;
}

function anchorKeys(r){
 const refs={intentId:r.intentId,sourceRevision:r.sourceRevision},setupInstanceId=finitePrivateQaSetupInstanceId(refs);
 const activation=hashFinitePolicyEffectIdentity({kind:'policy',...refs,setupInstanceId,effect:'activation'});
 return [CAPSULE,INITIAL+'plan',INITIAL+'state',ENROLLMENT+'enrollment',ENROLLMENT+'ack',
  SCOPE+r.prepId,'source-selection:'+r.sourceRevision+':head',
  'source-selection:'+r.sourceRevision+':publication:'+r.selectionHash,
  'afw.qa-finite-policy-setup.v1:'+r.intentId+':context','afw.finite-policy-effect.v1:'+activation+':receipt'];
}
function anchorRecord(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>65536)fail();
 return JSON.parse(raw);
}
function qualifyAnchorRows(r,rows){
 const [capsule,plan,state,enrollment,ack,scope,selection,witness,setup,installed]=rows;
 const c=anchorRecord(capsule),p=anchorRecord(plan),s=anchorRecord(state),e=anchorRecord(enrollment),
  a=anchorRecord(ack),owner=anchorRecord(scope),w=anchorRecord(witness),context=anchorRecord(setup),receipt=anchorRecord(installed);
 if(c.capsuleHash!==r.capsuleHash||c.preconnectionId!==r.prepId||c.qaVersionId!==r.qaVersionId||
    c.sourceRevision!==r.sourceRevision||p.recordHash!==r.initialPlanHash||s.recordHash!==r.initialStateHash||
    p.C0!==r.initialC0||p.C1!==r.initialC1||s.planHash!==r.initialPlanHash||s.deliveries!==0||s.status!=='pending'||
    s.nextAt!==r.initialC0||s.previousHash!==null||e.recordHash!==r.enrollmentHash||e.capsuleHash!==r.capsuleHash||
    e.planHash!==r.initialPlanHash||e.preconnectionId!==r.prepId||a.enrollmentHash!==r.enrollmentHash||
    a.stateHash!==r.initialStateHash||a.alarmAt!==r.initialC0||owner.scopeHash!==r.cleanupScopeHash||
    owner.prepId!==r.prepId||owner.sourceRevision!==r.sourceRevision||selection!==r.selectionHash||
    w.selectionHash!==r.selectionHash||context.selectionHash!==r.selectionHash||context.intentId!==r.intentId||
    context.sourceRevision!==r.sourceRevision||context.C0!==r.C0||context.C1!==r.C1||
    receipt.receiptHash!==r.setupReceiptHash||receipt.intentId!==r.intentId||receipt.sourceRevision!==r.sourceRevision||
    receipt.qaVersionId!==r.qaVersionId||hash(rows)!==r.anchorsHash)fail();
}

async function gather(get,r,check){
 const rows=[];
 for(const key of anchorKeys(r)){check();rows.push(await get(key));check();}
 return rows;
}

/** Caller supplies the original already-qualified source receipts. This
 * constructor only makes a private token for the one native transaction. */
export async function stagePrivateQaFiniteOriginalAlarmHandoff({storage,control,source,check}){
 const facts=fields(source,['prepId','capsuleHash','initialPlanHash','initialStateHash','enrollmentHash',
  'setupReceiptHash','selectionHash','cleanupScopeHash','initialC0','initialC1']);
 const pinned=identity(control);
 const provisional={purpose:FINITE_ALARM_HANDOFF,...pinned,...facts};
 const rows=await gather(key=>storage.get(key),provisional,check);
 const body=fields({...provisional,anchorsHash:hash(rows)},names);
 const record=readFiniteOriginalAlarmHandoff({...body,handoffHash:hash(body)},control);
 qualifyAnchorRows(record,rows);check();
 if(await storage.getAlarm()!==record.initialC0)fail();check();
 const token=Object.freeze({});
 staged.set(token,{record,storage,check});
 return token;
}

export async function persistPrivateQaFiniteOriginalAlarmHandoff({token,storage,control,tx,check}){
 const source=staged.get(token);
 if(!source||source.storage!==storage)fail();
 const current=()=>{source.check();check();};
 const r=readFiniteOriginalAlarmHandoff(source.record,control);current();
 const preflight=await Promise.all([tx.get(HEAD),tx.get(FINITE_ALARM_HANDOFF),tx.getAlarm(),
  tx.get(INITIAL+'restore-send'),tx.get(INITIAL+'restore-ack')]);current();
 const [head,existing,alarm,initialSend,initialAck]=preflight;
 if(head!==undefined||existing!==undefined||alarm!==r.initialC0||initialSend!==undefined||initialAck!==undefined)fail();
 qualifyAnchorRows(r,await gather(key=>tx.get(key),r,current));current();
 await tx.put(FINITE_ALARM_HANDOFF,r);current();return r;
}

export async function readCommittedPrivateQaFiniteOriginalAlarmHandoff({tx,control,check}){
 check();
 const raw=await tx.get(FINITE_ALARM_HANDOFF);check();
 if(raw===undefined)return null;
 const r=readFiniteOriginalAlarmHandoff(raw,control);
 const head=await tx.get(HEAD);check();
 if(!same(head,headFor(r)))fail();
 qualifyAnchorRows(r,await gather(key=>tx.get(key),r,check));check();
 return r;
}

/** Reestablish the original wakeup before any business factory or remote await.
 * Delivery itself may clear the physical slot. If write/readback is uncertain,
 * the caller must allow the platform's original delivery to retry. */
export async function protectPrivateQaFiniteBusinessAlarm({storage,actorId,qaVersionId,now=Date.now}){
 let last=now();
 const check=()=>{const at=now();if(!time(at)||at<last)fail();last=at;return at;};
 const selected=await storage.transaction(async tx=>{
  const r=await readCommittedPrivateQaFiniteOriginalAlarmHandoff({tx,check});
  if(!r)return null;
  if(r.actorId!==actorId||r.qaVersionId!==qaVersionId)fail();
  const at=check();
  if(at>=r.initialC0)return {kind:'original_due',record:r,alarm:null};
  const current=await tx.getAlarm();check();
  const guard=await tx.get('afw.qa-finite-guard.v1:'+r.intentId+':state');check();
  if(guard!==undefined&&guard.controlHash!==r.controlHash)fail();
  if(current!==null&&current!==r.C0&&current!==r.initialC0&&current!==guard?.nextAt)fail();
  const isBusiness=at>=r.C0&&at<r.C1;
  const alarm=at<r.C0?r.C0:r.initialC0;
  if(await tx.getAlarm()!==alarm)await tx.setAlarm(alarm);check();
  return {kind:isBusiness?'business':'waiting',record:r,alarm};
 });
 if(selected===null||selected.kind==='original_due')return selected;
 const raw=await storage.get(FINITE_ALARM_HANDOFF),actual=await storage.getAlarm();check();
 if(!same(readFiniteOriginalAlarmHandoff(raw),selected.record)||actual!==selected.alarm)fail();
 return Object.freeze(selected);
}
