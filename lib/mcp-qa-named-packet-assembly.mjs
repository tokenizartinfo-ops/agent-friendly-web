import {validatePrivateConfirmationBindingMetadata} from './mcp-private-confirmation-template.mjs';
import {createHash} from 'node:crypto';
import {decodePrivateQaNamedDataPacket} from './mcp-qa-named-packet-reader.mjs';
import {parsePrivateQaGenerationCapsule} from './mcp-qa-generation-ledger.mjs';
import {validateReleaseOperatorBundle,validateNamedCancellationHistory,resolveNamedActivationPlan,RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
import {restorationConfigurationHash} from './mcp-successor-canary-restorer.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
const fail=()=>{throw Error('Private QA named assembly unavailable');};
const hash=v=>createHash('sha256').update(v).digest('hex');
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
function freezeData(v,depth=0,budget={n:0}){
 if(++budget.n>20000||depth>24)fail();
 if(v===null||typeof v==='string'||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
 for(const k of Reflect.ownKeys(v)){
  if(Array.isArray(v)&&k==='length')continue;
  const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))fail();freezeData(d.value,depth+1,budget);
 }return Object.freeze(v);
}
/** PRIVATE INTERNAL data composition only. artifact/receipt/namespace are fixed
 * trusted constructor inputs, never Workflow payload. Production build must
 * verify the recorded frozen315 receipt. Synthetic receipts prove coherence,
 * never source provenance, live grants, ARM, guard or effect authority.
 * Full output contains private policy/code: NEVER return it through RPC. */
export function assemblePrivateQaNamedPacket(options){
 try{
  const p=fields(options,['packetJson','expectedCapsule','artifact','receipt','namespace']),packet=decodePrivateQaNamedDataPacket(p.packetJson);
  if(packet.generationCapsule!==p.expectedCapsule)fail();
  const capsule=parsePrivateQaGenerationCapsule(p.expectedCapsule),receipt=fields(p.receipt,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck']);
  if(!uuid(receipt.baseVersionId)||!hex(receipt.artifactKey,64)||!['sourceRevision','sourceTree'].every(k=>hex(receipt[k],40))||!['programHash','workerHash'].every(k=>hex(receipt[k],64))||receipt.sourceCheck!=='git-inputs-before-after-v1'||!Number.isSafeInteger(receipt.workerBytes)||receipt.workerBytes<1||receipt.workerBytes>2097152)fail();
  const a=fields(p.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
  if(typeof a.script!=='string'||Buffer.byteLength(a.script)!==receipt.workerBytes||hash(a.script)!==receipt.workerHash||['sourceRevision','sourceTree','programHash','workerHash','sourceCheck'].some(k=>a[k]!==receipt[k])||hash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,receipt.workerHash]))!==receipt.artifactKey)fail();
  // Membership is strict, but ORIGINAL property order is part of runtime bytes.
  const artifact=Object.freeze(Object.fromEntries(Object.keys(p.artifact).map(k=>[k,a[k]]))),policy=freezeData(JSON.parse(packet.namedPolicy));
  if(JSON.stringify(policy)!==packet.namedPolicy)fail();
  const bundle=Object.freeze({artifact,policy});validateReleaseOperatorBundle(bundle);
  if(policy.operation!=='confirm_named'||policy.plan.artifactKey!==receipt.artifactKey||policy.plan.trialId!==capsule.trialId||policy.startAt!==capsule.startAt||policy.expiresAt!==capsule.expiresAt)fail();
  const namedBundleHash=hash(JSON.stringify(bundle));
  if(namedBundleHash!==capsule.bundleHash||hash(packet.closurePolicy)!==capsule.closurePolicyHash||hash(packet.cancellationHistory)!==capsule.cancellationHistoryHash)fail();
  validateNamedCancellationHistory(bundle,packet.cancellationHistory);
  const history=freezeData(JSON.parse(packet.cancellationHistory));if(JSON.stringify(history)!==packet.cancellationHistory||history.currentGrant.grantId!==capsule.grantId)fail();
  const bindings=policy.observation.configuration.bindings;
  validatePrivateConfirmationBindingMetadata(bindings);
  const manifest=freezeData(JSON.parse(bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text)),resolved=resolveSuccessorPreparation({scope:manifest.scope,original:manifest.original,candidate:manifest.candidate,namespace:p.namespace}),named=resolveNamedActivationPlan(bundle,p.namespace);
  named.current();
  const closure=parseCanaryRestorationPolicy(packet.closurePolicy),op=QA_CLOUD_CLOSED_PINS.operator;
  if(closure.startAt<policy.startAt||closure.expiresAt>policy.expiresAt||closure.candidate.containerId!==resolved.candidate.containerId||closure.candidate.applicationId!==RELEASE_TARGET.namespaceId||closure.candidate.programHash!==artifact.programHash||closure.candidate.sourceRevision!==artifact.sourceRevision||closure.live.versionId!==policy.observation.versionId||closure.live.deploymentId!==policy.observation.deploymentId||closure.live.configurationHash!==restorationConfigurationHash(policy.observation.configuration)||closure.closed.versionId!==receipt.baseVersionId||closure.closed.moduleHash!==receipt.workerHash||closure.closed.moduleBytes!==receipt.workerBytes||closure.operator.versionId!==op.id||closure.operator.deploymentId!==op.deploymentId||closure.operator.moduleHash!==op.module.sha256||closure.operator.moduleBytes!==op.module.bytes)fail();
  named.current();
  return Object.freeze({purpose:'afw.qa-named-assembly.v1',bundle,cancellationHistory:packet.cancellationHistory,closurePolicy:closure,generationCapsule:capsule,namedBundleHash,generationPlanHash:hash('afw.qa-generation-plan.v2\n'+p.expectedCapsule),packetHash:hash(p.packetJson),authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
 }catch{fail();}
}
