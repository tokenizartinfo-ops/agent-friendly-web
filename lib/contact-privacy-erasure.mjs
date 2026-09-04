import {
  CONTACT_PRIVACY_POLICY_VERSION,
  RETENTION_DAYS,
} from './contact-privacy-policy.mjs';

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ERASED_IDEMPOTENCY = /^erased-[0-9a-f]{29}$/;
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

async function findMatchingSuppressions(database, value) {
  try {
    const response = await database
      .prepare(`SELECT
        email_hmac AS emailHmac, purpose, reason_code AS reasonCode,
        policy_version AS policyVersion, idempotency_key AS idempotencyKey,
        expires_at AS expiresAt
        FROM contact_suppressions
        WHERE (email_hmac = ? AND purpose = ?) OR idempotency_key = ?
        ORDER BY id LIMIT 2`)
      .bind(value.emailHmac, value.purpose, value.idempotencyKey)
      .all();
    const result = selectedDataRecord(response, ['results']);
    if (!result || !Array.isArray(result.results) || result.results.length > 1) {
      throw erasureFailed();
    }
    return result.results;
  } catch {
    throw erasureFailed();
  }
}

function suppressionMatches(row, value, minimumExpiryMs) {
  const stored = selectedDataRecord(row, [
    'emailHmac',
    'purpose',
    'reasonCode',
    'policyVersion',
    'idempotencyKey',
    'expiresAt',
  ]);
  if (
    !stored
    || typeof stored.emailHmac !== 'string'
    || typeof stored.purpose !== 'string'
    || typeof stored.reasonCode !== 'string'
    || typeof stored.policyVersion !== 'string'
    || typeof stored.idempotencyKey !== 'string'
    || typeof stored.expiresAt !== 'string'
    || !HASH.test(stored.emailHmac)
    || !UUID.test(stored.idempotencyKey)
  ) return false;
  const expiresAt = normalizeIsoTimestamp(stored.expiresAt);
  return Boolean(
    expiresAt
    && stored.emailHmac === value.emailHmac
    && stored.purpose === value.purpose
    && stored.reasonCode === 'subject_deletion'
    && stored.policyVersion === value.policyVersion
    && new Date(expiresAt).getTime() >= minimumExpiryMs
  );
}

function suppressionsAreCompatible(rows, value, minimumExpiryMs, required) {
  if (rows.length === 0) return !required;
  return rows.length === 1 && suppressionMatches(rows[0], value, minimumExpiryMs);
}

async function findCommittedLead(database, leadId) {
  try {
    return await database
      .prepare(`SELECT
        id, email, name, domain, role, organization, objective, source,
        idempotency_key AS idempotencyKey, request_hash AS requestHash,
        state, erased_at AS erasedAt, updated_at AS updatedAt,
        retention_expires_at AS retentionExpiresAt,
        restriction_state AS restrictionState
        FROM contact_leads WHERE id = ? LIMIT 1`)
      .bind(leadId)
      .first();
  } catch {
    throw erasureFailed();
  }
}

async function findCommittedLifecycle(database, refHash) {
  try {
    return await database
      .prepare(`SELECT
        event_type AS eventType, contact_ref_hash AS contactRefHash,
        result_code AS resultCode, policy_version AS policyVersion,
        idempotency_key AS idempotencyKey, request_hash AS requestHash,
        created_at AS createdAt
        FROM data_lifecycle_events
        WHERE contact_ref_hash = ? AND event_type = 'deleted'
        ORDER BY created_at DESC LIMIT 1`)
      .bind(refHash)
      .first();
  } catch {
    throw erasureFailed();
  }
}

