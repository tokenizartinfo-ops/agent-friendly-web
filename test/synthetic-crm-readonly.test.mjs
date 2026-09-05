import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { hashAccessSubject } from '../lib/access-subject-hash.mjs';
import {
  createSyntheticCrmReadonlyHandler,
  loadSyntheticCrmReadonlyBoard,
  SYNTHETIC_CRM_READONLY_CONTRACT,
} from '../lib/synthetic-crm-readonly.mjs';

const endpoint = 'https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-readonly';
const actorId = 'cf-access-subject-afw-synthetic-crm-readonly';
const actorHash = await hashAccessSubject(actorId);
const row = {
  domain: 'example.invalid',
  segment: 'other',
  problem: 'discovery',
  source: 'inbound_request',
  locale: 'es',
  stage: 'qualified',
  ownerContext: 'owner_unverified',
  maintainerContext: 'unknown',
  scopeCodesJson: '["discovery_pack","external_evidence"]',
  estimatedValueBand: 'unknown',
  nextAction: 'confirm_interest',
  nextActionAt: '',
  evidenceRefsJson: '[]',
  createdAt: '2026-09-03T20:20:51.000Z',
  updatedAt: '2026-09-03T20:20:51.000Z',
  fromStage: 'new',
  toStage: 'qualified',
  transitionCreatedAt: '2026-09-03T20:20:51.000Z',
  candidateCount: 1,
};

function request(overrides = {}) {
  return new Request(overrides.url || endpoint, {
    method: overrides.method || 'GET',
    headers: {
      'cf-access-jwt-assertion': 'signed-access-assertion',
      ...(overrides.headers || {}),
    },
  });
}

function databaseReturning(value) {
  const observations = { sql: '', bindings: [], writes: 0 };
  return {
    observations,
    prepare(sql) {
      observations.sql = sql;
      if (/\b(?:INSERT|UPDATE|DELETE|REPLACE|ALTER|DROP|CREATE)\b/i.test(sql)) observations.writes += 1;
      return {
        bind(...bindings) {
          observations.bindings = bindings;
          return {
            async first() { return value; },
          };
        },
      };
    },
  };
}

function verifiedAccess() {
  return {
    async verifyAccessJwt() {
      return { ok: true, identity: { userId: actorId, email: 'operator@example.invalid' } };
    },
  };
}

function env(overrides = {}) {
  return {
    AFW_SYNTHETIC_CRM_READONLY_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'tokenizart.cloudflareaccess.com',
    ACCESS_AUD: 'canary-audience',
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: actorHash,
    DB: databaseReturning(row),
    ...overrides,
  };
}

test('loads only the allowlisted actor synthetic opportunity without PII or writes', async () => {
  const database = databaseReturning(row);
  const result = await loadSyntheticCrmReadonlyBoard(database, actorHash);

  assert.equal(result.ok, true);
  assert.match(database.observations.sql, /FROM crm_opportunities AS o\s+JOIN crm_transition_events AS e/iu);
  assert.match(database.observations.sql, /o\.actor_subject_hash = \?/iu);
  assert.match(database.observations.sql, /o\.domain = \?/iu);
  const selected = database.observations.sql.split(/\bFROM crm_opportunities AS o\b/iu)[0];
  assert.doesNotMatch(selected, /contact_ref|actor_subject_hash|idempotency_key|request_hash|email|name/iu);
  assert.deepEqual(database.observations.bindings, [actorHash, actorHash, 'example.invalid']);
  assert.equal(database.observations.writes, 0);
});

