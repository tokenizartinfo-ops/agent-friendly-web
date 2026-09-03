CREATE TABLE `crm_opportunities` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_ref` text NOT NULL,
	`domain` text NOT NULL,
	`segment` text NOT NULL,
	`problem` text NOT NULL,
	`source` text NOT NULL,
	`locale` text NOT NULL,
	`stage` text DEFAULT 'new' NOT NULL,
	`owner_context` text NOT NULL,
	`maintainer_context` text NOT NULL,
	`scope_codes_json` text DEFAULT '[]' NOT NULL,
	`estimated_value_band` text DEFAULT 'unknown' NOT NULL,
	`next_action` text NOT NULL,
	`next_action_at` text DEFAULT '' NOT NULL,
	`evidence_refs_json` text DEFAULT '[]' NOT NULL,
	`loss_reason` text DEFAULT '' NOT NULL,
	`actor_subject_hash` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `crm_opportunities_actor_idempotency_unique` ON `crm_opportunities` (`actor_subject_hash`,`idempotency_key`);
--> statement-breakpoint
CREATE INDEX `crm_opportunities_actor_stage_updated_idx` ON `crm_opportunities` (`actor_subject_hash`,`stage`,`updated_at`);
--> statement-breakpoint
CREATE TABLE `crm_transition_events` (
	`id` text PRIMARY KEY NOT NULL,
	`opportunity_id` text NOT NULL,
	`actor_subject_hash` text NOT NULL,
	`from_stage` text NOT NULL,
	`to_stage` text NOT NULL,
	`reason_code` text DEFAULT '' NOT NULL,
	`evidence_refs_json` text DEFAULT '[]' NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `crm_transition_events_actor_idempotency_unique` ON `crm_transition_events` (`actor_subject_hash`,`idempotency_key`);
--> statement-breakpoint
CREATE INDEX `crm_transition_events_opportunity_created_idx` ON `crm_transition_events` (`opportunity_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `crm_transition_events_actor_created_idx` ON `crm_transition_events` (`actor_subject_hash`,`created_at`);
