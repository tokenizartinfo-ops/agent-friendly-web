import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generationFixture,LEGACY,HEAD,CONTROL} from './fixtures/qa-generation-ledger.mjs';
// Real DO SQLite storage/transactions and RPC. Version metadata, clock and
// eligibility are synthetic; this proves no provider/D1/guard or PC-off property.
test('native ledger serializes concurrent ARM and preserves lineage across recreation',async()=>{
 const api=await import('../lib/mcp-qa-generation-ledger.mjs').catch(()=>null);assert.equal(typeof api?.createPrivateQaGenerationLedger,'function','metadata ledger interface required before native build');
 const entry=`import {DurableObject} from 'cloudflare:workers';
import {createPrivateQaGenerationLedger} from './lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';
export class LedgerFixture extends DurableObject{
 async seedFixture(legacy){if(await this.ctx.storage.get('afw.canary-restoration-control.v1'))throw Error('already seeded');await this.ctx.storage.put('afw.canary-restoration-control.v1',legacy);}
 async commandFixture(method,capsule){if(!['arm','readArmed','status','withdraw'].includes(method))throw Error('fixture method');
 const env={AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}};
 const executionPin=createPrivateQaExecutionPin({env,expectedVersionId:env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'});
 return createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule,executionPin,checkEligibility:async()=>true,now:()=>Number(this.env.AT),timeoutMs:5000})[method]();}
 async rowsFixture(){return [...await this.ctx.storage.list()];}
}
export default {async fetch(request,env){const body=await request.json(),stub=env.LEDGER.get(env.LEDGER.idFromName('fixed-fixture'));
if(body.method==='seed'){await stub.seedFixture(body.legacy);return Response.json({seeded:true});}
if(body.method==='rows')return Response.json(await stub.rowsFixture());
return Response.json(await stub.commandFixture(body.method,body.capsule));}};`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-generation-ledger-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const f=generationFixture();let at=f.now();const options=()=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AT:String(at)},durableObjects:{LEDGER:{className:'LedgerFixture',useSQLite:true,uniqueKey:'qa-generation-ledger-native'}}});
 const mf=new Miniflare(options());try{
 const call=async(method,capsule=f.capsule)=>{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method,capsule:JSON.stringify(capsule),legacy:f.legacy})});assert.equal(response.status,200);return response.json();};
 await call('seed');const result=await Promise.all([call('arm'),call('arm')]);assert.equal(result.filter(x=>x.status==='armed').length,1);
 const original=result.find(x=>x.status==='armed'),firstRows=new Map(await call('rows'));assert.equal(firstRows.size,4);assert.deepEqual(firstRows.get(LEGACY),f.legacy);
 await mf.setOptions(options());assert.equal((await call('readArmed')).status,'armed');assert.equal((await call('arm')).status,'blocked');assert.equal((await call('withdraw')).status,'withdrawn');
 const second={...f.capsule,predecessor:{kind:'generation',planHash:original.planHash,infoHash:original.infoHash,sequence:original.sequence},trialId:'8'.repeat(64),grantId:'native-next',eventId:'9'.repeat(64),startAt:at+70000,expiresAt:at+130000};
 assert.equal((await call('arm',second)).status,'blocked');at+=71000;await mf.setOptions(options());const next=await call('arm',second);assert.equal(next.status,'armed');assert.equal(next.sequence,2);
 const before=new Map(await call('rows'));await call('withdraw');const after=new Map(await call('rows'));assert.deepEqual(after.get(HEAD),before.get(HEAD));assert.deepEqual(after.get(CONTROL+next.planHash),before.get(CONTROL+next.planHash));assert.deepEqual(after.get(LEGACY),f.legacy);assert.equal((await call('readArmed',second)).status,'armed');
 }finally{await mf.dispose();}
});
