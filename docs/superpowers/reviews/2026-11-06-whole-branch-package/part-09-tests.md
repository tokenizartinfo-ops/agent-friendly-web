# Whole-branch review packet 9/26 — tests

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 17 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- test/mcp-qa-finite-preparation-notice-native.test.mjs: ABSENT -> f210a1807a923310dd71934131989d89440c68e8; full diff chars=13483
- test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs: ABSENT -> 94a6208106212e28139cbdcf3a3c277b97ba124d; full diff chars=9711
- test/mcp-qa-finite-preparation-notice-provenance.test.mjs: ABSENT -> ad89f394e4ee467f36efc919c3863bab3166afb0; full diff chars=6903
- test/mcp-qa-finite-preparation-records.test.mjs: ABSENT -> d01b8d8e56c7bb7a010201c0f7fa0f1f5d78151f; full diff chars=14055
- test/mcp-qa-finite-preparation-store-native.test.mjs: ABSENT -> 45dcc5c54f8557f3ed9bee7e4ff25556d3e17541; full diff chars=13699
- test/mcp-qa-finite-profile-native.test.mjs: ABSENT -> e49c1be3a6254fa70f6261457c0b2a8c5dad920f; full diff chars=8698
- test/mcp-qa-finite-profile.test.mjs: ABSENT -> 3f05f8524e19cf20347100e5cd79cc2f063c2a1c; full diff chars=13397
- test/mcp-qa-finite-publication-bridge.test.mjs: ABSENT -> 62d8474b4968e1d9d3e6635bf639a0575b044d96; full diff chars=4066
- test/mcp-qa-finite-read-rpc-native.test.mjs: ABSENT -> e4a3ef869cd263e7e09770927dd90fd72ca4fbd6; full diff chars=3748
- test/mcp-qa-finite-seed-http.test.mjs: ABSENT -> 8a08c6b1c6152e1b2746bd2352af1afe12abc170; full diff chars=4375
- test/mcp-qa-finite-seed-issuer.test.mjs: ABSENT -> 680ec3786d27f9f677ba1e5dc41f50ca94c8e181; full diff chars=6446
- test/mcp-qa-finite-seed.test.mjs: ABSENT -> b7c033a494a54b4c155e85a188d651f61bd2eb30; full diff chars=14251
- test/mcp-qa-finite-trial-control-native.test.mjs: ABSENT -> e52b8e05a93ffef2623fd42714e092d93246b450; full diff chars=12276
- test/mcp-qa-finite-trial-control.test.mjs: ABSENT -> 976d5e83b4ad3aa53320b3f0066c51f867669c33; full diff chars=24312
- test/mcp-qa-finite-trial-guard.test.mjs: ABSENT -> 5e7413bc692268f2f23e9cdaf41cbb39623a0bd1; full diff chars=7790
- test/mcp-release-finite-known-cancellation-native.test.mjs: ABSENT -> ea01c70a67e9f9fb113c41af9247ec953fb800a5; full diff chars=7130
- test/mcp-release-finite-known-cancellation.test.mjs: ABSENT -> 78de36c93129b464c711c08d6a482486273ccafc; full diff chars=21944

