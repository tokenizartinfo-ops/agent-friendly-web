import { normalizeIntake } from './intake.mjs';

const fields = new Set(Object.keys(normalizeIntake({})));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const present = value => Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? '').trim());

// Record only field names. The event log must not duplicate private dossier values.
export function changedDossierFields(previous, next) {
  return Object.keys(next).filter(field => fields.has(field)
    && (previous ? !same(previous[field], next[field]) : present(next[field])));
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
      result[field] = { revision: payload.revision, savedAt: event.createdAt };
    }
  }
  return result;
}
