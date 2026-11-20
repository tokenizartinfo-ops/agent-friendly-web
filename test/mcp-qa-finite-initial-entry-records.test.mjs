import test from 'node:test';
import assert from 'node:assert/strict';
import {initialInstanceId} from '../lib/mcp-qa-finite-initial-material-records.mjs';
let codec;try{codec=await import('../lib/mcp-qa-finite-initial-entry-records.mjs');}catch{codec={encodeFiniteInitialEntry(){throw Error('missing entry codec');},hashFiniteInitialEntry(){throw Error('missing entry codec');}};}
const base=()=>{const v={purpose:'afw.finite-initial-entry.v1',commandId:1,commandHash:'a'.repeat(64),sourceRevision:'b'.repeat(40),sourceTree:'c'.repeat(40),qaVersionId:'11111111-1111-4111-8111-111111111111',workflowName:'afw-own-qa-private-bootstrap',createdAt:1000,I0:0,initialDeadline:300000,operationDeadline:31000};v.initialInstanceId=initialInstanceId(v);return v;};
test('B1 exact deterministic entry codec roundtrip',()=>{const b=base(),v={...b,entryHash:codec.hashFiniteInitialEntry(b)},raw=codec.encodeFiniteInitialEntry(v);assert.deepEqual(codec.decodeFiniteInitialEntry(raw),v);assert.ok(Buffer.byteLength(raw)<=4096);});
test('B1 entry codec rejects renewed deadline, getters and extra fields',()=>{const b=base();for(const v of [{...b,operationDeadline:32000},{...b,extra:true},Object.defineProperty({...b},'I0',{get(){throw Error('getter');},enumerable:true})])assert.throws(()=>codec.hashFiniteInitialEntry(v));});
