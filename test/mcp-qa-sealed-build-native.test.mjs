import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const version='11111111-1111-4111-8111-111111111111';
test('both sealed QA artifacts carry the compiled revision and execute only closed context',async()=>{
 const m=await import('../scripts/build-private-qa-closed-context.mjs'),revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),built=await m.buildPrivateQaClosedContext({cwd:process.cwd(),sourceRevision:revision});
 assert.equal(built.manifest.sourceRevision,revision);assert.equal(built.manifest.remotePublished,false);
 assert.equal(built.manifest.operationalReadiness,false);assert.equal(built.manifest.invoked,false);
 for(const [key,script] of [['module',built.script],['rollback',built.rollbackScript]]){
  const meta=built.manifest[key];assert.equal(createHash('sha256').update(script).digest('hex'),meta.sha256);assert.equal(Buffer.byteLength(script),meta.bytes);assert.ok(meta.bytes<=1048576);assert.ok(meta.exports.includes('PrivateQaNamedConfirmation'));
  let outbound=0;
  const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:version},...Object.fromEntries(built.manifest.closedFlags.map(k=>[k,'false']))},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'IndependentClosure',useSQLite:true,uniqueKey:'sealed-qa-'+key},AFW_QA_PREREGISTRY:{className:'PrivateQaPreregistration',useSQLite:true,uniqueKey:'sealed-registry-'+key}},workflows:{FLOW:{name:'sealed-qa-'+key,className:'PrivateQaNamedConfirmation'},BOOTSTRAP:{name:'sealed-bootstrap-'+key,className:'PrivateQaBootstrap'}},outboundService:()=>{outbound++;throw Error('no outbound');}}));
  try{
   const {FLOW}=await mf.getBindings(),id='afw-qa-context-'+version+'-'+revision.slice(0,16),instance=await FLOW.create({id,params:{operation:'observe_closed_context',expectedVersionId:version,expectedSourceRevision:revision}});
   const end=Date.now()+12000;let status;do{status=await instance.status();if(['complete','errored'].includes(status.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
   assert.equal(status.status,'complete',JSON.stringify(status));assert.equal(status.output.status,'observed');assert.equal(status.output.sourceRevision,revision);assert.equal(status.output.actor.sourceRevision,revision);assert.equal(status.output.authorizesEffects,false);assert.equal(status.output.guardLivenessVerified,false);
   assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);assert.equal(outbound,0);
  }finally{await mf.dispose();}
 }
});
