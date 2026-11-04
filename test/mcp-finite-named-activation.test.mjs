import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as policy from '../lib/mcp-release-operator-policy.mjs';
import {activationConfigurationHash,finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';

const hash=s=>createHash('sha256').update(s).digest('hex');
function fixture(){
 const t=policy.RELEASE_TARGET,script='export default {}',window={startAt:1000,expiresAt:601000};
 const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
 const plan={activationKey:'d'.repeat(64),artifactKey:hash(JSON.stringify([t.accountId,t.workerName,artifact.workerHash])),trialId:'e'.repeat(64),configurationHash:'',...window};
 const manifest={scope:{accountId:t.accountId,workerName:t.workerName,namespaceId:t.namespaceId,applicationId:t.namespaceId,ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'},original:{containerId:'3'.repeat(64),applicationId:t.namespaceId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)},candidate:{trialId:plan.trialId,programHash:artifact.programHash,sourceRevision:artifact.sourceRevision,...window,budget:1},publication:{artifactKey:plan.artifactKey,workerHash:artifact.workerHash,activationKey:plan.activationKey}};
 const eventPolicy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:manifest.scope.resource,...window};
 const bindings=[{name:'DB',type:'d1',id:t.databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:t.kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:t.namespaceId,class_name:'AfwOwnEventNode'},...Object.entries({AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify(manifest),AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(eventPolicy),AFW_OAUTH_ISSUER:manifest.scope.resource.slice(0,-4),AFW_OAUTH_RESOURCE:manifest.scope.resource,AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client'}).map(([name,text])=>({name,type:'plain_text',text}))];
 const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public','enable_request_signal'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings,usage_model:'standard',containers:[]};
 plan.configurationHash=finiteActivationConfigurationHash(configuration);
 const bundle={artifact,policy:{operation:'confirm_named',...window,plan,observation:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:t.namespaceId,applicationId:t.namespaceId,configuration}}};
 let gets=0;const namespace={idFromName:name=>({toString:()=>name==='afw-own-event-one-occurrence-v1'?'3'.repeat(64):'6'.repeat(64)}),idFromString:id=>({toString:()=>id}),get(){gets++;throw Error('No IO');}};
 return {bundle,manifest,namespace,gets:()=>gets,update(){bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text=JSON.stringify(manifest);plan.configurationHash=finiteActivationConfigurationHash(configuration)}};
}
const history=(grant='g')=>JSON.stringify({purpose:'afw.successor-known-cancellations.v1',currentGrant:{grantId:grant,consentSequence:1,consentRevision:1,issuedAt:1000,expiresAt:601000},cancellations:[]});
test('finite_named_plan_and_history_positive',()=>{
 const f=fixture(),before=structuredClone(f.bundle);assert.equal(policy.validateFiniteReleaseOperatorBundle(f.bundle),true);
 const resolved=policy.resolveFiniteNamedActivationPlan(f.bundle,f.namespace);assert.ok(Object.isFrozen(resolved));assert.equal(typeof resolved.plan.scopeHash,'string');resolved.current();
 assert.equal(policy.validateFiniteNamedCancellationHistory(f.bundle,history()),true);assert.deepEqual(f.bundle,before);assert.equal(f.gets(),0);
});
test('finite_bundle_requires_confirm_named',()=>{
 const f=fixture();
 const publish={artifact:f.bundle.artifact,policy:{operation:'publish',startAt:1000,expiresAt:601000,pins:{...policy.RELEASE_TARGET,baseVersionId:'33333333-3333-4333-8333-333333333333'}}};
 assert.equal(policy.validateReleaseOperatorBundle(publish),true);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(publish));
 const confirm={...f.bundle,policy:{...f.bundle.policy,operation:'confirm',plan:{...f.bundle.policy.plan,scopeHash:'f'.repeat(64)}}};
 assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(confirm));
 const old=structuredClone(f.bundle);old.policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];old.policy.plan.configurationHash=activationConfigurationHash(old.policy.observation.configuration);
 assert.equal(policy.validateReleaseOperatorBundle(old),true);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(old));assert.throws(()=>policy.validateReleaseOperatorBundle(f.bundle));
});
test('finite_private_binding_and_current_grant_correlated',()=>{
 const f=fixture(),original=f.bundle.policy.plan.configurationHash;
 f.bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_ENABLED').text='false';f.update();
 assert.notEqual(f.bundle.policy.plan.configurationHash,original);assert.throws(()=>policy.validateFiniteReleaseOperatorBundle(f.bundle));assert.equal(f.gets(),0);
 const g=fixture();assert.throws(()=>policy.validateFiniteNamedCancellationHistory(g.bundle,history('other')));assert.equal(g.gets(),0);
 const r=policy.resolveFiniteNamedActivationPlan(g.bundle,g.namespace);g.namespace.idFromName=()=>({toString:()=> '7'.repeat(64)});assert.throws(()=>r.current());assert.equal(g.gets(),0);
});
