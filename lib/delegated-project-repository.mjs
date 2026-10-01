const PROJECT_SQL = `SELECT id,user_id,organization,website,role,site_type,control,audience,
  goals_json,languages_json,status,completion,revision,updated_at
  FROM site_projects WHERE id=? AND user_id=? LIMIT 1`;
const OBSERVATIONS_SQL = `SELECT id,project_id,user_id,target_origin,readiness_json,checked_at
  FROM scan_observations WHERE project_id=? AND user_id=? AND target_origin=?
  ORDER BY checked_at DESC,id DESC LIMIT 5`;
function list(value) {
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string').slice(0, 20) : []; }
  catch { return []; }
}

/** Grant store must be authoritative and uncached, supplied by the OAuth adapter. */
export function createDelegatedProjectRepository({ db, grantStore } = {}) {
  if (typeof grantStore?.getGrant !== 'function') throw new Error('Authoritative grant store required');
  return {
    getGrant: id => grantStore.getGrant(id),
    async getOwnedProject(projectId, subject) {
      const row = await db.prepare(PROJECT_SQL).bind(projectId, subject).first();
      if (!row) return null;
      return {
        id: row.id, userId: row.user_id, organization: row.organization, website: row.website,
        status: row.status, completion: row.completion, revision: row.revision, updatedAt: row.updated_at,
        intake: { organization: row.organization, website: row.website, role: row.role,
          siteType: row.site_type, control: row.control, audience: row.audience,
          goals: list(row.goals_json), languages: list(row.languages_json) },
      };
    },
    async listCurrentObservations(projectId, subject, origin) {
      const result = await db.prepare(OBSERVATIONS_SQL).bind(projectId, subject, origin).all();
      return (result.results ?? []).map(row => ({
        id: row.id, projectId: row.project_id, userId: row.user_id,
        targetOrigin: row.target_origin, readinessJson: row.readiness_json, checkedAt: row.checked_at,
      }));
    },
  };
}
