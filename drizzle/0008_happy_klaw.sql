CREATE TABLE `copilot_working_drafts` (
	`project_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`text` text DEFAULT '' NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`last_mutation_key` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `copilot_working_drafts_owner_idx` ON `copilot_working_drafts` (`user_id`,`project_id`);