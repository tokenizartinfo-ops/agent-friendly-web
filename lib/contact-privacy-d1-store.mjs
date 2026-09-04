import {
  CONTACT_PRIVACY_POLICY_VERSION,
  validatePrivacyRequestMetadata,
} from './contact-privacy-policy.mjs';

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const ACTIONS = new Set(['granted', 'withdrawn', 'superseded']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const METADATA_ID = /^[a-z0-9][a-z0-9.-]{0,119}$/;
const ISO_WITH_TIMEZONE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-](\d{2}):(\d{2}))$/;
const CONSENT_FIELDS = new Set([
  'leadId',
  'purpose',
  'action',
  'copyVersion',
  'actorRefHash',
  'idempotencyKey',
]);
const PRIVACY_REQUEST_FIELDS = new Set([
  'requestType',
  'contactRefHash',
  'verificationHash',
  'verificationExpiresAt',
  'expiresAt',
  'policyVersion',
  'idempotencyKey',
]);
const OVERRIDE_FIELDS = new Set(['now', 'randomUUID']);
const STORED_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/;

function invalidInput() {
  return new Error('privacy_store_invalid_input');
}

function storeFailed() {
  return new Error('privacy_store_failed');
}

function isPlainRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function exactDataRecord(input, fields, requireEveryField = true) {
  try {
    if (!isPlainRecord(input)) return null;
    const keys = Reflect.ownKeys(input);
    if (
      keys.some((key) => typeof key !== 'string' || !fields.has(key))
      || (requireEveryField && keys.length !== fields.size)
    ) return null;

    const descriptors = Object.getOwnPropertyDescriptors(input);
    const value = Object.create(null);
    for (const key of keys) {
      const descriptor = descriptors[key];
      if (!descriptor || !Object.hasOwn(descriptor, 'value')) return null;
      value[key] = descriptor.value;
    }
    if (requireEveryField && [...fields].some((key) => !Object.hasOwn(value, key))) return null;
    return value;
  } catch {
    return null;
  }
}

