# Agent Friendly Web Contact Privacy Lifecycle v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar localmente una politica ejecutable de consentimiento, retencion, derechos y supresion antes de aceptar cualquier contacto real.

**Architecture:** Un modulo puro define reglas y resultados deterministas; adaptadores D1 separados persisten eventos metadata-only y aplican la supresion de forma atomica. La migracion es aditiva, el CRM conserva solo una referencia opaca y un estado de privacidad, y un contrato publico describe capacidades locales reales mientras cuatro kill switches permanecen apagados.

**Tech Stack:** Node.js 22, JavaScript ESM, TypeScript, `node:test`, Drizzle ORM, SQLite/D1, Cloudflare Workers y vinext.

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md`

## Global Constraints

- Proyecto exclusivo: Agent Friendly Web, repositorio `tokenizartinfo-ops/agent-friendly-web`.
- Origen publico canonico: `https://agentfriendlyweb.dev`; no usar `*.chatgpt.site`.
- Tokenizart es solo un caso documentado; no usar repositorios, Workers, D1, Access, R2 ni secretos `tokenizart-*`.
- Gate 6D.4B es local: no ejecutar migraciones remotas, deploys, escrituras canary, correo ni trafico real.
- Todos los flags faltantes o distintos de la cadena exacta `true` equivalen a deshabilitados.
- `AFW_REAL_CONTACT_ENABLED`, `AFW_PRIVACY_REQUESTS_ENABLED`, `AFW_RETENTION_JOBS_ENABLED` y `AFW_PRODUCT_UPDATES_ENABLED` permanecen en `false`.
- La auditoria publica continua sin exigir email.
- El CRM no almacena email, nombre, telefono, cuerpos ni credenciales.
- Los logs y eventos de privacidad conservan metadata y hashes no reversibles, nunca PII o tokens.
- Los fixtures usan exclusivamente dominios reservados `.invalid`.
- No declarar cumplimiento juridico global; describir el contrato como base tecnica sujeta a revision aplicable.
- Toda modificacion de comportamiento comienza con una prueba que falla y termina con la prueba pasando.
- Antes de cerrar el gate, ejecutar `npm test`, `npm run lint`, `npm run build` y `npm run web:deploy:dry-run`.

## File Structure

### New files

- `lib/contact-privacy-policy.mjs`: finalidades, acciones, plazos y decisiones puras.
- `lib/contact-privacy-d1-store.mjs`: eventos de consentimiento y solicitudes de derechos sin PII.
- `lib/contact-privacy-erasure.mjs`: supresion atomica y resolucion saneada de `contactRef`.
- `test/contact-privacy-policy.test.mjs`: contrato puro y calculo de retencion.
- `test/contact-privacy-d1-store.test.mjs`: idempotencia y bindings saneados del repositorio.
- `test/contact-privacy-erasure.test.mjs`: borrado, tombstone CRM y fallo cerrado.
- `test/block6d4-local-migration.test.mjs`: migracion aditiva sobre SQLite vacio y poblado.
- `test/contact-privacy-contract.test.mjs`: contrato machine-readable y flags OFF.
- `public/.well-known/contact-privacy-lifecycle-contract.json`: capacidades y limites verificables.
- `drizzle/0008_contact_privacy_lifecycle.sql`: migracion generada y renombrada de forma estable.
- `drizzle/meta/0008_snapshot.json`: snapshot generado por Drizzle.
- `docs/BLOCK-6D4B-CONTACT-PRIVACY-LOCAL-GATE-2026-09-03.md`: evidencia local de cierre.

### Modified files

- `db/schema.ts`: campos de lifecycle y tablas append-only.
- `drizzle/meta/_journal.json`: entrada `0008_contact_privacy_lifecycle`.
- `wrangler.jsonc`: cuatro kill switches explicitamente OFF en base, canary y produccion.
- `worker-configuration.d.ts`: tipos regenerados si Wrangler detecta los nuevos bindings.
- `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`: estado real de Gate 6D.4B.
- `docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md`: siguiente gate 6D.4C sintetico.
- `docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md`: aclaracion de la evolucion aditiva de recibos legacy.

---

### Task 1: Pure Privacy Policy Module

**Files:**
- Create: `lib/contact-privacy-policy.mjs`
- Create: `test/contact-privacy-policy.test.mjs`

**Interfaces:**
- Consumes: timestamps ISO-8601, finalidades y eventos ya normalizados.
- Produces: `CONTACT_PRIVACY_POLICY_VERSION`, `RETENTION_DAYS`, `PRIVACY_REQUEST_EFFECTS`, `deriveConsentStatus(events, purpose)`, `calculateRetentionDeadline(input)`, `planRetentionAction(input)`, `privacyRequestEffect(requestType)` y `validatePrivacyRequestMetadata(input)`.

- [ ] **Step 1: Write the failing consent and retention tests**

Create `test/contact-privacy-policy.test.mjs` with these cases:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CONTACT_PRIVACY_POLICY_VERSION,
  PRIVACY_REQUEST_EFFECTS,
  RETENTION_DAYS,
  calculateRetentionDeadline,
  deriveConsentStatus,
  planRetentionAction,
  privacyRequestEffect,
  validatePrivacyRequestMetadata,
} from '../lib/contact-privacy-policy.mjs';

test('derives each consent independently from an immutable event sequence', () => {
  const events = [
    { id: 'evt-1', purpose: 'requested_plan', action: 'granted', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 'evt-2', purpose: 'product_updates', action: 'granted', createdAt: '2026-01-02T00:00:00.000Z' },
    { id: 'evt-3', purpose: 'product_updates', action: 'withdrawn', createdAt: '2026-01-03T00:00:00.000Z' },
  ];
  assert.equal(deriveConsentStatus(events, 'requested_plan'), 'granted');
  assert.equal(deriveConsentStatus(events, 'commercial_contact'), 'none');
  assert.equal(deriveConsentStatus(events, 'product_updates'), 'withdrawn');
});

test('uses the approved deterministic retention defaults', () => {
  assert.deepEqual(RETENTION_DAYS, {
    requested_plan: 180,
    commercial_contact: 365,
    product_updates: 730,
    consent_evidence: 730,
    suppression: 730,
    synthetic: 7,
  });
  assert.equal(calculateRetentionDeadline({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
  }).dueAt, '2026-06-30T00:00:00.000Z');
  assert.equal(calculateRetentionDeadline({
    purpose: 'product_updates',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
  }).dueAt, '2028-01-01T00:00:00.000Z');
  assert.equal(calculateRetentionDeadline({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    synthetic: true,
  }).dueAt, '2026-01-08T00:00:00.000Z');
});

