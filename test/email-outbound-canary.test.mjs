import assert from 'node:assert/strict';
import test from 'node:test';

import {
  EMAIL_OUTBOUND_CANARY_CONTRACT,
  buildEmailOutboundCanaryPlan,
  verifyEmailOutboundCanaryReceipt,
} from '../lib/email-outbound-canary.mjs';

const baseline = {
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_outbound_canary',
  origin: 'agentfriendlyweb.dev',
  observedAt: '2026-09-02T15:30:00Z',
  accountId: '85d0d5dadac3341a564f22ce885e9eec',
  zoneId: '4b1a3fe4b6dcb81e9d6a633174c5939f',
  workersPaidStatus: 'unknown',
  quota: null,
  usage: null,
  sendingSubdomains: [],
  dnsPreview: {
    requestedName: 'agentfriendlyweb.dev',
    records: [
      { name: 'cf-bounce.agentfriendlyweb.dev', type: 'MX', status: 'missing', contentClass: 'cloudflare_email_service_route' },
      { name: 'cf-bounce.agentfriendlyweb.dev', type: 'MX', status: 'missing', contentClass: 'cloudflare_email_service_route' },
      { name: 'cf-bounce.agentfriendlyweb.dev', type: 'MX', status: 'missing', contentClass: 'cloudflare_email_service_route' },
      { name: 'cf-bounce.agentfriendlyweb.dev', type: 'TXT', status: 'missing', contentClass: 'spf_policy' },
      { name: 'cf-bounce._domainkey.agentfriendlyweb.dev', type: 'TXT', status: 'missing', contentClass: 'dkim_public_key' },
      { name: '_dmarc.agentfriendlyweb.dev', type: 'TXT', status: 'missing', contentClass: 'dmarc_policy' },
    ],
    missingCount: 6,
    conflictCount: 0,
  },
};

function passingReceipt(overrides = {}) {
  return {
    contract: EMAIL_OUTBOUND_CANARY_CONTRACT,
    testId: 'afw-email-outbound-canary-20260902-001',
    provider: 'cloudflare_email_service',
    destinationId: 'verified_destination_1',
    sender: 'hello@agentfriendlyweb.dev',
    replyTo: 'hello@agentfriendlyweb.dev',
    templateId: 'transactional_canary_v1',
    purpose: 'transactional_test',
    humanApproved: true,
    automaticSend: false,
    outboundConfigured: true,
    deliveryCount: 1,
    deliveryId: 'cf-email-delivery-a1b2c3d4',
    marketing: false,
    newsletter: false,
    bodyPersisted: false,
    headersPersisted: false,
    attachmentsPersisted: false,
    retryCount: 0,
    ...overrides,
  };
}

test('builds a deterministic local-only plan from the sanitized unconfigured baseline', () => {
  const first = buildEmailOutboundCanaryPlan(baseline);
  const second = buildEmailOutboundCanaryPlan(baseline);

  assert.equal(first.ok, true);
  assert.deepEqual(first, second);
  assert.equal(first.plan.contract, EMAIL_OUTBOUND_CANARY_CONTRACT);
  assert.match(first.plan.planId, /^afw-email-outbound-plan-[0-9a-f]{20}$/);
  assert.equal(first.plan.state, 'provider_selected_remote_unconfigured');
  assert.equal(first.plan.provider, 'cloudflare_email_service');
  assert.equal(first.plan.providerConfigured, false);
  assert.equal(first.plan.sendingDomainOnboarded, false);
  assert.equal(first.plan.outboundEnabled, false);
  assert.equal(first.plan.sender, 'hello@agentfriendlyweb.dev');
  assert.equal(first.plan.replyTo, 'hello@agentfriendlyweb.dev');
  assert.equal(first.plan.destinationId, 'verified_destination_1');
  assert.equal(first.plan.dnsPreview.missingCount, 6);
  assert.equal(first.plan.dnsPreview.conflictCount, 0);
  assert.equal(first.plan.cost.verifiedDestinationCanaryUsd, 0);
  assert.equal(first.plan.cost.arbitraryRecipientsRequireWorkersPaid, true);
  assert.equal(first.plan.cost.workersPaidMinimumUsdPerMonth, 5);
  assert.equal(first.plan.cost.includedOutboundEmailsPerMonth, 3000);
  assert.equal(first.plan.cost.overageUsdPerThousandEmails, 0.35);
  assert.ok(first.plan.steps.every((step) => step.networkMutation === false));
  assert.ok(first.plan.blockedActions.includes('send_email'));
  assert.doesNotMatch(JSON.stringify(first), /gmail\.com|outlook\.com|destinationAddress|privateDestination/i);
});

