import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as activation from '../lib/mcp-activation-observer.mjs';

const LEGACY_GOLDEN='b35fa92f070cde9b87142997c223c5a3067c702fc594c435a9164f50bbee4f33';
const legacy=()=>({compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'TOKEN',type:'secret_text'},{name:'ENABLED',type:'plain_text',text:'true'},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'b'.repeat(32),class_name:'AfwOwnEventNode'}],usage_model:'standard',containers:[]});
const finite=()=>({...legacy(),compatibility_flags:['nodejs_compat','global_fetch_strictly_public','enable_request_signal']});
const canonical=value=>JSON.stringify(value,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
const independent=value=>createHash('sha256').update(canonical({...value,bindings:[...value.bindings].sort((a,b)=>a.name.localeCompare(b.name))})).digest('hex');
const copy=value=>structuredClone(value);
const ids={versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:'b'.repeat(32),applicationId:'app'};
async function observe(configuration,make,actual=configuration){
 const script='export default {}',workerHash=createHash('sha256').update(script).digest('hex'),etag='c'.repeat(64),calls=[];
 const fetchImpl=async(url,init)=>{calls.push(url);assert.equal(init.method,'GET');let result;
  if(url.endsWith('/deployments'))result={deployments:[{id:ids.deploymentId,strategy:'percentage',versions:[{version_id:ids.versionId,percentage:100}]}]};
  else if(url.includes('/containers/'))result={id:ids.applicationId,account_id:'a'.repeat(32),scheduling_policy:'durable_object',durable_objects:{namespace_id:ids.namespaceId}};
  else if(url.includes('/scripts/'))result={id:ids.versionId,resources:{script:{etag},bindings:actual.bindings}};
  else result={id:ids.versionId,...actual,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
  return Response.json({success:true,errors:[],result});
 };
 const fn=make({...ids,configuration,readCredential:async()=>'synthetic_read_only_token',fetchImpl});
 const input={accountId:'a'.repeat(32),workerName:'agent-friendly-web-delegated-canary',workerHash,configurationHash:independent(configuration),sourceRevision:'e'.repeat(40),programHash:'f'.repeat(64),scopeHash:'d'.repeat(64)};
 return {run:()=>fn(input,new AbortController().signal),calls};
}
test('legacy_pair_digest_and_positive_observer_preserved',async()=>{
 const value=legacy();assert.equal(independent(value),LEGACY_GOLDEN);assert.equal(activation.activationConfigurationHash(value),LEGACY_GOLDEN);
 const {run,calls}=await observe(value,activation.createActivationObserver);
 assert.equal((await run()).configurationHash,independent(value));assert.equal(calls.length,7);
});
test('finite_triple_hashes_actual_flags',()=>{
 const value=finite(),before=copy(value),expected=independent(value);
 assert.equal(activation.finiteActivationConfigurationHash(value),expected);
 assert.notEqual(expected,independent(legacy()));assert.deepEqual(value,before);
});
test('profiles_reject_each_other',async()=>{
 assert.throws(()=>activation.activationConfigurationHash(finite()));
 assert.throws(()=>activation.finiteActivationConfigurationHash(legacy()));
 assert.throws(()=>activation.createActivationObserver({...ids,configuration:finite(),readCredential:async()=>'',fetchImpl:async()=>{}}));
 assert.throws(()=>activation.createFiniteActivationObserver({...ids,configuration:legacy(),readCredential:async()=>'',fetchImpl:async()=>{}}));
});
test('exact_flags_date_and_plain_data',()=>{
 const value=finite();
 for(const flags of [[],['nodejs_compat','global_fetch_strictly_public'],['nodejs_compat','enable_request_signal','global_fetch_strictly_public'],['nodejs_compat','global_fetch_strictly_public','enable_request_signal','other'],['nodejs_compat','global_fetch_strictly_public','other']])assert.throws(()=>activation.finiteActivationConfigurationHash({...value,compatibility_flags:flags}));
 assert.throws(()=>activation.finiteActivationConfigurationHash({...value,compatibility_date:'2026-09-08'}));
 assert.throws(()=>activation.finiteActivationConfigurationHash({...value,bindings:[{name:'TOKEN',type:'secret_text',text:'sensitive'}]}));
 let invoked=false;const accessor=Object.defineProperty({...value},'bindings',{get(){invoked=true;return value.bindings},enumerable:true});
 assert.throws(()=>activation.finiteActivationConfigurationHash(accessor));assert.equal(invoked,false);
});
test('finite_observer_checks_approved_and_observed_profile',async()=>{
 const value=finite(),{run,calls}=await observe(value,activation.createFiniteActivationObserver);
 assert.equal((await run()).configurationHash,independent(value));assert.equal(calls.length,7);
 const wrong=await observe(value,activation.createFiniteActivationObserver,legacy());await assert.rejects(wrong.run());assert.ok(wrong.calls.length>0);
});
