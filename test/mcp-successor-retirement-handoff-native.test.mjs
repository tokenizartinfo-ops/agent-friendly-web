import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// CI-only synthetic custody/provider. Real workerd private DO transactions and
// storage across isolate recreation; not real original D1, consent or Container.
test('native private handoff persists original proof across host recreation and refuses provider restart',async()=>{
 const compiled=await build({stdin:{contents:`
 import {DurableObject} from 'cloudflare:workers';
 import {createSuccessorRetirementHandoff} from './lib/mcp-successor-retirement-handoff.mjs';
 export class Handoff extends DurableObject {
  async fetch(request){
   const at=Number(this.env.AT),original={containerId:'a'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
   // Explicit synthetic callbacks below, no production bypass or loader rewrite.
   const host=createSuccessorRetirementHandoff({storage:this.ctx.storage,original,now:()=>at,
    readCustody:async()=>{if(this.env.CUSTODY!=='enabled')throw Error('Retired context absent');return{purpose:'afw.node-retirement-observation.v1',containerId:original.containerId,programHash:original.programHash,sourceRevision:original.sourceRevision,processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:at-60000,expiresAt:at-10000,closedAt:at-20000,observedAt:at,physicalStopVerified:false,mayStartSuccessor:false};},
    readInstance:async input=>{if(input.containerId!==original.containerId||input.applicationId!==original.applicationId||input.signal.aborted)throw Error('Invalid fixed read');return(await fetch('https://synthetic.invalid/instance')).json();}});
   const path=new URL(request.url).pathname,result=path==='/capture'?await host.capture():await host.observe();
   return Response.json(result);
  }
 }
 export default {fetch(request,env){return env.HANDOFF.get(env.HANDOFF.idFromName('own-synthetic-handoff')).fetch(request);}};
 `,resolveDir:process.cwd(),sourcefile:'handoff-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const at=Date.now(),instance={id:'a'.repeat(64),application_id:'d6fc71552de7494a863aca20365a572d',image:'cloudflare/debian-trixie',started_at:new Date(at-50000).toISOString(),status:{state:'stopped',updated_at:new Date(at-21000).toISOString(),exit_code:0}};
 let reads=0;
 const options=(clock,custody)=>convertV4MiniflareOptions({workers:[{name:'handoff',modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(clock),CUSTODY:custody},durableObjects:{HANDOFF:{className:'Handoff',useSQLite:true,uniqueKey:'afw-handoff-private-native'}},outboundService:request=>{reads++;assert.equal(request.url,'https://synthetic.invalid/instance');assert.equal(request.method,'GET');return Response.json(instance);}}]});
 const mf=new Miniflare(options(at,'enabled'));
 try{
  const results=await Promise.all([mf.dispatchFetch('https://fixture.invalid/capture').then(r=>r.json()),mf.dispatchFetch('https://fixture.invalid/capture').then(r=>r.json())]);
  assert.deepEqual(results.map(r=>r.status).sort(),['already_recorded','recorded']);const captured=results.find(r=>r.status==='recorded').capturedAt;
  await mf.setOptions(options(at+60000,'absent'));
  const r=await(await mf.dispatchFetch('https://fixture.invalid/observe')).json();assert.equal(r.status,'retired_handoff_observed');assert.equal(r.capturedAt,captured);assert.equal(r.observedAt,at+60000);assert.equal(r.mayRestoreAdministration,false);assert.equal(r.operationalReadiness,false);
  const count=reads;assert.equal((await(await mf.dispatchFetch('https://fixture.invalid/capture')).json()).status,'already_recorded');assert.equal(reads,count);
  instance.started_at=new Date(at+1000).toISOString();instance.status.updated_at=new Date(at+2000).toISOString();assert.equal((await(await mf.dispatchFetch('https://fixture.invalid/observe')).json()).status,'blocked');
 }finally{await mf.dispose();}
});
