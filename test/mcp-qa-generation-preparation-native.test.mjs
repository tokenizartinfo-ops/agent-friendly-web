import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFile} from 'node:fs/promises';
import {generationPreparationFixture,PREPARATION_POLICIES} from './fixtures/qa-generation-preparation.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
import {seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
const revision='a'.repeat(40),version='11111111-1111-4111-8111-111111111111';
for(const representation of ['object','api-json'])test('actual Workflow and fixed DO privately prepare from separate native D1 bindings: '+representation,async()=>{
 const api=await import('../lib/mcp-qa-generation-preparation.mjs').catch(()=>({}));assert.equal(typeof api.runPrivateQaGenerationPreparation,'function');
 const at=Date.now()-1000,x=generationPreparationFixture({at}),schema=await readFile('worker/independent-closure/qa-generation-drafts.sql','utf8');
 const entry=`import {IndependentClosure,PrivateQaNamedConfirmation} from './worker/independent-closure/index.mjs';
 import {generationPreparationFixture} from './test/fixtures/qa-generation-preparation.mjs';
 import {createPrivateQaOriginalPinsReader} from './lib/mcp-qa-original-pins.mjs';
 import {createPrivateQaHistoricalIdentityReader} from './lib/mcp-qa-historical-identity.mjs';
 export {PrivateQaNamedConfirmation};
 import {WorkflowEntrypoint} from 'cloudflare:workers';
 import {runPrivateQaGenerationPreparation} from './lib/mcp-qa-generation-preparation.mjs';
 export class CachedPreparation extends WorkflowEntrypoint{run(event){return runPrivateQaGenerationPreparation({env:this.env,event,step:{do:async()=>JSON.parse(await this.env.AFW_INDEPENDENT_CLOSURE.get(this.env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1')).readOwnQaGenerationPreparation(event.payload.namedBundleHash))}});}}
 export class StalePreparation extends WorkflowEntrypoint{run(event,step){return runPrivateQaGenerationPreparation({env:this.env,event:{...event,timestamp:new Date(Date.now()-5001)},step});}}
 export class FixedPreparation extends IndependentClosure{
  constructor(ctx,env){const x=generationPreparationFixture({at:Number(env.FIXTURE_AT)});super(ctx,{...env,AFW_MCP_CLOSURE_NODE:x.p.namespace});}
  async seedFixture(){
   const x=generationPreparationFixture({at:Number(this.env.FIXTURE_AT)});
   for(const [key,value]of x.f.rows)await this.ctx.storage.put(key,value);
   return{namedBundleHash:x.namedBundleHash};
  }
  async qualifyFixture(){const x=generationPreparationFixture({at:Number(this.env.FIXTURE_AT)}),window={startAt:x.p.policy.startAt,expiresAt:x.p.policy.expiresAt},original=await createPrivateQaOriginalPinsReader({db:this.env.AFW_QA_DOSSIER_DB,original:x.manifest.original,window,authorize:async()=>true,now:Date.now,timeoutMs:5000}).read();return createPrivateQaHistoricalIdentityReader({db:this.env.AFW_QA_DOSSIER_DB,scope:Object.fromEntries(['grantId','subject','projectId','clientId','resource'].map(k=>[k,x.old.event[k]])),candidate:x.old.closure.candidate,original,window,authorize:async()=>true,now:Date.now,timeoutMs:5000}).check(new AbortController().signal);}
  async snapshotFixture(){return[...await this.ctx.storage.list()];}
 }
 const worker={fetch(){return new Response(null,{status:404});}};export default worker;`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-private-generation-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_QA_NAMED_ARTIFACT_CONTEXT__':JSON.stringify({artifact:x.p.artifact,receipt:x.p.receipt}),'globalThis.__AFW_QA_HISTORICAL_CONTEXT__':JSON.stringify(x.old.historicalContext)}});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{FIXTURE_AT:String(at),AFW_QA_VERSION:{id:version},...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(PREPARATION_POLICIES.map(k=>[k,'']))},d1Databases:{AFW_QA_DB:'isolated-generation-draft',AFW_QA_DOSSIER_DB:'explicit-dossier-primary'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FixedPreparation',useSQLite:true,uniqueKey:'private-generation-preparation'}},workflows:{FLOW:{name:'private-generation-preparation-native',className:'PrivateQaNamedConfirmation'},CACHED:{name:'cached-generation-preparation-native',className:'CachedPreparation'},STALE:{name:'stale-generation-preparation-native',className:'StalePreparation'}},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 try{
 const {FLOW,CACHED,STALE,AFW_INDEPENDENT_CLOSURE:ns}=await mf.getBindings(),stub=ns.get(ns.idFromName('afw-own-successor-closure-v1')),seed=await stub.seedFixture(),storageBefore=await stub.snapshotFixture(),qa=await mf.getD1Database('AFW_QA_DB'),dossier=await mf.getD1Database('AFW_QA_DOSSIER_DB');
 await qa.batch(schema.split('\n-- afw-statement --\n').map(sql=>qa.prepare(sql)));await qa.prepare('INSERT INTO afw_qa_generation_drafts_v1(named_bundle_hash,draft_json) VALUES(?,?)').bind(x.namedBundleHash,x.draftJson).run();
 await seedNamedHistoryFixture(dossier,{events:x.event,history:x.history,providedRaw:JSON.stringify(x.history),variant:'valid'},x.original);await dossier.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(x.old.policy.expiresAt).toISOString(),x.old.event.grantId).run();
 const snapshot=async()=>[await qa.prepare('SELECT * FROM afw_qa_generation_drafts_v1').all(),...await Promise.all(['delegated_access_grants','dossier_node_process_admissions','dossier_node_process_closures','dossier_monitoring_consent_events','dossier_successor_reservations'].map(async table=>(await dossier.prepare('SELECT * FROM '+table+' ORDER BY 1').all()).results))],before=await snapshot();
 assert.equal(await stub.qualifyFixture(),true,'accepted primary validators must qualify the synthetic fixture before testing new behavior');
 const raw=await stub.readOwnQaGenerationPreparation(seed.namedBundleHash),r=JSON.parse(raw);assert.equal(r.status,'observed');assert.equal(r.d1IdentityCorrelationVerified,true);assert.equal(r.retainedUncertainty,true);assert.equal(r.runtimeVersionId,version);assert.equal(r.context,'durable_object');
 const params={operation:'observe_generation_preparation',namedBundleHash:seed.namedBundleHash},instance=await FLOW.create({id:'afw-qa-generation-prepare-'+seed.namedBundleHash,params:representation==='api-json'?JSON.stringify(params):params});let status;const end=Date.now()+12000;do{status=await instance.status();if(['complete','errored','terminated'].includes(status.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<end);
 assert.equal(status.status,'complete',JSON.stringify(status));assert.equal(status.output.status,'observed');assert.equal(status.output.context,'workflow');assert.equal(status.output.actorContext,'durable_object');assert.equal(status.output.sourceRevision,revision);assert.equal(status.output.operationalReadiness,false);assert.ok(Buffer.byteLength(JSON.stringify(status.output))<=2048);
 for(const denied of ['new-preparation-grant','packet-fixture-grant','packetJson','capsuleJson','namedPolicy','cancellationHistory','export default'])assert.equal(JSON.stringify(status.output).includes(denied),false);
 for(const flow of [CACHED,STALE]){const rejected=await flow.create({id:'afw-qa-generation-prepare-'+seed.namedBundleHash,params});let stopped;const stopEnd=Date.now()+12000;do{stopped=await rejected.status();if(['complete','errored','terminated'].includes(stopped.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<stopEnd);assert.equal(stopped.status,'complete',JSON.stringify(stopped));assert.equal(stopped.output.status,'blocked');assert.equal(stopped.output.operationalReadiness,false);}
 assert.deepEqual(await stub.snapshotFixture(),storageBefore);const after=await snapshot();assert.deepEqual(after[0].results,before[0].results);assert.deepEqual(after.slice(1),before.slice(1));assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});
