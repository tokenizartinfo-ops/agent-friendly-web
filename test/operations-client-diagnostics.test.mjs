import test from 'node:test';
import assert from 'node:assert/strict';
import { createOperationsClient } from '../lib/operations-client.mjs';
import { runOperationsClient } from '../scripts/afw-operations-client.mjs';
import { spawnSync } from 'node:child_process';
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};

test('optional diagnostics distinguish HTTP rejection without reading untrusted error bodies',async()=>{
 const observations=[];let read=false;
 const response=Response.json({message:env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET},{status:401});
 response.json=async()=>{read=true;throw Error('must not read');};
 await assert.rejects(createOperationsClient({env,fetchImpl:async()=>response,onDiagnostic:x=>observations.push(x)}).list(),/Operational request unavailable/);
 assert.deepEqual(observations,[{stage:'response',status:401,format:'json'}]);
 assert.equal(read,false);assert.ok(!JSON.stringify(observations).includes('synthetic'));
});

test('transport errors are reduced to a fixed category and observer exceptions cannot affect success',async()=>{
 const observations=[];
 await assert.rejects(createOperationsClient({env,fetchImpl:async()=>{throw Error(env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET);},onDiagnostic:x=>observations.push(x)}).list());
 assert.deepEqual(observations,[{stage:'transport'}]);
 assert.deepEqual(await createOperationsClient({env,fetchImpl:async()=>Response.json({incidents:[]}),onDiagnostic:()=>{throw Error('observer');}}).list(),[]);
});

test('configuration failure performs no request; CLI adapter forwards diagnostics from one denied request',async()=>{
 const observations=[];let calls=0;
 await assert.rejects(createOperationsClient({env:{},fetchImpl:async()=>{calls++;},onDiagnostic:x=>observations.push(x)}).list());
 assert.equal(calls,0);assert.deepEqual(observations,[{stage:'configuration'}]);
 observations.length=0;
 await assert.rejects(runOperationsClient(['assistance-list'],env,{fetchImpl:async()=>{calls++;return new Response('sensitive',{status:403,headers:{'content-type':'text/html; private=synthetic-secret'}});},onDiagnostic:x=>observations.push(x)}));
 assert.equal(calls,1);assert.deepEqual(observations,[{stage:'response',status:403,format:'html'}]);
});

test('a 200 header is not reported as completion when response body stalls',async()=>{
 const observations=[];let cancelled=false;
 const response=new Response(new ReadableStream({cancel(){cancelled=true;}}),{headers:{'content-type':'application/json'}});
 await assert.rejects(createOperationsClient({env,timeoutMs:15,fetchImpl:async()=>response,onDiagnostic:x=>observations.push(x)}).list());
 assert.deepEqual(observations,[{stage:'response',status:200,format:'json'},{stage:'timeout'}]);
 assert.equal(cancelled,true);
});

test('CLI diagnostics are opt-in and keep success output separate from sanitized errors',()=>{
 const childEnv={...process.env,AFW_OPERATIONS_ACCESS_CLIENT_ID:'',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'must-not-escape'};
 const plain=spawnSync(process.execPath,['scripts/afw-operations-client.mjs','assistance-list'],{env:childEnv,encoding:'utf8',timeout:10000});
 assert.equal(plain.status,1);assert.equal(plain.stdout,'');assert.equal(plain.stderr,'Operational request unavailable\n');
 const diagnostic=spawnSync(process.execPath,['scripts/afw-operations-client.mjs','--diagnostics','assistance-list'],{env:childEnv,encoding:'utf8',timeout:10000});
 assert.equal(diagnostic.status,1);assert.equal(diagnostic.stdout,'');
 assert.equal(diagnostic.stderr,'{"diagnostic":{"stage":"configuration"}}\nOperational request unavailable\n');
 assert.ok(!diagnostic.stderr.includes('must-not-escape'));
});
