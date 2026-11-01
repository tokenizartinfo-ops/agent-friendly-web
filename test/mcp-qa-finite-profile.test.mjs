import {createHash} from 'node:crypto';
import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
import {validateReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
let api;
try{api=await import('../lib/mcp-qa-finite-profile.mjs');}catch{/* Missing implementation is an explicit RED assertion. */}
function fixture(){
 assert.equal(typeof api?.finitePublicProfileTemplate,'function','source-owned profile template required');
 const v=structuredClone(api.finitePublicProfileTemplate('canaryLive'));
 for(const b of v.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC-PRIVATE-'+b.name;}
 return v;
}
test('private_projection_preserves_full_fingerprint',()=>{
 const script='export default {fetch(){return new Response(null,{status:404})}}';
 const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
 const policy=inertNamedConfirmationPolicy(artifact),a=fixture();
 for(const binding of a.bindings){const original=policy.observation.configuration.bindings.find(x=>x.name===binding.name);if(original&&binding.type==='plain_text'&&original.type==='plain_text')binding.text=original.text;}
 const b=structuredClone(a),event=b.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY');
 const changed=JSON.parse(event.text);changed.grantId='ci-only-second-inert';event.text=JSON.stringify(changed);
 for(const configuration of [a,b]){const p=structuredClone(policy);p.observation.configuration=configuration;p.plan.configurationHash=activationConfigurationHash(configuration);assert.equal(validateReleaseOperatorBundle({artifact,policy:p}),true);}
 const bad=structuredClone(b),raw=bad.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY'),invalid=JSON.parse(raw.text);invalid.clientId='wrong-private-client';raw.text=JSON.stringify(invalid);
 const invalidPolicy=structuredClone(policy);invalidPolicy.observation.configuration=bad;invalidPolicy.plan.configurationHash=activationConfigurationHash(bad);
 assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:bad}));
 assert.throws(()=>validateReleaseOperatorBundle({artifact,policy:invalidPolicy}),/Release operator plan unavailable/);
 assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}));
 assert.notEqual(activationConfigurationHash(a),activationConfigurationHash(b));
 assert.notEqual(restorationConfigurationHash(a),restorationConfigurationHash(b));
 assert.notEqual(activationConfigurationHash(a),restorationConfigurationHash(a));
 const projected=JSON.stringify(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}));
 assert(!projected.includes('SYNTHETIC-PRIVATE'));
});
test('unknown_private_slot_denied',()=>{
 const a=fixture();a.bindings.push({name:'AFW_NEW_PRIVATE_POLICY',type:'plain_text',text:'private'});
 assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}));
});
test('actual_version_metadata_required',()=>{
 const a={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'AFW_FINITE_TRIAL_VERSION',type:'version_metadata'}]};
 assert.match(activationConfigurationHash(a),/^[a-f0-9]{64}$/);
 for(const change of [b=>b.name='AFW_FAKE_VERSION',b=>b.value='fake',b=>Object.defineProperty(b,'type',{get(){throw Error('getter executed');},enumerable:true})]){
  const b=structuredClone(a);change(b.bindings[0]);assert.throws(()=>activationConfigurationHash(b));
 }
});
test('exact public roles reject missing slots, accessors, flags, resource substitution and raw QA policies',()=>{
 const a=fixture();
 assert.equal(a.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED').text,'true');
 assert.equal(a.bindings.find(b=>b.name==='AFW_DOSSIER_RETIREMENT_READ_ENABLED').text,'false');
 for(const mutate of [
  v=>v.bindings.pop(),
  v=>v.limits={cpu_ms:10},
  v=>v.bindings.find(b=>b.name==='DB').id='00000000-0000-0000-0000-000000000000',
  v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='false',
  v=>v.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_VERSION').type='plain_text',
  v=>Object.defineProperty(v.bindings[0],'name',{get(){throw Error('getter');},enumerable:true}),
  v=>v.bindings.push({name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:'future'}),
 ]){const b=structuredClone(a);mutate(b);assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}));}
 const qa=structuredClone(api.finitePublicProfileTemplate('qaLive'));
 assert.equal(qa.bindings.filter(b=>b.name.endsWith('_ENABLED')&&b.text==='false').length,14);
 assert.equal(qa.bindings.filter(b=>b.name.startsWith('AFW_RELEASE_')&&b.text==='true').length,4);
 qa.bindings.push({name:'AFW_DOSSIER_EVENTS_POLICY',type:'plain_text',text:'private'});
 assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:qa}));
});

test('projection rejects caller extras and accessor without invocation',()=>{
 let invoked=false;const input={role:'qaLive'};
 Object.defineProperty(input,'metadata',{enumerable:true,get(){invoked=true;throw Error('getter');}});
 assert.throws(()=>api.projectFinitePublicConfiguration(input));assert.equal(invoked,false);
 assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:api.finitePublicProfileTemplate('qaLive'),allow:true}));
});
