-- PRIVATE SOURCE only: no private journal identifier in the operational ledger.
CREATE TABLE IF NOT EXISTS assistance_feedback_receipts (
 source_event_id TEXT PRIMARY KEY NOT NULL,
 review_json TEXT NOT NULL,
 confirmed_at INTEGER NOT NULL
);