function normalizeIsoTimestamp(value) {
  if (typeof value !== 'string' || value.length > 40) return '';
  const match = ISO_WITH_TIMEZONE.exec(value);
  if (!match) return '';

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[9] === undefined ? 0 : Number(match[9]);
  const offsetMinute = match[10] === undefined ? 0 : Number(match[10]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    month < 1 || month > 12
    || day < 1 || day > daysInMonth[month - 1]
    || hour > 23 || minute > 59 || second > 59
    || offsetHour > 14 || offsetMinute > 59
    || (offsetHour === 14 && offsetMinute !== 0)
  ) return '';

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function validateConsentInput(input) {
  const value = exactDataRecord(input, CONSENT_FIELDS);
  if (!value) return null;
  if (
    typeof value.leadId !== 'string'
    || typeof value.purpose !== 'string'
    || typeof value.action !== 'string'
    || typeof value.copyVersion !== 'string'
    || typeof value.actorRefHash !== 'string'
    || typeof value.idempotencyKey !== 'string'
    || !UUID.test(value.leadId)
    || !PURPOSES.has(value.purpose)
    || !ACTIONS.has(value.action)
    || !METADATA_ID.test(value.copyVersion)
    || !HASH.test(value.actorRefHash)
    || !UUID.test(value.idempotencyKey)
  ) return null;
  return value;
}

function validatePrivacyInput(input) {
  if (!exactDataRecord(input, PRIVACY_REQUEST_FIELDS)) return null;
  try {
    const validation = validatePrivacyRequestMetadata(input);
    return validation.ok ? validation.value : null;
  } catch {
    return null;
  }
}

async function sha256(value) {
  if (typeof value !== 'string') throw invalidInput();
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(
    new Uint8Array(digest),
    (byte) => byte.toString(16).padStart(2, '0'),
  ).join('');
}

function isD1(database) {
  try {
    return Boolean(
      database
      && typeof database.prepare === 'function'
      && typeof database.batch === 'function',
    );
  } catch {
    return false;
  }
}

function uniqueRace(error, table) {
  return error instanceof Error
    && typeof error.message === 'string'
    && error.message.includes(`${table}.idempotency_key`);
}

function generatedMetadata(overrides) {
  const value = exactDataRecord(overrides, OVERRIDE_FIELDS, false);
  if (!value) throw invalidInput();
  if (
    (Object.hasOwn(value, 'now') && typeof value.now !== 'function')
    || (Object.hasOwn(value, 'randomUUID') && typeof value.randomUUID !== 'function')
  ) throw invalidInput();

  try {
    const now = normalizeIsoTimestamp(
      Object.hasOwn(value, 'now') ? value.now() : new Date().toISOString(),
    );
    const id = Object.hasOwn(value, 'randomUUID')
      ? value.randomUUID()
      : globalThis.crypto.randomUUID();
    if (typeof id !== 'string' || !UUID.test(id) || !now) throw invalidInput();
    return { id, now };
  } catch {
    throw invalidInput();
  }
}

function classifyExisting(existing, requestHash) {
  if (
    !isPlainRecord(existing)
    || typeof existing.id !== 'string'
    || !STORED_ID.test(existing.id)
    || typeof existing.requestHash !== 'string'
    || !HASH.test(existing.requestHash)
  ) throw storeFailed();
  return existing.requestHash === requestHash
    ? { id: existing.id, persisted: true, duplicate: true, conflict: false }
    : { id: existing.id, persisted: false, duplicate: false, conflict: true };
}

async function findByIdempotencyKey(database, table, idempotencyKey) {
  try {
    return await database
      .prepare(`SELECT id, request_hash AS requestHash FROM ${table} WHERE idempotency_key = ? LIMIT 1`)
      .bind(idempotencyKey)
      .first();
  } catch {
    throw storeFailed();
  }
}

function prepareStatement(database, sql, bindings) {
  try {
    return database.prepare(sql).bind(...bindings);
  } catch {
    throw storeFailed();
  }
}

async function persistOne(database, statement, table, idempotencyKey, requestHash) {
  try {
    const results = await database.batch([statement]);
    if (!Array.isArray(results) || results.length !== 1 || results[0]?.success === false) {
      throw storeFailed();
    }
  } catch (error) {
    if (!uniqueRace(error, table)) throw storeFailed();
    const winner = await findByIdempotencyKey(database, table, idempotencyKey);
    if (!winner) throw storeFailed();
    return classifyExisting(winner, requestHash);
  }
  return null;
}

export async function canonicalConsentLifecycleHash(input) {
  const value = validateConsentInput(input);
  if (!value) throw invalidInput();
  return sha256(JSON.stringify([
    value.leadId,
    value.purpose,
    value.action,
    value.copyVersion,
    value.actorRefHash,
    value.idempotencyKey,
  ]));
}

export async function recordConsentLifecycleEventToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_store_unavailable');
  const value = validateConsentInput(input);
  if (!value) throw invalidInput();

  const requestHash = await canonicalConsentLifecycleHash(value);
  const existing = await findByIdempotencyKey(
    database,
    'contact_consent_events',
    value.idempotencyKey,
  );
  if (existing) return classifyExisting(existing, requestHash);

  const { id, now } = generatedMetadata(overrides);
  const evidenceHash = await sha256([
    value.leadId,
    value.purpose,
    value.action,
    value.copyVersion,
    now,
  ].join('|'));
  const statement = prepareStatement(
    database,
    `INSERT INTO contact_consent_events (
      id, lead_id, purpose, copy_version, action, evidence_hash,
      actor_ref_hash, idempotency_key, request_hash, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      value.leadId,
      value.purpose,
      value.copyVersion,
      value.action,
      evidenceHash,
      value.actorRefHash,
      value.idempotencyKey,
      requestHash,
      now,
    ],
  );
  const raceResult = await persistOne(
    database,
    statement,
    'contact_consent_events',
    value.idempotencyKey,
    requestHash,
  );
  return raceResult || { id, persisted: true, duplicate: false, conflict: false };
}

export async function canonicalPrivacyRequestHash(input) {
  const value = validatePrivacyInput(input);
  if (!value) throw invalidInput();
  return sha256(JSON.stringify([
    value.requestType,
    value.contactRefHash,
    value.verificationHash,
    value.verificationExpiresAt,
    value.expiresAt,
    value.policyVersion,
    value.idempotencyKey,
  ]));
}

export async function createPrivacyRequestToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_store_unavailable');
  const value = validatePrivacyInput(input);
  if (!value) throw invalidInput();

  const requestHash = await canonicalPrivacyRequestHash(value);
  const existing = await findByIdempotencyKey(
    database,
    'privacy_requests',
    value.idempotencyKey,
  );
  if (existing) return classifyExisting(existing, requestHash);

  const { id, now } = generatedMetadata(overrides);
  const statement = prepareStatement(
    database,
    `INSERT INTO privacy_requests (
      id, request_type, contact_ref_hash, status, verification_hash,
      verification_expires_at, policy_version, decision_code, idempotency_key,
      request_hash, created_at, verified_at, resolved_at, expires_at
    ) VALUES (?, ?, ?, 'pending_verification', ?, ?, ?, '', ?, ?, ?, '', '', ?)`,
    [
      id,
      value.requestType,
      value.contactRefHash,
      value.verificationHash,
      value.verificationExpiresAt,
      CONTACT_PRIVACY_POLICY_VERSION,
      value.idempotencyKey,
      requestHash,
      now,
      value.expiresAt,
    ],
  );
  const raceResult = await persistOne(
    database,
    statement,
    'privacy_requests',
    value.idempotencyKey,
    requestHash,
  );
  return raceResult || { id, persisted: true, duplicate: false, conflict: false };
}
