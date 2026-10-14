import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-retirement-provider-reader.mjs');
const resources={accountId:'a'.repeat(32),applicationId:'own-app',containerId:'b'.repeat(64)};
const point={id:resources.containerId,application_id:resources.applicationId,image:'cloudflare/debian-trixie',started_at:'2026-10-14T13:12:29.157Z',status:{state:'stopped',updated_at:'2026-10-14T13:12:33.217Z',exit_code:0}};
const response=(value={success:true,errors:[],result:point},headers={})=>new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json',...headers}});
const request=()=>({containerId:resources.containerId,applicationId:resources.applicationId,signal:new AbortController().signal});
test('fixed provider GET reads afresh and returns only selected instance fields',async()=>{
 const {createRetirementProviderReader}=await load();let calls=0;
 const read=createRetirementProviderReader({resources,readCredential:async()=> 'synthetic-token-value',fetchImpl:async(url,init)=>{calls++;assert.equal(url,`https://api.cloudflare.com/client/v4/accounts/${resources.accountId}/containers/applications/own-app/instances/${resources.containerId}`);assert.equal(init.method,'GET');assert.equal(init.redirect,'manual');assert.equal(init.cache,'no-store');assert.equal(init.headers['Cache-Control'],'no-cache, no-store');return response({success:true,errors:[],result:{...point,environment:{private:'not-returned'}}});}});
 assert.deepEqual(await read(request()),point);assert.deepEqual(await read(request()),point);assert.equal(calls,2);
});
test('foreign requests are denied before credentials or fetch',async()=>{
 const {createRetirementProviderReader}=await load();let reads=0;
 const read=createRetirementProviderReader({resources,readCredential:async()=>{reads++;return 'synthetic-token-value';}});
 for(const input of [{...request(),containerId:'c'.repeat(64)},{...request(),applicationId:'other'},{...request(),url:'https://evil.test'}, {...request(),signal:AbortSignal.abort()}])await assert.rejects(read(input),/unavailable/);
 assert.equal(reads,0);
});
test('redirects, cache hits, malformed and oversized payloads fail sanitized',async()=>{
 const {createRetirementProviderReader}=await load();
 for(const make of [()=>new Response('',{status:302}),()=>response(undefined,{Age:'1'}),()=>response(undefined,{'CF-Cache-Status':'HIT'}),()=>response({success:false,errors:[{message:'secret'}],result:point}),()=>response({success:true,errors:[],result:{...point,id:'c'.repeat(64)}}),()=>new Response('x'.repeat(65537),{headers:{'Content-Type':'application/json'}})]){
 const read=createRetirementProviderReader({resources,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>make()});await assert.rejects(read(request()),e=>e.message==='Retirement provider unavailable');}
});
test('caller cancellation and deadline bound stuck network and body',async()=>{
 const {createRetirementProviderReader}=await load();let signal;
 const read=createRetirementProviderReader({resources,timeoutMs:30,readCredential:async()=> 'synthetic-token-value',fetchImpl:async(_url,init)=>{signal=init.signal;return new Promise(()=>{});}});
 await assert.rejects(read(request()));assert.equal(signal.aborted,true);
 const controller=new AbortController();const p=read({...request(),signal:controller.signal});controller.abort();await assert.rejects(p);
 const stalled=createRetirementProviderReader({resources,timeoutMs:30,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>new Response(new ReadableStream({start(){}}),{headers:{'Content-Type':'application/json'}})});await assert.rejects(stalled(request()));
});

test('provider reader composes with retirement evidence and makes two fresh requests',async()=>{
 const {createRetirementProviderReader}=await load();const {createRetirementEvidenceReader}=await import('../lib/mcp-retirement-evidence.mjs');let calls=0;
 const now=Date.parse('2026-10-14T13:13:00.000Z'),original={containerId:resources.containerId,applicationId:resources.applicationId,programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40)};
 const custody={purpose:'afw.node-retirement-observation.v1',containerId:original.containerId,programHash:original.programHash,sourceRevision:original.sourceRevision,processGeneration:'e'.repeat(64),image:point.image,createdAt:now-40000,expiresAt:now-10000,closedAt:now-20000,observedAt:now,physicalStopVerified:false,mayStartSuccessor:false};
 const readInstance=createRetirementProviderReader({resources,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>{calls++;return response();}});
 const result=await createRetirementEvidenceReader({original,readCustody:async()=>custody,readInstance,now:()=>now}).observe();
 assert.equal(calls,2);assert.equal(result.physicalStopVerified,true);assert.equal(result.mayStartSuccessor,false);
});
test('deadline rejects a resolved network response after monotonic budget',async t=>{
 const {createRetirementProviderReader}=await load();let tick=0;t.mock.method(performance,'now',()=>tick);
 const read=createRetirementProviderReader({resources,timeoutMs:30,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>{tick=31;return response();}});await assert.rejects(read(request()));
});

test('resource pins must be primitive immutable identifiers',async()=>{
 const {createRetirementProviderReader}=await load();
 for(const key of ['accountId','applicationId','containerId'])assert.throws(()=>createRetirementProviderReader({resources:{...resources,[key]:{toString:()=>resources[key]}},readCredential:async()=> 'synthetic-token-value'}));
});

test('body cancellation, invalid UTF-8 and declared oversize are rejected',async()=>{
 const {createRetirementProviderReader}=await load();
 for(const bytes of [new Uint8Array(65537),new Uint8Array([0xc3,0x28])]){
 let cancelled=false;const read=createRetirementProviderReader({resources,readCredential:async()=> 'synthetic-token-value',timeoutMs:30,fetchImpl:async()=>new Response(new ReadableStream({start(c){c.enqueue(bytes);if(bytes.length<65537)c.close();},cancel(){cancelled=true;}}),{headers:{'Content-Type':'application/json'}})});
 await assert.rejects(read(request()));if(bytes.length>65536)assert.equal(cancelled,true);
 }
 const oversized=createRetirementProviderReader({resources,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>response(undefined,{'Content-Length':'65537'})});await assert.rejects(oversized(request()));
 let cancelled=false;const stalled=createRetirementProviderReader({resources,timeoutMs:30,readCredential:async()=> 'synthetic-token-value',fetchImpl:async()=>new Response(new ReadableStream({cancel(){cancelled=true;}}),{headers:{'Content-Type':'application/json'}})});await assert.rejects(stalled(request()));assert.equal(cancelled,true);
});
