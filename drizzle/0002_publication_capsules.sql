CREATE TABLE `capsule_approvals` (
	`id` text PRIMARY KEY NOT NULL,
	`capsule_id` text NOT NULL,
	`project_id` text NOT NULL,
	`role` text NOT NULL,
	`actor_user_id` text NOT NULL,
	`decision` text NOT NULL,
	`manifest_sha256` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `capsule_approvals_capsule_role_unique` ON `capsule_approvals` (`capsule_id`,`role`);--> statement-breakpoint
CREATE UNIQUE INDEX `capsule_approvals_idempotency_unique` ON `capsule_approvals` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `capsule_approvals_project_created_idx` ON `capsule_approvals` (`project_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `publication_capsules` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`version` integer NOT NULL,
	`contract_version` text NOT NULL,
	`mode` text DEFAULT 'manual_handoff' NOT NULL,
	`manifest_sha256` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`capsule_json` text NOT NULL,
	`status` text DEFAULT 'owner_approval_pending' NOT NULL,
	`owner_approval_status` text DEFAULT 'pending' NOT NULL,
	`maintainer_approval_status` text DEFAULT 'not_required' NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `publication_capsules_site_version_unique` ON `publication_capsules` (`site_id`,`version`);--> statement-breakpoint
CREATE UNIQUE INDEX `publication_capsules_idempotency_unique` ON `publication_capsules` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `publication_capsules_project_created_idx` ON `publication_capsules` (`project_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `publication_capsules_user_created_idx` ON `publication_capsules` (`user_id`,`created_at`);