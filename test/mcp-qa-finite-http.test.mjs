import test from 'node:test';
import assert from 'node:assert/strict';
import {githubFixture as fixture} from './fixtures/finite-github.mjs';

test('durable unique ref fences changed job/reconstructed client; tag object alone grants nothing',async()=>{
 const x=await fixture(),client=x.make(),record=x.record();
 assert.throws(()=>client.consumeNewSend(record));assert.equal(await client.claimSend(record,new AbortController().signal,()=>{}),'issued');
 assert.deepEqual(await client.readSend(),record);client.consumeNewSend(record);assert.throws(()=>client.consumeNewSend(record));
 x.state.job=100;const restarted=x.make();assert.equal(await restarted.claimSend(x.record(),new AbortController().signal,()=>{}),'existing');assert.throws(()=>restarted.consumeNewSend(x.record()));
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.equal(x.requests.filter(x=>['PATCH','DELETE','PUT'].includes(x.method)).length,0);
});
for(const mode of ['lost','late'])test('send fence '+mode+' ACK never becomes POST authority',async()=>{
 const x=await fixture();x.state.mode=mode;const client=x.make(),r=x.record();
 assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'uncertain');assert.throws(()=>client.consumeNewSend(r));assert.equal(x.refPosts,1);
 assert.equal(await client.claimSend(r,new AbortController().signal,()=>{}),'existing');assert.equal(x.refPosts,1);
});
for(const[mode,attack]of Object.entries({attempt:x=>{x.state.attempt=2;},source:x=>{x.state.source='f'.repeat(40);},main:x=>{x.state.main='f'.repeat(40);},nominalDeadlock:x=>{x.state.admitStatus='in_progress';},restoreTerminal:x=>{x.state.restoreStatus='completed';}}))test('primary GitHub '+mode+' blocks tag/ref effects',async()=>{
 const x=await fixture();attack(x);assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
test('ready phase requires admit job in progress; restore phase requires it terminal',async()=>{
 const x=await fixture(),g=x.make();await assert.rejects(g.inspect('ready'));assert.equal((await g.inspect('restore')).restoreJobId,99);
 x.state.admitStatus='in_progress';assert.equal((await g.inspect('ready')).jobId,12);await assert.rejects(g.inspect('restore'));
});

test('lost send-ref ACK remains GET-only after reconstructing the GitHub client',async()=>{
 const x=await fixture();x.state.mode='lost';const record=x.record();
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 const before=x.requests.length,refPosts=x.refPosts,tagPosts=x.tagPosts;x.state.mode='normal';
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
 assert.equal(x.refPosts,refPosts);assert.equal(x.tagPosts,tagPosts);
 assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});

test('unknown deferred ref POST plus 404 cannot renew a reconstructed client',async()=>{
 const x=await fixture();x.state.mode='deferred';const record=x.record(),original=x.make();
 assert.equal(await original.claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 const before=x.requests.length;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
 x.finishPending();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'existing');
 assert.equal(x.refPosts,1);assert.equal(x.tagPosts,1);assert.throws(()=>original.consumeNewSend(record));
});
test('lost annotated-tag ACK consumes eligibility even when no send ref exists',async()=>{
 const x=await fixture();x.state.mode='tag-lost';const record=x.record();
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
 const before=x.requests.length;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,1);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});
test('default recovery with 404 has no capability and performs no mutation',async()=>{
 const x=await fixture(undefined,{origin:'none'}),before=x.requests.length;
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);assert.ok(x.requests.slice(before).every(r=>r.method==='GET'));
});
test('first failed claim consumes the one capability across clients and cannot re-admit',async()=>{
 const x=await fixture();x.state.attempt=2;
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.attempt=1;
 assert.equal(await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output}),false);
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
for(const mode of ['attempt2','unqualified-admission','wrong-proof','wrong-job','wrong-step'])test('original capability rejects '+mode,async()=>{
 const {syntheticOriginalEnvironment}=await import('./fixtures/finite-http-module.mjs');
 const x=await fixture(undefined,{origin:'none'});syntheticOriginalEnvironment(x.f.plan);
 let admission=x.admission,output=structuredClone(x.f.output);
 if(mode==='attempt2')x.state.attempt=2;
 if(mode==='unqualified-admission')admission={...admission};
 if(mode==='wrong-proof')output.retained.proofHash='f'.repeat(64);
 if(mode==='wrong-step')x.state.step=0;
 if(mode==='wrong-job')x.state.restoreStatus='completed';
 assert.equal(await x.make().admitOriginalExecution({admission,output}),false);
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
for(const mode of ['proof','job','step'])test('admitted capability does not survive changed '+mode,async()=>{
 const x=await fixture(),record=structuredClone(x.record());
 if(mode==='proof')record.proofHash='f'.repeat(64);
 if(mode==='job'){x.state.job=100;record.jobId=100;}
 if(mode==='step')x.state.step++;
 assert.equal(await x.make().claimSend(record,new AbortController().signal,()=>{}),'uncertain');assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
test('actual child process inheriting original PID marker cannot admit a send capability',async()=>{
 const {spawnSync}=await import('node:child_process');
 process.env.AFW_FINITE_RESTORE_ORIGINAL_PID=String(process.pid);
 const code="import {githubFixture} from './test/fixtures/finite-github.mjs';const x=await githubFixture(undefined,{origin:'none'});const admitted=await x.make().admitOriginalExecution({admission:x.admission,output:x.f.output});process.stdout.write(JSON.stringify({admitted,requests:x.requests.length,child:process.pid!==Number(process.env.AFW_FINITE_RESTORE_ORIGINAL_PID)}));";
 const child=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:20000});
 assert.equal(child.status,0,child.stderr);assert.deepEqual(JSON.parse(child.stdout),{admitted:false,requests:0,child:true});
});

test('cached 404 cannot authorize the original tag POST or refund the consumed capability',async()=>{
 const x=await fixture();x.state.mode='cached-404';
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');x.state.mode='normal';
 assert.equal(await x.make().claimSend(x.record(),new AbortController().signal,()=>{}),'uncertain');
 assert.equal(x.tagPosts,0);assert.equal(x.refPosts,0);
});