test('plans expiry and rejects an indefinite hold', () => {
  assert.equal(planRetentionAction({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: '2026-07-01T00:00:00.000Z',
  }).action, 'erase_identifiers');
  assert.deepEqual(planRetentionAction({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: '2026-07-01T00:00:00.000Z',
    hold: { reasonCode: 'legal_claim', expiresAt: '' },
  }), { ok: false, code: 'privacy_hold_expiry_required' });
});

test('validates privacy request metadata without accepting PII or free text', () => {
  const valid = validatePrivacyRequestMetadata({
    requestType: 'access_export',
    contactRefHash: 'a'.repeat(64),
    verificationHash: 'b'.repeat(64),
    verificationExpiresAt: '2026-09-03T22:15:00.000Z',
    expiresAt: '2026-09-10T22:00:00.000Z',
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
  });
  assert.equal(valid.ok, true);
  assert.equal('email' in valid.value, false);
  assert.equal(validatePrivacyRequestMetadata({ ...valid.value, email: 'person@example.com' }).ok, false);
});

test('maps every right to one bounded effect without executing it', () => {
  assert.deepEqual(PRIVACY_REQUEST_EFFECTS, {
    access_export: 'prepare_subject_export',
    rectification: 'update_allowlisted_fields',
    withdraw_consent: 'record_purpose_withdrawal',
    deletion: 'erase_identifiers',
    restriction: 'restrict_processing',
    consent_status: 'report_consent_state',
  });
  assert.equal(privacyRequestEffect('deletion'), 'erase_identifiers');
  assert.equal(privacyRequestEffect('unknown'), 'unsupported');
});
```

- [ ] **Step 2: Run the new test and confirm the red state**

Run:

```powershell
node --test test/contact-privacy-policy.test.mjs
```

Expected: FAIL because `lib/contact-privacy-policy.mjs` does not exist.

- [ ] **Step 3: Implement the minimal deterministic policy**

Create `lib/contact-privacy-policy.mjs` with these public constants and rules:

```js
export const CONTACT_PRIVACY_POLICY_VERSION = 'agent-friendly-web.contact-privacy.v1';

export const RETENTION_DAYS = Object.freeze({
  requested_plan: 180,
  commercial_contact: 365,
  product_updates: 730,
  consent_evidence: 730,
  suppression: 730,
  synthetic: 7,
});

