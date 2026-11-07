import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
import {join} from 'node:path';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';

const group=process.env.AFW_BUDGET_GROUP;
if(group!=='red')throw Error('SYN budget group unsupported before I0');
const directory='output/finite-budget/red',hash=bytes=>createHash('sha256').update(bytes).digest('hex');
test('R0 attributable diagnostics after genuine SDK complete and durable Reference',{timeout:180000},async t=>{
 await mkdir(directory,{recursive:true});
 const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
 const outcome={purpose:'afw.finite-budget-red-outcome.syn.v1',source,caseName:'R0',startedAt:Date.now(),stage:'fixture',actualCompleteNormal:null,referenceHash:null,responseStatus:null,diagnosticsPurpose:null,expectedDeficitObserved:false,operationalReadiness:false,completePackage:false,PCoff:false};
 try{
  const f=await ownerReferenceFixture(t,{budgetQualification:true});
  outcome.stage='prepare';
  const prepared=await prepareOwnerReference(f);
  outcome.stage='issue';
  const response=await prepared.issue();
  outcome.responseStatus=response.status;
  outcome.stage='actual-complete';
  const completed=await assertActualComplete(f,{reference:true});
  assert.equal(response.status,302);
  outcome.actualCompleteNormal=completed.observed.completeNormal;
  outcome.referenceHash=completed.reference.recordHash;
  assert.match(outcome.referenceHash,/^[a-f0-9]{64}$/);
  outcome.stage='record';
  const result=await recordOwnerReference(f,'budget-red-after-real-complete',{status:response.status});
  outcome.diagnosticsPurpose=result.diagnostics?.purpose??null;
  const nativeFacts={
   purpose:'afw.finite-budget-red-native-facts.syn.v1',source,
   capturedAt:Date.now(),responseStatus:response.status,
   completeWrites:completed.observed.completeWrites,completeNormal:completed.observed.completeNormal,
   referenceHash:completed.reference.recordHash,referenceCommits:completed.observed.referenceCommits,
   referenceSyncs:completed.observed.referenceSyncs,referenceReadbacks:completed.observed.referenceReadbacks,
   lists:completed.observed.lists,gets:completed.observed.gets,peak:completed.observed.peak,
   trace:completed.observed.trace,requests:completed.observed.requests,
   M:result.M,QA:result.QA,diagnosticsPresent:result.diagnostics!==undefined,
   operationalReadiness:false,completePackage:false,PCoff:false
  };
  const full=Buffer.from(JSON.stringify(result,null,2));
  await writeFile(join(directory,'full-result.json'),full);
  nativeFacts.fullResult={path:'full-result.json',bytes:full.length,sha256:hash(full)};
  await writeFile(join(directory,'native-facts.json'),JSON.stringify(nativeFacts,null,2));
  await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(directory,'graphs'),{recursive:true,errorOnExist:true,force:false});
  const metafiles=JSON.parse(await readFile(join(directory,'graphs/metafiles.json'),'utf8'));
  const paths=[...new Set([...Object.keys(metafiles.M.inputs),...Object.keys(metafiles.QA.inputs)])].filter(path=>!path.startsWith('<')).sort();
  const inputs=[];
  for(const path of paths){const bytes=await readFile(path);inputs.push({path,bytes:bytes.length,sha256:hash(bytes)});}
  await writeFile(join(directory,'source-inputs.json'),JSON.stringify({purpose:'afw.finite-budget-red-source-inputs.syn.v1',source,inputs},null,2));
  outcome.stage='missing-diagnostics-assertion';
  outcome.expectedDeficitObserved=outcome.diagnosticsPurpose!=='afw.finite-budget-diagnostics.syn.v1';
  await writeFile(join(directory,'outcome.json'),JSON.stringify({...outcome,assertionAt:Date.now()},null,2));
  // Assert only after the native effect, durable Reference, 302 and evidence.
  assert.equal(result.diagnostics?.purpose,'afw.finite-budget-diagnostics.syn.v1','R0 missing attributable diagnostics after actual SDKcomplete1 + durable Reference +302');
  outcome.stage='unexpected-pass';
 }catch(error){
  outcome.assertionName=error?.name==='AssertionError'?'AssertionError':'setup-or-native-error';
  throw error;
 }finally{
  outcome.finishedAt=Date.now();
  await writeFile(join(directory,'outcome.json'),JSON.stringify(outcome,null,2));
 }
});
