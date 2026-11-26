import { readBoundedJsonBody } from './bounded-json-body.mjs';

const CONDITION_REVIEW_FIELDS = ['terms', 'privacy', 'product', 'whitePaper', 'accessibility'];
const statuses = new Set(['pending', 'reviewed', 'needs_changes', 'not_applicable']);
const requestFields = ['requestId', 'expectedRevision', 'previousId', 'review'];
const eventType = 'dossier_conditions_saved';
const checkpointId = /^conditions-[a-f0-9]{64}$/;
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const latest = 'SELECT id FROM project_events WHERE project_id = site_projects.id AND user_id = site_projects.user_id AND type = ? ORDER BY rowid DESC LIMIT 1';

const reply = (status, body) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
const hasFields = (value, fields) => value && Object.getPrototypeOf(value) === Object.prototype
  && Object.keys(value).length === fields.length && fields.every(key => Object.hasOwn(value, key));

function normalize(raw) {
  if (!hasFields(raw, requestFields) || !hasFields(raw.review, CONDITION_REVIEW_FIELDS)
    || typeof raw.requestId !== 'string' || !uuid.test(raw.requestId)
    || !Number.isSafeInteger(raw.expectedRevision) || raw.expectedRevision < 1
    || (raw.previousId !== null && (typeof raw.previousId !== 'string' || !checkpointId.test(raw.previousId)))
    || raw.review.accessibility === 'not_applicable'
    || CONDITION_REVIEW_FIELDS.some(key => !statuses.has(raw.review[key]))) return null;
  const review = Object.fromEntries(CONDITION_REVIEW_FIELDS.map(key => [key, raw.review[key]]));
  return { requestId: raw.requestId, expectedRevision: raw.expectedRevision, previousId: raw.previousId, review };
}

async function read(db, userId, projectId) {
  const row = await db.prepare(`
    SELECT site_projects.revision AS project_revision, event.id, event.payload_json, event.created_at
    FROM site_projects LEFT JOIN project_events AS event ON event.id = (${latest})
    WHERE site_projects.id = ? AND site_projects.user_id = ?
  `).bind(eventType, projectId, userId).first();
  if (!row) return null;
  if (!row.id) return { projectRevision: row.project_revision, checkpoint: null };
  const saved = normalize(JSON.parse(row.payload_json));
  if (!saved || !checkpointId.test(row.id)) throw Error('Invalid conditions review');
  return { projectRevision: row.project_revision, checkpoint: {
    id: row.id, revision: saved.expectedRevision, recordedAt: row.created_at, review: saved.review,
  } };
}

async function save(db, userId, projectId, draft) {
  const bytes = new TextEncoder().encode(JSON.stringify([eventType, userId, projectId, draft.requestId]));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const id = 'conditions-' + Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
  const payload = JSON.stringify(draft);
  await db.prepare(`
    INSERT INTO project_events (id, project_id, user_id, type, payload_json, created_at)
    SELECT ?, ?, ?, ?, ?, ? FROM site_projects
    WHERE id = ? AND user_id = ? AND revision = ? AND (${latest}) IS ?
    ON CONFLICT(id) DO NOTHING
  `).bind(id, projectId, userId, eventType, payload, new Date().toISOString(),
    projectId, userId, draft.expectedRevision, eventType, draft.previousId).run();
  const event = await db.prepare('SELECT payload_json FROM project_events WHERE id = ? AND project_id = ? AND user_id = ? AND type = ?')
    .bind(id, projectId, userId, eventType).first();
  const view = await read(db, userId, projectId);
  if (!view) return reply(404, { code: 'project_unavailable' });
  if (event?.payload_json !== payload || view.checkpoint?.id !== id || view.projectRevision !== draft.expectedRevision) {
    return reply(409, { code: 'conditions_changed' });
  }
  return reply(200, view);
}

export function createDossierConditionsHandler({ db, getIdentity, limiter }) {
  return async (request, projectId) => {
    try {
      const user = await getIdentity();
      if (!user) return reply(401, { code: 'authentication_required' });
      const primary = db.withSession ? db.withSession('first-primary') : db;
      if (request.method === 'GET') {
        const view = await read(primary, user.userId, projectId);
        return view ? reply(200, view) : reply(404, { code: 'project_unavailable' });
      }
      if (request.method !== 'POST') return reply(405, { code: 'method_not_allowed' });
      if (request.headers.get('origin') !== new URL(request.url).origin) return reply(403, { code: 'invalid_origin' });
      if (!await primary.prepare('SELECT revision FROM site_projects WHERE id = ? AND user_id = ?').bind(projectId, user.userId).first()) {
        return reply(404, { code: 'project_unavailable' });
      }
      const body = await readBoundedJsonBody(request, { maxBytes: 2048 });
      if (!body.ok) return reply(body.status, { code: body.code });
      const draft = normalize(body.value);
      if (!draft) return reply(400, { code: 'invalid_conditions' });
      if (typeof limiter?.limit !== 'function') return reply(503, { code: 'conditions_unavailable' });
      if (!(await limiter.limit({ key: 'conditions:' + user.userId })).success) return reply(429, { code: 'try_later' });
      return await save(primary, user.userId, projectId, draft);
    } catch {
      return reply(503, { code: 'conditions_unavailable' });
    }
  };
}
