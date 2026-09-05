import {
  createPrivacyRequestToD1,
  recordConsentLifecycleEventToD1,
} from './contact-privacy-d1-store.mjs';
import {
  applyContactErasureToD1,
  resolveContactStatusFromD1,
} from './contact-privacy-erasure.mjs';
import {
  CONTACT_PRIVACY_POLICY_VERSION,
  RETENTION_DAYS,
} from './contact-privacy-policy.mjs';
import { CONTACT_COPY_VERSION } from './contact-intake.mjs';
import { hashAccessSubject } from './access-subject-hash.mjs';
import { readBoundedJsonBody } from './bounded-json-body.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';

export const SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT = 'agent-friendly-web.synthetic-privacy-lifecycle.v1';

const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/synthetic-privacy-lifecycle';
const HTTP_ACTION = 'run_one_private_synthetic_privacy_lifecycle';
const HTTP_CONFIRMATION = 'synthetic_only';
const SYNTHETIC_EMAIL = 'synthetic-canary@example.invalid';
const SYNTHETIC_DOMAIN = 'example.invalid';
const SYNTHETIC_ORGANIZATION = 'Agent Friendly Web Synthetic Canary';
const RECTIFIED_NAME = 'Agent Friendly Web Synthetic Canary Rectified';
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_WITH_TIMEZONE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-](\d{2}):(\d{2}))$/;
const INPUT_FIELDS = new Set(['actorRefHash', 'suppressionHmacKey']);
const OVERRIDE_FIELDS = new Set(['now', 'randomUUID']);
const HTTP_REQUEST_FIELDS = new Set(['contract', 'action', 'confirmation']);
const RESPONSE_FIELDS = new Set([
  'status',
  'synthetic',
  'contactStatus',
  'restricted',
  'counts',
  'capabilities',
]);
const COUNT_FIELDS = new Set(['consentEvents', 'privacyRequests', 'suppressions', 'lifecycleEvents']);
const CAPABILITY_FIELDS = new Set([
  'sendsEmail',
  'createsProposal',
  'chargesPayment',
  'modifiesCustomerSite',
  'acceptsRealContacts',
]);
const HTTP_RESULT_STATUSES = new Set([
  'synthetic_privacy_lifecycle_completed',
  'synthetic_privacy_lifecycle_already_completed',
]);
const NO_STORE_HEADERS = { 'cache-control': 'no-store, private' };
const CAPABILITIES = Object.freeze({
  sendsEmail: false,
  createsProposal: false,
  chargesPayment: false,
  modifiesCustomerSite: false,
  acceptsRealContacts: false,
});
const EXPECTED_COUNTS = Object.freeze({
  consentEvents: 2,
  privacyRequests: 4,
  suppressions: 2,
  lifecycleEvents: 3,
});

function invalidInput() {
  return new Error('synthetic_privacy_lifecycle_invalid_input');
}

function storeFailed() {
  return new Error('synthetic_privacy_lifecycle_store_failed');
}

function fixtureNotFound() {
  return new Error('synthetic_privacy_lifecycle_fixture_not_found');
}

function fixtureInvalid() {
  return new Error('synthetic_privacy_lifecycle_fixture_invalid');
}

function isPlainRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function json(body, status) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function httpFailure(status, code) {
  return json({ ok: false, code }, status);
}

function allowedSubjectHashes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

function validHttpBoundary(request) {
  try {
    const url = new URL(request.url);
    return request.method === 'POST'
      && url.protocol === 'https:'
      && url.host.toLowerCase() === CANARY_HOST
      && url.pathname === CANARY_PATH
      && !url.search
      && request.headers.get('origin') === CANARY_ORIGIN;
  } catch {
    return false;
  }
}

function runtimeReady(env) {
  try {
    return isD1(env?.DB)
      && typeof env.AFW_CONTACT_SUPPRESSION_HMAC_KEY === 'string'
      && env.AFW_CONTACT_SUPPRESSION_HMAC_KEY.length > 0
      && typeof env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER?.limit === 'function';
  } catch {
    return false;
  }
}

