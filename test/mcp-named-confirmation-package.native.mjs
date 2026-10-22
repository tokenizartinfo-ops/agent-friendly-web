import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
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
   p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);
  }
  await assert.rejects(buildMcpNamedConfirmation({artifact,policy:p}),e=>e.message==='Named confirmation package unavailable');
 }
});

test('a retired real window cannot be repackaged as current authority',available,async()=>{
 const p=inertNamedConfirmationPolicy(artifact),window={startAt:2,expiresAt:3};
 Object.assign(p,window);Object.assign(p.plan,window);
 for(const name of ['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_SUCCESSOR_POLICY']){
  const binding=p.observation.configuration.bindings.find(b=>b.name===name),value=JSON.parse(binding.text);
  Object.assign(name==='AFW_DOSSIER_SUCCESSOR_POLICY'?value.candidate:value,window);binding.text=JSON.stringify(value);
 }
 p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);
 await assert.rejects(buildMcpNamedConfirmation({artifact,policy:p}),/Named confirmation package unavailable/);
});
