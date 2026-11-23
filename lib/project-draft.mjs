import { normalizeIntake } from './intake.mjs';

/** A named project can be prepared before the owner has chosen a domain. */
export function namedDraftWithoutWebsite(raw) {
  return typeof raw.website === 'string' && !raw.website.trim() && typeof raw.organization === 'string'
    && Boolean(normalizeIntake({ organization: raw.organization }).organization);
}

export function canSaveProjectDraft(draft, saved, projectId) {
  return Boolean(normalizeIntake({ website: draft.website }).website)
    || Boolean(projectId && saved?.website === '' && namedDraftWithoutWebsite(draft));
}

/** Correlate the signed-in view and explicit creation without exposing the Access subject. */
export async function projectCreateOwnerBinding(userId) {
  const data = new TextEncoder().encode(JSON.stringify(['afw-owner-project-create-v1', userId]));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}
