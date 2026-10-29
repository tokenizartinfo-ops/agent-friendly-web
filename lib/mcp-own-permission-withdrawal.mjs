import {recordDossierMonitoringConsent} from './dossier-monitoring-authority.mjs';

const purpose = 'afw.dossier-monitoring.v1';
const unavailable = () => { throw Error('Private withdrawal unavailable'); };
const time = value => Number.isSafeInteger(value) && value >= 0 && value <= 8640000000000000;
const id = value => typeof value === 'string' && value.length > 0 && value.length <= 200 && value.trim() === value;
const sqlNow = "CAST(unixepoch('subsec')*1000 AS INTEGER)";
function exact(value, keys) {
 if (!value || Object.getPrototypeOf(value) !== Object.prototype) unavailable();
 const descriptors = Object.getOwnPropertyDescriptors(value), own = Reflect.ownKeys(descriptors);
 if (own.length !== keys.length || own.some(key => typeof key !== 'string' || !keys.includes(key) ||
  !Object.hasOwn(descriptors[key], 'value') || !descriptors[key].enumerable)) unavailable();
 return Object.freeze(Object.fromEntries(keys.map(key => [key, descriptors[key].value])));
}
function receipt(monitoringWithdrawn = false, readWithdrawn = false, runtimeStopRequested = false) {
 return Object.freeze({purpose: 'afw.own-permission-withdrawal.v1', monitoringWithdrawn, readWithdrawn,
  permissionsWithdrawn: monitoringWithdrawn && readWithdrawn, runtimeStopRequested,
  physicalStopVerified: false, nativeWithdrawalVerified: false, operationalReadiness: false});
}

/** INTERNAL, unmounted reduction only. The trusted host pins the original owner,
 * consent, primary DB and historical close callback. Native unsubscribe must be
 * attempted separately before revoking read permission. This is also usable for
 * reduction when that unsubscribe is unknown; it never certifies native removal.
 * No public caller may construct these options, choose a target or renew access.
 */
