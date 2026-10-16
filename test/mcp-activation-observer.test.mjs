import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
test('activation observer verifies actual version bytes, approved config and bracketed deployment',async()=>{
 const {createActivationObserver,activationConfigurationHash}=await import('../lib/mcp-activation-observer.mjs');
 for(const mode of ['ok','config','bytes','deployment','secret','unknown']){
  const accountId='a'.repeat(32),namespaceId='b'.repeat(32),versionId='11111111-1111-4111-8111-111111111111',deploymentId='22222222-2222-4222-8222-222222222222',script='export default {}',workerHash=createHash('sha256').update(script).digest('hex'),etag='c'.repeat(64),scopeHash='d'.repeat(64);
  const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:namespaceId,class_name:'AfwOwnEventNode'},{name:'TOKEN',type:'secret_text'},{name:'AFW_DOSSIER_EVENTS_ENABLED',type:'plain_text',text:'true'}],usage_model:'standard',containers:[{class_name:'AfwOwnEventNode',name:'agent-friendly-web-delegated-canary-afwowneventnode'}]};
  if(mode==='secret'){assert.throws(()=>activationConfigurationHash({...configuration,bindings:[{name:'TOKEN',type:'secret_text',text:'must_not_accept'}]}));continue;}
  const configurationHash=activationConfigurationHash(configuration),calls=[];
  const fetchImpl=async(url,init)=>{calls.push(url);assert.equal(init.method,'GET');let result;
   if(url.endsWith('/deployments'))result={deployments:[{id:mode==='deployment'?'33333333-3333-4333-8333-333333333333':deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}]};
   else if(url.includes('/containers/'))result={id:'app',account_id:accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:namespaceId}};
   else if(url.includes('/scripts/'))result={id:versionId,resources:{script:{etag},bindings:[configuration.bindings[0]]}};
   else result={id:versionId,...configuration,bindings:mode==='config'?configuration.bindings.slice(0,2):configuration.bindings,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(mode==='bytes'?'changed':script).toString('base64')}]};
   if(mode==='unknown'&&url.includes('/workers/workers/'))result.unknown_runtime_option=true;return Response.json({success:true,errors:[],result});
  };
  const observe=createActivationObserver({versionId,deploymentId,namespaceId,applicationId:'app',configuration,readCredential:async()=>'synthetic_read_only_token',fetchImpl});
  const p={accountId,workerName:'agent-friendly-web-delegated-canary',workerHash,configurationHash,sourceRevision:'e'.repeat(40),programHash:'f'.repeat(64),scopeHash};
  if(mode==='ok'){const r=await observe(p,new AbortController().signal);assert.equal(r.versionId,versionId);assert.equal(r.configurationHash,configurationHash);assert.equal(calls.length,7);}
  else await assert.rejects(observe(p,new AbortController().signal));
 }
});

test('activation configuration binds the Container attachment in its hash',async()=>{
 const {activationConfigurationHash}=await import('../lib/mcp-activation-observer.mjs');
 const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'TOKEN',type:'secret_text'}],usage_model:'standard',containers:[]};
 const closed=activationConfigurationHash(configuration),attached=activationConfigurationHash({...configuration,containers:[{class_name:'AfwOwnEventNode'}]});assert.notEqual(closed,attached);
 assert.throws(()=>activationConfigurationHash({...configuration,containers:[{class_name:'foreign'}]}));
});
