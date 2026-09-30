import { INTAKE_ASSISTANT_ALLOWED_FIELDS } from './intake-assistant.mjs';
import { privateUiCopy } from './private-ui-copy.mjs';

const listFields = new Set(['goals', 'languages', 'contentSources']);
const controls = new Set(privateUiCopy('es').intake.controls.map(([code]) => code));
const sourceCodes = new Set(privateUiCopy('es').intake.content.map(([code]) => code));
const copy = value => Array.isArray(value) ? [...value] : value;
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);

function valid(field, value) {
  if (field === 'control') return typeof value === 'string' && controls.has(value);
  if (field === 'contentSources') return Array.isArray(value) && value.length <= sourceCodes.size && value.every(item => sourceCodes.has(item));
  return INTAKE_ASSISTANT_ALLOWED_FIELDS.includes(field) && (listFields.has(field)
    ? Array.isArray(value) && value.length <= 12 && value.every(item => typeof item === 'string')
    : typeof value === 'string');
}

export function previewIntakeDraft(draft, result, selected) {
  if (!result || result.blocked) return [];
  return result.suggestions.filter(item => selected.includes(item.field)).flatMap(item => {
    if (!valid(item.field, item.value)) throw new Error('invalid_proposal');
    const before = draft[item.field];
    return equal(before, item.value) ? [] : [{ field: item.field, before: copy(before), after: copy(item.value) }];
  });
}

export function applyIntakeDraft(draft, changes) {
  // Validate the entire preview before applying any field.
  for (const change of changes) {
    if (!valid(change.field, change.after)) throw new Error('invalid_proposal');
    if (!equal(draft[change.field], change.before)) throw new Error('stale_preview');
  }
  return { ...draft, ...Object.fromEntries(changes.map(change => [change.field, copy(change.after)])) };
}

export function planIntakeRebase(base, draft, current, revision) {
  if (!Number.isSafeInteger(revision) || revision < 1) throw new Error('invalid_revision');
  const changes = [], conflicts = [];
  for (const field of new Set([...Object.keys(base), ...Object.keys(draft)])) {
    if (equal(base[field], draft[field])) continue;
    if (!valid(field, draft[field])) throw new Error('invalid_proposal');
    if (equal(draft[field], current[field])) continue;
    if (!equal(base[field], current[field])) {
      conflicts.push({ field, base: copy(base[field]), local: copy(draft[field]), current: copy(current[field]) });
    } else {
      changes.push({ field, before: copy(current[field]), after: copy(draft[field]) });
    }
  }
  return { revision, changes, conflicts };
}

export function applyIntakeRebase(current, revision, plan) {
  if (!Number.isSafeInteger(revision) || revision < 1 || revision !== plan.revision) throw new Error('stale_revision');
  if (plan.conflicts.length) throw new Error('unresolved_conflict');
  return applyIntakeDraft(current, plan.changes);
}

export function resolveIntakeRebase(current, revision, plan, choices) {
  const resolved = plan.conflicts.map(conflict => {
    const choice = choices[conflict.field];
    if (choice !== 'local' && choice !== 'current') throw new Error('missing_choice');
    return { field: conflict.field, before: copy(conflict.current), after: copy(choice === 'local' ? conflict.local : conflict.current) };
  });
  return applyIntakeRebase(current, revision, { ...plan, conflicts: [], changes: [...plan.changes, ...resolved] });
}
