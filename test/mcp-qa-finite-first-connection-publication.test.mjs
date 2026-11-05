import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
test('T1 fixed engine exposes only finite operations',async()=>{
 await assert.doesNotReject(access('lib/mcp-qa-finite-fixed-policy-engine.mjs'),'fixed finite operation contract must exist before publication');
 const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs');
 const engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
 assert(Object.isFrozen(engine));
 assert.deepEqual(Object.keys(engine).sort(),['activate','describeActivation','describeUpload','readPointer','readVersion','upload'].sort());
});
test('T1 enrollment preserves literal chronology and one shot',async()=>{
 await assert.doesNotReject(access('lib/mcp-qa-finite-preparation-enrollment-writer.mjs'),'fixed factual enrollment writer contract must exist');
});

import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {plain} from './fixtures/finite-first-connection-publication.mjs';
test('T1 baseline enrollment chronology remains native and pending',async()=>{
 const f=await initialEntryHarness('first-connection-enrollment-component');
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);
  const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);f.nowOffset=capsule.I0+400000-Date.now();
  const screen=await plain(f.stub.enrollmentScreen(token));assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
  const observed=await plain(f.stub.captureLegacyEnrollment(token,screen));
  assert.equal(observed.result.result.outcome.status,'admin_pending',JSON.stringify(observed));
  assert.equal(observed.result.prepared.status,202);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
  assert(observed.trace.includes('put:enrollment'));assert(observed.trace.includes('put:ack'));
  console.info('T1 legacy enrollment trace',JSON.stringify(observed.trace));
  const written=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-cleanup.v1:'));
  console.info('T1 legacy enrollment DATA',JSON.stringify(written.map(([key,raw])=>({key,record:JSON.parse(raw)}))));
 }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
});
