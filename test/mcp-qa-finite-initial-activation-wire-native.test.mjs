import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-initial-cleanup.v1:';
async function using(fn){const f=await initialEntryHarness();try{await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'material_recorded');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('initial activation wire is an unmounted factual proposal from the native actor',()=>using(async f=>{
 const before=await f.stub.snapshot(),reads=f.requests.length,r=await f.stub.probeActivationWire(f.uploaded,'normal');
 assert.equal(r.status,'proposal_only');assert.equal(r.wire.authorizesEffects,false);
 const plan=JSON.parse(before.find(([k])=>k===P+'plan')[1]),body=JSON.parse(r.wire.body);
 assert.equal(r.wire.path,'/workers/scripts/agent-friendly-web-delegated-canary/deployments');
 assert.equal(body.versions[0].version_id,plan.candidateVersionId);
 assert.equal(body.annotations['workers/message'],'afw-finite-initial-activate-'+plan.recordHash);
 assert.equal(r.ack.sendHash,r.wire.send.recordHash);assert.equal(r.completion.ackHash,r.ack.recordHash);
 assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.requests.length,reads);assert.equal(f.restores.length,0);
}));
for(const mode of ['arm','wrong-version','wrong-annotation','wrong-deployment','wrong-module','coherent-wrong-module','same-size-wrong-module','issued-before-arm','deadline-too-long','ack-after-deadline','observation-after-deadline'])test('activation wire rejects '+mode,()=>using(async f=>{
 const before=await f.stub.snapshot(),reads=f.requests.length;
 assert.equal((await f.stub.probeActivationWire(f.uploaded,mode)).status,'rejected');
 assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.requests.length,reads);assert.equal(f.restores.length,0);
}));
