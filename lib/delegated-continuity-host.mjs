const pinNames = ['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_CONTINUITY_ENABLED',
  'AFW_OAUTH_SERVICE_MODE','AFW_OAUTH_PILOT_EXPIRES_AT','AFW_OAUTH_PILOT_PROJECT_ID',
  'AFW_OAUTH_PILOT_CLIENT_ID','ACCESS_TEAM_DOMAIN','ACCESS_AUD','DB','OAUTH_KV','DELEGATED_RATE_LIMITER'];
const identifier = value => typeof value === 'string' && value.length > 0 && value.length <= 200 && value.trim() === value;

/** Server-owned opt-in for one finite OAuth host. Never constructed from tool input. */
export function createDelegatedContinuityHost({ env, context, projectId, now }) {
  if (env.AFW_DELEGATED_CONTINUITY_ENABLED !== 'true') return null;
  const pins = Object.fromEntries(pinNames.map(name => [name, env[name]]));
  const started = Date.parse(now()), deadline = Date.parse(pins.AFW_OAUTH_PILOT_EXPIRES_AT);
  const db = pins.DB, limiter = pins.DELEGATED_RATE_LIMITER;
  if (pins.AFW_DELEGATED_OAUTH_ENABLED !== 'true' || pins.AFW_OAUTH_SERVICE_MODE !== 'window' ||
      !Number.isFinite(started) || !Number.isFinite(deadline) || deadline <= started || deadline - started > 600000 ||
      new Date(deadline).toISOString() !== pins.AFW_OAUTH_PILOT_EXPIRES_AT ||
      !identifier(pins.AFW_OAUTH_PILOT_PROJECT_ID) || pins.AFW_OAUTH_PILOT_PROJECT_ID !== projectId ||
      !identifier(pins.AFW_OAUTH_PILOT_CLIENT_ID) || pins.AFW_OAUTH_PILOT_CLIENT_ID !== context.clientId ||
      typeof db?.prepare !== 'function' || typeof db.withSession !== 'function' || !pins.OAUTH_KV ||
      typeof limiter?.limit !== 'function') throw new Error('Continuity host unavailable');
  const prepare = db.prepare, withSession = db.withSession, limit = limiter.limit;
  const checkedNow = () => {
    const value = now(), time = Date.parse(value);
    if (!Number.isFinite(time) || time < started || time >= deadline ||
        !pinNames.every(name => env[name] === pins[name]) ||
        db.prepare !== prepare || db.withSession !== withSession || limiter.limit !== limit)
      throw new Error('Continuity host unavailable');
    return value;
  };
  return Object.freeze({
    until: deadline,
    now: checkedNow,
    // first-primary applies only to this session's FIRST query. Do not reuse
    // the session used to read the initial grant and project.
    createPrimarySession() { checkedNow(); return withSession.call(db, 'first-primary'); },
  });
}