## test/mcp-qa-finite-preparation-notice-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-notice-native.test.mjs b/test/mcp-qa-finite-preparation-notice-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-native.test.mjs
@@ -0,0 +1,103 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import * as issuer from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
+const statements=text=>text.replace(/^--.*$/gm,'').trim().split(/;\s*(?=CREATE|$)/).map(x=>x.trim()).filter(Boolean);
+const monitoringSchema=(await Promise.all(['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].map(path=>readFile(path,'utf8')))).flatMap(statements);
+const normalize=sql=>sql.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
+// One compilation for this entire file; the original issuer runner remains unchanged.
+const built=await build({entryPoints:['test/fixtures/finite-preparation-issuer-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+console.log('SYN notice fixture compilations=1 bytes='+built.outputFiles[0].contents.length);
+let serial=0;
+async function scenario(t,name,extra={}){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-notice-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-notice-'+serial}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,monitoringSchema,...extra})});
+ assert.equal(response.status,200);return response.json();
+}
+function causal(r,i){
+ assert.equal(r.open.status,'applied');assert.equal(r.authorization.status,'applied');assert.equal(r.consumed,true);assert.equal(r.grant.status,'applied');assert.equal(r.grant.row.id,i.grantId);
+ assert.equal(r.error,undefined,'native grant reached; monitoring invocation: '+r.error);
+}
+test('REAL first notice uses native original issuer grant and observed ticket',async t=>{
+ const {result:r,identity:i,events}=await scenario(t,'notice-positive');causal(r,i);
+ assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.consent.status,'applied');
+ assert.equal(r.consent.row.expires_at,r.ticket.row.permission_expires_at);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
+ assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,1);assert.equal(r.rows.consents.results.length,1);assert.equal(r.rows.grants.results.length,1);assert.equal(r.grantUnchanged,true);
+ assert.equal(r.consent.row.grant_id,i.grantId);assert.equal(r.secondDenied,true);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.witnessFrozen,true);assert.equal(r.resultFrozen,true);
+ const reads=events.filter(e=>e.sql?.includes('SELECT t.*'));assert.equal(reads.length,1);
+ for(const read of reads){assert.equal(events.find(e=>e.sid===read.sid),read,'ticket SELECT is first statement in fresh primary');assert.equal(events.find(e=>e.session===read.sid).mode,'first-primary');assert.ok(events.some(e=>e.sid<read.sid&&e.sql?.includes('PRAGMA table_info(dossier_monitoring_owner_tickets)')));}
+ assert.deepEqual(Object.keys(r.ticket.row).sort(),'handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ').sort());
+ assert.deepEqual(Object.keys(r.consent.row).sort(),'sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ').sort());
+ assert.ok(Number.isSafeInteger(r.consent.row.issued_at));assert.ok(r.consent.row.issued_at>=r.ticketData.issuedAt);
+ assert.ok(events.find(e=>e.sql?.includes('INSERT INTO dossier_monitoring_consent_events')).sql.includes('n.ms'));
+});
+test('REAL first notice keeps absolute permission beyond child window',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-absolute');causal(r,i);
+ assert.equal(r.consent.status,'applied');assert.equal(r.consent.row.expires_at,r.ticketData.permissionExpiresAt);assert.ok(r.consent.row.expires_at-r.ticketData.issuedAt>=10000);
+ assert.ok(r.commonWindow.deadline-r.commonWindow.startedAt<=5000);assert.ok(r.consent.row.expires_at>r.commonWindow.deadline);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
+});
+test('REAL global sequence is not per-grant plus one',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-global');causal(r,i);assert.equal(r.priorMax,0);assert.ok(r.consent.row.sequence>1);assert.equal(r.eventsRows.length,3);assert.equal(r.counts.notices,1);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.eventsRows.filter(x=>x.grant_id!==i.grantId).length,2);
+});
+test('REAL schema metadata equals unchanged original seven statements',()=>{
+ assert.equal(Object.isFrozen(issuer.FINITE_PREPARATION_MONITORING_SCHEMA),true);assert.equal(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.length,7);assert.deepEqual(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.map(normalize),monitoringSchema.map(normalize));
+});
+for(const fault of ['clone','json','row','store','lease','getter','witness-getter','symbol','prototype','sparse','oversize','depth','extra','args-missing','args-extra','identity','grant-scopes','grant-created','grant-expires','consumed','Access','preconnection','started','deadline'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-hostile',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);assert.equal(r.counts.notices,0);
+});
+for(const method of ['insertMonitoringTicket','observeMonitoringTicket'])for(const fault of ['missing','extra','ticket-getter','symbol','extra-key','ticket-key','window-key','grant-key','cap'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+method+' '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-signatures',{method,fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);
+});
+for(const fault of ['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt'])test('REAL native notice current tuple races deny at commit altered ticket DATA '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-ticket-data',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.ok(r.denied||r.witness===null);assert.equal(r.newWrites,0);assert.equal(r.counts.notices,0);
+});
+for(const target of ['ticket','consent'])for(const fault of ['owner','revision','user_id','project_id','client_id','resource','scopes_json','revoked_at','created_at','expires_at','exchanged_at','auth','fence','event',...(target==='consent'?['ticket']:[])])test('REAL native notice current tuple races deny at commit '+target+' '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-race',{target,fault});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,fault==='event'?1:0);assert.equal(r.counts.tickets,target==='ticket'?0:1);assert.equal(r.rows.grants.results.length,1);
+ if(fault==='ticket'){assert.equal(r.ordinaryUpdateDenied,true);assert.equal(r.synSchemaTamperAfterPreflight,true);}
+});
+for(const fault of ['missing-consent','missing-ticket','constraint','unique','index','trigger','extra','type','clock','iso'])test('REAL monitoring preflight denies missing or changed original schema '+fault,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-schema',{fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);
+});
+for(const target of ['ticket','consent'])test('REAL queued monitoring INSERT denies after native deadline '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-queue',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+});
+for(const target of ['ticket','consent'])for(const ceiling of ['C0','consent','grant','Access','preconnection','ticket','permission'])test('REAL queued monitoring INSERT denies earliest '+ceiling+' '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-queue',{target,ceiling});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+ assert.equal(r.ceilings[ceiling],r.minimum);console.log('SYN ceiling '+target+' '+ceiling+' minimum='+r.minimum+' ties='+r.ties.join(',')+' gate='+r.gateAt);
+});
+for(const target of ['ticket','consent'])test('REAL original issuer barrier beats queued monitoring INSERT '+target,async t=>{
+ const {result:r,identity:i,events}=await scenario(t,'notice-barrier',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.primaryBarrierCompleted,true);assert.equal(r.barrier.status,'fenced');assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
+ const read=events.find(e=>e.sql?.includes('SELECT f.*'));assert.ok(read);assert.equal(events.find(e=>e.sid===read.sid),read);
+});
+test('REAL issued notice remains historical after original grant reduction',async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-reduction');causal(r,i);assert.equal(r.consent.status,'applied');assert.equal(r.enabledBefore,true);assert.equal(r.enabledAfterClose,true);assert.equal(r.revoke.status,'revoked');assert.equal(r.resolverDeniedAfterRevoke,true);assert.equal(r.counts.notices,1);assert.equal(r.rows.grants.results.length,1);assert.ok(r.rows.grants.results[0].revoked_at);
+});
+for(const target of ['ticket','consent'])test('REAL post-commit notice ACK loss blocks another write in this store '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-ack',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pending.rejected,true);for(const k of ['ticketRetryDenied','consentRetryDenied','observationDenied'])assert.equal(r[k],true,k);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
+});
+for(const target of ['ticket','consent'])test('REAL held native SQL settlement cannot become successful cancellation '+target,async t=>{
+ const {result:r,identity:i}=await scenario(t,'notice-held',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.pending.rejected,true);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
+});
+
+for(const [name,kind] of [
+ ['REAL concurrent monitoring failure blocks pending consent before INSERT','notice-concurrent-before'],
+ ['REAL concurrent monitoring failure blocks pending ticket observation','notice-concurrent-observation'],
+ ['REAL concurrent monitoring failure cannot return applied after emitted consent','notice-concurrent-after']
+])test(name,async t=>{
+ const {result:r,identity:i}=await scenario(t,kind);causal(r,i);
+ assert.equal(r.ticketCommitGate,true);assert.equal(r.ticketGateBeforeDeadline,true);
+ assert.equal(r.boundaryGate,true);assert.equal(r.boundaryBeforeDeadline,true);
+ assert.equal(r.ticketFailure.rejected,true);assert.equal(r.failureKnown,true);
+ assert.ok(r.failureAt>=r.boundaryAt);assert.equal(r.pendingAfterFailure,true,'original pending operation retained until native gate settles');
+ if(kind==='notice-concurrent-after'){assert.equal(r.nativeBoundaryRow,true);assert.equal(r.emittedBeforeRelease,1);assert.equal(r.counts.notices,1);}
+ else if(kind==='notice-concurrent-observation'){assert.equal(r.nativeObservationRow,true);assert.equal(r.emittedBeforeRelease,0);}
+ else{assert.equal(r.observed,true);assert.equal(r.emittedBeforeRelease,0);}
+ assert.equal(r.pending.rejected,true,'known mutation failure must absorb concurrent result');
+ assert.equal(r.pending.value,undefined,'no late witness/applied result');
+ assert.equal(r.newEmissionsAfterFailure,0,'no new native monitoring SQL emitted after known failure');
+ assert.equal(r.consentEmitted,kind==='notice-concurrent-after'?1:0);
+ assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,kind==='notice-concurrent-after'?1:0);
+ console.log('SYN concurrent '+kind+' ticketGate='+r.ticketGateBeforeDeadline+' boundaryGate='+r.boundaryBeforeDeadline+' failureKnown='+r.failureKnown+' emitted='+r.consentEmitted+' afterFailure='+r.newEmissionsAfterFailure+' persisted='+r.counts.notices);
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs b/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs
@@ -0,0 +1,62 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {initialHash as hash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+const built=await build({entryPoints:['test/fixtures/finite-preparation-notice-provenance-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+console.log('SYN notice provenance fixture compilations=1 bytes='+built.outputFiles[0].contents.length+' sha256='+createHash('sha256').update(built.outputFiles[0].contents).digest('hex'));
+let serial=0;
+async function scenario(t,name='positive',extra={}){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-provenance-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteNoticeProvenanceFixture',useSQLite:true,uniqueKey:'SYN-provenance-'+serial}}}));
+ t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,...extra})});
+ assert.equal(response.status,200);const {result:r,identity:i}=await response.json();
+ assert.equal(r.grant?.row.id,i.grantId);assert.equal(r.reachedNativeGrant,true);assert.equal(r.error,undefined,'native grant reached; journal failure: '+r.error);return r;
+}
+function recorded(r){assert.equal(r.reservation.status,'recorded');assert.equal(r.reservationReplay.status,'existing');assert.equal(r.reservationConflict.status,'uncertain');assert.equal(r.ticketReservationConflict.status,'uncertain');}
+test('REAL native original grant precedes durable notice reservation and original provenance bindings',async t=>{
+ const r=await scenario(t);recorded(r);assert.equal(r.issuerReservation.status,'recorded');assert.equal(r.originalGrantAck.status,'recorded');
+ assert.equal(r.reservationData.issuerReservationHash,r.originalBindings.issuer);assert.equal(r.reservationData.originalGrantAckHash,r.originalBindings.ack);assert.equal(r.reservationData.grantLinkHash,r.originalBindings.grantLink);assert.equal(r.reservationData.connectionHash,r.originalBindings.connection);
+ assert.deepEqual(r.concurrent.map(x=>x.status).sort(),['existing','recorded']);assert.equal(r.sendConflict.status,'uncertain');assert.equal(r.ticket.status,'applied');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.betweenGetPost.operations.ticket.ack.recordHash,r.ticketAckData.recordHash);
+ assert.equal(r.observed,true);assert.equal(r.witnessFrozen,true);assert.equal(r.consent.status,'applied');assert.equal(r.consentAck.status,'recorded');assert.equal(r.writes,2);assert.equal(r.grantUnchanged,true);
+ assert.equal(r.priorGrantMax,0);assert.equal(r.reservationData.ticket.expectedSequence,0);assert.equal(r.consent.row.sequence,17);assert.equal(r.consentAckData.sequence,17);assert.deepEqual(r.foreignAfter,r.foreignBefore);assert.equal(r.foreignAfter.length,16);
+ assert.equal(Object.keys(r.ticket.row).length,14);assert.equal(Object.keys(r.consent.row).length,12);
+ assert.deepEqual(r.ticketRows,[r.ticket.row]);assert.deepEqual(r.eventRows,[r.consent.row]);
+ assert.equal(r.ticketAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.ticketRows[0]));assert.equal(r.consentAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.eventRows[0]));
+ assert.equal(r.history.operations.consent.ack.sequence,17);assert.equal(r.history.freeze,null);
+});
+for(const name of ['freeze-empty','freeze-ticket-send','freeze-ticket-ack','freeze-consent-send','freeze-complete'])test('REAL irreversible '+name+' preserves history and blocks new progress',async t=>{
+ const r=await scenario(t,name);recorded(r);assert.equal(r.freeze.status,'recorded');assert.ok(r.history.freeze);assert.equal((r.blockedSend??r.blockedAck??r.replaySend).status,name==='freeze-complete'?'existing':'uncertain');
+ if(name==='freeze-empty'){assert.equal(r.history.operations.ticket.send,null);assert.equal(r.freezeReplay.status,'existing');assert.equal(r.writes,0);}
+ if(name==='freeze-ticket-send'){assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);}
+ if(name==='freeze-ticket-ack'){assert.ok(r.history.operations.ticket.ack);assert.equal(r.history.operations.consent.send,null);assert.equal(r.writes,1);}
+ if(name==='freeze-consent-send'){assert.ok(r.history.operations.consent.send);assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);}
+ if(name==='freeze-complete'){assert.equal(r.replayAck.status,'existing');assert.equal(r.replaySend.status,'existing');assert.equal(r.writes,2);assert.ok(r.history.operations.consent.ack);}
+});
+for(const fault of ['callback_throw','final_throw','sync_loss','readback_loss'])test('REAL native transaction durability fault '+fault+' never authorizes SQL',async t=>{
+ const r=await scenario(t,'transaction-fault',{fault});assert.equal(r.reservation.status,'uncertain');assert.equal(r.noticeRows.length,fault==='callback_throw'?0:1);assert.equal(r.writes,0);
+ if(fault!=='callback_throw')assert.equal(r.txCommitted,true);
+});
+for(const target of ['ticket','consent'])test('REAL actual SQL '+target+' ACK loss preserves SEND without reconstructing ACK or replay',async t=>{
+ const r=await scenario(t,'sql-loss',{target});recorded(r);assert.equal(r.actualSqlRejected,true);assert.equal(r.ticketRows.length,1);assert.equal(r.eventRows.length,target==='ticket'?0:1);assert.ok(r.history.operations[target].send);assert.equal(r.history.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].send.recordHash,r.history.operations[target].send.recordHash);assert.equal(r.writes,target==='ticket'?1:2);
+ if(target==='ticket'){assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);}
+});
+for(const kind of ['transaction','sql'])test('REAL '+kind+' Promise retained after abort; SYN observer owns outstanding exclusion within original deadline',async t=>{
+ const r=await scenario(t,'retained-'+kind);assert.equal(r.gateReached,true);assert.equal(r.gateCommitted,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.otherLeaseDistinct,true);assert.equal(r.otherLeaseLive,true);assert.equal(r.withinOriginalDeadline,true);assert.equal(r.observerDenied,true);assert.equal(r.observerAfterSettle,true);assert.equal(r.writes,kind==='transaction'?0:1);
+ if(kind==='transaction'){assert.equal(r.pending.value.status,'uncertain');assert.equal(r.noticeRows.length,1);}else{assert.equal(r.pending.rejected,true);assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);}
+});
+for(const fault of ['unknown','seventh','orphan','noncanonical','actor','version','metadata','storage','binding'])test('REAL exhaustive inventory and captured holder integrity reject '+fault,async t=>{
+ const r=await scenario(t,'corrupt',{fault});recorded(r);assert.equal(r.denied,true);assert.equal(r.writes,0);
+});
+for(const fault of ['Access','consent-without-ticket-ACK','request-hash','decision-hash','pre-reservation','ceiling','getter'])test('REAL contextual SEND validation rejects '+fault+' before mutation',async t=>{
+ const r=await scenario(t,'invalid',{fault});recorded(r);assert.ok(['uncertain','denied'].includes(r.invalid.status));assert.equal(r.getters,0);assert.equal(r.writes,0);assert.equal(r.history.operations.ticket.send,null);assert.equal(r.history.operations.consent.send,null);if(fault==='getter')assert.equal(r.errorMessage,'Finite preparation notice unavailable');
+});
+for(const fault of ['sendHash','sequence','early','late'])test('REAL ticket ACK link/timing/sequence rejects '+fault,async t=>{
+ const r=await scenario(t,'invalid-ticket-ack',{fault});recorded(r);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);
+});
+test('REAL consent ACK requires actual positive assigned sequence',async t=>{const r=await scenario(t,'invalid-consent-ack');recorded(r);assert.equal(r.consent.row.sequence,17);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);});
+test('REAL no_mutation ACK is terminal and cannot advance consent',async t=>{const r=await scenario(t,'no-mutation');recorded(r);assert.equal(r.ticket.status,'no_mutation');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.history.operations.ticket.ack.rowHash,null);assert.equal(r.history.operations.ticket.ack.sequence,null);assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);assert.equal(r.ticketRows.length,0);assert.equal(r.writes,1);});
+
+test('REAL POST Access may narrow while covering original ticket without enlarging permission',async t=>{
+ const r=await scenario(t,'consent-reduced');recorded(r);assert.equal(r.consent.status,'applied');assert.equal(r.history.operations.consent.send.accessExpiresAt,r.reservationData.ticket.expiresAt);assert.ok(r.history.operations.consent.send.accessExpiresAt<r.reservationData.accessExpiresAt);assert.equal(r.consent.row.expires_at,r.reservationData.ticket.permissionExpiresAt);
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-notice-provenance.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-notice-provenance.test.mjs b/test/mcp-qa-finite-preparation-notice-provenance.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-notice-provenance.test.mjs
@@ -0,0 +1,53 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {initialHash as hash,initialCanonical as canonical} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {sealFinitePreparationIssuerRecord as issuer} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+import {sealFinitePreparationNoticeRecord as seal,encodeFinitePreparationNoticeRecord as encode,decodeFinitePreparationNoticeRecord as decode,FINITE_PREPARATION_NOTICE_PREFIX as P,FINITE_PREPARATION_NOTICE_OPERATIONS as OPS} from '../lib/mcp-qa-finite-preparation-notice-records.mjs';
+const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111',at=1800000000000;
+const i=issuer('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:H,subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:H,grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:new Date(at+20000).toISOString(),I0:at-1000,C0:at+899000,C1:at+1079000,reservedAt:at-10});
+const body={identity:i,issuerReservationHash:H,originalGrantAckHash:H,grantLinkHash:H,connectionHash:H,expectedGrant:{scopes:['afw:project:read'],createdAt:new Date(at).toISOString(),expiresAt:new Date(at+18000).toISOString()},consumedAt:new Date(at).toISOString(),accessExpiresAt:at+19000,preconnectionExpiresAt:at+20000,ticket:{handleHash:H,requestId:U,expectedSequence:0,issuedAt:at,expiresAt:at+17000,permissionExpiresAt:at+16000},issuedAt:at+1};
+const make=(kind,v)=>seal(kind,{purpose:'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1',...v});
+const reservation=make('Reservation',body);
+const send=make('Send',{identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'ticket',requestHash:H,accessExpiresAt:body.accessExpiresAt,window:{startedAt:at+2,deadline:at+4000},issuedAt:at+2,decisionHash:null});
+const consent=make('Send',{...send,operation:'consent',decisionHash:H});
+const records=[['Reservation',reservation],['Send',send],['Send',consent],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'applied',rowHash:H,sequence:null,observedAt:at+3})],['Ack',make('Ack',{sendHash:consent.recordHash,outcome:'applied',rowHash:H,sequence:17,observedAt:at+4})],['Ack',make('Ack',{sendHash:send.recordHash,outcome:'no_mutation',rowHash:null,sequence:null,observedAt:at+3})],['Freeze',make('Freeze',{identityHash:i.identityHash,reservationHash:reservation.recordHash,frozenAt:at+5})]];
+test('DATA exact canonical round trips all kinds and real global sequence 17 independent of expectedSequence zero',()=>{
+ assert.equal(P,'afw.finite-preparation-notice.v1:');assert.deepEqual(OPS,['ticket','consent']);assert.ok(Object.isFrozen(OPS));
+ for(const [kind,r]of records){const raw=encode(kind,r),decoded=decode(kind,raw);assert.equal(raw,canonical(r));assert.deepEqual(decoded,r);assert.notEqual(decoded,r);assert.ok(Object.isFrozen(decoded));assert.throws(()=>decode(kind,' '+raw),/Finite preparation notice unavailable/);}
+ assert.equal(records[4][1].sequence,17);assert.equal(reservation.ticket.expectedSequence,0);
+});
+test('DATA detached deeply frozen snapshots',()=>{const v=structuredClone(body),r=make('Reservation',v);v.ticket.requestId='22222222-2222-4222-8222-222222222222';assert.equal(r.ticket.requestId,U);assert.ok(Object.isFrozen(r.ticket)&&Object.isFrozen(r.identity.requestedScopes));});
+for(const fault of ['extra','symbol','getter','prototype','sparse','oversize','identity-C0','identity-C1','Access','window','time','sequence','grant-order','scopes','ticket-limit','permission','consumed','purpose','hash','null-row','no-mutation-sequence','zero-sequence','fraction-sequence','unknown-kind'])test('DATA rejects '+fault+' generically without evaluating getters',()=>{
+ let calls=0,kind='Reservation',v={purpose:'afw.finite-preparation-notice-reservation.v1',...structuredClone(body)},fn=()=>seal(kind,v);
+ if(fault==='extra')v.approval=true;
+ if(fault==='symbol')v[Symbol('SYN')]=true;
+ if(fault==='getter')Object.defineProperty(v,'issuedAt',{enumerable:true,get(){calls++;return at;}});
+ if(fault==='prototype')Object.setPrototypeOf(v,{});
+ if(fault==='sparse')v.expectedGrant.scopes=new Array(1);
+ if(fault==='oversize')v.identity.subject='x'.repeat(17000);
+ if(fault==='identity-C0')v.identity.C0++;
+ if(fault==='identity-C1')v.identity.C1++;
+ if(fault==='Access')v.accessExpiresAt=v.ticket.expiresAt-1;
+ if(fault==='window'){kind='Send';v={...send,window:{startedAt:at,deadline:at+5001}};}
+ if(fault==='time')v.issuedAt=v.ticket.permissionExpiresAt;
+ if(fault==='sequence')v.ticket.expectedSequence=1;
+ if(fault==='grant-order')v.expectedGrant.expiresAt=v.expectedGrant.createdAt;
+ if(fault==='scopes')v.expectedGrant.scopes=['afw:evidence:read','afw:project:read'];
+ if(fault==='ticket-limit')v.ticket.expiresAt=v.ticket.issuedAt+600001;
+ if(fault==='permission')v.ticket.permissionExpiresAt=v.ticket.issuedAt;
+ if(fault==='consumed')v.consumedAt=new Date(at-20).toISOString();
+ if(fault==='purpose')v.purpose='wrong';
+ if(fault==='hash'){v={...reservation,recordHash:'f'.repeat(64)};fn=()=>encode(kind,v);}
+ if(['null-row','no-mutation-sequence','zero-sequence','fraction-sequence'].includes(fault)){kind='Ack';v={...records[4][1]};if(fault==='null-row')v.rowHash=null;if(fault==='no-mutation-sequence'){v.outcome='no_mutation';v.rowHash=null;}if(fault==='zero-sequence')v.sequence=0;if(fault==='fraction-sequence')v.sequence=1.5;}
+ if(fault==='unknown-kind')kind='Other';
+ assert.throws(fn,e=>e.message==='Finite preparation notice unavailable');assert.equal(calls,0);
+});
+test('DATA decode rejects malformed JSON, unknown fields, noncanonical bytes and wrong checksums',()=>{
+ for(const raw of ['{','{}','x'.repeat(16385),JSON.stringify({...reservation,extra:1}),JSON.stringify(reservation),canonical({...reservation,recordHash:'f'.repeat(64)})])if(raw!==canonical(reservation))assert.throws(()=>decode('Reservation',raw),/Finite preparation notice unavailable/);
+ const wrong=canonical({...reservation,issuerReservationHash:'f'.repeat(64)});assert.throws(()=>decode('Reservation',wrong));
+ assert.equal(reservation.recordHash,hash(reservation.purpose,Object.fromEntries(Object.entries(reservation).filter(([k])=>k!=='recordHash'))));
+});
+
+test('DATA Access and preconnection are independent ceilings, never renewal authority',()=>{
+ const r=make('Reservation',{...body,accessExpiresAt:at+30000});assert.ok(r.accessExpiresAt>r.preconnectionExpiresAt);assert.equal(r.ticket.expiresAt,body.ticket.expiresAt);
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-records.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-records.test.mjs b/test/mcp-qa-finite-preparation-records.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-records.test.mjs
@@ -0,0 +1,131 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {createHash} from 'node:crypto';
+import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash} from '../lib/mcp-qa-finite-preparation-records.mjs';
+const H='a'.repeat(64),M='b'.repeat(40);
+const ticket=()=>({purpose:'afw.finite-owner-ticket.v1',ticketHash:H,subjectHash:H,sourceRevision:M,projectRef:H,connectionRef:null,preconnectionId:H,action:'connection',createdAt:1,expiresAt:900000});
+const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
+test('rejects_noncanonical_private_record_and_future_ack',()=>{
+ const value=ticket(),raw=encode('Ticket',value);
+ assert.equal(raw,canonical(value));assert.deepEqual(decode('Ticket',raw),value);assert.ok(Object.isFrozen(decode('Ticket',raw)));
+ assert.equal(hash('Ticket',value),createHash('sha256').update(value.purpose+'\n'+raw).digest('hex'));
+ for(const text of [JSON.stringify(value),' '+raw,raw.replace('"action":','"action":"finite","action":'),raw.replace('"createdAt":1','"createdAt":1.0')])assert.throws(()=>decode('Ticket',text));
+ for(const bad of [{...value,jwt:'private'},{...value,cookie:'private'},{...value,credential:'private'},{...value,ticketHash:'A'.repeat(64)},{...value,sourceRevision:H},{...value,createdAt:-1},{...value,expiresAt:900002},{...value,action:'notices'},{...value,projectRef:'raw-id'},{...value,purpose:'other'}])assert.throws(()=>encode('Ticket',bad));
+ const accessor={...value};Object.defineProperty(accessor,'ticketHash',{enumerable:true,get(){throw Error('must not invoke');}});assert.throws(()=>encode('Ticket',accessor));
+ assert.throws(()=>encode('Ticket',Object.assign(Object.create(null),value)));
+ const cycle={...value};cycle.cycle=cycle;assert.throws(()=>encode('Ticket',cycle));
+ assert.throws(()=>decode('Ticket',' '.repeat(65537)));
+ const ack={purpose:'afw.finite-policy-ack.v1',sendHash:H,resourceId:'11111111-1111-4111-8111-111111111111',acknowledgedAt:999999};
+ // Codecs are timeless; actual future-vs-now/SEND checks belong to native journal.
+ assert.deepEqual(decode('PolicyAck',encode('PolicyAck',ack)),ack);
+});
+test('records_do_not_touch_runtime',async()=>{
+ let calls=0;const fetch=globalThis.fetch;globalThis.fetch=()=>{calls++;throw Error('unexpected runtime');};
+ try{encode('Ticket',ticket());decode('Ticket',encode('Ticket',ticket()));hash('Ticket',ticket());assert.equal(calls,0);}finally{globalThis.fetch=fetch;}
+ for(const path of ['lib/mcp-qa-finite-preparation-records.mjs','lib/mcp-qa-finite-preparation-store.mjs','lib/mcp-qa-finite-policy-journal.mjs']){
+  const source=await readFile(path,'utf8');assert.doesNotMatch(source,/\bfetch\s*\(|\.create\s*\(|afw\.qa-finite-trial\.v1:head/);
+ }
+});
+
+import * as control from '../lib/mcp-qa-finite-trial-control.mjs';
+import * as records from '../lib/mcp-qa-finite-preparation-records.mjs';
+import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
+import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+const seal=(kind,v,key)=>({...v,[key]:hash(kind,v)});
+const project={projectId:'synthetic-project',revision:1,synthetic:true};
+const projectHash=createHash('sha256').update('afw.finite-owner-project.v1\n'+canonical(project)).digest('hex');
+const U='11111111-1111-4111-8111-111111111111';
+function samples(){
+ const owner={subject:'synthetic-subject',accessRealmHash:H,accessVerifiedAt:1,accessExpiresAt:900000};
+ const approval={purpose:'afw.own-synthetic-policy-preparation.v1',decision:'approve',sourceRevision:M,projectHash,goal:'discovery',approvedAt:1,expiresAt:900000,csrfReceiptHash:H};
+ const pre=seal('OwnerPreparation',{purpose:'afw.finite-owner-preparation.v1',prepId:H,sourceRevision:M,actorId:H,selectedAt:10,expiresAt:900000,commandBy:390000,owner,connection:{connectionRef:H,grantId:'grant',clientId:'client',resource:'https://fixture.invalid/mcp',grantHash:H,consentHash:H,noticesHash:H,permissionExpiresAt:900000},project,goal:'discovery',programContext:{programHash:H,sourceRevision:M,originalContextHash:H},approval,auditHash:H},'preparationHash');
+ const {legacy,T0}=finiteFixture().plan;
+ // The immutable context uses the same original time as the real legacy fixture.
+ const p=structuredClone(pre);p.selectedAt=T0-10;p.expiresAt=T0+900000;p.commandBy=T0+390000;p.owner.accessVerifiedAt=T0-100;p.owner.accessExpiresAt=T0+900000;p.connection.permissionExpiresAt=T0+900000;p.approval.approvedAt=T0-100;p.approval.expiresAt=T0+900000;p.preparationHash=hash('OwnerPreparation',p);
+ const config=structuredClone(finitePublicProfileTemplate('canaryLive'));
+ for(const b of config.bindings)if(b.privateSlot){delete b.privateSlot;b.text='synthetic';}
+ const historical=structuredClone(config);historical.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
+ const policySend={purpose:'afw.finite-policy-send.v1',intentId:'intent',sourceRevision:M,setupInstanceId:'setup',contextHash:H,effect:'upload',requestHash:H,issuedAt:10,deadline:100};
+ const connectionSend={purpose:'afw.finite-connection-send.v1',preconnectionId:H,sourceRevision:M,stage:'connection',contextHash:H,effect:'upload',baselineVersionId:U,baselineDeploymentId:U,requestHash:H,issuedAt:10,deadline:100};
+ return {
+ Ticket:ticket(),TicketUse:{purpose:'afw.finite-owner-ticket-use.v1',ticketHash:H,recordHash:H,consumedAt:50},
+ ConfigurationApproval:{purpose:'afw.finite-connection-approval.v1',subjectHash:H,sourceRevision:M,projectHash,clientId:'client',approvedAt:1,expiresAt:900000,csrfReceiptHash:H},
+ Preconnection:seal('Preconnection',{purpose:'afw.finite-connection-preparation.v1',preconnectionId:H,sourceRevision:M,actorId:H,owner,project,clientId:'client',resource:'https://fixture.invalid/mcp',startedAt:1,expiresAt:900000,approvalHash:H,baselineHash:H},'recordHash'),
+ OwnerPreparation:pre,
+ Selection:seal('Selection',{purpose:'afw.finite-owner-selection.v1',sourceRevision:M,prepId:H,preparationHash:pre.preparationHash,selectedAt:10,sequence:1,previousSelectionHash:null},'selectionHash'),
+ Binding:{purpose:'afw.finite-owner-binding.v1',prepId:H,preparationHash:pre.preparationHash,selectionHash:H,intentId:'intent',sourceRevision:M,T0:20,boundAt:30},
+ GrantLink:{preconnectionId:H,authorizationHash:H,grantId:'grant',grantHash:H,acceptedAt:20},
+ NoticeLink:{preconnectionId:H,grantHash:H,eventHash:H,sequence:1,acceptedAt:30},
+ ConnectionRef:{connectionRef:H,subject:'subject',grantId:'grant',clientId:'client',projectId:'project',resource:'https://fixture.invalid/mcp',issuedAt:1,expiresAt:900000},
+ PolicySend:policySend,ConnectionSend:connectionSend,
+ PolicyAck:{purpose:'afw.finite-policy-ack.v1',sendHash:hash('PolicySend',policySend),resourceId:U,acknowledgedAt:30},
+ ConnectionAck:{purpose:'afw.finite-connection-ack.v1',sendHash:hash('ConnectionSend',connectionSend),resourceId:U,acknowledgedAt:30},
+ ConnectionReceipt:seal('ConnectionReceipt',{purpose:'afw.finite-connection-installed.v1',preconnectionId:H,sourceRevision:M,stage:'connection',baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,configurationHash:H,completedAt:40},'receiptHash'),
+ PolicyReceipt:seal('PolicyReceipt',{purpose:'afw.finite-policy-installed.v1',intentId:'intent',sourceRevision:M,setupInstanceId:'setup',qaVersionId:U,seedHash:H,contextHash:H,baselineVersionId:U,baselineDeploymentId:U,versionId:U,deploymentId:U,moduleHash:H,publicStaticHash:H,activationHash:H,restorationHash:H,bindingsHash:H,installedAt:40},'receiptHash'),
+ Failure:{purpose:'afw.finite-policy-failure.v1',identityHash:H,reasonCode:'deadline',observedAt:40},
+ SetupContext:{purpose:'afw.finite-policy-context.v1',intentId:'intent',sourceRevision:M,seedHash:H,preparationHash:p.preparationHash,selectionHash:H,bindingHash:H,T0,C0:T0+240000,C1:T0+420000,ownerPreparation:p,baselineProjectRevision:1,goal:'discovery',saveIdempotencyKey:U,legacy,policies:{AFW_DOSSIER_EVENTS_POLICY:'synthetic',AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY:'synthetic',AFW_DOSSIER_RETIREMENT_POLICY:'synthetic',AFW_DOSSIER_SUCCESSOR_POLICY:'synthetic',AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'project'},baseline:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:config},rollback:{versionId:U,deploymentId:U,module:{name:'index.mjs',sha256:H,bytes:1024},configuration:historical},expectedFull:{activationHash:H,restorationHash:H,bindingsHash:H}}
+ };
+}
+test('all_fixed_record_kinds_roundtrip_and_exact_domains',()=>{
+ for(const [kind,v]of Object.entries(samples())){
+  const raw=encode(kind,v);assert.deepEqual(decode(kind,raw),v,kind);assert.equal(encode(kind,decode(kind,raw)),raw);
+  assert.throws(()=>encode(kind,{...v,unknown:true}),kind);
+  if(v.purpose)assert.throws(()=>encode(kind,{...v,purpose:'wrong'}),kind);
+ }
+ const s=samples();
+ for(const [kind,domain]of [['GrantLink','afw.finite-grant-link.v1'],['NoticeLink','afw.finite-notice-link.v1'],['ConnectionRef','afw.finite-connection-ref.v1']])assert.equal(hash(kind,s[kind]),createHash('sha256').update(domain+'\n'+canonical(s[kind])).digest('hex'));
+ for(const [kind,key]of [['OwnerPreparation','preparationHash'],['Selection','selectionHash'],['Preconnection','recordHash'],['PolicyReceipt','receiptHash'],['ConnectionReceipt','receiptHash']])assert.throws(()=>encode(kind,{...s[kind],[key]:'f'.repeat(64)}));
+});
+test('context_uses_actual_legacy_module_and_configuration_grammars',()=>{
+ assert.equal(typeof control.validatePrivateQaFiniteLegacy,'function');
+ const {legacy,T0}=finiteFixture().plan;
+ const accepted=control.validatePrivateQaFiniteLegacy({legacy,T0});assert.ok(Object.isFrozen(accepted));assert.deepEqual(accepted,legacy);
+ for(const bad of [{legacy:{...legacy,retirement:{}},T0},{legacy:{...legacy,sourceHash:'invalid'},T0},{legacy,T0,extra:true}])assert.throws(()=>control.validatePrivateQaFiniteLegacy(bad));
+ const context=samples().SetupContext;
+ for(const change of [
+  c=>{c.legacy.retirement={};},c=>{c.baseline.module.exports=[];},c=>{c.baseline.configuration.extra=true;},
+  c=>{c.baseline.configuration.bindings.find(b=>b.type==='secret_text').text='private';},
+  c=>{c.policies.alias='private';},c=>{c.ownerPreparation.approval.projectHash='f'.repeat(64);},
+  c=>{c.C0++;},c=>{c.policies.AFW_DOSSIER_EVENTS_POLICY='x'.repeat(65536);}
+ ]){const c=structuredClone(context);change(c);assert.throws(()=>encode('SetupContext',c));}
+ assert.equal(typeof records.hashFiniteOwnerPreparationProject,'function');assert.equal(records.hashFiniteOwnerPreparationProject(project),projectHash);
+});
+
+import {createFinitePolicyEffectJournal} from '../lib/mcp-qa-finite-policy-journal.mjs';
+test('journal_admin_pending_rejects_accessor_without_invoking_it',async()=>{
+ let reads=0,transactions=0;
+ const journal=createFinitePolicyEffectJournal({storage:{async transaction(){transactions++;throw Error('must not enter storage');}},identity:{kind:'policy',intentId:'intent',sourceRevision:M,setupInstanceId:'setup',effect:'upload'},now:()=>100});
+ const value={observedAt:100};Object.defineProperty(value,'reasonCode',{enumerable:true,get(){reads++;return 'validation';}});
+ const lease={signal:new AbortController().signal,assertCurrent(){}};
+ await assert.rejects(()=>journal.markAdminPending(value,lease));assert.equal(reads,0);assert.equal(transactions,0);
+});
+
+test('Task3 final audit commits every actual stage and original factual relation without self-cycle',()=>{
+ assert.equal(typeof records.hashFiniteOwnerPreparationAudit,'function');
+ const v={preconnectionId:H,sourceRevision:M,sourceHash:H,preconnectionHash:H,stageApprovalHashes:{connection:H,notices:H,finite:H},stageReceiptHashes:{connection:H,notices:H,finite:H},grantLinkHash:H,noticeLinkHash:H,connectionRelationHash:H,connectionRefHash:H};
+ const expected=createHash('sha256').update('afw.finite-owner-preparation-audit.v1\n'+canonical(v)).digest('hex');
+ assert.equal(records.hashFiniteOwnerPreparationAudit(v),expected);
+ for(const key of ['sourceHash','preconnectionHash','grantLinkHash','noticeLinkHash','connectionRelationHash','connectionRefHash']){
+  assert.notEqual(records.hashFiniteOwnerPreparationAudit({...v,[key]:'c'.repeat(64)}),expected);
+ }
+ for(const key of ['stageApprovalHashes','stageReceiptHashes'])for(const stage of ['connection','notices','finite']){
+  assert.notEqual(records.hashFiniteOwnerPreparationAudit({...v,[key]:{...v[key],[stage]:'c'.repeat(64)}}),expected);
+  const missing=structuredClone(v);delete missing[key][stage];assert.throws(()=>records.hashFiniteOwnerPreparationAudit(missing));
+ }
+ for(const key of ['preparationHash','selectionHash','jwt'])assert.throws(()=>records.hashFiniteOwnerPreparationAudit({...v,[key]:H}));
+ const getter={...v};Object.defineProperty(getter,'sourceHash',{enumerable:true,get(){throw Error('must not invoke');}});
+ assert.throws(()=>records.hashFiniteOwnerPreparationAudit(getter));
+});
+
+test('mixed_role_setup_context_roundtrip',()=>{
+ const context=samples().SetupContext,raw=encode('SetupContext',context);
+ assert.deepEqual(decode('SetupContext',raw),context);
+ for(const property of ['baseline','rollback']){
+  const wrong=structuredClone(context);
+  wrong[property].configuration=structuredClone(context[property==='baseline'?'rollback':'baseline'].configuration);
+  assert.throws(()=>encode('SetupContext',wrong),property+' must retain its trusted role');
+ }
+ const swapped=structuredClone(context);[swapped.baseline.configuration,swapped.rollback.configuration]=[swapped.rollback.configuration,swapped.baseline.configuration];
+ assert.throws(()=>encode('SetupContext',swapped));
+});

~~~~~~~~~~

## test/mcp-qa-finite-preparation-store-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-preparation-store-native.test.mjs b/test/mcp-qa-finite-preparation-store-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-preparation-store-native.test.mjs
@@ -0,0 +1,182 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+async function native(t){
+ const built=await build({entryPoints:['test/fixtures/finite-preparation-store-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{FIXTURE:{className:'FinitePreparationFixture',useSQLite:true,uniqueKey:'finite-private-task1'}}}));
+ t.after(()=>mf.dispose());let path='/'+t.name.replace(/[^a-z0-9_]/gi,'');
+ const call=async(op,arg,extra={})=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,{method:'POST',body:JSON.stringify({op,arg,...extra})});assert.equal(r.status,200);return r.json();};
+ return {call,f:await call('fixtures')};
+}
+
+test('selection_cas_one_winner',async t=>{
+ const {call,f}=await native(t);
+ const r=await call('concurrent',null,{args:[{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{preparation:{...f.preparation,prepId:'c'.repeat(64)},selection:{...f.selection,prepId:'c'.repeat(64)},expectedHeadHash:null}]});
+ assert.equal(r.filter(x=>x.status==='recorded').length,1);
+ const selected=(await call('readSelected',{sourceRevision:f.preparation.sourceRevision})).result;
+ assert.equal(selected.selection.selectionHash,r.find(x=>x.status==='recorded').recordHash);
+ assert.ok((await call('rows')).length>=3);
+});
+test('preparation_cannot_bind_second_intent',async t=>{
+ const {call,f}=await native(t);
+ assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:15})).result.status,'recorded');
+ assert.equal((await call('bindSelection',f.binding)).result.status,'recorded');
+ const before=await call('rows');
+ assert.equal((await call('bindSelection',{...f.binding,intentId:'intent-2'})).rejected,true);
+ assert.deepEqual(await call('rows'),before);
+ assert.equal((await call('bindSelection',f.binding)).result.status,'existing');
+});
+test('selection_changed_after_T0_no_fallback',async t=>{
+ const {call,f}=await native(t);
+ await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null});
+ // Fixture can supply correctly hashed subsequent selections using actual codecs.
+ const prepAway={...f.preparation,prepId:'c'.repeat(64)};
+ const second={...f.selection,prepId:prepAway.prepId,selectedAt:25,sequence:2,previousSelectionHash:f.selection.selectionHash};
+ const away=await call('publishSelection',{preparation:prepAway,selection:second,expectedHeadHash:f.selection.selectionHash},{reseal:true});
+ assert.equal(away.result.status,'recorded');
+ const back=await call('publishSelection',{preparation:f.preparation,selection:{...f.selection,selectedAt:30,sequence:3,previousSelectionHash:away.result.recordHash},expectedHeadHash:away.result.recordHash},{reseal:true});
+ assert.equal(back.result.status,'recorded');
+ const selected=(await call('readSelected',{sourceRevision:f.preparation.sourceRevision})).result;
+ assert.equal(selected.preparation.prepId,f.preparation.prepId);
+ assert.equal((await call('bindSelection',f.binding)).rejected,true);
+});
+test('consumed_ticket_is_not_refunded',async t=>{
+ const {call,f}=await native(t);
+ assert.equal((await call('putTicket',f.ticket)).result.status,'recorded');
+ const use={ticketHash:f.ticket.ticketHash,recordHash:'d'.repeat(64)};
+ const lost=await call('consumeTicket',use,{loseCommitAck:true});
+ assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
+ const rows=await call('rows');
+ assert.equal((await call('consumeTicket',use)).result.status,'existing');
+ assert.equal((await call('consumeTicket',{...use,recordHash:'e'.repeat(64)})).rejected,true);
+ assert.deepEqual(await call('rows'),rows);
+});
+test('lease_expiry_rolls_back_native_transaction',async t=>{
+ const {call,f}=await native(t);
+ const before=await call('rows');
+ const r=await call('putTicket',f.ticket,{expireAtAssertion:4});
+ assert.equal(r.rejected===true||r.result?.status==='uncertain',true);
+ assert.deepEqual(await call('rows'),before);
+});
+
+test('preconnection_links_are_immutable_and_notice_requires_exact_grant',async t=>{
+ const {call,f}=await native(t);
+ assert.equal((await call('putPreconnection',f.preconnection)).result.status,'recorded');
+ const grant={preconnectionId:f.preconnection.preconnectionId,authorizationHash:'c'.repeat(64),grantId:'grant',grantHash:'d'.repeat(64),acceptedAt:20};
+ const notice={preconnectionId:grant.preconnectionId,grantHash:grant.grantHash,eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
+ assert.equal((await call('putLink',{kind:'notice',record:notice})).rejected,true);
+ assert.equal((await call('putLink',{kind:'grant',record:grant})).result.status,'recorded');
+ assert.equal((await call('putLink',{kind:'notice',record:{...notice,grantHash:'f'.repeat(64)}})).rejected,true);
+ assert.equal((await call('putLink',{kind:'notice',record:notice})).result.status,'recorded');
+ const before=await call('rows');
+ assert.equal((await call('putLink',{kind:'grant',record:grant})).result.status,'existing');
+ assert.equal((await call('putLink',{kind:'grant',record:{...grant,grantId:'replacement'}})).rejected,true);
+ assert.deepEqual(await call('rows'),before);
+});
+test('context_is_bound_to_original_selection_and_read_by_exact_refs',async t=>{
+ const {call,f}=await native(t),c=f.context,now=c.T0+10;
+ assert.equal((await call('putContext',c,{now})).rejected,true);
+ assert.equal((await call('publishSelection',{preparation:c.ownerPreparation,selection:f.contextSelection,expectedHeadHash:null},{now:c.T0-5})).result.status,'recorded');
+ assert.equal((await call('bindSelection',f.contextBinding,{now})).result.status,'recorded');
+ assert.equal((await call('putContext',c,{now})).result.status,'recorded');
+ assert.deepEqual((await call('readContext',{intentId:c.intentId,sourceRevision:c.sourceRevision},{now})).result,c);
+ const before=await call('rows');
+ assert.equal((await call('putContext',{...c,seedHash:'f'.repeat(64)},{now})).rejected,true);
+ assert.equal((await call('readContext',{intentId:c.intentId,sourceRevision:'c'.repeat(40)},{now})).rejected,true);
+ assert.deepEqual(await call('rows'),before);
+});
+
+test('backdated_selection_published_after_T0_cannot_bind',async t=>{
+ const {call,f}=await native(t);
+ assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:25})).result.status,'recorded');
+ assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
+ const before=await call('rows');
+ assert.equal((await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:31})).result.status,'existing');
+ assert.deepEqual(await call('rows'),before);
+});
+test('head_transaction_held_across_T0_cannot_backdate_publication',async t=>{
+ const {call,f}=await native(t);
+ const r=await call('publishSelection',{preparation:f.preparation,selection:f.selection,expectedHeadHash:null},{now:15,holdFirstCommitUntil:25});
+ assert.equal(r.result.status,'recorded');assert.equal(r.committed,true);
+ assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
+});
+test('lost_head_ack_never_manufactures_publication_witness',async t=>{
+ const {call,f}=await native(t),value={preparation:f.preparation,selection:f.selection,expectedHeadHash:null};
+ const lost=await call('publishSelection',value,{now:15,loseCommitAck:true});
+ assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
+ const before=await call('rows');assert.ok(before.length>=3);
+ assert.equal((await call('publishSelection',value,{now:16})).result.status,'uncertain');
+ assert.deepEqual(await call('rows'),before);
+ assert.equal((await call('bindSelection',f.binding,{now:30})).rejected,true);
+});
+test('lost_witness_ack_keeps_actual_witness_and_history',async t=>{
+ const {call,f}=await native(t),value={preparation:f.preparation,selection:f.selection,expectedHeadHash:null};
+ const lost=await call('publishSelection',value,{now:15,loseCommitNumber:2});
+ assert.equal(lost.committed,true);assert.equal(lost.result.status,'uncertain');
+ const before=await call('rows');assert.ok(before.length>=4);
+ // Exact durable readback can recover facts, never send authorization or a new witness.
+ assert.equal((await call('publishSelection',value,{now:16})).result.status,'existing');
+ assert.deepEqual(await call('rows'),before);
+ assert.equal((await call('bindSelection',f.binding,{now:30})).result.status,'recorded');
+});
+
+test('consume_ticket_snapshots_argument_across_actual_native_get',async t=>{
+ const {call,f}=await native(t),A=f.ticket.ticketHash,B='b'.repeat(64),R='c'.repeat(64);
+ assert.equal((await call('putTicket',f.ticket)).result.status,'recorded');
+ assert.equal((await call('putTicket',{...f.ticket,ticketHash:B})).result.status,'recorded');
+ const first=await call('consumeTicket',{ticketHash:A,recordHash:R},{mutateArgumentAfterGet:{key:'owner-ticket:'+A+':use',changes:{ticketHash:B}}});
+ assert.equal(first.argumentMutations,1);assert.equal(first.result.status,'recorded');
+ assert.equal((await call('consumeTicket',{ticketHash:B,recordHash:R})).result.status,'recorded');
+ const rows=new Map(await call('rows')),aUse=JSON.parse(rows.get('owner-ticket:'+A+':use')),bUse=JSON.parse(rows.get('owner-ticket:'+B+':use'));
+ assert.equal(aUse.ticketHash,A);assert.equal(bUse.ticketHash,B);
+ assert.equal([aUse,bUse].filter(use=>use.ticketHash===B).length,1);
+ const before=await call('rows');
+ assert.equal((await call('consumeTicket',{ticketHash:A,recordHash:R})).result.status,'existing');
+ assert.equal((await call('consumeTicket',{ticketHash:B,recordHash:'d'.repeat(64)})).rejected,true);
+ assert.deepEqual(await call('rows'),before);
+});
+test('notice_kind_mutation_cannot_skip_actual_grant_predecessor',async t=>{
+ const {call,f}=await native(t);
+ await call('putPreconnection',f.preconnection);
+ const notice={preconnectionId:f.preconnection.preconnectionId,grantHash:'d'.repeat(64),eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
+ const before=await call('rows');
+ const r=await call('putLink',{kind:'notice',record:notice},{mutateArgumentAfterGet:{key:'connection-preparation:'+notice.preconnectionId+':record',changes:{kind:'grant'}}});
+ assert.equal(r.argumentMutations,1);assert.equal(r.rejected,true);
+ assert.deepEqual(await call('rows'),before);
+});
+test('notice_kind_mutation_cannot_change_native_append_key',async t=>{
+ const {call,f}=await native(t);
+ await call('putPreconnection',f.preconnection);
+ const grant={preconnectionId:f.preconnection.preconnectionId,authorizationHash:'c'.repeat(64),grantId:'grant',grantHash:'d'.repeat(64),acceptedAt:20};
+ const notice={preconnectionId:grant.preconnectionId,grantHash:grant.grantHash,eventHash:'e'.repeat(64),sequence:1,acceptedAt:30};
+ await call('putLink',{kind:'grant',record:grant});
+ const r=await call('putLink',{kind:'notice',record:notice},{mutateArgumentAfterGet:{key:'connection-preparation:'+notice.preconnectionId+':record',changes:{kind:'grant'}}});
+ assert.equal(r.argumentMutations,1);assert.equal(r.result?.status,'recorded');
+ const rows=new Map(await call('rows'));
+ assert.deepEqual(JSON.parse(rows.get('connection-preparation:'+notice.preconnectionId+':grant')),grant);
+ assert.deepEqual(JSON.parse(rows.get('connection-preparation:'+notice.preconnectionId+':notice')),notice);
+});
+
+test('post_T0_binding_after_commandBy_keeps_original_chronology',async t=>{
+ const {call,f}=await native(t),p=f.preparation,T0=p.commandBy-1,at=p.commandBy+10;
+ assert.equal((await call('publishSelection',{preparation:p,selection:f.selection,expectedHeadHash:null},{now:15})).result.status,'recorded');
+ const binding={...f.binding,T0,boundAt:at};
+ assert.equal((await call('bindSelection',binding,{now:at})).result?.status,'recorded');
+ const selected=(await call('readSelected',{sourceRevision:p.sourceRevision},{now:at})).result;
+ assert.deepEqual(selected.binding,binding);
+ assert.equal(selected.preparation.commandBy,p.commandBy);
+ assert.equal((await call('bindSelection',binding,{now:at+1})).result.status,'existing');
+ assert.equal((await call('rows')).some(([key])=>key==='afw.qa-finite-trial.v1:head'),false);
+});
+for(const mode of ['command_at_boundary','command_after_boundary','stored_permission_expired','late_publication','future_boundAt']){
+ test('post_T0_binding_denies_'+mode,async t=>{
+  const {call,f}=await native(t),p=f.preparation;
+  const T0=mode==='command_at_boundary'?p.commandBy:mode==='command_after_boundary'?p.commandBy+1:p.commandBy-1;
+  const at=mode==='stored_permission_expired'?p.connection.permissionExpiresAt:p.commandBy+10;
+  assert.equal((await call('publishSelection',{preparation:p,selection:f.selection,expectedHeadHash:null},{now:mode==='late_publication'?T0+1:15})).result.status,'recorded');
+  const before=await call('rows'),binding={...f.binding,T0,boundAt:mode==='future_boundAt'?at+1:at};
+  assert.equal((await call('bindSelection',binding,{now:at})).rejected,true);
+  assert.deepEqual(await call('rows'),before);
+ });
+}

~~~~~~~~~~

## test/mcp-qa-finite-profile-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-profile-native.test.mjs b/test/mcp-qa-finite-profile-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-profile-native.test.mjs
@@ -0,0 +1,83 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {validateFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
+test('historical_content_never_claims_M',()=>{
+ const M='a'.repeat(40),tree='b'.repeat(40),roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+ const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'},keys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
+ const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'c'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,{provenance:versions[role]?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:keys[role],versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',bytes:1,sha256:'d'.repeat(64),exports:[]},publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)}}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
+ assert.deepEqual(validateFinitePackageManifest(manifest),manifest);
+ const historical=structuredClone(manifest),hp=historical.modules.canaryClosed.provenance;
+ Object.assign(hp,{kind:'historical-source-pin.v1',sourceRevision:'2a4773737764c5038aaa0b3528b43df2a0572441',sourceTree:'637af253296ac1c771cb73ea353cb960a2e59204'});
+ assert.deepEqual(validateFinitePackageManifest(historical),historical);
+ hp.sourceRevision=M;assert.throws(()=>validateFinitePackageManifest(historical));
+ for(const mutate of [
+  m=>m.modules.qaClosed.provenance.sourceRevision=M,
+  m=>m.modules.operatorClosed.provenance={kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},
+  m=>m.modules.qaClosed.provenance.receiptKey='operator',
+  m=>m.modules.qaClosed.provenance.receiptBlobSha='0'.repeat(40),
+  m=>m.modules.qaClosed.provenance.versionId=versions.canaryClosed,
+  m=>m.modules.qaLive.provenance.sourceTree='0'.repeat(40),
+ ]){const m=structuredClone(manifest);mutate(m);assert.throws(()=>validateFinitePackageManifest(m));}
+});
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual compiled Worker/DO entrypoints under workerd. No provider, credentials,
+// Container or grant is provisioned; all trap instrumentation is fixture-only.
+test('native finite legacy delivery, withdrawal and schedule cannot enter any host capability',async t=>{
+ const contents=`
+ import worker,{AfwOwnEventNode} from './worker/mcp-own/finite.mjs';
+ export class Native extends AfwOwnEventNode{
+  constructor(ctx,env){const touches=[];super(ctx,new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));this.touches=touches;}
+  async fixture(method){const present=typeof this[method]==='function',args=method==='withdrawPermissions'?[]:method==='withdrawPermissionsForPlan'?[{policyHash:'a'.repeat(64),expiresAt:1}]:method==='withdrawFiniteTrialPermissions'?[{intentId:'a'.repeat(64),controlHash:'b'.repeat(64)}]:['old-event','old-subscription'];try{await this[method](...args);return {present,denied:false,touches:this.touches};}catch{return {present,denied:true,touches:this.touches};}}
+ }
+ export default{async fetch(request,env){const method=new URL(request.url).pathname.slice(1);
+  if(method==='schedule'){const touches=[];const result=await worker.scheduled({scheduledTime:Date.now()},new Proxy(env,{get(_v,k){touches.push(String(k));throw Error('host forbidden');}}));return Response.json({result,touches});}
+  return Response.json(await env.NODE.get(env.NODE.idFromName(method)).fixture(method));
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':'"finite_trial_event"'}});
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],durableObjects:{NODE:{className:'Native',useSQLite:true}}}));
+ try{
+  for(const method of ['deliverOwnSaved','deliverSaved','withdrawPermissions','withdrawPermissionsForPlan','withdrawFiniteTrialPermissions'])await t.test(method,async()=>assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/'+method)).json(),{present:true,denied:true,touches:[]}));
+  assert.deepEqual(await (await mf.dispatchFetch('https://fixture.invalid/schedule')).json(),{result:null,touches:[]});
+ }finally{await mf.dispose();}
+});
+
+test('actual finite QA class constructs fixed actor and retains closed diagnostic without material authority',async()=>{
+ const sourceRevision='b'.repeat(40);
+ const contents=`
+ import {IndependentClosure,PrivateQaPreregistration,PrivateQaCatalog,PrivateQaBootstrap,PrivateQaNamedConfirmation} from './worker/independent-closure/finite.mjs';
+ export {IndependentClosure,PrivateQaPreregistration,PrivateQaCatalog,PrivateQaBootstrap,PrivateQaNamedConfirmation};
+ export default {async fetch(request,env){
+  const actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+  const closed=JSON.parse(await actor.observeOwnQaClosedContext({operation:'observe_closed_context',expectedVersionId:env.AFW_QA_VERSION.id,expectedSourceRevision:'${sourceRevision}'}));
+  let material=false;try{await actor.previewFiniteTrialMaterial({intentId:'a'.repeat(64),sourceRevision:'${sourceRevision}'});material=true;}catch{}
+  return Response.json({closed,material});
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision)}});
+ const {finiteWranglerProfileTemplate}=await import('../lib/mcp-qa-finite-profile.mjs');
+ // Synthetic version ID; actual workerd SQLite namespace/class construction.
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...finiteWranglerProfileTemplate('qaLive').vars,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'IndependentClosure',useSQLite:true}}}));
+ try{
+  const r=await(await mf.dispatchFetch('https://fixture.invalid')).json();
+  assert.equal(r.closed.status,'observed');assert.equal(r.closed.allClosed,true);
+  assert.equal(r.closed.authorizesEffects,false);assert.equal(r.closed.operationalReadiness,false);
+  assert.equal(r.material,false);
+ }finally{await mf.dispose();}
+});
+
+test('D0.1 checked-in QA Wrangler exactly matches revised source; historical and M pins stay fixed',async()=>{
+ const {readFile}=await import('node:fs/promises');
+ const {finiteWranglerProfileTemplate,finitePublicProfileTemplate}=await import('../lib/mcp-qa-finite-profile.mjs');
+ const {QA_CLOUD_CLOSED_PINS}=await import('../lib/mcp-qa-cloud-closed-pins.mjs');
+ const qa=JSON.parse(await readFile('wrangler.independent-closure-qa.finite.jsonc','utf8'));
+ assert.deepEqual(qa,finiteWranglerProfileTemplate('qaLive'));
+ assert.deepEqual(qa.kv_namespaces,[{binding:'AFW_FINITE_OWNER_OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}]);
+ assert.equal(finitePublicProfileTemplate('qaLive').bindings.filter(b=>b.type==='kv_namespace').length,1);
+ assert.deepEqual(finiteWranglerProfileTemplate('canaryLive').kv_namespaces,[{binding:'OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}]);
+ assert.equal(finitePublicProfileTemplate('canaryLive').bindings.some(b=>b.name==='AFW_FINITE_OWNER_OAUTH_KV'),false);
+ assert.equal(QA_CLOUD_CLOSED_PINS.qaClosed.id,'c570b60b-95dc-48e1-89f3-9c4651691dbc');
+ assert.equal(QA_CLOUD_CLOSED_PINS.qaClosed.bindingCount,31);
+ assert.equal(QA_CLOUD_CLOSED_PINS.canary.id,'2607abae-cec3-4e35-89eb-8b8572262b54');
+});

~~~~~~~~~~

## test/mcp-qa-finite-profile.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-profile.test.mjs b/test/mcp-qa-finite-profile.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-profile.test.mjs
@@ -0,0 +1,146 @@
+import {createHash} from 'node:crypto';
+import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
+import {validateReleaseOperatorBundle,validateFiniteReleaseOperatorBundle} from '../lib/mcp-release-operator-policy.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
+import {restorationConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
+let api;
+try{api=await import('../lib/mcp-qa-finite-profile.mjs');}catch{/* Missing implementation is an explicit RED assertion. */}
+function fixture(){
+ assert.equal(typeof api?.finitePublicProfileTemplate,'function','source-owned profile template required');
+ const v=structuredClone(api.finitePublicProfileTemplate('canaryLive'));
+ for(const b of v.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC-PRIVATE-'+b.name;}
+ return v;
+}
+test('candidate_private_projection_full_hash',()=>{
+ const script='export default {fetch(){return new Response(null,{status:404})}}';
+ const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
+ const policy=inertNamedConfirmationPolicy(artifact),a=fixture();
+ for(const binding of a.bindings){const original=policy.observation.configuration.bindings.find(x=>x.name===binding.name);if(original&&binding.type==='plain_text'&&original.type==='plain_text')binding.text=original.text;}
+ const b=structuredClone(a),event=b.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY');
+ const changed=JSON.parse(event.text);changed.grantId='ci-only-second-inert';event.text=JSON.stringify(changed);
+ for(const configuration of [a,b]){const p=structuredClone(policy);p.observation.configuration=configuration;p.plan.configurationHash=finiteActivationConfigurationHash(configuration);assert.equal(validateFiniteReleaseOperatorBundle({artifact,policy:p}),true);}
+ const bad=structuredClone(b),raw=bad.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_POLICY'),invalid=JSON.parse(raw.text);invalid.clientId='wrong-private-client';raw.text=JSON.stringify(invalid);
+ const invalidPolicy=structuredClone(policy);invalidPolicy.observation.configuration=bad;invalidPolicy.plan.configurationHash=finiteActivationConfigurationHash(invalidPolicy.observation.configuration);
+ assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:bad}));
+ assert.throws(()=>validateFiniteReleaseOperatorBundle({artifact,policy:invalidPolicy}),/Release operator plan unavailable/);
+ assert.deepEqual(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}),api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}));
+ assert.throws(()=>activationConfigurationHash(a),'old activation reader must reject new candidate flags');
+ assert.notEqual(finiteActivationConfigurationHash(a),finiteActivationConfigurationHash(b));
+ assert.notEqual(restorationConfigurationHash(a),restorationConfigurationHash(b));
+ assert.notEqual(finiteActivationConfigurationHash(a),restorationConfigurationHash(a));
+ const projected=JSON.stringify(api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}));
+ assert(!projected.includes('SYNTHETIC-PRIVATE'));
+});
+test('unknown_private_slot_denied',()=>{
+ const a=fixture();a.bindings.push({name:'AFW_NEW_PRIVATE_POLICY',type:'plain_text',text:'private'});
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:a}));
+});
+test('actual_version_metadata_required',()=>{
+ const a={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'},AfwNodeControl:{type:'worker'},AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'AFW_FINITE_TRIAL_VERSION',type:'version_metadata'}]};
+ assert.match(activationConfigurationHash(a),/^[a-f0-9]{64}$/);
+ for(const change of [b=>b.name='AFW_FAKE_VERSION',b=>b.value='fake',b=>Object.defineProperty(b,'type',{get(){throw Error('getter executed');},enumerable:true})]){
+  const b=structuredClone(a);change(b.bindings[0]);assert.throws(()=>activationConfigurationHash(b));
+ }
+});
+test('exact public roles reject missing slots, accessors, flags, resource substitution and raw QA policies',()=>{
+ const a=fixture();
+ assert.equal(a.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED').text,'true');
+ assert.equal(a.bindings.find(b=>b.name==='AFW_DOSSIER_RETIREMENT_READ_ENABLED').text,'false');
+ for(const mutate of [
+  v=>v.bindings.pop(),
+  v=>v.limits={cpu_ms:10},
+  v=>v.bindings.find(b=>b.name==='DB').id='00000000-0000-0000-0000-000000000000',
+  v=>v.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='false',
+  v=>v.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_VERSION').type='plain_text',
+  v=>Object.defineProperty(v.bindings[0],'name',{get(){throw Error('getter');},enumerable:true}),
+  v=>v.bindings.push({name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:'future'}),
+ ]){const b=structuredClone(a);mutate(b);assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:b}));}
+ const qa=structuredClone(api.finitePublicProfileTemplate('qaLive'));
+ assert.equal(qa.bindings.filter(b=>b.name.endsWith('_ENABLED')&&b.text==='false').length,14);
+ assert.equal(qa.bindings.filter(b=>b.name.startsWith('AFW_RELEASE_')&&b.text==='true').length,4);
+ qa.bindings.push({name:'AFW_DOSSIER_EVENTS_POLICY',type:'plain_text',text:'private'});
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:qa}));
+});
+
+test('projection rejects caller extras and accessor without invocation',()=>{
+ let invoked=false;const input={role:'qaLive'};
+ Object.defineProperty(input,'metadata',{enumerable:true,get(){invoked=true;throw Error('getter');}});
+ assert.throws(()=>api.projectFinitePublicConfiguration(input));assert.equal(invoked,false);
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:api.finitePublicProfileTemplate('qaLive'),allow:true}));
+});
+
+test('finite canary source preserves existing SQLite Container relationship and hashes that relationship',()=>{
+ const p=api.finitePublicProfileTemplate('canaryLive'),w=api.finiteWranglerProfileTemplate('canaryLive');
+ const node={type:'durable-object',storage:'sqlite',container:'agent-friendly-web-delegated-canary-afwowneventnode'};
+ assert.deepEqual(p.exports.AfwOwnEventNode,node);
+ assert.deepEqual(p.containers,[{class_name:'AfwOwnEventNode',name:node.container}]);
+ assert.deepEqual(w.exports.AfwOwnEventNode,node);
+ assert.equal(w.containers,undefined,'source does not create an app/image');
+ assert.equal(w.migrations,undefined,'source does not create a namespace');
+ assert.deepEqual(w.unsafe.metadata,{exports:p.exports,containers:[{class_name:'AfwOwnEventNode'}]});
+ const actual=fixture(),detached=structuredClone(actual);
+ delete detached.exports.AfwOwnEventNode.container;detached.containers=[];
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'canaryLive',metadata:detached}));
+ assert.throws(()=>activationConfigurationHash(actual),'old activation reader must not reinterpret new candidate');
+ assert.notEqual(finiteActivationConfigurationHash(actual),finiteActivationConfigurationHash(detached));
+ assert.notEqual(restorationConfigurationHash(actual),restorationConfigurationHash(detached));
+ assert.equal(p.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_NODE').namespace_id,'d6fc71552de7494a863aca20365a572d');
+});
+
+test('new finite candidate flags are exact before every phase and reject old or expanded profiles',()=>{
+ const expected={qaLive:['nodejs_compat','enable_request_signal'],canaryLive:['nodejs_compat','global_fetch_strictly_public','enable_request_signal']};
+ for(const role of Object.keys(expected)){
+  const profile=role==='canaryLive'?fixture():structuredClone(api.finitePublicProfileTemplate(role));
+  const template=api.finitePublicProfileTemplate(role),config=api.finiteWranglerProfileTemplate(role);
+  assert.equal(template.compatibility_date,'2026-09-07');
+  assert.equal(config.compatibility_date,'2026-09-07');
+  assert.deepEqual(template.compatibility_flags,expected[role]);
+  assert.deepEqual(config.compatibility_flags,expected[role]);
+  assert.deepEqual(api.projectFinitePublicConfiguration({role,metadata:profile}).compatibility_flags,expected[role]);
+  for(const flags of [expected[role].slice(0,-1),[...expected[role].slice(0,-1),'request_signal_passthrough'],[...expected[role],'request_signal_passthrough'],[...expected[role]].reverse()]){
+   const changed=structuredClone(profile);changed.compatibility_flags=flags;
+   assert.throws(()=>api.projectFinitePublicConfiguration({role,metadata:changed}),role+' must reject nonexact candidate flags');
+  }
+ }
+});
+
+test('legacy bundle remains independently strict for the historical compatibility pair',()=>{
+ const script='export default {fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
+ const policy=inertNamedConfirmationPolicy(artifact);
+ assert.deepEqual(policy.observation.configuration.compatibility_flags,['nodejs_compat','global_fetch_strictly_public']);
+ assert.equal(validateReleaseOperatorBundle({artifact,policy}),true);
+ const historical=policy.observation.configuration,changed=structuredClone(historical),binding=changed.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');
+ binding.text=JSON.stringify({...JSON.parse(binding.text),grantId:'ci-only-second-inert'});
+ assert.notEqual(activationConfigurationHash(historical),activationConfigurationHash(changed));
+ assert.notEqual(restorationConfigurationHash(historical),restorationConfigurationHash(changed));
+ assert.notEqual(activationConfigurationHash(historical),restorationConfigurationHash(historical));
+ assert.throws(()=>validateFiniteReleaseOperatorBundle({artifact,policy}));
+});
+
+test('candidate descriptor declares fixed finite activation while QA remains null',()=>{
+ const M='a'.repeat(40),tree='b'.repeat(40),roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+ const versions={qaClosed:'c570b60b-95dc-48e1-89f3-9c4651691dbc',canaryClosed:'2607abae-cec3-4e35-89eb-8b8572262b54',operatorClosed:'855dc5c1-e757-49aa-a6f5-cb02f8d03ea4'},keys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
+ const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:M,sourceTree:tree,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'c'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,{provenance:versions[role]?{kind:'historical-content-pin.v1',receiptPath:'lib/mcp-qa-cloud-closed-pins.mjs',receiptBlobSha:'26213123304eea25e652a52d808d25b7e0e3475e',receiptKey:keys[role],versionId:versions[role]}:{kind:'compiled-source.v1',sourceRevision:M,sourceTree:tree},module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',bytes:1,sha256:'d'.repeat(64),exports:[]},publicStatic:{purpose:'afw.finite-public-static-profile.v1',configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)}}])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
+
+ for(const role of ['qaLive','canaryLive']){
+  manifest.modules[role].publicStatic=api.finitePublicStaticExpectation(role);
+  const metadata=role==='canaryLive'?fixture():structuredClone(api.finitePublicProfileTemplate(role));
+  const descriptor=api.qualifyFiniteSourceRoleMetadata({manifest,role,metadata});
+  assert.equal(descriptor.privateFull.activationAlgorithm,role==='canaryLive'?'finiteActivationConfigurationHash':null);
+ }
+});
+
+test('D0.1 exact QA SDK alias changes only qaLive source contract',()=>{
+ const q=api.finitePublicProfileTemplate('qaLive');
+ const m=api.finitePublicProfileTemplate('canaryLive');
+ const alias={name:'AFW_FINITE_OWNER_OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'};
+ assert.deepEqual(q.bindings.filter(b=>b.name===alias.name),[alias]);
+ assert.deepEqual(m.bindings.filter(b=>b.type==='kv_namespace'),[{name:'OAUTH_KV',type:'kv_namespace',namespace_id:alias.namespace_id}]);
+ const config=api.finiteWranglerProfileTemplate('qaLive');
+ assert.deepEqual(config.kv_namespaces,[{binding:alias.name,id:alias.namespace_id}]);
+ assert.deepEqual(api.projectFinitePublicConfiguration({role:'qaLive',metadata:q}),q);
+ const changed=structuredClone(q);changed.bindings.find(b=>b.name===alias.name).namespace_id='0'.repeat(32);
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:changed}));
+});

