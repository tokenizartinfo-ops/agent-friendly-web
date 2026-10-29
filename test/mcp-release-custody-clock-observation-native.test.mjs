import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native Workflow samples only original RPC clocks without provider or activation access',{timeout:30000},async()=>{
 const compiled=await build({stdin:{contents:`
import {DurableObject} from 'cloudflare:workers';
import original,{AfwReleaseWorkflow} from './worker/mcp-release/index.mjs';
export {AfwReleaseWorkflow};
export class Own extends DurableObject {
 count=0;
 observeRetired(){this.count++;return{purpose:'afw.node-retirement-observation.v1',containerId:this.ctx.id.toString(),processGeneration:'4'.repeat(64),programHash:'3'.repeat(64),sourceRevision:'a'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2000,observedAt:Date.now()+60000,physicalStopVerified:false,mayStartSuccessor:false};}
 readCount(){return this.count;}
}
export default {async fetch(r,e){const u=new URL(r.url);
 if(u.pathname==='/fixture/id')return Response.json({original:e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()});
 if(u.pathname==='/fixture/create')return Response.json({id:(await e.FLOW.create(await r.json())).id});
 if(u.pathname==='/fixture/status')return Response.json(await(await e.FLOW.get(u.searchParams.get('id'))).status());
 if(u.pathname==='/fixture/count')return Response.json({count:await e.AFW_RELEASE_EVENTS_NODE.get(e.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1')).readCount()});
 return original.fetch(r,e);
}};
`,resolveDir:process.cwd(),sourcefile:'custody-clock-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',mainFields:['module','main'],external:['node:*','cloudflare:*'],legalComments:'none'});
 let raw='',network=0;
 const options=()=>convertV4MiniflareOptions({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED:'true',AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY:raw,AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',useSQLite:true,uniqueKey:'afw-original-clock-native'}},workflows:{FLOW:{name:'afw-original-clock-fixture',className:'AfwReleaseWorkflow'}},outboundService:()=>{network++;throw Error('Forbidden network');}});
 const mf=new Miniflare(options());try{
  const call=async(path,body)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
  const ids=await call('/fixture/id'),at=Date.now();raw=JSON.stringify({startAt:at,expiresAt:at+60000,namespaceId:'d6fc71552de7494a863aca20365a572d',original:{containerId:ids.original,programHash:'3'.repeat(64),sourceRevision:'a'.repeat(40)}});
  await mf.setOptions(options());const hash=createHash('sha256').update(raw).digest('hex'),id='afw-original-clock-'+hash;
  await call('/fixture/create',{id,params:JSON.stringify({observationHash:hash})});let result;const end=Date.now()+10000;
  do{result=await call('/fixture/status?id='+id);if(['complete','errored'].includes(result.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(result.status,'complete',JSON.stringify(result));assert.equal(result.output.status,'observed',JSON.stringify(result.output));assert.equal(result.output.samples.length,2);
  for(const s of result.output.samples){assert.ok(s.deltaMs>0);assert.equal(s.deltaMs,s.remoteObservedAt-s.callerAfter);}
  assert.equal(result.output.mayBoot,false);assert.equal(result.output.mayReserve,false);assert.equal(result.output.mayWrite,false);assert.equal(result.output.operationalReadiness,false);
  assert.equal((await call('/fixture/count')).count,2);assert.equal(network,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/clock')).status,404);
 }finally{await mf.dispose();}
});
