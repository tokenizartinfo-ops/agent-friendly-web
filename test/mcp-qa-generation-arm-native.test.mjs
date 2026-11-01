import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFile} from 'node:fs/promises';
import {generationPreparationFixture,PREPARATION_POLICIES} from './fixtures/qa-generation-preparation.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
import {seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
const api=await import('../lib/mcp-qa-generation-arm.mjs').catch(()=>({}));
for(const variant of ['valid','reservation','revocation','abort','lost-pending','lost-armed'])test('actual isolated DO/D1 ARM with synthetic invocation: '+variant,async()=>{
 assert.equal(typeof api.createPrivateQaGenerationArm,'function');
 const at=Date.now()-1000,x=generationPreparationFixture({at}),schema=await readFile('worker/independent-closure/qa-generation-drafts.sql','utf8');
 const built=await build({entryPoints:['test/fixtures/qa-generation-arm-native.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{FIXTURE_AT:String(at),AFW_QA_VERSION:{id:'0771c5f5-88b1-428a-b700-d51aa726b35f'},...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,['AFW_MCP_CLOSURE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'].includes(k)?'true':'false'])),...Object.fromEntries(PREPARATION_POLICIES.map(k=>[k,'']))},d1Databases:{AFW_QA_DB:'isolated-arm-drafts',AFW_QA_DOSSIER_DB:'isolated-arm-dossier'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'GenerationArmFixture',useSQLite:true,uniqueKey:'private-arm-fixture'}},outboundService:()=>{outbound++;throw Error('outbound forbidden');}}));
 try{
  const {AFW_INDEPENDENT_CLOSURE:ns}=await mf.getBindings(),stub=ns.get(ns.idFromName('afw-own-successor-closure-v1')),qa=await mf.getD1Database('AFW_QA_DB'),db=await mf.getD1Database('AFW_QA_DOSSIER_DB');
  await stub.seed();const before=await stub.rows();await qa.batch(schema.split('\n-- afw-statement --\n').map(sql=>qa.prepare(sql)));await qa.prepare('INSERT INTO afw_qa_generation_drafts_v1(named_bundle_hash,draft_json) VALUES(?,?)').bind(x.namedBundleHash,x.draftJson).run();
  await seedNamedHistoryFixture(db,{events:x.event,history:x.history,providedRaw:JSON.stringify(x.history),variant:'valid'},x.original);
  await db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(x.old.policy.expiresAt).toISOString(),x.old.event.grantId).run();
  const r=await stub.qualify(variant),rows=new Map(await stub.rows()),h=rows.get('afw.qa-generation-head.v2');
  assert.equal(r.syntheticInvocationDeclaration,true);assert.equal(r.result.status,variant==='valid'?'armed':'uncertain',JSON.stringify(r));assert.ok(h);
  assert.equal(rows.get('afw.qa-generation-control.v2:'+h.planHash).phase,['valid','lost-armed'].includes(variant)?'armed':'pending');
  assert.deepEqual([...rows].filter(([k])=>!k.startsWith('afw.qa-generation-')),before);assert.equal(r.result.operationalReadiness,false);assert.equal(r.result.authorizesEffects,false);
  assert.ok(r.requests.length>0);assert.ok(r.requests.every(r=>r.method==='GET'));assert.ok(Buffer.byteLength(JSON.stringify(r.result))<=2048);
  assert.equal((await qa.prepare('SELECT draft_json FROM afw_qa_generation_drafts_v1').first()).draft_json,x.draftJson);
  assert.equal(outbound,0);assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);
 }finally{await mf.dispose();}
});
