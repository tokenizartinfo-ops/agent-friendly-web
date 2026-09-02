import { createHash } from 'node:crypto';

export const EMAIL_OUTBOUND_CANARY_CONTRACT = 'agent-friendly-web.email-outbound-canary.v1';

const EXPECTED = Object.freeze({
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_outbound_canary',
  origin: 'agentfriendlyweb.dev',
  provider: 'cloudflare_email_service',
  sender: 'hello@agentfriendlyweb.dev',
  replyTo: 'hello@agentfriendlyweb.dev',
  destinationId: 'verified_destination_1',
  templateId: 'transactional_canary_v1',
  purpose: 'transactional_test',
});

const PLAN_KEYS = new Set([
  'project',
  'repository',
  'environment',
  'origin',
  'observedAt',
  'accountId',
  'zoneId',
  'workersPaidStatus',
  'quota',
  'usage',
  'sendingSubdomains',
  'dnsPreview',
]);
const DNS_PREVIEW_KEYS = new Set(['requestedName', 'records', 'missingCount', 'conflictCount']);
const DNS_RECORD_KEYS = new Set(['name', 'type', 'status', 'contentClass']);
const SENDING_SUBDOMAIN_KEYS = new Set(['name', 'status']);
const RECEIPT_KEYS = new Set([
  'contract',
  'testId',
  'provider',
  'destinationId',
  'sender',
  'replyTo',
  'templateId',
  'purpose',
  'humanApproved',
  'automaticSend',
  'outboundConfigured',
  'deliveryCount',
  'deliveryId',
  'marketing',
  'newsletter',
  'bodyPersisted',
  'headersPersisted',
  'attachmentsPersisted',
  'retryCount',
]);
const PRIVATE_DESTINATION_KEYS = new Set([
  'destinationAddress',
  'destinationEmail',
  'privateDestination',
  'recipient',
  'recipientAddress',
]);
const MESSAGE_CONTENT_KEYS = new Set([
  'body',
  'text',
  'html',
  'headers',
  'attachments',
  'raw',
  'message',
]);
const RAW_DNS_KEYS = new Set(['content', 'value', 'data', 'raw']);
const HEX_ID = /^[0-9a-f]{32}$/i;
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
const TEST_ID = /^afw-email-outbound-canary-[a-z0-9-]{8,80}$/i;
const DELIVERY_ID = /^cf-email-delivery-[a-z0-9-]{6,100}$/i;

const EXPECTED_DNS_RECORDS = Object.freeze([
  'cf-bounce.agentfriendlyweb.dev|MX|cloudflare_email_service_route',
  'cf-bounce.agentfriendlyweb.dev|MX|cloudflare_email_service_route',
  'cf-bounce.agentfriendlyweb.dev|MX|cloudflare_email_service_route',
  'cf-bounce.agentfriendlyweb.dev|TXT|spf_policy',
  'cf-bounce._domainkey.agentfriendlyweb.dev|TXT|dkim_public_key',
  '_dmarc.agentfriendlyweb.dev|TXT|dmarc_policy',
]);

function failure(code) {
  return { ok: false, code };
}

function hasOnlyKeys(input, allowed) {
  return Object.keys(input).every((key) => allowed.has(key));
}

function isNullableCounter(value) {
  return value === null || (Number.isSafeInteger(value) && value >= 0);
}

function normalizeSendingSubdomains(rows) {
  if (!Array.isArray(rows) || rows.length > 10) return failure('invalid_sending_subdomain_inventory');
  const normalized = [];
  for (const row of rows) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      return failure('invalid_sending_subdomain_inventory');
    }
    if (!hasOnlyKeys(row, SENDING_SUBDOMAIN_KEYS)) return failure('unsupported_sending_subdomain_field');
    if (row.name !== EXPECTED.origin || !['active', 'pending', 'error'].includes(row.status)) {
      return failure('invalid_sending_subdomain');
    }
    normalized.push({ name: row.name, status: row.status });
  }
  return { ok: true, value: normalized };
}

