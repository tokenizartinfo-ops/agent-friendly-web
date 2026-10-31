import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generationFixture,hash} from './fixtures/qa-generation-ledger.mjs';
test('actual IndependentClosure resolves only its fixed current native generation without writes or outbound',async()=>{
 const api=await import('../lib/mcp-qa-generation-resolver.mjs').catch(()=>({}));assert.equal(typeof api.createPrivateQaGenerationResolver,'function','resolver required before native build');
 const revision='a'.repeat(40),version='11111111-1111-4111-8111-111111111111';
 const entry=`import {IndependentClosure} from './worker/independent-closure/index.mjs';
import {createPrivateQaGenerationLedger} from './lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';
export class FixedFixture extends IndependentClosure{
 constructor(ctx,env){super(ctx,new Proxy(env,{get(t,k,r){if(['AFW_QA_DB','AFW_QA_DOSSIER_DB','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'].includes(k))throw Error('forbidden dependency');return Reflect.get(t,k,r);}}));}
 async seedFixture(capsule,legacy){await this.ctx.storage.put('afw.canary-restoration-control.v1',legacy);await this.ctx.storage.put('history-sentinel',{preserve:true});
 const executionPin=createPrivateQaExecutionPin({env:this.env,expectedVersionId:this.env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'});
 return createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule,executionPin,checkEligibility:async()=>true,now:Date.now,timeoutMs:5000}).arm();}
 async rowsFixture(){return [...await this.ctx.storage.list()];}
}
export default{fetch(){return new Response(null,{status:404});}};`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-generation-resolver-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision)}});
 let outbound=0;const options=current=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:current}},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FixedFixture',useSQLite:true,uniqueKey:'generation-resolver-fixed'}},outboundService:()=>{outbound++;throw Error('outbound forbidden');}});
 const mf=new Miniflare(options(version));try{
 const f=generationFixture(),at=Date.now();f.capsule.startAt=at-1000;f.capsule.expiresAt=at+60000;const raw=JSON.stringify(f.capsule),plan=hash('afw.qa-generation-plan.v2\n'+raw);
 let ns=(await mf.getBindings()).AFW_INDEPENDENT_CLOSURE,stub=ns.get(ns.idFromName('afw-own-successor-closure-v1'));assert.equal((await stub.seedFixture(raw,f.legacy)).status,'armed');const before=await stub.rowsFixture();
 assert.equal(typeof stub.readOwnQaGeneration,'function');let result=await stub.readOwnQaGeneration(plan);assert.equal(typeof result,'string');let r=JSON.parse(result);assert.equal(r.status,'armed');assert.equal(r.runtimeVersionId,version);assert.equal(r.sourceRevision,revision);assert.equal(r.storedContext,'durable_object');assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);assert.deepEqual(await stub.rowsFixture(),before);
 const foreign=ns.get(ns.idFromName('foreign'));assert.equal(JSON.parse(await foreign.readOwnQaGeneration(plan)).status,'blocked');assert.equal(JSON.parse(await stub.readOwnQaGeneration(f.capsule.bundleHash)).status,'blocked');
 await mf.setOptions(options('22222222-2222-4222-8222-222222222222'));ns=(await mf.getBindings()).AFW_INDEPENDENT_CLOSURE;stub=ns.get(ns.idFromName('afw-own-successor-closure-v1'));assert.equal(JSON.parse(await stub.readOwnQaGeneration(plan)).status,'blocked');assert.deepEqual(await stub.rowsFixture(),before);
 assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});
