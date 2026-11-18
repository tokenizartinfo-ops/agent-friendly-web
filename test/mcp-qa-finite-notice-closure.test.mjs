import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {syntheticSaveFixture} from './fixtures/mcp-own-synthetic-save.mjs';
import {saveOwnSyntheticGoal} from '../lib/mcp-own-synthetic-save.mjs';

test('closure withdraws the same original subscription and retains its existing delivery after revoke', async () => {
  const f=await syntheticSaveFixture({projectId:'oauth-canary-owner'});
  try {
    const saved=await saveOwnSyntheticGoal(f.options,{expectedRevision:1,idempotencyKey:'11111111-1111-4111-8111-111111111111',goal:'discovery'});
    assert.equal(saved.status,200);
    const sent=await f.host.deliverOwnSaved(saved.eventId);
    const row=f.db.prepare('SELECT subscription_id FROM dossier_event_subscription_receipts').get();
    f.db.prepare('UPDATE delegated_access_grants SET revoked_at=? WHERE id=?').run(new Date().toISOString(),'g');
    f.options.db.withSession=name=>{assert.equal(name,'first-primary');return f.options.db;};
    const stop=new AbortController(), boundary={signal:stop.signal,assertCurrent:()=>{},expiresAt:Date.now()+5000};
    assert.equal(typeof f.host.withdrawFiniteSubscription,'function','native subscription withdrawal is missing');
    const result=await f.host.withdrawFiniteSubscription(boundary);
    assert.equal(result.subscriptionHash,createHash('sha256').update(row.subscription_id).digest('hex'));
    assert.equal(result.eventId,sent.eventId);
    assert.equal(result.httpReceipt.httpReceivedAt,sent.httpReceivedAt);
    assert.equal(result.httpReceipt.status,200);
    assert.equal(result.withdrawn,true);
    assert.equal(result.cloudReviewConfirmed,false);
    assert.equal(f.sends(),2);
    assert.deepEqual(await f.host.withdrawFiniteSubscription(boundary),result);
    stop.abort();
    await assert.rejects(()=>f.host.withdrawFiniteSubscription(boundary));
  } finally {
    try { await f.host.close(); } finally { f.close(); }
  }
});
