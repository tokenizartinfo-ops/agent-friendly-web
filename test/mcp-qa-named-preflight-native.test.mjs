import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {namedDataPacketFixture} from './fixtures/qa-named-data-packet.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
import {readFile} from 'node:fs/promises';
const revision='a'.repeat(40),version='11111111-1111-4111-8111-111111111111';
const policyKeys=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
for(const [representation,drift] of [['object',null],['api-json',null],['object','artifactSourceRevision'],['api-json','artifactWorkerHash']])test('actual Named diagnostic and DO join native primary D1 without exposing private packet: '+representation+'/'+String(drift),async()=>{
 const api=await import('../lib/mcp-qa-named-preflight.mjs').catch(()=>({}));assert.equal(typeof api.runPrivateQaNamedPacketObservation,'function','mounted native diagnostic required');
 const p=namedDataPacketFixture(),sql=await readFile('worker/independent-closure/qa-named-packets.sql','utf8');
 const entry=`import {WorkflowEntrypoint} from 'cloudflare:workers';
 export class StepFixture extends WorkflowEntrypoint {run(event,step){return{same:step.do===step.do,type:typeof step.do};}}
 import {IndependentClosure,PrivateQaNamedConfirmation} from './worker/independent-closure/index.mjs';
 import {namedDataPacketFixture,packetHash} from './test/fixtures/qa-named-data-packet.mjs';
 import {createPrivateQaGenerationLedger} from './lib/mcp-qa-generation-ledger.mjs';
 import {createPrivateQaExecutionPin} from './lib/mcp-qa-execution-identity.mjs';
 export {PrivateQaNamedConfirmation};
 export class FixedFixture extends IndependentClosure {
  constructor(ctx,env){const p=namedDataPacketFixture();const e={...env,AFW_MCP_CLOSURE_NODE:p.namespace};for(const k of ['AFW_QA_DOSSIER_DB','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'])Object.defineProperty(e,k,{get(){throw Error('forbidden dependency');}});super(ctx,e);}
  async readOwnQaNamedPacket(...args){const raw=await super.readOwnQaNamedPacket(...args),r=JSON.parse(raw);if(r.status==='observed'&&this.env.SYNTHETIC_RECEIPT_DRIFT)r[this.env.SYNTHETIC_RECEIPT_DRIFT]='0'.repeat(this.env.SYNTHETIC_RECEIPT_DRIFT==='artifactSourceRevision'?40:64);return JSON.stringify(r);}
  async seedFixture(){
   // Test-only synthetic eligibility and coherent short artifact. Not315 proof.
   const p=namedDataPacketFixture({at:Date.now()}),raw=p.expectedCapsule,planHash=packetHash('afw.qa-generation-plan.v2\\n'+raw);
   await this.ctx.storage.put('afw.canary-restoration-control.v1',p.f.legacy);await this.ctx.storage.put('history-sentinel',{preserve:true});
   const executionPin=createPrivateQaExecutionPin({env:this.env,expectedVersionId:this.env.AFW_QA_VERSION.id,sourceRevision:'a'.repeat(40),context:'durable_object'});
   const result=await createPrivateQaGenerationLedger({storage:this.ctx.storage,capsule:raw,executionPin,checkEligibility:async()=>true,now:Date.now,timeoutMs:5000}).arm();
   if(result.status!=='armed')throw Error('synthetic ARM failed');
   await this.env.AFW_QA_DB.batch(${JSON.stringify(sql.split('\n-- afw-statement --\n'))}.map(s=>this.env.AFW_QA_DB.prepare(s)));
   await this.env.AFW_QA_DB.prepare('INSERT INTO afw_qa_named_packets_v1(generation_plan_hash,packet_json) VALUES(?,?)').bind(planHash,JSON.stringify(p.packet)).run();
   return{bundleHash:p.f.capsule.bundleHash,planHash};
  }
  async rowsFixture(){return [...await this.ctx.storage.list()];}
 }
 export default{fetch(){return new Response(null,{status:404});}};`;
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'qa-named-packet-native.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_QA_NAMED_ARTIFACT_CONTEXT__':JSON.stringify({artifact:p.artifact,receipt:p.receipt})}});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{SYNTHETIC_RECEIPT_DRIFT:drift??'',AFW_QA_VERSION:{id:version},...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(policyKeys.map(k=>[k,'']))},d1Databases:{AFW_QA_DB:'qa-named-packet-native'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FixedFixture',useSQLite:true,uniqueKey:'named-packet-fixed'}},workflows:{FLOW:{name:'named-packet-diagnostic-native',className:'PrivateQaNamedConfirmation'},PROBE:{name:'step-method-identity-probe',className:'StepFixture'}},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 try{
 const {FLOW,PROBE,AFW_INDEPENDENT_CLOSURE:ns}=await mf.getBindings(),stub=ns.get(ns.idFromName('afw-own-successor-closure-v1')),seed=await stub.seedFixture(),before=await stub.rowsFixture();
 const raw=await stub.readOwnQaNamedPacket(seed.bundleHash),r=JSON.parse(raw);assert.equal(r.status,'observed');assert.equal(r.context,'durable_object');assert.equal(r.generationPlanHash,seed.planHash);assert.ok(Buffer.byteLength(raw)<=2048);assert.equal(JSON.parse(await stub.readOwnQaNamedPacket(seed.planHash)).status,'blocked');
 const probe=await PROBE.create({id:'method-identity',params:{}});let probed;const probeEnd=Date.now()+12000;do{probed=await probe.status();if(probed.status==='complete')break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<probeEnd);assert.equal(probed.status,'complete');assert.equal(probed.output.type,'function');console.log('SYNTHETIC_STEP_METHOD_IDENTITY',JSON.stringify(probed.output));
 const params={operation:'observe_named_packet',namedBundleHash:seed.bundleHash},instance=await FLOW.create({id:'afw-qa-named-preflight-'+seed.bundleHash,params:representation==='api-json'?JSON.stringify(params):params});
 let status;const end=Date.now()+12000;do{status=await instance.status();if(['complete','errored','terminated'].includes(status.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
 assert.equal(status.status,'complete',JSON.stringify(status));assert.equal(status.output.status,drift?'blocked':'observed');if(!drift){assert.equal(status.output.context,'workflow');assert.equal(status.output.actorContext,'durable_object');assert.equal(status.output.namedBundleHash,seed.bundleHash);}assert.equal(status.output.operationalReadiness,false);
 const denied=await FLOW.create({id:'afw-release-'+seed.bundleHash,params:{planHash:seed.bundleHash}});let stopped;const stopEnd=Date.now()+12000;do{stopped=await denied.status();if(['complete','errored','terminated'].includes(stopped.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<stopEnd);assert.equal(stopped.status,'complete');assert.equal(stopped.output.status,'blocked');
 assert.deepEqual(await stub.rowsFixture(),before);const db=await mf.getD1Database('AFW_QA_DB');assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM afw_qa_named_packets_v1').first()).n,1);
 for(const bad of ['packet-fixture-grant','export default','cancellationHistory','namedPolicy'])assert.equal(JSON.stringify(status.output).includes(bad),false);
 assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});
