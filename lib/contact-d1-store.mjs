import { deriveContactIntakeIdempotencyKeys } from './contact-idempotency.mjs';

const allowedConsentPurposes = new Set(['requested_plan', 'commercial_contact', 'product_updates']);

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isD1Database(database) {
  return Boolean(database && typeof database.prepare === 'function' && typeof database.batch === 'function');
}

function isUniqueIdempotencyError(error) {
  const message = error instanceof Error ? error.message : String(error || '');
  return message.includes('contact_leads.idempotency_key');
}

async function findByIdempotencyKeys(database, keys) {
  return database
    .prepare(`SELECT id, request_hash AS requestHash
      FROM contact_leads
      WHERE idempotency_key IN (?, ?)
      ORDER BY CASE WHEN idempotency_key = ? THEN 0 ELSE 1 END
      LIMIT 1`)
    .bind(keys.intakeKey, keys.tombstoneKey, keys.tombstoneKey)
    .first();
}

function batchChanges(results, expectedLength) {
  if (!Array.isArray(results) || results.length !== expectedLength) return null;
  const changes = [];
  for (const item of results) {
    if (item?.success !== true || !Number.isInteger(item?.meta?.changes)) return null;
    changes.push(item.meta.changes);
  }
  return changes;
}

function classifyExisting(existing, requestHash) {
  return existing.requestHash === requestHash
    ? { leadId: existing.id, duplicate: true, conflict: false }
    : { leadId: existing.id, duplicate: false, conflict: true };
}

export async function canonicalContactRequestHash(intake) {
  return sha256(JSON.stringify([
    intake.email,
    intake.name,
    intake.domain,
    intake.role,
    intake.organization,
    intake.locale,
    intake.objective,
    intake.source,
    intake.consentPurposes,
    intake.copyVersion,
  ]));
}

export async function saveContactIntakeToD1(database, intake, overrides = {}) {
  if (!isD1Database(database)) throw new Error('contact_store_unavailable');
  const requestedPurposes = Array.isArray(intake?.consentPurposes) ? intake.consentPurposes : [];
  const purposes = requestedPurposes.filter((purpose) => allowedConsentPurposes.has(purpose));
  if (
    !intake
    || typeof intake.idempotencyKey !== 'string'
    || purposes.length !== requestedPurposes.length
    || new Set(purposes).size !== purposes.length
    || purposes.length < 1
    || purposes.length > 3
  ) throw new Error('contact_store_invalid_input');

  let idempotencyKeys;
  try {
    idempotencyKeys = await deriveContactIntakeIdempotencyKeys(intake.idempotencyKey);
  } catch {
    throw new Error('contact_store_failed');
  }
  if (!idempotencyKeys) throw new Error('contact_store_invalid_input');

  const requestHash = await canonicalContactRequestHash(intake);
  const existing = await findByIdempotencyKeys(database, idempotencyKeys);
  if (existing) return classifyExisting(existing, requestHash);

  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date().toISOString()))();
  const leadId = randomUUID();
  const statements = [
    database.prepare(`INSERT INTO contact_leads (
      id, email, name, domain, role, organization, locale, objective,
      state, source, idempotency_key, request_hash, created_at, updated_at
    ) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      WHERE NOT EXISTS (
        SELECT 1 FROM contact_leads WHERE idempotency_key IN (?, ?)
      )`)
      .bind(
        leadId,
        intake.email,
        intake.name,
        intake.domain,
        intake.role,
        intake.organization,
        intake.locale,
        intake.objective,
        'new',
        intake.source,
        idempotencyKeys.intakeKey,
        requestHash,
        now,
        now,
        idempotencyKeys.intakeKey,
        idempotencyKeys.tombstoneKey,
      ),
  ];

  for (const purpose of purposes) {
    const evidenceHash = await sha256([leadId, purpose, intake.copyVersion, now].join('|'));
    statements.push(
      database.prepare(`INSERT INTO consent_receipts (
        id, lead_id, purpose, copy_version, action, evidence_hash, created_at
      ) SELECT ?, ?, ?, ?, ?, ?, ?
        WHERE EXISTS (
          SELECT 1 FROM contact_leads
          WHERE id = ? AND idempotency_key = ? AND request_hash = ?
        )`)
        .bind(
          randomUUID(),
          leadId,
          purpose,
          intake.copyVersion,
          'granted',
          evidenceHash,
          now,
          leadId,
          idempotencyKeys.intakeKey,
          requestHash,
        ),
    );
  }

  let changes;
  try {
    const results = await database.batch(statements);
    changes = batchChanges(results, statements.length);
    if (!changes) throw new Error('contact_store_batch_failed');
  } catch (error) {
    if (!isUniqueIdempotencyError(error)) throw new Error('contact_store_failed');
    const winner = await findByIdempotencyKeys(database, idempotencyKeys);
    if (!winner) throw new Error('contact_store_failed');
    return classifyExisting(winner, requestHash);
  }

  if (changes[0] === 0) {
    if (changes.some((count) => count !== 0)) throw new Error('contact_store_failed');
    const winner = await findByIdempotencyKeys(database, idempotencyKeys);
    if (!winner) throw new Error('contact_store_failed');
    return classifyExisting(winner, requestHash);
  }
  if (changes.some((count) => count !== 1)) throw new Error('contact_store_failed');

  return { leadId, duplicate: false, conflict: false };
}
