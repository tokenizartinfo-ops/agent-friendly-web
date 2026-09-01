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

async function findByIdempotencyKey(database, idempotencyKey) {
  return database
    .prepare('SELECT id, request_hash AS requestHash FROM contact_leads WHERE idempotency_key = ? LIMIT 1')
    .bind(idempotencyKey)
    .first();
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

  const requestHash = await canonicalContactRequestHash(intake);
  const existing = await findByIdempotencyKey(database, intake.idempotencyKey);
  if (existing) {
    return existing.requestHash === requestHash
      ? { leadId: existing.id, duplicate: true, conflict: false }
      : { leadId: existing.id, duplicate: false, conflict: true };
  }

  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date().toISOString()))();
  const leadId = randomUUID();
  const statements = [
    database.prepare(`INSERT INTO contact_leads (
      id, email, name, domain, role, organization, locale, objective,
      state, source, idempotency_key, request_hash, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
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
        intake.idempotencyKey,
        requestHash,
        now,
        now,
      ),
  ];

  for (const purpose of purposes) {
    const evidenceHash = await sha256([leadId, purpose, intake.copyVersion, now].join('|'));
    statements.push(
      database.prepare(`INSERT INTO consent_receipts (
        id, lead_id, purpose, copy_version, action, evidence_hash, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(randomUUID(), leadId, purpose, intake.copyVersion, 'granted', evidenceHash, now),
    );
  }

  try {
    const results = await database.batch(statements);
    if (!Array.isArray(results) || results.length !== statements.length || results.some((item) => item?.success === false)) {
      throw new Error('contact_store_batch_failed');
    }
  } catch (error) {
    if (!isUniqueIdempotencyError(error)) throw new Error('contact_store_failed');
    const winner = await findByIdempotencyKey(database, intake.idempotencyKey);
    if (!winner) throw new Error('contact_store_failed');
    return winner.requestHash === requestHash
      ? { leadId: winner.id, duplicate: true, conflict: false }
      : { leadId: winner.id, duplicate: false, conflict: true };
  }

  return { leadId, duplicate: false, conflict: false };
}