function normalizeDnsPreview(preview) {
  if (!preview || typeof preview !== 'object' || Array.isArray(preview)) return failure('invalid_dns_preview');
  if (!hasOnlyKeys(preview, DNS_PREVIEW_KEYS)) return failure('unsupported_dns_preview_field');
  if (preview.requestedName !== EXPECTED.origin) return failure('invalid_dns_preview_name');
  if (!Array.isArray(preview.records) || preview.records.length !== EXPECTED_DNS_RECORDS.length) {
    return failure('invalid_dns_record_inventory');
  }
  if (!Number.isSafeInteger(preview.missingCount) || preview.missingCount < 0) {
    return failure('invalid_dns_missing_count');
  }
  if (!Number.isSafeInteger(preview.conflictCount) || preview.conflictCount < 0) {
    return failure('invalid_dns_conflict_count');
  }
  if (preview.conflictCount > 0) return failure('dns_conflict');

  const normalized = [];
  for (const record of preview.records) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      return failure('invalid_dns_record_inventory');
    }
    if (Object.keys(record).some((key) => RAW_DNS_KEYS.has(key))) {
      return failure('raw_dns_content_not_accepted');
    }
    if (!hasOnlyKeys(record, DNS_RECORD_KEYS)) return failure('unsupported_dns_record_field');
    const normalizedRecord = {
      name: String(record.name || '').toLowerCase(),
      type: String(record.type || '').toUpperCase(),
      status: String(record.status || '').toLowerCase(),
      contentClass: String(record.contentClass || ''),
    };
    if (!['missing', 'ready'].includes(normalizedRecord.status)) return failure('invalid_dns_record_status');
    normalized.push(normalizedRecord);
  }

  const signatures = normalized
    .map((record) => `${record.name}|${record.type}|${record.contentClass}`)
    .sort();
  if (JSON.stringify(signatures) !== JSON.stringify([...EXPECTED_DNS_RECORDS].sort())) {
    return failure('invalid_dns_record_inventory');
  }
  const actualMissing = normalized.filter((record) => record.status === 'missing').length;
  if (actualMissing !== preview.missingCount) return failure('dns_preview_count_mismatch');

  return {
    ok: true,
    value: {
      requestedName: EXPECTED.origin,
      records: normalized,
      missingCount: preview.missingCount,
      conflictCount: preview.conflictCount,
    },
  };
}

export function buildEmailOutboundCanaryPlan(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_input');
  for (const key of Object.keys(input)) {
    if (PRIVATE_DESTINATION_KEYS.has(key)) return failure('private_destination_not_accepted');
    if (MESSAGE_CONTENT_KEYS.has(key)) return failure('message_content_not_accepted');
    if (!PLAN_KEYS.has(key)) return failure('unsupported_input_field');
  }
  if (input.project !== EXPECTED.project) return failure('invalid_project');
  if (input.repository !== EXPECTED.repository) return failure('invalid_repository');
  if (input.environment !== EXPECTED.environment) return failure('invalid_environment');
  if (input.origin !== EXPECTED.origin) return failure('invalid_origin');
  if (!ISO_TIMESTAMP.test(input.observedAt || '') || Number.isNaN(Date.parse(input.observedAt))) {
    return failure('invalid_observed_at');
  }
  if (!HEX_ID.test(input.accountId || '')) return failure('invalid_account_id');
  if (!HEX_ID.test(input.zoneId || '')) return failure('invalid_zone_id');
  if (!['unknown', 'inactive', 'active'].includes(input.workersPaidStatus)) {
    return failure('invalid_workers_paid_status');
  }
  if (!isNullableCounter(input.quota)) return failure('invalid_quota');
  if (!isNullableCounter(input.usage)) return failure('invalid_usage');
  if ((input.quota === null) !== (input.usage === null)) return failure('ambiguous_quota_usage');
  if (input.quota !== null && input.usage > input.quota) return failure('invalid_quota_usage');

  const subdomainsResult = normalizeSendingSubdomains(input.sendingSubdomains);
  if (!subdomainsResult.ok) return subdomainsResult;
  const dnsResult = normalizeDnsPreview(input.dnsPreview);
  if (!dnsResult.ok) return dnsResult;

  const sendingDomainOnboarded = subdomainsResult.value.some((item) => item.status === 'active');
  const dnsReady = dnsResult.value.missingCount === 0
    && dnsResult.value.records.every((record) => record.status === 'ready');
  const providerConfigured = sendingDomainOnboarded && dnsReady;
  const state = providerConfigured
    ? 'sending_domain_ready_canary_blocked'
    : 'provider_selected_remote_unconfigured';
  const stableInput = {
    contract: EMAIL_OUTBOUND_CANARY_CONTRACT,
    ...EXPECTED,
    observedAt: input.observedAt,
    accountId: input.accountId.toLowerCase(),
    zoneId: input.zoneId.toLowerCase(),
    workersPaidStatus: input.workersPaidStatus,
    quota: input.quota,
    usage: input.usage,
    sendingSubdomains: subdomainsResult.value,
    dnsPreview: dnsResult.value,
  };
  const planId = `afw-email-outbound-plan-${createHash('sha256')
    .update(JSON.stringify(stableInput))
    .digest('hex')
    .slice(0, 20)}`;

  return {
    ok: true,
    plan: {
      contract: EMAIL_OUTBOUND_CANARY_CONTRACT,
      planId,
      project: EXPECTED.project,
      repository: EXPECTED.repository,
      environment: EXPECTED.environment,
      origin: EXPECTED.origin,
      observedAt: input.observedAt,
      accountId: stableInput.accountId,
      zoneId: stableInput.zoneId,
      state,
      provider: EXPECTED.provider,
      providerSelected: true,
      providerConfigured,
      workersPaidStatus: input.workersPaidStatus,
      sender: EXPECTED.sender,
      replyTo: EXPECTED.replyTo,
      destinationId: EXPECTED.destinationId,
      templateId: EXPECTED.templateId,
      sendingDomainOnboarded,
      outboundEnabled: false,
      automaticSendAllowed: false,
      arbitraryRecipientsAllowed: false,
      marketingAllowed: false,
      dnsPreview: dnsResult.value,
      cost: {
        pricingObservedAt: '2026-09-02',
        verifiedDestinationCanaryUsd: 0,
        arbitraryRecipientsRequireWorkersPaid: true,
        workersPaidMinimumUsdPerMonth: 5,
        includedOutboundEmailsPerMonth: 3000,
        overageUsdPerThousandEmails: 0.35,
        source: 'https://developers.cloudflare.com/email-service/platform/pricing/',
      },
      steps: [
        {
          operation: 'select_cloudflare_email_service',
          status: 'satisfied',
          networkMutation: false,
        },
        {
          operation: 'onboard_sending_domain',
          status: sendingDomainOnboarded ? 'satisfied' : 'pending_separate_remote_approval',
          networkMutation: false,
        },
        {
          operation: 'apply_and_verify_email_service_dns',
          status: dnsReady ? 'satisfied' : 'blocked_by_sending_domain_onboarding',
          networkMutation: false,
        },
        {
          operation: 'create_allowlisted_send_email_binding',
          status: providerConfigured ? 'pending_separate_human_approval' : 'blocked_by_email_service_dns',
          networkMutation: false,
        },
        {
          operation: 'send_one_human_approved_transactional_canary',
          status: providerConfigured ? 'pending_separate_human_approval' : 'blocked_by_email_service_dns',
          networkMutation: false,
        },
      ],
      rollback: {
        disableSendBindingFirst: true,
        removeDedicatedWorkerRouteSecond: true,
        removeOnlyEmailServiceDnsThird: true,
        removeSendingDomainFourth: true,
        preserveInboundEmailRouting: true,
        preserveSanitizedReceipt: true,
      },
      blockedActions: [
        'send_email',
        'configure_dns',
        'configure_email_service_domain',
        'change_workers_plan',
        'create_send_email_binding',
        'allow_arbitrary_recipient',
        'send_automatic_reply',
        'start_newsletter',
        'send_marketing_email',
        'persist_message_body',
        'persist_message_headers',
        'persist_attachments',
      ],
    },
  };
}

