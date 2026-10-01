/** Internal AFW health metadata only. No user text or arbitrary destinations. */
export const OPERATIONS_CHECKS = Object.freeze(['public_home', 'public_discovery', 'private_boundary']);
const FIELDS = ['eventId', 'check', 'resource', 'version', 'observedAt', 'result'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const MAX_INVESTIGATIONS = 3;
export const INVESTIGATION_LEASE_MS = 300000;

export function validateSignal(input, now = Date.now()) {
  if (!Number.isFinite(now) || !input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length !== FIELDS.length || FIELDS.some(key => typeof input[key] !== 'string') || Object.keys(input).some(key => !FIELDS.includes(key))) throw new Error('invalid signal');
  const time = Date.parse(input.observedAt);
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(input.eventId) || !OPERATIONS_CHECKS.includes(input.check) || input.resource !== 'afw_public_web' || !UUID.test(input.version) || !['failed', 'recovered'].includes(input.result) || !Number.isFinite(time) || time < now - 86400000 || time > now + 300000 || new Date(time).toISOString() !== input.observedAt) throw new Error('invalid signal');
  return Object.fromEntries(FIELDS.map(key => [key, input[key]]));
}

async function fingerprintFor(signal) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify([signal.resource, signal.check, signal.version])));
  return Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
}

export async function recordSignal(db, input, now = Date.now()) {
  const signal = validateSignal(input, now), payload = JSON.stringify(signal);
  const fingerprint = await fingerprintFor(signal), time = Date.parse(signal.observedAt);
  const event = db.prepare(`INSERT INTO operations_events(event_id,payload,fingerprint,observed_at,result,received_at)
    VALUES (?,?,?,?,?,?) ON CONFLICT(event_id) DO NOTHING`).bind(signal.eventId, payload, fingerprint, time, signal.result, now);
  const eligible = `EXISTS(SELECT 1 FROM operations_events WHERE event_id=? AND payload=? AND processed=0)`;
  const update = signal.result === 'failed'
    ? db.prepare(`INSERT INTO operations_incidents(fingerprint,resource,check_id,version,state,phase,observed_at,updated_at)
      SELECT ?,?,?,?,'failed','pending',?,? WHERE ${eligible}
      AND NOT EXISTS(SELECT 1 FROM operations_events WHERE fingerprint=? AND observed_at>? AND result='recovered')
      ON CONFLICT(fingerprint) DO UPDATE SET failures=failures+1,
      state=CASE WHEN excluded.observed_at>=observed_at THEN 'failed' ELSE state END,
      phase=CASE WHEN excluded.observed_at>=observed_at AND phase IN ('closed','review') THEN 'pending' ELSE phase END,
      observed_at=MAX(observed_at,excluded.observed_at),updated_at=excluded.updated_at`)
      .bind(fingerprint, signal.resource, signal.check, signal.version, time, now, signal.eventId, payload, fingerprint, time)
    : db.prepare(`UPDATE operations_incidents SET state='recovered',phase='closed',observed_at=?,updated_at=?,lease_token=NULL,lease_until=NULL
      WHERE fingerprint=? AND observed_at<? AND ${eligible}`).bind(time, now, fingerprint, time, signal.eventId, payload);
  const processed = db.prepare('UPDATE operations_events SET processed=1 WHERE event_id=? AND payload=? AND processed=0').bind(signal.eventId, payload);
  const result = await db.batch([event, update, processed]);
  const receipt = await db.prepare('SELECT payload FROM operations_events WHERE event_id=?').bind(signal.eventId).first();
  if (!receipt || receipt.payload !== payload) throw new Error('event collision');
  return { accepted: true, duplicate: result[0].meta.changes === 0, fingerprint };
}

/** No external effects: a lease is permission to prepare a bounded investigation. */
export async function claimIncident(db, fingerprint, now = Date.now()) {
  return db.prepare(`UPDATE operations_incidents SET phase='investigating',lease_token=?,lease_until=?,lease_observed_at=observed_at,attempts=attempts+1,updated_at=?
    WHERE fingerprint=? AND state='failed' AND attempts<? AND (phase='pending' OR (phase='investigating' AND lease_until<=?))
    RETURNING fingerprint,resource,check_id,version,lease_token,lease_until,attempts`)
    .bind(crypto.randomUUID(), now + INVESTIGATION_LEASE_MS, now, fingerprint, MAX_INVESTIGATIONS, now).first();
}

export async function finishInvestigation(db, fingerprint, lease, now = Date.now()) {
  const result = await db.prepare(`UPDATE operations_incidents SET phase=CASE WHEN observed_at=lease_observed_at THEN 'review' ELSE 'pending' END,
    lease_token=NULL,lease_until=NULL,lease_observed_at=NULL,updated_at=?
    WHERE fingerprint=? AND state='failed' AND phase='investigating' AND lease_token=? AND lease_until>? RETURNING phase`)
    .bind(now, fingerprint, lease, now).first();
  return result?.phase === 'review';
}
