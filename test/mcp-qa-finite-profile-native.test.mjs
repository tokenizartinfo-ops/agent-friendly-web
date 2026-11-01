import test from 'node:test';
import assert from 'node:assert/strict';
import {validateFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
test('historical_content_never_claims_M',()=>{
 const M='a'.repeat(40),tree='b'.repeat(40),roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
 const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'},keys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
 const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'c'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,{provenance:versions[role]?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:keys[role],versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',bytes:1,sha256:'d'.repeat(64),exports:[]},publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)}}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
 assert.deepEqual(validateFinitePackageManifest(manifest),manifest);
 for(const mutate of [
  m=>m.modules.qaClosed.provenance.sourceRevision=M,
  m=>m.modules.operatorClosed.provenance={kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},
  m=>m.modules.qaClosed.provenance.receiptKey='operator',
  m=>m.modules.qaClosed.provenance.receiptBlobSha='0'.repeat(40),
  m=>m.modules.qaClosed.provenance.versionId=versions.canaryClosed,
  m=>m.modules.qaLive.provenance.sourceTree='0'.repeat(40),
 ]){const m=structuredClone(manifest);mutate(m);assert.throws(()=>validateFinitePackageManifest(m));}
});
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Actual compiled Worker/DO entrypoints under workerd. No provider, credentials,
// Container or grant is provisioned; all trap instrumentation is fixture-only.
test('native finite legacy delivery and schedule cannot enter any host capability',async()=>{
 const contents=`
 import worker,{AfwOwnEventNode} from './worker/mcp-own/finite.mjs';
 export class Native extends AfwOwnEventNode{
  constructor(ctx,env){const touches=[];super(ctx,new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));this.touches=touches;}
  async fixture(method){try{await this[method]('old-event','old-subscription');return {denied:false,touches:this.touches};}catch{return {denied:true,touches:this.touches};}}
 }
 export default{async fetch(request,env){const method=new URL(request.url).pathname.slice(1);
  if(method==='schedule'){const touches=[];const result=await worker.scheduled({scheduledTime:Date.now()},new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));return Response.json({result,touches});}
  return Response.json(await env.NODE.get(env.NODE.idFromName('receiver')).fixture(method));
 }};
 `;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':'"finite_trial_event"'}});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{NODE:{className:'Native',useSQLite:true}}}));
 try{
  for(const method of ['deliverOwnSaved','deliverSaved'])assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/'+method)).json(),{denied:true,touches:[]});
  assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/schedule')).json(),{result:null,touches:[]});
 }finally{await mf.dispose();}
});
