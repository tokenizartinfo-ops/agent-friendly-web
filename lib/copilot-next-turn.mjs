import { knownGoalCodes, reviewedGoalProposal } from './copilot-goal-contract.mjs';

const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const filled = value => Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? '').trim());

/** A client-side cue only. Proposals and their quotes remain unverified until owner review. */
/** @param {Record<string, string|string[]>} [draft]
 * @param {{blocked?: boolean, suggestions?: Array<{field: string, value: string|string[], sourceExcerpt: string}>}|null} [result]
 * @param {string[]} [deferred] */
export function planCopilotNextTurn(draft = {}, result = null, deferred = [], context = {}) {
  const basedOnRevision = Number.isSafeInteger(context.revision) && context.revision >= 0 ? context.revision : 0;
  const turn = (kind, stage, reasonKey, detail = {}) => ({ kind, stage, reasonKey, basedOnRevision, ...detail });
  if (['session', 'conflict', 'save'].includes(context.recovery))
    return turn('recover', 'intake', 'preserve_changes', { actionId: `resolve_${context.recovery}` });
  const goals = knownGoalCodes(draft.goals);
  const allowed = ['organization', 'website', 'audience', 'languages', ...(goals.some(goal => ['tools', 'actions', 'payments'].includes(goal)) ? ['cms', 'hosting'] : [])];
  const suggestions = result && !result.blocked && Array.isArray(result.suggestions)
    ? result.suggestions.filter(item => allowed.includes(item?.field)
      && typeof item.sourceExcerpt === 'string' && item.sourceExcerpt.trim())
    : [];
  const conflict = suggestions.find(item => filled(draft[item.field]) && !equal(draft[item.field], item.value));
  if (conflict) return turn('clarify', 'intake', 'resolve_contradiction', { field: conflict.field, sourceExcerpt: conflict.sourceExcerpt });
  const goalProposal = !result?.blocked && reviewedGoalProposal({ goalGuidance: result?.goalGuidance, currentGoals: draft.goals });
  if (!deferred.includes('goals') && (goalProposal || !goals.length))
    return turn(goalProposal ? 'review' : 'ask', 'orientation', 'confirm_goal', { field: 'goals', ...(goalProposal ? { sourceExcerpt: goalProposal.sourceExcerpt } : {}) });
  const proposed = suggestions.find(item => !filled(draft[item.field]));
  if (proposed) return turn('review', 'intake', 'review_owner_evidence', { field: proposed.field, sourceExcerpt: proposed.sourceExcerpt });
  const next = allowed.find(field => !filled(draft[field]) && !deferred.includes(field));
  if (next) return turn('ask', 'intake', 'understand_site', { field: next });
  if (!goals.length) return turn('summary', 'orientation', 'goal_pending', { actionId: 'review_pending_goal' });
  if (!filled(draft.contentSources) && !deferred.includes('contentSources'))
    return turn('ask', 'scope_review', 'ground_answers', { field: 'contentSources' });
  if (['', 'unknown'].includes(String(draft.control || '')) && !deferred.includes('control'))
    return turn('ask', 'scope_review', 'confirm_responsibility', { field: 'control' });
  return turn('summary', 'scope_review', 'review_proportional_scope', { actionId: 'review_scope' });
}