~~~~~~~~~~

## test/mcp-qa-finite-publication-bridge.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-publication-bridge.test.mjs b/test/mcp-qa-finite-publication-bridge.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-publication-bridge.test.mjs
@@ -0,0 +1,51 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {seedWorld} from './fixtures/finite-seed-world.mjs';
+import {readFiniteQaPublicationBridge} from '../lib/mcp-qa-finite-publication-bridge.mjs';
+test('native bridge uses actual primary seed and fresh native pointer while direct QA code remains false',async()=>{
+ const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();f.calls.length=0;
+ const r=await f.api.readFiniteQaPublicationBridge(f.nativeOptions());
+ assert.equal(r.qaPublicationBridgeVerified,true);assert.equal(r.qaCodeProvenanceVerified,false);assert.equal(r.scopeVerified,false);assert.equal(r.operationalReadiness,false);
+ assert.equal(f.calls.length,14);assert(f.calls.every(x=>x.init.method==='GET'));
+ const gh=f.calls.filter(x=>x.url.includes('api.github.com'));assert.equal(gh.length,11);assert(gh.every(x=>x.init.headers.Authorization===undefined));
+});
+for(const mode of ['version','binding','source','in-progress','pointer-between-awaits','native-version-between-awaits','late'])test('native bridge denies '+mode,async()=>{
+ const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);if(mode!=='in-progress')f.complete();
+ if(mode==='version')f.nativeEnv.AFW_QA_VERSION.id='33333333-3333-4333-8333-333333333333';
+ if(mode==='binding')f.nativeEnv.AFW_INDEPENDENT_CLOSURE={idFromName:()=>({toString:()=> 'wrong'})};
+ if(mode==='source')f.nativeEnv.SOURCE_TEMPLATE='0'.repeat(40);
+ let gets=0;f.state.hook=async url=>{
+  if(url.includes('api.github.com')&&++gets===3){
+   if(mode==='pointer-between-awaits')f.live.deploymentId='33333333-3333-4333-8333-333333333333';
+   if(mode==='native-version-between-awaits')f.nativeEnv.AFW_QA_VERSION.id='33333333-3333-4333-8333-333333333333';
+   if(mode==='late')f.setNow(f.now()+5000);
+  }
+ };
+ await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
+ assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
+});
+test('default missing native custody/source receipt remains unavailable before network',async()=>{
+ let calls=0;await assert.rejects(readFiniteQaPublicationBridge({ctx:{},env:{},intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40),signal:new AbortController().signal,fetchImpl:async()=>{calls++;}}));assert.equal(calls,0);
+});
+
+for(const mode of ['malformed-notbefore','extra-token-field','wrong-native-id','inactive-native','expired-native'])test('native account identity rejects '+mode,async()=>{
+ const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();
+ f.state.hook=async(url,init)=>{
+  if(url.endsWith('/tokens/verify')&&init.headers.Authorization==='Bearer synthetic-native'){
+   const result={id:'a'.repeat(32),status:'active',expires_on:new Date(f.T0+86400000).toISOString(),not_before:null};
+   if(mode==='malformed-notbefore')result.not_before='garbage';if(mode==='extra-token-field')result.unapproved=true;if(mode==='wrong-native-id')result.id='b'.repeat(32);if(mode==='inactive-native')result.status='disabled';if(mode==='expired-native')result.expires_on=new Date(f.T0).toISOString();
+   return f.response({success:true,errors:[],messages:[],result});
+  }
+ };
+ await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
+});
+
+for(const mode of ['missing','malformed','nonstring-array'])test('native bridge rejects '+mode+' admit job start',async()=>{
+ const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);f.complete();
+ const job=f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0];
+ if(mode==='missing')delete job.started_at;
+ else job.started_at=mode==='malformed'?'not-a-date':[job.started_at];
+ f.calls.length=0;
+ await assert.rejects(f.api.readFiniteQaPublicationBridge(f.nativeOptions()));
+ assert(f.calls.every(x=>x.init.method==='GET'));
+});

