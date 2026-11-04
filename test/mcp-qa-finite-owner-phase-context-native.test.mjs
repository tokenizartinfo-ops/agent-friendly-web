import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function world(fn){const f=await initialEntryHarness('phase-context');try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
async function read(f,mode='normal'){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=c.I0+400000-Date.now();try{return await plain(f.stub.phaseContextRead(400000,mode));}finally{f.nowOffset=0;}}
test('closed source keeps original A and stable original context',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),original=await plain(f.ownerRead()),writes=f.uploads.length+f.activations.length;
 const result=await read(f);assert.equal(result.fixtureError,undefined,JSON.stringify(result));assert.deepEqual(Object.keys(result).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(validateFiniteOwnerSource(result.source),original.source);assert.equal(result.preconnectionId,original.preconnectionId);assert.equal(result.capsuleHash,original.capsuleHash);
 assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);
 const sessions=await plain(f.stub.phasePrimaryReads());assert(sessions.length>=2);for(const queries of sessions)assert.match(queries[0],/^SELECT/i);
}));
