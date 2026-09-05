import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  SYNTHETIC_CRM_PERSISTENCE_CONTRACT,
  canonicalSyntheticCrmRequestHash,
  createSyntheticCrmPersistenceHandler,
  persistSyntheticCrmPlan,
} from '../lib/synthetic-crm-persistence.mjs';

const actorHash = 'a'.repeat(64);
const review = {
  contract: 'agent-friendly-web.synthetic-commercial-review.v1',
  status: 'planned_not_persisted',
  synthetic: true,
  source: { type: 'synthetic_contact', persistedState: 'new', consentPurpose: 'requested_plan' },
  opportunity: {
    opportunityId: 'opp-synthetic-1234567890abcdef1234',
    contactRef: 'contact-synthetic-1234567890abcdef1234',
    domain: 'example.invalid',
    segment: 'other',
    problem: 'discovery',
    source: 'inbound_request',
    locale: 'es',
    stage: 'new',
    ownerContext: 'owner_unverified',
    maintainerContext: 'unknown',
    scopeCodes: ['discovery_pack', 'external_evidence'],
    estimatedValueBand: 'unknown',
    nextAction: 'confirm_interest',
    nextActionAt: null,
    evidenceRefs: [],
    lossReason: null,
  },
  transition: {
    contract: 'agent-friendly-web.crm-lite.v1',
    transitionPlanId: 'crm-plan-1234567890abcdef1234',
    idempotencyKey: 'opp-synthetic-1234567890abcdef1234:new:qualified',
    opportunityId: 'opp-synthetic-1234567890abcdef1234',
    actorRef: 'actor-1234567890abcdef1234',
    fromStage: 'new',
    toStage: 'qualified',
    reasonCode: null,
    evidenceRefs: [],
    humanReview: { required: false, reasons: [] },
    persistenceEnabled: false,
    automaticActionsAllowed: false,
    blockedActions: ['persist_opportunity', 'send_email', 'create_proposal', 'charge_payment', 'modify_customer_site'],
  },
  capabilities: {
    readsSyntheticContact: true,
    persistsData: false,
    sendsEmail: false,
    createsProposal: false,
    chargesPayment: false,
  },
};

class FakeStatement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.bindings = [];
  }

  bind(...bindings) {
    this.bindings = bindings;
    return this;
  }

  async first() {
    this.database.queries.push({ sql: this.sql, bindings: this.bindings });
    return this.database.firstResults.shift() ?? null;
  }
}

class FakeD1 {
  constructor(firstResults = []) {
    this.firstResults = [...firstResults];
    this.queries = [];
    this.batches = [];
    this.batchError = null;
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }

  async batch(statements) {
    this.batches.push(statements.map((statement) => ({ sql: statement.sql, bindings: statement.bindings })));
    if (this.batchError) throw this.batchError;
    return statements.map(() => ({ success: true, meta: { changes: 1 } }));
  }
}

test('persists one sanitized opportunity and transition atomically', async () => {
  const database = new FakeD1([null]);
  const result = await persistSyntheticCrmPlan(database, review, actorHash, {
    now: () => '2026-09-03T20:00:00.000Z',
  });

  assert.deepEqual(result, {
    opportunityId: review.opportunity.opportunityId,
    transitionPlanId: review.transition.transitionPlanId,
    stage: 'qualified',
    persisted: true,
    duplicate: false,
    conflict: false,
  });
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 2);
  assert.match(database.batches[0][0].sql, /INSERT INTO crm_opportunities/);
  assert.match(database.batches[0][1].sql, /INSERT INTO crm_transition_events/);
  const bound = JSON.stringify(database.batches[0].flatMap((statement) => statement.bindings));
  assert.doesNotMatch(bound, /@|Gabriel|mensaje|password|secret-value/i);
  assert.match(bound, /example\.invalid/);
});

test('classifies an idempotent replay and conflicting reuse without another batch', async () => {
  const requestHash = await canonicalSyntheticCrmRequestHash(review, actorHash);
  const duplicate = new FakeD1([{
    opportunityId: review.opportunity.opportunityId,
    transitionPlanId: review.transition.transitionPlanId,
    stage: 'qualified',
    requestHash,
    eventRequestHash: requestHash,
  }]);
  assert.deepEqual(await persistSyntheticCrmPlan(duplicate, review, actorHash), {
    opportunityId: review.opportunity.opportunityId,
    transitionPlanId: review.transition.transitionPlanId,
    stage: 'qualified',
    persisted: true,
    duplicate: true,
    conflict: false,
  });
  assert.equal(duplicate.batches.length, 0);

  const conflict = new FakeD1([{
    opportunityId: review.opportunity.opportunityId,
    transitionPlanId: review.transition.transitionPlanId,
    stage: 'qualified',
    requestHash: 'b'.repeat(64),
    eventRequestHash: 'b'.repeat(64),
  }]);
  assert.equal((await persistSyntheticCrmPlan(conflict, review, actorHash)).conflict, true);
  assert.equal(conflict.batches.length, 0);
});

