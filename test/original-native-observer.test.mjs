import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {registerHooks} from 'node:module';
const path=new URL('../lib/mcp-own-native-observer.mjs',import.meta.url);
const api=existsSync(path)?await import(path):null;
test('original native observation helper exists before diagnostic deployment',()=>assert.ok(api,'Missing original native observer; original runtime must remain untouched'));
const opts={skip:!api},n=1792670400000,id='a'.repeat(64),name='afw-own-event-first-successor-v1';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const env=(extra={})=>({...Object.fromEntries(flags.map(k=>[k,'false'])),AFW_NATIVE_OBSERVATION_ENABLED:'true',AFW_NATIVE_OBSERVATION_PLAN:'afw.original-native-observation.20261022.v1',AFW_NATIVE_OBSERVATION_START:String(n),AFW_NATIVE_OBSERVATION_END:String(n+300000),AFW_DOSSIER_EVENTS_NODE_NAME:name,AFW_DOSSIER_EVENTS_NODE:{idFromName(v){assert.equal(v,name);return {toString:()=>id};}},...extra});
const context=c=>({id:{toString:()=>id},get container(){return c;},get storage(){throw Error('diagnostic must not access storage');}});
test('one exact finite observation window is frozen and never accepts approximate flags or renewed oversized scope',opts,()=>{
 const c=api.readObserverWindow(env(),n);assert.deepEqual(c,{start:n,end:n+300000});assert.ok(Object.isFrozen(c));
 for(const value of [true,false,undefined,'TRUE','1','false'])assert.equal(api.readObserverWindow(env({AFW_NATIVE_OBSERVATION_ENABLED:value}),n),null);
 for(const extra of [{AFW_NATIVE_OBSERVATION_PLAN:'other'},{AFW_NATIVE_OBSERVATION_START:'0'},{AFW_NATIVE_OBSERVATION_END:String(n+300001)},{AFW_NATIVE_OBSERVATION_START:'1e12'}])assert.equal(api.readObserverWindow(env(extra),n),null);
 for(const at of [n-1,n+300000,NaN,Infinity,n+.5])assert.equal(api.readObserverWindow(env(),at),null);
 assert.ok(api.readObserverWindow(env(),n+299999));
});
test('closed and caller-authored inputs never inspect a native object or storage',opts,()=>{
 let reads=0;const ctx=new Proxy({}, {get(){reads++;throw Error('must not inspect');}});
 for(const [e,args]of [[env({AFW_NATIVE_OBSERVATION_ENABLED:'false'}),[]],[env(),['selector']],[env(),{}]]){
  const r=api.observeOriginalNative(ctx,e,args,()=>n);assert.equal(r.stage,'observation_closed');assert.equal(r.present,undefined);
 }assert.equal(reads,0);
});
test('every old product flag remains closed and only current fixed original name can be observed',opts,()=>{
 for(const key of flags){const r=api.observeOriginalNative(context(null),env({[key]:'true'}),[],()=>n);assert.equal(r.stage,'observation_closed');}
 const wrong=api.observeOriginalNative(context(null),env({AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-one-occurrence-v1'}),[],()=>n);
 assert.equal(wrong.stage,'observation_closed');
});
test('wrong native object fails before container access',opts,()=>{
 let touched=0;const ctx={id:{toString:()=> 'b'.repeat(64)},get container(){touched++;throw Error('foreign context');}};
 assert.equal(api.observeOriginalNative(ctx,env(),[],()=>n).stage,'observation_closed');assert.equal(touched,0);
});
test('read-only native presence never calls methods or reads DB/custody/storage',opts,()=>{
 let calls=0;const c={running:false};for(const key of ['start','setInactivityTimeout','interceptOutboundHttp','getTcpPort','destroy'])c[key]=()=>{calls++;throw Error('method called');};
 const e=env();Object.defineProperty(e,'DB',{get(){throw Error('DB touched');}});Object.defineProperty(e,'AFW_DOSSIER_EVENTS_CUSTODY_KEY',{get(){throw Error('custody touched');}});
 const r=api.observeOriginalNative(context(c),e,[],()=>n);assert.equal(r.stage,'native_context_observed');assert.equal(r.present,true);assert.equal(r.running,false);
 assert.deepEqual(r.methods,{start:true,setInactivityTimeout:true,interceptOutboundHttp:true,getTcpPort:true,destroy:true});
 assert.equal(calls,0);for(const key of ['originalIncidentRepaired','fullAFWCircuitAccepted','operationalReadiness','pcOffAccepted'])assert.equal(r[key],false);
});
test('absence and an inaccessible getter are different observations without raw exception',opts,()=>{
 const absent=api.observeOriginalNative(context(undefined),env(),[],()=>n);assert.equal(absent.stage,'native_context_observed');assert.equal(absent.present,false);assert.equal(absent.running,null);
 const failed=api.observeOriginalNative({id:{toString:()=>id},get container(){throw Error('private fault string');}},env(),[],()=>n);
 assert.equal(failed.stage,'native_context_unconfirmed');assert.equal(failed.present,undefined);assert.ok(!JSON.stringify(failed).includes('private fault'));
});
test('time or env closure during a synchronous native read cannot leak stale presence or renew its window',opts,()=>{
 for(const mode of ['flag','window','clock','binding']){
  const e=env();let tick=0;const ctx={id:{toString:()=>id},get container(){if(mode==='flag')e.AFW_NATIVE_OBSERVATION_ENABLED='false';if(mode==='window')e.AFW_NATIVE_OBSERVATION_END=String(n+299999);if(mode==='binding')e.AFW_DOSSIER_EVENTS_NODE={};return {running:false};}};
  const clock=()=>mode==='clock'&&tick++?n+300000:n;
  const r=api.observeOriginalNative(ctx,e,[],clock);assert.equal(r.stage,'observation_closed',mode);assert.equal(r.present,undefined);
 }
});

async function driverClass(){
 const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkflowEntrypoint {}',shortCircuit:true}:next(s,c);}});
 try{return (await import('data:text/javascript;base64,'+Buffer.from(api.createOriginalObservationDriver()).toString('base64'))).AfwOriginalNativeObservation;}finally{hook.deregister();}
}
test('generated driver refuses closed config or a different Workflow id before touching RPC',opts,async t=>{
 t.mock.method(Date,'now',()=>n);const Driver=await driverClass();let calls=0,steps=0;
 const d=new Driver();d.env=env({ORIGINAL:{getByName(){calls++;throw Error('unexpected');}}});
 const step={do(){steps++;throw Error('unexpected');}};
 assert.equal((await d.run({instanceId:'other'},step)).stage,'observation_closed');
 d.env.AFW_NATIVE_OBSERVATION_ENABLED='false';
 assert.equal((await d.run({instanceId:'afw-20261022-original-native'},step)).stage,'observation_closed');
 assert.equal(calls,0);assert.equal(steps,0);
});
test('generated driver uses one fixed RPC without selectors retries or untrusted output',opts,async t=>{
 t.mock.method(Date,'now',()=>n);const Driver=await driverClass();let calls=0,steps=0;
 const d=new Driver(),e=env();e.ORIGINAL={getByName(v){assert.equal(v,name);return {observeNativeForControl(...args){assert.equal(args.length,0);calls++;return {...api.observeOriginalNative(context(null),e,[],()=>n),checkedAt:new Date(n).toISOString(),raw:'private diagnostic text'};}};}};d.env=e;
 const step={do(label,options,fn){assert.equal(label,'original-native-context');assert.equal(options.retries.limit,0);steps++;return fn();}};
 const event={instanceId:'afw-20261022-original-native',get payload(){throw Error('caller payload read');}};
 const r=await d.run(event,step);assert.equal(r.stage,'native_context_observed');assert.equal(r.present,false);assert.equal(calls,1);assert.equal(steps,1);assert.ok(!JSON.stringify(r).includes('private diagnostic'));
});
test('generated driver fences a response when its original window changes during RPC',opts,async t=>{
 t.mock.method(Date,'now',()=>n);const Driver=await driverClass(),d=new Driver(),e=env();
 e.ORIGINAL={getByName(){return {observeNativeForControl(){const r=api.observeOriginalNative(context(null),e,[],()=>n);e.AFW_NATIVE_OBSERVATION_END=String(n+299999);return r;}};}};d.env=e;
 const r=await d.run({instanceId:'afw-20261022-original-native'},{do:(label,options,fn)=>fn()});
 assert.equal(r.stage,'observation_closed');assert.equal(r.present,undefined);
});
test('generated driver RPC wait cannot outlive the original remaining window',opts,async t=>{
 let clock=n;t.mock.method(Date,'now',()=>clock);t.mock.timers.enable({apis:['setTimeout']});
 const Driver=await driverClass(),d=new Driver();d.env=env({AFW_NATIVE_OBSERVATION_END:String(n+50),ORIGINAL:{getByName(){return {observeNativeForControl(){return new Promise(()=>{});}};}}});
 let settled=false;const pending=d.run({instanceId:'afw-20261022-original-native'},{do:(label,options,fn)=>fn()});pending.then(()=>{settled=true;});
 try{await Promise.resolve();clock=n+51;t.mock.timers.tick(51);await new Promise(setImmediate);
  assert.equal(settled,true,'RPC timeout must use the original remaining window, not a fresh ten seconds');
  const r=await pending;assert.equal(r.stage,'observation_closed');assert.equal(r.present,undefined);
 }finally{t.mock.timers.tick(10001);await pending;t.mock.timers.reset();}
});

test('generated driver refuses noncanonical or out-of-window observed timestamps',opts,async t=>{
 t.mock.method(Date,'now',()=>n);const Driver=await driverClass();
 for(const stamp of [{private:'untrusted'},'untrusted text',new Date(n-1).toISOString(),new Date(n+300000).toISOString(),'2026-10-22T12:00:00+00:00']){
  const d=new Driver(),e=env();e.ORIGINAL={getByName(){return {observeNativeForControl(){return {...api.observeOriginalNative(context(null),e,[],()=>n),checkedAt:stamp};}};}};d.env=e;
  const r=await d.run({instanceId:'afw-20261022-original-native'},{do:(label,options,fn)=>fn()});
  assert.equal(r.stage,'native_context_unconfirmed');assert.equal(r.observedAt,undefined);
 }
});
