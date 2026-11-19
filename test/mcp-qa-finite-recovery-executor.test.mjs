import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture,HEAD} from './fixtures/qa-finite-trial.mjs';

const api=await import('../lib/mcp-qa-finite-recovery-executor.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-recovery-executor.mjs'))throw error;
 return {};
});
async function prepare(){
 const f=finiteFixture(),p=f.plan;
 f.env.RELEASE_DB={prepare(){throw Error('primary session required');},withSession(pin){
  assert.equal(pin,'first-primary');
  return {prepare(sql){assert.match(sql,/^SELECT /);return {bind:()=>({all:async()=>({success:true,results:[]})})};}};
 }};
 f.env.AFW_MCP_CLOSURE_READ_TOKEN='fixture-provider-reader';
 f.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='fixture-provider-publisher';
 const options=f.options(controls),id=controls.readPrivateQaFiniteControlIdentity({nativePin:options.nativePin,raw:options.plan});
 const execution={intentId:p.intentId,controlHash:id.controlHash,sourceRevision:p.source.revision,moduleHash:p.source.moduleHash,
  confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,admissionHash:'c'.repeat(64),launcherId:p.workflows.launcher};
 const sender=controls.createPrivateQaFiniteTrialControl({...options,recoveryExecution:execution});
 assert.equal((await sender.prepare()).status,'armed');
 const head=f.rows.get(HEAD);f.setNow(p.C0+10);
 const reopen=()=>api.createPrivateQaFiniteRecoveryExecutor({ctx:f.ctx,env:f.env,head,compiledRevision:p.source.revision,now:f.now});
 return {f,p,head,reopen};
}
test('restart uses the original authorization and fresh primary read, and cannot issue nominal work',async()=>{
 assert.equal(typeof api.createPrivateQaFiniteRecoveryExecutor,'function');
 const {f,p,reopen}=await prepare(),before=f.puts;
 const first=await reopen(),second=await reopen();
 const readback=await second.capabilities.readRecovery();
 assert.equal(readback.original.observedAt,p.T0);
 assert.equal(readback.current.observedAt,f.now());
 assert.equal(readback.current.admissionHash,null);
 assert.equal((await first.control.read()).status,'observed');
 assert.equal(first.control.readNominalControl,undefined);
 await assert.rejects(async()=>first.control.claimEffect('nominal'));
 assert.equal(f.puts,before);
 assert.equal((await second.control.withdrawNominal()).status,'withdrawn');
 assert.equal((await second.control.claimEffect('withdraw')).status,'issued');
 assert.equal((await first.control.claimEffect('withdraw')).status,'reconcile_only');
});
test('restart rejects a substituted or missing authorization and the expired cleanup window',async()=>{
 assert.equal(typeof api.createPrivateQaFiniteRecoveryExecutor,'function');
 const {f,p,reopen}=await prepare(),before=f.puts;
 const key=[...f.rows.keys()].find(k=>k.startsWith('afw.qa-finite-recovery-context.v1:'));
 assert.ok(key);const row=f.rows.get(key);
 f.rows.set(key,{...row,execution:{...row.execution,admissionHash:'d'.repeat(64)}});
 await assert.rejects(reopen);
 f.rows.delete(key);await assert.rejects(reopen);
 f.rows.set(key,row);f.setNow(p.C1);await assert.rejects(reopen);
 assert.equal(f.puts,before);
});
