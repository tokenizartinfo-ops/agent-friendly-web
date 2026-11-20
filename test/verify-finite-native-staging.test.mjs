import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyClosedQaWorkflows} from '../scripts/verify-finite-native-staging.mjs';

for(const pendingCall of ['create','status'])test('the QA Workflow deadline covers a pending '+pendingCall,{timeout:1000},async()=>{
 const pending=()=>new Promise(()=>{});
 const calls=[];
 const bootstrap={
  create(){
   calls.push('create');
   return pendingCall==='create'?pending():{status(){calls.push('status');return pending();}};
  }
 };
 const confirmation={create(){assert.fail('second Workflow must not start after timeout');}};
 const runtime={getBindings:async()=>({AFW_QA_BOOTSTRAP:bootstrap,AFW_QA_NAMED_CONFIRMATION:confirmation})};
 await assert.rejects(verifyClosedQaWorkflows(runtime,'qa',{timeoutMs:20}),/AFW_QA_BOOTSTRAP did not finish before the staging deadline/);
 assert.deepEqual(calls,pendingCall==='create'?['create']:['create','status']);
});

test('the v2 layout is round-tripped privately while the live guard is pending',async()=>{
 const {verifyFiniteReleaseLayout}=await import('../scripts/build-finite-native-package.mjs');
 const {createHash}=await import('node:crypto');
 const {QA_CLOUD_CLOSED_PINS:pins}=await import('../lib/mcp-qa-cloud-closed-pins.mjs');
 const {validateFinitePackageManifest}=await import('../lib/mcp-qa-finite-seed.mjs');
 assert.equal(typeof verifyFiniteReleaseLayout,'function');
 const roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
 const modules=Object.fromEntries(roles.map(role=>[role,Buffer.from('export default {}; // '+role)]));
 const sourceRevision='a'.repeat(40),sourceTree='b'.repeat(40);
 const historical={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
 const declarations=Object.fromEntries(roles.map(role=>{
  const key=historical[role];
  const provenance=key?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',
   receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:key,versionId:pins[key].id}:
   {kind:'compiled-source.v1',sourceRevision,sourceTree};
  return [role,{provenance,module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',
   sha256:createHash('sha256').update(modules[role]).digest('hex'),bytes:modules[role].byteLength,exports:['default']},
   publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'c'.repeat(64),
    profileHash:'d'.repeat(64),bindingsHash:'e'.repeat(64)}}];
 }));
 const compatibility={qaClassesPreserved:true,qaNamespacesPreserved:true,canaryClassesPreserved:true,
  canaryNamespacesPreserved:true,closedEntrypointsDenied:true,legacyContainmentQualified:false};
 const manifest={purpose:'afw.finite-native-package.v2',sourceRevision,sourceTree,
  sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'f'.repeat(64),
  modules:declarations,compatibility};
 assert.throws(()=>validateFinitePackageManifest(manifest));
 assert.equal(validateFinitePackageManifest({...manifest,compatibility:{...compatibility,legacyContainmentQualified:true}}).sourceTree,sourceTree);
 const input={cwd:process.cwd(),manifest,modules};
 const evidence=await verifyFiniteReleaseLayout(input);
 assert.deepEqual(Object.keys(evidence).sort(),['archiveBytes','archiveSha256','completePackage','moduleCount','operationalReadiness']);
 assert.equal(evidence.moduleCount,5);
 assert.equal(evidence.completePackage,false);
 assert.equal(evidence.operationalReadiness,false);
 assert.match(evidence.archiveSha256,/^[a-f0-9]{64}$/);
 assert.deepEqual(await verifyFiniteReleaseLayout(input),evidence);
 await assert.rejects(verifyFiniteReleaseLayout({...input,modules:{...modules,qaClosed:modules.operatorClosed}}));
 await assert.rejects(verifyFiniteReleaseLayout({...input,manifest:{...manifest,sourceTree:'ab'}}));
 await assert.rejects(verifyFiniteReleaseLayout({...input,manifest:{...manifest,compatibility:{...compatibility,legacyContainmentQualified:true}}}));
});
