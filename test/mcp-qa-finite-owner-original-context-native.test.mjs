import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const copy=async p=>{const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}};
test('actual fixed QA adapter first GET uses exact original capsule selector and unrelated UI handles',async()=>{
 const f=await initialEntryHarness();
 try{
  await f.stub.configure('normal');assert.equal((await copy(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  const envelope=await copy(f.ownerRead()),token=await f.enrollmentToken(envelope.source),before=await copy(f.stub.snapshot());
  const result=await copy(f.ownerRead(400000,'private-choice',null,token));
  assert.equal(result.status,200);assert.equal(result.stage,'connection');
  assert.notEqual(result.handle,envelope.preconnectionId);assert.notEqual(result.projectRef,envelope.preconnectionId);
  const rows=await copy(f.stub.snapshot()),added=rows.filter(([key])=>!before.some(([old])=>key===old));
  const tickets=added.filter(([key])=>key.startsWith('owner-ticket:')).map(([,v])=>typeof v==='string'?JSON.parse(v):v);
  assert.equal(tickets.length,1);assert.equal(tickets[0].preconnectionId,envelope.preconnectionId);
  const snapshots=added.filter(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':source')).map(([,v])=>typeof v==='string'?JSON.parse(v):v);
  assert.equal(snapshots.length,1);assert.equal(snapshots[0].preconnectionId,envelope.preconnectionId);
  assert.equal(added.some(([key])=>key.endsWith(':use')||key.endsWith(':connection:approval')),false);
  assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.restores.length,0,'only existing SYN setup effects');
 }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
});
