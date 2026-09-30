import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { planCopilotNextTurn } from '../lib/copilot-next-turn.mjs';

const cited = (field, value) => ({ field, value, sourceExcerpt: `Dije ${value}` });

test('a cited proposal waits for review before asking again for that field', () => {
  const plan = planCopilotNextTurn({}, { blocked: false, suggestions: [cited('organization', 'Museo Sur')] });
  assert.equal(plan.kind, 'review');
  assert.equal(plan.field, 'organization');
  assert.equal(plan.sourceExcerpt, 'Dije Museo Sur');
});

test('an existing different value requires clarification, never replacement by inference', () => {
  const plan = planCopilotNextTurn({ organization: 'Museo Norte' }, { blocked: false, suggestions: [cited('organization', 'Museo Sur')] });
  assert.equal(plan.kind, 'clarify');
  assert.equal(plan.field, 'organization');
});

test('after review, asks only one missing non-deferred field', () => {
  const plan = planCopilotNextTurn({ organization: 'Museo Sur' }, { blocked: false, suggestions: [cited('organization', 'Museo Sur')] }, ['website']);
  assert.deepEqual(plan, { kind: 'ask', field: 'audience' });
});

test('blocked or absent output cannot provide evidence or authorize a change', () => {
  assert.deepEqual(planCopilotNextTurn({}, { blocked: true, suggestions: [cited('organization', 'Museo Sur')] }), { kind: 'ask', field: 'organization' });
  assert.deepEqual(planCopilotNextTurn({}, null), { kind: 'ask', field: 'organization' });
});

test('the private copilot renders the planned next turn without changing the save flow', async () => {
  const source = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  assert.match(source, /planCopilotNextTurn\(draft, result\)/);
  assert.match(source, /nextTurnCopy\[locale\]/);
  assert.match(source, /onApply\(applyIntakeDraft\(draft, changes\), Object\.fromEntries\(changes\.map/);
});
