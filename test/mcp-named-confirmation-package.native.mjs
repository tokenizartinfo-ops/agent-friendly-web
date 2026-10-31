import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {registerHooks} from 'node:module';
import {rehearseExactNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
import {buildMcpPrivateConfirmationTemplate,materializeMcpPrivateConfirmation} from '../scripts/build-mcp-release-operator.mjs';
import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';
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

test('exact historical bytes confirm through native Workflow and primary acceptance',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'confirmed'});
 assert.equal(r.httpStatus,404);
 assert.deepEqual(r.output,{status:'confirmed',mayRetry:false,operationalReadiness:false,receipt:{activationKey:r.activationKey,versionId:r.versionId,deploymentId:r.deploymentId}});
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(r.counters.providerReads,1);assert.equal(r.counters.apiReads,7);
 assert.ok(r.counters.largestReplyBytes>2097152,'actual multi-megabyte historical module must cross the native reader');
});
test('last-byte corruption of the real historical artifact never creates acceptance',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'tail-corrupt'});
 const {observation,...outcome}=r.output;assert.deepEqual(outcome,{status:'uncertain',mayRetry:false,operationalReadiness:false});
 assert.equal(observation.stage,'artifact_modules');assert.equal(observation.getIndex,1);assert.equal(observation.httpCode,200);
 assert.deepEqual(r.counts,{attempts:1,receipts:0,acceptances:0});
 assert.equal(r.counters.apiReads,1);assert.ok(r.counters.largestReplyBytes>2097152);
});
test('regional Workers incident blocks the exact package before API reads and journal admission',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'regional-incident'});
 const {providerCheck,...outcome}=r.output;
 assert.deepEqual(outcome,{status:'blocked',mayRetry:false,operationalReadiness:false});
 assert.deepEqual(Object.keys(providerCheck).sort(),['httpStatus','providerGate','reason','receivedBytes']);
 assert.equal(providerCheck.providerGate,'unknown');assert.equal(providerCheck.reason,'active_related_incident');assert.equal(providerCheck.httpStatus,200);
 assert.ok(Number.isSafeInteger(providerCheck.receivedBytes)&&providerCheck.receivedBytes>0&&providerCheck.receivedBytes<=262145);
 assert.deepEqual(r.counts,{attempts:0,receipts:0,acceptances:0});
 assert.deepEqual(r.counters,{providerReads:1,apiReads:0,largestReplyBytes:0});
});

test('canonical REST string confirms exact frozen bytes through native Workflow',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'confirmed',payloadMode:'string'});
 assert.equal(r.output.status,'confirmed');
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(r.counters.providerReads,1);assert.equal(r.counters.apiReads,7);
});

for(const [mode,stage,getIndex,httpCode] of [['metadata-reject','activation_metadata',3,403],['second-active','deployment_second',7,200]]){
 test('named Workflow uncertain reports only last reached point for '+mode,available,async()=>{
  const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode,payloadMode:'string'});
  assert.equal(r.output.status,'uncertain');assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
  const observation=r.output.observation;
  assert.ok(observation,'uncertain named Workflow must expose a sanitized last-point observation');
  assert.deepEqual(Object.keys(observation).sort(),['durationMs','getIndex','httpCode','stage']);
  assert.deepEqual({...observation,durationMs:0},{stage,getIndex,httpCode,durationMs:0});
  assert.ok(Number.isSafeInteger(observation.durationMs)&&observation.durationMs>=0&&observation.durationMs<=70000);
  assert.deepEqual(r.counts,{attempts:1,receipts:0,acceptances:0});
  assert.equal(r.counters.providerReads,1);assert.equal(r.counters.apiReads,getIndex);assert.equal(r.httpStatus,404);
  const text=JSON.stringify(r.output);for(const secret of ['synthetic_sensitive_value','synthetic_read_credential','Authorization','https://',r.activationKey,r.versionId,r.deploymentId])assert.equal(text.includes(secret),false);
 });
}

test('named operator RPC failure remains generic without Workflow observation',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'metadata-reject',invocation:'rpc'});
 assert.deepEqual(r.output,{error:'Release operator unavailable'});assert.equal(r.httpStatus,404);
 assert.deepEqual(r.counts,{attempts:1,receipts:0,acceptances:0});assert.equal(r.counters.providerReads,0);assert.equal(r.counters.apiReads,3);
});