export const PRIVACY_REQUEST_EFFECTS = Object.freeze({
  access_export: 'prepare_subject_export',
  rectification: 'update_allowlisted_fields',
  withdraw_consent: 'record_purpose_withdrawal',
  deletion: 'erase_identifiers',
  restriction: 'restrict_processing',
  consent_status: 'report_consent_state',
});

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const CONSENT_ACTIONS = new Set(['granted', 'withdrawn', 'superseded']);
const REQUEST_TYPES = new Set([
  'access_export',
  'rectification',
  'withdraw_consent',
  'deletion',
  'restriction',
  'consent_status',
]);
const HOLD_REASONS = new Set(['contractual_record', 'legal_claim', 'security_incident']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function iso(value) {
  if (typeof value !== 'string' || value.length > 40) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function failure(code) {
  return { ok: false, code };
}

export function deriveConsentStatus(events, purpose) {
  if (!PURPOSES.has(purpose) || !Array.isArray(events)) return 'none';
  const matching = events
    .filter((event) => event?.purpose === purpose && CONSENT_ACTIONS.has(event.action) && iso(event.createdAt))
    .sort((left, right) => `${left.createdAt}|${left.id}`.localeCompare(`${right.createdAt}|${right.id}`));
  if (matching.length === 0) return 'none';
  return matching.at(-1).action === 'granted' ? 'granted' : 'withdrawn';
}

export function calculateRetentionDeadline(input = {}) {
  const lastInteractionAt = iso(input.lastInteractionAt);
  if (!lastInteractionAt) return failure('privacy_last_interaction_invalid');
  if (!PURPOSES.has(input.purpose)) return failure('privacy_purpose_invalid');
  const days = input.synthetic === true ? RETENTION_DAYS.synthetic : RETENTION_DAYS[input.purpose];
  const due = new Date(lastInteractionAt);
  due.setUTCDate(due.getUTCDate() + days);
  return { ok: true, dueAt: due.toISOString(), days };
}

export function planRetentionAction(input = {}) {
  const now = iso(input.now);
  if (!now) return failure('privacy_now_invalid');
  const retention = calculateRetentionDeadline(input);
  if (!retention.ok) return retention;
  if (input.hold) {
    if (!HOLD_REASONS.has(input.hold.reasonCode)) return failure('privacy_hold_reason_invalid');
    const expiresAt = iso(input.hold.expiresAt);
    if (!expiresAt) return failure('privacy_hold_expiry_required');
    if (expiresAt > now) return { ok: true, action: 'retain_for_hold', dueAt: expiresAt };
  }
  if (retention.dueAt > now) return { ok: true, action: 'retain', dueAt: retention.dueAt };
  if (input.synthetic === true) return { ok: true, action: 'purge_synthetic', dueAt: retention.dueAt };
  if (input.purpose === 'product_updates') return { ok: true, action: 'suspend_updates', dueAt: retention.dueAt };
  return { ok: true, action: 'erase_identifiers', dueAt: retention.dueAt };
}

export function privacyRequestEffect(requestType) {
  return PRIVACY_REQUEST_EFFECTS[requestType] || 'unsupported';
}

export function validatePrivacyRequestMetadata(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('privacy_request_invalid');
  const allowed = new Set([
    'requestType', 'contactRefHash', 'verificationHash', 'verificationExpiresAt',
    'expiresAt', 'policyVersion', 'idempotencyKey',
  ]);
  if (Object.keys(input).some((key) => !allowed.has(key))) return failure('privacy_request_field_not_allowed');
  if (!REQUEST_TYPES.has(input.requestType)) return failure('privacy_request_type_invalid');
  if (!HASH.test(input.contactRefHash || '') || !HASH.test(input.verificationHash || '')) {
    return failure('privacy_request_hash_invalid');
  }
  const verificationExpiresAt = iso(input.verificationExpiresAt);
  const expiresAt = iso(input.expiresAt);
  if (!verificationExpiresAt || !expiresAt || verificationExpiresAt >= expiresAt) {
    return failure('privacy_request_expiry_invalid');
  }
  if (input.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION) return failure('privacy_policy_version_invalid');
  if (!UUID.test(input.idempotencyKey || '')) return failure('privacy_request_idempotency_invalid');
  return { ok: true, value: { ...input, verificationExpiresAt, expiresAt } };
}
```

- [ ] **Step 4: Run the focused test and confirm green**

Run:

```powershell
node --test test/contact-privacy-policy.test.mjs
```

Expected: 5 tests pass, 0 fail.

- [ ] **Step 5: Commit the pure policy**

```powershell
git add -- lib/contact-privacy-policy.mjs test/contact-privacy-policy.test.mjs
git commit -m "feat: add executable contact privacy policy"
```

---

### Task 2: Additive D1 Privacy Schema

**Files:**
- Modify: `db/schema.ts`
- Create: `test/block6d4-local-migration.test.mjs`
- Create: `drizzle/0008_contact_privacy_lifecycle.sql`
- Create: `drizzle/meta/0008_snapshot.json`
- Modify: `drizzle/meta/_journal.json`

**Interfaces:**
- Consumes: existing `contact_leads`, `consent_receipts` and `crm_opportunities`.
- Produces: lifecycle columns plus `contact_consent_events`, `privacy_requests`, `contact_suppressions` and `data_lifecycle_events`.

- [ ] **Step 1: Write the failing migration test**

Create `test/block6d4-local-migration.test.mjs`. Apply migrations `0000` through `0008` to an in-memory `DatabaseSync`, then assert:

```js
const requiredTables = [
  'contact_consent_events',
  'privacy_requests',
  'contact_suppressions',
  'data_lifecycle_events',
];
for (const table of requiredTables) assert.ok(tables.includes(table));

assert.deepEqual(leadLifecycleColumns, [
  'last_interaction_at',
  'retention_expires_at',
  'erased_at',
  'privacy_policy_version',
  'restriction_state',
]);
assert.ok(crmColumns.includes('contact_status'));

for (const table of requiredTables) {
  assert.equal(database.prepare(`SELECT count(*) AS count FROM ${table}`).get().count, 0);
}
assert.doesNotMatch(migration, /^\s*(DROP|DELETE|UPDATE|RENAME)\b/im);
assert.doesNotMatch(migration, /CREATE TABLE `__new_/i);
```

Also insert one `example.invalid` contact and one CRM row before applying `0008`, then verify both rows still exist and the new defaults are empty/`none`/`active` as defined.

- [ ] **Step 2: Run the migration test and confirm red**

Run:

```powershell
node --test test/block6d4-local-migration.test.mjs
```

Expected: FAIL because migration `0008_contact_privacy_lifecycle.sql` and the new columns do not exist.

- [ ] **Step 3: Extend the Drizzle schema**

Add these fields to `contactLeads`:

```ts
lastInteractionAt: text('last_interaction_at').notNull().default(''),
retentionExpiresAt: text('retention_expires_at').notNull().default(''),
erasedAt: text('erased_at').notNull().default(''),
privacyPolicyVersion: text('privacy_policy_version').notNull().default(''),
restrictionState: text('restriction_state').notNull().default('none'),
```

Add this field to `crmOpportunities`:

```ts
contactStatus: text('contact_status').notNull().default('active'),
```

Add focused table definitions using the existing `sqliteTable`, `text`, `index` and `uniqueIndex` imports:

```ts
export const contactConsentEvents = sqliteTable('contact_consent_events', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').notNull(),
  purpose: text('purpose').notNull(),
  copyVersion: text('copy_version').notNull(),
  action: text('action').notNull(),
  evidenceHash: text('evidence_hash').notNull(),
  actorRefHash: text('actor_ref_hash').notNull(),
  idempotencyKey: text('idempotency_key').notNull(),
  requestHash: text('request_hash').notNull(),
  createdAt: text('created_at').notNull(),
}, (table) => [
  uniqueIndex('contact_consent_events_idempotency_unique').on(table.idempotencyKey),
  index('contact_consent_events_lead_purpose_created_idx').on(table.leadId, table.purpose, table.createdAt),
]);

export const privacyRequests = sqliteTable('privacy_requests', {
  id: text('id').primaryKey(),
  requestType: text('request_type').notNull(),
  contactRefHash: text('contact_ref_hash').notNull(),
  status: text('status').notNull().default('pending_verification'),
  verificationHash: text('verification_hash').notNull(),
  verificationExpiresAt: text('verification_expires_at').notNull(),
  policyVersion: text('policy_version').notNull(),
  decisionCode: text('decision_code').notNull().default(''),
  idempotencyKey: text('idempotency_key').notNull(),
  requestHash: text('request_hash').notNull(),
  createdAt: text('created_at').notNull(),
  verifiedAt: text('verified_at').notNull().default(''),
  resolvedAt: text('resolved_at').notNull().default(''),
  expiresAt: text('expires_at').notNull(),
}, (table) => [
  uniqueIndex('privacy_requests_idempotency_unique').on(table.idempotencyKey),
  uniqueIndex('privacy_requests_verification_hash_unique').on(table.verificationHash),
  index('privacy_requests_status_expires_idx').on(table.status, table.expiresAt),
]);

export const contactSuppressions = sqliteTable('contact_suppressions', {
  id: text('id').primaryKey(),
  emailHmac: text('email_hmac').notNull(),
  purpose: text('purpose').notNull(),
  reasonCode: text('reason_code').notNull(),
  policyVersion: text('policy_version').notNull(),
  idempotencyKey: text('idempotency_key').notNull(),
  createdAt: text('created_at').notNull(),
  expiresAt: text('expires_at').notNull(),
}, (table) => [
  uniqueIndex('contact_suppressions_email_purpose_unique').on(table.emailHmac, table.purpose),
  uniqueIndex('contact_suppressions_idempotency_unique').on(table.idempotencyKey),
]);

export const dataLifecycleEvents = sqliteTable('data_lifecycle_events', {
  id: text('id').primaryKey(),
  eventType: text('event_type').notNull(),
  contactRefHash: text('contact_ref_hash').notNull(),
  resultCode: text('result_code').notNull(),
  policyVersion: text('policy_version').notNull(),
  idempotencyKey: text('idempotency_key').notNull(),
  requestHash: text('request_hash').notNull(),
  createdAt: text('created_at').notNull(),
}, (table) => [
  uniqueIndex('data_lifecycle_events_idempotency_unique').on(table.idempotencyKey),
  index('data_lifecycle_events_contact_created_idx').on(table.contactRefHash, table.createdAt),
]);
```

- [ ] **Step 4: Generate and normalize migration artifacts**

Run:

```powershell
npm run db:generate
```

Rename the generated `0008_*.sql` to `drizzle/0008_contact_privacy_lifecycle.sql` and set the matching journal tag to `0008_contact_privacy_lifecycle`. Preserve the generated `0008_snapshot.json`. Inspect the SQL and stop if it contains `DROP`, `DELETE`, `UPDATE`, `RENAME` or `__new_`.

- [ ] **Step 5: Run schema and migration tests**

Run:

```powershell
node --test test/block6b-local-migration.test.mjs test/block6d2-local-migration.test.mjs test/block6d4-local-migration.test.mjs test/schema.test.mjs
```

Expected: all selected tests pass; existing tables and rows remain intact.

- [ ] **Step 6: Commit the additive schema**

```powershell
git add -- db/schema.ts drizzle/0008_contact_privacy_lifecycle.sql drizzle/meta/0008_snapshot.json drizzle/meta/_journal.json test/block6d4-local-migration.test.mjs
git commit -m "feat: add contact privacy lifecycle schema"
```

---

### Task 3: Consent Events and Privacy Request Repository

**Files:**
- Create: `lib/contact-privacy-d1-store.mjs`
- Create: `test/contact-privacy-d1-store.test.mjs`

**Interfaces:**
- Consumes: `validatePrivacyRequestMetadata()` from Task 1 and D1 tables from Task 2.
- Produces: `recordConsentLifecycleEventToD1(database, input, overrides)` and `createPrivacyRequestToD1(database, input, overrides)`.

- [ ] **Step 1: Write failing repository tests**

Use the existing `FakeStatement`/`FakeD1` pattern from `test/contact-d1-store.test.mjs`. Cover:

```js
const consentInput = {
  leadId: '00000000-0000-4000-8000-000000000001',
  purpose: 'product_updates',
  action: 'withdrawn',
  copyVersion: 'agent-friendly-web.contact-intake.v1',
  actorRefHash: 'a'.repeat(64),
  idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
};
const validRequest = {
  requestType: 'access_export',
  contactRefHash: 'b'.repeat(64),
  verificationHash: 'c'.repeat(64),
  verificationExpiresAt: '2026-09-03T22:15:00.000Z',
  expiresAt: '2026-09-10T22:00:00.000Z',
  policyVersion: 'agent-friendly-web.contact-privacy.v1',
  idempotencyKey: '6ba7b811-9dad-41d1-80b4-00c04fd430c8',
};
const deterministic = {
  now: () => '2026-09-03T22:00:00.000Z',
  randomUUID: (() => {
    const values = [
      '00000000-0000-4000-8000-000000000010',
      '00000000-0000-4000-8000-000000000011',
    ];
    return () => values.shift();
  })(),
};

test('records one consent event without binding email or free text', async () => {
  const database = new FakeD1([null]);
  const result = await recordConsentLifecycleEventToD1(database, consentInput, deterministic);
  assert.equal(result.persisted, true);
  assert.match(database.batches[0][0].sql, /INSERT INTO contact_consent_events/);
  assert.doesNotMatch(JSON.stringify(database.batches[0][0].bindings), /@|message|password/i);
});

test('stores a privacy request using only hashes and allowlisted metadata', async () => {
  const database = new FakeD1([null]);
  const result = await createPrivacyRequestToD1(database, validRequest, deterministic);
  assert.equal(result.persisted, true);
  assert.match(database.batches[0][0].sql, /INSERT INTO privacy_requests/);
  assert.doesNotMatch(JSON.stringify(database.batches[0][0].bindings), /@|person|token-value/i);
});

test('returns duplicate or conflict without a second write', async () => {
  const requestHash = await canonicalConsentLifecycleHash(consentInput);
  const duplicate = new FakeD1([{ id: 'evt-existing', requestHash }]);
  assert.deepEqual(await recordConsentLifecycleEventToD1(duplicate, consentInput), {
    id: 'evt-existing', persisted: true, duplicate: true, conflict: false,
  });
  assert.equal(duplicate.batches.length, 0);

  const conflict = new FakeD1([{ id: 'evt-existing', requestHash: 'd'.repeat(64) }]);
  assert.deepEqual(await recordConsentLifecycleEventToD1(conflict, consentInput), {
    id: 'evt-existing', persisted: false, duplicate: false, conflict: true,
  });
  assert.equal(conflict.batches.length, 0);
});

test('rejects unknown purposes, actions, request fields and missing D1', async () => {
  await assert.rejects(
    () => recordConsentLifecycleEventToD1(null, consentInput),
    /privacy_store_unavailable/,
  );
  const database = new FakeD1();
  await assert.rejects(
    () => recordConsentLifecycleEventToD1(database, { ...consentInput, purpose: 'case_publication' }),
    /privacy_store_invalid_input/,
  );
  await assert.rejects(
    () => recordConsentLifecycleEventToD1(database, { ...consentInput, action: 'deleted' }),
    /privacy_store_invalid_input/,
  );
  await assert.rejects(
    () => createPrivacyRequestToD1(database, { ...validRequest, email: 'person@example.com' }),
    /privacy_store_invalid_input/,
  );
  assert.equal(database.batches.length, 0);
});
```

- [ ] **Step 2: Run the repository tests and confirm red**

```powershell
node --test test/contact-privacy-d1-store.test.mjs
```

Expected: FAIL because the repository module does not exist.

- [ ] **Step 3: Implement append-only, idempotent writes**

In `lib/contact-privacy-d1-store.mjs`:

- accept only UUID lead IDs, 64-character lowercase hashes and allowlisted enums;
- calculate a canonical SHA-256 request hash from non-PII input;
- query by `idempotency_key` before writing;
- return `{ persisted, duplicate, conflict, id }`;
- insert one statement through `database.batch`;
- translate unrelated D1 errors to stable codes;
- never accept an `email`, `name`, `message`, `body`, `token` or unknown field;
- generate IDs and timestamps through overrides in tests.

Use these exact exports:

```js
import {
  CONTACT_PRIVACY_POLICY_VERSION,
  validatePrivacyRequestMetadata,
} from './contact-privacy-policy.mjs';

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const ACTIONS = new Set(['granted', 'withdrawn', 'superseded']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONSENT_FIELDS = new Set([
  'leadId', 'purpose', 'action', 'copyVersion', 'actorRefHash', 'idempotencyKey',
]);

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isD1(database) {
  return Boolean(database && typeof database.prepare === 'function' && typeof database.batch === 'function');
}

function uniqueRace(error, table) {
  const message = error instanceof Error ? error.message : String(error || '');
  return message.includes(`${table}.idempotency_key`);
}

function exactKeys(input, allowed) {
  return input && typeof input === 'object' && !Array.isArray(input)
    && Object.keys(input).every((key) => allowed.has(key));
}

export async function canonicalConsentLifecycleHash(input) {
  return sha256(JSON.stringify([
    input.leadId, input.purpose, input.action, input.copyVersion,
    input.actorRefHash, input.idempotencyKey,
  ]));
}

export async function recordConsentLifecycleEventToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_store_unavailable');
  if (
    !exactKeys(input, CONSENT_FIELDS)
    || !UUID.test(input.leadId || '')
    || !PURPOSES.has(input.purpose)
    || !ACTIONS.has(input.action)
    || typeof input.copyVersion !== 'string'
    || input.copyVersion.length < 1
    || input.copyVersion.length > 120
    || !HASH.test(input.actorRefHash || '')
    || !UUID.test(input.idempotencyKey || '')
  ) throw new Error('privacy_store_invalid_input');

  const requestHash = await canonicalConsentLifecycleHash(input);
  const existing = await database
    .prepare('SELECT id, request_hash AS requestHash FROM contact_consent_events WHERE idempotency_key = ? LIMIT 1')
    .bind(input.idempotencyKey)
    .first();
  if (existing) {
    return existing.requestHash === requestHash
      ? { id: existing.id, persisted: true, duplicate: true, conflict: false }
      : { id: existing.id, persisted: false, duplicate: false, conflict: true };
  }

  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date().toISOString()))();
  const id = randomUUID();
  const evidenceHash = await sha256([input.leadId, input.purpose, input.action, input.copyVersion, now].join('|'));
  const statement = database.prepare(`INSERT INTO contact_consent_events (
    id, lead_id, purpose, copy_version, action, evidence_hash,
    actor_ref_hash, idempotency_key, request_hash, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      id, input.leadId, input.purpose, input.copyVersion, input.action,
      evidenceHash, input.actorRefHash, input.idempotencyKey, requestHash, now,
    );
  try {
    const results = await database.batch([statement]);
    if (!Array.isArray(results) || results.length !== 1 || results[0]?.success === false) {
      throw new Error('privacy_store_failed');
    }
  } catch (error) {
    if (!uniqueRace(error, 'contact_consent_events')) throw new Error('privacy_store_failed');
    const winner = await database
      .prepare('SELECT id, request_hash AS requestHash FROM contact_consent_events WHERE idempotency_key = ? LIMIT 1')
      .bind(input.idempotencyKey)
      .first();
    if (!winner) throw new Error('privacy_store_failed');
    return winner.requestHash === requestHash
      ? { id: winner.id, persisted: true, duplicate: true, conflict: false }
      : { id: winner.id, persisted: false, duplicate: false, conflict: true };
  }
  return { id, persisted: true, duplicate: false, conflict: false };
}

export async function canonicalPrivacyRequestHash(input) {
  return sha256(JSON.stringify([
    input.requestType, input.contactRefHash, input.verificationHash,
    input.verificationExpiresAt, input.expiresAt, input.policyVersion,
    input.idempotencyKey,
  ]));
}

export async function createPrivacyRequestToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_store_unavailable');
  const validation = validatePrivacyRequestMetadata(input);
  if (!validation.ok) throw new Error('privacy_store_invalid_input');
  const value = validation.value;
  const requestHash = await canonicalPrivacyRequestHash(value);
  const existing = await database
    .prepare('SELECT id, request_hash AS requestHash FROM privacy_requests WHERE idempotency_key = ? LIMIT 1')
    .bind(value.idempotencyKey)
    .first();
  if (existing) {
    return existing.requestHash === requestHash
      ? { id: existing.id, persisted: true, duplicate: true, conflict: false }
      : { id: existing.id, persisted: false, duplicate: false, conflict: true };
  }
  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date().toISOString()))();
  const id = randomUUID();
  const statement = database.prepare(`INSERT INTO privacy_requests (
    id, request_type, contact_ref_hash, status, verification_hash,
    verification_expires_at, policy_version, decision_code, idempotency_key,
    request_hash, created_at, verified_at, resolved_at, expires_at
  ) VALUES (?, ?, ?, 'pending_verification', ?, ?, ?, '', ?, ?, ?, '', '', ?)`)
    .bind(
      id, value.requestType, value.contactRefHash, value.verificationHash,
      value.verificationExpiresAt, CONTACT_PRIVACY_POLICY_VERSION,
      value.idempotencyKey, requestHash, now, value.expiresAt,
    );
  try {
    const results = await database.batch([statement]);
    if (!Array.isArray(results) || results.length !== 1 || results[0]?.success === false) {
      throw new Error('privacy_store_failed');
    }
  } catch (error) {
    if (!uniqueRace(error, 'privacy_requests')) throw new Error('privacy_store_failed');
    const winner = await database
      .prepare('SELECT id, request_hash AS requestHash FROM privacy_requests WHERE idempotency_key = ? LIMIT 1')
      .bind(value.idempotencyKey)
      .first();
    if (!winner) throw new Error('privacy_store_failed');
    return winner.requestHash === requestHash
      ? { id: winner.id, persisted: true, duplicate: true, conflict: false }
      : { id: winner.id, persisted: false, duplicate: false, conflict: true };
  }
  return { id, persisted: true, duplicate: false, conflict: false };
}
```

The immutable consent input is exactly:

```js
{
  leadId,
  purpose,
  action,
  copyVersion,
  actorRefHash,
  idempotencyKey,
}
```

The privacy request input is exactly the normalized value returned by `validatePrivacyRequestMetadata()`.

- [ ] **Step 4: Run focused repository and legacy contact tests**

```powershell
node --test test/contact-privacy-d1-store.test.mjs test/contact-d1-store.test.mjs test/contact-intake.test.mjs
```

Expected: all selected tests pass and the legacy intake contract remains unchanged.

- [ ] **Step 5: Commit the privacy repository**

```powershell
git add -- lib/contact-privacy-d1-store.mjs test/contact-privacy-d1-store.test.mjs
git commit -m "feat: persist privacy metadata without PII"
```

---

### Task 4: Atomic Erasure and CRM Tombstones

**Files:**
- Create: `lib/contact-privacy-erasure.mjs`
- Create: `test/contact-privacy-erasure.test.mjs`

**Interfaces:**
- Consumes: D1 lifecycle schema, `CONTACT_PRIVACY_POLICY_VERSION`, a verified lead UUID, precomputed `emailHmac`, and idempotency metadata.
- Produces: `resolveContactStatusFromD1(database, contactRef)` and `applyContactErasureToD1(database, input, overrides)`.

- [ ] **Step 1: Write failing erasure tests**

Use a Fake D1 adapter that records `first()` and `batch()` calls. Assert:

```js
const leadId = '00000000-0000-4000-8000-000000000001';
const validInput = {
  leadId,
  emailHmac: 'a'.repeat(64),
  purpose: 'product_updates',
  policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
  idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
};
const deterministic = {
  now: () => '2026-09-03T22:00:00.000Z',
  randomUUID: (() => {
    const values = [
      '00000000-0000-4000-8000-000000000020',
      '00000000-0000-4000-8000-000000000021',
    ];
    return () => values.shift();
  })(),
};

