
import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {monitoringCleanupScenario,readCleanupM,observeCleanupMDenial,O} from './fixtures/finite-owner-cleanup.mjs';
import {plain} from './fixtures/finite-first-connection-publication.mjs';
import {recoverCheckpoint,observeOriginalAlarm,writeCleanupEvidence,principalName,waitUntil,persistPartialCleanup} from './fixtures/finite-owner-cleanup-persistence.mjs';
const P='afw.finite-initial-cleanup.v1:',group=process.env.AFW_R2_GROUP??'g0',root=process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-'+group,fixtures=[];
after(async()=>{for(const f of fixtures)if(!f.disposed){if(f.sdkOnly)await f.sdkOnly.fetch(O+'/_fixture/sdk-only-release').catch(()=>{});await f.stub.ownerCleanupControl().catch(()=>{});await f.mf.dispose();f.disposed=true;}});
const pause=ms=>new Promise(r=>setTimeout(r,ms)),hash=v=>createHash('sha256').update(v).digest('hex');
const row=(facts,key)=>{const v=facts.rows.find(([k])=>k===P+key);return v?JSON.parse(v[1]):null;};
const cleanupRows=facts=>facts.rows.filter(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:'));
const cleanupReceipt=facts=>{const r=cleanupRows(facts).find(([k])=>k.endsWith(':receipt'));return r?JSON.parse(r[1]):null;};
async function recover(label,variant='principal',options={}){
 const f=await recoverCheckpoint(join(root,variant),{label,...options});fixtures.push(f);return f;
}
async function capture(f,label,facts){
 const native=await plain(f.stub.ownerCleanupNativeRows()),fault=await plain(f.stub.ownerCleanupFaultFacts());
 const receipt=cleanupReceipt(facts),state=row(facts,'state'),metrics={children:facts.children,sqlCalls:fault?.sqlCalls??0,sqlElapsedMs:fault?.sqlElapsedMs??0,kvLists:fault?.lists??0,kvDeletes:fault?.deletes??0,providerRequests:f.providerRegistry.requests.length-f.checkpoint.state.providerRegistry.requests.length};
 const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,...facts.finalInventoryProof?{finalInventoryProof:facts.finalInventoryProof}:{},failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
 {const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');const evidence=await persistBudgetEvidence({path:'output/owner-cleanup/'+label+'.json',full:result,testRevision:process.env.GITHUB_SHA??null,caseName:label,counts:{}});console.info('R2 native result',evidence.summary);}return {result,native,receipt,state};
}
function assertClosed(f,facts,capture){
 assert(facts.dbNow>=f.plan.C0);assert.equal(capture.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);
 assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId);assert(capture.receipt);assert.equal(capture.receipt.businessAccessClosed,true);assert.equal(capture.receipt.globalNativeDrainVerified,false);assert.equal(capture.receipt.sdkNamespaceEmptyVerified,false);
 assert(capture.native.fence?.fenced_at);assert(!capture.native.grant||capture.native.grant.revoked_at);if(capture.native.notices.some(e=>e.action==='grant'))assert.equal(capture.native.notices.at(-1).action,'revoke');
 assert.equal(f.kvSemanticProof.bothAliases,true);
}
let principal;
if(group==='g0'){
 test(principalName,async()=>{
  const f=await recover('g0-principal');assert.equal(f.checkpoint.variant,'principal');
  assert(f.checkpoint.facts.rows.some(([k])=>k.endsWith(':reference')));assert(f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')));
  const facts=await observeOriginalAlarm(f),observed=await capture(f,'principal',facts);principal={f,facts,observed};
  assertClosed(f,facts,observed);assert.equal(observed.receipt.sdkReductionReturned,true);
 });
 test('R2 originalSDKexpiry still permits exact historical reduction',async()=>{
  assert(principal,'shares the single untouched original occurrence');
  const {f,observed}=principal,ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]);
  const actual=f.checkpoint.sdkAfterExchange;assert(actual);assert.equal(ref.expiresAt,null,'historical pre-302 field remains absent');assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,hash(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);assert(Number.isSafeInteger(actual.expiresAt)&&actual.expiresAt*1000<=f.plan.C0);assert(actual.observedAt<f.plan.C0);
  assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash);assert(observed.receipt.sdkObservedHash);
  await writeCleanupEvidence('sdk-expiry-same-occurrence',{label:'same principal occurrence; no second revoke',referenceHash:ref.recordHash,selectorHash:hash(ref.sdkGrantId),referenceExpiresAt:ref.expiresAt,actualPostExchange:actual,C0:f.plan.C0,sdkObservedHash:observed.receipt.sdkObservedHash,operationalReadiness:false});
 });
 test('R2 fix1 absent current SDK grant uses original reference without absence ACK',async()=>{
  assert(principal);const {f,observed}=principal,reads=observed.result.fault.grantReads;
  assert.equal(reads.length,1,'bounded native current exact-key read required');assert.equal(reads[0].present,false);
  assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash&&observed.receipt.sdkObservedHash);
  await writeCleanupEvidence('fix1-absent-current-grant',{label:'same principal occurrence; native absence is not an ACK',source:process.env.GITHUB_SHA,C0:f.plan.C0,read:reads[0],receiptHash:observed.receipt.recordHash,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
 });
}
let pair;
async function paired(g,configure){
 if(!pair){pair=await Promise.all([recover(g+'-a',g==='g1'?'grant-before-link':'principal'),recover(g+'-b',g==='g1'?'notice-before-link':'principal')]);await configure?.(...pair);}
 return pair;
}
if(group==='g1'){
 test('R2 fence covers grant before link',async()=>{
  const [f]=await paired('g1');assert.equal(f.checkpoint.partialBoundary.sqlWrites,1);assert(!f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
  const facts=await observeOriginalAlarm(f),r=await capture(f,'grant-before-link',facts);assertClosed(f,facts,r);assert(r.native.grant.revoked_at);assert.equal(r.receipt.sdkReductionReturned,false);assert.equal(r.receipt.sdkSendHash,null);
 });
 test('R2 notice SQL without link is withdrawn',async()=>{
  const [,f]=await paired('g1');assert.equal(f.checkpoint.partialBoundary.sqlWrites,1);assert(!f.checkpoint.facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')));
  const facts=await observeOriginalAlarm(f),r=await capture(f,'notice-without-link',facts);assertClosed(f,facts,r);assert.deepEqual(r.native.notices.map(e=>e.action),['grant','revoke']);
 });
}
if(group==='g2'){
 const configured=()=>paired('g2',async(a,b)=>{a.providerRegistry.pointer={...a.providerRegistry.pointer,id:'99999999-9999-4999-8999-999999999999'};await b.stub.ownerCleanupFault('paging-scope');});
 test('R2 foreign pointer is preserved',async()=>{
  const [f]=await configured(),original=structuredClone(f.providerRegistry.pointer),facts=await observeOriginalAlarm(f),r=await capture(f,'foreign-pointer',facts);
  assert.notEqual(r.state.status,'complete');assert.deepEqual(f.providerRegistry.pointer,original);assert.equal(f.restores.length,0);assert.equal(r.native.fence.fenced_at,null);assert.equal(r.native.grant.revoked_at,'');
 });
 test('R2 SDK paging and scope fail before extra IO',async()=>{
  const [,f]=await configured(),facts=await observeOriginalAlarm(f),r=await capture(f,'sdk-paging-scope',facts);
  assert.notEqual(r.state.status,'complete');assert.equal(f.restores.length,1);assert.equal(r.receipt,null);
  assert.equal(r.result.fault.lists,2);assert.equal(r.result.fault.deletes,100);assert(r.result.fault.trace.filter(e=>e.kind==='list').every(e=>e.limit===100));assert(r.result.fault.trace.filter(e=>e.kind==='delete').every(e=>e.scope==='token'));
  const rows=cleanupRows(facts);assert(rows.some(([k])=>k.endsWith(':sdk_revoke:send')));assert(!rows.some(([k])=>k.endsWith(':sdk_revoke:observed')));
 });
}
if(group==='g3'){
 const configured=()=>paired('g3',async(a,b)=>{a.alarmMode='restore-ack-lost';await b.stub.ownerCleanupFault('fence-ack-lost');});
 test('R2 unknown restore acknowledgement cannot complete',async()=>{
  const [f]=await configured(),facts=await observeOriginalAlarm(f,{settled:3}),r=await capture(f,'unknown-restore-ack',facts);
  assert.equal(r.state.deliveries,3);assert.notEqual(r.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);assert(row(facts,'restore-send'));assert.equal(row(facts,'restore-ack'),null);assert.equal(r.receipt,null);
  assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId,'closed containment does not fabricate ACK');
 });
 test('R2 same fence identity is reconciled without replay',async()=>{
  const [,f]=await configured(),facts=await observeOriginalAlarm(f,{settled:3}),r=await capture(f,'same-fence-identity',facts);
  const issuer=facts.rows.filter(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')),send=JSON.parse(issuer.find(([k])=>k.endsWith(':close_fence:send'))[1]);
  assert.equal(r.native.fence.fence_request_id,send.requestId);assert.equal(r.result.fault.sqlWrites,1);assert(r.result.fault.reconciles>=2);assert(!issuer.some(([k])=>k.endsWith(':close_fence:ack')));assert(cleanupRows(facts).some(([k])=>k.includes(':reconciled:')));
  assert.equal(r.state.deliveries,3);assert.equal(r.receipt,null);assert.equal(f.restores.length,0);
 });
}
let restarted;
if(group==='g4'){
 test('R2 held SDK delete retains original cleanup',async()=>{
  const f=await recover('g4-held');await f.stub.ownerCleanupFault('held-sdk-delete');
  const until=f.plan.C0+35000;for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal());if(signal.held)break;assert(Date.now()<until,'intended real SDK delete hold reached');await pause(250);}
  const facts=await observeOriginalAlarm(f),r=await capture(f,'held-sdk-delete',facts);assert.notEqual(r.state.status,'complete');assert.equal(r.result.fault.held,true);
  assert.equal((await plain(f.stub.ownerCleanupScopeProbe())).available,false,'live native same-ctx probe excluded while actual cleanup held');
  await f.stub.ownerCleanupControl();
  for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal()),probe=await plain(f.stub.ownerCleanupScopeProbe());if(signal.settled&&probe.available)break;assert(Date.now()<f.plan.C0+45000,'held outward ACK actual settlement');await pause(100);}
  const saved='output/owner-cleanup/g4-partial';await persistPartialCleanup(f,saved);
  restarted=await recoverCheckpoint(saved,{label:'g4-restarted',restart:true});fixtures.push(restarted);
  assert.equal(restarted.plan.I0,f.plan.I0);assert.equal(restarted.plan.C1,f.plan.C1);assert.equal(row(await plain(restarted.stub.ownerCleanupFacts()),'state').deliveries,1);
 });
 test('R2 restart preserves slots and own uncertainty',async()=>{
  assert(restarted,'same real partial cleanup checkpoint');const f=restarted,facts=await observeOriginalAlarm(f,{settled:2}),r=await capture(f,'restart-own-uncertainty',facts);
  assert.equal(r.state.deliveries,3);assert.notEqual(r.state.status,'complete');assert.equal(facts.alarm,null);assert.equal(r.result.fault.deletes,0);assert.equal(f.restores.length,1);
  assert(cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:send')));assert(!cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')));assert.equal(r.receipt,null);
 });
}
if(group==='g5'){
 test('R2 late foreign-isolate KV cannot reopen business access',async()=>{
  const f=await recover('g5-late'),token=f.checkpoint.lateToken,expiry=f.checkpoint.sdkAfterExchange;assert.equal(typeof token?.access_token,'string');assert.equal(token.refresh_token,undefined);assert(f.sdkOnly&&expiry);
  const ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),m=f.checkpoint.options.workers.find(w=>w.name==='canary-first-connection');
  assert.equal(hash(m.script),f.checkpoint.build.M.sha256);assert.equal(m.bindings.AFW_DELEGATED_OAUTH_ENABLED,'true');assert.equal(m.bindings.AFW_OAUTH_REFRESH_ENABLED,'false');
  assert(expiry.tokenExpiresAt*1000-Date.now()>=65000,'genuine token alive after cold load');
  const positive=await readCleanupM(f.m,token.access_token,f.checkpoint.state.source.project.projectId);assert(positive.at<f.plan.C0);assert(positive.requests.some(r=>r.status===200));
  await waitUntil(f.plan.C0-75000);assert(expiry.tokenExpiresAt*1000-Date.now()>=65000,'do not issue with insufficient original token margin');
  const startedAt=Date.now(),request=f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subjectToken:token.access_token,sdkGrantId:ref.sdkGrantId,clientId:f.checkpoint.state.source.clientId,correlationHash:ref.correlationHash,referenceHash:ref.recordHash,C0:f.plan.C0})});
  const response=await request,deniedHeadersAt=Date.now();assert.equal(response.status,403,'logical denial at child deadline');const pendingBody=response.text();
  const before=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();
  assert(before.reached&&before.retained&&!before.settled,'actual SDK write must be held, not rejected early');assert.equal(before.logicalReason,'deadline');assert(before.reachedAt<before.childDeadline);assert(before.childDeadline-before.rootStartedAt<=5000);assert(before.rootDeadline-before.rootStartedAt<=30000);assert(before.logicalDeniedAt<f.plan.C0);assert.equal(before.selectorHash,expiry.selectorHash);assert.equal(before.tokenHash,expiry.tokenHash);
  const blocked=await f.sdkOnly.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST'});assert.equal(blocked.status,409,'same retained invocation excludes replacement');await blocked.body?.cancel();
  const facts=await observeOriginalAlarm(f),r=await capture(f,'late-isolate-business-closure',facts);assertClosed(f,facts,r);
  await f.sdkOnly.fetch(O+'/_fixture/sdk-only-release');const deniedBody=await pendingBody;
  const after=await (await f.sdkOnly.fetch(O+'/_fixture/sdk-only-signal')).json();assert(after.reached&&after.released&&after.settled&&!after.retained);assert(after.nativeReturned||after.nativeRejected);assert(after.nativeAttemptAt>=f.plan.C0);assert(!deniedBody.includes('access_token'));
  const negative=await observeCleanupMDenial(f.m,token.access_token,f.checkpoint.state.source.project.projectId,{C0:f.plan.C0});
  const outcome={label:'SYN adversarial SDK-only; not an M token-exchange admission',startedAt,deniedHeadersAt,C0:f.plan.C0,positive,negative,build:f.checkpoint.sdkOnlyBuild,before,after,denialBodyHash:hash(deniedBody),mcpWorker:'canary-first-connection',denialLayer:negative.classification.layer,expiry,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,operationalReadiness:false};
  {const {persistBudgetEvidence}=await import('./fixtures/finite-budget-evidence.mjs');const evidence=await persistBudgetEvidence({path:'output/owner-cleanup/'+'late-kv-actual-outcome'+'.json',full:outcome,testRevision:process.env.GITHUB_SHA??null,caseName:'late-kv-actual-outcome',counts:{}});console.info('R2 late M denial diagnostic',evidence.summary);}
  assert.deepEqual(negative.profile,positive.profile,'same original M script/config/namespace and wrapper');
  assert(negative.responses.some(r=>r.method==='POST'&&r.startedAt>=f.plan.C0),'real post-C0 M request recorded');
  assert.equal(negative.classification.dataDenied,true,'actual M data-denial contract, not initialize HTTP alone');
  assert.equal(hash(m.script),f.checkpoint.build.M.sha256);
 });
}