~~~~~~~~~~

## test/mcp-qa-finite-read-rpc-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-read-rpc-native.test.mjs b/test/mcp-qa-finite-read-rpc-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-read-rpc-native.test.mjs
@@ -0,0 +1,34 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+// Actual fixed QA actor methods and storage; synthetic source/primary/version.
+test('fixed retained-read RPC keeps exact own shape across compatible closed reconstruction',async()=>{
+ const contents=`
+ import {IndependentClosure} from './worker/independent-closure/index.mjs';
+ import * as api from './lib/mcp-qa-finite-trial-control.mjs';
+ import {finiteFixture} from './test/fixtures/qa-finite-trial.mjs';
+ export class Native extends IndependentClosure {
+  async seedFixture(){
+   const f=finiteFixture({at:Number(this.env.T0)});f.plan.resources.actorId=this.ctx.id.toString();
+   for(const[k,v]of f.rows)await this.ctx.storage.put(k,v);
+   const c=api.createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin:api.createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision}),plan:JSON.stringify(f.plan),readPrimary:f.primary,now:f.now,timeoutMs:5000});
+   const r=await c.prepare();if(r.status!=='armed')throw Error('fixture');return {intentId:f.plan.intentId,controlHash:r.controlHash};
+  }
+ }
+ export default {async fetch(r,e){const x=await r.json(),s=e.AFW_INDEPENDENT_CLOSURE.get(e.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
+  try{if(x.method==='seed')return Response.json(await s.seedFixture());if(x.method==='head')return Response.json(await s.readFiniteTrialCleanupProofHead(x.refs));if(x.method==='nominal')return Response.json(await s.readFiniteTrialNominalControl(x.refs));return new Response(null,{status:404});}catch{return Response.json({status:'unavailable'},{status:409});}
+ }};
+ `;
+ const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
+ const T0=Date.now()+600000,release=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
+ const options=closed=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(release.map(k=>[k,closed?'false':'true'])),AFW_QA_VERSION:{id:closed?'22222222-2222-4222-8222-222222222222':'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-read-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'finite-read-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-read-candidate'}}});
+ const mf=new Miniflare(options(false)),call=async(method,refs,status=200)=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({method,refs})});assert.equal(r.status,status);return r.json();};
+ try{
+  const refs=await call('seed');assert.equal((await call('head',refs)).status,'not_yet_observed');
+  await call('head',{...refs,storage:{}},409);await call('head',{...refs,extra:true},409);
+  await mf.setOptions(options(true));assert.equal((await call('head',refs)).status,'not_yet_observed');
+  await call('head',{...refs,controlHash:'f'.repeat(64)},409);await call('nominal',refs,409);
+ }finally{await mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-seed-http.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-seed-http.test.mjs b/test/mcp-qa-finite-seed-http.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-seed-http.test.mjs
@@ -0,0 +1,45 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFiniteMaterialSeed} from '../lib/mcp-qa-finite-seed-http.mjs';
+import {seedPrimaryFixture,SEED_GH} from './fixtures/finite-seed-primary.mjs';
+test('real anonymous native primary path authenticates immutable seed, finished step and package lineage',async()=>{
+ const f=await seedPrimaryFixture(),r=await readFiniteMaterialSeed(f.options);
+ assert.equal(r.seed.intentId,f.seed.intentId);assert.equal(r.primaryEvidence.seedStepCompletedAt,f.T0+2000);assert(Object.isFrozen(r.seed.qaPublication.qaLive.module));
+ assert.equal(f.calls.length,11);for(const x of f.calls){assert.equal(x.init.method,'GET');assert.equal(x.init.headers.Authorization,undefined);assert(x.url.startsWith(SEED_GH));}
+});
+const attacks={
+ 'bare ref':f=>f.map.get('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId).object.type='commit',
+ 'tag target':f=>f.map.get('/git/tags/'+f.tagSha).object.sha='0'.repeat(40),
+ 'tag name':f=>f.map.get('/git/tags/'+f.tagSha).tag='other',
+ 'comment body':f=>f.map.get('/issues/comments/123').body+=' ',
+ 'comment owner':f=>f.map.get('/issues/comments/123').user.type='Bot',
+ 'main':f=>f.map.get('/git/ref/heads/main').object.sha='0'.repeat(40),
+ 'run title':f=>f.map.get('/actions/runs/11').display_title='other',
+ 'run attempt':f=>f.map.get('/actions/runs/11').run_attempt=2,
+ 'run owner':f=>f.map.get('/actions/runs/11').triggering_actor={},
+ 'job id':f=>f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0].id++,
+ 'jobs overflow':f=>f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').total_count=101,
+ 'in progress seed':f=>{f.seedStep.status='in_progress';f.seedStep.conclusion=null;f.seedStep.completed_at=null;},
+ 'observation before start':f=>f.seedStep.started_at=new Date(f.T0+1500).toISOString(),
+ 'observation after completion':f=>f.seedStep.completed_at=new Date(f.T0+500).toISOString(),
+ 'source tree':f=>f.map.get('/git/commits/'+f.seed.sourceRevision).tree.sha='0'.repeat(40),
+ 'build lineage':f=>f.map.get('/actions/runs/101').event='pull_request',
+ 'artifact digest':f=>f.map.get('/actions/artifacts/202').digest='sha256:'+'0'.repeat(64),
+ 'artifact expired':f=>f.map.get('/actions/artifacts/202').expired=true,
+ 'source file tampered':f=>f.map.get('/contents/'+f.buildPath+'?ref='+f.seed.sourceRevision).content='eA=='
+};
+for(const [name,mutate]of Object.entries(attacks))test('public primary rejects '+name,async()=>{const f=await seedPrimaryFixture();mutate(f);await assert.rejects(readFiniteMaterialSeed(f.options));assert(f.calls.length<=11);});
+for(const mode of ['rate','overflow','truncated','stale','abort','late','redirect'])test('public read bounds '+mode,async()=>{
+ const f=await seedPrimaryFixture(),controller=new AbortController();
+ const fetchImpl=async(...args)=>{const r=await f.fetchImpl(...args);if(mode==='rate')r.headers.set('x-ratelimit-remaining','0');if(mode==='overflow')r.headers.set('content-length','262145');if(mode==='truncated')r.headers.set('content-length','262144');if(mode==='stale')r.headers.set('date',new Date(f.T0-10000).toUTCString());if(mode==='abort')controller.abort();if(mode==='late')f.setNow(f.now()+5000);return mode==='redirect'?new Response(null,{status:302,headers:{location:'https://private.invalid'}}):r;};
+ await assert.rejects(readFiniteMaterialSeed({...f.options,fetchImpl,signal:controller.signal}));assert.equal(f.calls.length,1);
+});
+test('caller URL/credential/seed cannot replace fixed read authority',async()=>{const f=await seedPrimaryFixture();for(const key of ['url','credential','seed'])await assert.rejects(readFiniteMaterialSeed({...f.options,[key]:'caller'}));assert.equal(f.calls.length,0);});
+
+for(const mode of ['missing','malformed','nonstring-array'])test('public primary rejects '+mode+' admit job start',async()=>{
+ const f=await seedPrimaryFixture(),job=f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0];
+ if(mode==='missing')delete job.started_at;
+ else job.started_at=mode==='malformed'?'not-a-date':[job.started_at];
+ await assert.rejects(readFiniteMaterialSeed(f.options));
+ assert(f.calls.every(x=>x.init.method==='GET'));
+});

~~~~~~~~~~

