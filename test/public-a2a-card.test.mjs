import test from 'node:test';
import assert from 'node:assert/strict';
import {createA2aWorker} from '../worker/a2a/index.mjs';
const request=(method='GET')=>new Request('https://a2a.agentfriendlyweb.dev/.well-known/agent-card.json',{method});
const env={A2A_ENABLED:'true',A2A_DISCOVERY_ENABLED:'true',A2A_RATE_LIMITER:{limit:async()=>({success:true})}};
test('Agent Card requires enabled service, dedicated binding and independent discovery flag',async()=>{
 const worker=createA2aWorker();
 for(const flags of [{},{A2A_ENABLED:'true'},{...env,A2A_ENABLED:'false'},{...env,A2A_DISCOVERY_ENABLED:'false'},{...env,A2A_RATE_LIMITER:undefined}])assert.equal((await worker.fetch(request(),flags)).status,404);
});
test('Agent Card declares only bounded structured public diagnostic',async()=>{
 const response=await createA2aWorker().fetch(request(),env);assert.equal(response.status,200);
 const card=await response.json();assert.deepEqual(card.supportedInterfaces,[{url:'https://a2a.agentfriendlyweb.dev/a2a',protocolBinding:'JSONRPC',protocolVersion:'1.0'}]);
 assert.equal(card.capabilities.streaming,false);assert.equal(card.capabilities.pushNotifications,false);assert.equal(card.capabilities.extendedAgentCard,false);
 assert.deepEqual(card.defaultInputModes,['application/json']);assert.equal(card.skills.length,1);assert.ok(card.skills[0].tags.includes('read-only'));assert.match(card.description,/private|privad/i);
 assert.match(response.headers.get('cache-control'),/max-age=60/);assert.ok(response.headers.get('etag'));
 assert.equal((await createA2aWorker().fetch(request('POST'),env)).status,405);
});

test('Agent Card HEAD and conditional GET preserve cache metadata; shutdown overrides ETag',async()=>{
 const worker=createA2aWorker();const first=await worker.fetch(request(),env);const etag=first.headers.get('etag');
 const head=await worker.fetch(request('HEAD'),env);assert.equal(head.status,200);assert.equal(await head.text(),'');assert.equal(head.headers.get('etag'),etag);
 const conditional=new Request('https://a2a.agentfriendlyweb.dev/.well-known/agent-card.json',{headers:{'if-none-match':etag}});
 assert.equal((await worker.fetch(conditional,env)).status,304);
 assert.equal((await worker.fetch(conditional,{...env,A2A_ENABLED:'false'})).status,404);
});