test('returns one human-readable synthetic CRM board with no secret identifiers', async () => {
  const handler = createSyntheticCrmReadonlyHandler(verifiedAccess());
  const response = await handler(request(), env());
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.contract, SYNTHETIC_CRM_READONLY_CONTRACT);
  assert.equal(payload.status, 'synthetic_crm_readonly_ready');
  assert.equal(payload.synthetic, true);
  assert.deepEqual(payload.opportunity, {
    domain: 'example.invalid',
    segment: 'other',
    problem: 'discovery',
    source: 'inbound_request',
    locale: 'es',
    stage: 'qualified',
    ownerContext: 'owner_unverified',
    maintainerContext: 'unknown',
    scopeCodes: ['discovery_pack', 'external_evidence'],
    estimatedValueBand: 'unknown',
    nextAction: 'confirm_interest',
    nextActionAt: null,
    evidenceRefs: [],
    createdAt: '2026-09-03T20:20:51.000Z',
    updatedAt: '2026-09-03T20:20:51.000Z',
  });
  assert.deepEqual(payload.timeline, [{
    fromStage: 'new',
    toStage: 'qualified',
    createdAt: '2026-09-03T20:20:51.000Z',
  }]);
  assert.deepEqual(payload.capabilities, {
    readsSyntheticOpportunity: true,
    persistsData: false,
    changesStage: false,
    sendsEmail: false,
    createsProposal: false,
    chargesPayment: false,
    modifiesCustomerSite: false,
  });
  assert.doesNotMatch(JSON.stringify(payload), /operator@|actor_subject|contact_ref|idempotency|request_hash|opp-synthetic|crm-plan/i);
});

test('fails closed before identity and requires the exact canary GET boundary', async () => {
  let identityCalls = 0;
  const handler = createSyntheticCrmReadonlyHandler({
    async verifyAccessJwt() {
      identityCalls += 1;
      return { ok: true, identity: { userId: actorId } };
    },
  });
  const disabled = await handler(request(), env({ AFW_SYNTHETIC_CRM_READONLY_ENABLED: 'false' }));
  assert.equal(disabled.status, 404);
  assert.equal(identityCalls, 0);

  for (const candidate of [
    request({ url: 'https://agentfriendlyweb.dev/api/canary/synthetic-crm-readonly' }),
    request({ url: `${endpoint}?page=1` }),
    request({ url: 'http://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-readonly' }),
    request({ method: 'POST' }),
  ]) {
    const response = await handler(candidate, env());
    assert.equal(response.status, 403);
    assert.equal((await response.json()).code, 'synthetic_crm_readonly_boundary_rejected');
  }
});

test('rejects unverified, non-allowlisted, missing or ambiguous synthetic records', async () => {
  let response = await createSyntheticCrmReadonlyHandler({
    async verifyAccessJwt() { return { ok: false }; },
  })(request(), env());
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_crm_readonly_identity_rejected');

  response = await createSyntheticCrmReadonlyHandler(verifiedAccess())(request(), env({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: 'f'.repeat(64),
  }));
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_crm_readonly_actor_not_allowed');

  for (const [value, code] of [
    [null, 'synthetic_crm_readonly_not_found'],
    [{ ...row, candidateCount: 2 }, 'synthetic_crm_readonly_source_invalid'],
    [{ ...row, stage: 'proposal' }, 'synthetic_crm_readonly_source_invalid'],
    [{ ...row, scopeCodesJson: '{bad json' }, 'synthetic_crm_readonly_source_invalid'],
    [{ ...row, scopeCodesJson: '["discovery_pack","external_evidence","mcp_readonly"]' }, 'synthetic_crm_readonly_source_invalid'],
    [{ ...row, evidenceRefsJson: '["https://example.invalid/evidence"]' }, 'synthetic_crm_readonly_source_invalid'],
  ]) {
    assert.deepEqual(await loadSyntheticCrmReadonlyBoard(databaseReturning(value), actorHash), { ok: false, code });
  }
});

test('readonly module cannot mutate CRM or invoke commercial actions', async () => {
  const source = await readFile(new URL('../lib/synthetic-crm-readonly.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\.batch\s*\(|\.run\s*\(|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|EMAIL_REVIEW_READY|\.send\s*\(|\.charge\s*\(|createProposal|modifyCustomerSite/iu);
});
