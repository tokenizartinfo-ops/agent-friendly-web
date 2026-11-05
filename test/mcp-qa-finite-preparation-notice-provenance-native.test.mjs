import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {initialHash as hash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
const built=await build({entryPoints:['test/fixtures/finite-preparation-notice-provenance-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
console.log('SYN notice provenance fixture compilations=1 bytes='+built.outputFiles[0].contents.length+' sha256='+createHash('sha256').update(built.outputFiles[0].contents).digest('hex'));
let serial=0;
async function scenario(t,name='positive',extra={}){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-provenance-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteNoticeProvenanceFixture',useSQLite:true,uniqueKey:'SYN-provenance-'+serial}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,...extra})});
 assert.equal(response.status,200);const {result:r,identity:i}=await response.json();
 assert.equal(r.grant?.row.id,i.grantId);assert.equal(r.reachedNativeGrant,true);assert.equal(r.error,undefined,'native grant reached; journal failure: '+r.error);return r;
}
function recorded(r){assert.equal(r.reservation.status,'recorded');assert.equal(r.reservationReplay.status,'existing');assert.equal(r.reservationConflict.status,'uncertain');}
test('REAL native original grant precedes durable notice reservation and original provenance bindings',async t=>{
 const r=await scenario(t);recorded(r);assert.equal(r.issuerReservation.status,'recorded');assert.equal(r.originalGrantAck.status,'recorded');
 assert.equal(r.reservationData.issuerReservationHash,r.originalBindings.issuer);assert.equal(r.reservationData.originalGrantAckHash,r.originalBindings.ack);assert.equal(r.reservationData.grantLinkHash,r.originalBindings.grantLink);assert.equal(r.reservationData.connectionHash,r.originalBindings.connection);
 assert.deepEqual(r.concurrent.map(x=>x.status).sort(),['existing','recorded']);assert.equal(r.ticket.status,'applied');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.betweenGetPost.operations.ticket.ack.recordHash,r.ticketAckData.recordHash);
 assert.equal(r.observed,true);assert.equal(r.witnessFrozen,true);assert.equal(r.consent.status,'applied');assert.equal(r.consentAck.status,'recorded');assert.equal(r.writes,2);assert.equal(r.grantUnchanged,true);
 assert.equal(r.priorGrantMax,0);assert.equal(r.reservationData.ticket.expectedSequence,0);assert.equal(r.consent.row.sequence,17);assert.equal(r.consentAckData.sequence,17);assert.deepEqual(r.foreignAfter,r.foreignBefore);assert.equal(r.foreignAfter.length,16);
 assert.equal(Object.keys(r.ticket.row).length,14);assert.equal(Object.keys(r.consent.row).length,12);
 assert.deepEqual(r.ticketRows,[r.ticket.row]);assert.deepEqual(r.eventRows,[r.consent.row]);
 assert.equal(r.ticketAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.ticketRows[0]));assert.equal(r.consentAckData.rowHash,hash('afw.finite-preparation-notice-row.v1',r.eventRows[0]));
 assert.equal(r.history.operations.consent.ack.sequence,17);assert.equal(r.history.freeze,null);
});
for(const name of ['freeze-empty','freeze-ticket-send','freeze-ticket-ack','freeze-consent-send','freeze-complete'])test('REAL irreversible '+name+' preserves history and blocks new progress',async t=>{
 const r=await scenario(t,name);recorded(r);assert.equal(r.freeze.status,'recorded');assert.ok(r.history.freeze);assert.equal((r.blockedSend??r.blockedAck??r.replaySend).status,name==='freeze-complete'?'existing':'uncertain');
 if(name==='freeze-empty'){assert.equal(r.history.operations.ticket.send,null);assert.equal(r.freezeReplay.status,'existing');assert.equal(r.writes,0);}
 if(name==='freeze-ticket-send'){assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);}
 if(name==='freeze-ticket-ack'){assert.ok(r.history.operations.ticket.ack);assert.equal(r.history.operations.consent.send,null);assert.equal(r.writes,1);}
 if(name==='freeze-consent-send'){assert.ok(r.history.operations.consent.send);assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);}
 if(name==='freeze-complete'){assert.equal(r.replayAck.status,'existing');assert.equal(r.replaySend.status,'existing');assert.equal(r.writes,2);assert.ok(r.history.operations.consent.ack);}
});
for(const fault of ['callback_throw','final_throw','sync_loss','readback_loss'])test('REAL native transaction durability fault '+fault+' never authorizes SQL',async t=>{
 const r=await scenario(t,'transaction-fault',{fault});assert.equal(r.reservation.status,'uncertain');assert.equal(r.noticeRows.length,fault==='callback_throw'?0:1);assert.equal(r.writes,0);
 if(fault!=='callback_throw')assert.equal(r.txCommitted,true);
});
for(const target of ['ticket','consent'])test('REAL actual SQL '+target+' ACK loss preserves SEND without reconstructing ACK or replay',async t=>{
 const r=await scenario(t,'sql-loss',{target});recorded(r);assert.equal(r.actualSqlRejected,true);assert.equal(r.ticketRows.length,1);assert.equal(r.eventRows.length,target==='ticket'?0:1);assert.ok(r.history.operations[target].send);assert.equal(r.history.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].ack,null);assert.equal(r.afterFreeze.operations[target].send.recordHash,r.history.operations[target].send.recordHash);assert.equal(r.writes,target==='ticket'?1:2);
 if(target==='ticket'){assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);}
});
for(const kind of ['transaction','sql'])test('REAL '+kind+' Promise retained after abort; SYN observer owns outstanding exclusion within original deadline',async t=>{
 const r=await scenario(t,'retained-'+kind);assert.equal(r.gateReached,true);assert.equal(r.gateCommitted,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.otherLeaseDistinct,true);assert.equal(r.otherLeaseLive,true);assert.equal(r.withinOriginalDeadline,true);assert.equal(r.observerDenied,true);assert.equal(r.observerAfterSettle,true);assert.equal(r.writes,kind==='transaction'?0:1);
 if(kind==='transaction'){assert.equal(r.pending.value.status,'uncertain');assert.equal(r.noticeRows.length,1);}else{assert.equal(r.pending.rejected,true);assert.ok(r.history.operations.ticket.send);assert.equal(r.history.operations.ticket.ack,null);}
});
for(const fault of ['unknown','seventh','orphan','noncanonical','actor','version','metadata','storage','binding'])test('REAL exhaustive inventory and captured holder integrity reject '+fault,async t=>{
 const r=await scenario(t,'corrupt',{fault});recorded(r);assert.equal(r.denied,true);assert.equal(r.writes,0);
});
for(const fault of ['Access','consent-without-ticket-ACK','request-hash','decision-hash','pre-reservation','ceiling','getter'])test('REAL contextual SEND validation rejects '+fault+' before mutation',async t=>{
 const r=await scenario(t,'invalid',{fault});recorded(r);assert.ok(['uncertain','denied'].includes(r.invalid.status));assert.equal(r.getters,0);assert.equal(r.writes,0);assert.equal(r.history.operations.ticket.send,null);assert.equal(r.history.operations.consent.send,null);if(fault==='getter')assert.equal(r.errorMessage,'Finite preparation notice unavailable');
});
for(const fault of ['sendHash','sequence','early','late'])test('REAL ticket ACK link/timing/sequence rejects '+fault,async t=>{
 const r=await scenario(t,'invalid-ticket-ack',{fault});recorded(r);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.ticket.ack,null);assert.equal(r.writes,1);
});
test('REAL consent ACK requires actual positive assigned sequence',async t=>{const r=await scenario(t,'invalid-consent-ack');recorded(r);assert.equal(r.consent.row.sequence,17);assert.equal(r.invalidAck.status,'uncertain');assert.equal(r.history.operations.consent.ack,null);assert.equal(r.writes,2);});
test('REAL no_mutation ACK is terminal and cannot advance consent',async t=>{const r=await scenario(t,'no-mutation');recorded(r);assert.equal(r.ticket.status,'no_mutation');assert.equal(r.ticketAck.status,'recorded');assert.equal(r.history.operations.ticket.ack.rowHash,null);assert.equal(r.history.operations.ticket.ack.sequence,null);assert.equal(r.blockedConsent.status,'uncertain');assert.equal(r.history.operations.consent.send,null);assert.equal(r.ticketRows.length,0);assert.equal(r.writes,1);});

test('REAL POST Access may narrow while covering original ticket without enlarging permission',async t=>{
 const r=await scenario(t,'consent-reduced');recorded(r);assert.equal(r.consent.status,'applied');assert.equal(r.history.operations.consent.send.accessExpiresAt,r.reservationData.ticket.expiresAt);assert.ok(r.history.operations.consent.send.accessExpiresAt<r.reservationData.accessExpiresAt);assert.equal(r.consent.row.expires_at,r.reservationData.ticket.permissionExpiresAt);
});