function validateCommittedLead(row, leadId) {
  const value = selectedDataRecord(row, [
    'id',
    'email',
    'name',
    'domain',
    'role',
    'organization',
    'objective',
    'source',
    'idempotencyKey',
    'requestHash',
    'state',
    'erasedAt',
    'updatedAt',
    'retentionExpiresAt',
    'restrictionState',
  ]);
  if (!value || Object.values(value).some((item) => typeof item !== 'string')) return null;
  if (
    !UUID.test(value.id)
    || normalizeUuid(value.id) !== leadId
    || value.email !== ''
    || value.name !== ''
    || value.domain !== ''
    || value.role !== ''
    || value.organization !== ''
    || value.objective !== ''
    || value.source !== ''
    || !ERASED_IDEMPOTENCY.test(value.idempotencyKey)
    || value.requestHash !== ''
    || value.state !== 'erased'
    || !normalizeIsoTimestamp(value.erasedAt)
    || !normalizeIsoTimestamp(value.updatedAt)
    || value.retentionExpiresAt !== ''
    || value.restrictionState !== 'none'
  ) return null;
  return value;
}

function lifecycleMatches(row, value, refHash, requestHash, requireSameRequest) {
  const stored = selectedDataRecord(row, [
    'eventType',
    'contactRefHash',
    'resultCode',
    'policyVersion',
    'idempotencyKey',
    'requestHash',
    'createdAt',
  ]);
  if (
    !stored
    || typeof stored.eventType !== 'string'
    || typeof stored.contactRefHash !== 'string'
    || typeof stored.resultCode !== 'string'
    || typeof stored.policyVersion !== 'string'
    || typeof stored.idempotencyKey !== 'string'
    || typeof stored.requestHash !== 'string'
    || typeof stored.createdAt !== 'string'
    || stored.eventType !== 'deleted'
    || stored.contactRefHash !== refHash
    || stored.resultCode !== 'identifiers_erased'
    || stored.policyVersion !== value.policyVersion
    || !UUID.test(stored.idempotencyKey)
    || !HASH.test(stored.requestHash)
    || !normalizeIsoTimestamp(stored.createdAt)
  ) return null;
  if (
    requireSameRequest
    && (
      normalizeUuid(stored.idempotencyKey) !== value.idempotencyKey
      || stored.requestHash !== requestHash
    )
  ) return null;
  return stored;
}

async function validateCommittedErasure(
  database,
  value,
  refHash,
  requestHash,
  erasedIdempotency,
) {
  const lead = validateCommittedLead(
    await findCommittedLead(database, value.leadId),
    value.leadId,
  );
  if (!lead) throw erasureFailed();

  const sameRequest = lead.idempotencyKey === erasedIdempotency;
  const lifecycle = lifecycleMatches(
    await findCommittedLifecycle(database, refHash),
    value,
    refHash,
    requestHash,
    sameRequest,
  );
  if (!lifecycle) throw erasureFailed();

  const erasedAt = normalizeIsoTimestamp(lead.erasedAt);
  const lifecycleAt = normalizeIsoTimestamp(lifecycle.createdAt);
  if (!erasedAt || erasedAt !== lifecycleAt) throw erasureFailed();
  const minimumExpiry = new Date(lifecycleAt);
  minimumExpiry.setUTCDate(minimumExpiry.getUTCDate() + RETENTION_DAYS.suppression);

  const suppressions = await findMatchingSuppressions(database, value);
  if (!suppressionsAreCompatible(suppressions, value, minimumExpiry.getTime(), true)) {
    throw erasureFailed();
  }
  return { sameRequest };
}