const publicTemplate=()=>publicTemplate.promise??=buildMcpPrivateConfirmationTemplate({artifact,policy:inertNamedConfirmationPolicy(artifact)});
async function materializedFixture(input){
 validateReleaseOperatorBundle(input);
 const bundle=JSON.parse(JSON.stringify(input));
 validateReleaseOperatorBundle(bundle);
 const {template,manifest}=await publicTemplate();
 const output=await materializeMcpPrivateConfirmation({template,manifest,policyJson:JSON.stringify(bundle.policy),expectedTemplateHash:manifest.templateHash});
 return {...output,planHash:hash(JSON.stringify(bundle))};
}

test('materialized public template remains closed and the expired synthetic Workflow performs no network',async()=>{
 const built=await materializedFixture({artifact,policy:inertNamedConfirmationPolicy(artifact)});let outbound=0;
 assert.equal(built.planHash,hash(JSON.stringify({artifact,policy:inertNamedConfirmationPolicy(artifact)})));
 assert.notEqual(built.planHash,built.policyHash,'bundle identity must not be the policy digest');
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'operator',modules:true,script:built.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true'},workflows:{FLOW:{name:'afw-inert-private-template',className:'AfwReleaseWorkflow'}},outboundService(){outbound++;throw Error('Inert materialization must not use the network');}}]}));
 try{
  assert.equal((await (await mf.getWorker('operator')).fetch('https://synthetic.invalid/')).status,404);
  const {FLOW}=await mf.getBindings('operator'),instance=await FLOW.create({id:'afw-release-'+built.planHash,params:{planHash:built.planHash}});
  const end=Date.now()+12000;let state;
  do{state=await instance.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);
  assert.equal(state.status,'complete');assert.deepEqual(state.output,{status:'blocked',mayRetry:false,operationalReadiness:false});assert.equal(outbound,0);
 }finally{await mf.dispose();}
});
test('private assembly of exact historical bytes confirms through the native Workflow and primary acceptance',async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:materializedFixture,mode:'confirmed',payloadMode:'string'});
 assert.equal(r.httpStatus,404);
 assert.deepEqual(r.output,{status:'confirmed',mayRetry:false,operationalReadiness:false,receipt:{activationKey:r.activationKey,versionId:r.versionId,deploymentId:r.deploymentId}});
 assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});assert.equal(r.counters.providerReads,1);assert.equal(r.counters.apiReads,7);
 assert.ok(r.counters.largestReplyBytes>2097152);
});
test('private assembly preserves uncertain outcome and no acceptance after a second active deployment',async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:materializedFixture,mode:'second-active',payloadMode:'string'});
 assert.equal(r.httpStatus,404);assert.equal(r.output.status,'uncertain');assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
 assert.deepEqual(r.counts,{attempts:1,receipts:0,acceptances:0});assert.equal(r.counters.apiReads,7);
 assert.equal(r.output.observation.stage,'deployment_second');
});

test('actual historical template compiler boundary records only public sizes and slot counts',async()=>{
 const target=new URL('../scripts/build-mcp-release-operator.mjs?ci-template-boundary=1',import.meta.url).href;
 const wrapper=new URL('./fixtures/private-template-compile-observation.mjs',import.meta.url).href;
 const key=Symbol.for('afw.ci.private-template.compile-observation');let sample;
 globalThis[key]=value=>{sample=value;};
 const hooks=registerHooks({resolve(specifier,context,nextResolve){
  if(context.parentURL===target&&specifier==='esbuild')return {url:wrapper,shortCircuit:true};
  return nextResolve(specifier,context);
 }});
 try{
  const {buildMcpPrivateConfirmationTemplate:build}=await import(target);
  let result;
  try{result=await build({artifact,policy:inertNamedConfirmationPolicy(artifact)});}catch(error){assert.equal(error.message,'Private confirmation preparation unavailable');}
  assert.ok(sample,'must reach the actual compiler');
  console.log('AFW public template compiler boundary '+JSON.stringify(sample));
  assert.equal(sample.rawSlots,1);assert.equal(sample.doubleQuotedSlots,1);assert.ok(sample.bytes<=2097152);
  assert.ok(result);
 }finally{hooks.deregister();delete globalThis[key];}
});