test('erases direct identifiers and tombstones CRM in one D1 batch', async () => {
  const database = new FakeD1([{ id: leadId, erasedAt: '' }]);
  const result = await applyContactErasureToD1(database, validInput, deterministic);
  assert.equal(result.erased, true);
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 4);
  assert.match(database.batches[0][0].sql, /UPDATE contact_leads/);
  assert.match(database.batches[0][1].sql, /UPDATE crm_opportunities/);
  assert.match(database.batches[0][2].sql, /INSERT INTO contact_suppressions/);
  assert.match(database.batches[0][3].sql, /INSERT INTO data_lifecycle_events/);
  assert.doesNotMatch(JSON.stringify(database.batches[0]), /person@example|Gabriel|message body/i);
});

test('returns an idempotent tombstone for an already erased contact', async () => {
  const database = new FakeD1([{ id: leadId, erasedAt: '2026-09-03T22:00:00.000Z' }]);
  assert.deepEqual(await applyContactErasureToD1(database, validInput), {
    erased: true,
    duplicate: true,
    contactStatus: 'erased',
  });
  assert.equal(database.batches.length, 0);
});

test('resolver returns status only and never contact PII', async () => {
  const database = new FakeD1([{ state: 'erased', erasedAt: '2026-09-03T22:00:00.000Z', restrictionState: 'none' }]);
  assert.deepEqual(await resolveContactStatusFromD1(database, leadId), {
    found: true,
    contactStatus: 'erased',
    restricted: false,
  });
});

