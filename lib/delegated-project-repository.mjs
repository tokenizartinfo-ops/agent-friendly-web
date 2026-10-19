import {delegatedAuthorizationSchemaPreflightSql} from './delegated-oauth-store.mjs';
const guidanceFields=new Set(['organization','website','audience','languages','cms','hosting','goals','contentSources','control']);
const PROJECT_SQL = `SELECT p.id,p.user_id,p.organization,p.website,p.role,p.site_type,p.control,p.audience,
  p.goals_json,p.languages_json,p.status,p.completion,p.revision,p.updated_at,
  trim(coalesce(p.cms,''))<>'' AS has_cms,trim(coalesce(p.hosting,''))<>'' AS has_hosting,
  CASE WHEN json_valid(p.content_sources_json) THEN json_array_length(p.content_sources_json)>0 ELSE 0 END AS has_content_sources,
  CASE WHEN json_valid(w.session_json) THEN
    CASE WHEN json_extract(w.session_json,'$.version')=1 THEN json_extract(w.session_json,'$.deferred') ELSE NULL END
    ELSE NULL END AS deferred_json
  FROM site_projects p LEFT JOIN copilot_working_drafts w ON w.project_id=p.id AND w.user_id=p.user_id
  WHERE p.id=? AND p.user_id=? LIMIT 1`;
const ADMISSION_SQL = `SELECT p.id AS project_id,p.revision,g.id AS grant_id,g.user_id AS subject,
  g.client_id,g.resource,g.scopes_json,g.expires_at,g.revoked_at
  FROM site_projects p JOIN delegated_access_grants g ON g.project_id=p.id AND g.user_id=p.user_id
  WHERE p.id=? AND p.user_id=? AND g.id=? AND g.client_id=? AND g.resource=? LIMIT 1`;
const OBSERVATIONS_SQL = `SELECT id,project_id,user_id,target_origin,readiness_json,checked_at
  FROM scan_observations WHERE project_id=? AND user_id=? AND target_origin=?
  ORDER BY checked_at DESC,id DESC LIMIT 5`;
function list(value) {
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string').slice(0, 20) : []; }
  catch { return []; }
}

/** Compile the actual read queries without selecting owner rows or mutating data. */
export function delegatedSchemaPreflightSql() {
  return [PROJECT_SQL,OBSERVATIONS_SQL,ADMISSION_SQL].map(sql=>
    `SELECT * FROM (${sql.replaceAll('?',"''")}) LIMIT 0;`).join('\n')+'\n'+delegatedAuthorizationSchemaPreflightSql();
}

/** Grant store must be authoritative and uncached, supplied by the OAuth adapter. */
export function createDelegatedProjectRepository({ db, grantStore } = {}) {
  if (typeof grantStore?.getGrant !== 'function') throw new Error('Authoritative grant store required');
  return {
    getGrant: id => grantStore.getGrant(id),
    async listConsentProjects(subject) {
      const result=await db.prepare('SELECT id,organization FROM site_projects WHERE user_id=? ORDER BY updated_at DESC,id DESC LIMIT 21').bind(subject).all();
      return (result.results??[]).map(row=>({id:row.id,organization:row.organization}));
    },
    async getOwnedProject(projectId, subject) {
      const row = await db.prepare(PROJECT_SQL).bind(projectId, subject).first();
      if (!row) return null;
      return {
        id: row.id, userId: row.user_id, organization: row.organization, website: row.website,
        status: row.status, completion: row.completion, revision: row.revision, updatedAt: row.updated_at,
        guidance:{deferred:[...new Set(list(row.deferred_json).filter(field=>guidanceFields.has(field)))],
          hasCms:row.has_cms===1,hasHosting:row.has_hosting===1,hasContentSources:row.has_content_sources===1},
        intake: { organization: row.organization, website: row.website, role: row.role,
          siteType: row.site_type, control: row.control, audience: row.audience,
          goals: list(row.goals_json), languages: list(row.languages_json) },
      };
    },
    // A single primary read binds the grant and current project owner/revision.
    async getProjectReadAdmission({ projectId, subject, grantId, clientId, resource }) {
      const row = await db.prepare(ADMISSION_SQL).bind(projectId, subject, grantId, clientId, resource).first();
      if (!row) return null;
      let scopes = [];
      try {
        const parsed = JSON.parse(row.scopes_json);
        if (Array.isArray(parsed) && parsed.every(value => typeof value === 'string')) scopes = parsed;
      } catch { /* Invalid stored scope is never authority. */ }
      return { projectId: row.project_id, revision: row.revision, grantId: row.grant_id, subject: row.subject,
        clientId: row.client_id, resource: row.resource, scopes, expiresAt: row.expires_at, revokedAt: row.revoked_at };
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
