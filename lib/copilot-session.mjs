import { reviewCopilotOutput } from './intake-copilot.mjs';
import { reviewedGoalProposal } from './copilot-goal-contract.mjs';

const fields = new Set(['organization', 'website', 'audience', 'languages', 'cms', 'hosting', 'goals', 'contentSources', 'control']);
const choices = new Set(['discarded', 'applied_to_draft']);
/** @returns {{version:number, basedOnRevision:number, deferred:string[], decisions:Array<{field:string,choice:string}>, pending:null|{suggestions:Array<{field:string,value:string|string[],sourceExcerpt:string}>,goalGuidance:null|{mode:'discover'|'explain'|'query'|'act'|'transact',sourceExcerpt:string}}}} */
export function emptyCopilotSession() {
  return { version: 1, basedOnRevision: 0, deferred: [], decisions: [], pending: null };
}

/** Bounded state for the current working narrative, retained until edited or explicitly cleared. */
export function reviewCopilotSession(value, notes, locale = 'es') {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).some(key => !['version', 'basedOnRevision', 'deferred', 'decisions', 'pending'].includes(key))
    || value.version !== 1 || !Number.isSafeInteger(value.basedOnRevision) || value.basedOnRevision < 0
    || !Array.isArray(value.deferred) || value.deferred.length > fields.size || value.deferred.some(field => !fields.has(field))
    || !Array.isArray(value.decisions) || value.decisions.length > 32
    || value.decisions.some(item => !item || Object.keys(item).some(key => !['field', 'choice'].includes(key)) || !fields.has(item.field) || !choices.has(item.choice))
    || JSON.stringify(value).length > 7000) throw new Error('invalid_copilot_session');
  let pending = null;
  if (value.pending !== null) {
    if (!value.pending || Object.keys(value.pending).some(key => !['suggestions', 'goalGuidance'].includes(key))) throw new Error('invalid_copilot_session');
    const reviewed = reviewCopilotOutput({ suggestions: value.pending.suggestions, goalEvidence: value.pending.goalGuidance }, notes, locale);
    pending = { suggestions: reviewed.suggestions, goalGuidance: reviewed.goalGuidance };
  }
  return { version: 1, basedOnRevision: value.basedOnRevision, deferred: [...new Set(value.deferred)], decisions: value.decisions.map(({ field, choice }) => ({ field, choice })), pending };
}

export function visibleSessionResult(session, draft = {}) {
  if (!session?.pending) return null;
  const goal = reviewedGoalProposal({ goalGuidance: session.pending.goalGuidance, currentGoals: [] });
  const decided = new Set(session.decisions.filter(item => item.choice === 'discarded' ||
    (item.field === 'goals' ? Array.isArray(draft.goals) && goal && draft.goals.includes(goal.value[0])
      : session.pending.suggestions.some(candidate => candidate.field === item.field && JSON.stringify(candidate.value) === JSON.stringify(draft[item.field])))).map(item => item.field));
  const visible = { ...session.pending, blocked: false, suggestions: session.pending.suggestions.filter(item => !decided.has(item.field)),
    goalGuidance: decided.has('goals') ? null : session.pending.goalGuidance };
  // Keep genuinely empty inferences visible, but do not label consumed proposals
  // as a failure to understand. Retain pending state for failed-save recovery.
  if (!visible.suggestions.length && !visible.goalGuidance &&
    (session.pending.suggestions.length || session.pending.goalGuidance)) return null;
  return visible;
}
