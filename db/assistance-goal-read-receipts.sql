-- Private source D1 audit ledger only. Additive preparation, no remote migration.
CREATE TABLE IF NOT EXISTS assistance_goal_read_receipts (
 id TEXT PRIMARY KEY,
 project_id TEXT NOT NULL,
 user_id TEXT NOT NULL,
 source_event_id TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision>0),
 consent_sequence INTEGER NOT NULL CHECK(consent_sequence>0),
 event_id TEXT NOT NULL,
 project_ref TEXT NOT NULL,
 run_id TEXT NOT NULL,
 context_hash TEXT NOT NULL,
 source_hash TEXT NOT NULL,
 issued_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL CHECK(expires_at>issued_at AND expires_at-issued_at<=600000),
 UNIQUE(run_id,consent_sequence)
);
CREATE INDEX IF NOT EXISTS assistance_goal_read_receipt_scope
 ON assistance_goal_read_receipts(project_id,user_id,source_event_id);
