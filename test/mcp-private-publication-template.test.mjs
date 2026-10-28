import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as builder from '../scripts/build-mcp-release-operator.mjs';
import {RELEASE_TARGET,validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';
const publicationModule=await import('../lib/mcp-private-publication-template.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const supported=typeof builder.buildMcpPrivatePublicationTemplate==='function'&&typeof publicationModule.materializeMcpPrivatePublication==='function';
const opt={skip:!supported}, hash=x=>createHash('sha256').update(x).digest('hex');
const script='export default {fetch(){return new Response("public synthetic")}};';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
const seedBase='01234567-89ab-4cde-8fab-0123456789ab';
const bundle=()=>({artifact:{...artifact},policy:{operation:'publish',startAt:0,expiresAt:1,pins:{...RELEASE_TARGET,baseVersionId:seedBase}}});
let compiled;
const prepared=()=>compiled??=builder.buildMcpPrivatePublicationTemplate(bundle());
const input=async()=>{const p=await prepared();return {...p,policyJson:JSON.stringify(bundle().policy),expectedTemplateHash:p.manifest.templateHash};};
const materialize=x=>publicationModule.materializeMcpPrivatePublication(x);
const fixed=e=>e?.message==='Private publication preparation unavailable'&&!Object.hasOwn(e,'cause');
const resign=(p,template)=>({...p,template,expectedTemplateHash:hash(template),manifest:{...p.manifest,templateHash:hash(template),templateBytes:Buffer.byteLength(template)}});

test('publication template and materializer are exported separately from confirmation',()=>{
 assert.equal(typeof builder.buildMcpPrivatePublicationTemplate,'function');
 assert.equal(typeof publicationModule.materializeMcpPrivatePublication,'function');
 assert.equal(typeof builder.buildMcpPrivateConfirmationTemplate,'function');
 if(supported)assert.deepEqual(publicationModule.PRIVATE_PUBLICATION_TARGET,RELEASE_TARGET);
});
test('public publication template omits seed policy and preserves public provenance',opt,async()=>{
 const p=await prepared();
 assert.equal(p.manifest.format,'afw-private-publication-template-v1');
 assert.equal(p.manifest.templateHash,hash(p.template));
 assert.equal(p.manifest.templateBytes,Buffer.byteLength(p.template));
 assert.equal(p.manifest.materialized,false);assert.equal(p.manifest.remotePublished,false);
 assert.equal(p.manifest.workerHash,artifact.workerHash);
 assert.equal(p.manifest.artifactSourceRevision,artifact.sourceRevision);
 assert.equal(p.manifest.artifactSourceTree,artifact.sourceTree);
 assert.equal(p.manifest.artifactKey,hash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,artifact.workerHash])));
 assert.equal(p.template.includes(seedBase),false);
 assert.equal(p.template.split(JSON.stringify(p.manifest.slot)).length-1,1);
 assert.equal(p.template.includes('__AFW_PRIVATE_CONFIRMATION_POLICY'),false);
});
test('publication privately replaces only the quoted slot and reports digests without authority',opt,async()=>{
 const p=await input(),out=await materialize(p);
 assert.equal(out.script,p.template.replace(JSON.stringify(p.manifest.slot),()=>JSON.stringify(p.policyJson)));
 assert.equal(out.operatorHash,hash(out.script));assert.equal(out.policyHash,hash(p.policyJson));
 assert.equal(out.templateHash,p.expectedTemplateHash);
 assert.equal(out.materialized,true);assert.equal(out.remotePublished,false);
 assert.equal(out.startAt,0);assert.equal(out.expiresAt,1);
 assert.equal(Object.hasOwn(out,'policyJson'),false);
 assert.equal(Object.hasOwn(out,'authorized'),false);
 assert.equal(Object.hasOwn(out,'planHash'),false);
 assert.equal(out.script.includes(p.manifest.slot),false);
});
test('manifest cannot substitute its own digest and changed template is rejected',opt,async()=>{
 const p=await input();
 await assert.rejects(materialize({...p,manifest:{...p.manifest,templateHash:'f'.repeat(64)}}),fixed);
 await assert.rejects(materialize({...p,template:p.template+'\n'}),fixed);
});
test('missing or duplicate reserved slot is rejected even with newly pinned hash',opt,async()=>{
 const p=await input();
 for(const changed of [p.template.replace(JSON.stringify(p.manifest.slot),'"absent"'),p.template+'\n// '+JSON.stringify(p.manifest.slot)]){
  await assert.rejects(materialize(resign(p,changed)),fixed);
 }
});
test('confirmation format, extra input/manifest fields and UTF8 manifest mismatch are denied',opt,async()=>{
 const p=await input();
 for(const m of [{...p.manifest,format:'afw-private-confirmation-template-v1'},{...p.manifest,templateBytes:p.manifest.templateBytes+1},{...p.manifest,privatePolicy:'sentinel'}]){
  await assert.rejects(materialize({...p,manifest:m}),fixed);
 }
 await assert.rejects(materialize({...p,credential:'sentinel'}),fixed);
});
test('policy rejects every foreign fixed pin and malformed base version',opt,async()=>{
 const p=await input(),original=JSON.parse(p.policyJson);
 for(const key of Object.keys(RELEASE_TARGET)){
  const policy=structuredClone(original);policy.pins[key]='foreign';
  await assert.rejects(materialize({...p,policyJson:JSON.stringify(policy)}),fixed);
 }
 for(const baseVersionId of ['latest','001','BAD','01234567-89AB-4cde-8fab-0123456789ab']){
  const policy=structuredClone(original);policy.pins.baseVersionId=baseVersionId;
  await assert.rejects(materialize({...p,policyJson:JSON.stringify(policy)}),fixed);
 }
});
test('policy rejects wrong operation, duration, extra keys and credential-shaped pins',opt,async()=>{
 const p=await input(),original=JSON.parse(p.policyJson);
 for(const mutate of [
  x=>{x.operation='confirm_named';},x=>{x.expiresAt=600001;},x=>{x.startAt=-1;},
  x=>{x.startAt=1.1;},x=>{x.expiresAt=0;},x=>{x.secret='PRIVATE_SENTINEL';},
  x=>{x.pins.token='PRIVATE_SENTINEL';},x=>{delete x.pins.kvId;}
 ]){
  const policy=structuredClone(original);mutate(policy);
  await assert.rejects(materialize({...p,policyJson:JSON.stringify(policy)}),fixed);
 }
});
test('canonical JSON is required and duplicate keys cannot enter private assembly',opt,async()=>{
 const p=await input();
 for(const policyJson of [' '+p.policyJson,p.policyJson.replace('{"operation":','{"operation":"publish","operation":')]){
  await assert.rejects(materialize({...p,policyJson}),fixed);
 }
});
test('UTF8 policy cap and total materialized script cap fail with sanitized error',opt,async()=>{
 const p=await input();
 await assert.rejects(materialize({...p,policyJson:JSON.stringify({sensitive:'PRIVATE_SENTINEL'+'🙂'.repeat(17000)})}),e=>fixed(e)&&!e.stack.includes('PRIVATE_SENTINEL'));
 await assert.rejects(materialize(resign(p,'x'.repeat(2097153))),fixed);
 const targetSize=2097120,changed=p.template+'\n/*'+'x'.repeat(targetSize-Buffer.byteLength(p.template)-5)+'*/';
 assert.ok(Buffer.byteLength(changed)<=2097152);
 await assert.rejects(materialize(resign(p,changed)),fixed);
});
test('input accessors are rejected without reading them',opt,async()=>{
 const p=await input();let reads=0;
 Object.defineProperty(p,'policyJson',{enumerable:true,get(){reads++;return 'PRIVATE_SENTINEL';}});
 await assert.rejects(materialize(p),fixed);assert.equal(reads,0);
});
test('builder refuses otherwise valid live publication seed',opt,async()=>{
 const b=bundle();b.policy.startAt=1000;b.policy.expiresAt=2000;
 assert.equal(validateReleaseOperatorBundle(b),true);
 await assert.rejects(builder.buildMcpPrivatePublicationTemplate(b),fixed);
});
test('caller mutation during compilation cannot replace captured public artifact',opt,async()=>{
 const b=bundle(),original=b.artifact.workerHash;
 const pending=builder.buildMcpPrivatePublicationTemplate(b);
 b.artifact.script+='\n// CALLER_PRIVATE_SENTINEL';b.artifact.workerHash=hash(b.artifact.script);
 const p=await pending;
 assert.equal(p.manifest.workerHash,original);assert.equal(p.template.includes('CALLER_PRIVATE_SENTINEL'),false);
});
test('caller mutation while hashing cannot change captured manifest or policy',opt,async()=>{
 const p=await input();p.manifest={...p.manifest};const captured=structuredClone(p);
 const pending=materialize(p);p.manifest.slot='MUTATED_SLOT';p.manifest.artifactKey='f'.repeat(64);p.policyJson='bad';
 const out=await pending;
 assert.equal(out.script,captured.template.replace(JSON.stringify(captured.manifest.slot),()=>JSON.stringify(captured.policyJson)));
 assert.equal(out.policyHash,hash(captured.policyJson));
});
test('dollar replacement tokens and Unicode in artifact remain literal compiler input',opt,async()=>{
 const b=bundle();
 b.artifact.script+='\n// quoted Unicode🙂 '+['$&','$'+String.fromCharCode(96),"$'","$$"].join(' ');
 b.artifact.workerHash=hash(b.artifact.script);
 const p=await builder.buildMcpPrivatePublicationTemplate(b);
 assert.equal(p.manifest.workerHash,b.artifact.workerHash);assert.equal(p.manifest.templateHash,hash(p.template));
 const out=await materialize({...p,policyJson:JSON.stringify(b.policy),expectedTemplateHash:p.manifest.templateHash});
 assert.equal(out.operatorHash,hash(out.script));
});
