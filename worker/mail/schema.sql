-- Dedicated private mail metadata store. Never apply to customer or health D1.
CREATE TABLE mail_outbox (
  reply_key TEXT PRIMARY KEY,
  source_ref TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('draft','approved','sending','accepted','uncertain','cancelled')),
  decision_ref TEXT,
  attempt_id TEXT UNIQUE,
  provider_ref TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
-- Private content, never copied into the operational health store or public Git.
CREATE TABLE mail_content (
  reply_key TEXT PRIMARY KEY,
  content_hash TEXT NOT NULL,
  content_json TEXT NOT NULL
);
CREATE TABLE mail_decisions (
  decision_ref TEXT PRIMARY KEY,
  reply_key TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  actor_ref TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revoked_at INTEGER
);
CREATE TABLE mail_receipts (
  attempt_id TEXT PRIMARY KEY,
  receipt_ref TEXT NOT NULL UNIQUE,
  reply_key TEXT NOT NULL,
  provider_message_id TEXT NOT NULL
);
