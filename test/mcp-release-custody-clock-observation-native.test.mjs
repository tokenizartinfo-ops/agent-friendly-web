import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let compilation;
const compile=()=>compilation??=(build({stdin:{contents:`
import {DurableObject,RpcTarget,WorkflowEntrypoint} from 'cloudflare:workers';
import original,{AfwReleaseWorkflow} from './worker/mcp-release/index.mjs';
import {runReleaseCustodyClockObservation} from './lib/mcp-release-custody-clock-observation.mjs';
export {AfwReleaseWorkflow};
class Witness extends RpcTarget {constructor(owner){super();this.owner=owner;}[Symbol.dispose](){this.owner.disposals++;}}
export class Own extends DurableObject {
 calls=0;disposals=0;cancelled=0;completed=0;released=0;release=null;
 async observeRetired(){
  this.calls++;
  try{
   if(this.env.FIXTURE_MODE==='held'){let interval;try{await new Promise(resolve=>{this.release=resolve;interval=setInterval(()=>{},500);});}finally{clearInterval(interval);}}
   this.completed++;
   return{purpose:'afw.node-retirement-observation.v1',containerId:this.ctx.id.toString(),processGeneration:'4'.repeat(64),programHash:'3'.repeat(64),sourceRevision:'a'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2000,observedAt:Date.now()+60000,physicalStopVerified:false,mayStartSuccessor:false,...this.env.FIXTURE_MODE==='held'?{witness:new Witness(this)}:{}};
  }catch{this.cancelled++;throw Error('Synthetic held RPC cancelled');}
 }
 releaseHeld(){if(this.release){this.released++;this.release();this.release=null;}return this.released;}
 readStats(){return{calls:this.calls,disposals:this.disposals,cancelled:this.cancelled,completed:this.completed,released:this.released};}
}
export class DelayedFlow extends WorkflowEntrypoint{
 async run(event,step){await step.do('synthetic-native-queue',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:10000},()=>new Promise(resolve=>setTimeout(resolve,5500)));return runReleaseCustodyClockObservation({env:this.env,event,step});}
}
export default {async fetch(r,e){const u=new URL(r.url);
 if(u.pathname==='/fixture/id')return Response.json({original:e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()});
 if(u.pathname==='/fixture/create')return Response.json({id:(await e.FLOW.create(await r.json())).id});
 if(u.pathname==='/fixture/status')return Response.json(await(await e.FLOW.get(u.searchParams.get('id'))).status());
 if(u.pathname==='/fixture/release')return Response.json({released:await e.AFW_RELEASE_EVENTS_NODE.get(e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1')).releaseHeld()});
 if(u.pathname==='/fixture/stats'){const value=await e.AFW_RELEASE_EVENTS_NODE.get(e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1')).readStats();try{return Response.json(value);}finally{value[Symbol.dispose]?.();}}
 return original.fetch(r,e);
}};
`,resolveDir:process.cwd(),sourcefile:'custody-clock-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none'}));
async function fixture(mode){
 const built=await compile();let raw='',network=0;
 const options=()=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{FIXTURE_MODE:mode,AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED:'true',AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY:raw,AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',useSQLite:true,uniqueKey:'afw-original-clock-native-'+mode}},workflows:{FLOW:{name:'afw-original-clock-fixture-'+mode,className:mode==='delayed'?'DelayedFlow':'AfwReleaseWorkflow'}},outboundService:()=>{network++;throw Error('Forbidden network');}});
 const mf=new Miniflare(options());
 const call=async(path,body)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
 try{
  const ids=await call('/fixture/id'),at=Date.now();raw=JSON.stringify({startAt:at,expiresAt:at+60000,namespaceId:'d6fc71552de7494a863aca20365a572d',original:{containerId:ids.original,programHash:'3'.repeat(64),sourceRevision:'a'.repeat(40)}});
  await mf.setOptions(options());const hash=createHash('sha256').update(raw).digest('hex'),id='afw-original-clock-'+hash;await call('/fixture/create',{id,params:JSON.stringify({observationHash:hash})});
  const wait=async()=>{let r;const end=Date.now()+12000;do{r=await call('/fixture/status?id='+id);if(['complete','errored'].includes(r.status))return r;await new Promise(resolve=>setTimeout(resolve,40));}while(Date.now()<end);throw Error('Native fixture did not terminate');};
  return{mf,call,id,wait,network:()=>network};
 }catch(e){await mf.dispose();throw e;}
}
test('native Workflow measures future timestamps without granting authority or outbound access',{timeout:30000},async()=>{
 const f=await fixture('immediate');try{const result=await f.wait();assert.equal(result.status,'complete',JSON.stringify(result));assert.equal(result.output.status,'observed');assert.equal(result.output.samples.length,2);
  for(const s of result.output.samples){assert.ok(s.deltaMs>0);assert.equal(s.deltaMs,s.remoteObservedAt-s.callerAfter);}
  for(const k of ['mayBoot','mayReserve','mayWrite','operationalReadiness'])assert.equal(result.output[k],false);
  assert.equal((await f.call('/fixture/stats')).calls,2);assert.equal(f.network(),0);assert.equal((await f.mf.dispatchFetch('https://fixture.invalid/clock')).status,404);
 }finally{await f.mf.dispose();}
});
test('native held RPC ends within the original lease and cleans late lifecycle metadata',{timeout:30000},async()=>{
 const f=await fixture('held');try{
  const result=await f.wait();assert.equal(result.status,'complete',JSON.stringify(result));assert.equal(result.output.status,'uncertain');assert.deepEqual(result.output.samples,[]);const before=JSON.stringify(result.output);
  const held=await f.call('/fixture/stats');assert.equal(held.calls,1);assert.equal(held.completed,0,'terminal output must precede the held response');assert.equal(held.released,0,'the test must not release until the terminal outcome');
  assert.equal((await f.call('/fixture/release')).released,1);
  let stats;const end=Date.now()+4000;do{stats=await f.call('/fixture/stats');if(stats.disposals>0||stats.cancelled>0)break;await new Promise(resolve=>setTimeout(resolve,40));}while(Date.now()<end);
  assert.equal(stats.calls,1);assert.ok(stats.disposals>0||stats.cancelled>0,JSON.stringify(stats));assert.equal(JSON.stringify((await f.call('/fixture/status?id='+f.id)).output),before);assert.equal(f.network(),0);
 }finally{await f.mf.dispose();}
});
test('native delayed step retains the creation timestamp and performs no custody RPC',{timeout:30000},async()=>{
 const f=await fixture('delayed');try{const r=await f.wait();assert.equal(r.status,'complete',JSON.stringify(r));assert.equal(r.output.status,'blocked');assert.deepEqual(r.output.samples,[]);assert.equal((await f.call('/fixture/stats')).calls,0);assert.equal(f.network(),0);}finally{await f.mf.dispose();}
});
