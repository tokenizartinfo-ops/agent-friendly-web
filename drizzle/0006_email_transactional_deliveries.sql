CREATE TABLE `email_transactional_deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`template_id` text NOT NULL,
	`locale` text NOT NULL,
	`purpose` text NOT NULL,
	`actor_subject_hash` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`request_hash` text NOT NULL,
	`status` text DEFAULT 'reserved' NOT NULL,
	`provider_delivery_hash` text DEFAULT '' NOT NULL,
	`failure_code` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`sent_at` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_transactional_deliveries_event_unique` ON `email_transactional_deliveries` (`event_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_transactional_deliveries_idempotency_unique` ON `email_transactional_deliveries` (`idempotency_key`);
--> statement-breakpoint
CREATE INDEX `email_transactional_deliveries_status_created_idx` ON `email_transactional_deliveries` (`status`,`created_at`);