function validHttpRequest(input) {
  const value = exactDataRecord(input, HTTP_REQUEST_FIELDS);
  return Boolean(
    value
    && value.contract === SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT
    && value.action === HTTP_ACTION
    && value.confirmation === HTTP_CONFIRMATION,
  );
}

function validHttpResult(result) {
  const value = exactDataRecord(result, RESPONSE_FIELDS);
  const counts = value && exactDataRecord(value.counts, COUNT_FIELDS);
  const capabilities = value && exactDataRecord(value.capabilities, CAPABILITY_FIELDS);
  return Boolean(
    value
    && HTTP_RESULT_STATUSES.has(value.status)
    && value.synthetic === true
    && value.contactStatus === 'erased'
    && value.restricted === false
    && counts
    && Object.entries(EXPECTED_COUNTS).every(([field, expected]) => counts[field] === expected)
    && capabilities
    && Object.entries(CAPABILITIES).every(([field, expected]) => capabilities[field] === expected),
  );
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

function addTime(timestamp, { minutes = 0, days = 0 }) {
  const value = new Date(timestamp);
  value.setUTCMinutes(value.getUTCMinutes() + minutes);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString();
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

function validateArguments(input, overrides) {
  const value = exactDataRecord(input, INPUT_FIELDS);
  const deterministic = exactDataRecord(overrides, OVERRIDE_FIELDS, false);
  if (!value || !deterministic) throw invalidInput();
  if (
    typeof value.actorRefHash !== 'string'
    || !HASH.test(value.actorRefHash)
    || typeof value.suppressionHmacKey !== 'string'
  ) throw invalidInput();
  const hmacKeyBytes = new TextEncoder().encode(value.suppressionHmacKey);
  if (hmacKeyBytes.byteLength < 32 || hmacKeyBytes.byteLength > 1024) throw invalidInput();
  if (
    (Object.hasOwn(deterministic, 'now') && typeof deterministic.now !== 'function')
    || (Object.hasOwn(deterministic, 'randomUUID') && typeof deterministic.randomUUID !== 'function')
  ) throw invalidInput();

  let now;
  try {
    now = normalizeIsoTimestamp(
      Object.hasOwn(deterministic, 'now') ? deterministic.now() : new Date().toISOString(),
    );
  } catch {
    throw invalidInput();
  }
  if (!now) throw invalidInput();

  return {
    actorRefHash: value.actorRefHash,
    suppressionHmacKey: value.suppressionHmacKey,
    now,
    primitiveOverrides: {
      now: () => now,
      ...(Object.hasOwn(deterministic, 'randomUUID')
        ? { randomUUID: deterministic.randomUUID }
        : {}),
    },
  };
}

async function sha256Bytes(value) {
  const bytes = new TextEncoder().encode(value);
  return new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', bytes));
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(value) {
  return bytesToHex(await sha256Bytes(value));
}

async function stepUuid(actorRefHash, step) {
  const bytes = (await sha256Bytes(JSON.stringify([
    SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
    actorRefHash,
    step,
  ]))).slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytesToHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

async function deriveStepKeys(actorRefHash) {
  const names = [
    'consent-grant',
    'request-rectification',
    'request-export',
    'request-withdrawal',
    'consent-withdrawal',
    'suppression-withdrawal-id',
    'suppression-withdrawal-key',
    'lifecycle-export-id',
    'lifecycle-export-key',
    'lifecycle-withdrawal-id',
    'lifecycle-withdrawal-key',
    'request-deletion',
    'erasure-deletion',
  ];
  const values = await Promise.all(names.map((name) => stepUuid(actorRefHash, name)));
  return Object.fromEntries(names.map((name, index) => [name, values[index]]));
}

async function hmacSha256(value, key) {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await globalThis.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    new TextEncoder().encode(value),
  );
  return bytesToHex(new Uint8Array(digest));
}

function prepareStatement(database, sql, bindings) {
  try {
    return database.prepare(sql).bind(...bindings);
  } catch {
    throw storeFailed();
  }
}

async function queryFirst(database, sql, bindings) {
  try {
    const statement = database.prepare(sql).bind(...bindings);
    if (typeof statement.first !== 'function') throw storeFailed();
    return await statement.first();
  } catch {
    throw storeFailed();
  }
}

function parseBatchResults(results, length) {
  try {
    if (!Array.isArray(results) || results.length !== length) return null;
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

async function executeBatch(database, statements) {
  let results;
  try {
    results = await database.batch(statements);
  } catch {
    throw storeFailed();
  }
  const changes = parseBatchResults(results, statements.length);
  if (!changes) throw storeFailed();
  return changes;
}

function validPersistenceResult(result) {
  const value = selectedDataRecord(result, ['id', 'persisted', 'duplicate', 'conflict']);
  return Boolean(
    value
    && typeof value.id === 'string'
    && UUID.test(value.id)
    && value.persisted === true
    && typeof value.duplicate === 'boolean'
    && value.conflict === false,
  );
}

async function runPrimitive(operation) {
  try {
    const result = await operation();
    if (!validPersistenceResult(result)) throw storeFailed();
    return result;
  } catch {
    throw storeFailed();
  }
}

function markerValue(row, expectedIdempotencyKey) {
  const value = selectedDataRecord(row, [
    'eventType',
    'contactRefHash',
    'resultCode',
    'policyVersion',
    'idempotencyKey',
    'requestHash',
    'createdAt',
  ]);
  if (
    !value
    || value.eventType !== 'deleted'
    || typeof value.contactRefHash !== 'string'
    || !HASH.test(value.contactRefHash)
    || value.resultCode !== 'identifiers_erased'
    || value.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || value.idempotencyKey !== expectedIdempotencyKey
    || typeof value.requestHash !== 'string'
    || !HASH.test(value.requestHash)
    || !normalizeIsoTimestamp(value.createdAt)
  ) throw storeFailed();
  return value;
}

async function findCompletionMarker(database, keys) {
  const row = await queryFirst(
    database,
    `SELECT event_type AS eventType, contact_ref_hash AS contactRefHash,
      result_code AS resultCode, policy_version AS policyVersion,
      idempotency_key AS idempotencyKey, request_hash AS requestHash,
      created_at AS createdAt
      FROM data_lifecycle_events
      WHERE idempotency_key = ? AND event_type = 'deleted'
      LIMIT 1`,
    [keys['erasure-deletion']],
  );
  return row === null || row === undefined
    ? null
    : markerValue(row, keys['erasure-deletion']);
}

async function readCounts(database, keys) {
  const row = await queryFirst(
    database,
    `SELECT
      (SELECT COUNT(*) FROM contact_consent_events
        WHERE idempotency_key IN (?, ?)) AS consentEvents,
      (SELECT COUNT(*) FROM privacy_requests
        WHERE idempotency_key IN (?, ?, ?, ?)) AS privacyRequests,
      (SELECT COUNT(*) FROM contact_suppressions
        WHERE idempotency_key IN (?, ?)) AS suppressions,
      (SELECT COUNT(*) FROM data_lifecycle_events
        WHERE idempotency_key IN (?, ?, ?)) AS lifecycleEvents`,
    [
      keys['consent-grant'],
      keys['consent-withdrawal'],
      keys['request-rectification'],
      keys['request-export'],
      keys['request-withdrawal'],
      keys['request-deletion'],
      keys['suppression-withdrawal-key'],
      keys['erasure-deletion'],
      keys['lifecycle-export-key'],
      keys['lifecycle-withdrawal-key'],
      keys['erasure-deletion'],
    ],
  );
  const value = selectedDataRecord(row, [
    'consentEvents',
    'privacyRequests',
    'suppressions',
    'lifecycleEvents',
  ]);
  if (
    !value
    || Object.entries(EXPECTED_COUNTS).some(([field, expected]) => value[field] !== expected)
  ) throw storeFailed();
  return { ...EXPECTED_COUNTS };
}

function response(status, counts) {
  return {
    status,
    synthetic: true,
    contactStatus: 'erased',
    restricted: false,
    counts,
    capabilities: { ...CAPABILITIES },
  };
}

async function findFixture(database) {
  const row = await queryFirst(
    database,
    `SELECT l.id, l.email, l.name, l.domain, l.role, l.organization,
      l.locale, l.objective, l.state, l.source, COUNT(*) OVER () AS candidateCount
      FROM contact_leads AS l
      WHERE l.email = ?
        AND l.domain = ?
        AND l.organization = ?
        AND l.state = 'new'
        AND l.erased_at = ''
        AND EXISTS (
          SELECT 1 FROM consent_receipts AS c
          WHERE c.lead_id = l.id
            AND c.purpose = 'requested_plan'
            AND c.action = 'granted'
        )
      ORDER BY l.created_at DESC
      LIMIT 1`,
    [SYNTHETIC_EMAIL, SYNTHETIC_DOMAIN, SYNTHETIC_ORGANIZATION],
  );
  if (row === null || row === undefined) throw fixtureNotFound();
  const value = selectedDataRecord(row, [
    'id',
    'email',
    'name',
    'domain',
    'role',
    'organization',
    'locale',
    'objective',
    'state',
    'source',
    'candidateCount',
  ]);
  if (
    !value
    || typeof value.id !== 'string'
    || !UUID.test(value.id)
    || value.email !== SYNTHETIC_EMAIL
    || !value.email.endsWith('.invalid')
    || !['', RECTIFIED_NAME].includes(value.name)
    || value.domain !== SYNTHETIC_DOMAIN
    || value.role !== 'owner'
    || value.organization !== SYNTHETIC_ORGANIZATION
    || value.locale !== 'es'
    || value.objective !== 'receive_plan'
    || value.state !== 'new'
    || value.source !== 'direct'
    || value.candidateCount !== 1
  ) throw fixtureInvalid();
  return { ...value, id: value.id.toLowerCase() };
}

async function requestTemporalMetadata(
  database,
  value,
  requestType,
  idempotencyKey,
  contactRefHash,
  verificationHash,
) {
  const row = await queryFirst(
    database,
    `SELECT id, request_type AS requestType, contact_ref_hash AS contactRefHash,
      verification_hash AS verificationHash,
      verification_expires_at AS verificationExpiresAt,
      policy_version AS policyVersion, idempotency_key AS idempotencyKey,
      request_hash AS requestHash, expires_at AS expiresAt
      FROM privacy_requests WHERE idempotency_key = ? LIMIT 1`,
    [idempotencyKey],
  );
  if (row === null || row === undefined) {
    return {
      verificationExpiresAt: addTime(value.now, { minutes: 15 }),
      expiresAt: addTime(value.now, { days: 1 }),
    };
  }

  const stored = selectedDataRecord(row, [
    'id',
    'requestType',
    'contactRefHash',
    'verificationHash',
    'verificationExpiresAt',
    'policyVersion',
    'idempotencyKey',
    'requestHash',
    'expiresAt',
  ]);
  const verificationExpiresAt = stored
    ? normalizeIsoTimestamp(stored.verificationExpiresAt)
    : '';
  const expiresAt = stored ? normalizeIsoTimestamp(stored.expiresAt) : '';
  if (
    !stored
    || typeof stored.id !== 'string'
    || !UUID.test(stored.id)
    || stored.requestType !== requestType
    || stored.contactRefHash !== contactRefHash
    || stored.verificationHash !== verificationHash
    || stored.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || stored.idempotencyKey !== idempotencyKey
    || typeof stored.requestHash !== 'string'
    || !HASH.test(stored.requestHash)
    || !verificationExpiresAt
    || verificationExpiresAt !== stored.verificationExpiresAt
    || !expiresAt
    || expiresAt !== stored.expiresAt
    || new Date(verificationExpiresAt).getTime() >= new Date(expiresAt).getTime()
  ) throw storeFailed();
  return { verificationExpiresAt, expiresAt };
}

async function createPrivacyRequest(database, value, requestType, idempotencyKey, contactRefHash) {
  const verificationHash = await sha256(JSON.stringify([
    SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
    value.actorRefHash,
    requestType,
    'verified-synthetic-request',
  ]));
  const temporal = await requestTemporalMetadata(
    database,
    value,
    requestType,
    idempotencyKey,
    contactRefHash,
    verificationHash,
  );
  await runPrimitive(() => createPrivacyRequestToD1(database, {
    requestType,
    contactRefHash,
    verificationHash,
    verificationExpiresAt: temporal.verificationExpiresAt,
    expiresAt: temporal.expiresAt,
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey,
  }, value.primitiveOverrides));
}

async function assertResolvedRequest(database, idempotencyKey, requestType, decisionCode) {
  const row = await queryFirst(
    database,
    `SELECT request_type AS requestType, status, decision_code AS decisionCode,
      verified_at AS verifiedAt, resolved_at AS resolvedAt
      FROM privacy_requests WHERE idempotency_key = ? LIMIT 1`,
    [idempotencyKey],
  );
  const stored = selectedDataRecord(row, [
    'requestType',
    'status',
    'decisionCode',
    'verifiedAt',
    'resolvedAt',
  ]);
  if (
    !stored
    || stored.requestType !== requestType
    || stored.status !== 'resolved'
    || stored.decisionCode !== decisionCode
    || normalizeIsoTimestamp(stored.verifiedAt) !== stored.verifiedAt
    || normalizeIsoTimestamp(stored.resolvedAt) !== stored.resolvedAt
  ) throw storeFailed();
}

async function applyRectification(database, fixture, value, keys) {
  const requestKey = keys['request-rectification'];
  await createPrivacyRequest(database, value, 'rectification', requestKey, fixture.contactRefHash);
  await executeBatch(database, [
    prepareStatement(
      database,
      `UPDATE contact_leads SET name = ?, updated_at = ?
        WHERE id = ? AND email = ? AND domain = ? AND organization = ?
          AND state = 'new' AND erased_at = '' AND name <> ?`,
      [
        RECTIFIED_NAME,
        value.now,
        fixture.id,
        SYNTHETIC_EMAIL,
        SYNTHETIC_DOMAIN,
        SYNTHETIC_ORGANIZATION,
        RECTIFIED_NAME,
      ],
    ),
    prepareStatement(
      database,
      `UPDATE privacy_requests SET
        status = 'resolved', decision_code = 'rectified_name',
        verified_at = ?, resolved_at = ?
        WHERE idempotency_key = ? AND status = 'pending_verification'
          AND EXISTS (
            SELECT 1 FROM contact_leads
            WHERE id = ? AND name = ? AND email = ? AND state = 'new'
          )`,
      [value.now, value.now, requestKey, fixture.id, RECTIFIED_NAME, SYNTHETIC_EMAIL],
    ),
  ]);
  await assertResolvedRequest(database, requestKey, 'rectification', 'rectified_name');
}

function exportValue(row) {
  const fields = [
    'email',
    'name',
    'domain',
    'role',
    'organization',
    'locale',
    'objective',
    'state',
    'source',
  ];
  const value = selectedDataRecord(row, fields);
  if (!value || fields.some((field) => typeof value[field] !== 'string')) throw storeFailed();
  if (
    value.email !== SYNTHETIC_EMAIL
    || value.name !== RECTIFIED_NAME
    || value.domain !== SYNTHETIC_DOMAIN
    || value.role !== 'owner'
    || value.organization !== SYNTHETIC_ORGANIZATION
    || value.locale !== 'es'
    || value.objective !== 'receive_plan'
    || value.state !== 'new'
    || value.source !== 'direct'
  ) throw storeFailed();
  return { ...value };
}

async function applyExport(database, fixture, value, keys) {
  const requestKey = keys['request-export'];
  await createPrivacyRequest(database, value, 'access_export', requestKey, fixture.contactRefHash);
  const subject = exportValue(await queryFirst(
    database,
    `SELECT email, name, domain, role, organization, locale, objective, state, source
      FROM contact_leads
      WHERE id = ? AND email = ? AND domain = ? AND state = 'new'
      LIMIT 1`,
    [fixture.id, SYNTHETIC_EMAIL, SYNTHETIC_DOMAIN],
  ));
  const exportDigest = await sha256(JSON.stringify(subject));
  const eventKey = keys['lifecycle-export-key'];
  await executeBatch(database, [
    prepareStatement(
      database,
      `INSERT INTO data_lifecycle_events (
        id, event_type, contact_ref_hash, result_code, policy_version,
        idempotency_key, request_hash, created_at
      ) SELECT ?, 'exported', ?, 'subject_export_hashed', ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM privacy_requests WHERE idempotency_key = ?
        ) AND NOT EXISTS (
          SELECT 1 FROM data_lifecycle_events WHERE idempotency_key = ?
        )`,
      [
        keys['lifecycle-export-id'],
        fixture.contactRefHash,
        CONTACT_PRIVACY_POLICY_VERSION,
        eventKey,
        exportDigest,
        value.now,
        requestKey,
        eventKey,
      ],
    ),
    prepareStatement(
      database,
      `UPDATE privacy_requests SET
        status = 'resolved', decision_code = 'export_digest_verified',
        verified_at = ?, resolved_at = ?
        WHERE idempotency_key = ? AND status = 'pending_verification'
          AND EXISTS (
            SELECT 1 FROM data_lifecycle_events
            WHERE idempotency_key = ? AND event_type = 'exported'
          )`,
      [value.now, value.now, requestKey, eventKey],
    ),
  ]);
  await assertResolvedRequest(database, requestKey, 'access_export', 'export_digest_verified');
}

async function assertWithdrawal(database, value, keys, emailHmac) {
  const row = await queryFirst(
    database,
    `SELECT s.email_hmac AS emailHmac, s.purpose, s.reason_code AS reasonCode,
      s.policy_version AS policyVersion, s.idempotency_key AS suppressionKey,
      s.expires_at AS expiresAt, e.event_type AS eventType,
      e.result_code AS resultCode, e.idempotency_key AS lifecycleKey
      FROM contact_suppressions AS s
      JOIN data_lifecycle_events AS e ON e.contact_ref_hash = ?
      WHERE s.idempotency_key = ? AND e.idempotency_key = ?
      LIMIT 1`,
    [fixtureContactRef(value), keys['suppression-withdrawal-key'], keys['lifecycle-withdrawal-key']],
  );
  const stored = selectedDataRecord(row, [
    'emailHmac',
    'purpose',
    'reasonCode',
    'policyVersion',
    'suppressionKey',
    'expiresAt',
    'eventType',
    'resultCode',
    'lifecycleKey',
  ]);
  if (
    !stored
    || stored.emailHmac !== emailHmac
    || stored.purpose !== 'commercial_contact'
    || stored.reasonCode !== 'consent_withdrawal'
    || stored.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || stored.suppressionKey !== keys['suppression-withdrawal-key']
    || !normalizeIsoTimestamp(stored.expiresAt)
    || stored.eventType !== 'suppressed'
    || stored.resultCode !== 'commercial_contact_withdrawn'
    || stored.lifecycleKey !== keys['lifecycle-withdrawal-key']
  ) throw storeFailed();
}

function fixtureContactRef(value) {
  return value.contactRefHash;
}

async function applyWithdrawal(database, fixture, value, keys, emailHmac) {
  const requestKey = keys['request-withdrawal'];
  await createPrivacyRequest(database, value, 'withdraw_consent', requestKey, fixture.contactRefHash);
  await runPrimitive(() => recordConsentLifecycleEventToD1(database, {
    leadId: fixture.id,
    purpose: 'commercial_contact',
    action: 'withdrawn',
    copyVersion: CONTACT_COPY_VERSION,
    actorRefHash: value.actorRefHash,
    idempotencyKey: keys['consent-withdrawal'],
  }, value.primitiveOverrides));

  const lifecycleHash = await sha256(JSON.stringify([
    SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
    value.actorRefHash,
    'commercial-contact-withdrawn',
  ]));
  const suppressionKey = keys['suppression-withdrawal-key'];
  const lifecycleKey = keys['lifecycle-withdrawal-key'];
  await executeBatch(database, [
    prepareStatement(
      database,
      `INSERT INTO contact_suppressions (
        id, email_hmac, purpose, reason_code, policy_version,
        idempotency_key, created_at, expires_at
      ) SELECT ?, ?, 'commercial_contact', 'consent_withdrawal', ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM contact_consent_events
          WHERE idempotency_key = ? AND purpose = 'commercial_contact'
            AND action = 'withdrawn'
        ) AND NOT EXISTS (
          SELECT 1 FROM contact_suppressions WHERE idempotency_key = ?
        )`,
      [
        keys['suppression-withdrawal-id'],
        emailHmac,
        CONTACT_PRIVACY_POLICY_VERSION,
        suppressionKey,
        value.now,
        addTime(value.now, { days: RETENTION_DAYS.suppression }),
        keys['consent-withdrawal'],
        suppressionKey,
      ],
    ),
    prepareStatement(
      database,
      `INSERT INTO data_lifecycle_events (
        id, event_type, contact_ref_hash, result_code, policy_version,
        idempotency_key, request_hash, created_at
      ) SELECT ?, 'suppressed', ?, 'commercial_contact_withdrawn', ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM contact_suppressions WHERE idempotency_key = ?
        ) AND NOT EXISTS (
          SELECT 1 FROM data_lifecycle_events WHERE idempotency_key = ?
        )`,
      [
        keys['lifecycle-withdrawal-id'],
        fixture.contactRefHash,
        CONTACT_PRIVACY_POLICY_VERSION,
        lifecycleKey,
        lifecycleHash,
        value.now,
        suppressionKey,
        lifecycleKey,
      ],
    ),
    prepareStatement(
      database,
      `UPDATE privacy_requests SET
        status = 'resolved', decision_code = 'commercial_contact_withdrawn',
        verified_at = ?, resolved_at = ?
        WHERE idempotency_key = ? AND status = 'pending_verification'
          AND EXISTS (
            SELECT 1 FROM data_lifecycle_events
            WHERE idempotency_key = ? AND event_type = 'suppressed'
          )`,
      [value.now, value.now, requestKey, lifecycleKey],
    ),
  ]);
  await assertResolvedRequest(
    database,
    requestKey,
    'withdraw_consent',
    'commercial_contact_withdrawn',
  );
  await assertWithdrawal(database, fixture, keys, emailHmac);
}

function erasureDatabaseWithResolution(database, resolution) {
  return {
    prepare(sql) {
      return database.prepare(sql);
    },
    async batch(statements) {
      const results = await database.batch([...statements, resolution]);
      if (!parseBatchResults(results, statements.length + 1)) return results;
      return results.slice(0, statements.length);
    },
  };
}

async function applyDeletion(database, fixture, value, keys, emailHmac) {
  const requestKey = keys['request-deletion'];
  await createPrivacyRequest(database, value, 'deletion', requestKey, fixture.contactRefHash);
  const resolution = prepareStatement(
    database,
    `UPDATE privacy_requests SET
      status = 'resolved', decision_code = 'identifiers_erased',
      verified_at = ?, resolved_at = ?
      WHERE idempotency_key = ? AND status = 'pending_verification'
        AND EXISTS (
          SELECT 1 FROM contact_leads WHERE id = ? AND state = 'erased'
        )`,
    [value.now, value.now, requestKey, fixture.id],
  );
  let result;
  try {
    result = await applyContactErasureToD1(
      erasureDatabaseWithResolution(database, resolution),
      {
        leadId: fixture.id,
        emailHmac,
        purpose: 'requested_plan',
        policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
        idempotencyKey: keys['erasure-deletion'],
      },
      value.primitiveOverrides,
    );
  } catch {
    throw storeFailed();
  }
  if (
    !isPlainRecord(result)
    || result.erased !== true
    || result.contactStatus !== 'erased'
    || typeof result.duplicate !== 'boolean'
  ) throw storeFailed();
  await assertResolvedRequest(database, requestKey, 'deletion', 'identifiers_erased');
}

export async function runSyntheticPrivacyLifecycle(database, input, overrides = {}) {
  const value = validateArguments(input, overrides);
  if (!isD1(database)) throw new Error('synthetic_privacy_lifecycle_store_unavailable');

  let keys;
  try {
    keys = await deriveStepKeys(value.actorRefHash);
  } catch {
    throw storeFailed();
  }
  const marker = await findCompletionMarker(database, keys);
  if (marker) {
    return response(
      'synthetic_privacy_lifecycle_already_completed',
      await readCounts(database, keys),
    );
  }

  const fixture = await findFixture(database);
  try {
    fixture.contactRefHash = await sha256(fixture.id);
  } catch {
    throw storeFailed();
  }

  await runPrimitive(() => recordConsentLifecycleEventToD1(database, {
    leadId: fixture.id,
    purpose: 'commercial_contact',
    action: 'granted',
    copyVersion: CONTACT_COPY_VERSION,
    actorRefHash: value.actorRefHash,
    idempotencyKey: keys['consent-grant'],
  }, value.primitiveOverrides));

  await applyRectification(database, fixture, value, keys);
  await applyExport(database, fixture, value, keys);

  let emailHmac;
  try {
    emailHmac = await hmacSha256(SYNTHETIC_EMAIL, value.suppressionHmacKey);
  } catch {
    throw storeFailed();
  }
  await applyWithdrawal(database, fixture, value, keys, emailHmac);
  await applyDeletion(database, fixture, value, keys, emailHmac);

  let contact;
  try {
    contact = await resolveContactStatusFromD1(database, fixture.id);
  } catch {
    throw storeFailed();
  }
  if (
    !isPlainRecord(contact)
    || contact.found !== true
    || contact.contactStatus !== 'erased'
    || contact.restricted !== false
  ) throw storeFailed();
  if (!await findCompletionMarker(database, keys)) throw storeFailed();

  return response(
    'synthetic_privacy_lifecycle_completed',
    await readCounts(database, keys),
  );
}

export function createSyntheticPrivacyLifecycleHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson
    || ((request) => readBoundedJsonBody(request, { maxBytes: 1024 }));
  const runLifecycle = overrides.runLifecycle || runSyntheticPrivacyLifecycle;

  return async function handleSyntheticPrivacyLifecycle(request, env = {}) {
    if (env.AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED !== 'true') {
      return httpFailure(404, 'synthetic_privacy_lifecycle_unavailable');
    }
    if (!validHttpBoundary(request)) {
      return httpFailure(403, 'synthetic_privacy_lifecycle_boundary_rejected');
    }
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return httpFailure(503, 'synthetic_privacy_lifecycle_misconfigured');
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token: request.headers.get('cf-access-jwt-assertion') || '',
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return httpFailure(403, 'synthetic_privacy_lifecycle_identity_rejected');
    }
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return httpFailure(403, 'synthetic_privacy_lifecycle_identity_rejected');
    }

    let actorHash;
    try {
      actorHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return httpFailure(403, 'synthetic_privacy_lifecycle_identity_rejected');
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0 || !runtimeReady(env)) {
      return httpFailure(503, 'synthetic_privacy_lifecycle_misconfigured');
    }
    if (!allowlist.has(actorHash)) {
      return httpFailure(403, 'synthetic_privacy_lifecycle_actor_not_allowed');
    }

    let rateLimit;
    try {
      rateLimit = await env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER.limit({
        key: `synthetic-privacy-lifecycle:${actorHash}`,
      });
    } catch {
      return httpFailure(503, 'synthetic_privacy_lifecycle_misconfigured');
    }
    if (!rateLimit || typeof rateLimit.success !== 'boolean') {
      return httpFailure(503, 'synthetic_privacy_lifecycle_misconfigured');
    }
    if (!rateLimit.success) {
      return httpFailure(429, 'synthetic_privacy_lifecycle_rate_limited');
    }

    let parsed;
    try {
      parsed = await readJson(request);
    } catch {
      return httpFailure(400, 'invalid_synthetic_privacy_lifecycle_request');
    }
    if (!parsed?.ok || !validHttpRequest(parsed.value)) {
      return httpFailure(
        Number.isInteger(parsed?.status) ? parsed.status : 400,
        'invalid_synthetic_privacy_lifecycle_request',
      );
    }

    let result;
    try {
      result = await runLifecycle(env.DB, {
        actorRefHash: actorHash,
        suppressionHmacKey: env.AFW_CONTACT_SUPPRESSION_HMAC_KEY,
      });
    } catch {
      return httpFailure(503, 'synthetic_privacy_lifecycle_failed');
    }
    if (!validHttpResult(result)) {
      return httpFailure(503, 'synthetic_privacy_lifecycle_failed');
    }

    return json(
      response(result.status, { ...EXPECTED_COUNTS }),
      result.status === 'synthetic_privacy_lifecycle_already_completed' ? 200 : 201,
    );
  };
}

export default createSyntheticPrivacyLifecycleHandler();
