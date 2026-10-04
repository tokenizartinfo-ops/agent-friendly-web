-- Additive, operations D1 only. Preserve all events, incidents and checkpoints.
CREATE TABLE IF NOT EXISTS operations_investigations (
  run_id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  fingerprint TEXT NOT NULL,
  consumer_ref TEXT NOT NULL CHECK(consumer_ref='afw-cloud-manager'),
  lease_token TEXT NOT NULL UNIQUE,
  observed_at INTEGER NOT NULL,
  reserved_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  finished_at INTEGER,
  outcome TEXT CHECK(outcome IN ('diagnosed','blocked','superseded')),
  requested_outcome TEXT CHECK(requested_outcome IN ('diagnosed','blocked')),
  CHECK((finished_at IS NULL AND outcome IS NULL AND requested_outcome IS NULL) OR
        (finished_at IS NOT NULL AND outcome IS NOT NULL AND requested_outcome IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS operations_investigations_budget ON operations_investigations(reserved_at);
