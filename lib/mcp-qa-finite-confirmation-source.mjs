import {finiteFields as fields} from './mcp-finite-evidence.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {reconstructPrivateQaFiniteConfirmationBundle} from './mcp-qa-finite-confirmation-bundle.mjs';

const slot='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite confirmation material unavailable');};

/** Original entry only. No receipt, callback, bundle or authorization supplied
 * by the event. The Known workflow still owns current consent and business work. */
export async function readPrivateQaFiniteConfirmationMaterial({env,event,parent}){
 const {planHash:bundleHash}=fields(event.payload,['planHash']);
 const refs={bundleHash,instanceId:event.instanceId,createdAt:Date.prototype.getTime.call(event.timestamp),deadline:parent.deadline};
 const ns=env.AFW_INDEPENDENT_CLOSURE,actor=ns.get(ns.idFromName(slot));parent.check();
 const {record,plan,execution}=fields(await actor.readFiniteNominalConfirmation(refs),['record','plan','execution']);parent.check();
 if(env.AFW_INDEPENDENT_CLOSURE!==ns||record.bundleHash!==bundleHash)fail();
 const bundle=reconstructPrivateQaFiniteConfirmationBundle(record,readPrivateQaFiniteCandidate());parent.check();
 return {bundle,plan,execution};
}
