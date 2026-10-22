import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {registerHooks} from 'node:module';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
// This file runs only in the package Workflow, after an exact historical rebuild.
const artifact=JSON.parse(readFileSync(process.env.AFW_FROZEN_ARTIFACT_PATH,'utf8'));
let buildMcpNamedConfirmation;
try{({buildMcpNamedConfirmation}=await import('../scripts/build-mcp-named-confirmation.mjs'));}catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
test('named confirmation package exposes its exact-artifact builder',()=>assert.equal(typeof buildMcpNamedConfirmation,'function'));
const available={skip:typeof buildMcpNamedConfirmation!=='function'};
const hash=s=>createHash('sha256').update(s).digest('hex');
test('real frozen bytes compile a closed HTTP module and cannot invoke the inert Workflow',available,async()=>{
 const policy=inertNamedConfirmationPolicy(artifact),built=await buildMcpNamedConfirmation({artifact,policy});let outbound=0;
 assert.equal(built.workerHash,artifact.workerHash);assert.equal(built.artifactSourceRevision,artifact.sourceRevision);assert.equal(built.artifactSourceTree,artifact.sourceTree);assert.equal(built.artifactKey,policy.plan.artifactKey);
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'operator',modules:true,script:built.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true'},workflows:{FLOW:{name:'afw-inert-confirmation-package',className:'AfwReleaseWorkflow'}},outboundService(){outbound++;throw Error('Inert package must not use the network');}}]}));
 try{
  assert.equal((await (await mf.getWorker('operator')).fetch('https://synthetic.invalid/')).status,404);
  const {FLOW}=await mf.getBindings('operator'),instance=await FLOW.create({id:'afw-release-'+built.planHash,params:{planHash:built.planHash}});
  const end=Date.now()+12000;let s;
  do{s=await instance.status();if(s.status==='complete')break;if(['errored','terminated'].includes(s.status))assert.fail('Inert Workflow failed');await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(s.status,'complete');assert.deepEqual(s.output,{status:'blocked',mayRetry:false,operationalReadiness:false});assert.equal(outbound,0);
 }finally{await mf.dispose();}
});
test('rewritten bytes, foreign provenance and a changed publication key never package',available,async()=>{
 for(const mode of ['bytes','sourceRevision','sourceTree','programHash','sourceCheck','artifactKey']){
  const a={...artifact},p=inertNamedConfirmationPolicy(a);
  if(mode==='bytes'){a.script+='\n';a.workerHash=hash(a.script);}
  else if(mode==='artifactKey')p.plan.artifactKey='0'.repeat(64);
  else a[mode]=mode==='sourceCheck'?'asserted-without-git':'0'.repeat(mode==='sourceRevision'||mode==='sourceTree'?40:64);
  await assert.rejects(buildMcpNamedConfirmation({artifact:a,policy:p}),/Named confirmation package unavailable/);
 }
});
test('publication, manual identity and secret values are rejected without echoing input',available,async()=>{
 for(const mode of ['publish','confirm','scopeHash','secret','plaintext-secret','extra']){
  const p=inertNamedConfirmationPolicy(artifact);
  if(mode==='publish'||mode==='confirm')p.operation=mode;
  if(mode==='scopeHash')p.plan.scopeHash='f'.repeat(64);
  if(mode==='extra')p.credential='synthetic_sensitive_value';
  if(mode==='secret'||mode==='plaintext-secret'){
   p.observation.configuration.bindings.push({name:'AFW_DOSSIER_PROVIDER_READ_TOKEN',type:mode==='secret'?'secret_text':'plain_text',text:'synthetic_sensitive_value'});
   if(mode==='plaintext-secret')p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);
  }
  await assert.rejects(buildMcpNamedConfirmation({artifact,policy:p}),e=>e.message==='Named confirmation package unavailable');
 }
});


function withWindow(p,window){
 Object.assign(p,window);Object.assign(p.plan,window);
 for(const name of ['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY']){
  const binding=p.observation.configuration.bindings.find(b=>b.name===name),value=JSON.parse(binding.text);
  Object.assign(name==='AFW_DOSSIER_SUCCESSOR_POLICY'?value.candidate:value,window);binding.text=JSON.stringify(value);
 }
 p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);return p;
}
test('a current real policy is packaged without changing its original window',available,async()=>{
 const p=withWindow(inertNamedConfirmationPolicy(artifact),{startAt:Date.now()-1000,expiresAt:Date.now()+120000}),before=JSON.stringify(p);
 const built=await buildMcpNamedConfirmation({artifact,policy:p});
 assert.equal(JSON.stringify(p),before);assert.equal(built.startAt,p.startAt);assert.equal(built.expiresAt,p.expiresAt);assert.equal(built.inertPreparation,false);
 assert.equal(built.planHash,hash(JSON.stringify({artifact,policy:p})));
});

