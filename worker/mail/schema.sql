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