test('fails closed for malformed input, missing D1 and unrelated storage errors', async () => {
  await assert.rejects(() => persistSyntheticCrmPlan(null, review, actorHash), /synthetic_crm_store_unavailable/);
  await assert.rejects(() => persistSyntheticCrmPlan(new FakeD1(), { ...review, synthetic: false }, actorHash), /synthetic_crm_store_invalid_input/);
  const failed = new FakeD1([null]);
  failed.batchError = new Error('storage offline');
  await assert.rejects(() => persistSyntheticCrmPlan(failed, review, actorHash), /synthetic_crm_store_failed/);
});

test('handler requires the exact enabled same-origin Access boundary', async () => {
  let identityCalls = 0;
  let persistenceCalls = 0;
  const handler = createSyntheticCrmPersistenceHandler({
    verifyAccessJwt: async () => {
      identityCalls += 1;
      return { ok: true, identity: { userId: 'subject-1' } };
    },
    loadReview: async () => ({ ok: true, value: review }),
    persistPlan: async () => {
      persistenceCalls += 1;
      return {
        opportunityId: review.opportunity.opportunityId,
        transitionPlanId: review.transition.transitionPlanId,
        stage: 'qualified', persisted: true, duplicate: false, conflict: false,
      };
    },
  });
  const body = JSON.stringify({
    contract: SYNTHETIC_CRM_PERSISTENCE_CONTRACT,
    action: 'persist_one_synthetic_opportunity',
    confirmation: 'synthetic_only',
  });
  const disabled = await handler(new Request('https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-persistence', {
    method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://canary.agentfriendlyweb.dev' }, body,
  }), {});
  assert.equal(disabled.status, 404);
  assert.equal(identityCalls, 0);

  const actorSubjectHash = await import('../lib/access-subject-hash.mjs').then(({ hashAccessSubject }) => hashAccessSubject('subject-1'));
  const limiter = { limit: async () => ({ success: true }) };
  const env = {
    AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'team.cloudflareaccess.com',
    ACCESS_AUD: 'a'.repeat(64),
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: actorSubjectHash,
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: limiter,
    DB: new FakeD1(),
  };
  const response = await handler(new Request('https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-persistence', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://canary.agentfriendlyweb.dev',
      'cf-access-jwt-assertion': 'token',
    },
    body,
  }), env);
  assert.equal(response.status, 201);
  const payload = await response.json();
  assert.equal(payload.status, 'synthetic_opportunity_persisted');
  assert.equal(payload.opportunity.stage, 'qualified');
  assert.equal(payload.capabilities.sendsEmail, false);
  assert.equal(payload.capabilities.createsProposal, false);
  assert.equal(payload.capabilities.chargesPayment, false);
  assert.equal(persistenceCalls, 1);
  assert.doesNotMatch(JSON.stringify(payload), /@|subject-1|[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}/i);
});

test('handler rejects cross-origin, malformed or unconfirmed requests before persistence', async () => {
  let persistenceCalls = 0;
  const handler = createSyntheticCrmPersistenceHandler({
    verifyAccessJwt: async () => ({ ok: true, identity: { userId: 'subject-1' } }),
    loadReview: async () => ({ ok: true, value: review }),
    persistPlan: async () => { persistenceCalls += 1; },
  });
  const actorSubjectHash = await import('../lib/access-subject-hash.mjs').then(({ hashAccessSubject }) => hashAccessSubject('subject-1'));
  const env = {
    AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'team.cloudflareaccess.com',
    ACCESS_AUD: 'a'.repeat(64),
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: actorSubjectHash,
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    DB: new FakeD1(),
  };
  for (const request of [
    new Request('https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-persistence', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://evil.example' }, body: '{}',
    }),
    new Request('https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-persistence?retry=1', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://canary.agentfriendlyweb.dev' }, body: '{}',
    }),
  ]) {
    const response = await handler(request, env);
    assert.equal(response.status, 403);
  }
  assert.equal(persistenceCalls, 0);

  for (const body of [
    '{}',
    JSON.stringify({
      contract: SYNTHETIC_CRM_PERSISTENCE_CONTRACT,
      action: 'persist_one_synthetic_opportunity',
      confirmation: 'not_confirmed',
    }),
  ]) {
    const response = await handler(new Request('https://canary.agentfriendlyweb.dev/api/canary/synthetic-crm-persistence', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://canary.agentfriendlyweb.dev',
        'cf-access-jwt-assertion': 'token',
      },
      body,
    }), env);
    assert.equal(response.status, 400);
  }
  assert.equal(persistenceCalls, 0);
});

test('persistence module contains no email, proposal, payment or customer-site integration', async () => {
  const source = await readFile(new URL('../lib/synthetic-crm-persistence.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /EMAIL_REVIEW_READY|\.send\s*\(|\.charge\s*\(|createProposal|modifyCustomerSite|from\s+['"][^'"]*payment/iu);
});
