-- Opaque operational metadata only; no project/owner identifiers or declarations.
-- A reservation is consumed even when the provider outcome is uncertain.
CREATE TABLE IF NOT EXISTS assistance_goal_generation_budget (
 receipt_id TEXT PRIMARY KEY, run_id TEXT NOT NULL UNIQUE, event_id TEXT NOT NULL,
 reserved_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 CHECK(expires_at>reserved_at AND expires_at<=reserved_at+300000)
);