## test/mcp-qa-finite-seed-issuer.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-seed-issuer.test.mjs b/test/mcp-qa-finite-seed-issuer.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-seed-issuer.test.mjs
@@ -0,0 +1,65 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {readFile} from 'node:fs/promises';
+import {seedWorld} from './fixtures/finite-seed-world.mjs';
+test('actual CLI resolves real archive, verifies bytes/primaries and issues one annotated seed/ref',async()=>{
+ const f=await seedWorld(),r=await f.cli();assert.equal(r.status,'seed_material_created');assert.equal(r.qaPublicationBridgeVerified,false);
+ assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
+ assert(f.calls.some(x=>x.url.includes('/actions/artifacts/202/zip')));assert(f.calls.some(x=>x.url.includes('?include=modules')));
+ const posts=f.calls.filter(x=>x.init.method==='POST');assert.equal(posts.length,2);assert(posts.every(x=>x.url.startsWith('https://api.github.com/')));
+ await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,1);
+ f.complete();const observed=await f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal});
+ assert.equal(observed.seedHash,r.seedHash);assert.equal(observed.tagSha,r.tagSha);
+ assert(!f.calls.some(x=>x.url.includes('/user/tokens')));
+});
+test('original seed cannot claim future completion; later reader requires primary success',async()=>{
+ const f=await seedWorld();await f.api.issueFiniteMaterialSeed(f.options);
+ await assert.rejects(f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal}));
+ f.complete();assert((await f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal})).seedHash);
+});
+for(const mode of ['tag-lost','tag-late','ref-lost','ref-late'])test('shared original capability never refills after '+mode,async()=>{
+ const f=await seedWorld();f.state.mode=mode;await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));const posts=f.state.tagPosts+f.state.refPosts;
+ f.state.mode='normal';await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts+f.state.refPosts,posts);assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,mode.startsWith('tag')?0:1);
+});
+for(const mode of ['marker','action','attempt','existing','bare','wrong-module','wrong-profile','changed-pointer','primary-complete','bad-comment'])test('issuer fails closed before seed POST: '+mode,async()=>{
+ const f=await seedWorld();
+ if(mode==='marker')process.env.AFW_FINITE_SEED_ORIGINAL_PID='0';if(mode==='action')process.env.GITHUB_ACTION='other';if(mode==='attempt')process.env.GITHUB_RUN_ATTEMPT='2';
+ if(mode==='existing'||mode==='bare')f.map.set('/git/ref/tags/afw-finite-observer-create/'+f.seed.intentId,{ref:f.ref,object:{type:mode==='bare'?'commit':'tag',sha:f.tagSha}});
+ if(mode==='wrong-module')f.versions[f.live.versionId].modules[0].content_base64=Buffer.from('altered').toString('base64');
+ if(mode==='wrong-profile')f.versions[f.live.versionId].bindings[0].class_name='Wrong';
+ if(mode==='changed-pointer'){let reads=0;f.state.hook=async url=>{if(url.includes('/deployments?')&&++reads===2)f.live.deploymentId='33333333-3333-4333-8333-333333333333';};}
+ if(mode==='primary-complete')f.complete();
+ if(mode==='bad-comment')f.map.get('/issues/comments/123').body+=' ';
+ await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,0);assert.equal(f.state.refPosts,0);
+});
+test('default missing 4C source authority is unavailable after real package and before custody/POST',async()=>{
+ const f=await seedWorld({sourceAuthority:false});await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert(f.calls.some(x=>x.url.includes('/actions/artifacts/202/zip')));assert(!f.calls.some(x=>x.url.includes('api.cloudflare.com')));assert.equal(f.state.tagPosts,0);
+});
+test('caller source/pins/receipt cannot replace fixed original issuer authority',async()=>{
+ const f=await seedWorld();for(const k of ['seed','pins','resolveSource','receipt'])await assert.rejects(f.api.issueFiniteMaterialSeed({...f.options,[k]:()=>true}));assert.equal(f.calls.length,0);
+});
+test('actual workflow has sole seed launcher before ready and preserves restore launcher',async()=>{
+ const text=await readFile('.github/workflows/afw-finite-finalizer.yml','utf8');
+ assert(text.indexOf('name: seed-material')<text.indexOf('name: admit-and-ready'));assert.equal((text.match(/export AFW_FINITE_SEED_ORIGINAL_PID=\$\$/g)??[]).length,1);
+ assert.equal((text.match(/exec node scripts\/run-qa-finite-trial-finalizer.mjs seed-material/g)??[]).length,1);
+ assert.match(text,/id: finite_seed_once/);assert.match(text,/id: finite_restore_once/);
+});
+
+test('changed primary after tag ACK cannot send the ref',async()=>{
+ const f=await seedWorld();f.state.hook=async url=>{if(f.state.tagPosts&&url.endsWith('/git/ref/heads/main'))f.map.get('/git/ref/heads/main').object.sha='0'.repeat(40);};
+ await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,0);
+});
+
+test('lost ref ACK permits completed-primary GET reconciliation but never refunds issuer',async()=>{
+ const f=await seedWorld();f.state.mode='ref-lost';await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));f.state.mode='normal';f.complete();
+ const r=await f.api.readFiniteMaterialSeed({intentId:f.seed.intentId,sourceRevision:f.seed.sourceRevision,fetchImpl:f.fetchImpl,now:f.now,signal:f.options.signal});assert.equal(r.seed.intentId,f.seed.intentId);
+ await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));assert.equal(f.state.tagPosts,1);assert.equal(f.state.refPosts,1);
+});
+
+for(const mode of ['missing','malformed','nonstring-array'])test('issuer rejects '+mode+' admit job start before POST',async()=>{
+ const f=await seedWorld(),job=f.map.get('/actions/runs/11/attempts/1/jobs?per_page=100').jobs[0];
+ if(mode==='missing')delete job.started_at;
+ else job.started_at=mode==='malformed'?'not-a-date':[job.started_at];
+ await assert.rejects(f.api.issueFiniteMaterialSeed(f.options));
+ assert.equal(f.state.tagPosts,0);assert.equal(f.state.refPosts,0);
+});

~~~~~~~~~~

## test/mcp-qa-finite-seed.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-seed.test.mjs b/test/mcp-qa-finite-seed.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-seed.test.mjs
@@ -0,0 +1,167 @@
+import {v2Manifest} from './fixtures/finite-v2.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import * as api from '../lib/mcp-qa-finite-seed.mjs';
+
+// Independent test canonicalizer/digest; fixtures establish syntax only.
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+const digest=(domain,v)=>createHash('sha256').update(domain+'\n'+canonical(v)).digest('hex');
+const roles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
+function fixture(){
+ const descriptor=role=>({sourceRevision:'c'.repeat(40),sourceTree:'d'.repeat(40),module:{name:role==='qaClosed'?'closed-rollback.mjs':'index.mjs',sha256:'e'.repeat(64),bytes:3145728,exports:['$export','A','_export','z']},configurationHash:'1'.repeat(64),profileHash:'2'.repeat(64),bindingsHash:'3'.repeat(64)});
+ const manifest={purpose:'afw.finite-native-package.v2',sourceRevision:'b'.repeat(40),sourceTree:'f'.repeat(40),sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:'4'.repeat(64),modules:Object.fromEntries(roles.map(role=>[role,descriptor(role)])),compatibility:Object.fromEntries(['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'].map(k=>[k,true]))};
+ v2Manifest(manifest);
+ return {purpose:'afw.finite-material-seed.v2',repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:1347578006,intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40),commandId:'123',finalizer:{runId:11,attempt:1,jobId:12,workflowPath:'.github/workflows/afw-finite-finalizer.yml',seedStep:'seed-material'},build:{workflowPath:'.github/workflows/afw-finite-native-package.yml',runId:13,attempt:1,artifactId:14,artifactName:'afw-finite-native-package-'+'b'.repeat(40),artifactDigest:'sha256:'+'5'.repeat(64),manifestHash:digest('afw.finite-native-manifest.v2',manifest)},manifest,qaPublication:{purpose:'afw.finite-qa-publication.v1',accountId:'85d0d5dadac3341a564f22ce885e9eec',workerName:'agent-friendly-web-independent-closure-qa',qaLive:{configurationHash:'1'.repeat(64),versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',...Object.fromEntries(['module','publicStatic'].map(k=>[k,structuredClone(manifest.modules.qaLive[k])]))},qaClosed:{configurationHash:'1'.repeat(64),versionId:'c570b60b-95dc-48e1-89f3-9c4651691dbc',...Object.fromEntries(['module','publicStatic'].map(k=>[k,structuredClone(manifest.modules.qaClosed[k])]))},observedAt:Date.parse('2026-11-01T20:00:00Z')}};
+}
+const envelope=seed=>canonical({purpose:'afw.finite-material-seed-envelope.v2',seed,seedHash:digest('afw.finite-material-seed.v2',seed)});
+function frozen(v){if(v&&typeof v==='object'){assert.equal(Object.isFrozen(v),true);for(const x of Object.values(v))frozen(x);}}
+test('canonical roundtrip uses independent domains, immutable copy, historical descriptor provenance',()=>{
+ const seed=fixture(),before=structuredClone(seed),text=api.encodeFiniteMaterialSeed(seed);
+ assert.equal(text,envelope(seed));assert.equal(text.includes('\n'),false);
+ const result=api.decodeFiniteMaterialSeed(text);
+ assert.deepEqual(result,{seed,seedHash:digest('afw.finite-material-seed.v2',seed)});frozen(result);
+ assert.notEqual(result.seed,seed);assert.deepEqual(seed,before);
+ assert.notEqual(seed.manifest.modules.operatorClosed.provenance.sourceRevision,seed.sourceRevision);
+ const reversed=Object.fromEntries(Object.entries(seed).reverse());assert.equal(api.encodeFiniteMaterialSeed(reversed),text);
+ const manifest=api.validateFinitePackageManifest(seed.manifest);frozen(manifest);assert.notEqual(manifest,seed.manifest);
+ assert.equal(api.encodeFinitePackageManifest(seed.manifest),canonical(seed.manifest));
+ assert.equal(api.hashFinitePackageManifest(seed.manifest),seed.build.manifestHash);
+ seed.manifest.modules.qaLive.module.bytes=1;assert.equal(result.seed.manifest.modules.qaLive.module.bytes,3145728);
+});
+const cases={
+ 'missing QA publication':s=>delete s.qaPublication,
+ 'foreign publication account':s=>s.qaPublication.accountId='a'.repeat(32),
+ 'foreign publication worker':s=>s.qaPublication.workerName='foreign',
+ 'unknown publication field':s=>s.qaPublication.token='secret',
+ 'wrong closed locator':s=>s.qaPublication.qaClosed.versionId=s.qaPublication.qaLive.versionId,
+ 'profile mismatch':s=>s.qaPublication.qaLive.publicStatic.profileHash='0'.repeat(64),
+ 'module mismatch':s=>s.qaPublication.qaClosed.module.bytes++,
+ 'noninteger publication date':s=>s.qaPublication.observedAt=1.5,
+ 'wrong repository':s=>s.repository='other/repo',
+ 'wrong repository ID':s=>s.repositoryId++,
+ 'wrong seed purpose':s=>s.purpose='other',
+ 'intent upper hex':s=>s.intentId='A'.repeat(64),
+ 'short source':s=>s.sourceRevision='b'.repeat(39),
+ 'numeric command':s=>s.commandId=123,
+ 'zero command':s=>s.commandId='0',
+ 'leading zero command':s=>s.commandId='01',
+ 'empty command':s=>s.commandId='',
+ 'finalizer zero run':s=>s.finalizer.runId=0,
+ 'finalizer unsafe job':s=>s.finalizer.jobId=Number.MAX_SAFE_INTEGER+1,
+ 'finalizer fractional job':s=>s.finalizer.jobId=1.5,
+ 'finalizer attempt2':s=>s.finalizer.attempt=2,
+ 'finalizer path':s=>s.finalizer.workflowPath='.github/workflows/other.yml',
+ 'finalizer step':s=>s.finalizer.seedStep='admit-and-ready',
+ 'build path':s=>s.build.workflowPath='other',
+ 'build zero run':s=>s.build.runId=0,
+ 'build zero artifact':s=>s.build.artifactId=0,
+ 'build attempt2':s=>s.build.attempt=2,
+ 'build artifact name':s=>s.build.artifactName='afw-finite-native-package-other',
+ 'build artifact digest':s=>s.build.artifactDigest='sha256:'+'A'.repeat(64),
+ 'build manifest digest':s=>s.build.manifestHash='0'.repeat(64),
+ 'manifest purpose':s=>s.manifest.purpose='other',
+ 'manifest source mismatch':s=>s.manifest.sourceRevision='c'.repeat(40),
+ 'manifest tree':s=>s.manifest.sourceTree='f'.repeat(39),
+ 'manifest sourceCheck':s=>s.manifest.sourceCheck='other',
+ 'manifest workflow hash':s=>s.manifest.buildWorkflowHash='A'.repeat(64),
+ 'missing role':s=>delete s.manifest.modules.qaClosed,
+ 'extra role':s=>s.manifest.modules.extra=s.manifest.modules.qaLive,
+ 'missing descriptor provenance':s=>delete s.manifest.modules.operatorClosed.provenance.receiptKey,
+ 'bad descriptor tree':s=>s.manifest.modules.qaLive.provenance.sourceTree='x'.repeat(40),
+ 'bad configuration hash':s=>s.manifest.modules.qaLive.publicStatic.configurationHash='x'.repeat(64),
+ 'bad profile hash':s=>s.manifest.modules.qaLive.publicStatic.profileHash=null,
+ 'bad binding hash':s=>s.manifest.modules.qaLive.publicStatic.bindingsHash=1,
+ 'module basename':s=>s.manifest.modules.qaLive.module.name='qaLive/index.mjs',
+ 'module zero bytes':s=>s.manifest.modules.qaLive.module.bytes=0,
+ 'module over cap':s=>s.manifest.modules.qaLive.module.bytes=3145729,
+ 'module unsafe bytes':s=>s.manifest.modules.qaLive.module.bytes=Number.MAX_SAFE_INTEGER+1,
+ 'module fractional bytes':s=>s.manifest.modules.qaLive.module.bytes=1.5,
+ 'module infinite bytes':s=>s.manifest.modules.qaLive.module.bytes=Infinity,
+ 'module NaN bytes':s=>s.manifest.modules.qaLive.module.bytes=NaN,
+ 'module hash':s=>s.manifest.modules.qaLive.module.sha256='e'.repeat(63),
+ 'export129':s=>s.manifest.modules.qaLive.module.exports=Array.from({length:129},(_,i)=>'export'+String(i).padStart(3,'0')),
+ 'export duplicate':s=>s.manifest.modules.qaLive.module.exports=['A','A'],
+ 'export unsorted':s=>s.manifest.modules.qaLive.module.exports=['z','A'],
+ 'export nonASCII':s=>s.manifest.modules.qaLive.module.exports=['é'],
+ 'export invalid identifier':s=>s.manifest.modules.qaLive.module.exports=['a-b'],
+ 'export too long':s=>s.manifest.modules.qaLive.module.exports=['a'.repeat(129)],
+ 'export wrong type':s=>s.manifest.modules.qaLive.module.exports='A',
+ 'compatibility false':s=>s.manifest.compatibility.closedEntrypointsDenied=false,
+ 'unknown root':s=>s.extra=true,
+ 'unknown module':s=>s.manifest.modules.qaLive.module.extra=true,
+ 'prototype key':s=>Object.defineProperty(s,'__proto__',{value:{},enumerable:true}),
+ 'constructor key':s=>s.manifest.constructor='x',
+ 'prototype object':s=>Object.setPrototypeOf(s,{extra:true}),
+ 'nonplain date':s=>s.manifest=new Date(),
+ 'symbol key':s=>s[Symbol('extra')]=1,
+ 'accessor':s=>Object.defineProperty(s.finalizer,'runId',{get(){throw Error('accessor invoked');},enumerable:true}),
+ 'array accessor':s=>Object.defineProperty(s.manifest.modules.qaLive.module.exports,'0',{get(){throw Error('accessor invoked');},enumerable:true}),
+ 'sparse array':s=>delete s.manifest.modules.qaLive.module.exports[0],
+ 'array property':s=>s.manifest.modules.qaLive.module.exports.extra=true,
+ 'nonenumerable':s=>Object.defineProperty(s,'extra',{value:1}),
+};
+for(const [name,mutate] of Object.entries(cases))test('encode rejects '+name,()=>{
+ const seed=fixture();mutate(seed);assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);
+});
+for(const field of ['planHash','controlHash','selectors','policy','grant','token','callback'])test('private '+field+' rejected at every structural boundary',()=>{
+ const seed=fixture();for(const value of [seed,seed.finalizer,seed.build,seed.manifest,seed.manifest.modules,seed.manifest.modules.qaLive,seed.manifest.modules.qaLive.module,seed.manifest.compatibility,seed.qaPublication,seed.qaPublication.qaLive,seed.qaPublication.qaClosed]){
+  value[field]='private';assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);delete value[field];
+ }
+});
+test('manifest helpers share structural validation and reject oversized manifest',()=>{
+ const manifest=fixture().manifest;manifest.modules.qaLive.module.exports=['z','A'];
+ for(const fn of [api.validateFinitePackageManifest,api.encodeFinitePackageManifest,api.hashFinitePackageManifest])assert.throws(()=>fn(manifest),/Finite material/);
+ const large=fixture().manifest;for(const role of roles)large.modules[role].module.exports=Array.from({length:128},(_,i)=>'a'+String(i).padStart(3,'0')+'x'.repeat(124));
+ assert.ok(Buffer.byteLength(canonical(large))>24576);assert.throws(()=>api.validateFinitePackageManifest(large),/Finite material/);
+});
+test('empty and 128 valid exports accepted; maximum safe IDs preserved',()=>{
+ const seed=fixture();seed.finalizer.runId=Number.MAX_SAFE_INTEGER;seed.manifest.modules.qaLive.module.exports=[];
+ seed.manifest.modules.qaClosed.module.exports=Array.from({length:128},(_,i)=>'a'+String(i).padStart(3,'0'));
+ for(const role of ['qaLive','qaClosed'])seed.qaPublication[role].module=structuredClone(seed.manifest.modules[role].module);
+ seed.build.manifestHash=digest('afw.finite-native-manifest.v2',seed.manifest);
+ assert.deepEqual(api.decodeFiniteMaterialSeed(api.encodeFiniteMaterialSeed(seed)).seed,seed);
+});
+test('decode rejects duplicate keys including escaped duplicates and nested duplicates',()=>{
+ const text=envelope(fixture());for(const bad of [
+ text.replace('"purpose":"afw.finite-material-seed-envelope.v2"','"purpose":"ignored","purpose":"afw.finite-material-seed-envelope.v2"'),
+ text.replace('"purpose":"afw.finite-material-seed-envelope.v2"','"pur\\u0070ose":"ignored","purpose":"afw.finite-material-seed-envelope.v2"'),
+ text.replace('"attempt":1','"attempt":2,"attempt":1'),
+ ])assert.throws(()=>api.decodeFiniteMaterialSeed(bad),/Finite material/);
+});
+test('decode enforces canonical envelope, both digests and exact keys',()=>{
+ const text=envelope(fixture()),parsed=JSON.parse(text);
+ for(const bad of [
+ text+'\n',' '+text,JSON.stringify(parsed,null,2),JSON.stringify({...parsed,seedHash:'0'.repeat(64)}),
+ canonical({...parsed,purpose:'other'}),canonical({...parsed,extra:1}),canonical({...parsed,seedHash:'A'.repeat(64)}),
+ text.replace('"repositoryId":1347578006','"repositoryId":1.347578006e9'),
+ text.replace('"seed":{','"seed":{"__proto__":{},'),
+ ])assert.throws(()=>api.decodeFiniteMaterialSeed(bad),/Finite material/);
+ const seed=fixture();seed.build.manifestHash='0'.repeat(64);assert.throws(()=>api.decodeFiniteMaterialSeed(envelope(seed)),/Finite material/);
+});
+test('envelope UTF8 byte bound, depth and node bounds fail closed',()=>{
+ const seed=fixture(),text=envelope(seed),huge=' '.repeat(32769);
+ assert.throws(()=>api.decodeFiniteMaterialSeed(huge),/Finite material/);
+ seed.commandId='1'.repeat(32769);assert.throws(()=>api.encodeFiniteMaterialSeed(seed),/Finite material/);
+ const atBoundary=fixture();let width=32768-Buffer.byteLength(envelope(atBoundary))+atBoundary.commandId.length;
+ atBoundary.commandId='1'.repeat(width);assert.equal(Buffer.byteLength(envelope(atBoundary)),32768);
+ assert.equal(api.encodeFiniteMaterialSeed(atBoundary),envelope(atBoundary));atBoundary.commandId+='1';
+ assert.throws(()=>api.encodeFiniteMaterialSeed(atBoundary),/Finite material/);
+ let nested=null;for(let i=0;i<13;i++)nested={x:nested};
+ assert.throws(()=>api.validateFinitePackageManifest(nested),/Finite material/);
+ assert.throws(()=>api.validateFinitePackageManifest({x:Array(2049).fill(1)}),/Finite material/);
+ assert.throws(()=>api.decodeFiniteMaterialSeed(text.slice(0,-1)),/Finite material/);
+});
+
+test('fixed QA closed basename preserves closed-rollback.mjs and rejects relabeling',()=>{
+ const manifest=fixture().manifest;
+ assert.equal(api.validateFinitePackageManifest(manifest).modules.qaClosed.module.name,'closed-rollback.mjs');
+ manifest.modules.qaClosed.module.name='index.mjs';
+ assert.throws(()=>api.validateFinitePackageManifest(manifest),/Finite material/);
+});
+test('other fixed roles cannot adopt the QA closed module basename',()=>{
+ for(const role of roles.filter(r=>r!=='qaClosed')){
+  const manifest=fixture().manifest;manifest.modules[role].module.name='closed-rollback.mjs';
+  assert.throws(()=>api.validateFinitePackageManifest(manifest),/Finite material/);
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-trial-control-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-trial-control-native.test.mjs b/test/mcp-qa-finite-trial-control-native.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-trial-control-native.test.mjs
@@ -0,0 +1,47 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
+import {build} from 'esbuild';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+// Actual workerd DO SQLite + transactions + native ctx/env bindings.
+// Primary/GitHub/version evidence and clock are synthetic; no live AFW authority.
+test('native prepare before facts; reconstruction preserves original alarm and immutable observed facts',async()=>{
+ const entry="import {DurableObject} from 'cloudflare:workers';\nimport {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin} from './lib/mcp-qa-finite-trial-control.mjs';\nimport {finiteFixture} from './test/fixtures/qa-finite-trial.mjs';\nexport class FiniteFixture extends DurableObject{\n #control; #fixture;\n async setupFixture(){if(this.#control)return;\n  let at=await this.ctx.storage.get('fixture:clock');if(at===undefined){at=Date.now()+600000;await this.ctx.storage.put('fixture:clock',at);}const f=finiteFixture({at});f.plan.resources.actorId=this.ctx.id.toString();this.#fixture=f;\n  for(const kind of ['subscription','process','saved_event'])f.primary[kind==='saved_event'?'savedEvent':kind]=async()=>{\n   if(!await this.ctx.storage.get('fixture:observe'))return null;\n   const value=f.facts[kind](),mode=await this.ctx.storage.get('fixture:mode');\n   if(mode==='duplicate')value.candidates=2;\n   if(mode==='replacement'&&kind==='subscription')value.receiptHash='f'.repeat(64);\n   if(mode==='wrong_revision'&&kind==='saved_event')value.revision++;\n   return value;\n  };\n  const finalizer=f.primary.finalizer;let reads=0;\n  f.primary.finalizer=async()=>{if(await this.ctx.storage.get('fixture:mode')==='pending'&&++reads>=1)throw Error('fixture lost primary');return finalizer();};\n  this.#control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin:createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision}),plan:JSON.stringify(f.plan),readPrimary:f.primary,now:f.now,timeoutMs:5000});\n }\n async seedFixture(){await this.setupFixture();for(const [k,v]of this.#fixture.rows)if(await this.ctx.storage.get(k)===undefined)await this.ctx.storage.put(k,v);}\n async commandFixture(method,kind){await this.setupFixture();if(!['prepare','read','captureObservedFacts','withdrawNominal','claimEffect'].includes(method))throw Error('fixture');return kind?this.#control[method](kind):this.#control[method]();}\n async modeFixture(mode){await this.ctx.storage.put('fixture:mode',mode);}\n async observedFixture(){await this.ctx.storage.put('fixture:observe',true);}\n async recreateFixture(){this.#control=undefined;this.#fixture=undefined;await this.setupFixture();}\n async rowsFixture(){return {rows:[...await this.ctx.storage.list()],alarm:await this.ctx.storage.getAlarm()};}\n async alarm(){}\n}\nexport default {async fetch(request,env){const b=await request.json(),s=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));\nif(b.method==='mode'){await s.modeFixture(b.kind);return Response.json({ok:true});}\nif(b.method==='seed'){await s.seedFixture();return Response.json({ok:true});}\nif(b.method==='observe'){await s.observedFixture();return Response.json({ok:true});}\nif(b.method==='recreate'){await s.recreateFixture();return Response.json({ok:true});}\nif(b.method==='rows')return Response.json(await s.rowsFixture());\nreturn Response.json(await s.commandFixture(b.method,b.kind));}};";
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'finite-trial-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const flags=Object.fromEntries(['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'].map(k=>[k,'true']));
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-test-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FiniteFixture',useSQLite:true,uniqueKey:'finite-native-fixture'},AFW_RELEASE_EVENTS_NODE:{className:'FiniteFixture',useSQLite:true,uniqueKey:'finite-native-node'}}}));
+ try{
+ const call=async(method,kind)=>{const r=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method,kind})});assert.equal(r.status,200);return r.json();};
+ await call('seed');const before=await call('rows');assert.equal((await call('prepare')).status,'armed');
+ const read=await call('read');assert.equal(read.nominalEligible,true);assert.equal(read.N1-read.T0,300000);assert.equal(read.R1-read.N1,180000);
+ const prepared=await call('rows');assert.equal(prepared.alarm,read.C0);assert.equal((await call('captureObservedFacts','subscription')).status,'not_yet_observed');assert.deepEqual(await call('rows'),prepared);
+ await call('observe');for(const kind of ['subscription','process','saved_event'])assert.equal((await call('captureObservedFacts',kind)).status,'captured');
+ const captured=await call('rows');
+ await call('mode','replacement');assert.equal((await call('captureObservedFacts','subscription')).status,'blocked');
+ await call('mode','wrong_revision');assert.equal((await call('captureObservedFacts','saved_event')).status,'blocked');
+ await call('mode','duplicate');assert.equal((await call('captureObservedFacts','subscription')).status,'blocked');
+ await call('mode','none');const restored=await call('rows');
+ await call('recreate');const recovered=await call('read');assert.equal(recovered.phase,'armed');assert.equal(recovered.nominalEligible,false);assert.equal(Object.keys(recovered.facts).length,3);
+ assert.equal((await call('claimEffect','nominal')).status,'blocked');assert.equal((await call('prepare')).status,'blocked');
+ assert.equal((await call('captureObservedFacts','saved_event')).status,'observed');assert.deepEqual(await call('rows'),restored);assert.equal(new Map(captured.rows).get('afw.qa-finite-trial.v1:finite-test-001:info').plan,new Map(restored.rows).get('afw.qa-finite-trial.v1:finite-test-001:info').plan);
+ assert.equal((await call('withdrawNominal')).status,'withdrawn');assert.equal((await call('claimEffect','close')).status,'issued');
+ assert.equal((await call('claimEffect','close')).status,'reconcile_only');const final=await call('rows');assert.equal(final.alarm,read.C0);
+ for(const [k,v]of before.rows)assert.deepEqual(new Map(final.rows).get(k),v);
+ }finally{await mf.dispose();}
+});
+
+test('native pending after lost primary read cannot be rearmed; cleanup survives reconstruction',async()=>{
+ const entry="import {DurableObject} from 'cloudflare:workers';\nimport {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin} from './lib/mcp-qa-finite-trial-control.mjs';\nimport {finiteFixture} from './test/fixtures/qa-finite-trial.mjs';\nexport class FiniteFixture extends DurableObject{\n #control; #fixture;\n async setupFixture(){if(this.#control)return;\n  let at=await this.ctx.storage.get('fixture:clock');if(at===undefined){at=Date.now()+600000;await this.ctx.storage.put('fixture:clock',at);}const f=finiteFixture({at});f.plan.resources.actorId=this.ctx.id.toString();this.#fixture=f;\n  for(const kind of ['subscription','process','saved_event'])f.primary[kind==='saved_event'?'savedEvent':kind]=async()=>{\n   if(!await this.ctx.storage.get('fixture:observe'))return null;\n   const value=f.facts[kind](),mode=await this.ctx.storage.get('fixture:mode');\n   if(mode==='duplicate')value.candidates=2;\n   if(mode==='replacement'&&kind==='subscription')value.receiptHash='f'.repeat(64);\n   if(mode==='wrong_revision'&&kind==='saved_event')value.revision++;\n   return value;\n  };\n  const finalizer=f.primary.finalizer;let reads=0;\n  f.primary.finalizer=async()=>{if(await this.ctx.storage.get('fixture:mode')==='pending'&&++reads>=1)throw Error('fixture lost primary');return finalizer();};\n  this.#control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin:createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision}),plan:JSON.stringify(f.plan),readPrimary:f.primary,now:f.now,timeoutMs:5000});\n }\n async seedFixture(){await this.setupFixture();for(const [k,v]of this.#fixture.rows)if(await this.ctx.storage.get(k)===undefined)await this.ctx.storage.put(k,v);}\n async commandFixture(method,kind){await this.setupFixture();if(!['prepare','read','captureObservedFacts','withdrawNominal','claimEffect'].includes(method))throw Error('fixture');return kind?this.#control[method](kind):this.#control[method]();}\n async modeFixture(mode){await this.ctx.storage.put('fixture:mode',mode);}\n async observedFixture(){await this.ctx.storage.put('fixture:observe',true);}\n async recreateFixture(){this.#control=undefined;this.#fixture=undefined;await this.setupFixture();}\n async rowsFixture(){return {rows:[...await this.ctx.storage.list()],alarm:await this.ctx.storage.getAlarm()};}\n async alarm(){}\n}\nexport default {async fetch(request,env){const b=await request.json(),s=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));\nif(b.method==='mode'){await s.modeFixture(b.kind);return Response.json({ok:true});}\nif(b.method==='seed'){await s.seedFixture();return Response.json({ok:true});}\nif(b.method==='observe'){await s.observedFixture();return Response.json({ok:true});}\nif(b.method==='recreate'){await s.recreateFixture();return Response.json({ok:true});}\nif(b.method==='rows')return Response.json(await s.rowsFixture());\nreturn Response.json(await s.commandFixture(b.method,b.kind));}};";
+ const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'finite-trial-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
+ const flags=Object.fromEntries(['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'].map(k=>[k,'true']));
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-test-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'FiniteFixture',useSQLite:true,uniqueKey:'finite-native-fixture'},AFW_RELEASE_EVENTS_NODE:{className:'FiniteFixture',useSQLite:true,uniqueKey:'finite-native-node'}}}));
+
+ try{
+ const call=async(method,kind)=>{const r=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method,kind})});assert.equal(r.status,200);return r.json();};
+ await call('seed');await call('mode','pending');assert.equal((await call('prepare')).status,'uncertain');
+ const stored=await call('rows');assert.ok(stored.alarm>0);await call('recreate');const read=await call('read');assert.equal(read.phase,'pending');assert.equal(read.nominalEligible,false);
+ assert.equal((await call('claimEffect','nominal')).status,'blocked');assert.equal((await call('prepare')).status,'blocked');
+ assert.deepEqual(await call('rows'),stored);assert.equal((await call('claimEffect','close')).status,'issued');assert.equal((await call('claimEffect','close')).status,'reconcile_only');
+ assert.equal((await call('rows')).alarm,stored.alarm);
+ }finally{await mf.dispose();}
+});