let fixPair,fixMatched;
async function fixCurrentPair(){
 if(!fixPair){
  fixPair=await Promise.all([recover('g6-matching'),recover('g6-conflicting')]);
  for(const f of fixPair){
   assert.equal(f.checkpoint.unexchanged,true);const ref=JSON.parse(f.checkpoint.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),native=await plain(f.stub.ownerCleanupNativeRows()),key='grant:'+native.grant.user_id+':'+ref.sdkGrantId;
   const raw=await f.kv.get(key),value=JSON.parse(raw),listed=await f.kv.list({prefix:key,limit:1});
   assert.equal(hash(raw),f.checkpoint.sdkUnexchanged.grantObjectHash);assert.equal(value.id,ref.sdkGrantId);assert.equal(value.expiresAt,undefined);
   assert.equal(listed.keys[0]?.name,key);assert.equal(listed.keys[0].expiration,f.checkpoint.sdkUnexchanged.nativeKVExpiration);assert(listed.keys[0].expiration*1000>f.plan.C0+120000);
   f.fixCurrent={key,keyHash:hash(key),originalHash:hash(raw),expiration:listed.keys[0].expiration};
  }
  const f=fixPair[1],value=JSON.parse(await f.kv.get(f.fixCurrent.key));
  value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};
  const untrusted=JSON.stringify(value);await f.kv.put(f.fixCurrent.key,untrusted,{expiration:f.fixCurrent.expiration});
  const listed=await f.kv.list({prefix:f.fixCurrent.key,limit:1});assert.equal(listed.keys[0].expiration,f.fixCurrent.expiration);assert.equal(await f.kv.get(f.fixCurrent.key),untrusted);
  f.fixCurrent={...f.fixCurrent,untrustedHash:hash(untrusted),modeledUntrustedState:true,admission:false};
 }
 return fixPair;
}
if(group==='g6'){
 test('R2 fix1 matching current native SDK grant is qualified before reduction',async()=>{
  const [f]=await fixCurrentPair(),facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-matching-current-grant',facts);fixMatched={f,facts,r};
  assertClosed(f,facts,r);assert.equal(r.receipt.sdkReductionReturned,true);assert.equal(await f.kv.get(f.fixCurrent.key),null);
  assert.equal(f.checkpoint.sdkUnexchanged.codeExchanged,false);assert.equal(f.checkpoint.sdkUnexchanged.referenceExpiresAt,null);
  const proof=facts.finalInventoryProof,observed=JSON.parse(cleanupRows(facts).find(([k])=>k.endsWith(':sdk_revoke:observed'))[1]);
  assert(proof,'actual finalFactsHash input must include newly read inventory');assert.equal(proof.committedHash,r.receipt.finalFactsHash);
  assert(proof.enteredAt>=observed.observedAt&&proof.observedAt>=proof.enteredAt&&r.receipt.observedAt>=proof.observedAt);
  assert.equal(proof.workflow.workflowCount,3);assert(proof.workflow.instances.every(x=>['complete','errored','terminated'].includes(x.status)));assert.equal(proof.container.activeCount,0);
  assert.equal(proof.schedulesAndTails.length,4);assert(proof.schedulesAndTails.every(x=>x.count===0));assert.equal(proof.operator.closed,true);assert.equal(proof.baseline.recoverable,true);
  assert.equal(proof.baseline.versionId,r.receipt.baselineVersionId);assert.equal(proof.baseline.deploymentId,r.receipt.baselineDeploymentId);assert(proof.requestTimes.every(x=>x.observedAt>=proof.enteredAt&&x.observedAt<=proof.observedAt));
  assert.equal(r.result.fault.grantReads.length,1);assert.equal(r.result.fault.grantReads[0].present,true);

 });
 test('R2 fix1 foreign current SDK object is preserved with zero deletes',async()=>{
  const [,f]=await fixCurrentPair(),facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-foreign-current-grant',facts),remaining=await f.kv.get(f.fixCurrent.key);
  await writeCleanupEvidence('fix1-foreign-current-preservation',{label:'untrusted modeled current KV content; no new grant authority',source:process.env.GITHUB_SHA,...f.fixCurrent,key:undefined,currentHash:remaining===null?null:hash(remaining),deletes:r.result.fault.deletes,receiptHash:r.receipt?.recordHash??null});
  assert.equal(r.result.fault.deletes,0,'conflicting current native object must cause zero SDK deletes');
  assert.equal(hash(remaining),f.fixCurrent.untrustedHash);assert.notEqual(r.state.status,'complete');assert.equal(r.receipt,null);
  assert(!cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')));
 });
 test('R2 fix1 completed reentry rejects fresh inventory drift without rewriting history',async()=>{
  assert(fixMatched);const {f}=fixMatched;assert(Date.now()<f.plan.C1);const before=await plain(f.stub.ownerCleanupFacts()),effects=f.restores.length,requests=f.providerRegistry.requests.length;
  const control=await plain(f.stub.ownerCleanupReenter());assert.equal(control.status,'restored');const stable=await plain(f.stub.ownerCleanupFacts());assert.deepEqual(stable.rows,before.rows);assert.equal(stable.alarm,before.alarm);
  f.inventoryMode='waiting';const changedAt=Date.now(),denied=await plain(f.stub.ownerCleanupReenter()),after=await plain(f.stub.ownerCleanupFacts());
  await writeCleanupEvidence('fix1-completed-reentry',{label:'explicit same alarm entry inspection; not another scheduled delivery or admission',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,changedAt,control:control.status,result:denied.status,rowsUnchanged:JSON.stringify(after.rows)===JSON.stringify(before.rows),state:row(after,'state'),alarm:after.alarm,historicalReceiptHash:cleanupReceipt(after)?.recordHash,restoresBefore:effects,restoresAfter:f.restores.length,providerWrites:f.providerRegistry.requests.slice(requests).filter(x=>x.method!=='GET').length,inventoryMode:f.inventoryMode});
  assert.equal(denied.status,'admin_pending','already-complete entry must reject new active Workflow inventory');
  assert.deepEqual(after.rows,before.rows);assert.equal(after.alarm,before.alarm);assert.equal(f.restores.length,effects);assert.equal(f.providerRegistry.requests.slice(requests).filter(x=>x.method!=='GET').length,0);assert.equal(f.inventoryMode,'waiting');
 });
}
if(group==='g7'){
 test('R2 fix1 post-restore inventory drift during retained SDK blocks both completions',async()=>{
  const f=await recover('g7-inventory-drift');await f.stub.ownerCleanupFault('inventory-drift');
  for(;;){const signal=await plain(f.stub.ownerCleanupFaultSignal());if(signal.held)break;assert(Date.now()<f.plan.C0+30000,'real native SDK hold must be reached');await pause(50);}
  assert.equal(f.restores.length,1,'drift occurs after real restore');const changedAt=Date.now();f.inventoryMode='waiting';await f.stub.ownerCleanupControl();
  const facts=await observeOriginalAlarm(f),r=await capture(f,'fix1-post-sdk-inventory-drift',facts),fault=r.result.fault;
  await writeCleanupEvidence('fix1-post-sdk-inventory-premise',{label:'modeled Workflow becomes active after restore while real SDK ACK pending',source:process.env.GITHUB_SHA,C0:f.plan.C0,changedAt,heldAt:fault.heldAt,settledAt:fault.settledAt,settled:fault.settled,holdMs:fault.settledAt-fault.heldAt,inventoryMode:f.inventoryMode,sdkObserved:cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')),state:r.state.status,ownerReceiptHash:r.receipt?.recordHash??null,initialReceiptHash:row(facts,'receipt')?.recordHash??null});
  assert(fault.settled&&fault.heldAt<=changedAt&&changedAt<=fault.settledAt&&fault.settledAt-fault.heldAt<3500,'bounded actual hold/release premise');
  assert(cleanupRows(facts).some(([k])=>k.endsWith(':sdk_revoke:observed')),'real SDK returned before final inventory');
  assert.equal(r.receipt,null,'fresh post-SDK inventory must prevent owner receipt');assert.equal(row(facts,'receipt'),null);assert.notEqual(r.state.status,'complete');assert.equal(f.inventoryMode,'waiting');assert.equal(f.restores.length,1);
 });
}

if(group==='components'){
test('R2 native monitoring revoke binds original consent and preserves unrelated rows',async t=>{
 const r=await monitoringCleanupScenario(t,'normal');assert.equal(r.rejected,false);assert.equal(r.result.status,'applied');assert.equal(r.after.length,3);assert.deepEqual(r.after.slice(0,2),r.before);assert.equal(r.result.row.grant_id,r.before[1].grant_id);assert.equal(r.result.row.action,'revoke');assert.equal(r.result.row.issued_at,r.result.row.expires_at);assert(r.result.row.issued_at>=r.at);assert.equal(r.noUpdate,true);assert.equal(r.noDelete,true);
 const reads=r.events.filter(e=>e.sql?.includes('SELECT v.*'));assert(reads.length>=2);for(const e of reads)assert.equal(r.events.find(x=>x.sid===e.sid),e,'fresh first-primary SELECT');
});
test('R2 native monitoring revoke preserves prior withdrawal',async t=>{
 const r=await monitoringCleanupScenario(t,'prior');assert.equal(r.rejected,false);assert.equal(r.result.status,'already_withdrawn');assert.deepEqual(r.after,r.before);assert.deepEqual(r.result.row,r.before.at(-1));assert.equal(r.writes,0);
});
test('R2 native monitoring revoke rejects foreign revision and sequence',async t=>{
 for(const mode of ['revision','sequence']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
});
test('R2 native monitoring revoke enforces native C1 and child window',async t=>{
 for(const mode of ['C1','window']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
});
test('R2 native monitoring revoke unknown acknowledgement cannot become observed',async t=>{
 const r=await monitoringCleanupScenario(t,'unknown');assert.equal(r.rejected,true);assert.equal(r.result,null);assert.equal(r.after.length,r.before.length+1,'actual native append survived lost response');assert(r.send);assert.equal(r.observed,null);assert.equal(r.retryDenied,true);assert.equal(r.writes,1);
});

}
