-- Additive operational-only checkpoint. Never apply to customer D1.
CREATE TABLE IF NOT EXISTS operations_probe_state (
 resource TEXT PRIMARY KEY,
 version TEXT NOT NULL DEFAULT '',
 expected TEXT NOT NULL DEFAULT '',
 observed_at INTEGER NOT NULL DEFAULT 0,
 confirmed_at INTEGER NOT NULL DEFAULT 0,
 last_result TEXT NOT NULL DEFAULT '',
 delivery_pending INTEGER NOT NULL DEFAULT 1,
 lease_token TEXT,
 lease_until INTEGER NOT NULL DEFAULT 0
);
