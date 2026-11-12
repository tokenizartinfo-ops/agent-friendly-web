import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
import {join} from 'node:path';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';

import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './fixtures/finite-budget-evidence.mjs';

const group=process.env.AFW_BUDGET_GROUP;
if(group!==undefined&&!['red','positive'].includes(group))throw Error('SYN budget group unsupported before I0');
const directory='output/finite-budget/red',hash=bytes=>createHash('sha256').update(bytes).digest('hex');
if(group==='red')test('R0 attributable diagnostics after genuine SDK complete and durable Reference',{timeout:180000},async t=>{
 await mkdir(directory,{recursive:true});
 const source=process.env.GITHUB_SHA;assert.match(source??'',/^[a-f0-9]{40}$/);
 const outcome={purpose:'afw.finite-budget-red-outcome.syn.v1',source,caseName:'R0',startedAt:Date.now(),stage:'fixture',actualCompleteNormal:null,referenceHash:null,responseStatus:null,diagnosticsPurpose:null,expectedDeficitObserved:false,operationalReadiness:false,completePackage:false,PCoff:false};
 try{
  const f=await ownerReferenceFixture(t);
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

if(group==='positive')test('P1 original 900s native lifecycle proves observed metrics and any complete retained traces',{timeout:300000},async()=>{
 const {runBudgetConsumer}=await import('./fixtures/finite-budget-world.mjs');
 const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');
 const result=await runBudgetConsumer('positive',process.env.AFW_BUDGET_CHECKPOINT??'output/finite-budget/checkpoint');
 const evidence=await persistBudgetEvidence({path:'output/finite-budget/positive/full-result.json',full:result,testRevision:process.env.GITHUB_SHA,caseName:'P1',counts:{tests:1}});
 console.info('P1 native budget evidence',evidence.summary);
 const {facts,plan,native}=result,P='afw.finite-initial-cleanup.v1:';
 const state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]),receipt=JSON.parse(facts.rows.find(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'))[1]);
 assert.equal(plan.C0,plan.I0+900000);assert.equal(plan.C1,plan.C0+180000);
 assert(result.recovery.ready<=plan.C0-30000);assert(facts.dbNow>=plan.C0);assert.equal(facts.alarm,null);assert.equal(state.status,'complete');assert.equal(result.restores,1);
 assert.equal(result.pointer.versions[0].version_id,plan.baselineVersionId);assert.equal(result.kvSemanticProof.bothAliases,true);
 assert.equal(receipt.businessAccessClosed,true);assert.equal(receipt.sdkReductionReturned,true);assert(receipt.sdkSendHash&&receipt.sdkObservedHash);
 assert.equal(receipt.globalNativeDrainVerified,false);assert.equal(receipt.sdkNamespaceEmptyVerified,false);
 assert(native.fence.fenced_at);assert(!native.grant||native.grant.revoked_at);assert.deepEqual(native.notices.map(n=>n.action),['grant','revoke']);assert(facts.finalInventoryProof);
 assert.equal(result.producer.completeNormal,1);assert.equal(result.producer.referenceRows,1);assert(result.producer.referenceReadbacks>0);assert(result.sdkAfterExchange);assert(result.sdkAfterExchange.expiresAt*1000<=plan.C0);
 const epochs=result.diagnostics.epochs,identities=new Set(),phases=new Set(),roles=new Set();
 verifyPositiveBudgetEpochInventory(epochs);
 assert(epochs.some(e=>e.segment==='producer'));assert(epochs.some(e=>e.segment==='consumer'));
 for(const epoch of epochs){
  const key=epoch.segment+'|'+epoch.epoch+'|'+epoch.role;assert(!identities.has(key));identities.add(key);roles.add(epoch.role);
  const s=epoch.snapshot;assert.equal(s.testRevision,process.env.GITHUB_SHA);assert.equal(s.workerRole,epoch.role);
  const observed=verifyObservedBudgetMetrics(s),full=s.retention.traceComplete?verifyCompleteBudgetTrace(s):null;
  for(const group of s.byPhaseResource)if(group.nativeStarted>0)phases.add(group.phase);
  console.info('P1 SYN proof',JSON.stringify({segment:epoch.segment,epoch:epoch.epoch,role:epoch.role,observed,full,retention:s.retention}));
 }
 assert.deepEqual([...roles].sort(),['M','QA']);
 assert.deepEqual([...phases].sort(),['setup','authorize_get','authorize_post','sdk_lookup','token_exchange','mcp_read','monitoring_get','monitoring_post','cleanup_before_restore','restore','sdk_reduction','final_inventory'].sort());
 for(const role of roles)assert(epochs.some(e=>e.role===role&&e.snapshot.rows.length>0));
});
