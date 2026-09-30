import test from 'node:test';
import assert from 'node:assert/strict';
import * as plans from '../lib/draft-pr-plan.mjs';

test('a technical plan is usable only with the exact complete comparison it reviewed', () => {
  const plan = { capsuleId: 'capsule', comparisonId: 'before', manifestSha256: 'manifest' };
  const comparison = { ...plan, status: 'complete' };
  assert.equal(plans.draftPlanMatchesComparison(plan, comparison), true);
  for (const change of [{ comparisonId: 'after' }, { capsuleId: 'other' }, { manifestSha256: 'other' }, { status: 'incomplete' }]) {
    assert.equal(plans.draftPlanMatchesComparison(plan, { ...comparison, ...change }), false);
  }
  assert.equal(plans.draftPlanMatchesComparison(null, comparison), false);
  assert.equal(plans.draftPlanMatchesComparison({}, { status: 'complete' }), false);
});
