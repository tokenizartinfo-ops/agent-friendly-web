import { missingIntakeQuestions, QUESTION_FIELDS } from './intake-question-coach.mjs';

const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const filled = value => Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? '').trim());

/** A client-side cue only. Proposals and their quotes remain unverified until owner review. */
/** @param {Record<string, string|string[]>} [draft]
 * @param {{blocked?: boolean, suggestions?: Array<{field: string, value: string|string[], sourceExcerpt: string}>}|null} [result]
 * @param {string[]} [deferred] */
export function planCopilotNextTurn(draft = {}, result = null, deferred = []) {
  const suggestions = result && !result.blocked && Array.isArray(result.suggestions)
    ? result.suggestions.filter(item => QUESTION_FIELDS.includes(item?.field)
      && typeof item.sourceExcerpt === 'string' && item.sourceExcerpt.trim())
    : [];
  const conflict = suggestions.find(item => filled(draft[item.field]) && !equal(draft[item.field], item.value));
  if (conflict) return { kind: 'clarify', field: conflict.field, sourceExcerpt: conflict.sourceExcerpt };
  const proposed = suggestions.find(item => !filled(draft[item.field]));
  if (proposed) return { kind: 'review', field: proposed.field, sourceExcerpt: proposed.sourceExcerpt };
  const next = missingIntakeQuestions(draft, deferred)[0];
  return next ? { kind: 'ask', field: next } : { kind: 'done' };
}