function batchChanges(results) {
  try {
    if (!Array.isArray(results) || results.length !== 4) return null;
    const changes = [];
    for (const item of results) {
      const result = selectedDataRecord(item, ['success', 'meta']);
      const meta = result && selectedDataRecord(result.meta, ['changes']);
      if (
        !result
        || result.success !== true
        || !meta
        || !Number.isInteger(meta.changes)
        || meta.changes < 0
      ) return null;
      changes.push(meta.changes);
    }
    return changes;
  } catch {
    return null;
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
  const erasedIdempotency = `erased-${requestHash.slice(0, 29)}`;
  if (storedLead.erasedAt) {
    await validateCommittedErasure(
      database,
      value,
      refHash,
      requestHash,
      erasedIdempotency,
    );
    return { erased: true, duplicate: true, contactStatus: 'erased' };
  }

  const { now, suppressionId, lifecycleId } = generatedMetadata(overrides);
  const suppressionExpiry = new Date(now);
  suppressionExpiry.setUTCDate(suppressionExpiry.getUTCDate() + RETENTION_DAYS.suppression);
  const minimumExpiryMs = suppressionExpiry.getTime();
  const existingSuppressions = await findMatchingSuppressions(database, value);
  if (!suppressionsAreCompatible(existingSuppressions, value, minimumExpiryMs, false)) {
    throw erasureFailed();
  }

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
        WHERE contact_ref = ? AND EXISTS (
          SELECT 1 FROM contact_leads
          WHERE id = ? AND idempotency_key = ? AND erased_at = ?
        )`,
      [tombstoneRef, now, value.leadId, value.leadId, erasedIdempotency, now],
    ),
    prepareStatement(
      database,
      `INSERT INTO contact_suppressions (
        id, email_hmac, purpose, reason_code, policy_version,
        idempotency_key, created_at, expires_at
      ) SELECT ?, ?, ?, 'subject_deletion', ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM contact_leads
          WHERE id = ? AND idempotency_key = ? AND erased_at = ?
        )
        ON CONFLICT (email_hmac, purpose) DO UPDATE SET
          reason_code = NULL
        WHERE contact_suppressions.reason_code <> 'subject_deletion'
          OR contact_suppressions.policy_version <> excluded.policy_version
          OR julianday(contact_suppressions.expires_at) IS NULL
          OR julianday(contact_suppressions.expires_at) < julianday(excluded.expires_at)
          OR EXISTS (
            SELECT 1 FROM contact_suppressions AS idempotency_conflict
            WHERE idempotency_conflict.idempotency_key = excluded.idempotency_key
              AND (
                idempotency_conflict.email_hmac <> excluded.email_hmac
                OR idempotency_conflict.purpose <> excluded.purpose
              )
          )`,
      [
        suppressionId,
        value.emailHmac,
        value.purpose,
        value.policyVersion,
        value.idempotencyKey,
        now,
        suppressionExpiry.toISOString(),
        value.leadId,
        erasedIdempotency,
        now,
      ],
    ),
    prepareStatement(
      database,
      `INSERT INTO data_lifecycle_events (
        id, event_type, contact_ref_hash, result_code, policy_version,
        idempotency_key, request_hash, created_at
      ) SELECT ?, 'deleted', ?, 'identifiers_erased', ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM contact_leads
          WHERE id = ? AND idempotency_key = ? AND erased_at = ?
        )`,
      [
        lifecycleId,
        refHash,
        value.policyVersion,
        value.idempotencyKey,
        requestHash,
        now,
        value.leadId,
        erasedIdempotency,
        now,
      ],
    ),
  ];

  let results;
  try {
    results = await database.batch(statements);
  } catch {
    await validateCommittedErasure(
      database,
      value,
      refHash,
      requestHash,
      erasedIdempotency,
    );
    return { erased: true, duplicate: true, contactStatus: 'erased' };
  }

  const changes = batchChanges(results);
  if (!changes) {
    await validateCommittedErasure(
      database,
      value,
      refHash,
      requestHash,
      erasedIdempotency,
    );
    return { erased: true, duplicate: true, contactStatus: 'erased' };
  }
  if (changes[0] === 0) {
    if (changes.slice(1).some((count) => count !== 0)) throw erasureFailed();
    await validateCommittedErasure(
      database,
      value,
      refHash,
      requestHash,
      erasedIdempotency,
    );
    return { erased: true, duplicate: true, contactStatus: 'erased' };
  }
  if (changes[0] !== 1 || changes[2] > 1 || changes[3] !== 1) {
    throw erasureFailed();
  }
  const committed = await validateCommittedErasure(
    database,
    value,
    refHash,
    requestHash,
    erasedIdempotency,
  );
  if (!committed.sameRequest) throw erasureFailed();
  return { erased: true, duplicate: false, contactStatus: 'erased', tombstoneRef };
}