export function createOwnPermissionWithdrawal(options) {
 const o = exact(options, ['enabled', 'db', 'context', 'originalConsent', 'window', 'requestId', 'close', 'now']);
 const context = exact(o.context, ['grantId', 'subject', 'projectId', 'clientId', 'resource']);
 const consent = exact(o.originalConsent, ['sequence', 'revision', 'issuedAt', 'expiresAt']);
 const window = exact(o.window, ['startAt', 'expiresAt']);
 if (o.enabled !== true || typeof o.db?.prepare !== 'function' || typeof o.close !== 'function' ||
  typeof o.now !== 'function' || !Object.values(context).every(id) ||
  !Number.isSafeInteger(consent.sequence) || consent.sequence < 1 ||
  !Number.isSafeInteger(consent.revision) || consent.revision < 1 ||
  !time(consent.issuedAt) || !time(consent.expiresAt) || consent.expiresAt <= consent.issuedAt ||
  consent.expiresAt - consent.issuedAt > 600000 ||
  !time(window.startAt) || !time(window.expiresAt) || window.expiresAt <= window.startAt ||
  window.expiresAt - window.startAt > 600000 || typeof o.requestId !== 'string' ||
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(o.requestId)) unavailable();

 let last = -1;
 const clock = () => {
  const now = o.now();
  if (!time(now) || now < last) unavailable();
  last = now;
  if (now < window.startAt || now >= window.expiresAt) unavailable();
  return now;
 };
 // D1 has no cancellation guarantee. Bound waiting and fence every continuation;
 // SQL deadlines separately prevent a queued write from committing after its stage.
 const bounded = async operation => {
  const entered = clock(), expiresAt = Math.min(window.expiresAt, entered + 5000);
  const endMono = performance.now() + (expiresAt - entered);
  let finished = false, timer;
  const current = () => {
   if (finished || clock() >= expiresAt || performance.now() >= endMono) unavailable();
  };
  current.expiresAt = expiresAt;
  try {
   const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => { finished = true; reject(Error('Private withdrawal unavailable')); }, expiresAt - entered);
   });
   const work = Promise.resolve().then(() => { current(); return operation(current); });
   const value = await Promise.race([work, deadline]); current(); return value;
  } finally { finished = true; clearTimeout(timer); }
 };
 const scopedDb = current => {
  const wrap = database => ({
   prepare(sql) {
    current(); const prepared = database.prepare(sql);
    return {bind(...args) {
     current(); const statement = prepared.bind(...args);
     const invoke = async method => { current(); const result = await statement[method](); current(); return result; };
     return {first: () => invoke('first'), run: () => invoke('run')};
    }};
   }
  });
  return {...wrap(o.db), withSession(mode) {
   current(); if (mode !== 'first-primary') unavailable();
   return wrap(o.db.withSession ? o.db.withSession(mode) : o.db);
  }};
 };
 const primary = () => o.db.withSession ? o.db.withSession('first-primary') : o.db;
 const pins = [context.grantId, context.subject, context.projectId, context.clientId, context.resource,
  consent.sequence, consent.revision, consent.issuedAt, consent.expiresAt];
 const matches = `g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=?
  AND c.sequence=? AND c.revision=? AND c.issued_at=? AND c.expires_at=? AND c.action='grant'
  AND c.purpose='${purpose}'`;
 const original = `c.grant_id=g.id AND c.project_id=g.project_id AND c.user_id=g.user_id
  AND c.client_id=g.client_id AND c.resource=g.resource`;
 const query = `SELECT g.revoked_at,l.sequence,l.action,l.issued_at,l.expires_at,l.revision,
  l.project_id,l.user_id,l.client_id,l.resource,l.purpose,${sqlNow} AS database_now
  FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
  JOIN dossier_monitoring_consent_events c ON ${original}
  JOIN dossier_monitoring_consent_events l ON l.grant_id=g.id
   AND l.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
  WHERE ${matches}`;
 const read = () => bounded(async current => {
  current();
  const row = await primary().prepare(query).bind(...pins).first(); current(); const now = clock();
  if (!row || !time(row.database_now) || row.database_now < window.startAt || row.database_now >= window.expiresAt ||
   consent.issuedAt > now || row.project_id !== context.projectId || row.user_id !== context.subject ||
   row.client_id !== context.clientId || row.resource !== context.resource || row.purpose !== purpose) unavailable();
  if (row.action === 'grant') {
   if (row.sequence !== consent.sequence || row.revision !== consent.revision ||
    row.issued_at !== consent.issuedAt || row.expires_at !== consent.expiresAt) unavailable();
  } else if (row.action !== 'revoke' || row.sequence <= consent.sequence ||
   !time(row.issued_at) || row.issued_at < consent.issuedAt || row.issued_at > now || row.expires_at !== row.issued_at) unavailable();
  if (row.revoked_at !== '') {
   const at = Date.parse(row.revoked_at);
   if (typeof row.revoked_at !== 'string' || !time(at) || new Date(at).toISOString() !== row.revoked_at ||
    at < consent.issuedAt || at > now) unavailable();
  }
  return row;
 });
 const closeOriginal = async () => {
  await read();
  const controller = new AbortController();
  try {
   return await bounded(async current => {
    current();
    const answer = exact(await o.close(controller.signal), ['closed', 'runtimeStopRequested']);
    current();
    if (controller.signal.aborted || answer.closed !== true || answer.runtimeStopRequested !== true) unavailable();
    return true;
   });
  } finally { controller.abort(); }
 };

 return Object.freeze({async withdraw(...args) {
  if (args.length) return receipt();
  let row;
  try { row = await read(); } catch { return receipt(); }
  if (row.action !== 'revoke') {
   // The existing writer owns append-only audit/CAS/idempotency. Its status alone
   // is never a receipt here: primary reconciliation handles a lost write ACK.
   try {
    await bounded(async current => recordDossierMonitoringConsent({
     db: scopedDb(current), subject: context.subject, grantId: context.grantId, projectId: context.projectId,
     expectedRevision: consent.revision, expectedSequence: consent.sequence, requestId: o.requestId,
     action: 'revoke', now: clock(), commitWindow: {startAt: window.startAt, expiresAt: current.expiresAt},
     expectedClientId: context.clientId, expectedResource: context.resource,
     beforeCommit: async () => { current(); await read(); current(); return true; }
    }));
   } catch { /* Continue independent reduction, without restoring permissions. */ }
  }
  try {
   row = await read();
   if (row.revoked_at === '') {
    await bounded(async current => {
    current(); const at = new Date(clock()).toISOString();
    await primary().prepare(`UPDATE delegated_access_grants AS g SET revoked_at=?
     WHERE g.revoked_at='' AND EXISTS(SELECT 1 FROM site_projects p
      JOIN dossier_monitoring_consent_events c ON ${original}
      WHERE p.id=g.project_id AND p.user_id=g.user_id AND ${matches})
      AND ${sqlNow}>=? AND ${sqlNow}<?`)
     .bind(at, ...pins, window.startAt, current.expiresAt).run();
    current();
    });
   }
  } catch { /* An unknown ACK needs primary evidence, never an assumed write. */ }
  let stopped = false;
  try { stopped = await closeOriginal(); } catch { /* Stop requested is independent of permission reduction. */ }
  try {
   const first = await read(), second = await read();
   const stable = value => { const {database_now, ...fields} = value; void database_now; return JSON.stringify(fields); };
   if (stable(first) !== stable(second)) return receipt(false, false, stopped);
   return receipt(second.action === 'revoke', second.revoked_at !== '', stopped);
  } catch { return receipt(false, false, stopped); }
 }});
}