test('rejects raw PII, invalid HMAC and partial batch failure', async () => {
  await assert.rejects(
    () => applyContactErasureToD1(new FakeD1(), { ...validInput, email: 'person@example.com' }),
    /privacy_erasure_invalid_input/,
  );
  await assert.rejects(
    () => applyContactErasureToD1(new FakeD1(), { ...validInput, emailHmac: 'short' }),
    /privacy_erasure_invalid_input/,
  );
  const failed = new FakeD1([{ id: leadId, erasedAt: '' }]);
  failed.batchResults = [{ success: true }, { success: false }, { success: true }, { success: true }];
  await assert.rejects(
    () => applyContactErasureToD1(failed, validInput, deterministic),
    /privacy_erasure_failed/,
  );
});
```

- [ ] **Step 2: Run the erasure tests and confirm red**

```powershell
node --test test/contact-privacy-erasure.test.mjs
```

Expected: FAIL because `lib/contact-privacy-erasure.mjs` does not exist.

- [ ] **Step 3: Implement the transactional erasure plan**

Implement these rules:

```js
import { CONTACT_PRIVACY_POLICY_VERSION, RETENTION_DAYS } from './contact-privacy-policy.mjs';

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const INPUT_FIELDS = new Set(['leadId', 'emailHmac', 'purpose', 'policyVersion', 'idempotencyKey']);

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isD1(database) {
  return Boolean(database && typeof database.prepare === 'function' && typeof database.batch === 'function');
}

