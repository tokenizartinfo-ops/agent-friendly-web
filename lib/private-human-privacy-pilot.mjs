import { deriveContactIntakeIdempotencyKeys } from './contact-idempotency.mjs';
import { saveContactIntakeToD1 } from './contact-d1-store.mjs';
import { CONTACT_COPY_VERSION } from './contact-intake.mjs';
import { hashAccessSubject } from './access-subject-hash.mjs';
import { readBoundedJsonBody } from './bounded-json-body.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import {
  createPrivacyRequestToD1,
  recordConsentLifecycleEventToD1,
} from './contact-privacy-d1-store.mjs';
import {
  applyContactErasureToD1,
} from './contact-privacy-erasure.mjs';
import {
  CONTACT_PRIVACY_POLICY_VERSION,
  RETENTION_DAYS,
} from './contact-privacy-policy.mjs';

export const PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT =
  'agent-friendly-web.private-human-privacy-pilot.v1';

const ACTIONS = new Set([
  'enroll',
  'inspect_export',
  'rectify_locale',
  'withdraw_requested_plan',
  'erase',
]);
const LOCALES = new Set(['es', 'en', 'pt']);
const INPUT_FIELDS = new Set([
  'action',
  'actorRefHash',
  'email',
  'locale',
  'suppressionHmacKey',
]);
const OVERRIDE_FIELDS = new Set(['now', 'randomUUID']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAPABILITIES = Object.freeze({
  sendsEmail: false,
  createsProposal: false,
  chargesPayment: false,
  modifiesCustomerSite: false,
  acceptsPublicContacts: false,
});
const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/private-human-privacy-pilot';
const HTTP_CONFIRMATION = 'own_data_private_pilot';
const HTTP_FIELDS = new Set(['contract', 'action', 'locale', 'confirmation']);
const NO_STORE_HEADERS = { 'cache-control': 'no-store, private' };
const REQUESTS = Object.freeze({
  inspect_export: Object.freeze({ type: 'access_export', code: 'subject_export_verified' }),
  rectify_locale: Object.freeze({ type: 'rectification', code: 'locale_rectified' }),
  withdraw_requested_plan: Object.freeze({
    type: 'withdraw_consent',
    code: 'requested_plan_withdrawn',
  }),
  erase: Object.freeze({ type: 'deletion', code: 'identifiers_erased' }),
});

function invalidInput() {
  return new Error('private_human_privacy_pilot_invalid_input');
}

function invalidStep() {
  return new Error('private_human_privacy_pilot_step_invalid');
}

function storeFailed() {
  return new Error('private_human_privacy_pilot_store_failed');
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

function isD1(database) {
  return Boolean(
    database
    && typeof database.prepare === 'function'
    && typeof database.batch === 'function',
  );
}

function addTime(timestamp, { minutes = 0, days = 0 }) {
  const value = new Date(timestamp);
  value.setUTCMinutes(value.getUTCMinutes() + minutes);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString();
}

function normalizeTimestamp(value) {
  if (typeof value !== 'string' || value.length > 40) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString();
}

function validateArguments(input, overrides) {
  const value = exactDataRecord(input, INPUT_FIELDS);
  const deterministic = exactDataRecord(overrides, OVERRIDE_FIELDS, false);
  if (!value || !deterministic) throw invalidInput();
  const email = typeof value.email === 'string' ? value.email.trim().toLowerCase() : '';
  if (
    !ACTIONS.has(value.action)
    || typeof value.actorRefHash !== 'string'
    || !HASH.test(value.actorRefHash)
    || !EMAIL.test(email)
    || email.length > 254
    || !LOCALES.has(value.locale)
    || typeof value.suppressionHmacKey !== 'string'
  ) throw invalidInput();
  const keyLength = new TextEncoder().encode(value.suppressionHmacKey).byteLength;
  if (keyLength < 32 || keyLength > 1024) throw invalidInput();
  if (
    (Object.hasOwn(deterministic, 'now') && typeof deterministic.now !== 'function')
    || (Object.hasOwn(deterministic, 'randomUUID')
      && typeof deterministic.randomUUID !== 'function')
  ) throw invalidInput();

  let now;
  try {
    now = normalizeTimestamp(
      Object.hasOwn(deterministic, 'now') ? deterministic.now() : new Date().toISOString(),
    );
  } catch {
    throw invalidInput();
  }
  if (!now) throw invalidInput();
  return {
    ...value,
    email,
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

async function stableUuid(actorRefHash, name) {
  const bytes = (await sha256Bytes(JSON.stringify([
    PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT,
    actorRefHash,
    name,
  ]))).slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytesToHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
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

function prepare(database, sql, bindings) {
  try {
    return database.prepare(sql).bind(...bindings);
  } catch {
    throw storeFailed();
  }
}

async function first(database, sql, bindings) {
  try {
    return await database.prepare(sql).bind(...bindings).first();
  } catch {
    throw storeFailed();
  }
}

async function batch(database, statements, expectedChanges) {
  try {
    const results = await database.batch(statements);
    if (!Array.isArray(results) || results.length !== statements.length) throw storeFailed();
    const changes = results.map((result) => (
      result?.success === true && Number.isInteger(result?.meta?.changes)
        ? result.meta.changes
        : -1
    ));
    if (changes.some((change) => change < 0)) throw storeFailed();
    if (
      Array.isArray(expectedChanges)
      && expectedChanges.some((expected, index) => changes[index] !== expected)
    ) throw storeFailed();
    return changes;
  } catch {
    throw storeFailed();
  }
}

async function primitive(operation) {
  try {
    return await operation();
  } catch {
    throw storeFailed();
  }
}

async function deriveKeys(actorRefHash) {
  const intakeKey = await stableUuid(actorRefHash, 'enroll');
  const contactKeys = await deriveContactIntakeIdempotencyKeys(intakeKey);
  if (!contactKeys) throw storeFailed();
  const requestEntries = await Promise.all(
    Object.keys(REQUESTS).map(async (action) => [
      action,
      await stableUuid(actorRefHash, `request:${action}`),
    ]),
  );
  return {
    intakeKey,
    tombstoneKey: contactKeys.tombstoneKey,
    requestKeys: Object.fromEntries(requestEntries),
    withdrawalKey: await stableUuid(actorRefHash, 'consent:withdraw_requested_plan'),
    erasureKey: await stableUuid(actorRefHash, 'erasure'),
  };
}

async function findLead(database, keys) {
  const row = await first(
    database,
    `SELECT id, email, name, domain, role, organization, locale, objective,
      state, source, idempotency_key AS idempotencyKey,
      last_interaction_at AS lastInteractionAt,
      retention_expires_at AS retentionExpiresAt,
      erased_at AS erasedAt, privacy_policy_version AS policyVersion,
      restriction_state AS restrictionState
      FROM contact_leads
      WHERE idempotency_key IN (?, ?)
      ORDER BY CASE WHEN idempotency_key = ? THEN 0 ELSE 1 END
      LIMIT 1`,
    [keys.intakeKey, keys.tombstoneKey, keys.intakeKey],
  );
  if (row === null || row === undefined) return null;
  const fields = [
    'id', 'email', 'name', 'domain', 'role', 'organization', 'locale', 'objective',
    'state', 'source', 'idempotencyKey', 'lastInteractionAt', 'retentionExpiresAt',
    'erasedAt', 'policyVersion', 'restrictionState',
  ];
  const value = selectedDataRecord(row, fields);
  if (!value || fields.some((field) => typeof value[field] !== 'string') || !UUID.test(value.id)) {
    throw storeFailed();
  }
  return value;
}

async function findRequest(database, idempotencyKey) {
  const row = await first(
    database,
    `SELECT id, request_type AS requestType, contact_ref_hash AS contactRefHash,
      status, verification_hash AS verificationHash,
      verification_expires_at AS verificationExpiresAt,
      policy_version AS policyVersion, decision_code AS decisionCode,
      idempotency_key AS idempotencyKey, request_hash AS requestHash,
      verified_at AS verifiedAt, resolved_at AS resolvedAt, expires_at AS expiresAt
      FROM privacy_requests WHERE idempotency_key = ? LIMIT 1`,
    [idempotencyKey],
  );
  if (row === null || row === undefined) return null;
  const fields = [
    'id', 'requestType', 'contactRefHash', 'status', 'verificationHash',
    'verificationExpiresAt', 'policyVersion', 'decisionCode', 'idempotencyKey',
    'requestHash', 'verifiedAt', 'resolvedAt', 'expiresAt',
  ];
  const value = selectedDataRecord(row, fields);
  if (!value || fields.some((field) => typeof value[field] !== 'string')) throw storeFailed();
  return value;
}

async function stage(database, lead, keys) {
  if (lead.state === 'erased') return 5;
  if (lead.state !== 'new') throw storeFailed();
  const requests = Object.create(null);
  for (const [action, key] of Object.entries(keys.requestKeys)) {
    requests[action] = await findRequest(database, key);
  }
  if (requests.withdraw_requested_plan?.status === 'resolved') return 4;
  if (requests.rectify_locale?.status === 'resolved') return 3;
  if (requests.inspect_export?.status === 'resolved') return 2;
  return 1;
}

function assertActiveOwner(lead, value) {
  if (
    lead.state !== 'new'
    || lead.erasedAt !== ''
    || lead.email !== value.email
    || lead.domain !== 'agentfriendlyweb.dev'
    || !LOCALES.has(lead.locale)
  ) throw invalidStep();
}

function response(step, lead, { already = false, includeExport = false } = {}) {
  const result = {
    status: already
      ? 'private_human_privacy_pilot_step_already_completed'
      : 'private_human_privacy_pilot_step_completed',
    step,
    contactStatus: lead.state === 'erased' ? 'erased' : 'active',
    restricted: lead.restrictionState === 'restricted',
    requestedPlanConsent: step === 'withdraw_requested_plan' || lead.state === 'erased'
      ? false
      : true,
    capabilities: CAPABILITIES,
  };
  if (includeExport) {
    result.export = {
      email: lead.email,
      domain: lead.domain,
      locale: lead.locale,
      objective: lead.objective,
      source: lead.source,
    };
  }
  return result;
}

async function ensureRequest(database, value, lead, keys, action) {
  const descriptor = REQUESTS[action];
  const idempotencyKey = keys.requestKeys[action];
  const contactRefHash = await sha256(lead.id);
  const verificationHash = await sha256(JSON.stringify([
    PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT,
    value.actorRefHash,
    action,
    'access-verified',
  ]));
  let existing = await findRequest(database, idempotencyKey);
  const temporal = existing
    ? {
      verificationExpiresAt: existing.verificationExpiresAt,
      expiresAt: existing.expiresAt,
    }
    : {
      verificationExpiresAt: addTime(value.now, { minutes: 15 }),
      expiresAt: addTime(value.now, { days: 1 }),
    };
  const created = await primitive(() => createPrivacyRequestToD1(database, {
    requestType: descriptor.type,
    contactRefHash,
    verificationHash,
    verificationExpiresAt: temporal.verificationExpiresAt,
    expiresAt: temporal.expiresAt,
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey,
  }, value.primitiveOverrides));
  if (created.conflict) throw invalidStep();
  existing = await findRequest(database, idempotencyKey);
  if (
    !existing
    || existing.requestType !== descriptor.type
    || existing.contactRefHash !== contactRefHash
    || existing.verificationHash !== verificationHash
    || existing.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || !['pending_verification', 'resolved'].includes(existing.status)
  ) throw storeFailed();
  return { ...existing, code: descriptor.code };
}

function resolutionStatement(database, request, now, prerequisiteSql, prerequisiteBindings) {
  return prepare(
    database,
    `UPDATE privacy_requests SET status = 'resolved', decision_code = ?,
      verified_at = ?, resolved_at = ?
      WHERE idempotency_key = ? AND status = 'pending_verification'
        AND EXISTS (${prerequisiteSql})`,
    [request.code, now, now, request.idempotencyKey, ...prerequisiteBindings],
  );
}

async function enroll(database, value, keys) {
  let lead = await findLead(database, keys);
  if (lead?.state === 'erased') throw new Error('private_human_privacy_pilot_closed');
  if (lead) {
    assertActiveOwner(lead, value);
    if (await stage(database, lead, keys) !== 1) throw invalidStep();
    if (
      lead.policyVersion === CONTACT_PRIVACY_POLICY_VERSION
      && lead.lastInteractionAt
      && lead.retentionExpiresAt
    ) return response('enroll', lead, { already: true });
  }

  const saved = await primitive(() => saveContactIntakeToD1(database, {
    email: value.email,
    name: '',
    domain: 'agentfriendlyweb.dev',
    role: '',
    organization: '',
    locale: value.locale,
    objective: 'request_pilot',
    source: 'direct',
    idempotencyKey: keys.intakeKey,
    requestedPlanConsent: true,
    commercialContactConsent: false,
    productUpdatesConsent: false,
    consentPurposes: ['requested_plan'],
    copyVersion: CONTACT_COPY_VERSION,
  }, value.primitiveOverrides));
  if (saved.conflict) throw invalidStep();
  lead = await findLead(database, keys);
  if (!lead || lead.id !== saved.leadId) throw storeFailed();
  assertActiveOwner(lead, value);
  if (!lead.policyVersion) {
    await batch(database, [prepare(
      database,
      `UPDATE contact_leads SET last_interaction_at = ?, retention_expires_at = ?,
        privacy_policy_version = ?, updated_at = ?
        WHERE id = ? AND state = 'new' AND email = ? AND privacy_policy_version = ''`,
      [
        value.now,
        addTime(value.now, { days: RETENTION_DAYS.requested_plan }),
        CONTACT_PRIVACY_POLICY_VERSION,
        value.now,
        lead.id,
        value.email,
      ],
    )], [1]);
    lead = await findLead(database, keys);
  }
  if (!lead) throw storeFailed();
  return response('enroll', lead);
}

async function inspectExport(database, value, lead, keys, currentStage) {
  if (currentStage > 2 || currentStage < 1) throw invalidStep();
  assertActiveOwner(lead, value);
  const request = await ensureRequest(database, value, lead, keys, 'inspect_export');
  if (request.status === 'pending_verification') {
    await batch(database, [resolutionStatement(
      database,
      request,
      value.now,
      `SELECT 1 FROM contact_leads WHERE id = ? AND email = ? AND state = 'new'`,
      [lead.id, value.email],
    )], [1]);
  }
  const refreshed = await findLead(database, keys);
  if (!refreshed) throw storeFailed();
  return response('inspect_export', refreshed, {
    already: currentStage === 2,
    includeExport: true,
  });
}

async function rectifyLocale(database, value, lead, keys, currentStage) {
  if (currentStage < 2 || currentStage > 3) throw invalidStep();
  assertActiveOwner(lead, value);
  const request = await ensureRequest(database, value, lead, keys, 'rectify_locale');
  if (request.status === 'resolved') {
    if (lead.locale !== value.locale) throw invalidStep();
    return response('rectify_locale', lead, { already: true, includeExport: true });
  }
  if (lead.locale === value.locale) throw invalidStep();
  await batch(database, [
    prepare(
      database,
      `UPDATE contact_leads SET locale = ?, updated_at = ?
        WHERE id = ? AND email = ? AND state = 'new' AND locale <> ?`,
      [value.locale, value.now, lead.id, value.email, value.locale],
    ),
    resolutionStatement(
      database,
      request,
      value.now,
      `SELECT 1 FROM contact_leads WHERE id = ? AND locale = ? AND state = 'new'`,
      [lead.id, value.locale],
    ),
  ], [1, 1]);
  const refreshed = await findLead(database, keys);
  if (!refreshed) throw storeFailed();
  return response('rectify_locale', refreshed, { includeExport: true });
}

async function withdrawRequestedPlan(database, value, lead, keys, currentStage) {
  if (currentStage < 3 || currentStage > 4) throw invalidStep();
  assertActiveOwner(lead, value);
  const request = await ensureRequest(
    database,
    value,
    lead,
    keys,
    'withdraw_requested_plan',
  );
  if (request.status === 'resolved') {
    if (lead.restrictionState !== 'restricted') throw storeFailed();
    return response('withdraw_requested_plan', lead, { already: true });
  }
  await primitive(() => recordConsentLifecycleEventToD1(database, {
    leadId: lead.id,
    purpose: 'requested_plan',
    action: 'withdrawn',
    copyVersion: CONTACT_COPY_VERSION,
    actorRefHash: value.actorRefHash,
    idempotencyKey: keys.withdrawalKey,
  }, value.primitiveOverrides));
  await batch(database, [
    prepare(
      database,
      `UPDATE contact_leads SET restriction_state = 'restricted', updated_at = ?
        WHERE id = ? AND email = ? AND state = 'new'
          AND restriction_state = 'none'
          AND EXISTS (
            SELECT 1 FROM contact_consent_events
            WHERE idempotency_key = ? AND action = 'withdrawn'
          )`,
      [value.now, lead.id, value.email, keys.withdrawalKey],
    ),
    resolutionStatement(
      database,
      request,
      value.now,
      `SELECT 1 FROM contact_leads
        WHERE id = ? AND restriction_state = 'restricted' AND state = 'new'`,
      [lead.id],
    ),
  ], [1, 1]);
  const refreshed = await findLead(database, keys);
  if (!refreshed) throw storeFailed();
  return response('withdraw_requested_plan', refreshed);
}

function erasureDatabaseWithResolution(database, resolution) {
  return {
    prepare(sql) {
      return database.prepare(sql);
    },
    async batch(statements) {
      const results = await database.batch([...statements, resolution]);
      if (!Array.isArray(results) || results.length !== statements.length + 1) return results;
      const final = results.at(-1);
      if (final?.success !== true || final?.meta?.changes !== 1) return [];
      return results.slice(0, -1);
    },
  };
}

async function erase(database, value, lead, keys, currentStage) {
  if (lead.state === 'erased') {
    const request = await findRequest(database, keys.requestKeys.erase);
    if (request?.status !== 'resolved' || request.decisionCode !== REQUESTS.erase.code) {
      throw storeFailed();
    }
    return {
      ...response('erase', lead),
      status: 'private_human_privacy_pilot_already_completed',
    };
  }
  if (currentStage !== 4 || lead.restrictionState !== 'restricted') throw invalidStep();
  assertActiveOwner(lead, value);
  const request = await ensureRequest(database, value, lead, keys, 'erase');
  const resolution = resolutionStatement(
    database,
    request,
    value.now,
    `SELECT 1 FROM contact_leads WHERE id = ? AND state = 'erased'`,
    [lead.id],
  );
  const emailHmac = await hmacSha256(value.email, value.suppressionHmacKey);
  const result = await primitive(() => applyContactErasureToD1(
    erasureDatabaseWithResolution(database, resolution),
    {
      leadId: lead.id,
      emailHmac,
      purpose: 'requested_plan',
      policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
      idempotencyKey: keys.erasureKey,
    },
    value.primitiveOverrides,
  ));
  if (result.erased !== true || result.contactStatus !== 'erased') throw storeFailed();
  const refreshed = await findLead(database, keys);
  const resolved = await findRequest(database, keys.requestKeys.erase);
  if (!refreshed || refreshed.state !== 'erased' || resolved?.status !== 'resolved') {
    throw storeFailed();
  }
  return {
    ...response('erase', refreshed),
    status: 'private_human_privacy_pilot_completed',
  };
}

export async function runPrivateHumanPrivacyPilotAction(database, input, overrides = {}) {
  const value = validateArguments(input, overrides);
  if (!isD1(database)) throw new Error('private_human_privacy_pilot_store_unavailable');
  let keys;
  try {
    keys = await deriveKeys(value.actorRefHash);
  } catch {
    throw storeFailed();
  }
  if (value.action === 'enroll') return enroll(database, value, keys);

  const lead = await findLead(database, keys);
  if (!lead) throw invalidStep();
  const currentStage = await stage(database, lead, keys);
  if (value.action === 'inspect_export') {
    return inspectExport(database, value, lead, keys, currentStage);
  }
  if (value.action === 'rectify_locale') {
    return rectifyLocale(database, value, lead, keys, currentStage);
  }
  if (value.action === 'withdraw_requested_plan') {
    return withdrawRequestedPlan(database, value, lead, keys, currentStage);
  }
  return erase(database, value, lead, keys, currentStage);
}

function httpFailure(status, code) {
  return Response.json({ ok: false, code }, { status, headers: NO_STORE_HEADERS });
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

function validHttpRequest(input) {
  const value = exactDataRecord(input, HTTP_FIELDS);
  return value
    && value.contract === PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT
    && ACTIONS.has(value.action)
    && LOCALES.has(value.locale)
    && value.confirmation === HTTP_CONFIRMATION
    ? value
    : null;
}

function allowedSubjectHashes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

function runtimeReady(env) {
  return Boolean(
    env?.DB
    && typeof env.AFW_CONTACT_SUPPRESSION_HMAC_KEY === 'string'
    && new TextEncoder().encode(env.AFW_CONTACT_SUPPRESSION_HMAC_KEY).byteLength >= 32
    && typeof env.AFW_PRIVATE_HUMAN_PRIVACY_RATE_LIMITER?.limit === 'function',
  );
}

function validCapabilities(value) {
  const capabilities = exactDataRecord(value, new Set(Object.keys(CAPABILITIES)));
  return Boolean(
    capabilities
    && Object.entries(CAPABILITIES).every(([key, expected]) => capabilities[key] === expected),
  );
}

function safeHttpResult(result, expectedAction, expectedEmail) {
  const baseFields = new Set([
    'status',
    'step',
    'contactStatus',
    'restricted',
    'requestedPlanConsent',
    'capabilities',
    'export',
  ]);
  const value = exactDataRecord(result, baseFields, false);
  if (
    !value
    || value.step !== expectedAction
    || ![
      'private_human_privacy_pilot_step_completed',
      'private_human_privacy_pilot_step_already_completed',
      'private_human_privacy_pilot_completed',
      'private_human_privacy_pilot_already_completed',
    ].includes(value.status)
    || !['active', 'erased'].includes(value.contactStatus)
    || typeof value.restricted !== 'boolean'
    || typeof value.requestedPlanConsent !== 'boolean'
    || !validCapabilities(value.capabilities)
  ) return null;

  const mayExport = expectedAction === 'inspect_export' || expectedAction === 'rectify_locale';
  if (!mayExport && Object.hasOwn(value, 'export')) return null;
  if (mayExport) {
    const exported = exactDataRecord(
      value.export,
      new Set(['email', 'domain', 'locale', 'objective', 'source']),
    );
    if (
      !exported
      || exported.email !== expectedEmail
      || exported.domain !== 'agentfriendlyweb.dev'
      || !LOCALES.has(exported.locale)
      || exported.objective !== 'request_pilot'
      || exported.source !== 'direct'
    ) return null;
  }
  return { ok: true, ...value };
}

export function createPrivateHumanPrivacyPilotHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson
    || ((request) => readBoundedJsonBody(request, { maxBytes: 8192 }));
  const runAction = overrides.runAction || runPrivateHumanPrivacyPilotAction;

  return async function handlePrivateHumanPrivacyPilot(request, env = {}) {
    if (env.AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED !== 'true') {
      return httpFailure(404, 'private_human_privacy_pilot_unavailable');
    }
    if (env.AFW_CANARY_DIAGNOSTICS_ENABLED !== 'true' || !validHttpBoundary(request)) {
      return httpFailure(403, 'private_human_privacy_pilot_boundary_rejected');
    }
    const token = request.headers.get('cf-access-jwt-assertion') || '';
    if (!token) return httpFailure(401, 'private_human_privacy_pilot_identity_required');
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return httpFailure(503, 'private_human_privacy_pilot_misconfigured');
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token,
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return httpFailure(403, 'private_human_privacy_pilot_identity_rejected');
    }
    const accessEmail = typeof access?.identity?.email === 'string'
      ? access.identity.email.trim().toLowerCase()
      : '';
    if (
      !access?.ok
      || typeof access.identity?.userId !== 'string'
      || !access.identity.userId
      || !EMAIL.test(accessEmail)
      || accessEmail.length > 254
    ) return httpFailure(403, 'private_human_privacy_pilot_identity_rejected');

    let actorRefHash;
    try {
      actorRefHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return httpFailure(403, 'private_human_privacy_pilot_identity_rejected');
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0 || !runtimeReady(env)) {
      return httpFailure(503, 'private_human_privacy_pilot_misconfigured');
    }
    if (!allowlist.has(actorRefHash)) {
      return httpFailure(403, 'private_human_privacy_pilot_actor_not_allowed');
    }

    let rateLimit;
    try {
      rateLimit = await env.AFW_PRIVATE_HUMAN_PRIVACY_RATE_LIMITER.limit({
        key: `private-human-privacy:${actorRefHash}`,
      });
    } catch {
      return httpFailure(503, 'private_human_privacy_pilot_misconfigured');
    }
    if (rateLimit?.success !== true) {
      return httpFailure(429, 'private_human_privacy_pilot_rate_limited');
    }

    const parsed = await readJson(request);
    if (!parsed?.ok) {
      const status = parsed?.status === 413 ? 413 : parsed?.status === 415 ? 415 : 400;
      return httpFailure(status, 'private_human_privacy_pilot_request_invalid');
    }
    const body = validHttpRequest(parsed.value);
    if (!body) return httpFailure(400, 'private_human_privacy_pilot_request_invalid');

    try {
      const result = await runAction(env.DB, {
        action: body.action,
        actorRefHash,
        email: accessEmail,
        locale: body.locale,
        suppressionHmacKey: env.AFW_CONTACT_SUPPRESSION_HMAC_KEY,
      });
      const safe = safeHttpResult(result, body.action, accessEmail);
      return safe
        ? Response.json(safe, { status: 200, headers: NO_STORE_HEADERS })
        : httpFailure(503, 'private_human_privacy_pilot_failed');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'private_human_privacy_pilot_invalid_input') {
          return httpFailure(400, 'private_human_privacy_pilot_request_invalid');
        }
        if (
          error.message === 'private_human_privacy_pilot_step_invalid'
          || error.message === 'private_human_privacy_pilot_closed'
        ) return httpFailure(409, error.message);
      }
      return httpFailure(503, 'private_human_privacy_pilot_failed');
    }
  };
}

export default createPrivateHumanPrivacyPilotHandler();
