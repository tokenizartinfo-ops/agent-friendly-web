import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { Miniflare, Response as DispatchResponse, convertV4MiniflareOptions } from 'miniflare';
import { compileFirstConnectionCandidate, firstConnectionWorkers, createGetWinnerHost } from './test/fixtures/finite-first-connection-publication.mjs';
const hash=x=>createHash('sha256').update(x).digest('hex');
const origin='https://delegated-canary.agentfriendlyweb.dev',path='/connections/finite-prepare';
const actorScript="import {DurableObject} from 'cloudflare:workers';\nexport class Initial extends DurableObject {\n constructor(ctx,env){super(ctx,env);this.mode='S';this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n configure(mode){if(!['S','V','L','OK'].includes(mode))throw Error('fixture mode');this.mode=mode;this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n async fetch(request){\n  this.arrivals++;\n  this.matched=request.method==='POST'&&request.url==='https://afw-private.invalid/_finite-owner/choice'&&\n   request.headers.get('x-afw-finite-original-method')==='GET'&&\n   request.headers.get('x-afw-finite-original-url')==='https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'&&\n   request.headers.get('x-afw-finite-version')==='55555555-5555-4555-8555-555555555555'&&\n   request.headers.has('x-afw-finite-boundary')&&request.headers.has('x-afw-finite-request-id');\n  if(!this.matched)return new Response(null,{status:409});\n  if(this.mode==='L'){await new Promise(resolve=>{this.release=resolve;});this.written=true;return new Response(null,{status:413});}\n  if(this.mode==='S')return new Response(null,{status:413});\n  return new Response('<html></html>',{headers:{'Content-Type':this.mode==='V'?'text/plain':'text/html'}});\n }\n state(){return {arrivals:this.arrivals,matched:this.matched,released:this.released,written:this.written};}\n finishLate(){this.released=true;this.release?.();}\n}\nexport default{fetch(){return new Response(null,{status:410});}};";
async function make(enabled) {
 const compiled=await compileFirstConnectionCandidate('c'.repeat(40),'d'.repeat(40),{dropWinner:true,getWinner:enabled});
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
  return {mf,actor:ns.get(ns.idFromName('afw-own-successor-closure-v1')),bytes:bytes.length,sha256:hash(bytes)};
 } catch(error) {try{await mf.dispose();}catch{}throw error;}
}
async function observe(f,mode,{method='GET',route=path,negative=false}={}) {
 await f.actor.configure(mode);
 const main={},host=createGetWinnerHost(main,()=>true,DispatchResponse),label={id:'C2T1_SCOPE_MISSING'},token=host.begin(label);
 const r=negative?await(await f.mf.getWorker('negative-first-connection')).fetch(origin+route,{method}):
  await f.mf.dispatchFetch(origin+route,{method,redirect:'manual'});
 const status=r.status,body=Buffer.from(await r.arrayBuffer());
 if(!negative)assert(r instanceof DispatchResponse);
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
function compare(a,b,marker) {
 assert.equal(a.marker,null);assert.equal(b.marker,marker);
 assert.equal(a.status,b.status);assert.deepEqual(a.body,b.body);
 assert.deepEqual(a.headers,b.headers.filter(([k])=>k!=='x-afw-lab-get-winner'));
}
async function boundedCase(run) {
 let timer;
 try {
  return await Promise.race([run(),new Promise((_,reject)=>{
   timer=setTimeout(()=>reject(new Error('AFW_TOOL_CASE_TIMEOUT')),120000);
  })]);
 } finally {clearTimeout(timer);}
}
export async function ordinaryNativeControls() {
 const pair=[],rows=[];let primaryFailed=false;
 try {
  pair.push(await make(false));pair.push(await make(true));
  for(const [id,mode,marker,status,w,s] of [
   ['ordinary-stub','S','g1.413.S.413',413,'S',413],
   ['ordinary-validator','V','g1.503.V.0',503,'V',0],
   ['ordinary-deadline-late-denial','L','g1.503.L.0',503,'L',0],
   ['ordinary-success','OK',null,200,'U',0]
  ]) {
   await boundedCase(async()=>{
   const a=await observe(pair[0],mode),b=await observe(pair[1],mode);
   compare(a,b,marker);assert.equal(b.status,status);
   assert.equal(a.state.arrivals,1);assert.equal(a.state.matched,true);
   assert.equal(b.state.arrivals,1);assert.equal(b.state.matched,true);
   assert.deepEqual(a.classified,{w:'U',s:0,h:0});
   assert.deepEqual(b.classified,{w,s,h:marker?status:0});
   if(status!==200)assert.equal(b.body.toString('utf8'),'{"status":"admin_pending","mayRetry":false,"operationalReadiness":false}');
   rows.push(id);
   });
  }
  for(const [id,options,status] of [['ordinary-POST',{method:'POST'},403],['ordinary-PUT',{method:'PUT'},405],['ordinary-wrong-route',{route:'/connections/not-the-choice'},404]]) {
   await boundedCase(async()=>{
   const a=await observe(pair[0],'S',options),b=await observe(pair[1],'S',options);
   compare(a,b,null);assert.equal(b.status,status);assert.equal(a.state.arrivals,0);assert.equal(b.state.arrivals,0);
   assert.deepEqual(b.classified,{w:'U',s:0,h:0});rows.push(id);
   });
  }
  const result=await boundedCase(()=>observe(pair[1],'S',{negative:true}));
  assert.equal(result.state.arrivals,1);assert.equal(result.state.matched,true);assert.equal(result.marker,null);assert.deepEqual(result.classified,{w:'U',s:0,h:0});rows.push('ordinary-negative-worker');
  return {ids:rows,off:{sha256:pair[0].sha256,bytes:pair[0].bytes},on:{sha256:pair[1].sha256,bytes:pair[1].bytes}};
 } catch(error) {primaryFailed=true;throw error;}
 finally {
  const disposed=await Promise.allSettled(pair.map(async f=>{await f.mf.dispose();}));
  if(!primaryFailed&&disposed.some(result=>result.status==='rejected'))throw new Error('AFW_ORDINARY_DISPOSAL_FAILED');
 }
}
