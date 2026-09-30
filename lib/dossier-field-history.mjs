import { normalizeIntake } from './intake.mjs';

const fields = new Set(Object.keys(normalizeIntake({})));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const present = value => Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? '').trim());

// Record only field names. The event log must not duplicate private dossier values.
export function changedDossierFields(previous, next) {
  return Object.keys(next).filter(field => fields.has(field)
    && (previous ? !same(previous[field], next[field]) : present(next[field])));
}

// A private UI hint, never an independent claim that a site or owner assertion was verified.
export function reviewedDossierSources(rawHints, intake, changedFields) {
  if (!rawHints || typeof rawHints !== 'object' || Array.isArray(rawHints)) return {};
  const result = {};
  for (const field of changedFields) {
    const hint = rawHints[field];
    if (!hint || typeof hint !== 'object' || Array.isArray(hint)
      || hint.kind !== 'copilot_reviewed' || !Object.hasOwn(hint, 'value')) continue;
    const normalized = normalizeIntake({ [field]: hint.value })[field];
    if (same(normalized, intake[field])) result[field] = 'copilot_reviewed';
  }
  return result;
}

export function latestDossierFieldHistory(events) {
  const result = {};
  const revisions = [];
  for (const event of events) {
    if (event.type !== 'project_updated' && event.type !== 'project_created') continue;
    let payload;
    try { payload = JSON.parse(event.payloadJson); } catch { continue; }
    if (!payload || !Array.isArray(payload.changedFields) || !Number.isSafeInteger(payload.revision)) continue;
    revisions.push({ event, payload });
  }
  revisions.sort((a, b) => b.payload.revision - a.payload.revision);
  for (const { event, payload } of revisions) {
    for (const field of payload.changedFields) {
      if (!fields.has(field) || Object.hasOwn(result, field)) continue;
      result[field] = { revision: payload.revision, savedAt: event.createdAt,
        source: payload.sources?.[field] === 'copilot_reviewed' ? 'copilot_reviewed' : 'unattributed_owner_save' };
    }
  }
  return result;
}
