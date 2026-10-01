CREATE TABLE `delivery_plans` (
	`capsule_id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`revision` integer NOT NULL,
	`mutation_key` text NOT NULL,
	`payload` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `delivery_plans_project_user_idx` ON `delivery_plans` (`project_id`,`user_id`);