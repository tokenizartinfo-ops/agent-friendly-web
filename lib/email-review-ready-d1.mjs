import { validateEmailReviewReadyRequest } from './email-review-ready.mjs';

const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const FAILURE_CODE = /^[a-z][a-z0-9_]{2,63}$/;

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isD1Database(database) {
  return Boolean(database && typeof database.prepare === 'function');
}

function requireDatabase(database) {
  if (!isD1Database(database)) throw new Error('email_review_ready_store_unavailable');
}

function rowProjection(row) {
  if (!row) return null;
  return {
    id: String(row.id || ''),
    eventId: String(row.eventId || ''),
    requestHash: String(row.requestHash || ''),
    status: String(row.status || ''),
  };
}

function classifyExisting(row, requestHash) {
  const existing = rowProjection(row);
  if (!existing?.id || !['reserved', 'sent', 'failed'].includes(existing.status)) {
    throw new Error('email_review_ready_store_invalid_row');
  }
  return {
    reservationId: existing.id,
    state: existing.status,
    duplicate: existing.requestHash === requestHash,
    conflict: existing.requestHash !== requestHash,
  };
}

async function findByIdempotencyKey(database, idempotencyKey) {
  return database
    .prepare(`SELECT id, event_id AS eventId, request_hash AS requestHash, status
      FROM email_transactional_deliveries WHERE idempotency_key = ? LIMIT 1`)
    .bind(idempotencyKey)
    .first();
}

async function findByEventId(database, eventId) {
  return database
    .prepare(`SELECT id, event_id AS eventId, request_hash AS requestHash, status
      FROM email_transactional_deliveries WHERE event_id = ? LIMIT 1`)
    .bind(eventId)
    .first();
}

async function findAfterUniqueRace(database, request) {
  return database
    .prepare(`SELECT id, event_id AS eventId, request_hash AS requestHash, status
      FROM email_transactional_deliveries
      WHERE idempotency_key = ? OR event_id = ? LIMIT 1`)
    .bind(request.idempotencyKey, request.eventId)
    .first();
}

function isUniqueReservationError(error) {
  const message = error instanceof Error ? error.message : String(error || '');
  return message.includes('email_transactional_deliveries.') && message.includes('UNIQUE constraint failed');
}

function updateSucceeded(result) {
  return result?.success !== false && Number(result?.meta?.changes || 0) === 1;
}

export async function canonicalEmailReviewReadyRequestHash(request, actorHash) {
  const validation = validateEmailReviewReadyRequest(request);
  if (!validation.ok || !HASH.test(String(actorHash || ''))) {
    throw new Error('email_review_ready_store_invalid_input');
  }
  const value = validation.value;
  return sha256(JSON.stringify([
    value.contract,
    value.eventId,
    value.idempotencyKey,
    value.templateId,
    value.locale,
    value.purpose,
    actorHash,
  ]));
}

export async function reserveEmailReviewReadyDelivery(database, request, actorHash, overrides = {}) {
  requireDatabase(database);
  const requestHash = await canonicalEmailReviewReadyRequestHash(request, actorHash);
  const validation = validateEmailReviewReadyRequest(request);
  if (!validation.ok) throw new Error('email_review_ready_store_invalid_input');
  const value = validation.value;

  const byKey = await findByIdempotencyKey(database, value.idempotencyKey);
  if (byKey) return classifyExisting(byKey, requestHash);
  const byEvent = await findByEventId(database, value.eventId);
  if (byEvent) return classifyExisting(byEvent, requestHash);

  const now = (overrides.now || (() => new Date().toISOString()))();
  const reservationId = (overrides.randomUUID || (() => globalThis.crypto.randomUUID()))();
  if (!UUID.test(reservationId) || Number.isNaN(Date.parse(now))) {
    throw new Error('email_review_ready_store_invalid_input');
  }

  try {
    const result = await database
      .prepare(`INSERT INTO email_transactional_deliveries (
        id, event_id, template_id, locale, purpose, actor_subject_hash,
        idempotency_key, request_hash, status, provider_delivery_hash,
        failure_code, created_at, sent_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'reserved', '', '', ?, '', ?)`)
      .bind(
        reservationId,
        value.eventId,
        value.templateId,
        value.locale,
        value.purpose,
        actorHash,
        value.idempotencyKey,
        requestHash,
        now,
        now,
      )
      .run();
    if (!updateSucceeded(result)) throw new Error('email_review_ready_store_failed');
  } catch (error) {
    if (!isUniqueReservationError(error)) throw new Error('email_review_ready_store_failed');
    const winner = await findAfterUniqueRace(database, value);
    if (!winner) throw new Error('email_review_ready_store_failed');
    return classifyExisting(winner, requestHash);
  }

  return { reservationId, state: 'reserved', duplicate: false, conflict: false };
}

export async function markEmailReviewReadySent(database, reservationId, providerId, overrides = {}) {
  requireDatabase(database);
  if (!UUID.test(String(reservationId || '')) || typeof providerId !== 'string' || !providerId || providerId.length > 200) {
    throw new Error('email_review_ready_store_invalid_input');
  }
  const now = (overrides.now || (() => new Date().toISOString()))();
  if (Number.isNaN(Date.parse(now))) throw new Error('email_review_ready_store_invalid_input');
  const providerHash = await sha256(providerId);
  const result = await database
    .prepare(`UPDATE email_transactional_deliveries
      SET status = 'sent', provider_delivery_hash = ?, sent_at = ?, updated_at = ?
      WHERE id = ? AND status = 'reserved'`)
    .bind(providerHash, now, now, reservationId)
    .run();
  return { updated: updateSucceeded(result) };
}

export async function markEmailReviewReadyFailed(database, reservationId, code, overrides = {}) {
  requireDatabase(database);
  if (!UUID.test(String(reservationId || '')) || !FAILURE_CODE.test(String(code || ''))) {
    throw new Error('email_review_ready_store_invalid_input');
  }
  const now = (overrides.now || (() => new Date().toISOString()))();
  if (Number.isNaN(Date.parse(now))) throw new Error('email_review_ready_store_invalid_input');
  const result = await database
    .prepare(`UPDATE email_transactional_deliveries
      SET status = 'failed', failure_code = ?, updated_at = ?
      WHERE id = ? AND status = 'reserved'`)
    .bind(code, now, reservationId)
    .run();
  return { updated: updateSucceeded(result) };
}
