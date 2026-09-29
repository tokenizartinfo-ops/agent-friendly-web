CREATE TABLE `copilot_consent_events` (
	`sequence` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`consent_version` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `copilot_consent_events_project_sequence_idx` ON `copilot_consent_events` (`project_id`,`sequence`);--> statement-breakpoint
CREATE UNIQUE INDEX `copilot_consent_events_project_request_unique` ON `copilot_consent_events` (`project_id`,`idempotency_key`);