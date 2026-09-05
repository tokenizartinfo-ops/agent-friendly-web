CREATE TABLE `contact_consent_events` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`purpose` text NOT NULL,
	`copy_version` text NOT NULL,
	`action` text NOT NULL,
	`evidence_hash` text NOT NULL,
	`actor_ref_hash` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_consent_events_idempotency_unique` ON `contact_consent_events` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `contact_consent_events_lead_purpose_created_idx` ON `contact_consent_events` (`lead_id`,`purpose`,`created_at`);--> statement-breakpoint
CREATE TABLE `contact_suppressions` (
	`id` text PRIMARY KEY NOT NULL,
	`email_hmac` text NOT NULL,
	`purpose` text NOT NULL,
	`reason_code` text NOT NULL,
	`policy_version` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_suppressions_email_purpose_unique` ON `contact_suppressions` (`email_hmac`,`purpose`);--> statement-breakpoint
CREATE UNIQUE INDEX `contact_suppressions_idempotency_unique` ON `contact_suppressions` (`idempotency_key`);--> statement-breakpoint
ALTER TABLE `crm_opportunities` ADD `contact_status` text DEFAULT 'active' NOT NULL;--> statement-breakpoint
CREATE TABLE `data_lifecycle_events` (
	`id` text PRIMARY KEY NOT NULL,
	`event_type` text NOT NULL,
	`contact_ref_hash` text NOT NULL,
	`result_code` text NOT NULL,
	`policy_version` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `data_lifecycle_events_idempotency_unique` ON `data_lifecycle_events` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `data_lifecycle_events_contact_created_idx` ON `data_lifecycle_events` (`contact_ref_hash`,`created_at`);--> statement-breakpoint
CREATE TABLE `privacy_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`request_type` text NOT NULL,
	`contact_ref_hash` text NOT NULL,
	`status` text DEFAULT 'pending_verification' NOT NULL,
	`verification_hash` text NOT NULL,
	`verification_expires_at` text NOT NULL,
	`policy_version` text NOT NULL,
	`decision_code` text DEFAULT '' NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`verified_at` text DEFAULT '' NOT NULL,
	`resolved_at` text DEFAULT '' NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `privacy_requests_idempotency_unique` ON `privacy_requests` (`idempotency_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `privacy_requests_verification_hash_unique` ON `privacy_requests` (`verification_hash`);--> statement-breakpoint
CREATE INDEX `privacy_requests_status_expires_idx` ON `privacy_requests` (`status`,`expires_at`);--> statement-breakpoint
ALTER TABLE `contact_leads` ADD `last_interaction_at` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_leads` ADD `retention_expires_at` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_leads` ADD `erased_at` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_leads` ADD `privacy_policy_version` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_leads` ADD `restriction_state` text DEFAULT 'none' NOT NULL;
