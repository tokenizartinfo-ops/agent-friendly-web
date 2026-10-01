CREATE TABLE `delegated_access_grants` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`client_id` text NOT NULL,
	`project_id` text NOT NULL,
	`resource` text NOT NULL,
	`scopes_json` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`revoked_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `delegated_grants_owner_created_idx` ON `delegated_access_grants` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `delegated_consent_sessions` (
	`handle_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`project_id` text NOT NULL,
	`client_id` text NOT NULL,
	`resource` text NOT NULL,
	`scopes_json` text NOT NULL,
	`expires_at` text NOT NULL,
	`consumed_at` text DEFAULT '' NOT NULL
);
