CREATE TABLE `consent_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`purpose` text NOT NULL,
	`copy_version` text NOT NULL,
	`action` text DEFAULT 'granted' NOT NULL,
	`evidence_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `consent_receipts_lead_purpose_action_unique` ON `consent_receipts` (`lead_id`,`purpose`,`action`);--> statement-breakpoint
CREATE INDEX `consent_receipts_lead_created_idx` ON `consent_receipts` (`lead_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `contact_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`domain` text NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`locale` text NOT NULL,
	`objective` text NOT NULL,
	`state` text DEFAULT 'new' NOT NULL,
	`source` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_leads_idempotency_unique` ON `contact_leads` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `contact_leads_email_domain_created_idx` ON `contact_leads` (`email`,`domain`,`created_at`);--> statement-breakpoint
CREATE INDEX `contact_leads_state_created_idx` ON `contact_leads` (`state`,`created_at`);