export async function resolveContactStatusFromD1(database, contactRef) {
  if (!isD1(database)) throw new Error('privacy_erasure_store_unavailable');
  if (!UUID.test(contactRef || '')) throw new Error('privacy_contact_ref_invalid');
  const row = await database
    .prepare(`SELECT state, erased_at AS erasedAt, restriction_state AS restrictionState
      FROM contact_leads WHERE id = ? LIMIT 1`)
    .bind(contactRef)
    .first();
  if (!row) return { found: false, contactStatus: 'not_found', restricted: false };
  return {
    found: true,
    contactStatus: row.erasedAt ? 'erased' : 'active',
    restricted: row.restrictionState === 'restricted',
  };
}

export async function applyContactErasureToD1(database, input, overrides = {}) {
  if (!isD1(database)) throw new Error('privacy_erasure_store_unavailable');
  if (
    !input
    || typeof input !== 'object'
    || Array.isArray(input)
    || Object.keys(input).some((key) => !INPUT_FIELDS.has(key))
    || !UUID.test(input.leadId || '')
    || !HASH.test(input.emailHmac || '')
    || !PURPOSES.has(input.purpose)
    || input.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION
    || !UUID.test(input.idempotencyKey || '')
  ) throw new Error('privacy_erasure_invalid_input');

  const lead = await database
    .prepare('SELECT id, erased_at AS erasedAt FROM contact_leads WHERE id = ? LIMIT 1')
    .bind(input.leadId)
    .first();
  if (!lead) throw new Error('privacy_erasure_contact_not_found');
  if (lead.erasedAt) return { erased: true, duplicate: true, contactStatus: 'erased' };

  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date().toISOString()))();
  const refHash = await sha256(input.leadId);
  const tombstoneRef = `contact-erased-${refHash.slice(0, 20)}`;
  const erasedIdempotency = `erased-${refHash.slice(0, 29)}`;
  const suppressionExpiry = new Date(now);
  suppressionExpiry.setUTCDate(suppressionExpiry.getUTCDate() + RETENTION_DAYS.suppression);
  const requestHash = await sha256(JSON.stringify([
    input.leadId, input.emailHmac, input.purpose, input.policyVersion, input.idempotencyKey,
  ]));

  const statements = [
    database.prepare(`UPDATE contact_leads SET
      email = '', name = '', domain = '', role = '', organization = '',
      objective = '', source = '', idempotency_key = ?, request_hash = '',
      state = 'erased', erased_at = ?, updated_at = ?,
      retention_expires_at = '', restriction_state = 'none'
      WHERE id = ? AND erased_at = ''`)
      .bind(erasedIdempotency, now, now, input.leadId),
    database.prepare(`UPDATE crm_opportunities SET
      contact_ref = ?, domain = 'erased.invalid', contact_status = 'erased',
      owner_context = 'unknown', maintainer_context = 'unknown',
      evidence_refs_json = '[]', updated_at = ?
      WHERE contact_ref = ?`)
      .bind(tombstoneRef, now, input.leadId),
    database.prepare(`INSERT OR IGNORE INTO contact_suppressions (
      id, email_hmac, purpose, reason_code, policy_version,
      idempotency_key, created_at, expires_at
    ) VALUES (?, ?, ?, 'subject_deletion', ?, ?, ?, ?)`)
      .bind(
        randomUUID(), input.emailHmac, input.purpose, input.policyVersion,
        input.idempotencyKey, now, suppressionExpiry.toISOString(),
      ),
    database.prepare(`INSERT INTO data_lifecycle_events (
      id, event_type, contact_ref_hash, result_code, policy_version,
      idempotency_key, request_hash, created_at
    ) VALUES (?, 'deleted', ?, 'identifiers_erased', ?, ?, ?, ?)`)
      .bind(randomUUID(), refHash, input.policyVersion, input.idempotencyKey, requestHash, now),
  ];

  try {
    const results = await database.batch(statements);
    if (!Array.isArray(results) || results.length !== 4 || results.some((item) => item?.success === false)) {
      throw new Error('privacy_erasure_failed');
    }
  } catch {
    throw new Error('privacy_erasure_failed');
  }
  return { erased: true, duplicate: false, contactStatus: 'erased', tombstoneRef };
}
```

The four statements must:

1. Blank `email`, `name`, `domain`, `role`, `organization`, `objective`, `source` and `request_hash`; replace `idempotency_key` with a deterministic erased key; set `state='erased'`, `erased_at`, `updated_at`, `restriction_state='none'` and clear retention.
2. For rows whose `contact_ref` equals the lead UUID, set `contact_ref` to `contact-erased-<20 hex>`, `domain='erased.invalid'`, `contact_status='erased'`, clear evidence refs and reset owner/maintainer context to `unknown`.
3. Insert or idempotently preserve an HMAC-only suppression with `reason_code='subject_deletion'` and a 730-day expiry.
4. Insert one metadata-only lifecycle event `deleted` with `result_code='identifiers_erased'`.

If any statement reports `success: false` or throws, return/reject `privacy_erasure_failed` and do not report success. The module does not calculate `emailHmac`; a later verified rights service must derive it with a secret binding outside D1.

- [ ] **Step 4: Run erasure and CRM regression tests**

```powershell
node --test test/contact-privacy-erasure.test.mjs test/crm-lite.test.mjs test/synthetic-crm-readonly.test.mjs test/synthetic-crm-persistence.test.mjs
```

Expected: all selected tests pass; existing synthetic CRM behavior remains unchanged.

- [ ] **Step 5: Commit erasure behavior**

```powershell
git add -- lib/contact-privacy-erasure.mjs test/contact-privacy-erasure.test.mjs
git commit -m "feat: add atomic contact erasure boundary"
```

---

### Task 5: OFF-by-default Contract, Config and Documentation

**Files:**
- Create: `public/.well-known/contact-privacy-lifecycle-contract.json`
- Create: `test/contact-privacy-contract.test.mjs`
- Modify: `wrangler.jsonc`
- Modify: `worker-configuration.d.ts`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md`
- Modify: `docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md`

