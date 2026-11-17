import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { readFile } from 'node:fs/promises';
import { Miniflare, Response as DispatchResponse, convertV4MiniflareOptions } from 'miniflare';
import { compileFirstConnectionCandidate, firstConnectionWorkers, createGetWinnerHost } from './test/fixtures/finite-first-connection-publication.mjs';
const hash=x=>createHash('sha256').update(x).digest('hex');
const origin='https://delegated-canary.agentfriendlyweb.dev',path='/connections/finite-prepare';
const actorScript="import {DurableObject} from 'cloudflare:workers';\nexport class Initial extends DurableObject {\n constructor(ctx,env){super(ctx,env);this.mode='S';this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n configure(mode){if(!['S','V','L','OK'].includes(mode))throw Error('fixture mode');this.mode=mode;this.arrivals=0;this.matched=false;this.released=false;this.written=false;}\n async fetch(request){\n  this.arrivals++;\n  this.matched=request.method==='POST'&&request.url==='https://afw-private.invalid/_finite-owner/choice'&&\n   request.headers.get('x-afw-finite-original-method')==='GET'&&\n   request.headers.get('x-afw-finite-original-url')==='https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'&&\n   request.headers.get('x-afw-finite-version')==='55555555-5555-4555-8555-555555555555'&&\n   request.headers.has('x-afw-finite-boundary')&&request.headers.has('x-afw-finite-request-id');\n  if(!this.matched)return new Response(null,{status:409});\n  if(this.mode==='L'){await new Promise(resolve=>{this.release=resolve;});this.written=true;return new Response(null,{status:413});}\n  if(this.mode==='S')return new Response(null,{status:413});\n  return new Response('<html></html>',{headers:{'Content-Type':this.mode==='V'?'text/plain':'text/html'}});\n }\n state(){return {arrivals:this.arrivals,matched:this.matched,released:this.released,written:this.written};}\n finishLate(){this.released=true;this.release?.();}\n}\nexport default{fetch(){return new Response(null,{status:410});}};";
async function make(enabled,mode) {
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
 const script="export default {async fetch(request,env) {\n const r=await env.M.fetch(request);\n if(r.status!==413)throw new Error('AFW_TRANSPORT_STATUS');\n const expected=ENABLED?'g1.413.S.413':null;\n if(r.headers.get('x-afw-lab-get-winner')!==expected)throw new Error('AFW_TRANSPORT_ORIGIN_MARKER');\n const headers=new Headers(r.headers);\n if(STRIP)headers.delete('x-afw-lab-get-winner');\n const copied=new Response(r.body,{status:r.status,statusText:r.statusText,headers});\n if(copied===r)throw new Error('AFW_TRANSPORT_IDENTITY');\n const wanted=[...r.headers].filter(([key])=>!STRIP||key!=='x-afw-lab-get-winner');\n if(JSON.stringify([...copied.headers])!==JSON.stringify(wanted))throw new Error('AFW_TRANSPORT_HEADERS');\n return copied;\n}};\n".replaceAll('ENABLED',enabled?'true':'false').replaceAll('STRIP',mode==='strip'?'true':'false');
 raw.workers.unshift({name:'get-transport-control',modules:true,script,compatibilityDate:'2026-09-07',
  serviceBindings:{M:'canary-first-connection'},outboundService:async()=>new Response(null,{status:503})});
 raw.upstream=origin;
 const options=convertV4MiniflareOptions(raw),worker=options.workers.find(item=>item.config.name==='canary-first-connection').config,manifest=worker.manifest;
 assert.equal(worker.type,'worker');assert.equal(worker.name,'canary-first-connection');
 assert.equal(typeof manifest.mainModule,'string');assert.deepEqual(Object.keys(manifest.modules),[manifest.mainModule]);
 const main=manifest.modules[manifest.mainModule];
 assert.equal(main.type,'esm');assert.equal(typeof main.contents,'string');
 assert.deepEqual(Buffer.from(main.contents),bytes);assert.equal(hash(main.contents),compiled.resident.module.sha256);
 const first=options.workers[0].config;
 assert.equal(first.name,'get-transport-control');
 assert.equal(first.manifest.modules[first.manifest.mainModule].type,'esm');
 assert.equal(first.manifest.modules[first.manifest.mainModule].contents,script);
 const mf=new Miniflare(options);
 try {
  const bindings=await mf.getBindings('qa-first-connection'),ns=bindings.AFW_INDEPENDENT_CLOSURE;
  return {mf,actor:ns.get(ns.idFromName('afw-own-successor-closure-v1')),bytes:bytes.length,sha256:hash(bytes),transportSha256:hash(script)};
 } catch(error) {try{await mf.dispose();}catch{}throw error;}
}
async function observe(f,enabled,row) {
 await f.actor.configure('S');
 const r=await f.mf.dispatchFetch(origin+path,{method:'GET',redirect:'manual'});
 assert(r instanceof DispatchResponse);
 const status=r.status,body=Buffer.from(await r.arrayBuffer()),headers=[...r.headers];
 const main={},label={id:'C2T1_SCOPE_MISSING'},host=createGetWinnerHost(main,()=>false,DispatchResponse);
 const token=host.begin(label);token.capture(main,r,status);host.finish(label);
 assert.deepEqual(host.take(label,main),row.host);
 assert.equal(status,row.status);
 assert.equal(body.toString('utf8'),'{"status":"admin_pending","mayRetry":false,"operationalReadiness":false}');
 assert.equal(r.headers.get('x-afw-lab-get-winner'),enabled?row.header:null);
 const state=await f.actor.state();
 assert.equal(state.arrivals,row.actorArrivals);assert.equal(state.matched,true);
 return {status,body,headers};
}
async function boundedCase(run) {
 let timer;
 try{return await Promise.race([run(),new Promise((_,reject)=>{
  timer=setTimeout(()=>reject(new Error('AFW_TRANSPORT_CASE_TIMEOUT')),120000);
 })]);}finally{clearTimeout(timer);}
}
export async function transportNativeControls() {
 const fixture=JSON.parse(await readFile('native-transport-expectations.json','utf8')),ids=[],residents=[];
 for(const row of fixture.rows)await boundedCase(async()=>{
  const pair=[];let primaryFailed=false;
  try{
   pair.push(await make(false,row.mode));pair.push(await make(true,row.mode));
   const a=await observe(pair[0],false,row),b=await observe(pair[1],true,row);
   assert.equal(a.status,b.status);assert.deepEqual(a.body,b.body);
   assert.deepEqual(a.headers,b.headers.filter(([key])=>key!=='x-afw-lab-get-winner'));
   for(const variant of ['OFF','ON'])ids.push(variant+':'+row.id);
   residents.push({id:row.id,off:{sha256:pair[0].sha256,bytes:pair[0].bytes,transportSha256:pair[0].transportSha256},
    on:{sha256:pair[1].sha256,bytes:pair[1].bytes,transportSha256:pair[1].transportSha256}});
  }catch(error){primaryFailed=true;throw error;}
  finally{
   const disposed=await Promise.allSettled(pair.map(async f=>{await f.mf.dispose();}));
   if(!primaryFailed&&disposed.some(result=>result.status==='rejected'))throw new Error('AFW_TRANSPORT_DISPOSAL_FAILED');
  }
 });
 return {ids,residents,scope:'EXACT_ORDINARY_M_THEN_FIXED_NATIVE_TRANSPORT',directRoute:false,disposed:true};
}
