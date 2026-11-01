import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture,digest} from './fixtures/qa-finite-trial.mjs';
const api=await import('../lib/mcp-qa-finite-trial-finalizer.mjs').catch(()=>({}));
const observer=await import('../lib/mcp-qa-finite-observer.mjs').catch(()=>({}));
test('material preview uses control canonical identity with no journal, alarm or ready read',async()=>{
 const f=finiteFixture();let ready=0;f.primary.finalizer=async()=>{ready++;throw Error('not ready yet');};
 const c=controls.createPrivateQaFiniteTrialControl(f.options(controls));
 assert.equal(typeof c.preview,'function');const r=await c.preview();
 assert.equal(r.purpose,'afw.qa-finite-material-preview.v1');assert.equal(r.planHash,digest(f.plan.purpose,f.plan));assert.equal(r.R1,f.plan.R1);
 assert.equal(f.puts,0);assert.equal(f.alarm,null);assert.equal(ready,0);assert.equal(JSON.stringify(r).includes('selectors'),false);
 f.primary.finalizer=async()=>f.finalizer();const armed=await c.prepare();assert.equal(armed.status,'armed');assert.equal(r.controlHash,armed.controlHash);
});
test('finite observer instance is deterministic before control exists and source bound',()=>{
 assert.equal(typeof observer.finiteObserverInstanceId,'function');
 const a=observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)});
 assert.equal(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)}));
 assert.notEqual(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'c'.repeat(40)}));
});
test('external exact finalizer constructor exists independently of the nominal runtime',()=>assert.equal(typeof api.createPrivateQaFiniteTrialFinalizer,'function'));