**Interfaces:**
- Consumes: policy constants and local implementation status.
- Produces: a truthful machine contract and explicit disabled runtime configuration.

- [ ] **Step 1: Write the failing contract/config test**

Create `test/contact-privacy-contract.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('privacy lifecycle contract reports local readiness and remote closure', async () => {
  const contract = JSON.parse(await readFile(
    'public/.well-known/contact-privacy-lifecycle-contract.json',
    'utf8',
  ));
  assert.equal(contract.contract, 'agent-friendly-web.contact-privacy-lifecycle.v1');
  assert.equal(contract.status, 'local_policy_ready_remote_disabled');
  assert.equal(contract.audit_requires_email, false);
  assert.equal(contract.real_contact_enabled, false);
  assert.equal(contract.privacy_requests_enabled, false);
  assert.equal(contract.retention_jobs_enabled, false);
  assert.equal(contract.product_updates_enabled, false);
  assert.equal(contract.claims.global_legal_compliance, false);
  assert.deepEqual(contract.consent.required, ['requested_plan']);
  assert.deepEqual(contract.consent.optional, ['commercial_contact', 'product_updates']);
  assert.equal(contract.boundaries.crm_stores_direct_pii, false);
  assert.equal(contract.boundaries.tokenizart_resources_used, false);
});

test('all web environments keep every real-data flag OFF', async () => {
  const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
  const flags = [
    'AFW_REAL_CONTACT_ENABLED',
    'AFW_PRIVACY_REQUESTS_ENABLED',
    'AFW_RETENTION_JOBS_ENABLED',
    'AFW_PRODUCT_UPDATES_ENABLED',
  ];
  for (const vars of [config.vars, config.env.canary.vars, config.env.production.vars]) {
    for (const flag of flags) assert.equal(vars[flag], 'false');
  }
});
```

