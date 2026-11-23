import { normalizeIntake } from './intake.mjs';
import { canSaveProjectDraft } from './project-draft.mjs';

/** @param {{ready:boolean, draft:Record<string,unknown>, base:Record<string,unknown>, projectId?:string, manual?:boolean, busy?:boolean, paused?:boolean, conflict?:boolean, sessionRequired?:boolean}} state */
export function shouldAutosaveProject(state) {
  if (!state.ready || state.manual || state.busy || state.paused || state.conflict || state.sessionRequired) return false;
  if (!canSaveProjectDraft(state.draft, state.base, state.projectId)) return false;
  return JSON.stringify(normalizeIntake(state.draft)) !== JSON.stringify(normalizeIntake(state.base));
}