export function verifyEmailOutboundCanaryReceipt(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_receipt');
  for (const key of Object.keys(input)) {
    if (PRIVATE_DESTINATION_KEYS.has(key)) return failure('private_destination_not_accepted');
    if (MESSAGE_CONTENT_KEYS.has(key)) return failure('message_content_not_accepted');
    if (!RECEIPT_KEYS.has(key)) return failure('unsupported_receipt_field');
  }
  if (input.contract !== EMAIL_OUTBOUND_CANARY_CONTRACT) return failure('invalid_contract');
  if (!TEST_ID.test(input.testId || '')) return failure('invalid_test_id');
  if (input.provider !== EXPECTED.provider) return failure('invalid_provider');
  if (input.destinationId !== EXPECTED.destinationId) return failure('invalid_destination_id');
  if (input.sender !== EXPECTED.sender) return failure('invalid_sender');
  if (input.replyTo !== EXPECTED.replyTo) return failure('invalid_reply_to');
  if (input.templateId !== EXPECTED.templateId) return failure('invalid_template_id');
  if (input.purpose !== EXPECTED.purpose) return failure('invalid_purpose');
  if (input.humanApproved !== true) return failure('human_approval_required');
  if (input.automaticSend !== false) return failure('automatic_send_detected');
  if (input.outboundConfigured !== true) return failure('outbound_not_configured');
  if (input.deliveryCount !== 1 || !DELIVERY_ID.test(input.deliveryId || '')) {
    return failure('delivery_count_invalid');
  }
  if (input.marketing !== false || input.newsletter !== false) return failure('bulk_email_detected');
  if (input.retryCount !== 0) return failure('automatic_retry_detected');
  if (
    input.bodyPersisted !== false
    || input.headersPersisted !== false
    || input.attachmentsPersisted !== false
  ) return failure('message_persistence_detected');

  return {
    ok: true,
    contract: EMAIL_OUTBOUND_CANARY_CONTRACT,
    status: 'human_canary_verified',
    testId: input.testId,
    destinationId: EXPECTED.destinationId,
    deliveryCount: 1,
  };
}
