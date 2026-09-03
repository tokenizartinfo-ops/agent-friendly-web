import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const siteProjects = sqliteTable(
  'site_projects',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    ownerEmail: text('owner_email').notNull(),
    organization: text('organization').notNull().default(''),
    website: text('website').notNull().default(''),
    role: text('role').notNull().default(''),
    siteType: text('site_type').notNull().default(''),
    control: text('control').notNull().default('unknown'),
    audience: text('audience').notNull().default(''),
    goalsJson: text('goals_json').notNull().default('[]'),
    languagesJson: text('languages_json').notNull().default('[]'),
    cms: text('cms').notNull().default(''),
    hosting: text('hosting').notNull().default(''),
    notes: text('notes').notNull().default(''),
    maintainerName: text('maintainer_name').notNull().default(''),
    maintainerEmail: text('maintainer_email').notNull().default(''),
    dnsProvider: text('dns_provider').notNull().default(''),
    contentSourcesJson: text('content_sources_json').notNull().default('[]'),
    desiredCapabilitiesJson: text('desired_capabilities_json').notNull().default('[]'),
    authorizedResourcesJson: text('authorized_resources_json').notNull().default('[]'),
    publicationPreference: text('publication_preference').notNull().default(''),
    crawlerSearchPolicy: text('crawler_search_policy').notNull().default(''),
    crawlerTrainingPolicy: text('crawler_training_policy').notNull().default(''),
    approverName: text('approver_name').notNull().default(''),
    approverEmail: text('approver_email').notNull().default(''),
    monitoringPreference: text('monitoring_preference').notNull().default(''),
    status: text('status').notNull().default('draft'),
    completion: integer('completion').notNull().default(0),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    index('site_projects_user_updated_idx').on(table.userId, table.updatedAt),
  ],
);

