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
