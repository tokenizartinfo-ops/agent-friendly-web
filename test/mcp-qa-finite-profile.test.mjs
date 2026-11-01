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
 const a=fixture(),b=structuredClone(a);
 b.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY').text='SYNTHETIC-DIFFERENT-PRIVATE-POLICY';
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
 for(const mutate of [
  v=>v.bindings.pop(),
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
