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
 assert.equal(typeof verifyFiniteReleaseLayout,'function');
 const roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
 const modules=Object.fromEntries(roles.map(role=>[role,Buffer.from('export default {}; // '+role)]));
 const declarations=Object.fromEntries(roles.map(role=>[role,{module:{
  name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',
  sha256:createHash('sha256').update(modules[role]).digest('hex'),bytes:modules[role].byteLength
 }}]));
 const manifest={purpose:'afw.finite-native-package.v2',modules:declarations,compatibility:{legacyContainmentQualified:false}};
 const input={cwd:process.cwd(),manifest,modules};
 const evidence=await verifyFiniteReleaseLayout(input);
 assert.deepEqual(Object.keys(evidence).sort(),['archiveBytes','archiveSha256','completePackage','moduleCount','operationalReadiness']);
 assert.equal(evidence.moduleCount,5);
 assert.equal(evidence.completePackage,false);
 assert.equal(evidence.operationalReadiness,false);
 assert.match(evidence.archiveSha256,/^[a-f0-9]{64}$/);
 assert.deepEqual(await verifyFiniteReleaseLayout(input),evidence);
 await assert.rejects(verifyFiniteReleaseLayout({...input,modules:{...modules,qaClosed:modules.operatorClosed}}));
 await assert.rejects(verifyFiniteReleaseLayout({...input,manifest:{...manifest,compatibility:{legacyContainmentQualified:true}}}));
});
