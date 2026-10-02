import test from 'node:test';
import assert from 'node:assert/strict';
import {createA2aRateLimit} from '../lib/public-a2a-rate-limit.mjs';

test('A2A limiter fails closed for absent binding and malformed responses',async()=>{
 assert.equal(await createA2aRateLimit()(),false);
 for(const response of [undefined,{}, {success:1},{success:false}]) assert.equal(await createA2aRateLimit({binding:{limit:async()=>response}})(),false);
});
test('A2A limiter uses server-selected service key, ignores client headers',async()=>{
 const calls=[];const limit=createA2aRateLimit({binding:{limit:async input=>{calls.push(input);return {success:true};}}});
 assert.equal(await limit(new Request('https://agentfriendlyweb.dev/a2a',{headers:{'x-forwarded-for':'spoofed','cf-connecting-ip':'spoofed'}})),true);
 assert.deepEqual(calls,[{key:'afw-public-a2a-diagnostic-v1'}]);
});
test('A2A limiter bounds waiting and sanitizes binding failures',async()=>{
 assert.equal(await createA2aRateLimit({binding:{limit:()=>new Promise(()=>{})},timeoutMs:10})(),false);
 assert.equal(await createA2aRateLimit({binding:{limit:async()=>{throw Error('private detail');}}})(),false);
 assert.throws(()=>createA2aRateLimit({timeoutMs:0}));
});
