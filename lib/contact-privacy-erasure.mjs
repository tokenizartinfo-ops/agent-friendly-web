import {
  CONTACT_PRIVACY_POLICY_VERSION,
  RETENTION_DAYS,
} from './contact-privacy-policy.mjs';

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_WITH_TIMEZONE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-](\d{2}):(\d{2}))$/;
const INPUT_FIELDS = new Set([
  'leadId',
  'emailHmac',
  'purpose',
  'policyVersion',
  'idempotencyKey',
]);
const OVERRIDE_FIELDS = new Set(['now', 'randomUUID']);

function invalidInput() {
  return new Error('privacy_erasure_invalid_input');
}

function erasureFailed() {
  return new Error('privacy_erasure_failed');
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

function selectedDataRecord(input, fields) {
  try {
    if (!isPlainRecord(input)) return null;
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const value = Object.create(null);
    for (const key of fields) {
      const descriptor = descriptors[key];
      if (!descriptor || !Object.hasOwn(descriptor, 'value')) return null;
      value[key] = descriptor.value;
    }
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

function normalizeUuid(value) {
  return value.toLowerCase();
}

function validateInput(input) {
  const value = exactDataRecord(input, INPUT_FIELDS);
  if (!value) return null;
  if (
    typeof value.leadId !== 'string'
    || typeof value.emailHmac !== 'string'
    || typeof value.purpose !== 'string'
    || typeof value.policyVersion !== 'string'
    || typeof value.idempotencyKey !== 'string'
    || !UUID.test(value.leadId)
    || !HASH.test(value.emailHmac)
    || !PURPOSES.has(value.purpose)
    || value.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || !UUID.test(value.idempotencyKey)
  ) return null;
  value.leadId = normalizeUuid(value.leadId);
  value.idempotencyKey = normalizeUuid(value.idempotencyKey);
  return value;
}

function generatedMetadata(overrides) {
  const value = exactDataRecord(overrides, OVERRIDE_FIELDS, false);
  if (!value) throw invalidInput();
  if (
    (Object.hasOwn(value, 'now') && typeof value.now !== 'function')
    || (Object.hasOwn(value, 'randomUUID') && typeof value.randomUUID !== 'function')
  ) throw invalidInput();

  try {
    const timestamp = Object.hasOwn(value, 'now') ? value.now() : new Date().toISOString();
    const now = normalizeIsoTimestamp(timestamp);
    const randomUUID = Object.hasOwn(value, 'randomUUID')
      ? value.randomUUID
      : () => globalThis.crypto.randomUUID();
    const suppressionId = randomUUID();
    const lifecycleId = randomUUID();
    if (
      !now
      || typeof suppressionId !== 'string'
      || typeof lifecycleId !== 'string'
      || !UUID.test(suppressionId)
      || !UUID.test(lifecycleId)
    ) throw invalidInput();
    return {
      now,
      suppressionId: normalizeUuid(suppressionId),
      lifecycleId: normalizeUuid(lifecycleId),
    };
  } catch {
    throw invalidInput();
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

function prepareStatement(database, sql, bindings) {
  try {
    return database.prepare(sql).bind(...bindings);
  } catch {
    throw erasureFailed();
  }
}

async function findLead(database, leadId) {
  try {
    return await database
      .prepare('SELECT id, erased_at AS erasedAt FROM contact_leads WHERE id = ? LIMIT 1')
      .bind(leadId)
      .first();
  } catch {
    throw erasureFailed();
  }
}

export async function resolveContactStatusFromD1(database, contactRef) {
  if (!isD1(database)) throw new Error('privacy_erasure_store_unavailable');
  if (typeof contactRef !== 'string' || !UUID.test(contactRef)) {
    throw new Error('privacy_contact_ref_invalid');
  }

  try {
    const row = await database
      .prepare(`SELECT state, erased_at AS erasedAt, restriction_state AS restrictionState
        FROM contact_leads WHERE id = ? LIMIT 1`)
      .bind(normalizeUuid(contactRef))
      .first();
    if (row === null || row === undefined) {
      return { found: false, contactStatus: 'not_found', restricted: false };
    }
    const value = selectedDataRecord(row, ['state', 'erasedAt', 'restrictionState']);
    if (
      !value
      || typeof value.state !== 'string'
      || typeof value.erasedAt !== 'string'
      || typeof value.restrictionState !== 'string'
    ) throw erasureFailed();
    return {
      found: true,
      contactStatus: value.erasedAt ? 'erased' : 'active',
      restricted: value.restrictionState === 'restricted',
    };
  } catch {
    throw erasureFailed();
  }
}

export async function applyContactErasureToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_erasure_store_unavailable');
  const value = validateInput(input);
  if (!value) throw invalidInput();

  const lead = await findLead(database, value.leadId);
  if (lead === null || lead === undefined) {
    throw new Error('privacy_erasure_contact_not_found');
  }
  const storedLead = selectedDataRecord(lead, ['id', 'erasedAt']);
  if (
    !storedLead
    || typeof storedLead.id !== 'string'
    || typeof storedLead.erasedAt !== 'string'
    || !UUID.test(storedLead.id)
    || normalizeUuid(storedLead.id) !== value.leadId
  ) throw erasureFailed();
  if (storedLead.erasedAt) {
    return { erased: true, duplicate: true, contactStatus: 'erased' };
  }

  const { now, suppressionId, lifecycleId } = generatedMetadata(overrides);
  let refHash;
  let requestHash;
  try {
    refHash = await sha256(value.leadId);
    requestHash = await sha256(JSON.stringify([
      value.leadId,
      value.emailHmac,
      value.purpose,
      value.policyVersion,
      value.idempotencyKey,
    ]));
  } catch {
    throw erasureFailed();
  }

  const tombstoneRef = `contact-erased-${refHash.slice(0, 20)}`;
  const erasedIdempotency = `erased-${refHash.slice(0, 29)}`;
  const suppressionExpiry = new Date(now);
  suppressionExpiry.setUTCDate(suppressionExpiry.getUTCDate() + RETENTION_DAYS.suppression);

  const statements = [
    prepareStatement(
      database,
      `UPDATE contact_leads SET
        email = '', name = '', domain = '', role = '', organization = '',
        objective = '', source = '', idempotency_key = ?, request_hash = '',
        state = 'erased', erased_at = ?, updated_at = ?,
        retention_expires_at = '', restriction_state = 'none'
        WHERE id = ? AND erased_at = ''`,
      [erasedIdempotency, now, now, value.leadId],
    ),
    prepareStatement(
      database,
      `UPDATE crm_opportunities SET
        contact_ref = ?, domain = 'erased.invalid', contact_status = 'erased',
        owner_context = 'unknown', maintainer_context = 'unknown',
        evidence_refs_json = '[]', updated_at = ?
        WHERE contact_ref = ?`,
      [tombstoneRef, now, value.leadId],
    ),
    prepareStatement(
      database,
      `INSERT OR IGNORE INTO contact_suppressions (
        id, email_hmac, purpose, reason_code, policy_version,
        idempotency_key, created_at, expires_at
      ) VALUES (?, ?, ?, 'subject_deletion', ?, ?, ?, ?)`,
      [
        suppressionId,
        value.emailHmac,
        value.purpose,
        value.policyVersion,
        value.idempotencyKey,
        now,
        suppressionExpiry.toISOString(),
      ],
    ),
    prepareStatement(
      database,
      `INSERT INTO data_lifecycle_events (
        id, event_type, contact_ref_hash, result_code, policy_version,
        idempotency_key, request_hash, created_at
      ) VALUES (?, 'deleted', ?, 'identifiers_erased', ?, ?, ?, ?)`,
      [
        lifecycleId,
        refHash,
        value.policyVersion,
        value.idempotencyKey,
        requestHash,
        now,
      ],
    ),
  ];

  try {
    const results = await database.batch(statements);
    if (
      !Array.isArray(results)
      || results.length !== 4
      || !results.every((item) => item?.success === true)
    ) throw erasureFailed();
  } catch {
    throw erasureFailed();
  }

  return { erased: true, duplicate: false, contactStatus: 'erased', tombstoneRef };
}
