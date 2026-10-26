import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import * as builder from '../scripts/build-mcp-release-operator.mjs';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';

const hash=s=>createHash('sha256').update(s).digest('hex');
const script='export default {fetch(){return new Response("synthetic")}};';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
const bundle=()=>({artifact:{...artifact},policy:inertNamedConfirmationPolicy(artifact)});
let compiled;
const prepared=()=>compiled??=(builder.buildMcpPrivateConfirmationTemplate(bundle()));
const input=async()=>{const p=await prepared();return {...p,policyJson:JSON.stringify(bundle().policy),expectedTemplateHash:p.manifest.templateHash};};
const fixedError=e=>e?.message==='Private confirmation preparation unavailable'&&!Object.hasOwn(e,'cause');
const materialize=x=>builder.materializeMcpPrivateConfirmation(x);
const resign=(p,template)=>({...p,template,expectedTemplateHash:hash(template),manifest:{...p.manifest,templateHash:hash(template),templateBytes:Buffer.byteLength(template)}});

test('public template omits every supplied consent reference and is not materialized',async()=>{
 const p=await prepared();
 assert.equal(p.manifest.format,'afw-private-confirmation-template-v1');
 assert.equal(p.manifest.templateHash,hash(p.template));
 assert.equal(p.manifest.templateBytes,Buffer.byteLength(p.template));
 assert.equal(p.manifest.materialized,false);
 assert.equal(p.manifest.remotePublished,false);
 assert.equal(p.manifest.workerHash,artifact.workerHash);
 assert.equal(p.manifest.artifactSourceRevision,artifact.sourceRevision);
 assert.equal(p.manifest.artifactSourceTree,artifact.sourceTree);
 assert.equal(p.template.split(JSON.stringify(p.manifest.slot)).length-1,1);
 assert.equal(p.template.includes('ci-only-inert'),false);
 assert.equal(JSON.stringify(p.manifest).includes('ci-synthetic'),false);
});

test('private materialization changes only the reserved literal and records independent digests',async()=>{
 const p=await input(),out=await materialize(p);
 const expected=p.template.replace(JSON.stringify(p.manifest.slot),JSON.stringify(p.policyJson));
 assert.equal(out.script,expected);
 assert.equal(out.operatorHash,hash(expected));
 assert.equal(out.policyHash,hash(p.policyJson));
 assert.equal(Object.hasOwn(out,'planHash'),false);
 assert.equal(out.templateHash,p.expectedTemplateHash);
 assert.equal(out.remotePublished,false);
 assert.equal(out.materialized,true);
 assert.equal(out.script.includes(p.manifest.slot),false);
 const metadata={...out};delete metadata.script;
 assert.equal(JSON.stringify(metadata).includes('ci-only-inert'),false);
 assert.equal(JSON.stringify(metadata).includes('ci-synthetic'),false);
 assert.equal(Object.hasOwn(out,'policyJson'),false);
});

