import assert from 'node:assert/strict';
import test from 'node:test';
import { checkDelegatedEdge } from '../lib/delegated-edge-health.mjs';

test('closed service checks fixed public surfaces and reports unexpected opening without body data',async()=>{
  const calls=[];
  const result=await checkDelegatedEdge({service:'canary',fetchImpl:async(url,options)=>{calls.push({url,options});return new Response('private diagnostic',{status:url.endsWith('/mcp')?200:404});}});
  assert.equal(result.ok,false);assert.equal(result.checks.length,3);
  assert.ok(!JSON.stringify(result).includes('private diagnostic'));
  assert.ok(calls.every(x=>x.url.startsWith('https://delegated-canary.agentfriendlyweb.dev/')&&x.options.redirect==='error'&&!x.options.headers&&x.options.signal));
  await assert.rejects(()=>checkDelegatedEdge({service:'https://other.invalid'}),/Unknown service/);
});

test('available service requires valid discovery and unauthenticated MCP denial',async()=>{
  const origin='https://delegated-pilot.agentfriendlyweb.dev';
  const reply=path=>path.endsWith('/mcp')&&!path.includes('well-known')?new Response('',{status:401}):Response.json(path.includes('authorization-server')?{issuer:origin,authorization_endpoint:origin+'/authorize',token_endpoint:origin+'/oauth/token',code_challenge_methods_supported:['S256'],token_endpoint_auth_methods_supported:['none']}:{resource:origin+'/mcp',authorization_servers:[origin]});
  const success=await checkDelegatedEdge({service:'real-pilot',expected:'available',fetchImpl:async url=>reply(new URL(url).pathname)});
  assert.equal(success.ok,true);assert.equal(success.privateReadVerified,false);
  const wrong=await checkDelegatedEdge({service:'real-pilot',expected:'available',fetchImpl:async url=>url.includes('authorization-server')?Response.json({issuer:'https://other.invalid'}):reply(new URL(url).pathname)});
  assert.equal(wrong.ok,false);
  const malformed=await checkDelegatedEdge({service:'real-pilot',expected:'available',fetchImpl:async url=>url.includes('authorization-server')?Response.json({issuer:origin,authorization_endpoint:origin+'/authorize',token_endpoint:origin+'/oauth/token',code_challenge_methods_supported:'S256',token_endpoint_auth_methods_supported:'none'}):reply(new URL(url).pathname)});
  assert.equal(malformed.ok,false);
});

test('network failures and oversized metadata stay sanitized and fail closed',async()=>{
  const down=await checkDelegatedEdge({service:'canary',fetchImpl:async()=>{throw Error('secret callback detail');}});
  assert.equal(down.ok,false);assert.ok(!JSON.stringify(down).includes('secret callback'));
  const large=await checkDelegatedEdge({service:'canary',expected:'available',fetchImpl:async()=>new Response('x'.repeat(17000),{headers:{'Content-Type':'application/json'}})});
  assert.equal(large.ok,false);
});
