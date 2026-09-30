import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { planCopilotNextTurn } from '../lib/copilot-next-turn.mjs';

const cited = (field, value) => ({ field, value, sourceExcerpt: `Dije ${value}` });

test('six completed fields never hide a missing goal or implementation responsibility', () => {
  const draft = { organization: 'Museum', website: 'https://example.com', audience: 'Visitors', languages: ['es'], cms: 'Drupal', hosting: 'Cloudflare', goals: [], control: 'unknown' };
  assert.equal(planCopilotNextTurn(draft).field, 'goals');
  assert.equal(planCopilotNextTurn({ ...draft, goals: ['content'] }).field, 'contentSources');
  assert.equal(planCopilotNextTurn({ ...draft, goals: ['content'], contentSources: ['website'] }).field, 'control');
});

test('recovery takes precedence and each turn is tied to a dossier revision', () => {
  const plan = planCopilotNextTurn({}, null, [], { revision: 8, recovery: 'conflict' });
  assert.equal(plan.kind, 'recover');
  assert.equal(plan.basedOnRevision, 8);
  assert.equal(plan.actionId, 'resolve_conflict');
});

test('an informative site reaches scope review without being forced through hosting or AF5', () => {
  const draft = { organization: 'Services', website: 'https://example.com', audience: 'Customers', languages: ['es'], goals: ['content'], contentSources: ['services'], control: 'provider' };
  const plan = planCopilotNextTurn(draft);
  assert.equal(plan.kind, 'summary');
  assert.equal(plan.stage, 'scope_review');
  assert.equal(plan.actionId, 'review_scope');
});

test('a cited proposal waits for review before asking again for that field', () => {
  const plan = planCopilotNextTurn({ goals: ['content'] }, { blocked: false, suggestions: [cited('organization', 'Museo Sur')] });
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
  const plan = planCopilotNextTurn({ organization: 'Museo Sur', goals: ['content'] }, { blocked: false, suggestions: [cited('organization', 'Museo Sur')] }, ['website']);
  assert.equal(plan.kind, 'ask'); assert.equal(plan.field, 'audience');
});

test('blocked or absent output cannot provide evidence or authorize a change', () => {
  assert.equal(planCopilotNextTurn({}, { blocked: true, suggestions: [cited('organization', 'Museo Sur')] }).field, 'goals');
  assert.equal(planCopilotNextTurn({}, null).field, 'goals');
});

test('the private copilot renders the planned next turn without changing the save flow', async () => {
  const source = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  assert.match(source, /planCopilotNextTurn\(draft, result,/);
  assert.match(source, /nextTurnCopy\[locale\]/);
  assert.match(source, /onApply\(applyIntakeDraft\(draft, changes\), Object\.fromEntries\(changes\.map/);
});
