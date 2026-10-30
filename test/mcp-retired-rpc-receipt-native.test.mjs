import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let compilation;
const compile=()=>compilation??=build({stdin:{resolveDir:process.cwd(),sourcefile:'retired-receipt-native-fixture.mjs',contents:`
import {DurableObject,RpcTarget} from 'cloudflare:workers';
import {createRetiredRpcReceipt,readRetiredRpcReceipt} from './lib/mcp-retired-rpc-receipt.mjs';
const observation=()=>({purpose:'afw.node-retirement-observation.v1',containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2500,observedAt:3021,physicalStopVerified:false,mayStartSuccessor:false});
class Witness extends RpcTarget{constructor(owner){super();this.owner=owner;}[Symbol.dispose](){this.owner.disposals++;}}
export class Observer extends DurableObject{
 calls=0;disposals=0;cancelled=0;completed=0;release=null;
 async receipt(challenge){
  this.calls++;
  try{
   if(this.env.MODE==='held'){let interval;try{await new Promise(resolve=>{this.release=resolve;interval=setInterval(()=>{},100);});}finally{clearInterval(interval);}}
   this.completed++;
   if(this.env.MODE==='raw')return observation();
   const result=await createRetiredRpcReceipt({challenge,now:()=>3021,observe:async()=>({value:{...observation(),...this.env.MODE==='stale'?{observedAt:3020}:{}}})});
   if(this.env.MODE==='echo')return {...result,challenge:'f'.repeat(64)};
   if(['extra','held'].includes(this.env.MODE))return {...result,witness:new Witness(this)};
   return result;
  }catch{this.cancelled++;throw Error('Synthetic receipt unavailable');}
 }
 releaseHeld(){if(this.release){this.release();this.release=null;}return true;}
 stats(){return{calls:this.calls,disposals:this.disposals,cancelled:this.cancelled,completed:this.completed};}
}
export default{async fetch(request,env){
 const stub=env.OBSERVER.get(env.OBSERVER.idFromName('receipt-fixture')),path=new URL(request.url).pathname;
 if(path==='/stats'){const r=await stub.stats();try{return Response.json(r);}finally{r[Symbol.dispose]?.();}}
 if(path==='/release'){await stub.releaseHeld();return Response.json({released:true});}
 let nativeLifecycle=false;
 try{
  const result=await readRetiredRpcReceipt({now:()=>3000,timeoutMs:env.MODE==='held'?50:5000,assertCurrent(){},invoke:async(nonce)=>{
   const r=await stub.receipt(nonce);nativeLifecycle=typeof Object.getOwnPropertyDescriptor(r,Symbol.dispose)?.value==='function';return {value:r};
  }});
  return Response.json({result,nativeLifecycle});
 }catch{return Response.json({denied:true,nativeLifecycle},{status:409});}
}};
`},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none'});
async function fixture(mode){
 const b=await compile();let outbound=0;
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{MODE:mode},durableObjects:{OBSERVER:{className:'Observer',useSQLite:true,uniqueKey:'afw-receipt-'+mode}},outboundService(){outbound++;throw Error('Forbidden network');}}));
 return{mf,network:()=>outbound,async call(path='/'){const r=await mf.dispatchFetch('https://fixture.invalid'+path);return{status:r.status,data:await r.json()};}};
}
test('native DO receipt accepts independent frozen clocks and strips native lifecycle metadata',{timeout:20000},async()=>{
 const f=await fixture('valid');try{
  const r=await f.call();assert.equal(r.status,200,JSON.stringify(r));assert.equal(r.data.nativeLifecycle,true);
  assert.equal(r.data.result.observation.observedAt,3021);assert.deepEqual(r.data.result.local,{sentAt:3000,receivedAt:3000});
  assert.equal(r.data.result.observation.physicalStopVerified,false);assert.equal(r.data.result.observation.mayStartSuccessor,false);
  assert.equal((await f.call('/stats')).data.calls,1);assert.equal(f.network(),0);
 }finally{await f.mf.dispose();}
});
test('native wrong echo, raw legacy value and server-stale observation fail closed',{timeout:20000},async()=>{
 for(const mode of ['echo','raw','stale']){
  const f=await fixture(mode);try{const r=await f.call();assert.equal(r.status,409,mode);assert.equal(r.data.denied,true);assert.equal((await f.call('/stats')).data.calls,1);assert.equal(f.network(),0);}finally{await f.mf.dispose();}
 }
});
test('native invalid envelope releases its nested capability without domain acceptance',{timeout:20000},async()=>{
 const f=await fixture('extra');try{
  assert.equal((await f.call()).status,409);
  let s;const until=Date.now()+2000;do{s=(await f.call('/stats')).data;if(s.disposals)break;await new Promise(r=>setTimeout(r,20));}while(Date.now()<until);
  assert.equal(s.calls,1);assert.equal(s.disposals,1);assert.equal(f.network(),0);
 }finally{await f.mf.dispose();}
});
test('native ended caller context cancels or releases a held response after its original timeout',{timeout:20000},async()=>{
 const f=await fixture('held');try{
  const r=await f.call();assert.equal(r.status,409);const before=(await f.call('/stats')).data;assert.equal(before.calls,1);assert.equal(before.completed,0);
  await f.call('/release');let s;const until=Date.now()+2000;
  do{s=(await f.call('/stats')).data;if(s.disposals||s.cancelled)break;await new Promise(r=>setTimeout(r,20));}while(Date.now()<until);
  assert.equal(s.calls,1);assert.ok(s.disposals>0||s.cancelled>0,JSON.stringify(s));assert.equal(f.network(),0);
 }finally{await f.mf.dispose();}
});