~~~~~~~~~~

## test/mcp-qa-finite-trial-control.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-trial-control.test.mjs b/test/mcp-qa-finite-trial-control.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-trial-control.test.mjs
@@ -0,0 +1,261 @@
+import {finiteLauncherInstanceId} from '../lib/mcp-qa-finite-launch-records.mjs';
+import {finiteCleanupPolicyHash} from '../lib/mcp-finite-cleanup-policy.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {finiteFixture,ROOT,HEAD,hash} from './fixtures/qa-finite-trial.mjs';
+const api=await import('../lib/mcp-qa-finite-trial-control.mjs').catch(()=>({}));
+const control=f=>{assert.equal(typeof api.createPrivateQaFiniteTrialControl,'function');return api.createPrivateQaFiniteTrialControl(f.options(api));};
+test('prepare stores planned INFO before subscription/save, exact original clocks and durable alarm',async()=>{
+ const f=finiteFixture(),c=control(f),old=[...f.rows].map(([k,v])=>[k,JSON.stringify(v)]);
+ assert.equal((await c.prepare()).status,'armed');assert.equal(f.alarm,f.plan.C0);
+ const r=await c.read();assert.equal(r.phase,'armed');assert.equal(r.nominalEligible,true);assert.equal(r.operationalReadiness,false);
+ const info=f.rows.get(ROOT+':'+f.plan.intentId+':info');assert.equal(info.plan,JSON.stringify(f.plan));assert.equal(JSON.stringify(info).includes('subscriptionId'),false);
+ const before=f.puts;assert.equal((await c.captureObservedFacts('subscription')).status,'not_yet_observed');assert.equal(f.puts,before);
+ for(const [k,v]of old)assert.equal(JSON.stringify(f.rows.get(k)),v);
+ assert.equal((await c.prepare()).status,'blocked');assert.equal(f.puts,before);
+});
+test('capture exact fixed primary facts once, preserves immutable INFO/control hash',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();const info=structuredClone(f.rows.get(ROOT+':'+f.plan.intentId+':info'));
+ for(const kind of ['subscription','process','saved_event']){f.primary[kind==='saved_event'?'savedEvent':kind]=async()=>f.facts[kind]();}
+ // Capability method replacement is forbidden for an existing control; reconstruct.
+ const fresh=control(f);
+ for(const kind of ['subscription','process','saved_event'])assert.equal((await fresh.captureObservedFacts(kind)).status,'captured');
+ const n=f.puts;assert.equal((await fresh.captureObservedFacts('saved_event')).status,'observed');assert.equal(f.puts,n);
+ assert.deepEqual(f.rows.get(ROOT+':'+f.plan.intentId+':info'),info);
+ assert.equal((await fresh.captureObservedFacts('latest')).status,'blocked');
+ assert.equal((await fresh.captureObservedFacts('subscription',{})).status,'blocked');
+});
+test('withdraw nominal leaves cleanup claims and original alarm intact',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();assert.equal((await c.withdrawNominal()).status,'withdrawn');assert.equal(f.alarm,f.plan.C0);
+ assert.equal((await c.claimEffect('nominal')).status,'blocked');
+ f.setNow(f.plan.N1+1);assert.equal((await c.claimEffect('withdraw')).status,'issued');assert.equal((await c.claimEffect('withdraw')).status,'reconcile_only');
+ f.setNow(f.plan.C1);assert.equal((await c.claimEffect('close')).status,'blocked');
+ assert.equal((await c.read()).nominalEligible,false);
+});
+test('fresh per-intent head rejects a second intent and V2/orphan histories',async()=>{
+ const f=finiteFixture();await control(f).prepare();const head=structuredClone(f.rows.get(HEAD));f.plan.intentId='other';f.plan.workflows.launcher=finiteLauncherInstanceId({intentId:f.plan.intentId,sourceRevision:f.plan.source.revision});f.plan.closePolicyHash=finiteCleanupPolicyHash(f.plan);assert.equal((await control(f).prepare()).status,'blocked');assert.deepEqual(f.rows.get(HEAD),head);
+ for(const key of ['afw.qa-generation-head.v2','afw.qa-generation-info.v2:orphan',ROOT+':orphan:info']){
+ const g=finiteFixture();g.rows.set(key,{});assert.equal((await control(g).prepare()).status,'blocked');assert.equal(g.puts,0);}
+});
+for(const mutation of [
+ p=>{p.N1++;},p=>{p.C0++;},p=>{p.C1++;},p=>{p.R1++;},p=>{p.T0++;},
+ p=>{p.command.kind='closed';},p=>{p.command.repository='other/repo';},p=>{p.source.extra=true;},
+ p=>{p.selectors.subscriptionId='future';},p=>{p.selectors.expectedProjectRevision=0;},p=>{p.workflows.confirmation='other';},
+ p=>{p.finalizer.runId=0;},p=>{p.legacy.preparedDispatchHash='0'.repeat(64);}
+])test('strict immutable plan rejects '+mutation.toString(),()=>{const f=finiteFixture();mutation(f.plan);assert.throws(()=>control(f));});
+for(const [label,mutate]of [
+ ['future T0',f=>f.setNow(f.plan.T0-1)],['less than 180s remaining',f=>f.setNow(f.plan.N1-179999)],
+ ['uncontained legacy',f=>{const fn=f.primary.admission;f.primary.admission=async()=>{const v=await fn();v.containment.denyBeforeAccess=false;return v;};}],
+ ['unresolved current write',f=>{const fn=f.primary.admission;f.primary.admission=async()=>{const v=await fn();v.quiescence.unresolvedWrites=1;return v;};}],
+ ['queued finalizer',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.status='queued';return v;};}],
+ ['ready boolean',f=>{f.primary.finalizer=async()=>({ready:true});}],
+ ['unfinished admit',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.job.steps[0].status='in_progress';return v;};}],
+ ['wrong source',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.sourceRevision='0'.repeat(40);return v;};}],
+ ['wrong job',f=>{const fn=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await fn();v.job.id++;return v;};}],
+ ['changed legacy',f=>{f.rows.get('afw.private-prepared-dispatch.v1').phase='complete';}],
+ ['present restoration',f=>{f.rows.set('afw.successor-canary-restoration.v1',null);}]
+])test('arm denies '+label,async()=>{const f=finiteFixture();mutate(f);const pending=['queued finalizer','ready boolean','unfinished admit','wrong source','wrong job'].includes(label);assert.equal((await control(f).prepare()).status,pending?'uncertain':'blocked');if(pending){assert.ok(f.puts>0);assert.equal(f.alarm,f.plan.C0);}else assert.equal(f.puts,0);});
+test('unknown initial commit stays pending, read does not arm or retry',async()=>{
+ const f=finiteFixture();f.lost.add(1);const c=control(f);assert.equal((await c.prepare()).status,'uncertain');const n=f.puts;
+ assert.equal((await control(f).read()).phase,'pending');assert.equal((await control(f).read()).nominalEligible,false);assert.equal((await control(f).prepare()).status,'blocked');assert.equal(f.puts,n);
+});
+test('alarm mismatch leaves pending and cannot be compensated',async()=>{
+ const f=finiteFixture();f.storage.getAlarm=async()=>null;const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.read()).phase,'pending');
+});
+test('native pin rejects attestation and binds ctx storage, actual version and flags without touching secrets',async()=>{
+ const f=finiteFixture();Object.defineProperty(f.env,'AFW_RELEASE_READ_TOKEN',{get(){throw Error('secret read');}});
+ const options=f.options(api);assert.throws(()=>api.createPrivateQaFiniteTrialControl({...options,nativePin:{snapshot:()=>({ready:true})}}));
+ const c=api.createPrivateQaFiniteTrialControl(options);assert.equal((await c.prepare()).status,'armed');
+ f.env.AFW_RELEASE_WORKFLOW_ENABLED='false';assert.equal((await c.read()).status,'blocked');f.env.AFW_RELEASE_WORKFLOW_ENABLED='true';assert.equal((await c.claimEffect('nominal')).status,'blocked');
+});
+test('plan getters and noncanonical encoding rejected without evaluation',()=>{
+ const f=finiteFixture();let calls=0;const o=f.options(api);Object.defineProperty(o,'plan',{enumerable:true,get(){calls++;return '{}';}});assert.throws(()=>api.createPrivateQaFiniteTrialControl(o));assert.equal(calls,0);
+ const g=finiteFixture();assert.throws(()=>api.createPrivateQaFiniteTrialControl({...g.options(api),plan:JSON.stringify(g.plan,null,2)}));
+});
+test('capture rejects replacement receipt, wrong saved revision/fingerprint and generation',async()=>{
+ for(const [kind,key,val]of [['subscription','receiptHash','f'.repeat(64)],['process','processGeneration','replacement'],['saved_event','revision',3],['saved_event','fingerprint','f'.repeat(64)]]){
+ const f=finiteFixture();for(const k of ['subscription','process','saved_event'])f.primary[k==='saved_event'?'savedEvent':k]=async()=>f.facts[k]();
+ const c=control(f);await c.prepare();await c.captureObservedFacts('subscription');await c.captureObservedFacts('process');await c.captureObservedFacts('saved_event');const old=f.facts[kind];f.facts[kind]=()=>({...old(),[key]:val});
+ const n=f.puts;assert.equal((await c.captureObservedFacts(kind)).status,'blocked');assert.equal(f.puts,n);
+ }
+});
+test('duplicate primary candidates and future primary facts rejected',async()=>{
+ for(const patch of [{candidates:2},{observedAt:Infinity},{observedAt:0}]){
+ const f=finiteFixture();f.primary.subscription=async()=>({...f.facts.subscription(),...patch});const c=control(f);await c.prepare();const n=f.puts;assert.equal((await c.captureObservedFacts('subscription')).status,'blocked');assert.equal(f.puts,n);}
+});
+test('unknown fact commit reconciles retained exact record without append/replay',async()=>{
+ const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();f.lost.add(f.transactions+2);
+ assert.equal((await c.captureObservedFacts('subscription')).status,'uncertain');const n=f.puts;
+ assert.equal((await control(f).captureObservedFacts('subscription')).status,'observed');assert.equal(f.puts,n);
+});
+test('unknown fact claim without fact cannot be retried after reconstruction',async()=>{
+ const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();f.lost.add(f.transactions+1);
+ assert.equal((await c.captureObservedFacts('subscription')).status,'uncertain');const n=f.puts;
+ assert.equal((await control(f).captureObservedFacts('subscription')).status,'reconcile_only');assert.equal(f.puts,n);
+});
+test('effect reconciliation is read only, receipts supplied as facts are rejected',async()=>{
+ const f=finiteFixture();const c=control(f);await c.prepare();const claim=await c.claimEffect('nominal');assert.equal(claim.status,'issued');const n=f.puts;
+ assert.equal((await c.reconcileEffect('nominal',{completed:true})).status,'blocked');assert.equal(f.puts,n);
+ assert.equal((await c.reconcileEffect('nominal')).status,'unresolved');assert.equal(f.puts,n);
+});
+test('clock reversal invalidates current instance; original expiry survives reconstruction',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();f.setNow(f.plan.T0+1);await c.read();f.setNow(f.plan.T0);assert.equal((await c.claimEffect('nominal')).status,'blocked');f.setNow(f.plan.T0+2);assert.equal((await c.claimEffect('nominal')).status,'blocked');
+ f.setNow(f.plan.N1);assert.equal((await control(f).claimEffect('nominal')).status,'blocked');assert.equal((await control(f).read()).nominalEligible,false);
+});
+test('changed native tuple and primary capability fail closed',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();f.primary.admission=async()=>f.admission();assert.equal((await c.claimEffect('nominal')).status,'blocked');
+ const g=finiteFixture(),d=control(g);g.env.AFW_QA_VERSION={id:g.env.AFW_QA_VERSION.id};assert.equal((await d.prepare()).status,'blocked');
+});
+test('no future saved evidence is synthesized or selected by latest',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();const n=f.puts;assert.equal((await c.captureObservedFacts('saved_event')).status,'not_yet_observed');assert.equal(f.puts,n);
+ assert.equal(hash(JSON.stringify(f.plan)).length,64);
+});
+
+test('lost armed CAS ACK never grants nominal authority after reconstruction',async()=>{
+ const f=finiteFixture();f.lost.add(2);const c=control(f);assert.equal((await c.prepare()).status,'uncertain');
+ const n=f.puts,recovered=control(f);assert.equal((await recovered.read()).phase,'armed');assert.equal((await recovered.read()).nominalEligible,false);
+ assert.equal((await recovered.claimEffect('nominal')).status,'blocked');assert.equal(f.puts,n);
+ assert.equal((await recovered.claimEffect('close')).status,'issued');
+});
+test('successful prepare does not revive nominal after instance reconstruction',async()=>{
+ const f=finiteFixture();assert.equal((await control(f).prepare()).status,'armed');assert.equal((await control(f).claimEffect('nominal')).status,'blocked');
+});
+
+test('separate QA and canary source tuples are bound without fabricated equal hashes',async()=>{
+ const f=finiteFixture();assert.notEqual(f.plan.source.moduleHash,f.plan.canaryContainment.moduleHash);const c=control(f);assert.equal((await c.prepare()).status,'armed');
+ const g=finiteFixture(),original=g.primary.admission;g.primary.admission=async()=>{const v=await original();v.containment.sourceHash=g.plan.source.moduleHash;return v;};
+ assert.equal((await control(g).prepare()).status,'blocked');
+});
+test('saved fact capture rechecks primary subscription/process against retained facts',async()=>{
+ const f=finiteFixture();for(const k of ['subscription','process','saved_event'])f.primary[k==='saved_event'?'savedEvent':k]=async()=>f.facts[k]();
+ const c=control(f);await c.prepare();await c.captureObservedFacts('subscription');await c.captureObservedFacts('process');
+ const old=f.facts.subscription;f.facts.subscription=()=>({...old(),receiptHash:'f'.repeat(64)});const n=f.puts;
+ assert.equal((await c.captureObservedFacts('saved_event')).status,'blocked');assert.equal(f.puts,n);
+});
+test('late commit after bounded timeout preserves pending and cannot arm',async()=>{
+ const f=finiteFixture(),original=f.storage.transaction;
+ f.storage.transaction=async fn=>{const result=await original.call(f.storage,fn);await new Promise(r=>setTimeout(r,40));return result;};
+ const options=f.options(api);options.timeoutMs=10;const c=api.createPrivateQaFiniteTrialControl(options);
+ assert.equal((await c.prepare()).status,'uncertain');await new Promise(r=>setTimeout(r,60));
+ const row=f.rows.get(ROOT+':'+f.plan.intentId+':control');assert.equal(row.phase,'pending');assert.equal(row.armedAt,null);
+ assert.equal((await c.claimEffect('nominal')).status,'blocked');
+});
+test('captured facts and immutable claims reject corrupted or unknown stored records',async()=>{
+ for(const suffix of ['unexpected','effect:close']){
+ const f=finiteFixture(),c=control(f);await c.prepare();f.rows.set(ROOT+':'+f.plan.intentId+':'+suffix,{phase:'complete'});assert.equal((await c.read()).status,'blocked');}
+});
+test('capture expiry and changed native profile do not move any original deadline',async()=>{
+ const f=finiteFixture();f.primary.subscription=async()=>f.facts.subscription();const c=control(f);await c.prepare();const n=f.puts;f.setNow(f.plan.N1);
+ assert.equal((await c.captureObservedFacts('subscription')).status,'blocked');assert.equal(f.puts,n);assert.equal(f.alarm,f.plan.C0);
+});
+
+test('narrow primary consent never widens or survives an awaited finalizer expiry',async()=>{
+ for(const operation of ['prepare','claimEffect','captureObservedFacts']){
+ const f=finiteFixture();let expire=false;
+ const base=f.primary.admission;f.primary.admission=async()=>{const v=await base();v.consent.expiresAt=f.plan.T0+10;return v;};
+ const finalizer=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await finalizer();if(expire)f.setNow(f.plan.T0+10);return v;};
+ f.primary.subscription=async()=>{const v=f.facts.subscription();if(expire)f.setNow(f.plan.T0+10);return v;};
+ const c=control(f);if(operation!=='prepare')await c.prepare();const n=f.puts;expire=true;
+ const r=await (operation==='prepare'?c.prepare():operation==='claimEffect'?c.claimEffect('nominal'):c.captureObservedFacts('subscription'));
+ assert.equal(r.status,operation==='prepare'?'uncertain':'blocked');if(operation==='prepare'){assert.ok(f.puts>n);assert.equal(f.alarm,f.plan.C0);}else assert.equal(f.puts,n);
+ }
+});
+test('consent expiry inside pending transaction prevents acknowledgment/nominal arm',async()=>{
+ const f=finiteFixture(),base=f.primary.admission;f.primary.admission=async()=>{const v=await base();v.consent.expiresAt=f.plan.T0+10;return v;};
+ const original=f.storage.transaction;f.storage.transaction=fn=>original.call(f.storage,async t=>fn({...t,put:async(k,v)=>{await t.put(k,v);if(k.endsWith(':info'))f.setNow(f.plan.T0+10);}}));
+ const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.claimEffect('nominal')).status,'blocked');
+});
+
+test('consumed expired finite head cannot be reset, reused or advanced to another intent',async()=>{
+ const f=finiteFixture(),c=control(f);await c.prepare();await c.claimEffect('nominal');await c.withdrawNominal();f.setNow(f.plan.R1+1);
+ const old=[...f.rows].map(([k,v])=>[k,JSON.stringify(v)]);assert.equal((await control(f).prepare()).status,'blocked');
+ const g=finiteFixture({at:f.plan.R1+1});g.plan.intentId='next-intent';g.plan.workflows.launcher=finiteLauncherInstanceId({intentId:g.plan.intentId,sourceRevision:g.plan.source.revision});g.plan.closePolicyHash=finiteCleanupPolicyHash(g.plan);g.rows.clear();for(const [k,v]of f.rows)g.rows.set(k,structuredClone(v));
+ assert.equal((await control(g).prepare()).status,'blocked');assert.equal(g.puts,0);assert.deepEqual([...g.rows].map(([k,v])=>[k,JSON.stringify(v)]),old);
+});
+test('restore claims are distinct, bound to the same retained proof and reconciled read-only',async()=>{
+ const f=finiteFixture();let controlHash,proofHash='1'.repeat(64),mode='eligibility',claim;
+ f.primary.effect=async kind=>mode==='eligibility'?{purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash,kind,proofHash,observedAt:f.now(),eligible:true,evidenceHash:'2'.repeat(64)}:{purpose:'afw.qa-finite-effect-receipt.v1',intentId:f.plan.intentId,controlHash,kind,claimHash:hash(ROOT+':effect\n'+JSON.stringify(claim)),receiptHash:'3'.repeat(64),observedAt:f.now(),outcome:'complete'};
+ const c=control(f);controlHash=(await c.prepare()).controlHash;
+ const canary=await c.claimEffect('canary_restore');assert.equal(canary.status,'issued');
+ proofHash='4'.repeat(64);assert.equal((await c.claimEffect('qa_restore')).status,'blocked');proofHash='1'.repeat(64);
+ const qa=await c.claimEffect('qa_restore');assert.equal(qa.status,'issued');assert.notDeepEqual(canary.claim,qa.claim);
+ claim=qa.claim;mode='receipt';const n=f.puts;assert.equal((await c.reconcileEffect('qa_restore')).status,'reconciled');assert.equal(f.puts,n);
+});
+test('nominal immutable claim retains narrower primary expiry and cannot refund its eligibility',async()=>{
+ const f=finiteFixture(),original=f.primary.admission;f.primary.admission=async()=>{const v=await original();v.consent.expiresAt=f.plan.T0+100;return v;};
+ const c=control(f);await c.prepare();const r=await c.claimEffect('nominal');assert.equal(r.claim.deadline,f.plan.T0+100);
+ assert.equal((await c.read()).nominalEligible,false);assert.equal((await c.claimEffect('nominal')).status,'reconcile_only');
+});
+test('native pin invalidates when an unrelated closed QA flag is opened',async()=>{
+ const f=finiteFixture(),c=control(f);f.env.AFW_QA_HTTP_ENABLED='true';assert.equal((await c.prepare()).status,'blocked');assert.equal(f.puts,0);
+});
+
+for(const kind of ['close','qa_restore'])test('late '+kind+' claim ACK at original cleanup expiry is uncertain and consumed',{timeout:5000},async()=>{
+ const f=finiteFixture();let controlHash,claim,receiptMode=false,release,entered;
+ const held=new Promise(resolve=>{release=resolve;}),started=new Promise(resolve=>{entered=resolve;});
+ const original=f.storage.transaction;
+ f.storage.transaction=async fn=>{
+  const result=await original.call(f.storage,fn);
+  if(result?.claim?.kind===kind){claim=result.claim;entered();await held;}
+  return result;
+ };
+ f.primary.effect=async selected=>receiptMode?{
+  purpose:'afw.qa-finite-effect-receipt.v1',intentId:f.plan.intentId,controlHash,kind:selected,
+  claimHash:hash(ROOT+':effect\n'+JSON.stringify(claim)),receiptHash:'3'.repeat(64),observedAt:f.now(),outcome:'complete'
+ }:{
+  purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash,kind:selected,
+  proofHash:'1'.repeat(64),observedAt:f.now(),eligible:true,evidenceHash:'2'.repeat(64)
+ };
+ const c=control(f);controlHash=(await c.prepare()).controlHash;
+ const end=kind==='qa_restore'?f.plan.R1:f.plan.C1;f.setNow(end-1);
+ const pending=c.claimEffect(kind);await started;
+ const key=ROOT+':'+f.plan.intentId+':effect:'+kind,retained=structuredClone(f.rows.get(key)),puts=f.puts;
+ assert.equal(retained.phase,'issued');assert.equal(retained.issuedAt,end-1);assert.equal(retained.deadline,end);
+ f.setNow(end);release();assert.equal((await pending).status,'uncertain');
+ assert.deepEqual(f.rows.get(key),retained);assert.equal(f.puts,puts);
+ assert.equal((await c.claimEffect(kind)).status,'reconcile_only');assert.equal(f.puts,puts);
+ receiptMode=true;f.setNow(end+1);assert.equal((await c.reconcileEffect(kind)).status,'reconciled');
+ assert.deepEqual(f.rows.get(key),retained);assert.equal(f.puts,puts);
+});
+
+test('finite plan pins exact closed module bytes and canonical cleanup policy',()=>{
+ for(const mode of ['missing','hash','bytes','name','policy']){const f=finiteFixture();
+  if(mode==='missing')delete f.plan.deployments.qaClosed.module;
+  if(mode==='hash')f.plan.deployments.qaLive.module.sha256='0'.repeat(64);
+  if(mode==='bytes')f.plan.deployments.canaryClosed.module.bytes=0;
+  if(mode==='name')f.plan.deployments.canaryClosed.module.name='../worker';
+  if(mode==='policy')f.plan.closePolicyHash='0'.repeat(64);
+  assert.throws(()=>control(f));
+ }
+});
+
+test('first finalizer readiness failure leaves durable pending control and original alarm',async()=>{
+ const f=finiteFixture();f.primary.finalizer=async()=>{throw Error('synthetic unavailable resource admission');};const c=control(f);
+ assert.equal((await c.prepare()).status,'uncertain');assert.equal(f.alarm,f.plan.C0);
+ const r=await control(f).read();assert.equal(r.phase,'pending');assert.equal(r.nominalEligible,false);
+ assert.equal((await control(f).claimEffect('nominal')).status,'blocked');assert.equal((await control(f).claimEffect('close')).status,'issued');
+});
+
+test('native nominal identity needs no fictitious GHA run; legacy field is rejected',async()=>{
+ const f=finiteFixture();assert.deepEqual(Object.keys(f.plan.workflows),['confirmation','bootstrap','launcher']);
+ const c=control(f);assert.equal((await c.prepare()).status,'armed');
+ assert.equal((await c.claimEffect('nominal')).status,'issued');
+ const g=finiteFixture();g.plan.workflows.nominalRunId=10;assert.throws(()=>control(g));
+});
+for(const [name,mutate] of [
+ ['run',v=>v.runId++],['attempt',v=>v.attempt++],['job',v=>v.job.id++],
+ ['workflow',v=>v.workflow='other'],['repository',v=>v.repository='other/repo'],
+])test('exact finalizer primary still required: '+name,async()=>{
+ const f=finiteFixture(),base=f.primary.finalizer;f.primary.finalizer=async()=>{const v=await base();mutate(v);return v;};
+ const c=control(f);assert.equal((await c.prepare()).status,'uncertain');assert.equal((await c.claimEffect('nominal')).status,'blocked');
+});
+test('external projection removes nominal GHA identity and preserves exact finalizer fields',async()=>{
+ const {finiteFinalizerFixture}=await import('./fixtures/finite-finalizer.mjs');
+ const {validateFiniteExternalPlan}=await import('../lib/mcp-qa-finite-external-contract.mjs');
+ const f=await finiteFinalizerFixture();assert.deepEqual(Object.keys(f.plan.workflows),['confirmation','bootstrap','launcher']);
+ assert.deepEqual(f.plan.finalizer,f.f.plan.finalizer);assert.doesNotThrow(()=>validateFiniteExternalPlan(f.plan));
+ const old=structuredClone(f.plan);old.workflows.nominalRunId=10;assert.throws(()=>validateFiniteExternalPlan(old));
+ for(const [key,value] of [['runId',0],['jobId',0],['attempt',2],['workflow','other'],['sourceRevision','0'.repeat(40)]]){
+  const p=structuredClone(f.plan);p.finalizer[key]=value;assert.throws(()=>validateFiniteExternalPlan(p));
+ }
+});

