import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdir,writeFile} from 'node:fs/promises';
import {runPostAckObserverControls} from './fixtures/finite-post-ack-diagnostic.mjs';
const mode=process.env.AFW_POST_ACK_MODE||'';
if(mode!=='')assert(['controls','native_r2_once'].includes(mode),'unknown diagnostic mode before allocation');
if(mode==='controls'){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 test('24 named inert post-ACK controls and authentic completion barrier',async()=>{
  const receipt=JSON.parse(await (await import('node:fs/promises')).readFile(process.env.RUNNER_TEMP+'/afw-post-ack-model-receipt.json'));
  assert.equal(receipt.verified,true);assert.equal(receipt.artifactId,process.env.MODEL_ARTIFACT_ID);assert.equal(receipt.uploaderDigest,process.env.MODEL_ARTIFACT_DIGEST);
  const result=await runPostAckObserverControls();
  assert.equal(result.completed,24);assert.equal(result.pass,24);assert.equal(result.postAssertionExactlyOnce,true);
  await mkdir('output/finite-budget/post-ack-private',{recursive:true});
  await writeFile('output/finite-budget/post-ack-private/controls.json',JSON.stringify(result));
  console.info(JSON.stringify(result));
 });
}else if(mode==='native_r2_once'){
 assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
 assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
 assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');
 assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');
 assert.equal(process.env.GITHUB_JOB,'native');assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
 test('ONE original R2 with passive post-ACK observation',{timeout:120000},async()=>{const {runPostAckR2Diagnostic}=await import('./fixtures/finite-budget-world.mjs');await runPostAckR2Diagnostic();});
}
