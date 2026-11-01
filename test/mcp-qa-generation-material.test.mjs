import test from 'node:test';
import assert from 'node:assert/strict';
import {generationPreparationFixture} from './fixtures/qa-generation-preparation.mjs';
import {packetHash as hash} from './fixtures/qa-named-data-packet.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../lib/mcp-successor-canary-restorer.mjs';
import {materializePrivateQaLegacyPredecessor} from '../lib/mcp-qa-legacy-predecessor.mjs';
import {assemblePrivateQaNamedPacket} from '../lib/mcp-qa-named-packet-assembly.mjs';
import {createPrivateQaGenerationPreparation} from '../lib/mcp-qa-generation-preparation.mjs';
const api=await import('../lib/mcp-qa-generation-material.mjs').catch(()=>({}));
const options=x=>({namedBundleHash:x.namedBundleHash,draftJson:x.draftJson,legacySnapshot:{control:x.old.control,journals:x.old.journals},artifact:x.p.artifact,receipt:x.p.receipt,historicalContext:x.old.historicalContext,namespace:x.p.namespace,at:x.f.now()});
function assemble(o){assert.equal(typeof api.assemblePrivateQaGenerationDraftMaterial,'function','private material core export required');return api.assemblePrivateQaGenerationDraftMaterial(o);}
const denied=['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'];
const keys=['purpose','packetJson','capsuleJson','namedBundleHash','generationPlanHash','packetHash','original','historicalScope','historicalCandidate','window','retainedUncertainty',...denied];
const equalPrivate=(a,b)=>assert.equal(JSON.stringify(a)===JSON.stringify(b),true,'private values must match');
function reject(o){assert.throws(()=>assemble(o),{message:'Private QA generation material unavailable'});}
function recommit(x){x.draftJson=JSON.stringify(x.draft);x.namedBundleHash=hash(JSON.stringify({artifact:x.p.artifact,policy:JSON.parse(x.draft.namedPolicy)}));}
test('accepted composite validators qualify the fixture before core extraction',()=>{
 const x=generationPreparationFixture(),m=materializePrivateQaLegacyPredecessor({...x.old.options,at:x.f.now()}),a=assemblePrivateQaNamedPacket({packetJson:x.packetJson,expectedCapsule:x.capsuleJson,artifact:x.p.artifact,receipt:x.p.receipt,namespace:x.p.namespace});
 equalPrivate(m.predecessor,JSON.parse(x.capsuleJson).predecessor);assert.equal(a.namedBundleHash,x.namedBundleHash);
});
test('synchronous private material preserves canonical bytes and distinct commitment domains',async()=>{
 const x=generationPreparationFixture(),o=options(x),before=JSON.stringify(o),r=assemble(o);
 assert.equal(r instanceof Promise,false);assert.deepEqual(Object.keys(r),keys);assert.equal(r.purpose,'afw.qa-generation-draft-material.v1');
 assert.equal(r.packetJson===x.packetJson,true);assert.equal(r.capsuleJson===x.capsuleJson,true);
 assert.equal(r.namedBundleHash,x.namedBundleHash);assert.equal(r.generationPlanHash,hash('afw.qa-generation-plan.v2\n'+x.capsuleJson));assert.notEqual(r.namedBundleHash,r.generationPlanHash);assert.equal(r.packetHash,hash(x.packetJson));
 equalPrivate(r.original,x.manifest.original);equalPrivate(r.historicalCandidate,x.old.closure.candidate);equalPrivate(r.historicalScope,Object.fromEntries(['grantId','subject','projectId','clientId','resource'].map(k=>[k,x.old.event[k]])));equalPrivate(r.window,{startAt:x.p.policy.startAt,expiresAt:x.p.policy.expiresAt});
 assert.equal(r.retainedUncertainty,true);for(const k of denied)assert.equal(r[k],false);
 assert.equal(Object.isFrozen(r),true);assert.equal(JSON.stringify(o)===before,true);assert.equal(x.calls.length,0);assert.equal(x.f.storage.transactions,0);
 const prepared=await createPrivateQaGenerationPreparation(x.options).prepare(x.namedBundleHash,new AbortController().signal);
 for(const k of ['packetJson','capsuleJson','namedBundleHash','generationPlanHash','packetHash','retainedUncertainty',...denied])assert.equal(prepared[k]===r[k],true,'host must preserve private result semantics');
});
test('result owns frozen literal fields without freezing or retaining caller data or namespace',()=>{
 const x=generationPreparationFixture(),o=options(x),r=assemble(o);
 for(const k of ['original','historicalScope','historicalCandidate','window']){assert.equal(Object.isFrozen(r[k]),true);assert.throws(()=>{r[k].extra=true;});}
 assert.notEqual(r.historicalCandidate,x.old.closure.candidate);assert.notEqual(r.historicalScope,x.old.event);assert.notEqual(r.original,x.manifest.original);
 assert.equal(Object.hasOwn(r,'namespace'),false);assert.equal(Object.isFrozen(o.namespace),false);assert.equal(Object.isFrozen(o.artifact),false);assert.equal(Object.isFrozen(o.receipt),false);assert.equal(Object.isFrozen(o.legacySnapshot),false);assert.equal(Object.isFrozen(o.legacySnapshot.control),false);assert.equal(Object.isFrozen(o.legacySnapshot.journals.preparedDispatch),false);assert.equal(Object.isFrozen(o.historicalContext.journalHashes),false);
 const retained=JSON.stringify(r);o.legacySnapshot.control.policy='changed';o.legacySnapshot.journals.preparedDispatch.issuedAt++;o.historicalContext.journalHashes.preparedDispatch='0'.repeat(64);x.manifest.original.containerId='0'.repeat(64);assert.equal(JSON.stringify(r)===retained,true);
});
for(const mode of ['generation-key','random-key','draft-whitespace','policy-whitespace','event-alias','artifact-order','artifact-bytes','original-identity'])test('material rejects independently corrupted '+mode,()=>{
 const x=generationPreparationFixture();
 if(mode==='generation-key')x.namedBundleHash=hash('afw.qa-generation-plan.v2\n'+x.capsuleJson);
 if(mode==='random-key')x.namedBundleHash='0'.repeat(64);
 if(mode==='draft-whitespace')x.draftJson+='\n';
 if(mode==='policy-whitespace'){x.draft.namedPolicy+=' ';x.draftJson=JSON.stringify(x.draft);}
 if(mode==='event-alias'){x.draft.eventId=JSON.parse(x.old.options.dispatchPolicyJson).eventId;recommit(x);}
 if(mode==='artifact-order')x.p.artifact=Object.fromEntries(Object.entries(x.p.artifact).reverse());
 if(mode==='artifact-bytes')x.p.artifact.script+=' ';
 if(mode==='original-identity'){
  const policy=JSON.parse(x.draft.namedPolicy),binding=policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(binding.text);
  manifest.original.programHash='a'.repeat(64);binding.text=JSON.stringify(manifest);policy.plan.configurationHash=activationConfigurationHash(policy.observation.configuration);x.p.closure.live.configurationHash=restorationConfigurationHash(policy.observation.configuration);x.draft.namedPolicy=JSON.stringify(policy);x.draft.closurePolicy=JSON.stringify(x.p.closure);recommit(x);
  // Actual packet validates the changed original; only historical correlation denies it.
  const capsule={...JSON.parse(x.capsuleJson),bundleHash:x.namedBundleHash,closurePolicyHash:hash(x.draft.closurePolicy)},capsuleJson=JSON.stringify(capsule),packetJson=JSON.stringify({purpose:'afw.qa-named-data-packet.v1',generationCapsule:capsuleJson,namedPolicy:x.draft.namedPolicy,closurePolicy:x.draft.closurePolicy,cancellationHistory:x.draft.cancellationHistory});
  assert.equal(assemblePrivateQaNamedPacket({packetJson,expectedCapsule:capsuleJson,artifact:x.p.artifact,receipt:x.p.receipt,namespace:x.p.namespace}).namedBundleHash,x.namedBundleHash);
 }
 reject(options(x));
});
for(const mode of ['extra','missing','symbol','accessor','snapshot-extra','journal-accessor','artifact-accessor','context-accessor','draft-byte-bound','artifact-byte-bound','snapshot-depth','invalid-at'])test('exact private literal boundary rejects '+mode+' without executing accessors',()=>{
 const x=generationPreparationFixture(),o=options(x);let calls=0;const getter=()=>{calls++;throw Error('must not execute');};
 if(mode==='extra')o.authorize=()=>true;if(mode==='missing')delete o.at;if(mode==='symbol')o[Symbol('extra')]=true;
 if(mode==='accessor')Object.defineProperty(o,'draftJson',{enumerable:true,get:getter});
 if(mode==='snapshot-extra')o.legacySnapshot.extra=true;
 if(mode==='journal-accessor')Object.defineProperty(o.legacySnapshot.journals.preparedDispatch,'phase',{enumerable:true,get:getter});
 if(mode==='artifact-accessor')Object.defineProperty(o.artifact,'script',{enumerable:true,get:getter});
 if(mode==='context-accessor')Object.defineProperty(o.historicalContext.journalHashes,'preparedDispatch',{enumerable:true,get:getter});
 if(mode==='draft-byte-bound')o.draftJson='é'.repeat(32769);
 if(mode==='artifact-byte-bound')o.artifact.script='x'.repeat(2097153);
 if(mode==='snapshot-depth'){let v={};o.legacySnapshot.control.policy=v;for(let i=0;i<18;i++){v.next={};v=v.next;}}
 if(mode==='invalid-at')o.at=8640000000000001;
 reject(o);assert.equal(calls,0);
});
test('retained issued and complete journal uncertainty survives without declaring execution or history authority',()=>{
 for(const phase of ['issued','complete']){
  const x=generationPreparationFixture(),journal=x.old.journals.preparedDispatch;
  journal.phase=phase;journal.completedAt=phase==='complete'?journal.issuedAt+1:null;x.old.historicalContext.journalHashes.preparedDispatch=hash(JSON.stringify(journal));
  const r=assemble(options(x));assert.equal(r.retainedUncertainty,true);for(const k of denied)assert.equal(r[k],false);
  assert.equal(Object.hasOwn(r,'d1IdentityCorrelationVerified'),false);assert.equal(Object.hasOwn(r,'historicalDeclarationsVerified'),false);
 }
});
