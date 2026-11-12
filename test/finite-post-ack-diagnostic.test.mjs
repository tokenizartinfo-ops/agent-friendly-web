import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdir,writeFile} from 'node:fs/promises';
import {runPostAckObserverControls} from './fixtures/finite-post-ack-diagnostic.mjs';
const mode=process.env.AFW_POST_ACK_MODE||'controls';
assert(['controls','native_r2_once'].includes(mode),'unknown diagnostic mode before allocation');
assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
if(mode==='controls'){
 test('24 named inert post-ACK controls and authentic completion barrier',async()=>{
  const {preflightPostAckDiagnostic}=await import('./fixtures/finite-budget-world.mjs');
  await preflightPostAckDiagnostic();
  const result=await runPostAckObserverControls();
  assert.equal(result.completed,24);assert.equal(result.pass,24);assert.equal(result.postAssertionExactlyOnce,true);
  await mkdir('output/finite-budget/post-ack-private',{recursive:true});
  await writeFile('output/finite-budget/post-ack-private/controls.json',JSON.stringify(result));
  console.info(JSON.stringify(result));
 });
}else{
 assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
 assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');
 assert.equal(process.env.GITHUB_WORKFLOW,'AFW R2 post-ACK diagnostic');
 assert.equal(process.env.GITHUB_JOB,'native');assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
 test('ONE original R2 with passive post-ACK observation',{timeout:120000},async()=>{const {runPostAckR2Diagnostic}=await import('./fixtures/finite-budget-world.mjs');await runPostAckR2Diagnostic();});
}
