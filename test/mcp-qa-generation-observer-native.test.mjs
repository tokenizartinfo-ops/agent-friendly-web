import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generationFixture} from './fixtures/qa-generation-ledger.mjs';
test('native read-only observer resolves stored identity across recreation',async()=>{
 const api=await import('../lib/mcp-qa-generation-ledger.mjs');assert.equal(typeof api.createPrivateQaGenerationObserver,'function','read-only observer interface required before native build');
 const entry=`import {DurableObject} from 'cloudflare:workers';
import {createPrivateQaGenerationLedger,createPrivateQaGenerationObserver} from './lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';
export class ReaderFixture extends DurableObject{
 async runFixture(method,capsule,legacy){if(method==='seed'){await this.ctx.storage.put('afw.canary-restoration-control.v1',legacy);return{seeded:true};}
 const now=()=>Number(this.env.AT);
 if(method==='read')return createPrivateQaGenerationObserver({storage:this.ctx.storage,capsule,now,timeoutMs:5000}).read();
 if(method==='rows')return [...await this.ctx.storage.list()];
 const env={AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},executionPin=createPrivateQaExecutionPin({env,expectedVersionId:env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'});
 return createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule,executionPin,checkEligibility:async()=>true,now,timeoutMs:5000})[method]();}
}
export default{async fetch(request,env){const b=await request.json(),stub=env.LEDGER.get(env.LEDGER.idFromName('observer'));return Response.json(await stub.runFixture(b.method,b.capsule,b.legacy));}};
`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-generation-observer-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'}),f=generationFixture(),options=()=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(f.now())},durableObjects:{LEDGER:{className:'ReaderFixture',useSQLite:true,uniqueKey:'qa-generation-observer-native'}}});
 const mf=new Miniflare(options());try{const call=async method=>{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method,capsule:JSON.stringify(f.capsule),legacy:f.legacy})});assert.equal(response.status,200);return response.json();};
 await call('seed');assert.equal((await call('read')).status,'absent');await call('arm');const before=await call('rows');await mf.setOptions(options());const r=await call('read');assert.equal(r.status,'armed');assert.equal(r.runtimeVersionId,'11111111-1111-4111-8111-111111111111');assert.equal(r.sourceRevision,'a'.repeat(40));assert.equal(r.storedContext,'durable_object');assert.equal(r.authorizesEffects,false);assert.deepEqual(await call('rows'),before);await call('withdraw');assert.equal((await call('read')).status,'withdrawn');
 }finally{await mf.dispose();}
});
