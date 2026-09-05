import assert from 'node:assert/strict';
import test from 'node:test';

import { hashAccessSubject } from '../lib/access-subject-hash.mjs';
import {
  createSyntheticCommercialReviewHandler,
  loadSyntheticCommercialReview,
  SYNTHETIC_COMMERCIAL_REVIEW_CONTRACT,
} from '../lib/synthetic-commercial-review.mjs';

const endpoint = 'https://canary.agentfriendlyweb.dev/api/canary/commercial-review';
const actorId = 'cf-access-subject-afw-commercial-review';
const sourceId = '38e17927-bc9d-4cab-ac56-12d2bf5d0349';

function request(overrides = {}) {
  return new Request(overrides.url || endpoint, {
    method: overrides.method || 'GET',
    headers: {
      'cf-access-jwt-assertion': 'signed-access-assertion',
      ...(overrides.headers || {}),
    },
  });
}

function databaseReturning(row) {
  const observations = { sql: '', bindings: [], writes: 0 };
  return {
    observations,
    prepare(sql) {
      observations.sql = sql;
      if (/\b(?:INSERT|UPDATE|DELETE|REPLACE|ALTER|DROP|CREATE)\b/i.test(sql)) {
        observations.writes += 1;
      }
      return {
        bind(...bindings) {
          observations.bindings = bindings;
          return {
            async first() {
              return row;
            },
          };
        },
      };
    },
  };
}

async function baseEnv(overrides = {}) {
  return {
    AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'tokenizart.cloudflareaccess.com',
    ACCESS_AUD: 'canary-audience',
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: await hashAccessSubject(actorId),
    DB: databaseReturning({ id: sourceId, locale: 'es', state: 'new', candidateCount: 1 }),
    ...overrides,
  };
}

function verifiedAccess() {
  return {
    async verifyAccessJwt() {
      return { ok: true, identity: { userId: actorId, email: 'operator@example.invalid' } };
    },
  };
}

test('fails closed before identity or D1 when the review switch is disabled', async () => {
  let verified = false;
  const handler = createSyntheticCommercialReviewHandler({
    async verifyAccessJwt() {
      verified = true;
      return { ok: true, identity: { userId: actorId, email: 'operator@example.invalid' } };
    },
  });
  const response = await handler(request(), await baseEnv({
    AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED: 'false',
  }));

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { ok: false, code: 'synthetic_commercial_review_unavailable' });
  assert.equal(verified, false);
});

test('requires the exact HTTPS canary GET boundary with no query string', async () => {
  const handler = createSyntheticCommercialReviewHandler(verifiedAccess());
  const cases = [
    request({ url: 'https://agentfriendlyweb.dev/api/canary/commercial-review' }),
    request({ url: `${endpoint}?lead=anything` }),
    request({ url: 'http://canary.agentfriendlyweb.dev/api/canary/commercial-review' }),
    request({ url: 'https://canary.agentfriendlyweb.dev/api/commercial-review' }),
    request({ method: 'POST' }),
  ];

  for (const candidate of cases) {
    const response = await handler(candidate, await baseEnv());
    assert.equal(response.status, 403);
    assert.equal((await response.json()).code, 'synthetic_commercial_review_boundary_rejected');
  }
});

test('requires a verified and explicitly allowlisted Access subject', async () => {
  const rejected = createSyntheticCommercialReviewHandler({
    async verifyAccessJwt() { return { ok: false }; },
  });
  let response = await rejected(request(), await baseEnv());
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_commercial_review_identity_rejected');

  const verified = createSyntheticCommercialReviewHandler(verifiedAccess());
  response = await verified(request(), await baseEnv({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: 'f'.repeat(64),
  }));
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_commercial_review_actor_not_allowed');

  response = await verified(request(), await baseEnv({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: '',
  }));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'synthetic_commercial_review_misconfigured');
});

