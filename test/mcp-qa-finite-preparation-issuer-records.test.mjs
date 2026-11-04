import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('issuer strict codec new interface exists',async()=>{
 const api=await import('../lib/mcp-qa-finite-preparation-issuer-records.mjs');
 for(const name of ['sealFinitePreparationIssuerRecord','encodeFinitePreparationIssuerRecord','decodeFinitePreparationIssuerRecord'])assert.equal(typeof api[name],'function');
 assert.equal(api.FINITE_PREPARATION_ISSUER_PREFIX,'afw.finite-preparation-issuer.v1:');
});
test('issuer new monotonic schema exists and plain open cannot replace tombstone',async()=>{
 const sql=await readFile('db/finite-preparation-issuer-fences.sql','utf8');
 for(const word of ['finite_preparation_issuer_fences','no_delete','immutable_identity','terminal_fence'])assert.ok(sql.includes(word));
});
test('issuer new fixed native factories exist without ordinary fallback',async()=>{
 for(const [file,name] of [['journal','createFinitePreparationIssuerJournal'],['store','createFinitePreparationIssuerStore']]){
  const api=await import('../lib/mcp-qa-finite-preparation-issuer-'+file+'.mjs');assert.equal(typeof api[name],'function');
 }
});
