import {createHash} from 'node:crypto';
import {decodePrivateQaGenerationDraft} from './mcp-qa-generation-draft-reader.mjs';
import {materializePrivateQaLegacyPredecessor} from './mcp-qa-legacy-predecessor.mjs';
import {assemblePrivateQaNamedPacket} from './mcp-qa-named-packet-assembly.mjs';
import {validateReleaseOperatorBundle} from './mcp-release-operator-policy.mjs';
const fail=()=>{throw Error('Private QA generation material unavailable');};
const hash=s=>createHash('sha256').update(s).digest('hex');
function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));}
function literal(v,depth=0,budget={n:0,bytes:0}){
 if(++budget.n>4096||depth>16)fail();
 if(v===undefined||v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(typeof v==='string'){budget.bytes+=Buffer.byteLength(v);if(budget.bytes>49152)fail();return v;}
 if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
 const out=Array.isArray(v)?[]:{};for(const k of Reflect.ownKeys(v)){if(Array.isArray(v)&&k==='length')continue;if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k))fail();out[k]=literal(data(v,k),depth+1,budget);}return Object.freeze(out);
}
function fixedArtifact(value){
 const a=fields(value,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
 if(typeof a.script!=='string'||Buffer.byteLength(a.script)>2097152)fail();
 // ORIGINAL property order and script bytes are part of the named commitment.
 return Object.freeze(Object.fromEntries(Object.keys(value).map(k=>[k,a[k]])));
}
/** PRIVATE synchronous data only, never a public DTO or authority witness.
 * The opaque namespace is the existing trusted local native identity adapter;
 * only the packet assembler consumes it. No storage, clock, authorization or
 * execution pin belongs here. The host retains its original lease, native
 * bindings, complete snapshots, primary D1 checks and settlement rereads. */
export function assemblePrivateQaGenerationDraftMaterial(options){
 try{
  const p=fields(options,['namedBundleHash','draftJson','legacySnapshot','artifact','receipt','historicalContext','namespace','at']);
  if(typeof p.namedBundleHash!=='string'||!/^[a-f0-9]{64}$/.test(p.namedBundleHash)||!Number.isSafeInteger(p.at)||p.at<0||p.at>8640000000000000)fail();
  const draft=decodePrivateQaGenerationDraft(p.draftJson),first=literal(fields(p.legacySnapshot,['control','journals'])),artifact=fixedArtifact(p.artifact),receipt=literal(p.receipt),historicalContext=literal(p.historicalContext);
  const material=materializePrivateQaLegacyPredecessor({artifact,historicalContext,control:first.control,journals:first.journals,namedPolicyJson:draft.historicalNamedPolicy,dispatchPolicyJson:draft.historicalDispatchPolicy,at:p.at});
  const policy=JSON.parse(draft.namedPolicy);validateReleaseOperatorBundle({artifact,policy});if(policy.operation!=='confirm_named'||JSON.stringify(policy)!==draft.namedPolicy)fail();
  const event=JSON.parse(policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY')?.text);
  const capsuleJson=JSON.stringify({purpose:'afw.qa-generation-capsule.v2',predecessor:material.predecessor,trialId:policy.plan.trialId,grantId:event.grantId,eventId:draft.eventId,closurePolicyHash:hash(draft.closurePolicy),bundleHash:p.namedBundleHash,cancellationHistoryHash:hash(draft.cancellationHistory),startAt:policy.startAt,expiresAt:policy.expiresAt});
  const packetJson=JSON.stringify({purpose:'afw.qa-named-data-packet.v1',generationCapsule:capsuleJson,namedPolicy:draft.namedPolicy,closurePolicy:draft.closurePolicy,cancellationHistory:draft.cancellationHistory});
  const assembled=assemblePrivateQaNamedPacket({packetJson,expectedCapsule:capsuleJson,artifact,receipt,namespace:p.namespace});
  const manifest=JSON.parse(policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text),oldPolicy=JSON.parse(draft.historicalNamedPolicy),oldManifest=JSON.parse(oldPolicy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text);
  if(['containerId','applicationId','programHash','sourceRevision'].some(k=>manifest.original[k]!==oldManifest.original[k]))fail();
  return Object.freeze({purpose:'afw.qa-generation-draft-material.v1',packetJson,capsuleJson,namedBundleHash:assembled.namedBundleHash,generationPlanHash:assembled.generationPlanHash,packetHash:assembled.packetHash,original:literal(manifest.original),historicalScope:literal(material.historicalScope),historicalCandidate:literal(JSON.parse(first.control.policy).candidate),window:literal({startAt:policy.startAt,expiresAt:policy.expiresAt}),retainedUncertainty:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
 }catch{fail();}
}
