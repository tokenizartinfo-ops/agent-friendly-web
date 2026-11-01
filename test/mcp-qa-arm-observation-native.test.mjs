import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {armObservationFixture,observationId,observationPolicies} from './fixtures/qa-arm-observation.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const baseFile=process.env.AFW_QA_INSPECTION_BASE_MODULE,exactBase=baseFile?await readFile(baseFile):null;
if(exactBase){assert.equal(exactBase.length,395915);assert.equal(createHash('sha256').update(exactBase).digest('hex'),'4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f');}
async function fixture(mode){
 const seed=armObservationFixture(),context={...seed.context,startAt:Date.now()-1000,expiresAt:Date.now()+300000},pins={canary:seed.pins.canary,operator:seed.pins.operator};
 const entry=`import baseline,{PrivateQaBootstrap} from './scripts/qa-arm-observation-wrapper.mjs';
 import {armObservationFixture} from './test/fixtures/qa-arm-observation.mjs';
 import {createPrivateQaArmHttpAdapters} from './lib/mcp-qa-cloud-closed-http.mjs';
 export {IndependentClosure,PrivateQaPreregistration,PrivateQaNamedConfirmation} from './scripts/qa-arm-observation-wrapper.mjs';
 export class FixtureBootstrap extends PrivateQaBootstrap{
  async run(event,step){
   const f=armObservationFixture(),original=globalThis.fetch;f.version=this.env.AFW_QA_VERSION.id;
   globalThis.fetch=f.fetch;
   try{
    if(this.env.MODE==='http-fixture'){const o=f.options(),a=createPrivateQaArmHttpAdapters({plan:{purpose:'afw.qa-arm-quiescence.v1',sessionId:f.context.id,startAt:f.wall-1,expiresAt:f.wall+4000},pins:o.pins,credential:'synthetic-private-CF-token',sourceRevision:o.context.sourceRevision,qaVersionId:f.version,currentBootstrapId:event.instanceId,fetchImpl:f.fetch,now:()=>f.wall});await a.readSnapshot(f.parent.signal);await a.readSnapshot(f.parent.signal);return{fixtureQualified:true};}
    if(this.env.MODE==='stale')event={...event,timestamp:new Date(Date.now()-5001)};
    if(this.env.MODE==='future')event={...event,timestamp:new Date(Date.now()+5000)};
    if(this.env.MODE==='cached')step={do:async()=>({purpose:'afw.qa-arm-http-observation.v1',status:'observed'})};
    if(this.env.MODE==='http403')f.mutate=({response})=>{response.status=403;response.body={private:'PRIVATE-NO-OUTPUT'};};
    return await super.run(event,step);
   }finally{globalThis.fetch=original;}
  }
 }
 export default baseline;`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-arm-http-observation-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',plugins:[{name:'closed-original-observation-context',setup(b){
 b.onResolve({filter:/^\.\/closed-rollback\.mjs$/},()=>({path:'base',namespace:'observation-fixture'}));
 b.onResolve({filter:/^\.\/observation-context\.mjs$/},()=>({path:'context',namespace:'observation-fixture'}));
 b.onResolve({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({path:'pins',namespace:'observation-fixture'}));
 b.onLoad({filter:/.*/,namespace:'observation-fixture'},args=>({contents:args.path==='context'?'export const observation=Object.freeze('+JSON.stringify(context)+');':args.path==='pins'?'export const QA_CLOUD_CLOSED_PINS=Object.freeze('+JSON.stringify(pins)+');':exactBase?exactBase.toString('utf8'):"export {IndependentClosure,PrivateQaBootstrap,PrivateQaPreregistration,PrivateQaNamedConfirmation,default} from './worker/independent-closure/index.mjs';",resolveDir:process.cwd(),loader:'js'}));
 }}]});
 const bindings={MODE:mode,AFW_QA_VERSION:{id:seed.version},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-private-CF-token',...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(observationPolicies.map(k=>[k,'']))};if(mode==='open')bindings.AFW_QA_HTTP_ENABLED='true';
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'IndependentClosure',useSQLite:true},AFW_QA_PREREGISTRY:{className:'PrivateQaPreregistration',useSQLite:true}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'FixtureBootstrap'}},outboundService:()=>{outbound++;throw Error('outgoing forbidden');}}));
 const {FLOW}=await mf.getBindings();
 const run=async()=>{const instance=await FLOW.create({id:'afw-qa-arm-'+observationId,params:{operation:'inspect_arm_quiescence',observationId}});let state;const end=Date.now()+12000;do{state=await instance.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);assert.equal(state.status,'complete',JSON.stringify(state));return state.output;};
 return{mf,run,get outbound(){return outbound;}};
}
test('accepted HTTP fixture independently qualifies in actual native Workflow',async()=>{
 const f=await fixture('http-fixture');try{assert.deepEqual(await f.run(),{fixtureQualified:true});assert.equal(f.outbound,0);}finally{await f.mf.dispose();}
});
for(const mode of ['normal','stale','future','cached','http403','open'])test('actual inherited Bootstrap closed HTTP observation '+mode,async()=>{
 const f=await fixture(mode);try{const r=await f.run();assert.equal(r.status,mode==='normal'?'observed':'blocked',JSON.stringify(r));assert.equal(r.purpose,'afw.qa-arm-http-observation.v1');assert.ok(Buffer.byteLength(JSON.stringify(r))<=2048);for(const k of ['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);assert.equal(JSON.stringify(r).includes('synthetic-private-CF-token'),false);assert.equal(f.outbound,0);}finally{await f.mf.dispose();}
});
