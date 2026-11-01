import test from 'node:test';
import assert from 'node:assert/strict';
import * as controlApi from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
const inventoryApi=await import('../lib/mcp-qa-finite-launch-inventory.mjs').catch(()=>({}));
test('actual native pin snapshot reads true before-HEAD absence without writes',async()=>{
 assert.equal(typeof controlApi.readPrivateQaFiniteControlSnapshot,'function');
 const f=finiteFixture(),o=f.options(controlApi),before=structuredClone([...f.rows]);
 const parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
 const s=await controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent});
 assert.equal(s.state,null);assert.equal(s.prepared,null);assert.equal(s.send,null);assert.equal(s.ack,null);
 assert.equal(s.control.plan.intentId,f.plan.intentId);assert.match(s.control.controlHash,/^[a-f0-9]{64}$/);
 assert.deepEqual([...f.rows],before);assert.equal(f.puts,0);assert.equal(f.alarm,null);
});
test('default fixed launch context and caller DTO cannot mint absence',async()=>{
 assert.equal(typeof inventoryApi.createPrivateQaFiniteLaunchInventory,'function');
 const f=finiteFixture(),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
 const i=await inventoryApi.createPrivateQaFiniteLaunchInventory({ctx:f.ctx,env:f.env,context:{kind:'never_issued',sourceCoverage:true},parent});
 assert.equal((await i.observeBeforeCreation()).kind,'unavailable');
});
