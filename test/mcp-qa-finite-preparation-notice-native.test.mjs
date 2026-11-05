import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import * as issuer from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
const statements=text=>text.replace(/^--.*$/gm,'').trim().split(/;\s*(?=CREATE|$)/).map(x=>x.trim()).filter(Boolean);
const monitoringSchema=(await Promise.all(['db/dossier-monitoring-consent.sql','db/dossier-monitoring-owner-tickets.sql'].map(path=>readFile(path,'utf8')))).flatMap(statements);
const normalize=sql=>sql.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
// One compilation for this entire file; the original issuer runner remains unchanged.
const built=await build({entryPoints:['test/fixtures/finite-preparation-issuer-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
console.log('SYN notice fixture compilations=1 bytes='+built.outputFiles[0].contents.length);
let serial=0;
async function scenario(t,name,extra={}){
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'SYN-notice-'+(++serial)},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-notice-'+serial}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,monitoringSchema,...extra})});
 assert.equal(response.status,200);return response.json();
}
function causal(r,i){
 assert.equal(r.open.status,'applied');assert.equal(r.authorization.status,'applied');assert.equal(r.consumed,true);assert.equal(r.grant.status,'applied');assert.equal(r.grant.row.id,i.grantId);
 assert.equal(r.error,undefined,'native grant reached; monitoring invocation: '+r.error);
}
test('REAL first notice uses native original issuer grant and observed ticket',async t=>{
 const {result:r,identity:i,events}=await scenario(t,'notice-positive');causal(r,i);
 assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.consent.status,'applied');
 assert.equal(r.consent.row.expires_at,r.ticket.row.permission_expires_at);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
 assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,1);assert.equal(r.rows.consents.results.length,1);assert.equal(r.rows.grants.results.length,1);assert.equal(r.grantUnchanged,true);
 assert.equal(r.consent.row.grant_id,i.grantId);assert.equal(r.secondDenied,true);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.witnessFrozen,true);assert.equal(r.resultFrozen,true);
 const reads=events.filter(e=>e.sql?.includes('SELECT t.*'));assert.equal(reads.length,1);
 for(const read of reads){assert.equal(events.find(e=>e.sid===read.sid),read,'ticket SELECT is first statement in fresh primary');assert.equal(events.find(e=>e.session===read.sid).mode,'first-primary');assert.ok(events.some(e=>e.sid<read.sid&&e.sql?.includes('PRAGMA table_info(dossier_monitoring_owner_tickets)')));}
 assert.deepEqual(Object.keys(r.ticket.row).sort(),'handle_hash request_id user_id grant_id project_id client_id resource purpose action revision expected_sequence issued_at expires_at permission_expires_at'.split(' ').sort());
 assert.deepEqual(Object.keys(r.consent.row).sort(),'sequence grant_id project_id user_id client_id resource revision action purpose request_id issued_at expires_at'.split(' ').sort());
 assert.ok(Number.isSafeInteger(r.consent.row.issued_at));assert.ok(r.consent.row.issued_at>=r.ticketData.issuedAt);
 assert.ok(events.find(e=>e.sql?.includes('INSERT INTO dossier_monitoring_consent_events')).sql.includes('n.ms'));
});
test('REAL first notice keeps absolute permission beyond child window',async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-absolute');causal(r,i);
 assert.equal(r.consent.status,'applied');assert.equal(r.consent.row.expires_at,r.ticketData.permissionExpiresAt);assert.ok(r.consent.row.expires_at-r.ticketData.issuedAt>=10000);
 assert.ok(r.commonWindow.deadline-r.commonWindow.startedAt<=5000);assert.ok(r.consent.row.expires_at>r.commonWindow.deadline);assert.ok(r.consent.row.expires_at-r.consent.row.issued_at>5000);
});
test('REAL global sequence is not per-grant plus one',async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-global');causal(r,i);assert.equal(r.priorMax,0);assert.ok(r.consent.row.sequence>1);assert.equal(r.eventsRows.length,3);assert.equal(r.counts.notices,1);assert.equal(r.freshPrior.status,'no_mutation');assert.equal(r.eventsRows.filter(x=>x.grant_id!==i.grantId).length,2);
});
test('REAL schema metadata equals unchanged original seven statements',()=>{
 assert.equal(Object.isFrozen(issuer.FINITE_PREPARATION_MONITORING_SCHEMA),true);assert.equal(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.length,7);assert.deepEqual(issuer.FINITE_PREPARATION_MONITORING_SCHEMA.map(normalize),monitoringSchema.map(normalize));
});
for(const fault of ['clone','json','row','store','lease','getter','witness-getter','symbol','prototype','sparse','oversize','depth','extra','args-missing','args-extra','identity','grant-scopes','grant-created','grant-expires','consumed','Access','preconnection','started','deadline'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+fault,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-hostile',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.equal(r.observed,true);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);assert.equal(r.counts.notices,0);
});
for(const method of ['insertMonitoringTicket','observeMonitoringTicket'])for(const fault of ['missing','extra','ticket-getter','symbol','extra-key','ticket-key','window-key','grant-key','cap'])test('REAL native notice rejects hostile DATA and foreign ticket witness '+method+' '+fault,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-signatures',{method,fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);assert.equal(r.getters,0);
});
for(const fault of ['handleHash','requestId','expectedSequence','issuedAt','expiresAt','permissionExpiresAt'])test('REAL native notice current tuple races deny at commit altered ticket DATA '+fault,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-ticket-data',{fault});causal(r,i);assert.equal(r.ticket.status,'applied');assert.ok(r.denied||r.witness===null);assert.equal(r.newWrites,0);assert.equal(r.counts.notices,0);
});
for(const target of ['ticket','consent'])for(const fault of ['owner','revision','user_id','project_id','client_id','resource','scopes_json','revoked_at','created_at','expires_at','exchanged_at','auth','fence','event',...(target==='consent'?['ticket']:[])])test('REAL native notice current tuple races deny at commit '+target+' '+fault,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-race',{target,fault});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,fault==='event'?1:0);assert.equal(r.counts.tickets,target==='ticket'?0:1);assert.equal(r.rows.grants.results.length,1);
 if(fault==='ticket'){assert.equal(r.ordinaryUpdateDenied,true);assert.equal(r.synSchemaTamperAfterPreflight,true);}
});
for(const fault of ['missing-consent','missing-ticket','constraint','unique','index','trigger','extra','type','clock','iso'])test('REAL monitoring preflight denies missing or changed original schema '+fault,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-schema',{fault});causal(r,i);assert.equal(r.denied,true);assert.equal(r.newWrites,0);
});
for(const target of ['ticket','consent'])test('REAL queued monitoring INSERT denies after native deadline '+target,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-queue',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
});
for(const target of ['ticket','consent'])for(const ceiling of ['C0','consent','grant','Access','preconnection','ticket','permission'])test('REAL queued monitoring INSERT denies earliest '+ceiling+' '+target,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-queue',{target,ceiling});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.gateBeforeDeadline,true);assert.equal(r.gateBeforeMinimum,true);assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
 assert.equal(r.ceilings[ceiling],r.minimum);console.log('SYN ceiling '+target+' '+ceiling+' minimum='+r.minimum+' ties='+r.ties.join(',')+' gate='+r.gateAt);
});
for(const target of ['ticket','consent'])test('REAL original issuer barrier beats queued monitoring INSERT '+target,async t=>{
 const {result:r,identity:i,events}=await scenario(t,'notice-barrier',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.primaryBarrierCompleted,true);assert.equal(r.barrier.status,'fenced');assert.equal(r.pending.value.status,'no_mutation');assert.equal(r.counts.notices,0);assert.equal(r.counts.tickets,target==='ticket'?0:1);
 const read=events.find(e=>e.sql?.includes('SELECT f.*'));assert.ok(read);assert.equal(events.find(e=>e.sid===read.sid),read);
});
test('REAL issued notice remains historical after original grant reduction',async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-reduction');causal(r,i);assert.equal(r.consent.status,'applied');assert.equal(r.enabledBefore,true);assert.equal(r.enabledAfterClose,true);assert.equal(r.revoke.status,'revoked');assert.equal(r.resolverDeniedAfterRevoke,true);assert.equal(r.counts.notices,1);assert.equal(r.rows.grants.results.length,1);assert.ok(r.rows.grants.results[0].revoked_at);
});
for(const target of ['ticket','consent'])test('REAL post-commit notice ACK loss blocks another write in this store '+target,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-ack',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pending.rejected,true);for(const k of ['ticketRetryDenied','consentRetryDenied','observationDenied'])assert.equal(r[k],true,k);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
});
for(const target of ['ticket','consent'])test('REAL held native SQL settlement cannot become successful cancellation '+target,async t=>{
 const {result:r,identity:i}=await scenario(t,'notice-held',{target});causal(r,i);assert.equal(r.gateReached,true);assert.equal(r.committed,true);assert.equal(r.pendingAfterAbort,true);assert.equal(r.pending.rejected,true);assert.equal(r.retryWrites,0);assert.equal(r.counts.tickets,1);assert.equal(r.counts.notices,target==='ticket'?0:1);
});
