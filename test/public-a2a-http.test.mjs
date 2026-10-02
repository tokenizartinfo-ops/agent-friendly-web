import test from 'node:test';
import assert from 'node:assert/strict';
import { createDiagnosticHttpHandler } from '../lib/public-a2a-http.mjs';
import { createDiagnosticAgent } from '../lib/public-a2a.mjs';
import { createServer } from 'node:http';
import { once } from 'node:events';

const body=JSON.stringify({jsonrpc:'2.0',id:1,method:'SendMessage',params:{message:{messageId:'a',role:'ROLE_USER',parts:[{data:{url:'https://example.com'}}]}}});
const request=(text=body,headers={})=>new Request('https://agentfriendlyweb.dev/a2a',{method:'POST',headers:{'content-type':'application/json',...headers},body:text});
const agent={handle:async(r,v)=>({jsonrpc:'2.0',id:r.id,result:{message:{version:v}}})};

test('closed and unbound handlers never invoke diagnostic',async()=>{
 let calls=0;const forbidden={handle:()=>{calls++;}};
 assert.equal((await createDiagnosticHttpHandler({agent:forbidden})(request())).status,404);
 assert.equal((await createDiagnosticHttpHandler({enabled:true,agent:forbidden})(request())).status,503);
 assert.equal(calls,0);
});
test('gate rejection and failure are closed; no spoofable IP decision in adapter',async()=>{
 for(const rateLimit of [async()=>false,async()=>{throw Error('private limit detail');}]) {
  const response=await createDiagnosticHttpHandler({enabled:true,agent,rateLimit})(request());
  assert.ok([429,503].includes(response.status));assert.ok(!(await response.text()).includes('private'));
 }
});
test('valid request returns JSON-RPC with version, no cache or CORS grant',async()=>{
 const handler=createDiagnosticHttpHandler({enabled:true,agent,rateLimit:async()=>true});
 const response=await handler(request());assert.equal(response.status,200);
 assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(response.headers.get('a2a-version'),'1.0');
 assert.equal(response.headers.get('access-control-allow-origin'),null);
 assert.equal((await response.json()).id,1);
});
test('method, MIME, malformed and streamed oversized body fail before agent',async()=>{
 let calls=0;const handler=createDiagnosticHttpHandler({enabled:true,agent:{handle:()=>{calls++;}},rateLimit:async()=>true,maxBodyBytes:512});
 assert.equal((await handler(new Request('https://agentfriendlyweb.dev/a2a'))).status,405);
 assert.equal((await handler(request(body,{'content-type':'text/plain'}))).status,415);
 assert.equal((await handler(request('{'))).status,400);
 assert.equal((await handler(request('x'.repeat(513)))).status,413);
 const stream=new ReadableStream({start(c){c.enqueue(new Uint8Array(513));c.close();}});
 assert.equal((await handler(new Request('https://agentfriendlyweb.dev/a2a',{method:'POST',headers:{'content-type':'application/json'},body:stream,duplex:'half'}))).status,413);
 assert.equal(calls,0);
});
test('slow body times out without starting diagnostic',async()=>{
 const stream=new ReadableStream({start(){}});
 const req=new Request('https://agentfriendlyweb.dev/a2a',{method:'POST',headers:{'content-type':'application/json'},body:stream,duplex:'half'});
 const handler=createDiagnosticHttpHandler({enabled:true,agent,rateLimit:async()=>true,bodyTimeoutMs:10});
 assert.equal((await handler(req)).status,408);
});

test('separate HTTP client receives dated diagnostic over a real local socket',async()=>{
 const handler=createDiagnosticHttpHandler({enabled:true,rateLimit:async()=>true,agent:createDiagnosticAgent({audit:async()=>({target:'https://example.com',checkedAt:'2026-10-02T18:00:00Z',evidence:{robots:false},limits:['Synthetic fixture']})})});
 const server=createServer(async(req,res)=>{
  const chunks=[];for await(const chunk of req)chunks.push(chunk);
  const response=await handler(new Request('http://127.0.0.1/a2a',{method:req.method,headers:req.headers,body:Buffer.concat(chunks)}));
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());
 });
 server.listen(0,'127.0.0.1');await once(server,'listening');
 try {
  const response=await fetch(`http://127.0.0.1:${server.address().port}/a2a`,{method:'POST',headers:{'content-type':'application/json','a2a-version':'1.0'},body});
  assert.equal(response.status,200);const result=await response.json();
  assert.equal(result.result.message.role,'ROLE_AGENT');assert.equal(result.result.message.parts[0].data.audit.checkedAt,'2026-10-02T18:00:00Z');
  assert.equal(result.result.message.parts[0].data.publicationAuthorized,false);
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
