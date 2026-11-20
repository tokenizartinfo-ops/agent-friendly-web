import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
async function scenario(t,name,extra={}){
 const built=await build({entryPoints:['test/fixtures/finite-preparation-issuer-worker.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],d1Databases:{RELEASE_DB:'issuer-component'},durableObjects:{FIXTURE:{className:'FiniteIssuerFixture',useSQLite:true,uniqueKey:'SYN-issuer-component'}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({case:name,...extra})});assert.equal(response.status,200);return response.json();
}
for(const fault of ['missing_schema','tamper_schema','unsupported_clock','unsupported_iso'])test('REAL native preflight denies '+fault+' before effects',async t=>{
 const {result:r}=await scenario(t,fault);assert.equal(r.rejected,true);assert.deepEqual(r.consents??r.rows.consents.results,[]);
});
test('REAL closed-first monotonic tombstone permits early reduction and blocks delayed OPEN',async t=>{
 const {result:r,identity:i}=await scenario(t,'schema');assert.equal(r.error,undefined);assert.equal(r.barrier.status,'fenced');assert.ok(r.barrier.row.fenced_at<i.C0);assert.equal(r.delayedOpen,true);
 for(const k of ['noDelete','immutable','noReopen','noReterminal','collision'])assert.equal(r[k],true,k);
 assert.equal(r.rows.fences.results.length,1);assert.deepEqual(r.rows.consents.results,[]);assert.deepEqual(r.rows.grants.results,[]);
});
test('REAL OPEN then terminal close prevents late authorization',async t=>{
 const {result:r}=await scenario(t,'open_then_close');assert.equal(r.error,undefined);assert.equal(r.open.status,'applied');assert.equal(r.barrier.status,'fenced');assert.equal(r.authorization.status,'no_mutation');
});
for(const kind of ['consent_queue','C0_queue','deadline_queue'])test('SYN queue REAL native DB clock denies stale consumedAt beyond '+kind,async t=>{
 const {result:r}=await scenario(t,kind);assert.equal(r.error,undefined);assert.equal(r.consumption,null);assert.equal(r.rows.consents.results[0].consumed_at,'');assert.deepEqual(r.rows.grants.results,[]);
});
test('SYN queue REAL SQL grant expiry denies actual late grant without repairing consumed consent',async t=>{
 const {result:r}=await scenario(t,'grant_expiry_queue');assert.equal(r.error,undefined);assert.equal(r.grant.status,'no_mutation');assert.notEqual(r.rows.consents.results[0].consumed_at,'');assert.deepEqual(r.rows.grants.results,[]);
});
test('REAL consumption UPDATE RETURNING privately witnesses same-instance surviving one-use grant',async t=>{
 const {result:r}=await scenario(t,'witness');assert.equal(r.error,undefined);
 for(const k of ['cloneDenied','rebuiltDenied','foreignDenied','leaseDenied','replayDenied'])assert.equal(r[k],true,k);assert.equal(r.grant.status,'applied');assert.equal(r.rows.grants.results.length,1);
});
test('REAL serialized barrier orders future grant to zero and makes exact absence meaningful',async t=>{
 const {result:r}=await scenario(t,'grant_after_barrier');assert.equal(r.error,undefined);assert.equal(r.grant.status,'no_mutation');assert.equal(r.observation.status,'absent');
});
test('REAL unknown fence ACK reconciles same original ID on fresh primary before absence',async t=>{
 const {result:r,events}=await scenario(t,'unknown_fence');assert.equal(r.error,undefined);assert.equal(r.unknown,true);assert.equal(r.lookupBeforeBarrier,true);assert.equal(r.foreignReconcile,true);assert.equal(r.observation.status,'absent');
 const fenceReads=events.filter(e=>e.sql?.includes('SELECT f.*'));assert.ok(fenceReads.length>=2);
 for(const read of fenceReads)assert.equal(events.find(e=>e.sid===read.sid),read,'barrier SELECT is FIRST query of new first-primary session');
});
for(const mode of ['normal','held_grant_ack','history'])test('REAL original UUID grant-only cleanup '+mode+' preserves unrelated rows/history',async t=>{
 const {result:r}=await scenario(t,mode);assert.equal(r.error,undefined);assert.equal(r.clonedBarrierDenied,true);assert.equal(r.clonedObservationDenied,true);assert.equal(r.unrelatedUnchanged,true);
 if(mode==='held_grant_ack')assert.equal(r.barrierBeforeGrantAck,true);assert.equal(r.revoke.status,mode==='history'?'already_revoked':'revoked');assert.ok(r.rows.grants.results.find(g=>g.id!=='unrelated').revoked_at);if(mode==='history')assert.ok(r.revoke.row.exchanged_at);
});
test('REAL foreign project revision fails closed after barrier',async t=>{
 const {result:r}=await scenario(t,'foreign_owner');assert.match(r.error,/unavailable/);assert.equal(r.rows,undefined);
});
test('REAL journal native transaction final return sync exact readback produces append-once facts',async t=>{
 const {result:r}=await scenario(t,'journal');assert.equal(r.error,undefined);assert.equal(r.append.status,'recorded');assert.equal(r.existing.status,'existing');assert.equal(r.data.reservation.recordHash,r.append.recordHash);assert.equal(r.rows.length,1);
});
for(const fault of ['final_throw','sync_loss','post_commit_hold','readback_loss'])test('SYN '+fault+' after REAL native journal commit permits no next SQL issue',async t=>{
 const {result:r}=await scenario(t,'journal',{fault});assert.equal(r.error,undefined);assert.equal(r.txCommitted,true);assert.equal(r.append.status,'uncertain');assert.equal(r.sqlBefore,r.sqlAfter);assert.equal(r.rows.length,1);
});

test('SYN native callback final throw rolls back journal and permits no SQL continuation',async t=>{
 const {result:r}=await scenario(t,'journal',{fault:'callback_throw'});assert.equal(r.error,undefined);assert.equal(r.txCommitted,false);assert.equal(r.append.status,'uncertain');assert.equal(r.sqlBefore,r.sqlAfter);assert.equal(r.rows.length,0);
});
test('REAL exact grant immutable field mismatches all fail closed without rewriting history',async t=>{
 const {result:r}=await scenario(t,'foreign_grants');assert.equal(r.error,undefined);for(const [field,denied]of Object.entries(r.denials))assert.equal(denied,true,field);assert.equal(Object.keys(r.denials).length,7);assert.equal(r.rows.grants.results[0].revoked_at,'');
});

test('REAL expired original grant and consent are reduced after C0 within original cleanup C1',async t=>{
 const {result:r,identity:i}=await scenario(t,'expired_cleanup');assert.equal(r.error,undefined);assert.ok(r.barrier.row.fenced_at>=i.C0);assert.ok(r.barrier.row.fenced_at>=Date.parse(i.consentExpiresAt));assert.equal(r.revoke.status,'revoked');assert.equal(r.revoke.row.expires_at,i.consentExpiresAt);
});

test('REAL journal append-once send ACK freeze rejects replacement grant ID and unknown keys',async t=>{
 const {result:r}=await scenario(t,'journal_chain');assert.equal(r.error,undefined);
 for(const name of ['send','ack','freeze','cleanupSend'])assert.equal(r[name].status,'recorded',name);
 for(const name of ['frozenGrant','replacement'])assert.equal(r[name].status,'uncertain',name);
 assert.equal(r.chain.operations.open_fence.send.recordHash,r.chain.operations.open_fence.ack.sendHash);assert.equal(r.chain.operations.grant.send,null);assert.equal(r.unknownDenied,true);
});

for(const target of ['open','consume','grant'])test('REAL barrier beats SYN queued original '+target+' SQL without reopening',async t=>{
 const {result:r}=await scenario(t,'queued_barrier',{target});assert.equal(r.error,undefined);assert.equal(r.barrier.status,'fenced');assert.equal(r.rows.fences.results.length,1);assert.equal(r.rows.fences.results[0].fence_request_id,r.barrier.row.fence_request_id);assert.deepEqual(r.rows.grants.results,[]);
 if(target==='open')assert.equal(r.pending.rejected,true);else if(target==='consume')assert.equal(r.pending.value,null);else assert.equal(r.pending.value.status,'no_mutation');
});
for(const mode of ['authorization_queue','open_queue','deadline_grant_queue','C0_grant_queue'])test('REAL native execution fence rejects SYN late '+mode,async t=>{
 const {result:r}=await scenario(t,mode);assert.equal(r.error,undefined);assert.equal((r.operation??r.grant).status,'no_mutation');assert.deepEqual(r.rows.grants.results,[]);if(mode==='authorization_queue')assert.deepEqual(r.rows.consents.results,[]);if(mode==='open_queue')assert.deepEqual(r.rows.fences.results,[]);
});
