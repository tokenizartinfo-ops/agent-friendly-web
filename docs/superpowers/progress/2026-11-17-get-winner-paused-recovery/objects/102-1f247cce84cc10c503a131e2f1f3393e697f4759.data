import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { Miniflare, Response as DispatchResponse, convertV4MiniflareOptions } from 'miniflare';
import { compileFirstConnectionCandidate } from './test/fixtures/finite-first-get-fault-tool.mjs';
import { firstConnectionWorkers, createGetWinnerHost } from './test/fixtures/finite-first-connection-publication.mjs';
import { readFile } from 'node:fs/promises';
const hash=x=>createHash('sha256').update(x).digest('hex');
const origin='https://delegated-canary.agentfriendlyweb.dev',path='/connections/finite-prepare';
const actorScript="import {DurableObject} from 'cloudflare:workers';\nexport class Initial extends DurableObject {\n constructor(ctx,env){super(ctx,env);this.mode='S';this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n configure(mode){if(!['S','V','L','OK'].includes(mode))throw Error('fixture mode');this.mode=mode;this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n async fetch(request){\n  this.arrivals++;\n  this.matched=request.method==='POST'&&request.url==='https://afw-private.invalid/_finite-owner/choice'&&\n   request.headers.get('x-afw-finite-original-method')==='GET'&&\n   request.headers.get('x-afw-finite-original-url')==='https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'&&\n   request.headers.get('x-afw-finite-version')==='55555555-5555-4555-8555-555555555555'&&\n   request.headers.has('x-afw-finite-boundary')&&request.headers.has('x-afw-finite-request-id');\n  if(!this.matched)return new Response(null,{status:409});\n  if(this.mode==='L'){await new Promise(resolve=>{this.release=resolve;});this.written=true;return new Response(null,{status:413});}\n  if(this.mode==='S')return new Response(null,{status:413});\n  return new Response('<html></html>',{headers:{'Content-Type':this.mode==='V'?'text/plain':'text/html'}});\n }\n state(){return {arrivals:this.arrivals,matched:this.matched,released:this.released,written:this.written};}\n finishLate(){this.released=true;this.release?.();}\n}\nexport default{fetch(){return new Response(null,{status:410});}};";
async function make(enabled,fault) {
 const compiled=await compileFirstConnectionCandidate('c'.repeat(40),'d'.repeat(40),{dropWinner:true,getWinner:enabled,toolFault:fault});
 const bytes=Buffer.from(compiled.script);
 assert.deepEqual(bytes,Buffer.from(compiled.bytes));
 assert.deepEqual(bytes,gunzipSync(Buffer.from(compiled.resident.content,'base64')));
 assert.equal(bytes.length,compiled.resident.module.bytes);
 assert.equal(hash(bytes),compiled.resident.module.sha256);
 assert.notEqual(hash(bytes),compiled.spyHash);
 const qa={name:'qa-first-connection',modules:true,script:actorScript,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'}},
  outboundService:async()=>new Response(null,{status:503})};
 const raw=firstConnectionWorkers(qa,compiled);
 assert.deepEqual(raw.workers[0].durableObjects.AFW_FINITE_TRIAL_CONTROL,
  {className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'});
 raw.upstream=origin;
 const options=convertV4MiniflareOptions(raw),worker=options.workers[0].config,manifest=worker.manifest;
 assert.equal(worker.type,'worker');assert.equal(worker.name,'canary-first-connection');
 assert.equal(typeof manifest.mainModule,'string');assert.deepEqual(Object.keys(manifest.modules),[manifest.mainModule]);
 const main=manifest.modules[manifest.mainModule];
 assert.equal(main.type,'esm');assert.equal(typeof main.contents,'string');
 assert.deepEqual(Buffer.from(main.contents),bytes);assert.equal(hash(main.contents),compiled.resident.module.sha256);
 const mf=new Miniflare(options);
 try {
  const bindings=await mf.getBindings('qa-first-connection'),ns=bindings.AFW_INDEPENDENT_CLOSURE;
  return {mf,actor:ns.get(ns.idFromName('afw-own-successor-closure-v1')),bytes:bytes.length,sha256:hash(bytes),seam:compiled.toolFault};
 } catch(error) {try{await mf.dispose();}catch{}throw error;}
}
async function observe(f,mode,{method='GET',route=path,negative=false}={}) {
 await f.actor.configure(mode);
 const main={},host=createGetWinnerHost(main,()=>true,DispatchResponse),label={id:'C2T1_SCOPE_MISSING'},token=host.begin(label);
 const r=negative?await(await f.mf.getWorker('negative-first-connection')).fetch(origin+route,{method}):
  await f.mf.dispatchFetch(origin+route,{method,redirect:'manual'});
 const status=r.status,body=Buffer.from(await r.arrayBuffer());
 assert(r instanceof DispatchResponse);
 token.capture(main,r,status);host.finish(label);
 const classified=host.take(label,main),headers=[...r.headers],marker=r.headers.get('x-afw-lab-get-winner');
 const state=await f.actor.state();
 if(mode==='L') {
  assert.equal(state.arrivals,1);assert.equal(state.matched,true);
  assert.equal(state.released,false);assert.equal(state.written,false);
  await f.actor.finishLate();
  const late=await f.actor.state();assert.equal(late.written,true);
  assert.equal(r.headers.get('x-afw-lab-get-winner'),marker);
 }
 return {status,body,headers,marker,classified,state};
}
async function boundedCase(run){
 let timer;
 try{return await Promise.race([run(),new Promise((_,reject)=>{
  timer=setTimeout(()=>reject(new Error('AFW_FAULT_CASE_TIMEOUT')),120000);
 })]);}finally{clearTimeout(timer);}
}
export async function fixedFaultNativeControls(){
 const fixture=JSON.parse(await readFile('fixed-m-fault-expectations.json','utf8')),ids=[],residents=[];
 for(const row of fixture.rows)await boundedCase(async()=>{
  const pair=[];let primaryFailed=false;
  try{
   pair.push(await make(false,row.fault));pair.push(await make(true,row.fault));
   const a=await observe(pair[0],'S'),b=await observe(pair[1],'S');
   assert.equal(a.status,row.expected.status,row.id);assert.equal(b.status,row.expected.status,row.id);
   assert.deepEqual(a.body,b.body,row.id);assert.deepEqual(a.headers,b.headers,row.id);
   assert.equal(b.body.toString('utf8'),'{"status":"admin_pending","mayRetry":false,"operationalReadiness":false}');
   for(const observed of [a,b]){
    assert.equal(observed.marker,row.expected.header,row.id);
    assert.deepEqual(observed.classified,row.expected.host,row.id);
    assert.equal(observed.state.arrivals,row.expected.actorArrivals,row.id);
    assert.equal(observed.state.matched,row.expected.actorMatched,row.id);
   }
   for(const [index,variant]of ['OFF','ON'].entries()){
    assert.equal(pair[index].seam.id,row.id);assert.equal(pair[index].seam.enabled,index===1);
    ids.push(variant+':'+row.id);
   }
   residents.push({id:row.id,off:{sha256:pair[0].sha256,bytes:pair[0].bytes,seam:pair[0].seam},
    on:{sha256:pair[1].sha256,bytes:pair[1].bytes,seam:pair[1].seam}});
  }catch(error){primaryFailed=true;throw error;}
  finally{
   const disposed=await Promise.allSettled(pair.map(async f=>{await f.mf.dispose();}));
   if(!primaryFailed&&disposed.some(result=>result.status==='rejected'))throw new Error('AFW_FAULT_DISPOSAL_FAILED');
  }
 });
 return {ids,residents,scope:'TEST_ONLY_FIXED_M_SOURCE_FAULTS',ordinaryCompilerUnchanged:true,disposed:true};
}
