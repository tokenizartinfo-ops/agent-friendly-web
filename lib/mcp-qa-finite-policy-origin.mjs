import {finitePrivateQaSetupInstanceId} from './mcp-qa-finite-adoption.mjs';
import {finiteFields as fields,finiteData as data,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';

export const FINITE_POLICY_ORIGIN_STEP='finite-private-policy-origin';
export const FINITE_POLICY_INSTALL_STEP='finite-private-policy-setup';
const purpose='afw.finite-private-policy-origin.v1';
const nativeKeys=['setupInstanceId','sourceRevision','qaVersionId','eventTimestamp','queuedAt','startedAt','T0'];
const fail=()=>{throw Error('Finite policy origin unavailable');};
const stamp=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)?Date.parse(value):NaN;

export function validateFinitePolicyOrigin(value,{intentId,sourceRevision,qaVersionId}){
 const {purpose:type,intentId:bound,acknowledgedAt,...native}=fields(data(value),['purpose','intentId',...nativeKeys,'acknowledgedAt']);
 const {setupInstanceId,eventTimestamp,queuedAt,startedAt,T0}=native;
 if(type!==purpose||bound!==intentId||native.sourceRevision!==sourceRevision||native.qaVersionId!==qaVersionId||!finiteUuid(qaVersionId)||
    setupInstanceId!==finitePrivateQaSetupInstanceId({intentId,sourceRevision})||
    [eventTimestamp,queuedAt,startedAt,T0,acknowledgedAt].some(at=>!time(at))||
    queuedAt<T0||eventTimestamp<T0||startedAt<queuedAt||acknowledgedAt<Math.max(startedAt,eventTimestamp)||
    acknowledgedAt>=Math.min(eventTimestamp+30000,queuedAt+30000,T0+50000))fail();
 return Object.freeze({native:Object.freeze(native),acknowledgedAt});
}
export function buildFinitePolicyOrigin(native,refs,acknowledgedAt){
 const result=data({purpose,intentId:refs.intentId,...fields(native,nativeKeys),acknowledgedAt});
 validateFinitePolicyOrigin(result,{...refs,qaVersionId:native.qaVersionId});
 return result;
}
export function finitePolicyStepName(step,label){
 return step?.name===label||step?.name===label+'-1';
}
/** The provider's actual successful step is read independently by QA. Raw
 * caller data, a stored timestamp and a completed but foreign step never qualify. */
export function readFinitePolicyOriginStep({step,refs,qaVersionId,queuedAt,startedAt,seedCompletedAt,T0,observedAt}){
 if(!finitePolicyStepName(step,FINITE_POLICY_ORIGIN_STEP)||step.type!=='step'||step.success!==true||
    !Array.isArray(step.attempts)||step.attempts.length!==1||step.attempts[0]?.success!==true||
    typeof step.output!=='string'||Buffer.byteLength(step.output)>4096)fail();
 const result=validateFinitePolicyOrigin(JSON.parse(step.output),{...refs,qaVersionId});
 const {native,acknowledgedAt}=result,start=stamp(step.start),end=stamp(step.end);
 if(!time(start)||!time(end)||native.queuedAt!==queuedAt||native.startedAt!==startedAt||native.T0!==T0||
    !time(seedCompletedAt)||native.eventTimestamp<seedCompletedAt||queuedAt<seedCompletedAt||
    start<startedAt||acknowledgedAt<start||end<acknowledgedAt||end>observedAt||
    end>=Math.min(native.eventTimestamp+30000,queuedAt+30000,T0+50000))fail();
 return Object.freeze({...result,completedAt:end});
}