test('exact frozen module confirms and reserves through the explicitly opted-in native Workflow',available,async()=>{
 const r=await rehearseExactNamedConfirmation({artifact,build:buildMcpNamedConfirmation,mode:'confirmed',reserve:'true'});
 assert.equal(r.output.status,'confirmed',JSON.stringify({output:r.output,counts:r.counts,counters:r.counters,reservationCount:r.reservationCount}));
 assert.equal(r.httpStatus,404);assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,{attempts:1,receipts:1,acceptances:1});
 assert.equal(r.output.reservation.mayBoot,false);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);assert.equal(r.counters.retirementReads,2);
});

test('real frozen builder preserves the canonical nonsecret prepared-save reference',available,async()=>{
 const policy=inertNamedConfirmationPolicy(artifact),key='78194191-9aa9-4c32-a77a-123456789abc';policy.observation.configuration.bindings.push({name:'AFW_DOSSIER_OWN_SAVE_KEY',type:'plain_text',text:key});policy.plan.configurationHash=activationConfigurationHash(policy.observation.configuration);
 const built=await buildMcpNamedConfirmation({artifact,policy});assert.equal(built.workerHash,artifact.workerHash);assert.equal(built.artifactSourceRevision,artifact.sourceRevision);assert.equal(built.inertPreparation,true);assert.equal(built.startAt,0);assert.equal(built.expiresAt,1);assert.equal(built.remotePublished,false);
});

test('exact historical artifact builds the separate current QA context within its own cap',async()=>{
 const {buildPrivateQaNamedContext}=await import('../scripts/build-private-qa-named-context.mjs');
 const {execFileSync}=await import('node:child_process'),revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 const built=await buildPrivateQaNamedContext({cwd:process.cwd(),sourceRevision:revision,artifact}),m=built.manifest,pins=JSON.parse(readFileSync('scripts/mcp-confirmation-frozen-artifact.json','utf8'));
 assert.equal(m.sourceRevision,revision);assert.equal(m.artifactSourceRevision,pins.sourceRevision);assert.equal(m.artifactWorkerHash,pins.workerHash);assert.equal(m.artifactWorkerBytes,pins.workerBytes);assert.equal(m.module.sha256,hash(built.script));assert.equal(m.module.bytes,Buffer.byteLength(built.script));assert.equal(m.module.maximumBytes,3145728);assert.ok(m.module.bytes<=3145728);assert.ok(m.module.bytes>pins.workerBytes);assert.equal(m.rollback.sha256,hash(built.rollbackScript));assert.ok(m.rollback.bytes<=1048576);assert.equal(m.containsLatePolicy,false);assert.equal(m.containsGrant,false);assert.equal(m.containsPacket,false);assert.equal(m.remotePublished,false);assert.equal(m.invoked,false);assert.equal(m.operationalReadiness,false);
 let outbound=0;const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],outboundService(){outbound++;throw Error('fixed context build cannot request outbound');}}));
 try{assert.equal((await mf.dispatchFetch('https://fixture.invalid/')).status,404);assert.equal(outbound,0);}finally{await mf.dispose();}
 console.log('FIXED_QA_CONTEXT_MEASURED',JSON.stringify(m));
});

for(const path of ['wrangler.independent-closure-qa.jsonc','wrangler.independent-closure-qa.rollback.jsonc'])test('fixed QA context detects config byte drift across the final real compiler: '+path,async()=>{
 const {readFile,writeFile}=await import('node:fs/promises'),{execFileSync}=await import('node:child_process');
 const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),before=await readFile(path),key=Symbol.for('afw.ci.qa-fixed-context.compile-drift');
 const target=new URL('../scripts/build-private-qa-named-context.mjs?ci-config-drift='+encodeURIComponent(path),import.meta.url).href,wrapper=new URL('./fixtures/qa-fixed-context-compile-drift.mjs',import.meta.url).href;let crossed=0;
 globalThis[key]=async()=>{crossed++;await writeFile(path,Buffer.concat([before,Buffer.from('\n')]));};
 const hooks=registerHooks({resolve(specifier,context,nextResolve){if(context.parentURL===target&&specifier==='esbuild')return{url:wrapper,shortCircuit:true};return nextResolve(specifier,context);}});
 try{
 const {buildPrivateQaNamedContext}=await import(target);
 await assert.rejects(()=>buildPrivateQaNamedContext({cwd:process.cwd(),sourceRevision:revision,artifact}),{message:'Fixed QA artifact context build unavailable'});
 assert.equal(crossed,1,'must cross exactly the final actual compiler, not the preceding closed builds');
 }finally{hooks.deregister();delete globalThis[key];await writeFile(path,before);assert.deepEqual(await readFile(path),before);}
});
