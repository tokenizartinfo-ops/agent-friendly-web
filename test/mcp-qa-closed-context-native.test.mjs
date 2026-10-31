import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const revision='a'.repeat(40),version='11111111-1111-4111-8111-111111111111';
const flags=['AFW_QA_HTTP_ENABLED','AFW_QA_BOOTSTRAP_ENABLED','AFW_QA_CHALLENGE_ENABLED','AFW_MCP_CLOSURE_ENABLED','AFW_MCP_READER_PROBE_ENABLED','AFW_MCP_PUBLISHER_PROBE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_QA_ORIGINALS_ENABLED','AFW_QA_PROVIDER_OBSERVATION_ENABLED','AFW_QA_PRIMARY_RESERVATION_ENABLED','AFW_QA_INSTALLATION_ENABLED','AFW_QA_PRIMARY_CATALOG_ENABLED','AFW_QA_PRIMARY_ADMISSION_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
for(const representation of ['object','api-json'])test('actual QA Workflow and fixed DO preserve history with '+representation+' input',async()=>{
 const api=await import('../lib/mcp-qa-closed-context.mjs');assert.equal(typeof api.runPrivateQaClosedContext,'function','closed context interface required before native build');
 const entry=`import {IndependentClosure,PrivateQaNamedConfirmation} from './worker/independent-closure/index.mjs';
 export {PrivateQaNamedConfirmation};
 export class FixedFixture extends IndependentClosure {
  constructor(ctx,env){super(ctx,new Proxy(env,{get(target,key,receiver){if(['AFW_QA_DB','AFW_QA_ADMIN_READ_API_TOKEN','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'].includes(key))throw Error('forbidden closed-context dependency');return Reflect.get(target,key,receiver);}}));}
  async seedFixture(){await this.ctx.storage.put('historical-sentinel',{value:'preserved'});}
  async rowsFixture(){return [...await this.ctx.storage.list()];}
 }
 export default {fetch(){return new Response(null,{status:404});}};`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-closed-context-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision)}});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:version},...Object.fromEntries(flags.map(k=>[k,'false']))},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FixedFixture',useSQLite:true,uniqueKey:'closed-context-fixed'}},workflows:{FLOW:{name:'closed-context-native',className:'PrivateQaNamedConfirmation'}},outboundService:()=>{outbound++;throw Error('no outbound allowed');}}));
 try{
  const {FLOW,AFW_INDEPENDENT_CLOSURE:ns}=await mf.getBindings(),stub=ns.get(ns.idFromName('afw-own-successor-closure-v1'));await stub.seedFixture();const before=await stub.rowsFixture();
  const id='afw-qa-context-'+version+'-'+revision.slice(0,16),params={operation:'observe_closed_context',expectedVersionId:version,expectedSourceRevision:revision},instance=await FLOW.create({id,params:representation==='api-json'?JSON.stringify(params):params});
  let status;const end=Date.now()+12000;do{status=await instance.status();if(['complete','errored','terminated'].includes(status.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(status.status,'complete',JSON.stringify(status));assert.equal(status.output.status,'observed');assert.equal(status.output.runtimeVersionId,version);assert.equal(status.output.context,'workflow');assert.equal(status.output.actor.context,'durable_object');assert.equal(status.output.operationalReadiness,false);
  assert.deepEqual(await stub.rowsFixture(),before);assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});