test('quoted Unicode and code-shaped content remains JSON data',async()=>{
 const p=await input(),policy=JSON.parse(p.policyJson);
 const binding=policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');
 const events=JSON.parse(binding.text);
 events.subject="quoted'\\\"\\\\\u2028🙂');globalThis.PWNED=true;//";
 binding.text=JSON.stringify(events);
 p.policyJson=JSON.stringify(policy);
 const out=await materialize(p),needle=JSON.stringify(p.policyJson);
 const i=out.script.indexOf(needle);
 assert.ok(i>0);
 assert.match(out.script.slice(Math.max(0,i-20),i),/JSON\.parse\(\s*$/);
 const sandbox={};
 const decoded=runInNewContext('JSON.parse('+out.script.slice(i,i+needle.length)+')',sandbox);
 assert.equal(JSON.stringify(decoded),p.policyJson);
 assert.equal(sandbox.PWNED,undefined);
});

test('untrusted manifest cannot substitute its own template hash for the separate pin',async()=>{
 const p=await input();
 p.manifest={...p.manifest,templateHash:'f'.repeat(64)};
 await assert.rejects(materialize(p),fixedError);
});

test('a changed template is rejected even with the original manifest',async()=>{
 const p=await input();p.template+='\n';
 await assert.rejects(materialize(p),fixedError);
});

test('a duplicate reserved literal is rejected independently of its valid digest',async()=>{
 const p=await input();
 const changed=p.template+'\n// '+JSON.stringify(p.manifest.slot);
 await assert.rejects(materialize(resign(p,changed)),fixedError);
});

test('a missing reserved literal is rejected independently of its valid digest',async()=>{
 const p=await input(),changed=p.template.replace(JSON.stringify(p.manifest.slot),'"absent"');
 await assert.rejects(materialize(resign(p,changed)),fixedError);
});

test('byte lengths use UTF8 and must match the trusted manifest',async()=>{
 const p=await input();p.manifest={...p.manifest,templateBytes:p.manifest.templateBytes+1};
 await assert.rejects(materialize(p),fixedError);
});

test('policy UTF8 bytes over65536 are rejected without including the policy in the error',async()=>{
 const p=await input();p.policyJson=JSON.stringify({sensitive:'SENSITIVE_PRIVATE_SENTINEL'+'🙂'.repeat(17000)});
 await assert.rejects(materialize(p),e=>fixedError(e)&&!e.stack.includes('SENSITIVE_PRIVATE_SENTINEL'));
});

test('template bytes over2097152 are rejected before substitution',async()=>{
 const p=await input(),changed='x'.repeat(2097153);
 await assert.rejects(materialize(resign(p,changed)),fixedError);
});

test('expanded operator bytes over2097152 are rejected',async()=>{
 const p=await input();
 const changed=p.template+'\n/*'+'x'.repeat(2097100-Buffer.byteLength(p.template))+'*/';
 assert.ok(Buffer.byteLength(changed)<=2097152);
 await assert.rejects(materialize(resign(p,changed)),fixedError);
});

test('noncanonical and duplicate-key JSON are rejected',async()=>{
 const p=await input();
 for(const text of [' '+p.policyJson,p.policyJson.replace('{"operation":','{"operation":"confirm_named","operation":')]){
  await assert.rejects(materialize({...p,policyJson:text}),fixedError);
 }
});

test('wrong operation, invalid duration and secret value are rejected',async()=>{
 const p=await input(),original=JSON.parse(p.policyJson);
 for(const mutate of [
  x=>{x.operation='publish';},
  x=>{x.expiresAt=x.startAt+600001;},
  x=>{x.observation.configuration.bindings.push({name:'AFW_RELEASE_READ_TOKEN',type:'secret_text',text:'SENSITIVE_PRIVATE_SENTINEL'});}
 ]){
  const policy=structuredClone(original);mutate(policy);
  await assert.rejects(materialize({...p,policyJson:JSON.stringify(policy)}),fixedError);
 }
});

test('an otherwise valid live-window bundle cannot enter the public template builder',async()=>{
 const b=bundle(),p=b.policy,window={startAt:1000,expiresAt:2000};
 Object.assign(p,window);Object.assign(p.plan,window);
 const bindings=p.observation.configuration.bindings;
 const ev=bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY'),events=JSON.parse(ev.text);
 Object.assign(events,window);ev.text=JSON.stringify(events);
 const sb=bindings.find(x=>x.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(sb.text);
 Object.assign(manifest.candidate,window);sb.text=JSON.stringify(manifest);
 p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);
 assert.equal(validateReleaseOperatorBundle(b),true);
 await assert.rejects(builder.buildMcpPrivateConfirmationTemplate(b),fixedError);
});


test('caller mutation during actual compilation cannot replace the captured public artifact',async()=>{
 const b=bundle(),before=JSON.stringify(b),originalWorkerHash=b.artifact.workerHash;
 const pending=builder.buildMcpPrivateConfirmationTemplate(b);
 b.artifact.script+='\n// CALLER_MUTATION_PRIVATE_SENTINEL';
 b.artifact.workerHash=hash(b.artifact.script);
 const p=await pending;
 assert.notEqual(JSON.stringify(b),before,'caller mutation must actually occur');
 assert.equal(p.manifest.workerHash,originalWorkerHash);
 assert.equal(p.template.includes('CALLER_MUTATION_PRIVATE_SENTINEL'),false);
});


test('caller mutation while hashing cannot change the captured materialization manifest',async()=>{
 const p=await input();
 p.manifest={...p.manifest};
 const captured={...p,manifest:{...p.manifest}};
 const pending=materialize(p);
 p.manifest.slot='CALLER_MUTATION_SLOT';
 p.manifest.artifactKey='f'.repeat(64);
 p.policyJson='not JSON';
 const out=await pending;
 assert.equal(out.script,captured.template.replace(JSON.stringify(captured.manifest.slot),JSON.stringify(captured.policyJson)));
 assert.equal(out.policyHash,hash(captured.policyJson));
});

test('dollar replacement metacharacters in the public artifact remain literal compiler input',async()=>{
 const b=bundle();
 b.artifact.script+='\n// dollar_markers: '+['$&','$'+String.fromCharCode(96),"$'","$$"].join(' ');
 b.artifact.workerHash=hash(b.artifact.script);
 b.policy=inertNamedConfirmationPolicy(b.artifact);
 assert.equal(validateReleaseOperatorBundle(b),true);
 const p=await builder.buildMcpPrivateConfirmationTemplate(b);
 assert.equal(p.manifest.workerHash,b.artifact.workerHash);
 assert.equal(p.manifest.templateHash,hash(p.template));
 assert.equal(p.template.split(JSON.stringify(p.manifest.slot)).length-1,1);
});