test('reads only the fixed synthetic source with requested-plan consent', async () => {
  const database = databaseReturning({ id: sourceId, locale: 'es', state: 'new', candidateCount: 1 });
  const result = await loadSyntheticCommercialReview(database, 'a'.repeat(64));

  assert.equal(result.ok, true);
  assert.match(database.observations.sql, /^\s*SELECT\s+l\.id,\s+l\.locale,\s+l\.state,\s+COUNT\(\*\) OVER \(\) AS candidateCount/iu);
  assert.match(database.observations.sql, /FROM contact_leads AS l/iu);
  assert.match(database.observations.sql, /EXISTS\s*\(\s*SELECT 1 FROM consent_receipts AS c/iu);
  const selectedColumns = database.observations.sql.split(/\bFROM contact_leads AS l\b/iu)[0];
  assert.doesNotMatch(selectedColumns, /l\.(?:email|name|organization|idempotency_key)/iu);
  assert.deepEqual(database.observations.bindings, [
    'synthetic-canary@example.invalid',
    'example.invalid',
    'Agent Friendly Web Synthetic Canary',
    'requested_plan',
    'granted',
  ]);
  assert.equal(database.observations.writes, 0);
});

test('derives a deterministic sanitized CRM plan without persistence or actions', async () => {
  const database = databaseReturning({ id: sourceId, locale: 'es', state: 'new', candidateCount: 1 });
  const handler = createSyntheticCommercialReviewHandler({
    ...verifiedAccess(),
    async loadReview(db, actorHash) {
      return loadSyntheticCommercialReview(db, actorHash);
    },
  });
  const response = await handler(request(), await baseEnv({ DB: database }));
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.contract, SYNTHETIC_COMMERCIAL_REVIEW_CONTRACT);
  assert.equal(payload.status, 'planned_not_persisted');
  assert.equal(payload.synthetic, true);
  assert.deepEqual(payload.source, {
    type: 'synthetic_contact',
    persistedState: 'new',
    consentPurpose: 'requested_plan',
  });
  assert.match(payload.opportunity.opportunityId, /^opp-synthetic-[0-9a-f]{20}$/);
  assert.match(payload.opportunity.contactRef, /^contact-synthetic-[0-9a-f]{20}$/);
  assert.equal(payload.opportunity.domain, 'example.invalid');
  assert.equal(payload.opportunity.stage, 'new');
  assert.equal(payload.opportunity.nextAction, 'confirm_interest');
  assert.deepEqual(payload.opportunity.scopeCodes, ['discovery_pack', 'external_evidence']);
  assert.equal(payload.transition.fromStage, 'new');
  assert.equal(payload.transition.toStage, 'qualified');
  assert.equal(payload.transition.persistenceEnabled, false);
  assert.equal(payload.transition.automaticActionsAllowed, false);
  assert.deepEqual(payload.capabilities, {
    readsSyntheticContact: true,
    persistsData: false,
    sendsEmail: false,
    createsProposal: false,
    chargesPayment: false,
  });
  const serialized = JSON.stringify(payload);
  assert.doesNotMatch(serialized, /synthetic-canary@|operator@|38e17927-bc9d-4cab-ac56-12d2bf5d0349/i);
  assert.equal(database.observations.writes, 0);
});

test('fails closed for missing, malformed or unavailable synthetic sources', async () => {
  const actorHash = 'a'.repeat(64);
  const cases = [
    [null, 'synthetic_commercial_review_source_not_found'],
    [{ id: sourceId, locale: 'fr', state: 'new', candidateCount: 1 }, 'synthetic_commercial_review_source_invalid'],
    [{ id: sourceId, locale: 'es', state: 'qualified', candidateCount: 1 }, 'synthetic_commercial_review_source_invalid'],
    [{ id: 'not-a-uuid', locale: 'es', state: 'new', candidateCount: 1 }, 'synthetic_commercial_review_source_invalid'],
    [{ id: sourceId, locale: 'es', state: 'new', candidateCount: 2 }, 'synthetic_commercial_review_source_invalid'],
  ];
  for (const [row, code] of cases) {
    assert.deepEqual(await loadSyntheticCommercialReview(databaseReturning(row), actorHash), { ok: false, code });
  }
  assert.deepEqual(
    await loadSyntheticCommercialReview(null, actorHash),
    { ok: false, code: 'synthetic_commercial_review_store_unavailable' },
  );
});

test('the review boundary contains no mutation, email, proposal or payment integration', async () => {
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(new URL('../lib/synthetic-commercial-review.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\.batch\s*\(|\.run\s*\(|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|email-review-ready-gate|\.send\s*\(|\.charge\s*\(|from\s+['"][^'"]*payment/iu);
});
