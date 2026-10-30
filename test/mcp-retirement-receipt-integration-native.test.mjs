import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
let compilation;
const compile=()=>compilation??=build({stdin:{resolveDir:process.cwd(),sourcefile:'retirement-integration-native.mjs',contents:`
import {AfwOwnEventNode} from './worker/mcp-own/index.mjs';
import {createRetirementEvidenceReader} from './lib/mcp-retirement-evidence.mjs';
import {readRetiredRpcReceipt} from './lib/mcp-retired-rpc-receipt.mjs';
export {AfwOwnEventNode};

export class Observer extends AfwOwnEventNode{
 constructor(ctx,env){super(ctx,env);Date.now=()=>30021;}
 calls=0;
 raw(){this.calls++;return{purpose:'afw.node-retirement-observation.v1',containerId:this.ctx.id.toString(),processGeneration:'d'.repeat(64),programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2500,observedAt:Date.now(),physicalStopVerified:false,mayStartSuccessor:false};}
 observeRetired(){return this.raw();}
 observeSuccessorRetired(){return this.raw();}
 stats(){return{calls:this.calls};}
}
export default{async fetch(request,env){
 const path=new URL(request.url).pathname,stub=env.OBS.get(env.OBS.idFromName('own'));
 if(path==='/id')return Response.json({id:env.OBS.idFromName('own').toString()});
 if(path==='/stats'){const r=await stub.stats();try{return Response.json(r);}finally{r[Symbol.dispose]?.();}}
 try{
  if(path==='/bad-selector'){await stub.observeRetiredReceipt({containerId:'foreign'});throw Error('unexpected selector acceptance');}
  if(path==='/extra'){await stub.observeRetiredReceipt('e'.repeat(64),{selector:'foreign'});throw Error('unexpected extra acceptance');}
  const method=path==='/successor'?'observeSuccessorRetiredReceipt':'observeRetiredReceipt',id=env.OBS.idFromName('own').toString();
  let remoteAt=0;
  const reader=createRetirementEvidenceReader({now:()=>30000,original:{containerId:id,applicationId:'fixed-own-application',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},
   readCustodyReceipt:async({signal},assertCurrent)=>{const r=await readRetiredRpcReceipt({signal,assertCurrent,now:()=>30000,invoke:async challenge=>({value:await stub[method](challenge)})});remoteAt=r.observation.observedAt;return r;},
   readInstance:async()=>({id,application_id:'fixed-own-application',image:'cloudflare/debian-trixie',started_at:new Date(1500).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(2600).toISOString()}})});
  const result=await reader.observe();return Response.json({result,remoteAt});
 }catch{return Response.json({denied:true},{status:409});}
}};
`},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none'});
async function fixture(real=false){
 const b=await compile();let network=0;
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[
 {name:'observer',modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,durableObjects:{OBS:{className:real?'AfwOwnEventNode':'Observer',useSQLite:true,uniqueKey:'own-receipt-native'}}},
 {name:'client',modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,durableObjects:{OBS:{className:real?'AfwOwnEventNode':'Observer',scriptName:'observer',uniqueKey:'own-receipt-native'}}}
 ],outboundService(){network++;throw Error('Forbidden network');}}));
 const worker=await mf.getWorker('client');
 return{mf,network:()=>network,async call(path){const r=await worker.fetch('https://fixture.invalid'+path);return{status:r.status,data:await r.json()};}};
}
test('native inherited original and successor receipt methods tolerate only observation clock difference',{timeout:30000},async()=>{
 const f=await fixture();try{
  for(const path of ['/original','/successor']){const r=await f.call(path);assert.equal(r.status,200,JSON.stringify(r));assert.equal(r.data.result.physicalStopVerified,true);assert.equal(r.data.result.mayStartSuccessor,false);assert.ok(r.data.remoteAt>r.data.result.observedAt);}
  assert.equal((await f.call('/stats')).data.calls,4);assert.equal(f.network(),0);
 }finally{await f.mf.dispose();}
});
test('native challenge methods deny selectors and extra args before the historical read',{timeout:30000},async()=>{
 const f=await fixture();try{for(const path of ['/bad-selector','/extra'])assert.equal((await f.call(path)).status,409);assert.equal((await f.call('/stats')).data.calls,0);}finally{await f.mf.dispose();}
});
test('actual own Node preserves disabled original and successor read policies',{timeout:30000},async()=>{
 const f=await fixture(true);try{for(const path of ['/original','/successor'])assert.equal((await f.call(path)).status,409);assert.equal(f.network(),0);}finally{await f.mf.dispose();}
});
