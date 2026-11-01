import test from 'node:test';
import assert from 'node:assert/strict';
import {githubFixture as fixture} from './fixtures/finite-github.mjs';

test('durable unique ref fences changed job/reconstructed client; tag object alone grants nothing',async()=>{
 const x=await fixture(),client=x.make(),record=x.record();
 assert.throws(()=>client.consumeNewSend(record));assert.equal(await client.claimSend(record,new AbortController().signal,()=>{}),'issued');
 assert.deepEqual(await client.readSend(),record);client.consumeNewSend(record);assert.throws(()=>client.consumeNewSend(record));
 x.state.job=100;const restarted=x.make();assert.equal(await restarted.claimSend(x.record(),new AbortController().signal,()=>{}),'existing');assert.throws(()=>restarted.consumeNewSend(x.record()));
 assert.equal(x.refPosts,2);assert.equal(x.requests.filter(x=>['PATCH','DELETE','PUT'].includes(x.method)).length,0);
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