~~~~~~~~~~

## test/mcp-qa-finite-trial-guard.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-qa-finite-trial-guard.test.mjs b/test/mcp-qa-finite-trial-guard.test.mjs
--- /dev/null
+++ b/test/mcp-qa-finite-trial-guard.test.mjs
@@ -0,0 +1,78 @@
+import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
+import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
+import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
+const api=await import('../lib/mcp-qa-finite-trial-guard.mjs').catch(()=>({}));
+const stores=await import('../lib/mcp-qa-finite-cleanup-store.mjs').catch(()=>({}));
+test('finite guard and fixed native alarm adapter are available',()=>{
+ for(const k of ['createPrivateQaFiniteTrialGuard','runPrivateQaFiniteTrialAlarm'])assert.equal(typeof api[k],'function');
+});
+async function setup({missing,pending=false}={}){
+ const f=finiteFixture(),base=f.storage.transaction;f.storage.transaction=fn=>base.call(f.storage,tx=>fn({...tx,deleteAlarm:()=>tx.setAlarm(null)}));
+ let store,armed;
+ f.primary.effect=async kind=>{const r=await store.read();if(r.status!=='observed')return null;return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
+ if(pending)f.primary.finalizer=async()=>{throw Error('synthetic unavailable first finalizer');};
+ let control=controls.createPrivateQaFiniteTrialControl(f.options(controls));armed=await control.prepare();assert.equal(armed.status,pending?'uncertain':'armed');if(pending)armed=await control.read();
+ const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});store=stores.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now});
+ const calls=[],receipts=new Map();
+ const withdrawal={purpose:'afw.own-permissions-only-reduction.v1',monitoringWithdrawn:true,readWithdrawn:true,permissionsWithdrawn:true,runtimeStopRequested:false,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false};
+ const values={withdraw:withdrawal,close:{closed:true,runtimeStopRequested:true},seal:{sealHash:proof.proof.sealHash,sealedAt:f.plan.C0}};
+ const capabilities={identity:proof.control,readPrimary:f.primary.admission,proof:{read:()=>store.capture(async challenge=>{const at=f.now(),support={...proof.support,primary:{...proof.support.primary,observedAt:at},providerBefore:{...proof.support.providerBefore,observedAt:at},providerAfter:{...proof.support.providerAfter,observedAt:at}};return {proof:{...proof.proof,proofChallenge:challenge,observedAt:at,primarySnapshotHash:finiteHash(support.primary),providerAbsenceHash:finiteHash([support.providerBefore,support.providerAfter]),evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support})},support};})}};
+ for(const kind of ['withdraw','close','seal','canary_restore'])capabilities[kind]={
+  execute:async({claim,proofHash})=>{
+   calls.push(kind);assert.equal(claim.phase,'issued');
+   const state=f.rows.get('afw.qa-finite-guard.v1:'+f.plan.intentId+':state');assert.ok(state.deliveries>=1);
+   assert.equal(f.alarm,state.nextAt); // recovery committed BEFORE this effect
+   if(kind===missing)throw Error('synthetic lost provider ACK');
+   const receipt=kind==='canary_restore'?{purpose:'afw.finite-canary-restored.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,proofHash,versionId:f.plan.deployments.canaryClosed.versionId,deploymentId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',readbackHash:'f'.repeat(64),observedAt:f.now()}:values[kind];
+   receipts.set(kind,receipt);
+  },
+  reconcile:async()=>receipts.get(kind)??null
+ };
+ 
+ const options=()=>({ctx:f.ctx,env:f.env,control,capabilities,now:f.now});
+ return {f,store,calls,capabilities,options,reconstruct:()=>{control=controls.createPrivateQaFiniteTrialControl(f.options(controls));},control};
+}
+test('nominal death and reconstruction leave durable cleanup independent of live nominal grant',async()=>{
+ const x=await setup(),guard=api.createPrivateQaFiniteTrialGuard(x.options());assert.equal((await guard.arm()).status,'armed');
+ await x.control.claimEffect('nominal');x.reconstruct();x.f.setNow(x.f.plan.C0+3);
+ const result=await api.createPrivateQaFiniteTrialGuard(x.options()).alarm();assert.equal(result.status,'complete');assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal(x.f.alarm,null);
+ assert.equal((await x.store.completion()).status,'complete');
+ x.f.setNow(x.f.plan.C1+1);assert.equal((await x.store.read()).status,'observed');
+});
+test('unknown issued effects reconcile read only across at most three deliveries',async()=>{
+ const x=await setup({missing:'withdraw'});await api.createPrivateQaFiniteTrialGuard(x.options()).arm();
+ for(let n=0;n<3;n++){x.reconstruct();x.f.setNow(x.f.plan.C0+n*60000+3);assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');}
+ assert.deepEqual(x.calls,['withdraw','close','seal']);assert.equal(x.f.alarm,null);
+ assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');assert.deepEqual(x.calls,['withdraw','close','seal']);
+ assert.equal((await x.store.completion()).status,'not_yet_observed');
+});
+test('guard rejects unqualified actual profile and inherited-history substitution before arm',async()=>{
+ for(const mode of ['profile','history','containment','resources']){const x=await setup();
+  if(mode==='profile')x.f.env.AFW_RELEASE_OPERATOR_ENABLED='false';
+  else {const primary=x.capabilities.readPrimary;x.capabilities.readPrimary=async()=>{const p=await primary();if(mode==='history')p.legacyPreparedHash='0'.repeat(64);else if(mode==='resources')p.resources.containerId='0'.repeat(64);else p.containment.denyBeforeAccess=false;return p;};}
+  assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).arm()).status,'admin_pending');assert.equal(x.calls.length,0);
+ }
+});
+
+test('delayed synthetic STOP is observed on second delivery without spending proof early or resending close',async()=>{
+ const x=await setup(),base=x.capabilities.proof.read;let observations=0;
+ x.capabilities.proof.read=async()=>{observations++;if(x.f.now()<x.f.plan.C0+45000)return {status:'not_yet_observed'};return base();};
+ await api.createPrivateQaFiniteTrialGuard(x.options()).arm();x.f.setNow(x.f.plan.C0+3);
+ assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');
+ assert.equal(x.f.alarm,x.f.plan.C0+60000);assert.equal(x.f.rows.has('afw.qa-finite-cleanup.v1:'+x.f.plan.intentId+':capture'),false);
+ x.reconstruct();x.f.setNow(x.f.plan.C0+60003);
+ assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'complete');
+ assert.equal(observations,2);assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal(x.f.alarm,null);
+});
+
+test('unavailable first finalizer leaves pending native cleanup, never nominal authority',async()=>{
+ const x=await setup({pending:true});assert.equal(x.f.alarm,x.f.plan.C0);assert.equal((await x.control.claimEffect('nominal')).status,'blocked');
+ x.reconstruct();x.f.setNow(x.f.plan.C0+3);
+ assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'complete');
+ assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal((await x.store.completion()).status,'complete');
+ const key='afw.qa-finite-guard.v1:'+x.f.plan.intentId+':effect:close',row=x.f.rows.get(key);x.f.rows.set(key,{...row,phase:'issued'});
+ await assert.rejects(()=>x.store.completion());
+});

~~~~~~~~~~

## test/mcp-release-finite-known-cancellation-native.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-release-finite-known-cancellation-native.test.mjs b/test/mcp-release-finite-known-cancellation-native.test.mjs
--- /dev/null
+++ b/test/mcp-release-finite-known-cancellation-native.test.mjs
@@ -0,0 +1,80 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {rehearseExactFiniteNamedConfirmation} from './fixtures/named-confirmation-native-rehearsal.mjs';
+
+const script='export default {fetch(){return new Response(null,{status:404})}}';
+const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};
+const run=options=>rehearseExactFiniteNamedConfirmation({artifact,mode:'confirmed',measure:true,...options});
+const journals={attempts:1,receipts:1,acceptances:1},empty={attempts:0,receipts:0,acceptances:0};
+const stages=['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write'].sort();
+const safe=r=>{
+ assert.equal(r.httpStatus,404);assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
+ assert.equal(r.immutableHistoryPreserved,true);
+ assert.equal(JSON.stringify(r.output).includes('synthetic_read_credential'),false);
+ assert.equal(r.output.qualification.nativeDate,true);
+ assert.equal(r.output.qualification.workflowName,'afw-exact-confirmation-qualification');
+ assert.deepEqual(r.output.qualification.payloadKeys,['planHash']);assert.equal(r.output.qualification.identityMatches,true);
+};
+test('unmounted fixed finite wrapper and actual Known core authorize complete history and exact own reservation after INSERT',async()=>{
+ const r=await run();safe(r);
+ assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));assert.deepEqual(r.counts,journals);
+ assert.equal(r.historyPreserved,true);assert.equal(r.reservationCount,1);assert.equal(r.counters.retirementReads,2);
+ assert.equal(r.output.reservation.mayBoot,false);
+ assert.equal(r.output.reservation.state,'prepared');
+ const q=r.output.qualification;
+ assert.equal(q.projectionReads,6);assert.ok(q.eligibilityChecks>=19);assert.equal(q.rpcReads,2);
+ assert.ok(q.credentialReads>0);assert.ok(q.elapsedMs<70000);assert.ok(q.remainingOriginalMs>0);
+ assert.deepEqual(q.stageInvocations,[],'primary qualification uses unmodified adapter source');
+ console.log('untouched-finite-native-measurement',JSON.stringify(q));
+});
+test('observation-only instrumented native witness executes all 18 actual hooks with same outcome and journals',async()=>{
+ const r=await run({witness:true});safe(r);
+ assert.equal(r.output.status,'confirmed');assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,1);
+ assert.equal(r.historyPreserved,true);assert.equal(r.counters.retirementReads,2);
+ const q=r.output.qualification;assert.deepEqual(q.uniqueStages,stages);
+ assert.equal(q.stageInvocations.length,q.eligibilityChecks);assert.ok(q.stageInvocations.length>18);assert.ok(q.hookMs>=q.eligibilityMs);
+ assert.ok(q.remainingOriginalMs>0);
+ console.log('instrumented-finite-native-hook-witness',JSON.stringify(q));
+});
+for(const nativeFault of ['missing-current','expired-current','identity-mismatch','extra-cancellation','queue-expired','projection-deadline'])
+ test('finite native route blocks '+nativeFault+' before credentials, provider or journal',async()=>{
+  const r=await run({nativeFault});safe(r);assert.equal(r.output.status,'blocked',JSON.stringify(r.output));
+  assert.deepEqual(r.counts,empty);assert.equal(r.reservationCount,0);assert.equal(r.counters.apiReads,0);assert.equal(r.counters.providerReads,0);assert.equal(r.output.qualification.credentialReads,0);
+  assert.equal(r.historyPreserved,true);
+ });
+for(const nativeFault of ['revoke-prewrite','revoke-postwrite'])test('current grant '+nativeFault+' preserves activation journals and immutable history',async()=>{
+ const r=await run({nativeFault});safe(r);assert.equal(r.output.status,'uncertain');
+ assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,nativeFault==='revoke-postwrite'?1:0);
+ assert.equal(r.counters.retirementReads,2);assert.equal(Object.hasOwn(r.output,'reservation'),false);
+ assert.equal(r.historyPreserved,false,'only the synthetic current grant was revoked');
+});
+test('external different-trial/scope reservation wins the fixed slot and denies both finite attempt and restart',async()=>{
+ const r=await run({nativeFault:'foreign-reservation-race',replay:true,replayExpected:'blocked'});safe(r);
+ assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
+ assert.equal(r.replayOutput.status,'blocked');assert.equal(r.replayOutput.mayRetry,false);assert.equal(r.historyPreserved,true);
+});
+test('native lost acknowledgement retains the committed reservation and all journals without retry',async()=>{
+ const r=await run({fault:'reservation-ack-lost',replay:true});safe(r);
+ assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
+ assert.equal(r.replayOutput.status,'uncertain');assert.equal(r.historyPreserved,true);
+});
+test('native outer step settlement after original event deadline never reports a late confirmation',async()=>{
+ const r=await run({nativeFault:'outer-settlement'});safe(r);
+ assert.equal(r.output.status,'uncertain');assert.equal(r.reservationCount,1);assert.deepEqual(r.counts,journals);
+ assert.ok(r.output.qualification.remainingOriginalMs<0);assert.equal(r.historyPreserved,true);
+});
+test('same native instance restart cannot consume a second activation or reservation',async()=>{
+ const r=await run({replay:true});safe(r);
+ assert.equal(r.output.status,'confirmed');assert.equal(r.replayOutput.status,'uncertain');
+ assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,1);assert.equal(r.counters.retirementReads,2);assert.equal(r.historyPreserved,true);
+});
+
+test('finite native positive with string payload leaves Workflow and Known source completely untouched',async()=>{
+ const r=await run({measure:false,payloadMode:'string'});
+ assert.equal(r.httpStatus,404);assert.equal(r.output.status,'confirmed',JSON.stringify(r.output));
+ assert.equal(r.output.mayRetry,false);assert.equal(r.output.operationalReadiness,false);
+ assert.equal(r.output.reservation.state,'prepared');assert.equal(r.output.reservation.mayBoot,false);
+ assert.deepEqual(r.counts,journals);assert.equal(r.reservationCount,1);assert.equal(r.historyPreserved,true);
+ assert.equal(r.immutableHistoryPreserved,true);assert.equal(Object.hasOwn(r.output,'qualification'),false);
+});