test('a retired real window cannot be repackaged as current authority',available,async()=>{
 const p=withWindow(inertNamedConfirmationPolicy(artifact),{startAt:2,expiresAt:3});
 await assert.rejects(buildMcpNamedConfirmation({artifact,policy:p}),/Named confirmation package unavailable/);
});

const faultKey=Symbol.for('afw.ci.named-confirmation.compile-fault');
let importSequence=0;
async function duringActualCompilation(fault,run){
 const target=new URL('../scripts/build-mcp-named-confirmation.mjs?ci-fault='+ ++importSequence,import.meta.url).href;
 const wrapper=new URL('./fixtures/named-confirmation-compile-fault.mjs',import.meta.url).href;
 const calls={before:0,after:0};
 globalThis[faultKey]=(stage,bundle)=>{calls[stage]++;fault(stage,bundle);};
 const hooks=registerHooks({resolve(specifier,context,nextResolve){
  if(context.parentURL===target&&specifier==='./build-mcp-release-operator.mjs')return {url:wrapper,shortCircuit:true};
  return nextResolve(specifier,context);
 }});
 try{
  const {buildMcpNamedConfirmation:build}=await import(target);
  await run(build);
  assert.deepEqual(calls,{before:1,after:1},'fault must cross the real compiler await');
 }finally{hooks.deregister();delete globalThis[faultKey];}
}
for(const fault of ['wall-expiry','wall-rewind','mono-expiry','mono-rewind']){
 test('original authority fails closed when '+fault+' occurs during real compilation',available,async()=>{
  const wall=Date.now(),mono=1000,expiresAt=wall+120000;
  const p=withWindow(inertNamedConfirmationPolicy(artifact),{startAt:wall-1000,expiresAt});
  const before=JSON.stringify(p),originalNow=Date.now,originalMono=Object.getOwnPropertyDescriptor(performance,'now');
  let wallNow=wall,monoNow=mono;
  Date.now=()=>wallNow;
  Object.defineProperty(performance,'now',{configurable:true,value:()=>monoNow});
  try{
   await duringActualCompilation(stage=>{
    if(stage!=='after')return;
    if(fault==='wall-expiry')wallNow=expiresAt;
    if(fault==='wall-rewind')wallNow=wall-1;
    if(fault==='mono-expiry')monoNow=mono+(expiresAt-wall)+1;
    if(fault==='mono-rewind')monoNow=mono-1;
   },async build=>await assert.rejects(build({artifact,policy:p}),e=>e.message==='Named confirmation package unavailable'));
   assert.equal(JSON.stringify(p),before);
  }finally{
   Date.now=originalNow;
   if(originalMono)Object.defineProperty(performance,'now',originalMono);else delete performance.now;
  }
 });
}
test('caller mutation during real compilation cannot change the captured authority or bytes',available,async()=>{
 const p=withWindow(inertNamedConfirmationPolicy(artifact),{startAt:Date.now()-1000,expiresAt:Date.now()+120000});
 const input={artifact:{...artifact},policy:p},captured=JSON.stringify(input),originalExpiry=p.expiresAt;
 let built;
 await duringActualCompilation((stage,snapshot)=>{
  if(stage!=='before')return;
  assert.notEqual(snapshot,input);assert.notEqual(snapshot.policy,input.policy);assert.notEqual(snapshot.artifact,input.artifact);
  input.policy.expiresAt+=600000;input.policy.plan.expiresAt+=600000;
  input.policy.observation.configuration.bindings.push({name:'CI_MUTATED_AUTHORITY',type:'plain_text',text:'caller_mutation_must_not_compile'});
  input.artifact.script+='\n// caller_mutation_must_not_compile';
 },async build=>{built=await build(input);});
 assert.equal(built.planHash,hash(captured));assert.equal(built.expiresAt,originalExpiry);
 assert.equal(built.workerHash,artifact.workerHash);assert.ok(!built.script.includes('caller_mutation_must_not_compile'));
 assert.notEqual(JSON.stringify(input),captured,'caller mutation actually occurred');
});
