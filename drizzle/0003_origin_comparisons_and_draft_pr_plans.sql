CREATE TABLE `capsule_origin_comparisons` (
	`id` text PRIMARY KEY NOT NULL,
	`capsule_id` text NOT NULL,
	`site_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`manifest_sha256` text NOT NULL,
	`origin` text NOT NULL,
	`contract_version` text NOT NULL,
	`status` text DEFAULT 'incomplete' NOT NULL,
	`comparison_json` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `capsule_origin_comparisons_idempotency_unique` ON `capsule_origin_comparisons` (`idempotency_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `capsule_origin_comparisons_capsule_manifest_unique` ON `capsule_origin_comparisons` (`capsule_id`,`manifest_sha256`);--> statement-breakpoint
CREATE INDEX `capsule_origin_comparisons_project_created_idx` ON `capsule_origin_comparisons` (`project_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `draft_pr_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`capsule_id` text NOT NULL,
	`comparison_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`provider` text DEFAULT 'github' NOT NULL,
	`repository` text NOT NULL,
	`base_branch` text NOT NULL,
	`proposed_branch` text NOT NULL,
	`contract_version` text NOT NULL,
	`status` text DEFAULT 'prepared_not_submitted' NOT NULL,
	`plan_json` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `draft_pr_plans_idempotency_unique` ON `draft_pr_plans` (`idempotency_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `draft_pr_plans_capsule_comparison_unique` ON `draft_pr_plans` (`capsule_id`,`comparison_id`);--> statement-breakpoint
CREATE INDEX `draft_pr_plans_project_created_idx` ON `draft_pr_plans` (`project_id`,`created_at`);