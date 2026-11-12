import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
import {join} from 'node:path';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference} from './fixtures/finite-owner-cleanup.mjs';

import {verifyObservedBudgetMetrics,verifyCompleteBudgetTrace,verifyPositiveBudgetEpochInventory} from './fixtures/finite-budget-evidence.mjs';

const group=process.env.AFW_BUDGET_GROUP;
if(group!==undefined&&!['red','positive','readonly','reduction_a','reduction_b'].includes(group))throw Error('SYN budget group unsupported before I0');
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


// Fixed owned SYN cases. No producer, clock or SDK work occurs without an
// explicitly selected native group; the preparation workflow does not run it.
if(group==='readonly'){
 for(const name of ['R1','R2','R3'])test(name+' fixed original SDK readonly budget',{timeout:120000},async()=>{
  const {runBudgetReadonlyCase}=await import('./fixtures/finite-budget-world.mjs');
  const result=await runBudgetReadonlyCase(name),f=result.facts;
  assert.equal(result.caseName,name);assert.equal(f.completeWrites,1);assert.equal(f.completeNormal,1);
  assert.equal(f.input.entries,name==='R2'?201:200);
  assert.equal(f.input.correlations,1);assert.equal(f.input.expirationPreserved,true);
  assert.equal(f.foreignUnchanged,true);assert(f.lists<=2&&f.gets<=200&&f.scopePeak<=2);
  assert.equal(f.sdkReplay,0);assert.equal(f.nativeUnsettled,0);assert.equal(f.outwardPending,0);
  if(name==='R1'){assert.equal(f.lists,2);assert.equal(f.gets,200);assert.equal(f.scopePeak,2);assert.equal(f.responseStatus,302);assert.equal(f.referenceRows,1);assert.equal(f.referenceBefore302,true);}
  else{assert.notEqual(f.responseStatus,302);assert.equal(f.referenceRows,0);assert.equal(f.thirdListEntered,false);}
  if(name==='R3'){
   assert.equal(f.holdLabel,'holdpostnativeACK');assert.equal(f.heldNativeSettled,2);assert(f.queuedAtHold>0);
   assert.equal(f.rootBefore.available,true);assert.equal(f.rootDuring.available,false);assert.equal(f.rootDuring.live,true);assert.equal(f.rootAfter.available,true);
   assert(f.originalChildElapsedMs>=4900&&f.originalChildElapsedMs<10000);
   assert.equal(f.callsAfterRelease,0);assert.equal(f.lateReference,false);
  }
  assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
 });
}
if(group==='reduction_a'||group==='reduction_b'){
 let pair;
 before(async()=>{const {prepareBudgetReductionPair}=await import('./fixtures/finite-budget-world.mjs');pair=await prepareBudgetReductionPair(group,process.env.AFW_BUDGET_CHECKPOINT??'output/finite-budget/checkpoint');});
 after(async()=>{if(pair)await pair.dispose();});
 for(const name of group==='reduction_a'?['D1','D2']:['D3','D4'])test(name+' fixed original SDK reduction budget',{timeout:300000},async()=>{
  const result=await pair.result(name),f=result.facts;
  assert.equal(result.caseName,name);assert.equal(result.plan.C0,result.plan.I0+900000);assert.equal(result.plan.C1,result.plan.C0+180000);
  assert.equal(result.producer.unexchanged,true);assert.equal(result.producer.codeExchanged,false);assert.equal(result.producer.normalComplete,1);
  assert.equal(result.producer.sameCheckpoint,true);assert.equal(result.producer.consumerGroup,group);
  assert.equal(result.recovery.pairSize,2);assert(result.recovery.pairReady<=result.plan.C0-30000);assert.equal(result.recovery.restart,false);
  assert.equal(result.recovery.coldInventoryVerified,true);assert.equal(result.recovery.bothAliases,true);
  assert.equal(f.input.ownTokens,name==='D2'?200:name==='D3'?201:199);assert.equal(f.input.expirationPreserved,true);assert.equal(f.foreignUnchanged,true);
  assert(f.lists<=2&&f.deletes<=200&&f.scopePeak<=2);assert.equal(f.sdkReplay,0);
  if(name==='D1'){assert.equal(f.deletes,200);assert.equal(f.grantRemaining,false);assert.equal(f.sdkReturned,true);assert.equal(f.sdkObserved,true);assert.equal(f.ownerReceipt,true);assert.equal(f.completed,true);}
  else{assert.equal(f.sdkReturned,false);assert.equal(f.sdkObserved,false);assert.equal(f.ownerReceipt,false);assert.equal(f.completed,false);assert.equal(f.uncertainSendRetried,false);}
  if(name==='D2'){assert.equal(f.deletes,200);assert.equal(f.grantRemaining,true);assert.equal(f.grantDeleteEntered,false);}
  if(name==='D3'){assert.equal(f.thirdListEntered,false);assert.equal(f.grantRemaining,true);assert.equal(f.pendingPreserved,true);}
  if(name==='D4'){
   assert.equal(f.holdLabel,'holdpostnativeACK');assert.equal(f.heldNativeSettled,2);assert(f.queuedAtHold>0);
   assert.equal(f.rootBefore.available,true);assert.equal(f.rootDuring.available,false);assert.equal(f.rootDuring.live,true);assert.equal(f.rootAfter.available,true);
   assert(f.originalChildElapsedMs>=4900&&f.originalChildElapsedMs<10000);assert.equal(f.callsAfterRelease,0);assert.equal(f.falseSdkReturn,false);
  }
  assert.equal(result.operationalReadiness,false);assert.equal(result.completePackage,false);assert.equal(result.PCoff,false);
 });
}
