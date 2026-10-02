import test from 'node:test';
import assert from 'node:assert/strict';
import {createA2aWorker} from '../worker/a2a/index.mjs';
const body={jsonrpc:'2.0',id:1,method:'SendMessage',params:{message:{messageId:'test',role:'ROLE_USER',parts:[{data:{url:'https://example.com'}}]}}};
const request=(path='/a2a')=>new Request(`https://a2a-canary.agentfriendlyweb.dev${path}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
test('A2A Worker stays closed without exact flag or at other routes',async()=>{
 let called=0;const worker=createA2aWorker({audit:async()=>{called++;throw Error('unexpected');}});
 for(const flag of [undefined,false,true,'false','TRUE'])assert.equal((await worker.fetch(request(),{A2A_ENABLED:flag})).status,404);
 assert.equal((await worker.fetch(request('/.well-known/agent-card.json'),{A2A_ENABLED:'true'})).status,404);assert.equal(called,0);
});
test('A2A Worker requires dedicated limiter and shares instance concurrency',async()=>{
 let finish;const worker=createA2aWorker({maxConcurrent:1,audit:()=>new Promise(resolve=>{finish=resolve;})});
 assert.equal((await worker.fetch(request(),{A2A_ENABLED:'true'})).status,503);
 const env={A2A_ENABLED:'true',A2A_RATE_LIMITER:{limit:async()=>({success:true})}};
 const first=worker.fetch(request(),env);await new Promise(resolve=>setTimeout(resolve,5));
 const second=await worker.fetch(request(),env);assert.equal((await second.json()).error.code,-32000);
 finish({target:'https://example.com',checkedAt:new Date().toISOString(),evidence:{},limits:[]});assert.ok((await (await first).json()).result);
});