~~~~~~~~~~

## test/mcp-release-finite-known-cancellation.test.mjs

~~~~~~~~~~diff
diff --git a/test/mcp-release-finite-known-cancellation.test.mjs b/test/mcp-release-finite-known-cancellation.test.mjs
--- /dev/null
+++ b/test/mcp-release-finite-known-cancellation.test.mjs
@@ -0,0 +1,246 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {readFileSync} from 'node:fs';
+import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
+import {createSuccessorReservation} from '../lib/mcp-successor-reservation.mjs';
+import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
+import * as runtime from '../lib/mcp-release-runtime.mjs';
+import {reserveReleaseSuccessor,reserveFiniteReleaseSuccessor} from '../lib/mcp-release-successor-reservation.mjs';
+import {activationConfigurationHash,finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
+import {inertNamedConfirmationPolicy} from './fixtures/inert-named-confirmation-policy.mjs';
+import {namedHistoryFixture,seedNamedHistoryFixture} from './fixtures/named-known-cancellation.mjs';
+const hash=x=>createHash('sha256').update(x).digest('hex');
+const script='export default {fetch(){return new Response(null,{status:404})}}';
+const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
+const blocked={status:'blocked',mayRetry:false,operationalReadiness:false};
+const call=f=>runtime.runFiniteKnownCancellationReleaseWorkflow(f.input);
+async function fixture(){
+ const mf=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default{fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'adapter-only-synthetic'}}));
+ try{
+ const db=await mf.getD1Database('DB'),at=Date.now(),window={startAt:at-1000,expiresAt:at+120000},policy=inertNamedConfirmationPolicy(artifact);
+ Object.assign(policy,window);Object.assign(policy.plan,window);
+ const bindings=policy.observation.configuration.bindings,mb=bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(mb.text);
+ Object.assign(manifest.candidate,window);mb.text=JSON.stringify(manifest);
+ const eb=bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');eb.text=JSON.stringify({...JSON.parse(eb.text),...window});
+ policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public','enable_request_signal'];
+ policy.plan.configurationHash=finiteActivationConfigurationHash(policy.observation.configuration);
+ const bundle={artifact,policy},history=namedHistoryFixture(bundle),retired={...manifest.original,processGeneration:'8'.repeat(64),image:'cloudflare/debian-trixie',createdAt:at-20000,expiresAt:at-10000,closedAt:at-5000};
+ await seedNamedHistoryFixture(db,history,retired);
+ const f={mf,db,bundle,history,retired,reads:[],steps:0,credentials:0,afterRead:async()=>{},stepResult:blocked};
+ const audited={prepare:db.prepare.bind(db),withSession(mode){
+  assert.equal(mode,'first-primary');const s=db.withSession(mode);
+  return{prepare(sql){assert.ok(!/SELECT \*/i.test(sql));const q=s.prepare(sql);return{bind(...params){const b=q.bind(...params);return{
+   async all(){f.reads.push(sql);const r=await b.all();await f.afterRead(sql,r);return r;},
+   async first(){f.reads.push(sql);const r=await b.first();await f.afterRead(sql,r);return r;}
+  };}};}};}
+ };
+ const node={idFromName(name){return {toString:()=>name==='afw-own-event-one-occurrence-v1'?manifest.original.containerId:'6'.repeat(64)};},idFromString(id){return{toString:()=>id};},get(){throw Error('fixture cannot launch');}};
+ const env={AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_EVENTS_NODE:node,RELEASE_DB:audited};
+ Object.defineProperty(env,'AFW_RELEASE_READ_TOKEN',{get(){f.credentials++;throw Error('private credential must not be read');}});
+ const planHash=hash(JSON.stringify(bundle)),event={timestamp:new Date(at),instanceId:'afw-release-'+planHash,payload:{planHash}};
+ const step={async do(name,options){f.steps++;f.timeout=options.timeout;assert.equal(name,'confirm-named-activation');return f.stepResult;}};
+ f.input={bundle,env,event,step};return f;
+ }catch(e){await mf.dispose();throw e;}
+}
+test('fixed adapter exists without exporting a lease mint or registry',()=>{
+ assert.equal(typeof runtime.runFiniteKnownCancellationReleaseWorkflow,'function');
+ assert.deepEqual(Object.keys(runtime).sort(),['runFiniteKnownCancellationReleaseWorkflow','runKnownCancellationReleaseWorkflow','runReleaseOperator','runReleaseWorkflow']);
+});
+test('two primary snapshots plus initial and Workflow eligibility precede the fixed named step',async()=>{
+ const f=await fixture();try{
+ assert.deepEqual(await call(f),blocked);assert.equal(f.steps,1);assert.equal(f.credentials,0);
+ assert.equal(f.reads.filter(s=>s.includes('SELECT 1 AS eligible')).length,2);
+ assert.equal(f.reads.filter(s=>s.includes('LIMIT 2')).length,4);
+ assert.equal(f.reads.filter(s=>s.includes('LIMIT 9')).length,2);
+ assert.ok(f.timeout>0&&f.timeout<=70000-(Date.now()-f.input.event.timestamp.getTime())+200);
+ }finally{await f.mf.dispose();}
+});
+for(const mode of ['hash','instance','payload-extra','history-input','authorize-input','schedule','future-event','queue-expired','flag','namespace','invalid-date'])test('fixed admission denies '+mode+' before primary reads',async()=>{
+ const f=await fixture();try{
+ const {event,env}=f.input;
+ if(mode==='hash')event.payload.planHash='0'.repeat(64);
+ if(mode==='instance')event.instanceId='foreign';
+ if(mode==='payload-extra')event.payload.authorize=true;
+ if(mode==='history-input')f.input.cancellationHistory=f.history.providedRaw;
+ if(mode==='authorize-input')f.input.authorize=async()=>true;
+ if(mode==='schedule')event.schedule='* * * * *';
+ if(mode==='future-event')event.timestamp=new Date(Date.now()+10000);
+ if(mode==='queue-expired')event.timestamp=new Date(Date.now()-70001);
+ if(mode==='flag')env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED='false';
+ if(mode==='namespace')env.AFW_RELEASE_EVENTS_NODE={};
+ if(mode==='invalid-date')event.timestamp=new Date(NaN);
+ assert.deepEqual(await call(f),blocked);assert.equal(f.reads.length,0);assert.equal(f.steps,0);assert.equal(f.credentials,0);
+ }finally{await f.mf.dispose();}
+});
+const faults={
+ 'revoked-current':"UPDATE delegated_access_grants SET revoked_at='2026-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
+ 'expired-current':"UPDATE delegated_access_grants SET expires_at='2026-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
+ 'wrong-current-owner':"UPDATE delegated_access_grants SET user_id='foreign' WHERE id='ci-only-inert'",
+ 'wrong-original-owner':"UPDATE site_projects SET user_id='foreign'",
+ 'wrong-cancelled-owner':"UPDATE delegated_access_grants SET user_id='foreign' WHERE id='fixture-cancelled'",
+ 'unexchanged-current':"UPDATE delegated_access_grants SET exchanged_at='' WHERE id='ci-only-inert'",
+ 'future-current-exchange':"UPDATE delegated_access_grants SET exchanged_at='2099-01-01T00:00:00.000Z' WHERE id='ci-only-inert'",
+ 'extra-current-scope':"UPDATE delegated_access_grants SET scopes_json='[\"afw:project:read\",\"afw:evidence:read\"]' WHERE id='ci-only-inert'"
+};
+for(const [mode,sql] of Object.entries(faults))test('complete primary authority denies '+mode+' without runtime',async()=>{
+ const f=await fixture();try{await f.db.prepare(sql).run();assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);assert.equal(f.credentials,0);}finally{await f.mf.dispose();}
+});
+test('current monitoring revocation after the first snapshot cannot be adopted as a new history',async()=>{
+ const f=await fixture();try{
+ let changed=false;f.afterRead=async sql=>{if(!changed&&sql.includes('LIMIT 9')){changed=true;const e=f.history.events,at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(5,e.grantId,e.projectId,e.subject,e.clientId,e.resource,1,'revoke','afw.dossier-monitoring.v1','fixture-revoke',at,at).run();}};
+ assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);
+ }finally{await f.mf.dispose();}
+});
+test('unknown NULL-generation history cannot be hidden by missing joins',async()=>{
+ const f=await fixture();try{
+ const r=f.retired;await f.db.prepare("INSERT INTO delegated_access_grants SELECT 'unknown',user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id='fixture-cancelled'").run();await f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('unknown',null,'7'.repeat(64),r.programHash,r.sourceRevision,r.image,r.closedAt).run();
+ assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);
+ }finally{await f.mf.dispose();}
+});
+test('strict projection refuses row accessors and never exposes provider errors',async()=>{
+ const f=await fixture();try{let touched=0;f.afterRead=async(sql,r)=>{if(sql.includes('LIMIT 2'))Object.defineProperty(r.results[0],'user_id',{enumerable:true,get(){touched++;throw Error('private subject');}});};assert.deepEqual(await call(f),blocked);assert.equal(touched,0);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+ const g=await fixture();try{g.afterRead=async()=>{throw Error('private primary detail');};assert.deepEqual(await call(g),blocked);}finally{await g.mf.dispose();}
+});
+test('binding drift during projection is permanently denied',async()=>{
+ const f=await fixture();try{f.afterRead=async()=>{f.input.env.RELEASE_DB={};};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+});
+test('outer step settlement past the original event ceiling cannot report confirmed',async()=>{
+ const f=await fixture(),realNow=Date.now;try{
+ f.input.step.do=async()=>{f.steps++;Date.now=()=>f.input.event.timestamp.getTime()+70001;return{status:'confirmed',mayRetry:false,operationalReadiness:false};};
+ assert.deepEqual(await call(f),{status:'uncertain',mayRetry:false,operationalReadiness:false});assert.equal(f.steps,1);
+ }finally{Date.now=realNow;await f.mf.dispose();}
+});
+test('a forged lease is denied by the selected finite core before its methods run',async()=>{
+ const f=await fixture();let calls=0;try{
+ const h=await closureHarness(async args=>{
+  for(const lease of [{current(){calls++;return true;},remaining(){calls++;return 70000;}},{},null]){
+   assert.deepEqual(await args.runReleaseWorkflow({...f.input,requestLease:lease}),blocked);
+  }
+  assert.deepEqual(await args.runReleaseWorkflow({...f.input,requestLease:{...args.requestLease}}),blocked);
+  return blocked;
+ });
+ assert.deepEqual(await h.runFiniteKnownCancellationReleaseWorkflow(f.input),blocked);
+ assert.equal(calls,0);assert.equal(f.steps,0);assert.equal(f.credentials,0);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+test('absent projected current grant blocks before eligibility or runtime',async()=>{
+ const f=await fixture();try{f.afterRead=async(sql,r)=>{if(sql.includes('WHERE g.id=?'))r.results=[];};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+});
+// White-box closure tests only. The separate finite native test file uses the
+// unmodified module and never injects an authorization callback or lease mint.
+let harnessSerial=0;
+async function closureHarness(capture){
+ const url=new URL('../lib/mcp-release-runtime.mjs',import.meta.url);
+ let source=readFileSync(url,'utf8');
+ const anchor='const result=await runReleaseWorkflowImpl(profile,{bundle,env,event,step:Object.freeze({do:(...args)=>Reflect.apply(stepDo,step,args)}),authorize,cancellationHistory:first.raw,requestLease});';
+ assert.ok(source.includes(anchor));
+ source=source.replace(anchor,'const result=await globalThis.__knownAdapterCapture({bundle,env,event,step,authorize,cancellationHistory:first.raw,requestLease,runReleaseWorkflow:options=>runReleaseWorkflowImpl(profile,options)});');
+ source=source.replace(/from '([^']+)'/g,(whole,path)=>path.startsWith('.')?"from '"+new URL(path,url).href+"'":whole);
+ globalThis.__knownAdapterCapture=capture;
+ return import('data:text/javascript;base64,'+Buffer.from(source+'\n// harness '+(++harnessSerial)).toString('base64'));
+}
+const stages=['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write'];
+test('private closure rechecks complete primary eligibility at all 18 fixed hooks and retires its lease',async()=>{
+ const f=await fixture();let captured;
+ try{
+ const h=await closureHarness(async args=>{captured=args;for(const stage of stages)assert.equal(await args.authorize(stage,new AbortController().signal),true,stage);return blocked;});
+ assert.deepEqual(await h.runFiniteKnownCancellationReleaseWorkflow(f.input),blocked);
+ assert.equal(f.reads.filter(s=>s.includes('SELECT 1 AS eligible')).length,19);
+ assert.deepEqual(await captured.runReleaseWorkflow({...f.input,requestLease:captured.requestLease}),blocked);
+ assert.deepEqual(await captured.runReleaseWorkflow({...f.input,requestLease:{...captured.requestLease}}),blocked);
+ assert.equal(await captured.authorize('operator_credential',new AbortController().signal),false);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+test('arbitrary stage permanently invalidates the internal closure',async()=>{
+ const f=await fixture(),answers=[];try{const h=await closureHarness(async args=>{
+ answers.push(await args.authorize('subscription_send',new AbortController().signal));
+ answers.push(await args.authorize('operator_credential',new AbortController().signal));return blocked;
+ });assert.equal((await h.runFiniteKnownCancellationReleaseWorkflow(f.input)).status,'uncertain');assert.deepEqual(answers,[false,false]);assert.equal(f.reads.filter(s=>s.includes('SELECT 1 AS eligible')).length,1);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+test('concurrent hook reentry invalidates both checks without refreshing authority',async()=>{
+ const f=await fixture(),answers=[];let task;try{const h=await closureHarness(args=>(task=(async()=>{
+ let release;const gate=new Promise(r=>{release=r;});f.afterRead=async sql=>{if(sql.includes('SELECT 1 AS eligible'))await gate;};
+ const first=args.authorize('operator_credential',new AbortController().signal);
+ answers.push(await args.authorize('operator_primary_read',new AbortController().signal));release();
+ answers.push(await first);return blocked;
+ })()));assert.equal((await h.runFiniteKnownCancellationReleaseWorkflow(f.input)).status,'uncertain');await task;assert.deepEqual(answers,[false,false]);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+test('grant drift after initial admission blocks the next fixed hook permanently',async()=>{
+ const f=await fixture(),answers=[];try{const h=await closureHarness(async args=>{
+ await f.db.prepare(faults['revoked-current']).run();
+ answers.push(await args.authorize('operator_credential',new AbortController().signal));
+ answers.push(await args.authorize('operator_primary_read',new AbortController().signal));return blocked;
+ });assert.equal((await h.runFiniteKnownCancellationReleaseWorkflow(f.input)).status,'uncertain');assert.deepEqual(answers,[false,false]);assert.equal(f.credentials,0);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+
+for(const kind of ['original','current','cancellation'])test('future primary '+kind+' dates deny before runtime',async()=>{
+ const f=await fixture();try{f.afterRead=async(sql,r)=>{
+ if(kind==='original'&&sql.startsWith('SELECT a.grant_id'))r.results[0].closed_at=Date.now()+50000;
+ if(kind==='current'&&sql.includes('WHERE g.id=?'))r.results[0].issued_at=Date.now()+50000;
+ if(kind==='cancellation'&&sql.includes('LIMIT 9'))r.results[0].closed_at=Date.now()+50000;
+ };assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+});
+test('the second primary snapshot must byte-match the first original history',async()=>{
+ const f=await fixture();let originals=0;try{f.afterRead=async(sql,r)=>{if(sql.startsWith('SELECT a.grant_id')&&++originals===2)r.results[0].process_generation='7'.repeat(64);};assert.deepEqual(await call(f),blocked);assert.equal(originals,2);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+});
+test('ninth cancellation and oversized own-data rows are not truncated into authority',async()=>{
+ for(const mode of ['ninth','oversized','extra-field']){
+ const f=await fixture();try{f.afterRead=async(sql,r)=>{if(sql.includes('LIMIT 9')){
+ if(mode==='ninth')r.results=Array.from({length:9},()=>({...r.results[0]}));
+ if(mode==='oversized')r.results[0].resource='x'.repeat(201);
+ if(mode==='extra-field')r.results[0].hidden='private';
+ }};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{await f.mf.dispose();}
+ }
+});
+test('hung projection consumes the original event budget; late success never resumes runtime',async()=>{
+ const f=await fixture();let release;try{
+ f.input.event.timestamp=new Date(Date.now()-69800);const gate=new Promise(r=>{release=r;});f.afterRead=()=>gate;
+ const start=performance.now(),pending=call(f);assert.deepEqual(await pending,blocked);assert.ok(performance.now()-start<1000);release();
+ await new Promise(r=>setTimeout(r,20));assert.equal(f.steps,0);assert.deepEqual(await pending,blocked);
+ }finally{release?.();await f.mf.dispose();}
+});
+test('wall clock regression during primary projection cannot renew the request',async()=>{
+ const f=await fixture(),realNow=Date.now;try{const at=Date.now();f.afterRead=async()=>{Date.now=()=>at-1;};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);}finally{Date.now=realNow;await f.mf.dispose();}
+});
+for(const own of [true,false])test('adapter hook after a '+(own?'matching':'foreign')+' reservation retains exact own-row rules',async()=>{
+ const f=await fixture(),answers=[];try{
+ const h=await closureHarness(async args=>{
+ const manifest=JSON.parse(f.bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text);
+ const resolved=resolveSuccessorPreparation({scope:manifest.scope,original:manifest.original,candidate:manifest.candidate,namespace:f.input.env.AFW_RELEASE_EVENTS_NODE});
+ const candidate={...resolved.candidate,...(own?{}:{scopeHash:'0'.repeat(64)})};
+ const r=await createSuccessorReservation({db:f.db,original:resolved.original,candidate,cancellationHistory:args.cancellationHistory,authorize:async()=>true,now:Date.now,timeoutMs:5000,readRetirement:async()=>({purpose:'afw.retirement-evidence.v1',...resolved.original,processGeneration:f.retired.processGeneration,closedAt:f.retired.closedAt,stoppedAt:f.retired.closedAt+1,observedAt:Date.now(),physicalStopVerified:true,mayStartSuccessor:false})}).reserve();
+ answers.push(r.state,await args.authorize('successor_after_write',new AbortController().signal));return blocked;
+ });
+ const r=await h.runFiniteKnownCancellationReleaseWorkflow(f.input);
+ assert.deepEqual(answers,['prepared',own]);assert.equal(r.status,own?'blocked':'uncertain');
+ assert.equal((await f.db.prepare('SELECT COUNT(*) AS n FROM dossier_successor_reservations').first()).n,1);
+ }finally{delete globalThis.__knownAdapterCapture;await f.mf.dispose();}
+});
+
+test('fixed entries reject the other profile before primary, step or credentials',async()=>{
+ const f=await fixture();try{
+ assert.deepEqual(await runtime.runKnownCancellationReleaseWorkflow(f.input),blocked);
+ f.bundle.policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
+ f.bundle.policy.plan.configurationHash=activationConfigurationHash(f.bundle.policy.observation.configuration);
+ const planHash=hash(JSON.stringify(f.bundle));f.input.event.instanceId='afw-release-'+planHash;f.input.event.payload={planHash};
+ assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);assert.equal(f.reads.length,0);assert.equal(f.credentials,0);
+ }finally{await f.mf.dispose();}
+});
+for(const key of ['profile','strategy','hash','requestLease'])test('finite exact four-field admission rejects '+key,async()=>{
+ const f=await fixture();try{f.input[key]={};assert.deepEqual(await call(f),blocked);assert.equal(f.steps,0);assert.equal(f.reads.length,0);assert.equal(f.credentials,0);}finally{await f.mf.dispose();}
+});
+
+test('fixed successor reservation entries reject cross-profile before IO',async()=>{
+ const f=await fixture();let credentials=0,fetches=0;try{
+ const options={bundle:f.bundle,env:f.input.env,namespace:f.input.env.AFW_RELEASE_EVENTS_NODE,readCredential:async()=>{credentials++;throw Error('no credential');},fetchImpl:async()=>{fetches++;throw Error('no provider');},signal:new AbortController().signal};
+ await assert.rejects(reserveReleaseSuccessor(options));
+ f.bundle.policy.observation.configuration.compatibility_flags=['nodejs_compat','global_fetch_strictly_public'];
+ f.bundle.policy.plan.configurationHash=activationConfigurationHash(f.bundle.policy.observation.configuration);
+ await assert.rejects(reserveFiniteReleaseSuccessor(options));
+ assert.equal(credentials,0);assert.equal(fetches,0);assert.equal(f.reads.length,0);
+ }finally{await f.mf.dispose();}
+});

~~~~~~~~~~
