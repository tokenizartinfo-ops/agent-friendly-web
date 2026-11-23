import { containsProbableSecret } from './contact-intake.mjs';
import { readBoundedJsonBody } from './bounded-json-body.mjs';

const EVENT = 'dossier_continuation_saved';
const levels = new Set(['AF-3', 'AF-4', 'AF-5']);
const credentialText = /\bbearer\s+[a-z0-9._~+/=-]{6,}|\b(?:authorization|cookie|set-cookie|x-auth-token)\s*:\s*\S+/i;
const privateLink = /https?:\/\/[^/\s@]+@|[?&](?:x-amz-signature|access_token|token|code|sig|signature)=/i;
const roles = new Set(['afw', 'owner', 'maintainer', 'provider']);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const checkpointId = /^continuation-[0-9a-f]{64}$/;
const fields = ['requestId', 'expectedRevision', 'previousId', 'kind', 'level', 'progress', 'pending', 'nextStep', 'responsible', 'approvedVersion'];

const latestEvent = "SELECT id FROM project_events WHERE project_id = site_projects.id AND user_id = site_projects.user_id AND type = ? ORDER BY rowid DESC LIMIT 1";
const ownerProject = 'SELECT revision FROM site_projects WHERE id = ? AND user_id = ?';

function normalize(raw) {
  if (Object.keys(raw).length !== fields.length || fields.some(key => !Object.hasOwn(raw, key))) return null;
  if (typeof raw.requestId !== 'string' || !uuid.test(raw.requestId)
    || !Number.isSafeInteger(raw.expectedRevision) || raw.expectedRevision < 1
    || !(raw.previousId === null || (typeof raw.previousId === 'string' && checkpointId.test(raw.previousId)))) return null;
  if (!((raw.kind === 'advanced' && levels.has(raw.level)) || (raw.kind === 'new_site' && raw.level === null))
    || !roles.has(raw.responsible)) return null;

  for (const key of ['progress', 'pending', 'nextStep', 'approvedVersion']) {
    const limit = key === 'approvedVersion' ? 120 : 360;
    if (typeof raw[key] !== 'string' || raw[key].length > limit || containsProbableSecret(raw[key]) || credentialText.test(raw[key]) || privateLink.test(raw[key])) return null;
  }
  if (!raw.pending.trim() || !raw.nextStep.trim()) return null;
  return {
    requestId: raw.requestId, expectedRevision: raw.expectedRevision, previousId: raw.previousId,
    kind: raw.kind, level: raw.level, progress: raw.progress.trim(), pending: raw.pending.trim(),
    nextStep: raw.nextStep.trim(), responsible: raw.responsible, approvedVersion: raw.approvedVersion.trim(),
  };
}

function reply(status, payload) {
  return Response.json(payload, { status, headers: { 'cache-control': 'no-store' } });
}

async function read(db, userId, projectId) {
  const row = await db.prepare(`
    SELECT site_projects.revision AS project_revision, event.id, event.payload_json, event.created_at
    FROM site_projects LEFT JOIN project_events AS event ON event.id = (${latestEvent})
    WHERE site_projects.id = ? AND site_projects.user_id = ?
  `).bind(EVENT, projectId, userId).first();
  if (!row) return null;
  const view = { projectRevision: row.project_revision, checkpoint: null };
  if (row.id) {
    const saved = normalize(JSON.parse(row.payload_json));
    if (!saved || !checkpointId.test(row.id)) throw new Error('Invalid continuation receipt');
    const { kind, level, progress, pending, nextStep, responsible, approvedVersion } = saved;
    view.checkpoint = {
      id: row.id, revision: saved.expectedRevision, recordedAt: row.created_at,
      kind, level, progress, pending, nextStep, responsible, approvedVersion,
    };
  }
  return view;
}

async function save(db, userId, projectId, draft) {
  const bytes = new TextEncoder().encode(JSON.stringify([EVENT, userId, projectId, draft.requestId]));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const id = 'continuation-' + Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
  const payload = JSON.stringify(draft);

  // A retry can recover the same record. A new request must match both the
  // dossier revision and the last checkpoint, even when they change independently.
  await db.prepare(`
    INSERT INTO project_events (id, project_id, user_id, type, payload_json, created_at)
    SELECT ?, ?, ?, ?, ?, ? FROM site_projects
    WHERE id = ? AND user_id = ? AND revision = ? AND (${latestEvent}) IS ?
    ON CONFLICT(id) DO NOTHING
  `).bind(id, projectId, userId, EVENT, payload, new Date().toISOString(),
    projectId, userId, draft.expectedRevision, EVENT, draft.previousId).run();

  const event = await db.prepare('SELECT payload_json FROM project_events WHERE id = ? AND project_id = ? AND user_id = ? AND type = ?')
    .bind(id, projectId, userId, EVENT).first();
  if (event && event.payload_json !== payload) return reply(409, { code: 'idempotency_conflict' });
  const view = await read(db, userId, projectId);
  if (!view) return reply(404, { code: 'project_unavailable' });
  if (!event || view.checkpoint?.id !== id || view.projectRevision !== draft.expectedRevision) {
    return reply(409, { code: 'continuation_changed' });
  }
  return reply(200, view);
}

export function createContinuationHandler({ db, getIdentity, limiter }) {
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
      if (!await primary.prepare(ownerProject).bind(projectId, user.userId).first()) {
        return reply(404, { code: 'project_unavailable' });
      }
      const body = await readBoundedJsonBody(request, { maxBytes: 6144 });
      if (!body.ok) return reply(body.status, { code: body.code });
      const draft = normalize(body.value);
      if (!draft) return reply(400, { code: 'invalid_continuation' });
      if (typeof limiter?.limit !== 'function') return reply(503, { code: 'continuation_unavailable' });
      if (!(await limiter.limit({ key: 'continuation:' + user.userId })).success) return reply(429, { code: 'try_later' });
      return await save(primary, user.userId, projectId, draft);
    } catch {
      return reply(503, { code: 'continuation_unavailable' });
    }
  };
}
