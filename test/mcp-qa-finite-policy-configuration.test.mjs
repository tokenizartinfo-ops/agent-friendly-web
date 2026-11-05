import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {finitePolicyConfigurationFixture} from './fixtures/finite-policy-configuration-data.mjs';
import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from '../lib/mcp-qa-finite-profile.mjs';
import {finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
let api;
try{api=await import('../lib/mcp-qa-finite-policy-configuration.mjs');}catch{/* Missing new module is the causal RED. */}
const fixture=()=>finitePolicyConfigurationFixture();
const build=x=>{assert.equal(typeof api?.buildFinitePolicySetupConfiguration,'function','full-policy builder required');return api.buildFinitePolicySetupConfiguration(x);};
const copy=x=>structuredClone(x);
const binding=(v,name)=>v.bindings.find(b=>b.name===name);
const removed=['ACCESS_AUD','ACCESS_TEAM_DOMAIN','AFW_DOSSIER_MONITORING_OWNER_POLICY','AFW_OAUTH_PILOT_EXPIRES_AT','DELEGATED_RATE_LIMITER'];
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const bindingsHash=v=>createHash('sha256').update(canonical([...v.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex');

test('clone and six patches leaves the causal shape failure',()=>{
 const {prearmConfiguration,policies}=fixture();
 const oldClone=copy(prearmConfiguration);
 oldClone.bindings=oldClone.bindings.map(b=>Object.hasOwn(policies,b.name)?{name:b.name,type:'plain_text',text:policies[b.name]}:b);
 assert.throws(()=>projectFinitePublicConfiguration({role:'canaryLive',metadata:oldClone}));
 assert.equal(typeof api?.buildFinitePolicySetupConfiguration,'function','missing full-policy builder is the causal RED');
 const full=build({prearmConfiguration,policies});
 assert.deepEqual(projectFinitePublicConfiguration({role:'canaryLive',metadata:full}),finitePublicProfileTemplate('canaryLive'));
});

test('full candidate preserves holders and removes exactly five names',()=>{
 const {prearmConfiguration,policies}=fixture(),full=build({prearmConfiguration,policies});
 const before=prearmConfiguration.bindings.map(b=>b.name),after=full.bindings.map(b=>b.name);
 assert.deepEqual(before.filter(n=>!after.includes(n)).sort(),removed);
 assert.deepEqual(after.filter(n=>!before.includes(n)),[]);
 for(const holder of prearmConfiguration.bindings.filter(b=>b.type!=='plain_text'))assert.deepEqual(binding(full,holder.name),holder);
 assert.equal(binding(full,'DELEGATED_RATE_LIMITER'),undefined);
 for(const key of Object.keys(prearmConfiguration).filter(k=>k!=='bindings'))assert.deepEqual(full[key],prearmConfiguration[key]);
 assert.deepEqual(full.exports,prearmConfiguration.exports);
 assert.deepEqual(full.containers,prearmConfiguration.containers);
 assert(Object.isFrozen(full)&&Object.isFrozen(full.bindings)&&Object.isFrozen(binding(full,'DB'))&&Object.isFrozen(full.exports.AfwOwnEventNode));
});

test('full flags and six original strings are exact',()=>{
 const input=fixture(),before=copy(input),full=build(input);
 const enabled=full.bindings.filter(b=>b.name.endsWith('_ENABLED'));
 assert.deepEqual(enabled.filter(b=>b.text==='true').map(b=>b.name).sort(),['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED']);
 assert(enabled.filter(b=>b.text!=='true').every(b=>b.text==='false'));
 for(const [name,raw] of Object.entries(input.policies))assert.equal(binding(full,name).text,raw);
 assert(full.bindings.every(b=>!Object.hasOwn(b,'privateSlot')));
 assert.deepEqual(input,before);
 input.policies.AFW_DOSSIER_EVENTS_POLICY='changed';
 assert.equal(binding(full,'AFW_DOSSIER_EVENTS_POLICY').text,before.policies.AFW_DOSSIER_EVENTS_POLICY);
});

test('foreign shape and private placeholder cannot be repaired',()=>{
 const valid=fixture();
 const changes=[
  x=>binding(x.prearmConfiguration,'DB').id='0'.repeat(64),
  x=>binding(x.prearmConfiguration,'OAUTH_KV').namespace_id='0'.repeat(32),
  x=>binding(x.prearmConfiguration,'AFW_FINITE_TRIAL_VERSION').type='plain_text',
  x=>binding(x.prearmConfiguration,'AFW_DOSSIER_EVENTS_NODE').name='OTHER_NODE',
  x=>binding(x.prearmConfiguration,'ACCESS_AUD').text='foreign-aud',
  x=>x.prearmConfiguration.exports.AfwOwnEventNode.container='foreign-container',
  x=>x.prearmConfiguration.containers[0].name='foreign-container',
  x=>x.prearmConfiguration.bindings.push({name:'EXTRA',type:'plain_text',text:'x'}),
  x=>x.prearmConfiguration.bindings.pop(),
  x=>x.prearmConfiguration.bindings.push(copy(x.prearmConfiguration.bindings[0])),
  x=>x.prearmConfiguration.compatibility_flags.reverse(),
  x=>x.prearmConfiguration.compatibility_date='2026-09-08',
  x=>x.policies.EXTRA='x',
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='',
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='SYNTHETIC-PRIVATE-EVENTS',
  x=>x.policies.AFW_DOSSIER_RETIREMENT_POLICY='SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT',
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='[]',
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='1',
  x=>x.policies.AFW_OAUTH_PILOT_PROJECT_ID='foreign-project',
  x=>x.policies.AFW_OAUTH_PILOT_CLIENT_ID='foreign-client',
  x=>x.policies.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify({scope:{},original:{},candidate:{},publication:{},extra:true})
 ];
 for(const mutate of changes){const x=copy(valid);mutate(x);assert.throws(()=>build(x));}
});

test('strict builder DATA rejects hidden capabilities without evaluating accessors',()=>{
 const changes=[
  x=>x.extra=true,
  x=>x.policies[Symbol('hidden')]='x',
  x=>Object.setPrototypeOf(x.policies,{}),
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY='x'.repeat(32769),
  x=>x.policies.AFW_DOSSIER_EVENTS_POLICY=()=>{},
  x=>x.prearmConfiguration.env={},
  x=>x.prearmConfiguration.bindings.length++
 ];
 for(const mutate of changes){const x=fixture();mutate(x);assert.throws(()=>build(x));}
 let calls=0;
 for(const target of ['input','policies','prearm']){
  const x=fixture(),obj=target==='input'?x:target==='policies'?x.policies:x.prearmConfiguration;
  Object.defineProperty(obj,target==='input'?'policies':target==='policies'?'AFW_DOSSIER_EVENTS_POLICY':'bindings',{enumerable:true,get(){calls++;throw Error('getter ran');}});
  assert.throws(()=>build(x));assert.equal(calls,0);
 }
});

test('full hashes keep distinct original domains',()=>{
 const input=fixture(),a=build(input),b=build(fixture());
 const hashes=v=>[finiteActivationConfigurationHash(v),restorationConfigurationHash(v),bindingsHash(v)];
 assert.deepEqual(hashes(a),hashes(b));
 assert.notEqual(finiteActivationConfigurationHash(input.prearmConfiguration),finiteActivationConfigurationHash(a));
 assert.notEqual(restorationConfigurationHash(input.prearmConfiguration),restorationConfigurationHash(a));
 assert.notEqual(bindingsHash(input.prearmConfiguration),bindingsHash(a));
 const changed=fixture(),event=JSON.parse(changed.policies.AFW_DOSSIER_EVENTS_POLICY);
 event.grantId='ci-synthetic-other-grant';
 changed.policies.AFW_DOSSIER_EVENTS_POLICY=JSON.stringify(event);
 const c=build(changed);
 assert.notEqual(hashes(a)[0],hashes(c)[0]);
 assert.notEqual(hashes(a)[1],hashes(c)[1]);
 assert.notEqual(hashes(a)[2],hashes(c)[2]);
 assert.deepEqual(projectFinitePublicConfiguration({role:'canaryLive',metadata:a}),projectFinitePublicConfiguration({role:'canaryLive',metadata:c}));
});
