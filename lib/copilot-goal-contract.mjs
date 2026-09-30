const goalModes = Object.freeze({ discover: 'discovery', explain: 'content', query: 'tools', act: 'actions', transact: 'payments' });
const goalCodes = new Set(Object.values(goalModes));

export function knownGoalCodes(values) {
  return [...new Set(Array.isArray(values) ? values.filter(value => goalCodes.has(value)) : [])];
}

/** Consumes server-reviewed evidence. A proposal never changes the dossier or authorizes an operation. */
export function reviewedGoalProposal({ goalGuidance, currentGoals } = {}) {
  if (!goalGuidance || !Object.hasOwn(goalModes, goalGuidance.mode)
    || typeof goalGuidance.sourceExcerpt !== 'string' || !goalGuidance.sourceExcerpt.trim()) return null;
  const goals = Array.isArray(currentGoals) ? [...currentGoals] : [];
  const code = goalModes[goalGuidance.mode];
  if (goals.includes(code) || goals.length >= 12) return null;
  return { field: 'goals', value: [...goals, code], sourceExcerpt: goalGuidance.sourceExcerpt,
    interpretation: 'goal_mode_mapping' };
}
