import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ACTIVE_INBOUND_ALIASES,
  BLOCKED_INBOUND_ALIASES,
  EMAIL_INBOUND_CANARY_CONTRACT,
  RESERVED_INBOUND_ALIASES,
  buildEmailInboundCanaryPlan,
  verifyEmailInboundCanaryReceipt,
} from '../lib/email-inbound-canary.mjs';

const baseline = {
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_inbound_canary',
  origin: 'agentfriendlyweb.dev',
  zoneId: '4b1a3fe4b6dcb81e9d6a633174c5939f',
  zoneStatus: 'active',
  routingStatus: 'unconfigured',
  routingEnabled: false,
  destinationPresent: false,
  destinationVerified: false,
  existingMailDns: [],
  existingRules: [],
};

function passingReceipt(overrides = {}) {
  return {
    contract: EMAIL_INBOUND_CANARY_CONTRACT,
    testId: 'afw-email-canary-20260902-01',
    aliasResults: ACTIVE_INBOUND_ALIASES.map((alias) => ({ alias, deliveryCount: 1 })),
    noReplyDeliveryCount: 0,
    senderAllowlisted: true,
    responseSent: false,
    bodyPersisted: false,
    attachmentsPersisted: false,
    outboundConfigured: false,
    ...overrides,
  };
}

test('prepares the exact inbound-only alias boundary', () => {
  const result = buildEmailInboundCanaryPlan(baseline);

  assert.equal(result.ok, true);
  assert.equal(result.plan.contract, EMAIL_INBOUND_CANARY_CONTRACT);
  assert.deepEqual(result.plan.activeAliases, ACTIVE_INBOUND_ALIASES);
  assert.deepEqual(result.plan.reservedAliases, RESERVED_INBOUND_ALIASES);
  assert.deepEqual(result.plan.blockedInboundAliases, BLOCKED_INBOUND_ALIASES);
  assert.equal(result.plan.state, 'destination_verification_required');
  assert.equal(result.plan.outboundEnabled, false);
  assert.equal(result.plan.persistenceEnabled, false);
  assert.ok(result.plan.steps.every((step) => step.networkMutation === false));
  assert.ok(result.plan.blockedActions.includes('send_email'));
  assert.ok(result.plan.blockedActions.includes('persist_message_body'));
  assert.doesNotMatch(JSON.stringify(result), /gmail\.com/i);
});

test('becomes ready only after the private destination is present and verified', () => {
  const result = buildEmailInboundCanaryPlan({
    ...baseline,
    destinationPresent: true,
    destinationVerified: true,
    destinationId: '4de3bd12f7ae4cefb88cd1182db340ab',
  });

  assert.equal(result.ok, true);
  assert.equal(result.plan.state, 'ready_to_apply');
  assert.equal(result.plan.steps[0].status, 'satisfied');
  assert.equal(result.plan.steps[1].status, 'pending_remote_approval');
  assert.equal(result.plan.rollback.disableRoutingDns, true);
  assert.equal(result.plan.rollback.restorePreexistingRules, false);
});

test('fails closed for foreign boundaries, invalid destination state, MX conflicts or unknown enabled rules', () => {
  const cases = [
    [{ ...baseline, project: 'tokenizart' }, 'invalid_project'],
    [{ ...baseline, repository: 'tokenizartinfo-ops/tokenizart-core' }, 'invalid_repository'],
    [{ ...baseline, environment: 'companion_staging' }, 'invalid_environment'],
    [{ ...baseline, origin: 'tokenizart.com' }, 'invalid_origin'],
    [{ ...baseline, destinationVerified: true }, 'invalid_destination_state'],
    [{ ...baseline, existingMailDns: [{ type: 'MX', contentClass: 'other_mx' }] }, 'mail_dns_conflict'],
    [{ ...baseline, existingRules: [{ id: 'foreign', enabled: true, managedByAfw: false }] }, 'enabled_rule_conflict'],
    [{ ...baseline, privateDestination: 'private@example.com' }, 'unsupported_input_field'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(buildEmailInboundCanaryPlan(input), { ok: false, code });
  }
});

test('accepts only a complete metadata-only synthetic receipt', () => {
  const result = verifyEmailInboundCanaryReceipt(passingReceipt());

  assert.deepEqual(result, {
    ok: true,
    contract: EMAIL_INBOUND_CANARY_CONTRACT,
    status: 'passed',
    testId: 'afw-email-canary-20260902-01',
    activeAliasCount: 3,
  });
});

test('rejects incomplete delivery, outbound activity, persistence and message content', () => {
  const cases = [
    [passingReceipt({ aliasResults: [{ alias: ACTIVE_INBOUND_ALIASES[0], deliveryCount: 1 }] }), 'alias_results_incomplete'],
    [passingReceipt({ noReplyDeliveryCount: 1 }), 'blocked_alias_delivered'],
    [passingReceipt({ senderAllowlisted: false }), 'sender_not_allowlisted'],
    [passingReceipt({ responseSent: true }), 'outbound_activity_detected'],
    [passingReceipt({ outboundConfigured: true }), 'outbound_activity_detected'],
    [passingReceipt({ bodyPersisted: true }), 'message_persistence_detected'],
    [passingReceipt({ attachmentsPersisted: true }), 'message_persistence_detected'],
    [passingReceipt({ body: 'synthetic body' }), 'message_content_not_accepted'],
    [passingReceipt({ attachments: [] }), 'message_content_not_accepted'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(verifyEmailInboundCanaryReceipt(input), { ok: false, code });
  }
});
