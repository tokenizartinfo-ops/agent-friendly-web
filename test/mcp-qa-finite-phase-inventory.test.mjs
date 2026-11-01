import test from 'node:test';
import assert from 'node:assert/strict';
import {AFW_FIXED_WORKFLOWS,readFiniteTrialAfwWorkflows} from '../lib/mcp-fixed-terminal-workflows.mjs';
const confirmationId='afw-release-'+'6'.repeat(64),observerId='afw-qa-arm-'+'7'.repeat(64);
function fixture(phase,{absent=false,nominalStatus='complete',observerStatus='complete'}={}){
 const rows=AFW_FIXED_WORKFLOWS.map(spec=>({id:spec.id,name:spec.name,script_name:spec.script,class_name:spec.className}));
 const reads=[];
 const read=async path=>{
  reads.push(path);if(path==='/workflows')return {value:rows,info:{per_page:100,count:3,total_count:3,page:1,total_pages:1}};
  const spec=AFW_FIXED_WORKFLOWS.find(s=>path.startsWith('/workflows/'+s.name));assert.ok(spec);
  if(!path.endsWith('/instances'))return {value:rows.find(x=>x.id===spec.id)};
  const value=spec.className==='PrivateQaNamedConfirmation'?(absent?[]:[{id:confirmationId,status:nominalStatus,workflow_id:spec.id}]):spec.className==='PrivateQaBootstrap'?[{id:observerId,status:observerStatus,workflow_id:spec.id}]:[];
  return {value,info:{per_page:100,count:value.length,total_count:value.length,page:1,total_pages:1}};
 };
 return {reads,options:{read,assertCurrent(){},phase,confirmationId,observerId,qualifiedExecution:{intentId:'finite-test-001',controlHash:'1'.repeat(64),sourceRevision:'b'.repeat(40),moduleHash:'d'.repeat(64),confirmationId,observerId,admissionHash:'2'.repeat(64)}}};
}
for(const phase of ['arm','nominal','canary_restore','qa_restore'])test('missing nominal remains blocked at '+phase,async()=>{
 const f=fixture(phase,{absent:true});await assert.rejects(readFiniteTrialAfwWorkflows(f.options),/inventory unavailable/);
 assert.equal(f.reads.includes('/workflows/afw-own-qa-private-confirmation/instances'),true);
});
test('unchanged inventory permits exact existing named instance and complete phase inventory',async()=>{
 for(const phase of ['arm','nominal','canary_restore','qa_restore']){
  const f=fixture(phase),value=await readFiniteTrialAfwWorkflows(f.options);assert.equal(value.phase,phase);assert.equal(value.workflowCount,3);assert.equal(value.instanceCount,2);assert.equal(value.authorizesEffects,false);
 }
});
for(const phase of ['canary_restore','qa_restore'])test('active nominal blocks '+phase,async()=>{
 await assert.rejects(readFiniteTrialAfwWorkflows(fixture(phase,{nominalStatus:'running'}).options),/inventory unavailable/);
});
test('observer must complete for QA restore but may run at canary restore',async()=>{
 assert.equal((await readFiniteTrialAfwWorkflows(fixture('canary_restore',{observerStatus:'running'}).options)).phase,'canary_restore');
 await assert.rejects(readFiniteTrialAfwWorkflows(fixture('qa_restore',{observerStatus:'running'}).options),/inventory unavailable/);
});