- [ ] **Step 2: Run the contract test and confirm red**

```powershell
node --test test/contact-privacy-contract.test.mjs
```

Expected: FAIL because the contract and four configuration keys do not exist.

- [ ] **Step 3: Add the contract and disabled flags**

Create `public/.well-known/contact-privacy-lifecycle-contract.json` with:

```json
{
  "schema_version": "1.0",
  "contract": "agent-friendly-web.contact-privacy-lifecycle.v1",
  "status": "local_policy_ready_remote_disabled",
  "audit_requires_email": false,
  "real_contact_enabled": false,
  "privacy_requests_enabled": false,
  "retention_jobs_enabled": false,
  "product_updates_enabled": false,
  "consent": {
    "required": ["requested_plan"],
    "optional": ["commercial_contact", "product_updates"],
    "inherited": false
  },
  "rights": ["access_export", "rectification", "withdraw_consent", "deletion", "restriction", "consent_status"],
  "retention_days": {
    "requested_plan": 180,
    "commercial_contact": 365,
    "product_updates": 730,
    "consent_evidence": 730,
    "suppression": 730,
    "synthetic": 7
  },
  "boundaries": {
    "crm_stores_direct_pii": false,
    "audit_stores_direct_pii": false,
    "tokens_logged": false,
    "tokenizart_resources_used": false
  },
  "claims": {
    "global_legal_compliance": false,
    "legal_review_required_before_real_capture": true
  },
  "next_gate": "private_synthetic_lifecycle",
  "documentation": "https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/main/docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md"
}
```

Add the four flags with string value `false` to `vars`, `env.canary.vars` and `env.production.vars` in `wrangler.jsonc`. Run `npm run web:types` and retain changes to `worker-configuration.d.ts` only if they describe these bindings without leaking values.

- [ ] **Step 4: Align narrative documentation**

Add a dated Gate 6D.4B section stating:

- policy, schema and stores exist locally;
- `consent_receipts` remains the immutable legacy grant source;
- `contact_consent_events` is the additive event stream for new grants, withdrawals and supersession;
- no backfill or remote migration has run;
- rights have no public route;
- every real-data flag remains OFF;
- Gate 6D.4C is a separate private synthetic lifecycle.

Do not add the contract to discovery catalogs as a deployed capability until its production URL is verified.

- [ ] **Step 5: Run contract, config and documentation tests**

```powershell
node --test test/contact-privacy-contract.test.mjs test/contact-copy-and-contract.test.mjs test/contact-worker-config.test.mjs test/company-building-capital-roadmap.test.mjs
```

Expected: all selected tests pass and no test describes real contact capture as active.

- [ ] **Step 6: Commit contract and documentation**

```powershell
git add -- public/.well-known/contact-privacy-lifecycle-contract.json test/contact-privacy-contract.test.mjs wrangler.jsonc worker-configuration.d.ts docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md
git commit -m "docs: publish disabled privacy lifecycle contract"
```

---

### Task 6: Full Local Gate Verification and Evidence

**Files:**
- Create: `docs/BLOCK-6D4B-CONTACT-PRIVACY-LOCAL-GATE-2026-09-03.md`

**Interfaces:**
- Consumes: all outputs from Tasks 1-5.
- Produces: reproducible local evidence and a clean branch ready for review.

- [ ] **Step 1: Run the complete focused suite**

```powershell
node --test test/contact-privacy-policy.test.mjs test/block6d4-local-migration.test.mjs test/contact-privacy-d1-store.test.mjs test/contact-privacy-erasure.test.mjs test/contact-privacy-contract.test.mjs test/contact-d1-store.test.mjs test/crm-lite.test.mjs test/synthetic-crm-persistence.test.mjs test/synthetic-crm-readonly.test.mjs
```

Expected: every selected test passes with 0 failures.

- [ ] **Step 2: Run the full repository verification**

```powershell
npm test
npm run lint
npm run build
npm run web:deploy:dry-run
```

Expected:

- `npm test`: 0 failures;
- `npm run lint`: 0 errors; record any already-known warning without describing it as new;
- `npm run build`: exit code 0;
- `npm run web:deploy:dry-run`: exit code 0 and no deployment.

- [ ] **Step 3: Inspect migration and security boundaries**

```powershell
rg -n "DROP|DELETE|UPDATE|RENAME|__new_" drizzle/0008_contact_privacy_lifecycle.sql
rg -n "AFW_REAL_CONTACT_ENABLED|AFW_PRIVACY_REQUESTS_ENABLED|AFW_RETENTION_JOBS_ENABLED|AFW_PRODUCT_UPDATES_ENABLED" wrangler.jsonc
rg -n "email|name|phone|password|token" lib/contact-privacy-d1-store.mjs lib/contact-privacy-erasure.mjs
git diff --check
```

Expected:

- the migration scan returns no destructive statements;
- each flag appears in base, canary and production with value `false`;
- any identifier words in code occur only in explicit rejection/erasure logic, never event payloads or returned objects;
- `git diff --check` exits 0.

- [ ] **Step 4: Write the observed evidence**

Create `docs/BLOCK-6D4B-CONTACT-PRIVACY-LOCAL-GATE-2026-09-03.md` with the exact commit IDs and observed command results. State explicitly:

- environment `local_only`;
- remote migrations `0`;
- remote deploys `0`;
- real contacts `0`;
- emails sent `0`;
- Tokenizart resources used `false`;
- four runtime flags `false`;
- migration additive and tested against pre-existing rows;
- next gate `6D.4C private synthetic lifecycle`, not active.

- [ ] **Step 5: Commit the evidence**

```powershell
git add -- docs/BLOCK-6D4B-CONTACT-PRIVACY-LOCAL-GATE-2026-09-03.md
git commit -m "docs: close local contact privacy gate"
```

- [ ] **Step 6: Verify final branch state**

```powershell
git status --short --branch
git log -6 --oneline
```

Expected: clean worktree; branch ahead only by the reviewed Gate 6D.4B commits. Pushing the branch is allowed after local verification, but merging, deploying, applying D1 migrations or starting Gate 6D.4C requires the separately declared operation for that resource and environment.
