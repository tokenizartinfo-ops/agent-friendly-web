import { createHash } from 'node:crypto';

export const EMAIL_INBOUND_CANARY_CONTRACT = 'agent-friendly-web.email-inbound-canary.v1';
export const ACTIVE_INBOUND_ALIASES = Object.freeze([
  'hello@agentfriendlyweb.dev',
  'hola@agentfriendlyweb.dev',
  'ola@agentfriendlyweb.dev',
]);
export const RESERVED_INBOUND_ALIASES = Object.freeze([
  'auditoria@agentfriendlyweb.dev',
  'seguridad@agentfriendlyweb.dev',
  'bajas@agentfriendlyweb.dev',
]);
export const BLOCKED_INBOUND_ALIASES = Object.freeze(['no-reply@agentfriendlyweb.dev']);

const EXPECTED = Object.freeze({
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_inbound_canary',
  origin: 'agentfriendlyweb.dev',
});
const PLAN_KEYS = new Set([
  'project',
  'repository',
  'environment',
  'origin',
  'zoneId',
  'zoneStatus',
  'routingStatus',
  'routingEnabled',
  'destinationPresent',
  'destinationVerified',
  'destinationId',
  'existingMailDns',
  'existingRules',
]);
const RECEIPT_KEYS = new Set([
  'contract',
  'testId',
  'aliasResults',
  'noReplyDeliveryCount',
  'senderAllowlisted',
  'responseSent',
  'bodyPersisted',
  'attachmentsPersisted',
  'outboundConfigured',
]);
const MESSAGE_CONTENT_KEYS = new Set(['body', 'text', 'html', 'headers', 'attachments', 'raw']);
const ZONE_ID = /^[0-9a-f]{32}$/i;
const DESTINATION_ID = /^[0-9a-f]{32}$/i;
const TEST_ID = /^afw-email-canary-[a-z0-9-]{8,80}$/i;

function failure(code) {
  return { ok: false, code };
}

function hasOnlyKeys(input, allowed) {
  return Object.keys(input).every((key) => allowed.has(key));
}

function normalizeMailDns(rows) {
  if (!Array.isArray(rows) || rows.length > 20) return null;
  return rows.map((row) => ({
    type: String(row?.type || '').toUpperCase(),
    contentClass: String(row?.contentClass || ''),
  }));
}

function normalizeRules(rows) {
  if (!Array.isArray(rows) || rows.length > 50) return null;
  return rows.map((row) => ({
    id: typeof row?.id === 'string' ? row.id : '',
    enabled: row?.enabled === true,
    managedByAfw: row?.managedByAfw === true,
  }));
}

