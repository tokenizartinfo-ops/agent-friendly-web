import { isCopilotProjectAllowed } from './copilot-rollout.mjs';

const denied = (code, status) => ({ ok: false, code, status });

// Fresh primary read: the consent sequence is an epoch, not a timestamp.
// A revoke followed by a new grant cannot revive an older in-flight request.
export async function createCopilotResponseGuard(env, { projectId, userId, revision }, getUser) {
  let consentSequence;
  async function check() {
    const actor = await getUser();
    if (!actor || actor.userId !== userId) return denied('authentication_required', 401);
    if (String(env.AFW_COPILOT_ENABLED) !== 'true' || !env.AFW_COPILOT_PROJECT_ID) return denied('copilot_unavailable', 503);
    if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) return denied('project_unavailable', 404);
    const db = env.DB?.withSession ? env.DB.withSession('first-primary') : env.DB;
    if (!db) return denied('copilot_unavailable', 503);
    const state = await db.prepare(`SELECT p.revision, c.sequence, c.action, c.consent_version
      FROM site_projects p LEFT JOIN copilot_consent_events c
      ON c.project_id=p.id AND c.user_id=p.user_id AND c.sequence=(
        SELECT MAX(sequence) FROM copilot_consent_events WHERE project_id=p.id AND user_id=p.user_id)
      WHERE p.id=? AND p.user_id=?`).bind(projectId, userId).first();
    if (!state) return denied('project_unavailable', 404);
    if (!Number.isSafeInteger(state.revision) || state.revision !== revision) return denied('project_changed', 409);
    if (state.action !== 'grant' || state.consent_version !== 'afw-copilot-processing-v1'
      || !Number.isSafeInteger(state.sequence) || state.sequence < 1
      || (consentSequence !== undefined && state.sequence !== consentSequence)) return denied('project_consent_required', 403);
    // Changes while the primary query awaited must also fail closed.
    const freshActor = await getUser();
    if (!freshActor || freshActor.userId !== userId) return denied('authentication_required', 401);
    if (String(env.AFW_COPILOT_ENABLED) !== 'true' || !env.AFW_COPILOT_PROJECT_ID) return denied('copilot_unavailable', 503);
    if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) return denied('project_unavailable', 404);
    consentSequence = state.sequence;
    return { ok: true };
  }
  const initial = await check();
  return initial.ok ? { ok: true, check } : initial;
}
