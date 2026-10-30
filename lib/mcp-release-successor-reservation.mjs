import {validateReleaseOperatorBundle,resolveNamedActivationPlan} from './mcp-release-operator-policy.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createRetirementEvidenceReader} from './mcp-retirement-evidence.mjs';
import {createRetirementProviderReader} from './mcp-retirement-provider-reader.mjs';
import {createSuccessorReservation} from './mcp-successor-reservation.mjs';
import {readRetiredRpcReceipt} from './mcp-retired-rpc-receipt.mjs';
const fail=()=>{throw Error('Private successor reservation unavailable');};
/** Workflow-private, fixed plan/namespace only. Never launches a process or
 * creates a subscription. An unknown reservation acknowledgement is terminal. */
export async function reserveReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation}={}){
 const trace=(stage,detail)=>{try{observation?.point(stage,detail);}catch{/* Observation is not authority. */}};
 trace('successor_admission');
 validateReleaseOperatorBundle(bundle);
 if(bundle.policy.operation!=='confirm_named'||typeof readCredential!=='function'||typeof now!=='function'||typeof fetchImpl!=='function'||!(signal instanceof AbortSignal)||signal.aborted)fail();
 const names=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_EVENTS_NODE','RELEASE_DB'];
 const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]])));
 if(names.slice(0,4).some(k=>pins[k]!=='true')||pins.AFW_RELEASE_EVENTS_NODE!==namespace||!pins.RELEASE_DB?.withSession)fail();
 const named=resolveNamedActivationPlan(bundle,namespace);
 trace('successor_manifest');
 const raw=bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text;
 const manifest=JSON.parse(raw),resolved=resolveSuccessorPreparation({...Object.fromEntries(['scope','original','candidate'].map(k=>[k,manifest[k]])),namespace});
 const db=pins.RELEASE_DB,prepare=db.prepare,session=db.withSession,get=namespace.get;
 if(typeof prepare!=='function'||typeof get!=='function')fail();
 let last=-1;
 const current=()=>{const t=now();if(signal.aborted||!Number.isSafeInteger(t)||t<last||t<bundle.policy.startAt||t>=bundle.policy.expiresAt||!names.every(k=>env[k]===pins[k])||db.prepare!==prepare||db.withSession!==session||namespace.get!==get)fail();named.current();last=t;return t;};
 const timeoutMs=Math.min(5000,bundle.policy.expiresAt-current());
 const readInstance=createRetirementProviderReader({resources:{accountId:manifest.scope.accountId,applicationId:manifest.original.applicationId,containerId:manifest.original.containerId},readCredential:async()=>{current();const value=await readCredential();current();return value;},fetchImpl,timeoutMs});
 trace('successor_reader');
 const retirement=createRetirementEvidenceReader({original:resolved.original,now:current,timeoutMs,readInstance,readCustodyReceipt:async({signal:inner},assertReader)=>{
  current();if(inner.aborted)fail();trace('successor_custody');
  const id=namespace.idFromString(resolved.original.containerId);if(id.toString()!==resolved.original.containerId)fail();
  if(typeof assertReader!=='function')fail();assertReader();
  const target=namespace.get(id);
  const receipt=await readRetiredRpcReceipt({now:current,signal:AbortSignal.any([inner,signal]),timeoutMs,
   assertCurrent:()=>{current();assertReader();},
   invoke:async challenge=>{current();assertReader();return {value:await target.observeRetiredReceipt(challenge)};}});
  const result=receipt.observation;trace('successor_custody_returned');
  const receivedAt=current();if(inner.aborted)fail();
  const fields=['purpose','containerId','processGeneration','programHash','sourceRevision','image','createdAt','expiresAt','closedAt','observedAt','physicalStopVerified','mayStartSuccessor'];
  if(!result||typeof result!=='object')trace('successor_custody_value');
  else if(Object.getPrototypeOf(result)!==Object.prototype)trace('successor_custody_prototype');
  else if(Reflect.ownKeys(result).length!==fields.length)trace('successor_custody_keys');
  else if(fields.some(k=>!Object.hasOwn(result,k)))trace('successor_custody_fields');
  else if(result.observedAt>receivedAt)trace('successor_custody_future',{remoteObservedAt:result.observedAt,receivedAt});
  else if(['containerId','programHash','sourceRevision'].some(k=>result[k]!==resolved.original[k]))trace('successor_custody_identity');
  else trace('successor_custody_checked');
  return receipt;
 }});
 trace('successor_reservation');
 const result=await createSuccessorReservation({db,original:resolved.original,candidate:resolved.candidate,now:current,timeoutMs,readRetirement:async({signal:inner},assertReservation)=>{
  current();if(inner.aborted)fail();if(typeof assertReservation!=='function')fail();const evidence=await retirement.observe({signal:inner,assertCurrent:()=>{current();assertReservation();}});current();if(inner.aborted)fail();trace('successor_primary');return evidence;
 }}).reserve();
 current();return result;
}