export const projectEvents = sqliteTable(
  'project_events',
  {
    id: text('id').primaryKey(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    type: text('type').notNull(),
    payloadJson: text('payload_json').notNull().default('{}'),
    createdAt: text('created_at').notNull(),
  },
  (table) => [index('project_events_project_created_idx').on(table.projectId, table.createdAt)],
);

export const registrySites = sqliteTable(
  'registry_sites',
  {
    id: text('id').primaryKey(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    hostname: text('hostname').notNull(),
    canonicalOrigin: text('canonical_origin').notNull(),
    verificationStatus: text('verification_status').notNull().default('unverified'),
    visibility: text('visibility').notNull().default('private'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('registry_sites_project_unique').on(table.projectId),
    uniqueIndex('registry_sites_hostname_unique').on(table.hostname),
    index('registry_sites_user_updated_idx').on(table.userId, table.updatedAt),
  ],
);

export const domainClaims = sqliteTable(
  'domain_claims',
  {
    id: text('id').primaryKey(),
    siteId: text('site_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    method: text('method').notNull(),
    challengeName: text('challenge_name').notNull(),
    challengeValue: text('challenge_value').notNull(),
    status: text('status').notNull().default('pending'),
    expiresAt: text('expires_at').notNull(),
    verifiedAt: text('verified_at').notNull().default(''),
    consumedAt: text('consumed_at').notNull().default(''),
    lastAttemptAt: text('last_attempt_at').notNull().default(''),
    attemptCount: integer('attempt_count').notNull().default(0),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    index('domain_claims_project_status_created_idx').on(table.projectId, table.status, table.createdAt),
    index('domain_claims_site_status_created_idx').on(table.siteId, table.status, table.createdAt),
    index('domain_claims_user_created_idx').on(table.userId, table.createdAt),
  ],
);

export const ownerAttestations = sqliteTable(
  'owner_attestations',
  {
    id: text('id').primaryKey(),
    siteId: text('site_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    version: integer('version').notNull(),
    publicJson: text('public_json').notNull(),
    status: text('status').notNull().default('draft'),
    approvedAt: text('approved_at').notNull().default(''),
    revokedAt: text('revoked_at').notNull().default(''),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('owner_attestations_site_version_unique').on(table.siteId, table.version),
    index('owner_attestations_user_status_created_idx').on(table.userId, table.status, table.createdAt),
  ],
);

export const publicProfiles = sqliteTable(
  'public_profiles',
  {
    id: text('id').primaryKey(),
    siteId: text('site_id').notNull(),
    slug: text('slug').notNull(),
    version: integer('version').notNull(),
    contractVersion: text('contract_version').notNull(),
    profileJson: text('profile_json').notNull(),
    markdown: text('markdown').notNull(),
    status: text('status').notNull().default('published'),
    sourceAttestationId: text('source_attestation_id').notNull(),
    publishedAt: text('published_at').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('public_profiles_slug_version_unique').on(table.slug, table.version),
    index('public_profiles_site_status_version_idx').on(table.siteId, table.status, table.version),
    index('public_profiles_status_published_idx').on(table.status, table.publishedAt),
  ],
);

export const scanObservations = sqliteTable(
  'scan_observations',
  {
    id: text('id').primaryKey(),
    siteId: text('site_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    targetOrigin: text('target_origin').notNull(),
    evidenceJson: text('evidence_json').notNull(),
    readinessJson: text('readiness_json').notNull(),
    probesJson: text('probes_json').notNull(),
    checkedAt: text('checked_at').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    index('scan_observations_project_checked_idx').on(table.projectId, table.checkedAt),
    index('scan_observations_user_checked_idx').on(table.userId, table.checkedAt),
  ],
);

export const publicationCapsules = sqliteTable(
  'publication_capsules',
  {
    id: text('id').primaryKey(),
    siteId: text('site_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    version: integer('version').notNull(),
    contractVersion: text('contract_version').notNull(),
    mode: text('mode').notNull().default('manual_handoff'),
    manifestSha256: text('manifest_sha256').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    capsuleJson: text('capsule_json').notNull(),
    status: text('status').notNull().default('owner_approval_pending'),
    ownerApprovalStatus: text('owner_approval_status').notNull().default('pending'),
    maintainerApprovalStatus: text('maintainer_approval_status').notNull().default('not_required'),
    expiresAt: text('expires_at').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('publication_capsules_site_version_unique').on(table.siteId, table.version),
    uniqueIndex('publication_capsules_idempotency_unique').on(table.idempotencyKey),
    index('publication_capsules_project_created_idx').on(table.projectId, table.createdAt),
    index('publication_capsules_user_created_idx').on(table.userId, table.createdAt),
  ],
);

export const capsuleApprovals = sqliteTable(
  'capsule_approvals',
  {
    id: text('id').primaryKey(),
    capsuleId: text('capsule_id').notNull(),
    projectId: text('project_id').notNull(),
    role: text('role').notNull(),
    actorUserId: text('actor_user_id').notNull(),
    decision: text('decision').notNull(),
    manifestSha256: text('manifest_sha256').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    note: text('note').notNull().default(''),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('capsule_approvals_capsule_role_unique').on(table.capsuleId, table.role),
    uniqueIndex('capsule_approvals_idempotency_unique').on(table.idempotencyKey),
    index('capsule_approvals_project_created_idx').on(table.projectId, table.createdAt),
  ],
);

export const capsuleOriginComparisons = sqliteTable(
  'capsule_origin_comparisons',
  {
    id: text('id').primaryKey(),
    capsuleId: text('capsule_id').notNull(),
    siteId: text('site_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    manifestSha256: text('manifest_sha256').notNull(),
    origin: text('origin').notNull(),
    contractVersion: text('contract_version').notNull(),
    status: text('status').notNull().default('incomplete'),
    comparisonJson: text('comparison_json').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    expiresAt: text('expires_at').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('capsule_origin_comparisons_idempotency_unique').on(table.idempotencyKey),
    uniqueIndex('capsule_origin_comparisons_capsule_manifest_unique').on(table.capsuleId, table.manifestSha256),
    index('capsule_origin_comparisons_project_created_idx').on(table.projectId, table.createdAt),
  ],
);

export const draftPrPlans = sqliteTable(
  'draft_pr_plans',
  {
    id: text('id').primaryKey(),
    capsuleId: text('capsule_id').notNull(),
    comparisonId: text('comparison_id').notNull(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    provider: text('provider').notNull().default('github'),
    repository: text('repository').notNull(),
    baseBranch: text('base_branch').notNull(),
    proposedBranch: text('proposed_branch').notNull(),
    contractVersion: text('contract_version').notNull(),
    status: text('status').notNull().default('prepared_not_submitted'),
    planJson: text('plan_json').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('draft_pr_plans_idempotency_unique').on(table.idempotencyKey),
    uniqueIndex('draft_pr_plans_capsule_comparison_unique').on(table.capsuleId, table.comparisonId),
    index('draft_pr_plans_project_created_idx').on(table.projectId, table.createdAt),
  ],
);

export const contactLeads = sqliteTable(
  'contact_leads',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name').notNull().default(''),
    domain: text('domain').notNull(),
    role: text('role').notNull().default(''),
    organization: text('organization').notNull().default(''),
    locale: text('locale').notNull(),
    objective: text('objective').notNull(),
    state: text('state').notNull().default('new'),
    source: text('source').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    requestHash: text('request_hash').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('contact_leads_idempotency_unique').on(table.idempotencyKey),
    index('contact_leads_email_domain_created_idx').on(table.email, table.domain, table.createdAt),
    index('contact_leads_state_created_idx').on(table.state, table.createdAt),
  ],
);

export const consentReceipts = sqliteTable(
  'consent_receipts',
  {
    id: text('id').primaryKey(),
    leadId: text('lead_id').notNull(),
    purpose: text('purpose').notNull(),
    copyVersion: text('copy_version').notNull(),
    action: text('action').notNull().default('granted'),
    evidenceHash: text('evidence_hash').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('consent_receipts_lead_purpose_action_unique').on(table.leadId, table.purpose, table.action),
    index('consent_receipts_lead_created_idx').on(table.leadId, table.createdAt),
  ],
);

export const emailTransactionalDeliveries = sqliteTable(
  'email_transactional_deliveries',
  {
    id: text('id').primaryKey(),
    eventId: text('event_id').notNull(),
    templateId: text('template_id').notNull(),
    locale: text('locale').notNull(),
    purpose: text('purpose').notNull(),
    actorSubjectHash: text('actor_subject_hash').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    requestHash: text('request_hash').notNull(),
    status: text('status').notNull().default('reserved'),
    providerDeliveryHash: text('provider_delivery_hash').notNull().default(''),
    failureCode: text('failure_code').notNull().default(''),
    createdAt: text('created_at').notNull(),
    sentAt: text('sent_at').notNull().default(''),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('email_transactional_deliveries_event_unique').on(table.eventId),
    uniqueIndex('email_transactional_deliveries_idempotency_unique').on(table.idempotencyKey),
    index('email_transactional_deliveries_status_created_idx').on(table.status, table.createdAt),
  ],
);

export const crmOpportunities = sqliteTable(
  'crm_opportunities',
  {
    id: text('id').primaryKey(),
    contactRef: text('contact_ref').notNull(),
    domain: text('domain').notNull(),
    segment: text('segment').notNull(),
    problem: text('problem').notNull(),
    source: text('source').notNull(),
    locale: text('locale').notNull(),
    stage: text('stage').notNull().default('new'),
    ownerContext: text('owner_context').notNull(),
    maintainerContext: text('maintainer_context').notNull(),
    scopeCodesJson: text('scope_codes_json').notNull().default('[]'),
    estimatedValueBand: text('estimated_value_band').notNull().default('unknown'),
    nextAction: text('next_action').notNull(),
    nextActionAt: text('next_action_at').notNull().default(''),
    evidenceRefsJson: text('evidence_refs_json').notNull().default('[]'),
    lossReason: text('loss_reason').notNull().default(''),
    actorSubjectHash: text('actor_subject_hash').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    requestHash: text('request_hash').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('crm_opportunities_actor_idempotency_unique').on(table.actorSubjectHash, table.idempotencyKey),
    index('crm_opportunities_actor_stage_updated_idx').on(table.actorSubjectHash, table.stage, table.updatedAt),
  ],
);

export const crmTransitionEvents = sqliteTable(
  'crm_transition_events',
  {
    id: text('id').primaryKey(),
    opportunityId: text('opportunity_id').notNull(),
    actorSubjectHash: text('actor_subject_hash').notNull(),
    fromStage: text('from_stage').notNull(),
    toStage: text('to_stage').notNull(),
    reasonCode: text('reason_code').notNull().default(''),
    evidenceRefsJson: text('evidence_refs_json').notNull().default('[]'),
    idempotencyKey: text('idempotency_key').notNull(),
    requestHash: text('request_hash').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('crm_transition_events_actor_idempotency_unique').on(table.actorSubjectHash, table.idempotencyKey),
    index('crm_transition_events_opportunity_created_idx').on(table.opportunityId, table.createdAt),
    index('crm_transition_events_actor_created_idx').on(table.actorSubjectHash, table.createdAt),
  ],
);
