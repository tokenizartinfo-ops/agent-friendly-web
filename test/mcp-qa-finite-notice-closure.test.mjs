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
    const expected={id:saved.eventId,revision:saved.revision};
    const result=await f.host.withdrawFiniteSubscription(boundary,expected);
    assert.equal(result.subscriptionHash,createHash('sha256').update(row.subscription_id).digest('hex'));
    assert.equal(result.eventId,sent.eventId);
    assert.equal(result.httpReceipt.httpReceivedAt,sent.httpReceivedAt);
    assert.equal(result.httpReceipt.status,200);
    assert.equal(result.withdrawn,true);
    assert.equal(result.cloudReviewConfirmed,false);
    assert.equal(f.sends(),2);
    assert.deepEqual(await f.host.withdrawFiniteSubscription(boundary,expected),result);
    const wrong=await f.host.withdrawFiniteSubscription(boundary,{...expected,id:'0'.repeat(64)});
    assert.equal(wrong.withdrawn,true);
    assert.equal(wrong.eventId,null);
    assert.equal(wrong.httpReceipt,null);
    stop.abort();
    await assert.rejects(()=>f.host.withdrawFiniteSubscription(boundary,expected));
  } finally {
    try { await f.host.close(); } finally { f.close(); }
  }
});

import {finiteFinalizerFixture} from './fixtures/finite-finalizer.mjs';
import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';

test('QA receipt chain retains the opaque event through verified restoration', async () => {
  const f=await finiteFinalizerFixture({withNotice:true});
  const expected=f.output.completion.notice;
  assert.equal(expected.eventId,'e'.repeat(64));
  const actual=await createPrivateQaFiniteTrialFinalizer(f.deps).run();
  assert.equal(actual.status,'restored_observed');
  assert.deepEqual(actual.notice,expected);
  assert.equal(actual.notice.cloudReviewConfirmed,false);
  assert.equal(f.posts,1);
});

test('finalizer rejects a claimed review substituted for the original HTTP receipt', async () => {
  const f=await finiteFinalizerFixture({withNotice:true});
  const {completion,primaryReceipt}=f.state.output;
  const rehash=({receiptHash,...body})=>createHash('sha256').update(JSON.stringify(body)).digest('hex');
  completion.notice.cloudReviewConfirmed=true;
  completion.receiptHash=rehash(completion);
  primaryReceipt.completionHash=completion.receiptHash;
  primaryReceipt.receiptHash=rehash(primaryReceipt);
  const result=await createPrivateQaFiniteTrialFinalizer(f.deps).run();
  assert.equal(result.status,'admin_pending');
  assert.equal(f.posts,0);
});
