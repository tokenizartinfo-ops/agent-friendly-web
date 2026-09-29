import { normalizeIntake } from './intake.mjs';

/** @param {{ready:boolean, draft:Record<string,unknown>, base:Record<string,unknown>, manual?:boolean, busy?:boolean, paused?:boolean, conflict?:boolean, sessionRequired?:boolean}} state */
export function shouldAutosaveProject(state) {
  if (!state.ready || state.manual || state.busy || state.paused || state.conflict || state.sessionRequired) return false;
  const draft = normalizeIntake(state.draft);
  return Boolean(draft.website) && JSON.stringify(draft) !== JSON.stringify(normalizeIntake(state.base));
}
