import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {readPrivateQaFiniteSetupCompletion} from '../lib/mcp-qa-finite-adoption-source.mjs';

const T0=Date.parse('2026-11-18T16:00:00Z');
const workflow='afw-own-qa-private-bootstrap';
const path='/workflows/'+workflow;
const id=n=>'00000000-0000-4000-8000-'+String(n).padStart(12,'0');
const canonical=value=>JSON.stringify(value,(_,item)=>item&&typeof item==='object'&&!Array.isArray(item)
 ?Object.fromEntries(Object.entries(item).sort(([a],[b])=>a<b?-1:a>b?1:0)):item);
const hash=s=>createHash('sha256').update(s).digest('hex');
const iso=at=>new Date(at).toISOString();

function fixture(change){
 const intentId='a'.repeat(64),sourceRevision='b'.repeat(40),seedHash='c'.repeat(64);
 const setupInstanceId='afw-finite-policy-'+hash('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision}));
 const qa={versionId:id(1),deploymentId:id(2)};
 const canary={name:'index.mjs',sha256:'d'.repeat(64),bytes:29};
 const publicStaticHash='e'.repeat(64);
 const receipt={purpose:'afw.finite-policy-installed.v1',intentId,sourceRevision,setupInstanceId,qaVersionId:qa.versionId,
  seedHash,contextHash:'f'.repeat(64),baselineVersionId:id(3),baselineDeploymentId:id(4),versionId:id(5),deploymentId:id(6),
  moduleHash:canary.sha256,publicStaticHash,activationHash:'1'.repeat(64),restorationHash:'2'.repeat(64),
  bindingsHash:'3'.repeat(64),installedAt:T0+2300};
 if(change==='other-module')receipt.moduleHash='4'.repeat(64);
 receipt.receiptHash=hash(receipt.purpose+'\n'+canonical(receipt));
 const output=JSON.stringify({status:'installed',receipt}),start=T0+2000,end=T0+2400;
 const result={status:'complete',success:true,versionId:id(7),queued:iso(start-200),start:iso(start),end:iso(end),
  params:{operation:'finite_private_policy_setup',intentId,sourceRevision},output,step_count:1,
  steps:[{name:'finite-private-policy-setup',type:'step',start:iso(start+100),end:iso(end-10),
   attempts:[{success:true}],success:true,output}]};
 if(change==='running')result.status='running';
 if(change==='duplicate-step')result.steps.push(result.steps[0]);
 if(change==='step-output')result.steps[0].output=JSON.stringify({status:'admin_pending'});
 if(change==='unrelated')result.params.intentId='9'.repeat(64);
 if(change==='early')result.queued=iso(T0+999);
 const expected={qa,seedHash,canaryModuleHash:canary.sha256,canaryPublicStaticHash:publicStaticHash,seedCompletedAt:T0+1000,T0};
 const calls=[],abort=new AbortController();
 const parent={signal:abort.signal,deadline:T0+70000,check:()=>{
  if(abort.signal.aborted)throw Error('fixture aborted');return T0+2500;
 }};
 const deployment=(versionId,deploymentId)=>({deployments:[{id:deploymentId,strategy:'percentage',
  versions:[{version_id:versionId,percentage:100}]}]});
 const read=async p=>{
  calls.push(p);
  if(p===path+'/instances/'+setupInstanceId){if(change==='abort')abort.abort();return result;}
  if(p===path+'/versions/'+id(7))return {id:id(7),workflow_id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',
   class_name:'PrivateQaBootstrap',language:'javascript'};
  if(p==='/workers/scripts/agent-friendly-web-independent-closure-qa/deployments')return deployment(qa.versionId,qa.deploymentId);
  if(p==='/workers/scripts/agent-friendly-web-delegated-canary/deployments')return deployment(receipt.versionId,change==='drift'?id(8):receipt.deploymentId);
  assert.fail('unexpected provider path');
 };
 return {input:{intentId,sourceRevision,parent,expected,read},receipt,setupInstanceId,calls};
}

test('QA adopts the exact completed setup only after checking both deployed Workers',async()=>{
 const f=fixture();
 const received=await readPrivateQaFiniteSetupCompletion(f.input);
 assert.deepEqual(received.receipt,f.receipt);
 assert.equal(received.instance.instanceId,f.setupInstanceId);
 assert.equal(received.instance.status,'complete');
 assert.equal(f.calls.length,4);
 assert.equal(f.calls.filter(p=>p.endsWith('/deployments')).length,2);
});

test('QA rejects incomplete, unrelated or drifted setup evidence',async()=>{
 for(const change of ['running','duplicate-step','step-output','unrelated','early','drift','other-module','abort']){
  const f=fixture(change);
  await assert.rejects(readPrivateQaFiniteSetupCompletion(f.input),undefined,change);
  if(change==='abort')assert.equal(f.calls.length,1);
 }
});
