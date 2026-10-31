import {createHash} from 'node:crypto';
import {generationFixture} from './qa-generation-ledger.mjs';
import {restorationFixture} from './canary-restoration.mjs';
import {inertNamedConfirmationPolicy} from './inert-named-confirmation-policy.mjs';
import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../../lib/mcp-successor-canary-restorer.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
import {RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
export const packetHash=s=>createHash('sha256').update(s).digest('hex');
/** Synthetic coherence fixture. Its short script is NOT frozen artifact315.
 * Package/native qualification must separately use that actual recorded artifact. */
export function namedDataPacketFixture(){
 const f=generationFixture(),at=Date.UTC(2026,9,31,17);f.setNow(at);
 const script='export default{fetch(){return new Response(null,{status:404})}};';
 // Deliberately retain this non-schema property order; runtime hashes JSON bytes.
 const artifact={sourceRevision:'c'.repeat(40),sourceTree:'e'.repeat(40),programHash:'d'.repeat(64),script,workerHash:packetHash(script),sourceCheck:'git-inputs-before-after-v1'};
 const receipt={baseVersionId:'2607abae-cec3-4e35-89eb-8b8572262b54',artifactKey:packetHash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,artifact.workerHash])),sourceRevision:artifact.sourceRevision,sourceTree:artifact.sourceTree,programHash:artifact.programHash,workerHash:artifact.workerHash,workerBytes:Buffer.byteLength(script),sourceCheck:artifact.sourceCheck};
 const policy=inertNamedConfirmationPolicy(artifact),startAt=at-1000,expiresAt=at+60000;policy.startAt=startAt;policy.expiresAt=expiresAt;policy.plan.startAt=startAt;policy.plan.expiresAt=expiresAt;
 const cfg=policy.observation.configuration,bindings=cfg.bindings,successor=bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),events=bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');
 const manifest=JSON.parse(successor.text),event=JSON.parse(events.text);manifest.candidate.startAt=startAt;manifest.candidate.expiresAt=expiresAt;event.startAt=startAt;event.expiresAt=expiresAt;event.grantId='packet-fixture-grant';successor.text=JSON.stringify(manifest);events.text=JSON.stringify(event);policy.plan.configurationHash=activationConfigurationHash(cfg);
 const ids={'afw-own-event-one-occurrence-v1':'3'.repeat(64),'afw-own-event-first-successor-v1':'4'.repeat(64)};
 const namespace={idFromName:name=>({toString:()=>ids[name]}),idFromString:id=>({toString:()=>id})};Object.defineProperty(namespace,'get',{get(){throw Error('no actor/network access in assembler');}});
 const closure=restorationFixture({at}).policy;closure.startAt=startAt+20000;closure.expiresAt=expiresAt;closure.candidate={containerId:ids['afw-own-event-first-successor-v1'],applicationId:RELEASE_TARGET.namespaceId,programHash:artifact.programHash,sourceRevision:artifact.sourceRevision};
 closure.live={versionId:policy.observation.versionId,deploymentId:policy.observation.deploymentId,configurationHash:restorationConfigurationHash(cfg)};
 closure.closed={versionId:receipt.baseVersionId,moduleHash:receipt.workerHash,moduleBytes:receipt.workerBytes,configurationHash:'6'.repeat(64)};
 const op=QA_CLOUD_CLOSED_PINS.operator;closure.operator={versionId:op.id,deploymentId:op.deploymentId,moduleHash:op.module.sha256,moduleBytes:op.module.bytes,configurationHash:'7'.repeat(64)};
 const cancellationHistory={purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:event.grantId,consentSequence:4,consentRevision:1,issuedAt:startAt,expiresAt},cancellations:[]};
 f.capsule={...f.capsule,trialId:policy.plan.trialId,grantId:event.grantId,bundleHash:packetHash(JSON.stringify({artifact,policy})),closurePolicyHash:packetHash(JSON.stringify(closure)),cancellationHistoryHash:packetHash(JSON.stringify(cancellationHistory)),startAt,expiresAt};
 const expectedCapsule=JSON.stringify(f.capsule),packet={purpose:'afw.qa-named-data-packet.v1',generationCapsule:expectedCapsule,namedPolicy:JSON.stringify(policy),closurePolicy:JSON.stringify(closure),cancellationHistory:JSON.stringify(cancellationHistory)};
 return {f,artifact,receipt,namespace,policy,closure,cancellationHistory,packet,expectedCapsule,options(){return{packetJson:JSON.stringify(this.packet),expectedCapsule:this.expectedCapsule,artifact:this.artifact,receipt:this.receipt,namespace:this.namespace};}};
}
