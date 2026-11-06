
import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {monitoringCleanupScenario,O} from './fixtures/finite-owner-cleanup.mjs';
import {plain} from './fixtures/finite-first-connection-publication.mjs';
import {recoverCheckpoint,observeOriginalAlarm,writeCleanupEvidence,principalName,waitUntil,persistPartialCleanup} from './fixtures/finite-owner-cleanup-persistence.mjs';
const P='afw.finite-initial-cleanup.v1:',group=process.env.AFW_R2_GROUP??'g0',root=process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-'+group,fixtures=[];
after(async()=>{for(const f of fixtures)if(!f.disposed){await f.stub.ownerCleanupControl().catch(()=>{});await f.mf.dispose();f.disposed=true;}});
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
 const result={purpose:'afw.owner-cleanup-native-result.syn.v1',label,source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,kvSemanticProof:f.kvSemanticProof,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownerCleanupSuffixes:cleanupRows(facts).map(([k])=>k.split(':').slice(2).join(':')),receipt,metrics,failures:facts.failures,fault,native:{fenced:!!native.fence?.fenced_at,grantPresent:!!native.grant,grantRevoked:!!native.grant?.revoked_at,noticeActions:native.notices.map(x=>x.action)},operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,modeledProviderInput:f.checkpoint.modeledProviderInput};
 await writeCleanupEvidence(label,result);console.info('R2 native result',JSON.stringify(result));return {result,native,receipt,state};
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
  assert.notEqual(ref.expiresAt,null);assert(ref.expiresAt*1000<=f.plan.C0,'actual SDK Reference expiry precedes original C0');
  assert.equal(observed.receipt.sdkReductionReturned,true);assert(observed.receipt.sdkSendHash);assert(observed.receipt.sdkObservedHash);
  await writeCleanupEvidence('sdk-expiry-same-occurrence',{label:'same principal occurrence; no second revoke',referenceHash:ref.recordHash,selectorHash:hash(ref.sdkGrantId),expiresAt:ref.expiresAt,C0:f.plan.C0,sdkObservedHash:observed.receipt.sdkObservedHash,operationalReadiness:false});
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
  const f=await recover('g5-late'),token=f.checkpoint.lateToken;assert.equal(typeof token?.refresh_token,'string','actual prior SDK refresh selector required');
  assert.equal((await f.negative.fetch(O+'/_fixture/r2-late-arm')).status,204);
  await waitUntil(f.plan.C0-2000);const startedAt=Date.now();assert(startedAt<f.plan.C0);
  const actual=f.negative.fetch(O+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',client_id:f.checkpoint.state.source.clientId,refresh_token:token.refresh_token,resource:O+'/mcp'})}).then(async response=>({status:response.status,bodyHash:hash(await response.text()),finishedAt:Date.now()}));
  const facts=await observeOriginalAlarm(f),r=await capture(f,'late-isolate-business-closure',facts);assertClosed(f,facts,r);
  const before=await (await f.negative.fetch(O+'/_fixture/r2-late-signal')).json();
  await f.negative.fetch(O+'/_fixture/r2-late-release');const outcome=await actual,after=await (await f.negative.fetch(O+'/_fixture/r2-late-signal')).json();
  assert.notEqual(outcome.status,200,'actual token response is denied after expiry or fence');
  const mcp=await f.mf.dispatchFetch(O+'/mcp',{method:'POST',headers:{Authorization:'Bearer '+token.access_token,'Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'SYN-late-denial',version:'1'}}})});
  const mcpBody=await mcp.text();assert([401,403,503].includes(mcp.status));assert(!mcpBody.includes(f.checkpoint.state.source.project.projectId));
  await writeCleanupEvidence('late-kv-actual-outcome',{label:'actual other-isolate request; no successful late write fabricated',startedAt,C0:f.plan.C0,before,after,outcome,mcpStatus:mcp.status,mcpBodyHash:hash(mcpBody),globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false,operationalReadiness:false});
 });
}

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
