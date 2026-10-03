CREATE TABLE `delegated_refresh_uses` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`grant_id` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `delegated_refresh_uses_expiry_idx` ON `delegated_refresh_uses` (`expires_at`);