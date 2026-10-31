import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
const sourceBytes=await readFile('scripts/qa-legacy-inspection-wrapper.mjs');
console.log('CLOSED_LEGACY_WRAPPER_SOURCE',JSON.stringify({bytes:sourceBytes.length,sha256:createHash('sha256').update(sourceBytes).digest('hex')}));
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generationFixture} from './fixtures/qa-generation-ledger.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const slot='afw-own-successor-closure-v1',id='e'.repeat(64),version='11111111-1111-4111-8111-111111111111',legacy='afw.canary-restoration-control.v1',restore='afw.successor-canary-restoration.v1';
const baseFile=process.env.AFW_QA_INSPECTION_BASE_MODULE;
const exactBase=baseFile?await readFile(baseFile):null;
if(exactBase){assert.equal(exactBase.length,395915);assert.equal(createHash('sha256').update(exactBase).digest('hex'),'4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f');}
console.log('CLOSED_LEGACY_BASELINE_SOURCE',JSON.stringify({mode:exactBase?'exact_immutable_base':'current_source_fixture',bytes:exactBase?.length??null}));
const policyKeys=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
async function fixture(mode='absent'){
 const now=Date.now(),context={purpose:'afw.qa-legacy-inspection-context.v1',id,sourceRevision:'a'.repeat(40),baselineVersionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',baselineModuleHash:'4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f',startAt:now-1000,expiresAt:now+300000};
 if(mode==='expired')context.expiresAt=now-1;
 const entry=`import baseline,{IndependentClosure,PrivateQaBootstrap,PrivateQaPreregistration,PrivateQaNamedConfirmation} from './scripts/qa-legacy-inspection-wrapper.mjs';
 export {PrivateQaPreregistration,PrivateQaNamedConfirmation};
 export class FixtureBootstrap extends PrivateQaBootstrap{async run(event,step){if(this.env.SYNTHETIC_MODE==='cached'){const ns=this.env.AFW_INDEPENDENT_CLOSURE,raw=await ns.get(ns.idFromName('afw-own-successor-closure-v1')).readLegacyInspection('e'.repeat(64),Date.now()+4000);return super.run(event,{do:async()=>raw});}return super.run(event,step);}}
 export class FixtureClosure extends IndependentClosure{
  constructor(ctx,env){const e={...env};for(const key of ['AFW_QA_DB','AFW_QA_DOSSIER_DB','AFW_MCP_CLOSURE_NODE','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'])Object.defineProperty(e,key,{enumerable:true,get(){throw Error('forbidden data or authority');}});super(ctx,e);}
  async seedFixture(legacy,journal,generation,nullLegacy){await this.ctx.storage.put('history-sentinel',{preserve:'PRIVATE-NO-OUTPUT'});if(nullLegacy)await this.ctx.storage.put('afw.canary-restoration-control.v1',null);else if(legacy!==null)await this.ctx.storage.put('afw.canary-restoration-control.v1',legacy);if(journal)await this.ctx.storage.put('afw.successor-canary-restoration.v1',journal);if(generation){await this.ctx.storage.put('afw.qa-generation-head.v2',{purpose:'afw.qa-generation-head.v2',sequence:1,planHash:'b'.repeat(64),infoHash:'c'.repeat(64)});await this.ctx.storage.put('afw.qa-generation-info.v2:'+'b'.repeat(64),{capsule:'PRIVATE-CAPSULE-NO-OUTPUT'});await this.ctx.storage.put('afw.qa-generation-control.v2:'+'b'.repeat(64),{phase:'withdrawn'});}}
  async rowsFixture(){return JSON.stringify([...await this.ctx.storage.list()]);}
  async readLegacyInspection(...args){const raw=await super.readLegacyInspection(...args);if(this.env.SYNTHETIC_MODE==='late')await new Promise(r=>setTimeout(r,5100));if(this.env.SYNTHETIC_MODE==='drift'){const r=JSON.parse(raw);if(r.status==='observed'){r.legacy.shape='PRIVATE-LEAK';return JSON.stringify(r);}}return raw;}
  async inheritedClosedFixture(){return JSON.stringify({alarm:await this.alarm(),arm:await this.arm(),status:await this.status()});}
  inheritedFixture(){return JSON.stringify({alarm:typeof this.alarm,arm:typeof this.armOwnCanaryClosure,status:typeof this.readOwnCanaryClosureControl});}
 }
 export default baseline;`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-legacy-inspection-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',plugins:[{name:'native-original-and-admin-context',setup(b){
 b.onResolve({filter:/^\.\/closed-rollback\.mjs$/},()=>({path:'base',namespace:'inspection-fixture'}));
 b.onResolve({filter:/^\.\/inspection-context\.mjs$/},()=>({path:'context',namespace:'inspection-fixture'}));
 b.onLoad({filter:/.*/,namespace:'inspection-fixture'},args=>({contents:args.path==='context'?'export const inspection=Object.freeze('+JSON.stringify(context)+');':exactBase?exactBase.toString('utf8'):"export {IndependentClosure,PrivateQaBootstrap,PrivateQaPreregistration,PrivateQaNamedConfirmation,default} from './worker/independent-closure/index.mjs';",resolveDir:process.cwd(),loader:'js'}));
 }}]});
 let outbound=0;const bindings={SYNTHETIC_MODE:mode,AFW_QA_VERSION:{id:version},...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(policyKeys.map(k=>[k,'']))};if(mode==='open')bindings.AFW_MCP_CLOSURE_ENABLED='true';
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FixtureClosure',useSQLite:true,uniqueKey:'legacy-inspection-fixed'},AFW_QA_PREREGISTRY:{className:'PrivateQaPreregistration',useSQLite:true,uniqueKey:'legacy-inspection-prereg'}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'FixtureBootstrap'}},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 const {AFW_INDEPENDENT_CLOSURE:ns,FLOW}=await mf.getBindings(),stub=ns.get(ns.idFromName(slot)),f=generationFixture();
 let row=mode==='absent'?null:structuredClone(f.legacy),journal=null;
 if(mode==='unarmed')row.armedAt=null;
 if(mode==='permuted'){row.policy=JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(row.policy)).reverse()));row.planHash=createHash('sha256').update(row.policy).digest('hex');}
 if(mode==='malformed')row={purpose:legacy,private:'PRIVATE-LEGACY-NO-OUTPUT',policy:'PRIVATE-POLICY-NO-OUTPUT'};
 if(mode==='incomplete_complete')journal={purpose:restore,phase:'complete'};
 if(mode==='uncertain')journal={purpose:restore,planHash:f.legacy.planHash,phase:'issued',proofHash:'f'.repeat(64),issuedAt:JSON.parse(f.legacy.policy).startAt+1,deploymentId:null,completedAt:null};
 await stub.seedFixture(row,journal,mode==='generation',mode==='null');
 const before=await stub.rowsFixture();
 const run=async()=>{const instance=await FLOW.create({id:'afw-qa-legacy-inspect-'+id,params:{operation:'inspect_legacy',inspectionId:id}});let state;const end=Date.now()+12000;do{state=await instance.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);assert.equal(state.status,'complete',JSON.stringify(state));return state.output;};
 return{mf,stub,run,before,row,journal,ns,context,get outbound(){return outbound;}};
}
for(const mode of ['absent','armed','permuted','null','unarmed','uncertain','generation','malformed','incomplete_complete'])test('actual inherited closed DO and Workflow inspect '+mode+' technical history without touching it',async()=>{
 const f=await fixture(mode);try{
 assert.deepEqual(JSON.parse(await f.stub.inheritedFixture()),{alarm:'function',arm:'function',status:'function'});
 assert.deepEqual(JSON.parse(await f.stub.inheritedClosedFixture()),{alarm:{state:'unavailable'},arm:{state:'unavailable'},status:{state:'unavailable'}});
 const r=await f.run();assert.equal(r.status,'observed');assert.equal(r.purpose,'afw.qa-legacy-inspection.v1');assert.equal(r.context,'workflow');assert.equal(r.actorContext,'durable_object');assert.equal(r.runtimeVersionId,version);
 assert.equal(r.qaConfigurationClosed,true);assert.equal(r.selectedHistoryStable,true);assert.equal(r.storageWritesIssued,false);
 for(const key of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[key],false);
 if(mode==='absent'){assert.equal(r.legacy.present,false);assert.equal(r.legacy.timeShapeReady,false);}
 if(mode==='armed'||mode==='permuted'){assert.equal(r.legacy.present,true);assert.equal(r.legacy.timeShapeReady,true);assert.equal(r.legacy.armedAt,f.row.armedAt);}
 if(mode==='unarmed'){assert.equal(r.legacy.present,true);assert.equal(r.legacy.timeShapeReady,false);assert.equal(r.legacy.armedAt,null);}
 if(mode==='uncertain'){assert.equal(r.hasUncertainJournal,true);assert.equal(r.journals.find(x=>x.key==='restoration').phase,'issued');}
 if(mode==='incomplete_complete'){assert.equal(r.hasUncertainJournal,true);assert.equal(r.journals.find(x=>x.key==='restoration').uncertain,true);}
 if(mode==='generation'){assert.equal(r.generation.headPresent,true);assert.equal(r.generation.infoCount,1);assert.equal(r.generation.controlCount,1);assert.equal(r.generation.requiresReview,true);}
 if(mode==='null'){assert.equal(r.legacy.present,true);assert.equal(r.legacy.shape,'unsupported');assert.equal(r.legacy.timeShapeReady,false);}
 if(mode==='malformed'){assert.equal(r.legacy.shape,'unsupported');assert.equal(r.legacy.timeShapeReady,false);}
 const text=JSON.stringify(r);assert.ok(Buffer.byteLength(text)<=4096);for(const secret of ['PRIVATE-','candidate','moduleHash','policy','grantId','capsule'])assert.equal(text.includes(secret),false,secret);
 assert.equal(await f.stub.rowsFixture(),f.before);assert.equal(f.outbound,0);assert.equal((await f.mf.dispatchFetch('https://fixture.invalid')).status,404);
 }finally{await f.mf.dispose();}
});
for(const mode of ['open','expired','cached','late','drift'])test('closed inspection rejects '+mode+' without changing history',async()=>{
 const f=await fixture(mode);try{assert.equal((await f.run()).status,'blocked');assert.equal(await f.stub.rowsFixture(),f.before);assert.equal(f.outbound,0);}finally{await f.mf.dispose();}
});
test('inspection target, argument and deadline cannot be selected by a caller',async()=>{
 const f=await fixture();try{for(const args of [[],['f'.repeat(64),Date.now()+5000],[id,Date.now()+6000],[id,0],[id,Date.now()+5000,{}]])assert.equal(JSON.parse(await f.stub.readLegacyInspection(...args)).status,'blocked');await assert.rejects(async()=>{const foreign=f.ns.get(f.ns.idFromName('foreign-actor'));return await foreign.readLegacyInspection(id,Date.now()+4000);},/forbidden data or authority/);assert.equal(await f.stub.rowsFixture(),f.before);assert.equal(f.outbound,0);}finally{await f.mf.dispose();}
});
