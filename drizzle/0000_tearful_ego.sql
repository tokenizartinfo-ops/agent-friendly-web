CREATE TABLE `project_events` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`payload_json` text DEFAULT '{}' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `project_events_project_created_idx` ON `project_events` (`project_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `site_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`owner_email` text NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`site_type` text DEFAULT '' NOT NULL,
	`control` text DEFAULT 'unknown' NOT NULL,
	`audience` text DEFAULT '' NOT NULL,
	`goals_json` text DEFAULT '[]' NOT NULL,
	`languages_json` text DEFAULT '[]' NOT NULL,
	`cms` text DEFAULT '' NOT NULL,
	`hosting` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`completion` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `site_projects_user_updated_idx` ON `site_projects` (`user_id`,`updated_at`);