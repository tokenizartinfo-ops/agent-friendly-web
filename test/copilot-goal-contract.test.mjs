import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewCopilotOutput } from '../lib/intake-copilot.mjs';
import { proportionalTargetGuide } from '../lib/proportional-target.mjs';
import { applyIntakeDraft, previewIntakeDraft } from '../lib/intake-draft-review.mjs';

test('quoted goal interpretations are reviewable, preserve history and reject stale previews', async () => {
  const contract = await import('../lib/copilot-goal-contract.mjs').catch(() => ({}));
  assert.equal(typeof contract.reviewedGoalProposal, 'function');
  for (const [mode, code] of Object.entries({ discover: 'discovery', explain: 'content', query: 'tools', act: 'actions', transact: 'payments' })) {
    const draft = { goals: ['historical'] };
    const proposal = contract.reviewedGoalProposal({ goalGuidance: { mode, sourceExcerpt: 'My explicit goal' }, currentGoals: draft.goals });
    assert.deepEqual(proposal.value, ['historical', code]);
    assert.equal(proposal.sourceExcerpt, 'My explicit goal');
    const preview = previewIntakeDraft(draft, { suggestions: [proposal] }, ['goals']);
    assert.deepEqual(draft.goals, ['historical']);
    assert.deepEqual(applyIntakeDraft(draft, preview).goals, ['historical', code]);
    assert.throws(() => applyIntakeDraft({ goals: ['content'] }, preview), /stale_preview/);
    assert.equal(contract.reviewedGoalProposal({ goalGuidance: { mode, sourceExcerpt: 'Quote' }, currentGoals: [code] }), null);
  }
  for (const goalGuidance of [null, { mode: 'unknown', sourceExcerpt: 'Quote' }, { mode: 'query', sourceExcerpt: '' }]) {
    assert.equal(contract.reviewedGoalProposal({ goalGuidance }), null);
  }
  assert.deepEqual(contract.knownGoalCodes(['tools', 'history', 'tools', 'content']), ['tools', 'content']);
});

test('free text goals cannot be accepted as categories', () => {
  const notes = 'Queremos exponer una API';
  assert.deepEqual(reviewCopilotOutput({ suggestions: [{ field: 'goals', value: ['exponer una API'], sourceExcerpt: notes }] }, notes).suggestions, []);
});

test('an explicit API exposure intent can be reviewed as tools instead of content', async () => {
  const { reviewedGoalProposal } = await import('../lib/copilot-goal-contract.mjs');
  const notes = 'Queremos exponer una API para consultar el catálogo';
  const reviewed = reviewCopilotOutput({ suggestions: [], goalEvidence: { mode: 'query', sourceExcerpt: 'exponer una API' } }, notes);
  const proposal = reviewedGoalProposal({ goalGuidance: reviewed.goalGuidance });
  assert.deepEqual(proposal?.value, ['tools']);
});

test('unknown historical goals and capabilities leave the horizon undecided', () => {
  assert.equal(proportionalTargetGuide({ goals: ['exponer una API'] }).stage, 'undecided');
  assert.equal(proportionalTargetGuide({ desiredCapabilities: ['unknown'] }).stage, 'undecided');
  assert.equal(proportionalTargetGuide({ goals: ['historical', 'tools'] }).stage, 'tool_exploration');
});
