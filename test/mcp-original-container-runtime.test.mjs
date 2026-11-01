import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createNodeReadiness} from '../lib/mcp-node-readiness.mjs';
const load=()=>import('../lib/mcp-original-container-runtime.mjs');
function fixture(){let now=Date.now()-1000,running=false,boots=0,stops=0,cancellations=0,mode='',manifest,key;const calls=[],program='/* fixed own program */',id='a'.repeat(64),window={startAt:now,expiresAt:now+60000};const port={async fetch(request){calls.push('port');if(mode==='hung')return new Promise(()=>{});if(mode==='hung-body')return new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('{'));},cancel(){cancellations++;}}),{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':'0'.repeat(64)}});if(mode==='refused'){mode='';throw Error('Connection refused');}const p=createNodeReadiness({key,manifest,now:()=>now}).respond({body:await request.text(),signature:request.headers.get('x-afw-node-signature')});if(mode==='stopped')running=false;return new Response(p.body,{headers:{'Content-Type':'application/json','X-AFW-Node-Signature':mode==='tamper'?'0'.repeat(64):p.signature}});}};const container={get running(){return running;},start(options){calls.push('start');boots++;const bootstrap=JSON.parse(options.env.AFW_NODE_BOOTSTRAP);manifest=bootstrap.manifest;key=Buffer.from(bootstrap.key,'base64');running=true;if(mode==='lost-start')throw Error('Unknown start ACK');},async setInactivityTimeout(ms){assert.ok(running);assert.ok(ms<=window.expiresAt-now);calls.push('timeout');},async interceptOutboundHttp(host,entry){assert.equal(host,'afw-node-control.internal');assert.equal(typeof entry.fetch,'function');calls.push('control');},getTcpPort(number){assert.equal(number,8080);return port;},async destroy(){stops++;running=false;calls.push('destroy');}};const options={enabled:true,ctx:{id:{toString:()=>id},container},program,sourceRevision:'b'.repeat(40),window,makeControl:async identity=>{assert.equal(identity.containerId,id);return {fetch:async()=>new Response(null,{status:404})};},now:()=>now};const value={containerId:id,processGeneration:'c'.repeat(64),programHash:createHash('sha256').update(program).digest('hex'),sourceRevision:options.sourceRevision,image:'cloudflare/debian-trixie',createdAt:now,expiresAt:window.expiresAt,key:Buffer.alloc(32,9)};const original=()=>Object.fromEntries(Object.entries(value).filter(([k])=>k!=='key'));const probe=()=>createNodeReadiness({key:value.key,manifest:original(),now:()=>now}).probe();return {options,value,original,probe,calls,boots:()=>boots,stops:()=>stops,cancellations:()=>cancellations,mode:v=>{mode=v;},setNow:value=>{now=value;},expire:()=>{now=window.expiresAt;},stop:()=>{running=false;}};}
test('Container adapter is closed before dependencies and rejects nonoriginal bootstrap',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture();assert.throws(()=>createOriginalContainerRuntime({...f.options,enabled:false,ctx:{get container(){throw Error('Must not read');}}}),/unavailable/);const r=createOriginalContainerRuntime(f.options);await assert.rejects(r.launch({...f.value,programHash:'0'.repeat(64)},new AbortController().signal));assert.equal(f.boots(),0);});
test('original adapter starts once with private env and configures timeout only after start',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);assert.equal(f.boots(),1);assert.ok(f.calls.indexOf('timeout')>f.calls.indexOf('start'));assert.deepEqual(await r.observe(f.original(),a.signal,f.probe),{...f.original(),running:true});await assert.rejects(r.launch(f.value,a.signal));assert.equal(f.boots(),1);const rebuilt=createOriginalContainerRuntime(f.options);assert.deepEqual(await rebuilt.observe(f.original(),a.signal,f.probe),{...f.original(),running:true});assert.equal(f.boots(),1);await rebuilt.close();assert.equal(f.stops(),1);await assert.rejects(rebuilt.observe(f.original(),a.signal,f.probe));});
test('lost start ACK, bad readiness, stopped process and lease cannot lead to another launch',async()=>{const {createOriginalContainerRuntime}=await load();for(const mode of ['lost-start','tamper','stopped']){const f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();f.mode(mode);if(mode==='lost-start')await assert.rejects(r.launch(f.value,a.signal));else{await r.launch(f.value,a.signal);await assert.rejects(r.observe(f.original(),a.signal,f.probe));}await assert.rejects(r.launch(f.value,a.signal));assert.equal(f.boots(),1);await r.close();}const f=fixture(),r=createOriginalContainerRuntime(f.options);await r.launch(f.value,new AbortController().signal);f.expire();await assert.rejects(r.observe(f.original(),new AbortController().signal,f.probe));assert.equal(f.boots(),1);});
test('port readiness retries do not restart the original process and cancellation settles hung port',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);f.mode('refused');assert.equal((await r.observe(f.original(),a.signal,f.probe)).running,true);assert.equal(f.boots(),1);f.mode('hung');const result=r.observe(f.original(),a.signal,f.probe);setTimeout(()=>a.abort(),25);await assert.rejects(result);assert.equal(f.boots(),1);await r.close();});
test('cancelled readiness body releases its native reader without another boot',async()=>{const {createOriginalContainerRuntime}=await load(),f=fixture(),r=createOriginalContainerRuntime(f.options),a=new AbortController();await r.launch(f.value,a.signal);f.mode('hung-body');const result=r.observe(f.original(),a.signal,f.probe);setTimeout(()=>a.abort(),25);await assert.rejects(result);assert.equal(f.cancellations(),1);assert.equal(f.boots(),1);await r.close();});

