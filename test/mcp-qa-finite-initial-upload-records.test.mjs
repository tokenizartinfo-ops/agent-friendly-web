import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {sealFiniteInitialUploadRecord as seal,encodeFiniteInitialUploadRecord as encode,decodeFiniteInitialUploadRecord as decode} from '../lib/mcp-qa-finite-initial-upload-records.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
test('B2a bounded chunk codec reconstructs exact bytes and rejects tampered framing/hash',()=>{
 const bytes=Buffer.from('private baseline bytes'),v=seal('Chunk',{manifestHash:'a'.repeat(64),index:0,bytes:bytes.length,sha256:sha(bytes),content:bytes.toString('base64')}),raw=encode('Chunk',v);
 assert.equal(Buffer.from(decode('Chunk',raw).content,'base64').equals(bytes),true);
 for(const changed of [raw+' ',raw.replace('cHJp','AAAA'),raw.replace('"index":0','"index":1'),raw.replace('"purpose":','"unexpected":true,"purpose":')])assert.throws(()=>decode('Chunk',changed),/unavailable/);
});
test('B2a chunk codec rejects getter/prototype/unknown fields and oversize native values',()=>{
 const input={manifestHash:'a'.repeat(64),index:0,bytes:1,sha256:sha(Buffer.from([1])),content:'AQ=='};
 assert.throws(()=>seal('Chunk',{...input,extra:true}),/unavailable/);
 const getter={...input};Object.defineProperty(getter,'content',{get(){throw Error('getter executed');},enumerable:true});assert.throws(()=>seal('Chunk',getter),/unavailable/);
 assert.throws(()=>encode('Chunk',Object.assign(Object.create({}),seal('Chunk',input))),/unavailable/);
 assert.throws(()=>seal('Chunk',{...input,content:'A'.repeat(65537)}),/unavailable/);
 assert.throws(()=>seal('Chunk',{...input,index:64}),/unavailable/);
 assert.throws(()=>seal('Chunk',{...input,content:'AQ==\n'}),/unavailable/);
});
test('B2a ACK codecs accept only exact factual canonical UUID records, never latest/capability',()=>{
 const input={sendHash:'a'.repeat(64),uploadedVersionId:'55555555-5555-4555-8555-555555555555',acknowledgedAt:42},v=seal('Ack',input);
 assert.equal(decode('Ack',encode('Ack',v)).uploadedVersionId,input.uploadedVersionId);
 for(const id of ['latest','future','55555555-5555-4555-8555-55555555555Z'])assert.throws(()=>seal('Ack',{...input,uploadedVersionId:id}),/unavailable/);
 assert.throws(()=>seal('Ack',{...input,authorizesEffects:true}),/unavailable/);assert.throws(()=>seal('Activate',input),/unavailable/);
});