export function buildEmailInboundCanaryPlan(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_input');
  if (!hasOnlyKeys(input, PLAN_KEYS)) return failure('unsupported_input_field');
  if (input.project !== EXPECTED.project) return failure('invalid_project');
  if (input.repository !== EXPECTED.repository) return failure('invalid_repository');
  if (input.environment !== EXPECTED.environment) return failure('invalid_environment');
  if (input.origin !== EXPECTED.origin) return failure('invalid_origin');
  if (!ZONE_ID.test(input.zoneId || '')) return failure('invalid_zone_id');
  if (input.zoneStatus !== 'active') return failure('zone_not_active');
  if (!['unconfigured', 'ready'].includes(input.routingStatus)) return failure('invalid_routing_status');
  if (typeof input.routingEnabled !== 'boolean') return failure('invalid_routing_state');
  if (typeof input.destinationPresent !== 'boolean' || typeof input.destinationVerified !== 'boolean') {
    return failure('invalid_destination_state');
  }
  if (input.destinationVerified && !input.destinationPresent) return failure('invalid_destination_state');
  if (input.destinationId !== undefined && !DESTINATION_ID.test(input.destinationId)) {
    return failure('invalid_destination_id');
  }
  if (input.destinationPresent && !DESTINATION_ID.test(input.destinationId || '')) {
    return failure('invalid_destination_id');
  }

  const mailDns = normalizeMailDns(input.existingMailDns);
  if (!mailDns) return failure('invalid_mail_dns_inventory');
  if (mailDns.some((record) => record.type === 'MX' && record.contentClass !== 'cloudflare_mx')) {
    return failure('mail_dns_conflict');
  }

  const rules = normalizeRules(input.existingRules);
  if (!rules) return failure('invalid_rule_inventory');
  if (rules.some((rule) => rule.enabled && !rule.managedByAfw)) return failure('enabled_rule_conflict');

  const destinationReady = input.destinationPresent && input.destinationVerified;
  const state = destinationReady
    ? (input.routingEnabled ? 'routing_verification_required' : 'ready_to_apply')
    : 'destination_verification_required';
  const stableInput = {
    contract: EMAIL_INBOUND_CANARY_CONTRACT,
    ...EXPECTED,
    zoneId: input.zoneId.toLowerCase(),
    zoneStatus: input.zoneStatus,
    routingStatus: input.routingStatus,
    routingEnabled: input.routingEnabled,
    destinationPresent: input.destinationPresent,
    destinationVerified: input.destinationVerified,
    destinationId: input.destinationId || null,
    existingMailDns: mailDns,
    existingRules: rules,
  };
  const planId = `afw-email-plan-${createHash('sha256').update(JSON.stringify(stableInput)).digest('hex').slice(0, 20)}`;

  return {
    ok: true,
    plan: {
      contract: EMAIL_INBOUND_CANARY_CONTRACT,
      planId,
      project: EXPECTED.project,
      repository: EXPECTED.repository,
      environment: EXPECTED.environment,
      origin: EXPECTED.origin,
      zoneId: stableInput.zoneId,
      state,
      activeAliases: [...ACTIVE_INBOUND_ALIASES],
      reservedAliases: [...RESERVED_INBOUND_ALIASES],
      blockedInboundAliases: [...BLOCKED_INBOUND_ALIASES],
      outboundEnabled: false,
      persistenceEnabled: false,
      steps: [
        {
          operation: 'verify_private_destination',
          status: destinationReady ? 'satisfied' : 'human_verification_required',
          networkMutation: false,
        },
        {
          operation: 'enable_email_routing_dns',
          status: destinationReady ? 'pending_remote_approval' : 'blocked_by_destination_verification',
          networkMutation: false,
        },
        {
          operation: 'create_three_forward_rules_and_one_drop_rule',
          status: destinationReady ? 'pending_remote_approval' : 'blocked_by_destination_verification',
          networkMutation: false,
        },
        {
          operation: 'run_allowlisted_synthetic_test',
          status: 'blocked_by_remote_routing',
          networkMutation: false,
        },
      ],
      rollback: {
        deleteCreatedRulesOnly: true,
        disableRoutingDns: !input.routingEnabled,
        restorePreexistingRules: rules.length > 0,
        preserveMetadataReceipt: true,
      },
      blockedActions: [
        'send_email',
        'send_automatic_reply',
        'start_newsletter',
        'persist_message_body',
        'persist_message_headers',
        'persist_attachments',
        'ingest_email_into_rag',
      ],
    },
  };
}

export function verifyEmailInboundCanaryReceipt(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_receipt');
  for (const key of Object.keys(input)) {
    if (MESSAGE_CONTENT_KEYS.has(key)) return failure('message_content_not_accepted');
    if (!RECEIPT_KEYS.has(key)) return failure('unsupported_receipt_field');
  }
  if (input.contract !== EMAIL_INBOUND_CANARY_CONTRACT) return failure('invalid_contract');
  if (!TEST_ID.test(input.testId || '')) return failure('invalid_test_id');
  if (!Array.isArray(input.aliasResults) || input.aliasResults.length !== ACTIVE_INBOUND_ALIASES.length) {
    return failure('alias_results_incomplete');
  }

  const seen = new Set();
  for (const result of input.aliasResults) {
    if (!result || typeof result !== 'object' || Array.isArray(result)) return failure('invalid_alias_result');
    if (!hasOnlyKeys(result, new Set(['alias', 'deliveryCount']))) return failure('invalid_alias_result');
    if (!ACTIVE_INBOUND_ALIASES.includes(result.alias) || seen.has(result.alias)) return failure('alias_results_incomplete');
    if (result.deliveryCount !== 1) return failure('alias_delivery_count_invalid');
    seen.add(result.alias);
  }
  if (input.noReplyDeliveryCount !== 0) return failure('blocked_alias_delivered');
  if (input.senderAllowlisted !== true) return failure('sender_not_allowlisted');
  if (input.responseSent !== false || input.outboundConfigured !== false) return failure('outbound_activity_detected');
  if (input.bodyPersisted !== false || input.attachmentsPersisted !== false) return failure('message_persistence_detected');

  return {
    ok: true,
    contract: EMAIL_INBOUND_CANARY_CONTRACT,
    status: 'passed',
    testId: input.testId,
    activeAliasCount: ACTIVE_INBOUND_ALIASES.length,
  };
}
