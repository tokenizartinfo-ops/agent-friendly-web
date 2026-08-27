CREATE TABLE `domain_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`method` text NOT NULL,
	`challenge_name` text NOT NULL,
	`challenge_value` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`expires_at` text NOT NULL,
	`verified_at` text DEFAULT '' NOT NULL,
	`consumed_at` text DEFAULT '' NOT NULL,
	`last_attempt_at` text DEFAULT '' NOT NULL,
	`attempt_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `domain_claims_project_status_created_idx` ON `domain_claims` (`project_id`,`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `domain_claims_site_status_created_idx` ON `domain_claims` (`site_id`,`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `domain_claims_user_created_idx` ON `domain_claims` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `owner_attestations` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`version` integer NOT NULL,
	`public_json` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`approved_at` text DEFAULT '' NOT NULL,
	`revoked_at` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `owner_attestations_site_version_unique` ON `owner_attestations` (`site_id`,`version`);--> statement-breakpoint
CREATE INDEX `owner_attestations_user_status_created_idx` ON `owner_attestations` (`user_id`,`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `public_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`slug` text NOT NULL,
	`version` integer NOT NULL,
	`contract_version` text NOT NULL,
	`profile_json` text NOT NULL,
	`markdown` text NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`source_attestation_id` text NOT NULL,
	`published_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `public_profiles_slug_version_unique` ON `public_profiles` (`slug`,`version`);--> statement-breakpoint
CREATE INDEX `public_profiles_site_status_version_idx` ON `public_profiles` (`site_id`,`status`,`version`);--> statement-breakpoint
CREATE INDEX `public_profiles_status_published_idx` ON `public_profiles` (`status`,`published_at`);--> statement-breakpoint
CREATE TABLE `registry_sites` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`hostname` text NOT NULL,
	`canonical_origin` text NOT NULL,
	`verification_status` text DEFAULT 'unverified' NOT NULL,
	`visibility` text DEFAULT 'private' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registry_sites_project_unique` ON `registry_sites` (`project_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `registry_sites_hostname_unique` ON `registry_sites` (`hostname`);--> statement-breakpoint
CREATE INDEX `registry_sites_user_updated_idx` ON `registry_sites` (`user_id`,`updated_at`);--> statement-breakpoint
CREATE TABLE `scan_observations` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`target_origin` text NOT NULL,
	`evidence_json` text NOT NULL,
	`readiness_json` text NOT NULL,
	`probes_json` text NOT NULL,
	`checked_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `scan_observations_project_checked_idx` ON `scan_observations` (`project_id`,`checked_at`);--> statement-breakpoint
CREATE INDEX `scan_observations_user_checked_idx` ON `scan_observations` (`user_id`,`checked_at`);--> statement-breakpoint
ALTER TABLE `site_projects` ADD `maintainer_name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `maintainer_email` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `dns_provider` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `content_sources_json` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `desired_capabilities_json` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `authorized_resources_json` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `publication_preference` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `crawler_search_policy` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `crawler_training_policy` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `approver_name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `approver_email` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_projects` ADD `monitoring_preference` text DEFAULT '' NOT NULL;