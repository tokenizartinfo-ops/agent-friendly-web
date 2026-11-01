import test from 'node:test';
import assert from 'node:assert/strict';
import {validateFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
test('historical_content_never_claims_M',()=>{
 const M='a'.repeat(40),tree='b'.repeat(40),roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
 const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'},keys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
 const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'c'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,{provenance:versions[role]?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:keys[role],versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',bytes:1,sha256:'d'.repeat(64),exports:[]},publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)}}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
 assert.deepEqual(validateFinitePackageManifest(manifest),manifest);
 for(const mutate of [
  m=>m.modules.qaClosed.provenance.sourceRevision=M,
  m=>m.modules.operatorClosed.provenance={kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},
  m=>m.modules.qaClosed.provenance.receiptKey='operator',
  m=>m.modules.qaClosed.provenance.receiptBlobSha='0'.repeat(40),
  m=>m.modules.qaClosed.provenance.versionId=versions.canaryClosed,
  m=>m.modules.qaLive.provenance.sourceTree='0'.repeat(40),
 ]){const m=structuredClone(manifest);mutate(m);assert.throws(()=>validateFinitePackageManifest(m));}
});
