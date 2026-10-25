import test from 'node:test';
import assert from 'node:assert/strict';
import { makeGuardedFetch, bodies, protocolResult, readCapped } from '../scripts/public-json-acceptance.mjs';

test('acceptance denies foreign URLs, caller auth and nonliteral writes before fetch',async()=>{
 let calls=0;const guarded=makeGuardedFetch({mode:'stage0',notAfter:Date.now()+5000,fetchImpl:async()=>{calls++;return new Response('{}');}});
 for(const [url,init] of [
  ['https://example.com/',{method:'GET'}],
  ['https://agentfriendlyweb.dev/?other=1',{method:'GET'}],
  ['https://agentfriendlyweb.dev/',{method:'GET',headers:{authorization:'Bearer fixture'}}],
  ['https://agentfriendlyweb.dev/mcp',{method:'POST',body:JSON.stringify({method:'tools/call'})}],
  ['https://agentfriendlyweb.dev/api/projects',{method:'POST',body:'{}'}],
 ])await assert.rejects(guarded(url,init));
 assert.equal(calls,0);
});
test('normal reads omit override while stage0 has only the fixed candidate',async()=>{
 for(const mode of ['stage0','normal']){
  let seen;const guarded=makeGuardedFetch({mode,notAfter:Date.now()+5000,fetchImpl:async(_,init)=>{seen=init;return new Response('{}');}});
  await guarded('https://agentfriendlyweb.dev/mcp',{method:'POST',headers:{accept:'application/json, text/event-stream','content-type':'application/json'},body:bodies.initialize});
  assert.equal(seen.redirect,'manual');assert.equal(seen.credentials,'omit');
  assert.equal(seen.headers.get('Cloudflare-Workers-Version-Overrides'),mode==='stage0'?'agent-friendly-web-web-production="1772ceae-7e8d-4dbc-bc1d-0ade956a3e45"':null);
 }
});
test('expired or unknown observation cannot emit a request',async()=>{
 let calls=0;
 for(const options of [{mode:'normal',notAfter:Date.now()-1},{mode:'other',notAfter:Date.now()+1000}]){
  await assert.rejects(async()=>makeGuardedFetch({...options,fetchImpl:async()=>{calls++;}})('https://agentfriendlyweb.dev/',{method:'GET'}));
 }
 assert.equal(calls,0);
});
test('complexity requires exact413 and allowed boundaries retain protocol errors',()=>{
 const json=x=>Buffer.from(JSON.stringify(x));
 for(const name of ['depth65','values4097']){
  assert.equal(protocolResult(name,413,json({error:{code:'request_too_complex'}})).ok,true);
  assert.equal(protocolResult(name,200,json({error:{code:'request_too_complex'}})).ok,false);
 }
 for(const name of ['depth64','values4096']){
  assert.equal(protocolResult(name,400,json({error:{code:-32600}})).ok,true);
  assert.equal(protocolResult(name,413,json({error:{code:'request_too_complex'}})).ok,false);
 }
 assert.equal(protocolResult('invalid',400,json({error:{code:-32700}})).ok,true);
 assert.equal(protocolResult('initialize',200,json({jsonrpc:'2.0',id:1,result:{}})).ok,true);
 assert.equal(protocolResult('toolsList',200,json({jsonrpc:'2.0',id:1,result:{}})).ok,false);
});
test('response reader enforces512KiB while streaming',async()=>{
 let cancelled=false;
 const response=new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array(524289));},cancel(){cancelled=true;}}));
 await assert.rejects(readCapped(response),/response_cap/);
 assert.equal(cancelled,true);
});
