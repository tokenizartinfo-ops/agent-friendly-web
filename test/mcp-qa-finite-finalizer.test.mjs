import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture,digest} from './fixtures/qa-finite-trial.mjs';
const api=await import('../lib/mcp-qa-finite-trial-finalizer.mjs').catch(()=>({}));
const observer=await import('../lib/mcp-qa-finite-observer.mjs').catch(()=>({}));
test('material preview uses control canonical identity with no journal, alarm or ready read',async()=>{
 const f=finiteFixture();let ready=0,available=false;f.primary.finalizer=async()=>{ready++;if(!available)throw Error('not ready yet');return f.finalizer();};
 const c=controls.createPrivateQaFiniteTrialControl(f.options(controls));
 assert.equal(typeof c.preview,'function');const r=await c.preview();
 assert.equal(r.purpose,'afw.qa-finite-material-preview.v1');assert.equal(r.planHash,digest(f.plan.purpose,f.plan));assert.equal(r.R1,f.plan.R1);
 assert.equal(f.puts,0);assert.equal(f.alarm,null);assert.equal(ready,0);assert.equal(JSON.stringify(r).includes('selectors'),false);
 available=true;const armed=await c.prepare();assert.equal(armed.status,'armed');assert.equal(r.controlHash,armed.controlHash);
});
test('finite observer instance is deterministic before control exists and source bound',()=>{
 assert.equal(typeof observer.finiteObserverInstanceId,'function');
 const a=observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)});
 assert.equal(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)}));
 assert.notEqual(a,observer.finiteObserverInstanceId({intentId:'a'.repeat(64),sourceRevision:'c'.repeat(40)}));
});
test('external exact finalizer constructor exists independently of the nominal runtime',()=>assert.equal(typeof api.createPrivateQaFiniteTrialFinalizer,'function'));

import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';
import {validateFiniteObserverOutput,finiteSendKey} from '../lib/mcp-qa-finite-external-contract.mjs';
test('restart after canary closed consumes SAME proof/claim and exactly one independent QA send',async()=>{
 const f=await finiteFinalizerFixture();let liveProofReads=0;f.liveProof=()=>{liveProofReads++;throw Error('closed canary');};
 const first=await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();
 assert.equal(first.status,'restored_observed');assert.equal(f.posts,1);assert.equal(f.claims,1);assert.equal(liveProofReads,0);
 assert.equal(f.send.proofHash,f.output.retained.proofHash);assert.equal(f.send.nativeClaimHash,f.output.qaClaim.claimHash);
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'closed_observed');assert.equal(f.posts,1);
 assert.equal(validateFiniteObserverOutput(f.output,f.plan).retained.proofHash,f.send.proofHash);
});
for(const mode of ['existing','uncertain','blocked'])test('send '+mode+' never permits a POST or replacement job send',async()=>{
 const f=await finiteFinalizerFixture();f.state.claimMode=mode;
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'admin_pending');assert.equal(f.posts,0);
 f.state.jobId=100;assert.equal(finiteSendKey(f.plan),finiteSendKey(f.plan));
 await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,0);
});
for(const[mode,attack]of Object.entries({
 expired:f=>f.f.setNow(f.preview.R1),foreign:f=>f.setPointer('88888888-8888-4888-8888-888888888888',f.plan.deployments.qaLive.deploymentId),
 foreignDeployment:f=>f.setPointer(f.plan.deployments.qaLive.versionId,'88888888-8888-4888-8888-888888888888'),
 unresolved:f=>{f.state.blocked=true;},proof:f=>{f.state.output.retained.proof.kind='stopped';},
 completion:f=>{f.state.output.completion.completedAt=f.preview.R1;},nativeClaim:f=>{f.state.output.qaClaim.claim.kind='canary_restore';},
 nativeVersion:f=>{f.state.output.preview.runtimeVersionId=f.plan.deployments.qaClosed.versionId;},
 source:f=>{f.state.output.preview.sourceRevision='f'.repeat(40);},
 writer:f=>{const r=f.state.output.primaryReceipt;r.writers.unresolvedRemoteWrites=1;const {receiptHash,...body}=r;void receiptHash;r.receiptHash=hash(body);},
 rawConsent:f=>{f.state.output.plan.selectors={subject:'private'};}
}))test('independent finalizer blocks '+mode+' before durable send claim',async()=>{
 const f=await finiteFinalizerFixture();attack(f);const r=await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(r.status,'admin_pending');assert.equal(f.posts,0);assert.equal(f.claims,0);
});
test('lost POST ACK retains issued authority and reports closed uncertainty without resend',async()=>{
 const f=await finiteFinalizerFixture();f.state.lostPost=true;
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'closed_observed_uncertain');assert.equal(f.posts,1);
 await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,1);
});
test('late POST and original queued R1 never become a successful readback',async()=>{
 const f=await finiteFinalizerFixture();f.state.late=true;
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'uncertain');assert.equal(f.posts,1);
 await api.createPrivateQaFiniteTrialFinalizer(f.deps).run();assert.equal(f.posts,1);
});
test('abort and after-await expiry block effects',async()=>{
 const f=await finiteFinalizerFixture(),a=new AbortController();a.abort();f.deps.signal=a.signal;
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'admin_pending');assert.equal(f.claims,0);
 const g=await finiteFinalizerFixture();g.deps.readSnapshot=async()=>{g.f.setNow(g.preview.R1);return g.snapshot();};
 await api.createPrivateQaFiniteTrialFinalizer(g.deps).run();assert.equal(g.claims,0);assert.equal(g.posts,0);
});
test('post-claim pointer conflict never overwrites and cannot refund send claim',async()=>{
 const f=await finiteFinalizerFixture(),original=f.deps.claim;f.deps.claim=async(...a)=>{const r=await original(...a);f.setPointer('88888888-8888-4888-8888-888888888888',f.plan.deployments.qaLive.deploymentId);return r;};
 assert.equal((await api.createPrivateQaFiniteTrialFinalizer(f.deps).run()).status,'uncertain');assert.equal(f.posts,0);assert.ok(f.send);
});