test('moves only to the bounded ready state when the sending domain and DNS are verified', () => {
  const result = buildEmailOutboundCanaryPlan({
    ...baseline,
    sendingSubdomains: [{ name: 'agentfriendlyweb.dev', status: 'active' }],
    dnsPreview: {
      ...baseline.dnsPreview,
      records: baseline.dnsPreview.records.map((record) => ({ ...record, status: 'ready' })),
      missingCount: 0,
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.plan.state, 'sending_domain_ready_canary_blocked');
  assert.equal(result.plan.providerConfigured, true);
  assert.equal(result.plan.outboundEnabled, false);
  assert.equal(result.plan.steps.at(-1).status, 'pending_separate_human_approval');
});

test('fails closed across project boundaries and private or raw content fields', () => {
  const cases = [
    [{ ...baseline, project: 'tokenizart' }, 'invalid_project'],
    [{ ...baseline, repository: 'tokenizartinfo-ops/tokenizart-cloudflare-ai' }, 'invalid_repository'],
    [{ ...baseline, environment: 'companion_staging' }, 'invalid_environment'],
    [{ ...baseline, origin: 'tokenizart.com' }, 'invalid_origin'],
    [{ ...baseline, destinationAddress: 'private@example.com' }, 'private_destination_not_accepted'],
    [{ ...baseline, body: 'secret' }, 'message_content_not_accepted'],
    [{ ...baseline, dnsPreview: { ...baseline.dnsPreview, conflictCount: 1 } }, 'dns_conflict'],
    [{ ...baseline, sendingSubdomains: [{ name: 'mail.tokenizart.com', status: 'active' }] }, 'invalid_sending_subdomain'],
    [{
      ...baseline,
      dnsPreview: {
        ...baseline.dnsPreview,
        records: baseline.dnsPreview.records.map((record, index) => (
          index === 0 ? { ...record, content: 'raw-dns-value' } : record
        )),
      },
    }, 'raw_dns_content_not_accepted'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(buildEmailOutboundCanaryPlan(input), { ok: false, code });
  }
});

test('rejects ambiguous quotas and malformed DNS previews', () => {
  const cases = [
    [{ ...baseline, quota: -1 }, 'invalid_quota'],
    [{ ...baseline, usage: 1 }, 'ambiguous_quota_usage'],
    [{ ...baseline, workersPaidStatus: 'enabled' }, 'invalid_workers_paid_status'],
    [{ ...baseline, dnsPreview: { ...baseline.dnsPreview, missingCount: 5 } }, 'dns_preview_count_mismatch'],
    [{ ...baseline, dnsPreview: { ...baseline.dnsPreview, requestedName: 'mail.agentfriendlyweb.dev' } }, 'invalid_dns_preview_name'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(buildEmailOutboundCanaryPlan(input), { ok: false, code });
  }
});

test('verifies one human-approved metadata-only canary receipt', () => {
  const receipt = passingReceipt();

  assert.deepEqual(verifyEmailOutboundCanaryReceipt(receipt), {
    ok: true,
    contract: EMAIL_OUTBOUND_CANARY_CONTRACT,
    status: 'human_canary_verified',
    testId: receipt.testId,
    destinationId: 'verified_destination_1',
    deliveryCount: 1,
  });
});

test('rejects private addresses, message content, bulk use, automation and incomplete delivery', () => {
  const cases = [
    [{ ...passingReceipt(), destinationAddress: 'private@example.com' }, 'private_destination_not_accepted'],
    [{ ...passingReceipt(), body: 'content' }, 'message_content_not_accepted'],
    [passingReceipt({ humanApproved: false }), 'human_approval_required'],
    [passingReceipt({ automaticSend: true }), 'automatic_send_detected'],
    [passingReceipt({ outboundConfigured: false }), 'outbound_not_configured'],
    [passingReceipt({ deliveryCount: 0 }), 'delivery_count_invalid'],
    [passingReceipt({ marketing: true }), 'bulk_email_detected'],
    [passingReceipt({ newsletter: true }), 'bulk_email_detected'],
    [passingReceipt({ retryCount: 1 }), 'automatic_retry_detected'],
    [passingReceipt({ destinationId: 'customer@example.com' }), 'invalid_destination_id'],
    [passingReceipt({ provider: 'smtp' }), 'invalid_provider'],
  ];

  for (const [receipt, code] of cases) {
    assert.deepEqual(verifyEmailOutboundCanaryReceipt(receipt), { ok: false, code });
  }
});