test('constructor failure observation identifies only fixed runtime prerequisites and never boots',async()=>{
 const {createOriginalContainerRuntime}=await load();
 const cases=[
  ['native_runtime_options_invalid',o=>{o.extra='PRIVATE';}],
  ['native_runtime_inputs_invalid',o=>{o.program='';}],
  ['native_runtime_window_invalid',o=>{o.window={startAt:2,expiresAt:1};}],
  ['native_runtime_identity_invalid',o=>{o.ctx.id={toString:()=> 'PRIVATE'};}],
  ['native_runtime_context_invalid',o=>{o.ctx={...o.ctx,get container(){throw Error('PRIVATE');}};}],
  ['native_container_absent',o=>{o.ctx.container=undefined;}],
  ...[['start','native_container_start_unavailable'],['setInactivityTimeout','native_container_timeout_unavailable'],['interceptOutboundHttp','native_container_intercept_unavailable'],['getTcpPort','native_container_port_unavailable'],['destroy','native_container_destroy_unavailable']].map(([method,stage])=>[stage,o=>{o.ctx.container[method]=undefined;}]),
 ];
 for(const [stage,change]of cases){const f=fixture(),rows=[];change(f.options);assert.throws(()=>createOriginalContainerRuntime(f.options,r=>rows.push(r)),/unavailable/);assert.deepEqual(rows,[stage]);assert.equal(f.boots(),0);assert.equal(f.stops(),0);assert.ok(!JSON.stringify(rows).includes('PRIVATE'));}
 const f=fixture();assert.doesNotThrow(()=>createOriginalContainerRuntime(f.options,()=>{throw Error('PRIVATE');}));assert.equal(f.boots(),0);
});

test('internal parent lease is rechecked after every launch-side native await',async()=>{
 const {createOriginalContainerRuntime}=await load();
 for(const stage of ['makeControl','start','interceptOutboundHttp','setInactivityTimeout']){
  const f=fixture(),deadline=f.options.now()+10000;let release,entered;
  const waiting=new Promise(resolve=>{entered=resolve;}),held=new Promise(resolve=>{release=resolve;});
  const target=stage==='makeControl'?f.options:f.options.ctx.container,original=target[stage];
  target[stage]=async(...args)=>{const result=await original(...args);entered();await held;return result;};
  const runtime=createOriginalContainerRuntime(f.options);
  const current=()=>{if(f.options.now()>=deadline)throw Error('parent lease expired');};
  const pending=runtime.launch(f.value,new AbortController().signal,current);
  await waiting;f.setNow(deadline);release();await assert.rejects(pending);
  assert.equal(f.boots(),stage==='makeControl'?0:1);
  if(['makeControl','start'].includes(stage))assert.equal(f.calls.includes('control'),false);
  if(stage!=='setInactivityTimeout')assert.equal(f.calls.includes('timeout'),false);
  await runtime.close();assert.equal(f.stops(),1);
 }
});
test('a valid narrower internal lease permits launch but cannot replace original runtime checks',async()=>{
 const {createOriginalContainerRuntime}=await load(),f=fixture(),deadline=f.options.now()+10000;
 const current=()=>{if(f.options.now()>=deadline)throw Error('parent lease expired');};
 const runtime=createOriginalContainerRuntime(f.options);await runtime.launch(f.value,new AbortController().signal,current);assert.equal(f.boots(),1);
 await runtime.close();const g=fixture(),other=createOriginalContainerRuntime(g.options);
 await assert.rejects(other.launch(g.value,new AbortController().signal,true));assert.equal(g.boots(),0);
 g.expire();await assert.rejects(other.launch(g.value,new AbortController().signal,()=>{}));assert.equal(g.boots(),0);
});
